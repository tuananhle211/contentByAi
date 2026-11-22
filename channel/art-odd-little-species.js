// Ảnh đại diện kênh Odd Little Species (800x800, YouTube cắt tròn). Render: npm run art -- odd-little-species
// Linh vật: tóc ngắn nâu đen, băng đô xanh lá, áo vàng mù tạt (skill kenh-ancient-humans).
export const style = 'clean';

const P = { orange: '#F58220', sky: '#7FB5D5', grass: '#4E9A45', sand: '#D2B488', night: '#283A6E', indigo: '#322B5E', red: '#E0302B', yellow: '#F4C430', cream: '#F5F1E6', ink: '#3b2f2a' };
const mascot = (k, o = {}) => k.char(o.x ?? 400, 1225, 1020, { body: 'man', outfit: 'tunic', color: '#D9A21B', color2: P.grass, hair: 'short', hairColor: '#2b1d16', hat: 'band', face: 'smug', shadow: false, ...o });
const bg = (k, color) => { k.ctx.fillStyle = color; k.ctx.fillRect(0, 0, k.W, k.H); };
// Rìu đá cầm tay (biface) — dấu hiệu "tiền sử" dễ đọc ở cỡ nhỏ.
const handaxe = (k, x, y, s, r = 0) => k.group({ x, y, s, r }, () => {
  const { ctx } = k;
  ctx.beginPath(); ctx.moveTo(0, -60); ctx.bezierCurveTo(34, -30, 40, 30, 0, 50); ctx.bezierCurveTo(-40, 30, -34, -30, 0, -60); ctx.closePath();
  ctx.fillStyle = '#9a9a9a'; ctx.fill(); ctx.lineWidth = 9; ctx.strokeStyle = P.ink; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.fillStyle = '#b8b8b8';
  for (const [a, b, c] of [[-12, -28, 10], [10, -2, 12], [-8, 22, 9]]) { ctx.beginPath(); ctx.ellipse(a, b, c, c * 0.6, 0.5, 0, Math.PI * 2); ctx.fill(); }
});
const disc = (k, x, y, r, color) => { const { ctx } = k; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); };

// Mẫu 1: hoàng hôn tiền sử — nền cam, mặt trời sau đầu, giơ rìu đá với mặt "biết tuốt".
export function avatar(k) {
  bg(k, P.orange);
  disc(k, 400, 330, 300, '#F79A45');
  disc(k, 400, 330, 235, P.yellow);
  mascot(k, { pose: { l: [12, 6], r: [150, 20] } });
  handaxe(k, 640, 250, 1.6, 0.25);
}

// Mẫu 2: tò mò — nền kem, giơ tay ngạc nhiên, dấu hỏi đỏ.
export function avatar2(k) {
  bg(k, P.cream);
  disc(k, 400, 400, 330, P.sky);
  k.icon('question', 610, 170, 210, { stroke: P.red });
  mascot(k, { face: 'shock', pose: { l: [12, 6], r: [150, 20] } });
}

// Mẫu 3: lửa trại ban đêm — nền chàm, sao, ánh lửa hắt lên.
export function avatar3(k) {
  bg(k, P.indigo);
  for (let i = 0; i < 26; i++) k.dot(k.rand(i) * 800, k.rand(i + 40) * 380, 3 + k.rand(i + 80) * 4, '#fff7d6', 0.85);
  disc(k, 270, 650, 330, '#4a3a6e');
  disc(k, 270, 650, 200, '#6b4a6e');
  mascot(k, { face: 'happy', x: 470 });
  k.icon('fire', 250, 600, 240);
}
