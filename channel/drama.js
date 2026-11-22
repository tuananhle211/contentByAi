// Bộ dựng cảnh drama gia đình (hoạt hình chuyển động, dọc 1080×1920): nhân vật cố định, phòng ăn, bàn cơm, máy quay.
// Dùng: import { ME, LAN, cam, roomBack, table, closeBg, soDo } from '/channel/drama.js';
// Vùng phụ đề y≈1420 — để trống phần giữa dưới khi có thể.

// Mẹ chồng: áo bà ba tím than, tóc búi bạc.
export const ME = { body: 'woman', outfit: 'tunic', color: '#5b2d5f', color2: '#c9a0d6', hair: 'bun', hairColor: '#9a948e', plain: true, blush: false, skin: '#eec39c' };
// Con dâu: áo xanh nhạt, tóc dài.
export const LAN = { body: 'woman', outfit: 'tunic', color: '#7fb3d5', color2: '#ffffff', hair: 'long', hairColor: '#2a1c15', plain: true };

// Máy quay: phóng s lần quanh điểm (cx, cy) của khung gốc, đưa điểm đó về giữa màn hình.
export function cam(k, cx, cy, s, fn) {
  k.group({ x: k.W / 2 - cx * s, y: k.H / 2 - cy * s, s }, fn);
}

// Phần sau của phòng ăn (tường, cửa sổ mưa đêm, tranh chữ, đèn treo) — vẽ trong toạ độ khung gốc 1080×1920.
export function roomBack(k, o = {}) {
  const { ctx } = k;
  const g = ctx.createLinearGradient(0, 0, 0, 1250);
  g.addColorStop(0, '#d9c19c'); g.addColorStop(1, '#c4a77c');
  ctx.fillStyle = g; ctx.fillRect(-400, -400, 1880, 1650);
  // ốp gỗ chân tường
  ctx.fillStyle = '#7a4e33'; ctx.fillRect(-400, 1020, 1880, 240);
  ctx.fillStyle = '#5e3a25'; ctx.fillRect(-400, 1020, 1880, 14);
  // sàn gỗ
  ctx.fillStyle = '#5a3b28'; ctx.fillRect(-400, 1250, 1880, 1100);
  ctx.strokeStyle = 'rgba(0,0,0,0.18)'; ctx.lineWidth = 4;
  for (let y = 1300; y < 2300; y += 90) { ctx.beginPath(); ctx.moveTo(-400, y); ctx.lineTo(1480, y); ctx.stroke(); }

  // cửa sổ đêm mưa
  const wx = 70, wy = 150, ww = 330, wh = 430;
  const sky = ctx.createLinearGradient(0, wy, 0, wy + wh);
  sky.addColorStop(0, '#141b33'); sky.addColorStop(1, '#2d3a63');
  ctx.fillStyle = sky; ctx.fillRect(wx, wy, ww, wh);
  if (o.lightning != null) { const u = k.t - k.cue(o.lightning); if (u > 0 && u < 0.5) { ctx.fillStyle = `rgba(220,230,255,${0.8 * (1 - u / 0.5) * (u < 0.08 || u > 0.16 ? 1 : 0.3)})`; ctx.fillRect(wx, wy, ww, wh); } }
  k.rain(wx, wy, ww, wh, { n: 45, len: 46 });
  ctx.strokeStyle = '#4a2f1f'; ctx.lineWidth = 22; ctx.strokeRect(wx, wy, ww, wh);
  ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh); ctx.moveTo(wx, wy + wh / 2); ctx.lineTo(wx + ww, wy + wh / 2); ctx.stroke();
  // rèm
  ctx.fillStyle = '#8c2f2f';
  for (const [x0, d] of [[wx - 40, 1], [wx + ww + 40, -1]]) { ctx.beginPath(); ctx.moveTo(x0, wy - 40); ctx.lineTo(x0 + d * 70, wy - 40); ctx.quadraticCurveTo(x0 + d * 30, wy + wh * 0.5, x0 + d * 60, wy + wh + 40); ctx.lineTo(x0, wy + wh + 40); ctx.closePath(); ctx.fill(); }

  // tranh chữ "Gia hoà vạn sự hưng" (mỉa mai)
  ctx.save(); ctx.translate(820, 380);
  ctx.fillStyle = '#4a2f1f'; ctx.fillRect(-170, -140, 340, 280);
  ctx.fillStyle = '#b8322a'; ctx.fillRect(-150, -120, 300, 240);
  ctx.restore();
  k.text('GIA HOÀ', 820, 335, { size: 58, font: 'title', color: '#f3cf6a' });
  k.text('VẠN SỰ HƯNG', 820, 420, { size: 46, font: 'title', color: '#f3cf6a' });

  // đèn treo + quầng sáng ấm
  const lx = 540;
  ctx.strokeStyle = '#2b2b2b'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(lx, -400); ctx.lineTo(lx, 120); ctx.stroke();
  ctx.fillStyle = '#e0a640'; ctx.beginPath(); ctx.moveTo(lx - 50, 120); ctx.lineTo(lx + 50, 120); ctx.lineTo(lx + 110, 200); ctx.lineTo(lx - 110, 200); ctx.closePath(); ctx.fill();
  const glow = ctx.createRadialGradient(lx, 230, 10, lx, 230, 760);
  glow.addColorStop(0, 'rgba(255,214,140,0.55)'); glow.addColorStop(0.4, 'rgba(255,200,120,0.18)'); glow.addColorStop(1, 'rgba(255,200,120,0)');
  ctx.fillStyle = glow; ctx.fillRect(lx - 800, -400, 1600, 1500);
  ctx.fillStyle = '#fff6d8'; ctx.beginPath(); ctx.ellipse(lx, 203, 60, 12, 0, 0, Math.PI * 2); ctx.fill();
}

