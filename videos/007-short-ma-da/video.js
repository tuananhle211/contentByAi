// Shorts — Ma da: vì sao ông bà cấm trẻ con tắm sông trưa? (dọc 9:16, cắt từ tập 005 Halloween)
// Đối chiếu: tín ngưỡng ma da (hồn người chết đuối bắt người thế mạng); nguy cơ thật: không ai trông, nước lạnh đột ngột gây chuột rút, xoáy nước.
// Số liệu đuối nước trẻ em (~2.000 ca/năm) đã dùng ở tập 005; ở đây chỉ nhắc lời khuyên an toàn.
import { C } from '/engine/kit.js';
import { fullVideoScene } from '/engine/templates.js';

const G = 1150;
const GRANDMA = { body: 'woman', outfit: 'dress', color: '#6b4a2d', color2: '#c9a24a', hair: 'bun', hairColor: '#b9b4ab' };
const GHOST = { body: 'woman', outfit: 'dress', color: '#eef2f0', color2: '#c9d6d0', hair: 'ghost', skin: '#dfe8e4', face: 'blank', float: true };
const KID = (c, extra = {}) => ({ body: 'kid', outfit: 'tunic', color: c, color2: '#f6c344', hair: 'short', ...extra });
const big = (k, s, y, size, color, p, o = {}) => k.text(s, k.W / 2, y, { size, font: 'title', color, fx: 'pop', p, outline: o.outline ?? '#fffaf0', outlineWidth: size * 0.14, maxWidth: k.W - 80 });
function say(k, text, c, box, tail, o = {}) {
  k.bubble(box[0], box[1], box[2], box[3], tail[0], tail[1], { p: k.at(c, 0.4), text, size: o.size ?? 44 });
}

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    format: 'short',
    captions: true,
    title: 'Vì sao ông bà cấm tắm sông buổi trưa? 👻 Ma da #shorts',
    description: 'Ma da kéo chân người tắm sông — lời dọa quen thuộc của ông bà. Nhưng phía sau là một bài học an toàn có thật. Xem đủ 5 con ma dân gian Việt trong tập đầy đủ trên kênh Vẽ Là Hiểu!',
    tags: ['ma da', 'chuyện ma việt nam', 'ma da kéo chân', 'truyền thuyết dân gian', 'đuối nước', 'shorts', 'vẽ là hiểu'],
    hashtags: ['shorts', 'mada', 'chuyenma'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '+0%',
    voices: {
      grandma: { voice: 'vi-VN-HoaiMyNeural', pitch: '-6Hz', rate: '-6%' },
    },
    images: { poster: 'assets/poster.jpg' },
    music: 'assets/music/spooky.mp3',
    musicVolume: 0.08,
    sfxVolume: 0.5,
    transition: 'fade',
  },

  scenes: [
    {
      lead: 0.1,
      say: [
        'Vì sao ngày xưa, {no}ông bà cấm tiệt trẻ con tắm sông buổi trưa?',
        { v: 'grandma', text: '{warn}Trưa nắng mà tắm sông, ma da nó kéo chân cho đấy!' },
      ],
      sfx: [['pop', 0.2], ['scratch', 'warn', 0.5], ['boing', ['warn', 0.4], 0.4]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.water(G + 20, { amp: 8 });
        big(k, 'VÌ SAO CẤM', 220, 100, '#3b2f2a', k.at(0, 0.5));
        big(k, 'TẮM SÔNG TRƯA?', 350, 104, '#e4572e', k.at(0.3, 0.5));
        k.char(330, G, 360, { ...KID('#2e86de'), face: k.t > k.cue('warn') ? 'shock' : 'happy', pose: k.t > k.cue('warn') ? 'shrug' : 'cheer', bob: 3 });
        k.char(760, G, 430, { ...GRANDMA, face: k.t > k.cue('warn') ? 'shout' : 'calm', pose: k.t > k.cue('warn') ? 'point' : 'stand', p: k.at('no', 0.5) });
        say(k, 'Trưa nắng mà tắm sông, ma da nó kéo chân cho đấy!', 'warn', [60, 470, 960, 150], [700, 740], { size: 42 });
      },
    },
    {
      say: 'Theo lời đồn, {ghost}ma da là hồn người chết đuối, {wait}nằm chờ dưới đáy sông. {pull}Ai bơi qua, nó kéo chân xuống, {swap}để có người… chết thay.',
      sfx: [['stinger', 'ghost', 0.6], ['drip', 'wait', 0.6], ['heartbeat', 'pull', 0.7], ['heartbeat', ['pull', 1], 0.7]],
      draw(k) {
        k.backdrop('night', { ground: 620 });
        k.prop('moon', 860, 220, 200);
        k.water(620, { color: '#23415c', amp: 6 });
        const pull = k.at('pull', 2, 'inOut');
        k.char(540, 700 + pull * 120, 230, { ...KID('#e4572e'), face: 'shock', pose: 'shout', shadow: false, p: k.at(0.2, 0.5) });
        k.prop('hands', 540, 1060 - pull * 120, 340, { reach: k.at('pull', 1.5, 'inOut'), p: k.at('pull', 0.5) });
        k.glowEyes(540, 1180, 1.2, '#9fe8c8', { p: k.at('wait', 1) });
        k.char(860, 1250, 420, { ...GHOST, p: k.at('swap', 0.8), alpha: 0.5 });
        k.ctx.save(); k.ctx.fillStyle = 'rgba(20,40,60,0.35)'; k.ctx.fillRect(0, 760, k.W, 700); k.ctx.restore();
        k.darkness(0.45, [{ x: 860, y: 220, r: 420 }, { x: 540, y: 1100, r: 360 }]);
        big(k, 'MA DA', 380, 170, '#9fe8c8', k.at('ghost', 0.5), { outline: '#1b1b24' });
      },
    },
    {
      say: 'Nhưng thử nghĩ xem: {noon}buổi trưa, người lớn đi nghỉ, {alone}trẻ con lén ra sông, không ai trông. {cold}Nước mặt thì ấm, xuống sâu lạnh đột ngột, dễ chuột rút. {whirl}Lại thêm xoáy nước. {real}Đó mới là "ma da" thật.',
      sfx: [['pop', 'noon'], ['pop', 'alone'], ['pop', 'cold'], ['whoosh', 'whirl', 0.5], ['ding', 'real', 0.6]],
      draw(k) {
        k.text('SỰ THẬT', k.W / 2, 160, { size: 96, font: 'title', color: '#b5482c', fx: 'pop', p: k.at(0, 0.5), outline: '#fffaf0', outlineWidth: 14 });
        const rows = [['noon', 'Trưa: người lớn đi nghỉ'], ['alone', 'Không ai trông trẻ'], ['cold', 'Nước lạnh → chuột rút'], ['whirl', 'Xoáy nước']];
        const { ctx } = k; const t = k.gt ?? 0;
        rows.forEach(([c, txt], i) => {
          const y = 340 + i * 230, p = k.at(c, 0.5);
          if (i === 0) k.icon('clock', 190, y, 150, { p });
          if (i === 1) k.char(190, y + 90, 180, { ...KID('#2e86de'), face: 'smug', pose: 'stand', p, shadow: false });
          if (i === 2) k.text('❄', 190, y + 10, { size: 120, color: '#5b9bd5', fx: 'pop', p });
          if (i === 3 && p > 0) { ctx.save(); ctx.globalAlpha *= p; ctx.strokeStyle = '#2f78c4'; ctx.lineWidth = 7; ctx.beginPath(); for (let a = 0; a < 14; a += 0.2) { const r = 6 + a * 4.6; const x = 190 + Math.cos(a + t * 3) * r, yy = y + Math.sin(a + t * 3) * r * 0.6; a ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); ctx.restore(); }
          k.text(txt, 320, y, { size: 56, font: 'title', align: 'left', p: k.at(c, 1, 'linear'), maxWidth: 720 });
        });
        k.group({ x: k.W / 2, y: 1220, r: -0.06, s: Math.max(0.01, k.ease.back(k.at('real', 0.5))), a: k.at('real', 0.2) }, () => {
          k.rect(-330, -70, 660, 140, { width: 8, stroke: '#c0392b', seed: 21 });
          k.text('"MA DA" THẬT', 0, 4, { size: 70, font: 'title', color: '#c0392b' });
        });
      },
    },
    {
      say: 'Nên lời dọa của ông bà, {true}thực ra là một bài học an toàn. {swim}Cách trừ ma da tốt nhất: cho trẻ học bơi, {never}và đừng bao giờ tắm sông một mình.',
      sfx: [['ding', 'true', 0.5], ['sparkle', 'swim', 0.5], ['pop', 'never']],
      draw(k) {
        k.backdrop('day', { ground: 1000 });
        k.water(1000, { color: '#5b9bd5', amp: 6 });
        big(k, 'BÀI HỌC AN TOÀN', 220, 86, '#3f6f2a', k.at('true', 0.5));
        k.char(360, 1000, 420, { body: 'man', outfit: 'tunic', color: '#2e86de', color2: '#f6c344', hair: 'short', face: 'happy', pose: 'present', p: k.at('swim', 0.5), shadow: false });
        k.char(700, 1060, 240, { ...KID('#e4572e'), face: 'laugh', pose: 'cheer', p: k.at(k.cue('swim', 0.3), 0.5), shadow: false, bob: 4 });
        k.ctx.save(); k.ctx.globalAlpha *= k.at(k.cue('swim', 0.3), 0.5); k.ctx.lineWidth = 18; k.ctx.strokeStyle = '#e4572e'; k.ctx.beginPath(); k.ctx.arc(700, 1005, 54, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.restore();
        k.text('HỌC BƠI', 540, 380, { size: 110, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('swim', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.text('không tắm sông một mình', 540, 1230, { size: 54, font: 'title', fx: 'fade', p: k.at('never', 0.5), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    fullVideoScene({
      say: '{full}Còn bốn con ma kia đáng sợ cỡ nào? Xem tập đầy đủ trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: '5 con ma đáng sợ nhất dân gian Việt Nam',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
