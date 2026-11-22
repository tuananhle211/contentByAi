// Shorts — Thánh Gióng lớn nhanh như thổi: chuyện gì thật sự xảy ra? (cắt từ 003)
// Đối chiếu: truyện Thánh Gióng (Lĩnh Nam chích quái; Việt điện u linh): ba tuổi chưa biết nói, nghe sứ giả bỗng nói; lớn nhanh như thổi,
//   cả làng góp gạo nuôi; tương truyền ăn bảy nong cơm, ba nong cà. Hội Gióng được UNESCO ghi danh năm 2010.
import { fullVideoScene } from '/engine/templates.js';
import { SG, KC, DAN, VO, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const GIONG = { body: 'kid', outfit: 'tunic', color: '#3b6ea5', color2: '#f6c344', hair: 'topknot' };
const BIG = { body: 'big', outfit: 'tunic', color: '#3b6ea5', color2: '#f6c344', hair: 'topknot', hat: 'helmet' };

export default {
  meta: shortMeta({
    title: 'Thánh Gióng lớn nhanh như thổi: chuyện gì thật sự xảy ra? #shorts',
    description: 'Ba tuổi chưa biết nói, vậy mà Thánh Gióng lớn nhanh như thổi, ăn bảy nong cơm ba nong cà. Ai nuôi Gióng, và chi tiết ấy thật ra muốn nói gì? Xem tập đầy đủ "Thánh Gióng có thật không?" trên kênh Vẽ Là Hiểu!',
    tags: ['thánh gióng', 'thánh gióng lớn nhanh như thổi', 'sự tích thánh gióng', 'làng phù đổng', 'hội gióng'],
    hashtags: ['thanhgiong'],
    voices: { dan: { voice: 'vi-VN-NamMinhNeural', pitch: '+14Hz', rate: '+10%' } },
  }),

  scenes: [
    {
      lead: 0.1,
      say: '{me}Mình là dân làng Phù Đổng. {bill}Tháng này, cả làng mình phải góp gạo… {kid}để nuôi một đứa trẻ ba tuổi. {eat}Bảy nong cơm, ba nong cà, {q}và nó vẫn kêu đói. {ask}Thánh Gióng lớn nhanh như thổi: chuyện gì thật sự xảy ra?',
      sfx: [['pop', 'me'], ['cash', 'bill', 0.5], ['pop', 'kid'], ['gulp', 'eat', 0.6], ['gulp', ['eat', 0.8], 0.6], ['boing', 'q', 0.5], ['ding', 'ask', 0.4]],
      draw(k) {
        k.backdrop('day', { ground: SG });
        k.prop('stilthouse', 260, 1000, 420);
        k.char(300, SG, 420, { ...DAN('#e4572e', { outfit: 'tunic', hat: 'non' }), face: k.t > k.cue('q') ? 'shock' : 'smug', pose: k.t > k.cue('bill') ? 'present' : 'wave', p: k.at('me', 0.4) });
        T(k, 'mình', 300, 740, 48, '#b5482c', k.at('me', 0.4) * (1 - k.at('bill', 0.4)));
        const grow = k.at('eat', 2.5, 'inOut');
        k.char(780, SG, 260 + grow * 300, { ...GIONG, face: k.t > k.cue('q') ? 'laugh' : 'happy', pose: k.t > k.cue('q') ? 'cheer' : 'hold', p: k.at('kid', 0.4), bob: 3 });
        T(k, '3 tuổi', 780, 1320, 54, '#3b2f2a', k.at('kid', 0.4));
        for (let i = 0; i < 4; i++) k.prop('xoi', 520 + (i % 2) * 140, 1180 - Math.floor(i / 2) * 70, 130, { p: k.at(k.cue('eat', i * 0.25), 0.3) });
        T(k, '7 NONG CƠM', 540, 220, 100, '#b5482c', k.at('eat', 0.4));
        T(k, '3 NONG CÀ', 540, 340, 84, '#3f7d3a', k.at(k.cue('eat', 0.8), 0.4));
        T(k, 'vẫn đói?!', 540, 460, 70, '#e4572e', k.at('q', 0.4));
      },
    },
    {
      say: [
        'Từ ngày sứ giả của vua Hùng đến làng, {speak}cậu bé ba năm không nói bỗng đòi ngựa sắt, roi sắt, áo giáp sắt để đi đánh giặc. {grow}Rồi lớn nhanh như thổi: áo vừa may đã chật, cơm vừa chín đã hết. {all}Thế là cả làng mình phải góp gạo.',
        { v: 'dan', text: '{joke}Nuôi một đứa mà như nuôi cả trung đoàn!' },
      ],
      sfx: [['pop', 'speak'], ['slideUp', 'grow', 0.5], ['pop', 'all'], ['boing', 'joke', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: SG });
        const g = k.at('grow', 2.5, 'inOut');
        k.char(540, SG, 300 + g * 520, { ...(g > 0.6 ? BIG : GIONG), face: 'smug', pose: k.t > k.cue('speak') ? 'point' : 'stand', p: k.at(0, 0.4), bob: 2 });
        k.sweat(700, SG - 300 - g * 520, 1, { p: k.at('grow', 0.4) });
        for (let i = 0; i < 4; i++) {
          const x = [140, 300, 780, 940][i];
          k.char(x, SG, 300, { ...DAN(KC[i], { outfit: 'tunic', hat: i % 2 ? 'non' : 'band' }), face: k.t > k.cue('joke') ? 'laugh' : 'happy', pose: 'present', shadow: false, p: k.at(k.cue('all', i * 0.12), 0.4) });
          k.prop('xoi', x + 30, 1010, 110, { p: k.at(k.cue('all', i * 0.12), 0.4) });
        }
        T(k, 'CẢ LÀNG GÓP GẠO', 540, 220, 86, '#b5482c', k.at('all', 0.5));
        k.bubble(80, 300, 520, 130, 300, 920, { p: k.at('joke', 0.4), text: 'Như nuôi cả trung đoàn!', size: 44 });
      },
    },
    {
      say: 'Giải mã nào. {who}Gióng không lớn lên một mình. {rice}Gióng lớn lên bằng gạo của cả làng. {msg}Nên sức mạnh của Gióng, chính là sức mạnh của cả cộng đồng, khi đất nước có giặc. {today}Đến nay, Hội Gióng vẫn mở mỗi năm, {unesco}và được UNESCO ghi danh năm 2010.',
      sfx: [['pop', 'who'], ['pop', 'rice'], ['tada', 'msg', 0.5], ['pop', 'today'], ['sparkle', 'unesco', 0.5]],
      draw(k) {
        k.backdrop('sunset', { ground: SG });
        k.prop('horse', 540, 1000, 460, { fire: true, p: k.at('who', 0.6) });
        k.char(540, 960, 380, { ...BIG, face: 'smug', pose: 'point', p: k.at('who', 0.6), shadow: false });
        for (let i = 0; i < 5; i++) k.char(120 + i * 210, SG, 240, { ...DAN(KC[i], { outfit: 'tunic', hat: 'band' }), face: 'happy', pose: 'cheer', shadow: false, bob: 4, p: k.at(k.cue('rice', i * 0.1), 0.4) });
        T(k, 'SỨC MẠNH', 540, 200, 100, '#b5482c', k.at('msg', 0.5));
        T(k, 'CỦA CẢ LÀNG', 540, 320, 90, '#e4572e', k.at(k.cue('msg', 0.4), 0.5));
        stamp(k, 540, 480, 'UNESCO 2010', k.at('unesco', 0.5), { w: 460, size: 62, color: '#2e6da4', r: -0.05 });
      },
    },
    fullVideoScene({
      say: '{full}Vậy Thánh Gióng có thật không? Xem tập đầy đủ trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: 'Thánh Gióng có thật không? Truyền thuyết và sử sách nói gì',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
