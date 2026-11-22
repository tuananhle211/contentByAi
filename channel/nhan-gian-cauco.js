// Nhân Gian Chưa Kể — tập 6 Cầu Cơ (17/11/2026): bộ cảnh phẳng kiểu ảnh mẫu Khuất Mặt Kỳ Truyện (lớp màu phẳng, viền nâu
// mảnh, núi xếp lớp, tre vẽ nét) + nhân vật búp bê (channel/nhan-gian-doll.js). Quần áo thường nông thôn Bắc Bộ, năm 2009.
import { doll, sepia } from '/channel/nhan-gian-doll.js';
import { vary } from '/channel/nhan-gian-hd.js';

export const LINE = '#2c1f17';
const T = (k) => k.gt ?? 0;
function P(ctx, fill, lw, fn, stroke = LINE) { ctx.beginPath(); fn(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
const R = (k, i) => k.rand(i);

// ---------- nhân vật (búp bê, năm 2009) ----------
const SCHOOL = { top: '#ece6d8', topStyle: 'shirt', sleeve: 'short', pants: '#2e3a4e', shoes: '#4a5a6a' };
export const NAM = { kind: 'man', ...SCHOOL, skin: '#ecc8a4', hair: 'short', hairColor: '#241a12' };
export const QUAN = { kind: 'man', ...SCHOOL, skin: '#d8ac84', hair: 'spiky', hairColor: '#1e1610' };
export const HAI = { kind: 'kid', ...SCHOOL, skin: '#f0d0b0', hair: 'buzz', hairColor: '#241a12' };
export const LINH = { kind: 'woman', ...SCHOOL, topStyle: 'canh', skin: '#f0d2b2', hair: 'long', hairColor: '#1e1610' };
export const TUNG = { kind: 'kid', skin: '#c8946c', hair: 'buzz', hairColor: '#1e1610', top: '#a8b8c0', topStyle: 'tee', sleeve: 'short', pants: '#3a4a5a', roll: true, shoes: '#3a8a9a' };
export const BA_NOI = { kind: 'old', skin: '#d8b498', hair: 'bun', hairColor: '#8a8078', top: '#6a4a34', topStyle: 'baba', pants: '#1e1c1a', shoes: '#4a3a2a', hat: 'moquo' };
export const BA_THOA = { kind: 'woman', skin: '#d4a882', hair: 'bun', hairColor: '#3a3028', top: '#8a7a6a', topStyle: 'canh', print: 'flower', printColor: '#6a5a8a', pants: '#2a2622', shoes: '#5a4a3a', hat: 'non' };
export const ME_QUAN = { kind: 'woman', skin: '#dcb090', hair: 'bun', hairColor: '#2a2018', top: '#a89078', topStyle: 'canh', pants: '#2a2622', noFeet: false };
export const THAY_BINH = { kind: 'man', skin: '#e0bc98', hair: 'short', hairColor: '#2a2018', top: '#c8d0d8', topStyle: 'shirt', pants: '#3a3a3e', shoes: '#2a2a2a' };
export const ONG_KHIEM = { kind: 'old', skin: '#c89c7c', hair: 'bald', hairColor: '#9a9088', top: '#2a2a32', topStyle: 'baba', pants: '#2a2a32', shoes: '#3a3028', hat: 'khan', hatColor: '#2a2a3a' };
export const ch = (k, x, y, h, o) => doll(k, x, y, h, o);
// Nằm ngửa trên giường (búp bê xoay ngang, đầu bên trái).
export const lie = (k, x, y, h, o) => k.group({ x, y, r: -Math.PI / 2 }, () => doll(k, 0, 0, h, { ...o, shadow: false, arms: 'down' }));

// ---------- đồ vật ----------
// Ngọn nến: lean = ngả (−1..1), p = 0 tắt.
export function candle(k, x, y, s = 1, o = {}) {
  const { ctx } = k, t = T(k), lean = o.lean ?? 0, on = o.on ?? 1;
  P(ctx, '#ece4d0', 2, () => ctx.roundRect(x - 9 * s, y - 60 * s, 18 * s, 60 * s, 3));
  P(ctx, '#d8ccb0', 0, () => ctx.ellipse(x, y - 60 * s, 9 * s, 3 * s, 0, 0, Math.PI * 2));
  if (on <= 0) { ctx.save(); ctx.globalAlpha = 0.5; ctx.strokeStyle = '#bbb'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 62 * s); for (let i = 1; i < 10; i++) ctx.lineTo(x + Math.sin(t * 2 + i) * 4 * i * 0.4, y - 62 * s - i * 8); ctx.stroke(); ctx.restore(); return; }
  const fl = 1 + Math.sin(t * 13) * 0.06 + Math.sin(t * 7.3) * 0.05;
  ctx.save(); ctx.translate(x, y - 62 * s); ctx.rotate(lean * 1.1); ctx.globalAlpha = on;
  const g = ctx.createRadialGradient(0, -10 * s, 0, 0, -10 * s, 70 * s); g.addColorStop(0, 'rgba(255,210,130,0.55)'); g.addColorStop(1, 'rgba(255,190,110,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, -10 * s, 70 * s, 0, Math.PI * 2); ctx.fill();
  P(ctx, '#f6b04a', 0, () => { ctx.moveTo(-6 * s, 0); ctx.quadraticCurveTo(-7 * s, -14 * s * fl, 0, -28 * s * fl); ctx.quadraticCurveTo(7 * s, -14 * s * fl, 6 * s, 0); ctx.closePath(); });
  P(ctx, '#fff2c8', 0, () => ctx.ellipse(0, -7 * s, 2.6 * s, 6 * s * fl, 0, 0, Math.PI * 2));
  ctx.restore();
}
export const candleLight = (x, y, r = 520, on = 1) => ({ x, y: y - 70, r: r * on, warm: 1, flicker: 1 });
// Dép tổ ong (nhìn từ trên): color, wet (bóng nước + giọt), wire (quai buộc dây thép), r = xoay.
export function dep(k, x, y, s = 1, o = {}) {
  const { ctx } = k, c = o.color ?? '#3a8a9a';
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.r ?? 0); ctx.scale(s, s);
  P(ctx, c, 3, () => { ctx.moveTo(0, -60); ctx.bezierCurveTo(30, -60, 32, -20, 26, 10); ctx.bezierCurveTo(22, 40, 26, 62, 0, 64); ctx.bezierCurveTo(-24, 62, -20, 40, -24, 10); ctx.bezierCurveTo(-30, -20, -28, -60, 0, -60); ctx.closePath(); });
  ctx.fillStyle = vary(c, -0.35); for (let i = 0; i < 26; i++) { const px = -16 + (i % 5) * 8 + ((Math.floor(i / 5) % 2) * 4), py = -46 + Math.floor(i / 5) * 20; ctx.beginPath(); ctx.ellipse(px, py, 2.6, 3.4, 0, 0, Math.PI * 2); ctx.fill(); }
  P(ctx, vary(c, -0.15), 3, () => { ctx.moveTo(-26, -6); ctx.quadraticCurveTo(0, -42, 26, -6); ctx.lineTo(20, 6); ctx.quadraticCurveTo(0, -22, -20, 6); ctx.closePath(); });
  if (o.wire !== false) { ctx.strokeStyle = '#9a9a9a'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(14 + i * 2, -14 + i * 3); ctx.lineTo(24 + i * 2, -8 + i * 3); ctx.stroke(); } }
  if (o.wet) { ctx.globalAlpha = 0.5 * o.wet; ctx.fillStyle = '#e8f4f8'; ctx.beginPath(); ctx.ellipse(-8, -30, 5, 14, 0.3, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; for (let i = 0; i < 3; i++) { const u = ((T(k) * 0.6 + i / 3) % 1); ctx.fillStyle = `rgba(200,230,240,${0.8 * (1 - u) * o.wet})`; ctx.beginPath(); ctx.ellipse(18 - i * 16, 66 + u * 30, 3, 4.5, 0, 0, Math.PI * 2); ctx.fill(); } }
  ctx.restore();
}
// Đồng xu 500 đồng (nhìn trên).
export function coin(k, x, y, s = 1) {
  const { ctx } = k;
  P(ctx, '#b8a07a', 2.5 * s, () => ctx.arc(x, y, 30 * s, 0, Math.PI * 2));
  P(ctx, null, 1.2 * s, () => ctx.arc(x, y, 23 * s, 0, Math.PI * 2), vary('#b8a07a', -0.35));
  k.text('500', x, y + 1, { size: 18 * s, font: 'title', color: vary('#b8a07a', -0.5) });
}

// ---------- tờ giấy cầu cơ (cận, nhìn từ trên) ----------
const ROW1 = 'ABCDEFGHIJKLM', ROW2 = 'NOPQRSTUVWXYZ', NUM = '1234567890';
const GX = (i, n) => 480 + (i / (n - 1)) * 960;
export function boardPos(ch) {
  if (ch === '+') return [600, 270];              // CÓ
  if (ch === '-') return [1320, 270];             // KHÔNG
  if (ch === '.') return [960, 290];              // vòng tròn giữa
  let i = ROW1.indexOf(ch); if (i >= 0) return [GX(i, 13), 452 - Math.sin((i / 12) * Math.PI) * 40];
  i = ROW2.indexOf(ch); if (i >= 0) return [GX(i, 13), 592 - Math.sin((i / 12) * Math.PI) * 40];
  i = NUM.indexOf(ch); if (i >= 0) return [GX(i, 10), 730];
  return [960, 290];
}
// Vị trí đồng xu khi đánh chữ seq (bỏ dấu cách) bắt đầu ở thời điểm t0 (giây trong cảnh), mỗi chữ `step` giây.
export function coinAt(k, seq, t0, step = 0.9, from = '.') {
  const chars = [from, ...seq.replace(/ /g, '')];
  const u = (k.t - t0) / step;
  if (u <= 0) return { pos: boardPos(from), idx: -1 };
  const i = Math.min(chars.length - 1, Math.floor(u)), f = Math.min(1, (u - i) / 0.55), e = f * f * (3 - 2 * f);
  if (i >= chars.length - 1) return { pos: boardPos(chars[chars.length - 1]), idx: chars.length - 2 };
  const a = boardPos(chars[i]), b = boardPos(chars[i + 1]);
  return { pos: [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e], idx: f >= 1 ? i : i - 1 };
}
export function board(k, o = {}) {
  const { ctx, W, H } = k;
  // mặt bàn gỗ
  ctx.fillStyle = '#4a3222'; ctx.fillRect(-100, -100, W + 200, H + 200);
  ctx.save(); ctx.globalAlpha = 0.22; ctx.strokeStyle = '#2a1a10'; ctx.lineWidth = 3; for (let y = -40; y < H + 40; y += 46) { ctx.beginPath(); ctx.moveTo(-100, y); for (let x = -100; x < W + 100; x += 80) ctx.lineTo(x, y + Math.sin(x * 0.01 + y) * 6); ctx.stroke(); } ctx.restore();
  // giấy
  ctx.save(); ctx.translate(960, 520); ctx.rotate(-0.012);
  P(ctx, o.wet ? '#cfc6ae' : '#e6dcc4', 3, () => ctx.rect(-640, -420, 1280, 830));
  if (o.wet) { ctx.globalAlpha = 0.25 * o.wet; ctx.fillStyle = '#6a7a6a'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(-500 + R(k, i) * 1000, -300 + R(k, i + 5) * 600, 120 + R(k, i + 2) * 90, 60 + R(k, i + 3) * 50, R(k, i), 0, Math.PI * 2); ctx.fill(); } ctx.globalAlpha = 1; }
  ctx.restore();
  // vòng tròn + CÓ / KHÔNG
  P(ctx, null, 3, () => ctx.arc(960, 290, 46, 0, Math.PI * 2), '#5a4632');
  const ink = '#3a2a1e';
  k.text('CÓ', 600, 272, { size: 60, font: 'title', color: ink }); k.text('KHÔNG', 1320, 272, { size: 60, font: 'title', color: ink });
  const hi = o.hi; // chữ đang sáng
  for (const [row, n] of [[ROW1, 13], [ROW2, 13]]) for (const c of row) { const [x, y] = boardPos(c); k.text(c, x, y, { size: 54, font: 'title', color: hi === c ? '#8a2a1a' : ink }); }
  for (const c of NUM) { const [x, y] = boardPos(c); k.text(c, x, y, { size: 50, font: 'title', color: hi === c ? '#8a2a1a' : ink }); }
}
// Bàn tay búp bê đặt một ngón lên đồng xu: from = mép khung, to = điểm chạm. color = màu áo.
export function fingerArm(k, from, to, o = {}) {
  const { ctx } = k, col = o.color === '#ece6d8' || !o.color ? '#d6d0c2' : o.color, skin = o.skin ?? '#ecc8a4', r = o.r ?? 48;
  const dx = to[0] - from[0], dy = to[1] - from[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
  const hand = [to[0] - ux * r * 1.25, to[1] - uy * r * 1.25];
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.lineCap = 'round';
  ctx.strokeStyle = LINE; ctx.lineWidth = r * 1.7 + 9; ctx.beginPath(); ctx.moveTo(...from); ctx.lineTo(...hand); ctx.stroke();
  ctx.strokeStyle = col; ctx.lineWidth = r * 1.7; ctx.stroke();
  // ngón trỏ
  ctx.strokeStyle = LINE; ctx.lineWidth = r * 0.5 + 5; ctx.beginPath(); ctx.moveTo(...hand); ctx.lineTo(to[0], to[1]); ctx.stroke();
  ctx.strokeStyle = skin; ctx.lineWidth = r * 0.5; ctx.stroke();
  P(ctx, skin, 3, () => ctx.arc(hand[0], hand[1], r * 0.95, 0, Math.PI * 2));
  ctx.restore();
}

// ---------- lớp học tầng ba (đêm mất điện) ----------
// o.power (đèn tuýp + quạt), o.open (cửa sổ mở), o.prints 0..1 (dấu chân ướt), o.desk (bàn giữa có giấy + nến)
export const ROOM = { candle: { x: 960, y: 752 }, window: { x: 1650, y: 430 } };
export function lopHoc(k, o = {}) {
  const { ctx, W, H } = k, t = T(k);
  ctx.fillStyle = '#e4d6b4'; ctx.fillRect(-100, -100, W + 200, 720);
  ctx.fillStyle = '#6a8a74'; ctx.fillRect(-100, 620, W + 200, 290);
  P(ctx, null, 3, () => { ctx.moveTo(-100, 620); ctx.lineTo(W + 100, 620); });
  // sàn gạch đỏ
  ctx.fillStyle = '#9a6248'; ctx.fillRect(-100, 900, W + 200, 300);
  ctx.strokeStyle = 'rgba(40,20,10,0.35)'; ctx.lineWidth = 2; for (let x = -100; x < W + 100; x += 120) { ctx.beginPath(); ctx.moveTo(x, 900); ctx.lineTo(x - (x - 960) * 0.35, H + 100); ctx.stroke(); } for (const y of [940, 1000, 1080]) { ctx.beginPath(); ctx.moveTo(-100, y); ctx.lineTo(W + 100, y); ctx.stroke(); }
  P(ctx, null, 3, () => { ctx.moveTo(-100, 900); ctx.lineTo(W + 100, 900); });
  // bảng đen
  P(ctx, '#7a5a3a', 3, () => ctx.rect(470, 150, 820, 360));
  P(ctx, '#2e4636', 2, () => ctx.rect(490, 168, 780, 324));
  ctx.save(); ctx.globalAlpha = 0.75; k.text('ÔN THI VÀO LỚP 10', 880, 250, { size: 46, color: '#dcd8c8' }); k.text('Đề số 7 · Toán', 880, 330, { size: 36, color: '#dcd8c8' }); ctx.restore();
  if (o.chalk) { ctx.save(); ctx.globalAlpha = o.chalkP ?? 1; ctx.fillStyle = '#2e4636'; ctx.fillRect(500, 360, 760, 120); ctx.restore(); k.text(o.chalk, 880, 420, { size: 92, font: 'title', color: '#f2f0e4', fx: 'write', p: o.chalkP ?? 1 }); }
  P(ctx, '#7a5a3a', 2, () => ctx.rect(480, 505, 800, 14));
  // khẩu hiệu
  P(ctx, '#b8322a', 2, () => ctx.rect(560, 70, 640, 56)); k.text('TIÊN HỌC LỄ · HẬU HỌC VĂN', 880, 100, { size: 30, font: 'title', color: '#f2e6c0' });
  // cửa sổ song sắt
  const wx = 1500, wy = 230, ww = 320, wh = 400;
  ctx.fillStyle = '#16202e'; ctx.fillRect(wx, wy, ww, wh);
  ctx.fillStyle = '#e8e0c8'; ctx.beginPath(); ctx.arc(wx + 230, wy + 90, 34, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0c1018'; for (let i = 0; i < 6; i++) { const bx = wx + 20 + i * 55; ctx.beginPath(); ctx.moveTo(bx, wy + wh); ctx.lineTo(bx + 8, wy + 170 + Math.sin(i) * 30); ctx.lineTo(bx + 16, wy + wh); ctx.fill(); }
  ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 6; for (let i = 1; i < 7; i++) { ctx.beginPath(); ctx.moveTo(wx + i * ww / 7, wy); ctx.lineTo(wx + i * ww / 7, wy + wh); ctx.stroke(); }
  P(ctx, null, 8, () => ctx.rect(wx, wy, ww, wh), '#5a4030');
  const op = o.open ?? 0;
  for (const sd of [0, 1]) { // cánh cửa gỗ: đóng = che kín, mở = xoay ra
    const w0 = ww / 2 * (1 - op * 0.82); const x0 = sd ? wx + ww - w0 : wx;
    P(ctx, '#6a4a30', 3, () => ctx.rect(x0, wy, w0, wh));
    if (w0 > 30) for (let j = 0; j < 4; j++) P(ctx, null, 2, () => ctx.rect(x0 + 12, wy + 14 + j * 96, w0 - 24, 80), '#4a3020');
  }
  // đèn tuýp + quạt trần
  const pw = o.power ?? 0;
  P(ctx, pw ? '#fffbe8' : '#cfcab8', 2, () => ctx.roundRect(300, 150, 120, 14, 6));
  if (pw) { const g = ctx.createRadialGradient(360, 157, 0, 360, 157, 400); g.addColorStop(0, 'rgba(255,255,230,0.25)'); g.addColorStop(1, 'rgba(255,255,230,0)'); ctx.fillStyle = g; ctx.fillRect(-40, -240, 800, 800); }
  ctx.strokeStyle = LINE; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(960, -40); ctx.lineTo(960, 40); ctx.stroke();
  const fa = pw ? t * 9 : 0.3;
  for (let i = 0; i < 3; i++) { const a = fa + i * 2.09; P(ctx, '#d8d0bc', 2, () => ctx.ellipse(960 + Math.cos(a) * 110, 42 + Math.sin(a) * 10, 110, 12, 0, 0, Math.PI * 2)); }
  P(ctx, '#bcb4a0', 2, () => ctx.ellipse(960, 42, 26, 14, 0, 0, Math.PI * 2));
  // dãy bàn sau
  for (const x of [120, 1580]) { P(ctx, '#7a5634', 3, () => ctx.rect(x, 760, 300, 26)); P(ctx, '#5a3e24', 3, () => ctx.rect(x + 14, 786, 270, 90)); }
  // dấu chân ướt
  if (o.prints) { const n = Math.floor(o.prints * 9); for (let i = 0; i < n; i++) { const u = i / 8, x = 1600 - u * 520 + (i % 2) * 34, y = 960 - u * 40 + (i % 2) * 18; ctx.save(); ctx.globalAlpha = 0.45; ctx.fillStyle = '#3a2a22'; ctx.beginPath(); ctx.ellipse(x, y, 18, 9, -0.1, 0, Math.PI * 2); ctx.fill(); for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.arc(x - 22 + j * 2, y - 8 + j * 5, 3, 0, Math.PI * 2); ctx.fill(); } ctx.globalAlpha = 0.3; ctx.fillStyle = '#c8e0e8'; ctx.beginPath(); ctx.ellipse(x + 4, y - 3, 8, 3, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
}
// Bàn giữa (vẽ sau người ngồi phía sau bàn): giấy, đồng xu, nến.
export function deskFront(k, o = {}) {
  const { ctx } = k;
  P(ctx, '#7a5634', 3, () => ctx.rect(560, 740, 800, 30));
  P(ctx, '#e6dcc4', 2, () => { ctx.moveTo(820, 752); ctx.lineTo(1100, 752); ctx.lineTo(1120, 766); ctx.lineTo(800, 766); ctx.closePath(); });
  P(ctx, '#5a3e24', 3, () => ctx.rect(580, 770, 760, 130));
  ctx.save(); ctx.globalAlpha = 0.25; ctx.strokeStyle = LINE; ctx.lineWidth = 2; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(580 + i * 190, 772); ctx.lineTo(580 + i * 190, 898); ctx.stroke(); } ctx.restore();
  if (o.candle !== false) candle(k, ROOM.candle.x, ROOM.candle.y, 1, { on: o.candle ?? 1, lean: o.lean ?? 0 });
}
// Bóng trên tường (đầu người), n bóng; o.extra = vị trí bóng thứ 5.
export function wallShadows(k, xs, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.filter = 'blur(6px)'; ctx.fillStyle = 'rgba(20,12,8,0.42)';
  for (const x of xs) { ctx.beginPath(); ctx.arc(x, 380, 92, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(x - 90, 420, 180, 210); }
  if (o.extra) { ctx.globalAlpha = o.extra; ctx.beginPath(); ctx.arc(o.extraX ?? 960, 360, 80, 0, Math.PI * 2); ctx.fill(); ctx.fillRect((o.extraX ?? 960) - 70, 400, 140, 230); }
  ctx.restore();
}

// ---------- bến Đống ----------
// Sông ngang khung, xoáy giữa dòng (x 1180, y 720), cây sung già bên trái (x 380). o.time day|dusk|night, o.moon, o.swirl (độ đậm xoáy)
export const BEN = { sung: { x: 380, y: 880 }, swirl: { x: 1180, y: 720 }, bank: 880 };
export function benDong(k, o = {}) {
  const { ctx, W, H } = k, t = T(k), time = o.time ?? 'dusk';
  const sky = { day: ['#b8c8cc', '#e8dcc0'], dusk: ['#a07a5a', '#e0b07a'], night: ['#121a28', '#2a3448'] }[time];
  const g = ctx.createLinearGradient(0, 0, 0, 560); g.addColorStop(0, sky[0]); g.addColorStop(1, sky[1]); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, 700);
  if (o.moon || time === 'night') { ctx.fillStyle = '#efe6cc'; ctx.beginPath(); ctx.arc(1500, 170, 56, 0, Math.PI * 2); ctx.fill(); const mg = ctx.createRadialGradient(1500, 170, 40, 1500, 170, 260); mg.addColorStop(0, 'rgba(240,230,200,0.3)'); mg.addColorStop(1, 'rgba(240,230,200,0)'); ctx.fillStyle = mg; ctx.fillRect(1200, -100, 600, 540); }
  // núi xếp lớp kiểu ảnh mẫu
  const dk = time === 'night' ? -0.55 : time === 'dusk' ? -0.1 : 0;
  const ridge = (y, amp, c, seed) => P(ctx, vary(c, dk), 0, () => { ctx.moveTo(-100, 620); for (let x = -100; x <= W + 100; x += 160) ctx.lineTo(x, y - (Math.floor((x + seed) / 160) % 2 ? amp : 0) - R(k, x + seed) * 30); ctx.lineTo(W + 100, 620); ctx.closePath(); });
  if (o.ridge !== false) { ridge(340, 120, '#a88a6e', 3); ridge(420, 100, '#8e6e56', 7); ridge(500, 80, '#765a48', 11); }
  // bờ bên kia + tre
  P(ctx, vary('#6a6a3e', dk), 0, () => ctx.rect(-100, 560, W + 200, 60));
  for (const [x, h] of [[160, 420], [700, 360], [1640, 400]]) bamboo(k, x, 600, h, dk);
  // mặt sông
  const rg = ctx.createLinearGradient(0, 610, 0, 900); rg.addColorStop(0, vary('#8a9a8a', dk)); rg.addColorStop(1, vary('#5a6a62', dk)); ctx.fillStyle = rg; ctx.fillRect(-100, 610, W + 200, 300);
  if (o.moon || time === 'night') { ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#efe6cc'; for (let i = 0; i < 8; i++) ctx.fillRect(1430 + Math.sin(t + i) * 20, 640 + i * 28, 140 - i * 10, 4); ctx.restore(); }
  ctx.strokeStyle = vary('#c8d0c8', dk); ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (let i = 0; i < 22; i++) { const x = ((R(k, i) * W + t * 12) % (W + 200)) - 100, y = 640 + R(k, i + 30) * 240; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 40 + R(k, i + 9) * 40, y); ctx.stroke(); }
  ctx.globalAlpha = 1;
  // xoáy
  const sw = o.swirl ?? 0.6;
  ctx.save(); ctx.translate(BEN.swirl.x, BEN.swirl.y); ctx.scale(1, 0.32); ctx.globalAlpha = sw; ctx.strokeStyle = vary('#3a4a44', dk); ctx.lineWidth = 6;
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(0, 0, 40 + i * 42, t * 1.6 + i, t * 1.6 + i + 4.2); ctx.stroke(); }
  ctx.restore();
  // bờ gần: đất nâu, đá cuội như ảnh mẫu
  P(ctx, vary('#9a8264', dk), 3, () => { ctx.moveTo(-100, 900); ctx.quadraticCurveTo(700, 860, 1300, 890); ctx.quadraticCurveTo(1700, 905, W + 100, 880); ctx.lineTo(W + 100, H + 100); ctx.lineTo(-100, H + 100); ctx.closePath(); });
  for (let i = 0; i < 26; i++) { const x = R(k, i + 60) * W, y = 930 + R(k, i + 61) * 130; P(ctx, vary('#c4b090', dk + (R(k, i) - 0.5) * 0.1), 2.5, () => ctx.ellipse(x, y, 34 + R(k, i + 2) * 40, 12 + R(k, i + 3) * 6, 0, 0, Math.PI * 2)); }
  if (o.sung !== false) sung(k, BEN.sung.x, BEN.sung.y, 1, dk);
}
export function bamboo(k, x, y, h, dk = 0) {
  const { ctx } = k, t = T(k);
  for (let i = 0; i < 9; i++) {
    const a = (i - 4) * 0.07 + Math.sin(t * 0.8 + i) * 0.012, hh = h * (0.75 + R(k, x + i) * 0.3);
    const tx = x + Math.sin(a) * hh, ty = y - Math.cos(a) * hh;
    ctx.strokeStyle = vary('#6a8a3a', dk - 0.05); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + (i - 4) * 6, y); ctx.quadraticCurveTo(x + Math.sin(a) * hh * 0.5, y - hh * 0.5, tx, ty); ctx.stroke();
    ctx.strokeStyle = vary('#4a6a2a', dk); ctx.lineWidth = 2; for (let j = 1; j < 6; j++) { const u = j / 6, px = x + (i - 4) * 6 + (tx - x) * u, py = y + (ty - y) * u; ctx.beginPath(); ctx.moveTo(px - 6, py); ctx.lineTo(px + 6, py); ctx.stroke(); }
    ctx.strokeStyle = vary('#7a9a4a', dk); ctx.lineWidth = 5;
    for (let j = 0; j < 4; j++) { const u = 0.45 + j * 0.15, px = x + (tx - x) * u, py = y + (ty - y) * u, d = j % 2 ? 1 : -1; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px + d * 30, py - 18, px + d * 58, py - 4); ctx.stroke(); }
  }
}
// Cây sung già: thân to, rễ trồi như ngón tay, quả mọc thành chùm trên thân.
export function sung(k, x, y, s = 1, dk = 0) {
  const { ctx } = k, t = T(k);
  P(ctx, vary('#5a4a3a', dk), 3, () => { ctx.moveTo(x - 70 * s, y); ctx.quadraticCurveTo(x - 40 * s, y - 200 * s, x - 60 * s, y - 420 * s); ctx.lineTo(x + 50 * s, y - 420 * s); ctx.quadraticCurveTo(x + 40 * s, y - 200 * s, x + 80 * s, y); ctx.closePath(); });
  for (let i = 0; i < 5; i++) P(ctx, vary('#5a4a3a', dk - 0.05), 3, () => { const d = i - 2; ctx.moveTo(x + d * 30 * s, y - 20 * s); ctx.quadraticCurveTo(x + d * 70 * s, y - 10 * s, x + d * 95 * s, y + 18 * s); ctx.lineTo(x + d * 80 * s, y + 22 * s); ctx.quadraticCurveTo(x + d * 55 * s, y, x + d * 22 * s, y - 6 * s); ctx.closePath(); });
  for (let i = 0; i < 14; i++) P(ctx, vary('#8a9a4a', dk + (i % 3) * 0.05), 2, () => ctx.arc(x - 30 * s + R(k, i + 90) * 70 * s, y - 120 * s - R(k, i + 91) * 240 * s, 9 * s, 0, Math.PI * 2));
  for (let i = 0; i < 6; i++) { const a = -2.6 + i * 0.4 + Math.sin(t * 0.6 + i) * 0.02; P(ctx, vary(i % 2 ? '#4a6a3a' : '#5a7a44', dk), 0, () => ctx.ellipse(x + Math.cos(a) * 200 * s, y - 440 * s + Math.sin(a) * 130 * s, 170 * s, 90 * s, a * 0.3, 0, Math.PI * 2)); }
}

