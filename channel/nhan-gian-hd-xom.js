// Nhân Gian Chưa Kể — phông HD "xóm làng" (15/11, tập 112 Chim Lợn): hai nhà cách bờ rào dâm bụt, hiên nhà ông Từ
// (ghế mây, đèn bão, hai chén rượu), chim lợn, cây gạo + đình, sông lũ, đầu ngõ, buồng ngủ… và các đạo cụ nhỏ.
// Phần tĩnh bọc trong cached(): luôn lấy `const ctx = k.ctx` BÊN TRONG callback (vẽ vào bộ đệm, không phải khung chính).
import { INK } from '/channel/nhan-gian.js';
import { PAL, mix, vary, sky, landscape, thatch, mudWall, planks, bigTree, bambooClump, bambooFence, grass, strawStack, urnJar, cached } from '/channel/nhan-gian-hd.js';
import { charHD, nhaTrongHD } from '/channel/nhan-gian-hd-sets.js';

const T = (k) => k.gt ?? 0;
const R = (k, i) => k.rand(i);
const nob = { blush: false, shadow: false, plain: true };

// ---------- nhân vật ----------
export const HAI = { ...nob, body: 'kid', outfit: 'tunic', color: '#4f6a86', hair: 'short', hairColor: '#1d1712', skin: '#e0b48e' };
export const HAI_LON = { ...nob, body: 'man', outfit: 'tunic', color: '#3c4652', hair: 'short', hairColor: '#1d1712', skin: '#d9ae88' };
export const ONG = { ...nob, body: 'man', outfit: 'tunic', color: '#5a5446', hair: 'short', hairColor: '#d8d4cc', beard: true, beardColor: '#e4e0d8', skin: '#c9a07a' };
export const TU = { ...nob, body: 'man', outfit: 'tunic', color: '#4a4636', hair: 'bald', stubble: true, skin: '#b98f68' };
export const TU_AO = { ...TU, color: '#ece8de' }; // áo sơ mi trắng
export const ONG_AO = { ...ONG, color: '#ece8de' };
export const BO = { ...nob, body: 'man', outfit: 'tunic', color: '#5a5a4a', hair: 'short', hairColor: '#1d1712', stubble: true, skin: '#c99868' };
export const ME = { ...nob, body: 'woman', outfit: 'dress', color: '#5f4a5a', hair: 'bun', hairColor: '#1d1712', skin: '#d9ad86' };
export const BA_LANH = { ...nob, body: 'woman', outfit: 'dress', color: '#4a3a2e', hair: 'bun', hairColor: '#c9c3b8', skin: '#cfa47e' };
export const BA_TRE = { ...nob, body: 'woman', outfit: 'dress', color: '#8a3a34', hair: 'long', hairColor: '#1d1712', skin: '#e2bc98' };
export const THIN_TRE = { ...nob, body: 'man', outfit: 'tunic', color: '#5a5a4a', hair: 'short', hairColor: '#1d1712', skin: '#c99868' };
export const TU_TRE = { ...nob, body: 'man', outfit: 'tunic', color: '#3e4e40', hair: 'short', hairColor: '#1d1712', skin: '#c4976e' };
export const DAN = (c, extra = {}) => ({ ...nob, body: extra.body ?? 'man', outfit: 'tunic', color: c, hair: 'short', ...extra });

export const ch = (k, x, y, h, o) => charHD(k, x, y, h, o);
export const lie = (k, x, y, h, o) => k.group({ x, y, r: -Math.PI / 2 }, () => ch(k, 0, 0, h, o));
export const kneel = (k, x, y, h, o) => k.group({ x, y }, () => ch(k, 0, 0, h * 0.72, o));
export const zoom = (k, cx, cy, s, fn) => k.group({ x: cx, y: cy, s }, () => k.group({ x: -cx, y: -cy }, fn));

