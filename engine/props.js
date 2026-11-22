// Đồ vật / con vật / cảnh vật vẽ phẳng (flat). Mỗi hàm vẽ trong hộp ~100 đơn vị quanh tâm (0,0), đáy ~ y = +50.
// Dùng: k.prop(name, x, y, size, { p, flip, rotate, bob, ...tuỳ chọn riêng })
import { C } from './kit.js';
import { INK, shade } from './characters.js';

const LW = 1.6;
function B(ctx, fill, path, o = {}) {
  ctx.beginPath(); path(); ctx.fillStyle = fill; ctx.fill();
  if (o.shadeSide) { ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.fillRect(o.shadeSide, -200, 400, 400); ctx.restore(); }
  if (o.stroke !== false) { ctx.lineWidth = o.lw ?? LW; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); }
}
function L(ctx, color, w, path) { ctx.beginPath(); path(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
const E = (ctx, x, y, rx, ry, r = 0) => ctx.ellipse(x, y, rx, ry, r, 0, Math.PI * 2);
const eye = (ctx, x, y, r = 2.4) => { B(ctx, INK, () => E(ctx, x, y, r, r * 1.1), { stroke: false }); B(ctx, '#fff', () => E(ctx, x - r * 0.35, y - r * 0.4, r * 0.35, r * 0.35), { stroke: false }); };

export const PROPS = {
  // Voi nhìn ngang; o.tusks = số ngà (voi chín ngà!)
  elephant(k, o) {
    const { ctx } = k; const g = o.fill ?? '#9aa3ad';
    for (const x of [-22, 18]) B(ctx, shade(g, -0.15), () => ctx.roundRect(x - 6, 8, 12, 40, 4));
    B(ctx, g, () => E(ctx, -4, 0, 36, 26), { shadeSide: 8 });
    for (const x of [-12, 26]) B(ctx, g, () => ctx.roundRect(x - 6, 10, 12, 40, 4));
    L(ctx, INK, LW, () => { ctx.moveTo(-40, -4); ctx.quadraticCurveTo(-48, 4, -44, 14); });
    B(ctx, g, () => { ctx.arc(34, -14, 18, 0, Math.PI * 2); });
    B(ctx, shade(g, -0.12), () => E(ctx, 24, -12, 11, 15, 0.2));
    B(ctx, g, () => { ctx.moveTo(46, -8); ctx.quadraticCurveTo(58, 10, 50, 32); ctx.quadraticCurveTo(48, 40, 56, 40); ctx.lineTo(56, 34); ctx.quadraticCurveTo(54, 30, 58, 24); ctx.quadraticCurveTo(64, 6, 50, -16); ctx.closePath(); });
    eye(ctx, 40, -18);
    const n = o.tusks ?? 2;
    for (let i = 0; i < n; i++) {
      const a = n === 1 ? 0.2 : -1.25 + (i / (n - 1)) * 2.3;
      ctx.save(); ctx.translate(46, -2); ctx.rotate(a);
      B(ctx, '#fffaf0', () => { ctx.moveTo(0, -2.5); ctx.quadraticCurveTo(16, -1, 26, -11); ctx.quadraticCurveTo(18, 4, 0, 3.5); ctx.closePath(); }, { lw: 1.2 });
      ctx.restore();
    }
  },
  // Gà trống; o.spurs = số cựa (gà chín cựa!)
  rooster(k, o) {
    const { ctx } = k;
    for (const [c, a] of [['#1d4f8a', -0.5], ['#2e7d4f', -0.1], ['#e4572e', 0.3]]) {
      ctx.save(); ctx.translate(-20, -6); ctx.rotate(a);
      B(ctx, c, () => { ctx.moveTo(0, 0); ctx.quadraticCurveTo(-26, -30, -14, -46); ctx.quadraticCurveTo(-8, -20, 6, -4); ctx.closePath(); });
      ctx.restore();
    }
    const legs = [[-4, 0], [8, 0]];
    for (const [x] of legs) {
      L(ctx, '#e8a33c', 3.4, () => { ctx.moveTo(x, 18); ctx.lineTo(x, 44); ctx.lineTo(x + 7, 46); ctx.moveTo(x, 44); ctx.lineTo(x - 5, 47); });
    }
    const n = o.spurs ?? 1;
    for (let i = 0; i < n; i++) {
      const x = i % 2 ? 8 : -4, yy = 24 + Math.floor(i / 2) * 4.5;
      B(ctx, '#f6e7c1', () => { ctx.moveTo(x + (i % 2 ? 1 : -1), yy); ctx.lineTo(x + (i % 2 ? 7 : -7), yy - 3); ctx.lineTo(x + (i % 2 ? 1 : -1), yy + 2.4); ctx.closePath(); }, { lw: 0.9 });
    }
    B(ctx, o.fill ?? '#e8743b', () => E(ctx, 0, 4, 24, 18), { shadeSide: 6 });
    B(ctx, shade(o.fill ?? '#e8743b', -0.15), () => E(ctx, -4, 6, 13, 9, 0.3));
    B(ctx, o.fill ?? '#e8743b', () => { ctx.moveTo(10, -6); ctx.quadraticCurveTo(14, -30, 22, -30); ctx.quadraticCurveTo(28, -18, 22, 0); ctx.closePath(); });
    B(ctx, '#f3b33d', () => E(ctx, 22, -30, 9, 9));
    B(ctx, C.red, () => { ctx.moveTo(15, -36); ctx.lineTo(16, -45); ctx.lineTo(20, -39); ctx.lineTo(23, -47); ctx.lineTo(26, -39); ctx.lineTo(30, -44); ctx.lineTo(29, -35); ctx.closePath(); });
    B(ctx, '#f6c344', () => { ctx.moveTo(30, -31); ctx.lineTo(38, -28); ctx.lineTo(30, -26); ctx.closePath(); });
    B(ctx, C.red, () => E(ctx, 29, -22, 2.8, 4.5));
    eye(ctx, 24, -32, 2);
  },
  // Ngựa nhìn ngang; o.manes = số chòm bờm đỏ (ngựa chín hồng mao!), o.fire phun lửa
  horse(k, o) {
    const { ctx } = k; const g = o.fill ?? '#a0683a';
    for (const x of [-26, 14]) B(ctx, shade(g, -0.2), () => ctx.roundRect(x - 4, 6, 8, 42, 3));
    B(ctx, g, () => { ctx.moveTo(-38, -4); ctx.quadraticCurveTo(-36, -22, -10, -20); ctx.lineTo(18, -20); ctx.quadraticCurveTo(36, -22, 36, -2); ctx.quadraticCurveTo(34, 16, 14, 16); ctx.lineTo(-24, 16); ctx.quadraticCurveTo(-40, 14, -38, -4); ctx.closePath(); }, { shadeSide: 4 });
    for (const x of [-20, 22]) B(ctx, g, () => ctx.roundRect(x - 4, 8, 8, 40, 3));
    for (const x of [-26, 14, -20, 22]) B(ctx, '#4a3424', () => ctx.rect(x - 4.5, 44, 9, 5));
    B(ctx, g, () => { ctx.moveTo(22, -18); ctx.quadraticCurveTo(28, -40, 40, -46); ctx.quadraticCurveTo(58, -44, 62, -30); ctx.quadraticCurveTo(64, -24, 56, -22); ctx.quadraticCurveTo(48, -24, 44, -20); ctx.quadraticCurveTo(38, -8, 34, -4); ctx.closePath(); });
    B(ctx, g, () => { ctx.moveTo(38, -46); ctx.lineTo(40, -56); ctx.lineTo(45, -46); ctx.closePath(); });
    eye(ctx, 48, -38, 2.2);
    B(ctx, INK, () => E(ctx, 60, -28, 1.2, 1.2), { stroke: false });
    const n = o.manes ?? 5, mc = o.mane ?? '#3b2a20';
    for (let i = 0; i < n; i++) {
      const t = i / Math.max(1, n - 1);
      const mx = 36 - t * 16, my = -44 + t * 26;
      B(ctx, mc, () => { ctx.moveTo(mx, my); ctx.quadraticCurveTo(mx - 9, my + 1, mx - 13, my + 7 + 2 * Math.sin((k.gt ?? 0) * 6 + i)); ctx.quadraticCurveTo(mx - 6, my + 4, mx + 2, my + 4); ctx.closePath(); }, { lw: 1 });
    }
    B(ctx, mc, () => { ctx.moveTo(-38, -10); ctx.quadraticCurveTo(-52, -4, -50, 18 + 2 * Math.sin((k.gt ?? 0) * 5)); ctx.quadraticCurveTo(-44, 6, -36, -2); ctx.closePath(); });
    if (o.fire) {
      ctx.save(); ctx.translate(63, -27); ctx.scale(o.fire * (1 + 0.08 * Math.sin((k.gt ?? 0) * 25)), o.fire);
      B(ctx, C.orange, () => { ctx.moveTo(0, -3); ctx.quadraticCurveTo(22, -16, 46, -8); ctx.quadraticCurveTo(34, -2, 50, 4); ctx.quadraticCurveTo(26, 10, 0, 3); ctx.closePath(); }, { lw: 1.2 });
      B(ctx, C.yellow, () => { ctx.moveTo(2, -1); ctx.quadraticCurveTo(16, -6, 28, -3); ctx.quadraticCurveTo(18, 2, 2, 2); ctx.closePath(); }, { stroke: false });
      ctx.restore();
    }
  },
  // Bánh chưng (vuông, lá dong, lạt tre)
  banhchung(k, o) {
    const { ctx } = k;
    B(ctx, '#3f7d3a', () => { ctx.moveTo(-30, -14); ctx.lineTo(30, -14); ctx.lineTo(30, 26); ctx.lineTo(-30, 26); ctx.closePath(); });
    B(ctx, '#5aa74a', () => { ctx.moveTo(-30, -14); ctx.lineTo(-16, -30); ctx.lineTo(44, -30); ctx.lineTo(30, -14); ctx.closePath(); });
    B(ctx, '#2f6a2c', () => { ctx.moveTo(30, -14); ctx.lineTo(44, -30); ctx.lineTo(44, 10); ctx.lineTo(30, 26); ctx.closePath(); });
    L(ctx, '#e8d9a8', 2.2, () => { ctx.moveTo(-10, 26); ctx.lineTo(-10, -14); ctx.lineTo(4, -30); ctx.moveTo(10, 26); ctx.lineTo(10, -14); ctx.lineTo(24, -30); ctx.moveTo(-30, 6); ctx.lineTo(30, 6); ctx.lineTo(44, -10); ctx.moveTo(-23, -22); ctx.lineTo(37, -22); });
  },
  // Mâm xôi (cơm nếp)
  xoi(k, o) {
    const { ctx } = k;
    B(ctx, '#b0703c', () => E(ctx, 0, 22, 46, 12));
    B(ctx, o.fill ?? '#fbf3e0', () => { ctx.moveTo(-36, 20); ctx.quadraticCurveTo(-30, -18, 0, -20); ctx.quadraticCurveTo(30, -18, 36, 20); ctx.closePath(); }, { shadeSide: 10 });
    for (let i = 0; i < 14; i++) B(ctx, '#e9dcc0', () => E(ctx, -22 + (i * 37) % 46, 10 - (i * 13) % 26, 1.6, 1.1), { stroke: false });
  },
  // Dãy núi nhiều lớp
  mountain(k, o) {
    const { ctx } = k; const g = o.fill ?? '#6f9a57';
    const peak = (x, h, w, c) => {
      B(ctx, c, () => { ctx.moveTo(x - w, 50); ctx.quadraticCurveTo(x - w * 0.35, 50 - h * 0.55, x - w * 0.12, 50 - h * 0.95); ctx.quadraticCurveTo(x, 50 - h * 1.04, x + w * 0.12, 50 - h * 0.95); ctx.quadraticCurveTo(x + w * 0.35, 50 - h * 0.55, x + w, 50); ctx.closePath(); });
      ctx.save(); ctx.beginPath(); ctx.moveTo(x, 50 - h); ctx.quadraticCurveTo(x + w * 0.35, 50 - h * 0.55, x + w, 50); ctx.lineTo(x, 50); ctx.closePath(); ctx.fillStyle = 'rgba(0,0,0,0.13)'; ctx.fill(); ctx.restore();
      if (o.snow) B(ctx, '#f4efe6', () => { ctx.moveTo(x - w * 0.16, 50 - h * 0.86); ctx.quadraticCurveTo(x, 50 - h * 1.04, x + w * 0.16, 50 - h * 0.86); ctx.lineTo(x + w * 0.05, 50 - h * 0.8); ctx.lineTo(x - w * 0.05, 50 - h * 0.86); ctx.closePath(); }, { lw: 1 });
    };
    peak(-24, 70, 34, shade(g, -0.2));
    peak(26, 80, 36, shade(g, -0.08));
    peak(0, 98, 40, g);
  },
  cloud(k, o) {
    const { ctx } = k; const c = o.fill ?? '#ffffff';
    B(ctx, c, () => { ctx.moveTo(-40, 14); ctx.arc(-26, 4, 14, Math.PI * 0.6, Math.PI * 1.55); ctx.arc(-4, -8, 20, Math.PI * 1.1, Math.PI * 1.95); ctx.arc(22, 0, 16, Math.PI * 1.35, Math.PI * 0.3); ctx.closePath(); });
    ctx.save(); ctx.globalAlpha *= 0.12; ctx.fillStyle = '#4b6f8f'; ctx.beginPath(); ctx.ellipse(-6, 12, 34, 5, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  },
  // Mây đen + mưa (o.rain = 0..1) + sét (o.bolt)
  storm(k, o) {
    const { ctx } = k; const t = k.gt ?? 0;
    if ((o.rain ?? 1) > 0) {
      ctx.save(); ctx.globalAlpha *= o.rain ?? 1;
      for (let i = 0; i < 16; i++) {
        const x = -36 + (i * 5.3) % 72, ph = ((t * 1.6 + i * 0.37) % 1);
        L(ctx, '#6fa8dc', 1.6, () => { ctx.moveTo(x - ph * 6, 14 + ph * 40); ctx.lineTo(x - ph * 6 - 3, 22 + ph * 40); });
      }
      ctx.restore();
    }
    if (o.bolt && Math.floor(t * 3) % 4 === 0) B(ctx, C.yellow, () => { ctx.moveTo(4, 10); ctx.lineTo(-6, 32); ctx.lineTo(2, 32); ctx.lineTo(-8, 56); ctx.lineTo(12, 26); ctx.lineTo(4, 26); ctx.lineTo(12, 10); ctx.closePath(); }, { lw: 1.2 });
    PROPS.cloud(k, { fill: o.fill ?? '#7d8794' });
  },
  // Cung điện nhà sàn mái cong hình thuyền (hoa văn trống đồng Đông Sơn)
  palace(k, o) {
    const { ctx } = k;
    for (const x of [-34, -18, 0, 18, 34]) B(ctx, '#7a4e2d', () => ctx.rect(x - 2.5, 14, 5, 36));
    B(ctx, '#c99a5b', () => ctx.rect(-42, 8, 84, 7));
    B(ctx, o.wall ?? '#e9c98f', () => ctx.rect(-34, -12, 68, 20), { shadeSide: 14 });
    B(ctx, '#6b3f22', () => ctx.rect(-6, -8, 12, 16));
    B(ctx, o.fill ?? '#b5482c', () => { ctx.moveTo(-60, -40); ctx.quadraticCurveTo(-40, -6, -36, -10); ctx.lineTo(36, -10); ctx.quadraticCurveTo(40, -6, 60, -40); ctx.quadraticCurveTo(30, -22, 0, -24); ctx.quadraticCurveTo(-30, -22, -60, -40); ctx.closePath(); });
    L(ctx, '#f6c344', 1.6, () => { ctx.moveTo(-44, -22); ctx.quadraticCurveTo(0, -12, 44, -22); });
    for (const sx of [-1, 1]) B(ctx, '#f6e7c1', () => { ctx.moveTo(sx * 58, -40); ctx.lineTo(sx * 64, -50); ctx.lineTo(sx * 60, -38); ctx.closePath(); }, { lw: 1 });
  },
  stilthouse(k, o) {
    const { ctx } = k;
    for (const x of [-24, 0, 24]) B(ctx, '#7a4e2d', () => ctx.rect(x - 2.5, 18, 5, 32));
    B(ctx, o.wall ?? '#d9b77a', () => ctx.rect(-30, -6, 60, 24), { shadeSide: 10 });
    B(ctx, '#6b3f22', () => ctx.rect(-6, 0, 12, 18));
    B(ctx, o.fill ?? '#a8763e', () => { ctx.moveTo(-46, -2); ctx.quadraticCurveTo(-30, -8, -22, -34); ctx.lineTo(22, -34); ctx.quadraticCurveTo(30, -8, 46, -2); ctx.closePath(); });
  },
  tree(k, o) {
    const { ctx } = k; const g = o.fill ?? '#5aa74a';
    B(ctx, '#7a4e2d', () => { ctx.moveTo(-5, 50); ctx.lineTo(-3, 0); ctx.lineTo(3, 0); ctx.lineTo(5, 50); ctx.closePath(); });
    B(ctx, g, () => { ctx.arc(-14, -6, 18, 0, Math.PI * 2); }, { stroke: true });
    B(ctx, g, () => { ctx.arc(14, -8, 18, 0, Math.PI * 2); });
    B(ctx, shade(g, 0.08), () => { ctx.arc(0, -24, 22, 0, Math.PI * 2); }, { shadeSide: 6 });
  },
  bamboo(k, o) {
    const { ctx } = k; const g = o.fill ?? '#6cbf5a';
    [[-18, -4], [0, 3], [18, 8]].forEach(([x, lean]) => {
      L(ctx, INK, 9, () => { ctx.moveTo(x, 50); ctx.quadraticCurveTo(x + lean * 0.4, 0, x + lean, -50); });
      L(ctx, g, 6, () => { ctx.moveTo(x, 50); ctx.quadraticCurveTo(x + lean * 0.4, 0, x + lean, -50); });
      for (let yy = 34; yy > -44; yy -= 16) L(ctx, shade(g, -0.35), 1.6, () => { const xx = x + lean * ((50 - yy) / 100) * 0.8; ctx.moveTo(xx - 3, yy); ctx.lineTo(xx + 3, yy); });
      for (const [dx, dy, a] of [[4, -46, -0.5], [-4, -38, 0.6], [5, -24, -0.4]]) {
        ctx.save(); ctx.translate(x + lean * 0.9 + dx, dy); ctx.rotate(a);
        B(ctx, o.leaf ?? '#4f9a3f', () => E(ctx, dx > 0 ? 9 : -9, 0, 10, 3), { lw: 1 });
        ctx.restore();
      }
    });
  },
  // Thuyền Đông Sơn đầu chim
  boat(k, o) {
    const { ctx } = k;
    B(ctx, o.fill ?? '#9c6b3f', () => { ctx.moveTo(-50, -10); ctx.quadraticCurveTo(-42, 16, 0, 16); ctx.quadraticCurveTo(42, 16, 50, -10); ctx.quadraticCurveTo(30, 2, 0, 2); ctx.quadraticCurveTo(-30, 2, -50, -10); ctx.closePath(); }, { shadeSide: 0 });
    B(ctx, '#9c6b3f', () => { ctx.moveTo(48, -8); ctx.quadraticCurveTo(56, -26, 50, -32); ctx.lineTo(60, -30); ctx.lineTo(52, -26); ctx.closePath(); });
    L(ctx, '#f6c344', 1.6, () => { ctx.moveTo(-40, 6); ctx.quadraticCurveTo(0, 12, 40, 6); });
  },
  // Đê: hình thang có cỏ phía trên (o.w = chiều rộng tương đối)
  dike(k, o) {
    const { ctx } = k; const w = o.w ?? 1;
    B(ctx, '#b08a5a', () => { ctx.moveTo(-50 * w, 30); ctx.lineTo(-30 * w, -10); ctx.lineTo(30 * w, -10); ctx.lineTo(50 * w, 30); ctx.closePath(); }, { shadeSide: 18 * w });
    B(ctx, '#7fb35f', () => { ctx.moveTo(-31 * w, -10); ctx.quadraticCurveTo(0, -18, 31 * w, -10); ctx.lineTo(29 * w, -6); ctx.lineTo(-29 * w, -6); ctx.closePath(); }, { lw: 1.2 });
    for (let i = -2; i <= 2; i++) L(ctx, 'rgba(90,60,30,0.35)', 1.2, () => { ctx.moveTo(i * 12 * w - 6, 6); ctx.lineTo(i * 12 * w + 6, 6); });
  },
  fish(k, o) {
    const { ctx } = k; const c = o.fill ?? '#f08a24';
    B(ctx, c, () => { ctx.moveTo(-30, 0); ctx.lineTo(-44, -14); ctx.lineTo(-42, 14); ctx.closePath(); });
    B(ctx, c, () => E(ctx, 0, 0, 30, 16), { shadeSide: 0 });
    L(ctx, shade(c, -0.3), 1.4, () => { ctx.moveTo(-6, -12); ctx.quadraticCurveTo(-2, 0, -6, 12); });
    eye(ctx, 16, -3, 3);
  },
  crab(k, o) {
    const { ctx } = k; const c = o.fill ?? '#e4572e';
    for (const sd of [-1, 1]) {
      for (let i = 0; i < 3; i++) L(ctx, INK, 2.6, () => { ctx.moveTo(sd * 18, 4 + i * 5); ctx.lineTo(sd * 34, 10 + i * 6); ctx.lineTo(sd * 38, 22 + i * 4); });
      L(ctx, INK, 3, () => { ctx.moveTo(sd * 16, -6); ctx.lineTo(sd * 30, -20); });
      B(ctx, c, () => { ctx.moveTo(sd * 30, -20); ctx.arc(sd * 32, -28, 9, Math.PI * 0.5, Math.PI * 2.2); ctx.closePath(); });
    }
    B(ctx, c, () => E(ctx, 0, 4, 24, 15), { shadeSide: 6 });
    for (const sd of [-1, 1]) { L(ctx, INK, 1.6, () => { ctx.moveTo(sd * 6, -9); ctx.lineTo(sd * 7, -18); }); eye(ctx, sd * 7, -20, 2.6); }
  },
  // Thuồng luồng / rồng nước
  serpent(k, o) {
    const { ctx } = k; const c = o.fill ?? '#3d8fd1'; const t = k.gt ?? 0;
    const pts = [];
    for (let i = 0; i <= 12; i++) pts.push([-50 + i * 8, 10 * Math.sin(i * 0.9 + t * 4)]);
    L(ctx, INK, 15, () => pts.forEach(([x, y], i) => ctx[i ? 'lineTo' : 'moveTo'](x, y)));
    L(ctx, c, 12, () => pts.forEach(([x, y], i) => ctx[i ? 'lineTo' : 'moveTo'](x, y)));
    L(ctx, shade(c, 0.35), 3, () => pts.forEach(([x, y], i) => ctx[i ? 'lineTo' : 'moveTo'](x, y + 3)));
    const [hx, hy] = pts[pts.length - 1];
    B(ctx, c, () => { ctx.moveTo(hx - 6, hy - 9); ctx.quadraticCurveTo(hx + 14, hy - 14, hx + 18, hy - 2); ctx.quadraticCurveTo(hx + 10, hy + 8, hx - 6, hy + 8); ctx.closePath(); });
    B(ctx, C.yellow, () => { ctx.moveTo(hx - 2, hy - 9); ctx.lineTo(hx - 8, hy - 20); ctx.lineTo(hx + 4, hy - 11); ctx.closePath(); }, { lw: 1 });
    eye(ctx, hx + 7, hy - 4, 2.2);
  },
  sun(k, o) {
    const { ctx } = k; const t = k.gt ?? 0;
    for (let i = 0; i < 12; i++) {
      ctx.save(); ctx.rotate((i / 12) * Math.PI * 2 + t * 0.2);
      B(ctx, '#f8b84e', () => { ctx.moveTo(-5, -30); ctx.lineTo(0, -46); ctx.lineTo(5, -30); ctx.closePath(); }, { lw: 1.1 });
      ctx.restore();
    }
    B(ctx, '#f6c344', () => ctx.arc(0, 0, 27, 0, Math.PI * 2), { shadeSide: 8 });
  },
  scroll(k, o) {
    const { ctx } = k;
    B(ctx, '#f6e7c1', () => ctx.rect(-30, -36, 60, 72), { shadeSide: 14 });
    for (let i = 0; i < 4; i++) L(ctx, '#b9a37a', 2, () => { ctx.moveTo(-18, -20 + i * 13); ctx.lineTo(18 - (i % 2) * 10, -20 + i * 13); });
    for (const yy of [-38, 38]) B(ctx, '#8a5a35', () => ctx.roundRect(-36, yy - 5, 72, 10, 5));
  },
  calendar(k, o) {
    const { ctx } = k;
    B(ctx, '#ffffff', () => ctx.roundRect(-30, -34, 60, 70, 6), { shadeSide: 16 });
    B(ctx, C.red, () => ctx.roundRect(-30, -34, 60, 18, 6));
    k.text(o.text ?? '7', 0, 10, { size: 30, font: 'title', color: INK });
    k.text(o.label ?? 'THÁNG', 0, -25, { size: 10, font: 'title', color: C.white });
  },
  phone(k, o) {
    const { ctx } = k;
    B(ctx, '#2f3542', () => ctx.roundRect(-20, -38, 40, 76, 8));
    B(ctx, '#e9f3ee', () => ctx.roundRect(-16, -32, 32, 62, 4), { lw: 1 });
    B(ctx, '#7ec8f0', () => ctx.roundRect(-13, -26, 24, 12, 4), { lw: 0.9 });
    B(ctx, '#ffffff', () => ctx.roundRect(-11, -10, 24, 12, 4), { lw: 0.9 });
  },
  drum(k, o) {
    const { ctx } = k; const br = o.fill ?? '#b5893c';
    B(ctx, br, () => { ctx.moveTo(-44, -14); ctx.quadraticCurveTo(-50, 18, -34, 40); ctx.lineTo(34, 40); ctx.quadraticCurveTo(50, 18, 44, -14); ctx.closePath(); }, { shadeSide: 14 });
    B(ctx, '#d9b066', () => E(ctx, 0, -14, 44, 12));
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; L(ctx, '#9a6d1e', 1.4, () => { ctx.moveTo(0, -14); ctx.lineTo(Math.cos(a) * 9, -14 + Math.sin(a) * 2.6); }); }
    L(ctx, '#9a6d1e', 1.2, () => E(ctx, 0, -14, 30, 8));
    for (const yy of [6, 22]) L(ctx, shade(br, -0.3), 1.2, () => { ctx.moveTo(-44, yy); ctx.quadraticCurveTo(0, yy + 6, 44, yy); });
  },
  // ---------- đêm, ma quỷ ----------
  moon(k, o) {
    const { ctx } = k;
    const g = ctx.createRadialGradient(0, 0, 20, 0, 0, 95);
    g.addColorStop(0, 'rgba(255,248,210,0.55)'); g.addColorStop(1, 'rgba(255,248,210,0)');
    ctx.fillStyle = g; ctx.fillRect(-100, -100, 200, 200);
    B(ctx, o.fill ?? '#fff3c4', () => ctx.arc(0, 0, 34, 0, Math.PI * 2), { lw: 1.2 });
    for (const [x, y, r] of [[-10, -8, 7], [12, 6, 5], [-4, 14, 4]]) B(ctx, '#efe0a8', () => ctx.arc(x, y, r, 0, Math.PI * 2), { stroke: false });
  },
  // Cây đa đầu làng: thân to, rễ phụ buông, tán rộng
  banyan(k, o) {
    const { ctx } = k; const g = o.fill ?? '#2f5a3a'; const t = k.gt ?? 0;
    B(ctx, '#5a3d2b', () => { ctx.moveTo(-14, 50); ctx.quadraticCurveTo(-10, 10, -22, -14); ctx.lineTo(22, -14); ctx.quadraticCurveTo(10, 10, 14, 50); ctx.closePath(); }, { shadeSide: 2 });
    for (let i = 0; i < 9; i++) { const x = -44 + i * 11; L(ctx, '#4a3324', 1.4, () => { ctx.moveTo(x, -8); ctx.quadraticCurveTo(x + 2 * Math.sin(t + i), 20, x + Math.sin(t * 0.8 + i) * 3, 30 + (i % 3) * 8); }); }
    for (const [x, y, r] of [[-30, -22, 22], [28, -24, 22], [0, -36, 28], [-14, -46, 18], [16, -48, 18]]) B(ctx, g, () => ctx.arc(x, y, r, 0, Math.PI * 2));
    B(ctx, shade(g, 0.1), () => ctx.arc(-4, -40, 14, 0, Math.PI * 2), { stroke: false });
  },
  well(k, o) {
    const { ctx } = k;
    B(ctx, '#3a4a5a', () => E(ctx, 0, 0, 40, 12));
    B(ctx, o.fill ?? '#9a8f86', () => { ctx.moveTo(-40, 0); ctx.lineTo(-40, 34); ctx.quadraticCurveTo(0, 48, 40, 34); ctx.lineTo(40, 0); ctx.quadraticCurveTo(0, 14, -40, 0); ctx.closePath(); }, { shadeSide: 14 });
    for (let i = 0; i < 4; i++) L(ctx, 'rgba(60,50,40,0.35)', 1.2, () => { ctx.moveTo(-40, 10 + i * 7); ctx.quadraticCurveTo(0, 22 + i * 7, 40, 10 + i * 7); });
    B(ctx, 'rgba(0,0,0,0)', () => E(ctx, 0, 0, 40, 12), { lw: 1.8 });
  },
  // Đèn dầu, ngọn lửa lay động
  lamp(k, o) {
    const { ctx } = k; const t = k.gt ?? 0;
    const g = ctx.createRadialGradient(0, -10, 2, 0, -10, 60);
    g.addColorStop(0, 'rgba(255,200,100,0.45)'); g.addColorStop(1, 'rgba(255,200,100,0)');
    ctx.fillStyle = g; ctx.fillRect(-60, -70, 120, 120);
    B(ctx, '#7a5a3a', () => { ctx.moveTo(-18, 40); ctx.lineTo(18, 40); ctx.lineTo(12, 22); ctx.lineTo(-12, 22); ctx.closePath(); });
    B(ctx, 'rgba(220,235,245,0.5)', () => { ctx.moveTo(-10, 22); ctx.quadraticCurveTo(-16, 0, -6, -18); ctx.lineTo(6, -18); ctx.quadraticCurveTo(16, 0, 10, 22); ctx.closePath(); }, { lw: 1.2 });
    const fl = 1 + 0.12 * Math.sin(t * 17) + 0.06 * Math.sin(t * 31);
    B(ctx, C.orange, () => { ctx.moveTo(0, 12); ctx.quadraticCurveTo(-6, 2, 0, -12 * fl); ctx.quadraticCurveTo(6, 2, 0, 12); ctx.closePath(); }, { stroke: false });
    B(ctx, C.yellow, () => { ctx.moveTo(0, 10); ctx.quadraticCurveTo(-3, 4, 0, -4 * fl); ctx.quadraticCurveTo(3, 4, 0, 10); ctx.closePath(); }, { stroke: false });
  },
  // Bát hương với nén nhang, khói uốn lượn
  incense(k, o) {
    const { ctx } = k; const t = k.gt ?? 0;
    for (const x of [-8, 0, 8]) {
      L(ctx, '#b5482c', 2, () => { ctx.moveTo(x, 18); ctx.lineTo(x * 1.3, -26); });
      B(ctx, C.orange, () => ctx.arc(x * 1.3, -27, 2, 0, Math.PI * 2), { stroke: false });
      ctx.save(); ctx.globalAlpha *= 0.35;
      L(ctx, '#d8dde3', 2, () => { ctx.moveTo(x * 1.3, -28); for (let i = 1; i < 12; i++) ctx.lineTo(x * 1.3 + Math.sin(t * 1.5 + i * 0.6 + x) * i * 1.2, -28 - i * 6); });
      ctx.restore();
    }
    B(ctx, o.fill ?? '#c9a24a', () => { ctx.moveTo(-26, 14); ctx.lineTo(26, 14); ctx.quadraticCurveTo(24, 40, 0, 40); ctx.quadraticCurveTo(-24, 40, -26, 14); ctx.closePath(); }, { shadeSide: 8 });
    B(ctx, '#e9dcc0', () => E(ctx, 0, 14, 26, 5));
  },
  // Người đã khuất nằm phủ khăn trắng trên chiếu; o.rise (0..1) bật dậy (quỷ nhập tràng)
  corpse(k, o) {
    const { ctx } = k; const r = Math.min(1, o.rise ?? 0);
    B(ctx, '#d9b77a', () => ctx.rect(-58, 18, 116, 10));
    for (let x = -54; x < 58; x += 8) L(ctx, 'rgba(120,80,40,0.35)', 1, () => { ctx.moveTo(x, 18); ctx.lineTo(x, 28); });
    B(ctx, '#f1f1ec', () => { ctx.moveTo(-6, 18); ctx.lineTo(48, 18); ctx.quadraticCurveTo(54, 6, 44, 4); ctx.lineTo(-6, 4); ctx.closePath(); });
    ctx.save(); ctx.translate(-6, 12); ctx.rotate(r * 1.35);
    B(ctx, '#f1f1ec', () => { ctx.moveTo(0, 6); ctx.lineTo(-40, 6); ctx.quadraticCurveTo(-60, 6, -58, -8); ctx.quadraticCurveTo(-56, -16, -40, -12); ctx.lineTo(0, -10); ctx.closePath(); });
    L(ctx, 'rgba(0,0,0,0.12)', 1.4, () => { ctx.moveTo(-20, -10); ctx.lineTo(-20, 6); });
    ctx.restore();
  },
  // Mèo đen; o.jump (0..1) nhảy vòng cung
  cat(k, o) {
    const { ctx } = k; const j = o.jump ?? 0; const t = k.gt ?? 0;
    ctx.save(); ctx.translate(0, -Math.sin(Math.PI * Math.min(1, j)) * 40);
    const c = o.fill ?? '#22252b';
    L(ctx, c, 6, () => { ctx.moveTo(-18, 30); ctx.quadraticCurveTo(-40, 26 + Math.sin(t * 3) * 6, -36, 0); });
    B(ctx, c, () => E(ctx, -2, 24, 22, 18));
    B(ctx, c, () => ctx.arc(14, 2, 14, 0, Math.PI * 2));
    for (const sx of [4, 22]) B(ctx, c, () => { ctx.moveTo(sx - 6, -6); ctx.lineTo(sx, -20); ctx.lineTo(sx + 6, -6); ctx.closePath(); });
    k.glowEyes(14 + 0.0001, 0, 0.32, '#c6f25a');
    ctx.restore();
  },
  // Hổ nhìn ngang
  tiger(k, o) {
    const { ctx } = k; const c = o.fill ?? '#e8892f'; const t = k.gt ?? 0;
    L(ctx, INK, 8, () => { ctx.moveTo(-40, -4); ctx.quadraticCurveTo(-60, -10 + Math.sin(t * 2) * 6, -58, -30); });
    L(ctx, c, 5, () => { ctx.moveTo(-40, -4); ctx.quadraticCurveTo(-60, -10 + Math.sin(t * 2) * 6, -58, -30); });
    for (const x of [-30, 14]) B(ctx, shade(c, -0.15), () => ctx.roundRect(x - 5, 6, 10, 40, 4));
    B(ctx, c, () => E(ctx, -6, 0, 38, 20), { shadeSide: 6 });
    for (let i = 0; i < 5; i++) L(ctx, INK, 3, () => { ctx.moveTo(-30 + i * 12, -18); ctx.quadraticCurveTo(-26 + i * 12, -6, -30 + i * 12, 2); });
    for (const x of [-22, 22]) B(ctx, c, () => ctx.roundRect(x - 5, 8, 10, 40, 4));
    B(ctx, c, () => ctx.arc(36, -12, 18, 0, Math.PI * 2));
    for (const sx of [26, 46]) B(ctx, c, () => ctx.arc(sx, -28, 6, 0, Math.PI * 2));
    B(ctx, '#fff3e0', () => E(ctx, 44, -4, 10, 7), { lw: 1.2 });
    L(ctx, INK, 2, () => { ctx.moveTo(30, -26); ctx.lineTo(34, -18); ctx.moveTo(40, -26); ctx.lineTo(38, -18); });
    k.glowEyes(38, -15, 0.28, '#f6d24a');
    B(ctx, INK, () => E(ctx, 50, -6, 2.4, 1.8), { stroke: false });
  },
  // Đầu ma lai bay, tóc xoã, vệt lân tinh phía sau
  malai(k, o) {
    const { ctx } = k; const t = k.gt ?? 0;
    if (o.guts) {
      // ruột kiểu hoạt hình: ống hồng uốn lượn + dạ dày, tim nhỏ — đủ hài, không ghê
      const pts = []; for (let i = 0; i <= 16; i++) { const u = i / 16; pts.push([-4 - u * 70 + Math.sin(t * 3 + u * 9) * 8, 18 + u * 40 + Math.sin(t * 4 - u * 7) * (4 + u * 10)]); }
      L(ctx, INK, 9.5, () => { ctx.moveTo(...pts[0]); pts.forEach((q) => ctx.lineTo(...q)); });
      L(ctx, '#f19aa6', 6.5, () => { ctx.moveTo(...pts[0]); pts.forEach((q) => ctx.lineTo(...q)); });
      const m = pts[7], e = pts[16];
      B(ctx, '#e77f8c', () => E(ctx, m[0], m[1] + 6, 10, 7, 0.4), { lw: 1.2 });
      B(ctx, '#d94a5a', () => { const [x, y] = [e[0], e[1] + 4]; ctx.moveTo(x, y + 7); ctx.bezierCurveTo(x - 10, y, x - 6, y - 8, x, y - 3); ctx.bezierCurveTo(x + 6, y - 8, x + 10, y, x, y + 7); ctx.closePath(); }, { lw: 1.2 });
    }
    ctx.save(); ctx.globalAlpha *= o.guts ? 0.45 : 0.85;
    for (let i = 0; i < 14; i++) {
      const u = i / 14;
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 12 - u * 6);
      const x = -20 - i * 9, y = 18 + Math.sin(t * 4 - i * 0.6) * (4 + i * 1.2);
      ctx.save(); ctx.translate(x, y);
      g.addColorStop(0, `rgba(190,255,200,${0.8 - u * 0.5})`); g.addColorStop(1, 'rgba(120,255,160,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 12 - u * 6, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    ctx.restore();
    B(ctx, '#151515', () => { ctx.moveTo(-16, -14); ctx.quadraticCurveTo(-46, -6 + Math.sin(t * 5) * 6, -60, 6 + Math.sin(t * 5) * 8); ctx.quadraticCurveTo(-36, 6, -14, 14); ctx.closePath(); });
    B(ctx, '#e3ebe6', () => E(ctx, 0, 0, 18, 20));
    B(ctx, '#151515', () => { ctx.moveTo(-18, -2); ctx.bezierCurveTo(-20, -26, 20, -26, 18, -2); ctx.lineTo(12, 6); ctx.lineTo(6, -6); ctx.lineTo(-2, 4); ctx.lineTo(-8, -6); ctx.lineTo(-14, 6); ctx.closePath(); });
    if (o.cute) { eye(ctx, -6, 4, 2.6); eye(ctx, 7, 4, 2.6); } else k.glowEyes(0, 4, 0.22, '#ff4d4d');
    const op = o.talk ? Math.max(0, Math.sin(t * 14)) * 4 : 0;
    if (op > 0.3) B(ctx, '#7a2a22', () => E(ctx, 0, 13, 4, op * 0.8), { lw: 1 });
    else L(ctx, '#7a2a22', 1.6, () => { ctx.moveTo(-5, 13); ctx.quadraticCurveTo(0, 15, 5, 13); });
  },
  // Đôi tay ma da nhô lên khỏi mặt nước (o.reach 0..1)
  hands(k, o) {
    const { ctx } = k; const t = k.gt ?? 0; const r = o.reach ?? 1;
    for (const [x, a] of [[-16, -0.15], [16, 0.12]]) {
      ctx.save(); ctx.translate(x, 50); ctx.rotate(a + Math.sin(t * 2 + x) * 0.08);
      const h = 60 * r;
      B(ctx, '#c7d6d0', () => ctx.roundRect(-6, -h, 12, h + 10, 6));
      for (let f = 0; f < 4; f++) B(ctx, '#c7d6d0', () => ctx.roundRect(-7 + f * 4, -h - 12 + Math.abs(f - 1.5) * 2, 3.4, 14, 2), { lw: 1 });
      ctx.restore();
    }
  },
  cctv(k, o) {
    const { ctx } = k; const t = k.gt ?? 0;
    B(ctx, '#7d858f', () => ctx.rect(-40, -30, 10, 30));
    L(ctx, INK, 4, () => { ctx.moveTo(-30, -16); ctx.lineTo(-12, -16); });
    B(ctx, '#e9edf0', () => ctx.roundRect(-14, -30, 46, 26, 6), { shadeSide: 12 });
    B(ctx, '#2f3542', () => ctx.arc(32, -17, 9, 0, Math.PI * 2));
    B(ctx, Math.floor(t * 2) % 2 ? C.red : '#5a1a14', () => ctx.arc(-4, -22, 3, 0, Math.PI * 2), { stroke: false });
  },
  heart(k, o) {
    const { ctx } = k;
    B(ctx, o.fill ?? '#e4572e', () => { ctx.moveTo(0, 30); ctx.bezierCurveTo(-50, 0, -30, -40, 0, -16); ctx.bezierCurveTo(30, -40, 50, 0, 0, 30); ctx.closePath(); }, { shadeSide: 8 });
  },
  // ---------- Con Rồng Cháu Tiên ----------
  // Rồng Việt thân uốn lượn, vây lửa trên lưng, đầu bên phải; o.fill, o.speed (tốc độ uốn)
  dragon(k, o) {
    const { ctx } = k; const c = o.fill ?? '#3aa07a'; const t = (k.gt ?? 0) * (o.speed ?? 1);
    const N = 22, pts = [];
    for (let i = 0; i <= N; i++) { const u = i / N; pts.push([-58 + u * 88, 13 * Math.sin(u * Math.PI * 2.3 - t * 2.6) * (0.5 + 0.5 * u) - u * 6]); }
    const nrm = (i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(N, i + 1)]; const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [dy / l, -dx / l]; };
    const wid = (i) => 3 + 11 * Math.min(1, (i / N) * 1.4);
    // chân
    for (const i of [7, 15]) {
      const [x, y] = pts[i];
      L(ctx, INK, 6.5, () => { ctx.moveTo(x, y); ctx.lineTo(x + 4, y + 14); ctx.lineTo(x + 9, y + 16); });
      L(ctx, shade(c, -0.15), 4, () => { ctx.moveTo(x, y); ctx.lineTo(x + 4, y + 14); ctx.lineTo(x + 9, y + 16); });
      for (const d of [-3, 0, 3]) L(ctx, INK, 1.4, () => { ctx.moveTo(x + 9, y + 16); ctx.lineTo(x + 13, y + 15 + d); });
    }
    // vây lửa trên lưng
    for (let i = 2; i < N - 1; i += 2) {
      const [x, y] = pts[i]; const [nx, ny] = nrm(i); const w = wid(i) / 2; const h = 5 + (i / N) * 6;
      B(ctx, o.crest ?? '#e4572e', () => { ctx.moveTo(x + nx * w - 3, y + ny * w); ctx.lineTo(x + nx * (w + h) + 2, y + ny * (w + h)); ctx.lineTo(x + nx * w + 3, y + ny * w); ctx.closePath(); }, { lw: 1 });
    }
    // thân: viền rồi tô, thon dần về đuôi
    for (const [col, extra] of [[INK, 3.2], [c, 0]]) for (let i = 0; i < N; i++) L(ctx, col, wid(i) + extra, () => { ctx.moveTo(...pts[i]); ctx.lineTo(...pts[i + 1]); });
    L(ctx, '#f6e7a8', 2.6, () => pts.slice(4).forEach(([x, y], i) => ctx[i ? 'lineTo' : 'moveTo'](x, y + 3)));
    // đầu
    const [hx, hy] = pts[N];
    for (const [col, w] of [[INK, 4.6], ['#f6c344', 2.6]]) L(ctx, col, w, () => { ctx.moveTo(hx - 2, hy - 8); ctx.quadraticCurveTo(hx - 6, hy - 18, hx - 14, hy - 19); });
    for (let j = 0; j < 3; j++) B(ctx, o.crest ?? '#e4572e', () => { ctx.moveTo(hx - 6, hy - 6 + j * 5); ctx.lineTo(hx - 20 - j * 3, hy - 10 + j * 8); ctx.lineTo(hx - 6, hy + j * 5); ctx.closePath(); }, { lw: 1 });
    B(ctx, c, () => E(ctx, hx + 2, hy - 2, 13, 10));
    B(ctx, c, () => ctx.roundRect(hx + 6, hy - 9, 22, 9, 4));
    B(ctx, '#b5482c', () => { ctx.moveTo(hx + 6, hy + 1); ctx.lineTo(hx + 26, hy + 1); ctx.lineTo(hx + 22, hy + 8); ctx.lineTo(hx + 6, hy + 6); ctx.closePath(); }, { lw: 1.2 });
    B(ctx, shade(c, -0.1), () => { ctx.moveTo(hx + 2, hy + 5); ctx.quadraticCurveTo(hx + 14, hy + 12, hx + 24, hy + 9); ctx.lineTo(hx + 22, hy + 12); ctx.quadraticCurveTo(hx + 10, hy + 14, hx + 1, hy + 9); ctx.closePath(); }, { lw: 1.2 });
    for (const [a, b2] of [[-16, -6], [10, 2]]) L(ctx, INK, 1.4, () => { ctx.moveTo(hx + 27, hy - 6); ctx.quadraticCurveTo(hx + 36, hy + a * 0.6 + Math.sin(t * 3) * 3, hx + 42, hy + a + b2); });
    eye(ctx, hx + 8, hy - 5, 2.6);
  },
  // Thuồng luồng: thủy quái mình rắn khổng lồ, sừng ngắn, râu dài; o.open 0..1 (há miệng), o.glow (mắt phát sáng), o.speed
  thuongluong(k, o) {
    const { ctx } = k; const c = o.fill ?? '#2f6f6a'; const t = (k.gt ?? 0) * (o.speed ?? 1); const op = o.open ?? 0.3;
    const N = 30, pts = [];
    for (let i = 0; i <= N; i++) { const u = i / N; pts.push([-62 + u * 92, 16 * Math.sin(u * Math.PI * 3 - t * 2.2) * (0.35 + 0.65 * (1 - u * 0.7)) - u * 10]); }
    const nrm = (i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(N, i + 1)]; const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [dy / l, -dx / l]; };
    const wid = (i) => 2.5 + 14 * Math.min(1, (i / N) * 1.6);
    // vây lưng sẫm
    for (let i = 3; i < N - 2; i += 2) {
      const [x, y] = pts[i]; const [nx, ny] = nrm(i); const w = wid(i) / 2; const h = 4 + (i / N) * 7;
      B(ctx, o.crest ?? '#1d3f45', () => { ctx.moveTo(x + nx * w - 3, y + ny * w); ctx.lineTo(x + nx * (w + h) + 3, y + ny * (w + h)); ctx.lineTo(x + nx * w + 3, y + ny * w); ctx.closePath(); }, { lw: 1 });
    }
    for (const [col, extra] of [[INK, 3.2], [c, 0]]) for (let i = 0; i < N; i++) L(ctx, col, wid(i) + extra, () => { ctx.moveTo(...pts[i]); ctx.lineTo(...pts[i + 1]); });
    // bụng nhạt + vảy
    L(ctx, '#cfe3c8', 3, () => pts.slice(5).forEach(([x, y], i) => { const [nx, ny] = nrm(i + 5); const w = wid(i + 5) * 0.28; ctx[i ? 'lineTo' : 'moveTo'](x - nx * w, y - ny * w); }));
    for (let i = 6; i < N - 1; i += 2) { const [x, y] = pts[i]; L(ctx, shade(c, -0.35), 1.2, () => { ctx.arc(x, y - 1, wid(i) * 0.22, Math.PI * 1.1, Math.PI * 1.9); }); }
    // đầu
    const [hx, hy] = pts[N];
    for (const sd of [-1, 1]) for (const [col, w] of [[INK, 4.4], ['#d9c27a', 2.4]]) L(ctx, col, w, () => { ctx.moveTo(hx - 2 + sd * 2, hy - 9); ctx.lineTo(hx - 8 + sd * 3, hy - 21); });
    B(ctx, c, () => E(ctx, hx + 2, hy - 2, 14, 11), { shadeSide: 6 });
    B(ctx, c, () => { ctx.moveTo(hx + 4, hy - 10); ctx.quadraticCurveTo(hx + 22, hy - 12, hx + 31, hy - 4 - op * 4); ctx.lineTo(hx + 8, hy); ctx.closePath(); });
    B(ctx, '#7a1f1a', () => { ctx.moveTo(hx + 31, hy - 4 - op * 4); ctx.lineTo(hx + 8, hy); ctx.lineTo(hx + 29, hy + 2 + op * 9); ctx.closePath(); }, { lw: 1.1 });
    B(ctx, shade(c, -0.1), () => { ctx.moveTo(hx + 8, hy); ctx.lineTo(hx + 29, hy + 2 + op * 9); ctx.quadraticCurveTo(hx + 16, hy + 12 + op * 4, hx + 2, hy + 7); ctx.closePath(); }, { lw: 1.2 });
    for (let i = 0; i < 3; i++) B(ctx, '#fffaf0', () => { const x = hx + 15 + i * 5; const y = hy - 2.5 - op * (i + 1) * 1.1; ctx.moveTo(x, y); ctx.lineTo(x + 2, y + 4); ctx.lineTo(x + 4, y); ctx.closePath(); }, { lw: 0.7 });
    for (const [a, b2] of [[-10, -2], [9, 3]]) L(ctx, INK, 2, () => { ctx.moveTo(hx + 24, hy - 4); ctx.quadraticCurveTo(hx + 32, hy + a * 0.5 + Math.sin(t * 3 + a) * 2, hx + 37, hy + a + b2); });
    if (o.glow) k.glowEyes(hx + 6, hy - 6, 0.16, o.glow === true ? '#d6ff5a' : o.glow);
    else eye(ctx, hx + 7, hy - 5, 2.4);
  },
  // Cá sấu nhìn ngang; o.open 0..1 (há mõm)
  crocodile(k, o) {
    const { ctx } = k; const c = o.fill ?? '#5d7d3a'; const t = k.gt ?? 0; const op = o.open ?? 0;
    const tw = Math.sin(t * 2.5) * 4;
    B(ctx, c, () => { ctx.moveTo(-58, 2 + tw); ctx.quadraticCurveTo(-36, -6, -14, -12); ctx.lineTo(-14, 10); ctx.quadraticCurveTo(-36, 10, -58, 2 + tw); ctx.closePath(); });
    for (const x of [-14, 18]) for (const d of [-4, 4]) L(ctx, d < 0 ? shade(c, -0.25) : c, 6, () => { ctx.moveTo(x + d, 6); ctx.lineTo(x + d - 3, 18); ctx.lineTo(x + d + 3, 20); });
    B(ctx, c, () => { ctx.moveTo(-20, -8); ctx.quadraticCurveTo(4, -22, 28, -10); ctx.quadraticCurveTo(34, 0, 28, 10); ctx.quadraticCurveTo(4, 17, -20, 10); ctx.quadraticCurveTo(-26, 1, -20, -8); ctx.closePath(); }, { shadeSide: 6 });
    B(ctx, '#d9d6a0', () => { ctx.moveTo(-18, 6); ctx.quadraticCurveTo(4, 14, 28, 8); ctx.lineTo(28, 10); ctx.quadraticCurveTo(4, 16, -18, 10); ctx.closePath(); }, { stroke: false });
    for (let i = 0; i < 9; i++) B(ctx, shade(c, -0.2), () => { const x = -46 + i * 8.5; const y = i < 4 ? -4 - i * 2 : -14 - (i % 2); ctx.moveTo(x - 3, y + 2); ctx.lineTo(x, y - 4); ctx.lineTo(x + 3, y + 2); ctx.closePath(); }, { lw: 0.9 });
    // đầu + mõm
    ctx.save(); ctx.translate(26, -2);
    B(ctx, shade(c, -0.08), () => { ctx.moveTo(0, 2); ctx.lineTo(30, 4 + op * 4); ctx.quadraticCurveTo(32, 8 + op * 6, 28, 9 + op * 7); ctx.lineTo(0, 10); ctx.closePath(); });
    ctx.save(); ctx.rotate(-op * 0.45);
    B(ctx, c, () => { ctx.moveTo(-4, -10); ctx.quadraticCurveTo(6, -14, 10, -9); ctx.lineTo(32, -2); ctx.quadraticCurveTo(35, 2, 30, 4); ctx.lineTo(0, 4); ctx.closePath(); });
    for (let i = 0; i < 5; i++) B(ctx, '#fffaf0', () => { const x = 8 + i * 4.6; ctx.moveTo(x, 4); ctx.lineTo(x + 1.6, 8); ctx.lineTo(x + 3.2, 4); ctx.closePath(); }, { lw: 0.6 });
    B(ctx, '#f6c344', () => E(ctx, 6, -10, 4, 3.4), { lw: 1 });
    B(ctx, INK, () => E(ctx, 6.5, -10, 1, 2.6), { stroke: false });
    ctx.restore(); ctx.restore();
  },
  // Trăn cuộn, đầu ngóc lên; o.fill
  python(k, o) {
    const { ctx } = k; const c = o.fill ?? '#b08a4a'; const t = k.gt ?? 0;
    for (const [rx, ry, y] of [[46, 14, 34], [38, 12, 20], [28, 10, 8]]) {
      for (const [col, w] of [[INK, 15], [c, 12]]) L(ctx, col, w, () => E(ctx, 0, y, rx, ry));
      for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; B(ctx, shade(c, -0.35), () => E(ctx, Math.cos(a) * rx, y + Math.sin(a) * ry, 3.4, 2.2, a), { stroke: false }); }
    }
    const sw = Math.sin(t * 2) * 4;
    const neck = [[18, 6], [22, -12], [14 + sw, -30], [22 + sw, -42]];
    for (const [col, w] of [[INK, 13], [c, 10]]) L(ctx, col, w, () => { ctx.moveTo(...neck[0]); ctx.bezierCurveTo(...neck[1], ...neck[2], ...neck[3]); });
    const [hx, hy] = neck[3];
    B(ctx, c, () => { ctx.moveTo(hx - 6, hy + 2); ctx.quadraticCurveTo(hx - 4, hy - 9, hx + 8, hy - 7); ctx.quadraticCurveTo(hx + 18, hy - 4, hx + 16, hy + 1); ctx.quadraticCurveTo(hx + 6, hy + 6, hx - 6, hy + 2); ctx.closePath(); });
    eye(ctx, hx + 6, hy - 3, 1.8);
    if (Math.sin(t * 5) > 0.3) L(ctx, '#c0392b', 1.4, () => { ctx.moveTo(hx + 16, hy); ctx.lineTo(hx + 24, hy + 1); ctx.lineTo(hx + 27, hy - 2); ctx.moveTo(hx + 24, hy + 1); ctx.lineTo(hx + 27, hy + 3); });
  },
  // Xoáy nước nhìn nghiêng (elip dẹt), tự xoay; o.fill
  whirlpool(k, o) {
    const { ctx } = k; const c = o.fill ?? '#3b78b5'; const t = (k.gt ?? 0) * (o.speed ?? 1);
    B(ctx, shade(c, -0.15), () => E(ctx, 0, 0, 50, 16), { lw: 1.2 });
    for (let j = 0; j < 4; j++) L(ctx, j % 2 ? '#d6ecfa' : shade(c, -0.4), 2, () => {
      for (let i = 0; i <= 40; i++) { const u = i / 40; const a = u * Math.PI * 4 + t * 3 + j * 1.6; const r = 48 * (1 - u * 0.92); ctx[i ? 'lineTo' : 'moveTo'](Math.cos(a) * r, Math.sin(a) * r * 0.32); }
    });
    B(ctx, shade(c, -0.55), () => E(ctx, 0, 1, 6, 2.4), { stroke: false });
  },
  // Trứng; o.crack 0..1 (nứt), o.hatch 0..1 (nắp vỏ bật lên)
  egg(k, o) {
    const { ctx } = k; const cr = o.crack ?? 0; const h = Math.min(1, o.hatch ?? 0);
    const c = o.fill ?? '#fff3dc';
    B(ctx, c, () => { ctx.moveTo(-30, 8); ctx.bezierCurveTo(-30, 34, -16, 50, 0, 50); ctx.bezierCurveTo(16, 50, 30, 34, 30, 8); ctx.lineTo(30, 6); ctx.lineTo(-30, 6); ctx.closePath(); }, { shadeSide: 10 });
    ctx.save(); ctx.translate(-20 * h, -40 * h); ctx.rotate(-0.9 * h); ctx.globalAlpha *= 1 - h * 0.3;
    B(ctx, c, () => { ctx.moveTo(-30, 8); ctx.bezierCurveTo(-32, -24, -16, -38, 0, -38); ctx.bezierCurveTo(16, -38, 32, -24, 30, 8); ctx.closePath(); }, { shadeSide: 10 });
    ctx.restore();
    if (cr > 0) L(ctx, INK, 1.6, () => { const n = Math.ceil(cr * 6); ctx.moveTo(-30, 6); for (let i = 1; i <= n; i++) ctx.lineTo(-30 + i * 10, 6 + (i % 2 ? -7 : 3)); });
    if (o.spots !== false) for (const [x, y, r] of [[-12, 26, 3], [10, 34, 2.4], [14, -14, 2.6]]) if (h < 0.5 || y > 6) B(ctx, shade(c, -0.12), () => ctx.arc(x, y, r, 0, Math.PI * 2), { stroke: false });
  },
  // Bọc trăm trứng: túi hồng trong mờ, thấy trứng bên trong; o.glow 0..1
  eggsac(k, o) {
    const { ctx } = k; const t = k.gt ?? 0; const g = o.glow ?? 0;
    if (g > 0) { const gr = ctx.createRadialGradient(0, 6, 10, 0, 6, 80); gr.addColorStop(0, `rgba(255,230,150,${0.6 * g})`); gr.addColorStop(1, 'rgba(255,230,150,0)'); ctx.fillStyle = gr; ctx.fillRect(-90, -80, 180, 180); }
    const sw = 1 + Math.sin(t * 2.4) * 0.015;
    ctx.save(); ctx.scale(sw, 1 / sw);
    B(ctx, '#f4b6a6', () => { ctx.moveTo(-6, -34); ctx.bezierCurveTo(-56, -26, -54, 50, 0, 50); ctx.bezierCurveTo(54, 50, 56, -26, 6, -34); ctx.closePath(); });
    for (let i = 0; i < 19; i++) {
      const row = i < 4 ? 0 : i < 9 ? 1 : i < 14 ? 2 : 3; const inRow = [4, 5, 5, 5][row]; const j = i - [0, 4, 9, 14][row];
      const x = (j - (inRow - 1) / 2) * 15, y = -10 + row * 14;
      B(ctx, '#fff3dc', () => E(ctx, x, y, 6, 7.5), { lw: 1 });
    }
    B(ctx, 'rgba(255,190,175,0.35)', () => { ctx.moveTo(-6, -34); ctx.bezierCurveTo(-56, -26, -54, 50, 0, 50); ctx.bezierCurveTo(54, 50, 56, -26, 6, -34); ctx.closePath(); }, { stroke: false });
    B(ctx, '#e88f7c', () => { ctx.moveTo(-8, -32); ctx.lineTo(-4, -46); ctx.lineTo(0, -38); ctx.lineTo(4, -46); ctx.lineTo(8, -32); ctx.closePath(); }, { lw: 1.2 });
    L(ctx, 'rgba(255,255,255,0.7)', 3, () => { ctx.moveTo(-34, -6); ctx.quadraticCurveTo(-36, 14, -26, 30); });
    ctx.restore();
  },
  // Chim Lạc mỏ dài nhìn ngang; o.fly = vỗ cánh, o.fill
  lacbird(k, o) {
    const { ctx } = k; const c = o.fill ?? '#efe6cf'; const t = k.gt ?? 0;
    const fl = o.fly ? Math.sin(t * 7 + (o.phase ?? 0)) : 0.3;
    for (const [dy, a] of [[0, 0.25], [4, 0.45], [8, 0.65]]) L(ctx, INK, 3, () => { ctx.moveTo(-26, 4 + dy * 0.3); ctx.lineTo(-52, 4 + dy + a * 10); });
    B(ctx, c, () => E(ctx, -6, 4, 24, 11), { shadeSide: 2 });
    B(ctx, shade(c, -0.12), () => { ctx.moveTo(-14, 0); ctx.quadraticCurveTo(-4, -26 * fl - 6, 10, -34 * fl - 8); ctx.quadraticCurveTo(8, -6, 6, 2); ctx.closePath(); }, { lw: 1.3 });
    L(ctx, INK, 6.5, () => { ctx.moveTo(14, -2); ctx.quadraticCurveTo(22, -14, 22, -24); });
    L(ctx, c, 4, () => { ctx.moveTo(14, -2); ctx.quadraticCurveTo(22, -14, 22, -24); });
    B(ctx, c, () => ctx.arc(23, -27, 6, 0, Math.PI * 2), { lw: 1.3 });
    B(ctx, o.beak ?? '#c98a3a', () => { ctx.moveTo(27, -29); ctx.lineTo(56, -22); ctx.lineTo(27, -24); ctx.closePath(); }, { lw: 1.2 });
    for (const a of [-0.6, -0.3]) L(ctx, INK, 1.6, () => { ctx.moveTo(20, -31); ctx.lineTo(20 + Math.cos(a + Math.PI) * 12, -31 + Math.sin(a + Math.PI) * 12 - 4); });
    eye(ctx, 24, -28, 1.6);
    if (!o.fly) for (const x of [-10, 0]) L(ctx, INK, 2, () => { ctx.moveTo(x, 14); ctx.lineTo(x + 2, 46); ctx.lineTo(x + 8, 48); });
  },
  // Cáo chín đuôi ngồi nhìn ngang; o.tails (mặc định 9), o.angry = mắt đỏ phát sáng
  fox(k, o) {
    const { ctx } = k; const c = o.fill ?? '#e8892f'; const t = k.gt ?? 0; const n = o.tails ?? 9;
    for (let i = 0; i < n; i++) {
      const a = -2.6 + (i / Math.max(1, n - 1)) * 1.7 + Math.sin(t * 2 + i) * 0.06;
      ctx.save(); ctx.translate(-14, 30); ctx.rotate(a);
      B(ctx, c, () => { ctx.moveTo(0, -5); ctx.quadraticCurveTo(26, -14, 46, -4); ctx.quadraticCurveTo(52, 0, 46, 4); ctx.quadraticCurveTo(26, 12, 0, 5); ctx.closePath(); }, { lw: 1.2 });
      B(ctx, '#fff6e8', () => { ctx.moveTo(38, -5); ctx.quadraticCurveTo(52, 0, 38, 5); ctx.quadraticCurveTo(42, 0, 38, -5); ctx.closePath(); }, { stroke: false });
      ctx.restore();
    }
    B(ctx, c, () => { ctx.moveTo(-18, 48); ctx.quadraticCurveTo(-24, 8, 4, -6); ctx.quadraticCurveTo(20, 10, 16, 48); ctx.closePath(); }, { shadeSide: 6 });
    B(ctx, '#fff6e8', () => { ctx.moveTo(2, 0); ctx.quadraticCurveTo(14, 16, 10, 40); ctx.quadraticCurveTo(0, 30, 2, 0); ctx.closePath(); }, { stroke: false });
    for (const x of [-2, 10]) B(ctx, shade(c, -0.15), () => ctx.roundRect(x - 4, 36, 8, 14, 3));
    B(ctx, c, () => { ctx.moveTo(-8, -14); ctx.quadraticCurveTo(-2, -32, 14, -26); ctx.lineTo(34, -14); ctx.quadraticCurveTo(20, -4, 4, -2); ctx.quadraticCurveTo(-8, -4, -8, -14); ctx.closePath(); });
    for (const x of [-4, 8]) B(ctx, c, () => { ctx.moveTo(x - 5, -24); ctx.lineTo(x, -42); ctx.lineTo(x + 6, -24); ctx.closePath(); }, { lw: 1.2 });
    B(ctx, INK, () => ctx.arc(34, -14, 2.4, 0, Math.PI * 2), { stroke: false });
    if (o.angry) k.glowEyes(10, -18, 0.2, '#ff4d4d'); else eye(ctx, 10, -18, 2.2);
  },
  // Ngư Tinh: cá khổng lồ hung dữ, há miệng nhe răng; o.open 0..1
  ngutinh(k, o) {
    const { ctx } = k; const c = o.fill ?? '#5b6f8a'; const t = k.gt ?? 0; const op = o.open ?? 0.6;
    const tw = Math.sin(t * 3) * 0.12;
    ctx.save(); ctx.translate(-36, 0); ctx.rotate(tw);
    B(ctx, shade(c, -0.1), () => { ctx.moveTo(0, 0); ctx.lineTo(-22, -24); ctx.quadraticCurveTo(-14, 0, -22, 24); ctx.closePath(); });
    ctx.restore();
    for (let i = 0; i < 5; i++) B(ctx, '#b5482c', () => { const x = -24 + i * 10; ctx.moveTo(x, -18); ctx.lineTo(x + 4, -34 + (i % 2) * 4); ctx.lineTo(x + 9, -18); ctx.closePath(); }, { lw: 1.1 });
    B(ctx, c, () => { ctx.moveTo(-38, 0); ctx.quadraticCurveTo(-30, -26, 6, -24); ctx.quadraticCurveTo(34, -22, 42, -4 - op * 6); ctx.lineTo(16, 0); ctx.lineTo(42, 4 + op * 10); ctx.quadraticCurveTo(30, 26, 0, 24); ctx.quadraticCurveTo(-30, 22, -38, 0); ctx.closePath(); }, { shadeSide: 4 });
    B(ctx, '#7a1f1a', () => { ctx.moveTo(42, -4 - op * 6); ctx.lineTo(16, 0); ctx.lineTo(42, 4 + op * 10); ctx.closePath(); }, { lw: 1.2 });
    for (let i = 0; i < 3; i++) {
      B(ctx, '#fffaf0', () => { const x = 22 + i * 6.5; const y = -2 - op * (i + 1) * 1.6; ctx.moveTo(x, y); ctx.lineTo(x + 2.5, y + 5); ctx.lineTo(x + 5, y + 0.5); ctx.closePath(); }, { lw: 0.8 });
      B(ctx, '#fffaf0', () => { const x = 22 + i * 6.5; const y = 2 + op * (i + 1) * 2.6; ctx.moveTo(x, y); ctx.lineTo(x + 2.5, y - 5); ctx.lineTo(x + 5, y - 0.5); ctx.closePath(); }, { lw: 0.8 });
    }
    B(ctx, shade(c, 0.35), () => E(ctx, 0, 12, 24, 7), { stroke: false });
    for (let i = 0; i < 4; i++) L(ctx, shade(c, -0.3), 1.2, () => { ctx.moveTo(-20 + i * 10, -6); ctx.quadraticCurveTo(-16 + i * 10, 0, -20 + i * 10, 6); });
    k.glowEyes(14, -10, 0.24, '#ffd23f');
  },
  // Đền: mái cong hai tầng, đầu đao, cột đỏ
  temple(k, o) {
    const { ctx } = k; const roof = o.fill ?? '#7a3b2a';
    B(ctx, '#c9b79a', () => ctx.rect(-50, 38, 100, 12));
    for (const x of [-34, -12, 12, 34]) B(ctx, '#b5482c', () => ctx.rect(x - 3, 2, 6, 36));
    B(ctx, '#f3e3c3', () => ctx.rect(-30, 6, 60, 32), { shadeSide: 14 });
    B(ctx, '#6b3f22', () => ctx.rect(-8, 14, 16, 24));
    const tier = (y, w, h) => B(ctx, roof, () => { ctx.moveTo(-w - 8, y - h - 6); ctx.quadraticCurveTo(-w, y, -w + 4, y); ctx.lineTo(w - 4, y); ctx.quadraticCurveTo(w, y, w + 8, y - h - 6); ctx.quadraticCurveTo(w * 0.5, y - h, 0, y - h - 2); ctx.quadraticCurveTo(-w * 0.5, y - h, -w - 8, y - h - 6); ctx.closePath(); });
    tier(4, 50, 14);
    B(ctx, '#f3e3c3', () => ctx.rect(-22, -20, 44, 12));
    tier(-16, 34, 16);
    L(ctx, '#f6c344', 2.4, () => { ctx.moveTo(-28, -34); ctx.lineTo(28, -34); });
    B(ctx, '#f6c344', () => ctx.arc(0, -38, 4, 0, Math.PI * 2), { lw: 1 });
  },
  // Mặt trống đồng (nhìn từ trên): ngôi sao giữa, vành hoa văn, đàn chim Lạc bay vòng; o.rays (14), o.spin
  drumface(k, o) {
    const { ctx } = k; const t = k.gt ?? 0; const br = o.fill ?? '#c9a24a'; const n = o.rays ?? 14;
    B(ctx, br, () => ctx.arc(0, 0, 50, 0, Math.PI * 2), { lw: 2 });
    for (const r of [44, 34, 22, 14]) L(ctx, shade(br, -0.35), 1.2, () => ctx.arc(0, 0, r, 0, Math.PI * 2));
    B(ctx, '#f6d77a', () => { for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2; const r = i % 2 ? 4 : 13; ctx[i ? 'lineTo' : 'moveTo'](Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); }, { lw: 1 });
    for (let i = 0; i < 36; i++) { const a = (i / 36) * Math.PI * 2; L(ctx, shade(br, -0.35), 1, () => { ctx.moveTo(Math.cos(a) * 15, Math.sin(a) * 15); ctx.lineTo(Math.cos(a) * 21, Math.sin(a) * 21); }); }
    const spin = (o.spin ?? 0.15) * t;
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 - spin;
      ctx.save(); ctx.translate(Math.cos(a) * 39, Math.sin(a) * 39); ctx.rotate(a - Math.PI / 2 + Math.PI);
      ctx.fillStyle = shade(br, -0.45);
      ctx.beginPath(); ctx.ellipse(0, 0, 4.2, 1.8, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(3, -0.6); ctx.lineTo(10, -1.6); ctx.lineTo(3, 0.6); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-1, -1); ctx.lineTo(-3, -5); ctx.lineTo(1, -1); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-1, 1); ctx.lineTo(-3, 5); ctx.lineTo(1, 1); ctx.fill();
      ctx.restore();
    }
    for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; B(ctx, shade(br, -0.35), () => ctx.arc(Math.cos(a) * 28, Math.sin(a) * 28, 1.4, 0, Math.PI * 2), { stroke: false }); }
  },
  // Bình gốm cổ có hoa văn khắc vạch
  pot(k, o) {
    const { ctx } = k; const c = o.fill ?? '#c98a5a';
    B(ctx, c, () => { ctx.moveTo(-14, -40); ctx.lineTo(14, -40); ctx.quadraticCurveTo(10, -30, 22, -18); ctx.bezierCurveTo(46, 0, 34, 44, 0, 48); ctx.bezierCurveTo(-34, 44, -46, 0, -22, -18); ctx.quadraticCurveTo(-10, -30, -14, -40); ctx.closePath(); }, { shadeSide: 12 });
    B(ctx, shade(c, -0.12), () => E(ctx, 0, -40, 15, 4));
    L(ctx, shade(c, -0.4), 1.6, () => { for (let x = -26; x <= 22; x += 8) { ctx.moveTo(x, -2); ctx.quadraticCurveTo(x + 4, 6, x + 8, -2); } });
    L(ctx, shade(c, -0.4), 1.4, () => { ctx.moveTo(-30, 12); ctx.quadraticCurveTo(0, 18, 30, 12); });
  },
  // Quả bầu (bầu mẹ)
  gourd(k, o) {
    const { ctx } = k; const c = o.fill ?? '#9cc06a';
    B(ctx, c, () => { ctx.arc(0, 18, 30, 0, Math.PI * 2); }, { shadeSide: 10 });
    B(ctx, c, () => { ctx.arc(0, -22, 18, 0, Math.PI * 2); }, { shadeSide: 6 });
    B(ctx, '#7a4e2d', () => ctx.roundRect(-3, -48, 6, 10, 2));
    B(ctx, '#5aa74a', () => E(ctx, 10, -44, 10, 4, -0.4), { lw: 1 });
  },
  // ---------- tiền sử ----------
  // Lửa trại: củi chéo + ngọn lửa lay động; o.fire (0..1) = độ lớn ngọn lửa (0 = than hồng).
  campfire(k, o) {
    const { ctx } = k; const t = k.gt ?? 0; const f = o.fire ?? 1;
    for (let i = 0; i < 7; i++) B(ctx, i % 2 ? '#8a8a8a' : '#9e9e9e', () => E(ctx, -36 + i * 12, 44, 8, 6), { lw: 1.2 });
    for (const a of [-0.35, 0.35]) { ctx.save(); ctx.translate(0, 34); ctx.rotate(a); B(ctx, '#8B5A2B', () => ctx.roundRect(-34, -5, 68, 10, 5), { lw: 1.4 }); B(ctx, '#d2b488', () => E(ctx, a < 0 ? 34 : -34, 0, 3, 5), { lw: 1 }); ctx.restore(); }
    if (f <= 0.05) { for (const x of [-10, 2, 12]) B(ctx, '#e0302b', () => E(ctx, x, 30, 6, 3), { stroke: false }); return; }
    const fl = (ph) => 1 + 0.1 * Math.sin(t * 13 + ph) + 0.06 * Math.sin(t * 27 + ph);
    ctx.save(); ctx.translate(0, 30); ctx.scale(f, f);
    B(ctx, '#F58220', () => { ctx.moveTo(-26, 0); ctx.quadraticCurveTo(-34, -24, -16, -40 * fl(0)); ctx.quadraticCurveTo(-14, -26, -6, -24); ctx.quadraticCurveTo(-8, -50, 6, -66 * fl(1)); ctx.quadraticCurveTo(10, -40, 18, -36); ctx.quadraticCurveTo(22, -46, 24, -50 * fl(2)); ctx.quadraticCurveTo(36, -20, 26, 0); ctx.closePath(); }, { lw: 1.4 });
    B(ctx, '#F4C430', () => { ctx.moveTo(-14, 0); ctx.quadraticCurveTo(-18, -18, -4, -28 * fl(3)); ctx.quadraticCurveTo(0, -18, 6, -20); ctx.quadraticCurveTo(10, -36 * fl(4), 14, -30); ctx.quadraticCurveTo(20, -12, 14, 0); ctx.closePath(); }, { stroke: false });
    ctx.restore();
    for (let i = 0; i < 3; i++) { const u = (t * 0.8 + i / 3) % 1; B(ctx, '#F4C430', () => ctx.arc(Math.sin(i * 2 + t * 3) * 14, -40 - u * 50, 2 * (1 - u), 0, Math.PI * 2), { stroke: false }); }
  },
  // Cây keo thảo nguyên: thân cong, tán dẹt.
  acacia(k, o) {
    const { ctx } = k; const g = o.fill ?? '#4E9A45';
    B(ctx, '#6b4a33', () => { ctx.moveTo(-4, 50); ctx.quadraticCurveTo(-8, 10, 2, -20); ctx.lineTo(8, -20); ctx.quadraticCurveTo(2, 10, 6, 50); ctx.closePath(); });
    L(ctx, '#6b4a33', 4, () => { ctx.moveTo(2, -4); ctx.quadraticCurveTo(-14, -12, -24, -24); ctx.moveTo(4, -10); ctx.quadraticCurveTo(18, -16, 26, -26); });
    B(ctx, g, () => { ctx.moveTo(-48, -22); ctx.quadraticCurveTo(-46, -40, -20, -42); ctx.quadraticCurveTo(0, -52, 22, -44); ctx.quadraticCurveTo(48, -42, 50, -24); ctx.quadraticCurveTo(0, -16, -48, -22); ctx.closePath(); });
    B(ctx, shade(g, 0.12), () => E(ctx, -6, -40, 22, 4), { stroke: false });
  },
  // Miệng hang đá (nhìn từ ngoài): khối đá + lòng hang tối.
  cave(k, o) {
    const { ctx } = k; const r = o.fill ?? '#8A8A8A';
    B(ctx, r, () => { ctx.moveTo(-50, 50); ctx.quadraticCurveTo(-56, -20, -20, -44); ctx.quadraticCurveTo(10, -58, 36, -36); ctx.quadraticCurveTo(58, -10, 50, 50); ctx.closePath(); }, { shadeSide: 18 });
    B(ctx, o.inside ?? '#2b2420', () => { ctx.moveTo(-26, 50); ctx.quadraticCurveTo(-28, -2, 0, -14); ctx.quadraticCurveTo(28, -2, 26, 50); ctx.closePath(); });
    for (const [x, y] of [[-34, -14], [30, -20], [-10, -36]]) L(ctx, shade(r, -0.25), 1.4, () => { ctx.moveTo(x, y); ctx.lineTo(x + 8, y + 5); });
  },
  // Ổ cỏ (đệm cỏ): o.ash = lớp tro bên dưới; o.leaves = lá nguyệt quế xen vào.
  grassbed(k, o) {
    const { ctx } = k;
    if (o.ash) B(ctx, '#bdb7ad', () => ctx.roundRect(-50, 22, 100, 16, 8), { lw: 1.2 });
    B(ctx, '#c9b061', () => { ctx.moveTo(-48, 26); ctx.quadraticCurveTo(-46, 6, 0, 4); ctx.quadraticCurveTo(46, 6, 48, 26); ctx.closePath(); });
    for (let i = 0; i < 16; i++) { const x = -44 + i * 5.8; L(ctx, i % 2 ? '#a88e3f' : '#e0c97a', 1.4, () => { ctx.moveTo(x, 24); ctx.quadraticCurveTo(x + 4, 12, x + (i % 3) * 3 - 2, 4 - (i % 4) * 2); }); }
    if (o.leaves) for (const [x, a] of [[-26, -0.4], [4, 0.3], [30, -0.2]]) { ctx.save(); ctx.translate(x, 12); ctx.rotate(a); B(ctx, '#3f7f3a', () => E(ctx, 0, 0, 9, 4), { lw: 1 }); ctx.restore(); }
  },
  // Tổ ngủ trên cây của tinh tinh.
  nest(k, o) {
    const { ctx } = k;
    B(ctx, '#7a5a35', () => { ctx.moveTo(-40, -6); ctx.quadraticCurveTo(-36, 22, 0, 24); ctx.quadraticCurveTo(36, 22, 40, -6); ctx.quadraticCurveTo(0, 4, -40, -6); ctx.closePath(); });
    for (let i = 0; i < 9; i++) L(ctx, i % 2 ? '#5d4326' : '#9c7a4a', 2, () => { const x = -34 + i * 8.5; ctx.moveTo(x - 6, -2 + (i % 3) * 5); ctx.lineTo(x + 8, 6 + (i % 2) * 8); });
    for (const [x, y] of [[-34, -10], [-12, -6], [14, -8], [36, -10]]) B(ctx, '#4E9A45', () => E(ctx, x, y, 9, 5, x * 0.02), { lw: 1 });
  },
  // Tinh tinh ngồi, nhìn chính diện.
  chimp(k, o) {
    const { ctx } = k; const f = o.fill ?? '#3d2b22'; const sk = '#c9a27e';
    B(ctx, f, () => E(ctx, 0, 22, 30, 28));
    for (const sd of [-1, 1]) { B(ctx, f, () => E(ctx, sd * 30, 26, 9, 22, sd * -0.3)); B(ctx, sk, () => E(ctx, sd * 30, 46, 7, 5)); }
    for (const sd of [-1, 1]) B(ctx, sk, () => E(ctx, sd * 25, -22, 8, 9));
    B(ctx, f, () => E(ctx, 0, -20, 24, 23));
    B(ctx, sk, () => { ctx.moveTo(-16, -26); ctx.quadraticCurveTo(-18, -2, 0, 2); ctx.quadraticCurveTo(18, -2, 16, -26); ctx.quadraticCurveTo(8, -34, 0, -26); ctx.quadraticCurveTo(-8, -34, -16, -26); ctx.closePath(); });
    eye(ctx, -7, -20, 2.6); eye(ctx, 7, -20, 2.6);
    L(ctx, INK, 1.4, () => { ctx.moveTo(-6, -6); ctx.quadraticCurveTo(0, -2, 6, -6); });
  },
  // Giường hiện đại, nhìn nghiêng.
  bed(k, o) {
    const { ctx } = k;
    B(ctx, '#8B5A2B', () => ctx.roundRect(-50, -10, 8, 50, 2));
    B(ctx, '#8B5A2B', () => ctx.roundRect(42, 4, 8, 36, 2));
    B(ctx, '#f5f1e6', () => ctx.roundRect(-44, 6, 88, 12, 4));
    B(ctx, '#ffffff', () => E(ctx, -30, 2, 12, 6));
    B(ctx, o.fill ?? '#7FB5D5', () => ctx.roundRect(-18, 0, 64, 16, 5));
  },
  // Nến trên đế.
  candle(k, o) {
    const { ctx } = k; const t = k.gt ?? 0; const fl = 1 + 0.12 * Math.sin(t * 15);
    B(ctx, '#b8860b', () => E(ctx, 0, 44, 26, 7));
    B(ctx, '#f5f1e6', () => ctx.roundRect(-10, -10, 20, 54, 3), { shadeSide: 4 });
    L(ctx, INK, 1.4, () => { ctx.moveTo(0, -10); ctx.lineTo(0, -16); });
    B(ctx, '#F58220', () => { ctx.moveTo(0, -12); ctx.quadraticCurveTo(-8, -20, 0, -36 * fl); ctx.quadraticCurveTo(8, -20, 0, -12); ctx.closePath(); }, { stroke: false });
    B(ctx, '#F4C430', () => { ctx.moveTo(0, -14); ctx.quadraticCurveTo(-4, -19, 0, -27 * fl); ctx.quadraticCurveTo(4, -19, 0, -14); ctx.closePath(); }, { stroke: false });
  },
  // Rìu đá cầm tay (biface).
  handaxe(k, o) {
    const { ctx } = k;
    B(ctx, o.fill ?? '#9a9a9a', () => { ctx.moveTo(0, -46); ctx.bezierCurveTo(26, -22, 30, 22, 0, 40); ctx.bezierCurveTo(-30, 22, -26, -22, 0, -46); ctx.closePath(); }, { shadeSide: 4 });
    for (const [x, y, r] of [[-9, -20, 7], [8, 0, 9], [-6, 18, 7]]) B(ctx, '#b8b8b8', () => E(ctx, x, y, r, r * 0.6, 0.5), { stroke: false });
  },
  // Khoan lửa bằng tay: que xoay trên tấm gỗ, khói bốc; o.smoke 0..1.
  firedrill(k, o) {
    const { ctx } = k; const t = k.gt ?? 0; const sm = o.smoke ?? 1;
    B(ctx, '#8B5A2B', () => ctx.roundRect(-46, 34, 92, 12, 3));
    B(ctx, '#2b2420', () => E(ctx, 0, 34, 6, 3), { stroke: false });
    ctx.save(); ctx.translate(0, 34); ctx.rotate(Math.sin(t * 20) * 0.04);
    B(ctx, '#c9a26b', () => ctx.roundRect(-3.5, -84, 7, 84, 3));
    ctx.restore();
    ctx.save(); ctx.globalAlpha *= 0.45 * sm;
    for (let i = 0; i < 4; i++) { const u = (t * 0.7 + i / 4) % 1; B(ctx, '#d8d4cc', () => ctx.arc(8 + u * 26 + Math.sin(u * 6 + i) * 5, 30 - u * 50, 4 + u * 7, 0, Math.PI * 2), { stroke: false }); }
    ctx.restore();
    if (o.ember) B(ctx, '#E0302B', () => E(ctx, 0, 33, 4, 2.5), { stroke: false });
  },
  // Hòn đá (o.fill); o.sparkle = đá pyrit lấp lánh vàng.
  rock(k, o) {
    const { ctx } = k;
    B(ctx, o.fill ?? '#8A8A8A', () => { ctx.moveTo(-40, 30); ctx.quadraticCurveTo(-46, -6, -18, -26); ctx.quadraticCurveTo(10, -36, 34, -14); ctx.quadraticCurveTo(48, 10, 40, 30); ctx.closePath(); }, { shadeSide: 12 });
    if (o.sparkle) for (const [x, y] of [[-14, -8], [12, -16], [20, 10], [-22, 14]]) B(ctx, '#F4C430', () => { ctx.moveTo(x, y - 6); ctx.lineTo(x + 2, y); ctx.lineTo(x, y + 6); ctx.lineTo(x - 2, y); ctx.closePath(); }, { stroke: false });
  },
  // Đùi thịt nướng (o.raw = thịt sống).
  meat(k, o) {
    const { ctx } = k;
    B(ctx, '#f5f1e6', () => { ctx.roundRect(18, -6, 26, 12, 6); });
    B(ctx, '#f5f1e6', () => { ctx.arc(46, -8, 7, 0, Math.PI * 2); ctx.moveTo(53, 8); ctx.arc(46, 8, 7, 0, Math.PI * 2); });
    B(ctx, o.raw ? '#e98a8a' : '#a0522d', () => E(ctx, -8, 0, 32, 24, -0.15), { shadeSide: 2 });
    if (!o.raw) for (const x of [-22, -8, 6]) L(ctx, '#6b3410', 2.5, () => { ctx.moveTo(x - 4, -10); ctx.lineTo(x + 4, 8); });
  },
  // Chim nhỏ nhìn nghiêng (chim dẫn mật); o.fly vỗ cánh.
  bird(k, o) {
    const { ctx } = k; const t = k.gt ?? 0; const c = o.fill ?? '#8a7a5a';
    const fl = o.fly ? Math.sin(t * 14 + (o.phase ?? 0)) : 0.2;
    B(ctx, shade(c, -0.2), () => { ctx.moveTo(-30, 2); ctx.lineTo(-50, -6); ctx.lineTo(-48, 10); ctx.closePath(); });
    B(ctx, o.belly ?? '#efe6cf', () => E(ctx, -4, 4, 28, 18));
    B(ctx, c, () => { ctx.moveTo(-30, 0); ctx.quadraticCurveTo(-6, -24, 20, -8); ctx.quadraticCurveTo(0, 0, -30, 0); ctx.closePath(); }, { stroke: false });
    B(ctx, c, () => ctx.arc(20, -10, 14, 0, Math.PI * 2));
    B(ctx, '#F4C430', () => { ctx.moveTo(32, -12); ctx.lineTo(46, -8); ctx.lineTo(32, -4); ctx.closePath(); }, { lw: 1.2 });
    eye(ctx, 24, -14, 2.4);
    ctx.save(); ctx.translate(-4, -4); ctx.rotate(-0.3 - fl * 0.7);
    B(ctx, shade(c, -0.15), () => E(ctx, -12, 0, 20, 9, 0.2));
    ctx.restore();
  },
  // Tổ ong treo, ong bay quanh.
  beehive(k, o) {
    const { ctx } = k; const t = k.gt ?? 0;
    L(ctx, '#6b4a33', 5, () => { ctx.moveTo(-40, -46); ctx.lineTo(40, -46); });
    B(ctx, '#e0a83a', () => { ctx.moveTo(0, -46); ctx.bezierCurveTo(40, -40, 36, 40, 0, 46); ctx.bezierCurveTo(-36, 40, -40, -40, 0, -46); ctx.closePath(); }, { shadeSide: 8 });
    for (const y of [-24, -4, 16, 32]) L(ctx, '#b07d1a', 2, () => { ctx.moveTo(-26 + Math.abs(y) * 0.2, y); ctx.quadraticCurveTo(0, y + 5, 26 - Math.abs(y) * 0.2, y); });
    B(ctx, '#3b2f2a', () => E(ctx, 0, 30, 6, 5), { stroke: false });
    for (let i = 0; i < 4; i++) { const a = t * 3 + i * 1.6; B(ctx, '#F4C430', () => E(ctx, Math.cos(a) * 48, Math.sin(a * 1.3) * 30, 4, 3), { lw: 1 }); }
  },
  // Củ (khoai dại) có rễ con.
  tuber(k, o) {
    const { ctx } = k;
    B(ctx, o.fill ?? '#a8744a', () => { ctx.moveTo(-40, 6); ctx.bezierCurveTo(-36, -22, 30, -26, 42, -2); ctx.bezierCurveTo(46, 18, -30, 30, -40, 6); ctx.closePath(); }, { shadeSide: 10 });
    for (const [x, y] of [[-20, -4], [4, -10], [22, 4]]) L(ctx, '#7a5432', 1.6, () => { ctx.moveTo(x - 4, y); ctx.lineTo(x + 4, y + 2); });
    L(ctx, '#7a5432', 1.6, () => { ctx.moveTo(42, 0); ctx.quadraticCurveTo(52, 6, 50, 18); ctx.moveTo(-40, 6); ctx.quadraticCurveTo(-50, 14, -46, 24); });
    L(ctx, '#4E9A45', 3, () => { ctx.moveTo(30, -16); ctx.quadraticCurveTo(34, -36, 26, -48); });
  },
  // Em bé quấn tã nằm ngang, đầu bên trái. o.skin, o.fill (tã), o.cry (khóc: miệng mở + nước mắt), o.awake (mở mắt).
  baby(k, o) {
    const { ctx } = k; const sk = o.skin ?? '#d9a77c'; const cl = o.fill ?? '#e9d8b4';
    B(ctx, cl, () => E(ctx, 10, 6, 36, 22), { shadeSide: 14 });
    L(ctx, shade(cl, -0.2), 1.4, () => { ctx.moveTo(-6, -12); ctx.quadraticCurveTo(10, 6, 2, 26); ctx.moveTo(14, -15); ctx.quadraticCurveTo(26, 6, 20, 26); });
    B(ctx, sk, () => E(ctx, -26, -2, 18, 17));
    B(ctx, o.hair ?? '#3a2a1e', () => { ctx.arc(-26, -4, 18, Math.PI * 1.05, Math.PI * 1.75); ctx.closePath(); }, { stroke: false });
    if (o.cry) {
      L(ctx, INK, 1.4, () => { ctx.moveTo(-36, -6); ctx.lineTo(-30, -4); ctx.moveTo(-22, -4); ctx.lineTo(-16, -6); });
      B(ctx, '#7a2a24', () => E(ctx, -26, 7, 6, 5));
      for (const sd of [-1, 1]) B(ctx, '#9fd3ff', () => E(ctx, -26 + sd * 13, 4 + (k.gt * 40 % 10), 2.4, 3.4), { stroke: false });
    } else if (o.awake) {
      eye(ctx, -32, -4, 2.2); eye(ctx, -20, -4, 2.2);
      L(ctx, INK, 1.3, () => { ctx.moveTo(-30, 6); ctx.quadraticCurveTo(-26, 9, -22, 6); });
    } else {
      L(ctx, INK, 1.3, () => { ctx.moveTo(-35, -4); ctx.quadraticCurveTo(-32, -1, -29, -4); ctx.moveTo(-23, -4); ctx.quadraticCurveTo(-20, -1, -17, -4); });
      L(ctx, INK, 1.2, () => { ctx.moveTo(-28, 7); ctx.quadraticCurveTo(-26, 8, -24, 7); });
    }
  },
  // Xương ống chân nằm ngang. o.cut: đầu phải bị cắt phẳng, đã liền.
  bone(k, o) {
    const { ctx } = k; const c = o.fill ?? '#f1e8d4';
    B(ctx, c, () => { ctx.moveTo(-34, -7); ctx.lineTo(o.cut ? 30 : 34, -6); ctx.lineTo(o.cut ? 30 : 34, 6); ctx.lineTo(-34, 7); ctx.closePath(); });
    for (const sy of [-1, 1]) B(ctx, c, () => E(ctx, -40, sy * 9, 11, 11));
    if (o.cut) B(ctx, shade(c, -0.1), () => E(ctx, 31, 0, 4, 8));
    else for (const sy of [-1, 1]) B(ctx, c, () => E(ctx, 40, sy * 9, 11, 11));
  },
  // Hộp sọ nhìn nghiêng phải. o.holes: số lỗ khoan (đã liền, mép tròn).
  skull(k, o) {
    const { ctx } = k; const c = o.fill ?? '#f1e8d4';
    B(ctx, c, () => { ctx.moveTo(-38, 10); ctx.bezierCurveTo(-46, -40, 30, -54, 38, -6); ctx.lineTo(40, 14); ctx.lineTo(30, 18); ctx.lineTo(28, 32); ctx.lineTo(4, 34); ctx.lineTo(0, 22); ctx.quadraticCurveTo(-30, 26, -38, 10); ctx.closePath(); }, { shadeSide: 10 });
    B(ctx, '#3b2f2a', () => E(ctx, 22, 0, 9, 8), { stroke: false });
    B(ctx, '#3b2f2a', () => { ctx.moveTo(36, 12); ctx.lineTo(32, 20); ctx.lineTo(39, 20); ctx.closePath(); }, { stroke: false });
    for (let i = 0; i < 3; i++) L(ctx, INK, 1.2, () => { ctx.moveTo(8 + i * 7, 28); ctx.lineTo(8 + i * 7, 34); });
    const hs = [[-10, -34], [-26, -22]].slice(0, o.holes ?? 0);
    for (const [x, y] of hs) { B(ctx, shade(c, -0.25), () => E(ctx, x, y, 9, 7)); B(ctx, '#3b2f2a', () => E(ctx, x, y, 5, 4), { stroke: false }); }
  },
  // Răng hàm. o.cavity: lỗ sâu; o.filled: lỗ đã trám (nhựa đường đen).
  tooth(k, o) {
    const { ctx } = k;
    B(ctx, '#fbf7ee', () => { ctx.moveTo(-28, -30); ctx.quadraticCurveTo(-30, -44, -14, -42); ctx.quadraticCurveTo(0, -36, 14, -42); ctx.quadraticCurveTo(30, -44, 28, -30); ctx.quadraticCurveTo(30, 0, 18, 6); ctx.lineTo(14, 44); ctx.quadraticCurveTo(8, 48, 4, 40); ctx.lineTo(0, 14); ctx.lineTo(-4, 40); ctx.quadraticCurveTo(-8, 48, -14, 44); ctx.lineTo(-18, 6); ctx.quadraticCurveTo(-30, 0, -28, -30); ctx.closePath(); }, { shadeSide: 12 });
    if (o.cavity || o.filled) B(ctx, o.filled ? '#1b1b1b' : '#6b4a33', () => E(ctx, -4, -28, 9, 7));
  },
  // Đười ươi ngồi (lông cam).
  orangutan(k, o) {
    const { ctx } = k; const f = o.fill ?? '#c0602a'; const sk = '#6b4a3a';
    B(ctx, f, () => E(ctx, 0, 24, 32, 28));
    for (const sd of [-1, 1]) B(ctx, f, () => E(ctx, sd * 32, 22, 10, 28, sd * -0.25));
    B(ctx, f, () => E(ctx, 0, -18, 30, 26));
    B(ctx, sk, () => E(ctx, 0, -14, 22, 20));
    eye(ctx, -7, -20, 2.6); eye(ctx, 7, -20, 2.6);
    L(ctx, INK, 1.4, () => { ctx.moveTo(-8, -4); ctx.quadraticCurveTo(0, 0, 8, -4); });
    if (o.wound) L(ctx, '#d2402b', 2.6, () => { ctx.moveTo(10, -30); ctx.lineTo(18, -22); });
    if (o.leaves) B(ctx, '#4E9A45', () => E(ctx, 14, -26, 8, 5, 0.6));
  },
  // Nấm thuốc (birch polypore) xâu trên dây da.
  polypore(k, o) {
    const { ctx } = k;
    L(ctx, '#6b4a33', 2.4, () => { ctx.moveTo(-46, -20); ctx.quadraticCurveTo(0, 6, 46, -20); });
    for (const x of [-20, 18]) B(ctx, '#d9c4a0', () => { ctx.moveTo(x - 18, -4); ctx.quadraticCurveTo(x, -26, x + 18, -4); ctx.quadraticCurveTo(x, 14, x - 18, -4); ctx.closePath(); }, { shadeSide: x });
  },
  // Dụng cụ cạo người (strigil) của Hy Lạp/La Mã.
  strigil(k, o) {
    const { ctx } = k;
    L(ctx, '#8a6a3a', 9, () => { ctx.moveTo(-40, 30); ctx.lineTo(-10, 0); ctx.quadraticCurveTo(10, -30, 40, -26); });
    L(ctx, '#d9b36a', 5, () => { ctx.moveTo(-40, 30); ctx.lineTo(-10, 0); ctx.quadraticCurveTo(10, -30, 40, -26); });
  },
  // Viên thuốc con nhộng.
  pill(k, o) {
    const { ctx } = k;
    B(ctx, '#ffffff', () => { ctx.moveTo(0, -14); ctx.lineTo(0, 14); ctx.lineTo(-24, 14); ctx.arc(-24, 0, 14, Math.PI / 2, Math.PI * 1.5); ctx.closePath(); });
    B(ctx, o.fill ?? '#e0302b', () => { ctx.moveTo(0, -14); ctx.lineTo(24, -14); ctx.arc(24, 0, 14, -Math.PI / 2, Math.PI / 2); ctx.lineTo(0, 14); ctx.closePath(); });
  },
  // Cá voi sát thủ nhìn ngang, đầu bên phải.
  orca(k, o) {
    const { ctx } = k;
    B(ctx, '#1f2330', () => { ctx.moveTo(-26, -6); ctx.lineTo(-18, -40); ctx.quadraticCurveTo(-10, -20, -4, -10); ctx.closePath(); });
    B(ctx, '#1f2330', () => { ctx.moveTo(-40, 0); ctx.lineTo(-56, -14); ctx.lineTo(-52, 2); ctx.lineTo(-58, 16); ctx.closePath(); });
    B(ctx, '#1f2330', () => { ctx.moveTo(-44, 2); ctx.bezierCurveTo(-30, -18, 30, -20, 48, 0); ctx.bezierCurveTo(40, 18, -20, 20, -44, 2); ctx.closePath(); });
    B(ctx, '#f5f1e6', () => { ctx.moveTo(-10, 12); ctx.quadraticCurveTo(20, 18, 44, 4); ctx.quadraticCurveTo(24, 10, -10, 12); ctx.closePath(); }, { stroke: false });
    B(ctx, '#f5f1e6', () => E(ctx, 28, -5, 7, 3, -0.15), { stroke: false });
    B(ctx, '#1f2330', () => E(ctx, 8, 10, 10, 4, 0.5));
  },
  // Lưới săn đan bằng dây rừng (lưới của người Aka).
  net(k, o) {
    const { ctx } = k; const c = o.fill ?? '#8B5A2B';
    for (let i = -4; i <= 4; i++) L(ctx, c, 1.4, () => { ctx.moveTo(-50, i * 10); ctx.quadraticCurveTo(0, i * 10 + 6, 50, i * 10); });
    for (let i = -5; i <= 5; i++) L(ctx, c, 1.4, () => { ctx.moveTo(i * 10, -40); ctx.lineTo(i * 10 + 2, 40); });
    L(ctx, '#6b4a33', 3.4, () => { ctx.moveTo(-52, -44); ctx.lineTo(-52, 48); ctx.moveTo(52, -44); ctx.lineTo(52, 48); ctx.moveTo(-52, -40); ctx.quadraticCurveTo(0, -34, 52, -40); });
  },
  // Dao nhỏ lưỡi sắt, cán gỗ.
  knife(k, o) {
    const { ctx } = k;
    B(ctx, '#c9ccd1', () => { ctx.moveTo(-6, 4); ctx.lineTo(40, -2); ctx.quadraticCurveTo(46, 2, 40, 8); ctx.lineTo(-6, 12); ctx.closePath(); }, { shadeSide: 8 });
    B(ctx, '#8B5A2B', () => { ctx.rect(-40, 2, 34, 12); });
  },
  // Quả bao báp (vỏ nhung xanh xám) bổ đôi thấy ruột trắng.
  baobab(k, o) {
    const { ctx } = k;
    B(ctx, '#8a9a6a', () => E(ctx, -14, 0, 22, 34, 0.15), { shadeSide: 0 });
    B(ctx, '#8a9a6a', () => E(ctx, 22, 4, 22, 34, -0.15));
    B(ctx, '#f5f1e6', () => E(ctx, 22, 4, 15, 27, -0.15), { lw: 1.2 });
    for (const [x, y] of [[18, -8], [26, 4], [20, 16]]) B(ctx, '#7a5432', () => E(ctx, x, y, 3, 2), { stroke: false });
    L(ctx, '#6b4a33', 3, () => { ctx.moveTo(-16, -34); ctx.lineTo(-12, -46); });
  },
  // Chùm quả mọng.
  berries(k, o) {
    const { ctx } = k; const c = o.fill ?? '#c0392b';
    L(ctx, '#4E9A45', 2.5, () => { ctx.moveTo(0, -40); ctx.quadraticCurveTo(-4, -20, -16, -6); ctx.moveTo(0, -40); ctx.quadraticCurveTo(6, -18, 18, -4); });
    B(ctx, '#4E9A45', () => E(ctx, 10, -40, 12, 5, -0.4), { lw: 1 });
    for (const [x, y] of [[-18, 4], [-6, 14], [8, 6], [20, 16], [-2, 30], [14, 30], [-16, 24]]) B(ctx, c, () => ctx.arc(x, y, 9, 0, Math.PI * 2), { lw: 1.2 });
    for (const [x, y] of [[-20, 1], [6, 3], [-4, 27]]) B(ctx, '#fff', () => ctx.arc(x, y, 2, 0, Math.PI * 2), { stroke: false });
  },
  // Cối đá nghiền: đá phẳng + chày đá + bột.
  grinder(k, o) {
    const { ctx } = k;
    B(ctx, '#9a9a9a', () => { ctx.moveTo(-48, 30); ctx.quadraticCurveTo(-50, 8, -30, 6); ctx.lineTo(30, 4); ctx.quadraticCurveTo(50, 8, 48, 30); ctx.closePath(); }, { shadeSide: 16 });
    B(ctx, '#f5f1e6', () => E(ctx, 0, 6, 26, 5), { lw: 1 });
    B(ctx, '#b8b8b8', () => ctx.roundRect(-22, -14, 44, 18, 9), { shadeSide: 6 });
  },
  // Ổ bánh mì.
  bread(k, o) {
    const { ctx } = k;
    B(ctx, '#d9a05b', () => { ctx.moveTo(-46, 18); ctx.quadraticCurveTo(-48, -22, 0, -24); ctx.quadraticCurveTo(48, -22, 46, 18); ctx.closePath(); }, { shadeSide: 14 });
    for (const x of [-24, 0, 24]) L(ctx, '#a8682a', 2.5, () => { ctx.moveTo(x - 8, -12); ctx.lineTo(x + 6, 4); });
  },
  // Gói snack siêu chế biến.
  snack(k, o) {
    const { ctx } = k;
    B(ctx, o.fill ?? '#E0302B', () => { ctx.moveTo(-30, -44); ctx.lineTo(30, -44); ctx.lineTo(34, 44); ctx.lineTo(-34, 44); ctx.closePath(); }, { shadeSide: 14 });
    for (const y of [-44, 44]) L(ctx, '#9a1f1a', 2, () => { for (let x = -30; x <= 30; x += 6) { ctx.moveTo(x, y); ctx.lineTo(x + 3, y + (y < 0 ? 4 : -4)); } });
    B(ctx, '#F4C430', () => ctx.arc(0, -4, 18, 0, Math.PI * 2), { lw: 1.4 });
    B(ctx, '#f5f1e6', () => ctx.roundRect(-20, 22, 40, 10, 3), { lw: 1 });
  },
  // Con bò (nhìn nghiêng); o.fat 0..1 béo gầy.
  ox(k, o) {
    const { ctx } = k; const f = o.fat ?? 1; const c = o.fill ?? '#b07a4a';
    for (const x of [-26, 20]) B(ctx, shade(c, -0.2), () => ctx.roundRect(x - 5, 10, 10, 38, 3));
    B(ctx, c, () => E(ctx, -2, 0, 40, 18 + 8 * f), { shadeSide: 10 });
    for (const x of [-18, 28]) B(ctx, c, () => ctx.roundRect(x - 5, 12, 10, 38, 3));
    B(ctx, '#f5f1e6', () => E(ctx, -10, -4, 12, 8), { stroke: false });
    L(ctx, INK, LW, () => { ctx.moveTo(-42, -4); ctx.quadraticCurveTo(-52, 6, -48, 18); });
    B(ctx, c, () => E(ctx, 42, -14, 15, 13));
    B(ctx, '#e8b9a0', () => E(ctx, 52, -8, 8, 7));
    for (const sd of [-1, 1]) L(ctx, '#f5f1e6', 3, () => { ctx.moveTo(38 + sd * 4, -24); ctx.quadraticCurveTo(36 + sd * 12, -36, 30 + sd * 16, -34); });
    eye(ctx, 44, -18, 2.2);
  },
  // Máy tính xách tay (văn phòng).
  laptop(k, o) {
    const { ctx } = k;
    B(ctx, '#5a6b8a', () => ctx.roundRect(-40, -40, 80, 52, 4));
    B(ctx, o.screen ?? '#9fd3ff', () => ctx.roundRect(-34, -34, 68, 40, 2), { stroke: false });
    for (let i = 0; i < 4; i++) L(ctx, '#5a6b8a', 2, () => { ctx.moveTo(-26, -26 + i * 9); ctx.lineTo(-26 + 20 + (i % 3) * 14, -26 + i * 9); });
    B(ctx, '#8a95a8', () => { ctx.moveTo(-48, 12); ctx.lineTo(48, 12); ctx.lineTo(54, 22); ctx.lineTo(-54, 22); ctx.closePath(); });
  },
  // Nhiệt kế; o.level 0..1.
  // Quả dưa hấu; o.slice = miếng bổ (ruột đỏ, hạt đen), o.text = chữ khắc lên vỏ (An Tiêm khắc tên).
  watermelon(k, o) {
    const { ctx } = k;
    if (o.slice) {
      B(ctx, '#3f8a3a', () => { ctx.moveTo(-48, -6); ctx.quadraticCurveTo(0, 62, 48, -6); ctx.closePath(); });
      B(ctx, '#e9f3c8', () => { ctx.moveTo(-43, -6); ctx.quadraticCurveTo(0, 52, 43, -6); ctx.closePath(); }, { stroke: false });
      B(ctx, '#e8463a', () => { ctx.moveTo(-38, -6); ctx.quadraticCurveTo(0, 44, 38, -6); ctx.closePath(); }, { lw: 1.2 });
      for (const [x, y] of [[-20, 4], [-6, 12], [8, 6], [22, 2], [0, -1]]) B(ctx, INK, () => E(ctx, x, y, 2, 3.2, 0.3), { stroke: false });
      return;
    }
    B(ctx, '#3f8a3a', () => E(ctx, 0, 6, 48, 38), { shadeSide: 16 });
    for (const x of [-30, -12, 6, 24]) L(ctx, '#245a22', 5, () => { ctx.moveTo(x, -28); ctx.quadraticCurveTo(x + 10, 6, x, 40); });
    B(ctx, '#7a4e2d', () => ctx.roundRect(-3, -40, 6, 10, 2));
    if (o.text) k.text(o.text, 0, 8, { size: 18, font: 'title', color: '#f6f0c8' });
  },
  // Lưỡi cày đồng Đông Sơn (hình tim, có họng tra cán).
  plough(k, o) {
    const { ctx } = k; const br = o.fill ?? '#b5893c';
    B(ctx, br, () => { ctx.moveTo(0, 46); ctx.bezierCurveTo(-30, 24, -46, -10, -36, -30); ctx.quadraticCurveTo(-22, -46, 0, -28); ctx.quadraticCurveTo(22, -46, 36, -30); ctx.bezierCurveTo(46, -10, 30, 24, 0, 46); ctx.closePath(); }, { shadeSide: 8 });
    B(ctx, shade(br, -0.3), () => ctx.roundRect(-8, -40, 16, 46, 6), { lw: 1.2 });
    L(ctx, shade(br, -0.35), 1.4, () => { ctx.moveTo(-22, 0); ctx.quadraticCurveTo(0, 30, 22, 0); });
  },
  // Nỏ (nhìn ngang, mũi hướng phải); o.glow = phát sáng (nỏ thần).
  crossbow(k, o) {
    const { ctx } = k; const t = k.gt ?? 0;
    if (o.glow) { ctx.save(); ctx.globalAlpha *= 0.35 + 0.15 * Math.sin(t * 4); B(ctx, typeof o.glow === 'string' ? o.glow : '#f6d77a', () => E(ctx, 6, 0, 60, 40), { stroke: false }); ctx.restore(); }
    B(ctx, '#8a5a35', () => { ctx.moveTo(-50, 4); ctx.lineTo(30, -4); ctx.lineTo(32, 4); ctx.lineTo(-30, 10); ctx.lineTo(-44, 22); ctx.lineTo(-54, 18); ctx.closePath(); }, { shadeSide: 6 });
    L(ctx, INK, 7, () => { ctx.moveTo(30, -40); ctx.quadraticCurveTo(48, 0, 30, 40); });
    L(ctx, '#c98a3a', 4.5, () => { ctx.moveTo(30, -40); ctx.quadraticCurveTo(48, 0, 30, 40); });
    L(ctx, '#e9e4dc', 1.4, () => { ctx.moveTo(30, -40); ctx.lineTo(-6, 0); ctx.lineTo(30, 40); });
    L(ctx, INK, 2.4, () => { ctx.moveTo(-6, -2); ctx.lineTo(54, -2); });
    B(ctx, o.tip ?? '#b5893c', () => { ctx.moveTo(54, -7); ctx.lineTo(64, -2); ctx.lineTo(54, 3); ctx.closePath(); }, { lw: 1.2 });
  },
  // Rùa vàng (Kim Quy) nhìn ngang, đầu hướng phải; o.fill, o.glow, o.talk = há miệng nói.
  turtle(k, o) {
    const { ctx } = k; const c = o.fill ?? '#e8b84a'; const t = k.gt ?? 0;
    if (o.glow) { ctx.save(); ctx.globalAlpha *= 0.3 + 0.15 * Math.sin(t * 3); B(ctx, '#fff3c4', () => E(ctx, 0, 6, 66, 46), { stroke: false }); ctx.restore(); }
    const sw = Math.sin(t * 3) * 3;
    for (const [x, d] of [[-30, -sw], [24, sw]]) B(ctx, shade(c, -0.12), () => { ctx.moveTo(x - 8, 22); ctx.quadraticCurveTo(x - 4 + d, 40, x + 6 + d, 38); ctx.lineTo(x + 10, 22); ctx.closePath(); });
    B(ctx, shade(c, -0.12), () => { ctx.moveTo(-46, 18); ctx.lineTo(-58, 24); ctx.lineTo(-44, 26); ctx.closePath(); });
    // cổ + đầu
    ctx.save(); ctx.translate(40, 6 + Math.sin(t * 1.6) * 2);
    B(ctx, shade(c, -0.12), () => { ctx.moveTo(-6, 8); ctx.quadraticCurveTo(8, -4, 18, -8); ctx.lineTo(22, 10); ctx.quadraticCurveTo(8, 16, -6, 18); ctx.closePath(); });
    const op = o.talk ? Math.max(0, Math.sin(t * 14)) * 4 : 0;
    B(ctx, shade(c, -0.08), () => { ctx.moveTo(14, -10); ctx.quadraticCurveTo(26, -20, 36, -8); ctx.quadraticCurveTo(38, -2, 34, 0); ctx.lineTo(16, 2); ctx.closePath(); });
    B(ctx, shade(c, -0.08), () => { ctx.moveTo(16, 2 + op); ctx.lineTo(33, 1 + op); ctx.quadraticCurveTo(30, 8 + op, 18, 8 + op); ctx.closePath(); });
    eye(ctx, 26, -10, 2.4);
    ctx.restore();
    // mai
    B(ctx, c, () => { ctx.moveTo(-50, 22); ctx.bezierCurveTo(-50, -30, 46, -30, 46, 22); ctx.closePath(); }, { shadeSide: 14 });
    B(ctx, shade(c, -0.25), () => ctx.roundRect(-52, 18, 100, 8, 4), { lw: 1.2 });
    for (const [x, y, r] of [[-26, 6, 11], [0, -2, 12], [24, 6, 11], [-12, 16, 7], [12, 16, 7]]) {
      B(ctx, shade(c, 0.12), () => { for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + Math.PI / 6; ctx[i ? 'lineTo' : 'moveTo'](x + Math.cos(a) * r, y + Math.sin(a) * r * 0.8); } ctx.closePath(); }, { lw: 1.1 });
    }
  },
  // Lông ngỗng trắng; o.fill.
  feather(k, o) {
    const { ctx } = k; const c = o.fill ?? '#fbf8f1';
    B(ctx, c, () => { ctx.moveTo(0, 48); ctx.bezierCurveTo(-22, 20, -20, -30, 2, -50); ctx.bezierCurveTo(20, -26, 22, 18, 0, 48); ctx.closePath(); }, { shadeSide: 2 });
    L(ctx, '#c9bfae', 2, () => { ctx.moveTo(0, 52); ctx.quadraticCurveTo(4, 0, 2, -46); });
    for (let i = 0; i < 5; i++) for (const d of [-1, 1]) L(ctx, '#ddd4c3', 1.1, () => { const y = -30 + i * 14; ctx.moveTo(2, y); ctx.lineTo(2 + d * 12, y - 6); });
  },
  // Con trai há miệng, viên ngọc trong lòng; o.open 0..1, o.glow.
  oyster(k, o) {
    const { ctx } = k; const op = o.open ?? 1; const t = k.gt ?? 0;
    B(ctx, '#8a7a9a', () => { ctx.moveTo(-46, 10); ctx.quadraticCurveTo(0, 46, 46, 10); ctx.closePath(); }, { shadeSide: 16 });
    B(ctx, '#e9dcef', () => { ctx.moveTo(-40, 10); ctx.quadraticCurveTo(0, 36, 40, 10); ctx.closePath(); }, { stroke: false });
    if (op > 0.2) {
      if (o.glow) { ctx.save(); ctx.globalAlpha *= 0.4 + 0.2 * Math.sin(t * 4); B(ctx, '#fff6d8', () => E(ctx, 0, 6, 26, 26), { stroke: false }); ctx.restore(); }
      B(ctx, '#fbf6ff', () => E(ctx, 0, 8, 11, 11));
      B(ctx, '#ffffff', () => E(ctx, -3, 4, 3.5, 3), { stroke: false });
    }
    ctx.save(); ctx.translate(-46, 10); ctx.rotate(-op * 0.7);
    B(ctx, '#9a8aaa', () => { ctx.moveTo(0, 0); ctx.quadraticCurveTo(46, -38, 92, 0); ctx.closePath(); }, { shadeSide: 60 });
    for (let i = 1; i < 4; i++) L(ctx, '#7a6a8a', 1.2, () => { ctx.moveTo(14 + i * 4, -2); ctx.quadraticCurveTo(46, -38 + i * 9, 78 - i * 4, -2); });
    ctx.restore();
  },
  // Mũi tên đồng ba cạnh (đứng, mũi lên); o.fill.
  arrowhead(k, o) {
    const { ctx } = k; const c = o.fill ?? '#b5893c';
    B(ctx, shade(c, -0.2), () => ctx.roundRect(-5, 18, 10, 32, 3));
    B(ctx, c, () => { ctx.moveTo(0, -50); ctx.lineTo(-16, 22); ctx.lineTo(16, 22); ctx.closePath(); });
    B(ctx, shade(c, 0.25), () => { ctx.moveTo(0, -50); ctx.lineTo(-16, 22); ctx.lineTo(0, 16); ctx.closePath(); }, { lw: 1 });
    L(ctx, shade(c, -0.35), 1.2, () => { ctx.moveTo(0, -46); ctx.lineTo(0, 16); });
  },
  // Sừng tê (cong, màu ngà).
  horn(k, o) {
    const { ctx } = k;
    B(ctx, o.fill ?? '#e8dcc0', () => { ctx.moveTo(-22, 46); ctx.bezierCurveTo(-26, 0, -6, -36, 20, -48); ctx.bezierCurveTo(6, -20, 8, 18, 22, 46); ctx.closePath(); }, { shadeSide: 6 });
    for (let i = 0; i < 3; i++) L(ctx, '#bfae8a', 1.2, () => { ctx.moveTo(-20 + i * 3, 30 - i * 16); ctx.quadraticCurveTo(0, 26 - i * 16, 18 - i, 32 - i * 18); });
  },
  // Giải (rùa mai mềm, Rafetus — "cụ rùa Hồ Gươm") nhìn ngang, đầu hướng phải: mai dẹt da trơn, mõm ống; o.fill, o.talk.
  // Cú lợn (barn owl): mặt trắng hình trái tim, lưng vàng nâu; o.fly = dang cánh bay.
  owl(k, o) {
    const { ctx } = k; const t = k.gt ?? 0; const back = o.fill ?? '#d9a85a';
    if (o.fly) {
      const f = Math.sin(t * 9 + (o.phase ?? 0)) * 0.35;
      for (const sd of [-1, 1]) {
        ctx.save(); ctx.scale(sd, 1); ctx.rotate(f);
        B(ctx, back, () => { ctx.moveTo(10, -6); ctx.quadraticCurveTo(50, -34, 78, -10); ctx.quadraticCurveTo(62, -4, 60, 6); ctx.quadraticCurveTo(40, 2, 10, 14); ctx.closePath(); }, { shadeSide: 40 });
        for (const x of [30, 44, 58]) B(ctx, '#f3ead8', () => E(ctx, x, -8 - (x - 30) * 0.2, 2, 1.6), { stroke: false });
        ctx.restore();
      }
    }
    B(ctx, '#f6efe0', () => E(ctx, 0, 18, 24, 30));
    B(ctx, back, () => { ctx.moveTo(-24, 10); ctx.quadraticCurveTo(-26, -20, 0, -24); ctx.quadraticCurveTo(26, -20, 24, 10); ctx.quadraticCurveTo(14, 4, 0, 6); ctx.quadraticCurveTo(-14, 4, -24, 10); ctx.closePath(); }, { stroke: false });
    if (!o.fly) for (const sd of [-1, 1]) B(ctx, back, () => { ctx.moveTo(sd * 22, -2); ctx.quadraticCurveTo(sd * 30, 26, sd * 14, 46); ctx.quadraticCurveTo(sd * 18, 18, sd * 12, 0); ctx.closePath(); }, { shadeSide: sd > 0 ? 4 : 400 });
    B(ctx, '#fffaf2', () => { ctx.moveTo(0, -4); ctx.bezierCurveTo(-12, -26, -34, -16, -24, 4); ctx.quadraticCurveTo(-14, 22, 0, 26); ctx.quadraticCurveTo(14, 22, 24, 4); ctx.bezierCurveTo(34, -16, 12, -26, 0, -4); ctx.closePath(); });
    L(ctx, '#c9a06a', 1.4, () => { ctx.moveTo(0, -4); ctx.lineTo(0, 12); });
    const bl = Math.sin(t * 0.9 + (o.phase ?? 0)) > 0.97;
    for (const sd of [-1, 1]) bl ? L(ctx, INK, 1.8, () => { ctx.moveTo(sd * 13, 4); ctx.lineTo(sd * 7, 4); }) : eye(ctx, sd * 10, 4, 3.4);
    B(ctx, '#e8c9a0', () => { ctx.moveTo(-2.5, 10); ctx.lineTo(2.5, 10); ctx.lineTo(0, 17); ctx.closePath(); }, { lw: 1 });
    if (!o.fly) for (const sd of [-1, 1]) L(ctx, '#8a7a6a', 2, () => { ctx.moveTo(sd * 8, 46); ctx.lineTo(sd * 8, 50); });
  },
  // Hàng rào tre gai: các cọc tre có gai nhọn; o.n = số cọc.
  thornfence(k, o) {
    const { ctx } = k; const n = o.n ?? 7; const g = o.fill ?? '#7a9a4a';
    const w = 100, step = w / (n - 1);
    L(ctx, INK, 5, () => { ctx.moveTo(-54, 10); ctx.lineTo(54, 10); ctx.moveTo(-54, 30); ctx.lineTo(54, 30); });
    L(ctx, '#9c7a4a', 3, () => { ctx.moveTo(-54, 10); ctx.lineTo(54, 10); ctx.moveTo(-54, 30); ctx.lineTo(54, 30); });
    for (let i = 0; i < n; i++) {
      const x = -50 + i * step, h = 34 + (i % 3) * 6;
      B(ctx, g, () => { ctx.moveTo(x - 3.5, 50); ctx.lineTo(x - 3.5, -h + 6); ctx.lineTo(x, -h); ctx.lineTo(x + 3.5, -h + 6); ctx.lineTo(x + 3.5, 50); ctx.closePath(); }, { lw: 1.2 });
      for (let yy = 40; yy > -h + 10; yy -= 9) {
        const sd = (yy / 9) % 2 ? 1 : -1;
        B(ctx, shade(g, -0.25), () => { ctx.moveTo(x + sd * 3.5, yy); ctx.lineTo(x + sd * 9, yy - 4); ctx.lineTo(x + sd * 3.5, yy - 3); ctx.closePath(); }, { lw: 0.8 });
      }
    }
  },
  softshell(k, o) {
    const { ctx } = k; const c = o.fill ?? '#7d8a5c'; const t = k.gt ?? 0;
    const sw = Math.sin(t * 2.2) * 4;
    for (const [x, d] of [[-30, -sw], [22, sw]]) B(ctx, shade(c, -0.15), () => { ctx.moveTo(x - 12, 16); ctx.quadraticCurveTo(x - 10 + d, 34, x + 10 + d, 30); ctx.lineTo(x + 12, 16); ctx.closePath(); });
    ctx.save(); ctx.translate(44, 4 + Math.sin(t * 1.4) * 2);
    B(ctx, shade(c, -0.1), () => { ctx.moveTo(-8, 6); ctx.quadraticCurveTo(6, -6, 16, -6); ctx.lineTo(18, 10); ctx.quadraticCurveTo(6, 14, -8, 16); ctx.closePath(); });
    const op = o.talk ? Math.max(0, Math.sin(t * 14)) * 3 : 0;
    B(ctx, shade(c, -0.05), () => { ctx.moveTo(12, -8); ctx.quadraticCurveTo(26, -12, 32, -6); ctx.lineTo(40, -6); ctx.quadraticCurveTo(42, -3, 40, 0); ctx.lineTo(30, 2 + op); ctx.quadraticCurveTo(22, 8 + op, 14, 8); ctx.closePath(); });
    eye(ctx, 26, -5, 2);
    ctx.restore();
    B(ctx, shade(c, -0.15), () => { ctx.moveTo(-50, 14); ctx.lineTo(-60, 18); ctx.lineTo(-48, 20); ctx.closePath(); });
    B(ctx, c, () => { ctx.moveTo(-54, 16); ctx.bezierCurveTo(-52, -16, 48, -18, 50, 16); ctx.quadraticCurveTo(0, 24, -54, 16); ctx.closePath(); }, { shadeSide: 12 });
    for (const [x, y, r] of [[-28, 4, 4], [-8, -2, 5], [14, 2, 4], [30, 8, 3], [-40, 10, 3], [2, 10, 3]]) B(ctx, shade(c, 0.18), () => E(ctx, x, y, r, r * 0.7), { stroke: false });
    L(ctx, shade(c, -0.3), 1.2, () => { ctx.moveTo(-50, 16); ctx.quadraticCurveTo(0, 22, 48, 16); });
  },
  // Gươm dựng đứng, mũi lên; o.blade / o.hilt (mặc định true) để vẽ riêng lưỡi hoặc chuôi; o.glow.
  sword(k, o) {
    const { ctx } = k; const t = k.gt ?? 0;
    if (o.glow) { ctx.save(); ctx.globalAlpha *= 0.3 + 0.15 * Math.sin(t * 3); B(ctx, '#fff3c4', () => E(ctx, 0, -10, 18, 58), { stroke: false }); ctx.restore(); }
    if (o.blade !== false) {
      B(ctx, o.fill ?? '#d9dde3', () => { ctx.moveTo(-5, 24); ctx.lineTo(-5, -40); ctx.lineTo(0, -50); ctx.lineTo(5, -40); ctx.lineTo(5, 24); ctx.closePath(); }, { lw: 1.3 });
      L(ctx, '#aab0b8', 1, () => { ctx.moveTo(0, -42); ctx.lineTo(0, 22); });
    }
    if (o.hilt !== false) {
      B(ctx, '#c9a24a', () => ctx.roundRect(-16, 24, 32, 6, 3), { lw: 1.2 });
      B(ctx, '#6b4a2d', () => ctx.roundRect(-4, 30, 8, 16, 2), { lw: 1.2 });
      B(ctx, '#c9a24a', () => E(ctx, 0, 48, 5, 4), { lw: 1.2 });
    }
  },
  // Tháp Rùa trên gò giữa hồ (3 tầng, mái cong).
  thaprua(k, o) {
    const { ctx } = k;
    B(ctx, '#7fae5a', () => { ctx.moveTo(-50, 50); ctx.quadraticCurveTo(-30, 34, 0, 34); ctx.quadraticCurveTo(30, 34, 50, 50); ctx.closePath(); });
    const tier = (y, w, h) => {
      B(ctx, '#e9e2d0', () => ctx.rect(-w, y - h, w * 2, h), { shadeSide: w * 0.4 });
      B(ctx, '#6b4a33', () => { ctx.moveTo(-w * 0.35, y); ctx.lineTo(-w * 0.35, y - h * 0.6); ctx.quadraticCurveTo(0, y - h * 0.95, w * 0.35, y - h * 0.6); ctx.lineTo(w * 0.35, y); ctx.closePath(); }, { lw: 1 });
      B(ctx, '#8a5a3a', () => { ctx.moveTo(-w - 6, y - h - 2); ctx.quadraticCurveTo(-w, y - h + 4, -w + 4, y - h + 4); ctx.lineTo(w - 4, y - h + 4); ctx.quadraticCurveTo(w, y - h + 4, w + 6, y - h - 2); ctx.closePath(); }, { lw: 1.2 });
    };
    tier(36, 26, 24); tier(8, 19, 18); tier(-14, 13, 14);
    B(ctx, '#8a5a3a', () => { ctx.moveTo(-6, -30); ctx.lineTo(0, -44); ctx.lineTo(6, -30); ctx.closePath(); }, { lw: 1.2 });
  },
  // Bánh giầy (tròn, trắng, lót lá).
  banhday(k, o) {
    const { ctx } = k;
    B(ctx, '#5aa74a', () => E(ctx, 0, 18, 46, 12));
    B(ctx, '#fbf6ea', () => E(ctx, 0, 6, 38, 22), { shadeSide: 14 });
    B(ctx, '#ffffff', () => E(ctx, -10, -2, 12, 5, -0.2), { stroke: false });
  },
  // Đảo cát giữa biển, một cây dừa.
  island(k, o) {
    const { ctx } = k; const t = k.gt ?? 0; const sw = Math.sin(t * 1.3) * 0.05;
    B(ctx, '#ecd39a', () => { ctx.moveTo(-50, 40); ctx.quadraticCurveTo(-30, 14, 0, 12); ctx.quadraticCurveTo(34, 14, 50, 40); ctx.closePath(); }, { shadeSide: 18 });
    ctx.save(); ctx.translate(10, 18); ctx.rotate(sw);
    L(ctx, INK, 6.5, () => { ctx.moveTo(0, 0); ctx.quadraticCurveTo(-4, -30, 6, -52); });
    L(ctx, '#9a6d3a', 4.5, () => { ctx.moveTo(0, 0); ctx.quadraticCurveTo(-4, -30, 6, -52); });
    for (const a of [-2.6, -2.0, -1.2, -0.5, 0.2]) B(ctx, '#4E9A45', () => { ctx.moveTo(6, -52); ctx.quadraticCurveTo(6 + Math.cos(a) * 18, -52 + Math.sin(a) * 18 - 6, 6 + Math.cos(a) * 30, -52 + Math.sin(a) * 30 + 6); ctx.quadraticCurveTo(6 + Math.cos(a) * 14, -52 + Math.sin(a) * 14, 6, -52); ctx.closePath(); }, { lw: 1.2 });
    ctx.restore();
  },
  thermo(k, o) {
    const { ctx } = k; const lv = o.level ?? 0.5;
    B(ctx, '#ffffff', () => ctx.roundRect(-10, -48, 20, 80, 10));
    B(ctx, '#ffffff', () => ctx.arc(0, 36, 16, 0, Math.PI * 2));
    B(ctx, o.fill ?? '#E0302B', () => ctx.arc(0, 36, 11, 0, Math.PI * 2), { stroke: false });
    B(ctx, o.fill ?? '#E0302B', () => ctx.roundRect(-5, 30 - 72 * lv, 10, 72 * lv + 4, 4), { stroke: false });
    for (let i = 0; i < 5; i++) L(ctx, INK, 1.2, () => { ctx.moveTo(10, -36 + i * 14); ctx.lineTo(16, -36 + i * 14); });
  },
};

