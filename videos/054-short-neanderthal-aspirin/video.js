// Shorts — A Neanderthal may have used natural painkillers (→ Ep 6, 023). Weyrich et al. 2017 (Nature): El Sidrón young male with dental abscess + gut parasite;
//  calculus DNA of poplar (bark has salicylic acid) and Penicillium. Self-medication is the authors' interpretation, not proven — say "may have".
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, flat, paper, night, stars, note, card, glow, redX, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const DARK = { c1: '#fffaf0', o1: P.ink };
const NEAN = { body: 'big', outfit: 'bare', color: '#8a6a4a', color2: '#5a4030', hair: 'long', hairColor: '#5a3a24', beard: true, beardColor: '#5a3a24', skin: '#d9a77c' };
export default {
  meta: shortMeta({
    title: 'A Neanderthal Had a Toothache. Then He Chewed Painkiller Bark? 💊 #shorts',
    description: 'DNA in a Neanderthal\'s dental plaque revealed a tooth abscess, a gut parasite — and traces of poplar bark, a natural source of an aspirin-like painkiller.',
    tags: ['neanderthal medicine', 'neanderthal aspirin', 'el sidron', 'dental calculus dna', 'neanderthal facts'],
    long: 'How Did Ancient Humans Survive Without Doctors?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}Fifty thousand years ago, a Neanderthal with a toothache may have taken natural aspirin.",
      sfx: [['pop', 'q']],
      draw(k) {
        flat(k, P.orange, '#b89a70', G);
        hook(k, 'NEANDERTHAL', 'ASPIRIN? 💊', { s1: 120, s2: 140 });
        k.char(360, G + 20, 560, { ...NEAN, face: 'sad' });
        k.prop('tooth', 800, 720, 240, { cavity: true });
      },
    },
    {
      say: "{plaque}Scientists read ancient DNA from the hardened plaque on his teeth, from El Sidrón cave in Spain. {abscess}He had a painful tooth abscess, {gut}and a gut parasite that causes diarrhea. {joke}Rough week.",
      sfx: [['pop', 'plaque'], ['bonk', 'abscess', 0.3], ['wahwah', 'gut', 0.3], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        card(k, 540, 220, ['WEYRICH ET AL., 2017', 'Nature · El Sidrón, Spain'], 'plaque', { w: 760 });
        k.prop('tooth', 300, 560, 280, { cavity: true, p: k.at('abscess', 0.5) });
        note(k, 'abscess', 300, 760, 'abscess', { size: 60, color: P.red, fx: 'pop' });
        k.icon('cross', 780, 560, 200, { p: k.at('gut', 0.5), stroke: P.brown });
        note(k, 'gut parasite', 780, 760, 'gut', { size: 60, color: P.brown, fx: 'pop' });
        k.text('rough week.', 540, 980, { size: 90, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{poplar}But his plaque also held DNA from poplar. {bark}Poplar bark contains salicylic acid, a natural painkiller related to aspirin. {mold}And from Penicillium mold. {maybe}Was he treating himself? {prove}The researchers think it's possible. It's hard to prove.",
      sfx: [['ding', 'poplar', 0.4], ['sparkle', 'bark', 0.4], ['pop', 'mold'], ['drumroll', 'maybe', 0.3], ['boing', 'prove', 0.3]],
      draw(k) {
        paper(k);
        k.prop('tree', 300, 560, 320, { fill: '#7ab55a', p: k.at('poplar', 0.5) });
        note(k, 'POPLAR', 300, 780, 'poplar', { size: 64, color: P.grass, fx: 'pop' });
        note(k, '≈ aspirin', 300, 860, 'bark', { size: 56, fx: 'pop' });
        k.circle(780, 520, 120, { fill: '#9ab87a', fillStyle: 'solid', width: 5, p: k.at('mold', 0.5), seed: 4600 });
        note(k, 'PENICILLIUM', 780, 700, 'mold', { size: 56, color: P.indigo, fx: 'pop' });
        k.text('self-medicating?', 540, 1040, { size: 90, font: 'title', color: P.red, fx: 'pop', p: k.at('maybe', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        note(k, '(possible — hard to prove)', 540, 1150, 'prove', { size: 50, color: '#6b5f55' });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}How did your ancestors survive without doctors? The full story is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Survive Without Doctors?', channel: 'Long Story Drawn', tail: 1.0 }),
  ],
};
