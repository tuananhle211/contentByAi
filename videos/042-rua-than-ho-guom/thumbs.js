// Thumbnail tập 042 (render: node scripts/thumbs.mjs 042-rua-than-ho-guom). Mẫu chính: a.
export const style = 'clean';
const VUA = { body: 'big', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'crown', hair: 'topknot', beard: true, cape: '#b5482c' };
const big = (k, s, x, y, size, color, o = {}) => k.text(s, x, y, { size, font: 'title', color, outline: '#3b2f2a', outlineWidth: size * 0.16, ...o });

// A — rùa vàng ngậm gươm nổi giữa hồ, vua sững sờ: RÙA THẦN CÓ THẬT?
export function a(k) {
  k.backdrop('sunset', { ground: 560 });
  k.water(600, { color: '#5f9e8f', amp: 8 });
  k.prop('turtle', 460, 660, 680, { glow: true });
  k.prop('sword', 700, 560, 320, { glow: true, rotate: 1.2 });
  k.water(760, { color: '#5f9e8f', amp: 6, alpha: 0.7 });
  big(k, 'RÙA THẦN', 1390, 230, 165, '#fff3c4');
  big(k, 'CÓ THẬT?', 1390, 480, 165, '#e4572e');
  big(k, 'HỒ GƯƠM', 1390, 780, 120, '#fff3c4');
  k.vignette(0.3);
}

// B — vua ném gươm: NÉM GƯƠM?!
export function b(k) {
  k.backdrop('day', { ground: 700 });
  k.water(740, { color: '#5f9e8f', amp: 8 });
  k.char(480, 1080, 860, { ...VUA, face: 'shock', pose: 'shout' });
  k.prop('sword', 900, 360, 320, { glow: true, rotate: 2.2 });
  big(k, 'KHÔNG', 1400, 230, 160, '#fff3c4');
  big(k, 'TRẢ GƯƠM?', 1400, 490, 135, '#e4572e');
  big(k, 'sách cổ nhất 1431', 1400, 780, 76, '#fff3c4');
}

// C — rùa vàng vs con giải: RÙA THẬT ≠ RÙA TRUYỆN
export function c(k) {
  k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#e9e2d0', fillStyle: 'solid', stroke: 'none', seed: 1 });
  k.prop('turtle', 440, 660, 560, { glow: true });
  k.prop('softshell', 1480, 660, 600);
  big(k, '≠', 1010, 640, 240, '#e4572e');
  big(k, 'TRUYỆN', 440, 240, 130, '#fff3c4');
  big(k, 'CỤ RÙA THẬT', 1440, 240, 120, '#fff3c4');
}
