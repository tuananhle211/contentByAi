// Bộ vẽ dùng chung cho kênh Hạt Bụi Xanh (hat-bui-xanh): bảng màu, nền vũ trụ/biển, chữ số lớn, thước đo, hình bóng so quy mô.
// Dùng trong video.js: import { P, space, ocean, surface, cream, earth, whale, human, bus, landmark81, plane, trex, sauropod,
//   scaleBar, bigNum, label, src, chip, krill } from '/channel/hat-bui-xanh.js';
// Phong cách: phẳng, nền tối, một màu nhấn sáng; không đùa. Ảnh thật dùng k.photo (scripts/anh-that.mjs).
export const P = {
  space: '#0B1026', space2: '#1B2550', sea: '#0A4A5C', sea2: '#03222E', deep: '#010B12', surf: '#1F7A99', sky: '#9CC9E0',
  earth: '#2E86DE', land: '#3BA55C', cloud: '#F5F1E6', orange: '#FF7A1A', gold: '#FFD34E', red: '#E5383B',
  cream: '#F5F1E6', ink: '#0E1A2B', mute: '#8FA3B8', white: '#FFFFFF',
  whale: '#5B7A99', whaleDark: '#3E5873', whaleBelly: '#9DB4C8', sil: '#C9D6E3',
};
const TAU = Math.PI * 2;
const lerp = (a, b, p) => a + (b - a) * p;

// ---------- nền ----------
export function fill(k, color) { k.ctx.fillStyle = color; k.ctx.fillRect(0, 0, k.W, k.H); }
export function cream(k) { fill(k, P.cream); }
function vgrad(k, top, bottom) {
  const g = k.ctx.createLinearGradient(0, 0, 0, k.H);
  g.addColorStop(0, top); g.addColorStop(1, bottom);
  k.ctx.fillStyle = g; k.ctx.fillRect(0, 0, k.W, k.H);
}
// Vũ trụ: nền xanh đêm, sao lấp lánh cố định (seed), o.drift trôi chậm theo thời gian.
export function space(k, o = {}) {
  vgrad(k, o.top ?? P.space, o.bottom ?? P.space2);
  const n = o.n ?? 160, drift = (o.drift ?? 6) * (k.gt ?? 0);
  for (let i = 0; i < n; i++) {
    const x = ((k.rand(i) * k.W + drift * (0.3 + k.rand(i + 5))) % k.W + k.W) % k.W;
    const y = k.rand(i + 300) * k.H;
    const r = 0.8 + Math.pow(k.rand(i + 600), 3) * 3.2;
    k.dot(x, y, r, i % 9 === 0 ? '#FFE9B0' : '#FFFFFF', 0.35 + 0.55 * (0.5 + 0.5 * Math.sin((k.gt ?? 0) * (0.8 + k.rand(i + 9)) + i)));
  }
}
// Biển: o.depth 0 (gần mặt) .. 1 (vực sâu) đổi màu; tuyết biển trôi; tia nắng khi nông.
export function ocean(k, o = {}) {
  const d = o.depth ?? 0.2;
  const mix = (a, b) => { const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16); const c = (s) => Math.round(lerp((pa >> s) & 255, (pb >> s) & 255, d)); return `rgb(${c(16)},${c(8)},${c(0)})`; };
  vgrad(k, mix(P.surf, P.sea2), mix(P.sea, P.deep));
  const { ctx } = k;
  if (d < 0.5) {
    ctx.save(); ctx.globalAlpha = 0.07 * (1 - d * 2);
    for (let i = 0; i < 6; i++) {
      const x = k.W * (0.1 + 0.16 * i) + 40 * Math.sin((k.gt ?? 0) * 0.3 + i);
      ctx.beginPath(); ctx.moveTo(x - 30, 0); ctx.lineTo(x + 30, 0); ctx.lineTo(x + 220, k.H); ctx.lineTo(x + 60, k.H); ctx.closePath();
      ctx.fillStyle = '#FFFFFF'; ctx.fill();
    }
    ctx.restore();
  }
  const n = o.snow ?? 70;
  for (let i = 0; i < n; i++) {
    const y = ((k.rand(i + 40) * k.H + (k.gt ?? 0) * (8 + 14 * k.rand(i))) % k.H);
    const x = k.rand(i + 90) * k.W + 10 * Math.sin((k.gt ?? 0) * 0.5 + i);
    k.dot(x, y, 1.2 + 2 * k.rand(i + 7), '#CFE8F0', 0.15 + 0.3 * k.rand(i + 3));
  }
}
// Mặt biển nhìn ngang: trời trên, nước dưới đường y.
export function surface(k, y = 430, o = {}) {
  const { ctx } = k;
  vgrad(k, o.sky ?? P.sky, '#DCEBF2');
  ctx.save(); ctx.beginPath(); ctx.rect(0, y, k.W, k.H - y); ctx.clip();
  const g = ctx.createLinearGradient(0, y, 0, k.H); g.addColorStop(0, P.surf); g.addColorStop(1, P.sea2);
  ctx.fillStyle = g; ctx.fillRect(0, y, k.W, k.H - y); ctx.restore();
  ctx.beginPath(); ctx.moveTo(0, y);
  for (let x = 0; x <= k.W; x += 40) ctx.lineTo(x, y + 5 * Math.sin(x * 0.02 + (k.gt ?? 0) * 1.6));
  ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 4; ctx.stroke();
}

// ---------- vật thể vũ trụ ----------
// Trái Đất phẳng: lục địa cách điệu quay chậm (o.spin vòng/giây), viền khí quyển.
export function earth(k, x, y, r, o = {}) {
  const { ctx } = k;
  ctx.save();
  ctx.beginPath(); ctx.arc(x, y, r * 1.06, 0, TAU); ctx.fillStyle = 'rgba(120,190,255,0.25)'; ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = P.earth; ctx.fill(); ctx.clip();
  const rot = ((k.gt ?? 0) * (o.spin ?? 0.02)) % 1;
  ctx.fillStyle = P.land;
  // lục địa = cụm nhiều đốm nhỏ chồng nhau (trông tự nhiên hơn một khối tròn)
  for (let i = 0; i < 6; i++) {
    const u = ((k.rand(i + 11) + rot) % 1) * 2 - 0.5;
    const cx = x + (u - 0.5) * 2.4 * r, cy = y + (k.rand(i + 21) - 0.5) * 1.4 * r, s = r * (0.1 + 0.12 * k.rand(i + 31));
    for (let j = 0; j < 9; j++) {
      const a = k.rand(i * 20 + j + 400) * TAU, d = s * 1.3 * k.rand(i * 20 + j + 450);
      ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * d * 1.5, cy + Math.sin(a) * d, s * (0.6 + 0.6 * k.rand(i * 20 + j + 500)), s * (0.4 + 0.4 * k.rand(i * 20 + j + 520)), k.rand(i * 20 + j) * 3, 0, TAU); ctx.fill();
    }
  }
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let i = 0; i < 6; i++) {
    const u = ((k.rand(i + 51) + rot * 1.3) % 1) * 2 - 0.5;
    ctx.beginPath(); ctx.ellipse(x + (u - 0.5) * 2.4 * r, y + (k.rand(i + 61) - 0.5) * 1.6 * r, r * 0.25, r * 0.05, 0.2, 0, TAU); ctx.fill();
  }
  // o.ice 0..1: phủ băng (hành tinh trôi dạt)
  if (o.ice) { ctx.fillStyle = `rgba(225,240,250,${0.85 * o.ice})`; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); }
  // bóng tối nửa đêm
  const g = ctx.createLinearGradient(x - r, y, x + r, y);
  g.addColorStop(0, 'rgba(5,10,30,0)'); g.addColorStop(0.55, 'rgba(5,10,30,0)'); g.addColorStop(1, 'rgba(5,10,30,0.65)');
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  ctx.restore();
}

// ---------- chữ ----------
// Con số / chữ lớn (chữ trắng ngà, viền tối) — câu chốt của cảnh.
export function bigNum(k, s, x, y, cue, o = {}) {
  return k.text(s, x, y, { size: o.size ?? 150, font: 'title', color: o.color ?? P.cream, fx: o.fx ?? 'pop', p: o.p ?? k.at(cue, 0.5), outline: o.outline ?? P.ink, outlineWidth: o.ow ?? 14, align: o.align, maxWidth: o.maxWidth });
}
export function label(k, s, x, y, cue, o = {}) {
  return k.text(s, x, y, { size: o.size ?? 46, font: 'title', color: o.color ?? P.cream, fx: o.fx ?? 'fade', p: o.p ?? k.at(cue, 0.6), outline: o.outline ?? P.ink, outlineWidth: o.ow ?? 8, align: o.align, maxWidth: o.maxWidth });
}
// Nhãn nguồn nhỏ góc dưới trái: "Nguồn: NOAA".
export function src(k, s, o = {}) {
  k.text(s, o.x ?? 48, o.y ?? k.H - 44, { size: o.size ?? 24, color: o.color ?? 'rgba(245,241,230,0.75)', align: 'left', fx: 'fade', p: o.p ?? k.at(0.3, 0.6) });
}
// Thẻ nhãn có nền (vd "MÔ PHỎNG", "ẢNH THẬT").
export function chip(k, s, x, y, o = {}) {
  const { ctx } = k;
  const size = o.size ?? 28, p = o.p ?? 1;
  if (p <= 0) return;
  ctx.save(); ctx.globalAlpha *= p;
  ctx.font = `800 ${size}px "Be Vietnam Pro"`;
  const w = ctx.measureText(s).width + size * 1.2, h = size * 1.6;
  const bx = o.align === 'right' ? x - w : x;
  ctx.fillStyle = o.bg ?? P.orange; ctx.beginPath(); ctx.roundRect(bx, y - h / 2, w, h, h / 2); ctx.fill();
  ctx.fillStyle = o.color ?? P.ink; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(s, bx + size * 0.6, y + 1);
  ctx.restore();
}
// Thước đo ngang có vạch hai đầu + nhãn ở giữa; o.p vẽ dần.
export function scaleBar(k, x1, x2, y, text, o = {}) {
  const p = o.p ?? 1, color = o.color ?? P.gold;
  if (p <= 0) return;
  const { ctx } = k;
  const xe = lerp(x1, x2, Math.min(1, p * 1.3));
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = o.width ?? 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(xe, y); ctx.moveTo(x1, y - 18); ctx.lineTo(x1, y + 18);
  if (xe >= x2 - 1) { ctx.moveTo(x2, y - 18); ctx.lineTo(x2, y + 18); }
  ctx.stroke(); ctx.restore();
  if (text) k.text(text, (x1 + x2) / 2, y - (o.above ?? 46), { size: o.size ?? 44, font: 'title', color, fx: 'fade', p: clamp01((p - 0.6) / 0.4), outline: P.ink, outlineWidth: 8 });
}
const clamp01 = (v) => Math.max(0, Math.min(1, v));