function bowl(k, x, y, s, jump = 0, steam = true) {
  const { ctx } = k;
  y -= jump;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#fbfbf8'; ctx.beginPath(); ctx.ellipse(0, -18, 46, 26, 0, Math.PI, 0); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-50, -18); ctx.quadraticCurveTo(-44, 22, 0, 24); ctx.quadraticCurveTo(44, 22, 50, -18); ctx.closePath();
  ctx.fillStyle = '#f2f0ea'; ctx.fill(); ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 4; ctx.stroke();
  ctx.strokeStyle = '#3d7fc4'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-44, 0); ctx.quadraticCurveTo(0, 10, 44, 0); ctx.stroke();
  ctx.restore();
  if (steam) k.steam(x, y - 40 * s, s * 0.8, { alpha: 0.8 });
}

// Bàn ăn: mặt bàn (topY) + mép trước che phần dưới nhân vật. jump = độ nảy của bát đĩa (cú đập bàn).
export function table(k, topY, o = {}) {
  const { ctx } = k;
  const x0 = o.x0 ?? 20, x1 = o.x1 ?? 1060, d = o.depth ?? 110, s = o.scale ?? 1, jump = o.jump ?? 0;
  ctx.fillStyle = '#8a5634'; ctx.beginPath(); ctx.moveTo(x0 + 30, topY); ctx.lineTo(x1 - 30, topY); ctx.lineTo(x1, topY + d); ctx.lineTo(x0, topY + d); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,220,160,0.18)'; ctx.fillRect(x0 + 60, topY + 6, x1 - x0 - 120, 10);
  ctx.fillStyle = '#5e3a25'; ctx.fillRect(x0, topY + d, x1 - x0, 1920);
  ctx.fillStyle = '#4a2d1c'; ctx.fillRect(x0, topY + d, x1 - x0, 16);
  if (o.dishes !== false) {
    const cx = (x0 + x1) / 2;
    // đĩa cá giữa bàn
    ctx.save(); ctx.translate(cx, topY + d * 0.5 - jump * 0.6);
    ctx.fillStyle = '#fbfbf8'; ctx.beginPath(); ctx.ellipse(0, 0, 120 * s, 34 * s, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 4; ctx.stroke();
    ctx.fillStyle = '#d9822b'; ctx.beginPath(); ctx.ellipse(-10 * s, -6 * s, 80 * s, 20 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(60 * s, -6 * s); ctx.lineTo(100 * s, -26 * s); ctx.lineTo(100 * s, 14 * s); ctx.closePath(); ctx.fill();
    ctx.restore();
    for (const bx of o.bowls ?? [cx - 300 * s, cx + 300 * s]) bowl(k, bx, topY + d * 0.55, s, jump, o.steam !== false);
  }
}

// Nền cận mặt: tường ấm mờ, đốm sáng đèn, mép cửa sổ mưa. side = 'left' | 'right' (phía cửa sổ).
export function closeBg(k, o = {}) {
  const { ctx, W, H } = k;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, o.top ?? '#c9ac82'); g.addColorStop(1, o.bottom ?? '#8e6c4a');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const wx = o.side === 'right' ? W - 260 : -80;
  ctx.fillStyle = '#1b2442'; ctx.fillRect(wx, 120, 340, 760);
  k.rain(wx, 120, 340, 760, { n: 40, len: 70, width: 5 });
  ctx.strokeStyle = '#3d281b'; ctx.lineWidth = 30; ctx.strokeRect(wx, 120, 340, 760);
  for (let i = 0; i < 6; i++) {
    const x = 120 + k.rand(i + 3) * 840, y = 150 + k.rand(i + 13) * 600, r = 60 + k.rand(i + 23) * 90;
    const b = ctx.createRadialGradient(x, y, 0, x, y, r);
    b.addColorStop(0, 'rgba(255,220,150,0.35)'); b.addColorStop(1, 'rgba(255,220,150,0)');
    ctx.fillStyle = b; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
}

// Viền tối mềm cho khung dọc (k.vignette vốn tính cho khung ngang).
export function vig(k, a = 0.5) {
  const { ctx, W, H } = k;
  const g = ctx.createRadialGradient(W / 2, H * 0.45, W * 0.3, W / 2, H * 0.45, H * 0.72);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
}

// Sổ đỏ (giấy chứng nhận quyền sử dụng đất) tại (x, y), cỡ s, xoay r.
export function soDo(k, x, y, s = 1, r = 0) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(-112, -72, 236, 156);
  ctx.fillStyle = '#b3201e'; ctx.fillRect(-120, -80, 240, 160);
  ctx.strokeStyle = '#e8c35a'; ctx.lineWidth = 5; ctx.strokeRect(-108, -68, 216, 136);
  ctx.fillStyle = '#e8c35a'; ctx.beginPath(); ctx.arc(0, -28, 22, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#b3201e'; ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? 6 : 15; ctx.lineTo(Math.cos(a) * rr, -28 + Math.sin(a) * rr); }
  ctx.closePath(); ctx.fill();
  ctx.restore();
  k.group({ x, y, r, s }, () => k.text('SỔ ĐỎ', 0, 32, { size: 40, font: 'title', color: '#f3cf6a' }));
}
