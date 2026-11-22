// Nhân Gian Chưa Kể — tập Nu Na Nu Nống (19/11/2026): bộ cảnh hiên đình làng ven sông 1994 + nhân vật búp bê.
// Cảnh: dinh (hiên đình nhìn chính diện), kho (gian kho cạnh đình), chieuGan (hàng bàn chân trên chiếu, nhìn từ trên), chanChan (cuối chăn).
// Đạo cụ: banChan, dauChan4, chieu, anhNhaTre, tayNai, toiGao, banTayDap, notRuoi.
import { doll, sepia } from '/channel/nhan-gian-doll.js';
import { vary } from '/channel/nhan-gian-hd.js';
import { bamboo, LINE } from '/channel/nhan-gian-cauco.js';

const T = (k) => k.gt ?? 0;
const R = (k, i) => k.rand(i);
const TAU = Math.PI * 2;
function P(ctx, fill, lw, fn, stroke = LINE) { ctx.beginPath(); fn(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
const DK = { day: 0, dusk: -0.14, night: -0.55, dawn: -0.22 };

// ---------- nhân vật ----------
export const TOI = { kind: 'kid', skin: '#e8c09c', hair: 'short', hairColor: '#1e1610', top: '#5f7f8e', topStyle: 'tee', sleeve: 'short', pants: '#3a4250', shoes: '#6a5a4a' };
export const COI = { kind: 'kid', skin: '#c8966e', hair: 'buzz', hairColor: '#241a12', top: '#a8b0a0', topStyle: 'tee', sleeve: 'short', pants: '#3a4a5a', shoes: '#5a4a3a' };
export const BIN = { kind: 'kid', skin: '#e0b48e', hair: 'spiky', hairColor: '#1e1610', top: '#b07a5a', topStyle: 'tee', sleeve: 'short', pants: '#3a3a44', shoes: '#5a4a3a' };
export const MAN = { kind: 'kid', skin: '#ecc8a4', hair: 'bun', hairColor: '#1e1610', top: '#b88aa0', topStyle: 'canh', pants: '#33333c', shoes: '#7a5a5a' };
export const LY = { kind: 'kid', skin: '#f0d0b0', hair: 'long', hairColor: '#1e1610', top: '#8aa07a', topStyle: 'canh', pants: '#3a3440', shoes: '#6a4a4a' };
export const ME = { kind: 'woman', skin: '#dcb28e', hair: 'bun', hairColor: '#241a12', top: '#7a6e86', topStyle: 'canh', pants: '#23211f', shoes: '#5a4a3a' };
export const ME_NHO = { kind: 'kid', skin: '#dcb28e', hair: 'bun', hairColor: '#241a12', top: '#c8b48e', topStyle: 'canh', pants: '#3a3a3a', shoes: '#dcb28e' };
export const BA_CAM = { kind: 'old', skin: '#c8a688', hair: 'bun', hairColor: '#9a948a', top: '#5e564a', topStyle: 'baba', pants: '#2a2622', shoes: '#c8a688', hat: 'khan', hatColor: '#4a443c' };
export const CO_NHAN = { kind: 'woman', skin: '#e2be98', hair: 'bun', hairColor: '#1e1610', top: '#e8e2d0', topStyle: 'canh', pants: '#2a2a30', shoes: '#5a4a3a' };
export const BA_HAO = { kind: 'woman', skin: '#d0a27c', hair: 'bun', hairColor: '#5a5048', top: '#5a4a3a', topStyle: 'canh', pants: '#23211f', shoes: '#4a3a2a', hat: 'khan', hatColor: '#2e2a26' };
export const ONG_TU = { kind: 'old', skin: '#c89c7c', hair: 'bald', hairColor: '#9a9088', top: '#463c32', topStyle: 'baba', pants: '#2a2622', shoes: '#3a3028' };
export const BON = [COI, BIN, MAN, LY];
export const ch = (k, x, y, h, o) => doll(k, x, y, h, o);
// Nốt ruồi to ở cằm (mẹ): gọi sau khi vẽ doll, info = giá trị doll() trả về, h = chiều cao đã dùng.
export function notRuoi(k, info, h, o = {}) { const { ctx } = k; ctx.fillStyle = '#2a1c14'; ctx.beginPath(); ctx.arc(info.head[0] + (o.dx ?? 0.03) * h, info.head[1] + (o.dy ?? 0.205) * h, Math.max(2.5, h * 0.012), 0, TAU); ctx.fill(); }

// ---------- bàn chân nhìn từ phía gan bàn chân (ngón chĩa lên) ----------
// o.right (mặc định) / o.left; o.four = mất ngón út, có sẹo; o.old = nứt nẻ; o.cold = tái lạnh; o.wet = bóng nước. Gót tại (x, y).
export function banChan(k, x, y, s = 1, o = {}) {
  const { ctx } = k, dir = o.left ? -1 : 1, skin = o.cold ? '#b9bfbf' : (o.skin ?? '#e8c09c'), t = T(k);
  ctx.save(); ctx.translate(x, y); ctx.scale(dir * s, s); ctx.rotate(o.r ?? 0);
  if (o.cold) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(0, -110, 20, 0, -110, 190); g.addColorStop(0, `rgba(150,180,200,${0.14 + Math.sin(t * 2) * 0.04})`); g.addColorStop(1, 'rgba(150,180,200,0)'); ctx.fillStyle = g; ctx.fillRect(-200, -320, 400, 400); ctx.restore(); }
  const sole = () => { ctx.moveTo(-6, 0); ctx.bezierCurveTo(-46, 0, -52, -60, -50, -110); ctx.bezierCurveTo(-48, -160, -62, -190, -56, -206); ctx.lineTo(48, -206); ctx.bezierCurveTo(56, -170, 40, -130, 36, -90); ctx.bezierCurveTo(34, -40, 34, 0, -6, 0); ctx.closePath(); };
  P(ctx, skin, 4, sole);
  // ngón: ngón cái bên trái (chân phải nhìn từ gan bàn chân)
  const toes = [[-34, -226, 21, 27], [-6, -232, 14, 18], [16, -228, 12, 16], [34, -220, 11, 14], [48, -208, 10, 12]];
  toes.forEach(([tx, ty, rx, ry], i) => { if (o.four && i === 4) return; P(ctx, vary(skin, 0.03), 3.5, () => ctx.ellipse(tx, ty, rx, ry, 0, 0, TAU)); });
  if (o.four) { ctx.strokeStyle = vary(skin, -0.3); ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(40, -206); for (let i = 1; i < 6; i++) ctx.lineTo(40 + (i % 2 ? 8 : -2), -206 + i * 9); ctx.stroke(); }
  // gan bàn chân, nếp
  ctx.fillStyle = vary(skin, -0.08); ctx.beginPath(); ctx.ellipse(-8, -40, 28, 30, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(-4, -170, 40, 22, 0, 0, TAU); ctx.fill();
  if (o.old) { ctx.strokeStyle = vary(skin, -0.32); ctx.lineWidth = 2.4; for (let i = 0; i < 7; i++) { const cx = -30 + R(k, i + 50) * 56, cy = -10 - R(k, i + 60) * 50; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + (R(k, i + 70) - 0.5) * 18, cy - 10 - R(k, i + 80) * 14); ctx.stroke(); } }
  if (o.wet) { ctx.fillStyle = 'rgba(220,236,246,0.5)'; ctx.beginPath(); ctx.ellipse(-24, -120, 6, 16, 0.2, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(18, -60, 4, 10, 0, 0, TAU); ctx.fill(); }
  ctx.restore();
}
// Dấu chân ướt bốn ngón trên bùn/cát/hiên. pts = [[x, y, r]...]
export function dauChan4(k, pts, o = {}) {
  const { ctx } = k; ctx.fillStyle = o.color ?? 'rgba(30,34,40,0.6)';
  pts.forEach(([x, y, r = 0], i) => { ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(o.s ?? 1, (o.s ?? 1) * (o.flat ?? 0.5)); ctx.beginPath(); ctx.ellipse(0, 0, 22, 46, 0, 0, TAU); ctx.fill(); const left = i % 2 === 1; for (let t = 0; t < (left ? 5 : 4); t++) { ctx.beginPath(); ctx.arc((left ? 1 : -1) * (14 - t * 8), -58 + Math.abs(t - 1) * 3, 7 - t * 0.7, 0, TAU); ctx.fill(); } ctx.restore(); });
}
// Chiếu cói trải nền (hình thang phối cảnh).
export function chieu(k, x0, x1, y0, y1, o = {}) {
  const { ctx } = k, dk = o.dk ?? 0, sk = o.skew ?? 60;
  P(ctx, vary('#c8ac72', dk), 3, () => { ctx.moveTo(x0 + sk, y0); ctx.lineTo(x1 - sk, y0); ctx.lineTo(x1, y1); ctx.lineTo(x0, y1); ctx.closePath(); });
  ctx.save(); ctx.beginPath(); ctx.moveTo(x0 + sk, y0); ctx.lineTo(x1 - sk, y0); ctx.lineTo(x1, y1); ctx.lineTo(x0, y1); ctx.closePath(); ctx.clip();
  ctx.strokeStyle = vary('#a88c56', dk); ctx.lineWidth = 2; for (let x = x0 - 40; x < x1 + 40; x += 16) { ctx.beginPath(); ctx.moveTo(x + (960 - x) * 0.05, y0); ctx.lineTo(x, y1); ctx.stroke(); }
  if (o.old) { ctx.fillStyle = 'rgba(80,60,30,0.25)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(x0 + R(k, i + 140) * (x1 - x0), y0 + R(k, i + 141) * (y1 - y0), 60, 20, 0, 0, TAU); ctx.fill(); } }
  ctx.strokeStyle = vary('#8a2e26', dk); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x0 + 10, y1 - 12); ctx.lineTo(x1 - 10, y1 - 12); ctx.stroke();
  ctx.restore();
}

// ---------- hiên đình, nhìn chính diện ----------
export const DINH = { floor: 760, cot: [250, 1670], goc: 1560 };
export function dinh(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'day', dk = DK[time];
  // vách cửa bức bàn sơn son đã bạc
  ctx.fillStyle = vary('#6a3a2a', dk); ctx.fillRect(-100, -100, W + 200, DINH.floor + 100);
  for (let i = 0; i < 8; i++) { const x = 60 + i * 230; P(ctx, vary('#7a4430', dk), 3, () => ctx.rect(x, 130, 210, DINH.floor - 150)); P(ctx, vary('#5e3324', dk), 2.5, () => ctx.rect(x + 22, 170, 166, 210)); P(ctx, vary('#5e3324', dk), 2.5, () => ctx.rect(x + 22, 420, 166, DINH.floor - 470)); ctx.strokeStyle = vary('#4a2a1e', dk); ctx.lineWidth = 2; for (let j = 0; j < 5; j++) { ctx.beginPath(); ctx.moveTo(x + 40 + j * 32, 190); ctx.lineTo(x + 40 + j * 32, 360); ctx.stroke(); } }
  // xà ngang + mái
  P(ctx, vary('#4e3020', dk), 3.5, () => ctx.rect(-100, 60, W + 200, 70));
  P(ctx, vary('#3a2a22', dk), 3.5, () => { ctx.moveTo(-100, -100); ctx.lineTo(W + 100, -100); ctx.lineTo(W + 100, 40); ctx.quadraticCurveTo(W / 2, 74, -100, 40); ctx.closePath(); });
  ctx.strokeStyle = vary('#2a1e18', dk); ctx.lineWidth = 3; for (let x = -60; x < W + 60; x += 46) { ctx.beginPath(); ctx.moveTo(x, -100); ctx.lineTo(x, 50); ctx.stroke(); }
  // nền gạch hiên
  P(ctx, vary('#a8785a', dk), 3, () => ctx.rect(-100, DINH.floor, W + 200, H));
  ctx.strokeStyle = vary('#8a5e44', dk); ctx.lineWidth = 2; for (let y = DINH.floor + 34; y < H + 40; y += 40) { ctx.beginPath(); ctx.moveTo(-100, y); ctx.lineTo(W + 100, y); ctx.stroke(); for (let x = -100 + (Math.floor(y / 40) % 2) * 50; x < W + 100; x += 100) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 40); ctx.stroke(); } }
  // cột lim
  for (const cx of DINH.cot) { P(ctx, vary('#4a3022', dk), 3.5, () => ctx.rect(cx - 46, 120, 92, DINH.floor - 110)); P(ctx, vary('#6a8a8a', dk), 3, () => ctx.ellipse(cx, DINH.floor + 6, 66, 20, 0, 0, TAU)); ctx.fillStyle = 'rgba(255,230,200,0.08)'; ctx.fillRect(cx - 30, 120, 16, DINH.floor - 110); }
  if (o.chieu !== false) chieu(k, o.cx0 ?? 330, o.cx1 ?? 1590, DINH.floor + 30, DINH.floor + 230, { dk, old: true });
}
// Một đứa ngồi duỗi chân trên chiếu, nhìn chính diện: thân + đôi bàn chân chĩa ra trước.
export function ngoiDuoi(k, x, y, h, p, o = {}) {
  // Ngồi bệt, hai chân duỗi thẳng về phía máy quay: chân to dần (gần máy hơn), hơi choãi, gan bàn chân ở mép trước.
  const { ctx } = k, fs = h / 760, fy = y + h * 0.66, lw = Math.max(2, h / 95), pants = p.pants ?? '#3a3a44';
  if (o.feet !== false) {
    ctx.save(); ctx.globalAlpha *= 0.28; ctx.fillStyle = '#1a120c'; ctx.beginPath(); ctx.ellipse(x, y + h * 0.36, h * 0.3, h * 0.33, 0, 0, TAU); ctx.fill(); ctx.restore();
    for (const d of [-1, 1]) {
      const xt = x + d * h * 0.07, xb = x + d * h * 0.15, wt = h * 0.13, wb = h * 0.17, top = y - h * 0.08, bot = fy - 150 * fs;
      P(ctx, pants, lw, () => { ctx.moveTo(xt - wt / 2, top); ctx.lineTo(xt + wt / 2, top); ctx.lineTo(xb + wb / 2, bot); ctx.lineTo(xb - wb / 2, bot); ctx.closePath(); });
      ctx.strokeStyle = vary(pants, -0.2); ctx.lineWidth = lw * 0.8; ctx.beginPath(); ctx.moveTo((xt + xb) / 2 - wt * 0.35, (top + bot) / 2); ctx.quadraticCurveTo((xt + xb) / 2, (top + bot) / 2 + h * 0.025, (xt + xb) / 2 + wt * 0.35, (top + bot) / 2); ctx.stroke();
      P(ctx, vary(p.skin ?? '#e8c09c', -0.05), lw, () => ctx.roundRect(xb - wb * 0.36, bot - h * 0.02, wb * 0.72, h * 0.07, h * 0.03));
    }
  }
  const info = ch(k, x, y, h, { ...p, action: 'sit', face: o.face ?? 'calm', arms: o.arms ?? 'down', talk: o.talk ?? 0, tears: o.tears ?? 0, shadow: false });
  if (o.feet !== false) { banChan(k, x - h * 0.15, fy, fs, { left: true, skin: p.skin }); banChan(k, x + h * 0.15, fy, fs, { skin: p.skin }); }
  return info;
}
// Gian kho bỏ không cạnh đình, cửa liếp. o.gao = túm gạo trước cửa.
export function kho(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'dawn', dk = DK[time];
  const g = ctx.createLinearGradient(0, 0, 0, 760); g.addColorStop(0, time === 'night' ? '#111825' : '#6f8092'); g.addColorStop(1, time === 'night' ? '#262f42' : '#d8c0a2'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, 900);
  for (const bx of [200, 1700, 1860]) bamboo(k, bx, 720, 460, dk);
  P(ctx, vary('#7c8548', dk), 3, () => ctx.rect(-100, 740, W + 200, H));
  P(ctx, vary('#a89a7a', dk), 3.5, () => ctx.rect(560, 380, 800, 420)); P(ctx, vary('#7a6a48', dk), 3.5, () => { ctx.moveTo(500, 400); ctx.lineTo(700, 220); ctx.lineTo(1220, 220); ctx.lineTo(1420, 400); ctx.closePath(); });
  ctx.strokeStyle = vary('#5e5034', dk); ctx.lineWidth = 3; for (let y = 240; y < 400; y += 22) { ctx.beginPath(); ctx.moveTo(520, y + (400 - y) * 0.1); ctx.lineTo(1400, y + (400 - y) * 0.1); ctx.stroke(); }
  P(ctx, vary('#5a4630', dk), 3, () => ctx.rect(850, 520, 220, 280)); ctx.strokeStyle = vary('#3e3020', dk); for (let x = 870; x < 1070; x += 24) { ctx.beginPath(); ctx.moveTo(x, 520); ctx.lineTo(x, 800); ctx.stroke(); }
  if (o.gao) toiGao(k, 960, 860, 1.1);
}
// Túm gạo gói lá chuối buộc lạt, đáy (x, y).
export function toiGao(k, x, y, s = 1) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#5f7f3e', 3.5, () => { ctx.moveTo(-70, 0); ctx.quadraticCurveTo(-84, -60, -30, -96); ctx.lineTo(30, -96); ctx.quadraticCurveTo(84, -60, 70, 0); ctx.closePath(); });
  ctx.strokeStyle = '#4a6630'; ctx.lineWidth = 2.5; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 22, -6); ctx.quadraticCurveTo(i * 20, -50, i * 10, -92); ctx.stroke(); }
  P(ctx, '#f0ead6', 2.5, () => ctx.ellipse(0, -100, 34, 14, 0, 0, TAU)); ctx.strokeStyle = '#c8a860'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-40, -70); ctx.lineTo(40, -70); ctx.stroke();
  ctx.restore();
}
// Tay nải vải nâu mở ra, tâm (x, y).
export function tayNai(k, x, y, s = 1) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#6a5a44', 4, () => { ctx.moveTo(-330, 60); ctx.quadraticCurveTo(-360, -160, -180, -200); ctx.quadraticCurveTo(0, -240, 180, -200); ctx.quadraticCurveTo(360, -160, 330, 60); ctx.quadraticCurveTo(0, 120, -330, 60); ctx.closePath(); });
  ctx.strokeStyle = '#54462f'; ctx.lineWidth = 3; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(-280 + i * 90, -170); ctx.quadraticCurveTo(-270 + i * 90, -40, -290 + i * 92, 60); ctx.stroke(); }
  ctx.restore();
}
// Ảnh nhà trẻ hợp tác xã 1975, tâm (x, y). o.zoom: chỉ khung; vẽ con người bằng búp bê thu nhỏ rồi phủ màu ảnh cũ.
export function anhNhaTre(k, x, y, s = 1, o = {}) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.rotate(o.r ?? -0.02); ctx.scale(s, s);
  P(ctx, '#e8e0cc', 3, () => ctx.rect(-430, -300, 860, 600), '#6a5e4a');
  ctx.save(); ctx.beginPath(); ctx.rect(-400, -270, 800, 540); ctx.clip();
  ctx.fillStyle = '#a89878'; ctx.fillRect(-400, -270, 800, 540); ctx.fillStyle = '#8a7a5e'; ctx.fillRect(-400, 90, 800, 180);
  const kidsC = ['#d8d0c0', '#bcb4a4', '#c8c0b0'];
  for (let i = 0; i < 9; i++) ch(k, -330 + i * 66, 200, 120, { kind: 'kid', skin: '#d8c4ac', hair: i % 3 ? 'short' : 'bun', hairColor: '#3a3028', top: kidsC[i % 3], topStyle: 'tee', sleeve: 'short', pants: '#6a6050', action: 'sit', face: 'happy', arms: 'down', shadow: false });
  ch(k, -150, 60, 300, { ...CO_NHAN, face: 'happy', arms: 'down', shadow: false });
  const g = ch(k, 120, 70, 230, { ...ME_NHO, face: 'calm', arms: 'hold', shadow: false });
  notRuoi(k, g, 230);
  ch(k, 205, 40, 95, { kind: 'kid', skin: '#dcc8b0', hair: 'buzz', hairColor: '#3a3028', top: '#d8d0c0', topStyle: 'tee', sleeve: 'short', pants: '#8a8070', action: 'sit', face: 'happy', arms: 'raise', shadow: false });
  ctx.globalCompositeOperation = 'color'; ctx.fillStyle = 'rgba(150,120,80,0.85)'; ctx.fillRect(-400, -270, 800, 540); ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(240,230,200,0.12)'; ctx.fillRect(-400, -270, 800, 540);
  if (o.ring) { ctx.strokeStyle = `rgba(242,178,74,${o.ring})`; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(122, -60, 90, 110, 0, 0, TAU); ctx.stroke(); }
  ctx.restore();
  k.text('NHÀ TRẺ HTX · 1975', 0, 248, { size: 30, font: 'title', color: '#f2ead6', outline: '#3a3028', outlineWidth: 5 });
  ctx.restore();
}
// Hàng bàn chân trên chiếu nhìn từ trên xuống. feet = [{skin, left, four, old, cold}], x0..x1 dàn đều, y gót.
export function chieuGan(k, feet, o = {}) {
  const { ctx, W, H } = k, y = o.y ?? 960, n = feet.length, x0 = o.x0 ?? 230, x1 = o.x1 ?? 1690, s = (o.s ?? 1.05) * 1.2;
  ctx.fillStyle = o.bg ?? '#2a1e14'; ctx.fillRect(-100, -100, W + 200, H + 200);
  chieu(k, -60, W + 60, 140, H + 40, { skew: 0, old: true, dk: o.dk ?? 0 });
  feet.forEach((f, i) => { const x = n === 1 ? (x0 + x1) / 2 : x0 + ((x1 - x0) * i) / (n - 1); if (f) banChan(k, x, y + (f.dy ?? 0), s * (f.s ?? 1), f); });
}
// Bàn tay đập nhịp đồng dao, nhìn từ trên, đầu ngón tại (x, y).
export function banTayDap(k, x, y, s = 1, skin = '#e8c09c') {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#5f7f8e', 4, () => ctx.roundRect(-58, -560, 116, 400, 30));
  P(ctx, skin, 4, () => ctx.roundRect(-62, -180, 124, 120, 40));
  for (const [fx, len] of [[-44, 70], [-16, 84], [12, 80], [38, 64]]) P(ctx, skin, 3.5, () => ctx.roundRect(fx - 12, -80, 24, len, 12));
  P(ctx, skin, 3.5, () => { ctx.save(); ctx.translate(-64, -130); ctx.rotate(0.5); ctx.roundRect(-14, -10, 28, 80, 14); ctx.restore(); });
  ctx.restore();
}
// Cuối chăn: bốn bàn chân thò ra (hai mẹ con) + bàn chân thứ năm. o.five 0..1.
export function chanChan(k, o = {}) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#1e1610'; ctx.fillRect(-100, -100, W + 200, H + 200);
  chieu(k, -60, W + 60, 600, H + 40, { skew: 0, dk: -0.3 });
  const feet = [[560, '#dcb28e', true, 1.2], [700, '#dcb28e', false, 1.2], [1180, '#e8c09c', true, 0.95], [1290, '#e8c09c', false, 0.95]];
  for (const [x, skin, left, s] of feet) banChan(k, x, 400, s * 1.1, { left, skin, r: Math.PI });
  if ((o.five ?? 0) > 0) { ctx.save(); ctx.globalAlpha *= o.five; banChan(k, 940, 430, 1.2, { cold: true, four: true, old: true, r: Math.PI }); ctx.restore(); }
  P(ctx, '#7a5a7a', 5, () => { ctx.moveTo(-100, -100); ctx.lineTo(W + 100, -100); ctx.lineTo(W + 100, 500); ctx.bezierCurveTo(1500, 540, 1300, 480, 1100, 530); ctx.bezierCurveTo(900, 570, 600, 500, 400, 540); ctx.bezierCurveTo(200, 570, 0, 520, -100, 540); ctx.closePath(); });
  ctx.strokeStyle = '#6a4a6a'; ctx.lineWidth = 4; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-100, 80 + i * 90); ctx.quadraticCurveTo(960, 120 + i * 90, W + 100, 70 + i * 90); ctx.stroke(); }
  if (o.sand) { ctx.fillStyle = '#2e2a24'; for (let i = 0; i < 120; i++) { ctx.beginPath(); ctx.arc(820 + R(k, i + 900) * 260, 800 + R(k, i + 910) * 120, 3 + R(k, i + 920) * 4, 0, TAU); ctx.fill(); } }
}
export { sepia };
