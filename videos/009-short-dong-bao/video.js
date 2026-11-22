// Shorts — Vì sao người Việt gọi nhau là "đồng bào"? (dọc 9:16, cắt từ tập 006 Con Rồng Cháu Tiên)
// Đối chiếu: Âu Cơ sinh một bọc trăm trứng, nở trăm người con (truyện Con Rồng cháu Tiên); "đồng bào" 同胞: đồng = cùng, bào = bọc (bào thai).
import { C } from '/engine/kit.js';
import { fullVideoScene } from '/engine/templates.js';

const G = 1250;
const AUCO = { body: 'woman', outfit: 'dress', color: '#fdf0f3', color2: '#ef6f9a', hair: 'long', hat: 'flower' };
const KC = ['#e4572e', '#2e86de', '#f6c344', '#3bb273', '#8e5bd3', '#ef6f9a', '#f08a24', '#1f7a8c'];
const KID = (i, extra = {}) => ({ body: 'kid', outfit: 'tunic', color: KC[i % KC.length], color2: '#fffaf0', hair: 'topknot', face: 'happy', ...extra });
const PPL = (i) => ({ body: i % 2 ? 'woman' : 'man', outfit: i % 2 ? 'dress' : 'tunic', color: KC[i % KC.length], color2: '#fffaf0', hair: i % 2 ? 'bun' : 'short' });

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    format: 'short',
    captions: true,
    title: 'Vì sao người Việt gọi nhau là "đồng bào"? 🥚 #shorts',
    description: 'Không phải đồng hương, không phải đồng nghiệp — mà là đồng bào. Một từ ta dùng mỗi ngày, bắt nguồn từ truyền thuyết một bọc trăm trứng. Xem tập đầy đủ "Con Rồng Cháu Tiên" trên kênh Vẽ Là Hiểu!',
    tags: ['đồng bào là gì', 'con rồng cháu tiên', 'bọc trăm trứng', 'lạc long quân âu cơ', 'nguồn gốc người việt', 'shorts', 'vẽ là hiểu'],
    hashtags: ['shorts', 'conrongchautien', 'tiengviet'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '+0%',
    voices: {
      kids: { voice: 'vi-VN-HoaiMyNeural', pitch: '+40Hz', rate: '+18%' },
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
      say: 'Vì sao người Việt gọi nhau là {db}"đồng bào"? {not}Không phải đồng hương, {not2}cũng chẳng phải đồng nghiệp. {why}Mà là đồng bào.',
      sfx: [['tada', 'db', 0.5], ['bonk', 'not', 0.4], ['bonk', 'not2', 0.4], ['ding', 'why', 0.5]],
      draw(k) {
        k.backdrop('dawn', { ground: G });
        k.text('Vì sao gọi nhau là', k.W / 2, 200, { size: 70, font: 'title', fx: 'pop', p: k.at(0, 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.text('"ĐỒNG BÀO"?', k.W / 2, 340, { size: 130, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('db', 0.5), outline: '#fffaf0', outlineWidth: 16 });
        [['đồng hương', 'not', 560], ['đồng nghiệp', 'not2', 720]].forEach(([t, c, y]) => {
          k.text(t, k.W / 2, y, { size: 76, font: 'title', color: '#6b5f55', fx: 'pop', p: k.at(c, 0.4), outline: '#fffaf0', outlineWidth: 10 });
          k.icon('cross', k.W / 2, y, 170, { p: k.at(k.cue(c, 0.3), 0.3) });
        });
        for (let i = 0; i < 5; i++) k.char(150 + i * 195, G, 260, { ...PPL(i), face: k.t > k.cue('why') ? 'laugh' : 'happy', pose: k.t > k.cue('why') ? 'cheer' : 'stand', p: k.at(k.cue('why', i * 0.1), 0.4) });
      },
    },
    {
      say: [
        'Chuyện bắt đầu từ truyền thuyết. {auco}Mẹ Âu Cơ {sac}sinh ra một cái bọc. {eggs}Trong bọc có một trăm quả trứng, {kids}nở ra một trăm người con.',
        { v: 'kids', text: '{hi}Chào mẹ ạ!' },
      ],
      sfx: [['sparkle', 'auco', 0.5], ['boom', 'sac', 0.4], ['sparkle', 'eggs', 0.5], ['pop', 'kids'], ['pop', ['kids', 0.4]], ['pop', ['kids', 0.8]], ['tada', 'hi', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.char(250, 820, 440, { ...AUCO, face: k.t > k.cue('sac') && k.t < k.cue('eggs') ? 'shock' : 'happy', pose: k.t > k.cue('sac') ? 'present' : 'stand', p: k.at('auco', 0.5), blush: true });
        k.prop('eggsac', 720, 520, 380, { p: k.at('sac', 0.5), glow: k.at('eggs', 1) });
        k.text(`${Math.round(100 * k.at('eggs', 2, 'linear'))} quả trứng`, 720, 240, { size: 80, font: 'title', color: '#b5482c', p: k.at('eggs', 0.3), outline: '#fffaf0', outlineWidth: 12 });
        for (let i = 0; i < 10; i++) {
          const x = 110 + (i % 5) * 215, y = i < 5 ? 1030 : G;
          const c0 = k.cue('kids', i * 0.12);
          k.char(x, y, 170, { ...KID(i), face: k.t > k.cue('hi') ? 'laugh' : 'happy', pose: k.t > k.cue('hi') ? (i % 2 ? 'cheer' : 'wave') : 'stand', p: k.at(c0 + 0.4, 0.4), bob: k.t > k.cue('hi') ? 3 : 0, shadow: false });
          k.prop('egg', x, y - 50, 110, { crack: k.at(c0, 0.4), hatch: k.at(c0 + 0.3, 0.4), alpha: 1 - k.at(c0 + 0.8, 0.4) * 0.7 });
        }
      },
    },
    {
      say: '{dong}Đồng là cùng. {bao}Bào là cái bọc. {mean}Đồng bào, nghĩa là cùng một bọc sinh ra. {call}Nên mỗi khi ai gọi "đồng bào ơi", là đang gọi bạn là anh em ruột đấy!',
      sfx: [['pop', 'dong'], ['pop', 'bao'], ['ding', 'mean', 0.5], ['tada', 'call', 0.5]],
      draw(k) {
        k.text('ĐỒNG', 300, 220, { size: 120, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('dong', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.text('= cùng', 760, 220, { size: 76, font: 'title', p: k.at(k.cue('dong', 0.3), 0.8, 'linear') });
        k.text('BÀO', 300, 460, { size: 120, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('bao', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.text('= cái bọc', 700, 460, { size: 76, font: 'title', p: k.at(k.cue('bao', 0.3), 0.8, 'linear') });
        k.prop('eggsac', 960, 470, 130, { p: k.at(k.cue('bao', 0.6), 0.4) });
        k.text('= cùng một bọc sinh ra', k.W / 2, 700, { size: 70, font: 'title', color: '#3f6f2a', p: k.at('mean', 1.3, 'linear'), outline: '#fffaf0', outlineWidth: 10, maxWidth: k.W - 80 });
        k.highlight(90, 664, 900, 72, { p: k.at(k.cue('mean', 1.4), 0.5), color: '#ffe08a' });
        k.text('ANH EM RUỘT!', k.W / 2, 900, { size: 100, font: 'title', color: '#e4572e', fx: 'pop', p: k.at(k.cue('call', 1.4), 0.5), outline: '#fffaf0', outlineWidth: 14 });
        for (let i = 0; i < 5; i++) k.char(150 + i * 195, G, 250, { ...PPL(i + 2), face: 'laugh', pose: 'cheer', p: k.at(k.cue('call', i * 0.12), 0.4), bob: 3 });
        k.prop('heart', 540, 1060, 120, { p: k.at(k.cue('call', 1.6), 0.4), bob: 5 });
      },
    },
    fullVideoScene({
      say: '{full}Còn một trăm người con ấy chia nhau đi đâu, và ai là vua Hùng đầu tiên? Xem tập Con Rồng Cháu Tiên trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: 'Con Rồng Cháu Tiên: 100 cái trứng nói gì về người Việt?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
