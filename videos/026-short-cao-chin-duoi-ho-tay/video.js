// Shorts — Lạc Long Quân diệt cáo chín đuôi: Hồ Tây từ đâu ra? (cắt từ 006)
// Đối chiếu: Lĩnh Nam chích quái (truyện Hồ tinh): cáo chín đuôi sống nghìn năm, hoá người bắt hại dân; Lạc Long Quân đánh tan, phá hang;
//   chỗ hang sụt thành đầm lớn, gọi là Đầm Xác Cáo → Hồ Tây. Địa chất: Hồ Tây nhiều khả năng là một khúc dòng cũ của sông Hồng
//   bị bỏ lại khi sông đổi dòng. Hồ Tây rộng khoảng 500 ha, hồ lớn nhất nội thành Hà Nội.
import { fullVideoScene } from '/engine/templates.js';
import { SG, RIVER, KC, LLQ, DAN, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

export default {
  meta: shortMeta({
    title: 'Hồ Tây từ đâu ra? Cáo chín đuôi hay sông Hồng? #shorts',
    description: 'Tương truyền Hồ Tây là hang cũ của cáo chín đuôi bị Lạc Long Quân đánh sập. Còn các nhà địa chất lại nghi một "thủ phạm" khác. Xem tập đầy đủ "Con Rồng Cháu Tiên" trên kênh Vẽ Là Hiểu!',
    tags: ['hồ tây', 'cáo chín đuôi hồ tây', 'sự tích hồ tây', 'lạc long quân', 'hồ tinh', 'đầm xác cáo', 'hà nội'],
    hashtags: ['hotay', 'caochinduoi'],
  }),

  scenes: [
    {
      lead: 0.1,
      say: '{me}Mình đang đứng bên Hồ Tây, {big}hồ lớn nhất nội thành Hà Nội. {q}Hồ này từ đâu ra? {legend}Truyền thuyết kể: đây từng là… {fox}hang của một con cáo chín đuôi.',
      sfx: [['pop', 'me'], ['pop', 'big'], ['ding', 'q', 0.4], ['drumroll', 'legend', 0.3], ['boom', 'fox', 0.5]],
      draw(k) {
        const f = k.at('fox', 0.6);
        k.backdrop(f > 0.5 ? 'night' : 'sunset', { ground: 900 });
        k.water(900, { color: f > 0.5 ? '#2f5f8f' : RIVER, alpha: 0.9 });
        k.poly([[-40, 1080], [1120, 1040], [1120, 2000], [-40, 2000]], { fill: '#8fbf6a', fillStyle: 'solid', width: 4, seed: 31 });
        k.char(300, SG, 460, { ...DAN('#e4572e', { outfit: 'tunic', hat: 'non' }), face: f > 0.5 ? 'shock' : 'happy', pose: f > 0.5 ? 'shout' : 'point', p: k.at('me', 0.4) });
        T(k, 'mình', 300, 700, 48, '#b5482c', k.at('me', 0.4) * (1 - k.at('big', 0.4)));
        T(k, 'HỒ TÂY', 540, 220, 130, '#b5482c', k.at('big', 0.5));
        T(k, 'từ đâu ra?', 540, 360, 80, '#e4572e', k.at('q', 0.5));
        k.prop('fox', 760, 760, 520 * f, { angry: true, p: f, flip: true });
      },
    },
    {
      say: 'Tương truyền, {who}Hồ Tinh là một con cáo chín đuôi sống hơn nghìn năm, {human}hay hoá thành người để bắt hại dân lành. {llq}Lạc Long Quân đem quân đánh tan nó, {cave}phá nát hang ổ. {sink}Chỗ hang cáo sụt xuống thành một đầm nước lớn, {name}dân gọi là Đầm Xác Cáo: chính là Hồ Tây.',
      sfx: [['pop', 'who'], ['pop', 'human'], ['boom', 'llq', 0.5], ['boom', 'cave', 0.5], ['slideDown', 'sink', 0.5], ['tada', 'name', 0.4]],
      draw(k) {
        const sink = k.at('sink', 1.4, 'inOut');
        k.backdrop('night', { ground: 900 });
        k.prop('mountain', 540, 900 + sink * 500, 760, { fill: '#6b7a5a' });
        k.water(1300 - sink * 400, { color: '#2f5f8f', alpha: 0.9 });
        k.prop('fox', 330, 860, 380, { angry: true, p: k.at('who', 0.5) * (1 - k.at('llq', 0.8)) });
        T(k, '9 đuôi · 1.000 tuổi', 540, 200, 70, '#fff3c4', k.at('who', 0.6));
        k.char(780, 1000, 520, { ...LLQ, face: 'angry', pose: 'fight', p: k.at('llq', 0.5), shadow: false });
        k.burst(420, 760, 120, 'BÙM!', { p: k.at('cave', 0.4) * (1 - k.at('sink', 0.4)), size: 54 });
        T(k, 'ĐẦM XÁC CÁO', 540, 340, 96, '#e4572e', k.at('name', 0.5));
        T(k, '= Hồ Tây', 540, 460, 70, '#fff3c4', k.at(k.cue('name', 0.6), 0.5));
      },
    },
    {
      say: 'Còn các nhà địa chất thì sao? {river}Hồ Tây nhiều khả năng là một khúc cũ của sông Hồng. {shift}Sông đổi dòng, bỏ lại một đoạn cong, {lake}đoạn ấy thành hồ. {joke}Nghĩa là thủ phạm thật không phải con cáo, {red}mà là… sông Hồng đổi ý.',
      sfx: [['pop', 'river'], ['whoosh', 'shift', 0.5], ['pop', 'lake'], ['pop', 'joke'], ['boing', 'red', 0.6]],
      draw(k) {
        k.rect(-40, -40, 1160, 2000, { fill: '#cfe3b4', fillStyle: 'solid', stroke: 'none', seed: 800 });
        const sh = k.at('shift', 1.6, 'inOut');
        // dòng cũ (cong) mờ dần thành hồ, dòng mới thẳng hơn
        const oldPath = [[-40, 300], [300, 420], [700, 520], [820, 760], [600, 960], [300, 1060], [-40, 1180]];
        k.curve(oldPath, { stroke: '#5b9bd5', width: 90 - sh * 40, seed: 801, alpha: 1 });
        k.curve([[-40, 300], [500, 520], [1000, 760], [1120, 820]], { stroke: '#c47a4a', width: 100, seed: 802, p: sh });
        k.ellipse(700, 760, 300 * k.at('lake', 0.6), 260 * k.at('lake', 0.6), { fill: '#5b9bd5', fillStyle: 'solid', width: 5, seed: 803 });
        T(k, 'Hồ Tây', 700, 760, 64, '#fffaf0', k.at('lake', 0.5));
        T(k, 'sông Hồng (mới)', 820, 960, 46, '#8a4a2a', sh, { fx: 'fade' });
        T(k, 'dòng cũ', 260, 470, 46, '#2e6da4', k.at('river', 0.5), { fx: 'fade' });
        T(k, 'THỦ PHẠM:', 540, 180, 80, '#3b2f2a', k.at('joke', 0.4));
        stamp(k, 540, 320, 'SÔNG HỒNG ĐỔI Ý', k.at('red', 0.5), { w: 760, size: 62 });
      },
    },
    fullVideoScene({
      say: '{full}Lạc Long Quân còn diệt những quái vật nào nữa? Xem tập đầy đủ trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: 'Con Rồng Cháu Tiên: 100 cái trứng nói gì về người Việt?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
