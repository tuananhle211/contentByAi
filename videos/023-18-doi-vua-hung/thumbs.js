// Thumbnail tập 023 (render: node scripts/thumbs.mjs 023-18-doi-vua-hung). Mẫu chính: a.
export const style = 'clean';
const KING = { body: 'man', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'kingfeather', beard: true, hair: 'short', cape: '#b5482c' };
const OLD = { ...KING, beard: 'long', beardColor: '#ffffff', hairColor: '#e9e4dc' };
const big = (k, s, x, y, size, color, o = {}) => k.text(s, x, y, { size, font: 'title', color, outline: '#3b2f2a', outlineWidth: size * 0.16, ...o });

// A — vua Hùng già lụ khụ chống gậy: 146 năm một vua?
export function a(k) {
  k.backdrop('sunset', { ground: 900 });
  k.prop('palace', 1500, 640, 640);
  k.char(520, 1060, 900, { ...OLD, prop: 'staff', lean: 0.08, face: 'shock', pose: 'hold' });
  big(k, '146 NĂM', 1290, 230, 200, '#fff3c4');
  big(k, 'MỘT VUA?', 1290, 900, 180, '#e4572e');
  k.vignette(0.3);
}

// B — 18 vua, 2.622 năm?
export function b(k) {
  k.backdrop('day', { ground: 900 });
  for (let i = 0; i < 9; i++) k.char(140 + i * 205, 1000, 300, { ...KING, color: ['#e4572e', '#2e86de', '#f6c344', '#3bb273', '#8e5bd3', '#ef6f9a', '#f08a24', '#1f7a8c', '#b5482c'][i], face: i === 4 ? 'shock' : 'smug', pose: 'stand' });
  big(k, '18 VUA', 960, 200, 190, '#fff3c4');
  big(k, '2.622 NĂM?', 960, 450, 190, '#e4572e');
}

// C — Vua Hùng có thật?
export function c(k) {
  k.backdrop('dawn', { ground: 900 });
  k.prop('drumface', 1400, 560, 820, { spin: 0 });
  k.char(480, 1060, 820, { ...KING, face: 'smug', pose: 'hips' });
  big(k, 'VUA HÙNG', 1300, 170, 170, '#fff3c4');
  big(k, 'CÓ THẬT?', 1300, 960, 190, '#e4572e');
}
