// Shorts — This orangutan treated his own wound (→ Ep 6, 023). Laumer et al. 2024 (Scientific Reports): Rakus, male Sumatran orangutan,
//  Suaq Balimbing, Gunung Leuser NP, June 2022: chewed Akar Kuning (Fibraurea tinctoria) leaves, applied the juice to a facial wound, then covered it with the chewed leaves;
//  plant has antibacterial/anti-inflammatory properties; wound closed within days, healed within about a month, no infection seen. First such report in a wild animal.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, SCI, flat, paper, night, stars, note, card, lying, zzz, glow, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
function jungle(k) { flat(k, '#a8d8b0', '#5f7f3e', G); for (const [x, s] of [[120, 520], [960, 560], [560, 380]]) k.prop('tree', x, G - 160 - s * 0.42, s, { fill: '#3f7a3a' }); }
export default {
  meta: shortMeta({
    title: 'This Orangutan Treated His Own Wound 🦧 #shorts',
    description: 'In Sumatra, a wild orangutan named Rakus chewed a medicinal plant and covered his face wound with it. A month later, it had healed.',
    tags: ['orangutan heals wound', 'rakus orangutan', 'animals use medicine', 'zoopharmacognosy', 'orangutan facts'],
    long: 'How Did Ancient Humans Survive Without Doctors?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}This wild orangutan treated his own wound, with medicine. {real}And scientists watched him do it.",
      sfx: [['pop', 'q'], ['ding', 'real', 0.4]],
      draw(k) {
        jungle(k);
        hook(k, 'ORANGUTAN', 'DOCTOR?!', { s1: 120, s2: 150 });
        k.prop('orangutan', 540, 900, 560, { wound: true });
      },
    },
    {
      say: "{rakus}In 2022, in a rainforest in Sumatra, researchers saw a male orangutan named Rakus with a fresh wound on his face. {chew}He chewed the leaves of a climbing plant that local people use as medicine. {juice}He dabbed the juice onto the wound, again and again. {cover}Then he covered the whole wound with the chewed leaves.",
      sfx: [['pop', 'rakus'], ['pop', 'chew'], ['pop', 'juice'], ['pop', 'cover']],
      draw(k) {
        jungle(k);
        card(k, 540, 220, ['LAUMER ET AL., 2024', 'Scientific Reports · Sumatra'], 'rakus', { w: 760 });
        k.prop('orangutan', 540, 780, 460, { wound: k.t < k.cue('cover'), leaves: k.t > k.cue('chew') });
        const steps = [['chew', '1. chew the leaves'], ['juice', '2. apply the juice'], ['cover', '3. cover the wound']];
        steps.forEach(([c, t], i) => note(k, t, 540, 1120 + i * 75, c, { size: 54, fx: 'pop' }));
      },
    },
    {
      say: "{plant}That plant has known antibacterial and anti-inflammatory properties. {days}The wound closed within days. {month}About a month later, it had healed, {scar}with just a faint scar. {q}Did he learn it, or work it out himself? Nobody knows yet.",
      sfx: [['pop', 'plant'], ['ding', 'days', 0.4], ['tada', 'month', 0.4], ['drumroll', 'q', 0.3]],
      draw(k) {
        jungle(k);
        k.text('HEALED ✓', 540, 260, { size: 130, font: 'title', color: P.grass, fx: 'pop', p: k.at('month', 0.4), outline: '#fffaf0', outlineWidth: 16 });
        note(k, 'antibacterial · anti-inflammatory', 540, 400, 'plant', { size: 48 });
        k.prop('orangutan', 540, 860, 520, { wound: k.t < k.cue('days') });
        k.icon('question', 860, 600, 160, { p: k.at('q', 0.5), stroke: P.red });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}The full story of how your ancestors survived without doctors is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Survive Without Doctors?', channel: 'Long Story Drawn', tail: 1.2 }),
  ],
};
