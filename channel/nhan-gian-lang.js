// Bộ cảnh "làng quê trung du / đường quốc lộ" cho Nhân Gian Chưa Kể (tập Gọi Hồn, 106). Dùng cùng channel/nhan-gian.js.
// Quy ước: phông → nhân vật → shade() → chữ.
import { INK, PAPER, AMBER } from '/channel/nhan-gian.js';

function B(ctx, fill, path, lw = 4, stroke = INK) {
  ctx.beginPath(); path(); ctx.fillStyle = fill; ctx.fill();
  if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.stroke(); }
}
const T = (k) => k.gt ?? 0;
const nob = { blush: false, shadow: false, plain: true };

// ---------- nhân vật ----------
export const HUY = { ...nob, body: 'kid', outfit: 'tunic', color: '#4f6a86', hair: 'short', hairColor: '#1d1712', skin: '#e0b48e' };
export const HUY_LON = { ...nob, body: 'man', outfit: 'tunic', color: '#3c4652', hair: 'short', hairColor: '#1d1712', skin: '#d9ae88' };
export const BO = { ...nob, body: 'man', outfit: 'tunic', color: '#5a5a4a', hair: 'short', hairColor: '#1d1712', stubble: true, skin: '#c99868' };
export const ME = { ...nob, body: 'woman', outfit: 'dress', color: '#5f4a5a', hair: 'bun', hairColor: '#1d1712', skin: '#d9ad86' };
export const BA_NOI = { ...nob, body: 'woman', outfit: 'dress', color: '#4a3a2e', hair: 'bun', hairColor: '#c9c3b8', skin: '#cfa47e' };
export const CHU_TU = { ...nob, body: 'man', outfit: 'tunic', color: '#3a4a3a', hair: 'short', hairColor: '#2a2018', stubble: true, skin: '#b98a62' };
export const CHU_THINH = { ...nob, body: 'man', outfit: 'tunic', color: '#3a3f55', hair: 'short', hairColor: '#1d1712', skin: '#c99868' };
export const BA_HAI = { ...nob, body: 'woman', outfit: 'dress', color: '#5a3a26', hair: 'bun', hairColor: '#6a645c', skin: '#c49a74' };
export const LIEN = { ...nob, body: 'woman', outfit: 'dress', color: '#26262c', hair: 'long', hairColor: '#1d1712', skin: '#e2bc98' };
export const BIN = { ...nob, body: 'kid', outfit: 'tunic', color: '#c8a050', hair: 'short', hairColor: '#1d1712', skin: '#e6bf9a' };
export const DAN = (c, extra = {}) => ({ ...nob, body: extra.body ?? 'man', outfit: 'tunic', color: c, hair: 'short', ...extra });

// Bà đồng trùm khăn đỏ, ngồi (chân tại x, y), cao h. o.shake 0..1 = run người; o.turn -1..1 = quay đầu; o.slump = gục.
export function medium(k, x, y, h = 360, o = {}) {
  const { ctx } = k, t = T(k), sh = (o.shake ?? 0) * Math.sin(t * 40) * 3, s = h / 360;
  ctx.save(); ctx.translate(x + sh, y); ctx.scale(s, s);
  if (o.slump) ctx.rotate(0.35 * o.slump);
  B(ctx, '#5a3a26', () => { ctx.moveTo(-150, 0); ctx.quadraticCurveTo(-150, -120, -90, -170); ctx.lineTo(90, -170); ctx.quadraticCurveTo(150, -120, 150, 0); ctx.closePath(); });
  const tx = (o.turn ?? 0) * 26;
  B(ctx, '#a8231e', () => { ctx.moveTo(-110 + tx, -150); ctx.quadraticCurveTo(-100 + tx, -330, 0 + tx, -345); ctx.quadraticCurveTo(100 + tx, -330, 110 + tx, -150); ctx.quadraticCurveTo(0 + tx, -120, -110 + tx, -150); ctx.closePath(); });
  ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 3; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 30 + tx, -320); ctx.quadraticCurveTo(i * 40 + tx, -230, i * 46 + tx, -150); ctx.stroke(); }
  ctx.fillStyle = '#e8c06a'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(-100 + i * 25 + tx, -148 + Math.abs(i - 4) * 2, 4, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}
