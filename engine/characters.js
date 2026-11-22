// Nhân vật hoạt hình phẳng (flat cartoon): thân, tay chân có khớp, quần áo, tóc, mũ, biểu cảm.
// Dùng: k.char(x, yChân, chiềuCao, { body, outfit, color, color2, hair, hat, face, pose, prop, walk, ... })
// Toạ độ nội bộ: cao 100 đơn vị, chân ở y = 0, đỉnh đầu ~ y = -100. Nhìn chính diện.
// Diễn xuất: talk (0..1, thường = k.talk('vai')) → miệng nhép theo giọng + gật đầu + tay khoa theo nhịp; tilt (rad) nghiêng đầu;
// tears, look, flush, gloom, vein → chuyển cho k.face; plain = áo trơn (không thắt lưng/hoa văn, hợp bối cảnh hiện đại);
// ol = độ dày viền (cận mặt cỡ lớn nên giảm, vd 0.5).
import { C, clamp, ease } from './kit.js';

export const INK = '#3b2f2a';
const SKIN = '#f2c9a0';
const HAIR = '#2b1d16';

// Đổi sáng/tối màu hex: f < 0 tối hơn, f > 0 sáng hơn.
export function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f));
  return `#${ch.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

const BODY = {
  man: { headR: 14, headY: -84, sh: -67, hip: -35, sw: 13, hw: 12, arm: 15, leg: 17.5, limb: 6.5 },
  woman: { headR: 14, headY: -84, sh: -67, hip: -37, sw: 11, hw: 12, arm: 14.5, leg: 18.5, limb: 5.8 },
  kid: { headR: 18, headY: -76, sh: -54, hip: -30, sw: 10, hw: 9.5, arm: 12, leg: 15, limb: 6 },
  big: { headR: 13, headY: -87, sh: -71, hip: -36, sw: 17, hw: 14, arm: 17, leg: 18, limb: 8.5 },
  // chibi: đầu to thân nhỏ (đầu ~ 55% chiều cao) — hài, bặm trợn
  chibi: { headR: 26, headY: -64, sh: -37, hip: -17, sw: 12, hw: 11, arm: 10.5, leg: 8.5, limb: 7 },
  chibiGirl: { headR: 26, headY: -65, sh: -38, hip: -18, sw: 10.5, hw: 10.5, arm: 10, leg: 9, limb: 6.2 },
  chibiBig: { headR: 25, headY: -66, sh: -40, hip: -16, sw: 17.5, hw: 14.5, arm: 12, leg: 8, limb: 9.5 },
};

// Tư thế: góc (độ) tính từ hướng thẳng xuống, quay ra phía ngoài thân. [cánh tay trên, gập khuỷu] / [đùi, gập gối].
export const POSES = {
  stand: { l: [12, 6], r: [12, 6] },
  wave: { l: [12, 6], r: [150, 25] },
  point: { l: [12, 6], r: [95, -4] },
  cheer: { l: [150, 15], r: [150, 15] },
  think: { l: [40, -95], r: [28, 168] },
  hips: { l: [42, -105], r: [42, -105] },
  shrug: { l: [55, 55], r: [55, 55] },
  hold: { l: [22, -62], r: [22, -62] },
  shout: { l: [125, 25], r: [125, 25] },
  facepalm: { l: [12, 6], r: [24, 172] },
  present: { l: [12, 6], r: [70, 30] },
  fight: { l: [60, -120], r: [110, 40] },
};

function limb(ctx, x, y, a1, l1, bend, l2, w, color, side, ol) {
  const r1 = (a1 * Math.PI) / 180, r2 = ((a1 + bend) * Math.PI) / 180;
  const ex = x + side * Math.sin(r1) * l1, ey = y + Math.cos(r1) * l1;
  const hx = ex + side * Math.sin(r2) * l2, hy = ey + Math.cos(r2) * l2;
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy);
  ctx.strokeStyle = INK; ctx.lineWidth = w + ol * 2; ctx.stroke();
  ctx.strokeStyle = color; ctx.lineWidth = w; ctx.stroke();
  return { ex, ey, hx, hy, ang: r2 };
}
function blob(ctx, fill, ol, path) {
  ctx.beginPath(); path(); ctx.fillStyle = fill; ctx.fill();
  ctx.lineWidth = ol; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke();
}
// Hoa văn viền kiểu Đông Sơn: răng cưa + chấm.
function pattern(ctx, x0, x1, y, color, ol) {
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = ol * 0.9;
  ctx.beginPath();
  for (let x = x0, i = 0; x <= x1; x += 3, i++) ctx[i ? 'lineTo' : 'moveTo'](x, y + (i % 2 ? -1.6 : 1.6));
  ctx.stroke();
  ctx.fillStyle = color;
  for (let x = x0 + 1.5; x < x1; x += 4.5) { ctx.beginPath(); ctx.arc(x, y + 4, 0.8, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}

// Hình xăm dọc một đoạn chi (thân, tay, đùi): răng cưa + vảy, màu mực chàm.
function tattooSeg(ctx, x1, y1, x2, y2, color, w) {
  const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 1.1; ctx.lineCap = 'round'; ctx.beginPath();
  const n = Math.max(3, Math.round(l / 3));
  for (let i = 0; i <= n; i++) { const u = 0.12 + (i / n) * 0.76, a = (i % 2 ? 1 : -1) * w * 0.28; ctx[i ? 'lineTo' : 'moveTo'](x1 + dx * u + nx * a, y1 + dy * u + ny * a); }
  ctx.stroke(); ctx.restore();
}

export function drawChar(k, x, y, size, o = {}) {
  const p = o.p ?? 1;
  if (p <= 0) return;
  const { ctx } = k;
  const b = BODY[o.body ?? 'man'];
  const gt = k.gt ?? 0;
  const ph = o.phase ?? ((x * 0.017 + y * 0.011) % 6.28);
  const ol = o.ol ?? 1.5;
  const skin = o.skin ?? SKIN;
  const main = o.color ?? C.red, acc = o.color2 ?? C.yellow;
  const outfit = o.outfit ?? (o.body === 'woman' ? 'dress' : 'tunic');
  const s0 = (size / 100) * (0.8 + 0.2 * ease.back(clamp(p)));
  const walk = o.walk ? Math.sin(gt * (o.walkSpeed ?? 9) + ph) : 0;
  const bob = (o.bob ?? 0) * Math.sin(gt * 4 + ph) + (o.walk ? -Math.abs(walk) * 2.5 : 0);

  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha *= clamp(p / 0.5) * (o.alpha ?? 1);
  if (o.shadow !== false) { ctx.save(); ctx.globalAlpha *= 0.18; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(0, 0, size * 0.22, size * 0.035, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  ctx.scale(s0 * (o.flip ? -1 : 1), s0);
  ctx.rotate(o.lean ?? 0);
  // sq: bẹt (+) / vươn (−), giữ thể tích, neo ở chân — thường lấy từ k.take(cue)
  if (o.sq) ctx.scale(1 + o.sq * 0.8, 1 - o.sq);
  ctx.translate(0, bob);

  // tư thế
  const base = typeof o.pose === 'object' ? o.pose : POSES[o.pose ?? 'stand'] ?? POSES.stand;
  const arm = { l: [...base.l], r: [...base.r] };
  if (o.pose === 'wave') arm.r[1] += 25 * Math.sin(gt * 10 + ph);
  if (o.pose === 'cheer' || o.pose === 'shout') { arm.l[0] += 8 * Math.sin(gt * 7 + ph); arm.r[0] += 8 * Math.sin(gt * 7 + ph + 1); }
  if (o.walk) { arm.l[0] += 18 * walk; arm.r[0] -= 18 * walk; }
  const talk = o.talk ?? 0;
  if (talk > 0 && o.gesture !== false) { arm.r[0] += 7 * talk * Math.sin(gt * 5.3 + ph); arm.r[1] += 12 * talk; arm.l[1] += 5 * talk * Math.sin(gt * 4.1 + ph); }
  const leg = { l: [4 + (o.walk ? Math.max(0, walk) * 18 : 0), o.walk ? -Math.max(0, walk) * 30 : 0], r: [4 + (o.walk ? Math.max(0, -walk) * 18 : 0), o.walk ? -Math.max(0, -walk) * 30 : 0] };
  if (o.legs) Object.assign(leg, o.legs);

  const robe = outfit === 'robe' || outfit === 'dress';
  // chân (ma trôi lơ lửng thì không có chân)
  for (const [sd, key] of o.float ? [] : [[-1, 'l'], [1, 'r']]) {
    const hx = sd * b.hw * 0.45;
    const L = limb(ctx, hx, b.hip, leg[key][0], b.leg, leg[key][1], b.leg - 2, b.limb + 0.6, outfit === 'bare' ? skin : shade(main, -0.25), sd, ol);
    if (o.tattoo && outfit === 'bare') tattooSeg(ctx, hx, b.hip, L.ex, L.ey, o.tattooColor ?? '#24476b', b.limb + 0.6);
    blob(ctx, o.feet ?? '#6b4a33', ol * 0.9, () => ctx.ellipse(L.hx + sd * 2.5, L.hy + 0.5, 4.6, 2.6, 0, 0, Math.PI * 2));
  }
  // tóc dài phía sau
  if (!o.noHead && (o.hair === 'long' || o.hair === 'ghost')) blob(ctx, o.hairColor ?? HAIR, ol, () => { ctx.moveTo(-b.headR * 1.05, b.headY); ctx.quadraticCurveTo(-b.headR * 1.4, b.sh + 14, -b.headR * 0.8, b.sh + 20); ctx.lineTo(b.headR * 0.8, b.sh + 20); ctx.quadraticCurveTo(b.headR * 1.4, b.sh + 14, b.headR * 1.05, b.headY); ctx.closePath(); });
  // áo choàng sau lưng
  if (o.cape) blob(ctx, o.cape, ol, () => { ctx.moveTo(-b.sw, b.sh + 2); ctx.quadraticCurveTo(-b.sw * 2.1, -18, -b.sw * 1.7 + 4 * Math.sin(gt * 3 + ph), -4); ctx.lineTo(b.sw * 1.7 + 4 * Math.sin(gt * 3 + ph + 1), -4); ctx.quadraticCurveTo(b.sw * 2.1, -18, b.sw, b.sh + 2); ctx.closePath(); });

  // thân + trang phục
  const top = b.sh + 1, bottom = outfit === 'tunic' ? b.hip + 9 : outfit === 'bare' ? b.hip + 2 : -5;
  const flare = robe ? b.sw * 1.55 : b.sw * 1.12;
  const bodyPath = () => {
    ctx.moveTo(-b.sw, top); ctx.quadraticCurveTo(0, top - 3, b.sw, top);
    ctx.lineTo(flare, bottom); ctx.quadraticCurveTo(0, bottom + 3, -flare, bottom); ctx.closePath();
  };
  blob(ctx, outfit === 'bare' ? skin : main, ol, bodyPath);
  ctx.save(); ctx.beginPath(); bodyPath(); ctx.clip(); ctx.fillStyle = 'rgba(0,0,0,0.1)'; ctx.fillRect(b.sw * 0.25, top - 4, 40, 120); ctx.restore();
  if (outfit === 'bare' && o.tattoo) {
    // thuồng luồng uốn lượn trên ngực: thân sóng + vảy chấm
    const tc = o.tattooColor ?? '#24476b';
    ctx.save(); ctx.beginPath(); bodyPath(); ctx.clip(); ctx.strokeStyle = tc; ctx.fillStyle = tc; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
    const h = b.hip - top;
    ctx.beginPath();
    for (let i = 0; i <= 16; i++) { const u = i / 16; ctx[i ? 'lineTo' : 'moveTo'](Math.sin(u * Math.PI * 2.2) * b.sw * 0.5, top + 4 + u * (h - 6)); }
    ctx.stroke();
    for (let i = 1; i < 8; i++) { const u = i / 8; ctx.beginPath(); ctx.arc(Math.sin(u * Math.PI * 2.2) * b.sw * 0.5 + b.sw * 0.28, top + 4 + u * (h - 6), 0.9, 0, Math.PI * 2); ctx.fill(); }
    ctx.beginPath(); ctx.arc(0, top + 4, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  if (outfit === 'bare') {
    blob(ctx, main, ol, () => { ctx.moveTo(-b.hw * 1.05, b.hip - 3); ctx.lineTo(b.hw * 1.05, b.hip - 3); ctx.lineTo(b.hw * 0.9, b.hip + 8); ctx.lineTo(0, b.hip + 12); ctx.lineTo(-b.hw * 0.9, b.hip + 8); ctx.closePath(); });
  } else if (!o.plain) {
    // thắt lưng + viền hoa văn
    ctx.save(); ctx.beginPath(); bodyPath(); ctx.clip();
    ctx.fillStyle = acc; ctx.fillRect(-40, b.hip - 3.5, 80, 4.5);
    ctx.restore();
    pattern(ctx, -flare + 2, flare - 2, bottom - 5, acc, ol);
    if (outfit === 'robe') { ctx.strokeStyle = shade(main, -0.3); ctx.lineWidth = ol; ctx.beginPath(); ctx.moveTo(0, top + 2); ctx.lineTo(0, bottom); ctx.stroke(); }
  }
  // bụng bia (o.belly 0..1)
  if (o.belly) blob(ctx, outfit === 'bare' ? skin : main, ol, () => ctx.ellipse(0, (top + bottom) / 2 + 3, b.sw * (0.9 + 0.35 * o.belly), (bottom - top) * (0.38 + 0.12 * o.belly), 0, 0, Math.PI * 2));
  // dây chuyền vàng to bản
  if (o.chain) {
    const cw = b.sw * 0.75, cy = top + (bottom - top) * 0.32;
    ctx.save(); ctx.lineCap = 'round';
    ctx.strokeStyle = INK; ctx.lineWidth = 3.4 + ol; ctx.beginPath(); ctx.moveTo(-cw, top + 1); ctx.quadraticCurveTo(0, cy + 6, cw, top + 1); ctx.stroke();
    ctx.strokeStyle = '#f2c230'; ctx.lineWidth = 3.4; ctx.stroke();
    ctx.strokeStyle = '#b8860b'; ctx.lineWidth = 0.8; ctx.setLineDash([1.6, 1.6]); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
    if (o.chain === 'big') blob(ctx, '#f2c230', ol * 0.8, () => ctx.ellipse(0, cy + 6, 3.4, 4.2, 0, 0, Math.PI * 2));
  }

  // tay
  const hands = {};
  for (const [sd, key] of [[-1, 'l'], [1, 'r']]) {
    const L = limb(ctx, sd * (b.sw - 2), b.sh + 3, arm[key][0], b.arm, arm[key][1], b.arm - 1, b.limb, o.sleeves === false || outfit === 'bare' ? skin : main, sd, ol);
    if (o.tattoo && (outfit === 'bare' || o.sleeves === false)) tattooSeg(ctx, sd * (b.sw - 2), b.sh + 3, L.ex, L.ey, o.tattooColor ?? '#24476b', b.limb);
    blob(ctx, skin, ol * 0.9, () => ctx.arc(L.hx, L.hy, b.limb * 0.68, 0, Math.PI * 2));
    hands[key] = L;
  }
  // cà vạt (vest): o.tie = màu
  if (o.tie) {
    blob(ctx, '#f4efe6', ol * 0.6, () => { ctx.moveTo(-4.5, b.sh + 1); ctx.lineTo(4.5, b.sh + 1); ctx.lineTo(0, b.sh + 7); ctx.closePath(); });
    blob(ctx, o.tie, ol * 0.6, () => { ctx.moveTo(-1.8, b.sh + 2); ctx.lineTo(1.8, b.sh + 2); ctx.lineTo(2.6, b.sh + 14); ctx.lineTo(0, b.sh + 17); ctx.lineTo(-2.6, b.sh + 14); ctx.closePath(); });
  }
  // cầu vai quân phục + cà vạt
  if (o.epaulet) {
    for (const sd of [-1, 1]) blob(ctx, o.epaulet === true ? '#c0392b' : o.epaulet, ol * 0.7, () => ctx.rect(sd * (b.sw - 2) - 4, b.sh, 8, 3.2));
    blob(ctx, '#3a4d24', ol * 0.6, () => { ctx.moveTo(-1.6, b.sh + 2); ctx.lineTo(1.6, b.sh + 2); ctx.lineTo(2.2, b.sh + 11); ctx.lineTo(0, b.sh + 13); ctx.lineTo(-2.2, b.sh + 11); ctx.closePath(); });
  }

  // cổ + đầu (o.noHead: chỉ còn cổ cụt, kiểu thân ma lai ngồi chờ đầu về)
  // đầu xoay quanh gốc cổ: tilt cố định + gật nhẹ theo giọng nói
  ctx.save();
  const nod = (o.tilt ?? 0) + talk * 0.05 * Math.sin(gt * 7.5 + ph);
  ctx.translate(0, b.sh); ctx.rotate(nod); ctx.translate(0, -b.sh + talk * 0.6 * Math.sin(gt * 9 + ph));
  head: {
  if (o.noHead) { blob(ctx, '#c9605a', ol, () => ctx.ellipse(0, b.sh - 1, 5.5, 2.6, 0, 0, Math.PI * 2)); break head; }
  const hr = b.headR, hy = b.headY;
  blob(ctx, skin, ol, () => ctx.rect(-3.2, hy + hr - 3, 6.4, b.sh - (hy + hr) + 5));
  for (const sd of [-1, 1]) blob(ctx, skin, ol * 0.8, () => ctx.arc(sd * hr * 0.98, hy + 1, hr * 0.22, 0, Math.PI * 2));
  blob(ctx, skin, ol, () => ctx.ellipse(0, hy, hr, hr * 1.04, 0, 0, Math.PI * 2));
  ctx.save(); ctx.globalAlpha *= 0.35; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(-hr * 0.42, hy - hr * 0.5, hr * 0.22, hr * 0.13, -0.6, 0, Math.PI * 2); ctx.fill(); ctx.restore();

  // tóc
  const hc = o.hairColor ?? HAIR;
  const capHair = () => {
    ctx.moveTo(-hr * 1.04, hy + hr * 0.05);
    ctx.bezierCurveTo(-hr * 1.15, hy - hr * 1.25, hr * 1.15, hy - hr * 1.25, hr * 1.04, hy + hr * 0.05);
    ctx.quadraticCurveTo(hr * 0.75, hy - hr * 0.45, hr * 0.15, hy - hr * 0.42);
    ctx.quadraticCurveTo(-hr * 0.1, hy - hr * 0.2, -hr * 0.35, hy - hr * 0.45);
    ctx.quadraticCurveTo(-hr * 0.8, hy - hr * 0.4, -hr * 1.04, hy + hr * 0.05);
    ctx.closePath();
  };
  const special = ['buzz', 'spiky', 'mohawk', 'perm'].includes(o.hair);
  if (o.hair && o.hair !== 'bald' && !special) blob(ctx, hc, ol, capHair);
  if (o.hair === 'buzz') { // đầu đinh: chỏm sát da, màu nhạt
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, hy, hr, hr * 1.04, 0, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = shade(hc, 0.25); ctx.globalAlpha *= 0.85; ctx.beginPath(); ctx.ellipse(0, hy - hr * 0.55, hr * 1.1, hr * 0.62, 0, Math.PI, 0); ctx.fill();
    ctx.globalAlpha *= 0.8; ctx.fillStyle = hc; for (let i = 0; i < 40; i++) ctx.fillRect(-hr + ((i * 37) % 20) / 20 * hr * 2, hy - hr * 1.05 + ((i * 53) % 11) / 11 * hr * 0.5, 0.9, 0.9);
    ctx.restore();
  } else if (o.hair === 'spiky' || o.hair === 'mohawk') { // tóc dựng ngược / mào
    const n = o.hair === 'mohawk' ? 5 : 7, w = o.hair === 'mohawk' ? 0.35 : 1.0;
    blob(ctx, hc, ol, () => {
      ctx.moveTo(-hr * w, hy - hr * 0.35);
      for (let i = 0; i <= n; i++) { const u = i / n, xx = -hr * w + u * hr * w * 2, tip = hy - hr * (1.05 + 0.22 * Math.sin(u * Math.PI)) - (i % 2 ? 0 : hr * 0.08); ctx.lineTo(xx - hr * 0.08, tip); if (i < n) ctx.lineTo(xx + hr * w / n, hy - hr * 0.85); }
      ctx.lineTo(hr * w, hy - hr * 0.35); ctx.quadraticCurveTo(0, hy - hr * 0.55, -hr * w, hy - hr * 0.35); ctx.closePath();
    });
  } else if (o.hair === 'perm') { // tóc xoăn bồng (kiểu cô chủ quán / bà trùm)
    for (let i = 0; i < 9; i++) { const a = Math.PI * (1.05 + (i / 8) * 0.9); blob(ctx, hc, ol * 0.8, () => ctx.arc(Math.cos(a) * hr * 0.95, hy - hr * 0.1 + Math.sin(a) * hr * 0.95, hr * 0.36, 0, Math.PI * 2)); }
  }
  if (o.hair === 'bun' || o.hair === 'topknot') blob(ctx, hc, ol, () => ctx.arc(0, hy - hr * 1.12, hr * (o.hair === 'bun' ? 0.42 : 0.3), 0, Math.PI * 2));

  // mặt
  k.face(0, hy + hr * 0.12, hr * 1.02, o.face ?? 'calm', { p: 1, phase: ph, big: true, blush: o.blush ?? (o.body === 'woman' || o.body === 'kid'), mouth: talk, tears: o.tears, look: o.look, lookY: o.lookY, flush: o.flush, gloom: o.gloom, vein: o.vein, lw: ol / 1.5 });
  {
    // phụ kiện mặt (bặm trợn). Toạ độ khớp với k.face: tâm (0, fy), bán kính fr.
    const fy = hy + hr * 0.12, fr = hr * 1.02, eyY = fy - fr * 0.08, eX = fr * 0.36;
    if (o.stubble) { // râu lún phún: vùng xanh xám + chấm
      ctx.save(); ctx.beginPath(); ctx.ellipse(0, hy, hr * 0.98, hr * 1.02, 0, 0, Math.PI * 2); ctx.clip();
      ctx.globalAlpha *= 0.22; ctx.fillStyle = '#3c4a5a'; ctx.beginPath(); ctx.ellipse(0, fy + fr * 0.55, fr * 0.62, fr * 0.36, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha /= 0.22 / 0.7; ctx.fillStyle = '#2b2b2b';
      for (let i = 0; i < 26; i++) { const a = Math.PI * (0.1 + 0.8 * ((i * 37) % 26) / 26), rr = fr * (0.45 + 0.17 * ((i * 17) % 5) / 5); ctx.fillRect(Math.cos(a) * rr * 1.1, fy + fr * 0.28 + Math.sin(a) * rr * 0.6, 0.8, 0.8); }
      ctx.restore();
    }
    if (o.brows) { // lông mày rậm xếch (giận sẵn), 'up' = nhướng
      ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = o.hairColor ?? '#1d1714'; ctx.lineWidth = fr * 0.13;
      for (const d of [-1, 1]) { const by = eyY - fr * 0.32, X = d * eX; ctx.beginPath(); if (o.brows === 'up') { ctx.moveTo(X - fr * 0.2, by + fr * 0.02); ctx.quadraticCurveTo(X, by - fr * 0.14, X + fr * 0.2, by + fr * 0.02); } else { ctx.moveTo(X - d * fr * 0.2, by + fr * 0.12); ctx.lineTo(X + d * fr * 0.2, by - fr * 0.06); } ctx.stroke(); }
      ctx.restore();
    }
    if (o.scar) { // sẹo chéo qua lông mày trái
      ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#b5524a'; ctx.lineWidth = fr * 0.05;
      const sx = -eX - fr * 0.05; ctx.beginPath(); ctx.moveTo(sx - fr * 0.12, eyY - fr * 0.42); ctx.lineTo(sx + fr * 0.14, eyY + fr * 0.2); ctx.stroke();
      ctx.lineWidth = fr * 0.03; for (let i = 0; i < 3; i++) { const u = 0.25 + i * 0.25, px = sx - fr * 0.12 + fr * 0.26 * u, py = eyY - fr * 0.42 + fr * 0.62 * u; ctx.beginPath(); ctx.moveTo(px - fr * 0.06, py + fr * 0.01); ctx.lineTo(px + fr * 0.06, py - fr * 0.03); ctx.stroke(); }
      ctx.restore();
    }
    if (o.shades) { // kính đen
      ctx.save();
      const gw = fr * 0.3, gh = fr * 0.21, gy = eyY + fr * 0.02;
      ctx.strokeStyle = '#111'; ctx.lineWidth = fr * 0.05; ctx.beginPath(); ctx.moveTo(-eX + gw * 0.8, gy - gh * 0.3); ctx.lineTo(eX - gw * 0.8, gy - gh * 0.3); ctx.moveTo(-eX - gw, gy - gh * 0.4); ctx.lineTo(-fr * 0.95, gy - gh * 0.7); ctx.moveTo(eX + gw, gy - gh * 0.4); ctx.lineTo(fr * 0.95, gy - gh * 0.7); ctx.stroke();
      for (const d of [-1, 1]) {
        ctx.beginPath(); ctx.moveTo(d * eX - gw, gy - gh * 0.7); ctx.lineTo(d * eX + gw, gy - gh * 0.7); ctx.quadraticCurveTo(d * eX + gw * 1.05, gy + gh * 1.1, d * eX, gy + gh * 1.05); ctx.quadraticCurveTo(d * eX - gw * 1.05, gy + gh * 1.1, d * eX - gw, gy - gh * 0.7); ctx.closePath();
        ctx.fillStyle = o.shades === true ? '#17181c' : o.shades; ctx.fill(); ctx.lineWidth = fr * 0.035; ctx.stroke();
        ctx.save(); ctx.globalAlpha *= 0.45; ctx.strokeStyle = '#fff'; ctx.lineWidth = fr * 0.04; ctx.beginPath(); ctx.moveTo(d * eX - gw * 0.55, gy - gh * 0.25); ctx.lineTo(d * eX - gw * 0.15, gy - gh * 0.45); ctx.stroke(); ctx.restore();
      }
      ctx.restore();
    }
    if (o.cig) { // điếu thuốc ngậm khoé miệng + khói
      const mx = fr * 0.2, my = fy + fr * 0.4;
      ctx.save(); ctx.translate(mx, my); ctx.rotate(0.25); ctx.lineCap = 'butt';
      ctx.fillStyle = '#f5f1ea'; ctx.strokeStyle = INK; ctx.lineWidth = 0.6; ctx.fillRect(0, -1.3, fr * 0.42, 2.6); ctx.strokeRect(0, -1.3, fr * 0.42, 2.6);
      ctx.fillStyle = '#e07b39'; ctx.fillRect(0, -1.3, fr * 0.1, 2.6); ctx.fillStyle = '#ff5a1f'; ctx.fillRect(fr * 0.39, -1.3, fr * 0.05, 2.6);
      ctx.strokeStyle = 'rgba(160,160,170,0.6)'; ctx.lineWidth = 1.2;
      for (let i = 0; i < 2; i++) { const u = ((gt * 0.6 + i * 0.5) % 1); ctx.globalAlpha = 1 - u; ctx.beginPath(); ctx.moveTo(fr * 0.44, -2); ctx.bezierCurveTo(fr * 0.5 + 4 * Math.sin(gt * 3 + i), -8 - u * 10, fr * 0.38 - 4 * Math.sin(gt * 3 + i), -14 - u * 14, fr * 0.46, -20 - u * 18); ctx.stroke(); }
      ctx.restore();
    }
  }
  // beard: true | 'long' | 'goat' (râu dê nhọn). beardPeel 0..1: râu dán bong ra, xoay quanh mép phải (đứt hẳn khi = 1 thì nên tắt beard).
  if (o.beard) {
    const goat = o.beard === 'goat', bw = goat ? 0.26 : 0.55, by0 = goat ? 0.8 : 0.62, peel = o.beardPeel ?? 0;
    ctx.save();
    if (peel) { ctx.translate(hr * bw, hy + hr * by0); ctx.rotate(peel * 1.25); ctx.translate(-hr * bw, -(hy + hr * by0)); }
    blob(ctx, o.beardColor ?? '#e9e4dc', ol * 0.9, () => { ctx.moveTo(-hr * bw, hy + hr * by0); ctx.quadraticCurveTo(0, hy + hr * (o.beard === 'long' ? 2.2 : goat ? 1.75 : 1.45), hr * bw, hy + hr * by0); ctx.quadraticCurveTo(0, hy + hr * (by0 + 0.2), -hr * bw, hy + hr * by0); });
    ctx.restore();
  }

  // tóc xõa che mặt (ma)
  if (o.hair === 'ghost') blob(ctx, hc, ol, () => {
    ctx.moveTo(-hr * 1.08, hy - hr * 0.2); ctx.bezierCurveTo(-hr * 1.1, hy - hr * 1.35, hr * 1.1, hy - hr * 1.35, hr * 1.08, hy - hr * 0.2);
    ctx.quadraticCurveTo(hr * 1.1, hy + hr * 0.9, hr * 0.7, hy + hr * 1.25); ctx.lineTo(hr * 0.12, hy + hr * 1.1); ctx.lineTo(hr * 0.06, hy - hr * 0.1);
    ctx.lineTo(-hr * 0.06, hy - hr * 0.1); ctx.lineTo(-hr * 0.12, hy + hr * 1.1); ctx.lineTo(-hr * 0.7, hy + hr * 1.25); ctx.quadraticCurveTo(-hr * 1.1, hy + hr * 0.9, -hr * 1.08, hy - hr * 0.2); ctx.closePath();
  });
  // vạt áo ma tan thành khói
  if (o.float) {
    ctx.save(); ctx.globalAlpha *= 0.55;
    ctx.beginPath(); ctx.moveTo(-flare, bottom - 2);
    for (let i = 0; i <= 8; i++) { const xx = -flare + (i / 8) * flare * 2; ctx.lineTo(xx, bottom + 6 + (i % 2 ? 10 : 2) + Math.sin(gt * 4 + i) * 2.5); }
    ctx.lineTo(flare, bottom - 2); ctx.closePath(); ctx.fillStyle = main; ctx.fill();
    ctx.restore();
  }
  // mũ / đồ đội đầu
  const hat = o.hat;
  if (hat === 'feather' || hat === 'kingfeather') {
    const n = 7;
    for (let i = 0; i < n; i++) {
      const a = -0.75 + (i / (n - 1)) * 1.5 + 0.04 * Math.sin(gt * 3 + i + ph);
      ctx.save(); ctx.translate(0, hy - hr * 0.7); ctx.rotate(a);
      blob(ctx, i % 2 ? (o.featherColor ?? '#f4efe6') : (o.featherColor2 ?? acc), ol * 0.8, () => ctx.ellipse(0, -hr * 1.05, hr * 0.2, hr * 0.85, 0, 0, Math.PI * 2));
      ctx.restore();
    }
    blob(ctx, hat === 'kingfeather' ? '#e8b84a' : shade(main, -0.2), ol, () => ctx.rect(-hr * 1.02, hy - hr * 0.78, hr * 2.04, hr * 0.32));
  } else if (hat === 'crown') {
    blob(ctx, '#e8b84a', ol, () => { ctx.moveTo(-hr * 0.85, hy - hr * 0.55); ctx.lineTo(-hr * 0.95, hy - hr * 1.45); ctx.lineTo(-hr * 0.45, hy - hr * 1.05); ctx.lineTo(0, hy - hr * 1.6); ctx.lineTo(hr * 0.45, hy - hr * 1.05); ctx.lineTo(hr * 0.95, hy - hr * 1.45); ctx.lineTo(hr * 0.85, hy - hr * 0.55); ctx.closePath(); });
    blob(ctx, C.red, ol * 0.7, () => ctx.arc(0, hy - hr * 0.85, hr * 0.13, 0, Math.PI * 2));
  } else if (hat === 'helmet') {
    blob(ctx, o.hatColor ?? '#7d858f', ol, () => { ctx.moveTo(-hr * 1.15, hy - hr * 0.35); ctx.quadraticCurveTo(0, hy - hr * 2.3, hr * 1.15, hy - hr * 0.35); ctx.closePath(); });
    blob(ctx, C.red, ol * 0.8, () => ctx.ellipse(0, hy - hr * 1.75, hr * 0.18, hr * 0.32, 0, 0, Math.PI * 2));
  } else if (hat === 'non') {
    blob(ctx, o.hatColor ?? '#ecd28c', ol, () => { ctx.moveTo(-hr * 1.75, hy - hr * 0.35); ctx.lineTo(0, hy - hr * 1.9); ctx.lineTo(hr * 1.75, hy - hr * 0.35); ctx.quadraticCurveTo(0, hy - hr * 0.15, -hr * 1.75, hy - hr * 0.35); });
  } else if (hat === 'mountain') {
    blob(ctx, o.hatColor ?? '#5f8f4e', ol, () => { ctx.moveTo(-hr * 1.05, hy - hr * 0.6); ctx.lineTo(-hr * 0.55, hy - hr * 1.45); ctx.lineTo(-hr * 0.15, hy - hr * 0.95); ctx.lineTo(hr * 0.25, hy - hr * 1.85); ctx.lineTo(hr * 0.7, hy - hr * 1.05); ctx.lineTo(hr * 1.05, hy - hr * 0.6); ctx.closePath(); });
    blob(ctx, '#f4efe6', ol * 0.7, () => { ctx.moveTo(hr * 0.25, hy - hr * 1.85); ctx.lineTo(hr * 0.42, hy - hr * 1.5); ctx.lineTo(hr * 0.08, hy - hr * 1.5); ctx.closePath(); });
  } else if (hat === 'wave') {
    blob(ctx, o.hatColor ?? '#3d8fd1', ol, () => {
      ctx.moveTo(-hr * 1.05, hy - hr * 0.55);
      for (let i = 0; i < 3; i++) { const x0 = -hr * 1.05 + i * hr * 0.7; ctx.quadraticCurveTo(x0 + hr * 0.1, hy - hr * 1.7, x0 + hr * 0.55, hy - hr * 1.25); ctx.quadraticCurveTo(x0 + hr * 0.35, hy - hr * 1.0, x0 + hr * 0.7, hy - hr * 0.75); }
      ctx.lineTo(hr * 1.05, hy - hr * 0.55); ctx.closePath();
    });
  } else if (hat === 'flower') {
    for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; blob(ctx, '#f48fb1', ol * 0.6, () => ctx.arc(hr * 0.75 + Math.cos(a) * 3.2, hy - hr * 0.75 + Math.sin(a) * 3.2, 2.6, 0, Math.PI * 2)); }
    blob(ctx, C.yellow, ol * 0.6, () => ctx.arc(hr * 0.75, hy - hr * 0.75, 2, 0, Math.PI * 2));
  } else if (hat === 'safari') {
    blob(ctx, o.hatColor ?? '#c2a46b', ol, () => ctx.ellipse(0, hy - hr * 0.62, hr * 1.55, hr * 0.28, 0, 0, Math.PI * 2));
    blob(ctx, o.hatColor ?? '#c2a46b', ol, () => { ctx.moveTo(-hr * 0.95, hy - hr * 0.62); ctx.quadraticCurveTo(-hr * 0.95, hy - hr * 1.7, 0, hy - hr * 1.72); ctx.quadraticCurveTo(hr * 0.95, hy - hr * 1.7, hr * 0.95, hy - hr * 0.62); ctx.closePath(); });
    blob(ctx, shade(o.hatColor ?? '#c2a46b', -0.3), ol * 0.7, () => ctx.rect(-hr * 0.95, hy - hr * 0.86, hr * 1.9, hr * 0.18));
  } else if (hat === 'police') { // mũ kê-pi: đỉnh rộng, vành đen, quai đỏ, huy hiệu vàng. o.capSlip 0..1 = mũ trượt xuống mắt
    const sl = (o.capSlip ?? 0) * hr * 0.45, hc2 = o.hatColor ?? '#5d7a3a';
    ctx.save(); ctx.translate(0, sl);
    blob(ctx, hc2, ol, () => { ctx.moveTo(-hr * 0.95, hy - hr * 0.55); ctx.quadraticCurveTo(-hr * 1.35, hy - hr * 1.15, -hr * 0.6, hy - hr * 1.3); ctx.quadraticCurveTo(0, hy - hr * 1.45, hr * 0.6, hy - hr * 1.3); ctx.quadraticCurveTo(hr * 1.35, hy - hr * 1.15, hr * 0.95, hy - hr * 0.55); ctx.closePath(); });
    blob(ctx, '#c0392b', ol * 0.8, () => ctx.rect(-hr * 0.95, hy - hr * 0.72, hr * 1.9, hr * 0.2));
    blob(ctx, '#1b1b1b', ol * 0.8, () => { ctx.moveTo(-hr * 0.9, hy - hr * 0.52); ctx.quadraticCurveTo(0, hy - hr * 0.2, hr * 0.9, hy - hr * 0.52); ctx.lineTo(hr * 0.85, hy - hr * 0.6); ctx.quadraticCurveTo(0, hy - hr * 0.4, -hr * 0.85, hy - hr * 0.6); ctx.closePath(); });
    blob(ctx, '#f2c230', ol * 0.7, () => ctx.arc(0, hy - hr * 0.98, hr * 0.17, 0, Math.PI * 2));
    blob(ctx, '#c0392b', ol * 0.4, () => ctx.arc(0, hy - hr * 0.98, hr * 0.08, 0, Math.PI * 2));
    ctx.restore();
  } else if (hat === 'cap') { // mũ lưỡi trai
    const hc2 = o.hatColor ?? '#2e6da4';
    blob(ctx, hc2, ol, () => { ctx.moveTo(-hr * 1.02, hy - hr * 0.35); ctx.bezierCurveTo(-hr * 1.05, hy - hr * 1.3, hr * 1.05, hy - hr * 1.3, hr * 1.02, hy - hr * 0.35); ctx.closePath(); });
    blob(ctx, shade(hc2, -0.25), ol, () => { ctx.moveTo(hr * 0.2, hy - hr * 0.42); ctx.quadraticCurveTo(hr * 1.2, hy - hr * 0.55, hr * 1.55, hy - hr * 0.3); ctx.lineTo(hr * 1.0, hy - hr * 0.3); ctx.closePath(); });
  } else if (hat === 'band') {
    blob(ctx, acc, ol, () => ctx.rect(-hr * 1.02, hy - hr * 0.62, hr * 2.04, hr * 0.26));
  } else if (hat === 'khan') { // khăn xếp (thầy cúng / áo the): vành quấn dày, các nếp chéo
    const kc = o.hatColor ?? '#2a2f45';
    blob(ctx, kc, ol, () => { ctx.moveTo(-hr * 1.06, hy - hr * 0.3); ctx.lineTo(-hr * 1.0, hy - hr * 0.98); ctx.quadraticCurveTo(0, hy - hr * 1.22, hr * 1.0, hy - hr * 0.98); ctx.lineTo(hr * 1.06, hy - hr * 0.3); ctx.quadraticCurveTo(0, hy - hr * 0.42, -hr * 1.06, hy - hr * 0.3); ctx.closePath(); });
    ctx.strokeStyle = shade(kc, 0.35); ctx.lineWidth = ol * 0.9;
    for (let i = 0; i < 5; i++) { const xx = -hr * 0.8 + i * hr * 0.4; ctx.beginPath(); ctx.moveTo(xx - hr * 0.12, hy - hr * 0.38); ctx.lineTo(xx + hr * 0.14, hy - hr * 1.02); ctx.stroke(); }
  }
  }
  ctx.restore();

  // đồ cầm tay (tay phải)
  if (o.prop) {
    const h = hands.r;
    ctx.save(); ctx.translate(h.hx, h.hy);
    ctx.lineCap = 'round';
    const pole = (len, color, w = 3) => { ctx.strokeStyle = INK; ctx.lineWidth = w + ol * 2; ctx.beginPath(); ctx.moveTo(0, 14); ctx.lineTo(0, -len); ctx.stroke(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.stroke(); };
    if (o.prop === 'spear') { pole(52, '#8a5a35'); blob(ctx, '#b9c0c7', ol, () => { ctx.moveTo(0, -66); ctx.lineTo(4, -52); ctx.lineTo(0, -48); ctx.lineTo(-4, -52); ctx.closePath(); }); }
    else if (o.prop === 'trident') { pole(50, '#4b6f8f'); blob(ctx, '#bfe3f7', ol, () => { ctx.moveTo(-9, -50); ctx.lineTo(-9, -62); ctx.lineTo(-6, -56); ctx.lineTo(0, -66); ctx.lineTo(6, -56); ctx.lineTo(9, -62); ctx.lineTo(9, -50); ctx.closePath(); }); }
    else if (o.prop === 'staff') { pole(48, '#8a5a35'); blob(ctx, '#7fbf6a', ol, () => ctx.arc(0, -52, 5, 0, Math.PI * 2)); }
    else if (o.prop === 'rod') pole(44, '#4a4f57', 4);
    else if (o.prop === 'bamboo') { pole(56, '#5aa74a', 4.5); for (let yy = -6; yy > -56; yy -= 12) { ctx.strokeStyle = '#3d7a33'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-3, yy); ctx.lineTo(3, yy); ctx.stroke(); } }
    else if (o.prop === 'scroll') { blob(ctx, '#f6e7c1', ol, () => ctx.rect(-6, -10, 12, 14)); blob(ctx, '#9c6b3f', ol, () => ctx.rect(-7.5, -12, 15, 3)); }
    ctx.restore();
  }
  ctx.restore();
}
