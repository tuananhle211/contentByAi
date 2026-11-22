// Nhân Gian Chưa Kể — tập Ông Giẳng Ông Giăng (18/11/2026): bộ cảnh làng đá ong xứ Đoài 1997 + nhân vật búp bê.
// Cảnh: gieng (giếng đầu làng nhìn ngang), soi (nhìn từ miệng giếng xuống), thanhGieng (viên đá lung lay + hốc), tuyet (nước Nga), benhVien, nhaTam (2026).
// Đạo cụ: trang, bong, matNuoc, thu, phong, vo, homTon, anhBo, hu, tayKim, chiDo, goiUot, cub, noiBanh, chuong, xoi, huong.
import { doll, sepia } from '/channel/nhan-gian-doll.js';
import { vary } from '/channel/nhan-gian-hd.js';
import { bamboo, LINE } from '/channel/nhan-gian-cauco.js';

const T = (k) => k.gt ?? 0;
const R = (k, i) => k.rand(i);
const TAU = Math.PI * 2;
function P(ctx, fill, lw, fn, stroke = LINE) { ctx.beginPath(); fn(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
const DK = { day: 0, dusk: -0.14, night: -0.55, dawn: -0.22 };
const SKY = { day: ['#b4c6cc', '#e8dcc0'], dusk: ['#7c5a50', '#d89a68'], night: ['#0c111b', '#1c2333'], dawn: ['#6f8092', '#d8c0a2'] };
function sky(k, time, h = 760) { const { ctx, W } = k, c = SKY[time] ?? SKY.day, g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, c[0]); g.addColorStop(1, c[1]); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, h + 100); }

// ---------- nhân vật ----------
export const NHIM = { kind: 'kid', skin: '#ecc8a4', hair: 'long', hairColor: '#1e1610', top: '#a8796a', topStyle: 'canh', pants: '#33333c', shoes: '#6a5a4a' };
export const NHIM_BE = { ...NHIM, top: '#d8a0a0', topStyle: 'tee', sleeve: 'short', pants: '#6a7a8a' };
export const NHIM_LON = { kind: 'woman', skin: '#e8c8a8', hair: 'long', hairColor: '#1e1610', top: '#5a6a7a', topStyle: 'shirt', pants: '#2a2e36', shoes: '#3a3a3a' };
export const CON = { kind: 'kid', skin: '#f0d0b0', hair: 'long', hairColor: '#241a12', top: '#e0a0a8', topStyle: 'tee', sleeve: 'short', pants: '#6a7a9a', shoes: '#e8e0d0' };
export const ME_N = { kind: 'woman', skin: '#e2cdb4', hair: 'bun', hairColor: '#241a12', top: '#7c7468', topStyle: 'canh', pants: '#23211f', shoes: '#5a4a3a' };
export const BA_N = { kind: 'old', skin: '#d8b498', hair: 'bun', hairColor: '#b0a89e', top: '#5e4634', topStyle: 'baba', pants: '#1e1c1a', shoes: '#4a3a2a' };
export const BO_N = { kind: 'man', skin: '#d0a27a', hair: 'short', hairColor: '#1e1610', top: '#6f7d6a', topStyle: 'shirt', pants: '#33363a', shoes: '#4a3a2a' };
export const MANH = { kind: 'man', skin: '#c89a74', hair: 'short', hairColor: '#2a2018', top: '#54606a', topStyle: 'shirt', pants: '#2c2e32', shoes: '#3a2e24' };
export const HANG_XOM = [
  { kind: 'woman', skin: '#d8ac84', hair: 'bun', hairColor: '#241a12', top: '#7a6a5a', topStyle: 'canh', pants: '#23211f', shoes: '#5a4a3a', hat: 'non' },
  { kind: 'woman', skin: '#d0a27c', hair: 'bun', hairColor: '#3a3028', top: '#8a6f62', topStyle: 'canh', print: 'flower', printColor: '#5a4a6a', pants: '#2a2622', shoes: '#5a4a3a' },
  { kind: 'old', skin: '#d0a888', hair: 'bald', hairColor: '#8a8078', top: '#4e4438', topStyle: 'baba', pants: '#23211f', shoes: '#4a3a2a' },
  { kind: 'man', skin: '#c89a74', hair: 'short', hairColor: '#241a12', top: '#5a6a72', topStyle: 'shirt', pants: '#2a2a2e', shoes: '#4a3a2a' },
];
export const ch = (k, x, y, h, o) => doll(k, x, y, h, o);

