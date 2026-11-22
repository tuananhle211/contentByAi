// Demo phong cách "cổ phong Việt" (16/11/2026): nhân vật tự thiết kế (nho sinh), vẽ vector bằng code, cử động kiểu rối giấy.
// 0–5,5 s: bước đi trong sương (nhún, vạt áo + dải mũ đung đưa) → dừng, máy quay đẩy vào cận mặt, thở, chớp mắt, cúi nhẹ; phụ đề.
const W = 1920, H = 1080, GROUND = 1000;
const C = { ink: '#2A1F18', navy: '#26355A', navy2: '#1C2846', navyHi: '#34477A', gold: '#C9A24A', gold2: '#E2C27A', skin: '#EBD8BF', skinSh: '#D9BFA0', hair: '#17171F', red: '#7A2E2A', cream: '#F1E9D8', jade: '#3E8E86' };
const lerp = (a, b, p) => a + (b - a) * p;
const clamp = (x) => Math.max(0, Math.min(1, x));
const easeIO = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

// ---------- hoa văn (canvas pattern, tạo một lần) ----------
let PAT = null;
function patterns(ctx) {
  if (PAT) return PAT;
  const mk = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d')); return ctx.createPattern(c, 'repeat'); };
  PAT = {
    // ô trám + chấm, viền mảnh vàng nhạt trên nền chàm
    diamond: mk(56, 56, (g) => {
      g.fillStyle = C.navy; g.fillRect(0, 0, 56, 56);
      g.strokeStyle = 'rgba(226,194,122,0.28)'; g.lineWidth = 2;
      g.beginPath(); g.moveTo(28, 2); g.lineTo(54, 28); g.lineTo(28, 54); g.lineTo(2, 28); g.closePath(); g.stroke();
      g.beginPath(); g.moveTo(28, 14); g.lineTo(42, 28); g.lineTo(28, 42); g.lineTo(14, 28); g.closePath(); g.strokeStyle = 'rgba(226,194,122,0.16)'; g.stroke();
      g.fillStyle = 'rgba(241,233,216,0.45)'; g.beginPath(); g.arc(28, 28, 2.4, 0, 7); g.fill();
    }),
    // sóng nước (cổ áo): các vòng cung lồng nhau
    wave: mk(40, 24, (g) => {
      g.fillStyle = '#2E2A4A'; g.fillRect(0, 0, 40, 24);
      for (const [cx, cy] of [[0, 24], [20, 24], [40, 24], [10, 12], [30, 12]]) for (let r = 12; r > 2; r -= 3.5) { g.beginPath(); g.arc(cx, cy, r, Math.PI, 0); g.strokeStyle = r > 9 ? 'rgba(226,194,122,0.85)' : 'rgba(170,190,230,0.6)'; g.lineWidth = 1.6; g.stroke(); }
    }),
    // vải đỏ đai lưng: sọc chéo mảnh
    sash: mk(16, 16, (g) => { g.fillStyle = C.red; g.fillRect(0, 0, 16, 16); g.strokeStyle = 'rgba(0,0,0,0.18)'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 16); g.lineTo(16, 0); g.stroke(); }),
  };
  return PAT;
}

// ---------- nét vẽ ----------
function shape(ctx, d, fill, o = {}) {
  const p = new Path2D(d);
  if (fill) { ctx.fillStyle = fill; ctx.fill(p); }
  if (o.shade) { ctx.save(); ctx.clip(p); o.shade(); ctx.restore(); }
  if (o.stroke !== false) { ctx.strokeStyle = o.stroke ?? C.ink; ctx.lineWidth = o.lw ?? 4; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(p); }
  return p;
}
const line = (ctx, d, color, lw, dash) => { ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.stroke(new Path2D(d)); ctx.restore(); };

