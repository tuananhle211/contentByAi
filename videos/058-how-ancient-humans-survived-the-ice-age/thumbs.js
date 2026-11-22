// Thumbnail tập 058 (render: node scripts/thumbs.mjs 058-how-ancient-humans-survived-the-ice-age). Mẫu chính: a.
// Bản 03/11: vật chính to + mặt cận cảnh + vòng/mũi tên đỏ; chữ bổ sung cho tiêu đề, không lặp lại.
export const style = 'clean';
import { P, YOU, tRays, tText, tTag, tRing, tArrow, tBust } from '/channel/long-story-drawn.js';

const FURYOU = { ...YOU, outfit: 'robe', color: '#8a6a4a', color2: '#5a4030' };
function snowfall(k, n = 60) { for (let i = 0; i < n; i++) k.dot(k.rand(i) * k.W, k.rand(i + 70) * k.H, 5 + k.rand(i + 140) * 6, '#ffffff', 0.85); }
// Lều xương voi ma mút: mái da + ngà cong + hàng hàm dưới làm chân tường.
function boneHut(k, x, y, s) {
  k.group({ x, y, s: s / 100 }, () => {
    k.ellipse(0, -34, 210, 130, { fill: '#7a5a3a', fillStyle: 'solid', width: 5, seed: 1 });
    k.ellipse(0, -10, 54, 70, { fill: '#2a1d14', fillStyle: 'solid', width: 4, seed: 9 });
    const { ctx } = k; ctx.lineCap = 'round';
    for (let i = 0; i < 8; i++) { // ngà cong dựng quanh mái
      const a = Math.PI + ((i + 0.5) / 8) * Math.PI, bx = Math.cos(a) * 104, tx = Math.cos(a) * 52, ty = Math.sin(a) * 100, bend = (i < 4 ? -1 : 1) * 26;
      for (const [w, c] of [[17, '#2b2b2b'], [11, '#f6eedc']]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(bx, 0); ctx.quadraticCurveTo((bx + tx) / 2 + bend, ty / 2, tx, ty); ctx.stroke(); }
    }
    for (let i = 0; i < 7; i++) k.ellipse(-96 + i * 32, 8, 34, 20, { fill: '#f6eedc', fillStyle: 'solid', width: 4, seed: 20 + i });
  });
}

// A — Lều xương khổng lồ, con voi ma mút ngó vào lo lắng: "HOUSE OF BONES"
export function a(k) {
  tRays(k, 1200, 700, '#a9cfe6', '#c3def0');
  k.ctx.fillStyle = '#f2f6f8'; k.ctx.fillRect(0, 900, k.W, 180);
  boneHut(k, 1180, 960, 760);
  k.prop('elephant', 1720, 820, 420, { fill: '#7a5a3a', tusks: 2, flip: true });
  k.sweat(1640, 640, 1.6);
  tArrow(k, 760, 520, 900, 760);
  tBust(k, 330, 640, 150, FURYOU, { face: 'shock', pose: { l: [-150, -40], r: [150, 40] } });
  snowfall(k);
  tText(k, [['HOUSE OF', '#fff', 150], ['BONES', P.red, 210]], 520, 150);
}
// B — Cái kim có lỗ: "THIS SAVED YOU"
export function b(k) {
  tRays(k, 1250, 540, '#283A6E', '#33498a');
  snowfall(k, 40);
  k.line(700, 1000, 1800, 120, { stroke: '#f1e6cc', width: 70, rough: 0, seed: 3 });
  k.line(700, 1000, 1800, 120, { stroke: '#d8c8a6', width: 20, rough: 0, seed: 4 });
  k.ellipse(1700, 200, 70, 34, { fill: '#283A6E', fillStyle: 'solid', stroke: '#111', width: 6, rough: 0, seed: 5 });
  k.ctx.save(); k.ctx.translate(1700, 200); k.ctx.rotate(-0.67); k.ctx.restore();
  tRing(k, 1700, 200, 150, 110);
  tBust(k, 1450, 720, 170, FURYOU, { face: 'shock' });
  tTag(k, '40,000 YEARS OLD', 430, 900, { size: 62 });
  tText(k, [['THIS', '#fff', 190], ['SAVED', P.yellow, 190], ['YOU', P.red, 230]], 430, 220);
}
// C — 14 độ lạnh hơn, linh vật run cầm cái kim: "14° COLDER"
export function c(k) {
  tRays(k, 1350, 560, '#cfe3ef', '#e3eff6');
  k.ctx.fillStyle = '#f2f6f8'; k.ctx.fillRect(0, 930, k.W, 150);
  k.prop('mountain', 1650, 900, 700, { snow: true, fill: '#9aa8b0' });
  k.prop('thermo', 1700, 560, 520, { level: 0.08, fill: '#3a7bd5' });
  tBust(k, 1180, 560, 190, FURYOU, { face: 'shock', pose: { l: [-30, 20], r: [30, -20] } });
  k.sweat(1350, 420, 2);
  snowfall(k, 70);
  tText(k, [['14°', '#3a7bd5', 300], ['COLDER', '#fff', 170]], 470, 300);
  tTag(k, 'NO HEATING', 470, 800, { size: 70, fill: P.red, color: '#fff' });
}
