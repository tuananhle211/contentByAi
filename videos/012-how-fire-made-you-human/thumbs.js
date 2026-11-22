// Thumbnail tập 012 (render: node scripts/thumbs.mjs 012-how-fire-made-you-human). Mẫu chính: a.
// Bản 03/11: vật chính to + mặt cận cảnh + vòng/mũi tên đỏ; chữ bổ sung cho tiêu đề, không lặp lại.
export const style = 'clean';
import { P, YOU, ELDER, tRays, tText, tTag, tRing, tArrow, tBust } from '/channel/long-story-drawn.js';

// Bong bóng thoại phẳng: hộp tròn góc (tâm x,y) + đuôi chỉ về (tx,ty).
function say(k, x, y, w, h, tx, ty, lines) {
  const { ctx } = k;
  ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = '#111'; ctx.fillStyle = '#fff'; ctx.lineJoin = 'round';
  const tail = () => { ctx.beginPath(); ctx.moveTo(x - w * 0.18, y + h / 2 - 10); ctx.lineTo(tx, ty); ctx.lineTo(x - w * 0.02, y + h / 2 - 10); ctx.closePath(); };
  tail(); ctx.stroke(); ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 50); ctx.stroke(); ctx.fill(); tail(); ctx.fill();
  ctx.restore();
  for (const [str, color, size, dy] of lines) k.text(str, x, y + dy, { size, font: 'title', color });
}
const stars = (k, n = 30) => { for (let i = 0; i < n; i++) k.dot(k.rand(i) * k.W, k.rand(i + 70) * 700, 3 + k.rand(i + 9) * 4, '#fff7d6', 0.8); };

// A — Thịt nướng trên lửa → bộ não to: "COOKING BUILT THIS?"
export function a(k) {
  tRays(k, 1200, 420, '#322B5E', '#3e3672');
  stars(k);
  k.prop('campfire', 1080, 900, 420);
  k.prop('meat', 1060, 690, 340, { rotate: -0.3 });
  k.icon('brain', 1250, 320, 470);
  tRing(k, 1250, 320, 280, 230, { rotate: -0.08 });
  tArrow(k, 1090, 620, 1150, 560, { w: 30 });
  tBust(k, 1720, 720, 150, YOU, { face: 'happy' });
  tText(k, [['COOKING', '#fff', 150]], 440, 300); tText(k, [['BUILT', P.yellow, 190]], 440, 480); tText(k, [['THIS?', P.red, 230]], 440, 700);
}
// B — Đêm bên lửa, bà kể chuyện: "AFTER DARK" · 81% STORIES
export function b(k) {
  tRays(k, 900, 900, '#283A6E', '#33498a');
  stars(k, 25);
  k.prop('campfire', 900, 980, 420);
  tBust(k, 520, 640, 160, ELDER, { face: 'laugh' });
  say(k, 1060, 580, 620, 330, 720, 760, [['81%', P.red, 170, -40], ['STORIES', '#111', 84, 100]]);
  tRing(k, 1060, 540, 210, 100, { rotate: -0.06, w: 24 });
  tBust(k, 1660, 790, 130, YOU, { face: 'shock' });
  tText(k, [['AFTER', '#fff', 140]], 1620, 150, { maxWidth: 560 }); tText(k, [['DARK', P.yellow, 180]], 1620, 320, { maxWidth: 560 });
  tTag(k, 'DAYTIME: ONLY 6%', 880, 300, { size: 58, fill: '#fff' });
}
// C — Tinh tinh nhai cả ngày: "5 HOURS CHEWING"
export function c(k) {
  tRays(k, 1200, 560, P.grass, '#5aab50');
  k.ctx.fillStyle = P.sand; k.ctx.fillRect(0, 940, k.W, 140);
  k.prop('chimp', 1180, 640, 700);
  tRing(k, 1180, 640, 180, 140, { rotate: -0.1 });
  tBust(k, 1720, 720, 140, YOU, { face: 'gross' });
  tText(k, [['5 HOURS', P.yellow, 190]], 470, 300, { maxWidth: 1000 }); tText(k, [['CHEWING', '#fff', 150]], 470, 500);
  tTag(k, 'EVERY DAY · RAW FOOD', 470, 700, { size: 54, fill: P.red, color: '#fff' });
}
