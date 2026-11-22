// Long Story Drawn — Ep 8: How Did Ancient Humans Go to the Toilet? (promised in Ep 7: rows of seats, no walls, a sponge on a stick; what before toilet paper?)
// Rules (kenh-ancient-humans): cold open pays off the poster promise; series + agenda ≤ 15 s; a re-hook every ~60 s; recap ≤ 15 s.
// Fact check:
//  Roman public latrines: long stone benches with keyhole seats, no partitions, water channel beneath, often fed by bath runoff; some had 20+ seats (Ostia).
//    Waste to sewers such as the Cloaca Maxima. Some latrines had shrines/graffiti to Fortuna (luck) — say "some".
//  Tersorium / xylospongium: sponge on a stick, mentioned by Seneca (Letter 70). Traditional view: wiped with it, rinsed in salt/vinegar water;
//    some scholars argue it may have cleaned the toilets rather than people — debated (say so).
//  Charlier et al. 2012 (BMJ, "Toilet hygiene in the classical era"): Greek pessoi (ceramic pebbles); Aristophanes: "three stones are enough to wipe";
//    abrasive → possible irritation / haemorrhoid complications. Not universally accepted.
//  Yeh & Mitchell 2016 (J. Archaeological Science: Reports 9): Xuanquanzhi relay station (Silk Road, ~2,000 years ago): hygiene sticks wrapped in cloth;
//    eggs of Chinese liver fluke (needs wet habitat ~1,500 km away) → earliest evidence of travel with infectious disease on the Silk Road.
//  China: Yan Zhitui (6th century) wrote he dared not use paper bearing quotations from the Five Classics "for toilet purposes".
//    1393 records: 720,000 sheets (~2×3 ft) a year for the court at Nanjing; 15,000 extra soft, perfumed sheets for the imperial family (Needham).
//  Joseph Gayetty, 1857 (US): first commercially packaged toilet paper ("medicated paper"), his name printed on each sheet.
//  Mohenjo-daro (~2500 BC): many houses had toilets / bathing platforms draining into covered street drains.
//  Paisley Caves, Oregon (Gilbert et al. 2008, Science): coprolites with human mtDNA, ~14,300 calendar years old → pre-Clovis people; debated
//    (some coprolites contested; Shillito et al. 2020 supported three as human).
//  Lloyds Bank coprolite, York (found 1972, 9th century Viking-era): ~20 cm; full of cereal bran; eggs of whipworm and roundworm; Jorvik Viking Centre.
//  Garderobes in medieval castles: chute through the wall. "Clothes hung there because ammonia kept moths away" — popular explanation (say so).
//  Sir John Harington, 1596: flushing toilet "Ajax" for Elizabeth I. Alexander Cumming, 1775: S-bend trap patent.
//  Sikirov 2003 (Digestive Diseases and Sciences): small study, squatting → faster, less straining (say "one small study").
//  BMJ 2007 readers' poll: the "sanitary revolution" voted the greatest medical milestone since 1840.
//  WHO/UNICEF JMP 2025: ~3.4 billion people lack safely managed sanitation; ~354 million still practise open defecation (2024).
//  Next episode (Ep 9): Gurven & Kaplan 2007 — hunter-gatherer life expectancy at birth ~30–37, but adults who survive childhood often reach
//    their late 60s–70s (modal adult age at death ~68–78); Caspari & Lee 2004 (PNAS): ratio of older to younger adults jumped in the Upper Paleolithic.
//    Poster: COMING SOON.
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import { P, G, YOU, ANC, ANCW, KID, SCI, flat, savanna, night, paper, chap, big, note, redX, card, glow } from '/channel/long-story-drawn.js';
import * as thumbs from '/videos/056-how-ancient-humans-went-to-the-toilet/thumbs.js';

const ROMAN = { body: 'man', outfit: 'robe', color: '#f5f1e6', color2: '#b03a2e', hair: 'short', hairColor: '#3a2a1e', skin: '#e0b48a' };
const ROMAN2 = { ...ROMAN, color: '#c9d3e8', color2: '#5a6b8a' };
const ROMAN3 = { ...ROMAN, color: '#e8d8b8', color2: '#8B5A2B', hair: 'bald' };
const GREEK = { body: 'man', outfit: 'tunic', color: '#e8e0d0', color2: '#3b6ea5', hair: 'short', hairColor: '#3a2a1e', skin: '#e0b48a', beard: true, beardColor: '#3a2a1e' };
const HAN = { body: 'man', outfit: 'robe', color: '#8a3a2a', color2: '#2b2b2b', hair: 'topknot', hairColor: '#1b1b1b', skin: '#e8c08a' };
const MING = { body: 'big', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hair: 'topknot', hat: 'crown', skin: '#e8c08a', beard: true, beardColor: '#1b1b1b' };
const KNIGHT = { body: 'man', outfit: 'tunic', color: '#6a6a7a', color2: '#b03a2e', hair: 'short', hairColor: '#7a4a2a', skin: '#f0c8a0' };
const QUEEN = { body: 'woman', outfit: 'dress', color: '#b03a2e', color2: P.yellow, hair: 'bun', hairColor: '#c0602a', skin: '#f5d8b8', hat: 'crown' };
const HARING = { body: 'man', outfit: 'robe', color: '#2b2b33', color2: '#c9c4bb', hair: 'short', hairColor: '#5a4a3a', beard: true, beardColor: '#5a4a3a', skin: '#f0c8a0' };
const ARCH = SCI({ color: '#c2a46b' });

