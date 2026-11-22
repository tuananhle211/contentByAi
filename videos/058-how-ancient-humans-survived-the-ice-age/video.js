// Long Story Drawn — Ep 10: How Did Ancient Humans Survive the Ice Age? (promised in Ep 9: no heating, no zippers; houses of mammoth bones)
// Rules (kenh-ancient-humans): cold open pays off the poster promise; series + agenda ≤ 15 s; re-hook every ~60 s; recap ≤ 15 s.
// Fact check:
//  Last Glacial Maximum ~26,500–19,000 years ago. Tierney et al. 2020 (Nature): global mean ~6.1 °C colder than pre-industrial; high latitudes ~14 °C colder.
//  Ice sheets over much of North America and Scandinavia; sea level ~120–130 m lower; Beringia (land link Asia–America); Doggerland (Britain joined to Europe).
//  Toups et al. 2011: clothing lice split from head lice ~83,000–170,000 years ago (callback Ep 7).
//  Eyed needles: Denisova Cave (Siberia) ~40,000–50,000 years (dates vary); Xiaogushan (NE China) ~33,000–21,000; awls older. Eyed needles → fitted, layered clothes.
//  Mal'ta–Buret' culture (near Lake Baikal, ~24,000 years): ivory figurines in hooded, fur-textured overalls (interpretation).
//  Mezhyrich (Ukraine): several hundred mammoth bones and tusks in rough circles 6–10 m across; 2025 redating ~18,000 years; perhaps temporary shelters.
//  Burned bone common in Upper Paleolithic hearths; bone as fuel where wood was scarce (say "likely").
//  Lean meat alone can't sustain people ("rabbit starvation" / protein ceiling); Ice Age hunters prized fat and marrow; bone-grease rendering (say "archaeologists think").
//  During the LGM, people in Europe retreated to milder southern refuges (e.g. Iberia, southern France, the Balkans) and spread north again later (genetics + archaeology).
//  Lascaux (~17,000–19,000 years), Chauvet (~36,000 years): Ice Age cave art.
//  Neanderthals' stocky build may have helped conserve heat (debated); modern humans leaned on technology.
//  Paisley Caves (Ep 8 callback): people in the Americas ~14,300 years ago — the Bering land bridge region.
//  Next episode (Ep 11): How Did Ancient Humans Hunt Mammoths? Poster: COMING SOON.
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import { P, G, YOU, ANC, ANCW, ELDER, KID, SCI, flat, paper, chap, big, note, redX, card, campNight, glow, night } from '/channel/long-story-drawn.js';
import * as thumbs from '/videos/058-how-ancient-humans-survived-the-ice-age/thumbs.js';

const FUR = (extra = {}) => ANC({ outfit: 'robe', color: '#8a6a4a', color2: '#5a4030', hair: 'long', hairColor: '#3a2a1e', skin: '#e0b48a', ...extra });
const FURW = (extra = {}) => ANCW({ color: '#9a7a5a', color2: '#6b4a33', hair: 'long', hairColor: '#5a3a24', skin: '#e0b48a', ...extra });
const GRANICE = { ...ELDER, color: '#8a6a4a', skin: '#e0b48a' };
const NEAN = { body: 'big', outfit: 'robe', color: '#7a5a3a', color2: '#5a4030', hair: 'long', hairColor: '#5a3a24', beard: true, beardColor: '#5a3a24', skin: '#d9a77c' };
const KIDF = { ...KID, outfit: 'tunic', color: '#8a6a4a', skin: '#e0b48a' };

