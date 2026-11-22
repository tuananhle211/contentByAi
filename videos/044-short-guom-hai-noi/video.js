// Shorts — Vì sao gươm thần của Lê Lợi lại nằm ở hai nơi? (cắt từ 042; khuôn "Vì sao…" của 020 Xăm mình)
// Đối chiếu: Lam Sơn thực lục (1431): Lê Thận quăng chài ở vực Ma Viện, đêm thấy đáy nước sáng, không được cá, chỉ được mảnh sắt dài hơn một thước,
//   để chỗ tối; ngày giỗ vua tới thấy sáng, hỏi "Sắt nào đây?", xin về mài thấy chữ "Thuận Thiên" cùng chữ "Lợi"; ra ngoài cửa thấy chuôi gươm,
//   khấn "nếu quả là gươm Trời cho thì xin chuôi và lưỡi liền nhau", lắp vào thành gươm. Niên hiệu Lê Thái Tổ: Thuận Thiên (1428–1433).
//   Bản ngày nay (Nguyễn Đổng Chi, SGK Ngữ văn 6): chuôi gươm trên ngọn cây đa trong rừng.
import { fullVideoScene } from '/engine/templates.js';
import { SG, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const LL = { body: 'big', outfit: 'tunic', color: '#3f5a3a', color2: '#c9a24a', hair: 'topknot', beard: true };
const THAN = { body: 'man', outfit: 'tunic', color: '#8a6a3a', color2: '#e8d9a8', hair: 'short', hat: 'non' };

export default {
  meta: shortMeta({
    title: 'Vì sao gươm thần của Lê Lợi lại nằm ở hai nơi? #shorts',
    description: 'Lưỡi gươm vớt lên từ một mẻ lưới không có con cá nào, chuôi gươm lại nằm ở chỗ khác. Lam Sơn thực lục năm 1431 kể chuyện gươm Thuận Thiên của Lê Lợi như thế nào? Xem tập đầy đủ "Rùa thần Hồ Gươm có thật không?" trên kênh Vẽ Là Hiểu!',
    tags: ['gươm thuận thiên', 'lê lợi', 'lê thận', 'sự tích hồ gươm', 'gươm thần', 'lam sơn thực lục', 'khởi nghĩa lam sơn'],
    hashtags: ['leloi', 'hoguom'],
    voices: {
      ll: { voice: 'vi-VN-NamMinhNeural', pitch: '-10Hz', rate: '-6%' },
      than: { voice: 'vi-VN-NamMinhNeural', pitch: '+8Hz', rate: '+4%' },
    },
  }),

  scenes: [
    {
      lead: 0.1,
      say: 'Vì sao gươm thần của Lê Lợi {two}lại nằm ở hai nơi? {not}Không phải vì gươm gãy đâu. {why}Mà vì… {net}một mẻ lưới không có con cá nào.',
      sfx: [['pop', 0.1], ['pop', 'two'], ['bonk', 'not', 0.5], ['drumroll', 'why', 0.3], ['boing', 'net', 0.6]],
      draw(k) {
        k.backdrop('day', { ground: SG });
        const r = k.at('net', 0.6);
        T(k, 'GƯƠM LÊ LỢI', 540, 210, 120, '#b5482c', k.at(0.1, 0.5));
        T(k, 'ở hai nơi?', 540, 350, 80, '#3b2f2a', k.at('two', 0.5));
        k.group({ a: 1 - r }, () => {
          k.prop('sword', 330, 760, 420, { hilt: false, glow: true, p: k.at('two', 0.5) });
          k.prop('sword', 750, 760, 420, { blade: false, glow: true, p: k.at(k.cue('two', 0.3), 0.5) });
          T(k, 'gươm gãy', 540, 980, 76, '#6b5f55', k.at('not', 0.4));
          k.icon('cross', 540, 760, 300, { p: k.at(k.cue('not', 0.3), 0.3) });
        });
        k.group({ a: r }, () => {
          k.prop('net', 540, 800, 520);
          T(k, 'CÁ: 0', 540, 560, 130, '#e4572e', r);
        });
      },
    },
    {
      say: [
        '{who}Sách Lam Sơn thực lục, năm 1431, kể: Lê Thận, bạn của Lê Lợi, {cast}quăng chài cả đêm. {fish}Cá không có, {iron}chỉ vớt được một mảnh sắt.',
        { v: 'than', text: '{sigh}Đêm đánh cá tệ nhất đời mình.' },
        '{clean}Lê Lợi xin về, mài sáng: trên lưỡi hiện ra hai chữ Thuận Thiên, {li}và chữ Lợi.',
      ],
      sfx: [['pop', 'who'], ['whoosh', 'cast', 0.4], ['wahwah', 'fish', 0.4], ['bonk', 'iron', 0.5], ['pop', 'sigh'], ['scratch', 'clean', 0.4], ['ding', 'li', 0.5]],
      draw(k) {
        const zoom = k.at('clean', 0.5);
        k.group({ a: 1 - zoom }, () => {
          k.backdrop('night', { ground: 760 });
          k.water(800, { color: '#2f5a6a', amp: 6 });
          k.ellipse(540, 1150, 700, 220, { fill: '#fff3c4', fillStyle: 'solid', stroke: 'none', alpha: 0.4, seed: 320 });
          k.prop('boat', 420, 860, 460, { fill: '#9c6b3f' });
          k.char(400, 845, 300, { ...THAN, face: k.t > k.cue('fish') ? 'sad' : 'calm', pose: k.t > k.cue('cast') ? 'point' : 'stand', shadow: false });
          k.prop('net', 760, 1000, 260 * Math.max(0.01, k.at('cast', 0.6)), { p: k.at('cast', 0.4) });
          k.prop('sword', 600, 1150, 180, { hilt: false, rotate: 1.5708, glow: true, p: k.at('iron', 0.5) });
          T(k, 'LÊ THẬN', 540, 200, 100, '#f6c344', k.at('who', 0.5));
          T(k, 'CÁ: 0', 820, 620, 90, '#e4572e', k.at('fish', 0.4) * (1 - k.at('sigh', 0.3)));
          k.bubble(160, 330, 760, 150, 420, 560, { p: k.at('sigh', 0.4), text: 'Đêm đánh cá tệ nhất đời mình.', size: 48 });
        });
        k.group({ a: zoom }, () => {
          k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#2b2f3d', fillStyle: 'solid', stroke: 'none', seed: 323 });
          k.prop('sword', 540, 700, 900, { hilt: false, rotate: 1.5708, glow: true });
          k.text('順天', 430, 700, { size: 90, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('clean', 0.5) });
          k.text('利', 700, 700, { size: 90, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('li', 0.5) });
          T(k, 'THUẬN THIÊN', 400, 920, 70, '#f6c344', k.at('clean', 0.5));
          T(k, 'LỢI', 820, 920, 70, '#f6c344', k.at('li', 0.5));
        });
      },
    },
    {
      say: '{door}Còn chuôi gươm, Lê Lợi tìm thấy ở một chỗ khác. {fit}Lắp vào: vừa khít. {tree}Bản kể ngày nay để lưỡi dưới nước, chuôi trên ngọn cây đa trong rừng: {all}cả miền xuôi lẫn miền ngược cùng góp sức. {same}Năm 1428, Lê Lợi lên ngôi, niên hiệu là… Thuận Thiên.',
      sfx: [['pop', 'door'], ['click', 'fit', 0.7], ['ding', ['fit', 0.4], 0.5], ['pop', 'tree'], ['tada', 'all', 0.5], ['drumroll', ['same', -1.2], 0.3], ['tada', ['same', 2.6], 0.5]],
      draw(k) {
        k.backdrop('dawn', { ground: SG });
        const fit = k.at('fit', 0.8, 'inOut');
        k.char(300, SG, 520, { ...LL, face: k.t > k.cue('fit') ? 'happy' : 'calm', pose: k.t > k.cue('fit') ? 'cheer' : 'point', shadow: false, p: k.at('door', 0.4) });
        k.prop('sword', 780, k.lerp(900, 860, fit), 360, { blade: false, glow: true, p: k.at('door', 0.5) });
        k.prop('sword', k.lerp(960, 780, fit), k.lerp(640, 860, fit), 360, { hilt: false, glow: true, rotate: k.lerp(0.8, 0, fit), p: k.at('door', 0.5) });
        T(k, 'KHÍT!', 780, 480, 120, '#e4572e', k.at('fit', 0.4) * (1 - k.at('tree', 0.3)));
        k.group({ a: k.at('tree', 0.5) }, () => {
          k.rect(560, 200, 460, 300, { fill: '#e2f0e4', fillStyle: 'solid', width: 5, seed: 330 });
          k.prop('banyan', 790, 420, 220);
          k.text('chuôi: trên rừng', 790, 240, { size: 40, font: 'title', color: '#3f6f2a' });
          k.rect(60, 200, 460, 300, { fill: '#dcecf6', fillStyle: 'solid', width: 5, seed: 331 });
          k.prop('fish', 290, 400, 140);
          k.text('lưỡi: dưới nước', 290, 240, { size: 40, font: 'title', color: '#2e6da4' });
        });
        stamp(k, 540, 620, 'XUÔI + NGƯỢC', k.at('all', 0.5) * (1 - k.at('same', 0.3)), { w: 560, size: 66, color: '#3f6f2a' });
        stamp(k, 540, 620, '1428 · THUẬN THIÊN', k.at(k.cue('same', 2.4), 0.5), { w: 720, size: 62 });
      },
    },
    fullVideoScene({
      say: '{full}Vậy con rùa đòi gươm từ đâu ra? Tập đầy đủ ở kênh nhé!',
      image: 'poster',
      title: 'Rùa thần Hồ Gươm có thật không? Bí ẩn chuyện trả gươm',
      channel: 'Vẽ Là Hiểu',
      tail: 1,
    }),
  ],
};
