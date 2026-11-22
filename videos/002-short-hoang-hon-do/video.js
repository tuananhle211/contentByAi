// Shorts 002 — Vì sao hoàng hôn màu đỏ? (dọc 9:16, có phụ đề chạy chữ)
import { C } from '/engine/kit.js';
import { subscribeScene } from '/engine/templates.js';

function sunsetSky(k, p) {
  if (p <= 0) return;
  const g = k.ctx.createLinearGradient(0, 0, 0, 1300);
  g.addColorStop(0, 'rgba(142,91,211,0.25)'); g.addColorStop(0.55, 'rgba(240,110,40,0.5)'); g.addColorStop(1, 'rgba(246,195,68,0.55)');
  k.ctx.save(); k.ctx.globalAlpha = p; k.ctx.fillStyle = g; k.ctx.fillRect(0, 0, k.W, 1300); k.ctx.restore();
}

export default {
  meta: {
    format: 'short',
    captions: true,
    title: 'Vì sao hoàng hôn lại ĐỎ? 🌅 #shorts',
    description: 'Ban ngày trời xanh, hoàng hôn lại đỏ rực — tất cả là nhờ một hiện tượng: tán xạ ánh sáng. Xem bản đầy đủ "Tại sao bầu trời có màu xanh?" trên kênh Vẽ Là Hiểu!',
    tags: ['hoàng hôn', 'tại sao', 'khoa học', 'shorts', 'vẽ là hiểu', 'tán xạ rayleigh'],
    hashtags: ['shorts', 'khoahoc', 'taisao'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '+8%',
    music: 'assets/music/background.mp3',
    transition: 'fade',
  },
  scenes: [
    {
      say: 'Tại sao hoàng hôn lại đỏ rực, {q}trong khi ban ngày bầu trời lại xanh?',
      lead: 0.1,
      draw(k) {
        sunsetSky(k, k.at(0, 1.2));
        k.text('Vì sao hoàng hôn', k.W / 2, 260, { size: 110, font: 'title', fx: 'pop', p: k.at(0, 0.5), outline: C.white });
        k.text('lại ĐỎ?', k.W / 2, 400, { size: 150, font: 'title', fx: 'pop', p: k.at(0.25, 0.5), color: C.red, outline: C.white });
        const s = k.at(0.2, 2.5, 'inOut');
        k.icon('sun', k.W / 2, k.lerp(700, 980, s), 300, { p: k.at(0.2, 1), fill: C.orange });
        k.rect(0, 1000, k.W, k.H - 1000, { fill: '#3d6b4f', fillStyle: 'solid', stroke: 'none', seed: 5, p: k.at(0, 0.6) });
        k.line(40, 1000, k.W - 40, 1000, { p: k.at(0, 0.6), width: 5 });
        k.icon('question', 900, 760, 160, { p: k.at('q', 0.6, 'back') });
      },
    },
    {
      say: 'Ánh sáng Mặt Trời chứa đủ mọi màu. {blue}Khi đi qua không khí, màu xanh bị các phân tử khí hắt văng ra khắp nơi, {sky}nên ban ngày trời xanh.',
      draw(k) {
        k.rect(40, 120, k.W - 80, 520, { p: k.at('sky', 1.4, 'linear'), fill: C.sky, stroke: 'none', gap: 14, fillWeight: 3, rough: 2 });
        k.icon('sun', 200, 260, 200, { p: k.at(0, 0.8) });
        const mx = 600, my = 760;
        k.line(270, 330, k.lerp(270, mx - 60, k.at(0.6, 0.8, 'linear')), k.lerp(330, my - 40, k.at(0.6, 0.8, 'linear')), { width: 12, stroke: C.white, rough: 0.3, seed: 2 });
        k.icon('molecule', mx, my, 110, { p: k.at(0.9, 0.6), fill: C.blue });
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + 0.2;
          k.arrow(mx + Math.cos(a) * 80, my + Math.sin(a) * 80, mx + Math.cos(a) * 270, my + Math.sin(a) * 270, { p: k.at(k.cue('blue', 0.8 + i * 0.12), 0.5), stroke: C.blue, width: 6, head: 22 });
        }
        k.text('xanh văng khắp nơi', mx, 1140, { size: 70, font: 'title', color: C.blue, p: k.at(k.cue('blue', 1.5), 1.2, 'linear') });
        k.icon('check', 880, 260, 150, { p: k.at(k.cue('sky', 1), 0.5) });
      },
    },
    {
      say: 'Nhưng lúc hoàng hôn, {long}Mặt Trời nằm thấp, ánh sáng phải đi xuyên qua lớp không khí dày gấp nhiều lần. {gone}Màu xanh bị hắt đi gần hết trên đường, {red}chỉ còn đỏ và cam tới được mắt bạn.',
      draw(k) {
        sunsetSky(k, k.at('red', 1.5));
        k.circle(540, 2300, 1200, { p: k.at(0, 1), fill: C.green, stroke: C.green, gap: 18, width: 5 });
        k.circle(540, 2300, 1420, { p: k.at(0.3, 1.2), stroke: C.sky, width: 5 });
        k.icon('person', 300, 1060, 110, { p: k.at(0.5, 0.7) });
        k.icon('sun', 900, 1000, 150, { p: k.at('long', 0.7), fill: C.orange });
        const pa = k.at(k.cue('long', 0.6), 1.4, 'linear');
        k.line(830, 1005, k.lerp(830, 360, pa), k.lerp(1005, 1030, pa), { stroke: C.orange, width: 10, rough: 0.4, seed: 7, p: pa > 0 ? 1 : 0 });
        k.text('đường RẤT dài', 640, 1130, { size: 64, font: 'title', fx: 'fade', p: k.at(k.cue('long', 2), 0.6), color: C.red });
        for (let i = 0; i < 4; i++) {
          const x = 820 - i * 120, ang = -Math.PI / 2 + (i % 2 ? 0.45 : -0.45);
          k.arrow(x, 1005, x + Math.cos(ang) * 150, 1005 + Math.sin(ang) * 150, { p: k.at(k.cue('gone', i * 0.3), 0.5), stroke: C.blue, width: 6, head: 18 });
        }
        k.text('ĐỎ + CAM', 540, 420, { size: 150, font: 'title', fx: 'pop', p: k.at(k.cue('red', 0.8), 0.6), color: C.red, outline: C.white });
        k.icon('eye', 300, 880, 140, { p: k.at('red', 0.6) });
      },
    },
    subscribeScene({
      say: 'Theo dõi {sub}Vẽ Là Hiểu để mỗi ngày hiểu thêm một điều thú vị!',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
