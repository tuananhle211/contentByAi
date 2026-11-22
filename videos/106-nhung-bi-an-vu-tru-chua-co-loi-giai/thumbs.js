// Thumbnail tập 106 — mỗi mẫu một hình chính + MỘT câu hỏi (skill thumbnail, kênh Hạt Bụi Xanh).
import { P, fill, space, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';
export const style = 'clean';
const W = 1920, H = 1080;

// a: bản in tín hiệu Wow! thật, khoanh đỏ — "TÍN HIỆU 72 GIÂY / AI ĐÃ GỬI?"
export function a(k) {
  fill(k, '#000');
  k.photo('wow-in', 760, 0, 1160, H, { zoom: [1.85, 1.85], pan: [[0.41, 0.47], [0.41, 0.47]], credit: false });
  const g = k.ctx.createLinearGradient(700, 0, 1000, 0); g.addColorStop(0, '#05081A'); g.addColorStop(1, 'rgba(5,8,26,0)');
  k.ctx.fillStyle = '#05081A'; k.ctx.fillRect(0, 0, 760, H); k.ctx.fillStyle = g; k.ctx.fillRect(700, 0, 300, H);
  thumbLine(k, 'TÍN HIỆU', 400, 360, 130);
  thumbLine(k, '72 GIÂY', 400, 520, 150, P.cream);
  thumbAsk(k, 'AI ĐÃ GỬI?', 400, 730, 120, P.gold);
}

// b: ʻOumuamua (hình minh hoạ ESO) — "VẬT THỂ LẠ / TỰ TĂNG TỐC?"
export function b(k) {
  fill(k, '#000');
  k.photo('oumuamua-mh', 0, 0, W, H, { zoom: [1.25, 1.25], pan: [[0.62, 0.42], [0.62, 0.42]], credit: false });
  k.ctx.fillStyle = 'rgba(5,8,26,0.55)'; k.ctx.fillRect(0, 600, W, 480);
  thumbLine(k, 'VẬT THỂ LẠ TỪ NGOÀI', W / 2, 720, 110);
  thumbAsk(k, 'TỰ TĂNG TỐC?', W / 2, 900, 120, P.gold);
}

// c: Trái Đất nhỏ giữa bóng tối, 15 chấm sáng / 100 — "85% VŨ TRỤ / LÀ THỨ GÌ?"
export function c(k) {
  space(k, { n: 220 });
  const s = 230 / 0.85; k.ctx.save(); k.ctx.beginPath(); k.ctx.arc(1460, 560, 230, 0, Math.PI * 2); k.ctx.clip(); k.photo('trai-dat-that', 1460 - s, 560 - s, s * 2, s * 2, { zoom: [1, 1], credit: false }); k.ctx.restore();
  thumbLine(k, '85% VẬT CHẤT', 620, 400, 130);
  thumbAsk(k, 'LÀ THỨ GÌ?', 620, 600, 130, P.gold);
}
