// Bộ cảnh "làng chài ven sông" cho Nhân Gian Chưa Kể (tập Ma Da, 101). Dùng cùng channel/nhan-gian.js (shade, cold, quote, tag…).
// Quy ước như nhan-gian.js: phông → nhân vật → shade() → chữ.
import { INK, PAPER, AMBER } from '/channel/nhan-gian.js';

function B(ctx, fill, path, lw = 4, stroke = INK) {
  ctx.beginPath(); path(); ctx.fillStyle = fill; ctx.fill();
  if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.stroke(); }
}
const T = (k) => k.gt ?? 0;
const nob = { blush: false, shadow: false, plain: true };

// ---------- nhân vật ----------
export const THANG = { ...nob, body: 'kid', outfit: 'tunic', color: '#5a6f4a', hair: 'short', hairColor: '#1d1712', skin: '#d9a97e' };
export const BO = { ...nob, body: 'man', outfit: 'tunic', color: '#3d5566', hair: 'short', hairColor: '#1d1712', stubble: true, skin: '#c99868' };
export const ME = { ...nob, body: 'woman', outfit: 'dress', color: '#6a4f5a', hair: 'bun', hairColor: '#1d1712', skin: '#d9ad86' };
export const ONG = { ...nob, body: 'man', outfit: 'tunic', color: '#5a5040', hair: 'bald', beard: 'long', beardColor: '#d8d2c6', skin: '#c99a72' };
export const NA = { ...nob, body: 'kid', outfit: 'dress', color: '#b86a6a', hair: 'bun', hairColor: '#1d1712', skin: '#e6bf9a' };
export const TEO = { ...nob, body: 'kid', outfit: 'tunic', color: '#8a6a3a', hair: 'buzz', hairColor: '#1d1712', skin: '#d4a57c' };
export const CUU = { ...nob, body: 'man', outfit: 'tunic', color: '#4a4a3a', hair: 'short', hairColor: '#8a847a', stubble: true, hat: 'non', hatColor: '#c9b47a', skin: '#b98a62' };
export const HIEN = { ...nob, body: 'woman', outfit: 'dress', color: '#d8d2c4', hair: 'long', hairColor: '#7a756c', skin: '#cfb39a' };
export const THONG = { ...nob, body: 'man', outfit: 'robe', color: '#1f1f26', hair: 'short', hat: 'khan', hatColor: '#1a1a1a', skin: '#c99a72' };
export const LUA = { ...nob, body: 'woman', outfit: 'dress', color: '#8aa0b8', hair: 'long', hairColor: '#1d1712', skin: '#e6c4a2' };
export const CA = { ...nob, body: 'man', outfit: 'tunic', color: '#4a5a3a', hair: 'short', skin: '#c99868' }; // bác Cả
export const DAN = (c, extra = {}) => ({ ...nob, body: extra.body ?? 'man', outfit: 'tunic', color: c, hair: 'short', ...extra });

