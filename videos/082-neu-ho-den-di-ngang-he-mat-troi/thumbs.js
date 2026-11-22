// Thumbnail tập 082 — người dùng (11/11): "truyền tải ý chính bằng 1 câu thôi, gây tò mò, nhiều chữ quá".
// Mỗi mẫu: MỘT hình chính rõ + MỘT câu duy nhất (chia 2 dòng nếu cần), không chip, không hộp dữ kiện.
// Tiêu đề: "Điều Gì Xảy Ra Nếu Một Hố Đen Đi Ngang Hệ Mặt Trời?"
// a: hố đen khổng lồ kéo Trái Đất — "HỐ ĐEN ĐI NGANG, TRÁI ĐẤT RA SAO?"
// b: ảnh thật Sgr A* — "100 TRIỆU CÁI ĐANG TRÔI QUANH TA?"
// c: Trái Đất bị kéo dẹt sát hố đen — "KHÔNG BỊ NUỐT, MÀ CÒN TỆ HƠN?"
import { P, space, blackHole, earthTorn } from '/channel/hat-bui-xanh.js';
export const style = 'clean';

function line(k, text, x, y, size, color, align = 'left') {
  k.text(text, x, y, { size, font: 'title', color, outline: '#06101A', outlineWidth: 22, align });
}

export function a(k) {
  space(k, { n: 220 });
  blackHole(k, 1300, 420, 260);
  // vệt Trái Đất bị kéo về phía hố đen
  const { ctx } = k; ctx.setLineDash([20, 16]); ctx.strokeStyle = 'rgba(255,211,78,0.7)'; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(250, 330); ctx.quadraticCurveTo(520, 220, 760, 380); ctx.stroke(); ctx.setLineDash([]);
  earthTorn(k, 790, 410, 105, 0.35, 0, 1300, 420);
  line(k, 'HỐ ĐEN ĐI NGANG,', 80, 790, 130, P.cream);
  line(k, 'TRÁI ĐẤT RA SAO?', 80, 950, 130, P.gold);
}

export function b(k) {
  k.ctx.fillStyle = '#000'; k.ctx.fillRect(0, 0, k.W, k.H);
  k.photo('sgr-a', 760, 0, 1160, 1080, { zoom: [1.1, 1.1], credit: false });
  line(k, '100 TRIỆU CÁI', 80, 440, 140, P.cream);
  line(k, 'ĐANG TRÔI QUANH TA?', 80, 610, 112, P.gold);
}

export function c(k) {
  space(k, { n: 220 });
  blackHole(k, 1360, 540, 200);
  earthTorn(k, 760, 540, 150, 0.75, 0, 1360, 540);
  line(k, 'KHÔNG BỊ NUỐT,', 80, 170, 130, P.cream);
  line(k, 'MÀ CÒN TỆ HƠN?', 80, 920, 130, P.gold);
}
