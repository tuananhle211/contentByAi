// Nhân Gian Chưa Kể — nhân vật NHÌN NGHIÊNG có khớp (17/11/2026), thay k.char cho cảnh hành động: đi bộ, đạp xe, câu cá, ngồi xổm…
// Người dùng chê bản cũ (thân nhìn thẳng ngồi trên xe, chân không đạp). Ở đây mọi khớp tính bằng IK nên chân bám pedal / mặt đất,
// bánh xe quay đúng quãng đường đi, bước chân không trượt.
//
//   person(k, x, yChân, cao, o)       o.action: 'stand' | 'walk' | 'sit' | 'squat' | 'fish' | 'kneel'
//   bicycle(k, x, yĐất, cao, o)       xe đạp kèm người (o.rider = preset, null = xe dựng); o.frame 'nam' | 'nu'; o.basket, o.rack
//   rodScene: fishing(k, x, yĐất, cao, o) → người ngồi ghế con câu cá + cần tre + dây + phao trên mặt nước o.water (y)
//
// Quy ước: nhân vật quay mặt sang PHẢI; o.flip = quay trái. x đổi theo thời gian là đủ: pha bước chân, vòng quay bánh xe
// lấy từ chính x (o.dist ghi đè), nên đi nhanh hay chậm chân vẫn khớp đất.
// Preset: { body: man|woman|kid|old, skin, hair: short|side|long|bun|buzz|bald|tied, hairColor, shirt, sleeve: long|short|none,
//           shirtStyle: shirt|baba|tank|jacket, pants, shorts, shoes, hat: non|coi|cap|khan|null, hatColor, beard, stubble }
// Diễn: face calm|sad|fear|shock|angry|happy|blank|cry|smile, talk 0..1, look (-1..1 mắt liếc lên/xuống), tears 0..1, tilt (độ).
import { vary, mix } from '/channel/nhan-gian-hd.js';

const D = Math.PI / 180;
const OL = '#22180f';
const T = (k) => k.gt ?? 0;

const BODIES = {
  man: { ankle: 3, thigh: 24, shin: 23, foot: 11.5, torso: 30, neck: 4.5, headR: 7.3, upper: 16.5, fore: 14.5, hand: 5.6, chest: 7.6, waist: 6.6, wThigh: 6.2, wKnee: 4.4, wShin: 4.6, wAnkle: 2.6, wArm: 4.3, wElbow: 3.3, wWrist: 2.4 },
  woman: { ankle: 3, thigh: 23.5, shin: 22.5, foot: 10, torso: 28.5, neck: 4.6, headR: 7.0, upper: 15.5, fore: 13.8, hand: 5, chest: 6.8, waist: 5.6, wThigh: 5.8, wKnee: 3.9, wShin: 4.1, wAnkle: 2.2, wArm: 3.6, wElbow: 2.8, wWrist: 2, bust: 1 },
  kid: { ankle: 2.6, thigh: 16.5, shin: 15.5, foot: 8.5, torso: 22, neck: 3.4, headR: 7.8, upper: 12, fore: 10.5, hand: 4.2, chest: 6, waist: 5.8, wThigh: 5, wKnee: 3.8, wShin: 3.8, wAnkle: 2.2, wArm: 3.4, wElbow: 2.8, wWrist: 2.1 },
  old: { ankle: 3, thigh: 23, shin: 22.5, foot: 11, torso: 28, neck: 4.4, headR: 7.1, upper: 16, fore: 14, hand: 5.4, chest: 7, waist: 6.6, wThigh: 5.6, wKnee: 4.2, wShin: 4.2, wAnkle: 2.5, wArm: 3.8, wElbow: 3, wWrist: 2.2, stoop: 1 },
};
const natural = (b) => b.ankle + b.thigh + b.shin + b.torso + b.neck + b.headR * 2.05;

// ---------- hình học ----------
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const pol = (o, ang, len) => [o[0] + Math.sin(ang * D) * len, o[1] + Math.cos(ang * D) * len]; // 0° = thẳng xuống, + = ra trước
const lerp = (a, b, t) => a + (b - a) * t;
const lerp2 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
const ease = (t) => t * t * (3 - 2 * t);
// IK hai đoạn: khớp giữa nằm về phía `side` (+1 = phía trước/phải của đường gốc→đích).
function ik(root, target, l1, l2, side = 1) {
  let dx = target[0] - root[0], dy = target[1] - root[1], d = Math.hypot(dx, dy);
  const maxD = (l1 + l2) * 0.999, minD = Math.abs(l1 - l2) + 0.01;
  if (d > maxD) { dx *= maxD / d; dy *= maxD / d; d = maxD; }
  if (d < minD) d = minD;
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const ux = dx / d, uy = dy / d;
  const mx = root[0] + ux * a, my = root[1] + uy * a;
  // pháp tuyến: (uy, -ux) quay phải theo hướng đi; chọn phía có x lớn hơn khi side = +1
  let nx = -uy, ny = ux; if ((nx > 0) !== (side > 0)) { nx = -nx; ny = -ny; }
  const mid = [mx + nx * h, my + ny * h];
  return { mid, end: [root[0] + dx, root[1] + dy] };
}

// ---------- vẽ khối ----------
// Đoạn chi thuôn, có khối: tô gradient ngang thân (sáng mặt trước-trên, tối mặt sau), viền mực.
function seg(ctx, p1, p2, r1, r2, col, lw, dark = 0) {
  const ang = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
  const n = [Math.cos(ang + Math.PI / 2), Math.sin(ang + Math.PI / 2)];
  ctx.beginPath();
  ctx.arc(p1[0], p1[1], r1, ang + Math.PI / 2, ang - Math.PI / 2);
  ctx.arc(p2[0], p2[1], r2, ang - Math.PI / 2, ang + Math.PI / 2);
  ctx.closePath();
  const mid = lerp2(p1, p2, 0.5), rr = (r1 + r2) / 2;
  const g = ctx.createLinearGradient(mid[0] - n[0] * rr, mid[1] - n[1] * rr, mid[0] + n[0] * rr, mid[1] + n[1] * rr);
  const base = dark ? vary(col, -dark) : col;
  g.addColorStop(0, vary(base, 0.1)); g.addColorStop(0.45, base); g.addColorStop(1, vary(base, -0.28));
  ctx.fillStyle = g; ctx.fill();
  ctx.lineWidth = lw; ctx.strokeStyle = vary(base, -0.6); ctx.lineJoin = 'round'; ctx.stroke();
}
function shape(ctx, pts, col, lw, close = true, grad = null) {
  ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); if (close) ctx.closePath();
  ctx.fillStyle = grad ?? col; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = typeof col === 'string' && col[0] === '#' ? vary(col, -0.6) : OL; ctx.lineJoin = 'round'; ctx.stroke();
}
// Đường cong kín qua các điểm (Catmull-Rom → Bezier) cho thân/áo mềm.
function smooth(ctx, pts) {
  const n = pts.length;
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    ctx.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]);
  }
  ctx.closePath();
}
function crease(ctx, a, b, lw, a2 = 0.35) { ctx.save(); ctx.globalAlpha *= a2; ctx.strokeStyle = OL; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore(); }

