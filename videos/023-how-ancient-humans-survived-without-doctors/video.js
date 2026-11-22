// Long Story Drawn — Ep 6: How Did Ancient Humans Survive Without Doctors? (series "how your ancestors actually lived"; promised in Ep 5: the Borneo child who lost a leg and lived)
// Fact check:
//  Maloney et al. 2022 (Nature 609: 547–551), Liang Tebo, East Kalimantan, Borneo (excavated 2020): young adult (~19–20 at death), distal third of left lower leg
//    surgically amputated, probably in childhood; survived 6–9 more years; ≥31,000 years ago; previous oldest amputation: Neolithic farmer, France (~7,000 years).
//    Researchers: required knowledge of anatomy, bleeding control, infection control; suggest Borneo's medicinal plants may have helped; community care in steep karst terrain.
//  Shanidar 1 (Iraq), excavated by Ralph Solecki, found 1957: blow to the side of the face, right arm amputated/lost at the elbow, right leg injuries (limp), degenerative condition.
//    Trinkaus & Villotte 2017 (PLOS ONE): external auditory exostoses → profound hearing loss; lived into his 40s or older; likely depended on his group.
//  Weyrich et al. 2017 (Nature): El Sidrón (Spain) Neanderthal dental calculus — young male with dental abscess + gut parasite (microsporidian, causes diarrhea);
//    DNA of poplar (bark contains salicylic acid) and Penicillium; possible self-medication — authors' interpretation, not proven.
//  Laumer et al. 2024 (Scientific Reports): Rakus, male Sumatran orangutan, Suaq Balimbing, Gunung Leuser NP, June 2022: chewed Akar Kuning (Fibraurea tinctoria) leaves,
//    applied juice to facial wound, then covered it with chewed leaves; wound closed within days, healed within about a month; no sign of infection.
//  Oxilia et al. 2015 (Scientific Reports): Villabruna (N. Italy), ~14,000 years ago — carious molar scraped with a pointed stone tool (no filling).
//  Oxilia et al. 2017 (AJPA): Riparo Fredian near Lucca, ~13,000 years ago — two upper incisors, cavities widened, filled with bitumen, plant fibres and probable hair.
//  Ensisheim (Alsace, France), ~7,000 years ago (Linear Pottery, c. 5100 BC): man with two trepanations, both completely healed. Many Neolithic trepanned skulls show healing.
//  Ötzi (Alps, ~5,300 years ago): 61 tattoos (lines/crosses), many over joints with wear (knees, ankles, lower back); therapeutic/acupuncture idea is debated;
//    carried birch polypore (Fomitopsis betulina) on a leather strap — medicinal properties.
//  Gurven & Kaplan 2007: ~57% survive to 15; illness (mostly infections) causes most deaths in hunter-gatherer samples.
//  Lorna Tilley, "Theory and Practice in the Bioarchaeology of Care" (2015).
//  Next episode (Ep 7): how ancient people stayed clean — Greeks/Romans cleaned with olive oil and a strigil (curved metal scraper). Poster: COMING SOON (no dates).
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import { P, G, YOU, ANC, ANCW, ELDER, KID, SCI, flat, disc, ancient, savanna, night, paper, chap, big, note, redX, card, campNight, glow } from '/channel/long-story-drawn.js';
import * as thumbs from '/videos/023-how-ancient-humans-survived-without-doctors/thumbs.js';

const MALONEY = SCI({ color: '#c2a46b', hair: 'short', hairColor: '#5a3a24' });
const SOLECKI = SCI({ hat: undefined, color: '#a89a7a', hair: 'short', hairColor: '#3a2a1e' });
const NEAN = { body: 'big', outfit: 'bare', color: '#8a6a4a', color2: '#5a4030', hair: 'long', hairColor: '#5a3a24', beard: true, beardColor: '#5a3a24', skin: '#d9a77c' };
const BORNEO = { ...KID, skin: '#9a6b42' };
const BORNEOAD = ANC({ hair: 'short', skin: '#9a6b42', color: '#6b4a33' });
const OTZI = { body: 'man', outfit: 'robe', color: '#7a5a3a', color2: '#4a3a2a', hair: 'long', hairColor: '#3a2a1e', beard: true, beardColor: '#3a2a1e', hat: 'band' };
const DENT = ANC({ hair: 'long', skin: '#e0b48a', color: '#8a6a4a' });

