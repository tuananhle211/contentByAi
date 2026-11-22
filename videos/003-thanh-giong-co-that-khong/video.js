// Tập 1 — Thánh Gióng có thật không? (bản tếu táo, nhiều giọng, có hiệu ứng âm thanh)
// Bản kể nghiêm túc trước đây: ban-nghiem-tuc.js.bak
// Nguồn đối chiếu: Việt điện u linh (Lý Tế Xuyên, 1329); Lĩnh Nam chích quái (thế kỷ 14–15);
// Đại Việt sử ký toàn thư (Ngô Sĩ Liên, 1479); UNESCO ghi danh Hội Gióng năm 2010; nhà Ân/Thương ~1600–1046 TCN;
// Kinh Thi (bài Sinh dân): Khương Nguyên giẫm dấu chân thần, sinh Hậu Tắc.
// Giọng châm biếm nhắm vào sự vô lý của chi tiết và vào chính người thời nay — không giễu anh hùng.
import { C } from '/engine/kit.js';
import { titleScene, bulletsScene, subscribeScene } from '/engine/templates.js';
import * as thumbs from '/videos/003-thanh-giong-co-that-khong/thumbs.js';

const IRON = '#8d939c';
const GROUND = 880;

// ---------- trợ giúp vẽ dùng trong tập ----------
function chap(k, n, title) {
  k.text(`Chương ${n} · ${title}`, 60, 56, { size: 34, align: 'left', color: C.gray, fx: 'fade', p: k.at(0, 0.6), outline: '#fffaf0', outlineWidth: 8 });
}
function cap(k, text, cue, o = {}) {
  const p = k.at(cue, o.dur ?? 1.6, 'linear');
  const y = o.y ?? 995;
  const b = k.text(text, k.W / 2, y, { size: o.size ?? 60, font: 'title', p, maxWidth: 1760, color: o.color ?? C.ink, outline: '#fffaf0', outlineWidth: 12 });
  if (o.hl) k.highlight(k.W / 2 - b.w / 2 - 16, y - 36, b.w + 32, 72, { p: k.at(k.cue(cue, (o.dur ?? 1.6) + 0.2), 0.5), color: o.hl });
}
// Phông ngoài trời: trời + đồi, mặt đất ở GROUND.
function outdoor(k, kind = 'day') { k.backdrop(kind, { ground: GROUND }); }
function riding(k, x, y, size, o = {}) {
  k.icon('horse', x, y, size, { p: o.p ?? 1, fire: o.fire ?? 0, shadow: true });
  k.icon('warrior', x - size * 0.06, y - size * 0.5, size * 0.62, { p: o.p ?? 1, rod: o.rod, face: o.face ?? 'angry', shadow: false });
}
function armor(k, x, y, s, p) {
  k.group({ x, y, s }, () => {
    k.poly([[-40, -50], [40, -50], [34, 40], [-34, 40]], { p, fill: IRON, gap: 7 });
    k.poly([[-40, -50], [-62, -30], [-50, -10], [-40, -24]], { p, fill: IRON, gap: 7 });
    k.poly([[40, -50], [62, -30], [50, -10], [40, -24]], { p, fill: IRON, gap: 7 });
    for (const yy of [-28, -6, 16]) k.line(-30, yy, 30, yy, { p, width: 2 });
  });
}
function pin(k, x, y, n, p) {
  if (p <= 0) return;
  k.group({ x, y, s: k.ease.back(p) }, () => {
    k.path('M 0 0 Q -34 -44 -26 -70 Q -14 -96 0 -96 Q 14 -96 26 -70 Q 34 -44 0 0 Z', { fill: C.red, fillStyle: 'solid', seed: 500 + n });
    k.text(String(n), 0, -66, { size: 40, font: 'title', color: C.white });
  });
}
function spear(k, x, y, s, color, p) {
  k.group({ x, y, s }, () => {
    k.line(0, 90, 0, -60, { p, width: 9, stroke: C.brown });
    k.poly([[0, -60], [-20, -100], [0, -170], [20, -100]], { p, fill: color, fillStyle: 'solid', width: 4 });
    k.line(0, -66, 0, -150, { p, width: 2 });
  });
}
// Lời thoại trong bong bóng: hiện từ cue `c`.
function say(k, text, c, box, tail, o = {}) {
  k.bubble(box[0], box[1], box[2], box[3], tail[0], tail[1], { p: k.at(c, 0.5), text, size: o.size ?? 50, seed: o.seed, think: o.think });
}

