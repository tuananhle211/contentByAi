// Tập đặc biệt Halloween — 5 con ma đáng sợ nhất dân gian Việt Nam, và sự thật phía sau.
// Đối chiếu: tín ngưỡng dân gian về ma xó ("khôn như ma xó"), ma trành (người bị hổ vồ thành trành; "làm trành"),
// hổ được gọi kiêng là "ông Ba Mươi"; ma da (hồn người chết đuối bắt người thế mạng); quỷ nhập tràng (kiêng mèo nhảy qua
// người chết); ma lai (đầu bay đêm) — tương đồng Krasue (Thái Lan), Ap (Campuchia), Penanggalan (Malaysia).
// Số liệu: khoảng 2.000 trẻ em tử vong do đuối nước mỗi năm ở Việt Nam (số liệu thường được cơ quan chức năng nêu).
// Giọng: bí ẩn, kịch tính, chêm hài nhẹ; phần đuối nước và nỗi oan "ma lai" kể nghiêm túc, không gắn với dân tộc cụ thể nào.
import { C } from '/engine/kit.js';
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import * as thumbs from '/videos/005-halloween-5-con-ma-dan-gian/thumbs.js';

const G = 880;
const GRANDMA = { body: 'woman', outfit: 'dress', color: '#6b4a2d', color2: '#c9a24a', hair: 'bun', hairColor: '#b9b4ab', face: 'smug' };
const GHOST = { body: 'woman', outfit: 'dress', color: '#eef2f0', color2: '#c9d6d0', hair: 'ghost', skin: '#dfe8e4', face: 'blank', float: true, alpha: 0.85 };
const KID = (c, extra = {}) => ({ body: 'kid', outfit: 'tunic', color: c, color2: '#f6c344', hair: 'short', ...extra });
const VIL = (c, extra = {}) => ({ body: 'man', outfit: 'tunic', color: c, color2: '#f6c344', hair: 'short', ...extra });

