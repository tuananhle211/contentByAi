// Shorts — The oldest bed ever found (→ Ep 1, 011). Wadley et al. 2020 (Science): Border Cave, South Africa — grass bedding ~200,000 years old, laid on ash
//  (likely to deter crawling insects). Wadley et al. 2011 (Science): Sibudu, ~77,000 years — bedding with Cape laurel leaves (insect-repelling chemicals); burned periodically.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, SCI, flat, paper, night, stars, note, card, lying, zzz, glow, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
export default {
  meta: shortMeta({
    title: 'The Oldest Bed Ever Found Is 200,000 Years Old 🛏️ #shorts',
    description: 'In a South African cave, archaeologists found grass bedding about 200,000 years old — laid on a layer of ash, probably to keep the bugs away.',
    tags: ['oldest bed', 'border cave', 'sibudu cave', 'prehistoric beds', 'how did cavemen sleep'],
    long: 'How Did Ancient Humans Actually Sleep?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}This is the oldest bed ever found. {age}It's about two hundred thousand years old.",
      sfx: [['pop', 'q'], ['tada', 'age', 0.4]],
      draw(k) {
        paper(k, '#efe2c8');
        hook(k, 'THE OLDEST BED', '200,000 YRS', { s1: 92, s2: 130 });
        k.prop('cave', 540, 820, 760);
        k.prop('grassbed', 540, 1040, 520, { ash: true });
      },
    },
    {
      say: "{border}At Border Cave in South Africa, archaeologists found layers of grass, {ash}laid on top of ash. {why}Why ash? {bugs}It probably kept crawling insects away. {smart}A Stone Age bug barrier.",
      sfx: [['pop', 'border'], ['pop', 'ash'], ['pop', 'why'], ['ding', 'bugs', 0.4], ['tada', 'smart', 0.3]],
      draw(k) {
        paper(k, '#efe2c8');
        card(k, 540, 220, ['BORDER CAVE · SOUTH AFRICA', 'Wadley et al. · Science, 2020'], 'border', { w: 860 });
        k.rect(140, 700, 800, 60, { fill: '#b9b3a8', fillStyle: 'solid', width: 4, p: k.at('ash', 0.5), seed: 3500 });
        note(k, '↑ ASH', 860, 820, 'ash', { size: 56, color: P.ink, fx: 'pop' });
        k.prop('grassbed', 540, 640, 620, { p: k.at('border', 0.6) });
        note(k, 'GRASS', 540, 520, 'border', { size: 56, color: P.grass, fx: 'pop' });
        k.text('NO BUGS ALLOWED', 540, 1000, { size: 84, font: 'title', color: P.red, fx: 'pop', p: k.at('bugs', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{sib}And at Sibudu Cave, about seventy-seven thousand years ago, people topped their beds with leaves from a tree whose chemicals repel insects. {burn}Then, every so often, they burned the old bedding and started fresh. {you}When did you last change your mattress?",
      sfx: [['pop', 'sib'], ['sparkle', ['sib', 3], 0.4], ['whoosh', 'burn', 0.4], ['boing', 'you', 0.3]],
      draw(k) {
        paper(k, '#efe2c8');
        card(k, 540, 220, ['SIBUDU CAVE · ~77,000 YEARS', 'Wadley et al. · Science, 2011'], 'sib', { w: 860 });
        k.prop('grassbed', 540, 620, 600, { leaves: true });
        note(k, 'bug-repelling leaves', 540, 470, k.cue('sib', 3), { size: 52, color: P.grass, fx: 'pop' });
        k.prop('campfire', 540, 860, 240, { fire: k.at('burn', 1), p: k.at('burn', 0.5) });
        k.char(860, G + 20, 340, { ...YOU, face: k.t > k.cue('you') ? 'shock' : 'calm', p: k.at('you', 0.5) });
        k.text('your mattress?', 420, 1120, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('you', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}The full story of how your ancestors really slept is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Actually Sleep?', channel: 'Long Story Drawn', tail: 1.2 }),
  ],
};