// ---------- trời, sông ----------
const SKY = { day: ['#9cc4d8', '#e8dcc0'], dusk: ['#3d3a5a', '#d08a5a'], night: ['#070b18', '#1c2640'], dawn: ['#4a5a7a', '#d8b8a0'] };
export const MOON = { x: 1560, y: 150 };
function sky(k, time, horizon) {
  const { ctx, W } = k, c = SKY[time];
  const g = ctx.createLinearGradient(0, 0, 0, horizon); g.addColorStop(0, c[0]); g.addColorStop(1, c[1]);
  ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, horizon + 200);
  if (time === 'night') {
    for (let i = 0; i < 40; i++) k.dot(k.rand(i) * W, k.rand(i + 50) * horizon * 0.8, 1.5 + k.rand(i + 9) * 2, '#fff7d6', 0.3 + 0.4 * Math.sin(T(k) * 2 + i));
    B(ctx, '#f3ecd2', () => ctx.arc(MOON.x, MOON.y, 62, 0, Math.PI * 2), 0);
  }
}
// Mặt sông từ y xuống đáy khung; phản chiếu trăng khi đêm.
export function river(k, y, time = 'night', o = {}) {
  const { ctx, W, H } = k, t = T(k);
  const col = { day: ['#5f8a8a', '#2f4a4a'], dusk: ['#4a4a5a', '#1f1f2a'], night: ['#121a2c', '#05080f'], dawn: ['#4a5a6a', '#1f2a36'] }[time];
  const g = ctx.createLinearGradient(0, y, 0, H); g.addColorStop(0, col[0]); g.addColorStop(1, col[1]);
  ctx.fillStyle = g; ctx.fillRect(-200, y, W + 400, H - y + 200);
  ctx.strokeStyle = time === 'night' ? 'rgba(200,215,240,0.12)' : 'rgba(255,255,255,0.18)'; ctx.lineWidth = 2;
  for (let i = 0; i < 14; i++) { const yy = y + 20 + i * 26 + (i * i) * 0.6, xx = ((k.rand(i) * W + t * 20 * (1 + k.rand(i + 3))) % (W + 200)) - 100; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + 60 + i * 6, yy); ctx.stroke(); }
  if (time === 'night' && o.moon !== false) for (let i = 0; i < 9; i++) { ctx.fillStyle = `rgba(243,236,210,${0.35 - i * 0.03})`; ctx.fillRect(MOON.x - 60 + Math.sin(t * 2 + i) * 14 - i * 2, y + 14 + i * 22, 120 + i * 4 - i * 9, 4); }
}
// Bờ bên kia: dải tre mờ trên đường chân trời.
function farBank(k, y, dark) {
  const { ctx, W } = k;
  ctx.fillStyle = dark ? '#0d1410' : '#4f6a48';
  ctx.beginPath(); ctx.moveTo(-200, y + 10);
  for (let x = -200; x <= W + 200; x += 30) ctx.lineTo(x, y - 30 - 30 * Math.abs(Math.sin(x * 0.013)) - 20 * k.rand(Math.floor(x / 30) + 400));
  ctx.lineTo(W + 200, y + 10); ctx.closePath(); ctx.fill();
}
// Cảnh sông rộng: bờ cát gần (dưới trái), sông, bờ xa. o.time; o.sand (true = có bãi cát gần).
export const SHORE = { y: 880 }; // mặt cát bãi gần
export function riverWide(k, o = {}) {
  const { ctx, W } = k, time = o.time ?? 'night', dk = time === 'night';
  sky(k, time, 520);
  farBank(k, 520, dk);
  river(k, 520, time);
  if (o.sand !== false) B(ctx, dk ? '#2a2620' : '#c9b48a', () => { ctx.moveTo(-200, 1300); ctx.lineTo(-200, 820); ctx.quadraticCurveTo(500, 800, 900, 880); ctx.quadraticCurveTo(1300, 960, W + 200, 1000); ctx.lineTo(W + 200, 1300); ctx.closePath(); }, 0);
}
// Hàng người cầm đuốc trên bờ (bóng đen). Trả về danh sách nguồn sáng.
export function torchCrowd(k, x0, x1, y, n = 12, o = {}) {
  const { ctx } = k, t = T(k), lights = [];
  for (let i = 0; i < n; i++) {
    const x = x0 + (x1 - x0) * (i / Math.max(1, n - 1)) + (k.rand(i + 700) - 0.5) * 30, h = (o.h ?? 300) * (0.85 + 0.25 * k.rand(i + 710)), yy = y + (k.rand(i + 720) - 0.5) * 20;
    ctx.fillStyle = '#07080b';
    ctx.beginPath(); ctx.arc(x, yy - h * 0.86, h * 0.09, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x - h * 0.13, yy); ctx.lineTo(x - h * 0.15, yy - h * 0.72); ctx.quadraticCurveTo(x, yy - h * 0.8, x + h * 0.15, yy - h * 0.72); ctx.lineTo(x + h * 0.13, yy); ctx.closePath(); ctx.fill();
    if (i % 2 === 0) {
      const tx = x + h * 0.18, ty = yy - h * 0.95;
      ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + h * 0.12, yy - h * 0.55); ctx.lineTo(tx, ty); ctx.stroke();
      const f = 1 + 0.15 * Math.sin(t * 11 + i);
      ctx.fillStyle = '#ff9a2a'; ctx.beginPath(); ctx.moveTo(tx - 12, ty); ctx.quadraticCurveTo(tx, ty - 46 * f, tx + 12, ty); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#ffe6a0'; ctx.beginPath(); ctx.moveTo(tx - 5, ty); ctx.quadraticCurveTo(tx, ty - 22 * f, tx + 5, ty); ctx.closePath(); ctx.fill();
      lights.push({ x: tx, y: ty - 20, r: o.r ?? 220, flicker: 1, warm: 0.7 });
    }
  }
  return lights;
}
// Người lội dưới sông (chỉ thấy phần trên mặt nước): (x, mặt nước y), cao h, chìm sink 0..1.
export function wader(k, x, y, h, char, sink = 0.4) {
  const { ctx } = k;
  ctx.save(); ctx.beginPath(); ctx.rect(x - h, y - h * 2, h * 2, h * 2); ctx.clip();
  k.char(x, y + h * sink, h, char);
  ctx.restore();
  ctx.strokeStyle = 'rgba(220,230,245,0.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, h * 0.22, h * 0.04, 0, 0, Math.PI * 2); ctx.stroke();
}

