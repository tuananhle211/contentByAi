// Shorts — The oldest known surgery, 31,000 years ago (→ Ep 6, 023). Maloney et al. 2022 (Nature): Liang Tebo, East Kalimantan, Borneo — young adult (~19–20),
//  distal third of left lower leg surgically amputated, probably in childhood; survived 6–9 more years; ≥31,000 years ago; previous oldest ~7,000 years (France).
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, SCI, flat, paper, night, stars, note, card, lying, zzz, glow, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const KIDB = { ...KID, skin: '#9a6b42' };
const ADB = ANC({ hair: 'short', skin: '#9a6b42', color: '#6b4a33' });
function karst(k) { flat(k, '#bfe0c4', '#5f7f3e', G); k.prop('mountain', 300, G - 300, 640, { fill: '#9a9a8a' }); k.prop('mountain', 860, G - 260, 560, { fill: '#a8a898' }); }
export default {
  meta: shortMeta({
    title: 'The Oldest Surgery Ever Found: 31,000 Years Ago 🦴 #shorts',
    description: 'In a cave in Borneo, archaeologists found a skeleton whose lower leg had been cut off on purpose — at least 31,000 years ago. And the patient survived.',
    tags: ['oldest surgery', 'oldest amputation', 'borneo amputation', 'liang tebo', 'prehistoric surgery', 'stone age surgery'],
    long: 'How Did Ancient Humans Survive Without Doctors?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}Thirty-one thousand years ago, someone in Borneo performed surgery. {lived}And the patient lived.",
      sfx: [['pop', 'q'], ['tada', 'lived', 0.4]],
      draw(k) {
        karst(k);
        hook(k, 'SURGERY', '31,000 YRS AGO', { s1: 130, s2: 110 });
        k.prop('cave', 540, 900, 640);
        k.char(560, G + 20, 340, { ...KIDB, face: 'happy', prop: 'staff', p: k.at('lived', 0.5) });
      },
    },
    {
      say: "{dig}In Liang Tebo cave, archaeologists found the skeleton of a young adult. {leg}The bottom of the left leg was missing. {cut}And the bone had been cut cleanly, on purpose. {heal}Then it had healed over.",
      sfx: [['scratch', 'dig', 0.3], ['bonk', 'leg', 0.3], ['ding', 'cut', 0.4], ['sparkle', 'heal', 0.4]],
      draw(k) {
        paper(k, '#efe2c8');
        card(k, 540, 220, ['LIANG TEBO · BORNEO', 'Maloney et al. · Nature, 2022'], 'dig', { w: 760 });
        k.prop('bone', 540, 620, 600, { cut: true, p: k.at('leg', 0.5) });
        k.circle(770, 620, 110, { stroke: P.red, width: 8, p: k.at('cut', 0.6), seed: 3900 });
        note(k, 'clean cut', 770, 790, 'cut', { size: 60, color: P.red, fx: 'pop' });
        k.text('HEALED ✓', 540, 1000, { size: 110, font: 'title', color: P.grass, fx: 'pop', p: k.at('heal', 0.4), outline: '#fffaf0', outlineWidth: 14 });
      },
    },
    {
      say: "{child}This person lost the leg as a child, {years}and lived another six to nine years, in steep jungle mountains. {care}Someone must have looked after them. {record}The previous oldest amputation? Just seven thousand years old.",
      sfx: [['pop', 'child'], ['tada', 'years', 0.4], ['ding', 'care', 0.4], ['boing', 'record', 0.3]],
      draw(k) {
        karst(k);
        k.char(300, G + 20, 300, { ...KIDB, face: 'happy', prop: 'staff', p: k.at('child', 0.5) });
        k.char(760, G + 20, 460, { ...ADB, face: 'happy', prop: 'staff', p: k.at('years', 0.5) });
        k.text('+ 6–9 YEARS', 540, 260, { size: 110, font: 'title', color: P.orange, fx: 'pop', p: k.at('years', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.text('someone cared', 540, 400, { size: 70, font: 'title', color: P.grass, fx: 'pop', p: k.at('care', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.text('old record: 7,000 yrs', 540, 520, { size: 60, font: 'title', color: P.ink, fx: 'pop', p: k.at('record', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}The full story of how your ancestors survived without doctors is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Survive Without Doctors?', channel: 'Long Story Drawn', tail: 1.2 }),
  ],
};