// Gian thờ: tường gạch, bàn thờ gỗ đỏ, ảnh thờ, 2 nến, bát hương, khói. o.photo (true = ảnh bố), o.brick 0..1 (viên gạch thứ ba bật lên), o.dark.
export const ALTAR = { candles: [{ x: 780, y: 470 }, { x: 1140, y: 470 }], x: 960, y: 640, floor: 900 };
export function altarRoom(k, o = {}) {
  const { ctx, W, H } = k, t = T(k);
  ctx.fillStyle = '#4a2e22'; ctx.fillRect(-200, -200, W + 400, ALTAR.floor + 200);
  ctx.strokeStyle = 'rgba(0,0,0,0.22)'; ctx.lineWidth = 2;
  for (let y = 0; y < ALTAR.floor; y += 50) { ctx.beginPath(); ctx.moveTo(-200, y); ctx.lineTo(W + 200, y); ctx.stroke(); for (let x = (y / 50) % 2 ? 0 : 60; x < W; x += 120) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 50); ctx.stroke(); } }
  ctx.fillStyle = '#3a2a20'; ctx.fillRect(-200, ALTAR.floor, W + 400, H);
  // hoành phi + bàn thờ
  B(ctx, '#6a1a14', () => ctx.rect(660, 130, 600, 90));
  k.text('☯', 960, 178, { size: 50, color: '#d8b04a' });
  B(ctx, '#7a2418', () => ctx.rect(620, 560, 680, 40));
  B(ctx, '#5e1c12', () => ctx.rect(650, 600, 620, 300));
  ctx.strokeStyle = '#c99a3a'; ctx.lineWidth = 3; ctx.strokeRect(680, 630, 560, 240);
  // ảnh thờ
  B(ctx, '#2a1a10', () => ctx.rect(890, 330, 140, 180), 5, '#c99a3a');
  if (o.photo !== false) { ctx.save(); ctx.beginPath(); ctx.rect(898, 338, 124, 164); ctx.clip(); ctx.fillStyle = '#8a8a7a'; ctx.fillRect(898, 338, 124, 164); k.char(960, 560, 230, { ...BO, face: 'calm', shadow: false }); ctx.restore(); }
  // bát hương + hương
  B(ctx, '#c9a24a', () => { ctx.moveTo(910, 560); ctx.lineTo(1010, 560); ctx.quadraticCurveTo(1005, 520, 960, 518); ctx.quadraticCurveTo(915, 520, 910, 560); ctx.closePath(); }, 3);
  for (let i = 0; i < 3; i++) { ctx.strokeStyle = '#b5482c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(945 + i * 15, 520); ctx.lineTo(940 + i * 20, 460); ctx.stroke(); ctx.save(); ctx.globalAlpha = 0.25; ctx.strokeStyle = '#d8dde3'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(940 + i * 20, 458); for (let j = 1; j < 14; j++) ctx.lineTo(940 + i * 20 + Math.sin(t * 1.2 + j * 0.6 + i) * j * 3, 458 - j * 18); ctx.stroke(); ctx.restore(); }
  // nến
  for (const c of ALTAR.candles) { B(ctx, '#efe4cc', () => ctx.rect(c.x - 12, c.y + 10, 24, 80), 2); ctx.fillStyle = '#ffb340'; ctx.beginPath(); ctx.ellipse(c.x, c.y, 8, 18 * (1 + 0.12 * Math.sin(t * 12 + c.x)), 0, 0, Math.PI * 2); ctx.fill(); }
  // gạch dưới chân bàn thờ
  for (let i = 0; i < 6; i++) { const lift = i === 2 ? (o.brick ?? 0) : 0; ctx.save(); ctx.translate(700 + i * 90, ALTAR.floor + 30 - lift * 40); ctx.rotate(-0.3 * lift); B(ctx, '#8a4a32', () => ctx.rect(-42, -14, 84, 28), 3); ctx.restore(); }
  if ((o.brick ?? 0) > 0.5) B(ctx, '#c9b07a', () => ctx.rect(855, ALTAR.floor + 22, 50, 22), 2);
}
export const altarLights = (a = 1) => ALTAR.candles.map((c) => ({ x: c.x, y: c.y, r: 380 * a, flicker: 1, warm: 0.9 }));

