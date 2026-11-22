// Shorts — Ice Age dentists (dọc 9:16, cắt từ tập 023 How Did Ancient Humans Survive Without Doctors?)
// Đối chiếu: Oxilia et al. 2015 (Scientific Reports) — Villabruna (Bắc Ý), ~14.000 năm: răng hàm sâu bị cạo bằng mũi đá nhọn khi người còn sống, không trám.
//  Oxilia et al. 2017 (AJPA) — Riparo Fredian gần Lucca, ~13.000 năm: hai răng cửa trên bị khoét rộng, trám bằng bitumen + sợi thực vật + có thể là tóc.
//  "Among the oldest fillings" (không khẳng định cũ nhất tuyệt đối). Không có bằng chứng về thuốc tê.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, paper, note, card } from '/channel/long-story-drawn.js';

const DENT = ANC({ hair: 'long', skin: '#e0b48a', color: '#8a6a4a' });

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    format: 'short',
    captions: true,
    title: 'Ice Age Dentists Filled Cavities With Tar 🦷 #shorts',
    description: '14,000 years ago, someone scraped out a rotten tooth with a tiny stone tool. A thousand years later, two teeth were filled with tar, plant fibers and maybe hair. Watch the full story, "How Did Ancient Humans Survive Without Doctors?", on Long Story Drawn.',
    tags: ['ice age dentist', 'oldest dental filling', 'stone age dentistry', 'prehistoric dentist', 'ancient dentistry', 'riparo fredian', 'villabruna', 'ancient humans', 'shorts', 'long story drawn'],
    hashtags: ['shorts', 'history', 'archaeology'],
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
      say: "{q}What did people do about a toothache, fourteen thousand years ago? {villa}At Villabruna, in northern Italy, a man had a cavity in a back tooth. {scrape}Someone scraped out the decay, with a tiny pointed stone tool.",
      sfx: [['pop', 'q'], ['pop', 'villa'], ['scratch', 'scrape', 0.5]],
      draw(k) {
        paper(k);
        k.text('14,000 YEARS AGO', 540, 200, { size: 92, font: 'title', color: P.red, fx: 'pop', p: k.at('q', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.char(300, 1250, 460, { ...DENT, face: k.t > k.cue('scrape') ? 'shock' : 'sad', p: k.at('q', 0.5) });
        k.sweat(380, 830, 1.6, { p: k.at('q', 0.4) });
        card(k, 540, 360, ['VILLABRUNA · ITALY', 'Oxilia et al., 2015'], 'villa', { w: 640 });
        k.prop('tooth', 720, 680, 300, { cavity: true, p: k.at('villa', 0.5) });
        const sc = Math.sin((k.gt ?? 0) * 12) * 12 * k.at('scrape', 0.4);
        k.prop('handaxe', 880 + sc, 560, 120, { rotate: -0.8, p: k.at('scrape', 0.5) });
        note(k, 'decay scraped out', 720, 900, 'scrape', { size: 54, color: P.brown, fx: 'pop' });
      },
    },
    {
      say: "{fred}About a thousand years later, near Lucca, someone went further. {two}Two front teeth were hollowed out, {fill}and filled with bitumen, a natural tar, {fib}mixed with plant fibers, {hair}and what may be hair. {oldest}Among the oldest fillings ever found.",
      sfx: [['pop', 'fred'], ['scratch', 'two', 0.4], ['tada', 'fill', 0.4], ['pop', 'fib'], ['boing', 'hair', 0.3], ['ding', 'oldest', 0.4]],
      draw(k) {
        paper(k);
        card(k, 540, 220, ['RIPARO FREDIAN · ~13,000 YEARS', 'Oxilia et al., 2017'], 'fred', { w: 860 });
        k.prop('tooth', 380, 560, 300, { cavity: k.t < k.cue('fill'), filled: k.t >= k.cue('fill'), p: k.at('two', 0.5) });
        k.prop('tooth', 700, 560, 300, { cavity: k.t < k.cue('fill'), filled: k.t >= k.cue('fill'), p: k.at('two', 0.5) });
        note(k, 'BITUMEN (tar)', 540, 820, 'fill', { size: 64, color: P.ink, fx: 'pop' });
        note(k, '+ plant fibers', 540, 910, 'fib', { size: 54, color: P.grass, fx: 'pop' });
        note(k, '+ hair?', 540, 990, 'hair', { size: 54, color: P.brown, fx: 'pop' });
        k.text('AMONG THE OLDEST', 540, 1150, { size: 88, font: 'title', color: P.red, fx: 'pop', p: k.at('oldest', 0.4), outline: '#fffaf0', outlineWidth: 14 });
      },
    },
    {
      say: "{anest}Anesthesia? {none}Not that we know of. {joke}So next time you complain about your dentist, {rock}remember: at least they're not using a rock.",
      sfx: [['pop', 'anest'], ['wahwah', 'none', 0.3], ['pop', 'joke'], ['boing', 'rock', 0.3]],
      draw(k) {
        paper(k);
        k.text('ANESTHESIA?', 540, 240, { size: 110, font: 'title', color: P.ink, fx: 'pop', p: k.at('anest', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.text('…no.', 540, 380, { size: 100, font: 'title', color: P.red, fx: 'pop', p: k.at('none', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.char(540, 1250, 560, { ...YOU, face: k.t > k.cue('rock') ? 'laugh' : 'shock', p: k.at('anest', 0.5) });
        k.prop('rock', 870, 1170, 180, { p: k.at('rock', 0.5) });
        k.text('at least: no rock', 540, 560, { size: 70, font: 'title', color: P.grass, fx: 'pop', p: k.at('rock', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    fullVideoScene({
      lang: 'en',
      say: "{full}The full story of how your ancestors survived without doctors is on the channel. Link below.",
      image: 'poster',
      title: 'How Did Ancient Humans Survive Without Doctors?',
      channel: 'Long Story Drawn',
      tail: 1.2,
    }),
  ],
};
