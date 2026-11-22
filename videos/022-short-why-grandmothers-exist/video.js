// Shorts — Why do grandmothers exist? (dọc 9:16, cắt từ tập 021 How Did Ancient Humans Raise Kids?)
// Đối chiếu: sống lâu sau khi hết sinh sản là hiếm ở động vật; cá voi sát thủ (và cá voi hoa tiêu vây ngắn) là số ít ngoại lệ đã biết.
//  Hawkes 1989 "Hardworking Hadza grandmothers"; Hawkes, O'Connell & Blurton Jones 1997 (Current Anthropology): sau khi mẹ có em bé mới,
//  cân nặng của trẻ đã cai sữa đi theo mức kiếm ăn của bà. Grandmother hypothesis — còn tranh cãi (nói rõ).
import { fullVideoScene } from '/engine/templates.js';
import { P, ELDER, KID, ANCW, flat, paper, note, card } from '/channel/long-story-drawn.js';

const G = 1250;
const GRAN = { ...ELDER, skin: '#9a6b42', color: '#8a5a3a' };
const HADZAW = ANCW({ color: '#a8744a', color2: '#e0302b', skin: '#9a6b42', hair: 'short' });
const HAWKES = { body: 'woman', outfit: 'dress', color: '#4E9A45', color2: P.yellow, hair: 'long', hairColor: '#8a6a4a' };
function sky(k) {
  flat(k, P.sky, P.sand, G);
  k.dot(900, 180, 70, P.yellow);
}

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    format: 'short',
    captions: true,
    title: 'Why Do Grandmothers Exist? 👵 #shorts',
    description: 'Almost no animal lives for decades after it stops having babies — but humans do. One explanation starts with hard-working Hadza grandmothers. Watch the full story, "How Did Ancient Humans Raise Kids?", on Long Story Drawn.',
    tags: ['why do grandmothers exist', 'grandmother hypothesis', 'why do humans have menopause', 'menopause evolution', 'killer whales menopause', 'hadza', 'human evolution', 'ancient humans', 'shorts', 'long story drawn'],
    hashtags: ['shorts', 'evolution', 'science'],
    voice: 'en-US-AndrewMultilingualNeural',
    rate: '-2%',
    pitch: '-2Hz',
    categoryId: '27',
    images: { poster: 'assets/poster.jpg' },
    music: 'assets/music/background.mp3',
    musicVolume: 0.08,
    sfxVolume: 0.5,
    transition: 'fade',
  },

  scenes: [
    {
      lead: 0.1,
      say: "{q}Almost no animal lives long after it stops having babies. {you}Humans do. {fifty}Women stop at around fifty, and can live for decades after. {orca}Killer whales are one of the very few others. {why}So why does grandma exist?",
      sfx: [['pop', 'q'], ['ding', 'you', 0.4], ['whoosh', 'orca', 0.4], ['drumroll', 'why', 0.3]],
      draw(k) {
        paper(k);
        k.text('WHY DOES', 540, 200, { size: 110, font: 'title', color: P.ink, fx: 'pop', p: k.at('q', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.text('GRANDMA EXIST?', 540, 330, { size: 96, font: 'title', color: P.red, fx: 'pop', p: k.at('why', 0.4), outline: '#fffaf0', outlineWidth: 14 });
        k.char(300, 900, 440, { ...GRAN, face: k.t > k.cue('why') ? 'smug' : 'happy', p: k.at('you', 0.5) });
        const p = k.at('fifty', 1.2);
        k.rect(560, 520, 440 * Math.min(1, p * 1.6), 70, { fill: P.orange, fillStyle: 'solid', width: 4, seed: 2201 });
        note(k, 'babies', 780, 480, 'fifty', { size: 40, color: P.brown });
        k.rect(560, 620, 440 * Math.max(0, p * 1.6 - 0.6), 70, { fill: '#f7c08a', fillStyle: 'solid', width: 4, seed: 2202 });
        note(k, 'decades more', 780, 730, k.cue('fifty', 0.8), { size: 40, color: P.grass, fx: 'pop' });
        k.prop('orca', 760, 1080, 320, { p: k.at('orca', 0.5), bob: 3 });
        note(k, 'orcas too', 760, 1220, 'orca', { size: 54, color: P.indigo, fx: 'pop' });
      },
    },
    {
      say: "{hawkes}Kristen Hawkes and her team watched Hadza foragers in Tanzania. {work}Some of the hardest workers in camp were the grandmothers, {dig}digging up tubers. {baby}And when a mother had a new baby, {weight}her older kids' weight tracked how much grandma foraged.",
      sfx: [['pop', 'hawkes'], ['ding', 'work', 0.4], ['scratch', 'dig', 0.3], ['pop', 'baby'], ['tada', 'weight', 0.4]],
      draw(k) {
        sky(k);
        card(k, 540, 200, ['KRISTEN HAWKES ET AL.', 'Hadza, Tanzania · 1997'], 'hawkes', { w: 760 });
        const dig = Math.sin((k.gt ?? 0) * 6) * 0.15 * k.at('dig', 0.5);
        k.group({ x: 220, y: G + 30, r: 0.1 + dig }, () => k.char(0, 0, 460, { ...GRAN, face: 'happy', prop: 'staff', pose: 'hold', p: k.at('hawkes', 0.5) }));
        for (let i = 0; i < 3; i++) k.prop('tuber', 420 + i * 90, G - 10, 110, { p: k.at(k.cue('dig', 0.6 + i * 0.5), 0.4) });
        k.char(700, G + 30, 380, { ...HADZAW, face: 'calm', pose: 'hold', p: k.at('hawkes', 0.5) });
        k.prop('baby', 712, G + 30 - 190, 114, { skin: '#9a6b42', p: k.at('baby', 0.5) });
        k.char(930, G + 30, 220, { ...KID, skin: '#9a6b42', face: 'laugh', p: k.at('weight', 0.5) });
        note(k, "grandma's food → kid grows", 540, 450, 'weight', { size: 56, color: P.grass, fx: 'pop' });
        k.text('HARDEST WORKERS', 540, 360, { size: 76, font: 'title', color: P.red, fx: 'pop', p: k.at('work', 0.4) * (1 - k.at('weight', 0.3)), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: "{idea}That's the grandmother hypothesis: {help}grandmothers who helped feed the kids may be one reason humans live so long. {debate}It's still debated. {joke}So next time grandma makes you eat seconds, {built}she's doing what she evolved to do.",
      sfx: [['ding', 'idea', 0.4], ['pop', 'help'], ['boing', 'debate', 0.3], ['pop', 'joke'], ['sparkle', 'built', 0.4]],
      draw(k) {
        paper(k);
        card(k, 540, 220, ['THE GRANDMOTHER', 'HYPOTHESIS'], 'idea', { w: 640 });
        note(k, '(still debated)', 540, 380, 'debate', { size: 46, color: '#6b5f55' });
        k.char(340, 1180, 520, { ...GRAN, face: 'happy', pose: 'present', p: k.at('help', 0.5) });
        k.char(780, 1180, 340, { ...KID, skin: '#9a6b42', face: k.t > k.cue('joke') ? 'shock' : 'happy', p: k.at('help', 0.5) });
        const p = k.at('joke', 0.6);
        ['tuber', 'meat', 'berries', 'baobab'].forEach((f, i) => k.prop(f, 780 + (i % 2) * 120 - 60, 760 - Math.floor(i / 2) * 110, 120, { p: k.at(k.cue('joke', i * 0.3), 0.4) }));
        k.text('EAT MORE!', 400, 560, { size: 84, font: 'title', color: P.orange, fx: 'pop', p, outline: '#fffaf0', outlineWidth: 12 });
        k.text('…evolution at work', 540, 1270, { size: 60, font: 'title', color: P.grass, fx: 'pop', p: k.at('built', 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    fullVideoScene({
      lang: 'en',
      say: "{full}The full story of how your ancestors raised kids is on the channel. Link below.",
      image: 'poster',
      title: 'How Did Ancient Humans Raise Kids?',
      channel: 'Long Story Drawn',
      tail: 1.2,
    }),
  ],
};