// ---------- mặt nghiêng ----------
const MOODS = {
  calm: { brow: 0, browY: 0, eye: 1, mouth: 0, curve: 0 },
  blank: { brow: 0, browY: 0.05, eye: 0.75, mouth: 0, curve: 0 },
  sad: { brow: -0.35, browY: 0.02, eye: 0.7, mouth: 0, curve: -0.6 },
  cry: { brow: -0.45, browY: 0.02, eye: 0.45, mouth: 0.25, curve: -0.8 },
  fear: { brow: -0.4, browY: -0.12, eye: 1.35, mouth: 0.25, curve: -0.4 },
  shock: { brow: 0.1, browY: -0.2, eye: 1.5, mouth: 0.6, curve: 0 },
  angry: { brow: 0.55, browY: 0.08, eye: 0.85, mouth: 0.1, curve: -0.5 },
  happy: { brow: 0, browY: -0.05, eye: 0.8, mouth: 0.15, curve: 0.8 },
  smile: { brow: 0, browY: 0, eye: 0.9, mouth: 0, curve: 0.5 },
};
function head(k, ctx, P, b, o, lw) {
  // Mặt tối giản (17/11, người dùng chê mặt chi tiết "xấu"): đường viền mặt cong mềm, mắt là chấm tối có một đốm sáng,
  // một nét mí, một nét mày; không môi đỏ, không má hồng đậm. Viền cùng tông da (không đen), nét mảnh.
  const r = b.headR, gt = T(k);
  const skin = P.skin ?? '#d8a880', hc = P.hairColor ?? '#1b1410';
  const line = vary(skin, -0.62), hline = vary(hc, -0.5);
  const m = MOODS[o.face ?? 'calm'] ?? MOODS.calm;
  const talk = o.talk ?? 0;
  const mo = Math.max(m.mouth, talk ? talk * (0.3 + 0.7 * Math.abs(Math.sin(gt * 9.3 + (o.phase ?? 0)))) : 0);
  const blink = (gt * 0.27 + (o.phase ?? 0) * 0.13) % 1 < 0.03 ? 0.08 : 1;
  const lwf = lw * 0.85;
  const hair = P.hair ?? 'short';
  const fillHair = (pts) => { smooth(ctx, pts); const g = ctx.createLinearGradient(0, -1.2 * r, 0, 1.0 * r); g.addColorStop(0, vary(hc, 0.14)); g.addColorStop(1, vary(hc, -0.1)); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = lwf; ctx.strokeStyle = hline; ctx.stroke(); };
  // tóc phía sau đầu
  if (hair === 'long') fillHair([[-0.3 * r, -1.0 * r], [-1.05 * r, -0.55 * r], [-1.18 * r, 0.6 * r], [-1.1 * r, 1.9 * r], [-0.8 * r, 2.6 * r], [-0.35 * r, 2.3 * r], [-0.3 * r, 1.2 * r], [-0.1 * r, 0.3 * r]]);
  if (hair === 'tied') fillHair([[-0.85 * r, -0.2 * r], [-1.2 * r, 0.3 * r], [-1.25 * r, 1.4 * r], [-1.05 * r, 1.9 * r], [-0.95 * r, 1.2 * r], [-0.7 * r, 0.2 * r]]);
  if (hair === 'bun') { ctx.beginPath(); ctx.ellipse(-0.98 * r, -0.5 * r, 0.42 * r, 0.38 * r, -0.4, 0, Math.PI * 2); ctx.fillStyle = vary(hc, 0.05); ctx.fill(); ctx.lineWidth = lwf; ctx.strokeStyle = hline; ctx.stroke(); }
  // khối đầu nghiêng (bezier mềm)
  const my = mo * 0.16 * r;
  ctx.beginPath();
  ctx.moveTo(-0.42 * r, 0.9 * r);
  ctx.bezierCurveTo(-1.08 * r, 0.72 * r, -1.16 * r, -0.4 * r, -0.66 * r, -0.86 * r);
  ctx.bezierCurveTo(-0.22 * r, -1.22 * r, 0.62 * r, -1.08 * r, 0.84 * r, -0.42 * r);
  ctx.quadraticCurveTo(0.93 * r, -0.2 * r, 0.9 * r, -0.06 * r);
  ctx.quadraticCurveTo(0.98 * r, 0.06 * r, 1.08 * r, 0.2 * r);      // sống mũi → chóp mũi
  ctx.quadraticCurveTo(1.1 * r, 0.3 * r, 0.97 * r, 0.32 * r);       // dưới mũi
  ctx.quadraticCurveTo(1.02 * r, 0.4 * r, 0.98 * r, 0.47 * r + my * 0.3); // môi trên
  ctx.quadraticCurveTo(1.0 * r, 0.56 * r + my, 0.94 * r, 0.6 * r + my);   // môi dưới
  ctx.bezierCurveTo(0.98 * r, 0.8 * r + my, 0.74 * r, 0.94 * r + my, 0.48 * r, 0.9 * r + my * 0.5); // cằm
  ctx.quadraticCurveTo(0.2 * r, 0.88 * r, 0.05 * r, 0.78 * r);
  ctx.closePath();
  ctx.save();
  ctx.fillStyle = skin; ctx.fill();
  ctx.clip();
  const sh = ctx.createLinearGradient(0.6 * r, 0, -1.1 * r, 0); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(40,20,10,0.22)');
  ctx.fillStyle = sh; ctx.fillRect(-1.3 * r, -1.3 * r, 2.6 * r, 2.6 * r);
  ctx.globalAlpha *= 0.12; ctx.fillStyle = '#d0604a'; ctx.beginPath(); ctx.ellipse(0.48 * r, 0.32 * r, 0.24 * r, 0.14 * r, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  ctx.lineWidth = lwf; ctx.strokeStyle = line; ctx.lineJoin = 'round'; ctx.stroke();
  // tai: một nét chữ C
  ctx.beginPath(); ctx.ellipse(-0.18 * r, 0.12 * r, 0.17 * r, 0.25 * r, 0.1, 0, Math.PI * 2); ctx.fillStyle = vary(skin, -0.06); ctx.fill(); ctx.lineWidth = lwf * 0.8; ctx.strokeStyle = line; ctx.stroke();
  ctx.beginPath(); ctx.arc(-0.17 * r, 0.13 * r, 0.08 * r, -1.0, 1.9); ctx.lineWidth = lwf * 0.6; ctx.stroke();
  // mắt: chấm tối + đốm sáng; sợ/sốc thì lộ lòng trắng
  const ex = 0.6 * r, ey = -0.02 * r, eo = Math.max(0.06, m.eye * blink);
  const ink = '#1a120c';
  if (blink < 1) { ctx.lineWidth = lwf; ctx.strokeStyle = ink; ctx.beginPath(); ctx.moveTo(ex - 0.1 * r, ey); ctx.quadraticCurveTo(ex, ey + 0.04 * r, ex + 0.1 * r, ey); ctx.stroke(); }
  else {
    if (m.eye > 1.1) { ctx.fillStyle = '#f2ece2'; ctx.beginPath(); ctx.ellipse(ex, ey, 0.13 * r, 0.15 * r * eo * 0.75, 0, 0, Math.PI * 2); ctx.fill(); }
    const pr = m.eye > 1.1 ? 0.055 : 0.075;
    ctx.fillStyle = ink; ctx.beginPath(); ctx.ellipse(ex + 0.02 * r, ey - (o.look ?? 0) * 0.04 * r, pr * r, pr * 1.35 * r * Math.min(1, eo), 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.arc(ex + 0.045 * r, ey - 0.04 * r, 0.022 * r, 0, Math.PI * 2); ctx.fill();
    // mí trên: một nét ngắn (sầu: rủ xuống phía sau)
    ctx.lineWidth = lwf * 1.1; ctx.strokeStyle = ink; ctx.lineCap = 'round';
    const lidY = ey - 0.13 * r * Math.min(1.2, eo);
    ctx.beginPath(); ctx.moveTo(ex - 0.12 * r, lidY + 0.03 * r - m.brow * -0.0 + (m.brow < 0 ? 0.04 * r : 0)); ctx.quadraticCurveTo(ex, lidY - 0.02 * r, ex + 0.11 * r, lidY + 0.02 * r); ctx.stroke();
  }
  // mày
  ctx.save(); ctx.strokeStyle = vary(hc, 0.05); ctx.lineCap = 'round'; ctx.lineWidth = 0.075 * r;
  const by = ey - 0.3 * r + m.browY * r;
  ctx.beginPath(); ctx.moveTo(ex - 0.14 * r, by - m.brow * 0.07 * r); ctx.quadraticCurveTo(ex + 0.02 * r, by - 0.05 * r, ex + 0.17 * r, by + m.brow * 0.1 * r); ctx.stroke(); ctx.restore();
  // miệng: một nét ngắn ở mép; mở khi nói / sốc
  if (mo > 0.12) { ctx.fillStyle = '#3a1a14'; ctx.beginPath(); ctx.ellipse(0.92 * r, 0.52 * r + my * 0.5, 0.06 * r, 0.03 * r + my * 0.45, 0, 0, Math.PI * 2); ctx.fill(); }
  else { ctx.lineWidth = lwf * 0.8; ctx.strokeStyle = line; ctx.beginPath(); ctx.moveTo(0.97 * r, 0.52 * r); ctx.quadraticCurveTo(0.9 * r, 0.52 * r - m.curve * 0.05 * r, 0.83 * r, 0.5 * r - m.curve * 0.08 * r); ctx.stroke(); }
  // nước mắt
  const tears = o.tears ?? (o.face === 'cry' ? 1 : 0);
  if (tears > 0) { const u = (gt * 0.5) % 1; ctx.save(); ctx.globalAlpha *= 0.75; ctx.fillStyle = '#cfe6f4'; ctx.beginPath(); ctx.ellipse(ex + 0.02 * r, ey + 0.14 * r + u * 0.55 * r * tears, 0.045 * r, 0.075 * r, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  // tóc trước (mái, chỏm)
  if (hair !== 'bald') {
    let pts;
    if (hair === 'buzz') pts = [[-0.95 * r, 0.05 * r], [-0.9 * r, -0.62 * r], [-0.35 * r, -1.08 * r], [0.35 * r, -1.04 * r], [0.76 * r, -0.62 * r], [0.5 * r, -0.66 * r], [0.0, -0.72 * r], [-0.3 * r, -0.4 * r], [-0.5 * r, 0.0]];
    else if (hair === 'long' || hair === 'tied' || hair === 'bun') pts = [[-1.04 * r, 0.25 * r], [-1.04 * r, -0.6 * r], [-0.4 * r, -1.16 * r], [0.4 * r, -1.12 * r], [0.86 * r, -0.62 * r], [0.62 * r, -0.66 * r], [0.25 * r, -0.62 * r], [0.0, -0.3 * r], [-0.08 * r, 0.1 * r], [-0.45 * r, -0.05 * r], [-0.6 * r, 0.3 * r]];
    else pts = [[-1.0 * r, 0.3 * r], [-1.06 * r, -0.55 * r], [-0.45 * r, -1.18 * r], [0.35 * r, -1.16 * r], [0.92 * r, -0.66 * r], [0.78 * r, -0.48 * r], [0.48 * r, -0.6 * r], [0.2 * r, -0.5 * r], [0.06 * r, -0.12 * r], [0.04 * r, 0.22 * r], [-0.3 * r, 0.0], [-0.55 * r, 0.38 * r]];
    fillHair(pts);
    ctx.save(); ctx.globalAlpha *= 0.28; ctx.strokeStyle = vary(hc, 0.55); ctx.lineWidth = 0.09 * r; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(-0.1 * r, -0.2 * r, 0.82 * r, -2.4, -1.45); ctx.stroke(); ctx.restore();
    if (P.gray) { ctx.save(); ctx.globalAlpha *= P.gray; smooth(ctx, pts); ctx.fillStyle = '#bdb6ac'; ctx.fill(); ctx.restore(); }
  }
  if (P.stubble) { ctx.save(); ctx.globalAlpha *= 0.14; ctx.fillStyle = '#2a3036'; ctx.beginPath(); ctx.moveTo(0.1 * r, 0.62 * r); ctx.quadraticCurveTo(0.7 * r, 0.95 * r, 0.96 * r, 0.62 * r); ctx.lineTo(0.95 * r, 0.45 * r); ctx.quadraticCurveTo(0.5 * r, 0.62 * r, 0.1 * r, 0.62 * r); ctx.fill(); ctx.restore(); }
  if (P.beard) { smooth(ctx, [[0.1 * r, 0.7 * r], [0.55 * r, 0.95 * r], [0.95 * r, 0.72 * r], [0.85 * r, P.beard === 'long' ? 1.75 * r : 1.2 * r], [0.45 * r, P.beard === 'long' ? 1.6 * r : 1.12 * r]]); ctx.fillStyle = P.beardColor ?? '#ddd6cc'; ctx.fill(); ctx.lineWidth = lwf * 0.8; ctx.strokeStyle = vary(P.beardColor ?? '#ddd6cc', -0.5); ctx.stroke(); }
  hatDraw(ctx, P, r, lwf);
}
function hatDraw(ctx, P, r, lw) {
  const hat = P.hat, hcol = P.hatColor;
  const out = (c) => vary(c, -0.55);
  if (hat === 'non') {
    const nc = hcol ?? '#e2cc8e';
    ctx.save(); ctx.rotate(-0.12);
    const ng = ctx.createLinearGradient(0, -2.3 * r, 0, -0.5 * r); ng.addColorStop(0, vary(nc, 0.12)); ng.addColorStop(1, vary(nc, -0.12));
    ctx.beginPath(); ctx.moveTo(-2.05 * r, -0.42 * r); ctx.quadraticCurveTo(-0.8 * r, -1.5 * r, 0, -2.3 * r); ctx.quadraticCurveTo(0.8 * r, -1.5 * r, 2.05 * r, -0.42 * r); ctx.quadraticCurveTo(0, -0.22 * r, -2.05 * r, -0.42 * r); ctx.closePath();
    ctx.fillStyle = ng; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = out(nc); ctx.stroke();
    ctx.globalAlpha *= 0.3; ctx.lineWidth = lw * 0.5; for (let i = 1; i < 5; i++) { const u = i / 5; ctx.beginPath(); ctx.moveTo(-2.05 * r * u, -0.42 * r - 1.85 * r * (1 - u)); ctx.lineTo(2.05 * r * u, -0.42 * r - 1.85 * r * (1 - u)); ctx.stroke(); }
    ctx.restore();
  } else if (hat === 'coi') {
    const cc = hcol ?? '#5a6a3a';
    const cg = ctx.createLinearGradient(0, -1.8 * r, 0, -0.4 * r); cg.addColorStop(0, vary(cc, 0.15)); cg.addColorStop(1, vary(cc, -0.15));
    ctx.beginPath(); ctx.ellipse(0.05 * r, -0.55 * r, 1.6 * r, 0.3 * r, -0.06, 0, Math.PI * 2); ctx.fillStyle = vary(cc, -0.1); ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = out(cc); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(0, -0.72 * r, 1.08 * r, 0.98 * r, 0, Math.PI, 0); ctx.closePath(); ctx.fillStyle = cg; ctx.fill(); ctx.stroke();
  } else if (hat === 'cap') {
    const cc = hcol ?? '#2e4a6a';
    ctx.beginPath(); ctx.ellipse(0, -0.62 * r, 1.06 * r, 0.6 * r, 0, Math.PI, 0); ctx.closePath(); ctx.fillStyle = cc; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = out(cc); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0.6 * r, -0.66 * r); ctx.quadraticCurveTo(1.4 * r, -0.66 * r, 1.7 * r, -0.48 * r); ctx.lineTo(0.7 * r, -0.5 * r); ctx.closePath(); ctx.fillStyle = vary(cc, -0.2); ctx.fill(); ctx.stroke();
  } else if (hat === 'khan') {
    const kc = hcol ?? '#3a2a24';
    smooth(ctx, [[-1.12 * r, 0.3 * r], [-1.12 * r, -0.6 * r], [-0.4 * r, -1.22 * r], [0.45 * r, -1.16 * r], [0.92 * r, -0.62 * r], [0.66 * r, -0.5 * r], [0.0, -0.6 * r], [-0.45 * r, -0.2 * r], [-0.62 * r, 0.4 * r]]);
    ctx.fillStyle = kc; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = out(kc); ctx.stroke();
  }
}

// ---------- tư thế ----------
// Trả về các điểm khớp (đơn vị, gốc tại mặt đất dưới hông, y âm là lên trên).
function poseStand(b, o) {
  const legL = b.thigh + b.shin;
  const hip = [0, -(b.ankle + legL * 0.985)];
  return {
    hip, lean: (b.stoop ? 14 : 2) + (o.lean ?? 0),
    feet: { near: { ankle: [2.2, -b.ankle], ang: 0 }, far: { ankle: [-1.6, -b.ankle], ang: 0 } },
    arms: { near: { sh: 10, el: 14 }, far: { sh: 4, el: 10 } },
  };
}
// Đi bộ: pha lấy từ quãng đường (đơn vị) → bàn chân đứng yên trên đất khi đang chống.
const STANCE = 0.6;
function poseWalk(b, o, dist) {
  const legL = b.thigh + b.shin;
  const s = legL * 0.56 * (o.stride ?? 1);           // quãng hông đi khi một chân chống
  const cycle = s / STANCE;                            // quãng đường một chu kỳ bước
  const ph = ((dist / cycle) % 1 + 1) % 1;
  const foot = (phi) => {
    phi = ((phi % 1) + 1) % 1;
    if (phi < STANCE) {
      const u = phi / STANCE;
      const heel = u > 0.72 ? ((u - 0.72) / 0.28) * 28 : 0; // nhấc gót trước khi rời đất
      const toe = u < 0.12 ? (1 - u / 0.12) * -10 : 0;
      return { ankle: [s / 2 - u * s, -b.ankle - Math.sin(heel * D) * b.foot * 0.62], ang: heel + toe };
    }
    const u = ease((phi - STANCE) / (1 - STANCE));
    return { ankle: [-s / 2 + u * s, -b.ankle - Math.sin(u * Math.PI) * legL * 0.11], ang: lerp(28, -10, u) };
  };
  // hông cao nhất khi chân chống thẳng dưới hông, thấp nhất lúc hai chân cùng chạm đất (không khuỵu gối giữa bước)
  const fN = foot(ph), fF = foot(ph + 0.5);
  const st = [fN, fF].filter((f, i) => ((i ? ph + 0.5 : ph) % 1) < STANCE);
  const dx = Math.max(...st.map((f) => Math.abs(f.ankle[0])), 0);
  const reach = legL * 0.975;
  const hip = [0, -(b.ankle + Math.sqrt(Math.max(0, reach * reach - dx * dx)))];
  const sw = Math.cos(ph * 2 * Math.PI);
  return {
    hip, lean: 4 + (b.stoop ? 12 : 0) + (o.lean ?? 0), phase: ph,
    feet: { near: fN, far: fF },
    arms: { near: { sh: -20 * sw * (o.armSwing ?? 1), el: 18 - 8 * sw }, far: { sh: 20 * sw * (o.armSwing ?? 1), el: 18 + 8 * sw } },
  };
}
function poseSit(b, o) { // ngồi ghế (o.seat = chiều cao ghế, đơn vị; mặc định 24)
  const seat = o.seat ?? 24;
  return {
    hip: [0, -seat - 2], lean: 4 + (b.stoop ? 10 : 0) + (o.lean ?? 0),
    feet: { near: { ankle: [b.thigh * 0.95, -b.ankle], ang: 0 }, far: { ankle: [b.thigh * 0.85, -b.ankle], ang: 0 } },
    arms: o.arms ?? { near: { hand: [b.thigh * 0.75, -seat - 6] }, far: { hand: [b.thigh * 0.65, -seat - 5] } },
  };
}
function poseSquat(b, o) { // ngồi xổm kiểu Việt: gót sát đất, gối cao, tay vắt trên gối
  const hipY = -b.ankle - b.shin * 0.42;
  return {
    hip: [-b.thigh * 0.32, hipY], lean: 26 + (o.lean ?? 0),
    feet: { near: { ankle: [b.thigh * 0.12, -b.ankle], ang: 0 }, far: { ankle: [b.thigh * 0.02, -b.ankle], ang: 0 } },
    arms: o.arms ?? { near: { hand: [b.thigh * 0.62, hipY - b.shin * 0.55] }, far: { hand: [b.thigh * 0.55, hipY - b.shin * 0.5] } },
  };
}
function poseKneel(b, o) { // quỳ: gối chạm đất, mông trên gót
  const hipY = -b.ankle - b.shin * 0.55;
  return {
    hip: [-b.thigh * 0.15, hipY], lean: 6 + (o.lean ?? 0), kneel: true,
    feet: { near: { ankle: [-b.thigh * 0.55, -b.ankle - 1], ang: 70 }, far: { ankle: [-b.thigh * 0.62, -b.ankle - 1], ang: 70 } },
    knees: { near: [b.thigh * 0.62, -b.wKnee * 0.6], far: [b.thigh * 0.55, -b.wKnee * 0.6] },
    arms: o.arms ?? { near: { hand: [b.thigh * 0.4, hipY - 4] }, far: { hand: [b.thigh * 0.35, hipY - 3] } },
  };
}

// ---------- dựng người ----------
// pose.feet[*].ankle hoặc pose.arms[*].hand có thể là toạ độ đích (IK); arms[*].sh/el là góc (độ) cho FK.
function body(k, ctx, P, b, pose, o, lw) {
  const shirt = P.shirt ?? '#6a7a8a', pants = P.pants ?? '#3a3a40', skin = P.skin ?? '#d8a880', shoes = P.shoes ?? '#3a2a20';
  const sleeve = P.sleeve ?? 'long';
  const lean = pose.lean;
  const hip = pose.hip;
  const shoulder = pol(hip, 180 - lean, b.torso); // thân hướng lên, nghiêng ra trước
  const torsoDir = [Math.sin((180 - lean) * D), Math.cos((180 - lean) * D)]; // từ hông lên vai
  const nrm = [-torsoDir[1], torsoDir[0]]; // pháp tuyến: hướng ra phía trước (x+)
  const fwd = nrm[0] < 0 ? [-nrm[0], -nrm[1]] : nrm;
  const shJoint = add(shoulder, [fwd[0] * b.chest * 0.05, fwd[1] * b.chest * 0.05 + 1.2]);
  const neckBase = add(shoulder, [fwd[0] * b.chest * 0.25, fwd[1] * b.chest * 0.25]);
  const headTilt = (o.tilt ?? 0) + lean * 0.12 - (b.stoop ? 4 : 0);
  const headC = add(neckBase, [Math.sin((180 - lean * 0.6) * D) * (b.neck + b.headR * 0.78) + b.headR * 0.12, Math.cos((180 - lean * 0.6) * D) * (b.neck + b.headR * 0.78)]);

  // chân: hông → gối → cổ chân (IK, gối ra trước) hoặc gối cố định (quỳ)
  const legs = {};
  for (const side of ['far', 'near']) {
    const f = pose.feet[side];
    const hj = add(hip, [side === 'near' ? 0.6 : -0.6, 0]);
    let knee;
    if (pose.knees) knee = pose.knees[side];
    else knee = ik(hj, f.ankle, b.thigh, b.shin, +1).mid;
    const ankle = pose.knees ? f.ankle : ik(hj, f.ankle, b.thigh, b.shin, +1).end;
    legs[side] = { hj, knee, ankle, ang: f.ang ?? 0 };
  }
  // tay: vai → khuỷu → cổ tay
  const arms = {};
  for (const side of ['far', 'near']) {
    const a = pose.arms[side] ?? {};
    const sj = add(shJoint, side === 'near' ? [0.4, 0] : [-0.8, -0.4]);
    let el, wr;
    if (a.hand) { const r = ik(sj, a.hand, b.upper, b.fore, a.elbow ?? -1); el = r.mid; wr = r.end; }
    else { el = pol(sj, (a.sh ?? 8) + lean * 0.3, b.upper); wr = pol(el, (a.sh ?? 8) + lean * 0.3 + (a.el ?? 12), b.fore); }
    arms[side] = { sj, el, wr, handAng: a.handAng };
  }

  const legCol = (dark) => (P.shorts ? skin : pants);
  // --- tay xa ---
  drawArm(ctx, arms.far, b, shirt, skin, sleeve, lw, 0.22);
  // --- chân xa --- (xe đạp: đã vẽ sau khung)
  if (!pose.skipFarLeg) drawLeg(ctx, legs.far, b, pants, skin, shoes, P, lw, 0.22);
  // --- thân ---
  drawTorso(ctx, hip, shoulder, fwd, torsoDir, b, P, shirt, pants, lw, lean, legs);
  // --- chân gần ---
  drawLeg(ctx, legs.near, b, pants, skin, shoes, P, lw, 0);
  // --- cổ + đầu ---
  seg(ctx, neckBase, add(headC, [-b.headR * 0.15, b.headR * 0.55]), b.neck * 0.62, b.neck * 0.58, skin, lw, 0.06);
  if (P.shirtStyle !== 'tank') drawCollar(ctx, neckBase, fwd, b, shirt, lw, P);
  ctx.save(); ctx.translate(headC[0], headC[1]); ctx.rotate(headTilt * D);
  head(k, ctx, P, b, o, lw);
  ctx.restore();
  // --- tay gần ---
  drawArm(ctx, arms.near, b, shirt, skin, sleeve, lw, 0);
  return { hip, shoulder, head: headC, hands: { near: arms.near.wr, far: arms.far.wr }, feet: { near: legs.near.ankle, far: legs.far.ankle } };
}
function drawLeg(ctx, L, b, pants, skin, shoes, P, lw, dark) {
  const { hj, knee, ankle } = L;
  const thighCol = pants, shinCol = P.shorts ? skin : pants;
  if (P.shorts || P.skirt) seg(ctx, knee, ankle, b.wKnee * 0.92, b.wAnkle, skin, lw, dark);
  seg(ctx, hj, knee, b.wThigh, b.wKnee, P.skirt ? skin : thighCol, lw, dark);
  if (!P.shorts && !P.skirt) seg(ctx, knee, ankle, b.wKnee * 1.02, b.wAnkle * 1.25, shinCol, lw, dark);
  if (P.shorts) { // ống quần đùi tới trên gối
    const e = lerp2(hj, knee, 0.82); seg(ctx, hj, e, b.wThigh * 1.12, b.wKnee * 1.25, pants, lw, dark);
  }
  // nếp quần sau gối
  if (!P.shorts && !P.skirt) crease(ctx, lerp2(knee, ankle, 0.04), lerp2(knee, hj, 0.18), lw * 0.7);
  // bàn chân (dép): xoay quanh cổ chân theo L.ang (độ, + = nhấc gót)
  ctx.save(); ctx.translate(ankle[0], ankle[1]); ctx.rotate(-L.ang * D);
  const fl = b.foot;
  const fc = dark ? vary(skin, -dark) : skin;
  shape(ctx, [[-fl * 0.2, -b.wAnkle * 0.6], [fl * 0.2, -b.wAnkle * 0.7], [fl * 0.78, b.ankle * 0.55], [fl * 0.82, b.ankle * 0.95], [-fl * 0.22, b.ankle * 0.95], [-fl * 0.28, 0.2]], fc, lw);
  // dép tổ ong / dép lê: đế + quai
  const sc = dark ? vary(shoes, -dark) : shoes;
  shape(ctx, [[-fl * 0.3, b.ankle * 0.8], [fl * 0.86, b.ankle * 0.8], [fl * 0.86, b.ankle * 1.18], [-fl * 0.3, b.ankle * 1.18]], sc, lw * 0.8);
  if (P.shoeStyle === 'shoe') shape(ctx, [[-fl * 0.3, b.ankle * 0.9], [-fl * 0.25, -b.wAnkle * 0.3], [fl * 0.3, -b.wAnkle * 0.2], [fl * 0.86, b.ankle * 0.5], [fl * 0.86, b.ankle * 0.95]], sc, lw * 0.8);
  else { ctx.strokeStyle = sc; ctx.lineWidth = b.wAnkle * 0.55; ctx.beginPath(); ctx.moveTo(fl * 0.2, b.ankle * 0.85); ctx.lineTo(fl * 0.42, b.ankle * 0.15); ctx.stroke(); }
  ctx.restore();
}
function drawArm(ctx, A, b, shirt, skin, sleeve, lw, dark) {
  const { sj, el, wr } = A;
  // bàn tay: mu tay + ngón khum + ngón cái
  const dir = Math.atan2(wr[1] - el[1], wr[0] - el[0]) + (A.handAng ?? 0) * D;
  const h = b.hand, sk = dark ? vary(skin, -dark) : skin;
  ctx.save(); ctx.translate(wr[0], wr[1]); ctx.rotate(dir);
  ctx.beginPath(); ctx.moveTo(0, -b.wWrist); ctx.quadraticCurveTo(h * 0.7, -b.wWrist * 1.3, h * 1.05, -b.wWrist * 0.2); ctx.quadraticCurveTo(h * 1.15, b.wWrist * 0.9, h * 0.6, b.wWrist * 1.1); ctx.lineTo(0, b.wWrist); ctx.closePath();
  ctx.fillStyle = sk; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = vary(sk, -0.6); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(h * 0.35, -b.wWrist * 1.0, h * 0.28, b.wWrist * 0.38, -0.5, 0, Math.PI * 2); ctx.fillStyle = vary(sk, -0.05); ctx.fill(); ctx.lineWidth = lw * 0.8; ctx.stroke();
  ctx.restore();
  const longS = sleeve === 'long', none = sleeve === 'none';
  seg(ctx, el, wr, b.wElbow, b.wWrist * (longS ? 1.35 : 1), longS ? shirt : skin, lw, dark);
  seg(ctx, sj, el, b.wArm, b.wElbow, none ? skin : shirt, lw, dark);
  if (sleeve === 'short') { const e = lerp2(sj, el, 0.55); seg(ctx, sj, e, b.wArm * 1.15, b.wArm * 1.05, shirt, lw, dark); }
  if (longS) { crease(ctx, lerp2(el, sj, 0.12), lerp2(el, wr, 0.1), lw * 0.7); const c = lerp2(el, wr, 0.92); crease(ctx, [c[0] - 1.5, c[1] - 1.5], [c[0] + 1.5, c[1] + 1.5], lw * 0.8, 0.5); }
}
function drawTorso(ctx, hip, sh, fwd, up, b, P, shirt, pants, lw, lean, legs) {
  const L = b.torso;
  const at = (u, f) => [hip[0] + up[0] * L * u + fwd[0] * f, hip[1] + up[1] * L * u + fwd[1] * f];
  const st = P.shirtStyle ?? 'shirt';
  // mông + cạp quần
  const seat = [at(-0.12, -b.waist * 1.05), at(0.18, -b.waist * 0.95), at(0.2, b.waist * 0.95), at(-0.05, b.waist * 1.0), lerp2(legs.near.knee, legs.near.hj, 0.7), at(-0.25, b.waist * 0.2)];
  ctx.save(); smooth(ctx, seat); const pg = ctx.createLinearGradient(...at(0, b.waist), ...at(0, -b.waist)); pg.addColorStop(0, vary(P.skirt ? P.skirt : pants, 0.06)); pg.addColorStop(1, vary(P.skirt ? P.skirt : pants, -0.25)); ctx.fillStyle = pg; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = OL; ctx.stroke(); ctx.restore();
  if (P.skirt) { const kneeN = legs.near.knee; shape(ctx, [at(0.15, -b.waist), at(0.15, b.waist), add(kneeN, [6, 6]), add(kneeN, [-b.thigh * 0.9, 8])], P.skirt, lw); }
  // thân áo
  const bust = b.bust ? 1.2 : 0;
  const tail = st === 'baba' || st === 'jacket' ? -0.18 : st === 'tank' ? 0.02 : -0.06;
  const pts = [
    at(tail, -b.waist * 1.05), at(0.45, -b.chest * 0.98), at(0.88, -b.chest * 0.92), at(1.0, -b.chest * 0.55),
    at(1.02, b.chest * 0.3), at(0.82, b.chest * 0.95 + bust), at(0.6, b.chest * 0.92 + bust * 0.6), at(0.3, b.waist * 0.98), at(tail, b.waist * 1.08),
  ];
  const g = ctx.createLinearGradient(...at(0.6, b.chest), ...at(0.6, -b.chest));
  g.addColorStop(0, vary(shirt, 0.1)); g.addColorStop(0.5, shirt); g.addColorStop(1, vary(shirt, -0.3));
  smooth(ctx, pts); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = vary(shirt, -0.6); ctx.stroke();
  // chi tiết áo: hàng cúc / nẹp áo bà ba / nếp nhăn eo
  ctx.save(); smooth(ctx, pts); ctx.clip();
  if (st === 'shirt' || st === 'jacket') { const a = at(0.98, b.chest * 0.62), c = at(tail + 0.02, b.waist * 0.98); crease(ctx, a, c, lw * 0.8, 0.5); for (let i = 1; i < 5; i++) { const p = lerp2(a, c, i / 5.2); ctx.fillStyle = vary(shirt, 0.45); ctx.beginPath(); ctx.arc(p[0] - fwd[0] * 1.2, p[1] - fwd[1] * 1.2, 0.55, 0, Math.PI * 2); ctx.fill(); } }
  if (st === 'shirt') { const p0 = at(0.72, b.chest * 0.2); ctx.save(); ctx.globalAlpha *= 0.5; ctx.strokeStyle = OL; ctx.lineWidth = lw * 0.6; ctx.strokeRect(p0[0] - 2, p0[1] - 1.5, 4, 3.5); ctx.restore(); }
  if (st === 'baba') { const a = at(0.95, b.chest * 0.75), c = at(tail + 0.02, b.waist * 0.5); crease(ctx, a, c, lw * 0.9, 0.5); }
  for (let i = 0; i < 3; i++) crease(ctx, at(0.2 + i * 0.05, -b.waist * 0.6), at(0.24 + i * 0.05, b.waist * 0.2), lw * 0.6, 0.22);
  ctx.restore();
}
function drawCollar(ctx, neckBase, fwd, b, shirt, lw, P) {
  if (P.shirtStyle === 'baba') return;
  const c = vary(shirt, 0.06);
  shape(ctx, [add(neckBase, [-b.neck * 0.9, 0.5]), add(neckBase, [-b.neck * 0.3, -1.6]), add(neckBase, [b.neck * 0.8, 0.2]), add(neckBase, [b.neck * 1.1, 2.6]), add(neckBase, [0, 1.2])], c, lw * 0.9);
}

// ---------- API ----------
const pick = (o) => {
  const b = BODIES[o.body ?? 'man'] ?? BODIES.man;
  return { b, sc: 1 / natural(b) * 100 };
};
// Vẽ người. Trả về toạ độ thế giới của tay/đầu (để gắn đồ vật).
export function person(k, x, y, h, o = {}) {
  const { ctx } = k, { b, sc } = pick(o);
  const s = (h / 100) * sc, dir = o.flip ? -1 : 1;
  const dist = o.dist ?? (x / s) * dir;
  const act = o.action ?? 'stand';
  const pose = o.pose ?? (act === 'walk' ? poseWalk(b, o, dist) : act === 'sit' ? poseSit(b, o) : act === 'squat' ? poseSquat(b, o) : act === 'kneel' ? poseKneel(b, o) : poseStand(b, o));
  if (o.arms) pose.arms = { ...pose.arms, ...o.arms };
  if (o.breath !== false && act !== 'walk') pose.hip = [pose.hip[0], pose.hip[1] - Math.sin(T(k) * 1.6 + (o.phase ?? 0)) * 0.25];
  const lw = (o.lw ?? 0.7);
  // bóng đổ
  if (o.shadow !== false) { ctx.save(); ctx.filter = 'blur(5px)'; ctx.globalAlpha = 0.35 * (o.alpha ?? 1); ctx.fillStyle = '#05040a'; ctx.beginPath(); ctx.ellipse(x + dir * (pose.hip[0]) * s, y + 2, h * 0.17, h * 0.026, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  const r = body(k, ctx, o.preset ?? o, b, pose, o, lw);
  ctx.restore();
  const w = (p) => [x + p[0] * s * dir, y + p[1] * s];
  return { hands: { near: w(r.hands.near), far: w(r.hands.far) }, head: w(r.head), hip: w(r.hip), s, dir };
}

// ---------- xe đạp ----------
// Hình học (đơn vị người cao 100, gốc = mặt đất dưới trục giữa): bánh r 20, trục sau (-27,-20), trục trước (35,-20).
const BK = { r: 20, rear: [-27, -20], front: [35, -20], bb: [0, -16], seat: [-9, -51], head: [29, -52], bar: [21, -64], crank: 9.5 };
function wheel(ctx, c, r, rot, lw, frame) {
  ctx.save(); ctx.translate(c[0], c[1]);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.lineWidth = 3.2; ctx.strokeStyle = '#141414'; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r - 1.6, 0, Math.PI * 2); ctx.lineWidth = 1.1; ctx.strokeStyle = '#a9adb2'; ctx.stroke();
  ctx.lineWidth = 0.28; ctx.strokeStyle = 'rgba(200,204,210,0.85)';
  for (let i = 0; i < 18; i++) { const a = rot + (i / 18) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(Math.cos(a + 0.3) * 1.4, Math.sin(a + 0.3) * 1.4); ctx.lineTo(Math.cos(a) * (r - 2), Math.sin(a) * (r - 2)); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(0, 0, 1.9, 0, Math.PI * 2); ctx.fillStyle = '#8a8e94'; ctx.fill(); ctx.lineWidth = lw * 0.6; ctx.strokeStyle = OL; ctx.stroke();
  // nhoè chuyển động khi quay nhanh
  ctx.restore();
}
function tube(ctx, a, b2, w, col) { ctx.lineCap = 'round'; ctx.strokeStyle = OL; ctx.lineWidth = w + 0.9; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b2[0], b2[1]); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = w * 0.3; ctx.beginPath(); ctx.moveTo(a[0], a[1] - w * 0.2); ctx.lineTo(b2[0], b2[1] - w * 0.2); ctx.stroke(); }
export function bicycle(k, x, y, h, o = {}) {
  const { ctx } = k, rider = o.rider;
  const { b, sc } = pick(rider ?? {});
  const s = (h / 100) * sc, dir = o.flip ? -1 : 1;
  const dist = o.dist ?? (x / s) * dir;
  const rot = dist / BK.r;                 // bánh lăn đúng quãng đường
  const crank = rot / 2.4 + (o.crank0 ?? 0); // tỉ số đĩa/líp
  const col = o.color ?? '#1d2a2a', chrome = '#b9bec4', lw = 0.85;
  const nu = o.frame === 'nu';
  if (o.shadow !== false) { ctx.save(); ctx.filter = 'blur(5px)'; ctx.globalAlpha = 0.35; ctx.fillStyle = '#05040a'; ctx.beginPath(); ctx.ellipse(x + dir * 4 * s, y + 2, 40 * s, 3 * s, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  const pedal = (a) => [BK.bb[0] + Math.cos(a) * BK.crank, BK.bb[1] + Math.sin(a) * BK.crank];
  const pN = pedal(crank), pF = pedal(crank + Math.PI);
  // chân xa + bàn đạp xa (sau khung)
  let R = null;
  const hipP = [BK.seat[0] + 0.5, BK.seat[1] - 2.4];
  const riderPose = rider ? {
    hip: hipP, lean: (o.lean ?? 17) + (b.stoop ? 6 : 0),
    feet: { near: { ankle: [pN[0] - 1.8, pN[1] - b.ankle * 0.9], ang: 6 + Math.sin(crank) * 10 }, far: { ankle: [pF[0] - 1.8, pF[1] - b.ankle * 0.9], ang: 6 + Math.sin(crank + Math.PI) * 10 } },
    arms: { near: { hand: [BK.bar[0] + 1, BK.bar[1] + 1.5], handAng: 30 }, far: { hand: [BK.bar[0] + 2, BK.bar[1] + 0.5], handAng: 30 } },
  } : null;
  // bánh
  wheel(ctx, BK.rear, BK.r, rot, lw); wheel(ctx, BK.front, BK.r, rot, lw);
  // chắn bùn
  ctx.lineWidth = 2; ctx.strokeStyle = vary(col, 0.1); ctx.beginPath(); ctx.arc(BK.rear[0], BK.rear[1], BK.r + 2.2, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); ctx.beginPath(); ctx.arc(BK.front[0], BK.front[1], BK.r + 2.2, Math.PI * 1.1, Math.PI * 1.85); ctx.stroke();
  // bàn đạp + đùi đĩa phía xa
  tube(ctx, BK.bb, pF, 1.3, '#555'); ctx.fillStyle = '#333'; ctx.fillRect(pF[0] - 2.5, pF[1] - 0.8, 5, 1.6);
  if (rider) drawLegOnly(k, ctx, rider, b, riderPose, 'far', lw); // chân xa vẽ trước khung
  // khung
  const seatTop = [BK.seat[0] + 0.6, BK.seat[1] + 3];
  const st1 = lerp2(BK.bb, seatTop, 0.82);
  tube(ctx, BK.rear, BK.bb, 1.6, col);                       // gióng xích
  tube(ctx, BK.rear, st1, 1.5, col);                          // gióng yên sau
  tube(ctx, BK.bb, st1, 2.4, col);                            // ống yên
  tube(ctx, st1, seatTop, 1.4, chrome);                       // cọc yên
  if (nu) { ctx.lineCap = 'round'; ctx.strokeStyle = OL; ctx.lineWidth = 3.3; ctx.beginPath(); ctx.moveTo(BK.head[0] + 1, BK.head[1] + 4); ctx.quadraticCurveTo(10, -22, BK.bb[0] + 1, BK.bb[1]); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.stroke(); }
  else { tube(ctx, lerp2(BK.bb, st1, 0.92), [BK.head[0] - 0.5, BK.head[1] + 3.5], 2.3, col); tube(ctx, BK.bb, [BK.head[0] + 0.5, BK.head[1] + 8], 2.5, col); }
  tube(ctx, [BK.head[0] - 0.3, BK.head[1]], [BK.head[0] + 1.6, BK.head[1] + 9], 3, col); // cổ phốt
  ctx.lineCap = 'round'; ctx.strokeStyle = OL; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(BK.head[0] + 1.6, BK.head[1] + 9); ctx.quadraticCurveTo(BK.front[0] - 1, BK.front[1] - 10, BK.front[0], BK.front[1]); ctx.stroke(); ctx.strokeStyle = chrome; ctx.lineWidth = 1.7; ctx.stroke(); // phuộc
  tube(ctx, BK.head, [BK.head[0] - 1.5, BK.bar[1] + 1], 1.4, chrome);                     // pô tăng
  ctx.strokeStyle = OL; ctx.lineWidth = 2.1; ctx.beginPath(); ctx.moveTo(BK.head[0] - 1.5, BK.bar[1] + 1); ctx.quadraticCurveTo(BK.bar[0] + 9, BK.bar[1] - 3, BK.bar[0], BK.bar[1]); ctx.stroke(); ctx.strokeStyle = chrome; ctx.lineWidth = 1.3; ctx.stroke(); // ghi đông cong
  ctx.fillStyle = '#2a2420'; ctx.beginPath(); ctx.ellipse(BK.bar[0] + 0.5, BK.bar[1] + 0.2, 2.6, 1.3, 0.2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = chrome; ctx.beginPath(); ctx.arc(BK.head[0] + 3, BK.bar[1] + 1.5, 1.3, 0, Math.PI * 2); ctx.fill(); ctx.lineWidth = 0.5; ctx.strokeStyle = OL; ctx.stroke(); // chuông
  // yên
  shape(ctx, [[seatTop[0] - 6, seatTop[1] - 1], [seatTop[0] + 5, seatTop[1] - 1.8], [seatTop[0] + 6, seatTop[1] - 0.4], [seatTop[0] - 5.5, seatTop[1] + 1.4]], '#2a1e16', lw * 0.8);
  // baga sau + đồ chở
  if (o.rack !== false) {
    ctx.strokeStyle = chrome; ctx.lineWidth = 0.9; ctx.beginPath(); ctx.moveTo(seatTop[0] - 3, seatTop[1] + 4); ctx.lineTo(BK.rear[0] - 9, seatTop[1] + 4); ctx.moveTo(BK.rear[0] - 6, seatTop[1] + 4); ctx.lineTo(BK.rear[0], BK.rear[1]); ctx.moveTo(seatTop[0] - 6, seatTop[1] + 4); ctx.lineTo(BK.rear[0] + 1, BK.rear[1]); ctx.stroke();
    if (o.load) o.load(ctx, [BK.rear[0] - 4, seatTop[1] + 3]);
  }
  // giỏ trước
  if (o.basket) { ctx.save(); ctx.translate(BK.bar[0] + 9, BK.bar[1] + 3); shape(ctx, [[-4, 0], [9, 0], [8, 9], [-3, 9]], '#9a7a46', lw * 0.8); ctx.globalAlpha *= 0.4; ctx.lineWidth = 0.4; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-3.5, 2 + i * 2); ctx.lineTo(8.5, 2 + i * 2); ctx.stroke(); } ctx.restore(); }
  // vỏ xích + đĩa
  ctx.save(); ctx.globalAlpha *= 0.95; shape(ctx, [[BK.bb[0] + 6, BK.bb[1] - 5], [BK.rear[0] + 2, BK.rear[1] - 3], [BK.rear[0] + 2, BK.rear[1] + 3], [BK.bb[0] + 6, BK.bb[1] + 6]], vary(col, 0.08), lw * 0.8); ctx.restore();
  ctx.beginPath(); ctx.arc(BK.bb[0], BK.bb[1], 6.5, 0, Math.PI * 2); ctx.fillStyle = vary(col, 0.05); ctx.fill(); ctx.lineWidth = lw * 0.8; ctx.strokeStyle = OL; ctx.stroke();
  ctx.save(); ctx.translate(BK.bb[0], BK.bb[1]); ctx.rotate(crank); ctx.strokeStyle = chrome; ctx.lineWidth = 0.6; for (let i = 0; i < 5; i++) { ctx.rotate(Math.PI * 2 / 5); ctx.beginPath(); ctx.moveTo(1.5, 0); ctx.lineTo(5.5, 0); ctx.stroke(); } ctx.restore();
  // chân chống
  if (o.kick) tube(ctx, [BK.bb[0] - 5, BK.bb[1] + 1], [BK.bb[0] - 13, 0], 1.1, chrome);
  // người
  if (rider) {
    R = body(k, ctx, rider, b, { ...riderPose, skipFarLeg: true }, { ...rider, ...o.act }, lw);
  }
  // bàn đạp + đùi đĩa gần
  tube(ctx, BK.bb, pN, 1.4, '#666'); ctx.fillStyle = '#222'; ctx.fillRect(pN[0] - 2.8, pN[1] - 0.9, 5.6, 1.8);
  ctx.restore();
  return R ? { head: [x + R.head[0] * s * dir, y + R.head[1] * s], s, dir } : { s, dir };
}
// chỉ vẽ một chân (dùng cho chân phía xa sau khung xe)
function drawLegOnly(k, ctx, P, b, pose, side, lw) {
  const f = pose.feet[side];
  const hj = add(pose.hip, [-0.6, 0]);
  const r = ik(hj, f.ankle, b.thigh, b.shin, +1);
  drawLeg(ctx, { hj, knee: r.mid, ankle: r.end, ang: f.ang }, b, P.pants ?? '#3a3a40', P.skin ?? '#d8a880', P.shoes ?? '#3a2a20', P, lw, 0.22);
}

// ---------- câu cá ----------
// Người ngồi ghế nhựa thấp bên bờ, cần tre, dây, phao. waterY = mặt nước (toạ độ thế giới); o.bite 0..1 phao chìm, cần cong.
export function fishing(k, x, y, h, o = {}) {
  const { ctx } = k, P = o.rider ?? o;
  const { b, sc } = pick(P);
  const s = (h / 100) * sc, dir = o.flip ? -1 : 1, t = T(k);
  const bite = o.bite ?? 0;
  const seatH = 12;
  // ghế nhựa đỏ
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-9, -seatH], [7, -seatH], [8, -seatH + 2], [-10, -seatH + 2]], o.stool ?? '#b8322a', 0.8);
  shape(ctx, [[-8, -seatH + 2], [-6, -seatH + 2], [-8, 0], [-10, 0]], vary(o.stool ?? '#b8322a', -0.2), 0.7);
  shape(ctx, [[4, -seatH + 2], [6, -seatH + 2], [8, 0], [6, 0]], vary(o.stool ?? '#b8322a', -0.2), 0.7);
  ctx.restore();
  // cần: gốc kẹp dưới đùi, đi qua hai tay, ngọn vươn ra nước
  const tw = Math.sin(t * 1.3) * 1.2 + bite * 6;
  const rodAng = -(36 - bite * 10) * D; // so với phương ngang
  const butt = [6, -seatH - 6];
  const len = o.rod ?? 150;
  const tip = [butt[0] + Math.cos(rodAng) * len, butt[1] + Math.sin(rodAng) * len + tw];
  const handN = [butt[0] + Math.cos(rodAng) * 16, butt[1] + Math.sin(rodAng) * 16];
  const handF = [butt[0] + Math.cos(rodAng) * 24, butt[1] + Math.sin(rodAng) * 24];
  const res = person(k, x, y, h, { ...P, flip: o.flip, action: 'sit', seat: seatH, lean: 14, face: o.face ?? P.face, arms: { near: { hand: handN, handAng: -40 }, far: { hand: handF, handAng: -40 } }, shadow: o.shadow, talk: o.talk });
  // vẽ cần trên cùng (đi qua tay gần)
  const W = (p) => [x + p[0] * s * dir, y + p[1] * s];
  const B0 = W(butt), M = W([butt[0] + Math.cos(rodAng) * len * 0.55, butt[1] + Math.sin(rodAng) * len * 0.55 - 4 + tw * 0.3]), Tp = W(tip);
  ctx.save(); ctx.lineCap = 'round';
  ctx.strokeStyle = OL; ctx.lineWidth = 3.2 * s; ctx.beginPath(); ctx.moveTo(...B0); ctx.quadraticCurveTo(...M, ...Tp); ctx.stroke();
  const rg = ctx.createLinearGradient(...B0, ...Tp); rg.addColorStop(0, '#b89a58'); rg.addColorStop(1, '#d8c48a');
  ctx.strokeStyle = rg; ctx.lineWidth = 2.1 * s; ctx.stroke();
  // đốt tre
  for (let i = 1; i < 7; i++) { const u = i / 7, p = [lerp(lerp(B0[0], M[0], u), lerp(M[0], Tp[0], u), u), lerp(lerp(B0[1], M[1], u), lerp(M[1], Tp[1], u), u)]; ctx.fillStyle = '#7a6236'; ctx.beginPath(); ctx.arc(p[0], p[1], 1.4 * s * (1 - u * 0.6), 0, Math.PI * 2); ctx.fill(); }
  // dây + phao
  const wy = o.water ?? y + 40;
  const fx = Tp[0] + dir * (o.cast ?? 60) * s;
  const fy = wy + Math.sin(t * 2.1) * 1.5 + bite * 10;
  ctx.strokeStyle = 'rgba(235,235,230,0.7)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(...Tp); ctx.quadraticCurveTo(lerp(Tp[0], fx, 0.6), lerp(Tp[1], fy, 0.9) + 6, fx, fy - 4); ctx.stroke();
  // phao lông nhím: nửa đỏ nửa trắng
  ctx.save(); ctx.translate(fx, fy); ctx.rotate(Math.sin(t * 1.7) * 0.08 + bite * 0.4);
  ctx.fillStyle = '#d83a2a'; ctx.fillRect(-1.2, -9, 2.4, 6); ctx.fillStyle = '#f2ece0'; ctx.fillRect(-1.2, -3, 2.4, 5);
  ctx.restore();
  // gợn sóng quanh phao
  for (let i = 0; i < 3; i++) { const u = ((t * 0.45 + i / 3) % 1); ctx.globalAlpha = (1 - u) * 0.5; ctx.strokeStyle = '#e8eef0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(fx, wy + 2, 6 + u * 40, 1.5 + u * 6, 0, 0, Math.PI * 2); ctx.stroke(); }
  ctx.restore();
  return { ...res, float: [fx, fy], tip: Tp };
}
