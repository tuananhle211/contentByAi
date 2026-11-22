// Shorts — The most hands-on dads ever studied (→ Ep 5, 021). Hewlett, Intimate Fathers (1991): Aka fathers hold or are within arm's reach of infants ~47%
//  of the time in camp; hold young infants during the day ≥5× more than fathers in other populations; whole families net-hunt together; explanation: husband–wife closeness.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, SCI, flat, paper, night, stars, note, card, lying, zzz, glow, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const AKA = ANC({ hair: 'short', color: '#6b4a33', color2: P.yellow, skin: '#8a5a3a' });
const AKAW = ANCW({ color: '#7a5432', color2: P.orange, skin: '#8a5a3a', hair: 'short' });
function carry(k, x, y, h, pr, o = {}) { k.char(x, y, h, { ...pr, pose: 'hold', ...o }); k.prop('baby', x + h * 0.03, y - h * 0.5, h * 0.3, { skin: pr.skin, awake: o.awake }); }
function forest(k) { flat(k, '#bfe0c4', '#6d8b47', G); for (const [x, s] of [[80, 520], [1000, 560], [540, 400]]) k.prop('tree', x, G - 160 - s * 0.42, s, { fill: '#3f7a3a' }); }
export default {
  meta: shortMeta({
    title: 'The Most Hands-On Dads Ever Studied 👶 #shorts',
    description: 'Among the Aka of Central Africa, fathers are within arm\'s reach of their babies about half the time — more infant care than in any other society measured.',
    tags: ['best dads in the world', 'aka fathers', 'aka pygmy fathers', 'hands on dad', 'barry hewlett'],
    long: 'How Did Ancient Humans Raise Kids?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}Meet the most hands-on dads ever studied. {where}They live in the rainforests of Central Africa.",
      sfx: [['pop', 'q'], ['sparkle', 'where', 0.4]],
      draw(k) {
        forest(k);
        hook(k, 'BEST DADS', 'EVER?', { s1: 120, s2: 150 });
        carry(k, 540, G + 20, 620, AKA, { face: 'happy', awake: true });
      },
    },
    {
      say: "{aka}They're the Aka, forest foragers who hunt with nets. {hew}Anthropologist Barry Hewlett spent years timing who held the babies. {half}In camp, Aka fathers are holding their babies, or within arm's reach, about half the time. {five}They hold young babies at least five times more than fathers in other groups.",
      sfx: [['pop', 'aka'], ['scratch', 'hew', 0.3], ['tada', 'half', 0.4], ['pop', 'five']],
      draw(k) {
        forest(k);
        card(k, 540, 220, ['BARRY HEWLETT', '"Intimate Fathers" · 1991'], 'hew', { w: 700 });
        carry(k, 400, G + 20, 500, AKA, { face: 'happy', awake: true });
        const p = k.at('half', 0.6);
        k.ellipse(400, G - 230, 560 * p, 560 * p, { stroke: P.yellow, width: 8, seed: 3800, p });
        k.text('~HALF THE TIME', 540, 420, { size: 92, font: 'title', color: P.red, fx: 'pop', p: k.at('half', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.text('5× MORE', 820, 600, { size: 90, font: 'title', color: P.orange, fx: 'pop', p: k.at('five', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{why}Why? {close}Hewlett's answer: closeness. {hunt}Aka husbands and wives hunt together, cook together, and rest together. {near}When dad is always nearby, holding the baby is just normal. {medal}Nobody gives him a medal for it.",
      sfx: [['pop', 'why'], ['ding', 'close', 0.4], ['pop', 'hunt'], ['pop', 'near'], ['boing', 'medal', 0.3]],
      draw(k) {
        forest(k);
        k.text('CLOSENESS', 540, 240, { size: 120, font: 'title', color: P.red, fx: 'pop', p: k.at('close', 0.4), outline: '#fffaf0', outlineWidth: 16 });
        k.prop('net', 540, 470, 260, { p: k.at('hunt', 0.5) });
        k.char(300, G + 20, 440, { ...AKAW, face: 'happy', pose: 'present', p: k.at('hunt', 0.5) });
        carry(k, 740, G + 20, 460, AKA, { face: k.t > k.cue('medal') ? 'smug' : 'happy', flip: true });
        k.text('(no medal)', 540, 680, { size: 70, font: 'title', color: P.ink, fx: 'pop', p: k.at('medal', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}The full story of how your ancestors raised kids is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Raise Kids?', channel: 'Long Story Drawn', tail: 1.2 }),
  ],
};
