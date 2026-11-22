// Long Story Drawn — Ep 5: How Did Ancient Humans Raise Kids? (series "how your ancestors actually lived"; promised in Ep 4: babies passed between many hands + hands-on dads)
// Fact check:
//  Hrdy, NOVA interview / Mothers and Others (2009): ~13 million calories to raise a child from birth to nutritional independence (estimate drawing on Hillard Kaplan),
//    more than a mother could supply alone; humans are "cooperative breeders"; chimp mothers keep newborns to themselves for months;
//    being cared for by many may have selected for skill at reading others' minds (her argument — say "argues").
//  Hewlett, Intimate Fathers (1991, Univ. of Michigan Press), Aka net hunters (Central African Republic / Congo): fathers hold or are within arm's reach of infants ~47% of the time
//    (another measure: more than half of 24 h); hold young infants during the day at least ~5× more than fathers in other populations; "more infant care than fathers in any other known society".
//    Hewlett's explanation: husbands and wives cooperate closely (net hunting together, side by side much of the day). Fieldwork from the 1970s.
//  Tronick, Morelli & Winn 1987, "Multiple Caretaking of Efe (Pygmy) Infants", American Anthropologist 89(1): multiple care from birth through at least 18 weeks,
//    infants suckled by women other than the mother. Hrdy (2001, Natural History): by 3 weeks, Efe babies in contact with allomothers ~40% of the time; on average ~14 caretakers, mostly close kin (say "one count").
//  Hawkes 1989 "Hardworking Hadza grandmothers"; Hawkes, O'Connell & Blurton Jones 1997 (Current Anthropology): children's weight gain tracked mothers' foraging,
//    but after a new baby arrived, weaned children's gain tracked grandmothers' foraging. Grandmother hypothesis — still debated.
//    Post-reproductive lifespan: rare in animals; killer whales (and short-finned pilot whales) are among the few known exceptions.
//  Crittenden et al. 2013 ("Juvenile foraging among the Hadza", Evolution & Human Behavior): even young children collect a considerable amount of their own food near camp.
//  Lancy, The Anthropology of Childhood (2008/2015): forager children learn mostly by observing, playing, and doing; little formal teaching; mixed-age play groups;
//    in some forager camps small children handle real knives / digging sticks (Hewlett & Lamb; Lancy).
//  Konner & Worthman 1980 (Science 207: 788–791), !Kung: brief, frequent nursing, mean interval ~13 minutes; helps explain long birth spacing (say "several years").
//  Gurven & Kaplan 2007: ~57% survive to 15 (callback to Ep 4).
//  Pew Research (2019, using 2016 ATUS): US fathers ~8 h/week on child care (~3× 1965's 2.5 h); mothers ~14 h/week.
//  Next episode (Ep 6): Maloney et al. 2022 (Nature), Liang Tebo cave, East Kalimantan, Borneo: lower left leg surgically amputated, probably in childhood,
//    ≥31,000 years ago; survived 6–9 more years. Poster: COMING SOON (no dates).
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import { P, G, YOU, ANC, ANCW, ELDER, KID, SCI, flat, disc, ancient, savanna, night, paper, chap, big, note, redX, card, campNight, glow } from '/channel/long-story-drawn.js';
import * as thumbs from '/videos/021-how-ancient-humans-raised-kids/thumbs.js';

const AKA = ANC({ hair: 'short', color: '#6b4a33', color2: P.yellow, skin: '#8a5a3a' });
const AKAW = ANCW({ color: '#7a5432', color2: P.orange, skin: '#8a5a3a', hair: 'short' });
const AKAKID = { ...KID, skin: '#8a5a3a' };
const HEWLETT = SCI({ hat: undefined, color: '#c2a46b', hair: 'short', hairColor: '#6a4a2a', beard: true, beardColor: '#6a4a2a' });
const TRONICK = SCI({ hat: undefined, color: '#9ab0c8', hair: 'short', hairColor: '#4a3a2e' });
const HRDY = { body: 'woman', outfit: 'dress', color: '#8a5a9a', color2: P.yellow, hair: 'bun', hairColor: '#d8d0c0' };
const HAWKES = { body: 'woman', outfit: 'dress', color: '#4E9A45', color2: P.yellow, hair: 'long', hairColor: '#8a6a4a' };
const HADZAW = ANCW({ color: '#a8744a', color2: '#e0302b', skin: '#9a6b42', hair: 'short' });
const GRAN = { ...ELDER, skin: '#9a6b42', color: '#8a5a3a' };
const PARENT = { ...YOU, hat: undefined, color: '#7a8bb0', color2: '#c9d3e8' };

