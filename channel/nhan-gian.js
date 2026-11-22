// Bộ dùng chung kênh "Nhân Gian Chưa Kể" (id Studio `neu-ban-la`, đổi hướng 13/11/2026):
// truyện tâm linh dân gian kể ngôi "tôi", tông tối, 2D phẳng, ánh sáng ấm từ bếp lửa / đèn dầu / trăng.
// Quy ước: vẽ phông → nhân vật → shade(k, a, lights) phủ tối và khoét vùng sáng → chữ (quote/tag) vẽ SAU shade để luôn đọc được.
export const G = 900; // mặt sàn
export const INK = '#211a15';
export const PAPER = '#efe4cc', AMBER = '#f2b24a', COLD = '#9fb4d0';

const nob = { blush: false, shadow: false };
// Nhân vật (người thật, không chibi). Mặt mặc định 'calm'.
export const BA = { ...nob, body: 'woman', outfit: 'dress', plain: true, color: '#5a4636', hair: 'bun', hairColor: '#bdb7ad', skin: '#d6ac86' };
export const MINH = { ...nob, body: 'kid', outfit: 'tunic', plain: true, color: '#4f6a86', hair: 'short', hairColor: '#1d1712', skin: '#e2b994' };
export const MINH_LON = { ...nob, body: 'man', outfit: 'tunic', plain: true, color: '#3c4652', hair: 'short', hairColor: '#1d1712', skin: '#d9ae88' };
export const ME = { ...nob, body: 'woman', outfit: 'dress', plain: true, color: '#7a5a6e', hair: 'long', hairColor: '#1d1712', skin: '#e6bf9a' };
export const ME_GIA = { ...ME, color: '#5f6a7a', hair: 'bun', hairColor: '#8f8a84' };
export const BA_DO = { ...nob, body: 'woman', outfit: 'dress', plain: true, color: '#3f3a34', hair: 'bun', hairColor: '#4a4038', skin: '#cfa47e' };
export const TUN = { ...nob, body: 'kid', outfit: 'tunic', plain: true, color: '#8a6a3a', hair: 'buzz', hairColor: '#1d1712', skin: '#d4a57c' };

function B(ctx, fill, path, lw = 4, stroke = INK) {
  ctx.beginPath(); path(); ctx.fillStyle = fill; ctx.fill();
  if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.stroke(); }
}
const flick = (k, s = 1) => 1 + 0.08 * Math.sin((k.gt ?? 0) * 13 * s) + 0.05 * Math.sin((k.gt ?? 0) * 31 * s);

