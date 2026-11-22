// Long Story Drawn — Ep 3: What Did Ancient Humans Actually Eat? (series "how your ancestors actually lived"; promised in Ep 2: honeyguide + paleo diet)
// Fact check:
//  Greater honeyguide (Indicator indicator) leads people to wild bees' nests, eats the wax left behind.
//  Spottiswoode, Begg & Begg 2016 (Science), Yao honey-hunters, Niassa Reserve, Mozambique: the "brrr-hm" call raised the chance of being guided
//    from ~33% to ~66%, and of being shown a nest from ~17% to ~54% (vs. control sounds).
//  Hadza (Tanzania) use a melodious whistle instead; Spottiswoode & Wood 2023 (Science): honeyguides respond more to the local call — culturally learned "dialects".
//  Berbesque & Marlowe 2009: Hadza rank honey as their most preferred food.
//  Marlowe (2010, The Hadza): main foods = meat, honey, baobab, berries, tubers.
//  Smits et al. 2017 (Science): Hadza gut microbiome cycles with the seasons; some bacteria nearly vanish in one season and return in the next.
//  Hawkes, O'Connell & Blurton Jones 1991: Hadza men acquired a large animal on ~3% of hunter-days (≈1 in 30); women's tuber digging gave reliable daily food.
//  Lee (1960s–70s): mongongo nuts a staple of Ju/'hoansi diet. Traditional Inuit diets mostly animal foods.
//  Eaton & Konner 1985 (NEJM) "Paleolithic Nutrition"; Cordain, "The Paleo Diet" (2002): no grains, legumes, dairy.
//  Revedin et al. 2010 (PNAS): starch grains on ~30,000-year-old grinding stones from Italy, Russia, Czech Republic (cattail/fern roots → flour).
//  Piperno et al. 2004 (Nature): Ohalo II, Israel, ~23,000 years — wild barley/wheat ground on a stone.
//  Henry, Brooks & Piperno 2011 (PNAS): Neanderthal dental calculus (Shanidar, Iraq; Spy, Belgium) — starch from grasses incl. barley relatives, legumes; some cooked.
//  Perry et al. 2007 (Nature Genetics): populations with high-starch diets carry more AMY1 (salivary amylase) gene copies on average.
//  Lactase persistence spread in dairying populations within the last ~10,000 years.
//  Fiber: US average ~15–16 g/day; Hadza estimated ~100 g/day or more (estimates vary — phrased "by some estimates").
//  Martínez Steele et al. 2016 (BMJ Open): ~58% of US calories from ultra-processed foods.
//  Next episode (Ep 4, work): Richard Lee's 1960s time counts among the Ju/'hoansi (~2–3 days/week getting food); Sahlins 1966/1972 "original affluent society";
//    critics (Hawkes & O'Connell 1981 etc.) added processing and other work; James Suzman. Poster: COMING SOON (no dates from Ep 3 on).
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import { P, G, YOU, ANC, ANCW, ELDER, KID, SCI, flat, disc, ancient, savanna, night, paper, chap, big, note, redX, card, campNight, glow } from '/channel/long-story-drawn.js';
import * as thumbs from '/videos/013-what-ancient-humans-ate/thumbs.js';

const HADZA = ANC({ hair: 'short', color: '#8a6a4a' });
const YAO = ANC({ outfit: 'tunic', color: '#5a6b8a', color2: P.yellow, hair: 'short', skin: '#9a6b42' });
const PALEO = { body: 'man', outfit: 'tunic', color: '#3b3b3b', color2: '#E0302B', hair: 'short', hairColor: '#c9a24a' };
const LEE = SCI({ hat: undefined, color: '#c2a46b', hair: 'short', hairColor: '#5a3a24', beard: true, beardColor: '#5a3a24' });

// Chuỗi xoắn DNA đơn giản.
function dna(k, x, y, s, p) {
  const { ctx } = k;
  if (p <= 0) return;
  ctx.save(); ctx.globalAlpha *= Math.min(1, p * 2); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  for (let i = 0; i <= 12; i++) { const yy = -90 + i * 15, a = Math.sin(i * 0.6 + (k.gt ?? 0)) * 40; ctx.strokeStyle = i % 2 ? P.orange : P.grass; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-a, yy); ctx.lineTo(a, yy); ctx.stroke(); }
  for (const sg of [1, -1]) { ctx.strokeStyle = P.ink; ctx.lineWidth = 9; ctx.beginPath(); for (let i = 0; i <= 48; i++) { const yy = -90 + i * 3.75, a = sg * Math.sin(i * 0.15 + (k.gt ?? 0)) * 40; i ? ctx.lineTo(a, yy) : ctx.moveTo(a, yy); } ctx.stroke(); }
  ctx.restore();
}

