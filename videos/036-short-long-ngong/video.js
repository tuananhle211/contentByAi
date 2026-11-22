// Shorts — Vì sao Mỵ Châu rắc lông ngỗng dọc đường? (cắt từ 033; khuôn "Vì sao…" của 020 Xăm mình)
// Đối chiếu: Toàn thư / Lĩnh Nam chích quái: Trọng Thủy hỏi chuyện lạc nhau → Mỵ Châu: áo lông ngỗng, rắc ở ngã ba đường làm dấu; khi chạy
//   về phương Nam, lông ngỗng thành dấu chỉ đường cho quân Triệu. Giao Châu ngoại vực ký (dẫn trong Thủy kinh chú), bản kể cổ nhất:
//   con Nam Việt vương cưa đứt nỏ — không có áo lông ngỗng.
import { fullVideoScene } from '/engine/templates.js';
import { SG, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const ADV = { body: 'big', outfit: 'tunic', color: '#4a4a5a', color2: '#c9a24a', hat: 'helmet', hair: 'short', beard: true, cape: '#2b2f3d' };
const MC = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'long', hat: 'flower', cape: '#f4efe6' };
const TT = { body: 'man', outfit: 'robe', color: '#2e6da4', color2: '#e9e4dc', hair: 'topknot', hat: 'band' };
const NAM = { body: 'man', outfit: 'tunic', color: '#7a2e2e', color2: '#c9a24a', hat: 'helmet', hair: 'short' };

const feathers = (k, x0, y0, w, h, p, n = 7) => {
  for (let i = 0; i < n; i++) {
    const t = (k.gt * 0.22 + i / n) % 1;
    k.prop('feather', x0 + Math.sin(t * 6 + i) * w * 0.3 + (i / n) * w * 0.6, y0 + t * h, 80, { rotate: Math.sin(t * 5 + i), p });
  }
};

