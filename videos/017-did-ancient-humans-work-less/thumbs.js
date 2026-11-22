// Thumbnail tập 017 (render: node scripts/thumbs.mjs 017-did-ancient-humans-work-less). Mẫu chính: a.
// Bản 03/11: vật chính to + mặt cận cảnh + vòng/mũi tên đỏ; chữ bổ sung cho tiêu đề, không lặp lại.
export const style = 'clean';
import { P, YOU, tRays, tText, tTag, tRing, tArrow, tBust } from '/channel/long-story-drawn.js';

const OFFICE = { ...YOU, color: '#5a6b8a', color2: '#9fd3ff' };
// Lịch tuần: 7 ô, n ô đầu tô cam (ngày đi kiếm ăn), phần còn lại xanh "nghỉ".
function week(k, x, y, cw, ch, n) {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const { ctx } = k;
  k.rect(x - 20, y - 20, cw * 7 + 40, ch + 40, { fill: '#fffaf0', fillStyle: 'solid', stroke: '#111', width: 10, rough: 0 });
  days.forEach((d, i) => {
    const cx = x + i * cw;
    ctx.fillStyle = '#7fc46f'; ctx.fillRect(cx + 6, y + 6, cw - 12, ch - 12);
    const f = Math.max(0, Math.min(1, n - i));
    ctx.fillStyle = P.orange; ctx.fillRect(cx + 6, y + 6, (cw - 12) * f, ch - 12);
    ctx.lineWidth = 6; ctx.strokeStyle = '#111'; ctx.strokeRect(cx + 6, y + 6, cw - 12, ch - 12);
    k.text(d, cx + cw / 2, y + ch * 0.28, { size: cw * 0.22, font: 'title', color: '#111' });
  });
}
function clock(k, x, y, r, h, m) {
  const { ctx } = k;
  k.circle(x, y, r, { fill: '#fffaf0', fillStyle: 'solid', stroke: '#111', width: r * 0.08, rough: 0, seed: 1 });
  ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#111';
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; ctx.beginPath(); ctx.arc(Math.sin(a) * r * 0.8, -Math.cos(a) * r * 0.8, r * (i % 3 ? 0.035 : 0.065), 0, Math.PI * 2); ctx.fill(); }
  ctx.lineCap = 'round'; ctx.strokeStyle = '#111';
  const hand = (a, len, w) => { ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(a) * len, -Math.cos(a) * len); ctx.stroke(); };
  hand(((h % 12) / 12) * Math.PI * 2 + (m / 720) * Math.PI * 2, r * 0.48, r * 0.09);
  hand((m / 60) * Math.PI * 2, r * 0.7, r * 0.055);
  ctx.restore();
}

// A — Lịch tuần chỉ 2,5 ngày kiếm ăn (Richard Lee, Kalahari 1963–64): "2.5-DAY WEEK?"
export function a(k) {
  tRays(k, 960, 700, '#5a6b8a', '#66789a');
  week(k, 90, 560, 190, 260, 2.5);
  tRing(k, 565, 690, 170, 190, { rotate: -0.04 });
  tBust(k, 1730, 760, 140, OFFICE, { face: 'angry' });
  tText(k, [['2.5-DAY', P.yellow, 210]], 620, 190, { maxWidth: 1200 }); tText(k, [['WEEK?', '#fff', 160]], 1170, 380);
  tTag(k, 'KALAHARI, 1964', 1050, 960, { size: 60 });
}
// B — Con bò Giáng sinh béo nhất bị chê là gầy: "TOO SKINNY?"
export function b(k) {
  tRays(k, 1150, 600, P.orange, '#f7963f');
  k.ctx.fillStyle = P.sand; k.ctx.fillRect(0, 920, k.W, 160);
  k.prop('ox', 980, 660, 950, { fat: 1 });
  tRing(k, 930, 680, 300, 190, { rotate: -0.08 });
  tBust(k, 1760, 720, 130, YOU, { face: 'blank' });
  tText(k, [['TOO', '#fff', 170]], 300, 200); tText(k, [['SKINNY?', P.red, 190]], 470, 400, { maxWidth: 900 });
  tTag(k, 'THE CHRISTMAS OX', 420, 940, { size: 58 });
}
// C — Keynes 1930 hứa tuần làm 15 giờ: "15 HOURS?"
export function c(k) {
  tRays(k, 1250, 480, '#283A6E', '#33498a');
  clock(k, 1240, 460, 310, 3, 0);
  k.prop('laptop', 1240, 980, 500);
  tRing(k, 1240, 460, 355, 355, { rotate: 0 });
  tBust(k, 1730, 760, 140, OFFICE, { face: 'sad' });
  tText(k, [['15 HOURS', P.yellow, 150]], 410, 300, { maxWidth: 1000 }); tText(k, [['A WEEK?', '#fff', 150]], 410, 480, { maxWidth: 1000 });
  tTag(k, 'PROMISED IN 1930', 410, 680, { size: 56, fill: P.red, color: '#fff' });
}
