// Bộ dựng cảnh kênh "Nếu Bạn Là" (khung ngang 1920×1080): nhân vật chibi bặm trợn, phông cảnh, đạo cụ.
// Dùng: import { G, BAN, ME, ..., bedroom, hotel, phone, zoom, ... } from '/channel/neu-ban-la.js';
// Một giọng đọc duy nhất: nhân vật "nói" bằng spk(k, 'a', 'b') = nhép miệng theo giọng dẫn giữa hai cue.
import { C } from '/engine/kit.js';

export const G = 930; // mặt sàn
const clamp = (v) => Math.max(0, Math.min(1, v));

// ---------- nhân vật (preset k.char) ----------
const base = { outfit: 'tunic', plain: true };
// "Bạn" ở phần 1: nữ sinh 18 tuổi, áo hồng, tóc dài.
export const BAN = { ...base, body: 'chibiGirl', color: '#f29bb8', hair: 'long', hairColor: '#2a1c15' };
export const ME = { ...base, body: 'chibiGirl', color: '#7b5ea7', hair: 'bun', hairColor: '#3a2a20', skin: '#eec39c', blush: false };
export const BO = { ...base, body: 'chibi', color: '#4a6f8a', hair: 'short', stubble: true, belly: 0.7, skin: '#e3b285' };
// Tùng: phụ hồ 24 tuổi (phần 2) — khi mặc quân phục giả thành "Thượng tá Hùng".
export const TUNG = { ...base, body: 'chibi', color: '#9aa3ad', hair: 'spiky', hairColor: '#2b1d16', sleeves: false, skin: '#dcaa7e' };
export const HUNG = { ...base, body: 'chibi', color: '#5d7a3a', hair: 'short', hairColor: '#2b1d16', hat: 'police', epaulet: true, skin: '#dcaa7e' };
// Tổ trưởng "anh Bò": to như tủ lạnh, đầu đinh, kính đen, xăm, dây chuyền, thuốc lá.
export const BOSS = { ...base, body: 'chibiBig', sleeves: false, color: '#222831', hair: 'buzz', shades: true, chain: 'big', tattoo: true, brows: true, stubble: true, scar: true, belly: 1, cig: true, skin: '#d9a679' };
export const KHANH = { ...base, body: 'chibi', color: '#e8b84a', hair: 'spiky', hairColor: '#c9772b', chain: true, shades: '#3a6b8f', skin: '#e3b285' };
export const GUARD = { ...base, body: 'chibiBig', color: '#3b3f46', hair: 'buzz', brows: true, stubble: true, shades: true, skin: '#c99868' };
export const LETAN = { ...base, body: 'chibi', color: '#e9e4dc', hair: 'short', face: 'blank' };
export const KIMKHI = { ...base, body: 'chibi', color: '#6b8e5a', hair: 'bald', stubble: true, belly: 1, beard: true, beardColor: '#8a8a8a' };
export const CO_VANG = { ...base, body: 'chibiGirl', color: '#c0392b', hair: 'perm', hairColor: '#4a2a1a' };
export const CA = { ...base, body: 'chibi', color: '#3d5a80', hair: 'short', brows: 'up' }; // công an thật, thường phục

// Miệng nhép theo giọng dẫn trong khoảng [cue a, cue b) — "nhân vật nói" mà vẫn một giọng.
export function spk(k, a, b) {
  const t = k.t, s = k.cue(a), e = b ? k.cue(b) : k.d;
  return t >= s && t < e ? k.talk() : 0;
}
// Nhịp nảy khi một vật/nhân vật xuất hiện.
export const pop = (k, cue, dur = 0.5) => k.at(cue, dur, 'back');

// ---------- chữ ----------
export function chap(k, title) {
  const p = k.at(0, 0.6);
  if (p <= 0) return;
  k.ctx.save(); k.ctx.globalAlpha *= p;
  const b = k.text(title, 70, 64, { size: 34, font: 'title', align: 'left', color: '#fff', outline: '#1b1b24', outlineWidth: 10 });
  k.ctx.restore();
  return b;
}
// Nhãn giờ kiểu nhật ký (góc trên phải): "9:00 SÁNG".
export function tag(k, text, cue = 0) {
  const p = k.at(cue, 0.5, 'back');
  if (p <= 0) return;
  k.group({ x: k.W - 230, y: 80, s: p, r: -0.04 }, () => {
    k.rect(-170, -46, 340, 92, { fill: '#1b1b24', stroke: '#f2c230', width: 5, seed: 901 });
    k.text(text, 0, 2, { size: 46, font: 'title', color: '#f2c230' });
  });
}
// Chữ to giữa/dưới khung (câu chốt).
export function cap(k, text, cue, o = {}) {
  const y = o.y ?? 990;
  k.text(text, o.x ?? k.W / 2, y, { size: o.size ?? 58, font: 'title', fx: o.fx ?? 'pop', p: k.at(cue, o.dur ?? 0.5), maxWidth: 1700, color: o.color ?? '#fff', outline: o.outline ?? '#1b1b24', outlineWidth: o.ow ?? 14 });
}
export function vig(k, a = 0.45) {
  const { ctx } = k;
  const g = ctx.createRadialGradient(k.W / 2, k.H / 2, k.H * 0.35, k.W / 2, k.H / 2, k.H * 0.95);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(10,8,20,${a})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, k.W, k.H);
}
// Phủ màu (đêm, hồi tưởng…)
export function tint(k, color, a) { k.ctx.save(); k.ctx.globalAlpha = a; k.ctx.fillStyle = color; k.ctx.fillRect(0, 0, k.W, k.H); k.ctx.restore(); }

