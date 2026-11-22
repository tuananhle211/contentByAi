// Nhân Gian Chưa Kể — tập Ma Giấu (18/11/2026): bộ cảnh phẳng làng nhãn Bắc Bộ 2001 / 1979 + nhân vật búp bê.
// Cảnh: vuonNhan (cây nhãn sau vườn), ngoXom (ngõ xóm), sanKho (chiếu bóng 1979), hamA (cửa hầm chữ A), hamTrong (trong hầm), bepVach (vách bếp).
// Đạo cụ: mamDong, muoi, chumNhan, quaNhan, batPhan, no, cuoc, duoc, sot, muaTo, banTho.
import { doll, sepia } from '/channel/nhan-gian-doll.js';
import { vary } from '/channel/nhan-gian-hd.js';
import { bamboo, LINE } from '/channel/nhan-gian-cauco.js';
import { bowl } from '/channel/nhan-gian.js';

const T = (k) => k.gt ?? 0;
const R = (k, i) => k.rand(i);
function P(ctx, fill, lw, fn, stroke = LINE) { ctx.beginPath(); fn(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
const DK = { day: 0, dusk: -0.14, night: -0.55, dawn: -0.22 };
const SKY = { day: ['#b4c6cc', '#e8dcc0'], dusk: ['#7c5a50', '#d89a68'], night: ['#111825', '#262f42'], dawn: ['#6f8092', '#d8c0a2'] };
function sky(k, time, h = 640) { const { ctx, W } = k, c = SKY[time] ?? SKY.day, g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, c[0]); g.addColorStop(1, c[1]); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, h + 100); }

// ---------- nhân vật ----------
export const TOI = { kind: 'kid', skin: '#e8c09c', hair: 'short', hairColor: '#1e1610', top: '#5f7f8e', topStyle: 'tee', sleeve: 'short', pants: '#3a4250', shoes: '#6a5a4a' };
export const TIT = { kind: 'kid', skin: '#f0d0b0', hair: 'buzz', hairColor: '#241a12', top: '#c8a24a', topStyle: 'tee', sleeve: 'short', pants: '#4a5a4a', shoes: '#3f7f9a' };
export const HIEU = { kind: 'man', skin: '#d8ac84', hair: 'short', hairColor: '#1e1610', top: '#a86a5a', topStyle: 'tee', sleeve: 'short', pants: '#34404e', shoes: '#5a4a3a' };
export const MAI = { kind: 'kid', skin: '#ecc8a4', hair: 'long', hairColor: '#1e1610', top: '#b88aa0', topStyle: 'canh', pants: '#33333c', shoes: '#7a5a5a' };
export const BAN = [
  { kind: 'kid', skin: '#d8ac84', hair: 'spiky', hairColor: '#1e1610', top: '#7a8a5a', topStyle: 'tee', sleeve: 'short', pants: '#3a3a44', shoes: '#5a4a3a' },
  { kind: 'kid', skin: '#e8c09c', hair: 'bun', hairColor: '#1e1610', top: '#c08a5a', topStyle: 'canh', pants: '#3a3440', shoes: '#6a4a4a' },
  { kind: 'kid', skin: '#c8966e', hair: 'buzz', hairColor: '#241a12', top: '#8a7a9a', topStyle: 'tee', sleeve: 'short', pants: '#40483a', shoes: '#5a4a3a' },
  { kind: 'kid', skin: '#ecc8a4', hair: 'short', hairColor: '#241a12', top: '#6a9a8a', topStyle: 'tee', sleeve: 'short', pants: '#3a3a44', shoes: '#5a4a3a' },
];
export const LANH = { kind: 'kid', skin: '#dcd0c0', hair: 'short', hairColor: '#17130f', top: '#a89a82', topStyle: 'tee', sleeve: 'short', pants: '#5a5044', shoes: '#dcd0c0' };
export const LANH_79 = { ...LANH, skin: '#ecc8a4', top: '#c8b48e', shoes: '#b0403a' };
export const BO = { kind: 'man', skin: '#c89a74', hair: 'short', hairColor: '#1e1610', top: '#66766a', topStyle: 'shirt', pants: '#2e3238', shoes: '#4a3a2a' };
export const BO_NHO = { kind: 'kid', skin: '#c89a74', hair: 'spiky', hairColor: '#1e1610', top: '#8a9a8a', topStyle: 'tee', sleeve: 'short', pants: '#3a3a3a', roll: true, shoes: '#c89a74' };
export const DAN = [
  { kind: 'man', skin: '#c89a74', hair: 'short', hairColor: '#241a12', top: '#5a6a72', topStyle: 'shirt', pants: '#2a2a2e', shoes: '#4a3a2a' },
  { kind: 'woman', skin: '#d8ac84', hair: 'bun', hairColor: '#241a12', top: '#7a6a5a', topStyle: 'canh', pants: '#23211f', shoes: '#5a4a3a', hat: 'non' },
  { kind: 'man', skin: '#b88c68', hair: 'buzz', hairColor: '#241a12', top: '#6a5a4a', topStyle: 'tee', sleeve: 'short', pants: '#2e2e2e', shoes: '#4a3a2a' },
  { kind: 'old', skin: '#d0a888', hair: 'bald', hairColor: '#8a8078', top: '#4e4438', topStyle: 'baba', pants: '#23211f', shoes: '#4a3a2a' },
];
export const ch = (k, x, y, h, o) => doll(k, x, y, h, o);
export const lie = (k, x, y, h, o) => k.group({ x, y, r: -Math.PI / 2 }, () => doll(k, 0, 0, h, { ...o, shadow: false, arms: 'down' }));