// ---------- vầng trăng dưới nước ----------
// Trăng tròn phẳng, tâm (x, y), bán kính r; o.a độ đậm, o.ripple gợn nước.
export function trang(k, x, y, r, o = {}) {
  if (r <= 0) return;
  const { ctx } = k, a = o.a ?? 1, t = T(k);
  ctx.save(); ctx.globalAlpha *= a;
  const g = ctx.createRadialGradient(x, y, r * 0.75, x, y, r * 2.1); g.addColorStop(0, 'rgba(236,230,205,0.5)'); g.addColorStop(1, 'rgba(236,230,205,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, TAU); ctx.fill();
  const d = ctx.createRadialGradient(x - r * 0.25, y - r * 0.25, r * 0.1, x, y, r); d.addColorStop(0, '#f8f2dc'); d.addColorStop(1, '#ddd3b4');
  ctx.fillStyle = d; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip();
  ctx.fillStyle = 'rgba(164,154,126,0.42)';
  for (const [dx, dy, s] of [[-0.3, -0.25, 0.26], [0.25, -0.38, 0.16], [0.34, 0.2, 0.24], [-0.2, 0.36, 0.19], [-0.52, 0.12, 0.12]]) { ctx.beginPath(); ctx.ellipse(x + dx * r, y + dy * r, s * r, s * r * 0.8, dx, 0, TAU); ctx.fill(); }
  if (o.ripple !== false) { ctx.strokeStyle = 'rgba(70,84,104,0.3)'; ctx.lineWidth = Math.max(2, r * 0.018); for (let i = 0; i < 5; i++) { const q = ((t * 0.16 + i / 5) % 1); ctx.globalAlpha = (1 - q) * 0.8; ctx.beginPath(); ctx.ellipse(x, y, r * (0.2 + q * 0.9), r * (0.2 + q * 0.9), 0, 0, TAU); ctx.stroke(); } }
  ctx.restore(); ctx.restore();
}
// Cái bóng ngồi quay lưng trên vầng trăng: chỉ một khối đen, không có mặt. Đáy (x, y), cao h.
export function bong(k, x, y, h, o = {}) {
  const { ctx } = k, s = h / 100, t = T(k);
  ctx.save(); ctx.translate(x, y + Math.sin(t * 0.8) * 1.5 * s); ctx.scale(s, s); ctx.globalAlpha *= o.a ?? 0.92; ctx.fillStyle = '#0a0c12';
  ctx.beginPath(); ctx.moveTo(-34, 0); ctx.bezierCurveTo(-40, -34, -28, -54, -13, -58); ctx.lineTo(13, -58); ctx.bezierCurveTo(28, -54, 40, -34, 34, 0); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -70, 15, 0, TAU); ctx.fill();
  // mũ lông
  ctx.beginPath(); ctx.roundRect(-19, -98, 38, 24, 9); ctx.fill(); ctx.beginPath(); ctx.ellipse(-18, -74, 7, 11, 0.2, 0, TAU); ctx.ellipse(18, -74, 7, 11, -0.2, 0, TAU); ctx.fill();
  if (o.raise) { ctx.strokeStyle = '#0a0c12'; ctx.lineWidth = 11; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(25, -46); ctx.lineTo(50, -72 * o.raise); ctx.stroke(); }
  ctx.restore();
}
// Mặt nước tròn nhìn từ trên xuống (bát, chum, chậu): vành màu o.rim, trong có trăng bé o.moon.
export function matNuoc(k, x, y, r, o = {}) {
  const { ctx } = k, t = T(k);
  P(ctx, o.rim ?? '#6c5240', 4, () => ctx.arc(x, y, r, 0, TAU));
  P(ctx, vary(o.rim ?? '#6c5240', 0.14), 2.5, () => ctx.arc(x, y, r * 0.94, 0, TAU));
  P(ctx, o.water ?? '#0d141e', 3, () => ctx.arc(x, y, r * 0.84, 0, TAU));
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r * 0.84, 0, TAU); ctx.clip();
  if (o.moon) trang(k, x + Math.sin(t * 0.6) * r * 0.03, y, o.moon, { ripple: true });
  ctx.strokeStyle = 'rgba(180,200,220,0.14)'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { const q = (t * 0.2 + i / 3) % 1; ctx.beginPath(); ctx.arc(x, y, r * 0.84 * q, 0, TAU); ctx.stroke(); }
  ctx.restore();
}

