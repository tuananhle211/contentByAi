// Long Story Drawn — Ep 2: How Fire Made You Human (series "how your ancestors actually lived"; promised at the end of Ep 1)
// Fact check:
//  Hand drill (friction) fire-making: still used by San and Hadza in Africa.
//  Sorensen, Claud & Soressi 2018 (Scientific Reports): microwear on ~50,000-year-old Neanderthal bifaces from France consistent with striking pyrite for sparks; not universally accepted.
//  Wonderwerk Cave ~1 Mya burned bone + ash (Berna et al. 2012). Gesher Benot Ya'aqov, Israel, ~780,000 years: burned seeds/wood/flint (Goren-Inbar et al. 2004).
//  Zohar et al. 2022 (Nature Ecology & Evolution): carp teeth at GBY show enamel changed by low heat (<500 °C) → cooking; "earliest evidence of cooking fish".
//  Zhoukoudian ("Peking Man", Homo erectus): long claimed hearths; Weiner et al. 1998 (Science) found no ash/hearths — burned bones exist, control of fire debated.
//  Wrangham, "Catching Fire: How Cooking Made Us Human" (2009): cooking with Homo erectus ~1.8–2 Mya; smaller teeth/gut, bigger brain. Critics: little hard evidence of fire that early.
//  Organ et al. 2011 (PNAS): predicted feeding time for a primate our size ~48% of the day; modern humans ~4.7%. Chimps chew ~5–6 h/day (Wrangham).
//  Evenepoel et al. 1998: egg protein digestibility ~51% raw vs ~91% cooked.
//  Koebnick et al. 1999 (Giessen Raw Food study): ~30% of women under 45 on long-term raw diets had partial/complete amenorrhea; weight loss common.
//  Brain ≈2% body mass, ≈20% resting energy. Fonseca-Azevedo & Herculano-Houzel 2012 (PNAS): raw diet → >9 h/day feeding for a human-size neuron count.
//  Wiessner 2014 (PNAS) "Embers of society": Ju/'hoansi (San), Kalahari, recorded 1970s. Day: ~34% complaints/criticism/gossip, ~31% economic matters, 6% stories.
//    Night firelight: 81% stories (people in other camps, the spirit world, hunts…); calmer, more laughter. She argues stories build trust, spread social info, expand networks, train imagination.
//  Siegel et al. 2015: sleep onset ~3.3 h after sunset (tie-back to Ep 1, phrased as "may be one reason").
//  Next episode (Ep 3, food): greater honeyguide (Indicator indicator) leads Hadza and Yao honey-hunters to bee nests; Spottiswoode, Begg & Begg 2016 (Science):
//    the Yao "brrr-hm" call raised the chance of being guided from ~33% to ~66%. Also: what ancestors really ate vs the paleo diet.
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import { P, G, YOU, ANC, ANCW, ELDER, KID, SCI, flat, disc, ancient, savanna, night, paper, chap, big, note, redX, lying, zzz, card, campNight, glow } from '/channel/long-story-drawn.js';
import * as thumbs from '/videos/012-how-fire-made-you-human/thumbs.js';

const SAN = ANC({ hair: 'short', outfit: 'bare', color: '#9a6b42' });
const WRANGHAM = SCI({ hat: undefined, color: '#5a6b8a', color2: '#c9a24a', hair: 'short', hairColor: '#b9b4ab' });
const WIESSNER = { body: 'woman', outfit: 'dress', color: '#4E9A45', color2: P.yellow, hair: 'bun', hairColor: '#c9c4bb' };

