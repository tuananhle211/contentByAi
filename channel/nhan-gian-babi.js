// Nhân Gian Chưa Kể — tập Ông Ba Bị (18/11/2026): bộ cảnh phẳng làng Bắc Bộ năm 1994 + nhân vật búp bê.
// Cảnh: gocDa (cây đa + quán nước), sanNha (sân nhà), congNha (cổng tre nhìn gần), vuonNa (gốc na), gianNha (gian trong),
// benDo (bến đò + đò neo), baiMo (bãi tha ma). Đạo cụ: bi (cái bị chín quai), giay (giày len hồng), chan (chăn vải hoa),
// boc (bọc chăn hoa), aoCuoi, anhCuoi, dan (kim đan), ganh, luaNho, suong, muaPhun, dauChan.
import { doll, sepia } from '/channel/nhan-gian-doll.js';
import { vary } from '/channel/nhan-gian-hd.js';
import { bamboo, benDong, LINE } from '/channel/nhan-gian-cauco.js';

const T = (k) => k.gt ?? 0;
const R = (k, i) => k.rand(i);
function P(ctx, fill, lw, fn, stroke = LINE) { ctx.beginPath(); fn(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
const DK = { day: 0, noon: 0.03, dusk: -0.12, night: -0.55, dawn: -0.2 };
const SKY = { day: ['#b8c8cc', '#e8dcc0'], noon: ['#c8d4d0', '#efe4c8'], dusk: ['#a07a5a', '#e0b07a'], night: ['#121a28', '#2a3448'], dawn: ['#7a8a9a', '#d8c4a8'] };
function sky(k, time, h = 640, moon = true) { const { ctx, W } = k, c = SKY[time] ?? SKY.day, g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, c[0]); g.addColorStop(1, c[1]); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, h + 100); if (time === 'night' && moon) { ctx.fillStyle = '#efe6cc'; ctx.beginPath(); ctx.arc(1560, 150, 50, 0, Math.PI * 2); ctx.fill(); } }

// ---------- nhân vật (búp bê, năm 1994) ----------
export const HANH = { kind: 'kid', skin: '#ecc8a4', hair: 'long', hairColor: '#1e1610', top: '#6f8fa0', topStyle: 'canh', pants: '#33333c', shoes: '#7a6a5a' };
export const CUN = { kind: 'kid', skin: '#f0d0b0', hair: 'buzz', hairColor: '#241a12', top: '#d8c8a0', topStyle: 'tee', sleeve: 'short', pants: '#4a5a4a', shoes: '#8a6a4a' };
export const ME = { kind: 'woman', skin: '#dcb28e', hair: 'bun', hairColor: '#241a12', top: '#8c7664', topStyle: 'canh', pants: '#23211f', shoes: '#5a4a3a' };
export const ME_GIA = { ...ME, kind: 'old', hairColor: '#a8a29a', top: '#6a6058' };
export const BA = { kind: 'old', skin: '#d8b498', hair: 'bun', hairColor: '#a09890', top: '#5e4634', topStyle: 'baba', pants: '#1e1c1a', shoes: '#4a3a2a', hat: 'moquo' };
export const THAM = { kind: 'kid', skin: '#e8c09c', hair: 'bun', hairColor: '#1e1610', top: '#b0705e', topStyle: 'canh', pants: '#2e2e36', shoes: '#6a5a4a' };
export const DUNG = { kind: 'kid', skin: '#c8966e', hair: 'spiky', hairColor: '#1e1610', top: '#a8b0a0', topStyle: 'tee', sleeve: 'short', pants: '#3a4a5a', roll: true, shoes: '#6a5a4a' };
export const BA_TU = { kind: 'old', skin: '#d0a888', hair: 'bun', hairColor: '#8a8078', top: '#7a6a7a', topStyle: 'baba', pants: '#23211f', shoes: '#4a3a2a', hat: 'khan', hatColor: '#3a3438' };
export const ONG = { kind: 'old', skin: '#a88a6a', hair: 'bald', hairColor: '#8a8078', top: '#463c32', topStyle: 'baba', pants: '#2a2622', shoes: '#a88a6a', hat: 'non', hatColor: '#7a6a4c' };
export const LAI_DO = { kind: 'man', skin: '#b88c68', hair: 'short', hairColor: '#2a2018', top: '#5a6a62', topStyle: 'baba', pants: '#2a2a2a', roll: true, shoes: '#b88c68', hat: 'non' };
export const ch = (k, x, y, h, o) => doll(k, x, y, h, o);
export const lie = (k, x, y, h, o) => k.group({ x, y, r: -Math.PI / 2 }, () => doll(k, 0, 0, h, { ...o, shadow: false, arms: 'down' }));