export default {
  meta: {
    title: 'Thánh Gióng có thật không? Truyền thuyết và sử sách nói gì',
    description: `Thánh Gióng có thật không? Ba tuổi chưa biết nói, câu đầu tiên đã đòi ngựa sắt; ăn bảy nong cơm, ba nong cà; nhổ tre đánh giặc Ân… Truyền thuyết Thánh Gióng kể vậy, nhưng sử sách và khảo cổ học lại kể một câu chuyện khác.
Vẽ Là Hiểu soi truyền thuyết theo cách vui nhất: sách cổ nào chép chuyện Gióng, vì sao "giặc Ân" và "ngựa sắt" không khớp với lịch sử, và người xưa thật sự muốn gửi gắm điều gì.`,
    footer: `📚 Nguồn tham khảo: Việt điện u linh (1329), Lĩnh Nam chích quái, Đại Việt sử ký toàn thư (1479), Kinh Thi, hồ sơ UNESCO về Hội Gióng (2010).
🔔 Đăng ký Vẽ Là Hiểu để cùng soi truyền thuyết và lịch sử Việt.
💬 Tập sau: Sơn Tinh – Thủy Tinh đánh nhau vì một cô gái, hay vì… con đê? Đoán thử ở phần bình luận nhé!`,
    tags: ['thánh gióng', 'truyền thuyết thánh gióng', 'thánh gióng có thật không', 'phù đổng thiên vương', 'giặc ân', 'hội gióng', 'truyền thuyết việt nam', 'lịch sử việt nam', 'sử việt', 'vẽ là hiểu', 'lịch sử hài hước'],
    hashtags: ['thanhgiong', 'truyenthuyetvietnam', 'suviet'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '-2%',
    voices: {
      kid: { voice: 'vi-VN-HoaiMyNeural', pitch: '+35Hz', rate: '+10%' },
      giant: { voice: 'vi-VN-NamMinhNeural', pitch: '-22Hz', rate: '-12%' },
      mom: { voice: 'vi-VN-HoaiMyNeural', pitch: '-5Hz', rate: '+4%' },
      envoy: { voice: 'vi-VN-NamMinhNeural', pitch: '+28Hz', rate: '+18%' },
      enemy: { voice: 'vi-VN-NamMinhNeural', pitch: '-30Hz', rate: '+4%' },
      smith: { voice: 'vi-VN-NamMinhNeural', pitch: '+10Hz', rate: '-6%' },
      villager: { voice: 'vi-VN-HoaiMyNeural', pitch: '+12Hz', rate: '+14%' },
    },
    paper: '#f3e6c9',
    music: 'assets/music/background.mp3',
    musicVolume: 0.09,
    sfxVolume: 0.5,
  },

  scenes: [
    // ---------------- Mở đầu ----------------
    {
      chapter: 'Mở đầu',
      lead: 0.2,
      say: 'Ba tuổi. {kid}Không nói, không cười, không biết đi. Đặt đâu nằm đấy, {office}y hệt chúng ta mỗi sáng thứ Hai.',
      sfx: [['pop', 'kid'], ['slideDown', 'office', 0.6]],
      draw(k) {
        outdoor(k, 'day');
        k.group({ x: 520, y: GROUND - 40, r: -1.5 }, () => k.icon('child', 0, 0, 260, { p: k.at('kid', 1), face: 'blank', shadow: false }));
        k.text('z z z', 640, 640, { size: 60, font: 'title', color: C.gray, fx: 'fade', p: k.at(k.cue('kid', 1.5), 0.6) });
        const po = k.at('office', 0.8);
        k.rect(1150, 640, 560, 30, { p: po, fill: C.brown, fillStyle: 'solid' });
        k.line(1200, 670, 1200, GROUND, { p: po, width: 6 });
        k.line(1660, 670, 1660, GROUND, { p: po, width: 6 });
        k.group({ x: 1420, y: 560, r: 1.2 }, () => k.icon('person', 0, 0, 200, { p: po, face: 'blank', shadow: false }));
        k.rect(1545, 430, 190, 140, { p: k.at(k.cue('office', 0.5), 0.6), fill: C.white, fillStyle: 'solid' });
        k.text('THỨ HAI', 1640, 500, { size: 36, font: 'title', color: C.red, fx: 'pop', p: k.at(k.cue('office', 0.8), 0.5) });
      },
    },
    {
      say: 'Thế mà một ngày đẹp trời, {giant}cậu bé vươn vai một cái, cao bằng cái nhà, {horse}cưỡi ngựa sắt phun lửa đi đánh giặc. {q}Câu hỏi là: chuyện này có thật không? Hay ông bà mình kể chuyện hơi bị… phóng khoáng?',
      sfx: [['boom', 'giant'], ['whoosh', 'horse', 0.8], ['scratch', 'q', 0.8], ['boing', ['q', 4.2], 0.6]],
      draw(k) {
        outdoor(k, 'sunset');
        const sh = k.shake('giant', 0.6, 14);
        k.group(sh, () => {
          const g = k.at('giant', 1.2, 'back');
          k.icon('house', 260, GROUND - 90, 220, {});
          k.group({ x: 640, y: GROUND, s: 0.3 + 0.7 * g }, () => k.icon('warrior', 0, -230, 480, { face: 'smug' }));
          k.burst(880, 260, 90, 'BÙM!', { p: k.at('giant', 0.4) });
          riding(k, 1380, 662, 420, { p: k.at('horse', 1.2), fire: k.at(k.cue('horse', 1), 0.6) });
        });
        k.icon('question', 1720, 230, 200, { p: k.at('q', 0.8, 'back') });
        cap(k, 'Thánh Gióng có thật không?', 'q', { dur: 1.2, hl: C.yellow });
      },
    },
    titleScene({
      say: 'Hôm nay, Vẽ Là Hiểu sẽ làm thám tử lịch sử: lật sách cổ, soi khảo cổ, và hỏi thẳng con ngựa sắt.',
      title: 'Thánh Gióng có thật không?',
      subtitle: 'Thám tử lịch sử · Vẽ Là Hiểu',
      icons: [{ name: 'warrior', x: 230, y: 300, size: 260, face: 'smug' }, { name: 'bamboo', x: 1690, y: 300, size: 260 }, { name: 'scroll', x: 300, y: 820, size: 200 }, { name: 'horse', x: 1620, y: 840, size: 260 }],
    }),

    // ---------------- Chương 1 ----------------
    {
      chapter: 'Truyền thuyết kể gì?',
      say: [
        'Chuyện kể rằng, đời Hùng Vương thứ sáu, {village}làng Phù Đổng có một bà mẹ hiền lành. {foot}Một hôm ra đồng, bà thấy một vết chân to khủng khiếp. Người bình thường thấy vậy là chạy. Còn bà thì…',
        { v: 'mom', text: '{try}Ủa, chân ai mà to dữ vậy ta? Ướm thử coi!' },
        '{back}Và thế là bà mang thai. Đừng hỏi khoa học vội, đây là truyền thuyết.',
      ],
      sfx: [['pop', 'village'], ['boom', 'foot', 0.5], ['boing', 'try', 0.7], ['sparkle', 'back', 0.7]],
      draw(k) {
        chap(k, 1, 'Truyền thuyết kể gì?');
        outdoor(k, 'day');
        const pv = k.at('village', 1.6);
        k.icon('bamboo', 160, 760, 240, { p: pv });
        [[310, 800], [470, 815], [630, 800]].forEach(([x, y], i) => k.icon('house', x, y, 150, { p: k.seq(pv, i, 3, 0.3) }));
        k.text('làng Phù Đổng', 470, 620, { size: 50, font: 'title', fx: 'fade', p: k.at(k.cue('village', 1), 0.6), outline: '#fffaf0', outlineWidth: 10 });
        const walk = k.at('try', 1.2, 'inOut');
        const mood = k.t > k.cue('back') ? 'shock' : k.t > k.cue('try') ? 'happy' : 'calm';
        k.icon('woman', k.lerp(1020, 1300, walk), GROUND - 120, 260, { p: k.at(k.cue('village', 1.2), 1.2), face: mood, bob: 2 });
        k.icon('footprint', 1500, 800, 330, { p: k.at('foot', 1.2), rotate: -0.25, shadow: false });
        say(k, 'Ủa, chân ai mà to dữ vậy ta?', 'try', [1180, 200, 600, 150], [1250, 560]);
        k.icon('heart', 1180, 520, 100, { p: k.at('back', 0.8, 'back') });
        cap(k, 'Đây là truyền thuyết!', k.cue('back', 1.4));
      },
    },
    {
      say: [
        'Mười hai tháng sau, {born}cậu bé chào đời. Mười hai tháng nhé, chứ không phải chín. Ngay từ đầu đã thích làm khác người. {three}Nhưng lên ba tuổi rồi, cậu vẫn không nói, không cười, không đi. Cả làng bắt đầu bàn tán.',
        { v: 'villager', text: '{gossip}Thằng bé nhà đó chắc lười lắm luôn á!' },
      ],
      sfx: [['sparkle', 'born', 0.7], ['click', ['three', 0.9]], ['click', ['three', 1.8]], ['click', ['three', 2.7]], ['pop', 'gossip']],
      draw(k) {
        chap(k, 1, 'Truyền thuyết kể gì?');
        k.icon('child', 560, 600, 320, { p: k.at('born', 1.2), face: k.t > k.cue('three') ? 'blank' : 'happy', bob: 1.5 });
        for (let i = 0; i < 5; i++) k.icon('star', 560 + Math.cos(i * 1.3) * 250, 540 + Math.sin(i * 1.3) * 220, 60, { p: k.at(k.cue('born', 0.6 + i * 0.12), 0.4, 'back') });
        k.text('12 tháng?!', 560, 230, { size: 70, font: 'title', color: C.purple, fx: 'pop', p: k.at(k.cue('born', 1.4), 0.5) });
        k.text('3 tuổi', 1330, 200, { size: 110, font: 'title', fx: 'pop', p: k.at('three', 0.5), color: C.red });
        ['không nói', 'không cười', 'không đi'].forEach((t, i) => {
          const c = k.cue('three', 0.9 + i * 0.9);
          k.icon('cross', 1080, 360 + i * 120, 70, { p: k.at(c, 0.5) });
          k.text(t, 1150, 360 + i * 120, { size: 58, align: 'left', p: k.at(c, 0.8, 'linear') });
        });
        k.icon('woman', 1660, 900, 200, { p: k.at('gossip', 0.6), face: 'smug', fill: C.purple, hat: '#d9c38a' });
        say(k, 'Thằng bé nhà đó chắc lười lắm luôn á!', 'gossip', [960, 690, 560, 120], [1610, 800], { size: 44 });
      },
    },
    {
      say: [
        'Rồi tin dữ ập đến: {enemy}giặc Ân kéo sang.',
        { v: 'enemy', text: '{boss}Đất này đẹp đấy. Cho ta xin nhé!' },
        '{king}Vua Hùng lo sốt vó, sai sứ giả đi khắp nơi tìm người tài. {run}Thời đó chưa có mạng tuyển dụng, nên sứ giả phải chạy bộ.',
        { v: 'envoy', text: '{job}Ai đánh được giặc không? Đãi ngộ hấp dẫn!' },
      ],
      sfx: [['drumroll', 'enemy', 0.5], ['bonk', 'boss', 0.4], ['whoosh', 'run', 0.5], ['cash', 'job', 0.5]],
      draw(k) {
        chap(k, 1, 'Truyền thuyết kể gì?');
        outdoor(k, 'day');
        const e = k.at('enemy', 3);
        for (let i = 0; i < 6; i++) {
          const x = -150 + e * (300 + (i % 3) * 160) + Math.floor(i / 3) * 90;
          k.icon('soldier', x, GROUND - 100 - Math.floor(i / 3) * 40, 200, { bob: 3, face: i === 2 ? 'smug' : 'angry' });
        }
        k.text('Giặc Ân', 230, 200, { size: 84, font: 'title', color: C.red, fx: 'pop', p: k.at(k.cue('enemy', 0.4), 0.6), outline: C.white, outlineWidth: 12 });
        say(k, 'Đất này đẹp đấy. Cho ta xin nhé!', 'boss', [420, 300, 560, 130], [520, 640], { size: 44 });
        k.icon('king', 1250, GROUND - 120, 250, { p: k.at('king', 1), face: k.t > k.cue('king', 0.6) ? 'shock' : 'calm' });
        k.sweat(1290, 690, 2, { p: k.at(k.cue('king', 0.8), 0.3) });
        const w = k.at('run', 3, 'inOut');
        const ex = k.lerp(1430, 1720, w);
        k.icon('person', ex, GROUND - 95, 200, { p: k.at(k.cue('king', 1.6), 0.6), fill: C.sky, face: 'shout', bob: 6 });
        k.icon('scroll', ex + 50, GROUND - 120, 60, { p: k.at(k.cue('king', 1.6), 0.6) });
        k.motion(ex - 40, GROUND - 110, 1, 0, { p: k.at('run', 0.4), n: 3, len: 90 });
        say(k, 'Ai đánh được giặc không? Đãi ngộ hấp dẫn!', 'job', [1240, 150, 620, 150], [1650, 620], { size: 44 });
      },
    },
    {
      say: [
        'Sứ giả vừa tới làng Phù Đổng, {speak}thì cậu bé ba năm im lặng bỗng mở miệng. Câu đầu tiên trong đời là:',
        { v: 'kid', text: '{quote}Mẹ ơi, mời ông sứ giả vào đây cho con!' },
        '{mom}Ba năm chờ con nói, câu đầu tiên đã là… chuyện việc nước.',
      ],
      sfx: [['drumroll', 'speak', 0.5], ['pop', 'quote'], ['boing', 'mom', 0.6]],
      draw(k) {
        chap(k, 1, 'Truyền thuyết kể gì?');
        outdoor(k, 'day');
        k.icon('house', 260, GROUND - 100, 240, {});
        k.icon('woman', 520, GROUND - 120, 260, { p: k.at(0.2, 1), face: k.t > k.cue('quote', 0.5) ? 'shock' : 'calm' });
        k.burst(560, 470, 60, '!?', { p: k.at('mom', 0.4), size: 50 });
        k.icon('child', 820, GROUND - 92, 200, { p: k.at(0.4, 1), face: k.t > k.cue('quote') ? 'shout' : 'blank', bob: 1 });
        say(k, 'Mẹ ơi, mời ông sứ giả vào đây cho con!', 'quote', [960, 260, 800, 220], [860, 700], { size: 54 });
        k.icon('person', 1700, GROUND - 95, 180, { p: k.at(0.6, 0.8), fill: C.sky, face: k.t > k.cue('quote') ? 'shock' : 'calm' });
      },
    },
    {
      say: [
        { v: 'kid', text: 'Ông về tâu vua, rèn cho ta {h}một con ngựa sắt, {r}một cây roi sắt, {a}một tấm áo giáp sắt. Ta sẽ đánh tan lũ giặc!' },
        '{order}Ba tuổi, chưa ra khỏi nhà lần nào, mà đặt hàng như đại gia.',
        { v: 'envoy', text: '{yes}Dạ… dạ vâng ạ!' },
      ],
      sfx: [['pop', 'h'], ['pop', 'r'], ['pop', 'a'], ['cash', 'order', 0.6], ['slideDown', 'yes', 0.5]],
      draw(k) {
        chap(k, 1, 'Truyền thuyết kể gì?');
        k.icon('child', 200, 650, 220, { face: 'smug', bob: 1.5 });
        k.icon('horse', 760, 640, 320, { p: k.at('h', 1.2) });
        k.line(1120, 780, 1260, 440, { p: k.at('r', 0.8), width: 14, stroke: '#4a4f57' });
        armor(k, 1540, 620, 1.7, k.at('a', 1.2));
        [['ngựa sắt', 760, 'h'], ['roi sắt', 1190, 'r'], ['áo giáp sắt', 1540, 'a']].forEach(([t, x, c]) => k.text(t, x, 860, { size: 56, font: 'title', p: k.at(k.cue(c, 0.4), 1, 'linear') }));
        k.rect(560, 160, 1220, 130, { p: k.at('order', 0.6), fill: '#fffaf0', fillStyle: 'solid', width: 4 });
        k.text('ĐƠN HÀNG: 1 ngựa + 1 roi + 1 giáp — giao gấp', 1170, 225, { size: 50, font: 'title', p: k.at(k.cue('order', 0.3), 1.6, 'linear'), color: C.red });
        k.icon('person', 1800, 840, 160, { p: k.at('yes', 0.5), fill: C.sky, face: 'shock' });
        k.sweat(1835, 760, 1.6, { p: k.at('yes', 0.3) });
      },
    },
    {
      say: [
        'Từ hôm đó, {grow}Gióng lớn nhanh như thổi. Áo vừa may đã chật, cơm vừa chín đã hết. {rice}Cả làng phải góp gạo nuôi. {seven}Tương truyền, Gióng ăn bảy nong cơm, ba nong cà, uống một hơi cạn cả khúc sông.',
        { v: 'villager', text: '{bill}Nuôi một đứa mà như nuôi cả trung đoàn!' },
      ],
      sfx: [['slideUp', 'grow', 0.7], ['gulp', 'seven'], ['gulp', ['seven', 0.7]], ['gulp', ['seven', 1.4]], ['cash', 'bill', 0.7]],
      draw(k) {
        chap(k, 1, 'Truyền thuyết kể gì?');
        outdoor(k, 'day');
        const g = k.at('grow', 5, 'inOut');
        k.group({ x: 520, y: GROUND, s: 1 + g * 1.9 }, () => k.icon('child', 0, -92, 200, { face: k.t > k.cue('seven') ? 'laugh' : 'happy', bob: 1 }));
        k.line(260, GROUND, 260, 220, { p: k.at('grow', 0.8), width: 3, stroke: C.gray });
        for (let i = 0; i <= 6; i++) k.line(245, GROUND - i * 110, 275, GROUND - i * 110, { p: k.at(k.cue('grow', 0.3 + i * 0.1), 0.3), width: 3, stroke: C.gray });
        const houses = [1300, 1520, 1740];
        houses.forEach((x, i) => k.icon('house', x, GROUND - 70, 140, { p: k.at(k.cue('rice', i * 0.2), 0.8) }));
        houses.forEach((x, i) => {
          const m = k.at(k.cue('rice', 1 + i * 0.6), 2.2, 'inOut');
          k.icon('rice', k.lerp(x, 820 + i * 120, m), GROUND - 60 - Math.sin(m * Math.PI) * 120, 120, { p: k.at(k.cue('rice', 0.8 + i * 0.6), 0.5), fill: i === 2 ? C.purple : C.white });
        });
        k.text('7 nong cơm · 3 nong cà', 1180, 430, { size: 70, font: 'title', p: k.at('seven', 2, 'linear'), color: C.brown, outline: '#fffaf0', outlineWidth: 12 });
        say(k, 'Nuôi một đứa mà như nuôi cả trung đoàn!', 'bill', [1100, 120, 780, 120], [1740, 790], { size: 44 });
      },
    },
    {
      say: [
        'Giặc đến chân núi Trâu. {stretch}Gióng đứng dậy, vươn vai một cái, {big}và thành tráng sĩ cao lớn phi thường.',
        { v: 'giant', text: '{line}Giặc ở đâu? Để đó cho ta!' },
        '{mount}Mặc giáp, cầm roi, nhảy lên ngựa. {neigh}Ngựa sắt hí vang, phun lửa phừng phừng.',
      ],
      sfx: [['slideUp', 'stretch', 0.6], ['boom', 'big'], ['boom', 'mount', 0.5], ['whoosh', 'neigh', 0.9], ['whoosh', ['neigh', 0.6], 0.7]],
      draw(k) {
        chap(k, 1, 'Truyền thuyết kể gì?');
        outdoor(k, 'sunset');
        const sh = k.shake('big', 0.6, 16);
        k.group(sh, () => {
          const s = k.at('big', 1.2, 'back');
          const m = k.at('mount', 0.8);
          k.group({ x: 760, y: GROUND, s: 0.4 + 0.6 * s, a: 1 - m }, () => k.icon('warrior', 0, -250, 520, { rod: false, face: k.t > k.cue('line') ? 'shout' : 'smug' }));
          for (let i = 0; i < 6; i++) {
            const a = -Math.PI / 2 + (i - 2.5) * 0.35;
            k.line(760 + Math.cos(a) * 340, 450 + Math.sin(a) * 340, 760 + Math.cos(a) * 420, 450 + Math.sin(a) * 420, { p: k.at(k.cue('big', 0.2), 0.4) * (1 - m), stroke: C.orange, width: 7 });
          }
          k.group({ a: 1 - m }, () => say(k, 'Giặc ở đâu? Để đó cho ta!', 'line', [1080, 160, 660, 140], [960, 420], { size: 50 }));
          const run = k.at('neigh', 3, 'in');
          k.group({ x: run * 260, a: m }, () => riding(k, 900, 590, 560, { fire: k.at('neigh', 0.6), face: 'shout' }));
          k.motion(620 + run * 260, 560, 1, 0, { p: k.at('neigh', 0.3), n: 5, len: 160, gap: 40 });
        });
      },
    },
    {
      say: [
        'Gióng đánh đến đâu, giặc ngã rạp đến đó. {broke}Đang hăng thì… rắc! Roi sắt gãy. {bamboo}Không sao. Gióng nhổ luôn bụi tre bên đường làm vũ khí. Hàng Việt, bền, rẻ, có sẵn khắp nơi.',
        { v: 'enemy', text: '{flee}Chạy mau! Nó nhổ cả bụi tre kìa!' },
      ],
      sfx: [['bonk', 'broke'], ['scratch', ['broke', 0.3], 0.5], ['whoosh', 'bamboo'], ['bonk', ['bamboo', 1.2], 0.7], ['bonk', ['bamboo', 2.2], 0.7], ['slideDown', 'flee', 0.6]],
      draw(k) {
        chap(k, 1, 'Truyền thuyết kể gì?');
        outdoor(k, 'sunset');
        const broken = k.t >= k.cue('broke');
        const sh = k.shake('broke', 0.4, 12);
        k.group(sh, () => {
          riding(k, 560, 630, 480, { fire: 1, rod: k.t >= k.cue('bamboo') ? false : broken ? 'broken' : undefined, face: broken && k.t < k.cue('bamboo') ? 'shock' : 'shout' });
          k.burst(300, 260, 80, 'RẮC!', { p: k.at('broke', 0.4) });
          const pb = k.at('bamboo', 0.8);
          const sw = Math.sin(Math.max(0, k.t - k.cue('bamboo')) * 4) * 0.35;
          k.group({ x: 820, y: 380, r: -0.5 + sw, a: pb }, () => k.icon('bamboo', 110, -60, 300, { p: pb > 0 ? 1 : 0 }));
          const f = k.at('flee', 2.5);
          for (let i = 0; i < 6; i++) {
            const x = 1200 + (i % 3) * 190 + f * (200 + i * 60);
            k.icon('soldier', x, GROUND - 100 - Math.floor(i / 3) * 40, 200, { rotate: f * (i % 2 ? 0.9 : -0.5), face: f > 0 ? 'shock' : 'angry', bob: 2 });
          }
          k.text('Hàng Việt: bền · rẻ · có sẵn', 1480, 150, { size: 56, font: 'title', color: C.green, fx: 'pop', p: k.at(k.cue('bamboo', 2.4), 0.5), outline: C.white, outlineWidth: 12 });
        });
        say(k, 'Chạy mau! Nó nhổ cả bụi tre kìa!', 'flee', [1180, 380, 640, 130], [1380, 660], { size: 44 });
      },
    },
    {
      say: 'Đánh xong, Gióng không đòi thưởng, không xin chức. {soc}Một mình một ngựa lên núi Sóc, {armor}cởi áo giáp để lại, {fly}rồi bay thẳng lên trời. Không để lại cả số điện thoại.',
      sfx: [['click', 'armor'], ['slideUp', 'fly', 0.7], ['sparkle', ['fly', 1.5], 0.7], ['wahwah', ['fly', 4], 0.35]],
      draw(k) {
        chap(k, 1, 'Truyền thuyết kể gì?');
        k.backdrop('dawn', { ground: 960 });
        k.icon('mountain', 1240, 700, 720, { p: k.at(0, 1.2), fill: '#7f9b5a', shadow: false });
        k.text('núi Sóc', 1720, 640, { size: 56, font: 'title', fx: 'fade', p: k.at('soc', 0.6), outline: '#fffaf0', outlineWidth: 10 });
        const up = k.at('soc', 2.8, 'inOut');
        const fly = k.at('fly', 4, 'inOut');
        const x = k.lerp(k.lerp(260, 1150, up), 1560, fly), y = k.lerp(k.lerp(800, 420, up), -120, fly);
        armor(k, 1230, 490, 0.7, k.at('armor', 0.8));
        for (let i = 0; i < 12; i++) {
          const t = i / 12;
          if (t < fly) k.dot(k.lerp(1150, 1560, t), k.lerp(420, -120, t), 5, C.gray, 0.6);
        }
        k.icon('cloud', 1500, 180, 260, { p: k.at('fly', 1) });
        k.icon('cloud', 1760, 380, 180, { p: k.at(k.cue('fly', 0.4), 1) });
        k.group({ a: 1 - k.at(k.cue('fly', 3.2), 0.8) }, () => riding(k, x, y, 260 - fly * 120, { fire: 0.6, rod: false, face: 'happy' }));
        k.icon('phone', 400, 300, 160, { p: k.at(k.cue('fly', 4), 0.5), rotate: -0.2, shadow: false });
        k.icon('cross', 400, 300, 160, { p: k.at(k.cue('fly', 4.4), 0.4) });
      },
    },
    {
      say: 'Vua Hùng nhớ ơn, {title}phong Gióng là Phù Đổng Thiên Vương, lập đền thờ ngay tại quê nhà.',
      sfx: [['tada', 'title', 0.6]],
      draw(k) {
        chap(k, 1, 'Truyền thuyết kể gì?');
        outdoor(k, 'day');
        k.icon('king', 420, GROUND - 120, 260, { p: k.at(0.2, 1), face: 'happy' });
        k.icon('temple', 1180, 700, 460, { p: k.at(k.cue('title', 1.4), 1.4) });
        const b = k.text('Phù Đổng Thiên Vương', 1180, 230, { size: 100, font: 'title', p: k.at('title', 2, 'linear'), color: C.red, outline: '#fffaf0', outlineWidth: 14 });
        k.underline(1180 - b.w / 2, 300, b.w, { p: k.at(k.cue('title', 2.2), 0.5) });
      },
    },

    // ---------------- Chương 2 ----------------
    {
      chapter: 'Dấu vết còn lại',
      say: 'Gióng bay đi rồi, nhưng vẫn để lại… {mark}dấu vết. Ít nhất là theo lời kể của người dân.',
      sfx: [['pop', 'mark'], ['pop', ['mark', 0.4]], ['pop', ['mark', 0.8]]],
      draw(k) {
        chap(k, 2, 'Dấu vết còn lại');
        outdoor(k, 'day');
        k.icon('bamboo', 360, 760, 260, { p: k.at(0.3, 1), stroke: '#b8962a', leaf: '#e3c45a' });
        [[860, 850], [1000, 810], [1140, 850]].forEach(([x, y], i) => k.ellipse(x, y, 150, 50, { p: k.at(0.6 + i * 0.2, 0.6), fill: C.sky, stroke: C.blue, gap: 8 }));
        k.icon('house', 1600, 800, 170, { p: k.at(1, 0.8) });
        k.icon('fire', 1660, 690, 120, { p: k.at(1.4, 0.6) });
        pin(k, 360, 560, 1, k.at('mark', 0.5));
        pin(k, 1000, 700, 2, k.at(k.cue('mark', 0.4), 0.5));
        pin(k, 1600, 580, 3, k.at(k.cue('mark', 0.8), 0.5));
      },
    },
    {
      say: '{tre}Tre đằng ngà vàng óng, tương truyền vì bị lửa ngựa sắt thiêu sém. {ao}Những ao hồ nối tiếp nhau là vết chân ngựa. {chay}Còn một làng bị lửa ngựa đốt cháy, gọi luôn là làng Cháy. {name}Đặt tên kiểu này thì khỏi cần giải thích.',
      sfx: [['pop', 'tre'], ['pop', 'ao'], ['pop', 'chay'], ['boing', 'name', 0.5]],
      draw(k) {
        chap(k, 2, 'Dấu vết còn lại');
        const panel = (x, label, cue, art) => {
          const p = k.at(cue, 1);
          k.rect(x - 270, 170, 540, 640, { p, width: 4, rough: 1.4, fill: '#fffaf0', fillStyle: 'solid' });
          art(k.at(k.cue(cue, 0.4), 1.4));
          k.text(label, x, 900, { size: 56, font: 'title', p: k.at(k.cue(cue, 0.6), 1.2, 'linear') });
        };
        panel(330, 'tre đằng ngà', 'tre', (p) => k.icon('bamboo', 330, 500, 380, { p, stroke: '#b8962a', leaf: '#e3c45a' }));
        panel(960, 'ao = vết chân ngựa', 'ao', (p) => {
          [[850, 300], [960, 450], [1070, 600]].forEach(([x, y], i) => {
            const q = k.seq(p, i, 3, 0.3);
            k.ellipse(x, y, 170, 70, { p: q, fill: C.sky, stroke: C.blue, gap: 8 });
            k.path(`M ${x - 16} ${y + 14} Q ${x - 22} ${y - 18} ${x} ${y - 18} Q ${x + 22} ${y - 18} ${x + 16} ${y + 14}`, { p: q, width: 6 });
          });
        });
        panel(1590, 'làng Cháy', 'chay', (p) => { k.icon('house', 1590, 560, 260, { p }); k.icon('fire', 1660, 380, 180, { p }); });
        k.text('(rõ ràng ghê)', 1590, 970, { size: 40, color: C.gray, fx: 'fade', p: k.at('name', 0.6) });
      },
    },
    {
      say: 'Mở bản đồ Hà Nội hôm nay, {phu}ta vẫn thấy làng Phù Đổng, nơi Gióng sinh ra, bên bờ sông Đuống. {soc2}Còn núi Sóc, nơi Gióng bay về trời, nằm ở phía bắc thành phố. {km}Hai nơi cách nhau chừng ba mươi cây số. {fast}Với ngựa sắt thì chắc… chưa kịp nóng máy.',
      sfx: [['pop', 'phu'], ['pop', 'soc2'], ['whoosh', 'km', 0.5], ['boing', 'fast', 0.4]],
      draw(k) {
        chap(k, 2, 'Dấu vết còn lại');
        k.curve([[260, 160], [650, 460], [900, 720], [1150, 950], [1350, 1060]], { p: k.at(0.2, 1.4), stroke: C.blue, width: 14, rough: 0.6 });
        k.text('sông Hồng', 400, 420, { size: 44, color: C.blue, fx: 'fade', p: k.at(1, 0.6) });
        k.curve([[700, 515], [1100, 590], [1450, 570], [1800, 610]], { p: k.at(0.8, 1.2), stroke: C.blue, width: 9, rough: 0.6 });
        k.text('sông Đuống', 1640, 540, { size: 44, color: C.blue, fx: 'fade', p: k.at(1.4, 0.6) });
        k.dot(560, 840, 12, C.ink, k.at(1.2, 0.4));
        k.text('trung tâm Hà Nội', 560, 900, { size: 40, color: C.gray, fx: 'fade', p: k.at(1.4, 0.6) });
        k.icon('temple', 1220, 700, 140, { p: k.at('phu', 0.8) });
        pin(k, 1220, 640, 1, k.at('phu', 0.5));
        k.text('làng Phù Đổng', 1220, 800, { size: 50, font: 'title', p: k.at(k.cue('phu', 0.4), 1, 'linear') });
        k.icon('mountain', 640, 200, 200, { p: k.at('soc2', 0.8), fill: '#7f9b5a', shadow: false });
        pin(k, 640, 150, 2, k.at(k.cue('soc2', 0.3), 0.5));
        k.text('núi Sóc', 860, 220, { size: 50, font: 'title', align: 'left', p: k.at(k.cue('soc2', 0.6), 1, 'linear') });
        const pd = k.at('km', 1.4, 'linear');
        for (let i = 0; i <= 18; i++) if (i / 18 <= pd) k.dot(k.lerp(1180, 690, i / 18), k.lerp(600, 250, i / 18), 6, C.red);
        k.text('≈ 30 km', 1050, 380, { size: 70, font: 'title', color: C.red, fx: 'pop', p: k.at(k.cue('km', 1.2), 0.5), outline: C.white });
        riding(k, k.lerp(1180, 690, pd), k.lerp(560, 210, pd), 110, { p: k.at('km', 0.3), fire: 0.5, rod: false, face: 'happy' });
        k.text('(sơ đồ, không theo tỉ lệ)', 1700, 1030, { size: 32, color: C.gray, fx: 'fade', p: k.at(1.5, 0.6) });
      },
    },
    {
      say: 'Trong tín ngưỡng dân gian, {four}Gióng còn thuộc hàng Tứ bất tử, bốn vị thánh bất tử của người Việt, {list}cùng với Tản Viên Sơn Thánh, Chử Đồng Tử, và Thánh Mẫu Liễu Hạnh. {next}Mà Tản Viên Sơn Thánh chính là Sơn Tinh, người sẽ đánh nhau với Thủy Tinh ở tập sau.',
      sfx: [['sparkle', 'four', 0.6], ['pop', 'list'], ['pop', ['list', 1.4]], ['pop', ['list', 2.8]], ['ding', 'next', 0.5]],
      draw(k) {
        chap(k, 2, 'Dấu vết còn lại');
        k.text('Tứ bất tử', 960, 150, { size: 100, font: 'title', p: k.at('four', 1.2, 'linear'), color: C.red });
        const saints = [['warrior', 'Thánh Gióng', 'four', 'smug'], ['mountain', 'Tản Viên Sơn Thánh', 'list'], ['person', 'Chử Đồng Tử', 'list', 'happy'], ['woman', 'Thánh Mẫu Liễu Hạnh', 'list', 'calm']];
        saints.forEach(([ic, name, c, face], i) => {
          const x = 300 + i * 440;
          const cue = c === 'list' ? k.cue('list', (i - 1) * 1.4) : k.cue('four', 0.6);
          k.circle(x, 520, 170, { p: k.at(cue, 0.8), fill: '#fbf3e0', fillStyle: 'solid', width: 5 });
          k.icon(ic, x, 520, 230, { p: k.at(k.cue(cue, 0.3), 1), fill: ic === 'mountain' ? '#7f9b5a' : undefined, face, shadow: false });
          k.text(name, x, 760, { size: 48, font: 'title', maxWidth: 400, p: k.at(k.cue(cue, 0.5), 1.2, 'linear') });
        });
        k.circle(740, 520, 190, { p: k.at('next', 0.8), stroke: C.red, width: 8, rough: 1.6 });
        k.text('= Sơn Tinh · tập sau!', 740, 900, { size: 60, font: 'title', color: C.red, p: k.at(k.cue('next', 0.8), 1.4, 'linear') });
      },
    },
    {
      say: 'Mỗi năm, {festival}làng Phù Đổng và đền Sóc lại mở hội Gióng, diễn lại trận đánh năm xưa như một vở kịch dân gian khổng lồ, không cần mua vé. {unesco}Năm 2010, Hội Gióng được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại.',
      sfx: [['drumroll', 'festival', 0.5], ['tada', 'unesco', 0.6]],
      draw(k) {
        chap(k, 2, 'Dấu vết còn lại');
        outdoor(k, 'day');
        k.icon('temple', 760, 640, 440, { p: k.at('festival', 1.4) });
        [300, 1220].forEach((x, i) => {
          const p = k.at(k.cue('festival', 1 + i * 0.3), 0.8);
          k.line(x, GROUND, x, 360, { p, width: 5, stroke: C.brown });
          const wv = Math.sin(k.gt * 3 + i) * 14;
          k.poly([[x, 360], [x + 150, 380 + wv], [x, 450]], { p, fill: i ? C.yellow : C.red, fillStyle: 'solid', seed: 800 + i });
        });
        k.icon('drum', 470, 800, 170, { p: k.at(k.cue('festival', 1.6), 0.8) });
        for (let i = 0; i < 5; i++) k.icon('person', 950 + i * 70, GROUND - 46, 100, { p: k.at(k.cue('festival', 2 + i * 0.15), 0.6), face: 'happy', bob: 4 });
        const pu = k.at('unesco', 0.8, 'back');
        k.circle(1580, 380, 190, { p: pu, fill: C.white, fillStyle: 'solid', width: 6, stroke: C.blue });
        k.text('UNESCO', 1580, 340, { size: 70, font: 'title', color: C.blue, fx: 'fade', p: pu });
        k.text('2010', 1580, 430, { size: 80, font: 'title', fx: 'fade', p: pu });
        cap(k, 'Di sản văn hóa phi vật thể của nhân loại', k.cue('unesco', 1.5), { size: 56 });
      },
    },

    // ---------------- Chương 3 ----------------
    {
      chapter: 'Sử sách ghi gì?',
      say: 'Vậy sách vở nói gì? {old}Câu chuyện Gióng được chép vào nhiều sách cổ. {vdul}Sớm nhất là Việt điện u linh, soạn năm 1329, thời nhà Trần.',
      sfx: [['pop', 'old'], ['click', 'vdul']],
      draw(k) {
        chap(k, 3, 'Sử sách ghi gì?');
        k.icon('scroll', 620, 520, 420, { p: k.at('old', 1.2) });
        k.text('Việt điện u linh', 1260, 400, { size: 90, font: 'title', p: k.at('vdul', 1.6, 'linear') });
        k.text('soạn năm 1329 · thời Trần', 1260, 520, { size: 60, color: C.red, p: k.at(k.cue('vdul', 1.8), 1.4, 'linear') });
        k.text('Lý Tế Xuyên', 1260, 620, { size: 50, color: C.gray, fx: 'fade', p: k.at(k.cue('vdul', 2.6), 0.6) });
      },
    },
    {
      say: '{lnck}Rồi đến Lĩnh Nam chích quái, một tập truyện cổ biên soạn khoảng thế kỷ mười bốn, mười lăm. {toan}Và cả bộ chính sử Đại Việt sử ký toàn thư, hoàn thành năm 1479, cũng chép chuyện Phù Đổng vào đời Hùng Vương thứ sáu. {paper}Tức là chuyện này có giấy tờ đàng hoàng!',
      sfx: [['pop', 'lnck'], ['pop', 'toan'], ['ding', 'paper', 0.6]],
      draw(k) {
        chap(k, 3, 'Sử sách ghi gì?');
        [['Việt điện u linh', '1329', 0], ['Lĩnh Nam chích quái', 'thế kỷ 14–15', 'lnck'], ['Đại Việt sử ký toàn thư', '1479', 'toan']].forEach(([n, y, c], i) => {
          const x = 380 + i * 580;
          k.icon('scroll', x, 430, 300, { p: k.at(c, 1) });
          k.text(n, x, 680, { size: 50, font: 'title', p: k.at(typeof c === 'number' ? c : k.cue(c, 0.4), 1.2, 'linear'), maxWidth: 520 });
          k.text(y, x, 770, { size: 56, color: C.red, fx: 'fade', p: k.at(typeof c === 'number' ? c + 0.6 : k.cue(c, 1), 0.6) });
        });
        k.text('chính sử', 1540, 200, { size: 60, font: 'title', color: C.white, fx: 'pop', p: k.at(k.cue('toan', 1.6), 0.5), outline: C.red, outlineWidth: 14 });
        k.burst(960, 975, 90, 'CÓ GIẤY TỜ!', { p: k.at('paper', 0.5), size: 40, fill: '#c7f0c0', stroke: C.green, color: C.green });
      },
    },
    {
      say: 'Cũng theo Việt điện u linh, {ly}vua Lý Thái Tổ đã phong Gióng là Xung Thiên Thần Vương. {thousand}Nghĩa là từ khoảng một nghìn năm trước, triều đình đã thờ Gióng như một vị thần bảo hộ đất nước.',
      sfx: [['tada', 'ly', 0.5]],
      draw(k) {
        chap(k, 3, 'Sử sách ghi gì?');
        outdoor(k, 'day');
        k.icon('king', 520, GROUND - 120, 280, { p: k.at(0.3, 1), fill: '#e8b84a', face: 'smug' });
        k.text('Lý Thái Tổ', 520, 560, { size: 54, font: 'title', fx: 'fade', p: k.at(0.8, 0.6), outline: '#fffaf0', outlineWidth: 10 });
        k.icon('temple', 1320, 700, 440, { p: k.at('ly', 1.4) });
        const b = k.text('Xung Thiên Thần Vương', 1320, 260, { size: 90, font: 'title', color: C.red, p: k.at(k.cue('ly', 0.8), 1.8, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
        k.underline(1320 - b.w / 2, 330, b.w, { p: k.at(k.cue('ly', 2.8), 0.5) });
        cap(k, 'Được thờ từ khoảng 1.000 năm trước', 'thousand');
      },
    },
    {
      say: 'Nhưng khoan. {gap}Những cuốn sách này ra đời khoảng hai nghìn rưỡi năm sau câu chuyện. {oral}Trước đó, tất cả là truyền miệng. Mà truyền miệng thì bạn biết rồi đấy: {phone}chơi trò truyền tin qua năm người thôi, câu cuối đã khác hẳn câu đầu.',
      sfx: [['scratch', 0.1, 0.6], ['drumroll', 'gap', 0.4], ['pop', 'phone'], ['pop', ['phone', 0.7]], ['pop', ['phone', 1.4]], ['pop', ['phone', 2.1]], ['boing', ['phone', 2.8], 0.7]],
      draw(k) {
        chap(k, 3, 'Sử sách ghi gì?');
        const y = 430;
        k.arrow(140, y, 1800, y, { p: k.at(0.2, 1.2), width: 5 });
        k.text('Thời Hùng Vương', 260, y + 70, { size: 46, font: 'title', fx: 'fade', p: k.at(0.8, 0.6) });
        k.icon('scroll', 1640, y - 120, 150, { p: k.at(1.2, 0.8) });
        k.text('1329', 1640, y + 70, { size: 54, font: 'title', color: C.red, fx: 'fade', p: k.at(1.4, 0.6) });
        k.curve([[260, y - 50], [950, y - 230], [1640, y - 50]], { p: k.at('gap', 1.2), stroke: C.red, width: 5 });
        k.text('≈ 2.500 năm', 950, 160, { size: 90, font: 'title', color: C.red, fx: 'pop', p: k.at(k.cue('gap', 1), 0.5) });
        const msgs = ['Giặc đến!', 'Giặc đông lắm!', 'Có người đánh giặc!', 'Người đó to lắm!', 'Cưỡi ngựa sắt phun lửa!'];
        msgs.forEach((m, i) => {
          const x = 260 + i * 350;
          k.icon('person', x, 870, 140, { p: k.at(k.cue('oral', i * 0.3), 0.6), face: i === 4 ? 'shout' : 'calm', bob: 2 });
          k.bubble(x - 150, 600, 300, 120, x, 770, { p: k.at(k.cue('phone', i * 0.7), 0.4), text: m, size: i === 4 ? 36 : 40, seed: 900 + i * 4 });
        });
      },
    },

    // ---------------- Chương 4 ----------------
    {
      chapter: 'Những điểm vô lý',
      say: 'Và khi đem câu chuyện đi soi kỹ, {odd}ta thấy vài chỗ… hơi bị lạ. {an}Điểm lạ thứ nhất: giặc Ân.',
      sfx: [['drumroll', 0.3, 0.4], ['boing', 'odd', 0.6], ['bonk', 'an', 0.5]],
      draw(k) {
        chap(k, 4, 'Những điểm vô lý');
        k.icon('question', 960, 400, 340, { p: k.at('odd', 0.8, 'back') });
        k.icon('eye', 700, 380, 160, { p: k.at(0.3, 0.6) });
        k.icon('eye', 1220, 380, 160, { p: k.at(0.5, 0.6) });
        k.text('Điểm lạ #1: Giặc Ân', 960, 760, { size: 96, font: 'title', color: C.red, p: k.at('an', 1.4, 'linear') });
      },
    },
    {
      say: 'Nhà Ân, hay nhà Thương, {china}là một triều đại cổ của Trung Quốc, tồn tại khoảng từ năm 1600 đến năm 1046 trước Công nguyên. {capital}Kinh đô thời cuối của họ ở vùng An Dương ngày nay, {dist}cách Hà Nội gần hai nghìn cây số.',
      sfx: [['pop', 'capital'], ['slideDown', 'dist', 0.5]],
      draw(k) {
        chap(k, 4, 'Những điểm vô lý');
        const A = [1500, 240], B = [520, 820];
        k.text('Nhà Ân (Thương)', 1640, 400, { size: 60, font: 'title', p: k.at('china', 1.2, 'linear'), color: C.red });
        k.text('~1600 – 1046 TCN', 1640, 480, { size: 54, fx: 'fade', p: k.at(k.cue('china', 1.4), 0.6) });
        k.icon('temple', A[0], A[1] - 40, 160, { p: k.at('capital', 1), fill: '#5d6470' });
        k.text('An Dương', A[0] + 230, A[1] - 30, { size: 46, align: 'left', fx: 'fade', p: k.at(k.cue('capital', 0.8), 0.6) });
        k.icon('house', B[0], B[1] - 30, 140, { p: k.at(0.3, 0.8) });
        k.text('Phù Đổng (Hà Nội)', B[0], B[1] + 80, { size: 46, fx: 'fade', p: k.at(0.6, 0.6) });
        [[820, 640], [1000, 560], [1180, 460], [900, 420], [1260, 640]].forEach(([x, y], i) => k.icon('mountain', x, y, 130, { p: k.at(k.cue('capital', 1 + i * 0.15), 0.6), fill: '#9aa86c', shadow: false }));
        const pd = k.at('dist', 1.4, 'linear');
        for (let i = 0; i <= 30; i++) if (i / 30 <= pd) k.dot(k.lerp(B[0] + 60, A[0] - 80, i / 30), k.lerp(B[1] - 60, A[1] + 40, i / 30), 6, C.red);
        k.text('≈ 2.000 km', 1180, 760, { size: 90, font: 'title', color: C.red, fx: 'pop', p: k.at(k.cue('dist', 1.2), 0.5), outline: C.white });
      },
    },
    {
      say: [
        'Hai nghìn cây số, đi bộ, qua núi rừng, không có bản đồ. {tired}Đến nơi chắc giặc cũng hết sức đánh nhau.',
        { v: 'enemy', text: '{lost}Còn bao xa nữa vậy trời…' },
        '{noproof}Và đến nay, giới sử học chưa tìm thấy bằng chứng nào cho thấy quân nhà Thương từng xuống tận đồng bằng sông Hồng.',
      ],
      sfx: [['wahwah', 'lost', 0.4], ['scratch', 'noproof', 0.5]],
      draw(k) {
        chap(k, 4, 'Những điểm vô lý');
        k.backdrop('day', { ground: 980 });
        const path = [[120, 820], [420, 700], [700, 790], [980, 620], [1260, 720], [1560, 560], [1820, 620]];
        k.curve(path, { p: k.at(0.2, 2, 'linear'), width: 5, stroke: C.brown });
        [[420, 640], [980, 560], [1560, 500]].forEach(([x, y], i) => k.icon('mountain', x, y, 220, { p: k.at(0.4 + i * 0.3, 0.8), fill: '#9aa86c', shadow: false }));
        const w = (k.t * 0.05) % 1;
        const seg = Math.min(path.length - 2, Math.floor(w * (path.length - 1))), f = w * (path.length - 1) - seg;
        const sx = k.lerp(path[seg][0], path[seg + 1][0], f), sy = k.lerp(path[seg][1], path[seg + 1][1], f) - 90;
        k.icon('soldier', sx, sy, 160, { face: k.t > k.cue('tired') ? 'sad' : 'angry', bob: 4, shadow: false });
        k.sweat(sx + 30, sy - 70, 1.4, { p: k.at('tired', 0.3) });
        k.bubble(Math.max(60, Math.min(sx - 100, 1340)), 150, 520, 120, sx, sy - 90, { p: k.at('lost', 0.4), text: 'Còn bao xa nữa vậy trời…', size: 40, seed: 950 });
        k.text('Chưa có bằng chứng', 960, 930, { size: 70, font: 'title', color: C.red, p: k.at(k.cue('noproof', 0.8), 1.4, 'linear'), outline: C.white, outlineWidth: 12 });
      },
    },
    {
      say: 'Điểm lạ thứ hai {iron}còn hay hơn: ngựa sắt, roi sắt, áo giáp sắt. {bronze}Vào thời nhà Ân, cư dân trên đất Việt mới đang ở thời đại đồ đồng. {dongson}Đồ sắt chỉ bắt đầu xuất hiện vào thời văn hóa Đông Sơn, muộn hơn hàng trăm năm.',
      sfx: [['bonk', 'iron', 0.5], ['pop', 'bronze'], ['pop', 'dongson'], ['whoosh', ['dongson', 2], 0.5]],
      draw(k) {
        chap(k, 4, 'Những điểm vô lý');
        k.text('Điểm lạ #2: Đồ sắt', 960, 140, { size: 80, font: 'title', color: C.red, p: k.at('iron', 1.4, 'linear') });
        const X = (yr) => 200 + ((yr + 2000) / 2000) * 1520;
        k.line(X(-2000), 760, X(0), 760, { p: k.at(0.3, 1), width: 4 });
        [[-2000, '2000 TCN'], [-1500, '1500'], [-1000, '1000'], [-500, '500'], [0, 'Công nguyên']].forEach(([yr, t]) => {
          k.line(X(yr), 745, X(yr), 775, { p: k.at(0.8, 0.4), width: 3 });
          k.text(t, X(yr), 820, { size: 38, color: C.gray, fx: 'fade', p: k.at(0.9, 0.5) });
        });
        const pa = k.at(k.cue('iron', 1.6), 0.8);
        k.rect(X(-1600), 330, X(-1046) - X(-1600), 70, { p: pa, fill: C.red, fillStyle: 'solid', stroke: 'none' });
        k.text('Nhà Ân', (X(-1600) + X(-1046)) / 2, 365, { size: 44, font: 'title', color: C.white, fx: 'fade', p: pa });
        const pb = k.at('bronze', 1.4, 'linear');
        k.rect(X(-2000), 560, (X(-500) - X(-2000)) * pb, 80, { p: pb > 0 ? 1 : 0, fill: '#b5893c', stroke: 'none', gap: 8, seed: 951 });
        k.text('Đồ đồng', X(-1250), 600, { size: 50, font: 'title', fx: 'fade', p: k.at(k.cue('bronze', 1.2), 0.6) });
        const pi = k.at('dongson', 1.2, 'linear');
        k.rect(X(-500), 560, (X(0) - X(-500)) * pi, 80, { p: pi > 0 ? 1 : 0, fill: '#6f757e', stroke: 'none', gap: 8, seed: 952 });
        k.text('Đồ sắt', X(-250), 600, { size: 50, font: 'title', fx: 'fade', p: k.at(k.cue('dongson', 1), 0.6) });
        k.icon('drum', X(-250), 450, 130, { p: k.at(k.cue('dongson', 1.2), 0.8) });
        k.arrow(X(-1046) + 20, 410, X(-500) - 10, 540, { p: k.at(k.cue('dongson', 2), 0.8), stroke: C.red, width: 4, bend: 0.2 });
        k.text('hàng trăm năm', X(-760), 430, { size: 44, color: C.red, fx: 'fade', p: k.at(k.cue('dongson', 2.6), 0.6) });
      },
    },
    {
      say: [
        'Thử hình dung: {order}sứ giả cầm đơn hàng ngựa sắt chạy tới lò rèn.',
        { v: 'envoy', text: '{rush}Rèn cho tôi một con ngựa sắt, gấp lắm!' },
        { v: 'smith', text: '{what}Sắt… là cái gì vậy anh? Ở đây chỉ có đồng thôi.' },
        '{impossible}Nếu trận đánh thật sự xảy ra thời nhà Ân, thì đất Việt khi ấy chưa có người thợ nào biết rèn sắt.',
      ],
      sfx: [['whoosh', 'order', 0.6], ['bonk', 'rush', 0.4], ['scratch', 'what', 0.6], ['wahwah', 'impossible', 0.45]],
      draw(k) {
        chap(k, 4, 'Những điểm vô lý');
        outdoor(k, 'day');
        const pa = k.at(0.3, 1);
        k.poly([[1100, 760], [1420, 760], [1380, 700], [1500, 640], [1160, 640], [1100, 700]], { p: pa, fill: '#b5893c', gap: 7 });
        k.rect(1200, 760, 120, 120, { p: pa, fill: '#b5893c', gap: 7 });
        k.text('LÒ RÈN ĐỒNG', 1300, 560, { size: 50, font: 'title', color: '#8a5a12', fx: 'fade', p: pa, outline: '#fffaf0', outlineWidth: 10 });
        k.icon('person', 1640, GROUND - 95, 220, { p: k.at(0.5, 0.8), fill: '#b5893c', face: k.t > k.cue('what') ? 'shock' : 'calm' });
        const run = k.at('order', 1.6, 'out');
        k.icon('person', k.lerp(-100, 760, run), GROUND - 95, 200, { fill: C.sky, face: 'shout', bob: run < 1 ? 6 : 1 });
        k.icon('scroll', k.lerp(-50, 820, run), GROUND - 120, 60, {});
        k.motion(k.lerp(-140, 720, run), GROUND - 110, 1, 0, { p: run < 1 ? 1 : 0, n: 3, len: 100 });
        say(k, 'Rèn cho tôi một con ngựa sắt, gấp lắm!', 'rush', [420, 170, 640, 140], [760, 680], { size: 44 });
        say(k, 'Sắt… là cái gì vậy anh?', 'what', [1220, 170, 560, 140], [1600, 680], { size: 46 });
        cap(k, 'Thời đó chưa ai biết rèn sắt!', 'impossible', { color: C.red });
      },
    },
    {
      say: 'Điểm lạ thứ ba {foot3}nằm ngay ở đầu câu chuyện: ướm chân vào vết chân khổng lồ rồi mang thai. {china2}Nghe quen không? Sách Kinh Thi của Trung Quốc cũng kể bà Khương Nguyên giẫm lên dấu chân của thần, rồi sinh ra Hậu Tắc, ông tổ nghề nông của nhà Chu. {copy}Hai nơi, cùng một kiểu chuyện.',
      sfx: [['bonk', 'foot3', 0.4], ['boing', 'china2', 0.6], ['ding', 'copy', 0.5]],
      draw(k) {
        chap(k, 4, 'Những điểm vô lý');
        k.backdrop('day', { ground: GROUND, alpha: 0.6 });
        k.text('Điểm lạ #3: Vết chân khổng lồ', 960, 140, { size: 80, font: 'title', color: C.red, p: k.at('foot3', 1.6, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
        k.icon('woman', 420, GROUND - 120, 240, { p: k.at(k.cue('foot3', 1), 1), face: 'shock' });
        k.icon('footprint', 640, 780, 220, { p: k.at(k.cue('foot3', 1.6), 1), rotate: -0.2, shadow: false });
        k.text('Mẹ Gióng · Việt Nam', 520, 420, { size: 50, font: 'title', p: k.at(k.cue('foot3', 2.4), 1, 'linear') });
        k.text('≈', 960, 650, { size: 160, font: 'title', fx: 'pop', p: k.at('china2', 0.5), color: C.red });
        k.icon('woman', 1280, GROUND - 120, 240, { p: k.at(k.cue('china2', 0.4), 1), fill: C.purple, hat: '#c9a2e8', face: 'shock' });
        k.icon('footprint', 1500, 780, 220, { p: k.at(k.cue('china2', 1), 1), rotate: 0.2, shadow: false });
        k.text('Bà Khương Nguyên · Kinh Thi', 1390, 420, { size: 50, font: 'title', p: k.at(k.cue('china2', 1.4), 1.2, 'linear') });
        k.text('→ sinh Hậu Tắc', 1390, 500, { size: 44, color: C.gray, fx: 'fade', p: k.at(k.cue('china2', 4), 0.6) });
        k.burst(960, 300, 70, 'GIỐNG!', { p: k.at('copy', 0.5), size: 38 });
      },
    },
    {
      say: 'Các nhà nghiên cứu gọi đây là {motif}mô típ sinh nở thần kỳ. {many}Rất nhiều dân tộc kể rằng người anh hùng của họ ra đời một cách khác thường, {why}như một cách nói: người này không bình thường đâu, mà là do trời đất gửi xuống.',
      sfx: [['sparkle', 'motif', 0.6], ['pop', 'many'], ['pop', ['many', 0.6]], ['pop', ['many', 1.2]], ['ding', 'why', 0.4]],
      draw(k) {
        chap(k, 4, 'Những điểm vô lý');
        k.text('Mô típ “sinh nở thần kỳ”', 960, 150, { size: 84, font: 'title', p: k.at('motif', 1.6, 'linear') });
        k.icon('earth', 960, 580, 320, { p: k.at(k.cue('motif', 0.8), 1.2) });
        for (let i = 0; i < 6; i++) {
          const a = -Math.PI / 2 + (i / 6) * Math.PI * 2;
          const x = 960 + Math.cos(a) * 420, y = 580 + Math.sin(a) * 300;
          k.icon('child', x, y, 120, { p: k.at(k.cue('many', i * 0.3), 0.7), fill: [C.red, C.blue, C.green, C.orange, C.purple, C.pink][i], face: 'happy', bob: 2, shadow: false });
          k.icon('star', x + 60, y - 60, 50, { p: k.at(k.cue('many', 0.3 + i * 0.3), 0.4, 'back') });
        }
        k.icon('sun', 1650, 220, 160, { p: k.at('why', 0.8) });
        cap(k, 'Người anh hùng do trời đất gửi xuống', 'why');
      },
    },

    // ---------------- Chương 5 ----------------
    {
      chapter: 'Vậy Gióng là ai?',
      say: 'Vậy ông bà ta bịa chuyện à? {no}Không hẳn. {memory}Các nhà nghiên cứu cho rằng, truyền thuyết giống một chiếc hộp ký ức, gom nhiều thời kỳ khác nhau vào chung một câu chuyện, cho dễ nhớ.',
      sfx: [['bonk', 'no', 0.5], ['whoosh', ['memory', 1.2], 0.5], ['whoosh', ['memory', 1.7], 0.5], ['whoosh', ['memory', 2.2], 0.5], ['pop', ['memory', 3], 0.6]],
      draw(k) {
        chap(k, 5, 'Vậy Gióng là ai?');
        k.burst(960, 220, 90, 'KHÔNG HẲN!', { p: k.at('no', 0.5), size: 40, fill: '#c7f0c0', stroke: C.green, color: C.green });
        const pb = k.at('memory', 1);
        k.rect(700, 560, 520, 300, { p: pb, fill: '#d9b77a', gap: 9 });
        k.poly([[680, 560], [1240, 560], [1200, 500], [720, 500]], { p: pb, fill: '#c99a5b', fillStyle: 'solid' });
        k.text('Hộp ký ức', 960, 720, { size: 64, font: 'title', fx: 'fade', p: pb });
        [['drum', 260, 380], ['horse', 1660, 380], ['bamboo', 300, 820], ['scroll', 1640, 820]].forEach(([n, x, y], i) => {
          const m = k.at(k.cue('memory', 1.2 + i * 0.5), 1.4, 'inOut');
          k.icon(n, k.lerp(x, 960, m), k.lerp(y, 530, m), 200 * (1 - 0.55 * m), { p: k.at(k.cue('memory', 0.6 + i * 0.3), 0.6), shadow: false });
        });
      },
    },
    {
      say: '{c1}Cách hiểu thứ nhất: ngựa sắt và roi sắt có thể là ký ức về thời người Việt bắt đầu biết dùng đồ sắt. {power}Với người xưa, một thứ kim loại cứng hơn đồng chẳng khác nào siêu năng lực.',
      sfx: [['pop', 'c1'], ['sparkle', 'power', 0.7]],
      draw(k) {
        chap(k, 5, 'Vậy Gióng là ai?');
        k.text('Cách hiểu 1: ký ức về thời đồ sắt', 960, 150, { size: 72, font: 'title', p: k.at('c1', 1.8, 'linear') });
        spear(k, 620, 640, 2, '#b5893c', k.at(k.cue('c1', 1), 1));
        spear(k, 1300, 640, 2, '#6f757e', k.at(k.cue('c1', 1.6), 1));
        k.text('Đồng', 620, 900, { size: 64, font: 'title', fx: 'fade', p: k.at(k.cue('c1', 1.4), 0.6), color: '#9a6d1e' });
        k.text('Sắt', 1300, 900, { size: 64, font: 'title', fx: 'fade', p: k.at(k.cue('c1', 2), 0.6) });
        for (let i = 0; i < 6; i++) k.icon('star', 1300 + Math.cos(i) * 230, 520 + Math.sin(i * 1.7) * 200, 60, { p: k.at(k.cue('power', 0.3 + i * 0.15), 0.4, 'back') });
        k.burst(1640, 330, 80, 'SIÊU NĂNG LỰC', { p: k.at(k.cue('power', 1.4), 0.5), size: 30 });
      },
    },
    {
      say: '{c2}Cách hiểu thứ hai: nhìn cách Gióng lớn lên. {pot}Cả làng góp từng nong cơm, nong cà. {all}Gióng lớn lên bằng gạo của cả làng, nên sức mạnh của Gióng, chính là sức mạnh của cả cộng đồng.',
      sfx: [['pop', 'c2'], ['pop', 'pot'], ['pop', ['pot', 0.6]], ['pop', ['pot', 1.2]], ['boom', 'all', 0.5]],
      draw(k) {
        chap(k, 5, 'Vậy Gióng là ai?');
        k.text('Cách hiểu 2: sức mạnh cộng đồng', 960, 150, { size: 72, font: 'title', p: k.at('c2', 1.8, 'linear') });
        k.icon('warrior', 960, 560, 460, { p: k.at('all', 1.2), face: 'happy' });
        for (let i = 0; i < 8; i++) {
          const a = Math.PI * (0.05 + (i / 7) * 0.9);
          const x = 960 - Math.cos(a) * 720, y = 600 + Math.sin(a) * 300 - 80;
          k.icon('person', x, y, 110, { p: k.at(k.cue('pot', i * 0.15), 0.6), face: 'happy', bob: 3, shadow: false });
          k.icon('rice', x, y + 80, 70, { p: k.at(k.cue('pot', 0.4 + i * 0.15), 0.5), fill: i % 3 ? C.white : C.purple });
          k.arrow(x + (960 - x) * 0.18, y - 20, x + (960 - x) * 0.62, y + (560 - y) * 0.6 - 20, { p: k.at(k.cue('all', 0.6 + i * 0.1), 0.5), stroke: C.orange, width: 4, head: 14 });
        }
      },
    },
    {
      say: '{c3}Cách hiểu thứ ba: khi vũ khí xịn gãy, {tre}thứ cứu nguy lại là bụi tre ngoài ngõ. Người bình thường cũng giữ nước được, bằng chính những gì mình có.',
      sfx: [['pop', 'c3'], ['bonk', ['c3', 1], 0.5], ['sparkle', 'tre', 0.5]],
      draw(k) {
        chap(k, 5, 'Vậy Gióng là ai?');
        outdoor(k, 'day');
        k.text('Cách hiểu 3: vũ khí của người bình thường', 960, 150, { size: 68, font: 'title', p: k.at('c3', 2, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
        k.line(420, 560, 520, 380, { p: k.at(k.cue('c3', 1), 0.6), width: 14, stroke: '#4a4f57' });
        k.line(540, 350, 640, 290, { p: k.at(k.cue('c3', 1.3), 0.6), width: 14, stroke: '#4a4f57' });
        k.text('roi sắt gãy', 520, 650, { size: 50, fx: 'fade', p: k.at(k.cue('c3', 1.6), 0.6), outline: '#fffaf0', outlineWidth: 8 });
        k.icon('bamboo', 1100, 520, 340, { p: k.at(k.cue('c3', 2), 1) });
        for (let i = 0; i < 9; i++) k.icon('bamboo', 160 + i * 200, 820, 150, { p: k.at(k.cue('tre', i * 0.15), 0.6) });
        k.text('lũy tre làng', 1560, 560, { size: 56, font: 'title', color: C.green, fx: 'fade', p: k.at(k.cue('tre', 1.6), 0.6), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: 'Còn chuyện bay về trời? {leave}Xong việc là đi, không nhận thưởng, không đòi chức. {hero}Thời nào người ta cũng mê kiểu anh hùng như vậy. {rare}Có lẽ… vì hiếm.',
      sfx: [['slideUp', 'leave', 0.6], ['bonk', ['leave', 1.6], 0.4], ['wahwah', 'rare', 0.35]],
      draw(k) {
        chap(k, 5, 'Vậy Gióng là ai?');
        k.backdrop('dawn', {});
        const f = k.at('leave', 5, 'inOut');
        k.icon('cloud', 1300, 220, 300, { p: k.at(0.2, 1) });
        k.icon('cloud', 1650, 420, 200, { p: k.at(0.5, 1) });
        riding(k, k.lerp(500, 1350, f), k.lerp(780, 260, f), 340 - f * 120, { fire: 0.5, rod: false, face: 'happy' });
        k.group({ x: 500, y: 330 }, () => {
          k.poly([[-60, 40], [-60, -10], [-30, 15], [0, -30], [30, 15], [60, -10], [60, 40]], { p: k.at(k.cue('leave', 1), 0.8), fill: C.yellow, fillStyle: 'solid', stroke: C.orange, width: 4 });
        });
        k.icon('cross', 500, 330, 150, { p: k.at(k.cue('leave', 1.6), 0.6) });
        k.text('không nhận thưởng', 500, 470, { size: 50, fx: 'fade', p: k.at(k.cue('leave', 2), 0.6) });
        cap(k, 'Thời nào cũng mê kiểu anh hùng này…', 'hero');
        k.burst(1500, 820, 70, 'vì hiếm!', { p: k.at('rare', 0.5), size: 36 });
      },
    },

    // ---------------- Kết luận ----------------
    {
      chapter: 'Vậy Gióng có thật không?',
      say: 'Vậy rốt cuộc, Thánh Gióng có thật không? {person}Một cậu bé ba tuổi vươn vai thành người khổng lồ thì… chắc là không. {real}Nhưng những cuộc chiến giữ làng, giữ nước của tổ tiên ta, thì hoàn toàn có thật.',
      sfx: [['drumroll', 0.4, 0.4], ['bonk', ['person', 2.4], 0.4], ['ding', ['real', 2], 0.6]],
      draw(k) {
        chap(k, 6, 'Vậy Gióng có thật không?');
        k.line(960, 200, 960, 900, { p: k.at(0.2, 0.8), width: 3, stroke: C.gray });
        k.icon('child', 380, 560, 220, { p: k.at('person', 0.8), face: 'smug' });
        k.group({ a: 0.5 }, () => k.icon('warrior', 640, 500, 340, { p: k.at(k.cue('person', 0.6), 1), shadow: false }));
        k.icon('cross', 520, 520, 300, { p: k.at(k.cue('person', 2.4), 0.6) });
        k.text('cậu bé hoá khổng lồ', 500, 820, { size: 50, fx: 'fade', p: k.at(k.cue('person', 2), 0.6) });
        [[1200, 620], [1380, 620], [1560, 620], [1740, 620]].forEach(([x, y], i) => k.icon(i % 2 ? 'soldier' : 'person', x, y, 180, { p: k.at(k.cue('real', i * 0.2), 0.8), fill: i % 2 ? C.green : undefined, face: 'angry', bob: 2 }));
        k.icon('house', 1470, 420, 150, { p: k.at(k.cue('real', 0.8), 0.8) });
        k.icon('check', 1470, 250, 200, { p: k.at(k.cue('real', 2), 0.6) });
        k.text('cuộc chiến giữ nước', 1470, 820, { size: 50, fx: 'fade', p: k.at(k.cue('real', 1.6), 0.6) });
      },
    },
    {
      say: '{story}Truyện Gióng là cách người xưa lưu lại những cuộc chiến ấy, khi chưa có chữ viết để chép sử. {alive}Hàng nghìn năm sau, câu chuyện vẫn sống trong lễ hội, trong lũy tre làng, và trong lời bà kể mỗi tối.',
      sfx: [['sparkle', 'story', 0.5], ['pop', 'alive']],
      draw(k) {
        chap(k, 6, 'Vậy Gióng có thật không?');
        k.backdrop('night', { ground: GROUND });
        k.icon('woman', 520, GROUND - 120, 260, { p: k.at('story', 1), fill: '#7a5a3a', face: 'happy' });
        [760, 900, 1040].forEach((x, i) => k.icon('child', x, GROUND - 70, 150, { p: k.at(k.cue('story', 0.6 + i * 0.2), 0.8), fill: [C.red, C.blue, C.green][i], face: i === 1 ? 'shock' : 'happy', bob: 1.5 }));
        k.bubble(620, 170, 640, 260, 560, 600, { p: k.at(k.cue('story', 1.4), 0.6), think: true });
        riding(k, 820, 330, 180, { p: k.at(k.cue('story', 2), 1.2), fire: 0.5 });
        k.icon('bamboo', 1120, 300, 170, { p: k.at(k.cue('story', 2.6), 1) });
        k.icon('temple', 1550, 720, 300, { p: k.at('alive', 1) });
        k.icon('drum', 1700, 380, 150, { p: k.at(k.cue('alive', 0.8), 0.8) });
        k.icon('bamboo', 1800, 760, 200, { p: k.at(k.cue('alive', 1.4), 0.8) });
      },
    },

    bulletsScene({
      chapter: 'Tóm tắt',
      say: 'Tóm lại: {a}chuyện Gióng được chép vào sách từ thế kỷ mười bốn, sau một thời gian rất dài truyền miệng. {b}Giặc Ân và ngựa sắt không khớp với lịch sử và khảo cổ học. {c}Nhưng câu chuyện lưu giữ những ký ức thật: thời đồ sắt, sức mạnh cộng đồng, và tinh thần giữ nước.',
      title: 'Tóm tắt',
      items: [
        { text: 'Chép vào sách từ năm 1329, sau rất lâu truyền miệng', cue: 'a', icon: 'scroll' },
        { text: 'Giặc Ân, ngựa sắt: không khớp lịch sử', cue: 'b', icon: 'question' },
        { text: 'Nhưng giữ ký ức thật về tinh thần giữ nước', cue: 'c', icon: 'heart' },
      ],
    }),
    subscribeScene({
      say: 'Tập sau: {q}Sơn Tinh và Thủy Tinh đánh nhau vì một cô gái, hay vì… con đê? Đoán thử trong phần bình luận nhé. {sub}Và đăng ký Vẽ Là Hiểu, để cùng soi truyền thuyết theo cách vui nhất!',
      question: 'Sơn Tinh – Thủy Tinh: vì cô gái, hay vì… con đê?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.5,
    }),
  ],

  // Mẫu A (kịch tính). Các mẫu khác để thử A/B: thumbs.js → node scripts/thumbs.mjs <slug>
  thumbnail: thumbs.a,
};
