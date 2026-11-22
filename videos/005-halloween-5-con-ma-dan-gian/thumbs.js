// Thumbnail tập Halloween (render: node scripts/thumbs.mjs 005-halloween-5-con-ma-dan-gian). Mẫu chính: a.
import { C } from '/engine/kit.js';

export const style = 'clean';
const GHOST = { body: 'woman', outfit: 'dress', color: '#eef2f0', color2: '#c9d6d0', hair: 'ghost', skin: '#dfe8e4', face: 'blank', float: true, alpha: 0.9 };
const big = (k, s, x, y, size, color, o = {}) => k.text(s, x, y, { size, font: 'title', color, outline: '#0d0d14', outlineWidth: size * 0.17, ...o });

function base(k) {
  k.backdrop('night', { ground: 900 });
  k.prop('moon', 1620, 200, 420);
}

// A — Đầu ma lai bay dưới trăng + cây đa.
export function a(k) {
  base(k);
  k.prop('banyan', 300, 600, 760);
  k.prop('malai', 820, 520, 640);
  k.fog({ y: 920, alpha: 0.45 });
  k.darkness(0.45, [{ x: 1620, y: 200, r: 700 }, { x: 820, y: 520, r: 520 }]);
  big(k, '5 CON MA', 1440, 560, 160, '#e4572e');
  big(k, 'ĐÁNG SỢ NHẤT', 1440, 720, 104, '#fff3c4');
  big(k, 'DÂN GIAN VIỆT', 1440, 850, 92, '#9fe8c8');
}

// B — Bóng ma cạnh giếng làng.
export function b(k) {
  base(k);
  k.prop('well', 760, 860, 360);
  k.char(760, 760, 560, GHOST);
  k.fog({ y: 920, alpha: 0.4 });
  k.darkness(0.5, [{ x: 760, y: 560, r: 520 }, { x: 1620, y: 200, r: 500 }]);
  big(k, 'AI ĐỨNG', 1400, 420, 130, '#fff3c4');
  big(k, 'CẠNH GIẾNG?', 1400, 580, 118, '#e4572e');
}

// C — Ma lai có thật?
export function c(k) {
  k.ctx.fillStyle = '#0f1220'; k.ctx.fillRect(0, 0, k.W, k.H);
  k.prop('malai', 640, 540, 820);
  k.darkness(0.3, [{ x: 640, y: 540, r: 600 }]);
  big(k, 'MA LAI', 1420, 420, 190, '#e4572e');
  big(k, 'CÓ THẬT?', 1420, 620, 150, '#fff3c4');
}