// ---------- cái bị tải chín quai ----------
// Đáy tại (x, y), cao ~300·s. o.open (miệng mở), o.chan (góc chăn hoa thò ra), o.breathe (phập phồng), o.flat (xẹp 0..1),
// o.hi (số quai đã đếm, tô sáng), o.eyes (0..1: các miếng vá như mắt), o.dk (tối đi).
const PATCH = [[-62, -60, 21], [8, -44, 25], [62, -92, 19], [-30, -128, 23], [36, -158, 20], [-74, -162, 17], [78, -170, 15], [-8, -205, 18], [-52, -228, 13], [44, -226, 14], [-92, -106, 13], [92, -48, 13]];
export function bi(k, x, y, s = 1, o = {}) {
  const { ctx } = k, t = T(k), dk = o.dk ?? 0, c = vary('#8a6f4c', dk), flat = o.flat ?? 0;
  const br = o.breathe ? Math.sin(t * 2.4) * 0.025 * o.breathe : 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (1 + br + flat * 0.12), s * (1 - br - flat * 0.5));
  const body = () => { ctx.moveTo(-58, -262); ctx.bezierCurveTo(-150, -200, -142, -18, -86, 0); ctx.quadraticCurveTo(0, 12, 86, 0); ctx.bezierCurveTo(142, -18, 150, -200, 58, -262); ctx.quadraticCurveTo(0, -244, -58, -262); ctx.closePath(); };
  P(ctx, c, 4, body);
  // sợi bao tải
  ctx.save(); ctx.beginPath(); body(); ctx.clip(); ctx.strokeStyle = vary(c, -0.12); ctx.lineWidth = 1.4; ctx.globalAlpha = 0.55;
  for (let i = -150; i < 150; i += 9) { ctx.beginPath(); ctx.moveTo(i, -270); ctx.lineTo(i, 10); ctx.stroke(); }
  for (let j = -270; j < 10; j += 9) { ctx.beginPath(); ctx.moveTo(-150, j); ctx.lineTo(150, j); ctx.stroke(); }
  ctx.globalAlpha = 1; P(ctx, 'rgba(20,12,6,0.22)', 0, () => ctx.ellipse(70, -90, 80, 190, 0, 0, Math.PI * 2));
  ctx.restore();
  // miếng vá tròn trông như con mắt
  PATCH.forEach(([px, py, r], i) => {
    P(ctx, vary(i % 3 ? '#a8926c' : '#6e5a42', dk), 2.5, () => ctx.arc(px, py, r, 0, Math.PI * 2));
    ctx.strokeStyle = vary('#3a2c1e', dk); ctx.lineWidth = 1.6; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(px, py, r - 4, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    const e = o.eyes ?? 0.5; ctx.globalAlpha = e; P(ctx, '#17100a', 0, () => ctx.arc(px, py, r * 0.36, 0, Math.PI * 2)); ctx.globalAlpha = 1;
  });
  // miệng bị
  if (o.open) P(ctx, '#0c0806', 3, () => ctx.ellipse(0, -262, 66, 18, 0, 0, Math.PI * 2));
  else { P(ctx, vary(c, -0.08), 3.5, () => { ctx.moveTo(-40, -262); ctx.lineTo(-62, -304); ctx.quadraticCurveTo(0, -288, 62, -304); ctx.lineTo(40, -262); ctx.closePath(); }); P(ctx, vary('#4a3826', dk), 3, () => ctx.roundRect(-46, -272, 92, 15, 6)); }
  if (o.chan) { ctx.save(); ctx.translate(30, -258); ctx.rotate(0.35); vaiHoa(k, -30, -10, 66, 74, dk); P(ctx, null, 3, () => ctx.rect(-30, -10, 66, 74)); ctx.restore(); }
  // chín quai dây chão
  const hi = o.hi ?? 0;
  for (let i = 0; i < 9; i++) {
    const u = i / 8, a = -58 + u * 116, sx = a * 2.15, sy = -150 - Math.abs(u - 0.5) * 120 + (i % 2) * 16;
    ctx.lineCap = 'round'; ctx.strokeStyle = LINE; ctx.lineWidth = 8.5; ctx.beginPath(); ctx.moveTo(a, -266); ctx.quadraticCurveTo(a * 1.8, -350 - (i % 3) * 16, sx, sy); ctx.stroke();
    ctx.strokeStyle = i < hi ? '#f2b24a' : vary('#b49a6c', dk); ctx.lineWidth = 5; ctx.stroke();
  }
  ctx.restore();
}
// Ông già đeo bị. o.sack = false thì không có bị; sackO = tuỳ chọn cái bị.
export function ongGia(k, x, y, h, o = {}) {
  const dir = o.flip ? -1 : 1, side = o.view === 'side';
  if (o.sack !== false) bi(k, x + (side ? -dir * h * 0.3 : h * 0.34), y - h * 0.12, h / 500, { dk: o.dk ?? -0.05, ...(o.sackO ?? {}) });
  doll(k, x, y, h, { ...ONG, ...o });
}

