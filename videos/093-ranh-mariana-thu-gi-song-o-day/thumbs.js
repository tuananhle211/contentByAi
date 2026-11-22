// Thumbnail tập 093 (skill `thumbnail`): MỘT hình chính + MỘT câu duy nhất là câu hỏi.
// a: cá cần câu phát sáng trong bóng tối + thước 10.900 m — "ĐÁY SÂU 11 KM / CÓ GÌ SỐNG?"
// b: ảnh thật tàu Trieste 1960 — "HỌ THẤY GÌ / Ở ĐÁY SÂU NHẤT?"
// c: Everest chìm trong rãnh, vẫn còn 2 km nước phía trên — "NÉM EVEREST XUỐNG / CÓ CHẠM MẶT NƯỚC?"
import { P, anglerfish } from '/channel/hat-bui-xanh.js';
export const style = 'clean';
function line(k, text, x, y, size, color, align = 'left') {
  k.text(text, x, y, { size, font: 'title', color, outline: '#06101A', outlineWidth: 22, align });
}
function deep(k) {
  const g = k.ctx.createLinearGradient(0, 0, 0, k.H); g.addColorStop(0, '#0A4A5C'); g.addColorStop(0.35, '#02161F'); g.addColorStop(1, '#000'); k.ctx.fillStyle = g; k.ctx.fillRect(0, 0, k.W, k.H);
}
export function a(k) {
  deep(k);
  for (let i = 0; i < 70; i++) k.dot(k.rand(i + 40) * k.W, k.rand(i + 90) * k.H, 1.5 + 2.5 * k.rand(i + 7), '#DDEEF2', 0.35);
  anglerfish(k, 1180, 790, 900, {});
  line(k, 'ĐÁY SÂU 11 KM', 80, 200, 140, P.cream);
  line(k, 'CÓ GÌ SỐNG?', 80, 360, 150, P.gold);
}
export function b(k) {
  k.photo('trieste', 0, 0, k.W, k.H, { zoom: [1.15, 1.15], pan: [[0.42, 0.62], [0.42, 0.62]], credit: false, dim: 0.1 });
  line(k, 'HỌ THẤY GÌ', 80, 180, 140, P.cream);
  line(k, 'Ở ĐÁY SÂU NHẤT?', 80, 340, 130, P.gold);
}
export function c(k) {
  const top = 330, s = 700 / 10900;
  k.ctx.fillStyle = '#9CC9E0'; k.ctx.fillRect(0, 0, k.W, top);
  deep(k); k.ctx.fillStyle = '#9CC9E0'; k.ctx.fillRect(0, 0, k.W, top);
  k.ctx.fillStyle = '#2A2118'; k.ctx.beginPath(); k.ctx.moveTo(0, top); k.ctx.lineTo(1100, top); k.ctx.lineTo(1300, top + 700); k.ctx.lineTo(1560, top + 700); k.ctx.lineTo(1760, top); k.ctx.lineTo(k.W, top); k.ctx.lineTo(k.W, k.H); k.ctx.lineTo(0, k.H); k.ctx.closePath(); k.ctx.fill();
  k.ctx.fillStyle = '#7A8796'; k.ctx.beginPath(); k.ctx.moveTo(1230, top + 700); k.ctx.lineTo(1430, top + 700 - 8849 * s); k.ctx.lineTo(1630, top + 700); k.ctx.closePath(); k.ctx.fill();
  k.ctx.fillStyle = '#F5F1E6'; k.ctx.beginPath(); k.ctx.moveTo(1380, top + 700 - 7600 * s); k.ctx.lineTo(1430, top + 700 - 8849 * s); k.ctx.lineTo(1480, top + 700 - 7600 * s); k.ctx.closePath(); k.ctx.fill();
  k.ctx.strokeStyle = '#E5383B'; k.ctx.lineWidth = 8; k.ctx.beginPath(); k.ctx.moveTo(1430, top + 8); k.ctx.lineTo(1430, top + 700 - 8849 * s - 8); k.ctx.stroke();
  line(k, 'THẢ EVEREST XUỐNG', 70, 150, 115, P.cream);
  line(k, 'CÓ NHÔ LÊN KHÔNG?', 70, 290, 115, P.gold);
}
