// Thumbnail tập 115 — một hình chính + MỘT câu hỏi (skill thumbnail, kênh Hạt Bụi Xanh).
import { P, fill, space, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';
export const style = 'clean';
const W = 1920, H = 1080;

// a: Trái Đất thật + chỗ trống nét đứt nơi Mặt Trăng từng ở — "MẶT TRĂNG BIẾN MẤT / TRÁI ĐẤT RA SAO?"
export function a(k) {
  space(k, { n: 260 });
  const s = 320 / 0.85; k.ctx.save(); k.ctx.beginPath(); k.ctx.arc(1500, 600, 320, 0, Math.PI * 2); k.ctx.clip(); k.photo('trai-dat-that', 1500 - s, 600 - s, s * 2, s * 2, { zoom: [1, 1], credit: false }); k.ctx.restore();
  k.ctx.strokeStyle = 'rgba(255,211,78,0.95)'; k.ctx.lineWidth = 8; k.ctx.setLineDash([22, 16]); k.ctx.beginPath(); k.ctx.arc(980, 250, 110, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.setLineDash([]);
  thumbLine(k, 'MẶT TRĂNG BIẾN MẤT', 590, 620, 82);
  thumbAsk(k, 'TRÁI ĐẤT RA SAO?', 590, 780, 90, P.gold);
}
// b: trăng rằm thật mờ dần — "ĐÊM KHÔNG TRĂNG / BIỂN SẼ RA SAO?"
export function b(k) {
  fill(k, '#03050C');
  const s = 340 / 0.92; k.ctx.save(); k.ctx.globalAlpha = 0.55; k.ctx.beginPath(); k.ctx.arc(1420, 520, 340, 0, Math.PI * 2); k.ctx.clip(); k.photo('trang-ram', 1420 - s, 520 - s, s * 2, s * 2, { zoom: [1, 1], credit: false }); k.ctx.restore();
  k.ctx.strokeStyle = 'rgba(255,211,78,0.9)'; k.ctx.lineWidth = 6; k.ctx.setLineDash([18, 14]); k.ctx.beginPath(); k.ctx.arc(1420, 520, 340, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.setLineDash([]);
  thumbLine(k, 'ĐÊM KHÔNG TRĂNG', 560, 420, 100);
  thumbAsk(k, 'BIỂN SẼ RA SAO?', 560, 590, 96, P.gold);
}
// c: nhật thực thật — "MẤT MẶT TRĂNG / HẾT NHẬT THỰC?"
export function c(k) {
  fill(k, '#000');
  k.photo('nhat-thuc', 860, 0, 1060, H, { zoom: [1.2, 1.2], credit: false });
  thumbLine(k, 'MẤT MẶT TRĂNG', 480, 420, 100);
  thumbAsk(k, 'HẾT NHẬT THỰC?', 480, 590, 96, P.gold);
}
