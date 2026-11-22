// Shorts — Thời Mai An Tiêm đã có dưa hấu chưa? (cắt từ 023)
// Đối chiếu: truyện dưa hấu (Lĩnh Nam chích quái, biên soạn khoảng thế kỷ XIV–XV): Mai An Tiêm con nuôi vua Hùng, nói của cải là do "tiền thân"
//   → bị đày ra bãi cát ngoài biển; chim thả hạt, trồng dưa, khắc tên thả biển, vua cho đón về. Dưa hấu gốc châu Phi; ghi chép dưa hấu
//   ở Trung Hoa khoảng thế kỷ X.
import { fullVideoScene } from '/engine/templates.js';
import { SG, KING, SCHOLAR, DAN, VO, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const ANTIEM = { body: 'man', outfit: 'tunic', color: '#3b6ea5', color2: '#f6c344', hair: 'short', hat: 'feather' };

export default {
  meta: shortMeta({
    title: 'Thời Mai An Tiêm đã có dưa hấu chưa? 🍉 #shorts',
    description: 'Sự tích dưa hấu kể Mai An Tiêm trồng dưa trên đảo hoang thời vua Hùng. Nhưng các nhà thực vật học lại có một tin hơi phũ về quả dưa ấy. Xem tập đầy đủ "18 đời vua Hùng sống 2.622 năm?" trên kênh Vẽ Là Hiểu!',
    tags: ['mai an tiêm', 'sự tích dưa hấu', 'dưa hấu', 'nguồn gốc dưa hấu', 'lĩnh nam chích quái', 'vua hùng'],
    hashtags: ['maiantiem', 'duahau'],
    voices: { antiem: { voice: 'vi-VN-NamMinhNeural', pitch: '+6Hz', rate: '+4%' } },
  }),

  scenes: [
    {
      lead: 0.1,
      say: [
        '{me}Mình là Mai An Tiêm, con nuôi của vua Hùng. {island}Và mình vừa bị đày ra một bãi cát giữa biển… {why}chỉ vì một câu nói:',
        { v: 'antiem', text: '{line}Của cải con có được, là nhờ tiền thân mà có.' },
        '{mean}Tức là nhờ kiếp trước, chứ không phải nhờ vua ban.',
      ],
      sfx: [['pop', 'me'], ['whoosh', 'island', 0.5], ['pop', 'why'], ['bonk', 'mean', 0.4]],
      draw(k) {
        k.backdrop('day', { ground: 2400 });
        k.water(900, { color: '#4f8fc4' });
        k.prop('island', 540, 1060, 1000);
        k.char(470, 1200, 360, { ...ANTIEM, face: k.t > k.cue('line') ? 'smug' : 'sad', pose: k.t > k.cue('line') ? 'present' : 'shrug', p: k.at('me', 0.4), shadow: false });
        k.char(320, 1200, 310, { ...VO, face: 'sad', pose: 'stand', shadow: false, p: k.at('island', 0.4) });
        T(k, 'mình', 470, 780, 48, '#b5482c', k.at('me', 0.4) * (1 - k.at('island', 0.4)));
        T(k, 'ĐÀY RA ĐẢO', 540, 220, 110, '#b5482c', k.at('island', 0.5));
        k.bubble(80, 320, 900, 140, 470, 820, { p: k.at('line', 0.4), text: '"Nhờ tiền thân mà có!"', size: 54 });
      },
    },
    {
      say: 'Trên đảo, {birds}chim thả xuống những hạt lạ. {plant}Mình đem trồng: {grow}quả vỏ xanh, ruột đỏ, ngọt mát. {carve}Mình khắc tên lên vỏ, {float}thả xuống biển. {ship}Thuyền buôn vớt được, tin đến tai vua, {back}vua cho đón cả nhà về. {name}Sự tích dưa hấu.',
      sfx: [['whoosh', 'birds', 0.4], ['pop', 'plant'], ['sparkle', 'grow', 0.5], ['scratch', 'carve', 0.5], ['whoosh', 'float', 0.4], ['pop', 'ship'], ['tada', 'back', 0.5], ['pop', 'name']],
      draw(k) {
        k.backdrop('day', { ground: 2400 });
        k.water(1000, { color: '#4f8fc4' });
        k.prop('island', 420, 1160, 900);
        for (let i = 0; i < 2; i++) {
          const fx = k.at(k.cue('birds', i * 0.4), 2.2, 'linear');
          k.prop('bird', 1150 - fx * 900, 380 + i * 80, 90, { fly: true, phase: i, flip: true, p: fx > 0 && fx < 1 ? 1 : 0 });
        }
        k.char(300, 1270, 320, { ...ANTIEM, face: k.t > k.cue('back') ? 'laugh' : 'happy', pose: k.t > k.cue('back') ? 'cheer' : 'present', shadow: false });
        for (let i = 0; i < 3; i++) k.prop('watermelon', 560 + i * 90, 1230, 100, { p: k.at(k.cue('grow', i * 0.2), 0.4) });
        k.prop('watermelon', 560, 640, 200, { slice: true, p: k.at('grow', 0.5) * (1 - k.at('carve', 0.3)) });
        const fl = k.at('float', 3, 'linear');
        k.prop('watermelon', 640 + fl * 260, 1060, 130, { text: 'AN TIÊM', p: k.at('carve', 0.5), bob: 6 });
        k.prop('boat', 1300 - 360 * k.at('ship', 1.5, 'out'), 1040, 300, { fill: '#8a5a35', bob: 5, flip: true });
        T(k, 'SỰ TÍCH DƯA HẤU', 540, 220, 90, '#3f8a3a', k.at('name', 0.5));
      },
    },
    {
      say: 'Nhưng khoan, {sci}các nhà thực vật học có một tin hơi phũ: {africa}dưa hấu có nguồn gốc từ châu Phi. {china}Ghi chép về dưa hấu ở Trung Hoa, phải khoảng thế kỷ thứ mười mới có. {book}Còn truyện An Tiêm, được chép lại vào khoảng thế kỷ mười bốn, mười lăm. {maybe}Nên có lẽ, người kể đời sau đã… {update}cập nhật thực đơn theo trái cây thời mình.',
      sfx: [['scratch', 'sci', 0.5], ['pop', 'africa'], ['pop', 'china'], ['pop', 'book'], ['pop', 'maybe'], ['boing', 'update', 0.6]],
      draw(k) {
        T(k, 'TIN HƠI PHŨ', 540, 180, 100, '#c0392b', k.at('sci', 0.5));
        const rows = [['africa', 'châu Phi', 'quê gốc', 380], ['china', 'Trung Hoa', '~ thế kỷ X', 620], ['book', 'truyện An Tiêm', '~ thế kỷ XIV–XV', 860]];
        rows.forEach(([c, t, s, y], i) => {
          k.prop('watermelon', 200, y, 150, { slice: i === 0, p: k.at(c, 0.5) });
          k.text(t, 330, y - 22, { size: 58, font: 'title', align: 'left', fx: 'pop', p: k.at(c, 0.5) });
          k.text(s, 330, y + 44, { size: 44, align: 'left', color: '#6b5f55', weight: 700, fx: 'fade', p: k.at(c, 0.6) });
          if (i < 2) k.arrow(200, y + 80, 200, y + 160, { width: 5, p: k.at(rows[i + 1][0], 0.4) });
        });
        k.char(950, 1250, 280, { ...SCHOLAR('#8e5bd3'), face: 'smug', pose: 'point', flip: true, p: k.at('maybe', 0.5) });
        stamp(k, 420, 1130, 'CẬP NHẬT THỰC ĐƠN', k.at('update', 0.5), { w: 720, size: 56 });
      },
    },
    fullVideoScene({
      say: '{full}Thời vua Hùng thật ra ăn gì, sống ra sao? Xem tập đầy đủ trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: '18 đời vua Hùng sống 2.622 năm? Giải mã nước Văn Lang',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