// ---------- phông cảnh ----------
export function room(k, wall1, wall2, floor, o = {}) {
  const { ctx } = k;
  const g = ctx.createLinearGradient(0, 0, 0, G);
  g.addColorStop(0, wall1); g.addColorStop(1, wall2);
  ctx.fillStyle = g; ctx.fillRect(-200, -200, k.W + 400, G + 200);
  ctx.fillStyle = floor; ctx.fillRect(-200, G, k.W + 400, k.H - G + 200);
  ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(-200, G - 18, k.W + 400, 18);
  if (o.planks !== false) { ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 3; for (let y = G + 40; y < k.H + 100; y += 55) { ctx.beginPath(); ctx.moveTo(-200, y); ctx.lineTo(k.W + 200, y); ctx.stroke(); } }
}
export function windowBox(k, x, y, w, h, sky, o = {}) {
  const { ctx } = k;
  const g = ctx.createLinearGradient(0, y, 0, y + h);
  g.addColorStop(0, sky[0]); g.addColorStop(1, sky[1]);
  ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
  if (o.stars) { ctx.fillStyle = '#fff'; for (let i = 0; i < 14; i++) ctx.fillRect(x + k.rand(i) * w, y + k.rand(i + 50) * h * 0.7, 3, 3); }
  if (o.bars) { ctx.strokeStyle = '#3a3a40'; ctx.lineWidth = 10; for (let xx = x + w / 6; xx < x + w; xx += w / 6) { ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx, y + h); ctx.stroke(); } }
  ctx.strokeStyle = o.frame ?? '#f4efe6'; ctx.lineWidth = 16; ctx.strokeRect(x, y, w, h);
  ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.stroke();
}
export function lamp(k, x, y, a = 0.5, color = '255,214,140') {
  const { ctx } = k;
  const g = ctx.createRadialGradient(x, y, 10, x, y, 620);
  g.addColorStop(0, `rgba(${color},${a})`); g.addColorStop(1, `rgba(${color},0)`);
  ctx.fillStyle = g; ctx.fillRect(x - 700, y - 700, 1400, 1400);
}
// Phòng ngủ nữ sinh (ngày): cửa sổ trời xanh, bàn học, giá sách, đèn bàn.
export function bedroom(k, o = {}) {
  const { ctx } = k;
  room(k, '#f6e1e6', '#ecc9d2', '#c9a27e');
  windowBox(k, 180, 170, 360, 400, o.night ? ['#141b33', '#2d3a63'] : ['#8fd0f2', '#d8f0fb'], { stars: o.night });
  // giá sách
  ctx.fillStyle = '#9b6b4a'; ctx.fillRect(1380, 220, 380, 22); ctx.fillRect(1380, 360, 380, 22);
  const cols = ['#e25b45', '#3d7fc1', '#f2c230', '#6bb56b', '#8e5fb0', '#f29bb8'];
  for (let i = 0; i < 9; i++) { ctx.fillStyle = cols[i % 6]; ctx.fillRect(1395 + i * 40, 130 + (i % 3) * 8, 30, 90 - (i % 3) * 8); ctx.fillRect(1395 + i * 40, 268 + (i % 2) * 10, 30, 92 - (i % 2) * 10); }
  // bàn học
  ctx.fillStyle = '#b07a52'; ctx.fillRect(1180, 700, 640, 34); ctx.fillStyle = '#8c5d3c'; ctx.fillRect(1210, 734, 30, 196); ctx.fillRect(1760, 734, 30, 196);
  // đèn bàn + chồng sách
  ctx.fillStyle = '#3d7fc1'; ctx.fillRect(1680, 690, 70, 12); ctx.fillRect(1708, 600, 12, 92);
  ctx.beginPath(); ctx.moveTo(1660, 610); ctx.lineTo(1770, 610); ctx.lineTo(1740, 560); ctx.lineTo(1690, 560); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 4; i++) { ctx.fillStyle = cols[i]; ctx.fillRect(1300 + i * 4, 676 - i * 22, 200, 22); }
  // poster "ĐỖ ĐẠI HỌC"
  ctx.save(); ctx.translate(820, 330); ctx.rotate(-0.03); ctx.fillStyle = '#fffaf0'; ctx.fillRect(-150, -110, 300, 220); ctx.restore();
  k.text('QUYẾT TÂM', 820, 290, { size: 40, font: 'title', color: '#c0392b' });
  k.text('ĐỖ ĐẠI HỌC!', 820, 350, { size: 40, font: 'title', color: '#c0392b' });
  if (o.night) { tint(k, '#141b33', 0.35); lamp(k, 1715, 600, 0.45); }
}
// Phòng khách sạn mini 302 (đêm): giường, cửa có số phòng, đèn ngủ vàng, rèm kéo kín.
export function hotel(k, o = {}) {
  const { ctx } = k;
  room(k, '#5d6b73', '#4a565e', '#6e4f3a');
  // rèm kéo kín
  ctx.fillStyle = '#7a2f3a'; ctx.fillRect(140, 110, 460, 560);
  ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 6; for (let x = 170; x < 600; x += 50) { ctx.beginPath(); ctx.moveTo(x, 110); ctx.lineTo(x + 8, 670); ctx.stroke(); }
  // cửa
  ctx.fillStyle = '#8a5a3a'; ctx.fillRect(1500, 260, 300, G - 260); ctx.strokeStyle = '#5a3a24'; ctx.lineWidth = 10; ctx.strokeRect(1500, 260, 300, G - 260);
  ctx.fillStyle = '#f2c230'; ctx.beginPath(); ctx.arc(1540, 620, 14, 0, Math.PI * 2); ctx.fill();
  k.text('302', 1650, 360, { size: 54, font: 'title', color: '#f2c230' });
  // giường
  ctx.fillStyle = '#e9e4dc'; ctx.fillRect(160, 760, 760, 170); ctx.fillStyle = '#c9c1b4'; ctx.fillRect(160, 760, 760, 26);
  ctx.fillStyle = '#6e4f3a'; ctx.fillRect(140, 640, 40, 290);
  ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.ellipse(300, 760, 110, 36, 0, 0, Math.PI * 2); ctx.fill();
  // đèn ngủ
  ctx.fillStyle = '#4a3a2a'; ctx.fillRect(1000, 760, 120, 170);
  ctx.fillStyle = '#f2d27a'; ctx.beginPath(); ctx.moveTo(1020, 700); ctx.lineTo(1100, 700); ctx.lineTo(1085, 650); ctx.lineTo(1035, 650); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#4a3a2a'; ctx.fillRect(1055, 700, 10, 60);
  lamp(k, 1060, 680, 0.42);
  vig(k, o.dark ?? 0.55);
}
// Quầy lễ tân khách sạn mini.
export function reception(k) {
  const { ctx } = k;
  room(k, '#c9b38f', '#b59c76', '#8a6a4f');
  k.text('KHÁCH SẠN MINI · NGHỈ GIỜ / QUA ĐÊM', 960, 140, { size: 44, font: 'title', color: '#7a2f2f' });
  // bảng chìa khoá
  ctx.fillStyle = '#6e4f3a'; ctx.fillRect(1300, 250, 360, 260);
  for (let i = 0; i < 12; i++) { const x = 1335 + (i % 4) * 85, y = 290 + Math.floor(i / 4) * 75; ctx.fillStyle = '#f2c230'; ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(x - 3, y, 6, 30); }
  // quầy
  ctx.fillStyle = '#7a4e33'; ctx.fillRect(560, 640, 900, 290); ctx.fillStyle = '#5e3a25'; ctx.fillRect(540, 620, 940, 34);
}
// Phòng khách nhà "bạn" + chỗ đặt két.
export function living(k, o = {}) {
  const { ctx } = k;
  room(k, '#e8dcc4', '#d6c6a6', '#9c7552');
  windowBox(k, 260, 180, 320, 360, o.night ? ['#141b33', '#2d3a63'] : ['#f2b46b', '#f7dca8'], { stars: o.night });
  // lịch treo + ảnh gia đình
  ctx.fillStyle = '#fffaf0'; ctx.fillRect(860, 200, 200, 250); ctx.fillStyle = '#c0392b'; ctx.fillRect(860, 200, 200, 60);
  k.text('LỊCH', 960, 232, { size: 34, font: 'title', color: '#fff' });
  ctx.fillStyle = '#6e4f3a'; ctx.fillRect(1180, 230, 260, 190); ctx.fillStyle = '#f7e9c8'; ctx.fillRect(1196, 246, 228, 158);
  for (const [x, c] of [[1250, '#4a6f8a'], [1310, '#f29bb8'], [1370, '#7b5ea7']]) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, 325, 28, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(x - 24, 350, 48, 54); }
  if (o.night) tint(k, '#141b33', 0.3);
}
// Két sắt: o.open 0..1 (cửa mở), o.dent (méo), o.empty (trống).
export function safe(k, x, y, s = 1, o = {}) {
  k.group({ x, y, s }, () => {
    const { ctx } = k;
    const shake = o.shake ? Math.sin(k.t * 50) * 3 : 0;
    ctx.save(); ctx.translate(shake, 0);
    ctx.fillStyle = '#5f666e'; ctx.strokeStyle = '#2b2b2b'; ctx.lineWidth = 8;
    ctx.beginPath(); ctx.roundRect(-150, -340, 300, 340, 18); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#3a3f45'; ctx.fillRect(-120, -310, 240, 280);
    if (!o.empty) {
      // bên trong: tiền, vàng, sổ
      for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? '#3f8f5a' : '#4fa36a'; ctx.fillRect(-100, -120 - i * 26, 110, 24); }
      for (let i = 0; i < 3; i++) { ctx.fillStyle = '#f2c230'; ctx.beginPath(); ctx.moveTo(20, -60 - i * 34); ctx.lineTo(100, -60 - i * 34); ctx.lineTo(90, -88 - i * 34); ctx.lineTo(30, -88 - i * 34); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      ctx.fillStyle = '#c0392b'; ctx.fillRect(-100, -270, 90, 110);
    }
    // cửa két (xoay quanh bản lề trái)
    const op = o.open ?? 0;
    ctx.save(); ctx.translate(-150, 0); ctx.scale(1 - op * 1.6, 1);
    ctx.fillStyle = o.dent ? '#7a8088' : '#6c737b'; ctx.beginPath();
    if (o.dent) { ctx.moveTo(0, -340); ctx.lineTo(300, -330); ctx.lineTo(280, -170); ctx.lineTo(300, 0); ctx.lineTo(0, 0); } else ctx.roundRect(0, -340, 300, 340, 18);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#2b2b2b'; ctx.beginPath(); ctx.arc(150, -190, 46, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#c9ced4'; ctx.beginPath(); ctx.arc(150, -190, 30, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#2b2b2b'; ctx.fillRect(140, -228, 20, 20);
    ctx.fillStyle = '#c9ced4'; ctx.fillRect(230, -210, 34, 70);
    ctx.restore();
    ctx.restore();
  });
}
// Cửa hàng kim khí (xà beng, kìm, búa trên giá).
export function hardware(k) {
  const { ctx } = k;
  room(k, '#d9d2c3', '#c4bba8', '#7f7466', { planks: false });
  k.text('KIM KHÍ – ĐIỆN NƯỚC', 960, 120, { size: 56, font: 'title', color: '#2e6da4' });
  ctx.fillStyle = '#8a6a4f'; for (const y of [300, 480, 660]) ctx.fillRect(160, y, 1600, 20);
  for (let i = 0; i < 14; i++) {
    const x = 220 + i * 110, y = [300, 480, 660][i % 3];
    ctx.save(); ctx.translate(x, y); ctx.strokeStyle = '#3b3f46'; ctx.lineWidth = 12; ctx.lineCap = 'round';
    ctx.beginPath(); if (i % 3 === 0) { ctx.moveTo(0, 0); ctx.lineTo(0, -120); ctx.lineTo(18, -135); } else if (i % 3 === 1) { ctx.moveTo(-20, -10); ctx.lineTo(20, -110); ctx.moveTo(20, -10); ctx.lineTo(-20, -110); } else { ctx.moveTo(0, 0); ctx.lineTo(0, -90); ctx.moveTo(-30, -100); ctx.lineTo(30, -100); }
    ctx.stroke(); ctx.restore();
  }
  ctx.fillStyle = '#6e4f3a'; ctx.fillRect(900, 740, 900, 190);
}
// Tiệm vàng.
export function goldshop(k) {
  const { ctx } = k;
  room(k, '#b8322a', '#9c2a23', '#d9c49a', { planks: false });
  k.text('TIỆM VÀNG KIM HOÀN', 960, 120, { size: 60, font: 'title', color: '#f2c230', outline: '#5a1712', outlineWidth: 10 });
  ctx.fillStyle = '#f7e7b0'; ctx.fillRect(300, 640, 1320, 290);
  ctx.fillStyle = 'rgba(200,230,255,0.45)'; ctx.fillRect(300, 560, 1320, 90);
  for (let i = 0; i < 12; i++) { ctx.fillStyle = '#f2c230'; ctx.beginPath(); ctx.arc(380 + i * 105, 610, 20, 0, Math.PI * 2); ctx.fill(); }
  lamp(k, 960, 300, 0.3, '255,230,150');
}
// Đám cưới ở quê: rạp đỏ, mâm cỗ.
export function wedding(k) {
  const { ctx } = k;
  k.backdrop('day', { ground: G });
  ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.moveTo(120, 380); ctx.lineTo(960, 160); ctx.lineTo(1800, 380); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#e8b84a'; for (let x = 160; x < 1800; x += 120) ctx.fillRect(x, 380, 14, 550);
  k.text('VU QUY', 960, 300, { size: 64, font: 'title', color: '#f2c230' });
  for (const x of [400, 1500]) { ctx.fillStyle = '#e9e4dc'; ctx.beginPath(); ctx.ellipse(x, 860, 230, 40, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#c96a3a'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(x - 140 + i * 70, 850, 20, 0, Math.PI * 2); ctx.fill(); } }
}
// Phông giả "trụ sở công an" (bên kia màn hình): dựng trong lò lừa đảo.
export function fakeSet(k, o = {}) {
  const { ctx } = k;
  ctx.fillStyle = '#e9e1cf'; ctx.fillRect(-200, -200, k.W + 400, k.H + 400);
  // tấm phông in
  ctx.fillStyle = '#c7b48a'; ctx.fillRect(360, 120, 1200, 640);
  ctx.fillStyle = '#b8322a'; ctx.beginPath(); ctx.arc(960, 300, 100, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f2c230'; ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 26 : 62; ctx.lineTo(960 + Math.cos(a) * r, 300 + Math.sin(a) * r); } ctx.closePath(); ctx.fill();
  k.text('PHÒNG CẢNH SÁT HÌNH SỰ', 960, 470, { size: 62, font: 'title', color: '#7a1f1a' });
  // kệ hồ sơ in trên giấy dán tường
  for (let i = 0; i < 8; i++) { ctx.fillStyle = ['#3d7fc1', '#c0392b', '#e8b84a', '#6bb56b'][i % 4]; ctx.fillRect(460 + i * 34, 560, 26, 120); ctx.fillRect(1180 + i * 34, 560, 26, 120); }
  if (o.reveal) { // lộ mép phông bong + bàn phím, dây điện phía ngoài
    const p = clamp(o.reveal);
    ctx.save(); ctx.globalAlpha = p; ctx.fillStyle = '#2b2f3d'; ctx.fillRect(-200, -200, 560, k.H + 400); ctx.fillRect(1560, -200, 560, k.H + 400); ctx.restore();
    ctx.save(); ctx.translate(1560, 120); ctx.fillStyle = '#d8c69a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-90 * p, 40); ctx.lineTo(0, 130); ctx.closePath(); ctx.fill(); ctx.restore();
  }
}
// Phòng làm việc lò lừa đảo: dãy bàn, màn hình, điện thoại, bảng chỉ tiêu, cửa sổ chấn song.
export function scamRoom(k, o = {}) {
  const { ctx } = k;
  room(k, '#3a4048', '#2c3138', '#4a4f57', { planks: false });
  windowBox(k, 120, 120, 300, 300, ['#0e1428', '#1f2a4a'], { bars: true, frame: '#5a5f66' });
  // bảng chỉ tiêu
  ctx.fillStyle = '#f4efe6'; ctx.fillRect(1380, 110, 440, 400);
  k.text('CHỈ TIÊU TUẦN', 1600, 150, { size: 38, font: 'title', color: '#1b1b24' });
  for (let i = 0; i < 6; i++) {
    const w = [330, 280, 230, 190, 120, 40][i], y = 200 + i * 50;
    ctx.fillStyle = i === 5 ? '#d63a2f' : '#3d7fc1'; ctx.fillRect(1420, y, w, 30);
    if (i === 5 && o.lastName) k.text(o.lastName, 1480 + w, y + 16, { size: 28, font: 'title', color: '#d63a2f', align: 'left' });
  }
  // dãy bàn + màn hình xanh lét
  for (const row of [0, 1]) {
    const y = 620 + row * 150, sc = 0.85 + row * 0.15;
    for (let i = 0; i < 6; i++) {
      const x = 330 + i * 230 + row * 60;
      ctx.fillStyle = '#1b1f26'; ctx.fillRect(x - 70 * sc, y - 90 * sc, 140 * sc, 90 * sc);
      ctx.fillStyle = '#5fd3a0'; ctx.globalAlpha = 0.6 + 0.2 * Math.sin(k.gt * 3 + i); ctx.fillRect(x - 62 * sc, y - 82 * sc, 124 * sc, 74 * sc); ctx.globalAlpha = 1;
      ctx.fillStyle = '#6b5a48'; ctx.fillRect(x - 110 * sc, y, 220 * sc, 18 * sc);
      for (let j = 0; j < 4; j++) { ctx.fillStyle = '#111'; ctx.fillRect(x - 100 * sc + j * 28 * sc, y - 16 * sc, 18 * sc, 30 * sc); }
    }
  }
  lamp(k, 960, 0, 0.18, '200,255,230');
  vig(k, 0.5);
}
// Ngoài khu nhà có hàng rào thép gai (đêm).
export function compound(k) {
  const { ctx } = k;
  k.backdrop('night', { ground: G });
  ctx.fillStyle = '#4a4f57'; ctx.fillRect(560, 120, 800, 700);
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) { ctx.fillStyle = k.rand(r * 8 + c) > 0.35 ? '#f2d27a' : '#2b2f36'; ctx.fillRect(600 + c * 95, 150 + r * 82, 60, 46); }
  ctx.fillStyle = '#8a8f98'; ctx.fillRect(-100, 640, k.W + 200, 290);
  ctx.strokeStyle = '#2b2b2b'; ctx.lineWidth = 3;
  for (let x = -100; x < k.W + 100; x += 30) { ctx.beginPath(); ctx.moveTo(x, 640); ctx.lineTo(x + 15, 610); ctx.lineTo(x + 30, 640); ctx.stroke(); }
  ctx.fillStyle = '#2b2b2b'; ctx.fillRect(820, 700, 280, 230); ctx.fillStyle = '#3b3f46'; ctx.fillRect(840, 720, 240, 210);
}
// Đường mòn rừng cao su lúc nửa đêm.
export function jungle(k) {
  const { ctx } = k;
  k.backdrop('night', { ground: G });
  for (let i = 0; i < 9; i++) {
    const x = 80 + i * 225 + (i % 2) * 40, h = 520 + (i % 3) * 60;
    ctx.fillStyle = '#2a2f2a'; ctx.fillRect(x - 16, G - h, 32, h);
    ctx.fillStyle = '#1e3a26'; ctx.beginPath(); ctx.ellipse(x, G - h, 140, 90, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#eee'; ctx.fillRect(x - 10, G - 260, 20, 6);
  }
  ctx.fillStyle = '#5a4a36'; ctx.beginPath(); ctx.moveTo(700, k.H); ctx.lineTo(900, G); ctx.lineTo(1020, G); ctx.lineTo(1300, k.H); ctx.closePath(); ctx.fill();
}
// Phòng thăm gặp: song sắt ở giữa.
export function visitRoom(k) {
  const { ctx } = k;
  room(k, '#9aa6a0', '#86928c', '#6e6a62', { planks: false });
  ctx.fillStyle = '#7a8a84'; ctx.fillRect(0, 700, k.W, 230);
  ctx.strokeStyle = '#3a3f45'; ctx.lineWidth = 14; for (let x = 860; x <= 1060; x += 50) { ctx.beginPath(); ctx.moveTo(x, 150); ctx.lineTo(x, 760); ctx.stroke(); }
  ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(820, 150); ctx.lineTo(1100, 150); ctx.stroke();
}
// Cửa khẩu: barrier, biển, xe buýt.
export function borderGate(k) {
  const { ctx } = k;
  k.backdrop('dawn', { ground: G });
  ctx.fillStyle = '#e9e4dc'; ctx.fillRect(1200, 300, 560, 400); ctx.fillStyle = '#c0392b'; ctx.fillRect(1200, 300, 560, 90);
  k.text('CỬA KHẨU', 1480, 345, { size: 54, font: 'title', color: '#fff' });
  ctx.fillStyle = '#f2c230'; ctx.fillRect(400, 760, 700, 22); for (let x = 420; x < 1100; x += 80) { ctx.fillStyle = '#c0392b'; ctx.fillRect(x, 760, 40, 22); }
}
export function paper(k, c = '#f7f1e3') { k.ctx.fillStyle = c; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); }

// ---------- đạo cụ & giao diện ----------
// Điện thoại cầm tay: o.screen(k, w, h) vẽ trong màn hình (gốc ở giữa màn hình), o.ring = rung chuông.
export function phone(k, x, y, s = 1, o = {}) {
  const p = o.p ?? 1;
  if (p <= 0) return;
  const r = o.ring ? Math.sin(k.t * 40) * 0.06 : 0;
  k.group({ x, y, s: s * (0.6 + 0.4 * p), r: (o.r ?? 0) + r }, () => {
    const { ctx } = k;
    const w = 300, h = 560;
    ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(-w / 2 - 16, -h / 2 - 30, w + 32, h + 60, 36); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 18); ctx.clip();
    ctx.fillStyle = o.bg ?? '#eef3f8'; ctx.fillRect(-w / 2, -h / 2, w, h);
    if (o.screen) o.screen(k, w, h);
    ctx.restore();
    ctx.fillStyle = '#333'; ctx.fillRect(-30, -h / 2 - 18, 60, 8);
    if (o.ring) { ctx.strokeStyle = '#f2c230'; ctx.lineWidth = 6; for (const d of [-1, 1]) for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.arc(0, 0, w * 0.75 + i * 40, d > 0 ? -0.5 : Math.PI - 0.5, d > 0 ? 0.5 : Math.PI + 0.5); ctx.stroke(); } }
  });
}
// Màn hình cuộc gọi đến.
export function callScreen(name, sub = 'Số lạ') {
  return (k, w, h) => {
    const { ctx } = k;
    ctx.fillStyle = '#1f2a44'; ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.fillStyle = '#8a94a6'; ctx.beginPath(); ctx.arc(0, -120, 54, 0, Math.PI * 2); ctx.fill();
    k.text(name, 0, -20, { size: 34, font: 'title', color: '#fff', maxWidth: w - 30 });
    k.text(sub, 0, 22, { size: 24, color: '#c9d2e0' });
    for (const [x, c] of [[-80, '#d63a2f'], [80, '#3fb86a']]) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, 190, 36, 0, Math.PI * 2); ctx.fill(); }
  };
}
// Cửa sổ gọi video kiểu Zoom: o.content(k) vẽ nhân vật (gốc ở giữa đáy khung), o.name, o.glitch (0..1), o.self(k) ô nhỏ góc.
export function zoom(k, x, y, w, h, o = {}) {
  const p = o.p ?? 1;
  if (p <= 0) return;
  k.group({ x: x + w / 2, y: y + h / 2, s: 0.7 + 0.3 * p }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(-w / 2 - 14, -h / 2 - 50, w + 28, h + 64, 16); ctx.fill();
    for (const [i, c] of [['#ff5f57', 0], ['#febc2e', 1], ['#28c840', 2]].map((a) => [a[1], a[0]])) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(-w / 2 + 14 + i * 26, -h / 2 - 26, 8, 0, Math.PI * 2); ctx.fill(); }
    ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip();
    ctx.fillStyle = '#2b2f3d'; ctx.fillRect(-w / 2, -h / 2, w, h);
    if (o.content) { ctx.save(); ctx.translate(0, h / 2); o.content(k, w, h); ctx.restore(); }
    const gl = o.glitch ?? 0;
    if (gl > 0) { for (let i = 0; i < 9; i++) { const yy = -h / 2 + k.rand(i + Math.floor(k.t * 12)) * h; ctx.fillStyle = `rgba(${i % 2 ? '95,211,160' : '214,58,47'},${0.5 * gl})`; ctx.fillRect(-w / 2, yy, w, 6 + k.rand(i + 3) * 30); } ctx.fillStyle = `rgba(20,20,30,${0.6 * gl})`; ctx.fillRect(-w / 2, -h / 2, w, h); }
    if (o.self) { ctx.save(); ctx.fillStyle = '#111'; ctx.fillRect(w / 2 - 250, h / 2 - 170, 230, 150); ctx.beginPath(); ctx.rect(w / 2 - 250, h / 2 - 170, 230, 150); ctx.clip(); ctx.translate(w / 2 - 135, h / 2 - 20); o.self(k); ctx.restore(); }
    ctx.restore();
    // REC + tên
    ctx.fillStyle = '#d63a2f'; ctx.globalAlpha = 0.6 + 0.4 * Math.sin(k.t * 5); ctx.beginPath(); ctx.arc(-w / 2 + 30, -h / 2 + 30, 10, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
    k.text('REC', -w / 2 + 70, -h / 2 + 31, { size: 24, font: 'title', color: '#fff' });
    if (o.name) { ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(-w / 2 + 10, h / 2 - 54, Math.min(w - 20, 30 + o.name.length * 17), 44); k.text(o.name, -w / 2 + 24, h / 2 - 31, { size: 28, font: 'title', color: '#fff', align: 'left' }); }
  });
}
// Tờ "lệnh bắt tạm giam" giả: dấu đỏ đóng ở p ≥ 0.6.
export function fakeDoc(k, x, y, s = 1, o = {}) {
  const p = o.p ?? 1;
  if (p <= 0) return;
  k.group({ x, y, s: s * (0.7 + 0.3 * Math.min(1, p * 2)), r: o.r ?? -0.04 }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#fffdf6'; ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 4; ctx.fillRect(-220, -300, 440, 600); ctx.strokeRect(-220, -300, 440, 600);
    k.text('LỆNH BẮT', 0, -210, { size: 50, font: 'title', color: '#b8322a' });
    k.text('TẠM GIAM', 0, -150, { size: 50, font: 'title', color: '#b8322a' });
    ctx.fillStyle = '#bbb'; for (let i = 0; i < 7; i++) ctx.fillRect(-170, -80 + i * 38, i === 2 ? 200 : 340, 12);
    if (o.name) k.text(o.name, 0, 20, { size: 34, font: 'title', color: '#1b1b24' });
    const st = clamp((p - 0.5) / 0.3);
    if (st > 0) { ctx.save(); ctx.globalAlpha = st; ctx.translate(90, 200); ctx.rotate(-0.25); ctx.scale(1.8 - 0.8 * st, 1.8 - 0.8 * st); ctx.strokeStyle = '#d63a2f'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, 70, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 52, 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = '#d63a2f'; ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 12 : 28; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fill(); ctx.restore(); }
  });
}
// Bong bóng tin nhắn kiểu Zalo (me = bên phải, xanh).
export function chat(k, x, y, text, o = {}) {
  const p = o.p ?? 1;
  if (p <= 0) return;
  const { ctx } = k;
  ctx.save(); ctx.font = `600 ${o.size ?? 34}px "Be Vietnam Pro"`;
  const w = Math.min(o.maxW ?? 700, ctx.measureText(text).width + 50), h = (o.size ?? 34) + 34;
  ctx.restore();
  k.group({ x, y, s: 0.6 + 0.4 * k.ease.back(Math.min(1, p)) }, () => {
    ctx.fillStyle = o.me ? '#d6ecff' : '#fff'; ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(o.me ? -w : 0, -h / 2, w, h, 22); ctx.fill(); ctx.stroke();
    k.text(text, o.me ? -w / 2 : w / 2, 2, { size: o.size ?? 34, color: '#1b1b24', maxWidth: w - 30 });
  });
}
// Xấp tiền (n cọc), vàng (n cây gói khăn).
export function cash(k, x, y, n = 3, s = 1, p = 1) {
  if (p <= 0) return;
  k.group({ x, y, s: s * k.ease.back(Math.min(1, p)) }, () => {
    const { ctx } = k;
    for (let i = 0; i < n; i++) { const xx = (i % 3) * 70 - 70, yy = -Math.floor(i / 3) * 26; ctx.fillStyle = '#4fa36a'; ctx.strokeStyle = '#2b5a3a'; ctx.lineWidth = 3; ctx.fillRect(xx - 32, yy - 22, 64, 24); ctx.strokeRect(xx - 32, yy - 22, 64, 24); ctx.fillStyle = '#f4efe6'; ctx.fillRect(xx - 6, yy - 22, 12, 24); }
  });
}
export function gold(k, x, y, n = 3, s = 1, p = 1) {
  if (p <= 0) return;
  k.group({ x, y, s: s * k.ease.back(Math.min(1, p)) }, () => {
    const { ctx } = k;
    for (let i = 0; i < n; i++) { const xx = (i % 4) * 60 - 90, yy = -Math.floor(i / 4) * 30; ctx.fillStyle = '#f2c230'; ctx.strokeStyle = '#8a6a14'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx - 26, yy); ctx.lineTo(xx + 26, yy); ctx.lineTo(xx + 18, yy - 24); ctx.lineTo(xx - 18, yy - 24); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(xx - 12, yy - 20, 6, 14); }
  });
}
// Số tiền nhảy dần (đồng hồ đếm), ví dụ count(k, 1980, 'tr', ...).
export function counter(k, x, y, to, unit, cue, dur = 1.5, o = {}) {
  const p = k.at(cue, dur, 'out');
  if (p <= 0) return;
  const raw = to * p, v = o.dec ? Math.round(raw * 10 ** o.dec) / 10 ** o.dec : Math.round(raw);
  const str = o.fmt ? o.fmt(v) : v.toLocaleString('vi-VN') + unit;
  k.text(str, x, y, { size: o.size ?? 96, font: 'title', color: o.color ?? '#d63a2f', outline: '#fffaf0', outlineWidth: 16 });
}
// Dây thép gai trên đỉnh khung (cảnh "bị nhốt").
export function wire(k, y = 40) {
  const { ctx } = k;
  ctx.strokeStyle = '#2b2b2b'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(0, y); for (let x = 0; x <= k.W; x += 40) ctx.lineTo(x, y + (x / 40 % 2 ? -10 : 10)); ctx.stroke();
}

