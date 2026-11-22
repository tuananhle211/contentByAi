// Phong cách "nét mực rung" (học từ ClaudeAnimationBase / p5.brush). Bật bằng meta.look = 'brush'.
// Lớp màu nước (grade + pigment) TẮT mặc định — người dùng chê đục (10/11/2026); bật lại bằng meta.brush.watercolor = true.
//  - boil: cả cảnh (trừ giấy và phụ đề) uốn nhẹ theo nhiễu, đổi 12 lần/giây → như vẽ tay từng khung.
//  - grade: hạ bão hoà, đen → mực nâu, trắng → kem (không đen tuyền / trắng tinh).
//  - pigment: vân loang màu nước + hạt giấy nhân (multiply) lên trên, đứng yên.
//  - brushWipe(p): chuyển cảnh quệt cọ — các vệt cọ lớn phủ kín khung (p 0→.5) rồi kéo đi (.5→1).
// Mọi thứ là hàm thuần theo thời gian (render song song được).
import { rng, clamp, ease } from './kit.js';

const SVGNS = 'http://www.w3.org/2000/svg';
export const BOIL_FPS = 12;
const BOILS = 4;

export function makeBrush(W, H, o = {}) {
  const amp = o.boil ?? 5; // px (biên độ rung tổng ±amp/2)
  const wc = o.watercolor ?? false;
  const sat = o.saturate ?? 0.95;
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  // đen → #16110e (mực nâu), trắng → #fbf5e6 (kem)
  const lo = [0x16, 0x11, 0x0e].map((v) => v / 255), hi = [0xfb, 0xf5, 0xe6].map((v) => v / 255);
  const fx = (ch, i) => `<feFunc${ch} type="linear" slope="${(hi[i] - lo[i]).toFixed(3)}" intercept="${lo[i].toFixed(3)}"/>`;
  let defs = '';
  for (let i = 0; i < BOILS; i++) {
    defs += `<filter id="boil${i}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="${i * 17 + 5}" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="${amp}" xChannelSelector="R" yChannelSelector="G" result="d"/>
      ${wc ? `<feColorMatrix in="d" type="saturate" values="${sat}" result="s"/>
      <feComponentTransfer in="s">${fx('R', 0)}${fx('G', 1)}${fx('B', 2)}</feComponentTransfer>` : ''}
    </filter>`;
  }
  svg.innerHTML = `<defs>${defs}</defs>`;
  document.body.appendChild(svg);

  const buf = Object.assign(document.createElement('canvas'), { width: W, height: H });
  // lề đệm: bộ lọc uốn nét lấy mẫu tràn mép → rác nằm ở lề rồi bị cắt bỏ
  const M = 64, pad = Object.assign(document.createElement('canvas'), { width: W + 2 * M, height: H + 2 * M });
  const pg = pad.getContext('2d');
  const pigment = wc ? makePigment(W, H, o.pigment ?? 1) : null;
  return {
    buf, pigment,
    // Gọi sau khi đã vẽ cảnh lên `buf` (nền trong suốt): đặt giấy, vẽ cảnh đã rung + grade, phủ vân màu nước.
    compose(ctx, paper, gt) {
      const n = Math.floor(gt * BOIL_FPS) % BOILS;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;
      ctx.drawImage(paper, 0, 0);
      // lề = bản phóng to của chính cảnh → chỗ mép bị uốn lấy mẫu ra ngoài vẫn có màu cảnh, không lộ giấy
      pg.clearRect(0, 0, pad.width, pad.height);
      pg.drawImage(buf, 0, 0, pad.width, pad.height);
      pg.drawImage(buf, M, M);
      ctx.filter = `url(#boil${n})`;
      ctx.drawImage(pad, -M, -M);
      ctx.filter = 'none';
      if (pigment) { ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(pigment, 0, 0); }
      ctx.restore();
    },
  };
}

