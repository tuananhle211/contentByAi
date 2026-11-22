// Thumbnail tập 023 (render: node scripts/thumbs.mjs 023-how-ancient-humans-survived-without-doctors). Mẫu chính: a.
// Bản 03/11: vật chính to + mặt cận cảnh + vòng/mũi tên đỏ; chữ bổ sung cho tiêu đề, không lặp lại.
export const style = 'clean';
import { P, YOU, tRays, tText, tTag, tRing, tArrow, tBust } from '/channel/long-story-drawn.js';

// A — Xương ống chân bị cắt gọn, đã liền: "STONE AGE SURGERY" · 31,000 năm
export function a(k) {
  tRays(k, 1250, 520, '#322B5E', '#3f3874');
  k.prop('bone', 1180, 560, 1100, { cut: true, rotate: -0.35 });
  // phần chân đã mất: nét đứt
  const { ctx } = k; ctx.save(); ctx.translate(1180, 560); ctx.rotate(-0.35);
  ctx.setLineDash([28, 22]); ctx.lineWidth = 10; ctx.strokeStyle = '#fff'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(350, -70); ctx.lineTo(640, -70); ctx.moveTo(350, 70); ctx.lineTo(640, 70);
  ctx.moveTo(640, -70); ctx.arc(690, -60, 52, Math.PI, Math.PI * 2.6); ctx.moveTo(640, 70); ctx.arc(690, 60, 52, Math.PI, -Math.PI * 0.6, true); ctx.stroke(); ctx.restore();
  tRing(k, 1500, 445, 110, 175, { rotate: -0.35 });
  tBust(k, 1600, 860, 120, YOU, { face: 'shock' });
  tText(k, [['STONE AGE', '#fff', 150], ['SURGERY', P.red, 190]], 480, 190);
  tTag(k, '31,000 YEARS AGO', 480, 540, { size: 64 });
}
// B — Hộp sọ khoan lỗ đã liền: "HE LIVED"
export function b(k) {
  tRays(k, 1250, 520, '#F58220', '#f79a45');
  k.prop('skull', 1240, 560, 980, { holes: 2 });
  tRing(k, 1120, 260, 230, 170);
  tArrow(k, 700, 120, 900, 220);
  tBust(k, 1700, 870, 120, YOU, { face: 'gross' });
  tText(k, [['HOLE IN', '#fff', 150], ['HEAD...', '#fff', 150], ['HE LIVED', P.red, 160]], 450, 360);
}
// C — Đười ươi tự chữa vết thương bằng lá: "APE DOCTOR"
export function c(k) {
  tRays(k, 1250, 560, '#4E9A45', '#5aa74a');
  k.prop('orangutan', 1250, 620, 900, { wound: true });
  // lá nhai đắp lên vết thương trên má
  k.group({ x: 1390, y: 390, r: 0.6 }, () => {
    k.ellipse(0, 0, 150, 80, { fill: '#4E9A45', fillStyle: 'solid', stroke: '#2b2b2b', width: 6, rough: 0, seed: 21 });
    k.line(-70, 0, 70, 0, { stroke: '#2f6a2a', width: 5, rough: 0, seed: 22 });
  });
  tRing(k, 1390, 390, 150, 120);
  tArrow(k, 1820, 150, 1560, 320);
  tBust(k, 1720, 860, 120, YOU, { face: 'laugh', flip: true });
  tText(k, [['APE', '#fff', 230], ['DOCTOR', P.yellow, 180]], 470, 330);
  tTag(k, 'REAL · 2022', 470, 760, { size: 64, fill: P.red, color: '#fff' });
}