// ---------- giếng đầu làng, nhìn ngang ----------
export const GI = { x: 1040, g: 905, top: 690, w: 245, left: 700, right: 1400, da: 250 };
function daOngRows(k, x0, x1, y0, y1, dk, seed = 0) {
  const { ctx } = k; let row = 0;
  for (let y = y0; y < y1; y += 54, row++) for (let x = x0 - (row % 2) * 52, i = 0; x < x1; x += 104, i++) {
    const c = ['#8a5a3e', '#7a4e36', '#96664a', '#845640'][Math.floor(R(k, seed + row * 13 + i) * 4)];
    P(ctx, vary(c, dk), 2.5, () => ctx.roundRect(Math.max(x0, x), y, Math.min(x1, x + 100) - Math.max(x0, x), 50, 7));
    ctx.fillStyle = vary('#5e3c28', dk); for (let n = 0; n < 4; n++) { const px = x + 10 + R(k, seed + row * 7 + i * 3 + n) * 80; if (px > x0 + 4 && px < x1 - 4) { ctx.beginPath(); ctx.arc(px, y + 9 + R(k, seed + row + i + n * 5) * 32, 2 + R(k, n + i) * 3, 0, TAU); ctx.fill(); } }
  }
}
// o.time, o.taut (dây gàu căng rung), o.bucket (gàu đặt trên thành).
export function gieng(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'night', dk = DK[time], { x, g, top, w, da } = GI, t = T(k);
  sky(k, time, 780);
  // mái nhà xa, luỹ tre
  for (const [rx, rw, ry] of [[640, 260, 650], [1500, 330, 640], [1790, 240, 660]]) { P(ctx, vary('#7c4c3a', dk), 3, () => { ctx.moveTo(rx - rw / 2, ry + 40); ctx.lineTo(rx - rw / 2 + 50, ry - 40); ctx.lineTo(rx + rw / 2 - 50, ry - 40); ctx.lineTo(rx + rw / 2, ry + 40); ctx.closePath(); }); P(ctx, vary('#b8a888', dk), 3, () => ctx.rect(rx - rw / 2 + 26, ry + 40, rw - 52, 70)); }
  for (const bx of [520, 1640, 1860]) bamboo(k, bx, 730, 460, dk);
  // đất
  P(ctx, vary('#77784a', dk), 3, () => { ctx.moveTo(-100, 742); ctx.quadraticCurveTo(900, 716, W + 100, 744); ctx.lineTo(W + 100, H + 100); ctx.lineTo(-100, H + 100); ctx.closePath(); });
  P(ctx, vary('#a08a68', dk), 0, () => { ctx.moveTo(x - 480, g + 30); ctx.quadraticCurveTo(x, g - 60, x + 500, g + 30); ctx.quadraticCurveTo(x + 300, H + 60, x + 200, H + 100); ctx.lineTo(x - 300, H + 100); ctx.closePath(); });
  for (let i = 0; i < 34; i++) { const px = R(k, i + 300) * W, py = 770 + R(k, i + 301) * 300; if (Math.abs(px - x) < 430 && py > 840) continue; ctx.strokeStyle = vary('#5c6a33', dk); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 7, py - 16); ctx.moveTo(px, py); ctx.lineTo(px + 7, py - 16); ctx.stroke(); }
  // cây đa: rễ phụ, thân, tán
  const c = vary('#54463a', dk);
  ctx.strokeStyle = vary('#463a30', dk); ctx.lineCap = 'round'; for (let i = 0; i < 9; i++) { ctx.lineWidth = 5 + (i % 3) * 3; const rx = da - 280 + i * 76; ctx.beginPath(); ctx.moveTo(rx, 260); ctx.quadraticCurveTo(rx + Math.sin(i) * 16, 500, rx + Math.cos(i) * 12, i % 3 === 0 ? 880 : 500 + (i % 4) * 70); ctx.stroke(); }
  P(ctx, c, 3.5, () => { ctx.moveTo(da - 210, 900); ctx.bezierCurveTo(da - 110, 760, da - 120, 480, da - 100, 240); ctx.lineTo(da + 110, 240); ctx.bezierCurveTo(da + 120, 480, da + 120, 760, da + 230, 900); ctx.quadraticCurveTo(da, 860, da - 210, 900); ctx.closePath(); });
  ctx.strokeStyle = vary('#42362c', dk); ctx.lineWidth = 6; for (const d of [-60, -18, 26, 66]) { ctx.beginPath(); ctx.moveTo(da + d, 280); ctx.bezierCurveTo(da + d * 1.2, 500, da + d * 0.9, 700, da + d * 1.7, 880); ctx.stroke(); }
  for (let i = 0; i < 22; i++) { const a = i / 21, row = i % 3; P(ctx, vary(row === 0 ? '#34502e' : row === 1 ? '#3e5e34' : '#47683c', dk), 0, () => ctx.ellipse(da - 420 + a * 1120 + Math.sin(t * 0.4 + i) * 4, 20 + row * 74 + R(k, i + 360) * 50 - a * 40, 200, 112, 0, 0, TAU)); }
  // giá gàu
  for (const d of [-1, 1]) P(ctx, vary('#5e4630', dk), 3, () => ctx.rect(x + d * (w + 34) - 13, 400, 26, g - 395));
  P(ctx, vary('#6e5238', dk), 3, () => ctx.rect(x - w - 70, 386, 2 * w + 140, 26));
  // thân giếng
  ctx.save(); ctx.beginPath(); ctx.moveTo(x - w, top); ctx.lineTo(x + w, top); ctx.lineTo(x + w, g); ctx.quadraticCurveTo(x, g + 44, x - w, g); ctx.closePath(); ctx.clip(); daOngRows(k, x - w, x + w, top + 6, g + 60, dk, 40); ctx.restore();
  P(ctx, null, 3.5, () => { ctx.moveTo(x - w, top); ctx.lineTo(x - w, g); ctx.quadraticCurveTo(x, g + 44, x + w, g); ctx.lineTo(x + w, top); });
  P(ctx, vary('#9a6e50', dk), 3.5, () => ctx.ellipse(x, top, w, 52, 0, 0, TAU));
  P(ctx, '#05060a', 3.5, () => ctx.ellipse(x, top, w - 40, 32, 0, 0, TAU));
  // dây gàu
  const wob = o.taut ? Math.sin(t * 34) * 4 * o.taut : 0;
  ctx.strokeStyle = vary('#b09a70', dk); ctx.lineWidth = o.taut ? 5 : 4; ctx.beginPath(); ctx.moveTo(x, 410); ctx.quadraticCurveTo(x + wob, 560, x, top + 4); ctx.stroke();
  if (o.bucket !== false) { const bx = x + w - 70, by = top - 18; P(ctx, vary('#7c8288', dk), 3, () => { ctx.moveTo(bx - 42, by - 62); ctx.lineTo(bx + 42, by - 62); ctx.lineTo(bx + 32, by); ctx.lineTo(bx - 32, by); ctx.closePath(); }); ctx.strokeStyle = vary('#4e5258', dk); ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(bx, by - 62, 42, Math.PI, 0); ctx.stroke(); }
}
// Ánh trăng hắt từ lòng giếng lên (vẽ SAU shade). a độ sáng; full = trăng dâng khít miệng giếng.
export function giengSang(k, a = 1, full = 0) {
  const { ctx } = k, { x, top, w } = GI;
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(x, top, 30, x, top, 760 + full * 300); g.addColorStop(0, `rgba(226,224,200,${0.5 * a})`); g.addColorStop(1, 'rgba(226,224,200,0)');
  ctx.fillStyle = g; ctx.fillRect(x - 1100, top - 1100, 2200, 2200);
  const b = ctx.createLinearGradient(0, top, 0, 0); b.addColorStop(0, `rgba(232,230,206,${0.2 * a})`); b.addColorStop(1, 'rgba(232,230,206,0)');
  ctx.fillStyle = b; ctx.beginPath(); ctx.moveTo(x - w + 40, top); ctx.lineTo(x - w - 90, 0); ctx.lineTo(x + w + 90, 0); ctx.lineTo(x + w - 40, top); ctx.closePath(); ctx.fill();
  ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.ellipse(x, top, w - 40, 32, 0, 0, TAU); ctx.clip();
  ctx.fillStyle = `rgba(240,234,212,${(0.25 + 0.75 * full) * a})`; ctx.fillRect(x - w, top - 40, 2 * w, 80); ctx.restore();
}

// ---------- nhìn từ miệng giếng xuống ----------
// o.moon bán kính trăng (0 = không), o.who cái bóng ngồi (0..1), o.raise bóng giơ tay.
export function soi(k, o = {}) {
  const { ctx, W, H } = k, cx = W / 2, cy = H / 2, m = o.moon ?? 0, lit = Math.min(1, m / 260);
  ctx.fillStyle = '#040508'; ctx.fillRect(-200, -200, W + 400, H + 400);
  const q = 0.75; let r = 1200;
  for (let i = 0; i < 9; i++) {
    const r2 = r * q, n = 20, off = (i % 2) * (TAU / n / 2), dk = -0.15 - i * 0.1 + lit * (i * 0.075);
    for (let j = 0; j < n; j++) {
      const a0 = off + (j / n) * TAU + 0.012, a1 = off + ((j + 1) / n) * TAU - 0.012, c = ['#7a4e36', '#6e4632', '#84563e'][Math.floor(R(k, i * 31 + j) * 3)];
      P(ctx, vary(c, dk), 2.5, () => { ctx.arc(cx, cy, r - 4, a0, a1); ctx.arc(cx, cy, r2 + 4, a1, a0, true); ctx.closePath(); }, '#0a0705');
    }
    r = r2;
  }
  P(ctx, '#070b12', 0, () => ctx.arc(cx, cy, r + 4, 0, TAU));
  const dim = ctx.createRadialGradient(cx, cy, 90, cx, cy, 960); dim.addColorStop(0, `rgba(3,4,8,${0.72 - lit * 0.5})`); dim.addColorStop(1, 'rgba(3,4,8,0.2)'); ctx.fillStyle = dim; ctx.fillRect(-200, -200, W + 400, H + 400);
  if (m > 0) { trang(k, cx, cy, m, { a: o.a ?? 1 }); if (o.who) bong(k, cx, cy + m * 0.42, m * 1.05, { a: o.who * 0.92, raise: o.raise }); }
}