// ---------- đạo cụ ----------
// Mâm đồng nhìn chính diện, tâm (x, y). o.dent 0..1 méo + lõm; o.ring 0..1 vòng rung khi gõ.
export function mamDong(k, x, y, s = 1, o = {}) {
  const { ctx } = k, d = o.dent ?? 1, ring = o.ring ?? 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const out = () => { for (let i = 0; i <= 40; i++) { const a = (i / 40) * Math.PI * 2, r = 118 + d * (Math.sin(a * 3 + 1) * 7 + (a > 0.5 && a < 1.5 ? -17 : 0)); const px = Math.cos(a) * r, py = Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); };
  P(ctx, '#a97c34', 3.5, out); P(ctx, '#c49a4a', 2, () => ctx.arc(0, 0, 92, 0, Math.PI * 2));
  ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = '#efd58e'; ctx.beginPath(); ctx.ellipse(-34, -40, 34, 16, -0.6, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  for (let i = 0; i < 13 * d; i++) { const a = R(k, i + 700) * 6.28, r = R(k, i + 710) * 84; P(ctx, 'rgba(70,44,14,0.45)', 0, () => ctx.ellipse(Math.cos(a) * r, Math.sin(a) * r, 8 + R(k, i + 720) * 11, 5 + R(k, i + 730) * 6, a, 0, Math.PI * 2)); }
  if (ring > 0) { ctx.strokeStyle = `rgba(245,214,140,${0.7 * (1 - ring)})`; ctx.lineWidth = 5; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(0, 0, 130 + ring * 110 + i * 34, 0, Math.PI * 2); ctx.stroke(); } }
  ctx.restore();
}
// Chùm nhãn treo, gốc cuống tại (x, y).
export function chumNhan(k, x, y, s = 1, dk = 0) {
  const { ctx } = k; ctx.strokeStyle = vary('#6a5a3a', dk); ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 26 * s); ctx.stroke();
  for (const [dx, dy] of [[-22, 34], [4, 30], [26, 40], [-30, 58], [-6, 56], [18, 62], [-16, 80], [8, 84]]) P(ctx, vary('#b8955a', dk), 2, () => ctx.arc(x + dx * s, y + dy * s, 14 * s, 0, Math.PI * 2));
}
// Một quả nhãn; o.peeled = đã bóc (cùi trắng).
export function quaNhan(k, x, y, s = 1, o = {}) {
  const { ctx } = k;
  if (o.peeled) { P(ctx, '#b8955a', 3 * s, () => ctx.arc(x + 4 * s, y + 18 * s, 34 * s, 0.1, Math.PI - 0.1)); P(ctx, '#f0ece0', 3 * s, () => ctx.arc(x, y, 32 * s, 0, Math.PI * 2)); P(ctx, 'rgba(90,70,50,0.28)', 0, () => ctx.arc(x + 4 * s, y + 3 * s, 14 * s, 0, Math.PI * 2)); P(ctx, 'rgba(255,255,255,0.75)', 0, () => ctx.ellipse(x - 11 * s, y - 12 * s, 8 * s, 5 * s, -0.6, 0, Math.PI * 2)); return; }
  P(ctx, '#b8955a', 3 * s, () => ctx.arc(x, y, 32 * s, 0, Math.PI * 2));
}
// Bát cơm để phần, đáy (x, y). earth: 0 trắng nguyên, 1 một thìa đất, 2 nửa bát đất.
export function batPhan(k, x, y, s = 1, earth = 0) {
  const { ctx } = k; bowl(k, x, y, s, { full: true });
  if (earth <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (earth === 1) P(ctx, '#3f2f22', 2, () => ctx.ellipse(10, -48, 20, 11, 0.1, 0, Math.PI * 2));
  else P(ctx, '#3f2f22', 2.5, () => { ctx.moveTo(-44, -36); ctx.quadraticCurveTo(-26, -64, 4, -60); ctx.quadraticCurveTo(14, -44, 8, -32); ctx.closePath(); });
  ctx.restore();
}
// Cái nơ đỏ đã bạc, tâm (x, y).
export function no(k, x, y, s = 1, c = '#b0564e') {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const d of [-1, 1]) P(ctx, c, 2.5, () => { ctx.moveTo(0, 0); ctx.quadraticCurveTo(d * 26, -30, d * 52, -18); ctx.quadraticCurveTo(d * 44, 0, d * 52, 18); ctx.quadraticCurveTo(d * 26, 30, 0, 0); ctx.closePath(); });
  P(ctx, vary(c, -0.2), 2.5, () => ctx.arc(0, 0, 10, 0, Math.PI * 2)); ctx.restore();
}
// Cái cuốc, đầu lưỡi tại (x, y), r = góc xoay cán.
export function cuoc(k, x, y, s = 1, r = -0.5) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s);
  ctx.strokeStyle = LINE; ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -300); ctx.stroke(); ctx.strokeStyle = '#a07a46'; ctx.lineWidth = 10; ctx.stroke();
  P(ctx, '#6e7276', 3, () => { ctx.moveTo(-14, -16); ctx.lineTo(62, -22); ctx.lineTo(74, 44); ctx.lineTo(16, 34); ctx.closePath(); }); ctx.restore();
}
// Đuốc cầm tay: đầu đuốc tại (x, y).
export function duoc(k, x, y, s = 1) {
  const { ctx } = k, t = T(k), f = 1 + Math.sin(t * 12 + x) * 0.14;
  ctx.strokeStyle = '#5a452e'; ctx.lineWidth = 8 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 8 * s, y + 90 * s); ctx.stroke();
  P(ctx, '#e8742e', 0, () => { ctx.moveTo(x - 20 * s, y); ctx.quadraticCurveTo(x - 22 * s, y - 34 * s * f, x, y - 62 * s * f); ctx.quadraticCurveTo(x + 22 * s, y - 34 * s * f, x + 20 * s, y); ctx.closePath(); });
  P(ctx, '#ffd98a', 0, () => { ctx.moveTo(x - 9 * s, y); ctx.quadraticCurveTo(x - 10 * s, y - 18 * s, x, y - 32 * s * f); ctx.quadraticCurveTo(x + 10 * s, y - 18 * s, x + 9 * s, y); ctx.closePath(); });
}
// Sọt nhãn, đáy (x, y).
export function sot(k, x, y, s = 1) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 14; i++) P(ctx, '#b8955a', 1.8, () => ctx.arc(-54 + (i % 7) * 18 + (i > 6 ? 8 : 0), -92 - (i > 6 ? 14 : 0), 13, 0, Math.PI * 2));
  P(ctx, '#a07a46', 3, () => { ctx.moveTo(-64, -88); ctx.lineTo(64, -88); ctx.lineTo(48, 0); ctx.lineTo(-48, 0); ctx.closePath(); });
  ctx.strokeStyle = '#7c5c30'; ctx.lineWidth = 2.5; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-64 + i * 21, -88); ctx.lineTo(-48 + i * 16, 0); ctx.stroke(); } for (let j = 1; j < 4; j++) { ctx.beginPath(); ctx.moveTo(-64 + j * 4, -88 + j * 22); ctx.lineTo(64 - j * 4, -88 + j * 22); ctx.stroke(); }
  ctx.restore();
}
// Mưa to, gió tạt.
export function muaTo(k, a = 1) {
  const { ctx, W, H } = k, t = T(k); ctx.save(); ctx.strokeStyle = `rgba(206,218,230,${0.42 * a})`; ctx.lineWidth = 2.4;
  for (let i = 0; i < 190; i++) { const x = ((R(k, i + 800) * (W + 400) - t * 420) % (W + 400) + W + 400) % (W + 400) - 100, y = (R(k, i + 1000) * (H + 120) + t * 900) % (H + 120) - 60; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 15, y + 46); ctx.stroke(); }
  ctx.restore();
}

