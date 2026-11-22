// Thumbnail tập 010 (render: node scripts/thumbs.mjs 010-ma-co-that-khong). Mẫu chính: a.
export const style = 'clean';
const big = (k, s, x, y, size, color, o = {}) => k.text(s, x, y, { size, font: 'title', color, outline: '#0d0d14', outlineWidth: size * 0.17, ...o });
function shadowMan(k, x, y, h) {
  const { ctx } = k;
  ctx.save(); ctx.fillStyle = '#05060b';
  ctx.beginPath(); ctx.arc(x, y - h * 0.86, h * 0.12, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - h * 0.16, y - h * 0.72); ctx.quadraticCurveTo(x - h * 0.28, y - h * 0.3, x - h * 0.22, y);
  ctx.lineTo(x + h * 0.22, y); ctx.quadraticCurveTo(x + h * 0.28, y - h * 0.3, x + h * 0.16, y - h * 0.72); ctx.closePath(); ctx.fill();
  ctx.restore();
  k.glowEyes(x, y - h * 0.86, h / 300, '#ff4d4d');
}
function room(k) {
  const { ctx } = k;
  ctx.fillStyle = '#232a40'; ctx.fillRect(0, 0, k.W, k.H);
  ctx.fillStyle = '#181d2e'; ctx.fillRect(0, 780, k.W, 300);
}
function sleeper(k, x, y, s, mood) {
  k.rect(x - 380 * s, y - 40 * s, 760 * s, 80 * s, { fill: '#7a4e2d', width: 4 });
  k.ellipse(x - 290 * s, y - 70 * s, 180 * s, 70 * s, { fill: '#f2efe6', width: 4 });
  k.group({ x: x + 260 * s, y: y - 90 * s, r: -Math.PI / 2 }, () => k.char(0, 0, 500 * s, { body: 'man', outfit: 'tunic', color: '#2e86de', color2: '#f6c344', hair: 'short', face: mood, pose: 'stand', shadow: false }));
  k.rect(x - 150 * s, y - 125 * s, 450 * s, 90 * s, { fill: '#5b7bd5', width: 4 });
}

// A — Bóng đen đứng cạnh giường: "MA CÓ THẬT KHÔNG?"
export function a(k) {
  room(k);
  sleeper(k, 560, 860, 1, 'shock');
  shadowMan(k, 1050, 900, 700);
  k.darkness(0.45, [{ x: 560, y: 700, r: 420 }, { x: 1050, y: 400, r: 320 }]);
  big(k, 'MA', 1520, 300, 220, '#fff3c4');
  big(k, 'CÓ THẬT', 1520, 520, 140, '#e4572e');
  big(k, 'KHÔNG?', 1520, 690, 140, '#e4572e');
}

// B — Bóng đè.
export function b(k) {
  room(k);
  sleeper(k, 820, 880, 1.2, 'shock');
  shadowMan(k, 760, 720, 420);
  k.darkness(0.45, [{ x: 760, y: 600, r: 520 }]);
  big(k, 'BÓNG ĐÈ', 960, 190, 190, '#fff3c4');
  big(k, 'là gì?', 1640, 420, 120, '#e4572e');
}

// C — Ma trơi trên nghĩa địa.
export function c(k) {
  k.backdrop('night', { ground: 880 });
  k.prop('moon', 1650, 180, 260);
  const { ctx } = k;
  for (const [x, y, s] of [[420, 620, 2.2], [760, 520, 1.6], [1080, 640, 2]]) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, 70 * s);
    g.addColorStop(0, 'rgba(210,255,255,0.95)'); g.addColorStop(0.3, 'rgba(120,230,255,0.6)'); g.addColorStop(1, 'rgba(80,200,255,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 70 * s, 0, Math.PI * 2); ctx.fill();
  }
  for (let i = 0; i < 4; i++) { k.ellipse(300 + i * 360, 860, 220, 70, { fill: '#4a4036', width: 3 }); k.rect(270 + i * 360, 740, 60, 100, { fill: '#8a8f99', width: 3 }); }
  k.darkness(0.4, [{ x: 760, y: 600, r: 700 }, { x: 1650, y: 180, r: 400 }]);
  big(k, 'MA TRƠI', 1450, 420, 170, '#9fe8c8');
  big(k, 'CÓ THẬT?', 1450, 600, 130, '#fff3c4');
}