// ---------- làng ----------
// Nhà sàn chân cột trên nước: sàn ở y, tâm x, rộng w. o.lit = cửa sáng đèn.
export function stilt(k, x, y, w = 520, o = {}) {
  const { ctx } = k, dk = o.dark;
  for (let i = 0; i < 5; i++) B(ctx, dk ? '#2a1f16' : '#6b4a2e', () => ctx.rect(x - w / 2 + 20 + i * (w - 40) / 4 - 7, y, 14, 300), 3);
  B(ctx, dk ? '#3a2c20' : '#8a6a46', () => ctx.rect(x - w / 2, y - 16, w, 20), 3);
  B(ctx, dk ? '#33281d' : '#a07e56', () => ctx.rect(x - w / 2 + 30, y - 210, w - 60, 196), 3);
  B(ctx, o.lit ? '#ffb85a' : (dk ? '#120d08' : '#3a2a1c'), () => ctx.rect(x - 50, y - 160, 100, 146), 3);
  B(ctx, dk ? '#2c2416' : '#b8955a', () => { ctx.moveTo(x - w / 2 - 50, y - 200); ctx.lineTo(x - w / 4, y - 330); ctx.lineTo(x + w / 4, y - 330); ctx.lineTo(x + w / 2 + 50, y - 200); ctx.closePath(); });
  return o.lit ? [{ x, y: y - 90, r: 260, warm: 0.8, flicker: 1 }] : [];
}
// Thuyền nan: tâm (x, y mặt nước), s. o.color ('#3f7a6a' xanh = thuyền nhà Sáu), o.flip, o.capsized.
export function boat(k, x, y, s = 1, o = {}) {
  const { ctx } = k, bob = Math.sin(T(k) * 1.6 + x) * 4;
  ctx.save(); ctx.translate(x, y + bob); ctx.scale(s * (o.flip ? -1 : 1), s);
  if (o.capsized) { ctx.rotate(Math.PI); ctx.translate(0, 20); }
  B(ctx, o.color ?? '#7a5a3a', () => { ctx.moveTo(-200, -40); ctx.quadraticCurveTo(-170, 30, 0, 32); ctx.quadraticCurveTo(170, 30, 200, -40); ctx.quadraticCurveTo(100, -10, 0, -10); ctx.quadraticCurveTo(-100, -10, -200, -40); ctx.closePath(); });
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-170, 0); ctx.quadraticCurveTo(0, 22, 170, 0); ctx.stroke();
  ctx.restore();
}
// Mái chèo: (x, y) tâm, dài ~ 360·s, xoay r. o.burnt (vệt cháy hình bàn tay), o.p.
export function paddle(k, x, y, s = 1, r = 0, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.globalAlpha *= o.p ?? 1; ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s);
  B(ctx, '#7a5a36', () => ctx.rect(-170, -8, 230, 16), 3);
  B(ctx, '#3f7a6a', () => { ctx.moveTo(60, -10); ctx.quadraticCurveTo(120, -36, 190, -26); ctx.quadraticCurveTo(200, 0, 190, 26); ctx.quadraticCurveTo(120, 36, 60, 10); ctx.closePath(); });
  // con cá khắc trên cán
  ctx.strokeStyle = '#2a1c10'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(-110, 0, 18, 6, 0, 0, Math.PI * 2); ctx.moveTo(-92, 0); ctx.lineTo(-82, -6); ctx.lineTo(-82, 6); ctx.closePath(); ctx.stroke();
  if (o.burnt) { ctx.fillStyle = 'rgba(20,14,10,0.8)'; ctx.beginPath(); ctx.ellipse(130, 0, 26, 18, 0, 0, Math.PI * 2); ctx.fill(); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(150 + i * 3, -20 + i * 13, 16, 5, 0.3, 0, Math.PI * 2); ctx.fill(); } }
  ctx.restore();
}
// Hình nhân rơm (chân tại x, y), cao h. o.wet, o.blank (giấy bị xoá), o.paddle, o.on = bè.
export function strawman(k, x, y, h = 420, o = {}) {
  const { ctx } = k, s = h / 420;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const straw = o.wet ? '#8a7a4a' : '#c9a85a';
  B(ctx, straw, () => { ctx.moveTo(-30, 0); ctx.lineTo(-20, -150); ctx.lineTo(20, -150); ctx.lineTo(30, 0); ctx.closePath(); }, 3);
  B(ctx, o.wet ? '#3a3022' : '#5a4636', () => ctx.rect(-70, -300, 140, 160), 3); // áo nâu
  B(ctx, straw, () => { ctx.moveTo(-70, -290); ctx.lineTo(-130, -170); ctx.lineTo(-110, -160); ctx.lineTo(-60, -250); ctx.closePath(); }, 3);
  B(ctx, straw, () => { ctx.moveTo(70, -290); ctx.lineTo(130, -170); ctx.lineTo(110, -160); ctx.lineTo(60, -250); ctx.closePath(); }, 3);
  B(ctx, straw, () => ctx.arc(0, -340, 46, 0, Math.PI * 2), 3);
  B(ctx, o.wet ? '#8a7a54' : '#d8c48f', () => { ctx.moveTo(-90, -360); ctx.lineTo(0, -420); ctx.lineTo(90, -360); ctx.closePath(); }, 3); // nón
  B(ctx, o.wet ? '#cfc8b8' : '#f2ead8', () => ctx.rect(-40, -270, 80, 70), 2);
  if (!o.blank) { ctx.fillStyle = '#222'; for (let i = 0; i < 4; i++) ctx.fillRect(-30, -258 + i * 15, 60 - (i % 2) * 18, 4); }
  if (o.wet) { ctx.fillStyle = 'rgba(160,190,220,0.6)'; for (let i = 0; i < 8; i++) { const dy = (T(k) * 120 + i * 40) % 160; ctx.beginPath(); ctx.ellipse(-60 + i * 17, -140 + dy, 3, 6, 0, 0, Math.PI * 2); ctx.fill(); } }
  ctx.restore();
  if (o.paddle) paddle(k, x + 120 * s, y - 200 * s, 0.9 * s, -1.2);
}
// Bè chuối + nến.
export function raft(k, x, y, s = 1, lit = 1) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y + Math.sin(T(k) * 1.5) * 3); ctx.scale(s, s);
  for (let i = 0; i < 4; i++) B(ctx, '#6a7a3a', () => ctx.ellipse(0, -6 + i * 8, 120, 9, 0, 0, Math.PI * 2), 2);
  ctx.restore();
  if (lit) { ctx.fillStyle = '#efe4cc'; ctx.fillRect(x - 70 * s, y - 40 * s, 8 * s, 22 * s); ctx.fillStyle = '#ffb340'; ctx.beginPath(); ctx.ellipse(x - 66 * s, y - 48 * s, 5 * s, 11 * s * (1 + 0.15 * Math.sin(T(k) * 12)), 0, 0, Math.PI * 2); ctx.fill(); }
}
// Búp bê vải.
export function doll(k, x, y, s = 1, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.r ?? 0);
  B(ctx, o.wet ? '#8a5a5a' : '#c86a6a', () => { ctx.moveTo(-26, 0); ctx.lineTo(-18, -60); ctx.lineTo(18, -60); ctx.lineTo(26, 0); ctx.closePath(); }, 3);
  B(ctx, '#efd8bf', () => ctx.arc(0, -78, 20, 0, Math.PI * 2), 3);
  ctx.fillStyle = '#1d1712'; ctx.beginPath(); ctx.arc(-7, -80, 2.5, 0, Math.PI * 2); ctx.arc(7, -80, 2.5, 0, Math.PI * 2); ctx.fill();
  B(ctx, '#2a1c12', () => ctx.arc(0, -90, 18, Math.PI, 0), 0);
  ctx.restore();
}
// Bàn tay nhỏ, nhợt (dưới nước): tâm (x, y), s, xoay r, độ mờ a.
export function paleHand(k, x, y, s = 1, r = 0, a = 0.7) {
  const { ctx } = k;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s);
  ctx.fillStyle = '#d9e4ee';
  ctx.beginPath(); ctx.ellipse(0, 0, 30, 22, 0, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(-18 + i * 12, -30, 5.5, 18, -0.1 + i * 0.07, 0, Math.PI * 2); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(30, -4, 6, 15, 0.9, 0, Math.PI * 2); ctx.fill();
  ctx.fillRect(-14, 10, 28, 60);
  ctx.restore();
}