// ---------- bông dâm bụt ----------
export function hibiscus(k, x, y, s = 1, c = '#d2302a', a = 0) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
  for (let i = 0; i < 5; i++) { ctx.save(); ctx.rotate(i / 5 * Math.PI * 2); ctx.fillStyle = vary(c, (i % 2) * -0.08); ctx.beginPath(); ctx.ellipse(0, -11, 8, 12, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = vary(c, -0.4); ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#f0d070'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(10, -14); ctx.stroke();
  ctx.restore();
}
// Bờ rào dâm bụt: từ x0 đến x1, chân y, cao h. n hoa.
export function hedge(k, x0, x1, y, h, o = {}) {
  const { ctx } = k, dk = o.dark ?? 0;
  for (let i = 0; i < 26; i++) { ctx.fillStyle = '#4a3420'; const x = x0 + (i / 25) * (x1 - x0); ctx.fillRect(x, y - h * 0.5, 5, h * 0.5); }
  for (let i = 0; i < 150; i++) {
    const x = x0 + R(k, i + 500) * (x1 - x0), yy = y - R(k, i + 501) * h * (0.85 + 0.15 * Math.sin(x / 40));
    ctx.fillStyle = vary(mix('#2f5a2a', '#0a120a', dk), (R(k, i + 502) - 0.5) * 0.5);
    ctx.beginPath(); ctx.ellipse(x, yy, 18 + R(k, i) * 16, 10 + R(k, i + 3) * 8, R(k, i + 4) * 3, 0, Math.PI * 2); ctx.fill();
  }
  const nf = o.flowers ?? 22;
  for (let i = 0; i < nf; i++) hibiscus(k, x0 + R(k, i + 600) * (x1 - x0), y - 10 - R(k, i + 601) * h * 0.85, 0.9 + R(k, i + 602) * 0.4, mix('#d2302a', '#1a0808', dk), R(k, i));
}
// Đèn bão treo: tâm (x, y); lit 0..1.
export function lantern(k, x, y, s = 1, lit = 1) {
  const { ctx } = k, t = T(k), f = 1 + 0.08 * Math.sin(t * 13) + 0.05 * Math.sin(t * 29);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#2a2420'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -70); ctx.lineTo(0, -46); ctx.stroke();
  ctx.fillStyle = '#3a4a3a'; ctx.beginPath(); ctx.moveTo(-22, -46); ctx.lineTo(22, -46); ctx.lineTo(16, -34); ctx.lineTo(-16, -34); ctx.closePath(); ctx.fill();
  ctx.fillStyle = lit > 0 ? `rgba(255,220,150,${0.35 + 0.5 * lit})` : 'rgba(180,190,200,0.25)'; ctx.beginPath(); ctx.ellipse(0, -8, 20, 28, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#3a4a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-20, -30); ctx.lineTo(-20, 16); ctx.moveTo(20, -30); ctx.lineTo(20, 16); ctx.stroke();
  if (lit > 0) { ctx.globalAlpha = lit; ctx.fillStyle = '#ffb340'; ctx.beginPath(); ctx.moveTo(0, -22 * f); ctx.quadraticCurveTo(8, -6, 0, 2); ctx.quadraticCurveTo(-8, -6, 0, -22 * f); ctx.fill(); ctx.globalAlpha = 1; }
  ctx.fillStyle = '#3a4a3a'; ctx.fillRect(-24, 18, 48, 12);
  ctx.restore();
}
// Ghế mây: chân ghế tại (x, y). part 'back' (vẽ trước người) | 'front' (vẽ sau người).
export function chair(k, x, y, s = 1, part = 'back') {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const cane = '#b08a50', dark = '#7a5a30';
  if (part === 'back') {
    ctx.fillStyle = cane; ctx.beginPath(); ctx.moveTo(-90, -110); ctx.lineTo(-96, -250); ctx.quadraticCurveTo(0, -300, 96, -250); ctx.lineTo(90, -110); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = dark; ctx.lineWidth = 2; for (let i = -80; i <= 80; i += 14) { ctx.beginPath(); ctx.moveTo(i, -112); ctx.lineTo(i * 1.05, -262 + Math.abs(i) * 0.4); ctx.stroke(); }
    for (let j = -240; j < -110; j += 14) { ctx.beginPath(); ctx.moveTo(-92, j); ctx.lineTo(92, j); ctx.stroke(); }
  } else {
    ctx.fillStyle = cane; ctx.fillRect(-100, -118, 200, 26);
    ctx.strokeStyle = dark; ctx.lineWidth = 2; for (let i = -96; i < 100; i += 10) { ctx.beginPath(); ctx.moveTo(i, -118); ctx.lineTo(i + 6, -92); ctx.stroke(); }
    ctx.fillStyle = dark; for (const lx of [-92, 80]) ctx.fillRect(lx, -92, 12, 92);
    ctx.strokeStyle = cane; ctx.lineWidth = 12; ctx.lineCap = 'round'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 100, -118); ctx.quadraticCurveTo(sx * 112, -170, sx * 96, -190); ctx.stroke(); }
  }
  ctx.restore();
}
// Người ngồi: hông tại mặt ngồi ySeat — vẽ nhân vật hạ thấp rồi cắt bỏ phần chân dưới mặt ngồi.
export function sitting(k, x, ySeat, h, o) {
  const { ctx } = k;
  ctx.save(); ctx.beginPath(); ctx.rect(x - h, ySeat - h * 1.3, h * 2, h * 1.3 + 6); ctx.clip();
  ch(k, x, ySeat + h * 0.42, h, o);
  ctx.restore();
}
// Bàn con + chén rượu: o.cups = [đầy?, đầy?] (true = đầy, false = cạn, null = không có).
export function table(k, x, y, s = 1, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#5a3a20'; ctx.fillRect(-70, -80, 140, 14); ctx.fillStyle = '#4a2e18'; for (const lx of [-62, 52]) ctx.fillRect(lx, -66, 10, 66);
  const cups = o.cups ?? [];
  cups.forEach((full, i) => {
    if (full === null) return;
    const cx = -30 + i * 60;
    ctx.fillStyle = '#e8e4d8'; ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - 13, -100); ctx.lineTo(cx + 13, -100); ctx.lineTo(cx + 8, -80); ctx.lineTo(cx - 8, -80); ctx.closePath(); ctx.fill(); ctx.stroke();
    if (full) { ctx.fillStyle = 'rgba(220,200,150,0.9)'; ctx.beginPath(); ctx.ellipse(cx, -98, 11, 3, 0, 0, Math.PI * 2); ctx.fill(); }
  });
  if (o.bottle) { ctx.fillStyle = 'rgba(200,220,200,0.75)'; ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.rect(36, -150, 26, 70); ctx.fill(); ctx.stroke(); ctx.fillRect(43, -170, 12, 22); }
  if (o.feather) feather(k, 0, -86, 0.9, -0.2);
  ctx.restore();
}
// Lông chim trắng.
export function feather(k, x, y, s = 1, r = 0) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s);
  ctx.fillStyle = '#f2ede0'; ctx.beginPath(); ctx.moveTo(-50, 0); ctx.quadraticCurveTo(0, -18, 50, -2); ctx.quadraticCurveTo(0, 12, -50, 0); ctx.fill();
  ctx.strokeStyle = '#c9b48a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-58, 2); ctx.lineTo(50, -2); ctx.stroke();
  ctx.restore();
}
// Chim lợn (cú lợn): chân tại (x, y), s. o.fly 0..1 (sải cánh), o.turn (quay mặt), o.glow.
export function chimLon(k, x, y, s = 1, o = {}) {
  const { ctx } = k, t = T(k), fly = o.fly ?? 0, flap = fly ? Math.sin(t * 10) * 0.5 : 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  if (o.glow) { const g = ctx.createRadialGradient(0, -60, 0, 0, -60, 140); g.addColorStop(0, `rgba(240,240,230,${0.25 * o.glow})`); g.addColorStop(1, 'rgba(240,240,230,0)'); ctx.fillStyle = g; ctx.fillRect(-140, -200, 280, 280); }
  // cánh
  ctx.fillStyle = '#c9a46a'; ctx.strokeStyle = 'rgba(40,30,20,0.6)'; ctx.lineWidth = 2;
  for (const sx of [-1, 1]) {
    ctx.save(); ctx.scale(sx, 1); ctx.translate(16, -60);
    if (fly) { ctx.rotate(-0.9 * fly + flap); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(70, -40, 130, -10); ctx.quadraticCurveTo(80, 10, 60, 30); ctx.quadraticCurveTo(30, 20, 0, 24); ctx.closePath(); }
    else { ctx.beginPath(); ctx.ellipse(6, 10, 18, 40, 0.15, 0, Math.PI * 2); }
    ctx.fill(); ctx.stroke(); ctx.restore();
  }
  // thân
  ctx.fillStyle = '#efe6d2'; ctx.beginPath(); ctx.ellipse(0, -50, 30, 44, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(160,130,80,0.35)'; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(-14 + (i % 4) * 9, -54 + Math.floor(i / 4) * 16, 1.6, 0, Math.PI * 2); ctx.fill(); }
  // mặt hình trái tim
  ctx.save(); ctx.translate((o.turn ?? 0) * 6, 0);
  ctx.fillStyle = '#c9a46a'; ctx.beginPath(); ctx.ellipse(0, -104, 28, 26, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f8f4ea'; ctx.beginPath(); ctx.moveTo(0, -80); ctx.bezierCurveTo(-30, -92, -30, -126, -12, -124); ctx.quadraticCurveTo(-3, -122, 0, -114); ctx.quadraticCurveTo(3, -122, 12, -124); ctx.bezierCurveTo(30, -126, 30, -92, 0, -80); ctx.fill();
  ctx.fillStyle = '#1a1210'; for (const ex of [-10, 10]) { ctx.beginPath(); ctx.ellipse(ex, -104, 4, 5, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#d8b090'; ctx.beginPath(); ctx.moveTo(-2, -98); ctx.lineTo(2, -98); ctx.lineTo(0, -90); ctx.closePath(); ctx.fill();
  ctx.restore();
  if (!fly) { ctx.strokeStyle = '#8a7a6a'; ctx.lineWidth = 3; for (const fx of [-8, 8]) { ctx.beginPath(); ctx.moveTo(fx, -8); ctx.lineTo(fx, 0); ctx.stroke(); } }
  ctx.restore();
}

// ---------- CẢNH LỚN: hai nhà cách bờ rào ----------
// Mốc: nhà tôi x 60–760 (đầu hồi trên buồng ông ~ (690, 318)); bờ rào x 790–1110 chân 850; nhà ông Từ x 1150–1790,
// hiên: ghế mây (1330, 870), đèn bão (1330, 600), bàn con (1480, 870), nóc nhà ông Từ ~ (1520, 430).
export const XOM = { ourGable: { x: 690, y: 322 }, tuRoof: { x: 1530, y: 432 }, chair: { x: 1330, y: 870 }, lamp: { x: 1205, y: 600 }, table: { x: 1480, y: 870 }, hedge: { x0: 790, x1: 1110, y: 860 }, ourDoor: { x: 410, y: 820 } };
export function xom(k, o = {}) {
  const time = o.time ?? 'night', tall = o.tall ? 1 : 0;
  cached(k, `xom|${time}|${tall}|${k.W}`, () => {
    const ctx = k.ctx, { W, H } = k, P = PAL[time], dk = time === 'night' ? 0.55 : time === 'dusk' ? 0.22 : time === 'dawn' ? 0.15 : 0;
    sky(k, time === 'dawn' ? 'dusk' : time, 600); landscape(k, time === 'dawn' ? 'dusk' : time, 600);
    // đất sân
    const g = ctx.createLinearGradient(0, 760, 0, H); g.addColorStop(0, vary('#5a4a34', -dk)); g.addColorStop(1, vary('#3a2e22', -dk)); ctx.fillStyle = g; ctx.fillRect(-200, 780, W + 400, H);
    for (let i = 0; i < 60; i++) { ctx.fillStyle = `rgba(0,0,0,${0.08 + R(k, i) * 0.1})`; ctx.beginPath(); ctx.ellipse(R(k, i + 40) * W, 820 + R(k, i + 41) * 260, 30 + R(k, i + 42) * 60, 6, 0, 0, Math.PI * 2); ctx.fill(); }
    bigTree(k, 1860, 820, 520, time === 'dawn' ? 'dusk' : time, 1500, 61);
    // nhà tôi
    mudWall(k, 60, 470, 700, 350, vary('#9a7c5c', -dk), 9);
    for (let i = 0; i <= 3; i++) { ctx.fillStyle = vary('#4a3220', -dk); ctx.fillRect(54 + i * 233, 470, 16, 350); }
    ctx.fillStyle = '#120c08'; ctx.fillRect(340, 560, 140, 260); planks(k, 280, 560, 60, 260, vary('#5a3e26', -dk), 2, 70); planks(k, 480, 560, 60, 260, vary('#5a3e26', -dk), 2, 71);
    for (const wx of [130, 600]) { ctx.fillStyle = '#0c0805'; ctx.fillRect(wx, 590, 110, 86); for (let b = 1; b < 6; b++) { ctx.fillStyle = vary('#4a3220', -dk); ctx.fillRect(wx + b * 110 / 6 - 3, 590, 6, 86); } }
    ctx.fillStyle = vary('#7a7066', -dk); ctx.fillRect(20, 820, 780, 24);
    const sg = ctx.createLinearGradient(0, 470, 0, 560); sg.addColorStop(0, 'rgba(10,6,4,0.65)'); sg.addColorStop(1, 'rgba(10,6,4,0)'); ctx.fillStyle = sg; ctx.fillRect(60, 470, 700, 90);
    thatch(k, 60, 312, 760, 490, 70, vary('#957548', -dk), 5);
    strawStack(k, -40, 860, 200, vary('#b8955a', -dk), 41);
    urnJar(k, 730, 846, 120, vary('#5a3a24', -dk));
    // nhà ông Từ (thấp, nhỏ)
    mudWall(k, 1150, 560, 640, 260, vary('#8a6e52', -dk), 19);
    for (let i = 0; i <= 2; i++) { ctx.fillStyle = vary('#4a3220', -dk); ctx.fillRect(1146 + i * 316, 560, 14, 260); }
    ctx.fillStyle = '#0e0a06'; ctx.fillRect(1560, 630, 120, 190); planks(k, 1520, 630, 40, 190, vary('#5a3e26', -dk), 1, 80);
    ctx.fillStyle = '#0c0805'; ctx.fillRect(1210, 640, 90, 70);
    thatch(k, 1150, 420, 1790, 575, 60, vary('#8a6a40', -dk), 15);
    ctx.fillStyle = vary('#6a6058', -dk); ctx.fillRect(1120, 820, 700, 20);
    // rổ rá dựng hiên nhà ông Từ
    for (let i = 0; i < 3; i++) { ctx.fillStyle = vary('#9a7a46', -dk - i * 0.05); ctx.strokeStyle = 'rgba(30,20,10,0.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(1740 - i * 34, 790 - i * 6, 30, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
    // bờ rào dâm bụt
    hedge(k, 790, 1110, 870, tall ? 300 : 150, { dark: dk * 0.8, flowers: tall ? 40 : 24 });
    for (let i = 0; i < 24; i++) grass(k, R(k, i + 80) * W, 860 + R(k, i + 81) * 200, 1, vary('#3a4a2a', -dk), i + 80);
  });
}
// Phần động của xóm: đèn bão (lit), ghế/bàn hiên ông Từ (o.chair: false để ẩn), chim (o.bird = {x,y,fly,turn}).
export function xomProps(k, o = {}) {
  if (o.chair !== false) chair(k, XOM.chair.x, XOM.chair.y, 0.9, 'back');
  if (o.sitter) sitting(k, XOM.chair.x, XOM.chair.y - 100, 380, o.sitter);
  if (o.chair !== false) chair(k, XOM.chair.x, XOM.chair.y, 0.9, 'front');
  if (o.table !== false) table(k, XOM.table.x, XOM.table.y, 0.9, { cups: o.cups ?? [], feather: o.feather });
  lantern(k, XOM.lamp.x, XOM.lamp.y, 1, o.lamp ?? 0);
}
export const lampLight = (a = 1) => ({ x: XOM.lamp.x, y: XOM.lamp.y, r: 340 * a, flicker: 1, warm: 1 });

// ---------- cây gạo + đình ----------
export function gao(k, o = {}) {
  const time = o.time ?? 'dusk';
  cached(k, `gao|${time}|${k.W}`, () => {
    const ctx = k.ctx, { W, H } = k, dk = time === 'night' ? 0.5 : 0.15;
    sky(k, time, 640); landscape(k, time, 640);
    ctx.fillStyle = vary('#4a5a3a', -dk); ctx.fillRect(-200, 820, W + 400, H);
    // đình: mái cong
    ctx.fillStyle = vary('#5a3a2a', -dk); ctx.fillRect(1180, 620, 560, 200);
    ctx.fillStyle = vary('#3a2a20', -dk); ctx.beginPath(); ctx.moveTo(1100, 640); ctx.quadraticCurveTo(1150, 600, 1220, 540); ctx.lineTo(1700, 540); ctx.quadraticCurveTo(1770, 600, 1820, 640); ctx.quadraticCurveTo(1840, 600, 1860, 590); ctx.lineTo(1830, 650); ctx.lineTo(1090, 650); ctx.lineTo(1060, 590); ctx.quadraticCurveTo(1080, 600, 1100, 640); ctx.fill();
    for (let i = 0; i < 5; i++) { ctx.fillStyle = vary('#7a3a2a', -dk); ctx.fillRect(1220 + i * 120, 650, 18, 170); }
    // cây gạo: thân to, cành trơ, hoa đỏ lưa thưa
    const tx = 560;
    ctx.fillStyle = vary('#3a3028', -dk); ctx.beginPath(); ctx.moveTo(tx - 70, 830); ctx.quadraticCurveTo(tx - 40, 500, tx - 20, 240); ctx.lineTo(tx + 24, 240); ctx.quadraticCurveTo(tx + 40, 520, tx + 80, 830); ctx.closePath(); ctx.fill();
    ctx.fillStyle = vary('#2a2420', -dk); for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.ellipse(tx - 30 + R(k, i) * 70, 300 + R(k, i + 1) * 500, 6, 3, 0, 0, Math.PI * 2); ctx.fill(); }
    ctx.strokeStyle = vary('#3a3028', -dk); ctx.lineCap = 'round';
    const br = [[-1, 300, 260], [1, 330, 300], [-1, 420, 220], [1, 470, 240], [-1, 520, 160], [1, 250, 200]];
    br.forEach(([sx, y, len], i) => { ctx.lineWidth = 22 - i * 2; ctx.beginPath(); ctx.moveTo(tx, y); ctx.quadraticCurveTo(tx + sx * len * 0.5, y - 60, tx + sx * len, y - 110 - R(k, i) * 40); ctx.stroke();
      ctx.lineWidth = 6; for (let j = 0; j < 4; j++) { const bx = tx + sx * len * (0.5 + j * 0.15), by = y - 50 - j * 18; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + sx * 40, by - 50 - R(k, i * 7 + j) * 30); ctx.stroke(); }
      for (let j = 0; j < 7; j++) { ctx.fillStyle = mix('#c8302a', '#1a0a08', dk); ctx.beginPath(); ctx.arc(tx + sx * len * (0.4 + R(k, i * 9 + j) * 0.6), y - 70 - R(k, i * 9 + j + 1) * 90, 6, 0, Math.PI * 2); ctx.fill(); } });
    // sương
    ctx.save(); ctx.filter = 'blur(26px)'; ctx.fillStyle = 'rgba(220,220,225,0.22)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(R(k, i + 300) * W, 760 + R(k, i + 301) * 80, 360, 50, 0, 0, Math.PI * 2); ctx.fill(); } ctx.restore();
  });
}
export const GAO = { perch: { x: 760, y: 214 } };

// ---------- sông lũ (hồi tưởng 1950) ----------
export function flood(k) {
  cached(k, `flood|${k.W}`, () => {
    const ctx = k.ctx, { W, H } = k;
    sky(k, 'storm', 560); landscape(k, 'storm', 600);
    ctx.fillStyle = '#3a3a2a'; ctx.beginPath(); ctx.moveTo(-200, 760); ctx.quadraticCurveTo(300, 720, 620, 780); ctx.lineTo(620, H + 50); ctx.lineTo(-200, H + 50); ctx.closePath(); ctx.fill();
    for (let i = 0; i < 20; i++) grass(k, R(k, i + 900) * 560, 760 + R(k, i + 901) * 100, 1.2, '#2a3a22', i + 900);
  });
  k.water(800, { color: '#6a5634', amp: 16, alpha: 0.92 });
  const { ctx } = k, t = T(k);
  ctx.save(); ctx.strokeStyle = 'rgba(230,220,190,0.35)'; ctx.lineWidth = 3;
  for (let i = 0; i < 20; i++) { const y = 820 + i * 14, x = ((R(k, i + 950) * k.W + t * 160 * (1 + R(k, i))) % (k.W + 300)) - 150; if (x < 620) continue; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 70, y - 3); ctx.stroke(); }
  ctx.restore();
}
// ---------- hội làng trước đình (hồi tưởng 1954) ----------
export function hoi(k) {
  cached(k, `hoi|${k.W}`, () => {
    const ctx = k.ctx, { W, H } = k;
    sky(k, 'day', 600); landscape(k, 'day', 600);
    ctx.fillStyle = '#8a7a5a'; ctx.fillRect(-200, 800, W + 400, H);
    ctx.fillStyle = '#6a4a34'; ctx.fillRect(420, 520, 1080, 290);
    ctx.fillStyle = '#4a3a2c'; ctx.beginPath(); ctx.moveTo(320, 560); ctx.quadraticCurveTo(380, 500, 460, 420); ctx.lineTo(1460, 420); ctx.quadraticCurveTo(1540, 500, 1600, 560); ctx.quadraticCurveTo(1630, 510, 1660, 500); ctx.lineTo(1620, 575); ctx.lineTo(300, 575); ctx.lineTo(260, 500); ctx.quadraticCurveTo(290, 510, 320, 560); ctx.fill();
    for (let i = 0; i < 7; i++) { ctx.fillStyle = '#8a3a2a'; ctx.fillRect(470 + i * 160, 575, 22, 235); }
    // cờ hội
    const cols = ['#c8402a', '#e8b84a', '#3a7aa8', '#4a8a4a', '#d8d0c0'];
    for (let i = 0; i < 18; i++) { ctx.fillStyle = cols[i % 5]; ctx.beginPath(); const x = 200 + i * 90, y = 380 + Math.sin(i * 0.7) * 16; ctx.moveTo(x, y); ctx.lineTo(x + 40, y + 4); ctx.lineTo(x + 18, y + 46); ctx.closePath(); ctx.fill(); }
    ctx.strokeStyle = 'rgba(40,30,20,0.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(180, 382); for (let i = 0; i <= 18; i++) ctx.lineTo(200 + i * 90, 380 + Math.sin(i * 0.7) * 16); ctx.stroke();
  });
}

// ---------- đầu ngõ ban đêm, buồng ngủ (từ tập 106) ----------
export function lane(k) {
  cached(k, `lane|${k.W}`, () => {
    const ctx = k.ctx, { W, H } = k;
    sky(k, 'night', 600); landscape(k, 'night', 600);
    ctx.fillStyle = '#221d17'; ctx.beginPath(); ctx.moveTo(880, 610); ctx.lineTo(1040, 610); ctx.lineTo(1560, H + 60); ctx.lineTo(360, H + 60); ctx.closePath(); ctx.fill();
    bambooFence(k, -200, 860, 680, 110, '#0e0b08'); bambooFence(k, 1060, W + 200, 680, 110, '#0e0b08');
    bambooClump(k, 260, 700, 560, '#121810', 3); bambooClump(k, 1680, 700, 600, '#121810', 4);
    for (const px of [150, 1680]) { ctx.fillStyle = '#4a3428'; ctx.fillRect(px, 420, 110, 700); ctx.fillStyle = '#5a4030'; ctx.fillRect(px - 14, 400, 138, 34); }
  });
}
export function bedroom(k, who, h = 330, o = {}) {
  nhaTrongHD(k, { chong: false });
  const { ctx } = k, hx = 1100 - h * 0.85;
  ctx.fillStyle = '#3a2618'; ctx.fillRect(500, 790, 740, 44); for (const lx of [516, 1200]) ctx.fillRect(lx, 834, 26, 70);
  ctx.fillStyle = '#4a3020'; ctx.fillRect(490, 660, 30, 240); ctx.fillStyle = '#c9b8a0'; ctx.fillRect(500, 780, 740, 14);
  ctx.fillStyle = '#d8cdb8'; ctx.beginPath(); ctx.ellipse(who ? hx : 640, 782, 70, 18, 0, 0, Math.PI * 2); ctx.fill();
  if (who) lie(k, 1100, 752, h, who);
  const bx = who ? 1100 - h * 0.66 : 720;
  ctx.fillStyle = o.blanket ?? '#6a4a5a'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(bx, who ? 700 : 742, who ? h * 0.66 + 40 : 480, who ? 92 : 48, 22); ctx.fill(); ctx.stroke();
  if (o.net !== false) { ctx.fillStyle = 'rgba(225,228,236,0.09)'; ctx.beginPath(); ctx.moveTo(530, 380); ctx.lineTo(1210, 380); ctx.lineTo(1250, 792); ctx.lineTo(490, 792); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(225,228,236,0.22)'; ctx.lineWidth = 2; ctx.stroke(); }
  if (o.cloth) { ctx.fillStyle = '#3a2618'; ctx.fillRect(1320, 780, 260, 120); ctx.fillStyle = '#efece4'; ctx.fillRect(1340, 750, 220, 30); ctx.fillRect(1350, 726, 200, 26); }
}

// ---------- đạo cụ nhỏ ----------
export function photo(k, cx, cy, w, h, fn, p = 1) {
  const { ctx } = k;
  if (p <= 0) return;
  ctx.save(); ctx.globalAlpha = p;
  ctx.fillStyle = '#e8e0cc'; ctx.fillRect(cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28);
  ctx.beginPath(); ctx.rect(cx - w / 2, cy - h / 2, w, h); ctx.clip();
  ctx.fillStyle = '#9a9284'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  k.group({ x: cx, y: cy - h * 0.08, s: h / 300 }, () => fn(k));
  ctx.globalCompositeOperation = 'color'; ctx.fillStyle = '#7a6a50'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(200,180,140,0.5)'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  ctx.restore();
}
export function tin(k, x, y, s = 1, open = 0) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const g = ctx.createLinearGradient(0, -60, 0, 0); g.addColorStop(0, '#6a5a44'); g.addColorStop(1, '#3a3026'); ctx.fillStyle = g; ctx.fillRect(-90, -60, 180, 60);
  ctx.fillStyle = 'rgba(150,80,30,0.5)'; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.arc(-80 + R(k, i + 77) * 160, -50 + R(k, i + 78) * 45, 4 + R(k, i) * 8, 0, Math.PI * 2); ctx.fill(); }
  ctx.save(); ctx.translate(-90, -60); ctx.rotate(-open * 1.4); ctx.fillStyle = '#7a6a50'; ctx.fillRect(0, -14, 186, 16); ctx.fillStyle = 'rgba(150,80,30,0.55)'; ctx.fillRect(30, -12, 40, 10); ctx.restore();
  ctx.restore();
}
export function letter(k, x, y, w, lines, o = {}) {
  const { ctx } = k, p = o.p ?? 1;
  if (p <= 0) return;
  ctx.save(); ctx.globalAlpha = p; ctx.translate(x, y); ctx.rotate(o.r ?? -0.02);
  const h = 80 + lines.length * 62;
  ctx.fillStyle = '#e4d8b8'; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.strokeStyle = 'rgba(120,100,70,0.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -h / 2); ctx.lineTo(0, h / 2); ctx.moveTo(-w / 2, 0); ctx.lineTo(w / 2, 0); ctx.stroke();
  ctx.restore();
  lines.forEach((l, i) => k.text(l, x - w / 2 + 50, y - h / 2 + 70 + i * 62, { size: o.size ?? 40, align: 'left', color: '#2a2018', fx: 'write', p: o.lineP ? o.lineP(i) : p, maxWidth: w - 90 }));
}
export function slingshot(k, x, y, s = 1, r = 0) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s); ctx.lineCap = 'round';
  ctx.strokeStyle = '#6a4a26'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(0, 0); ctx.lineTo(-22, -36); ctx.moveTo(0, 0); ctx.lineTo(22, -36); ctx.stroke();
  ctx.strokeStyle = '#a83a2a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-22, -36); ctx.lineTo(0, -10); ctx.lineTo(22, -36); ctx.stroke();
  ctx.restore();
}
export function dog(k, x, y, s = 1, flip = false) {
  const { ctx } = k, t = T(k);
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (flip ? -1 : 1), s);
  ctx.fillStyle = '#b8883a'; ctx.strokeStyle = INK; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.ellipse(0, -26, 70, 26, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(70, -30, 26, 22, 0.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(60, -48); ctx.lineTo(66, -70); ctx.lineTo(80, -50); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(96, -28, 4, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#b8883a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-66, -30); ctx.quadraticCurveTo(-100, -40 + Math.sin(t * 2) * 4, -110, -20); ctx.stroke();
  ctx.restore();
}
export function footprints(k, pts, p = 1, s = 1) {
  const { ctx } = k;
  const n = Math.floor(pts.length * p);
  for (let i = 0; i < n; i++) { const [x, y, a] = pts[i]; ctx.save(); ctx.translate(x + (i % 2 ? 14 : -14) * s, y); ctx.rotate(a ?? 0); ctx.scale(s, s); ctx.fillStyle = 'rgba(70,60,50,0.55)'; ctx.beginPath(); ctx.ellipse(0, 0, 9, 18, 0, 0, Math.PI * 2); ctx.fill(); for (let tq = 0; tq < 5; tq++) { ctx.beginPath(); ctx.arc(-8 + tq * 4, -22 + Math.abs(tq - 1) * 1.5, tq === 0 ? 4 : 2.6, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); }
}
export function coffin(k, x, y, s = 1) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#6a1a14'; ctx.beginPath(); ctx.moveTo(-180, 0); ctx.lineTo(-170, -90); ctx.lineTo(170, -90); ctx.lineTo(180, 0); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#c99a3a'; ctx.lineWidth = 4; ctx.strokeRect(-150, -76, 300, 60);
  ctx.fillStyle = '#3a2a1c'; for (const lx of [-160, 140]) ctx.fillRect(lx, 0, 20, 40);
  ctx.restore();
}
export function wisp(k, x, y, a = 0.3) {
  if (a <= 0) return;
  const { ctx } = k, t = T(k);
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#dfe4ea'; ctx.lineWidth = 10; ctx.lineCap = 'round';
  for (let w = 0; w < 2; w++) { ctx.beginPath(); ctx.moveTo(x + w * 14, y); for (let j = 1; j < 18; j++) ctx.lineTo(x + w * 14 + Math.sin(t * 0.9 + j * 0.45 + w) * j * 3.5, y - j * 22); ctx.stroke(); }
  ctx.restore();
}
export function fireStraw(k, x, y, s = 1) {
  const { ctx } = k, t = T(k);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#c9a35a'; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.lineTo(30, -60); ctx.lineTo(-30, -60); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 5; i++) { const f = 1 + 0.25 * Math.sin(t * 12 + i * 2); ctx.fillStyle = i % 2 ? '#ffb340' : '#ff6a2a'; ctx.beginPath(); ctx.moveTo(-30 + i * 14, -60); ctx.quadraticCurveTo(-34 + i * 14, -100 * f, -18 + i * 14, -140 * f); ctx.quadraticCurveTo(-6 + i * 14, -90 * f, 4 + i * 14, -60); ctx.closePath(); ctx.fill(); }
  ctx.restore();
}
export function tray(k, x, y, s = 1, r = 0) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s);
  ctx.fillStyle = '#c9a24a'; ctx.strokeStyle = '#7a5a20'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(0, 0, 60, 60, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(120,90,30,0.6)'; ctx.beginPath(); ctx.ellipse(0, 0, 44, 44, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
}