// ---------- đường đê ----------
export function duongDe(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'day', dk = time === 'dusk' ? -0.15 : time === 'night' ? -0.55 : 0;
  const g = ctx.createLinearGradient(0, 0, 0, 600); g.addColorStop(0, vary(time === 'dusk' ? '#a07a5a' : '#a8bcc4', dk)); g.addColorStop(1, vary(time === 'dusk' ? '#e0b07a' : '#e8dcc0', dk)); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, 700);
  P(ctx, vary('#8e7a62', dk), 0, () => { ctx.moveTo(-100, 600); for (let x = -100; x <= W + 100; x += 200) ctx.lineTo(x, 470 - (Math.floor(x / 200) % 2) * 70); ctx.lineTo(W + 100, 600); ctx.closePath(); });
  ctx.fillStyle = vary('#7a8a4a', dk); ctx.fillRect(-100, 580, W + 200, 200);
  ctx.strokeStyle = vary('#5a6a32', dk); ctx.lineWidth = 2; for (let y = 600; y < 780; y += 14) { ctx.beginPath(); ctx.moveTo(-100, y); ctx.lineTo(W + 100, y); ctx.stroke(); }
  for (const x of [220, 980, 1700]) bamboo(k, x, 640, 320, dk);
  P(ctx, vary('#a8906c', dk), 3, () => { ctx.moveTo(-100, 790); ctx.lineTo(W + 100, 790); ctx.lineTo(W + 100, 990); ctx.lineTo(-100, 990); ctx.closePath(); });
  ctx.strokeStyle = vary('#8a7454', dk); ctx.lineWidth = 3; for (let i = 0; i < 18; i++) { const x = R(k, i + 200) * W, y = 820 + R(k, i + 201) * 150; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 50, y); ctx.stroke(); }
  P(ctx, vary('#6a7a3a', dk), 0, () => ctx.rect(-100, 990, W + 200, 200));
  // cột điện
  ctx.strokeStyle = vary('#6a6a66', dk); ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(1400, 800); ctx.lineTo(1400, 300); ctx.stroke(); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-100, 330); ctx.quadraticCurveTo(700, 380, 1400, 320); ctx.quadraticCurveTo(1700, 300, W + 100, 330); ctx.stroke();
}