export default {
  meta: shortMeta({
    title: 'Vì sao Mỵ Châu rắc lông ngỗng dọc đường? 🪶 #shorts',
    description: 'Mỵ Châu rắc lông ngỗng ở từng ngã ba để chồng tìm được mình, và vô tình chỉ đường cho quân giặc. Nhưng bản kể cổ nhất lại không hề có chiếc áo lông ngỗng ấy. Xem tập đầy đủ "Nỏ thần có thật không? Mỵ Châu – Trọng Thủy" trên kênh Vẽ Là Hiểu!',
    tags: ['mỵ châu', 'áo lông ngỗng', 'mỵ châu trọng thủy', 'trọng thủy', 'an dương vương', 'truyền thuyết mỵ châu'],
    hashtags: ['mychau', 'mychautrongthuy'],
    voices: {
      tt: { voice: 'vi-VN-NamMinhNeural', pitch: '+10Hz', rate: '+4%' },
      mc: { voice: 'vi-VN-HoaiMyNeural', pitch: '+0Hz', rate: '-2%' },
    },
  }),

  scenes: [
    {
      lead: 0.1,
      say: 'Vì sao Mỵ Châu {drop}lại rắc lông ngỗng dọc đường? {not}Không phải để làm đẹp đâu. {why}Mà vì… {ask}một câu hỏi của chồng.',
      sfx: [['pop', 0.1], ['sparkle', 'drop', 0.4], ['bonk', 'not', 0.5], ['drumroll', 'why', 0.3], ['boing', 'ask', 0.6]],
      draw(k) {
        k.backdrop('sunset', { ground: SG });
        const a = k.at('ask', 0.5);
        T(k, 'MỴ CHÂU', 540, 200, 130, '#b5482c', k.at(0.1, 0.5));
        T(k, 'rắc lông ngỗng?', 540, 350, 84, '#3b2f2a', k.at('drop', 0.6));
        k.char(320, SG, 520, { ...MC, face: a > 0.5 ? 'sad' : 'happy', pose: 'present', p: k.at(0.1, 0.5) });
        feathers(k, 380, 520, 500, 700, k.at('drop', 0.5));
        k.group({ a: 1 - a }, () => {
          T(k, 'làm đẹp', 780, 640, 80, '#6b5f55', k.at('not', 0.4));
          k.icon('cross', 780, 640, 220, { p: k.at(k.cue('not', 0.3), 0.3) });
        });
        k.char(800, SG, 500, { ...TT, face: 'smug', pose: 'shrug', flip: true, p: a });
        k.icon('question', 820, 560, 150, { p: a });
      },
    },
    {
      say: [
        '{who}Trọng Thủy, con trai Triệu Đà, ở rể nước Âu Lạc. {leave}Trước khi về phương Bắc, chàng hỏi vợ:',
        { v: 'tt', text: '{q}Nếu hai nước có chiến tranh, ta lạc nhau, thì làm sao tìm được nàng?' },
        { v: 'mc', text: '{a}Thiếp có áo lông ngỗng. Đi đến đâu, thiếp rắc lông ngỗng ở ngã ba đường làm dấu.' },
      ],
      sfx: [['pop', 'who'], ['pop', 'leave'], ['pop', 'q'], ['sparkle', 'a', 0.4]],
      draw(k) {
        k.backdrop('sunset', { ground: SG });
        k.poly([[380, 1700], [500, SG], [580, SG], [700, 1700]], { fill: '#d9c08a', fillStyle: 'solid', stroke: 'none', seed: 190 });
        k.char(260, SG, 460, { ...TT, face: 'sad', pose: k.t > k.cue('q') ? 'shrug' : 'wave', p: k.at('who', 0.5) });
        k.char(820, SG, 440, { ...MC, face: k.t > k.cue('a') ? 'happy' : 'sad', pose: k.t > k.cue('a') ? 'present' : 'stand', flip: true, p: k.at('who', 0.5) });
        feathers(k, 620, 560, 380, 600, k.at('a', 0.5), 5);
        k.bubble(40, 180, 640, 170, 280, 760, { p: k.at('q', 0.4), text: 'Lạc nhau, làm sao tìm nàng?', size: 48 });
        k.bubble(400, 420, 640, 170, 800, 780, { p: k.at('a', 0.4), text: 'Thiếp rắc lông ngỗng làm dấu!', size: 48 });
      },
    },
    {
      say: '{war}Rồi giặc đến thật. {flee}Mỵ Châu ngồi sau ngựa vua cha, chạy về phương Nam, {fall}lông ngỗng rơi theo từng ngã ba. {follow}Và quân giặc… {track}cứ thế lần theo.',
      sfx: [['boom', 'war', 0.4], ['whoosh', 'flee', 0.5], ['sparkle', 'fall', 0.4], ['pop', 'follow'], ['scratch', 'track', 0.5]],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#e9e2c8', fillStyle: 'solid', stroke: 'none', seed: 191 });
        T(k, 'BẢN ĐỒ CHỈ ĐƯỜNG', 540, 200, 90, '#c0392b', k.at('track', 0.5));
        const path = [[860, 1250], [620, 1080], [780, 900], [440, 760], [560, 600], [260, 480]];
        k.lines(path, { stroke: '#a0703f', width: 12, seed: 192, p: k.at('flee', 2.4, 'linear') });
        path.slice(1, 5).forEach(([x, y], i) => k.prop('feather', x + 60, y - 30, 90, { rotate: 0.5, p: k.at(k.cue('fall', i * 0.3), 0.4) }));
        const f = k.at('flee', 3, 'linear');
        const seg = Math.min(4.999, f * 5), si = Math.floor(seg), st = seg - si;
        const hx = k.lerp(path[si][0], path[si + 1][0], st), hy = k.lerp(path[si][1], path[si + 1][1], st);
        k.char(hx - 40, hy, 170, { ...MC, face: 'sad', pose: 'stand', shadow: false, p: k.at('flee', 0.3) });
        k.char(hx + 30, hy, 180, { ...ADV, face: 'sad', pose: 'point', shadow: false, p: k.at('flee', 0.3) });
        const g = k.at('track', 3, 'linear');
        for (let i = 0; i < 3; i++) k.char(k.lerp(960, 640, g) + i * 70, k.lerp(1290, 1080, g) + i * 20, 150, { ...NAM, face: 'smug', pose: 'point', flip: true, shadow: false, p: k.at(k.cue('follow', i * 0.1), 0.3) });
      },
    },
    {
      say: '{twist}Nhưng bản kể cổ nhất, trong sách Giao Châu ngoại vực ký, {none}không hề có chiếc áo lông ngỗng nào. {later}Chi tiết ấy xuất hiện ở các bản kể về sau, {mean}có lẽ như một lời nhắn: thương người, cũng cần tỉnh táo.',
      sfx: [['scratch', 'twist', 0.5], ['bonk', 'none', 0.5], ['pop', 'later'], ['sparkle', 'mean', 0.5]],
      draw(k) {
        k.group({ x: 540, y: 520, r: -0.02, s: Math.max(0.01, k.ease.back(k.at('twist', 0.5))) }, () => {
          k.rect(-420, -230, 840, 460, { fill: '#f6e7c1', width: 5, seed: 200 });
          k.text('GIAO CHÂU NGOẠI VỰC KÝ', 0, -160, { size: 50, font: 'title', color: '#b5482c' });
          k.text('bản kể cổ nhất', 0, -80, { size: 42, color: '#3f6f2a', weight: 700 });
          k.prop('feather', 0, 70, 200, { rotate: 0.4, alpha: 0.6 });
          k.icon('cross', 0, 60, 260, { p: k.at('none', 0.4) });
        });
        T(k, 'thêm vào về sau', 540, 900, 80, '#3b2f2a', k.at('later', 0.5));
        stamp(k, 540, 1130, 'THƯƠNG + TỈNH TÁO', k.at('mean', 0.5), { w: 700, size: 62, color: '#3f6f2a' });
      },
    },
    fullVideoScene({
      say: '{full}Còn rùa vàng, ngọc trai và cái giếng ở Cổ Loa thì sao? Xem tập đầy đủ trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: 'Nỏ thần có thật không? Mỵ Châu – Trọng Thủy và thành Cổ Loa',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