// ---------- hình bóng so quy mô (đơn vị: px; mọi hàm đặt theo chân/đáy) ----------
function silFill(k, o, def = P.sil) {
  const { ctx } = k;
  ctx.fillStyle = o.color ?? def; ctx.fill();
  if (o.stroke !== false) { ctx.strokeStyle = o.stroke ?? P.ink; ctx.lineWidth = o.lw ?? 3; ctx.lineJoin = 'round'; ctx.stroke(); }
}
// Người đứng: chân tại (x, yFoot), cao h px.
export function human(k, x, yFoot, h, o = {}) {
  const { ctx } = k; const u = h / 10;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.beginPath(); ctx.arc(x, yFoot - h + u * 0.9, u * 0.9, 0, TAU);
  ctx.moveTo(x - u * 1.3, yFoot - h + u * 2.2); ctx.lineTo(x + u * 1.3, yFoot - h + u * 2.2);
  ctx.lineTo(x + u * 1.5, yFoot - u * 4.6); ctx.lineTo(x + u * 0.9, yFoot - u * 4.6); ctx.lineTo(x + u * 0.8, yFoot);
  ctx.lineTo(x + u * 0.1, yFoot); ctx.lineTo(x, yFoot - u * 4); ctx.lineTo(x - u * 0.1, yFoot); ctx.lineTo(x - u * 0.8, yFoot);
  ctx.lineTo(x - u * 0.9, yFoot - u * 4.6); ctx.lineTo(x - u * 1.5, yFoot - u * 4.6); ctx.closePath();
  silFill(k, o, P.gold); ctx.restore();
}
// Xe buýt (dài len px), đáy tại yBase, đầu xe bên phải.
export function bus(k, x, yBase, len, o = {}) {
  const { ctx } = k; const h = len * 0.27;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.beginPath(); ctx.roundRect(x, yBase - h, len, h * 0.86, h * 0.12); silFill(k, o, '#F2B134');
  ctx.fillStyle = 'rgba(14,26,43,0.55)';
  for (let i = 0; i < 6; i++) ctx.fillRect(x + len * (0.06 + i * 0.145), yBase - h * 0.9, len * 0.11, h * 0.32);
  for (const wx of [0.2, 0.8]) { ctx.beginPath(); ctx.arc(x + len * wx, yBase - h * 0.14, h * 0.15, 0, TAU); ctx.fillStyle = P.ink; ctx.fill(); }
  ctx.restore();
}
// Landmark 81: tháp bó ống thuôn, đáy tại (x, yBase), cao h px.
export function landmark81(k, x, yBase, h, o = {}) {
  const { ctx } = k; const w = h * 0.115;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  const tiers = [[1, 0.55], [0.82, 0.72], [0.62, 0.86], [0.4, 0.95]];
  for (const [ws, top] of tiers) {
    ctx.beginPath(); ctx.moveTo(x - w * ws / 2, yBase); ctx.lineTo(x - w * ws * 0.42, yBase - h * top);
    ctx.lineTo(x + w * ws * 0.42, yBase - h * top); ctx.lineTo(x + w * ws / 2, yBase); ctx.closePath();
    silFill(k, o, o.color ?? '#B9C7D6');
  }
  ctx.beginPath(); ctx.moveTo(x - w * 0.05, yBase - h * 0.95); ctx.lineTo(x, yBase - h); ctx.lineTo(x + w * 0.05, yBase - h * 0.95); ctx.closePath(); silFill(k, o, '#B9C7D6');
  ctx.restore();
}
// Máy bay chở khách nhìn ngang (dài len), thân tại độ cao y.
export function plane(k, x, y, len, o = {}) {
  const { ctx } = k; const r = len * 0.05;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + len * 0.02, y - r, x + len * 0.1, y - r);
  ctx.lineTo(x + len * 0.85, y - r); ctx.lineTo(x + len, y - r * 3.4); ctx.lineTo(x + len * 0.97, y + r * 0.2);
  ctx.lineTo(x + len * 0.1, y + r); ctx.quadraticCurveTo(x + len * 0.02, y + r, x, y); ctx.closePath(); silFill(k, o, '#DDE6EE');
  ctx.beginPath(); ctx.moveTo(x + len * 0.38, y + r * 0.3); ctx.lineTo(x + len * 0.58, y + r * 2.6); ctx.lineTo(x + len * 0.62, y + r * 2.6); ctx.lineTo(x + len * 0.52, y + r * 0.3); ctx.closePath(); silFill(k, o, '#C3CFDA');
  ctx.restore();
}
// T. rex nhìn ngang (dài len), chân tại yFoot, đầu bên phải.
export function trex(k, x, yFoot, len, o = {}) {
  const { ctx } = k; const u = len / 100;
  // dáng nằm ngang như các phục dựng hiện đại: cao hông ~1/3 chiều dài
  const pts = [[0, -27], [18, -31], [38, -35], [52, -37], [64, -35], [72, -36], [78, -40], [92, -40], [100, -36], [100, -31], [90, -30], [82, -29], [76, -27],
    [70, -24], [68, -20], [66, -21], [64, -18], [60, -19], [56, -17], [55, -6], [58, 0], [50, 0], [49, -8], [46, -16], [42, -16], [42, -6], [44, 0], [36, 0], [36, -9], [34, -20], [18, -25]];
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.beginPath();
  pts.forEach(([px, py], i) => (i ? ctx.lineTo : ctx.moveTo).call(ctx, x + px * u, yFoot + py * u)); ctx.closePath(); silFill(k, o, '#C98B5A');
  ctx.restore();
}
// Khủng long chân thằn lằn cổ dài (Argentinosaurus) — dài len, chân tại yFoot, đầu bên phải.
export function sauropod(k, x, yFoot, len, o = {}) {
  const { ctx } = k; const u = len / 100;
  // cổ chếch lên vừa phải: cao vai ~1/5, đầu ~1/3 chiều dài
  const pts = [[0, -14], [14, -17], [28, -21], [42, -24], [56, -24], [66, -24], [76, -28], [86, -32], [94, -34], [100, -33], [98, -30], [90, -29], [80, -24], [70, -18],
    [68, -10], [69, 0], [63, 0], [62, -10], [52, -12], [42, -12], [41, -2], [41, 0], [35, 0], [34, -10], [26, -14], [12, -13]];
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.beginPath();
  pts.forEach(([px, py], i) => (i ? ctx.lineTo : ctx.moveTo).call(ctx, x + px * u, yFoot + py * u)); ctx.closePath(); silFill(k, o, '#9C8F6B');
  ctx.restore();
}

// ---------- cá voi xanh ----------
// Cá voi xanh nhìn ngang, đầu bên phải. (x, y) = tâm thân, len = chiều dài px.
// o.swim 0..1 biên độ quẫy đuôi (tự chạy theo thời gian), o.flip quay đầu sang trái, o.sil = vẽ hình bóng phẳng (so quy mô),
// o.mouth 0..1 há miệng + phình túi họng (cú đớp), o.alpha.
export function whale(k, x, y, len, o = {}) {
  const { ctx } = k; const u = len / 1030;
  const swing = (o.swim ?? 0.6) * Math.sin((k.gt ?? 0) * 1.4 + (o.phase ?? 0));
  const m = o.mouth ?? 0;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.translate(x, y); ctx.scale(o.flip ? -u : u, u); ctx.translate(-485, 0);
  ctx.rotate(swing * 0.012);
  const lw = (o.lw ?? 4) / u;
  // đuôi (quẫy theo trục ở cuống đuôi)
  ctx.save(); ctx.translate(120, -4); ctx.rotate(swing * 0.16);
  ctx.beginPath(); ctx.moveTo(0, -14); ctx.quadraticCurveTo(-60, -20, -150, -70); ctx.quadraticCurveTo(-120, -20, -95, 0);
  ctx.quadraticCurveTo(-120, 20, -150, 64); ctx.quadraticCurveTo(-60, 18, 0, 12); ctx.closePath();
  ctx.fillStyle = o.sil ? (o.color ?? P.sil) : P.whaleDark; ctx.fill(); ctx.strokeStyle = P.ink; ctx.lineWidth = lw; ctx.stroke();
  ctx.restore();
  // thân
  const throat = 62 + m * 230;
  ctx.beginPath();
  ctx.moveTo(1000, -2);
  ctx.bezierCurveTo(985, -30, 930, -46, 840, -58);
  ctx.bezierCurveTo(700, -70, 520, -70, 380, -56);
  ctx.lineTo(262, -44); ctx.lineTo(236, -66); ctx.lineTo(218, -42);
  ctx.bezierCurveTo(180, -32, 150, -22, 118, -16);
  ctx.lineTo(118, 14);
  ctx.bezierCurveTo(200, 30, 320, 50, 480, 60);
  ctx.bezierCurveTo(620, 70, 760, throat, 880, throat * 0.62);
  ctx.bezierCurveTo(950, 34 + m * 110, 990, 18 + m * 90, 1000 - m * 30, 6 + m * 110);
  ctx.closePath();
  if (o.sil) { ctx.fillStyle = o.color ?? P.sil; ctx.fill(); ctx.strokeStyle = P.ink; ctx.lineWidth = lw; ctx.stroke(); ctx.restore(); return; }
  const g = ctx.createLinearGradient(0, -70, 0, 70);
  g.addColorStop(0, P.whaleDark); g.addColorStop(0.55, P.whale); g.addColorStop(1, P.whaleBelly);
  ctx.fillStyle = g; ctx.fill();
  ctx.save(); ctx.clip();
  // đốm loang đặc trưng
  for (let i = 0; i < 46; i++) {
    const sx = 160 + k.rand(i + 700) * 760, sy = -55 + k.rand(i + 760) * 70;
    ctx.beginPath(); ctx.ellipse(sx, sy, 6 + 10 * k.rand(i + 800), 3 + 5 * k.rand(i + 830), 0.3, 0, TAU);
    ctx.fillStyle = 'rgba(200,220,235,0.18)'; ctx.fill();
  }
  // rãnh họng
  ctx.strokeStyle = 'rgba(14,26,43,0.28)'; ctx.lineWidth = 3 / u;
  for (let i = 0; i < 7; i++) {
    const yy = 22 + i * (8 + m * 14);
    ctx.beginPath(); ctx.moveTo(960 - i * 6, yy * 0.5 + 8); ctx.quadraticCurveTo(820, yy + 6, 640 - i * 10, yy * 0.7 + 30); ctx.stroke();
  }
  ctx.restore();
  ctx.strokeStyle = P.ink; ctx.lineWidth = lw; ctx.stroke();
  // vây ngực
  ctx.beginPath(); ctx.moveTo(720, 40); ctx.quadraticCurveTo(680, 110, 600, 140); ctx.quadraticCurveTo(650, 90, 670, 48); ctx.closePath();
  ctx.fillStyle = P.whaleDark; ctx.fill(); ctx.stroke();
  // miệng + mắt
  ctx.beginPath(); ctx.moveTo(1000, 2 + m * 10); ctx.quadraticCurveTo(940, 20 + m * 60, 868, 22 + m * 40);
  ctx.strokeStyle = P.ink; ctx.lineWidth = lw * 0.8; ctx.stroke();
  ctx.beginPath(); ctx.arc(866, 8, 6, 0, TAU); ctx.fillStyle = P.ink; ctx.fill();
  ctx.restore();
}

// Đàn nhuyễn thể (krill): chấm cam li ti quanh (x, y), bán kính r.
export function krill(k, x, y, r, n = 120, o = {}) {
  for (let i = 0; i < n; i++) {
    const a = k.rand(i + 1000) * TAU + (k.gt ?? 0) * 0.2 * (k.rand(i) - 0.5);
    const d = Math.sqrt(k.rand(i + 1100)) * r;
    k.dot(x + Math.cos(a) * d * 1.6, y + Math.sin(a) * d * 0.7, 2 + 2.5 * k.rand(i + 1200), o.color ?? '#FF9B5E', o.alpha ?? 0.8);
  }
}

