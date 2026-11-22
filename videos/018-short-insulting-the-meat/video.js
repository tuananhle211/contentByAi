// Shorts — Why they insulted his gift (dọc 9:16, cắt từ tập 017 Did Ancient Humans Work Less Than You?)
// Đối chiếu: Richard Lee 1969, "Eating Christmas in the Kalahari" (Natural History): mua con bò to béo nhất cho bữa Giáng sinh; người San chê "bag of bones";
//  bò hoá ra béo ngon; giải thích: chê thịt để người săn giỏi không kiêu — "cool his heart and make him gentle".
import { fullVideoScene } from '/engine/templates.js';
import { P, ANC, ANCW, ELDER, SCI, flat, stars, card, note } from '/channel/long-story-drawn.js';

const G = 1250;
const LEE = SCI({ hat: undefined, color: '#c2a46b', hair: 'short', hairColor: '#5a3a24', beard: true, beardColor: '#5a3a24' });
function desert(k) {
  flat(k, P.orange, P.sand, G);
  k.dot(880, 220, 90, P.yellow);
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    format: 'short',
    captions: true,
    title: 'He Gave Them the Biggest Ox. They Called It Skinny. 🐂 #shorts',
    description: 'An anthropologist bought the fattest ox he could find as a Christmas gift for the people he lived with in the Kalahari. Everyone said it was a bag of bones. The reason is brilliant. Watch the full story, "Did Ancient Humans Work Less Than You?", on Long Story Drawn.',
    tags: ['eating christmas in the kalahari', 'richard lee', 'insulting the meat', 'hunter gatherers', 'egalitarian society', 'anthropology', 'ancient humans', 'shorts', 'long story drawn'],
    hashtags: ['shorts', 'anthropology', 'history'],
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
      say: "{q}What if you gave someone the best gift you could find, {insult}and they told you it was garbage? {lee}That happened to anthropologist Richard Lee, in the Kalahari Desert, at Christmas.",
      sfx: [['tada', 'q', 0.4], ['wahwah', 'insult', 0.4], ['pop', 'lee']],
      draw(k) {
        desert(k);
        k.prop('ox', 600, 900, 520, { p: k.at('q', 0.5) });
        k.char(220, G + 30, 420, { ...LEE, face: k.t > k.cue('insult') ? 'shock' : 'happy', pose: k.t > k.cue('insult') ? 'shrug' : 'present' });
        k.text('THE BEST GIFT', 540, 260, { size: 100, font: 'title', color: '#fff', fx: 'pop', p: k.at('q', 0.4), outline: P.ink, outlineWidth: 14 });
        k.text('= GARBAGE?', 540, 400, { size: 110, font: 'title', color: P.red, fx: 'pop', p: k.at('insult', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        card(k, 540, 560, ['RICHARD LEE · 1969', '"Eating Christmas in the Kalahari"'], 'lee', { w: 820 });
      },
    },
    {
      say: "{ox}He bought the biggest, fattest ox he could find, for a feast. {bones}Everyone called it a bag of bones. {thin}Skinny. Old. Barely worth cooking. {cook}Then they cooked it, {fat}and it was fat, delicious, and enough for everyone.",
      sfx: [['pop', 'ox'], ['wahwah', 'bones', 0.4], ['bonk', 'thin', 0.3], ['whoosh', 'cook', 0.3], ['tada', 'fat', 0.4]],
      draw(k) {
        desert(k);
        k.prop('ox', 540, 820, 480, { p: k.at('ox', 0.5) });
        k.char(220, G + 30, 380, { ...ANC({ hair: 'short' }), face: 'smug', pose: 'point', p: k.at('bones', 0.5) });
        k.char(860, G + 30, 380, { ...ANCW(), face: 'smug', pose: 'hips', flip: true, p: k.at('bones', 0.5) });
        k.bubble(120, 220, 840, 160, 300, 900, { p: k.at('bones', 0.4), text: '"A bag of bones!"', size: 66 });
        k.text('SKINNY? OLD?', 540, 460, { size: 90, font: 'title', color: P.red, fx: 'pop', p: k.at('thin', 0.4) * (1 - k.at('cook', 0.3)), outline: '#fffaf0', outlineWidth: 12 });
        k.text('…DELICIOUS.', 540, 460, { size: 100, font: 'title', color: P.grass, fx: 'pop', p: k.at('fat', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{why}So why the insults? {big}When a hunter brings in a lot of meat, he can start thinking he's a big man. {cool}So you talk his meat down, {gentle}to cool his heart, and make him gentle. {equal}Mockery, as a tool for keeping everyone equal.",
      sfx: [['boing', 'why', 0.3], ['pop', 'big'], ['ding', 'gentle', 0.4], ['sparkle', 'equal', 0.4]],
      draw(k) {
        flat(k, P.indigo, '#4a3f5e', G);
        stars(k, 30, 700);
        k.prop('campfire', 540, G - 60, 300);
        k.darkness(0.35, [{ x: 540, y: G - 150, r: 700, warm: 1 }]);
        k.char(250, G + 40, 420, { ...ELDER, face: 'smug', pose: 'present' });
        k.char(830, G + 40, 400, { ...ANC({ hair: 'short' }), face: k.t > k.cue('gentle') ? 'happy' : 'smug', pose: k.t > k.cue('gentle') ? 'stand' : 'hips', flip: true, prop: 'spear' });
        k.bubble(80, 260, 920, 200, 260, 760, { p: k.at('cool', 0.4), text: '"We cool his heart and make him gentle."', size: 50 });
        k.text('MOCKERY → EQUALITY', 540, 600, { size: 74, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at('equal', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },
    fullVideoScene({
      lang: 'en',
      say: "{full}So did hunter-gatherers really work less than you? The full story is on the channel. Link below.",
      image: 'poster',
      title: 'Did Ancient Humans Work Less Than You?',
      channel: 'Long Story Drawn',
      tail: 1.2,
    }),
  ],
};
