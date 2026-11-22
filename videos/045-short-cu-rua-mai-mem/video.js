// Shorts — Vì sao cụ rùa Hồ Gươm không có mai cứng? (cắt từ 042; khuôn "Vì sao…" của 020 Xăm mình). Giọng trân trọng ở đoạn cụ rùa mất.
// Đối chiếu: Rafetus swinhoei (giải Thượng Hải / rùa Hoàn Kiếm) là rùa mai mềm; cân 169 kg khi đưa lên bể chữa trị năm 2011; phát hiện chết
//   19/1/2016, làm tiêu bản. Bảo tồn: cá thể cái cuối cùng được biết (Tô Châu) chết 2019, cá thể Đồng Mô chết 2023 → chỉ còn biết vài cá thể,
//   chưa thấy con cái nào. Sơn cư tạp thuật (~1786–1789): "rùa to như cái lọng" nổi lên giữa hồ.
import { fullVideoScene } from '/engine/templates.js';
import { SG, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const KID = { body: 'kid', outfit: 'tunic', color: '#e4572e', color2: '#f6c344', hair: 'short' };
const LAKE = '#5f9e8f';

export default {
  meta: shortMeta({
    title: 'Vì sao cụ rùa Hồ Gươm không có mai cứng? 🐢 #shorts',
    description: 'Rùa vàng trong truyện có mai vảy vàng óng, còn cụ rùa Hồ Gươm ngoài đời lại có mai mềm phủ da. Cụ là loài gì, nặng bao nhiêu, và cả thế giới còn bao nhiêu con? Xem tập đầy đủ "Rùa thần Hồ Gươm có thật không?" trên kênh Vẽ Là Hiểu!',
    tags: ['cụ rùa hồ gươm', 'rùa hồ gươm', 'rafetus swinhoei', 'rùa hoàn kiếm', 'giải thượng hải', 'rùa mai mềm', 'hồ gươm'],
    hashtags: ['curuahoguom', 'hoguom'],
    voices: { kid: { voice: 'vi-VN-HoaiMyNeural', pitch: '+30Hz', rate: '+6%' } },
  }),

  scenes: [
    {
      lead: 0.1,
      say: 'Vì sao cụ rùa Hồ Gươm {soft}lại không có mai cứng? {not}Không phải vì cụ già đâu. {why}Mà vì… {giai}cụ là một con giải.',
      sfx: [['pop', 0.1], ['pop', 'soft'], ['bonk', 'not', 0.5], ['drumroll', 'why', 0.3], ['boing', 'giai', 0.6]],
      draw(k) {
        k.backdrop('day', { ground: 700 });
        k.water(740, { color: LAKE, amp: 8 });
        const r = k.at('giai', 0.6);
        T(k, 'CỤ RÙA HỒ GƯƠM', 540, 200, 96, '#b5482c', k.at(0.1, 0.5));
        T(k, 'không có mai cứng?', 540, 330, 76, '#3b2f2a', k.at('soft', 0.5));
        k.prop('softshell', 540, 820, 720, { p: k.at(0.1, 0.5) });
        k.water(860, { color: LAKE, amp: 6, alpha: 0.6 });
        k.group({ a: 1 - r }, () => {
          T(k, 'vì cụ già', 540, 520, 80, '#6b5f55', k.at('not', 0.4));
          k.icon('cross', 540, 520, 240, { p: k.at(k.cue('not', 0.3), 0.3) });
        });
        stamp(k, 540, 540, 'CON GIẢI!', r, { w: 520, size: 84, color: '#3f6f2a' });
      },
    },
    {
      say: [
        '{gold}Rùa trong truyện có mai vảy vàng óng. {real}Cụ rùa ngoài đời: mai phủ da trơn, {nose}mõm dài như ống thở.',
        { v: 'kid', text: '{ask}Ơ, thế áo giáp của cụ đâu ạ?' },
        '{name}Đó là loài giải, rùa mai mềm, tên khoa học Rafetus swinhoei.',
      ],
      sfx: [['sparkle', 'gold', 0.4], ['pop', 'real'], ['boing', 'nose', 0.4], ['pop', 'ask'], ['ding', 'name', 0.4]],
      draw(k) {
        k.prop('turtle', 540, 420, 520, { glow: true, p: k.at('gold', 0.5) });
        T(k, 'trong truyện', 540, 220, 70, '#b5482c', k.at('gold', 0.5));
        k.prop('softshell', 540, 900, 600, { p: k.at('real', 0.5) });
        T(k, 'ngoài đời', 540, 1090, 70, '#3f6f2a', k.at('real', 0.5));
        k.circle(820, 880, 80, { stroke: '#e4572e', width: 7, seed: 340, p: k.at('nose', 0.5) });
        k.char(160, SG, 300, { ...KID, face: 'shock', pose: 'point', shadow: false, p: k.at('ask', 0.4) });
        k.bubble(60, 640, 640, 130, 160, 960, { p: k.at('ask', 0.4) * (1 - k.at('name', 0.3)), text: 'Áo giáp của cụ đâu ạ?', size: 48 });
        T(k, 'GIẢI · Rafetus swinhoei', 600, 1200, 58, '#3f6f2a', k.at('name', 0.5), { maxWidth: 900 });
      },
    },
    {
      say: '{y2011}Năm 2011, cụ được đưa lên chữa trị. {kg}Cân lên: một trăm sáu mươi chín ký. {y2016}Đầu năm 2016, cụ mất. {rare}Cả thế giới giờ chỉ còn biết vài cá thể loài này, {female}chưa thấy con cái nào.',
      sfx: [['pop', 'y2011'], ['drumroll', 'kg', 0.3], ['tada', ['kg', 1.2], 0.4], ['pop', 'y2016'], ['pop', 'rare'], ['pop', 'female']],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#e9e2d0', fillStyle: 'solid', stroke: 'none', seed: 350 });
        k.prop('softshell', 540, 620, 640, { p: k.at('y2011', 0.5) });
        k.prop('net', 540, 600, 520, { alpha: 0.7 * (1 - k.at('kg', 0.4)), p: k.at('y2011', 0.5) });
        T(k, '2011', 540, 200, 100, '#3b2f2a', k.at('y2011', 0.5) * (1 - k.at('y2016', 0.3)));
        T(k, '169 kg', 540, 330, 130, '#e4572e', k.at('kg', 0.5));
        T(k, '2016', 540, 200, 100, '#3b2f2a', k.at('y2016', 0.5));
        stamp(k, 540, 960, 'CHỈ CÒN VÀI CÁ THỂ', k.at('rare', 0.5), { w: 760, size: 60 });
        T(k, '0 con cái được biết', 540, 1130, 60, '#c0392b', k.at('female', 0.5), { fx: 'fade' });
      },
    },
    {
      say: '{old}Sách cổ tả con rùa giữa hồ "to như cái lọng". {maybe}Nhiều khả năng, chính những con giải khổng lồ ấy đã gợi nên rùa thần trong truyện. {now}Gươm đã trả rồi. {us}Giờ đến lượt chúng ta giữ lấy con rùa.',
      sfx: [['pop', 'old'], ['sparkle', 'maybe', 0.4], ['pop', 'now'], ['ding', 'us', 0.5]],
      draw(k) {
        k.backdrop('sunset', { ground: 700 });
        k.water(740, { color: LAKE, amp: 6 });
        k.prop('thaprua', 820, 760, 200);
        k.prop('softshell', 420, 820, 520);
        k.water(860, { color: LAKE, amp: 5, alpha: 0.6 });
        k.prop('turtle', 540, 470, 360, { glow: true, alpha: 0.55, p: k.at('maybe', 0.6) });
        T(k, '"to như cái lọng"', 540, 220, 72, '#b5482c', k.at('old', 0.5) * (1 - k.at('now', 0.3)));
        T(k, 'GƯƠM ĐÃ TRẢ', 540, 220, 90, '#e4572e', k.at('now', 0.5));
        stamp(k, 540, 1120, 'GIỮ LẤY CON RÙA', k.at('us', 0.5), { w: 680, size: 66 });
      },
    },
    fullVideoScene({
      say: '{full}Rùa thần đòi gươm có thật không? Tập đầy đủ ở kênh nhé!',
      image: 'poster',
      title: 'Rùa thần Hồ Gươm có thật không? Bí ẩn chuyện trả gươm',
      channel: 'Vẽ Là Hiểu',
      tail: 1,
    }),
  ],
};