// ---------- cây nhãn sau vườn ----------
// o.time, o.fruit (chùm quả), o.dig 0..1 (hố đào trước gốc), o.rom (đống rơm), o.lit (đèn quanh hố).
export const NHAN = { x: 980, y: 880, rom: 1600, tre: 230 };
export function vuonNhan(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'day', dk = DK[time], t = T(k), x = NHAN.x, y = NHAN.y;
  sky(k, time, 800);
  for (const bx of [NHAN.tre - 130, NHAN.tre, NHAN.tre + 120, 1830]) bamboo(k, bx, 700, 520, dk);
  for (let px = -40; px < W + 40; px += 36) P(ctx, vary('#8c7548', dk), 2, () => ctx.roundRect(px, 590 + (px % 3) * 8, 22, 170, 6));
  ctx.fillStyle = vary('#6d572f', dk); ctx.fillRect(-100, 640, W + 200, 10); ctx.fillRect(-100, 716, W + 200, 10);
  P(ctx, vary('#7c8548', dk), 3, () => { ctx.moveTo(-100, 760); ctx.quadraticCurveTo(900, 736, W + 100, 762); ctx.lineTo(W + 100, H + 100); ctx.lineTo(-100, H + 100); ctx.closePath(); });
  for (let i = 0; i < 44; i++) { const px = R(k, i + 300) * W, py = 790 + R(k, i + 301) * 280; ctx.strokeStyle = vary('#5c6a33', dk); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 7, py - 17); ctx.moveTo(px, py); ctx.lineTo(px + 7, py - 17); ctx.stroke(); }
  // đống rơm
  if (o.rom !== false) { const r = NHAN.rom; P(ctx, vary('#c8a860', dk), 3.5, () => { ctx.moveTo(r - 190, 900); ctx.bezierCurveTo(r - 170, 620, r + 170, 620, r + 190, 900); ctx.closePath(); }); ctx.strokeStyle = vary('#a08644', dk); ctx.lineWidth = 3; for (let i = 0; i < 26; i++) { const a = R(k, i + 340), px = r - 150 + a * 300, py = 690 + R(k, i + 341) * 190; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 26, py + 8); ctx.stroke(); } P(ctx, vary('#7c6a3a', dk), 3, () => { ctx.moveTo(r - 14, 640); ctx.lineTo(r + 14, 640); ctx.lineTo(r + 6, 560); ctx.lineTo(r - 6, 560); ctx.closePath(); }); }
  // thân nhãn, gốc loe
  const c = vary('#5e4a3a', dk);
  P(ctx, c, 3.5, () => { ctx.moveTo(x - 190, y + 22); ctx.bezierCurveTo(x - 96, y - 30, x - 96, y - 240, x - 104, y - 470); ctx.lineTo(x + 104, y - 470); ctx.bezierCurveTo(x + 96, y - 240, x + 96, y - 30, x + 200, y + 22); ctx.quadraticCurveTo(x, y - 6, x - 190, y + 22); ctx.closePath(); });
  ctx.strokeStyle = vary('#463628', dk); ctx.lineWidth = 5; for (const d of [-56, -16, 26, 62]) { ctx.beginPath(); ctx.moveTo(x + d, y - 440); ctx.bezierCurveTo(x + d * 1.2, y - 280, x + d * 0.8, y - 130, x + d * 1.5, y - 6); ctx.stroke(); }
  for (const [dx, dy] of [[-330, -610], [320, -630], [-160, -690], [170, -700]]) { ctx.strokeStyle = LINE; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y - 440); ctx.quadraticCurveTo(x + dx * 0.5, y + dy * 0.82, x + dx, y + dy); ctx.stroke(); ctx.strokeStyle = c; ctx.lineWidth = 27; ctx.stroke(); }
  // tán
  for (let i = 0; i < 26; i++) { const a = i / 25, row = i % 3; P(ctx, vary(row === 0 ? '#3c5a32' : row === 1 ? '#47683a' : '#517444', dk), 0, () => ctx.ellipse(x - 800 + a * 1600 + Math.sin(t * 0.5 + i) * 4, 40 + row * 72 + R(k, i + 360) * 40, 210, 118, 0, 0, Math.PI * 2)); }
  if (o.fruit !== false) for (let i = 0; i < 13; i++) chumNhan(k, x - 640 + i * 108, 200 + (i % 3) * 38 + R(k, i + 390) * 24, 0.95, dk);
  // hố đào trước gốc
  const dig = o.dig ?? 0;
  if (dig > 0) {
    for (const d of [-1, 1]) P(ctx, vary('#6a5238', dk), 3.5, () => { ctx.moveTo(x + d * (160 + dig * 150), 1010); ctx.quadraticCurveTo(x + d * (300 + dig * 200), 860 - dig * 70, x + d * (470 + dig * 190), 1010); ctx.closePath(); });
    P(ctx, '#0b0705', 4, () => ctx.ellipse(x, 985, 130 + dig * 170, 34 + dig * 44, 0, 0, Math.PI * 2));
    ctx.strokeStyle = vary('#6a5442', dk); ctx.lineWidth = 15; ctx.lineCap = 'round'; for (const d of [-110, 60, 130]) { ctx.beginPath(); ctx.moveTo(x + d * 0.5, 915); ctx.quadraticCurveTo(x + d, 955, x + d * 1.3, 1000); ctx.stroke(); }
  }
}

