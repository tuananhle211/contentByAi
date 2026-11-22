// Long Story Drawn — Ep 4: Did Ancient Humans Work Less Than You? (series "how your ancestors actually lived"; promised in Ep 3: Richard Lee's notebook)
// Fact check:
//  Keynes 1930, "Economic Possibilities for our Grandchildren": predicted ~15-hour work weeks for his grandchildren's generation (~2030).
//  Richard Lee, Dobe area (Botswana, Kalahari), 1963–64 among the Ju/'hoansi (!Kung): adults spent ~2.5 days/week, roughly 12–19 h, getting food;
//    data collected during a severe drought (Lee 1968, "What Hunters Do for a Living", in Man the Hunter).
//  "Man the Hunter" symposium, Chicago 1966; Marshall Sahlins, "Notes on the Original Affluent Society" → Stone Age Economics (1972): "Zen road to affluence" — want little.
//  Hawkes & O'Connell 1981 (American Anthropologist), Alyawara (Australia): counting food processing etc. makes the work week much longer.
//  Lee 1979 (The !Kung San): food-getting + tool-making + housework ≈ 40–45 h/week total.
//  Woodburn 1982 (Hadza): "immediate-return" societies — food is shared and eaten soon, little storage. James Suzman: Affluence Without Abundance (2017), Work (2020).
//  Lee 1969, "Eating Christmas in the Kalahari" (Natural History): he bought the biggest ox for a Christmas feast; people mocked it as thin;
//    explanation: "insulting the meat" keeps a successful hunter humble ("cool his heart and make him gentle").
//  Lee 1968: "Why should we plant, when there are so many mongongo nuts in the world?"; young people and the elderly did little food-getting.
//  Cohen & Armelagos (eds.) 1984, Paleopathology at the Origins of Agriculture: early farmers often show more caries, more stress markers, reduced stature.
//  Diamond 1987 (Discover), "The Worst Mistake in the History of the Human Race". Suzman 2020: farming → working for the future.
//  Raichlen et al. 2017 (Am J Hum Biol): Hadza ~135 min/day moderate-to-vigorous activity, far above US averages. Pontzer et al. 2012 (PLoS ONE): Hadza total daily energy expenditure similar to Westerners after size adjustment.
//  Gurven & Kaplan 2007 (Population and Development Review): hunter-gatherers — ~57% survive to 15 (≈ 4 in 10 children die); adults who survive often reach their late 60s–70s.
//  US full-time workers average ~40+ h/week.
//  Next episode (Ep 5, kids): Hewlett, "Intimate Fathers" (1991): Aka (Central Africa) fathers hold infants more than fathers in any other known society;
//    Hrdy, "Mothers and Others" (2009): alloparenting — many caregivers. Poster: COMING SOON (no dates).
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import { P, G, YOU, ANC, ANCW, ELDER, KID, SCI, flat, disc, ancient, savanna, night, paper, chap, big, note, redX, card, campNight, glow } from '/channel/long-story-drawn.js';
import * as thumbs from '/videos/017-did-ancient-humans-work-less/thumbs.js';

const LEE = SCI({ hat: undefined, color: '#c2a46b', hair: 'short', hairColor: '#5a3a24', beard: true, beardColor: '#5a3a24' });
const KEYNES = { body: 'man', outfit: 'robe', color: '#3b3b4a', color2: '#c9c4bb', hair: 'short', hairColor: '#7a6a5a' };
const SAHLINS = { body: 'big', outfit: 'robe', color: '#6b5a8a', color2: P.yellow, hair: 'short', hairColor: '#3a2a1e', beard: true, beardColor: '#3a2a1e' };
const HAWKES = { body: 'woman', outfit: 'dress', color: '#4E9A45', color2: P.yellow, hair: 'long', hairColor: '#8a6a4a' };
const OFFICE = { ...YOU, hat: undefined, color: '#5a6b8a', color2: '#9fd3ff' };