// ---------- đầu (toạ độ riêng: tâm đầu 0,0, mặt quay phải) ----------
function head(ctx, o) {
  const { blink = 0, ribbon = 0, t = 0 } = o;
  // dải mũ phía sau
  for (const [dx, len, ph] of [[0, 250, 0], [14, 215, 0.9]]) {
    ctx.beginPath(); ctx.moveTo(-58 + dx, -58);
    for (let i = 1; i <= 14; i++) { const u = i / 14; ctx.lineTo(-58 + dx - u * len * 0.35 - ribbon * 60 * u * u, -58 + u * len + Math.sin(t * 4 + u * 5 + ph) * (5 + ribbon * 16) * u); }
    ctx.strokeStyle = C.ink; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.stroke(); ctx.strokeStyle = '#3B5A8C'; ctx.lineWidth = 9; ctx.stroke();
  }
  // tóc phủ sau đầu + gáy
  shape(ctx, 'M -6,-74 C -62,-86 -92,-30 -84,30 C -80,62 -60,86 -34,86 C -26,60 -28,20 -16,-12 C -10,-34 -2,-52 -6,-74 Z', C.hair, { lw: 3.4, shade: () => { line(ctx, 'M -60,-50 C -74,-10 -72,30 -56,64', 'rgba(120,130,160,0.35)', 3); line(ctx, 'M -40,-60 C -54,-20 -52,20 -42,60', 'rgba(120,130,160,0.25)', 2.4); } });
  // da: cổ + mặt nghiêng (chỉ từ tai về trước)
  shape(ctx, 'M -28,112 L -30,64 C -32,30 -22,-30 0,-56 C 22,-80 48,-78 56,-64 L 58,-40 C 60,-30 62,-22 66,-14 C 72,-6 80,4 84,14 C 86,18 84,22 76,24 C 74,26 74,30 76,32 C 80,34 80,38 76,40 C 79,43 78,47 74,49 C 70,52 68,54 70,58 C 72,66 64,74 52,76 C 36,78 22,74 10,68 L 16,112 Z', C.skin, {
    shade: () => {
      const g = ctx.createLinearGradient(-30, 0, 80, 0); g.addColorStop(0, 'rgba(170,125,95,0.35)'); g.addColorStop(0.4, 'rgba(170,125,95,0)'); ctx.fillStyle = g; ctx.fillRect(-40, -100, 140, 220);
      const b = ctx.createRadialGradient(50, 24, 2, 50, 24, 20); b.addColorStop(0, 'rgba(214,110,100,0.4)'); b.addColorStop(1, 'rgba(214,110,100,0)'); ctx.fillStyle = b; ctx.fillRect(20, 0, 60, 60);
      ctx.fillStyle = 'rgba(150,110,80,0.28)'; ctx.beginPath(); ctx.ellipse(-4, 96, 30, 16, 0, 0, 7); ctx.fill();
      line(ctx, 'M 62,-20 C 66,-12 70,-4 72,4', 'rgba(170,125,95,0.35)', 3); // sống mũi
    }, lw: 3.4,
  });
  // tai
  shape(ctx, 'M -10,-14 C -24,-16 -26,14 -10,22 C -4,24 -2,14 -4,6 C -6,-2 -4,-10 -10,-14 Z', C.skinSh, { lw: 3 });
  line(ctx, 'M -12,-4 C -17,4 -15,12 -10,14', 'rgba(42,31,24,0.6)', 2);
  // mai tóc trước tai
  shape(ctx, 'M 2,-58 C -8,-30 -6,-4 0,20 C 6,4 8,-26 16,-56 Z', C.hair, { lw: 2 });
  // lông mày
  line(ctx, 'M 33,-28 Q 48,-35 63,-26', C.ink, 4.2);
  // mắt nghiêng + kẻ mắt có đuôi
  if (blink < 0.5) {
    const eye = 'M 38,-12 Q 50,-21 61,-11 Q 51,-5 38,-12 Z';
    shape(ctx, eye, '#FBF6EC', { stroke: false });
    ctx.save(); ctx.clip(new Path2D(eye)); ctx.fillStyle = '#1C140F'; ctx.beginPath(); ctx.arc(53, -12, 5.2, 0, 7); ctx.fill(); ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(54.5, -14, 1.4, 0, 7); ctx.fill(); ctx.restore();
    line(ctx, 'M 24,-16 Q 32,-12 37,-12 Q 50,-23 63,-11', C.ink, 4.6);
    line(ctx, 'M 41,-8 Q 51,-4 59,-9', 'rgba(42,31,24,0.6)', 1.8);
  } else line(ctx, 'M 24,-14 Q 34,-10 38,-10 Q 50,-6 62,-10', C.ink, 4.6);
  shape(ctx, 'M 76,32 C 80,34 80,38 76,40 C 79,43 78,47 74,49 C 71,44 71,36 76,32 Z', '#B9675C', { lw: 1.6 });
  // quai hàm
  line(ctx, 'M 50,74 C 30,72 10,64 -2,50', 'rgba(150,105,75,0.55)', 2.6);
  // mũ nho sinh: tròn, viền vàng, hạt ngọc (hạ thấp ~20%)
  ctx.save(); ctx.translate(0, -50); ctx.scale(1, 0.8); ctx.translate(0, 50);
  shape(ctx, 'M -70,-50 C -80,-128 -46,-214 8,-218 C 62,-221 90,-150 80,-48 C 32,-62 -22,-62 -70,-50 Z', C.navy2, {
    shade: () => { const g = ctx.createLinearGradient(-80, 0, 90, 0); g.addColorStop(0, 'rgba(0,0,0,0.3)'); g.addColorStop(0.62, 'rgba(90,120,190,0.28)'); g.addColorStop(1, 'rgba(0,0,0,0.12)'); ctx.fillStyle = g; ctx.fillRect(-90, -230, 190, 200); line(ctx, 'M 12,-216 C 26,-170 30,-110 24,-58', 'rgba(140,165,220,0.55)', 3); line(ctx, 'M -32,-198 C -20,-150 -16,-100 -20,-56', 'rgba(0,0,0,0.3)', 3); },
  });
  shape(ctx, 'M -74,-62 C -22,-76 34,-76 84,-60 L 82,-42 C 32,-56 -22,-56 -72,-44 Z', C.gold, { lw: 3, shade: () => line(ctx, 'M -70,-53 C -22,-66 34,-66 82,-52', 'rgba(255,240,200,0.6)', 2, [6, 5]) });
  ctx.fillStyle = C.jade; ctx.beginPath(); ctx.arc(64, -54, 9, 0, 7); ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 2.6; ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.beginPath(); ctx.arc(61, -57, 2.6, 0, 7); ctx.fill();
  ctx.restore();
}