// ---------- đồ vật & sinh vật bổ sung (tập 079 trở đi) ----------
const poly = (k, pts, x, y, u) => { const { ctx } = k; ctx.beginPath(); pts.forEach(([px, py], i) => (i ? ctx.lineTo : ctx.moveTo).call(ctx, x + px * u, y + py * u)); ctx.closePath(); };
// Xe máy nhìn ngang (dài len), bánh chạm yBase.
export function motorbike(k, x, yBase, len, o = {}) {
  const { ctx } = k; const u = len / 100;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  poly(k, [[18, -30], [40, -34], [55, -48], [70, -48], [74, -34], [86, -30], [88, -22], [12, -22]], x, yBase, u); silFill(k, o, o.color ?? '#D95D39');
  for (const wx of [18, 82]) { ctx.beginPath(); ctx.arc(x + wx * u, yBase - 14 * u, 14 * u, 0, TAU); ctx.fillStyle = P.ink; ctx.fill(); ctx.beginPath(); ctx.arc(x + wx * u, yBase - 14 * u, 6 * u, 0, TAU); ctx.fillStyle = '#9AA7B4'; ctx.fill(); }
  ctx.restore();
}
// Voi châu Phi nhìn ngang (dài len), chân tại yFoot, đầu bên phải.
export function elephant(k, x, yFoot, len, o = {}) {
  const u = len / 100;
  k.ctx.save(); k.ctx.globalAlpha *= o.alpha ?? 1;
  poly(k, [[0, -50], [8, -70], [30, -78], [62, -76], [72, -86], [88, -86], [98, -72], [100, -40], [96, -10], [90, -10], [92, -40], [86, -52], [80, -46], [78, 0], [66, 0], [64, -26],
    [30, -26], [28, 0], [16, 0], [14, -34], [4, -40], [-6, -30], [-2, -46]], x, yFoot, u);
  silFill(k, o, o.color ?? '#9AA3AD'); k.ctx.restore();
}
// Thuyền đánh cá gỗ miền Trung nhìn ngang (dài len), mạn nước tại yWater.
export function fishingBoat(k, x, yWater, len, o = {}) {
  const { ctx } = k; const u = len / 100;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  poly(k, [[0, -20], [8, -16], [92, -16], [100, -24], [94, 6], [6, 6]], x, yWater, u); silFill(k, o, o.color ?? '#3A6EA5');
  ctx.fillStyle = '#C0392B'; ctx.fillRect(x + 6 * u, yWater - 16 * u, 88 * u, 4 * u);
  ctx.fillStyle = '#E9DFC6'; ctx.fillRect(x + 54 * u, yWater - 30 * u, 22 * u, 14 * u); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.strokeRect(x + 54 * u, yWater - 30 * u, 22 * u, 14 * u);
  ctx.beginPath(); ctx.moveTo(x + 40 * u, yWater - 16 * u); ctx.lineTo(x + 40 * u, yWater - 52 * u); ctx.strokeStyle = P.ink; ctx.lineWidth = 3; ctx.stroke();
  ctx.restore();
}
// Cột nước phun (cá voi thở) tại (x, y), cao h, p 0..1.
export function spout(k, x, y, h, p = 1) {
  if (p <= 0) return;
  const { ctx } = k;
  ctx.save(); ctx.globalAlpha *= Math.min(1, p * 2) * (1 - Math.max(0, p - 0.7) / 0.3 * 0.8);
  for (let i = 0; i < 26; i++) {
    const a = (k.rand(i + 2000) - 0.5) * 0.7, d = h * p * (0.3 + 0.7 * k.rand(i + 2100));
    ctx.beginPath(); ctx.arc(x + Math.sin(a) * d * 0.5, y - Math.cos(a) * d, h * (0.05 + 0.07 * k.rand(i + 2200)), 0, TAU); ctx.fillStyle = 'rgba(240,248,252,0.75)'; ctx.fill();
  }
  ctx.restore();
}
// Trái tim (giải phẫu đơn giản, đỏ trầm) tâm (x, y), cao h; o.beat 0..1 phồng nhẹ.
export function heart(k, x, y, h, o = {}) {
  const { ctx } = k; const s = (h / 100) * (1 + 0.06 * (o.beat ?? 0));
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.beginPath(); ctx.moveTo(0, 50); ctx.bezierCurveTo(-45, 25, -52, -10, -36, -30); ctx.bezierCurveTo(-24, -44, -6, -40, 0, -26);
  ctx.bezierCurveTo(8, -42, 30, -46, 40, -28); ctx.bezierCurveTo(54, -4, 40, 26, 0, 50); ctx.closePath();
  ctx.fillStyle = '#A8323E'; ctx.fill(); ctx.strokeStyle = P.ink; ctx.lineWidth = 3 / s * (h / 100); ctx.stroke();
  // động mạch chủ + mạch phổi
  for (const [ax, w, c] of [[-8, 12, '#C2414F'], [12, 9, '#4A6FA5']]) {
    ctx.beginPath(); ctx.roundRect(ax - w / 2, -58, w, 34, w / 2); ctx.fillStyle = c; ctx.fill(); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(-10, -18); ctx.quadraticCurveTo(4, 6, -4, 34); ctx.strokeStyle = 'rgba(14,26,43,0.35)'; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore();
}
// Xe điện chở khách du lịch (dài len), bánh chạm yBase.
export function eCar(k, x, yBase, len, o = {}) {
  const { ctx } = k; const u = len / 100;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.fillStyle = '#E8EEF2'; ctx.strokeStyle = P.ink; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x + 2 * u, yBase - 56 * u, 96 * u, 6 * u, 2 * u); ctx.fill(); ctx.stroke();
  for (const px of [6, 50, 92]) { ctx.fillStyle = '#B9C3CC'; ctx.fillRect(x + px * u, yBase - 50 * u, 2 * u, 26 * u); }
  ctx.beginPath(); ctx.roundRect(x, yBase - 26 * u, 100 * u, 16 * u, 4 * u); ctx.fillStyle = o.color ?? '#2E9E6A'; ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#F5F1E6'; for (const sx of [12, 40, 68]) ctx.fillRect(x + sx * u, yBase - 34 * u, 20 * u, 8 * u);
  for (const wx of [16, 84]) { ctx.beginPath(); ctx.arc(x + wx * u, yBase - 8 * u, 8 * u, 0, TAU); ctx.fillStyle = P.ink; ctx.fill(); }
  ctx.restore();
}
// Cân đĩa: trụ tại (x, yBase), tay đòn dài w, nghiêng tilt (-1 trái nặng … 1 phải nặng). Trả toạ độ hai đĩa để đặt vật lên.
export function balance(k, x, yBase, w, tilt = 0, o = {}) {
  const { ctx } = k; const a = -tilt * 0.22, top = yBase - w * 0.55;
  const L = [x - Math.cos(a) * w / 2, top + Math.sin(a) * w / 2], R = [x + Math.cos(a) * w / 2, top - Math.sin(a) * w / 2];
  ctx.save(); ctx.strokeStyle = o.color ?? P.cream; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, yBase); ctx.lineTo(x, top); ctx.moveTo(x - w * 0.12, yBase); ctx.lineTo(x + w * 0.12, yBase); ctx.moveTo(...L); ctx.lineTo(...R); ctx.stroke();
  for (const [px, py] of [L, R]) {
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - w * 0.14, py + w * 0.16); ctx.moveTo(px, py); ctx.lineTo(px + w * 0.14, py + w * 0.16); ctx.stroke();
    ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(px - w * 0.17, py + w * 0.16); ctx.lineTo(px + w * 0.17, py + w * 0.16); ctx.stroke();
  }
  ctx.restore();
  return { left: [L[0], L[1] + w * 0.16], right: [R[0], R[1] + w * 0.16] };
}
// Sân bóng nhìn từ trên (dài w, rộng w*0.65), tâm (x, y).
export function pitch(k, x, y, w, o = {}) {
  const { ctx } = k; const h = w * 0.65;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  for (let i = 0; i < 10; i++) { ctx.fillStyle = i % 2 ? '#3E8E4A' : '#46994F'; ctx.fillRect(x - w / 2 + i * w / 10, y - h / 2, w / 10 + 1, h); }
  ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 4;
  ctx.strokeRect(x - w / 2, y - h / 2, w, h); ctx.beginPath(); ctx.moveTo(x, y - h / 2); ctx.lineTo(x, y + h / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y, h * 0.14, 0, TAU); ctx.stroke();
  for (const sx of [-1, 1]) ctx.strokeRect(x + sx * w / 2 - (sx > 0 ? w * 0.16 : 0), y - h * 0.3, w * 0.16, h * 0.6);
  ctx.restore();
}
// Đường điện tim: khung (x, y, w, h); bpm nhịp/phút; chạy theo k.gt; o.color, o.label.
export function ecg(k, x, y, w, h, bpm, o = {}) {
  const { ctx } = k; const per = 60 / bpm, speed = o.speed ?? 220; // px/giây
  ctx.save(); ctx.beginPath(); ctx.rect(x, y - h, w, h * 2); ctx.clip();
  ctx.beginPath();
  for (let px = 0; px <= w; px += 3) {
    const t = (k.gt ?? 0) - (w - px) / speed;
    const ph = ((t % per) + per) % per;
    let v = 0;
    if (ph < 0.08) v = Math.sin(ph / 0.08 * Math.PI) * -0.15; else if (ph < 0.12) v = 0.2; else if (ph < 0.16) v = -1; else if (ph < 0.2) v = 0.35; else if (ph < 0.32) v = Math.sin((ph - 0.2) / 0.12 * Math.PI) * -0.2;
    (px ? ctx.lineTo : ctx.moveTo).call(ctx, x + px, y + v * h);
  }
  ctx.strokeStyle = o.color ?? '#5BE38A'; ctx.lineWidth = o.lw ?? 5; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
  if (o.label) k.text(o.label, x, y - h - 24, { size: 32, font: 'title', color: o.color ?? '#5BE38A', align: 'left', p: o.p ?? 1, fx: 'fade' });
}
// Lưới chấm để đếm số lớn: n chấm hiện trong vùng (x, y, w, h); shown 0..1 số chấm đang sáng; o.dead màu chấm đã tắt.
export function dotGrid(k, x, y, w, h, n, shown = 1, o = {}) {
  const cols = Math.ceil(Math.sqrt(n * w / h)), rows = Math.ceil(n / cols), dx = w / cols, dy = h / rows, r = Math.max(1.2, Math.min(dx, dy) * 0.36);
  const lit = Math.round(n * shown);
  for (let i = 0; i < n; i++) k.dot(x + (i % cols + 0.5) * dx, y + (Math.floor(i / cols) + 0.5) * dy, r, i < lit ? (o.color ?? '#5FB0E8') : (o.dead ?? 'rgba(255,255,255,0.08)'), 1);
}
// Bản đồ đơn giản Hà Nội ↔ TP.HCM (đường cong chữ S, hai điểm), sóng âm lan p 0..1.
export function vnRoute(k, x, y, h, p = 1) {
  const { ctx } = k; const u = h / 100;
  const pts = [[18, 0], [26, 6], [22, 16], [30, 24], [40, 34], [48, 46], [54, 58], [56, 70], [50, 82], [38, 92], [30, 100]];
  ctx.save(); ctx.beginPath(); pts.forEach(([px, py], i) => (i ? ctx.lineTo : ctx.moveTo).call(ctx, x + px * u, y + py * u));
  ctx.strokeStyle = 'rgba(245,241,230,0.35)'; ctx.lineWidth = 26 * u * 0.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
  const [hx, hy] = [x + 22 * u, y + 4 * u], [sx, sy] = [x + 34 * u, y + 96 * u];
  for (let i = 0; i < 5; i++) {
    const r = (p * 1.2 - i * 0.12) * h; if (r <= 0) continue;
    ctx.beginPath(); ctx.arc(hx, hy, r, 0, TAU); ctx.strokeStyle = `rgba(95,176,232,${Math.max(0, 0.6 - r / h * 0.5)})`; ctx.lineWidth = 4; ctx.stroke();
  }
  for (const [px, py] of [[hx, hy], [sx, sy]]) { ctx.beginPath(); ctx.arc(px, py, 12, 0, TAU); ctx.fillStyle = P.gold; ctx.fill(); }
  ctx.restore();
  k.text('Hà Nội', hx + 30, hy, { size: 34, font: 'title', color: P.cream, align: 'left' });
  k.text('TP.HCM', sx + 30, sy, { size: 34, font: 'title', color: P.cream, align: 'left' });
}
// Thợ lặn bóng tối (cao h) tại (x, y), bơi ngang.
// Thợ lặn bơi ngang (dài h, đầu bên phải): thân người nằm + bình khí + chân vịt.
export function diver(k, x, y, h, o = {}) {
  const { ctx } = k; const u = h / 100;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(x, y);
  const c = o.color ?? '#1A2B3C';
  ctx.fillStyle = c; ctx.strokeStyle = P.ink; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(8 * u, -8 * u, 56 * u, 16 * u, 8 * u); ctx.fill(); ctx.stroke();            // thân
  ctx.beginPath(); ctx.arc(72 * u, -2 * u, 9 * u, 0, Math.PI * 2); ctx.fill(); ctx.stroke();                 // đầu
  ctx.fillStyle = '#F2B134'; ctx.beginPath(); ctx.roundRect(20 * u, -16 * u, 34 * u, 9 * u, 4 * u); ctx.fill(); ctx.stroke(); // bình khí
  ctx.fillStyle = '#9FD8EA'; ctx.beginPath(); ctx.roundRect(74 * u, -6 * u, 7 * u, 6 * u, 2 * u); ctx.fill();  // kính
  ctx.fillStyle = c;
  const kick = Math.sin((k.gt ?? 0) * 3) * 6 * u;
  for (const [dy, sgn] of [[-3, 1], [4, -1]]) {
    ctx.beginPath(); ctx.moveTo(10 * u, dy * u); ctx.lineTo(-14 * u, dy * u + sgn * kick); ctx.lineTo(-16 * u, dy * u + sgn * kick + 3 * u); ctx.lineTo(10 * u, dy * u + 4 * u); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-14 * u, dy * u + sgn * kick - 2 * u); ctx.lineTo(-30 * u, dy * u + sgn * kick - 6 * u); ctx.lineTo(-30 * u, dy * u + sgn * kick + 8 * u); ctx.lineTo(-14 * u, dy * u + sgn * kick + 5 * u); ctx.closePath(); ctx.fillStyle = '#F2B134'; ctx.fill(); ctx.fillStyle = c;
  }
  ctx.beginPath(); ctx.moveTo(50 * u, 4 * u); ctx.lineTo(66 * u, 14 * u); ctx.lineWidth = 5 * u; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.stroke(); // tay
  ctx.restore();
}
// Lịch 12 ô tháng, các tháng trong `on` sáng cam (tháng 0..11) tại (x, y), ô cỡ s.
export function months(k, x, y, s, on = [], p = 1) {
  const { ctx } = k;
  for (let i = 0; i < 12; i++) {
    const cx = x + (i % 6) * s * 1.15, cy = y + Math.floor(i / 6) * s * 1.15, lit = on.includes(i);
    ctx.save(); ctx.globalAlpha *= p;
    ctx.beginPath(); ctx.roundRect(cx, cy, s, s, s * 0.15); ctx.fillStyle = lit ? P.orange : 'rgba(245,241,230,0.12)'; ctx.fill();
    ctx.restore();
    k.text(`T${i + 1}`, cx + s / 2, cy + s / 2, { size: s * 0.32, font: 'title', color: lit ? P.ink : P.mute, p });
  }
}
// Biểu đồ hai đường "năng lượng tốn / thu" tại khung (x, y, w, h), p vẽ dần.
export function energyChart(k, x, y, w, h, p = 1) {
  const { ctx } = k;
  ctx.save(); ctx.strokeStyle = P.cream; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const line = (f, c) => { ctx.beginPath(); for (let i = 0; i <= 40 * p; i++) { const t = i / 40; (i ? ctx.lineTo : ctx.moveTo).call(ctx, x + t * w, y + h - f(t) * h); } ctx.strokeStyle = c; ctx.lineWidth = 7; ctx.stroke(); };
  line((t) => 0.1 + 0.45 * t, P.red); line((t) => 0.05 + 0.85 * Math.pow(t, 1.4), P.gold);
  ctx.restore();
  k.text('kích thước cơ thể →', x + w, y + h + 44, { size: 30, color: P.mute, align: 'right' });
}
// Bộ xương hoá thạch cách điệu (dài len) tâm (x, y).
export function fossil(k, x, y, len, o = {}) {
  const { ctx } = k; const u = len / 100;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.strokeStyle = o.color ?? '#E3D3B0'; ctx.lineCap = 'round';
  ctx.lineWidth = 3.2 * u; ctx.beginPath(); ctx.moveTo(x - 50 * u, y); ctx.quadraticCurveTo(x, y - 6 * u, x + 50 * u, y + 2 * u); ctx.stroke();
  ctx.lineWidth = 2.2 * u;
  for (let i = 0; i < 16; i++) { const px = x - 30 * u + i * 3.6 * u; ctx.beginPath(); ctx.moveTo(px, y - 1 * u); ctx.quadraticCurveTo(px + 3 * u, y + 10 * u, px + 1 * u, y + 16 * u - Math.abs(i - 8) * 0.8 * u); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(x + 52 * u, y + 1 * u, 7 * u, 4 * u, 0.1, 0, TAU); ctx.stroke();
  ctx.restore();
}
// Hố đen + đĩa bồi tụ (tâm x, y, bán kính r).
export function blackHole(k, x, y, r, o = {}) {
  const { ctx } = k; const rot = (k.gt ?? 0) * 0.3;
  ctx.save();
  for (let i = 0; i < 3; i++) {
    ctx.beginPath(); ctx.ellipse(x, y, r * (2.6 - i * 0.4), r * (0.55 - i * 0.08), -0.15, 0, TAU);
    ctx.strokeStyle = ['rgba(255,122,26,0.55)', 'rgba(255,170,60,0.75)', 'rgba(255,230,160,0.9)'][i]; ctx.lineWidth = r * (0.22 - i * 0.05); ctx.stroke();
  }
  const g = ctx.createRadialGradient(x, y, r * 0.9, x, y, r * 1.5); g.addColorStop(0, 'rgba(255,190,90,0.8)'); g.addColorStop(1, 'rgba(255,190,90,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.5, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#000'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(x, y + r * 0.05, r * 2.6, r * 0.5, -0.15, 0, Math.PI); ctx.strokeStyle = `rgba(255,200,110,${0.8 + 0.1 * Math.sin(rot)})`; ctx.lineWidth = r * 0.14; ctx.stroke();
  ctx.restore();
}
// Tấm sừng hàm (baleen) như răng lược: khung (x, y, w, h).
export function baleen(k, x, y, w, h, o = {}) {
  const { ctx } = k; const n = o.n ?? 26;
  ctx.save(); ctx.fillStyle = '#2D2A26'; ctx.fillRect(x, y, w, h * 0.12);
  for (let i = 0; i < n; i++) {
    const px = x + (i + 0.5) * w / n, len = h * (0.95 - 0.5 * Math.abs(i / n - 0.5));
    ctx.beginPath(); ctx.moveTo(px - w / n * 0.4, y + h * 0.1); ctx.lineTo(px + w / n * 0.4, y + h * 0.1); ctx.lineTo(px + w / n * 0.1, y + len); ctx.lineTo(px - w / n * 0.2, y + len); ctx.closePath();
    ctx.fillStyle = i % 2 ? '#3B352E' : '#4A4238'; ctx.fill();
    ctx.strokeStyle = 'rgba(220,200,170,0.35)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, y + len); ctx.lineTo(px + 6, y + len + h * 0.08); ctx.stroke();
  }
  ctx.restore();
}
// Krill vẽ (giáp xác nhỏ) tâm (x, y), dài len, quay theo hướng phải.
export function krillOne(k, x, y, len, o = {}) {
  const { ctx } = k; const u = len / 100;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(x, y);
  ctx.beginPath(); ctx.moveTo(-50 * u, 4 * u); ctx.quadraticCurveTo(-10 * u, -18 * u, 40 * u, -6 * u); ctx.quadraticCurveTo(50 * u, 0, 40 * u, 6 * u); ctx.quadraticCurveTo(-10 * u, 14 * u, -50 * u, 4 * u); ctx.closePath();
  ctx.fillStyle = 'rgba(255,155,94,0.85)'; ctx.fill(); ctx.strokeStyle = '#B5502A'; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.arc(34 * u, -4 * u, 4 * u, 0, TAU); ctx.fillStyle = P.ink; ctx.fill();
  ctx.strokeStyle = '#B5502A'; ctx.lineWidth = 1.5;
  for (let i = 0; i < 8; i++) { const px = -20 * u + i * 7 * u; ctx.beginPath(); ctx.moveTo(px, 8 * u); ctx.lineTo(px - 3 * u, 20 * u + 2 * Math.sin((k.gt ?? 0) * 12 + i) * u); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(44 * u, -4 * u); ctx.quadraticCurveTo(80 * u, -30 * u, 110 * u, -26 * u); ctx.moveTo(44 * u, -2 * u); ctx.quadraticCurveTo(80 * u, -14 * u, 105 * u, -6 * u); ctx.stroke();
  ctx.restore();
}
// Nhãn chương góc trên trái (tên chương mờ) — kênh không dùng thẻ chương to.
export function chapterTag(k, s, dark = false) {
  k.text(s.toUpperCase(), 56, 58, { size: 26, font: 'title', color: dark ? 'rgba(14,26,43,0.55)' : 'rgba(245,241,230,0.6)', align: 'left', fx: 'fade', p: k.at(0, 0.8) });
}

// ---------- vũ trụ & hố đen (tập 082 trở đi) ----------
// Trời sao bị thấu kính hấp dẫn bẻ cong quanh (cx, cy): sao gần tâm bị đẩy ra thành vòng; s 0..1 độ mạnh; o.ring vẽ vòng Einstein.
export function lensedStars(k, cx, cy, R, s = 1, o = {}) {
  const n = o.n ?? 260;
  for (let i = 0; i < n; i++) {
    let x = k.rand(i + 4000) * k.W, y = k.rand(i + 4300) * k.H;
    const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy) || 1;
    if (d < R * 2.2) { const push = (R * R / d) * s * 0.8; x += (dx / d) * push; y += (dy / d) * push; }
    const near = Math.max(0, 1 - Math.hypot(x - cx, y - cy) / (R * 2.4));
    k.dot(x, y, 1 + 2.2 * k.rand(i + 4600) + near * 1.5 * s, '#FFFFFF', 0.4 + 0.5 * k.rand(i + 4700));
  }
  if (o.ring !== false && s > 0) {
    const { ctx } = k;
    ctx.save(); ctx.globalAlpha = 0.45 * s; ctx.strokeStyle = '#CFE3FF'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cx, cy, R * (0.95 + 0.05 * s), 0, Math.PI * 2); ctx.stroke();
    // các cung sáng: ảnh của những ngôi sao phía sau bị kéo dài quanh vòng Einstein
    ctx.lineCap = 'round';
    for (let i = 0; i < 7; i++) {
      const a = k.rand(i + 4900) * Math.PI * 2, len = (0.25 + 0.35 * k.rand(i + 4950)) * s, rr = R * (1 + 0.08 * (k.rand(i + 4980) - 0.5));
      ctx.globalAlpha = (0.6 + 0.4 * k.rand(i + 4990)) * s; ctx.strokeStyle = i % 3 ? '#FFFFFF' : '#FFE9B0'; ctx.lineWidth = 3 + 4 * k.rand(i + 4995);
      ctx.beginPath(); ctx.arc(cx, cy, rr, a, a + len); ctx.stroke();
    }
    ctx.restore();
  }
}
// Đồ thị độ sáng sao (vi thấu kính): đường phẳng có một bướu; p 0..1 vẽ dần; khung (x, y, w, h).
export function lightCurve(k, x, y, w, h, p = 1, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.strokeStyle = 'rgba(245,241,230,0.35)'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  ctx.beginPath();
  for (let i = 0; i <= 120 * p; i++) {
    const t = i / 120, b = Math.exp(-Math.pow((t - 0.5) / 0.12, 2));
    (i ? ctx.lineTo : ctx.moveTo).call(ctx, x + t * w, y + h * (0.85 - 0.75 * b));
  }
  ctx.strokeStyle = o.color ?? P.gold; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
}
// Hệ Mặt Trời nhìn từ trên: tâm (cx, cy), bán kính quỹ đạo ngoài cùng rMax. o.n số hành tinh (≤ 8), o.wobble 0..1 làm quỹ đạo méo/rung,
// o.dim 0..1 Mặt Trời tắt (thành hố đen), o.fling 0..1 Trái Đất bị hất văng ra theo hướng o.flingDir, o.alpha. Trả vị trí Trái Đất.
const ORB = [0.1, 0.16, 0.22, 0.3, 0.5, 0.66, 0.83, 1];
const PLC = ['#B8A99A', '#E8C27A', '#2E86DE', '#D4643C', '#D9B38C', '#E3CF9C', '#9AD3DE', '#4C6FD8'];
export function solarSystem(k, cx, cy, rMax, o = {}) {
  const { ctx } = k; const n = o.n ?? 8, w = o.wobble ?? 0, t = (k.gt ?? 0) * (o.speed ?? 0.15);
  let earthPos = null;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  for (let i = 0; i < n; i++) {
    const r = ORB[i] * rMax, ex = 1 + w * 0.25 * Math.sin(i * 1.7 + t * 2), ey = 1 - w * 0.2 * Math.cos(i * 1.3 + t * 2);
    ctx.beginPath(); ctx.ellipse(cx + w * 30 * Math.sin(i + t), cy, r * ex, r * ey, w * 0.3 * Math.sin(i), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(245,241,230,${0.18 + 0.1 * w})`; ctx.lineWidth = 2; ctx.stroke();
    const a = t / Math.pow(ORB[i], 1.5) * 0.4 + i * 1.3;
    let px = cx + w * 30 * Math.sin(i + t) + Math.cos(a) * r * ex, py = cy + Math.sin(a) * r * ey;
    if (i === 2 && o.fling) { const [fx, fy] = o.flingDir ?? [1, -0.4]; px += fx * o.fling * k.W; py += fy * o.fling * k.W; }
    if (i === 2) earthPos = [px, py];
    k.dot(px, py, Math.max(3, (i >= 4 ? 9 : 5) * rMax / 500), PLC[i], 1);
  }
  const dim = o.dim ?? 0;
  if (dim < 1) { k.dot(cx, cy, rMax * 0.05 + 12, '#FFD34E', 1 - dim); k.dot(cx, cy, rMax * 0.09 + 20, '#FFB43A', 0.25 * (1 - dim)); }
  if (dim > 0) k.dot(cx, cy, rMax * 0.02 + 6, '#000000', dim);
  ctx.restore();
  return earthPos;
}
// Vỏ đám mây Oort: các chấm băng thưa trong vành (cx, cy, r); o.stir 0..1 làm một phần bứt ra lao vào trong.
export function oortShell(k, cx, cy, r, o = {}) {
  const n = o.n ?? 420, stir = o.stir ?? 0;
  for (let i = 0; i < n; i++) {
    const a = k.rand(i + 5000) * Math.PI * 2, d = r * (0.85 + 0.3 * k.rand(i + 5100));
    let x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * 0.92;
    if (stir && i % 9 === 0) { const f = Math.min(1, stir * (1 + k.rand(i))); x = lerp(x, cx, f * 0.8); y = lerp(y, cy, f * 0.8); }
    k.dot(x, y, (o.size ?? 3) * (0.7 + k.rand(i + 5200)), '#CFE8F0', 0.5 + 0.45 * k.rand(i + 5300));
  }
}
// Sao chổi: đầu tại (x, y), đuôi dài len theo góc ang (radian, đuôi luôn hướng ra xa Mặt Trời).
export function comet(k, x, y, len, ang, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  const g = ctx.createLinearGradient(x, y, x + Math.cos(ang) * len, y + Math.sin(ang) * len);
  g.addColorStop(0, 'rgba(230,245,255,0.9)'); g.addColorStop(1, 'rgba(120,170,255,0)');
  ctx.beginPath(); ctx.moveTo(x + Math.cos(ang + 1.57) * len * 0.04, y + Math.sin(ang + 1.57) * len * 0.04);
  ctx.lineTo(x + Math.cos(ang + 0.08) * len, y + Math.sin(ang + 0.08) * len); ctx.lineTo(x + Math.cos(ang - 0.08) * len, y + Math.sin(ang - 0.08) * len);
  ctx.lineTo(x + Math.cos(ang - 1.57) * len * 0.04, y + Math.sin(ang - 1.57) * len * 0.04); ctx.closePath(); ctx.fillStyle = g; ctx.fill();
  ctx.restore();
  k.dot(x, y, Math.max(3, len * 0.035), '#FFFFFF', o.alpha ?? 1);
}
// Siêu tân tinh: chớp sáng nở ra tại (x, y) bán kính r, p 0..1.
export function supernova(k, x, y, r, p = 1) {
  if (p <= 0) return;
  const { ctx } = k; const e = Math.min(1, p * 1.4), fade = 1 - Math.max(0, p - 0.5) * 2;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * e);
  g.addColorStop(0, `rgba(255,255,240,${fade})`); g.addColorStop(0.4, `rgba(255,190,90,${0.8 * fade})`); g.addColorStop(1, 'rgba(255,90,40,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * e, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; ctx.strokeStyle = `rgba(255,220,150,${0.6 * fade})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * e * 0.5, y + Math.sin(a) * r * e * 0.5); ctx.lineTo(x + Math.cos(a) * r * e * 1.1, y + Math.sin(a) * r * e * 1.1); ctx.stroke(); }
}
// Trái Đất bị lực thuỷ triều kéo dẹt (stretch 0..1) rồi xé vụn (shred 0..1) về phía điểm (tx, ty).
export function earthTorn(k, x, y, r, stretch = 0, shred = 0, tx = x + 400, ty = y) {
  const { ctx } = k; const ang = Math.atan2(ty - y, tx - x);
  if (shred < 1) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(1 + stretch * 0.9, 1 - stretch * 0.4); ctx.rotate(-ang);
    ctx.globalAlpha *= 1 - shred; earth(k, 0, 0, r, { spin: 0 }); ctx.restore();
  }
  if (shred > 0) for (let i = 0; i < 70; i++) {
    const f = k.rand(i + 6000), sp = shred * (0.3 + f) * Math.hypot(tx - x, ty - y);
    const a = ang + (k.rand(i + 6100) - 0.5) * (0.6 + shred * 1.2) + shred * f * 1.6;
    k.dot(x + Math.cos(a) * sp, y + Math.sin(a) * sp, 2 + 5 * k.rand(i + 6200), i % 3 ? '#8C6B4F' : '#2E86DE', 1 - shred * 0.3);
  }
}
// Mặt cắt đáy biển dưới lớp băng + miệng phun thuỷ nhiệt (khung toàn màn hình), p 0..1 hiện sinh vật phát sáng.
export function ventSection(k, p = 1) {
  const { ctx } = k; const W = k.W, H = k.H;
  ctx.fillStyle = '#05070D'; ctx.fillRect(0, 0, W, H * 0.18);
  ctx.fillStyle = '#DDEBF3'; ctx.fillRect(0, H * 0.18, W, H * 0.1);
  const g = ctx.createLinearGradient(0, H * 0.28, 0, H); g.addColorStop(0, '#06263A'); g.addColorStop(1, '#010810');
  ctx.fillStyle = g; ctx.fillRect(0, H * 0.28, W, H * 0.72);
  ctx.fillStyle = '#1A1410'; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H * 0.86); ctx.quadraticCurveTo(W * 0.3, H * 0.8, W * 0.5, H * 0.84); ctx.quadraticCurveTo(W * 0.75, H * 0.88, W, H * 0.83); ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
  const vx = W * 0.55, vy = H * 0.84;
  ctx.fillStyle = '#2B2019'; ctx.beginPath(); ctx.moveTo(vx - 60, vy + 10); ctx.lineTo(vx - 18, vy - 170); ctx.lineTo(vx + 18, vy - 170); ctx.lineTo(vx + 60, vy + 10); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 40; i++) {
    const t = ((k.gt ?? 0) * 0.25 + k.rand(i + 7000)) % 1;
    k.dot(vx + Math.sin(t * 6 + i) * 30 * t, vy - 170 - t * 420, 10 + 30 * t, `rgba(${200 - 80 * t},${90 - 40 * t},60,1)`, 0.35 * (1 - t));
  }
  for (let i = 0; i < 18; i++) k.dot(vx + (k.rand(i + 7100) - 0.5) * 420, vy - 40 - k.rand(i + 7200) * 160, 3 + 3 * k.rand(i + 7300), '#7CF5E0', p * (0.4 + 0.5 * Math.sin((k.gt ?? 0) * 2 + i)));
}
// Cá mập nhìn ngang, đầu bên phải: mõm nhọn, đuôi lưỡi liềm (thùy trên dài), vây lưng tam giác, vây ngực dài, khe mang,
// lưng tối bụng sáng. (x, y) tâm thân, len chiều dài px. o.color màu lưng, o.belly màu bụng, o.swim biên độ quẫy, o.alpha, o.phase.
export function shark(k, x, y, len, o = {}) {
  const { ctx } = k; const u = len / 100; const sw = Math.sin((k.gt ?? 0) * 2.2 + (o.phase ?? 0)) * (o.swim ?? 0.5);
  const back = o.color ?? '#3B4A57', belly = o.belly ?? '#C9D3DB';
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(x - 52 * u, y); ctx.scale(u, u);
  const lw = 2.6 / u;
  // đuôi (quẫy quanh cuống đuôi)
  ctx.save(); ctx.translate(12, 0); ctx.rotate(sw * 0.18);
  ctx.beginPath(); ctx.moveTo(0, -3.5); ctx.quadraticCurveTo(-6, -14, -12, -30); ctx.quadraticCurveTo(-8, -12, -6, 0); ctx.quadraticCurveTo(-8, 8, -11, 17); ctx.quadraticCurveTo(-5, 9, 0, 3.5); ctx.closePath();
  ctx.fillStyle = back; ctx.fill(); ctx.strokeStyle = P.ink; ctx.lineWidth = lw; ctx.stroke(); ctx.restore();
  // thân
  const body = () => {
    ctx.beginPath(); ctx.moveTo(104, 1.5);
    ctx.quadraticCurveTo(101, -6, 90, -10); ctx.quadraticCurveTo(76, -14, 60, -14.5);
    ctx.lineTo(52, -33); ctx.quadraticCurveTo(48, -24, 45, -14);
    ctx.quadraticCurveTo(30, -11, 12, -3.5);
    ctx.lineTo(12, 3.5); ctx.quadraticCurveTo(24, 7, 34, 8.5); ctx.lineTo(37, 13); ctx.lineTo(40, 9);
    ctx.quadraticCurveTo(60, 12, 80, 10.5); ctx.quadraticCurveTo(96, 9, 104, 1.5); ctx.closePath();
  };
  body(); ctx.fillStyle = back; ctx.fill();
  ctx.save(); body(); ctx.clip(); ctx.fillStyle = belly; ctx.beginPath(); ctx.moveTo(10, 5); ctx.quadraticCurveTo(60, 1, 104, 3); ctx.lineTo(104, 20); ctx.lineTo(10, 20); ctx.closePath(); ctx.fill(); ctx.restore();
  body(); ctx.strokeStyle = P.ink; ctx.lineWidth = lw; ctx.stroke();
  // vây ngực
  ctx.beginPath(); ctx.moveTo(74, 8); ctx.quadraticCurveTo(66, 18, 60, 27); ctx.quadraticCurveTo(68, 20, 80, 10); ctx.closePath(); ctx.fillStyle = back; ctx.fill(); ctx.stroke();
  // khe mang, mắt, miệng
  ctx.strokeStyle = 'rgba(14,26,43,0.55)'; ctx.lineWidth = lw * 0.6;
  for (let g = 0; g < 5; g++) { ctx.beginPath(); ctx.moveTo(78 + g * 1.8, -4); ctx.quadraticCurveTo(77 + g * 1.8, 1, 78.5 + g * 1.8, 6); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(94, -3.2, 1.1, 0, Math.PI * 2); ctx.fillStyle = '#0A0F14'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(100, 5); ctx.quadraticCurveTo(95, 8.5, 87, 7.5); ctx.strokeStyle = 'rgba(14,26,43,0.8)'; ctx.lineWidth = lw * 0.8; ctx.stroke();
  ctx.restore();
}
// Các đường đẳng thế hấp dẫn đồng tâm quanh (x, y) — dùng để so ngôi sao và hố đen cùng khối lượng.
export function gravityRings(k, x, y, r, o = {}) {
  const { ctx } = k;
  for (let i = 1; i <= (o.n ?? 6); i++) { ctx.beginPath(); ctx.arc(x, y, r * i / (o.n ?? 6) * 1.6, 0, Math.PI * 2); ctx.strokeStyle = `rgba(95,176,232,${0.5 - i * 0.06})`; ctx.lineWidth = 2; ctx.setLineDash([10, 10]); ctx.stroke(); }
  ctx.setLineDash([]);
}

// ---------- chữ thumbnail (skill `thumbnail`) ----------
// Dòng chữ lớn viền tối.
export function thumbLine(k, text, x, y, size, color = P.cream, o = {}) {
  k.text(text, x, y, { size, font: 'title', color, outline: o.outline ?? '#06101A', outlineWidth: o.ow ?? 20, align: o.align ?? 'center', p: o.p ?? 1 });
}
// Dòng câu hỏi trên khối màu (nổi rõ ở cỡ điện thoại).
export function thumbAsk(k, text, x, y, size, bg = P.gold, color = '#06101A', align = 'center') {
  const { ctx } = k;
  ctx.font = `800 ${size}px "Be Vietnam Pro"`;
  const w = ctx.measureText(text).width;
  const bx = align === 'left' ? x - 24 : align === 'right' ? x - w - 24 : x - w / 2 - 24;
  ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(bx, y - size * 0.66, w + 48, size * 1.28, 18); ctx.fill();
  k.text(text, x, y, { size, font: 'title', color, align });
}
// Hộp dữ kiện kiểu thumbnail người dùng tự làm (tập 079): nền tối bo góc, mỗi dữ kiện một "viên" màu, dòng cuối là câu hỏi.
// items = [[chữ, màu nền, màu chữ?], …]; question = câu hỏi (vàng, không nền). Góc trên trái của hộp tại (x, y).
export function factBox(k, x, y, items, question, o = {}) {
  const { ctx } = k; const size = o.size ?? 64, gap = size * 1.45, pad = 30;
  ctx.font = `800 ${size}px "Be Vietnam Pro"`;
  const wq = question ? ctx.measureText(question).width : 0;
  const w = Math.max(wq, ...items.map(([t]) => ctx.measureText(t).width + 40)) + pad * 2;
  const h = gap * (items.length + (question ? 1 : 0)) + pad;
  ctx.fillStyle = 'rgba(8,12,22,0.82)'; ctx.beginPath(); ctx.roundRect(x, y, w, h, 28); ctx.fill();
  items.forEach(([t, bg, fg], i) => {
    const cy = y + pad + gap * i + size * 0.62, tw = ctx.measureText(t).width;
    ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(x + pad, cy - size * 0.66, tw + 40, size * 1.28, 14); ctx.fill();
    k.text(t, x + pad + 20, cy, { size, font: 'title', color: fg ?? '#06101A', align: 'left' });
  });
  if (question) k.text(question, x + pad, y + pad + gap * items.length + size * 0.62, { size, font: 'title', color: P.gold, align: 'left', outline: '#06101A', outlineWidth: 10 });
}

// ---------- cá mập & cổ sinh (tập 085 trở đi) ----------
// Răng cá mập (Megalodon) tâm (x, y), cao h; o.coat 0..1 phủ lớp mangan đen; o.white = răng trắng (cá mập trắng hiện đại).
export function tooth(k, x, y, h, o = {}) {
  const { ctx } = k; const w = h * 0.86;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rotate ?? 0); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.beginPath(); ctx.moveTo(-w / 2, -h * 0.28); ctx.quadraticCurveTo(0, -h * 0.52, w / 2, -h * 0.28); ctx.lineTo(w * 0.36, -h * 0.18);
  ctx.lineTo(0, h * 0.5); ctx.lineTo(-w * 0.36, -h * 0.18); ctx.closePath();
  ctx.fillStyle = o.white ? '#F2EEE6' : (o.coat ? '#2B2621' : '#5B5146'); ctx.fill(); ctx.strokeStyle = P.ink; ctx.lineWidth = Math.max(2, h * 0.02); ctx.stroke();
  // chân răng (root) + răng cưa hai mép
  ctx.beginPath(); ctx.moveTo(-w / 2, -h * 0.28); ctx.quadraticCurveTo(0, -h * 0.52, w / 2, -h * 0.28); ctx.lineTo(w * 0.42, -h * 0.2); ctx.quadraticCurveTo(0, -h * 0.36, -w * 0.42, -h * 0.2); ctx.closePath();
  ctx.fillStyle = o.white ? '#D8CFC0' : '#3A332C'; ctx.fill();
  ctx.strokeStyle = o.white ? 'rgba(14,26,43,0.35)' : 'rgba(230,220,200,0.5)'; ctx.lineWidth = Math.max(1, h * 0.008);
  for (let i = 0; i < 14; i++) { const t = i / 14; for (const s of [-1, 1]) { const px = s * lerp(w * 0.36, 0, t), py = lerp(-h * 0.18, h * 0.5, t); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + s * h * 0.018, py - h * 0.01); ctx.stroke(); } }
  if (o.coat) { ctx.globalAlpha *= o.coat; ctx.fillStyle = 'rgba(20,16,12,0.55)'; ctx.beginPath(); ctx.ellipse(-w * 0.12, h * 0.05, w * 0.3, h * 0.25, 0.3, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}
// Nhiệt kế đứng tại (x, y) cao h, mức level 0..1, nhãn text.
export function thermometer(k, x, y, h, level, o = {}) {
  const { ctx } = k; const w = h * 0.12;
  ctx.save(); ctx.fillStyle = 'rgba(245,241,230,0.9)'; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h, w, h, w / 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, w, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = o.color ?? P.red; ctx.beginPath(); ctx.arc(x, y, w * 0.7, 0, Math.PI * 2); ctx.fill();
  ctx.fillRect(x - w * 0.25, y - h * level * 0.92, w * 0.5, h * level * 0.92); ctx.restore();
  if (o.text) k.text(o.text, x + w * 1.6, y - h * level * 0.9, { size: o.size ?? 44, font: 'title', color: o.color ?? P.red, align: 'left', outline: P.ink, outlineWidth: 8, p: o.p ?? 1, fx: 'fade' });
}
// Tháp chuỗi thức ăn 4 tầng tại (cx, y đáy), rộng w; o.top = danh sách nhãn ở tầng đỉnh; trả toạ độ tâm tầng đỉnh.
export function foodPyramid(k, cx, yb, w, o = {}) {
  const { ctx } = k; const levels = o.levels ?? ['sinh vật phù du', 'cá nhỏ', 'cá lớn, hải cẩu', 'kẻ săn mồi đỉnh'];
  const h = w * 0.62, lh = h / levels.length;
  levels.forEach((t, i) => {
    const y1 = yb - i * lh, y2 = y1 - lh, half1 = w / 2 * (1 - i / levels.length), half2 = w / 2 * (1 - (i + 1) / levels.length);
    ctx.beginPath(); ctx.moveTo(cx - half1, y1); ctx.lineTo(cx + half1, y1); ctx.lineTo(cx + half2, y2); ctx.lineTo(cx - half2, y2); ctx.closePath();
    ctx.fillStyle = ['#1F5F7A', '#2E7D8F', '#3E97A3', '#E5383B'][i] ?? '#2E7D8F'; ctx.globalAlpha = 0.85; ctx.fill(); ctx.globalAlpha = 1;
    ctx.strokeStyle = P.ink; ctx.lineWidth = 3; ctx.stroke();
    if (i < levels.length - 1) k.text(t, cx, y1 - lh / 2, { size: Math.min(34, lh * 0.36), font: 'title', color: P.cream });
  });
  return [cx, yb - h + lh * 0.45];
}

// Cảnh cuối Short "BẢN ĐẦY ĐỦ": poster (meta.images.poster = thumbnail tập dài) + tên tập + mũi tên. Dùng trong draw của cảnh có cue {full}.
export function shortEnd(k, title) {
  const W = k.W;
  fill(k, P.space);
  k.text('BẢN ĐẦY ĐỦ', W / 2, 260, { size: 100, font: 'title', color: P.gold, outline: P.ink, outlineWidth: 14, fx: 'pop', p: k.at('full', 0.5) });
  const p = k.at('full', 0.6, 'back'), w = W - 120, h = (w * 9) / 16;
  k.group({ x: W / 2, y: 330 + h / 2, s: Math.max(0.01, p) }, () => {
    k.ctx.fillStyle = P.cream; k.ctx.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20);
    k.image('poster', -w / 2, -h / 2, w, h, { fx: 'fade', p: p > 0 ? 1 : 0 });
  });
  k.text(title, W / 2, 330 + h + 90, { size: 50, font: 'title', color: P.cream, outline: P.ink, outlineWidth: 8, fx: 'fade', p: k.at(k.cue('full', 0.6), 0.6), maxWidth: W - 100 });
  const bob = Math.sin(k.t * 6) * 14;
  k.arrow(W / 2, 1060 + bob, W / 2, 1200 + bob, { p: k.at(k.cue('full', 1.5), 0.5), width: 10, head: 40, stroke: P.gold, seed: 802 });
}