// Mặt nước dâng toàn khung tại mức y (px). o.color, o.alpha; sóng tự chuyển động.
export function water(k, level, o = {}) {
  const { ctx, W, H } = k; const t = k.gt ?? 0;
  const c = o.color ?? '#5b9bd5';
  ctx.save();
  ctx.globalAlpha *= o.alpha ?? 0.92;
  const path = (off, amp) => {
    ctx.beginPath(); ctx.moveTo(-20, H + 20); ctx.lineTo(-20, level);
    for (let x = -20; x <= W + 40; x += 30) ctx.lineTo(x, level + Math.sin(x * 0.012 + t * 2.2 + off) * amp + Math.sin(x * 0.031 - t * 1.4 + off) * amp * 0.4);
    ctx.lineTo(W + 20, H + 20); ctx.closePath();
  };
  const g = ctx.createLinearGradient(0, level, 0, H);
  g.addColorStop(0, c); g.addColorStop(1, shade(c, -0.45));
  path(0, o.amp ?? 10); ctx.fillStyle = g; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.stroke();
  ctx.globalAlpha *= 0.5; path(1.7, (o.amp ?? 10) * 0.6); ctx.translate(0, 18); ctx.strokeStyle = '#d6ecfa'; ctx.lineWidth = 3; ctx.stroke();
  ctx.restore();
}
