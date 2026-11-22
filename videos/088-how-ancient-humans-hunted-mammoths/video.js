// Long Story Drawn — Ep 11: How Did Ancient Humans Hunt Mammoths? (promised in Ep 10: "an animal the size of a bus, and all you have is a spear; hunted or found?")
// Rules (kenh-ancient-humans): cold open pays off the poster promise; series + agenda ≤ 15 s; re-hook every ~60 s; recap ≤ 15 s. Concept: #8 #9 #5 #2 #13.
// Fact check:
//  Woolly mammoth: ~2.7–3.4 m at the shoulder (≈ height of a bus), ~6 tonnes.
//  Kostenki 11 (Russia), bone circle ~25,000 years: remains of at least 64 mammoths (Pryor et al. 2020, Antiquity); hunted vs scavenged debated.
//  Lehringen (Germany), found 1948: ~2.4 m yew spear among the ribs of a straight-tusked elephant, ~120,000 years (Neanderthals).
//  Neumark-Nord (Germany), Gaudzinski-Windheuser et al. 2023 (Science Advances): ~70 straight-tusked elephants butchered, males up to ~13 t;
//    authors estimate one adult male ≈ meat for ~100 people for a month (say "estimated").
//  Sopochnaya Karga ("Zhenya") mammoth, Taimyr, found 2012 by 11-year-old Yevgeny Salinder; Pitulko et al. 2016 (Science):
//    ~45,000 years, weapon injuries (ribs, left scapula, tusk, cheekbone); authors suggest a blow aimed at the base of the trunk (major artery),
//    compare with traditional elephant hunting — interpretation, say so. Earliest evidence of people in the Arctic at that latitude.
//  Clovis points ~13,000 years ago (fluted; named after Clovis, New Mexico). Naco, Arizona, found 1951 by Fred Navarrete and son: 8 Clovis points
//    with one mammoth, no butchering/camp → usually read as a wounded mammoth that escaped (Haury 1953). Lehner Ranch (same San Pedro Valley):
//    13 Clovis points with remains of ~13 mammoths, mostly young.
//  Frison 1989 (American Antiquity): replica Clovis spears on culled African elephants in Zimbabwe — penetrated hide to vital organs.
//  Spear-thrower (atlatl): oldest known hook Combe-Saunière (France), Solutrean, ~17,500 years → "at least 17,000 years".
//  Tultepec (Mexico), INAH 2019: two pits, 824 bones, ≥14 mammoths, ~15,000 years; claimed human-dug traps — debated.
//  Geissenklösterle flute: mammoth ivory, ~40,000+ years; made by splitting the tusk, hollowing, rejoining airtight (Conard et al.).
//  Paul S. Martin (1967, 1973): "overkill" / "blitzkrieg" hypothesis. Climate: mammoth steppe shrank at end of Ice Age; many researchers: both.
//  St. Paul Island (Alaska): mammoths until ~5,600 years ago, no humans; Graham et al. 2016 (PNAS): shrinking freshwater.
//  Wrangel Island: last mammoths ~4,000 years ago; Great Pyramid of Giza ~4,500 years ago. Rogers & Slatkin 2017: excess harmful mutations;
//    Dehasque et al. 2024 (Cell): genomic erosion didn't doom them; final extinction looks sudden (cause unknown — say so).
//  Next episode (Ep 12): How Did Ancient Humans Tame Wolves? Leftover-meat hypothesis (Lahtinen et al. 2021, Scientific Reports);
//    Bonn-Oberkassel puppy (~14,000 years) survived distemper with human care (Janssens et al. 2018). Poster: COMING SOON.
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import { P, G, YOU, ANC, ANCW, KID, SCI, flat, paper, chap, big, note, redX, card, glow, night, mammoth, clovis, wolf } from '/channel/long-story-drawn.js';
import * as thumbs from '/videos/088-how-ancient-humans-hunted-mammoths/thumbs.js';

const FUR = (extra = {}) => ANC({ outfit: 'robe', color: '#8a6a4a', color2: '#5a4030', hair: 'long', hairColor: '#3a2a1e', skin: '#e0b48a', ...extra });
const FURW = (extra = {}) => ANCW({ color: '#9a7a5a', color2: '#6b4a33', hair: 'long', hairColor: '#5a3a24', skin: '#e0b48a', ...extra });
const NEAN = { body: 'big', outfit: 'bare', color: '#8a6a4a', color2: '#5a4030', hair: 'long', hairColor: '#5a3a24', beard: true, beardColor: '#5a3a24', skin: '#d9a77c' };
const CLOV = (extra = {}) => ANC({ outfit: 'tunic', color: '#a8794a', color2: '#6b4a33', hair: 'long', hairColor: '#1e1612', skin: '#b8835a', ...extra });
const ARCH = SCI({ color: '#c2a46b' });
const KIDF = { ...KID, outfit: 'robe', color: '#5a6a8a', skin: '#e0b48a' };

