// Shorts — Voi chín ngà, gà chín cựa: sính lễ khó nhất lịch sử (dọc 9:16, cắt từ tập 004 Sơn Tinh – Thủy Tinh)
// Đối chiếu: Hùng Vương thứ 18 kén rể cho Mỵ Nương; sính lễ "một trăm ván cơm nếp, một trăm nệp bánh chưng, voi chín ngà, gà chín cựa,
// ngựa chín hồng mao, mỗi thứ một đôi"; ai mang lễ đến trước được cưới; Thủy Tinh đến sau, dâng nước đánh Sơn Tinh hằng năm.
import { C } from '/engine/kit.js';
import { fullVideoScene } from '/engine/templates.js';

const G = 1200;
const KING = { body: 'man', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'kingfeather', beard: 'long', hair: 'short', cape: '#b5482c' };
const MY = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'long', hat: 'flower' };
const SON = { body: 'big', outfit: 'robe', color: '#4f8a3f', color2: '#c9a24a', hair: 'topknot', hat: 'mountain', cape: '#6b4a2d' };
const THUY = { body: 'big', outfit: 'robe', color: '#2f78c4', color2: '#9fd3f2', hair: 'long', hairColor: '#1d3f66', hat: 'wave', cape: '#1d4f8a', prop: 'trident' };
const label = (k, s, x, y, p, o = {}) => k.text(s, x, y, { size: o.size ?? 50, font: 'title', color: o.color ?? '#b5482c', fx: 'pop', p, outline: '#fffaf0', outlineWidth: 10 });
function say(k, text, c, box, tail, o = {}) {
  k.bubble(box[0], box[1], box[2], box[3], tail[0], tail[1], { p: k.at(c, 0.4), text, size: o.size ?? 44 });
}
function stamp(k, x, y, text, p, o = {}) {
  k.group({ x, y, r: o.r ?? -0.08, s: Math.max(0.01, k.ease.back(Math.min(1, p))), a: Math.min(1, p * 3) }, () => {
    k.rect(-(o.w ?? 300), -70, (o.w ?? 300) * 2, 140, { width: 8, stroke: '#c0392b', seed: 31 });
    k.text(text, 0, 4, { size: o.size ?? 72, font: 'title', color: '#c0392b' });
  });
}

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    format: 'short',
    captions: true,
    title: 'Sính lễ khó nhất lịch sử: voi chín ngà, gà chín cựa 🐘 #shorts',
    description: 'Voi chín ngà, gà chín cựa, ngựa chín hồng mao — mỗi thứ một đôi. Đề bài kén rể của vua Hùng cho Sơn Tinh và Thủy Tinh… hình như có tủ? Xem bản đầy đủ "Sơn Tinh – Thủy Tinh" trên kênh Vẽ Là Hiểu!',
    tags: ['sơn tinh thủy tinh', 'voi chín ngà gà chín cựa ngựa chín hồng mao', 'sính lễ', 'mỵ nương', 'truyền thuyết việt nam', 'shorts', 'vẽ là hiểu'],
    hashtags: ['shorts', 'sontinhthuytinh', 'truyenthuyet'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '+0%',
    voices: {
      king: { voice: 'vi-VN-NamMinhNeural', pitch: '-18Hz', rate: '-8%' },
      thuy: { voice: 'vi-VN-NamMinhNeural', pitch: '+14Hz', rate: '+10%' },
    },
    images: { poster: 'assets/poster.jpg' },
    music: 'assets/music/background.mp3',
    musicVolume: 0.08,
    sfxVolume: 0.5,
    transition: 'fade',
  },

  scenes: [
    {
      lead: 0.1,
      say: 'Nếu bố vợ đòi sính lễ là: {voi}voi chín ngà, {ga}gà chín cựa, {ngua}ngựa chín hồng mao, {pair}mỗi thứ một đôi… {you}bạn tính sao?',
      sfx: [['boom', 'voi', 0.5], ['pop', 'ga'], ['pop', 'ngua'], ['ding', 'pair', 0.5], ['wahwah', 'you', 0.4]],
      draw(k) {
        k.text('SÍNH LỄ', k.W / 2, 150, { size: 110, font: 'title', color: '#3b2f2a', fx: 'pop', p: k.at(0, 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.prop('elephant', 540, 430, 400, { p: k.at('voi', 0.6), tusks: 9 });
        label(k, 'voi CHÍN ngà', 540, 630, k.at(k.cue('voi', 0.3), 0.4));
        k.prop('rooster', 280, 820, 260, { p: k.at('ga', 0.6), spurs: 9 });
        label(k, 'gà CHÍN cựa', 280, 990, k.at(k.cue('ga', 0.3), 0.4), { size: 44 });
        k.prop('horse', 790, 820, 300, { p: k.at('ngua', 0.6), manes: 9, mane: '#e4572e' });
        label(k, 'ngựa CHÍN hồng mao', 790, 990, k.at(k.cue('ngua', 0.3), 0.4), { size: 40 });
        k.text('× 2 mỗi thứ!', 540, 1110, { size: 76, font: 'title', fx: 'pop', p: k.at('pair', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.char(900, 1290, 200, { body: 'man', outfit: 'tunic', color: '#2e86de', color2: '#f6c344', hair: 'short', face: 'shock', pose: 'facepalm', p: k.at('you', 0.5), shadow: false });
        k.sweat(940, 1110, 1.6, { p: k.at('you', 0.3) });
      },
    },
    {
      say: [
        'Đó là đề bài vua Hùng thứ mười tám ra cho hai chàng rể. {rule}Luật chơi:',
        { v: 'king', text: '{rule2}Sáng mai, ai mang lễ đến trước, người đó được cưới Mỵ Nương!' },
        '{son}Sơn Tinh, chúa vùng núi, mang đủ lễ đến trước, {win}rước luôn cô dâu về núi.',
      ],
      sfx: [['drumroll', 'rule', 0.4], ['ding', 'rule2', 0.5], ['whoosh', 'son', 0.5], ['tada', 'win', 0.5]],
      draw(k) {
        k.backdrop('dawn', { ground: G });
        k.prop('palace', 820, 640, 420, {});
        k.char(260, G, 440, { ...KING, face: k.t > k.cue('win') ? 'laugh' : 'smug', pose: k.t > k.cue('son') ? 'cheer' : 'point', p: k.at(0.1, 0.5) });
        say(k, 'Ai mang lễ đến trước, người đó được cưới!', 'rule2', [60, 220, 960, 150], [300, 700]);
        const go = k.at('win', 2.4, 'inOut');
        k.char(k.lerp(1300, 640, k.at('son', 1.4, 'out')) + go * 600, G, 420, { ...SON, face: 'happy', pose: k.t > k.cue('win') ? 'wave' : 'present', walk: k.t > k.cue('son') && k.t < k.cue('son', 1.4) || (go > 0 && go < 1) });
        k.prop('elephant', k.lerp(1500, 860, k.at('son', 1.4, 'out')) + go * 600, 1100, 220, { tusks: 9, p: k.at('son', 0.4) });
        k.char(560 + go * 600, G, 320, { ...MY, face: 'happy', pose: 'stand', p: k.at('win', 0.4), walk: go > 0 && go < 1 });
        k.text('SƠN TINH THẮNG!', 540, 1000, { size: 80, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at(k.cue('win', 0.6), 0.5), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: [
        '{late}Thủy Tinh đến sau.',
        { v: 'thuy', text: '{where}Ủa alo? Người đâu rồi?!' },
        '{look}Mà nhìn lại danh sách: {land}toàn sản vật trên cạn, {fish}không có lấy một con cá. {bias}Đề thi này… hình như có tủ.',
      ],
      sfx: [['whoosh', 'late', 0.6], ['scratch', 'where', 0.6], ['pop', 'land'], ['bonk', 'fish', 0.5], ['boing', 'bias', 0.6]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.char(700, G, 420, { ...THUY, face: k.t > k.cue('bias') ? 'angry' : 'shock', pose: k.t > k.cue('look') ? 'shrug' : 'shout', p: k.at('late', 0.5) });
        say(k, 'Ủa alo? Người đâu rồi?!', 'where', [180, 160, 720, 130], [690, 760]);
        k.group({ a: k.at('look', 0.4) }, () => {
          k.prop('elephant', 220, 380, 220, { tusks: 9 });
          k.prop('rooster', 220, 560, 150, { spurs: 9 });
          k.text('TRÊN CẠN ✓', 240, 690, { size: 50, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('land', 0.4), outline: '#fffaf0', outlineWidth: 10 });
          k.prop('fish', 850, 430, 200, { bob: 6, p: k.at('fish', 0.5) });
          k.icon('cross', 850, 430, 220, { p: k.at(k.cue('fish', 0.4), 0.4) });
          k.text('0 con cá', 850, 620, { size: 56, font: 'title', color: '#2f78c4', fx: 'pop', p: k.at(k.cue('fish', 0.5), 0.4), outline: '#fffaf0', outlineWidth: 10 });
        });
        stamp(k, 290, 930, 'CÓ TỦ?', k.at('bias', 0.5), { w: 200, size: 64, r: -0.12 });
      },
    },
    {
      say: '{mad}Thủy Tinh nổi giận, hô mưa gọi gió, dâng nước đánh Sơn Tinh, {year}và năm nào cũng quay lại đánh tiếp. {q}Vậy họ đánh nhau vì cô gái, {dike}hay vì… con đê?',
      sfx: [['boom', 'mad', 0.6], ['whoosh', 'year', 0.5], ['drumroll', 'q', 0.4], ['ding', 'dike', 0.5]],
      draw(k) {
        k.backdrop('night', { ground: G });
        k.prop('storm', 300, 200, 300, { rain: 1, bolt: true, p: k.at('mad', 0.5) });
        k.prop('storm', 800, 260, 260, { rain: 1, p: k.at(k.cue('mad', 0.3), 0.5) });
        const lv = k.lerp(1500, 1000, k.at('mad', 4, 'inOut'));
        k.prop('mountain', 280, 1000, 560, { fill: '#5f9a4a' });
        k.char(280, 760, 300, { ...SON, face: 'angry', pose: 'fight', shadow: false });
        k.char(780, Math.max(lv + 60, 1000), 400, { ...THUY, face: 'shout', pose: 'cheer', shadow: false });
        k.water(lv, { amp: 12 });
        for (let i = 0; i < 4; i++) k.prop('calendar', 190 + i * 230, 560, 140, { p: k.at(k.cue('year', i * 0.2), 0.4), text: String(7 + i), label: 'THÁNG' });
        k.prop('heart', 340, 820, 160, { p: k.at('q', 0.5) });
        k.text('hay', 540, 820, { size: 70, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('dike', 0.4), outline: '#1b1b24', outlineWidth: 12 });
        k.prop('dike', 760, 840, 220, { p: k.at('dike', 0.5) });
      },
    },
    fullVideoScene({
      say: '{full}Đáp án nằm trong tập đầy đủ "Sơn Tinh, Thủy Tinh" trên kênh Vẽ Là Hiểu. Xem ngay nhé!',
      image: 'poster',
      title: 'Sơn Tinh – Thủy Tinh: đánh nhau vì cô gái, hay vì con đê?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
