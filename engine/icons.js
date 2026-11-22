// Thư viện hình vẽ tay dựng sẵn. Mỗi icon vẽ trong hộp ~100x100 quanh tâm (0,0).
// fn(k, p, o): p là tiến độ vẽ 0..1, o là tuỳ chọn (màu...).
import { C } from './kit.js';

const S = (k, p, i, n) => k.seq(p, i, n, 0.15);
// Vẽ mặt nếu nhân vật không tắt (o.face === false). o.face = tên cảm xúc (xem kit.face).
const F = (k, p, o, x, y, r, mood = 'calm') => { if (o.face !== false) k.face(x, y, r, o.face ?? mood, { p, phase: o.phase, blush: o.blush }); };

export const ICONS = {
  sun(k, p, o) {
    k.circle(0, 0, 30, { p: S(k, p, 0, 2), fill: o.fill ?? C.yellow, stroke: C.orange, width: 3.5 });
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      k.line(Math.cos(a) * 40, Math.sin(a) * 40, Math.cos(a) * 54, Math.sin(a) * 54, { p: k.seq(S(k, p, 1, 2), i, 10, 0.5), stroke: C.orange, width: 3.5 });
    }
  },
  cloud(k, p, o) {
    k.path('M -45 20 Q -60 20 -58 5 Q -56 -10 -38 -8 Q -35 -30 -12 -28 Q 5 -42 22 -25 Q 45 -30 46 -8 Q 62 -4 56 12 Q 52 22 40 20 Z', { p, fill: o.fill ?? C.white, fillStyle: 'solid', stroke: o.stroke ?? C.ink });
  },
  earth(k, p, o) {
    k.circle(0, 0, 46, { p: S(k, p, 0, 2), fill: C.sky, stroke: C.blue });
    const q = S(k, p, 1, 2);
    k.path('M -30 -20 Q -15 -35 0 -25 Q 8 -10 -5 -3 Q -20 5 -28 -5 Z', { p: q, fill: C.green, stroke: C.green, width: 2.5 });
    k.path('M 10 10 Q 30 0 35 15 Q 30 32 15 30 Q 5 22 10 10 Z', { p: q, fill: C.green, stroke: C.green, width: 2.5 });
  },
  eye(k, p, o) {
    k.path('M -50 0 Q 0 -45 50 0 Q 0 45 -50 0 Z', { p: S(k, p, 0, 3), fill: C.white, fillStyle: 'solid' });
    k.circle(0, 0, 18, { p: S(k, p, 1, 3), fill: o.fill ?? C.blue, stroke: C.ink });
    if (S(k, p, 2, 3) > 0) k.dot(0, 0, 8 * S(k, p, 2, 3), C.ink);
  },
  person(k, p, o) {
    const c = o.stroke ?? C.ink;
    k.circle(0, -38, 14, { p: S(k, p, 0, 5), stroke: c, fill: o.fill ?? '#fbf3e0', fillStyle: 'solid' });
    F(k, S(k, p, 0, 5), o, 0, -37, 14);
    k.line(0, -24, 0, 15, { p: S(k, p, 1, 5), stroke: c });
    k.line(0, -12, -22, 4, { p: S(k, p, 2, 5), stroke: c });
    k.line(0, -12, 22, 4, { p: S(k, p, 2, 5), stroke: c });
    k.line(0, 15, -16, 46, { p: S(k, p, 3, 5), stroke: c });
    k.line(0, 15, 16, 46, { p: S(k, p, 4, 5), stroke: c });
  },
  bulb(k, p, o) {
    k.path('M -16 18 Q -38 0 -32 -24 Q -24 -48 0 -48 Q 24 -48 32 -24 Q 38 0 16 18 Z', { p: S(k, p, 0, 2), fill: o.fill ?? C.yellow });
    const q = S(k, p, 1, 2);
    k.rect(-15, 20, 30, 10, { p: q, fill: C.gray });
    k.rect(-12, 30, 24, 9, { p: q, fill: C.gray });
    k.lines([[-8, 16], [-4, -8], [0, 0], [4, -8], [8, 16]], { p: q, stroke: C.orange, width: 2.5 });
  },
  star(k, p, o) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 20 : 48;
      pts.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    k.poly(pts, { p, fill: o.fill ?? C.yellow, stroke: C.orange });
  },
  heart(k, p, o) {
    k.path('M 0 40 Q -50 5 -45 -20 Q -38 -45 -12 -38 Q -2 -34 0 -22 Q 2 -34 12 -38 Q 38 -45 45 -20 Q 50 5 0 40 Z', { p, fill: o.fill ?? C.red, stroke: C.red });
  },
  check(k, p, o) {
    k.lines([[-38, 0], [-12, 28], [40, -32]], { p, stroke: o.stroke ?? C.green, width: 10 });
  },
  cross(k, p, o) {
    k.line(-32, -32, 32, 32, { p: S(k, p, 0, 2), stroke: o.stroke ?? C.red, width: 10 });
    k.line(32, -32, -32, 32, { p: S(k, p, 1, 2), stroke: o.stroke ?? C.red, width: 10 });
  },
  question(k, p, o) {
    k.curve([[-24, -24], [-18, -44], [6, -48], [24, -32], [18, -10], [0, 4], [0, 20]], { p: S(k, p, 0, 2), stroke: o.stroke ?? C.purple, width: 9 });
    if (S(k, p, 1, 2) > 0) k.dot(0, 40, 7 * S(k, p, 1, 2), o.stroke ?? C.purple);
  },
  clock(k, p, o) {
    k.circle(0, 0, 46, { p: S(k, p, 0, 2), fill: o.fill ?? C.white, fillStyle: 'solid' });
    const q = S(k, p, 1, 2);
    k.line(0, 0, 0, -30, { p: q, width: 4 });
    k.line(0, 0, 22, 8, { p: q, width: 4, stroke: C.red });
  },
  coin(k, p, o) {
    k.circle(0, 0, 44, { p: S(k, p, 0, 2), fill: o.fill ?? C.yellow, stroke: C.orange });
    k.text('$', 0, 2, { size: 60, color: C.orange, p: S(k, p, 1, 2), font: 'title' });
  },
  book(k, p, o) {
    const f = o.fill ?? C.red;
    k.poly([[-48, -30], [0, -20], [0, 38], [-48, 28]], { p: S(k, p, 0, 2), fill: f });
    k.poly([[48, -30], [0, -20], [0, 38], [48, 28]], { p: S(k, p, 1, 2), fill: f });
  },
  mountain(k, p, o) {
    k.poly([[-55, 35], [-15, -30], [10, 5], [25, -15], [60, 35]], { p, fill: o.fill ?? C.brown });
  },
  tree(k, p, o) {
    k.rect(-8, 5, 16, 42, { p: S(k, p, 0, 2), fill: C.brown });
    k.circle(0, -18, 34, { p: S(k, p, 1, 2), fill: o.fill ?? C.green, stroke: C.green });
  },
  house(k, p, o) {
    k.rect(-38, -5, 76, 50, { p: S(k, p, 0, 3), fill: o.fill ?? C.yellow });
    k.poly([[-48, -5], [0, -48], [48, -5]], { p: S(k, p, 1, 3), fill: C.red });
    k.rect(-10, 15, 20, 30, { p: S(k, p, 2, 3), fill: C.brown });
  },
  phone(k, p, o) {
    k.rect(-28, -48, 56, 96, { p: S(k, p, 0, 2), fill: o.fill ?? C.gray, fillStyle: 'solid' });
    k.rect(-22, -38, 44, 70, { p: S(k, p, 1, 2), fill: C.sky, fillStyle: 'solid' });
  },
  molecule(k, p, o) {
    const c = o.fill ?? C.blue;
    k.line(-20, 0, 20, 0, { p: S(k, p, 1, 2), width: 5 });
    k.circle(-22, 0, 20, { p: S(k, p, 0, 2), fill: c });
    k.circle(22, 0, 20, { p: S(k, p, 0, 2), fill: c });
  },
  rocket(k, p, o) {
    k.path('M 0 -50 Q 22 -25 18 25 L -18 25 Q -22 -25 0 -50 Z', { p: S(k, p, 0, 3), fill: o.fill ?? C.white, fillStyle: 'solid' });
    k.circle(0, -12, 9, { p: S(k, p, 1, 3), fill: C.sky, fillStyle: 'solid' });
    k.poly([[-18, 8], [-32, 34], [-14, 25]], { p: S(k, p, 1, 3), fill: C.red });
    k.poly([[18, 8], [32, 34], [14, 25]], { p: S(k, p, 1, 3), fill: C.red });
    k.poly([[-10, 27], [0, 50], [10, 27]], { p: S(k, p, 2, 3), fill: C.orange, stroke: C.orange });
  },
  brain(k, p, o) {
    k.path('M -5 -40 Q -30 -48 -40 -25 Q -55 -15 -45 5 Q -50 25 -28 32 Q -15 45 -5 32 Z', { p: S(k, p, 0, 2), fill: o.fill ?? C.pink });
    k.path('M 5 -40 Q 30 -48 40 -25 Q 55 -15 45 5 Q 50 25 28 32 Q 15 45 5 32 Z', { p: S(k, p, 1, 2), fill: o.fill ?? C.pink });
  },

  // ---------- truyền thuyết & sử Việt ----------
  child(k, p, o) {
    const skin = '#f3cfa4';
    k.circle(0, -24, 20, { p: S(k, p, 0, 4), fill: skin, fillStyle: 'solid' });
    k.path('M -18 -30 Q -4 -50 16 -34', { p: S(k, p, 0, 4), width: 4 });
    F(k, S(k, p, 0, 4), o, 0, -21, 20);
    k.rect(-15, -4, 30, 32, { p: S(k, p, 1, 4), fill: o.fill ?? C.red, gap: 6 });
    k.line(-15, 2, -28, 18, { p: S(k, p, 2, 4) });
    k.line(15, 2, 28, 18, { p: S(k, p, 2, 4) });
    k.line(-7, 28, -9, 46, { p: S(k, p, 3, 4) });
    k.line(7, 28, 9, 46, { p: S(k, p, 3, 4) });
  },
  // Tráng sĩ mặc giáp sắt, cầm roi (o.rod = false để bỏ roi, o.rod = 'broken' roi gãy).
  warrior(k, p, o) {
    const iron = o.fill ?? '#8d939c';
    k.poly([[-20, -58], [0, -82], [20, -58]], { p: S(k, p, 0, 5), fill: iron });
    k.circle(0, -46, 14, { p: S(k, p, 0, 5), fill: '#f3cfa4', fillStyle: 'solid' });
    F(k, S(k, p, 0, 5), o, 0, -45, 14, 'calm');
    k.poly([[-24, -30], [24, -30], [20, 14], [-20, 14]], { p: S(k, p, 1, 5), fill: iron, gap: 6 });
    k.line(-14, -22, 14, -22, { p: S(k, p, 1, 5), width: 2 });
    k.line(-16, -10, 16, -10, { p: S(k, p, 1, 5), width: 2 });
    k.line(-24, -26, -42, 2, { p: S(k, p, 2, 5), width: 5 });
    k.line(24, -26, 34, -4, { p: S(k, p, 2, 5), width: 5 });
    k.line(-10, 14, -14, 48, { p: S(k, p, 3, 5), width: 5 });
    k.line(10, 14, 14, 48, { p: S(k, p, 3, 5), width: 5 });
    if (o.rod === 'broken') {
      k.line(34, -4, 46, -30, { p: S(k, p, 4, 5), width: 7, stroke: '#4a4f57' });
      k.line(52, -40, 64, -64, { p: S(k, p, 4, 5), width: 7, stroke: '#4a4f57' });
    } else if (o.rod !== false) k.line(34, -4, 62, -66, { p: S(k, p, 4, 5), width: 7, stroke: '#4a4f57' });
  },
  // Ngựa nhìn ngang, quay sang phải. o.fire (0..1) phun lửa.
  horse(k, p, o) {
    const fill = o.fill ?? '#8d939c';
    k.ellipse(0, 0, 92, 44, { p: S(k, p, 0, 4), fill, gap: 7 });
    k.poly([[26, -12], [42, -46], [56, -44], [46, -6]], { p: S(k, p, 1, 4), fill, gap: 7 });
    k.poly([[40, -48], [50, -54], [60, -46], [76, -32], [72, -24], [56, -26], [46, -30]], { p: S(k, p, 1, 4), fill, gap: 7 });
    k.line(48, -52, 46, -62, { p: S(k, p, 1, 4), width: 3 });
    k.dot(56, -40, 2.5, C.ink);
    k.lines([[40, -44], [30, -36], [36, -32], [26, -24]], { p: S(k, p, 1, 4), width: 3 });
    for (const [x1, x2] of [[-32, -36], [-16, -14], [18, 16], [32, 40]]) k.line(x1, 16, x2, 52, { p: S(k, p, 2, 4), width: 5 });
    k.curve([[-44, -6], [-60, 2], [-62, 26]], { p: S(k, p, 3, 4), width: 4 });
    const f = Math.min(1, o.fire ?? 0);
    if (f > 0) {
      const w = 1 + 0.08 * Math.sin((k.gt ?? 0) * 25);
      k.group({ x: 74, y: -31, s: f * w }, () => {
        k.poly([[0, -4], [44, -18], [32, -4], [56, 2], [30, 8], [0, 4]], { fill: C.orange, fillStyle: 'solid', stroke: C.red, width: 2, seed: 71 });
        k.poly([[2, -2], [28, -8], [22, 0], [34, 3], [2, 2]], { fill: C.yellow, fillStyle: 'solid', stroke: 'none', seed: 72 });
      });
    }
  },
  bamboo(k, p, o) {
    const c = o.stroke ?? C.green;
    [[-22, -6], [0, 4], [22, 10]].forEach(([x, lean], i) => {
      const q = S(k, p, i, 3);
      k.curve([[x, 50], [x + lean * 0.5, 0], [x + lean, -50]], { p: q, stroke: c, width: 6 });
      for (let y = 30; y > -45; y -= 22) k.line(x + lean * ((50 - y) / 100) - 5, y, x + lean * ((50 - y) / 100) + 5, y, { p: q, stroke: c, width: 3 });
      k.path(`M ${x + lean} -50 q 18 -6 26 4 q -14 4 -26 -4 Z`, { p: q, fill: o.leaf ?? C.green, fillStyle: 'solid', stroke: c, width: 2 });
      k.path(`M ${x + lean * 0.7} -30 q -18 -6 -26 4 q 14 4 26 -4 Z`, { p: q, fill: o.leaf ?? C.green, fillStyle: 'solid', stroke: c, width: 2 });
    });
  },
  footprint(k, p, o) {
    k.ellipse(0, 12, 46, 76, { p: S(k, p, 0, 2), fill: o.fill ?? C.brown, gap: 7 });
    [[-17, -32, 8], [-6, -38, 7], [5, -38, 6.5], [15, -33, 6], [22, -24, 5]].forEach(([x, y, r]) => k.circle(x, y, r, { p: S(k, p, 1, 2), fill: o.fill ?? C.brown, fillStyle: 'solid' }));
  },
  // Nong (nia) cơm: o.fill màu đồ ăn (cơm trắng / cà tím).
  rice(k, p, o) {
    k.ellipse(0, 18, 100, 30, { p: S(k, p, 0, 2), fill: '#c99a5b', fillStyle: 'cross-hatch', gap: 8 });
    k.path('M -38 16 Q -20 -20 0 -22 Q 20 -20 38 16 Z', { p: S(k, p, 1, 2), fill: o.fill ?? C.white, fillStyle: 'solid' });
  },
  scroll(k, p, o) {
    k.rect(-34, -42, 68, 84, { p: S(k, p, 0, 3), fill: o.fill ?? '#f6e7c1', fillStyle: 'solid' });
    k.ellipse(0, -44, 84, 14, { p: S(k, p, 1, 3), fill: C.brown, fillStyle: 'solid' });
    k.ellipse(0, 44, 84, 14, { p: S(k, p, 1, 3), fill: C.brown, fillStyle: 'solid' });
    for (let i = 0; i < 4; i++) k.line(-22, -24 + i * 14, 22 - (i % 2) * 10, -24 + i * 14, { p: S(k, p, 2, 3), width: 2, stroke: C.gray });
  },
  temple(k, p, o) {
    k.rect(-44, 6, 88, 40, { p: S(k, p, 0, 3), fill: o.wall ?? '#f2d59b', fillStyle: 'solid' });
    for (const x of [-30, -10, 10, 30]) k.line(x, 8, x, 46, { p: S(k, p, 1, 3), width: 4, stroke: C.red });
    k.path('M -62 8 Q -44 2 -34 -22 L 34 -22 Q 44 2 62 8 Z', { p: S(k, p, 2, 3), fill: o.fill ?? C.red, gap: 6 });
    k.path('M -62 8 q -6 -8 -2 -16', { p: S(k, p, 2, 3), width: 3 });
    k.path('M 62 8 q 6 -8 2 -16', { p: S(k, p, 2, 3), width: 3 });
    k.line(-30, -30, 30, -30, { p: S(k, p, 2, 3), width: 5 });
  },
  soldier(k, p, o) {
    const c = o.fill ?? '#5d6470';
    k.poly([[-14, -46], [0, -66], [14, -46]], { p: S(k, p, 0, 4), fill: c, fillStyle: 'solid' });
    k.circle(0, -36, 11, { p: S(k, p, 0, 4), fill: '#e8c69c', fillStyle: 'solid' });
    F(k, S(k, p, 0, 4), o, 0, -35, 11, 'angry');
    k.poly([[-16, -24], [16, -24], [14, 12], [-14, 12]], { p: S(k, p, 1, 4), fill: c, gap: 6 });
    k.line(-10, 12, -14, 46, { p: S(k, p, 2, 4), width: 4 });
    k.line(10, 12, 14, 46, { p: S(k, p, 2, 4), width: 4 });
    k.line(16, -20, 30, 0, { p: S(k, p, 2, 4), width: 4 });
    k.line(30, 40, 30, -70, { p: S(k, p, 3, 4), width: 4, stroke: C.brown });
    k.poly([[30, -84], [24, -68], [36, -68]], { p: S(k, p, 3, 4), fill: C.gray, fillStyle: 'solid' });
  },
  drum(k, p, o) {
    const bronze = o.fill ?? '#b5893c';
    k.path('M -48 -18 Q -50 20 -36 44 L 36 44 Q 50 20 48 -18 Z', { p: S(k, p, 0, 3), fill: bronze, gap: 7 });
    k.ellipse(0, -18, 100, 30, { p: S(k, p, 1, 3), fill: '#d9b066', fillStyle: 'solid' });
    k.ellipse(0, -18, 64, 18, { p: S(k, p, 2, 3), width: 2 });
    const q = S(k, p, 2, 3);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      k.line(0, -18, Math.cos(a) * 16, -18 + Math.sin(a) * 5, { p: q, width: 2 });
    }
  },
  // Người mẹ đội nón lá.
  woman(k, p, o) {
    k.circle(0, -34, 12, { p: S(k, p, 0, 4), fill: '#f3cfa4', fillStyle: 'solid' });
    k.poly([[-32, -42], [0, -66], [32, -42]], { p: S(k, p, 1, 4), fill: o.hat ?? '#e9cf86', fillStyle: 'solid' });
    F(k, S(k, p, 0, 4), o, 0, -31, 12);
    k.poly([[-12, -22], [12, -22], [22, 44], [-22, 44]], { p: S(k, p, 2, 4), fill: o.fill ?? C.brown, gap: 6 });
    k.line(-12, -16, -26, 10, { p: S(k, p, 3, 4) });
    k.line(12, -16, 26, 10, { p: S(k, p, 3, 4) });
  },
  king(k, p, o) {
    k.circle(0, -34, 13, { p: S(k, p, 0, 4), fill: '#f3cfa4', fillStyle: 'solid' });
    F(k, S(k, p, 0, 4), o, 0, -33, 13);
    k.poly([[-16, -46], [-16, -60], [-6, -52], [0, -64], [6, -52], [16, -60], [16, -46]], { p: S(k, p, 1, 4), fill: C.yellow, fillStyle: 'solid', stroke: C.orange });
    k.poly([[-14, -20], [14, -20], [28, 46], [-28, 46]], { p: S(k, p, 2, 4), fill: o.fill ?? C.yellow, gap: 6, stroke: C.orange });
    k.line(-14, -14, -30, 12, { p: S(k, p, 3, 4) });
    k.line(14, -14, 30, 12, { p: S(k, p, 3, 4) });
  },
  fire(k, p, o) {
    const w = 1 + 0.06 * Math.sin((k.gt ?? 0) * 18);
    k.group({ s: w }, () => {
      k.path('M -30 40 Q -44 0 -14 -20 Q -16 0 -4 4 Q -6 -30 18 -50 Q 14 -16 30 -4 Q 44 20 30 40 Z', { p, fill: C.orange, fillStyle: 'solid', stroke: C.red, seed: o.seed ?? 81 });
      k.path('M -14 40 Q -20 16 -4 8 Q 0 20 8 18 Q 6 0 18 -10 Q 26 16 18 40 Z', { p, fill: C.yellow, fillStyle: 'solid', stroke: 'none', seed: (o.seed ?? 81) + 1 });
    });
  },
};
