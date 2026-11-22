// Shorts — Hunter-gatherers eat ~6x more fiber (→ Ep 3, 013). Hadza fiber intake estimated ~100 g/day or more (estimates vary — "by some estimates");
//  US average ~15–16 g/day. Main Hadza foods: meat, honey, baobab, berries, tubers (Marlowe 2010). Smits et al. 2017: Hadza gut microbes cycle with seasons.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, flat, paper, night, stars, note, card, glow, redX, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const DARK = { c1: '#fffaf0', o1: P.ink };
const HADZAW = ANCW({ skin: '#9a6b42', hair: 'short', color: '#a8744a' });
export default {
  meta: shortMeta({
    title: 'Hunter-Gatherers Eat 6x More Fiber Than You 🥔 #shorts',
    description: 'The average American eats about 15 grams of fiber a day. By some estimates, Hadza hunter-gatherers eat 100 grams or more.',
    tags: ['fiber intake', 'hadza diet', 'gut microbiome', 'how much fiber per day', 'hunter gatherer diet'],
    long: 'What Did Ancient Humans Actually Eat?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}You probably eat about fifteen grams of fiber a day. {them}Some hunter-gatherers eat around a hundred.",
      sfx: [['pop', 'q'], ['tada', 'them', 0.4]],
      draw(k) {
        paper(k);
        hook(k, '15 g vs', '100 g', { s1: 120, s2: 180 });
        k.rect(170, 1150 - 60, 260, 60, { fill: P.stone, fillStyle: 'solid', width: 5, seed: 4100 });
        k.rect(650, 1150 - 400 * Math.max(0.15, k.at('them', 1)), 260, 400 * Math.max(0.15, k.at('them', 1)), { fill: P.grass, fillStyle: 'solid', width: 5, seed: 4101 });
        note(k, 'you', 300, 1210, 'q', { size: 56, fx: 'pop' });
        note(k, 'Hadza', 780, 1210, 'them', { size: 56, color: P.grass, fx: 'pop' });
      },
    },
    {
      say: "{hadza}The Hadza of Tanzania eat a lot of wild tubers, {baobab}baobab fruit, {berries}and berries, all packed with tough fiber. {est}By some estimates, that's a hundred grams a day or more. {us}The average American? About fifteen.",
      sfx: [['pop', 'hadza'], ['pop', 'baobab'], ['pop', 'berries'], ['drumroll', 'est', 0.3], ['bonk', 'us', 0.3]],
      draw(k) {
        flat(k, P.sky, P.sand, G);
        k.char(260, G + 20, 460, { ...HADZAW, face: 'happy', prop: 'staff', p: k.at('hadza', 0.5) });
        const foods = [['hadza', 'tuber'], ['baobab', 'baobab'], ['berries', 'berries']];
        foods.forEach(([c, f], i) => k.prop(f, 640 + (i % 2) * 220, 560 + Math.floor(i / 2) * 220, 180, { p: k.at(c, 0.5) }));
        k.text('100+ g / day', 540, 260, { size: 110, font: 'title', color: P.grass, fx: 'pop', p: k.at('est', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        note(k, '(by some estimates)', 540, 370, 'est', { size: 46, color: '#6b5f55' });
        note(k, 'US average: ~15 g', 640, 1000, 'us', { size: 60, color: P.red, fx: 'pop' });
      },
    },
    {
      say: "{why}Why care? {gut}Fiber feeds the bacteria in your gut. {season}The Hadza gut microbiome even changes with the seasons, as their food changes. {you}Yours mostly gets processed snacks. {tip}Maybe add a bean or two.",
      sfx: [['pop', 'why'], ['ding', 'gut', 0.4], ['sparkle', 'season', 0.4], ['wahwah', 'you', 0.3], ['boing', 'tip', 0.3]],
      draw(k) {
        paper(k);
        k.text('FIBER FEEDS', 540, 220, { size: 110, font: 'title', color: P.ink, fx: 'pop', p: k.at('gut', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.text('YOUR GUT BUGS', 540, 360, { size: 110, font: 'title', color: P.grass, fx: 'pop', p: k.at('gut', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        for (let i = 0; i < 9; i++) k.dot(300 + k.rand(i) * 480, 560 + k.rand(i + 20) * 260, 18 + k.rand(i + 5) * 14, ['#7ab55a', '#e0a040', '#9a7ac0'][i % 3], k.at(k.cue('season', i * 0.1), 0.4));
        k.prop('snack', 300, 1000, 220, { p: k.at('you', 0.5) });
        k.char(780, G + 20, 400, { ...YOU, face: k.t > k.cue('tip') ? 'smug' : 'shock', p: k.at('you', 0.5) });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}What else did your ancestors really eat? The full story is on the channel. Link below.", image: 'poster', title: 'What Did Ancient Humans Actually Eat?', channel: 'Long Story Drawn', tail: 1.0 }),
  ],
};