// Hang đá vôi trong rừng nhiệt đới Borneo.
function borneo(k, o = {}) {
  flat(k, o.sky ?? '#bfe0c4', '#5f7f3e');
  k.prop('mountain', 400, G - 220, 520, { fill: '#9a9a8a' });
  k.prop('mountain', 1500, G - 260, 620, { fill: '#a8a898' });
  for (const [x, s] of [[120, 380], [760, 300], [1820, 360]]) k.prop('tree', x, G - s * 0.42, s, { fill: '#3f7a3a' });
}
function hospital(k, items, x, y, cue) {
  items.forEach(([c, t], i) => {
    k.icon('check', x - 30, y + i * 90, 50, { p: k.at(c, 0.4), stroke: P.red });
    k.text(t, x, y + i * 90, { size: 46, font: 'title', align: 'left', color: P.ink, fx: 'fade', p: k.at(c, 0.5) });
  });
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    title: 'How Did Ancient Humans Survive Without Doctors?',
    description: `You break your leg. No hospital, no X-ray, no painkillers. For almost all of human history, that was the situation — so how did anyone survive?
The oldest known surgery, 31,000 years ago in a cave in Borneo. A deaf, one-armed Neanderthal who lived into his forties. Stone Age dentists, skull surgery that patients survived, and an orangutan who treated his own wound. Episode 6 of "How your ancestors actually lived".`,
    footer: `📚 Sources: Maloney et al. (2022, Nature), "Surgical amputation of a limb 31,000 years ago in Borneo"; Trinkaus & Villotte (2017, PLOS ONE), Shanidar 1; Weyrich et al. (2017, Nature), El Sidrón dental calculus; Laumer et al. (2024, Scientific Reports), orangutan wound self-treatment; Oxilia et al. (2015, Scientific Reports), Villabruna; Oxilia et al. (2017, American Journal of Physical Anthropology), Riparo Fredian; Ensisheim trepanation (Alsace, Neolithic); Ötzi the Iceman tattoos and birch polypore; Gurven & Kaplan (2007, Population and Development Review); Tilley (2015), Theory and Practice in the Bioarchaeology of Care.
🦴 Previous episode: How Did Ancient Humans Raise Kids? Next: How Did Ancient Humans Stay Clean?`,
    tags: ['how did ancient humans survive without doctors', 'ancient medicine', 'prehistoric surgery', 'oldest amputation', 'borneo amputation 31000 years', 'shanidar 1', 'neanderthal medicine', 'stone age dentist', 'oldest dental filling', 'trepanation', 'otzi tattoos', 'orangutan heals wound', 'history of medicine', 'ancient humans', 'human evolution', 'prehistory', 'anthropology', 'hunter gatherers', 'neanderthals', 'early humans', 'animated history', 'history explained', 'how people lived', 'long story drawn'],
    hashtags: ['ancienthumans', 'medicine', 'history'],
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
    // ---------------- Intro ----------------
    {
      chapter: 'Intro',
      lead: 0.4,
      say: "{walk}You're out gathering food, {slip}and you slip. {snap}Snap. Your leg is broken. {no}No hospital. {xray}No X-ray. {pills}No painkillers. {q}For almost all of human history, this was the situation. {so}So how did anyone survive?",
      sfx: [['whoosh', 'slip', 0.4], ['bonk', 'snap', 0.5], ['pop', 'no'], ['pop', 'xray'], ['pop', 'pills'], ['drumroll', 'so', 0.3]],
      draw(k) {
        savanna(k, { trees: [[1780, 380]] });
        const fall = k.at('slip', 0.6);
        k.group({ x: 560, y: G + 30, r: -fall * 1.2 }, () => k.char(0, 0, 420, { ...YOU, face: k.t > k.cue('snap') ? 'shock' : 'happy', walk: fall < 0.1, shadow: false }));
        k.prop('berries', 760, G - 20, 90);
        k.burst(560, G - 120, 110, 'SNAP!', { p: k.at('snap', 0.4), size: 60 });
        const no = [['no', 'NO HOSPITAL'], ['xray', 'NO X-RAY'], ['pills', 'NO PAINKILLERS']];
        no.forEach(([c, t], i) => { note(k, t, 1240, 220 + i * 110, c, { size: 64, color: P.red, fx: 'pop' }); });
        k.prop('pill', 1240, 600, 140, { p: k.at('pills', 0.5) });
        redX(k, 1240, 600, 80, 'pills');
        k.text('SO HOW DID ANYONE SURVIVE?', 960, 1000, { size: 64, font: 'title', color: P.ink, fx: 'pop', p: k.at('so', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{last}Last episode, we left a child in a cave in Borneo, who lost a leg, and lived. {series}This is episode six of a series on how your ancestors actually lived. {sub}If you're new, subscribe. No side effects. {plan}Today: {a}the oldest known surgery, {b}a Neanderthal who survived everything, {c}Stone Age dentists, {d}and an orangutan who treated his own wound.",
      sfx: [['pop', 'last'], ['pop', 'sub', 0.5], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd']],
      draw(k) {
        paper(k);
        note(k, 'HOW YOUR ANCESTORS ACTUALLY LIVED', 960, 120, 'series', { size: 58, color: P.brown });
        note(k, 'Episode 6', 960, 200, 'series', { size: 44, color: P.red });
        k.group({ a: 1 - k.at('a', 0.3) }, () => {
          k.prop('cave', 960, 620, 560, { p: k.at('last', 0.5) });
          k.char(1000, 820, 200, { ...BORNEO, face: 'happy', prop: 'staff', p: k.at('last', 0.5) });
        });
        const items = [['a', 'OLDEST SURGERY', 'bone'], ['b', 'TOUGH NEANDERTHAL', 'nean'], ['c', 'STONE AGE DENTIST', 'tooth'], ['d', 'ORANGUTAN DOCTOR', 'orangutan']];
        items.forEach(([c, t, prop], i) => {
          const x = 300 + i * 440, p = k.at(c, 0.5);
          k.group({ x, y: 560, r: i % 2 ? 0.03 : -0.03, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-180, -200, 360, 400, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 2310 + i });
            if (prop === 'nean') k.char(0, 70, 230, { ...NEAN, face: 'smug', prop: 'staff', shadow: false });
            else k.prop(prop, 0, -40, 180, { cut: true, cavity: true, wound: true });
            k.text(t, 0, 140, { size: 38, font: 'title', color: P.red, maxWidth: 330 });
          });
        });
        k.char(1760, 1060, 300, { ...YOU, face: 'happy', pose: 'wave', p: k.at('sub', 0.5) });
      },
    },

    // ---------------- Chapter 1: The oldest surgery ----------------
    {
      chapter: 'The oldest surgery',
      say: "{dig}In 2020, archaeologists digging in Liang Tebo, a limestone cave on the island of Borneo, found a burial. {old}At least thirty-one thousand years old. {young}A young adult, about nineteen or twenty. {missing}But the bottom third of the left leg was missing.",
      sfx: [['scratch', 'dig', 0.3], ['pop', 'old'], ['pop', 'young'], ['bonk', 'missing', 0.3]],
      draw(k) {
        borneo(k);
        chap(k, 'The oldest surgery');
        k.prop('cave', 1330, 660, 620);
        k.char(560, G + 30, 420, { ...MALONEY, face: k.t > k.cue('missing') ? 'shock' : 'calm', pose: 'hold', p: k.at('dig', 0.5) });
        card(k, 560, 200, ['LIANG TEBO · BORNEO', 'Maloney et al. · Nature, 2022'], 'dig', { w: 680 });
        big(k, '31,000+ YEARS', 1330, 170, 'old', { size: 90 });
        note(k, 'young adult, ~19–20', 1330, 265, 'young', { size: 50, color: P.ink, fx: 'pop' });
        k.prop('bone', 1300, 760, 300, { cut: true, p: k.at('missing', 0.5) });
        note(k, 'lower left leg: missing', 1300, 900, 'missing', { size: 52, color: P.red, fx: 'pop' });
      },
    },
    {
      say: "{not}It wasn't bitten off, or crushed in an accident. {clean}The bone had been cut cleanly: a deliberate amputation. {healed}And the cut end had healed over. {child}This person lost the leg as a child, {years}and lived another six to nine years. {before}Before this find, the oldest known amputation was about seven thousand years old, from a farmer in France.",
      sfx: [['pop', 'not'], ['ding', 'clean', 0.4], ['sparkle', 'healed', 0.4], ['tada', 'years', 0.4], ['whoosh', 'before', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'The oldest surgery');
        note(k, 'bitten? crushed?', 480, 200, 'not', { size: 54, color: '#6b5f55', fx: 'pop' });
        redX(k, 480, 200, 70, 'clean');
        k.prop('bone', 480, 460, 520, { cut: true });
        k.circle(640, 460, 90, { stroke: P.red, width: 6, p: k.at('clean', 0.6), seed: 2320 });
        note(k, 'clean cut', 640, 600, 'clean', { size: 50, color: P.red, fx: 'pop' });
        note(k, 'healed over ✓', 480, 700, 'healed', { size: 56, color: P.grass, fx: 'pop' });
        k.char(1240, 900, 260, { ...BORNEO, face: 'happy', prop: 'staff', p: k.at('child', 0.5) });
        k.char(1520, 900, 400, { ...BORNEOAD, face: 'happy', prop: 'staff', p: k.at('years', 0.5) });
        k.arrow(1300, 560, 1460, 520, { stroke: P.orange, width: 6, p: k.at('years', 0.6), seed: 2321 });
        note(k, '+ 6–9 years', 1380, 460, 'years', { size: 56, color: P.orange, fx: 'pop' });
        k.text('previous record: ~7,000 years (France)', 960, 1010, { size: 50, font: 'title', color: P.ink, fx: 'pop', p: k.at('before', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{think}Think about what that took. {where}Whoever did it had to know where to cut, {blood}how to stop the bleeding, {inf}and how to keep the wound from getting infected, in a tropical rainforest. {plants}The researchers suggest Borneo's medicinal plants may have helped. {after}And afterward, someone had to look after that child for years, in steep mountain country. {joke}The Stone Age had no wheelchair ramps.",
      sfx: [['pop', 'think'], ['pop', 'where'], ['pop', 'blood'], ['pop', 'inf'], ['sparkle', 'plants', 0.4], ['ding', 'after', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        borneo(k);
        chap(k, 'The oldest surgery');
        k.rect(80, 120, 760, 420, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 2330, p: k.at('think', 0.5) });
        k.text('THEY HAD TO KNOW…', 460, 180, { size: 50, font: 'title', color: P.red, p: k.at('think', 0.5) });
        hospital(k, [['where', 'where to cut'], ['blood', 'how to stop bleeding'], ['inf', 'how to stop infection']], 200, 280);
        k.prop('tree', 1100, 420, 220, { fill: '#2f8a3a', p: k.at('plants', 0.5) });
        note(k, 'medicinal plants?', 1100, 220, 'plants', { size: 48, color: P.grass, fx: 'pop' });
        k.char(1380, G + 30, 260, { ...BORNEO, face: 'happy', prop: 'staff', p: k.at('after', 0.5) });
        k.char(1600, G + 30, 380, { ...ANCW({ skin: '#9a6b42' }), face: 'happy', pose: 'present', flip: true, p: k.at('after', 0.5) });
        k.text('no wheelchair ramps', 1400, 1000, { size: 60, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 2: The Neanderthal who survived everything ----------------
    {
      chapter: 'The Neanderthal who survived',
      say: "{shan}Now go back even further, to Shanidar Cave, in the mountains of Iraq. {sol}In 1957, archaeologist Ralph Solecki found a Neanderthal man now known as Shanidar 1. {chart}His injuries read like a hospital chart: {face}a crushing blow to the side of the face, {arm}a right arm lost at the elbow, {leg}an injured leg, {limp}and a limp.",
      sfx: [['whoosh', 'shan', 0.4], ['pop', 'sol'], ['scratch', 'chart', 0.3], ['bonk', 'face', 0.3], ['bonk', 'arm', 0.3], ['bonk', 'leg', 0.3], ['pop', 'limp']],
      draw(k) {
        flat(k, P.orange, '#b89a70');
        k.prop('mountain', 1500, G - 300, 700, { fill: '#a07a5a' });
        k.prop('cave', 1500, 560, 560);
        chap(k, 'The Neanderthal who survived');
        card(k, 520, 200, ['SHANIDAR 1 · IRAQ', 'found by Ralph Solecki, 1957'], 'sol', { w: 680 });
        k.char(1460, G + 30, 400, { ...NEAN, face: 'calm', prop: 'staff', p: k.at('shan', 0.5) });
        k.rect(160, 340, 760, 470, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 2340, p: k.at('chart', 0.5) });
        k.text('PATIENT CHART', 540, 400, { size: 48, font: 'title', color: P.red, p: k.at('chart', 0.5) });
        hospital(k, [['face', 'crushing blow to the face'], ['arm', 'right arm lost at the elbow'], ['leg', 'injured leg'], ['limp', 'a limp']], 280, 490);
      },
    },
    {
      say: "{trink}In 2017, Erik Trinkaus and Sébastien Villotte added one more line. {ears}Bony growths in his ear canals, which probably left him deaf. {forty}And yet, he lived into his forties, maybe longer. {alone}A man who couldn't hear danger coming, with one arm and a bad leg. {help}He most likely survived because others looked after him.",
      sfx: [['pop', 'trink'], ['bonk', 'ears', 0.3], ['tada', 'forty', 0.4], ['ding', 'help', 0.4]],
      draw(k) {
        flat(k, P.orange, '#b89a70');
        chap(k, 'The Neanderthal who survived');
        card(k, 520, 200, ['TRINKAUS & VILLOTTE', 'PLOS ONE · 2017'], 'trink', { w: 600 });
        note(k, '+ probably deaf', 520, 360, 'ears', { size: 60, color: P.red, fx: 'pop' });
        big(k, '40+ YEARS OLD', 520, 500, 'forty', { size: 90, color: P.grass });
        k.char(1120, G + 30, 400, { ...NEAN, face: k.t > k.cue('help') ? 'happy' : 'calm', prop: 'staff' });
        k.char(1420, G + 30, 380, { ...NEAN, body: 'man', beard: false, hair: 'short', face: 'happy', pose: 'present', flip: true, p: k.at('help', 0.5) });
        k.char(1660, G + 30, 340, { ...NEAN, body: 'woman', outfit: 'dress', beard: false, face: 'happy', pose: 'hold', flip: true, p: k.at('help', 0.5) });
        k.prop('meat', 1600, G - 180, 90, { p: k.at('help', 0.5) });
        k.text('NOT ALONE', 1400, 260, { size: 90, font: 'title', color: P.ink, fx: 'pop', p: k.at('help', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    {
      say: "{many}And Shanidar 1 wasn't unusual. {healed}Neanderthal skeletons are full of healed injuries, {head}especially to the head and neck. {rodeo}In 1995, Thomas Berger and Erik Trinkaus compared their injury pattern to modern groups, {match}and the closest match was rodeo riders. {later}A later study suggested an even better match: {tube}people who fall off inflatable river tubes, {table}or walk into tables. {joke}Either way, being a Neanderthal was a contact sport.",
      sfx: [['pop', 'many'], ['pop', 'head'], ['drumroll', 'rodeo', 0.3], ['tada', 'match', 0.4], ['boing', 'tube', 0.3], ['bonk', 'table', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'The Neanderthal who survived');
        k.char(320, 980, 420, { ...NEAN, face: 'smug', prop: 'staff', p: k.at('many', 0.5) });
        for (let i = 0; i < 5; i++) k.prop('bone', 220 + (i % 3) * 110, 420 + Math.floor(i / 3) * 70, 110, { p: k.at(k.cue('healed', i * 0.2), 0.4), rotate: (i - 2) * 0.2 });
        note(k, 'healed injuries', 330, 300, 'healed', { size: 48, color: P.grass, fx: 'pop' });
        card(k, 1240, 180, ['BERGER & TRINKAUS, 1995', 'Journal of Archaeological Science'], 'rodeo', { w: 720 });
        k.text('closest match:', 1000, 380, { size: 48, font: 'title', color: P.ink, fx: 'fade', p: k.at('match', 0.4) });
        k.text('RODEO RIDERS 🤠', 1240, 470, { size: 80, font: 'title', color: P.red, fx: 'pop', p: k.at('match', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.prop('horse', 1660, 470, 160, { p: k.at('match', 0.5), rotate: -0.25 });
        note(k, 'later study:', 1240, 620, 'later', { size: 46, color: '#6b5f55' });
        note(k, 'river tubing falls', 1240, 700, 'tube', { size: 56, color: P.indigo, fx: 'pop' });
        note(k, 'walking into tables', 1240, 790, 'table', { size: 56, color: P.indigo, fx: 'pop' });
        k.text('A CONTACT SPORT', 1240, 960, { size: 76, font: 'title', color: P.orange, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 3: A Stone Age pharmacy ----------------
    {
      chapter: 'A Stone Age pharmacy',
      say: "{med}Your ancestors also had medicine, of a kind. {sidron}In 2017, Laura Weyrich's team read ancient DNA from the hardened plaque on Neanderthal teeth from El Sidrón cave, in Spain. {young}One young man had a painful dental abscess, {gut}and a gut parasite that causes diarrhea. {poplar}His plaque held DNA from poplar, {asp}whose bark contains salicylic acid, a natural painkiller related to aspirin. {mold}And from Penicillium mold. {self}Was he medicating himself? {maybe}The researchers think it's possible. It's hard to prove.",
      sfx: [['pop', 'med'], ['pop', 'sidron'], ['bonk', 'young', 0.3], ['wahwah', 'gut', 0.3], ['ding', 'poplar', 0.4], ['sparkle', 'mold', 0.4], ['boing', 'maybe', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'A Stone Age pharmacy');
        card(k, 520, 180, ['WEYRICH ET AL., 2017', 'Nature · El Sidrón, Spain'], 'sidron', { w: 640 });
        k.char(420, 980, 420, { ...NEAN, face: k.t > k.cue('self') ? 'blank' : 'sad', pose: k.t > k.cue('self') ? 'think' : 'stand', p: k.at('med', 0.5) });
        k.prop('tooth', 640, 470, 150, { cavity: true, p: k.at('young', 0.5) });
        note(k, 'abscess', 640, 580, 'young', { size: 44, color: P.red, fx: 'pop' });
        note(k, '+ gut parasite', 640, 650, 'gut', { size: 44, color: P.brown, fx: 'pop' });
        k.prop('tree', 1100, 520, 260, { fill: '#7ab55a', p: k.at('poplar', 0.5) });
        note(k, 'POPLAR', 1100, 680, 'poplar', { size: 56, color: P.grass, fx: 'pop' });
        note(k, 'salicylic acid ≈ aspirin', 1100, 760, 'asp', { size: 44, color: P.ink });
        k.circle(1560, 520, 100, { fill: '#9ab87a', fillStyle: 'solid', width: 5, p: k.at('mold', 0.5), seed: 2350 });
        for (let i = 0; i < 6; i++) k.dot(1560 + Math.cos(i) * 50, 520 + Math.sin(i * 1.7) * 50, 12, '#5a8a4a', k.at('mold', 0.5));
        note(k, 'PENICILLIUM', 1560, 680, 'mold', { size: 56, color: P.indigo, fx: 'pop' });
        k.text('self-medicating? possibly.', 1300, 960, { size: 58, font: 'title', color: P.red, fx: 'pop', p: k.at('maybe', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{not}And it's not only humans. {rakus}In 2022, in a rainforest in Sumatra, Indonesia, researchers watched a wild orangutan named Rakus, who had a fresh wound on his face. {chew}He chewed the leaves of a climbing plant used in local medicine, {juice}dabbed the juice onto the wound, {cover}then covered it with the chewed leaves. {heal}Within about a month, it had healed. {joke}No medical degree. Just good instincts.",
      sfx: [['pop', 'not'], ['pop', 'rakus'], ['pop', 'chew'], ['pop', 'juice'], ['pop', 'cover'], ['tada', 'heal', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        borneo(k, { sky: '#a8d8b0' });
        chap(k, 'A Stone Age pharmacy');
        card(k, 520, 200, ['LAUMER ET AL., 2024', 'Scientific Reports · Sumatra'], 'rakus', { w: 640 });
        k.prop('orangutan', 860, G - 140, 360, { wound: k.t < k.cue('heal'), leaves: k.t > k.cue('cover') && k.t < k.cue('heal'), p: k.at('rakus', 0.5) });
        note(k, 'RAKUS', 860, 470, 'rakus', { size: 60, color: P.orange, fx: 'pop' });
        const steps = [['chew', '1. chew leaves'], ['juice', '2. apply the juice'], ['cover', '3. cover the wound']];
        steps.forEach(([c, t], i) => note(k, t, 1140, 360 + i * 100, c, { size: 52, align: 'left', color: P.ink, fx: 'pop' }));
        k.text('HEALED ✓', 1560, 720, { size: 90, font: 'title', color: P.grass, fx: 'pop', p: k.at('heal', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.text('no medical degree', 960, 1000, { size: 56, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 4: Stone Age dentists ----------------
    {
      chapter: 'Stone Age dentists',
      say: "{dent}Now, the dentist. {villa}About fourteen thousand years ago, at Villabruna, in what's now northern Italy, a man had a cavity in a back tooth. {scrape}Someone scraped out the decay, with a tiny pointed stone tool. {fred}And at Riparo Fredian, near Lucca, about thirteen thousand years ago, two front teeth were hollowed out {fill}and filled, with bitumen, plant fibers, and what may be hair. {oldest}It's among the oldest known fillings. {joke}Please don't ask about anesthesia.",
      sfx: [['pop', 'dent'], ['pop', 'villa'], ['scratch', 'scrape', 0.4], ['pop', 'fred'], ['tada', 'fill', 0.3], ['wahwah', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Stone Age dentists');
        card(k, 480, 180, ['VILLABRUNA · ~14,000 YEARS', 'Oxilia et al., 2015'], 'villa', { w: 640 });
        k.prop('tooth', 360, 520, 300, { cavity: true, p: k.at('villa', 0.5) });
        const sc = Math.sin((k.gt ?? 0) * 12) * 12 * k.at('scrape', 0.4) * (1 - k.at('fred', 0.4));
        k.prop('handaxe', 520 + sc, 400, 110, { rotate: -0.8, p: k.at('scrape', 0.5) });
        note(k, 'decay scraped out', 420, 760, 'scrape', { size: 48, color: P.brown, fx: 'pop' });
        card(k, 1440, 180, ['RIPARO FREDIAN · ~13,000 YEARS', 'Oxilia et al., 2017'], 'fred', { w: 700, r: 0.02, seed: 2360 });
        k.prop('tooth', 1320, 520, 260, { filled: true, p: k.at('fred', 0.5) });
        k.prop('tooth', 1560, 520, 260, { filled: true, p: k.at('fred', 0.5) });
        note(k, 'bitumen + plant fibers + hair?', 1440, 760, 'fill', { size: 46, color: P.ink, fx: 'pop' });
        big(k, 'OLDEST FILLINGS', 1440, 880, 'oldest', { size: 76 });
        k.text('(anesthesia: no)', 960, 1010, { size: 54, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{cared}So your ancestors cared about their teeth more than you might think. {body}And the rest of the body? {soap}Some ancient people got clean without any soap at all, {oil}with oil, {scraper}and a curved metal scraper. {next}That's the next episode.",
      sfx: [['pop', 'cared'], ['pop', 'body'], ['whoosh', 'soap', 0.4], ['pop', 'oil'], ['scratch', 'scraper', 0.4], ['sparkle', 'next', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'Stone Age dentists');
        k.prop('tooth', 360, 460, 200, { p: k.at('cared', 0.5) });
        k.text('✓ teeth', 360, 640, { size: 56, font: 'title', color: P.grass, fx: 'pop', p: k.at('cared', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.char(960, 960, 440, { ...YOU, face: k.t > k.cue('scraper') ? 'shock' : 'blank', pose: 'think', p: k.at('body', 0.5) });
        k.text('NO SOAP?', 960, 230, { size: 100, font: 'title', color: P.red, fx: 'pop', p: k.at('soap', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.prop('pot', 1400, 560, 180, { p: k.at('oil', 0.5), fill: '#c9a24a' });
        note(k, 'oil', 1400, 720, 'oil', { size: 52, fx: 'pop' });
        k.prop('strigil', 1660, 520, 240, { p: k.at('scraper', 0.5) });
        note(k, 'metal scraper', 1660, 720, 'scraper', { size: 52, fx: 'pop' });
        k.text('NEXT EPISODE', 1520, 960, { size: 70, font: 'title', color: P.orange, fx: 'pop', p: k.at('next', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 5: Holes in the head ----------------
    {
      chapter: 'Holes in the head',
      say: "{strange}Then there's the strangest operation of all. {trep}Trepanation: cutting a hole into a living person's skull. {ens}At Ensisheim, in eastern France, a man buried about seven thousand years ago had two large holes in his skull. {healed}Both had healed completely. {two}He survived not one, but two skull operations.",
      sfx: [['drumroll', 'strange', 0.3], ['scratch', 'trep', 0.4], ['pop', 'ens'], ['sparkle', 'healed', 0.4], ['tada', 'two', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'Holes in the head');
        big(k, 'TREPANATION', 960, 160, 'trep', { size: 100 });
        note(k, 'a hole in a living skull', 960, 260, 'trep', { size: 50, color: P.brown });
        card(k, 520, 420, ['ENSISHEIM · FRANCE', '~7,000 years ago'], 'ens', { w: 560 });
        k.prop('skull', 1240, 640, 460, { holes: k.t > k.cue('ens') ? 2 : 0, p: k.at('strange', 0.5) });
        k.circle(1194, 484, 70, { stroke: P.grass, width: 6, p: k.at('healed', 0.6), seed: 2370 });
        k.circle(1120, 540, 70, { stroke: P.grass, width: 6, p: k.at('healed', 0.6), seed: 2371 });
        note(k, 'healed ✓ healed ✓', 1240, 880, 'healed', { size: 52, color: P.grass, fx: 'pop' });
        k.text('2 OPERATIONS. SURVIVED.', 520, 700, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at('two', 0.4), outline: '#fffaf0', outlineWidth: 12, maxWidth: 760 });
      },
    },
    {
      say: "{why}Why do it? {nobody}Nobody knows for sure. {inj}Maybe to treat head injuries, {ache}or terrible headaches, {lost}or for reasons we'll never recover. {many}But across Neolithic Europe, many trepanned skulls show healing. {surv}A surprising number of patients survived. {joke}Which is more than you'd guess, for surgery done with stone tools.",
      sfx: [['pop', 'why'], ['pop', 'inj'], ['pop', 'ache'], ['boing', 'lost', 0.3], ['ding', 'many', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Holes in the head');
        k.icon('question', 320, 300, 200, { p: k.at('why', 0.5) });
        const rs = [['inj', 'head injury?'], ['ache', 'headaches?'], ['lost', 'something else?']];
        rs.forEach(([c, t], i) => note(k, t, 700, 230 + i * 90, c, { size: 52, align: 'left', color: P.ink, fx: 'pop' }));
        for (let i = 0; i < 6; i++) k.prop('skull', 420 + i * 220, 760, 180, { holes: 1, p: k.at(k.cue('many', i * 0.2), 0.4) });
        for (let i = 0; i < 6; i++) k.icon('check', 420 + i * 220, 900, 60, { p: k.at(k.cue('surv', i * 0.15), 0.4), stroke: P.grass });
        note(k, 'many show healing', 960, 600, 'many', { size: 56, color: P.grass, fx: 'pop' });
        k.text('…with stone tools', 1460, 330, { size: 60, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 6: The Iceman's first aid kit ----------------
    {
      chapter: "The Iceman's first aid kit",
      say: "{otzi}And then there's Ötzi, the Iceman, who died high in the Alps about fifty-three hundred years ago. {tat}His body carries sixty-one tattoos: simple lines and crosses. {joints}Many sit over joints that show wear: {knees}knees, {ankles}ankles, {back}the lower back. {treat}Some researchers think they were a kind of treatment, {debate}though that's debated. {fungus}He also carried birch polypore, a fungus with medicinal properties, threaded on a leather strap. {kit}A Copper Age first aid kit, maybe.",
      sfx: [['whoosh', 'otzi', 0.4], ['pop', 'tat'], ['pop', 'knees'], ['pop', 'ankles'], ['pop', 'back'], ['boing', 'debate', 0.3], ['sparkle', 'fungus', 0.4], ['ding', 'kit', 0.4]],
      draw(k) {
        flat(k, '#cfe4f0', '#f5f7fa');
        k.prop('mountain', 300, G - 260, 600, { snow: true });
        k.prop('mountain', 1700, G - 300, 700, { snow: true });
        chap(k, "The Iceman's first aid kit");
        card(k, 960, 160, ['ÖTZI THE ICEMAN', 'the Alps · ~5,300 years ago'], 'otzi', { w: 640 });
        k.char(760, G + 30, 520, { ...OTZI, face: 'calm', prop: 'staff', p: k.at('otzi', 0.5) });
        big(k, '61 TATTOOS', 1380, 330, 'tat', { size: 90, color: P.indigo });
        const marks = [['knees', 760 - 30, G - 110], ['ankles', 760 + 30, G - 10], ['back', 760, G - 250]];
        marks.forEach(([c, x, y], i) => { for (let j = 0; j < 3; j++) k.line(x - 14 + j * 14, y - 16, x - 14 + j * 14, y + 16, { stroke: '#1b2a4a', width: 5, p: k.at(c, 0.4), seed: 2380 + i * 3 + j }); });
        note(k, 'knees · ankles · lower back', 1380, 430, 'back', { size: 46 });
        note(k, 'treatment? (debated)', 1380, 520, 'treat', { size: 50, color: P.red, fx: 'pop' });
        k.prop('polypore', 1380, 700, 260, { p: k.at('fungus', 0.5) });
        note(k, 'birch polypore', 1380, 820, 'fungus', { size: 50, color: P.brown, fx: 'pop' });
        k.text('FIRST AID KIT?', 1380, 960, { size: 70, font: 'title', color: P.grass, fx: 'pop', p: k.at('kit', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    {
      say: "{write}And once writing arrived, medicine got written down. {papyrus}The Edwin Smith Papyrus, copied in Egypt around sixteen hundred BC from an even older text, {cases}describes forty-eight cases of injuries: {head}head wounds, {broken}broken bones, {dislocated}dislocations. {honey}Many wounds were dressed with linen, grease, and honey. {works}And honey really does fight bacteria. {joke}Hospitals still use medical-grade honey today.",
      sfx: [['pop', 'write'], ['scratch', 'papyrus', 0.3], ['pop', 'head'], ['pop', 'broken'], ['pop', 'dislocated'], ['sparkle', 'honey', 0.4], ['ding', 'works', 0.4]],
      draw(k) {
        flat(k, '#f0d9a0', P.sand);
        chap(k, "The Iceman's first aid kit");
        card(k, 520, 180, ['EDWIN SMITH PAPYRUS', 'Egypt · copied ~1600 BC'], 'papyrus', { w: 640 });
        k.prop('scroll', 520, 520, 360, { p: k.at('papyrus', 0.6) });
        big(k, '48 CASES', 1340, 220, 'cases', { size: 100 });
        const cs = [['head', 'head wounds'], ['broken', 'broken bones'], ['dislocated', 'dislocations']];
        cs.forEach(([c, t], i) => note(k, t, 1340, 340 + i * 80, c, { size: 50, fx: 'pop' }));
        k.prop('beehive', 1200, 760, 180, { p: k.at('honey', 0.5) });
        note(k, 'linen + grease + HONEY', 1400, 900, 'honey', { size: 54, color: P.orange, fx: 'pop' });
        k.text('honey fights bacteria ✓', 520, 900, { size: 54, font: 'title', color: P.grass, fx: 'pop', p: k.at('works', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.text('(still used in hospitals)', 520, 990, { size: 44, font: 'title', color: P.ink, fx: 'fade', p: k.at('joke', 0.5), outline: '#fffaf0', outlineWidth: 8 });
      },
    },

    // ---------------- Chapter 7: Not paradise ----------------
    {
      chapter: 'Not paradise',
      say: "{but}Now, none of this means ancient medicine worked like yours. {inf}An infection that a pill fixes today could kill. {kids}As we saw, roughly four in ten hunter-gatherer children didn't reach fifteen. {ill}And in studies of hunter-gatherer groups, illness, mostly infections, caused most deaths. {birth}Childbirth was dangerous too. {grateful}Next time you sit in a waiting room for an hour, {worth}it might be worth it.",
      sfx: [['scratch', 'but', 0.4], ['bonk', 'inf', 0.3], ['pop', 'kids'], ['pop', 'ill'], ['pop', 'birth'], ['ding', 'worth', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'Not paradise');
        k.text('NOT PARADISE', 960, 140, { size: 90, font: 'title', color: P.ink, fx: 'pop', p: k.at('but', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.prop('pill', 420, 380, 200, { p: k.at('inf', 0.5) });
        note(k, 'today: one pill', 420, 500, 'inf', { size: 46, color: P.grass });
        note(k, 'then: could kill', 420, 570, 'inf', { size: 46, color: P.red });
        for (let i = 0; i < 10; i++) k.char(800 + i * 100, 600, 150, { ...KID, color: i < 6 ? '#a87b4f' : '#cfc6b8', skin: i < 6 ? '#d9a77c' : '#d9d4cb', face: i < 6 ? 'calm' : 'blank', alpha: i < 6 ? 1 : 0.5, shadow: false, p: k.at(k.cue('kids', i * 0.08), 0.4) });
        note(k, '≈ 4 in 10 did not reach 15', 1250, 660, 'kids', { size: 44, color: P.brown });
        note(k, 'most deaths: illness, mostly infections', 1250, 760, 'ill', { size: 44 });
        note(k, 'childbirth: dangerous', 1250, 840, 'birth', { size: 44 });
        k.text('the waiting room: worth it', 960, 1000, { size: 60, font: 'title', color: P.grass, fx: 'pop', p: k.at('worth', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 8: The oldest medicine ----------------
    {
      chapter: 'The oldest medicine',
      say: "{look}But look at what keeps showing up. {b}A child with one leg, in a rainforest. {s}A deaf Neanderthal with one arm. {e}A man with two holes in his skull. {alone}None of them could have survived alone. {tilley}Archaeologist Lorna Tilley even has a name for studying this: {bio}the bioarchaeology of care. {real}The oldest medicine wasn't a plant, or a stone knife. {people}It was other people, who decided you were worth keeping alive.",
      sfx: [['pop', 'b'], ['pop', 's'], ['pop', 'e'], ['bonk', 'alone', 0.2], ['pop', 'tilley'], ['ding', 'bio', 0.4], ['sparkle', 'people', 0.4]],
      draw(k) {
        campNight(k, { fx: 960, fs: 220 });
        chap(k, 'The oldest medicine', true);
        glow(k, 960, G - 100, 760, 0.4);
        k.char(560, G + 40, 280, { ...BORNEO, face: 'happy', prop: 'staff', p: k.at('b', 0.5) });
        k.char(1340, G + 40, 380, { ...NEAN, face: 'happy', prop: 'staff', flip: true, p: k.at('s', 0.5) });
        k.prop('skull', 1640, G - 80, 140, { holes: 2, p: k.at('e', 0.5) });
        k.char(760, G + 40, 360, { ...ANCW(), face: 'happy', pose: 'present', p: k.at('people', 0.5) });
        k.char(1140, G + 40, 360, { ...ANC(), face: 'happy', pose: 'hold', flip: true, p: k.at('people', 0.5) });
        k.text('none could survive alone', 960, 200, { size: 60, font: 'title', color: '#d9d3e8', fx: 'fade', p: k.at('alone', 0.5), outline: P.ink, outlineWidth: 10 });
        k.text('"the bioarchaeology of care" — Lorna Tilley', 960, 290, { size: 44, font: 'title', color: '#d9d3e8', fx: 'fade', p: k.at('bio', 0.5), outline: P.ink, outlineWidth: 8 });
        k.text('THE OLDEST MEDICINE: OTHER PEOPLE', 960, 400, { size: 64, font: 'title', color: P.yellow, fx: 'pop', p: k.at('people', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },

    // ---------------- Ending ----------------
    {
      chapter: 'Back to the broken leg',
      say: "{back}So, back to that broken leg. {xray}Your ancestors couldn't X-ray it. {carry}But someone would probably carry you back to camp, {feed}bring you food, {wait}and wait while it healed. {no}No hospital. {not}But not alone.",
      sfx: [['whoosh', 'back', 0.4], ['pop', 'carry'], ['pop', 'feed'], ['pop', 'wait'], ['ding', 'not', 0.5]],
      draw(k) {
        campNight(k, { fx: 1300, fs: 220 });
        glow(k, 1300, G - 100, 700, 0.4);
        const u = k.at('carry', 4, 'inOut');
        k.group({ x: k.lerp(300, 900, u), y: 0 }, () => {
          k.char(0, G + 40, 400, { ...ANC(), face: 'happy', pose: 'hold', walk: u > 0 && u < 1 });
          k.group({ x: 0, y: G - 220, r: -1.4 }, () => k.char(0, 0, 300, { ...YOU, face: k.t > k.cue('not') ? 'happy' : 'sad', shadow: false }));
        });
        k.char(1560, G + 40, 340, { ...ANCW(), face: 'happy', pose: 'hold', flip: true, p: k.at('feed', 0.5) });
        k.prop('meat', 1480, G - 180, 90, { p: k.at('feed', 0.5) });
        k.text('no hospital.', 960, 200, { size: 64, font: 'title', color: '#d9d3e8', fx: 'fade', p: k.at('no', 0.5), outline: P.ink, outlineWidth: 10 });
        k.text('but not alone.', 960, 310, { size: 90, font: 'title', color: P.yellow, fx: 'pop', p: k.at('not', 0.4), outline: P.ink, outlineWidth: 14 });
      },
    },

    // ---------------- Recap ----------------
    {
      chapter: 'Recap',
      say: "{remind}Before the recap: remember that oil and that curved metal scraper. That's next time. {t}Quick recap. {a}In Borneo, thirty-one thousand years ago, a child survived an amputation. {b}A deaf, one-armed Neanderthal lived into his forties. {c}Ice Age dentists scraped out decay and filled teeth with bitumen. {d}Skull surgery patients often survived. {e}And the oldest medicine of all was care.",
      sfx: [['ding', 'remind', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['pop', 'e']],
      draw(k) {
        k.group({ a: 1 - k.at('t', 0.4) }, () => {
          paper(k);
          k.prop('pot', 760, 560, 220, { fill: '#c9a24a' });
          k.prop('strigil', 1160, 540, 300);
          k.text('remember the scraper', 960, 260, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at(k.cue('remind', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 10 });
        });
        k.group({ a: k.at('t', 0.4) }, () => {
          paper(k);
          k.text('RECAP', 960, 110, { size: 80, font: 'title', color: P.red, p: k.at('t', 0.8, 'linear') });
          const rows = [['a', 'bone', 'Borneo: amputation survived, 31,000 years ago'], ['b', 'cave', 'Shanidar 1: deaf, one arm, lived to 40+'], ['c', 'tooth', 'Ice Age dentists: scraping & fillings'], ['d', 'skull', 'Trepanation: many patients survived'], ['e', 'campfire', 'The oldest medicine: care']];
          rows.forEach(([c, prop, t], i) => {
            const y = 250 + i * 160;
            k.prop(prop, 300, y, 120, { p: k.at(c, 0.5), cut: true, filled: true, holes: 1 });
            k.text(t, 400, y, { size: 52, font: 'title', align: 'left', p: k.at(c, 1.4, 'linear'), color: P.ink });
          });
        });
      },
    },
    nextEpisodeScene({
      lang: 'en',
      say: "{next}Next episode: how did ancient humans stay clean? {hook}No soap, no shampoo, no deodorant. {scraper}Some people scraped themselves clean with oil and a curved piece of metal. {when}Coming soon.",
      title: 'How Did Ancient Humans Stay Clean?',
      hook: 'No soap. Just oil and a metal scraper.',
      when: 'COMING SOON',
      art: (k) => {
        k.char(-120, 150, 260, { ...ANC({ hair: 'short' }), face: 'happy', pose: 'hold' });
        k.prop('strigil', 40, 0, 150);
        k.prop('pot', 220, 90, 130, { fill: '#c9a24a' });
      },
      sfx: [['sparkle', 'hook', 0.3]],
    }),
    subscribeScene({
      lang: 'en',
      say: "{q}Would you let a Stone Age dentist work on your teeth? Put it in the comments. {sub}And subscribe, so you don't miss what happened next.",
      question: 'Would you trust a Stone Age dentist?',
      channel: 'Long Story Drawn',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
