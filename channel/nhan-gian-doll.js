// Nhân Gian Chưa Kể — nhân vật kiểu "búp bê" (17/11/2026), theo ảnh mẫu người dùng gửi (phong cách Khuất Mặt Kỳ Truyện):
// đầu to tròn (~45% chiều cao), thân như viên thuốc, tay ống tròn đầu, mặt ít nét (mắt chấm / mắt long lanh khi khóc,
// mũi một nét cong, miệng một vạch), viền nâu đậm đều, màu trầm phẳng. Đơn giản nhưng có duyên.
//
//   doll(k, x, yChân, cao, o)   o.view 'front' | 'side' (nghiêng, quay phải; flip = quay trái)
//                               o.action 'stand' | 'walk' | 'sit' | 'kneel'; o.arms 'down'|'hold'|'chest'|'point'|'wave'|'cover'|'raise'|'back'
//   dollBike(k, x, yĐất, cao, o)  xe đạp + người ngồi đạp (nhìn nghiêng), bánh quay theo quãng đường, chân bám pedal.
//   dollFish(k, x, yĐất, cao, o)  ngồi ghế con câu cá: cần tre, dây, phao, gợn nước (o.water = y mặt nước, o.bite 0..1).
// Preset: { kind: man|woman|kid|old, skin, hair: bun|spiky|short|bob|long|bald|buzz, hairColor, tie (dây buộc tóc),
//           top, topStyle: frog|button|baba|tank, bottom, skirt (true = váy), band (màu viền váy), pants, shoes, hat: non|coi|khan|cap }
// Diễn: face calm|sad|cry|fear|shock|angry|smug|happy|blank|sleep, talk 0..1, tears 0..1, look (-1..1 liếc trái/phải).
import { vary } from '/channel/nhan-gian-hd.js';

const LINE = '#2c1f17';
const T = (k) => k.gt ?? 0;
const D = Math.PI / 180;
const lerp = (a, b, t) => a + (b - a) * t;

const KIND = {
  man: { R: 21, body: 50, w: 15.5, flare: 1.08 },
  woman: { R: 20.5, body: 49, w: 14, flare: 1.12 },
  kid: { R: 22, body: 40, w: 13, flare: 1.05 },
  old: { R: 20, body: 48, w: 14.5, flare: 1.1, stoop: 1 },
};

