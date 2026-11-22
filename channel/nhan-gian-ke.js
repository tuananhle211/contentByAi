// Nhân Gian Chưa Kể — tập Ông Kẹ (20/11/2026): bộ cảnh nhà ngói ba gian làng Hải Dương 1996 + trại phong + nhân vật búp bê.
// Cảnh: nha (gian giữa: cửa bức bàn, bàn thờ ông, cái tủ gỗ mít, cửa buồng), buong (giường + màn), cua (cửa gỗ nhìn từ trong),
//       tuGan (cái tủ nhìn gần, mở được: áo bông, nón, bát men xanh, điếu cày, sổ; chỗ gỗ mòn trong cánh trái),
//       trai (trại phong: dãy nhà cấp bốn, cây bàng), nghiaTrai (nghĩa trang sau trại), phong2026 (nhà tôi bây giờ).
// Đạo cụ: go (vòng tiếng gõ), anhOng, bat, dieuCay, thuocLao, khoi (mùi thuốc lào), chiaKhoa, tayNai, xeDap, giayBaoTu, so, dienTin, goiLa.
import { doll, sepia } from '/channel/nhan-gian-doll.js';
import { vary } from '/channel/nhan-gian-hd.js';
import { LINE } from '/channel/nhan-gian-cauco.js';

