// Shorts — Ma lai sợ nhất thứ gì? (cắt từ 055 Bí ẩn 1 + 3 + kết; mở bằng câu hỏi, CTA ngắn)
// Đối chiếu: theo lời kể, đầu phải về ráp thân trước khi gà gáy; giấu/lật thân thì không về được (Wikipedia "Krasue", nhiều bản kể).
//   Rào tre gai để vướng ruột Krasue (Thái Lan). "Thứ đuổi ma lai giỏi nhất là trạm y tế, bóng đèn" = câu bình luận của kênh, không phải số liệu.
import { fullVideoScene } from '/engine/templates.js';
import { SG, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const CO = { body: 'woman', outfit: 'dress', color: '#7a6a8a', color2: '#d9d4cb', hair: 'long', hairColor: '#2b2b2b' };
const SANPHU = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'bun' };
const head = (k, x, y, size, o = {}) => k.prop('malai', x + Math.sin((k.gt ?? 0) * 0.8) * 16, y + Math.sin((k.gt ?? 0) * 1.4) * 12, size, { guts: true, cute: true, ...o });

export default {
  meta: shortMeta({
    title: 'Ma lai sợ nhất thứ gì? 🌵 #shorts',
    description: 'Theo lời kể, ma lai bay đi lúc nửa đêm và phải về ráp lại vào thân trước khi gà gáy. Vậy ma lai sợ nhất thứ gì? Câu trả lời buồn cười hơn bạn nghĩ. Xem tập đầy đủ "Ma lai có thật không?" trên kênh Vẽ Là Hiểu!',
    tags: ['ma lai', 'ma lai sợ gì', 'cách trị ma lai', 'krasue', 'ma đầu bay', 'chuyện ma việt nam', 'chuyện ma dân gian'],
    hashtags: ['malai', 'chuyenma'],
    music: 'assets/music/spooky.mp3',
    voices: { malai: { voice: 'vi-VN-HoaiMyNeural', pitch: '+12Hz', rate: '+10%' } },
  }),

  scenes: [
    {
      lead: 0.1,
      say: 'Ma lai {fear}sợ nhất cái gì? {not}Không phải bùa chú đâu. {why}Mà là… {park}mất chỗ gửi cái thân.',
      sfx: [['pop', 0.1], ['pop', 'fear'], ['bonk', 'not', 0.5], ['drumroll', 'why', 0.3], ['boing', 'park', 0.6]],
      draw(k) {
        k.backdrop('night', { ground: SG });
        T(k, 'MA LAI', 540, 210, 130, '#b5482c', k.at(0.1, 0.5));
        T(k, 'sợ nhất thứ gì?', 540, 350, 80, '#3b2f2a', k.at('fear', 0.5));
        const r = k.at('park', 0.6);
        k.group({ a: 1 - r }, () => {
          head(k, 540, 700, 480, { p: k.at(0.1, 0.5) });
          k.prop('scroll', 540, 1050, 220, { p: k.at('not', 0.4) });
          k.icon('cross', 540, 1050, 260, { p: k.at(k.cue('not', 0.3), 0.3) });
        });
        k.group({ a: r }, () => {
          k.char(380, SG, 620, { ...CO, noHead: true, shadow: false });
          head(k, 820, 860, 300);
          k.rect(200, 470, 680, 130, { fill: '#2e6da4', fillStyle: 'solid', width: 6, seed: 6101 });
          k.text('BÃI GỬI THÂN', 540, 537, { size: 70, font: 'title', color: '#fffaf0' });
        });
      },
    },
    {
      say: [
        'Theo lời kể, {off}đêm xuống, đầu ma lai rời khỏi cổ, bay đi kiếm ăn. {rule}Trước khi gà gáy, nó phải về lắp lại vào thân. {hide}Mà nhỡ có ai đem cái thân đi giấu thì sao?',
        { v: 'malai', text: '{where}Ơ, thân tôi đâu? Ai lấy thân tôi rồi?' },
        '{stuck}Thì chịu, hết đường về.',
      ],
      sfx: [['whoosh', 'off', 0.4], ['pop', 'rule'], ['pop', 'hide'], ['boing', 'where', 0.4], ['wahwah', 'stuck', 0.5]],
      draw(k) {
        k.backdrop('night', { ground: SG });
        const off = k.t > k.cue('off');
        const hid = k.at('hide', 0.6);
        k.char(360, SG, 560, { ...CO, noHead: off, face: 'sleep', shadow: false, alpha: 1 - hid });
        k.ellipse(360, SG - 60, 560 * hid + 1, 340 * hid + 1, { fill: '#c9a24a', fillStyle: 'solid', width: 6, seed: 6110, alpha: hid });
        for (let i = -3; i <= 3; i++) k.line(360 + i * 70, SG - 200 * hid, 360 + i * 80, SG + 90 * hid, { stroke: '#9c7a3a', width: 4, seed: 6111 + i, alpha: hid });
        head(k, 760, 640, 300, { p: off ? 1 : 0, talk: k.t > k.cue('where') && k.t < k.cue('stuck') });
        k.prop('rooster', 880, SG - 80, 240, { p: k.at('rule', 0.5) });
        T(k, 'Ò Ó O!', 860, 960, 64, '#f6c344', k.at('rule', 0.4) * (1 - k.at('hide', 0.3)));
        k.bubble(380, 220, 640, 130, 720, 520, { p: k.at('where', 0.3) * (1 - k.at('stuck', 0.3)), text: 'Ai lấy thân tôi rồi?', size: 54 });
        stamp(k, 540, 300, 'HẾT ĐƯỜNG VỀ', k.at('stuck', 0.5), { w: 640, size: 76 });
      },
    },
    {
      say: [
        '{thorn}Bên Thái, theo truyện, người ta còn trồng tre gai quanh nhà, {snag}để ruột ma bay qua là mắc ngay vào gai.',
        { v: 'malai', text: '{ouch}Ối! Nhà ai trồng cái này thế?!' },
        '{real}Còn ngoài đời, thứ đuổi ma lai giỏi nhất là {clinic}trạm y tế {bulb}với cái bóng đèn điện. {joke}Ma lai sợ gà gáy thật, nhưng chắc còn sợ ống tiêm hơn.',
      ],
      sfx: [['pop', 'thorn'], ['scratch', 'snag', 0.5], ['boing', 'ouch', 0.4], ['pop', 'real'], ['ding', 'clinic', 0.4], ['sparkle', 'bulb', 0.4], ['scratch', 'joke', 0.4]],
      draw(k) {
        const day = k.at('real', 0.8);
        k.group({ a: 1 - day }, () => {
          k.backdrop('night', { ground: SG });
          k.prop('thornfence', 600, SG - 70, 900, { p: k.at('thorn', 0.6) });
          const s = k.at('snag', 1.2);
          const hx = k.lerp(160, 520, s), hy = k.lerp(520, 820, s);
          head(k, hx, hy, 300, { talk: k.t > k.cue('ouch') });
          k.burst(620, 900, 150, 'VƯỚNG!', { p: k.at(k.cue('snag', 0.5), 0.4), size: 64 });
          k.bubble(300, 230, 640, 130, hx, hy - 150, { p: k.at('ouch', 0.3), text: 'Nhà ai trồng cái này?!', size: 54 });
        });
        k.group({ a: day }, () => {
          k.backdrop('day', { ground: SG });
          k.rect(520, SG - 420, 480, 420, { fill: '#f5f5f0', fillStyle: 'solid', width: 6, seed: 6120 });
          k.rect(700, SG - 230, 120, 230, { fill: '#7fb5d5', fillStyle: 'solid', width: 5, seed: 6121 });
          T(k, '✚ TRẠM Y TẾ', 760, SG - 490, 64, '#c0392b', k.at('clinic', 0.4));
          k.char(260, SG, 440, { ...SANPHU, face: 'happy', pose: 'hold', p: k.at('real', 0.5) });
          k.prop('baby', 272, SG - 170, 120, { p: k.at('real', 0.5) });
          k.prop('lamp', 920, 300, 220, { p: k.at('bulb', 0.5) });
          T(k, 'sợ ống tiêm hơn 💉', 480, 300, 72, '#b5482c', k.at('joke', 0.4), { maxWidth: 760 });
        });
      },
    },
    fullVideoScene({
      say: '{full}Vì sao có người bị cả làng đồn là ma lai? Tập đầy đủ ở kênh nhé!',
      image: 'poster',
      title: 'Ma lai có thật không? Bí ẩn con ma đầu bay',
      channel: 'Vẽ Là Hiểu',
      tail: 1,
    }),
  ],
};
