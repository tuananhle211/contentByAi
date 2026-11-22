// Shorts — Why can't you live on raw food? (dọc 9:16, cắt từ tập 012 How Fire Made You Human)
// Đối chiếu: Evenepoel et al. 1998 — protein trứng tiêu hoá ~51% (sống) vs ~91% (chín).
//  Fonseca-Azevedo & Herculano-Houzel 2012 (PNAS) — đồ sống: >9 giờ ăn/ngày cho số nơ-ron cỡ người. Tinh tinh nhai ~5+ giờ/ngày (Wrangham).
//  Giả thuyết nấu ăn của Wrangham — thời điểm còn tranh cãi (nói rõ).
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, flat, night, paper, big, note, card, glow } from '/channel/long-story-drawn.js';

const G = 1250;

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    format: 'short',
    captions: true,
    title: "Why You Can't Live on Raw Food 🔥 #shorts",
    description: 'A raw egg vs a cooked egg — your body gets almost twice the protein from one of them. Some scientists think cooking paid for your big brain. Watch the full story, "How Fire Made You Human", on Long Story Drawn.',
    tags: ['raw vs cooked egg', 'cooking hypothesis', 'how fire made us human', 'raw food diet', 'human brain evolution', 'ancient humans', 'shorts', 'long story drawn'],
    hashtags: ['shorts', 'evolution', 'science'],
    voice: 'en-US-AndrewMultilingualNeural',
    rate: '-2%',
    pitch: '-2Hz',
    categoryId: '27',
    images: { poster: 'assets/poster.jpg' },
    music: 'assets/music/background.mp3',
    musicVolume: 0.08,
    sfxVolume: 0.5,
    transition: 'fade',
  },

  scenes: [
    {
      lead: 0.1,
      say: "{q}Why can't you live on raw food, like a chimp? {egg}Start with an egg. {raw}Eat it raw, and your body digests only about half of its protein. {cook}Cook it, and that jumps to around ninety percent.",
      sfx: [['pop', 'egg'], ['bonk', 'raw', 0.3], ['tada', 'cook', 0.4]],
      draw(k) {
        paper(k);
        k.text('RAW vs COOKED', 540, 200, { size: 96, font: 'title', color: P.ink, fx: 'pop', p: k.at('q', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.prop('chimp', 230, 1100, 220, { p: k.at('q', 0.5) });
        k.prop('egg', 290, 520, 260, { p: k.at('egg', 0.5) });
        big(k, '~51%', 290, 760, 'raw', { size: 120, color: P.orange });
        const p = k.at('cook', 0.5);
        k.group({ x: 790, y: 520, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
          k.ellipse(0, 0, 300, 220, { fill: '#ffffff', fillStyle: 'solid', width: 5, seed: 1610 });
          k.circle(10, -6, 58, { fill: P.yellow, fillStyle: 'solid', width: 4, seed: 1611 });
        });
        big(k, '~91%', 790, 760, 'cook', { size: 120, color: P.grass });
        note(k, 'protein your body digests', 540, 880, 'raw', { size: 46, color: '#6b5f55' });
        k.prop('campfire', 790, 1010, 180, { p: k.at('cook', 0.5) });
      },
    },
    {
      say: "{brain}Now multiply that by everything you eat. {nine}One study calculated that an ape with as many brain cells as you would need to eat raw food for more than nine hours a day. {chimp}Chimps already spend five hours or more just chewing.",
      sfx: [['pop', 'brain'], ['drumroll', 'nine', 0.3], ['boing', 'chimp', 0.3]],
      draw(k) {
        paper(k);
        k.icon('brain', 540, 360, 300, { p: k.at('brain', 0.5) });
        card(k, 540, 620, ['FONSECA-AZEVEDO &', 'HERCULANO-HOUZEL · 2012'], 'nine', { w: 760 });
        k.icon('clock', 300, 880, 160, { p: k.at(k.cue('nine', 2), 0.5) });
        big(k, '9+ HOURS', 640, 880, k.cue('nine', 2.4), { size: 110, color: P.orange });
        note(k, 'of eating raw food, every day', 540, 990, k.cue('nine', 2.8), { size: 44, color: '#6b5f55' });
        k.prop('chimp', 300, 1160, 200, { p: k.at('chimp', 0.5) });
        note(k, '5+ hours chewing', 700, 1160, 'chimp', { size: 54, color: P.brown, fx: 'pop' });
      },
    },
    {
      say: "{fire}Some scientists think that's why fire mattered so much. {paid}Cooking may have paid for your big brain. {debate}Exactly when it started is still a hot debate.",
      sfx: [['whoosh', 'fire', 0.4], ['cash', 'paid', 0.4], ['boing', 'debate', 0.3]],
      draw(k) {
        night(k, { mx: 860, my: 220 });
        flat(k, 'rgba(0,0,0,0)', '#4a3f5e', G);
        k.prop('campfire', 540, G - 60, 360, { fire: k.at('fire', 1) });
        k.char(240, G + 40, 420, { ...YOU, face: 'happy', pose: 'hold' });
        k.prop('meat', 330, G - 300, 120, { rotate: -0.5 });
        glow(k, 540, G - 160, 300 + 500 * k.at('fire', 1), 0.6);
        k.icon('brain', 540, 520, 240 * (1 + 0.25 * k.at('paid', 1.2)), { p: k.at('paid', 0.5) });
        k.text('COOKING PAID THE BILL', 540, 760, { size: 70, font: 'title', color: P.yellow, fx: 'pop', p: k.at('paid', 0.4), outline: P.ink, outlineWidth: 12, maxWidth: 1000 });
        k.text('(when? still debated)', 540, 860, { size: 48, font: 'title', color: '#d9d3e8', fx: 'fade', p: k.at('debate', 0.5), outline: P.ink, outlineWidth: 8 });
      },
    },
    fullVideoScene({
      lang: 'en',
      say: "{full}The full story of how fire made you human is on the channel. Link below.",
      image: 'poster',
      title: 'How Fire Made You Human',
      channel: 'Long Story Drawn',
      tail: 1.2,
    }),
  ],
};
