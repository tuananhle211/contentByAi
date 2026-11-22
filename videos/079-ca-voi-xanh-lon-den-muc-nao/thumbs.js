// Thumbnail Hạt Bụi Xanh tập 1 (bản 2, 11/11): người dùng muốn "ghi nhiều thông tin, gây ấn tượng và tò mò hơn", chỉ 1 mẫu.
// → ảnh thật NOAA từ trên cao + thước đo 30 m vẽ chồng + khối số liệu có thật (Fact check trong kich-ban.md) + câu hỏi bỏ ngỏ.
// Concept: #16 kỷ lục (lớn nhất từng tồn tại) + #5 điều chưa biết (vì sao không lớn hơn) + #2 kỳ lạ (lưỡi nặng bằng con voi).
import { P } from '/channel/hat-bui-xanh.js';
export const style = 'clean';

const TAU = Math.PI * 2;
function big(k, text, x, y, size, color, o = {}) {
  return k.text(text, x, y, { size, font: 'title', color, outline: o.outline ?? '#06101A', outlineWidth: o.ow ?? 22, align: o.align ?? 'center' });
}
// Hộp chữ có nền (nhãn số liệu), trả về khung để nối đường chỉ.
function tag(k, s, x, y, o = {}) {
  const { ctx } = k;
  const size = o.size ?? 64;
  ctx.save();
  ctx.font = `800 ${size}px "Be Vietnam Pro"`;
  const w = ctx.measureText(s).width + size * 0.8, h = size * 1.45;
  const bx = o.align === 'right' ? x - w : o.align === 'center' ? x - w / 2 : x;
  ctx.fillStyle = o.bg ?? P.gold; ctx.strokeStyle = '#06101A'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.roundRect(bx, y - h / 2, w, h, 14); ctx.fill(); ctx.stroke();
  ctx.fillStyle = o.color ?? P.ink; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillText(s, bx + size * 0.4, y + size * 0.04);
  ctx.restore();
  return { x: bx, y: y - h / 2, w, h };
}
// Thước đo song song một đoạn bất kỳ, có vạch hai đầu.
function measure(k, x1, y1, x2, y2, color = P.gold) {
  const { ctx } = k;
  const a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a) * 22, ny = Math.cos(a) * 22;
  ctx.save(); ctx.lineCap = 'round';
  for (const [c, w] of [['#06101A', 14], [color, 6]]) {
    ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.moveTo(x1 - nx, y1 - ny); ctx.lineTo(x1 + nx, y1 + ny);
    ctx.moveTo(x2 - nx, y2 - ny); ctx.lineTo(x2 + nx, y2 + ny);
    ctx.stroke();
  }
  ctx.restore();
}

// Ảnh 1280×806 phủ khung 1920×1080: ×1.5, lệch dọc 43 px gốc → đuôi ~(60,310), mõm ~(1860,970).
export function a(k) {
  const { ctx } = k;
  k.photo('ca-voi-tu-tren-cao', 0, 0, k.W, k.H, { zoom: [1, 1], pan: [[0.5, 0.5], [0.5, 0.5]], credit: false, dim: 0.1 });
  // thước đo dọc thân
  measure(k, 95, 205, 1840, 845, P.gold);
  ctx.save(); ctx.translate(1090, 470); ctx.rotate(Math.atan2(640, 1745));
  tag(k, '30 MÉT', 0, 0, { size: 84, align: 'center' });
  ctx.restore();
  // tiêu đề góc phải trên (vùng nước tối)
  tag(k, 'ẢNH THẬT', 1870, 318, { size: 46, bg: P.red, color: P.cream, align: 'right' });
  big(k, 'LỚN NHẤT', 1870, 118, 170, P.gold, { align: 'right', ow: 24 });
  big(k, 'TỪNG TỒN TẠI', 1870, 238, 84, P.cream, { align: 'right', ow: 16 });
  // khối số liệu góc trái dưới, nền tối để không chìm vào bọt nước
  ctx.save(); ctx.fillStyle = 'rgba(3,16,26,0.82)';
  ctx.beginPath(); ctx.roundRect(30, 545, 820, 505, 28); ctx.fill(); ctx.restore();
  tag(k, 'TIM 180 KG', 70, 620, { size: 66, bg: P.red, color: P.cream });
  tag(k, 'NẶNG 190 TẤN', 70, 740, { size: 66 });
  tag(k, 'LƯỠI = 1 CON VOI', 70, 860, { size: 66, bg: P.cream });
  big(k, 'VÌ SAO KHÔNG LỚN HƠN?', 440, 985, 62, P.orange, { ow: 12 });
}