// ---------- thành giếng cận cảnh: viên đá lung lay, hốc, hũ ----------
export function thanhGieng(k, o = {}) {
  const { ctx, W, H } = k, open = o.open ?? 0, x = 960, y = 400;
  ctx.fillStyle = '#20150e'; ctx.fillRect(-100, -100, W + 200, H + 200);
  let row = 0; for (let py = -60; py < H + 60; py += 200, row++) for (let px = -180 + (row % 2) * 190, i = 0; px < W + 100; px += 380, i++) {
    if (py === 340 && px === x - 180 - 0) continue;
    P(ctx, vary(['#8a5a3e', '#7a4e36', '#845640'][Math.floor(R(k, row * 9 + i) * 3)], -0.2), 4, () => ctx.roundRect(px, py, 368, 190, 14));
    ctx.fillStyle = '#4a2f1f'; for (let n = 0; n < 14; n++) { ctx.beginPath(); ctx.arc(px + 16 + R(k, row + i * 3 + n) * 336, py + 14 + R(k, row * 2 + i + n * 7) * 160, 3 + R(k, n + i) * 6, 0, TAU); ctx.fill(); }
  }
  P(ctx, '#050403', 4, () => ctx.roundRect(x - 184, y - 60, 368, 190, 14));
  if (o.hu) hu(k, x, y + 118, 1.05);
  const dx = open * 300, dy = open * 200, rot = open * 0.5;
  ctx.save(); ctx.translate(x + dx, y + 35 + dy); ctx.rotate(rot); P(ctx, vary('#96664a', -0.08), 4, () => ctx.roundRect(-184, -95, 368, 190, 14)); ctx.fillStyle = '#4a2f1f'; for (let n = 0; n < 16; n++) { ctx.beginPath(); ctx.arc(-168 + R(k, n + 80) * 336, -80 + R(k, n + 90) * 160, 3 + R(k, n + 100) * 6, 0, TAU); ctx.fill(); } ctx.restore();
}
// Hũ sành nhỏ niêm sáp, đáy (x, y).
export function hu(k, x, y, s = 1) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#5e4230', 3.5, () => { ctx.moveTo(-40, 0); ctx.bezierCurveTo(-86, -30, -78, -94, -36, -108); ctx.lineTo(36, -108); ctx.bezierCurveTo(78, -94, 86, -30, 40, 0); ctx.closePath(); });
  P(ctx, 'rgba(255,240,210,0.2)', 0, () => ctx.ellipse(-30, -66, 12, 26, 0.2, 0, TAU));
  P(ctx, '#6e5038', 3, () => ctx.roundRect(-40, -124, 80, 20, 6)); P(ctx, '#b0342c', 3, () => { ctx.moveTo(-34, -124); ctx.quadraticCurveTo(0, -152, 34, -124); ctx.closePath(); });
  ctx.restore();
}

