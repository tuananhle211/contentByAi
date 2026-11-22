// Thumbnail tập 088 (render: node scripts/thumbs.mjs 088-how-ancient-humans-hunted-mammoths). Mẫu chính: a.
// Quy tắc skill `thumbnail` (11/11): MỘT câu hỏi ≤ 2 dòng, không nhãn phụ; vật chính ≥ 40% khung.
export const style = 'clean';
import { P, YOU, tRays, tText, tRing, tBust, mammoth } from '/channel/long-story-drawn.js';

const FURYOU = { ...YOU, outfit: 'robe', color: '#8a6a4a', color2: '#5a4030' };
function ground(k, y, c = P.sand) { k.ctx.fillStyle = c; k.ctx.fillRect(0, y, k.W, k.H - y); k.ctx.fillStyle = '#2b1d16'; k.ctx.fillRect(0, y, k.W, 6); }
function spear(k, x1, y1, x2, y2) {
  k.line(x1, y1, x2, y2, { stroke: '#8B5A2B', width: 14, rough: 0, seed: Math.round(x1) });
  const a = Math.atan2(y2 - y1, x2 - x1);
  k.poly([[x2 + Math.cos(a) * 40, y2 + Math.sin(a) * 40], [x2 + Math.cos(a + 2.6) * 22, y2 + Math.sin(a + 2.6) * 22], [x2 + Math.cos(a - 2.6) * 22, y2 + Math.sin(a - 2.6) * 22]], { fill: '#c9c2b4', fillStyle: 'solid', width: 4, rough: 0, seed: Math.round(y1) });
}

// A — Voi ma mút khổng lồ lao tới, linh vật bé xíu cầm giáo: "ALL YOU HAVE / IS A SPEAR?"
export function a(k) {
  tRays(k, 1300, 560, P.orange, '#f7973f');
  ground(k, 930);
  mammoth(k, 1360, 1010, 1000, { flip: true, face: 'angry' });
  k.char(330, 1000, 340, { ...FURYOU, face: 'shock', prop: 'spear', shadow: false });
  tRing(k, 330, 830, 120, 190, { rotate: 0 });
  tText(k, [['ALL YOU HAVE', '#fff', 115], ['IS A SPEAR?', P.yellow, 135]], 560, 130, { maxWidth: 1000 });
}
// B — Voi ma mút cắm 8 mũi giáo vẫn bỏ đi (Naco, Arizona): "8 SPEARS / AND IT ESCAPED?"
export function b(k) {
  tRays(k, 1150, 620, '#7FB5D5', '#94c3de');
  ground(k, 930);
  mammoth(k, 1200, 1000, 880, { face: 'angry' });
  const hits = [[860, 600], [940, 560], [1020, 540], [1100, 530], [900, 690], [990, 660], [1080, 640], [1170, 600]];
  hits.forEach(([x, y], i) => spear(k, x - 120 - (i % 3) * 20, y - 150 + (i % 2) * 40, x, y + 80));
  tRing(k, 1010, 600, 290, 210);
  tBust(k, 300, 780, 150, FURYOU, { face: 'shock', pose: { l: [-150, -40], r: [150, 40] } });
  tText(k, [['8 SPEARS…', '#fff', 120], ['AND IT ESCAPED?', P.yellow, 130]], 1000, 100, { maxWidth: 1700 });
}
// C — Voi ma mút cạnh kim tự tháp: "STILL ALIVE / AFTER THE PYRAMIDS?"
export function c(k) {
  tRays(k, 1400, 560, '#E9B85A', '#f0c770');
  ground(k, 930, '#D2B488');
  k.poly([[1460, 360], [1880, 930], [1040, 930]], { fill: '#d9b26a', fillStyle: 'solid', stroke: '#2b1d16', width: 6, rough: 0, seed: 11 });
  k.poly([[1460, 360], [1880, 930], [1520, 930]], { fill: '#c49a52', fillStyle: 'solid', stroke: '#2b1d16', width: 6, rough: 0, seed: 12 });
  mammoth(k, 600, 1000, 760, { face: 'calm' });
  tText(k, [['STILL ALIVE AFTER', '#fff', 115], ['THE PYRAMIDS?', P.red, 135]], 960, 110, { maxWidth: 1800 });
}
