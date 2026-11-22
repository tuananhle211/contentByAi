// Long Story Drawn — Ep 1: How Did Ancient Humans Actually Sleep? (series "how your ancestors actually lived")
// Fact check:
//  Chimpanzees build a fresh sleeping nest in the trees almost every night.
//  Tree-to-ground sleep with Homo erectus (~2 Mya): hypothesis (Coolidge & Wynn; Samson & Nunn 2015) — said as "some researchers think".
//  Wonderwerk Cave, South Africa: burned bone + plant ash ~1 million years old (Berna et al. 2012, PNAS).
//  Border Cave, South Africa: grass bedding ~200,000 years old, laid on ash — likely to deter crawling insects (Wadley et al. 2020, Science).
//  Sibudu Cave: bedding ~77,000 years old with Cape laurel (Cryptocarya woodii) leaves, insecticidal/larvicidal chemicals; bedding burned periodically (Wadley et al. 2011, Science).
//  Siegel et al. 2015 (Current Biology): Hadza (Tanzania), San (Namibia), Tsimane (Bolivia); 5.7–7.1 h sleep; onset ~3.3 h after sunset on average;
//    sleep onset during falling temperature, wake near the coldest point; chronic insomnia rare — San and Tsimane have no word for it.
//  CDC: about 1 in 3 US adults don't get the recommended ≥7 hours.
//  Samson et al. 2017 (Proc. R. Soc. B): 33 Hadza adults, 20 days, ~220 h; all asleep simultaneously only 18 min. "Poorly sleeping grandparent" hypothesis.
//  Roger Ekirch (Virginia Tech): "first sleep"/"second sleep" in pre-industrial Europe (At Day's Close, 2005).
//  Thomas Wehr (NIMH, 1992): 14 h darkness/day for weeks → sleep split into two blocks with quiet wakefulness between.
//  Siegel's groups mostly did NOT show segmented sleep → no single "natural" pattern (stated as such).
//  Next episode (fire): Wiessner 2014 (PNAS) — Ju/'hoansi day talk is mostly economics/complaints/gossip, night firelight talk ~81% stories; Wrangham cooking hypothesis (debated).
// Respect: hunter-gatherer societies are contemporary people, not "living fossils" — never called primitive.
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import * as thumbs from '/videos/011-how-ancient-humans-slept/thumbs.js';

const P = { orange: '#F58220', sky: '#7FB5D5', sky2: '#ABD3E5', grass: '#4E9A45', sand: '#D2B488', brown: '#8B5A2B', stone: '#8A8A8A', night: '#283A6E', indigo: '#322B5E', red: '#E0302B', yellow: '#F4C430', cream: '#F5F1E6', ink: '#3b2f2a' };
const G = 860;
const YOU = { body: 'man', outfit: 'tunic', color: '#D9A21B', color2: P.grass, hair: 'short', hairColor: '#2b1d16', hat: 'band' };
const ANC = (extra = {}) => ({ body: 'man', outfit: 'bare', color: '#a87b4f', color2: '#7a5432', hair: 'long', hairColor: '#3a2a1e', skin: '#d9a77c', ...extra });
const ANCW = (extra = {}) => ({ body: 'woman', outfit: 'dress', color: '#b98a5a', color2: '#7a5432', hair: 'long', hairColor: '#3a2a1e', skin: '#c99a70', ...extra });
const ELDER = { body: 'woman', outfit: 'dress', color: '#9a7550', color2: '#6b4a33', hair: 'bun', hairColor: '#d9d4cb', skin: '#c99a70' };
const KID = { body: 'kid', outfit: 'bare', color: '#a87b4f', color2: '#7a5432', hair: 'short', hairColor: '#3a2a1e', skin: '#d9a77c' };
const SCI = (extra = {}) => ({ body: 'man', outfit: 'tunic', color: '#c2a46b', color2: P.brown, hair: 'short', hat: 'safari', ...extra });
const HIST = { body: 'man', outfit: 'robe', color: '#5a6b8a', color2: '#c9a24a', hair: 'short', hairColor: '#7a6a5a', beard: true, beardColor: '#8a7a6a' };

// ---------- nền ----------
function flat(k, sky, ground, gy = G) {
  const { ctx } = k;
  ctx.fillStyle = sky; ctx.fillRect(0, 0, k.W, k.H);
  ctx.beginPath(); ctx.moveTo(-20, k.H + 20); ctx.lineTo(-20, gy);
  for (let x = 0; x <= k.W + 40; x += 120) ctx.quadraticCurveTo(x - 60, gy - 14 * Math.sin(x * 0.01), x, gy);
  ctx.lineTo(k.W + 20, k.H + 20); ctx.closePath();
  ctx.fillStyle = ground; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = P.ink; ctx.stroke();
}
const disc = (k, x, y, r, color) => { const { ctx } = k; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); };
// Tiền sử: trời cam, đất cát, cây keo đơn độc.
function ancient(k, o = {}) {
  flat(k, P.orange, P.sand);
  disc(k, o.sx ?? 1480, o.sy ?? 330, 150, '#F79A45');
  disc(k, o.sx ?? 1480, o.sy ?? 330, 110, P.yellow);
  if (o.tree !== false) k.prop('acacia', o.tx ?? 1600, G - 170, 380);
}
function savanna(k, o = {}) {
  flat(k, P.sky, P.sand);
  disc(k, 1700, 180, 70, P.yellow);
  for (const [x, s] of o.trees ?? [[300, 300], [1600, 360]]) k.prop('acacia', x, G - s * 0.45, s);
}
function stars(k, n = 40, h = 520) {
  for (let i = 0; i < n; i++) k.dot(k.rand(i) * k.W, k.rand(i + 70) * h, 2 + k.rand(i + 9) * 3, '#fff7d6', 0.55 + 0.45 * Math.sin((k.gt ?? 0) * 1.5 + i));
}
function night(k, o = {}) {
  flat(k, o.sky ?? P.indigo, o.ground ?? '#4a3f5e');
  stars(k);
  if (o.moon !== false) k.prop('moon', o.mx ?? 1660, o.my ?? 170, 220);
}
function paper(k, color = P.cream) { k.ctx.fillStyle = color; k.ctx.fillRect(0, 0, k.W, k.H); }