// Người lớn bế em bé quấn tã trước ngực.
function carry(k, x, y, h, preset, o = {}) {
  const { cry, awake, bp, ...rest } = o;
  k.char(x, y, h, { ...preset, pose: 'hold', ...rest });
  k.prop('baby', x + (rest.flip ? -1 : 1) * h * 0.03, y - h * 0.5, h * 0.3, { flip: rest.flip, cry, awake, p: bp ?? rest.p ?? 1, skin: preset.skin });
}
// Rừng mưa Trung Phi.
function forest(k) {
  flat(k, '#bfe0c4', '#6d8b47');
  const trees = [[80, 520], [330, 640], [620, 480], [1300, 560], [1580, 680], [1850, 520]];
  trees.forEach(([x, s], i) => k.prop('tree', x, G - s * 0.42, s, { fill: i % 2 ? '#3f7a3a' : '#4f8f44' }));
}
// Căn hộ lúc 3 giờ sáng.
function flat3am(k) {
  paper(k, '#2b3152');
  const { ctx } = k;
  ctx.fillStyle = '#3b4266'; ctx.fillRect(0, G, k.W, k.H - G);
  k.rect(1380, 140, 400, 340, { fill: '#1b2142', fillStyle: 'solid', stroke: '#c9c4bb', width: 10, seed: 2101 });
  k.line(1580, 140, 1580, 480, { stroke: '#c9c4bb', width: 8, seed: 2102 });
  k.prop('moon', 1680, 250, 110);
  for (let i = 0; i < 8; i++) k.dot(1400 + k.rand(i) * 360, 160 + k.rand(i + 30) * 300, 3, '#fff7d6', 0.6);
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    title: 'How Did Ancient Humans Raise Kids?',
    description: `It's 3 a.m., a baby is crying, and you're alone. For most of human history, that last part almost never happened.
How did ancient humans raise kids? The most hands-on dads ever studied, babies passed between more than a dozen caregivers, hard-working grandmothers, and children who mostly taught themselves. Episode 5 of "How your ancestors actually lived".`,
    footer: `📚 Sources: Hrdy, Mothers and Others (2009); Hewlett, Intimate Fathers (1991); Tronick, Morelli & Winn (1987, American Anthropologist), "Multiple Caretaking of Efe (Pygmy) Infants"; Hawkes, O'Connell & Blurton Jones (1997, Current Anthropology); Crittenden et al. (2013, Evolution and Human Behavior), "Juvenile foraging among the Hadza"; Lancy, The Anthropology of Childhood; Konner & Worthman (1980, Science); Gurven & Kaplan (2007, Population and Development Review); Pew Research Center (2019), fathers' time with children; Maloney et al. (2022, Nature).
👶 Previous episode: Did Ancient Humans Work Less Than You? Next: How Did Ancient Humans Survive Without Doctors?`,
    tags: ['how did ancient humans raise kids', 'hunter gatherer parenting', 'alloparenting', 'cooperative breeding', 'aka fathers', 'best fathers in the world', 'grandmother hypothesis', 'why do humans have menopause', 'sarah blaffer hrdy', 'mothers and others', 'it takes a village', 'ancient humans', 'human evolution', 'prehistory', 'anthropology', 'hunter gatherers', 'hadza', 'parenting history', 'history of childhood', 'early humans', 'animated history', 'history explained', 'how people lived', 'long story drawn'],
    hashtags: ['ancienthumans', 'parenting', 'history'],
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
      say: "{cry}It's three a.m. A baby is crying. {rock}You're rocking it, back and forth, alone in a dark apartment. {weeks}You haven't slept properly in weeks. {rare}For most of human history, this exact moment was surprisingly rare. {not}Not the crying. {alone}The alone part.",
      sfx: [['pop', 'cry'], ['wahwah', 'weeks', 0.3], ['ding', 'rare', 0.4], ['boing', 'alone', 0.3]],
      draw(k) {
        flat3am(k);
        k.text('3:00 AM', 520, 200, { size: 130, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at('cry', 0.5), outline: P.ink, outlineWidth: 16 });
        const sway = Math.sin((k.gt ?? 0) * 2.4) * 0.04 * k.at('rock', 0.5);
        k.group({ x: 960, y: G + 30, r: sway }, () => carry(k, 0, 0, 480, PARENT, { face: k.t > k.cue('weeks') ? 'sad' : 'blank', cry: k.t < k.cue('rare') }));
        k.sweat(1040, G - 420, 1.4, { p: k.at('weeks', 0.4) });
        note(k, 'WAAAH!', 760, 430, 'cry', { size: 60, color: '#ff8a7a', outline: P.ink, fx: 'pop' });
        k.text('…the ALONE part', 960, 1000, { size: 70, font: 'title', color: P.yellow, fx: 'pop', p: k.at('alone', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },
    {
      say: "{last}Last episode, we asked who looked after the kids while the adults were out finding food. {series}This is episode five of a series on how your ancestors actually lived. {sub}If you're new, subscribe. It's less effort than burping a baby. {plan}Today: {a}the most hands-on dads ever studied, {b}babies passed from hand to hand, {c}hard-working grandmothers, {d}and kids who mostly taught themselves.",
      sfx: [['pop', 'last'], ['pop', 'sub', 0.5], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd']],
      draw(k) {
        paper(k);
        note(k, 'HOW YOUR ANCESTORS ACTUALLY LIVED', 960, 120, 'series', { size: 58, color: P.brown });
        note(k, 'Episode 5', 960, 200, 'series', { size: 44, color: P.red });
        k.group({ a: 1 - k.at('a', 0.3) }, () => {
          k.prop('tuber', 600, 700, 160, { p: k.at('last', 0.5) });
          k.text('who watched the kids?', 960, 480, { size: 70, font: 'title', color: P.ink, fx: 'pop', p: k.at('last', 0.5), outline: '#fffaf0', outlineWidth: 10 });
          k.icon('question', 1320, 700, 160, { p: k.at('last', 0.6) });
        });
        const items = [['a', 'HANDS-ON DADS', 'dad'], ['b', 'PASS THE BABY', 'baby'], ['c', 'GRANDMOTHERS', 'tuber'], ['d', 'SELF-TAUGHT KIDS', 'berries']];
        items.forEach(([c, t, prop], i) => {
          const x = 300 + i * 440, p = k.at(c, 0.5);
          k.group({ x, y: 560, r: i % 2 ? 0.03 : -0.03, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-180, -200, 360, 400, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 2110 + i });
            if (prop === 'dad') carry(k, 0, 70, 220, AKA, { face: 'happy', shadow: false });
            else k.prop(prop, 0, -40, prop === 'baby' ? 220 : 180, { awake: true });
            k.text(t, 0, 140, { size: 40, font: 'title', color: P.red, maxWidth: 330 });
          });
        });
        k.char(1760, 1060, 300, { ...YOU, face: 'happy', pose: 'wave', p: k.at('sub', 0.5) });
      },
    },

    // ---------------- Chapter 1: An expensive baby ----------------
    {
      chapter: 'An expensive baby',
      say: "{why}First: why would a baby need so many people? {helpless}Because human babies are spectacularly helpless. {foal}A baby horse is walking within hours of being born. {you}You took about a year. {chimp}A young chimp is mostly feeding itself by around five. {kid}A human child needs feeding for well over a decade.",
      sfx: [['pop', 'why'], ['boing', 'foal', 0.3], ['wahwah', 'you', 0.3], ['pop', 'chimp'], ['ding', 'kid', 0.4]],
      draw(k) {
        savanna(k, { trees: [[1700, 380]] });
        chap(k, 'An expensive baby');
        k.text('SPECTACULARLY HELPLESS', 960, 170, { size: 80, font: 'title', color: P.red, fx: 'pop', p: k.at('helpless', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.prop('horse', 380, G - 110, 240, { p: k.at('foal', 0.5) });
        note(k, 'walks in hours', 380, 380, 'foal', { size: 46, fx: 'pop' });
        k.prop('baby', 900, G - 60, 200, { awake: true, p: k.at('you', 0.5) });
        note(k, '~1 year', 900, 380, 'you', { size: 52, color: P.orange, fx: 'pop' });
        k.prop('chimp', 1300, G - 70, 180, { p: k.at('chimp', 0.5) });
        k.prop('berries', 1400, G - 40, 80, { p: k.at('chimp', 0.5) });
        note(k, 'feeds itself by ~5', 1340, 380, 'chimp', { size: 46, fx: 'pop' });
        big(k, '10+ YEARS OF FEEDING', 960, 1000, 'kid', { size: 76 });
      },
    },
    {
      say: "{bill}Add it all up, and the bill is enormous. {hrdy}Anthropologist Sarah Blaffer Hrdy, using estimates by Hillard Kaplan, puts it at around thirteen million calories {indep}to raise a child until it can feed itself. {mom}That's more than one mother could gather on her own. {next}Especially since the next baby often arrived before the last one could feed itself. {so}So who helped?",
      sfx: [['cash', 'bill', 0.4], ['drumroll', 'hrdy', 0.3], ['tada', 'indep', 0.3], ['bonk', 'next', 0.3], ['pop', 'so']],
      draw(k) {
        paper(k);
        chap(k, 'An expensive baby');
        card(k, 480, 200, ['SARAH BLAFFER HRDY', '"Mothers and Others" · 2009'], 'hrdy', { w: 620 });
        big(k, '13,000,000', 1340, 220, 'indep', { size: 120 });
        note(k, 'calories, birth → feeding itself', 1340, 330, 'indep', { size: 46, color: P.brown });
        const foods = ['tuber', 'berries', 'meat', 'baobab', 'tuber', 'berries', 'meat', 'baobab', 'tuber', 'baobab'];
        foods.forEach((f, i) => k.prop(f, 1060 + (i % 5) * 130, 760 - Math.floor(i / 5) * 110, 120, { p: k.at(k.cue('bill', 0.2 + i * 0.15), 0.4) }));
        carry(k, 520, 980, 420, ANCW(), { face: k.t > k.cue('next') ? 'shock' : 'calm', p: k.at('mom', 0.5) });
        k.char(700, 980, 200, { ...KID, face: 'happy', p: k.at('next', 0.5) });
        k.sweat(600, 600, 1.4, { p: k.at('next', 0.4) });
        k.text('SO WHO HELPED?', 1340, 1000, { size: 76, font: 'title', color: P.red, fx: 'pop', p: k.at('so', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 2: The Aka dads ----------------
    {
      chapter: 'The most hands-on dads',
      say: "{forest}Start in the rainforests of Central Africa, with the Aka, forest foragers who hunt with nets. {hewlett}Starting in the 1970s, anthropologist Barry Hewlett spent years with them, {timing}carefully recording who was holding the babies. {book}In 1991, he published what he found, in a book called Intimate Fathers.",
      sfx: [['whoosh', 'forest', 0.4], ['pop', 'hewlett'], ['scratch', 'timing', 0.3], ['ding', 'book', 0.4]],
      draw(k) {
        forest(k);
        chap(k, 'The most hands-on dads');
        k.prop('net', 1500, G - 150, 300, { p: k.at('forest', 0.6) });
        k.char(1180, G + 30, 380, { ...AKAW, face: 'happy', p: k.at('forest', 0.5) });
        carry(k, 1500 - 30, G + 30, 400, AKA, { face: 'happy', p: k.at('forest', 0.5), flip: true });
        k.char(420, G + 30, 420, { ...HEWLETT, face: 'calm', pose: 'hold', prop: 'scroll', p: k.at('hewlett', 0.5) });
        k.icon('clock', 640, 420, 120, { p: k.at('timing', 0.5) });
        card(k, 520, 200, ['BARRY HEWLETT', '"Intimate Fathers" · 1991'], 'book', { w: 620 });
      },
    },
    {
      say: "{reach}His finding: in camp, Aka fathers are holding their babies, or within arm's reach of them, about half the time. {more}That's more infant care than fathers in any other society that had been measured. {five}He found they held very young babies at least five times more than fathers in other groups. {hunt}And on net hunts, the whole family goes: men, women, and babies.",
      sfx: [['drumroll', 'reach', 0.3], ['tada', 'more', 0.4], ['pop', 'five'], ['whoosh', 'hunt', 0.4]],
      draw(k) {
        forest(k);
        chap(k, 'The most hands-on dads');
        k.group({ a: 1 - k.at('hunt', 0.4) }, () => {
          carry(k, 560, G + 30, 460, AKA, { face: 'happy', awake: true });
          const p = k.at('reach', 0.6);
          k.ellipse(560, G - 200, 520 * p, 520 * p, { stroke: P.yellow, width: 8, seed: 2120, p });
          note(k, "arm's reach", 560, G - 500, 'reach', { size: 46, color: P.ink, fx: 'pop' });
          big(k, '~ HALF THE TIME', 1300, 250, 'reach', { size: 96 });
          note(k, 'more than any other society measured', 1300, 370, 'more', { size: 46, color: P.brown });
          big(k, '5× MORE', 1300, 520, 'five', { size: 110, color: P.orange });
          note(k, 'holding very young babies', 1300, 620, 'five', { size: 44 });
        });
        k.group({ a: k.at('hunt', 0.4) }, () => {
          const w = Math.min(1, (k.t - k.cue('hunt')) / 6);
          k.prop('net', 1600, G - 140, 320);
          k.char(500 + 300 * w, G + 30, 380, { ...AKA, face: 'happy', prop: 'spear', walk: true });
          carry(k, 800 + 300 * w, G + 30, 360, AKAW, { face: 'happy', walk: true });
          k.char(1020 + 300 * w, G + 30, 220, { ...AKAKID, face: 'laugh', walk: true });
          k.text('THE WHOLE FAMILY HUNTS', 960, 220, { size: 76, font: 'title', color: P.red, fx: 'pop', p: k.at('hunt', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        });
      },
    },
    {
      say: "{why}So why are Aka dads so hands-on? {close}Hewlett's answer: closeness. {together}Aka husbands and wives spend much of the day side by side: {hunting}hunting together, {cooking}cooking together, {resting}resting together. {normal}When dad is always nearby, holding the baby is just normal. {nobody}Nobody calls it babysitting. {medal}Nobody gives him a medal for it, either.",
      sfx: [['pop', 'why'], ['ding', 'close', 0.4], ['pop', 'hunting'], ['pop', 'cooking'], ['pop', 'resting'], ['boing', 'medal', 0.3]],
      draw(k) {
        forest(k);
        chap(k, 'The most hands-on dads');
        big(k, 'CLOSENESS', 960, 150, 'close', { size: 100 });
        const acts = [['hunting', 'net', 'hunting'], ['cooking', 'campfire', 'cooking'], ['resting', 'grassbed', 'resting']];
        acts.forEach(([c, prop, t], i) => {
          const x = 420 + i * 540;
          const p = k.at(c, 0.5);
          k.group({ x, y: 370, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-150, -120, 300, 240, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 2125 + i });
            k.prop(prop, 0, -20, 140, { fire: 0.6 });
            k.text(t, 0, 80, { size: 44, font: 'title', color: P.ink });
          });
        });
        k.char(820, G + 30, 380, { ...AKAW, face: 'happy', pose: 'present' });
        carry(k, 1100, G + 30, 400, AKA, { face: k.t > k.cue('medal') ? 'smug' : 'happy', flip: true });
        k.text('(no medal)', 1500, 1000, { size: 60, font: 'title', color: P.red, fx: 'pop', p: k.at('medal', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 3: Pass the baby ----------------
    {
      chapter: 'Pass the baby',
      say: "{efe}Next door, in the Ituri forest of Congo, live the Efe. {tronick}In the 1980s, Edward Tronick, Gilda Morelli and Steve Winn watched what happened to Efe babies. {born}From the day they were born, babies were handed from person to person. {nurse}Some were even nursed by women other than their mother.",
      sfx: [['whoosh', 'efe', 0.4], ['pop', 'tronick'], ['whoosh', 'born', 0.3], ['whoosh', ['born', 1.4], 0.3], ['whoosh', ['born', 2.8], 0.3]],
      draw(k) {
        forest(k);
        chap(k, 'Pass the baby');
        card(k, 520, 200, ['TRONICK, MORELLI & WINN', 'American Anthropologist · 1987'], 'tronick', { w: 680 });
        const people = [[ANCW({ skin: '#8a5a3a', color: '#8a5a3a', hair: 'short' }), 300], [GRAN, 620], [ANCW({ skin: '#8a5a3a', color: '#a8744a', color2: P.grass, hair: 'long' }), 940], [AKA, 1260], [{ ...AKAKID, body: 'kid' }, 1580]];
        const u = Math.min(4, Math.max(0, (k.t - k.cue('born')) / 1.4));
        const i0 = Math.floor(u), f = k.ease.inOut ? k.ease.inOut(u - i0) : u - i0;
        people.forEach(([pr, x], i) => k.char(x, G + 30, i === 4 ? 260 : 380, { ...pr, face: Math.abs(i - u) < 0.6 ? 'happy' : 'calm', pose: Math.abs(i - u) < 0.6 ? 'hold' : 'stand', p: k.at('efe', 0.5) }));
        const xa = people[i0][1], xb = people[Math.min(4, i0 + 1)][1];
        const chest = (i) => (i >= 4 ? 125 : 190);
        const bx = k.lerp(xa, xb, f), hy = k.lerp(chest(i0), chest(i0 + 1), f);
        k.prop('baby', bx + 10, G + 30 - hy - Math.sin(f * Math.PI) * 80, i0 >= 4 ? 90 : 120, { awake: true, p: k.at('born', 0.4), skin: '#8a5a3a' });
        note(k, 'nursed by other women too', 960, 1000, 'nurse', { size: 52, color: P.yellow, outline: P.ink, fx: 'pop' });
      },
    },
    {
      say: "{three}By three weeks old, an Efe baby was spending around forty percent of its time with someone other than its mother. {count}By one count, the average baby had fourteen different caregivers, {kin}mostly close relatives. {name}Anthropologists have a word for these helpers. {allo}Alloparents. {other}Allo just means other. {others}Other parents.",
      sfx: [['pop', 'three'], ['drumroll', 'count', 0.3], ['tada', ['count', 1.4], 0.4], ['ding', 'allo', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'Pass the baby');
        const p = k.at('three', 1);
        k.circle(420, 400, 200, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 2130, p: Math.min(1, p * 2) });
        const { ctx } = k;
        ctx.beginPath(); ctx.moveTo(420, 400); ctx.arc(420, 400, 196, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.4 * p); ctx.closePath(); ctx.fillStyle = P.orange; ctx.fill();
        big(k, '~40%', 420, 400, 'three', { size: 90, color: P.ink });
        note(k, 'of the time with others', 420, 660, 'three', { size: 44 });
        note(k, 'at 3 weeks old', 420, 720, 'three', { size: 40, color: P.brown });
        for (let i = 0; i < 14; i++) {
          const a = (i / 14) * Math.PI * 2, x = 1340 + Math.cos(a) * 330, y = 440 + Math.sin(a) * 250;
          k.char(x, y + 70, 130, { ...(i % 3 ? ANCW({ hair: i % 2 ? 'short' : 'long', skin: '#8a5a3a', color: ['#8a5a3a', '#a8744a', '#7a5432'][i % 3] }) : AKA), face: 'happy', shadow: false, p: k.at(k.cue('count', 0.1 * i), 0.3) });
        }
        k.prop('baby', 1340, 440, 150, { awake: true, skin: '#8a5a3a', p: k.at('count', 0.4) });
        big(k, '14 CAREGIVERS', 1340, 800, k.cue('count', 1.4), { size: 80 });
        note(k, 'mostly close kin', 1340, 880, 'kin', { size: 42, color: P.brown });
        k.text('ALLO = OTHER', 960, 1000, { size: 80, font: 'title', color: P.grass, fx: 'pop', p: k.at('allo', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{hrdy}Sarah Hrdy thinks this is the key to who you are. {coop}Humans, she argues, are cooperative breeders. {chimp}A chimp mother barely lets anyone touch her newborn for months. {human}Human mothers hand theirs around. {read}And a baby passed between many hands has to learn fast: {who}who is this? {kind}Are they kind? {want}What do they want? {mind}Hrdy argues that's part of how your species got so good at reading other minds.",
      sfx: [['pop', 'hrdy'], ['ding', 'coop', 0.4], ['bonk', 'chimp', 0.3], ['whoosh', 'human', 0.4], ['pop', 'who'], ['pop', 'kind'], ['pop', 'want'], ['sparkle', 'mind', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'Pass the baby');
        k.char(260, 1000, 380, { ...HRDY, face: 'smug', pose: 'present', p: k.at('hrdy', 0.5) });
        big(k, 'COOPERATIVE BREEDERS', 1060, 140, 'coop', { size: 80 });
        k.group({ a: 1 - k.at('read', 0.4) }, () => {
          k.prop('chimp', 760, 480, 260, { p: k.at('chimp', 0.5) });
          k.prop('chimp', 790, 500, 110, { p: k.at('chimp', 0.5) });
          note(k, "chimp: 'MINE.'", 760, 680, 'chimp', { size: 50, color: P.brown, fx: 'pop' });
          carry(k, 1300, 900, 360, ANCW(), { face: 'happy', p: k.at('human', 0.5) });
          k.char(1560, 900, 330, { ...GRAN, face: 'happy', pose: 'hold', p: k.at('human', 0.5), flip: true });
          k.arrow(1360, 440, 1520, 440, { stroke: P.orange, width: 6, bend: -40, p: k.at('human', 0.6), seed: 2140 });
          note(k, 'human: "here, hold her"', 1420, 360, 'human', { size: 46, color: P.grass, fx: 'pop' });
        });
        k.group({ a: k.at('read', 0.4) }, () => {
          k.prop('baby', 1000, 560, 260, { awake: true });
          const qs = [['who', 'who is this?', 760, 340], ['kind', 'are they kind?', 1300, 380], ['want', 'what do they want?', 1050, 780]];
          qs.forEach(([c, t, x, y]) => k.bubble(x - 200, y - 60, 400, 120, 1000, 540, { p: k.at(c, 0.4), text: t, size: 40, think: true }));
          k.icon('brain', 1560, 620, 220, { p: k.at('mind', 0.5) });
          note(k, 'reading minds', 1560, 780, 'mind', { size: 48, color: P.red, fx: 'pop' });
        });
      },
    },
    {
      say: "{care}And this caring didn't stop with babies. {borneo}In a cave in Borneo, at least thirty-one thousand years ago, a child lost the lower part of a leg. {cut}It was cut off, on purpose. {lived}And the child survived, for years. {who}Somebody looked after that child. {how}How? {next}That's the next episode.",
      sfx: [['whoosh', 'care', 0.4], ['pop', 'borneo'], ['bonk', 'cut', 0.3], ['ding', 'lived', 0.4], ['drumroll', 'how', 0.3], ['sparkle', 'next', 0.4]],
      draw(k) {
        flat(k, '#2c2a3e', '#4a3f5e');
        k.prop('cave', 960, 560, 900);
        k.prop('campfire', 700, G - 20, 150, { fire: 1 });
        glow(k, 700, G - 80, 520, 0.45);
        card(k, 960, 160, ['BORNEO · LIANG TEBO CAVE', 'at least 31,000 years ago'], 'borneo', { w: 720 });
        k.char(1060, G + 30, 260, { ...KID, skin: '#9a6b42', face: k.t > k.cue('lived') ? 'happy' : 'calm', prop: 'staff', p: k.at('borneo', 0.5) });
        k.text('SURVIVED', 1360, 420, { size: 80, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at('lived', 0.4), outline: P.ink, outlineWidth: 12 });
        k.icon('question', 1480, 640, 150, { p: k.at('how', 0.5), stroke: P.yellow });
        k.text('NEXT EPISODE', 960, 1000, { size: 70, font: 'title', color: P.yellow, fx: 'pop', p: k.at('next', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 4: Grandmothers ----------------
    {
      chapter: 'Why grandmothers exist',
      say: "{odd}Here's an odd fact about your species. {stop}Women stop having children at around fifty, {decades}and then can live for decades. {rare}Very few animals do that. {orca}Killer whales are one of the rare exceptions. {chimp}Female chimps usually keep having babies until close to the end of their lives. {why}So why would evolution keep grandmothers around?",
      sfx: [['pop', 'odd'], ['ding', 'decades', 0.4], ['whoosh', 'orca', 0.4], ['pop', 'chimp'], ['drumroll', 'why', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Why grandmothers exist');
        const bar = (y, label, c1, f1, c2, f2, cue, seed) => {
          const p = k.at(cue, 1);
          k.text(label, 300, y + 50, { size: 50, font: 'title', align: 'right', color: P.ink, p: p > 0 ? 1 : 0 });
          k.rect(340, y, 1100 * f1 * p, 100, { fill: c1, fillStyle: 'solid', width: 4, seed, p: p > 0.01 ? 1 : 0 });
          k.rect(340 + 1100 * f1, y, 1100 * f2 * Math.max(0, p * 2 - 1), 100, { fill: c2, fillStyle: 'solid', width: 4, seed: seed + 1, p: p > 0.51 ? 1 : 0 });
        };
        bar(300, 'HUMAN', P.orange, 0.55, '#f7c08a', 0.35, 'stop', 2150);
        note(k, 'having children', 640, 270, 'stop', { size: 38, color: P.brown });
        note(k, 'decades more ✓', 1240, 270, 'decades', { size: 38, color: P.grass, fx: 'pop' });
        k.char(1700, 520, 220, { ...ELDER, face: 'happy', p: k.at('decades', 0.5) });
        bar(560, 'CHIMP', P.brown, 0.8, '#d9c4a8', 0.04, 'chimp', 2152);
        k.prop('chimp', 1700, 640, 140, { p: k.at('chimp', 0.5) });
        k.prop('orca', 700, 860, 260, { p: k.at('orca', 0.5), bob: 3 });
        note(k, 'killer whales do it too', 1200, 860, 'orca', { size: 50, color: P.indigo, fx: 'pop' });
        k.text('WHY KEEP GRANDMA?', 960, 1010, { size: 80, font: 'title', color: P.red, fx: 'pop', p: k.at('why', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{remember}Remember Kristen Hawkes, who caught the missing hours in the last episode? {team}With James O'Connell and Nicholas Blurton Jones, she watched Hadza foragers in Tanzania. {grans}And some of the hardest workers in camp were the grandmothers, {dig}digging up tubers for hours a day.",
      sfx: [['pop', 'remember'], ['pop', 'team'], ['ding', 'grans', 0.4], ['scratch', 'dig', 0.3]],
      draw(k) {
        savanna(k, { trees: [[1700, 420]] });
        chap(k, 'Why grandmothers exist');
        k.char(330, G + 30, 420, { ...HAWKES, face: 'smug', pose: 'point', p: k.at('remember', 0.5) });
        card(k, 520, 200, ['HAWKES, O\'CONNELL & BLURTON JONES', 'Hadza, Tanzania'], 'team', { w: 760 });
        const dig = Math.sin((k.gt ?? 0) * 6) * 0.15 * k.at('dig', 0.5);
        k.group({ x: 1100, y: G + 30, r: 0.1 + dig }, () => k.char(0, 0, 400, { ...GRAN, face: 'happy', prop: 'staff', pose: 'hold', p: k.at('grans', 0.5) }));
        for (let i = 0; i < 4; i++) k.prop('tuber', 1340 + (i % 2) * 120, G - 10 - Math.floor(i / 2) * 60, 110, { p: k.at(k.cue('dig', 0.6 + i * 0.5), 0.4) });
        k.text('HARDEST WORKERS?', 1380, 380, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('grans', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.text('GRANDMA', 1380, 480, { size: 90, font: 'title', color: P.orange, fx: 'pop', p: k.at('grans', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{found}They found something striking. {mom}Kids' weight gain tracked how much their mother foraged, {baby}until she had a new baby. {gran}After that, the older kids' weight tracked their grandmother's foraging instead. {hyp}That's the grandmother hypothesis: {help}grandmothers helping to feed the kids may be one reason humans live so long. {debate}It's still debated. {joke}But grandma may be the reason you have a grandma.",
      sfx: [['pop', 'found'], ['pop', 'mom'], ['bonk', 'baby', 0.3], ['tada', 'gran', 0.4], ['ding', 'hyp', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        paper(k);
        chap(k, 'Why grandmothers exist');
        const sw = k.t > k.cue('gran');
        carry(k, 380, 760, 380, HADZAW, { face: 'calm', bp: k.at('baby', 0.5), p: k.at('mom', 0.5) });
        k.char(760, 760, 360, { ...GRAN, face: 'happy', prop: 'staff', p: k.at('gran', 0.5) });
        k.char(1120, 760, 220, { ...KID, skin: '#9a6b42', face: sw ? 'laugh' : 'calm', p: k.at('found', 0.5) });
        const ap = k.at(sw ? 'gran' : 'mom', 0.6), ax = sw ? 840 : 470, ac = sw ? P.grass : P.orange;
        k.line(ax, 600, k.lerp(ax, 1040, ap), 620, { stroke: ac, width: 10, seed: sw ? 2161 : 2160 });
        k.poly([[1060, 620], [1020, 590], [1020, 650]], { fill: ac, fillStyle: 'solid', stroke: ac, width: 4, p: ap > 0.95 ? 1 : 0, seed: 2162 });
        note(k, sw ? "grandma's foraging → kid's weight" : "mom's foraging → kid's weight", 960, 200, sw ? 'gran' : 'mom', { size: 50, color: sw ? P.grass : P.orange, fx: 'pop' });
        note(k, '(new baby)', 380, 300, 'baby', { size: 42, color: P.brown, fx: 'pop' });
        card(k, 1560, 420, ['THE GRANDMOTHER', 'HYPOTHESIS'], 'hyp', { w: 520 });
        note(k, '(still debated)', 1560, 600, 'debate', { size: 42, color: '#6b5f55' });
        k.text('grandma → why you have a grandma', 960, 1000, { size: 56, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 5: Kids raising themselves ----------------
    {
      chapter: 'Kids raising themselves',
      say: "{doing}So what were the kids doing all day? {play}Mostly, playing. {groups}In forager camps, kids usually play in mixed-age groups. {older}Older kids keep an eye on the little ones. {copy}Little ones copy the big ones. {teach}Anthropologist David Lancy, who compared childhood across hundreds of societies, notes there's surprisingly little formal teaching. {watch}Kids learn by watching, and by doing.",
      sfx: [['pop', 'doing'], ['boing', 'play', 0.3], ['pop', 'older'], ['pop', 'copy'], ['pop', 'teach'], ['ding', 'watch', 0.4]],
      draw(k) {
        savanna(k, { trees: [[260, 420], [1700, 380]] });
        chap(k, 'Kids raising themselves');
        const kids = [[560, 300, 'calm', 'think'], [800, 240, 'laugh', 'cheer'], [1000, 200, 'happy', 'wave'], [1200, 170, 'laugh', 'cheer'], [1380, 150, 'happy', 'stand']];
        kids.forEach(([x, h, f, pose], i) => k.char(x, G + 30, h, { ...KID, skin: ['#9a6b42', '#d9a77c', '#8a5a3a'][i % 3], face: f, pose, bob: i ? 4 : 0, p: k.at(i ? 'play' : 'older', 0.5), walk: i && k.t > k.cue('copy') }));
        k.text('MIXED-AGE PLAY', 960, 200, { size: 90, font: 'title', color: P.red, fx: 'pop', p: k.at('groups', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.icon('eye', 560, 420, 100, { p: k.at('older', 0.4) });
        card(k, 1460, 400, ['DAVID LANCY', '"The Anthropology of Childhood"'], 'teach', { w: 640 });
        note(k, 'watch → play → do', 960, 1000, 'watch', { size: 64, color: P.grass, fx: 'pop' });
      },
    },
    {
      say: "{slide}And play slides into real work. {crit}Anthropologist Alyssa Crittenden and her colleagues found that Hadza children, even very young ones, collect a good amount of their own food: {berries}berries, {baobab}baobab fruit, {tubers}small tubers near camp. {lunch}Imagine your five-year-old packing their own lunch. {bush}From the bush.",
      sfx: [['whoosh', 'slide', 0.4], ['pop', 'crit'], ['pop', 'berries'], ['pop', 'baobab'], ['pop', 'tubers'], ['boing', 'lunch', 0.3]],
      draw(k) {
        savanna(k, { trees: [[180, 380]] });
        chap(k, 'Kids raising themselves');
        card(k, 520, 200, ['CRITTENDEN ET AL., 2013', 'Juvenile foraging · Hadza'], 'crit', { w: 640 });
        k.char(560, G + 30, 260, { ...KID, skin: '#9a6b42', face: 'happy', pose: 'hold', p: k.at('crit', 0.5) });
        k.char(860, G + 30, 210, { ...KID, skin: '#9a6b42', face: 'laugh', pose: 'cheer', p: k.at('crit', 0.5) });
        const foods = [['berries', 'berries', 1100], ['baobab', 'baobab', 1380], ['tubers', 'tuber', 1660]];
        foods.forEach(([c, prop, x]) => { k.prop(prop, x, 540, 150, { p: k.at(c, 0.5) }); note(k, c, x, 640, c, { size: 44, fx: 'pop' }); });
        k.text("5 years old. packs own lunch.", 1300, 360, { size: 54, font: 'title', color: P.red, fx: 'pop', p: k.at('lunch', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        note(k, '…from the bush', 1300, 760, 'bush', { size: 54, color: P.brown, fx: 'pop' });
      },
    },
    {
      say: "{tools}Kids also play with real tools. {knife}In some forager camps, anthropologists have watched small children handling knives and digging sticks, {adults}while the adults nearby barely look up. {cares}It's not that nobody cares. {trust}It's that kids are trusted to learn by doing. {you}Your local playground may have different rules.",
      sfx: [['pop', 'tools'], ['click', 'knife', 0.4], ['pop', 'adults'], ['ding', 'trust', 0.4], ['boing', 'you', 0.3]],
      draw(k) {
        forest(k);
        chap(k, 'Kids raising themselves');
        k.char(560, G + 30, 220, { ...AKAKID, face: 'happy', pose: 'hold', p: k.at('tools', 0.5) });
        k.prop('knife', 610, G - 120, 110, { p: k.at('knife', 0.5), rotate: -0.3 });
        k.char(820, G + 30, 260, { ...AKAKID, face: 'laugh', prop: 'staff', p: k.at('knife', 0.5) });
        k.char(1300, G + 30, 360, { ...AKAW, face: 'calm', p: k.at('adults', 0.5) });
        k.char(1560, G + 30, 380, { ...AKA, face: 'sleep', p: k.at('adults', 0.5) });
        k.text('…', 1440, 560, { size: 80, font: 'title', color: P.ink, p: k.at('adults', 0.4) });
        big(k, 'TRUSTED TO LEARN', 960, 230, 'trust', { size: 96, color: P.grass });
        k.text('(your playground: different rules)', 960, 1000, { size: 50, font: 'title', color: P.ink, fx: 'pop', p: k.at('you', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 6: Not easy ----------------
    {
      chapter: 'Not easy',
      say: "{but}None of this means raising kids was easy. {last}As we saw last episode, roughly four in ten children didn't reach fifteen. {nurse}And babies nursed constantly. {konner}In a 1980 study among the San of the Kalahari, Melvin Konner and Carol Worthman found mothers nursed in short bouts, {thirteen}about every thirteen minutes on average, {years}day and night, for years. {spacing}That's one reason births there were spaced several years apart.",
      sfx: [['scratch', 'but', 0.4], ['bonk', 'last', 0.2], ['pop', 'konner'], ['tada', 'thirteen', 0.3], ['ding', 'spacing', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'Not easy');
        k.text('NOT EASY', 960, 140, { size: 90, font: 'title', color: P.ink, fx: 'pop', p: k.at('but', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        note(k, '≈ 4 in 10 children did not reach 15', 960, 240, 'last', { size: 48, color: P.brown });
        card(k, 520, 420, ['KONNER & WORTHMAN, 1980', 'Science · !Kung (San)'], 'konner', { w: 640 });
        carry(k, 520, 1010, 380, ANCW(), { face: 'calm', p: k.at('nurse', 0.5) });
        k.icon('clock', 1240, 420, 170, { p: k.at('thirteen', 0.5) });
        big(k, 'EVERY ~13 MIN', 1240, 580, 'thirteen', { size: 90 });
        note(k, 'day and night, for years', 1240, 670, 'years', { size: 46 });
        const p = k.at('spacing', 1);
        [0, 1, 2].forEach((i) => k.char(1000 + i * 260, 1010, 110 + i * 40, { ...KID, face: 'happy', shadow: false, p: k.at(k.cue('spacing', i * 0.3), 0.4) }));
        k.arrow(1000, 770, 1520, 770, { stroke: P.orange, width: 5, p, seed: 2170 });
        note(k, 'births several years apart', 1260, 740, 'spacing', { size: 40, color: P.orange });
      },
    },

    // ---------------- Chapter 7: Today ----------------
    {
      chapter: 'And today?',
      say: "{now}Now look at today. {home}Many parents raise kids in a home with two adults, or just one, {far}often far from grandparents, {pay}and paying strangers for help. {pew}According to the Pew Research Center, fathers in the US now spend about eight hours a week on child care, {triple}roughly three times more than in 1965. {moms}Mothers: about fourteen. {start}Progress. The Aka might call it a start.",
      sfx: [['whoosh', 'now', 0.4], ['pop', 'far'], ['cash', 'pay', 0.4], ['pop', 'pew'], ['tada', 'triple', 0.3], ['boing', 'start', 0.3]],
      draw(k) {
        flat3am(k);
        chap(k, 'And today?', true);
        carry(k, 380, G + 30, 400, PARENT, { face: 'blank', awake: true, p: k.at('home', 0.5) });
        k.text('grandparents: 800 km away', 380, 200, { size: 44, font: 'title', color: '#d9d3e8', fx: 'fade', p: k.at('far', 0.5), outline: P.ink, outlineWidth: 8 });
        k.text('$$$ daycare', 380, 270, { size: 50, font: 'title', color: P.yellow, fx: 'pop', p: k.at('pay', 0.4), outline: P.ink, outlineWidth: 8 });
        k.group({ x: 0, y: 0 }, () => {
          k.rect(820, 120, 1000, 760, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 2180, p: k.at('pew', 0.5) });
          k.text('US CHILD CARE, HOURS / WEEK', 1320, 190, { size: 42, font: 'title', color: P.red, p: k.at('pew', 0.5) });
          const bars = [['DADS 1965', 2.5, P.stone, 'pew'], ['DADS 2016', 8, P.orange, 'triple'], ['MOMS 2016', 14, P.grass, 'moms']];
          bars.forEach(([l, v, c, cue], i) => {
            const y = 300 + i * 170, p = k.at(cue, 0.8);
            k.text(l, 1060, y + 40, { size: 38, font: 'title', align: 'right', color: P.ink, p: p > 0 ? 1 : 0 });
            k.rect(1090, y, 36 * v * p, 80, { fill: c, fillStyle: 'solid', width: 4, seed: 2181 + i });
            k.text(`~${v} h`, 1110 + 36 * v * p, y + 40, { size: 40, font: 'title', align: 'left', color: P.ink, p: p > 0.9 ? 1 : 0 });
          });
          note(k, 'Pew Research Center', 1320, 820, 'pew', { size: 34, color: '#6b5f55' });
        });
        k.text('PROGRESS. A START.', 1320, 990, { size: 64, font: 'title', color: P.yellow, fx: 'pop', p: k.at('start', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },
    {
      say: "{village}It takes a village to raise a child, people say. {proverb}It sounds like a proverb. {bio}Hrdy would say it's closer to biology. {built}For most of your species' history, babies were raised by many hands. {over}So if you're a parent who feels overwhelmed, {fail}that may not be a personal failure. {mis}It may be a mismatch, {old}between an ancient baby and a very new way of living.",
      sfx: [['pop', 'village'], ['ding', 'bio', 0.4], ['whoosh', 'built', 0.4], ['pop', 'fail'], ['sparkle', 'mis', 0.4]],
      draw(k) {
        paper(k);
        chap(k, 'And today?');
        k.text('"It takes a village"', 960, 160, { size: 80, font: 'title', color: P.ink, fx: 'write', p: k.at('village', 1.2, 'linear') });
        note(k, 'proverb?', 600, 260, 'proverb', { size: 50, color: '#6b5f55', fx: 'pop' });
        note(k, 'biology.', 1320, 260, 'bio', { size: 60, color: P.grass, fx: 'pop' });
        k.group({ a: 1 - k.at('over', 0.4) }, () => {
          k.prop('baby', 960, 600, 220, { awake: true, p: k.at('built', 0.5) });
          const helpers = [[GRAN, 520], [ANCW(), 740], [ANC(), 1180], [{ ...KID, body: 'kid' }, 1400]];
          helpers.forEach(([pr, x], i) => k.char(x, 860, i === 3 ? 220 : 330, { ...pr, face: 'happy', pose: 'hold', flip: x > 960, p: k.at(k.cue('built', 0.3 * i), 0.4) }));
        });
        k.group({ a: k.at('over', 0.4) }, () => {
          carry(k, 600, 920, 420, PARENT, { face: k.t > k.cue('mis') ? 'calm' : 'sad', cry: k.t < k.cue('mis') });
          k.text('NOT A FAILURE', 1300, 480, { size: 80, font: 'title', color: P.red, fx: 'pop', p: k.at('fail', 0.4), outline: '#fffaf0', outlineWidth: 12 });
          k.text('A MISMATCH', 1300, 620, { size: 100, font: 'title', color: P.grass, fx: 'pop', p: k.at('mis', 0.4), outline: '#fffaf0', outlineWidth: 14 });
          note(k, 'ancient baby · brand-new lifestyle', 1300, 740, 'old', { size: 46, color: P.brown });
        });
      },
    },

    // ---------------- Ending ----------------
    {
      chapter: 'Back to 3 a.m.',
      say: "{back}So, back to three a.m. {still}The baby is still crying. {past}But for most of human history, you wouldn't be alone. {gran}A grandmother would be awake by the fire. {aunt}An aunt would take a turn. {dad}A dad would be within arm's reach. {end}The crying was never the strange part. {alone}Being alone with it is.",
      sfx: [['whoosh', 'back', 0.4], ['whoosh', 'past', 0.4], ['pop', 'gran'], ['pop', 'aunt'], ['pop', 'dad'], ['ding', 'alone', 0.4]],
      draw(k) {
        const fire = k.at('past', 1);
        k.group({ a: 1 - fire }, () => {
          flat3am(k);
          carry(k, 960, G + 30, 460, PARENT, { face: 'sad', cry: true });
        });
        k.group({ a: fire }, () => {
          campNight(k, { fx: 960, fs: 220 });
          glow(k, 960, G - 100, 760, 0.4);
          k.char(560, G + 40, 340, { ...GRAN, face: 'happy', p: k.at('gran', 0.5) });
          carry(k, 820, G + 40, 360, ANCW(), { face: 'happy', p: k.at('aunt', 0.5), awake: k.t > k.cue('end') });
          k.char(1320, G + 40, 380, { ...ANC({ hair: 'short' }), face: 'happy', pose: 'wave', flip: true, p: k.at('dad', 0.5) });
          k.char(1560, G + 40, 220, { ...KID, face: 'sleep' });
        });
        k.text('the crying: normal', 960, 220, { size: 60, font: 'title', color: '#d9d3e8', fx: 'fade', p: k.at('end', 0.5), outline: P.ink, outlineWidth: 10 });
        k.text('being alone with it: new', 960, 320, { size: 72, font: 'title', color: P.yellow, fx: 'pop', p: k.at('alone', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },

    // ---------------- Recap ----------------
    {
      chapter: 'Recap',
      say: "{remind}Before the recap: remember that child in a cave in Borneo, who lost a leg and lived. That's next time. {t}Quick recap. {a}Raising one human child takes around thirteen million calories, more than one mother could gather. {b}Aka fathers are within arm's reach of their babies about half the time. {c}Efe babies were passed between many caregivers. {d}Hadza grandmothers help feed their grandkids. {e}And kids learned mostly by playing, watching, and doing.",
      sfx: [['ding', 'remind', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['pop', 'e']],
      draw(k) {
        k.group({ a: 1 - k.at('t', 0.4) }, () => {
          flat(k, '#2c2a3e', '#4a3f5e');
          k.prop('cave', 960, 560, 900);
          k.char(1060, G + 30, 260, { ...KID, skin: '#9a6b42', face: 'happy', prop: 'staff' });
          k.text('remember the child in Borneo', 960, 200, { size: 64, font: 'title', color: P.yellow, fx: 'pop', p: k.at(k.cue('remind', 0.4), 0.5), outline: P.ink, outlineWidth: 10 });
        });
        k.group({ a: k.at('t', 0.4) }, () => {
          paper(k);
          k.text('RECAP', 960, 110, { size: 80, font: 'title', color: P.red, p: k.at('t', 0.8, 'linear') });
          const rows = [['a', 'meat', '~13 million calories per child'], ['b', 'net', "Aka dads: arm's reach ~half the time"], ['c', 'baby', 'Efe babies: many caregivers'], ['d', 'tuber', 'Grandmothers help feed the kids'], ['e', 'berries', 'Kids learn by playing & doing']];
          rows.forEach(([c, prop, t], i) => {
            const y = 250 + i * 160;
            k.prop(prop, 300, y, 120, { p: k.at(c, 0.5), awake: true });
            k.text(t, 400, y, { size: 56, font: 'title', align: 'left', p: k.at(c, 1.4, 'linear'), color: P.ink });
          });
        });
      },
    },
    nextEpisodeScene({
      lang: 'en',
      say: "{next}Next episode: how did ancient humans survive without doctors? {hook}At least thirty-one thousand years ago, in a cave in Borneo, someone cut off a child's leg, {lived}and the child lived for years afterward. {when}Coming soon.",
      title: 'How Did Ancient Humans Survive Without Doctors?',
      hook: 'The child who lost a leg 31,000 years ago — and lived.',
      when: 'COMING SOON',
      art: (k) => {
        k.prop('cave', 0, 40, 520);
        k.prop('campfire', -150, 120, 110, { fire: 1 });
        k.char(140, 150, 220, { ...KID, skin: '#9a6b42', face: 'happy', prop: 'staff' });
      },
      sfx: [['sparkle', 'hook', 0.3]],
    }),
    subscribeScene({
      lang: 'en',
      say: "{q}Who helped raise you, besides your parents? A grandparent, an aunt, an older sibling? Put it in the comments. {sub}And subscribe, so you don't miss what happened next.",
      question: 'Who helped raise you?',
      channel: 'Long Story Drawn',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