// Đường bay của chim dẫn mật từ cây này sang cây khác.
function guide(k, cue, x0, x1, y, o = {}) {
  const u = k.at(cue, o.dur ?? 3, 'inOut');
  const x = k.lerp(x0, x1, u), yy = y - Math.sin(u * Math.PI) * 80 + Math.sin((k.gt ?? 0) * 3) * 8;
  k.prop('bird', x, yy, o.size ?? 120, { fly: true, flip: x1 < x0, p: k.at(o.show ?? cue, 0.4) });
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    title: 'What Did Ancient Humans Actually Eat?',
    description: `A small wild bird lands next to you, chatters, and flies to the next tree. Follow it, and it leads you to honey. For hunter-gatherers in Africa, this still happens today.
So what did ancient humans actually eat? Honey, tubers, nuts, meat — and, surprisingly, flour made 30,000 years before farming. Does the paleo diet get it right? Episode 3 of "How your ancestors actually lived".`,
    footer: `📚 Sources: Spottiswoode, Begg & Begg (2016, Science) — honeyguides and the Yao "brrr-hm" call; Spottiswoode & Wood (2023, Science) — honeyguide call dialects; Berbesque & Marlowe (2009) — Hadza food preferences; Marlowe, "The Hadza" (2010); Smits et al. (2017, Science) — seasonal Hadza microbiome; Eaton & Konner (1985, NEJM) — Paleolithic nutrition; Revedin et al. (2010, PNAS) — 30,000-year-old flour; Piperno et al. (2004, Nature) — Ohalo II; Henry, Brooks & Piperno (2011, PNAS) — Neanderthal dental calculus; Perry et al. (2007, Nature Genetics) — AMY1 and starch; Martínez Steele et al. (2016, BMJ Open) — ultra-processed foods.
⚠️ Education, not dietary advice.
🍯 Previous episode: How Fire Made You Human. Next: Did Ancient Humans Work Less Than You?`,
    tags: ['what did ancient humans eat', 'paleo diet', 'is the paleo diet real', 'honeyguide bird', 'hadza diet', 'hunter gatherer diet', 'what did cavemen eat', 'prehistoric diet', 'ancient humans', 'human evolution', 'prehistory', 'anthropology', 'hunter gatherers', 'stone age diet', 'neanderthal diet', 'ancient bread', 'evolution of diet', 'early humans', 'honey hunters', 'animated history', 'history explained', 'how people lived', 'long story drawn'],
    hashtags: ['ancienthumans', 'paleo', 'history'],
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
      say: "{stand}You're standing under an acacia tree in East Africa. {bird}A small brown bird lands nearby, {chatter}and starts chattering at you. Loudly. {fly}Then it flies to the next tree, {wait}and waits. {follow}If you follow it, {honey}it will lead you to honey.",
      sfx: [['pop', 'bird'], ['sparkle', 'chatter', 0.3], ['whoosh', 'fly', 0.4], ['ding', 'honey', 0.5]],
      draw(k) {
        savanna(k, { trees: [[380, 420], [1500, 460]] });
        k.char(560, G + 30, 420, { ...YOU, face: k.t > k.cue('honey') ? 'happy' : k.t > k.cue('chatter') ? 'shock' : 'calm', pose: k.t > k.cue('follow') ? 'point' : 'stand', walk: k.t > k.cue('follow') && k.t < k.cue('honey') });
        if (k.t < k.cue('fly')) k.prop('bird', 760, 560, 120, { p: k.at('bird', 0.4), fly: false });
        guide(k, 'fly', 760, 1380, 560, { show: 'bird', dur: 2.5 });
        k.text('chk-chk-chk!', 760, 470, { size: 46, font: 'title', color: P.brown, fx: 'pop', p: k.at('chatter', 0.4) * (1 - k.at('fly', 0.3)), outline: '#fffaf0', outlineWidth: 8 });
        k.prop('beehive', 1560, 420, 180, { p: k.at('honey', 0.5) });
        big(k, 'HONEY', 1560, 250, 'honey', { size: 80, color: P.orange });
      },
    },
    {
      say: "{last}Last episode, your ancestors learned to cook. {today}Today: what was actually on the menu. {series}This is episode three of a series on how your ancestors actually lived. {sub}If you're new, subscribing is free, and unlike honey, it won't get you stung. {plan}Today: {a}the bird that works with humans, {b}what hunter-gatherers really eat, {c}bread before farming, {d}and whether the paleo diet gets it right.",
      sfx: [['pop', 'sub', 0.5], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd']],
      draw(k) {
        paper(k);
        note(k, 'HOW YOUR ANCESTORS ACTUALLY LIVED', 960, 120, 'series', { size: 58, color: P.brown });
        note(k, 'Episode 3', 960, 200, 'series', { size: 44, color: P.red });
        k.prop('campfire', 960, 520, 220, { p: k.at('last', 0.5) * (1 - k.at('a', 0.3)) });
        const items = [['a', 'THE HONEY BIRD', 'bird'], ['b', 'THE REAL MENU', 'tuber'], ['c', 'BREAD BEFORE FARMS', 'grinder'], ['d', 'PALEO: RIGHT?', 'meat']];
        items.forEach(([c, t, prop], i) => {
          const x = 300 + i * 440, p = k.at(c, 0.5);
          k.group({ x, y: 560, r: i % 2 ? 0.03 : -0.03, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-180, -200, 360, 400, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 1400 + i });
            k.prop(prop, 0, -40, 200, { fly: true });
            k.text(t, 0, 140, { size: 40, font: 'title', color: P.red, maxWidth: 330 });
          });
        });
        k.char(1760, 1060, 300, { ...YOU, face: 'happy', pose: 'wave', p: k.at('sub', 0.5) });
      },
    },

    // ---------------- Chapter 1: The honey bird ----------------
    {
      chapter: 'The honey bird',
      say: "{name}The bird is called the greater honeyguide. {wax}It loves beeswax, {cant}but it can't break open a bees' nest by itself. {humans}Humans can, with smoke and an axe. {deal}So the two species made a deal. {show}The bird shows the way. {open}The humans open the nest and take the honey. {left}The bird gets the wax that's left behind.",
      sfx: [['pop', 'name'], ['bonk', 'cant', 0.3], ['whoosh', 'humans', 0.3], ['ding', 'deal', 0.4], ['sparkle', 'left', 0.3]],
      draw(k) {
        chap(k, 'The honey bird');
        savanna(k, { trees: [[1460, 520]] });
        k.prop('beehive', 1500, 330, 200);
        k.prop('bird', 760, 380, 220, { p: k.at('name', 0.5), fly: k.t > k.cue('show') });
        note(k, 'GREATER HONEYGUIDE', 760, 220, 'name', { size: 56, color: P.red, fx: 'pop' });
        note(k, 'loves beeswax', 760, 520, 'wax', { size: 44 });
        k.icon('cross', 1260, 330, 80, { p: k.at('cant', 0.4) * (1 - k.at('humans', 0.3)) });
        k.char(420, G + 30, 420, { ...HADZA, face: k.t > k.cue('open') ? 'happy' : 'calm', pose: k.t > k.cue('humans') ? 'hold' : 'stand', p: k.at('humans', 0.5) });
        k.prop('handaxe', 500, 640, 110, { p: k.at('humans', 0.5), rotate: 0.6 });
        k.text('DEAL', 960, 760, { size: 90, font: 'title', color: P.grass, fx: 'pop', p: k.at('deal', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        note(k, 'bird → shows the way', 960, 870, 'show', { size: 42 });
        note(k, 'humans → honey · bird → wax', 960, 940, 'left', { size: 42 });
      },
    },
    {
      say: "{yao}In Mozambique, Yao honey-hunters call the bird with a special sound: {brr}brrr-hm. {claire}In 2016, biologist Claire Spottiswoode and her colleagues tested it. {played}They played recordings of that call, and of other sounds, while walking through the bush. {res}With the brrr-hm call, the chance of being guided by a honeyguide roughly doubled, {pct}from about thirty-three percent to sixty-six percent.",
      sfx: [['pop', 'yao'], ['boing', 'brr', 0.3], ['pop', 'claire'], ['drumroll', 'res', 0.3], ['tada', 'pct', 0.4]],
      draw(k) {
        chap(k, 'The honey bird');
        savanna(k, { trees: [[1600, 420]] });
        k.char(420, G + 30, 440, { ...YAO, face: k.t > k.cue('brr') ? 'shout' : 'calm', pose: k.t > k.cue('brr') ? 'shout' : 'stand', p: k.at('yao', 0.5) });
        k.bubble(120, 230, 460, 140, 380, 460, { p: k.at('brr', 0.4), text: 'brrr-hm!', size: 60 });
        card(k, 1200, 220, ['SPOTTISWOODE ET AL., 2016', 'Science · Mozambique'], 'claire', { w: 640 });
        // thanh so sánh
        const x0 = 840, w = 900;
        note(k, 'other sounds', 1000, 420, 'res', { size: 40, color: '#6b5f55' });
        k.rect(x0, 450, w * 0.33 * k.at('res', 1), 80, { fill: '#8A8A8A', fillStyle: 'solid', width: 4, p: k.at('res', 0.3), seed: 1410 });
        note(k, '33%', x0 + w * 0.33 + 70, 490, k.cue('res', 1), { size: 50, color: '#6b5f55', fx: 'pop' });
        note(k, '"brrr-hm"', 1000, 590, 'pct', { size: 40, color: P.red });
        k.rect(x0, 620, w * 0.66 * k.at('pct', 1), 80, { fill: P.orange, fillStyle: 'solid', width: 4, p: k.at('pct', 0.3), seed: 1411 });
        note(k, '66%', x0 + w * 0.66 + 70, 660, k.cue('pct', 1), { size: 60, color: P.orange, fx: 'pop' });
        note(k, 'chance of being guided', 1290, 770, 'pct', { size: 40 });
        k.prop('bird', 1600, 300, 120, { fly: true, p: k.at('pct', 0.5) });
      },
    },
    {
      say: "{hadza}In Tanzania, Hadza hunters use a different signal: a melodious whistle. {dialect}And a 2023 study found that honeyguides respond more strongly to the local call. {learn}The birds seem to learn the signal used in their area. {joke}So honeyguides have dialects. {fav}And the prize is worth it. {rank}When the Hadza ranked their favorite foods, honey came first.",
      sfx: [['sparkle', 'hadza', 0.4], ['pop', 'dialect'], ['boing', 'joke', 0.3], ['tada', 'rank', 0.4]],
      draw(k) {
        chap(k, 'The honey bird');
        savanna(k, { trees: [[1600, 420]] });
        k.char(420, G + 30, 440, { ...HADZA, face: 'happy', pose: 'wave', p: k.at('hadza', 0.5) });
        k.text('♪ ~ ♪', 640, 420, { size: 70, font: 'title', color: P.brown, fx: 'pop', p: k.at('hadza', 0.4), outline: '#fffaf0', outlineWidth: 8 });
        card(k, 1200, 220, ['SPOTTISWOODE & WOOD, 2023', 'local calls work best'], 'dialect', { w: 640 });
        k.prop('bird', 1000, 520, 150, { fly: true, p: k.at('dialect', 0.5) });
        k.text('DIALECTS', 1000, 400, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        // bảng xếp hạng
        const p = k.at('rank', 0.5);
        k.group({ x: 1460, y: 640, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
          k.rect(-200, -150, 400, 300, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 1420 });
          k.text('HADZA FAVORITE FOOD', 0, -110, { size: 30, font: 'title', color: P.ink });
          k.text('#1', -120, 10, { size: 80, font: 'title', color: P.orange });
          k.prop('beehive', 60, 10, 150);
        });
      },
    },

    // ---------------- Chapter 2: The real menu ----------------
    {
      chapter: 'The real menu',
      say: "{q}So what else is on a hunter-gatherer menu? {marlowe}Anthropologist Frank Marlowe, who worked with the Hadza for years, listed five main foods. {a}Meat. {b}Honey. {c}Baobab fruit. {d}Berries. {e}And tubers, wild roots dug out of the ground with a stick. {season}And the menu changes with the seasons: more berries at one time of year, more meat or honey at another.",
      sfx: [['pop', 'marlowe'], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['pop', 'e'], ['whoosh', 'season', 0.3]],
      draw(k) {
        chap(k, 'The real menu');
        paper(k);
        card(k, 960, 160, ['FRANK MARLOWE', '"The Hadza" · 2010'], 'marlowe', { w: 520 });
        const foods = [['a', 'meat', 'MEAT'], ['b', 'beehive', 'HONEY'], ['c', 'baobab', 'BAOBAB'], ['d', 'berries', 'BERRIES'], ['e', 'tuber', 'TUBERS']];
        foods.forEach(([c, prop, t], i) => {
          const x = 260 + i * 350;
          k.prop(prop, x, 480, 220, { p: k.at(c, 0.5) });
          note(k, t, x, 640, c, { size: 50, color: P.red, fx: 'pop' });
        });
        // vòng mùa
        const ps = k.at('season', 0.8);
        k.arc(960, 900, 120, -Math.PI * 0.9, Math.PI * 0.6, { stroke: P.grass, width: 10, p: ps, seed: 1430 });
        k.text('SEASONS', 960, 900, { size: 48, font: 'title', color: P.grass, fx: 'pop', p: ps });
      },
    },
    {
      say: "{gut}Even their gut bacteria follow the seasons. {smits}In 2017, a team led by Samuel Smits found that some groups of bacteria in Hadza guts almost disappear in one season, {back}and come back in the next. {you}Your gut bacteria, meanwhile, eat the same thing all year. {joke}Mostly whatever was on sale.",
      sfx: [['pop', 'smits'], ['slideDown', ['smits', 2], 0.3], ['slideUp', 'back', 0.3], ['wahwah', 'joke', 0.3]],
      draw(k) {
        chap(k, 'The real menu');
        paper(k);
        card(k, 520, 200, ['SMITS ET AL., 2017', 'Science · Hadza microbiome'], 'smits', { w: 600 });
        // vi khuẩn theo mùa
        const n = 14, show = 1 - k.at(k.cue('smits', 2), 1) + k.at('back', 1);
        for (let i = 0; i < n; i++) {
          const x = 260 + (i % 7) * 75, y = 500 + Math.floor(i / 7) * 110 + Math.sin((k.gt ?? 0) * 2 + i) * 6;
          const fade = i % 2 ? Math.min(1, show) : 1;
          k.group({ x, y, a: fade * k.at('gut', 0.5) }, () => { k.ellipse(0, 0, 50, 26, { fill: i % 2 ? P.orange : P.grass, fillStyle: 'solid', width: 3, seed: 1440 + i }); });
        }
        note(k, 'dry season ↔ wet season', 520, 760, 'back', { size: 42, color: '#6b5f55' });
        k.char(1400, 960, 440, { ...YOU, face: k.t > k.cue('joke') ? 'blank' : 'calm', p: k.at('you', 0.5) });
        k.prop('snack', 1620, 640, 160, { p: k.at('joke', 0.4) });
        k.text('SALE!', 1620, 480, { size: 60, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{meat}And meat? {hunt}Hunting big animals is a gamble. {hawkes}In a 1991 study, Kristen Hawkes and her colleagues found that Hadza men brought down a large animal on only about one day in thirty of hunting. {fail}The other twenty-nine days: a long walk. {tubers}Meanwhile, women digging tubers came home with food almost every day. {joke}The steak got the stories. The tubers paid the bills.",
      sfx: [['pop', 'hunt'], ['pop', 'hawkes'], ['wahwah', 'fail', 0.3], ['ding', 'tubers', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        chap(k, 'The real menu');
        savanna(k, { trees: [[1700, 380]] });
        card(k, 960, 180, ['HAWKES ET AL., 1991', 'Hadza big-game hunting'], 'hawkes', { w: 600 });
        k.char(480, G + 30, 420, { ...HADZA, face: k.t > k.cue('fail') ? 'sad' : 'calm', prop: 'spear', walk: k.t > k.cue('fail') && k.t < k.cue('tubers'), p: k.at('hunt', 0.5) });
        big(k, '1 in 30', 480, 380, k.cue('hawkes', 2.5), { size: 90 });
        note(k, 'days with a big kill', 480, 470, k.cue('hawkes', 2.8), { size: 40 });
        k.char(1360, G + 30, 420, { ...ANCW(), face: 'happy', pose: 'hold', prop: 'staff', p: k.at('tubers', 0.5) });
        [[1220, G - 10], [1500, G - 10], [1360, G + 30]].forEach(([x, y]) => k.prop('tuber', x, y, 110, { p: k.at('tubers', 0.5) }));
        note(k, 'almost every day', 1360, 470, 'tubers', { size: 48, color: P.grass, fx: 'pop' });
        k.text('STEAK: STORIES · TUBERS: BILLS', 960, 1000, { size: 56, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{other}And other groups ate completely different things. {ju}For San hunter-gatherers in the Kalahari, a staple was the mongongo nut. {inuit}In the Arctic, the traditional Inuit diet was mostly animal foods: fish, seal, whale. {point}So here's the first big point. {none}There was never one ancestral diet. {local}Your ancestors ate whatever their part of the world offered, {smart}and they were very, very good at finding it.",
      sfx: [['pop', 'ju'], ['pop', 'inuit'], ['drumroll', 'point', 0.3], ['ding', 'none', 0.5]],
      draw(k) {
        chap(k, 'The real menu');
        paper(k);
        k.line(640, 160, 640, 720, { stroke: '#cfc6b8', width: 4, seed: 1450 });
        k.line(1280, 160, 1280, 720, { stroke: '#cfc6b8', width: 4, seed: 1451 });
        const cols = [['other', 'EAST AFRICA', 'Hadza', 'beehive', '#D2B488'], ['ju', 'KALAHARI', 'Ju/\'hoansi', 'tuber', '#e8cf9a'], ['inuit', 'ARCTIC', 'Inuit', 'fish', '#d6ecfa']];
        cols.forEach(([c, region, people, prop, bg], i) => {
          const x = 320 + i * 640, p = k.at(c, 0.5);
          k.rect(x - 300, 170, 600, 540, { fill: bg, fillStyle: 'solid', stroke: 'none', p, seed: 1452 + i });
          note(k, region, x, 230, c, { size: 50, color: P.ink, fx: 'pop' });
          note(k, people, x, 300, c, { size: 40, color: '#6b5f55' });
          k.prop(prop, x, 480, 240, { p, fill: i === 2 ? '#7FB5D5' : undefined });
          note(k, ['honey, tubers, meat…', 'mongongo nuts', 'fish, seal, whale'][i], x, 650, c, { size: 40 });
        });
        k.text('NO SINGLE ANCESTRAL DIET', 960, 860, { size: 80, font: 'title', color: P.red, fx: 'pop', p: k.at('none', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        note(k, 'local · seasonal · resourceful', 960, 970, 'local', { size: 46 });
      },
    },

    // ---------------- Chapter 3: The paleo diet ----------------
    {
      chapter: 'The paleo diet',
      say: "{q}Which brings us to the paleo diet. {nejm}In 1985, a doctor named Boyd Eaton and anthropologist Melvin Konner published an influential paper on what Stone Age people ate. {book}Later, books like Loren Cordain's The Paleo Diet turned the idea into a lifestyle. {rules}The rules, roughly: {yes}meat, fish, vegetables, fruit, and nuts. {no}No grains. No beans. No dairy. {logic}The logic: your body evolved for the Stone Age, so eat like it.",
      sfx: [['pop', 'nejm'], ['pop', 'book'], ['ding', 'yes', 0.3], ['bonk', 'no', 0.4]],
      draw(k) {
        chap(k, 'The paleo diet');
        paper(k);
        card(k, 480, 200, ['EATON & KONNER, 1985', 'New England Journal of Medicine'], 'nejm', { w: 640 });
        card(k, 1440, 200, ['"THE PALEO DIET"', 'Loren Cordain · 2002'], 'book', { w: 540, r: 0.02, seed: 1460 });
        k.char(960, 960, 440, { ...PALEO, face: 'smug', pose: k.t > k.cue('no') ? 'hips' : 'present', p: k.at('rules', 0.5) });
        note(k, 'YES', 420, 380, 'yes', { size: 64, color: P.grass, fx: 'pop' });
        [['meat', 340, 500], ['fish', 520, 500], ['berries', 340, 660], ['tuber', 520, 660]].forEach(([pr, x, y]) => k.prop(pr, x, y, 130, { p: k.at('yes', 0.5) }));
        note(k, 'NO', 1500, 380, 'no', { size: 64, color: P.red, fx: 'pop' });
        k.prop('bread', 1500, 520, 150, { p: k.at('no', 0.5) });
        note(k, 'grains · beans · dairy', 1500, 700, 'no', { size: 40, color: P.red });
        redX(k, 1500, 520, 110, k.cue('no', 0.6));
        k.text('"eat like the Stone Age"', 960, 1010, { size: 46, font: 'title', color: P.ink, fx: 'fade', p: k.at('logic', 0.6), outline: '#fffaf0', outlineWidth: 8 });
      },
    },

    // ---------------- Chapter 4: Bread before farming ----------------
    {
      chapter: 'Bread before farming',
      say: "{prob}Here's the problem with no grains. {revedin}In 2010, a team led by Anna Revedin examined grinding stones about thirty thousand years old, from Italy, Russia, and the Czech Republic. {starch}They were covered in starch grains, {roots}from roots of plants like cattails and ferns. {flour}Your ancestors were grinding flour. {years}Twenty thousand years before farming.",
      sfx: [['scratch', 'prob', 0.4], ['pop', 'revedin'], ['sparkle', 'starch', 0.4], ['tada', 'flour', 0.4]],
      draw(k) {
        chap(k, 'Bread before farming');
        paper(k);
        card(k, 520, 200, ['REVEDIN ET AL., 2010', 'PNAS · Italy · Russia · Czechia'], 'revedin', { w: 640 });
        k.prop('grinder', 520, 520, 380, { p: k.at('revedin', 0.6) });
        for (let i = 0; i < 18; i++) k.dot(380 + k.rand(i) * 280, 500 + k.rand(i + 30) * 40, 5, '#fffaf0', k.at('starch', 0.4));
        note(k, 'starch grains', 520, 690, 'starch', { size: 44 });
        note(k, 'cattail & fern roots', 520, 760, 'roots', { size: 40, color: P.grass });
        big(k, 'FLOUR', 1360, 420, 'flour', { size: 140 });
        note(k, '~30,000 years ago', 1360, 560, 'flour', { size: 54, color: P.brown });
        note(k, '≈ 20,000 years before farming', 1360, 660, 'years', { size: 46, color: P.red, fx: 'pop' });
        k.prop('bread', 1360, 850, 220, { p: k.at('flour', 0.5) });
      },
    },
    {
      say: "{ohalo}At Ohalo Two, a camp on the shore of the Sea of Galilee about twenty-three thousand years old, people collected wild wheat and barley, {stone}and ground them on a stone. {neander}And it's not just modern humans. {henry}In 2011, Amanda Henry and her colleagues scraped the tartar off Neanderthal teeth, {shanidar}from Shanidar Cave in Iraq, and Spy Cave in Belgium. {found}Trapped inside: starch from grasses related to barley, and from legumes. {cooked}Some of it had been cooked. {joke}Neanderthals: not as paleo as advertised.",
      sfx: [['pop', 'ohalo'], ['scratch', 'stone', 0.3], ['pop', 'henry'], ['pop', 'shanidar'], ['ding', 'found', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        chap(k, 'Bread before farming');
        ancient(k, { tree: false, sx: 1720, sy: 200 });
        card(k, 440, 220, ['OHALO II · ~23,000 years', 'Sea of Galilee, Israel'], 'ohalo', { w: 620 });
        k.prop('grinder', 440, G - 60, 240, { p: k.at('stone', 0.5) });
        [[300, 600], [580, 620]].forEach(([x, y], i) => k.prop('bamboo', x, y, 160, { p: k.at('ohalo', 0.5), fill: '#d9c06a', leaf: '#c9a24a' }));
        card(k, 1340, 220, ['HENRY ET AL., 2011', 'PNAS · Neanderthal tartar'], 'henry', { w: 620, r: 0.02, seed: 1470 });
        k.char(1200, G + 30, 460, { body: 'big', outfit: 'bare', color: '#8a6a4a', color2: '#6b4a33', hair: 'long', hairColor: '#5a3a24', skin: '#e0b48c', face: k.t > k.cue('joke') ? 'smug' : 'laugh', p: k.at('neander', 0.5) });
        note(k, 'Shanidar (Iraq) · Spy (Belgium)', 1340, 380, 'shanidar', { size: 38, color: P.ink });
        note(k, 'barley relatives + legumes', 1560, 560, 'found', { size: 40, color: P.brown });
        note(k, 'some cooked', 1560, 630, 'cooked', { size: 44, color: P.red, fx: 'pop' });
        k.text('NOT AS PALEO AS ADVERTISED', 1300, 1000, { size: 52, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{genes}Your own genes tell the same story. {amy}There's a gene called AMY1, which makes an enzyme in your saliva that breaks down starch. {perry}In 2007, a team led by George Perry found that populations with traditionally high-starch diets carry more copies of it, on average. {milk}And the ability to digest milk as an adult spread in dairy-farming peoples within the last ten thousand years. {evolve}Your body didn't stop evolving in the Stone Age. {still}It kept adapting to whatever people ate.",
      sfx: [['pop', 'amy'], ['pop', 'perry'], ['pop', 'milk'], ['ding', 'evolve', 0.4]],
      draw(k) {
        chap(k, 'Bread before farming');
        paper(k);
        dna(k, 360, 380, 1.4, k.at('genes', 0.5));
        note(k, 'AMY1', 360, 560, 'amy', { size: 80, color: P.red, fx: 'pop' });
        note(k, 'saliva enzyme · breaks down starch', 360, 650, 'amy', { size: 36, color: '#6b5f55' });
        card(k, 1100, 200, ['PERRY ET AL., 2007', 'Nature Genetics'], 'perry', { w: 520 });
        // số bản sao gen
        const bars = [['low-starch diets', 0.4, '#8A8A8A'], ['high-starch diets', 0.8, P.orange]];
        bars.forEach(([t, f, c], i) => {
          const y = 380 + i * 140;
          note(k, t, 900, y + 40, k.cue('perry', 0.8 + i * 0.5), { size: 38, align: 'center' });
          k.rect(1100, y, 600 * f * k.at(k.cue('perry', 0.8 + i * 0.5), 1), 80, { fill: c, fillStyle: 'solid', width: 4, p: k.at(k.cue('perry', 0.8 + i * 0.5), 0.3), seed: 1480 + i });
        });
        note(k, 'AMY1 copies (average)', 1400, 640, 'perry', { size: 36, color: '#6b5f55' });
        k.rect(760, 730, 220, 130, { fill: '#ffffff', fillStyle: 'solid', width: 5, p: k.at('milk', 0.5), seed: 1490 });
        note(k, 'MILK', 870, 795, 'milk', { size: 56, color: P.sky, outline: P.ink });
        note(k, 'adult milk digestion: last ~10,000 years', 1020, 795, 'milk', { size: 40, align: 'left' });
        k.text('YOU KEPT EVOLVING', 960, 990, { size: 70, font: 'title', color: P.grass, fx: 'pop', p: k.at('evolve', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    // vòng mở → tập 4 (giữa video)
    {
      say: "{time}Of course, finding all this food took time. {dig}Digging tubers, cracking nuts, following birds. {q}So how much time? {lee}In the 1960s, an anthropologist named Richard Lee sat in the Kalahari with a notebook, and counted the hours. {answer}His answer was so surprising that it started an argument that has lasted more than fifty years. {next}That's the next episode.",
      sfx: [['pop', 'dig'], ['boing', 'q', 0.3], ['scratch', 'lee', 0.3], ['drumroll', 'answer', 0.3], ['ding', 'next', 0.4]],
      draw(k) {
        ancient(k, { tx: 1620 });
        k.char(420, G + 30, 400, { ...ANCW(), face: 'calm', pose: 'hold', prop: 'staff' });
        k.prop('tuber', 600, G - 20, 140, { p: k.at('dig', 0.5) });
        k.icon('clock', 960, 300, 160, { p: k.at('q', 0.5) });
        k.icon('question', 1100, 260, 110, { p: k.at('q', 0.5), stroke: P.red });
        k.char(1280, G + 30, 420, { ...LEE, face: k.t > k.cue('answer') ? 'shock' : 'calm', pose: 'hold', prop: 'scroll', p: k.at('lee', 0.5) });
        note(k, 'Richard Lee · 1960s', 1280, 420, 'lee', { size: 46, color: P.ink });
        k.text('50-YEAR ARGUMENT', 960, 560, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('answer', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.text('NEXT EPISODE →', 960, 1000, { size: 56, font: 'title', color: P.red, fx: 'pop', p: k.at('next', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 5: What they didn't eat ----------------
    {
      chapter: "What they didn't eat",
      say: "{q}So if the paleo rules are shaky, what's the real difference between their food and yours? {fiber}Start with fiber. {us}The average American eats about fifteen grams a day. {hadza}The Hadza, by some estimates, eat a hundred grams or more, from tough tubers, berries, and baobab. {joke}That's a lot of chewing. Good thing they cook.",
      sfx: [['pop', 'fiber'], ['pop', 'us'], ['tada', 'hadza', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        chap(k, "What they didn't eat");
        paper(k);
        big(k, 'FIBER', 960, 150, 'fiber', { size: 110, color: P.grass });
        const base = 860, sc = 5;
        k.rect(500, base - 15 * sc * k.at('us', 0.8), 260, 15 * sc * k.at('us', 0.8), { fill: '#8A8A8A', fillStyle: 'solid', width: 4, p: k.at('us', 0.3), seed: 1500 });
        note(k, '~15 g', 630, base - 15 * sc - 50, k.cue('us', 0.6), { size: 56, color: '#6b5f55', fx: 'pop' });
        note(k, 'average American', 630, base + 50, 'us', { size: 40 });
        k.rect(1100, base - 100 * sc * k.at('hadza', 1.2), 260, 100 * sc * k.at('hadza', 1.2), { fill: P.grass, fillStyle: 'solid', width: 4, p: k.at('hadza', 0.3), seed: 1501 });
        note(k, '100+ g', 1230, base - 100 * sc - 50, k.cue('hadza', 1.2), { size: 56, color: P.grass, fx: 'pop' });
        note(k, 'Hadza (estimates)', 1230, base + 50, 'hadza', { size: 40 });
        k.line(400, base, 1500, base, { stroke: P.ink, width: 5, seed: 1502 });
        [['tuber', 1560, 520], ['berries', 1600, 680], ['baobab', 1700, 420]].forEach(([pr, x, y]) => k.prop(pr, x, y, 120, { p: k.at('hadza', 0.5) }));
        k.prop('campfire', 300, 760, 160, { p: k.at('joke', 0.5) });
      },
    },
    {
      say: "{next2}Next: almost nothing in their diet came from a factory. {upf}In the United States, a 2016 study estimated that nearly sixty percent of calories come from ultra-processed foods. {sugar}And the only really sweet thing in a hunter-gatherer camp was honey, {work}which you had to earn by following a bird and getting stung.",
      sfx: [['pop', 'upf'], ['cash', 'upf', 0.3], ['sparkle', 'sugar', 0.3], ['bonk', 'work', 0.3]],
      draw(k) {
        chap(k, "What they didn't eat");
        paper(k);
        card(k, 520, 200, ['MARTÍNEZ STEELE ET AL., 2016', 'BMJ Open · U.S. diet'], 'upf', { w: 680 });
        // biểu đồ tròn ~58%
        const p = k.at('upf', 1.2);
        const { ctx } = k;
        ctx.save(); ctx.globalAlpha *= Math.min(1, p * 3);
        ctx.beginPath(); ctx.arc(520, 600, 230, 0, Math.PI * 2); ctx.fillStyle = '#e8e2d4'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = P.ink; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(520, 600); ctx.arc(520, 600, 230, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.58 * p); ctx.closePath(); ctx.fillStyle = P.red; ctx.fill(); ctx.stroke();
        ctx.restore();
        big(k, '~58%', 520, 600, k.cue('upf', 1), { size: 90, color: '#fff', outline: P.ink });
        note(k, 'of calories: ultra-processed', 520, 880, 'upf', { size: 42 });
        k.prop('snack', 820, 760, 140, { p: k.at('upf', 0.5), rotate: 0.2 });
        k.prop('beehive', 1400, 460, 260, { p: k.at('sugar', 0.5) });
        note(k, 'the only sweet thing: honey', 1400, 680, 'sugar', { size: 46, color: P.orange });
        k.prop('bird', 1150, 340, 110, { p: k.at('work', 0.4), fly: true });
        k.text('BZZ!', 1640, 360, { size: 60, font: 'title', color: P.red, fx: 'pop', p: k.at('work', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        note(k, 'earned, not bought', 1400, 780, 'work', { size: 42, color: '#6b5f55' });
      },
    },

    // ---------------- Chapter 6: So, is paleo right? ----------------
    {
      chapter: 'So, is paleo right?',
      say: "{verdict}So, does the paleo diet get it right? {partly}Partly. {right}It's right that your ancestors ate whole foods, lots of plants, lots of fiber, and nothing from a factory. {wrong}It's wrong that they avoided grains, roots, and beans. {wrong2}And it's wrong that there was one Stone Age diet to copy. {irony}The irony? Most paleo plans happily allow honey. {bird}Which, to be fair, is the most authentic part.",
      sfx: [['drumroll', 'verdict', 0.3], ['ding', 'right', 0.4], ['bonk', 'wrong', 0.3], ['bonk', 'wrong2', 0.3], ['boing', 'irony', 0.3]],
      draw(k) {
        chap(k, 'So, is paleo right?');
        paper(k);
        k.text('PALEO DIET: RIGHT?', 960, 130, { size: 90, font: 'title', color: P.ink, fx: 'pop', p: k.at('verdict', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        note(k, 'PARTLY.', 960, 240, 'partly', { size: 70, color: P.orange, fx: 'pop' });
        const rows = [['right', 'check', 'whole foods · plants · fiber · no factory'], ['wrong', 'cross', 'no grains, roots or beans'], ['wrong2', 'cross', 'one Stone Age diet to copy']];
        rows.forEach(([c, ic, t], i) => {
          const y = 400 + i * 150;
          k.icon(ic, 300, y, 100, { p: k.at(c, 0.4) });
          k.text(t, 400, y, { size: 54, font: 'title', align: 'left', color: ic === 'check' ? P.grass : P.red, p: k.at(c, 1.2, 'linear') });
        });
        k.prop('beehive', 1600, 820, 200, { p: k.at('irony', 0.5) });
        k.text('most authentic part ✓', 1300, 980, { size: 52, font: 'title', color: P.orange, fx: 'pop', p: k.at('bird', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Ending ----------------
    {
      chapter: 'Back to the bird',
      say: "{again}So, back to that tree. {bird}A small bird chatters, {follow}you follow it, {smoke}someone lights a little fire to calm the bees, {honey}and a whole camp eats honey tonight. {lesson}That's the real ancestral diet: {local}local, seasonal, shared, {earned}and earned. {you}You don't have to eat like a caveman. {maybe}But it might help to eat a little more like someone who had to find their food.",
      sfx: [['whoosh', 'again', 0.4], ['sparkle', 'bird', 0.3], ['whoosh', 'smoke', 0.3], ['tada', 'honey', 0.4]],
      draw(k) {
        chap(k, 'Back to the bird');
        savanna(k, { trees: [[1500, 520]] });
        k.prop('beehive', 1540, 330, 200);
        guide(k, 'bird', 500, 1300, 360, { dur: 3 });
        k.char(420, G + 30, 400, { ...YOU, face: 'happy', pose: k.t > k.cue('honey') ? 'cheer' : 'point', walk: k.t > k.cue('follow') && k.t < k.cue('honey') });
        k.char(1180, G + 30, 400, { ...HADZA, face: 'happy', pose: 'hold', p: k.at('smoke', 0.5) });
        k.prop('campfire', 1340, G - 30, 120, { p: k.at('smoke', 0.5), fire: 0.5 });
        const words = [['local', 'LOCAL'], [k.cue('local', 0.5), 'SEASONAL'], [k.cue('local', 1), 'SHARED'], ['earned', 'EARNED']];
        words.forEach(([c, t], i) => note(k, t, 360 + i * 400, 180, c, { size: 60, color: [P.grass, P.orange, P.brown, P.red][i], fx: 'pop' }));
      },
    },

    // ---------------- Recap ----------------
    {
      chapter: 'Recap',
      say: "{remind}Before the recap: remember Richard Lee and his notebook. You'll meet him next time. {t}Quick recap. {a}Honeyguide birds lead people to honey, and answer local calls. {b}Hunter-gatherer diets were local and seasonal, with no single ancestral menu. {c}People ground flour from wild plants thirty thousand years ago. {d}Your genes kept adapting to starch and milk. {e}And paleo gets some things right, but not the bread.",
      sfx: [['ding', 'remind', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['pop', 'e']],
      draw(k) {
        k.group({ a: 1 - k.at('t', 0.4) }, () => {
          ancient(k, { tx: 1620 });
          k.char(960, G + 30, 420, { ...LEE, face: 'calm', pose: 'hold', prop: 'scroll' });
          k.text('remember Richard Lee', 960, 260, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at(k.cue('remind', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 10 });
        });
        k.group({ a: k.at('t', 0.4) }, () => {
          paper(k);
          k.text('RECAP', 960, 110, { size: 80, font: 'title', color: P.red, p: k.at('t', 0.8, 'linear') });
          const rows = [['a', 'bird', 'Honeyguides lead people to honey'], ['b', 'tuber', 'Local & seasonal, no single diet'], ['c', 'grinder', 'Flour ~30,000 years ago'], ['d', 'molecule', 'Genes adapted to starch & milk'], ['e', 'bread', 'Paleo: partly right, not the bread']];
          rows.forEach(([c, prop, t], i) => {
            const y = 250 + i * 160;
            if (prop === 'molecule') dna(k, 300, y, 0.5, k.at(c, 0.5)); else k.prop(prop, 300, y, 120, { p: k.at(c, 0.5) });
            k.text(t, 400, y, { size: 56, font: 'title', align: 'left', p: k.at(c, 1.4, 'linear'), color: P.ink });
          });
        });
      },
    },
    nextEpisodeScene({
      lang: 'en',
      say: "{next}Next episode: did ancient humans work less than you? {hook}A 1960s study said hunter-gatherers spent only a few hours a day getting food. {fight}Then the fight began. {when}Coming soon.",
      title: 'Did Ancient Humans Work Less Than You?',
      hook: 'Did they really work just a few hours a day?',
      when: 'COMING SOON',
      art: (k) => {
        k.icon('clock', 260, -20, 160);
        k.char(-260, 150, 240, { ...ANCW(), face: 'smug', pose: 'hips' });
        k.char(20, 150, 240, { ...YOU, face: 'sad', pose: 'facepalm' });
      },
      sfx: [['boom', 'fight', 0.3]],
    }),
    subscribeScene({
      lang: 'en',
      say: "{q}What's one food you could never give up, paleo or not? Put it in the comments. {sub}And subscribe, so you don't miss what happened next.",
      question: 'One food you could never give up?',
      channel: 'Long Story Drawn',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