export { sepia };
const T = (k) => k.gt ?? 0;
const R = (k, i) => k.rand(i);
const TAU = Math.PI * 2;
function P(ctx, fill, lw, fn, stroke = LINE) { ctx.beginPath(); fn(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
const HAND = (px) => `italic 500 ${px}px "Be Vietnam Pro", Georgia, serif`;
const TYPE = (px, w = 500) => `${w} ${px}px "Courier New", "Be Vietnam Pro", monospace`;

// ---------- nhân vật ----------
export const TOI = { kind: 'kid', skin: '#e8c09c', hair: 'buzz', hairColor: '#1e1610', top: '#6a7a8a', topStyle: 'shirt', pants: '#2e3036', shoes: '#6a5a4a' };
export const BA = { kind: 'old', skin: '#d8b498', hair: 'bun', hairColor: '#a09890', top: '#4e3e32', topStyle: 'baba', pants: '#1e1c1a', shoes: '#4a3a2a', hat: 'moquo' };
export const BO = { kind: 'man', skin: '#c8966e', hair: 'short', hairColor: '#1e1610', top: '#5e6a52', topStyle: 'army', pants: '#2e3a2e', shoes: '#3a2e24' };
export const CO = { kind: 'woman', skin: '#e0b892', hair: 'bun', hairColor: '#1e1610', top: '#8a6a72', topStyle: 'canh', print: 'flower', pants: '#23211f', shoes: '#5a4a3a' };
export const THOM = { kind: 'old', skin: '#d0a888', hair: 'bun', hairColor: '#8a8078', top: '#6a6a5a', topStyle: 'baba', pants: '#23211f', shoes: '#4a3a2a', hat: 'khan', hatColor: '#3a3438' };
export const LOC = { kind: 'old', skin: '#b8906c', hair: 'short', hairColor: '#8a8078', top: '#6a7458', topStyle: 'army', pants: '#3a3a2e', shoes: '#3a2e24', hat: 'coi', hatColor: '#8a8a6a' };
export const ONG = { kind: 'man', skin: '#b88c68', hair: 'short', hairColor: '#2a2018', top: '#463c32', topStyle: 'baba', pants: '#2a2622', shoes: '#4a3a2a', hat: 'non', hatColor: '#9a8a62' };
export const BO_NHO = { kind: 'kid', skin: '#e0b48e', hair: 'buzz', hairColor: '#1e1610', top: '#8a8a78', topStyle: 'baba', pants: '#2e2e36', shoes: '#e0b48e' };
export const CO_NHO = { kind: 'kid', skin: '#ecc8a4', hair: 'bun', hairColor: '#1e1610', top: '#a07a6a', topStyle: 'canh', pants: '#2e2e36', shoes: '#ecc8a4' };
export const BA_TRE = { ...BA, kind: 'woman', hairColor: '#241a12', skin: '#dcb28e' };
export const CON = { kind: 'kid', skin: '#ecc8a4', hair: 'short', hairColor: '#1e1610', top: '#5a7a9a', topStyle: 'tee', pants: '#3a3e4a', shoes: '#6a5a4a' };
export const TOI_LON = { kind: 'man', skin: '#e0b48e', hair: 'short', hairColor: '#1e1610', top: '#3e4a5a', topStyle: 'shirt', pants: '#2a2a30', shoes: '#3a2e24' };
export const XOM = [
  { kind: 'woman', skin: '#d0a27c', hair: 'bun', hairColor: '#3a3028', top: '#8a6f62', topStyle: 'canh', pants: '#2a2622', shoes: '#5a4a3a', hat: 'non' },
  { kind: 'man', skin: '#b88c68', hair: 'short', hairColor: '#241a12', top: '#5a6a72', topStyle: 'shirt', pants: '#2a2a2e', shoes: '#4a3a2a' },
  { kind: 'old', skin: '#c8a080', hair: 'bun', hairColor: '#9a948a', top: '#5a5048', topStyle: 'baba', pants: '#1e1c1a', shoes: '#4a3a2a', hat: 'khan' },
];
export const BENH = [
  { kind: 'old', skin: '#b8906c', hair: 'short', hairColor: '#8a8078', top: '#7a7a6a', topStyle: 'baba', pants: '#3a3a30', shoes: '#4a3a2a', hat: 'coi', hatColor: '#7a7a5a' },
  { kind: 'old', skin: '#c8a080', hair: 'bun', hairColor: '#9a948a', top: '#6a5a52', topStyle: 'baba', pants: '#2a2622', shoes: '#4a3a2a', hat: 'non' },
  { kind: 'old', skin: '#b08868', hair: 'bald', hairColor: '#8a8078', top: '#5e6a5a', topStyle: 'baba', pants: '#2a2a2a', shoes: '#4a3a2a' },
];
export const ch = (k, x, y, h, o) => doll(k, x, y, h, o);
export const lie = (k, x, y, h, o) => k.group({ x, y, r: -Math.PI / 2 }, () => doll(k, 0, 0, h, { ...o, shadow: false, arms: o.arms ?? 'down' }));
// Hai bàn tay quấn vải (đè lên tay búp bê): truyền info trả về từ ch() + tay kia lệch dx.
export function tayQuan(k, info, h, o = {}) { const { ctx } = k, r = h * 0.034; for (const [x, y] of [info.hand, ...(o.other ? [o.other] : [])]) { P(ctx, '#d8d0bc', 2, () => ctx.ellipse(x, y, r, r * 0.92, 0, 0, TAU)); ctx.strokeStyle = 'rgba(120,100,70,0.6)'; ctx.lineWidth = 1.6; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(x - r * 0.9, y + i * r * 0.4); ctx.lineTo(x + r * 0.9, y + i * r * 0.4 - r * 0.2); ctx.stroke(); } } }

// ---------- tiếng gõ: vòng sóng loang ra từ điểm gõ ----------
// times: mảng giây (thời gian cảnh) của từng tiếng gõ. o.color, o.r (bán kính cuối), o.inside (vòng mờ, lạnh hơn).
export function go(k, x, y, times, o = {}) {
  const { ctx } = k, col = o.color ?? '240,220,170';
  ctx.save();
  for (const t0 of times) { const a = k.t - t0; if (a < 0 || a > 1.6) continue; for (let j = 0; j < 3; j++) { const u = a - j * 0.12; if (u <= 0) continue; ctx.strokeStyle = `rgba(${col},${Math.max(0, (1 - u / 1.4)) * (0.75 - j * 0.2)})`; ctx.lineWidth = 6 - j * 1.5; ctx.beginPath(); ctx.arc(x, y, 30 + u * (o.r ?? 220), 0, TAU); ctx.stroke(); } }
  ctx.restore();
}

// ---------- đạo cụ ----------
// Bát men xanh sứt miệng, đáy (x, y).
export function bat(k, x, y, s = 1, o = {}) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (o.flip) ctx.scale(1, -1);
  P(ctx, '#7a9a9a', 3, () => { ctx.moveTo(-60, -50); ctx.quadraticCurveTo(-56, 6, 0, 8); ctx.quadraticCurveTo(56, 6, 60, -50); ctx.closePath(); });
  P(ctx, '#5e7e80', 2.5, () => ctx.rect(-22, 6, 44, 10));
  P(ctx, '#c8d8d0', 3, () => ctx.ellipse(0, -50, 60, 13, 0, 0, TAU));
  ctx.strokeStyle = '#3e5e62'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-50, -30); ctx.quadraticCurveTo(0, -18, 50, -30); ctx.stroke();
  // chỗ sứt
  P(ctx, '#e8e0cc', 2, () => { ctx.moveTo(26, -60); ctx.lineTo(36, -46); ctx.lineTo(46, -59); ctx.closePath(); });
  ctx.restore();
}
export function dieuCay(k, x, y, s = 1, r = -0.15) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s);
  P(ctx, '#b89a5a', 3, () => ctx.roundRect(-20, -300, 40, 300, 10)); ctx.strokeStyle = '#8a6e3a'; ctx.lineWidth = 3; for (const yy of [-240, -150, -60]) { ctx.beginPath(); ctx.moveTo(-20, yy); ctx.lineTo(20, yy); ctx.stroke(); }
  ctx.strokeStyle = LINE; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(18, -110); ctx.lineTo(56, -150); ctx.stroke(); ctx.strokeStyle = '#8a7a6a'; ctx.lineWidth = 6; ctx.stroke(); P(ctx, '#6a5a4a', 2.5, () => ctx.ellipse(58, -153, 11, 6, -0.7, 0, TAU));
  ctx.restore();
}
export function thuocLao(k, x, y, s = 1) { const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); P(ctx, '#d8c8a0', 2.5, () => ctx.rect(-50, -34, 100, 34)); ctx.fillStyle = '#7a3a2a'; ctx.font = '700 14px "Be Vietnam Pro"'; ctx.textAlign = 'center'; ctx.fillText('THUỐC LÀO', 0, -12); ctx.restore(); }
// Mùi thuốc lào: những sợi khói mảnh, uốn lượn, bay ngang.
export function khoi(k, x, y, a = 1, w = 300) {
  const { ctx } = k, t = T(k); ctx.save(); ctx.lineCap = 'round';
  for (let i = 0; i < 5; i++) { const ph = t * 0.6 + i * 1.3; ctx.strokeStyle = `rgba(214,206,190,${0.22 * a * (0.6 + 0.4 * Math.sin(ph))})`; ctx.lineWidth = 7 - i; ctx.beginPath(); for (let j = 0; j <= 20; j++) { const u = j / 20, px = x + u * w + i * 14, py = y - u * 160 - i * 18 + Math.sin(u * 7 + ph * 2 + i) * 22; j ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.restore();
}
export function chiaKhoa(k, x, y, s = 1, o = {}) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (o.string !== false) { ctx.strokeStyle = '#8a7a5a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-70, -120); ctx.quadraticCurveTo(0, -10, 70, -120); ctx.stroke(); }
  P(ctx, '#c8a24a', 2.5, () => { ctx.arc(0, -32, 14, 0, TAU); }); P(ctx, '#2c1f17', 0, () => ctx.arc(0, -32, 5, 0, TAU));
  P(ctx, '#c8a24a', 2.5, () => ctx.rect(-4, -18, 8, 50)); P(ctx, '#c8a24a', 2, () => ctx.rect(4, 18, 10, 6)); P(ctx, '#c8a24a', 2, () => ctx.rect(4, 26, 7, 5));
  ctx.restore();
}
export function tayNai(k, x, y, s = 1) { const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); P(ctx, '#7a5e44', 3, () => { ctx.moveTo(-80, 0); ctx.quadraticCurveTo(-90, -70, -30, -80); ctx.lineTo(30, -80); ctx.quadraticCurveTo(90, -70, 80, 0); ctx.closePath(); }); P(ctx, '#6a4e36', 3, () => { ctx.moveTo(-20, -80); ctx.lineTo(-34, -112); ctx.lineTo(0, -96); ctx.lineTo(34, -112); ctx.lineTo(20, -80); ctx.closePath(); }); ctx.restore(); }
// Gói lá chuối (phần cỗ để riêng).
export function goiLa(k, x, y, s = 1) { const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); P(ctx, '#5e7e3e', 3, () => ctx.roundRect(-60, -40, 120, 50, 10)); ctx.strokeStyle = '#a08a5a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-60, -15); ctx.lineTo(60, -15); ctx.moveTo(0, -40); ctx.lineTo(0, 10); ctx.stroke(); ctx.restore(); }
// Xe đạp dựng (nhìn nghiêng), bánh sau tại x.
export function xeDap(k, x, y, s = 1, o = {}) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s); const c = o.color ?? '#3a4a44';
  ctx.lineCap = 'round';
  for (const wx of [0, 230]) { ctx.strokeStyle = LINE; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(wx, -70, 68, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#4a4a4a'; ctx.lineWidth = 5; ctx.stroke(); ctx.strokeStyle = 'rgba(160,160,150,0.6)'; ctx.lineWidth = 1.5; for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; ctx.beginPath(); ctx.moveTo(wx, -70); ctx.lineTo(wx + Math.cos(a) * 64, -70 + Math.sin(a) * 64); ctx.stroke(); } }
  ctx.strokeStyle = c; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(0, -70); ctx.lineTo(90, -70); ctx.lineTo(70, -170); ctx.lineTo(0, -70); ctx.moveTo(70, -170); ctx.lineTo(200, -170); ctx.lineTo(90, -70); ctx.moveTo(200, -170); ctx.lineTo(230, -70); ctx.moveTo(200, -170); ctx.lineTo(190, -215); ctx.stroke();
  ctx.lineWidth = 8; ctx.strokeStyle = '#2c2c2c'; ctx.beginPath(); ctx.moveTo(170, -215); ctx.lineTo(215, -220); ctx.stroke();
  P(ctx, '#2c2420', 2, () => ctx.ellipse(66, -182, 28, 9, 0, 0, TAU));
  if (o.rack !== false) { ctx.strokeStyle = '#5a5a52'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-40, -140); ctx.lineTo(60, -150); ctx.moveTo(-20, -140); ctx.lineTo(0, -70); ctx.stroke(); }
  if (o.basket) { P(ctx, '#a08050', 3, () => ctx.rect(200, -260, 70, 50)); }
  ctx.restore();
}