// ---------- khủng long & va chạm (tập 090 trở đi) ----------
// Tiểu hành tinh đá tối (tâm x, y, bán kính r). o.rot góc quay, o.glow 0..1 lớp plasma khi xuyên khí quyển, o.dir hướng bay (radian), o.seed.
export function asteroid(k, x, y, r, o = {}) {
  const { ctx } = k; const s = o.seed ?? 900, n = 15, rot = o.rot ?? 0, dir = o.dir ?? Math.PI * 0.75;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  if (o.glow) {
    const g = o.glow, tx = x - Math.cos(dir) * r * 7 * g, ty = y - Math.sin(dir) * r * 7 * g;
    const lg = ctx.createLinearGradient(x, y, tx, ty); lg.addColorStop(0, `rgba(255,200,110,${0.9 * g})`); lg.addColorStop(1, 'rgba(255,90,30,0)');
    const nx = -Math.sin(dir) * r * 1.1, ny = Math.cos(dir) * r * 1.1;
    ctx.beginPath(); ctx.moveTo(x + nx, y + ny); ctx.lineTo(tx, ty); ctx.lineTo(x - nx, y - ny); ctx.closePath(); ctx.fillStyle = lg; ctx.fill();
    const hg = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * (1.6 + g)); hg.addColorStop(0, `rgba(255,236,190,${0.95 * g})`); hg.addColorStop(1, 'rgba(255,120,40,0)');
    ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(x, y, r * (1.6 + g), 0, TAU); ctx.fill();
  }
  ctx.beginPath();
  for (let i = 0; i <= n; i++) { const a = rot + i / n * TAU, rr = r * (0.82 + 0.26 * k.rand(s + (i % n))); (i ? ctx.lineTo : ctx.moveTo).call(ctx, x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.86); }
  ctx.closePath(); ctx.fillStyle = o.color ?? '#4A433C'; ctx.fill(); ctx.strokeStyle = P.ink; ctx.lineWidth = Math.max(2, r * 0.04); ctx.stroke();
  ctx.clip();
  for (let i = 0; i < 6; i++) { const a = rot + k.rand(s + 40 + i) * TAU, d = r * 0.6 * k.rand(s + 60 + i); ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * d, y + Math.sin(a) * d, r * (0.1 + 0.14 * k.rand(s + 80 + i)), r * (0.07 + 0.1 * k.rand(s + 90 + i)), a, 0, TAU); ctx.fillStyle = 'rgba(20,16,12,0.45)'; ctx.fill(); }
  const sh = ctx.createLinearGradient(x - r, y - r, x + r, y + r); sh.addColorStop(0, 'rgba(255,255,255,0.12)'); sh.addColorStop(1, 'rgba(0,0,0,0.45)'); ctx.fillStyle = sh; ctx.fillRect(x - r * 1.2, y - r * 1.2, r * 2.4, r * 2.4);
  if (o.glow) { ctx.fillStyle = `rgba(255,170,80,${0.35 * o.glow})`; ctx.fillRect(x - r * 1.2, y - r * 1.2, r * 2.4, r * 2.4); }
  ctx.restore();
}
function silPath(k, x, yFoot, u, pts, o, def) {
  const { ctx } = k; const f = o.flip ? -1 : 1;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.beginPath();
  pts.forEach(([px, py], i) => (i ? ctx.lineTo : ctx.moveTo).call(ctx, x + f * (px - 50) * u, yFoot + py * u)); ctx.closePath();
  silFill(k, o, def); ctx.restore();
}
// Triceratops nhìn ngang (dài len), chân tại yFoot, tâm ngang x, đầu bên phải (o.flip để quay trái).
export function triceratops(k, x, yFoot, len, o = {}) {
  silPath(k, x, yFoot, len / 100, [[0, -17], [10, -21], [25, -27], [40, -30], [55, -29], [64, -26], [67, -33], [72, -40], [77, -39], [79, -31], [81, -30], [93, -37], [85, -26], [93, -23], [96, -27], [97, -22], [100, -19],
    [96, -15], [89, -14], [83, -16], [76, -14], [74, -9], [75, 0], [69, 0], [67, -10], [59, -12], [47, -12], [45, -6], [46, 0], [39, 0], [36, -10], [30, -14], [18, -15]], o, '#7E8B5A');
}
// Thú có vú nhỏ (cỡ chuột chù) nhìn ngang, dài len (kể cả đuôi).
export function mammal(k, x, yFoot, len, o = {}) {
  const { ctx } = k; const u = len / 100, f = o.flip ? -1 : 1, X = (v) => x + f * (v - 50) * u;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.beginPath(); ctx.moveTo(X(22), yFoot - 8 * u); ctx.quadraticCurveTo(X(5), yFoot - 2 * u, X(-8), yFoot - 6 * u); ctx.strokeStyle = o.color ?? '#9A7B5E'; ctx.lineWidth = 3 * u; ctx.lineCap = 'round'; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(X(45), yFoot - 12 * u, 26 * u, 11 * u, 0, 0, TAU);
  ctx.moveTo(X(66), yFoot - 18 * u); ctx.quadraticCurveTo(X(82), yFoot - 18 * u, X(96), yFoot - 9 * u); ctx.quadraticCurveTo(X(80), yFoot - 4 * u, X(64), yFoot - 6 * u); ctx.closePath();
  silFill(k, o, '#9A7B5E');
  ctx.beginPath(); ctx.arc(X(70), yFoot - 21 * u, 5 * u, 0, TAU); silFill(k, o, '#B8957A');
  k.dot(X(80), yFoot - 13 * u, 1.6 * u, P.ink);
  ctx.restore();
}
// Chim (gà) nhìn ngang, cao ~ len*0.75, chân tại yFoot.
export function bird(k, x, yFoot, len, o = {}) {
  const { ctx } = k; const u = len / 100, f = o.flip ? -1 : 1, X = (v) => x + f * (v - 50) * u;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.strokeStyle = '#E0A33A'; ctx.lineWidth = 3 * u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(X(46), yFoot - 22 * u); ctx.lineTo(X(42), yFoot); ctx.moveTo(X(54), yFoot - 22 * u); ctx.lineTo(X(56), yFoot); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(X(22), yFoot - 42 * u); ctx.lineTo(X(8), yFoot - 70 * u); ctx.lineTo(X(30), yFoot - 50 * u); ctx.closePath(); silFill(k, o, o.color ?? '#B5542C');
  ctx.beginPath(); ctx.ellipse(X(48), yFoot - 40 * u, 28 * u, 19 * u, 0, 0, TAU); silFill(k, o, o.color ?? '#C9683A');
  ctx.beginPath(); ctx.moveTo(X(62), yFoot - 48 * u); ctx.lineTo(X(70), yFoot - 66 * u); ctx.lineTo(X(78), yFoot - 50 * u); ctx.closePath(); silFill(k, o, o.color ?? '#C9683A');
  ctx.beginPath(); ctx.arc(X(73), yFoot - 66 * u, 10 * u, 0, TAU); silFill(k, o, o.color ?? '#C9683A');
  ctx.beginPath(); ctx.moveTo(X(81), yFoot - 69 * u); ctx.lineTo(X(92), yFoot - 65 * u); ctx.lineTo(X(81), yFoot - 61 * u); ctx.closePath(); ctx.fillStyle = '#E0A33A'; ctx.fill();
  ctx.beginPath(); ctx.arc(X(70), yFoot - 77 * u, 4 * u, 0, TAU); ctx.arc(X(76), yFoot - 78 * u, 4 * u, 0, TAU); ctx.fillStyle = P.red; ctx.fill();
  k.dot(X(76), yFoot - 68 * u, 1.8 * u, P.ink);
  ctx.restore();
}
// Cảnh đất liền kỷ Phấn Trắng: trời (o.sky: 'calm'|'red'|'dark'), đồi xa, mặt đất tại o.y, dòng sông, cây tuế/dương xỉ/thông.
export function cretaceous(k, o = {}) {
  const { ctx } = k; const W = k.W, H = k.H, y = o.y ?? H * 0.72, sky = o.sky ?? 'calm';
  const skies = { calm: ['#7FB3CF', '#E8D9B5'], red: ['#3A0E0E', '#E0662A'], dark: ['#0D0C10', '#2A2420'], dusk: ['#2B3A5C', '#D98C5F'] };
  const [t, b] = skies[sky] ?? skies.calm;
  const g = ctx.createLinearGradient(0, 0, 0, y); g.addColorStop(0, t); g.addColorStop(1, b); ctx.fillStyle = g; ctx.fillRect(0, 0, W, y);
  const tone = sky === 'calm' ? 1 : sky === 'dusk' ? 0.6 : 0.35;
  const col = (r, gg, bb) => `rgb(${Math.round(r * tone)},${Math.round(gg * tone)},${Math.round(bb * tone)})`;
  ctx.beginPath(); ctx.moveTo(0, y); for (let x = 0; x <= W; x += 60) ctx.lineTo(x, y - 60 - 50 * Math.sin(x * 0.004 + 1) - 30 * k.rand(Math.floor(x / 60) + 3100)); ctx.lineTo(W, y); ctx.closePath(); ctx.fillStyle = col(96, 120, 92); ctx.fill();
  ctx.fillStyle = col(120, 140, 80); ctx.fillRect(0, y, W, H - y);
  if (o.river !== false) { ctx.beginPath(); ctx.moveTo(0, y + 70); ctx.bezierCurveTo(W * 0.3, y + 40, W * 0.6, y + 140, W, y + 90); ctx.lineTo(W, y + 170); ctx.bezierCurveTo(W * 0.6, y + 220, W * 0.3, y + 120, 0, y + 150); ctx.closePath(); ctx.fillStyle = sky === 'calm' ? '#5E9DB8' : col(80, 110, 130); ctx.fill(); }
  for (let i = 0; i < (o.trees ?? 9); i++) {
    const tx = W * (0.04 + 0.11 * i) + 40 * k.rand(i + 3200), th = 120 + 120 * k.rand(i + 3300), ty = y + 6;
    if (i % 3 === 0) { ctx.beginPath(); ctx.moveTo(tx, ty - th); ctx.lineTo(tx - th * 0.22, ty); ctx.lineTo(tx + th * 0.22, ty); ctx.closePath(); ctx.fillStyle = col(46, 80, 52); ctx.fill(); }
    else { ctx.strokeStyle = col(60, 98, 54); ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let j = 0; j < 7; j++) { const a = -Math.PI / 2 + (j - 3) * 0.38; ctx.beginPath(); ctx.moveTo(tx, ty - th * 0.25); ctx.quadraticCurveTo(tx + Math.cos(a) * th * 0.3, ty - th * 0.25 + Math.sin(a) * th * 0.45, tx + Math.cos(a) * th * 0.5, ty - th * 0.2 + Math.sin(a) * th * 0.35); ctx.stroke(); } ctx.fillStyle = col(90, 70, 50); ctx.fillRect(tx - 7, ty - th * 0.25, 14, th * 0.25); }
  }
}
// Mưa mảnh vụn nóng chảy rơi xuyên khí quyển: n vệt sáng chéo, p 0..1 mật độ, o.speed.
export function ejectaRain(k, p = 1, o = {}) {
  if (p <= 0) return;
  const { ctx } = k; const n = Math.round((o.n ?? 70) * p), sp = o.speed ?? 0.35, t = k.gt ?? 0;
  ctx.save(); ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const ph = (k.rand(i + 7000) + t * sp * (0.6 + k.rand(i + 7100))) % 1;
    const x0 = k.rand(i + 7200) * k.W * 1.3 - k.W * 0.1, x = x0 - ph * 500, y = -100 + ph * (k.H + 200), L = 60 + 120 * k.rand(i + 7300);
    const g = ctx.createLinearGradient(x, y, x + L * 0.6, y - L); g.addColorStop(0, 'rgba(255,230,170,0.95)'); g.addColorStop(1, 'rgba(255,110,40,0)');
    ctx.strokeStyle = g; ctx.lineWidth = 2 + 3 * k.rand(i + 7400); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + L * 0.6, y - L); ctx.stroke();
  }
  ctx.restore();
}
// Mặt cắt địa tầng có hố va chạm: tâm cx, mặt đất y, rộng w, sâu d (px); o.p 0..1 khoét dần, o.melt hiện lớp đá nóng chảy.
export function craterSection(k, cx, y, w, d, o = {}) {
  const { ctx } = k; const W = k.W, p = o.p ?? 1;
  const bands = ['#C9B58E', '#B49A70', '#9C8160', '#7D6650', '#5E4C3E'];
  bands.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(0, y + i * 70, W, 70); });
  ctx.fillStyle = '#4A3C31'; ctx.fillRect(0, y + 350, W, k.H - y - 350);
  if (p > 0) {
    ctx.beginPath(); ctx.moveTo(cx - w / 2 * p, y);
    ctx.bezierCurveTo(cx - w * 0.3 * p, y + d * p, cx + w * 0.3 * p, y + d * p, cx + w / 2 * p, y); ctx.closePath();
    ctx.fillStyle = o.melt ? '#E0662A' : '#1A1210'; ctx.fill();
    ctx.strokeStyle = P.ink; ctx.lineWidth = 4; ctx.stroke();
  }
}
// Bức tường sóng thần: chân tại (x, yBase), cao h, rộng w, hướng sang phải; cuộn đầu sóng.
export function tsunami(k, x, yBase, h, w, o = {}) {
  const { ctx } = k; const t = k.gt ?? 0;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.beginPath(); ctx.moveTo(x - w, yBase);
  for (let i = 0; i <= 20; i++) { const f = i / 20; ctx.lineTo(x - w + f * w * 0.85, yBase - h * Math.pow(f, 1.6) + 8 * Math.sin(t * 2 + i)); }
  ctx.quadraticCurveTo(x + w * 0.05, yBase - h * 1.08, x + w * 0.12, yBase - h * 0.82);
  ctx.quadraticCurveTo(x + w * 0.02, yBase - h * 0.86, x, yBase - h * 0.6); ctx.lineTo(x + w * 0.04, yBase); ctx.closePath();
  const g = ctx.createLinearGradient(0, yBase - h, 0, yBase); g.addColorStop(0, '#5FA8C4'); g.addColorStop(1, '#0E3A50'); ctx.fillStyle = g; ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - w * 0.1, yBase - h * 0.95); ctx.quadraticCurveTo(x + w * 0.05, yBase - h * 1.08, x + w * 0.12, yBase - h * 0.82); ctx.stroke();
  ctx.restore();
}
// Cá hoá thạch trong đá, các hạt thuỷ tinh (spherule) phát sáng ở mang. (x, y) tâm, dài len, o.beads 0..1.
export function fishFossil(k, x, y, len, o = {}) {
  const { ctx } = k; const u = len / 100;
  ctx.save(); ctx.strokeStyle = o.color ?? '#3A2E24'; ctx.lineCap = 'round'; ctx.lineWidth = 2.4 * u;
  ctx.beginPath(); ctx.moveTo(x - 50 * u, y); ctx.quadraticCurveTo(x - 10 * u, y - 22 * u, x + 38 * u, y - 6 * u); ctx.quadraticCurveTo(x + 50 * u, y, x + 38 * u, y + 6 * u); ctx.quadraticCurveTo(x - 10 * u, y + 22 * u, x - 50 * u, y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - 50 * u, y); ctx.lineTo(x - 64 * u, y - 14 * u); ctx.lineTo(x - 62 * u, y + 14 * u); ctx.closePath(); ctx.stroke();
  ctx.lineWidth = 1.4 * u; ctx.beginPath(); ctx.moveTo(x - 44 * u, y); ctx.lineTo(x + 22 * u, y); for (let i = 0; i < 12; i++) { const px = x - 40 * u + i * 5.5 * u, hh = 14 * u * Math.sin((i + 1) / 13 * Math.PI); ctx.moveTo(px, y - hh); ctx.lineTo(px + 2 * u, y + hh); } ctx.stroke();
  ctx.beginPath(); ctx.arc(x + 22 * u, y, 10 * u, -1.2, 1.2); ctx.stroke(); ctx.beginPath(); ctx.arc(x + 34 * u, y - 3 * u, 3 * u, 0, TAU); ctx.stroke();
  const b = o.beads ?? 0;
  for (let i = 0; i < 9; i++) if (b > i / 9) { const bx = x + (16 + 8 * k.rand(i + 7600)) * u, by = y + (k.rand(i + 7700) - 0.5) * 16 * u; k.dot(bx, by, 4 * u, '#FFD34E', 0.35); k.dot(bx, by, 1.6 * u, '#FFF2C0'); }
  ctx.restore();
}
// Đồng hồ đếm ngược (hộp tối + chữ vàng), góc trên phải mặc định.
export function countdown(k, s, o = {}) {
  const { ctx } = k; const size = o.size ?? 54, x = o.x ?? k.W - 60, y = o.y ?? 70, p = o.p ?? k.at(0, 0.5);
  if (p <= 0) return;
  ctx.save(); ctx.globalAlpha *= p; ctx.font = `800 ${size}px "Be Vietnam Pro"`;
  const w = ctx.measureText(s).width + size * 0.9, h = size * 1.45, bx = o.align === 'center' ? x - w / 2 : x - w;
  ctx.fillStyle = 'rgba(6,10,18,0.78)'; ctx.beginPath(); ctx.roundRect(bx, y - h / 2, w, h, 14); ctx.fill();
  ctx.strokeStyle = o.color ?? P.gold; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = o.color ?? P.gold; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(s, bx + size * 0.45, y + 2);
  ctx.restore();
}

