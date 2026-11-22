// Shorts — the last mammoths outlived the building of the Great Pyramid (→ Ep 11, 088). Kiểu kể: câu hỏi "Why…?" + twist (bài học 06/11).
//  Wrangel Island cut off by rising seas ~10,000 years ago; mammoths there until ~4,000 years ago. Great Pyramid of Giza ~4,500 years ago.
//  Rogers & Slatkin 2017: excess harmful mutations; Dehasque et al. 2024 (Cell): genomic erosion didn't doom them, end looks sudden — cause unknown.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, flat, paper, note, card, shortMeta, hook, mammoth } from '/channel/long-story-drawn.js';

const G = 1250;
export default {
  meta: shortMeta({
    title: 'Why Were Mammoths Still Alive When the Pyramids Were Built? 🦣 #shorts',
    description: 'When the Great Pyramid of Giza was brand new, woolly mammoths were still alive, on a remote Arctic island. Here\'s how they hung on, and why they finally vanished.',
    tags: ['mammoths and pyramids', 'wrangel island mammoths', 'last woolly mammoths', 'when did mammoths go extinct', 'woolly mammoth facts', 'great pyramid'],
    long: 'How Did Ancient Humans Hunt Mammoths?',
  }),
  scenes: [
    {
      lead: 0.1,
      say: "{q}When the Great Pyramid was brand new, there were still woolly mammoths alive.",
      sfx: [['pop', 'q']],
      draw(k) {
        flat(k, '#E9B85A', '#D2B488', G);
        hook(k, 'MAMMOTHS ALIVE', 'AFTER THE PYRAMIDS?', { s1: 100, s2: 78, gap: 120 });
        k.poly([[780, 560], [1060, G], [500, G]], { fill: '#d9b26a', fillStyle: 'solid', stroke: P.ink, width: 6, rough: 0, seed: 1 });
        k.poly([[780, 560], [1060, G], [820, G]], { fill: '#c49a52', fillStyle: 'solid', stroke: P.ink, width: 6, rough: 0, seed: 2 });
        mammoth(k, 360, G + 10, 560, { face: 'happy' });
      },
    },
    {
      say: "{wr}Not in Egypt. {isl}On Wrangel Island, off the Arctic coast of Siberia. {cut}When the Ice Age ended, rising seas cut the island off, {trap}and a small herd was stranded there. {held}They held on until about four thousand years ago. {pyr}The Great Pyramid? About forty-five hundred.",
      sfx: [['bonk', 'wr', 0.3], ['pop', 'isl'], ['whoosh', 'cut', 0.4], ['pop', 'trap'], ['ding', 'held', 0.4], ['tada', 'pyr', 0.4]],
      draw(k) {
        flat(k, '#cfe0ea', '#5b9bd5', 900);
        const sea = k.at('cut', 1.4, 'inOut');
        k.ellipse(540, 900, 900 - sea * 360, 220 - sea * 60, { fill: '#e8eef2', fillStyle: 'solid', width: 5, seed: 3, p: k.at('isl', 0.6) });
        mammoth(k, 470, 900, 260, { face: 'calm', fur: '#6a4a32', p: k.at('trap', 0.5) });
        mammoth(k, 640, 900, 200, { face: 'calm', fur: '#6a4a32', p: k.at('trap', 0.5) });
        card(k, 540, 260, ['WRANGEL ISLAND · SIBERIA', 'cut off by rising seas'], 'isl', { w: 820 });
        k.text('~4,000 years ago', 540, 1120, { size: 76, font: 'title', color: P.red, fx: 'pop', p: k.at('held', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.text('Pyramid: ~4,500', 540, 1240, { size: 66, font: 'title', color: '#9a6a1a', fx: 'pop', p: k.at('pyr', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{why}So why did they finally disappear? {dna}Their DNA shows a small, inbred herd. {but}But a 2024 study suggests the end came suddenly. {who}A disease? A brutal winter? {open}Nobody knows yet.",
      sfx: [['drumroll', 'why', 0.3], ['pop', 'dna'], ['boom', 'but', 0.2], ['pop', 'who'], ['sparkle', 'open', 0.3]],
      draw(k) {
        paper(k, '#22305a');
        for (let i = 0; i < 14; i++) { const y = 300 + i * 36, w = Math.sin(i * 0.6) * 140; k.line(540 - w, y, 540 + w, y, { stroke: i % 4 === 1 ? P.red : '#9fd3ff', width: 9, rough: 0, seed: 10 + i, p: k.at('dna', 0.6) }); }
        mammoth(k, 540, 1230, 460, { face: k.t > k.cue('but') ? 'shock' : 'calm', fur: '#6a4a32', p: k.at('why', 0.5) });
        k.text('SUDDEN END?', 540, 200, { size: 104, font: 'title', color: '#ff9a8a', fx: 'pop', p: k.at('but', 0.4), outline: P.ink, outlineWidth: 16 });
        k.text('nobody knows yet', 540, 1330, { size: 70, font: 'title', color: P.yellow, fx: 'pop', p: k.at('open', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },
    fullVideoScene({ lang: 'en', say: "{full}So how did your ancestors hunt mammoths in the first place? The full story is on the channel. Link below.", image: 'poster', title: 'How Did Ancient Humans Hunt Mammoths?', channel: 'Long Story Drawn', tail: 1.0 }),
  ],
};