// ---------- ánh sáng ----------
// Phủ tối toàn khung, khoét vùng sáng. lights: [{ x, y, r, flicker, warm }]. Kèm viền tối.
export function shade(k, a = 0.8, lights = [], o = {}) {
  k.darkness(a, lights, o.color ?? 'rgb(6,7,12)');
  k.vignette(o.vig ?? 0.55);
}
// Hồi tưởng: phủ đơn sắc xanh lạnh (giữ sáng tối, bỏ màu).
export function cold(k, a = 0.85) {
  const { ctx } = k;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'color'; ctx.globalAlpha = a; ctx.fillStyle = '#3d5b86'; ctx.fillRect(0, 0, k.W, k.H);
  ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.35 * a; ctx.fillStyle = '#5a7aa8'; ctx.fillRect(0, 0, k.W, k.H);
  ctx.restore();
}
// Hạt bụi bay trong vùng sáng.
export function dust(k, x, y, w, h, n = 26, a = 0.5) {
  const t = k.gt ?? 0, { ctx } = k;
  ctx.save();
  for (let i = 0; i < n; i++) {
    const px = x + ((k.rand(i + 300) * w + t * 6 * (0.5 + k.rand(i))) % w), py = y + ((k.rand(i + 400) * h - t * 9 * (0.3 + k.rand(i + 7))) % h + h) % h;
    ctx.globalAlpha = a * (0.4 + 0.6 * Math.abs(Math.sin(t * 0.8 + i)));
    ctx.fillStyle = '#ffe2b0'; ctx.beginPath(); ctx.arc(px, py, 1.6 + k.rand(i + 9) * 2, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

// ---------- chữ ----------
// Nhãn thời gian / địa điểm góc trên trái (vẽ sau shade).
export function tag(k, text, cue = 0) {
  const p = k.at(cue, 0.8);
  k.text(text, 70, 70, { size: 34, font: 'title', align: 'left', color: AMBER, fx: 'fade', p, outline: '#000', outlineWidth: 6 });
}
// Câu thoại / câu chốt: chữ trắng ngà ở dưới khung, hiện mờ dần (vẽ sau shade).
export function quote(k, text, cue, o = {}) {
  const p = k.at(cue, o.dur ?? 0.9);
  if (p <= 0) return;
  if (o.until != null && k.t > k.cue(o.until)) return;
  k.text(text, o.x ?? k.W / 2, o.y ?? 975, { size: o.size ?? 50, font: o.font ?? 'title', color: o.color ?? PAPER, fx: 'fade', p, maxWidth: 1600, outline: '#000', outlineWidth: 8 });
}
// Thẻ chương: hiện 3 giây đầu cảnh, nền tối mờ.
export function chapter(k, n, title) {
  const a = k.still ? 0 : Math.min(1, k.t / 0.4) * Math.max(0, Math.min(1, (3.2 - k.t) / 0.6));
  if (a <= 0) return;
  const { ctx } = k;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a * 0.75; ctx.fillStyle = '#05060a'; ctx.fillRect(0, 0, k.W, k.H); ctx.restore();
  ctx.save(); ctx.globalAlpha = a;
  k.text(`CHƯƠNG ${n}`, k.W / 2, 470, { size: 36, font: 'title', color: AMBER });
  k.text(title, k.W / 2, 560, { size: 84, font: 'title', color: PAPER, maxWidth: 1600 });
  ctx.restore();
}
// Tờ giấy bản ghi các điều dặn: items = [[chữ, cue], …].
export function rules(k, x, y, items, o = {}) {
  const { ctx } = k, w = o.w ?? 1100, h = 120 + items.length * 110;
  const p = k.at(o.cue ?? 0, 0.6);
  if (p <= 0) return;
  ctx.save(); ctx.globalAlpha = p;
  ctx.translate(x, y); ctx.rotate(-0.015);
  B(ctx, '#e8dcbf', () => ctx.rect(-w / 2, -h / 2, w, h), 3, '#7a6a52');
  for (let i = 0; i < 6; i++) { ctx.fillStyle = `rgba(120,100,70,${0.05 + k.rand(i) * 0.05})`; ctx.beginPath(); ctx.ellipse(-w / 2 + k.rand(i + 3) * w, -h / 2 + k.rand(i + 5) * h, 80, 40, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
  items.forEach(([text, cue], i) => k.text(text, x - w / 2 + 70, y - h / 2 + 105 + i * 110, { size: 50, font: 'title', align: 'left', color: '#2a2018', fx: 'write', p: k.at(cue, 1.4, 'linear'), maxWidth: w - 120 }));
}

// ---------- đạo cụ ----------
// Bát cơm con + đôi đũa ngắn. o.empty = bát sạch; o.full = đầy hơn; o.cold = cơm nguội (xám hơn).
export function bowl(k, x, y, s = 1, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (!o.empty) B(ctx, o.cold ? '#d9d3c4' : '#f4efe2', () => ctx.ellipse(0, -30, 46, o.full ? 30 : 22, 0, Math.PI, 0), 3);
  B(ctx, '#e9e4d8', () => { ctx.moveTo(-52, -30); ctx.quadraticCurveTo(-48, 6, 0, 8); ctx.quadraticCurveTo(48, 6, 52, -30); ctx.closePath(); }, 4);
  ctx.fillStyle = '#3f5f8a'; ctx.fillRect(-46, -20, 92, 6);
  B(ctx, '#d9d2c2', () => ctx.rect(-18, 6, 36, 8), 3);
  // đũa ngắn gác chéo miệng bát
  ctx.lineCap = 'round';
  for (const d of [0, 9]) { ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-44 + d, -40 - d * 0.3); ctx.lineTo(36 + d, -50 - d * 0.3); ctx.stroke(); ctx.strokeStyle = '#c99a5a'; ctx.lineWidth = 4.5; ctx.stroke(); }
  ctx.restore();
}
// Chum nước lớn: đáy tại (x, y), cao ~360·s.
export function jar(k, x, y, s = 1) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  B(ctx, '#5e3d24', () => { ctx.moveTo(-90, 0); ctx.bezierCurveTo(-190, -60, -190, -280, -110, -330); ctx.lineTo(110, -330); ctx.bezierCurveTo(190, -280, 190, -60, 90, 0); ctx.closePath(); });
  ctx.fillStyle = 'rgba(255,210,150,0.12)'; ctx.beginPath(); ctx.ellipse(-80, -190, 30, 100, 0.1, 0, Math.PI * 2); ctx.fill();
  B(ctx, '#4a2f1b', () => ctx.ellipse(0, -332, 118, 22, 0, 0, Math.PI * 2));
  B(ctx, '#7a5a36', () => ctx.ellipse(0, -342, 108, 16, 0, 0, Math.PI * 2)); // nắp gỗ
  ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 3; for (const yy of [-120, -240]) { ctx.beginPath(); ctx.moveTo(-160, yy); ctx.quadraticCurveTo(0, yy + 22, 160, yy); ctx.stroke(); }
  ctx.restore();
}
// Bếp ba ông đầu rau + nồi + lửa. fire 0..1 (0 = chỉ còn than).
export function hearth(k, x, y, s = 1, fire = 1) {
  const { ctx } = k, t = k.gt ?? 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  B(ctx, '#2a2420', () => ctx.ellipse(0, -6, 150, 26, 0, 0, Math.PI * 2), 0);
  for (let i = 0; i < 7; i++) { ctx.fillStyle = `rgba(255,${90 + 60 * Math.sin(t * 3 + i)},40,${0.6 + 0.4 * Math.sin(t * 2 + i * 2)})`; ctx.beginPath(); ctx.arc(-70 + i * 23, -12 + (i % 2) * 6, 7, 0, Math.PI * 2); ctx.fill(); }
  if (fire > 0) {
    for (let i = 0; i < 5; i++) {
      const h = (110 + 50 * Math.sin(t * 9 + i * 1.7)) * fire, xx = -60 + i * 30;
      ctx.fillStyle = i % 2 ? '#ff8a2a' : '#ffb340'; ctx.beginPath(); ctx.moveTo(xx - 24, -10); ctx.quadraticCurveTo(xx - 10, -h * 0.5, xx + Math.sin(t * 7 + i) * 8, -h); ctx.quadraticCurveTo(xx + 12, -h * 0.5, xx + 24, -10); ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.moveTo(-30, -10); ctx.quadraticCurveTo(0, -70 * fire * flick(k), 30, -10); ctx.closePath(); ctx.fill();
  }
  for (const xx of [-110, 0, 110]) B(ctx, '#7a5236', () => { ctx.moveTo(xx - 26, 0); ctx.lineTo(xx - 16, -95); ctx.quadraticCurveTo(xx, -110, xx + 16, -95); ctx.lineTo(xx + 26, 0); ctx.closePath(); });
  B(ctx, '#1e1a18', () => { ctx.moveTo(-120, -100); ctx.quadraticCurveTo(-130, -200, 0, -205); ctx.quadraticCurveTo(130, -200, 120, -100); ctx.closePath(); });
  B(ctx, '#2c2723', () => ctx.ellipse(0, -205, 112, 18, 0, 0, Math.PI * 2));
  ctx.restore();
}
// Đèn dầu nhỏ: (x, y) = đáy đèn.
export function oil(k, x, y, s = 1) {
  const { ctx } = k, f = flick(k);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  B(ctx, '#8a5a2a', () => { ctx.moveTo(-34, 0); ctx.lineTo(34, 0); ctx.lineTo(22, -14); ctx.lineTo(-22, -14); ctx.closePath(); }, 3);
  B(ctx, '#a8732f', () => ctx.ellipse(0, -34, 40, 24, 0, 0, Math.PI * 2), 3);
  B(ctx, '#6b4420', () => ctx.rect(-16, -66, 32, 10), 3);
  B(ctx, 'rgba(255,236,200,0.18)', () => { ctx.moveTo(-14, -66); ctx.bezierCurveTo(-40, -86, -36, -120, -12, -138); ctx.lineTo(-14, -156); ctx.lineTo(14, -156); ctx.lineTo(12, -138); ctx.bezierCurveTo(36, -120, 40, -86, 14, -66); ctx.closePath(); }, 2.5, 'rgba(255,236,200,0.7)');
  ctx.fillStyle = '#ffa733'; ctx.beginPath(); ctx.moveTo(0, -112 * f); ctx.bezierCurveTo(12, -95, 10, -74, 0, -70); ctx.bezierCurveTo(-10, -74, -12, -95, 0, -112 * f); ctx.fill();
  ctx.fillStyle = '#fff4c8'; ctx.beginPath(); ctx.moveTo(0, -98 * f); ctx.bezierCurveTo(5, -88, 5, -76, 0, -74); ctx.bezierCurveTo(-5, -76, -5, -88, 0, -98 * f); ctx.fill();
  ctx.restore();
}
// Hũ sành nhỏ buộc vải. o.open = mở vải.
export function urn(k, x, y, s = 1, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  B(ctx, '#6e665c', () => { ctx.moveTo(-40, 0); ctx.bezierCurveTo(-80, -30, -76, -100, -34, -116); ctx.lineTo(34, -116); ctx.bezierCurveTo(76, -100, 80, -30, 40, 0); ctx.closePath(); });
  ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.beginPath(); ctx.ellipse(-30, -60, 10, 34, 0.1, 0, Math.PI * 2); ctx.fill();
  if (!o.open) {
    B(ctx, '#c98a8a', () => { ctx.moveTo(-46, -112); ctx.quadraticCurveTo(0, -150, 46, -112); ctx.lineTo(40, -96); ctx.quadraticCurveTo(0, -104, -40, -96); ctx.closePath(); }, 3);
    ctx.strokeStyle = '#8a3a3a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-40, -104); ctx.quadraticCurveTo(0, -94, 40, -104); ctx.stroke();
  } else B(ctx, '#2a2420', () => ctx.ellipse(0, -116, 34, 9, 0, 0, Math.PI * 2), 3);
  ctx.restore();
}
// Vòng chân bạc trẻ con cận cảnh: tâm (x, y), bán kính r. text khắc mặt trong; o.tarnish 0..1 xỉn đen.
export function anklet(k, x, y, r, text, o = {}) {
  const { ctx } = k, tn = o.tarnish ?? 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.12);
  ctx.lineWidth = r * 0.2 + 8; ctx.strokeStyle = INK; ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.62, 0, 0, Math.PI * 2); ctx.stroke();
  const g = ctx.createLinearGradient(-r, -r, r, r);
  g.addColorStop(0, tn > 0.5 ? '#6b6a66' : '#e9edf2'); g.addColorStop(0.5, tn > 0.5 ? '#3d3c39' : '#9aa1ab'); g.addColorStop(1, tn > 0.5 ? '#77756f' : '#dfe3e8');
  ctx.lineWidth = r * 0.2; ctx.strokeStyle = g; ctx.stroke();
  for (let i = 0; i < 3; i++) { const a = Math.PI * (0.35 + i * 0.15); B(ctx, tn > 0.5 ? '#5e5d58' : '#cdd2d9', () => ctx.arc(Math.cos(a) * r, Math.sin(a) * r * 0.62 + 14, r * 0.07, 0, Math.PI * 2), 3); }
  ctx.restore();
  if (text) k.text(text, x, y + 6, { size: o.size ?? r * 0.22, font: 'title', color: tn > 0.5 ? '#c9c4b8' : '#e9edf2', outline: '#000', outlineWidth: 6, p: o.p ?? 1, fx: 'write' });
}
// Chổi rơm: cán tại (x, y), nghiêng a.
export function broom(k, x, y, s = 1, a = 0) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
  B(ctx, '#7a5a36', () => ctx.rect(-6, -10, 12, 200), 3);
  B(ctx, '#c9a35a', () => { ctx.moveTo(-14, 186); ctx.lineTo(-70, 330); ctx.lineTo(70, 330); ctx.lineTo(14, 186); ctx.closePath(); }, 3);
  ctx.strokeStyle = 'rgba(80,60,30,0.6)'; ctx.lineWidth = 2; for (let i = -5; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(i * 2.4, 196); ctx.lineTo(i * 12, 326); ctx.stroke(); }
  ctx.restore();
}

// ---------- phông ----------
// Gian bếp rạ nhà bà. Bố cục cố định: bếp lửa x≈520, chum nước x≈1230, xó tối x 1380–1760 (bát cơm ở x≈1560).
// o.fire 0..1, o.ash 0..1 (lớp tro trong xó; 0 = đã quét), o.bowl (true | {empty, full, cold} | false), o.brick (viên gạch lỏng nhô lên 0..1), o.urn.
export const KITCHEN = { fire: { x: 520, y: 760, r: 620, flicker: 1, warm: 1 }, xo: { x: 1560, y: 820, r: 260 } };
export function kitchen(k, o = {}) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#4f3d2c'; ctx.fillRect(-100, -100, W + 200, G + 100);
  for (let i = 0; i < 14; i++) { ctx.fillStyle = `rgba(30,20,12,${0.12 + k.rand(i + 20) * 0.12})`; ctx.beginPath(); ctx.ellipse(k.rand(i) * W, 200 + k.rand(i + 1) * 600, 90 + k.rand(i + 2) * 120, 40 + k.rand(i + 3) * 60, 0, 0, Math.PI * 2); ctx.fill(); }
  // góc nhà (vách rẽ) ở x 1760
  ctx.fillStyle = '#3a2c20'; ctx.fillRect(1760, -100, W - 1600, G + 100);
  ctx.strokeStyle = '#24190f'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1760, -100); ctx.lineTo(1760, G); ctx.stroke();
  // mái + kèo
  ctx.fillStyle = '#21180f'; ctx.fillRect(-100, -100, W + 200, 230);
  ctx.fillStyle = '#6b5232'; for (let x = -60; x < W + 100; x += 150) { ctx.save(); ctx.translate(x, 130); ctx.rotate(-0.5); ctx.fillRect(-6, -200, 12, 260); ctx.restore(); }
  B(ctx, '#3d2c1c', () => ctx.rect(-100, 112, W + 200, 30), 3);
  // nền đất
  ctx.fillStyle = '#35281d'; ctx.fillRect(-100, G, W + 200, H - G + 100);
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(-100, G, W + 200, 14);
  // đống rạ
  B(ctx, '#a8894f', () => { ctx.moveTo(60, G); ctx.quadraticCurveTo(120, G - 190, 260, G - 170); ctx.quadraticCurveTo(330, G - 120, 330, G); ctx.closePath(); }, 3);
  ctx.strokeStyle = 'rgba(70,50,20,0.5)'; ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(80 + i * 18, G - 10); ctx.lineTo(120 + i * 14, G - 150 + (i % 3) * 20); ctx.stroke(); }
  hearth(k, KITCHEN.fire.x, G, 1, o.fire ?? 1);
  // xó tối sau chum
  const g = ctx.createRadialGradient(1570, G - 120, 20, 1570, G - 120, 330);
  g.addColorStop(0, 'rgba(8,6,4,0.55)'); g.addColorStop(1, 'rgba(8,6,4,0)');
  ctx.fillStyle = g; ctx.fillRect(1240, G - 450, 660, 460);
  const ash = o.ash ?? 1;
  if (ash > 0) { ctx.save(); ctx.globalAlpha = ash; B(ctx, '#5f5853', () => { ctx.moveTo(1380, G + 6); ctx.quadraticCurveTo(1450, G - 40, 1600, G - 34); ctx.quadraticCurveTo(1720, G - 30, 1762, G - 60); ctx.lineTo(1762, G + 6); ctx.closePath(); }, 0); ctx.fillStyle = '#7a736c'; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.arc(1400 + k.rand(i + 60) * 350, G - 8 - k.rand(i + 61) * 26, 3 + k.rand(i) * 4, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); }
  if (o.brick) { ctx.save(); ctx.translate(1640, G - 14); ctx.rotate(-0.25 * o.brick); B(ctx, '#8a4a32', () => ctx.rect(-50, -18 - 30 * o.brick, 100, 26), 3); ctx.restore(); B(ctx, '#120d09', () => ctx.rect(1592, G - 18, 96, 18), 0); }
  if (o.urn) urn(k, 1640, G - 10, 0.8, { open: o.urn === 'open' });
  if (o.bowl !== false) bowl(k, 1540, G - 6, 0.95, typeof o.bowl === 'object' ? o.bowl : {});
  jar(k, 1230, G + 4, 1);
}
// Nhà bà nhìn từ sân: ba gian mái rạ, sân gạch, giếng đá ong (x≈1500), cây vải sau nhà (bên trái).
// o.time: 'day' | 'dusk' | 'night' | 'storm'; o.branch: 'seat' | 'broken' | false.
export const HOUSE = { well: { x: 1500, y: 820 }, moon: { x: 1620, y: 170 } };
export function house(k, o = {}) {
  const { ctx, W, H } = k, time = o.time ?? 'day';
  const sky = { day: ['#9cc4d8', '#e6dcc0'], dusk: ['#5a4a6a', '#d89a6a'], night: ['#0d1426', '#26324e'], storm: ['#2e3540', '#55606a'] }[time];
  const g = ctx.createLinearGradient(0, 0, 0, 700); g.addColorStop(0, sky[0]); g.addColorStop(1, sky[1]);
  ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, 900);
  if (time === 'night') { for (let i = 0; i < 40; i++) k.dot(k.rand(i) * W, k.rand(i + 50) * 420, 1.5 + k.rand(i + 9) * 2, '#fff7d6', 0.4 + 0.4 * Math.sin((k.gt ?? 0) * 2 + i)); B(ctx, '#f3ecd2', () => ctx.arc(HOUSE.moon.x, HOUSE.moon.y, 70, 0, Math.PI * 2), 0); }
  // đồi chè
  const hill = (y, col, ph) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-100, 900); for (let x = -100; x <= W + 100; x += 40) ctx.lineTo(x, y - 60 * Math.sin(x / 420 + ph)); ctx.lineTo(W + 100, 900); ctx.closePath(); ctx.fill(); };
  const dk = time === 'day' ? 0 : 1;
  hill(560, dk ? '#1f2d26' : '#6d8f5a', 0.5); hill(640, dk ? '#18241e' : '#557a48', 2.2);
  // cây vải sau nhà
  lychee(k, 330, 760, 1, { branch: o.branch ?? 'seat', dark: dk, wind: time === 'storm' ? 1 : 0 });
  // nhà
  B(ctx, dk ? '#3a2e24' : '#9a7a56', () => ctx.rect(560, 470, 760, 300));
  for (let i = 0; i < 3; i++) B(ctx, dk ? '#22190f' : '#5a4330', () => ctx.rect(610 + i * 245, 560, 150, 210), 3);
  if (o.lit) { ctx.fillStyle = 'rgba(255,180,90,0.55)'; ctx.fillRect(612 + 245, 562, 146, 206); }
  B(ctx, dk ? '#4a3c26' : '#c9a86a', () => { ctx.moveTo(500, 480); ctx.lineTo(640, 330); ctx.lineTo(1240, 330); ctx.lineTo(1380, 480); ctx.closePath(); });
  ctx.strokeStyle = 'rgba(40,30,15,0.35)'; ctx.lineWidth = 2; for (let x = 520; x < 1370; x += 22) { ctx.beginPath(); ctx.moveTo(x, 478); ctx.lineTo(x + 40 * ((x - 940) / 440), 336); ctx.stroke(); }
  // sân gạch
  ctx.fillStyle = dk ? '#3a2620' : '#a8644a'; ctx.fillRect(-100, 770, W + 200, H);
  ctx.strokeStyle = dk ? 'rgba(0,0,0,0.35)' : 'rgba(80,40,25,0.4)'; ctx.lineWidth = 2;
  for (let y = 790; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(-100, y); ctx.lineTo(W + 100, y); ctx.stroke(); for (let x = (y / 40) % 2 ? 0 : 40; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 40); ctx.stroke(); } }
  well(k, HOUSE.well.x, HOUSE.well.y, 1, dk);
}
// Giếng đá ong: tâm miệng giếng (x, y).
export function well(k, x, y, s = 1, dk = 0) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  B(ctx, dk ? '#5a3424' : '#a0522d', () => { ctx.moveTo(-130, 0); ctx.lineTo(-130, 110); ctx.quadraticCurveTo(0, 150, 130, 110); ctx.lineTo(130, 0); ctx.closePath(); });
  ctx.fillStyle = 'rgba(0,0,0,0.3)'; for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.arc(-110 + k.rand(i + 80) * 220, 20 + k.rand(i + 81) * 90, 4 + k.rand(i) * 5, 0, Math.PI * 2); ctx.fill(); }
  B(ctx, '#0a0c10', () => ctx.ellipse(0, 0, 130, 34, 0, 0, Math.PI * 2));
  ctx.restore();
}
// Cây vải: gốc tại (x, y). o.branch 'seat' (cành chạc ba có tấm ván) | 'broken' (cành gãy nằm dưới đất) | false.
export function lychee(k, x, y, s = 1, o = {}) {
  const { ctx } = k, t = k.gt ?? 0, sway = (o.wind ?? 0) * Math.sin(t * 5) * 0.06;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const trunk = o.dark ? '#2a1d14' : '#5a3d26', leaf = o.dark ? ['#13201a', '#192a21'] : ['#2f5a34', '#3d6e3f'];
  B(ctx, trunk, () => { ctx.moveTo(-40, 0); ctx.lineTo(-26, -360); ctx.lineTo(26, -360); ctx.lineTo(40, 0); ctx.closePath(); });
  ctx.save(); ctx.rotate(sway);
  for (let i = 0; i < 9; i++) B(ctx, leaf[i % 2], () => ctx.arc(-220 + (i % 5) * 110, -470 - Math.floor(i / 5) * 120 + (i % 2) * 30, 120, 0, Math.PI * 2), 0);
  if (o.branch === 'seat') {
    B(ctx, trunk, () => { ctx.moveTo(20, -330); ctx.lineTo(300, -400); ctx.lineTo(300, -380); ctx.lineTo(24, -300); ctx.closePath(); }, 3);
    B(ctx, '#8a6a42', () => ctx.rect(150, -392, 110, 14), 3);
  }
  ctx.restore();
  if (o.branch === 'broken') {
    ctx.save(); ctx.translate(120, -10); ctx.rotate(0.1);
    B(ctx, trunk, () => { ctx.moveTo(0, 0); ctx.lineTo(320, -30); ctx.lineTo(320, -10); ctx.lineTo(0, 20); ctx.closePath(); }, 3);
    for (let i = 0; i < 4; i++) B(ctx, leaf[i % 2], () => ctx.arc(120 + i * 70, -40 + (i % 2) * 20, 60, 0, Math.PI * 2), 0);
    ctx.restore();
    B(ctx, '#8a6a42', () => ctx.rect(560, -20, 110, 14), 3);
    B(ctx, '#d8c8a8', () => { ctx.moveTo(22, -320); ctx.lineTo(40, -300); ctx.lineTo(24, -296); ctx.closePath(); }, 2);
  }
  ctx.restore();
}
// Gian giữa ban đêm: vách gỗ, cửa sổ song có ánh trăng, hai giường có màn. o.baEmpty = giường bà trống; o.hand 0..1 bàn tay nhỏ mờ.
export const ROOM = { moon: { x: 1450, y: 420, r: 520 }, lamp: { x: 360, y: 640, r: 360, flicker: 1, warm: 0.8 } };
export function room(k, o = {}) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#3e2f22'; ctx.fillRect(-100, -100, W + 200, G + 100);
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 3; for (let x = 0; x < W; x += 120) { ctx.beginPath(); ctx.moveTo(x, -100); ctx.lineTo(x, G); ctx.stroke(); }
  ctx.fillStyle = '#2a1f16'; ctx.fillRect(-100, G, W + 200, H);
  // cửa sổ song
  B(ctx, '#1a2238', () => ctx.rect(1300, 240, 300, 300));
  ctx.fillStyle = 'rgba(200,215,240,0.35)'; ctx.beginPath(); ctx.moveTo(1300, 540); ctx.lineTo(1600, 540); ctx.lineTo(1250, G); ctx.lineTo(900, G); ctx.closePath(); ctx.fill();
  for (let i = 1; i < 6; i++) B(ctx, '#3a2a1c', () => ctx.rect(1300 + i * 50 - 7, 240, 14, 300), 2);
  // giường + màn
  const bed = (x, w, empty) => {
    B(ctx, '#5a3f28', () => ctx.rect(x, G - 140, w, 40));
    B(ctx, '#4a3320', () => ctx.rect(x + 10, G - 100, 20, 100)); B(ctx, '#4a3320', () => ctx.rect(x + w - 30, G - 100, 20, 100));
    if (!empty) B(ctx, '#8a8a7a', () => ctx.ellipse(x + w * 0.5, G - 150, w * 0.38, 26, 0, Math.PI, 0), 3);
    ctx.fillStyle = 'rgba(235,235,225,0.22)'; ctx.strokeStyle = 'rgba(235,235,225,0.5)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x + 10, G - 140); ctx.lineTo(x + 40, G - 470); ctx.lineTo(x + w - 40, G - 470); ctx.lineTo(x + w - 10, G - 140); ctx.closePath(); ctx.fill(); ctx.stroke();
  };
  bed(120, 460, o.baEmpty);
  bed(700, 420, false);
  oil(k, 360, 640, 0.9);
  B(ctx, '#3a2a1c', () => ctx.rect(300, 640, 120, 20), 2);
  if (o.hand) { ctx.save(); ctx.globalAlpha = 0.55 * o.hand; B(ctx, '#d9e2ee', () => { ctx.ellipse(1000, G - 230, 26, 18, -0.4, 0, Math.PI * 2); }, 0); for (let i = 0; i < 4; i++) B(ctx, '#d9e2ee', () => ctx.ellipse(1012 + i * 6, G - 254 + i * 2, 5, 14, -0.2, 0, Math.PI * 2), 0); ctx.restore(); }
}
// Bụi tre cuối vườn dưới trăng.
export function bamboo(k, o = {}) {
  const { ctx, W, H } = k;
  const g = ctx.createLinearGradient(0, 0, 0, 800); g.addColorStop(0, '#0b1222'); g.addColorStop(1, '#22304a');
  ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, 1000);
  B(ctx, '#efe8cf', () => ctx.arc(170, 170, 64, 0, Math.PI * 2), 0);
  const t = k.gt ?? 0;
  for (let i = 0; i < 16; i++) {
    const x = 300 + i * 90 + k.rand(i) * 40, sw = Math.sin(t * 1.2 + i) * 10;
    ctx.strokeStyle = i % 2 ? '#1c2a22' : '#14201a'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(x, G + 20); ctx.quadraticCurveTo(x + sw, 500, x - 60 + sw * 3 + (i % 3) * 40, 60); ctx.stroke();
    ctx.fillStyle = '#16231c'; for (let j = 0; j < 5; j++) { ctx.beginPath(); ctx.ellipse(x - 30 + sw * 2 + (j % 2) * 60, 140 + j * 110, 60, 14, (j % 2 ? 0.5 : -0.5), 0, Math.PI * 2); ctx.fill(); }
  }
  ctx.fillStyle = '#1a1712'; ctx.fillRect(-100, G, W + 200, H);
  if (o.mound) B(ctx, '#2a241c', () => ctx.ellipse(960, G + 10, 120, 30, 0, Math.PI, 0), 3);
}
// Đường đất đỏ giữa đồi chè + xe khách cũ (x = vị trí xe).
export function busRoad(k, x = 960, o = {}) {
  const { ctx, W, H } = k;
  const g = ctx.createLinearGradient(0, 0, 0, 700); g.addColorStop(0, '#9cc4d8'); g.addColorStop(1, '#efe2c4');
  ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, 900);
  const hill = (y, col, ph) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-100, 1100); for (let xx = -100; xx <= W + 100; xx += 40) ctx.lineTo(xx, y - 70 * Math.sin(xx / 380 + ph)); ctx.lineTo(W + 100, 1100); ctx.closePath(); ctx.fill(); };
  hill(520, '#7a9a62', 1); hill(620, '#5f8a4c', 3);
  ctx.strokeStyle = 'rgba(40,70,30,0.45)'; ctx.lineWidth = 6; for (let y = 640; y < 820; y += 26) { ctx.beginPath(); ctx.moveTo(-100, y); ctx.quadraticCurveTo(W / 2, y - 40, W + 100, y); ctx.stroke(); }
  ctx.fillStyle = '#b5643a'; ctx.fillRect(-100, 800, W + 200, 300);
  const t = k.gt ?? 0, by = 790 + Math.sin(t * 9) * 3;
  ctx.save(); ctx.translate(x, by);
  B(ctx, '#d9d3c0', () => ctx.roundRect(-330, -260, 660, 230, 30));
  B(ctx, '#5d8aa8', () => ctx.rect(-330, -110, 660, 60), 3);
  for (let i = 0; i < 5; i++) B(ctx, '#2a3a48', () => ctx.rect(-300 + i * 120, -230, 96, 90), 3);
  if (o.kid) { ctx.save(); ctx.beginPath(); ctx.rect(-60, -230, 96, 90); ctx.clip(); k.char(-12, -100, 220, { ...MINH, face: 'calm', look: 0.4 }); ctx.restore(); }
  for (const wx of [-200, 210]) { B(ctx, '#1a1a1a', () => ctx.arc(wx, -20, 46, 0, Math.PI * 2)); B(ctx, '#777', () => ctx.arc(wx, -20, 16, 0, Math.PI * 2), 3); }
  ctx.restore();
  ctx.fillStyle = 'rgba(200,140,90,0.35)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(x + 380 + i * 60 + (t * 80 % 60), 760 - i * 6, 50 + i * 10, 22, 0, 0, Math.PI * 2); ctx.fill(); }
}
// Bờ ao ban chiều (bọn trẻ thì thầm).
export function pond(k) {
  const { ctx, W, H } = k;
  const g = ctx.createLinearGradient(0, 0, 0, 700); g.addColorStop(0, '#d58a5a'); g.addColorStop(1, '#f0c890');
  ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, 900);
  ctx.fillStyle = '#4a5a3a'; ctx.fillRect(-100, 560, W + 200, 200);
  ctx.fillStyle = '#5a6a6a'; ctx.beginPath(); ctx.ellipse(1300, 860, 900, 160, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,210,150,0.25)'; ctx.beginPath(); ctx.ellipse(1250, 840, 500, 40, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#5d4a32'; ctx.fillRect(-100, G - 40, 900, H);
  k.prop('bamboo', 160, 700, 420);
}
// Bàn đọc sách / phòng hiện đại tối (người kể lúc trưởng thành).
export function study(k) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#1f242c'; ctx.fillRect(-100, -100, W + 200, H + 200);
  B(ctx, '#3a2e24', () => ctx.rect(300, 720, 1320, 40));
  for (let i = 0; i < 6; i++) B(ctx, ['#7a3a2a', '#2a4a6a', '#5a6a3a', '#8a7a4a'][i % 4], () => ctx.rect(1150 + i * 46, 560 - (i % 3) * 20, 40, 160 + (i % 3) * 20), 3);
  B(ctx, '#2a2a2a', () => { ctx.moveTo(480, 720); ctx.lineTo(500, 520); ctx.lineTo(640, 470); }, 6);
  B(ctx, '#d9c48a', () => { ctx.moveTo(600, 450); ctx.lineTo(700, 470); ctx.lineTo(660, 520); ctx.closePath(); }, 3);
}
// Phòng bệnh viện đêm (mẹ kể chuyện).
export function hospital(k) {
  const { ctx, W, H } = k;
  ctx.fillStyle = '#2c3a3e'; ctx.fillRect(-100, -100, W + 200, H + 200);
  ctx.fillStyle = '#20292c'; ctx.fillRect(-100, G, W + 200, H);
  B(ctx, '#d8dcd8', () => ctx.rect(900, G - 180, 760, 70));
  B(ctx, '#8a9a9a', () => ctx.rect(900, G - 110, 30, 110)); B(ctx, '#8a9a9a', () => ctx.rect(1630, G - 110, 30, 110));
  B(ctx, '#e8ece8', () => ctx.ellipse(1520, G - 200, 90, 30, 0, 0, Math.PI * 2), 3);
  B(ctx, '#1a2a30', () => ctx.rect(300, 220, 360, 240));
  ctx.strokeStyle = '#5fe09a'; ctx.lineWidth = 4; ctx.beginPath(); const t = k.gt ?? 0; for (let x = 0; x <= 320; x += 8) { const u = ((x + t * 120) % 160) / 160; ctx.lineTo(320 + x, 340 - (u > 0.45 && u < 0.5 ? 70 : u > 0.5 && u < 0.55 ? -40 : 0)); } ctx.stroke();
}