// Thanh tỉ lệ ngang: parts = [[tỉ lệ, màu, nhãn]], vẽ dần theo cue.
function bar(k, x, y, w, h, parts, cue, o = {}) {
  let acc = 0;
  parts.forEach(([f, color, label], i) => {
    const p = k.at(typeof cue === 'string' ? k.cue(cue, i * 0.5) : cue + i * 0.5, 0.6);
    k.rect(x + w * acc, y, w * f, h, { fill: color, fillStyle: 'solid', width: 4, p, seed: (o.seed ?? 1200) + i });
    if (label) k.text(label, x + w * (acc + f / 2), y + h / 2, { size: o.size ?? 34, font: 'title', color: o.labelColor ?? '#fff', p: p > 0.5 ? 1 : 0, maxWidth: w * f - 10, outline: P.ink, outlineWidth: 6 });
    acc += f;
  });
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    title: 'How Fire Made You Human',
    description: `The sun goes down, it gets cold, and someone strikes a spark. For your ancestors, that moment changed everything — what they ate, how their bodies worked, and even what they talked about.
How did ancient humans make fire without matches? When did they start cooking? Did cooking really help grow your brain? And why did firelight turn daytime gossip into nighttime stories? Episode 2 of "How your ancestors actually lived".`,
    footer: `📚 Sources: Wiessner (2014, PNAS) — "Embers of society: Firelight talk among the Ju/'hoansi Bushmen"; Wrangham, "Catching Fire: How Cooking Made Us Human" (2009); Organ et al. (2011, PNAS) — feeding time; Evenepoel et al. (1998) — raw vs cooked egg protein; Koebnick et al. (1999) — the Giessen Raw Food study; Fonseca-Azevedo & Herculano-Houzel (2012, PNAS) — brain energy and raw diets; Sorensen, Claud & Soressi (2018, Scientific Reports) — Neanderthal fire-making; Zohar et al. (2022, Nature Ecology & Evolution) — cooked fish at Gesher Benot Ya'aqov; Weiner et al. (1998, Science) — Zhoukoudian; Berna et al. (2012, PNAS) — Wonderwerk Cave.
🔥 Previous episode: How Did Ancient Humans Actually Sleep? Next: What Did Ancient Humans Actually Eat?`,
    tags: ['how fire made us human', 'how did ancient humans make fire', 'cooking hypothesis', 'catching fire wrangham', 'when did humans start cooking', 'ancient humans', 'human evolution', 'prehistory', 'anthropology', 'hunter gatherers', 'homo erectus', 'neanderthal fire', 'peking man', 'firelight stories', 'polly wiessner', 'evolution of the human brain', 'stone age', 'early humans', 'prehistoric cooking', 'history of fire', 'animated history', 'history explained', 'how people lived', 'long story drawn'],
    hashtags: ['ancienthumans', 'history', 'evolution'],
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
      say: "{dark}The sun goes down. {cold}It gets cold, fast. {spark}Then someone strikes a spark, {flame}and the night changes. {warm}Suddenly there's light, warmth, and food that smells incredible. {story}And somebody says: did I ever tell you about the time…",
      sfx: [['slideDown', 'dark', 0.3], ['click', 'spark', 0.6], ['whoosh', 'flame', 0.5], ['sparkle', 'warm', 0.3]],
      draw(k) {
        campNight(k, { fx: 960, fs: 300, fire: k.at('flame', 1.2) });
        k.char(560, G + 40, 380, { ...ELDER, face: k.t > k.cue('story') ? 'happy' : 'calm', pose: k.t > k.cue('story') ? 'present' : 'stand' });
        k.char(1340, G + 40, 380, { ...ANC(), face: k.t > k.cue('warm') ? 'happy' : 'sad', flip: true });
        k.char(1600, G + 40, 280, { ...KID, face: k.t > k.cue('story') ? 'shock' : 'calm', flip: true });
        k.prop('meat', 1100, G - 120, 110, { p: k.at('warm', 0.5), rotate: -0.4 });
        glow(k, 960, G - 100, 300 + 600 * k.at('flame', 1.2), 0.75 - 0.25 * k.at('flame', 1.2));
        k.burst(980, 560, 60, '', { p: k.at('spark', 0.3) * (1 - k.at(k.cue('spark', 0.4), 0.3)), fill: P.yellow });
        k.bubble(300, 220, 620, 150, 520, 560, { p: k.at('story', 0.4), text: 'Did I ever tell you…', size: 46 });
      },
    },
    {
      say: "{last}Last episode, a grandmother kept watch by the fire while the camp slept. {today}Today: what that fire actually did to you. {claim}Some scientists think it changed your teeth, {gut}your gut, {brain}your brain, {talk}and even the way you talk. {q}So did fire really make you human?",
      sfx: [['pop', 'claim'], ['pop', 'gut'], ['pop', 'brain'], ['pop', 'talk'], ['boing', 'q', 0.3]],
      draw(k) {
        paper(k);
        k.char(420, 860, 420, { ...ELDER, face: 'smug', prop: 'staff', p: k.at('last', 0.5) });
        note(k, 'Episode 1: the night guard', 420, 300, 'last', { size: 44, color: '#6b5f55' });
        k.prop('campfire', 960, 520, 260, { p: k.at('today', 0.5) });
        const items = [['claim', 'TEETH'], ['gut', 'GUT'], ['brain', 'BRAIN'], ['talk', 'TALK']];
        items.forEach(([c, t], i) => note(k, t, 1500, 260 + i * 120, c, { size: 64, color: P.red, fx: 'pop' }));
        k.icon('brain', 1760, 500, 130, { p: k.at('brain', 0.5) });
        k.text('DID FIRE MAKE YOU HUMAN?', 1060, 980, { size: 72, font: 'title', color: P.ink, fx: 'pop', p: k.at('q', 0.5), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{series}This is episode two of a series on how your ancestors actually lived. {sub}If you're new, subscribing costs nothing, and it's warmer than a cave. {plan}Today: {a}how to start a fire with no matches, {b}the oldest kitchens on Earth, {c}a bold idea about cooking and your brain, {d}and what people talk about after the sun goes down.",
      sfx: [['pop', 'sub', 0.5], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd']],
      draw(k) {
        paper(k);
        note(k, 'HOW YOUR ANCESTORS ACTUALLY LIVED', 960, 120, 'series', { size: 58, color: P.brown });
        note(k, 'Episode 2', 960, 200, 'series', { size: 44, color: P.red });
        const items = [['a', 'NO MATCHES', 'firedrill'], ['b', 'OLDEST KITCHEN', 'fish'], ['c', 'COOKING & BRAIN', 'meat'], ['d', 'NIGHT TALK', 'campfire']];
        items.forEach(([c, t, prop], i) => {
          const x = 300 + i * 440, p = k.at(c, 0.5);
          k.group({ x, y: 560, r: i % 2 ? 0.03 : -0.03, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-180, -200, 360, 400, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 1230 + i });
            k.prop(prop, 0, -40, 200, { fire: 1, smoke: 1 });
            k.text(t, 0, 140, { size: 44, font: 'title', color: P.red, maxWidth: 330 });
          });
        });
        k.char(1760, 1060, 300, { ...YOU, face: 'happy', pose: 'wave', p: k.at('sub', 0.5) });
      },
    },

    // ---------------- Chapter 1: No matches ----------------
    {
      chapter: 'No matches',
      say: "{q}First problem: how do you start a fire without a lighter? {drill}One answer is still used today by San and Hadza hunters in Africa: the hand drill. {spin}You spin a wooden stick between your palms, pressing it into a softer piece of wood. {smoke}Friction heats it up, until a tiny glowing ember forms in the wood dust. {ember}You tip that ember into dry grass, {blow}and blow. Gently.",
      sfx: [['pop', 'drill'], ['scratch', 'spin', 0.4], ['scratch', ['spin', 1.5], 0.4], ['sparkle', 'ember', 0.4], ['whoosh', 'blow', 0.4]],
      draw(k) {
        chap(k, 'No matches');
        savanna(k, { trees: [[1700, 380]] });
        k.char(620, G + 30, 460, { ...SAN, face: k.t > k.cue('blow') ? 'happy' : 'calm', pose: { l: [40, -80], r: [40, -80] }, p: k.at('drill', 0.5) });
        k.prop('firedrill', 620, G - 30, 260, { p: k.at('spin', 0.5), smoke: k.at('smoke', 1), ember: k.t > k.cue('ember') });
        note(k, 'HAND DRILL', 620, 260, 'drill', { size: 70, color: P.red, fx: 'pop' });
        note(k, 'spin + press = friction', 620, 340, 'spin', { size: 44 });
        k.prop('grassbed', 1180, G - 20, 220, { p: k.at('ember', 0.5) });
        k.prop('campfire', 1180, G - 70, 200, { p: k.at('blow', 0.5), fire: k.at('blow', 2) });
        k.motion(1000, G - 80, 120, 0, { p: k.at('blow', 0.4), n: 3, len: 60 });
      },
    },
    {
      say: "{easy}It sounds easy. {not}It is not. {palms}A beginner can spin for many minutes and get nothing but sore palms and a little smoke. {pro}Experienced fire-makers can get an ember in well under a minute. {you}You, meanwhile, get annoyed when a lighter needs two clicks.",
      sfx: [['bonk', 'not', 0.4], ['wahwah', 'palms', 0.3], ['ding', 'pro', 0.4], ['click', 'you', 0.6], ['click', ['you', 0.4], 0.6]],
      draw(k) {
        chap(k, 'No matches');
        paper(k);
        k.line(960, 160, 960, 940, { stroke: '#cfc6b8', width: 4, seed: 1240 });
        note(k, 'BEGINNER', 480, 160, 'palms', { size: 64, color: P.brown, fx: 'pop' });
        note(k, 'EXPERT', 1440, 160, 'pro', { size: 64, color: P.brown, fx: 'pop' });
        k.char(480, 880, 420, { ...YOU, face: 'sad', pose: { l: [40, -80], r: [40, -80] }, p: k.at('palms', 0.5) });
        k.prop('firedrill', 480, 830, 220, { p: k.at('palms', 0.5), smoke: 0.3 });
        k.sweat(560, 520, 1.4, { p: k.at(k.cue('palms', 1), 0.4) });
        note(k, '20 minutes…', 480, 960, k.cue('palms', 0.8), { size: 46, color: '#6b5f55' });
        k.char(1440, 880, 420, { ...SAN, face: 'smug', pose: { l: [40, -80], r: [40, -80] }, p: k.at('pro', 0.5) });
        k.prop('firedrill', 1440, 830, 220, { p: k.at('pro', 0.5), smoke: 1, ember: true });
        note(k, '< 1 minute', 1440, 960, k.cue('pro', 0.5), { size: 46, color: P.grass });
        k.group({ a: k.at('you', 0.3) }, () => {
          paper(k);
          k.char(960, 900, 460, { ...YOU, face: 'angry', pose: 'hold' });
          k.text('click… click…', 960, 320, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('you', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        });
      },
    },
    {
      say: "{neander}Neanderthals may have had another trick. {sor}In 2018, archaeologist Andrew Sorensen and his colleagues studied stone hand axes from sites in France, about fifty thousand years old. {marks}They found tiny scratch marks that look just like the ones you get from striking a mineral called pyrite to throw sparks. {spark}Strike. Spark. Tinder. {lighter}A Stone Age lighter. {debate}Not everyone is convinced. But it's a striking idea.",
      sfx: [['pop', 'sor'], ['scratch', 'marks', 0.4], ['click', 'spark', 0.6], ['sparkle', ['spark', 0.4], 0.4], ['ding', 'lighter', 0.4], ['boing', 'debate', 0.3]],
      draw(k) {
        chap(k, 'No matches');
        ancient(k, { tree: false, sx: 1700, sy: 220 });
        k.char(420, G + 30, 480, { body: 'big', outfit: 'bare', color: '#8a6a4a', color2: '#6b4a33', hair: 'long', hairColor: '#5a3a24', skin: '#e0b48c', face: k.t > k.cue('lighter') ? 'smug' : 'calm', pose: 'hold', p: k.at('neander', 0.5) });
        note(k, 'NEANDERTHAL', 420, 250, 'neander', { size: 60, color: P.ink, fx: 'pop' });
        card(k, 1100, 230, ['SORENSEN ET AL., 2018', 'France · ~50,000 years'], 'sor', { w: 620 });
        k.prop('handaxe', 900, 600, 240, { p: k.at('marks', 0.5), rotate: 0.4 });
        k.prop('rock', 1280, 640, 200, { p: k.at('marks', 0.5), sparkle: true, fill: '#a8975e' });
        note(k, 'pyrite', 1280, 760, 'marks', { size: 44, color: P.brown });
        k.burst(1090, 600, 70, '', { p: k.at('spark', 0.3) * (1 - k.at(k.cue('spark', 0.5), 0.3)), fill: P.yellow });
        k.text('STONE AGE LIGHTER', 1100, 920, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('lighter', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.text('(debated)', 1100, 1000, { size: 40, font: 'title', color: '#6b5f55', fx: 'fade', p: k.at('debate', 0.4) });
      },
    },

    // ---------------- Chapter 2: The oldest kitchens ----------------
    {
      chapter: 'The oldest kitchens',
      say: "{q}So when did your ancestors start cooking? {wonder}You met Wonderwerk Cave last time: burned bone and plant ash, about one million years old. {gby}Then there's Gesher Benot Ya'aqov, a site in Israel, almost eight hundred thousand years old. {burned}Archaeologists found burned seeds, wood, and flint, {clusters}gathered in clusters, as if around hearths.",
      sfx: [['pop', 'wonder'], ['pop', 'gby'], ['pop', 'burned'], ['ding', 'clusters', 0.4]],
      draw(k) {
        chap(k, 'The oldest kitchens');
        paper(k);
        // dòng thời gian
        const y = 520, x0 = 200, x1 = 1720;
        k.arrow(x0, y, x1, y, { stroke: P.ink, width: 6, p: k.at('q', 1.2), seed: 1250 });
        note(k, '1,000,000 years ago', 520, y + 60, 'wonder', { size: 40 });
        note(k, '780,000', 1000, y + 60, 'gby', { size: 40 });
        note(k, 'today', 1680, y + 60, 'q', { size: 40, color: '#6b5f55' });
        k.dot(520, y, 16, P.red, k.at('wonder', 0.4)); k.dot(1000, y, 16, P.red, k.at('gby', 0.4));
        card(k, 440, 300, ['WONDERWERK CAVE', 'South Africa'], 'wonder', { w: 520 });
        card(k, 1240, 300, ['GESHER BENOT YA\'AQOV', 'Israel'], 'gby', { w: 640, r: 0.02, seed: 1251 });
        const items = [['burned', 'seeds'], [k.cue('burned', 0.5), 'wood'], [k.cue('burned', 1), 'flint']];
        items.forEach(([c, t], i) => { k.prop(i === 2 ? 'rock' : i === 1 ? 'campfire' : 'grassbed', 760 + i * 240, 800, 140, { p: k.at(c, 0.5), fire: 0.15, fill: '#5a5a5a' }); note(k, t, 760 + i * 240, 900, c, { size: 40 }); });
        k.ellipse(1000, 810, 820, 240, { stroke: P.red, width: 6, p: k.at('clusters', 0.8), seed: 1252 });
      },
    },
    {
      say: "{fish}In 2022, researchers looked closely at fish teeth from that site. {heat}The enamel had been changed by heat, but not scorched. {cooked}The kind of gentle heat you get from cooking, not from tossing a fish into the flames. {oldest}It may be the oldest evidence of cooked fish ever found. {joke}Nearly eight hundred thousand years old. And honestly, still better than gas station sushi.",
      sfx: [['pop', 'fish'], ['sparkle', 'heat', 0.4], ['ding', 'oldest', 0.4], ['wahwah', 'joke', 0.3]],
      draw(k) {
        chap(k, 'The oldest kitchens');
        ancient(k, { tree: false, sx: 1700, sy: 200 });
        k.water(G - 10, { color: '#7FB5D5', amp: 6, alpha: 0.9 });
        k.prop('campfire', 760, G - 80, 260, { fire: 0.7 });
        k.group({ x: 760, y: G - 280, r: Math.sin((k.gt ?? 0) * 2) * 0.05 }, () => k.prop('fish', 0, 0, 220, { p: k.at('fish', 0.5), fill: k.t > k.cue('cooked') ? '#c9813a' : '#9fb7a0' }));
        k.char(400, G + 30, 400, { ...ANCW(), face: 'happy', pose: 'present' });
        card(k, 1360, 260, ['ZOHAR ET AL., 2022', 'carp teeth · low heat'], 'fish', { w: 580 });
        note(k, 'cooked, not burned', 1360, 460, 'cooked', { size: 54, color: P.red, fx: 'pop' });
        big(k, 'OLDEST COOKED FISH?', 1360, 600, 'oldest', { size: 64 });
        k.text('vs gas station sushi', 1360, 720, { size: 44, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 8 });
      },
    },
    {
      say: "{asia}Now, a twist from Asia. {peking}For decades, textbooks said that Peking Man, a Homo erectus who lived in Zhoukoudian cave near Beijing, kept fires burning in that cave. {layers}There were thick, dark layers that looked like ash. {1998}But in 1998, a team re-analyzed those layers, {notash}and found they weren't really ash at all. {open}Burned bones are there. But whether people controlled that fire is still argued about. {lesson}Lesson: in archaeology, smoke doesn't always mean fire.",
      sfx: [['scratch', 'asia', 0.4], ['pop', 'peking'], ['pop', '1998'], ['bonk', 'notash', 0.4], ['ding', 'lesson', 0.4]],
      draw(k) {
        chap(k, 'The oldest kitchens');
        ancient(k, { tree: false, sx: 1720, sy: 200 });
        k.prop('cave', 620, G - 260, 760);
        k.char(1060, G + 30, 440, { ...ANC({ body: 'big', hair: 'short' }), face: 'blank', p: k.at('peking', 0.5) });
        card(k, 1540, 240, ['ZHOUKOUDIAN', 'near Beijing, China', '"Peking Man"'], 'peking', { w: 520 });
        // lớp "tro" trong hang
        for (let i = 0; i < 3; i++) k.rect(440, G - 70 + i * 24, 360, 18, { fill: i % 2 ? '#4a4038' : '#6a5e52', fillStyle: 'solid', stroke: 'none', p: k.at('layers', 0.6), seed: 1260 + i });
        note(k, '"ASH"?', 620, G - 160, 'layers', { size: 54, color: '#fff3c4', outline: P.ink, fx: 'pop' });
        redX(k, 620, G - 40, 110, 'notash');
        card(k, 1540, 560, ['WEINER ET AL., 1998', 'not ash · still debated'], '1998', { w: 520, r: 0.02, seed: 1261 });
        k.text('smoke ≠ fire', 960, 1000, { size: 60, font: 'title', color: P.red, fx: 'pop', p: k.at('lesson', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 3: The cooking hypothesis ----------------
    {
      chapter: 'The cooking hypothesis',
      say: "{bold}Here's where it gets bold. {wrangham}Harvard primatologist Richard Wrangham has a famous idea, laid out in his 2009 book, Catching Fire. {tasty}Cooking didn't just make food tasty. {human}It made you human.",
      sfx: [['drumroll', 'bold', 0.3], ['pop', 'wrangham'], ['tada', 'human', 0.5]],
      draw(k) {
        chap(k, 'The cooking hypothesis');
        paper(k);
        k.char(560, 880, 460, { ...WRANGHAM, face: k.t > k.cue('human') ? 'smug' : 'calm', pose: k.t > k.cue('tasty') ? 'present' : 'stand', p: k.at('wrangham', 0.5) });
        card(k, 560, 220, ['RICHARD WRANGHAM', 'Harvard · primatologist'], 'wrangham', { w: 580 });
        // bìa sách
        const p = k.at(k.cue('wrangham', 1), 0.5);
        k.group({ x: 1300, y: 480, r: 0.04, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
          k.rect(-200, -270, 400, 540, { fill: '#2b2f3d', fillStyle: 'solid', width: 6, seed: 1270 });
          k.prop('campfire', 0, 40, 220);
          k.text('CATCHING', 0, -190, { size: 56, font: 'title', color: P.orange });
          k.text('FIRE', 0, -120, { size: 70, font: 'title', color: P.yellow });
          k.text('2009', 0, 210, { size: 40, font: 'title', color: '#d9d3e8' });
        });
        k.text('COOKING MADE YOU HUMAN?', 960, 960, { size: 72, font: 'title', color: P.red, fx: 'pop', p: k.at('human', 0.5), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{chew}Start with chewing. {chimp}A chimpanzee spends five hours or more a day just chewing. {organ}A 2011 study estimated that a primate your size should spend almost half of its day eating. {you}You spend less than five percent. {snack}Even if you count snacks. {maybe}Okay. Maybe not if you count snacks.",
      sfx: [['pop', 'chimp'], ['pop', 'organ'], ['tada', 'you', 0.4], ['boing', 'maybe', 0.3]],
      draw(k) {
        chap(k, 'The cooking hypothesis');
        paper(k);
        k.prop('chimp', 380, 520, 300, { p: k.at('chimp', 0.5) });
        note(k, '5+ hours chewing / day', 380, 760, 'chimp', { size: 46 });
        card(k, 1000, 200, ['ORGAN ET AL., 2011', 'PNAS'], 'organ', { w: 480 });
        // hai thanh so sánh
        const y1 = 420, y2 = 640, x0 = 760, w = 900;
        note(k, 'expected', 900, y1 - 50, 'organ', { size: 40, color: '#6b5f55' });
        k.rect(x0, y1, w * 0.48 * k.at(k.cue('organ', 0.4), 1.2), 90, { fill: P.orange, fillStyle: 'solid', width: 4, p: k.at('organ', 0.3), seed: 1280 });
        note(k, '48%', x0 + w * 0.48 + 90, y1 + 45, k.cue('organ', 1.4), { size: 60, color: P.orange, fx: 'pop' });
        note(k, 'you', 840, y2 - 50, 'you', { size: 40, color: '#6b5f55' });
        k.rect(x0, y2, w * 0.047 * k.at('you', 0.6), 90, { fill: P.grass, fillStyle: 'solid', width: 4, p: k.at('you', 0.3), seed: 1281 });
        note(k, '< 5%', x0 + 160, y2 + 45, k.cue('you', 0.5), { size: 60, color: P.grass, fx: 'pop' });
        k.char(1500, 1040, 300, { ...YOU, face: k.t > k.cue('maybe') ? 'blank' : 'smug', pose: k.t > k.cue('maybe') ? 'shrug' : 'hips', p: k.at('snack', 0.4) });
        k.prop('meat', 1680, 860, 100, { p: k.at('maybe', 0.4), rotate: 0.4 });
      },
    },
    {
      say: "{unlock}Cooking unlocks energy. {raw}Your body digests only about half of the protein in a raw egg. {cooked}Cook it, and that jumps to around ninety percent. {soft}Heat softens meat, {starch}bursts the starch in roots, {germs}and kills a lot of germs. {same}Same food. {fuel}More fuel. {less}Less work.",
      sfx: [['pop', 'raw'], ['tada', 'cooked', 0.4], ['pop', 'soft'], ['pop', 'starch'], ['pop', 'germs'], ['ding', 'less', 0.4]],
      draw(k) {
        chap(k, 'The cooking hypothesis');
        paper(k);
        k.prop('egg', 480, 380, 220, { p: k.at('raw', 0.5) });
        note(k, 'RAW', 480, 220, 'raw', { size: 56, color: P.brown, fx: 'pop' });
        big(k, '~51%', 480, 560, 'raw', { size: 100, color: P.orange });
        k.arrow(700, 420, 1180, 420, { stroke: P.red, width: 8, p: k.at('cooked', 0.5), seed: 1290, head: 30 });
        k.prop('campfire', 940, 520, 140, { p: k.at('cooked', 0.4) });
        // trứng ốp
        const p = k.at('cooked', 0.5);
        k.group({ x: 1440, y: 380, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
          k.ellipse(0, 0, 260, 190, { fill: '#ffffff', fillStyle: 'solid', width: 5, seed: 1291 });
          k.circle(10, -6, 50, { fill: P.yellow, fillStyle: 'solid', width: 4, seed: 1292 });
        });
        note(k, 'COOKED', 1440, 220, 'cooked', { size: 56, color: P.brown, fx: 'pop' });
        big(k, '~91%', 1440, 560, 'cooked', { size: 100, color: P.grass });
        note(k, 'protein digested', 960, 660, 'cooked', { size: 42, color: '#6b5f55' });
        const items = [['soft', 'softer meat'], ['starch', 'starch unlocked'], ['germs', 'fewer germs']];
        items.forEach(([c, t], i) => { k.icon('check', 420 + i * 540, 820, 80, { p: k.at(c, 0.4) }); note(k, t, 420 + i * 540 + 170, 820, c, { size: 44 }); });
        k.text('SAME FOOD · MORE FUEL · LESS WORK', 960, 980, { size: 58, font: 'title', color: P.red, p: k.at('same', 2.4, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{test}And here's a strange real-world test. {germany}In a 1999 study of people in Germany who ate mostly raw food for years, {weight}many lost a lot of weight, {third}and nearly a third of the women under forty-five stopped having regular periods. {energy}Their bodies just weren't getting enough energy. {nosoc}Wrangham points out that no known human society lives on raw food. {likes}You're not just a primate who likes cooking. {needs}You might be a primate who needs it.",
      sfx: [['pop', 'germany'], ['slideDown', 'weight', 0.3], ['bonk', 'energy', 0.3], ['ding', 'needs', 0.4]],
      draw(k) {
        chap(k, 'The cooking hypothesis');
        paper(k);
        card(k, 520, 220, ['GIESSEN RAW FOOD STUDY', 'Germany · 1999'], 'germany', { w: 620 });
        k.char(260, 900, 380, { ...YOU, color: '#7FB5D5', color2: P.grass, face: k.t > k.cue('energy') ? 'sad' : 'calm', hat: undefined, p: k.at('germany', 0.5) });
        note(k, 'weight loss', 1000, 440, 'weight', { size: 48, color: P.brown });
        big(k, '~1 in 3', 1000, 560, 'third', { size: 90 });
        note(k, 'women under 45: periods stopped or irregular', 1000, 660, 'third', { size: 38, color: '#6b5f55' });
        k.icon('cross', 1560, 480, 120, { p: k.at('energy', 0.4) });
        note(k, 'not enough energy', 1560, 600, 'energy', { size: 42, color: P.red });
        k.text('No known society lives on raw food.', 960, 820, { size: 54, font: 'title', color: P.ink, p: k.at('nosoc', 1.6, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        k.text('LIKES COOKING → NEEDS COOKING', 960, 960, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at('needs', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{brain}Now, the brain. {two}It's about two percent of your body weight, {twenty}but it burns around twenty percent of your energy. {hh}Neuroscientist Suzana Herculano-Houzel and her colleague calculated that to fuel a brain with as many neurons as yours on raw food, an ape would need to eat for more than nine hours a day. {bill}Cooking, the argument goes, paid the bill. {gut}As food got easier, the gut could shrink, {grow}and the brain could grow.",
      sfx: [['pop', 'two'], ['pop', 'twenty'], ['pop', 'hh'], ['cash', 'bill', 0.4], ['slideDown', 'gut', 0.3], ['slideUp', 'grow', 0.3]],
      draw(k) {
        chap(k, 'The cooking hypothesis');
        paper(k);
        const gs = 1 + 0.35 * k.at('grow', 1.2, 'inOut');
        k.icon('brain', 420, 420, 220 * gs, { p: k.at('brain', 0.5) });
        note(k, '2% of weight', 420, 660, 'two', { size: 50 });
        big(k, '20% of energy', 420, 760, 'twenty', { size: 70 });
        card(k, 1260, 220, ['FONSECA-AZEVEDO &', 'HERCULANO-HOUZEL, 2012'], 'hh', { w: 640 });
        k.icon('clock', 1100, 470, 140, { p: k.at(k.cue('hh', 2), 0.5) });
        big(k, '9+ HOURS', 1400, 470, k.cue('hh', 2.4), { size: 90, color: P.orange });
        note(k, 'of eating raw food, every day', 1300, 580, k.cue('hh', 2.6), { size: 40, color: '#6b5f55' });
        k.text('COOKING PAID THE BILL', 1300, 720, { size: 60, font: 'title', color: P.grass, fx: 'pop', p: k.at('bill', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        note(k, 'gut ↓', 1150, 880, 'gut', { size: 70, color: P.brown, fx: 'pop' });
        note(k, 'brain ↑', 1450, 880, 'grow', { size: 70, color: P.red, fx: 'pop' });
      },
    },

    // ---------------- Chapter 4: Is it true? ----------------
    {
      chapter: 'Is it true?',
      say: "{closed}So, case closed? {not}Not quite. {timing}Wrangham argues that cooking began close to two million years ago, with Homo erectus, {why}because that's when teeth and guts got smaller and brains got bigger. {problem}The problem: solid evidence of controlled fire that old is very hard to find. {meat}Many researchers think meat and stone tools came first, {later}and cooking joined the party later. {honest}The honest answer? Fire clearly mattered. {hot}Exactly when it changed your body is still a hot debate.",
      sfx: [['scratch', 'not', 0.4], ['pop', 'timing'], ['bonk', 'problem', 0.3], ['pop', 'meat'], ['boing', 'hot', 0.3]],
      draw(k) {
        chap(k, 'Is it true?');
        paper(k);
        k.text('CASE CLOSED?', 960, 140, { size: 90, font: 'title', color: P.ink, fx: 'pop', p: k.at('closed', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        redX(k, 960, 140, 90, 'not');
        const y = 560, x0 = 200, x1 = 1720;
        k.arrow(x0, y, x1, y, { stroke: P.ink, width: 6, p: k.at('timing', 1), seed: 1300 });
        note(k, '2 million years ago', 400, y + 60, 'timing', { size: 38 });
        note(k, '1 million', 960, y + 60, 'timing', { size: 38 });
        note(k, 'today', 1660, y + 60, 'timing', { size: 38, color: '#6b5f55' });
        k.char(400, y - 20, 240, { ...ANC({ body: 'big' }), face: 'calm', p: k.at('timing', 0.5) });
        note(k, 'Wrangham: cooking here?', 400, 300, 'why', { size: 40, color: P.orange });
        k.rect(380, y - 6, 560, 12, { fill: P.red, fillStyle: 'solid', stroke: 'none', p: k.at('problem', 0.6), seed: 1301 });
        note(k, 'little hard evidence of fire', 660, y + 120, 'problem', { size: 40, color: P.red });
        k.prop('campfire', 960, y - 80, 110, { p: k.at('problem', 0.5) });
        k.prop('meat', 240, 820, 140, { p: k.at('meat', 0.5), raw: true });
        k.prop('handaxe', 400, 820, 120, { p: k.at('meat', 0.5) });
        note(k, 'meat + tools first?', 320, 940, 'meat', { size: 42 });
        k.text('FIRE MATTERED. WHEN? STILL A HOT DEBATE.', 1160, 880, { size: 52, font: 'title', color: P.red, maxWidth: 1100, p: k.at('honest', 2.5, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    // vòng mở → tập 3
    {
      say: "{food}Of course, cooking only works if you have something to cook. {honey}And one of the richest foods your ancestors could find came with a guide. {bird}A wild bird that leads people to honey, {call}and comes when it's called. {next}That one is next episode. {back}Now, back to the fire.",
      sfx: [['pop', 'honey'], ['sparkle', 'bird', 0.4], ['ding', 'call', 0.4], ['whoosh', 'back', 0.4]],
      draw(k) {
        savanna(k, { trees: [[1500, 520]] });
        k.prop('beehive', 1540, 330, 200, { p: k.at('honey', 0.5) });
        const fx = k.lerp(600, 1300, k.at('bird', 3, 'inOut'));
        k.prop('bird', fx, 260 + Math.sin((k.gt ?? 0) * 3) * 20, 130, { p: k.at('bird', 0.5), fly: true });
        k.char(420, G + 30, 420, { ...ANC({ hair: 'short' }), face: k.t > k.cue('call') ? 'happy' : 'shock', pose: k.t > k.cue('call') ? 'shout' : 'point', p: k.at('food', 0.5) });
        k.bubble(120, 260, 420, 130, 360, 520, { p: k.at('call', 0.4), text: 'brrr-hm!', size: 54 });
        k.text('NEXT EPISODE →', 960, 1000, { size: 56, font: 'title', color: P.red, fx: 'pop', p: k.at('next', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 5: Firelight talk ----------------
    {
      chapter: 'Firelight talk',
      say: "{longer}Fire did one more thing. It made the day longer. {before}Before fire, the night was for sleeping, and hiding. {after}After fire, you had a few extra hours of light, with nothing to hunt and nothing to gather. {q}So what do you do with that time?",
      sfx: [['whoosh', 'longer', 0.4], ['slideDown', 'before', 0.3], ['sparkle', 'after', 0.3], ['boing', 'q', 0.3]],
      draw(k) {
        chap(k, 'Firelight talk', true);
        const on = k.at('after', 1);
        campNight(k, { fx: 960, fs: 260, fire: on });
        lying(k, 700, G + 80, 260, ANC(), { a: 1 - on });
        k.glowEyes(1600, 720, 0.9, '#ffe066', { p: 1 - on });
        k.group({ a: on }, () => {
          k.char(600, G + 40, 360, { ...ELDER, face: 'calm' });
          k.char(1320, G + 40, 360, { ...ANCW(), face: 'calm', flip: true });
          k.char(1560, G + 40, 280, { ...KID, face: 'happy', flip: true });
        });
        glow(k, 960, G - 100, 300 + 600 * on, 0.7 - 0.25 * on);
        k.text('+ a few hours of light', 960, 240, { size: 60, font: 'title', color: P.yellow, fx: 'pop', p: k.at('after', 0.5), outline: P.ink, outlineWidth: 10 });
        k.icon('question', 960, 420, 150, { p: k.at('q', 0.5), stroke: P.yellow });
      },
    },
    {
      say: "{wiessner}Anthropologist Polly Wiessner recorded conversations among the San people of the Kalahari, back in the 1970s. {pub}In 2014 she published the analysis, {split}comparing what people talked about during the day, {night}with what they talked about at night, by the fire.",
      sfx: [['pop', 'wiessner'], ['pop', 'pub'], ['pop', 'split'], ['pop', 'night']],
      draw(k) {
        chap(k, 'Firelight talk');
        paper(k);
        k.char(480, 960, 460, { ...WIESSNER, face: 'happy', pose: 'hold', prop: 'scroll', p: k.at('wiessner', 0.5) });
        card(k, 480, 230, ['POLLY WIESSNER', 'Ju/\'hoansi (San) · 1970s'], 'wiessner', { w: 600 });
        card(k, 1340, 220, ['WIESSNER, 2014', 'PNAS · "Embers of society"'], 'pub', { w: 620, r: 0.02, seed: 1310 });
        k.rect(1000, 380, 330, 400, { fill: P.sky2, fillStyle: 'solid', width: 5, p: k.at('split', 0.5), seed: 1311 });
        k.icon('sun', 1165, 520, 140, { p: k.at('split', 0.5) });
        note(k, 'DAY', 1165, 700, 'split', { size: 60, color: P.ink, fx: 'pop' });
        k.rect(1360, 380, 330, 400, { fill: P.indigo, fillStyle: 'solid', width: 5, p: k.at('night', 0.5), seed: 1312 });
        k.prop('campfire', 1525, 520, 150, { p: k.at('night', 0.5) });
        note(k, 'NIGHT', 1525, 700, 'night', { size: 60, color: P.yellow, outline: P.ink, fx: 'pop' });
      },
    },
    {
      say: "{day}During the day, about a third of conversations were complaints, criticism, and gossip. {econ}Another third was practical business: land, food, who owes what to whom. {stories}Stories? Just six percent. {joke}So, basically, an office.",
      sfx: [['pop', 'day'], ['pop', 'econ'], ['pop', 'stories'], ['wahwah', 'joke', 0.3]],
      draw(k) {
        chap(k, 'Firelight talk');
        flat(k, P.sky, P.sand);
        disc(k, 1700, 160, 70, P.yellow);
        k.text('DAY TALK', 960, 150, { size: 90, font: 'title', color: P.ink, fx: 'pop', p: k.at('day', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        bar(k, 260, 260, 1400, 110, [[0.34, P.red, 'complaints & gossip 34%'], [0.31, P.brown, 'business 31%'], [0.29, '#8A8A8A', 'other'], [0.06, P.orange, '']], 'day', { size: 36 });
        note(k, 'stories 6%', 1620, 420, 'stories', { size: 44, color: P.orange, fx: 'pop' });
        k.char(620, G + 30, 360, { ...ANC(), face: 'angry', pose: 'point' });
        k.char(900, G + 30, 360, { ...ANCW(), face: 'smug', flip: true });
        k.bubble(380, 470, 420, 120, 600, 620, { p: k.at('day', 0.4), text: 'He never shares!', size: 40 });
        k.text('…an office.', 1380, 700, { size: 80, font: 'title', color: P.ink, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{flip}At night, around the fire, everything flipped. {81}Eighty-one percent of the conversation was stories. {far}Stories about people in other camps, {spirit}about the spirit world, {hunt}about hunts that went hilariously wrong. {tone}Even the tone changed: calmer, softer, more laughter.",
      sfx: [['scratch', 'flip', 0.4], ['tada', '81', 0.5], ['pop', 'far'], ['sparkle', 'spirit', 0.4], ['boing', 'hunt', 0.3]],
      draw(k) {
        chap(k, 'Firelight talk', true);
        campNight(k, { fx: 960, fs: 240 });
        k.char(560, G + 40, 360, { ...ELDER, face: 'happy', pose: 'present' });
        k.char(1340, G + 40, 360, { ...ANC(), face: k.t > k.cue('hunt') ? 'laugh' : 'calm', flip: true });
        k.char(1580, G + 40, 280, { ...KID, face: k.t > k.cue('hunt') ? 'laugh' : 'shock', flip: true });
        glow(k, 960, G - 100, 800, 0.4);
        k.text('NIGHT TALK', 960, 120, { size: 80, font: 'title', color: P.yellow, fx: 'pop', p: k.at('flip', 0.4), outline: P.ink, outlineWidth: 12 });
        bar(k, 260, 200, 1400, 100, [[0.81, P.orange, 'STORIES 81%'], [0.19, '#5a5478', 'other']], '81', { size: 44 });
        const items = [['far', 'other camps', 'house'], ['spirit', 'spirit world', 'star'], ['hunt', 'hunts gone wrong', 'footprint']];
        items.forEach(([c, t, ic], i) => { k.icon(ic, 520 + i * 440, 370, 90, { p: k.at(c, 0.4), fill: P.yellow }); note(k, t, 520 + i * 440, 455, c, { size: 42, color: '#fff3c4', outline: P.ink }); });
        k.text('calmer · softer · more laughter', 960, 1000, { size: 52, font: 'title', color: '#9fe8c8', p: k.at('tone', 1.6, 'linear'), outline: P.ink, outlineWidth: 10 });
      },
    },
    {
      say: "{why}Why does this matter? {argues}Wiessner argues that firelight stories did real work. {trust}They built trust. {share}They spread news about people far away: who's generous, who's dangerous, who might help in a drought. {network}They let your ancestors keep track of a social world much bigger than one camp. {imagine}And they trained something very human: imagining things that aren't in front of you.",
      sfx: [['pop', 'trust'], ['pop', 'share'], ['pop', 'network'], ['sparkle', 'imagine', 0.4]],
      draw(k) {
        chap(k, 'Firelight talk');
        paper(k);
        k.text('WHAT STORIES DID', 960, 120, { size: 80, font: 'title', color: P.red, fx: 'pop', p: k.at('argues', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        // mạng lưới các trại
        const camps = [[960, 520], [560, 380], [1360, 380], [480, 720], [1440, 720], [960, 860]];
        camps.forEach(([x, y], i) => { if (i) k.line(960, 520, x, y, { stroke: '#cfc6b8', width: 5, p: k.at('network', 0.8), seed: 1320 + i }); });
        camps.forEach(([x, y], i) => k.prop('campfire', x, y, i ? 110 : 180, { p: i ? k.at('network', 0.6) : 1, fire: i ? 0.6 : 1 }));
        note(k, 'TRUST', 300, 260, 'trust', { size: 60, color: P.grass, fx: 'pop' });
        note(k, 'NEWS', 1620, 260, 'share', { size: 60, color: P.orange, fx: 'pop' });
        note(k, 'who is generous? who is dangerous?', 1450, 330, 'share', { size: 34, color: '#6b5f55' });
        note(k, 'BIGGER WORLD', 300, 900, 'network', { size: 54, color: P.brown, fx: 'pop' });
        k.bubble(1260, 860, 520, 130, 1100, 640, { p: k.at('imagine', 0.4), text: 'imagine…', size: 50, think: true });
      },
    },
    {
      say: "{still}You still do this. {screens}Every evening, billions of people gather around a glowing light and soak up stories. {crackle}It just used to crackle. {joke}Now it autoplays the next episode.",
      sfx: [['pop', 'screens'], ['whoosh', 'crackle', 0.4], ['ding', 'joke', 0.4]],
      draw(k) {
        chap(k, 'Firelight talk', true);
        k.ctx.fillStyle = '#1f2440'; k.ctx.fillRect(0, 0, k.W, k.H);
        k.ctx.fillStyle = '#2b3152'; k.ctx.fillRect(0, 760, k.W, 320);
        const tv = k.at('screens', 0.6);
        k.group({ x: 1000, y: 420, s: Math.max(0.01, tv), a: Math.min(1, tv * 3) }, () => {
          k.rect(-380, -230, 760, 460, { fill: '#9fd3ff', fillStyle: 'solid', width: 8, seed: 1330 });
          k.prop('campfire', 0, 40, 260, { fire: 1 });
          k.rect(-60, 230, 120, 50, { fill: '#3b2f2a', fillStyle: 'solid', width: 5, seed: 1331 });
        });
        { const { ctx } = k; ctx.save(); ctx.globalAlpha = 0.2 * tv; ctx.fillStyle = '#9fd3ff'; ctx.beginPath(); ctx.arc(1000, 420, 600, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
        k.char(420, 1040, 400, { ...YOU, face: 'happy', pose: 'hold', p: k.at('still', 0.5) });
        k.char(640, 1060, 300, { ...KID, skin: undefined, outfit: 'tunic', color: P.red, face: 'shock', p: k.at('still', 0.5) });
        k.text('NEXT EPISODE IN 5…', 1000, 760, { size: 54, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('joke', 0.4), outline: P.ink, outlineWidth: 10 });
      },
    },

    // ---------------- Ending ----------------
    {
      chapter: 'Back to the fire',
      say: "{again}So, back to the start. {sun}The sun goes down. {spark}Someone strikes a spark. {around}And around that fire, your ancestors ate cooked food, kept warm, stayed safe, {story}and told stories late into the night. {sleep}Which may be one reason, by the way, that they didn't fall asleep until hours after dark. {alive}Fire didn't just keep you alive. {human}It may have taught you how to be human.",
      sfx: [['whoosh', 'again', 0.4], ['click', 'spark', 0.6], ['ding', 'human', 0.4]],
      draw(k) {
        chap(k, 'Back to the fire', true);
        campNight(k, { fx: 960, fs: 280, fire: k.at('spark', 1) });
        k.char(560, G + 40, 380, { ...ELDER, face: 'happy', pose: 'present' });
        k.char(1340, G + 40, 380, { ...YOU, face: 'happy', flip: true });
        k.char(1600, G + 40, 280, { ...KID, face: k.t > k.cue('sleep') ? 'sleep' : 'happy', flip: true });
        k.prop('meat', 1100, G - 110, 100, { rotate: -0.4, p: k.at('around', 0.5) });
        glow(k, 960, G - 100, 300 + 560 * k.at('spark', 1), 0.7 - 0.25 * k.at('spark', 1));
        zzz(k, 1640, 600, 'sleep');
        k.text('FIRE MADE YOU HUMAN?', 960, 220, { size: 80, font: 'title', color: P.yellow, fx: 'pop', p: k.at('human', 0.5), outline: P.ink, outlineWidth: 12 });
      },
    },

    // ---------------- Recap ----------------
    {
      chapter: 'Recap',
      say: "{remind}Before the recap: remember the bird that leads people to honey. That's next time. {t}Quick recap. {a}Your ancestors made fire with friction, and maybe with sparks from pyrite. {b}Some of the oldest signs of cooking are nearly eight hundred thousand years old. {c}Cooked food gives more energy for less chewing. {d}Some scientists think that helped fuel your big brain, though the timing is debated. {e}And at night, firelight turned talk into stories.",
      sfx: [['ding', 'remind', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['pop', 'e']],
      draw(k) {
        k.group({ a: 1 - k.at('t', 0.4) }, () => {
          savanna(k, { trees: [[1500, 520]] });
          k.prop('beehive', 1540, 330, 200);
          k.prop('bird', 1200, 280, 130, { fly: true });
          k.text('remember the honey bird', 760, 200, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at(k.cue('remind', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 10 });
        });
        k.group({ a: k.at('t', 0.4) }, () => {
          paper(k);
          k.text('RECAP', 960, 110, { size: 80, font: 'title', color: P.red, p: k.at('t', 0.8, 'linear') });
          const rows = [['a', 'firedrill', 'Friction fire · maybe pyrite sparks'], ['b', 'fish', 'Cooking: ~780,000 years ago'], ['c', 'egg', 'More energy, less chewing'], ['d', 'meat', 'Fuel for a big brain? (debated)'], ['e', 'campfire', 'Night talk = stories']];
          rows.forEach(([c, prop, t], i) => {
            const y = 250 + i * 160;
            k.prop(prop, 300, y, 120, { p: k.at(c, 0.5), fire: 0.8, smoke: 0.5 });
            k.text(t, 400, y, { size: 56, font: 'title', align: 'left', p: k.at(c, 1.4, 'linear'), color: P.ink });
          });
        });
      },
    },
    nextEpisodeScene({
      lang: 'en',
      say: "{next}Next episode: what did ancient humans actually eat? {hook}There's a wild bird in Africa that leads people to honey, {call}and it answers a special call. {paleo}Plus: what your ancestors really ate, and whether the paleo diet gets it right. {when}Saturday.",
      title: 'What Did Ancient Humans Actually Eat?',
      hook: 'The wild bird that leads humans to honey.',
      when: 'SATURDAY · 1 PM ET',
      art: (k) => {
        k.prop('beehive', 260, -20, 200);
        k.prop('bird', -40, -60, 140, { fly: true });
        k.char(-300, 140, 240, { ...ANC({ hair: 'short' }), face: 'happy', pose: 'point' });
      },
      sfx: [['sparkle', 'hook', 0.3]],
    }),
    subscribeScene({
      lang: 'en',
      say: "{q}What's the best story you've ever heard around a campfire? Put it in the comments. {sub}And subscribe, so you don't miss what happened next.",
      question: 'Best campfire story you ever heard?',
      channel: 'Long Story Drawn',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