// ---------- vải hoa, chăn, bọc, áo cưới, ảnh cưới ----------
export function vaiHoa(k, x, y, w, h, dk = 0, base = '#b4574f') {
  const { ctx } = k; ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.fillStyle = vary(base, dk); ctx.fillRect(x, y, w, h);
  let n = 0; for (let j = y + 4; j < y + h + 8; j += 15) { for (let i = x + (n % 2 ? 9 : 2); i < x + w + 8; i += 18) { ctx.fillStyle = vary('#f0e2c4', dk); for (let a = 0; a < 5; a++) { ctx.beginPath(); ctx.arc(i + Math.cos(a * 1.257) * 3, j + Math.sin(a * 1.257) * 3, 2, 0, Math.PI * 2); ctx.fill(); } ctx.fillStyle = vary('#e8b24a', dk); ctx.beginPath(); ctx.arc(i, j, 1.7, 0, Math.PI * 2); ctx.fill(); } n++; }
  ctx.restore();
}
// Chăn gấp vuông, tâm (x, y).
export function chan(k, x, y, s = 1, o = {}) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.rotate(o.r ?? 0); ctx.scale(s, s);
  for (let i = 2; i >= 0; i--) { P(ctx, vary('#8a443e', -i * 0.05), 3, () => ctx.roundRect(-104 + i * 3, -62 + i * 10, 208, 124, 12)); }
  vaiHoa(k, -104, -62, 208, 124); P(ctx, null, 3.5, () => ctx.roundRect(-104, -62, 208, 124, 10));
  ctx.strokeStyle = 'rgba(240,226,196,0.7)'; ctx.lineWidth = 2; ctx.setLineDash([7, 6]); ctx.strokeRect(-94, -52, 188, 104); ctx.setLineDash([]);
  ctx.restore();
}
// Bọc chăn hoa bế trên tay (không lộ mặt em bé). Tâm (x, y).
export function boc(k, x, y, s = 1, o = {}) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.rotate(o.r ?? -0.25); ctx.scale(s, s);
  const sh = () => { ctx.moveTo(-74, 6); ctx.bezierCurveTo(-74, -42, 50, -48, 76, -12); ctx.bezierCurveTo(88, 12, 52, 40, -6, 42); ctx.bezierCurveTo(-48, 42, -74, 30, -74, 6); ctx.closePath(); };
  ctx.save(); ctx.beginPath(); sh(); ctx.clip(); vaiHoa(k, -90, -60, 190, 120); ctx.restore(); P(ctx, null, 3.2, sh);
  ctx.strokeStyle = LINE; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-30, -30); ctx.quadraticCurveTo(0, 0, -14, 40); ctx.moveTo(22, -36); ctx.quadraticCurveTo(44, 0, 26, 34); ctx.stroke();
  ctx.restore();
}
// Áo cánh hoa phơi trên dây, vạt sau bị cắt một mảng vuông. Tâm cổ áo (x, y).
export function aoCuoi(k, x, y, s = 1, o = {}) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const sh = () => { ctx.moveTo(-40, 0); ctx.lineTo(-210, 50); ctx.lineTo(-230, 130); ctx.lineTo(-130, 150); ctx.lineTo(-104, 100); ctx.lineTo(-110, 390); ctx.lineTo(110, 390); ctx.lineTo(104, 100); ctx.lineTo(130, 150); ctx.lineTo(230, 130); ctx.lineTo(210, 50); ctx.lineTo(40, 0); ctx.quadraticCurveTo(0, 26, -40, 0); ctx.closePath(); };
  ctx.save(); ctx.beginPath(); sh(); ctx.clip(); vaiHoa(k, -240, -10, 480, 410); ctx.restore(); P(ctx, null, 4, sh);
  if (o.hole !== false) { const a = o.hole === undefined ? 1 : o.hole; ctx.globalAlpha = a; P(ctx, o.bg ?? '#d8c8a4', 3.5, () => { ctx.moveTo(-72, 190); ctx.lineTo(74, 186); ctx.lineTo(78, 352); ctx.lineTo(-76, 356); ctx.closePath(); }); ctx.globalAlpha = 1; }
  ctx.restore();
}
// Ảnh cưới đen trắng trong khung gỗ. Tâm (x, y), rộng ~230·s.
export function anhCuoi(k, x, y, s = 1, o = {}) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#5a3e28', 4, () => ctx.rect(-118, -148, 236, 296)); P(ctx, '#c8c2b4', 2, () => ctx.rect(-98, -128, 196, 256));
  ctx.save(); ctx.beginPath(); ctx.rect(-98, -128, 196, 256); ctx.clip();
  ctx.fillStyle = '#a8a298'; ctx.fillRect(-98, -128, 196, 256);
  doll(k, -42, 130, 230, { kind: 'man', skin: '#cfc9bc', hair: 'short', hairColor: '#2c2a26', top: '#4e4c48', topStyle: 'shirt', pants: '#3a3834', shadow: false, face: 'calm' });
  doll(k, 44, 130, 220, { kind: 'woman', skin: '#d8d2c6', hair: 'bun', hairColor: '#2c2a26', top: o.flower ? '#b4574f' : '#7e7a72', topStyle: 'canh', print: 'flower', printColor: '#d8d2c6', pants: '#3a3834', shadow: false, face: 'calm' });
  ctx.restore(); ctx.restore();
}
// ---------- giày len hồng: nhìn nghiêng một đôi. Đáy (x, y), rộng ~170·s. o.mud (bùn 0..1), o.ash (cháy dở)
export function giay(k, x, y, s = 1, o = {}) {
  const { ctx } = k, c = o.color ?? '#e8a2ae', mud = o.mud ?? 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.r ?? 0); ctx.scale(s, s);
  for (const [dx, dk2] of [[34, -0.1], [-34, 0]]) {
    ctx.save(); ctx.translate(dx, 0);
    const sh = () => { ctx.moveTo(-46, 0); ctx.quadraticCurveTo(-54, -34, -40, -54); ctx.lineTo(-40, -82); ctx.lineTo(8, -82); ctx.lineTo(8, -56); ctx.bezierCurveTo(30, -48, 62, -38, 62, -14); ctx.quadraticCurveTo(62, 0, 44, 0); ctx.closePath(); };
    P(ctx, vary(c, dk2), 3, sh);
    ctx.save(); ctx.beginPath(); sh(); ctx.clip(); ctx.strokeStyle = vary(c, -0.18 + dk2); ctx.lineWidth = 1.6;
    for (let j = -80; j < 2; j += 9) for (let i = -56; i < 66; i += 10) { ctx.beginPath(); ctx.moveTo(i, j); ctx.lineTo(i + 5, j + 6); ctx.lineTo(i + 10, j); ctx.stroke(); }
    if (mud) { ctx.globalAlpha = mud; ctx.fillStyle = '#4a3624'; ctx.beginPath(); ctx.ellipse(10, 6, 80, 22, 0, 0, Math.PI * 2); ctx.fill(); for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(-40 + R(k, i + 70) * 100, -50 + R(k, i + 71) * 44, 3 + R(k, i + 72) * 6, 0, Math.PI * 2); ctx.fill(); } ctx.globalAlpha = 1; }
    ctx.restore();
    P(ctx, vary(c, 0.08 + dk2), 2.5, () => ctx.roundRect(-44, -90, 56, 16, 5));
    ctx.strokeStyle = '#f6eee2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-18, -66); ctx.quadraticCurveTo(0, -60, 14, -66); ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}
