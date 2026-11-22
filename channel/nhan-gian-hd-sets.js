// Nhân Gian Chưa Kể — phông HD đợt 1 (15/11): bếp, gian thờ, trong nhà, đầm sen, quán nước, quốc lộ, đèo + nhân vật có khối.
// Giữ đúng toạ độ mốc của phông cũ (sàn y 900, bếp lửa x 520, chum x 1230, xó 1380–1760, nến thờ 780/1140 y 470…)
// để thay thế trực tiếp trong video. Phần tĩnh vẽ một lần vào bộ đệm (cached), phần động (lửa, khói, nước, mưa) vẽ mỗi khung.
import { INK, hearth, bowl } from '/channel/nhan-gian.js';
import { PAL, mix, vary, sky, landscape, thatch, mudWall, planks, brickYard, bigTree, urnJar, bambooFence, grass, cached, bambooClump } from '/channel/nhan-gian-hd.js';

const T = (k) => k.gt ?? 0;
const R = (k, i) => k.rand(i);

// ---------- nhân vật có khối ----------
// Vẽ k.char vào canvas phụ, phủ sáng–tối theo hướng đèn (lx = vị trí x nguồn sáng), viền ấm, bóng đổ mềm dưới chân.
const CH = { c: null };
export function charHD(k, x, y, h, o = {}, lt = {}) {
  const size = Math.ceil(h * 1.7), { ctx } = k;
  if (!CH.c || CH.c.width < size) { CH.c = document.createElement('canvas'); CH.c.width = CH.c.height = Math.max(size, 900); }
  const c = CH.c, g = c.getContext('2d');
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1; g.clearRect(0, 0, c.width, c.height);
  const ox = size / 2, oy = size * 0.92;
  const old = k.ctx; k.ctx = g;
  try { k.char(ox, oy, h, { ...o, shadow: false }); } finally { k.ctx = old; }
  // khối sáng tối
  const dir = Math.sign((lt.x ?? x + 600) - x) || 1;
  g.globalCompositeOperation = 'source-atop';
  const sg = g.createLinearGradient(ox - dir * h * 0.35, 0, ox + dir * h * 0.35, 0);
  sg.addColorStop(0, `rgba(10,8,24,${lt.dark ?? 0.38})`); sg.addColorStop(0.55, 'rgba(10,8,24,0)'); sg.addColorStop(0.8, 'rgba(0,0,0,0)'); sg.addColorStop(1, lt.warm ?? 'rgba(255,190,120,0.28)');
  g.fillStyle = sg; g.fillRect(0, 0, size, size);
  const vg = g.createLinearGradient(0, oy - h, 0, oy); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(10,8,20,0.22)');
  g.fillStyle = vg; g.fillRect(0, 0, size, size);
  g.globalCompositeOperation = 'source-over';
  // bóng đổ
  if (o.shadow !== false) { ctx.save(); ctx.filter = 'blur(6px)'; ctx.globalAlpha = 0.45 * (o.alpha ?? 1); ctx.fillStyle = '#05040a'; ctx.beginPath(); ctx.ellipse(x - dir * h * 0.06, y + 2, h * 0.2, h * 0.035, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  ctx.drawImage(c, 0, 0, size, size, x - ox, y - oy, size, size);
}

// ---------- chi tiết dùng chung ----------
function rafters(k, y0, y1, base = '#3a2a1a') {
  const { ctx, W } = k;
  ctx.fillStyle = vary(base, -0.35); ctx.fillRect(-200, -200, W + 400, y1 + 200);
  // mặt dưới mái rạ: sợi rơm sẫm
  ctx.save(); ctx.beginPath(); ctx.rect(-200, -200, W + 400, y1 + 200); ctx.clip();
  for (let i = 0; i < 700; i++) { ctx.strokeStyle = vary('#6a5432', (R(k, i) - 0.6) * 0.6); ctx.globalAlpha = 0.35; ctx.lineWidth = 1.3; const x = R(k, i + 9) * (W + 200) - 100, y = R(k, i + 19) * y1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 18, y + 10); ctx.stroke(); }
  ctx.restore(); ctx.globalAlpha = 1;
  // kèo, xà
  for (let x = -60; x < W + 100; x += 170) { ctx.save(); ctx.translate(x, y1); ctx.rotate(-0.55); ctx.fillStyle = vary(base, (R(k, x) - 0.5) * 0.2); ctx.fillRect(-8, -320, 16, 340); ctx.restore(); }
  ctx.fillStyle = vary(base, -0.1); ctx.fillRect(-200, y1 - 26, W + 400, 30);
  ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-200, y1 + 4); ctx.lineTo(W + 200, y1 + 4); ctx.stroke();
}
function dirtFloor(k, y0, base = '#3a2c20') {
  const { ctx, W, H } = k;
  const g = ctx.createLinearGradient(0, y0, 0, H); g.addColorStop(0, vary(base, -0.2)); g.addColorStop(1, vary(base, 0.06));
  ctx.fillStyle = g; ctx.fillRect(-200, y0, W + 400, H - y0 + 200);
  ctx.save(); ctx.filter = 'blur(6px)'; for (let i = 0; i < 30; i++) { ctx.fillStyle = R(k, i + 800) > 0.5 ? 'rgba(0,0,0,0.18)' : 'rgba(255,230,190,0.05)'; ctx.beginPath(); ctx.ellipse(R(k, i + 801) * W, y0 + 20 + R(k, i + 802) * (H - y0), 60 + R(k, i) * 120, 10 + R(k, i + 3) * 18, 0, 0, Math.PI * 2); ctx.fill(); } ctx.restore();
  ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(-200, y0, W + 400, 10);
  for (let i = 0; i < 40; i++) { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.arc(R(k, i + 850) * W, y0 + 30 + R(k, i + 851) * (H - y0 - 30), 2 + R(k, i) * 3, 0, Math.PI * 2); ctx.fill(); }
}
// Rổ rá treo vách.
function basket(k, x, y, r, base = '#9a7a46') {
  const { ctx } = k;
  ctx.fillStyle = base; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(40,25,10,0.5)'; ctx.lineWidth = 1.5; for (let i = -r; i < r; i += 7) { ctx.beginPath(); ctx.moveTo(x + i, y - Math.sqrt(r * r - i * i)); ctx.lineTo(x + i, y + Math.sqrt(r * r - i * i)); ctx.stroke(); }
  for (let j = -r; j < r; j += 7) { ctx.beginPath(); ctx.moveTo(x - Math.sqrt(r * r - j * j), y + j); ctx.lineTo(x + Math.sqrt(r * r - j * j), y + j); ctx.stroke(); }
  ctx.strokeStyle = '#4a3a20'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x, y - r - 30); ctx.stroke();
}
function woodStack(k, x, y, w, n = 6) {
  const { ctx } = k;
  for (let r = 0; r < n; r++) for (let i = 0; i < 5 - (r % 2); i++) {
    const cx = x + i * (w / 5) + (r % 2) * (w / 10), cy = y - r * 22;
    ctx.fillStyle = vary('#6a4a2a', (R(k, r * 7 + i) - 0.5) * 0.3); ctx.strokeStyle = INK; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cx, cy, w / 11, 11, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(40,25,10,0.5)'; ctx.beginPath(); ctx.ellipse(cx, cy, w / 22, 5, 0, 0, Math.PI * 2); ctx.stroke();
  }
}
// Khói / hương bay (động).
function smoke(k, x, y, n = 3, a = 0.22, spread = 3) {
  const { ctx } = k, t = T(k);
  ctx.save(); ctx.filter = 'blur(4px)';
  for (let i = 0; i < n; i++) { ctx.globalAlpha = a; ctx.strokeStyle = '#d8dde3'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x + i * 6, y); for (let j = 1; j < 16; j++) ctx.lineTo(x + i * 6 + Math.sin(t * 1.1 + j * 0.5 + i) * j * spread, y - j * 22); ctx.stroke(); }
  ctx.restore();
}

