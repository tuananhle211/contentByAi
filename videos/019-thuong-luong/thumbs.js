// Thumbnail tập 019 (render: node scripts/thumbs.mjs 019-thuong-luong). Mẫu chính: a.
export const style = 'clean';
const DAN = (c, extra = {}) => ({ body: 'man', outfit: 'bare', color: c, color2: '#f6c344', hair: 'short', hat: 'feather', ...extra });
const big = (k, s, x, y, size, color, o = {}) => k.text(s, x, y, { size, font: 'title', color, outline: '#3b2f2a', outlineWidth: size * 0.16, ...o });

// A — thuồng luồng trồi lên, người xăm mình sốc.
export function a(k) {
  k.backdrop('sunset', { ground: 900 });
  k.prop('thuongluong', 1180, 560, 1000, { glow: true, open: 0.8, flip: true });
  k.water(760, { color: '#4f7fb0', alpha: 0.9 });
  k.char(420, 1060, 780, { ...DAN('#b5482c'), tattoo: true, face: 'shock', pose: 'shout' });
  big(k, 'XĂM MÌNH', 1250, 170, 170, '#fff3c4');
  big(k, 'ĐỂ SỐNG?', 1250, 960, 170, '#e4572e');
  k.vignette(0.35);
}

// B — Thuồng luồng có thật?
export function b(k) {
  k.backdrop('night', { ground: 900 });
  k.prop('thuongluong', 960, 560, 1100, { glow: true, open: 0.7 });
  k.water(780, { color: '#2f5f8f', alpha: 0.9 });
  big(k, 'THUỒNG LUỒNG', 960, 170, 170, '#fff3c4');
  big(k, 'CÓ THẬT?', 960, 950, 190, '#e4572e');
  k.vignette(0.4);
}

// C — Hoá ra là cá sấu?
export function c(k) {
  k.backdrop('day', { ground: 900 });
  k.prop('crocodile', 1250, 640, 1000, { open: 0.9, flip: true });
  k.water(760, { color: '#4f8a7a', alpha: 0.85 });
  k.char(380, 1040, 720, { ...DAN('#3b6ea5', { outfit: 'tunic', hat: 'non' }), face: 'shock', pose: 'facepalm' });
  big(k, 'HOÁ RA LÀ', 1200, 170, 150, '#fff3c4');
  big(k, 'CÁ SẤU?', 1200, 960, 190, '#e4572e');
}