// Lịch tuần: 7 ô ngày, n ngày tô màu kiếm ăn.
function week(k, x, y, days, cue, o = {}) {
  const lbl = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  lbl.forEach((d, i) => {
    const p = k.at(typeof cue === 'string' ? k.cue(cue, i * 0.12) : cue + i * 0.12, 0.4);
    const fill = i < Math.floor(days) ? (o.color ?? P.orange) : i < days ? (o.color2 ?? '#f7c08a') : '#fffaf0';
    k.rect(x + i * 130, y, 110, 110, { fill, fillStyle: 'solid', width: 4, p, seed: (o.seed ?? 1700) + i });
    k.text(d, x + i * 130 + 55, y + 55, { size: 48, font: 'title', color: P.ink, p: p > 0.5 ? 1 : 0 });
  });
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    title: 'Did Ancient Humans Work Less Than You?',
    description: `In 1930, an economist predicted that by 2030 you'd work fifteen hours a week. In the 1960s, an anthropologist in the Kalahari counted the hours hunter-gatherers spent getting food — and his answer started a fifty-year argument.
Did ancient humans really work less than you? The "original affluent society", the backlash, a Christmas ox that nobody would praise, and what the numbers really say. Episode 4 of "How your ancestors actually lived".`,
    footer: `📚 Sources: Keynes (1930), "Economic Possibilities for our Grandchildren"; Lee (1968), "What Hunters Do for a Living", in Man the Hunter; Sahlins (1972), Stone Age Economics; Hawkes & O'Connell (1981, American Anthropologist); Lee (1979), The !Kung San; Lee (1969), "Eating Christmas in the Kalahari", Natural History; Woodburn (1982), "Egalitarian Societies"; Cohen & Armelagos (1984), Paleopathology at the Origins of Agriculture; Diamond (1987), "The Worst Mistake in the History of the Human Race"; Suzman, Affluence Without Abundance (2017) and Work (2020); Raichlen et al. (2017, American Journal of Human Biology); Pontzer et al. (2012, PLoS ONE); Gurven & Kaplan (2007, Population and Development Review).
🐂 Previous episode: What Did Ancient Humans Actually Eat? Next: How Did Ancient Humans Raise Kids?`,
    tags: ['did ancient humans work less', 'hunter gatherer work hours', 'original affluent society', 'richard lee kalahari', 'marshall sahlins', 'how many hours did cavemen work', 'keynes 15 hour work week', 'eating christmas in the kalahari', 'ancient humans', 'human evolution', 'prehistory', 'anthropology', 'hunter gatherers', 'ju hoansi', 'work life balance history', 'history of work', 'early humans', 'animated history', 'history explained', 'how people lived', 'long story drawn'],
    hashtags: ['ancienthumans', 'work', 'history'],
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
      say: "{keynes}In 1930, the economist John Maynard Keynes made a prediction. {fifteen}By around 2030, he wrote, people would only need to work about fifteen hours a week. {now}It's almost 2030. {how}How's that going? {twist}Here's the twist: some anthropologists think your ancestors were already there.",
      sfx: [['pop', 'keynes'], ['ding', 'fifteen', 0.4], ['wahwah', 'how', 0.3], ['drumroll', 'twist', 0.3]],
      draw(k) {
        paper(k);
        k.char(420, 960, 460, { ...KEYNES, face: 'smug', pose: 'present', p: k.at('keynes', 0.5) });
        card(k, 420, 220, ['JOHN MAYNARD KEYNES', '1930'], 'keynes', { w: 560 });
        big(k, '15 HOURS / WEEK', 1240, 330, 'fifteen', { size: 90 });
        note(k, 'by ~2030', 1240, 440, 'fifteen', { size: 50, color: P.brown });
        k.group({ a: k.at('now', 0.4) }, () => {
          k.char(1300, 980, 400, { ...OFFICE, face: k.t > k.cue('how') ? 'blank' : 'sad', pose: 'hold' });
          k.prop('laptop', 1300, 840, 150);
          k.sweat(1370, 640, 1.4, { p: k.at('how', 0.4) });
        });
        k.text('…how\'s that going?', 1300, 530, { size: 54, font: 'title', color: P.ink, fx: 'pop', p: k.at('how', 0.4), outline: '#fffaf0', outlineWidth: 8 });
        k.text('YOUR ANCESTORS?', 960, 1010, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('twist', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{last}Last episode, we left Richard Lee in the Kalahari Desert with a notebook, counting hours. {series}This is episode four of a series on how your ancestors actually lived. {sub}If you're new, subscribing takes about one second, which is less work than anything in this video. {plan}Today: {a}what Lee found, {b}why it made hunter-gatherers famous, {c}the backlash, {d}and the strange custom of insulting a gift.",
      sfx: [['pop', 'last'], ['pop', 'sub', 0.5], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd']],
      draw(k) {
        paper(k);
        note(k, 'HOW YOUR ANCESTORS ACTUALLY LIVED', 960, 120, 'series', { size: 58, color: P.brown });
        note(k, 'Episode 4', 960, 200, 'series', { size: 44, color: P.red });
        k.group({ a: 1 - k.at('a', 0.3) }, () => k.char(960, 900, 420, { ...LEE, face: 'calm', pose: 'hold', prop: 'scroll', p: k.at('last', 0.5) }));
        const items = [['a', 'THE COUNT', 'clock'], ['b', 'AFFLUENT?', 'beehive'], ['c', 'BACKLASH', 'handaxe'], ['d', 'INSULT THE GIFT', 'ox']];
        items.forEach(([c, t, prop], i) => {
          const x = 300 + i * 440, p = k.at(c, 0.5);
          k.group({ x, y: 560, r: i % 2 ? 0.03 : -0.03, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-180, -200, 360, 400, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 1710 + i });
            if (prop === 'clock') k.icon('clock', 0, -40, 180); else k.prop(prop, 0, -40, 200);
            k.text(t, 0, 140, { size: 42, font: 'title', color: P.red, maxWidth: 330 });
          });
        });
        k.char(1760, 1060, 300, { ...YOU, face: 'happy', pose: 'wave', p: k.at('sub', 0.5) });
      },
    },

    // ---------------- Chapter 1: Counting the hours ----------------
    {
      chapter: 'Counting the hours',
      say: "{lee}In 1963, Richard Lee went to the Dobe area of the Kalahari, in Botswana, to live with the San people there. {count}For weeks, he wrote down who went out to find food, and for how long. {drought}And this was during a severe drought, when you'd expect people to be working flat out.",
      sfx: [['pop', 'lee'], ['scratch', 'count', 0.3], ['scratch', ['count', 1.5], 0.3], ['bonk', 'drought', 0.3]],
      draw(k) {
        chap(k, 'Counting the hours');
        ancient(k, { tx: 1640 });
        card(k, 520, 220, ['RICHARD LEE · 1963–64', 'Dobe, Kalahari · Ju/\'hoansi'], 'lee', { w: 640 });
        k.char(520, G + 30, 440, { ...LEE, face: 'calm', pose: 'hold', prop: 'scroll', p: k.at('lee', 0.5) });
        k.char(1080, G + 30, 380, { ...ANCW(), face: 'happy', prop: 'staff', walk: k.t > k.cue('count'), p: k.at('count', 0.5) });
        k.char(1300, G + 30, 380, { ...ANC({ hair: 'short' }), face: 'calm', prop: 'spear', walk: k.t > k.cue('count'), p: k.at('count', 0.5) });
        k.text('DROUGHT', 1300, 300, { size: 90, font: 'title', color: P.red, fx: 'pop', p: k.at('drought', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.icon('sun', 1500, 460, 160, { p: k.at('drought', 0.5) });
      },
    },
    {
      say: "{result}His result? {days}The average adult spent about two and a half days a week getting food. {hours}Roughly twelve to nineteen hours. {rest}The rest of the time? {visit}Visiting friends, {talk}talking, {games}playing games, {rest2}resting. {joke}Basically, a long weekend. Every week.",
      sfx: [['drumroll', 'result', 0.3], ['tada', 'days', 0.4], ['pop', 'visit'], ['pop', 'talk'], ['pop', 'games'], ['pop', 'rest2'], ['boing', 'joke', 0.3]],
      draw(k) {
        chap(k, 'Counting the hours');
        paper(k);
        week(k, 500, 220, 2.5, 'days');
        note(k, '≈ 2.5 days of food-getting', 960, 400, 'days', { size: 54, color: P.orange });
        big(k, '12–19 h / week', 960, 520, 'hours', { size: 110 });
        const acts = [['visit', 'house', 'visiting'], ['talk', 'heart', 'talking'], ['games', 'star', 'games'], ['rest2', 'sun', 'resting']];
        acts.forEach(([c, ic, t], i) => {
          const x = 420 + i * 360;
          k.icon(ic, x, 720, 110, { p: k.at(c, 0.4) });
          note(k, t, x, 820, c, { size: 44 });
        });
        k.text('A LONG WEEKEND. EVERY WEEK.', 960, 970, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    {
      say: "{farm}Lee also asked an obvious question. {neighbors}Some of their neighbors farmed and herded cattle. {why}So why not plant crops too? {quote}One man's answer became famous: {nuts}Why should we plant, when there are so many mongongo nuts in the world? {who}And not everyone even went out. {young}Children and teenagers did very little food-getting, {old}and older people were fed by the rest. {joke}Teenagers doing no chores: apparently a tradition older than farming.",
      sfx: [['pop', 'farm'], ['boing', 'why', 0.3], ['drumroll', 'quote', 0.2], ['tada', 'nuts', 0.4], ['pop', 'young'], ['pop', 'old'], ['wahwah', 'joke', 0.3]],
      draw(k) {
        chap(k, 'Counting the hours');
        ancient(k, { tx: 1680 });
        k.char(420, G + 30, 400, { ...LEE, face: 'calm', pose: k.t > k.cue('why') ? 'point' : 'hold', prop: k.t > k.cue('why') ? undefined : 'scroll' });
        k.char(900, G + 30, 420, { ...ANC({ hair: 'short' }), face: k.t > k.cue('nuts') ? 'smug' : 'calm', pose: k.t > k.cue('nuts') ? 'present' : 'stand', flip: true, p: k.at('farm', 0.5) });
        k.bubble(560, 200, 820, 190, 880, 520, { p: k.at('nuts', 0.4), text: '"Why should we plant, when there are so many mongongo nuts in the world?"', size: 40 });
        k.group({ a: k.at('who', 0.4) }, () => {
          k.char(1260, G + 30, 260, { ...KID, face: 'laugh', pose: 'cheer' });
          k.char(1420, G + 30, 320, { ...KID, body: 'man', face: 'blank', pose: 'hips' });
          k.char(1600, G + 30, 340, { ...ELDER, face: 'happy', prop: 'staff' });
        });
        note(k, 'little food-getting', 1430, 470, 'young', { size: 44, color: P.brown, fx: 'pop' });
        k.text('NO CHORES: AN ANCIENT TRADITION', 960, 1000, { size: 54, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 2: The original affluent society ----------------
    {
      chapter: 'The original affluent society',
      say: "{chicago}In 1966, Lee presented his numbers at a famous conference in Chicago called Man the Hunter. {sahlins}In the audience was anthropologist Marshall Sahlins. {name}He gave hunter-gatherers a name that stuck: {aff}the original affluent society.",
      sfx: [['pop', 'chicago'], ['pop', 'sahlins'], ['drumroll', 'name', 0.3], ['tada', 'aff', 0.5]],
      draw(k) {
        chap(k, 'The original affluent society');
        paper(k);
        card(k, 960, 180, ['"MAN THE HUNTER"', 'Chicago · 1966'], 'chicago', { w: 560 });
        k.char(560, 960, 440, { ...LEE, face: 'happy', pose: 'present', p: k.at('chicago', 0.5) });
        k.char(1360, 960, 460, { ...SAHLINS, face: k.t > k.cue('aff') ? 'smug' : 'calm', pose: k.t > k.cue('name') ? 'present' : 'think', p: k.at('sahlins', 0.5) });
        note(k, 'Marshall Sahlins', 1360, 1010, 'sahlins', { size: 46 });
        k.text('THE ORIGINAL', 960, 330, { size: 70, font: 'title', color: P.brown, fx: 'pop', p: k.at('aff', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.text('AFFLUENT SOCIETY', 960, 420, { size: 90, font: 'title', color: P.red, fx: 'pop', p: k.at(k.cue('aff', 0.3), 0.4), outline: '#fffaf0', outlineWidth: 14 });
      },
    },
    {
      say: "{two}His idea: there are two roads to being rich. {more}One is to produce a lot. {less}The other is to want very little. {zen}He called the second one the Zen road to affluence. {carry}If you move camp every few weeks, owning lots of stuff isn't wealth. {burden}It's luggage.",
      sfx: [['pop', 'more'], ['pop', 'less'], ['sparkle', 'zen', 0.4], ['bonk', 'burden', 0.3]],
      draw(k) {
        chap(k, 'The original affluent society');
        paper(k);
        k.text('TWO ROADS TO RICH', 960, 140, { size: 80, font: 'title', color: P.ink, fx: 'pop', p: k.at('two', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.line(960, 240, 960, 760, { stroke: '#cfc6b8', width: 4, seed: 1720 });
        note(k, 'PRODUCE MORE', 480, 270, 'more', { size: 56, color: P.brown, fx: 'pop' });
        k.char(480, 760, 380, { ...OFFICE, face: 'sad', p: k.at('more', 0.5) });
        k.prop('laptop', 300, 640, 140, { p: k.at('more', 0.5) });
        k.prop('snack', 660, 640, 110, { p: k.at('more', 0.5) });
        note(k, 'WANT LESS', 1440, 270, 'less', { size: 56, color: P.grass, fx: 'pop' });
        k.char(1440, 760, 380, { ...ANCW(), face: 'happy', pose: 'cheer', p: k.at('less', 0.5) });
        note(k, 'the "Zen road"', 1440, 830, 'zen', { size: 46, color: P.grass });
        k.text('stuff = luggage', 960, 960, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('burden', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{famous}The idea went everywhere. {books}Textbooks, documentaries, magazine articles. {pic}Hunter-gatherers as the original laid-back humans, {chill}working a few hours, then chilling by the fire. {but}But not everyone was convinced.",
      sfx: [['pop', 'books'], ['pop', 'pic'], ['sparkle', 'chill', 0.3], ['scratch', 'but', 0.5]],
      draw(k) {
        chap(k, 'The original affluent society', true);
        campNight(k, { fx: 960, fs: 240 });
        k.char(620, G + 40, 360, { ...ANC(), face: 'happy', pose: 'hips' });
        k.char(1320, G + 40, 360, { ...ANCW(), face: 'laugh', flip: true });
        glow(k, 960, G - 100, 800, 0.4);
        [['books', 'TEXTBOOKS'], [k.cue('books', 0.5), 'DOCUMENTARIES'], [k.cue('books', 1), 'MAGAZINES']].forEach(([c, t], i) => note(k, t, 420 + i * 540, 220, c, { size: 54, color: P.yellow, outline: P.ink, fx: 'pop' }));
        k.text('the original laid-back humans', 960, 380, { size: 56, font: 'title', color: '#fff3c4', p: k.at('pic', 1.4, 'linear'), outline: P.ink, outlineWidth: 10 });
        k.icon('question', 1650, 600, 160, { p: k.at('but', 0.4), stroke: P.red });
      },
    },

    // vòng mở → tập 5 (giữa video)
    {
      say: "{kids}And one question the hours didn't answer: {who}while the adults were out finding food, who was looking after the kids? {aka}In the forests of Central Africa, there's a society where fathers hold their babies more than fathers anywhere else that's been studied. {next}That's the next episode.",
      sfx: [['pop', 'kids'], ['boing', 'who', 0.3], ['sparkle', 'aka', 0.4], ['ding', 'next', 0.4]],
      draw(k) {
        savanna(k, { trees: [[300, 420], [1640, 460]] });
        k.char(760, G + 30, 300, { ...KID, face: 'happy', pose: 'cheer', p: k.at('kids', 0.5) });
        k.char(980, G + 30, 260, { ...KID, hair: 'long', face: 'laugh', p: k.at('kids', 0.5) });
        k.icon('question', 880, 420, 150, { p: k.at('who', 0.5), stroke: P.red });
        k.char(1360, G + 30, 440, { ...ANC({ hair: 'short' }), face: 'happy', pose: 'hold', p: k.at('aka', 0.5) });
        k.char(1400, G - 130, 130, { ...KID, face: 'sleep', shadow: false, p: k.at('aka', 0.5) });
        note(k, 'dads who hold babies', 1360, 330, 'aka', { size: 48, color: P.brown, fx: 'pop' });
        k.text('NEXT EPISODE →', 960, 1000, { size: 56, font: 'title', color: P.red, fx: 'pop', p: k.at('next', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 3: The backlash ----------------
    {
      chapter: 'The backlash',
      say: "{critics}In 1981, anthropologists Kristen Hawkes and James O'Connell pointed out a problem, using their own work with the Alyawara people of Australia. {food}Getting food is only half the job. {crack}You still have to crack the nuts, {dig}clean the roots, {cook}cook, {tools}make and repair your tools, {wood}fetch firewood and water. {count}Count all of that, and the work week gets a lot longer.",
      sfx: [['scratch', 'critics', 0.4], ['pop', 'crack'], ['pop', 'dig'], ['pop', 'cook'], ['pop', 'tools'], ['pop', 'wood'], ['bonk', 'count', 0.3]],
      draw(k) {
        chap(k, 'The backlash');
        paper(k);
        card(k, 520, 200, ['HAWKES & O\'CONNELL, 1981', 'American Anthropologist'], 'critics', { w: 680 });
        k.char(520, 900, 400, { ...HAWKES, face: 'smug', pose: 'point', p: k.at('critics', 0.5) });
        note(k, 'GETTING FOOD = ½ THE JOB', 1340, 200, 'food', { size: 52, color: P.red, fx: 'pop' });
        const jobs = [['crack', 'rock', 'crack nuts'], ['dig', 'tuber', 'clean roots'], ['cook', 'campfire', 'cook'], ['tools', 'handaxe', 'make tools'], ['wood', 'nest', 'firewood & water']];
        jobs.forEach(([c, prop, t], i) => {
          const x = 1000 + (i % 3) * 300, y = 400 + Math.floor(i / 3) * 260;
          k.prop(prop, x, y, 140, { p: k.at(c, 0.5), fire: 0.7 });
          note(k, t, x, y + 110, c, { size: 38 });
        });
        k.text('WORK WEEK ↑', 1300, 980, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('count', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{lee2}And Lee himself did a fuller count later. {all}Food, plus tools, plus housework. {total}His total came to roughly forty to forty-five hours a week. {you}Which is, well, about the same as a full-time job. {joke}Keynes would be devastated.",
      sfx: [['pop', 'lee2'], ['pop', 'all'], ['drumroll', 'total', 0.3], ['tada', ['total', 1.5], 0.4], ['wahwah', 'joke', 0.3]],
      draw(k) {
        chap(k, 'The backlash');
        paper(k);
        card(k, 480, 200, ['LEE, 1979', '"The !Kung San"'], 'lee2', { w: 480 });
        // thanh xếp chồng
        const x0 = 260, y = 420, w = 1400, tot = 43;
        const parts = [['all', 'food', 17, P.orange], [k.cue('all', 0.6), 'tools', 7, P.brown], [k.cue('all', 1.2), 'housework', 19, P.grass]];
        let acc = 0;
        parts.forEach(([c, t, h, col], i) => {
          const p = k.at(c, 0.6);
          k.rect(x0 + (acc / tot) * w, y, (h / tot) * w * p, 120, { fill: col, fillStyle: 'solid', width: 4, p: k.at(c, 0.2), seed: 1730 + i });
          k.text(t, x0 + ((acc + h / 2) / tot) * w, y + 60, { size: 44, font: 'title', color: '#fff', p: p > 0.5 ? 1 : 0, outline: P.ink, outlineWidth: 6 });
          acc += h;
        });
        big(k, '≈ 40–45 h / week', 960, 680, 'total', { size: 110 });
        k.char(1560, 1040, 320, { ...OFFICE, face: 'shock', p: k.at('you', 0.5) });
        note(k, '= a full-time job', 960, 800, 'you', { size: 56, color: P.brown });
        k.char(360, 1040, 320, { ...KEYNES, face: 'sad', p: k.at('joke', 0.5) });
        k.sweat(420, 760, 1.2, { p: k.at('joke', 0.4) });
      },
    },

    // ---------------- Chapter 4: So who wins? ----------------
    {
      chapter: 'So who wins?',
      say: "{same}So, same hours as you? {not}Not quite. {kind}It's a different kind of work. {boss}No boss. {sched}No fixed schedule: if you didn't feel like hunting today, you didn't. {social}Most jobs were done in groups, talking and joking. {mix}And the line between work and life was blurry. {joke}Nobody in the Kalahari ever had a meeting that could have been an email.",
      sfx: [['scratch', 'not', 0.4], ['pop', 'boss'], ['pop', 'sched'], ['pop', 'social'], ['boing', 'joke', 0.3]],
      draw(k) {
        chap(k, 'So who wins?');
        paper(k);
        k.text('DIFFERENT KIND OF WORK', 960, 140, { size: 80, font: 'title', color: P.ink, fx: 'pop', p: k.at('kind', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        const rows = [['boss', 'NO BOSS'], ['sched', 'NO FIXED SCHEDULE'], ['social', 'WORK IN GROUPS'], ['mix', 'WORK ≈ LIFE']];
        rows.forEach(([c, t], i) => { k.icon('check', 300, 300 + i * 130, 80, { p: k.at(c, 0.4) }); k.text(t, 380, 300 + i * 130, { size: 56, font: 'title', align: 'left', color: P.grass, p: k.at(c, 1, 'linear') }); });
        k.char(1480, 860, 380, { ...ANCW(), face: 'laugh', p: k.at('social', 0.5) });
        k.char(1700, 860, 300, { ...ANC(), face: 'happy', flip: true, p: k.at('social', 0.5) });
        k.prop('laptop', 1500, 280, 180, { p: k.at('joke', 0.4) });
        redX(k, 1500, 280, 100, 'joke');
        k.text('no meetings', 1500, 400, { size: 46, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 8 });
      },
    },
    {
      say: "{body}It was also work for the body. {raichlen}In a 2017 study, David Raichlen and his colleagues put heart-rate monitors on Hadza adults. {two}They got about two hours of moderate to vigorous activity a day. {us}That's many times more than the average American. {pontzer}But here's the strange part. {same}In 2012, Herman Pontzer's team found that Hadza adults burn about the same number of calories per day as people in industrial countries. {adapt}The body adjusts its budget. {joke}Which is rude, frankly.",
      sfx: [['pop', 'raichlen'], ['tada', 'two', 0.4], ['pop', 'us'], ['scratch', 'pontzer', 0.3], ['ding', 'same', 0.4], ['wahwah', 'joke', 0.3]],
      draw(k) {
        chap(k, 'So who wins?');
        paper(k);
        card(k, 480, 200, ['RAICHLEN ET AL., 2017', 'Hadza heart-rate monitors'], 'raichlen', { w: 600 });
        k.char(480, 900, 420, { ...ANC({ hair: 'short' }), face: 'happy', walk: true, prop: 'spear', p: k.at('raichlen', 0.5) });
        k.prop('heart', 600, 520, 90, { p: k.at('raichlen', 0.4), bob: 6 });
        big(k, '~2 h / day', 480, 380, 'two', { size: 80, color: P.grass });
        note(k, 'moderate–vigorous activity', 480, 460, 'two', { size: 38 });
        card(k, 1440, 200, ['PONTZER ET AL., 2012', 'daily energy use'], 'pontzer', { w: 560, r: 0.02, seed: 1770 });
        k.char(1300, 900, 360, { ...ANCW(), face: 'calm', p: k.at('same', 0.5) });
        k.char(1600, 900, 360, { ...OFFICE, face: 'shock', p: k.at('same', 0.5) });
        k.text('=', 1450, 620, { size: 120, font: 'title', color: P.red, fx: 'pop', p: k.at('same', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        note(k, 'about the same calories / day', 1450, 980, 'same', { size: 46, color: P.red });
        note(k, 'the body adjusts its budget', 1450, 1040, 'adapt', { size: 38, color: '#6b5f55' });
      },
    },
    {
      say: "{share}And there was another trick: sharing. {woodburn}Anthropologist James Woodburn, who studied the Hadza, called these immediate-return societies. {eat}Food is shared out and eaten soon. {store}Little is stored, {owe}and nobody piles up more than they need. {why}After all, why work extra hours for meat you'll just have to give away?",
      sfx: [['pop', 'share'], ['pop', 'woodburn'], ['pop', 'eat'], ['pop', 'store'], ['boing', 'why', 0.3]],
      draw(k) {
        chap(k, 'So who wins?', true);
        campNight(k, { fx: 960, fs: 220 });
        card(k, 520, 200, ['JAMES WOODBURN, 1982', '"immediate-return" societies'], 'woodburn', { w: 680 });
        const ppl = [[520, ANC()], [760, ANCW()], [1160, ELDER], [1400, KID]];
        ppl.forEach(([x, pre], i) => k.char(x, G + 40, pre === KID ? 280 : 340, { ...pre, face: 'happy', flip: x > 960, pose: 'hold' }));
        ppl.forEach(([x], i) => k.prop('meat', x + (x > 960 ? -40 : 40), G - 150, 80, { p: k.at(k.cue('eat', i * 0.3), 0.4), rotate: -0.3 }));
        glow(k, 960, G - 100, 820, 0.4);
        note(k, 'shared · eaten soon · little stored', 1300, 380, 'store', { size: 46, color: '#fff3c4', outline: P.ink });
        k.text('WHY HOARD?', 1300, 480, { size: 70, font: 'title', color: P.yellow, fx: 'pop', p: k.at('why', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 5: Insulting the meat ----------------
    {
      chapter: 'Insulting the meat',
      say: "{xmas}Which brings us back to Richard Lee, and a very awkward Christmas. {gift}To thank the people he'd lived with, Lee bought the biggest, fattest ox he could find, for a Christmas feast. {reaction}The reaction? {bones}A bag of bones, people told him. {thin}Skinny. Old. {embar}Barely worth cooking.",
      sfx: [['sparkle', 'xmas', 0.4], ['tada', 'gift', 0.4], ['drumroll', 'reaction', 0.2], ['wahwah', 'bones', 0.4], ['bonk', 'thin', 0.3]],
      draw(k) {
        chap(k, 'Insulting the meat');
        ancient(k, { tx: 1680 });
        card(k, 480, 200, ['LEE, 1969', '"Eating Christmas in the Kalahari"'], 'xmas', { w: 660 });
        k.prop('ox', 960, G - 150, 420, { p: k.at('gift', 0.5), fat: 1 });
        k.char(560, G + 30, 420, { ...LEE, face: k.t > k.cue('bones') ? 'shock' : 'happy', pose: k.t > k.cue('bones') ? 'shrug' : 'present', p: k.at('gift', 0.5) });
        k.char(1360, G + 30, 400, { ...ANC({ hair: 'short' }), face: 'smug', pose: 'point', flip: true, p: k.at('reaction', 0.5) });
        k.char(1580, G + 30, 380, { ...ANCW(), face: 'smug', pose: 'hips', flip: true, p: k.at('reaction', 0.5) });
        k.bubble(1160, 300, 620, 140, 1360, 520, { p: k.at('bones', 0.4), text: '"A bag of bones!"', size: 50 });
        k.text('SKINNY? OLD?', 960, 480, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at('thin', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.sweat(620, 500, 1.4, { p: k.at('embar', 0.4) });
      },
    },
    {
      say: "{feast}Then they cooked it, {fat}and it was fat, delicious, and more than enough for everyone. {why}So why the insults? {explain}One man explained it to Lee. {big}When someone brings in a lot of meat, he can start to think he's a big man, a chief. {cool}So you talk his meat down, {gentle}to cool his heart, and make him gentle. {equal}Mockery as a tool for equality.",
      sfx: [['whoosh', 'feast', 0.3], ['tada', 'fat', 0.4], ['boing', 'why', 0.3], ['pop', 'big'], ['ding', 'gentle', 0.4]],
      draw(k) {
        chap(k, 'Insulting the meat', true);
        campNight(k, { fx: 960, fs: 260 });
        k.prop('meat', 960, G - 260, 200, { p: k.at('fat', 0.5), rotate: -0.3 });
        k.char(560, G + 40, 380, { ...LEE, face: k.t > k.cue('explain') ? 'calm' : 'happy', pose: k.t > k.cue('fat') ? 'cheer' : 'stand' });
        k.char(1360, G + 40, 380, { ...ELDER, face: 'smug', pose: k.t > k.cue('explain') ? 'present' : 'stand', flip: true });
        glow(k, 960, G - 100, 820, 0.4);
        k.text('FAT & DELICIOUS', 960, 200, { size: 70, font: 'title', color: P.yellow, fx: 'pop', p: k.at('fat', 0.4) * (1 - k.at('explain', 0.3)), outline: P.ink, outlineWidth: 12 });
        k.bubble(1100, 160, 720, 170, 1300, 520, { p: k.at('cool', 0.4), text: '"We cool his heart and make him gentle."', size: 40 });
        k.text('MOCKERY → EQUALITY', 960, 1000, { size: 64, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at('equal', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 6: Then came farming ----------------
    {
      chapter: 'Then came farming',
      say: "{farm}Then, starting around twelve thousand years ago, some people began to farm. {fields}Farming meant clearing fields, {plant}planting, {weed}weeding, {guard}guarding the harvest, {store}and storing grain for the months ahead. {bones}And the skeletons tell a story. {cohen}In 1984, Mark Cohen and George Armelagos brought together studies of early farming populations around the world. {teeth}In many places, people got more tooth decay, {stress}more signs of malnutrition, {short}and often became shorter than the foragers before them.",
      sfx: [['pop', 'farm'], ['pop', 'plant'], ['pop', 'weed'], ['pop', 'guard'], ['pop', 'store'], ['pop', 'cohen'], ['bonk', 'teeth', 0.3], ['bonk', 'stress', 0.3], ['slideDown', 'short', 0.3]],
      draw(k) {
        chap(k, 'Then came farming');
        savanna(k, { trees: [] });
        for (let i = 0; i < 9; i++) k.prop('bamboo', 1040 + (i % 5) * 150, G - 50 - Math.floor(i / 5) * 40, 110, { p: k.at('plant', 0.5), fill: '#d9c06a', leaf: '#c9a24a' });
        k.char(560, G + 30, 420, { ...ANC({ outfit: 'tunic', color: '#8a6a4a', hair: 'short' }), face: k.t > k.cue('bones') ? 'sad' : 'calm', pose: 'hold', prop: 'staff', p: k.at('farm', 0.5) });
        k.sweat(620, 520, 1.3, { p: k.at('weed', 0.4) });
        const jobs = [['fields', 'CLEAR'], ['plant', 'PLANT'], ['weed', 'WEED'], ['guard', 'GUARD'], ['store', 'STORE']];
        jobs.forEach(([c, t], i) => note(k, t, 260 + i * 350, 200, c, { size: 54, color: P.brown, fx: 'pop' }));
        card(k, 1340, 380, ['COHEN & ARMELAGOS, 1984', 'early farmers, worldwide'], 'cohen', { w: 640 });
        const items = [['teeth', 'more tooth decay'], ['stress', 'more malnutrition'], ['short', 'often shorter']];
        items.forEach(([c, t], i) => note(k, t, 1340, 530 + i * 60, c, { size: 40, color: P.red, fx: 'pop' }));
      },
    },
    {
      say: "{diamond}In 1987, the writer Jared Diamond called farming the worst mistake in the history of the human race. {strong}That's probably too strong: farming also fed far more people, and built cities, writing, and eventually, this video. {suzman}But anthropologist James Suzman, who has spent decades with the San of the Kalahari, points to a real shift. {future}Foragers mostly worked for today. {farmers}Farmers had to work for the future. {never}And work for the future is never really finished.",
      sfx: [['bonk', 'diamond', 0.4], ['ding', 'strong', 0.3], ['pop', 'suzman'], ['pop', 'future'], ['pop', 'farmers'], ['wahwah', 'never', 0.3]],
      draw(k) {
        chap(k, 'Then came farming');
        paper(k);
        card(k, 480, 200, ['JARED DIAMOND, 1987', '"The Worst Mistake…"'], 'diamond', { w: 560 });
        k.text('TOO STRONG?', 480, 380, { size: 64, font: 'title', color: P.orange, fx: 'pop', p: k.at('strong', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        note(k, '+ more people · cities · writing', 480, 470, 'strong', { size: 42, color: P.grass });
        card(k, 1420, 200, ['JAMES SUZMAN', '"Work: A Deep History" · 2020'], 'suzman', { w: 620, r: 0.02, seed: 1760 });
        k.line(960, 560, 960, 960, { stroke: '#cfc6b8', width: 4, seed: 1761 });
        note(k, 'FORAGERS', 480, 600, 'future', { size: 56, color: P.grass, fx: 'pop' });
        note(k, 'work for today', 480, 680, 'future', { size: 46 });
        k.icon('sun', 480, 820, 130, { p: k.at('future', 0.5) });
        note(k, 'FARMERS', 1440, 600, 'farmers', { size: 56, color: P.brown, fx: 'pop' });
        note(k, 'work for the future', 1440, 680, 'farmers', { size: 46 });
        k.icon('clock', 1440, 820, 130, { p: k.at('farmers', 0.5) });
        k.text('…never finished', 1440, 980, { size: 54, font: 'title', color: P.red, fx: 'pop', p: k.at('never', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 7: Not paradise ----------------
    {
      chapter: 'Not paradise',
      say: "{but}Now, before you quit your job and move to the desert: {not}this was not paradise. {kids}In a 2007 review, Michael Gurven and Hillard Kaplan found that in hunter-gatherer groups, only about fifty-seven percent of children survived to age fifteen. {four}Roughly four in ten did not. {adults}But those who made it to adulthood often lived into their late sixties and seventies. {hard}A hard life, with fewer hours on the clock.",
      sfx: [['scratch', 'but', 0.4], ['pop', 'kids'], ['bonk', 'four', 0.2], ['ding', 'adults', 0.3]],
      draw(k) {
        chap(k, 'Not paradise');
        paper(k);
        k.text('NOT PARADISE', 960, 140, { size: 90, font: 'title', color: P.ink, fx: 'pop', p: k.at('not', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        card(k, 520, 300, ['GURVEN & KAPLAN, 2007', 'Population and Development Review'], 'kids', { w: 720 });
        for (let i = 0; i < 10; i++) k.char(240 + i * 150, 760, 200, { ...KID, color: i < 6 ? '#a87b4f' : '#cfc6b8', color2: i < 6 ? '#7a5432' : '#b9b3a8', skin: i < 6 ? '#d9a77c' : '#d9d4cb', face: i < 6 ? 'calm' : 'blank', alpha: i < 6 ? 1 : 0.5, p: k.at(k.cue('kids', 1 + i * 0.1), 0.4) });
        note(k, '~57% reached age 15', 960, 860, 'kids', { size: 52, color: P.brown });
        big(k, '≈ 4 in 10 did not', 1340, 470, 'four', { size: 70 });
        note(k, 'adults often lived into their late 60s–70s', 960, 970, 'adults', { size: 46, color: P.grass });
      },
    },

    // ---------------- Ending ----------------
    {
      chapter: 'Back to Keynes',
      say: "{back}So, back to Keynes and his fifteen-hour week. {right}Your ancestors probably didn't work fewer total hours than you. {but}But they worked differently. {owned}They owned less, {shared}shared more, {time}and had more time with the people they lived with. {q}And maybe that's the real question. {notmore}Not how many hours you work, {forwhat}but what you're working for.",
      sfx: [['whoosh', 'back', 0.4], ['pop', 'owned'], ['pop', 'shared'], ['pop', 'time'], ['ding', 'forwhat', 0.4]],
      draw(k) {
        chap(k, 'Back to Keynes', true);
        campNight(k, { fx: 1300, fs: 220 });
        k.char(1100, G + 40, 340, { ...ANCW(), face: 'happy' });
        k.char(1500, G + 40, 340, { ...ANC(), face: 'laugh', flip: true });
        glow(k, 1300, G - 100, 700, 0.4);
        k.char(420, G + 40, 380, { ...OFFICE, face: k.t > k.cue('forwhat') ? 'calm' : 'blank', pose: k.t > k.cue('q') ? 'think' : 'hold' });
        k.prop('laptop', 420, G - 230, 140, { p: 1 - k.at('q', 0.6) });
        const words = [['owned', 'OWNED LESS'], ['shared', 'SHARED MORE'], ['time', 'MORE TIME TOGETHER']];
        words.forEach(([c, t], i) => note(k, t, 1300, 220 + i * 90, c, { size: 54, color: P.yellow, outline: P.ink, fx: 'pop' }));
        k.text('not how many hours —', 960, 900, { size: 54, font: 'title', color: '#d9d3e8', fx: 'fade', p: k.at('notmore', 0.5), outline: P.ink, outlineWidth: 10 });
        k.text('but what for?', 960, 990, { size: 70, font: 'title', color: P.yellow, fx: 'pop', p: k.at('forwhat', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },

    // ---------------- Recap ----------------
    {
      chapter: 'Recap',
      say: "{remind}Before the recap: remember those dads who hold their babies. That's next time. {t}Quick recap. {a}Richard Lee found hunter-gatherers spent just two to three days a week getting food. {b}Marshall Sahlins called them the original affluent society. {c}Critics showed that processing and other chores made the work week much longer. {d}Insulting the meat kept everyone equal. {e}And it wasn't paradise, but the work was very different from yours.",
      sfx: [['ding', 'remind', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['pop', 'e']],
      draw(k) {
        k.group({ a: 1 - k.at('t', 0.4) }, () => {
          savanna(k, { trees: [[1640, 460]] });
          k.char(960, G + 30, 440, { ...ANC({ hair: 'short' }), face: 'happy', pose: 'hold' });
          k.char(1000, G - 130, 130, { ...KID, face: 'sleep', shadow: false });
          k.text('remember the dads', 960, 260, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at(k.cue('remind', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 10 });
        });
        k.group({ a: k.at('t', 0.4) }, () => {
          paper(k);
          k.text('RECAP', 960, 110, { size: 80, font: 'title', color: P.red, p: k.at('t', 0.8, 'linear') });
          const rows = [['a', 'clock', '2–3 days a week getting food'], ['b', 'beehive', '"The original affluent society"'], ['c', 'handaxe', 'Count all chores: ~40–45 h'], ['d', 'ox', 'Insulting the meat = equality'], ['e', 'campfire', 'Not paradise — but different work']];
          rows.forEach(([c, prop, t], i) => {
            const y = 250 + i * 160;
            if (prop === 'clock') k.icon('clock', 300, y, 100, { p: k.at(c, 0.5) }); else k.prop(prop, 300, y, 120, { p: k.at(c, 0.5) });
            k.text(t, 400, y, { size: 56, font: 'title', align: 'left', p: k.at(c, 1.4, 'linear'), color: P.ink });
          });
        });
      },
    },
    nextEpisodeScene({
      lang: 'en',
      say: "{next}Next episode: how did ancient humans raise kids? {hook}Why do babies in some hunter-gatherer camps get passed between so many hands, {dads}and why are those dads so hands-on? {when}Coming soon.",
      title: 'How Did Ancient Humans Raise Kids?',
      hook: 'The dads who hold their babies more than anyone.',
      when: 'COMING SOON',
      art: (k) => {
        k.char(-200, 150, 260, { ...ANC({ hair: 'short' }), face: 'happy', pose: 'hold' });
        k.char(-170, 40, 85, { ...KID, face: 'sleep', shadow: false });
        k.char(160, 150, 240, { ...ANCW(), face: 'happy', pose: 'wave' });
        k.char(330, 150, 160, { ...KID, face: 'laugh' });
      },
      sfx: [['sparkle', 'hook', 0.3]],
    }),
    subscribeScene({
      lang: 'en',
      say: "{q}If you could cut your work week to fifteen hours, what would you do with the rest? Put it in the comments. {sub}And subscribe, so you don't miss what happened next.",
      question: '15-hour work week: what would you do?',
      channel: 'Long Story Drawn',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
