// Bộ dùng chung cho Shorts kênh Nói Có Sách (dọc 1080×1920): hai nhân vật cố định, chữ, khung tranh luận, meta gốc.
// Dùng: import { SG, ONG, CHAU, T, quote, vs, shortMeta } from '/channel/noi-co-sach.js';
// Vùng nội dung y 150–1300 (phụ đề ở y≈1420).

export const SG = 1250; // mặt đất Shorts
export const RED = '#c0392b'; // phe 1 — lời xưa
export const BLUE = '#2e6da4'; // phe 2 — phản biện
export const PAPER = '#f7f1e3';

// Ông Đồ: áo the xanh đen, khăn, râu tóc bạc — bảo vệ lời xưa.
export const ONG = { body: 'man', outfit: 'robe', color: '#2f3e5c', color2: '#e8b84a', hat: 'band', hair: 'topknot', hairColor: '#e9e4dc', beard: 'long', beardColor: '#ffffff' };
// Cháu Gen Z: cháu gái áo cam, tóc dài — phản biện.
export const CHAU = { body: 'woman', outfit: 'tunic', color: '#f08a24', color2: '#2e6da4', hair: 'long', hairColor: '#3a2a20' };

// Chữ to có viền kem.
export const T = (k, s, x, y, size, color, p, o = {}) =>
  k.text(s, x, y, { size, font: 'title', color, fx: o.fx ?? 'pop', p, outline: '#fffaf0', outlineWidth: size * 0.14, maxWidth: o.maxWidth ?? 1000 });

// Trang sách mở chứa câu trích + nguồn (dòng nhỏ bên dưới).
export function quote(k, text, src, x, y, w, h, p, o = {}) {
  if (p <= 0) return;
  k.group({ x, y, s: 0.6 + 0.4 * k.ease.back(Math.min(1, p)), a: Math.min(1, p * 2) }, () => {
    k.rect(-w / 2, -h / 2, w, h, { fill: o.fill ?? '#fffaf0', fillStyle: 'solid', stroke: o.stroke ?? '#3b2f2a', width: 6, seed: o.seed ?? 6201 });
    k.line(0, -h / 2 + 10, 0, h / 2 - 10, { stroke: '#d8ccb4', width: 4, seed: (o.seed ?? 6201) + 1 });
    k.text(text, 0, -24, { size: o.size ?? 64, font: 'title', color: o.color ?? '#3b2f2a', maxWidth: w - 80 });
    if (src) k.text(src, 0, h / 2 - 44, { size: 34, color: '#8a7a66', maxWidth: w - 60 });
  });
}

// Hai nửa nền đỏ / xanh + chữ VS ở giữa.
export function vs(k, p, y = 760) {
  k.rect(0, 0, k.W / 2, k.H, { fill: RED, fillStyle: 'solid', stroke: 'none', alpha: 0.12 * p, seed: 6210 });
  k.rect(k.W / 2, 0, k.W / 2, k.H, { fill: BLUE, fillStyle: 'solid', stroke: 'none', alpha: 0.12 * p, seed: 6211 });
  k.burst(540, y, 70, 'VS', { p, size: 70, seed: 6212 });
}

// Meta gốc cho Shorts của kênh; ghép thêm title/description/tags/hashtags/voices/images.
export const shortMeta = (o) => ({
  style: 'clean',
  speed: 1.2,
  lead: 0.2,
  tail: 0.3,
  pause: 0.12,
  format: 'short',
  captions: true,
  voice: 'vi-VN-NamMinhNeural',
  rate: '+0%',
  paper: PAPER,
  music: 'assets/music/background.mp3',
  musicVolume: 0.07,
  sfxVolume: 0.5,
  transition: 'fade',
  ...o,
  voices: {
    ong: { voice: 'vi-VN-NamMinhNeural', pitch: '-16Hz', rate: '-8%' },
    chau: { voice: 'vi-VN-HoaiMyNeural', pitch: '+10Hz', rate: '+8%' },
    ...(o.voices ?? {}),
  },
  tags: [...(o.tags ?? []), 'các cụ nói', 'người xưa nói', 'triết lý gia đình', 'nói có sách'],
  hashtags: ['shorts', ...(o.hashtags ?? []), 'noicosach'],
});