// Ảnh thờ ông (chân dung đen trắng). (x, y) tâm khung, o.years '1925 – 1968' | '1925 – 1996'.
export function anhOng(k, x, y, s = 1, o = {}) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#3a2418', 4, () => ctx.rect(-80, -100, 160, 200)); P(ctx, '#9a9488', 2, () => ctx.rect(-64, -84, 128, 150));
  ctx.save(); ctx.beginPath(); ctx.rect(-64, -84, 128, 150); ctx.clip();
  doll(k, 0, 150, 300, { kind: 'man', skin: '#c8b8a8', hair: 'short', hairColor: '#2a2420', top: '#4a4440', topStyle: 'shirt', pants: '#333', face: 'calm', shadow: false, view: 'front' });
  ctx.restore();
  P(ctx, '#e8e0c8', 0, () => ctx.rect(-64, 70, 128, 26)); ctx.fillStyle = '#2a1c14'; ctx.font = '600 15px "Be Vietnam Pro"'; ctx.textAlign = 'center'; ctx.fillText(o.years ?? '1925 – 1968', 0, 89);
  ctx.restore();
}

// ---------- gian giữa ----------
// o.time: 'day' | 'night' | 'now'; o.door 0..1 (mở cửa, ngoài tối/sương); o.tu 0..1 (mở tủ); o.years (ảnh thờ); o.chong (chõng tre cạnh cửa); o.mist.
export const NHA = { door: 330, altar: 930, tu: 1420, buong: 1800, floor: 870, lamp: { x: 1060, y: 520 } };
export function nha(k, o = {}) {
  const { ctx, W, H } = k, dk = o.time === 'night' ? -0.1 : 0;
  ctx.fillStyle = vary(o.time === 'now' ? '#d8ccb0' : '#c4b08a', dk); ctx.fillRect(-100, -100, W + 200, NHA.floor + 100);
  ctx.save(); ctx.globalAlpha = 0.09; for (let i = 0; i < 12; i++) { ctx.fillStyle = '#5a4a2a'; ctx.beginPath(); ctx.ellipse(R(k, i + 340) * W, 60 + R(k, i + 341) * 700, 140, 60, 0, 0, TAU); ctx.fill(); } ctx.restore();
  // xà ngang + cột
  P(ctx, vary('#6a4a32', dk), 3, () => ctx.rect(-100, 70, W + 200, 44)); for (const x of [600, 1170, 1660]) P(ctx, vary('#6a4a32', dk), 3, () => ctx.rect(x - 20, 114, 40, NHA.floor - 114));
  // sàn gạch đỏ
  ctx.fillStyle = vary('#8a5a44', dk); ctx.fillRect(-100, NHA.floor, W + 200, H); ctx.strokeStyle = vary('#6e4434', dk); ctx.lineWidth = 2; for (let y = NHA.floor + 30; y < H + 40; y += 40) { ctx.beginPath(); ctx.moveTo(-100, y); ctx.lineTo(W + 100, y); ctx.stroke(); } for (let x = -60; x < W + 60; x += 90) { ctx.beginPath(); ctx.moveTo(x, NHA.floor); ctx.lineTo(x + (x - 960) * 0.18, H); ctx.stroke(); }
  P(ctx, null, 3, () => { ctx.moveTo(-100, NHA.floor); ctx.lineTo(W + 100, NHA.floor); });
  // cửa bức bàn hai cánh
  const dx0 = 140, dx1 = 520, dy0 = 220, op = o.door ?? 0;
  P(ctx, vary('#4a3222', dk), 3.5, () => ctx.rect(dx0 - 22, dy0 - 22, dx1 - dx0 + 44, NHA.floor - dy0 + 22));
  if (op > 0) {
    ctx.save(); ctx.beginPath(); ctx.rect(dx0, dy0, dx1 - dx0, NHA.floor - dy0); ctx.clip();
    const g = ctx.createLinearGradient(0, dy0, 0, NHA.floor); g.addColorStop(0, o.outside === 'day' ? '#b8c4c4' : '#1a2230'); g.addColorStop(1, o.outside === 'day' ? '#a89a7c' : '#2a3038'); ctx.fillStyle = g; ctx.fillRect(dx0, dy0, dx1 - dx0, NHA.floor - dy0);
    if (o.outside !== 'day') { ctx.fillStyle = 'rgba(200,206,210,0.22)'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(dx0 + 60 + i * 90 + Math.sin(T(k) * 0.3 + i) * 20, NHA.floor - 120 - i * 40, 160, 40, 0, 0, TAU); ctx.fill(); } }
    ctx.restore();
  }
  const pw = (dx1 - dx0) / 2, w = pw * (1 - 0.82 * op);
  for (const [x, dir] of [[dx0, 1], [dx1, -1]]) {
    const xa = dir > 0 ? x : x - w; P(ctx, vary('#6a4a30', dk), 3, () => ctx.rect(xa, dy0, w, NHA.floor - dy0));
    ctx.strokeStyle = vary('#4e3624', dk); ctx.lineWidth = 3; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(xa + (w * i) / 4, dy0 + 10); ctx.lineTo(xa + (w * i) / 4, NHA.floor - 10); ctx.stroke(); }
    if (op < 0.1) P(ctx, vary('#5a3e28', dk), 2.5, () => ctx.rect(xa + 12, dy0 + 40, w - 24, 160));
  }
  if (op < 0.05) { P(ctx, vary('#7a5a3a', dk), 3, () => ctx.rect(dx0 - 10, 560, dx1 - dx0 + 20, 26)); P(ctx, '#8a8070', 2, () => ctx.rect(dx0 + 10, 552, 30, 42)); P(ctx, '#8a8070', 2, () => ctx.rect(dx1 - 40, 552, 30, 42)); }
  P(ctx, vary('#8a6a4a', dk), 3, () => ctx.rect(dx0 - 30, NHA.floor - 16, dx1 - dx0 + 60, 26)); // bậu cửa
  // bàn thờ ông
  const ax = NHA.altar;
  if (o.time !== 'now') {
    P(ctx, vary('#8a2a1e', dk), 3, () => ctx.rect(ax - 230, 180, 460, 60)); ctx.save(); ctx.fillStyle = '#e8c46a'; ctx.font = '700 26px "Be Vietnam Pro"'; ctx.textAlign = 'center'; ctx.fillText('ĐỨC LƯU QUANG', ax, 220); ctx.restore();
    P(ctx, vary('#6a2a1e', dk), 3.5, () => ctx.rect(ax - 200, 560, 400, 26)); P(ctx, vary('#5a2018', dk), 3.5, () => ctx.rect(ax - 180, 586, 360, NHA.floor - 586));
    ctx.strokeStyle = vary('#7a3a28', dk); ctx.lineWidth = 3; ctx.beginPath(); ctx.rect(ax - 150, 620, 300, 200); ctx.stroke();
    anhOng(k, ax, 450, 0.9, { years: o.years });
    P(ctx, vary('#a08a5a', dk), 3, () => { ctx.moveTo(ax - 40, 560); ctx.lineTo(ax - 34, 524); ctx.lineTo(ax + 34, 524); ctx.lineTo(ax + 40, 560); ctx.closePath(); });
    for (let i = 0; i < 3; i++) { const x = ax - 14 + i * 14; ctx.strokeStyle = '#8a2a1a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, 524); ctx.lineTo(x - 4 + i * 4, o.incense ? 470 : 500); ctx.stroke(); if (o.incense) P(ctx, '#ff9a3c', 0, () => ctx.arc(x - 4 + i * 4, 470, 3.5, 0, TAU)); }
    for (const d of [-150, 150]) { P(ctx, vary('#c8b070', dk), 2.5, () => { ctx.moveTo(ax + d - 16, 560); ctx.lineTo(ax + d - 10, 500); ctx.lineTo(ax + d + 10, 500); ctx.lineTo(ax + d + 16, 560); ctx.closePath(); }); }
    if (o.incense) for (let i = 0; i < 3; i++) { ctx.strokeStyle = 'rgba(220,214,200,0.25)'; ctx.lineWidth = 3; ctx.beginPath(); for (let j = 0; j < 12; j++) { const yy = 466 - j * 18, xx = ax - 18 + i * 18 + Math.sin(T(k) * 1.3 + j * 0.7 + i) * (j * 1.5); j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
  }
  // cái tủ
  tu(k, NHA.tu, NHA.floor, 1, { open: o.tu ?? 0, dk, items: o.items });
  // cửa buồng + rèm
  const bx = NHA.buong; P(ctx, vary('#4a3222', dk), 3, () => ctx.rect(bx - 120, 250, 240, NHA.floor - 250)); ctx.fillStyle = '#120c08'; ctx.fillRect(bx - 100, 270, 200, NHA.floor - 270);
  const cw = o.curtain ?? 0.55; P(ctx, vary('#8a4a3a', dk), 2.5, () => { ctx.moveTo(bx - 100, 270); ctx.lineTo(bx - 100 + 200 * cw, 270); ctx.quadraticCurveTo(bx - 100 + 160 * cw, 560, bx - 100 + 200 * cw * 0.7, NHA.floor - 10); ctx.lineTo(bx - 100, NHA.floor - 10); ctx.closePath(); });
  ctx.fillStyle = 'rgba(232,200,150,0.35)'; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(bx - 90 + R(k, i + 900) * 180 * cw * 0.8, 300 + R(k, i + 901) * 540, 5, 0, TAU); ctx.fill(); }
  // chõng tre
  if (o.chong) { P(ctx, vary('#b09a5a', dk), 3, () => ctx.rect(560, 900, 420, 40)); ctx.strokeStyle = vary('#8a7440', dk); ctx.lineWidth = 3; for (let x = 570; x < 980; x += 20) { ctx.beginPath(); ctx.moveTo(x, 900); ctx.lineTo(x, 940); ctx.stroke(); } for (const x of [580, 950]) P(ctx, vary('#8a7440', dk), 3, () => ctx.rect(x, 940, 18, 90)); }
  if (o.time === 'now') { // 2026: bóng đèn, lịch, quạt
    ctx.strokeStyle = LINE; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ax, 114); ctx.lineTo(ax, 230); ctx.stroke(); P(ctx, '#f4ecd0', 2.5, () => ctx.ellipse(ax, 250, 22, 28, 0, 0, TAU));
    P(ctx, '#f0ece0', 2.5, () => ctx.rect(ax - 70, 380, 140, 180)); P(ctx, '#b03028', 0, () => ctx.rect(ax - 70, 380, 140, 40)); ctx.save(); ctx.fillStyle = '#fff'; ctx.font = '700 24px "Be Vietnam Pro"'; ctx.textAlign = 'center'; ctx.fillText('2026', ax, 410); ctx.fillStyle = '#b03028'; ctx.font = '800 70px "Be Vietnam Pro"'; ctx.fillText('19', ax, 510); ctx.restore();
    P(ctx, '#5a4a3a', 3, () => ctx.rect(ax - 260, 640, 520, 26)); for (const x of [ax - 240, ax + 220]) P(ctx, '#4a3a2a', 3, () => ctx.rect(x, 666, 20, NHA.floor - 666));
  }
}

