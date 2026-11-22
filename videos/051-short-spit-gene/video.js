// Shorts — Your spit carries a record of your ancestors' diet (→ Ep 3, 013). Perry et al. 2007 (Nature Genetics): AMY1 (salivary amylase) copy number
//  varies (~2–15 diploid copies); populations with high-starch diets carry more copies on average. Phrase as average/population-level.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, flat, paper, night, stars, note, card, glow, redX, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const DARK = { c1: '#fffaf0', o1: P.ink };
export default {
  meta: shortMeta({
    title: 'Your Spit Reveals What Your Ancestors Ate 🍞 #shorts',
    description: 'Saliva contains an enzyme that starts digesting starch. People whose ancestors ate lots of starch tend to carry more copies of the gene for it.',
    tags: ['amy1 gene', 'salivary amylase', 'starch digestion', 'human evolution diet', 'genetics facts'],
    long: 'What Did Ancient Humans Actually Eat?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}Your spit holds a clue about what your ancestors ate. {how}Here's how.",
      sfx: [['pop', 'q'], ['ding', 'how', 0.4]],
      draw(k) {
        paper(k);
        hook(k, 'YOUR SPIT', 'KNOWS 🍞', { s1: 120, s2: 150 });
        k.char(540, G + 20, 620, { ...YOU, face: 'shock' });
        k.prop('bread', 860, 760, 200, { p: k.at('how', 0.5) });
      },
    },
    {
      say: "{chew}Chew a piece of bread for a while, and it starts to taste sweet. {enz}That's an enzyme in your saliva, amylase, breaking starch into sugar. {gene}The gene for it is called AMY1. {copies}And people carry different numbers of copies: from about two, to fifteen or more.",
      sfx: [['pop', 'chew'], ['sparkle', 'enz', 0.4], ['pop', 'gene'], ['drumroll', 'copies', 0.3]],
      draw(k) {
        paper(k);
        k.prop('bread', 300, 400, 260, { p: k.at('chew', 0.5) });
        k.text('→ sweet', 700, 400, { size: 80, font: 'title', color: P.orange, fx: 'pop', p: k.at('enz', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        note(k, 'AMYLASE breaks starch → sugar', 540, 580, 'enz', { size: 52, color: P.indigo, fx: 'pop' });
        k.text('AMY1 GENE', 540, 760, { size: 110, font: 'title', color: P.red, fx: 'pop', p: k.at('gene', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        for (let i = 0; i < 15; i++) k.rect(150 + i * 54, 940, 40, 90, { fill: i < 2 ? P.grass : '#cfc6b8', fillStyle: 'solid', width: 3, p: k.at(k.cue('copies', i * 0.08), 0.3), seed: 4400 + i });
        note(k, '2 … 15+ copies', 540, 1110, 'copies', { size: 60, fx: 'pop' });
      },
    },
    {
      say: "{perry}In 2007, a team led by George Perry found that populations with starch-heavy diets carry more copies, on average. {farm}Farmers, and foragers who dug up lots of roots. {you}So that bread craving? {joke}It might run in the family.",
      sfx: [['pop', 'perry'], ['pop', 'farm'], ['pop', 'you'], ['tada', 'joke', 0.4]],
      draw(k) {
        paper(k);
        card(k, 540, 220, ['PERRY ET AL., 2007', 'Nature Genetics'], 'perry', { w: 640 });
        k.text('MORE STARCH →', 540, 420, { size: 92, font: 'title', color: P.ink, fx: 'pop', p: k.at('perry', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.text('MORE COPIES', 540, 540, { size: 100, font: 'title', color: P.grass, fx: 'pop', p: k.at('perry', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.prop('tuber', 300, 760, 200, { p: k.at('farm', 0.5) });
        k.prop('bread', 760, 760, 200, { p: k.at('farm', 0.5) });
        k.text('it runs in the family', 540, 1050, { size: 74, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}What did your ancestors really eat? The full story is on the channel. Link below.", image: 'poster', title: 'What Did Ancient Humans Actually Eat?', channel: 'Long Story Drawn', tail: 1.0 }),
  ],
};