// Kim đan + mảnh len đang đan, tâm (x, y).
export function dan(k, x, y, s = 1) {
  const { ctx } = k, w = Math.sin(T(k) * 5) * 3; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#d8ccb0'; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-62, -22 + w); ctx.lineTo(30, 10); ctx.moveTo(62, -22 - w); ctx.lineTo(-30, 10); ctx.stroke();
  P(ctx, '#e8a2ae', 2.5, () => ctx.roundRect(-26, -2, 52, 36, 7)); ctx.strokeStyle = '#c47f8c'; ctx.lineWidth = 1.5; for (let j = 4; j < 32; j += 7) { ctx.beginPath(); ctx.moveTo(-22, j); ctx.lineTo(22, j); ctx.stroke(); }
  ctx.restore();
}
// Quang gánh rau, tâm đòn gánh trên vai (x, y).
export function ganh(k, x, y, s = 1) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-170, 4); ctx.quadraticCurveTo(0, -16, 170, 4); ctx.stroke();
  for (const d of [-1, 1]) { ctx.strokeStyle = LINE; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(d * 160, 4); ctx.lineTo(d * 118, 118); ctx.moveTo(d * 160, 4); ctx.lineTo(d * 202, 118); ctx.stroke(); P(ctx, '#a07a46', 3, () => ctx.roundRect(d * 160 - 50, 118, 100, 62, 14)); for (let i = 0; i < 6; i++) P(ctx, i % 2 ? '#5f8a3e' : '#74a048', 2, () => ctx.ellipse(d * 160 - 36 + i * 15, 112 - (i % 2) * 8, 16, 24, (i - 3) * 0.2, 0, Math.PI * 2)); }
  ctx.restore();
}
// Lửa nhỏ ở gốc na. p 0..1.
export function luaNho(k, x, y, s = 1, p = 1) {
  if (p <= 0) return; const { ctx } = k, t = T(k); ctx.save(); ctx.translate(x, y); ctx.scale(s * p, s * p);
  const g = ctx.createRadialGradient(0, -40, 0, 0, -40, 170); g.addColorStop(0, 'rgba(255,190,100,0.55)'); g.addColorStop(1, 'rgba(255,170,80,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, -40, 170, 0, Math.PI * 2); ctx.fill();
  for (const [dx, h, c] of [[-22, 64, '#e8742e'], [20, 72, '#e8742e'], [0, 104, '#f6a23c'], [-6, 62, '#ffe08a']]) { const f = 1 + Math.sin(t * 11 + dx) * 0.13; P(ctx, c, 0, () => { ctx.moveTo(dx - 26, 0); ctx.quadraticCurveTo(dx - 26, -h * 0.5 * f, dx, -h * f); ctx.quadraticCurveTo(dx + 26, -h * 0.5 * f, dx + 26, 0); ctx.closePath(); }); }
  ctx.restore();
}
// Sương trắng trôi ngang. a 0..1, y = dải sương.
export function suong(k, a = 0.6, y = 760, h = 300) {
  const { ctx, W } = k, t = T(k); if (a <= 0) return; ctx.save();
  for (let i = 0; i < 9; i++) { const x = ((R(k, i + 400) * (W + 800) + t * (16 + i * 4)) % (W + 800)) - 400, yy = y + (R(k, i + 410) - 0.5) * h, rx = 340 + R(k, i + 420) * 340; ctx.save(); ctx.translate(x, yy); ctx.scale(1, 0.26); const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx); g.addColorStop(0, `rgba(226,228,226,${0.55 * a})`); g.addColorStop(1, 'rgba(226,228,226,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  ctx.restore();
}
// Mưa phùn (vẽ sau shade cũng được).
export function muaPhun(k, a = 0.5) {
  const { ctx, W, H } = k, t = T(k); ctx.save(); ctx.strokeStyle = `rgba(214,224,232,${0.4 * a})`; ctx.lineWidth = 1.6;
  for (let i = 0; i < 130; i++) { const x = (R(k, i + 500) * (W + 200) - t * 60) % (W + 200), xx = x < 0 ? x + W + 200 : x, y = (R(k, i + 640) * (H + 100) + t * 340) % (H + 100); ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx - 5, y + 22); ctx.stroke(); }
  ctx.restore();
}
// Dấu chân đất đi về phía x tăng dần; n dấu, p 0..1.
export function dauChan(k, x, y, n = 6, o = {}) {
  const { ctx } = k, dx = o.dx ?? 56, dy = o.dy ?? -20; ctx.save();
  for (let i = 0; i < n; i++) { ctx.globalAlpha = (o.alpha ?? 0.7) * Math.min(1, (o.p ?? 1) * n - i); if (ctx.globalAlpha <= 0) continue; const px = x + i * dx, py = y + i * dy + (i % 2 ? 16 : 0); ctx.fillStyle = '#3a2c20'; ctx.beginPath(); ctx.ellipse(px, py, 22, 9, -0.2, 0, Math.PI * 2); ctx.fill(); for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.arc(px + 26 + j * 2, py - 9 + j * 6, 3, 0, Math.PI * 2); ctx.fill(); } }
  ctx.restore();
}

