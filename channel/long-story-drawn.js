// Bộ vẽ dùng chung cho kênh Long Story Drawn (the-human-manual): bảng màu, nhân vật preset, nền, chữ, hiệu ứng.
// Dùng trong video.js: import { P, G, YOU, ancient, night, campNight, big, note, card, ... } from '/channel/long-story-drawn.js';
export const P = { orange: '#F58220', sky: '#7FB5D5', sky2: '#ABD3E5', grass: '#4E9A45', sand: '#D2B488', brown: '#8B5A2B', stone: '#8A8A8A', night: '#283A6E', indigo: '#322B5E', red: '#E0302B', yellow: '#F4C430', cream: '#F5F1E6', ink: '#3b2f2a' };
export const G = 860;
export const YOU = { body: 'man', outfit: 'tunic', color: '#D9A21B', color2: P.grass, hair: 'short', hairColor: '#2b1d16', hat: 'band' };
export const ANC = (extra = {}) => ({ body: 'man', outfit: 'bare', color: '#a87b4f', color2: '#7a5432', hair: 'long', hairColor: '#3a2a1e', skin: '#d9a77c', ...extra });
export const ANCW = (extra = {}) => ({ body: 'woman', outfit: 'dress', color: '#b98a5a', color2: '#7a5432', hair: 'long', hairColor: '#3a2a1e', skin: '#c99a70', ...extra });
export const ELDER = { body: 'woman', outfit: 'dress', color: '#9a7550', color2: '#6b4a33', hair: 'bun', hairColor: '#d9d4cb', skin: '#c99a70' };
export const KID = { body: 'kid', outfit: 'bare', color: '#a87b4f', color2: '#7a5432', hair: 'short', hairColor: '#3a2a1e', skin: '#d9a77c' };
export const SCI = (extra = {}) => ({ body: 'man', outfit: 'tunic', color: '#c2a46b', color2: P.brown, hair: 'short', hat: 'safari', ...extra });
export const HIST = { body: 'man', outfit: 'robe', color: '#5a6b8a', color2: '#c9a24a', hair: 'short', hairColor: '#7a6a5a', beard: true, beardColor: '#8a7a6a' };

// ---------- nền ----------
export function flat(k, sky, ground, gy = G) {
  const { ctx } = k;
  ctx.fillStyle = sky; ctx.fillRect(0, 0, k.W, k.H);
  ctx.beginPath(); ctx.moveTo(-20, k.H + 20); ctx.lineTo(-20, gy);
  for (let x = 0; x <= k.W + 40; x += 120) ctx.quadraticCurveTo(x - 60, gy - 14 * Math.sin(x * 0.01), x, gy);
  ctx.lineTo(k.W + 20, k.H + 20); ctx.closePath();
  ctx.fillStyle = ground; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = P.ink; ctx.stroke();
}
export const disc = (k, x, y, r, color) => { const { ctx } = k; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); };
// Tiền sử: trời cam, đất cát, cây keo đơn độc.
export function ancient(k, o = {}) {
  flat(k, P.orange, P.sand);
  disc(k, o.sx ?? 1480, o.sy ?? 330, 150, '#F79A45');
  disc(k, o.sx ?? 1480, o.sy ?? 330, 110, P.yellow);
  if (o.tree !== false) k.prop('acacia', o.tx ?? 1600, G - 170, 380);
}
export function savanna(k, o = {}) {
  flat(k, P.sky, P.sand);
  disc(k, 1700, 180, 70, P.yellow);
  for (const [x, s] of o.trees ?? [[300, 300], [1600, 360]]) k.prop('acacia', x, G - s * 0.45, s);
}
export function stars(k, n = 40, h = 520) {
  for (let i = 0; i < n; i++) k.dot(k.rand(i) * k.W, k.rand(i + 70) * h, 2 + k.rand(i + 9) * 3, '#fff7d6', 0.55 + 0.45 * Math.sin((k.gt ?? 0) * 1.5 + i));
}
export function night(k, o = {}) {
  flat(k, o.sky ?? P.indigo, o.ground ?? '#4a3f5e');
  stars(k);
  if (o.moon !== false) k.prop('moon', o.mx ?? 1660, o.my ?? 170, 220);
}
export function paper(k, color = P.cream) { k.ctx.fillStyle = color; k.ctx.fillRect(0, 0, k.W, k.H); }

