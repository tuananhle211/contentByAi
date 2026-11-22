// Thumbnail tập 006 (render: node scripts/thumbs.mjs 006-con-rong-chau-tien). Mẫu chính: a.
export const style = 'clean';
const AUCO = { body: 'woman', outfit: 'dress', color: '#fdf0f3', color2: '#ef6f9a', hair: 'long', hat: 'flower' };
const LLQ = { body: 'big', outfit: 'robe', color: '#1f7a8c', color2: '#f6c344', hair: 'long', hairColor: '#1d3f66', hat: 'crown', cape: '#155a6a' };
const big = (k, s, x, y, size, color, o = {}) => k.text(s, x, y, { size, font: 'title', color, outline: '#3b2f2a', outlineWidth: size * 0.16, ...o });

// A — Âu Cơ sốc trước bọc trăm trứng.
export function a(k) {
  k.backdrop('dawn', { ground: 900 });
  k.prop('eggsac', 820, 520, 560, { glow: 1 });
  k.char(1560, 1000, 760, { ...AUCO, face: 'shock', pose: 'facepalm', blush: true });
  big(k, '100', 330, 250, 250, '#e4572e');
  big(k, 'CÁI TRỨNG?', 760, 940, 150, '#fff3c4');
}

// B — Rồng + Tiên = ?
export function b(k) {
  k.backdrop('day', { ground: 900 });
  k.prop('dragon', 560, 520, 760);
  k.char(1550, 1000, 700, { ...AUCO, face: 'happy', pose: 'wave', blush: true });
  big(k, 'RỒNG + TIÊN', 960, 170, 150, '#e4572e');
  big(k, '= ?', 1110, 740, 200, '#fff3c4');
}

// C — Đồng bào là gì?
export function c(k) {
  k.backdrop('sunset', { ground: 900 });
  k.prop('eggsac', 520, 600, 560, { glow: 0.8 });
  k.char(1660, 1000, 620, { ...LLQ, face: 'smug', pose: 'point', flip: true });
  big(k, '"ĐỒNG BÀO"', 1040, 200, 150, '#fff3c4');
  big(k, 'LÀ GÌ?', 1040, 370, 150, '#e4572e');
}