// ---------- giấy tờ ----------
const HAND = (px) => `italic 500 ${px}px "Be Vietnam Pro", Georgia, serif`;
export const THU_MAU = ['Kính thưa mẹ,', 'Con ở bên này vẫn khoẻ.', 'Mùa đông năm nay tuyết rơi nhiều.', 'Mẹ giữ gìn sức khoẻ, đợi con về.', 'Con gửi về ít tiền để mẹ thuốc thang.', 'Cái Nhím nhà mình có ngoan không?', '', 'Con của mẹ,', 'Út'];
// Tờ thư, tâm (x, y). o.lines; o.holes = ba lỗ kim ở góc dưới; o.ring 0..1 khoanh ba lỗ kim; o.r xoay.
export function thu(k, x, y, s = 1, o = {}) {
  const { ctx } = k, L = o.lines ?? THU_MAU;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.r ?? -0.02); ctx.scale(s, s);
  P(ctx, '#e6dcc2', 3, () => ctx.rect(-340, -450, 680, 900), '#7a6a52');
  ctx.strokeStyle = 'rgba(90,110,140,0.25)'; ctx.lineWidth = 2; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(-300, -350 + i * 66); ctx.lineTo(300, -350 + i * 66); ctx.stroke(); }
  ctx.fillStyle = '#2a3550'; ctx.font = HAND(30); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  L.forEach((t, i) => { const tx = i >= L.length - 2 ? 60 : i === 0 ? -290 : -270; ctx.fillText(t, tx, -362 + i * 66); });
  if (o.holes) { ctx.fillStyle = '#17120e'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(200 + i * 42, 398, 6, 0, TAU); ctx.fill(); } }
  if (o.ring) { ctx.strokeStyle = `rgba(242,178,74,${o.ring})`; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(242, 398, 96, 46, 0, 0, TAU); ctx.stroke(); }
  ctx.restore();
}
// Phong bì máy bay có tem, tâm (x, y).
export function phong(k, x, y, s = 1, o = {}) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.rotate(o.r ?? 0); ctx.scale(s, s);
  P(ctx, '#e6dcc2', 3, () => ctx.rect(-300, -170, 600, 340), '#7a6a52');
  ctx.save(); ctx.beginPath(); ctx.rect(-300, -170, 600, 340); ctx.clip(); for (let i = -12; i < 22; i++) { ctx.fillStyle = i % 2 ? '#b0342c' : '#35568c'; ctx.save(); ctx.translate(-300 + i * 34, -170); ctx.transform(1, 0, -0.7, 1, 0, 0); ctx.fillRect(0, 0, 18, 14); ctx.fillRect(238, 326, 18, 14); ctx.restore(); } ctx.restore();
  P(ctx, '#c8d0b0', 2.5, () => ctx.rect(170, -135, 96, 118), '#5a5a4a'); ctx.fillStyle = '#8a2a22'; ctx.font = '700 26px "Be Vietnam Pro"'; ctx.textAlign = 'center'; ctx.fillText('CCCP', 218, -68);
  ctx.fillStyle = '#2a3550'; ctx.font = HAND(34); ctx.textAlign = 'left'; ctx.fillText('Kính gửi: Mẹ và vợ con', -240, 20); ctx.fillText('Làng Đá, xứ Đoài', -240, 72);
  ctx.restore();
}
// Quyển vở học trò mở đôi: mỗi dòng cùng một câu, nét run dần thành nét giống chữ bố. p 0..1 hiện dần.
export function vo(k, o = {}) {
  const { ctx, W, H } = k, p = o.p ?? 1, text = 'Kính thưa mẹ. Con ở bên này vẫn khoẻ.';
  ctx.fillStyle = '#17110c'; ctx.fillRect(-100, -100, W + 200, H + 200);
  for (const [px, r] of [[-1, 0.012], [1, -0.012]]) {
    ctx.save(); ctx.translate(960 + px * 400, 540); ctx.rotate(r); P(ctx, '#e4e0d0', 3, () => ctx.rect(-395, -490, 790, 980), '#6a6250');
    ctx.strokeStyle = 'rgba(70,100,160,0.32)'; ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(-360, -430 + i * 66); ctx.lineTo(360, -430 + i * 66); ctx.stroke(); }
    ctx.restore();
  }
  const total = 26;
  for (let i = 0; i < total; i++) {
    const v = Math.max(0, Math.min(1, p * total - i)); if (v <= 0) continue;
    const page = i < 13 ? -1 : 1, row = i % 13, shaky = Math.max(0, 1 - i / 18);
    ctx.save(); ctx.translate(960 + page * 400 - 345, 540 - 438 + row * 66); ctx.rotate((R(k, i + 500) - 0.5) * 0.05 * shaky - 0.012 * page); ctx.fillStyle = `rgba(36,48,84,${v})`; ctx.font = HAND(i < 13 ? 33 : 35); ctx.textAlign = 'left';
    if (shaky > 0.05) { let cx = 0; for (let c = 0; c < text.length; c++) { const ch2 = text[c]; ctx.fillText(ch2, cx, (R(k, i * 40 + c) - 0.5) * 7 * shaky); cx += ctx.measureText(ch2).width + (R(k, i * 17 + c) - 0.3) * 2.4 * shaky; } } else ctx.fillText(text, 0, 0);
    ctx.restore();
  }
}
// Hòm tôn sơn xanh mở nắp, đáy (x, y); bên trong xấp thư.
export function homTon(k, x, y, s = 1, o = {}) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#3f5a52', 4, () => { ctx.moveTo(-340, -240); ctx.lineTo(-300, -470); ctx.lineTo(300, -470); ctx.lineTo(340, -240); ctx.closePath(); });
  P(ctx, '#151210', 4, () => ctx.rect(-340, -240, 680, 50));
  if (o.letters !== false) for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(-120 + i * 46, -232 - (i % 2) * 6); ctx.rotate(-0.1 + i * 0.05); P(ctx, '#e6dcc2', 2.5, () => ctx.rect(-90, -46, 180, 90), '#7a6a52'); ctx.fillStyle = i % 2 ? '#b0342c' : '#35568c'; ctx.fillRect(-90, -46, 180, 8); ctx.restore(); }
  P(ctx, '#4f6e64', 4, () => ctx.rect(-350, -200, 700, 200)); ctx.strokeStyle = '#37504a'; ctx.lineWidth = 4; for (const d of [-250, 250]) { ctx.beginPath(); ctx.moveTo(d, -200); ctx.lineTo(d, 0); ctx.stroke(); }
  P(ctx, '#c8a24a', 3, () => ctx.rect(-34, -180, 68, 54)); ctx.restore();
}
// Ảnh bố đội mũ lông đứng giữa tuyết, tâm (x, y).
export function anhBo(k, x, y, s = 1) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#5a3e28', 4, () => ctx.rect(-120, -158, 240, 316)); P(ctx, '#d4d6d4', 2.5, () => ctx.rect(-100, -138, 200, 276));
  ctx.save(); ctx.beginPath(); ctx.rect(-100, -138, 200, 276); ctx.clip();
  ctx.fillStyle = '#a8b0b4'; ctx.fillRect(-100, -138, 200, 150); ctx.fillStyle = '#7e888e'; ctx.fillRect(-100, -30, 70, 60); ctx.fillRect(40, -60, 60, 90);
  ctx.fillStyle = '#e8ecec'; ctx.fillRect(-100, 50, 200, 100);
  P(ctx, '#3c4044', 2.5, () => { ctx.moveTo(-58, 138); ctx.lineTo(-48, 10); ctx.quadraticCurveTo(0, -12, 48, 10); ctx.lineTo(58, 138); ctx.closePath(); });
  P(ctx, '#c8b49a', 2.5, () => ctx.arc(0, -36, 36, 0, TAU)); P(ctx, '#7a6c5c', 2.5, () => ctx.roundRect(-44, -98, 88, 52, 14)); P(ctx, '#6a5c4e', 2.5, () => { ctx.ellipse(-42, -36, 13, 26, 0.12, 0, TAU); }); P(ctx, '#6a5c4e', 2.5, () => { ctx.ellipse(42, -36, 13, 26, -0.12, 0, TAU); }); ctx.strokeStyle = '#5a4e42'; ctx.lineWidth = 3; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-36 + i * 9, -92); ctx.lineTo(-40 + i * 9, -60); ctx.stroke(); }
  ctx.fillStyle = '#2a2420'; ctx.beginPath(); ctx.arc(-13, -34, 3.4, 0, TAU); ctx.arc(13, -34, 3.4, 0, TAU); ctx.fill(); ctx.strokeStyle = '#2a2420'; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(-9, -14); ctx.lineTo(9, -14); ctx.stroke();
  ctx.restore(); ctx.restore();
}
// Cẳng tay + bàn tay: cổ tay tại (x, y), bàn tay chìa theo hướng rot. o.sleeve = màu tay áo, o.cuff = khoảng cách từ cổ tay tới mép tay áo.
export function banTay(k, x, y, s = 1, rot = 0, skin = '#ecc8a4', o = {}) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  P(ctx, skin, 4, () => { ctx.moveTo(-1200, -82); ctx.lineTo(-20, -62); ctx.lineTo(-20, 62); ctx.lineTo(-1200, 82); ctx.closePath(); });
  for (const [fy, len] of [[-58, 118], [-20, 138], [18, 130], [54, 104]]) P(ctx, skin, 4, () => ctx.roundRect(110, fy - 18, len, 36, 18));
  P(ctx, skin, 4, () => { ctx.save(); ctx.translate(38, -62); ctx.rotate(-0.72); ctx.roundRect(-10, -22, 124, 44, 22); ctx.restore(); });
  P(ctx, skin, 0, () => ctx.roundRect(-30, -74, 168, 148, 44)); P(ctx, null, 4, () => { ctx.moveTo(-20, -68); ctx.quadraticCurveTo(50, -82, 122, -72); ctx.moveTo(-20, 68); ctx.quadraticCurveTo(50, 84, 118, 74); });
  ctx.strokeStyle = 'rgba(120,84,60,0.45)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(30, -30); ctx.quadraticCurveTo(70, 0, 40, 40); ctx.stroke();
  if (o.sleeve) { const c = -(o.cuff ?? 180); P(ctx, o.sleeve, 4, () => { ctx.moveTo(-1250, -104); ctx.lineTo(c, -92); ctx.lineTo(c, 92); ctx.lineTo(-1250, 104); ctx.closePath(); }); ctx.strokeStyle = 'rgba(30,20,14,0.35)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(c - 26, -92); ctx.lineTo(c - 26, 92); ctx.stroke(); }
  ctx.restore();
}
// Cánh tay chìa ra, khuỷu tay có vết kim cũ chồng mới. p 0..1 tay áo xắn dần.
export function tayKim(k, o = {}) {
  const { ctx, W, H } = k, p = o.p ?? 1, wrist = 1370;
  ctx.fillStyle = '#120e0c'; ctx.fillRect(-100, -100, W + 200, H + 200);
  banTay(k, wrist, 540, 1.7, 0, '#e2cdb4');
  ctx.fillStyle = 'rgba(92,60,84,0.34)'; for (const [x, y, a, b] of [[760, 540, 120, 58], [900, 515, 80, 44], [640, 580, 72, 38]]) { ctx.beginPath(); ctx.ellipse(x, y, a, b, 0.2, 0, TAU); ctx.fill(); }
  ctx.fillStyle = '#4a2c30'; for (let i = 0; i < 24; i++) { ctx.beginPath(); ctx.arc(590 + R(k, i + 610) * 400, 480 + R(k, i + 620) * 120, 3.5 + R(k, i + 630) * 3, 0, TAU); ctx.fill(); }
  const sx = 1260 - p * 860; P(ctx, '#7c7468', 5, () => { ctx.moveTo(-100, 392); ctx.lineTo(sx, 408); ctx.quadraticCurveTo(sx + 40, 540, sx, 672); ctx.lineTo(-100, 688); ctx.closePath(); });
  ctx.strokeStyle = '#5e5850'; ctx.lineWidth = 5; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(sx - i * 34, 404); ctx.quadraticCurveTo(sx - i * 34 + 36, 540, sx - i * 34, 676); ctx.stroke(); }
}
// Hai cổ tay buộc chỉ đỏ. o.broken = chỉ đứt.
export function chiDo(k, o = {}) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#16100c'; ctx.fillRect(-100, -100, W + 200, H + 200);
  banTay(k, 720, 370, 1, 0.04, '#d8b498', { sleeve: '#5e4634', cuff: 200 });
  banTay(k, 1200, 720, 0.92, Math.PI - 0.04, '#ecc8a4', { sleeve: '#a8796a', cuff: 200 });
  ctx.strokeStyle = '#b0241e'; ctx.lineWidth = 9; ctx.lineCap = 'round';
  for (const d of [0, 22]) { ctx.beginPath(); ctx.moveTo(630 + d, 288); ctx.quadraticCurveTo(612 + d, 372, 630 + d, 452); ctx.stroke(); ctx.beginPath(); ctx.moveTo(1270 + d, 648); ctx.quadraticCurveTo(1252 + d, 722, 1270 + d, 796); ctx.stroke(); }
  ctx.beginPath(); if (o.broken) { ctx.moveTo(640, 450); ctx.bezierCurveTo(630, 610, 780, 640, 860, 610); ctx.moveTo(1276, 650); ctx.bezierCurveTo(1200, 560, 1120, 600, 1070, 560); } else { ctx.moveTo(640, 450); ctx.bezierCurveTo(650, 640, 1140, 470, 1276, 650); } ctx.stroke();
}
// Cái gối ướt nhìn từ trên.
export function goiUot(k, o = {}) {
  const { ctx, W, H } = k, t = T(k);
  ctx.fillStyle = '#2a2018'; ctx.fillRect(-100, -100, W + 200, H + 200);
  ctx.strokeStyle = 'rgba(120,90,40,0.3)'; ctx.lineWidth = 3; for (let x = -40; x < W + 40; x += 30) { ctx.beginPath(); ctx.moveTo(x, -20); ctx.lineTo(x, H + 20); ctx.stroke(); }
  P(ctx, '#e8e0cc', 5, () => ctx.roundRect(400, 250, 1120, 560, 90));
  ctx.fillStyle = 'rgba(70,90,110,0.5)'; ctx.beginPath(); ctx.moveTo(760, 420); ctx.bezierCurveTo(900, 340, 1160, 380, 1220, 520); ctx.bezierCurveTo(1270, 660, 1040, 730, 860, 680); ctx.bezierCurveTo(690, 630, 650, 490, 760, 420); ctx.fill();
  ctx.strokeStyle = '#1e1610'; ctx.lineWidth = 4; for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(780 + i * 26, 470 + Math.sin(i) * 26); ctx.bezierCurveTo(800 + i * 28, 600, 720 + i * 34, 700, 660 + i * 40, 830 + Math.sin(i * 2 + t) * 8); ctx.stroke(); }
  ctx.fillStyle = 'rgba(180,205,225,0.75)'; for (let i = 0; i < 6; i++) { const q = (t * 0.5 + i / 6) % 1, x = 620 + i * 130; ctx.beginPath(); ctx.ellipse(x, 800 + q * 200, 7, 12, 0, 0, TAU); ctx.fill(); }
}

