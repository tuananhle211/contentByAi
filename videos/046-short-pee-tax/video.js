// Shorts — Rome taxed pee (→ Ep 7, 031). Fullers (fullonicae) cleaned wool with stale urine (ammonia); urine collected from public urinals/jars;
//  Vespasian (AD 69–79) taxed the urine trade; Suetonius, Vesp. 23: Titus objected, Vespasian held a coin to his nose — "pecunia non olet" (money doesn't stink).
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, flat, paper, night, stars, note, card, glow, redX, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const DARK = { c1: '#fffaf0', o1: P.ink };
const ROMAN = { body: 'man', outfit: 'robe', color: '#f5f1e6', color2: '#b03a2e', hair: 'short', hairColor: '#3a2a1e', skin: '#e0b48a' };
const VESP = { body: 'big', outfit: 'robe', color: '#7a3a8a', color2: P.yellow, hair: 'bald', skin: '#e0b48a', hat: 'crown' };
const TITUS = { ...ROMAN, color: '#a090c0', color2: P.yellow };
export default {
  meta: shortMeta({
    title: 'Ancient Rome Had a Tax on Pee 💰 #shorts',
    description: 'Roman laundries washed clothes in stale urine — and Emperor Vespasian taxed it. When his son complained, he held up a coin: money doesn\'t stink.',
    tags: ['roman urine tax', 'pecunia non olet', 'vespasian', 'money doesn\'t stink', 'ancient rome facts', 'weird history'],
    long: 'How Did Ancient Humans Stay Clean Without Soap?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}Ancient Rome had a tax on pee. {why}And it made perfect sense.",
      sfx: [['pop', 'q'], ['ding', 'why', 0.4]],
      draw(k) {
        paper(k, '#efe2c8');
        hook(k, 'ROME TAXED', 'PEE 💰', { s1: 110, s2: 160 });
        for (let i = 0; i < 3; i++) k.prop('pot', 260 + i * 280, 760, 240, { fill: '#d8c060' });
        k.icon('coin', 540, 1050, 200, { p: k.at('why', 0.5) });
      },
    },
    {
      say: "{laundry}Roman laundries cleaned wool with stale urine. {amm}Old urine releases ammonia, which breaks down grease. {jars}Jars were set out in the streets to collect it. {biz}It was a business. {tax}So the emperor Vespasian taxed it.",
      sfx: [['pop', 'laundry'], ['ding', 'amm', 0.4], ['pop', 'jars'], ['cash', 'biz', 0.4], ['cash', 'tax', 0.4]],
      draw(k) {
        paper(k, '#efe2c8');
        k.text('ROMAN LAUNDRY', 540, 200, { size: 96, font: 'title', color: P.brown, fx: 'pop', p: k.at('laundry', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        note(k, 'stale urine → AMMONIA', 540, 330, 'amm', { size: 58, color: P.indigo, fx: 'pop' });
        for (let i = 0; i < 3; i++) k.prop('pot', 220 + i * 160, 620, 150, { fill: '#d8c060', p: k.at(k.cue('jars', i * 0.2), 0.4) });
        k.char(820, G + 20, 520, { ...VESP, face: 'smug', pose: k.t > k.cue('tax') ? 'present' : 'stand', p: k.at('tax', 0.5) });
        k.text('TAXED ✓', 400, 960, { size: 110, font: 'title', color: P.red, fx: 'pop', p: k.at('tax', 0.4), outline: '#fffaf0', outlineWidth: 14 });
      },
    },
    {
      say: "{titus}His son Titus thought it was disgusting. {coin}So Vespasian held a coin up to his nose, and asked if it smelled. {olet}Pecunia non olet. {means}Money doesn't stink.",
      sfx: [['wahwah', 'titus', 0.3], ['ding', 'coin', 0.4], ['tada', 'olet', 0.4]],
      draw(k) {
        paper(k, '#efe2c8');
        k.char(300, G + 20, 520, { ...VESP, face: 'smug', pose: 'present' });
        k.char(800, G + 20, 480, { ...TITUS, face: k.t > k.cue('coin') ? 'shock' : 'angry', flip: true, p: k.at('titus', 0.5) });
        k.icon('coin', 560, 780, 130, { p: k.at('coin', 0.5) });
        k.text('"PECUNIA NON OLET"', 540, 240, { size: 84, font: 'title', color: P.red, fx: 'pop', p: k.at('olet', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.text("money doesn't stink", 540, 370, { size: 70, font: 'title', color: P.ink, fx: 'pop', p: k.at('means', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}How else did people stay clean without soap? The full story is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Stay Clean Without Soap?', channel: 'Long Story Drawn', tail: 1.0 }),
  ],
};
