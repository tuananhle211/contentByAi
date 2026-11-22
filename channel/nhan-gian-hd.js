// Nhân Gian Chưa Kể — bộ vẽ nền "HD" (nâng cấp từ 15/11 theo yêu cầu: nền chi tiết hơn, bớt đơn sơ).
// Kỹ thuật: nhiều lớp chiều sâu (núi xa nhạt + mờ), chất liệu (rơm, vách đất, gạch, gỗ, đá ong) vẽ bằng nhiều nét nhỏ
// có biến thiên màu cố định theo k.rand, ánh sáng có hướng + bóng đổ, chỉnh màu + hạt phim. Dùng ctx.filter (blur) — hợp GPU.
// Mọi vị trí ngẫu nhiên lấy từ k.rand(seed) để khung hình không nháy.
import { INK } from '/channel/nhan-gian.js';

const T = (k) => k.gt ?? 0;
const R = (k, i) => k.rand(i);
function hex(c) { if (c[0] !== '#') return (c.match(/[\d.]+/g) || [0, 0, 0]).slice(0, 3).map(Number); const n = parseInt(c.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; } // nhận cả '#rrggbb' lẫn 'rgb(r,g,b)'
// Trộn màu hex a→b theo t (0..1), trả rgb().
export function mix(a, b, t) { const A = hex(a), Bc = hex(b); return `rgb(${A.map((v, i) => Math.round(v + (Bc[i] - v) * t)).join(',')})`; }
// Biến thiên độ sáng màu hex: f -1..1.
export function vary(c, f) { const [r, g, b] = hex(c); const m = (v) => Math.max(0, Math.min(255, Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f))); return `rgb(${m(r)},${m(g)},${m(b)})`; }

// ---------- bảng màu theo thời điểm ----------
export const PAL = {
  day: { sky: ['#7fa8c8', '#b9d0dc', '#efe4c8'], far: '#8aa0a8', mid: '#5f7a5a', near: '#4a6a42', light: '#fff1d0', grade: 'rgba(255,236,200,0.06)', sun: { x: 1500, y: 160, c: 'rgba(255,248,220,0.5)' } },
  dusk: { sky: ['#2c2b4c', '#7a5874', '#e6a272'], far: '#6f5f7e', mid: '#433f5a', near: '#2c3a34', light: '#ffc890', grade: 'rgba(255,170,110,0.10)', sun: { x: 1520, y: 600, c: 'rgba(255,190,120,0.55)' } },
  night: { sky: ['#05070f', '#0e1628', '#1e2a44'], far: '#1a2236', mid: '#121a26', near: '#0c1410', light: '#c8d6f0', grade: 'rgba(60,80,140,0.12)', sun: { x: 1560, y: 170, c: 'rgba(220,230,255,0.35)' } },
  storm: { sky: ['#1e2228', '#3a4048', '#5a6068'], far: '#3a4246', mid: '#2a3230', near: '#1e2622', light: '#c8d0d8', grade: 'rgba(80,90,100,0.10)', sun: null },
};

