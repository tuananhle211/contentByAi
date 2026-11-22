// Shorts — Egyptian tooth powder recipe (→ Ep 7, 031). 4th-century AD papyrus (Roman Egypt), Austrian National Library, Vienna:
//  rock salt, mint, dried iris flower, grains of pepper. Herodotus 2.37: priests shaved their whole bodies every other day.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, flat, paper, night, stars, note, card, glow, redX, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const DARK = { c1: '#fffaf0', o1: P.ink };
export default {
  meta: shortMeta({
    title: 'Ancient Egyptian Toothpaste Had Pepper in It 🪥 #shorts',
    description: 'A papyrus from Roman Egypt preserves a recipe for tooth powder: rock salt, mint, dried iris flowers, and pepper.',
    tags: ['ancient toothpaste', 'egyptian toothpaste recipe', 'history of toothpaste', 'ancient egypt facts', 'ancient hygiene'],
    long: 'How Did Ancient Humans Stay Clean Without Soap?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}This toothpaste recipe is about sixteen hundred years old. {pepper}And it has pepper in it.",
      sfx: [['pop', 'q'], ['boing', 'pepper', 0.3]],
      draw(k) {
        flat(k, '#f5d98a', P.sand, G);
        hook(k, 'ANCIENT', 'TOOTHPASTE', { s1: 120, s2: 130 });
        k.prop('scroll', 540, 760, 460);
        k.text('+ PEPPER?!', 540, 1100, { size: 90, font: 'title', color: P.red, fx: 'pop', p: k.at('pepper', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{pap}It's written on a papyrus from Roman Egypt, now in a library in Vienna. {mix}Mix together: {salt}rock salt, {mint}mint, {iris}dried iris flowers, {pep}and grains of pepper. {grind}Grind it into a powder, and rub it on your teeth.",
      sfx: [['pop', 'pap'], ['pop', 'mix'], ['pop', 'salt'], ['pop', 'mint'], ['pop', 'iris'], ['pop', 'pep'], ['scratch', 'grind', 0.3]],
      draw(k) {
        paper(k, '#f3e7cf');
        card(k, 540, 220, ['PAPYRUS · ROMAN EGYPT', '4th century AD · Vienna'], 'pap', { w: 800 });
        const ing = [['salt', 'rock salt', '#e8e8e8'], ['mint', 'mint', '#7ab55a'], ['iris', 'dried iris', '#9a7ac0'], ['pep', 'pepper', '#3b2f2a']];
        ing.forEach(([c, t, col], i) => {
          const y = 440 + i * 150;
          k.circle(240, y, 50, { fill: col, fillStyle: 'solid', width: 4, p: k.at(c, 0.4), seed: 4300 + i });
          note(k, t, 330, y, c, { size: 64, align: 'left', fx: 'pop' });
        });
        k.prop('grinder', 540, 1080, 260, { p: k.at('grind', 0.5) });
      },
    },
    {
      say: "{egypt}Egyptians were serious about hygiene. {priests}According to Herodotus, priests shaved their entire bodies every other day. {you}So next time you skip brushing, {joke}remember, even the pepper people tried.",
      sfx: [['pop', 'egypt'], ['scratch', 'priests', 0.3], ['pop', 'you'], ['boing', 'joke', 0.3]],
      draw(k) {
        flat(k, '#f5d98a', P.sand, G);
        k.poly([[700, G], [880, G - 360], [1060, G]], { fill: '#e0c070', fillStyle: 'solid', width: 5, seed: 4310 });
        k.char(320, G + 20, 520, { body: 'man', outfit: 'robe', color: '#ffffff', color2: P.yellow, hair: 'bald', skin: '#b07a4a', face: 'smug', p: k.at('priests', 0.5) });
        k.text('SHAVED ALL OVER', 540, 260, { size: 92, font: 'title', color: P.red, fx: 'pop', p: k.at('priests', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        note(k, 'every other day (Herodotus)', 540, 370, 'priests', { size: 48 });
        k.char(780, G + 20, 400, { ...YOU, face: k.t > k.cue('joke') ? 'shock' : 'blank', p: k.at('you', 0.5) });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}How did people stay clean without soap? The full story is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Stay Clean Without Soap?', channel: 'Long Story Drawn', tail: 1.0 }),
  ],
};
