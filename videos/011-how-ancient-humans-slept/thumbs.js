// Thumbnail tập 011 (render: node scripts/thumbs.mjs 011-how-ancient-humans-slept). Mẫu chính: a.
// Bản 03/11: vật chính to + mặt cận cảnh + vòng/mũi tên đỏ; chữ bổ sung cho tiêu đề, không lặp lại.
export const style = 'clean';
import { P, YOU, ANC, tRays, tText, tTag, tRing, tArrow, tBust } from '/channel/long-story-drawn.js';

const stars = (k, n = 40) => { for (let i = 0; i < n; i++) k.dot(k.rand(i) * k.W, k.rand(i + 70) * k.H, 3 + k.rand(i + 9) * 4, '#fff7d6', 0.8); };
// Đồng hồ treo tường to: kim giờ chỉ h, kim phút chỉ m.
function clock(k, x, y, r, h, m) {
  const { ctx } = k;
  k.circle(x, y, r, { fill: '#fffaf0', fillStyle: 'solid', stroke: '#111', width: r * 0.08, rough: 0, seed: 1 });
  ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#111';
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; ctx.beginPath(); ctx.arc(Math.sin(a) * r * 0.8, -Math.cos(a) * r * 0.8, r * (i % 3 ? 0.035 : 0.065), 0, Math.PI * 2); ctx.fill(); }
  ctx.lineCap = 'round'; ctx.strokeStyle = '#111';
  const hand = (a, len, w) => { ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(a) * len, -Math.cos(a) * len); ctx.stroke(); };
  hand(((h % 12) / 12) * Math.PI * 2 + (m / 720) * Math.PI * 2, r * 0.48, r * 0.09);
  hand((m / 60) * Math.PI * 2, r * 0.7, r * 0.055);
  ctx.beginPath(); ctx.arc(0, 0, r * 0.07, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

// A — Đồng hồ 3:00 khổng lồ giữa đêm, linh vật tỉnh như sáo: "AWAKE AT 3?" · ngủ hai giấc
export function a(k) {
  tRays(k, 1250, 470, '#283A6E', '#32468a');
  stars(k);
  k.prop('moon', 1800, 120, 180);
  clock(k, 1250, 450, 330, 3, 0);
  tRing(k, 1400, 380, 150, 120, { rotate: -0.5 });
  tBust(k, 1690, 850, 165, YOU, { face: 'blank', pose: { l: [-160, -30], r: [160, 30] } });
  tText(k, [['AWAKE', '#fff', 190]], 470, 230); tText(k, [['AT 3?', P.yellow, 260]], 470, 460);
  tTag(k, '1ST SLEEP · 2ND SLEEP', 470, 860, { size: 60 });
}
// B — Ổ cỏ 200.000 năm có "thuốc chống côn trùng": "BUG SPRAY BED"
export function b(k) {
  tRays(k, 1250, 640, P.orange, '#f7963f');
  k.ctx.fillStyle = P.sand; k.ctx.fillRect(0, 900, k.W, 180);
  k.prop('grassbed', 1150, 700, 1000, { leaves: true, ash: true });
  tRing(k, 1150, 690, 330, 150, { rotate: -0.05 });
  tArrow(k, 560, 640, 780, 690);
  tBust(k, 1770, 680, 125, YOU, { face: 'smug' });
  tText(k, [['BUG SPRAY', '#fff', 140]], 540, 130); tText(k, [['BED', P.red, 240]], 540, 330);
  tTag(k, '200,000 YEARS OLD', 1450, 320, { size: 62 });
}
// C — Cả trại chỉ ngủ cùng lúc 18 phút, luôn có người thức: "18 MINUTES"
export function c(k) {
  tRays(k, 1250, 600, '#322B5E', '#3c3470');
  stars(k, 30);
  k.ctx.fillStyle = '#2a2440'; k.ctx.fillRect(0, 930, k.W, 150);
  k.prop('campfire', 1250, 900, 240, { fire: 0.7 });
  for (const [x, f] of [[820, false], [1420, true]]) k.group({ x, y: 940, r: f ? Math.PI / 2 : -Math.PI / 2 }, () => k.char(0, 0, 300, { ...ANC(), face: 'sleep', shadow: false }));
  k.char(1060, 935, 440, { ...ANC(), face: 'calm', shadow: false, pose: 'hips' });
  tRing(k, 1060, 720, 140, 230, { rotate: 0 });
  tBust(k, 1760, 560, 130, YOU, { face: 'shock' });
  tText(k, [['18', P.yellow, 330]], 420, 280); tText(k, [['MINUTES', '#fff', 150]], 420, 520);
  tTag(k, 'ALL ASLEEP AT ONCE', 420, 700, { size: 50, fill: P.red, color: '#fff' });
}
