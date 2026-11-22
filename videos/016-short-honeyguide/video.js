// Shorts — This bird leads humans to honey (dọc 9:16, cắt từ tập 013 What Did Ancient Humans Actually Eat?)
// Đối chiếu: greater honeyguide (Indicator indicator) dẫn người tới tổ ong, ăn sáp còn lại.
//  Spottiswoode, Begg & Begg 2016 (Science), Yao ở Mozambique: tiếng "brrr-hm" nâng xác suất được dẫn từ ~33% lên ~66%.
//  Người dùng khói để làm ong dịu rồi mở tổ.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, flat, note, card } from '/channel/long-story-drawn.js';

const G = 1250;
const YAO = ANC({ outfit: 'tunic', color: '#5a6b8a', color2: P.yellow, hair: 'short', skin: '#9a6b42' });
function sky(k) {
  flat(k, P.sky, P.sand, G);
  k.dot(900, 180, 70, P.yellow);
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    format: 'short',
    captions: true,
    title: 'This Wild Bird Leads Humans to Honey 🍯 #shorts',
    description: 'The greater honeyguide chatters at people, flies from tree to tree, and leads them to wild bees\' nests — and it answers when it\'s called. Watch the full story, "What Did Ancient Humans Actually Eat?", on Long Story Drawn.',
    tags: ['honeyguide bird', 'greater honeyguide', 'bird leads humans to honey', 'honey hunters', 'animal human cooperation', 'hadza', 'ancient humans', 'shorts', 'long story drawn'],
    hashtags: ['shorts', 'nature', 'animals'],
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
      say: "{q}What if a wild bird could lead you to honey? {real}It's real. {name}It's called the greater honeyguide, and it lives in Africa.",
      sfx: [['pop', 'q'], ['ding', 'real', 0.4], ['sparkle', 'name', 0.4]],
      draw(k) {
        sky(k);
        k.prop('acacia', 760, G - 330, 700);
        k.prop('beehive', 820, 820, 220, { p: k.at('q', 0.5) });
        k.prop('bird', 360, 560, 300, { fly: true, p: k.at('q', 0.5) });
        k.text("IT'S REAL", 540, 260, { size: 120, font: 'title', color: P.red, fx: 'pop', p: k.at('real', 0.4), outline: '#fffaf0', outlineWidth: 16 });
        note(k, 'GREATER HONEYGUIDE', 540, 380, 'name', { size: 64, color: P.ink, fx: 'pop' });
        k.char(260, G + 30, 380, { ...YOU, face: 'shock', p: k.at('q', 0.5) });
      },
    },
    {
      say: "{chatter}It chatters at people, {fly}flies from tree to tree, {wait}and waits for them to follow. {nest}At the bees' nest, the humans use smoke to calm the bees, and open it up. {wax}They take the honey. {bird}The bird gets the wax.",
      sfx: [['pop', 'chatter'], ['whoosh', 'fly', 0.4], ['whoosh', 'nest', 0.3], ['tada', 'wax', 0.4]],
      draw(k) {
        sky(k);
        k.prop('acacia', 300, G - 260, 520);
        k.prop('acacia', 820, G - 330, 680);
        k.prop('beehive', 860, 820, 200);
        const u = k.at('fly', 3, 'inOut');
        k.prop('bird', k.lerp(260, 700, u), 520 - Math.sin(u * Math.PI) * 120, 200, { fly: true });
        k.text('chk-chk-chk!', 300, 400, { size: 56, font: 'title', color: P.brown, fx: 'pop', p: k.at('chatter', 0.4) * (1 - k.at('fly', 0.3)), outline: '#fffaf0', outlineWidth: 8 });
        k.char(560, G + 30, 420, { ...YAO, face: 'happy', pose: k.t > k.cue('nest') ? 'hold' : 'point', walk: k.t > k.cue('wait') && k.t < k.cue('nest') });
        k.prop('campfire', 740, G - 30, 130, { p: k.at('nest', 0.5), fire: 0.5 });
        note(k, 'humans → honey', 540, 220, 'wax', { size: 64, color: P.orange, fx: 'pop' });
        note(k, 'bird → wax', 540, 310, 'bird', { size: 64, color: P.grass, fx: 'pop' });
      },
    },
    {
      say: "{call}And it answers when it's called. {yao}In Mozambique, Yao honey-hunters call out: brrr-hm. {test}In a 2016 study, that call doubled the chance of being guided, {pct}from about a third, to two thirds.",
      sfx: [['boing', 'yao', 0.3], ['pop', 'test'], ['tada', 'pct', 0.4]],
      draw(k) {
        sky(k);
        k.char(300, G + 30, 460, { ...YAO, face: 'shout', pose: 'shout', p: k.at('call', 0.5) });
        k.bubble(80, 380, 520, 160, 300, 720, { p: k.at('yao', 0.4), text: 'brrr-hm!', size: 70 });
        k.prop('bird', 800, 640, 220, { fly: true, p: k.at('call', 0.5) });
        card(k, 540, 180, ['SPOTTISWOODE ET AL., 2016', 'Science · Mozambique'], 'test', { w: 800 });
        note(k, '33% → 66%', 700, 900, 'pct', { size: 96, color: P.orange, fx: 'pop' });
        note(k, 'chance of being guided', 700, 1000, 'pct', { size: 42 });
      },
    },
    fullVideoScene({
      lang: 'en',
      say: "{full}What else did your ancestors really eat? The full story is on the channel. Link below.",
      image: 'poster',
      title: 'What Did Ancient Humans Actually Eat?',
      channel: 'Long Story Drawn',
      tail: 1.2,
    }),
  ],
};