// ---------- BẾP ----------
// o.fire 0..1, o.bowl (true | {empty, full, cold} | false), o.ash 0..1. Mốc như kitchen() cũ: lửa x 520, chum 1230, xó 1380–1760, sàn 900.
export const KITCHEN_HD = { fire: { x: 520, y: 760, r: 640, flicker: 1, warm: 1 }, xo: { x: 1560, y: 830, r: 260 } };
export function kitchenHD(k, o = {}) {
  const { ctx } = k;
  cached(k, `kitchen|${k.W}`, () => { const ctx = k.ctx;
    mudWall(k, -200, 120, k.W + 400, 780, '#6a5238', 101);
    // vết khói ám phía trên bếp
    ctx.save(); ctx.filter = 'blur(30px)'; ctx.fillStyle = 'rgba(10,8,6,0.55)'; ctx.beginPath(); ctx.ellipse(520, 300, 260, 260, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    // góc nhà tối
    ctx.fillStyle = 'rgba(20,14,8,0.55)'; ctx.fillRect(1760, 120, 400, 780);
    ctx.strokeStyle = '#1a120a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1760, 120); ctx.lineTo(1760, 900); ctx.stroke();
    rafters(k, 0, 140);
    dirtFloor(k, 900);
    // gác bếp: thanh tre + nồi niêu, rổ rá
    ctx.fillStyle = '#4a3a22'; ctx.fillRect(330, 360, 420, 14); ctx.fillRect(330, 372, 14, 60); ctx.fillRect(736, 372, 14, 60);
    for (let i = 0; i < 4; i++) { ctx.fillStyle = vary('#2a2420', (R(k, i) - 0.5) * 0.3); ctx.beginPath(); ctx.ellipse(380 + i * 95, 345, 36, 20, 0, Math.PI, 0); ctx.fill(); }
    basket(k, 860, 420, 46); basket(k, 980, 470, 34, '#8a6a3a'); basket(k, 1080, 410, 40);
    // đống rạ + củi
    ctx.save(); ctx.translate(0, 0);
    for (let i = 0; i < 300; i++) { ctx.strokeStyle = vary('#a88a50', (R(k, i + 1300) - 0.5) * 0.5); ctx.lineWidth = 1.4; const x = 70 + R(k, i + 1301) * 260, yy = 900 - R(k, i + 1302) * 170 * (1 - Math.abs(x - 200) / 180); ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + 20, yy + 18); ctx.stroke(); }
    ctx.restore();
    woodStack(k, 1000, 890, 200, 3);
    // xó tối sau chum
    const g = ctx.createRadialGradient(1570, 780, 20, 1570, 780, 330); g.addColorStop(0, 'rgba(5,4,3,0.7)'); g.addColorStop(1, 'rgba(5,4,3,0)'); ctx.fillStyle = g; ctx.fillRect(1240, 450, 660, 460);
    urnJar(k, 1230, 904, 340, '#5e3d24');
    ctx.fillStyle = '#7a5a36'; ctx.beginPath(); ctx.ellipse(1230, 566, 108, 16, 0, 0, Math.PI * 2); ctx.fill();
  });
  const ash = o.ash ?? 1;
  if (ash > 0) { ctx.save(); ctx.globalAlpha = ash; ctx.fillStyle = '#5f5853'; ctx.beginPath(); ctx.moveTo(1380, 906); ctx.quadraticCurveTo(1450, 860, 1600, 866); ctx.quadraticCurveTo(1720, 870, 1762, 840); ctx.lineTo(1762, 906); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#7a736c'; for (let i = 0; i < 24; i++) { ctx.beginPath(); ctx.arc(1400 + R(k, i + 60) * 350, 892 - R(k, i + 61) * 26, 3 + R(k, i) * 4, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); }
  if (o.bowl !== false) bowl(k, 1540, 894, 0.95, typeof o.bowl === 'object' ? o.bowl : {});
  hearth(k, 520, 900, 1, o.fire ?? 1);
  if ((o.fire ?? 1) > 0.2) smoke(k, 520, 680, 3, 0.15 * (o.fire ?? 1), 4);
}

// ---------- GIAN THỜ ----------
export const ALTAR_HD = { candles: [{ x: 780, y: 470 }, { x: 1140, y: 470 }], floor: 900 };
export function altarRoomHD(k, o = {}, photo) {
  const { ctx, W } = k, t = T(k);
  cached(k, `altar|${W}`, () => { const ctx = k.ctx;
    // vách ván gỗ sẫm
    for (let i = 0; i < 16; i++) { const x = -200 + i * 150; ctx.fillStyle = vary('#3e2618', (R(k, i + 2000) - 0.5) * 0.18); ctx.fillRect(x, -200, 148, 1100); ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 1.2; for (let j = 0; j < 5; j++) { ctx.beginPath(); ctx.moveTo(x + 20 + j * 26, -200); for (let y = -200; y < 900; y += 40) ctx.lineTo(x + 20 + j * 26 + Math.sin(y / 60 + j + i) * 3, y); ctx.stroke(); } }
    // hoành phi + câu đối sơn son thếp vàng
    ctx.fillStyle = '#5a140e'; ctx.fillRect(640, 110, 640, 110); ctx.strokeStyle = '#c9a03a'; ctx.lineWidth = 5; ctx.strokeRect(652, 122, 616, 86);
    k.text('福 祿 壽', 960, 168, { size: 50, color: '#d8b04a', font: 'title' });
    for (const cx of [560, 1360]) { ctx.fillStyle = '#5a140e'; ctx.fillRect(cx - 34, 240, 68, 520); ctx.strokeStyle = '#c9a03a'; ctx.lineWidth = 4; ctx.strokeRect(cx - 28, 246, 56, 508); for (let j = 0; j < 7; j++) k.text('◆', cx, 290 + j * 68, { size: 22, color: '#c9a03a' }); }
    // bàn thờ chạm
    ctx.fillStyle = '#6a1c12'; ctx.fillRect(610, 556, 700, 44); ctx.fillStyle = '#c9a03a'; ctx.fillRect(610, 596, 700, 6);
    const g = ctx.createLinearGradient(0, 600, 0, 900); g.addColorStop(0, '#5e1c12'); g.addColorStop(1, '#3a0e08'); ctx.fillStyle = g; ctx.fillRect(640, 602, 640, 298);
    ctx.strokeStyle = '#b8902f'; ctx.lineWidth = 3; ctx.strokeRect(670, 630, 580, 240);
    for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(720 + i * 96, 750, 26, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(720 + i * 96, 750, 12, 0, Math.PI * 2); ctx.stroke(); }
    // sàn gạch tàu
    ctx.fillStyle = '#4a2a20'; ctx.fillRect(-200, 900, W + 400, 400);
    for (let r = 0; r < 6; r++) for (let c = -2; c < 24; c++) { const x = c * 90 + (r % 2) * 45, y = 900 + r * 34; ctx.fillStyle = vary('#7a3a28', (R(k, r * 31 + c + 2100) - 0.5) * 0.3 - r * 0.02); ctx.fillRect(x, y, 88, 32); }
    // bát hương + đế
    ctx.fillStyle = '#c9a24a'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(905, 556); ctx.lineTo(1015, 556); ctx.quadraticCurveTo(1010, 514, 960, 512); ctx.quadraticCurveTo(910, 514, 905, 556); ctx.closePath(); ctx.fill(); ctx.stroke();
    for (const cx of [700, 1220]) { ctx.fillStyle = '#c9a24a'; ctx.beginPath(); ctx.ellipse(cx, 552, 34, 8, 0, 0, Math.PI * 2); ctx.fill(); k.text('🍊', cx, 530, { size: 36 }); }
    // khung ảnh thờ
    ctx.fillStyle = '#2a1a10'; ctx.fillRect(884, 322, 152, 192); ctx.strokeStyle = '#c99a3a'; ctx.lineWidth = 6; ctx.strokeRect(884, 322, 152, 192);
    // ánh sáng nến hắt lên vách
    ctx.save(); ctx.globalCompositeOperation = 'soft-light'; const rg = ctx.createRadialGradient(960, 480, 40, 960, 480, 700); rg.addColorStop(0, 'rgba(255,190,110,0.6)'); rg.addColorStop(1, 'rgba(0,0,0,0.5)'); ctx.fillStyle = rg; ctx.fillRect(-200, -200, W + 400, 1500); ctx.restore();
  });
  // ảnh thờ (do video vẽ người trong ảnh)
  ctx.save(); ctx.beginPath(); ctx.rect(892, 330, 136, 176); ctx.clip(); ctx.fillStyle = '#8a8a7a'; ctx.fillRect(892, 330, 136, 176); if (photo) photo(); ctx.restore();
  // gạch thứ ba
  const lift = o.brick ?? 0;
  if (lift > 0) { ctx.fillStyle = '#120806'; ctx.fillRect(864, 934, 88, 30); ctx.save(); ctx.translate(908, 930 - lift * 40); ctx.rotate(-0.3 * lift); ctx.fillStyle = '#8a4a32'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.fillRect(-44, -15, 88, 30); ctx.strokeRect(-44, -15, 88, 30); ctx.restore(); if (lift > 0.5) { ctx.fillStyle = '#c9b07a'; ctx.fillRect(880, 942, 50, 18); } }
  // hương + khói, nến
  for (let i = 0; i < 3; i++) { ctx.strokeStyle = '#b5482c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(945 + i * 15, 514); ctx.lineTo(940 + i * 20, 456); ctx.stroke(); ctx.fillStyle = '#ff8a3a'; ctx.beginPath(); ctx.arc(940 + i * 20, 455, 3, 0, Math.PI * 2); ctx.fill(); }
  smoke(k, 945, 450, 3, 0.2, 2.5);
  for (const c of ALTAR_HD.candles) { ctx.fillStyle = '#efe4cc'; ctx.fillRect(c.x - 12, c.y + 10, 24, 80); ctx.fillStyle = '#c9b8a0'; ctx.fillRect(c.x - 12, c.y + 70, 24, 6); const f = 1 + 0.12 * Math.sin(t * 12 + c.x); ctx.fillStyle = '#ffb340'; ctx.beginPath(); ctx.ellipse(c.x, c.y, 8, 18 * f, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#fff4c8'; ctx.beginPath(); ctx.ellipse(c.x, c.y + 4, 4, 8 * f, 0, 0, Math.PI * 2); ctx.fill(); }
}
export const altarLightsHD = (a = 1) => ALTAR_HD.candles.map((c) => ({ x: c.x, y: c.y, r: 420 * a, flicker: 1, warm: 0.9 }));

// ---------- TRONG NHÀ (ban ngày, cửa sáng) ----------
export const NHA_HD = { door: { x: 1700, y: 420, r: 1000 } };
export function nhaTrongHD(k, o = {}) {
  const { ctx } = k;
  cached(k, `nha|${o.chong !== false}|${k.W}`, () => { const ctx = k.ctx;
    mudWall(k, -200, 100, k.W + 400, 800, '#7a6044', 201);
    rafters(k, 0, 120);
    dirtFloor(k, 900, '#4a3826');
    // cửa: khung gỗ + nắng
    ctx.fillStyle = '#f0d8a0'; ctx.fillRect(1560, 200, 300, 700);
    ctx.save(); ctx.filter = 'blur(2px)'; for (let i = 0; i < 5; i++) { ctx.fillStyle = 'rgba(90,120,70,0.5)'; ctx.beginPath(); ctx.ellipse(1600 + i * 60, 480 + (i % 2) * 40, 50, 120, 0, 0, Math.PI * 2); ctx.fill(); } ctx.restore();
    planks(k, 1490, 200, 70, 700, '#4a3220', 2, 220); ctx.strokeStyle = '#2a1a0c'; ctx.lineWidth = 14; ctx.strokeRect(1560, 200, 300, 700);
    // vệt nắng xiên trên sàn
    ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = 'rgba(255,220,160,0.22)'; ctx.beginPath(); ctx.moveTo(1560, 900); ctx.lineTo(1860, 900); ctx.lineTo(1500, 1080); ctx.lineTo(1050, 1080); ctx.closePath(); ctx.fill(); ctx.restore();
    // nông cụ treo vách
    ctx.strokeStyle = '#5a4026'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(300, 260); ctx.lineTo(260, 620); ctx.stroke(); ctx.fillStyle = '#6a6a6a'; ctx.beginPath(); ctx.moveTo(232, 600); ctx.lineTo(290, 610); ctx.lineTo(282, 660); ctx.lineTo(240, 650); ctx.closePath(); ctx.fill();
    basket(k, 1240, 380, 50); ctx.fillStyle = '#c9b47a'; ctx.beginPath(); ctx.moveTo(1340, 470); ctx.lineTo(1390, 430); ctx.lineTo(1440, 470); ctx.closePath(); ctx.fill();
    if (o.chong !== false) {
      // chõng tre
      ctx.fillStyle = '#a8894f'; ctx.fillRect(500, 752, 600, 34); ctx.strokeStyle = 'rgba(60,40,20,0.6)'; ctx.lineWidth = 2; for (let x = 500; x < 1100; x += 22) { ctx.beginPath(); ctx.moveTo(x, 752); ctx.lineTo(x, 786); ctx.stroke(); }
      for (const lx of [520, 1060]) { ctx.fillStyle = '#7a5a36'; ctx.fillRect(lx, 786, 22, 114); }
      ctx.fillStyle = '#5a6a5a'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1000, 752); ctx.lineTo(1000, 672); ctx.lineTo(1014, 652); ctx.lineTo(1028, 672); ctx.lineTo(1028, 752); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e8e0d4'; ctx.beginPath(); ctx.ellipse(960, 748, 16, 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
  });
  // bụi lơ lửng trong vệt nắng
  const t = T(k); ctx.save(); for (let i = 0; i < 30; i++) { ctx.globalAlpha = 0.35 + 0.3 * Math.sin(t + i); ctx.fillStyle = '#ffe8b8'; ctx.beginPath(); ctx.arc(1200 + ((R(k, i) * 600 + t * 8) % 600), 600 + ((R(k, i + 9) * 400 - t * 6) % 400 + 400) % 400, 1.5 + R(k, i + 3) * 2, 0, Math.PI * 2); ctx.fill(); } ctx.restore();
}

// ---------- ĐẦM SEN ----------
export function lotusHD(k, o = {}) {
  const { ctx, W, H } = k, t = T(k), time = o.time === 'day' ? 'day' : 'dawn';
  cached(k, `lotus|${time}|${W}`, () => { const ctx = k.ctx;
    const g = ctx.createLinearGradient(0, 0, 0, 540); g.addColorStop(0, time === 'day' ? '#8ab4cc' : '#9a8aa0'); g.addColorStop(0.6, time === 'day' ? '#cfe0e0' : '#e0b8a8'); g.addColorStop(1, time === 'day' ? '#eae4d0' : '#f4d4b0');
    ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, 760);
    const sun = ctx.createRadialGradient(1300, 430, 0, 1300, 430, 400); sun.addColorStop(0, 'rgba(255,230,190,0.6)'); sun.addColorStop(1, 'rgba(255,230,190,0)'); ctx.fillStyle = sun; ctx.fillRect(900, 30, 800, 800);
    // làng xa: luỹ tre + mái nhà mờ
    ctx.save(); ctx.filter = 'blur(2px)'; ctx.fillStyle = 'rgba(90,100,90,0.75)';
    for (let i = 0; i < 9; i++) bambooClump(k, 80 + i * 230, 520, 90 + R(k, i + 3000) * 50, 'rgb(96,108,98)', 3000 + i * 7);
    for (let i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(110,100,90,0.8)'; const x = 300 + i * 420; ctx.beginPath(); ctx.moveTo(x - 60, 520); ctx.lineTo(x, 486); ctx.lineTo(x + 60, 520); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    ctx.fillStyle = '#6a7a62'; ctx.fillRect(-200, 515, W + 400, 30);
    // mặt nước phản chiếu trời
    const wg = ctx.createLinearGradient(0, 540, 0, 900); wg.addColorStop(0, time === 'day' ? '#a8c4c8' : '#d8b0a0'); wg.addColorStop(1, '#4a6a6a'); ctx.fillStyle = wg; ctx.fillRect(-200, 540, W + 400, 400);
    // lá sen: gân + mép cong, nhỏ dần về xa
    for (let i = 0; i < 70; i++) {
      const d = R(k, i + 3100), y = 560 + d * d * 320, x = R(k, i + 3101) * (W + 200) - 100, s = 0.35 + d * 0.9;
      ctx.fillStyle = vary('#4f7a46', (R(k, i + 3102) - 0.5) * 0.4); ctx.strokeStyle = 'rgba(30,50,25,0.8)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.ellipse(x, y, 70 * s, 20 * s, 0, 0.15, Math.PI * 2 - 0.15); ctx.lineTo(x, y); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = 'rgba(160,190,120,0.5)'; for (let j = 0; j < 6; j++) { const a = j / 6 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * 60 * s, y + Math.sin(a) * 17 * s); ctx.stroke(); }
      if (R(k, i + 3103) > 0.82) { const fx = x + 20 * s, fy = y - 50 * s; ctx.strokeStyle = '#4a6a3a'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(fx, y); ctx.lineTo(fx, fy); ctx.stroke(); for (let p = 0; p < 5; p++) { ctx.fillStyle = p % 2 ? '#f0b0bc' : '#e48a9c'; ctx.beginPath(); ctx.ellipse(fx + (p - 2) * 7 * s, fy - 6 * s, 9 * s, 20 * s, (p - 2) * 0.35, 0, Math.PI * 2); ctx.fill(); } }
    }
    // bờ cỏ + lau sậy tiền cảnh
    ctx.fillStyle = '#3e4e2a'; ctx.beginPath(); ctx.moveTo(-200, 1300); ctx.lineTo(-200, 880); ctx.quadraticCurveTo(500, 850, 1000, 900); ctx.quadraticCurveTo(1500, 940, W + 200, 920); ctx.lineTo(W + 200, 1300); ctx.closePath(); ctx.fill();
    for (let i = 0; i < 30; i++) grass(k, R(k, i + 3200) * W, 900 + R(k, i + 3201) * 160, 1.2 + R(k, i) * 0.8, vary('#4a5a2a', (R(k, i + 7) - 0.5) * 0.4), i + 3200);
    ctx.save(); ctx.filter = 'blur(2.5px)'; ctx.strokeStyle = '#2a321a'; ctx.lineCap = 'round';
    for (let i = 0; i < 26; i++) { const x = 1650 + i * 12, h = 300 + R(k, i + 3300) * 160; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 1090); ctx.quadraticCurveTo(x + 20, 1090 - h * 0.6, x + 30 + R(k, i) * 40, 1090 - h); ctx.stroke(); ctx.fillStyle = '#5a4a32'; ctx.beginPath(); ctx.ellipse(x + 30 + R(k, i) * 40, 1090 - h, 6, 22, 0.3, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  });
  // gợn nước + sương trôi (động)
  ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 2;
  for (let i = 0; i < 16; i++) { const y = 600 + i * 18, x = ((R(k, i + 3400) * W + t * 12 * (1 + R(k, i))) % (W + 200)) - 100; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 50 + i * 4, y); ctx.stroke(); }
  ctx.filter = 'blur(20px)';
  for (let i = 0; i < 5; i++) { const x = ((i * 420 + t * 14) % (W + 600)) - 300; ctx.fillStyle = 'rgba(245,240,235,0.22)'; ctx.beginPath(); ctx.ellipse(x, 560, 300, 50, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}

// ---------- QUÁN NƯỚC VEN QUỐC LỘ ----------
export function quanHD(k, o = {}, photo) {
  const { ctx, W } = k, t = T(k);
  cached(k, `quan|${W}`, () => { const ctx = k.ctx;
    sky(k, 'day', 600);
    landscape(k, 'day', 640);
    // cột điện + dây
    for (const px of [160, 1820]) { ctx.fillStyle = '#7a7a72'; ctx.fillRect(px, 180, 16, 640); ctx.fillRect(px - 50, 210, 116, 10); }
    ctx.strokeStyle = 'rgba(30,30,30,0.6)'; ctx.lineWidth = 2; for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.moveTo(-200, 230 + j * 12); ctx.quadraticCurveTo(990, 300 + j * 12, 2120, 230 + j * 12); ctx.stroke(); }
    // nhà quán: tường vôi ố + mái tôn
    mudWall(k, 900, 380, 760, 440, '#c8b894', 301);
    ctx.fillStyle = '#8a8a86'; ctx.beginPath(); ctx.moveTo(840, 400); ctx.lineTo(1280, 290); ctx.lineTo(1720, 400); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(40,40,40,0.4)'; ctx.lineWidth = 2; for (let x = 860; x < 1700; x += 26) { ctx.beginPath(); ctx.moveTo(x, 400 - Math.max(0, 110 - Math.abs(x - 1280) * 0.25)); ctx.lineTo(x, 400); ctx.stroke(); }
    ctx.fillStyle = 'rgba(120,60,30,0.35)'; for (let i = 0; i < 6; i++) ctx.fillRect(880 + i * 140, 396, 40, 14);
    // mái bạt che trước quán
    ctx.fillStyle = '#2a6a9a'; ctx.beginPath(); ctx.moveTo(900, 470); ctx.lineTo(1660, 470); ctx.lineTo(1700, 560); ctx.lineTo(860, 560); ctx.closePath(); ctx.fill();
    for (let i = 0; i < 11; i++) { ctx.fillStyle = i % 2 ? '#e8e0d0' : '#2a6a9a'; ctx.beginPath(); ctx.moveTo(860 + i * 76, 560); ctx.lineTo(936 + i * 76, 560); ctx.lineTo(898 + i * 76, 586); ctx.closePath(); ctx.fill(); }
    ctx.fillStyle = '#1a120a'; ctx.fillRect(1110, 600, 180, 220);
    ctx.fillStyle = '#e8dcc0'; ctx.fillRect(960, 410, 220, 54); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.strokeRect(960, 410, 220, 54); k.text('QUÁN NƯỚC', 1070, 440, { size: 26, font: 'title', color: '#8a2a1a' });
    // két nước, chai lọ trên kệ
    for (let i = 0; i < 6; i++) { ctx.fillStyle = ['#c8402a', '#2a7a3a', '#e0b030'][i % 3]; ctx.fillRect(1320 + i * 34, 700, 26, 60); }
    ctx.fillStyle = '#5a4030'; ctx.fillRect(1310, 760, 230, 12);
    // đường nhựa
    ctx.fillStyle = '#5e5e5a'; ctx.fillRect(-200, 820, W + 400, 300);
    for (let i = 0; i < 160; i++) { ctx.fillStyle = R(k, i + 3500) > 0.5 ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.06)'; ctx.fillRect(R(k, i + 3501) * W, 830 + R(k, i + 3502) * 280, 3, 2); }
    ctx.fillStyle = 'rgba(240,240,220,0.75)'; for (let x = -100; x < W + 100; x += 90) ctx.fillRect(x, 958, 50, 6);
    ctx.fillStyle = '#7a6a52'; ctx.fillRect(-200, 812, W + 400, 14);
    // ghế nhựa xanh, bàn
    for (const cx of [700, 820]) { ctx.fillStyle = '#2a7ab0'; ctx.fillRect(cx, 760, 46, 10); ctx.fillRect(cx + 4, 770, 6, 50); ctx.fillRect(cx + 36, 770, 6, 50); ctx.fillRect(cx, 720, 8, 40); }
    ctx.fillStyle = '#c8402a'; ctx.fillRect(740, 740, 130, 12); ctx.fillRect(750, 752, 8, 66); ctx.fillRect(852, 752, 8, 66);
    // cây bàng: thân + tầng lá lớn
    ctx.fillStyle = '#4a3424'; ctx.beginPath(); ctx.moveTo(500, 830); ctx.lineTo(520, 400); ctx.lineTo(560, 400); ctx.lineTo(585, 830); ctx.closePath(); ctx.fill();
    for (const ly of [400, 300, 210]) { ctx.strokeStyle = '#4a3424'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(540, ly + 30); ctx.lineTo(250, ly + 10); ctx.moveTo(540, ly + 30); ctx.lineTo(830, ly + 10); ctx.stroke(); }
    for (let i = 0; i < 150; i++) { const tier = i % 3, ly = [395, 295, 205][tier], x = 540 + (R(k, i + 3600) - 0.5) * (620 - tier * 120), y = ly + (R(k, i + 3601) - 0.5) * 50; ctx.fillStyle = R(k, i + 3602) > 0.88 ? '#b8482a' : vary('#4a7a3a', (R(k, i + 3603) - 0.4) * 0.4); ctx.beginPath(); ctx.ellipse(x, y, 24, 14, R(k, i) * 3, 0, Math.PI * 2); ctx.fill(); }
  });
  if (o.photo) { ctx.fillStyle = '#2a1a10'; ctx.fillRect(1420, 600, 110, 140); ctx.strokeStyle = '#c99a3a'; ctx.lineWidth = 4; ctx.strokeRect(1420, 600, 110, 140); ctx.save(); ctx.beginPath(); ctx.rect(1426, 606, 98, 128); ctx.clip(); ctx.fillStyle = '#b8b0a0'; ctx.fillRect(1426, 606, 98, 128); if (photo) photo(); ctx.restore(); }
  // lá bàng rơi
  for (let i = 0; i < 4; i++) { const x = 300 + i * 160 + Math.sin(t * 0.7 + i) * 40, y = ((t * 40 + i * 230) % 700) + 200; ctx.fillStyle = i % 2 ? '#b8482a' : '#c8a040'; ctx.beginPath(); ctx.ellipse(x, y, 10, 6, t + i, 0, Math.PI * 2); ctx.fill(); }
}

// ---------- QUỐC LỘ ----------
export function highwayHD(k, o = {}) {
  const { ctx, W } = k, time = o.time === 'dusk' ? 'dusk' : 'day';
  cached(k, `hw|${time}|${!!o.sign}|${W}`, () => { const ctx = k.ctx;
    sky(k, time, 640);
    landscape(k, time, 660);
    // ruộng lúa hai bên + bờ
    ctx.fillStyle = time === 'dusk' ? '#3a4a2a' : '#7a9a4a'; ctx.fillRect(-200, 680, W + 400, 100);
    ctx.strokeStyle = time === 'dusk' ? 'rgba(20,30,10,0.5)' : 'rgba(60,90,30,0.5)'; ctx.lineWidth = 2; for (let y = 690; y < 780; y += 12) { ctx.beginPath(); ctx.moveTo(-200, y); ctx.lineTo(W + 200, y); ctx.stroke(); }
    // hàng cây ven đường
    for (let i = 0; i < 8; i++) { const x = 80 + i * 260; ctx.fillStyle = time === 'dusk' ? '#2a2a24' : '#4a3a2a'; ctx.fillRect(x - 6, 620, 12, 150); ctx.fillStyle = vary(time === 'dusk' ? '#24302a' : '#3e6a3a', (R(k, i + 3700) - 0.5) * 0.3); ctx.beginPath(); ctx.ellipse(x, 600, 60, 70, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.beginPath(); ctx.ellipse(x + 20, 580, 30, 34, 0, 0, Math.PI * 2); ctx.fill(); }
    // cột cây số
    ctx.fillStyle = '#efe8dc'; ctx.fillRect(300, 720, 46, 60); ctx.fillStyle = '#c8402a'; ctx.beginPath(); ctx.arc(323, 720, 23, Math.PI, 0); ctx.fill(); k.text('BL 12', 323, 752, { size: 14, font: 'title', color: '#222' });
    // mặt đường
    ctx.fillStyle = '#5a5a56'; ctx.fillRect(-200, 780, W + 400, 380);
    for (let i = 0; i < 200; i++) { ctx.fillStyle = R(k, i + 3800) > 0.5 ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.05)'; ctx.fillRect(R(k, i + 3801) * W, 790 + R(k, i + 3802) * 360, 3, 2); }
    ctx.fillStyle = 'rgba(240,240,220,0.7)'; for (let x = -100; x < W + 100; x += 110) ctx.fillRect(x, 905, 60, 7);
    ctx.fillStyle = '#7a6a52'; ctx.fillRect(-200, 772, W + 400, 12);
    if (o.sign) { ctx.fillStyle = '#2a5a8a'; ctx.strokeStyle = '#efe4cc'; ctx.lineWidth = 4; ctx.fillRect(1500, 470, 300, 110); ctx.strokeRect(1500, 470, 300, 110); k.text('THỊ TRẤN', 1650, 505, { size: 30, font: 'title', color: '#fff' }); k.text('BA LĂNG', 1650, 550, { size: 40, font: 'title', color: '#fff' }); ctx.fillStyle = '#5a5a5a'; ctx.fillRect(1640, 580, 16, 200); }
    if (time === 'dusk') { ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.fillStyle = 'rgba(255,150,90,0.4)'; ctx.fillRect(0, 0, W, 1080); ctx.restore(); }
  });
}

// ---------- ĐÈO ĐÊM ----------
export function passHD(k, o = {}) {
  const { ctx, W, H } = k;
  cached(k, `pass|${W}`, () => { const ctx = k.ctx;
    const g = ctx.createLinearGradient(0, 0, 0, 800); g.addColorStop(0, '#04060c'); g.addColorStop(1, '#141c2a'); ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400);
    // ba lớp núi, đá
    const layer = (y, amp, c, seed, rock) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(-200, 1300); for (let x = -200; x <= W + 200; x += 30) ctx.lineTo(x, y - amp * Math.abs(Math.sin(x / 260 + seed)) - amp * 0.3 * Math.sin(x / 70 + seed * 2)); ctx.lineTo(W + 200, 1300); ctx.closePath(); ctx.fill(); if (rock) for (let i = 0; i < 40; i++) { ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 2; const x = R(k, seed * 50 + i) * W, yy = y + R(k, seed * 50 + i + 9) * 300; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + 30, yy + 40); ctx.stroke(); } };
    ctx.save(); ctx.filter = 'blur(2px)'; layer(380, 160, '#121a26', 1, false); ctx.restore();
    layer(520, 180, '#0d131c', 2, true);
    // đường đèo + cột tiêu
    ctx.fillStyle = '#26262a'; ctx.beginPath(); ctx.moveTo(-200, 820); ctx.quadraticCurveTo(700, 700, 1300, 760); ctx.quadraticCurveTo(1600, 790, 1700, 900); ctx.lineTo(1500, 960); ctx.quadraticCurveTo(1300, 860, 900, 860); ctx.quadraticCurveTo(300, 880, -200, 980); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(240,240,220,0.35)'; ctx.setLineDash([30, 30]); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-200, 900); ctx.quadraticCurveTo(700, 780, 1300, 810); ctx.stroke(); ctx.setLineDash([]);
    for (let i = 0; i < 9; i++) { const u = i / 8, x = k.lerp(-100, 1480, u), y = 980 - 160 * Math.sin(u * 2.2) + (u > 0.7 ? 60 : 0); ctx.fillStyle = '#d8d8d0'; ctx.fillRect(x, y - 44, 10, 44); ctx.fillStyle = '#c8402a'; ctx.fillRect(x, y - 44, 10, 10); }
    ctx.fillStyle = '#030406'; ctx.beginPath(); ctx.moveTo(1500, 960); ctx.lineTo(W + 200, 880); ctx.lineTo(W + 200, 1300); ctx.lineTo(1300, 1300); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.filter = 'blur(24px)'; ctx.fillStyle = 'rgba(120,130,150,0.18)'; ctx.beginPath(); ctx.ellipse(1700, 1000, 400, 80, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  });
  if (o.rain) k.rain(0, 0, W, H);
}