// ---------- xe, đồ Tết, đồ cúng ----------
// Xe Cub, tâm trục giữa tại (x, y mặt đất).
export function cub(k, x, y, s = 1, o = {}) {
  const { ctx } = k, t = T(k), spin = (o.spin ?? 0) * t * 9; ctx.save(); ctx.translate(x, y); ctx.scale((o.flip ? -1 : 1) * s, s);
  for (const wx of [-150, 150]) { P(ctx, '#17171a', 4, () => ctx.arc(wx, -62, 62, 0, TAU)); P(ctx, '#8a8a8a', 3, () => ctx.arc(wx, -62, 40, 0, TAU)); ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { const a = spin + (i / 6) * TAU; ctx.beginPath(); ctx.moveTo(wx, -62); ctx.lineTo(wx + Math.cos(a) * 40, -62 + Math.sin(a) * 40); ctx.stroke(); } }
  P(ctx, '#7a2e28', 4, () => { ctx.moveTo(-150, -130); ctx.quadraticCurveTo(-60, -176, 30, -150); ctx.quadraticCurveTo(60, -86, 120, -92); ctx.lineTo(136, -220); ctx.lineTo(176, -214); ctx.lineTo(170, -76); ctx.quadraticCurveTo(70, -36, -40, -56); ctx.quadraticCurveTo(-130, -60, -150, -130); ctx.closePath(); });
  P(ctx, '#23211f', 4, () => ctx.roundRect(-140, -188, 180, 34, 14));
  ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(150, -216); ctx.lineTo(112, -266); ctx.stroke(); P(ctx, '#e8d890', 3, () => ctx.arc(176, -200, 20, 0, TAU));
  ctx.restore();
}
// Nồi bánh chưng đun trên ba ông đầu rau, đáy (x, y).
export function noiBanh(k, x, y, s = 1) {
  const { ctx } = k, t = T(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const d of [-130, 0, 130]) P(ctx, '#6e5c4a', 3, () => ctx.roundRect(d - 36, -78, 72, 78, 10));
  for (let i = 0; i < 6; i++) { const f = 1 + Math.sin(t * 11 + i * 2) * 0.2, fx = -120 + i * 48; P(ctx, i % 2 ? '#e8742e' : '#f2a03c', 0, () => { ctx.moveTo(fx - 26, -6); ctx.quadraticCurveTo(fx - 22, -62 * f, fx, -96 * f); ctx.quadraticCurveTo(fx + 22, -62 * f, fx + 26, -6); ctx.closePath(); }); }
  P(ctx, '#3a3a3c', 4, () => { ctx.moveTo(-210, -300); ctx.lineTo(210, -300); ctx.quadraticCurveTo(222, -130, 150, -78); ctx.lineTo(-150, -78); ctx.quadraticCurveTo(-222, -130, -210, -300); ctx.closePath(); });
  P(ctx, '#4a4a4c', 4, () => ctx.ellipse(0, -300, 214, 34, 0, 0, TAU));
  ctx.strokeStyle = 'rgba(232,232,232,0.3)'; ctx.lineWidth = 16; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-90 + i * 90, -340); for (let j = 1; j < 8; j++) ctx.lineTo(-90 + i * 90 + Math.sin(t * 1.4 + j * 0.8 + i) * j * 5, -340 - j * 34); ctx.stroke(); }
  ctx.restore();
}
// Quả chuông chùa, móc tại (x, y). ring 0..1 sóng âm.
export function chuong(k, x, y, s = 1, ring = 0) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#4a3a2a'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(0, -120); ctx.lineTo(0, 0); ctx.stroke();
  P(ctx, '#6e5a34', 4, () => { ctx.moveTo(-60, 0); ctx.quadraticCurveTo(0, -30, 60, 0); ctx.bezierCurveTo(110, 120, 118, 300, 190, 390); ctx.lineTo(-190, 390); ctx.bezierCurveTo(-118, 300, -110, 120, -60, 0); ctx.closePath(); });
  ctx.strokeStyle = '#4e3f24'; ctx.lineWidth = 6; for (const yy of [110, 220, 340]) { ctx.beginPath(); ctx.moveTo(-100 - (yy - 110) * 0.3, yy); ctx.lineTo(100 + (yy - 110) * 0.3, yy); ctx.stroke(); }
  if (ring > 0) { ctx.strokeStyle = `rgba(242,214,150,${0.5 * (1 - ring)})`; ctx.lineWidth = 6; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(0, 200, 260 + ring * 300 + i * 70, 0, TAU); ctx.stroke(); } }
  ctx.restore();
}
// Rổ xôi nhỏ, đáy (x, y).
export function roXoi(k, x, y, s = 1) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#f0e6c8', 3, () => { ctx.moveTo(-66, -46); ctx.quadraticCurveTo(0, -104, 66, -46); ctx.closePath(); });
  P(ctx, '#a07a46', 3.5, () => { ctx.moveTo(-82, -50); ctx.lineTo(82, -50); ctx.lineTo(54, 0); ctx.lineTo(-54, 0); ctx.closePath(); });
  ctx.strokeStyle = '#7c5c30'; ctx.lineWidth = 2.5; for (let i = 1; i < 7; i++) { ctx.beginPath(); ctx.moveTo(-82 + i * 23, -50); ctx.lineTo(-54 + i * 15, 0); ctx.stroke(); }
  ctx.restore();
}
// Nén hương cắm, đầu đỏ tại (x, y).
export function huong(k, x, y, s = 1) {
  const { ctx } = k, t = T(k);
  ctx.strokeStyle = '#8a2a1a'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 130 * s); ctx.stroke();
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, 1, x, y, 34 * s); g.addColorStop(0, 'rgba(255,120,50,0.9)'); g.addColorStop(1, 'rgba(255,120,50,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 34 * s, 0, TAU); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#ff7a3c'; ctx.beginPath(); ctx.arc(x, y, 6 * s, 0, TAU); ctx.fill();
  ctx.save(); ctx.globalAlpha = 0.28; ctx.strokeStyle = '#ddd'; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(x, y - 6); for (let j = 1; j < 11; j++) ctx.lineTo(x + Math.sin(t + j * 0.6) * j * 3.4 * s, y - 6 - j * 26 * s); ctx.stroke(); ctx.restore();
}
// Đốm đỏ nhìn từ xa (tưởng đầu điếu thuốc).
export function domDo(k, x, y) {
  const { ctx } = k, f = 0.75 + Math.sin(T(k) * 2.2) * 0.25;
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, 1, x, y, 34); g.addColorStop(0, `rgba(255,110,50,${f})`); g.addColorStop(1, 'rgba(255,110,50,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 34, 0, TAU); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#ff8a4a'; ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill();
}