// ---------- cuối video (tông tối, thay cho template sáng) ----------
// Poster tập sau: say chứa {next}. art(k) vẽ trong khung 1120×560 tâm (960, 520).
export function nextScene({ say, title, hook, art, sfx = [] }) {
  return {
    say, sfx: [['gong', 'next', 0.35], ...sfx],
    draw(k) {
      const { ctx } = k;
      ctx.fillStyle = '#07080c'; ctx.fillRect(-100, -100, k.W + 200, k.H + 200);
      const p = k.at('next', 0.9);
      k.text('TẬP SAU', k.W / 2, 110, { size: 56, font: 'title', color: AMBER, fx: 'fade', p });
      ctx.save(); ctx.globalAlpha = p; ctx.beginPath(); ctx.rect(400, 200, 1120, 600); ctx.clip();
      if (art) art(k);
      ctx.restore();
      ctx.save(); ctx.globalAlpha = p; ctx.strokeStyle = 'rgba(239,228,204,0.6)'; ctx.lineWidth = 4; ctx.strokeRect(400, 200, 1120, 600); ctx.restore();
      k.text(title, k.W / 2, 880, { size: 62, font: 'title', color: PAPER, fx: 'fade', p: k.at(k.cue('next', 0.6), 0.8), maxWidth: 1600 });
      if (hook) k.text(hook, k.W / 2, 975, { size: 40, color: COLD, fx: 'fade', p: k.at(k.cue('next', 1.4), 0.8), maxWidth: 1600 });
    },
  };
}
// Mời đăng ký: say chứa {q} (câu hỏi) và {sub}.
export function subScene({ say, question, channel = 'Nhân Gian Chưa Kể', art }) {
  return {
    say, sfx: [['click', ['sub', 1.6], 0.6]],
    draw(k) {
      const { ctx } = k;
      ctx.fillStyle = '#07080c'; ctx.fillRect(-100, -100, k.W + 200, k.H + 200);
      if (art) art(k);
      k.text(question, k.W / 2, 330, { size: 70, font: 'title', color: PAPER, fx: 'fade', p: k.at('q', 1), maxWidth: 1500 });
      const p = k.at('sub', 0.6), clicked = k.t > k.cue('sub', 1.6);
      if (p > 0) {
        ctx.save(); ctx.globalAlpha = p;
        B(ctx, clicked ? '#3a3a3a' : '#b0302a', () => ctx.roundRect(710, 560, 500, 120, 60), 0);
        ctx.restore();
        k.text(clicked ? 'ĐÃ ĐĂNG KÝ' : 'ĐĂNG KÝ', k.W / 2, 622, { size: 52, font: 'title', color: '#fff', p });
        k.text(channel, k.W / 2, 780, { size: 48, font: 'title', color: AMBER, fx: 'fade', p: k.at(k.cue('sub', 0.6), 0.8) });
      }
    },
  };
}

