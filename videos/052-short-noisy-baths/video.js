// Shorts — Seneca lived above a Roman bathhouse (→ Ep 7, 031). Seneca, Moral Letters 56: grunting weightlifters, the slap of the masseur,
//  people who love their own voice in the bath, the hair-plucker shrieking for customers and silent only while making someone else shriek.
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
export default {
  meta: shortMeta({
    title: 'A Roman Philosopher Lived Above a Gym. He Was Not Happy. 😤 #shorts',
    description: 'Seneca lived right above a Roman bathhouse — and wrote a letter complaining about the grunting, the slapping, the singing, and the hair-plucker.',
    tags: ['seneca letter 56', 'roman baths', 'ancient rome funny', 'seneca', 'stoicism funny'],
    long: 'How Did Ancient Humans Stay Clean Without Soap?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}Two thousand years ago, a Roman philosopher lived above a gym. {mad}He was not happy about it.",
      sfx: [['pop', 'q'], ['bonk', 'mad', 0.3]],
      draw(k) {
        baths(k);
        hook(k, 'LIVING ABOVE', 'A ROMAN GYM 😤', { s1: 100, s2: 104 });
        k.char(540, G + 20, 560, { ...ROMAN, color: '#a0a0b0', face: k.t > k.cue('mad') ? 'angry' : 'blank' });
      },
    },
    {
      say: "{seneca}Seneca lived right above a bathhouse, and wrote a letter about the noise. {grunt}Men grunting as they lifted weights. {slap}The slap of the masseur's hands. {sing}People who loved the sound of their own voice in the bath.",
      sfx: [['pop', 'seneca'], ['boing', 'grunt', 0.3], ['bonk', 'slap', 0.3], ['wahwah', 'sing', 0.3]],
      draw(k) {
        baths(k);
        card(k, 540, 220, ['SENECA · LETTER 56', '"I live right above a bath"'], 'seneca', { w: 760 });
        const s = [['grunt', 'HNNNGH!', 300, 450], ['slap', 'SLAP! SLAP!', 760, 560], ['sing', 'La la laaa ♪', 420, 700]];
        s.forEach(([c, t, x, y]) => k.text(t, x, y, { size: 84, font: 'title', color: P.red, fx: 'pop', p: k.at(c, 0.4), outline: '#fffaf0', outlineWidth: 12 }));
        k.char(300, G + 20, 400, { ...ROMAN, color: '#d9d4cb', face: 'shout', pose: 'cheer', p: k.at('grunt', 0.5) });
        k.char(780, G + 20, 400, { ...ROMAN, color: '#c9d3e8', face: 'laugh', pose: 'shout', p: k.at('sing', 0.5) });
      },
    },
    {
      say: "{worst}But the worst? {pluck}The hair-plucker, shrieking for customers. {silent}He was only quiet, Seneca wrote, when he was making someone else shriek. {gym}Two thousand years later, gyms haven't changed much.",
      sfx: [['drumroll', 'worst', 0.3], ['pop', 'pluck'], ['boing', 'silent', 0.3], ['tada', 'gym', 0.4]],
      draw(k) {
        baths(k);
        k.text('THE HAIR-PLUCKER', 540, 240, { size: 90, font: 'title', color: P.red, fx: 'pop', p: k.at('pluck', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.text('"PLUCK! PLUCK!"', 540, 380, { size: 80, font: 'title', color: P.orange, fx: 'pop', p: k.at('pluck', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.char(320, G + 20, 440, { ...ROMAN, color: '#e0c070', face: 'shout', pose: 'shout' });
        k.char(760, G + 20, 440, { ...ROMAN, face: k.t > k.cue('silent') ? 'shock' : 'blank', flip: true, p: k.at('silent', 0.5) });
        k.text('…AAAH!', 760, 640, { size: 84, font: 'title', color: P.red, fx: 'pop', p: k.at('silent', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}The full story of how people stayed clean without soap is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Stay Clean Without Soap?', channel: 'Long Story Drawn', tail: 1.0 }),
  ],
};
