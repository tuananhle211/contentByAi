// Shorts — Big-game hunters failed 29 days out of 30 (→ Ep 3, 013). Hawkes, O'Connell & Blurton Jones 1991: Hadza men acquired a large animal on ~3%
//  of hunter-days (≈1 in 30); women's tuber digging and gathering gave reliable daily food. Berbesque & Marlowe 2009: honey is the Hadza's top-ranked food.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, SCI, flat, paper, night, stars, note, card, lying, zzz, glow, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const HADZA = ANC({ skin: '#9a6b42', hair: 'short' });
const HADZAW = ANCW({ skin: '#9a6b42', hair: 'short', color: '#a8744a' });
export default {
  meta: shortMeta({
    title: 'Big-Game Hunters Succeeded Just 1 Day in 30 🏹 #shorts',
    description: 'Hadza big-game hunters brought home a large animal on only about 1 day in 30. So what did everyone actually eat?',
    tags: ['hunter gatherer diet', 'hadza hunting', 'what did cavemen eat', 'man the hunter myth', 'paleo diet myth'],
    long: 'What Did Ancient Humans Actually Eat?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}Hunter-gatherers bringing home a giant animal every day? {no}Not quite. {one}Try one day in thirty.",
      sfx: [['pop', 'q'], ['bonk', 'no', 0.3], ['tada', 'one', 0.4]],
      draw(k) {
        flat(k, P.orange, P.sand, G);
        hook(k, 'BIG GAME:', '1 DAY IN 30', { s1: 110, s2: 130 });
        k.char(320, G + 20, 460, { ...HADZA, face: k.t > k.cue('no') ? 'sad' : 'happy', prop: 'spear' });
        k.prop('ox', 780, G - 120, 300, { p: 1 - k.at('no', 0.5) });
        k.prop('acacia', 800, G - 260, 420, { p: k.at('no', 0.5) });
      },
    },
    {
      say: "{study}In 1991, Kristen Hawkes and her colleagues tracked Hadza hunters in Tanzania. {pct}Men brought home a large animal on only about three percent of the days they hunted. {miss}The other twenty-nine days? {empty}No big game.",
      sfx: [['pop', 'study'], ['drumroll', 'pct', 0.3], ['pop', 'miss'], ['wahwah', 'empty', 0.3]],
      draw(k) {
        paper(k);
        card(k, 540, 220, ['HAWKES ET AL., 1991', 'Hadza hunters · Tanzania'], 'study', { w: 760 });
        for (let i = 0; i < 30; i++) {
          const x = 150 + (i % 6) * 156, y = 420 + Math.floor(i / 6) * 120, hit = i === 17;
          k.rect(x - 60, y - 45, 120, 90, { fill: hit ? P.grass : '#e8e0d0', fillStyle: 'solid', width: 3, p: k.at(k.cue('pct', i * 0.04), 0.3), seed: 3700 + i });
          if (hit) k.text('✓', x, y, { size: 60, font: 'title', color: '#fff', p: k.at('pct', 1.5) });
        }
        k.text('29 × no big game', 540, 1080, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('empty', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{so}So who kept everyone fed? {women}Mostly women, digging tubers and gathering, {every}every single day. {honey}Plus honey, which the Hadza rank as their favorite food. {myth}Man the Hunter makes a better movie. {real}But the tuber diggers paid the bills.",
      sfx: [['pop', 'so'], ['ding', 'women', 0.4], ['pop', 'honey'], ['boing', 'myth', 0.3], ['cash', 'real', 0.4]],
      draw(k) {
        flat(k, P.sky, P.sand, G);
        k.dot(900, 180, 70, P.yellow);
        k.char(300, G + 20, 440, { ...HADZAW, face: 'happy', prop: 'staff', p: k.at('women', 0.5) });
        for (let i = 0; i < 4; i++) k.prop('tuber', 600 + (i % 2) * 140, G - 30 - Math.floor(i / 2) * 70, 130, { p: k.at(k.cue('every', i * 0.2), 0.4) });
        k.prop('beehive', 820, 700, 200, { p: k.at('honey', 0.5) });
        note(k, '#1 favorite food', 820, 560, 'honey', { size: 48, color: P.orange, fx: 'pop' });
        k.text('THE REAL BREADWINNERS', 540, 260, { size: 62, font: 'title', color: P.red, fx: 'pop', p: k.at('real', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}What else did your ancestors really eat? The full story is on the channel. Link below.", image: 'poster', title: 'What Did Ancient Humans Actually Eat?', channel: 'Long Story Drawn', tail: 1.2 }),
  ],
};