// ---------- cây đa đầu làng + quán nước bà Tư ----------
export const DA = { x: 620, ground: 900, quan: 1470 };
export function gocDa(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'day', dk = DK[time], t = T(k);
  sky(k, time);
  P(ctx, vary('#8e7a62', dk), 0, () => { ctx.moveTo(-100, 640); for (let x = -100; x <= W + 100; x += 200) ctx.lineTo(x, 520 - (Math.floor(x / 200) % 2) * 60); ctx.lineTo(W + 100, 640); ctx.closePath(); });
  ctx.fillStyle = vary('#86983f', dk); ctx.fillRect(-100, 620, W + 200, 200);
  ctx.strokeStyle = vary('#6a7c32', dk); ctx.lineWidth = 2; for (let y = 636; y < 810; y += 15) { ctx.beginPath(); ctx.moveTo(-100, y); ctx.lineTo(W + 100, y); ctx.stroke(); }
  for (const x of [1120, 1800]) bamboo(k, x, 680, 330, dk);
  // đường đất
  P(ctx, vary('#ab9370', dk), 3, () => { ctx.moveTo(-100, 800); ctx.quadraticCurveTo(900, 780, W + 100, 810); ctx.lineTo(W + 100, H + 100); ctx.lineTo(-100, H + 100); ctx.closePath(); });
  ctx.strokeStyle = vary('#8d7757', dk); ctx.lineWidth = 3; for (let i = 0; i < 24; i++) { const x = R(k, i + 200) * W, y = 835 + R(k, i + 201) * 220; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 40 + R(k, i + 2) * 40, y); ctx.stroke(); }
  // quán nước
  if (o.quan !== false) {
    const q = DA.quan;
    for (const x of [q - 200, q + 200]) P(ctx, vary('#6a4e34', dk), 3, () => ctx.rect(x - 9, 530, 18, 330));
    P(ctx, vary('#a88f5e', dk), 3.5, () => { ctx.moveTo(q - 290, 560); ctx.lineTo(q - 170, 440); ctx.lineTo(q + 170, 440); ctx.lineTo(q + 290, 560); ctx.closePath(); });
    ctx.strokeStyle = vary('#84703f', dk); ctx.lineWidth = 3; for (let x = q - 260; x < q + 260; x += 26) { ctx.beginPath(); ctx.moveTo(x, 556); ctx.lineTo(x + (q - x) * 0.32, 446); ctx.stroke(); }
    P(ctx, vary('#8a6a44', dk), 3, () => ctx.rect(q - 130, 720, 260, 22)); for (const x of [q - 112, q + 96]) P(ctx, vary('#6a4e34', dk), 2.5, () => ctx.rect(x, 742, 16, 118));
    P(ctx, vary('#5e7a86', dk), 3, () => ctx.ellipse(q - 60, 694, 34, 26, 0, 0, Math.PI * 2)); P(ctx, vary('#5e7a86', dk), 2.5, () => ctx.rect(q - 76, 662, 32, 10));
    for (const x of [q + 10, q + 60]) P(ctx, vary('#e6e0d0', dk), 2.5, () => { ctx.moveTo(x - 20, 700); ctx.quadraticCurveTo(x, 728, x + 20, 700); ctx.closePath(); });
    P(ctx, vary('#d8d0b8', dk), 2.5, () => ctx.roundRect(q + 96, 668, 40, 52, 6));
  }
  // cây đa
  const x = DA.x, y = DA.ground, c = vary('#5c4938', dk);
  for (const rx of [-300, -230, 250, 320, 390]) { ctx.strokeStyle = vary('#4e3e30', dk); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + rx, 200); ctx.quadraticCurveTo(x + rx + Math.sin(t * 0.7 + rx) * 8, 520, x + rx * 0.96, 770 + (rx % 3) * 10); ctx.stroke(); }
  P(ctx, c, 3.5, () => { ctx.moveTo(x - 200, y + 16); ctx.bezierCurveTo(x - 110, y - 60, x - 124, y - 330, x - 150, y - 660); ctx.lineTo(x + 150, y - 660); ctx.bezierCurveTo(x + 124, y - 330, x + 110, y - 60, x + 220, y + 16); ctx.quadraticCurveTo(x, y - 12, x - 200, y + 16); ctx.closePath(); });
  ctx.strokeStyle = vary('#3f3226', dk); ctx.lineWidth = 5; for (const d of [-70, -22, 30, 76]) { ctx.beginPath(); ctx.moveTo(x + d, y - 560); ctx.bezierCurveTo(x + d * 1.3, y - 380, x + d * 0.7, y - 200, x + d * 1.6, y - 8); ctx.stroke(); }
  for (let i = 0; i < 15; i++) { const a = i / 14; P(ctx, vary(i % 3 === 0 ? '#3f5f33' : i % 3 === 1 ? '#4c6e3b' : '#5a7c44', dk), 0, () => ctx.ellipse(x - 620 + a * 1290 + Math.sin(t * 0.5 + i) * 4, 70 + (i % 4) * 56 + R(k, i + 80) * 30, 190, 104, 0, 0, Math.PI * 2)); }
}
// Bàn ô ăn quan vẽ trên đất + sỏi.
export function oAnQuan(k, x, y, s = 1) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s * 0.5); ctx.strokeStyle = '#5a452e'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.roundRect(-210, -70, 420, 140, 60); ctx.moveTo(-210 + 60, 0); ctx.lineTo(150, 0); for (let i = 0; i < 6; i++) { ctx.moveTo(-150 + i * 60, -70); ctx.lineTo(-150 + i * 60, 70); } ctx.stroke();
  ctx.fillStyle = '#d8d0bc'; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.arc(-170 + R(k, i + 30) * 340, -50 + R(k, i + 31) * 100, 7, 0, Math.PI * 2); ctx.fill(); } ctx.restore();
}

