// Thumbnail tập 031 (render: node scripts/thumbs.mjs 031-how-ancient-humans-stayed-clean). Mẫu chính: a.
// Bản 03/11: vật chính to + mặt cận cảnh + vòng/mũi tên đỏ; chữ bổ sung cho tiêu đề, không lặp lại.
export const style = 'clean';
import { P, YOU, tRays, tText, tTag, tRing, tArrow, tBust } from '/channel/long-story-drawn.js';

const ROMAN = { body: 'man', outfit: 'robe', color: '#f5f1e6', color2: '#b03a2e', hair: 'short', hairColor: '#3a2a1e', skin: '#e0b48a' };
// Cục ghét (dầu + mồ hôi + bụi) nhỏ giọt.
function gunk(k, x, y, s) {
  k.group({ x, y, s: s / 100 }, () => {
    k.ellipse(0, 0, 90, 46, { fill: '#8a7a3a', fillStyle: 'solid', stroke: '#2b2b2b', width: 4, rough: 0, seed: 7 });
    for (const [dx, h] of [[-26, 40], [6, 62], [30, 30]]) k.ellipse(dx, 16 + h / 2, 14, h, { fill: '#8a7a3a', fillStyle: 'solid', stroke: '#2b2b2b', width: 4, rough: 0, seed: 8 + dx });
    k.ellipse(-16, -6, 18, 8, { fill: '#b8a85a', fillStyle: 'solid', stroke: 'none', rough: 0, seed: 11 });
  });
}

// A — Cây nạo strigil to với cục ghét, hũ bán: "SWEAT FOR SALE"
export function a(k) {
  tRays(k, 1250, 520, '#7FB5D5', '#94c3dd');
  k.prop('strigil', 1260, 470, 900, { rotate: -0.1 });
  gunk(k, 1560, 300, 220);
  k.prop('pot', 1600, 790, 380, { fill: '#c98a5a' });
  tRing(k, 1560, 330, 170, 130);
  tTag(k, 'GREEK GYMS', 1600, 700, { size: 54, fill: P.yellow });
  tBust(k, 900, 860, 130, YOU, { face: 'gross' });
  tText(k, [['SWEAT', P.red, 210], ['FOR', '#fff', 150], ['SALE?', '#fff', 190]], 450, 250);
}
// B — Vò nước tiểu giặt áo: "WASHED IN PEE"
export function b(k) {
  tRays(k, 1260, 520, '#F4C430', '#f7d35e');
  k.prop('pot', 1260, 560, 900, { fill: '#c98a5a' });
  k.ellipse(1260, 210, 260, 70, { fill: '#e8d23a', fillStyle: 'solid', stroke: '#2b2b2b', width: 6, rough: 0, seed: 3 });
  for (const [x, y, r] of [[1180, 205, 14], [1320, 220, 10], [1250, 195, 8]]) k.circle(x, y, r, { fill: '#fff59a', fillStyle: 'solid', stroke: '#2b2b2b', width: 3, rough: 0, seed: x });
  // áo trắng vắt qua miệng vò, ngâm một nửa
  k.poly([[1300, 215], [1420, 150], [1500, 200], [1490, 420], [1440, 400], [1400, 450], [1420, 230], [1340, 240]], { fill: '#f5f1e6', fillStyle: 'solid', stroke: '#2b2b2b', width: 6, rough: 0, seed: 4 });
  // mùi
  const { ctx } = k; ctx.lineCap = 'round';
  for (const x of [1120, 1240, 1360]) for (const [w, c] of [[18, '#2b2b2b'], [9, '#9bd36a']]) { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(x, 130); ctx.bezierCurveTo(x - 40, 90, x + 40, 60, x, 20); ctx.stroke(); }
  tRing(k, 1260, 210, 330, 120);
  tBust(k, 1720, 860, 120, YOU, { face: 'shock', flip: true });
  tText(k, [['WASHED', '#fff', 180], ['IN PEE', P.red, 230]], 470, 300);
  tTag(k, 'ROMAN LAUNDRY', 470, 760, { size: 60 });
}
// C — Bể tắm La Mã nước xanh rêu có giun: "WORMY BATHS"
export function c(k) {
  tRays(k, 1260, 400, '#e9dcc4', '#f2e8d4');
  for (const x of [880, 1820]) { k.ctx.fillStyle = '#f5efe0'; k.ctx.fillRect(x - 60, 0, 120, 560); k.ctx.strokeStyle = '#2b2b2b'; k.ctx.lineWidth = 6; k.ctx.strokeRect(x - 60, -10, 120, 570); }
  k.rect(760, 520, 1180, 600, { fill: '#7f9a5a', fillStyle: 'solid', stroke: '#2b2b2b', width: 8, rough: 0, seed: 5 });
  tBust(k, 1150, 620, 150, { ...ROMAN, color: '#e0b48a' }, { face: 'blank' });
  k.rect(760, 720, 1180, 400, { fill: '#7f9a5a', fillStyle: 'solid', stroke: 'none', rough: 0, seed: 6 });
  const { ctx } = k; ctx.lineCap = 'round';
  for (const [x, y] of [[1560, 830], [1380, 980], [1760, 990]]) for (const [w, c] of [[40, '#2b2b2b'], [26, '#e6a0a8']]) {
    ctx.lineWidth = w; ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(x - 110, y); ctx.bezierCurveTo(x - 50, y - 80, x, y + 80, x + 60, y); ctx.quadraticCurveTo(x + 90, y - 30, x + 120, y - 16); ctx.stroke();
  }
  tRing(k, 1550, 905, 290, 165);
  tText(k, [['WORMY', '#fff', 180], ['BATHS', P.red, 200]], 400, 300);
  tTag(k, 'ROMAN TIMES', 400, 640, { size: 60 });
}
