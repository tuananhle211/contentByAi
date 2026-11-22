// Thumbnail tập 021 (render: node scripts/thumbs.mjs 021-how-ancient-humans-raised-kids). Mẫu chính: a.
// Bản 03/11: vật chính to + mặt cận cảnh + vòng/mũi tên đỏ; chữ bổ sung cho tiêu đề, không lặp lại.
export const style = 'clean';
import { P, YOU, tRays, tText, tTag, tRing, tArrow, tBust } from '/channel/long-story-drawn.js';

const DAD = { body: 'man', outfit: 'bare', color: '#6b4a33', color2: P.yellow, hair: 'short', hairColor: '#2a1d14', skin: '#8a5a3a' };
const GRAN = { body: 'woman', outfit: 'dress', color: '#8a5a3a', color2: '#6b4a33', hair: 'bun', hairColor: '#e2ddd4', skin: '#9a6b42' };
// Cánh tay vươn vào từ mép khung (bàn tay tròn ở đầu).
function arm(k, x1, y1, x2, y2, skin) {
  const { ctx } = k; ctx.lineCap = 'round';
  for (const [w, c] of [[62, '#2b2b2b'], [48, skin]]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
  k.circle(x2, y2, 40, { fill: skin, fillStyle: 'solid', stroke: '#2b2b2b', width: 7, rough: 0, seed: Math.round(x2 + y2) });
}

// A — Bố Aka bế con cận cảnh, linh vật ngỡ ngàng: "WORLD'S BEST DADS"
export function a(k) {
  tRays(k, 1250, 560, '#3f7a3a', '#4f8f44');
  tBust(k, 1250, 330, 200, DAD, { face: 'happy', pose: 'hold' });
  k.prop('baby', 1290, 820, 520, { skin: '#8a5a3a', awake: true });
  tRing(k, 1250, 800, 330, 170);
  tBust(k, 1720, 820, 120, YOU, { face: 'shock' });
  tText(k, [["WORLD'S", '#fff', 150], ['BEST', P.yellow, 210], ['DADS', P.red, 230]], 470, 190);
  tTag(k, 'BABY IN REACH ~47%', 470, 960, { size: 50 });
}
// B — Một em bé, rất nhiều bàn tay: "14 PARENTS?"
export function b(k) {
  tRays(k, 1260, 560, '#F5F1E6', '#fbe7c9');
  const skins = ['#8a5a3a', '#9a6b42', '#7a4a2e', '#a87b4f', '#8a5a3a', '#6b4430', '#9a6b42', '#7a4a2e'];
  const ends = [[1100, -80, 1180, 260], [1500, -80, 1440, 270], [2000, 60, 1680, 330], [2000, 560, 1760, 560], [2000, 1060, 1680, 790], [1500, 1160, 1440, 860], [1100, 1160, 1180, 860], [880, 1160, 1000, 780]];
  ends.forEach(([a, b, c, d], i) => arm(k, a, b, c, d, skins[i]));
  k.prop('baby', 1400, 560, 560, { skin: '#8a5a3a', awake: true });
  tRing(k, 1390, 560, 380, 220);
  tText(k, [['14', P.red, 330]], 470, 250);
  tText(k, [['CAREGIVERS', '#fff', 128]], 480, 500);
  tBust(k, 330, 900, 110, YOU, { face: 'laugh' });
}
// C — Bà ngoại cầm củ to: "THANK GRANDMA"
export function c(k) {
  tRays(k, 1250, 560, '#F58220', '#f79a45');
  k.ctx.fillStyle = '#D2B488'; k.ctx.fillRect(0, 930, k.W, 150);
  tBust(k, 1180, 360, 200, GRAN, { face: 'smug', pose: 'hold' });
  k.prop('tuber', 1250, 820, 620);
  tArrow(k, 1780, 420, 1560, 700);
  tBust(k, 1720, 860, 110, YOU, { face: 'happy', flip: true });
  tText(k, [['THANK', '#fff', 200], ['GRANDMA', P.yellow, 160]], 500, 280);
  tTag(k, 'SHE FED THE KIDS', 500, 720, { size: 56, fill: P.red, color: '#fff' });
}