// ---------- nước Nga ----------
export function tuyet(k, o = {}) {
  const { ctx, W, H } = k, t = T(k);
  const g = ctx.createLinearGradient(0, 0, 0, 720); g.addColorStop(0, '#6e7a86'); g.addColorStop(1, '#b4bcc2'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, 860);
  for (const [x, w, h] of [[120, 420, 400], [640, 360, 330], [1120, 460, 440], [1640, 380, 360]]) { P(ctx, '#7c848a', 3, () => ctx.rect(x, 730 - h, w, h)); ctx.fillStyle = '#4e565c'; for (let r = 0; r < Math.floor(h / 62); r++) for (let c = 0; c < Math.floor(w / 62); c++) { ctx.fillStyle = R(k, x + r * 11 + c) > 0.82 ? '#d8c078' : '#4e565c'; ctx.fillRect(x + 22 + c * 62, 730 - h + 22 + r * 62, 32, 36); } }
  for (const x of [80, 560, 1040, 1560, 1860]) { ctx.strokeStyle = '#2e2a28'; ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x, 770); ctx.lineTo(x, 470); ctx.stroke(); ctx.lineWidth = 5; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x, 640 - i * 36); ctx.lineTo(x + (i % 2 ? 80 : -80), 570 - i * 44); ctx.stroke(); } }
  P(ctx, '#e6eaec', 3, () => { ctx.moveTo(-100, 760); ctx.quadraticCurveTo(900, 720, W + 100, 762); ctx.lineTo(W + 100, H + 100); ctx.lineTo(-100, H + 100); ctx.closePath(); });
  if (o.fn) o.fn();
  ctx.fillStyle = 'rgba(245,248,250,0.9)'; for (let i = 0; i < 130; i++) { const x = (R(k, i + 40) * (W + 200) + Math.sin(t * 0.7 + i) * 26 - t * 26 * (0.5 + R(k, i + 60))) % (W + 200); const y = (R(k, i + 80) * (H + 80) + t * 74 * (0.6 + R(k, i + 90))) % (H + 80) - 40; ctx.beginPath(); ctx.arc(x < 0 ? x + W + 200 : x, y, 2.5 + R(k, i + 70) * 4, 0, TAU); ctx.fill(); }
}