// =====================================================================
// Câu chuyện "App AI" (Zena AI): nhân vật, bảng đếm tiền, phông, đạo cụ.
// =====================================================================
export const TOAN = { ...base, body: 'chibi', color: '#3d7fc1', hair: 'short', hat: 'cap', hatColor: '#3a8a4a', stubble: true, belly: 0.9, skin: '#d9a679' };
export const HANH = { ...base, body: 'chibiGirl', color: '#e8b84a', hair: 'bun', hairColor: '#2a1c15', skin: '#eec39c' };
export const LINH = { ...base, body: 'chibiGirl', color: '#f29bb8', hair: 'long', hairColor: '#2a1c15' };
export const LUU = { ...base, body: 'chibiGirl', color: '#6b2d5f', hair: 'perm', hairColor: '#b8b2aa', brows: true, chain: 'big', belly: 0.6, skin: '#e9bf96', blush: false };
export const TI = { ...base, body: 'chibi', color: '#ff7a59', hair: 'spiky', hairColor: '#f2c230', shades: '#3a6b8f', chain: true };
export const CHUTICH = { ...base, body: 'chibiBig', color: '#1b2338', tie: '#c0392b', hair: 'short', hairColor: '#111', shades: true, chain: 'big', belly: 1, brows: true, stubble: true, skin: '#e3b285' };
export const BAY = { ...base, body: 'chibi', color: '#8a6a4f', hair: 'bald', stubble: true, scar: true, belly: 0.5, skin: '#c99868' };
export const HAI = { ...base, body: 'chibi', color: '#6b8e5a', hair: 'short', hat: 'cap', hatColor: '#c0392b', skin: '#d9a679' };
export const HO = (c, extra = {}) => ({ ...base, body: 'chibi', color: c, hair: 'short', ...extra }); // họ hàng

// ---------- tiền ----------
// Định dạng số tiền (đơn vị: triệu đồng).
export function vnd(v) {
  const a = Math.abs(v), s = v < 0 ? '−' : '';
  if (a < 1) return `${s}${Math.round(a * 1000)} nghìn`;
  if (a < 1000) { const t = Math.round(a * 10) / 10; return `${s}${String(t).replace('.', ',')} triệu`; }
  return `${s}${String(Math.round(a / 100) / 10).replace('.', ',')} tỷ`;
}
// Giá trị chạy dần: spec = số | [từ, đến, cue, thời gian].
export function tw(k, spec) {
  if (spec == null) return null;
  if (typeof spec === 'number') return spec;
  const [a, b, cue = 0, dur = 1.2] = spec;
  return a + (b - a) * k.at(cue, dur, 'out');
}
// Bảng đếm góc trên trái: o = { nap, vi, rut, ho, sao } (mỗi giá trị là số hoặc [từ, đến, cue, dur]); sao = số sao (0..7) hoặc [từ, đến, cue].
export function hud(k, o = {}) {
  const rows = [['📥 ĐÃ NẠP', o.nap, '#ff8a7a'], [o.frozen ? '📱 VÍ APP ⏳' : '📱 VÍ APP', o.vi, o.frozen ? '#8a8f98' : '#7fe0a8'], ['💵 RÚT ĐƯỢC', o.rut, '#f2d27a'], ['👪 CẢ HỌ NẠP', o.ho, '#ff8a7a'], ['💸 NỢ', o.no, '#ff5a4a']].filter((r) => r[1] != null);
  if (!rows.length && o.sao == null) return;
  const { ctx } = k;
  const h = 26 + rows.length * 50 + (o.sao != null ? 50 : 0);
  ctx.save(); ctx.globalAlpha *= 0.88; ctx.fillStyle = '#14161d'; ctx.beginPath(); ctx.roundRect(56, 46, 470, h, 18); ctx.fill(); ctx.restore();
  ctx.strokeStyle = '#f2c230'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(56, 46, 470, h, 18); ctx.stroke();
  rows.forEach(([label, spec, color], i) => {
    const y = 84 + i * 50, v = tw(k, spec);
    const moving = Array.isArray(spec) && k.t > k.cue(spec[2] ?? 0) && k.t < k.cue(spec[2] ?? 0) + (spec[3] ?? 1.2);
    k.text(label, 76, y, { size: 28, font: 'title', align: 'left', color: '#c9ced4' });
    k.text(vnd(v), 506, y, { size: moving ? 36 : 32, font: 'title', align: 'right', color });
  });
  if (o.sao != null) {
    const n = Math.round(tw(k, o.sao)), y = 84 + rows.length * 50;
    k.text('★'.repeat(n) + '☆'.repeat(Math.max(0, 7 - n)), 76, y, { size: 26, align: 'left', color: '#f2c230' });
    if (n >= 1) k.text(`LEADER ${n} SAO`, 506, y, { size: 22, font: 'title', align: 'right', color: '#f2c230' });
  }
}
// Chữ tên chương (giữa trên).
export function chapTop(k, title) {
  const p = k.at(0, 0.5);
  if (p <= 0) return;
  k.text(title, k.W / 2 + 120, 60, { size: 40, font: 'title', color: '#fff', outline: '#1b1b24', outlineWidth: 12, fx: 'fade', p });
}

// ---------- phông ----------
export function hospitalGate(k) {
  const { ctx } = k;
  k.backdrop('day', { ground: G });
  ctx.fillStyle = '#e9e4dc'; ctx.fillRect(820, 180, 1000, 560); ctx.fillStyle = '#c9c1b4'; ctx.fillRect(820, 180, 1000, 40);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) { ctx.fillStyle = '#9fc4e8'; ctx.fillRect(870 + c * 135, 250 + r * 115, 80, 70); }
  ctx.fillStyle = '#d63a2f'; ctx.fillRect(1290, 70, 60, 160); ctx.fillRect(1240, 120, 160, 60);
  ctx.fillStyle = '#2e6da4'; ctx.fillRect(700, 640, 1220, 70);
  k.text('BỆNH VIỆN ĐA KHOA TỈNH', 1310, 676, { size: 46, font: 'title', color: '#fff' });
  // cây bàng + biển xe ôm
  ctx.fillStyle = '#6e4f3a'; ctx.fillRect(250, 380, 40, 550); ctx.fillStyle = '#4f8a3f'; ctx.beginPath(); ctx.ellipse(270, 360, 260, 150, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f2c230'; ctx.fillRect(430, 560, 170, 90); ctx.fillStyle = '#6e4f3a'; ctx.fillRect(505, 650, 14, 280);
  k.text('XE ÔM', 515, 606, { size: 40, font: 'title', color: '#1b1b24' });
}
// Mâm cỗ: kids = mâm trẻ con (gà rán + Coca).
export function mam(k, x, y, s = 1, o = {}) {
  k.group({ x, y, s }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#b5482c'; ctx.beginPath(); ctx.ellipse(0, 0, 230, 60, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#6e2a1a'; ctx.lineWidth = 6; ctx.stroke();
    const dish = (dx, dy, c) => { ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.ellipse(dx, dy, 52, 18, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(dx, dy - 6, 34, 14, 0, 0, Math.PI * 2); ctx.fill(); };
    if (o.kids) { dish(-110, -10, '#d9862b'); dish(40, 10, '#d9862b'); for (const dx of [130, 170]) { ctx.fillStyle = '#7a1f1a'; ctx.fillRect(dx - 10, -70, 20, 60); ctx.fillStyle = '#c0392b'; ctx.fillRect(dx - 10, -50, 20, 16); } }
    else { dish(-130, -6, '#f2c230'); dish(0, 14, '#c96a3a'); dish(130, -6, '#6bb56b'); ctx.fillStyle = '#f2c230'; ctx.beginPath(); ctx.ellipse(0, -30, 60, 26, 0, 0, Math.PI * 2); ctx.fill(); }
  });
}
// Nhà ngày giỗ: bàn thờ có ảnh ông ngoại.
export function feast(k, o = {}) {
  const { ctx } = k;
  room(k, '#e8d9b8', '#d6c296', '#9c7552');
  ctx.fillStyle = '#7a3a24'; ctx.fillRect(760, 300, 400, 260); ctx.fillStyle = '#5a2a18'; ctx.fillRect(740, 280, 440, 30);
  ctx.fillStyle = '#2b2b2b'; ctx.fillRect(895, 330, 130, 160); ctx.fillStyle = '#e9e4dc'; ctx.fillRect(905, 340, 110, 140);
  k.char(960, 480, 140, { ...base, body: 'chibi', color: '#5a5a5a', hair: 'short', hairColor: '#ddd', beard: true, face: o.grandpa ?? 'calm', shadow: false });
  ctx.fillStyle = '#f2c230'; ctx.fillRect(820, 420, 40, 60); ctx.fillRect(1060, 420, 40, 60);
  for (let i = 0; i < 3; i++) { ctx.strokeStyle = '#8a6a4f'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(950 + i * 10, 520); ctx.lineTo(950 + i * 10, 440); ctx.stroke(); }
  k.steam(960, 430, 0.6);
  ctx.fillStyle = '#c0392b'; ctx.fillRect(700, 120, 520, 90); k.text('KÍNH NHỚ TỔ TIÊN', 960, 166, { size: 40, font: 'title', color: '#f2c230' });
}
// Hội trường / sân khấu: o.title chữ trên màn LED, o.gala.
export function stage(k, o = {}) {
  const { ctx } = k;
  ctx.fillStyle = '#0d0f1a'; ctx.fillRect(-200, -200, k.W + 400, k.H + 400);
  const g = ctx.createLinearGradient(260, 0, 1660, 0); g.addColorStop(0, '#3b1d6e'); g.addColorStop(0.5, '#1d6e8a'); g.addColorStop(1, '#6e1d5a');
  ctx.fillStyle = g; ctx.fillRect(260, 80, 1400, 520);
  for (let i = 0; i < 30; i++) { ctx.fillStyle = `rgba(255,255,255,${0.15 + 0.15 * Math.sin(k.gt * 4 + i)})`; ctx.fillRect(280 + (i * 47) % 1360, 100 + ((i * 31) % 480), 4, 4); }
  k.text(o.title ?? 'AI ĐỔI ĐỜI', 960, 270, { size: 120, font: 'title', color: '#fff', outline: '#f2c230', outlineWidth: 6 });
  k.text(o.sub ?? 'ZENA AI · HỘI NGHỊ LEADER TOÀN QUỐC', 960, 400, { size: 44, font: 'title', color: '#9fe8c8' });
  // sàn sân khấu
  ctx.fillStyle = '#2b2f3d'; ctx.fillRect(160, 760, 1600, 60); ctx.fillStyle = '#1b1f2a'; ctx.fillRect(160, 820, 1600, 120);
  // đèn rọi
  for (const [x, c] of [[400, '255,230,150'], [1520, '150,220,255'], [960, '255,255,255']]) { ctx.save(); ctx.globalAlpha = 0.18 + 0.06 * Math.sin(k.gt * 2 + x); ctx.fillStyle = `rgb(${c})`; ctx.beginPath(); ctx.moveTo(x - 20, 0); ctx.lineTo(x + 20, 0); ctx.lineTo(x + 260, 800); ctx.lineTo(x - 260, 800); ctx.closePath(); ctx.fill(); ctx.restore(); }
}
// Khán giả: hàng đầu bóng người (vỗ tay khi clap > 0).
export function crowd(k, clap = 0, y = 1080) {
  for (let i = 0; i < 14; i++) {
    const x = 60 + i * 138, j = clap ? Math.abs(Math.sin(k.t * 10 + i)) * 10 * clap : 0;
    k.ctx.fillStyle = '#1b1b24'; k.ctx.beginPath(); k.ctx.arc(x, y - 120 - j, 52, 0, Math.PI * 2); k.ctx.fill(); k.ctx.fillRect(x - 70, y - 80 - j, 140, 120);
  }
}
// Băng rôn chéo người (sash) trên nhân vật cao `size` đứng tại (x, yFoot).
export function sash(k, x, yFoot, size, text = 'LEADER 7 SAO') {
  const s = size / 100;
  k.group({ x, y: yFoot - 28 * s, r: -0.55 }, () => {
    k.ctx.fillStyle = '#c0392b'; k.ctx.fillRect(-17 * s, -3.2 * s, 34 * s, 6.4 * s);
    k.text(text, 0, 0, { size: 3.6 * s, font: 'title', color: '#f2c230' });
  });
}
export function pawnShop(k) {
  const { ctx } = k;
  room(k, '#3a4048', '#2c3138', '#5a5048', { planks: false });
  ctx.fillStyle = '#c0392b'; ctx.fillRect(460, 90, 1000, 120);
  k.text('CẦM ĐỒ · VAY TIỀN NHANH · LÃI THẤP*', 960, 150, { size: 48, font: 'title', color: '#f2c230' });
  ctx.fillStyle = '#6e4f3a'; ctx.fillRect(300, 640, 1320, 290);
  ctx.strokeStyle = '#8a8f98'; ctx.lineWidth = 8; for (let x = 320; x < 1620; x += 60) { ctx.beginPath(); ctx.moveTo(x, 300); ctx.lineTo(x, 640); ctx.stroke(); }
  k.text('*lãi thấp với người cho vay', 1500, 1040, { size: 26, color: '#c9ced4', align: 'right' });
}
export function teaStall(k) {
  const { ctx } = k;
  hospitalGate(k);
  ctx.fillStyle = '#2e6da4'; ctx.fillRect(1100, 560, 520, 60); k.text('TRÀ ĐÁ · THUỐC LÀO', 1360, 592, { size: 36, font: 'title', color: '#fff' });
  for (const x of [700, 900, 1500]) { ctx.fillStyle = '#d63a2f'; ctx.fillRect(x - 40, 880, 80, 16); ctx.fillRect(x - 34, 896, 12, 34); ctx.fillRect(x + 22, 896, 12, 34); }
}
export function nightRoad(k) {
  const { ctx } = k;
  k.backdrop('night', { ground: G });
  ctx.fillStyle = '#2b2f36'; ctx.fillRect(-100, G - 40, k.W + 200, 200);
  ctx.fillStyle = '#f2c230'; for (let x = 0; x < k.W; x += 180) ctx.fillRect(x + ((k.gt * 300) % 180), G + 30, 90, 10);
  for (const x of [300, 1000, 1700]) { ctx.fillStyle = '#4a4f57'; ctx.fillRect(x, 300, 14, G - 340); ctx.fillStyle = '#f2d27a'; ctx.beginPath(); ctx.arc(x + 7, 300, 18, 0, Math.PI * 2); ctx.fill(); }
}

