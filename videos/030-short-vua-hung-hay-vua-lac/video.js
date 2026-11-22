// Shorts — Vua Hùng hay vua Lạc? (cắt từ 023)
// Đối chiếu: Giao Châu ngoại vực ký (dẫn trong Thủy kinh chú): Giao Chỉ xưa có ruộng Lạc theo nước triều lên xuống; có Lạc vương, Lạc hầu,
//   Lạc tướng. H. Maspero cho rằng chữ Hùng 雄 là chép nhầm từ chữ Lạc 雒 — giả thuyết, nhiều người phản đối, còn tranh luận.
import { fullVideoScene } from '/engine/templates.js';
import { SG, KING, SCHOLAR, DAN, KC, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const MASP = { body: 'man', outfit: 'tunic', color: '#4a4a5a', color2: '#9a9a9a', hair: 'short', hairColor: '#8a6a3a', beard: true, beardColor: '#8a6a3a', sleeves: true };

export default {
  meta: shortMeta({
    title: 'Vua Hùng… hay vua Lạc? Một nét chữ gây tranh cãi #shorts',
    description: 'Sách cổ Giao Châu ngoại vực ký chép "Lạc vương", không phải "Hùng vương". Có học giả cho rằng chữ Hùng là chép nhầm từ chữ Lạc. Thật hay không? Xem tập đầy đủ "18 đời vua Hùng sống 2.622 năm?" trên kênh Vẽ Là Hiểu!',
    tags: ['vua hùng', 'vua hùng có thật không', 'lạc vương', 'lạc việt', 'hùng vương', 'giao châu ngoại vực ký', 'maspero'],
    hashtags: ['vuahung', 'lacviet'],
  }),

  scenes: [
    {
      lead: 0.1,
      say: 'Nếu mình nói với bạn rằng {q}vua Hùng… có khi tên thật là vua Lạc? {book}Một sách cổ Trung Hoa, Giao Châu ngoại vực ký, chép về vùng đất này: {field}có ruộng Lạc, theo nước triều lên xuống, {lac}và có Lạc vương, Lạc hầu, Lạc tướng.',
      sfx: [['scratch', 'q', 0.5], ['pop', 'book'], ['pop', 'field'], ['ding', 'lac', 0.5]],
      draw(k) {
        T(k, 'VUA HÙNG', 540, 200, 120, '#b5482c', k.at(0.1, 0.5));
        T(k, 'hay VUA LẠC?', 540, 340, 100, '#e4572e', k.at('q', 0.5));
        k.group({ x: 540, y: 720, s: Math.max(0.01, k.ease.back(k.at('book', 0.5))), r: -0.02 }, () => {
          k.rect(-420, -230, 840, 460, { fill: '#f6e7c1', width: 5, seed: 900 });
          k.text('GIAO CHÂU NGOẠI VỰC KÝ', 0, -170, { size: 50, font: 'title', color: '#b5482c' });
          k.text('"…có ruộng Lạc, theo nước triều…"', 0, -60, { size: 40, weight: 600, fx: 'fade', p: k.at('field', 0.6), maxWidth: 780 });
          ['雒王', '雒侯', '雒將'].forEach((t, i) => k.text(t, -260 + i * 260, 80, { size: 92, color: '#b5482c', weight: 700, fx: 'pop', p: k.at(k.cue('lac', i * 0.3), 0.4) }));
          ['Lạc vương', 'Lạc hầu', 'Lạc tướng'].forEach((t, i) => k.text(t, -260 + i * 260, 180, { size: 38, font: 'title', fx: 'fade', p: k.at(k.cue('lac', i * 0.3), 0.4) }));
        });
        k.char(880, SG, 250, { ...KING, face: 'shock', pose: 'shrug', p: k.at('q', 0.5), shadow: false });
      },
    },
    {
      say: 'Học giả người Pháp {masp}Henri Maspero cho rằng: {wrong}chữ Hùng là do người chép sách viết nhầm từ chữ Lạc, {look}vì hai chữ Hán này trông khá giống nhau. {other}Nhưng nhiều nhà nghiên cứu phản đối, {open}và đến nay tranh luận vẫn chưa ngã ngũ.',
      sfx: [['pop', 'masp'], ['scratch', 'wrong', 0.4], ['ding', 'look', 0.4], ['bonk', 'other', 0.4], ['pop', 'open']],
      draw(k) {
        const lk = k.at('look', 0.6, 'back');
        [['雄', 'Hùng', 300], ['雒', 'Lạc', 780]].forEach(([ch, t, x], i) => {
          k.group({ x, y: 400, s: Math.max(0.01, lk), r: (i ? 1 : -1) * 0.03, a: Math.min(1, lk * 3) }, () => {
            k.rect(-190, -190, 380, 380, { fill: '#fffaf0', fillStyle: 'solid', width: 6, seed: 910 + i });
            k.text(ch, 0, -16, { size: 240, color: '#3b2f2a', weight: 700 });
            k.text(t, 0, 150, { size: 52, font: 'title', color: '#b5482c' });
          });
        });
        T(k, '≈ ?', 540, 400, 90, '#3b2f2a', k.at(k.cue('look', 0.4), 0.4));
        k.char(780, SG, 420, { ...MASP, face: 'smug', pose: 'point', flip: true, p: k.at('masp', 0.5) });
        T(k, 'H. Maspero', 780, 1310, 44, '#3b2f2a', k.at('masp', 0.5), { fx: 'fade' });
        k.bubble(560, 640, 440, 110, 760, 820, { p: k.at('wrong', 0.4), text: 'Chép nhầm đấy!', size: 46 });
        for (let i = 0; i < 2; i++) k.char(150 + i * 200, SG, 300, { ...SCHOLAR(KC[i + 3]), face: 'angry', pose: i ? 'shout' : 'point', p: k.at(k.cue('other', i * 0.2), 0.4), shadow: false });
        k.bubble(40, 700, 400, 110, 200, 940, { p: k.at('other', 0.4), text: 'Chưa chắc!', size: 46 });
      },
    },
    {
      say: '{but}Nhưng dù gọi là vua Hùng hay vua Lạc, {real}những người thủ lĩnh của cư dân trồng lúa bên sông Hồng là có thật. {drum}Trống đồng, ruộng lúa, nhà sàn của họ vẫn còn đó. {ask}Còn bạn: Hùng hay Lạc? Bình luận cho mình biết nhé.',
      sfx: [['pop', 'but'], ['tada', 'real', 0.5], ['sparkle', 'drum', 0.5], ['ding', 'ask', 0.4]],
      draw(k) {
        k.backdrop('dawn', { ground: SG });
        k.prop('drumface', 540, 430, 360, { p: k.at('drum', 0.5), spin: 0.12 });
        k.prop('stilthouse', 230, 1010, 380, { p: k.at(k.cue('drum', 0.4), 0.4) });
        k.char(560, SG, 420, { ...KING, face: 'smug', pose: 'hips', p: k.at('but', 0.4) });
        for (let i = 0; i < 2; i++) k.char(800 + i * 150, SG, 280, { ...DAN(KC[i]), face: 'happy', pose: 'wave', shadow: false, bob: 3, p: k.at('real', 0.4) });
        stamp(k, 540, 200, 'CÓ THẬT', k.at('real', 0.5), { w: 420, size: 80, color: '#3f6f2a' });
        T(k, 'Hùng hay Lạc?', 540, 690, 80, '#e4572e', k.at('ask', 0.5));
      },
    },
    fullVideoScene({
      say: '{full}Vậy 18 đời vua Hùng có thật sống 2.622 năm? Xem tập đầy đủ trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: '18 đời vua Hùng sống 2.622 năm? Giải mã nước Văn Lang',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
