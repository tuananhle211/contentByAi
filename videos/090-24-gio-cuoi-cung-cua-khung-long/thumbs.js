// Thumbnail tập 090 (skill `thumbnail`): MỘT hình chính + MỘT câu duy nhất là câu hỏi.
// a: tiểu hành tinh rực lửa lao xuống trên đầu T. rex — "24 GIỜ CUỐI / KHỦNG LONG THẤY GÌ?"
// b: ảnh thật hố Chicxulub (NASA) — "CÁI GÌ ĐÃ ĐÀO / HỐ 180 KM NÀY?"
// c: T. rex khổng lồ cạnh con gà nhỏ — "VÌ SAO CON GÀ / SỐNG SÓT?"
import { P, cretaceous, asteroid, trex, bird } from '/channel/hat-bui-xanh.js';
export const style = 'clean';
function line(k, text, x, y, size, color, align = 'left') {
  k.text(text, x, y, { size, font: 'title', color, outline: '#06101A', outlineWidth: 22, align });
}
export function a(k) {
  cretaceous(k, { sky: 'red', y: 900, river: false });
  asteroid(k, 1450, 600, 210, { glow: 1, dir: Math.atan2(500, -600), rot: 0.3 });
  trex(k, 120, 1010, 900, { color: '#2A1E16', stroke: false });
  line(k, '24 GIỜ CUỐI', 80, 170, 140, P.cream);
  line(k, 'KHỦNG LONG THẤY GÌ?', 80, 330, 120, P.gold);
}
export function b(k) {
  const z = 1.6, fx = 640, fy = 330;
  k.group({ x: k.W / 2, y: k.H / 2, s: z }, () => {
    k.photo('ho-chicxulub', -fx, -70 - fy, k.W, 1220, { zoom: [1, 1], credit: false });
    k.ctx.strokeStyle = '#E5383B'; k.ctx.lineWidth = 9; k.ctx.setLineDash([24, 14]); k.ctx.beginPath(); k.ctx.arc(560 - fx, 240 - 70 - fy, 340, 0.1, 2.5); k.ctx.stroke(); k.ctx.setLineDash([]);
  });
  line(k, 'THỨ GÌ ĐÃ ĐÀO', 80, 150, 120, P.cream);
  line(k, 'HỐ 180 KM NÀY?', 80, 300, 120, P.gold);
}
export function c(k) {
  cretaceous(k, { sky: 'dusk', y: 960, river: false, trees: 4 });
  trex(k, 60, 1010, 1250, { color: '#8A5A3A' });
  bird(k, 1600, 1000, 300, {});
  line(k, 'VÌ SAO CON GÀ', 1860, 170, 130, P.cream, 'right');
  line(k, 'SỐNG SÓT?', 1860, 330, 140, P.gold, 'right');
}
