// Thumbnail tập 2 (render: node scripts/thumbs.mjs 004-son-tinh-thuy-tinh). Mẫu chính: a.
import { C } from '/engine/kit.js';

export const style = 'clean';
const SON = { body: 'big', outfit: 'robe', color: '#4f8a3f', color2: '#c9a24a', hair: 'topknot', hat: 'mountain', cape: '#6b4a2d' };
const THUY = { body: 'big', outfit: 'robe', color: '#2f78c4', color2: '#9fd3f2', hair: 'long', hairColor: '#1d3f66', hat: 'wave', cape: '#1d4f8a', prop: 'trident' };
const MY = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'long', hat: 'flower' };

function sky(k, stops) {
  const g = k.ctx.createLinearGradient(0, 0, 0, k.H);
  stops.forEach(([a, c]) => g.addColorStop(a, c));
  k.ctx.fillStyle = g; k.ctx.fillRect(0, 0, k.W, k.H);
}
function glow(k, x, y, r, color) {
  const g = k.ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)');
  k.ctx.fillStyle = g; k.ctx.fillRect(x - r, y - r, r * 2, r * 2);
}
const big = (k, s, x, y, size, color, o = {}) => k.text(s, x, y, { size, font: 'title', color, outline: '#2b211c', outlineWidth: size * 0.16, ...o });
function stamp(k, str, x, y, r, size) {
  k.group({ x, y, r }, () => {
    const b = k.text(str, 0, 4, { size, font: 'title', color: '#fff', p: 0 });
    k.rect(-b.w / 2 - 30, -b.h / 2 - 12, b.w + 60, b.h + 24, { fill: '#d63a26', stroke: '#fff', width: 8 });
    k.text(str, 0, 4, { size, font: 'title', color: '#fff' });
  });
}

// A — Đối đầu: Sơn Tinh vs Thủy Tinh, Mỵ Nương ở giữa.
export function a(k) {
  sky(k, [[0, '#2a5d8f'], [0.55, '#e9a15b'], [1, '#f6c344']]);
  glow(k, 960, 620, 520, 'rgba(255,230,160,0.8)');
  k.ctx.fillStyle = '#4f7f3a'; k.ctx.beginPath(); k.ctx.moveTo(0, 1080); k.ctx.lineTo(0, 860); k.ctx.quadraticCurveTo(300, 760, 760, 900); k.ctx.lineTo(760, 1080); k.ctx.fill();
  k.water(900, { amp: 14 });
  k.char(380, 1060, 820, { ...SON, face: 'smug', pose: 'hips' });
  k.char(1560, 1080, 840, { ...THUY, face: 'shout', pose: 'fight' });
  k.char(960, 1080, 520, { ...MY, face: 'shock', pose: 'shrug' });
  big(k, 'VÌ GÁI', 960, 150, 170, '#fff3c4');
  big(k, 'HAY VÌ ĐÊ?', 960, 330, 150, C.yellow);
}

// B — Tò mò: voi chín ngà.
export function b(k) {
  sky(k, [[0, '#7ec8f0'], [1, '#f7f3ea']]);
  k.ctx.fillStyle = '#8fb36b'; k.ctx.fillRect(0, 860, k.W, 220);
  k.prop('elephant', 640, 600, 820, { tusks: 9 });
  big(k, 'VOI 9 NGÀ?!', 1360, 230, 150, C.yellow);
  stamp(k, 'SÍNH LỄ BẤT KHẢ THI', 1380, 800, -0.06, 64);
}

// C — Người yêu cũ làm ngập cả nước.
export function c(k) {
  sky(k, [[0, '#1d2a3a'], [1, '#46547a']]);
  k.prop('storm', 420, 200, 380, { rain: 1, bolt: true });
  k.prop('storm', 1500, 160, 340, { rain: 1 });
  k.water(760, { amp: 18 });
  k.prop('palace', 520, 700, 360, { rotate: -0.08 });
  k.char(1380, 1000, 820, { ...THUY, face: 'shout', pose: 'cheer' });
  big(k, 'NGƯỜI YÊU CŨ', 760, 260, 120, '#fff3c4');
  big(k, 'LÀM NGẬP CẢ NƯỚC', 760, 420, 92, C.yellow);
}