// Thảo nguyên băng hà: trời xám xanh, tuyết, núi băng xa.
function steppe(k, o = {}) {
  flat(k, o.sky ?? '#cfe0ea', o.ground ?? '#eef3f6');
  k.prop('mountain', 300, G - 300, 620, { snow: true, fill: '#9aa8b0' });
  k.prop('mountain', 1650, G - 340, 720, { snow: true, fill: '#a8b4bc' });
  if (o.snow !== false) for (let i = 0; i < 26; i++) { const u = ((k.gt ?? 0) * 0.25 + k.rand(i)) % 1; k.dot(k.rand(i + 9) * k.W, u * k.H, 5, '#ffffff', 0.9); }
}
// Lều xương voi ma mút: vòng ngà cong + mái da.
function boneHut(k, x, y, s, o = {}) {
  const p = o.p ?? 1;
  k.group({ x, y, s: s / 100, a: Math.min(1, p * 3) }, () => {
    k.ellipse(0, -30, 200, 120, { fill: '#8a6a4a', fillStyle: 'solid', width: 4, seed: 5900, p });
    for (let i = 0; i < 9; i++) {
      const a = Math.PI + (i / 8) * Math.PI;
      k.line(Math.cos(a) * 100, 0, Math.cos(a) * 60, Math.sin(a) * 90, { stroke: '#f1e8d4', width: 9, seed: 5901 + i, p });
    }
    for (let i = 0; i < 6; i++) k.ellipse(-80 + i * 32, 6, 30, 18, { fill: '#f1e8d4', fillStyle: 'solid', width: 3, seed: 5911 + i, p });
  });
}
function mammoth(k, x, y, s, o = {}) {
  k.prop('elephant', x, y, s, { fill: '#7a5a3a', flip: o.flip, p: o.p ?? 1, tusks: 2 });
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    title: 'How Did Ancient Humans Survive the Ice Age?',
    description: `No heating, no zippers, and trees so rare that people built houses out of mammoth bones. How did anyone survive the last Ice Age?
How did ancient humans survive the Ice Age? How cold it really was, the first needles and hooded fur suits, bone houses in Ukraine, why fat mattered more than meat, and where people went when the ice came. Episode 10 of "How your ancestors actually lived".`,
    footer: `📚 Sources: Tierney et al. (2020, Nature), "Glacial cooling and climate sensitivity revisited"; Toups et al. (2011, Molecular Biology and Evolution), clothing lice; Denisova Cave and Xiaogushan eyed needles (d'Errico et al. 2018, Journal of Human Evolution, review); Mal'ta–Buret' culture figurines; Mezhyrich mammoth-bone structures (2025 redating, Leiden University); Farmer et al. (2023, PNAS), Bering land bridge.
🧊 Previous episode: How Long Did Ancient Humans Actually Live? Next: How Did Ancient Humans Hunt Mammoths?`,
    tags: ['how did ancient humans survive the ice age', 'ice age humans', 'last glacial maximum', 'how cold was the ice age', 'mammoth bone houses', 'mezhyrich', 'oldest needle', 'ice age clothing', 'how did cavemen stay warm', 'bering land bridge', 'doggerland', 'cave art', 'ancient humans', 'human evolution', 'prehistory', 'anthropology', 'early humans', 'animated history', 'history explained', 'how people lived', 'long story drawn'],
    hashtags: ['ancienthumans', 'iceage', 'history'],
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
      say: "{cold}It's bitterly cold. {wind}The wind hasn't stopped for days. {no}No heating. No zippers. No down jacket. {trees}Trees are so rare out here, you can walk all day without seeing one. {home}So you head home: {bones}a dome built out of mammoth bones. {where}This is Ukraine, about eighteen thousand years ago. {q}How did anyone survive this?",
      sfx: [['whoosh', 'cold', 0.4], ['whoosh', 'wind', 0.4], ['bonk', 'no', 0.3], ['pop', 'trees'], ['pop', 'home'], ['tada', 'bones', 0.4], ['pop', 'where'], ['drumroll', 'q', 0.3]],
      draw(k) {
        steppe(k);
        const sh = Math.sin((k.gt ?? 0) * 18) * 3 * (1 - k.at('home', 0.6));
        k.char(560 + sh, G + 30, 440, { ...FUR(), face: k.t > k.cue('bones') ? 'happy' : 'sad', walk: k.t > k.cue('home') && k.t < k.cue('where') });
        k.text('NO HEATING', 1320, 200, { size: 80, font: 'title', color: P.indigo, fx: 'pop', p: k.at('no', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        boneHut(k, 1350, G - 40, 260, { p: k.at('bones', 0.6) });
        k.text('~18,000 YEARS AGO', 1350, 340, { size: 60, font: 'title', color: P.red, fx: 'pop', p: k.at('where', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{series}This is episode ten of How Your Ancestors Actually Lived. {today}Today: {a}how cold the Ice Age really was, {b}the invention that kept people warm, {c}and houses made of mammoths. {sub}Subscribe for the next one.",
      sfx: [['pop', 'series'], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'sub', 0.5]],
      draw(k) {
        paper(k);
        note(k, 'HOW YOUR ANCESTORS ACTUALLY LIVED · Ep. 10', 960, 130, 'series', { size: 52, color: P.brown });
        const items = [['a', 'HOW COLD?', 'thermo'], ['b', 'THE NEEDLE', 'needle'], ['c', 'BONE HOUSES', 'hut']];
        items.forEach(([c, t, prop], i) => {
          const x = 420 + i * 540, p = k.at(c, 0.5);
          k.group({ x, y: 560, r: i % 2 ? 0.03 : -0.03, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-210, -220, 420, 440, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 5920 + i });
            if (prop === 'thermo') k.prop('thermo', 0, -50, 200, { level: 0.15 });
            else if (prop === 'needle') { k.line(-80, 20, 80, -120, { stroke: '#e8dcc4', width: 10, seed: 5925 }); k.circle(70, -110, 10, { stroke: P.ink, width: 3, seed: 5926 }); }
            else boneHut(k, 0, 0, 160);
            k.text(t, 0, 150, { size: 48, font: 'title', color: P.red, maxWidth: 380 });
          });
        });
        k.char(1760, 1060, 300, { ...YOU, face: 'happy', pose: 'wave', p: k.at('sub', 0.5) });
      },
    },

    // ---------------- Chapter 1: How cold? ----------------
    {
      chapter: 'How cold was it?',
      say: "{peak}The coldest stretch of the last Ice Age, the Last Glacial Maximum, ran from about twenty-six thousand to nineteen thousand years ago. {tierney}In 2020, a team led by Jessica Tierney calculated the planet was about six degrees Celsius colder on average than before the industrial era. {six}Six degrees sounds small. {but}But that's an average for the whole planet. {north}In the far north, it was around fourteen degrees colder.",
      sfx: [['pop', 'peak'], ['pop', 'tierney'], ['drumroll', 'six', 0.3], ['wahwah', 'but', 0.3], ['bonk', 'north', 0.3]],
      draw(k) {
        paper(k, '#e8f0f5');
        chap(k, 'How cold was it?');
        card(k, 520, 200, ['TIERNEY ET AL., 2020', 'Nature · Last Glacial Maximum'], 'tierney', { w: 680 });
        note(k, '~26,500 – 19,000 years ago', 520, 340, 'peak', { size: 48, color: P.brown });
        k.prop('thermo', 1300, 560, 360, { level: 1 - k.at('tierney', 2) * 0.4, p: k.at('tierney', 0.5) });
        big(k, '−6 °C', 1300, 200, 'tierney', { size: 120, color: P.indigo });
        note(k, 'planet average', 1300, 300, 'six', { size: 46 });
        big(k, '−14 °C', 1000, 860, 'north', { size: 110, color: '#2a5a8a' });
        note(k, 'in the far north', 1000, 960, 'north', { size: 46, fx: 'pop' });
      },
    },
    {
      say: "{ice}Giant ice sheets covered most of Canada, and Scandinavia. {sea}So much water was locked up in ice that sea levels fell around a hundred and twenty meters. {walk}You could walk from France to Britain, across land now under the North Sea, called Doggerland. {bering}And you could walk from Siberia toward Alaska, across a land bridge called Beringia. {paisley}Remember the fourteen-thousand-year-old poop in Oregon from episode eight? {how}That's roughly how the first Americans got there.",
      sfx: [['whoosh', 'ice', 0.4], ['pop', 'sea'], ['pop', 'walk'], ['pop', 'bering'], ['boing', 'paisley', 0.3], ['ding', 'how', 0.4]],
      draw(k) {
        k.ctx.fillStyle = '#7FB5D5'; k.ctx.fillRect(0, 0, k.W, k.H);
        chap(k, 'How cold was it?');
        const land = (pts, seed, p) => k.poly(pts, { fill: '#c9b48a', fillStyle: 'solid', width: 5, seed, p });
        land([[100, 300], [700, 260], [820, 520], [600, 900], [200, 960], [80, 700]], 5930, 1);
        land([[1100, 260], [1800, 300], [1850, 900], [1300, 960], [1050, 600]], 5931, 1);
        k.poly([[150, 200], [750, 180], [760, 380], [200, 420]], { fill: '#ffffff', fillStyle: 'solid', width: 5, seed: 5932, p: k.at('ice', 0.6) });
        k.poly([[1150, 180], [1800, 200], [1780, 420], [1180, 440]], { fill: '#ffffff', fillStyle: 'solid', width: 5, seed: 5933, p: k.at('ice', 0.6) });
        k.rect(820, 520, 230, 200, { fill: '#d9c49a', fillStyle: 'solid', width: 4, seed: 5934, p: k.at('sea', 0.8) });
        big(k, '−120 m', 960, 160, 'sea', { size: 90, color: P.indigo });
        note(k, 'DOGGERLAND', 480, 1000, 'walk', { size: 54, color: P.brown, fx: 'pop' });
        note(k, 'BERINGIA', 1440, 1000, 'bering', { size: 54, color: P.brown, fx: 'pop' });
        k.arrow(1300, 700, 1700, 560, { stroke: P.red, width: 7, p: k.at('how', 0.6), seed: 5935 });
      },
    },

    {
      say: "{giants}And this frozen world was crowded with giants. {mam}Woolly mammoths, {rhino}woolly rhinos, {lion}cave lions, {deer}and giant deer with antlers spanning more than three meters. {steppe}The cold, dry grassland they lived on, the mammoth steppe, stretched from Spain to Canada. {joke}A safari park, if the safari park could also kill you with weather.",
      sfx: [['pop', 'giants'], ['pop', 'mam'], ['pop', 'rhino'], ['pop', 'lion'], ['pop', 'deer'], ['whoosh', 'steppe', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        steppe(k, { snow: false });
        chap(k, 'How cold was it?');
        mammoth(k, 360, G - 150, 360, { p: k.at('mam', 0.5) });
        k.prop('ox', 760, G - 110, 260, { fill: '#6b5a4a', p: k.at('rhino', 0.5) });
        k.prop('tiger', 1120, G - 100, 240, { fill: '#c9a06a', p: k.at('lion', 0.5) });
        k.prop('horse', 1520, G - 120, 260, { fill: '#8a6a4a', p: k.at('deer', 0.5) });
        const lab = [['mam', 'mammoth', 360], ['rhino', 'woolly rhino', 760], ['lion', 'cave lion', 1120], ['deer', 'giant deer (3 m+ antlers)', 1520]];
        lab.forEach(([c, t, x]) => note(k, t, x, 380, c, { size: 40, fx: 'pop' }));
        k.text('THE MAMMOTH STEPPE', 960, 220, { size: 80, font: 'title', color: P.brown, fx: 'pop', p: k.at('steppe', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.text('a safari park with killer weather', 960, 1010, { size: 54, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    // ---------------- Chapter 2: The needle ----------------
    {
      chapter: 'The needle',
      say: "{fur}So how do you keep warm? {wrap}Wrapping yourself in a hide helps. {gaps}But wind finds every gap. {lice}Remember the lice from episode seven? {dna}Their DNA suggests people were wearing clothes at least eighty-three thousand years ago. {but}But the real game-changer was a tiny tool: {needle}the eyed needle.",
      sfx: [['pop', 'fur'], ['pop', 'wrap'], ['whoosh', 'gaps', 0.4], ['pop', 'lice'], ['pop', 'dna'], ['drumroll', 'but', 0.3], ['tada', 'needle', 0.4]],
      draw(k) {
        steppe(k);
        chap(k, 'The needle');
        k.char(520, G + 30, 420, { ...ANC({ outfit: 'bare', skin: '#e0b48a' }), face: k.t > k.cue('gaps') ? 'sad' : 'calm', p: k.at('fur', 0.5) });
        k.ellipse(520, G - 210, 260, 200, { fill: '#9a7a5a', fillStyle: 'solid', width: 5, seed: 5940, p: k.at('wrap', 0.5), alpha: 0.95 });
        for (let i = 0; i < 4; i++) k.line(180, 380 + i * 60, 360, 380 + i * 60, { stroke: '#ffffff', width: 5, seed: 5941 + i, p: k.at('gaps', 0.5) });
        note(k, 'clothes: 83,000+ years (lice DNA)', 1300, 300, 'dna', { size: 48, fx: 'pop' });
        k.line(1100, 760, 1500, 540, { stroke: '#e8dcc4', width: 14, seed: 5946, p: k.at('needle', 0.6) });
        k.circle(1480, 552, 14, { stroke: P.ink, width: 4, seed: 5947, p: k.at('needle', 0.6) });
        big(k, 'THE EYED NEEDLE', 1300, 880, 'needle', { size: 90 });
      },
    },
    {
      say: "{why}Why does an eye matter? {awl}Before needles, people punched holes with pointed bone awls, then pushed thread through by hand. {eye}With an eye, you can sew fast, small, tight stitches. {fit}That means fitted clothes: sleeves, leggings, hoods, layers that trap warm air. {deni}Some of the oldest known eyed needles come from Denisova Cave in Siberia, roughly forty to fifty thousand years old. {cold}And they turn up most in the coldest places. {joke}The first fashion item was basically survival gear.",
      sfx: [['pop', 'why'], ['pop', 'awl'], ['ding', 'eye', 0.4], ['pop', 'fit'], ['pop', 'deni'], ['pop', 'cold'], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'The needle');
        k.line(240, 420, 420, 300, { stroke: '#d9c4a0', width: 16, seed: 5950, p: k.at('awl', 0.5) });
        note(k, 'awl: punch, then push', 300, 500, 'awl', { size: 40, fx: 'pop' });
        k.line(760, 420, 960, 290, { stroke: '#e8dcc4', width: 12, seed: 5951, p: k.at('eye', 0.5) });
        k.circle(948, 298, 10, { stroke: P.ink, width: 3, seed: 5952, p: k.at('eye', 0.5) });
        note(k, 'needle: sew fast, tight', 860, 500, 'eye', { size: 40, color: P.grass, fx: 'pop' });
        k.char(1460, 980, 460, { ...FUR({ hat: undefined }), face: 'happy', p: k.at('fit', 0.5) });
        const parts = [['fit', 'sleeves'], ['fit', 'leggings'], ['fit', 'hood'], ['fit', 'layers']];
        parts.forEach(([c, t], i) => note(k, t, 1100, 520 + i * 70, k.cue(c, i * 0.3), { size: 44, color: P.brown, fx: 'pop' }));
        card(k, 520, 760, ['DENISOVA CAVE · SIBERIA', 'eyed needles ~40–50,000 years'], 'deni', { w: 720 });
        k.text('fashion = survival gear', 960, 1010, { size: 60, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{malta}Near Lake Baikal in Siberia, about twenty-four thousand years ago, people carved little ivory figures. {hood}Several wear what look like hooded, one-piece fur suits, {stripe}with decorated stripes. {parka}Basically: Ice Age parkas. {inuit}People in the Arctic still wear tailored fur parkas today, because they work. {joke}Twenty-four thousand years, and the design barely changed. That's a good product.",
      sfx: [['pop', 'malta'], ['pop', 'hood'], ['pop', 'stripe'], ['tada', 'parka', 0.4], ['pop', 'inuit'], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k, '#efe6d6');
        chap(k, 'The needle');
        card(k, 520, 200, ["MAL'TA–BURET' · SIBERIA", 'ivory figurines · ~24,000 years'], 'malta', { w: 720 });
        for (let i = 0; i < 3; i++) k.char(300 + i * 220, 900, 300, { ...FURW({ hat: 'band', color: '#e8dcc4', color2: '#b9a47a' }), face: 'calm', shadow: false, p: k.at(k.cue('hood', i * 0.2), 0.4) });
        note(k, 'hooded fur suits', 520, 420, 'hood', { size: 52, fx: 'pop' });
        big(k, 'ICE AGE PARKAS', 1340, 300, 'parka', { size: 90 });
        k.char(1340, 980, 440, { ...FUR({ color: '#c9a07a', hat: 'band' }), face: 'smug', p: k.at('inuit', 0.5) });
        k.text('good product.', 1340, 1030, { size: 56, font: 'title', color: P.grass, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 3: Houses of bone ----------------
    {
      chapter: 'Houses of bone',
      say: "{mez}Now, those bone houses. {site}At Mezhyrich, in Ukraine, archaeologists uncovered rings of mammoth bones: {count}hundreds of skulls, jaws, tusks and leg bones, {size}arranged in circles about six to ten meters across. {date}A 2025 study dated the largest to around eighteen thousand years ago, just after the coldest peak. {cover}Hides were probably stretched over the top. {joke}Architecture by mammoth. Not by choice, for the mammoth.",
      sfx: [['pop', 'mez'], ['pop', 'site'], ['pop', 'count'], ['pop', 'size'], ['pop', 'date'], ['pop', 'cover'], ['boing', 'joke', 0.3]],
      draw(k) {
        steppe(k, { snow: false });
        chap(k, 'Houses of bone');
        card(k, 520, 200, ['MEZHYRICH · UKRAINE', '~18,000 years ago (2025 study)'], 'site', { w: 700 });
        boneHut(k, 1180, G - 20, 420, { p: k.at('count', 1) });
        k.line(760, G + 60, 1600, G + 60, { stroke: P.red, width: 5, seed: 5960, p: k.at('size', 0.6) });
        note(k, '6–10 m', 1180, G + 120, 'size', { size: 52, color: P.red, fx: 'pop' });
        note(k, 'hides on top (probably)', 1180, 300, 'cover', { size: 48, fx: 'pop' });
        k.text('architecture by mammoth', 520, 1000, { size: 56, font: 'title', color: P.brown, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{fuel}And here's a problem: {wood}what do you burn, when there are almost no trees? {bone}At many Ice Age sites, archaeologists find burned bone in the hearths. {likely}Bone, full of fat and grease, likely helped keep the fire going. {store}Pits around the Mezhyrich huts may have stored meat, frozen solid by the cold itself. {joke}The Ice Age had one advantage: a free freezer.",
      sfx: [['pop', 'fuel'], ['pop', 'wood'], ['pop', 'bone'], ['ding', 'likely', 0.4], ['pop', 'store'], ['boing', 'joke', 0.3]],
      draw(k) {
        campNight(k, { sky: '#2a3450', ground: '#6a7080', fx: 760, fs: 240 });
        chap(k, 'Houses of bone', true);
        glow(k, 760, G - 100, 640, 0.4);
        for (let i = 0; i < 4; i++) k.prop('bone', 640 + i * 70, G - 40, 110, { rotate: (i - 1.5) * 0.4, p: k.at('bone', 0.5) });
        k.text('NO TREES → BURN BONE', 960, 220, { size: 74, font: 'title', color: P.yellow, fx: 'pop', p: k.at('bone', 0.4), outline: P.ink, outlineWidth: 12 });
        k.rect(1300, G - 80, 300, 120, { fill: '#5a4a3a', fillStyle: 'solid', width: 5, seed: 5970, p: k.at('store', 0.5) });
        k.prop('meat', 1450, G - 40, 110, { p: k.at('store', 0.5) });
        k.text('free freezer ❄', 1450, G - 200, { size: 56, font: 'title', color: '#9fd3ff', fx: 'pop', p: k.at('joke', 0.4), outline: P.ink, outlineWidth: 10 });
      },
    },
    {
      say: "{where}But wait. {many}Hundreds of mammoth bones. {how}Where did they all come from? {hunt}Did people hunt mammoths, {scav}or collect bones from animals that died naturally? {next}That's the next episode.",
      sfx: [['pop', 'where'], ['pop', 'many'], ['drumroll', 'how', 0.3], ['pop', 'hunt'], ['pop', 'scav'], ['sparkle', 'next', 0.4]],
      draw(k) {
        steppe(k);
        mammoth(k, 1240, G - 140, 560, { p: k.at('many', 0.5) });
        k.char(560, G + 30, 420, { ...FUR(), face: 'blank', prop: 'spear', pose: 'think', p: k.at('hunt', 0.5) });
        k.text('HUNTED?', 600, 220, { size: 90, font: 'title', color: P.red, fx: 'pop', p: k.at('hunt', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.text('…OR FOUND?', 1300, 220, { size: 90, font: 'title', color: P.indigo, fx: 'pop', p: k.at('scav', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.text('NEXT EPISODE', 960, 1010, { size: 76, font: 'title', color: P.orange, fx: 'pop', p: k.at('next', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 4: Fat is fuel ----------------
    {
      chapter: 'Fat is fuel',
      say: "{eat}What do you eat in a land of ice? {meat}Mostly animals: reindeer, horses, bison, mammoths. {lean}But here's the catch: you can't live on lean meat alone. {rabbit}Arctic explorers called it rabbit starvation: eat only lean meat, and you can feel sick and weak even with a full stomach. {fat}What your body craves in the cold is fat. {marrow}So archaeologists think Ice Age hunters prized marrow, and boiled bones to get the grease out. {joke}The original bone broth. No influencer required.",
      sfx: [['pop', 'eat'], ['pop', 'meat'], ['bonk', 'lean', 0.3], ['wahwah', 'rabbit', 0.3], ['ding', 'fat', 0.4], ['pop', 'marrow'], ['boing', 'joke', 0.3]],
      draw(k) {
        steppe(k, { snow: false });
        chap(k, 'Fat is fuel');
        const an = [['meat', 'reindeer'], ['meat', 'horse'], ['meat', 'bison']];
        k.prop('horse', 360, G - 110, 240, { p: k.at('meat', 0.5) });
        k.prop('ox', 700, G - 110, 260, { p: k.at(k.cue('meat', 0.4), 0.5), fill: '#6b4a33' });
        mammoth(k, 1100, G - 150, 340, { p: k.at(k.cue('meat', 0.8), 0.5) });
        k.text('LEAN MEAT ONLY = ✗', 1300, 220, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('lean', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        note(k, '"rabbit starvation"', 1300, 320, 'rabbit', { size: 50, color: P.brown, fx: 'pop' });
        big(k, 'FAT = FUEL', 1300, 450, 'fat', { size: 100, color: P.orange });
        k.prop('pot', 1600, G - 60, 180, { fill: '#8a6a4a', p: k.at('marrow', 0.5) });
        k.text('the original bone broth', 960, 1010, { size: 58, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 5: Retreat and return ----------------
    {
      chapter: 'Retreat and return',
      say: "{retreat}Some places simply got too cold. {south}During the worst of it, people in Europe pulled back to milder refuges in the south: {iberia}the Iberian Peninsula, southern France, the Balkans. {gene}Ancient DNA and archaeology both show people later spreading north again, as the ice melted. {joke}The original snowbirds, heading south for the winter. A seven-thousand-year winter.",
      sfx: [['pop', 'retreat'], ['whoosh', 'south', 0.4], ['pop', 'iberia'], ['pop', 'gene'], ['boing', 'joke', 0.3]],
      draw(k) {
        k.ctx.fillStyle = '#7FB5D5'; k.ctx.fillRect(0, 0, k.W, k.H);
        chap(k, 'Retreat and return');
        k.poly([[300, 200], [1600, 160], [1700, 900], [1100, 1000], [400, 960], [200, 600]], { fill: '#c9b48a', fillStyle: 'solid', width: 5, seed: 5980 });
        k.poly([[300, 200], [1600, 160], [1620, 420], [320, 460]], { fill: '#ffffff', fillStyle: 'solid', width: 5, seed: 5981, p: k.at('retreat', 0.6) });
        const ref = [['iberia', 'IBERIA', 520, 820], ['iberia', 'S. FRANCE', 820, 700], ['iberia', 'BALKANS', 1300, 800]];
        ref.forEach(([c, t, x, y], i) => { k.circle(x, y, 60, { fill: P.orange, fillStyle: 'solid', width: 4, seed: 5982 + i, p: k.at(k.cue(c, i * 0.3), 0.4) }); note(k, t, x, y + 90, k.cue(c, i * 0.3), { size: 40, color: P.brown, fx: 'pop' }); });
        for (let i = 0; i < 3; i++) k.arrow(700 + i * 300, 760, 760 + i * 300, 480, { stroke: P.grass, width: 6, p: k.at('gene', 0.8), seed: 5986 + i });
        k.text('the original snowbirds', 960, 1030, { size: 56, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{art}And yet, they didn't just survive. {lasc}The famous paintings of Lascaux, in France, were made around seventeen thousand years ago, in the Ice Age. {chau}At Chauvet, the art is around thirty-six thousand years old. {why}Horses, lions, mammoths, drawn by firelight deep in caves. {joke}Freezing, hungry, no heating. Still found time for art. Respect.",
      sfx: [['pop', 'art'], ['sparkle', 'lasc', 0.4], ['sparkle', 'chau', 0.4], ['pop', 'why'], ['ding', 'joke', 0.4]],
      draw(k) {
        k.ctx.fillStyle = '#3b2f2a'; k.ctx.fillRect(0, 0, k.W, k.H);
        chap(k, 'Retreat and return', true);
        k.ellipse(960, 560, 1700, 900, { fill: '#c9a07a', fillStyle: 'solid', width: 6, seed: 5990 });
        k.prop('horse', 600, 520, 260, { fill: '#8a3a2a', p: k.at('lasc', 0.6) });
        mammoth(k, 1100, 500, 300, { p: k.at('chau', 0.6) });
        k.prop('tiger', 1500, 560, 220, { p: k.at('why', 0.6) });
        glow(k, 960, 600, 700, 0.35);
        note(k, 'LASCAUX · ~17,000 years', 600, 760, 'lasc', { size: 48, color: P.ink, fx: 'pop' });
        note(k, 'CHAUVET · ~36,000 years', 1300, 760, 'chau', { size: 48, color: P.ink, fx: 'pop' });
        k.text('still found time for art', 960, 1010, { size: 60, font: 'title', color: P.yellow, fx: 'pop', p: k.at('joke', 0.4), outline: P.ink, outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 6: Bodies vs technology ----------------
    {
      chapter: 'Bodies vs technology',
      say: "{nean}Neanderthals had lived through ice ages long before. {build}Their short, stocky bodies may have helped hold in heat, {debate}though how much is still debated. {sapiens}Modern humans arriving from Africa were taller and leaner, built more for heat. {tech}So they leaned on technology instead: needles, fitted clothes, fire, shelters, and food storage. {you}That's still your strategy. {joke}You didn't evolve a fur coat. You bought one.",
      sfx: [['pop', 'nean'], ['pop', 'build'], ['boing', 'debate', 0.3], ['pop', 'sapiens'], ['ding', 'tech', 0.4], ['pop', 'you'], ['boing', 'joke', 0.3]],
      draw(k) {
        steppe(k);
        chap(k, 'Bodies vs technology');
        k.char(460, G + 30, 380, { ...NEAN, face: 'smug', p: k.at('nean', 0.5) });
        note(k, 'stocky: holds heat?', 460, 380, 'build', { size: 48, fx: 'pop' });
        note(k, '(debated)', 460, 450, 'debate', { size: 40, color: '#6b5f55' });
        k.char(960, G + 30, 460, { ...ANC({ outfit: 'bare', skin: '#8a5a3a', hair: 'short' }), face: k.t > k.cue('tech') ? 'happy' : 'calm', p: k.at('sapiens', 0.5) });
        note(k, 'tall, lean: built for heat', 960, 300, 'sapiens', { size: 48, fx: 'pop' });
        const tech = ['needles', 'fitted clothes', 'fire', 'shelters', 'storage'];
        tech.forEach((t, i) => note(k, '+ ' + t, 1500, 360 + i * 70, k.cue('tech', i * 0.4), { size: 46, color: P.grass, fx: 'pop' }));
        k.text("you didn't evolve a fur coat", 960, 1010, { size: 58, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    {
      say: "{dogs}And people may have had help. {wolf}Genetic studies suggest wolves became dogs sometime during the last Ice Age, {when}though exactly when and where is still argued about. {jobs}Dogs could help track animals, guard camp, and maybe haul loads. {warm}And on a freezing night, a dog is a very good blanket. {joke}Your sofa-hogging dog has an excellent excuse: it's tradition.",
      sfx: [['pop', 'dogs'], ['pop', 'wolf'], ['boing', 'when', 0.3], ['pop', 'jobs'], ['sparkle', 'warm', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        campNight(k, { sky: '#2a3450', ground: '#6a7080', fx: 960, fs: 220 });
        chap(k, 'Bodies vs technology', true);
        glow(k, 960, G - 100, 700, 0.4);
        k.prop('fox', 620, G - 60, 220, { fill: '#8a8a8a', p: k.at('wolf', 0.5) });
        k.prop('fox', 1240, G - 50, 200, { fill: '#c9a06a', p: k.at('jobs', 0.5) });
        k.group({ x: 1500, y: G + 20, r: -Math.PI / 2 }, () => k.char(0, 0, 300, { ...FUR(), face: 'sleep', shadow: false, p: k.at('warm', 0.5) }));
        k.text('WOLF → DOG', 960, 220, { size: 84, font: 'title', color: P.yellow, fx: 'pop', p: k.at('wolf', 0.4), outline: P.ink, outlineWidth: 12 });
        k.text('(when? still debated)', 960, 320, { size: 48, font: 'title', color: '#d9d3e8', fx: 'fade', p: k.at('when', 0.5), outline: P.ink, outlineWidth: 8 });
        k.text("it's tradition", 960, 1010, { size: 60, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at('joke', 0.4), outline: P.ink, outlineWidth: 10 });
      },
    },
    {
      say: "{melt}Then, slowly, the ice melted. {holo}By about eleven thousand seven hundred years ago, the world had warmed into the age we still live in, the Holocene. {sea}Seas rose. {dogger}Doggerland, the land between Britain and Europe, disappeared under the North Sea, over the following few thousand years. {farm}And in the new, warmer world, some people started doing something new: farming. {joke}Which, as episode four showed, came with its own problems.",
      sfx: [['whoosh', 'melt', 0.4], ['pop', 'holo'], ['whoosh', 'sea', 0.4], ['bonk', 'dogger', 0.3], ['pop', 'farm'], ['boing', 'joke', 0.3]],
      draw(k) {
        const w = k.at('melt', 3);
        flat(k, k.lerp(0, 1, w) > 0.5 ? P.sky : '#cfe0ea', w > 0.5 ? '#7a9a5a' : '#eef3f6');
        chap(k, 'Bodies vs technology');
        k.water(k.lerp(1080, 900, k.at('sea', 2)), { color: '#5b9bd5', amp: 8 });
        k.text('THE HOLOCENE', 960, 220, { size: 90, font: 'title', color: P.grass, fx: 'pop', p: k.at('holo', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        note(k, 'from ~11,700 years ago', 960, 320, 'holo', { size: 48 });
        note(k, 'Doggerland → under the North Sea', 960, 420, 'dogger', { size: 52, color: '#2a5a8a', fx: 'pop' });
        k.prop('plough', 1400, 700, 220, { p: k.at('farm', 0.5) });
        k.char(1100, 820, 360, { ...ANC({ outfit: 'tunic', color: '#a87b4f' }), face: 'happy', p: k.at('farm', 0.5) });
      },
    },
    // ---------------- Ending ----------------
    {
      chapter: 'Back to the bone house',
      say: "{back}So, back to that dome of mammoth bones in Ukraine. {inside}Inside: a fire burning bone. {sew}A grandmother stitching a hood with a bone needle. {kids}Kids asleep under furs. {store}Meat frozen in the pit outside. {nothing}None of it is magic. {all}It's what humans do best: when the world turns hostile, {build}we don't wait to evolve. We make things.",
      sfx: [['whoosh', 'back', 0.4], ['pop', 'inside'], ['pop', 'sew'], ['pop', 'kids'], ['pop', 'store'], ['pop', 'nothing'], ['ding', 'build', 0.4]],
      draw(k) {
        k.ctx.fillStyle = '#2a2420'; k.ctx.fillRect(0, 0, k.W, k.H);
        for (let i = 0; i < 9; i++) { const a = Math.PI + (i / 8) * Math.PI; k.line(960 + Math.cos(a) * 900, 1080, 960 + Math.cos(a) * 560, 1080 + Math.sin(a) * 900, { stroke: '#f1e8d4', width: 30, seed: 6000 + i }); }
        k.prop('campfire', 960, 900, 220, { fire: 1 });
        glow(k, 960, 820, 760, 0.35);
        k.char(640, 980, 380, { ...GRANICE, face: 'happy', pose: 'hold', p: k.at('sew', 0.5) });
        for (let i = 0; i < 2; i++) k.group({ x: 1260 + i * 200, y: 960, r: -Math.PI / 2 }, () => k.char(0, 0, 200, { ...KIDF, face: 'sleep', shadow: false, p: k.at('kids', 0.5) }));
        k.text("we don't wait to evolve.", 960, 220, { size: 70, font: 'title', color: P.yellow, fx: 'pop', p: k.at('all', 0.4), outline: P.ink, outlineWidth: 12 });
        k.text('WE MAKE THINGS.', 960, 330, { size: 90, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at('build', 0.4), outline: P.ink, outlineWidth: 14 });
      },
    },

    // ---------------- Recap ----------------
    {
      chapter: 'Recap',
      say: "{t}Quick recap. {a}The planet was about six degrees colder, far more in the north. {b}Eyed needles made fitted, layered clothes possible. {c}People built shelters from mammoth bones and burned bone for fuel. {remind}And next time: did they actually hunt those mammoths?",
      sfx: [['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['ding', 'remind', 0.4]],
      draw(k) {
        paper(k);
        k.text('RECAP', 960, 130, { size: 80, font: 'title', color: P.red, p: k.at('t', 0.8, 'linear') });
        const rows = [['a', '~6 °C colder · ~14 °C in the north'], ['b', 'Eyed needles → fitted clothes'], ['c', 'Mammoth-bone shelters · bone fuel'], ['remind', 'Next: hunting mammoths']];
        rows.forEach(([c, t], i) => {
          k.icon(i === 3 ? 'question' : 'check', 330, 290 + i * 170, 90, { p: k.at(c, 0.4) });
          k.text(t, 420, 300 + i * 170, { size: 58, font: 'title', align: 'left', p: k.at(c, 1.2, 'linear'), color: i === 3 ? P.red : P.ink });
        });
      },
    },
    nextEpisodeScene({
      lang: 'en',
      say: "{next}Next episode: how did ancient humans hunt mammoths? {hook}An animal the size of a bus, and all you have is a spear. {how}So how did they do it? Did they, at all? {when}Coming soon.",
      title: 'How Did Ancient Humans Hunt Mammoths?',
      hook: 'An animal the size of a bus. You have a spear.',
      when: 'COMING SOON',
      art: (k) => {
        k.prop('elephant', 80, 60, 360, { fill: '#7a5a3a', tusks: 2 });
        k.char(-230, 150, 200, { ...ANC({ outfit: 'robe', color: '#8a6a4a' }), face: 'shock', prop: 'spear' });
      },
      sfx: [['sparkle', 'hook', 0.3]],
    }),
    subscribeScene({
      lang: 'en',
      say: "{q}Could you survive one winter in the Ice Age? What's the first thing you'd make? Put it in the comments. {sub}And subscribe, so you don't miss what happened next.",
      question: 'One Ice Age winter: what do you make first?',
      channel: 'Long Story Drawn',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
