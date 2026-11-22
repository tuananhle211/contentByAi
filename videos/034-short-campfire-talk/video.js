// Shorts — Why you talk differently at night (→ Ep 2, 012). Wiessner 2014 (PNAS) "Embers of society": Ju/'hoansi, Kalahari, 1970s recordings.
//  Day: ~34% complaints/criticism/gossip, ~31% economic matters, ~6% stories. Night firelight: ~81% stories. Her argument (stories build trust/networks).
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, SCI, flat, paper, night, stars, note, card, lying, zzz, glow, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const SAN = ANC({ skin: '#b07a4a', hair: 'short' });
const SANW = ANCW({ skin: '#b07a4a', hair: 'short' });
export default {
  meta: shortMeta({
    title: 'Why Campfire Talk Is Different 🔥 #shorts',
    description: 'An anthropologist recorded what hunter-gatherers talked about by day and by firelight. By day: work and complaints. At night: 81% stories.',
    tags: ['campfire stories', 'polly wiessner', 'why we tell stories', 'storytelling evolution', 'hunter gatherers'],
    long: 'How Fire Made You Human',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}Why do conversations change after dark? {rec}An anthropologist actually recorded it.",
      sfx: [['pop', 'q'], ['ding', 'rec', 0.4]],
      draw(k) {
        night(k, { moon: false });
        flat(k, 'rgba(0,0,0,0)', '#4a3f5e', G);
        hook(k, 'DAY TALK vs', 'NIGHT TALK', { s1: 96, s2: 130, c2: P.yellow, c1: '#fffaf0', o1: P.ink });
        k.prop('campfire', 540, G - 60, 300, { fire: 1 });
        glow(k, 540, G - 140, 620, 0.45);
        k.char(260, G + 30, 380, { ...SANW, face: 'happy' });
        k.char(820, G + 30, 380, { ...SAN, face: 'laugh', flip: true });
      },
    },
    {
      say: "{who}In the 1970s, Polly Wiessner recorded conversations among the San of the Kalahari. {day}By day, most talk was about work, {comp}and complaints, criticism and gossip. {stories}Stories? About six percent.",
      sfx: [['pop', 'who'], ['pop', 'day'], ['wahwah', 'comp', 0.3], ['bonk', 'stories', 0.3]],
      draw(k) {
        flat(k, P.sky, P.sand, G);
        k.dot(900, 180, 70, P.yellow);
        card(k, 540, 250, ['POLLY WIESSNER', 'PNAS · 2014'], 'who', { w: 640 });
        const bars = [['day', 'work & money', 31, P.orange], ['comp', 'complaints & gossip', 34, P.red], ['stories', 'stories', 6, P.grass]];
        bars.forEach(([c, t, v, col], i) => {
          const y = 460 + i * 150, p = k.at(c, 0.8);
          k.text(t, 120, y, { size: 44, font: 'title', align: 'left', color: P.ink, p: p > 0 ? 1 : 0 });
          k.rect(120, y + 30, 22 * v * p, 60, { fill: col, fillStyle: 'solid', width: 4, seed: 3410 + i });
          k.text(`${v}%`, 150 + 22 * v * p, y + 60, { size: 46, font: 'title', align: 'left', color: P.ink, p: p > 0.9 ? 1 : 0 });
        });
        k.text('DAYTIME', 540, 1000, { size: 90, font: 'title', color: P.brown, p: k.at('day', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{night}At night, by the fire? {pct}Eighty-one percent stories. {why}Wiessner argues those stories built trust, and taught people about friends and relatives far away. {you}Maybe that's why your best conversations still happen late at night.",
      sfx: [['whoosh', 'night', 0.4], ['tada', 'pct', 0.4], ['pop', 'why'], ['sparkle', 'you', 0.4]],
      draw(k) {
        night(k, { moon: false });
        flat(k, 'rgba(0,0,0,0)', '#4a3f5e', G);
        k.prop('campfire', 540, G - 60, 300, { fire: 1 });
        glow(k, 540, G - 140, 700, 0.45);
        k.char(260, G + 30, 380, { ...SANW, face: 'laugh' });
        k.char(820, G + 30, 380, { ...SAN, face: 'happy', flip: true, pose: 'present' });
        k.text('81% STORIES', 540, 300, { size: 120, font: 'title', color: P.yellow, fx: 'pop', p: k.at('pct', 0.4), outline: P.ink, outlineWidth: 16 });
        k.text('trust · far-away friends', 540, 450, { size: 56, font: 'title', color: '#d9d3e8', fx: 'fade', p: k.at('why', 0.5), outline: P.ink, outlineWidth: 10 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}The full story of how fire made you human is on the channel. Link below.", image: 'poster', title: 'How Fire Made You Human', channel: 'Long Story Drawn', tail: 1.2 }),
  ],
};