// ---------- bối cảnh ----------
// Bến cá: sàn gỗ ở y 640 từ trái sang x 1200, cột cắm xuống nước. o.time, o.stilt (nhà sàn bên phải).
export const PIER = { y: 640 };
export function pier(k, o = {}) {
  const { ctx } = k, time = o.time ?? 'night', dk = time === 'night' || time === 'dusk';
  sky(k, time, 480);
  farBank(k, 480, dk);
  river(k, 480, time, { moon: o.moon });
  const lights = [];
  if (o.stilt !== false) lights.push(...stilt(k, 1520, 600, 560, { dark: dk, lit: o.lit }));
  for (let i = 0; i < 9; i++) B(ctx, dk ? '#22180f' : '#5a3d24', () => ctx.rect(40 + i * 135, PIER.y, 16, 440), 3);
  B(ctx, dk ? '#3a2c1e' : '#8a6a42', () => ctx.rect(-200, PIER.y - 20, 1420, 26), 3);
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 2; for (let x = -200; x < 1220; x += 60) { ctx.beginPath(); ctx.moveTo(x, PIER.y - 20); ctx.lineTo(x, PIER.y + 6); ctx.stroke(); }
  if (o.boats !== false) { boat(k, 700, 760, 0.8, { color: '#3f7a6a' }); boat(k, 1150, 800, 0.7, {}); }
  return lights;
}
// Gầm bến: tối, cột gỗ, khe sáng giữa ván phía trên, nước ngang ngực. o.light = đèn pin {x,y}.
export function underPier(k, o = {}) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#05070c'; ctx.fillRect(-200, -200, W + 400, H + 400);
  for (let i = 0; i < 12; i++) { ctx.fillStyle = 'rgba(200,215,240,0.12)'; ctx.fillRect(-200 + i * 190, 0, 10, 120); }
  B(ctx, '#1a140e', () => ctx.rect(-200, 100, W + 400, 30), 0);
  for (let i = 0; i < 6; i++) B(ctx, '#2a2016', () => ctx.rect(150 + i * 320, 120, 40, H), 3);
  river(k, 640, 'night', { moon: false });
}
// Nhà sàn bên trong: sàn tre có khe (thấy nước), cột cái, màn, đèn dầu. o.rope (sợi thừng từ cột ra), o.day.
export const SAN = { y: 880, lamp: { x: 380, y: 560, r: 420, flicker: 1, warm: 0.9 }, door: { x: 1700, y: 520, r: 700 } };
export function sanRoom(k, o = {}) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#3a2c20'; ctx.fillRect(-200, -200, W + 400, SAN.y + 200);
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 3; for (let x = 0; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, -200); ctx.lineTo(x, SAN.y); ctx.stroke(); }
  // cửa ra sông
  B(ctx, o.day ? '#a8c0c8' : '#0d1424', () => ctx.rect(1560, 250, 300, SAN.y - 250), 3);
  if (!o.day) { ctx.fillStyle = 'rgba(243,236,210,0.5)'; ctx.beginPath(); ctx.arc(1760, 330, 30, 0, Math.PI * 2); ctx.fill(); }
  // sàn tre có khe
  ctx.fillStyle = '#6a5034'; ctx.fillRect(-200, SAN.y, W + 400, H);
  for (let x = -200; x < W + 200; x += 46) { ctx.fillStyle = '#05070c'; ctx.fillRect(x, SAN.y, 5, H); }
  // cột cái
  B(ctx, '#4a3320', () => ctx.rect(1100, -200, 46, SAN.y + 200), 3);
  // màn + chiếu
  B(ctx, '#8a7a5a', () => ctx.rect(150, SAN.y - 12, 520, 14), 2);
  ctx.fillStyle = 'rgba(235,235,225,0.18)'; ctx.strokeStyle = 'rgba(235,235,225,0.45)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(150, SAN.y); ctx.lineTo(190, 470); ctx.lineTo(630, 470); ctx.lineTo(670, SAN.y); ctx.closePath(); ctx.fill(); ctx.stroke();
  // đèn dầu trên kệ
  B(ctx, '#3a2a1c', () => ctx.rect(320, 560, 120, 16), 2);
  if (o.rope) { ctx.strokeStyle = o.wetRope ? '#5a5040' : '#a8905a'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(1123, SAN.y - 120); ctx.quadraticCurveTo(o.rope.x - 200, SAN.y + 10, o.rope.x, o.rope.y); ctx.stroke(); }
}
// Sân đình: cột đỏ, mái cong, sân gạch. o.board = vẽ tấm bảng gỗ đen trong góc.
export function dinh(k, o = {}) {
  const { ctx, W, H } = k, dk = o.dark;
  sky(k, o.time ?? 'dusk', 600);
  B(ctx, dk ? '#2a1a14' : '#5a2a1e', () => { ctx.moveTo(100, 330); ctx.quadraticCurveTo(200, 250, 300, 260); ctx.lineTo(1620, 260); ctx.quadraticCurveTo(1720, 250, 1820, 330); ctx.lineTo(1700, 330); ctx.lineTo(220, 330); ctx.closePath(); });
  B(ctx, dk ? '#2a1e16' : '#6a4a32', () => ctx.rect(220, 330, 1480, 400), 3);
  for (let i = 0; i < 6; i++) B(ctx, dk ? '#4a1a14' : '#8a2a1e', () => ctx.rect(260 + i * 270, 330, 34, 400), 3);
  ctx.fillStyle = dk ? '#2a221c' : '#8a6a52'; ctx.fillRect(-200, 730, W + 400, H);
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 2; for (let y = 760; y < H; y += 44) { ctx.beginPath(); ctx.moveTo(-200, y); ctx.lineTo(W + 200, y); ctx.stroke(); }
}
// Tấm bảng gỗ đen tên người sông lấy. rows = [[năm, tên]…]; o.blank = dòng cuối để trống (1992); o.fill = chữ cho dòng cuối.
export function board(k, x, y, s = 1, rows = [], o = {}) {
  const { ctx } = k, w = 760, h = 120 + (rows.length + 1) * 64;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  B(ctx, '#15130f', () => ctx.rect(-w / 2, -h / 2, w, h), 6, '#5a4a32');
  ctx.restore();
  k.group({ x, y, s }, () => {
    k.text('NGƯỜI SÔNG ĐÃ LẤY', 0, -h / 2 + 56, { size: 40, font: 'title', color: '#d8d2c4' });
    rows.forEach(([yr, name], i) => k.text(`${yr}   ${name}`, -w / 2 + 70, -h / 2 + 130 + i * 64, { size: 36, align: 'left', color: '#cfc8b8', p: o.p ?? 1 }));
    const yy = -h / 2 + 130 + rows.length * 64;
    k.text('1992', -w / 2 + 70, yy, { size: 36, align: 'left', color: AMBER });
    if (o.fill) k.text(o.fill, -w / 2 + 210, yy, { size: 36, align: 'left', color: '#efe4cc', fx: 'write', p: o.fillP ?? 1 });
    else { ctx.fillStyle = '#e8e2d4'; ctx.fillRect(-w / 2 + 210, yy + 6, 300, 5); }
  });
}
// Chợ cá ven bến (ban ngày): mái tôn, thúng cá, người.
export function market(k, o = {}) {
  const { ctx, W, H } = k;
  sky(k, 'day', 500); farBank(k, 500, false); river(k, 500, 'day');
  ctx.fillStyle = '#9a8a6a'; ctx.fillRect(-200, 700, W + 400, H);
  B(ctx, '#7a8a8a', () => { ctx.moveTo(-200, 260); ctx.lineTo(W + 200, 300); ctx.lineTo(W + 200, 340); ctx.lineTo(-200, 300); ctx.closePath(); });
  for (let i = 0; i < 6; i++) B(ctx, '#4a3a2a', () => ctx.rect(100 + i * 340, 300, 16, 420), 3);
  const thung = (x, empty) => { B(ctx, '#a8894f', () => ctx.ellipse(x, 840, 110, 34, 0, 0, Math.PI * 2), 3); if (!empty) for (let j = 0; j < 5; j++) B(ctx, '#9aa8b0', () => ctx.ellipse(x - 60 + j * 30, 830, 22, 9, 0.3, 0, Math.PI * 2), 2); };
  thung(300, false); thung(760, false); thung(o.emptyX ?? 1300, !!o.empty);
}
// Đồi đất đỏ + nhà bác Cả + vũng trâu đằm. o.time ('night' + mưa), o.rain.
export const HILL = { pool: { x: 1100, y: 930 } };
export function hill(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'night', dk = time !== 'day';
  sky(k, time === 'night' ? 'night' : time, 600);
  ctx.fillStyle = dk ? '#3a1e16' : '#b5643a'; ctx.beginPath(); ctx.moveTo(-200, 1300); ctx.lineTo(-200, 640); ctx.quadraticCurveTo(700, 480, W + 200, 700); ctx.lineTo(W + 200, 1300); ctx.closePath(); ctx.fill();
  B(ctx, dk ? '#2a2018' : '#8a6a46', () => ctx.rect(250, 470, 380, 220), 3);
  B(ctx, dk ? '#2a2216' : '#b8955a', () => { ctx.moveTo(200, 480); ctx.lineTo(330, 380); ctx.lineTo(560, 380); ctx.lineTo(680, 480); ctx.closePath(); });
  B(ctx, dk ? '#1a2230' : '#6a7a7a', () => ctx.ellipse(HILL.pool.x, HILL.pool.y, 260, 60, 0, 0, Math.PI * 2), 3);
  ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.beginPath(); ctx.ellipse(HILL.pool.x - 60, HILL.pool.y - 12, 120, 14, 0, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 8; i++) B(ctx, dk ? '#2a1a12' : '#7a4a2a', () => ctx.ellipse(HILL.pool.x - 240 + i * 70, HILL.pool.y + 70 + (i % 2) * 14, 16, 10, 0, 0, Math.PI * 2), 0);
  if (o.rain) k.rain(0, 0, W, H);
}
// Lều ông Cửu trên bãi bồi: lều tranh, lưới, chai rượu, đèn bão.
export const HUT = { lamp: { x: 960, y: 520, r: 560, flicker: 1, warm: 1 } };
export function hut(k) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#1a1612'; ctx.fillRect(-200, -200, W + 400, H + 400);
  B(ctx, '#3a2c1c', () => { ctx.moveTo(-200, 260); ctx.lineTo(960, 40); ctx.lineTo(W + 200, 260); ctx.lineTo(W + 200, 320); ctx.lineTo(-200, 320); ctx.closePath(); });
  ctx.strokeStyle = 'rgba(200,190,160,0.35)'; ctx.lineWidth = 2; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.moveTo(1300 + i * 22, 320); ctx.quadraticCurveTo(1400 + i * 18, 600, 1300 + i * 26, 880); ctx.stroke(); } // lưới
  ctx.fillStyle = '#2a2018'; ctx.fillRect(-200, 880, W + 400, H);
  B(ctx, '#3a2a1c', () => ctx.rect(700, 760, 520, 20), 3); // phản
  B(ctx, '#5a6a5a', () => { ctx.moveTo(1080, 760); ctx.lineTo(1080, 680); ctx.lineTo(1094, 660); ctx.lineTo(1108, 680); ctx.lineTo(1108, 760); ctx.closePath(); }, 3); // chai
  B(ctx, '#e8e2d4', () => ctx.ellipse(1020, 752, 18, 8, 0, 0, Math.PI * 2), 2); // chén
  ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(960, 330); ctx.lineTo(960, 470); ctx.stroke();
  B(ctx, 'rgba(255,220,150,0.5)', () => ctx.ellipse(960, 500, 26, 34, 0, 0, Math.PI * 2), 3);
  ctx.fillStyle = '#ffb340'; ctx.beginPath(); ctx.ellipse(960, 502, 7, 14, 0, 0, Math.PI * 2); ctx.fill();
}
// Dưới nước: xanh đen, tia sáng từ trên, bọt khí.
export function underwater(k) {
  const { ctx, W, H } = k, t = T(k);
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1a2c3e'); g.addColorStop(1, '#020408');
  ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400);
  for (let i = 0; i < 5; i++) { ctx.fillStyle = 'rgba(180,200,230,0.06)'; ctx.beginPath(); const x = 300 + i * 350 + Math.sin(t * 0.5 + i) * 40; ctx.moveTo(x - 30, -10); ctx.lineTo(x + 30, -10); ctx.lineTo(x + 160, H); ctx.lineTo(x + 40, H); ctx.closePath(); ctx.fill(); }
  ctx.strokeStyle = 'rgba(210,225,245,0.5)'; ctx.lineWidth = 2;
  for (let i = 0; i < 24; i++) { const x = k.rand(i + 800) * W, y = H - ((t * 90 * (0.5 + k.rand(i + 810)) + k.rand(i + 820) * H) % (H + 100)); ctx.beginPath(); ctx.arc(x + Math.sin(t * 3 + i) * 6, y, 3 + k.rand(i) * 6, 0, Math.PI * 2); ctx.stroke(); }
}
// Thẻ đếm ngược đầu chương (hiện 3 giây đầu cảnh).
export function countdown(k, big, small) {
  const a = k.still ? 0 : Math.min(1, k.t / 0.3) * Math.max(0, Math.min(1, (3 - k.t) / 0.5));
  if (a <= 0) return;
  const { ctx } = k;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a * 0.8; ctx.fillStyle = '#04050a'; ctx.fillRect(0, 0, k.W, k.H); ctx.restore();
  ctx.save(); ctx.globalAlpha = a;
  const sc = 1 + 0.06 * (1 - Math.min(1, k.t / 0.4));
  k.group({ x: k.W / 2, y: 520, s: sc }, () => {
    k.text(big, 0, 0, { size: 150, font: 'title', color: big.startsWith('RẰM') ? '#e05a4a' : AMBER });
    if (small) k.text(small, 0, 120, { size: 60, font: 'title', color: PAPER });
  });
  ctx.restore();
}