// ---------- ngõ xóm ----------
export function ngoXom(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'dusk', dk = DK[time];
  sky(k, time, 700);
  P(ctx, vary('#7c8548', dk), 0, () => ctx.rect(-100, 640, W + 200, 220));
  for (const x of [1320, 1560, 1820]) bamboo(k, x, 680, 440, dk);
  // tường gạch + cổng
  P(ctx, vary('#a87a5c', dk), 3.5, () => ctx.rect(-100, 400, 1100, 430)); ctx.strokeStyle = vary('#8a6248', dk); ctx.lineWidth = 2; for (let y = 430; y < 830; y += 30) { ctx.beginPath(); ctx.moveTo(-100, y); ctx.lineTo(1000, y); ctx.stroke(); for (let x = -100 + (Math.floor(y / 30) % 2) * 34; x < 1000; x += 68) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 30); ctx.stroke(); } }
  P(ctx, vary('#7c4c3a', dk), 3.5, () => { ctx.moveTo(-140, 410); ctx.lineTo(-60, 330); ctx.lineTo(1000, 330); ctx.lineTo(1050, 410); ctx.closePath(); });
  P(ctx, vary('#3f2c1e', dk), 3, () => ctx.rect(380, 500, 220, 330));
  // cột điện
  ctx.strokeStyle = vary('#6a6a66', dk); ctx.lineWidth = 15; ctx.beginPath(); ctx.moveTo(1180, 830); ctx.lineTo(1180, 200); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-100, 240); ctx.quadraticCurveTo(600, 300, 1180, 220); ctx.quadraticCurveTo(1540, 180, W + 100, 250); ctx.stroke();
  // mặt ngõ
  P(ctx, vary('#a08a68', dk), 3, () => ctx.rect(-100, 830, W + 200, H));
  ctx.strokeStyle = vary('#856f50', dk); ctx.lineWidth = 3; for (let i = 0; i < 22; i++) { const x = R(k, i + 240) * W, y = 860 + R(k, i + 241) * 200; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 50, y); ctx.stroke(); }
}