// ---------- buồng ngủ (nhà tôi / nhà Hải) ----------
// Giường tre kê sát cửa sổ gỗ; o.time night|day, o.net (màn), o.wall (màu vách)
export const BUONG = { bed: { x: 760, y: 780 }, window: { x: 1450, y: 420 } };
export function buong(k, o = {}) {
  const { ctx, W, H } = k, night = (o.time ?? 'night') === 'night';
  ctx.fillStyle = o.wall ?? '#d8c8a4'; ctx.fillRect(-100, -100, W + 200, 900);
  ctx.save(); ctx.globalAlpha = 0.12; for (let i = 0; i < 10; i++) { ctx.fillStyle = '#6a5a3a'; ctx.beginPath(); ctx.ellipse(R(k, i + 300) * W, R(k, i + 301) * 700, 120, 60, 0, 0, Math.PI * 2); ctx.fill(); } ctx.restore();
  ctx.fillStyle = '#8a6a4e'; ctx.fillRect(-100, 880, W + 200, 300); P(ctx, null, 3, () => { ctx.moveTo(-100, 880); ctx.lineTo(W + 100, 880); });
  // cửa sổ gỗ song con tiện
  const wx = 1280, wy = 220, ww = 340, wh = 380;
  ctx.fillStyle = night ? '#141c2a' : '#c8d4d8'; ctx.fillRect(wx, wy, ww, wh);
  if (night) { ctx.fillStyle = '#e8e0c8'; ctx.beginPath(); ctx.arc(wx + 250, wy + 80, 30, 0, Math.PI * 2); ctx.fill(); }
  for (let i = 0; i < 6; i++) bamboo(k, wx + 40 + i * 60, wy + wh, 200, night ? -0.7 : -0.1);
  ctx.fillStyle = '#6a4a30'; for (let i = 1; i < 8; i++) { ctx.beginPath(); ctx.roundRect(wx + i * ww / 8 - 8, wy, 16, wh, 6); ctx.fill(); }
  P(ctx, null, 10, () => ctx.rect(wx, wy, ww, wh), '#5a3e28');
  if (o.window === 'open') { P(ctx, '#7a5a3a', 3, () => ctx.rect(wx - 150, wy, 140, wh)); }
  // lịch treo tường
  P(ctx, '#f2ece0', 2, () => ctx.rect(330, 230, 150, 200)); P(ctx, '#b8322a', 2, () => ctx.rect(330, 230, 150, 50)); k.text(o.year ?? '2009', 405, 256, { size: 28, font: 'title', color: '#fff' }); k.text(o.day ?? '15', 405, 360, { size: 80, font: 'title', color: '#b8322a' });
  // giường tre + chiếu
  P(ctx, '#9a7a46', 3, () => ctx.rect(330, 760, 920, 30)); P(ctx, '#8a6a3a', 3, () => ctx.rect(350, 790, 30, 100)); P(ctx, '#8a6a3a', 3, () => ctx.rect(1200, 790, 30, 100));
  P(ctx, '#d8c08a', 2, () => ctx.rect(340, 748, 900, 16));
  ctx.strokeStyle = 'rgba(120,90,40,0.4)'; ctx.lineWidth = 2; for (let x = 360; x < 1230; x += 18) { ctx.beginPath(); ctx.moveTo(x, 748); ctx.lineTo(x, 764); ctx.stroke(); }
  P(ctx, '#f0ead8', 2, () => ctx.roundRect(360, 716, 140, 40, 14)); // gối
}
export function net(k, a = 0.35) { // màn che giường
  const { ctx } = k; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#eef2f4'; ctx.fillRect(320, 300, 940, 470); ctx.globalAlpha = a * 1.5; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.strokeRect(320, 300, 940, 470); ctx.restore();
}