// Cái tủ gỗ mít hai cánh. (x, yĐáy), cao ~690·s. o.open 0..1, o.items (true: đồ của ông), o.dent (sáng chỗ gỗ mòn 0..1).
export function tu(k, x, y, s = 1, o = {}) {
  const { ctx } = k, dk = o.dk ?? 0, op = o.open ?? 0; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const w = 380, h = 650, top = -h - 40;
  P(ctx, vary('#7a4e2a', dk), 3.5, () => ctx.rect(-w / 2 - 14, top - 30, w + 28, 34)); // diềm trên
  P(ctx, vary('#8a5a30', dk), 3.5, () => ctx.rect(-w / 2, top, w, h)); for (const d of [-w / 2 + 10, w / 2 - 30]) P(ctx, vary('#6a4222', dk), 3, () => ctx.rect(d, -40, 20, 40));
  // trong tủ
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2 + 12, top + 12, w - 24, h - 24); ctx.clip();
  ctx.fillStyle = vary('#2a1c12', dk); ctx.fillRect(-w / 2, top, w, h);
  P(ctx, vary('#6a4222', dk), 2.5, () => ctx.rect(-w / 2, top + 200, w, 14));
  if (o.items !== false) {
    // nón trên ngăn trên
    P(ctx, vary('#c8b070', dk), 2.5, () => { ctx.moveTo(-150, top + 196); ctx.quadraticCurveTo(-70, top + 120, -40, top + 110); ctx.quadraticCurveTo(-10, top + 120, 70, top + 196); ctx.closePath(); });
    bat(k, 120, top + 196, 0.75);
    // áo bông treo
    P(ctx, vary('#4a4038', dk), 3, () => { ctx.moveTo(-160, top + 250); ctx.lineTo(-30, top + 250); ctx.lineTo(-10, top + 320); ctx.lineTo(-40, top + 330); ctx.lineTo(-44, top + 520); ctx.lineTo(-146, top + 520); ctx.lineTo(-150, top + 330); ctx.lineTo(-180, top + 320); ctx.closePath(); });
    ctx.strokeStyle = vary('#3a3028', dk); ctx.lineWidth = 2; for (let yy = top + 280; yy < top + 520; yy += 30) { ctx.beginPath(); ctx.moveTo(-146, yy); ctx.lineTo(-44, yy); ctx.stroke(); }
    dieuCay(k, 120, top + h - 24, 0.95, -0.12);
    so(k, 20, top + h - 40, 0.34, { closed: true });
    thuocLao(k, 30, top + h - 82, 0.9);
    if (o.nai) tayNai(k, 60, top + h - 120, 0.8);
  }
  ctx.restore();
  // hai cánh: xoay quanh bản lề; quá 90° thì cánh ra ngoài thân tủ, thấy mặt trong
  const ang = op * Math.PI * 0.62;
  for (const dir of [-1, 1]) {
    const hinge = dir * w / 2, free = hinge - dir * (w / 2) * Math.cos(ang), ext = Math.sin(ang) * 34, inner = ang > Math.PI / 2;
    P(ctx, vary(inner ? '#a8784a' : '#8a5a30', dk), 3, () => { ctx.moveTo(hinge, top); ctx.lineTo(free, top - ext); ctx.lineTo(free, top + h + ext); ctx.lineTo(hinge, top + h); ctx.closePath(); });
    const dw = Math.abs(free - hinge), xa = Math.min(free, hinge);
    if (!inner && dw > 60) { P(ctx, null, 2.5, () => ctx.rect(xa + 24 * dw / 190, top + 40, dw - 48 * dw / 190, 250), vary('#5e3a1e', dk)); P(ctx, null, 2.5, () => ctx.rect(xa + 24 * dw / 190, top + 340, dw - 48 * dw / 190, 260), vary('#5e3a1e', dk)); }
    if (inner && dir < 0 && o.dent != null) { // mặt trong cánh trái: chỗ gỗ mòn nhẵn ngang tầm người ngồi
      const cx = hinge + (free - hinge) * 0.55, cy = top + 430, a = o.dent;
      ctx.save(); ctx.globalAlpha = 0.55 + 0.45 * a; P(ctx, vary('#d0a468', dk), 0, () => ctx.ellipse(cx, cy, 12, 18, 0, 0, TAU)); P(ctx, vary('#7a5230', dk), 1.5, () => ctx.ellipse(cx + 2, cy + 3, 7, 12, 0, 0, TAU)); ctx.restore();
    }
  }
  if (op < 0.05) { P(ctx, '#c8a24a', 2.5, () => ctx.rect(-18, top + 300, 36, 50)); P(ctx, '#2c1f17', 0, () => ctx.rect(-3, top + 316, 6, 18)); }
  ctx.restore();
}
// Cái tủ nhìn gần (toàn khung). o.open, o.items, o.dent, o.nai.
export function tuGan(k, o = {}) {
  const { ctx, W, H } = k; ctx.fillStyle = '#b8a47e'; ctx.fillRect(-100, -100, W + 200, H + 200);
  ctx.fillStyle = '#7a5040'; ctx.fillRect(-100, 1010, W + 200, 200);
  tu(k, 960, 1050, 1.42, { open: o.open ?? 0, items: o.items, dent: o.dent, nai: o.nai });
}
// Cửa gỗ nhìn từ trong (toàn khung). o.open 0..1 (ngoài sân sương), o.bar (then cài, mặc định khi đóng).
export const CUA = { knock: { x: 960, y: 470 }, x0: 380, x1: 1540 };
export function cua(k, o = {}) {
  const { ctx, W, H } = k, op = o.open ?? 0; ctx.fillStyle = '#b8a47e'; ctx.fillRect(-100, -100, W + 200, H + 200);
  ctx.fillStyle = '#7a5040'; ctx.fillRect(-100, 1000, W + 200, 200);
  P(ctx, '#4a3222', 4, () => ctx.rect(CUA.x0 - 40, 0, CUA.x1 - CUA.x0 + 80, 1000));
  if (op > 0) { const g = ctx.createLinearGradient(0, 0, 0, 1000); g.addColorStop(0, '#1a2230'); g.addColorStop(1, '#34383c'); ctx.fillStyle = g; ctx.fillRect(CUA.x0, 0, CUA.x1 - CUA.x0, 1000); ctx.fillStyle = 'rgba(210,214,216,0.25)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(CUA.x0 + 100 + i * 190 + Math.sin(T(k) * 0.3 + i) * 30, 760 - (i % 3) * 90, 260, 60, 0, 0, TAU); ctx.fill(); } }
  const pw = (CUA.x1 - CUA.x0) / 2, w = pw * (1 - 0.86 * op);
  for (const [x, dir] of [[CUA.x0, 1], [CUA.x1, -1]]) {
    const xa = dir > 0 ? x : x - w; P(ctx, '#6a4a30', 3.5, () => ctx.rect(xa, 0, w, 1000));
    ctx.strokeStyle = '#4e3624'; ctx.lineWidth = 4; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(xa + (w * i) / 5, 0); ctx.lineTo(xa + (w * i) / 5, 1000); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(40,26,16,0.35)'; ctx.lineWidth = 2; for (let i = 0; i < 18; i++) { const yy = R(k, i + 70 + (dir > 0 ? 0 : 40)) * 1000; ctx.beginPath(); ctx.moveTo(xa + 8, yy); ctx.quadraticCurveTo(xa + w / 2, yy + 10, xa + w - 8, yy); ctx.stroke(); }
  }
  // khe giữa hai cánh
  if (op === 0) { ctx.fillStyle = '#0c0806'; ctx.fillRect(957, 0, 6, 1000); }
  if (op === 0 && o.bar !== false) { P(ctx, '#7a5a3a', 3.5, () => ctx.rect(CUA.x0 + 40, 620, CUA.x1 - CUA.x0 - 80, 44)); for (const x of [CUA.x0 + 60, CUA.x1 - 110]) P(ctx, '#8a8070', 3, () => ctx.rect(x, 600, 50, 84)); }
  P(ctx, '#8a6a4a', 3, () => ctx.rect(CUA.x0 - 60, 980, CUA.x1 - CUA.x0 + 120, 40));
}

// ---------- buồng: giường + màn ----------
// fn(): vẽ người nằm trên giường (trước khi phủ màn). o.net (độ mờ màn, mặc định 1), o.now (2026).
export const BUONG = { bed: { x0: 560, x1: 1640, y: 760 }, door: 230 };
export function buong(k, o = {}, fn) {
  const { ctx, W, H } = k;
  ctx.fillStyle = o.now ? '#cfc4aa' : '#b8a47e'; ctx.fillRect(-100, -100, W + 200, H + 200);
  ctx.save(); ctx.globalAlpha = 0.1; for (let i = 0; i < 10; i++) { ctx.fillStyle = '#5a4a2a'; ctx.beginPath(); ctx.ellipse(R(k, i + 140) * W, 100 + R(k, i + 141) * 600, 140, 60, 0, 0, TAU); ctx.fill(); } ctx.restore();
  ctx.fillStyle = '#7a5040'; ctx.fillRect(-100, 900, W + 200, 300);
  // cửa buồng (rèm) bên trái
  P(ctx, '#4a3222', 3, () => ctx.rect(BUONG.door - 130, 200, 260, 700)); ctx.fillStyle = '#100a06'; ctx.fillRect(BUONG.door - 110, 220, 220, 680);
  if (o.curtain !== false) P(ctx, '#8a4a3a', 2.5, () => { ctx.moveTo(BUONG.door - 110, 220); ctx.lineTo(BUONG.door + 20, 220); ctx.quadraticCurveTo(BUONG.door - 10, 560, BUONG.door - 20, 890); ctx.lineTo(BUONG.door - 110, 890); ctx.closePath(); });
  if (o.doorFn) o.doorFn();
  // giường
  const b = BUONG.bed; P(ctx, '#6a4a30', 3.5, () => ctx.rect(b.x0 - 20, b.y - 180, 34, 360)); P(ctx, '#6a4a30', 3.5, () => ctx.rect(b.x1 - 14, b.y - 180, 34, 360));
  P(ctx, '#7a5a3a', 3.5, () => ctx.rect(b.x0, b.y, b.x1 - b.x0, 46)); for (const x of [b.x0 + 20, b.x1 - 50]) P(ctx, '#5a3e28', 3, () => ctx.rect(x, b.y + 46, 30, 120));
  P(ctx, '#d8c08a', 2, () => ctx.rect(b.x0 + 10, b.y - 14, b.x1 - b.x0 - 20, 16));
  if (fn) fn();
  // màn
  const na = o.net ?? 1; if (na > 0) {
    ctx.save(); ctx.globalAlpha = 0.28 * na; P(ctx, '#e8e4dc', 0, () => { ctx.moveTo(b.x0 - 10, b.y + 4); ctx.lineTo(b.x0 + 20, 180); ctx.lineTo(b.x1 - 20, 180); ctx.lineTo(b.x1 + 10, b.y + 4); ctx.closePath(); }); ctx.restore();
    ctx.save(); ctx.globalAlpha = 0.5 * na; ctx.strokeStyle = '#efe8dc'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(b.x0 - 10, b.y + 4); ctx.lineTo(b.x0 + 20, 180); ctx.lineTo(b.x1 - 20, 180); ctx.lineTo(b.x1 + 10, b.y + 4); ctx.stroke(); ctx.globalAlpha = 0.12 * na; ctx.lineWidth = 1; for (let x = b.x0; x < b.x1; x += 14) { ctx.beginPath(); ctx.moveTo(x, 180); ctx.lineTo(x, b.y); ctx.stroke(); } ctx.restore();
  }
  if (o.tu) tu(k, 1820, 900, 0.85, { items: false });
}
// Chăn bông đắp (vẽ đè lên người nằm). (x0..x1) dọc giường, y mặt giường.
export function chan(k, x0, x1, y, o = {}) { const { ctx } = k; P(ctx, o.color ?? '#8a5a5a', 3, () => { ctx.moveTo(x0, y - 4); ctx.quadraticCurveTo(x0 + 10, y - 66, x0 + 60, y - 70); ctx.lineTo(x1 - 40, y - 64); ctx.quadraticCurveTo(x1, y - 50, x1, y - 4); ctx.closePath(); }); ctx.strokeStyle = 'rgba(60,30,30,0.35)'; ctx.lineWidth = 2; for (let x = x0 + 60; x < x1 - 30; x += 50) { ctx.beginPath(); ctx.moveTo(x, y - 66); ctx.lineTo(x + 10, y - 6); ctx.stroke(); } }

// ---------- giấy tờ ----------
// Giấy báo tử đánh máy. n: số dòng đã hiện (0..), o.hi: dòng được tô vàng.
export const GBT = ['KHU ĐIỀU TRỊ PHONG BÃI ỔI', 'GIẤY BÁO TỬ', 'Họ và tên: NGUYỄN VĂN KHANG', 'Năm sinh: 1925', 'Quê quán: xã Đông Lâm, Hải Dương', 'Từ trần hồi: 1 giờ sáng', 'ngày 14 tháng 11 năm 1996'];
export function giayBaoTu(k, n = 7, o = {}) {
  const { ctx, W, H } = k; ctx.fillStyle = o.bg ?? '#1a130d'; ctx.fillRect(-100, -100, W + 200, H + 200);
  ctx.save(); ctx.translate(960, 540); ctx.rotate(-0.02);
  P(ctx, '#e4dcc4', 3, () => ctx.rect(-430, -470, 860, 940));
  ctx.strokeStyle = 'rgba(120,100,70,0.25)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-430, -10); ctx.lineTo(430, 0); ctx.moveTo(0, -470); ctx.lineTo(-6, 470); ctx.stroke();
  for (let i = 0; i < Math.min(n, GBT.length); i++) {
    const y = [-370, -270, -130, -50, 30, 150, 220][i], big = i < 2;
    if (o.hi?.includes(i)) { ctx.fillStyle = 'rgba(232,180,80,0.35)'; ctx.fillRect(-380, y - 40, 760, 54); }
    ctx.fillStyle = '#1e2430'; ctx.font = TYPE(big ? 38 : 34, big ? 700 : 500); ctx.textAlign = big ? 'center' : 'left'; ctx.fillText(GBT[i], big ? 0 : -360, y);
  }
  if (n >= 7) { ctx.save(); ctx.translate(230, 360); ctx.rotate(-0.2); ctx.strokeStyle = 'rgba(170,40,30,0.7)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, 80, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 62, 0, TAU); ctx.stroke(); ctx.fillStyle = 'rgba(170,40,30,0.7)'; ctx.font = '700 18px "Be Vietnam Pro"'; ctx.textAlign = 'center'; ctx.fillText('BÃI ỔI', 0, 6); ctx.restore(); }
  ctx.restore();
}
// Cuốn sổ bìa xanh. o.closed: chỉ vẽ bìa (x, y là đáy), s nhỏ. Mở: toàn khung, o.lines [[ngày, chữ]], o.n số dòng hiện, o.shaky dòng cuối run.
export function so(k, x, y, s = 1, o = {}) {
  const { ctx } = k;
  if (o.closed) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); P(ctx, '#3e6a6a', 4, () => ctx.rect(-120, -40, 240, 40)); P(ctx, '#e8e0c8', 0, () => ctx.rect(-112, -14, 228, 8)); ctx.restore(); return; }
  const { W, H } = k; ctx.fillStyle = o.bg ?? '#1a130d'; ctx.fillRect(-100, -100, W + 200, H + 200);
  ctx.save(); ctx.translate(960, 540); ctx.rotate(-0.015);
  P(ctx, '#3e6a6a', 4, () => ctx.rect(-760, -440, 1520, 880));
  P(ctx, '#ece4cc', 3, () => ctx.rect(-730, -420, 720, 840)); P(ctx, '#ece4cc', 3, () => ctx.rect(10, -420, 720, 840));
  ctx.strokeStyle = 'rgba(90,120,150,0.3)'; ctx.lineWidth = 2; for (const px of [-730, 10]) for (let yy = -360; yy < 400; yy += 56) { ctx.beginPath(); ctx.moveTo(px + 20, yy); ctx.lineTo(px + 700, yy); ctx.stroke(); }
  const L = o.lines ?? [], n = o.n ?? L.length, ROWS = 13;
  const out = []; ctx.font = HAND(32);
  for (let i = 0; i < Math.min(n, L.length); i++) {
    const [d, txt] = L[i]; out.push([d, HAND(27), 0, i]);
    let line = ''; for (const w of txt.split(' ')) { const t2 = line ? line + ' ' + w : w; if (ctx.measureText(t2).width > 620) { out.push([line, HAND(32), 24, i]); line = w; } else line = t2; }
    if (line) out.push([line, HAND(32), 24, i]);
  }
  const skip = Math.max(0, out.length - ROWS * 2);
  out.slice(skip).forEach(([t, font, ind, i], row) => {
    const page = row < ROWS ? 0 : 1, r = row % ROWS, px = page ? 40 : -700, y = -364 + r * 56, last = o.shaky && i === L.length - 1;
    if (o.hi === i) { ctx.fillStyle = 'rgba(232,180,80,0.3)'; ctx.fillRect(px - 6, y - 38, 690, 54); }
    ctx.save(); ctx.translate(px + ind, y); if (last) ctx.rotate(0.04 * Math.sin(row * 3)); ctx.fillStyle = 'rgba(36,48,84,0.95)'; ctx.font = font; ctx.textAlign = 'left'; ctx.fillText(t, last ? Math.sin(row) * 4 : 0, 0); ctx.restore();
  });
  ctx.restore();
}
// Bức điện tín.
export function dienTin(k, o = {}) {
  const { ctx, W, H } = k; ctx.fillStyle = '#1a130d'; ctx.fillRect(-100, -100, W + 200, H + 200);
  ctx.save(); ctx.translate(960, 540); ctx.rotate(0.02);
  P(ctx, '#dcd4b8', 3, () => ctx.rect(-560, -260, 1120, 520)); P(ctx, '#c84a3a', 0, () => ctx.rect(-560, -260, 1120, 70)); ctx.fillStyle = '#fff'; ctx.font = '800 38px "Be Vietnam Pro"'; ctx.textAlign = 'center'; ctx.fillText('ĐIỆN BÁO', 0, -210);
  ctx.fillStyle = '#2a2a2a'; ctx.font = TYPE(28); ctx.textAlign = 'left'; ctx.fillText('Gửi: Nguyễn Văn Thắng', -500, -120); ctx.fillText('Mỏ than Cẩm Phả, Quảng Ninh', -500, -76);
  P(ctx, '#f2ecd8', 2, () => ctx.rect(-500, -20, 1000, 150)); const txt = 'ANH THẮNG VỀ NGAY STOP CHUYỆN CỦA BỐ STOP THOA'; ctx.fillStyle = '#1e2430'; ctx.font = TYPE(36, 700); const nch = Math.floor((o.p ?? 1) * txt.length), cut = 'ANH THẮNG VỀ NGAY STOP '.length; ctx.fillText(txt.slice(0, Math.min(cut, nch)), -470, 40); if (nch > cut) ctx.fillText(txt.slice(cut, nch), -470, 100);
  ctx.fillStyle = '#5a5a5a'; ctx.font = TYPE(22); ctx.fillText('Bưu điện xã Đông Lâm · 19.11.1996', -500, 210);
  ctx.restore();
}

