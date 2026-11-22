// Long Story Drawn — Ep 9: How Long Did Ancient Humans Actually Live? (promised in Ep 8: "Did they really all die at 30?")
// Rules (kenh-ancient-humans): cold open pays off the poster promise; series + agenda ≤ 15 s; re-hook every ~60 s; recap ≤ 15 s.
// Fact check:
//  Gurven & Kaplan 2007 (Population and Development Review 33): hunter-gatherer life expectancy at birth ~30–37; ~57% reach 15;
//    modal age of adult death ~68–78 ("adaptive human life span"). Illness (mostly infections) causes most deaths.
//  Caspari & Lee 2004 (PNAS): ratio of older to younger adults (OY; "old" = twice the age of third-molar eruption, ~30, old enough to be
//    a grandparent): Early Homo 0.25, Neanderthals 0.39, Early Upper Paleolithic 2.08.
//  Lordkipanidze et al. 2005 (Nature): Dmanisi, Georgia, ~1.77 Mya: skull of an individual who lost nearly all teeth years before death;
//    authors suggest others may have helped (debated).
//  Many skeletal ageing methods (pubic symphysis, cranial sutures) lose precision after ~50 and tend to underestimate older adults.
//  Psalm 90:10: "threescore years and ten" (70). Socrates ~70 at execution (399 BC); Sophocles ~90; Plato ~80. Augustus died at 75.
//  Roman life expectancy at birth: historians estimate ~20–30 (Frier) — say "historians estimate".
//  Our World in Data: until at least 1800, more than a third of children died before age 5; global child mortality ~3.5% (2025).
//  UN: global life expectancy ~73 (2024).
//  Kaplan et al. 2017 (Lancet): Tsimane (Bolivia), 705 adults 40+: 85% had no coronary artery calcium; authors call it the lowest reported
//    coronary artery disease of any population studied (their interpretation).
//  Next episode (Ep 10): surviving the Ice Age — Last Glacial Maximum ~26,500–19,000 years ago; Mezhyrich (Ukraine) mammoth-bone structures
//    ~18,000 years old (2025 redating). Upper Paleolithic Europeans (Caspari & Lee) lived during the last Ice Age. Poster: COMING SOON.
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import { P, G, YOU, ANC, ANCW, ELDER, KID, SCI, flat, savanna, night, paper, chap, big, note, redX, card, campNight, glow } from '/channel/long-story-drawn.js';
import * as thumbs from '/videos/057-how-long-did-ancient-humans-live/thumbs.js';

const GRAN = { ...ELDER, skin: '#9a6b42' };
const GRANDPA = ANC({ hair: 'short', hairColor: '#d9d4cb', beard: true, beardColor: '#d9d4cb', skin: '#9a6b42' });
const ERECTUS = { body: 'big', outfit: 'bare', color: '#8a6a4a', color2: '#5a4030', hair: 'short', hairColor: '#5a3a24', beard: true, beardColor: '#5a3a24', skin: '#c99a70' };
const GREEK = { body: 'man', outfit: 'robe', color: '#f5f1e6', color2: '#3b6ea5', hair: 'short', hairColor: '#d9d4cb', beard: 'long', beardColor: '#d9d4cb', skin: '#e0b48a' };
const ROMAN = { body: 'big', outfit: 'robe', color: '#f5f1e6', color2: '#7a3a8a', hair: 'short', hairColor: '#d9d4cb', skin: '#e0b48a', hat: 'crown' };
const TSIM = ANC({ outfit: 'tunic', color: '#d9d4cb', color2: '#b03a2e', hair: 'short', hairColor: '#d9d4cb', skin: '#9a6b42' });
const OSTEO = SCI({ hat: undefined, color: '#ffffff', hair: 'short', hairColor: '#3a2a1e' });

