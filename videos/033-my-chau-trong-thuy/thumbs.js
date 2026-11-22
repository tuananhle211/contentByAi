// Thumbnail tập 033 (render: node scripts/thumbs.mjs 033-my-chau-trong-thuy). Mẫu chính: a.
export const style = 'clean';
const ADV = { body: 'big', outfit: 'tunic', color: '#4a4a5a', color2: '#c9a24a', hat: 'helmet', hair: 'short', beard: true, cape: '#2b2f3d' };
const TT = { body: 'man', outfit: 'robe', color: '#2e6da4', color2: '#e9e4dc', hair: 'topknot', hat: 'band' };
const MC = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'long', hat: 'flower', cape: '#f4efe6' };
const big = (k, s, x, y, size, color, o = {}) => k.text(s, x, y, { size, font: 'title', color, outline: '#3b2f2a', outlineWidth: size * 0.16, ...o });

// A — An Dương Vương sững sờ, nỏ thần tắt phép: NỎ THẦN CÓ THẬT?
export function a(k) {
  k.backdrop('sunset', { ground: 900 });
  k.char(470, 1080, 880, { ...ADV, face: 'shock', pose: 'hold' });
  k.prop('crossbow', 760, 560, 420, { glow: true });
  big(k, 'NỎ THẦN', 1360, 240, 200, '#fff3c4');
  big(k, 'CÓ THẬT?', 1360, 900, 190, '#e4572e');
  k.vignette(0.3);
}

// B — kho mũi tên đồng: 1 VẠN MŨI TÊN
export function b(k) {
  k.backdrop('day', { ground: 760 });
  k.rect(200, 600, 900, 520, { fill: '#5a3d26', fillStyle: 'solid', width: 6, seed: 5 });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) k.prop('arrowhead', 280 + c * 150, 700 + r * 140, 180, { rotate: (k.rand(r * 6 + c) - 0.5) * 0.8 });
  big(k, '1 VẠN', 1450, 260, 210, '#fff3c4');
  big(k, 'MŨI TÊN', 1450, 520, 170, '#e4572e');
  big(k, 'CỔ LOA', 1450, 780, 130, '#fff3c4');
}

// C — Trọng Thủy cười đắc ý cạnh Mỵ Châu: TRÁO LẪY!
export function c(k) {
  k.backdrop('sunset', { ground: 900 });
  k.char(380, 1060, 760, { ...MC, face: 'sad', pose: 'stand' });
  k.char(820, 1060, 820, { ...TT, face: 'smug', pose: 'hips', flip: true });
  big(k, 'TRÁO', 1450, 260, 220, '#fff3c4');
  big(k, 'LẪY!', 1450, 560, 220, '#e4572e');
  big(k, 'MỴ CHÂU – TRỌNG THỦY', 1450, 860, 70, '#fff3c4');
}
