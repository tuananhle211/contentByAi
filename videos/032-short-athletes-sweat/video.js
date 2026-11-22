// Shorts — Ancient Greeks sold athletes' sweat (dọc 9:16, cắt từ tập 031 How Did Ancient Humans Stay Clean Without Soap?)
// Đối chiếu: vận động viên xoa dầu ô liu, cạo bằng strigil; hỗn hợp cạo ra (dầu + mồ hôi + bụi + da) gọi là gloios.
//  Luật gymnasium ở Beroea (Macedonia, thế kỷ 2 TCN) quy định việc bán gloios. Pliny the Elder ghi công dụng chữa đau/viêm — Pliny hay sai, nói rõ.
//  Bài học dữ liệu: chữ to xuất hiện ngay khung đầu (p: 1) — luồng Shorts hiển thị khung đầu trước khi người xem quyết định vuốt.
import { fullVideoScene } from '/engine/templates.js';
import { P, paper, note, card } from '/channel/long-story-drawn.js';

const GREEK = { body: 'man', outfit: 'bare', color: '#c2a46b', color2: '#8B5A2B', hair: 'short', hairColor: '#3a2a1e', skin: '#e0b48a' };
const FAN = { body: 'man', outfit: 'robe', color: '#5a6b8a', color2: P.yellow, hair: 'short', hairColor: '#3a2a1e', skin: '#e0b48a' };

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    format: 'short',
    captions: true,
    title: "Ancient Greeks Sold Athletes' Sweat 🏺 #shorts",
    description: 'Greek athletes rubbed themselves with olive oil, then scraped it off with a curved metal blade. The gunk had a name, gloios — and it was sold. Watch the full story, "How Did Ancient Humans Stay Clean Without Soap?", on Long Story Drawn.',
    tags: ['ancient greek athletes sweat', 'gloios', 'strigil', 'ancient hygiene', 'how did people stay clean before soap', 'ancient greece facts', 'weird history', 'ancient humans', 'shorts', 'long story drawn'],
    hashtags: ['shorts', 'history', 'ancientgreece'],
    voice: 'en-US-AndrewMultilingualNeural',
    rate: '-2%',
    pitch: '-2Hz',
    categoryId: '27',
    images: { poster: 'assets/poster.jpg' },
    music: 'assets/music/background.mp3',
    musicVolume: 0.08,
    sfxVolume: 0.5,
    transition: 'fade',
  },

  scenes: [
    {
      lead: 0.1,
      say: "{q}In ancient Greece, people paid for jars of athletes' sweat. {real}Seriously. {how}Here's how it worked.",
      sfx: [['pop', 'q'], ['boing', 'real', 0.3]],
      draw(k) {
        paper(k);
        k.text('THEY SOLD', 540, 220, { size: 120, font: 'title', color: P.ink, p: 1, outline: '#fffaf0', outlineWidth: 16 });
        k.text('SWEAT?!', 540, 370, { size: 150, font: 'title', color: P.red, p: 1, outline: '#fffaf0', outlineWidth: 18 });
        k.prop('pot', 540, 780, 420, { fill: '#a88a4a' });
        k.icon('coin', 820, 620, 140, { p: k.at('real', 0.4) });
        k.char(240, 1250, 380, { ...FAN, face: k.t > k.cue('real') ? 'shock' : 'happy' });
      },
    },
    {
      say: "{oil}Athletes trained covered in olive oil. {scrape}Afterward, they scraped it all off with a curved metal tool called a strigil: {mix}oil, sweat, dust, and dead skin. {name}That gunk even had a name: {gloios}gloios.",
      sfx: [['pop', 'oil'], ['scratch', 'scrape', 0.5], ['pop', 'mix'], ['ding', 'gloios', 0.4]],
      draw(k) {
        paper(k, '#f3e7cf');
        const s = Math.sin((k.gt ?? 0) * 5) * k.at('scrape', 0.4);
        k.char(360, 1250, 600, { ...GREEK, face: 'happy', pose: { l: [30, -40], r: [-60 + s * 30, -100] } });
        k.prop('strigil', 430, 900 + s * 30, 200, { p: k.at('scrape', 0.5), rotate: 0.5 + s * 0.2 });
        k.prop('pot', 820, 1150, 180, { fill: '#c9a24a', p: k.at('oil', 0.5) });
        note(k, 'olive oil', 820, 1020, 'oil', { size: 48, fx: 'pop' });
        const mix = [['oil'], ['sweat'], ['dust'], ['dead skin']];
        mix.forEach(([t], i) => note(k, '+ ' + t, 800, 360 + i * 80, k.cue('mix', i * 0.3), { size: 52, fx: 'pop' }));
        k.text('= GLOIOS', 540, 220, { size: 120, font: 'title', color: P.red, fx: 'pop', p: k.at('gloios', 0.4), outline: '#fffaf0', outlineWidth: 16 });
      },
    },
    {
      say: "{sold}And it was sold. {law}A stone inscription from a gymnasium in Beroea, in northern Greece, sets out rules for selling it. {pliny}The Roman writer Pliny claimed it went into medicines for aches and inflammation. {wrong}Pliny was often wrong. {buy}But people really did buy it. {you}Would you?",
      sfx: [['cash', 'sold', 0.4], ['pop', 'law'], ['pop', 'pliny'], ['boing', 'wrong', 0.3], ['tada', 'buy', 0.3], ['pop', 'you']],
      draw(k) {
        paper(k);
        k.text('FOR SALE', 540, 200, { size: 120, font: 'title', color: P.grass, fx: 'pop', p: k.at('sold', 0.4), outline: '#fffaf0', outlineWidth: 16 });
        card(k, 540, 380, ['BEROEA GYMNASIUM LAW', 'stone inscription · 2nd c. BC'], 'law', { w: 860 });
        card(k, 540, 600, ['PLINY THE ELDER', 'aches · inflammation'], 'pliny', { w: 700, r: 0.02, seed: 3220 });
        note(k, '(Pliny: often wrong)', 540, 740, 'wrong', { size: 48, color: '#6b5f55' });
        k.prop('pot', 360, 1100, 260, { fill: '#a88a4a', p: k.at('buy', 0.5) });
        k.char(760, 1250, 330, { ...FAN, face: k.t > k.cue('you') ? 'blank' : 'happy', pose: 'hold', p: k.at('buy', 0.5) });
        k.text('WOULD YOU?', 540, 830, { size: 96, font: 'title', color: P.red, fx: 'pop', p: k.at('you', 0.4), outline: '#fffaf0', outlineWidth: 14 });
      },
    },
    fullVideoScene({
      lang: 'en',
      say: "{full}The full story of how your ancestors stayed clean without soap is on the channel. Link below.",
      image: 'poster',
      title: 'How Did Ancient Humans Stay Clean Without Soap?',
      channel: 'Long Story Drawn',
      tail: 1.2,
    }),
  ],
};
