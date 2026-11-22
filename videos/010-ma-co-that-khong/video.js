// Halloween 2 — Ma có thật không? 5 lần "gặp ma" khoa học giải thích được (hoạt hình phẳng, bí ẩn + tếu nhẹ)
// Đối chiếu:
//  Ma trơi (will-o'-the-wisp): giả thuyết phổ biến — khí từ phân huỷ hữu cơ (phosphine/diphosphine, methane); diphosphine tự bốc cháy trong không khí.
//  Ma dắt: Souman, Frissen, Sreenivasa & Ernst (2009, Current Biology, Viện Max Planck): đi trong rừng (Đức) và sa mạc Sahara không thấy mặt trời
//    → đi vòng tròn; bịt mắt → vòng có khi chỉ ~20 m.
//  Nhà có ma: co giãn nhiệt của gỗ, mái tôn, ống nước; Vic Tandy & Tony Lawrence (1998, Journal of the Society for Psychical Research,
//    "The Ghost in the Machine"): quạt phát hạ âm ~19 Hz gây bất an, thấy bóng xám; tắt quạt thì hết.
//  Pareidolia: nhận nhầm khuôn mặt; giải thích tiến hoá (thà nhận nhầm còn hơn bỏ sót) — nêu là "nhiều nhà khoa học cho rằng".
//  Bóng đè (sleep paralysis): tỉnh giữa giấc REM khi cơ còn bị ức chế; Sharpless & Barber (2011) ước tính ~7,6% dân số từng gặp;
//    kanashibari (Nhật), "Old Hag" (Newfoundland), tranh "The Nightmare" của Henry Fuseli (1781).
// Tôn trọng tín ngưỡng: chỉ giải thích hiện tượng, không giễu người tin tâm linh.
import { C } from '/engine/kit.js';
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import * as thumbs from '/videos/010-ma-co-that-khong/thumbs.js';

const G = 880;
const GRANDMA = { body: 'woman', outfit: 'dress', color: '#6b4a2d', color2: '#c9a24a', hair: 'bun', hairColor: '#b9b4ab' };
const KID = (c, extra = {}) => ({ body: 'kid', outfit: 'tunic', color: c, color2: '#f6c344', hair: 'short', ...extra });
const VIL = (c, extra = {}) => ({ body: 'man', outfit: 'tunic', color: c, color2: '#f6c344', hair: 'short', ...extra });
const SLEEPER = { body: 'man', outfit: 'tunic', color: '#2e86de', color2: '#f6c344', hair: 'short' };
const THUY = { body: 'big', outfit: 'robe', color: '#2f78c4', color2: '#9fd3f2', hair: 'long', hairColor: '#1d3f66', hat: 'wave', cape: '#1d4f8a', prop: 'trident' };
const SCI = { body: 'woman', outfit: 'robe', color: '#ffffff', color2: '#7ec8f0', hair: 'bun', hairColor: '#3b2f2a' };

