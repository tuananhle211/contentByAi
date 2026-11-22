// Các mẫu thumbnail cho tập 1 (render: node scripts/thumbs.mjs 003-thanh-giong-co-that-khong).
// Mẫu được chọn dùng làm thumbnail chính trong video.js.
import { C } from '/engine/kit.js';

function sky(k, stops) {
  const g = k.ctx.createLinearGradient(0, 0, 0, k.H);
  stops.forEach(([at, c]) => g.addColorStop(at, c));
  k.ctx.fillStyle = g;
  k.ctx.fillRect(0, 0, k.W, k.H);
}
function glow(k, x, y, r, color) {
  const g = k.ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)');
  k.ctx.fillStyle = g;
  k.ctx.fillRect(x - r, y - r, r * 2, r * 2);
}
function vignette(k, a = 0.55) {
  const g = k.ctx.createRadialGradient(k.W / 2, k.H / 2, k.H * 0.4, k.W / 2, k.H / 2, k.W * 0.75);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`);
  k.ctx.fillStyle = g;
  k.ctx.fillRect(0, 0, k.W, k.H);
}
// Vẽ kèm quầng sáng quanh nét (tách nhân vật khỏi nền).
function lit(k, color, blur, fn) {
  k.ctx.save();
  k.ctx.shadowColor = color; k.ctx.shadowBlur = blur;
  fn();
  k.ctx.restore();
}
function riding(k, x, y, size, o = {}) {
  k.icon('horse', x, y, size, { fire: o.fire ?? 0 });
  k.icon('warrior', x - size * 0.06, y - size * 0.5, size * 0.62, { rod: o.rod });
}
// Mắt + lông mày giận dữ cho mặt tròn tâm (x, y), bán kính r.
function angry(k, x, y, r) {
  for (const d of [-1, 1]) {
    k.line(x + d * r * 0.18, y - r * 0.32, x + d * r * 0.62, y - r * 0.5, { width: r * 0.13, seed: 60 + d });
    k.dot(x + d * r * 0.38, y - r * 0.12, r * 0.11, C.ink);
  }
  k.curve([[x - r * 0.3, y + r * 0.42], [x, y + r * 0.3], [x + r * 0.3, y + r * 0.42]], { width: r * 0.09, seed: 63 });
}
function big(k, str, x, y, size, color, o = {}) {
  return k.text(str, x, y, { size, font: 'title', color, outline: C.ink, outlineWidth: size * 0.17, ...o });
}
function stamp(k, str, x, y, r, size = 84) {
  k.group({ x, y, r }, () => {
    const b = k.text(str, 0, 6, { size, font: 'title', color: C.white, outline: '#9e1b10', outlineWidth: size * 0.12 });
    k.rect(-b.w / 2 - 34, -b.h / 2 - 14, b.w + 68, b.h + 28, { fill: '#d63a26', fillStyle: 'solid', stroke: C.white, width: 8, rough: 1.6, seed: 31 });
    k.text(str, 0, 6, { size, font: 'title', color: C.white });
  });
}

// A — Kịch tính: Gióng khổng lồ giữa trời lửa, giặc tí hon tháo chạy.
export function a(k) {
  sky(k, [[0, '#2a0c0c'], [0.55, '#a8321f'], [0.8, '#f08a24'], [1, '#f6c344']]);
  glow(k, 560, 640, 620, 'rgba(255,214,120,0.85)');
  k.rect(-60, 930, k.W + 120, 220, { fill: '#2a1712', fillStyle: 'solid', stroke: 'none', seed: 3 });
  for (let i = 0; i < 6; i++) k.icon('soldier', 1000 + i * 70, 905 - (i % 2) * 14, 110, { rotate: i % 2 ? 0.7 : -0.4, fill: '#3a3f47' });
  [120, 230].forEach((x, i) => k.icon('house', x, 890, 120 - i * 20, {}));
  lit(k, 'rgba(255,240,180,0.95)', 50, () => k.icon('warrior', 560, 586, 720, {}));
  angry(k, 560, 586 - 46 * 7.2, 14 * 7.2);
  vignette(k, 0.6);
  big(k, 'THÁNH GIÓNG', 1430, 300, 130, C.white);
  big(k, 'CÓ THẬT?', 1430, 520, 220, C.yellow);
  k.arrow(1180, 740, 900, 640, { stroke: C.white, width: 14, head: 46, bend: -0.25, seed: 41 });
}

// B — Tò mò: ngựa sắt phun lửa… nhưng thời đó chưa có sắt.
export function b(k) {
  sky(k, [[0, '#1d2a3a'], [0.6, '#3e5068'], [1, '#c96a2b']]);
  glow(k, 1180, 470, 520, 'rgba(255,150,60,0.75)');
  k.rect(-60, 940, k.W + 120, 200, { fill: '#2a2620', fillStyle: 'solid', stroke: 'none', seed: 3 });
  lit(k, 'rgba(255,200,120,0.9)', 40, () => riding(k, 620, 600, 640, { fire: 1 }));
  angry(k, 620 - 640 * 0.06, 600 - 640 * 0.5 - 46 * 3.97, 14 * 3.97);
  vignette(k, 0.5);
  big(k, 'NGỰA SẮT?', 1390, 220, 165, C.yellow);
  stamp(k, 'THỜI ĐÓ CHƯA CÓ SẮT!', 1360, 820, -0.06, 78);
}

// C — Tò mò: truyền thuyết đối chất với sử sách.
export function c(k) {
  k.ctx.fillStyle = '#f1d9a8'; k.ctx.fillRect(0, 0, k.W, k.H);
  k.ctx.save();
  k.ctx.beginPath(); k.ctx.moveTo(0, 0); k.ctx.lineTo(1060, 0); k.ctx.lineTo(860, k.H); k.ctx.lineTo(0, k.H); k.ctx.closePath(); k.ctx.clip();
  sky(k, [[0, '#7a1d12'], [0.7, '#e4572e'], [1, '#f6c344']]);
  glow(k, 460, 520, 460, 'rgba(255,220,140,0.8)');
  k.ctx.restore();
  k.line(1060, -20, 860, k.H + 20, { width: 14, stroke: C.ink, rough: 1.5, seed: 5 });
  lit(k, 'rgba(255,240,180,0.9)', 36, () => riding(k, 460, 640, 560, { fire: 0.9 }));
  k.icon('scroll', 1390, 560, 520, {});
  k.group({ x: 1600, y: 690, r: 0.6 }, () => {
    k.circle(0, -90, 90, { width: 14, fill: 'rgba(200,230,255,0.35)', fillStyle: 'solid', seed: 6 });
    k.line(0, 0, 0, 150, { width: 26, stroke: C.brown, seed: 7 });
  });
  big(k, 'TRUYỀN THUYẾT', 480, 120, 100, C.white);
  big(k, 'SỬ SÁCH', 1460, 120, 110, C.white);
  stamp(k, '3 ĐIỂM VÔ LÝ', 960, 930, -0.08, 110);
}
