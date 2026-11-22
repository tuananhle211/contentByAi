// Shorts — 18 đời vua Hùng mà trị vì 2.622 năm? (dọc 9:16, cắt từ tập 023)
// Đối chiếu: Đại Việt sử ký toàn thư (1479), Ngoại kỷ: Kinh Dương Vương lên ngôi 2879 TCN, họ Hồng Bàng hết 258 TCN (2.622 năm, tính cả
//   Kinh Dương Vương và Lạc Long Quân); Kinh Dương Vương là anh em với Đế Nghi (trị phương Bắc). Sử học hiện nay: Văn Lang ra đời
//   khoảng thế kỷ VII TCN. 18 × 25 năm là phép thử vui, không phải bằng chứng.
import { C } from '/engine/kit.js';
import { fullVideoScene } from '/engine/templates.js';

const G = 1250;
const KING = { body: 'man', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'kingfeather', beard: true, hair: 'short', cape: '#b5482c' };
const OLD = { ...KING, beard: 'long', beardColor: '#ffffff', hairColor: '#e9e4dc' };
const KDV = { body: 'man', outfit: 'robe', color: '#3f7d3a', color2: '#f6c344', hat: 'crown', beard: 'long', beardColor: '#e9e4dc', hair: 'long', hairColor: '#e9e4dc', cape: '#2f6a2c' };
const DENGHI = { body: 'man', outfit: 'robe', color: '#8a3a3a', color2: '#f6c344', hat: 'crown', beard: true, hair: 'topknot' };
const T = (k, s, x, y, size, color, p, o = {}) => k.text(s, x, y, { size, font: 'title', color, fx: o.fx ?? 'pop', p, outline: '#fffaf0', outlineWidth: size * 0.14, maxWidth: o.maxWidth ?? 1000 });

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    format: 'short',
    captions: true,
    title: '18 đời vua Hùng mà trị vì 2.622 năm? 🤔 #shorts',
    description: '18 đời vua Hùng mà kéo dài 2.622 năm, mỗi vua gần 146 năm? Con số ấy đến từ đâu, và sử học ngày nay nói gì? Xem tập đầy đủ "18 đời vua Hùng sống 2.622 năm?" trên kênh Vẽ Là Hiểu!',
    tags: ['18 đời vua hùng', 'vua hùng', '2622 năm', 'nước văn lang', 'hồng bàng', 'kinh dương vương', 'truyền thuyết việt nam', 'shorts', 'vẽ là hiểu'],
    hashtags: ['shorts', 'vuahung', 'suviet'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '+0%',
    voices: { king: { voice: 'vi-VN-NamMinhNeural', pitch: '-12Hz', rate: '-6%' } },
    images: { poster: 'assets/poster.jpg' },
    music: 'assets/music/background.mp3',
    musicVolume: 0.08,
    sfxVolume: 0.5,
    transition: 'fade',
  },

  scenes: [
    {
      lead: 0.1,
      say: '{n18}Mười tám đời vua Hùng, {yrs}mà kéo dài hai nghìn sáu trăm hai mươi hai năm? {res}Mỗi vua trị vì… một trăm bốn mươi sáu năm? {old}Lên ngôi hai mươi tuổi, thoái vị một trăm sáu mươi sáu!',
      sfx: [['pop', 'n18'], ['pop', 'yrs'], ['ding', 'res', 0.5], ['slideUp', 'old', 0.5], ['boing', ['old', 1.6], 0.5]],
      draw(k) {
        k.backdrop('sunset', { ground: G });
        k.prop('palace', 540, 1000, 700, { alpha: 0.9 });
        T(k, '18 VUA', 540, 200, 130, '#3b2f2a', k.at('n18', 0.5));
        T(k, '2.622 NĂM?', 540, 350, 120, '#b5482c', k.at('yrs', 0.5));
        T(k, '≈ 146 năm / vua', 540, 510, 90, '#e4572e', k.at('res', 0.6));
        const old = k.at('old', 1.2, 'inOut');
        const o = old > 0.5 ? OLD : KING;
        k.char(540, G, 560, { ...o, prop: old > 0.5 ? 'staff' : undefined, lean: old * 0.08, face: old > 0.5 ? 'shock' : 'happy', pose: old > 0.5 ? 'hold' : 'wave', p: k.at(0, 0.5), bob: 2 });
        T(k, k.t > k.cue('old', 0.8) ? '166 tuổi!' : '20 tuổi', 860, 760, 64, old > 0.5 ? '#c0392b' : '#3f6f2a', k.at('old', 0.4));
      },
    },
    {
      say: 'Con số này nằm trong {toan}Đại Việt sử ký toàn thư, năm 1479. {nghi}Sách cho ông tổ nước Nam, Kinh Dương Vương, làm anh em với vua phương Bắc, {msg}như muốn nói: nước ta lâu đời, chẳng kém ai. {all}Mà hai nghìn sáu trăm năm ấy, còn tính cả Kinh Dương Vương lẫn Lạc Long Quân.',
      sfx: [['pop', 'toan'], ['pop', 'nghi'], ['tada', 'msg', 0.4], ['scratch', 'all', 0.4]],
      draw(k) {
        k.prop('scroll', 540, 260, 200, { p: k.at('toan', 0.5) });
        T(k, 'TOÀN THƯ · 1479', 540, 430, 80, '#b5482c', k.at('toan', 0.5));
        k.line(540, 560, 540, 1150, { width: 5, stroke: '#6b5f55', p: k.at('nghi', 0.6) });
        k.char(290, 1150, 440, { ...DENGHI, face: 'calm', pose: 'hips', p: k.at('nghi', 0.5) });
        k.char(790, 1150, 440, { ...KDV, face: 'smug', pose: 'hips', flip: true, p: k.at('nghi', 0.5) });
        T(k, 'phương Bắc', 290, 620, 50, '#8a3a3a', k.at('nghi', 0.5), { fx: 'fade' });
        T(k, 'phương Nam', 790, 620, 50, '#3f7d3a', k.at('nghi', 0.5), { fx: 'fade' });
        T(k, 'NGANG HÀNG!', 540, 1290, 90, '#c0392b', k.at('msg', 0.5) * (1 - k.at('all', 0.3)));
        T(k, '(tính cả ông nội và bố vua Hùng 1)', 540, 1290, 50, '#3b2f2a', k.at('all', 0.6), { fx: 'fade', maxWidth: 980 });
      },
    },
    {
      say: 'Còn sử học ngày nay? {ds}Văn Lang ra đời khoảng thế kỷ bảy trước Công nguyên, {sum}tới năm 258 là chừng ba, bốn trăm năm. {calc}Mười tám đời, mỗi đời hai mươi lăm năm: {res}bốn trăm năm mươi năm. {ok}Mười tám đời thì nghe hợp lý. {only}Chỉ có hai nghìn sáu trăm năm là… hơi hào phóng.',
      sfx: [['pop', 'ds'], ['ding', 'sum', 0.4], ['drumroll', 'calc', 0.3], ['tada', 'res', 0.5], ['ding', 'ok', 0.4], ['wahwah', 'only', 0.5]],
      draw(k) {
        k.prop('drumface', 540, 330, 420, { p: k.at('ds', 0.6), spin: 0.12 });
        T(k, '~ thế kỷ VII TCN → 258 TCN', 540, 620, 56, '#3f6f2a', k.at('ds', 1, 'linear'), { fx: 'write' });
        T(k, '≈ 300–400 năm', 540, 720, 80, '#3b2f2a', k.at('sum', 0.5));
        T(k, '18 × 25 ≈ 450 năm', 540, 880, 90, '#e4572e', k.at('res', 0.6));
        k.icon('check', 540, 1020, 130, { p: k.at('ok', 0.5) });
        k.char(880, 1250, 250, { ...OLD, face: k.t > k.cue('only') ? 'blank' : 'smug', pose: k.t > k.cue('only') ? 'shrug' : 'hips', p: k.at('calc', 0.5), shadow: false });
        T(k, '2.622 năm = hơi hào phóng', 540, 1300, 60, '#c0392b', k.at('only', 0.6));
      },
    },
    fullVideoScene({
      say: '{full}Vậy vua Hùng có thật không? Xem tập đầy đủ trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: '18 đời vua Hùng sống 2.622 năm? Giải mã nước Văn Lang',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
