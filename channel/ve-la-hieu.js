// Bộ dùng chung cho Shorts kênh Vẽ Là Hiểu (dọc 1080×1920): preset nhân vật, chữ, meta gốc.
// Dùng: import { SG, KING, OLD, DAN, T, shortMeta } from '/channel/ve-la-hieu.js';
// Vùng nội dung y 150–1300 (phụ đề ở y≈1420).

export const SG = 1250; // mặt đất Shorts
export const RIVER = '#5b9bd5';
export const KC = ['#e4572e', '#2e86de', '#f6c344', '#3bb273', '#8e5bd3', '#ef6f9a', '#f08a24', '#1f7a8c'];

export const KING = { body: 'man', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'kingfeather', beard: true, hair: 'short', cape: '#b5482c' };
export const OLD = { ...KING, beard: 'long', beardColor: '#ffffff', hairColor: '#e9e4dc' };
export const LLQ = { body: 'big', outfit: 'robe', color: '#1f7a8c', color2: '#f6c344', hair: 'long', hairColor: '#1d3f66', hat: 'crown', cape: '#155a6a' };
export const LANG = (c, extra = {}) => ({ body: 'man', outfit: 'robe', color: c, color2: '#f6c344', hat: 'band', hair: 'topknot', ...extra });
export const LIEU = { body: 'man', outfit: 'tunic', color: '#8a6a3a', color2: '#e8d9a8', hair: 'topknot', hat: 'feather' };
export const SCHOLAR = (c) => ({ body: 'man', outfit: 'robe', color: c, color2: '#f6c344', hat: 'band', hair: 'topknot', beard: true });
export const DAN = (c, extra = {}) => ({ body: 'man', outfit: 'bare', color: c, color2: '#f6c344', hair: 'short', hat: 'feather', ...extra });
export const VO = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'bun' };
export const THAN = { body: 'man', outfit: 'robe', color: '#fffaf0', color2: '#f6c344', hair: 'bun', hairColor: '#ffffff', beard: 'long', beardColor: '#ffffff', float: true, alpha: 0.92 };

// Chữ to có viền kem.
export const T = (k, s, x, y, size, color, p, o = {}) =>
  k.text(s, x, y, { size, font: 'title', color, fx: o.fx ?? 'pop', p, outline: '#fffaf0', outlineWidth: size * 0.14, maxWidth: o.maxWidth ?? 1000 });

// Con dấu đỏ nghiêng.
export function stamp(k, x, y, text, p, o = {}) {
  const s = Math.max(0.01, k.ease.back(Math.min(1, p)) * (1 + 0.6 * (1 - Math.min(1, p))));
  k.group({ x, y, s, r: o.r ?? -0.1, a: Math.min(1, p * 3) }, () => {
    const w = o.w ?? 460;
    k.rect(-w / 2, -60, w, 120, { stroke: o.color ?? '#c0392b', width: 8, fillStyle: 'solid', seed: 77 });
    k.text(text, 0, 4, { size: o.size ?? 60, font: 'title', color: o.color ?? '#c0392b' });
  });
}

// Meta gốc cho Shorts của kênh; ghép thêm title/description/tags/hashtags/voices/images.
export const shortMeta = (o) => ({
  style: 'clean',
  speed: 1.2, // 03/11: người dùng muốn nhanh hơn chút (trước 1.1)
  lead: 0.2, // khoảng lặng ngắn giữa cảnh cho liền mạch
  tail: 0.3,
  pause: 0.12,
  format: 'short',
  captions: true,
  voice: 'vi-VN-NamMinhNeural',
  rate: '+0%',
  images: { poster: 'assets/poster.jpg' },
  music: 'assets/music/background.mp3',
  musicVolume: 0.08,
  sfxVolume: 0.5,
  transition: 'fade',
  ...o,
  tags: [...(o.tags ?? []), 'truyền thuyết việt nam', 'shorts', 'vẽ là hiểu'],
  hashtags: ['shorts', ...(o.hashtags ?? []), 'suviet'],
});