// ---------- chữ ----------
function chap(k, text, dark = false) {
  k.text(text, 60, 56, { size: 30, align: 'left', color: dark ? '#d9d3e8' : '#6b5f55', fx: 'fade', p: k.at(0, 0.6), outline: dark ? '#1b1b24' : '#fffaf0', outlineWidth: 8 });
}
// Chữ khái niệm: chữ in hoa đỏ viền.
function big(k, s, x, y, cue, o = {}) {
  return k.text(s, x, y, { size: o.size ?? 110, font: 'title', color: o.color ?? P.red, fx: 'pop', p: k.at(cue, 0.5), outline: o.outline ?? '#fffaf0', outlineWidth: o.ow ?? 16, maxWidth: o.maxWidth });
}
function note(k, s, x, y, cue, o = {}) {
  return k.text(s, x, y, { size: o.size ?? 48, font: 'title', color: o.color ?? P.ink, fx: o.fx ?? 'fade', p: k.at(cue, 0.6), outline: o.outline ?? '#fffaf0', outlineWidth: o.ow ?? 10, maxWidth: o.maxWidth, align: o.align });
}
// Dấu X đỏ "không phải thế".
function redX(k, x, y, r, cue) {
  const p = k.at(cue, 0.5);
  k.line(x - r, y - r, x + r, y + r, { p: Math.min(1, p * 2), stroke: P.red, width: 22, seed: 901 });
  k.line(x + r, y - r, x - r, y + r, { p: Math.max(0, p * 2 - 1), stroke: P.red, width: 22, seed: 902 });
}
// Nhân vật nằm ngủ: chân tại (x, y), đầu về bên trái.
function lying(k, x, y, size, preset, o = {}) {
  k.group({ x, y: y - size * 0.13, r: -Math.PI / 2, a: o.a ?? 1 }, () => k.char(0, 0, size, { ...preset, face: o.face ?? 'sleep', shadow: false, pose: o.pose ?? 'stand' }));
}
function zzz(k, x, y, cue, s = 1) {
  const t = k.gt ?? 0;
  for (let i = 0; i < 3; i++) {
    const u = (t * 0.5 + i / 3) % 1;
    k.text('z', x + u * 60 * s, y - u * 120 * s, { size: (34 + i * 10) * s, font: 'title', color: '#ABD3E5', p: k.at(cue, 0.5) * Math.sin(u * Math.PI), outline: P.ink, outlineWidth: 6 });
  }
}
// Thẻ nghiên cứu: tên + năm + nơi.
function card(k, x, y, lines, cue, o = {}) {
  const p = k.at(cue, 0.5);
  const w = o.w ?? 560, h = o.h ?? 64 + lines.length * 62;
  k.group({ x, y, s: Math.max(0.01, k.ease.back(p)), r: o.r ?? -0.02, a: Math.min(1, p * 3) }, () => {
    k.rect(-w / 2, -h / 2, w, h, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: o.seed ?? 920 });
    lines.forEach((l, i) => k.text(l, 0, -h / 2 + 62 + i * 62, { size: i ? 40 : 50, font: 'title', color: i ? P.ink : P.red, maxWidth: w - 40 }));
  });
}
function campNight(k, o = {}) {
  night(k, o);
  k.prop('campfire', o.fx ?? 960, G - 40, o.fs ?? 230, { fire: o.fire ?? 1 });
}
function glow(k, x, y, r, a = 0.5) {
  k.darkness(a, [{ x, y, r, flicker: 1, warm: 1 }]);
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    title: 'How Did Ancient Humans Actually Sleep?',
    description: `You wake up in the dark. No alarm, no phone — just the glow of a fire and the sound of people breathing around you. For most of your species' history, that was a normal night.
So how did ancient humans actually sleep? Grass beds with built-in bug spray, 200,000 years old. Hunter-gatherers who sleep no more than you do. A camp where someone is always awake. And the forgotten "first sleep" and "second sleep" — which might explain why you wake up at 3 a.m.`,
    footer: `📚 Sources: Siegel et al. (2015, Current Biology) — sleep in the Hadza, San and Tsimane; Samson et al. (2017, Proc. R. Soc. B) — the sentinel hypothesis; Wadley et al. (2020, Science) — 200,000-year-old grass bedding at Border Cave; Wadley et al. (2011, Science) — Sibudu bedding with Cape laurel; Berna et al. (2012, PNAS) — fire at Wonderwerk Cave; A. Roger Ekirch, "At Day's Close" (2005); Wehr (1992, Journal of Sleep Research).
⚠️ This video is for education, not medical advice. If you struggle with sleep, talk to a doctor.
🔔 Episode 1 of "How your ancestors actually lived". Next: How Fire Made You Human.`,
    tags: ['how did ancient humans sleep', 'ancient humans', 'prehistoric sleep', 'how cavemen slept', 'first sleep second sleep', 'segmented sleep', 'biphasic sleep', 'hunter gatherers sleep', 'hadza', 'sleep science', 'human evolution', 'prehistory', 'anthropology', 'hunter gatherers', 'history of sleep', 'why do i wake up at 3am', 'stone age', 'early humans', 'evolution of sleep', 'sentinel hypothesis', 'border cave', 'animated history', 'history explained', 'how people lived', 'long story drawn'],
    hashtags: ['ancienthumans', 'history', 'sleep'],
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
      say: '{dark}You wake up in the dark. {noalarm}No alarm. No phone. {fire}Just the orange glow of a dying fire, {breath}and the sound of twenty people breathing around you. {grass}Somewhere out there, something moves through the grass. {sleep}And you go back to sleep anyway.',
      sfx: [['whoosh', 'grass', 0.4], ['pop', 'noalarm', 0.3]],
      draw(k) {
        campNight(k, { fx: 1040, fire: 0.35 });
        [[420, ANC()], [760, YOU], [1400, ANCW()], [1740, ANC()]].forEach(([x, pre], i) => lying(k, x, G + 90 + (i % 2) * 30, 300, pre, { face: pre === YOU && k.t < k.cue('sleep') ? 'calm' : 'sleep', a: k.at(pre === YOU ? 0 : 'breath', 0.8) }));
        k.glowEyes(1650, 700, 0.9, '#ffe066', { p: k.at('grass', 0.6) });
        k.icon('clock', 300, 300, 120, { p: k.at('noalarm', 0.4) });
        k.icon('phone', 460, 300, 110, { p: k.at(k.cue('noalarm', 0.4), 0.4) });
        redX(k, 380, 300, 120, k.cue('noalarm', 0.7));
        zzz(k, 470, 820, 'sleep');
        glow(k, 1040, G - 60, 760, 0.5);
      },
    },
    {
      say: "{reframe}For more than ninety-five percent of your species' history, this wasn't a thought experiment. {every}This was every single night. {body}And your body still remembers it. {q}So how did ancient humans actually sleep? {strange}The answer is stranger, and a lot less cozy, than you'd think.",
      sfx: [['ding', 'reframe', 0.4], ['boing', 'q', 0.3]],
      draw(k) {
        paper(k);
        big(k, '95%', 520, 380, 'reframe', { size: 260 });
        note(k, "of your species' history", 520, 560, k.cue('reframe', 0.6), { size: 54 });
        note(k, 'no electric light · no mattress · no door', 520, 660, 'every', { size: 40, color: '#6b5f55' });
        k.char(1380, 900, 560, { ...YOU, face: k.t > k.cue('strange') ? 'shock' : 'calm', pose: k.t > k.cue('q') ? 'think' : 'stand', p: k.at('body', 0.6), bob: 2 });
        k.icon('question', 1640, 330, 170, { p: k.at('q', 0.5), stroke: P.red });
      },
    },
    {
      say: "{series}This is the first episode of a series on how your ancestors actually lived. {sub}If that sounds like your kind of thing, subscribing is free. {approve}Your ancestors would approve. Probably. They didn't leave reviews. {plan}Today: {a}where they slept, {b}how long, {c}who stayed awake, {d}and why your three a.m. wake-up might not be a problem at all.",
      sfx: [['pop', 'sub', 0.5], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd']],
      draw(k) {
        paper(k);
        note(k, 'HOW YOUR ANCESTORS ACTUALLY LIVED', 960, 120, 'series', { size: 58, color: P.brown });
        note(k, 'Episode 1', 960, 200, 'series', { size: 44, color: P.red });
        const items = [['a', 'WHERE', 'grassbed'], ['b', 'HOW LONG', 'thermo'], ['c', 'WHO WATCHED', 'campfire'], ['d', '3 A.M.', 'moon']];
        items.forEach(([c, t, prop], i) => {
          const x = 300 + i * 440, p = k.at(c, 0.5);
          k.group({ x, y: 560, r: i % 2 ? 0.03 : -0.03, s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-180, -200, 360, 400, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 930 + i });
            k.prop(prop, 0, -40, 200, { fire: 1, level: 0.7, ash: true });
            k.text(t, 0, 140, { size: 50, font: 'title', color: P.red });
          });
        });
        k.char(1760, 1060, 300, { ...YOU, face: 'smug', pose: 'wave', p: k.at('approve', 0.5) });
      },
    },

    // ---------------- Chapter 1: Leaving the trees ----------------
    {
      chapter: 'Leaving the trees',
      say: '{q}First question: where do you sleep when there are no houses? {chimp}Your closest living relatives have an answer. {nest}Every evening, a chimpanzee climbs a tree and builds a fresh nest out of bent branches. {new}A new one. Every night. {joke}Imagine making your bed from scratch before you sleep. Including the bed frame.',
      sfx: [['pop', 'chimp'], ['scratch', 'nest', 0.3], ['boing', 'joke', 0.3]],
      draw(k) {
        chap(k, 'Leaving the trees');
        savanna(k, { trees: [] });
        k.prop('tree', 1100, 520, 900, { fill: '#4E9A45' });
        k.prop('nest', 1120, 360, 300, { p: k.at('nest', 0.6) });
        k.prop('chimp', 1120, 300, 170, { p: k.at('chimp', 0.6) });
        k.text('NEW', 1420, 250, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('new', 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.text('EVERY NIGHT', 1420, 330, { size: 56, font: 'title', color: P.red, fx: 'pop', p: k.at(k.cue('new', 0.4), 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.char(420, G + 40, 420, { ...YOU, face: k.t > k.cue('joke') ? 'shock' : 'calm', pose: k.t > k.cue('chimp') ? 'point' : 'think', p: k.at('q', 0.5) });
      },
    },
    {
      say: '{down}At some point, your ancestors came down from the trees for good. {erectus}Some researchers think this happened with Homo erectus, roughly two million years ago. {problem}But sleeping on the ground has one obvious problem. {lions}The ground is where the lions are. {q}So what changed?',
      sfx: [['slideDown', 'down', 0.4], ['boom', 'lions', 0.3], ['boing', 'q', 0.3]],
      draw(k) {
        chap(k, 'Leaving the trees');
        ancient(k, { tx: 1650 });
        k.char(760, G + 20, 460, { ...ANC(), face: k.t > k.cue('lions') ? 'shock' : 'calm', pose: k.t > k.cue('lions') ? 'shrug' : 'stand', p: k.at('down', 0.6) });
        card(k, 420, 260, ['HOMO ERECTUS', '~2 million years ago', '(still debated)'], 'erectus', { w: 520 });
        k.group({ a: k.at('lions', 0.4) }, () => {
          for (const [x, y, s] of [[1250, 760, 1], [1450, 800, 0.8], [1120, 820, 0.7]]) k.glowEyes(x, y, s, '#ffe066');
        });
        big(k, 'LIONS', 1300, 620, 'lions', { size: 90 });
      },
    },
    {
      say: '{fire}One answer: fire. {wonder}In Wonderwerk Cave, in South Africa, archaeologists found burned bone and plant ash about one million years old. {three}A fire is a light, {heater}a heater, {alarm}and a security system. {pred}Most predators would rather not walk toward one.',
      sfx: [['whoosh', 'fire', 0.5], ['pop', 'three'], ['pop', 'heater'], ['pop', 'alarm']],
      draw(k) {
        chap(k, 'Leaving the trees', true);
        campNight(k, { fx: 960, fs: 320, fire: k.at('fire', 1.2) });
        k.char(640, G + 40, 380, { ...ANC(), face: 'calm', pose: 'hold' });
        k.char(1280, G + 40, 380, { ...ANCW(), face: 'happy', flip: true });
        glow(k, 960, G - 100, 760, 0.5);
        card(k, 440, 230, ['WONDERWERK CAVE', 'South Africa', '~1,000,000 years'], 'wonder', { w: 620 });
        const words = [['three', 'LIGHT'], ['heater', 'HEATER'], ['alarm', 'SECURITY']];
        words.forEach(([c, t], i) => note(k, t, 1420 + i * 0, 200 + i * 80, c, { size: 56, color: P.yellow, outline: P.ink, fx: 'pop' }));
        k.glowEyes(1760, 760, 0.8, '#ffe066', { p: 1 - k.at('pred', 1) });
      },
    },

    // ---------------- Chapter 2: The first mattress ----------------
    {
      chapter: 'The first mattress',
      say: '{q}So what did they actually sleep on? {wadley}In 2020, a team led by archaeologist Lyn Wadley published something remarkable from Border Cave, in South Africa. {bed}Bedding. {grass}Made of grass. {age}About two hundred thousand years old.',
      sfx: [['pop', 'wadley'], ['ding', 'bed', 0.4], ['pop', 'age', 0.5]],
      draw(k) {
        chap(k, 'The first mattress');
        ancient(k, { tree: false, sx: 1700, sy: 220 });
        k.prop('cave', 640, G - 230, 700);
        k.char(1180, G + 20, 400, { ...SCI(), face: k.t > k.cue('bed') ? 'shock' : 'calm', pose: k.t > k.cue('bed') ? 'point' : 'stand', flip: true, p: k.at('wadley', 0.5) });
        card(k, 1460, 300, ['BORDER CAVE', 'South Africa', 'Wadley et al., 2020'], 'wadley', { w: 480 });
        k.prop('grassbed', 640, G - 30, 300, { p: k.at('bed', 0.6) });
        big(k, '200,000 YEARS', 960, 980, 'age', { size: 90 });
      },
    },
    {
      say: "{ash}And it wasn't just thrown on the floor. {layer}The grass was laid on top of ash. {bugs}Crawling insects hate walking through ash, so it may have worked as a barrier. {sibudu}At another South African site, Sibudu Cave, bedding about seventy-seven thousand years old includes leaves from a tree called Cape laurel. {chem}Those leaves contain chemicals that kill mosquitoes.",
      sfx: [['pop', 'layer'], ['scratch', 'bugs', 0.3], ['pop', 'sibudu'], ['sparkle', 'chem', 0.4]],
      draw(k) {
        chap(k, 'The first mattress');
        paper(k);
        // mặt cắt: tro + cỏ
        const p1 = k.at('layer', 0.6), p2 = k.at('ash', 0.6);
        k.rect(160, 560, 820, 90, { fill: '#bdb7ad', fillStyle: 'solid', width: 5, p: p1, seed: 940 });
        k.rect(160, 440, 820, 120, { fill: '#d9c06a', fillStyle: 'solid', width: 5, p: p2, seed: 941 });
        note(k, 'GRASS', 570, 500, 'ash', { size: 52, color: P.ink });
        note(k, 'ASH', 570, 605, 'layer', { size: 52, color: '#5b5650' });
        // côn trùng bò tới rồi quay đầu
        const u = k.at('bugs', 2, 'linear');
        for (let i = 0; i < 3; i++) {
          const x = 1040 + 80 * (1 - Math.min(1, u * 2)) + 120 * Math.max(0, u * 2 - 1) + i * 30, y = 640 + i * 18;
          k.dot(x, y, 9, P.ink, k.at('bugs', 0.3)); k.line(x - 12, y - 6, x + 12, y + 6, { stroke: P.ink, width: 3, p: k.at('bugs', 0.3), seed: 950 + i });
        }
        k.text('✗', 1060, 560, { size: 70, color: P.red, fx: 'pop', p: k.at(k.cue('bugs', 1.4), 0.3) });
        card(k, 1480, 300, ['SIBUDU CAVE', '~77,000 years', 'Wadley et al., 2011'], 'sibudu', { w: 480 });
        k.prop('grassbed', 1480, 660, 380, { leaves: true, p: k.at('sibudu', 0.6) });
        note(k, 'Cape laurel leaves', 1480, 820, k.cue('sibudu', 1.5), { size: 44, color: P.grass });
        note(k, '= mosquito repellent', 1480, 900, 'chem', { size: 50, color: P.red });
      },
    },
    {
      say: '{joke}So your ancestors had a mattress with built-in bug spray. {you}You have a mattress with a ten-year warranty. {burn}And every so often, it seems, they burned the old bedding and laid down fresh grass. {spring}Possibly the oldest spring cleaning on record.',
      sfx: [['ding', 'joke', 0.4], ['wahwah', 'you', 0.3], ['whoosh', 'burn', 0.4], ['sparkle', 'spring', 0.4]],
      draw(k) {
        chap(k, 'The first mattress');
        paper(k);
        k.line(960, 160, 960, 940, { stroke: '#cfc6b8', width: 4, seed: 960 });
        note(k, 'THEM', 480, 160, 'joke', { size: 70, color: P.brown, fx: 'pop' });
        note(k, 'YOU', 1440, 160, 'you', { size: 70, color: P.brown, fx: 'pop' });
        k.prop('grassbed', 480, 470, 440, { leaves: true, ash: true, p: k.at('joke', 0.5) });
        note(k, 'built-in bug spray', 480, 690, k.cue('joke', 0.6), { size: 46, color: P.grass });
        k.prop('bed', 1440, 470, 420, { p: k.at('you', 0.5) });
        note(k, '10-year warranty', 1440, 690, k.cue('you', 0.5), { size: 46, color: '#6b5f55' });
        k.prop('campfire', 480, 840, 200, { p: k.at('burn', 0.5) });
        note(k, 'burn the old · lay fresh grass', 480, 960, 'burn', { size: 40 });
        k.char(1440, 1040, 300, { ...YOU, face: 'blank', p: k.at('you', 0.5) });
        k.text('OLDEST SPRING CLEANING?', 480, 1030, { size: 40, font: 'title', color: P.red, fx: 'pop', p: k.at('spring', 0.4), outline: '#fffaf0', outlineWidth: 8 });
      },
    },

    // ---------------- Chapter 3: How long did they sleep? ----------------
    {
      chapter: 'How long did they sleep?',
      say: "{q}Now the big one. How much did they sleep? {myth}You've probably heard that before electricity, people slept nine or ten hours a night, {sun}going to bed with the sun like sensible animals. {nice}It's a nice story. {data}It's also not what the data says.",
      sfx: [['drumroll', 'q', 0.3], ['scratch', 'data', 0.5]],
      draw(k) {
        chap(k, 'How long did they sleep?');
        paper(k);
        k.text('HOW LONG?', 960, 180, { size: 120, font: 'title', color: P.red, fx: 'pop', p: k.at('q', 0.5), outline: '#fffaf0', outlineWidth: 16 });
        k.group({ a: 1 - k.at('data', 0.3) * 0.5 }, () => {
          k.bubble(360, 360, 980, 200, 760, 720, { p: k.at('myth', 0.4), text: '"They slept 10 hours, with the sun!"', size: 46 });
          k.icon('sun', 1500, 420, 200, { p: k.at('sun', 0.5) });
        });
        k.char(760, 1000, 400, { ...YOU, face: k.t > k.cue('data') ? 'shock' : 'happy', p: k.at('myth', 0.5) });
        redX(k, 830, 480, 170, 'data');
        note(k, 'MYTH', 1400, 760, 'data', { size: 90, color: P.red, fx: 'pop' });
      },
    },
    {
      say: '{siegel}In 2015, sleep researcher Jerome Siegel and his team put activity trackers on people in three societies that live without electricity: {hadza}the Hadza in Tanzania, {san}the San in Namibia, {tsi}and the Tsimane in Bolivia. {note}These are modern people, by the way, not time travelers. {but}But their nights are lit by fire and the moon, not by screens.',
      sfx: [['pop', 'siegel'], ['pop', 'hadza'], ['pop', 'san'], ['pop', 'tsi']],
      draw(k) {
        chap(k, 'How long did they sleep?');
        paper(k);
        card(k, 960, 170, ['SIEGEL ET AL., 2015', 'Current Biology'], 'siegel', { w: 620 });
        const groups = [['hadza', 'HADZA', 'Tanzania', ANC({ hair: 'short' })], ['san', 'SAN', 'Namibia', ANCW({ hair: 'short' })], ['tsi', 'TSIMANE', 'Bolivia', ANC({ outfit: 'tunic', color: '#c74a3a', color2: P.yellow })]];
        groups.forEach(([c, n, place, pre], i) => {
          const x = 420 + i * 540;
          k.char(x, 820, 380, { ...pre, face: 'happy', p: k.at(c, 0.6), pose: i === 1 ? 'wave' : 'stand' });
          // vòng đeo tay đo vận động
          k.dot(x + 40, 690, 12, P.ink, k.at(c, 0.5));
          note(k, n, x, 900, c, { size: 58, color: P.red, fx: 'pop' });
          note(k, place, x, 970, c, { size: 40, color: '#6b5f55' });
        });
        k.prop('campfire', 1720, 360, 160, { p: k.at('but', 0.5) });
        k.prop('moon', 1580, 330, 150, { p: k.at('but', 0.5) });
      },
    },
    {
      say: "{result}The result? {hours}They slept between about five point seven and seven point one hours a night. {same}That's roughly what people sleep in industrial countries. {late}And they didn't go to bed at sunset, either. {avg}On average, they fell asleep more than three hours after dark. {joke}No Netflix. Still staying up.",
      sfx: [['drumroll', 'result', 0.3], ['tada', 'hours', 0.4], ['boing', 'joke', 0.3]],
      draw(k) {
        chap(k, 'How long did they sleep?');
        paper(k);
        big(k, '5.7 – 7.1 h', 640, 280, 'hours', { size: 150 });
        note(k, 'of sleep per night', 640, 400, k.cue('hours', 0.5), { size: 50 });
        note(k, '≈ same as you', 640, 490, 'same', { size: 60, color: P.grass, fx: 'pop' });
        // trục thời gian: hoàng hôn → ngủ
        const y = 760, x0 = 260, x1 = 1660;
        k.line(x0, y, x1, y, { stroke: P.ink, width: 6, p: k.at('late', 1), seed: 970 });
        k.icon('sun', x0, y - 90, 110, { p: k.at('late', 0.5) });
        note(k, 'sunset', x0, y + 60, 'late', { size: 40 });
        const pz = k.at('avg', 1.4, 'inOut');
        k.arrow(x0 + 40, y - 30, k.lerp(x0 + 40, 1000, pz), y - 30, { stroke: P.red, width: 8, p: k.at('avg', 0.4), seed: 971, bend: -0.1 });
        note(k, '+3.3 h', 640, y - 90, 'avg', { size: 56, color: P.red, fx: 'pop' });
        k.prop('moon', 1060, y - 80, 120, { p: k.at(k.cue('avg', 1.2), 0.5) });
        note(k, 'asleep', 1060, y + 60, k.cue('avg', 1.2), { size: 40 });
        k.char(1560, 1050, 280, { ...ANC(), face: 'smug', p: k.at('joke', 0.5) });
        k.text('NO NETFLIX', 1560, 600, { size: 54, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: '{temp}What actually seemed to set the timing was temperature. {fall}They fell asleep as the night got cooler, {wake}and woke up near the coldest point, around dawn. {body}Your body still runs on that program. {room}It is one reason sleep doctors tell you to keep your bedroom cool.',
      sfx: [['slideDown', 'fall', 0.4], ['ding', 'wake', 0.4], ['pop', 'room']],
      draw(k) {
        chap(k, 'How long did they sleep?', true);
        night(k, { mx: 1700, my: 160 });
        // đường nhiệt độ giảm dần qua đêm
        const pts = [];
        for (let i = 0; i <= 20; i++) { const x = 200 + i * 70; pts.push([x, 300 + 360 * Math.sin((i / 20) * Math.PI * 0.5)]); }
        k.lines(pts, { stroke: P.orange, width: 10, p: k.at('temp', 2.5, 'linear'), seed: 980 });
        note(k, 'TEMPERATURE', 520, 250, 'temp', { size: 50, color: P.orange, outline: P.ink });
        k.prop('thermo', 160, 520, 220, { level: 1 - 0.7 * k.at('fall', 3, 'linear'), p: k.at('temp', 0.5) });
        lying(k, 900, 760, 280, YOU, { a: k.at('fall', 0.6) });
        zzz(k, 660, 640, 'fall');
        note(k, 'asleep', 700, 450, 'fall', { size: 48, color: P.sky2, outline: P.ink });
        note(k, 'awake', 1600, 560, 'wake', { size: 48, color: P.yellow, outline: P.ink, fx: 'pop' });
        k.icon('sun', 1600, 760, 140, { p: k.at('wake', 0.5) });
        k.text('KEEP IT COOL', 960, 960, { size: 64, font: 'title', color: '#ABD3E5', fx: 'pop', p: k.at('room', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },
    {
      say: "{insomnia}And here's the part that stings. {rare}Chronic insomnia was rare in these groups. {word}So rare that the San and Tsimane languages don't even have a word for it. {us}Meanwhile, about one in three American adults doesn't get the recommended seven hours. {joke}Modern humans invented the word for insomnia. Then built a lifestyle to match.",
      sfx: [['bonk', 'insomnia', 0.4], ['scratch', 'word', 0.3], ['wahwah', 'joke', 0.3]],
      draw(k) {
        chap(k, 'How long did they sleep?');
        paper(k);
        k.text('INSOMNIA', 520, 230, { size: 120, font: 'title', color: P.ink, fx: 'pop', p: k.at('insomnia', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.line(240, 230, 800, 230, { stroke: P.red, width: 14, p: k.at('word', 0.6), seed: 990 });
        note(k, 'no word for it', 520, 340, 'word', { size: 52, color: P.red });
        note(k, '(San · Tsimane)', 520, 410, 'word', { size: 40, color: '#6b5f55' });
        lying(k, 760, 760, 300, ANC(), { a: k.at('rare', 0.6) });
        zzz(k, 520, 640, 'rare');
        // 1/3 người Mỹ
        for (let i = 0; i < 3; i++) k.char(1260 + i * 200, 720, 300, { ...YOU, color: i === 0 ? '#D9A21B' : '#b9b3a8', color2: i === 0 ? P.grass : '#9a948a', face: i === 0 ? 'sad' : 'calm', p: k.at(k.cue('us', i * 0.25), 0.5) });
        k.sweat(1300, 470, 1.3, { p: k.at(k.cue('us', 1), 0.4) });
        big(k, '1 in 3', 1460, 850, 'us', { size: 90 });
        note(k, 'U.S. adults sleep < 7 h (CDC)', 1460, 950, k.cue('us', 0.6), { size: 40, color: '#6b5f55' });
      },
    },

    // ---------------- Chapter 4: Someone is always awake ----------------
    {
      chapter: 'Someone is always awake',
      say: "{q}But wait. If everyone sleeps on the ground, {who}who's watching for the lion? {samson}In 2017, anthropologist David Samson and his colleagues tracked the sleep of thirty-three Hadza adults for twenty days. {found}What they found is a little bit beautiful.",
      sfx: [['boing', 'who', 0.3], ['pop', 'samson'], ['sparkle', 'found', 0.4]],
      draw(k) {
        chap(k, 'Someone is always awake', true);
        campNight(k, { fx: 960, fs: 200, fire: 0.6 });
        k.glowEyes(1700, 740, 1, '#ffe066', { p: k.at('who', 0.5) });
        k.icon('question', 1700, 560, 150, { p: k.at('who', 0.5), stroke: P.yellow });
        [[560, ANC()], [860, ANCW()], [1360, ANC()], [1660, ANCW()]].forEach(([x, pre], i) => lying(k, x, G + 90 + (i % 2) * 30, 260, pre));
        glow(k, 960, G - 60, 760, 0.5);
        card(k, 480, 230, ['SAMSON ET AL., 2017', '33 Hadza adults · 20 days'], 'samson', { w: 620 });
      },
    },
    {
      say: '{diff}People naturally sleep at different times. {owl}Some are night owls. {lark}Some are early birds. {old}And older people tend to go to bed early and wake up very early. {res}Across more than two hundred hours of recordings, {all}the moments when every single person was asleep at the same time added up to just eighteen minutes.',
      sfx: [['pop', 'owl'], ['pop', 'lark'], ['pop', 'old'], ['drumroll', 'res', 0.3], ['tada', 'all', 0.5]],
      draw(k) {
        chap(k, 'Someone is always awake');
        paper(k);
        // biểu đồ thanh ngủ theo người: giờ thức (vàng) / ngủ (chàm)
        const rows = [['owl', 'night owl', 0.35, 0.95], ['lark', 'early bird', 0.08, 0.72], ['old', 'grandparent', 0.02, 0.55], ['diff', 'everyone else', 0.15, 0.8]];
        const x0 = 520, w = 1100;
        note(k, '8 PM', x0, 160, 'diff', { size: 36, color: '#6b5f55' });
        note(k, 'MIDNIGHT', x0 + w * 0.4, 160, 'diff', { size: 36, color: '#6b5f55' });
        note(k, '7 AM', x0 + w, 160, 'diff', { size: 36, color: '#6b5f55' });
        rows.forEach(([c, label, a, b], i) => {
          const y = 250 + i * 130, p = k.at(c, 0.8);
          note(k, label, 300, y + 30, c, { size: 42, align: 'center' });
          k.rect(x0, y, w, 60, { fill: P.yellow, fillStyle: 'solid', width: 4, p, seed: 1000 + i });
          k.rect(x0 + w * a, y, w * (b - a) * Math.min(1, p * 1.2), 60, { fill: P.indigo, fillStyle: 'solid', stroke: 'none', p, seed: 1010 + i });
        });
        // vùng tất cả cùng ngủ — rất hẹp
        const pa = k.at('all', 0.5);
        k.rect(x0 + w * 0.36, 230, w * 0.03, 540, { fill: P.red, fillStyle: 'solid', stroke: 'none', alpha: 0.55 * pa, p: pa, seed: 1020 });
        big(k, '18 MINUTES', 960, 880, 'all', { size: 100 });
        note(k, 'everyone asleep at once (out of ~220 hours)', 960, 980, k.cue('all', 0.6), { size: 40, color: '#6b5f55' });
      },
    },
    {
      say: "{sentinel}Researchers call this the sentinel hypothesis. {nick}One version even has a nickname: the poorly sleeping grandparent hypothesis. {grand}A camp with a grandmother who wakes at four a.m. is a camp with a free night guard. {you}So if your grandma is up before sunrise, she's not being difficult. {duty}She's on duty.",
      sfx: [['ding', 'sentinel', 0.4], ['pop', 'nick'], ['boing', 'duty', 0.3]],
      draw(k) {
        chap(k, 'Someone is always awake', true);
        campNight(k, { fx: 760, fs: 180, fire: 0.5 });
        lying(k, 1260, G + 80, 220, ANC());
        lying(k, 1620, G + 50, 220, ANCW());
        k.char(980, G + 30, 380, { ...ELDER, face: k.t > k.cue('duty') ? 'smug' : 'calm', pose: k.t > k.cue('duty') ? 'hips' : 'stand', prop: 'staff' });
        glow(k, 860, G - 100, 760, 0.45);
        k.text('SENTINEL', 960, 180, { size: 100, font: 'title', color: P.yellow, fx: 'pop', p: k.at('sentinel', 0.5), outline: P.ink, outlineWidth: 14 });
        note(k, '"poorly sleeping grandparent" hypothesis', 960, 280, 'nick', { size: 44, color: '#fff3c4', outline: P.ink });
        k.text('4:00 AM', 520, 430, { size: 70, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('grand', 0.5), outline: P.ink, outlineWidth: 12 });
        k.text('ON DUTY', 980, 400, { size: 80, font: 'title', color: P.red, fx: 'pop', p: k.at('duty', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{owl}And if you're a night owl who gets called lazy? {shift}In a camp of thirty people, you might have been the night shift. {flaw}Your sleep pattern wasn't necessarily a flaw. {job}It may have been a job.",
      sfx: [['pop', 'owl'], ['ding', 'job', 0.4]],
      draw(k) {
        chap(k, 'Someone is always awake', true);
        campNight(k, { fx: 1300, fs: 200, fire: 0.8 });
        k.char(900, G + 30, 420, { ...YOU, face: k.t > k.cue('job') ? 'happy' : k.t > k.cue('shift') ? 'shock' : 'sad', pose: k.t > k.cue('job') ? 'cheer' : 'stand', prop: k.t > k.cue('shift') ? 'spear' : undefined });
        glow(k, 1100, G - 100, 760, 0.45);
        k.text('"LAZY"', 900, 300, { size: 80, font: 'title', color: '#b9b3a8', fx: 'pop', p: k.at('owl', 0.4) * (1 - k.at('shift', 0.3)), outline: P.ink, outlineWidth: 12 });
        k.text('NIGHT SHIFT', 900, 260, { size: 90, font: 'title', color: P.yellow, fx: 'pop', p: k.at('shift', 0.4), outline: P.ink, outlineWidth: 14 });
        k.text('NOT A FLAW. A JOB.', 960, 980, { size: 64, font: 'title', color: '#fff3c4', p: k.at('flaw', 2, 'linear'), outline: P.ink, outlineWidth: 12 });
      },
    },
    // vòng mở → tập sau (giữa video)
    {
      say: "{fire}Of course, the night guard wasn't sitting alone in the dark. {circle}She was sitting by the fire. {talk}And the people around that fire were talking. {loop}What they talked about at night turns out to be very different from what they talked about during the day. {mind}Some researchers think those firelit conversations helped shape the human mind. {next}But that's a story for the next episode.",
      sfx: [['whoosh', 'fire', 0.4], ['pop', 'talk'], ['drumroll', 'loop', 0.3], ['ding', 'next', 0.5]],
      draw(k) {
        chap(k, 'Someone is always awake', true);
        campNight(k, { fx: 960, fs: 240, fire: 1 });
        k.char(560, G + 40, 360, { ...ELDER, face: 'happy', pose: k.t > k.cue('talk') ? 'present' : 'stand' });
        k.char(1340, G + 40, 360, { ...ANC(), face: 'shock', flip: true, p: k.at('circle', 0.5) });
        k.char(1620, G + 40, 300, { ...KID, face: 'happy', flip: true, p: k.at('circle', 0.5) });
        glow(k, 960, G - 100, 800, 0.4);
        k.bubble(300, 260, 520, 170, 520, 560, { p: k.at('talk', 0.4), text: '…and then the elephant said…', size: 40 });
        k.text('DAY TALK', 1380, 300, { size: 58, font: 'title', color: '#d9d3e8', fx: 'pop', p: k.at('loop', 0.4), outline: P.ink, outlineWidth: 10 });
        k.text('≠', 1380, 380, { size: 70, font: 'title', color: P.yellow, fx: 'pop', p: k.at(k.cue('loop', 0.6), 0.4), outline: P.ink, outlineWidth: 10 });
        k.text('NIGHT TALK', 1380, 460, { size: 58, font: 'title', color: P.yellow, fx: 'pop', p: k.at(k.cue('loop', 1.2), 0.4), outline: P.ink, outlineWidth: 10 });
        k.icon('brain', 960, 280, 150, { p: k.at('mind', 0.5) });
        k.text('NEXT EPISODE →', 960, 1000, { size: 56, font: 'title', color: P.yellow, fx: 'pop', p: k.at('next', 0.4), outline: P.ink, outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 5: First sleep, second sleep ----------------
    {
      chapter: 'First sleep, second sleep',
      say: '{q}Now, about that three a.m. wake-up. {ekirch}Historian Roger Ekirch spent years reading old diaries, court records, and medical books from pre-industrial Europe. {kept}And he kept running into two strange phrases. {first}First sleep. {second}And second sleep.',
      sfx: [['pop', 'ekirch'], ['scratch', 'kept', 0.3], ['ding', 'first', 0.4], ['ding', 'second', 0.4]],
      draw(k) {
        chap(k, 'First sleep, second sleep');
        paper(k, '#efe6d2');
        k.text('3:00 AM', 960, 150, { size: 100, font: 'title', color: P.indigo, fx: 'pop', p: k.at('q', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.char(520, 960, 460, { ...HIST, face: k.t > k.cue('kept') ? 'shock' : 'calm', pose: 'hold', prop: 'scroll', p: k.at('ekirch', 0.5) });
        card(k, 520, 320, ['A. ROGER EKIRCH', '"At Day\'s Close", 2005'], 'ekirch', { w: 560 });
        k.prop('scroll', 1180, 520, 240, { p: k.at('ekirch', 0.6) });
        k.icon('book', 1500, 560, 200, { p: k.at(k.cue('ekirch', 0.6), 0.6) });
        k.text('"first sleep"', 1340, 780, { size: 72, font: 'title', color: P.red, fx: 'write', p: k.at('first', 1, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        k.text('"second sleep"', 1340, 900, { size: 72, font: 'title', color: P.red, fx: 'write', p: k.at('second', 1, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: "{bed}People went to bed a few hours after dark. {woke}Around midnight, they woke up, {awake}and stayed awake for an hour or so. {did}They tended the fire, {pray}prayed, {talk}talked, {visit}visited neighbors. {theft}A few used the time for petty theft. {back}Then they went back to sleep until morning. {normal}Nobody thought this was strange. It was just night.",
      sfx: [['pop', 'woke'], ['pop', 'did'], ['pop', 'pray'], ['pop', 'talk'], ['pop', 'visit'], ['boing', 'theft', 0.3], ['slideDown', 'back', 0.3]],
      draw(k) {
        chap(k, 'First sleep, second sleep', true);
        night(k, { sky: '#2b2a4e', ground: '#3d3550', mx: 1700, my: 150 });
        // thanh đêm: ngủ 1 — thức — ngủ 2
        const x0 = 260, w = 1400, y = 260;
        k.rect(x0, y, w * 0.4, 70, { fill: P.night, fillStyle: 'solid', width: 4, p: k.at('bed', 0.6), seed: 1030 });
        k.rect(x0 + w * 0.4, y, w * 0.12, 70, { fill: P.yellow, fillStyle: 'solid', width: 4, p: k.at('awake', 0.6), seed: 1031 });
        k.rect(x0 + w * 0.52, y, w * 0.48, 70, { fill: P.night, fillStyle: 'solid', width: 4, p: k.at('back', 0.6), seed: 1032 });
        note(k, 'FIRST SLEEP', x0 + w * 0.2, y + 120, 'bed', { size: 44, color: '#d9d3e8', outline: P.ink });
        note(k, 'awake', x0 + w * 0.46, y - 50, 'awake', { size: 44, color: P.yellow, outline: P.ink });
        note(k, 'SECOND SLEEP', x0 + w * 0.76, y + 120, 'back', { size: 44, color: '#d9d3e8', outline: P.ink });
        const acts = [['did', 'campfire', 'tend the fire'], ['pray', 'candle', 'pray'], ['talk', 'heart', 'talk'], ['visit', 'stilthouse', 'visit neighbors']];
        acts.forEach(([c, prop, t], i) => {
          const x = 330 + i * 330;
          k.prop(prop, x, 600, 170, { p: k.at(c, 0.5), fire: 0.7 });
          note(k, t, x, 730, c, { size: 40, color: '#fff3c4', outline: P.ink });
        });
        k.char(1660, G + 60, 300, { ...HIST, color: '#3a3a3a', face: 'smug', hat: undefined, p: k.at('theft', 0.4), walk: true });
        note(k, 'petty theft', 1660, 500, 'theft', { size: 40, color: P.red, outline: '#fffaf0' });
        k.text('just… night.', 960, 980, { size: 60, font: 'title', color: '#fff3c4', fx: 'fade', p: k.at('normal', 0.6), outline: P.ink, outlineWidth: 10 });
      },
    },
    {
      say: '{wehr}In the early nineteen-nineties, psychiatrist Thomas Wehr ran an experiment. {dark}Volunteers spent fourteen hours a day in darkness, for weeks. {split}Over time, their sleep split into two blocks, {gap}with a quiet hour or two awake in between. {light}Take away the electric light, and the old pattern can come back.',
      sfx: [['pop', 'wehr'], ['click', 'dark', 0.5], ['ding', 'split', 0.4]],
      draw(k) {
        chap(k, 'First sleep, second sleep');
        paper(k);
        card(k, 480, 220, ['THOMAS WEHR', 'NIMH · 1992'], 'wehr', { w: 480 });
        k.char(480, 900, 380, { ...SCI({ hat: undefined, color: '#ffffff', color2: '#7FB5D5', outfit: 'robe' }), face: 'calm', pose: 'present', p: k.at('wehr', 0.5) });
        // phòng tối
        k.rect(900, 180, 860, 480, { fill: '#1b1b2e', fillStyle: 'solid', width: 6, p: k.at('dark', 0.5), seed: 1040 });
        k.text('14 h DARKNESS', 1330, 250, { size: 54, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('dark', 0.5) });
        lying(k, 1440, 600, 260, YOU, { a: k.at('dark', 0.5) });
        // hai khối ngủ
        const y = 800, x0 = 900, w = 860;
        k.rect(x0, y, w * 0.42, 70, { fill: P.indigo, fillStyle: 'solid', width: 4, p: k.at('split', 0.6), seed: 1041 });
        k.rect(x0 + w * 0.42, y, w * 0.16, 70, { fill: P.yellow, fillStyle: 'solid', width: 4, p: k.at('gap', 0.6), seed: 1042 });
        k.rect(x0 + w * 0.58, y, w * 0.42, 70, { fill: P.indigo, fillStyle: 'solid', width: 4, p: k.at('split', 0.6), seed: 1043 });
        note(k, '1–2 h awake', x0 + w * 0.5, y + 120, 'gap', { size: 42, color: P.brown });
      },
    },
    {
      say: "{twist}But here's the twist. {siegel}Siegel's hunter-gatherers mostly didn't sleep in two blocks. {honest}So the honest answer is this: {mix}sleep changes with light, seasons, and culture. {none}There's no single natural way to sleep. {you}Which also means that if you wake up at three a.m., {lie}lie quietly for a while, {fall}and drift back off, {not}that's not necessarily a disorder. {old}It might be a very old habit.",
      sfx: [['scratch', 'twist', 0.5], ['pop', 'mix'], ['ding', 'old', 0.4]],
      draw(k) {
        chap(k, 'First sleep, second sleep', true);
        night(k, { mx: 1700, my: 160 });
        k.text('THE TWIST', 960, 150, { size: 90, font: 'title', color: P.yellow, fx: 'pop', p: k.at('twist', 0.4), outline: P.ink, outlineWidth: 14 });
        const items = [['mix', 'LIGHT', 'sun'], [k.cue('mix', 0.6), 'SEASONS', 'cloud'], [k.cue('mix', 1.2), 'CULTURE', 'person']];
        items.forEach(([c, t, ic], i) => {
          k.icon(ic, 520 + i * 440, 360, 130, { p: k.at(c, 0.5) });
          note(k, t, 520 + i * 440, 480, c, { size: 50, color: '#fff3c4', outline: P.ink, fx: 'pop' });
        });
        note(k, 'no single "natural" way to sleep', 960, 580, 'none', { size: 54, color: P.yellow, outline: P.ink });
        lying(k, 1040, 930, 280, YOU, { face: k.t > k.cue('fall') ? 'sleep' : k.t > k.cue('you') ? 'calm' : 'sleep', a: k.at('you', 0.5) });
        k.text('3:00', 600, 800, { size: 70, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at('you', 0.4), outline: P.ink, outlineWidth: 10 });
        k.text('a very old habit ✓', 1380, 760, { size: 56, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at('old', 0.4), outline: P.ink, outlineWidth: 10 });
      },
    },

    // ---------------- Chapter 6: Never alone ----------------
    {
      chapter: 'Never alone',
      say: "{q}One more thing your ancestors rarely did: sleep alone. {group}In hunter-gatherer camps, people tend to sleep close together, {kids}and babies sleep right next to their mothers. {warm}It's warmer. {safe}It's safer. {room}A quiet room, by yourself, with the door locked, {odd}would have seemed like a very odd thing to want.",
      sfx: [['pop', 'group'], ['pop', 'kids'], ['ding', 'warm', 0.3], ['ding', 'safe', 0.3], ['click', 'room', 0.5]],
      draw(k) {
        chap(k, 'Never alone', true);
        campNight(k, { fx: 340, fs: 200, fire: 0.6 });
        const t = k.at('room', 0.6, 'inOut');
        k.group({ x: -t * 160 }, () => {
          lying(k, 860, G + 60, 280, ANC(), { a: k.at('group', 0.5) });
          lying(k, 1180, G + 100, 280, ANCW(), { a: k.at('group', 0.5) });
          lying(k, 1090, G + 150, 170, KID, { a: k.at('kids', 0.5) });
          lying(k, 1460, G + 60, 260, ELDER, { a: k.at('group', 0.5) });
        });
        glow(k, 620, G - 100, 900, 0.4);
        note(k, 'WARMER', 900, 300, 'warm', { size: 64, color: P.orange, outline: P.ink, fx: 'pop' });
        note(k, 'SAFER', 1260, 300, 'safe', { size: 64, color: '#9fe8c8', outline: P.ink, fx: 'pop' });
        // phòng đơn khoá cửa
        k.group({ a: t }, () => {
          k.rect(1440, 420, 400, 420, { fill: '#e8e2d4', fillStyle: 'solid', width: 6, seed: 1050 });
          k.prop('bed', 1640, 720, 300);
          k.text('LOCKED', 1640, 470, { size: 40, font: 'title', color: P.brown });
        });
        k.text('…weird?', 1640, 380, { size: 56, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('odd', 0.4), outline: P.ink, outlineWidth: 10 });
      },
    },
    {
      say: "{silence}They didn't sleep in silence, either. {sounds}A crackling fire. People murmuring. A baby. Wind. Animals. {app}Today, millions of people use apps that play crackling fire sounds to help them sleep. {joke}Your ancestors had the premium version. Free. With real smoke.",
      sfx: [['pop', 'app'], ['cash', 'joke', 0.4]],
      draw(k) {
        chap(k, 'Never alone');
        paper(k);
        k.prop('campfire', 520, 560, 420, { p: k.at('silence', 0.5) });
        const words = ['crackle', 'murmur', 'waaah', 'whoosh', 'hoo-hoo'];
        words.forEach((w, i) => k.text(w, 260 + (i % 3) * 260, 220 + Math.floor(i / 3) * 110, { size: 44, font: 'title', color: P.brown, fx: 'pop', p: k.at(k.cue('sounds', i * 0.5), 0.4), outline: '#fffaf0', outlineWidth: 8 }));
        k.prop('phone', 1420, 520, 380, { p: k.at('app', 0.5) });
        k.prop('campfire', 1420, 520, 140, { p: k.at('app', 0.5), fire: 0.8 });
        note(k, 'fire sounds app', 1420, 770, 'app', { size: 44 });
        k.text('PREMIUM. FREE. REAL SMOKE.', 960, 940, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at('joke', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      },
    },

    // ---------------- Chapter 7: Why modern sleep feels broken ----------------
    {
      chapter: 'Why modern sleep feels broken',
      say: "{q}So why does modern sleep feel so broken? {not}Not because you sleep less than a hunter-gatherer. {every}It's because almost everything around your sleep has changed. {light}Bright light late at night tells your brain it's still daytime. {warm}Warm, sealed bedrooms never cool down. {alarm}And an alarm cuts your sleep off at the same time every morning, whether your body is ready or not.",
      sfx: [['drumroll', 'q', 0.3], ['pop', 'light'], ['pop', 'warm'], ['bonk', 'alarm', 0.5]],
      draw(k) {
        chap(k, 'Why modern sleep feels broken', true);
        k.ctx.fillStyle = '#1f2440'; k.ctx.fillRect(0, 0, k.W, k.H);
        k.ctx.fillStyle = '#2b3152'; k.ctx.fillRect(0, 760, k.W, 320);
        k.prop('bed', 960, 700, 700);
        lying(k, 1160, 690, 300, YOU, { face: k.t > k.cue('alarm') ? 'shock' : k.t > k.cue('light') ? 'blank' : 'sleep' });
        k.prop('phone', 520, 420, 200, { p: k.at('light', 0.4) });
        const glowP = k.at('light', 0.6);
        if (glowP > 0) { const { ctx } = k; ctx.save(); ctx.globalAlpha = 0.25 * glowP; ctx.fillStyle = '#9fd3ff'; ctx.beginPath(); ctx.arc(520, 420, 260, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
        k.prop('thermo', 1280, 360, 220, { level: 0.85, p: k.at('warm', 0.5) });
        note(k, 'too warm', 1280, 520, 'warm', { size: 44, color: '#ff8a7a', outline: P.ink });
        const sh = k.shake('alarm', 1, 12);
        k.group({ x: sh.x, y: sh.y }, () => k.icon('clock', 1700, 640, 160, { p: k.at('alarm', 0.3) }));
        k.burst(1700, 470, 90, 'BRRING!', { p: k.at('alarm', 0.3), fill: P.yellow });
        k.text('not less sleep — different nights', 960, 160, { size: 58, font: 'title', color: '#fff3c4', p: k.at('not', 1.6, 'linear'), outline: P.ink, outlineWidth: 10 });
      },
    },
    {
      say: '{lesson}So here is what the research suggests your ancestors could teach you. {a}Get bright light in the morning. {b}Dim the lights at night. {c}Keep the bedroom cool. {d}And if you wake up in the middle of the night, {e}don\'t panic. {f}Your ancestors did it too.',
      sfx: [['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['ding', 'f', 0.4]],
      draw(k) {
        chap(k, 'Why modern sleep feels broken');
        paper(k);
        k.text('ANCESTOR-APPROVED SLEEP', 960, 120, { size: 70, font: 'title', color: P.red, fx: 'pop', p: k.at('lesson', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        const items = [['a', 'sun', 'Morning light'], ['b', 'moon', 'Dim evenings'], ['c', 'thermo', 'Cool bedroom'], ['d', 'clock', '3 a.m.? Don\'t panic']];
        items.forEach(([c, prop, t], i) => {
          const y = 270 + i * 165;
          if (prop === 'clock' || prop === 'sun') k.icon(prop, 380, y, 110, { p: k.at(c, 0.5) });
          else k.prop(prop, 380, y, 130, { p: k.at(c, 0.5), level: 0.3, fill: '#7FB5D5' });
          k.text(t, 480, y, { size: 62, font: 'title', align: 'left', p: k.at(c, 1.2, 'linear'), color: P.ink });
        });
        k.char(1600, 1000, 400, { ...ANC(), face: 'happy', pose: k.t > k.cue('f') ? 'cheer' : 'present', p: k.at('d', 0.5) });
      },
    },
    {
      chapter: 'Back to the fire',
      say: "{again}So, picture it one more time. {wake}You wake up in the dark. {fire}The fire is low. {watch}Somewhere, an old woman is already awake, keeping watch. {roll}You roll over, {back}and go back to sleep. {normal}For most of your species' history, that wasn't a story. {plain}It was simply a normal night. {phone}Tonight, you'll probably check your phone instead.",
      sfx: [['whoosh', 'again', 0.4], ['wahwah', 'phone', 0.3]],
      draw(k) {
        chap(k, 'Back to the fire', true);
        campNight(k, { fx: 760, fs: 200, fire: 0.4 });
        k.char(1180, G + 30, 340, { ...ELDER, face: 'calm', prop: 'staff', p: k.at('watch', 0.6) });
        for (let i = 0; i < 4; i++) lying(k, 320 + i * 220 + (i > 1 ? 700 : 0), G + 80 + (i % 2) * 40, 200, i === 1 ? YOU : i % 2 ? ANCW() : ANC(), { face: i === 1 && k.t < k.cue('back') ? 'calm' : 'sleep' });
        zzz(k, 300, 740, 'back');
        glow(k, 860, G - 80, 820, 0.55);
        k.text('a normal night', 960, 220, { size: 70, font: 'title', color: '#fff3c4', fx: 'fade', p: k.at('plain', 0.8), outline: P.ink, outlineWidth: 12 });
        // điện thoại sáng lên ở cuối
        const pp = k.at('phone', 0.4);
        if (pp > 0) { const { ctx } = k; ctx.save(); ctx.globalAlpha = 0.85 * pp; ctx.fillStyle = '#0d0f1a'; ctx.fillRect(0, 0, k.W, k.H); ctx.restore(); k.prop('phone', 960, 540, 380, { p: pp }); const c = k.ctx; c.save(); c.globalAlpha = 0.3 * pp; c.fillStyle = '#9fd3ff'; c.beginPath(); c.arc(960, 540, 320, 0, Math.PI * 2); c.fill(); c.restore(); }
      },
    },

    // ---------------- Recap ----------------
    {
      chapter: 'Recap',
      say: '{remind}Before the recap: remember that firelight talk. You will need it next time. {t}Quick recap. {a}Your ancestors slept on grass beds, with built-in bug spray, at least two hundred thousand years ago. {b}People without electricity sleep about six to seven hours, not ten. {c}Falling temperature sets the clock. {d}Someone in camp is almost always awake. {e}And first sleep and second sleep were once perfectly normal.',
      sfx: [['ding', 'remind', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['pop', 'e']],
      draw(k) {
        k.group({ a: 1 - k.at('t', 0.4) }, () => {
          paper(k);
          k.prop('campfire', 960, 560, 360);
          k.text('remember the firelight talk', 960, 260, { size: 64, font: 'title', color: P.red, fx: 'pop', p: k.at(k.cue('remind', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 10 });
        });
        k.group({ a: k.at('t', 0.4) }, () => {
          paper(k);
          k.text('RECAP', 960, 110, { size: 80, font: 'title', color: P.red, p: k.at('t', 0.8, 'linear') });
          const rows = [['a', 'grassbed', 'Grass beds + bug spray · 200,000 years'], ['b', 'moon', '~6–7 hours, not 10'], ['c', 'thermo', 'Cooling night = sleep clock'], ['d', 'campfire', 'Someone is always awake'], ['e', 'candle', 'First sleep & second sleep']];
          rows.forEach(([c, prop, t], i) => {
            const y = 250 + i * 160;
            k.prop(prop, 300, y, 120, { p: k.at(c, 0.5), level: 0.3, fire: 0.8 });
            k.text(t, 400, y, { size: 56, font: 'title', align: 'left', p: k.at(c, 1.4, 'linear'), color: P.ink });
          });
        });
      },
    },
    nextEpisodeScene({
      lang: 'en',
      say: '{next}Next episode: How Fire Made You Human. {why}Why did your ancestors gossip during the day, {hook}but tell stories at night? {cook}And did cooking really help grow your brain, or is that just a good story? {when}Friday.',
      title: 'How Fire Made You Human',
      hook: 'Gossip by day. Stories by night. Why?',
      when: 'FRIDAY · 12 PM ET',
      art: (k) => {
        k.prop('campfire', 0, 10, 260);
        k.char(-300, 140, 240, { ...ELDER, face: 'happy', pose: 'present' });
        k.char(300, 140, 240, { ...KID, face: 'shock', flip: true });
      },
      sfx: [['boom', 'hook', 0.3]],
    }),
    subscribeScene({
      lang: 'en',
      say: "So, be honest. {q}Are you a night owl or an early bird? Drop it in the comments, along with which shift you would have taken. {sub}And subscribe, so you don't miss what happened next, around the fire.",
      question: 'Night owl or early bird?',
      channel: 'Long Story Drawn',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
