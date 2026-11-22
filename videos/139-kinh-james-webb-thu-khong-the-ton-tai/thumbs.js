// Thumbnail tập 139 — một hình chính + MỘT câu hỏi (skill thumbnail, kênh Hạt Bụi Xanh).
import { P, fill, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';
export const style = 'clean';
const W = 1920, H = 1080;
// a: ảnh thật JADES-GS-z14-0 khoanh đỏ — "280 TRIỆU NĂM TUỔI / SAO ĐÃ LỚN THẾ?"
export function a(k) {
  fill(k, '#000');
  k.photo('z14', 760, 0, 1160, H, { zoom: [3.4, 3.4], pan: [[0.785, 0.2], [0.785, 0.2]], credit: false });
  k.ctx.fillStyle = '#04050A'; k.ctx.fillRect(0, 0, 760, H);
  const g = k.ctx.createLinearGradient(700, 0, 960, 0); g.addColorStop(0, '#04050A'); g.addColorStop(1, 'rgba(4,5,10,0)'); k.ctx.fillStyle = g; k.ctx.fillRect(700, 0, 260, H);
  k.ctx.strokeStyle = '#E5383B'; k.ctx.lineWidth = 10; k.ctx.beginPath(); k.ctx.arc(1512, 448, 150, 0, Math.PI * 2); k.ctx.stroke();
  thumbLine(k, 'MỚI 290 TRIỆU NĂM', 450, 420, 80);
  thumbAsk(k, 'SAO ĐÃ LỚN THẾ?', 450, 580, 86, P.gold);
}
// b: chấm đỏ nhỏ — "CHẤM ĐỎ NÀY / LÀ THỨ GÌ?"
export function b(k) {
  fill(k, '#000');
  k.photo('cham-do', 760, 0, 1160, H, { zoom: [4.0, 4.0], pan: [[0.5, 0.245], [0.5, 0.245]], credit: false });
  k.ctx.fillStyle = '#04050A'; k.ctx.fillRect(0, 0, 760, H);
  thumbLine(k, 'CHẤM ĐỎ NÀY', 450, 420, 100);
  thumbAsk(k, 'LÀ THỨ GÌ?', 450, 580, 100, P.gold);
}
// c: gương vàng của Webb — "WEBB VỪA THẤY / ĐIỀU KHÔNG THỂ?"
export function c(k) {
  fill(k, '#000');
  k.photo('guong', 0, 0, W, H, { zoom: [1.15, 1.15], pan: [[0.5, 0.45], [0.5, 0.45]], credit: false, dim: 0.35 });
  thumbLine(k, 'WEBB VỪA THẤY', W / 2, 760, 110);
  thumbAsk(k, 'ĐIỀU KHÔNG THỂ?', W / 2, 920, 104, P.gold);
}