// ---------- đạo cụ ----------
// Xe máy nhìn ngang (ga nếu o.scooter), o.bow = nơ đỏ trao thưởng.
export function moto(k, x, y, s = 1, o = {}) {
  k.group({ x, y, s: s * (o.flip ? -1 : 1) }, () => {
    const { ctx } = k;
    const c = o.color ?? '#c0392b';
    for (const wx of [-110, 110]) { ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.arc(wx, -40, 40, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#8a8f98'; ctx.beginPath(); ctx.arc(wx, -40, 16, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = c; ctx.strokeStyle = '#2b2b2b'; ctx.lineWidth = 5; ctx.beginPath();
    if (o.scooter) { ctx.moveTo(-150, -60); ctx.quadraticCurveTo(-140, -150, -40, -140); ctx.lineTo(60, -110); ctx.lineTo(120, -190); ctx.lineTo(150, -180); ctx.lineTo(140, -60); ctx.closePath(); }
    else { ctx.moveTo(-140, -70); ctx.lineTo(-60, -130); ctx.lineTo(40, -120); ctx.lineTo(110, -170); ctx.lineTo(140, -160); ctx.lineTo(120, -70); ctx.closePath(); }
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(-120, -165, 140, 26, 12); ctx.fill();
    ctx.strokeStyle = '#2b2b2b'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(120, -180); ctx.lineTo(100, -230); ctx.lineTo(70, -235); ctx.stroke();
    if (o.bow) { ctx.fillStyle = '#d63a2f'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(-30 + d * 50, -200, 50, 30, d * 0.4, 0, Math.PI * 2); ctx.fill(); } ctx.beginPath(); ctx.arc(-30, -200, 20, 0, Math.PI * 2); ctx.fill(); }
  });
}
export function c2(k, x, y, s = 1, o = {}) {
  k.group({ x, y, s, r: o.r ?? 0 }, () => {
    const { ctx } = k;
    ctx.fillStyle = 'rgba(160,220,140,0.85)'; ctx.strokeStyle = '#2b2b2b'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(-40, -150, 80, 150, 16); ctx.fill(); ctx.stroke(); ctx.fillRect(-20, -190, 40, 44); ctx.strokeRect(-20, -190, 40, 44);
    ctx.fillStyle = '#c0392b'; ctx.fillRect(-40, -110, 80, 50); k.text('C2', 0, -84, { size: 34, font: 'title', color: '#fff' });
    if (o.cap) { ctx.fillStyle = '#3a8a4a'; ctx.beginPath(); ctx.arc(o.capX ?? 0, (o.capY ?? -200), 30, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
  });
}
export function ipad(k, x, y, s = 1, o = {}) {
  k.group({ x, y, s, r: o.r ?? 0 }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(-130, -90, 260, 180, 16); ctx.fill();
    ctx.fillStyle = '#5fc3e4'; ctx.fillRect(-116, -76, 232, 152);
    k.text(o.fake ? '🍐 iPed' : 'iPad', 0, 2, { size: 40, font: 'title', color: '#fff' });
  });
}
// Màn hình app Zena AI (dùng làm o.screen của phone): mode 'live' | 'wallet' | 'withdraw' | 'star' | 'packs'.
export function zena(mode, o = {}) {
  return (k, w, h) => {
    const { ctx } = k;
    const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1b5e'); g.addColorStop(1, '#0e1a3a');
    ctx.fillStyle = g; ctx.fillRect(-w / 2, -h / 2, w, h);
    k.text('Zena AI ✦', 0, -h / 2 + 34, { size: 30, font: 'title', color: '#9fe8c8' });
    if (mode === 'live') {
      k.char(0, 110, 300, { ...base, body: 'chibiGirl', color: '#f29bb8', hair: 'long', hairColor: '#f2c230', face: 'happy', pose: 'present', talk: 0.5 + 0.5 * Math.sin(k.t * 9), shadow: false });
      ctx.fillStyle = '#c9ced4'; ctx.fillRect(40, 20, 80, 70); ctx.fillStyle = '#1b1b24'; ctx.fillRect(48, 30, 64, 40);
      ctx.fillStyle = '#d63a2f'; ctx.fillRect(-w / 2 + 14, -h / 2 + 60, 64, 28); k.text('LIVE', -w / 2 + 46, -h / 2 + 75, { size: 20, font: 'title', color: '#fff' });
      k.text('Nồi chiên không dầu', 0, 180, { size: 26, font: 'title', color: '#fff' });
    } else if (mode === 'wallet') {
      k.text('SỐ DƯ VÍ', 0, -170, { size: 26, color: '#c9ced4' });
      k.text(o.bal ?? '30.000đ', 0, -120, { size: 48, font: 'title', color: '#7fe0a8' });
      (o.lines ?? ['+ Doanh thu livestream', '+ Hoa hồng AI', '+ Tatao Xu']).forEach((t, i) => k.text(t, -w / 2 + 24, -40 + i * 50, { size: 24, align: 'left', color: '#fff', p: o.p ? k.at(o.p, 0.3 + i * 0.2) : 1 }));
    } else if (mode === 'withdraw') {
      k.text('RÚT TIỀN', 0, -170, { size: 30, font: 'title', color: '#fff' });
      k.text(o.amt ?? '1.500.000đ', 0, -110, { size: 40, font: 'title', color: '#f2d27a' });
      const spin = k.t * 4;
      ctx.strokeStyle = '#f2c230'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 20, 40, spin, spin + 4.5); ctx.stroke();
      k.text('Đang xử lý…', 0, 110, { size: 34, font: 'title', color: '#ff8a7a' });
    } else if (mode === 'star') {
      k.text('CHÚC MỪNG!', 0, -150, { size: 40, font: 'title', color: '#f2c230' });
      k.text('★★★★★★★', 0, -70, { size: 40, color: '#f2c230' });
      k.text('LEADER 7 SAO', 0, 10, { size: 38, font: 'title', color: '#fff' });
      for (let i = 0; i < 20; i++) { ctx.fillStyle = ['#f2c230', '#ff7a59', '#9fe8c8'][i % 3]; ctx.fillRect(-w / 2 + ((i * 53 + k.t * 120) % w), -h / 2 + ((i * 97 + k.t * 200) % h), 8, 14); }
    } else if (mode === 'packs') {
      [['AI LIVE', '2,9 tr', '30–50k/ngày'], ['MATRIX', '14,9 tr', ''], ['MATRIX', '84,9 tr', '900k/ngày'], ['MATRIX VIP', '418,9 tr', '1,5 tr/ngày']].forEach(([a, b, c], i) => {
        const y = -150 + i * 90, hl = o.hl === i;
        ctx.fillStyle = hl ? '#f2c230' : 'rgba(255,255,255,0.12)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 16, y - 36, w - 32, 76, 12); ctx.fill();
        k.text(a, -w / 2 + 30, y - 10, { size: 22, font: 'title', align: 'left', color: hl ? '#1b1b24' : '#fff' });
        k.text(b, w / 2 - 30, y - 10, { size: 26, font: 'title', align: 'right', color: hl ? '#1b1b24' : '#f2d27a' });
        if (c) k.text(c, -w / 2 + 30, y + 22, { size: 18, align: 'left', color: hl ? '#1b1b24' : '#c9ced4' });
      });
    }
  };
}
// Khung nhóm Zalo: msgs = [{ name, text, cue, me, color }]; o.banner = dòng hệ thống.
export function zaloGroup(k, x, y, w, h, o = {}) {
  const { ctx } = k;
  ctx.save();
  ctx.fillStyle = '#e9eef5'; ctx.strokeStyle = '#1b1b24'; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(x, y, w, h, 24); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#2e6da4'; ctx.beginPath(); ctx.roundRect(x, y, w, 90, [24, 24, 0, 0]); ctx.fill();
  k.text(o.title ?? 'AI ĐỔI ĐỜI 🚀🚀', x + 30, y + 36, { size: 36, font: 'title', align: 'left', color: '#fff' });
  k.text(o.members ?? '3.000 thành viên', x + 30, y + 70, { size: 22, align: 'left', color: '#d6ecff' });
  ctx.beginPath(); ctx.rect(x, y + 90, w, h - 90); ctx.clip();
  let yy = y + 140;
  for (const m of o.msgs ?? []) {
    const p = m.cue == null ? 1 : k.at(Array.isArray(m.cue) ? k.cue(m.cue[0], m.cue[1]) : m.cue, 0.3);
    if (p <= 0) continue;
    const bw = Math.min(w - 140, 30 + m.text.length * 17);
    const bx = m.me ? x + w - 30 - bw : x + 100;
    if (!m.me) { ctx.fillStyle = m.color ?? '#8a94a6'; ctx.beginPath(); ctx.arc(x + 55, yy + 10, 26, 0, Math.PI * 2); ctx.fill(); k.text(m.name ?? '', x + 100, yy - 30, { size: 20, align: 'left', color: '#5a6270' }); }
    ctx.fillStyle = m.me ? '#d6ecff' : '#fff'; ctx.beginPath(); ctx.roundRect(bx, yy - 14, bw, 52, 16); ctx.fill();
    k.text(m.text, bx + 16, yy + 12, { size: 26, align: 'left', color: '#1b1b24', maxWidth: bw - 20 });
    yy += 96;
  }
  if (o.banner) { const p = k.at(o.bannerCue ?? 0, 0.4); if (p > 0) { ctx.fillStyle = 'rgba(27,27,36,0.85)'; ctx.fillRect(x + 20, y + h - 120, w - 40, 80); k.text(o.banner, x + w / 2, y + h - 80, { size: 28, font: 'title', color: '#ff8a7a', maxWidth: w - 60 }); } }
  ctx.restore();
}
// Hoa giấy rơi.
export function confetti(k, p = 1) {
  if (p <= 0) return;
  for (let i = 0; i < 60; i++) { k.ctx.fillStyle = ['#f2c230', '#ff7a59', '#9fe8c8', '#f29bb8'][i % 4]; k.ctx.fillRect((i * 151 + Math.sin(k.t + i) * 40) % k.W, ((i * 89 + k.t * 260) % (k.H + 100)) - 50, 10, 18); }
}

// ---------- Shorts dọc 1080×1920 ----------
// Vẽ một cảnh ngang (toạ độ 1920×1080) vào khung dọc: lấy dải quanh x = cx, đặt từ y0 (mặc định 300 → 1380). Phụ đề ở y≈1420.
export function vert(k, cx, fn, o = {}) {
  const s = o.s ?? 1, y0 = o.y0 ?? 300;
  k.ctx.save(); k.ctx.beginPath(); k.ctx.rect(0, y0, k.W, 1080 * s); k.ctx.clip();
  const W = k.W, H = k.H;
  k.group({ x: W / 2 - cx * s, y: y0, s }, () => { k.W = 1920; k.H = 1080; try { fn(); } finally { k.W = W; k.H = H; } });
  k.ctx.restore();
}
// Nền khung dọc + bảng đếm thu nhỏ ở đầu khung.
export function vbg(k, o = {}) {
  k.ctx.fillStyle = o.bg ?? '#14161d'; k.ctx.fillRect(0, 0, k.W, k.H);
  if (o.hud) k.group({ x: 250, y: 30, s: 1 }, () => hud(k, o.hud));
}
// Chữ chốt vùng dưới (y 1560–1800, dưới phụ đề).
export function vcap(k, text, cue, o = {}) {
  k.text(text, k.W / 2, o.y ?? 1640, { size: o.size ?? 76, font: 'title', fx: 'pop', p: k.at(cue, 0.5), maxWidth: 1000, color: o.color ?? '#f2c230', outline: '#1b1b24', outlineWidth: 14 });
}

// ---------- bộ vẽ thumbnail (gây tò mò, đánh vào thị giác) ----------
// Nền tia màu toả từ (cx, cy) + tối dần ở mép. Dùng được cho cả khung ngang và dọc.
export function tRays(k, c1, c2, cx, cy, n = 28) {
  const { ctx } = k; const W = k.W, H = k.H;
  ctx.fillStyle = c1; ctx.fillRect(0, 0, W, H); ctx.fillStyle = c2;
  for (let i = 0; i < n; i += 2) { const a0 = (i / n) * Math.PI * 2, a1 = ((i + 1) / n) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, 3000, a0, a1); ctx.closePath(); ctx.fill(); }
  const g = ctx.createRadialGradient(cx, cy, 200, cx, cy, Math.max(W, H) * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
// Viền trắng dày kiểu sticker + bóng đổ quanh mọi thứ vẽ trong draw().
export function tSticker(k, draw, w = 16) {
  const { ctx } = k;
  ctx.save(); ctx.filter = 'brightness(0) invert(1)';
  for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; ctx.save(); ctx.translate(Math.cos(a) * w, Math.sin(a) * w); draw(); ctx.restore(); }
  ctx.restore();
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12; draw(); ctx.restore();
}
// Chữ cực to viền đen; o.box = khối màu phía sau.
export function tBig(k, text, x, y, size, color, o = {}) {
  k.group({ x, y, r: o.r ?? -0.04 }, () => {
    if (o.box) { const { ctx } = k; ctx.font = `800 ${size}px "Be Vietnam Pro"`; const w = ctx.measureText(text).width; ctx.fillStyle = o.box; ctx.beginPath(); ctx.roundRect(-w / 2 - 30, -size * 0.62, w + 60, size * 1.2, 18); ctx.fill(); }
    k.text(text, 0, 0, { size, font: 'title', color, outline: o.outline ?? '#14161d', outlineWidth: o.ow ?? 22 });
  });
}
export function tCircle(k, x, y, rx, ry) { const { ctx } = k; ctx.save(); ctx.strokeStyle = '#ff2a2a'; ctx.lineWidth = 16; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, -0.1, 0.2, Math.PI * 2.05); ctx.stroke(); ctx.restore(); }
export function tArrow(k, x1, y1, x2, y2) { k.arrow(x1, y1, x2, y2, { width: 26, head: 70, stroke: '#ff2a2a', bend: 0.2, rough: 0.6, seed: 9 }); }
// Đùi gà (đạo cụ thumbnail/cảnh giỗ).
export function chickenLeg(k, x, y, s = 1, r = 0) {
  k.group({ x, y, s, r }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#f4efe6'; ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.roundRect(40, -14, 90, 28, 12); ctx.fill(); ctx.stroke();
    for (const dy of [-16, 16]) { ctx.beginPath(); ctx.arc(132, dy, 18, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
    ctx.fillStyle = '#c96a28'; ctx.beginPath(); ctx.ellipse(-20, 0, 90, 64, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.ellipse(-45, -25, 35, 16, -0.4, 0, Math.PI * 2); ctx.fill();
  });
}

// ---------- phông cho Phần 2 "Lúc app sập" ----------
// Cổng nhà: o.lock = khoá xe máy trên cổng, o.mess = chiếu, nồi cơm, loa kẹo kéo.
export function houseGate(k, o = {}) {
  const { ctx } = k;
  k.backdrop(o.night ? 'night' : 'day', { ground: G });
  ctx.fillStyle = '#e8d9b8'; ctx.fillRect(560, 300, 800, 630); ctx.fillStyle = '#b5482c'; ctx.beginPath(); ctx.moveTo(500, 320); ctx.lineTo(960, 120); ctx.lineTo(1420, 320); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#6e4f3a'; ctx.fillRect(860, 560, 200, 370); ctx.fillStyle = '#9fc4e8'; ctx.fillRect(620, 420, 160, 140); ctx.fillRect(1140, 420, 160, 140);
  // tường rào + cổng sắt
  ctx.fillStyle = '#c9c1b4'; ctx.fillRect(-100, 760, 700, 170); ctx.fillRect(1320, 760, 800, 170);
  ctx.strokeStyle = '#2b2f36'; ctx.lineWidth = 12; for (let x = 620; x <= 1300; x += 48) { ctx.beginPath(); ctx.moveTo(x, 640); ctx.lineTo(x, G); ctx.stroke(); }
  ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(600, 650); ctx.lineTo(1320, 650); ctx.moveTo(600, 800); ctx.lineTo(1320, 800); ctx.stroke();
  if (o.lock) { ctx.strokeStyle = '#d63a2f'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(960, 720, 40, Math.PI, 0); ctx.stroke(); ctx.fillStyle = '#1b1b24'; ctx.fillRect(915, 720, 90, 60); }
  if (o.mess) {
    ctx.fillStyle = '#e8c35a'; ctx.beginPath(); ctx.ellipse(300, 940, 260, 34, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#c9a24a'; ctx.lineWidth = 4; for (let x = 60; x < 540; x += 30) { ctx.beginPath(); ctx.moveTo(x, 915); ctx.lineTo(x + 10, 965); ctx.stroke(); }
    ctx.fillStyle = '#c9ced4'; ctx.beginPath(); ctx.roundRect(1500, 860, 120, 80, 16); ctx.fill(); ctx.fillStyle = '#8a8f98'; ctx.fillRect(1490, 850, 140, 16); k.steam(1560, 840, 1);
    ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(1700, 760, 130, 180, 14); ctx.fill(); ctx.fillStyle = '#3a3f45'; for (const y of [810, 880]) { ctx.beginPath(); ctx.arc(1765, y, 30, 0, Math.PI * 2); ctx.fill(); }
  }
}
// Văn phòng tầng 12 bỏ trống: kính, ghế xoay đổ, chậu kim tiền héo, phông "AI ĐỜI" rơi.
export function emptyOffice(k) {
  const { ctx } = k;
  ctx.fillStyle = '#cfd8dc'; ctx.fillRect(-200, -200, 2320, 1480);
  for (let c = 0; c < 6; c++) { ctx.fillStyle = '#9fc4e8'; ctx.fillRect(80 + c * 300, 80, 260, 520); ctx.fillStyle = '#7f9fb8'; for (let i = 0; i < 5; i++) ctx.fillRect(100 + c * 300 + i * 48, 360 + ((i * 37) % 140), 36, 240 - ((i * 37) % 140)); }
  ctx.fillStyle = '#8a8f98'; ctx.fillRect(-200, G, 2320, 400);
  // phông rơi
  ctx.save(); ctx.translate(1220, 760); ctx.rotate(0.12); ctx.fillStyle = '#3b1d6e'; ctx.fillRect(-380, -180, 760, 300); ctx.restore();
  k.text('AI', 1060, 740, { size: 120, font: 'title', color: '#fff' }); k.text('ĐỜI', 1380, 790, { size: 120, font: 'title', color: '#fff' });
  ctx.save(); ctx.translate(1240, 920); ctx.rotate(-0.4); k.text('ĐỔI', 0, 0, { size: 80, font: 'title', color: '#d6c6f0' }); ctx.restore();
  // ghế xoay đổ
  for (const [x, r] of [[420, 0.9], [700, -1.2]]) { ctx.save(); ctx.translate(x, 880); ctx.rotate(r); ctx.fillStyle = '#1b1b24'; ctx.fillRect(-50, -90, 100, 90); ctx.fillRect(-10, 0, 20, 50); ctx.restore(); }
  // chậu kim tiền héo
  ctx.fillStyle = '#b5482c'; ctx.fillRect(1700, 820, 110, 110); ctx.strokeStyle = '#8a7a4a'; ctx.lineWidth = 8; for (const a of [-0.9, -0.3, 0.4, 1.0]) { ctx.beginPath(); ctx.moveTo(1755, 820); ctx.quadraticCurveTo(1755 + a * 60, 740, 1755 + a * 120, 800); ctx.stroke(); }
}
export function bikeShop(k) {
  const { ctx } = k;
  k.backdrop('day', { ground: G });
  ctx.fillStyle = '#e9e4dc'; ctx.fillRect(200, 240, 1520, 690); ctx.fillStyle = '#2e6da4'; ctx.fillRect(200, 240, 1520, 110);
  k.text('MUA BÁN XE CŨ · GIÁ CAO', 960, 296, { size: 58, font: 'title', color: '#fff' });
}
export function atmBooth(k) {
  const { ctx } = k;
  k.backdrop('night', { ground: G });
  ctx.fillStyle = '#e9e4dc'; ctx.fillRect(1180, 260, 520, 670); ctx.fillStyle = '#2e6da4'; ctx.fillRect(1180, 260, 520, 90);
  k.text('ATM 24/7', 1440, 306, { size: 54, font: 'title', color: '#fff' });
  ctx.fillStyle = '#3a3f45'; ctx.fillRect(1300, 420, 280, 360); ctx.fillStyle = '#5fc3e4'; ctx.fillRect(1330, 450, 220, 150);
  ctx.fillStyle = 'rgba(160,220,255,0.18)'; ctx.fillRect(1180, 350, 520, 580);
}
export function policeHall(k) {
  const { ctx } = k;
  room(k, '#e8e4d6', '#d6d0bc', '#a59c88', { planks: false });
  ctx.fillStyle = '#c0392b'; ctx.fillRect(560, 90, 800, 110); k.text('PHÒNG TIẾP CÔNG DÂN', 960, 146, { size: 54, font: 'title', color: '#f2c230' });
  ctx.fillStyle = '#1b1b24'; ctx.fillRect(1560, 240, 260, 120); k.text('SỐ 248', 1690, 302, { size: 54, font: 'title', color: '#ff5a4a' });
  ctx.fillStyle = '#6e4f3a'; for (const y of [800, 880]) ctx.fillRect(120, y, 1680, 24);
}
export function coachNight(k) {
  const { ctx } = k;
  nightRoad(k);
  ctx.fillStyle = '#e9e4dc'; ctx.beginPath(); ctx.roundRect(360, 560, 1000, 330, 30); ctx.fill(); ctx.fillStyle = '#2e6da4'; ctx.fillRect(360, 760, 1000, 40);
  for (let i = 0; i < 6; i++) { ctx.fillStyle = '#9fc4e8'; ctx.fillRect(400 + i * 150, 600, 120, 120); }
  for (const x of [520, 1200]) { ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.arc(x, 890, 54, 0, Math.PI * 2); ctx.fill(); }
  k.text('XE KHÁCH ĐÊM · HÀ NỘI', 860, 830, { size: 34, font: 'title', color: '#fff' });
}

// =====================================================================
// Câu chuyện "Tầng 4" (khách sạn Hoàng Gia Quốc Tế): nhân vật, sổ giao ca, phông, đạo cụ.
// =====================================================================
export const KHAI = { ...base, body: 'chibi', color: '#8a1f2b', tie: '#f2c230', hair: 'short', hairColor: '#1b1410', skin: '#e3b285' }; // lễ tân, vest đỏ đô rộng
export const THAO = { ...base, body: 'chibiGirl', color: '#f29bb8', hair: 'long', hairColor: '#5a2a1a', skin: '#eec39c' };
export const BOTHAO = { ...base, body: 'chibiBig', color: '#4a6f8a', hair: 'short', hairColor: '#222', stubble: true, belly: 1, brows: true, skin: '#d9a679' };
export const NGA = { ...base, body: 'chibiGirl', color: '#c0392b', hair: 'perm', hairColor: '#2a1c15', chain: true, belly: 0.5, brows: true, skin: '#eec39c', blush: false };
export const LY = { ...base, body: 'chibi', color: '#e8743a', hair: 'short', hairColor: '#111', shades: true, chain: 'big', stubble: true, skin: '#e3b285' };
export const MAN = { ...base, body: 'chibiGirl', color: '#6b8e7a', hair: 'bun', hairColor: '#3a2a20', skin: '#d9a679' };
export const SAU = { ...base, body: 'chibi', color: '#3d5a80', hair: 'short', hairColor: '#8a8a8a', hat: 'cap', hatColor: '#2b3a55', stubble: true, belly: 0.6, skin: '#c99868' };
export const TU = { ...base, body: 'chibi', color: '#8a6a4f', hair: 'short', hairColor: '#0b0b0b', beard: true, beardColor: '#0b0b0b', skin: '#c99868' }; // bố: nhuộm đen cả râu
export const CHANTRAN = { ...base, body: 'chibi', color: '#e9e4dc', sleeves: false, hair: 'buzz', hairColor: '#1b1410', skin: '#c99868' };

const fmtN = (v) => Math.round(v).toLocaleString('vi-VN');
// Sổ giao ca (góc trên trái): o = { tip, banh, sim, nuot, t4 } — số hoặc [từ, đến, cue, dur]; o.nuotOff = thôi đếm.
export function shiftLog(k, o = {}) {
  const p = o.p ?? 1;
  if (p <= 0) return;
  const rows = [['💵 TIỀN TIP', o.tip, (v) => `${fmtN(v)} $`, '#2b7a3a'], ['🍞 BÁNH MÌ', o.banh, fmtN, '#8a5a1a'], ['📵 SIM', o.sim, fmtN, '#2e6da4'], ['🤐 CÂU HỎI ĐÃ NUỐT', o.nuot, (v) => (o.nuotOff ? 'thôi đếm' : fmtN(v)), '#c0392b'], ['👴 BỐ ĐÃ NẠP', o.bo, (v) => `${fmtN(v)} triệu`, '#d63a2f']].filter((r) => r[1] != null);
  const { ctx } = k;
  const h = 78 + rows.length * 48 + 46;
  k.group({ x: 56, y: 40, s: 0.8 + 0.2 * p, r: -0.015 }, () => {
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 6; ctx.fillStyle = '#fbf6e6'; ctx.fillRect(0, 0, 470, h); ctx.restore();
    ctx.strokeStyle = 'rgba(46,109,164,0.25)'; ctx.lineWidth = 2; for (let y = 70; y < h; y += 48) { ctx.beginPath(); ctx.moveTo(10, y); ctx.lineTo(460, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(214,58,47,0.5)'; ctx.beginPath(); ctx.moveTo(48, 0); ctx.lineTo(48, h); ctx.stroke();
    k.text('SỔ GIAO CA', 250, 36, { size: 32, font: 'title', color: '#1b1b24' });
    rows.forEach(([label, spec, f, color], i) => {
      const y = 96 + i * 48, v = tw(k, spec);
      const moving = Array.isArray(spec) && k.t > k.cue(spec[2] ?? 0) && k.t < k.cue(spec[2] ?? 0) + (spec[3] ?? 1.2);
      k.text(label, 58, y, { size: 24, font: 'title', align: 'left', color: '#4a4f57' });
      k.text(f(v), 452, y, { size: moving ? 34 : 30, font: 'title', align: 'right', color });
    });
    const y = 96 + rows.length * 48;
    k.text('🔒 TẦNG 4', 58, y, { size: 24, font: 'title', align: 'left', color: '#4a4f57' });
    k.text(o.t4 ?? 'CẤM LÊN', 452, y, { size: 30, font: 'title', align: 'right', color: '#d63a2f' });
  });
}
// Rèm vải hoa hướng dương (manh mối xuyên 2 phần).
export function sunCurtain(k, x, y, w, h) {
  const { ctx } = k;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  ctx.fillStyle = '#f0d9a0'; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = 'rgba(120,80,30,0.25)'; ctx.lineWidth = 5; for (let xx = x + 25; xx < x + w; xx += 55) { ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx + 6, y + h); ctx.stroke(); }
  const r = Math.max(14, w / 9);
  for (let i = 0; i < 40; i++) {
    const cx = x + ((i * 0.37) % 1) * w + (Math.floor(i / 4) % 2) * r, cy = y + ((i * 0.61) % 1) * h;
    ctx.fillStyle = '#f2b51a'; for (let j = 0; j < 8; j++) { const a = (j / 8) * Math.PI * 2; ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * r * 0.55, cy + Math.sin(a) * r * 0.55, r * 0.42, r * 0.2, a, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = '#6e3f1a'; ctx.beginPath(); ctx.arc(cx, cy, r * 0.38, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}
// Mặt tiền khách sạn 5 tầng ban đêm/ngày: o.lit4 = tầng 4 sáng xanh, o.fall 0..1 chữ "C" rơi, o.vans 0..1 xe vào.
export function hotelFront(k, o = {}) {
  const { ctx } = k;
  k.backdrop(o.day ? 'day' : 'night', { ground: G });
  ctx.fillStyle = '#d8cfbd'; ctx.fillRect(500, 120, 920, 810); ctx.fillStyle = '#b5ab96'; ctx.fillRect(500, 120, 920, 22);
  for (let f = 0; f < 4; f++) {
    const floor = 5 - f, y = 160 + f * 150;
    for (let c = 0; c < 6; c++) {
      const x = 540 + c * 145;
      const lit = floor === 4 && o.lit4;
      ctx.fillStyle = lit ? `rgba(95,211,200,${0.75 + 0.2 * Math.sin(k.gt * 5 + c)})` : (o.day ? '#9fc4e8' : (k.rand(f * 6 + c) > 0.75 ? '#f2d27a' : '#2b3040'));
      ctx.fillRect(x, y, 95, 100);
      if (!lit) sunCurtainEdge(ctx, x, y);
    }
    k.text(String(floor), 470, y + 50, { size: 30, font: 'title', color: floor === 4 && o.lit4 ? '#5fd3c8' : '#8a8f98' });
  }
  if (o.lit4) { const g = ctx.createRadialGradient(960, 460, 50, 960, 460, 700); g.addColorStop(0, 'rgba(95,211,200,0.25)'); g.addColorStop(1, 'rgba(95,211,200,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, k.W, k.H); }
  // tầng trệt: cửa kính + biển
  ctx.fillStyle = '#9fc4e8'; ctx.fillRect(820, 760, 280, 170); ctx.strokeStyle = '#5a5f66'; ctx.lineWidth = 8; ctx.strokeRect(820, 760, 280, 170); ctx.beginPath(); ctx.moveTo(960, 760); ctx.lineTo(960, 930); ctx.stroke();
  ctx.fillStyle = '#7a1f2b'; ctx.fillRect(520, 650, 880, 90);
  const fall = o.fall ?? 1;
  k.text('HOÀNG GIA QUỐ', 960, 696, { size: 50, font: 'title', color: '#f2c230', align: 'right' });
  k.text('TẾ ★★', 1050, 696, { size: 50, font: 'title', color: '#f2c230', align: 'left' });
  // chữ C (rơi)
  const cy = k.lerp(696, G - 10, Math.min(1, fall)), cr = fall >= 1 ? 1.2 : fall * 1.2;
  k.group({ x: fall >= 1 ? 1180 : k.lerp(1000, 1180, fall), y: cy, r: cr }, () => k.text('C', 0, 0, { size: 54, font: 'title', color: '#c9a21a' }));
  if (o.seal) {
    ctx.fillStyle = '#7a1f2b'; ctx.fillRect(520, 650, 880, 90);
    k.text('QUỐ', 900, 696, { size: 50, font: 'title', color: '#f2c230' }); k.text('TẾ', 1080, 696, { size: 50, font: 'title', color: '#f2c230' });
    'HOÀNGGIAC'.split('').forEach((ch, i) => k.group({ x: 600 + i * 70 + (i % 2) * 20, y: G - 12 - (i % 3) * 6, r: (i % 2 ? 1 : -1) * (0.6 + i * 0.2) }, () => k.text(ch, 0, 0, { size: 40, font: 'title', color: '#c9a21a' })));
    ctx.strokeStyle = '#f2c230'; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(800, 750); ctx.lineTo(1120, 930); ctx.moveTo(1120, 750); ctx.lineTo(800, 930); ctx.stroke();
    k.text('NIÊM PHONG', 960, 840, { size: 40, font: 'title', color: '#d63a2f', outline: '#fff', outlineWidth: 8 });
  }
  if (o.vans != null) for (let i = 0; i < 3; i++) { const x = k.lerp(-500 - i * 380, 160 + i * 0 + i * 0, Math.min(1, o.vans)); van(k, x + i * 0, G, i); }
}
function sunCurtainEdge(ctx, x, y) { ctx.fillStyle = 'rgba(240,200,90,0.85)'; ctx.fillRect(x, y, 18, 100); ctx.fillRect(x + 77, y, 18, 100); }
function van(k, x, y, i = 0) {
  const { ctx } = k;
  const xx = x + (i === 0 ? 0 : i === 1 ? -330 : -660);
  ctx.fillStyle = ['#e9e4dc', '#c9ced4', '#1b1f26'][i]; ctx.beginPath(); ctx.roundRect(xx, y - 190, 320, 150, 22); ctx.fill();
  ctx.fillStyle = '#2b3040'; for (let j = 0; j < 3; j++) ctx.fillRect(xx + 20 + j * 90, y - 170, 70, 50);
  ctx.fillStyle = '#f2d27a'; ctx.fillRect(xx + 300, y - 90, 20, 16);
  for (const wx of [60, 250]) { ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(xx + wx, y - 38, 34, 0, Math.PI * 2); ctx.fill(); }
}
// Sảnh lễ tân: biển tên trên tường, bảng chìa khoá, cửa thang máy phải (o.lift 0..1 mở), cửa thoát hiểm trái (o.exit 0..1 mở), rèm hoa ở cửa sổ.
export function lobby(k, o = {}) {
  const { ctx } = k;
  room(k, '#d9cfb4', '#c4b897', '#8a6a4f');
  ctx.fillStyle = '#7a1f2b'; ctx.fillRect(620, 90, 680, 90); k.text('HOÀNG GIA QUỐC TẾ ★★', 960, 136, { size: 46, font: 'title', color: '#f2c230' });
  // cửa sổ có rèm hoa hướng dương
  windowBox(k, 330, 230, 230, 300, o.day ? ['#8fd0f2', '#d8f0fb'] : ['#141b33', '#2d3a63'], { stars: !o.day });
  sunCurtain(k, 300, 220, 70, 330); sunCurtain(k, 520, 220, 70, 330);
  // bảng chìa khoá
  ctx.fillStyle = '#6e4f3a'; ctx.fillRect(1000, 240, 300, 220);
  for (let i = 0; i < 12; i++) { const x = 1030 + (i % 4) * 75, y = 275 + Math.floor(i / 4) * 65; ctx.fillStyle = o.keysGone ? '#4a3a2a' : '#f2c230'; ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill(); if (!o.keysGone) ctx.fillRect(x - 3, y, 6, 28); }
  // thang máy
  const lp = o.lift ?? 0;
  ctx.fillStyle = '#5a5f66'; ctx.fillRect(1460, 250, 330, G - 250);
  ctx.fillStyle = o.liftLight ?? '#f2d27a'; ctx.fillRect(1480, 270, 290, G - 270);
  ctx.fillStyle = '#9aa3ad'; ctx.fillRect(1480, 270, 145 * (1 - lp), G - 270); ctx.fillRect(1625 + 145 * lp, 270, 145 * (1 - lp), G - 270);
  ctx.fillStyle = '#1b1b24'; ctx.fillRect(1560, 200, 130, 46); k.text(o.floor ?? '1', 1625, 224, { size: 34, font: 'title', color: '#ff5a4a' });
  // cửa thoát hiểm
  const ep = o.exit ?? 0;
  ctx.fillStyle = '#1b1b24'; ctx.fillRect(40, 330, 220, G - 330);
  ctx.fillStyle = '#4a6a4a'; ctx.fillRect(40 + 200 * ep * 0.85, 330, 220 * (1 - ep * 0.85), G - 330);
  ctx.fillStyle = '#3fb86a'; ctx.fillRect(70, 270, 160, 46); k.text('EXIT', 150, 294, { size: 30, font: 'title', color: '#fff' });
  if (!o.day) { tint(k, '#141b33', 0.22); lamp(k, 760, 420, 0.35); }
}
// Mặt quầy lễ tân (vẽ SAU nhân vật để che nửa dưới): chuông, sổ, o.paper = tờ danh sách, o.phoneRing.
export function lobbyDesk(k, o = {}) {
  const { ctx } = k;
  const x0 = o.x ?? 560, w = o.w ?? 860;
  ctx.fillStyle = '#5e3a25'; ctx.fillRect(x0 - 20, 640, w + 40, 34); ctx.fillStyle = '#7a4e33'; ctx.fillRect(x0, 674, w, 300);
  ctx.fillStyle = '#f2c230'; k.text('LỄ TÂN · RECEPTION', x0 + w / 2, 760, { size: 40, font: 'title', color: '#f2c230' });
  ctx.fillStyle = '#c9a21a'; ctx.beginPath(); ctx.arc(x0 + w - 120, 630, 26, Math.PI, 0); ctx.fill(); ctx.fillRect(x0 + w - 150, 628, 60, 10);
  if (o.phoneRing != null) { const r = o.phoneRing ? Math.sin(k.t * 40) * 0.12 : 0; k.group({ x: x0 + 140, y: 615, r }, () => { ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(-60, -24, 120, 50, 10); ctx.fill(); ctx.fillStyle = '#d63a2f'; ctx.fillRect(-50, -40, 100, 20); }); }
}
// Trong thang máy: bảng nút, nút 4 dán băng keo đỏ. o.press 0..1 sáng nút 4.
export function lift(k, o = {}) {
  const { ctx } = k;
  const g = ctx.createLinearGradient(0, 0, k.W, 0); g.addColorStop(0, '#8a9098'); g.addColorStop(0.5, '#c9ced4'); g.addColorStop(1, '#8a9098');
  ctx.fillStyle = g; ctx.fillRect(-200, -200, k.W + 400, k.H + 400);
  ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.lineWidth = 4; for (let x = 120; x < k.W; x += 240) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, k.H); ctx.stroke(); }
  ctx.fillStyle = '#5a5048'; ctx.fillRect(-200, G, k.W + 400, 300);
  // bảng nút
  ctx.fillStyle = '#2b2f36'; ctx.beginPath(); ctx.roundRect(1380, 240, 260, 560, 18); ctx.fill();
  for (let n = 5; n >= 1; n--) {
    const y = 300 + (5 - n) * 100, on = n === 4 ? (o.press ?? 0) : 0;
    ctx.fillStyle = on > 0 ? `rgba(255,${200 - 120 * on},80,1)` : '#d6d9de'; ctx.beginPath(); ctx.arc(1510, y, 38, 0, Math.PI * 2); ctx.fill();
    if (on > 0) { ctx.save(); ctx.globalAlpha = 0.4 * on; ctx.fillStyle = '#ffb74d'; ctx.beginPath(); ctx.arc(1510, y, 70, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    k.text(String(n), 1510, y + 2, { size: 40, font: 'title', color: '#1b1b24' });
    if (n === 4 && !(o.tapeOff)) { ctx.save(); ctx.globalAlpha = 0.8 * (1 - on * 0.6); ctx.strokeStyle = '#d63a2f'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(1460, y - 50); ctx.lineTo(1560, y + 50); ctx.moveTo(1560, y - 50); ctx.lineTo(1460, y + 50); ctx.stroke(); ctx.restore(); }
  }
  ctx.fillStyle = '#1b1b24'; ctx.fillRect(860, 70, 200, 70); k.text(o.floor ?? '1', 960, 106, { size: 48, font: 'title', color: '#ff5a4a' });
  lamp(k, 960, 0, 0.3);
}
// Hành lang tầng 4 tối: khe cửa hắt ánh xanh, cuối hành lang là rèm hoa (o.curtain 0..1 rõ dần).
export function corridor4(k, o = {}) {
  const { ctx } = k;
  ctx.fillStyle = '#0d0f16'; ctx.fillRect(-200, -200, k.W + 400, k.H + 400);
  const vx = 960, vy = 470;
  ctx.fillStyle = '#1b1f2a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(vx - 160, vy - 140); ctx.lineTo(vx - 160, vy + 140); ctx.lineTo(0, k.H); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(k.W, 0); ctx.lineTo(vx + 160, vy - 140); ctx.lineTo(vx + 160, vy + 140); ctx.lineTo(k.W, k.H); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#262a35'; ctx.beginPath(); ctx.moveTo(0, k.H); ctx.lineTo(vx - 160, vy + 140); ctx.lineTo(vx + 160, vy + 140); ctx.lineTo(k.W, k.H); ctx.closePath(); ctx.fill();
  // khe cửa ánh xanh
  for (const side of [-1, 1]) for (let i = 0; i < 4; i++) {
    const u = 0.15 + i * 0.2, x = side < 0 ? k.lerp(0, vx - 160, u) : k.lerp(k.W, vx + 160, u), y1 = k.lerp(0, vy - 140, u) + 60 * (1 - u), y2 = k.lerp(k.H, vy + 140, u);
    ctx.save(); ctx.globalAlpha = 0.55 + 0.25 * Math.sin(k.gt * 6 + i * 2 + side); ctx.strokeStyle = '#5fd3c8'; ctx.lineWidth = 10 * (1 - u * 0.7); ctx.beginPath(); ctx.moveTo(x, y1 + 80 * (1 - u)); ctx.lineTo(x, y2); ctx.stroke(); ctx.restore();
    k.text(String(400 + (side < 0 ? 1 : 2) + i * 2), x + side * -30 * (1 - u), y1 + 40, { size: 30 * (1 - u * 0.6), font: 'title', color: '#8a8f98' });
  }
  // cửa sổ cuối hành lang + rèm hoa
  const cp = o.curtain ?? 1;
  ctx.fillStyle = '#2b3040'; ctx.fillRect(vx - 160, vy - 140, 320, 280);
  ctx.save(); ctx.globalAlpha = cp; sunCurtain(k, vx - 150, vy - 130, 300, 260); ctx.restore();
  const g = ctx.createRadialGradient(vx, vy, 40, vx, vy, 1100); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.6)'); ctx.fillStyle = g; ctx.fillRect(0, 0, k.W, k.H);
}
// Trong xe thùng công an: băng ghế, cửa sổ chấn song nhỏ.
export function vanInside(k) {
  const { ctx } = k;
  ctx.fillStyle = '#2b2f36'; ctx.fillRect(-200, -200, k.W + 400, k.H + 400);
  ctx.fillStyle = '#3a3f48'; ctx.fillRect(-200, 120, k.W + 400, 620);
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 6; for (let x = 0; x < k.W; x += 160) { ctx.beginPath(); ctx.moveTo(x, 120); ctx.lineTo(x, 740); ctx.stroke(); }
  windowBox(k, 860, 180, 200, 140, ['#c9d8e8', '#e9eef5'], { bars: true, frame: '#5a5f66' });
  ctx.fillStyle = '#1b1f26'; ctx.fillRect(-200, 820, k.W + 400, 40);
  ctx.fillStyle = '#22262e'; ctx.fillRect(-200, G, k.W + 400, 300);
}
// Tiệm nail của Thảo.
export function nailShop(k) {
  const { ctx } = k;
  room(k, '#f8dbe4', '#f0c3d2', '#c9a27e');
  ctx.fillStyle = '#c0397a'; ctx.fillRect(660, 90, 600, 100); k.text('NAIL THẢO 💅', 960, 142, { size: 54, font: 'title', color: '#fff' });
  ctx.fillStyle = '#fffaf0'; ctx.fillRect(1320, 250, 420, 300);
  for (let i = 0; i < 18; i++) { const x = 1350 + (i % 6) * 64, y = 300 + Math.floor(i / 6) * 80; ctx.fillStyle = ['#d63a2f', '#f29bb8', '#7b5ea7', '#3d7fc1', '#f2c230', '#1b1b24'][i % 6]; ctx.beginPath(); ctx.roundRect(x, y, 30, 46, 6); ctx.fill(); ctx.fillStyle = '#1b1b24'; ctx.fillRect(x + 8, y - 16, 14, 16); }
}
// Tiệm xe đạp ông Tư ở quê.
export function bikeRepair(k, o = {}) {
  const { ctx } = k;
  k.backdrop(o.dawn ? 'dawn' : 'day', { ground: G });
  ctx.fillStyle = '#c9b38f'; ctx.fillRect(300, 300, 1320, 630); ctx.fillStyle = '#7a4e33'; ctx.fillRect(260, 260, 1400, 70);
  ctx.fillStyle = '#2e6da4'; ctx.fillRect(700, 340, 520, 90); k.text('SỬA XE ĐẠP', 960, 386, { size: 56, font: 'title', color: '#fff' });
  ctx.strokeStyle = '#1b1b24'; ctx.lineWidth = 10; for (const [x, y] of [[420, 480], [540, 500], [1420, 480]]) { ctx.beginPath(); ctx.arc(x, y, 60, 0, Math.PI * 2); ctx.stroke(); }
  if (o.night) tint(k, '#141b33', 0.4);
}
// Tiệm SIM, điện thoại cũ.
export function simShop(k) {
  const { ctx } = k;
  k.backdrop('day', { ground: G });
  ctx.fillStyle = '#e9e4dc'; ctx.fillRect(200, 220, 1520, 710); ctx.fillStyle = '#d63a2f'; ctx.fillRect(200, 220, 1520, 110);
  k.text('SIM · ĐT CŨ · KHÔNG HỎI NHIỀU', 1130, 276, { size: 50, font: 'title', color: '#fff' });
  ctx.fillStyle = 'rgba(160,220,255,0.35)'; ctx.fillRect(560, 620, 800, 310); ctx.strokeStyle = '#5a5f66'; ctx.lineWidth = 6; ctx.strokeRect(560, 620, 800, 310);
  for (let i = 0; i < 10; i++) { ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(600 + i * 74, 680, 50, 90, 8); ctx.fill(); ctx.fillStyle = '#5fc3e4'; ctx.fillRect(606 + i * 74, 688, 38, 70); }
}
// Ngõ sau: bao rác, sọt rác.
export function alley(k) {
  const { ctx } = k;
  k.backdrop('night', { ground: G });
  ctx.fillStyle = '#5a5f66'; ctx.fillRect(-100, 100, 900, 830); ctx.fillStyle = '#4a4f57'; ctx.fillRect(1200, 160, 900, 770);
  for (const [x, s] of [[1300, 1], [1460, 0.8], [1580, 1.1]]) { ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.ellipse(x, G - 70 * s, 90 * s, 80 * s, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#3a3f48'; ctx.fillRect(x - 12, G - 160 * s, 24, 30); }
  ctx.fillStyle = '#3a8a4a'; ctx.fillRect(1700, 760, 140, 170);
  lamp(k, 600, 200, 0.3);
}
// Nhà vệ sinh: gạch men, gương, lavabo.
export function washroom(k) {
  const { ctx } = k;
  room(k, '#dfe8ea', '#c9d6d9', '#9aa6a0', { planks: false });
  ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 3; for (let x = 0; x < k.W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, G); ctx.stroke(); } for (let y = 0; y < G; y += 90) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(k.W, y); ctx.stroke(); }
  ctx.fillStyle = '#8a9098'; ctx.fillRect(1040, 160, 560, 440); ctx.fillStyle = '#b8d4e0'; ctx.fillRect(1060, 180, 520, 400);
  ctx.fillStyle = '#f4efe6'; ctx.beginPath(); ctx.roundRect(1100, 640, 440, 70, 20); ctx.fill();
  lamp(k, 1320, 120, 0.3, '230,240,255');
}
// Bàn nhậu vỉa hè: ghế nhựa, chai bia.
export function beerTable(k, x, y) {
  const { ctx } = k;
  ctx.fillStyle = '#3d7fc1'; ctx.fillRect(x - 170, y - 150, 340, 22); ctx.fillRect(x - 150, y - 128, 20, 128); ctx.fillRect(x + 130, y - 128, 20, 128);
  for (let i = 0; i < 5; i++) { ctx.fillStyle = '#3a7a3a'; ctx.beginPath(); ctx.roundRect(x - 120 + i * 50, y - 230, 30, 80, 8); ctx.fill(); ctx.fillRect(x - 112 + i * 50, y - 260, 14, 34); }
}
// Túi du lịch đầy tiền: o.open 0..1, o.eyes 0..1 (túi "nhìn lại").
export function cashBag(k, x, y, s = 1, o = {}) {
  k.group({ x, y, s }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#2b2f36'; ctx.beginPath(); ctx.roundRect(-220, -170, 440, 190, 40); ctx.fill();
    ctx.strokeStyle = '#1b1b24'; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(0, -170, 90, Math.PI, 0); ctx.stroke();
    const op = o.open ?? 1;
    if (op > 0) { for (let i = 0; i < 9; i++) { const xx = -170 + (i % 5) * 80, yy = -150 - Math.floor(i / 5) * 30 - op * 30; ctx.fillStyle = '#4fa36a'; ctx.strokeStyle = '#2b5a3a'; ctx.lineWidth = 3; ctx.fillRect(xx, yy, 66, 34); ctx.strokeRect(xx, yy, 66, 34); ctx.fillStyle = '#f4efe6'; ctx.fillRect(xx + 26, yy, 12, 34); } }
    ctx.fillStyle = '#c9a21a'; ctx.fillRect(-200, -176, 400, 10);
    const e = o.eyes ?? 0;
    if (e > 0) for (const d of [-1, 1]) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(d * 70, -60, 42, 42 * e, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.arc(d * 70 - 12, -60, 16 * e, 0, Math.PI * 2); ctx.fill(); }
  });
}
// Tờ 100 đô.
export function dollar(k, x, y, s = 1, r = 0, p = 1) {
  if (p <= 0) return;
  k.group({ x, y, s: s * k.ease.back(Math.min(1, p)), r }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#cfe3c4'; ctx.strokeStyle = '#2b5a3a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-120, -52, 240, 104, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#9cc49a'; ctx.beginPath(); ctx.ellipse(0, 0, 38, 44, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#4a6a4a'; ctx.beginPath(); ctx.arc(0, -8, 16, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(-18, 8, 36, 26);
    k.text('100', -84, -26, { size: 26, font: 'title', color: '#2b5a3a' }); k.text('100', 84, 28, { size: 26, font: 'title', color: '#2b5a3a' });
  });
}
// Thùng các-tông có nhãn.
export function box(k, x, y, w, h, label, p = 1) {
  if (p <= 0) return;
  k.group({ x, y, s: k.ease.back(Math.min(1, p)) }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#c9965a'; ctx.strokeStyle = '#7a5a2a'; ctx.lineWidth = 4; ctx.fillRect(-w / 2, -h, w, h); ctx.strokeRect(-w / 2, -h, w, h);
    ctx.fillStyle = '#b07f45'; ctx.fillRect(-12, -h, 24, h);
    if (label) k.text(label, 0, -h / 2, { size: Math.min(40, h / 3), font: 'title', color: '#1b1b24', maxWidth: w - 20 });
  });
}
// Màn hình sàn ngoại hối "LINDA FX" (o.screen của phone): biểu đồ xanh, số dư.
export function forexApp(o = {}) {
  return (k, w, h) => {
    const { ctx } = k;
    ctx.fillStyle = '#0e1a2a'; ctx.fillRect(-w / 2, -h / 2, w, h);
    k.text(o.name ?? 'GOLDEN FX 🌐', 0, -h / 2 + 36, { size: 28, font: 'title', color: '#f2c230' });
    k.text('SỐ DƯ', 0, -170, { size: 24, color: '#c9ced4' });
    k.text(o.bal ?? '13.000.000đ', 0, -128, { size: 40, font: 'title', color: '#7fe0a8' });
    ctx.strokeStyle = '#3fb86a'; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 12; i++) { const x = -w / 2 + 20 + i * (w - 40) / 12, y = 120 - i * 14 + Math.sin(i * 1.7) * 18; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    k.text(o.gain ?? '+30% / 3 ngày', 0, 200, { size: 30, font: 'title', color: '#7fe0a8' });
  };
}

// ---------- phông/đạo cụ Phần 2 "Tầng 4" ----------
export const RAU = { ...base, body: 'chibiBig', color: '#5a5f66', hair: 'buzz', hairColor: '#1b1410', beard: 'long', beardColor: '#1b1410', brows: true, belly: 1, shades: '#bcd6ef', skin: '#d9a679' }; // gã râu quai nón đóng vai "Linda"
export const LINDA = { ...base, body: 'chibiGirl', color: '#ffffff', hair: 'long', hairColor: '#1b1410', skin: '#f0cfae' }; // người mẫu thuê gọi video
export const TOTRUONG = { ...base, body: 'chibiBig', color: '#2b2f36', hair: 'buzz', shades: true, brows: true, stubble: true, chain: true, skin: '#c99868' };
export const POLICE = { ...base, body: 'chibi', color: '#5d7a3a', hair: 'short', hat: 'police', epaulet: true, brows: true, skin: '#dcaa7e' };
// Phòng 404: bàn dài, màn hình xanh, bảng chỉ tiêu (dùng scamRoom) + góc rèm hoa có đèn vòng.
export function ringCorner(k, x, y, s = 1) {
  k.group({ x, y, s }, () => {
    const { ctx } = k;
    sunCurtain(k, -260, -520, 520, 520);
    ctx.strokeStyle = '#fffbe8'; ctx.lineWidth = 18; ctx.beginPath(); ctx.arc(0, -260, 150, 0, Math.PI * 2); ctx.stroke();
    ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#fffbe8'; ctx.beginPath(); ctx.arc(0, -260, 300, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#2b2b2b'; ctx.fillRect(-6, -110, 12, 110);
  });
}
// Đèn còi công an nhấp nháy phủ khung.
export function siren(k, a = 1) {
  if (a <= 0) return;
  const { ctx } = k; const on = Math.floor(k.t * 5) % 2;
  for (const [x, c] of [[0, on ? '214,58,47' : '46,109,164'], [k.W, on ? '46,109,164' : '214,58,47']]) { const g = ctx.createRadialGradient(x, 200, 20, x, 200, 900); g.addColorStop(0, `rgba(${c},${0.45 * a})`); g.addColorStop(1, `rgba(${c},0)`); ctx.fillStyle = g; ctx.fillRect(0, 0, k.W, k.H); }
}
// Màn hình chat lừa tình (o.screen của phone/khung): msgs = [{ text, me, cue }].
export function loveChat(title, msgs, o = {}) {
  return (k, w, h) => {
    const { ctx } = k;
    ctx.fillStyle = '#eef3f8'; ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.fillStyle = '#2e6da4'; ctx.fillRect(-w / 2, -h / 2, w, 70);
    k.text(title, 0, -h / 2 + 36, { size: o.size ?? 28, font: 'title', color: '#fff' });
    let y = -h / 2 + 120;
    for (const m of msgs) {
      const p = m.cue == null ? 1 : k.at(Array.isArray(m.cue) ? k.cue(m.cue[0], m.cue[1]) : m.cue, 0.3);
      if (p > 0) chat(k, m.me ? w / 2 - 14 : -w / 2 + 14, y, m.text, { me: m.me, size: o.msgSize ?? 24, maxW: w - 40, p });
      y += (o.msgSize ?? 24) + 46;
    }
  };
}

// ===================== "Thầy" giải hạn online (076 → …) =====================
// "Bạn" = Lộc, MC đám cưới giọng trầm, thành "thầy Lộc Phát" livestream giải hạn cho một nhà máy lừa tâm linh.
export const LOC = { ...base, body: 'chibi', color: '#7a5233', outfit: 'robe', hair: 'short', hairColor: '#1b1410', hat: 'khan', hatColor: '#2a2f45', beard: 'goat', beardColor: '#d9d4cc', skin: '#e3b285' };
export const LOC_MC = { ...base, body: 'chibi', color: '#2d3a5a', tie: '#c0392b', hair: 'short', hairColor: '#1b1410', skin: '#e3b285' };
export const BATAM = { ...base, body: 'chibiGirl', color: '#b8325a', hair: 'perm', hairColor: '#3a1f14', chain: 'big', belly: 0.8, brows: true, skin: '#eec39c', blush: false };
export const TITIN = { ...base, body: 'chibi', color: '#3a3f4a', hair: 'spiky', hairColor: '#1b1410', shades: '#9fd0f0', skin: '#e3b285' };
export const TAM = { ...base, body: 'chibi', color: '#6b6f78', hair: 'bald', beard: true, beardColor: '#e9e4dc', skin: '#d9a679', brows: 'up' };
export const NGAN = { ...base, body: 'chibiGirl', color: '#f29bb8', hair: 'long', hairColor: '#2a1c15', skin: '#eec39c' };
export const CALLGIRL = (c, hair = 'long') => ({ ...base, body: 'chibiGirl', color: c, hair, hairColor: '#2a1c15', skin: '#eec39c' });

// Đèn vòng (ring light) tâm (x, y), bán kính r.
export function ringLight(k, x, y, r = 120, on = 1) {
  const { ctx } = k;
  if (on) { const g = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 3.2); g.addColorStop(0, `rgba(255,250,232,${0.35 * on})`); g.addColorStop(1, 'rgba(255,250,232,0)'); ctx.fillStyle = g; ctx.fillRect(x - r * 3.2, y - r * 3.2, r * 6.4, r * 6.4); }
  ctx.strokeStyle = on ? '#fffbe8' : '#8a8f98'; ctx.lineWidth = r * 0.16; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#2b2b2b'; ctx.fillRect(x - 6, y + r, 12, 900);
}
// Phòng livestream nhìn từ máy quay: rèm đỏ, băng rôn "PHÁP ĐÀN LỘC PHÁT". Vẽ nhân vật rồi gọi altarFront().
export function liveRoom(k, o = {}) {
  const { ctx } = k;
  const g = ctx.createLinearGradient(0, 0, 0, k.H); g.addColorStop(0, '#5a1616'); g.addColorStop(1, '#2a0b0b');
  ctx.fillStyle = g; ctx.fillRect(-200, -200, k.W + 400, k.H + 400);
  ctx.strokeStyle = 'rgba(0,0,0,0.22)'; ctx.lineWidth = 14;
  for (let x = -60; x < k.W + 100; x += 120) { ctx.beginPath(); ctx.moveTo(x, -100); ctx.quadraticCurveTo(x + 30 * Math.sin(x), 500, x, k.H + 100); ctx.stroke(); }
  // băng rôn
  k.group({ x: 960, y: 150 }, () => {
    ctx.fillStyle = '#c0392b'; ctx.strokeStyle = '#f2c230'; ctx.lineWidth = 8; ctx.beginPath(); ctx.roundRect(-420, -62, 840, 124, 14); ctx.fill(); ctx.stroke();
    k.text(o.banner ?? 'PHÁP ĐÀN LỘC PHÁT', 0, 4, { size: 64, font: 'title', color: '#f2c230' });
  });
  // bùa vàng hai bên
  for (const [x, r] of [[300, -0.06], [1620, 0.06]]) k.group({ x, y: 420, r }, () => {
    ctx.fillStyle = '#f2d27a'; ctx.fillRect(-60, -150, 120, 300);
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-30, -120); for (let i = 0; i < 8; i++) ctx.lineTo(i % 2 ? 30 : -30, -100 + i * 30); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, -125, 18, 0, Math.PI * 2); ctx.stroke();
  });
  // khói hương lơ lửng
  ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = '#e9e4dc';
  for (let i = 0; i < 6; i++) { const t = (k.gt * 0.08 + i / 6) % 1; ctx.beginPath(); ctx.ellipse(400 + i * 230 + 60 * Math.sin(k.gt * 0.5 + i), 700 - t * 600, 160, 50, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}
// Bàn thờ phía trước (vẽ SAU nhân vật): khăn đỏ viền vàng, nến điện, bát hương, chuông, đĩa quả. o.ring = 0..1 chuông rung.
export function altarFront(k, o = {}) {
  const { ctx } = k;
  const top = o.top ?? 830;
  ctx.fillStyle = '#8a1f1f'; ctx.fillRect(360, top, 1200, k.H - top + 100);
  ctx.fillStyle = '#f2c230'; ctx.fillRect(360, top, 1200, 16); ctx.fillRect(360, top + 70, 1200, 8);
  for (let x = 400; x < 1540; x += 60) { ctx.beginPath(); ctx.moveTo(x, top + 78); ctx.lineTo(x + 30, top + 110); ctx.lineTo(x + 60, top + 78); ctx.fill(); }
  // nến điện (bóng vàng nhấp nháy)
  for (const x of [470, 1450]) {
    ctx.fillStyle = '#c0392b'; ctx.fillRect(x - 22, top - 150, 44, 150);
    const f = 0.8 + 0.2 * Math.sin(k.gt * 13 + x);
    const g = ctx.createRadialGradient(x, top - 175, 4, x, top - 175, 90); g.addColorStop(0, `rgba(255,214,120,${0.7 * f})`); g.addColorStop(1, 'rgba(255,214,120,0)'); ctx.fillStyle = g; ctx.fillRect(x - 90, top - 265, 180, 180);
    ctx.fillStyle = '#ffe08a'; ctx.beginPath(); ctx.ellipse(x, top - 172, 12, 22, 0, 0, Math.PI * 2); ctx.fill();
  }
  // bát hương + khói
  ctx.fillStyle = '#c99a3a'; ctx.beginPath(); ctx.ellipse(640, top - 30, 70, 40, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(570, top - 30, 140, 30);
  ctx.strokeStyle = '#7a4a2a'; ctx.lineWidth = 4; for (const d of [-20, 0, 20]) { ctx.beginPath(); ctx.moveTo(640 + d, top - 60); ctx.lineTo(640 + d * 1.4, top - 150); ctx.stroke(); }
  k.steam(640, top - 160, 1);
  // đĩa quả
  ctx.fillStyle = '#e9e4dc'; ctx.beginPath(); ctx.ellipse(1270, top - 6, 90, 18, 0, 0, Math.PI * 2); ctx.fill();
  for (const [dx, c] of [[-40, '#f08a24'], [0, '#e4572e'], [40, '#f2c230'], [-20, '#6bb56b'], [20, '#f08a24']]) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(1270 + dx, top - 30 - (Math.abs(dx) < 30 && c !== '#e4572e' ? 30 : 0), 26, 0, Math.PI * 2); ctx.fill(); }
  // chuông đồng
  const sw = (o.ring ?? 0) * Math.sin(k.t * 40) * 0.25;
  k.group({ x: 1080, y: top - 10, r: sw }, () => {
    ctx.fillStyle = '#d4a23a'; ctx.strokeStyle = '#7a5a1a'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-60, 0); ctx.quadraticCurveTo(-56, -90, 0, -96); ctx.quadraticCurveTo(56, -90, 60, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillRect(-8, -118, 16, 24);
  });
}
// Giao diện livestream: o = { view: số|[từ,đến,cue,dur], name, comments: [{ n, t, cue, me }], qr: { amount, note, cue }, hearts }.
export function liveUI(k, o = {}) {
  const { ctx } = k;
  // đầu trang: ảnh đại diện + tên + LIVE + số người xem
  ctx.save(); ctx.globalAlpha *= 0.85; ctx.fillStyle = '#14161d'; ctx.beginPath(); ctx.roundRect(36, 36, 560, 96, 48); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#7a5233'; ctx.beginPath(); ctx.arc(84, 84, 36, 0, Math.PI * 2); ctx.fill();
  k.text('🔮', 84, 86, { size: 38 });
  k.text(o.name ?? 'Thầy Lộc Phát', 136, 66, { size: 30, font: 'title', align: 'left', color: '#fff' });
  ctx.fillStyle = '#ff2d55'; ctx.beginPath(); ctx.roundRect(136, 90, 86, 32, 8); ctx.fill();
  k.text('LIVE', 179, 107, { size: 22, font: 'title', color: '#fff' });
  const v = Math.round(tw(k, o.view ?? 3000));
  k.text(`👁 ${v.toLocaleString('vi-VN')}`, 240, 107, { size: 26, font: 'title', align: 'left', color: '#fff' });
  // tim bay bên phải
  if (o.hearts !== false) for (let i = 0; i < 7; i++) {
    const u = (k.gt * 0.35 + i / 7) % 1;
    ctx.save(); ctx.globalAlpha = 0.85 * (1 - u); k.text(['❤️', '💖', '🙏', '❤️'][i % 4], 1830 + 26 * Math.sin(k.gt * 2 + i), 1000 - u * 560, { size: 44 }); ctx.restore();
  }
  // bình luận (trôi lên, giữ 4 dòng mới nhất)
  const shown = (o.comments ?? []).filter((c) => c.cue == null || k.t >= k.cue(Array.isArray(c.cue) ? c.cue[0] : c.cue, Array.isArray(c.cue) ? c.cue[1] : 0)).slice(-4);
  shown.forEach((c, i) => {
    const y = 1010 - (shown.length - 1 - i) * 78;
    ctx.font = '600 26px "Be Vietnam Pro"';
    const w = Math.min(760, ctx.measureText(`${c.n}  ${c.t}`).width + 44);
    ctx.save(); ctx.globalAlpha *= 0.82; ctx.fillStyle = c.me ? '#7a1f2b' : '#14161d'; ctx.beginPath(); ctx.roundRect(36, y - 30, w, 60, 30); ctx.fill(); ctx.restore();
    k.text(c.n, 58, y, { size: 24, font: 'title', align: 'left', color: c.c ?? '#f2c230' });
    ctx.font = '800 24px "Be Vietnam Pro"'; const nw = ctx.measureText(c.n).width;
    k.text(c.t, 58 + nw + 14, y, { size: 26, align: 'left', color: '#fff', maxWidth: 700 - nw });
  });
  if (o.qr) qrCard(k, 1660, 640, 1, o.qr);
}
// Thẻ mã QR chuyển khoản. q = { amount, note, cue }.
export function qrCard(k, x, y, s = 1, q = {}) {
  const p = q.cue == null ? 1 : k.at(q.cue, 0.4, 'back');
  if (p <= 0) return;
  k.group({ x, y, s: s * p }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 8; ctx.beginPath(); ctx.roundRect(-150, -190, 300, 380, 20); ctx.fill(); ctx.stroke();
    k.text('LỄ GIẢI HẠN', 0, -150, { size: 30, font: 'title', color: '#c0392b' });
    ctx.fillStyle = '#1b1b24';
    for (let i = 0; i < 11; i++) for (let j = 0; j < 11; j++) if (k.rand(i * 13 + j + 7) > 0.5 || (i < 3 && j < 3) || (i > 7 && j < 3) || (i < 3 && j > 7)) ctx.fillRect(-88 + i * 16, -118 + j * 16, 15, 15);
    k.text(q.amount ?? '3.000.000đ', 0, 92, { size: 40, font: 'title', color: '#1b1b24' });
    k.text(q.note ?? 'ND: họ tên + năm sinh', 0, 140, { size: 22, color: '#5a5f66' });
  });
}
// Bảng đếm đêm live (góc trên phải): o = { clock: '0:47', chot: số|[từ,đến,cue,dur] (triệu), goal: 100 }.
export function liveHud(k, o = {}) {
  const { ctx } = k;
  const x = k.W - 520, y = 36, w = 484, h = 200;
  ctx.save(); ctx.globalAlpha *= 0.9; ctx.fillStyle = '#14161d'; ctx.beginPath(); ctx.roundRect(x, y, w, h, 18); ctx.fill(); ctx.restore();
  ctx.strokeStyle = '#f2c230'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x, y, w, h, 18); ctx.stroke();
  const goal = o.goal ?? 100, v = tw(k, o.chot ?? 0);
  k.text('⏰ ' + (o.clock ?? '0:00'), x + 22, y + 38, { size: 30, font: 'title', align: 'left', color: '#c9ced4' });
  k.text('còn ' + (o.left ?? ''), x + w - 22, y + 38, { size: 24, align: 'right', color: '#8a8f98' });
  const m = (n) => (n <= 0 ? '0' : vnd(n));
  k.text('💰 CHỐT', x + 22, y + 88, { size: 28, font: 'title', align: 'left', color: '#c9ced4' });
  k.text(`${m(v)} / ${goal}tr`, x + w - 22, y + 88, { size: 32, font: 'title', align: 'right', color: v >= goal ? '#7fe0a8' : '#ff8a7a' });
  ctx.fillStyle = '#2b2f3d'; ctx.beginPath(); ctx.roundRect(x + 22, y + 116, w - 44, 16, 8); ctx.fill();
  ctx.fillStyle = v >= goal ? '#7fe0a8' : '#f2c230'; ctx.beginPath(); ctx.roundRect(x + 22, y + 116, Math.max(16, (w - 44) * Math.min(1, v / goal)), 16, 8); ctx.fill();
  k.text('🛵 QUỸ SH', x + 22, y + 166, { size: 26, font: 'title', align: 'left', color: '#c9ced4' });
  k.text(`${m(v * 0.1)} / 70tr`, x + w - 22, y + 166, { size: 28, font: 'title', align: 'right', color: '#9fd0f0' });
}
// Thẻ "KENG!" + chuông ở góc khi có người chuyển khoản.
export function keng(k, cue, x = 1080, y = 560, text = 'KENG!') {
  const p = k.at(cue, 0.35, 'back');
  if (p <= 0 || k.t > k.cue(cue) + 1.6) return;
  k.burst(x, y, 90 * p, text, { p, size: 44, fill: '#f2c230', color: '#7a1f1f' });
}
// Phòng tầng 1: bàn gọi điện, màn hình danh sách khách hàng.
export function callFloor(k) {
  room(k, '#cfd8d4', '#b9c6c1', '#8a7a6a');
  const { ctx } = k;
  lamp(k, 960, 60, 0.25, '230,240,255');
  k.group({ x: 1480, y: 230, r: 0.02 }, () => { ctx.fillStyle = '#fffdf6'; ctx.fillRect(-230, -90, 460, 180); k.text('CHỈ TIÊU HÔM NAY', 0, -40, { size: 34, font: 'title', color: '#1b1b24' }); k.text('300 CUỘC / NGƯỜI', 0, 30, { size: 46, font: 'title', color: '#c0392b' }); });
  for (let i = 0; i < 4; i++) {
    const x = 250 + i * 470;
    ctx.fillStyle = '#7a5a3a'; ctx.fillRect(x - 200, 700, 400, 26); ctx.fillRect(x - 185, 726, 20, 204); ctx.fillRect(x + 165, 726, 20, 204);
    ctx.fillStyle = '#1b1b24'; ctx.fillRect(x - 130, 520, 260, 170); ctx.fillRect(x - 12, 690, 24, 12);
    ctx.fillStyle = '#eef3f8'; ctx.fillRect(x - 120, 530, 240, 150);
    ctx.fillStyle = '#3fb86a'; ctx.fillRect(x - 120, 530, 240, 18);
    ctx.strokeStyle = '#c9d2e0'; ctx.lineWidth = 2; for (let r = 0; r < 7; r++) { ctx.beginPath(); ctx.moveTo(x - 120, 562 + r * 18); ctx.lineTo(x + 120, 562 + r * 18); ctx.stroke(); }
    for (const c of [-60, 0, 60]) { ctx.beginPath(); ctx.moveTo(x + c, 548); ctx.lineTo(x + c, 680); ctx.stroke(); }
  }
}
// Phòng tầng 2: núi vòng tay, tì hưu, túi gấm, thùng "HÀNG SỈ 15K".
export function packFloor(k) {
  room(k, '#f0dcc0', '#e2c8a4', '#9b7a5a');
  const { ctx } = k;
  lamp(k, 960, 80, 0.3);
  for (const [x, y, w, h, t] of [[160, 600, 260, 330, 'HÀNG SỈ 15K'], [1560, 640, 240, 290, 'TÌ HƯU 12K'], [1700, 420, 200, 220, 'TÚI GẤM']]) {
    ctx.fillStyle = '#c99a5a'; ctx.strokeStyle = '#7a5a2a'; ctx.lineWidth = 5; ctx.fillRect(x, y, w, h); ctx.strokeRect(x, y, w, h);
    ctx.beginPath(); ctx.moveTo(x, y + 40); ctx.lineTo(x + w, y + 40); ctx.stroke();
    k.text(t, x + w / 2, y + h / 2 + 10, { size: 30, font: 'title', color: '#5a3a1a', maxWidth: w - 20 });
  }
  // núi vòng tay + túi gấm trên bàn dài
  ctx.fillStyle = '#7a5a3a'; ctx.fillRect(480, 720, 980, 28); ctx.fillRect(500, 748, 22, 182); ctx.fillRect(1420, 748, 22, 182);
  for (let i = 0; i < 60; i++) {
    const x = 560 + k.rand(i) * 820, y = 700 - k.rand(i + 99) * 120 * (1 - Math.abs(x - 970) / 520);
    const t = i % 3;
    if (t === 0) { ctx.strokeStyle = ['#8a3a2a', '#2a5a3a', '#3a2a1a'][i % 3]; ctx.lineWidth = 8; ctx.setLineDash([2, 8]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.ellipse(x, y, 34, 14, 0.3, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); }
    else if (t === 1) { ctx.fillStyle = '#d4a23a'; ctx.beginPath(); ctx.ellipse(x, y, 26, 18, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#7a5a1a'; ctx.beginPath(); ctx.arc(x + 14, y - 8, 4, 0, Math.PI * 2); ctx.fill(); }
    else { ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.roundRect(x - 18, y - 22, 36, 44, 6); ctx.fill(); ctx.fillStyle = '#f2c230'; ctx.fillRect(x - 18, y - 14, 36, 4); }
  }
}
// Hậu trường phòng live (nhìn từ bên hông): đèn vòng, 4 điện thoại 4 góc, màn hình chạy chữ, giá 20 điện thoại nick ảo, bàn thờ xốp.
export function backstage(k, o = {}) {
  room(k, '#3a2a2e', '#2a1e22', '#4a3a32');
  const { ctx } = k;
  // bàn thờ xốp (mặt sau lộ xốp trắng + băng keo)
  ctx.fillStyle = '#f4f1ea'; ctx.fillRect(1180, 560, 420, 370);
  ctx.strokeStyle = '#cfc8ba'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(1180, 600 + i * 55); ctx.lineTo(1600, 610 + i * 55); ctx.stroke(); }
  ctx.fillStyle = '#c9a85a'; ctx.globalAlpha = 0.8; ctx.fillRect(1180, 700, 420, 30); ctx.globalAlpha = 1;
  k.text('XỐP · HÀNG DỄ VỠ', 1390, 820, { size: 30, font: 'title', color: '#8a8f98' });
  ctx.fillStyle = '#8a1f1f'; ctx.fillRect(1160, 540, 460, 26);
  // đèn vòng
  ringLight(k, 760, 420, 130, o.ring ?? 1);
  // 4 điện thoại trên chân máy (o.rec = chớp đỏ)
  for (const [x, y] of [[420, 520], [620, 330], [900, 330], [1080, 520]]) {
    ctx.fillStyle = '#2b2b2b'; ctx.fillRect(x - 4, y + 60, 8, G - y - 60);
    ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(x - 34, y - 60, 68, 120, 10); ctx.fill();
    if (o.rec && Math.floor(k.t * 3) % 2 === 0) { ctx.fillStyle = '#ff2d2d'; ctx.beginPath(); ctx.arc(x, y - 40, 9, 0, Math.PI * 2); ctx.fill(); }
  }
  // màn hình chạy chữ
  if (o.prompter !== false) k.group({ x: 300, y: 260 }, () => {
    ctx.fillStyle = '#1b1b24'; ctx.fillRect(-170, -110, 340, 220);
    ctx.fillStyle = o.red ? '#5a0f0f' : '#0d1a12'; ctx.fillRect(-156, -96, 312, 192);
    const lines = o.lines ?? ['GIA ĐẠO BẤT ỔN!', 'NHÀ CÓ VONG THEO!', 'PHẢI LÀM LỄ NGAY'];
    lines.forEach((l, i) => k.text(l, 0, -60 + i * 56, { size: 30, font: 'title', color: o.red ? '#ff6a5a' : '#7fe0a8', maxWidth: 300 }));
  });
  // giá điện thoại nick ảo
  if (o.rack) { ctx.fillStyle = '#5a4a3a'; ctx.fillRect(1640, 300, 260, 26); ctx.fillRect(1640, 470, 260, 26); for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) { ctx.fillStyle = '#1b1b24'; ctx.fillRect(1650 + i * 42, 220 + r * 170, 34, 80); ctx.fillStyle = '#5fc3e4'; ctx.fillRect(1654 + i * 42, 226 + r * 170, 26, 60); } }
}
// Tập hồ sơ "THƯ VIỆN VONG" mở ra. rows = [[số, tên, ghi chú, cue]].
export function vongBook(k, x, y, s = 1, rows = [], o = {}) {
  k.group({ x, y, s, r: o.r ?? -0.02 }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#2a3a5a'; ctx.beginPath(); ctx.roundRect(-640, -400, 1280, 800, 20); ctx.fill();
    ctx.fillStyle = '#fffdf6'; ctx.fillRect(-610, -370, 600, 740); ctx.fillRect(10, -370, 600, 740);
    ctx.fillStyle = '#c9c2b2'; ctx.fillRect(-10, -380, 20, 760);
    k.text('THƯ VIỆN VONG', -310, -310, { size: 50, font: 'title', color: '#c0392b' });
    k.text('(nội bộ · cấm mang ra ngoài)', -310, -255, { size: 24, color: '#8a8f98' });
    rows.forEach(([n, name, note, cue], i) => {
      const p = cue == null ? 1 : k.at(cue, 0.4);
      if (p <= 0) return;
      const left = i < 3, yy = left ? -170 + i * 170 : -300 + (i - 3) * 170, xx = left ? -580 : 40;
      ctx.save(); ctx.globalAlpha *= p;
      k.text(`VONG SỐ ${n}`, xx, yy, { size: 32, font: 'title', align: 'left', color: '#1b1b24' });
      k.text(name, xx, yy + 44, { size: 30, align: 'left', color: '#2e6da4', maxWidth: 540 });
      k.text(note, xx, yy + 86, { size: 24, align: 'left', color: '#8a5a3a', maxWidth: 540 });
      ctx.restore();
    });
    if (o.last != null) { const p = k.at(o.last, 0.5, 'back'); if (p > 0) k.group({ x: 310, y: 250, s: p, r: -0.05 }, () => { ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 8; ctx.strokeRect(-270, -70, 540, 140); k.text('MỌI THỨ', 0, -26, { size: 46, font: 'title', color: '#c0392b' }); k.text('ĐỀU LÀ VONG', 0, 32, { size: 46, font: 'title', color: '#c0392b' }); }); }
  });
}
// Thiệp cưới Ngân ❤ Tuấn (có hình con SH).
export function invite(k, x, y, s = 1, p = 1) {
  if (p <= 0) return;
  k.group({ x, y, s: s * (0.6 + 0.4 * p), r: -0.06 }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#c0392b'; ctx.strokeStyle = '#f2c230'; ctx.lineWidth = 8; ctx.beginPath(); ctx.roundRect(-260, -180, 520, 360, 14); ctx.fill(); ctx.stroke();
    k.text('囍', 0, -110, { size: 70, color: '#f2c230' });
    k.text('NGÂN ❤ TUẤN', 0, -30, { size: 46, font: 'title', color: '#fff' });
    k.text('Mời anh Lộc làm MC nhé!', 0, 30, { size: 26, color: '#ffe0a0' });
    moto(k, 0, 160, 0.5, { scooter: true, color: '#f4f1ea' });
  });
}
// Phòng trọ (rạng sáng): đệm dưới sàn, gương, cửa sổ, bộ vest MC treo đinh.
export function troRoom(k, o = {}) {
  room(k, '#d8cfc0', '#c4b8a6', '#8a7a66');
  const { ctx } = k;
  windowBox(k, 1320, 160, 380, 340, o.dawn ? ['#f6b98a', '#fde6c8'] : ['#141b33', '#2d3a63'], { frame: '#e9e4dc' });
  ctx.fillStyle = '#e9e4dc'; ctx.fillRect(260, 820, 760, 110); ctx.fillStyle = '#9fb8d0'; ctx.fillRect(260, 800, 760, 30); ctx.fillStyle = '#f4f1ea'; ctx.beginPath(); ctx.ellipse(360, 805, 80, 30, 0, 0, Math.PI * 2); ctx.fill();
  // vest MC treo
  ctx.strokeStyle = '#5a5f66'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1150, 240); ctx.lineTo(1150, 270); ctx.stroke();
  ctx.fillStyle = '#2d3a5a'; ctx.beginPath(); ctx.moveTo(1080, 280); ctx.lineTo(1220, 280); ctx.lineTo(1240, 520); ctx.lineTo(1060, 520); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#c0392b'; ctx.fillRect(1142, 290, 16, 90);
  // gương
  ctx.fillStyle = '#7a5a3a'; ctx.fillRect(150, 230, 230, 330); ctx.fillStyle = '#cfe3ee'; ctx.fillRect(166, 246, 198, 298);
  if (o.dawn) lamp(k, 1500, 300, 0.35, '255,200,150'); else tint(k, '#0d1222', 0.3);
}
// Khung live thu nhỏ (cho cảnh "mặt mình đang live trên 3 kênh"): vẽ liveRoom + nhân vật vào ô (x, y, w, h).
export function miniLive(k, x, y, w, h, fn, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(x - 12, y - 12, w + 24, h + 24, 20); ctx.fill();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  k.group({ x, y, s: w / 1920 }, () => { const W = k.W, H = k.H; k.W = 1920; k.H = 1080; try { fn(); } finally { k.W = W; k.H = H; } });
  ctx.restore();
  ctx.fillStyle = '#ff2d55'; ctx.beginPath(); ctx.roundRect(x + 14, y + 14, 90, 36, 8); ctx.fill();
  k.text('LIVE', x + 59, y + 33, { size: 24, font: 'title', color: '#fff' });
  if (o.view) k.text(`👁 ${o.view}`, x + 120, y + 33, { size: 24, font: 'title', align: 'left', color: '#fff', outline: '#1b1b24', outlineWidth: 6 });
  if (o.label) k.text(o.label, x + w / 2, y + h + 44, { size: 30, font: 'title', color: '#fff' });
}
