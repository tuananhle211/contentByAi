// Shorts — Vì sao có nỏ thần mà An Dương Vương vẫn mất nước? (cắt từ 033; khuôn "Vì sao…" của 020 Xăm mình)
// Đối chiếu: Toàn thư (Thục kỷ): Triệu Đà cầu hôn Mỵ Châu cho Trọng Thủy, Trọng Thủy ở rể, dỗ Mỵ Châu cho xem nỏ, ngầm đổi lẫy (vuốt rùa);
//   Đà đánh, vua cậy nỏ "vẫn điềm nhiên đánh cờ, cười mà nói: Đà không sợ nỏ thần sao?"; quân Đà tiến sát, vua cầm nỏ thì đã mất vuốt rùa.
import { fullVideoScene } from '/engine/templates.js';
import { SG, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const ADV = { body: 'big', outfit: 'tunic', color: '#4a4a5a', color2: '#c9a24a', hat: 'helmet', hair: 'short', beard: true, cape: '#2b2f3d' };
const MC = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'long', hat: 'flower', cape: '#f4efe6' };
const TT = { body: 'man', outfit: 'robe', color: '#2e6da4', color2: '#e9e4dc', hair: 'topknot', hat: 'band' };
const NAM = { body: 'man', outfit: 'tunic', color: '#7a2e2e', color2: '#c9a24a', hat: 'helmet', hair: 'short' };
const claw = (k, x, y, s, p) => k.group({ x, y, s: Math.max(0.01, s * Math.min(1, p * 2)), a: Math.min(1, p * 3) }, () => {
  k.poly([[-14, 30], [-10, -6], [4, -34], [16, -38], [8, -10], [10, 30]], { fill: '#e8b84a', fillStyle: 'solid', width: 4, seed: 985 });
});

