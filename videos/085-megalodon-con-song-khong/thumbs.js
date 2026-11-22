// Thumbnail tập 085 (skill `thumbnail`): MỘT hình chính + MỘT câu duy nhất là câu hỏi.
// a: bóng Megalodon khổng lồ dưới thợ lặn tí hon — "MEGALODON / CÒN SỐNG?"
// b: ảnh thật răng Megalodon cạnh răng cá mập trắng — "RĂNG NÀY / MỚI 11.000 NĂM?"
// c: Megalodon cạnh cá mập trắng nhỏ — "AI ĐÃ GIẾT / GÃ KHỔNG LỒ?"
import { P, ocean, shark, diver } from '/channel/hat-bui-xanh.js';
export const style = 'clean';
function line(k, text, x, y, size, color, align = 'left') {
  k.text(text, x, y, { size, font: 'title', color, outline: '#06101A', outlineWidth: 22, align });
}
export function a(k) {
  ocean(k, { depth: 0.85, snow: 60 });
  shark(k, 1020, 660, 1640, { color: '#3B4A57', swim: 0 });
  diver(k, 1450, 220, 170, { color: '#E9F1F6' });
  line(k, 'MEGALODON', 80, 200, 150, P.cream);
  line(k, 'CÒN SỐNG?', 80, 360, 150, P.gold);
}
export function b(k) {
  k.photo('rang-megalodon', 0, 0, k.W, k.H, { zoom: [1.15, 1.15], pan: [[0.4, 0.5], [0.4, 0.5]], credit: false, dim: 0.1 });
  line(k, 'RĂNG NÀY', 1860, 760, 140, P.cream, 'right');
  line(k, 'MỚI 11.000 NĂM?', 1860, 920, 120, P.gold, 'right');
}
export function c(k) {
  ocean(k, { depth: 0.6, snow: 50 });
  shark(k, 760, 600, 1400, { color: '#3B4A57', swim: 0 });
  shark(k, 1640, 760, 360, { color: '#8FA3B4', swim: 0 });
  line(k, 'AI ĐÃ GIẾT', 1860, 170, 140, P.cream, 'right');
  line(k, 'GÃ KHỔNG LỒ?', 1860, 330, 140, P.red, 'right');
}