// ---------- hành lang tầng ba ----------
export function hanhLang(k, o = {}) {
  const { ctx, W, H } = k, t = T(k);
  const g = ctx.createLinearGradient(0, 0, 0, 500); g.addColorStop(0, '#0e1420'); g.addColorStop(1, '#202a3a'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, 700);
  ctx.fillStyle = '#e8e0c8'; ctx.beginPath(); ctx.arc(1560, 150, 46, 0, Math.PI * 2); ctx.fill();
  for (const x of [200, 600, 1100, 1500]) bamboo(k, x, 640, 300, -0.7);
  // tường lớp + cửa
  P(ctx, '#d8c8a0', 3, () => ctx.rect(-100, 80, 760, 820)); P(ctx, '#6a4a30', 3, () => ctx.rect(200, 300, 260, 600));
  ctx.fillStyle = 'rgba(255,200,120,0.5)'; ctx.fillRect(214, 314, 232, 140);
  P(ctx, '#7a7a76', 3, () => ctx.rect(-100, 880, W + 200, 40)); ctx.fillStyle = '#5a5a56'; ctx.fillRect(-100, 920, W + 200, 300);
  // lan can
  P(ctx, '#bdb6a6', 3, () => ctx.rect(660, 660, W - 560, 22));
  for (let x = 680; x < W + 60; x += 46) P(ctx, '#bdb6a6', 2, () => ctx.rect(x, 682, 14, 200));
  // ba nén hương cắm lan can
  if (o.incense !== false) for (let i = 0; i < 3; i++) { const x = 1000 + i * 16; ctx.strokeStyle = '#8a2a1a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 662); ctx.lineTo(x + (i - 1) * 6, 590); ctx.stroke(); ctx.fillStyle = '#ff8a3a'; ctx.beginPath(); ctx.arc(x + (i - 1) * 6, 588, 4, 0, Math.PI * 2); ctx.fill(); ctx.save(); ctx.globalAlpha = 0.3; ctx.strokeStyle = '#ddd'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + (i - 1) * 6, 584); for (let j = 1; j < 10; j++) ctx.lineTo(x + (i - 1) * 6 + Math.sin(t * 1.4 + j * 0.6 + i) * j * 3, 584 - j * 20); ctx.stroke(); ctx.restore(); }
}

// ---------- chợ (gánh xôi bà Thoa) ----------
export function cho(k, o = {}) {
  const { ctx, W, H } = k;
  const g = ctx.createLinearGradient(0, 0, 0, 600); g.addColorStop(0, '#c8c0a8'); g.addColorStop(1, '#ecdcb8'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, 700);
  P(ctx, '#a89070', 3, () => ctx.rect(-100, 300, 900, 400)); P(ctx, '#6a5a4a', 3, () => { ctx.moveTo(-120, 320); ctx.lineTo(380, 180); ctx.lineTo(880, 320); ctx.closePath(); });
  P(ctx, '#b8322a', 2, () => ctx.rect(200, 360, 360, 60)); k.text('CHỢ XÃ', 380, 392, { size: 34, font: 'title', color: '#f2e6c0' });
  bamboo(k, 1500, 700, 380);
  ctx.fillStyle = '#9a8264'; ctx.fillRect(-100, 700, W + 200, 500); P(ctx, null, 3, () => { ctx.moveTo(-100, 700); ctx.lineTo(W + 100, 700); });
  // mẹt xôi + thúng
  P(ctx, '#a07a46', 3, () => ctx.ellipse(1060, 880, 150, 34, 0, 0, Math.PI * 2)); P(ctx, '#f2ead0', 2, () => ctx.ellipse(1060, 868, 110, 24, 0, 0, Math.PI * 2)); P(ctx, '#e8c860', 0, () => ctx.ellipse(1080, 864, 50, 12, 0, 0, Math.PI * 2));
  P(ctx, '#8a6a3a', 3, () => ctx.roundRect(1180, 820, 120, 100, 20));
}

// ---------- nhà ông Khiêm (thầy cúng) ----------
export function nhaKhiem(k, o = {}) {
  const { ctx, W, H } = k, t = T(k);
  ctx.fillStyle = '#4a3a2c'; ctx.fillRect(-100, -100, W + 200, 1300);
  ctx.fillStyle = '#3a2c20'; ctx.fillRect(-100, 860, W + 200, 400); P(ctx, null, 3, () => { ctx.moveTo(-100, 860); ctx.lineTo(W + 100, 860); });
  // bàn thờ
  P(ctx, '#7a2a1e', 3, () => ctx.rect(660, 520, 600, 30)); P(ctx, '#5a1e16', 3, () => ctx.rect(680, 550, 560, 310));
  P(ctx, '#c89a3a', 3, () => ctx.rect(560, 140, 800, 90)); k.text('PHÚC ĐỨC', 960, 186, { size: 48, font: 'title', color: '#5a1e16' });
  for (const x of [600, 1320]) { P(ctx, '#b8322a', 2, () => ctx.rect(x - 30, 250, 60, 380)); }
  P(ctx, '#a08a5a', 3, () => ctx.ellipse(960, 512, 60, 20, 0, 0, Math.PI * 2)); P(ctx, '#a08a5a', 3, () => ctx.rect(900, 470, 120, 42));
  for (let i = 0; i < 3; i++) { const x = 940 + i * 20; ctx.strokeStyle = '#8a2a1a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 470); ctx.lineTo(x, 400); ctx.stroke(); ctx.save(); ctx.globalAlpha = 0.3; ctx.strokeStyle = '#ddd'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 396); for (let j = 1; j < 10; j++) ctx.lineTo(x + Math.sin(t + j * 0.6 + i) * j * 4, 396 - j * 22); ctx.stroke(); ctx.restore(); }
  for (const x of [760, 1160]) candle(k, x, 520, 1.1);
}
export const altarLights = [{ x: 760, y: 450, r: 520, warm: 1, flicker: 1 }, { x: 1160, y: 450, r: 520, warm: 1, flicker: 1 }];

export { sepia };