// ---------- sân nhà tôi ----------
export const SAN = { ground: 880, gate: 1600, door: 700, hien: 800 };
export function sanNha(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'day', dk = DK[time];
  sky(k, time, 870, o.moon !== false);
  for (const x of [120, 1300, 1820]) bamboo(k, x, 560, 420, dk);
  // nhà ngói ba gian
  P(ctx, vary('#cdbb94', dk), 3.5, () => ctx.rect(130, 350, 1200, 470));
  P(ctx, vary('#7c4c3a', dk), 3.5, () => { ctx.moveTo(40, 362); ctx.lineTo(240, 170); ctx.lineTo(1220, 170); ctx.lineTo(1420, 362); ctx.closePath(); });
  ctx.strokeStyle = vary('#623a2c', dk); ctx.lineWidth = 3; for (let y = 200; y < 356; y += 26) { ctx.beginPath(); ctx.moveTo(60, y); ctx.lineTo(1400, y); ctx.stroke(); }
  for (const x of [300, 700, 1100]) { P(ctx, vary('#3f2c1e', dk), 3, () => ctx.rect(x - 90, 480, 180, 340)); ctx.fillStyle = vary('#5e4230', dk); ctx.fillRect(x - 2, 480, 4, 340); }
  for (const x of [150, 500, 900, 1300]) P(ctx, vary('#6a4a32', dk), 3, () => ctx.rect(x - 15, 360, 30, 460));
  P(ctx, vary('#b09a78', dk), 3, () => ctx.rect(100, 810, 1270, 40));
  // sân gạch
  P(ctx, vary('#a97e60', dk), 3, () => ctx.rect(-100, 850, W + 200, H));
  ctx.strokeStyle = vary('#8d6a4e', dk); ctx.lineWidth = 2; for (let y = 880; y < H + 30; y += 36) { ctx.beginPath(); ctx.moveTo(-100, y); ctx.lineTo(W + 100, y); ctx.stroke(); for (let x = -100 + (Math.floor(y / 36) % 2) * 40; x < W + 100; x += 80) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 36); ctx.stroke(); } }
  // chum nước
  P(ctx, vary('#6c5240', dk), 3.5, () => { ctx.moveTo(30, 880); ctx.bezierCurveTo(-30, 780, 0, 680, 40, 670); ctx.lineTo(120, 670); ctx.bezierCurveTo(160, 680, 190, 780, 130, 880); ctx.closePath(); });
  // hàng rào + cổng
  for (let x = 1400; x < W + 60; x += 34) if (Math.abs(x - SAN.gate) > 90) P(ctx, vary('#9a8050', dk), 2.5, () => ctx.roundRect(x, 620 - (x % 3) * 8, 22, 260, 6));
  ctx.fillStyle = vary('#7a6238', dk); ctx.fillRect(1390, 680, 560, 12); ctx.fillRect(1390, 790, 560, 12);
  for (const x of [SAN.gate - 100, SAN.gate + 100]) P(ctx, vary('#6a4e30', dk), 3, () => ctx.rect(x - 13, 470, 26, 410));
  P(ctx, vary('#7c5e3c', dk), 3, () => ctx.rect(SAN.gate - 130, 462, 260, 24));
  if (!o.gateOpen) { P(ctx, vary('#8a7044', dk), 3, () => ctx.rect(SAN.gate - 86, 640, 172, 230)); ctx.strokeStyle = vary('#5e4a2c', dk); ctx.lineWidth = 3; for (let x = SAN.gate - 62; x < SAN.gate + 80; x += 28) { ctx.beginPath(); ctx.moveTo(x, 640); ctx.lineTo(x, 870); ctx.stroke(); } }
  // dây phơi
  if (o.line) { ctx.strokeStyle = vary('#3a2c20', dk); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1050, 520); ctx.quadraticCurveTo(1300, 560, 1560, 500); ctx.stroke(); }
}

// ---------- cổng tre nhìn gần: fn() vẽ người đứng ngoài; hàng rào phủ lên ----------
export const CONG = { gate: 1060, outY: 800, inY: 1020 };
export function congNha(k, o = {}, fn) {
  const { ctx, W, H } = k, time = o.time ?? 'dusk', dk = DK[time];
  sky(k, time, 620);
  for (const x of [200, 640, 1700]) bamboo(k, x, 640, 400, dk);
  P(ctx, vary('#8c7656', dk), 0, () => ctx.rect(-100, 620, W + 200, 300));
  ctx.strokeStyle = vary('#6e5c42', dk); ctx.lineWidth = 3; for (let i = 0; i < 14; i++) { const x = R(k, i + 240) * W, y = 650 + R(k, i + 241) * 150; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 60, y); ctx.stroke(); }
  if (fn) fn();
  // hàng rào phía trước
  for (let x = -60; x < W + 60; x += 40) if (Math.abs(x + 11 - CONG.gate) > 130) P(ctx, vary('#a08654', dk), 2.5, () => ctx.roundRect(x, 520 + (x % 3) * 12, 26, 440, 7));
  ctx.fillStyle = vary('#7c6339', dk); ctx.fillRect(-100, 620, W + 200, 14); ctx.fillRect(-100, 810, W + 200, 14);
  for (const d of [-136, 136]) P(ctx, vary('#6a4e30', dk), 3.5, () => ctx.rect(CONG.gate + d - 18, 330, 36, 640));
  P(ctx, vary('#7c5e3c', dk), 3.5, () => ctx.rect(CONG.gate - 180, 318, 360, 30));
  // cánh cổng thấp (có khe)
  P(ctx, vary('#8f7548', dk), 3.5, () => ctx.rect(CONG.gate - 116, 660, 232, 300)); ctx.fillStyle = vary('#2a2016', dk); for (let x = CONG.gate - 92; x < CONG.gate + 100; x += 46) ctx.fillRect(x, 662, 7, 296);
  P(ctx, vary('#a18a64', dk), 0, () => ctx.rect(-100, 955, W + 200, H));
  ctx.strokeStyle = vary('#856f4e', dk); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-100, 956); ctx.lineTo(W + 100, 956); ctx.stroke();
}