// ---------- hành lang bệnh viện tỉnh ----------
export function benhVien(k) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#c4cfc0'; ctx.fillRect(-100, -100, W + 200, 620); ctx.fillStyle = '#7e9484'; ctx.fillRect(-100, 500, W + 200, 330);
  ctx.fillStyle = '#8c8a78'; ctx.fillRect(-100, 820, W + 200, 400); P(ctx, null, 3, () => { ctx.moveTo(-100, 820); ctx.lineTo(W + 100, 820); });
  for (const x of [320, 1320]) { P(ctx, '#6a5a44', 4, () => ctx.rect(x, 190, 290, 630)); P(ctx, '#d8dcd4', 3, () => ctx.rect(x + 50, 240, 190, 170)); }
  P(ctx, '#7a6a52', 4, () => ctx.rect(690, 640, 560, 26)); for (const x of [720, 1190]) P(ctx, '#5a4c3a', 3, () => ctx.rect(x, 666, 26, 156));
}

// ---------- căn hộ Hà Nội 2026 ----------
export function canHo(k) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#d9d4c6'; ctx.fillRect(-100, -100, W + 200, 900); ctx.fillStyle = '#9a8468'; ctx.fillRect(-100, 800, W + 200, 400); P(ctx, null, 3, () => { ctx.moveTo(-100, 800); ctx.lineTo(W + 100, 800); });
  P(ctx, '#bcd0d8', 6, () => ctx.rect(1180, 130, 560, 470), '#6a6a66'); for (const [x, w, h] of [[1210, 110, 300], [1340, 90, 220], [1450, 130, 340], [1600, 110, 250]]) { ctx.fillStyle = '#8c9aa2'; ctx.fillRect(x, 600 - h, w, h); ctx.fillStyle = '#c8d4d8'; for (let r = 0; r < Math.floor(h / 44); r++) for (let c = 0; c < Math.floor(w / 34); c++) ctx.fillRect(x + 10 + c * 34, 600 - h + 12 + r * 44, 18, 24); }
  ctx.strokeStyle = '#6a6a66'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1460, 130); ctx.lineTo(1460, 600); ctx.stroke();
  P(ctx, '#7f8f88', 4, () => ctx.roundRect(150, 560, 620, 250, 34)); P(ctx, '#90a098', 4, () => ctx.roundRect(190, 610, 540, 120, 22));
}

// ---------- nhà tắm 2026 ----------
export const TAM = { chau: { x: 1130, y: 790, r: 215 }, voi: { x: 1500, y: 430 } };
export function nhaTam(k, o = {}) {
  const { ctx, W, H } = k, t = T(k), { x, y } = TAM.voi;
  ctx.fillStyle = '#b8c8cc'; ctx.fillRect(-100, -100, W + 200, 880); ctx.strokeStyle = '#94a6aa'; ctx.lineWidth = 3; for (let py = 0; py < 800; py += 120) { ctx.beginPath(); ctx.moveTo(-100, py); ctx.lineTo(W + 100, py); ctx.stroke(); } for (let px = 0; px < W; px += 120) { ctx.beginPath(); ctx.moveTo(px, -100); ctx.lineTo(px, 780); ctx.stroke(); }
  ctx.fillStyle = '#8c9a9c'; ctx.fillRect(-100, 780, W + 200, 400); ctx.strokeStyle = '#748486'; for (let px = -60; px < W + 100; px += 170) { ctx.beginPath(); ctx.moveTo(px, 780); ctx.lineTo(px - 120, H + 60); ctx.stroke(); } for (const py of [860, 960, 1060]) { ctx.beginPath(); ctx.moveTo(-100, py); ctx.lineTo(W + 100, py); ctx.stroke(); }
  P(ctx, '#a8b0b4', 4, () => ctx.roundRect(x - 10, y - 26, 170, 42, 10)); P(ctx, '#c8d0d4', 4, () => ctx.roundRect(x - 34, y - 8, 54, 92, 12)); P(ctx, '#d8dee0', 3, () => ctx.roundRect(x + 118, y - 56, 74, 26, 8));
  if (o.drip !== false) { const q = (t * 1.1) % 1; ctx.fillStyle = '#d8e8f0'; ctx.beginPath(); ctx.ellipse(x - 7, y + 92 + q * q * 400, 8, 13, 0, 0, TAU); ctx.fill(); }
}
export { sepia };
