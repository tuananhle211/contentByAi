// Shorts — Roman baths didn't make people healthier (→ Ep 7, 031). Mitchell 2016 (Parasitology): whipworm/roundworm didn't fall (rose) under Rome;
//  lice/fleas as common as in Viking/medieval York; possible reason (hypothesis): warm communal bath water changed infrequently.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, flat, paper, night, stars, note, card, glow, redX, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const DARK = { c1: '#fffaf0', o1: P.ink };
const ROMAN = { body: 'man', outfit: 'robe', color: '#f5f1e6', color2: '#b03a2e', hair: 'short', hairColor: '#3a2a1e', skin: '#e0b48a' };
function baths(k, water = '#7FB5D5') {
  paper(k, '#e9dcc4');
  const { ctx } = k; ctx.fillStyle = '#d9c8a8'; ctx.fillRect(0, G, k.W, k.H - G);
  for (const x of [90, 990]) k.rect(x - 40, 120, 80, G - 120, { fill: '#f5efe0', fillStyle: 'solid', width: 5, seed: 4000 + x });
  k.rect(240, G - 40, 600, 130, { fill: water, fillStyle: 'solid', width: 5, seed: 4005 });
}
const ROMANW = { body: 'woman', outfit: 'dress', color: '#c9d3e8', color2: '#5a6b8a', hair: 'bun', hairColor: '#3a2a1e', skin: '#e0b48a' };
export default {
  meta: shortMeta({
    title: 'Roman Baths Didn\'t Make People Cleaner 🛁 #shorts',
    description: 'Romans loved their public baths. But when an archaeologist checked the parasite evidence, gut worms went up under Roman rule, not down.',
    tags: ['roman baths', 'roman baths parasites', 'piers mitchell', 'ancient rome hygiene', 'roman empire facts'],
    long: 'How Did Ancient Humans Stay Clean Without Soap?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}Roman baths may have spread worms. {wait}Here's the evidence.",
      sfx: [['pop', 'q'], ['bonk', 'wait', 0.3]],
      draw(k) {
        baths(k, '#8aa86a');
        hook(k, 'ROMAN BATHS', 'SPREAD WORMS?', { s1: 104, s2: 86 });
        for (let i = 0; i < 4; i++) k.char(330 + i * 140, G + 40, 220, { ...(i % 2 ? ROMANW : ROMAN), face: i === 2 ? 'shock' : 'happy', shadow: false });
      },
    },
    {
      say: "{rome}Romans built public baths everywhere. {mitchell}But in 2016, Cambridge archaeologist Piers Mitchell looked at parasite evidence from across the empire. {worms}Gut worms like whipworm didn't go down under Roman rule. {up}They rose. {lice}And lice and fleas were just as common as in later Viking and medieval towns.",
      sfx: [['pop', 'rome'], ['pop', 'mitchell'], ['bonk', 'worms', 0.3], ['wahwah', 'up', 0.3], ['pop', 'lice']],
      draw(k) {
        baths(k);
        card(k, 540, 220, ['PIERS MITCHELL · 2016', 'Parasitology'], 'mitchell', { w: 700 });
        k.text('WORMS: ↑', 540, 440, { size: 130, font: 'title', color: P.red, fx: 'pop', p: k.at('up', 0.4), outline: '#fffaf0', outlineWidth: 16 });
        note(k, "whipworm didn't go down", 540, 580, 'worms', { size: 56, fx: 'pop' });
        note(k, 'lice & fleas: just as common', 540, 680, 'lice', { size: 52, fx: 'pop' });
        k.char(540, G + 40, 300, { ...ROMAN, face: k.t > k.cue('up') ? 'shock' : 'happy', shadow: false });
      },
    },
    {
      say: "{why}One possible reason: {water}warm, shared bath water that wasn't changed very often. {tub}Picture a hot tub, shared with half the town. {joke}Feeling clean yet?",
      sfx: [['pop', 'why'], ['pop', 'water'], ['boing', 'tub', 0.3], ['wahwah', 'joke', 0.3]],
      draw(k) {
        baths(k, '#7a9a5a');
        k.text('SHARED HOT TUB', 540, 260, { size: 100, font: 'title', color: P.red, fx: 'pop', p: k.at('tub', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        note(k, 'water not changed often', 540, 400, 'water', { size: 56, fx: 'pop' });
        for (let i = 0; i < 5; i++) k.char(300 + i * 120, G + 40, 220, { ...(i % 2 ? ROMANW : ROMAN), face: 'happy', shadow: false, p: k.at(k.cue('tub', i * 0.15), 0.4) });
        k.text('feeling clean yet?', 540, 700, { size: 76, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}How did people really stay clean? The full story is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Stay Clean Without Soap?', channel: 'Long Story Drawn', tail: 1.0 }),
  ],
};