// ---------- vườn sau: gốc na ----------
export const NA = { x: 960, y: 860 };
export function vuonNa(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'day', dk = DK[time], t = T(k), x = NA.x, y = NA.y;
  sky(k, time, 620);
  for (const bx of [80, 520, 1400, 1820]) bamboo(k, bx, 640, 420, dk);
  for (let px = -40; px < W + 40; px += 36) P(ctx, vary('#927a4c', dk), 2, () => ctx.roundRect(px, 540 + (px % 3) * 8, 22, 200, 6));
  ctx.fillStyle = vary('#70592f', dk); ctx.fillRect(-100, 600, W + 200, 10); ctx.fillRect(-100, 690, W + 200, 10);
  P(ctx, vary('#7f8a4a', dk), 3, () => { ctx.moveTo(-100, 740); ctx.quadraticCurveTo(900, 712, W + 100, 744); ctx.lineTo(W + 100, H + 100); ctx.lineTo(-100, H + 100); ctx.closePath(); });
  for (let i = 0; i < 40; i++) { const px = R(k, i + 300) * W, py = 770 + R(k, i + 301) * 290; ctx.strokeStyle = vary('#5e6c34', dk); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 7, py - 18); ctx.moveTo(px, py); ctx.lineTo(px + 7, py - 18); ctx.stroke(); }
  // cây na
  ctx.globalAlpha = 0.55; P(ctx, vary('#2c241c', dk), 0, () => ctx.ellipse(x + 130, y + 34, 100, 24, 0, 0, Math.PI * 2)); ctx.globalAlpha = 1;
  P(ctx, vary('#6a5442', dk), 3.5, () => { ctx.moveTo(x - 74, y + 16); ctx.quadraticCurveTo(x - 34, y - 40, x - 32, y - 330); ctx.lineTo(x + 40, y - 330); ctx.quadraticCurveTo(x + 36, y - 40, x + 84, y + 16); ctx.quadraticCurveTo(x, y + 2, x - 74, y + 16); ctx.closePath(); });
  ctx.lineCap = 'round';
  for (const [dx, dy] of [[-210, -440], [210, -470], [-90, -520], [120, -540]]) { ctx.strokeStyle = LINE; ctx.lineWidth = 19; ctx.beginPath(); ctx.moveTo(x + 8, y - 300); ctx.quadraticCurveTo(x + dx * 0.5, y + dy * 0.72, x + dx, y + dy); ctx.stroke(); ctx.strokeStyle = vary('#6a5442', dk); ctx.lineWidth = 14; ctx.stroke(); }
  for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, r = i % 2 ? 1 : 0.62; P(ctx, vary(i % 3 === 0 ? '#587a3e' : i % 3 === 1 ? '#4c6c36' : '#638546', dk), 0, () => ctx.ellipse(x + Math.cos(a) * 250 * r + Math.sin(t * 0.7 + i) * 4, y - 530 + Math.sin(a) * 130 * r, 170, 108, 0, 0, Math.PI * 2)); }
  for (let i = 0; i < 6; i++) { const fx = x - 180 + i * 72, fy = y - 460 + (i % 3) * 42; P(ctx, vary('#93ad62', dk), 2.5, () => ctx.ellipse(fx, fy, 24, 28, 0, 0, Math.PI * 2)); }
}

// ---------- gian trong: rương, ảnh cưới, đèn dầu, chiếu ----------
export const GIAN = { lamp: { x: 1120, y: 660 }, photo: { x: 470, y: 300 } };
export function gianNha(k, o = {}) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#c8b690'; ctx.fillRect(-100, -100, W + 200, 900);
  ctx.save(); ctx.globalAlpha = 0.1; for (let i = 0; i < 12; i++) { ctx.fillStyle = '#6a5a3a'; ctx.beginPath(); ctx.ellipse(R(k, i + 340) * W, R(k, i + 341) * 700, 130, 60, 0, 0, Math.PI * 2); ctx.fill(); } ctx.restore();
  for (const x of [120, 1800]) P(ctx, '#6a4a32', 3, () => ctx.rect(x - 22, -100, 44, 900));
  P(ctx, '#7a5a3e', 3, () => ctx.rect(-100, -40, W + 200, 46));
  ctx.fillStyle = '#7f6048'; ctx.fillRect(-100, 800, W + 200, 400); P(ctx, null, 3, () => { ctx.moveTo(-100, 800); ctx.lineTo(W + 100, 800); });
  // bàn thờ gia tiên nhỏ trên cao
  P(ctx, '#6a3a28', 3, () => ctx.rect(860, 210, 340, 24)); P(ctx, '#a08a5a', 3, () => ctx.rect(990, 168, 80, 42));
  // ảnh cưới
  anhCuoi(k, GIAN.photo.x, GIAN.photo.y, 0.86);
  // rương gỗ
  P(ctx, '#7a5234', 3.5, () => ctx.roundRect(200, 620, 340, 190, 10)); P(ctx, '#8d6340', 3.5, () => ctx.roundRect(190, 590, 360, 62, 14)); P(ctx, '#c8a24a', 2.5, () => ctx.rect(350, 640, 40, 36));
  // giường + màn
  if (o.bed !== false) { P(ctx, '#8a6a3a', 3, () => ctx.rect(1320, 650, 560, 30)); for (const x of [1340, 1840]) P(ctx, '#7a5a30', 3, () => ctx.rect(x, 680, 28, 130)); P(ctx, '#d8c08a', 2, () => ctx.rect(1330, 638, 540, 14)); P(ctx, '#ece6d4', 2, () => ctx.roundRect(1350, 610, 130, 34, 12)); if (o.pillow) o.pillow(); }
  // bàn con + đèn dầu
  P(ctx, '#6a4a30', 3, () => ctx.rect(1000, 680, 240, 18)); for (const x of [1016, 1208]) P(ctx, '#5a3e28', 3, () => ctx.rect(x, 698, 16, 110));
  // chiếu
  if (o.chieu) { P(ctx, '#d8c08a', 3, () => { ctx.moveTo(520, 860); ctx.lineTo(1400, 860); ctx.lineTo(1500, 1040); ctx.lineTo(420, 1040); ctx.closePath(); }); ctx.strokeStyle = 'rgba(120,90,40,0.35)'; ctx.lineWidth = 2; for (let x = 460; x < 1500; x += 22) { ctx.beginPath(); ctx.moveTo(x + (960 - x) * 0.08, 860); ctx.lineTo(x, 1040); ctx.stroke(); } }
}
// Mâm cơm tròn trên chiếu, tâm (x, y).
export function mam(k, x, y, s = 1) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#7c5a36', 3.5, () => ctx.ellipse(0, 0, 200, 56, 0, 0, Math.PI * 2)); P(ctx, '#94704a', 2, () => ctx.ellipse(0, -5, 186, 48, 0, 0, Math.PI * 2));
  for (const [dx, dy] of [[-96, -8], [0, -22], [92, -6], [0, 16]]) { P(ctx, '#ece6d8', 2.5, () => ctx.ellipse(dx, dy, 42, 15, 0, 0, Math.PI * 2)); P(ctx, dx ? '#f6f1e4' : '#6e8a48', 0, () => ctx.ellipse(dx, dy - 2, 30, 8, 0, 0, Math.PI * 2)); }
  ctx.restore();
}