// ---------- sân kho, đội chiếu bóng lưu động 1979 ----------
export function sanKho(k, o = {}) {
  const { ctx, W, H } = k, t = T(k), flick = 0.85 + Math.sin(t * 19) * 0.08 + Math.sin(t * 31) * 0.07;
  sky(k, 'night', 700);
  P(ctx, '#2c2a2c', 3, () => ctx.rect(-100, 430, 520, 330)); P(ctx, '#3a2c28', 3, () => { ctx.moveTo(-150, 440); ctx.lineTo(120, 300); ctx.lineTo(460, 440); ctx.closePath(); });
  P(ctx, '#2c2a2c', 3, () => ctx.rect(1520, 430, 520, 330)); P(ctx, '#3a2c28', 3, () => { ctx.moveTo(1470, 440); ctx.lineTo(1780, 300); ctx.lineTo(2080, 440); ctx.closePath(); });
  for (const x of [470, 1450]) { ctx.strokeStyle = '#46382a'; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(x, 800); ctx.lineTo(x, 130); ctx.stroke(); }
  P(ctx, `rgba(232,232,222,${flick})`, 4, () => ctx.rect(480, 150, 960, 520));
  ctx.save(); ctx.beginPath(); ctx.rect(480, 150, 960, 520); ctx.clip(); ctx.fillStyle = `rgba(80,80,78,${0.5 * flick})`; ctx.fillRect(480, 520, 960, 150);
  for (let i = 0; i < 3; i++) { const x = 640 + i * 310 + Math.sin(t * 0.6 + i) * 40; P(ctx, `rgba(50,50,50,${0.75 * flick})`, 0, () => { ctx.ellipse(x, 400, 34, 36, 0, 0, Math.PI * 2); ctx.roundRect(x - 44, 440, 88, 200, 24); }); }
  for (let i = 0; i < 7; i++) { ctx.fillStyle = 'rgba(30,30,30,0.28)'; ctx.fillRect(480 + ((R(k, i + Math.floor(t * 12)) * 960) | 0), 150, 2, 520); }
  ctx.restore();
  // chùm sáng máy chiếu
  ctx.save(); const g = ctx.createLinearGradient(960, 1000, 960, 300); g.addColorStop(0, 'rgba(240,236,214,0.32)'); g.addColorStop(1, 'rgba(240,236,214,0.03)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(930, 1000); ctx.lineTo(500, 240); ctx.lineTo(1420, 240); ctx.lineTo(990, 1000); ctx.closePath(); ctx.fill(); ctx.restore();
  P(ctx, '#3c3a30', 3, () => ctx.rect(-100, 780, W + 200, H));
  // đầu người xem
  for (let r = 0; r < 3; r++) for (let i = 0; i < 16; i++) { const x = -40 + i * 134 + (r % 2) * 66, y = 850 + r * 74; P(ctx, ['#1c1a18', '#141210', '#201c18'][r], 0, () => { ctx.arc(x, y, 40 + r * 4, 0, Math.PI * 2); ctx.roundRect(x - 58 - r * 4, y + 26, 116 + r * 8, 150, 26); }); }
}

// ---------- cửa hầm chữ A sau vườn (1979) ----------
// o.fall 0..1: nóc sụt, tre đổ đè. o.time.
export const HAM = { x: 960, y: 860 };
export function hamA(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'dusk', dk = DK[time], x = HAM.x, y = HAM.y, f = o.fall ?? 0;
  sky(k, time, 800);
  for (const bx of [240, 540, 1410, 1720]) bamboo(k, bx, 720, 560, dk);
  P(ctx, vary('#7c8548', dk), 3, () => { ctx.moveTo(-100, 740); ctx.quadraticCurveTo(900, 716, W + 100, 744); ctx.lineTo(W + 100, H + 100); ctx.lineTo(-100, H + 100); ctx.closePath(); });
  const top = y - 330 + f * 250;
  P(ctx, vary('#7a6448', dk), 3.5, () => { ctx.moveTo(x - 400 - f * 50, y + 30); ctx.bezierCurveTo(x - 330, top - 70, x + 330, top - 70, x + 400 + f * 50, y + 30); ctx.closePath(); });
  for (let i = 0; i < 15; i++) { const a = R(k, i + 840), px = x - 310 + a * 620, py = y - 12 - (1 - Math.pow(Math.abs(a - 0.5) * 2, 2)) * (250 - f * 190) * R(k, i + 841); P(ctx, vary(i % 2 ? '#6f8240' : '#5f7338', dk), 0, () => ctx.ellipse(px, py, 62, 26, 0, 0, Math.PI * 2)); }
  ctx.strokeStyle = vary('#6a7a3c', dk); ctx.lineWidth = 3; for (let i = 0; i < 34; i++) { const a = R(k, i + 860), px = x - 300 + a * 600, py = y + 10 - (1 - Math.abs(a - 0.5) * 2) * (300 - f * 230) * R(k, i + 861); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 7, py - 20); ctx.moveTo(px, py); ctx.lineTo(px + 8, py - 18); ctx.stroke(); }
  if (f < 0.55) { const a = 1 - f / 0.55; ctx.globalAlpha = a; P(ctx, '#0b0805', 3.5, () => { ctx.moveTo(x - 92, y + 18); ctx.lineTo(x, y - 170); ctx.lineTo(x + 92, y + 18); ctx.closePath(); }); ctx.strokeStyle = vary('#5e4630', dk); ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 104, y + 22); ctx.lineTo(x, y - 186); ctx.lineTo(x + 104, y + 22); ctx.stroke(); ctx.globalAlpha = 1; }
  if (f > 0.4) { const a = Math.min(1, (f - 0.4) / 0.4); ctx.save(); ctx.translate(x + 380, y + 10); ctx.rotate(-0.16 - (1 - a) * 1.1); ctx.strokeStyle = vary('#6a8a3a', dk); ctx.lineWidth = 12; ctx.lineCap = 'round'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(0, i * 8); ctx.quadraticCurveTo(-400, -30 + i * 8, -840, -12 + i * 16); ctx.stroke(); } ctx.restore(); }
}