// ---------- chữ ----------
export function chap(k, text, dark = false) {
  k.text(text, 60, 56, { size: 30, align: 'left', color: dark ? '#d9d3e8' : '#6b5f55', fx: 'fade', p: k.at(0, 0.6), outline: dark ? '#1b1b24' : '#fffaf0', outlineWidth: 8 });
}
// Chữ khái niệm: chữ in hoa đỏ viền.
export function big(k, s, x, y, cue, o = {}) {
  return k.text(s, x, y, { size: o.size ?? 110, font: 'title', color: o.color ?? P.red, fx: 'pop', p: k.at(cue, 0.5), outline: o.outline ?? '#fffaf0', outlineWidth: o.ow ?? 16, maxWidth: o.maxWidth });
}
export function note(k, s, x, y, cue, o = {}) {
  return k.text(s, x, y, { size: o.size ?? 48, font: 'title', color: o.color ?? P.ink, fx: o.fx ?? 'fade', p: k.at(cue, 0.6), outline: o.outline ?? '#fffaf0', outlineWidth: o.ow ?? 10, maxWidth: o.maxWidth, align: o.align });
}
// Dấu X đỏ "không phải thế".
export function redX(k, x, y, r, cue) {
  const p = k.at(cue, 0.5);
  k.line(x - r, y - r, x + r, y + r, { p: Math.min(1, p * 2), stroke: P.red, width: 22, seed: 901 });
  k.line(x + r, y - r, x - r, y + r, { p: Math.max(0, p * 2 - 1), stroke: P.red, width: 22, seed: 902 });
}
// Nhân vật nằm ngủ: chân tại (x, y), đầu về bên trái.
export function lying(k, x, y, size, preset, o = {}) {
  k.group({ x, y: y - size * 0.13, r: -Math.PI / 2, a: o.a ?? 1 }, () => k.char(0, 0, size, { ...preset, face: o.face ?? 'sleep', shadow: false, pose: o.pose ?? 'stand' }));
}
export function zzz(k, x, y, cue, s = 1) {
  const t = k.gt ?? 0;
  for (let i = 0; i < 3; i++) {
    const u = (t * 0.5 + i / 3) % 1;
    k.text('z', x + u * 60 * s, y - u * 120 * s, { size: (34 + i * 10) * s, font: 'title', color: '#ABD3E5', p: k.at(cue, 0.5) * Math.sin(u * Math.PI), outline: P.ink, outlineWidth: 6 });
  }
}
// Thẻ nghiên cứu: tên + năm + nơi.
export function card(k, x, y, lines, cue, o = {}) {
  const p = k.at(cue, 0.5);
  const w = o.w ?? 560, h = o.h ?? 64 + lines.length * 62;
  k.group({ x, y, s: Math.max(0.01, k.ease.back(p)), r: o.r ?? -0.02, a: Math.min(1, p * 3) }, () => {
    k.rect(-w / 2, -h / 2, w, h, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: o.seed ?? 920 });
    // chữ tự thu nhỏ cho vừa một dòng (không xuống dòng đè lên dòng dưới)
    lines.forEach((l, i) => { const base = i ? 40 : 50; k.text(l, 0, -h / 2 + 62 + i * 62, { size: Math.min(base, ((w - 60) / (l.length * 0.68)) * (i ? 1.05 : 1)), font: 'title', color: i ? P.ink : P.red }); });
  });
}
export function campNight(k, o = {}) {
  night(k, o);
  k.prop('campfire', o.fx ?? 960, G - 40, o.fs ?? 230, { fire: o.fire ?? 1 });
}
export function glow(k, x, y, r, a = 0.5) {
  k.darkness(a, [{ x, y, r, flicker: 1, warm: 1 }]);
}


// ---------- Shorts ----------
// meta chuẩn cho Shorts của kênh (dọc, phụ đề, giọng Andrew -2%, poster = thumb-a tập dài ở assets/poster.jpg).
export function shortMeta(o) {
  return {
    style: 'clean', lang: 'en', speed: 1.0, format: 'short', captions: true,
    voice: 'en-US-AndrewMultilingualNeural', rate: '-2%', pitch: '-2Hz', categoryId: '27',
    images: { poster: 'assets/poster.jpg' }, music: 'assets/music/background.mp3', musicVolume: 0.08, sfxVolume: 0.5, transition: 'fade',
    hashtags: ['shorts', 'history', 'science'],
    ...o,
    description: `${o.description} Watch the full story, "${o.long}", on Long Story Drawn.`,
    tags: [...(o.tags ?? []), 'ancient humans', 'shorts', 'long story drawn'],
  };
}
// Chữ hook hiện ngay khung đầu (luồng Shorts hiển thị khung đầu trước khi người xem quyết định vuốt).
export function hook(k, l1, l2, o = {}) {
  k.text(l1, 540, o.y ?? 210, { size: o.s1 ?? 100, font: 'title', color: o.c1 ?? P.ink, p: 1, outline: o.o1 ?? '#fffaf0', outlineWidth: 16, maxWidth: 1000 });
  if (l2) k.text(l2, 540, (o.y ?? 210) + (o.gap ?? 140), { size: o.s2 ?? 130, font: 'title', color: o.c2 ?? P.red, p: 1, outline: '#fffaf0', outlineWidth: 18, maxWidth: 1000 });
}

