// Shorts — Vì sao hồ giữa Hà Nội lại tên là Hồ Gươm? (cắt từ 042; khuôn "Vì sao…" của 020 Xăm mình, nguồn gốc nơi quen như 026 Hồ Tây)
// Đối chiếu: bản Nguyễn Đổng Chi (Kho tàng truyện cổ tích VN): Long Quân sai rùa vàng "Bệ hạ hoàn gươm cho Long Quân!". Lam Sơn thực lục (1431):
//   chỉ có chuyện được gươm. Sơn cư tạp thuật (Đan Sơn, ~1786–1789): rùa to như cái lọng, vua giận ném kiếm xuống hồ, sai tát cạn hồ, không thấy.
//   Nguồn: Lê Thời Tân và cộng sự, Tạp chí Khoa học ĐHSP TP.HCM 16(2), 2019.
import { fullVideoScene } from '/engine/templates.js';
import { SG, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const VUA = { body: 'big', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'crown', hair: 'topknot', beard: true, cape: '#b5482c' };
const LAKE = '#5f9e8f';

export default {
  meta: shortMeta({
    title: 'Vì sao hồ giữa Hà Nội lại tên là Hồ Gươm? 🗡️ #shorts',
    description: 'Hồ Gươm, hồ Hoàn Kiếm: hồ trả gươm. Nhưng cuốn sách cổ nhất chép về thanh gươm của Lê Lợi lại không có con rùa nào, và có bản còn kể nhà vua ném gươm xuống hồ. Xem tập đầy đủ "Rùa thần Hồ Gươm có thật không?" trên kênh Vẽ Là Hiểu!',
    tags: ['hồ gươm', 'hồ hoàn kiếm', 'sự tích hồ gươm', 'lê lợi trả gươm', 'rùa thần hồ gươm', 'rùa vàng', 'hà nội'],
    hashtags: ['hoguom', 'hanoi'],
    voices: { rua: { voice: 'vi-VN-NamMinhNeural', pitch: '-20Hz', rate: '-14%' } },
  }),

  scenes: [
    {
      lead: 0.1,
      say: 'Vì sao hồ giữa Hà Nội {sword}lại tên là Hồ Gươm? {not}Không phải vì hồ dài như thanh gươm đâu. {why}Mà vì… {turtle}một con rùa đến đòi đồ.',
      sfx: [['pop', 0.1], ['sparkle', 'sword', 0.4], ['bonk', 'not', 0.5], ['drumroll', 'why', 0.3], ['boing', 'turtle', 0.6]],
      draw(k) {
        k.backdrop('day', { ground: 620 });
        k.water(660, { color: LAKE, amp: 8 });
        const r = k.at('turtle', 0.8, 'out');
        T(k, 'HỒ GƯƠM', 540, 210, 150, '#b5482c', k.at(0.1, 0.5));
        T(k, 'vì sao tên vậy?', 540, 360, 76, '#3b2f2a', k.at('sword', 0.5));
        k.group({ a: 1 - r }, () => {
          k.prop('sword', 540, 860, 520, { rotate: 1.5708, glow: true, p: k.at('sword', 0.5) });
          T(k, 'hình thanh gươm', 540, 1060, 70, '#6b5f55', k.at('not', 0.4));
          k.icon('cross', 540, 870, 300, { p: k.at(k.cue('not', 0.3), 0.3) });
        });
        k.prop('turtle', 540, k.lerp(1300, 900, r), 620, { glow: true, talk: true, p: r > 0 ? 1 : 0 });
        k.water(1000, { color: LAKE, amp: 6, alpha: 0.7 * r });
        T(k, 'ĐÒI ĐỒ!', 540, 560, 110, '#e4572e', k.at(k.cue('turtle', 0.4), 0.4));
      },
    },
    {
      say: [
        '{legend}Tương truyền, đánh đuổi giặc Minh xong, {boat}vua Lê Lợi dạo thuyền rồng trên hồ. {rise}Một con rùa vàng nổi lên:',
        { v: 'rua', text: '{talk}Bệ hạ hoàn gươm cho Long Quân!' },
        '{fly}Thanh gươm bay về miệng rùa. {name}Từ đó, hồ mang tên Hoàn Kiếm: hồ trả gươm.',
      ],
      sfx: [['pop', 'legend'], ['pop', 'boat'], ['slideUp', 'rise', 0.5], ['pop', 'talk'], ['whoosh', 'fly', 0.6], ['tada', 'name', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: 760 });
        const rise = k.at('rise', 1, 'out'), fly = k.at('fly', 1.2, 'inOut');
        k.prop('turtle', 760, k.lerp(1100, 860, rise), 380, { glow: true, talk: k.t > k.cue('talk') && k.t < k.cue('fly'), p: rise > 0 ? 1 : 0 });
        k.water(820, { color: LAKE, amp: 6, alpha: 0.85 });
        k.prop('boat', 330, 1000, 520, { fill: '#c9a24a', p: k.at('boat', 0.4) });
        k.char(320, 985, 330, { ...VUA, face: k.t > k.cue('fly') ? 'happy' : k.t > k.cue('rise') ? 'shock' : 'calm', pose: k.t > k.cue('fly') ? 'present' : 'hold', shadow: false, p: k.at('boat', 0.4) });
        k.prop('sword', k.lerp(420, 840, fly), k.lerp(720, 820, fly) - Math.sin(fly * Math.PI) * 220, 180, { rotate: k.lerp(0.3, 1.6, fly), glow: true, p: k.at('boat', 0.4), alpha: 1 - k.at(k.cue('fly', 1.1), 0.3) });
        k.bubble(300, 220, 700, 160, 760, 760, { p: k.at('talk', 0.4) * (1 - k.at('name', 0.3)), text: 'Bệ hạ hoàn gươm cho Long Quân!', size: 50 });
        T(k, 'HOÀN KIẾM', 540, 240, 120, '#e4572e', k.at('name', 0.5));
        T(k, '= trả gươm', 540, 380, 76, '#3b2f2a', k.at('name', 0.5), { fx: 'fade' });
        k.water(1180, { color: LAKE, amp: 5, alpha: 0.5 });
      },
    },
    {
      say: '{but}Nhưng cuốn sách cổ nhất chép về thanh gươm, Lam Sơn thực lục năm 1431, {none}không có con rùa nào cả. {later}Hơn ba trăm năm sau, một cuốn dã sử còn kể: {throw}vua giận, ném gươm xuống hồ, {drain}rồi sai tát cạn hồ để tìm. {lost}Không thấy gì.',
      sfx: [['scratch', 'but', 0.5], ['bonk', 'none', 0.5], ['pop', 'later'], ['whoosh', 'throw', 0.5], ['slideDown', 'drain', 0.5], ['wahwah', 'lost', 0.5]],
      draw(k) {
        const two = k.at('later', 0.5);
        k.group({ x: 540, y: 520, s: Math.max(0.01, k.ease.back(k.at('but', 0.5))) * (1 - 0.35 * two), r: -0.02 }, () => {
          k.rect(-420, -230, 840, 460, { fill: '#f6e7c1', width: 5, seed: 300 });
          k.text('LAM SƠN THỰC LỤC', 0, -150, { size: 56, font: 'title', color: '#b5482c' });
          k.text('năm 1431 · sách cổ nhất', 0, -70, { size: 42, color: '#3f6f2a', weight: 700 });
          k.prop('turtle', 0, 90, 260);
          k.icon('cross', 0, 80, 300, { p: k.at('none', 0.4) });
        });
        k.group({ a: two }, () => {
          k.rect(-40, 760, 1160, 560, { fill: '#a88a5a', fillStyle: 'solid', width: 4, seed: 301 });
          const d = k.at('drain', 1.2, 'inOut');
          k.water(k.lerp(800, 1300, d), { color: LAKE, amp: 6 });
          k.char(300, 1000 + d * 160, 300, { ...VUA, face: k.t > k.cue('lost') ? 'sad' : 'angry', pose: k.t > k.cue('drain') ? 'shrug' : 'shout', shadow: false });
          const f = k.at('throw', 0.8, 'in');
          k.prop('sword', k.lerp(420, 800, f), k.lerp(820, 1000, f) - Math.sin(f * Math.PI) * 140, 150, { rotate: f * 3, alpha: 1 - k.at('drain', 0.3) });
          T(k, 'NÉM GƯƠM?!', 760, 860, 76, '#e4572e', k.at('throw', 0.4) * (1 - k.at('lost', 0.3)));
          k.icon('question', 780, 1050, 180, { p: k.at('lost', 0.4) });
        });
      },
    },
    {
      say: '{old}Các bản cũ kể chuyện mất gươm. {new}Bản ngày nay kể chuyện trả gươm: {peace}hết giặc thì cất vũ khí đi. {grow}Cái tên Hồ Gươm, hoá ra lớn lên cùng câu chuyện.',
      sfx: [['wahwah', 'old', 0.4], ['tada', 'new', 0.4], ['sparkle', 'peace', 0.4], ['ding', 'grow', 0.5]],
      draw(k) {
        k.rect(80, 260, 420, 520, { fill: '#e9e2d0', fillStyle: 'solid', width: 5, seed: 310 });
        k.rect(580, 260, 420, 520, { fill: '#e2f0e4', fillStyle: 'solid', width: 5, seed: 311 });
        k.prop('sword', 290, 500, 220, { rotate: 2.6, alpha: 0.6, p: k.at('old', 0.5) });
        k.text('MẤT GƯƠM', 290, 700, { size: 60, font: 'title', color: '#c0392b', fx: 'pop', p: k.at('old', 0.5) });
        k.text('bản cũ', 290, 320, { size: 44, font: 'title', color: '#6b5f55' });
        k.prop('turtle', 760, 520, 240, { glow: true, p: k.at('new', 0.5) });
        k.prop('sword', 900, 460, 150, { glow: true, rotate: 0.5, p: k.at('new', 0.5) });
        k.text('TRẢ GƯƠM', 790, 700, { size: 60, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('new', 0.5) });
        k.text('bản ngày nay', 790, 320, { size: 44, font: 'title', color: '#3f6f2a' });
        T(k, 'hết giặc → cất vũ khí', 540, 880, 64, '#3b2f2a', k.at('peace', 0.5), { fx: 'fade' });
        stamp(k, 540, 1120, 'TÊN HỒ LỚN LÊN', k.at('grow', 0.5), { w: 660, size: 62, color: '#3f6f2a' });
      },
    },
    fullVideoScene({
      say: '{full}Còn cụ rùa thật ở hồ là con gì? Tập đầy đủ ở kênh nhé!',
      image: 'poster',
      title: 'Rùa thần Hồ Gươm có thật không? Bí ẩn chuyện trả gươm',
      channel: 'Vẽ Là Hiểu',
      tail: 1,
    }),
  ],
};
