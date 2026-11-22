// Shorts — Is waking up at 3 a.m. normal? (dọc 9:16, cắt từ tập 011 How Did Ancient Humans Actually Sleep?)
// Đối chiếu: A. Roger Ekirch — hàng trăm ghi chép ở châu Âu tiền công nghiệp về "first sleep" / "second sleep"; thức giữa đêm ~1 giờ (cầu nguyện, trò chuyện, thăm hàng xóm).
//  Thomas Wehr 1992 (NIMH): 14 giờ bóng tối mỗi ngày trong nhiều tuần → giấc ngủ chia hai khối. Nói "might", không khẳng định là chuẩn duy nhất.
import { fullVideoScene } from '/engine/templates.js';
import { P, YOU, HIST, flat, stars, paper, note, card, lying, zzz } from '/channel/long-story-drawn.js';

const G = 1250;

export default {
  meta: {
    style: 'clean',
    lang: 'en',
    speed: 1.0,
    format: 'short',
    captions: true,
    title: 'Is Waking Up at 3 A.M. Normal? 🌙 #shorts',
    description: 'Waking up at 3 a.m. and lying there awake? For centuries, people slept in two shifts — "first sleep" and "second sleep". Watch the full story, "How Did Ancient Humans Actually Sleep?", on Long Story Drawn.',
    tags: ['waking up at 3am', 'why do i wake up at 3am', 'first sleep second sleep', 'segmented sleep', 'biphasic sleep', 'sleep history', 'ancient humans', 'shorts', 'long story drawn'],
    hashtags: ['shorts', 'sleep', 'history'],
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
      say: "{q}Do you ever wake up at three a.m. for no reason? {lie}You lie there, staring at the ceiling, {panic}and start worrying that something's wrong with you?",
      sfx: [['pop', 'q'], ['wahwah', 'panic', 0.4]],
      draw(k) {
        flat(k, P.indigo, '#2b3152', G);
        stars(k, 30, 700);
        k.prop('moon', 860, 260, 220);
        k.text('3:00 AM', k.W / 2, 420, { size: 170, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at('q', 0.5), outline: P.ink, outlineWidth: 18 });
        k.prop('bed', 560, 1040, 640);
        lying(k, 720, 1030, 300, YOU, { face: k.t > k.cue('panic') ? 'shock' : 'blank' });
        k.sweat(420, 880, 1.8, { p: k.at('panic', 0.4) });
        k.icon('question', 860, 760, 150, { p: k.at('panic', 0.5), stroke: P.yellow });
      },
    },
    {
      say: "{ekirch}Historian Roger Ekirch found hundreds of old records from pre-industrial Europe describing two sleeps every night. {first}First sleep. {awake}Then an hour or so awake: praying, talking, even visiting the neighbors. {second}Then, second sleep.",
      sfx: [['pop', 'ekirch'], ['ding', 'first', 0.4], ['pop', 'awake'], ['ding', 'second', 0.4]],
      draw(k) {
        paper(k, '#efe6d2');
        card(k, 540, 220, ['A. ROGER EKIRCH', 'historian · "At Day\'s Close"'], 'ekirch', { w: 760 });
        k.char(300, 840, 460, { ...HIST, face: 'calm', pose: 'hold', prop: 'scroll', p: k.at('ekirch', 0.5) });
        k.prop('scroll', 760, 560, 260, { p: k.at('ekirch', 0.6) });
        const y = 1000, x0 = 90, w = 900;
        k.rect(x0, y, w * 0.4, 90, { fill: P.night, fillStyle: 'solid', width: 5, p: k.at('first', 0.5), seed: 1600 });
        k.rect(x0 + w * 0.4, y, w * 0.18, 90, { fill: P.yellow, fillStyle: 'solid', width: 5, p: k.at('awake', 0.5), seed: 1601 });
        k.rect(x0 + w * 0.58, y, w * 0.42, 90, { fill: P.night, fillStyle: 'solid', width: 5, p: k.at('second', 0.5), seed: 1602 });
        note(k, 'FIRST SLEEP', x0 + w * 0.2, y + 150, 'first', { size: 48, color: P.indigo, fx: 'pop' });
        note(k, 'awake', x0 + w * 0.49, y - 50, 'awake', { size: 46, color: P.orange, fx: 'pop' });
        note(k, 'SECOND SLEEP', x0 + w * 0.79, y + 150, 'second', { size: 48, color: P.indigo, fx: 'pop' });
        k.prop('candle', 800, 800, 160, { p: k.at('awake', 0.5) });
      },
    },
    {
      say: "{wehr}And in a 1990s experiment, volunteers given fourteen hours of darkness a day slowly drifted into that same split pattern. {so}So that three a.m. wake-up might not be a problem at all. {old}It might be a very old habit.",
      sfx: [['click', 'wehr', 0.5], ['ding', 'so', 0.4], ['sparkle', 'old', 0.4]],
      draw(k) {
        flat(k, P.indigo, '#2b3152', G);
        stars(k, 30, 700);
        card(k, 540, 220, ['THOMAS WEHR · 1992', '14 hours of darkness a day'], 'wehr', { w: 760 });
        lying(k, 700, 760, 340, YOU, { face: k.t > k.cue('old') ? 'sleep' : 'calm' });
        zzz(k, 380, 620, 'old', 1.3);
        k.text('3:00 AM', 540, 940, { size: 90, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at('so', 0.4), outline: P.ink, outlineWidth: 12 });
        k.text('a very old habit ✓', 540, 1100, { size: 74, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at('old', 0.4), outline: P.ink, outlineWidth: 12 });
      },
    },
    fullVideoScene({
      lang: 'en',
      say: "{full}The full story of how your ancestors really slept is on the channel. Link below.",
      image: 'poster',
      title: 'How Did Ancient Humans Actually Sleep?',
      channel: 'Long Story Drawn',
      tail: 1.2,
    }),
  ],
};
