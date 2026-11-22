// Nhân Gian Chưa Kể — tập Bắc Kim Thang (19/11/2026): bộ cảnh xóm kinh miền Tây 1998 + nhân vật búp bê.
// Cảnh: kinh (bờ kinh, nhà lá, cầu bến, cầu khỉ, chòi bà Năm bên kia), cho (trong chòi, lồng đèn treo), nhaLa (trong nhà lá), moVuon (mộ xi măng trong vườn).
// Đạo cụ: longDen (ca|sao|tho|keo), damRuoc (đám rước không người), trong, co, lua, hopThiec, aoSoSinh, giayRam, duaNuoc, xuong.
import { doll, sepia } from '/channel/nhan-gian-doll.js';
import { vary } from '/channel/nhan-gian-hd.js';
import { LINE } from '/channel/nhan-gian-cauco.js';

const T = (k) => k.gt ?? 0;
const R = (k, i) => k.rand(i);
const TAU = Math.PI * 2;
function P(ctx, fill, lw, fn, stroke = LINE) { ctx.beginPath(); fn(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
const DK = { day: 0, dusk: -0.14, night: -0.55, dawn: -0.22 };
const SKY = { day: ['#a8c4cc', '#e6dcc0'], dusk: ['#7c5a50', '#d89a68'], night: ['#0e1626', '#26324a'], dawn: ['#6f8092', '#d8c0a2'] };
function sky(k, time, h = 520, moon = false) { const { ctx, W } = k, c = SKY[time] ?? SKY.day, g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, c[0]); g.addColorStop(1, c[1]); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, h + 100); if (moon) { ctx.fillStyle = '#f2ead0'; ctx.beginPath(); ctx.arc(1620, 130, 54, 0, TAU); ctx.fill(); } }

// ---------- nhân vật ----------
export const UT = { kind: 'kid', skin: '#e2b48e', hair: 'long', hairColor: '#1e1610', top: '#c88a8a', topStyle: 'baba', pants: '#2e2e36', shoes: '#e2b48e' };
export const MA = { kind: 'woman', skin: '#d8a882', hair: 'bun', hairColor: '#1e1610', top: '#7a6a98', topStyle: 'baba', pants: '#1e1e24', shoes: '#5a4a3a' };
export const NGOAI = { kind: 'old', skin: '#cfa384', hair: 'bun', hairColor: '#b0a89e', top: '#2e2a30', topStyle: 'baba', pants: '#1e1c1a', shoes: '#4a3a2a', hat: 'khan', hatColor: '#3a3040' };
export const BA_NAM = { kind: 'old', skin: '#c89c78', hair: 'bun', hairColor: '#9a948a', top: '#6a5440', topStyle: 'baba', pants: '#1e1c1a', shoes: '#c89c78', hat: 'khan', hatColor: '#5a4c40' };
export const NAM_TRE = { kind: 'woman', skin: '#e0b892', hair: 'long', hairColor: '#1e1610', top: '#c8b8a0', topStyle: 'baba', pants: '#1e1e24', shoes: '#e0b892' };
export const NGOAI_TRE = { kind: 'woman', skin: '#d8ac88', hair: 'bun', hairColor: '#1e1610', top: '#3a3640', topStyle: 'baba', pants: '#1e1c1a', shoes: '#5a4a3a' };
export const SAU = { kind: 'man', skin: '#b88c68', hair: 'short', hairColor: '#1e1610', top: '#5a6a72', topStyle: 'baba', pants: '#2a2a2e', roll: true, shoes: '#b88c68' };
export const XOM = [
  { kind: 'kid', skin: '#c8966e', hair: 'buzz', hairColor: '#241a12', top: '#a8b0a0', topStyle: 'tee', sleeve: 'short', pants: '#3a4a5a', shoes: '#c8966e' },
  { kind: 'kid', skin: '#e0b48e', hair: 'bun', hairColor: '#1e1610', top: '#d8a050', topStyle: 'baba', pants: '#33333c', shoes: '#e0b48e' },
  { kind: 'kid', skin: '#d8ac84', hair: 'spiky', hairColor: '#1e1610', top: '#6a9a8a', topStyle: 'tee', sleeve: 'short', pants: '#3a3a44', shoes: '#d8ac84' },
];
export const LANG = [
  { kind: 'man', skin: '#b88c68', hair: 'short', hairColor: '#241a12', top: '#5a6a72', topStyle: 'baba', pants: '#2a2a2e', shoes: '#4a3a2a', hat: 'non' },
  { kind: 'woman', skin: '#d0a27c', hair: 'bun', hairColor: '#3a3028', top: '#8a6f62', topStyle: 'baba', pants: '#2a2622', shoes: '#5a4a3a' },
];
export const ch = (k, x, y, h, o) => doll(k, x, y, h, o);