// ---------- Thumbnail (bản 03/11: tò mò + truyền đạt ý chính) ----------
// Bố cục: chữ ≤ 3 từ bổ sung cho tiêu đề (không lặp lại) · một VẬT CHÍNH chiếm ≥ 40% khung · mặt linh vật cận cảnh
// có cảm xúc rõ · một vòng/mũi tên đỏ chỉ vào chi tiết lạ. Phải đọc được ở cỡ 320×180.
// Nền tia nắng phẳng (không gradient) để kéo mắt vào vật chính.
export function tRays(k, x, y, c1, c2, n = 18) {
  const { ctx } = k;
  ctx.fillStyle = c1; ctx.fillRect(0, 0, k.W, k.H);
  ctx.fillStyle = c2;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a0) * 3000, y + Math.sin(a0) * 3000); ctx.lineTo(x + Math.cos(a1) * 3000, y + Math.sin(a1) * 3000); ctx.closePath(); ctx.fill();
  }
}
// Chữ lớn nhiều dòng: lines = [[chữ, màu, cỡ?], …], viền đen dày.
export function tText(k, lines, x, y, o = {}) {
  let yy = y;
  for (const [s, color, size = o.size ?? 190] of lines) {
    k.text(s, x, yy, { size, font: 'title', color, align: o.align ?? 'center', outline: '#111', outlineWidth: size * 0.17, maxWidth: o.maxWidth ?? 900 });
    yy += size * (o.lh ?? 1.02);
  }
}
// Nhãn nhỏ (năm, số liệu): hộp màu viền đen, hơi nghiêng.
export function tTag(k, s, x, y, o = {}) {
  const size = o.size ?? 64;
  k.ctx.save(); k.ctx.font = `800 ${size}px "Be Vietnam Pro"`; const w = k.ctx.measureText(s).width + size * 0.9; k.ctx.restore();
  k.group({ x, y, r: o.rotate ?? -0.04 }, () => {
    k.rect(-w / 2, -size * 0.75, w, size * 1.5, { fill: o.fill ?? P.yellow, fillStyle: 'solid', stroke: '#111', width: 8, rough: 0 });
    k.text(s, 0, 0, { size, font: 'title', color: o.color ?? '#111' });
  });
}
// Vòng đỏ vẽ tay quanh chi tiết lạ.
export function tRing(k, x, y, rx, ry, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rotate ?? -0.12); ctx.lineCap = 'round';
  for (const [w, c] of [[o.w ?? 30, '#fff'], [(o.w ?? 30) * 0.62, P.red]]) {
    ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, -0.35, Math.PI * 2 + 0.15); ctx.stroke();
  }
  ctx.restore();
}
// Mũi tên đỏ dày (viền trắng) từ (x1,y1) tới đầu nhọn (x2,y2).
export function tArrow(k, x1, y1, x2, y2, o = {}) {
  const { ctx } = k;
  const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1), w = o.w ?? 34, h = w * 2.4;
  ctx.save(); ctx.translate(x1, y1); ctx.rotate(a); ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(0, -w / 2); ctx.lineTo(L - h, -w / 2); ctx.lineTo(L - h, -w * 1.3); ctx.lineTo(L, 0); ctx.lineTo(L - h, w * 1.3); ctx.lineTo(L - h, w / 2); ctx.lineTo(0, w / 2); ctx.closePath();
  ctx.lineWidth = 16; ctx.strokeStyle = '#fff'; ctx.stroke(); ctx.fillStyle = o.color ?? P.red; ctx.fill();
  ctx.restore();
}
// Nhân vật cận cảnh: đầu tâm (x, headY), bán kính đầu r (thân tràn khỏi khung dưới).
export function tBust(k, x, headY, r, preset, o = {}) {
  const cao = r / 0.14;
  k.char(x, headY + 0.84 * cao, cao, { shadow: false, ...preset, ...o });
}

