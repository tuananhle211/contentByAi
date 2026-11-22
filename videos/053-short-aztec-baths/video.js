// Shorts — Aztecs bathed daily while Europeans avoided water (→ Ep 7, 031). Spanish accounts (Bernal Díaz etc.): Aztecs bathed often/daily, temazcalli steam baths,
//  Moctezuma reportedly bathed daily; soapberry fruit as soap. 16th-c. Europe: doctors feared hot water opened pores to disease; clean linen = cleanliness (Vigarello 1985).
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, flat, paper, night, stars, note, card, glow, redX, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const DARK = { c1: '#fffaf0', o1: P.ink };
const DOCT = { body: 'man', outfit: 'robe', color: '#2b2b33', color2: '#c9c4bb', hair: 'short', hairColor: '#5a4a3a', beard: true, beardColor: '#5a4a3a', skin: '#f0c8a0' };
const AZ = { body: 'man', outfit: 'tunic', color: '#ffffff', color2: '#2a8a8a', hair: 'short', hairColor: '#1b1b1b', hat: 'kingfeather', skin: '#b07a4a' };
export default {
  meta: shortMeta({
    title: 'Who Was Cleaner in 1520: Europeans or Aztecs? 🛁 #shorts',
    description: 'When Spanish visitors reached the Aztec capital, they were struck by how often people bathed. Back in Europe, doctors were warning people away from water.',
    tags: ['aztec hygiene', 'aztecs bathed daily', 'moctezuma', 'european hygiene history', 'temazcal', 'history facts'],
    long: 'How Did Ancient Humans Stay Clean Without Soap?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}In the fifteen-hundreds, who was cleaner, Europeans or Aztecs? {ans}It wasn't close.",
      sfx: [['pop', 'q'], ['ding', 'ans', 0.4]],
      draw(k) {
        paper(k);
        hook(k, 'EUROPE vs', 'AZTECS 🛁', { s1: 120, s2: 140 });
        k.char(280, G + 20, 500, { ...DOCT, face: 'smug' });
        k.char(800, G + 20, 500, { ...AZ, face: 'happy', flip: true });
        k.text('VS', 540, 900, { size: 110, font: 'title', color: P.red, outline: '#fffaf0', outlineWidth: 14, p: 1 });
      },
    },
    {
      say: "{eu}In Europe, many doctors warned that hot water opened your pores, and let disease in. {linen}So wealthy people cleaned themselves by changing into fresh white linen shirts. {same}Clean shirt. Same person.",
      sfx: [['pop', 'eu'], ['bonk', ['eu', 2], 0.3], ['sparkle', 'linen', 0.4], ['boing', 'same', 0.3]],
      draw(k) {
        paper(k);
        k.char(300, G + 20, 520, { ...DOCT, face: 'shock', pose: 'point', p: k.at('eu', 0.5) });
        k.bubble(340, 240, 640, 170, 380, 700, { p: k.at('eu', 0.4), text: 'Water opens your pores!', size: 46 });
        k.char(800, G + 20, 480, { body: 'man', outfit: 'tunic', color: '#ffffff', color2: '#d9d4cb', hair: 'short', hairColor: '#7a4a2a', skin: '#f0c8a0', face: 'smug', pose: 'present', p: k.at('linen', 0.5) });
        k.text('clean shirt. same person.', 540, 560, { size: 66, font: 'title', color: P.red, fx: 'pop', p: k.at('same', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{az}Meanwhile, Spanish visitors to the Aztec capital were struck by how often people there bathed. {daily}Many bathed daily. {steam}They had steam baths, {soap}and used soapberry fruit as soap. {joke}So who was calling who uncivilized?",
      sfx: [['whoosh', 'az', 0.4], ['pop', 'daily'], ['pop', 'steam'], ['sparkle', 'soap', 0.4], ['tada', 'joke', 0.4]],
      draw(k) {
        flat(k, P.sky, '#9a8a6a', G);
        k.char(300, G + 20, 520, { ...AZ, face: 'smug', p: k.at('az', 0.5) });
        k.text('BATHED DAILY', 540, 260, { size: 104, font: 'title', color: P.grass, fx: 'pop', p: k.at('daily', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.rect(640, G - 220, 340, 220, { fill: '#c9a07a', fillStyle: 'solid', width: 5, p: k.at('steam', 0.5), seed: 4500 });
        note(k, 'steam bath', 810, G - 260, 'steam', { size: 50, fx: 'pop' });
        k.prop('berries', 810, 620, 160, { p: k.at('soap', 0.5) });
        note(k, 'soapberry', 810, 740, 'soap', { size: 50, fx: 'pop' });
        k.text('"uncivilized"?', 540, 420, { size: 80, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}The full history of staying clean is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Stay Clean Without Soap?', channel: 'Long Story Drawn', tail: 1.0 }),
  ],
};