// Vân loang màu nước: nhiễu giá trị nhiều tầng (to → nhỏ) phóng mượt + hạt giấy, giá trị trong [~0.84, 1] để nhân.
function makePigment(W, H, k) {
  const c = Object.assign(document.createElement('canvas'), { width: W, height: H });
  const g = c.getContext('2d');
  g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
  const r = rng(321);
  const layer = (cell, a) => {
    const w = Math.ceil(W / cell) + 2, h = Math.ceil(H / cell) + 2;
    const s = Object.assign(document.createElement('canvas'), { width: w, height: h });
    const sg = s.getContext('2d');
    const im = sg.createImageData(w, h);
    for (let i = 0; i < w * h; i++) {
      const v = 255 - Math.round(r() * 255 * a * k);
      im.data[i * 4] = v; im.data[i * 4 + 1] = Math.round(v * 0.99 + 2); im.data[i * 4 + 2] = Math.round(v * 0.96 + 8); im.data[i * 4 + 3] = 255;
    }
    sg.putImageData(im, 0, 0);
    g.save(); g.globalCompositeOperation = 'multiply'; g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    g.drawImage(s, -cell, -cell, w * cell, h * cell);
    g.restore();
  };
  layer(150, 0.045); layer(46, 0.035); layer(13, 0.025);
  // hạt giấy + vài vệt khô
  g.save(); g.globalCompositeOperation = 'multiply';
  for (let i = 0; i < (W * H) / 260; i++) {
    g.fillStyle = `rgba(110,85,60,${(0.03 + r() * 0.05) * k})`;
    g.fillRect(r() * W, r() * H, 1 + r() * 1.6, 1 + r() * 1.6);
  }
  for (let i = 0; i < 70; i++) {
    const x = r() * W, y = r() * H, len = 60 + r() * 220, a = (r() - 0.5) * 0.5;
    g.strokeStyle = `rgba(120,95,70,${0.025 * k})`; g.lineWidth = 6 + r() * 18; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len); g.stroke();
  }
  g.restore();
  return c;
}

// Chuyển cảnh quệt cọ, p 0..1 (0→.5 phủ kín, .5→1 kéo đi; cắt cảnh ở .5). colors: 2–3 màu xen kẽ.
export function brushWipe(ctx, W, H, p, colors = ['#2e2420', '#b8432f'], seed = 1) {
  if (p <= 0 || p >= 1) return;
  const N = 7, band = H / N, thick = band * 1.75;
  const r = rng(seed * 131 + 7);
  const lag = Array.from({ length: N }, () => r() * 0.28);
  const wob = Array.from({ length: N }, () => r() * 6.28);
  const boil = Math.floor(p * 40);
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
  for (let j = 0; j < N; j++) {
    const cover = p < 0.5;
    const q = ease.inOut(clamp(((cover ? p * 2 : (p - 0.5) * 2) - lag[j]) / (1 - 0.28)));
    const span = W + 2 * thick;
    let x0, x1;
    if (cover) { x0 = -thick; x1 = -thick + span * q; } else { x0 = -thick + span * q; x1 = W + thick; }
    if (x1 - x0 < 2) continue;
    const yc = band * (j + 0.5) + Math.sin(wob[j]) * band * 0.15;
    const tilt = (j % 2 ? 1 : -1) * 0.02;
    const col = colors[j % colors.length];
    const rr = rng(seed * 977 + j * 31 + boil);
    // thân vệt cọ: mép trên/dưới gợn, đầu tròn
    const top = [], bot = [];
    const steps = Math.max(4, Math.ceil((x1 - x0) / 60));
    for (let i = 0; i <= steps; i++) {
      const x = x0 + ((x1 - x0) * i) / steps;
      const dy = (x - W / 2) * tilt;
      top.push([x, yc + dy - thick / 2 + (rr() - 0.5) * 10]);
      bot.push([x, yc + dy + thick / 2 + (rr() - 0.5) * 10]);
    }
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(top[0][0], top[0][1]);
    for (const [x, y] of top) ctx.lineTo(x, y);
    const e = top[top.length - 1], eb = bot[bot.length - 1];
    ctx.quadraticCurveTo(e[0] + thick * 0.45, (e[1] + eb[1]) / 2, eb[0], eb[1]);
    for (let i = bot.length - 1; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]);
    const s0 = top[0], sb = bot[0];
    ctx.quadraticCurveTo(s0[0] - thick * 0.45, (s0[1] + sb[1]) / 2, s0[0], s0[1]);
    ctx.fill();
    // thớ lông cọ
    ctx.lineCap = 'round';
    for (let b = 0; b < 9; b++) {
      const off = (rr() - 0.5) * thick * 0.85;
      ctx.strokeStyle = b % 3 ? 'rgba(255,240,220,0.08)' : 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 2 + rr() * 6;
      const a = x0 + (x1 - x0) * rr() * 0.3, z = x1 - (x1 - x0) * rr() * 0.2;
      ctx.beginPath(); ctx.moveTo(a, yc + (a - W / 2) * tilt + off); ctx.lineTo(z, yc + (z - W / 2) * tilt + off + (rr() - 0.5) * 6); ctx.stroke();
    }
  }
  ctx.restore();
}
