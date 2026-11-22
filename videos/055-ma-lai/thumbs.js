// Thumbnail tập 055 (render: node scripts/thumbs.mjs 055-ma-lai). Mẫu chính: a.
export const style = 'clean';
const ME = { body: 'man', outfit: 'tunic', color: '#e4572e', color2: '#f6c344', hair: 'topknot', shadow: false };
const big = (k, s, x, y, size, color) => k.text(s, x, y, { size, font: 'title', color, outline: '#111', outlineWidth: size * 0.16 });
function night(k) {
  const { ctx } = k;
  ctx.fillStyle = '#141a2e'; ctx.fillRect(0, 0, k.W, k.H);
  for (let i = 0; i < 40; i++) k.dot(k.rand(i) * k.W, k.rand(i + 50) * 600, 3, '#fff7d6', 0.6);
}
// A — đầu ma lai (ruột thòng) bay khỏi cái thân không đầu, mình sốc: "MA LAI CÓ THẬT?"
export function a(k) {
  night(k);
  k.char(1060, 1180, 640, { body: 'woman', outfit: 'dress', color: '#7a6a8a', color2: '#d9d4cb', hair: 'long', noHead: true, shadow: false });
  k.prop('malai', 1520, 330, 620, { guts: true, cute: true });
  k.char(330, 1300, 780, { ...ME, face: 'shock', pose: 'point', shadow: false });
  big(k, 'MA LAI', 560, 170, 180, '#e4572e');
  big(k, 'CÓ THẬT?', 560, 360, 140, '#fff3d6');
}
// B — cái thân ngồi chờ, đầu bay mất: "AI TRÔNG CÁI THÂN?"
export function b(k) {
  night(k);
  k.char(560, 1200, 760, { body: 'woman', outfit: 'dress', color: '#7a6a8a', color2: '#d9d4cb', hair: 'long', noHead: true, shadow: false });
  k.prop('malai', 1500, 640, 680, { guts: true, cute: true });
  big(k, 'AI TRÔNG', 1300, 170, 150, '#fff3d6');
  big(k, 'CÁI THÂN?', 1300, 340, 150, '#e4572e');
}
// C — dân làng chỉ tay vào một người: "BỊ ĐỒN LÀ MA"
export function c(k) {
  const { ctx } = k;
  ctx.fillStyle = '#e9b98a'; ctx.fillRect(0, 0, k.W, k.H); ctx.fillStyle = '#9a7a5a'; ctx.fillRect(0, 880, k.W, 200);
  k.char(1500, 1250, 820, { body: 'woman', outfit: 'dress', color: '#3b3f5a', color2: '#c9a24a', hair: 'bun', hairColor: '#e9e4dc', face: 'sad', shadow: false });
  for (let i = 0; i < 3; i++) k.char(240 + i * 260, 1150, 480, { body: 'man', outfit: 'tunic', color: ['#2e86de', '#3bb273', '#8e5bd3'][i], color2: '#f6c344', hair: 'short', face: 'angry', pose: 'point', shadow: false });
  big(k, 'BỊ ĐỒN', 560, 170, 170, '#fff3d6');
  big(k, 'LÀ MA', 560, 360, 170, '#e4572e');
}