// ---------- biển sâu (tập 093 trở đi) ----------
// Cá cần câu (cá cái) nhìn ngang, tâm (x, y), dài len, đầu bên phải; mồi phát sáng nhấp nháy.
export function anglerfish(k, x, y, len, o = {}) {
  const { ctx } = k; const u = len / 100, f = o.flip ? -1 : 1, X = (v) => x + f * v * u, t = k.gt ?? 0;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  const glow = 0.6 + 0.4 * Math.sin(t * 3 + (o.phase ?? 0));
  const lx = X(58), ly = y - 46 * u;
  const g = ctx.createRadialGradient(lx, ly, 1, lx, ly, 30 * u); g.addColorStop(0, `rgba(170,255,240,${0.9 * glow})`); g.addColorStop(1, 'rgba(120,255,230,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(lx, ly, 30 * u, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.moveTo(X(-50), y); ctx.lineTo(X(-34), y - 8 * u);
  ctx.bezierCurveTo(X(-20), y - 34 * u, X(30), y - 40 * u, X(42), y - 14 * u);
  ctx.lineTo(X(46), y - 4 * u); ctx.lineTo(X(30), y + 2 * u); ctx.lineTo(X(46), y + 10 * u);
  ctx.bezierCurveTo(X(30), y + 32 * u, X(-20), y + 30 * u, X(-34), y + 8 * u); ctx.lineTo(X(-50), y); ctx.closePath();
  ctx.fillStyle = o.color ?? '#2A2320'; ctx.fill(); ctx.strokeStyle = '#5A4A42'; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(X(-50), y); ctx.lineTo(X(-66), y - 14 * u); ctx.lineTo(X(-64), y + 14 * u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#E9E2D6';
  for (let i = 0; i < 6; i++) { const tx = X(34 + i * 2), ty = y - 2 * u; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + f * 1.5 * u, ty + 8 * u); ctx.lineTo(tx + f * 3 * u, ty); ctx.fill(); }
  ctx.strokeStyle = '#5A4A42'; ctx.lineWidth = 2.2 * u; ctx.beginPath(); ctx.moveTo(X(30), y - 30 * u); ctx.quadraticCurveTo(X(46), y - 60 * u, lx, ly); ctx.stroke();
  k.dot(lx, ly, 4 * u, '#DFFFF8', glow);
  k.dot(X(26), y - 14 * u, 3 * u, '#9BB');
  ctx.restore();
}
// Thước độ sâu dọc bên phải: 0 m ở yTop, maxM ở yBot; d = độ sâu hiện tại (m) → kim chỉ.
export function depthGauge(k, d, o = {}) {
  const { ctx } = k; const x = o.x ?? k.W - 120, y0 = o.y0 ?? 120, y1 = o.y1 ?? k.H - 120, max = o.max ?? 11000;
  ctx.save(); ctx.strokeStyle = 'rgba(245,241,230,0.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke();
  for (let m = 0; m <= max; m += 1000) { const y = lerp(y0, y1, m / max); ctx.beginPath(); ctx.moveTo(x - (m % 5000 ? 8 : 16), y); ctx.lineTo(x, y); ctx.stroke(); }
  const y = lerp(y0, y1, Math.min(1, d / max));
  ctx.fillStyle = P.gold; ctx.beginPath(); ctx.moveTo(x + 6, y); ctx.lineTo(x + 26, y - 12); ctx.lineTo(x + 26, y + 12); ctx.closePath(); ctx.fill();
  ctx.restore();
  k.text(`${Math.round(d).toLocaleString('vi-VN')} m`, x - 24, y, { size: o.size ?? 34, font: 'title', color: P.gold, align: 'right', outline: P.ink, outlineWidth: 6 });
}
