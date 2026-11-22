// Thumbnail tập 013 (render: node scripts/thumbs.mjs 013-what-ancient-humans-ate). Mẫu chính: a.
// Bản 03/11: vật chính to + mặt cận cảnh + vòng/mũi tên đỏ; chữ bổ sung cho tiêu đề, không lặp lại.
export const style = 'clean';
import { P, YOU, tRays, tText, tTag, tRing, tArrow, tBust } from '/channel/long-story-drawn.js';

// A — Chim dẫn mật to giữa khung, mũi tên tới tổ ong: "FOLLOW THIS BIRD"
export function a(k) {
  tRays(k, 1000, 500, P.sky, '#93c2dd');
  k.ctx.fillStyle = P.sand; k.ctx.fillRect(0, 960, k.W, 120);
  k.prop('acacia', 1560, 700, 820);
  k.prop('beehive', 1600, 470, 330);
  tRing(k, 1600, 480, 190, 210, { rotate: 0.05 });
  k.prop('bird', 880, 640, 820, { fly: true });
  tArrow(k, 1210, 560, 1400, 500);
  tBust(k, 250, 870, 140, YOU, { face: 'laugh' });
  tText(k, [['FOLLOW', '#fff', 160]], 470, 140); tText(k, [['THIS BIRD', P.yellow, 160]], 600, 310, { maxWidth: 1100 });
}
// B — Cối đá nghiền bột 30.000 năm: "STONE AGE FLOUR"
export function b(k) {
  tRays(k, 1250, 600, P.orange, '#f7963f');
  k.ctx.fillStyle = P.sand; k.ctx.fillRect(0, 920, k.W, 160);
  k.prop('grinder', 1100, 700, 1050);
  for (let i = 0; i < 26; i++) k.dot(1000 + k.rand(i) * 420, 640 + k.rand(i + 40) * 120, 8 + k.rand(i + 80) * 10, '#fffaf0', 0.95);
  tRing(k, 1200, 720, 330, 160, { rotate: -0.05 });
  tBust(k, 1730, 700, 140, YOU, { face: 'shock' });
  tText(k, [['STONE AGE', '#fff', 140]], 520, 150); tText(k, [['FLOUR', P.red, 240]], 520, 360);
  tTag(k, '30,000 YEARS OLD', 520, 560, { size: 62 });
}
// C — Đi săn: 1 lần trúng / 30 ngày; củ dại mới là bữa ăn hằng ngày: "1 IN 30"
export function c(k) {
  tRays(k, 1150, 600, '#4E9A45', '#5aab50');
  k.ctx.fillStyle = P.sand; k.ctx.fillRect(0, 930, k.W, 150);
  k.prop('tuber', 1150, 640, 760, { rotate: -0.2 });
  tRing(k, 1150, 640, 330, 230, { rotate: -0.15 });
  tBust(k, 1730, 720, 140, YOU, { face: 'sad', prop: 'spear' });
  tText(k, [['1 IN 30', P.yellow, 220]], 470, 280); tText(k, [['HUNTS', '#fff', 170]], 470, 500);
  tTag(k, 'THE DAILY MEAL →', 470, 720, { size: 58, fill: P.red, color: '#fff' });
}