// ---------- Shorts (khung 1080×1920; nội dung trong y 150–1300, phụ đề ở y≈1420) ----------
// Cắt một cảnh ngang 1920×1080 vào khung dọc: lấy dải rộng 1080/s quanh cx, đặt từ y0, cao 1080·s.
// Trong fn gọi shade(k, a, lights, { vig: 0 }) — viền tối của khung dọc do vframe tự vẽ.
export function vframe(k, cx, fn, o = {}) {
  const s = o.s ?? 1.15, y0 = o.y0 ?? 150, { ctx } = k, W = k.W, H = k.H;
  ctx.fillStyle = '#05060a'; ctx.fillRect(-50, -50, W + 100, H + 100);
  ctx.save(); ctx.beginPath(); ctx.rect(0, y0, W, 1080 * s); ctx.clip();
  k.group({ x: W / 2 - cx * s, y: y0, s }, () => { k.W = 1920; k.H = 1080; try { fn(); } finally { k.W = W; k.H = H; } });
  ctx.restore();
  const g = ctx.createLinearGradient(0, y0, 0, y0 + 1080 * s);
  g.addColorStop(0, 'rgba(5,6,10,0.9)'); g.addColorStop(0.12, 'rgba(5,6,10,0)'); g.addColorStop(0.88, 'rgba(5,6,10,0)'); g.addColorStop(1, 'rgba(5,6,10,0.95)');
  ctx.fillStyle = g; ctx.fillRect(0, y0, W, 1080 * s);
}
// Chữ lớn khung dọc (vẽ sau vframe). cue = lúc hiện.
export function vline(k, text, y, cue = 0, o = {}) {
  k.text(text, k.W / 2, y, { size: o.size ?? 84, font: 'title', color: o.color ?? PAPER, maxWidth: 980, fx: 'fade', p: k.at(cue, 0.6), outline: '#000', outlineWidth: 12 });
}