// ---------- thân (toạ độ: chân tại 0,0, mặt quay phải, cao ~1000) — dáng thon, áo hai lớp ----------
// Giày vải mũi cong (gót tại 0,0, mũi quay phải). lift: nhấc gót (xoay quanh mũi), far: chân phía xa (tối hơn).
function shoe(ctx, x, lift = 0, far = false) {
  ctx.save(); ctx.translate(x, 0);
  ctx.translate(108, 0); ctx.rotate(-lift); ctx.translate(-108, 0);
  shape(ctx, 'M -4,-2 L 100,-2 C 105,2 101,7 96,7 L -2,7 C -7,7 -7,1 -4,-2 Z', far ? '#B9B2A4' : '#F1E9D8', { lw: 2.6 });
  shape(ctx, 'M 0,-2 L 2,-27 C 14,-39 44,-41 72,-35 C 92,-31 104,-31 114,-44 C 123,-37 119,-20 106,-10 L 98,-2 Z', far ? '#0B0B10' : '#17171E', {
    lw: 3, shade: () => { line(ctx, 'M 8,-14 C 40,-17 72,-15 100,-10', 'rgba(201,162,74,0.75)', 2.2); line(ctx, 'M 10,-30 C 34,-36 60,-36 84,-31', 'rgba(255,255,255,0.18)', 3); },
  });
  ctx.restore();
}
// Bàn tay thon cầm quạt giấy gấp (gốc ở cổ tay, hướng +x).
function handFan(ctx) {
  // quạt: nan tre, giấy kem, đinh tán
  // tua đỏ ở chuôi quạt
  line(ctx, 'M 16,10 C 8,30 14,52 6,74', C.ink, 6); line(ctx, 'M 16,10 C 8,30 14,52 6,74', '#A8423A', 3.6);
  shape(ctx, 'M 2,72 C -2,84 0,96 6,104 C 12,96 14,84 10,72 Z', '#A8423A', { lw: 2 });
  // bản quạt gấp: rộng dần về đầu, nan tre + mép giấy
  shape(ctx, 'M 18,-2 L 172,-70 C 182,-62 184,-44 178,-34 L 28,16 Z', '#E4D2A6', { lw: 2.8, shade: () => { for (let i = 1; i < 7; i++) line(ctx, `M ${22 + i},${1 + i * 2.2} L ${174 + i * 0.6},${-68 + i * 5.2}`, 'rgba(120,90,40,0.38)', 1.4); line(ctx, 'M 120,-46 L 176,-66', 'rgba(185,103,92,0.6)', 4); line(ctx, 'M 128,-30 L 180,-48', 'rgba(185,103,92,0.4)', 3); } });
  shape(ctx, 'M 18,-2 L 172,-70 L 174,-64 L 22,2 Z', '#B58C4E', { lw: 1.6 });
  ctx.fillStyle = '#7A5A2A'; ctx.beginPath(); ctx.arc(20, 8, 5, 0, 7); ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.stroke();
  // bàn tay (lưng bàn tay + bốn ngón khép ôm quạt)
  shape(ctx, 'M 0,-11 C 14,-15 30,-15 41,-11 C 53,-7 64,-4 71,2 C 76,6 74,12 67,12 C 56,12 46,13 38,15 C 30,18 18,17 10,14 C 5,12 2,12 0,11 Z', C.skin, {
    lw: 2.8, shade: () => { line(ctx, 'M 45,-5 C 54,-2 61,1 67,5', 'rgba(150,105,75,0.55)', 1.6); line(ctx, 'M 44,1 C 53,3 60,6 65,9', 'rgba(150,105,75,0.45)', 1.4); const g = ctx.createLinearGradient(0, -14, 0, 16); g.addColorStop(0, 'rgba(255,255,255,0.12)'); g.addColorStop(1, 'rgba(150,105,75,0.25)'); ctx.fillStyle = g; ctx.fillRect(-2, -16, 80, 34); },
  });
  // ngón cái vòng qua quạt
  shape(ctx, 'M 14,2 C 26,2 36,6 40,13 C 41,18 35,20 29,16 C 24,12 19,10 12,10 Z', C.skin, { lw: 2.6 });
}
function body(ctx, o) {
  const { sway = 0, step = 0, breathe = 0, t = 0, arm = 0 } = o;
  const P = patterns(ctx);
  const hf = 12 * sway, hb = 12 * Math.sin(t * 2.6 + 1) * Math.abs(sway);
  // tay áo phía xa (sau thân)
  shape(ctx, 'M -20,-746 C 40,-730 70,-660 74,-560 C 78,-470 90,-390 110,-330 L 70,-300 C 20,-300 -40,-320 -60,-370 C -70,-480 -64,-660 -20,-746 Z', C.navy2, { lw: 3.6 });
  // giày
  // chân xa (sau) rồi chân gần: luân phiên ra trước, chân phía sau nhấc gót
  shoe(ctx, 30 - 72 * step, Math.max(0, step) * 0.16, true);
  shoe(ctx, 52 + 72 * step, Math.max(0, -step) * 0.16);
  // lớp áo trong (xanh nhạt, dài hơn chút, lộ ở gấu)
  shape(ctx, `M -150,-60 C -30,-50 80,-50 ${196 + hf},-60 L ${200 + hf},-24 L ${-158 + hb},-24 Z`, '#5D7BA8', { lw: 3.4, shade: () => line(ctx, `M ${-150 + hb},-30 C -30,-24 80,-24 ${196 + hf},-30`, 'rgba(241,233,216,0.7)', 2, [7, 6]) });
  // áo ngoài giao lĩnh — dáng thon
  const robe = `M -42,-764 C -98,-754 -122,-720 -126,-660 C -132,-520 ${-142 + hb * 0.5},-300 ${-168 + hb},-46 L ${190 + hf},-46 C ${168 + hf * 0.6},-270 152,-480 142,-640 C 134,-712 98,-752 48,-766 Z`;
  shape(ctx, robe, P.diamond, {
    lw: 4.2,
    shade: () => {
      const g = ctx.createLinearGradient(-170, 0, 190, 0); g.addColorStop(0, 'rgba(0,0,0,0.35)'); g.addColorStop(0.55, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.22)'); ctx.fillStyle = g; ctx.fillRect(-200, -800, 420, 800);
      for (const [x0, x1, a] of [[-90, -120 + hb, 0.22], [-20, -30 + hb * 0.5, 0.16], [60, 76 + hf * 0.5, 0.16], [110, 140 + hf, 0.2]]) line(ctx, `M ${x0},-450 C ${x0 + 4},-300 ${x1 - 3},-160 ${x1},-50`, `rgba(0,0,0,${a})`, 4.4);
      line(ctx, 'M -60,-730 C -92,-600 -100,-500 -94,-470', 'rgba(140,165,220,0.25)', 6);
    },
  });
  // vạt trước: lót kem lộ ra + nẹp vàng
  shape(ctx, `M 46,-766 C 84,-700 128,-600 140,-480 C 150,-330 ${164 + hf * 0.6},-190 ${186 + hf},-48 L ${166 + hf},-48 C 146,-190 132,-330 122,-480 C 110,-590 70,-690 32,-758 Z`, C.cream, { lw: 3 });
  shape(ctx, `M 32,-758 C 70,-690 110,-590 122,-480 C 132,-330 ${146 + hf * 0.6},-190 ${166 + hf},-48 L ${150 + hf},-48 C 130,-190 118,-330 108,-480 C 96,-584 58,-682 20,-750 Z`, C.gold, { lw: 2.8 });
  // gấu áo ngoài viền vàng + chỉ khâu
  shape(ctx, `M ${-166 + hb},-78 C -40,-70 70,-70 ${186 + hf},-78 L ${190 + hf},-46 L ${-168 + hb},-46 Z`, C.gold, { lw: 3.2, shade: () => line(ctx, `M ${-160 + hb},-62 C -40,-56 70,-56 ${184 + hf},-62`, 'rgba(80,55,20,0.55)', 2, [7, 6]) });
  // đai lưng đỏ + dải buộc
  const by = -500 + breathe * 2;
  shape(ctx, `M -134,${by - 22} C -40,${by - 34} 60,${by - 34} 146,${by - 26} L 148,${by + 12} C 60,${by + 2} -40,${by + 2} -138,${by + 16} Z`, P.sash, { lw: 3.2, shade: () => { line(ctx, `M -132,${by - 15} C -40,${by - 27} 60,${by - 27} 146,${by - 19}`, 'rgba(226,194,122,0.85)', 2.6); line(ctx, `M -136,${by + 9} C -40,${by - 4} 60,${by - 4} 147,${by + 5}`, 'rgba(226,194,122,0.85)', 2.6); } });
  for (const [dx, len, ph] of [[0, 200, 0], [14, 170, 1.2]]) { ctx.beginPath(); ctx.moveTo(-120 + dx, by + 6); for (let i = 1; i <= 10; i++) { const u = i / 10; ctx.lineTo(-120 + dx - u * 12 + Math.sin(t * 2.6 + u * 3 + ph) * (3 + 12 * Math.abs(sway)) * u, by + 6 + u * len); } ctx.strokeStyle = C.ink; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.stroke(); ctx.strokeStyle = C.red; ctx.lineWidth = 9; ctx.stroke(); }
  // cổ áo: lớp trắng trong + dải sóng nước
  shape(ctx, 'M -34,-794 C -10,-772 30,-772 50,-792 L 56,-768 C 30,-748 -16,-748 -42,-770 Z', C.cream, { lw: 3 });
  shape(ctx, 'M -62,-782 C -24,-748 38,-746 70,-780 L 78,-752 C 40,-718 -30,-718 -70,-752 Z', P.wave, { lw: 3.4 });
  // tay áo gần: rủ dọc thân, miệng tay rộng ngang gối, bàn tay khép
  ctx.save(); ctx.translate(14, -748); ctx.rotate(arm); ctx.translate(-14, 748);
  shape(ctx, 'M 12,-750 C 84,-740 126,-692 132,-600 C 140,-500 150,-420 170,-352 L 200,-292 C 150,-254 70,-254 26,-292 C 4,-380 -14,-560 -6,-680 C -4,-722 2,-742 12,-750 Z', P.diamond, {
    lw: 4.2,
    shade: () => { const g = ctx.createLinearGradient(0, -760, 0, -260); g.addColorStop(0, 'rgba(255,255,255,0.06)'); g.addColorStop(1, 'rgba(0,0,0,0.38)'); ctx.fillStyle = g; ctx.fillRect(-40, -760, 260, 510); line(ctx, 'M 40,-700 C 64,-560 60,-420 44,-300', 'rgba(0,0,0,0.25)', 4.4); line(ctx, 'M 104,-660 C 124,-560 132,-440 140,-330', 'rgba(0,0,0,0.2)', 4); },
  });
  shape(ctx, 'M 26,-300 C 70,-262 150,-262 200,-300 L 204,-286 C 150,-244 66,-244 22,-284 Z', C.gold, { lw: 2.8 });
  ctx.save(); ctx.translate(176, -282); ctx.rotate(0.55 + arm * 2.5); handFan(ctx); ctx.restore();
  ctx.restore();
}

