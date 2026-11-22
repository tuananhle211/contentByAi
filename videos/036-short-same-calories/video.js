// Shorts — Hunter-gatherers burn about the same calories as you (→ Ep 4, 017). Pontzer et al. 2012 (PLoS ONE): Hadza total daily energy expenditure
//  similar to Westerners after adjusting for body size/composition. Raichlen et al. 2017: Hadza ~2+ h/day moderate-to-vigorous activity. Hedged ("suggests").
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, ANC, ANCW, ELDER, KID, SCI, flat, paper, night, stars, note, card, lying, zzz, glow, shortMeta, hook } from '/channel/long-story-drawn.js';

const G = 1250;
const HADZA = ANC({ skin: '#9a6b42', hair: 'short' });
const OFFICE = { ...YOU, hat: undefined, color: '#5a6b8a', color2: '#9fd3ff' };
export default {
  meta: shortMeta({
    title: 'Hunter-Gatherers Burn the Same Calories as You?! 🔥 #shorts',
    description: 'Hadza hunter-gatherers walk for hours every day — yet they burn about the same calories per day as office workers. Here\'s what scientists found.',
    tags: ['hadza calories', 'herman pontzer', 'constrained energy', 'exercise and weight loss', 'calories burned hunter gatherers'],
    long: 'Did Ancient Humans Work Less Than You?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}Hadza hunter-gatherers walk for miles every day. {same}But they burn about the same number of calories as someone with a desk job.",
      sfx: [['pop', 'q'], ['bonk', 'same', 0.3]],
      draw(k) {
        paper(k);
        hook(k, 'SAME', 'CALORIES?!', { s1: 120, s2: 130 });
        k.char(270, G + 20, 460, { ...HADZA, face: 'happy', prop: 'spear', walk: true });
        k.char(800, G + 20, 460, { ...OFFICE, face: k.t > k.cue('same') ? 'shock' : 'calm', pose: 'hold' });
        k.prop('laptop', 800, G - 260, 150);
        k.text('=', 540, 900, { size: 160, font: 'title', color: P.red, fx: 'pop', p: k.at('same', 0.4), outline: '#fffaf0', outlineWidth: 16 });
      },
    },
    {
      say: "{act}They really are active. {raich}In one study, Hadza adults got about two hours of moderate to vigorous activity a day, far more than most Americans. {pontzer}But when Herman Pontzer's team measured their total daily energy use, {result}after adjusting for body size, it was about the same as Westerners.",
      sfx: [['pop', 'act'], ['pop', 'raich'], ['drumroll', 'pontzer', 0.3], ['tada', 'result', 0.4]],
      draw(k) {
        flat(k, P.sky, P.sand, G);
        k.dot(900, 180, 70, P.yellow);
        k.text('~2 HOURS / DAY', 540, 260, { size: 100, font: 'title', color: P.orange, fx: 'pop', p: k.at('raich', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        note(k, 'moderate–vigorous activity', 540, 370, 'raich', { size: 46 });
        card(k, 540, 560, ['PONTZER ET AL., 2012', 'PLoS ONE · Hadza'], 'pontzer', { w: 700 });
        k.char(320, G + 20, 400, { ...HADZA, face: 'happy', walk: true, p: k.at('act', 0.5) });
        k.prop('thermo', 800, 900, 220, { level: 0.6, p: k.at('result', 0.5) });
        note(k, 'total calories ≈ yours', 600, 1190, 'result', { size: 56, color: P.red, fx: 'pop' });
      },
    },
    {
      say: "{why}How? {adapt}One explanation: the body seems to adjust, spending less energy on other things when you're very active. {so}So exercise is great for your heart, your brain, and your mood. {but}Just don't expect it to burn off a whole pizza.",
      sfx: [['pop', 'why'], ['ding', 'adapt', 0.4], ['pop', 'so'], ['boing', 'but', 0.3]],
      draw(k) {
        paper(k);
        k.text('THE BODY ADJUSTS', 540, 240, { size: 90, font: 'title', color: P.indigo, fx: 'pop', p: k.at('adapt', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        const good = [['heart', 'heart'], ['brain', 'brain'], ['sun', 'mood']];
        good.forEach(([ic, t], i) => { k.icon(ic, 220 + i * 320, 520, 150, { p: k.at(k.cue('so', i * 0.3), 0.4) }); note(k, t + ' ✓', 220 + i * 320, 640, k.cue('so', i * 0.3), { size: 50, color: P.grass, fx: 'pop' }); });
        k.prop('snack', 540, 900, 260, { p: k.at('but', 0.5) });
        k.text('…not a whole pizza', 540, 1110, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('but', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}The full story, did your ancestors work less than you, is on the channel. Link below.", image: 'poster', title: 'Did Ancient Humans Work Less Than You?', channel: 'Long Story Drawn', tail: 1.2 }),
  ],
};
