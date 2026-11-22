// Shorts — Neanderthal injuries matched rodeo riders (→ Ep 6, 023). Berger & Trinkaus 1995 (J. Archaeological Science): Neanderthal trauma pattern, lots of
//  head/neck injuries, closest to North American rodeo performers. Later work (2017, Science News report) found a better match: water-tubing falls and table run-ins;
//  Trinkaus himself later said the rodeo idea has been superseded.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, flat, paper, night, stars, note, card, glow, redX, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const DARK = { c1: '#fffaf0', o1: P.ink };
const NEAN = { body: 'big', outfit: 'bare', color: '#8a6a4a', color2: '#5a4030', hair: 'long', hairColor: '#5a3a24', beard: true, beardColor: '#5a3a24', skin: '#d9a77c' };
export default {
  meta: shortMeta({
    title: 'Neanderthal Injuries Matched Rodeo Riders 🤠 #shorts',
    description: 'Scientists compared Neanderthal injuries with modern people. The closest match: rodeo riders. Then a later study found an even funnier one.',
    tags: ['neanderthal injuries', 'neanderthal rodeo riders', 'trinkaus', 'neanderthal facts', 'human evolution funny'],
    long: 'How Did Ancient Humans Survive Without Doctors?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}Neanderthal injuries look a lot like rodeo riders'. {wait}And then it gets weirder.",
      sfx: [['pop', 'q'], ['boing', 'wait', 0.3]],
      draw(k) {
        flat(k, P.orange, '#b89a70', G);
        hook(k, 'NEANDERTHAL =', 'RODEO RIDER?', { s1: 96, s2: 120 });
        k.char(380, G + 20, 560, { ...NEAN, face: 'smug', prop: 'staff' });
        k.prop('horse', 800, 860, 340, { rotate: -0.3 });
      },
    },
    {
      say: "{skel}Neanderthal skeletons are full of healed injuries, {head}especially to the head and neck. {study}In 1995, Thomas Berger and Erik Trinkaus compared them to modern groups. {match}The closest match? Rodeo riders. {life}Life was a contact sport.",
      sfx: [['pop', 'skel'], ['bonk', 'head', 0.3], ['pop', 'study'], ['tada', 'match', 0.4], ['bonk', 'life', 0.3]],
      draw(k) {
        paper(k);
        card(k, 540, 220, ['BERGER & TRINKAUS, 1995', 'Journal of Archaeological Science'], 'study', { w: 860 });
        for (let i = 0; i < 6; i++) k.prop('bone', 240 + (i % 3) * 300, 480 + Math.floor(i / 3) * 120, 200, { p: k.at(k.cue('skel', i * 0.15), 0.4), rotate: (i - 3) * 0.15 });
        note(k, 'head & neck injuries', 540, 760, 'head', { size: 60, color: P.red, fx: 'pop' });
        k.text('RODEO RIDERS 🤠', 540, 920, { size: 100, font: 'title', color: P.orange, fx: 'pop', p: k.at('match', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.text('a contact sport', 540, 1080, { size: 64, font: 'title', color: P.ink, fx: 'pop', p: k.at('life', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{later}But a later study found an even better match. {tube}People who fall off inflatable river tubes. {table}And people who walk into tables. {so}So maybe Neanderthals weren't riding bulls. {joke}Maybe they were just clumsy.",
      sfx: [['drumroll', 'later', 0.3], ['boing', 'tube', 0.3], ['bonk', 'table', 0.3], ['pop', 'so'], ['wahwah', 'joke', 0.3]],
      draw(k) {
        paper(k);
        k.text('BETTER MATCH:', 540, 220, { size: 96, font: 'title', color: P.ink, fx: 'pop', p: k.at('later', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.ellipse(300, 520, 300, 120, { fill: P.yellow, fillStyle: 'solid', width: 5, p: k.at('tube', 0.5), seed: 4200 });
        note(k, 'river tubing falls', 300, 640, 'tube', { size: 54, color: P.indigo, fx: 'pop' });
        k.rect(640, 470, 300, 30, { fill: P.brown, fillStyle: 'solid', width: 5, p: k.at('table', 0.5), seed: 4201 });
        for (const x of [660, 900]) k.line(x, 500, x, 600, { stroke: P.brown, width: 12, p: k.at('table', 0.5), seed: 4202 + x });
        note(k, 'walking into tables', 790, 680, 'table', { size: 54, color: P.indigo, fx: 'pop' });
        k.char(540, G + 20, 360, { ...NEAN, face: k.t > k.cue('joke') ? 'shock' : 'smug', p: k.at('so', 0.5) });
        k.text('…just clumsy?', 540, 800, { size: 80, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}How did your ancestors survive without doctors? The full story is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Survive Without Doctors?', channel: 'Long Story Drawn', tail: 1.0 }),
  ],
};
