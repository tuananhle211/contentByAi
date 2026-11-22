// Shorts — Someone was always awake (→ Ep 1, 011). Samson et al. 2017 (Proc. R. Soc. B): 33 Hadza adults, 20 nights;
//  everyone asleep at the same time for only 18 minutes in total. "Poorly sleeping grandparent" hypothesis (sentinel) — say "one idea".
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, SCI, flat, paper, night, stars, note, card, lying, zzz, glow, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const HADZA = ANC({ skin: '#9a6b42', hair: 'short' });
const GRAN = { ...ELDER, skin: '#9a6b42' };
export default {
  meta: shortMeta({
    title: 'Someone in the Camp Was Always Awake 🌙 #shorts',
    description: 'Researchers tracked the sleep of 33 Hadza hunter-gatherers for 20 nights. Everyone was asleep at the same time for just 18 minutes.',
    tags: ['hadza sleep study', 'why do old people wake up early', 'sentinel hypothesis', 'hunter gatherer sleep', 'evolution of sleep'],
    long: 'How Did Ancient Humans Actually Sleep?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}In one hunter-gatherer camp, over twenty nights, everyone was asleep at the same time for just eighteen minutes. {total}Eighteen minutes. In total.",
      sfx: [['pop', 'q'], ['bonk', 'total', 0.3]],
      draw(k) {
        flat(k, P.indigo, '#2b3152', G);
        stars(k, 30, 700);
        hook(k, 'EVERYONE ASLEEP:', '18 MINUTES', { s1: 84, s2: 140, c1: '#fffaf0', o1: P.ink });
        k.text('in 20 nights', 540, 500, { size: 64, font: 'title', color: '#d9d3e8', p: k.at('total', 0.5), outline: P.ink, outlineWidth: 10 });
        for (let i = 0; i < 4; i++) lying(k, 420 + (i % 2) * 440, 860 + Math.floor(i / 2) * 220, 260, HADZA, {});
        zzz(k, 300, 760, 'q', 1);
      },
    },
    {
      say: "{study}In 2017, David Samson and his team put sleep trackers on thirty-three Hadza adults in Tanzania. {shift}People went to bed and woke up at different times. {old}Older people tended to sleep earlier and wake earlier. {awake}So almost all night, somebody was awake.",
      sfx: [['pop', 'study'], ['pop', 'shift'], ['pop', 'old'], ['ding', 'awake', 0.4]],
      draw(k) {
        flat(k, P.indigo, '#2b3152', G);
        stars(k, 30, 700);
        card(k, 540, 220, ['SAMSON ET AL., 2017', '33 Hadza adults · 20 nights'], 'study', { w: 800 });
        for (let i = 0; i < 6; i++) {
          const y = 420 + i * 80, a = 0.1 + k.rand(i) * 0.3, b = a + 0.45 + k.rand(i + 5) * 0.2;
          k.rect(140 + a * 800, y, (b - a) * 800, 50, { fill: '#5a6b9a', fillStyle: 'solid', width: 3, p: k.at(k.cue('shift', i * 0.15), 0.4), seed: 3300 + i });
        }
        note(k, 'everyone sleeps on a different schedule', 540, 900, 'shift', { size: 44, color: '#d9d3e8', outline: P.ink });
        k.char(950, G + 20, 240, { ...GRAN, face: 'happy', p: k.at('old', 0.5) });
        note(k, 'early to bed, early to rise', 480, 980, 'old', { size: 46, color: P.yellow, outline: P.ink, fx: 'pop' });
      },
    },
    {
      say: "{idea}One idea: that's a feature, not a bug. {guard}A group where someone's always awake is a group that's harder to sneak up on. {grandma}So if your grandparents wake at five a.m., {job}they may just be doing an ancient night shift.",
      sfx: [['ding', 'idea', 0.4], ['pop', 'guard'], ['pop', 'grandma'], ['tada', 'job', 0.4]],
      draw(k) {
        flat(k, P.indigo, '#2b3152', G);
        stars(k, 30, 700);
        k.prop('campfire', 540, G - 60, 260, { fire: 1 });
        glow(k, 540, G - 140, 600, 0.45);
        k.char(300, G + 20, 380, { ...GRAN, face: 'calm', p: k.at('idea', 0.5) });
        lying(k, 860, G, 260, HADZA, {});
        k.text('FEATURE, NOT A BUG', 540, 260, { size: 76, font: 'title', color: P.yellow, fx: 'pop', p: k.at('idea', 0.4), outline: P.ink, outlineWidth: 12 });
        k.text('the ancient night shift', 540, 420, { size: 64, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at('job', 0.4), outline: P.ink, outlineWidth: 10 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}The full story of how your ancestors really slept is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Actually Sleep?', channel: 'Long Story Drawn', tail: 1.2 }),
  ],
};
