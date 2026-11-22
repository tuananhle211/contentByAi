// Video 001 — Tại sao bầu trời có màu xanh?
// Mỗi cảnh: say = lời thoại ({cue} đánh dấu thời điểm), draw(k) = hình vẽ theo thời gian.
import { C } from '/engine/kit.js';
import { titleScene, bulletsScene, subscribeScene } from '/engine/templates.js';

const RAINBOW = [C.red, C.orange, C.yellow, C.green, C.blue, '#3f4fb5', C.purple];

// Một mảng trời tô màu (dùng nhiều lần).
function skyBand(k, p, color = C.sky, h = 420) {
  k.rect(60, 50, k.W - 120, h, { p, fill: color, stroke: 'none', gap: 14, fillWeight: 3, angle: -20, rough: 2 });
}

export default {
  meta: {
    title: 'Tại sao bầu trời có màu xanh? 🌤️ Giải thích bằng hình vẽ',
    description: `Ánh sáng Mặt Trời màu trắng, vậy tại sao bầu trời lại xanh? Và tại sao hoàng hôn lại đỏ rực?
Trong video này, Vẽ Là Hiểu sẽ cùng bạn vẽ ra từng bước: lăng kính của Newton, sóng ánh sáng, và hiện tượng tán xạ Rayleigh.`,
    footer: `🔔 Đăng ký Vẽ Là Hiểu để xem những câu hỏi "tại sao" được giải thích bằng hình vẽ mỗi tuần.
💬 Câu hỏi kỳ này: Tại sao mây lại màu trắng? Bình luận dự đoán của bạn nhé!`,
    tags: ['tại sao bầu trời màu xanh', 'tán xạ rayleigh', 'khoa học vui', 'giải thích khoa học', 'vẽ là hiểu', 'hoàng hôn màu đỏ', 'kiến thức thú vị', 'vật lý', 'ánh sáng'],
    hashtags: ['khoahoc', 'veLaHieu', 'taisao'],
    voice: 'vi-VN-HoaiMyNeural',
    rate: '+4%',
    music: 'assets/music/background.mp3',
  },

  scenes: [
    {
      chapter: 'Mở đầu',
      say: 'Mỗi ngày, ta ngước lên {sky}và thấy một bầu trời xanh ngắt. Nhưng nếu tôi nói rằng: ánh sáng Mặt Trời {sun}vốn dĩ không hề có màu xanh thì sao?',
      draw(k) {
        k.line(80, 930, k.W - 80, 930, { p: k.at(0, 0.8), width: 4 });
        k.icon('person', 420, 820, 230, { p: k.at(0.1, 1.2) });
        k.line(420, 735, 470, 690, { p: k.at(1, 0.4), stroke: C.gray, width: 2, rough: 0.5 });
        skyBand(k, k.at('sky', 1.6, 'linear'));
        k.icon('cloud', 800, 230, 220, { p: k.at('sky', 1) });
        k.icon('cloud', 1250, 330, 160, { p: k.at('sky', 1.2, 'out') });
        k.icon('sun', 1620, 230, 230, { p: k.at('sun', 1.2) });
        k.text('không xanh?!', 1580, 610, { size: 84, font: 'title', color: C.red, p: k.at('sun', 1.5, 'linear') });
        k.icon('question', 1820, 590, 130, { p: k.at('sun', 1, 'back') });
      },
    },

    titleScene({
      say: 'Vậy tại sao bầu trời lại có màu xanh? Hãy cùng vẽ ra để hiểu nhé!',
      title: 'Tại sao bầu trời có màu xanh?',
      subtitle: 'Vẽ Là Hiểu · tập 1',
      icons: [{ name: 'sun', x: 260, y: 230, size: 200 }, { name: 'cloud', x: 1660, y: 250, size: 220 }, { name: 'eye', x: 1650, y: 840, size: 170 }],
    }),

    {
      chapter: 'Ánh sáng trắng là gì?',
      say: 'Bí mật đầu tiên nằm ở chính ánh sáng. Năm 1666, nhà khoa học Isaac Newton {prism}chiếu một tia nắng qua lăng kính thủy tinh. Và điều kỳ diệu xảy ra: {rainbow}ánh sáng trắng tách ra thành cả một dải cầu vồng. Đỏ, cam, vàng, lục, lam, chàm, tím. {mix}Nghĩa là, ánh sáng trắng thực chất là hỗn hợp của tất cả các màu.',
      draw(k) {
        k.text('Năm 1666 · Isaac Newton', k.W / 2, 110, { size: 70, font: 'title', p: k.at(0.2, 1.4, 'linear') });
        k.icon('sun', 170, 470, 190, { p: k.at(0.6, 1) });
        const pp = k.at('prism', 1);
        k.poly([[960, 260], [780, 640], [1140, 640]], { p: pp, fill: '#d9eef7', gap: 16, width: 4 });
        k.text('lăng kính', 960, 710, { size: 50, color: C.gray, fx: 'fade', p: pp });
        // tia sáng trắng
        const pb = k.at(k.cue('prism', 0.6), 0.9, 'linear');
        k.line(280, 470, k.lerp(280, 880, pb), k.lerp(470, 450, pb), { p: pb > 0 ? 1 : 0, width: 14, stroke: '#ffffff', rough: 0.3, seed: 3 });
        k.line(280, 470, k.lerp(280, 880, pb), k.lerp(470, 450, pb), { p: pb > 0 ? 1 : 0, width: 3, stroke: C.gray, rough: 0.6, seed: 4, alpha: 0.6 });
        k.text('ánh sáng trắng', 560, 400, { size: 46, color: C.gray, fx: 'fade', p: pb });
        // cầu vồng xoè ra
        RAINBOW.forEach((col, i) => {
          const p = k.at(k.cue('rainbow', i * 0.12), 0.9);
          const y2 = 420 + i * 62;
          k.line(1035, 455 + i * 6, k.lerp(1035, 1720, p), k.lerp(455 + i * 6, y2, p), { p: p > 0 ? 1 : 0, width: 11, stroke: col, rough: 0.4, seed: 20 + i });
        });
        ['đỏ', 'cam', 'vàng', 'lục', 'lam', 'chàm', 'tím'].forEach((n, i) => {
          k.text(n, 1800, 420 + i * 62, { size: 44, align: 'left', color: RAINBOW[i], fx: 'fade', p: k.at(k.cue('rainbow', 1.6 + i * 0.32), 0.4) });
        });
        const pm = k.at('mix', 2.2, 'linear');
        const b = k.text('Ánh sáng trắng = TẤT CẢ các màu', k.W / 2, 930, { size: 76, font: 'title', p: pm });
        k.highlight(k.W / 2 - b.w / 2 - 20, 895, b.w + 40, 80, { p: k.at(k.cue('mix', 2), 0.6) });
      },
    },

    {
      chapter: 'Sóng ánh sáng',
      say: 'Mỗi màu là một sóng ánh sáng, với bước sóng khác nhau. {red}Ánh sáng đỏ có sóng dài, khoảng 700 nanômét. {blue}Còn ánh sáng xanh lam có sóng ngắn hơn nhiều, chỉ khoảng 450 nanômét. {key}Hãy nhớ chi tiết này, vì nó chính là chìa khóa!',
      draw(k) {
        const ph = -k.t * 3;
        const pr = k.at('red', 1.4, 'linear');
        k.wave(300, 330, 1300, { amp: 70, len: 420, phase: ph, stroke: C.red, width: 7, p: pr });
        k.text('Đỏ: sóng dài ~700 nm', 300, 180, { size: 62, align: 'left', color: C.red, font: 'title', p: k.at(k.cue('red', 0.4), 1.4, 'linear') });
        // đo một bước sóng giữa hai đỉnh
        // thước đo một bước sóng
        const pa = k.at(k.cue('red', 2.2), 0.8);
        k.arrow(1180, 440, 1600, 440, { p: pa, head: 16, stroke: C.gray, width: 3 });
        k.arrow(1600, 440, 1180, 440, { p: pa, head: 16, stroke: C.gray, width: 3 });
        k.text('1 bước sóng', 1390, 478, { size: 40, color: C.gray, fx: 'fade', p: pa });
        const pb = k.at('blue', 1.4, 'linear');
        k.wave(300, 690, 1300, { amp: 70, len: 270, phase: ph * 1.5, stroke: C.blue, width: 7, p: pb });
        k.text('Xanh lam: sóng ngắn ~450 nm', 300, 540, { size: 62, align: 'left', color: C.blue, font: 'title', p: k.at(k.cue('blue', 0.4), 1.6, 'linear') });
        const pk = k.at('key', 1);
        k.icon('bulb', 1730, 520, 200, { p: pk });
        const b = k.text('Nhớ nhé: xanh = sóng NGẮN', k.W / 2, 940, { size: 70, font: 'title', p: k.at(k.cue('key', 0.4), 1.6, 'linear') });
        k.highlight(k.W / 2 - b.w / 2 - 20, 905, b.w + 40, 76, { p: k.at(k.cue('key', 2), 0.6), color: C.sky });
      },
    },

    {
      chapter: 'Khi ánh sáng gặp không khí',
      say: 'Trước khi đến mắt chúng ta, ánh sáng phải đi xuyên qua bầu khí quyển. {air}Không khí chứa vô số phân tử nitơ và ôxy, nhỏ hơn bước sóng ánh sáng cả nghìn lần. {hit}Khi ánh sáng va vào những phân tử tí hon này, nó bị bật ra theo mọi hướng. Hiện tượng này gọi là {name}tán xạ Rayleigh.',
      draw(k) {
        // Trái Đất và lớp khí quyển
        k.circle(960, 2300, 1500, { p: k.at(0.1, 1.4), fill: C.green, gap: 18, stroke: C.green, width: 5 });
        k.circle(960, 2300, 1720, { p: k.at(0.8, 1.6), stroke: C.sky, width: 4, rough: 0.8 });
        k.text('khí quyển', 1560, 640, { size: 48, color: C.blue, fx: 'fade', p: k.at(1.8, 0.6) });
        // các phân tử
        for (let i = 0; i < 26; i++) {
          const a = -Math.PI / 2 + (k.rand(i) - 0.5) * 1.15;
          const r = 1530 + k.rand(i + 50) * 170;
          const x = 960 + Math.cos(a) * r + Math.sin(k.gt * 1.3 + i) * 6, y = 2300 + Math.sin(a) * r + Math.cos(k.gt * 1.1 + i) * 6;
          const p = k.at(k.cue('air', i * 0.06), 0.5, 'back');
          if (p > 0) k.icon('molecule', x, y, 34 * p, { fill: i % 4 ? C.blue : C.red, seed: 300 + i });
        }
        k.text('N₂  ·  O₂', 380, 640, { size: 54, font: 'title', fx: 'fade', p: k.at(k.cue('air', 1.5), 0.6) });
        // phóng to một phân tử
        const pz = k.at('hit', 0.9);
        k.circle(1180, 280, 190, { p: pz, fill: '#fffaf0', fillStyle: 'solid', width: 4 });
        k.line(1040, 420, 1030, 600, { p: pz, stroke: C.gray, width: 2 });
        k.icon('molecule', 1180, 280, 110, { p: pz, fill: C.blue });
        k.line(860, 280, 1110, 280, { p: k.at(k.cue('hit', 0.6), 0.6, 'linear'), width: 8, stroke: '#ffffff', seed: 9 });
        k.line(860, 280, 1110, 280, { p: k.at(k.cue('hit', 0.6), 0.6, 'linear'), width: 2, stroke: C.gray, seed: 10 });
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + 0.3;
          k.arrow(1180 + Math.cos(a) * 70, 280 + Math.sin(a) * 70, 1180 + Math.cos(a) * 165, 280 + Math.sin(a) * 165, { p: k.at(k.cue('hit', 1.3 + i * 0.08), 0.5), stroke: C.blue, width: 4, head: 14 });
        }
        const pn = k.at('name', 1.3, 'linear');
        k.rect(390, 150, 470, 120, { p: k.at(k.cue('name', 0.9), 0.7), stroke: C.red, width: 4 });
        k.text('Tán xạ Rayleigh', 625, 212, { size: 66, font: 'title', p: pn, color: C.red });
      },
    },

    {
      chapter: 'Vì sao lại là màu xanh?',
      say: 'Và đây là điều thú vị nhất: {short}sóng càng ngắn thì càng bị tán xạ mạnh. {compare}Ánh sáng xanh lam bị tán xạ mạnh gần gấp sáu lần ánh sáng đỏ. {spread}Thế là màu xanh bị hắt tung ra khắp bầu trời, còn màu đỏ và màu vàng thì phần lớn đi thẳng.',
      draw(k) {
        const mx = 560, my = 520;
        k.text('Sóng càng ngắn → tán xạ càng mạnh', k.W / 2, 110, { size: 70, font: 'title', p: k.at('short', 1.8, 'linear') });
        k.icon('molecule', mx, my, 120, { p: k.at(0.2, 0.8), fill: C.blue });
        // tia đỏ đi thẳng
        const pr = k.at(k.cue('spread', 0.4), 1.2, 'linear');
        k.arrow(80, my, k.lerp(160, 1020, pr), my, { p: pr > 0 ? 1 : 0, stroke: C.red, width: 7, head: 26, rough: 0.5 });
        // tia xanh văng tứ phía
        for (let i = 0; i < 10; i++) {
          const a = (i / 10) * Math.PI * 2 + 0.25;
          const p = k.at(k.cue('spread', 1.2 + i * 0.1), 0.6);
          k.arrow(mx + Math.cos(a) * 90, my + Math.sin(a) * 90, mx + Math.cos(a) * 300, my + Math.sin(a) * 300, { p, stroke: C.blue, width: 6, head: 20 });
        }
        // biểu đồ so sánh
        const pc = k.at('compare', 1.4);
        const base = 900;
        k.line(1260, base, 1820, base, { p: k.at('compare', 0.6), width: 4 });
        k.rect(1330, base - 520 * pc, 160, 520 * pc, { p: pc > 0 ? 1 : 0, fill: C.blue, stroke: C.blue, seed: 51 });
        k.rect(1600, base - 89 * pc, 160, 89 * pc, { p: pc > 0 ? 1 : 0, fill: C.red, stroke: C.red, seed: 52 });
        k.text('xanh', 1410, base + 50, { size: 50, fx: 'fade', p: pc, color: C.blue });
        k.text('đỏ', 1680, base + 50, { size: 50, fx: 'fade', p: pc, color: C.red });
        k.text('×5,9', 1410, base - 520 * pc - 50, { size: 64, font: 'title', fx: 'pop', p: k.at(k.cue('compare', 1.2), 0.5) });
        k.text('×1', 1680, base - 89 * pc - 50, { size: 64, font: 'title', fx: 'pop', p: k.at(k.cue('compare', 1.2), 0.5) });
      },
    },

    {
      say: 'Vì ánh sáng xanh bị tán xạ khắp nơi, {eye}dù bạn nhìn về hướng nào trên bầu trời, cũng có ánh sáng xanh từ hướng đó bay vào mắt bạn. {blue}Và đó chính là lý do bầu trời có màu xanh!',
      draw(k) {
        const ox = 960, oy = 860;
        k.line(80, 960, k.W - 80, 960, { p: k.at(0, 0.7), width: 4 });
        k.icon('person', ox, oy, 200, { p: k.at(0.1, 1) });
        k.arc(ox, 960, 820, Math.PI, Math.PI * 2, { p: k.at(0.5, 1.4), stroke: C.sky, width: 5 });
        skyBand(k, k.at('blue', 1.6, 'linear'), C.sky, 380);
        for (let i = 0; i < 11; i++) {
          const a = Math.PI + 0.25 + (i / 10) * (Math.PI - 0.5);
          const sx = ox + Math.cos(a) * 780, sy = 960 + Math.sin(a) * 780;
          const ex = ox + Math.cos(a) * 190, ey = oy - 75 + Math.sin(a) * 120;
          k.arrow(sx, sy, ex, ey, { p: k.at(k.cue('eye', i * 0.15), 0.9), stroke: C.blue, width: 5, head: 20 });
        }
        k.icon('eye', 1650, 820, 160, { p: k.at('eye', 0.8) });
        k.text('Bầu trời XANH!', k.W / 2, 140, { size: 110, font: 'title', fx: 'pop', p: k.at(k.cue('blue', 1.6), 0.7), outline: C.white });
        k.icon('check', 1430, 140, 140, { p: k.at(k.cue('blue', 2.2), 0.7) });
      },
    },

    {
      chapter: 'Sao không phải màu tím?',
      say: 'Nhưng khoan đã! {violet}Ánh sáng tím có sóng còn ngắn hơn, lẽ ra phải bị tán xạ mạnh hơn nữa. Vậy sao trời không màu tím? {r1}Thứ nhất, ánh sáng Mặt Trời vốn chứa ít màu tím hơn. {r2}Thứ hai, một phần ánh tím bị hấp thụ ở tầng khí quyển cao. {r3}Và quan trọng nhất, mắt người nhạy với màu xanh hơn nhiều so với màu tím.',
      draw(k) {
        const pt = k.at(0.1, 1.2, 'linear');
        const b = k.text('Khoan đã… sao không phải màu TÍM?', k.W / 2, 120, { size: 78, font: 'title', p: pt });
        k.underline(k.W / 2 - b.w / 2, 180, b.w, { p: k.at(1.2, 0.5), stroke: C.purple });
        k.wave(560, 300, 800, { amp: 40, len: 150, phase: -k.t * 4, stroke: C.purple, width: 6, p: k.at('violet', 1.2, 'linear') });
        k.text('tím: ~400 nm', 1480, 300, { size: 50, color: C.purple, fx: 'fade', p: k.at('violet', 0.8), align: 'left' });
        const rows = [
          ['sun', 'Mặt Trời phát ra ít ánh tím hơn', 'r1'],
          ['earth', 'Một phần bị hấp thụ trên tầng cao', 'r2'],
          ['eye', 'Mắt người nhạy với màu xanh hơn', 'r3'],
        ];
        rows.forEach(([ic, txt, cue], i) => {
          const y = 500 + i * 170;
          k.text(`${i + 1}.`, 330, y, { size: 80, font: 'title', fx: 'pop', p: k.at(cue, 0.5), color: C.purple });
          k.icon(ic, 490, y, 130, { p: k.at(cue, 1) });
          k.text(txt, 620, y, { size: 64, align: 'left', p: k.at(k.cue(cue, 0.3), 1.8, 'linear') });
        });
        k.highlight(610, 795, 960, 80, { p: k.at(k.cue('r3', 2.4), 0.6), color: C.sky });
      },
    },

    {
      chapter: 'Vì sao hoàng hôn màu đỏ?',
      say: 'Còn lúc hoàng hôn thì sao? {low}Khi Mặt Trời xuống thấp, ánh sáng phải đi xuyên qua một lớp không khí dày hơn rất nhiều. {lost}Trên quãng đường dài ấy, ánh xanh đã bị tán xạ đi gần hết. {red}Chỉ còn lại ánh đỏ và cam đến được mắt bạn. Và bầu trời rực lên sắc hoàng hôn.',
      minDur: 18,
      draw(k) {
        const ox = 760, oy = 760;
        // nền chiều tà
        const pr = k.at(k.cue('red', 0.5), 2.2, 'linear');
        if (pr > 0) {
          const g = k.ctx.createLinearGradient(0, 0, 0, k.H);
          g.addColorStop(0, 'rgba(240,138,36,0.05)'); g.addColorStop(0.7, 'rgba(240,110,40,0.42)'); g.addColorStop(1, 'rgba(240,110,40,0.3)');
          k.ctx.save(); k.ctx.globalAlpha = pr; k.ctx.fillStyle = g; k.ctx.fillRect(0, 0, k.W, k.H); k.ctx.restore();
        }
        k.circle(760, 2140, 1400, { p: k.at(0.1, 1.2), fill: C.green, stroke: C.green, gap: 18, width: 5 });
        k.circle(760, 2140, 1620, { p: k.at(0.6, 1.4), stroke: C.sky, width: 4 });
        k.icon('person', ox, oy - 50, 90, { p: k.at(0.8, 0.8) });
        // buổi trưa: đường ngắn
        k.icon('sun', ox, 150, 150, { p: k.at(1.2, 0.8) });
        k.line(ox, 230, ox, oy - 110, { p: k.at(1.8, 0.8), stroke: C.yellow, width: 8, rough: 0.4 });
        k.text('buổi trưa: đường ngắn', ox - 60, 410, { size: 46, align: 'right', fx: 'fade', p: k.at(2.2, 0.6), color: C.gray });
        // hoàng hôn: đường dài
        const pl = k.at('low', 1);
        k.icon('sun', 1780, oy - 70, 150, { p: pl, fill: C.orange });
        const pa = k.at(k.cue('low', 0.8), 1.6, 'linear');
        k.line(1700, oy - 70, k.lerp(1700, ox + 40, pa), k.lerp(oy - 70, oy - 80, pa), { p: pa > 0 ? 1 : 0, stroke: C.orange, width: 8, rough: 0.4, seed: 77 });
        k.text('hoàng hôn: đường RẤT dài', 1330, oy + 20, { size: 50, fx: 'fade', p: k.at(k.cue('low', 2.4), 0.6), color: C.red });
        // ánh xanh rơi rụng dọc đường
        for (let i = 0; i < 6; i++) {
          const x = 1600 - i * 135, y = oy - 72;
          const ang = -Math.PI / 2 + (i % 2 ? 0.5 : -0.5);
          k.arrow(x, y, x + Math.cos(ang) * 120, y + Math.sin(ang) * 120, { p: k.at(k.cue('lost', i * 0.25), 0.6), stroke: C.blue, width: 5, head: 16 });
        }
        k.text('Hoàng hôn!', 1400, 200, { size: 96, font: 'title', fx: 'pop', p: k.at(k.cue('red', 2.5), 0.7), color: C.red, outline: C.white });
      },
    },

    {
      chapter: 'Bonus: bầu trời sao Hỏa',
      say: 'Một sự thật thú vị: {mars}trên sao Hỏa, mọi thứ lại ngược lại! {day}Ban ngày, bầu trời ở đó có màu vàng cam như bơ, {dusk}còn hoàng hôn lại mang sắc xanh lam. Lý do là {dust}bụi mịn trên sao Hỏa tán xạ ánh sáng theo một cách hoàn toàn khác.',
      draw(k) {
        const pm = k.at('mars', 1.2);
        k.circle(300, 540, 190, { p: pm, fill: '#d9673c', stroke: '#a8452a', width: 5, gap: 12 });
        k.circle(240, 470, 32, { p: k.at(k.cue('mars', 0.8), 0.6), stroke: '#a8452a' });
        k.circle(370, 620, 44, { p: k.at(k.cue('mars', 1), 0.6), stroke: '#a8452a' });
        k.circle(350, 440, 18, { p: k.at(k.cue('mars', 1.1), 0.6), stroke: '#a8452a' });
        k.text('Sao Hỏa', 300, 820, { size: 70, font: 'title', p: k.at(k.cue('mars', 0.6), 1, 'linear'), color: '#a8452a' });
        // hai khung trời
        const panel = (x, label, sky, sunY, cue) => {
          const p = k.at(cue, 1.2);
          k.rect(x, 200, 520, 560, { p, fill: sky, gap: 10, fillWeight: 3, width: 4 });
          k.line(x, 640, x + 520, 640, { p, width: 4 });
          k.poly([[x, 640], [x + 120, 590], [x + 260, 625], [x + 400, 580], [x + 520, 615], [x + 520, 640]], { p, fill: '#b5532e', stroke: '#8a3b1f' });
          k.circle(x + 260, sunY, 42, { p: k.at(k.cue(cue, 0.6), 0.6), fill: '#fff6d8', fillStyle: 'solid', stroke: C.ink });
          k.text(label, x + 260, 830, { size: 60, font: 'title', p: k.at(k.cue(cue, 0.4), 1, 'linear') });
        };
        panel(640, 'Ban ngày', '#e8b26a', 330, 'day');
        panel(1260, 'Hoàng hôn', '#6fa8dc', 560, 'dusk');
        for (let i = 0; i < 40; i++) {
          const p = k.at(k.cue('dust', i * 0.03), 0.4);
          k.dot(640 + k.rand(i) * 1140, 220 + k.rand(i + 99) * 520 + Math.sin(k.gt + i) * 5, 4, '#8a3b1f', p * 0.7);
        }
        k.text('bụi mịn', k.W / 2 + 330, 140, { size: 56, color: '#8a3b1f', fx: 'fade', p: k.at('dust', 0.6) });
      },
    },

    bulletsScene({
      chapter: 'Tóm tắt',
      say: 'Tóm lại nhé: {a}ánh sáng trắng gồm nhiều màu. {b}Không khí tán xạ ánh sáng xanh mạnh hơn ánh sáng đỏ. {c}Ánh xanh lan khắp bầu trời và đi vào mắt ta từ mọi hướng. Đơn giản vậy thôi!',
      title: 'Tóm tắt',
      items: [
        { text: 'Ánh sáng trắng = nhiều màu gộp lại', cue: 'a', icon: 'sun' },
        { text: 'Không khí tán xạ màu xanh mạnh nhất', cue: 'b', icon: 'molecule' },
        { text: 'Ánh xanh đến mắt ta từ mọi hướng', cue: 'c', icon: 'eye' },
      ],
    }),

    subscribeScene({
      say: 'Và đây là câu hỏi cho bạn: {q}nếu bầu trời xanh là vì tán xạ, vậy tại sao mây lại màu trắng? Hãy để lại dự đoán của bạn ở phần bình luận. {sub}Và đừng quên đăng ký kênh Vẽ Là Hiểu, để xem lời giải trong video tiếp theo nhé!',
      question: 'Vậy tại sao mây lại màu TRẮNG?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.5,
    }),
  ],

  // Ảnh thu nhỏ: chữ to, tương phản mạnh, một hình gây tò mò.
  thumbnail(k) {
    k.rect(0, 0, k.W, k.H, { fill: C.sky, fillStyle: 'solid', stroke: 'none', seed: 1 });
    k.rect(-60, -60, k.W + 120, k.H + 120, { fill: '#5fb4e8', stroke: 'none', gap: 22, fillWeight: 6, rough: 2.5, seed: 2 });
    k.icon('sun', 330, 330, 420, {});
    k.icon('cloud', 1600, 900, 380, {});
    k.icon('person', 560, 830, 320, { fill: C.white });
    k.text('TẠI SAO', 1300, 300, { size: 190, font: 'title', color: C.white, outline: C.ink, outlineWidth: 28 });
    k.text('TRỜI XANH?', 1270, 540, { size: 210, font: 'title', color: C.yellow, outline: C.ink, outlineWidth: 30 });
    k.icon('question', 1050, 800, 260, { stroke: C.red });
  },
};