function path(ctx, fill, lw, fn, stroke = LINE) { ctx.beginPath(); fn(); ctx.fillStyle = fill; ctx.fill(); if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
const rrect = (ctx, x, y, w, h, r) => { ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath(); };

// ---------- mặt ----------
// (cx, cy) tâm mặt, R bán kính đầu. side = nhìn nghiêng (mắt, mũi dồn về phía trước).
function face(k, ctx, cx, cy, R, o, lw, side) {
  const gt = T(k), f = o.face ?? 'calm';
  const blink = (gt * 0.23 + (o.phase ?? 0) * 0.17) % 1 < 0.025 && f !== 'sleep';
  const look = (o.look ?? 0) * R * 0.04;
  const ex = side ? [cx + R * 0.48] : [cx - R * 0.36, cx + R * 0.36];
  const ey = cy + R * 0.12;
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // má hồng rất nhẹ
  ctx.save(); ctx.globalAlpha *= 0.16; ctx.fillStyle = '#e07a6a';
  for (const x of ex) { ctx.beginPath(); ctx.ellipse(x + (side ? -R * 0.05 : 0), ey + R * 0.25, R * 0.14, R * 0.08, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
  for (const [i, x0] of ex.entries()) {
    const x = x0 + look, d = side ? 1 : (i ? 1 : -1);
    ctx.strokeStyle = LINE; ctx.fillStyle = LINE;
    if (blink || f === 'sleep') { ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x - R * 0.09, ey); ctx.quadraticCurveTo(x, ey + R * 0.05, x + R * 0.09, ey); ctx.stroke(); continue; }
    if (f === 'sad' || f === 'cry' || f === 'fear') {
      // mắt long lanh: tròng xanh xám, hai đốm sáng
      const w = R * 0.11, h = R * (f === 'fear' ? 0.15 : 0.13);
      ctx.fillStyle = '#f4f0ea'; ctx.beginPath(); ctx.ellipse(x, ey, w, h, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#6a8494'; ctx.beginPath(); ctx.ellipse(x, ey + h * 0.12, w * 0.82, h * 0.82, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#26323a'; ctx.beginPath(); ctx.ellipse(x, ey + h * 0.15, w * 0.45, h * 0.48, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x - w * 0.3, ey - h * 0.3, w * 0.28, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(x + w * 0.3, ey + h * 0.35, w * 0.14, 0, Math.PI * 2); ctx.fill();
      ctx.lineWidth = lw * 0.9; ctx.strokeStyle = LINE; ctx.beginPath(); ctx.ellipse(x, ey, w, h, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
      if (f !== 'fear') { ctx.fillStyle = 'rgba(150,200,230,0.55)'; ctx.beginPath(); ctx.ellipse(x, ey + h * 0.95, w * 0.95, h * 0.25, 0, 0, Math.PI); ctx.fill(); }
    } else if (f === 'smug' || f === 'angry' || f === 'blank') {
      // mắt khép hờ: nửa chấm dưới một nét mí ngang
      const w = R * 0.1;
      ctx.beginPath(); ctx.ellipse(x, ey + R * 0.01, w * 0.62, w * 0.62, 0, 0, Math.PI); ctx.fill();
      ctx.lineWidth = lw * 1.1; ctx.beginPath(); ctx.moveTo(x - w * 1.1, ey - (f === 'angry' ? d * -R * 0.02 : 0)); ctx.lineTo(x + w * 1.1, ey + (f === 'angry' ? d * -R * 0.02 : 0)); ctx.stroke();
      ctx.save(); ctx.globalAlpha *= 0.35; ctx.fillStyle = '#b07a6a'; ctx.beginPath(); ctx.ellipse(x, ey + R * 0.1, w * 0.9, w * 0.28, 0, 0, Math.PI); ctx.fill(); ctx.restore();
    } else if (f === 'shock') {
      ctx.fillStyle = '#f4f0ea'; ctx.beginPath(); ctx.arc(x, ey, R * 0.11, 0, Math.PI * 2); ctx.fill(); ctx.lineWidth = lw * 0.8; ctx.stroke();
      ctx.fillStyle = LINE; ctx.beginPath(); ctx.arc(x, ey, R * 0.035, 0, Math.PI * 2); ctx.fill();
    } else if (f === 'happy') {
      ctx.lineWidth = lw * 1.1; ctx.beginPath(); ctx.moveTo(x - R * 0.08, ey + R * 0.02); ctx.quadraticCurveTo(x, ey - R * 0.08, x + R * 0.08, ey + R * 0.02); ctx.stroke();
    } else { // calm: chấm tối có đốm sáng
      ctx.beginPath(); ctx.ellipse(x, ey, R * 0.065, R * 0.085, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.beginPath(); ctx.arc(x - R * 0.02, ey - R * 0.035, R * 0.022, 0, Math.PI * 2); ctx.fill();
    }
    // mày: một nét ngắn
    const tilt = { sad: -1, cry: -1, fear: -1.2, angry: 1.3, smug: 0.5, shock: -0.3 }[f] ?? 0;
    const by = ey - R * (f === 'shock' || f === 'fear' ? 0.3 : 0.24);
    ctx.lineWidth = lw * 1.05; ctx.strokeStyle = LINE;
    ctx.beginPath(); ctx.moveTo(x - d * R * 0.12, by + tilt * R * 0.035); ctx.lineTo(x + d * R * 0.1, by - tilt * R * 0.035); ctx.stroke();
  }
  // nước mắt chảy
  const tears = o.tears ?? (f === 'cry' ? 1 : 0);
  if (tears > 0) { ctx.save(); ctx.fillStyle = 'rgba(160,210,240,0.85)'; for (const x of ex) { const u = (gt * 0.45 + x * 0.01) % 1; ctx.beginPath(); ctx.ellipse(x + R * 0.06, ey + R * 0.2 + u * R * 0.35 * tears, R * 0.035, R * 0.055, 0, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); }
  // mũi: một nét cong
  const nx = side ? cx + R * 0.86 : cx + R * 0.02, ny = cy + R * 0.33;
  ctx.lineWidth = lw * 0.95; ctx.strokeStyle = LINE; ctx.beginPath();
  if (side) { ctx.moveTo(nx, ny - R * 0.1); ctx.quadraticCurveTo(nx + R * 0.12, ny + R * 0.02, nx - R * 0.02, ny + R * 0.05); }
  else { ctx.moveTo(nx - R * 0.01, ny - R * 0.07); ctx.quadraticCurveTo(nx + R * 0.06, ny, nx - R * 0.02, ny + R * 0.05); }
  ctx.stroke();
  // miệng
  const talk = o.talk ?? 0;
  const open = Math.max({ shock: 0.7, fear: 0.4, cry: 0.25 }[f] ?? 0, talk ? talk * (0.3 + 0.7 * Math.abs(Math.sin(gt * 9.3 + (o.phase ?? 0)))) : 0);
  const mx = side ? cx + R * 0.66 : cx, my = cy + R * 0.55, mw = R * 0.1;
  if (open > 0.15) { ctx.fillStyle = '#5a2a22'; ctx.beginPath(); ctx.ellipse(mx, my, mw * 0.75, R * 0.03 + open * R * 0.07, 0, 0, Math.PI * 2); ctx.fill(); ctx.lineWidth = lw * 0.8; ctx.stroke(); }
  else {
    const c = { sad: -1, cry: -1, fear: -0.6, angry: -0.8, happy: 1.2, smug: 0.4 }[f] ?? 0;
    ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(mx - mw, my - c * R * 0.015); ctx.quadraticCurveTo(mx, my + c * R * 0.05, mx + mw, my - c * R * 0.015); ctx.stroke();
  }
}

// ---------- tóc ----------
function hairBack(ctx, P, cx, cy, R, lw, side) {
  const hc = P.hairColor ?? '#3a2a20', h = P.hair ?? 'short';
  if (h === 'long') path(ctx, hc, lw, () => { ctx.moveTo(cx - R * 1.05, cy - R * 0.2); ctx.lineTo(cx - R * 1.1, cy + R * 1.5); ctx.quadraticCurveTo(cx, cy + R * 1.7, cx + R * (side ? -0.1 : 1.1), cy + R * 1.5); ctx.lineTo(cx + R * (side ? 0.2 : 1.05), cy - R * 0.2); ctx.closePath(); });
  if (h === 'bun') { // búi tóc thấp sau gáy, dây buộc
    const bx = cx + (side ? -R * 0.95 : -R * 0.82), by = cy + R * 0.62;
    path(ctx, hc, lw, () => ctx.ellipse(bx, by, R * 0.36, R * 0.38, 0, 0, Math.PI * 2));
    path(ctx, P.tie ?? '#1a1410', lw * 0.6, () => rrect(ctx, bx + R * 0.18, by - R * 0.32, R * 0.12, R * 0.5, R * 0.05));
  }
}
function hairFront(ctx, P, cx, cy, R, lw, side) {
  const hc = P.hairColor ?? '#3a2a20', h = P.hair ?? 'short';
  if (h === 'bald') return;
  const g = ctx.createLinearGradient(0, cy - R, 0, cy + R * 0.3); g.addColorStop(0, vary(hc, 0.12)); g.addColorStop(1, hc);
  if (side) {
    path(ctx, g, lw, () => {
      ctx.moveTo(cx + R * 0.72, cy - R * 0.5);
      ctx.quadraticCurveTo(cx + R * 0.5, cy - R * 1.12, cx - R * 0.2, cy - R * 1.05);
      ctx.quadraticCurveTo(cx - R * 1.12, cy - R * 0.85, cx - R * 1.04, cy + R * (h === 'buzz' ? 0.1 : 0.45));
      ctx.lineTo(cx - R * 0.55, cy + R * (h === 'buzz' ? 0.05 : 0.35));
      ctx.quadraticCurveTo(cx - R * 0.35, cy - R * 0.1, cx - R * 0.05, cy - R * 0.38);
      if (h === 'spiky') for (let i = 0; i < 3; i++) { ctx.lineTo(cx + R * (0.1 + i * 0.2), cy - R * 0.62); ctx.lineTo(cx + R * (0.2 + i * 0.2), cy - R * 0.45); }
      else ctx.quadraticCurveTo(cx + R * 0.35, cy - R * 0.62, cx + R * 0.72, cy - R * 0.5);
      ctx.closePath();
    });
    if (h === 'spiky') for (let i = 0; i < 4; i++) path(ctx, hc, lw, () => { const a = -2.6 + i * 0.4; ctx.moveTo(cx + Math.cos(a) * R * 0.9, cy + Math.sin(a) * R * 0.9); ctx.lineTo(cx + Math.cos(a + 0.2) * R * 1.3, cy + Math.sin(a + 0.2) * R * 1.3); ctx.lineTo(cx + Math.cos(a + 0.4) * R * 0.92, cy + Math.sin(a + 0.4) * R * 0.92); });
    return;
  }
  if (h === 'spiky') {
    path(ctx, g, lw, () => {
      ctx.moveTo(cx - R * 1.04, cy + R * 0.15);
      const n = 9; for (let i = 0; i <= n; i++) { const a = Math.PI * (1.0 + i / n); const rr = R * (i % 2 ? 1.32 : 1.02); ctx.lineTo(cx + Math.cos(a) * rr, cy - R * 0.05 + Math.sin(a) * rr); }
      ctx.lineTo(cx + R * 1.04, cy + R * 0.15);
      // mái lởm chởm
      for (let i = 0; i <= 6; i++) { const x = cx + R * (0.85 - i * 0.28); ctx.lineTo(x, cy - R * (i % 2 ? 0.2 : 0.42)); }
      ctx.closePath();
    });
    return;
  }
  if (h === 'buzz') { path(ctx, g, lw, () => { ctx.moveTo(cx - R * 1.0, cy - R * 0.05); ctx.bezierCurveTo(cx - R * 1.0, cy - R * 1.32, cx + R * 1.0, cy - R * 1.32, cx + R * 1.0, cy - R * 0.05); ctx.quadraticCurveTo(cx + R * 0.6, cy - R * 0.55, cx, cy - R * 0.58); ctx.quadraticCurveTo(cx - R * 0.6, cy - R * 0.55, cx - R * 1.0, cy - R * 0.05); ctx.closePath(); }); return; }
  // bun / short / bob / long: mũ tóc tròn, ngôi giữa chữ V
  const low = h === 'short' ? 0.1 : 0.5;
  path(ctx, g, lw, () => {
    ctx.moveTo(cx - R * 1.06, cy + R * low);
    ctx.bezierCurveTo(cx - R * 1.18, cy - R * 1.38, cx + R * 1.18, cy - R * 1.38, cx + R * 1.06, cy + R * low);
    ctx.quadraticCurveTo(cx + R * 0.95, cy - R * 0.25, cx + R * 0.55, cy - R * 0.45);
    ctx.quadraticCurveTo(cx + R * 0.15, cy - R * 0.52, cx, cy - R * 0.68);
    ctx.quadraticCurveTo(cx - R * 0.15, cy - R * 0.52, cx - R * 0.55, cy - R * 0.45);
    ctx.quadraticCurveTo(cx - R * 0.95, cy - R * 0.25, cx - R * 1.06, cy + R * low);
    ctx.closePath();
  });
  ctx.save(); ctx.globalAlpha *= 0.14; ctx.strokeStyle = '#fff'; ctx.lineWidth = R * 0.1; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(cx - R * 0.1, cy - R * 0.2, R * 0.75, -2.45, -2.0); ctx.stroke(); ctx.restore();
}
function hat(ctx, P, cx, cy, R, lw) {
  const h = P.hat; if (!h) return;
  if (h === 'non') { const c = P.hatColor ?? '#dcc48a'; path(ctx, c, lw, () => { ctx.moveTo(cx - R * 1.9, cy - R * 0.45); ctx.quadraticCurveTo(cx - R * 0.7, cy - R * 1.4, cx, cy - R * 2.2); ctx.quadraticCurveTo(cx + R * 0.7, cy - R * 1.4, cx + R * 1.9, cy - R * 0.45); ctx.quadraticCurveTo(cx, cy - R * 0.25, cx - R * 1.9, cy - R * 0.45); }); ctx.save(); ctx.globalAlpha *= 0.3; ctx.lineWidth = lw * 0.5; ctx.strokeStyle = LINE; for (let i = 1; i < 4; i++) { const u = i / 4; ctx.beginPath(); ctx.moveTo(cx - R * 1.9 * u, cy - R * 0.45 - R * 1.75 * (1 - u)); ctx.lineTo(cx + R * 1.9 * u, cy - R * 0.45 - R * 1.75 * (1 - u)); ctx.stroke(); } ctx.restore(); }
  if (h === 'coi') { const c = P.hatColor ?? '#6a7444'; path(ctx, vary(c, -0.1), lw, () => ctx.ellipse(cx, cy - R * 0.55, R * 1.45, R * 0.28, 0, 0, Math.PI * 2)); path(ctx, c, lw, () => { ctx.ellipse(cx, cy - R * 0.65, R * 1.02, R * 0.92, 0, Math.PI, 0); ctx.closePath(); }); }
  if (h === 'khan') { const c = P.hatColor ?? '#4a3a32'; path(ctx, c, lw, () => { ctx.moveTo(cx - R * 1.1, cy + R * 0.2); ctx.bezierCurveTo(cx - R * 1.2, cy - R * 1.4, cx + R * 1.2, cy - R * 1.4, cx + R * 1.1, cy + R * 0.2); ctx.quadraticCurveTo(cx, cy - R * 0.55, cx - R * 1.1, cy + R * 0.2); ctx.closePath(); }); }
  if (h === 'moquo') { // khăn mỏ quạ: khăn vuông đen gập chéo, mỏ nhọn trên trán, hai vạt sau gáy
    const c = P.hatColor ?? '#24201c';
    path(ctx, c, lw, () => { ctx.moveTo(cx - R * 1.12, cy + R * 0.25); ctx.bezierCurveTo(cx - R * 1.2, cy - R * 1.2, cx + R * 1.2, cy - R * 1.2, cx + R * 1.12, cy + R * 0.25); ctx.quadraticCurveTo(cx + R * 0.7, cy - R * 0.35, cx + R * 0.1, cy - R * 0.42); ctx.lineTo(cx, cy - R * 0.22); ctx.lineTo(cx - R * 0.1, cy - R * 0.42); ctx.quadraticCurveTo(cx - R * 0.7, cy - R * 0.35, cx - R * 1.12, cy + R * 0.25); ctx.closePath(); });
    ctx.save(); ctx.globalAlpha *= 0.25; ctx.strokeStyle = '#fff'; ctx.lineWidth = lw * 0.6; ctx.beginPath(); ctx.moveTo(cx - R * 0.6, cy - R * 0.85); ctx.quadraticCurveTo(cx, cy - R * 0.6, cx + R * 0.6, cy - R * 0.85); ctx.stroke(); ctx.restore();
  }
  if (h === 'cap') { const c = P.hatColor ?? '#3a4a5a'; path(ctx, c, lw, () => { ctx.ellipse(cx, cy - R * 0.5, R * 1.05, R * 0.75, 0, Math.PI, 0); ctx.closePath(); }); path(ctx, vary(c, -0.15), lw, () => ctx.ellipse(cx + R * 0.6, cy - R * 0.5, R * 0.7, R * 0.14, 0, 0, Math.PI * 2)); }
}

// ---------- thân ----------
function torso(ctx, P, K, lw, side, cut = 0, ph = null) {
  // Quần áo thường của người nông thôn Bắc Bộ (17/11, người dùng: "đổi quần áo thường như dân nông thôn bắc bộ").
  // topStyle: shirt (sơ mi cổ bẻ, túi ngực) | tee (áo phông) | canh (áo cánh cổ tròn, cúc giữa) | baba (áo nâu bà ba) | army (áo bộ đội cũ)
  // print: 'flower' (hoa nhỏ) | 'check' (kẻ ô); pants: màu quần; roll: xắn ống; skirt chỉ khi cần.
  const top = -K.body, w = side ? K.w * 0.82 : K.w, fl = K.flare;
  const st = P.topStyle ?? { man: 'shirt', woman: 'canh', old: 'baba', kid: 'tee' }[P.kind ?? 'man'] ?? 'shirt';
  const topC = P.top ?? '#6a7a6a', botC = P.skirt ? (P.bottom ?? '#2a2420') : (P.pants ?? '#3a3430');
  const hem = top + K.body * (st === 'baba' || st === 'canh' ? 0.62 : 0.58); // gấu áo
  const H = K.body - cut, legTop = top + K.body * 0.4;
  // quần (hai ống) / váy
  path(ctx, botC, lw, () => rrect(ctx, -w * 0.92, legTop, w * 1.84, H - K.body * 0.4 - 2, Math.min(4, w * 0.3)));
  if (!P.skirt && cut < K.body * 0.2) {
    ctx.save(); ctx.beginPath(); rrect(ctx, -w * 0.92, legTop, w * 1.84, H - K.body * 0.4 - 2, 4); ctx.clip();
    if (P.roll) { ctx.fillStyle = P.skin ?? '#ecc8a4'; ctx.fillRect(-w * 2, -cut - 11, w * 4, 12); ctx.fillStyle = vary(botC, 0.12); ctx.fillRect(-w * 2, -cut - 14, w * 4, 3.5); }
    ctx.restore();
    if (!side) { ctx.lineWidth = lw * 0.9; ctx.strokeStyle = LINE; ctx.beginPath(); ctx.moveTo(0, hem + 2); ctx.lineTo(0, -cut - 2); ctx.stroke(); }
    // nếp ống quần
    ctx.save(); ctx.globalAlpha *= 0.25; ctx.strokeStyle = LINE; ctx.lineWidth = lw * 0.6; for (const sx of side ? [w * 0.3] : [-w * 0.45, w * 0.45]) { ctx.beginPath(); ctx.moveTo(sx, hem + 5); ctx.lineTo(sx + 0.5, -cut - (P.roll ? 15 : 6)); ctx.stroke(); } ctx.restore();
  }
  // dép tổ ong: hai bàn chân ló dưới ống quần
  if (cut < K.body * 0.2 && !P.noFeet) {
    const sh = P.shoes ?? '#5a6a7a';
    const feet = side ? [[w * 0.25, 0], [w * 0.25, 1]] : [[-w * 0.45, 0], [w * 0.45, 1]];
    for (const [fx, i] of feet) {
      const u = ph == null ? 0 : Math.sin(ph * Math.PI + i * Math.PI);
      const dx = side ? (ph == null ? (i ? -2 : 1) : u * 6) : 0, dy = ph == null ? 0 : -Math.max(0, u) * 2.4;
      path(ctx, i && side ? vary(sh, -0.25) : sh, lw * 0.9, () => ctx.ellipse(fx + dx + (side ? 2.5 : 0), -cut - 1 + dy, side ? 6 : 5, 2.4, 0, 0, Math.PI * 2));
    }
  }
  // thân áo
  const body = () => {
    ctx.moveTo(-w * 0.55, top);
    ctx.quadraticCurveTo(-w * 1.02, top + 1, -w * 1.02, top + K.body * 0.18);
    ctx.lineTo(-w * fl, hem); ctx.quadraticCurveTo(0, hem + 2, w * fl, hem);
    ctx.lineTo(w * 1.02, top + K.body * 0.18);
    ctx.quadraticCurveTo(w * 1.02, top + 1, w * 0.55, top); ctx.closePath();
  };
  path(ctx, topC, lw, body);
  ctx.save(); ctx.beginPath(); body(); ctx.clip();
  // hoạ tiết vải
  if (P.print === 'flower') { for (let i = 0; i < 40; i++) { const px = -w + ((i * 37) % 23) / 23 * w * 2, py = top + ((i * 53) % 29) / 29 * (hem - top); ctx.fillStyle = i % 3 ? vary(topC, 0.35) : (P.printColor ?? '#c86a6a'); ctx.beginPath(); ctx.arc(px, py, 0.9, 0, Math.PI * 2); ctx.fill(); } }
  if (P.print === 'check') { ctx.globalAlpha *= 0.22; ctx.strokeStyle = vary(topC, -0.5); ctx.lineWidth = 0.8; for (let x = -w * 1.2; x < w * 1.2; x += 4) { ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, hem); ctx.stroke(); } for (let y = top; y < hem; y += 4) { ctx.beginPath(); ctx.moveTo(-w * 1.2, y); ctx.lineTo(w * 1.2, y); ctx.stroke(); } ctx.globalAlpha /= 0.22; }
  // bóng một bên + nếp nhăn
  ctx.globalAlpha *= 0.12; ctx.fillStyle = '#000'; ctx.fillRect(w * 0.4, top, w * 1.5, hem - top + 3); ctx.globalAlpha /= 0.12;
  ctx.restore();
  const dk = vary(topC, -0.45), lt = vary(topC, 0.35);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // nẹp áo + cúc
  const cx = side ? w * 0.6 : 0;
  if (st === 'shirt' || st === 'canh' || st === 'army' || st === 'baba') {
    ctx.lineWidth = lw * 0.7; ctx.strokeStyle = dk; ctx.beginPath(); ctx.moveTo(cx, top + 3); ctx.lineTo(cx, hem + 1); ctx.stroke();
    if (st !== 'baba') for (let i = 0; i < 4; i++) path(ctx, lt, lw * 0.5, () => ctx.arc(cx + (side ? -1.6 : 1.6), top + 6 + i * (hem - top - 8) / 4, 1.1, 0, Math.PI * 2), dk);
  }
  // cổ áo
  if (st === 'shirt' || st === 'army') { // cổ bẻ hai vạt nhọn
    for (const sg of side ? [1] : [-1, 1]) path(ctx, vary(topC, 0.08), lw * 0.85, () => { const x0 = side ? w * 0.2 : 0; ctx.moveTo(x0 + sg * 0.5, top + 0.5); ctx.lineTo(x0 + sg * w * 0.55, top - 0.8); ctx.lineTo(x0 + sg * w * 0.42, top + 6.5); ctx.closePath(); }, dk);
  } else if (st === 'canh') { // cổ tròn nhỏ
    for (const sg of side ? [1] : [-1, 1]) path(ctx, vary(topC, 0.1), lw * 0.85, () => { const x0 = side ? w * 0.25 : 0; ctx.moveTo(x0 + sg * 0.3, top + 0.5); ctx.quadraticCurveTo(x0 + sg * w * 0.62, top - 1, x0 + sg * w * 0.42, top + 4.5); ctx.quadraticCurveTo(x0 + sg * w * 0.2, top + 5, x0 + sg * 0.3, top + 0.5); ctx.closePath(); }, dk);
  } else if (st === 'tee') { ctx.lineWidth = lw * 0.8; ctx.strokeStyle = dk; ctx.beginPath(); ctx.arc(side ? w * 0.3 : 0, top - 1, w * 0.36, 0.25, Math.PI - 0.25); ctx.stroke(); }
  else if (st === 'baba') { ctx.lineWidth = lw * 0.8; ctx.strokeStyle = dk; ctx.beginPath(); ctx.arc(side ? w * 0.3 : 0, top - 1, w * 0.32, 0.3, Math.PI - 0.3); ctx.stroke(); }
  // túi
  if (st === 'shirt' && !side) path(ctx, vary(topC, 0.04), lw * 0.6, () => rrect(ctx, -w * 0.72, top + 7, w * 0.42, w * 0.45, 0.8), dk);
  if (st === 'army') for (const sg of side ? [1] : [-1, 1]) { path(ctx, vary(topC, 0.04), lw * 0.6, () => rrect(ctx, sg * w * 0.5 - w * 0.22, top + 7, w * 0.44, w * 0.48, 0.8), dk); path(ctx, vary(topC, -0.06), lw * 0.6, () => rrect(ctx, sg * w * 0.5 - w * 0.24, top + 6.2, w * 0.48, w * 0.16, 0.6), dk); }
  if (st === 'baba' && !side) for (const sg of [-1, 1]) path(ctx, vary(topC, 0.03), lw * 0.6, () => rrect(ctx, sg * w * 0.55 - w * 0.2, hem - w * 0.62, w * 0.4, w * 0.42, 0.8), dk);
  return { top, hem, w };
}
// Tay: ống tròn màu áo, bàn tay tròn màu da. from → to qua khuỷu (cong mềm).
function arm(ctx, from, elbow, hand, col, skin, lw, r, short = false) {
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(...from); ctx.quadraticCurveTo(...elbow, ...hand);
  ctx.strokeStyle = LINE; ctx.lineWidth = r * 2 + lw * 2; ctx.stroke();
  ctx.strokeStyle = short ? skin : col; ctx.lineWidth = r * (short ? 1.7 : 2); ctx.stroke();
  if (short) { // tay áo ngắn: nửa trên đường cong (De Casteljau t = 0.45)
    const t = 0.45, c1 = [lerp(from[0], elbow[0], t), lerp(from[1], elbow[1], t)], c2 = [lerp(elbow[0], hand[0], t), lerp(elbow[1], hand[1], t)], m = [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t)];
    ctx.beginPath(); ctx.moveTo(...from); ctx.quadraticCurveTo(...c1, ...m); ctx.strokeStyle = LINE; ctx.lineWidth = r * 2.25 + lw * 2; ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = r * 2.25; ctx.stroke();
  }
  // cổ tay áo
  path(ctx, skin, lw, () => ctx.arc(hand[0], hand[1], r * 0.95, 0, Math.PI * 2));
}
const ARMS = { // [khuỷu, tay] tương đối vai (đơn vị), bên phải; bên trái lật x
  down: [[3, 13], [3, 25]], hold: [[4, 14], [-9, 22]], chest: [[5, 12], [-6, 9]], point: [[12, 2], [26, -2]], wave: [[10, -2], [12, -18]],
  cover: [[8, 8], [-6, -10]], raise: [[6, -12], [8, -26]], back: [[-3, 12], [-8, 20]], hips: [[10, 10], [5, 18]],
};

// ---------- API: người ----------
export function doll(k, x, y, h, o = {}) {
  const { ctx } = k, P = o, K = KIND[P.kind ?? 'man'] ?? KIND.man, gt = T(k);
  const side = o.view === 'side', dir = o.flip ? -1 : 1;
  const total = K.body + K.R * 2 * 0.95 + 2;
  const s = h / total;
  const lw = (o.lw ?? 1.15);
  const act = o.action ?? 'stand';
  // đi: nhún + lắc nhẹ, bàn chân ló ra dưới gấu; pha lấy từ x
  const dist = o.dist ?? (x / s);
  const ph = act === 'walk' ? dist / 18 : 0;
  const bob = act === 'walk' ? -Math.abs(Math.sin(ph * Math.PI)) * 2.2 : Math.sin(gt * 1.7 + (o.phase ?? 0)) * 0.35;
  const sway = act === 'walk' ? Math.sin(ph * Math.PI) * (side ? 1.5 : 3) * D : 0;
  const cut = act === 'sit' ? K.body * 0.32 : act === 'kneel' ? K.body * 0.28 : 0;
  if (o.shadow !== false) { ctx.save(); ctx.filter = 'blur(4px)'; ctx.globalAlpha = 0.3 * (o.alpha ?? 1); ctx.fillStyle = '#1a120c'; ctx.beginPath(); ctx.ellipse(x, y + 1, h * 0.2, h * 0.03, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  // bàn chân (đi bộ: hai bàn chân thay nhau bước)
  if ((act === 'walk' || o.feet) && false) {
    const sh = P.shoes ?? '#3a2a20';
    for (const [i, sx] of (side ? [[0, 0], [1, 0]] : [[0, -K.w * 0.5], [1, K.w * 0.5]])) {
      const u = Math.sin(ph * Math.PI + i * Math.PI);
      const fx = side ? u * 6 : sx, fy = side ? -Math.max(0, u) * 2.5 : -Math.max(0, u) * 2.2;
      path(ctx, i ? sh : vary(sh, -0.25), lw * 0.9, () => ctx.ellipse(fx + (side ? 2 : 0), fy - 1, side ? 5.5 : 4.5, 2.6, 0, 0, Math.PI * 2));
    }
  }
  ctx.translate(0, bob + cut); ctx.rotate(sway + (o.lean ?? 0) * D + (K.stoop ? 4 * D : 0));
  const R = K.R;
  const hy = -K.body - R * 0.78; // tâm đầu
  // tay xa (sau thân)
  const skin = P.skin ?? '#ecc8a4', topC = P.top ?? '#6a7a6a';
  const armR = K.w * 0.27;
  const pose = typeof o.arms === 'object' && o.arms ? o.arms : null;
  const armsName = typeof o.arms === 'string' ? o.arms : 'down';
  const shY = -K.body + 6;
  const swing = act === 'walk' ? Math.sin(ph * Math.PI) * 5 : 0;
  const getArm = (sgn, name) => {
    if (pose && pose[sgn > 0 ? 'r' : 'l']) return pose[sgn > 0 ? 'r' : 'l'];
    const a = ARMS[name] ?? ARMS.down; const sw = sgn * swing;
    return [[a[0][0] + sw * 0.4, a[0][1]], [a[1][0] + sw, a[1][1]]];
  };
  if (side) {
    const a = getArm(-1, armsName), sp = [-1, shY];
    arm(ctx, sp, [sp[0] + a[0][0] * 0.8 - 2, sp[1] + a[0][1]], [sp[0] + a[1][0] * 0.8 - 2, sp[1] + a[1][1]], vary(topC, -0.15), vary(skin, -0.1), lw, armR, P.sleeve === 'short');
  }
  hairBack(ctx, P, side ? -R * 0.05 : 0, hy, R, lw, side);
  torso(ctx, P, K, lw, side, cut, act === 'walk' ? ph : null);
  // tay
  if (side) {
    const a = getArm(1, armsName), sp = [1, shY];
    arm(ctx, sp, [sp[0] + a[0][0], sp[1] + a[0][1]], [sp[0] + a[1][0], sp[1] + a[1][1]], topC, skin, lw, armR, P.sleeve === 'short');
  } else {
    for (const sg of [-1, 1]) {
      const name = sg > 0 ? armsName : (o.armsL ?? (armsName === 'point' || armsName === 'wave' ? 'down' : armsName));
      const a = getArm(sg, name), sp = [sg * (K.w - armR * 0.6), shY];
      arm(ctx, sp, [sp[0] + sg * a[0][0], sp[1] + a[0][1]], [sp[0] + sg * a[1][0], sp[1] + a[1][1]], topC, skin, lw, armR, P.sleeve === 'short');
    }
  }
  // đầu
  ctx.save();
  const nod = (o.tilt ?? 0) * D + (o.talk ? Math.sin(gt * 6.5 + (o.phase ?? 0)) * 1.2 * D * o.talk : 0);
  ctx.translate(0, hy + R * 0.9); ctx.rotate(nod); ctx.translate(0, -(hy + R * 0.9));
  // tai
  if (!side && P.hair !== 'long') for (const sg of [-1, 1]) path(ctx, vary(skin, -0.04), lw, () => ctx.ellipse(sg * R * 0.98, hy + R * 0.18, R * 0.16, R * 0.2, 0, 0, Math.PI * 2));
  // đầu: tròn, cằm hơi phẳng
  const hg = ctx.createRadialGradient(-R * 0.3, hy - R * 0.3, R * 0.2, 0, hy, R * 1.1); hg.addColorStop(0, vary(skin, 0.06)); hg.addColorStop(1, vary(skin, -0.06));
  path(ctx, hg, lw, () => { ctx.moveTo(-R, hy); ctx.bezierCurveTo(-R, hy - R * 1.32, R, hy - R * 1.32, R, hy); ctx.bezierCurveTo(R, hy + R * 0.78, R * 0.55, hy + R * 0.98, 0, hy + R * 0.98); ctx.bezierCurveTo(-R * 0.55, hy + R * 0.98, -R, hy + R * 0.78, -R, hy); ctx.closePath(); });
  face(k, ctx, side ? R * 0.05 : 0, hy, R, o, lw, side);
  hairFront(ctx, P, 0, hy, R, lw, side);
  if (side && !P.hat) { path(ctx, vary(skin, -0.04), lw * 0.9, () => ctx.ellipse(-R * 0.42, hy + R * 0.2, R * 0.12, R * 0.16, 0, 0, Math.PI * 2)); }
  if (P.gray) { ctx.save(); ctx.globalAlpha *= P.gray * 0.6; ctx.globalCompositeOperation = 'source-atop'; ctx.restore(); }
  hat(ctx, P, 0, hy, R, lw);
  ctx.restore();
  ctx.restore();
  return { s, head: [x, y + (hy + bob + cut) * s], hand: [x + dir * (K.w + 8) * s, y + (shY + 25 + bob + cut) * s] };
}

// ---------- xe đạp ----------
// Hình học theo cỡ người búp bê (cao 100): bánh r 16.
const BK = { r: 16, rear: [-24, -16], front: [26, -16], bb: [0, -13], seat: [-7, -40], head: [21, -42], bar: [15, -52], crank: 7 };
function tube(ctx, a, b, w, col) { ctx.lineCap = 'round'; ctx.strokeStyle = LINE; ctx.lineWidth = w + 1.6; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); }
function wheel(ctx, c, r, rot) {
  ctx.save(); ctx.translate(...c);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.lineWidth = 3.4; ctx.strokeStyle = LINE; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r - 2, 0, Math.PI * 2); ctx.lineWidth = 0.9; ctx.strokeStyle = '#8a8580'; ctx.stroke();
  ctx.lineWidth = 0.4; ctx.strokeStyle = 'rgba(70,60,52,0.8)';
  for (let i = 0; i < 12; i++) { const a = rot + (i / 12) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * (r - 2), Math.sin(a) * (r - 2)); ctx.stroke(); }
  path(ctx, '#8a8580', 0.8, () => ctx.arc(0, 0, 1.8, 0, Math.PI * 2));
  ctx.restore();
}
function ik(root, target, l1, l2) {
  let dx = target[0] - root[0], dy = target[1] - root[1], d = Math.hypot(dx, dy);
  const mx = (l1 + l2) * 0.999; if (d > mx) { dx *= mx / d; dy *= mx / d; d = mx; }
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d), hh = Math.sqrt(Math.max(0, l1 * l1 - a * a)), ux = dx / d, uy = dy / d;
  let nx = -uy, ny = ux; if (nx < 0) { nx = -nx; ny = -ny; }
  return [root[0] + ux * a + nx * hh, root[1] + uy * a + ny * hh];
}
function leg(ctx, hip, foot, col, shoe, lw, w) {
  const knee = ik(hip, foot, 15, 14);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(...hip); ctx.lineTo(...knee); ctx.lineTo(...foot);
  ctx.strokeStyle = LINE; ctx.lineWidth = w + lw * 2; ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke();
  path(ctx, shoe, lw * 0.9, () => ctx.ellipse(foot[0] + 2, foot[1] + 1.5, 5, 2.4, 0, 0, Math.PI * 2));
}
export function dollBike(k, x, y, h, o = {}) {
  const { ctx } = k, P = o.rider, dir = o.flip ? -1 : 1;
  const K = KIND[P?.kind ?? 'man'] ?? KIND.man;
  const s = h / (K.body + K.R * 1.9 + 2);
  const dist = o.dist ?? (x / s) * dir;
  const rot = dist / BK.r, crank = rot / 2.2;
  const col = o.color ?? '#3a4a44', chrome = '#a8a49c', lw = 1.1;
  if (o.shadow !== false) { ctx.save(); ctx.filter = 'blur(4px)'; ctx.globalAlpha = 0.3; ctx.fillStyle = '#1a120c'; ctx.beginPath(); ctx.ellipse(x, y + 1, 34 * s, 3 * s, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  const ped = (a) => [BK.bb[0] + Math.cos(a) * BK.crank, BK.bb[1] + Math.sin(a) * BK.crank];
  const pN = ped(crank), pF = ped(crank + Math.PI);
  const hip = [BK.seat[0] + 1, BK.seat[1] - 3];
  const pants = P ? (P.skirt ? (P.bottom ?? '#2a2420') : (P.pants ?? '#4a3a2e')) : null, shoe = P?.shoes ?? '#3a2a20';
  wheel(ctx, BK.rear, BK.r, rot); wheel(ctx, BK.front, BK.r, rot);
  ctx.lineWidth = 1.8; ctx.strokeStyle = vary(col, 0.1); ctx.beginPath(); ctx.arc(...BK.rear, BK.r + 2.4, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); ctx.beginPath(); ctx.arc(...BK.front, BK.r + 2.4, Math.PI * 1.1, Math.PI * 1.85); ctx.stroke();
  if (P) leg(ctx, hip, [pF[0] - 2, pF[1] - 2.5], vary(pants, -0.2), vary(shoe, -0.2), lw, 7);
  tube(ctx, BK.bb, pF, 1.2, '#666');
  // khung
  const st = [BK.seat[0] + 1, BK.seat[1] + 4];
  tube(ctx, BK.rear, BK.bb, 1.6, col); tube(ctx, BK.rear, st, 1.5, col); tube(ctx, BK.bb, st, 2.4, col);
  if (o.frame === 'nu') { ctx.lineCap = 'round'; ctx.strokeStyle = LINE; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(BK.head[0], BK.head[1] + 4); ctx.quadraticCurveTo(8, -18, ...BK.bb); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.stroke(); }
  else { tube(ctx, st, [BK.head[0], BK.head[1] + 3], 2.2, col); tube(ctx, BK.bb, [BK.head[0] + 0.6, BK.head[1] + 8], 2.4, col); }
  tube(ctx, BK.head, [BK.head[0] + 1.5, BK.head[1] + 9], 3, col);
  ctx.strokeStyle = LINE; ctx.lineWidth = 3.2; ctx.beginPath(); ctx.moveTo(BK.head[0] + 1.5, BK.head[1] + 9); ctx.quadraticCurveTo(BK.front[0] - 1, BK.front[1] - 9, ...BK.front); ctx.stroke(); ctx.strokeStyle = chrome; ctx.lineWidth = 1.6; ctx.stroke();
  tube(ctx, BK.head, [BK.head[0] - 1, BK.bar[1] + 1], 1.3, chrome);
  ctx.strokeStyle = LINE; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(BK.head[0] - 1, BK.bar[1] + 1); ctx.quadraticCurveTo(BK.bar[0] + 8, BK.bar[1] - 3, ...BK.bar); ctx.stroke(); ctx.strokeStyle = chrome; ctx.lineWidth = 1.4; ctx.stroke();
  path(ctx, '#2a1e16', lw * 0.8, () => { ctx.moveTo(st[0] - 6, st[1] - 1); ctx.lineTo(st[0] + 5, st[1] - 2); ctx.lineTo(st[0] + 5, st[1]); ctx.lineTo(st[0] - 5, st[1] + 1.5); ctx.closePath(); });
  if (o.rack !== false) { ctx.strokeStyle = chrome; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(st[0] - 3, st[1] + 3); ctx.lineTo(BK.rear[0] - 7, st[1] + 3); ctx.moveTo(BK.rear[0] - 4, st[1] + 3); ctx.lineTo(...BK.rear); ctx.stroke(); if (o.load) o.load(ctx, [BK.rear[0] - 3, st[1] + 2]); }
  if (o.basket) path(ctx, '#9a7a46', lw * 0.8, () => { ctx.moveTo(BK.bar[0] + 5, BK.bar[1] + 2); ctx.lineTo(BK.bar[0] + 15, BK.bar[1] + 2); ctx.lineTo(BK.bar[0] + 14, BK.bar[1] + 10); ctx.lineTo(BK.bar[0] + 6, BK.bar[1] + 10); ctx.closePath(); });
  path(ctx, vary(col, 0.08), lw * 0.8, () => { ctx.moveTo(BK.bb[0] + 5, BK.bb[1] - 4.5); ctx.lineTo(BK.rear[0] + 2, BK.rear[1] - 2.5); ctx.lineTo(BK.rear[0] + 2, BK.rear[1] + 2.5); ctx.lineTo(BK.bb[0] + 5, BK.bb[1] + 5); ctx.closePath(); });
  path(ctx, vary(col, 0.05), lw * 0.8, () => ctx.arc(...BK.bb, 5.5, 0, Math.PI * 2));
  // người: thân búp bê ngồi nghiêng, chân gần đạp, tay nắm ghi đông
  if (P) {
    ctx.save(); ctx.translate(hip[0], hip[1] + 2); ctx.rotate(12 * D);
    doll(k, 0, 0, K.body + K.R * 1.9 + 2, { ...P, view: 'side', action: 'sit', shadow: false, arms: { r: [[10, 6], [19, 2]] }, lw, dist: 0 });
    ctx.restore();
    leg(ctx, hip, [pN[0] - 2, pN[1] - 2.5], pants, shoe, lw, 7.5);
  }
  tube(ctx, BK.bb, pN, 1.3, '#777'); path(ctx, '#2a2a2a', 0.6, () => rrect(ctx, pN[0] - 3, pN[1] - 1, 6, 2, 0.8));
  ctx.restore();
}

// ---------- câu cá ----------
export function dollFish(k, x, y, h, o = {}) {
  const { ctx } = k, P = o, dir = o.flip ? -1 : 1, t = T(k);
  const K = KIND[P.kind ?? 'man'] ?? KIND.man, s = h / (K.body + K.R * 1.9 + 2);
  const bite = o.bite ?? 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  const stool = o.stool ?? '#a8402e';
  path(ctx, stool, 1, () => rrect(ctx, -12, -12, 22, 3.5, 1.2)); path(ctx, vary(stool, -0.2), 1, () => rrect(ctx, -11, -9, 3, 9, 1)); path(ctx, vary(stool, -0.2), 1, () => rrect(ctx, 6, -9, 3, 9, 1));
  // chân co ra trước
  leg(ctx, [4, -14], [16, -2], P.pants ?? '#4a3a2e', P.shoes ?? '#3a2a20', 1.1, 8);
  ctx.restore();
  const rodA = -(34 - bite * 10) * D, tw = Math.sin(t * 1.3) * 1 + bite * 5;
  const res = doll(k, x - dir * 2 * s, y - 12 * s, h, { ...P, view: 'side', action: 'sit', arms: { r: [[11, 8], [17, 6]] }, shadow: false });
  // cần tre
  const B0 = [x + dir * 8 * s, y - 24 * s], len = (o.rod ?? 130) * s;
  const Tp = [B0[0] + dir * Math.cos(rodA) * len, B0[1] + Math.sin(rodA) * len + tw * s];
  const M = [lerp(B0[0], Tp[0], 0.55), lerp(B0[1], Tp[1], 0.55) - 5 * s];
  ctx.save(); ctx.lineCap = 'round';
  ctx.strokeStyle = LINE; ctx.lineWidth = 3.4 * s; ctx.beginPath(); ctx.moveTo(...B0); ctx.quadraticCurveTo(...M, ...Tp); ctx.stroke();
  ctx.strokeStyle = '#c8aa62'; ctx.lineWidth = 1.8 * s; ctx.stroke();
  const wy = o.water ?? y + 40, fx = Tp[0] + dir * (o.cast ?? 40) * s, fy = wy + Math.sin(t * 2.1) * 1.4 + bite * 9;
  ctx.strokeStyle = 'rgba(240,236,226,0.7)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(...Tp); ctx.quadraticCurveTo(lerp(Tp[0], fx, 0.6), lerp(Tp[1], fy, 0.9) + 6, fx, fy - 4); ctx.stroke();
  ctx.translate(fx, fy); ctx.fillStyle = '#c83a2a'; ctx.fillRect(-1.3, -9, 2.6, 6); ctx.fillStyle = '#f0e8da'; ctx.fillRect(-1.3, -3, 2.6, 5);
  ctx.restore();
  for (let i = 0; i < 3; i++) { const u = (t * 0.45 + i / 3) % 1; ctx.save(); ctx.globalAlpha = (1 - u) * 0.5; ctx.strokeStyle = '#e8e2d4'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(fx, wy + 2, 6 + u * 36, 1.5 + u * 6, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
  // hòn đá cuội ven bờ (ảnh mẫu) do phông vẽ; ở đây trả về toạ độ phao
  return { ...res, float: [fx, fy] };
}

// Tông màu kiểu ảnh mẫu: ngả nâu vàng, giảm bão hoà, hạt bụi bay.
export function sepia(k, a = 0.5) {
  const { ctx, W, H } = k, t = T(k);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'color'; ctx.globalAlpha = 0.28 * a; ctx.fillStyle = '#8a6a4a'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.22 * a; ctx.fillStyle = '#d8b088'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 0.35 * a; ctx.fillStyle = '#fff';
  for (let i = 0; i < 26; i++) { const x = ((k.rand(i) * W + t * (6 + k.rand(i + 40) * 10)) % W), y = (k.rand(i + 9) * H + Math.sin(t * 0.5 + i) * 20); ctx.beginPath(); ctx.arc(x, y, 1.2 + k.rand(i + 3) * 1.6, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}
