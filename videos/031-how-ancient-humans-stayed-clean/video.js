// Long Story Drawn — Ep 7: How Did Ancient Humans Stay Clean Without Soap? (series "how your ancestors actually lived"; promised in Ep 6: oil + a curved metal scraper)
// Fact check:
//  Greeks/Romans: athletes oiled the body (olive oil), then scraped oil + sweat + dust off with a strigil (curved bronze/iron scraper).
//  Gloios / strigmentum: the scraped mixture; a 2nd-century-BC gymnasium inscription from Beroea (Macedonia) regulates the sale of gloios;
//    Pliny the Elder (Natural History) lists medical uses (aches, inflammation) — Pliny is unreliable, the trade itself is attested.
//  Saponins: soapwort (Saponaria), yucca root etc. foam because of saponins; ash, sand, clay used for scrubbing.
//  Babylon, c. 2800 BC: clay cylinders describe fats boiled with ashes (soap-like); use unclear — some early texts concern washing wool/cloth.
//  Egypt: natron used for cleansing (and mummification).
//  Roman thermae: tepidarium (warm), caldarium (hot), frigidarium (cold); small entry fee; socialising, exercise, food, business.
//  Mitchell 2016 (Parasitology), "Human parasites in the Roman World": whipworm/roundworm did not fall (rose) under Rome; lice/fleas as common as in Viking/medieval York;
//    possible reasons (hypotheses): warm communal bath water changed infrequently, human waste as fertiliser.
//  Fullonicae: fullers cleaned wool with stale urine (ammonia); urine collected from public urinals/jars; Vespasian taxed urine (Suetonius, Vesp. 23): "pecunia non olet".
//  Medieval public bathhouses ("stews"): Paris had dozens in the late 13th century (1292 tax roll; bath-keepers' guild). Decline from the 16th century:
//    fear that hot water opened pores to disease (plague); clean white linen = cleanliness (Vigarello, Concepts of Cleanliness, 1985).
//  Daily showering with soap: widespread only with 20th-century indoor plumbing; some dermatologists say daily full-body soaping is more than many people need (hedged).
//  Toups et al. 2011 (Mol Biol Evol): clothing lice diverged from head lice ~83,000–170,000 years ago → clothing use.
//  Mohenjo-daro Great Bath (~2500 BC), bitumen-sealed brick tank; many houses with bathing platforms linked to covered drains.
//  Herodotus, Histories 2.37: Egyptian priests shave the whole body every other day so no louse or other uncleanness attaches. Natron for washing.
//  4th-century AD Egyptian papyrus (Austrian National Library, Vienna): tooth powder of rock salt, mint, dried iris flower, pepper.
//  Seneca, Moral Letters 56: living above a bathhouse — grunting weightlifters, masseur's slaps, singers, the shrieking hair-plucker.
//  Spanish accounts (Bernal Díaz etc.): Aztecs bathed often/daily, temazcalli steam baths, Moctezuma bathed daily; soapberry (Sapindus) fruit as soap.
//  Next episode (Ep 8): toilets — Roman multi-seat public latrines without partitions; the tersorium / xylospongium (sponge on a stick; exact use debated). Poster: COMING SOON.
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import { P, G, YOU, ANC, ANCW, ELDER, KID, SCI, flat, disc, ancient, savanna, night, paper, chap, big, note, redX, card, campNight, glow } from '/channel/long-story-drawn.js';
import * as thumbs from '/videos/031-how-ancient-humans-stayed-clean/thumbs.js';

const GREEK = { body: 'man', outfit: 'bare', color: '#c2a46b', color2: '#8B5A2B', hair: 'short', hairColor: '#3a2a1e', skin: '#e0b48a' };
const ROMAN = { body: 'man', outfit: 'robe', color: '#f5f1e6', color2: '#b03a2e', hair: 'short', hairColor: '#3a2a1e', skin: '#e0b48a' };
const ROMANW = { body: 'woman', outfit: 'dress', color: '#c9d3e8', color2: '#5a6b8a', hair: 'bun', hairColor: '#3a2a1e', skin: '#e0b48a' };
const VESP = { body: 'big', outfit: 'robe', color: '#7a3a8a', color2: P.yellow, hair: 'bald', skin: '#e0b48a', hat: 'crown' };
const TITUS = { ...ROMAN, color: '#a090c0', color2: P.yellow, hair: 'short' };
const MEDI = { body: 'man', outfit: 'tunic', color: '#4E9A45', color2: '#8B5A2B', hair: 'short', hairColor: '#7a4a2a', skin: '#f0c8a0' };
const MEDIW = { body: 'woman', outfit: 'dress', color: '#b03a2e', color2: P.yellow, hair: 'long', hairColor: '#c08a4a', skin: '#f0c8a0' };
const DOC = { body: 'man', outfit: 'robe', color: '#2b2b33', color2: '#c9c4bb', hair: 'short', hairColor: '#5a4a3a', beard: true, beardColor: '#5a4a3a', skin: '#f0c8a0' };
const LINEN = { ...MEDI, color: '#ffffff', color2: '#d9d4cb', hat: undefined };

