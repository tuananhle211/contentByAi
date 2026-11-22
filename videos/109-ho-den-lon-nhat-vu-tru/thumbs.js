// Thumbnail tập 109 — một hình chính + MỘT câu hỏi (skill thumbnail, kênh Hạt Bụi Xanh).
import { P, fill, space, solarSystem, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';
import { three } from '/engine/gl3d.js';
import { blackHoleScene, blackHoleUpdate } from '/channel/hat-bui-xanh-3d.js';
export const style = 'clean';
const W = 1920, H = 1080;
const BH = blackHoleScene();

// a: hố đen 3D, cả Hệ Mặt Trời (vẽ) lọt thỏm trong bóng đen — "CẢ HỆ MẶT TRỜI / LỌT THỎM BÊN TRONG?"
export function a(k) {
  fill(k, '#000');
  three(k, 'bh', BH, blackHoleUpdate({ dist: 8.2, orbit: 0, tilt: 0.1 }), 380, 0, W, H, { exposure: 1.25 });
  solarSystem(k, 380 + W / 2, H / 2 - 4, 120, { n: 8 });
  k.ctx.strokeStyle = 'rgba(255,211,78,0.85)'; k.ctx.lineWidth = 4; k.ctx.setLineDash([10, 8]); k.ctx.beginPath(); k.ctx.arc(380 + W / 2, H / 2 - 4, 120, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.setLineDash([]);
  thumbLine(k, 'CẢ HỆ MẶT TRỜI', 520, 400, 92);
  thumbAsk(k, 'LỌT THỎM TRONG?', 520, 570, 86, P.gold);
}
// b: ảnh M87* của EHT — "6,5 TỶ MẶT TRỜI / VẪN CHƯA LỚN NHẤT?"
export function b(k) {
  fill(k, '#000');
  k.photo('eht-m87', 820, 0, 1100, H, { zoom: [1.25, 1.25], credit: false });
  thumbLine(k, '6,5 TỶ MẶT TRỜI', 520, 400, 92);
  thumbAsk(k, 'CHƯA LỚN NHẤT?', 520, 570, 86, P.gold);
}
// c: hố đen 3D — "LOÃNG HƠN / KHÔNG KHÍ?"
export function c(k) {
  fill(k, '#000');
  three(k, 'bh', BH, blackHoleUpdate({ dist: 11, orbit: 0, tilt: 0.16 }), 300, 0, W, H, { exposure: 1.2 });
  thumbLine(k, 'HỐ ĐEN NÀY', 520, 400, 92);
  thumbAsk(k, 'LOÃNG HƠN KHÍ?', 520, 570, 86, P.gold);
}