// ---------- bến đò ----------
export const BDO = { step: { x: 820, y: 930 }, edge: 856, boat: { x: 1430, y: 770 } };
export function benDo(k, o = {}) {
  const { ctx } = k, time = o.time ?? 'night', dk = DK[time];
  benDong(k, { time: time === 'dawn' ? 'dusk' : time, swirl: 0, sung: false, moon: time === 'night', ridge: false });
  // con đò neo
  if (o.boat !== false) {
    const b = BDO.boat; ctx.strokeStyle = vary('#3a2c20', dk); ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(b.x + 300, b.y + 110); ctx.lineTo(b.x + 300, b.y - 130); ctx.stroke();
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(b.x + 300, b.y - 60); ctx.quadraticCurveTo(b.x + 250, b.y + 20, b.x + 210, b.y - 10); ctx.stroke();
    P(ctx, vary('#5c4632', dk), 3.5, () => { ctx.moveTo(b.x - 220, b.y - 40); ctx.quadraticCurveTo(b.x - 150, b.y + 44, b.x - 40, b.y + 46); ctx.lineTo(b.x + 90, b.y + 46); ctx.quadraticCurveTo(b.x + 190, b.y + 40, b.x + 230, b.y - 40); ctx.quadraticCurveTo(b.x, b.y - 8, b.x - 220, b.y - 40); ctx.closePath(); });
    P(ctx, vary('#8c7246', dk), 3, () => { ctx.moveTo(b.x - 100, b.y - 16); ctx.quadraticCurveTo(b.x, b.y - 120, b.x + 110, b.y - 16); ctx.closePath(); });
    ctx.strokeStyle = vary('#6e5834', dk); ctx.lineWidth = 2.5; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(b.x + i * 26, b.y - 14); ctx.quadraticCurveTo(b.x + i * 16, b.y - 74, b.x + i * 7, b.y - 96); ctx.stroke(); }
  }
  // bậc đá xuống sông
  const c = BDO.step.x;
  for (let i = 0; i < 4; i++) { const y = 866 + i * 46, w = 170 + i * 60; P(ctx, vary(i % 2 ? '#8e8878' : '#9c9586', dk), 3, () => { ctx.moveTo(c - w, y); ctx.lineTo(c + w, y); ctx.lineTo(c + w + 30, y + 46); ctx.lineTo(c - w - 30, y + 46); ctx.closePath(); }); }
}

// ---------- bãi tha ma ngoài đồng ----------
export function baiMo(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'night', dk = DK[time];
  sky(k, time, 620, o.moon !== false);
  for (const x of [240, 1650]) bamboo(k, x, 650, 300, dk);
  P(ctx, vary('#7c8448', dk), 3, () => { ctx.moveTo(-100, 660); ctx.quadraticCurveTo(900, 620, W + 100, 660); ctx.lineTo(W + 100, H + 100); ctx.lineTo(-100, H + 100); ctx.closePath(); });
  for (const [x, y, s] of [[300, 760, 0.9], [1460, 750, 1], [1700, 830, 1.2], [160, 880, 1.2]]) { P(ctx, vary('#8c7a58', dk), 3, () => { ctx.moveTo(x - 110 * s, y); ctx.quadraticCurveTo(x, y - 110 * s, x + 110 * s, y); ctx.closePath(); }); P(ctx, vary('#a8a08c', dk), 2.5, () => ctx.roundRect(x - 22 * s, y - 100 * s, 44 * s, 70 * s, 8)); }
  P(ctx, vary('#7a6648', dk), 3.5, () => { ctx.moveTo(760, 880); ctx.quadraticCurveTo(960, 790, 1160, 880); ctx.closePath(); });
}
// Nón mê úp lên mặt người nằm: tâm vành (x, y).
export function nonUp(k, x, y, s = 1) { const { ctx } = k; P(ctx, '#6a5c42', 3, () => ctx.ellipse(x, y + 8 * s, 124 * s, 74 * s, 0, 0, Math.PI * 2)); P(ctx, '#7a6a4c', 3, () => { ctx.moveTo(x - 118 * s, y); ctx.quadraticCurveTo(x - 40 * s, y - 60 * s, x, y - 118 * s); ctx.quadraticCurveTo(x + 40 * s, y - 60 * s, x + 118 * s, y); ctx.quadraticCurveTo(x, y + 18 * s, x - 118 * s, y); ctx.closePath(); }); ctx.strokeStyle = '#5c4e36'; ctx.lineWidth = 2.5; for (const d of [-0.55, -0.2, 0.2, 0.55]) { ctx.beginPath(); ctx.moveTo(x, y - 112 * s); ctx.lineTo(x + d * 118 * s, y + 4 * s); ctx.stroke(); } }
export { sepia };