// ---------- Voi ma mút lông (tập 11) ----------
// (x, y) = giữa chân; s = bề rộng px; quay mặt sang phải (o.flip để quay trái).
// o.face: 'calm' | 'shock' | 'angry' · o.p (hiện dần) · o.tusks (false = không ngà) · o.fur, o.dark (màu lông).
export function mammoth(k, x, y, s, o = {}) {
  const p = o.p ?? 1;
  if (p <= 0) return;
  const { ctx } = k;
  const fur = o.fur ?? '#7a4a2a', dark = o.dark ?? '#5a3520', ol = '#2b1d16', ivory = '#f6eedc';
  const fill = (c, path, lw = 3) => { ctx.beginPath(); path(); ctx.fillStyle = c; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = ol; ctx.stroke(); };
  const stroke = (w, c, path) => { ctx.beginPath(); path(); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.stroke(); };
  k.group({ x, y, s: (s / 200) * Math.max(0.01, k.ease.back(Math.min(1, p))), a: Math.min(1, p * 3) }, () => {
    if (o.flip) ctx.scale(-1, 1);
    const legs = (xs, c) => xs.forEach((lx) => fill(c, () => { ctx.roundRect(lx - 12, -62, 24, 62, 6); }));
    legs([-58, 40], dark);
    // ngà phía xa
    if (o.tusks !== false) { stroke(10, ol, () => { ctx.moveTo(86, -102); ctx.quadraticCurveTo(146, -48, 122, -120); }); stroke(6, '#e2d6bc', () => { ctx.moveTo(86, -102); ctx.quadraticCurveTo(146, -48, 122, -120); }); }
    // thân: mông thấp, bướu vai cao, đầu vòm
    fill(fur, () => {
      ctx.moveTo(-90, -52); ctx.quadraticCurveTo(-108, -112, -66, -128); ctx.quadraticCurveTo(-10, -146, 26, -164);
      ctx.quadraticCurveTo(48, -180, 70, -164); ctx.quadraticCurveTo(96, -146, 92, -110); ctx.lineTo(86, -80);
      // lông xù dưới bụng
      for (let i = 0; i <= 12; i++) ctx.lineTo(76 - i * 13.5, i % 2 ? -34 : -48);
      ctx.closePath();
    });
    for (let i = 0; i < 9; i++) stroke(2.5, dark, () => { const hx = -70 + i * 17, hy = -110 + (i % 3) * 18; ctx.moveTo(hx, hy); ctx.lineTo(hx - 4, hy + 16); });
    legs([-34, 64], fur);
    for (const lx of [-34, 64]) stroke(2.5, dark, () => { ctx.moveTo(lx - 8, -40); ctx.lineTo(lx - 10, -24); ctx.moveTo(lx + 6, -40); ctx.lineTo(lx + 4, -26); });
    stroke(3, ol, () => { ctx.moveTo(-96, -96); ctx.quadraticCurveTo(-108, -80, -102, -66); }); // đuôi
    // đầu vòm cao (đặc trưng voi ma mút)
    fill(fur, () => { ctx.ellipse(64, -170, 20, 18, 0, 0, Math.PI * 2); });
    fill(fur, () => { ctx.ellipse(78, -138, 28, 36, 0.15, 0, Math.PI * 2); });
    fill(dark, () => { ctx.ellipse(58, -136, 9, 14, -0.2, 0, Math.PI * 2); }, 2.5); // tai nhỏ
    // vòi
    const trunk = () => { ctx.moveTo(96, -116); ctx.quadraticCurveTo(116, -62, 102, -16); ctx.quadraticCurveTo(100, -6, 110, -8); };
    stroke(24, ol, trunk); stroke(17, fur, trunk);
    // ngà phía gần (xoắn ra trước rồi cong lên)
    if (o.tusks !== false) { stroke(12, ol, () => { ctx.moveTo(92, -100); ctx.quadraticCurveTo(168, -30, 138, -116); }); stroke(8, ivory, () => { ctx.moveTo(92, -100); ctx.quadraticCurveTo(168, -30, 138, -116); }); }
    // mắt
    const mood = o.face ?? 'calm';
    if (mood === 'shock') { fill('#fff', () => ctx.arc(86, -144, 7, 0, Math.PI * 2), 2); fill(ol, () => ctx.arc(87, -144, 3, 0, Math.PI * 2), 1); }
    else { fill(ol, () => ctx.arc(86, -142, 4, 0, Math.PI * 2), 1); }
    if (mood === 'angry') stroke(3.5, ol, () => { ctx.moveTo(76, -158); ctx.lineTo(96, -150); });
  });
}
// Mũi giáo đá Clovis (lá, có rãnh giữa): tâm (x, y), dài s, góc rot.
export function clovis(k, x, y, s, o = {}) {
  const { ctx } = k;
  k.group({ x, y, r: o.rotate ?? 0, s: s / 100, a: o.p ?? 1 }, () => {
    ctx.beginPath(); ctx.moveTo(0, -50); ctx.quadraticCurveTo(22, -10, 16, 44); ctx.lineTo(4, 38); ctx.lineTo(0, 46); ctx.lineTo(-4, 38); ctx.lineTo(-16, 44); ctx.quadraticCurveTo(-22, -10, 0, -50); ctx.closePath();
    ctx.fillStyle = o.fill ?? '#c9c2b4'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#2b1d16'; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(0, 0); ctx.lineWidth = 5; ctx.strokeStyle = '#9a9284'; ctx.stroke();
    for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-12 + i * 2, -20 + i * 12); ctx.lineTo(-4, -16 + i * 12); ctx.lineWidth = 1.6; ctx.strokeStyle = '#8a8274'; ctx.stroke(); }
  });
}
// Sói xám: (x, y) = giữa chân; s = bề rộng px; quay phải (o.flip quay trái). o.face: 'calm' | 'happy'; o.eyes: mắt vàng phát sáng (đêm).
export function wolf(k, x, y, s, o = {}) {
  const p = o.p ?? 1;
  if (p <= 0) return;
  const { ctx } = k;
  const fur = o.fur ?? '#8a8a8a', dark = '#6a6a6a', light = '#d8d4cc', ol = '#2b2b2b';
  const fill = (c, path, lw = 3) => { ctx.beginPath(); path(); ctx.fillStyle = c; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = ol; ctx.lineJoin = 'round'; ctx.stroke(); };
  k.group({ x, y, s: (s / 200) * Math.max(0.01, k.ease.back(Math.min(1, p))), a: Math.min(1, p * 3) }, () => {
    if (o.flip) ctx.scale(-1, 1);
    for (const lx of [-50, 40]) fill(dark, () => ctx.roundRect(lx - 6, -56, 12, 56, 4));
    fill(fur, () => { ctx.moveTo(-62, -82); ctx.quadraticCurveTo(-112, -84, -106, -28); ctx.quadraticCurveTo(-86, -48, -58, -66); ctx.closePath(); }); // đuôi xù
    fill(fur, () => ctx.ellipse(0, -72, 70, 28, 0, 0, Math.PI * 2));
    for (const lx of [-34, 56]) fill(fur, () => ctx.roundRect(lx - 7, -58, 14, 58, 4));
    fill(fur, () => { ctx.moveTo(40, -90); ctx.lineTo(66, -116); ctx.lineTo(86, -96); ctx.lineTo(62, -60); ctx.closePath(); }); // cổ
    fill(fur, () => { ctx.moveTo(60, -120); ctx.lineTo(64, -146); ctx.lineTo(76, -124); ctx.closePath(); }); // tai
    fill(fur, () => ctx.ellipse(76, -108, 26, 20, 0, 0, Math.PI * 2));
    fill(fur, () => { ctx.moveTo(78, -122); ctx.lineTo(86, -146); ctx.lineTo(94, -118); ctx.closePath(); });
    fill(light, () => { ctx.moveTo(92, -114); ctx.lineTo(132, -102); ctx.lineTo(128, -92); ctx.lineTo(94, -92); ctx.closePath(); }); // mõm
    fill(ol, () => ctx.arc(130, -98, 4, 0, Math.PI * 2), 1);
    fill(light, () => ctx.ellipse(52, -66, 16, 20, 0.3, 0, Math.PI * 2), 2); // ngực
    if (o.eyes) { ctx.beginPath(); ctx.arc(86, -112, 5, 0, Math.PI * 2); ctx.fillStyle = '#f4e27a'; ctx.fill(); }
    else if (o.face === 'happy') { ctx.beginPath(); ctx.arc(86, -110, 5, Math.PI * 1.1, Math.PI * 1.9); ctx.lineWidth = 3; ctx.strokeStyle = ol; ctx.stroke(); }
    else fill(ol, () => ctx.arc(86, -112, 3.5, 0, Math.PI * 2), 1);
  });
}