// ---------- trong lòng hầm: đất, xà gãy, rễ nhãn, ánh đèn rọi từ trên ----------
export function hamTrong(k, o = {}) {
  const { ctx, W, H } = k, t = T(k);
  ctx.fillStyle = '#2a1f16'; ctx.fillRect(-100, -100, W + 200, H + 200);
  for (let i = 0; i < 46; i++) P(ctx, i % 2 ? '#33261b' : '#241a12', 0, () => ctx.ellipse(R(k, i + 900) * W, R(k, i + 901) * H, 60 + R(k, i + 902) * 110, 22 + R(k, i + 903) * 30, R(k, i + 904), 0, Math.PI * 2));
  P(ctx, '#3a2c20', 3.5, () => { ctx.moveTo(-100, 850); ctx.quadraticCurveTo(900, 820, W + 100, 856); ctx.lineTo(W + 100, H + 100); ctx.lineTo(-100, H + 100); ctx.closePath(); });
  for (const [a, b, c2, d] of [[-60, 150, 700, 470], [1960, 120, 1240, 500], [420, -40, 610, 860], [1520, -40, 1330, 860]]) { ctx.lineCap = 'butt'; ctx.strokeStyle = '#150e09'; ctx.lineWidth = 46; ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c2, d); ctx.stroke(); ctx.strokeStyle = '#5a4430'; ctx.lineWidth = 38; ctx.stroke(); }
  ctx.strokeStyle = '#6a5442'; ctx.lineCap = 'round'; for (let i = 0; i < 12; i++) { const x = 200 + i * 140 + R(k, i + 930) * 60, l = 160 + R(k, i + 931) * 240; ctx.lineWidth = 5 + R(k, i + 932) * 11; ctx.beginPath(); ctx.moveTo(x, -20); ctx.quadraticCurveTo(x + Math.sin(i) * 50, l * 0.5, x + Math.cos(i) * 34, l); ctx.stroke(); }
  if (o.beam !== false) { ctx.save(); const g = ctx.createLinearGradient(960, -40, 960, 860); g.addColorStop(0, 'rgba(255,236,190,0.62)'); g.addColorStop(1, 'rgba(255,236,190,0.05)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(870 + Math.sin(t) * 12, -40); ctx.lineTo(1050 + Math.sin(t) * 12, -40); ctx.lineTo(1400, 880); ctx.lineTo(520, 880); ctx.closePath(); ctx.fill(); ctx.restore(); }
}

// ---------- vách bếp treo mâm đồng ----------
export function bepVach(k, o = {}) {
  const { ctx, W, H } = k; ctx.fillStyle = '#6e563e'; ctx.fillRect(-100, -100, W + 200, H + 200);
  ctx.strokeStyle = '#5a4430'; ctx.lineWidth = 4; for (let x = -60; x < W + 60; x += 46) { ctx.beginPath(); ctx.moveTo(x, -100); ctx.lineTo(x + 8, H + 100); ctx.stroke(); }
  for (let i = 0; i < 14; i++) P(ctx, 'rgba(30,20,12,0.28)', 0, () => ctx.ellipse(R(k, i + 960) * W, 80 + R(k, i + 961) * 300, 190, 70, 0, 0, Math.PI * 2));
  ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(960, 150); ctx.lineTo(960, 250); ctx.stroke(); P(ctx, '#2c1f17', 0, () => ctx.arc(960, 148, 11, 0, Math.PI * 2));
  if (o.mam !== false) mamDong(k, 960, 520, 2.45, { dent: 1 });
  else { ctx.globalAlpha = 0.4; P(ctx, '#4e3a28', 0, () => ctx.arc(960, 520, 288, 0, Math.PI * 2)); ctx.globalAlpha = 1; }
}

// ---------- bàn thờ cô Lành ----------
export function banTho(k, o = {}) {
  const { ctx, W, H } = k; ctx.fillStyle = '#4a3a2c'; ctx.fillRect(-100, -100, W + 200, H + 200);
  P(ctx, '#7a2a1e', 3.5, () => ctx.rect(460, 640, 1000, 34)); P(ctx, '#5a1e16', 3.5, () => ctx.rect(490, 674, 940, 500));
  P(ctx, '#a08a5a', 3, () => ctx.rect(880, 560, 160, 80)); for (let i = 0; i < 3; i++) { const x = 930 + i * 30; ctx.strokeStyle = '#8a2a1a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, 560); ctx.lineTo(x, 450); ctx.stroke(); P(ctx, '#ff9a3c', 0, () => ctx.arc(x, 448, 5, 0, Math.PI * 2)); ctx.save(); ctx.globalAlpha = 0.28; ctx.strokeStyle = '#ddd'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 442); for (let j = 1; j < 10; j++) ctx.lineTo(x + Math.sin(T(k) + j * 0.6 + i) * j * 3.6, 442 - j * 26); ctx.stroke(); ctx.restore(); }
  mamDong(k, 620, 520, 1, { dent: 1 }); no(k, 1300, 610, 1.1); for (const d of [0, 74]) P(ctx, '#b0403a', 2.5, () => ctx.roundRect(1190 + d, 596, 56, 40, 12));
}
export { sepia };
