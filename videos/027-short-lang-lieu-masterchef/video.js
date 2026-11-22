// Shorts — Lang Liêu thắng "MasterChef Văn Lang" (cắt từ 023)
// Đối chiếu: truyện bánh chưng bánh giầy (Lĩnh Nam chích quái; Ngữ văn 6): Hùng Vương thứ 6 sau khi phá giặc Ân muốn truyền ngôi; ai dâng lễ
//   vừa ý Tiên vương thì được nối ngôi; Lang Liêu con thứ 18, mồ côi mẹ, chăm việc đồng áng; mộng thần bảo không gì quý bằng gạo;
//   bánh vuông tượng đất, bánh tròn tượng trời; được nối ngôi.
import { fullVideoScene } from '/engine/templates.js';
import { SG, KC, OLD, LANG, LIEU, THAN, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

export default {
  meta: shortMeta({
    title: 'Lang Liêu thắng "MasterChef" Văn Lang bằng… gạo? #shorts',
    description: 'Cuộc thi nối ngôi của vua Hùng thứ 6: các hoàng tử mang sơn hào hải vị, còn Lang Liêu, con thứ 18, chỉ có gạo. Vì sao chàng thắng? Xem tập đầy đủ "18 đời vua Hùng sống 2.622 năm?" trên kênh Vẽ Là Hiểu!',
    tags: ['bánh chưng bánh giầy', 'lang liêu', 'sự tích bánh chưng', 'vua hùng thứ 6', 'tết'],
    hashtags: ['banhchung', 'langlieu'],
    voices: { than: { voice: 'vi-VN-NamMinhNeural', pitch: '-20Hz', rate: '-14%' } },
  }),

  scenes: [
    {
      lead: 0.1,
      say: '{me}Mình là Lang Liêu, con trai thứ mười tám của vua Hùng. {contest}Bố mình mở một cuộc thi: ai dâng lễ vừa ý Tiên vương, người đó được làm vua. {rich}Các anh mình mang sơn hào, hải vị. {mine}Còn mình… {rice}chỉ có gạo.',
      sfx: [['pop', 'me'], ['tada', 'contest', 0.4], ['cash', 'rich', 0.5], ['pop', ['rich', 0.5]], ['slideDown', 'mine', 0.4], ['wahwah', 'rice', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: SG });
        k.group({ x: 540, y: 200, s: Math.max(0.01, k.ease.back(k.at('contest', 0.6))) }, () => {
          k.rect(-460, -80, 920, 160, { fill: '#2b2f3d', fillStyle: 'solid', width: 6, seed: 580 });
          k.text('MASTERCHEF VĂN LANG', 0, -12, { size: 64, font: 'title', color: '#f6c344' });
          k.text('giải thưởng: ngai vàng', 0, 48, { size: 36, font: 'title', color: '#fffaf0' });
        });
        [['fish', 130], ['crab', 320], ['elephant', 510]].forEach(([d, x], i) => {
          k.char(x, SG, 320, { ...LANG(KC[i]), face: 'smug', pose: 'present', shadow: false, p: k.at(k.cue('rich', i * 0.15), 0.4) });
          k.prop(d, x + 20, 840, d === 'elephant' ? 150 : 110, { p: k.at(k.cue('rich', i * 0.15), 0.4) });
        });
        k.char(840, SG, 400, { ...LIEU, face: k.t > k.cue('mine') ? 'sad' : 'happy', pose: k.t > k.cue('mine') ? 'shrug' : 'wave', p: k.at('me', 0.4) });
        T(k, 'Lang Liêu · con thứ 18', 760, 1310, 46, '#b5482c', k.at('me', 0.5), { fx: 'fade' });
        k.icon('rice', 840, 700, 140, { p: k.at('rice', 0.4) });
      },
    },
    {
      say: [
        '{dream}Đêm đó, mình nằm mộng, thấy một vị thần bảo:',
        { v: 'than', text: '{god}Trong trời đất, không gì quý bằng hạt gạo.' },
        '{square}Thế là mình gói bánh vuông, tượng trưng cho đất. {round}Giã xôi làm bánh tròn, tượng trưng cho trời.',
      ],
      sfx: [['sparkle', 'dream', 0.5], ['ding', 'god', 0.4], ['pop', 'square'], ['pop', 'round']],
      draw(k) {
        const day = k.at('square', 0.5);
        k.group({ a: 1 - day }, () => {
          k.backdrop('night', { ground: SG });
          k.char(300, SG, 380, { ...LIEU, face: 'blank', pose: 'stand' });
          k.dot(720, 760, 280, '#fff3c4', 0.25 * k.at('dream', 0.8));
          k.char(720, 1100, 480, { ...THAN, face: 'calm', pose: 'present', p: k.at('dream', 0.8), bob: 6 });
          k.bubble(140, 220, 800, 140, 640, 560, { p: k.at('god', 0.4), text: 'Không gì quý bằng hạt gạo.', size: 50 });
        });
        k.group({ a: day }, () => {
          k.backdrop('day', { ground: SG });
          k.prop('banhchung', 300, 560, 300, { p: k.at('square', 0.5) });
          T(k, 'vuông = ĐẤT', 300, 740, 64, '#3f7d3a', k.at('square', 0.5));
          k.prop('banhday', 780, 580, 280, { p: k.at('round', 0.5) });
          T(k, 'tròn = TRỜI', 780, 740, 64, '#2e86de', k.at('round', 0.5));
          k.char(540, SG, 380, { ...LIEU, face: 'happy', pose: 'present', shadow: false });
        });
      },
    },
    {
      say: '{win}Bố mình nếm thử, khen ngon, {throne}và truyền ngôi cho mình. {joke}Một cuộc thi nấu ăn, mà món thắng giải {tet}đến Tết năm nay vẫn được nấu lại. {champ}Vô địch thật sự.',
      sfx: [['pop', 'win'], ['tada', 'throne', 0.5], ['pop', 'joke'], ['sparkle', 'tet', 0.5], ['tada', 'champ', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: SG });
        k.prop('palace', 540, 900, 640);
        k.char(780, SG, 460, { ...OLD, face: 'laugh', pose: 'point', flip: true, p: k.at('win', 0.4) });
        k.char(300, SG, 400, { ...LIEU, hat: k.t > k.cue('throne') ? 'crown' : 'feather', face: k.t > k.cue('throne') ? 'laugh' : 'happy', pose: k.t > k.cue('throne') ? 'cheer' : 'present' });
        k.bubble(560, 330, 300, 110, 760, 760, { p: k.at('win', 0.4) * (1 - k.at('joke', 0.4)), text: 'Ngon!', size: 50 });
        for (let i = 0; i < 5; i++) k.prop('banhchung', 160 + i * 190, 360, 140, { p: k.at(k.cue('tet', i * 0.12), 0.4) });
        T(k, 'Tết năm nay', 540, 480, 56, '#b5482c', k.at('tet', 0.5), { fx: 'fade' });
        stamp(k, 540, 200, 'VÔ ĐỊCH', k.at('champ', 0.5), { w: 420, size: 80, color: '#d4a017' });
      },
    },
    fullVideoScene({
      say: '{full}Vua Hùng có thật không? Xem tập đầy đủ trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: '18 đời vua Hùng sống 2.622 năm? Giải mã nước Văn Lang',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