// Nhà tắm La Mã: cột, nền đá, bể nước, hơi nước.
function bath(k, o = {}) {
  paper(k, '#e9dcc4');
  const { ctx } = k;
  ctx.fillStyle = '#d9c8a8'; ctx.fillRect(0, G, k.W, k.H - G);
  for (const x of [160, 560, 1360, 1760]) {
    k.rect(x - 40, 160, 80, G - 160, { fill: '#f5efe0', fillStyle: 'solid', width: 5, seed: 3100 + x });
    k.rect(x - 60, 130, 120, 40, { fill: '#f5efe0', fillStyle: 'solid', width: 5, seed: 3200 + x });
  }
  k.rect(0, 90, k.W, 50, { fill: '#c9b48a', fillStyle: 'solid', width: 5, seed: 3300 });
  if (o.pool !== false) {
    k.rect(o.px ?? 620, G - 30, o.pw ?? 680, 120, { fill: o.water ?? '#7FB5D5', fillStyle: 'solid', width: 5, seed: 3301 });
    for (let i = 0; i < 4; i++) {
      const u = ((k.gt ?? 0) * 0.3 + i / 4) % 1;
      k.text('~', (o.px ?? 620) + 120 + i * 150, G - 60 - u * 160, { size: 70, font: 'title', color: '#ffffff', p: Math.sin(u * Math.PI) * (o.steam ?? 0.8) });
    }
  }
}
// Phố trung cổ.
function town(k) {
  flat(k, P.sky2, '#b8a888');
  for (const [x, w, h, c] of [[200, 260, 360, '#e8d8b8'], [520, 220, 300, '#d8c0a0'], [1420, 240, 340, '#e0ccaa'], [1720, 260, 380, '#d0b898']]) {
    k.rect(x - w / 2, G - h, w, h, { fill: c, fillStyle: 'solid', width: 5, seed: 3400 + x });
    k.poly([[x - w / 2 - 20, G - h], [x, G - h - 120], [x + w / 2 + 20, G - h]], { fill: '#a0523a', fillStyle: 'solid', width: 5, seed: 3500 + x });
  }
}
// Mũi tên/hộp cạo: người cầm strigil, cạo theo nhịp.
function scraping(k, x, y, h, preset, cue, o = {}) {
  const s = Math.sin((k.gt ?? 0) * 5) * k.at(cue, 0.4);
  k.char(x, y, h, { ...preset, face: o.face ?? 'happy', pose: { l: [30, -40], r: [-60 + s * 30, -100] }, flip: o.flip, p: o.p ?? 1 });
  k.prop('strigil', x + (o.flip ? -1 : 1) * h * 0.12, y - h * 0.58 + s * 30, h * 0.32, { p: o.sp ?? 1, rotate: 0.5 + s * 0.2 });
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    title: 'How Did Ancient Humans Stay Clean Without Soap?',
    description: `No soap, no shampoo, no deodorant. So how did people stay clean? In ancient Greece, you rubbed yourself with olive oil and scraped it off with a curved metal blade — and someone might buy the gunk.
How did ancient humans stay clean without soap? The first soap-like recipes, Roman baths that may have spread worms, laundry washed in urine, and the myth that medieval people never bathed. Episode 7 of "How your ancestors actually lived".`,
    footer: `📚 Sources: Beroea gymnasiarchal law (2nd century BC) on the sale of gloios; Pliny the Elder, Natural History; Mitchell (2016, Parasitology), "Human parasites in the Roman World: health consequences of conquering an empire"; Suetonius, Life of Vespasian 23; Vigarello (1985), Concepts of Cleanliness; Wurtzel (2023, French Historical Studies), medieval urban bathhouses; Babylonian soap-like recipes (c. 2800 BC).
🧼 Previous episode: How Did Ancient Humans Survive Without Doctors? Next: How Did Ancient Humans Go to the Toilet?`,
    tags: ['how did ancient humans stay clean', 'how did people stay clean before soap', 'ancient hygiene', 'strigil', 'gloios', 'roman baths', 'roman baths parasites', 'history of soap', 'roman urine laundry', 'pecunia non olet', 'did medieval people bathe', 'medieval bathhouses', 'history of hygiene', 'ancient greece', 'ancient rome', 'ancient humans', 'human history', 'prehistory', 'anthropology', 'early humans', 'animated history', 'history explained', 'how people lived', 'long story drawn'],
    hashtags: ['ancienthumans', 'hygiene', 'history'],
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
    // ---------------- Intro: hook = lời hứa của poster tập 6 ----------------
    {
      chapter: 'Intro',
      lead: 0.3,
      say: "{sweat}You've just finished exercising. You're covered in sweat and dust. {oil}Someone hands you a flask of olive oil, {blade}and a curved bronze blade. {rub}You rub the oil all over your body, {scrape}then scrape it off, along with the sweat and the dirt. {shower}Congratulations. You've just showered, ancient Greek style.",
      sfx: [['pop', 'oil'], ['pop', 'blade'], ['whoosh', 'rub', 0.3], ['scratch', 'scrape', 0.5], ['tada', 'shower', 0.4]],
      draw(k) {
        flat(k, P.sky, P.sand);
        disc(k, 1700, 180, 70, P.yellow);
        k.text('NO SOAP', 1280, 200, { size: 110, font: 'title', color: P.red, fx: 'pop', p: 1, outline: '#fffaf0', outlineWidth: 16 });
        scraping(k, 700, G + 30, 520, { ...YOU, color: '#D9A21B' }, 'scrape', { face: k.t > k.cue('shower') ? 'happy' : k.t > k.cue('sweat') ? 'blank' : 'calm', sp: k.at('blade', 0.5) });
        for (let i = 0; i < 4; i++) k.sweat(640 + i * 40, 520 + (i % 2) * 60, 1.2, { p: 1 - k.at('scrape', 1.5) });
        k.prop('pot', 1200, G - 60, 180, { fill: '#c9a24a', p: k.at('oil', 0.5) });
        note(k, 'olive oil', 1200, G - 200, 'oil', { size: 50, fx: 'pop' });
        k.prop('strigil', 1480, G - 90, 220, { p: k.at('blade', 0.5) });
        note(k, 'strigil', 1480, G - 220, 'blade', { size: 50, fx: 'pop' });
        k.text('= SHOWER', 1280, 340, { size: 90, font: 'title', color: P.grass, fx: 'pop', p: k.at('shower', 0.4), outline: '#fffaf0', outlineWidth: 14 });
      },
    },
    {
      say: "{series}This is episode seven of How Your Ancestors Actually Lived. {today}Today: {a}how people got clean before soap, {b}the Roman baths that may have spread worms, {c}and why someone would buy a stranger's sweat. {sub}If you like this, subscribe for the next one.",
      sfx: [['pop', 'series'], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'sub', 0.5]],
      draw(k) {
        paper(k);
        note(k, 'HOW YOUR ANCESTORS ACTUALLY LIVED · Ep. 7', 960, 130, 'series', { size: 52, color: P.brown });
        const items = [['a', 'BEFORE SOAP', 'strigil'], ['b', 'WORMY BATHS?', 'bath'], ['c', 'SWEAT FOR SALE', 'pot']];
        items.forEach(([c, t, prop], i) => {
          const x = 420 + i * 540, p = k.at(c, 0.5);
          k.group({ x, y: 560, r: i % 2 ? 0.03 : -0.03, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-210, -220, 420, 440, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 3110 + i });
            if (prop === 'bath') { k.rect(-140, -40, 280, 90, { fill: '#7FB5D5', fillStyle: 'solid', width: 4, seed: 3115 }); k.text('~ ~ ~', 0, -90, { size: 60, font: 'title', color: '#9fb8c8' }); }
            else k.prop(prop, 0, -50, 200, { fill: '#c9a24a' });
            k.text(t, 0, 150, { size: 46, font: 'title', color: P.red, maxWidth: 380 });
          });
        });
        k.char(1760, 1060, 300, { ...YOU, face: 'happy', pose: 'wave', p: k.at('sub', 0.5) });
      },
    },

    // ---------------- Chapter 1: Before soap ----------------
    {
      chapter: 'Before soap',
      say: "{most}For most of human history, there was no soap at all. {water}People washed with water, {scrub}and scrubbed with sand, ash, or clay. {plants}Some plants, like soapwort and yucca root, even foam a little, {sap}because they contain natural soap-like chemicals called saponins. {joke}Nature's shampoo. No bottle required.",
      sfx: [['pop', 'most'], ['whoosh', 'water', 0.4], ['scratch', 'scrub', 0.4], ['sparkle', 'plants', 0.4], ['ding', 'sap', 0.4]],
      draw(k) {
        savanna(k, { trees: [[1700, 380]] });
        chap(k, 'Before soap');
        const { ctx } = k;
        ctx.fillStyle = '#6fa8cf'; ctx.beginPath(); ctx.ellipse(560, G + 60, 420, 70, 0, 0, Math.PI * 2); ctx.fill();
        k.char(560, G + 40, 420, { ...ANC(), face: 'happy', pose: 'hold', p: k.at('most', 0.5) });
        k.text('NO SOAP. EVER.', 960, 190, { size: 90, font: 'title', color: P.red, fx: 'pop', p: k.at('most', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        const sc = [['water', 'water'], ['scrub', 'sand · ash · clay']];
        sc.forEach(([c, t], i) => note(k, t, 1180, 330 + i * 90, c, { size: 56, fx: 'pop', color: P.ink }));
        k.prop('tree', 1300, 640, 200, { fill: '#7ab55a', p: k.at('plants', 0.5) });
        for (let i = 0; i < 6; i++) k.dot(1260 + k.rand(i) * 90, 560 + k.rand(i + 9) * 70, 10 + k.rand(i + 3) * 8, '#ffffff', k.at('sap', 0.5));
        note(k, 'soapwort · yucca root', 1300, 790, 'plants', { size: 46, color: P.grass, fx: 'pop' });
        note(k, '= SAPONINS', 1300, 870, 'sap', { size: 56, color: P.indigo, fx: 'pop' });
      },
    },
    {
      say: "{lice}Here's a strange way to date when your ancestors started wearing clothes: lice. {two}You have head lice, and clothing lice, which live in fabric. {split}By comparing their DNA, a 2011 study by Melissa Toups and colleagues estimated the two split between about 83,000 and 170,000 years ago. {clothes}Clothing lice need clothing. {so}So, roughly, that's when clothes became normal. {joke}Lice: the original fashion historians.",
      sfx: [['pop', 'lice'], ['pop', 'two'], ['drumroll', 'split', 0.3], ['tada', ['split', 3], 0.4], ['ding', 'so', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Before soap');
        card(k, 520, 190, ['TOUPS ET AL., 2011', 'Molecular Biology and Evolution'], 'split', { w: 640 });
        const bug = (x, y, s, c) => k.group({ x, y, s }, () => { k.ellipse(0, 0, 60, 80, { fill: c, fillStyle: 'solid', width: 4, seed: 3401 }); k.circle(0, -50, 30, { fill: c, fillStyle: 'solid', width: 4, seed: 3402 }); for (const sd of [-1, 1]) for (let j = 0; j < 3; j++) k.line(sd * 28, -20 + j * 20, sd * 60, -30 + j * 24, { stroke: P.ink, width: 4, seed: 3403 + j + sd }); });
        bug(520, 520, k.at('two', 0.5) * 1.6 + 0.01, '#c9a07a');
        note(k, 'head lice', 520, 680, 'two', { size: 50, fx: 'pop' });
        bug(1000, 520, k.at('two', 0.5) * 1.6 + 0.01, '#a08a6a');
        note(k, 'clothing lice', 1000, 680, 'two', { size: 50, fx: 'pop' });
        big(k, '83,000–170,000 YEARS', 1300, 820, k.cue('split', 3), { size: 80 });
        k.char(1560, 640, 300, { ...ANC({ outfit: 'tunic', color: '#a87b4f' }), face: 'happy', p: k.at('clothes', 0.5) });
        k.text('the first fashion historians', 960, 1000, { size: 56, font: 'title', color: P.grass, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{first}The first hint of real soap comes from Mesopotamia. {cyl}Clay cylinders from ancient Babylon, from around 2800 BC, describe boiling fats with ashes, {chem}the basic chemistry of soap. {what}But nobody's sure what it was for. {wool}Some early recipes seem to be for washing wool and cloth. {joke}Your ancestors' sheep may have had soap before they did.",
      sfx: [['pop', 'first'], ['scratch', 'cyl', 0.3], ['ding', 'chem', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k, '#efe2c8');
        chap(k, 'Before soap');
        card(k, 520, 190, ['BABYLON · ~2800 BC', 'clay cylinders'], 'cyl', { w: 560 });
        k.rect(300, 340, 440, 260, { fill: '#c9a07a', fillStyle: 'solid', width: 5, p: k.at('cyl', 0.5), seed: 3120 });
        for (let i = 0; i < 5; i++) k.line(340, 380 + i * 45, 700, 380 + i * 45, { stroke: '#8a6a4a', width: 3, p: k.at(k.cue('cyl', 0.2 + i * 0.1), 0.4), seed: 3121 + i });
        k.prop('meat', 1100, 380, 150, { p: k.at('chem', 0.5) });
        k.text('+', 1260, 380, { size: 90, font: 'title', color: P.ink, p: k.at('chem', 0.4) });
        k.prop('campfire', 1420, 400, 160, { p: k.at('chem', 0.5), fire: 0.2 });
        note(k, 'fat + ash', 1260, 520, 'chem', { size: 56, color: P.orange, fx: 'pop' });
        big(k, '= SOAP CHEMISTRY', 1260, 620, 'chem', { size: 70 });
        k.icon('question', 520, 760, 130, { p: k.at('what', 0.5) });
        note(k, 'for… wool and cloth?', 520, 880, 'wool', { size: 54, fx: 'pop' });
        k.group({ x: 1300, y: 840, a: k.at('joke', 0.4) }, () => {
          for (const lx of [-50, -20, 20, 50]) k.line(lx, 20, lx, 90, { stroke: P.ink, width: 8, seed: 3125 + lx });
          k.prop('cloud', 0, 0, 220);
          k.ellipse(110, -10, 60, 70, { fill: '#3b2f2a', fillStyle: 'solid', width: 4, seed: 3124 });
        });
        k.text('the sheep got soap first?', 1300, 1010, { size: 54, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    {
      say: "{indus}And some ancient cities took washing very seriously. {moh}At Mohenjo-daro, in the Indus Valley, in today's Pakistan, there's a huge brick pool known as the Great Bath, {date}built around 2500 BC. {sealed}Its bricks were sealed with a layer of bitumen to keep it watertight. {houses}And many ordinary houses there had their own bathing areas, connected to covered drains. {joke}Four and a half thousand years ago, and plumbing already beat some apartments today.",
      sfx: [['whoosh', 'indus', 0.4], ['pop', 'moh'], ['pop', 'date'], ['ding', 'sealed', 0.4], ['pop', 'houses'], ['boing', 'joke', 0.3]],
      draw(k) {
        flat(k, '#f0d9a0', '#c9a07a');
        chap(k, 'Before soap');
        card(k, 520, 190, ['MOHENJO-DARO', 'Indus Valley · ~2500 BC'], 'moh', { w: 560 });
        k.rect(460, 520, 1000, 300, { fill: '#b8704a', fillStyle: 'solid', width: 6, p: k.at('moh', 0.5), seed: 3410 });
        for (let i = 0; i < 6; i++) k.line(460, 560 + i * 45, 1460, 560 + i * 45, { stroke: '#8a4a2a', width: 2, p: k.at('moh', 0.6), seed: 3411 + i });
        k.rect(560, 580, 800, 200, { fill: '#7FB5D5', fillStyle: 'solid', width: 5, p: k.at('moh', 0.6), seed: 3420 });
        big(k, 'THE GREAT BATH', 960, 400, 'moh', { size: 90, color: P.brown });
        note(k, 'sealed with bitumen', 960, 880, 'sealed', { size: 52, color: P.ink, fx: 'pop' });
        note(k, 'home bathrooms + covered drains', 960, 960, 'houses', { size: 52, color: P.grass, fx: 'pop' });
        k.text('better than some apartments', 1400, 200, { size: 50, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{egypt}In Egypt, people washed with natron, a natural salt that also helped dry out mummies. {priests}And according to the Greek historian Herodotus, Egyptian priests shaved their entire bodies every other day, {lice}so that no lice or anything unclean would cling to them. {paste}A papyrus from Roman Egypt even preserves a recipe for tooth powder: {salt}rock salt, {mint}mint, {iris}dried iris flowers, {pepper}and pepper. {joke}Fresh breath, with a kick.",
      sfx: [['pop', 'egypt'], ['pop', 'priests'], ['scratch', 'lice', 0.3], ['ding', 'paste', 0.4], ['pop', 'salt'], ['pop', 'mint'], ['pop', 'iris'], ['pop', 'pepper'], ['boing', 'joke', 0.3]],
      draw(k) {
        flat(k, '#f5d98a', P.sand);
        chap(k, 'Before soap');
        k.poly([[1500, G], [1700, G - 300], [1900, G]], { fill: '#e0c070', fillStyle: 'solid', width: 5, seed: 3430 });
        k.prop('pot', 300, G - 60, 160, { fill: '#e8e0d0', p: k.at('egypt', 0.5) });
        note(k, 'natron', 300, G - 200, 'egypt', { size: 50, fx: 'pop' });
        k.char(640, G + 30, 440, { body: 'man', outfit: 'robe', color: '#ffffff', color2: P.yellow, hair: 'bald', skin: '#b07a4a', face: 'calm', p: k.at('priests', 0.5) });
        card(k, 640, 180, ['HERODOTUS', 'Histories · Book 2'], 'priests', { w: 480 });
        note(k, 'shaved all over, every other day', 640, 330, 'lice', { size: 46, color: P.red, fx: 'pop' });
        k.prop('scroll', 1240, 360, 200, { p: k.at('paste', 0.5) });
        note(k, 'TOOTH POWDER', 1240, 230, 'paste', { size: 60, color: P.indigo, fx: 'pop' });
        const ing = [['salt', 'rock salt'], ['mint', 'mint'], ['iris', 'dried iris'], ['pepper', 'pepper']];
        ing.forEach(([c, t], i) => note(k, '+ ' + t, 1240, 500 + i * 70, c, { size: 48, fx: 'pop' }));
        k.text('fresh breath, with a kick', 960, 1000, { size: 56, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    // ---------------- Chapter 2: Oil and the strigil ----------------
    {
      chapter: 'Oil and the strigil',
      say: "{gym}In ancient Greece, the gymnasium was the center of town life. {naked}Men trained naked, {oil}their bodies coated in olive oil. {after}Afterward, they scraped themselves clean with a strigil. {why}Why oil? {grab}Oil grabs onto dirt and sweat, {lift}and the scraper lifts it all away. {today}Some people still use oil to clean their faces today. {joke}They just skip the bronze blade.",
      sfx: [['pop', 'gym'], ['boing', 'naked', 0.3], ['pop', 'oil'], ['scratch', 'after', 0.4], ['pop', 'why'], ['ding', 'lift', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k, '#f3e7cf');
        chap(k, 'Oil and the strigil');
        for (const x of [120, 1800]) k.rect(x - 40, 140, 80, G - 140, { fill: '#f5efe0', fillStyle: 'solid', width: 5, seed: 3130 + x });
        const { ctx } = k; ctx.fillStyle = '#d9c8a8'; ctx.fillRect(0, G, k.W, k.H - G);
        k.text('GYMNASIUM', 960, 150, { size: 90, font: 'title', color: P.brown, fx: 'pop', p: k.at('gym', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.char(420, G + 30, 420, { ...GREEK, face: 'happy', pose: 'cheer', p: k.at('naked', 0.5) });
        k.prop('pot', 640, G - 30, 130, { fill: '#c9a24a', p: k.at('oil', 0.5) });
        scraping(k, 960, G + 30, 440, GREEK, 'after', { p: k.at('after', 0.5) });
        const steps = [['grab', '1. oil grabs the dirt'], ['lift', '2. scraper lifts it off']];
        steps.forEach(([c, t], i) => note(k, t, 1180, 380 + i * 100, c, { size: 52, align: 'left', fx: 'pop' }));
        note(k, 'oil cleansing: still a thing', 1500, 700, 'today', { size: 46, color: P.grass, fx: 'pop' });
        k.text('(minus the blade)', 1500, 780, { size: 46, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 8 });
      },
    },
    {
      say: "{strange}But here's the strange part. {gunk}That scraped-off mix of oil, sweat, dust, and skin had a name: {gloios}gloios. {sold}And people sold it. {beroea}An inscription from the gymnasium at Beroea, in northern Greece, sets out rules for selling gloios. {pliny}The Roman writer Pliny claimed it was used in medicine, {aches}for aches and inflammation. {careful}Pliny got plenty of things wrong. {real}But the trade was real. {joke}Somewhere, someone paid good money for a jar of an athlete's sweat.",
      sfx: [['drumroll', 'strange', 0.3], ['pop', 'gunk'], ['ding', 'gloios', 0.4], ['cash', 'sold', 0.4], ['pop', 'beroea'], ['pop', 'pliny'], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Oil and the strigil');
        k.prop('pot', 400, 600, 300, { fill: '#a88a4a', p: k.at('gunk', 0.5) });
        k.text('oil + sweat + dust + skin', 400, 330, { size: 46, font: 'title', color: P.brown, fx: 'fade', p: k.at('gunk', 0.6) });
        big(k, 'GLOIOS', 400, 820, 'gloios', { size: 110 });
        k.text('FOR SALE', 400, 940, { size: 70, font: 'title', color: P.grass, fx: 'pop', p: k.at('sold', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        card(k, 1320, 220, ['BEROEA GYMNASIUM LAW', 'stone inscription · 2nd c. BC'], 'beroea', { w: 700 });
        card(k, 1320, 460, ['PLINY THE ELDER', 'aches · inflammation'], 'pliny', { w: 600, r: 0.02, seed: 3140 });
        note(k, '(Pliny: often wrong)', 1320, 600, 'careful', { size: 44, color: '#6b5f55' });
        k.text('THE TRADE WAS REAL', 1320, 720, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('real', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.icon('coin', 1320, 880, 120, { p: k.at('joke', 0.5) });
      },
    },

    // ---------------- Chapter 3: Roman baths ----------------
    {
      chapter: 'Roman baths',
      say: "{rome}The Romans took bathing to another level. {baths}Public baths were everywhere, from small neighborhood ones to giant imperial complexes. {warm}You moved from a warm room, {hot}to a hot room, {cold}to a cold plunge pool. {cheap}Entry was cheap. {social}People went to exercise, chat, eat snacks, and do business. {joke}A spa, a gym, and a shopping mall, all in one.",
      sfx: [['whoosh', 'rome', 0.4], ['pop', 'warm'], ['pop', 'hot'], ['bonk', 'cold', 0.3], ['cash', 'cheap', 0.3], ['pop', 'social'], ['ding', 'joke', 0.4]],
      draw(k) {
        bath(k);
        chap(k, 'Roman baths');
        k.text('THERMAE', 960, 230, { size: 100, font: 'title', color: P.brown, fx: 'pop', p: k.at('rome', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        const rooms = [['warm', 'WARM', '#f7c08a'], ['hot', 'HOT', P.red], ['cold', 'COLD', '#7FB5D5']];
        rooms.forEach(([c, t, col], i) => k.text(t, 760 + i * 200, 380, { size: 60, font: 'title', color: col, fx: 'pop', p: k.at(c, 0.4), outline: P.ink, outlineWidth: 8 }));
        k.char(800, G + 30, 380, { ...ROMAN, face: 'happy', pose: 'present', p: k.at('social', 0.5) });
        k.char(1100, G + 30, 360, { ...ROMANW, face: 'laugh', flip: true, p: k.at('social', 0.5) });
        k.prop('snack', 960, G - 200, 90, { p: k.at('social', 0.5) });
        k.text('spa + gym + mall', 960, 1000, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{noise}And the baths were loud. {seneca}The Roman writer Seneca once lived above a bathhouse, and complained about it in a letter. {grunt}He describes men grunting as they lifted weights, {slap}the slap of a masseur's hands, {sing}people who loved the sound of their own voice in the bath, {pluck}and the hair-plucker, shrieking for customers, {silent}who was only quiet when he was making someone else shriek. {joke}Two thousand years later, the gym hasn't changed much.",
      sfx: [['pop', 'noise'], ['pop', 'seneca'], ['boing', 'grunt', 0.3], ['bonk', 'slap', 0.3], ['wahwah', 'sing', 0.3], ['pop', 'pluck'], ['boing', 'silent', 0.3]],
      draw(k) {
        bath(k);
        chap(k, 'Roman baths');
        card(k, 960, 220, ['SENECA · LETTER 56', '"I live right above a bath"'], 'seneca', { w: 640 });
        k.char(320, G + 30, 380, { ...ROMAN, color: '#a0a0b0', face: k.t > k.cue('grunt') ? 'blank' : 'sad', pose: 'think', p: k.at('seneca', 0.5) });
        const sounds = [['grunt', 'HNNGH!', 760, 400], ['slap', 'SLAP!', 1120, 380], ['sing', 'La la laaa ♪', 1480, 420], ['pluck', 'PLUCK! PLUCK!', 1180, 540]];
        sounds.forEach(([c, t, x, y]) => k.text(t, x, y, { size: 56, font: 'title', color: P.red, fx: 'pop', p: k.at(c, 0.4), outline: '#fffaf0', outlineWidth: 10 }));
        k.char(1000, G + 30, 340, { ...ROMAN, color: '#d9d4cb', face: 'shout', pose: 'cheer', p: k.at('grunt', 0.5) });
        k.char(1500, G + 30, 340, { ...ROMAN, color: '#c9d3e8', face: 'laugh', pose: 'shout', p: k.at('sing', 0.5) });
        k.text('the gym, unchanged', 960, 1010, { size: 56, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{but}But were the Romans actually healthier? {mitchell}In 2016, Cambridge archaeologist Piers Mitchell reviewed parasite evidence from across the Roman Empire. {worms}Gut worms like whipworm didn't go down under Roman rule. {up}They actually rose. {lice}And lice and fleas were just as common as in later Viking and medieval towns. {why}One possible reason: {water}warm, shared bath water that wasn't changed very often. {joke}Picture a hot tub, shared with half the town.",
      sfx: [['drumroll', 'but', 0.3], ['pop', 'mitchell'], ['bonk', 'worms', 0.3], ['wahwah', 'up', 0.3], ['pop', 'lice'], ['boing', 'joke', 0.3]],
      draw(k) {
        bath(k, { water: '#8aa86a', steam: 1 });
        chap(k, 'Roman baths');
        card(k, 960, 220, ['PIERS MITCHELL · 2016', 'Parasitology · Roman Empire'], 'mitchell', { w: 680 });
        k.text('WORMS: ↑', 960, 400, { size: 90, font: 'title', color: P.red, fx: 'pop', p: k.at('up', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        note(k, 'whipworm didn\'t go down', 960, 500, 'worms', { size: 50, fx: 'pop' });
        note(k, 'lice & fleas: as common as later', 960, 580, 'lice', { size: 46, fx: 'pop' });
        for (let i = 0; i < 5; i++) k.char(700 + i * 120, G + 40, 200, { ...(i % 2 ? ROMANW : ROMAN), face: i === 2 && k.t > k.cue('joke') ? 'shock' : 'happy', shadow: false, p: k.at(k.cue('water', i * 0.15), 0.4) });
        k.text('shared hot tub', 960, 1010, { size: 60, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{and}And when a Roman needed the toilet? {rows}Public latrines had long rows of seats, side by side, {walls}with no walls between them. {sponge}And next to them, a sponge on a stick. {next}What was it for? That's the next episode.",
      sfx: [['pop', 'and'], ['pop', 'rows'], ['boing', 'walls', 0.3], ['drumroll', 'sponge', 0.3], ['sparkle', 'next', 0.4]],
      draw(k) {
        bath(k, { pool: false });
        chap(k, 'Roman baths');
        k.rect(360, 640, 1200, 80, { fill: '#e8dcc4', fillStyle: 'solid', width: 5, p: k.at('rows', 0.5), seed: 3150 });
        k.rect(360, 720, 1200, 140, { fill: '#d8c8a8', fillStyle: 'solid', width: 5, p: k.at('rows', 0.5), seed: 3151 });
        for (let i = 0; i < 5; i++) k.ellipse(480 + i * 240, 668, 90, 30, { fill: '#3b2f2a', fillStyle: 'solid', width: 3, p: k.at(k.cue('rows', 0.2 + i * 0.1), 0.4), seed: 3152 + i });
        note(k, 'NO WALLS', 960, 520, 'walls', { size: 70, color: P.red, fx: 'pop' });
        k.line(1640, 900, 1680, 520, { stroke: '#8B5A2B', width: 10, p: k.at('sponge', 0.5), seed: 3160 });
        k.ellipse(1686, 500, 70, 54, { fill: P.yellow, fillStyle: 'solid', width: 5, p: k.at('sponge', 0.5), seed: 3161 });
        k.icon('question', 1690, 330, 120, { p: k.at('next', 0.5), stroke: P.red });
        k.text('NEXT EPISODE', 960, 300, { size: 80, font: 'title', color: P.orange, fx: 'pop', p: k.at('next', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 4: Laundry day ----------------
    {
      chapter: 'Laundry day',
      say: "{clothes}And your clothes? {full}Roman laundries, called fullonicae, cleaned wool with stale urine. {amm}Old urine releases ammonia, which helps break down grease and dirt. {jars}Jars were set out to collect it from the public. {stomp}Workers then stomped the clothes clean in tubs, with their feet. {joke}Fresh laundry, Roman style. Smell not included. Actually, smell very much included.",
      sfx: [['pop', 'clothes'], ['pop', 'full'], ['ding', 'amm', 0.4], ['pop', 'jars'], ['bonk', 'stomp', 0.3], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k, '#efe2c8');
        chap(k, 'Laundry day');
        k.text('FULLONICA', 960, 160, { size: 90, font: 'title', color: P.brown, fx: 'pop', p: k.at('full', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        for (let i = 0; i < 3; i++) k.prop('pot', 300 + i * 170, 560, 160, { fill: '#d8c060', p: k.at(k.cue('jars', i * 0.2), 0.4) });
        note(k, 'urine jars', 470, 700, 'jars', { size: 50, fx: 'pop' });
        note(k, 'stale urine → AMMONIA', 960, 300, 'amm', { size: 56, color: P.indigo, fx: 'pop' });
        k.rect(1060, 760, 400, 140, { fill: '#c9b04a', fillStyle: 'solid', width: 5, p: k.at('stomp', 0.5), seed: 3170 });
        const st = Math.abs(Math.sin((k.gt ?? 0) * 6)) * 30 * k.at('stomp', 0.4);
        k.char(1260, 800 - st, 400, { ...ROMAN, color: '#d9d4cb', face: k.t > k.cue('joke') ? 'blank' : 'happy', p: k.at('stomp', 0.5) });
        k.text('smell: included', 960, 1010, { size: 60, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{tax}The emperor Vespasian even put a tax on the urine trade. {titus}His son Titus thought it was disgusting. {coin}So, the story goes, Vespasian held up a coin and asked him if it smelled. {olet}Pecunia non olet. {means}Money doesn't stink. {joke}Two thousand years later, people still use the phrase.",
      sfx: [['cash', 'tax', 0.4], ['wahwah', 'titus', 0.3], ['ding', 'coin', 0.4], ['tada', 'olet', 0.4]],
      draw(k) {
        bath(k, { pool: false });
        chap(k, 'Laundry day');
        card(k, 400, 200, ['VESPASIAN', 'emperor · AD 69–79'], 'tax', { w: 480 });
        k.char(620, G + 30, 460, { ...VESP, face: k.t > k.cue('coin') ? 'smug' : 'happy', pose: k.t > k.cue('coin') ? 'present' : 'stand', p: k.at('tax', 0.5) });
        k.char(1260, G + 30, 420, { ...TITUS, face: k.t > k.cue('coin') ? 'shock' : 'angry', flip: true, p: k.at('titus', 0.5) });
        k.icon('coin', 860, 520, 120, { p: k.at('coin', 0.5) });
        k.text('"PECUNIA NON OLET"', 1180, 220, { size: 76, font: 'title', color: P.red, fx: 'pop', p: k.at('olet', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.text('money doesn\'t stink', 1180, 320, { size: 56, font: 'title', color: P.ink, fx: 'pop', p: k.at('means', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 5: Did medieval people bathe? ----------------
    {
      chapter: 'Did medieval people bathe?',
      say: "{myth}Now, a myth. {heard}You've probably heard that medieval Europeans never bathed. {wrong}Not true. {stews}Medieval towns had public bathhouses, often called stews. {paris}By the late 1200s, Paris alone had dozens of them, {guild}with their own guild, and rules about prices and opening hours. {joke}Medieval people were not nearly as smelly as the movies suggest.",
      sfx: [['pop', 'myth'], ['bonk', 'wrong', 0.3], ['pop', 'stews'], ['tada', 'paris', 0.4], ['pop', 'guild'], ['boing', 'joke', 0.3]],
      draw(k) {
        town(k);
        chap(k, 'Did medieval people bathe?');
        note(k, '"medieval people never bathed"', 960, 180, 'heard', { size: 60, color: P.ink, fx: 'pop' });
        redX(k, 960, 180, 90, 'wrong');
        k.rect(860, G - 300, 300, 300, { fill: '#f5efe0', fillStyle: 'solid', width: 5, p: k.at('stews', 0.5), seed: 3180 });
        k.text('BATHS', 1010, G - 240, { size: 50, font: 'title', color: P.red, p: k.at('stews', 0.5) });
        k.rect(900, G - 160, 220, 110, { fill: '#7FB5D5', fillStyle: 'solid', width: 4, p: k.at('stews', 0.5), seed: 3181 });
        k.char(700, G + 30, 360, { ...MEDI, face: 'happy', p: k.at('stews', 0.5) });
        k.char(1300, G + 30, 340, { ...MEDIW, face: 'happy', flip: true, p: k.at('stews', 0.5) });
        big(k, 'PARIS: DOZENS', 960, 330, 'paris', { size: 90, color: P.grass });
        note(k, 'guild · prices · opening hours', 960, 430, 'guild', { size: 46 });
      },
    },
    {
      say: "{what}So what happened? {decline}From the 1500s, bathhouses declined. {pores}Many doctors believed hot water opened your pores, {disease}and let disease in, especially during plague outbreaks. {linen}So wealthy Europeans cleaned themselves by changing into fresh white linen shirts, {soak}which were thought to soak up the dirt. {joke}Clean shirt. Same person.",
      sfx: [['pop', 'what'], ['wahwah', 'decline', 0.3], ['pop', 'pores'], ['bonk', 'disease', 0.3], ['sparkle', 'linen', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Did medieval people bathe?');
        k.char(380, 980, 440, { ...DOC, face: k.t > k.cue('disease') ? 'shock' : 'calm', pose: 'point', p: k.at('pores', 0.5) });
        k.bubble(520, 260, 560, 160, 460, 560, { p: k.at('pores', 0.4), text: 'Water opens your pores!', size: 42 });
        k.text('1500s+: BATHHOUSES CLOSE', 1320, 160, { size: 60, font: 'title', color: P.red, fx: 'pop', p: k.at('decline', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.char(1360, 980, 440, { ...LINEN, face: k.t > k.cue('joke') ? 'smug' : 'happy', pose: 'present', p: k.at('linen', 0.5) });
        k.text('fresh white linen = "clean"', 1360, 470, { size: 50, font: 'title', color: P.ink, fx: 'pop', p: k.at('linen', 0.4), outline: '#fffaf0', outlineWidth: 8 });
        k.text('clean shirt. same person.', 1360, 1030, { size: 56, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    {
      say: "{mean}Meanwhile, across the Atlantic, {aztec}Spanish visitors to the Aztec capital were struck by how often people there bathed. {daily}Many Aztecs bathed daily, {steam}and used steam baths called temazcalli. {moct}The ruler Moctezuma reportedly bathed every day. {soap}They even had soap-like plants, like the fruit of the soapberry tree. {irony}So in the 1500s, as Europeans started avoiding water, {joke}the people they called uncivilized were the ones taking baths.",
      sfx: [['whoosh', 'mean', 0.4], ['pop', 'aztec'], ['pop', 'daily'], ['pop', 'steam'], ['pop', 'moct'], ['sparkle', 'soap', 0.4], ['ding', 'joke', 0.4]],
      draw(k) {
        flat(k, P.sky, '#9a8a6a');
        chap(k, 'Did medieval people bathe?');
        k.poly([[1300, G], [1440, G - 360], [1600, G - 360], [1740, G]], { fill: '#c9a07a', fillStyle: 'solid', width: 5, seed: 3440 });
        k.rect(1470, G - 440, 100, 80, { fill: '#e0302b', fillStyle: 'solid', width: 5, seed: 3441 });
        card(k, 520, 190, ['TENOCHTITLAN', 'Aztec capital · 1500s'], 'aztec', { w: 560 });
        k.rect(420, G - 200, 360, 200, { fill: '#c9a07a', fillStyle: 'solid', width: 5, p: k.at('steam', 0.5), seed: 3442 });
        k.ellipse(600, G - 200, 360, 120, { fill: '#b8907a', fillStyle: 'solid', width: 5, p: k.at('steam', 0.5), seed: 3443 });
        for (let i = 0; i < 3; i++) { const u = ((k.gt ?? 0) * 0.4 + i / 3) % 1; k.text('~', 540 + i * 60, G - 280 - u * 140, { size: 64, font: 'title', color: '#ffffff', p: Math.sin(u * Math.PI) * k.at('steam', 0.5) }); }
        note(k, 'temazcalli', 600, G + 70, 'steam', { size: 46, fx: 'pop' });
        k.char(1000, G + 30, 400, { body: 'man', outfit: 'tunic', color: '#ffffff', color2: '#2a8a8a', hair: 'short', hairColor: '#1b1b1b', hat: 'kingfeather', skin: '#b07a4a', face: 'smug', p: k.at('moct', 0.5) });
        note(k, 'bathed daily', 1000, 360, 'daily', { size: 60, color: P.grass, fx: 'pop' });
        k.prop('berries', 1240, 500, 110, { p: k.at('soap', 0.5) });
        note(k, 'soapberry', 1240, 600, 'soap', { size: 44, fx: 'pop' });
        k.text('who was "uncivilized"?', 960, 1010, { size: 58, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    // ---------------- Chapter 6: And you? ----------------
    {
      chapter: 'And you?',
      say: "{you}And you? {daily}For many people, a daily shower with soap only became normal in the twentieth century, with indoor plumbing. {derm}And some dermatologists now say that scrubbing every inch of your body with soap, every day, is more than most skin needs. {oil}Suddenly, the oil and the scraper don't sound so crazy. {joke}Don't sell your sweat, though.",
      sfx: [['pop', 'you'], ['whoosh', 'daily', 0.4], ['pop', 'derm'], ['ding', 'oil', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k, '#e8f0f5');
        chap(k, 'And you?');
        k.rect(260, 220, 440, 640, { fill: '#ffffff', fillStyle: 'solid', width: 5, seed: 3190 });
        k.line(480, 220, 480, 160, { stroke: '#8a8a8a', width: 10, seed: 3191 });
        k.ellipse(480, 150, 120, 40, { fill: '#c9ccd1', fillStyle: 'solid', width: 4, seed: 3192 });
        for (let i = 0; i < 8; i++) { const u = ((k.gt ?? 0) * 1.4 + i / 8) % 1; k.dot(420 + (i % 4) * 40, 180 + u * 500, 6, '#7FB5D5', 0.8); }
        k.char(480, 860, 440, { ...YOU, face: 'happy', p: k.at('you', 0.5) });
        big(k, '20th CENTURY', 1300, 260, 'daily', { size: 90 });
        note(k, 'daily shower + soap', 1300, 360, 'daily', { size: 50 });
        note(k, 'some dermatologists:', 1300, 500, 'derm', { size: 46, color: '#6b5f55' });
        note(k, 'daily full-body soap = often too much', 1300, 570, 'derm', { size: 50, color: P.red, fx: 'pop' });
        k.prop('pot', 1200, 760, 140, { fill: '#c9a24a', p: k.at('oil', 0.5) });
        k.prop('strigil', 1420, 750, 180, { p: k.at('oil', 0.5) });
        k.text('(keep your sweat)', 1300, 960, { size: 54, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Ending ----------------
    {
      chapter: 'Clean is a moving target',
      say: "{back}So, back to that flask of oil and that curved bronze blade. {strange}It sounds strange. {but}But every generation has thought the one before it was dirty. {greeks}The Greeks had their oil. {romans}The Romans had their baths. {med}Medieval towns had their stews. {linen}The rich had their linen shirts. {future}And someday, people will probably look back at your shower, {you}and think you were doing it all wrong.",
      sfx: [['whoosh', 'back', 0.4], ['pop', 'greeks'], ['pop', 'romans'], ['pop', 'med'], ['pop', 'linen'], ['sparkle', 'future', 0.4], ['ding', 'you', 0.4]],
      draw(k) {
        paper(k);
        k.text('CLEAN IS A MOVING TARGET', 960, 150, { size: 76, font: 'title', color: P.red, fx: 'pop', p: k.at('but', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        const eras = [['greeks', 'oil', GREEK, 'strigil'], ['romans', 'baths', ROMAN, null], ['med', 'stews', MEDI, null], ['linen', 'linen', LINEN, null], ['future', 'you?', YOU, null]];
        eras.forEach(([c, t, pr, prop], i) => {
          const x = 260 + i * 350;
          k.char(x, 860, 320, { ...pr, face: c === 'future' ? (k.t > k.cue('you') ? 'shock' : 'happy') : 'happy', p: k.at(c, 0.5) });
          if (prop) k.prop(prop, x + 90, 600, 110, { p: k.at(c, 0.5) });
          note(k, t, x, 950, c, { size: 52, color: c === 'future' ? P.red : P.ink, fx: 'pop' });
        });
        k.arrow(200, 1030, 1720, 1030, { stroke: P.orange, width: 6, p: k.at('greeks', 6, 'linear'), seed: 3195 });
      },
    },

    // ---------------- Recap ----------------
    {
      chapter: 'Recap',
      say: "{remind}Before the recap: remember that sponge on a stick. That's next time. {t}Quick recap. {a}Before soap, people scrubbed with water, sand, ash, and foaming plants. {b}Greeks oiled up and scraped off, and sold the gunk. {c}Roman baths were huge, but worms didn't go away. {d}Romans washed clothes with urine, and taxed it. {e}And medieval people did bathe, until doctors scared them off.",
      sfx: [['ding', 'remind', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['pop', 'e']],
      draw(k) {
        k.group({ a: 1 - k.at('t', 0.4) }, () => {
          paper(k);
          k.line(900, 900, 960, 420, { stroke: '#8B5A2B', width: 12, seed: 3196 });
          k.ellipse(966, 390, 110, 80, { fill: P.yellow, fillStyle: 'solid', width: 5, seed: 3197 });
          k.text('remember the sponge on a stick', 960, 220, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at(k.cue('remind', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 10 });
        });
        k.group({ a: k.at('t', 0.4) }, () => {
          paper(k);
          k.text('RECAP', 960, 110, { size: 80, font: 'title', color: P.red, p: k.at('t', 0.8, 'linear') });
          const rows = [['a', 'tree', 'Before soap: water, sand, ash, saponins'], ['b', 'strigil', 'Greeks: oil + strigil (and gloios for sale)'], ['c', 'pot', 'Roman baths: worms didn\'t go away'], ['d', 'coin', 'Urine laundry — and a urine tax'], ['e', 'scroll', 'Medieval people did bathe']];
          rows.forEach(([c, prop, t], i) => {
            const y = 250 + i * 160;
            if (prop === 'coin') k.icon('coin', 300, y, 100, { p: k.at(c, 0.5) }); else k.prop(prop, 300, y, 120, { p: k.at(c, 0.5), fill: prop === 'pot' ? '#7FB5D5' : undefined });
            k.text(t, 400, y, { size: 52, font: 'title', align: 'left', p: k.at(c, 1.4, 'linear'), color: P.ink });
          });
        });
      },
    },
    nextEpisodeScene({
      lang: 'en',
      say: "{next}Next episode: how did ancient humans go to the toilet? {hook}Rows of seats with no walls. A sponge on a stick. {before}And before toilet paper, what did people actually use? {when}Coming soon.",
      title: 'How Did Ancient Humans Go to the Toilet?',
      hook: 'Rows of seats. No walls. A sponge on a stick.',
      when: 'COMING SOON',
      art: (k) => {
        k.rect(-260, 60, 480, 50, { fill: '#e8dcc4', fillStyle: 'solid', width: 4, seed: 3198 });
        k.rect(-260, 110, 480, 50, { fill: '#d8c8a8', fillStyle: 'solid', width: 4, seed: 3199 });
        for (let i = 0; i < 3; i++) k.ellipse(-180 + i * 160, 78, 70, 24, { fill: '#3b2f2a', fillStyle: 'solid', width: 3, seed: 3200 + i });
        k.line(300, 150, 320, -60, { stroke: '#8B5A2B', width: 8, seed: 3203 });
        k.ellipse(324, -76, 60, 44, { fill: P.yellow, fillStyle: 'solid', width: 4, seed: 3204 });
      },
      sfx: [['sparkle', 'hook', 0.3]],
    }),
    subscribeScene({
      lang: 'en',
      say: "{q}Would you try the oil and scraper shower? Or would you rather share a Roman bath? Put it in the comments. {sub}And subscribe, so you don't miss what happened next.",
      question: 'Oil + scraper, or a Roman bath?',
      channel: 'Long Story Drawn',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
