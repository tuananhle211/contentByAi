// Thumbnail "Nếu Bạn Là" — gây tò mò + đánh vào thị giác:
// 1 điểm nhìn lớn (mặt cảm xúc cực mạnh ~ nửa khung), khoảng trống tò mò (không lặp tiêu đề),
// nền tia màu đậm, nhân vật viền trắng kiểu sticker, vòng/mũi tên đỏ, chữ ≤ 3 từ cực to.
import { soDo } from '/channel/drama.js';
import { TOAN, LUU, HO, phone, zena, sash, cash, gold } from '/channel/neu-ban-la.js';
export const style = 'clean';

// Nền tia sáng toả từ (cx, cy).
function rays(k, c1, c2, cx = 960, cy = 540, n = 28) {
  const { ctx } = k;
  ctx.fillStyle = c1; ctx.fillRect(0, 0, 1920, 1080);
  ctx.fillStyle = c2;
  for (let i = 0; i < n; i += 2) { const a0 = (i / n) * Math.PI * 2, a1 = ((i + 1) / n) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, 2400, a0, a1); ctx.closePath(); ctx.fill(); }
  const g = ctx.createRadialGradient(cx, cy, 200, cx, cy, 1300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080);
}
// Viền trắng dày quanh mọi thứ vẽ trong draw() (kiểu sticker) + bóng đổ.
function sticker(k, draw, w = 16) {
  const { ctx } = k;
  ctx.save(); ctx.filter = 'brightness(0) invert(1)';
  for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; ctx.save(); ctx.translate(Math.cos(a) * w, Math.sin(a) * w); draw(); ctx.restore(); }
  ctx.restore();
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12; draw(); ctx.restore();
}
// Chữ cực to: viền đen dày + nền khối màu tuỳ chọn.
function big(k, text, x, y, size, color, o = {}) {
  k.group({ x, y, r: o.r ?? -0.04 }, () => {
    if (o.box) { const { ctx } = k; ctx.font = `800 ${size}px "Be Vietnam Pro"`; const w = ctx.measureText(text).width; ctx.fillStyle = o.box; ctx.beginPath(); ctx.roundRect(-w / 2 - 30, -size * 0.62, w + 60, size * 1.2, 18); ctx.fill(); }
    k.text(text, 0, 0, { size, font: 'title', color, outline: o.outline ?? '#14161d', outlineWidth: o.ow ?? 22 });
  });
}
function redCircle(k, x, y, rx, ry) { const { ctx } = k; ctx.save(); ctx.strokeStyle = '#ff2a2a'; ctx.lineWidth = 16; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, -0.1, 0.2, Math.PI * 2.05); ctx.stroke(); ctx.restore(); }
function arrow(k, x1, y1, x2, y2) { k.arrow(x1, y1, x2, y2, { width: 26, head: 70, stroke: '#ff2a2a', bend: 0.2, rough: 0.6, seed: 9 }); }

// A — TRƯỚC / SAU: xe ôm 320K → Leader 7 sao giữa mưa tiền. Câu chốt: "XEM VIDEO 1 PHÚT / THÀNH LEADER 7 SAO?!"
export function a(k) {
  const { ctx } = k;
  rays(k, '#ffcc1a', '#ffe066', 1450, 520);
  // nửa trái tối, chéo
  ctx.save(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(820, 0); ctx.lineTo(640, 1080); ctx.lineTo(0, 1080); ctx.closePath(); ctx.clip();
  rays(k, '#2b3a55', '#334666', 330, 600); ctx.restore();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(820, 0); ctx.lineTo(640, 1080); ctx.stroke();
  sticker(k, () => k.char(340, 1250, 900, { ...TOAN, face: 'cry', tears: 1, pose: 'shrug', gloom: 0.5, shadow: false }), 12);
  big(k, '320K', 340, 150, 120, '#ff6b5a', { r: 0.03 });
  for (let i = 0; i < 14; i++) cash(k, 900 + ((i * 197) % 1000), 80 + ((i * 131) % 900), 1, 0.9, 1);
  sticker(k, () => { k.char(1380, 1300, 1150, { ...TOAN, hat: null, color: '#1b2338', tie: '#f2c230', chain: 'big', shades: true, face: 'laugh', pose: 'cheer', shadow: false }); sash(k, 1380, 1300, 1150); }, 14);
  big(k, 'XEM VIDEO 1 PHÚT', 980, 800, 118, '#ffffff', { r: -0.03 });
  big(k, 'THÀNH LEADER 7 SAO?!', 980, 955, 118, '#ffe066', { box: '#ff2a2a', r: -0.03 });
}

// B — Mẹ vợ dữ dằn giơ sổ đỏ: "BÁN ĐẤT?!"
export function b(k) {
  rays(k, '#c0262b', '#e0393e', 760, 500);
  sticker(k, () => k.char(760, 1560, 1500, { ...LUU, face: 'angry', vein: true, flush: 0.6, pose: 'point', shadow: false }), 16);
  sticker(k, () => soDo(k, 1200, 690, 1.7, -0.18), 14);
  redCircle(k, 1200, 690, 270, 185);
  sticker(k, () => k.char(1700, 1240, 640, { ...TOAN, face: 'shock', sweat: true, pose: 'shrug', shadow: false }), 10);
  k.sweat(1770, 820, 2.2, { p: 1 });
  big(k, 'MẸ VỢ BÁN ĐẤT', 1340, 130, 112, '#ffe066', { r: -0.04 });
  big(k, 'ĐỂ NẠP APP AI?!', 1340, 285, 112, '#ffffff', { box: '#14161d', r: -0.04 });
}

// C — Toàn gào thét cạnh điện thoại khổng lồ "Đang xử lý…", họ hàng giận dữ phía sau.
export function c(k) {
  rays(k, '#1b1f3a', '#262c52', 1300, 520);
  // đám họ hàng giận dữ (mờ phía sau)
  for (let i = 0; i < 9; i++) k.char(120 + i * 210, 1080, 430, { ...HO(['#3d7fc1', '#f29bb8', '#6bb56b', '#8a8f98', '#e8b84a'][i % 5], { hair: ['short', 'bun', 'spiky', 'bald'][i % 4], body: i % 4 === 1 ? 'chibiGirl' : 'chibi' }), face: 'shout', vein: true, pose: 'shout', shadow: false, alpha: 0.55 });
  sticker(k, () => phone(k, 1380, 400, 1.2, { r: 0.1, screen: (kk, w, h) => {
    zena('withdraw', { amt: '1.500.000đ' })(kk, w, h);
    const { ctx } = kk; ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.lineWidth = 4; ctx.beginPath();
    for (const [x1, y1, x2, y2] of [[-40, -60, 120, -260], [-40, -60, -150, 120], [-40, -60, 140, 200], [-40, -60, -150, -180], [60, 60, 150, 90]]) { ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); }
    ctx.stroke();
  } }), 14);
  sticker(k, () => k.char(560, 1500, 1400, { ...TOAN, face: 'shock', vein: true, flush: 0.5, tears: 0.6, pose: 'shout', sweat: true, shadow: false }), 16);
  arrow(k, 980, 200, 1180, 330);
  big(k, 'CẢ HỌ NẠP 1,2 TỶ', 1200, 810, 98, '#ffe066', { r: 0.03 });
  big(k, 'APP BÁO: ĐANG XỬ LÝ…', 1200, 950, 98, '#ffffff', { box: '#ff2a2a', r: 0.03 });
}