// Xe tải cũ (thân xanh rêu, thùng bạt): đầu xe tại x, mặt đường y. o.lights = đèn pha, o.flip.
export function truck(k, x, y, s = 1, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  B(ctx, '#4a5a3a', () => ctx.rect(-420, -260, 300, 200));
  B(ctx, '#5a6a46', () => ctx.rect(-120, -220, 150, 160));
  B(ctx, '#2a3a48', () => ctx.rect(-100, -200, 100, 70), 3);
  for (const wx of [-340, -180, -30]) { B(ctx, '#1a1a1a', () => ctx.arc(wx, -50, 40, 0, Math.PI * 2)); B(ctx, '#777', () => ctx.arc(wx, -50, 14, 0, Math.PI * 2), 3); }
  if (o.lights) { const g = ctx.createLinearGradient(30, 0, 600, 0); g.addColorStop(0, 'rgba(255,240,190,0.55)'); g.addColorStop(1, 'rgba(255,240,190,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(30, -110); ctx.lineTo(600, -200); ctx.lineTo(600, 40); ctx.lineTo(30, -80); ctx.closePath(); ctx.fill(); }
  ctx.restore();
}
// Đèo núi đêm: núi đen, đường vòng, vực bên phải. o.rain.
export function pass(k, o = {}) {
  const { ctx, W, H } = k;
  const g = ctx.createLinearGradient(0, 0, 0, 800); g.addColorStop(0, '#070a14'); g.addColorStop(1, '#1a2230');
  ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400);
  ctx.fillStyle = '#0d1218'; ctx.beginPath(); ctx.moveTo(-200, 700); ctx.lineTo(200, 260); ctx.lineTo(600, 520); ctx.lineTo(1000, 180); ctx.lineTo(1500, 480); ctx.lineTo(2100, 300); ctx.lineTo(2100, 1300); ctx.lineTo(-200, 1300); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2a2a2e'; ctx.beginPath(); ctx.moveTo(-200, 820); ctx.quadraticCurveTo(700, 700, 1300, 760); ctx.quadraticCurveTo(1600, 790, 1700, 900); ctx.lineTo(1500, 960); ctx.quadraticCurveTo(1300, 860, 900, 860); ctx.quadraticCurveTo(300, 880, -200, 980); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#05070a'; ctx.beginPath(); ctx.moveTo(1500, 960); ctx.lineTo(2100, 900); ctx.lineTo(2100, 1300); ctx.lineTo(1300, 1300); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(240,240,220,0.4)'; ctx.setLineDash([30, 30]); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-200, 900); ctx.quadraticCurveTo(700, 780, 1300, 810); ctx.stroke(); ctx.setLineDash([]);
  if (o.rain) k.rain(0, 0, W, H);
}
// Đầm sen buổi sớm: mặt nước, lá sen, bờ cỏ, sương. o.time 'dawn' | 'day'.
export function lotus(k, o = {}) {
  const { ctx, W, H } = k, t = T(k);
  const g = ctx.createLinearGradient(0, 0, 0, 560); g.addColorStop(0, o.time === 'day' ? '#a8c8d8' : '#c8b8b0'); g.addColorStop(1, o.time === 'day' ? '#e8e0c8' : '#f0d8b8');
  ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, 760);
  ctx.fillStyle = '#5f7a5a'; ctx.fillRect(-200, 470, W + 400, 70);
  ctx.fillStyle = '#6a8a8a'; ctx.fillRect(-200, 540, W + 400, H);
  for (let i = 0; i < 26; i++) { const x = (k.rand(i + 900) * (W + 200)) - 100, y = 580 + k.rand(i + 901) * 260; B(ctx, i % 3 ? '#4f7a46' : '#5f8a52', () => ctx.ellipse(x, y, 60 + k.rand(i) * 40, 18 + k.rand(i) * 8, 0, 0, Math.PI * 2), 2, '#2a4a2a'); if (i % 5 === 0) { B(ctx, '#e89aa8', () => ctx.ellipse(x + 10, y - 40, 14, 22, 0, 0, Math.PI * 2), 2); ctx.strokeStyle = '#4a6a3a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + 10, y - 18); ctx.lineTo(x + 8, y); ctx.stroke(); } }
  ctx.fillStyle = '#4a5a32'; ctx.beginPath(); ctx.moveTo(-200, 1300); ctx.lineTo(-200, 880); ctx.quadraticCurveTo(500, 850, 1000, 900); ctx.quadraticCurveTo(1500, 940, 2100, 920); ctx.lineTo(2100, 1300); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 6; i++) { const x = ((i * 380 + t * 15) % (W + 600)) - 300; const rg = ctx.createRadialGradient(x, 560, 0, x, 560, 300); rg.addColorStop(0, 'rgba(240,240,235,0.25)'); rg.addColorStop(1, 'rgba(240,240,235,0)'); ctx.fillStyle = rg; ctx.fillRect(x - 300, 400, 600, 320); }
}
// Cần câu: tay tại (x, y), dây xuống mặt nước.
export function rod(k, x, y, s = 1) {
  const { ctx } = k;
  ctx.strokeStyle = '#7a5a36'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 260 * s, y - 220 * s); ctx.stroke();
  ctx.strokeStyle = 'rgba(240,240,240,0.6)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 260 * s, y - 220 * s); ctx.lineTo(x + 300 * s, y + 160 * s + Math.sin(T(k) * 2) * 4); ctx.stroke();
}
// Quán nước ven đường dưới gốc bàng (thị trấn). o.photo = vẽ tấm ảnh trên vách (bố bế Bin).
export const QUAN = { door: { x: 1200, y: 640 } };
export function quan(k, o = {}) {
  const { ctx, W, H } = k, t = T(k);
  const g = ctx.createLinearGradient(0, 0, 0, 700); g.addColorStop(0, '#a8c4d8'); g.addColorStop(1, '#e8dcc0');
  ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, 900);
  ctx.fillStyle = '#7a7a72'; ctx.fillRect(-200, 820, W + 400, 300); // đường
  ctx.strokeStyle = 'rgba(240,240,220,0.6)'; ctx.setLineDash([40, 40]); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-200, 960); ctx.lineTo(W + 200, 960); ctx.stroke(); ctx.setLineDash([]);
  B(ctx, '#a08a6a', () => ctx.rect(900, 380, 760, 440));
  B(ctx, '#6a5a4a', () => { ctx.moveTo(860, 400); ctx.lineTo(1280, 300); ctx.lineTo(1700, 400); ctx.closePath(); });
  B(ctx, '#2a2018', () => ctx.rect(1110, 520, 180, 300), 3);
  B(ctx, '#e8dcc0', () => ctx.rect(960, 440, 220, 60), 3); k.text('QUÁN NƯỚC', 1070, 472, { size: 26, font: 'title', color: '#3a2a1a' });
  if (o.photo) { B(ctx, '#2a1a10', () => ctx.rect(1420, 460, 130, 160), 4, '#c99a3a'); ctx.save(); ctx.beginPath(); ctx.rect(1426, 466, 118, 148); ctx.clip(); ctx.fillStyle = '#b8b0a0'; ctx.fillRect(1426, 466, 118, 148); k.char(1470, 700, 220, { ...BO, face: 'happy', pose: 'hold' }); k.char(1505, 650, 110, { ...BIN, face: 'happy' }); ctx.restore(); }
  // cây bàng
  B(ctx, '#4a3424', () => { ctx.moveTo(500, 830); ctx.lineTo(520, 420); ctx.lineTo(560, 420); ctx.lineTo(580, 830); ctx.closePath(); });
  for (let i = 0; i < 4; i++) B(ctx, i % 2 ? '#4a7a3a' : '#5a8a46', () => ctx.ellipse(540 + (i - 1.5) * 150, 360 - (i % 2) * 70 + Math.sin(t * 0.8 + i) * 4, 200, 70, 0, 0, Math.PI * 2), 0);
  // bàn ghế nhựa
  B(ctx, '#3a7aa8', () => ctx.rect(760, 740, 140, 16), 3); B(ctx, '#3a7aa8', () => ctx.rect(770, 756, 10, 70), 2); B(ctx, '#3a7aa8', () => ctx.rect(880, 756, 10, 70), 2);
}
// Quốc lộ + biển thị trấn; người đạp xe ở x (o.rider = char).
export function highway(k, x = 900, o = {}) {
  const { ctx, W, H } = k;
  const g = ctx.createLinearGradient(0, 0, 0, 700); g.addColorStop(0, o.time === 'dusk' ? '#5a4a6a' : '#a8c4d8'); g.addColorStop(1, o.time === 'dusk' ? '#e0a070' : '#f0e4c8');
  ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, 900);
  ctx.fillStyle = o.time === 'dusk' ? '#2a3a2a' : '#6a8a5a'; ctx.beginPath(); ctx.moveTo(-200, 760); for (let xx = -200; xx <= W + 200; xx += 60) ctx.lineTo(xx, 640 - 80 * Math.abs(Math.sin(xx / 500))); ctx.lineTo(W + 200, 760); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#6a6a66'; ctx.fillRect(-200, 760, W + 400, 400);
  ctx.strokeStyle = 'rgba(240,240,220,0.6)'; ctx.setLineDash([50, 50]); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-200, 900); ctx.lineTo(W + 200, 900); ctx.stroke(); ctx.setLineDash([]);
  if (o.sign) { B(ctx, '#3a6a9a', () => ctx.rect(1500, 470, 300, 110), 4, '#efe4cc'); k.text('THỊ TRẤN', 1650, 505, { size: 30, font: 'title', color: '#fff' }); k.text('BA LĂNG', 1650, 550, { size: 40, font: 'title', color: '#fff' }); ctx.fillStyle = '#5a5a5a'; ctx.fillRect(1640, 580, 16, 180); }
  if (o.rider) bike(k, x, 880, 1, o.rider);
}
// Xe đạp có người: bánh dưới tại (x, y).
export function bike(k, x, y, s = 1, char) {
  const { ctx } = k, t = T(k);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const wx of [-70, 70]) { ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(wx, -40, 40, 0, Math.PI * 2); ctx.stroke(); }
  ctx.strokeStyle = '#3a5a7a'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-70, -40); ctx.lineTo(-10, -100); ctx.lineTo(50, -100); ctx.lineTo(70, -40); ctx.moveTo(-10, -100); ctx.lineTo(10, -40); ctx.lineTo(-70, -40); ctx.stroke();
  ctx.restore();
  if (char) k.char(x - 5 * s, y - 40 * s + Math.sin(t * 8) * 2, 300 * s, { ...char, walk: true, walkSpeed: 1.5 });
}
// Biên lai bưu điện (giấy mỏng). rows = dòng chữ; tâm (x, y), xoay r.
export function receipt(k, x, y, s = 1, rows = [], r = 0, p = 1) {
  const { ctx } = k;
  if (p <= 0) return;
  ctx.save(); ctx.globalAlpha *= p; ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s);
  B(ctx, '#e8e0cc', () => ctx.rect(-220, -140, 440, 280), 2, '#8a7a5a');
  ctx.fillStyle = '#b5482c'; ctx.fillRect(-220, -140, 440, 40);
  ctx.restore();
  k.group({ x, y, r, s }, () => {
    k.text('BƯU ĐIỆN HUYỆN · PHIẾU GỬI TIỀN', 0, -118, { size: 18, font: 'title', color: '#fff', p });
    rows.forEach((t, i) => k.text(t, -195, -60 + i * 48, { size: 26, align: 'left', color: '#2a2018', p }));
  });
}
// Tờ giấy 10 dòng (câu bà đồng nói). struck = số dòng bị gạch; hl = dòng khoanh.
export function tenLines(k, x, y, lines, o = {}) {
  const { ctx } = k, w = 900, h = 120 + lines.length * 62;
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.012);
  B(ctx, '#ece4d0', () => ctx.rect(-w / 2, -h / 2, w, h), 3, '#7a6a52');
  ctx.restore();
  lines.forEach((t, i) => {
    const yy = y - h / 2 + 90 + i * 62, p = k.at(o.cues?.[i] ?? 0, 0.6);
    k.text(`${i + 1}. ${t}`, x - w / 2 + 50, yy, { size: 34, font: 'title', align: 'left', color: '#2a2018', fx: 'fade', p });
    if (i < (o.struck ?? 0)) { const sp = k.at(o.strikeCue ?? 0, 0.4 + i * 0.15); ctx.strokeStyle = 'rgba(180,40,30,0.75)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x - w / 2 + 40, yy + 2); ctx.lineTo(x - w / 2 + 40 + (w - 100) * sp, yy + 2); ctx.stroke(); }
    if (o.hl === i) { ctx.strokeStyle = '#d63a2f'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x, yy, w / 2 - 20, 34, 0, 0, Math.PI * 2 * k.at(o.hlCue ?? 0, 0.8)); ctx.stroke(); }
  });
}
// Nhà chú Tư: vách đất, chõng tre, chai rượu, nắng chiều từ cửa.
export const NHA = { door: { x: 1700, y: 400, r: 900 } };
export function nhaTrong(k, o = {}) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#5a4632'; ctx.fillRect(-200, -200, W + 400, 1100);
  ctx.fillStyle = '#3a2c20'; ctx.fillRect(-200, 900, W + 400, H);
  B(ctx, '#e8c890', () => ctx.rect(1560, 200, 300, 700), 3);
  if (o.chong !== false) {
    B(ctx, '#a8894f', () => ctx.rect(500, 760, 600, 30), 3);
    for (const lx of [520, 1060]) B(ctx, '#7a5a36', () => ctx.rect(lx, 790, 20, 110), 2);
    B(ctx, '#5a6a5a', () => { ctx.moveTo(1000, 760); ctx.lineTo(1000, 680); ctx.lineTo(1014, 660); ctx.lineTo(1028, 680); ctx.lineTo(1028, 760); ctx.closePath(); }, 3);
    B(ctx, '#e8e0d4', () => ctx.ellipse(960, 754, 16, 7, 0, 0, Math.PI * 2), 2);
  }
}