// ---------- nhân vật đầy đủ ----------
function scholar(k, x, s, o) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, GROUND + (o.bob ?? 0)); ctx.scale(s, s);
  ctx.save(); ctx.scale(1, 1 + (o.breathe ?? 0) * 0.006); body(ctx, o); ctx.restore();
  ctx.save(); ctx.translate(22, -858); ctx.rotate(o.nod ?? 0); ctx.scale(1.08, 1.08); head(ctx, o); ctx.restore();
  ctx.restore();
}

// ---------- phông: sương xám xanh, núi mờ, mây cuộn, trăng ----------
function backdrop(k, t) {
  const { ctx } = k;
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#8E99A5'); g.addColorStop(0.6, '#AEB6BD'); g.addColorStop(1, '#C3C8C8'); ctx.fillStyle = g; ctx.fillRect(-W, -H, W * 3, H * 3);
  ctx.save(); ctx.globalAlpha = 0.5; ctx.strokeStyle = 'rgba(245,245,240,0.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1640, 200, 64, 0, 7); ctx.stroke(); ctx.fillStyle = 'rgba(240,240,232,0.35)'; ctx.fill(); ctx.restore();
  // mây cuộn kiểu cổ
  const cloud = (cx, cy, s) => { ctx.save(); ctx.translate(cx + Math.sin(t * 0.2) * 10, cy); ctx.scale(s, s); ctx.strokeStyle = 'rgba(80,90,105,0.45)'; ctx.fillStyle = 'rgba(205,212,216,0.65)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-120, 20); ctx.bezierCurveTo(-120, -20, -60, -30, -40, -6); ctx.bezierCurveTo(-30, -50, 40, -54, 50, -10); ctx.bezierCurveTo(80, -30, 130, -10, 120, 20); ctx.closePath(); ctx.fill(); ctx.stroke(); for (const [x, r] of [[-60, 14], [10, 18], [80, 12]]) { ctx.beginPath(); ctx.arc(x, -2, r, Math.PI * 0.2, Math.PI * 1.9); ctx.stroke(); ctx.beginPath(); ctx.arc(x + r * 0.3, -2, r * 0.5, Math.PI * 0.2, Math.PI * 1.7); ctx.stroke(); } ctx.restore(); };
  cloud(1700, 230, 1.1); cloud(360, 170, 0.8);
  // núi mờ thuỷ mặc
  for (const [y0, a, sd] of [[700, 0.22, 3], [780, 0.3, 7]]) { ctx.fillStyle = `rgba(70,82,96,${a})`; ctx.beginPath(); ctx.moveTo(-200, H); for (let x = -200; x <= W + 200; x += 40) ctx.lineTo(x, y0 - 160 * Math.abs(Math.sin(x * 0.0021 + sd)) - 60 * Math.abs(Math.sin(x * 0.007 + sd * 2))); ctx.lineTo(W + 200, H); ctx.closePath(); ctx.fill(); }
  // sương trôi
  for (let i = 0; i < 9; i++) { const x = ((i * 260 + t * (14 + i * 3)) % (W + 600)) - 300, y = 640 + (i % 4) * 90; const fg = ctx.createRadialGradient(x, y, 10, x, y, 320); fg.addColorStop(0, 'rgba(235,238,238,0.42)'); fg.addColorStop(1, 'rgba(235,238,238,0)'); ctx.fillStyle = fg; ctx.fillRect(x - 330, y - 330, 660, 660); }
  ctx.fillStyle = 'rgba(200,205,205,0.55)'; ctx.fillRect(-W, GROUND - 10, W * 3, 400);
}
function foreground(k, t) {
  const { ctx } = k;
  // lau sậy tiền cảnh (lắc nhẹ) + sương phủ chân
  for (let i = 0; i < 11; i++) { const x = 1580 + i * 34 + 14 * k.rand(i + 3), h = 300 + 160 * k.rand(i), sw = Math.sin(t * 1.1 + i) * 14, tx = x + sw + 30, ty = H - h; ctx.strokeStyle = 'rgba(52,58,64,0.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, H + 20); ctx.quadraticCurveTo(x + sw * 0.4, H - h * 0.5, tx, ty); ctx.stroke();
    const pg = ctx.createLinearGradient(tx, ty, tx + 40, ty - 110); pg.addColorStop(0, 'rgba(232,230,222,0.85)'); pg.addColorStop(1, 'rgba(232,230,222,0)'); ctx.fillStyle = pg; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.quadraticCurveTo(tx + 34, ty - 40, tx + 44 + sw * 0.6, ty - 120); ctx.quadraticCurveTo(tx + 6, ty - 60, tx, ty); ctx.fill(); }
  const mg = ctx.createLinearGradient(0, GROUND - 80, 0, H); mg.addColorStop(0, 'rgba(220,224,224,0)'); mg.addColorStop(1, 'rgba(220,224,224,0.75)'); ctx.fillStyle = mg; ctx.fillRect(-W, GROUND - 80, W * 3, 400);
}
function subtitle(k, text, p) {
  if (p <= 0) return;
  const lines = text.split('\n');
  lines.forEach((s, i) => k.text(s, W / 2, 930 + i * 58, { size: 44, color: `rgba(255,255,255,${p})`, outline: 'rgba(20,20,24,0.9)', outlineWidth: 7 }));
}

export default {
  meta: {
    title: 'Demo cổ phong', description: 'Demo nội bộ — không đăng.',
    format: 'long', minDuration: 0, captions: false, lang: 'vi', style: 'clean',
    gpu: true, camera: 0, transition: 'cut', scribble: false, sfxTransitions: false, paper: '#AEB6BD',
    post: { bloom: 0.18, bloomCut: 0.75, tint: '#3a4a5a', tintA: 0.08, sat: 0.96, contrast: 1.04, vignette: 0.42, grain: 0.05 },
  },
  thumbnail(k) { backdrop(k, 0); scholar(k, 900, 0.86, { t: 0 }); foreground(k, 0); },
  scenes: [
    {
      dur: 10,
      draw(k) {
        const t = k.t, walkP = clamp(t / 5.5), xw = lerp(330, 900, 1 - Math.pow(1 - walkP, 2)); // bước chậm dần rồi dừng
        const moving = 1 - clamp((t - 4.6) / 0.9);
        const phase = xw / 72;
        const zoom = lerp(1, 1.9, easeIO(clamp((t - 5.4) / 3.6)));
        const hx = xw + 22 * 0.86 + 30, hy = GROUND - 858 * 0.86 + 60, f = easeIO(clamp((t - 5.4) / 3.6));
        const cx = lerp(W / 2, hx, f), cy = lerp(H / 2, hy, f);
        k.group({ x: W / 2, y: H / 2, s: zoom }, () => {
          k.ctx.translate(-cx, -cy);
          backdrop(k, t);
          const blink = (t > 7.0 && t < 7.16) || (t > 9.05 && t < 9.2) ? 1 : 0;
          scholar(k, xw, 0.86, {
            t, sway: Math.sin(phase * Math.PI) * moving, step: Math.sin(phase * Math.PI) * moving, bob: -7 * Math.abs(Math.sin(phase * Math.PI)) * moving,
            ribbon: moving, breathe: Math.sin(t * 2.2) * (1 - moving), arm: 0.03 * Math.sin(phase * Math.PI) * moving,
            nod: 0.05 * Math.sin(clamp((t - 6.2) / 1.6) * Math.PI), blink,
          });
          foreground(k, t);
        });
        subtitle(k, 'Chàng nho sinh dừng lại bên bờ sông.\nTrong sương, có tiếng ai khẽ gọi tên chàng.', clamp((t - 6) / 0.6));
        k.text('DEMO · NHÂN VẬT VẼ BẰNG CODE', 40, 50, { size: 24, color: 'rgba(30,30,36,0.6)', align: 'left' });
      },
    },
  ],
};
