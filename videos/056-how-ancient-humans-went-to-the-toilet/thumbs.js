// Thumbnail tập 056 (render: node scripts/thumbs.mjs 056-how-ancient-humans-went-to-the-toilet). Mẫu chính: a.
// Bản 03/11: vật chính to + mặt cận cảnh + vòng/mũi tên đỏ; chữ bổ sung cho tiêu đề, không lặp lại.
export const style = 'clean';
import { P, YOU, tRays, tText, tTag, tRing, tArrow, tBust } from '/channel/long-story-drawn.js';

const ROMAN = { body: 'man', outfit: 'robe', color: '#f5f1e6', color2: '#b03a2e', hair: 'short', hairColor: '#3a2a1e', skin: '#e0b48a', shadow: false };
// Que gỗ + miếng bọt biển vàng (tersorium).
function sponge(k, x, y, s) {
  k.line(x, y + s, x + s * 0.12, y - s * 0.35, { stroke: P.brown, width: s * 0.07, rough: 0, seed: 3 });
  k.ellipse(x + s * 0.14, y - s * 0.45, s * 0.38, s * 0.28, { fill: P.yellow, fillStyle: 'solid', width: 7, rough: 0.6, seed: 4 });
  for (let i = 0; i < 9; i++) k.dot(x + s * 0.14 + (k.rand(i) - 0.5) * s * 0.28, y - s * 0.45 + (k.rand(i + 9) - 0.5) * s * 0.18, s * 0.018, '#c99a1a', 1);
}
// Ghế đá dài, khe chìa khoá ở mặt trước, không vách ngăn.
function bench(k, y, x0 = 0, w = 1920, n = 5) {
  k.rect(x0, y, w, 70, { fill: '#e8dcc4', fillStyle: 'solid', width: 6, rough: 0, seed: 1 });
  k.rect(x0, y + 70, w, 400, { fill: '#cdbb98', fillStyle: 'solid', width: 6, rough: 0, seed: 2 });
  for (let i = 0; i < n; i++) {
    const cx = x0 + (i + 0.5) * (w / n);
    k.rect(cx - 22, y + 70, 44, 150, { fill: '#2a1f1a', fillStyle: 'solid', width: 4, rough: 0, seed: 15 + i }); // khe chìa khoá mặt trước
  }
}

// A — Miếng bọt biển trên que, khoanh đỏ, linh vật nhăn mặt: "SHARED SPONGE?"
export function a(k) {
  tRays(k, 1250, 520, '#7FB5D5', '#94c3de');
  sponge(k, 1180, 520, 620);
  tRing(k, 1270, 245, 280, 210);
  tBust(k, 1640, 700, 170, YOU, { face: 'gross', pose: { l: [-150, -60], r: [20, 30] } });
  tText(k, [['SHARED', '#fff', 170], ['SPONGE?', P.yellow, 170]], 500, 300, { maxWidth: 860 });
  tTag(k, 'ANCIENT ROME', 500, 720, { size: 70, fill: P.red, color: '#fff' });
}
// B — Hàng ghế xí La Mã, người lạ ngồi sát nhau: "NO WALLS?!"
export function b(k) {
  const { ctx } = k; ctx.fillStyle = '#e9dcc4'; ctx.fillRect(0, 0, k.W, k.H);
  for (let i = 0; i < 5; i++) k.char(700 + i * 270, 900, 560, { ...ROMAN, face: i % 2 ? 'laugh' : 'happy', flip: i % 2 === 1, color2: ['#b03a2e', '#2e6db0', '#b03a2e', '#4E9A45', '#8a3ab0'][i] });
  bench(k, 700, 560, 1360, 5);
  tTag(k, 'ANCIENT ROME', 1240, 1000, { size: 64 });
  tBust(k, 300, 640, 170, YOU, { face: 'shock', pose: { l: [-150, -40], r: [150, 40] } });
  tText(k, [['NO WALLS?!', P.red, 180]], 1240, 140, { maxWidth: 1300 });
}
// C — Ba hòn sỏi gốm (pessoi) của Hy Lạp: "3 STONES?!"
export function c(k) {
  tRays(k, 1250, 600, '#e9d3a8', '#f2e2c0');
  const stones = [[1000, 700, 260], [1320, 760, 230], [1250, 470, 210]];
  stones.forEach(([x, y, s], i) => { // mảnh gốm tròn (pessoi)
    k.ellipse(x, y, s, s * 0.82, { fill: ['#c0603a', '#a8502e', '#cf7a4a'][i], fillStyle: 'solid', width: 7, rough: 0.5, seed: 30 + i });
    k.ellipse(x - s * 0.15, y - s * 0.14, s * 0.32, s * 0.16, { fill: '#e8a27a', fillStyle: 'solid', stroke: 'none', seed: 40 + i });
  });
  tRing(k, 1180, 640, 340, 280);
  tBust(k, 1700, 720, 160, YOU, { face: 'shock' });
  tText(k, [['3', P.red, 340], ['STONES?!', '#fff', 150]], 450, 280, { maxWidth: 800 });
  tTag(k, 'ANCIENT GREECE', 450, 880, { size: 64 });
}