// Thanh tuổi thọ: x0..x1 tương ứng 0..80 năm.
function ageBar(k, y, from, to, color, cue, seed, o = {}) {
  const X = (a) => 200 + a * 19;
  const p = k.at(cue, 0.8);
  k.rect(X(from), y, (X(to) - X(from)) * p + 1, 60, { fill: color, fillStyle: 'solid', width: 4, seed, p: p > 0.01 ? 1 : 0 });
  if (o.label) k.text(o.label, X(to) + 20, y + 30, { size: 44, font: 'title', align: 'left', color: P.ink, p: p > 0.9 ? 1 : 0 });
}
function ageAxis(k, y) {
  for (let a = 0; a <= 80; a += 10) k.text(String(a), 200 + a * 19, y, { size: 34, font: 'title', color: '#6b5f55', p: 1 });
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    title: 'How Long Did Ancient Humans Actually Live?',
    description: `You've heard it a hundred times: ancient people died at thirty. Here's a math puzzle. One baby dies at birth, their sister lives to seventy. Average lifespan: thirty-five. Neither of them died at thirty-five.
How long did ancient humans actually live? Hunter-gatherer life expectancy, the rise of grandparents, a toothless ancestor who survived, why skeletons lie about age, and the hunter-gatherers with the healthiest hearts ever measured. Episode 9 of "How your ancestors actually lived".`,
    footer: `📚 Sources: Gurven & Kaplan (2007, Population and Development Review), "Longevity Among Hunter-Gatherers"; Caspari & Lee (2004, PNAS); Lordkipanidze et al. (2005, Nature), Dmanisi toothless skull; Kaplan et al. (2017, The Lancet), coronary atherosclerosis in the Tsimane; Our World in Data, child mortality; UN World Population Prospects; Psalm 90:10.
👵 Previous episode: How Did Ancient Humans Go to the Toilet? Next: How Did Ancient Humans Survive the Ice Age?`,
    tags: ['how long did ancient humans live', 'did cavemen die at 30', 'ancient life expectancy', 'life expectancy myth', 'hunter gatherer life expectancy', 'how long did people live in the past', 'grandmother hypothesis', 'old age in prehistory', 'tsimane heart health', 'child mortality history', 'ancient humans', 'human evolution', 'prehistory', 'anthropology', 'hunter gatherers', 'early humans', 'animated history', 'history explained', 'how people lived', 'long story drawn'],
    hashtags: ['ancienthumans', 'history', 'science'],
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
    // ---------------- Cold open ----------------
    {
      chapter: 'Intro',
      lead: 0.3,
      say: "{heard}You've heard it a hundred times: ancient people died at thirty. {puzzle}So here's a math puzzle. {baby}One baby dies at birth. {sis}Her sister lives to seventy. {avg}Their average lifespan? Thirty-five. {neither}Neither of them died at thirty-five. {trick}That's the trick hiding inside every ancient life expectancy.",
      sfx: [['pop', 'heard'], ['drumroll', 'puzzle', 0.3], ['pop', 'baby'], ['pop', 'sis'], ['tada', 'avg', 0.4], ['bonk', 'neither', 0.3], ['ding', 'trick', 0.4]],
      draw(k) {
        paper(k);
        k.text('"THEY DIED AT 30"', 960, 170, { size: 90, font: 'title', color: P.ink, fx: 'pop', p: 1, outline: '#fffaf0', outlineWidth: 14 });
        redX(k, 960, 170, 110, 'puzzle');
        k.prop('baby', 420, 520, 220, { p: k.at('baby', 0.5) });
        note(k, 'age 0', 420, 660, 'baby', { size: 60, color: P.red, fx: 'pop' });
        k.char(1500, 760, 360, { ...GRAN, face: 'happy', prop: 'staff', p: k.at('sis', 0.5) });
        note(k, 'age 70', 1500, 830, 'sis', { size: 60, color: P.grass, fx: 'pop' });
        big(k, 'AVERAGE: 35', 960, 520, 'avg', { size: 110, color: P.orange });
        k.text('…nobody died at 35', 960, 1000, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('neither', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{series}This is episode nine of How Your Ancestors Actually Lived. {today}Today: {a}how long hunter-gatherers really live, {b}when grandparents appeared, {c}and why skeletons lie about age. {sub}Subscribe if you want the next one.",
      sfx: [['pop', 'series'], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'sub', 0.5]],
      draw(k) {
        paper(k);
        note(k, 'HOW YOUR ANCESTORS ACTUALLY LIVED · Ep. 9', 960, 130, 'series', { size: 52, color: P.brown });
        const items = [['a', 'REAL LIFESPANS', 'clock'], ['b', 'GRANDPARENTS', 'gran'], ['c', 'LYING SKELETONS', 'skull']];
        items.forEach(([c, t, prop], i) => {
          const x = 420 + i * 540, p = k.at(c, 0.5);
          k.group({ x, y: 560, r: i % 2 ? 0.03 : -0.03, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-210, -220, 420, 440, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 5800 + i });
            if (prop === 'clock') k.icon('clock', 0, -50, 200);
            else if (prop === 'gran') k.char(0, 80, 260, { ...GRAN, face: 'happy', shadow: false });
            else k.prop('skull', 0, -50, 200);
            k.text(t, 0, 150, { size: 46, font: 'title', color: P.red, maxWidth: 380 });
          });
        });
        k.char(1760, 1060, 300, { ...YOU, face: 'happy', pose: 'wave', p: k.at('sub', 0.5) });
      },
    },

    // ---------------- Chapter 1: The average trap ----------------
    {
      chapter: 'The average trap',
      say: "{study}In 2007, anthropologists Michael Gurven and Hillard Kaplan gathered data on hunter-gatherer groups around the world. {birth}Life expectancy at birth: about thirty to thirty-seven years. {sounds}Sounds like the myth is true. {but}But that number is dragged down by one thing above all: {kids}children who died young. {recall}As we saw a few episodes ago, only about fifty-seven percent of children reached fifteen.",
      sfx: [['pop', 'study'], ['drumroll', 'birth', 0.3], ['wahwah', 'sounds', 0.3], ['pop', 'but'], ['bonk', 'kids', 0.3], ['pop', 'recall']],
      draw(k) {
        paper(k);
        chap(k, 'The average trap');
        card(k, 520, 200, ['GURVEN & KAPLAN, 2007', 'Population and Development Review'], 'study', { w: 720 });
        big(k, '30–37 YEARS', 1360, 220, 'birth', { size: 100 });
        note(k, 'life expectancy at birth', 1360, 320, 'birth', { size: 46, color: P.brown });
        for (let i = 0; i < 10; i++) k.char(240 + i * 150, 800, 200, { ...KID, color: i < 6 ? '#a87b4f' : '#cfc6b8', skin: i < 6 ? '#d9a77c' : '#d9d4cb', face: i < 6 ? 'happy' : 'blank', alpha: i < 6 ? 1 : 0.5, shadow: false, p: k.at(k.cue('kids', i * 0.08), 0.4) });
        note(k, '~57% reached age 15', 960, 900, 'recall', { size: 56, color: P.red, fx: 'pop' });
      },
    },
    {
      say: "{made}So what about the ones who made it through childhood? {mode}Gurven and Kaplan looked at the most common age at which adults died. {seventy}It was somewhere between sixty-eight and seventy-eight. {not}Not thirty. {seventy2}Closer to seventy. {joke}The cavemen-die-at-thirty myth is basically a math error with a beard.",
      sfx: [['pop', 'made'], ['pop', 'mode'], ['tada', 'seventy', 0.4], ['bonk', 'not', 0.3], ['ding', 'seventy2', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'The average trap');
        ageAxis(k, 860);
        k.text('MOST COMMON AGE OF ADULT DEATH', 960, 200, { size: 60, font: 'title', color: P.ink, fx: 'pop', p: k.at('mode', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        ageBar(k, 400, 0, 37, '#cfc6b8', 'made', 5810, { label: 'avg at birth: 30–37' });
        ageBar(k, 560, 68, 78, P.grass, 'seventy', 5811);
        note(k, 'adults: 68–78', 1590, 500, 'seventy', { size: 56, color: P.grass, fx: 'pop' });
        redX(k, 200 + 30 * 19, 720, 60, 'not');
        k.char(1180, 820, 300, { ...GRANDPA, face: 'smug', prop: 'staff', p: k.at('seventy2', 0.5) });
        k.text('a math error with a beard', 960, 1010, { size: 62, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    {
      say: "{ten}Picture ten people from one camp. {four}Four die as children: at one, two, three, and ten. {six}Six grow up, and die at fifty-five, sixty-five, seventy, seventy, seventy-five and eighty. {avg}Their average age at death: about forty-three. {common}The most common age: seventy. {which}Which number tells you more about growing old? {joke}Averages are great at hiding grandmothers.",
      sfx: [['pop', 'ten'], ['bonk', 'four', 0.3], ['pop', 'six'], ['drumroll', 'avg', 0.3], ['tada', 'common', 0.4], ['pop', 'which'], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'The average trap');
        const ages = [1, 2, 3, 10, 55, 65, 70, 70, 75, 80];
        ages.forEach((a, i) => {
          const x = 200 + i * 170, kid = i < 4, c = kid ? 'four' : 'six';
          k.char(x, 640, kid ? 180 : 260, { ...(kid ? KID : (i % 2 ? GRAN : GRANDPA)), face: kid ? 'blank' : 'happy', alpha: kid ? 0.55 : 1, shadow: false, p: k.at(k.cue(c, (kid ? i : i - 4) * 0.15), 0.4) });
          k.text(String(a), x, 720, { size: 50, font: 'title', color: kid ? '#9a9a9a' : P.ink, p: k.at(k.cue(c, (kid ? i : i - 4) * 0.15), 0.4) });
        });
        big(k, 'AVERAGE ≈ 43', 960, 170, 'avg', { size: 84, color: P.orange });
        big(k, 'MOST COMMON: 70', 960, 300, 'common', { size: 84, color: P.grass });
        k.text('averages hide grandmothers', 960, 900, { size: 66, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    // ---------------- Chapter 2: When grandparents appeared ----------------
    {
      chapter: 'When grandparents appeared',
      say: "{when}But has it always been like this? {cl}In 2004, Rachel Caspari and Sang-Hee Lee counted older and younger adults in fossil samples. {old}Old, here, means roughly thirty or more: old enough to be a grandparent. {erectus}In early Homo, there were about four young adults for every old one. {nean}Neanderthals: still more young than old. {up}But in the Early Upper Paleolithic, around thirty thousand years ago, {flip}it flipped: about two older adults for every young one. {gp}Grandparents had arrived.",
      sfx: [['pop', 'when'], ['pop', 'cl'], ['pop', 'old'], ['pop', 'erectus'], ['pop', 'nean'], ['drumroll', 'up', 0.3], ['tada', 'flip', 0.4], ['sparkle', 'gp', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'When grandparents appeared');
        card(k, 520, 200, ['CASPARI & LEE, 2004', 'PNAS · old-to-young ratio'], 'cl', { w: 640 });
        note(k, '"old" ≈ 30+ (grandparent age)', 1360, 200, 'old', { size: 46, color: P.brown });
        const bars = [['erectus', 'Early Homo', 0.25], ['nean', 'Neanderthals', 0.39], ['flip', 'Early Upper Paleolithic', 2.08]];
        bars.forEach(([c, t, v], i) => {
          const y = 380 + i * 170, p = k.at(c, 0.8);
          k.text(t, 620, y + 40, { size: 44, font: 'title', align: 'right', color: P.ink, p: p > 0 ? 1 : 0 });
          k.rect(660, y, 480 * v * p + 1, 80, { fill: i === 2 ? P.grass : P.stone, fillStyle: 'solid', width: 4, seed: 5820 + i, p: p > 0.01 ? 1 : 0 });
          k.text(String(v), 690 + 480 * v * p, y + 40, { size: 48, font: 'title', align: 'left', color: P.ink, p: p > 0.9 ? 1 : 0 });
        });
        k.text('GRANDPARENTS ARRIVE', 960, 1000, { size: 76, font: 'title', color: P.grass, fx: 'pop', p: k.at('gp', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{why}Why does that matter? {know}Older people carry knowledge: {where}where the water is in a drought, {plants}which plants heal and which kill, {stories}the stories that hold a group together. {gran}And remember the Hadza grandmothers from episode five, digging tubers to feed the grandkids. {more}More grandparents may have meant better-fed kids, {smart}and more knowledge passed down. {joke}Grandma: the original search engine.",
      sfx: [['pop', 'why'], ['pop', 'where'], ['pop', 'plants'], ['pop', 'stories'], ['pop', 'gran'], ['ding', 'more', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        campNight(k, { fx: 960, fs: 220 });
        chap(k, 'When grandparents appeared', true);
        glow(k, 960, G - 100, 760, 0.4);
        k.char(700, G + 40, 380, { ...GRAN, face: 'happy', pose: 'present' });
        for (let i = 0; i < 3; i++) k.char(1160 + i * 160, G + 40, 200 + i * 20, { ...KID, skin: '#9a6b42', face: 'laugh' });
        const kn = [['where', 'water in a drought'], ['plants', 'which plants heal'], ['stories', 'the stories']];
        kn.forEach(([c, t], i) => k.text(t, 960, 220 + i * 90, { size: 54, font: 'title', color: P.yellow, fx: 'pop', p: k.at(c, 0.4), outline: P.ink, outlineWidth: 10 }));
        k.text('the original search engine', 960, 1000, { size: 62, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at('joke', 0.4), outline: P.ink, outlineWidth: 10 });
      },
    },
    {
      say: "{chimp}Compare that with your closest living relatives. {hill}A 2001 study of wild chimpanzees, led by Kim Hill, found a life expectancy at birth of under fifteen years. {adult}And chimps that reach adulthood live, on average, only about fifteen more. {human}Hunter-gatherer humans who reach adulthood often get several decades more. {joke}A long old age is one of the strangest things about your species.",
      sfx: [['pop', 'chimp'], ['pop', 'hill'], ['bonk', 'adult', 0.3], ['tada', 'human', 0.4], ['sparkle', 'joke', 0.4]],
      draw(k) {
        savanna(k, { trees: [[1700, 380]] });
        chap(k, 'When grandparents appeared');
        card(k, 520, 200, ['HILL ET AL., 2001', 'Journal of Human Evolution'], 'hill', { w: 640 });
        k.prop('chimp', 420, G - 90, 260, { p: k.at('chimp', 0.5) });
        note(k, 'at birth: < 15 years', 420, 520, 'hill', { size: 52, color: P.red, fx: 'pop' });
        note(k, 'adults: ~15 more', 420, 600, 'adult', { size: 52, fx: 'pop' });
        k.char(1300, G + 30, 420, { ...GRAN, face: 'smug', prop: 'staff', p: k.at('human', 0.5) });
        note(k, 'human adults: decades more', 1300, 380, 'human', { size: 56, color: P.grass, fx: 'pop' });
        k.text('a long old age: very human', 960, 1010, { size: 62, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{dman}And some ancestors made it to old age against the odds. {skull}At Dmanisi, in Georgia, archaeologists found a skull about one point seven seven million years old. {teeth}Its owner had lost nearly all their teeth, {years}years before they died. {how}No teeth, no soft food from a supermarket. {help}The researchers suggested someone may have helped them eat. {debate}That's still debated. {but}But somehow, they survived.",
      sfx: [['pop', 'dman'], ['pop', 'skull'], ['bonk', 'teeth', 0.3], ['pop', 'years'], ['wahwah', 'how', 0.3], ['ding', 'help', 0.4], ['boing', 'debate', 0.3]],
      draw(k) {
        ancientBg(k);
        chap(k, 'When grandparents appeared');
        card(k, 520, 200, ['DMANISI · GEORGIA', 'Lordkipanidze et al. · Nature, 2005'], 'skull', { w: 700 });
        k.prop('skull', 520, 540, 360, { p: k.at('skull', 0.5) });
        note(k, '~1.77 million years', 520, 760, 'skull', { size: 52, color: P.brown, fx: 'pop' });
        note(k, 'nearly toothless — for years', 520, 840, 'years', { size: 50, color: P.red, fx: 'pop' });
        k.char(1260, G + 30, 380, { ...ERECTUS, face: 'sad', prop: 'staff', p: k.at('teeth', 0.5) });
        k.char(1540, G + 30, 380, { ...ERECTUS, body: 'man', beard: false, face: 'happy', pose: 'hold', flip: true, p: k.at('help', 0.5) });
        k.prop('meat', 1460, G - 220, 90, { p: k.at('help', 0.5) });
        note(k, '(debated)', 1400, 300, 'debate', { size: 46, color: '#6b5f55' });
      },
    },
    {
      say: "{ice}Here's a detail about those Upper Paleolithic grandparents. {when}They lived in the middle of the last Ice Age. {cold}Glaciers, frozen winters, and no heating. {survive}So how did anyone survive long enough to get old? {next}That's the next episode.",
      sfx: [['whoosh', 'ice', 0.4], ['pop', 'when'], ['bonk', 'cold', 0.3], ['drumroll', 'survive', 0.3], ['sparkle', 'next', 0.4]],
      draw(k) {
        flat(k, '#cfe4f0', '#f5f7fa');
        k.prop('mountain', 400, G - 280, 640, { snow: true });
        k.prop('mountain', 1550, G - 320, 720, { snow: true });
        k.char(960, G + 30, 420, { ...GRAN, color: '#8a6a4a', face: 'calm', prop: 'staff', p: k.at('when', 0.5) });
        for (let i = 0; i < 20; i++) { const u = ((k.gt ?? 0) * 0.3 + k.rand(i)) % 1; k.dot(k.rand(i + 9) * k.W, u * k.H, 5, '#ffffff', 0.9); }
        k.text('THE LAST ICE AGE', 960, 220, { size: 96, font: 'title', color: P.indigo, fx: 'pop', p: k.at('when', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.text('no heating', 960, 340, { size: 60, font: 'title', color: P.ink, fx: 'pop', p: k.at('cold', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.text('NEXT EPISODE', 960, 1000, { size: 76, font: 'title', color: P.orange, fx: 'pop', p: k.at('next', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 3: Why skeletons lie ----------------
    {
      chapter: 'Why skeletons lie',
      say: "{bones}There's another reason ancient people look young: {how}the way we age skeletons. {methods}Bioarchaeologists read age from things like the pelvis, the skull's seams, and tooth wear. {young}These work well for young adults. {old}But many of the classic methods get blurry after about fifty. {plus}A seventy-year-old can end up in a box simply labeled fifty-plus. {so}So in the record, old people can look younger than they were. {joke}The only time a skeleton flatters you.",
      sfx: [['pop', 'bones'], ['pop', 'how'], ['pop', 'methods'], ['ding', 'young', 0.4], ['bonk', 'old', 0.3], ['pop', 'plus'], ['pop', 'so'], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Why skeletons lie');
        k.char(380, 980, 440, { ...OSTEO, face: k.t > k.cue('old') ? 'blank' : 'happy', pose: 'hold', p: k.at('bones', 0.5) });
        k.prop('skull', 760, 460, 260, { p: k.at('methods', 0.5) });
        k.prop('tooth', 1000, 460, 140, { p: k.at('methods', 0.5) });
        k.prop('bone', 1220, 460, 220, { p: k.at('methods', 0.5) });
        note(k, 'pelvis · skull seams · tooth wear', 1000, 640, 'methods', { size: 46, fx: 'pop' });
        k.rect(1260, 760, 420, 200, { fill: '#c9a07a', fillStyle: 'solid', width: 5, seed: 5830, p: k.at('plus', 0.5) });
        k.text('AGE: 50+', 1470, 860, { size: 70, font: 'title', color: P.ink, p: k.at('plus', 0.5) });
        k.text('(actually 70?)', 1470, 1010, { size: 50, font: 'title', color: P.red, fx: 'pop', p: k.at('so', 0.4), outline: '#fffaf0', outlineWidth: 8 });
        k.text('the only time a skeleton flatters you', 760, 220, { size: 52, font: 'title', color: P.grass, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 8 });
      },
    },

    {
      say: "{otzi}Remember Ötzi, the Iceman from a few episodes back? {age}He was about forty-five when he died. {arrow}Not of old age: an arrowhead was found lodged in his shoulder. {wear}Yet his body already showed worn joints, and hardened arteries. {lesson}That's typical. Ancient adults usually died of something: {list}infections, accidents, violence, childbirth. {old}Old age was often the one thing they never got to.",
      sfx: [['pop', 'otzi'], ['pop', 'age'], ['bonk', 'arrow', 0.3], ['pop', 'wear'], ['pop', 'lesson'], ['pop', 'list'], ['ding', 'old', 0.4]],
      draw(k) {
        flat(k, '#cfe4f0', '#f5f7fa');
        k.prop('mountain', 300, G - 260, 600, { snow: true });
        chap(k, 'Why skeletons lie');
        k.char(760, G + 30, 460, { body: 'man', outfit: 'robe', color: '#7a5a3a', color2: '#4a3a2a', hair: 'long', hairColor: '#3a2a1e', beard: true, beardColor: '#3a2a1e', hat: 'band', face: k.t > k.cue('arrow') ? 'shock' : 'calm', prop: 'staff', p: k.at('otzi', 0.5) });
        k.line(860, 520, 980, 440, { stroke: P.brown, width: 8, seed: 5880, p: k.at('arrow', 0.5) });
        k.poly([[850, 528], [878, 500], [886, 530]], { fill: '#8a8a8a', fillStyle: 'solid', width: 3, seed: 5881, p: k.at('arrow', 0.5) });
        card(k, 1360, 220, ['ÖTZI THE ICEMAN', 'about 45 at death'], 'age', { w: 560 });
        note(k, 'arrowhead in the shoulder', 1360, 380, 'arrow', { size: 50, color: P.red, fx: 'pop' });
        note(k, 'worn joints · hardened arteries', 1360, 470, 'wear', { size: 46, fx: 'pop' });
        note(k, 'infections · accidents · violence · childbirth', 1360, 580, 'list', { size: 44, color: P.brown, fx: 'pop' });
        k.text('old age: often never reached', 960, 1010, { size: 62, font: 'title', color: P.ink, fx: 'pop', p: k.at('old', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    // ---------------- Chapter 4: Old people in old texts ----------------
    {
      chapter: 'Old people in old texts',
      say: "{texts}Old writings tell the same story. {psalm}The Bible's Psalm ninety, written around three thousand years ago, says a human life is threescore years and ten. {seventy}Seventy. {greek}In ancient Greece, Socrates was about seventy when he was put on trial. {soph}The playwright Sophocles kept writing into his nineties. {plato}Plato reached about eighty. {joke}None of them got the memo about dying at thirty.",
      sfx: [['pop', 'texts'], ['pop', 'psalm'], ['tada', 'seventy', 0.4], ['pop', 'greek'], ['pop', 'soph'], ['pop', 'plato'], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k, '#f3e7cf');
        chap(k, 'Old people in old texts');
        k.prop('scroll', 360, 460, 340, { p: k.at('psalm', 0.5) });
        note(k, '"threescore years and ten"', 360, 680, 'psalm', { size: 46 });
        big(k, '= 70', 360, 800, 'seventy', { size: 110 });
        const g = [['greek', 'SOCRATES', '~70', 960], ['soph', 'SOPHOCLES', '90s', 1320], ['plato', 'PLATO', '~80', 1680]];
        g.forEach(([c, t, a, x]) => {
          k.char(x, 860, 340, { ...GREEK, face: 'smug', p: k.at(c, 0.5) });
          note(k, t, x, 400, c, { size: 46, color: P.brown, fx: 'pop' });
          note(k, a, x, 470, c, { size: 64, color: P.red, fx: 'pop' });
        });
        k.text("nobody got the memo", 1320, 1010, { size: 58, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{rome}Even in ancient Rome, where historians estimate life expectancy at birth was only around twenty to thirty, {aug}the emperor Augustus lived to seventy-five. {same}Same pattern as the hunter-gatherers: {kids}a terrible start for babies, {adults}and a decent run for anyone who made it through. {joke}Ancient life wasn't short. It was a filter.",
      sfx: [['pop', 'rome'], ['tada', 'aug', 0.4], ['pop', 'same'], ['bonk', 'kids', 0.3], ['ding', 'adults', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Old people in old texts');
        k.char(1720, 1000, 380, { ...ROMAN, face: 'smug', pose: 'present', flip: true, p: k.at('aug', 0.5) });
        card(k, 400, 220, ['AUGUSTUS', 'died at 75'], 'aug', { w: 460 });
        ageAxis(k, 900);
        ageBar(k, 380, 0, 25, '#cfc6b8', 'rome', 5840, { label: 'Rome, at birth: ~20–30' });
        ageBar(k, 560, 0, 75, P.grass, 'aug', 5841);
        k.text('LIFE WAS A FILTER', 1200, 1010, { size: 76, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 5: What actually changed ----------------
    {
      chapter: 'What actually changed',
      say: "{what}So what actually changed? {kids}Mostly, children stopped dying. {owid}By Our World in Data's estimates, until at least 1800, more than a third of children everywhere died before their fifth birthday. {now}Today, it's about three and a half percent. {life}Global life expectancy is now about seventy-three. {how}Clean water, toilets, vaccines, antibiotics, safer births. {joke}Your great-great-grandparents would call that a miracle. You call it Tuesday.",
      sfx: [['pop', 'what'], ['ding', 'kids', 0.4], ['pop', 'owid'], ['tada', 'now', 0.4], ['pop', 'life'], ['pop', 'how'], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'What actually changed');
        k.text('CHILDREN STOPPED DYING', 960, 200, { size: 80, font: 'title', color: P.grass, fx: 'pop', p: k.at('kids', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        const p1 = k.at('owid', 0.8), p2 = k.at('now', 0.8);
        k.rect(500, 820 - 450 * p1, 260, 450 * p1 + 1, { fill: P.red, fillStyle: 'solid', width: 5, seed: 5850, p: p1 > 0.01 ? 1 : 0 });
        k.rect(1160, 820 - 45 * p2, 260, 45 * p2 + 1, { fill: P.grass, fillStyle: 'solid', width: 5, seed: 5851, p: p2 > 0.01 ? 1 : 0 });
        note(k, '1800: > 1 in 3', 630, 300, 'owid', { size: 52, color: P.red, fx: 'pop' });
        note(k, 'today: ~3.5%', 1290, 700, 'now', { size: 52, color: P.grass, fx: 'pop' });
        note(k, 'died before age 5 · Our World in Data', 960, 880, 'owid', { size: 40, color: '#6b5f55' });
        note(k, 'global life expectancy: ~73', 960, 960, 'life', { size: 52, fx: 'pop' });
        k.text('you call it Tuesday', 960, 1040, { size: 50, font: 'title', color: P.orange, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 8 });
      },
    },
    {
      say: "{why}What was killing so many children? {inf}Mostly infections: {gut}diarrhea from dirty water and food, {lungs}pneumonia, {measles}measles, {birth}and the dangers of birth itself. {toilet}Remember last episode's toilets? {link}Clean water and safe sanitation turned out to be some of the most powerful medicine ever invented.",
      sfx: [['pop', 'why'], ['pop', 'inf'], ['pop', 'gut'], ['pop', 'lungs'], ['pop', 'measles'], ['pop', 'birth'], ['pop', 'toilet'], ['ding', 'link', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'What actually changed');
        k.text('WHAT KILLED THE CHILDREN?', 960, 200, { size: 76, font: 'title', color: P.red, fx: 'pop', p: k.at('why', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        const c = [['gut', 'diarrhea · dirty water'], ['lungs', 'pneumonia'], ['measles', 'measles'], ['birth', 'birth itself']];
        c.forEach(([cue, t], i) => note(k, t, 600, 380 + i * 110, cue, { size: 58, fx: 'pop' }));
        k.rect(1240, 420, 300, 360, { fill: '#ffffff', fillStyle: 'solid', width: 5, seed: 5890, p: k.at('toilet', 0.5) });
        k.ellipse(1390, 800, 380, 110, { fill: '#ffffff', fillStyle: 'solid', width: 5, seed: 5891, p: k.at('toilet', 0.5) });
        k.text('= powerful medicine', 1390, 960, { size: 60, font: 'title', color: P.grass, fx: 'pop', p: k.at('link', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{max}And here's the twist. {avg}We've added a lot of years to the average. {top}But the age that a lucky, healthy human can reach? {same}It hasn't moved nearly as much. {seventy}Seventy, eighty, ninety: your ancestors could get there too. {diff}The difference is that today, most people get the chance.",
      sfx: [['drumroll', 'max', 0.3], ['pop', 'avg'], ['pop', 'top'], ['bonk', 'same', 0.3], ['pop', 'seventy'], ['ding', 'diff', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'What actually changed');
        ageAxis(k, 900);
        ageBar(k, 360, 0, 35, '#cfc6b8', 'avg', 5860, { label: 'then: ~35' });
        ageBar(k, 480, 0, 73, P.grass, 'avg', 5861, { label: 'now: ~73' });
        ageBar(k, 640, 0, 80, P.orange, 'top', 5862);
        note(k, 'how old a lucky human can get: then ≈ now', 960, 760, 'same', { size: 50, color: P.orange, fx: 'pop' });
        k.text('MOST PEOPLE GET THE CHANCE', 960, 220, { size: 76, font: 'title', color: P.grass, fx: 'pop', p: k.at('diff', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 6: Healthier hearts ----------------
    {
      chapter: 'Healthier hearts?',
      say: "{tsimane}And in one way, some foragers age better than you. {study}In 2017, a team led by Hillard Kaplan scanned the hearts of over seven hundred Tsimane adults in Bolivia, farmer-foragers who hunt, fish and farm. {zero}Eighty-five percent had no calcium buildup in their heart arteries at all. {lowest}The researchers called it the lowest level of heart disease of any population studied. {why}Lots of walking, a diet low in processed food. {joke}Their old people have the arteries your doctor dreams about.",
      sfx: [['pop', 'tsimane'], ['pop', 'study'], ['tada', 'zero', 0.4], ['ding', 'lowest', 0.4], ['pop', 'why'], ['boing', 'joke', 0.3]],
      draw(k) {
        flat(k, '#a8d8b0', '#7a9a5a');
        chap(k, 'Healthier hearts?');
        card(k, 520, 200, ['KAPLAN ET AL., 2017', 'The Lancet · Tsimane, Bolivia'], 'study', { w: 700 });
        k.char(420, G + 30, 420, { ...TSIM, face: 'smug', prop: 'staff', walk: k.t > k.cue('why'), p: k.at('tsimane', 0.5) });
        k.icon('heart', 1260, 520, 300, { p: k.at('zero', 0.5) });
        big(k, '85%', 1260, 280, 'zero', { size: 130, color: P.grass });
        note(k, 'no artery calcium', 1260, 760, 'zero', { size: 54, color: P.grass, fx: 'pop' });
        note(k, '"lowest of any population studied"', 1260, 840, 'lowest', { size: 44, color: P.brown });
        k.text("arteries your doctor dreams about", 960, 1010, { size: 54, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Ending ----------------
    {
      chapter: 'So, did they die at 30?',
      say: "{back}So, did ancient humans die at thirty? {most}Most didn't. {many}Many never reached thirty at all, because they died as children. {made}But those who made it through childhood {old}often reached sixty, seventy, or more. {real}The real story isn't short lives. {kids}It's how many kids never got the chance to grow old.",
      sfx: [['whoosh', 'back', 0.4], ['bonk', 'most', 0.3], ['pop', 'many'], ['pop', 'made'], ['ding', 'old', 0.4], ['pop', 'real'], ['ding', 'kids', 0.4]],
      draw(k) {
        campNight(k, { fx: 960, fs: 220 });
        glow(k, 960, G - 100, 760, 0.4);
        k.char(640, G + 40, 380, { ...GRAN, face: 'happy', pose: 'present', p: k.at('old', 0.5) });
        k.char(1300, G + 40, 400, { ...GRANDPA, face: 'happy', prop: 'staff', flip: true, p: k.at('old', 0.5) });
        for (let i = 0; i < 3; i++) k.char(880 + i * 140, G + 40, 200, { ...KID, skin: '#9a6b42', face: 'laugh', alpha: k.t > k.cue('kids') && i === 2 ? 0.4 : 1 });
        k.text('died at 30? mostly no.', 960, 220, { size: 70, font: 'title', color: P.yellow, fx: 'pop', p: k.at('most', 0.4), outline: P.ink, outlineWidth: 12 });
        k.text('the kids who never got to grow old', 960, 340, { size: 58, font: 'title', color: '#d9d3e8', fx: 'fade', p: k.at('kids', 0.5), outline: P.ink, outlineWidth: 10 });
      },
    },

    // ---------------- Recap ----------------
    {
      chapter: 'Recap',
      say: "{t}Quick recap. {a}Low averages came mostly from child deaths. {b}Adults often lived to around seventy. {c}Grandparents became common about thirty thousand years ago. {remind}And next time: how did anyone survive the Ice Age?",
      sfx: [['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['ding', 'remind', 0.4]],
      draw(k) {
        paper(k);
        k.text('RECAP', 960, 130, { size: 80, font: 'title', color: P.red, p: k.at('t', 0.8, 'linear') });
        const rows = [['a', 'Low averages = child deaths'], ['b', 'Adults: often ~70'], ['c', 'Grandparents: ~30,000 years ago'], ['remind', 'Next: surviving the Ice Age']];
        rows.forEach(([c, t], i) => {
          k.icon(i === 3 ? 'question' : 'check', 330, 290 + i * 170, 90, { p: k.at(c, 0.4) });
          k.text(t, 420, 300 + i * 170, { size: 58, font: 'title', align: 'left', p: k.at(c, 1.2, 'linear'), color: i === 3 ? P.red : P.ink });
        });
      },
    },
    nextEpisodeScene({
      lang: 'en',
      say: "{next}Next episode: how did ancient humans survive the Ice Age? {hook}No heating, no zippers, and winters that never seemed to end. {house}Plus: houses built out of mammoth bones. {when}Coming soon.",
      title: 'How Did Ancient Humans Survive the Ice Age?',
      hook: 'Houses made of mammoth bones.',
      when: 'COMING SOON',
      art: (k) => {
        for (let i = 0; i < 7; i++) { const a = Math.PI + (i / 6) * Math.PI; k.line(Math.cos(a) * 200, 130, Math.cos(a) * 120, 130 + Math.sin(a) * 200, { stroke: '#f1e8d4', width: 18, seed: 5870 + i }); }
        k.char(220, 150, 220, { ...ANC({ outfit: 'tunic', color: '#8a6a4a' }), face: 'happy' });
      },
      sfx: [['sparkle', 'hook', 0.3]],
    }),
    subscribeScene({
      lang: 'en',
      say: "{q}Who's the oldest person in your family, and what's their secret? Put it in the comments. {sub}And subscribe, so you don't miss what happened next.",
      question: "Your family's oldest person: what's the secret?",
      channel: 'Long Story Drawn',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};

function ancientBg(k) {
  flat(k, P.orange, P.sand);
  k.prop('acacia', 1700, G - 170, 380);
}