export default {
  meta: shortMeta({
    title: 'Vì sao có nỏ thần mà An Dương Vương vẫn mất nước? #shorts',
    description: 'Nỏ thần bắn một phát giết hàng trăm giặc, vậy mà nước Âu Lạc vẫn mất. Không phải vì nỏ hỏng, mà vì… con rể. Xem tập đầy đủ "Nỏ thần có thật không? Mỵ Châu – Trọng Thủy" trên kênh Vẽ Là Hiểu!',
    tags: ['nỏ thần', 'an dương vương', 'mỵ châu trọng thủy', 'trọng thủy', 'triệu đà', 'âu lạc', 'thành cổ loa'],
    hashtags: ['nothan', 'mychautrongthuy'],
    voices: {
      tt: { voice: 'vi-VN-NamMinhNeural', pitch: '+10Hz', rate: '+4%' },
      adv: { voice: 'vi-VN-NamMinhNeural', pitch: '-12Hz', rate: '-6%' },
    },
  }),

  scenes: [
    {
      lead: 0.1,
      say: 'Vì sao có nỏ thần, {lost}mà An Dương Vương vẫn mất nước? {not}Không phải vì nỏ hỏng đâu. {why}Mà vì… {son}con rể.',
      sfx: [['sparkle', 0.1, 0.4], ['bonk', 'lost', 0.5], ['bonk', 'not', 0.5], ['drumroll', 'why', 0.3], ['boing', 'son', 0.6]],
      draw(k) {
        k.backdrop('sunset', { ground: SG });
        const s = k.at('son', 0.5);
        T(k, 'CÓ NỎ THẦN', 540, 210, 120, '#b5482c', k.at(0.1, 0.5));
        T(k, 'mà vẫn mất nước?', 540, 350, 80, '#3b2f2a', k.at('lost', 0.6));
        k.char(300, SG, 520, { ...ADV, face: s > 0.5 ? 'shock' : 'smug', pose: 'hold', p: k.at(0.1, 0.5) });
        k.prop('crossbow', 520, 820, 300, { glow: true, p: k.at(0.1, 0.5) });
        k.group({ a: 1 - s }, () => {
          T(k, 'nỏ hỏng', 800, 620, 80, '#6b5f55', k.at('not', 0.4));
          k.icon('cross', 800, 620, 220, { p: k.at(k.cue('not', 0.3), 0.3) });
        });
        k.char(820, SG, 520, { ...TT, face: 'smug', pose: 'hips', flip: true, p: s });
        T(k, 'CON RỂ!', 820, 560, 100, '#e4572e', s);
      },
    },
    {
      say: [
        'Triệu Đà đánh Âu Lạc mãi không thắng, {plan}bèn cho con trai là Trọng Thủy sang cưới Mỵ Châu, rồi ở rể luôn. {ask}Một hôm, Trọng Thủy dỗ vợ:',
        { v: 'tt', text: '{see}Nàng cho ta xem nỏ thần của cha một chút, được không?' },
        '{swap}Rồi chàng lén tháo chiếc vuốt rùa, {fake}thay bằng một cái lẫy thường.',
      ],
      sfx: [['pop', 'plan'], ['sparkle', 'ask', 0.4], ['pop', 'see'], ['scratch', 'swap', 0.5], ['click', 'fake', 0.6]],
      draw(k) {
        k.backdrop('day', { ground: SG });
        k.prop('heart', 540, 520, 120, { p: k.at('plan', 0.5), bob: 4 });
        k.char(330, SG, 440, { ...MC, face: 'happy', pose: k.t > k.cue('see') ? 'present' : 'stand', p: k.at('plan', 0.5) });
        k.char(760, SG, 460, { ...TT, face: k.t > k.cue('swap') ? 'smug' : 'happy', pose: k.t > k.cue('swap') ? 'hold' : 'present', flip: true, p: k.at('plan', 0.5) });
        k.prop('crossbow', 540, 900, 240, { glow: k.t < k.cue('fake'), p: k.at('see', 0.5) });
        k.bubble(300, 160, 640, 150, 720, 640, { p: k.at('see', 0.4) * (1 - k.at('swap', 0.3)), text: 'Cho ta xem nỏ thần một chút?', size: 46 });
        const zp = k.at('swap', 0.5, 'back');
        k.group({ x: 540, y: 420, s: Math.max(0.01, zp) }, () => {
          k.rect(-280, -150, 560, 300, { fill: '#fffaf0', fillStyle: 'solid', width: 6, seed: 170 });
          claw(k, -130, 0, 2.4, 1 - k.at('fake', 0.5));
          k.rect(90, -50, 70, 110, { fill: '#9a9a9a', fillStyle: 'solid', width: 4, seed: 171, alpha: k.at('fake', 0.5) });
          k.arrow(-40, 0, 60, 0, { width: 6, p: k.at('fake', 0.5) });
          k.text('vuốt rùa → lẫy thường', 0, 115, { size: 38, font: 'title', fx: 'fade', p: k.at('fake', 0.5) });
        });
      },
    },
    {
      say: [
        '{war}Rồi quân Triệu Đà kéo đến. {chess}Theo Đại Việt sử ký toàn thư, nhà vua vẫn điềm nhiên ngồi đánh cờ, cười mà nói:',
        { v: 'adv', text: '{laugh}Đà không sợ nỏ thần sao?' },
        '{near}Giặc đến sát thành. {shoot}Vua cầm nỏ lên, {gone}thì vuốt rùa đã mất.',
      ],
      sfx: [['drumroll', 'war', 0.3], ['click', 'chess', 0.5], ['pop', 'laugh'], ['boom', 'near', 0.4], ['pop', 'shoot'], ['wahwah', 'gone', 0.6]],
      draw(k) {
        k.backdrop('sunset', { ground: SG });
        k.rect(380, 1050, 300, 180, { fill: '#c98a3a', fillStyle: 'solid', width: 4, seed: 210, p: k.at('chess', 0.4) > 0 ? 1 : 0 });
        k.dot(450, 1090, 12, '#c0392b', k.at('chess', 0.4)); k.dot(600, 1110, 12, '#3b2f2a', k.at('chess', 0.4));
        const lost = k.t > k.cue('gone');
        k.char(260, SG, 480, { ...ADV, face: lost ? 'shock' : k.t > k.cue('laugh') ? 'laugh' : 'smug', pose: k.t > k.cue('shoot') ? 'hold' : 'hips', p: k.at('chess', 0.5) });
        k.prop('crossbow', 470, 820, 240, { p: k.at('shoot', 0.4) });
        k.bubble(80, 420, 620, 150, 260, 720, { p: k.at('laugh', 0.4), text: 'Đà không sợ nỏ thần sao?', size: 50 });
        const adv = k.at('near', 1.6, 'out');
        for (let i = 0; i < 6; i++) k.char(1300 - adv * 450 + (i % 3) * 130, SG + (i > 2 ? 60 : 0) - 30, 230, { ...NAM, face: 'angry', pose: i % 2 ? 'fight' : 'point', walk: true, flip: true, shadow: false, p: k.at('war', 0.5) });
        T(k, 'MẤT VUỐT RÙA!', 540, 230, 100, '#c0392b', k.at('gone', 0.5));
        k.sweat(330, 600, 1.4, { p: k.at('gone', 0.4) });
      },
    },
    {
      say: '{lesson}Nên nỏ thần không mất phép vì một cái lẫy. {real}Thứ mất đi trước tiên… {echo}là sự cảnh giác.',
      sfx: [['pop', 'lesson'], ['drumroll', 'real', 0.3], ['gong', 'echo', 0.4]],
      draw(k) {
        k.prop('crossbow', 540, 560, 520, { p: k.at('lesson', 0.5) });
        claw(k, 540, 860, 3, k.at('lesson', 0.5));
        k.icon('cross', 540, 850, 240, { p: k.at(k.cue('lesson', 0.6), 0.4) });
        T(k, 'Thứ mất đi trước tiên:', 540, 220, 70, '#3b2f2a', k.at('real', 0.6));
        stamp(k, 540, 1120, 'SỰ CẢNH GIÁC', k.at('echo', 0.5), { w: 620, size: 76 });
      },
    },
    fullVideoScene({
      say: '{full}Còn rùa vàng, lông ngỗng, và bản kể cổ nhất có gì lạ? Xem tập đầy đủ trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: 'Nỏ thần có thật không? Mỵ Châu – Trọng Thủy và thành Cổ Loa',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
