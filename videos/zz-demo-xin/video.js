// Demo nâng cấp hình (14/11/2026): TRƯỚC (vẽ phẳng hiện nay) ↔ SAU (hậu kỳ engine/post.js, 3D engine/gl3d.js).
// Hạt Bụi Xanh: Trái Đất (phẳng → phẳng + hậu kỳ → 3D + hậu kỳ), hố đen (phẳng → 3D + hậu kỳ).
// Nhân Gian Chưa Kể: gian bếp (phẳng → hậu kỳ 'nhangian'). Không lời đọc.
import { P, space, earth, blackHole, chip } from '/channel/hat-bui-xanh.js';
import { kitchen, shade, KITCHEN, G, BA, dust } from '/channel/nhan-gian.js';
import { three } from '/engine/gl3d.js';
import { earthTextures, earthScene, earthUpdate, blackHoleScene, blackHoleUpdate } from '/channel/hat-bui-xanh-3d.js';

const W = 1920, H = 1080;
const T = await earthTextures('/videos/zz-demo-xin/assets/');
const EARTH = earthScene(T), BH = blackHoleScene();

// Nhãn so sánh góc trên trái.
function tagLine(k, ch, before, text) {
  chip(k, before ? 'TRƯỚC' : 'SAU', 60, 70, { bg: before ? 'rgba(245,241,230,0.9)' : '#FFD34E', size: 30 });
  k.text(`${ch} · ${text}`, 60, 140, { size: 34, font: 'title', color: 'rgba(245,241,230,0.9)', align: 'left', outline: '#05070D', outlineWidth: 8 });
}
const flatEarth = (k) => { space(k, { n: 220 }); earth(k, W / 2 + 120, H / 2, 380 + 20 * k.t / k.d, { spin: 0.02 }); };
const flatHole = (k) => { space(k, { n: 220 }); blackHole(k, W / 2, H / 2, 150 + 10 * k.t / k.d); };
// Ánh lửa (bản SAU): quầng ấm chập chờn lan ra sàn + tàn lửa bay lên + viền sáng.
function fireLight(k) {
  const { ctx } = k, f = KITCHEN.fire, fl = 1 + 0.1 * Math.sin(k.gt * 11) + 0.06 * Math.sin(k.gt * 27);
  ctx.save(); ctx.globalCompositeOperation = 'screen';
  let g = ctx.createRadialGradient(f.x, G - 40, 10, f.x, G - 40, 560 * fl);
  g.addColorStop(0, 'rgba(255,160,70,0.26)'); g.addColorStop(0.4, 'rgba(255,120,40,0.1)'); g.addColorStop(1, 'rgba(255,90,30,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  g = ctx.createRadialGradient(f.x, G + 10, 10, f.x, G + 10, 700 * fl); g.addColorStop(0, 'rgba(255,150,60,0.22)'); g.addColorStop(1, 'rgba(255,120,40,0)');
  ctx.fillStyle = g; ctx.save(); ctx.translate(0, G); ctx.scale(1, 0.18); ctx.fillRect(-W, -H, W * 3, H * 2); ctx.restore();
  for (let i = 0; i < 40; i++) {
    const life = (k.gt * (0.25 + 0.2 * k.rand(i)) + k.rand(i + 9)) % 1, x = f.x - 60 + 120 * k.rand(i + 3) + 40 * Math.sin(k.gt * 2 + i) * life, y = f.y - 80 - 520 * life;
    k.dot(x, y, 1.5 + 2.5 * (1 - life), i % 3 ? '#FFB060' : '#FFE0A0', (1 - life) * 0.9);
  }
  ctx.restore();
}
function kitchenScene(k, after = false) {
  const s = 1 + 0.03 * k.t / k.d;
  k.group({ x: W / 2, y: H / 2, s }, () => {
    k.ctx.translate(-W / 2, -H / 2);
    kitchen(k, { fire: 1 });
    k.char(820, G, 470, { ...BA, face: 'calm', pose: 'hold' });
    k.ctx.save(); k.ctx.globalAlpha = 0.5; k.steam(520, 680, 1); k.ctx.restore();
    dust(k, 300, 400, 600, 400, 26, 0.5);
    shade(k, 0.55, [KITCHEN.fire, { ...KITCHEN.xo, r: 220 }]);
    if (after) fireLight(k);
  });
}

export default {
  meta: {
    title: 'Demo nâng cấp hình', description: 'Demo nội bộ — không đăng.',
    format: 'long', minDuration: 0, captions: false, lang: 'vi', style: 'clean',
    gpu: true, transition: 'cut', camera: 0, scribble: false, sfxTransitions: false, paper: '#05070D',
  },
  thumbnail(k) { flatHole(k); },
  scenes: [
    // ---- Hạt Bụi Xanh: Trái Đất ----
    { dur: 2.6, post: false, draw(k) { flatEarth(k); tagLine(k, 'HẠT BỤI XANH', true, 'vẽ phẳng hiện nay'); } },
    { dur: 2.6, post: 'cosmos', draw(k) { flatEarth(k); tagLine(k, 'HẠT BỤI XANH', false, 'cùng hình vẽ + hậu kỳ (phát sáng, màu, hạt phim)'); } },
    {
      dur: 5.5, post: 'cosmos',
      draw(k) {
        three(k, 'earth', EARTH, earthUpdate({ spin: 0.06, lon: -2.5, dist: (k) => 5.6 - 0.6 * k.at(0, k.d, 'inOut') }));
        tagLine(k, 'HẠT BỤI XANH', false, '3D: ảnh NASA ngày/đêm, mây, khí quyển + hậu kỳ');
      },
    },
    // ---- Hạt Bụi Xanh: hố đen ----
    { dur: 2.6, post: false, draw(k) { flatHole(k); tagLine(k, 'HẠT BỤI XANH', true, 'vẽ phẳng hiện nay'); } },
    {
      dur: 5.5, post: 'cosmos',
      draw(k) {
        three(k, 'bh', BH, blackHoleUpdate({ orbit: 0.05, dist: (k) => 13 - 2.5 * k.at(0, k.d, 'inOut'), tilt: 0.12 }), 0, 0, W, H, { exposure: 1.1 });
        tagLine(k, 'HẠT BỤI XANH', false, '3D: đĩa khí xoáy, ánh sáng bị bẻ cong + hậu kỳ');
      },
    },
    // ---- Nhân Gian Chưa Kể: gian bếp ----
    { dur: 3, post: false, draw(k) { kitchenScene(k); tagLine(k, 'NHÂN GIAN CHƯA KỂ', true, 'cảnh bếp tập 100, hiện nay'); } },
    { dur: 5.5, post: 'nhangian', draw(k) { kitchenScene(k, true); tagLine(k, 'NHÂN GIAN CHƯA KỂ', false, 'cùng cảnh + ánh lửa, tàn lửa, hậu kỳ (màu phim, hạt phim)'); } },
  ],
};