// ---------- lồng đèn ----------
// Lồng đèn giấy kiếng, tâm (x, y). type: ca | sao | tho | keo. o.lit (mặc định true), o.dang (khung tre dán dở), o.tag (nhãn giấy dưới đuôi).
export const LOAI = ['ca', 'sao', 'tho', 'keo'];
const MAU = { ca: '#e05a30', sao: '#d83a2e', tho: '#f0e8dc', keo: '#e8b040' };
export function longDen(k, x, y, s = 1, type = 'ca', o = {}) {
  const { ctx } = k, t = T(k), lit = o.lit !== false, c = o.color ?? MAU[type], sw = Math.sin(t * 1.6 + x * 0.01) * 0.06;
  ctx.save(); ctx.translate(x, y); ctx.rotate(sw); ctx.scale(s, s);
  // cần tre + dây treo
  if (o.stick !== false) { ctx.strokeStyle = '#7a6440'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-70, -150); ctx.lineTo(60, -110); ctx.stroke(); ctx.strokeStyle = '#3a2c20'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -128); ctx.lineTo(0, -62); ctx.stroke(); }
  if (lit) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(0, 0, 10, 0, 0, 150); g.addColorStop(0, `rgba(255,190,110,${0.55 + Math.sin(t * 7 + x) * 0.06})`); g.addColorStop(1, 'rgba(255,190,110,0)'); ctx.fillStyle = g; ctx.fillRect(-150, -150, 300, 300); ctx.restore(); }
  const fill = (fn) => { if (o.dang) { ctx.strokeStyle = '#a08050'; ctx.lineWidth = 4; ctx.beginPath(); fn(); ctx.stroke(); ctx.save(); ctx.beginPath(); fn(); ctx.clip(); ctx.fillStyle = c; ctx.globalAlpha = 0.85; ctx.fillRect(-120, -90, 120, 200); ctx.restore(); return; } P(ctx, lit ? vary(c, 0.12) : vary(c, -0.25), 3.5, fn); };
  if (type === 'ca') {
    const body = () => { ctx.moveTo(-74, 0); ctx.bezierCurveTo(-60, -52, 40, -56, 66, -8); ctx.lineTo(104, -40); ctx.lineTo(96, 0); ctx.lineTo(104, 40); ctx.lineTo(66, 8); ctx.bezierCurveTo(40, 56, -60, 52, -74, 0); ctx.closePath(); };
    fill(body);
    if (!o.dang) { ctx.strokeStyle = 'rgba(120,30,10,0.45)'; ctx.lineWidth = 2.5; for (let i = 0; i < 4; i++) for (let j = -1; j <= 1; j++) { ctx.beginPath(); ctx.arc(-20 + i * 20, j * 20, 11, -1, 1); ctx.stroke(); } P(ctx, '#f6f0e0', 2.5, () => ctx.arc(-48, -10, 10, 0, TAU)); P(ctx, '#1e1610', 0, () => ctx.arc(-50, -10, 5, 0, TAU)); P(ctx, vary(c, 0.25), 2.5, () => { ctx.moveTo(-10, -44); ctx.quadraticCurveTo(10, -72, 34, -40); ctx.closePath(); }); }
  } else if (type === 'sao') {
    fill(() => { for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 30 : 72; i ? ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); });
    if (!o.dang) { ctx.strokeStyle = '#f2d060'; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; ctx.moveTo(Math.cos(a) * 64, Math.sin(a) * 64); ctx.lineTo(Math.cos(a) * 86, Math.sin(a) * 86 + 6); } ctx.stroke(); }
  } else if (type === 'tho') {
    fill(() => { ctx.ellipse(0, 10, 62, 44, 0, 0, TAU); }); fill(() => { ctx.ellipse(-46, -26, 30, 26, 0, 0, TAU); }); fill(() => { ctx.ellipse(-56, -70, 9, 34, -0.2, 0, TAU); }); fill(() => { ctx.ellipse(-36, -72, 9, 34, 0.15, 0, TAU); });
    if (!o.dang) { P(ctx, '#e05a6a', 0, () => ctx.arc(-58, -28, 4.5, 0, TAU)); P(ctx, '#f0b0b8', 0, () => ctx.ellipse(-56, -70, 4, 22, -0.2, 0, TAU)); }
  } else {
    fill(() => ctx.rect(-50, -60, 100, 120)); if (!o.dang) { ctx.strokeStyle = 'rgba(60,30,10,0.6)'; ctx.lineWidth = 3; for (const d of [-20, 20]) { ctx.beginPath(); ctx.moveTo(d, -60); ctx.lineTo(d, 60); ctx.stroke(); } ctx.fillStyle = 'rgba(40,20,10,0.5)'; const ph = t * 1.4; for (let i = 0; i < 3; i++) { const xx = ((i * 40 + ph * 30) % 120) - 60; ctx.beginPath(); ctx.ellipse(xx, 0, 10, 18, 0, 0, TAU); ctx.fill(); } P(ctx, '#b0342c', 3, () => ctx.rect(-56, -70, 112, 14)); P(ctx, '#b0342c', 3, () => ctx.rect(-56, 56, 112, 14)); }
  }
  if (o.tag) { ctx.strokeStyle = '#3a2c20'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(type === 'ca' ? 96 : 0, type === 'ca' ? 24 : 60); ctx.lineTo(type === 'ca' ? 104 : 4, type === 'ca' ? 70 : 100); ctx.stroke(); ctx.save(); ctx.translate(type === 'ca' ? 104 : 4, type === 'ca' ? 92 : 122); ctx.rotate(0.08); P(ctx, '#ece4cc', 2, () => ctx.rect(-46, -20, 92, 40)); ctx.fillStyle = '#2a3550'; ctx.font = 'italic 500 15px "Be Vietnam Pro", serif'; ctx.textAlign = 'center'; ctx.fillText('Bé Rằm', 0, -3); ctx.fillText(String(o.tag), 0, 14); ctx.restore(); }
  ctx.restore();
}
// Trống da cũ treo trên giá tre; hit 0..1 dùi gõ.
export function trong(k, x, y, s = 1, o = {}) {
  const { ctx } = k, t = T(k), hit = o.hit ?? Math.max(0, Math.sin(t * 4.2)), ring = (t * 1.05) % 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#8a3a2a', 3.5, () => { ctx.moveTo(-70, -60); ctx.bezierCurveTo(-90, -20, -90, 20, -70, 60); ctx.lineTo(70, 60); ctx.bezierCurveTo(90, 20, 90, -20, 70, -60); ctx.closePath(); });
  P(ctx, '#d8c49a', 3.5, () => ctx.ellipse(0, -60, 70, 18, 0, 0, TAU)); for (let i = 0; i < 10; i++) P(ctx, '#e8d090', 0, () => ctx.arc(-66 + i * 14.6, -40 + Math.abs(i - 4.5) * 1.2, 3, 0, TAU));
  ctx.save(); ctx.translate(40, -110 + hit * 30); ctx.rotate(0.6); ctx.strokeStyle = '#5a4530'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 70); ctx.stroke(); ctx.restore();
  if (o.ring !== false) { ctx.strokeStyle = `rgba(240,220,170,${0.45 * (1 - ring)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, -60, 80 + ring * 120, 24 + ring * 40, 0, 0, TAU); ctx.stroke(); }
  ctx.restore();
}
// Cờ ngũ sắc trên cán tre, chân cán (x, y).
export function co(k, x, y, s = 1) {
  const { ctx } = k, t = T(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#7a6440'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -330); ctx.stroke();
  const cols = ['#c83a2e', '#e0b040', '#3a6a9a', '#e8e0d0', '#3a8a4a'];
  cols.forEach((c, i) => P(ctx, vary(c, -0.1), 1.5, () => { const y0 = -326 + i * 22, w = Math.sin(t * 3 + i * 0.6) * 10; ctx.moveTo(0, y0); ctx.quadraticCurveTo(60, y0 + w, 130, y0 + w * 1.5); ctx.lineTo(130, y0 + 22 + w * 1.5); ctx.quadraticCurveTo(60, y0 + 22 + w, 0, y0 + 22); ctx.closePath(); }));
  ctx.restore();
}
// Đám rước không người: lồng đèn ngang tầm tay con nít, cờ, trống, đi dọc đường y (mặt đất). p dịch theo trục x.
export function damRuoc(k, p, o = {}) {
  const n = o.n ?? 14, gap = o.gap ?? 150, y = o.y ?? 990, s = o.s ?? 0.62, x0 = o.x0 ?? -200 + p * (o.span ?? 1500), t = T(k);
  const xs = [];
  for (let i = 0; i < n; i++) { const x = x0 - i * gap, bob = Math.sin(t * 2.4 + i * 0.9) * 8; if (i % 5 === 2) co(k, x + 40, y + bob * 0.3, s * 0.95); longDen(k, x, y - 230 * s * 1.6 + bob, s, LOAI[i % 4], { tag: o.tags ? (o.tags[i] ?? null) : null }); xs.push(x); }
  if (o.drum !== false) trong(k, x0 + 160, y - 150, s * 1.1);
  return xs;
}

// ---------- cây dừa nước ----------
export function duaNuoc(k, x, y, s = 1, dk = 0) {
  const { ctx } = k, t = T(k);
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI / 2 + (i - 3) * 0.32 + Math.sin(t * 0.6 + i + x) * 0.02, len = (260 + (i % 3) * 50) * s;
    const ex = x + Math.cos(a) * len, ey = y + Math.sin(a) * len * 0.9;
    ctx.strokeStyle = vary('#5a7a3a', dk); ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(a) * len * 0.5, y + Math.sin(a) * len * 0.7, ex, ey + 40 * s); ctx.stroke();
    ctx.strokeStyle = vary(i % 2 ? '#4e6e34' : '#628a44', dk); ctx.lineWidth = 3 * s;
    for (let j = 2; j < 14; j++) { const q = j / 14, px = x + (ex - x) * q, py = y + (ey + 40 * s - y) * q - Math.sin(q * Math.PI) * 30 * s; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 26 * s, py + 30 * s); ctx.moveTo(px, py); ctx.lineTo(px + 26 * s, py + 30 * s); ctx.stroke(); }
  }
}
// Xuồng ba lá, tâm (x, y mặt nước).
export function xuong(k, x, y, s = 1, dk = 0) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y + Math.sin(T(k) * 1.4) * 3); ctx.scale(s, s);
  P(ctx, vary('#4e3a28', dk), 3.5, () => { ctx.moveTo(-170, -26); ctx.quadraticCurveTo(-110, 24, 0, 26); ctx.quadraticCurveTo(110, 24, 170, -26); ctx.quadraticCurveTo(0, -6, -170, -26); ctx.closePath(); });
  ctx.strokeStyle = vary('#6a5034', dk); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-150, -16); ctx.quadraticCurveTo(0, 4, 150, -16); ctx.stroke(); ctx.restore();
}

// ---------- bờ kinh ----------
// o.time, o.moon, o.cho (chòi bà Năm bên kia), o.choLit (đèn trong chòi), o.ben (cầu bến), o.nha (nhà lá bên này), o.cau (cầu khỉ).
export const KINH = { far: 470, water0: 520, water1: 770, path: 900, ben: 1060, cho: 1380, cau: 560 };
export function kinh(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'night', dk = DK[time], t = T(k);
  sky(k, time, 540, o.moon);
  // bờ bên kia
  P(ctx, vary('#5c6a3a', dk), 3, () => ctx.rect(-100, 430, W + 200, 100));
  for (const [x, s] of [[120, 0.8], [380, 0.7], [820, 0.9], [1000, 0.6], [1700, 0.85], [1880, 0.7]]) duaNuoc(k, x, 500, s, dk);
  if (o.cho !== false) {
    const c = KINH.cho; for (const d of [-130, -40, 50, 130]) P(ctx, vary('#4a3a28', dk), 2.5, () => ctx.rect(c + d - 7, 420, 14, 130));
    P(ctx, vary('#9a8a60', dk), 3, () => ctx.rect(c - 150, 300, 300, 130)); ctx.strokeStyle = vary('#7c6c48', dk); ctx.lineWidth = 2; for (let x = c - 140; x < c + 150; x += 14) { ctx.beginPath(); ctx.moveTo(x, 300); ctx.lineTo(x, 430); ctx.stroke(); }
    P(ctx, vary('#6e5c38', dk), 3, () => { ctx.moveTo(c - 190, 312); ctx.lineTo(c - 60, 200); ctx.lineTo(c + 60, 200); ctx.lineTo(c + 190, 312); ctx.closePath(); });
    P(ctx, o.choLit ? '#f2c070' : vary('#2a2218', dk), 2.5, () => ctx.rect(c - 40, 340, 80, 60));
  }
  // cầu khỉ
  if (o.cau !== false) { const c = KINH.cau; ctx.strokeStyle = vary('#7a6440', dk); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(c - 260, 800); ctx.quadraticCurveTo(c - 80, 640, c + 120, 470); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(c - 250, 720); ctx.quadraticCurveTo(c - 80, 560, c + 120, 400); ctx.stroke(); for (let i = 0; i < 6; i++) { const q = i / 5, x = c - 260 + q * 380, yb = 800 - q * 330 + Math.sin(q * Math.PI) * -20; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 22, yb + 70); ctx.lineTo(x + 22, yb - 80); ctx.moveTo(x + 22, yb + 70); ctx.lineTo(x - 22, yb - 80); ctx.stroke(); } }
  // mặt nước
  const g = ctx.createLinearGradient(0, 520, 0, 780); g.addColorStop(0, vary('#4a6a70', dk)); g.addColorStop(1, vary('#2e4a52', dk)); ctx.fillStyle = g; ctx.fillRect(-100, 520, W + 200, 260);
  ctx.strokeStyle = `rgba(200,220,230,${time === 'night' ? 0.12 : 0.22})`; ctx.lineWidth = 2.5; for (let i = 0; i < 18; i++) { const y = 540 + (i % 6) * 40, x = ((R(k, i + 200) * W + t * 20 * (i % 2 ? 1 : -1)) % (W + 200)) - 100; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 70, y); ctx.stroke(); }
  if (o.moon) { ctx.fillStyle = 'rgba(242,234,208,0.35)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(1620 + Math.sin(t * 1.5 + i) * 10, 560 + i * 34, 60 - i * 6, 6, 0, 0, TAU); ctx.fill(); } }
  // bờ bên này
  P(ctx, vary('#6c6440', dk), 3, () => { ctx.moveTo(-100, 790); ctx.quadraticCurveTo(900, 760, W + 100, 790); ctx.lineTo(W + 100, H + 100); ctx.lineTo(-100, H + 100); ctx.closePath(); });
  P(ctx, vary('#8a7a58', dk), 0, () => { ctx.moveTo(-100, 860); ctx.quadraticCurveTo(900, 830, W + 100, 860); ctx.lineTo(W + 100, 940); ctx.quadraticCurveTo(900, 910, -100, 940); ctx.closePath(); });
  // cầu bến + xuồng
  if (o.ben !== false) { const b = KINH.ben; xuong(k, b + 230, 700, 0.9, dk); P(ctx, vary('#7a6040', dk), 3, () => { ctx.moveTo(b - 70, 800); ctx.lineTo(b + 70, 800); ctx.lineTo(b + 60, 640); ctx.lineTo(b - 60, 640); ctx.closePath(); }); ctx.strokeStyle = vary('#5a4430', dk); ctx.lineWidth = 2.5; for (let y = 660; y < 800; y += 24) { ctx.beginPath(); ctx.moveTo(b - 64, y); ctx.lineTo(b + 64, y); ctx.stroke(); } for (const d of [-60, 60]) P(ctx, vary('#4a3a28', dk), 2.5, () => ctx.rect(b + d - 7, 640, 14, 120)); }
  // nhà lá bên này (bên trái)
  if (o.nha !== false) {
    P(ctx, vary('#9a8a60', dk), 3.5, () => ctx.rect(-100, 560, 560, 330)); ctx.strokeStyle = vary('#7c6c48', dk); ctx.lineWidth = 2; for (let x = -90; x < 460; x += 16) { ctx.beginPath(); ctx.moveTo(x, 560); ctx.lineTo(x, 890); ctx.stroke(); }
    P(ctx, vary('#6e5c38', dk), 3.5, () => { ctx.moveTo(-140, 580); ctx.lineTo(-20, 420); ctx.lineTo(380, 420); ctx.lineTo(520, 580); ctx.closePath(); });
    P(ctx, o.nhaLit ? '#e8b060' : vary('#2a2218', dk), 3, () => ctx.rect(280, 640, 120, 100)); ctx.strokeStyle = vary('#4a3a28', dk); ctx.lineWidth = 5; for (let x = 300; x < 400; x += 24) { ctx.beginPath(); ctx.moveTo(x, 640); ctx.lineTo(x, 740); ctx.stroke(); }
    P(ctx, vary('#3a2c20', dk), 3, () => ctx.rect(80, 650, 130, 240));
  }
  for (const [x, s] of [[620, 0.55], [1500, 0.7], [1840, 0.6]]) duaNuoc(k, x, 800, s, dk);
}

// ---------- trong chòi bà Năm: lồng đèn treo dưới mái ----------
// o.n số lồng đèn treo (0..37), o.dang = con cá chép làm dở trên bộ ván, o.tags = hiện nhãn.
export function cho(k, o = {}) {
  const { ctx, W, H } = k, n = o.n ?? 37;
  ctx.fillStyle = '#8a7a52'; ctx.fillRect(-100, -100, W + 200, H + 200); ctx.strokeStyle = '#6e6040'; ctx.lineWidth = 3; for (let x = -80; x < W + 80; x += 20) { ctx.beginPath(); ctx.moveTo(x, -100); ctx.lineTo(x + 4, H); ctx.stroke(); }
  P(ctx, '#5a4630', 3.5, () => ctx.rect(-100, 60, W + 200, 30)); P(ctx, '#5a4630', 3.5, () => ctx.rect(-100, 260, W + 200, 22));
  P(ctx, '#6a5438', 3, () => ctx.rect(-100, 840, W + 200, 300));
  // bộ ván
  P(ctx, '#7a5a38', 3.5, () => ctx.rect(560, 760, 800, 40)); for (const x of [580, 1320]) P(ctx, '#5e4630', 3, () => ctx.rect(x, 800, 24, 90));
  if (o.dang) { longDen(k, 960, 690, 0.95, 'ca', { lit: false, dang: true, stick: false }); ctx.strokeStyle = '#a08050'; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(700 + i * 30, 750); ctx.lineTo(820 + i * 30, 740); ctx.stroke(); } }
  // hàng lồng đèn treo
  for (let i = 0; i < n; i++) { const row = i < 19 ? 0 : 1, col = row ? i - 19 : i, cols = row ? 18 : 19, x = 80 + col * ((W - 160) / (cols - 1)) + (row ? 50 : 0), y = row ? 420 : 210; ctx.strokeStyle = '#3a2c20'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, row ? 282 : 90); ctx.lineTo(x, y - 40); ctx.stroke(); longDen(k, x, y, 0.42, LOAI[i % 4], { lit: o.lit ?? false, stick: false, tag: o.tags ? 1961 + i : null }); }
}

// ---------- trong nhà lá ----------
export const NHA = { win: { x: 1380, y: 380 }, lamp: { x: 760, y: 640 }, ban: { x: 1500, y: 700 } };
export function nhaLa(k, o = {}) {
  const { ctx, W, H } = k, night = (o.time ?? 'night') === 'night';
  ctx.fillStyle = '#9a8860'; ctx.fillRect(-100, -100, W + 200, 900); ctx.strokeStyle = '#7c6c48'; ctx.lineWidth = 3; for (let x = -80; x < W + 80; x += 18) { ctx.beginPath(); ctx.moveTo(x, -100); ctx.lineTo(x + 3, 820); ctx.stroke(); }
  P(ctx, '#5a4630', 3.5, () => ctx.rect(-100, 40, W + 200, 34));
  P(ctx, '#6a5438', 3, () => ctx.rect(-100, 820, W + 200, 300));
  // cửa sổ song nhìn ra bờ kinh
  const { x, y } = NHA.win; P(ctx, night ? '#101a28' : '#a8c4cc', 6, () => ctx.rect(x - 200, y - 150, 400, 300), '#4a3a28');
  if (night && o.moon !== false) { ctx.fillStyle = '#f2ead0'; ctx.beginPath(); ctx.arc(x + 110, y - 80, 30, 0, TAU); ctx.fill(); }
  if (o.outside) { ctx.save(); ctx.beginPath(); ctx.rect(x - 200, y - 150, 400, 300); ctx.clip(); o.outside(x, y); ctx.restore(); }
  ctx.fillStyle = '#4a3a28'; for (let i = 1; i < 7; i++) ctx.fillRect(x - 200 + i * 57 - 6, y - 150, 12, 300);
  // bộ ván + bàn thờ nhỏ
  P(ctx, '#7a5a38', 3.5, () => ctx.rect(120, 700, 700, 40)); for (const xx of [140, 780]) P(ctx, '#5e4630', 3, () => ctx.rect(xx, 740, 24, 90));
  P(ctx, '#6a3a28', 3, () => ctx.rect(860, 280, 300, 20)); P(ctx, '#a08a5a', 3, () => ctx.rect(970, 240, 80, 40));
  if (o.ca) longDen(k, 1010, 200, 0.55, 'ca', { lit: o.caLit ?? false, stick: false });
}

// ---------- mộ xi măng trong vườn ----------
export function moVuon(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'day', dk = DK[time];
  sky(k, time, 700); for (const [x, s] of [[200, 0.9], [1750, 1]]) duaNuoc(k, x, 720, s, dk);
  P(ctx, vary('#6a7a48', dk), 3, () => ctx.rect(-100, 700, W + 200, H));
  P(ctx, vary('#b8b0a0', dk), 3.5, () => ctx.rect(660, 760, 600, 170)); P(ctx, vary('#a8a090', dk), 3.5, () => ctx.rect(700, 700, 520, 70));
  P(ctx, vary('#c8c0b0', dk), 3.5, () => { ctx.moveTo(860, 700); ctx.lineTo(860, 520); ctx.quadraticCurveTo(960, 460, 1060, 520); ctx.lineTo(1060, 700); ctx.closePath(); });
  if (o.ca) longDen(k, 960, 620, 0.5, 'ca', { lit: o.caLit ?? true, stick: false });
}

// ---------- giấy tờ, đồ vật ----------
export function hopThiec(k, x, y, s = 1, open = 0) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#7a3a30', 4, () => ctx.roundRect(-180, -110, 360, 220, 18)); ctx.fillStyle = 'rgba(90,50,20,0.5)'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(-150 + R(k, i + 90) * 300, -90 + R(k, i + 91) * 180, 18, 10, 0, 0, TAU); ctx.fill(); }
  P(ctx, '#d8b860', 2, () => ctx.ellipse(0, 0, 90, 50, 0, 0, TAU));
  if (open) { ctx.save(); ctx.translate(0, -110); ctx.rotate(-open * 1.2); P(ctx, '#8a4a3a', 4, () => ctx.roundRect(-190, -30, 380, 34, 14)); ctx.restore(); }
  ctx.restore();
}
export function aoSoSinh(k, x, y, s = 1) {
  const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  P(ctx, '#e8dcb8', 3.5, () => { ctx.moveTo(-60, -80); ctx.lineTo(-130, -40); ctx.lineTo(-104, 10); ctx.lineTo(-70, -6); ctx.lineTo(-70, 90); ctx.lineTo(70, 90); ctx.lineTo(70, -6); ctx.lineTo(104, 10); ctx.lineTo(130, -40); ctx.lineTo(60, -80); ctx.quadraticCurveTo(0, -50, -60, -80); ctx.closePath(); });
  ctx.strokeStyle = '#b8a880'; ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(0, 90); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
}
// Tờ giấy gấp tư ghi ngày sinh Bé Rằm, tâm (x, y). o.lines.
export function giayRam(k, x, y, s = 1, o = {}) {
  const { ctx } = k, L = o.lines ?? ['Bé Rằm.', 'Sanh giờ Tý, đêm rằm tháng Tám,', 'năm Tân Sửu.'];
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.r ?? -0.03); ctx.scale(s, s);
  P(ctx, '#e2d6b4', 3, () => ctx.rect(-300, -200, 600, 400), '#7a6a52'); ctx.strokeStyle = 'rgba(120,100,70,0.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -200); ctx.lineTo(0, 200); ctx.moveTo(-300, 0); ctx.lineTo(300, 0); ctx.stroke();
  ctx.fillStyle = 'rgba(60,40,30,0.18)'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(-200 + R(k, i + 60) * 400, -140 + R(k, i + 61) * 280, 50, 24, 0, 0, TAU); ctx.fill(); }
  ctx.fillStyle = '#2a3550'; ctx.font = 'italic 500 40px "Be Vietnam Pro", Georgia, serif'; ctx.textAlign = 'left'; L.forEach((t, i) => ctx.fillText(t, -260, -90 + i * 76));
  ctx.restore();
}
// Đống lửa đốt lồng đèn.
export function lua(k, x, y, s = 1) {
  const { ctx } = k, t = T(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(0, -60, 10, 0, -60, 300); g.addColorStop(0, 'rgba(255,150,60,0.5)'); g.addColorStop(1, 'rgba(255,150,60,0)'); ctx.fillStyle = g; ctx.fillRect(-300, -360, 600, 500); ctx.restore();
  for (let i = 0; i < 9; i++) { const f = 1 + Math.sin(t * 9 + i * 1.7) * 0.22, fx = -120 + i * 30; P(ctx, i % 2 ? '#e8742e' : '#f2a03c', 0, () => { ctx.moveTo(fx - 34, 0); ctx.quadraticCurveTo(fx - 30, -90 * f, fx, -170 * f); ctx.quadraticCurveTo(fx + 30, -90 * f, fx + 34, 0); ctx.closePath(); }); }
  ctx.fillStyle = 'rgba(30,24,20,0.8)'; for (let i = 0; i < 12; i++) { const q = (t * 0.3 + i / 12) % 1; ctx.beginPath(); ctx.arc(-60 + R(k, i + 30) * 120 + Math.sin(t + i) * 20, -150 - q * 300, 4 + R(k, i + 31) * 5, 0, TAU); ctx.fill(); }
  ctx.restore();
}
export { sepia };
