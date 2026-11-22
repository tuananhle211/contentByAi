// Thumbnail tập 057 (render: node scripts/thumbs.mjs 057-how-long-did-ancient-humans-live). Mẫu chính: a.
// Bản 03/11: vật chính to + mặt cận cảnh + vòng/mũi tên đỏ; chữ bổ sung cho tiêu đề, không lặp lại.
export const style = 'clean';
import { P, YOU, KID, tRays, tText, tTag, tRing, tArrow, tBust } from '/channel/long-story-drawn.js';

const GRANDPA = { body: 'man', outfit: 'bare', color: '#a87b4f', color2: '#7a5432', hair: 'short', hairColor: '#e4e0d8', beard: 'long', beardColor: '#e4e0d8', skin: '#9a6b42' };
const GRAN = { body: 'woman', outfit: 'dress', color: '#9a7550', color2: '#6b4a33', hair: 'bun', hairColor: '#e4e0d8', skin: '#9a6b42' };
// Số bị gạch chéo đỏ.
function crossed(k, s, x, y, size, color) {
  k.text(s, x, y, { size, font: 'title', color, outline: '#111', outlineWidth: size * 0.15 });
  const { ctx } = k; ctx.save(); ctx.lineCap = 'round';
  for (const [w, c] of [[44, '#fff'], [26, P.red]]) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x - size * 0.6, y + size * 0.35); ctx.lineTo(x + size * 0.6, y - size * 0.4); ctx.stroke(); }
  ctx.restore();
}

// A — Ông cụ tiền sử cười đắc ý, "30" gạch → "70": "DIED AT 30?" bị lật
export function a(k) {
  tRays(k, 1400, 560, P.orange, '#f7973f');
  k.ctx.fillStyle = P.sand; k.ctx.fillRect(0, 930, k.W, 150);
  tBust(k, 1420, 520, 230, GRANDPA, { face: 'smug', prop: 'staff' });
  tText(k, [['DIED AT', '#fff', 170]], 470, 160);
  crossed(k, '30', 230, 450, 240, '#fff');
  tArrow(k, 400, 450, 540, 450, { w: 28 });
  tText(k, [['70', P.yellow, 300]], 740, 440);
  tTag(k, 'NOT A TYPO', 470, 760, { size: 66, fill: P.red, color: '#fff' });
}
// B — Phép tính trung bình đánh lừa: em bé (0) + bà (70) = "35"?
export function b(k) {
  tRays(k, 960, 600, '#283A6E', '#33498a');
  k.prop('baby', 400, 640, 560, { cry: true });
  tTag(k, 'DIED AT 0', 400, 880, { size: 64 });
  tBust(k, 1520, 520, 170, GRAN, { face: 'happy' });
  tTag(k, 'LIVED TO 70', 1520, 900, { size: 60 });
  tText(k, [['AVERAGE AGE', '#fff', 110]], 960, 120, { maxWidth: 1200 });
  tText(k, [['35?', P.yellow, 320]], 960, 400);
  tRing(k, 960, 400, 290, 190);
}
// C — Tim khoẻ nhất từng đo (người Tsimane): "HEALTHIER THAN YOU?"
export function c(k) {
  tRays(k, 1300, 520, '#4E9A45', '#5aa951');
  k.prop('heart', 1220, 520, 640, { fill: P.red });
  tRing(k, 1220, 500, 330, 290);
  tBust(k, 1720, 760, 150, YOU, { face: 'sad' });
  tText(k, [['BETTER', '#fff', 170], ['HEARTS', P.yellow, 170], ['THAN YOU', '#fff', 120]], 470, 230, { maxWidth: 820 });
}