function chap(k, text) {
  k.text(text, 60, 56, { size: 30, align: 'left', color: '#c9c3b8', fx: 'fade', p: k.at(0, 0.6), outline: '#1b1b24', outlineWidth: 8 });
}
function cap(k, text, cue, o = {}) {
  const y = o.y ?? 995;
  k.text(text, k.W / 2, y, { size: o.size ?? 54, font: 'title', p: k.at(cue, o.dur ?? 1.2, 'linear'), maxWidth: 1760, color: o.color ?? '#fff3c4', outline: o.outline ?? '#1b1b24', outlineWidth: 12 });
}
function say(k, text, c, box, tail, o = {}) {
  k.bubble(box[0], box[1], box[2], box[3], tail[0], tail[1], { p: k.at(c, 0.4), text, size: o.size ?? 44, seed: o.seed, think: o.think, fill: o.fill });
}
// Cảnh đêm: trời, đồi, trăng, sương.
function night(k, o = {}) {
  k.backdrop('night', { ground: o.ground ?? G });
  if (o.moon !== false) k.prop('moon', o.mx ?? 1650, o.my ?? 170, 240);
}
// Thẻ số thứ tự con ma.
function card(k, n, name, cue) {
  const p = k.at(cue, 0.5);
  if (p <= 0) return;
  k.group({ x: 960, y: 230, s: k.ease.back(p) }, () => {
    k.text(`#${n}`, 0, -40, { size: 150, font: 'title', color: '#e4572e', outline: '#1b1b24', outlineWidth: 18 });
    k.text(name, 0, 90, { size: 80, font: 'title', color: '#fff3c4', outline: '#1b1b24', outlineWidth: 12 });
  });
}
// Cảnh mẫu dùng nền giấy → lót phông sáng cho dễ đọc chữ.
function withBackdrop(scene) {
  const draw = scene.draw;
  return { ...scene, draw(k) { k.backdrop('dawn', {}); draw(k); } };
}
function pumpkin(k, x, y, s, p = 1) {
  if (p <= 0) return;
  const { ctx } = k;
  k.group({ x, y, s: s * k.ease.back(Math.min(1, p)) }, () => {
    const g = ctx.createRadialGradient(0, 0, 10, 0, 0, 120);
    g.addColorStop(0, 'rgba(255,170,60,0.35)'); g.addColorStop(1, 'rgba(255,170,60,0)');
    ctx.fillStyle = g; ctx.fillRect(-120, -120, 240, 240);
    for (const [dx, w] of [[-26, 34], [26, 34], [0, 36]]) { ctx.beginPath(); ctx.ellipse(dx, 0, w, 44, 0, 0, Math.PI * 2); ctx.fillStyle = '#e8743b'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#3b2f2a'; ctx.stroke(); }
    ctx.fillStyle = '#5a8a3a'; ctx.fillRect(-5, -56, 10, 16);
    const fl = 0.85 + 0.15 * Math.sin((k.gt ?? 0) * 14);
    ctx.fillStyle = `rgba(255,220,90,${fl})`;
    for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 28, -16); ctx.lineTo(sx * 12, -4); ctx.lineTo(sx * 34, -2); ctx.closePath(); ctx.fill(); }
    ctx.beginPath(); ctx.moveTo(-30, 14); ctx.lineTo(-18, 26); ctx.lineTo(-8, 16); ctx.lineTo(4, 28); ctx.lineTo(16, 16); ctx.lineTo(30, 14); ctx.quadraticCurveTo(0, 40, -30, 14); ctx.fill();
  });
}
function bats(k, x, y, n, p = 1) {
  if (p <= 0) return;
  const { ctx } = k; const t = k.gt ?? 0;
  ctx.save(); ctx.globalAlpha *= Math.min(1, p); ctx.fillStyle = '#14141c';
  for (let i = 0; i < n; i++) {
    const bx = x + i * 90 + Math.sin(t * 1.3 + i) * 40, by = y + Math.sin(t * 2 + i * 2) * 30 + (i % 2) * 50;
    const f = Math.sin(t * 18 + i) * 10;
    ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx - 20, by - 14 - f, bx - 40, by - 4 + f * 0.3); ctx.quadraticCurveTo(bx - 22, by + 2, bx, by + 8);
    ctx.quadraticCurveTo(bx + 22, by + 2, bx + 40, by - 4 + f * 0.3); ctx.quadraticCurveTo(bx + 20, by - 14 - f, bx, by); ctx.fill();
  }
  ctx.restore();
}

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    title: '5 con ma đáng sợ nhất dân gian Việt Nam 👻 và sự thật phía sau',
    description: `Chuyện ma kiểu Việt: ma xó, ma trành, ma da, quỷ nhập tràng và ma lai — 5 con ma khiến bao thế hệ trẻ con Việt không dám ra đường ban đêm. Nhưng phía sau mỗi con ma là một sự thật rất đời: hổ dữ, nước xoáy, ánh đèn dầu chập chờn… và cả những nỗi oan có thật.
Vẽ Là Hiểu kể chuyện ma bằng hoạt hình, rồi giải mã vì sao ông bà ta tin vào chúng.`,
    footer: `⚠️ Video kể chuyện dân gian, không nhằm cổ xuý mê tín. Mỗi năm Việt Nam có khoảng 2.000 trẻ em tử vong vì đuối nước — hãy dạy trẻ biết bơi và không tắm sông một mình.
🔔 Đăng ký Vẽ Là Hiểu — tập sau: Ma có thật không? 5 lần "gặp ma" khoa học giải thích được.
💬 Quê bạn có chuyện ma nào? Kể trong phần bình luận nhé — nếu bạn dám!`,
    tags: ['chuyện ma việt nam', 'ma lai', 'ma da', 'ma trành', 'quỷ nhập tràng', 'ma xó', 'truyền thuyết kinh dị việt nam', 'chuyện ma dân gian', 'vẽ là hiểu'],
    hashtags: ['chuyenma', 'truyenthuyetvietnam'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '-4%',
    pitch: '-6Hz',
    voices: {
      grandma: { voice: 'vi-VN-HoaiMyNeural', pitch: '-25Hz', rate: '-12%' },
      ghost: { voice: 'vi-VN-HoaiMyNeural', pitch: '-35Hz', rate: '-28%' },
      kid: { voice: 'vi-VN-HoaiMyNeural', pitch: '+35Hz', rate: '+8%' },
      villager: { voice: 'vi-VN-NamMinhNeural', pitch: '+10Hz', rate: '+10%' },
    },
    transition: 'fade',
    paper: '#1d2233',
    music: 'assets/music/spooky.mp3',
    images: { next: 'assets/next.jpg' },
    musicVolume: 0.13,
    sfxVolume: 0.55,
  },

  scenes: [
    // ---------------- Mở đầu ----------------
    {
      chapter: 'Mở đầu',
      lead: 0.4,
      say: [
        'Nửa đêm. {wind}Gió rít qua rặng tre. {teo}Thằng Tèo rón rén ra bờ ao, định câu trộm mấy con cá. {noise}Bỗng, sau lưng nó có tiếng sột soạt. {eyes}Trong bụi tre, hai đốm sáng xanh lè… từ từ mở ra.',
        { v: 'kid', text: '{scream}Ma… ma… MAAA!' },
      ],
      sfx: [['wind', 0.2, 0.7], ['owl', 'teo', 0.4], ['creak', 'noise', 0.6], ['heartbeat', 'eyes', 0.8], ['heartbeat', ['eyes', 1], 0.8], ['stinger', 'scream', 1]],
      draw(k) {
        night(k);
        k.prop('banyan', 300, 540, 640);
        k.water(930, { color: '#2d4a66', amp: 5 });
        k.prop('bamboo', 1450, 720, 380);
        k.prop('bamboo', 1640, 700, 340);
        const walk = k.at('teo', 3, 'inOut');
        const scared = k.t > k.cue('scream');
        k.char(k.lerp(500, 900, walk), G, 230, { body: 'kid', outfit: 'tunic', color: '#2e86de', color2: '#f6c344', hair: 'short', face: scared ? 'shout' : k.t > k.cue('noise') ? 'shock' : 'smug', pose: scared ? 'shout' : 'hold', walk: walk > 0 && walk < 1, p: k.at('teo', 0.5) });
        k.prop('lamp', k.lerp(500, 900, walk) + 60, 800, 90, { p: k.at('teo', 0.5) });
        k.glowEyes(1520, 600, 1.2, '#b6f55a', { p: k.at('eyes', 1.5) });
        k.fog({ y: 880, alpha: 0.35 });
        const sh = k.shake('scream', 0.5, 10);
        k.darkness(0.6, [{ x: 1650, y: 170, r: 480 }, { x: k.lerp(500, 900, walk) + 60, y: 780, r: 280, warm: 1, flicker: 1 }]);
        k.group(sh, () => say(k, 'Ma… ma… MAAA!', 'scream', [560, 300, 460, 110], [k.lerp(500, 900, walk), 640], { size: 50 }));
        k.vignette(0.6);
      },
    },
    {
      say: '{stop}Khoan. Tèo gặp con ma nào, cuối video sẽ rõ. Còn bây giờ: Halloween ở phương Tây có ma cà rồng, xác sống, phù thủy. {but}Nhưng ông bà ta cũng có một bộ sưu tập ma quỷ của riêng mình. {scary}Và nói thật, có con còn đáng sợ hơn nhiều.',
      sfx: [['scratch', 'stop', 0.7], ['pop', ['stop', 3.5], 0.5], ['scratch', 'but', 0.5], ['stinger', 'scary', 0.8]],
      draw(k) {
        night(k, { moon: false });
        k.text('⏸ TẠM DỪNG', 960, 520, { size: 90, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('stop', 0.3) * (1 - k.at(k.cue('stop', 3), 0.3)), outline: '#1b1b24', outlineWidth: 12 });
        pumpkin(k, 330, 760, 1.6, k.at(k.cue('stop', 3.4), 0.6));
        pumpkin(k, 560, 800, 1.1, k.at(k.cue('stop', 3.6), 0.6));
        bats(k, 260, 260, 4, k.at(k.cue('stop', 3.5), 0.8));
        k.text('Halloween phương Tây', 450, 480, { size: 50, font: 'title', color: '#f3a86b', fx: 'fade', p: k.at(k.cue('stop', 3.6), 0.5), outline: '#1b1b24', outlineWidth: 8 });
        k.prop('banyan', 1450, 560, 640, { p: k.at('but', 0.6) });
        k.text('Ma Việt', 1450, 160, { size: 70, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at(k.cue('but', 0.6), 0.5), outline: '#1b1b24', outlineWidth: 10 });
        k.prop('malai', 1250 + k.at('scary', 2, 'out') * 300, 230, 240, { p: k.at('scary', 0.4) });
        k.flash('scary', 0.5, '200,255,220');
        k.darkness(0.45, [{ x: 400, y: 760, r: 420, warm: 1, flicker: 1 }]);
      },
    },
    {
      say: '{title}Năm con ma đáng sợ nhất trong dân gian Việt Nam, {truth}và sự thật phía sau chúng. {warn}Nếu bạn đang xem một mình lúc nửa đêm… thì bật đèn lên đã nhé.',
      sfx: [['gong', 'title', 0.7], ['click', 'warn', 0.9], ['boing', ['warn', 2.2], 0.5]],
      draw(k) {
        night(k, { moon: false });
        const on = k.at(k.cue('warn', 0.5), 0.3);
        k.text('5 CON MA', 960, 330, { size: 170, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('title', 0.6), outline: '#1b1b24', outlineWidth: 18 });
        k.text('đáng sợ nhất dân gian Việt Nam', 960, 490, { size: 66, font: 'title', color: '#fff3c4', p: k.at(k.cue('title', 0.5), 1.4, 'linear'), outline: '#1b1b24', outlineWidth: 10 });
        k.text('…và sự thật phía sau', 960, 590, { size: 50, weight: 600, color: '#9fe8c8', fx: 'fade', p: k.at('truth', 0.6), outline: '#1b1b24', outlineWidth: 8 });
        k.prop('lamp', 960, 800, 200, { p: k.at('warn', 0.4) });
        k.darkness(0.75 - on * 0.45, [{ x: 960, y: 760, r: 260 + on * 500, warm: on, flicker: 1 }, { x: 960, y: 420, r: 700 }]);
      },
    },
    {
      say: [
        'Ngày xưa, những câu chuyện này được kể bên ngọn đèn dầu, {kids}cho lũ trẻ nghe trước giờ đi ngủ.',
        { v: 'grandma', text: '{ba}Đêm nay bà kể chuyện ma. Đứa nào sợ thì chui vào chăn.' },
        { v: 'kid', text: '{kid}Bà ơi… cháu không sợ đâu!' },
        '{why}Những câu chuyện ấy có một mục đích rất rõ ràng: để lũ trẻ không dám… trốn đi chơi đêm.',
      ],
      sfx: [['creak', 0.2, 0.5], ['pop', 'kids'], ['owl', 'why', 0.4]],
      draw(k) {
        k.backdrop('night', { ground: G });
        k.prop('stilthouse', 1650, 640, 380, {});
        k.char(560, G, 340, { ...GRANDMA, pose: k.t > k.cue('ba') ? 'present' : 'stand', p: k.at(0.3, 0.6) });
        k.prop('lamp', 800, 820, 150, {});
        [[950, '#e4572e', 'happy'], [1080, '#2e86de', 'shock'], [1210, '#3bb273', 'happy']].forEach(([x, c, f], i) => k.char(x, G, 200, { ...KID(c, { hair: i === 1 ? 'bun' : 'short' }), face: k.t > k.cue('kid') && i === 1 ? 'smug' : f, pose: i === 1 ? 'hold' : 'stand', p: k.at(k.cue('kids', i * 0.2), 0.5), bob: 1 }));
        k.darkness(0.6, [{ x: 800, y: 780, r: 520, warm: 1, flicker: 1 }]);
        say(k, 'Đêm nay bà kể chuyện ma…', 'ba', [200, 230, 520, 110], [520, 520]);
        say(k, 'Cháu không sợ đâu!', 'kid', [1000, 300, 440, 110], [1080, 640]);
      },
    },

    // ---------------- #5 Ma xó ----------------
    {
      chapter: '#5 Ma xó',
      say: [
        'Con ma thứ năm: {name}ma xó. {corner}Tương truyền, ma xó sống ở góc nhà, trong cái xó bếp tối om. {see}Nó không hại ai. Nó chỉ… nhìn. {all}Nhìn thấy hết, nghe thấy hết mọi chuyện trong nhà.',
        { v: 'grandma', text: '{warn}Nên đừng có nói xấu ai nhé, ma xó nó nghe hết đấy!' },
      ],
      sfx: [['stinger', 'name', 0.5], ['creak', 'corner', 0.5], ['heartbeat', 'see', 0.7], ['heartbeat', ['see', 1.2], 0.6]],
      draw(k) {
        chap(k, '#5 · Ma xó');
        k.ctx.fillStyle = '#3a2f2a'; k.ctx.fillRect(0, 0, k.W, k.H);
        k.ctx.fillStyle = '#4a3c33'; k.ctx.beginPath(); k.ctx.moveTo(0, 760); k.ctx.lineTo(1300, 760); k.ctx.lineTo(1920, 1080); k.ctx.lineTo(0, 1080); k.ctx.fill();
        k.line(1300, 0, 1300, 760, { width: 6, stroke: '#2a211d' });
        k.prop('lamp', 420, 700, 160, {});
        k.prop('xoi', 700, 720, 120, {});
        k.glowEyes(1520, 640, 2, '#ffe066', { p: k.at('see', 1) });
        k.glowEyes(1700, 520, 0.7, '#ffe066', { p: k.at('all', 1) });
        k.darkness(0.7, [{ x: 420, y: 680, r: 480, warm: 1, flicker: 1 }]);
        card(k, 5, 'MA XÓ', 'name');
      },
    },
    {
      say: [
        '{idiom}Vì thế tiếng Việt mới có câu: "khôn như ma xó", "biết như ma xó".',
        '{modern}Ngày nay ma xó vẫn còn đó, chỉ là đã đổi tên thành… {cam}camera an ninh.',
        { v: 'villager', text: '{wife}Hèn gì vợ tôi biết hết!' },
      ],
      sfx: [['pop', 'idiom'], ['scratch', 'modern', 0.5], ['ding', 'cam', 0.6], ['boing', 'wife', 0.6]],
      draw(k) {
        chap(k, '#5 · Ma xó');
        k.backdrop('day', { ground: G });
        k.text('"Khôn như ma xó"', 960, 230, { size: 90, font: 'title', color: '#b5482c', p: k.at('idiom', 1.2, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
        k.text('"Biết như ma xó"', 960, 360, { size: 70, font: 'title', color: '#6b4a2d', p: k.at(k.cue('idiom', 1.4), 1, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        k.prop('cctv', 1500, 560, 300, { p: k.at('cam', 0.5) });
        k.text('ma xó 4.0', 1520, 700, { size: 50, font: 'title', color: '#2e86de', fx: 'pop', p: k.at(k.cue('cam', 0.6), 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.char(560, G, 340, { ...VIL('#2e86de'), face: k.t > k.cue('wife') ? 'shock' : 'calm', pose: k.t > k.cue('wife') ? 'facepalm' : 'stand', p: k.at('modern', 0.5) });
        say(k, 'Hèn gì vợ tôi biết hết!', 'wife', [700, 470, 480, 110], [620, 660]);
      },
    },
    {
      say: 'Vậy vì sao người xưa nghĩ ra ma xó? {dark}Góc tối là nơi mắt ta không nhìn rõ. {brain}Và bộ não con người có một thói quen kỳ lạ: cứ thấy chỗ tối là tự "vẽ" ra một thứ gì đó đang nhìn mình. {safe}Thà tưởng có ma mà cẩn thận, còn hơn bỏ qua một con rắn thật đang nằm trong xó nhà.',
      sfx: [['pop', 'dark'], ['sparkle', 'brain', 0.5], ['bonk', 'safe', 0.5]],
      draw(k) {
        chap(k, '#5 · Sự thật phía sau');
        k.ctx.fillStyle = '#2b2622'; k.ctx.fillRect(0, 0, k.W, k.H);
        k.icon('eye', 420, 480, 280, { p: k.at('dark', 0.6) });
        k.icon('brain', 960, 460, 300, { p: k.at('brain', 0.6), fill: '#ef8fb0' });
        k.glowEyes(960, 700, 0.9, '#ffe066', { p: k.at(k.cue('brain', 2), 0.8) });
        k.text('não tự "vẽ" ra kẻ đang nhìn', 960, 250, { size: 56, font: 'title', color: '#fff3c4', p: k.at(k.cue('brain', 1), 1.4, 'linear'), outline: '#1b1b24', outlineWidth: 10 });
        k.prop('serpent', 1500, 760, 300, { p: k.at('safe', 0.5) });
        k.text('rắn thật!', 1500, 600, { size: 54, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at(k.cue('safe', 1.5), 0.5), outline: '#1b1b24', outlineWidth: 8 });
        k.darkness(0.35, [{ x: 960, y: 500, r: 700 }]);
      },
    },

    // ---------------- #4 Ma trành ----------------
    {
      chapter: '#4 Ma trành',
      say: 'Con ma thứ tư, rùng rợn hơn nhiều: {name}ma trành. {tiger}Người xưa tin rằng, ai bị hổ vồ chết thì linh hồn không được siêu thoát, {serve}mà phải đi theo hầu chính con hổ đó. Người ta gọi là ma trành.',
      sfx: [['stinger', 'name', 0.6], ['wind', 'tiger', 0.5], ['heartbeat', 'serve', 0.6]],
      draw(k) {
        chap(k, '#4 · Ma trành');
        night(k, { mx: 1700 });
        for (let i = 0; i < 6; i++) k.prop(i % 2 ? 'bamboo' : 'tree', 120 + i * 340, 640 + (i % 2) * 40, 380 + (i % 3) * 40, { fill: '#24402c', leaf: '#1f3a28' });
        const walk = k.at('tiger', 6, 'linear');
        k.prop('tiger', k.lerp(500, 1100, walk), 790, 360, { p: k.at('tiger', 0.6) });
        k.char(k.lerp(260, 860, walk) - 40, G - 10, 300, { ...VIL('#d6dfdb', { skin: '#d8e2de', color2: '#9fb3ad' }), face: 'blank', float: true, alpha: 0.55 * k.at('serve', 1), walk: true, shadow: false });
        k.fog({ y: 900, alpha: 0.3 });
        k.darkness(0.6, [{ x: 1700, y: 170, r: 500 }, { x: k.lerp(500, 1100, walk) + 40, y: 750, r: 260 }]);
        card(k, 4, 'MA TRÀNH', 'name');
      },
    },
    {
      say: [
        '{lure}Không chỉ thế, ma trành còn dụ người khác vào rừng, gọi tên họ trong đêm, để con hổ có thêm mồi.',
        { v: 'ghost', text: '{call}Ơi… ra đây… ra đây nào…' },
        '{idiom}Đến giờ, tiếng Việt vẫn còn chữ "làm trành", để chỉ kẻ quay lại hại chính đồng loại của mình.',
      ],
      sfx: [['wind', 'lure', 0.5], ['owl', 'call', 0.4], ['stinger', ['call', 1.5], 0.5], ['gong', 'idiom', 0.4]],
      draw(k) {
        chap(k, '#4 · Ma trành');
        night(k, { mx: 300 });
        for (let i = 0; i < 4; i++) k.prop('tree', 900 + i * 260, 640, 420, { fill: '#24402c' });
        k.char(1500, G - 20, 300, { ...VIL('#d6dfdb', { skin: '#d8e2de', color2: '#9fb3ad' }), face: 'blank', float: true, alpha: 0.6, pose: 'wave', shadow: false });
        k.glowEyes(1240, 600, 0.9, '#f6d24a', { p: k.at('call', 1) });
        k.char(520, G, 300, { ...VIL('#9c6b3f'), face: k.t > k.cue('call') ? 'shock' : 'calm', pose: 'hold', p: k.at('lure', 0.5) });
        k.prop('lamp', 640, 760, 110, { p: k.at('lure', 0.5) });
        k.bubble(1100, 230, 540, 110, 1480, 560, { p: k.at('call', 0.4), text: 'Ơi… ra đây…', size: 46, fill: '#e9f0ee' });
        k.sweat(560, 570, 1.6, { p: k.at(k.cue('call', 0.6), 0.3) });
        k.darkness(0.55, [{ x: 640, y: 740, r: 360, warm: 1, flicker: 1 }, { x: 1500, y: 650, r: 260 }]);
        k.text('"Làm trành" = hại chính đồng loại', 960, 990, { size: 50, font: 'title', color: '#fff3c4', p: k.at('idiom', 1.4, 'linear'), outline: '#1b1b24', outlineWidth: 10 });
      },
    },
    {
      say: 'Ngày xưa, hổ là nỗi kinh hoàng có thật ở các vùng rừng núi. {name}Người ta sợ tới mức không dám gọi thẳng tên, mà gọi kiêng là "ông Ba Mươi". {lesson}Chuyện ma trành, vì thế, là một lời nhắc rất thực tế: {rule}đừng vào rừng một mình, và đừng đi theo tiếng gọi lạ trong đêm.',
      sfx: [['pop', 'name'], ['ding', 'lesson', 0.5], ['ding', 'rule', 0.5]],
      draw(k) {
        chap(k, '#4 · Sự thật phía sau');
        k.backdrop('dawn', { ground: G });
        k.prop('tiger', 560, 720, 520, {});
        k.text('"Ông Ba Mươi"', 560, 330, { size: 80, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('name', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.text('= cách gọi kiêng con hổ', 560, 430, { size: 44, weight: 600, fx: 'fade', p: k.at(k.cue('name', 1), 0.5), outline: '#fffaf0', outlineWidth: 8 });
        const rules = ['Đừng vào rừng một mình', 'Đừng đi theo tiếng gọi lạ'];
        rules.forEach((r, i) => {
          const c = k.cue('rule', i * 2.2);
          k.icon('check', 1160, 520 + i * 140, 90, { p: k.at(c, 0.4) });
          k.text(r, 1230, 520 + i * 140, { size: 52, font: 'title', align: 'left', p: k.at(c, 1, 'linear'), outline: '#fffaf0', outlineWidth: 8 });
        });
      },
    },

    // ---------------- #3 Ma da ----------------
    {
      chapter: '#3 Ma da',
      say: 'Con ma thứ ba sống dưới nước: {name}ma da. {river}Ở sông, ao, hồ, người ta đồn có hồn người chết đuối nằm chờ dưới đáy. {pull}Ai bơi qua, ma da sẽ kéo chân xuống, {swap}để có người "chết thay", còn nó thì được đi đầu thai.',
      sfx: [['stinger', 'name', 0.6], ['drip', 'river', 0.6], ['drip', ['river', 0.8], 0.6], ['heartbeat', 'pull', 0.7], ['heartbeat', ['pull', 1], 0.7]],
      draw(k) {
        chap(k, '#3 · Ma da');
        night(k, { ground: 700, mx: 1600, my: 160 });
        k.water(700, { color: '#23415c', amp: 6 });
        k.prop('hands', 900, 960, 260, { reach: k.at('pull', 2, 'inOut') });
        k.glowEyes(900, 860, 1, '#9fe8c8', { p: k.at('river', 1) });
        k.char(1300, 960, 360, { ...GHOST, p: k.at('swap', 0.8), alpha: 0.5 });
        k.ctx.save(); k.ctx.fillStyle = 'rgba(20,40,60,0.35)'; k.ctx.fillRect(0, 760, k.W, 320); k.ctx.restore();
        k.darkness(0.5, [{ x: 1600, y: 160, r: 520 }, { x: 900, y: 860, r: 300 }]);
        card(k, 3, 'MA DA', 'name');
      },
    },
    {
      say: 'Nhưng hãy nhìn kỹ những chỗ người ta bảo "có ma da". {whirl}Đó thường là khúc sông có xoáy nước, {flow}dòng chảy ngầm, {cold}nước lạnh đột ngột dễ gây chuột rút, {weed}hoặc rong rêu quấn chân. {real}Đó mới là những "bàn tay" thật dưới nước.',
      sfx: [['whoosh', 'whirl', 0.6], ['whoosh', 'flow', 0.5], ['pop', 'cold'], ['pop', 'weed'], ['ding', 'real', 0.5]],
      draw(k) {
        chap(k, '#3 · Sự thật phía sau');
        k.backdrop('day', { ground: 380 });
        k.water(380, { color: '#3d7fb5', amp: 6 });
        const { ctx } = k; const t = k.gt ?? 0;
        const pw = k.at('whirl', 0.8);
        if (pw > 0) { ctx.save(); ctx.globalAlpha *= pw; ctx.strokeStyle = '#d6ecfa'; ctx.lineWidth = 5; ctx.beginPath(); for (let a = 0; a < 18; a += 0.2) { const r = 8 + a * 7; const x = 380 + Math.cos(a + t * 3) * r, y = 650 + Math.sin(a + t * 3) * r * 0.5; a ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); }
        for (let i = 0; i < 4; i++) k.arrow(700 + i * 60, 760 + i * 30, 1000 + i * 60, 760 + i * 30, { p: k.at(k.cue('flow', i * 0.15), 0.5), stroke: '#d6ecfa', width: 5, head: 18 });
        k.text('❄', 1300, 640, { size: 110, color: '#e9f6ff', fx: 'pop', p: k.at('cold', 0.4) });
        for (let i = 0; i < 6; i++) { const x = 1560 + i * 40; k.ctx.save(); k.ctx.globalAlpha *= k.at('weed', 0.6); k.ctx.strokeStyle = '#3f8f3a'; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.moveTo(x, 1080); for (let y = 1080; y > 760; y -= 20) k.ctx.lineTo(x + Math.sin(y * 0.03 + t * 2 + i) * 14, y); k.ctx.stroke(); k.ctx.restore(); }
        [['xoáy nước', 380, 'whirl'], ['dòng chảy ngầm', 880, 'flow'], ['nước lạnh → chuột rút', 1300, 'cold'], ['rong rêu', 1660, 'weed']].forEach(([s, x, c]) => k.text(s, x, 470, { size: 40, font: 'title', color: '#fffaf0', p: k.at(k.cue(c, 0.3), 0.8, 'linear'), outline: '#1d3550', outlineWidth: 8 }));
        cap(k, 'Đó mới là những "bàn tay" thật dưới nước', 'real');
      },
    },
    {
      say: 'Và đây là phần không hề đùa. {stat}Ở Việt Nam, mỗi năm có khoảng hai nghìn trẻ em tử vong vì đuối nước. {lesson}Ma da có thể không có thật. Nhưng lời răn của ông bà, "đừng tắm sông một mình", {true}thì đúng tuyệt đối. {swim}Và cách "trừ ma da" tốt nhất, là cho trẻ học bơi.',
      sfx: [['gong', 'stat', 0.4], ['ding', 'true', 0.4], ['sparkle', 'swim', 0.4]],
      draw(k) {
        chap(k, '#3 · Sự thật phía sau');
        k.backdrop('day', { ground: 700 });
        k.water(760, { color: '#5b9bd5', amp: 5 });
        k.text('~2.000', 560, 280, { size: 150, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('stat', 0.6), outline: '#fffaf0', outlineWidth: 14 });
        k.text('trẻ em tử vong vì đuối nước mỗi năm', 560, 400, { size: 44, weight: 600, fx: 'fade', p: k.at(k.cue('stat', 0.6), 0.6), outline: '#fffaf0', outlineWidth: 8 });
        k.char(1250, 760, 320, { ...VIL('#2e86de'), face: 'happy', pose: 'present', p: k.at('swim', 0.5) });
        k.char(1460, 800, 200, { ...KID('#e4572e'), face: 'happy', pose: 'cheer', p: k.at(k.cue('swim', 0.3), 0.5), shadow: false });
        k.ctx.save(); k.ctx.globalAlpha *= k.at(k.cue('swim', 0.3), 0.5); k.ctx.lineWidth = 16; k.ctx.strokeStyle = '#e4572e'; k.ctx.beginPath(); k.ctx.arc(1460, 760, 44, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.restore();
        cap(k, 'Cách "trừ ma da" tốt nhất: cho trẻ học bơi', 'swim', { color: '#3b2f2a', outline: '#fffaf0' });
      },
    },

    // ---------------- #2 Quỷ nhập tràng ----------------
    {
      chapter: '#2 Quỷ nhập tràng',
      say: 'Con ma thứ hai khiến bao người rợn tóc gáy trong những đêm canh linh cữu: {name}quỷ nhập tràng. {rule}Trong đám tang ngày xưa, có một điều cấm kỵ: {cat}tuyệt đối không để mèo nhảy qua người đã khuất.',
      sfx: [['stinger', 'name', 0.6], ['gong', 'rule', 0.4], ['meow', 'cat', 0.6]],
      draw(k) {
        chap(k, '#2 · Quỷ nhập tràng');
        k.ctx.fillStyle = '#2b2622'; k.ctx.fillRect(0, 0, k.W, k.H);
        k.ctx.fillStyle = '#3a312b'; k.ctx.fillRect(0, 760, k.W, 320);
        k.prop('corpse', 960, 780, 480, {});
        k.prop('incense', 640, 760, 150, {});
        k.prop('lamp', 1300, 760, 150, {});
        k.prop('cat', 1600, 800, 200, { p: k.at('cat', 0.5) });
        k.darkness(0.6, [{ x: 1300, y: 740, r: 520, warm: 1, flicker: 1 }, { x: 640, y: 720, r: 260, warm: 0.6, flicker: 1 }]);
        card(k, 2, 'QUỶ NHẬP TRÀNG', 'name');
      },
    },
    {
      say: [
        '{jump}Vì người ta tin rằng, nếu mèo nhảy qua, {rise}xác sẽ bật dậy, và đi lại như người sống.',
        '{zombie}Xác sống phiên bản Việt Nam. {joke}Và thủ phạm là… một con mèo.',
      ],
      sfx: [['meow', 'jump', 0.6], ['whoosh', ['jump', 0.2], 0.5], ['stinger', 'rise', 0.9], ['thunder', 'rise', 0.5], ['boing', 'joke', 0.6]],
      draw(k) {
        chap(k, '#2 · Quỷ nhập tràng');
        k.ctx.fillStyle = '#2b2622'; k.ctx.fillRect(0, 0, k.W, k.H);
        k.ctx.fillStyle = '#3a312b'; k.ctx.fillRect(0, 760, k.W, 320);
        const sh = k.shake('rise', 0.5, 14);
        k.group(sh, () => {
          k.prop('corpse', 960, 780, 480, { rise: k.at('rise', 0.8, 'back') });
          k.prop('lamp', 1300, 760, 150, {});
          const j = k.at('jump', 1.2, 'inOut');
          k.prop('cat', k.lerp(1500, 520, j), 800 - Math.sin(Math.PI * j) * 260, 200, { jump: 0 });
        });
        k.flash('rise', 0.5);
        k.darkness(0.55, [{ x: 1300, y: 740, r: 560, warm: 1, flicker: 1 }]);
        k.text('XÁC SỐNG BẢN VIỆT', 960, 230, { size: 90, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('zombie', 0.5), outline: '#1b1b24', outlineWidth: 12 });
        k.text('thủ phạm: 1 con mèo 🐈‍⬛', 960, 350, { size: 56, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('joke', 0.5), outline: '#1b1b24', outlineWidth: 10 });
      },
    },
    {
      say: 'Thực ra, sau khi mất, cơ thể vẫn có những biến đổi tự nhiên: {stiff}cơ co cứng lại, {gas}khí trong người thoát ra, đôi khi tạo cử động hay âm thanh nhỏ. {night}Dưới ánh đèn dầu chập chờn, chừng đó là đủ để người canh đêm sợ hết hồn. {real}Còn việc canh xác và đuổi mèo, thực ra giúp giữ thi thể không bị chuột, mèo làm hại. {useful}Một điều kiêng kỵ… mà rất có ích.',
      sfx: [['pop', 'stiff'], ['pop', 'gas'], ['heartbeat', 'night', 0.6], ['ding', 'useful', 0.5]],
      draw(k) {
        chap(k, '#2 · Sự thật phía sau');
        k.ctx.fillStyle = '#efe6d6'; k.ctx.fillRect(0, 0, k.W, k.H);
        k.prop('corpse', 520, 720, 460, {});
        k.prop('lamp', 860, 700, 150, {});
        [['cơ co cứng', 'stiff'], ['khí thoát ra', 'gas'], ['đèn dầu chập chờn', 'night']].forEach(([t, c], i) => {
          k.icon('check', 1120, 300 + i * 130, 80, { p: k.at(c, 0.4) });
          k.text(t, 1180, 300 + i * 130, { size: 52, font: 'title', align: 'left', p: k.at(c, 0.9, 'linear') });
        });
        k.prop('cat', 1250, 760, 150, { p: k.at('real', 0.5) });
        k.icon('cross', 1250, 760, 160, { p: k.at(k.cue('real', 1), 0.4) });
        k.text('giữ thi thể khỏi chuột, mèo', 1450, 900, { size: 44, weight: 600, fx: 'fade', p: k.at(k.cue('real', 1.4), 0.5) });
        cap(k, 'Kiêng kỵ… mà rất có ích', 'useful', { color: '#3b2f2a', outline: '#fffaf0', y: 1010 });
      },
    },

    // ---------------- #1 Ma lai ----------------
    {
      chapter: '#1 Ma lai',
      say: [
        'Và đây là con ma đáng sợ nhất. {name}Ma lai. {day}Ban ngày, ma lai trông hệt như người bình thường: vẫn đi chợ, vẫn chào hỏi, {neighbor}có khi… là chính người hàng xóm của bạn.',
        { v: 'villager', text: '{hi}Chào cô! Đi chợ về đấy à?' },
        { v: 'ghost', text: '{reply}Ừ… tối nay… ngủ ngon nhé.' },
      ],
      sfx: [['drumroll', 0.2, 0.4], ['stinger', 'name', 0.9], ['pop', 'day'], ['heartbeat', 'neighbor', 0.7], ['stinger', 'reply', 0.6]],
      draw(k) {
        chap(k, '#1 · Ma lai');
        const dusk = k.at('neighbor', 3, 'inOut');
        k.backdrop('day', { ground: G });
        k.backdrop('sunset', { ground: G, alpha: dusk });
        k.prop('stilthouse', 1550, 650, 380, {});
        k.char(960, G, 380, { body: 'woman', outfit: 'dress', color: '#8e5bd3', color2: '#f6c344', hair: 'long', face: k.t > k.cue('neighbor', 1.5) ? 'smug' : 'happy', pose: 'wave', p: k.at('day', 0.5) });
        k.char(420, G, 300, { ...VIL('#2e86de'), face: 'happy', pose: 'wave', p: k.at(k.cue('day', 0.5), 0.5) });
        k.glowEyes(960, 545, 0.35, '#ff4d4d', { p: k.at('reply', 0.3) });
        say(k, 'Chào cô! Đi chợ về đấy à?', 'hi', [140, 300, 520, 110], [420, 560]);
        say(k, 'Tối nay… ngủ ngon nhé.', 'reply', [1080, 280, 480, 110], [980, 520], { fill: '#e9f0ee' });
        card(k, 1, 'MA LAI', 'name');
      },
    },
    {
      say: '{night}Nhưng khi đêm xuống, lúc cả làng đã ngủ say… {head}cái đầu tách khỏi thân, bay đi trong bóng tối, kéo theo một vệt sáng lân tinh lập lòe. {hunt}Nó tìm đến những nhà có người ốm nặng, hay phụ nữ vừa sinh con.',
      sfx: [['owl', 'night', 0.5], ['stinger', 'head', 1], ['whoosh', ['head', 0.6], 0.6], ['heartbeat', 'hunt', 0.8], ['heartbeat', ['hunt', 1], 0.8], ['heartbeat', ['hunt', 2], 0.8]],
      draw(k) {
        chap(k, '#1 · Ma lai');
        night(k, { mx: 300, my: 180 });
        k.prop('stilthouse', 1450, 650, 420, {});
        k.prop('banyan', 400, 560, 640, {});
        const f = k.at('head', 6, 'inOut');
        k.prop('malai', k.lerp(500, 1380, f), 420 + Math.sin(f * 7) * 70, 240, { p: k.at('head', 0.5) });
        k.flash('head', 0.4, '200,255,220');
        k.prop('lamp', 1520, 700, 90, { p: k.at('hunt', 0.6) });
        k.fog({ y: 900, alpha: 0.35 });
        k.darkness(0.6, [{ x: 300, y: 180, r: 420 }, { x: k.lerp(500, 1380, f), y: 420 + Math.sin(f * 7) * 70, r: 260 }, { x: 1520, y: 690, r: 200, warm: 1, flicker: 1 }]);
        k.vignette(0.7);
      },
    },
    {
      say: 'Điều kỳ lạ là, {sea}không chỉ người Việt sợ con ma này. {th}Thái Lan có Krasue. {kh}Campuchia có Ap. {my}Malaysia có Penanggalan. {all}Cả Đông Nam Á, cùng sợ một cái đầu biết bay.',
      sfx: [['pop', 'th'], ['pop', 'kh'], ['pop', 'my'], ['stinger', 'all', 0.5]],
      draw(k) {
        chap(k, '#1 · Ma lai');
        k.ctx.fillStyle = '#1d2233'; k.ctx.fillRect(0, 0, k.W, k.H);
        k.text('Đông Nam Á', 960, 140, { size: 80, font: 'title', color: '#9fe8c8', fx: 'fade', p: k.at('sea', 0.6), outline: '#1b1b24', outlineWidth: 10 });
        [['Việt Nam', 'Ma lai', 'sea'], ['Thái Lan', 'Krasue', 'th'], ['Campuchia', 'Ap', 'kh'], ['Malaysia', 'Penanggalan', 'my']].forEach(([c, n, cue], i) => {
          const x = 300 + i * 440, p = k.at(cue, 0.5);
          k.prop('malai', x + 30, 480 + Math.sin(k.gt * 2 + i) * 20, 200, { p });
          k.text(n, x, 680, { size: 56, font: 'title', color: '#fff3c4', fx: 'pop', p, outline: '#1b1b24', outlineWidth: 10 });
          k.text(c, x, 760, { size: 40, weight: 600, color: '#c9c3b8', fx: 'fade', p });
        });
        cap(k, 'Cùng một nỗi sợ: cái đầu biết bay', 'all');
      },
    },
    {
      say: 'Vì sao lại thế? {old}Ngày xưa, khi một sản phụ, hay một em bé sơ sinh qua đời mà không rõ nguyên nhân, {blame}người ta cần một lời giải thích. {medicine}Y học khi ấy chưa đủ để trả lời. {culprit}Và thế là, "ma lai" trở thành thủ phạm.',
      sfx: [['heartbeat', 'old', 0.5], ['pop', 'blame'], ['stinger', 'culprit', 0.6]],
      draw(k) {
        chap(k, '#1 · Sự thật phía sau');
        k.ctx.fillStyle = '#2b2622'; k.ctx.fillRect(0, 0, k.W, k.H);
        k.prop('lamp', 520, 640, 160, {});
        k.char(760, G, 300, { ...VIL('#6b4a2d'), face: 'sad', pose: 'facepalm', p: k.at('old', 0.6) });
        k.char(960, G, 280, { body: 'woman', outfit: 'dress', color: '#8e5bd3', color2: '#f6c344', hair: 'bun', face: 'sad', pose: 'stand', p: k.at(k.cue('old', 0.4), 0.6) });
        for (let i = 0; i < 3; i++) k.icon('question', 1200 + i * 160, 380 + (i % 2) * 60, 120, { p: k.at(k.cue('blame', i * 0.3), 0.5) });
        k.icon('cross', 1360, 650, 110, { p: k.at('medicine', 0.4) });
        k.text('y học xưa', 1360, 760, { size: 40, weight: 600, color: '#c9c3b8', fx: 'fade', p: k.at('medicine', 0.4) });
        k.prop('malai', 1600, 300, 220, { p: k.at('culprit', 0.5) });
        k.darkness(0.5, [{ x: 520, y: 620, r: 560, warm: 1, flicker: 1 }]);
        k.text('"thủ phạm"', 1600, 160, { size: 56, font: 'title', color: '#e4572e', fx: 'pop', p: k.at(k.cue('culprit', 0.5), 0.5), outline: '#1b1b24', outlineWidth: 8 });
      },
    },
    {
      say: 'Và đây mới là phần đáng sợ nhất, vì nó có thật. {oan}Ở một số nơi, những người bị nghi là "ma lai" đã bị xa lánh, thậm chí bị đuổi khỏi làng, chỉ vì một lời đồn. {real}Con ma có thể không có thật. {but}Nhưng nỗi oan thì có.',
      sfx: [['gong', 'oan', 0.4], ['heartbeat', 'real', 0.5], ['stinger', 'but', 0.5]],
      draw(k) {
        chap(k, '#1 · Sự thật phía sau');
        k.backdrop('sunset', { ground: G });
        const leave = k.at('real', 6, 'inOut');
        for (let i = 0; i < 5; i++) k.char(260 + i * 150, G, 260, { ...VIL(['#9c6b3f', '#2e86de', '#b5482c', '#3bb273', '#6b4a2d'][i]), face: 'angry', pose: 'point', p: k.at(k.cue('oan', i * 0.2), 0.5) });
        k.char(k.lerp(1300, 1750, leave), G, 300, { body: 'woman', outfit: 'dress', color: '#8a8a8a', color2: '#c9c3b8', hair: 'bun', face: 'sad', pose: 'stand', walk: leave > 0 && leave < 1, p: k.at('oan', 0.5) });
        k.darkness(0.35 + leave * 0.25, [{ x: k.lerp(1300, 1750, leave), y: 700, r: 300 }]);
        k.text('NỖI OAN CÓ THẬT', 960, 220, { size: 96, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('but', 0.6), outline: '#1b1b24', outlineWidth: 14 });
      },
    },

    // ---------------- Bonus ----------------
    {
      chapter: 'Bonus: cây đa, giếng nước',
      say: 'Bonus: để ý không, chuyện ma Việt rất hay có cây đa, giếng nước. {tree}Cây đa thường mọc ở đầu làng, gần đình, gần miếu: chỗ linh thiêng, đêm đến vắng người. {well}Giếng thì sâu, tối, và nguy hiểm thật sự với trẻ con. {smart}Gắn ma vào đó, là cách nhanh nhất để lũ trẻ tránh xa.',
      sfx: [['owl', 'tree', 0.5], ['drip', 'well', 0.6], ['slideDown', 'smart', 0.5], ['boing', ['smart', 1.5], 0.5]],
      draw(k) {
        chap(k, 'Bonus: cây đa, giếng nước');
        night(k, { mx: 1700 });
        k.prop('banyan', 460, 540, 700, { p: k.at('tree', 0.6) });
        k.prop('well', 1150, 800, 260, { p: k.at('well', 0.6) });
        k.char(1150, 700, 260, { ...GHOST, p: k.at(k.cue('well', 1), 0.8), alpha: 0.6 });
        const run = k.at('smart', 2, 'in');
        [['#e4572e', 0], ['#2e86de', 1], ['#3bb273', 2]].forEach(([c, i]) => k.char(1500 + i * 130 + run * 600, G, 200, { ...KID(c), face: 'shock', pose: 'shout', walk: true, walkSpeed: 16, p: k.at(k.cue('smart', -0.5), 0.4) }));
        k.motion(1480, 760, 1, 0, { p: k.at('smart', 0.3), n: 4, len: 140, stroke: '#c9c3b8' });
        k.darkness(0.5, [{ x: 1700, y: 170, r: 500 }]);
      },
    },

    {
      chapter: 'Bonus: giờ Tý',
      say: 'Bonus thứ hai: vì sao ma hay xuất hiện lúc nửa đêm? {ty}Người xưa gọi khoảng từ mười một giờ đêm đến một giờ sáng là giờ Tý, một giờ "thiêng". {tired}Thật ra, đó là lúc trời tối nhất, người mệt nhất, mắt và não dễ nhìn nhầm nhất. {mix}Một cái bóng cây, nhìn mãi… cũng hóa thành bóng người.',
      sfx: [['gong', 'ty', 0.5], ['heartbeat', 'mix', 0.6], ['stinger', ['mix', 1.6], 0.5]],
      draw(k) {
        chap(k, 'Bonus: giờ Tý');
        night(k, { mx: 1700 });
        const { ctx } = k;
        k.group({ x: 480, y: 420, s: k.ease.back(k.at('ty', 0.5)) }, () => {
          ctx.beginPath(); ctx.arc(0, 0, 170, 0, Math.PI * 2); ctx.fillStyle = '#fffaf0'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = '#3b2f2a'; ctx.stroke();
          for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(Math.sin(a) * 140, -Math.cos(a) * 140); ctx.lineTo(Math.sin(a) * 155, -Math.cos(a) * 155); ctx.lineWidth = 6; ctx.stroke(); }
          ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -95); ctx.stroke();
          ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin((k.gt ?? 0) * 0.5) * 10, -130); ctx.stroke();
        });
        k.text('23:00 – 1:00', 480, 660, { size: 60, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at(k.cue('ty', 1), 0.5), outline: '#1b1b24', outlineWidth: 10 });
        const m = k.at('mix', 2.5, 'inOut');
        k.prop('tree', 1350, 640, 480, { alpha: 1 - m * 0.7 });
        k.char(1350, 870, 420, { ...GHOST, alpha: m * 0.8 });
        k.darkness(0.55, [{ x: 480, y: 420, r: 420 }, { x: 1700, y: 170, r: 420 }]);
        k.text('giờ "thiêng"', 480, 760, { size: 46, weight: 600, color: '#c9c3b8', fx: 'fade', p: k.at(k.cue('ty', 2), 0.5) });
        cap(k, 'Tối nhất · mệt nhất · dễ nhìn nhầm nhất', 'tired');
      },
    },
    {
      say: 'Và vì sao ma trong truyện Việt hay mặc áo trắng? {white}Vì đồ tang của người Việt xưa là màu trắng, {west}khác hẳn màu đen quen thuộc ở phương Tây. {logic}Nên trong trí tưởng tượng của ông bà ta, người đã khuất, dĩ nhiên… mặc đồ trắng.',
      sfx: [['pop', 'white'], ['pop', 'west'], ['boing', 'logic', 0.4]],
      draw(k) {
        chap(k, 'Bonus: áo trắng');
        k.backdrop('dawn', { ground: G });
        k.char(560, G, 420, { body: 'woman', outfit: 'dress', color: '#f4f4f0', color2: '#d9d4c8', hair: 'long', hat: 'band', face: 'sad', pose: 'stand', p: k.at('white', 0.5) });
        k.text('Đồ tang Việt: TRẮNG', 560, 300, { size: 58, font: 'title', p: k.at('white', 1, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        k.char(1360, G, 420, { body: 'man', outfit: 'robe', color: '#2b2b33', color2: '#4a4a55', hair: 'short', face: 'sad', pose: 'stand', p: k.at('west', 0.5) });
        k.text('Phương Tây: ĐEN', 1360, 300, { size: 58, font: 'title', p: k.at('west', 1, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        k.char(960, G - 30, 300, { ...GHOST, p: k.at('logic', 0.6) });
      },
    },
    {
      chapter: 'Bonus: ma trong tục ngữ',
      say: [
        'Ma còn đi vào cả tục ngữ. {night}Ông bà ta có câu: "đi đêm lắm có ngày gặp ma". {mean}Nghĩa là: làm chuyện mờ ám mãi, thể nào cũng có ngày bị lộ. {old}Lại có câu: "ma cũ bắt nạt ma mới", {office}y hệt cảnh người mới vào công ty bị giao hết việc khó.',
        { v: 'villager', text: '{newbie}Ủa, sao việc gì cũng tới tay em vậy anh?' },
      ],
      sfx: [['owl', 'night', 0.4], ['pop', 'mean'], ['pop', 'old'], ['boing', 'newbie', 0.5]],
      draw(k) {
        chap(k, 'Bonus: ma trong tục ngữ');
        k.backdrop('night', { ground: G });
        k.text('"Đi đêm lắm có ngày gặp ma"', 960, 200, { size: 66, font: 'title', color: '#fff3c4', p: k.at('night', 1.4, 'linear'), outline: '#1b1b24', outlineWidth: 10 });
        k.text('= làm chuyện mờ ám, sẽ có ngày bị lộ', 960, 290, { size: 42, weight: 600, color: '#c9c3b8', fx: 'fade', p: k.at('mean', 0.5), outline: '#1b1b24', outlineWidth: 8 });
        k.text('"Ma cũ bắt nạt ma mới"', 960, 420, { size: 60, font: 'title', color: '#9fe8c8', p: k.at('old', 1.2, 'linear'), outline: '#1b1b24', outlineWidth: 10 });
        for (let i = 0; i < 3; i++) k.char(520 + i * 160, G, 260, { ...GHOST, alpha: 0.85, face: 'smug', hair: 'long', pose: 'point', p: k.at('office', 0.5) });
        k.char(1300, G, 240, { ...GHOST, alpha: 0.85, hair: 'short', face: 'shock', pose: 'hold', p: k.at('office', 0.5) });
        for (let i = 0; i < 4; i++) k.prop('scroll', 1300 + (i - 1.5) * 40, 600 - i * 50, 90, { p: k.at(k.cue('office', 0.6 + i * 0.25), 0.4) });
        say(k, 'Sao việc gì cũng tới tay em?', 'newbie', [1380, 450, 480, 110], [1320, 660], { fill: '#e9f0ee' });
      },
    },
    {
      chapter: 'Tèo gặp ma gì?',
      say: [
        '{back}À mà, còn thằng Tèo? {reveal}Hai đốm sáng xanh lè trong bụi tre hôm ấy… {cat}là con mèo nhà hàng xóm. {white}Còn cái bóng trắng lù lù phía sau lưng nó, là bà nội, cầm đèn đi tìm. Kèm theo… một cây roi.',
        { v: 'kid', text: '{sorry}Bà ơi, cháu biết lỗi rồi ạ!' },
        '{moral}Nhiều khi, "ma" chỉ là những gì ta chưa nhìn rõ.',
      ],
      sfx: [['drumroll', 'reveal', 0.4], ['meow', 'cat', 0.7], ['creak', 'white', 0.5], ['bonk', 'sorry', 0.6], ['bonk', ['sorry', 0.5], 0.5], ['ding', 'moral', 0.5]],
      draw(k) {
        chap(k, 'Tèo gặp ma gì?');
        night(k);
        k.water(930, { color: '#2d4a66', amp: 5 });
        k.prop('bamboo', 1450, 720, 380);
        const lit = k.at('cat', 0.8);
        k.prop('cat', 1500, 800, 200, { p: lit });
        k.glowEyes(1520, 600, 1.2, '#b6f55a', { p: 1 - lit });
        const come = k.at('white', 2, 'inOut');
        k.char(k.lerp(-100, 520, come), G, 330, { ...GRANDMA, face: k.t > k.cue('sorry') ? 'angry' : 'smug', pose: 'hold', prop: 'staff', walk: come > 0 && come < 1 });
        k.prop('lamp', k.lerp(-40, 600, come), 780, 110, {});
        k.char(900, G, 230, { body: 'kid', outfit: 'tunic', color: '#2e86de', color2: '#f6c344', hair: 'short', face: k.t > k.cue('sorry') ? 'sad' : 'shock', pose: k.t > k.cue('sorry') ? 'facepalm' : 'shout' });
        k.darkness(0.5 - lit * 0.2, [{ x: 1650, y: 170, r: 480 }, { x: 1500, y: 780, r: 300 * lit }, { x: k.lerp(-40, 600, come), y: 760, r: 420, warm: 1, flicker: 1 }]);
        say(k, 'Bà ơi, cháu biết lỗi rồi ạ!', 'sorry', [820, 250, 560, 110], [900, 640]);
        cap(k, 'Nhiều khi, "ma" chỉ là những gì ta chưa nhìn rõ', 'moral');
      },
    },

    // ---------------- Kết luận ----------------
    {
      chapter: 'Vậy ma có thật không?',
      say: 'Vậy rốt cuộc, ma có thật không? {no}Đến nay, chưa ai chứng minh được. {fear}Nhưng nỗi sợ thì có thật, và nó từng rất có ích: {r1}giữ trẻ con tránh xa sông nước, {r2}giữ người ta không vào rừng đêm, {r3}và nhắc ta canh giữ người đã khuất.',
      sfx: [['drumroll', 0.3, 0.4], ['pop', 'r1'], ['pop', 'r2'], ['pop', 'r3']],
      draw(k) {
        chap(k, 'Vậy ma có thật không?');
        k.backdrop('dawn', { ground: G });
        k.text('Ma có thật không?', 960, 160, { size: 90, font: 'title', color: '#b5482c', p: k.at(0.2, 1.2, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
        k.text('Chưa ai chứng minh được.', 960, 270, { size: 52, weight: 600, fx: 'fade', p: k.at('no', 0.5), outline: '#fffaf0', outlineWidth: 8 });
        [['hands', 'Tránh xa sông nước', 'r1', 360], ['tiger', 'Không vào rừng đêm', 'r2', 960], ['lamp', 'Canh giữ người đã khuất', 'r3', 1560]].forEach(([pr, t, c, x]) => {
          k.rect(x - 250, 380, 500, 460, { fill: '#fffaf0', width: 4, p: k.at(c, 0.4) });
          k.prop(pr, x, 580, pr === 'tiger' ? 300 : 200, { p: k.at(k.cue(c, 0.2), 0.5), reach: 1 });
          k.text(t, x, 780, { size: 44, font: 'title', p: k.at(k.cue(c, 0.3), 0.8, 'linear') });
        });
      },
    },
    {
      say: '{last}Chỉ có một loại "ma" mà ta nên sợ thật sự: {oan}đó là thói quen đổ lỗi cho người khác, khi ta chưa hiểu điều gì đang xảy ra. {light}Và cách trừ con ma ấy, chỉ có một: bật đèn lên. Đèn của hiểu biết.',
      sfx: [['heartbeat', 'last', 0.5], ['click', 'light', 0.9], ['sparkle', ['light', 0.3], 0.6]],
      draw(k) {
        chap(k, 'Vậy ma có thật không?');
        night(k, { moon: false });
        const on = k.at('light', 1.5, 'inOut');
        for (let i = 0; i < 4; i++) k.char(360 + i * 150, G, 260, { ...VIL(['#9c6b3f', '#2e86de', '#b5482c', '#3bb273'][i]), face: on > 0.5 ? 'shock' : 'angry', pose: on > 0.5 ? 'stand' : 'point', p: k.at('oan', 0.5) });
        k.char(1400, G, 280, { body: 'woman', outfit: 'dress', color: '#8a8a8a', color2: '#c9c3b8', hair: 'bun', face: on > 0.5 ? 'happy' : 'sad', pose: on > 0.5 ? 'wave' : 'stand', p: k.at('oan', 0.5) });
        k.prop('lamp', 960, 760, 200, { p: k.at('light', 0.4) });
        k.text('Đèn của hiểu biết', 960, 260, { size: 84, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at(k.cue('light', 1.6), 0.6), outline: '#1b1b24', outlineWidth: 12 });
        k.darkness(0.75 - on * 0.6, [{ x: 960, y: 740, r: 220 + on * 1200, warm: 1, flicker: 1 }]);
      },
    },
    {
      chapter: 'Tóm tắt',
      say: 'Tóm lại: {a}ma xó là góc tối. {b}Ma trành là hổ dữ. {c}Ma da là dòng nước xoáy. {d}Quỷ nhập tràng là ánh đèn dầu chập chờn. {e}Còn ma lai… là nỗi sợ trước những điều ta chưa hiểu.',
      sfx: [['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['stinger', 'e', 0.4]],
      draw(k) {
        k.ctx.fillStyle = '#1d2233'; k.ctx.fillRect(0, 0, k.W, k.H);
        k.text('Tóm tắt', 960, 110, { size: 80, font: 'title', color: '#fff3c4', p: k.at(0.1, 0.8, 'linear') });
        const rows = [['a', 'Ma xó', 'góc tối'], ['b', 'Ma trành', 'hổ dữ'], ['c', 'Ma da', 'nước xoáy'], ['d', 'Quỷ nhập tràng', 'đèn dầu chập chờn'], ['e', 'Ma lai', 'nỗi sợ điều chưa hiểu']];
        rows.forEach(([c, n, t], i) => {
          const y = 250 + i * 150;
          k.text(n, 860, y, { size: 58, font: 'title', align: 'right', color: '#e4572e', p: k.at(c, 0.6, 'linear'), outline: '#1b1b24', outlineWidth: 8 });
          k.text('=', 960, y, { size: 58, font: 'title', color: '#c9c3b8', fx: 'fade', p: k.at(c, 0.4) });
          k.text(t, 1060, y, { size: 58, font: 'title', align: 'left', color: '#fff3c4', p: k.at(k.cue(c, 0.3), 0.8, 'linear'), outline: '#1b1b24', outlineWidth: 8 });
        });
      },
    },
    nextEpisodeScene({
      say: '{next}Tập sau: ma có thật không? {why}Bóng đè, ma trơi, bị ma dắt, nhà có tiếng cót két. {hook}Mình kể chuyện ma trước, rồi để khoa học lên tiếng. Hẹn bạn ở tập sau nhé.',
      title: 'Ma có thật không? 5 lần "gặp ma" khoa học giải thích được',
      hook: 'Bóng đè, ma trơi, ma dắt… khoa học nói gì?',
      when: 'Series Sinh vật dân gian',
      art: (k) => { k.image('next', -300, -190, 600, 338, { fx: 'fade' }); },
      sfx: [['boom', 'hook', 0.4]],
    }),
    withBackdrop(subscribeScene({
      say: 'Còn quê bạn có chuyện ma nào? {q}Kể trong phần bình luận nhé, nếu bạn dám. {sub}Và đăng ký Vẽ Là Hiểu, bật chuông để không lỡ tập sau. Còn tối nay, nhớ… bật đèn khi ngủ!',
      question: 'Quê bạn có chuyện ma nào? Kể đi… nếu dám 👻',
      channel: 'Vẽ Là Hiểu',
      tail: 1.5,
      sfx: [['owl', ['sub', 4], 0.4]],
    })),
  ],

  thumbnail: thumbs.a,
};