// ---------- trại phong ----------
const SKY = { day: ['#b8c8cc', '#e8dcc0'], dusk: ['#a07a5a', '#e0b07a'], dawn: ['#7a8a9a', '#d8c4a8'] };
function sky(k, time, h = 640) { const { ctx, W } = k, c = SKY[time] ?? SKY.day, g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, c[0]); g.addColorStop(1, c[1]); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, h + 100); }
function bang(k, x, y, s = 1) { const { ctx } = k, t = T(k); P(ctx, '#5a4434', 3, () => { ctx.moveTo(x - 20 * s, y); ctx.lineTo(x - 12 * s, y - 260 * s); ctx.lineTo(x + 12 * s, y - 260 * s); ctx.lineTo(x + 20 * s, y); ctx.closePath(); }); for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) P(ctx, j % 2 ? '#5e7a3e' : '#6e8a46', 0, () => ctx.ellipse(x + (i - 1) * 110 * s + Math.sin(t * 0.5 + i + j) * 3, y - (240 + j * 60) * s, 120 * s, 34 * s, 0, 0, TAU)); }
export const TRAI = { ground: 880 };
export function trai(k, o = {}) {
  const { ctx, W, H } = k; sky(k, o.time ?? 'day', 700);
  P(ctx, '#7f8a4a', 0, () => ctx.rect(-100, 640, W + 200, 260));
  for (const [x0, y0, w] of [[-60, 470, 900], [1060, 470, 980]]) {
    P(ctx, '#e0c878', 3, () => ctx.rect(x0, y0, w, 260)); P(ctx, '#8a4a36', 3, () => { ctx.moveTo(x0 - 40, y0 + 6); ctx.lineTo(x0 + 40, y0 - 70); ctx.lineTo(x0 + w - 40, y0 - 70); ctx.lineTo(x0 + w + 40, y0 + 6); ctx.closePath(); });
    for (let x = x0 + 70; x < x0 + w - 60; x += 180) { P(ctx, '#4a3a2a', 3, () => ctx.rect(x, y0 + 90, 70, 170)); P(ctx, '#3e5a5a', 2.5, () => ctx.rect(x + 90, y0 + 90, 60, 60)); }
    P(ctx, '#b0a080', 3, () => ctx.rect(x0 - 20, y0 + 250, w + 40, 24));
  }
  // cổng + biển
  P(ctx, '#d8d0c0', 3, () => ctx.rect(880, 380, 30, 380)); P(ctx, '#d8d0c0', 3, () => ctx.rect(1030, 380, 30, 380)); P(ctx, '#3e5a7a', 3, () => ctx.rect(760, 330, 420, 70)); ctx.save(); ctx.fillStyle = '#f0e8d0'; ctx.font = '700 24px "Be Vietnam Pro"'; ctx.textAlign = 'center'; ctx.fillText('KHU ĐIỀU TRỊ PHONG BÃI ỔI', 970, 374); ctx.restore();
  P(ctx, '#b09a74', 3, () => ctx.rect(-100, 760, W + 200, H)); ctx.strokeStyle = '#94805e'; ctx.lineWidth = 3; for (let i = 0; i < 20; i++) { const x = R(k, i + 410) * W, y = 790 + R(k, i + 411) * 260; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 50, y); ctx.stroke(); }
  for (const x of [400, 1500]) bang(k, x, 780, 1);
}
// Rổ tre đang đan.
export function ro(k, x, y, s = 1) { const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); P(ctx, '#c8a868', 3, () => { ctx.moveTo(-60, -50); ctx.quadraticCurveTo(-56, 0, 0, 2); ctx.quadraticCurveTo(56, 0, 60, -50); ctx.closePath(); }); ctx.strokeStyle = '#9a7a40'; ctx.lineWidth = 2; for (let i = -50; i <= 50; i += 14) { ctx.beginPath(); ctx.moveTo(i, -50); ctx.lineTo(i * 0.7, 0); ctx.stroke(); } for (let j = -40; j < 0; j += 12) { ctx.beginPath(); ctx.moveTo(-58, j); ctx.lineTo(58, j); ctx.stroke(); } ctx.restore(); }
// Nghĩa trang sau trại: các nấm mộ đất + biển gỗ; mộ mới ở giữa (x 960).
export const NT = { x: 960, y: 860 };
export function nghiaTrai(k, o = {}) {
  const { ctx, W, H } = k; sky(k, o.time ?? 'day', 640);
  P(ctx, '#8a8a5a', 0, () => ctx.rect(-100, 560, W + 200, 100)); for (const x of [200, 1700]) bang(k, x, 640, 0.8);
  P(ctx, '#7c8448', 3, () => { ctx.moveTo(-100, 640); ctx.quadraticCurveTo(900, 610, W + 100, 640); ctx.lineTo(W + 100, H + 100); ctx.lineTo(-100, H + 100); ctx.closePath(); });
  for (const [x, y, s] of [[260, 700, 0.6], [520, 690, 0.6], [1380, 690, 0.6], [1640, 700, 0.6], [180, 820, 0.85], [1760, 830, 0.85], [560, 790, 0.75], [1360, 790, 0.75]]) mo(k, x, y, s, false);
  mo(k, NT.x, NT.y, 1.1, true);
}
export function mo(k, x, y, s = 1, fresh = false) {
  const { ctx } = k; P(ctx, fresh ? '#8a6a48' : '#7a7a50', 3, () => { ctx.moveTo(x - 150 * s, y); ctx.quadraticCurveTo(x, y - 110 * s, x + 150 * s, y); ctx.closePath(); });
  P(ctx, '#c8b890', 2.5, () => ctx.rect(x - 8 * s, y - 230 * s, 16 * s, 160 * s)); P(ctx, '#d8ccaa', 2.5, () => ctx.rect(x - 50 * s, y - 250 * s, 100 * s, 80 * s));
  if (fresh) { ctx.save(); ctx.fillStyle = '#f2ecda'; ctx.font = `700 ${13 * s}px "Be Vietnam Pro"`; ctx.textAlign = 'center'; ctx.fillText('NGUYỄN VĂN KHANG', x, y - 218 * s); ctx.fillText('1925 – 1996', x, y - 194 * s); ctx.fillStyle = '#2a1c14'; ctx.fillText('NGUYỄN VĂN KHANG', x, y - 218 * s); ctx.fillText('1925 – 1996', x, y - 194 * s); ctx.restore(); }
}
