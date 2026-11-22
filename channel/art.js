// Ảnh đại diện (800x800) và ảnh bìa kênh (2560x1440). Render: npm run art
import { C } from '/engine/kit.js';

export function avatar(k) {
  k.rect(0, 0, k.W, k.H, { fill: C.yellow, fillStyle: 'solid', stroke: 'none', seed: 1 });
  k.circle(400, 400, 320, { fill: C.white, fillStyle: 'solid', width: 10, seed: 2 });
  k.icon('bulb', 380, 390, 420, { fill: C.yellow });
  // cây bút chì vẽ ra bóng đèn
  k.group({ x: 520, y: 560, r: -0.75, s: 0.8 }, () => {
    k.rect(0, -24, 250, 48, { fill: '#f2c14e', fillStyle: 'solid', width: 6, seed: 3 });
    k.poly([[0, -24], [-60, 0], [0, 24]], { fill: '#f3d9b1', fillStyle: 'solid', width: 6, seed: 4 });
    k.rect(250, -24, 40, 48, { fill: C.pink, fillStyle: 'solid', width: 6, seed: 5 });
  });
}

export function banner(k) {
  // Vùng an toàn hiển thị trên mọi thiết bị: 1546x423 ở chính giữa.
  k.rect(0, 0, k.W, k.H, { fill: C.sky, fillStyle: 'solid', stroke: 'none', seed: 1 });
  k.rect(-60, -60, k.W + 120, k.H + 120, { fill: '#6dbbe9', stroke: 'none', gap: 26, fillWeight: 6, rough: 2.5, seed: 2 });
  const cy = k.H / 2;
  k.icon('sun', 560, cy - 90, 260);
  k.icon('bulb', 2000, cy - 60, 240);
  k.icon('cloud', 300, cy + 360, 300);
  k.icon('rocket', 2300, cy + 330, 260, { rotate: 0.4 });
  k.icon('earth', 860, cy + 330, 160);
  k.icon('brain', 1700, cy + 330, 160);
  k.text('Vẽ Là Hiểu', k.W / 2, cy - 60, { size: 210, font: 'title', color: C.white, outline: C.ink, outlineWidth: 30 });
  k.text('Mọi câu hỏi "tại sao" — vẽ ra là hiểu', k.W / 2, cy + 110, { size: 74, font: 'title', color: C.ink, outline: C.white, outlineWidth: 16 });
}

// Mẫu 2: chữ "Vẽ" lớn viết tay, gạch chân bút đỏ, nền xanh trời.
export function avatar2(k) {
  k.rect(0, 0, k.W, k.H, { fill: C.sky, fillStyle: 'solid', stroke: 'none', seed: 1 });
  k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#6dbbe9', stroke: 'none', gap: 22, fillWeight: 5, rough: 2.5, seed: 2 });
  k.circle(400, 400, 300, { fill: C.white, fillStyle: 'solid', width: 10, seed: 3 });
  k.text('Vẽ', 400, 370, { size: 330, font: 'title', color: C.ink });
  k.curve([[215, 545], [400, 575], [590, 530]], { stroke: C.red, width: 16, seed: 4 });
}

// Mẫu 3: người que nảy ra ý tưởng (bóng đèn trên đầu), nền vàng.
export function avatar3(k) {
  k.rect(0, 0, k.W, k.H, { fill: C.yellow, fillStyle: 'solid', stroke: 'none', seed: 1 });
  k.circle(400, 400, 320, { fill: C.white, fillStyle: 'solid', width: 10, seed: 2 });
  k.icon('bulb', 400, 280, 210, { fill: C.yellow });
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI / 2 + (i - 3) * 0.42;
    k.line(400 + Math.cos(a) * 130, 265 + Math.sin(a) * 130, 400 + Math.cos(a) * 160, 265 + Math.sin(a) * 160, { stroke: C.orange, width: 9, seed: 10 + i });
  }
  k.icon('person', 400, 545, 270, { fill: C.white });
}