// Nhà xí công cộng La Mã: tường, ghế đá dài có lỗ, kênh nước.
function latrine(k, o = {}) {
  paper(k, '#e9dcc4');
  const { ctx } = k;
  ctx.fillStyle = '#d9c8a8'; ctx.fillRect(0, G, k.W, k.H - G);
  for (const x of [120, 1800]) k.rect(x - 40, 140, 80, G - 140, { fill: '#f5efe0', fillStyle: 'solid', width: 5, seed: 5600 + x });
  k.rect(0, 100, k.W, 50, { fill: '#c9b48a', fillStyle: 'solid', width: 5, seed: 5603 });
  const y = o.y ?? 640, n = o.n ?? 6, x0 = o.x0 ?? 300, w = o.w ?? 1320;
  k.rect(x0, y, w, 70, { fill: '#e8dcc4', fillStyle: 'solid', width: 5, seed: 5604 });
  k.rect(x0, y + 70, w, 150, { fill: '#d8c8a8', fillStyle: 'solid', width: 5, seed: 5605 });
  for (let i = 0; i < n; i++) k.ellipse(x0 + (i + 0.5) * (w / n), y + 26, 90, 30, { fill: '#3b2f2a', fillStyle: 'solid', width: 3, seed: 5606 + i });
  ctx.fillStyle = '#7FB5D5'; ctx.fillRect(x0, y + 220, w, 40);
}
// Người ngồi trên ghế xí (chỉ thấy nửa trên).
function sitter(k, x, y, preset, o = {}) {
  k.char(x, y + 30, o.h ?? 300, { ...preset, shadow: false, face: o.face ?? 'happy', pose: o.pose ?? 'stand', flip: o.flip, p: o.p ?? 1 });
}
function sponge(k, x, y, s, o = {}) {
  k.line(x, y + s, x + s * 0.12, y - s * 0.35, { stroke: P.brown, width: Math.max(6, s * 0.05), seed: 5620, p: o.p ?? 1 });
  k.ellipse(x + s * 0.14, y - s * 0.45, s * 0.36, s * 0.26, { fill: P.yellow, fillStyle: 'solid', width: 5, seed: 5621, p: o.p ?? 1 });
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    title: 'How Did Ancient Humans Go to the Toilet?',
    description: `You walk into a public toilet in ancient Rome. No doors, no walls — just a long stone bench, a row of strangers, and a sponge on a stick. What was it for?
How did ancient humans go to the toilet, and what did they wipe with before toilet paper? Greek pebbles, Silk Road hygiene sticks, the emperor's perfumed paper, and the ancient poop that is rewriting history. Episode 8 of "How your ancestors actually lived".`,
    footer: `📚 Sources: Charlier et al. (2012, BMJ), "Toilet hygiene in the classical era"; Yeh & Mitchell (2016, Journal of Archaeological Science: Reports), Xuanquanzhi hygiene sticks; Needham, Science and Civilisation in China (toilet paper, 1393); Gilbert et al. (2008, Science), Paisley Caves coprolites; Lloyds Bank coprolite, York Archaeological Trust; Sikirov (2003, Digestive Diseases and Sciences); BMJ medical milestones poll (2007); WHO/UNICEF Joint Monitoring Programme (2025).
🚽 Previous episode: How Did Ancient Humans Stay Clean Without Soap? Next: How Long Did Ancient Humans Actually Live?`,
    tags: ['how did ancient humans go to the toilet', 'what did people use before toilet paper', 'roman toilets', 'sponge on a stick', 'tersorium', 'history of toilet paper', 'ancient greek toilet', 'pessoi', 'silk road hygiene sticks', 'coprolites', 'ancient poop', 'history of toilets', 'medieval toilets', 'garderobe', 'ancient rome', 'ancient humans', 'human history', 'prehistory', 'archaeology', 'early humans', 'animated history', 'history explained', 'how people lived', 'long story drawn'],
    hashtags: ['ancienthumans', 'history', 'archaeology'],
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
      say: "{need}You need to go. {walk}You walk into a public toilet in ancient Rome. {no}No doors. No walls. {bench}Just a long stone bench full of holes, {crowd}and a row of strangers sitting shoulder to shoulder, chatting. {sponge}Next to you, in a bucket of water: a sponge on a stick. {q}What is it for?",
      sfx: [['pop', 'need'], ['whoosh', 'walk', 0.4], ['bonk', 'no', 0.3], ['pop', 'bench'], ['pop', 'crowd'], ['drumroll', 'sponge', 0.3], ['boing', 'q', 0.3]],
      draw(k) {
        latrine(k);
        k.text('NO DOORS. NO WALLS.', 960, 230, { size: 90, font: 'title', color: P.red, fx: 'pop', p: k.at('no', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        const ppl = [ROMAN, ROMAN2, ROMAN3, ROMAN, ROMAN2];
        ppl.forEach((pr, i) => sitter(k, 410 + i * 220, 640, pr, { face: i === 2 ? 'laugh' : 'happy', p: k.at(k.cue('crowd', i * 0.15), 0.4) }));
        k.char(1560, G + 30, 420, { ...YOU, face: k.t > k.cue('sponge') ? 'shock' : 'blank', p: k.at('walk', 0.5) });
        k.rect(1660, 760, 120, 110, { fill: '#8a6a4a', fillStyle: 'solid', width: 5, seed: 5630, p: k.at('sponge', 0.5) });
        sponge(k, 1700, 640, 200, { p: k.at('sponge', 0.5) });
        k.icon('question', 1760, 380, 120, { p: k.at('q', 0.5), stroke: P.red });
      },
    },
    {
      say: "{series}This is episode eight of How Your Ancestors Actually Lived. {today}Today: {a}what that sponge was really for, {b}what people wiped with before toilet paper, {c}and how ancient poop is rewriting history. {sub}Subscribe if you want the next one.",
      sfx: [['pop', 'series'], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'sub', 0.5]],
      draw(k) {
        paper(k);
        note(k, 'HOW YOUR ANCESTORS ACTUALLY LIVED · Ep. 8', 960, 130, 'series', { size: 52, color: P.brown });
        const items = [['a', 'THE SPONGE', 'sponge'], ['b', 'BEFORE PAPER', 'scroll'], ['c', 'POOP HISTORY', 'rock']];
        items.forEach(([c, t, prop], i) => {
          const x = 420 + i * 540, p = k.at(c, 0.5);
          k.group({ x, y: 560, r: i % 2 ? 0.03 : -0.03, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-210, -220, 420, 440, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 5640 + i });
            if (prop === 'sponge') sponge(k, -20, -60, 150); else k.prop(prop, 0, -50, 200, { fill: '#8a6a4a' });
            k.text(t, 0, 150, { size: 48, font: 'title', color: P.red, maxWidth: 380 });
          });
        });
        k.char(1760, 1060, 300, { ...YOU, face: 'happy', pose: 'wave', p: k.at('sub', 0.5) });
      },
    },

    // ---------------- Chapter 1: The Roman latrine ----------------
    {
      chapter: 'The Roman latrine',
      say: "{social}Roman public latrines were social places. {rows}Long rows of seats, some with twenty places or more, {water}set over a channel of running water, {baths}often fed by the overflow from the public baths. {sewer}The water carried everything off to the sewers, like Rome's great drain, the Cloaca Maxima. {chat}So you'd sit, chat with your neighbors, maybe talk business. {joke}Networking, Roman style.",
      sfx: [['pop', 'social'], ['pop', 'rows'], ['whoosh', 'water', 0.4], ['pop', 'baths'], ['whoosh', 'sewer', 0.4], ['pop', 'chat'], ['boing', 'joke', 0.3]],
      draw(k) {
        latrine(k, { n: 8, x0: 240, w: 1440 });
        chap(k, 'The Roman latrine');
        const ppl = [ROMAN, ROMAN2, ROMAN3, ROMAN2, ROMAN, ROMAN3];
        ppl.forEach((pr, i) => sitter(k, 330 + i * 180 + (i > 2 ? 180 : 0), 640, pr, { face: i % 2 ? 'laugh' : 'happy', pose: i === 1 ? 'present' : 'stand', p: k.at(k.cue('rows', i * 0.12), 0.4) }));
        note(k, '20+ seats', 960, 220, 'rows', { size: 64, color: P.red, fx: 'pop' });
        const u = ((k.gt ?? 0) * 0.5) % 1;
        k.text('→ → → CLOACA MAXIMA', 960, 900, { size: 46, font: 'title', color: '#2a5a8a', fx: 'fade', p: k.at('sewer', 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.dot(240 + u * 1440, 880, 12, '#ffffff', k.at('water', 0.5));
        k.text('NETWORKING', 960, 330, { size: 80, font: 'title', color: P.orange, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{luck}And some latrines had little shrines and graffiti for Fortuna, the goddess of luck. {why}Why would you need luck on the toilet? {rats}Rats lived in the sewers below. {dark}And these places could be dark, damp and smelly. {plumb}And remember the last episode: despite all this plumbing, gut worms didn't go down under Roman rule. {joke}The Romans engineered the toilet. They just didn't solve the germs.",
      sfx: [['sparkle', 'luck', 0.4], ['pop', 'why'], ['bonk', 'rats', 0.3], ['pop', 'dark'], ['pop', 'plumb'], ['wahwah', 'joke', 0.3]],
      draw(k) {
        latrine(k, { n: 5, x0: 420, w: 1080 });
        chap(k, 'The Roman latrine');
        k.rect(160, 260, 260, 300, { fill: '#c9b48a', fillStyle: 'solid', width: 5, seed: 5650, p: k.at('luck', 0.5) });
        k.text('FORTUNA', 290, 330, { size: 44, font: 'title', color: P.brown, p: k.at('luck', 0.5) });
        k.icon('star', 290, 440, 110, { p: k.at('luck', 0.5) });
        k.text('LUCK NEEDED?', 960, 230, { size: 80, font: 'title', color: P.red, fx: 'pop', p: k.at('why', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        for (let i = 0; i < 3; i++) k.ellipse(600 + i * 300, 960, 70, 36, { fill: '#5a5a5a', fillStyle: 'solid', width: 3, seed: 5651 + i, p: k.at(k.cue('rats', i * 0.2), 0.4) });
        note(k, 'rats below', 900, 1040, 'rats', { size: 44, color: '#5a5a5a', fx: 'pop' });
        sitter(k, 960, 640, ROMAN, { face: k.t > k.cue('rats') ? 'shock' : 'calm' });
        k.text('worms: still there', 1500, 400, { size: 54, font: 'title', color: P.red, fx: 'pop', p: k.at('plumb', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{sponge}Now, the sponge on a stick. {name}The Romans called it a tersorium. {seneca}The philosopher Seneca mentions one in a letter. {old}The classic story: you wiped with it, {rinse}rinsed it in a bucket of salt water or vinegar, {next}and left it for the next person. {but}But some archaeologists now argue it may have been for cleaning the toilet itself, not the person. {know}Honestly? Nobody knows for sure. {joke}Either way: don't borrow it.",
      sfx: [['drumroll', 'sponge', 0.3], ['pop', 'name'], ['pop', 'seneca'], ['pop', 'old'], ['whoosh', 'rinse', 0.4], ['bonk', 'next', 0.3], ['ding', 'but', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'The Roman latrine');
        sponge(k, 380, 620, 420, { p: k.at('sponge', 0.5) });
        big(k, 'TERSORIUM', 380, 200, 'name', { size: 90 });
        card(k, 1340, 200, ['SENECA', 'mentions one in a letter'], 'seneca', { w: 600 });
        note(k, 'THEORY 1: wipe → rinse → next person', 1340, 400, 'old', { size: 46, color: P.red, fx: 'pop' });
        k.rect(1180, 470, 320, 140, { fill: '#c9d3e8', fillStyle: 'solid', width: 5, p: k.at('rinse', 0.5), seed: 5660 });
        note(k, 'salt water / vinegar', 1340, 650, 'rinse', { size: 40 });
        note(k, 'THEORY 2: it cleaned the toilet', 1340, 760, 'but', { size: 46, color: P.grass, fx: 'pop' });
        k.text('(nobody knows)', 1340, 860, { size: 50, font: 'title', color: '#6b5f55', fx: 'fade', p: k.at('know', 0.5) });
        k.text("DON'T BORROW IT", 960, 1010, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 2: Before toilet paper ----------------
    {
      chapter: 'Before toilet paper',
      say: "{greek}So what did people wipe with? {greece}In ancient Greece, one answer was: pebbles. {pessoi}Small ceramic pieces called pessoi, often cut from broken pots. {aris}The playwright Aristophanes even has a line: three stones are enough to wipe. {bmj}In 2012, a team of doctors writing in the BMJ suggested that using them for years could cause irritation, {ouch}and even trouble with hemorrhoids. {joke}Ancient Greece: brilliant philosophy, tough on the backside.",
      sfx: [['pop', 'greek'], ['pop', 'greece'], ['pop', 'pessoi'], ['pop', 'aris'], ['pop', 'bmj'], ['bonk', 'ouch', 0.3], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k, '#f3e7cf');
        chap(k, 'Before toilet paper');
        k.char(330, 980, 440, { ...GREEK, face: k.t > k.cue('ouch') ? 'shock' : 'calm', pose: 'hold', p: k.at('greece', 0.5) });
        for (let i = 0; i < 3; i++) k.prop('rock', 760 + i * 170, 520, 140, { fill: '#c97a4a', p: k.at(k.cue('pessoi', i * 0.2), 0.4) });
        big(k, 'PESSOI', 930, 340, 'pessoi', { size: 100 });
        note(k, '"Three stones are enough to wipe." — Aristophanes', 1200, 700, 'aris', { size: 46, maxWidth: 1300 });
        card(k, 1460, 220, ['CHARLIER ET AL., 2012', 'BMJ · "Toilet hygiene…"'], 'bmj', { w: 640 });
        note(k, 'irritation · hemorrhoids?', 1300, 840, 'ouch', { size: 52, color: P.red, fx: 'pop' });
        k.text('great philosophy · tough on the backside', 1100, 1010, { size: 48, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 8 });
      },
    },
    {
      say: "{silk}On China's Silk Road, about two thousand years ago, travelers at a relay station called Xuanquanzhi used hygiene sticks, {cloth}wooden sticks wrapped in cloth. {study}In 2016, Hui-Yuan Yeh and Piers Mitchell examined the poop still stuck to them. {eggs}They found eggs of the Chinese liver fluke, {wet}a parasite that needs wet, marshy land. {far}The nearest place it lived was roughly fifteen hundred kilometers away. {travel}So someone had carried that infection all the way along the Silk Road. {first}It's the earliest evidence of a disease traveling the Silk Road. {joke}Found on a used toilet stick.",
      sfx: [['whoosh', 'silk', 0.4], ['pop', 'cloth'], ['pop', 'study'], ['drumroll', 'eggs', 0.3], ['pop', 'wet'], ['whoosh', 'far', 0.4], ['tada', 'first', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        flat(k, '#f0d9a0', '#d8b880');
        chap(k, 'Before toilet paper');
        card(k, 520, 190, ['XUANQUANZHI · SILK ROAD', '~2,000 years ago'], 'silk', { w: 640 });
        for (let i = 0; i < 3; i++) {
          k.line(260 + i * 120, 620, 300 + i * 120, 380, { stroke: P.brown, width: 12, seed: 5670 + i, p: k.at('cloth', 0.5) });
          k.rect(272 + i * 120, 380, 36, 80, { fill: '#d9d4cb', fillStyle: 'solid', width: 3, seed: 5673 + i, p: k.at('cloth', 0.5) });
        }
        card(k, 1380, 190, ['YEH & MITCHELL, 2016', 'J. Archaeological Science'], 'study', { w: 640, r: 0.02, seed: 5676 });
        for (let i = 0; i < 5; i++) k.ellipse(1180 + i * 90, 420, 50, 32, { fill: '#c9a07a', fillStyle: 'solid', width: 3, seed: 5680 + i, p: k.at(k.cue('eggs', i * 0.15), 0.4) });
        note(k, 'Chinese liver fluke eggs', 1380, 500, 'eggs', { size: 46, color: P.red, fx: 'pop' });
        k.line(1700, 760, k.lerp(1700, 900, k.at('far', 1)), 760, { stroke: P.orange, width: 8, seed: 5690 });
        k.poly([[880, 760], [920, 735], [920, 785]], { fill: P.orange, fillStyle: 'solid', stroke: P.orange, width: 4, p: k.at('far', 1) > 0.95 ? 1 : 0, seed: 5691 });
        note(k, '~1,500 km', 1200, 690, 'far', { size: 56, color: P.orange, fx: 'pop' });
        k.char(760, G + 30, 340, { ...HAN, face: 'happy', walk: k.t > k.cue('travel'), p: k.at('travel', 0.5) });
        k.text('EARLIEST DISEASE ON THE SILK ROAD', 1200, 980, { size: 54, font: 'title', color: P.red, fx: 'pop', p: k.at('first', 0.4), outline: '#fffaf0', outlineWidth: 10, maxWidth: 1300 });
      },
    },
    {
      say: "{paper}China also invented paper, and with it, toilet paper. {yan}In the sixth century, the scholar Yan Zhitui wrote that he would not dare use paper with quotations from the classics for toilet purposes. {so}Which tells you other paper was being used exactly like that. {ming}By 1393, records say the imperial court at Nanjing used seven hundred and twenty thousand sheets a year, {size}each roughly two feet by three. {vip}Plus fifteen thousand extra sheets, soft and perfumed, just for the emperor's family. {joke}VIP toilet paper.",
      sfx: [['pop', 'paper'], ['pop', 'yan'], ['boing', 'so', 0.3], ['drumroll', 'ming', 0.3], ['pop', 'size'], ['sparkle', 'vip', 0.4], ['tada', 'joke', 0.4]],
      draw(k) {
        paper(k, '#f6e7c1');
        chap(k, 'Before toilet paper');
        k.char(320, 980, 420, { ...HAN, face: 'smug', pose: 'hold', prop: 'scroll', p: k.at('paper', 0.5) });
        k.text('CHINA: PAPER → TOILET PAPER', 1100, 560, { size: 56, font: 'title', color: P.brown, fx: 'pop', p: k.at('paper', 0.4) * (1 - k.at('ming', 0.3)), outline: '#fffaf0', outlineWidth: 10 });
        card(k, 420, 200, ['YAN ZHITUI', '6th century'], 'yan', { w: 480 });
        note(k, '"not the classics!"', 420, 330, 'so', { size: 48, color: P.red, fx: 'pop' });
        k.char(1460, 1000, 460, { ...MING, face: 'smug', pose: 'present', p: k.at('ming', 0.5) });
        big(k, '720,000 SHEETS', 1260, 220, 'ming', { size: 92 });
        note(k, 'a year · Nanjing court · 1393', 1260, 320, 'ming', { size: 44, color: P.brown });
        for (let i = 0; i < 6; i++) k.rect(820 + (i % 3) * 120, 460 + Math.floor(i / 3) * 100, 100, 80, { fill: '#fffaf0', fillStyle: 'solid', width: 3, seed: 5700 + i, p: k.at(k.cue('size', i * 0.1), 0.3) });
        k.rect(1100, 500, 140, 110, { fill: '#f6c3d0', fillStyle: 'solid', width: 4, seed: 5710, p: k.at('vip', 0.5) });
        note(k, '+15,000 perfumed', 1170, 660, 'vip', { size: 44, color: '#c0607a', fx: 'pop' });
        k.text('VIP TOILET PAPER', 960, 1010, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{rest}Most of the world, for most of history, made do with whatever was around: {leaves}leaves, {moss}moss, {snow}snow, {shells}shells, {corn}and in parts of rural America, dried corncobs. {water}And billions of people today still prefer water, not paper. {gay}The first toilet paper sold in a package only appeared in 1857, in the United States. {name}Joseph Gayetty printed his name on every sheet. {joke}A bold branding choice.",
      sfx: [['pop', 'rest'], ['pop', 'leaves'], ['pop', 'moss'], ['pop', 'snow'], ['pop', 'shells'], ['boing', 'corn', 0.3], ['whoosh', 'water', 0.4], ['pop', 'gay'], ['wahwah', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Before toilet paper');
        const opts = [['leaves', 'tree', 'leaves', '#5aa74a'], ['moss', 'grassbed', 'moss', null], ['snow', 'cloud', 'snow', null], ['shells', 'oyster', 'shells', null], ['corn', 'tuber', 'corncobs', '#e8c040']];
        opts.forEach(([c, prop, t, fill], i) => {
          const x = 220 + i * 370;
          k.prop(prop, x, 360, 150, { p: k.at(c, 0.5), fill });
          note(k, t, x, 480, c, { size: 48, fx: 'pop' });
        });
        k.icon('heart', 400, 720, 110, { p: k.at('water', 0.5), fill: '#7FB5D5' });
        note(k, 'billions still use water', 400, 840, 'water', { size: 48, color: '#2a5a8a', fx: 'pop' });
        card(k, 1360, 720, ['JOSEPH GAYETTY · 1857', 'first packaged toilet paper'], 'gay', { w: 680 });
        k.text('his name on every sheet', 1360, 900, { size: 50, font: 'title', color: P.red, fx: 'pop', p: k.at('name', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.text('(bold branding)', 1360, 990, { size: 46, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 8 });
      },
    },
    {
      say: "{dirty}All of this had a cost. {kids}Without clean toilets and clean water, diseases spread through dirty water and food, {young}and the youngest children suffered most. {myth}Which is why you've probably heard that ancient people all died at thirty. {really}Is that true? {next}That's the next episode.",
      sfx: [['pop', 'dirty'], ['bonk', 'kids', 0.3], ['pop', 'young'], ['drumroll', 'myth', 0.3], ['pop', 'really'], ['sparkle', 'next', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'Before toilet paper');
        k.text('DIED AT 30?', 960, 300, { size: 140, font: 'title', color: P.red, fx: 'pop', p: k.at('myth', 0.4), outline: '#fffaf0', outlineWidth: 18 });
        for (let i = 0; i < 5; i++) k.char(560 + i * 200, 900, 220, { ...KID, face: 'calm', shadow: false, alpha: i > 2 ? 0.5 : 1, p: k.at(k.cue('kids', i * 0.15), 0.4) });
        k.icon('question', 1560, 560, 140, { p: k.at('really', 0.5), stroke: P.red });
        k.text('NEXT EPISODE', 960, 1010, { size: 76, font: 'title', color: P.orange, fx: 'pop', p: k.at('next', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 3: The first toilets ----------------
    {
      chapter: 'The first toilets',
      say: "{move}For hunter-gatherers who moved camp every few weeks, toilets weren't much of a problem. {leave}You simply left it all behind. {stay}The trouble started when people settled down in villages and towns, {pile}and the waste started piling up. {moh}One early answer: Mohenjo-daro, in the Indus Valley, around 2500 BC. {homes}Many houses there had their own toilet or bathing area, {drains}draining into covered sewers along the streets. {joke}Four and a half thousand years ago. Better than some festivals today.",
      sfx: [['pop', 'move'], ['whoosh', 'leave', 0.4], ['pop', 'stay'], ['bonk', 'pile', 0.3], ['pop', 'moh'], ['pop', 'homes'], ['ding', 'drains', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        const town = k.at('moh', 0.6);
        k.group({ a: 1 - town }, () => {
          savanna(k, { trees: [[1700, 380]] });
          chap(k, 'The first toilets');
          k.char(500, G + 30, 380, { ...ANC(), face: 'happy', walk: true, prop: 'spear' });
          k.char(760, G + 30, 360, { ...ANCW(), face: 'happy', walk: true });
          note(k, 'move camp → leave it behind', 960, 220, 'leave', { size: 56, fx: 'pop' });
          k.text('SETTLE DOWN → IT PILES UP', 960, 330, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at('pile', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        });
        k.group({ a: town }, () => {
          flat(k, '#f0d9a0', '#c9a07a');
          chap(k, 'The first toilets');
          card(k, 520, 190, ['MOHENJO-DARO', 'Indus Valley · ~2500 BC'], 'moh', { w: 560 });
          for (let i = 0; i < 4; i++) k.rect(220 + i * 380, 420, 300, 320, { fill: '#c98a5a', fillStyle: 'solid', width: 5, seed: 5720 + i, p: k.at(k.cue('homes', i * 0.15), 0.4) });
          k.rect(120, 800, 1680, 50, { fill: '#7a6a5a', fillStyle: 'solid', width: 5, seed: 5725, p: k.at('drains', 0.5) });
          note(k, 'covered street drains', 960, 900, 'drains', { size: 52, color: P.ink, fx: 'pop' });
          k.text('better than some festivals', 1400, 200, { size: 54, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        });
      },
    },

    // ---------------- Chapter 4: Poop archaeology ----------------
    {
      chapter: 'Poop archaeology',
      say: "{arch}And here's the twist: archaeologists love old toilets. {poop}Ancient poop, called coprolites, can survive for thousands of years. {paisley}In the Paisley Caves of Oregon, researchers found dried human feces about fourteen thousand three hundred years old, {dna}with human DNA inside. {clovis}That made it one of the earliest signs of people in the Americas, older than the famous Clovis culture. {debate}Some of the samples are still debated. {joke}But yes: one of the oldest clues about the first Americans is a poop.",
      sfx: [['drumroll', 'arch', 0.3], ['pop', 'poop'], ['pop', 'paisley'], ['sparkle', 'dna', 0.4], ['tada', 'clovis', 0.4], ['boing', 'debate', 0.3], ['wahwah', 'joke', 0.3]],
      draw(k) {
        flat(k, '#c9b89a', '#8a7a5a');
        chap(k, 'Poop archaeology');
        k.prop('cave', 520, 560, 640);
        k.char(1000, G + 30, 420, { ...ARCH, face: k.t > k.cue('dna') ? 'shock' : 'happy', pose: 'hold', p: k.at('arch', 0.5) });
        k.prop('rock', 1000, G - 230, 110, { fill: '#6b4a33', p: k.at('poop', 0.5) });
        big(k, 'COPROLITES', 960, 200, 'poop', { size: 90 });
        card(k, 1480, 380, ['PAISLEY CAVES · OREGON', 'Gilbert et al. · Science, 2008'], 'paisley', { w: 680 });
        note(k, '~14,300 years · human DNA', 1480, 540, 'dna', { size: 50, color: P.red, fx: 'pop' });
        note(k, 'older than Clovis', 1480, 630, 'clovis', { size: 52, color: P.grass, fx: 'pop' });
        note(k, '(some samples debated)', 1480, 710, 'debate', { size: 42, color: '#6b5f55' });
        k.text('the first Americans: a poop', 960, 1010, { size: 58, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{york}In York, England, there's a famous one. {lloyds}Found in 1972 under a Lloyds Bank, {viking}left by someone in the Viking age, over a thousand years ago. {size}It's about twenty centimeters long. {inside}Inside: lots of cereal bran, so a diet heavy on bread, {worms}and hundreds of eggs from whipworm and roundworm. {museum}It's now in a museum. {joke}In 2003 it was dropped and broke into three pieces. It's been glued back together.",
      sfx: [['pop', 'york'], ['pop', 'lloyds'], ['pop', 'viking'], ['drumroll', 'size', 0.3], ['pop', 'inside'], ['bonk', 'worms', 0.3], ['ding', 'museum', 0.4], ['bonk', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Poop archaeology');
        card(k, 520, 200, ['LLOYDS BANK COPROLITE', 'York · found 1972 · Viking age'], 'lloyds', { w: 700 });
        k.group({ x: 960, y: 520, r: -0.05 }, () => {
          k.ellipse(0, 0, 600 * k.at('size', 0.6) + 1, 130, { fill: '#6b4a33', fillStyle: 'solid', width: 6, seed: 5730, p: k.at('size', 0.5) });
        });
        k.line(660, 640, 1260, 640, { stroke: P.red, width: 5, seed: 5731, p: k.at('size', 0.6) });
        note(k, '~20 cm', 960, 700, 'size', { size: 60, color: P.red, fx: 'pop' });
        note(k, 'bran → lots of bread', 520, 840, 'inside', { size: 48, fx: 'pop' });
        note(k, 'whipworm + roundworm eggs', 1400, 840, 'worms', { size: 48, color: P.red, fx: 'pop' });
        k.text('dropped in 2003 · glued back', 960, 1000, { size: 56, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 5: Castles and flushes ----------------
    {
      chapter: 'Castles and flushes',
      say: "{castle}Medieval castles had toilets too, called garderobes. {chute}Usually a seat over a chute that dropped straight down the outside wall, {moat}sometimes into the moat. {attack}Which is one more reason not to climb a castle wall. {clothes}There's a popular explanation for the name: people hung clothes in there, {moths}because the smell of ammonia kept the moths away. {maybe}Historians aren't sure that's true. {joke}But it's a great reason not to borrow a medieval coat.",
      sfx: [['pop', 'castle'], ['whoosh', 'chute', 0.4], ['bonk', 'moat', 0.3], ['boing', 'attack', 0.3], ['pop', 'clothes'], ['pop', 'moths'], ['pop', 'maybe'], ['wahwah', 'joke', 0.3]],
      draw(k) {
        flat(k, P.sky2, '#7a9a5a');
        chap(k, 'Castles and flushes');
        k.rect(700, 160, 520, G - 160, { fill: '#a8a898', fillStyle: 'solid', width: 6, seed: 5740 });
        for (let i = 0; i < 5; i++) k.rect(700 + i * 110, 110, 80, 60, { fill: '#a8a898', fillStyle: 'solid', width: 5, seed: 5741 + i });
        k.rect(1220, 320, 120, 100, { fill: '#8a8a7a', fillStyle: 'solid', width: 5, seed: 5747, p: k.at('chute', 0.5) });
        k.line(1280, 420, 1280, G, { stroke: '#6b4a33', width: 10, seed: 5748, p: k.at('chute', 0.8) });
        k.rect(0, G - 10, k.W, 60, { fill: '#5a7a6a', fillStyle: 'solid', width: 5, seed: 5749, p: k.at('moat', 0.5) });
        note(k, 'GARDEROBE', 1480, 360, 'castle', { size: 56, color: P.red, fx: 'pop' });
        k.char(1500, G - 10, 300, { ...KNIGHT, face: k.t > k.cue('attack') ? 'shock' : 'calm', p: k.at('attack', 0.5) });
        note(k, 'clothes + ammonia = no moths?', 420, 360, 'moths', { size: 46, fx: 'pop' });
        note(k, '(not proven)', 420, 440, 'maybe', { size: 42, color: '#6b5f55' });
      },
    },
    {
      say: "{flush}The flush toilet came surprisingly early. {har}In 1596, the English courtier John Harington built a flushing toilet for his godmother, Queen Elizabeth the First. {ajax}He called it the Ajax, a pun on jakes, slang for toilet. {catch}It didn't catch on. {s}It took until 1775 for Alexander Cumming to patent the S-shaped bend in the pipe that keeps the smell from coming back up. {joke}Almost two centuries between the flush and the smell fix.",
      sfx: [['pop', 'flush'], ['pop', 'har'], ['boing', 'ajax', 0.3], ['wahwah', 'catch', 0.3], ['pop', 's'], ['tada', 'joke', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'Castles and flushes');
        k.char(320, 980, 420, { ...HARING, face: 'smug', pose: 'present', p: k.at('har', 0.5) });
        k.char(620, 980, 400, { ...QUEEN, face: k.t > k.cue('catch') ? 'blank' : 'happy', flip: true, p: k.at('har', 0.5) });
        card(k, 480, 220, ['JOHN HARINGTON · 1596', 'the "Ajax"'], 'har', { w: 580 });
        k.rect(980, 520, 180, 220, { fill: '#ffffff', fillStyle: 'solid', width: 5, seed: 5750, p: k.at('ajax', 0.5) });
        k.ellipse(1070, 760, 240, 80, { fill: '#ffffff', fillStyle: 'solid', width: 5, seed: 5751, p: k.at('ajax', 0.5) });
        note(k, '"Ajax" = a jakes (toilet)', 1070, 450, 'ajax', { size: 44, fx: 'pop' });
        card(k, 1500, 300, ['ALEXANDER CUMMING · 1775', 'S-bend patent'], 's', { w: 600, r: 0.02, seed: 5752 });
        k.curve([[1360, 520], [1360, 680], [1480, 700], [1520, 600], [1600, 560], [1680, 640]], { stroke: '#8a8a8a', width: 18, seed: 5753, p: k.at('s', 0.8) });
        k.text('flush → 179 years → smell fix', 1300, 900, { size: 54, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 6: And you? ----------------
    {
      chapter: 'And you?',
      say: "{squat}For most of human history, people squatted. {you}You probably sit. {study}In one small study from 2003, people who squatted went faster and strained less than people sitting on a regular toilet. {stool}That's why some people now put a little footstool in front of the toilet. {joke}Your ancestors were ahead of the wellness trend by a few hundred thousand years.",
      sfx: [['pop', 'squat'], ['pop', 'you'], ['pop', 'study'], ['ding', 'stool', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k, '#e8f0f5');
        chap(k, 'And you?');
        k.group({ x: 480, y: 960 }, () => k.char(0, 0, 360, { ...ANC(), face: 'calm', pose: { l: [60, -60], r: [60, -60] }, p: k.at('squat', 0.5) }));
        note(k, 'squat: 300,000 years', 480, 480, 'squat', { size: 50, fx: 'pop' });
        k.rect(1300, 700, 180, 220, { fill: '#ffffff', fillStyle: 'solid', width: 5, seed: 5760, p: k.at('you', 0.5) });
        k.char(1390, 960, 380, { ...YOU, face: 'blank', p: k.at('you', 0.5) });
        note(k, 'sit: very recent', 1390, 480, 'you', { size: 50, fx: 'pop' });
        card(k, 960, 220, ['ONE SMALL STUDY · 2003', 'squatting: faster, less strain'], 'study', { w: 720 });
        k.rect(1240, 900, 120, 40, { fill: P.brown, fillStyle: 'solid', width: 4, seed: 5761, p: k.at('stool', 0.5) });
        k.text('ahead of the wellness trend', 960, 1030, { size: 54, font: 'title', color: P.grass, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{today}And it's not ancient history for everyone. {jmp}According to the World Health Organization and UNICEF, around three point four billion people still don't have safely managed sanitation, {open}and about three hundred and fifty million still go in the open. {bmj}In 2007, readers of the BMJ voted the sanitary revolution the greatest medical milestone since 1840. {beat}Ahead of antibiotics. Ahead of vaccines. {joke}The humble toilet: still saving more lives than you'd think.",
      sfx: [['pop', 'today'], ['drumroll', 'jmp', 0.3], ['pop', 'open'], ['pop', 'bmj'], ['tada', 'beat', 0.4], ['ding', 'joke', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'And you?');
        k.icon('earth', 360, 520, 300, { p: k.at('today', 0.5) });
        big(k, '3.4 BILLION', 1180, 240, 'jmp', { size: 110 });
        note(k, 'without safely managed sanitation', 1180, 350, 'jmp', { size: 46 });
        note(k, '~350 million: no toilet at all', 1180, 440, 'open', { size: 50, color: P.red, fx: 'pop' });
        card(k, 1180, 640, ['BMJ READERS · 2007', '#1 medical milestone since 1840'], 'bmj', { w: 720 });
        note(k, '> antibiotics · > vaccines', 1180, 800, 'beat', { size: 52, color: P.grass, fx: 'pop' });
        k.text('the humble toilet', 960, 1000, { size: 64, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Ending ----------------
    {
      chapter: 'Privacy is new',
      say: "{back}So, back to that Roman bench. {strange}Shoulder to shoulder with strangers. {us}It feels strange to us. {but}But for most of history, the toilet was a shared, social, public place. {lock}The door you lock behind you? {new}That's the newest part of the toilet.",
      sfx: [['whoosh', 'back', 0.4], ['pop', 'strange'], ['pop', 'us'], ['pop', 'but'], ['bonk', 'lock', 0.3], ['ding', 'new', 0.4]],
      draw(k) {
        const door = k.at('lock', 0.6);
        k.group({ a: 1 - door }, () => {
          latrine(k);
          [ROMAN, ROMAN2, ROMAN3, ROMAN, ROMAN2].forEach((pr, i) => sitter(k, 410 + i * 220, 640, pr, { face: 'laugh' }));
          k.text('shared · social · public', 960, 240, { size: 70, font: 'title', color: P.brown, fx: 'pop', p: k.at('but', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        });
        k.group({ a: door }, () => {
          paper(k, '#e8f0f5');
          k.rect(760, 220, 400, 660, { fill: '#c9a07a', fillStyle: 'solid', width: 6, seed: 5770 });
          k.circle(1100, 560, 22, { fill: P.yellow, fillStyle: 'solid', width: 4, seed: 5771 });
          k.text('🔒', 1100, 480, { size: 60, p: 1 });
          k.text('THE NEWEST PART OF THE TOILET', 960, 1000, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at('new', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        });
      },
    },

    // ---------------- Recap ----------------
    {
      chapter: 'Recap',
      say: "{t}Quick recap. {a}Romans shared their toilets, and the sponge's job is still debated. {b}Greeks wiped with pebbles, Silk Road travelers with sticks, Chinese emperors with perfumed paper. {c}And ancient poop is still rewriting history. {remind}Next time: did ancient people really die at thirty?",
      sfx: [['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['ding', 'remind', 0.4]],
      draw(k) {
        paper(k);
        k.text('RECAP', 960, 130, { size: 80, font: 'title', color: P.red, p: k.at('t', 0.8, 'linear') });
        const rows = [['a', 'Shared Roman toilets · sponge debated'], ['b', 'Pebbles · sticks · perfumed paper'], ['c', 'Ancient poop rewrites history'], ['remind', 'Next: did they die at 30?']];
        rows.forEach(([c, t], i) => {
          k.icon(i === 3 ? 'question' : 'check', 330, 290 + i * 170, 90, { p: k.at(c, 0.4) });
          k.text(t, 420, 300 + i * 170, { size: 58, font: 'title', align: 'left', p: k.at(c, 1.2, 'linear'), color: i === 3 ? P.red : P.ink });
        });
      },
    },
    nextEpisodeScene({
      lang: 'en',
      say: "{next}Next episode: how long did ancient humans actually live? {hook}You've heard they all died at thirty. {twist}The real numbers tell a very different story. {when}Coming soon.",
      title: 'How Long Did Ancient Humans Actually Live?',
      hook: 'Did they really all die at 30?',
      when: 'COMING SOON',
      art: (k) => {
        k.char(-150, 150, 260, { ...ANC({ hair: 'long', hairColor: '#d9d4cb', beard: true, beardColor: '#d9d4cb' }), face: 'smug', prop: 'staff' });
        k.text('30?', 200, 20, { size: 110, font: 'title', color: P.red, outline: '#fffaf0', outlineWidth: 14, p: 1 });
      },
      sfx: [['sparkle', 'hook', 0.3]],
    }),
    subscribeScene({
      lang: 'en',
      say: "{q}Be honest: would you have used the Roman sponge, or the Greek pebbles? Put it in the comments. {sub}And subscribe, so you don't miss what happened next.",
      question: 'Roman sponge or Greek pebbles?',
      channel: 'Long Story Drawn',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