// Thảo nguyên băng hà (mammoth steppe): trời xám xanh, cỏ vàng úa, tuyết lấm tấm.
function steppe(k, o = {}) {
  flat(k, o.sky ?? '#cfe0ea', o.ground ?? '#d8c99a');
  k.prop('mountain', 300, G - 300, 620, { snow: true, fill: '#9aa8b0' });
  k.prop('mountain', 1650, G - 340, 720, { snow: true, fill: '#a8b4bc' });
  if (o.snow !== false) for (let i = 0; i < 22; i++) { const u = ((k.gt ?? 0) * 0.22 + k.rand(i)) % 1; k.dot(k.rand(i + 9) * k.W, u * k.H, 5, '#ffffff', 0.85); }
}
// Cỏ cao phía trước (che nửa người).
function grass(k, y, seed = 0) {
  for (let i = 0; i < 46; i++) {
    const x = (i / 45) * k.W + (k.rand(i + seed) - 0.5) * 30, h = 90 + k.rand(i + 50 + seed) * 70, sw = Math.sin((k.gt ?? 0) * 1.4 + i) * 8;
    k.line(x, y + 40, x + sw, y - h, { stroke: i % 3 ? '#b59a5a' : '#9a8048', width: 9, rough: 0, seed: 8800 + i });
  }
}
// Giáo cắm (thân gỗ + mũi đá) từ (x1,y1) tới mũi (x2,y2).
function spear(k, x1, y1, x2, y2, o = {}) {
  const p = o.p ?? 1;
  k.line(x1, y1, k.lerp(x1, x2, p), k.lerp(y1, y2, p), { stroke: P.brown, width: o.w ?? 10, rough: 0, seed: o.seed ?? 8700 });
  const a = Math.atan2(y2 - y1, x2 - x1), s = (o.w ?? 10) * 2.4, X = k.lerp(x1, x2, p), Y = k.lerp(y1, y2, p);
  k.poly([[X + Math.cos(a) * s * 1.6, Y + Math.sin(a) * s * 1.6], [X + Math.cos(a + 2.6) * s, Y + Math.sin(a + 2.6) * s], [X + Math.cos(a - 2.6) * s, Y + Math.sin(a - 2.6) * s]], { fill: '#c9c2b4', fillStyle: 'solid', width: 3, rough: 0, seed: (o.seed ?? 8700) + 1, alpha: p > 0.02 ? 1 : 0 });
}
// Voi ngà thẳng (họ hàng voi ma mút, không lông).
function straightTusk(k, x, y, s, o = {}) { k.prop('elephant', x, y, s, { fill: '#8f8a84', tusks: 1, flip: o.flip, p: o.p ?? 1 }); }
// Bộ xương voi nằm (để cắm giáo/mũi đá).
function skeleton(k, x, y, s, o = {}) {
  const p = o.p ?? 1, u = s / 100;
  k.group({ x, y, a: Math.min(1, p * 3) }, () => {
    for (const [c, add] of [['#7a6a4a', 3], ['#f1e8d4', 0]]) {
      k.line(-60 * u, -10 * u, 50 * u, -18 * u, { stroke: c, width: 12 * u + add, rough: 0, seed: 8601 });
      for (let i = 0; i < 9; i++) k.arc(-40 * u + i * 10 * u, -14 * u, 22 * u, 0.2, Math.PI - 0.2, { stroke: c, width: 6 * u + add, rough: 0, seed: 8610 + i });
    }
    k.ellipse(70 * u, -20 * u, 34 * u, 26 * u, { fill: '#f1e8d4', fillStyle: 'solid', stroke: '#7a6a4a', width: 3, seed: 8620 });
    k.circle(76 * u, -24 * u, 6 * u, { fill: '#5a4a3a', fillStyle: 'solid', stroke: 'none', seed: 8621 });
    if (o.tusk !== false) k.arc(96 * u, -40 * u, 30 * u, 0.2, 2.2, { stroke: '#f6eedc', width: 8 * u, rough: 0, seed: 8622 });
    for (const [c, add] of [['#7a6a4a', 3], ['#f1e8d4', 0]]) for (const lx of [-50, -30, 30, 50]) k.line(lx * u, -2 * u, (lx + 8) * u, 14 * u, { stroke: c, width: 8 * u + add, rough: 0, seed: 8630 + lx });
  });
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    title: 'How Did Ancient Humans Hunt Mammoths?',
    description: `Six tonnes of fur and tusk, as tall as a bus, and all you have is a wooden spear. Did your ancestors really hunt mammoths, or just pick up the bones?
How did ancient humans hunt mammoths? The spear found between an elephant's ribs, a 45,000-year-old mammoth with weapon wounds in the Arctic, the mammoth that took eight spears and walked away, the tricks and weapons hunters used, and why mammoths were still alive when the Great Pyramid was built. Episode 11 of "How your ancestors actually lived".`,
    footer: `📚 Sources: Pitulko et al. (2016, Science), "Early human presence in the Arctic: Evidence from 45,000-year-old mammoth remains"; Gaudzinski-Windheuser et al. (2023, Science Advances), Neumark-Nord elephants; Pryor et al. (2020, Antiquity), Kostenki 11; Haury (1953), Naco mammoth; Frison (1989, American Antiquity), Clovis weapons on African elephants; Martin (1967), prehistoric overkill; Graham et al. (2016, PNAS), St. Paul Island; Rogers & Slatkin (2017, PLOS Genetics) and Dehasque et al. (2024, Cell), Wrangel Island mammoths.
🦣 Previous episode: How Did Ancient Humans Survive the Ice Age? Next: How Did Ancient Humans Tame Wolves?`,
    tags: ['how did ancient humans hunt mammoths', 'mammoth hunting', 'woolly mammoth', 'did humans kill the mammoths', 'mammoth extinction', 'clovis people', 'clovis points', 'naco mammoth', 'neanderthal elephant hunting', 'lehringen spear', 'atlatl', 'spear thrower', 'wrangel island mammoths', 'mammoths and pyramids', 'overkill hypothesis', 'ice age hunters', 'ancient humans', 'human evolution', 'prehistory', 'anthropology', 'early humans', 'animated history', 'history explained', 'how people lived', 'long story drawn'],
    hashtags: ['ancienthumans', 'mammoth', 'iceage'],
    voice: 'en-US-AndrewMultilingualNeural',
    rate: '-4%',
    pitch: '-2Hz',
    categoryId: '27',
    transition: 'fade',
    paper: P.cream,
    music: 'assets/music/background.mp3',
    musicVolume: 0.08,
    sfxVolume: 0.45,
  },

  scenes: [
    // ---------------- Cold open = poster promise ----------------
    {
      chapter: 'Intro',
      lead: 0.3,
      say: "{grass}You're crouched in tall, frozen grass. {front}Fifty meters ahead: six tonnes of fur, muscle and tusk, {tall}as tall as a bus. {spear}In your hand, a wooden spear with a stone tip. {friends}Your friends are spread out in a wide circle. {turn}Then it turns. {look}And looks straight at you. {q}How do you hunt that?",
      sfx: [['whoosh', 'grass', 0.4], ['pop', 'front'], ['pop', 'spear'], ['pop', 'friends'], ['whoosh', 'turn', 0.5], ['bonk', 'look', 0.3], ['drumroll', 'q', 0.3]],
      draw(k) {
        steppe(k);
        const turn = k.at('turn', 1.0, 'inOut');
        mammoth(k, 1300, G + 10, 700, { p: k.at('front', 0.7), flip: turn > 0.5, face: k.t > k.cue('look') ? 'angry' : 'calm' });
        k.text('~6 TONNES', 1300, 200, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('front', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        for (let i = 0; i < 2; i++) k.char(180 + i * 1500, G + 40, 300, { ...FUR({ hairColor: ['#3a2a1e', '#5a3a24'][i] }), face: 'blank', prop: 'spear', flip: i === 1, p: k.at('friends', 0.5) });
        k.char(520, G + 60, 470, { ...FUR(), face: k.t > k.cue('look') ? 'shock' : 'blank', prop: 'spear', p: k.at('spear', 0.5) });
        if (k.t > k.cue('look')) k.sweat(600, G - 380, 1.4);
        grass(k, G + 20);
      },
    },
    {
      say: "{series}This is episode eleven of How Your Ancestors Actually Lived. {today}Today: {a}the spear found inside a giant, {b}the weapons and the tricks, {c}and who really killed the last mammoths. {sub}Subscribe for the next one.",
      sfx: [['pop', 'series'], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'sub', 0.5]],
      draw(k) {
        paper(k);
        note(k, 'HOW YOUR ANCESTORS ACTUALLY LIVED · Ep. 11', 960, 130, 'series', { size: 52, color: P.brown });
        const items = [['a', 'THE SPEAR INSIDE'], ['b', 'WEAPONS & TRICKS'], ['c', 'WHO KILLED THEM?']];
        items.forEach(([c, t], i) => {
          const x = 420 + i * 540, p = k.at(c, 0.5);
          k.group({ x, y: 560, r: i % 2 ? 0.03 : -0.03, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-210, -220, 420, 440, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 8820 + i });
            if (i === 0) { skeleton(k, -20, 20, 150); spear(k, -150, -110, -10, -10, { seed: 8825 }); }
            else if (i === 1) { clovis(k, -60, -40, 150, { rotate: 0.3 }); k.line(30, 40, 150, -110, { stroke: P.brown, width: 10, rough: 0, seed: 8826 }); }
            else { mammoth(k, 0, 60, 300, { face: 'calm' }); k.text('?', -130, -110, { size: 110, font: 'title', color: P.red }); }
            k.text(t, 0, 150, { size: 46, font: 'title', color: P.red, maxWidth: 380 });
          });
        });
        k.char(1760, 1060, 300, { ...YOU, face: 'happy', pose: 'wave', p: k.at('sub', 0.5) });
      },
    },

    // ---------------- Chapter 1: Hunted or found? ----------------
    {
      chapter: 'Hunted or found?',
      say: "{back}Last episode, you saw shelters built from mammoth bones. {kost}At one site in Russia, called Kostenki eleven, a single ring of bones held the remains of at least sixty-four mammoths. {lot}That's a lot of mammoths. {hunt}Did people kill them all? {scav}Or did they collect bones from animals that died on their own?",
      sfx: [['whoosh', 'back', 0.4], ['pop', 'kost'], ['tada', 'lot', 0.3], ['pop', 'hunt'], ['pop', 'scav']],
      draw(k) {
        steppe(k, { snow: false });
        chap(k, 'Hunted or found?');
        k.ellipse(960, G - 20, 1100, 220, { fill: '#cbb98f', fillStyle: 'solid', width: 4, seed: 8830, p: k.at('kost', 0.6) });
        for (let i = 0; i < 26; i++) {
          const a = (i / 26) * Math.PI * 2, x = 960 + Math.cos(a) * 470, y = G - 20 + Math.sin(a) * 86;
          k.ellipse(x, y, 70, 30, { fill: '#f1e8d4', fillStyle: 'solid', width: 3, seed: 8840 + i, p: k.at(k.cue('kost', i * 0.06), 0.3) });
        }
        card(k, 960, 260, ['KOSTENKI 11 · RUSSIA', '≥ 64 mammoths · ~25,000 years'], 'kost', { w: 760 });
        big(k, 'HUNTED?', 560, 520, 'hunt', { size: 90 });
        big(k, '…OR FOUND?', 1360, 520, 'scav', { size: 90, color: P.night });
      },
    },
    {
      say: "{prob}Here's the problem. {die}Mammoths died naturally all the time: old age, hunger, falling through thin ice. {bones}And bones can lie around for centuries. {so}So a pile of bones proves people used mammoths. {not}It doesn't prove they hunted them. {need}For that, you need something better: {weapon}a weapon, inside the animal.",
      sfx: [['pop', 'prob'], ['wahwah', 'die', 0.25], ['pop', 'bones'], ['ding', 'so', 0.3], ['bonk', 'not', 0.3], ['tada', 'weapon', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'Hunted or found?');
        mammoth(k, 520, 620, 420, { face: 'calm', p: k.at('die', 0.5), alpha: 1 });
        k.wave(300, 650, 460, { amp: 10, len: 90, stroke: '#7FB5D5', width: 6, p: k.at('die', 0.6) });
        skeleton(k, 1380, 600, 260, { p: k.at('bones', 0.6) });
        k.text('BONES = USED', 1380, 300, { size: 64, font: 'title', color: P.grass, fx: 'pop', p: k.at('so', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.text('≠ HUNTED', 1380, 390, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at('not', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        spear(k, 1120, 420, 1360, 560, { p: k.at('weapon', 0.6), seed: 8850 });
        big(k, 'A WEAPON INSIDE', 960, 920, 'weapon', { size: 84 });
      },
    },
    {
      say: "{lehr}In 1948, at Lehringen in Germany, workers found the skeleton of a straight-tusked elephant, a giant cousin of the mammoth. {spear}Among its ribs lay a wooden spear, almost two and a half meters long, carved from yew. {age}It's about a hundred and twenty thousand years old. {who}Which means the hunters weren't even your species. {nean}They were Neanderthals.",
      sfx: [['pop', 'lehr'], ['tada', 'spear', 0.4], ['pop', 'age'], ['drumroll', 'who', 0.3], ['ding', 'nean', 0.4]],
      draw(k) {
        flat(k, '#e9dcc4', '#cbb98f');
        chap(k, 'Hunted or found?');
        skeleton(k, 900, G - 30, 520, { p: k.at('lehr', 0.6) });
        spear(k, 520, G - 360, 980, G - 90, { p: k.at('spear', 0.8), w: 12, seed: 8860 });
        card(k, 1460, 240, ['LEHRINGEN · GERMANY', 'yew spear · ~120,000 years'], 'spear', { w: 700 });
        k.char(1560, G + 40, 460, { ...NEAN, face: 'smug', prop: 'spear', p: k.at('nean', 0.5) });
        big(k, 'NEANDERTHALS', 1440, 520, 'nean', { size: 80, color: P.brown });
      },
    },
    {
      say: "{nn}At Neumark-Nord, also in Germany, archaeologists studied the bones of around seventy of these elephants, {big}some of the males weighing up to thirteen tonnes, {cut}covered in butchery marks. {feed}In 2023, researchers estimated one big male could feed about a hundred people for a month. {joke}That's not a meal. That's a festival.",
      sfx: [['pop', 'nn'], ['bonk', 'big', 0.3], ['scratch', 'cut', 0.3], ['cash', 'feed', 0.3], ['boing', 'joke', 0.3]],
      draw(k) {
        flat(k, P.sky, P.sand);
        chap(k, 'Hunted or found?');
        straightTusk(k, 620, G - 140, 620, { p: k.at('nn', 0.6) });
        big(k, '~13 TONNES', 620, 260, 'big', { size: 90 });
        for (let i = 0; i < 4; i++) k.line(470 + i * 60, G - 300, 500 + i * 60, G - 220, { stroke: P.red, width: 8, rough: 0, seed: 8870 + i, p: k.at(k.cue('cut', i * 0.15), 0.3) });
        for (let i = 0; i < 10; i++) k.char(1150 + (i % 5) * 150, G + 40 - Math.floor(i / 5) * 60, 220 + Math.floor(i / 5) * -20, { ...(i % 2 ? FURW() : FUR()), face: 'happy', shadow: false, p: k.at(k.cue('feed', i * 0.08), 0.4) });
        note(k, '×100 people · 1 month (estimate)', 1450, 520, 'feed', { size: 46, color: P.ink });
        k.text('a festival', 1450, 360, { size: 70, font: 'title', color: P.orange, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 2: The Arctic mammoth ----------------
    {
      chapter: 'The Arctic mammoth',
      say: "{but}But here's the strange part. {north}Some of the clearest evidence of a mammoth hunt comes from a place people weren't supposed to be yet: {arctic}the Siberian Arctic, about forty-five thousand years ago.",
      sfx: [['drumroll', 'but', 0.3], ['whoosh', 'north', 0.4], ['tada', 'arctic', 0.4]],
      draw(k) {
        night(k, { sky: '#22305a', ground: '#e8eef2', moon: false });
        chap(k, 'The Arctic mammoth', true);
        for (let i = 0; i < 5; i++) k.wave(0, 160 + i * 40, k.W, { amp: 30, len: 600, phase: (k.gt ?? 0) * 0.6 + i, stroke: ['#7fe8b0', '#5ad1c8', '#8fd6ff', '#7fe8b0', '#b28cff'][i], width: 10, alpha: 0.5, p: k.at('north', 1.2) });
        mammoth(k, 1200, G + 10, 560, { face: 'calm', fur: '#6a4a32', p: k.at('arctic', 0.6) });
        big(k, 'ARCTIC · ~45,000 YEARS AGO', 960, 400, 'arctic', { size: 72, color: '#9fd3ff', outline: P.ink });
        k.char(420, G + 40, 380, { ...YOU, face: 'shock', p: k.at('but', 0.5) });
      },
    },
    {
      say: "{boy}In 2012, an eleven-year-old boy spotted a frozen mammoth sticking out of the ground on Russia's Arctic coast. {sci}Scientists dated it to about forty-five thousand years ago. {inj}And its bones carried injuries from weapons: {rib}damage to the ribs, {sh}a shoulder blade, {tusk}a tusk, {face}and a blow to the cheekbone. {pit}In 2016, Vladimir Pitulko's team published it in the journal Science.",
      sfx: [['pop', 'boy'], ['pop', 'sci'], ['bonk', 'inj', 0.3], ['pop', 'rib'], ['pop', 'sh'], ['pop', 'tusk'], ['pop', 'face'], ['ding', 'pit', 0.4]],
      draw(k) {
        flat(k, '#cfe0ea', '#e8eef2');
        chap(k, 'The Arctic mammoth');
        k.char(300, G + 40, 300, { ...KIDF, face: k.t > k.cue('sci') ? 'happy' : 'shock', pose: 'point', p: k.at('boy', 0.5) });
        mammoth(k, 1040, G + 20, 760, { face: 'calm', fur: '#6a4a32', p: k.at('boy', 0.8) });
        const marks = [['rib', 900, 700], ['sh', 1110, 620], ['tusk', 1370, 760], ['face', 1300, 560]];
        marks.forEach(([c, x, y]) => { k.circle(x, y, 46, { stroke: P.red, width: 9, rough: 0.5, seed: 8880 + x, p: k.at(c, 0.4) }); });
        card(k, 1520, 230, ['PITULKO ET AL. · SCIENCE 2016', 'weapon wounds · ~45,000 years'], 'pit', { w: 720 });
      },
    },
    {
      say: "{why}Why the cheekbone? {near}It's right by the base of the trunk, {art}where a major artery runs. {hunt}Some traditional elephant hunters aimed for exactly that spot: wound the trunk, and the animal bleeds. {hedge}That's the researchers' interpretation, not a certainty. {mean}But it means people were hunting mammoths in the high Arctic far earlier than anyone expected.",
      sfx: [['pop', 'why'], ['pop', 'near'], ['ding', 'art', 0.3], ['pop', 'hunt'], ['pop', 'hedge'], ['tada', 'mean', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'The Arctic mammoth');
        mammoth(k, 480, 1000, 820, { face: 'calm', fur: '#6a4a32' });
        k.curve([[874, 524], [930, 640], [950, 746], [900, 930]], { stroke: P.red, width: 10, rough: 0, p: k.at('art', 0.8), seed: 8890 });
        k.circle(874, 516, 54, { stroke: P.red, width: 10, rough: 0.5, seed: 8891, p: k.at('near', 0.4) });
        big(k, 'MAJOR ARTERY', 1560, 360, 'art', { size: 76 });
        note(k, 'interpretation · not certain', 1560, 470, 'hedge', { size: 44, color: P.brown });
        big(k, 'MUCH EARLIER THAN EXPECTED', 1520, 800, 'mean', { size: 60, color: P.night, maxWidth: 760 });
      },
    },

    // ---------------- Chapter 3: Eight spears ----------------
    {
      chapter: 'Eight spears',
      say: "{jump}Now jump to North America, about thirteen thousand years ago. {clov}People there made beautiful stone spear points, with a groove running up the middle. {name}Archaeologists call them Clovis points, after a town in New Mexico. {joke}Ancient craftsmanship. Modern collectors would pay a fortune.",
      sfx: [['whoosh', 'jump', 0.4], ['sparkle', 'clov', 0.4], ['pop', 'name'], ['cash', 'joke', 0.3]],
      draw(k) {
        flat(k, '#e9c48a', '#c9a46a');
        chap(k, 'Eight spears');
        k.text('NORTH AMERICA · ~13,000 YEARS AGO', 960, 160, { size: 64, font: 'title', color: P.brown, fx: 'pop', p: k.at('jump', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        const pc = k.at('clov', 0.8);
        clovis(k, 960, 560, 520 * Math.max(0.01, k.ease.back(pc)), { rotate: 0.12, p: Math.min(1, pc * 3) });
        k.line(1050, 470, 1080, 620, { stroke: P.red, width: 6, rough: 0, seed: 8900, p: k.at('clov', 0.6) });
        note(k, '← the groove ("flute")', 1300, 560, 'clov', { size: 44 });
        big(k, 'CLOVIS POINT', 960, 930, 'name', { size: 90 });
        k.char(320, G + 40, 380, { ...CLOV(), face: 'smug', p: k.at('clov', 0.5) });
      },
    },
    {
      say: "{naco}In 1951, at Naco, Arizona, a father and son found mammoth bones washing out of a creek bank. {eight}With them: eight Clovis points. {one}Eight spear points, one mammoth. {twist}But no butchering marks, no camp, no cutting tools. {esc}The most popular explanation: the hunters wounded it, and it got away. {joke}Eight spears, and it still walked off. Respect.",
      sfx: [['pop', 'naco'], ['pop', 'eight'], ['bonk', 'one', 0.3], ['drumroll', 'twist', 0.3], ['whoosh', 'esc', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        flat(k, P.sky, P.sand);
        chap(k, 'Eight spears');
        const go = k.at('esc', 2.0, 'inOut');
        const mx = 980 + go * 700;
        mammoth(k, mx, G + 10, 640, { face: 'angry', p: k.at('naco', 0.6) });
        const hits = [[-170, -300], [-120, -330], [-60, -350], [0, -360], [-140, -230], [-80, -250], [-20, -260], [40, -300]];
        hits.forEach(([dx, dy], i) => spear(k, mx + dx - 110, G + dy - 130, mx + dx, G + dy, { p: k.at(k.cue('eight', i * 0.12), 0.25), w: 7, seed: 8910 + i * 2 }));
        big(k, '8 POINTS · 1 MAMMOTH', 760, 200, 'one', { size: 80 });
        for (let i = 0; i < 3; i++) k.char(240 + i * 160, G + 40, 320, { ...CLOV({ hairColor: ['#1e1612', '#2a1d14', '#3a2a1e'][i] }), face: go > 0.3 ? 'shock' : 'blank', prop: i ? undefined : 'spear', p: k.at('naco', 0.6) });
        k.text('…and it got away', 1300, 360, { size: 66, font: 'title', color: P.night, fx: 'pop', p: k.at('esc', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{lehner}In the same valley, at Lehner Ranch, archaeologists found thirteen Clovis points with the bones of about a dozen mammoths, {young}mostly young ones. {pattern}That fits a pattern: hunters often picked the young, the weak, or animals stuck in mud. {bull}Not the biggest bull in the herd. {joke}Your ancestors were brave. They weren't stupid.",
      sfx: [['pop', 'lehner'], ['pop', 'young'], ['ding', 'pattern', 0.3], ['bonk', 'bull', 0.3], ['boing', 'joke', 0.3]],
      draw(k) {
        flat(k, P.sky, P.sand);
        chap(k, 'Eight spears');
        card(k, 520, 230, ['LEHNER RANCH · ARIZONA', '13 points · ~12 mammoths'], 'lehner', { w: 700 });
        mammoth(k, 1450, G + 10, 640, { face: 'angry', p: k.at('lehner', 0.5) });
        redX(k, 1450, 620, 160, 'bull');
        mammoth(k, 760, G + 10, 300, { face: 'shock', p: k.at('young', 0.5) });
        k.ellipse(760, G + 10, 340, 60, { fill: '#6a4a32', fillStyle: 'solid', stroke: 'none', alpha: 0.7, seed: 8920, p: k.at('pattern', 0.5) });
        note(k, 'young · weak · stuck in mud', 760, 520, 'pattern', { size: 48 });
        k.text("brave, not stupid", 960, 980, { size: 66, font: 'title', color: P.orange, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 4: Weapons and tricks ----------------
    {
      chapter: 'Weapons and tricks',
      say: "{but}But could a stone point even get through mammoth skin? {frison}In the 1980s, archaeologist George Frison tested replica Clovis spears on African elephants that had been culled in Zimbabwe. {result}The points went through the thick hide, deep enough to reach vital organs. {sharp}A freshly flaked stone edge can be sharper than a steel blade.",
      sfx: [['pop', 'but'], ['pop', 'frison'], ['tada', 'result', 0.4], ['sparkle', 'sharp', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'Weapons and tricks');
        k.char(380, 1000, 440, { ...ARCH, face: 'happy', prop: 'spear', p: k.at('frison', 0.5) });
        card(k, 1380, 230, ['FRISON · ZIMBABWE · 1980s', 'replica Clovis spears vs. elephant hide'], 'frison', { w: 800 });
        k.rect(900, 420, 120, 360, { fill: '#8f8a84', fillStyle: 'solid', width: 5, seed: 8930 });
        k.text('HIDE', 960, 380, { size: 44, font: 'title', color: P.ink });
        const pr = k.at('result', 1.0);
        spear(k, 560, 600, k.lerp(860, 1180, pr), 600, { w: 12, seed: 8931 });
        big(k, 'SHARPER THAN STEEL', 1400, 900, 'sharp', { size: 76 });
      },
    },
    {
      say: "{secret}And many hunters had an upgrade: {atl}the spear-thrower, or atlatl. {how}It's a stick with a hook at the end that works like an extra-long arm, {fast}flinging a spear much faster and farther. {old}Spear-throwers in Europe go back at least seventeen thousand years. {safe}More speed, more distance, and a little more space between you and six tonnes of angry mammoth.",
      sfx: [['pop', 'secret'], ['tada', 'atl', 0.4], ['pop', 'how'], ['whoosh', 'fast', 0.5], ['pop', 'old'], ['boing', 'safe', 0.3]],
      draw(k) {
        steppe(k, { snow: false });
        chap(k, 'Weapons and tricks');
        const pf = k.at('fast', 1.0, 'in');
        k.char(380, G + 40, 460, { ...FUR(), face: 'angry', pose: pf > 0 ? { l: [-30, 10], r: [-120 + pf * 200, -60 + pf * 80] } : { l: [-30, 10], r: [-130, -60] }, p: k.at('atl', 0.5) });
        k.line(430, G - 380, 560, G - 430, { stroke: '#5a3a24', width: 10, rough: 0, seed: 8940, p: k.at('how', 0.5) });
        k.circle(560, G - 430, 12, { fill: '#5a3a24', fillStyle: 'solid', width: 3, seed: 8941, p: k.at('how', 0.5) });
        spear(k, k.lerp(500, 1300, pf), k.lerp(G - 440, G - 320, pf), k.lerp(700, 1500, pf), k.lerp(G - 480, G - 340, pf), { w: 9, seed: 8942, p: k.at('atl', 0.4) });
        if (pf > 0 && pf < 1) k.motion(k.lerp(500, 1300, pf) - 60, k.lerp(G - 440, G - 320, pf), -200, 0, { p: 1, n: 3 });
        mammoth(k, 1640, G + 10, 520, { flip: true, face: 'angry', p: k.at('safe', 0.5) });
        big(k, 'ATLATL', 960, 200, 'atl', { size: 100 });
        note(k, 'spear-thrower · ≥ 17,000 years (Europe)', 960, 310, 'old', { size: 44 });
      },
    },
    {
      say: "{team}Still, no one hunted a mammoth alone. {plan}It took a group: people to track, people to drive, people to throw. {terrain}Many researchers think hunters used the land itself, {bog}bogs, riverbanks, narrow valleys, to slow an animal down. {little}We have little direct proof of exactly how. {know}What we do know: it was teamwork.",
      sfx: [['pop', 'team'], ['pop', 'plan'], ['pop', 'terrain'], ['wahwah', 'bog', 0.25], ['pop', 'little'], ['ding', 'know', 0.4]],
      draw(k) {
        flat(k, '#cfe0ea', '#b9a878');
        chap(k, 'Weapons and tricks');
        k.ellipse(1300, G + 60, 620, 120, { fill: '#5a4a32', fillStyle: 'solid', width: 4, seed: 8950, p: k.at('bog', 0.5) });
        mammoth(k, 1300, G + 60 - k.at('bog', 0.8) * -30, 560, { face: k.t > k.cue('bog') ? 'shock' : 'angry', p: k.at('team', 0.5) });
        const ring = [[300, 'track'], [560, 'drive'], [820, 'throw']];
        ring.forEach(([x, t], i) => {
          k.char(x, G + 40, 330, { ...(i === 1 ? FURW() : FUR({ hairColor: ['#3a2a1e', '#1e1612', '#5a3a24'][i] })), face: 'blank', prop: i === 1 ? undefined : 'spear', pose: i === 1 ? 'shout' : 'stand', p: k.at(k.cue('plan', i * 0.4), 0.5) });
          note(k, t, x, G - 330, k.cue('plan', i * 0.4), { size: 44, color: P.red });
        });
        big(k, 'TEAMWORK', 960, 200, 'know', { size: 110, color: P.grass });
      },
    },
    {
      say: "{pits}In 2019, archaeologists at Tultepec, near Mexico City, announced two big pits holding more than eight hundred mammoth bones, from at least fourteen animals, about fifteen thousand years old. {trap}They argued the pits were traps dug by people. {doubt}Other researchers aren't convinced; the pits may be natural. {open}It's still debated.",
      sfx: [['pop', 'pits'], ['tada', 'trap', 0.3], ['bonk', 'doubt', 0.3], ['pop', 'open']],
      draw(k) {
        flat(k, '#e9c48a', '#a8865a');
        chap(k, 'Weapons and tricks');
        k.rect(560, G - 20, 800, 260, { fill: '#5a4030', fillStyle: 'solid', width: 5, seed: 8960, p: k.at('pits', 0.6) });
        for (let i = 0; i < 14; i++) k.ellipse(620 + (i % 7) * 105, G + 70 + Math.floor(i / 7) * 70, 80, 28, { fill: '#f1e8d4', fillStyle: 'solid', width: 3, seed: 8961 + i, p: k.at(k.cue('pits', 0.4 + i * 0.05), 0.3) });
        card(k, 960, 240, ['TULTEPEC · MEXICO · 2019', '824 bones · ≥ 14 mammoths · ~15,000 years'], 'pits', { w: 900 });
        big(k, 'TRAPS?', 560, 520, 'trap', { size: 100 });
        big(k, 'OR NATURAL?', 1260, 520, 'doubt', { size: 90, color: P.night });
        k.char(1780, G + 40, 330, { ...ARCH, face: 'blank', pose: 'shrug', p: k.at('open', 0.5) });
      },
    },
    {
      say: "{wolf}And out on that same frozen steppe, another team was hunting the same herds: {pack}wolves. {watch}They watched the hunters. {left}They followed the leftovers. {switch}And some of them would eventually switch sides. {next}That's the next episode.",
      sfx: [['pop', 'wolf'], ['pop', 'pack'], ['pop', 'watch'], ['pop', 'left'], ['sparkle', 'switch', 0.4], ['ding', 'next', 0.4]],
      draw(k) {
        night(k, { sky: '#2a3666', ground: '#d8c99a' });
        chap(k, 'Weapons and tricks', true);
        k.prop('campfire', 760, G - 30, 200, { fire: 1 });
        glow(k, 760, G - 80, 520, 0.35);
        k.char(560, G + 40, 360, { ...FUR(), face: 'happy', p: k.at('wolf', 0.5) });
        for (let i = 0; i < 3; i++) wolf(k, 1320 + i * 190, G + 10 - (i % 2) * 20, 260, { flip: true, eyes: k.t > k.cue('watch'), p: k.at(k.cue('pack', i * 0.2), 0.5) });
        k.prop('bone', 1000, G - 20, 120, { p: k.at('left', 0.5) });
        k.text('SWITCH SIDES?', 960, 220, { size: 90, font: 'title', color: P.yellow, fx: 'pop', p: k.at('switch', 0.4), outline: P.ink, outlineWidth: 14 });
        k.text('NEXT EPISODE', 960, 1010, { size: 70, font: 'title', color: P.orange, fx: 'pop', p: k.at('next', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 5: Was it worth it? ----------------
    {
      chapter: 'Was it worth it?',
      say: "{why}So why take the risk? {meat}One mammoth meant tonnes of meat, {fat}and even better, fat. Remember episode ten: in the cold, fat was fuel. {hide}Hide for shelter. {bone}Bones for building, and burning. {ivory}And ivory for tools.",
      sfx: [['pop', 'why'], ['pop', 'meat'], ['ding', 'fat', 0.4], ['pop', 'hide'], ['pop', 'bone'], ['pop', 'ivory']],
      draw(k) {
        paper(k);
        chap(k, 'Was it worth it?');
        mammoth(k, 960, 640, 560, { face: 'calm', p: k.at('why', 0.5) });
        const items = [['meat', 'MEAT', 380, 300], ['fat', 'FAT = FUEL', 380, 640], ['hide', 'HIDE', 1540, 260], ['bone', 'BONES', 1540, 520], ['ivory', 'IVORY', 1540, 780]];
        items.forEach(([c, t, x, y], i) => {
          if (c === 'meat') k.prop('meat', x, y - 60, 140, { p: k.at(c, 0.5) });
          if (c === 'bone') k.prop('bone', x - 220, y, 110, { p: k.at(c, 0.5) });
          k.text(t, x, y + 50, { size: c === 'fat' ? 80 : 64, font: 'title', color: c === 'fat' ? P.orange : P.red, fx: 'pop', p: k.at(c, 0.4), outline: '#fffaf0', outlineWidth: 10 });
          k.arrow(x < 960 ? x + 140 : x - 140, y, x < 960 ? 760 : 1160, 560, { stroke: P.brown, width: 5, p: k.at(c, 0.5), seed: 8970 + i });
        });
      },
    },
    {
      say: "{music}Even music. {flute}At Geissenklösterle cave in Germany, archaeologists found a flute carved from mammoth ivory, more than forty thousand years old. {hard}To make it, someone split a tusk, hollowed out both halves, and fitted them back together airtight. {joke}Someone hunted a mammoth, ate it, and then made a flute out of it.",
      sfx: [['sparkle', 'music', 0.4], ['tada', 'flute', 0.4], ['scratch', 'hard', 0.3], ['boing', 'joke', 0.3]],
      draw(k) {
        k.ctx.fillStyle = '#3a2e28'; k.ctx.fillRect(0, 0, k.W, k.H);
        chap(k, 'Was it worth it?', true);
        k.prop('campfire', 1500, 900, 200, { fire: 1 });
        glow(k, 1500, 820, 700, 0.3);
        const pf = k.at('flute', 0.6);
        k.rect(480, 480, 760 * pf, 70, { fill: '#f6eedc', fillStyle: 'solid', width: 5, seed: 8980, p: pf > 0.01 ? 1 : 0 });
        for (let i = 0; i < 3; i++) k.circle(620 + i * 200, 515, 14, { fill: '#3a2e28', fillStyle: 'solid', width: 3, seed: 8981 + i, p: k.at(k.cue('flute', 0.4), 0.3) });
        k.line(480, 515, 1240, 515, { stroke: P.red, width: 4, rough: 0, seed: 8984, p: k.at('hard', 0.8) });
        card(k, 860, 260, ['GEISSENKLÖSTERLE · GERMANY', 'mammoth-ivory flute · 40,000+ years'], 'flute', { w: 820 });
        k.char(1500, 1000, 360, { ...FURW(), face: 'happy', p: k.at('joke', 0.5) });
        for (let i = 0; i < 3; i++) k.text('♪', 1300 + i * 90, 640 - i * 50 - Math.sin((k.gt ?? 0) * 2 + i) * 14, { size: 70, color: P.yellow, p: k.at('joke', 0.4) });
      },
    },
    {
      say: "{dont}But don't imagine mammoth steak every night. {rare}For most hunter-gatherers, big game was a rare win. {days}Remember the hunters who succeeded about one day in thirty? {daily}Daily food was smaller animals, fish, and plants. {jack}A mammoth was a jackpot, not a habit.",
      sfx: [['bonk', 'dont', 0.3], ['pop', 'rare'], ['pop', 'days'], ['pop', 'daily'], ['cash', 'jack', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Was it worth it?');
        k.prop('calendar', 560, 520, 420, { text: '1/30', label: 'BIG GAME', p: k.at('days', 0.5) });
        const foods = [['fish', 1180, 420], ['tuber', 1420, 420], ['berries', 1660, 420]];
        foods.forEach(([n, x, y]) => k.prop(n, x, y, 150, { p: k.at('daily', 0.5) }));
        note(k, 'everyday food', 1420, 560, 'daily', { size: 50, color: P.grass });
        big(k, 'JACKPOT, NOT A HABIT', 960, 880, 'jack', { size: 84, color: P.orange });
      },
    },

    // ---------------- Chapter 6: Who killed the mammoths? ----------------
    {
      chapter: 'Who killed the mammoths?',
      say: "{big}Now the big question. {gone}Between about fifteen and ten thousand years ago, mammoths vanished from most of the world. {blame}Did your ancestors kill them all?",
      sfx: [['drumroll', 'big', 0.3], ['wahwah', 'gone', 0.3], ['bonk', 'blame', 0.3]],
      draw(k) {
        steppe(k, { snow: false });
        chap(k, 'Who killed the mammoths?');
        mammoth(k, 960, G + 10, 640, { face: 'calm', alpha: 1, p: 1 - k.at('gone', 1.2) * 0.85 });
        big(k, 'GONE', 960, 300, 'gone', { size: 140, color: P.night });
        k.char(380, G + 40, 420, { ...YOU, face: 'shock', p: k.at('blame', 0.5) });
        k.text('…us?', 520, 520, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('blame', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{martin}In the 1960s, the geoscientist Paul Martin proposed the overkill hypothesis: {arrive}humans arrive, {hunt}hunt hard, {fall}and the big animals vanish within centuries. {blitz}He called it a prehistoric blitzkrieg. {but}But the climate was changing too. {warm}As the Ice Age ended, the cold, dry grassland mammoths lived on, the mammoth steppe, shrank into forest, wetland and tundra.",
      sfx: [['pop', 'martin'], ['pop', 'arrive'], ['pop', 'hunt'], ['bonk', 'fall', 0.3], ['boom', 'blitz', 0.25], ['whoosh', 'but', 0.4], ['pop', 'warm']],
      draw(k) {
        paper(k);
        chap(k, 'Who killed the mammoths?');
        card(k, 500, 220, ['PAUL MARTIN · 1960s', 'the "overkill" hypothesis'], 'martin', { w: 640 });
        ['arrive', 'hunt', 'fall'].forEach((c, i) => {
          k.text(['HUMANS ARRIVE', 'HUNT HARD', 'GIANTS VANISH'][i], 500, 400 + i * 110, { size: 56, font: 'title', color: i === 2 ? P.red : P.ink, fx: 'pop', p: k.at(c, 0.4) });
          if (i < 2) k.text('↓', 500, 455 + i * 110, { size: 40, color: P.brown, p: k.at(c, 0.4) });
        });
        const pw = k.at('warm', 1.6, 'inOut');
        k.rect(1060, 300, 700, 520, { fill: '#d8c99a', fillStyle: 'solid', width: 5, seed: 8990, p: k.at('but', 0.5) });
        k.rect(1060, 300, 700 * pw, 520, { fill: '#4E9A45', fillStyle: 'solid', stroke: 'none', seed: 8991, p: pw > 0.01 ? 1 : 0 });
        for (let i = 0; i < 6; i++) k.prop('tree', 1120 + i * 115, 700, 120, { p: k.at(k.cue('warm', 0.3 + i * 0.2), 0.4) });
        k.text('MAMMOTH STEPPE', 1410, 260, { size: 50, font: 'title', color: P.brown, fx: 'pop', p: k.at('but', 0.4) });
        k.text('→ forest · wetland · tundra', 1410, 880, { size: 44, font: 'title', color: P.grass, fx: 'pop', p: k.at('warm', 0.4) });
      },
    },
    {
      say: "{both}Today, many researchers think it was both: {squeeze}warming shrank the herds, {final}and human hunting added pressure on the survivors. {test}And there's a test case. {stp}On St. Paul Island, in Alaska, mammoths survived until about fifty-six hundred years ago, {none}with no humans on the island at all. {water}A 2016 study found their freshwater lakes were shrinking. {thirst}They likely ran out of drinking water.",
      sfx: [['ding', 'both', 0.4], ['pop', 'squeeze'], ['pop', 'final'], ['drumroll', 'test', 0.3], ['pop', 'stp'], ['bonk', 'none', 0.3], ['pop', 'water'], ['wahwah', 'thirst', 0.3]],
      draw(k) {
        flat(k, P.sky, '#7FB5D5', 1000);
        chap(k, 'Who killed the mammoths?');
        big(k, 'CLIMATE + HUNTING', 960, 170, 'both', { size: 90 });
        k.ellipse(1150, 860, 1000, 300, { fill: '#b9a878', fillStyle: 'solid', width: 5, seed: 9000, p: k.at('stp', 0.6) });
        const pl = 1 - k.at('water', 1.6) * 0.7;
        k.ellipse(1450, 850, 260 * pl, 70 * pl, { fill: '#5b9bd5', fillStyle: 'solid', width: 4, seed: 9001, p: k.at('stp', 0.6) });
        mammoth(k, 1050, 860, 380, { face: k.t > k.cue('thirst') ? 'shock' : 'calm', p: k.at('stp', 0.6) });
        card(k, 1150, 400, ['ST. PAUL ISLAND · ALASKA', 'mammoths until ~5,600 years ago · no humans'], 'stp', { w: 880 });
        k.text('NO HUMANS', 520, 560, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('none', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.sweat(1150, 640, 1.4, { p: k.at('thirst', 0.4) });
      },
    },
    {
      say: "{last}And the very last mammoths? {wrangel}On Wrangel Island, off the Arctic coast of Siberia, they held on until about four thousand years ago. {pyr}The Great Pyramid of Giza was finished about forty-five hundred years ago. {so}So when the pyramid was brand new, mammoths were still alive. {joke}Nobody told the Egyptians.",
      sfx: [['pop', 'last'], ['pop', 'wrangel'], ['tada', 'pyr', 0.4], ['ding', 'so', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Who killed the mammoths?');
        k.line(160, 640, 1760, 640, { stroke: P.ink, width: 6, rough: 0, seed: 9010 });
        const tick = (x, label, cue, color) => { k.line(x, 610, x, 670, { stroke: color, width: 8, rough: 0, seed: 9011 + x, p: k.at(cue, 0.4) }); k.text(label, x, 720, { size: 42, font: 'title', color, p: k.at(cue, 0.4) }); };
        tick(560, '4,500 years ago', 'pyr', '#b5862e');
        tick(1160, '4,000 years ago', 'wrangel', P.red);
        tick(1700, 'today', 'last', P.ink);
        k.poly([[560, 360], [720, 590], [400, 590]], { fill: '#d9b26a', fillStyle: 'solid', width: 5, rough: 0, seed: 9015, p: k.at('pyr', 0.6) });
        mammoth(k, 1160, 590, 300, { face: 'happy', p: k.at('wrangel', 0.6) });
        card(k, 1160, 220, ['WRANGEL ISLAND · SIBERIA', 'the last mammoths'], 'wrangel', { w: 600 });
        big(k, 'MAMMOTHS + PYRAMIDS', 860, 900, 'so', { size: 84 });
        k.text('Nobody told the Egyptians.', 960, 1010, { size: 50, font: 'title', color: P.brown, fx: 'pop', p: k.at('joke', 0.4) });
      },
    },
    {
      say: "{dna}Their DNA tells a strange story. {small}After thousands of years on one small island, {mut}the last mammoths carried more harmful mutations than their mainland ancestors. {but}But a 2024 study suggests that's not what finished them. {sudden}The end seems to have come suddenly. {why}A disease? A bad winter? {open}Nobody knows yet.",
      sfx: [['pop', 'dna'], ['pop', 'small'], ['bonk', 'mut', 0.3], ['drumroll', 'but', 0.3], ['boom', 'sudden', 0.2], ['pop', 'why'], ['sparkle', 'open', 0.3]],
      draw(k) {
        night(k, { sky: '#22305a', ground: '#e8eef2', moon: false });
        chap(k, 'Who killed the mammoths?', true);
        for (let i = 0; i < 14; i++) {
          const y = 260 + i * 34, w = Math.sin(i * 0.6) * 120;
          k.line(560 - w, y, 560 + w, y, { stroke: i % 4 === 1 && k.t > k.cue('mut') ? P.red : '#9fd3ff', width: 8, rough: 0, seed: 9020 + i, p: k.at('dna', 0.6) });
        }
        k.curve(Array.from({ length: 15 }, (_, i) => [560 + Math.sin(i * 0.6) * 120, 260 + i * 34]), { stroke: '#fffaf0', width: 6, rough: 0, seed: 9040, p: k.at('dna', 0.8) });
        k.curve(Array.from({ length: 15 }, (_, i) => [560 - Math.sin(i * 0.6) * 120, 260 + i * 34]), { stroke: '#fffaf0', width: 6, rough: 0, seed: 9041, p: k.at('dna', 0.8) });
        mammoth(k, 1340, G + 10, 520, { face: k.t > k.cue('sudden') ? 'shock' : 'calm', fur: '#6a4a32', p: k.at('small', 0.5) });
        big(k, 'SUDDEN END', 1340, 300, 'sudden', { size: 90, color: '#ff9a8a', outline: P.ink });
        k.text('?', 1340, 470, { size: 140, font: 'title', color: P.yellow, fx: 'pop', p: k.at('open', 0.4), outline: P.ink, outlineWidth: 14 });
      },
    },

    // ---------------- Ending (echo) ----------------
    {
      chapter: 'Back to the frozen grass',
      say: "{back}So, back to that frozen grass. {six}Six tonnes of mammoth. {one}One spear in your hand. {thing}Here's what you didn't know at the start: {never}you were never meant to win alone. {friends}Your friends in the circle. {atl}The spear-thrower. {know}Knowledge passed down for thousands of years. {real}That was the real weapon.",
      sfx: [['whoosh', 'back', 0.4], ['pop', 'six'], ['pop', 'one'], ['pop', 'thing'], ['ding', 'never', 0.3], ['pop', 'friends'], ['pop', 'atl'], ['pop', 'know'], ['tada', 'real', 0.4]],
      draw(k) {
        steppe(k);
        mammoth(k, 1560, G + 10, 640, { flip: true, face: 'shock', p: k.at('six', 0.5) });
        k.char(560, G + 60, 470, { ...FUR(), face: k.t > k.cue('never') ? 'smug' : 'blank', prop: 'spear', p: k.at('one', 0.5) });
        for (let i = 0; i < 4; i++) k.char([150, 330, 740, 900][i], G + 40, 300, { ...(i % 2 ? FURW() : FUR({ hairColor: '#5a3a24' })), face: 'smug', prop: i % 2 ? undefined : 'spear', p: k.at(k.cue('friends', i * 0.15), 0.5) });
        grass(k, G + 20, 30);
        k.text('THE REAL WEAPON:', 960, 180, { size: 70, font: 'title', color: P.ink, fx: 'pop', p: k.at('real', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.text('EACH OTHER', 960, 290, { size: 110, font: 'title', color: P.red, fx: 'pop', p: k.at('real', 0.5), outline: '#fffaf0', outlineWidth: 16 });
      },
    },

    // ---------------- Recap ----------------
    {
      chapter: 'Recap',
      say: "{t}Quick recap. {a}Spears found inside giants prove people did hunt them. {b}Stone points, spear-throwers and teamwork made it possible. {c}Climate and hunting ended the mammoths, and the last survived past the pyramids. {remind}Next time: the wolves that switched sides.",
      sfx: [['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['ding', 'remind', 0.4]],
      draw(k) {
        paper(k);
        k.text('RECAP', 960, 130, { size: 80, font: 'title', color: P.red, p: k.at('t', 0.8, 'linear') });
        const rows = [['a', 'Spears inside giants → yes, they hunted'], ['b', 'Stone points · atlatls · teamwork'], ['c', 'Climate + hunting · last ones ~4,000 years ago'], ['remind', 'Next: wolves → dogs']];
        rows.forEach(([c, t], i) => {
          k.icon(i === 3 ? 'question' : 'check', 300, 290 + i * 170, 90, { p: k.at(c, 0.4) });
          k.text(t, 390, 300 + i * 170, { size: 56, font: 'title', align: 'left', p: k.at(c, 1.2, 'linear'), color: i === 3 ? P.red : P.ink, maxWidth: 1420 });
        });
      },
    },
    nextEpisodeScene({
      lang: 'en',
      say: "{next}Next episode: how did ancient humans tame wolves? {hook}One theory says it started with leftovers. {pup}And there's a puppy, fourteen thousand years old, that someone refused to give up on. {when}Coming soon.",
      title: 'How Did Ancient Humans Tame Wolves?',
      hook: 'It may have started with leftovers.',
      when: 'COMING SOON',
      art: (k) => {
        wolf(k, 90, 150, 300, { flip: true, face: 'happy' });
        k.char(-220, 150, 200, { ...ANC({ outfit: 'robe', color: '#8a6a4a' }), face: 'happy', pose: 'hold' });
        k.prop('bone', -60, 120, 80);
      },
      sfx: [['sparkle', 'hook', 0.3]],
    }),
    subscribeScene({
      lang: 'en',
      say: "{q}So who really killed the mammoths: your ancestors, or the climate? Pick a side in the comments. {sub}And subscribe, so you don't miss what happened next.",
      question: 'Who killed the mammoths: humans or climate?',
      channel: 'Long Story Drawn',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