function chap(k, text, dark = true) {
  k.text(text, 60, 56, { size: 30, align: 'left', color: dark ? '#c9c3b8' : '#6b5f55', fx: 'fade', p: k.at(0, 0.6), outline: dark ? '#1b1b24' : '#fffaf0', outlineWidth: 8 });
}
function cap(k, text, cue, o = {}) {
  const dark = o.dark ?? false;
  k.text(text, k.W / 2, o.y ?? 995, { size: o.size ?? 54, font: 'title', p: k.at(cue, o.dur ?? 1.2, 'linear'), maxWidth: 1760, color: dark ? '#fff3c4' : '#3b2f2a', outline: dark ? '#1b1b24' : '#fffaf0', outlineWidth: 12 });
}
function say(k, text, c, box, tail, o = {}) {
  k.bubble(box[0], box[1], box[2], box[3], tail[0], tail[1], { p: k.at(c, 0.4), text, size: o.size ?? 44, fill: o.fill });
}
function night(k, o = {}) {
  k.backdrop('night', { ground: o.ground ?? G });
  if (o.moon !== false) k.prop('moon', o.mx ?? 1650, o.my ?? 170, 240);
}
// Thẻ số thứ tự lớn: "#5 MA TRƠI".
function card(k, n, name, cue, dark = true) {
  const p = k.at(cue, 0.5);
  if (p <= 0) return;
  k.group({ x: 960, y: 230, s: k.ease.back(p) }, () => {
    k.text(`#${n}`, 0, -40, { size: 150, font: 'title', color: '#e4572e', outline: dark ? '#1b1b24' : '#fffaf0', outlineWidth: 18 });
    k.text(name, 0, 90, { size: 80, font: 'title', color: dark ? '#fff3c4' : '#3b2f2a', outline: dark ? '#1b1b24' : '#fffaf0', outlineWidth: 12 });
  });
}
// Nhãn "KHOA HỌC" góc trên phải cho các cảnh giải thích.
function sciTag(k) {
  k.group({ x: 1700, y: 70, r: 0.04 }, () => {
    k.rect(-150, -34, 300, 68, { fill: '#2e86de', width: 4, seed: 900 });
    k.text('KHOA HỌC', 0, 4, { size: 34, font: 'title', color: '#fff' });
  });
}
// Phòng ngủ ban đêm + giường + người nằm (đầu bên trái). mood = cảm xúc.
function bedroom(k, mood, o = {}) {
  const { ctx } = k;
  ctx.fillStyle = '#232a40'; ctx.fillRect(0, 0, k.W, k.H);
  ctx.fillStyle = '#181d2e'; ctx.fillRect(0, 760, k.W, 320);
  k.rect(1460, 160, 300, 330, { fill: '#3d5a8a', width: 5, seed: 901 });
  k.line(1610, 160, 1610, 490, { width: 5, seed: 902 }); k.line(1460, 325, 1760, 325, { width: 5, seed: 903 });
  k.prop('moon', 1690, 230, 110);
  const x = o.x ?? 820, y = o.y ?? 760;
  k.rect(x - 360, y - 50, 720, 70, { fill: '#7a4e2d', width: 4, seed: 904 });
  for (const lx of [x - 340, x + 320]) k.rect(lx, y + 20, 20, 70, { fill: '#5a3a22', width: 3, seed: 905 + lx });
  k.ellipse(x - 270, y - 72, 170, 70, { fill: '#f2efe6', width: 4, seed: 907 });
  k.group({ x: x + 250, y: y - 92, r: -Math.PI / 2 }, () => k.char(0, 0, 470, { ...SLEEPER, face: mood, pose: 'stand', shadow: false }));
  k.rect(x - 140, y - 125, 430, 85, { fill: '#5b7bd5', width: 4, seed: 908 });
}
// Bóng đen hình người, mắt phát sáng (tuỳ chọn).
function shadowMan(k, x, y, h, a, eyes = 0) {
  if (a <= 0) return;
  const { ctx } = k; const sway = Math.sin((k.gt ?? 0) * 1.5) * 4;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#05060b';
  ctx.beginPath(); ctx.arc(x + sway, y - h * 0.86, h * 0.12, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - h * 0.16 + sway, y - h * 0.72); ctx.quadraticCurveTo(x - h * 0.28, y - h * 0.3, x - h * 0.22, y);
  ctx.lineTo(x + h * 0.22, y); ctx.quadraticCurveTo(x + h * 0.28, y - h * 0.3, x + h * 0.16 + sway, y - h * 0.72); ctx.closePath(); ctx.fill();
  ctx.restore();
  if (eyes > 0) k.glowEyes(x + sway, y - h * 0.86, h / 300, '#ff4d4d', { p: eyes });
}
// Đốm ma trơi.
function wisp(k, x, y, s = 1, a = 1) {
  if (a <= 0) return;
  const { ctx } = k; const fl = 0.75 + 0.25 * Math.sin((k.gt ?? 0) * 9 + x);
  ctx.save(); ctx.globalAlpha *= a * fl;
  const g = ctx.createRadialGradient(x, y, 0, x, y, 60 * s);
  g.addColorStop(0, 'rgba(210,255,255,0.95)'); g.addColorStop(0.3, 'rgba(120,230,255,0.6)'); g.addColorStop(1, 'rgba(80,200,255,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 60 * s, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
// Nấm mồ + bia.
function grave(k, x, y, s, seed) {
  k.ellipse(x, y, 200 * s, 70 * s, { fill: '#4a4036', width: 3, seed });
  k.rect(x - 28 * s, y - 110 * s, 56 * s, 90 * s, { fill: '#8a8f99', width: 3, seed: seed + 1 });
}
// Quạt trần (nhìn ngang) — cánh quay theo spin.
function fan(k, x, y, s, spin) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#9aa3ad'; ctx.fillRect(-6, -120, 12, 100);
  ctx.save(); ctx.scale(1, 0.25); ctx.rotate(spin);
  for (let i = 0; i < 3; i++) { ctx.rotate((Math.PI * 2) / 3); ctx.beginPath(); ctx.ellipse(70, 0, 70, 18, 0, 0, Math.PI * 2); ctx.fillStyle = '#c9d0d8'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#3b2f2a'; ctx.stroke(); }
  ctx.restore();
  ctx.beginPath(); ctx.arc(0, -16, 16, 0, Math.PI * 2); ctx.fillStyle = '#6b7380'; ctx.fill(); ctx.stroke();
  ctx.restore();
}
// Nhà mái tôn (mái lượn sóng).
function tinHouse(k, x, y, s, o = {}) {
  k.group({ x, y, s }, () => {
    k.rect(-180, -160, 360, 160, { fill: o.wall ?? '#e9dcc0', width: 4, seed: 920 });
    k.rect(-40, -100, 80, 100, { fill: '#7a4e2d', width: 3, seed: 921 });
    k.rect(110, -120, 50, 50, { fill: o.win ?? '#f6d77a', width: 3, seed: 922 });
    k.poly([[-220, -150], [0, -270], [220, -150]], { fill: '#8fa3b5', width: 4, seed: 923 });
    for (let i = -4; i <= 4; i++) k.line(i * 40, -150, i * 22, -258 + Math.abs(i) * 2, { width: 2, stroke: '#5f7385', seed: 930 + i });
  });
}
function gecko(k, x, y, s, flip) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -s : s, s);
  ctx.fillStyle = '#c8b48a'; ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.ellipse(0, 0, 34, 11, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(40, 0, 14, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-32, 0); ctx.quadraticCurveTo(-60, 10, -78, -6); ctx.stroke();
  for (const [lx, d] of [[18, 1], [18, -1], [-18, 1], [-18, -1]]) { ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx + 6, d * 22); ctx.stroke(); }
  ctx.fillStyle = '#3b2f2a'; ctx.beginPath(); ctx.arc(46, -3, 2.5, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
// Ổ điện "có mặt" và đầu xe "có mặt".
function plugFace(k, x, y, p) {
  k.group({ x, y, s: Math.max(0.01, k.ease.back(Math.min(1, p))), a: Math.min(1, p * 3) }, () => {
    k.rect(-110, -110, 220, 220, { fill: '#f4f1ea', width: 5, seed: 940 });
    k.rect(-50, -55, 18, 50, { fill: '#3b2f2a', stroke: 'none', seed: 941 }); k.rect(32, -55, 18, 50, { fill: '#3b2f2a', stroke: 'none', seed: 942 });
    k.arc(0, 30, 40, 0.15 * Math.PI, 0.85 * Math.PI, { width: 8, seed: 943 });
  });
}
function carFace(k, x, y, p) {
  k.group({ x, y, s: Math.max(0.01, k.ease.back(Math.min(1, p))), a: Math.min(1, p * 3) }, () => {
    k.rect(-170, -100, 340, 170, { fill: '#e4572e', width: 5, seed: 950 });
    k.rect(-130, -170, 260, 80, { fill: '#9fd3f2', width: 5, seed: 951 });
    k.circle(-95, -30, 30, { fill: '#fff3c4', width: 4, seed: 952 }); k.circle(95, -30, 30, { fill: '#fff3c4', width: 4, seed: 953 });
    k.rect(-70, 20, 140, 26, { fill: '#3b2f2a', stroke: 'none', seed: 954 });
  });
}

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    title: 'Ma có thật không? 5 lần "gặp ma" khoa học giải thích được',
    description: `Bóng đè lúc 3 giờ sáng, ma trơi ngoài nghĩa địa, bị "ma dắt" đi lòng vòng trong rừng, nhà có tiếng cót két, nhìn đâu cũng thấy mặt ma… Ma có thật không? Khoa học đã giải thích được rất nhiều lần "gặp ma" của người Việt.
Series Sinh vật dân gian của Vẽ Là Hiểu: kể chuyện ma trước, rồi để khoa học lên tiếng — từ thí nghiệm của Viện Max Planck, vụ "phòng thí nghiệm có ma" của Vic Tandy, đến hiện tượng tê liệt khi ngủ.`,
    footer: `📚 Nguồn tham khảo: Souman và cộng sự (2009, Current Biology) — người lạc đường đi vòng tròn; Tandy & Lawrence (1998) — hạ âm 19 Hz; Sharpless & Barber (2011) — tỉ lệ bóng đè; tranh "The Nightmare" của Henry Fuseli (1781).
⚠️ Video giải thích hiện tượng, không nhằm phủ nhận niềm tin tâm linh của ai. Nếu bóng đè xảy ra thường xuyên, hãy hỏi ý kiến bác sĩ.
🔔 Đăng ký Vẽ Là Hiểu — tập trước: 5 con ma đáng sợ nhất dân gian Việt Nam. Tập sau: truyền thuyết đô thị Việt Nam.`,
    tags: ['ma có thật không', 'bóng đè', 'bóng đè là gì', 'ma trơi', 'bị ma dắt', 'khoa học giải thích ma', 'hiện tượng tâm linh', 'chuyện ma việt nam', 'vẽ là hiểu'],
    hashtags: ['macothatkhong', 'khoahoc', 'chuyenma'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '-2%',
    pitch: '-4Hz',
    voices: {
      grandma: { voice: 'vi-VN-HoaiMyNeural', pitch: '-25Hz', rate: '-12%' },
      kid: { voice: 'vi-VN-HoaiMyNeural', pitch: '+35Hz', rate: '+8%' },
      villager: { voice: 'vi-VN-NamMinhNeural', pitch: '+10Hz', rate: '+10%' },
    },
    images: { prev: 'assets/prev.jpg', next: 'assets/next.jpg' },
    transition: 'fade',
    paper: '#f7f3ea',
    music: 'assets/music/spooky.mp3',
    musicVolume: 0.12,
    sfxVolume: 0.55,
  },

  scenes: [
    // ---------------- Mở đầu ----------------
    {
      chapter: 'Mở đầu',
      lead: 0.3,
      say: '{dark}Ba giờ sáng. {wake}Bạn tỉnh dậy, {cant}nhưng không thể cử động. {shadow}Ở góc phòng, có một bóng đen… đang nhìn bạn. {you}Nếu bạn từng gặp cảnh này, bạn không hề một mình.',
      sfx: [['heartbeat', 'dark', 0.6], ['heartbeat', ['dark', 1], 0.6], ['stinger', 'shadow', 0.9], ['heartbeat', 'you', 0.6]],
      draw(k) {
        bedroom(k, k.t > k.cue('cant') ? 'shock' : k.t > k.cue('wake') ? 'calm' : 'blank');
        k.text('3:00', 360, 300, { size: 110, font: 'title', color: '#ff6b6b', fx: 'pop', p: k.at('dark', 0.5), outline: '#1b1b24', outlineWidth: 12 });
        shadowMan(k, 1300, 760, 520, k.at('shadow', 2), k.at(k.cue('shadow', 1), 0.5));
        k.sweat(560, 610, 1.6, { p: k.at('cant', 0.4) });
        k.darkness(0.55, [{ x: 1610, y: 330, r: 360 }, { x: 560, y: 660, r: 300 }]);
        k.vignette(0.6);
      },
    },
    {
      say: 'Đây là series Sinh vật dân gian của Vẽ Là Hiểu. {prev}Tập trước, mình kể năm con ma đáng sợ nhất dân gian. {today}Hôm nay, câu hỏi lớn hơn: {q}ma có thật không? {sub}Nếu bạn mới đến, tập năm con ma đang chờ bạn ở cuối video.',
      sfx: [['pop', 'prev'], ['drumroll', 'today', 0.3], ['stinger', 'q', 0.6], ['ding', 'sub', 0.5]],
      draw(k) {
        k.ctx.fillStyle = '#1d2233'; k.ctx.fillRect(0, 0, k.W, k.H);
        const p = k.at('prev', 0.6);
        k.group({ x: 560, y: 470, r: -0.04, s: Math.max(0.01, k.ease.back(p)) }, () => {
          k.rect(-372, -216, 744, 432, { fill: '#fffaf0', width: 6, p: p > 0 ? 1 : 0, seed: 960 });
          k.image('prev', -360, -204, 720, 408, { fx: 'fade', p: p > 0 ? 1 : 0 });
        });
        k.text('tập trước', 560, 760, { size: 50, font: 'title', color: '#c9c3b8', fx: 'fade', p: k.at(k.cue('prev', 0.5), 0.5) });
        k.text('MA', 1450, 360, { size: 150, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('q', 0.5), outline: '#1b1b24', outlineWidth: 16 });
        k.text('CÓ THẬT KHÔNG?', 1450, 520, { size: 92, font: 'title', color: '#e4572e', fx: 'pop', p: k.at(k.cue('q', 0.4), 0.5), outline: '#1b1b24', outlineWidth: 14 });
        k.icon('question', 1780, 260, 140, { p: k.at(k.cue('q', 0.6), 0.5) });
        k.text('↓ cuối video', 560, 860, { size: 44, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at('sub', 0.5) });
      },
    },
    {
      say: 'Năm lần "gặp ma" mà người Việt hay kể nhất: {l1}ma trơi, {l2}ma dắt, {l3}nhà có ma, {l4}thấy mặt ma, {l5}và bóng đè. {rule}Luật chơi: kể chuyện ma trước, {sci}rồi để khoa học lên tiếng. {respect}Còn chuyện tâm linh, tin hay không là quyền của bạn.',
      sfx: [['pop', 'l1'], ['pop', 'l2'], ['pop', 'l3'], ['pop', 'l4'], ['pop', 'l5'], ['drumroll', 'rule', 0.3], ['tada', 'sci', 0.5]],
      draw(k) {
        night(k, { mx: 1700, my: 150 });
        const items = [['l1', 'Ma trơi'], ['l2', 'Ma dắt'], ['l3', 'Nhà có ma'], ['l4', 'Mặt ma'], ['l5', 'Bóng đè']];
        items.forEach(([c, t], i) => {
          const x = 240 + i * 360, p = k.at(c, 0.5);
          k.group({ x, y: 480, r: (i % 2 ? 0.04 : -0.04), s: Math.max(0.01, k.ease.back(p)), a: Math.min(1, p * 3) }, () => {
            k.rect(-150, -170, 300, 340, { fill: '#2b3350', width: 5, seed: 970 + i });
            k.text(`#${5 - i}`, 0, -80, { size: 80, font: 'title', color: '#e4572e' });
            k.text(t, 0, 60, { size: 50, font: 'title', color: '#fff3c4', maxWidth: 270 });
          });
        });
        k.darkness(0.3, [{ x: 960, y: 480, r: 900 }]);
        k.text('CHUYỆN MA', 620, 820, { size: 70, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at('rule', 0.5), outline: '#1b1b24', outlineWidth: 12 });
        k.text('vs', 960, 820, { size: 56, font: 'title', color: '#c9c3b8', fx: 'pop', p: k.at(k.cue('rule', 0.5), 0.4), outline: '#1b1b24', outlineWidth: 10 });
        k.text('KHOA HỌC', 1300, 820, { size: 70, font: 'title', color: '#7ec8f0', fx: 'pop', p: k.at('sci', 0.5), outline: '#1b1b24', outlineWidth: 12 });
        k.text('(tin hay không là quyền của bạn)', 960, 960, { size: 40, weight: 600, color: '#c9c3b8', fx: 'fade', p: k.at('respect', 0.5) });
      },
    },

    // ---------------- #5 Ma trơi ----------------
    {
      chapter: '#5 Ma trơi',
      say: [
        '{field}Ngày xưa, đi qua nghĩa địa hay bãi đầm ban đêm, {fire}người ta hay thấy những đốm lửa xanh lập lòe, {float}lơ lửng sát mặt đất. {chase}Chạy thì nó đuổi theo. {stop}Đứng lại thì nó dừng.',
        { v: 'kid', text: '{run}Ma trơi! Chạy đi!' },
      ],
      sfx: [['owl', 'field', 0.5], ['stinger', 'fire', 0.7], ['whoosh', 'chase', 0.6], ['scratch', 'stop', 0.5], ['boing', 'run', 0.5]],
      draw(k) {
        chap(k, '#5 · Ma trơi');
        night(k, { mx: 300, my: 160 });
        for (let i = 0; i < 4; i++) grave(k, 520 + i * 330, 820 - (i % 2) * 30, 1, 980 + i * 3);
        k.prop('banyan', 1700, 560, 600, {});
        const run = k.at('chase', 2.4, 'inOut');
        const kx = k.lerp(1300, 300, run);
        for (let i = 0; i < 4; i++) {
          const wx = k.lerp(700 + i * 260, kx + 240 + i * 90, run), wy = 640 + Math.sin(k.gt * 2 + i * 2) * 30 - i * 20;
          wisp(k, wx, wy, 0.9 + (i % 2) * 0.3, k.at(k.cue('fire', i * 0.25), 0.8));
        }
        k.char(kx, G, 240, { ...KID('#e4572e'), face: k.t > k.cue('fire') ? 'shock' : 'calm', pose: k.t > k.cue('run') ? 'shout' : 'stand', walk: run > 0 && run < 1, flip: true });
        k.fog({ y: 860, alpha: 0.35 });
        k.darkness(0.55, [{ x: 300, y: 160, r: 380 }, ...[0, 1, 2, 3].map((i) => ({ x: k.lerp(700 + i * 260, kx + 240 + i * 90, run), y: 640, r: 200 }))]);
        card(k, 5, 'MA TRƠI', 'field');
        say(k, 'Ma trơi! Chạy đi!', 'run', [140, 420, 420, 110], [kx, 650]);
      },
    },
    {
      say: '{sci}Khoa học giải thích thế nào? {rot}Xác động vật, thực vật phân huỷ dưới đất sinh ra nhiều loại khí, {gas}như phốt-phin và mê-tan. {fireup}Một số khí trong đó có thể tự bốc cháy khi gặp không khí, {blue}tạo ra ngọn lửa xanh nhạt, lập lòe. {place}Nghĩa địa xưa và đầm lầy, đúng là nơi có nhiều chất hữu cơ phân huỷ nhất.',
      sfx: [['ding', 'sci', 0.5], ['pop', 'rot'], ['pop', 'gas'], ['pop', ['gas', 0.6]], ['whoosh', 'fireup', 0.5], ['sparkle', 'blue', 0.5]],
      draw(k) {
        chap(k, '#5 · Ma trơi', false);
        sciTag(k);
        const { ctx } = k;
        ctx.fillStyle = '#d7ecf7'; ctx.fillRect(0, 0, k.W, 560);
        ctx.fillStyle = '#7a5a3e'; ctx.fillRect(0, 560, k.W, 520);
        ctx.fillStyle = '#5f4630'; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc((i * 137) % k.W, 640 + ((i * 71) % 380), 6 + (i % 3) * 3, 0, Math.PI * 2); ctx.fill(); }
        k.prop('tree', 300, 420, 260, {});
        k.prop('fish', 420, 860, 120, { fill: '#9c8f7a', p: k.at('rot', 0.5) });
        k.prop('tree', 260, 900, 140, { fill: '#7f8f5a', rotate: 1.4, p: k.at(k.cue('rot', 0.3), 0.5) });
        for (let i = 0; i < 6; i++) {
          const t = ((k.gt * 0.25 + i / 6) % 1); const y = k.lerp(820, 560, t);
          k.dot(760 + i * 70 + Math.sin(t * 8 + i) * 18, y, 14, i % 2 ? '#c9e6a0' : '#e8e0a8', k.at('gas', 0.5) * (1 - t * 0.6));
        }
        k.text('phốt-phin', 900, 470, { size: 50, font: 'title', fx: 'pop', p: k.at('gas', 0.4), color: '#6b5f00', outline: '#fffaf0', outlineWidth: 8 });
        k.text('mê-tan', 1180, 470, { size: 50, font: 'title', fx: 'pop', p: k.at(k.cue('gas', 0.6), 0.4), color: '#3f6f2a', outline: '#fffaf0', outlineWidth: 8 });
        k.arrow(1300, 420, 1440, 360, { p: k.at('fireup', 0.5), width: 5 });
        wisp(k, 1570, 330, 1.8, k.at('fireup', 0.8));
        k.text('tự bốc cháy!', 1570, 470, { size: 50, font: 'title', color: '#2f78c4', fx: 'pop', p: k.at('blue', 0.4), outline: '#fffaf0', outlineWidth: 8 });
        cap(k, 'nghĩa địa xưa, đầm lầy = nhiều chất hữu cơ phân huỷ', 'place', { color: '#fff3c4' });
      },
    },
    {
      say: '{why}Còn vì sao ma trơi "đuổi theo" người? {air}Khi bạn chạy, không khí phía sau bị kéo theo, {light}và đốm khí nhẹ đang cháy trôi theo luồng gió ấy. {stand}Bạn dừng, gió dừng, ma trơi cũng dừng. {joke}Không phải ma theo bạn. Là bạn… kéo nó theo.',
      sfx: [['drumroll', 'why', 0.3], ['whoosh', 'air', 0.6], ['pop', 'stand'], ['boing', 'joke', 0.6]],
      draw(k) {
        chap(k, '#5 · Ma trơi', false);
        sciTag(k);
        k.backdrop('sunset', { ground: G });
        const run = Math.min(k.at('air', 3, 'inOut'), 1 - 0.8 * k.at('stand', 0.6));
        const kx = k.lerp(1500, 600, k.at('air', 3, 'inOut'));
        k.char(kx, G, 300, { ...KID('#e4572e'), face: k.t > k.cue('joke') ? 'smug' : 'shock', pose: k.t > k.cue('stand') ? 'hips' : 'shout', walk: run > 0.05 && k.t < k.cue('stand'), flip: true });
        for (let i = 0; i < 5; i++) k.motion(kx + 160 + i * 60, 560 + i * 50, 1, 0, { p: k.t < k.cue('stand') ? k.at('air', 0.4) : 0, n: 1, len: 120 });
        wisp(k, kx + 380 + Math.sin(k.gt * 3) * 20, 620, 1.3, k.at('light', 0.6));
        k.text('luồng gió', kx + 400, 480, { size: 44, font: 'title', fx: 'fade', p: k.at('air', 0.5) * (1 - k.at('stand', 0.4)), outline: '#fffaf0', outlineWidth: 8 });
        k.text('BẠN KÉO NÓ THEO!', 960, 220, { size: 90, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('joke', 0.5), outline: '#fffaf0', outlineWidth: 14 });
      },
    },
    {
      say: '{today}Ngày nay, ma trơi hiếm hẳn. {drain}Đầm lầy bị san lấp, nghĩa trang được quy hoạch lại, {lamp}và đường làng đã có đèn điện. {gone}Hoá ra, cột đèn đường là "thầy trừ tà" giỏi nhất.',
      sfx: [['pop', 'drain'], ['ding', 'lamp', 0.5], ['tada', 'gone', 0.5]],
      draw(k) {
        chap(k, '#5 · Ma trơi');
        const on = k.at('lamp', 0.6);
        night(k, { mx: 1650, my: 160 });
        for (let i = 0; i < 3; i++) {
          const x = 380 + i * 560;
          k.rect(x - 8, 380, 16, 500, { fill: '#5f6670', width: 3, seed: 1000 + i });
          k.rect(x - 8, 380, 110, 16, { fill: '#5f6670', width: 3, seed: 1010 + i });
          k.ellipse(x + 100, 404, 60, 26, { fill: on > 0 ? '#fff3c4' : '#8a8a8a', width: 3, seed: 1020 + i });
        }
        for (let i = 0; i < 3; i++) wisp(k, 650 + i * 400, 700, 1, 0.9 * (1 - on));
        k.darkness(0.6 * (1 - on * 0.7), [{ x: 1650, y: 160, r: 380 }, ...[0, 1, 2].map((i) => ({ x: 480 + i * 560, y: 620, r: 420 * on + 1, warm: 1 }))]);
        k.text('"thầy trừ tà" giỏi nhất', 960, 230, { size: 80, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('gone', 0.5), outline: '#1b1b24', outlineWidth: 12 });
      },
    },

    // ---------------- #4 Ma dắt ----------------
    {
      chapter: '#4 Ma dắt',
      say: [
        '{forest}Chuyện thứ tư: bị "ma dắt". {walk}Người đi rừng, đi mãi, đi mãi… {back}rồi bàng hoàng nhận ra mình quay về đúng gốc cây lúc nãy.',
        { v: 'villager', text: '{huh}Ủa? Cái cây này… mình vừa đi qua mà?!' },
        '{folk}Dân gian bảo: bị ma giấu, ma dắt, ma che mắt cho đi lòng vòng.',
      ],
      sfx: [['owl', 'forest', 0.5], ['pop', 'walk'], ['stinger', 'back', 0.7], ['scratch', 'huh', 0.5], ['heartbeat', 'folk', 0.5]],
      draw(k) {
        chap(k, '#4 · Ma dắt');
        night(k, { mx: 1700, my: 150 });
        const cx = 960, cy = 760, R = 520;
        for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; k.prop('tree', cx + Math.cos(a) * 760, 560 + Math.sin(a) * 120, 300 + (i % 3) * 60, { fill: '#2f5a32' }); }
        const pw = k.at('walk', 6, 'linear');
        const a0 = -Math.PI / 2;
        const { ctx } = k;
        ctx.save(); ctx.setLineDash([14, 14]); ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(255,243,196,0.6)'; ctx.beginPath();
        for (let t = 0; t <= pw; t += 0.01) { const a = a0 + t * Math.PI * 2; const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R * 0.22; t ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.stroke(); ctx.restore();
        const a = a0 + pw * Math.PI * 2;
        k.prop('tree', cx, cy - R * 0.22 - 10, 380, { fill: '#3f7a3a' });
        k.char(cx + Math.cos(a) * R, cy + Math.sin(a) * R * 0.22 + 60, 240, { ...VIL('#9c6b3f'), face: k.t > k.cue('back') ? 'shock' : 'calm', pose: k.t > k.cue('huh') ? 'shrug' : 'stand', walk: pw > 0 && pw < 1, flip: Math.sin(a) > 0, shadow: false });
        k.fog({ y: 860, alpha: 0.3 });
        k.darkness(0.5, [{ x: 1700, y: 150, r: 380 }, { x: cx, y: cy, r: 700 }]);
        card(k, 4, 'MA DẮT', 'forest');
        say(k, 'Ủa? Cái cây này… mình vừa đi qua mà?!', 'huh', [1100, 330, 640, 120], [cx + Math.cos(a) * R, cy - 120]);
      },
    },
    {
      say: '{exp}Năm 2009, các nhà khoa học ở Viện Max Planck, nước Đức, làm một thí nghiệm: {go}cho người đi thẳng một mạch, trong rừng và trên sa mạc Sahara. {sun}Khi có mặt trời làm mốc, họ đi khá thẳng. {cloud}Nhưng khi trời âm u, {circle}nhiều người bắt đầu đi vòng tròn, mà không hề hay biết.',
      sfx: [['ding', 'exp', 0.5], ['pop', 'go'], ['sparkle', 'sun', 0.4], ['whoosh', 'cloud', 0.4], ['boing', 'circle', 0.5]],
      draw(k) {
        chap(k, '#4 · Ma dắt', false);
        sciTag(k);
        k.text('Viện Max Planck · 2009', 960, 140, { size: 64, font: 'title', p: k.at('exp', 1.2, 'linear') });
        const panel = (x, sky, label, cue) => {
          k.rect(x - 400, 230, 800, 620, { fill: sky, width: 5, seed: 1100 + x });
          k.text(label, x, 300, { size: 50, font: 'title', p: k.at(cue, 0.8, 'linear'), outline: '#fffaf0', outlineWidth: 8 });
        };
        panel(500, '#d7ecf7', 'Có mặt trời', 'sun');
        panel(1420, '#b9bec6', 'Trời âm u', 'cloud');
        k.prop('sun', 760, 380, 140, { p: k.at('sun', 0.5) });
        k.prop('cloud', 1680, 380, 200, { fill: '#8a8f99', p: k.at('cloud', 0.5) });
        const p1 = k.at('sun', 2.5, 'linear');
        k.line(500, 820, 500, k.lerp(820, 420, p1), { width: 8, stroke: '#2f78c4', seed: 1110, p: p1 > 0 ? 1 : 0 });
        k.char(500, k.lerp(820, 420, p1) + 40, 120, { ...VIL('#9c6b3f'), pose: 'stand', walk: p1 > 0 && p1 < 1, shadow: false, p: k.at('go', 0.4) });
        const p2 = k.at('circle', 4, 'linear');
        const { ctx } = k;
        ctx.save(); ctx.lineWidth = 8; ctx.strokeStyle = '#e4572e'; ctx.beginPath();
        let ex = 1420, ey = 820;
        for (let t = 0; t <= p2; t += 0.005) { const a = t * Math.PI * 4; ex = 1420 + Math.sin(a) * (130 + t * 40) ; ey = 640 - (1 - Math.cos(a)) * (110 + t * 30) + 180; t ? ctx.lineTo(ex, ey) : ctx.moveTo(ex, ey); }
        if (p2 > 0) ctx.stroke(); ctx.restore();
        k.char(ex, ey + 40, 120, { ...VIL('#9c6b3f'), pose: 'shrug', face: 'blank', walk: p2 > 0 && p2 < 1, shadow: false, p: k.at('cloud', 0.4) });
        cap(k, 'Không có mốc → đi vòng tròn mà không biết', 'circle');
      },
    },
    {
      say: '{tiny}Lý do: mỗi bước chân lệch đi một chút xíu, {add}cộng dồn lại thành một vòng tròn lớn. {blind}Khi bị bịt mắt, có người đi vòng tròn chỉ rộng vài chục mét. {real}"Ma dắt", hoá ra là… bộ não mất phương hướng. {tip}Nên nếu lạc trong rừng: {stop}dừng lại, {mark}đánh dấu chỗ đứng, {wait}và chờ người tìm, thay vì đi tiếp lòng vòng.',
      sfx: [['pop', 'tiny'], ['pop', 'add'], ['pop', 'blind'], ['tada', 'real', 0.5], ['ding', 'tip', 0.4], ['pop', 'stop'], ['pop', 'mark'], ['pop', 'wait']],
      draw(k) {
        chap(k, '#4 · Ma dắt', false);
        sciTag(k);
        const pt = k.at('add', 2.5, 'linear');
        const { ctx } = k;
        ctx.save(); ctx.translate(560, 520);
        for (let i = 0; i < 24 * pt; i++) {
          const a = (i / 24) * Math.PI * 2;
          ctx.save(); ctx.translate(Math.cos(a) * 280, Math.sin(a) * 280); ctx.rotate(a + Math.PI); ctx.fillStyle = '#3b2f2a';
          ctx.beginPath(); ctx.ellipse(0, i % 2 ? 10 : -10, 9, 16, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        }
        ctx.restore();
        k.text('lệch 1 chút × nhiều bước', 560, 520, { size: 44, font: 'title', fx: 'fade', p: k.at('tiny', 0.5), maxWidth: 420 });
        k.text('"MA DẮT" = NÃO MẤT PHƯƠNG HƯỚNG', 960, 900, { size: 60, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('real', 0.5), outline: '#fffaf0', outlineWidth: 10 });
        const tips = [['stop', '1. Dừng lại'], ['mark', '2. Đánh dấu chỗ đứng'], ['wait', '3. Chờ người tìm']];
        k.text('Lạc trong rừng?', 1400, 220, { size: 60, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('tip', 0.5) });
        tips.forEach(([c, t], i) => k.text(t, 1180, 340 + i * 110, { size: 52, font: 'title', align: 'left', p: k.at(c, 0.8, 'linear') }));
      },
    },
    {
      chapter: 'Khoan đã…',
      say: 'Mà nói chuyện đáng sợ… {water}người Việt còn một "kẻ thù" đến hẹn lại lên: mỗi mùa mưa, dâng nước ngập cả kinh thành. {name}Có tên tuổi đàng hoàng: Thủy Tinh. {why}Vì sao năm nào ông ấy cũng quay lại? {sun}Mình đã giải mã ở tập Sơn Tinh, Thủy Tinh, xem xong tập này thì qua đó nhé.',
      sfx: [['scratch', 0.1, 0.4], ['boom', 'water', 0.5], ['stinger', 'name', 0.5], ['drumroll', 'why', 0.3], ['ding', 'sun', 0.5]],
      draw(k) {
        chap(k, 'Khoan đã…');
        k.backdrop('night', { ground: G });
        k.prop('storm', 420, 200, 320, { rain: 1, bolt: true, p: k.at('water', 0.5) });
        k.prop('storm', 1400, 180, 300, { rain: 1, p: k.at(k.cue('water', 0.3), 0.5) });
        k.prop('palace', 520, k.lerp(640, 600, k.at('water', 4)), 420, { rotate: Math.sin(k.gt * 1.2) * 0.03 });
        const lv = k.lerp(1100, 700, k.at('water', 4, 'inOut'));
        k.water(lv, { amp: 12 });
        k.char(1300, Math.max(lv + 80, 880), 460, { ...THUY, face: 'smug', pose: k.t > k.cue('why') ? 'shrug' : 'cheer', p: k.at('name', 0.6), shadow: false });
        k.text('THỦY TINH', 1300, 300, { size: 90, font: 'title', color: '#9fd3f2', fx: 'pop', p: k.at(k.cue('name', 0.3), 0.5), outline: '#1b1b24', outlineWidth: 14 });
        k.text('▶ tập Sơn Tinh – Thủy Tinh', 960, 1000, { size: 56, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('sun', 0.5), outline: '#1b1b24', outlineWidth: 10 });
      },
    },

    // ---------------- #3 Nhà có ma ----------------
    {
      chapter: '#3 Nhà có ma',
      say: [
        '{night}Chuyện thứ ba: nhà có ma. {sleep}Đêm khuya, cả nhà ngủ say, {crack}bỗng có tiếng "tách… tách", {creak}tiếng cót két trên mái, {step}như có ai đang đi lại.',
        { v: 'kid', text: '{mom}Mẹ ơi… có ai trên mái nhà!' },
      ],
      sfx: [['owl', 'night', 0.4], ['click', 'crack', 0.9], ['click', ['crack', 0.5], 0.9], ['creak', 'creak', 0.8], ['creak', 'step', 0.7], ['stinger', 'mom', 0.5]],
      draw(k) {
        chap(k, '#3 · Nhà có ma');
        night(k, { mx: 300, my: 160 });
        tinHouse(k, 960, G, 1.6, { win: '#3d5a8a' });
        k.text('tách…', 480, 520, { size: 60, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('crack', 0.3), outline: '#1b1b24', outlineWidth: 10 });
        k.text('tách…', 760, 400, { size: 60, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at(k.cue('crack', 0.5), 0.3), outline: '#1b1b24', outlineWidth: 10 });
        k.text('CÓT KÉT', 1480, 420, { size: 72, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('creak', 0.4), outline: '#1b1b24', outlineWidth: 12 });
        k.char(1180, 820, 150, { ...KID('#e4572e'), face: 'shock', pose: 'shout', p: k.at('mom', 0.4), shadow: false });
        k.darkness(0.55, [{ x: 300, y: 160, r: 380 }, { x: 1176, y: 690, r: 160, warm: 1, flicker: 1 }]);
        card(k, 3, 'NHÀ CÓ MA', 'night');
        say(k, 'Mẹ ơi… có ai trên mái nhà!', 'mom', [1300, 520, 560, 110], [1200, 660]);
      },
    },
    {
      say: '{temp}Thủ phạm thứ nhất: nhiệt độ. {day}Ban ngày nắng nóng, gỗ, mái tôn, ống nước nở ra. {cool}Về đêm trời mát, chúng co lại, {sound}phát ra tiếng tách tách, cót két. {joke}Con ma trên mái nhà bạn, thực ra là… mái tôn đang tập thể dục.',
      sfx: [['ding', 'temp', 0.5], ['sparkle', 'day', 0.4], ['whoosh', 'cool', 0.4], ['click', 'sound', 0.9], ['creak', ['sound', 0.4], 0.7], ['boing', 'joke', 0.6]],
      draw(k) {
        chap(k, '#3 · Nhà có ma', false);
        sciTag(k);
        const nightP = k.at('cool', 1);
        k.backdrop('day', { ground: G });
        k.backdrop('night', { ground: G, alpha: nightP });
        k.prop('sun', 300, 220, 220, { p: k.at('day', 0.5), alpha: 1 - nightP });
        k.prop('moon', 1650, 200, 200, { p: k.at('cool', 0.5) });
        const breathe = k.at('day', 1) * (1 - nightP) * 0.06 + (k.t > k.cue('sound') ? Math.sin(k.gt * 10) * 0.01 : 0);
        tinHouse(k, 960, G, 1.6 * (1 + breathe));
        k.arrow(560, 620, 420, 620, { p: k.at('day', 0.5) * (1 - nightP), width: 6, stroke: '#e4572e' });
        k.arrow(1360, 620, 1500, 620, { p: k.at('day', 0.5) * (1 - nightP), width: 6, stroke: '#e4572e' });
        k.text('NỞ RA', 960, 330, { size: 70, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('day', 0.5) * (1 - nightP), outline: '#fffaf0', outlineWidth: 10 });
        k.text('CO LẠI', 960, 330, { size: 70, font: 'title', color: '#7ec8f0', fx: 'pop', p: k.at('cool', 0.5), outline: '#1b1b24', outlineWidth: 10 });
        k.text('tách! cót két!', 1500, 420, { size: 54, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('sound', 0.4), outline: '#1b1b24', outlineWidth: 10 });
        cap(k, 'mái tôn đang "tập thể dục"', 'joke', { dark: true });
      },
    },
    {
      say: '{rat}Thủ phạm thứ hai: chuột chạy trên trần, {gecko}thạch sùng, {wind}và gió lùa qua khe cửa. {click}Riêng thạch sùng còn hay tặc lưỡi "chặc chặc" giữa đêm, {omen}mà ông bà mình vẫn bảo là… điềm báo.',
      sfx: [['pop', 'rat'], ['pop', 'gecko'], ['whoosh', 'wind', 0.6], ['click', 'click', 0.9], ['click', ['click', 0.25], 0.9], ['wahwah', 'omen', 0.4]],
      draw(k) {
        chap(k, '#3 · Nhà có ma', false);
        sciTag(k);
        const { ctx } = k;
        ctx.fillStyle = '#efe3c8'; ctx.fillRect(0, 0, k.W, k.H);
        ctx.fillStyle = '#d8c7a3'; ctx.fillRect(0, 0, k.W, 180);
        const rx = k.lerp(-150, 2100, (k.gt * 0.25) % 1);
        if (k.at('rat', 0.3) > 0) {
          ctx.save(); ctx.translate(rx, 150); ctx.fillStyle = '#7d858f'; ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.ellipse(0, 0, 50, 24, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.arc(40, -20, 12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(-48, 6); ctx.quadraticCurveTo(-100, 30, -130, 0); ctx.stroke(); ctx.restore();
        }
        k.text('chuột', 300, 260, { size: 50, font: 'title', fx: 'pop', p: k.at('rat', 0.4) });
        k.rect(1300, 300, 420, 520, { fill: '#7a4e2d', width: 5, seed: 1200 });
        k.rect(1330, 330, 360, 460, { fill: '#2b3350', width: 3, seed: 1201 });
        for (let i = 0; i < 4; i++) k.motion(1250, 420 + i * 90, -1, 0, { p: k.at('wind', 0.5), n: 1, len: 200 });
        k.text('gió lùa', 1040, 380, { size: 50, font: 'title', fx: 'pop', p: k.at('wind', 0.4) });
        if (k.at('gecko', 0.4) > 0) gecko(k, 620, 560, 2.4, false);
        k.text('thạch sùng', 620, 700, { size: 50, font: 'title', fx: 'pop', p: k.at('gecko', 0.4) });
        k.bubble(720, 330, 300, 100, 760, 520, { p: k.at('click', 0.4), text: 'Chặc chặc!', size: 46 });
        k.text('…điềm báo?', 620, 860, { size: 60, font: 'title', color: '#8e5bd3', fx: 'pop', p: k.at('omen', 0.5), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: '{fan}Còn một thủ phạm khó ngờ hơn. {y98}Năm 1998, kỹ sư người Anh Vic Tandy làm việc trong một phòng thí nghiệm bị đồn là "có ma": {feel}ai vào cũng thấy bất an, {grey}có người còn thấy bóng xám ở khoé mắt. {found}Hoá ra, một chiếc quạt mới lắp phát ra hạ âm, khoảng mười chín hẹc: {ear}tai không nghe thấy, nhưng cơ thể thì cảm nhận được. {off}Tắt quạt. Ma biến mất.',
      sfx: [['ding', 'fan', 0.4], ['pop', 'y98'], ['heartbeat', 'feel', 0.6], ['stinger', 'grey', 0.6], ['tada', 'found', 0.5], ['click', 'off', 0.9], ['sparkle', ['off', 0.4], 0.5]],
      draw(k) {
        chap(k, '#3 · Nhà có ma', false);
        sciTag(k);
        const off = k.at('off', 0.4);
        const { ctx } = k;
        ctx.fillStyle = '#dfe6ea'; ctx.fillRect(0, 0, k.W, k.H);
        ctx.fillStyle = '#b9c3c9'; ctx.fillRect(0, 820, k.W, 260);
        k.text('Vic Tandy · 1998', 520, 160, { size: 60, font: 'title', p: k.at('y98', 1, 'linear') });
        fan(k, 960, 260, 1.4, (k.gt ?? 0) * 18 * (1 - off));
        for (let i = 0; i < 4; i++) k.wave(700, 380 + i * 60, 520, { amp: 10, len: 90, phase: k.gt * 6 + i, stroke: '#8e5bd3', width: 4, alpha: k.at('found', 0.5) * (1 - off) });
        k.text('~19 Hz', 1340, 400, { size: 64, font: 'title', color: '#8e5bd3', fx: 'pop', p: k.at('found', 0.5) * (1 - off) });
        k.text('(tai không nghe được)', 1340, 480, { size: 40, weight: 600, fx: 'fade', p: k.at('ear', 0.5) * (1 - off) });
        k.char(620, G, 360, { body: 'man', outfit: 'robe', color: '#ffffff', color2: '#7ec8f0', hair: 'short', face: off > 0 ? 'happy' : k.t > k.cue('feel') ? 'sad' : 'calm', pose: off > 0 ? 'cheer' : 'think', p: k.at('feel', 0.5) });
        k.sweat(660, 520, 1.6, { p: k.at('feel', 0.4) * (1 - off) });
        shadowMan(k, 1700, G, 420, 0.5 * k.at('grey', 1) * (1 - off));
        k.text('TẮT QUẠT = HẾT MA', 960, 1000, { size: 64, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at(k.cue('off', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- #2 Mặt ma ----------------
    {
      chapter: '#2 Thấy mặt ma',
      say: '{dark}Chuyện thứ hai: nhìn thấy mặt ma. {coat}Chiếc áo treo sau cửa, {banana}bụi chuối đầu hè… {face}nhìn kỹ trong bóng tối, thấy rõ một khuôn mặt đang nhìn mình.',
      sfx: [['heartbeat', 'dark', 0.6], ['pop', 'coat'], ['pop', 'banana'], ['stinger', 'face', 0.9]],
      draw(k) {
        chap(k, '#2 · Thấy mặt ma');
        night(k, { mx: 1700, my: 150 });
        const { ctx } = k;
        k.rect(300, 200, 360, 680, { fill: '#5a3a22', width: 5, seed: 1300 });
        ctx.save(); ctx.globalAlpha *= k.at('coat', 0.5); ctx.fillStyle = '#4a4f63'; ctx.beginPath(); ctx.moveTo(400, 330); ctx.lineTo(560, 330); ctx.lineTo(600, 640); ctx.lineTo(360, 640); ctx.closePath(); ctx.fill(); ctx.restore();
        k.face(480, 420, 60, 'shock', { phase: 0 });
        for (let i = 0; i < 5; i++) { const a = -1.2 + i * 0.6; ctx.save(); ctx.globalAlpha *= k.at('banana', 0.5); ctx.translate(1300, 760); ctx.rotate(a); ctx.fillStyle = '#2f5a32'; ctx.beginPath(); ctx.ellipse(0, -200, 50, 200, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
        k.rect(1285, 700, 30, 180, { fill: '#4f7a3a', width: 3, seed: 1301, p: k.at('banana', 0.5) });
        k.glowEyes(1300, 520, 0.8, '#ffe066', { p: k.at('face', 0.4) });
        k.darkness(0.6, [{ x: 1700, y: 150, r: 360 }, { x: 480, y: 450, r: 260 }, { x: 1300, y: 560, r: 300 }]);
        k.face(480, 420, 60 * k.at('face', 0.5) + 0.01, 'blank');
        card(k, 2, 'MẶT MA', 'dark');
      },
    },
    {
      say: '{brain}Não người được "cài đặt" để nhận ra khuôn mặt cực nhanh. {fast}Nhanh đến mức nó nhận nhầm khắp nơi: {plug}ổ điện có mặt, {car}đầu xe ô tô có mặt, {moon}và cả… chú Cuội ngồi gốc cây đa trên mặt trăng. {name}Hiện tượng này có tên: pareidolia, ảo giác khuôn mặt.',
      sfx: [['ding', 'brain', 0.5], ['pop', 'plug'], ['pop', 'car'], ['sparkle', 'moon', 0.5], ['tada', 'name', 0.5]],
      draw(k) {
        chap(k, '#2 · Thấy mặt ma', false);
        sciTag(k);
        k.icon('brain', 960, 220, 200, { p: k.at('brain', 0.6) });
        plugFace(k, 400, 620, k.at('plug', 0.5));
        carFace(k, 960, 660, k.at('car', 0.5));
        const pm = k.at('moon', 0.6);
        k.group({ x: 1520, y: 600, s: Math.max(0.01, k.ease.back(pm)), a: Math.min(1, pm * 3) }, () => {
          k.circle(0, 0, 190, { fill: '#fff3c4', width: 5, seed: 1400 });
          k.prop('banyan', -20, 30, 200, { fill: '#c9b77a', alpha: 0.85 });
          k.char(60, 120, 90, { body: 'man', outfit: 'tunic', color: '#c9b77a', color2: '#c9b77a', hair: 'short', pose: 'think', shadow: false, alpha: 0.85 });
        });
        k.text('chú Cuội', 1520, 860, { size: 50, font: 'title', fx: 'pop', p: k.at(k.cue('moon', 0.6), 0.4) });
        k.text('PAREIDOLIA', 960, 980, { size: 84, font: 'title', color: '#8e5bd3', fx: 'pop', p: k.at('name', 0.5), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: '{why}Vì sao não lại "nhát" như vậy? {old}Nhiều nhà khoa học cho rằng: với tổ tiên ta, nhận nhầm bụi cây thành con hổ, {ok}chỉ mất công chạy một đoạn. {miss}Còn nhìn con hổ ra bụi cây, {dead}thì… không còn ai kể lại. {safe}Bộ não chọn thà sợ nhầm, còn hơn bỏ sót.',
      sfx: [['drumroll', 'why', 0.3], ['pop', 'old'], ['whoosh', 'ok', 0.5], ['stinger', 'miss', 0.5], ['wahwah', 'dead', 0.4], ['ding', 'safe', 0.5]],
      draw(k) {
        chap(k, '#2 · Thấy mặt ma', false);
        sciTag(k);
        k.backdrop('sunset', { ground: G });
        k.line(960, 160, 960, 1000, { width: 4, stroke: '#b9a37a', p: k.at('old', 0.5) });
        k.prop('tree', 300, 700, 300, { fill: '#4f7a3a', p: k.at('old', 0.5) });
        const run = k.at('ok', 2, 'inOut');
        k.char(k.lerp(620, 860, run), G, 260, { ...VIL('#9c6b3f', { outfit: 'bare', hat: 'feather' }), face: 'shock', pose: 'shout', walk: run > 0 && run < 1, p: k.at('old', 0.5) });
        k.text('nhầm → chạy cho chắc', 480, 300, { size: 46, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('ok', 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.icon('check', 480, 420, 110, { p: k.at(k.cue('ok', 0.6), 0.4) });
        k.prop('tiger', 1250, 760, 300, { p: k.at('miss', 0.5) });
        k.char(1640, G, 260, { ...VIL('#6b4a2d', { outfit: 'bare', hat: 'feather' }), face: 'calm', pose: 'hips', p: k.at('miss', 0.5) });
        k.bubble(1450, 260, 420, 100, 1620, 560, { p: k.at(k.cue('miss', 0.6), 0.4), text: 'Bụi cây thôi mà…', size: 40, think: true });
        k.icon('cross', 1440, 440, 120, { p: k.at('dead', 0.4) });
        cap(k, 'Thà sợ nhầm, còn hơn bỏ sót', 'safe');
      },
    },

    {
      say: '{dark}Còn vì sao chuyện ma hầu hết xảy ra ban đêm? {eye}Trong bóng tối, mắt ta chuyển sang dùng các tế bào nhìn đêm: {blur}thấy được ánh sáng yếu, nhưng nhìn rất mờ, và gần như không thấy màu. {guess}Thiếu thông tin, não phải tự "đoán" phần còn lại. {fear}Mà một bộ não đang sợ, thì toàn đoán… ra ma.',
      sfx: [['drumroll', 'dark', 0.3], ['pop', 'eye'], ['whoosh', 'blur', 0.4], ['pop', 'guess'], ['stinger', 'fear', 0.5]],
      draw(k) {
        chap(k, '#2 · Thấy mặt ma', false);
        sciTag(k);
        const { ctx } = k;
        k.rect(120, 200, 780, 560, { fill: '#d7ecf7', width: 5, seed: 1800 });
        k.prop('tree', 360, 640, 300, {});
        k.char(660, 700, 300, { ...VIL('#e4572e'), face: 'happy', pose: 'wave', shadow: false });
        k.text('ban ngày: rõ nét, đủ màu', 510, 820, { size: 44, font: 'title', p: k.at('eye', 1, 'linear') });
        k.rect(1020, 200, 780, 560, { fill: '#1d2233', width: 5, seed: 1801 });
        ctx.save(); ctx.globalAlpha *= k.at('blur', 0.8); ctx.filter = 'blur(10px) grayscale(1)';
        ctx.beginPath(); ctx.rect(1030, 210, 760, 540); ctx.clip();
        k.prop('tree', 1260, 640, 300, { fill: '#556' });
        k.char(1560, 700, 300, { ...VIL('#777'), face: 'blank', pose: 'stand', shadow: false });
        ctx.restore();
        k.text('ban đêm: mờ, không màu', 1410, 820, { size: 44, font: 'title', p: k.at('blur', 1, 'linear') });
        k.icon('brain', 960, 930, 120, { p: k.at('guess', 0.5) });
        k.icon('question', 1100, 900, 90, { p: k.at(k.cue('guess', 0.3), 0.4) });
        shadowMan(k, 1560, 700, 320, 0.8 * k.at('fear', 0.8), k.at(k.cue('fear', 0.5), 0.4));
        k.text('NÃO ĐOÁN RA MA', 1410, 140, { size: 60, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('fear', 0.5), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- #1 Bóng đè ----------------
    {
      chapter: '#1 Bóng đè',
      say: [
        '{back}Và chuyện số một, chuyện ở đầu video: bóng đè. {awake}Tỉnh táo hoàn toàn, mà chân tay không nhúc nhích. {chest}Ngực như có ai đè lên. {shadow}Nhiều người còn thấy rõ một bóng đen trong phòng.',
        { v: 'grandma', text: '{gm}Bị ma đè rồi con ơi!' },
      ],
      sfx: [['stinger', 'back', 0.7], ['heartbeat', 'awake', 0.7], ['heartbeat', 'chest', 0.8], ['stinger', 'shadow', 0.7]],
      draw(k) {
        chap(k, '#1 · Bóng đè');
        bedroom(k, 'shock');
        const sit = k.at('chest', 1.2);
        shadowMan(k, k.lerp(1350, 900, sit), k.lerp(760, 680, sit), k.lerp(520, 320, sit), k.at('back', 1), k.at('shadow', 0.5));
        k.sweat(560, 610, 1.6, { p: k.at('awake', 0.4) });
        k.darkness(0.55, [{ x: 1610, y: 330, r: 360 }, { x: 640, y: 660, r: 360 }]);
        card(k, 1, 'BÓNG ĐÈ', 'back');
        k.char(1700, 1000, 300, { ...GRANDMA, face: 'shock', pose: 'shout', p: k.at('gm', 0.4), shadow: false });
        say(k, 'Bị ma đè rồi con ơi!', 'gm', [1160, 480, 460, 110], [1640, 720]);
      },
    },
    {
      say: '{world}Không chỉ người Việt. {jp}Người Nhật gọi là kanashibari. {nf}Ở Newfoundland, Canada, người ta gọi là "Old Hag", mụ phù thuỷ già ngồi lên ngực. {paint}Năm 1781, hoạ sĩ Henry Fuseli còn vẽ hẳn một bức tranh nổi tiếng: {demon}một con quỷ nhỏ ngồi chễm chệ trên ngực người đang ngủ.',
      sfx: [['pop', 'world'], ['pop', 'jp'], ['pop', 'nf'], ['ding', 'paint', 0.5], ['stinger', 'demon', 0.5]],
      draw(k) {
        chap(k, '#1 · Bóng đè');
        k.ctx.fillStyle = '#1d2233'; k.ctx.fillRect(0, 0, k.W, k.H);
        [['jp', 'Nhật Bản', 'kanashibari', 250], ['nf', 'Newfoundland', '"Old Hag"', 520]].forEach(([c, place, name, y]) => {
          k.text(place, 380, y, { size: 44, weight: 600, color: '#c9c3b8', fx: 'fade', p: k.at(c, 0.5) });
          k.text(name, 380, y + 70, { size: 70, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at(c, 0.5), outline: '#1b1b24', outlineWidth: 10 });
        });
        const pp = k.at('paint', 0.6);
        k.group({ x: 1250, y: 540, r: 0.02, s: Math.max(0.01, k.ease.back(pp)), a: Math.min(1, pp * 3) }, () => {
          k.rect(-470, -330, 940, 660, { fill: '#c9a24a', width: 6, seed: 1500 });
          k.rect(-430, -290, 860, 580, { fill: '#3a2a22', width: 3, seed: 1501 });
          k.rect(-340, 60, 620, 60, { fill: '#e9dcc0', width: 3, seed: 1502 });
          k.group({ x: 200, y: 40, r: -Math.PI / 2 }, () => k.char(0, 0, 420, { body: 'woman', outfit: 'dress', color: '#f2efe6', color2: '#e9dcc0', hair: 'long', hairColor: '#c98a3a', face: 'blank', pose: 'stand', shadow: false }));
          const pd = k.at('demon', 0.5);
          if (pd > 0) k.group({ x: -20, y: -60, s: k.ease.back(pd) }, () => {
            k.ctx.fillStyle = '#2b2b22'; k.ctx.beginPath(); k.ctx.ellipse(0, 0, 60, 70, 0, 0, Math.PI * 2); k.ctx.fill();
            k.ctx.beginPath(); k.ctx.arc(0, -90, 42, 0, Math.PI * 2); k.ctx.fill();
            for (const sx of [-1, 1]) { k.ctx.beginPath(); k.ctx.moveTo(sx * 20, -120); k.ctx.lineTo(sx * 40, -170); k.ctx.lineTo(sx * 36, -116); k.ctx.fill(); }
            k.glowEyes(0, -92, 0.3, '#ffcf4d');
          });
          k.text('"The Nightmare" · Fuseli, 1781', 0, 280, { size: 36, font: 'title', color: '#fff3c4' });
        });
      },
    },
    {
      say: '{sleep}Khoa học giải thích thế này. {rem}Khi ta ngủ say và mơ, {lock}não "khoá" gần hết cơ bắp, để ta không vung tay đấm đá theo giấc mơ. {wake}Nếu ta tỉnh dậy giữa chừng, {mind}ý thức đã tỉnh, {body}nhưng cơ thể vẫn đang bị khoá. {dream}Và não vẫn còn "chiếu dở" giấc mơ, {see}nên ta thấy bóng đen, cảm thấy bị đè.',
      sfx: [['ding', 'sleep', 0.5], ['pop', 'rem'], ['click', 'lock', 0.9], ['pop', 'wake'], ['pop', 'mind'], ['bonk', 'body', 0.5], ['stinger', 'see', 0.5]],
      draw(k) {
        chap(k, '#1 · Bóng đè', false);
        sciTag(k);
        const lockP = k.at('lock', 0.5);
        k.rect(160, 200, 700, 560, { fill: '#f4f1ea', width: 5, seed: 1600 });
        k.icon('brain', 510, 380, 220, { p: k.at('rem', 0.5) });
        k.text(k.t > k.cue('wake') ? 'ĐÃ TỈNH ✓' : 'ĐANG MƠ', 510, 600, { size: 56, font: 'title', color: k.t > k.cue('wake') ? '#3f6f2a' : '#8e5bd3', fx: 'pop', p: k.at('rem', 0.5) });
        k.text('não', 510, 700, { size: 40, weight: 600, fx: 'fade', p: k.at('rem', 0.5) });
        k.rect(1060, 200, 700, 560, { fill: '#f4f1ea', width: 5, seed: 1601 });
        k.char(1410, 680, 400, { ...SLEEPER, face: k.t > k.cue('see') ? 'shock' : 'blank', pose: 'stand', shadow: false, p: k.at('lock', 0.5) });
        k.group({ x: 1600, y: 330, s: Math.max(0.01, k.ease.back(lockP)) }, () => {
          k.rect(-50, -20, 100, 80, { fill: '#f6c344', width: 4, seed: 1602, p: lockP > 0 ? 1 : 0 });
          k.arc(0, -20, 34, Math.PI, 2 * Math.PI, { width: 10, seed: 1603, p: lockP > 0 ? 1 : 0 });
        });
        k.text('cơ thể: ĐANG KHOÁ', 1410, 720, { size: 44, font: 'title', fx: 'fade', p: k.at('body', 0.5) });
        k.arrow(880, 480, 1040, 480, { p: k.at('mind', 0.5), width: 6 });
        k.group({ x: 1250, y: 330, s: 0.55 }, () => shadowMan(k, 0, 300, 400, 0.85 * k.at('dream', 1)));
        cap(k, 'Ý thức tỉnh — cơ thể còn khoá — não còn "chiếu" giấc mơ', 'see', { size: 46 });
      },
    },
    {
      say: '{who}Nhà tâm lý học Allan Cheyne, ở Canada, từng thu thập lời kể của hàng nghìn người bị bóng đè. {same}Rất nhiều người kể cùng một cảm giác: có ai đó đang ở trong phòng. {alarm}Theo giải thích của ông, lúc ấy hệ thống cảnh giác nguy hiểm của não vẫn đang bật hết cỡ, {invent}nên nó tự "vẽ" ra một kẻ đột nhập. {joke}Một chiếc chuông báo trộm… kêu nhầm giữa đêm.',
      sfx: [['pop', 'who'], ['heartbeat', 'same', 0.6], ['ding', 'alarm', 0.5], ['stinger', 'invent', 0.5], ['boing', 'joke', 0.5]],
      draw(k) {
        chap(k, '#1 · Bóng đè', false);
        sciTag(k);
        k.text('Allan Cheyne · Canada', 520, 160, { size: 56, font: 'title', p: k.at('who', 1, 'linear') });
        for (let i = 0; i < 12; i++) k.prop('scroll', 160 + (i % 6) * 140, 330 + Math.floor(i / 6) * 170, 110, { p: k.at(k.cue('who', 0.6 + i * 0.06), 0.3) });
        k.text('"có ai đó trong phòng…"', 520, 720, { size: 50, font: 'title', color: '#8e5bd3', p: k.at('same', 1.4, 'linear'), outline: '#fffaf0', outlineWidth: 8 });
        k.icon('brain', 1400, 380, 220, { p: k.at('alarm', 0.5) });
        const ring = k.at('alarm', 0.4) > 0 ? Math.sin(k.gt * 30) * 0.2 : 0;
        k.group({ x: 1620, y: 260, r: ring, s: Math.max(0.01, k.at('alarm', 0.4)) }, () => {
          k.path('M -34 22 Q -30 -10 -24 -24 Q -14 -44 0 -44 Q 14 -44 24 -24 Q 30 -10 34 22 Z', { fill: '#e4572e', width: 4, seed: 1810 });
          k.line(-44, 24, 44, 24, { width: 5, seed: 1811 });
        });
        shadowMan(k, 1400, 980, 380, 0.85 * k.at('invent', 0.8), k.at(k.cue('invent', 0.4), 0.4));
        k.text('CHUÔNG BÁO TRỘM KÊU NHẦM', 960, 1000, { size: 54, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('joke', 0.5), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: '{stat}Các nghiên cứu ước tính, khoảng tám phần trăm người từng bị bóng đè ít nhất một lần. {cause}Hay gặp khi thiếu ngủ, căng thẳng, thức khuya, {back}hoặc nằm ngửa. {tip}Gặp bóng đè: đừng hoảng, {toe}tập trung cử động một ngón tay, ngón chân. {gone}Vài giây sau, "con ma" sẽ tự bỏ đi. {doc}Còn nếu bị thường xuyên, hãy hỏi bác sĩ.',
      sfx: [['ding', 'stat', 0.5], ['pop', 'cause'], ['pop', 'back'], ['ding', 'tip', 0.4], ['pop', 'toe'], ['sparkle', 'gone', 0.5], ['pop', 'doc']],
      draw(k) {
        chap(k, '#1 · Bóng đè', false);
        sciTag(k);
        k.text('~8%', 380, 300, { size: 160, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('stat', 0.5), outline: '#fffaf0', outlineWidth: 16 });
        k.text('từng bị ít nhất 1 lần', 380, 420, { size: 44, weight: 600, fx: 'fade', p: k.at(k.cue('stat', 0.5), 0.5) });
        for (let i = 0; i < 25; i++) k.char(140 + (i % 5) * 120, 610 + Math.floor(i / 5) * 90, 80, { body: 'man', outfit: 'tunic', color: i === 12 || i === 3 ? '#e4572e' : '#c9c3b8', color2: '#fffaf0', hair: 'short', face: 'blank', pose: 'stand', shadow: false, p: k.at(k.cue('stat', 0.3 + i * 0.02), 0.3) });
        k.text('Hay gặp khi:', 1350, 220, { size: 56, font: 'title', fx: 'pop', p: k.at('cause', 0.5) });
        [['cause', 'thiếu ngủ · căng thẳng'], ['back', 'nằm ngửa']].forEach(([c, t], i) => k.text('• ' + t, 1080, 310 + i * 80, { size: 46, align: 'left', weight: 600, p: k.at(c, 0.8, 'linear') }));
        k.rect(1060, 500, 700, 380, { fill: '#e6f4e1', width: 5, seed: 1700, p: k.at('tip', 0.5) });
        k.text('Gặp bóng đè?', 1410, 570, { size: 54, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('tip', 0.5) });
        [['tip', '1. Đừng hoảng'], ['toe', '2. Cử động ngón tay, ngón chân'], ['doc', '3. Bị thường xuyên → hỏi bác sĩ']].forEach(([c, t], i) => k.text(t, 1100, 660 + i * 70, { size: 40, align: 'left', weight: 600, p: k.at(c, 0.8, 'linear') }));
      },
    },

    // ---------------- Kết luận ----------------
    {
      chapter: 'Vậy ma có thật không?',
      say: '{why}Mà khoan: ma đáng sợ thế, sao ta vẫn mê nghe chuyện ma, xem phim ma? {body}Vì khi sợ trong lúc biết mình an toàn, cơ thể vẫn tiết a-đrê-na-lin, tim đập nhanh, {relief}rồi đến cảm giác nhẹ nhõm khi mọi chuyện qua đi. {coaster}Giống hệt đi tàu lượn siêu tốc. {hw}Đó là lý do ta sợ ma, mà vẫn mê chuyện ma.',
      sfx: [['drumroll', 'why', 0.3], ['heartbeat', 'body', 0.7], ['sparkle', 'relief', 0.5], ['slideUp', 'coaster', 0.6], ['slideDown', ['coaster', 0.8], 0.6], ['tada', 'hw', 0.5]],
      draw(k) {
        chap(k, 'Vậy ma có thật không?');
        k.backdrop('sunset', { ground: G });
        const { ctx } = k;
        ctx.save(); ctx.globalAlpha *= k.at('coaster', 0.5); ctx.lineWidth = 10; ctx.strokeStyle = '#3b2f2a'; ctx.beginPath();
        for (let x = 0; x <= k.W; x += 10) { const y = 600 - Math.sin(x * 0.006) * 220 - Math.sin(x * 0.013) * 60; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.stroke(); ctx.restore();
        const cx = (k.gt * 300) % k.W, cy = 600 - Math.sin(cx * 0.006) * 220 - Math.sin(cx * 0.013) * 60;
        k.group({ a: k.at('coaster', 0.5) }, () => { k.rect(cx - 70, cy - 70, 140, 60, { fill: '#e4572e', width: 4, seed: 1820 }); k.face(cx, cy - 100, 30, 'laugh'); });
        k.char(420, G, 360, { ...KID('#2e86de'), face: k.t > k.cue('relief') ? 'laugh' : 'shock', pose: k.t > k.cue('relief') ? 'cheer' : 'shrug', p: k.at('why', 0.5) });
        k.prop('heart', 560, 380, 110, { p: k.at('body', 0.4), bob: 12 });
        k.text('a-đrê-na-lin', 560, 260, { size: 50, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('body', 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.text('sợ + an toàn = VUI', 1300, 250, { size: 80, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('relief', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.text('SỢ MÀ VẪN MÊ!', 1300, 900, { size: 80, font: 'title', color: '#f08a24', fx: 'pop', p: k.at('hw', 0.5), outline: '#1b1b24', outlineWidth: 12 });
      },
    },

    {
      say: '{q}Vậy rốt cuộc, ma có thật không? {sci}Đến nay, khoa học chưa từng chứng minh được ma có thật. {but}Nhưng những lần "gặp ma" thì có thật: {l1}khí đầm lầy, {l2}bước chân lệch, {l3}mái tôn co lại, {l4}bộ não thích nhìn ra khuôn mặt, {l5}và giấc mơ chưa kịp tắt.',
      sfx: [['drumroll', 'q', 0.4], ['pop', 'sci'], ['ding', 'but', 0.5], ['pop', 'l1'], ['pop', 'l2'], ['pop', 'l3'], ['pop', 'l4'], ['pop', 'l5']],
      draw(k) {
        chap(k, 'Vậy ma có thật không?');
        night(k, { mx: 1700, my: 150 });
        k.text('MA CÓ THẬT KHÔNG?', 960, 200, { size: 96, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('q', 0.5), outline: '#1b1b24', outlineWidth: 14 });
        k.text('chưa từng được chứng minh', 960, 320, { size: 50, font: 'title', color: '#c9c3b8', fx: 'fade', p: k.at('sci', 0.6) });
        const items = [['l1', 'khí đầm lầy'], ['l2', 'bước chân lệch'], ['l3', 'mái tôn co lại'], ['l4', 'não nhìn ra mặt'], ['l5', 'giấc mơ chưa tắt']];
        items.forEach(([c, t], i) => {
          const x = 240 + i * 360;
          k.icon('check', x, 560, 100, { p: k.at(c, 0.4) });
          k.text(t, x, 680, { size: 42, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at(c, 0.5), outline: '#1b1b24', outlineWidth: 8, maxWidth: 330 });
        });
        k.text('"gặp ma" là có thật — thủ phạm thì không phải ma', 960, 900, { size: 50, font: 'title', color: '#fff3c4', p: k.at('but', 1.6, 'linear'), outline: '#1b1b24', outlineWidth: 10 });
      },
    },
    {
      say: '{respect}Còn niềm tin tâm linh, là chuyện của mỗi người, và đáng được tôn trọng. {next}Nhưng lần tới, nghe tiếng cót két lúc nửa đêm, {smile}bạn có thể mỉm cười, {roof}"À, mái tôn đang co lại đấy", {sleep}rồi ngủ tiếp.',
      sfx: [['ding', 'respect', 0.4], ['creak', 'next', 0.6], ['pop', 'smile'], ['boing', 'roof', 0.5]],
      draw(k) {
        chap(k, 'Vậy ma có thật không?');
        bedroom(k, k.t > k.cue('sleep') ? 'calm' : k.t > k.cue('smile') ? 'happy' : 'shock');
        k.text('cót két…', 1000, 260, { size: 64, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('next', 0.4), outline: '#1b1b24', outlineWidth: 10 });
        k.bubble(820, 360, 560, 110, 620, 620, { p: k.at('roof', 0.4), text: 'À, mái tôn co lại đấy.', size: 42, think: true });
        k.text('Zzz', 400, 520, { size: 80, font: 'title', color: '#9fd3f2', fx: 'pop', p: k.at('sleep', 0.5), outline: '#1b1b24', outlineWidth: 10 });
        k.darkness(0.35, [{ x: 1610, y: 330, r: 400 }, { x: 640, y: 640, r: 460, warm: 1 }]);
        k.text('niềm tin tâm linh: đáng được tôn trọng', 960, 1000, { size: 48, font: 'title', color: '#fff3c4', fx: 'fade', p: k.at('respect', 0.6), outline: '#1b1b24', outlineWidth: 10 });
      },
    },
    {
      chapter: 'Tóm tắt',
      say: '{remind}Trước khi tóm tắt: tiếng cót két thì khoa học giải thích được rồi, nhưng còn những căn nhà bỏ hoang bị cả phố đồn có ma thì sao? Tập sau nhé. {t}Tóm lại: {a}ma trơi, là khí phân huỷ tự bốc cháy. {b}Ma dắt, là não mất phương hướng nên đi vòng tròn. {c}Nhà có ma, là co giãn nhiệt, chuột, thạch sùng, và hạ âm. {d}Mặt ma, là não thích nhìn ra khuôn mặt. {e}Còn bóng đè, là tỉnh dậy khi cơ thể còn khoá.',
      sfx: [['ding', 'remind', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['pop', 'e']],
      draw(k) {
        k.group({ a: 1 - k.at('t', 0.4) }, () => {
          k.group({ x: 960, y: 680, s: 1.5 }, () => {
            k.rect(-180, -80, 360, 230, { fill: '#4a4a5a', fillStyle: 'solid', width: 5, seed: 5800 });
            k.poly([[-210, -80], [0, -190], [210, -80]], { fill: '#3a3a48', fillStyle: 'solid', width: 5, seed: 5801 });
            for (let i = 0; i < 3; i++) k.rect(-140 + i * 110, -30, 70, 90, { fill: '#141824', fillStyle: 'solid', width: 3, seed: 5802 + i });
          });
          k.text('nhà hoang có ma? · tập sau', 960, 200, { size: 70, font: 'title', color: '#2f78c4', fx: 'pop', p: k.at(k.cue('remind', 0.5), 0.5) });
        });
        k.text('Tóm tắt', 960, 110, { size: 80, font: 'title', p: k.at('t', 0.8, 'linear') });
        const rows = [['a', 'Ma trơi', 'khí phân huỷ tự bốc cháy'], ['b', 'Ma dắt', 'não mất phương hướng → đi vòng tròn'], ['c', 'Nhà có ma', 'co giãn nhiệt, chuột, thạch sùng, hạ âm'], ['d', 'Mặt ma', 'não thích nhìn ra khuôn mặt'], ['e', 'Bóng đè', 'tỉnh dậy khi cơ thể còn khoá']];
        rows.forEach(([c, n, t], i) => {
          const y = 250 + i * 160;
          k.text(`#${5 - i} ${n}`, 220, y, { size: 54, font: 'title', align: 'left', color: '#b5482c', p: k.at(c, 0.8, 'linear') });
          k.text(t, 700, y, { size: 48, align: 'left', weight: 600, p: k.at(k.cue(c, 0.4), 1.2, 'linear') });
        });
      },
    },
    nextEpisodeScene({
      say: '{next}Tập sau: truyền thuyết đô thị Việt Nam. {why}Giữa Hà Nội có những căn nhà bỏ hoang bị cả phố đồn là có ma. {hook}Báo chí đã đến tận nơi xem, và thứ họ tìm thấy lại đáng sợ theo một kiểu hoàn toàn khác. Hẹn bạn ở tập sau nhé.',
      title: 'Truyền thuyết đô thị Việt Nam: 5 chuyện và sự thật phía sau',
      hook: 'Căn nhà bỏ hoang bị cả phố đồn có ma',
      when: 'Series Sinh vật dân gian',
      art: (k) => {
        k.rect(-180, -80, 360, 230, { fill: '#4a4a5a', fillStyle: 'solid', width: 5, seed: 5800 });
        k.poly([[-210, -80], [0, -190], [210, -80]], { fill: '#3a3a48', fillStyle: 'solid', width: 5, seed: 5801 });
        for (let i = 0; i < 3; i++) k.rect(-140 + i * 110, -30, 70, 90, { fill: '#141824', fillStyle: 'solid', width: 3, seed: 5802 + i });
      },
      sfx: [['boom', 'hook', 0.4]],
    }),
    subscribeScene({
      say: 'Còn bạn, đã bao giờ "gặp ma" chưa? {q}Kể trong phần bình luận nhé, xem khoa học có giải thích được không. {sub}Và đăng ký Vẽ Là Hiểu, bật chuông để không lỡ tập sau. Chúc bạn ngủ ngon… nếu bạn dám.',
      question: 'Bạn đã bao giờ "gặp ma" chưa?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
