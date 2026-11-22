// Shorts — No word for insomnia (→ Ep 1, 011). Siegel et al. 2015 (Current Biology): Hadza, San, Tsimane — 5.7–7.1 h sleep; chronic insomnia rare,
//  San and Tsimane have no word for it; sleep onset as temperature falls, wake near the coldest point of the night. CDC: ~1 in 3 US adults < 7 h.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, SCI, flat, paper, night, stars, note, card, lying, zzz, glow, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const SAN = ANC({ skin: '#b07a4a', hair: 'short' });
const ME = { ...YOU, hat: undefined, color: '#7a8bb0' };
export default {
  meta: shortMeta({
    title: 'Some Languages Have No Word for Insomnia 😴 #shorts',
    description: 'Scientists tracked the sleep of three hunter-gatherer groups. Insomnia was so rare that two of them don\'t even have a word for it.',
    tags: ['insomnia', 'no word for insomnia', 'hunter gatherer sleep', 'jerome siegel sleep study', 'how to sleep better'],
    long: 'How Did Ancient Humans Actually Sleep?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}Some languages have no word for insomnia. {why}Here's why.",
      sfx: [['pop', 'q'], ['ding', 'why', 0.4]],
      draw(k) {
        flat(k, P.indigo, '#2b3152', G);
        stars(k, 30, 700);
        hook(k, 'NO WORD FOR', 'INSOMNIA', { s1: 100, s2: 140, c2: P.yellow, c1: '#fffaf0', o1: P.ink });
        k.prop('moon', 840, 620, 200);
        lying(k, 700, 1080, 320, SAN, {});
        zzz(k, 380, 920, 'q', 1.2);
      },
    },
    {
      say: "{siegel}In 2015, Jerome Siegel's team tracked the sleep of three groups who live without electricity: {groups}the Hadza in Tanzania, the San in Namibia, and the Tsimane in Bolivia. {hours}They slept about six to seven hours a night, {less}not more than you. {rare}But chronic insomnia was rare. {word}The San and the Tsimane don't even have a word for it.",
      sfx: [['pop', 'siegel'], ['pop', 'groups'], ['pop', 'hours'], ['boing', 'less', 0.3], ['ding', 'rare', 0.4], ['tada', 'word', 0.4]],
      draw(k) {
        paper(k);
        card(k, 540, 220, ['SIEGEL ET AL., 2015', 'Current Biology'], 'siegel', { w: 640 });
        const g = ['Hadza · Tanzania', 'San · Namibia', 'Tsimane · Bolivia'];
        g.forEach((t, i) => note(k, t, 540, 400 + i * 80, k.cue('groups', i * 0.8), { size: 52, fx: 'pop' }));
        k.text('5.7–7.1 HOURS', 540, 720, { size: 100, font: 'title', color: P.orange, fx: 'pop', p: k.at('hours', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.text('insomnia: rare', 540, 880, { size: 76, font: 'title', color: P.grass, fx: 'pop', p: k.at('rare', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.text('"insomnia" = ?', 540, 1020, { size: 76, font: 'title', color: P.red, fx: 'pop', p: k.at('word', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{temp}One clue: they fell asleep as the night got cooler, {cold}and woke up near the coldest part of the night. {you}No screens. No heating. No alarm. {try}So if you can't sleep, try a cooler, darker bedroom. {old}Your body may be waiting for an ancient signal.",
      sfx: [['pop', 'temp'], ['pop', 'cold'], ['pop', 'you'], ['ding', 'try', 0.4], ['sparkle', 'old', 0.4]],
      draw(k) {
        flat(k, P.indigo, '#2b3152', G);
        stars(k, 30, 700);
        k.prop('thermo', 240, 560, 260, { level: 1 - k.at('temp', 3) * 0.7 });
        note(k, 'cooler → sleep', 240, 760, 'temp', { size: 50, color: '#9fd3ff', outline: P.ink, fx: 'pop' });
        lying(k, 760, 1100, 340, ME, { face: k.t > k.cue('old') ? 'sleep' : 'calm' });
        k.text('COOL · DARK · QUIET', 620, 300, { size: 72, font: 'title', color: P.yellow, fx: 'pop', p: k.at('try', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}The full story of how your ancestors really slept is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Actually Sleep?', channel: 'Long Story Drawn', tail: 1.2 }),
  ],
};