// ---------- bầu trời ----------
export function sky(k, time = 'dusk', horizon = 640) {
  const { ctx, W } = k, P = PAL[time];
  const g = ctx.createLinearGradient(0, 0, 0, horizon); g.addColorStop(0, P.sky[0]); g.addColorStop(0.55, P.sky[1]); g.addColorStop(1, P.sky[2]);
  ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, horizon + 260);
  if (P.sun) { const rg = ctx.createRadialGradient(P.sun.x, P.sun.y, 0, P.sun.x, P.sun.y, 520); rg.addColorStop(0, P.sun.c); rg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = rg; ctx.fillRect(P.sun.x - 520, P.sun.y - 520, 1040, 1040); }
  if (time === 'night') {
    for (let i = 0; i < 90; i++) { ctx.globalAlpha = 0.25 + 0.6 * R(k, i + 9) * (0.6 + 0.4 * Math.sin(T(k) * 1.5 + i)); ctx.fillStyle = '#f4f0dc'; ctx.beginPath(); ctx.arc(R(k, i) * W, R(k, i + 50) * horizon * 0.75, 0.8 + R(k, i + 3) * 1.8, 0, Math.PI * 2); ctx.fill(); }
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#efe8cf'; ctx.beginPath(); ctx.arc(P.sun.x, P.sun.y, 58, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(180,170,140,0.25)'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(P.sun.x - 20 + R(k, i + 70) * 40, P.sun.y - 20 + R(k, i + 71) * 40, 6 + R(k, i) * 8, 0, Math.PI * 2); ctx.fill(); }
  }
  // mây mềm
  ctx.save(); ctx.filter = 'blur(18px)';
  const cc = time === 'night' ? 'rgba(60,70,100,0.35)' : time === 'dusk' ? 'rgba(240,170,150,0.35)' : time === 'storm' ? 'rgba(30,34,40,0.6)' : 'rgba(255,255,255,0.55)';
  ctx.fillStyle = cc;
  for (let i = 0; i < 9; i++) { const x = ((R(k, i + 100) * (W + 600) + T(k) * 4) % (W + 600)) - 300, y = 90 + R(k, i + 101) * horizon * 0.55; ctx.beginPath(); ctx.ellipse(x, y, 160 + R(k, i + 102) * 220, 22 + R(k, i + 103) * 28, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}

// ---------- núi đồi nhiều lớp ----------
// Một dải đồi: đỉnh tại y ± amp, lấp xuống đáy. o.trees = rặng cây/tre trên sống đồi, o.blur.
function ridge(k, y, amp, color, seed, o = {}) {
  const { ctx, W } = k;
  ctx.save(); if (o.blur) ctx.filter = `blur(${o.blur}px)`;
  ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(-200, 1300);
  const pts = [];
  for (let x = -200; x <= W + 200; x += 24) { const yy = y - amp * (0.55 + 0.45 * Math.sin(x / (300 + seed * 37) + seed)) - amp * 0.25 * Math.sin(x / 90 + seed * 3); pts.push([x, yy]); ctx.lineTo(x, yy); }
  ctx.lineTo(W + 200, 1300); ctx.closePath(); ctx.fill();
  if (o.trees) for (let i = 0; i < pts.length; i += 2) { if (R(k, i + seed * 100) < 0.45) continue; const [x, yy] = pts[i], h = 18 + R(k, i + seed * 7) * o.trees; ctx.beginPath(); ctx.ellipse(x, yy - h * 0.4, h * 0.55, h * 0.6, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}
// Bụi tre in bóng: gốc (x, y), cao h, màu c.
export function bambooClump(k, x, y, h, c, seed = 1) {
  const { ctx } = k, t = T(k);
  ctx.save(); ctx.lineCap = 'round';
  const tips = [];
  for (let i = 0; i < 7; i++) {
    const lean = (i - 3) * 0.12 + (R(k, seed + i) - 0.5) * 0.1 + Math.sin(t * 0.7 + i + seed) * 0.015;
    const ex = x + Math.sin(lean) * h * 1.1, ey = y - Math.cos(lean) * h;
    ctx.strokeStyle = vary(c, -0.15); ctx.lineWidth = 3 + R(k, seed + i + 20) * 2.5;
    ctx.beginPath(); ctx.moveTo(x + (i - 3) * 5, y); ctx.quadraticCurveTo(x + (ex - x) * 0.3, y - h * 0.65, ex, ey); ctx.stroke();
    tips.push([ex, ey, lean]);
  }
  // khối lá: nhiều lá nhỏ thuôn rủ xuống, dày ở ngọn
  for (const [ex, ey, lean] of tips) for (let j = 0; j < 46; j++) {
    const u = R(k, seed * 31 + j + ex), v = R(k, seed * 17 + j + ey);
    const lx = ex - Math.sin(lean) * h * 0.45 * v + (u - 0.5) * 70, ly = ey + h * 0.5 * v * v + (R(k, j + seed) - 0.5) * 30;
    ctx.fillStyle = vary(c, (R(k, j + seed * 3) - 0.5) * 0.35);
    ctx.beginPath(); ctx.ellipse(lx, ly, 13, 3.2, 0.5 + (u - 0.5) * 1.6 + Math.sin(t + j) * 0.04, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}
// Cây cau: gốc (x, y), cao h.
export function areca(k, x, y, h, c) {
  const { ctx } = k, t = T(k);
  ctx.save(); ctx.strokeStyle = c; ctx.lineCap = 'round';
  ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 12, y - h * 0.5, x + 4, y - h); ctx.stroke();
  for (let i = 0; i < 7; i++) {
    const side = i % 2 ? 1 : -1, spread = 30 + i * 12, sw = Math.sin(t * 0.9 + i) * 3;
    const ex = x + 4 + side * (70 + spread * 0.6), ey = y - h + 40 + i * 6 + sw;
    ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x + 4, y - h); ctx.quadraticCurveTo(x + 4 + side * spread * 0.5, y - h - 40, ex, ey); ctx.stroke();
    ctx.lineWidth = 1.6;
    for (let j = 1; j < 9; j++) { const u = j / 9, px = x + 4 + (ex - x - 4) * u, py = y - h - 40 * Math.sin(Math.PI * u) * 0.8 + (ey - y + h) * u; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + side * 6, py + 18 - u * 6); ctx.stroke(); }
  }
  ctx.restore();
}
// Cảnh xa: 3 lớp đồi + rặng tre, cau (nhạt dần theo khoảng cách).
export function landscape(k, time = 'dusk', horizon = 640) {
  const P = PAL[time];
  ridge(k, horizon - 70, 70, P.far, 1, { blur: 2.5, trees: 18 });
  ridge(k, horizon - 10, 46, mix(P.far, P.mid, 0.55), 2, { blur: 1.2, trees: 26 });
  for (let i = 0; i < 7; i++) bambooClump(k, 1220 + i * 110 + R(k, i + 300) * 40, horizon + 30, 150 + R(k, i + 301) * 70, mix(P.far, P.mid, 0.65), 40 + i * 13);
  ridge(k, horizon + 40, 22, P.mid, 3, { trees: 12 });
}

// ---------- chất liệu ----------
// Mái rạ: đa giác [trái-dưới, trái-trên, phải-trên, phải-dưới]. Vẽ nền + sợi rơm + nóc buộc + mép lởm chởm.
export function thatch(k, x0, yTop, x1, yEave, over = 70, base = '#8a6c42', seed = 5) {
  const { ctx } = k, w = x1 - x0;
  const L = [x0 - over, yEave], TL = [x0 + w * 0.12, yTop], TR = [x1 - w * 0.12, yTop], Rr = [x1 + over, yEave];
  ctx.save();
  ctx.beginPath(); ctx.moveTo(...L); ctx.lineTo(...TL); ctx.lineTo(...TR); ctx.lineTo(...Rr);
  for (let x = Rr[0]; x >= L[0]; x -= 14) ctx.lineTo(x, yEave + 6 + R(k, seed + Math.round(x)) * 16);
  ctx.closePath();
  const g = ctx.createLinearGradient(0, yTop, 0, yEave); g.addColorStop(0, vary(base, 0.18)); g.addColorStop(1, vary(base, -0.22));
  ctx.fillStyle = g; ctx.fill(); ctx.clip();
  const rim = ctx.createLinearGradient(x0, 0, x1 + over, 0); rim.addColorStop(0, 'rgba(0,0,0,0.18)'); rim.addColorStop(0.7, 'rgba(0,0,0,0)'); rim.addColorStop(1, 'rgba(255,200,140,0.18)'); ctx.fillStyle = rim; ctx.fillRect(x0 - over, yTop - 20, w + over * 2, yEave - yTop + 60);
  // sợi rơm theo chiều dốc
  for (let i = 0; i < 900; i++) {
    const u = R(k, seed * 1000 + i), v = R(k, seed * 1000 + i + 5000);
    const yy = yTop + v * (yEave - yTop + 20), half = (TR[0] - TL[0]) / 2 + (yy - yTop) / (yEave - yTop) * (over + w * 0.12);
    const xx = (x0 + x1) / 2 + (u - 0.5) * 2 * half, slope = (xx - (x0 + x1) / 2) / Math.max(1, half) * 0.5;
    ctx.strokeStyle = vary(base, (R(k, i + 77) - 0.45) * 0.45); ctx.globalAlpha = 0.4; ctx.lineWidth = 1.2 + R(k, i + 9) * 1.2;
    ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + slope * 16, yy + 14 + R(k, i + 3) * 14); ctx.stroke();
  }
  ctx.globalAlpha = 1;
  // các lớp rơm chồng (dải tối ngang)
  for (let j = 1; j < 5; j++) { const yy = yTop + (yEave - yTop) * j / 5; ctx.fillStyle = 'rgba(30,20,10,0.16)'; ctx.fillRect(L[0], yy, Rr[0] - L[0], 6); }
  ctx.restore();
  // nóc buộc bó
  ctx.fillStyle = vary(base, -0.25); ctx.fillRect(TL[0] - 10, yTop - 14, TR[0] - TL[0] + 20, 22);
  for (let x = TL[0]; x < TR[0]; x += 46) { ctx.fillStyle = vary(base, -0.45); ctx.fillRect(x, yTop - 16, 6, 26); }
  // rơm thõng ở mép
  ctx.strokeStyle = vary(base, -0.2); ctx.lineWidth = 1.6;
  for (let x = L[0]; x < Rr[0]; x += 9) { const l = 8 + R(k, seed + x) * 18; ctx.beginPath(); ctx.moveTo(x, yEave + 4); ctx.lineTo(x + (R(k, seed + x + 1) - 0.5) * 8, yEave + 4 + l); ctx.stroke(); }
}
// Vách đất trát: chữ nhật + vết ố, vết nứt, chân tường ẩm, lộ gạch.
export function mudWall(k, x, y, w, h, base = '#9a7c5c', seed = 9) {
  const { ctx } = k;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, vary(base, -0.25)); g.addColorStop(0.25, base); g.addColorStop(1, vary(base, -0.2));
  ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
  ctx.filter = 'blur(10px)';
  for (let i = 0; i < 26; i++) { ctx.fillStyle = R(k, seed + i) > 0.5 ? 'rgba(60,40,25,0.16)' : 'rgba(255,240,210,0.08)'; ctx.beginPath(); ctx.ellipse(x + R(k, seed + i + 40) * w, y + R(k, seed + i + 80) * h, 30 + R(k, i + 3) * 90, 14 + R(k, i + 7) * 40, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.filter = 'none';
  ctx.fillStyle = 'rgba(40,28,18,0.35)'; ctx.fillRect(x, y + h - 40, w, 40); // chân tường ẩm
  for (let i = 0; i < 4; i++) { const bx = x + R(k, seed + i + 200) * (w - 120), by = y + h * (0.35 + R(k, seed + i + 201) * 0.4); for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { if (R(k, seed + i * 9 + r * 3 + c) < 0.35) continue; ctx.fillStyle = vary('#9a5236', (R(k, i + r + c) - 0.5) * 0.3); ctx.fillRect(bx + c * 38 + (r % 2) * 18, by + r * 18, 34, 15); } }
  ctx.strokeStyle = 'rgba(40,26,16,0.55)'; ctx.lineWidth = 1.5;
  for (let i = 0; i < 6; i++) { let cx = x + R(k, seed + i + 300) * w, cy = y + R(k, seed + i + 301) * h * 0.6; ctx.beginPath(); ctx.moveTo(cx, cy); for (let j = 0; j < 5; j++) { cx += (R(k, seed + i * 10 + j) - 0.5) * 30; cy += 12 + R(k, seed + i * 10 + j + 5) * 18; ctx.lineTo(cx, cy); } ctx.stroke(); }
  ctx.restore();
}
// Ván gỗ có vân: khối chữ nhật chia ván dọc.
export function planks(k, x, y, w, h, base = '#5a3e26', n = 5, seed = 3) {
  const { ctx } = k, pw = w / n;
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = vary(base, (R(k, seed + i) - 0.5) * 0.25); ctx.fillRect(x + i * pw, y, pw - 2, h);
    ctx.strokeStyle = 'rgba(20,12,6,0.35)'; ctx.lineWidth = 1.2;
    for (let j = 0; j < 4; j++) { const gx = x + i * pw + pw * (0.2 + 0.2 * j); ctx.beginPath(); ctx.moveTo(gx, y); for (let yy = y; yy <= y + h; yy += 20) ctx.lineTo(gx + Math.sin(yy / 30 + j + i) * 2.5, yy); ctx.stroke(); }
    if (R(k, seed + i + 50) > 0.6) { ctx.fillStyle = 'rgba(20,12,6,0.45)'; ctx.beginPath(); ctx.ellipse(x + i * pw + pw / 2, y + h * R(k, seed + i + 60), 4, 7, 0, 0, Math.PI * 2); ctx.fill(); }
  }
  ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.strokeRect(x, y, w, h);
}
// Sân gạch: gạch từng viên biến màu, rêu ở kẽ, mòn ở lối đi.
export function brickYard(k, y0, base = '#8e4e38', dark = 0, seed = 21) {
  const { ctx, W, H } = k;
  ctx.fillStyle = vary(base, -0.45); ctx.fillRect(-200, y0, W + 400, H - y0 + 200);
  let row = 0;
  for (let y = y0; y < H + 40; y += 30 + row * 2.2, row++) {
    const bh = 26 + row * 2.2, bw = 74 + row * 7, off = (row % 2) * bw / 2;
    for (let x = -200 - off; x < W + 200; x += bw + 4) {
      const i = row * 97 + Math.round(x);
      ctx.fillStyle = vary(base, (R(k, seed + i) - 0.5) * 0.35 - dark * 0.4); ctx.fillRect(x, y, bw, bh);
      if (R(k, seed + i + 9) > 0.86) { ctx.fillStyle = 'rgba(70,100,50,0.45)'; ctx.fillRect(x, y + bh - 4, bw * R(k, i + 2), 4); }
      if (R(k, seed + i + 19) > 0.93) { ctx.strokeStyle = 'rgba(30,15,10,0.5)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x + bw * 0.2, y); ctx.lineTo(x + bw * 0.5, y + bh * 0.6); ctx.lineTo(x + bw * 0.4, y + bh); ctx.stroke(); }
    }
  }
}
// Cây lớn tán xum xuê: gốc (x, y), cao h; ánh sáng từ phía lx.
export function bigTree(k, x, y, h, time = 'dusk', lx = 1500, seed = 31) {
  const { ctx } = k, t = T(k), P = PAL[time];
  const leafD = mix(P.near, '#05080a', 0.45), leafM = P.near, leafL = mix(P.near, P.light, 0.16);
  ctx.fillStyle = mix('#3a2a1c', P.near, 0.35);
  ctx.beginPath(); ctx.moveTo(x - 46, y); ctx.quadraticCurveTo(x - 20, y - h * 0.3, x - 18, y - h * 0.62); ctx.lineTo(x + 18, y - h * 0.62); ctx.quadraticCurveTo(x + 20, y - h * 0.3, x + 50, y); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x - 14 + i * 6, y - 10); ctx.quadraticCurveTo(x - 10 + i * 5, y - h * 0.3, x - 8 + i * 4, y - h * 0.6); ctx.stroke(); }
  for (const s of [-1, 1]) { ctx.lineWidth = 12; ctx.strokeStyle = mix('#3a2a1c', P.near, 0.35); ctx.beginPath(); ctx.moveTo(x, y - h * 0.55); ctx.quadraticCurveTo(x + s * h * 0.15, y - h * 0.7, x + s * h * 0.3, y - h * 0.78); ctx.stroke(); }
  const cx = x, cy = y - h * 0.82, rw = h * 0.55, rh = h * 0.32;
  // lớp tối mềm phía sau
  ctx.save(); ctx.filter = 'blur(3px)'; ctx.fillStyle = leafD;
  for (let i = 0; i < 40; i++) { const a = R(k, seed + i) * Math.PI * 2, r = Math.sqrt(R(k, seed + i + 50)); ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * rw * r, cy + Math.sin(a) * rh * r, 60, 44, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
  // cụm lá nhỏ, sáng dần về phía nguồn sáng
  for (let i = 0; i < 260; i++) {
    const a = R(k, seed + i + 200) * Math.PI * 2, r = Math.sqrt(R(k, seed + i + 260));
    const px = cx + Math.cos(a) * rw * r, py = cy + Math.sin(a) * rh * r + Math.sin(t * 0.8 + i) * 1.2;
    const lit = ((px - cx) * Math.sign(lx - cx) / rw + (cy - py) / rh) * 0.5;
    ctx.fillStyle = lit > 0.35 && R(k, i + 7) > 0.35 ? leafL : R(k, i + 9) > 0.5 ? leafM : mix(leafM, leafD, 0.5);
    const s = 9 + R(k, seed + i + 9) * 14;
    ctx.beginPath(); ctx.ellipse(px, py, s, s * 0.62, R(k, i) * 3, 0, Math.PI * 2); ctx.fill();
  }
}
// Đống rơm hình nón: đáy (x, y), rộng w.
export function strawStack(k, x, y, w, base = '#b8955a', seed = 41) {
  const { ctx } = k, h = w * 0.9;
  ctx.save(); ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.quadraticCurveTo(x - w * 0.45, y - h * 0.8, x, y - h); ctx.quadraticCurveTo(x + w * 0.45, y - h * 0.8, x + w / 2, y); ctx.closePath();
  const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, vary(base, -0.35)); g.addColorStop(0.6, base); g.addColorStop(1, vary(base, 0.1));
  ctx.fillStyle = g; ctx.fill(); ctx.clip();
  for (let i = 0; i < 260; i++) { const u = R(k, seed + i), v = R(k, seed + i + 900); ctx.strokeStyle = vary(base, (R(k, i + 4) - 0.55) * 0.6); ctx.globalAlpha = 0.6; ctx.lineWidth = 1.3; const xx = x + (u - 0.5) * w, yy = y - v * h; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + (u - 0.5) * 16, yy + 22); ctx.stroke(); }
  ctx.restore(); ctx.globalAlpha = 1;
  ctx.fillStyle = vary(base, -0.4); ctx.fillRect(x - 4, y - h - 40, 8, 44);
}
// Chum sành: đáy (x, y), cao h.
export function urnJar(k, x, y, h, base = '#5a3a24') {
  const { ctx } = k, w = h * 0.8;
  ctx.beginPath(); ctx.moveTo(x - w * 0.3, y); ctx.bezierCurveTo(x - w * 0.62, y - h * 0.2, x - w * 0.6, y - h * 0.8, x - w * 0.32, y - h); ctx.lineTo(x + w * 0.32, y - h); ctx.bezierCurveTo(x + w * 0.6, y - h * 0.8, x + w * 0.62, y - h * 0.2, x + w * 0.3, y); ctx.closePath();
  const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, vary(base, -0.4)); g.addColorStop(0.35, vary(base, 0.15)); g.addColorStop(1, vary(base, -0.5));
  ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = 'rgba(255,230,190,0.18)'; ctx.beginPath(); ctx.ellipse(x - w * 0.22, y - h * 0.55, w * 0.06, h * 0.22, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = vary(base, -0.3); ctx.beginPath(); ctx.ellipse(x, y - h, w * 0.34, h * 0.06, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
}
// Hàng rào tre tiền cảnh: từ x0 đến x1, chân y, cao h (tối, mờ — tạo chiều sâu).
export function bambooFence(k, x0, x1, y, h, c = '#1a140e') {
  const { ctx } = k;
  ctx.save(); ctx.filter = 'blur(2px)'; ctx.fillStyle = c; ctx.strokeStyle = c;
  for (let x = x0; x < x1; x += 26) { const hh = h * (0.85 + R(k, Math.round(x)) * 0.3); ctx.fillRect(x, y - hh, 14, hh); ctx.beginPath(); ctx.ellipse(x + 7, y - hh, 7, 4, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.lineWidth = 8; for (const f of [0.35, 0.7]) { ctx.beginPath(); ctx.moveTo(x0 - 10, y - h * f); ctx.lineTo(x1 + 10, y - h * f + 6); ctx.stroke(); }
  ctx.restore();
}
// Gà: chân (x, y), s, hướng flip.
export function chicken(k, x, y, s = 1, flip = false, c = '#8a4a2a') {
  const { ctx } = k, t = T(k), peck = Math.max(0, Math.sin(t * 2.2 + x)) * 0.4;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (flip ? -1 : 1), s);
  ctx.fillStyle = c; ctx.strokeStyle = INK; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.ellipse(0, -28, 26, 18, -0.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-22, -34); ctx.lineTo(-40, -52); ctx.lineTo(-30, -26); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.save(); ctx.translate(20, -40); ctx.rotate(peck);
  ctx.beginPath(); ctx.arc(6, -8, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.ellipse(6, -20, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e8b84a'; ctx.beginPath(); ctx.moveTo(15, -9); ctx.lineTo(23, -6); ctx.lineTo(15, -4); ctx.closePath(); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = '#c99a3a'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-4, -12); ctx.lineTo(-6, 0); ctx.moveTo(6, -12); ctx.lineTo(8, 0); ctx.stroke();
  ctx.restore();
}
// Bụi cỏ.
export function grass(k, x, y, s = 1, c = '#3a4a2a', seed = 1) {
  const { ctx } = k, t = T(k);
  ctx.save(); ctx.strokeStyle = c; ctx.lineCap = 'round';
  for (let i = 0; i < 9; i++) { const a = -0.7 + i * 0.17 + Math.sin(t * 1.3 + i + seed) * 0.04; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(x + (i - 4) * 3 * s, y); ctx.quadraticCurveTo(x + Math.sin(a) * 20 * s, y - 20 * s, x + Math.sin(a) * 34 * s, y - (26 + R(k, seed + i) * 18) * s); ctx.stroke(); }
  ctx.restore();
}
// Giếng đá ong xếp khối + giá gầu.
export function wellHD(k, x, y, s = 1, time = 'dusk') {
  const { ctx } = k, dk = time === 'night' ? 0.45 : time === 'dusk' ? 0.2 : 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // giá gầu
  ctx.fillStyle = vary('#5a3e26', -dk); ctx.fillRect(-150, -230, 12, 230); ctx.fillRect(138, -230, 12, 230); ctx.fillRect(-160, -240, 320, 14);
  ctx.strokeStyle = '#a8905a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(30, -226); ctx.lineTo(30, -90); ctx.stroke();
  ctx.fillStyle = vary('#6a5a4a', -dk); ctx.beginPath(); ctx.moveTo(14, -90); ctx.lineTo(46, -90); ctx.lineTo(40, -60); ctx.lineTo(20, -60); ctx.closePath(); ctx.fill();
  // thân giếng: các khối đá ong
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
    const bx = -135 + c * 46 + (r % 2) * 22, by = -6 + r * 30; if (bx > 110) continue;
    ctx.fillStyle = vary('#a0522d', (R(k, r * 9 + c) - 0.5) * 0.35 - dk); ctx.fillRect(bx, by, 44, 28);
    ctx.fillStyle = 'rgba(30,12,6,0.45)'; for (let h = 0; h < 4; h++) { ctx.beginPath(); ctx.arc(bx + 6 + R(k, r * 30 + c * 5 + h) * 32, by + 5 + R(k, r * 31 + c * 7 + h) * 18, 1.5 + R(k, h + c) * 2.5, 0, Math.PI * 2); ctx.fill(); }
  }
  ctx.fillStyle = 'rgba(80,110,60,0.5)'; ctx.fillRect(-135, 108, 270, 8);
  ctx.fillStyle = vary('#8a4a30', -dk); ctx.beginPath(); ctx.ellipse(0, -6, 142, 34, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#05070a'; ctx.beginPath(); ctx.ellipse(0, -6, 118, 24, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
// Hạt phim + chỉnh màu toàn khung (gọi cuối cùng, trước chữ).
let grainCanvas = null;
export function filmGrade(k, time = 'dusk', a = 0.08) {
  const { ctx, W, H } = k;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = PAL[time].grade; ctx.fillRect(0, 0, W, H);
  if (!grainCanvas) { grainCanvas = document.createElement('canvas'); grainCanvas.width = 256; grainCanvas.height = 256; const g = grainCanvas.getContext('2d'), d = g.createImageData(256, 256); for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; } g.putImageData(d, 0, 0); }
  const off = Math.floor((T(k) * 24) % 8) * 31;
  ctx.globalAlpha = a; ctx.globalCompositeOperation = 'overlay';
  for (let y = -off; y < H; y += 256) for (let x = -off; x < W; x += 256) ctx.drawImage(grainCanvas, x, y);
  ctx.restore();
}


// ---------- bộ đệm nền tĩnh ----------
// Vẽ fn một lần vào canvas phụ (cỡ khung), các khung sau chỉ dán lại → nhẹ cho cả GPU lẫn CPU.
const CACHE = new Map();
export function cached(k, key, fn) {
  let c = CACHE.get(key);
  if (!c) {
    // Vẽ nền trên canvas CPU (willReadFrequently = phần mềm): filter blur trên nhiều hình nhỏ làm GPU (Metal) mất
    // ngữ cảnh → khung đen/bóng ma. Vẽ xong chép một lần sang canvas thường (GPU) để mỗi khung dán lại thật nhanh.
    const sw = document.createElement('canvas'); sw.width = k.W; sw.height = k.H;
    const old = k.ctx; k.ctx = sw.getContext('2d', { willReadFrequently: true });
    try { fn(); } finally { k.ctx = old; }
    c = document.createElement('canvas'); c.width = k.W; c.height = k.H;
    c.getContext('2d').drawImage(sw, 0, 0);
    CACHE.set(key, c);
  }
  k.ctx.drawImage(c, 0, 0);
}

// ---------- cảnh hoàn chỉnh: nhà ba gian mái rạ + sân gạch ----------
// o.time 'day'|'dusk'|'night'|'storm'; o.lit (cửa giữa sáng đèn); o.chickens.
export const HOUSE_HD = { well: { x: 1500, y: 850 }, door: { x: 960, y: 640 } };
export function houseHD(k, o = {}) {
  const time = o.time ?? 'dusk';
  cached(k, `house|${time}|${!!o.lit}|${k.W}`, () => houseStatic(k, o));
  if (o.chickens !== false && time !== 'night') { chicken(k, 820, 930, 1.1); chicken(k, 900, 960, 0.9, true, '#c9a47a'); chicken(k, 1700, 1010, 1, true); }
}
function houseStatic(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'dusk', P = PAL[time], dk = time === 'night' ? 0.55 : time === 'storm' ? 0.4 : time === 'dusk' ? 0.22 : 0;
  sky(k, time, 640);
  landscape(k, time, 640);
  // cây lớn sau nhà (trái)
  bigTree(k, 300, 800, 620, time, P.sun?.x ?? 1500, 31);
  // nhà
  const hx0 = 560, hx1 = 1360, hy = 470, hb = 800;
  mudWall(k, hx0, hy, hx1 - hx0, hb - hy, vary('#9a7c5c', -dk), 9);
  // cột + cửa
  for (let i = 0; i <= 3; i++) { ctx.fillStyle = vary('#4a3220', -dk); ctx.fillRect(hx0 - 6 + i * (hx1 - hx0) / 3, hy, 16, hb - hy); }
  for (let i = 0; i < 3; i++) {
    const gx = hx0 + i * (hx1 - hx0) / 3, gw = (hx1 - hx0) / 3;
    if (i === 1) {
      const dw = 150, dx = gx + (gw - dw) / 2, dy = 560;
      ctx.fillStyle = '#120c08'; ctx.fillRect(dx, dy, dw, hb - dy);
      if (o.lit) { const rg = ctx.createRadialGradient(dx + dw / 2, dy + 140, 10, dx + dw / 2, dy + 140, 190); rg.addColorStop(0, 'rgba(255,190,110,0.85)'); rg.addColorStop(1, 'rgba(255,190,110,0)'); ctx.fillStyle = rg; ctx.fillRect(dx, dy, dw, hb - dy); }
      planks(k, dx - 62, dy, 62, hb - dy, vary('#5a3e26', -dk), 2, 70); planks(k, dx + dw, dy, 62, hb - dy, vary('#5a3e26', -dk), 2, 71);
      ctx.fillStyle = vary('#4a3220', -dk); ctx.fillRect(dx - 70, dy - 14, dw + 140, 14);
    } else {
      const ww = 120, wx = gx + (gw - ww) / 2, wy = 590;
      ctx.fillStyle = '#0c0805'; ctx.fillRect(wx, wy, ww, 90);
      for (let b = 1; b < 6; b++) { ctx.fillStyle = vary('#4a3220', -dk); ctx.fillRect(wx + b * ww / 6 - 3, wy, 6, 90); }
      ctx.strokeStyle = vary('#3a2618', -dk); ctx.lineWidth = 8; ctx.strokeRect(wx - 4, wy - 4, ww + 8, 98);
    }
  }
  // bậc thềm đá
  ctx.fillStyle = vary('#7a7066', -dk); ctx.fillRect(hx0 - 40, hb, hx1 - hx0 + 80, 26); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(hx0 - 40, hb + 20, hx1 - hx0 + 80, 6);
  // bóng mái trên tường
  const sg = ctx.createLinearGradient(0, hy, 0, hy + 90); sg.addColorStop(0, 'rgba(10,6,4,0.65)'); sg.addColorStop(1, 'rgba(10,6,4,0)'); ctx.fillStyle = sg; ctx.fillRect(hx0, hy, hx1 - hx0, 90);
  thatch(k, hx0, 300, hx1, hy + 20, 80, vary(time === 'day' ? '#a8885a' : '#957548', -dk), 5);
  // đồ đạc hiên
  ctx.fillStyle = vary('#c9b47a', -dk); ctx.beginPath(); ctx.moveTo(hx0 + 300, 610); ctx.lineTo(hx0 + 340, 580); ctx.lineTo(hx0 + 380, 610); ctx.closePath(); ctx.fill(); // nón treo vách
  urnJar(k, hx1 + 60, hb + 20, 150, vary('#5a3a24', -dk));
  urnJar(k, hx1 + 150, hb + 20, 110, vary('#6a4428', -dk));
  strawStack(k, 170, 870, 300, vary('#b8955a', -dk), 41);
  // sân
  brickYard(k, 820, '#7c5444', dk + 0.08, 21);
  { const fg = ctx.createLinearGradient(0, 820, 0, 900); fg.addColorStop(0, `rgba(${time === 'night' ? '10,14,30' : '60,40,50'},0.45)`); fg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = fg; ctx.fillRect(-200, 820, W + 400, 80); }
  // vũng nước phản chiếu trời
  ctx.save(); ctx.filter = 'blur(3px)'; ctx.globalAlpha = 0.22; ctx.fillStyle = P.sky[2]; ctx.beginPath(); ctx.ellipse(1150, 985, 150, 14, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  wellHD(k, HOUSE_HD.well.x, HOUSE_HD.well.y, 1, time);
  // bóng đổ dài (nắng chiều từ phải)
  if (time === 'dusk' || time === 'day') { ctx.save(); ctx.globalAlpha = 0.28; ctx.fillStyle = '#100808'; ctx.beginPath(); ctx.moveTo(hx0 - 40, 826); ctx.lineTo(hx1 + 40, 826); ctx.lineTo(hx1 - 200, 900); ctx.lineTo(hx0 - 300, 900); ctx.closePath(); ctx.fill(); ctx.restore(); }
  for (let i = 0; i < 14; i++) grass(k, R(k, i + 500) * W, 830 + R(k, i + 501) * 230, 1 + R(k, i) * 0.6, vary(P.near, 0.1), i);
  // ánh nắng nghiêng từ phải + tối dần bên trái
  if (P.sun && time !== 'night') { ctx.save(); ctx.globalCompositeOperation = 'soft-light'; const lg = ctx.createLinearGradient(W, 0, 0, H); lg.addColorStop(0, 'rgba(255,200,140,0.55)'); lg.addColorStop(1, 'rgba(20,10,30,0.55)'); ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  bambooFence(k, -40, 340, 1090, 260, mix(P.near, '#000000', 0.5));
  bambooFence(k, 1620, 1980, 1100, 240, mix(P.near, '#000000', 0.5));
}
