// Tập 2 — Sơn Tinh – Thủy Tinh: vì cô gái, hay vì con đê? (phong cách hoạt hình phẳng, tếu táo)
// Đối chiếu: truyện Sơn Tinh – Thủy Tinh (Lĩnh Nam chích quái; bản kể trong sách Ngữ văn): Hùng Vương thứ 18, Mỵ Nương,
// sính lễ "một trăm ván cơm nếp, một trăm nệp bánh chưng, voi chín ngà, gà chín cựa, ngựa chín hồng mao, mỗi thứ một đôi";
// kinh đô Phong Châu; Tản Viên Sơn Thánh = thần núi Ba Vì (đỉnh cao nhất ~1.296 m).
// Đại Việt sử ký toàn thư: 1108 đắp đê Cơ Xá (nhà Lý); 1248 nhà Trần đắp đê dọc sông từ đầu nguồn đến bờ biển, đặt chức Hà đê chánh/phó sứ.
// Sông Hồng bắt nguồn từ Vân Nam (Trung Quốc), dài hơn 1.000 km, màu đỏ do phù sa; lũ lịch sử năm 1971.
import { C } from '/engine/kit.js';
import { subscribeScene } from '/engine/templates.js';
import * as thumbs from '/videos/004-son-tinh-thuy-tinh/thumbs.js';

const G = 880; // mặt đất
const KING = { body: 'man', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'kingfeather', beard: 'long', hair: 'short', cape: '#b5482c' };
const MY = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'long', hat: 'flower' };
const SON = { body: 'big', outfit: 'robe', color: '#4f8a3f', color2: '#c9a24a', hair: 'topknot', hat: 'mountain', cape: '#6b4a2d' };
const THUY = { body: 'big', outfit: 'robe', color: '#2f78c4', color2: '#9fd3f2', hair: 'long', hairColor: '#1d3f66', hat: 'wave', cape: '#1d4f8a', prop: 'trident' };
const VIL = (c, extra = {}) => ({ body: 'man', outfit: 'bare', color: c, color2: '#f6c344', hair: 'short', hat: 'feather', ...extra });

function chap(k, n, title) {
  k.text(`Chương ${n} · ${title}`, 60, 56, { size: 30, align: 'left', color: '#6b5f55', fx: 'fade', p: k.at(0, 0.6), outline: '#fffaf0', outlineWidth: 8 });
}
function cap(k, text, cue, o = {}) {
  const y = o.y ?? 995;
  const b = k.text(text, k.W / 2, y, { size: o.size ?? 54, font: 'title', p: k.at(cue, o.dur ?? 1.2, 'linear'), maxWidth: 1760, color: o.color ?? '#3b2f2a', outline: '#fffaf0', outlineWidth: 12 });
  if (o.hl) k.highlight(k.W / 2 - b.w / 2 - 16, y - 34, b.w + 32, 68, { p: k.at(k.cue(cue, (o.dur ?? 1.2) + 0.2), 0.5), color: o.hl });
}
function say(k, text, c, box, tail, o = {}) {
  k.bubble(box[0], box[1], box[2], box[3], tail[0], tail[1], { p: k.at(c, 0.4), text, size: o.size ?? 44, seed: o.seed, think: o.think });
}
// Thẻ thí sinh kiểu gameshow.
function badge(k, x, y, title, sub, color, p) {
  if (p <= 0) return;
  k.group({ x, y, s: k.ease.back(Math.min(1, p)) }, () => {
    k.rect(-230, -60, 460, 120, { fill: color, width: 4 });
    k.text(title, 0, -14, { size: 52, font: 'title', color: C.white, outline: '#3b2f2a', outlineWidth: 8 });
    k.text(sub, 0, 34, { size: 28, color: C.white, weight: 600 });
  });
}
// Ruộng lúa: hàng cây mạ mọc dần (p 0..1).
function rice(k, x0, y0, cols, rows, p) {
  const { ctx } = k;
  for (let i = 0; i < cols * rows; i++) {
    const x = x0 + (i % cols) * 75, y = y0 + Math.floor(i / cols) * 90;
    const h = 50 * Math.min(1, p * 1.5 - (i % cols) * 0.04);
    if (h <= 0) continue;
    ctx.save(); ctx.strokeStyle = '#3f8f3a'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    for (const d of [-8, 0, 8]) { ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + d, y - h * 0.6, x + d * 1.8, y - h); ctx.stroke(); }
    ctx.restore();
  }
}

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    title: 'Sơn Tinh – Thủy Tinh: đánh nhau vì cô gái, hay vì con đê?',
    description: `Sơn Tinh – Thủy Tinh đánh nhau vì Mỵ Nương… hay vì lũ sông Hồng? Voi chín ngà, gà chín cựa, ngựa chín hồng mao, "ai đến trước được cưới", và màn trả thù mỗi mùa mưa của Thủy Tinh — tất cả đều có lời giải.
Vẽ Là Hiểu giải mã truyền thuyết Sơn Tinh Thủy Tinh: vì sao sông Hồng màu đỏ, vì sao danh sách sính lễ "thiên vị", và người Việt đã đắp đê chống lũ từ bao giờ.`,
    footer: `📚 Nguồn tham khảo: truyện Sơn Tinh – Thủy Tinh (Lĩnh Nam chích quái), Đại Việt sử ký toàn thư (đắp đê Cơ Xá 1108; nhà Trần đắp đê, đặt chức Hà đê sứ 1248).
🔔 Đăng ký Vẽ Là Hiểu để cùng soi truyền thuyết và lịch sử Việt.
💬 Tập sau: một trăm cái trứng nở ra một trăm người con — mẹ Âu Cơ chăm kiểu gì? Đoán thử nhé!`,
    tags: ['sơn tinh thủy tinh', 'truyền thuyết sơn tinh thủy tinh', 'sơn tinh thủy tinh giải thích', 'mỵ nương', 'voi chín ngà gà chín cựa ngựa chín hồng mao', 'lũ sông hồng', 'đê sông hồng', 'tản viên sơn thánh', 'truyền thuyết việt nam', 'vẽ là hiểu'],
    hashtags: ['sontinhthuytinh', 'truyenthuyetvietnam', 'suviet'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '+0%',
    voices: {
      king: { voice: 'vi-VN-NamMinhNeural', pitch: '-18Hz', rate: '-8%' },
      son: { voice: 'vi-VN-NamMinhNeural', pitch: '-10Hz', rate: '-6%' },
      thuy: { voice: 'vi-VN-NamMinhNeural', pitch: '+14Hz', rate: '+10%' },
      my: { voice: 'vi-VN-HoaiMyNeural', pitch: '+10Hz', rate: '+4%' },
      villager: { voice: 'vi-VN-HoaiMyNeural', pitch: '+12Hz', rate: '+12%' },
    },
    paper: '#f7f3ea',
    music: 'assets/music/background.mp3',
    musicVolume: 0.08,
    sfxVolume: 0.5,
  },

  scenes: [
    // ---------------- Mở đầu ----------------
    {
      chapter: 'Mở đầu',
      lead: 0.2,
      say: 'Cứ đến mùa mưa, {rain}miền Bắc lại ngập. {modern}Người thời nay đổ tại biến đổi khí hậu, tại cống thoát nước. {old}Còn người Việt cổ có một lời giải thích khác hẳn: {ex}tại… người yêu cũ.',
      sfx: [['whoosh', 'rain', 0.5], ['pop', 'modern'], ['scratch', 'ex', 0.7], ['boing', ['ex', 1.2], 0.6]],
      draw(k) {
        k.backdrop(k.t > k.cue('old') ? 'dawn' : 'day', { ground: G });
        k.prop('storm', 520, 200, 300, { p: k.at('rain', 0.6), rain: 1, bolt: true });
        k.prop('storm', 1300, 160, 260, { p: k.at(k.cue('rain', 0.3), 0.6), rain: 1 });
        k.water(k.lerp(1100, 800, k.at('rain', 4, 'inOut')), { amp: 8 });
        k.char(560, 820, 260, { body: 'man', outfit: 'tunic', color: '#2e86de', color2: '#f6c344', hair: 'short', face: k.t > k.cue('ex') ? 'shock' : 'sad', pose: 'shrug', p: k.at('modern', 0.6), bob: 1 });
        say(k, 'Tại biến đổi khí hậu!', 'modern', [180, 330, 470, 110], [520, 560], { size: 40 });
        k.char(1340, 820, 260, { ...VIL('#9c6b3f'), face: 'smug', pose: 'point', p: k.at('old', 0.6), bob: 1 });
        say(k, 'Tại… người yêu cũ.', 'ex', [1180, 330, 520, 110], [1320, 560], { size: 42 });
        k.prop('heart', 1720, 470, 120, { p: k.at(k.cue('ex', 0.6), 0.5), fill: '#b5482c' });
      },
    },
    {
      say: 'Đó là truyền thuyết {title}Sơn Tinh, Thủy Tinh: một cô gái, hai chàng trai, và… {flood}một trận lũ lặp lại mỗi năm. {q}Nhưng thật ra, họ đánh nhau vì cô gái, hay vì con đê?',
      sfx: [['tada', 'title', 0.5], ['boom', 'flood', 0.5], ['drumroll', 'q', 0.4]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.char(420, G, 380, { ...SON, face: 'smug', pose: 'hips', p: k.at('title', 0.6) });
        k.char(1500, G, 380, { ...THUY, face: 'angry', pose: 'fight', p: k.at(k.cue('title', 0.6), 0.6) });
        k.char(960, G, 320, { ...MY, face: k.t > k.cue('flood') ? 'shock' : 'calm', pose: 'stand', p: k.at(k.cue('title', 1.2), 0.6) });
        k.text('Sơn Tinh – Thủy Tinh', 960, 170, { size: 110, font: 'title', color: '#b5482c', p: k.at('title', 1.2, 'linear'), outline: '#fffaf0', outlineWidth: 16 });
        k.text('vì cô gái, hay vì con đê?', 960, 290, { size: 64, weight: 600, p: k.at('q', 1.6, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        k.prop('heart', 960, 480, 100, { p: k.at(k.cue('title', 1.6), 0.5) });
        k.prop('dike', 1720, 960, 160, { p: k.at(k.cue('q', 1.6), 0.5) });
      },
    },

    // ---------------- Chương 1: Truyền thuyết ----------------
    {
      chapter: 'Show kén rể đầu tiên',
      say: [
        'Chuyện kể rằng, {king}vua Hùng thứ mười tám có cô con gái tên Mỵ Nương, {pretty}người đẹp như hoa, tính nết hiền dịu. Vua muốn kén cho con một người chồng thật xứng đáng.',
        { v: 'king', text: '{ad}Ai muốn làm rể ta, mời đăng ký!' },
        '{show}Và thế là, chương trình hẹn hò đầu tiên trong lịch sử Việt Nam chính thức lên sóng.',
      ],
      sfx: [['pop', 'king'], ['sparkle', 'pretty', 0.6], ['ding', 'ad', 0.6], ['tada', 'show', 0.6]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.backdrop('day', { ground: G });
        k.prop('palace', 1500, 640, 520, { p: k.at(0.2, 0.8) });
        k.char(560, G, 380, { ...KING, face: 'happy', pose: k.t > k.cue('ad') ? 'wave' : 'present', p: k.at('king', 0.6) });
        k.char(900, G, 330, { ...MY, face: 'happy', pose: 'stand', p: k.at('pretty', 0.6), blush: true });
        for (let i = 0; i < 4; i++) k.prop('heart', 900 + Math.cos(i * 1.6) * 150, 560 + Math.sin(i * 1.6) * 90, 50, { p: k.at(k.cue('pretty', 0.3 + i * 0.15), 0.4) });
        say(k, 'Ai muốn làm rể ta, mời đăng ký!', 'ad', [180, 240, 560, 120], [520, 520]);
        const pb = k.at('show', 0.6);
        k.group({ x: 1200, y: 190, r: -0.04, s: k.ease.back(pb) }, () => {
          k.rect(-330, -70, 660, 140, { fill: '#b5482c', width: 5, p: pb > 0 ? 1 : 0 });
          k.text('AI LÀ PHÒ MÃ?', 0, 4, { size: 76, font: 'title', color: '#fff3c4', p: pb > 0 ? 1 : 0, outline: '#3b2f2a', outlineWidth: 10 });
        });
      },
    },
    {
      say: [
        'Có hai thí sinh xuất sắc. {son}Thí sinh số một: Sơn Tinh, chúa vùng non cao. {east}Vẫy tay về phía đông, phía đông nổi cồn bãi. {west}Vẫy tay về phía tây, phía tây mọc lên từng dãy núi đồi.',
        { v: 'son', text: '{line}Núi non là chuyện nhỏ!' },
      ],
      sfx: [['pop', 'son'], ['slideUp', 'east', 0.6], ['boom', 'west', 0.5], ['ding', 'line', 0.5]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.backdrop('day', { ground: G });
        const east = k.at('east', 1.2, 'back'), west = k.at('west', 1.4, 'back');
        k.prop('mountain', 300, G - 150 * west + 150, 360 * Math.max(0.01, west), { p: west });
        k.prop('mountain', 1620, G - 120 * east + 120, 300 * Math.max(0.01, east), { p: east, fill: '#8fb36b' });
        k.char(960, G, 440, { ...SON, face: k.t > k.cue('line') ? 'smug' : 'calm', pose: k.t > k.cue('west') ? { l: [140, 20], r: [12, 6] } : k.t > k.cue('east') ? { l: [12, 6], r: [140, 20] } : 'hips', p: k.at('son', 0.6) });
        badge(k, 960, 160, 'SƠN TINH', 'Thí sinh số 1 · chúa vùng non cao', '#4f8a3f', k.at(k.cue('son', 0.4), 0.6));
        say(k, 'Núi non là chuyện nhỏ!', 'line', [1180, 330, 460, 110], [1080, 520]);
      },
    },
    {
      say: [
        '{thuy}Thí sinh số hai: Thủy Tinh, chúa vùng nước thẳm. {wind}Gọi gió, gió đến. {rain}Hô mưa, mưa về.',
        { v: 'thuy', text: '{line}Mưa gió là nghề của anh!' },
        '{both}Một người làm ra núi, một người làm ra mưa. Vua Hùng nhìn hai chàng rể tiềm năng, {hard}và nhận ra: cả hai đều… quá giỏi.',
      ],
      sfx: [['pop', 'thuy'], ['whoosh', 'wind', 0.8], ['whoosh', ['wind', 0.4], 0.6], ['scratch', 'rain', 0.4], ['boing', 'hard', 0.6]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.backdrop(k.t > k.cue('rain') ? 'night' : 'day', { ground: G });
        k.prop('storm', 420, 220, 300, { p: k.at('rain', 0.6), rain: 1, bolt: true });
        k.prop('storm', 1550, 200, 280, { p: k.at(k.cue('rain', 0.3), 0.6), rain: 1, bolt: true });
        k.motion(500, 560, 1, 0.1, { p: k.at('wind', 0.4), n: 6, len: 220, gap: 34, stroke: '#9fd3f2', width: 6 });
        const both = k.at('both', 0.6);
        k.char(k.lerp(960, 1220, both), G, 440, { ...THUY, face: k.t > k.cue('line') ? 'laugh' : 'angry', pose: k.t > k.cue('rain') ? 'cheer' : 'fight', p: k.at('thuy', 0.6) });
        badge(k, 960, 160, 'THỦY TINH', 'Thí sinh số 2 · chúa vùng nước thẳm', '#2f78c4', k.at(k.cue('thuy', 0.4), 0.6) * (1 - both));
        say(k, 'Mưa gió là nghề của anh!', 'line', [1250, 300, 500, 110], [1240, 500]);
        k.char(560, G, 360, { ...SON, face: 'smug', pose: 'hips', p: both });
        k.char(890, G, 340, { ...KING, face: k.t > k.cue('hard') ? 'sad' : 'calm', pose: 'think', p: k.at(k.cue('both', 0.4), 0.6) });
        k.sweat(940, 520, 2, { p: k.at('hard', 0.3) });
      },
    },
    {
      say: [
        'Khó chọn quá, {rule}vua ra một thể lệ cực kỳ… công bằng:',
        { v: 'king', text: '{rule2}Sáng mai, ai mang sính lễ đến trước, người đó được cưới Mỵ Nương!' },
        '{sale}Ai nhanh tay người đó thắng. Y hệt săn sale ngày mười một tháng mười một.',
      ],
      sfx: [['drumroll', 'rule', 0.5], ['ding', 'rule2', 0.6], ['cash', 'sale', 0.7]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.backdrop('day', { ground: G });
        k.prop('palace', 1550, 640, 480, {});
        k.char(700, G, 400, { ...KING, face: 'smug', pose: 'point', p: k.at(0.2, 0.6) });
        say(k, 'Ai mang sính lễ đến trước, người đó được cưới!', 'rule2', [200, 200, 820, 140], [640, 470], { size: 46 });
        const ps = k.at('sale', 0.5);
        k.group({ x: 1300, y: 300, r: 0.08, s: k.ease.back(ps) }, () => {
          k.rect(-250, -90, 500, 180, { fill: '#e4572e', width: 5, p: ps > 0 ? 1 : 0 });
          k.text('11.11', 0, -20, { size: 90, font: 'title', color: '#fff3c4', p: ps > 0 ? 1 : 0 });
          k.text('AI NHANH NGƯỜI ĐÓ THẮNG', 0, 50, { size: 32, font: 'title', color: '#fff', p: ps > 0 ? 1 : 0 });
        });
      },
    },
    {
      say: [
        'Còn sính lễ là gì? {list}Một trăm ván cơm nếp, một trăm nệp bánh chưng. {voi}Voi chín ngà. {ga}Gà chín cựa. {ngua}Ngựa chín hồng mao. {pair}Mỗi thứ một đôi.',
        '{mission}Đây không phải danh sách sính lễ. Đây là… nhiệm vụ bất khả thi.',
      ],
      sfx: [['pop', 'list'], ['pop', ['list', 1.4]], ['boom', 'voi', 0.6], ['pop', 'ga'], ['pop', 'ngua'], ['ding', 'pair', 0.5], ['wahwah', 'mission', 0.4]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.rect(80, 120, 1760, 820, { fill: '#fffaf0', width: 5 });
        k.text('DANH SÁCH SÍNH LỄ', 960, 190, { size: 64, font: 'title', color: '#b5482c', p: k.at('list', 1, 'linear') });
        k.prop('xoi', 300, 380, 220, { p: k.at('list', 0.5) });
        k.text('100 ván cơm nếp', 300, 520, { size: 36, weight: 600, fx: 'fade', p: k.at(k.cue('list', 0.4), 0.5) });
        k.prop('banhchung', 720, 380, 200, { p: k.at(k.cue('list', 1.4), 0.5) });
        k.text('100 nệp bánh chưng', 720, 520, { size: 36, weight: 600, fx: 'fade', p: k.at(k.cue('list', 1.8), 0.5) });
        k.prop('elephant', 1110, 360, 300, { p: k.at('voi', 0.6), tusks: 9 });
        k.text('voi CHÍN ngà', 1110, 520, { size: 44, font: 'title', fx: 'pop', p: k.at(k.cue('voi', 0.3), 0.5), color: '#b5482c' });
        k.prop('rooster', 1540, 360, 260, { p: k.at('ga', 0.6), spurs: 9 });
        k.text('gà CHÍN cựa', 1540, 520, { size: 44, font: 'title', fx: 'pop', p: k.at(k.cue('ga', 0.3), 0.5), color: '#b5482c' });
        k.prop('horse', 600, 720, 300, { p: k.at('ngua', 0.6), manes: 9, mane: '#e4572e' });
        k.text('ngựa CHÍN hồng mao', 600, 880, { size: 44, font: 'title', fx: 'pop', p: k.at(k.cue('ngua', 0.3), 0.5), color: '#b5482c' });
        k.text('× 2 mỗi thứ', 1100, 700, { size: 70, font: 'title', fx: 'pop', p: k.at('pair', 0.5) });
        k.burst(1520, 840, 110, 'BẤT KHẢ THI', { p: k.at('mission', 0.5), size: 44 });
      },
    },
    {
      say: [
        'Thử đặt mình vào vị trí hai chàng rể. {horse}Ngựa chín hồng mao, cố lắm thì còn… nhuộm được. {rooster}Gà chín cựa, thôi thì đi hỏi khắp các xóm. {elephant}Nhưng voi chín ngà? Đi đâu mà tìm?',
        { v: 'villager', text: '{search}Có ai thấy con voi nào chín ngà không?!' },
        { v: 'son', text: '{easy}Núi của ta, cái gì cũng có.' },
      ],
      sfx: [['pop', 'horse'], ['pop', 'rooster'], ['scratch', 'elephant', 0.5], ['boing', 'search', 0.5], ['ding', 'easy', 0.5]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.backdrop('day', { ground: G });
        k.prop('horse', 320, 760, 260, { p: k.at('horse', 0.5), manes: 9, mane: '#e4572e' });
        k.text('nhuộm được?', 320, 560, { size: 44, font: 'title', fx: 'pop', p: k.at(k.cue('horse', 1), 0.4), outline: '#fffaf0', outlineWidth: 8 });
        k.prop('rooster', 660, 790, 200, { p: k.at('rooster', 0.5), spurs: 9 });
        k.icon('question', 1040, 520, 220, { p: k.at('elephant', 0.5) });
        k.prop('elephant', 1040, 760, 260, { p: k.at('elephant', 0.5), tusks: 9, alpha: 0.35 });
        k.char(1360, G, 280, { ...VIL('#9c6b3f'), face: 'shout', pose: 'shout', p: k.at('search', 0.4) });
        say(k, 'Có ai thấy con voi nào chín ngà không?!', 'search', [880, 150, 640, 120], [1350, 560]);
        k.char(1700, G, 360, { ...SON, face: 'smug', pose: 'hips', p: k.at('easy', 0.5) });
        say(k, 'Núi của ta, cái gì cũng có.', 'easy', [1250, 330, 520, 110], [1680, 480]);
      },
    },
    {
      say: [
        'Mà để ý nhé: {land}cơm nếp, bánh chưng, voi, gà, ngựa, {all}toàn là sản vật trên cạn. Không có lấy một con cá. {bias}Nhà vua có thiên vị không? Mời bạn tự đánh giá.',
        { v: 'thuy', text: '{angry}Ủa alo? Cá đâu? Tôm đâu?' },
      ],
      sfx: [['pop', 'land'], ['bonk', 'all', 0.5], ['drumroll', 'bias', 0.4], ['boing', 'angry', 0.6]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.backdrop('day', { ground: G });
        k.prop('mountain', 380, 700, 360, { p: k.at('land', 0.6) });
        k.prop('elephant', 260, 800, 200, { p: k.at(k.cue('land', 0.6), 0.5), tusks: 9 });
        k.prop('banhchung', 520, 830, 120, { p: k.at(k.cue('land', 0.9), 0.5) });
        k.text('TRÊN CẠN', 400, 380, { size: 70, font: 'title', color: '#4f8a3f', fx: 'pop', p: k.at('all', 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.prop('fish', 1500, 520, 180, { p: k.at(k.cue('all', 1.2), 0.5), bob: 6 });
        k.icon('cross', 1500, 520, 220, { p: k.at(k.cue('all', 1.6), 0.4) });
        k.text('0 con cá', 1500, 380, { size: 64, font: 'title', color: '#2f78c4', fx: 'pop', p: k.at(k.cue('all', 1.8), 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.char(1150, G, 380, { ...THUY, face: 'shout', pose: 'shrug', p: k.at('angry', 0.5) });
        say(k, 'Ủa alo? Cá đâu? Tôm đâu?', 'angry', [700, 220, 520, 110], [1110, 470]);
        k.text('Thiên vị?', 960, 140, { size: 70, font: 'title', fx: 'pop', p: k.at('bias', 0.5), color: '#b5482c', outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: [
        'Sáng hôm sau, {dawn}mặt trời còn chưa thức dậy, Sơn Tinh đã có mặt, đủ lễ vật, không thiếu món nào.',
        { v: 'son', text: '{deliver}Giao hàng đúng hẹn, mời ngài kiểm đơn!' },
        { v: 'king', text: '{ok}Chốt đơn!' },
        '{take}Và thế là Sơn Tinh rước Mỵ Nương về núi.',
        { v: 'my', text: '{my}Ơ… thế em có được chọn không ạ?' },
        '{custom}Thời đó… không ai hỏi câu đó cả.',
      ],
      sfx: [['sparkle', 'dawn', 0.5], ['whoosh', 'deliver', 0.6], ['cash', 'ok', 0.8], ['tada', 'take', 0.5], ['boing', 'my', 0.5], ['wahwah', 'custom', 0.35]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.backdrop('dawn', { ground: G });
        k.prop('sun', 1600, 300 + 120 * (1 - k.at('dawn', 3, 'out')), 180, { p: k.at('dawn', 0.6) });
        k.prop('palace', 1550, 640, 440, {});
        const go = k.at('take', 3, 'inOut');
        k.char(k.lerp(420, 160, go), G, 400, { ...SON, face: 'happy', pose: k.t > k.cue('take') ? 'wave' : 'present', walk: go > 0 && go < 1 });
        k.char(k.lerp(700, 400, go), G, 330, { ...MY, face: k.t > k.cue('my') ? 'shock' : 'calm', pose: 'stand', walk: go > 0 && go < 1, p: k.at(k.cue('take', -1), 0.5) });
        k.prop('elephant', k.lerp(260, -320, go), 790, 200, { p: k.at('deliver', 0.5), tusks: 9 });
        k.prop('horse', k.lerp(560, -200, go), 800, 170, { p: k.at(k.cue('deliver', 0.3), 0.5), manes: 9, mane: '#e4572e' });
        k.prop('rooster', k.lerp(760, -100, go), 830, 110, { p: k.at(k.cue('deliver', 0.6), 0.5), spurs: 9 });
        k.char(1180, G, 360, { ...KING, face: k.t > k.cue('ok') ? 'laugh' : 'happy', pose: k.t > k.cue('ok') ? 'cheer' : 'stand' });
        k.group({ a: 1 - k.at('take', 0.4) }, () => say(k, 'Giao hàng đúng hẹn!', 'deliver', [240, 200, 420, 110], [430, 470]));
        k.group({ a: 1 - k.at('my', 0.4) }, () => k.burst(860, 300, 80, 'CHỐT ĐƠN!', { p: k.at('ok', 0.4), size: 40 }));
        say(k, 'Thế em có được chọn không ạ?', 'my', [560, 250, 560, 110], [k.lerp(700, 400, go) + 20, 560], { size: 40 });
      },
    },
    {
      say: [
        'Một lúc sau, {late}Thủy Tinh mới đến, lỉnh kỉnh lễ vật.',
        { v: 'thuy', text: '{where}Ủa? Người đâu rồi? Người đâu rồi?!' },
        '{lost}Đến muộn có mấy tiếng, mất luôn người yêu. {mad}Và Thủy Tinh đã chọn cách xử lý… không được bình tĩnh cho lắm.',
      ],
      sfx: [['whoosh', 'late', 0.6], ['scratch', 'where', 0.7], ['wahwah', 'lost', 0.5], ['boom', 'mad', 0.7]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.backdrop(k.t > k.cue('mad') ? 'night' : 'day', { ground: G });
        k.prop('palace', 1550, 640, 440, {});
        const arr = k.at('late', 1.6, 'out');
        k.char(k.lerp(-200, 760, arr), G, 420, { ...THUY, face: k.t > k.cue('mad') ? 'shout' : k.t > k.cue('where') ? 'shock' : 'happy', pose: k.t > k.cue('mad') ? 'shout' : k.t > k.cue('where') ? 'shrug' : 'stand', walk: arr < 1 });
        k.prop('fish', k.lerp(-400, 480, arr), 820, 120, { bob: 4 });
        k.prop('crab', k.lerp(-500, 380, arr), 840, 110, { bob: 3 });
        k.motion(k.lerp(-260, 640, arr), 620, 1, 0, { p: arr < 1 ? 1 : 0, n: 4, len: 160 });
        say(k, 'Người đâu rồi?!', 'where', [900, 260, 400, 110], [800, 470]);
        k.sweat(840, 430, 2.2, { p: k.at('where', 0.3) });
        k.text('–1 người yêu', 1300, 200, { size: 64, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('lost', 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.prop('storm', 760, 140, 280, { p: k.at('mad', 0.5), rain: 1, bolt: true });
      },
    },
    {
      say: [
        '{storm}Thủy Tinh hô mưa, gọi gió, dâng nước đánh Sơn Tinh. {fields}Nước ngập ruộng đồng, ngập nhà cửa. {city}Kinh thành Phong Châu nổi lềnh bềnh giữa một biển nước.',
        { v: 'villager', text: '{help}Ối giời ơi, nhà tôi trôi rồi!' },
      ],
      sfx: [['boom', 'storm', 0.6], ['whoosh', 'fields', 0.7], ['whoosh', ['fields', 0.5], 0.6], ['slideDown', 'help', 0.5]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.backdrop('night', { ground: G });
        const lv = k.lerp(1100, 560, k.at('fields', 6, 'inOut'));
        k.prop('palace', 1450, Math.min(640, lv - 40 + Math.sin(k.gt * 1.6) * 8), 440, { rotate: Math.sin(k.gt * 1.2) * 0.04 * k.at('city', 1) });
        k.prop('stilthouse', 480, Math.min(780, lv - 30 + Math.sin(k.gt * 2) * 10), 220, { rotate: Math.sin(k.gt * 1.7) * 0.08 * k.at('help', 1) });
        k.char(480, Math.min(G, lv - 120), 150, { ...VIL('#9c6b3f'), face: 'shout', pose: 'shout', p: k.at('help', 0.4), shadow: false });
        k.water(lv, { amp: 14 });
        k.prop('storm', 420, 140, 300, { rain: 1, bolt: true });
        k.prop('storm', 1300, 120, 320, { rain: 1, bolt: true });
        for (let i = 0; i < 3; i++) k.prop(i === 1 ? 'crab' : 'fish', 900 + i * 260 + Math.sin(k.gt * 2 + i) * 40, lv + 90 + i * 40, 110, { p: k.at(k.cue('fields', 1 + i * 0.4), 0.5), flip: i % 2 === 1 });
        k.prop('serpent', 1100 + Math.sin(k.gt) * 60, lv + 200, 260, { p: k.at(k.cue('city', 0.5), 0.6) });
        say(k, 'Ối giời ơi, nhà tôi trôi rồi!', 'help', [120, 300, 520, 110], [460, Math.min(G, lv - 120) - 140]);
        k.text('Thành Phong Châu', 1450, 300, { size: 52, font: 'title', color: '#fff3c4', fx: 'fade', p: k.at('city', 0.6), outline: '#3b2f2a', outlineWidth: 8 });
      },
    },
    {
      say: [
        '{army}Đi cùng Thủy Tinh là cả một đội quân thủy quái: {crab}cua kẹp, {fish}cá húc, {snake}thuồng luồng quấn.',
        { v: 'thuy', text: '{cmd}Tiến lên! Trả người yêu cho ta!' },
        '{joke}Một cuộc chiến giành người yêu, mà quân số lên tới… hàng vạn con cá.',
      ],
      sfx: [['drumroll', 'army', 0.4], ['bonk', 'crab', 0.5], ['boing', 'fish', 0.5], ['whoosh', 'snake', 0.6], ['boom', 'cmd', 0.5], ['wahwah', 'joke', 0.35]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.backdrop('night', { ground: G });
        k.water(560, { amp: 12 });
        k.char(1500, 760, 420, { ...THUY, face: k.t > k.cue('cmd') ? 'shout' : 'smug', pose: k.t > k.cue('cmd') ? 'point' : 'fight', shadow: false, flip: true });
        for (let i = 0; i < 5; i++) k.prop('crab', 220 + i * 150, 690 + Math.sin(k.gt * 3 + i) * 10, 110, { p: k.at(k.cue('crab', i * 0.12), 0.4) });
        for (let i = 0; i < 6; i++) k.prop('fish', 180 + i * 170 + Math.sin(k.gt * 2 + i) * 20, 840 + (i % 2) * 70, 120, { p: k.at(k.cue('fish', i * 0.1), 0.4), flip: true });
        k.prop('serpent', 760 + Math.sin(k.gt) * 40, 980, 340, { p: k.at('snake', 0.6), flip: true });
        say(k, 'Tiến lên! Trả người yêu cho ta!', 'cmd', [900, 140, 620, 120], [1440, 360]);
        k.text('quân số: hàng vạn con cá', 470, 300, { size: 54, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('joke', 0.5), outline: '#2b211c', outlineWidth: 8 });
      },
    },
    {
      say: [
        'Sơn Tinh không vội. {lift}Chàng bốc từng quả đồi, dời từng dãy núi, dựng thành lũy chặn dòng nước lũ. {race}Nước dâng lên bao nhiêu, đồi núi cao lên bấy nhiêu.',
        '{joke}Nước lên một mét, núi lên một mét. Đúng kiểu… cãi nhau không ai chịu ai.',
      ],
      sfx: [['boom', 'lift', 0.6], ['slideUp', 'race', 0.6], ['slideUp', ['race', 1.5], 0.6], ['boing', 'joke', 0.6]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.backdrop('sunset', { ground: G });
        const r = k.at('race', 8, 'linear');
        const step = (Math.floor(r * 6) + Math.min(1, (r * 6) % 1 * 3)) / 6;
        const lv = 900 - step * 300;
        const mh = 1 + step * 0.5;
        const sz = 420 * mh, top = G - sz * 0.98 + 12;
        k.prop('mountain', 520, G - sz * 0.5, sz, { p: k.at('lift', 0.8) });
        k.prop('mountain', 880, G - 150 * mh, 300 * mh, { p: k.at(k.cue('lift', 0.6), 0.8), fill: '#8fb36b' });
        k.char(560, top, 200, { ...SON, face: 'smug', pose: 'cheer', shadow: false });
        k.char(480, top + 6, 150, { ...MY, face: 'happy', pose: 'wave', shadow: false });
        k.water(lv, { amp: 12 });
        k.char(1420, lv + 40, 360, { ...THUY, face: 'angry', pose: 'fight', shadow: false });
        const ruler = (x, v, c) => { k.line(x, 900, x, v, { width: 8, stroke: c }); };
        ruler(1760, lv, '#2f78c4');
        k.text(`nước +${Math.round(step * 6)} m`, 1700, Math.max(160, lv - 40), { size: 40, font: 'title', color: '#2f78c4', outline: '#fffaf0', outlineWidth: 8, align: 'right' });
        k.text(`núi +${Math.round(step * 6)} m`, 300, 160, { size: 40, font: 'title', color: '#4f8a3f', outline: '#fffaf0', outlineWidth: 8 });
        cap(k, 'Nước lên một mét, núi lên một mét', 'joke');
      },
    },
    {
      say: [
        'Đánh nhau ròng rã mấy tháng trời, {tired}Thủy Tinh đuối sức, đành rút quân về. {but}Nhưng chuyện chưa hết. {yearly}Năm nào cũng vậy, cứ đến mùa mưa, Thủy Tinh lại dâng nước đánh Sơn Tinh.',
        '{ex}Y hệt người yêu cũ: cứ đến mùa là… lại nhắn tin.',
      ],
      sfx: [['wahwah', 'tired', 0.4], ['scratch', 'but', 0.6], ['pop', 'yearly'], ['ding', 'ex', 0.6], ['ding', ['ex', 0.8], 0.6]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.backdrop('day', { ground: G });
        const back = k.at('tired', 2.5, 'inOut');
        k.char(k.lerp(1300, 2200, back), G, 380, { ...THUY, face: 'sad', pose: 'stand', walk: back > 0 && back < 1, flip: true, lean: 0.12 });
        k.sweat(k.lerp(1340, 2240, back), 480, 2, { p: k.at('tired', 0.3) });
        for (let i = 0; i < 4; i++) k.prop('calendar', 300 + i * 230, 360, 170, { p: k.at(k.cue('yearly', i * 0.4), 0.5), text: '7', label: ['NĂM 1', 'NĂM 2', 'NĂM 3', 'NĂM …'][i] });
        k.text('mùa mưa', 640, 520, { size: 46, weight: 600, fx: 'fade', p: k.at(k.cue('yearly', 1.6), 0.5) });
        k.prop('phone', 1500, 520, 260, { p: k.at('ex', 0.5), rotate: -0.1 });
        k.bubble(1260, 220, 480, 110, 1480, 410, { p: k.at(k.cue('ex', 0.5), 0.4), text: 'Anh lại đến nè 🌧️', size: 40 });
      },
    },

    {
      say: [
        'Nếu thời đó có mạng xã hội, {fb}chắc trang cá nhân của hai vị sẽ như thế này.',
        { v: 'thuy', text: '{post1}Đang cảm thấy tức giận, cùng với… Sơn Tinh.' },
        { v: 'son', text: '{post2}Vừa nâng cấp nhà lên núi. Nước lên bao nhiêu cũng được.' },
        '{my}Còn Mỵ Nương thì đổi trạng thái thành: {status}"Phức tạp".',
      ],
      sfx: [['click', 'fb', 0.8], ['ding', 'post1', 0.5], ['ding', 'post2', 0.5], ['boing', 'status', 0.6]],
      draw(k) {
        chap(k, 1, 'Show kén rể đầu tiên');
        k.ctx.fillStyle = '#e9edf3'; k.ctx.fillRect(0, 0, k.W, k.H);
        const post = (y, name, color, text, cue, preset) => {
          const p = k.at(cue, 0.5);
          if (p <= 0) return;
          k.group({ x: 0, y: (1 - p) * 40, a: p }, () => {
            k.rect(360, y, 1200, 220, { fill: '#ffffff', width: 3 });
            k.char(470, y + 200, 160, { ...preset, face: 'smug', pose: 'stand', shadow: false });
            k.text(name, 580, y + 55, { size: 44, font: 'title', align: 'left', color });
            k.text(text, 580, y + 130, { size: 40, weight: 500, align: 'left', maxWidth: 940 });
          });
        };
        k.text('Facebook Văn Lang', 960, 90, { size: 56, font: 'title', color: '#3b5998', fx: 'fade', p: k.at('fb', 0.5) });
        post(160, 'Thủy Tinh', '#2f78c4', 'Đang cảm thấy tức giận cùng với… Sơn Tinh 😡', 'post1', THUY);
        post(420, 'Sơn Tinh', '#4f8a3f', 'Vừa nâng cấp nhà lên núi. Nước lên bao nhiêu cũng được 😎', 'post2', SON);
        post(680, 'Mỵ Nương', '#ef6f9a', 'Tình trạng mối quan hệ: Phức tạp', 'my', MY);
      },
    },

    // ---------------- Chương 2: Thủy Tinh là ai? ----------------
    {
      chapter: 'Giải mã: Thủy Tinh là ai?',
      say: 'Giờ hãy bỏ lớp truyện tình ra. {real}Còn lại một hiện tượng rất thật, mà người miền Bắc nào cũng biết: {name}lũ sông Hồng.',
      sfx: [['scratch', 0.2, 0.5], ['pop', 'real'], ['boom', 'name', 0.5]],
      draw(k) {
        chap(k, 2, 'Giải mã: Thủy Tinh là ai?');
        k.char(560, G - 40, 380, { ...THUY, face: 'calm', pose: 'stand', p: 1 - k.at('real', 0.6), shadow: false });
        k.water(k.lerp(1080, 640, k.at('real', 2, 'inOut')), { color: '#b0703c', amp: 12 });
        k.text('LŨ SÔNG HỒNG', 960, 330, { size: 120, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('name', 0.6), outline: '#fffaf0', outlineWidth: 16 });
        k.text('= Thủy Tinh', 960, 460, { size: 60, weight: 600, fx: 'fade', p: k.at(k.cue('name', 1), 0.6), color: '#2f78c4', outline: '#fffaf0', outlineWidth: 8 });
      },
    },
    {
      say: 'Sông Hồng dài hơn một nghìn cây số, {src}bắt nguồn từ Vân Nam, Trung Quốc, {delta}chảy qua miền Bắc rồi đổ ra biển. {season}Mỗi mùa mưa, nước từ thượng nguồn dồn về, cuồn cuộn y như Thủy Tinh đến đòi người.',
      sfx: [['pop', 'src'], ['whoosh', 'delta', 0.6], ['boom', 'season', 0.5]],
      draw(k) {
        chap(k, 2, 'Giải mã: Thủy Tinh là ai?');
        const river = [[280, 150], [520, 300], [700, 420], [880, 560], [1080, 700], [1320, 820], [1560, 930]];
        k.curve([[120, 120], [500, 160], [900, 120], [1300, 190]], { p: k.at('src', 0.8), width: 3, stroke: '#9a8f86' });
        k.text('Vân Nam (Trung Quốc)', 420, 90, { size: 40, weight: 600, fx: 'fade', p: k.at('src', 0.6) });
        k.text('Việt Nam', 520, 560, { size: 46, font: 'title', color: '#6b5f55', fx: 'fade', p: k.at(k.cue('src', 0.6), 0.6) });
        const pr = k.at('delta', 2.2, 'linear');
        k.curve(river, { p: pr, width: 22, stroke: '#b0703c' });
        k.ctx.save(); k.ctx.setLineDash([24, 30]); k.ctx.lineDashOffset = -k.gt * 60; k.ctx.globalAlpha *= pr;
        k.ctx.strokeStyle = '#e8c9a0'; k.ctx.lineWidth = 5; k.ctx.beginPath(); river.forEach(([x, y], i) => k.ctx[i ? 'lineTo' : 'moveTo'](x, y)); k.ctx.stroke(); k.ctx.restore();
        k.dot(1080, 700, 14, '#3b2f2a', k.at(k.cue('delta', 1), 0.4));
        k.text('Hà Nội', 1180, 680, { size: 44, font: 'title', align: 'left', fx: 'fade', p: k.at(k.cue('delta', 1.2), 0.5) });
        k.water(k.lerp(1200, 960, k.at(k.cue('delta', 1.6), 1)), { color: '#5b9bd5', amp: 6 });
        k.text('Biển Đông', 1650, 1010, { size: 44, font: 'title', color: '#fff', fx: 'fade', p: k.at(k.cue('delta', 2), 0.5) });
        k.text('> 1.000 km', 900, 420, { size: 70, font: 'title', color: '#b5482c', fx: 'pop', p: k.at(k.cue('delta', 2.2), 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.prop('storm', 300, 300, 260, { p: k.at('season', 0.5), rain: 1 });
        k.prop('storm', 560, 230, 220, { p: k.at(k.cue('season', 0.3), 0.5), rain: 1 });
        k.text('(sơ đồ, không theo tỉ lệ)', 1720, 60, { size: 28, color: '#9a8f86', fx: 'fade', p: k.at(1, 0.5) });
      },
    },
    {
      say: 'Còn vì sao gọi là sông Hồng? {silt}Vì nước sông đỏ quạch phù sa. {twist}Và đây là cú lật: chính lũ và phù sa ấy {delta}đã bồi đắp nên cả đồng bằng Bắc Bộ. {rice}Nói cách khác, không có Thủy Tinh, chưa chắc đã có… ruộng lúa.',
      sfx: [['pop', 'silt'], ['scratch', 'twist', 0.6], ['sparkle', 'delta', 0.5], ['boing', 'rice', 0.5]],
      draw(k) {
        chap(k, 2, 'Giải mã: Thủy Tinh là ai?');
        // cốc nước phù sa
        const pg = k.at('silt', 0.6);
        k.group({ x: 420, y: 560, s: k.ease.back(pg) }, () => {
          k.ctx.save(); k.ctx.beginPath(); k.ctx.moveTo(-110, -170); k.ctx.lineTo(-90, 170); k.ctx.lineTo(90, 170); k.ctx.lineTo(110, -170); k.ctx.closePath();
          k.ctx.fillStyle = 'rgba(214,236,250,0.5)'; k.ctx.fill(); k.ctx.clip();
          k.ctx.fillStyle = '#b0703c'; k.ctx.fillRect(-120, -110, 240, 300);
          k.ctx.fillStyle = '#8a5428'; k.ctx.fillRect(-120, 110, 240, 80);
          k.ctx.restore();
          k.poly([[-110, -170], [-90, 170], [90, 170], [110, -170]], { fill: 'rgba(0,0,0,0)', width: 5 });
        });
        k.text('phù sa', 420, 800, { size: 56, font: 'title', color: '#8a5428', fx: 'pop', p: k.at(k.cue('silt', 0.6), 0.5) });
        k.burst(960, 300, 90, 'CÚ LẬT!', { p: k.at('twist', 0.5), size: 44 });
        k.rect(820, 760, 1160, 380, { fill: '#9cc97a', stroke: 'none', p: k.at('delta', 0.6) });
        k.water(k.lerp(1200, 1000, k.at('delta', 1)), { color: '#b0703c', amp: 6, alpha: 0.5 });
        rice(k, 900, 840, 13, 2, k.at('delta', 2));
        k.text('đồng bằng Bắc Bộ', 1260, 690, { size: 52, font: 'title', color: '#3f6f2a', fx: 'fade', p: k.at(k.cue('delta', 1), 0.6), outline: '#fffaf0', outlineWidth: 10 });
        k.char(1760, 760, 200, { ...VIL('#9c6b3f', { hat: 'non' }), face: 'happy', pose: 'cheer', p: k.at('rice', 0.5) });
      },
    },
    {
      say: '{land}Nhớ lại danh sách sính lễ: cơm nếp, bánh chưng, voi, gà, ngựa. {farm}Toàn là sản vật của cư dân trồng lúa. {side}Người kể chuyện đứng về phe nào, chắc bạn đoán ra rồi: {son}phe những người sống trên đất, và luôn phải chống lại nước.',
      sfx: [['pop', 'land'], ['pop', 'farm'], ['drumroll', 'side', 0.4], ['ding', 'son', 0.5]],
      draw(k) {
        chap(k, 2, 'Giải mã: Thủy Tinh là ai?');
        k.backdrop('day', { ground: G });
        [['xoi', 260, 160], ['banhchung', 470, 150], ['elephant', 720, 220], ['rooster', 960, 170], ['horse', 1180, 210]].forEach(([n, x, sz], i) => k.prop(n, x, 380, sz, { p: k.at(k.cue('land', i * 0.3), 0.5), tusks: 9, spurs: 9, manes: 9, mane: '#e4572e' }));
        k.text('= sản vật nhà nông', 760, 560, { size: 62, font: 'title', color: '#4f8a3f', fx: 'pop', p: k.at('farm', 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.char(1580, G, 400, { ...SON, face: 'smug', pose: 'hips', p: k.at('son', 0.6) });
        k.text('Phe "trên cạn"', 1580, 380, { size: 50, font: 'title', fx: 'fade', p: k.at(k.cue('son', 0.5), 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.prop('stilthouse', 420, 780, 220, { p: k.at('side', 0.6) });
        k.char(700, G, 240, { ...VIL('#b5482c'), face: 'happy', pose: 'wave', p: k.at(k.cue('side', 0.4), 0.6) });
      },
    },

    {
      say: 'Vậy còn Mỵ Nương? {try}Nếu Thủy Tinh là lũ, Sơn Tinh là người chống lũ, thì thử hình dung xem: {land}người con gái mà cả hai cùng muốn giữ, {plain}giống như chính vùng đồng bằng màu mỡ. {note}Đây chỉ là một cách hiểu, nhưng nghe cũng… hợp lý phết.',
      sfx: [['pop', 'try'], ['sparkle', 'land', 0.5], ['ding', 'plain', 0.5], ['boing', 'note', 0.5]],
      draw(k) {
        chap(k, 2, 'Giải mã: Thủy Tinh là ai?');
        k.backdrop('day', { ground: G });
        const pm = k.at('plain', 1.4);
        k.rect(-20, 700, 1960, 400, { fill: '#9cc97a', stroke: 'none', alpha: pm });
        rice(k, 560, 800, 11, 1, pm);
        k.char(960, G - 20, 380, { ...MY, face: 'happy', pose: 'wave', p: k.at('land', 0.5), alpha: 1 - pm * 0.4 });
        k.char(330, G, 360, { ...SON, face: 'smug', pose: 'point', p: k.at('try', 0.5) });
        k.char(1590, G, 360, { ...THUY, face: 'angry', pose: 'point', flip: true, p: k.at(k.cue('try', 0.4), 0.5) });
        k.text('= đồng bằng màu mỡ?', 960, 260, { size: 70, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('plain', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.text('(một cách hiểu)', 960, 350, { size: 40, weight: 600, color: '#6b5f55', fx: 'fade', p: k.at('note', 0.5), outline: '#fffaf0', outlineWidth: 8 });
      },
    },

    {
      say: 'Thú vị là, {south}ở miền Tây Nam Bộ, người ta lại mong "Thủy Tinh" ghé thăm. {flood}Mỗi năm, mùa nước nổi tràn về đồng, mang theo phù sa và cá tôm. {live}Người miền Tây không đánh nhau với nước, mà học cách sống chung với lũ: nhà sàn, xuồng ghe, và đánh bắt theo mùa.',
      sfx: [['pop', 'south'], ['whoosh', 'flood', 0.5], ['sparkle', 'live', 0.5]],
      draw(k) {
        chap(k, 2, 'Giải mã: Thủy Tinh là ai?');
        k.backdrop('day', { ground: G });
        k.prop('tree', 220, 640, 380, { fill: '#4f9a3f' });
        k.prop('stilthouse', 1450, 640, 380, {});
        k.water(k.lerp(1000, 800, k.at('flood', 3, 'inOut')), { color: '#c08a4a', amp: 6 });
        k.prop('boat', 860, 790, 300, { p: k.at('live', 0.5), bob: 6 });
        k.char(840, 760, 160, { ...VIL('#2e86de', { hat: 'non' }), face: 'happy', pose: 'cheer', p: k.at('live', 0.5), shadow: false });
        for (let i = 0; i < 4; i++) k.prop('fish', 300 + i * 340 + Math.sin(k.gt * 2 + i) * 30, 940 + (i % 2) * 40, 100, { p: k.at(k.cue('flood', 1 + i * 0.3), 0.4) });
        k.text('Mùa nước nổi miền Tây', 960, 200, { size: 72, font: 'title', color: '#2f6a8a', p: k.at('south', 1.2, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
        k.text('phù sa + cá tôm', 960, 300, { size: 50, weight: 600, fx: 'fade', p: k.at(k.cue('flood', 1.5), 0.5), outline: '#fffaf0', outlineWidth: 8 });
      },
    },

    // ---------------- Chương 3: Sơn Tinh là ai? ----------------
    {
      chapter: 'Giải mã: Sơn Tinh là ai?',
      say: '{who}Còn Sơn Tinh, hay Tản Viên Sơn Thánh, {bavi}là vị thần của núi Ba Vì, phía tây Hà Nội, đỉnh cao nhất chừng một nghìn ba trăm mét. {four}Nhớ tập trước không? Ông chính là một trong Tứ bất tử, cùng hội với Thánh Gióng.',
      sfx: [['pop', 'who'], ['slideUp', 'bavi', 0.5], ['sparkle', 'four', 0.6]],
      draw(k) {
        chap(k, 3, 'Giải mã: Sơn Tinh là ai?');
        k.backdrop('day', { ground: G });
        k.prop('mountain', 1250, 520, 820, { p: k.at('bavi', 1), snow: false });
        k.prop('cloud', 1100, 260, 200, { p: k.at(k.cue('bavi', 0.5), 0.6), bob: 4 });
        k.text('Núi Ba Vì', 1250, 140, { size: 64, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at(k.cue('bavi', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.text('~1.300 m', 1600, 330, { size: 52, font: 'title', fx: 'fade', p: k.at(k.cue('bavi', 2.4), 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.char(460, G, 440, { ...SON, face: 'smug', pose: 'wave', p: k.at('who', 0.6) });
        k.group({ x: 860, y: 260, s: k.ease.back(k.at('four', 0.5)) }, () => {
          k.circle(0, 0, 120, { fill: '#fffaf0', width: 5, p: k.at('four', 0.5) > 0 ? 1 : 0 });
          k.text('Tứ bất tử', 0, -30, { size: 40, font: 'title', color: '#b5482c' });
          k.text('+ Thánh Gióng', 0, 30, { size: 34, weight: 600 });
        });
      },
    },
    {
      say: 'Khi lũ về, {high}người Việt cổ không có phép thuật. Họ chạy lên vùng cao, {stilt}làm nhà sàn, {earth}đắp đất ngăn nước. {meaning}Hình ảnh Sơn Tinh nâng núi, chính là hình ảnh của họ: nước lên đến đâu, người đắp cao đến đó.',
      sfx: [['whoosh', 'high', 0.5], ['pop', 'stilt'], ['bonk', 'earth', 0.4], ['bonk', ['earth', 0.6], 0.4], ['ding', 'meaning', 0.5]],
      draw(k) {
        chap(k, 3, 'Giải mã: Sơn Tinh là ai?');
        k.backdrop('day', { ground: G });
        k.prop('mountain', 260, 640, 480, {});
        k.prop('stilthouse', 820, 690, 300, { p: k.at('stilt', 0.6) });
        const pe = k.at('earth', 3);
        k.prop('dike', 1350, 860 - pe * 60, 420, { p: k.at('earth', 0.5), w: 1 });
        k.water(k.lerp(1060, 860, k.at('high', 4, 'inOut')), { amp: 8 });
        for (let i = 0; i < 3; i++) k.char(1200 + i * 150, 830 - pe * 60 - 30, 180, { ...VIL(['#9c6b3f', '#b5482c', '#6b4a2d'][i]), face: 'angry', pose: i === 1 ? 'cheer' : 'hold', p: k.at(k.cue('earth', i * 0.3), 0.5), bob: 3, shadow: false });
        k.char(380, 390, 160, { ...VIL('#9c6b3f'), face: 'shock', pose: 'shout', p: k.at('high', 0.5), shadow: false });
        cap(k, 'Nước lên đến đâu, người đắp cao đến đó', 'meaning');
      },
    },
    {
      say: '{drum}Trên mặt trống đồng Đông Sơn, {house}người xưa còn khắc hình nhà sàn, {boat}hình thuyền, {people}và những người đội mũ lông chim. {life}Một cuộc sống gắn chặt với sông nước: vừa nhờ nước mà sống, vừa phải chống chọi với nước mà tồn tại.',
      sfx: [['boom', 'drum', 0.4], ['pop', 'house'], ['pop', 'boat'], ['pop', 'people'], ['sparkle', 'life', 0.4]],
      draw(k) {
        chap(k, 3, 'Giải mã: Sơn Tinh là ai?');
        k.prop('drum', 420, 560, 480, { p: k.at('drum', 0.6) });
        k.text('Trống đồng Đông Sơn', 420, 860, { size: 52, font: 'title', p: k.at(k.cue('drum', 0.4), 1, 'linear') });
        k.prop('stilthouse', 1020, 330, 260, { p: k.at('house', 0.5) });
        k.prop('boat', 1500, 360, 320, { p: k.at('boat', 0.5) });
        k.char(1400, 330, 120, { ...VIL('#9c6b3f'), pose: 'hold', p: k.at(k.cue('boat', 0.3), 0.5), shadow: false });
        k.char(1560, 330, 120, { ...VIL('#b5482c'), pose: 'hold', p: k.at(k.cue('boat', 0.5), 0.5), shadow: false });
        for (let i = 0; i < 4; i++) k.char(1000 + i * 190, 820, 230, { ...VIL(['#9c6b3f', '#b5482c', '#6b4a2d', '#2e86de'][i]), face: 'happy', pose: i % 2 ? 'cheer' : 'wave', p: k.at(k.cue('people', i * 0.2), 0.5), bob: 3 });
        k.water(1000, { amp: 6, alpha: k.at('life', 0.8) * 0.9 });
      },
    },
    {
      say: 'Và người Việt đắp đê thật. {ly}Sử sách ghi năm 1108, nhà Lý cho đắp đê Cơ Xá ở kinh thành Thăng Long. {tran}Đến năm 1248, nhà Trần cho đắp đê dọc các con sông, từ đầu nguồn đến tận bờ biển, {office}và đặt hẳn chức quan chuyên trông coi đê điều. {joke}Gần tám trăm năm trước đã có bộ phận quản lý đê. Sơn Tinh mà biết, chắc tự hào lắm.',
      sfx: [['pop', 'ly'], ['pop', 'tran'], ['ding', 'office', 0.5], ['tada', 'joke', 0.4]],
      draw(k) {
        chap(k, 3, 'Giải mã: Sơn Tinh là ai?');
        const y = 560;
        k.arrow(140, y, 1800, y, { p: k.at(0.2, 1), width: 5 });
        k.prop('scroll', 420, y - 200, 180, { p: k.at('ly', 0.5) });
        k.text('1108 · nhà Lý', 420, y + 70, { size: 54, font: 'title', color: '#b5482c', p: k.at('ly', 1, 'linear') });
        k.text('đắp đê Cơ Xá', 420, y + 140, { size: 42, weight: 600, fx: 'fade', p: k.at(k.cue('ly', 1.4), 0.5) });
        k.prop('dike', 1000, y - 170, 280, { p: k.at('tran', 0.5), w: 1.4 });
        k.text('1248 · nhà Trần', 1000, y + 70, { size: 54, font: 'title', color: '#b5482c', p: k.at('tran', 1, 'linear') });
        k.text('đê dọc sông, đầu nguồn → biển', 1000, y + 140, { size: 40, weight: 600, fx: 'fade', p: k.at(k.cue('tran', 1.6), 0.5) });
        k.char(1550, y - 30, 250, { body: 'man', outfit: 'robe', color: '#8e5bd3', color2: '#f6c344', hair: 'short', hat: 'band', face: 'smug', pose: 'present', p: k.at('office', 0.6), shadow: false });
        k.text('Quan Hà đê sứ', 1550, y + 70, { size: 46, font: 'title', fx: 'fade', p: k.at(k.cue('office', 0.6), 0.5) });
        k.burst(1000, 930, 90, 'BỘ PHẬN QUẢN LÝ ĐÊ', { p: k.at('joke', 0.5), size: 30, fill: '#c7f0c0', stroke: '#3f8f3a', color: '#2f6a2c' });
      },
    },
    {
      say: '{still}Cuộc chiến ấy chưa bao giờ dừng. {y1971}Trận lũ lịch sử năm 1971, những mùa mưa bão gần đây, {today}và hàng nghìn cây số đê vẫn đang được gìn giữ từng ngày. {serious}Mỗi năm, Thủy Tinh vẫn quay lại. Và mỗi năm, những Sơn Tinh ngoài đời, vẫn đứng trên đê.',
      sfx: [['drumroll', 'still', 0.3], ['whoosh', 'y1971', 0.4], ['ding', 'serious', 0.4]],
      draw(k) {
        chap(k, 3, 'Giải mã: Sơn Tinh là ai?');
        k.backdrop('sunset', { ground: G });
        k.prop('dike', 960, 840, 760, { w: 2.2 });
        k.water(k.lerp(1080, 900, k.at('y1971', 3, 'inOut')), { color: '#b0703c', amp: 10 });
        k.text('1971', 400, 300, { size: 110, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('y1971', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.text('lũ lịch sử', 400, 400, { size: 46, weight: 600, fx: 'fade', p: k.at(k.cue('y1971', 0.6), 0.5), outline: '#fffaf0', outlineWidth: 8 });
        for (let i = 0; i < 5; i++) k.char(700 + i * 130, 775, 170, { body: i % 2 ? 'woman' : 'man', outfit: i % 2 ? 'dress' : 'tunic', color: ['#e4572e', '#2e86de', '#f6c344', '#3bb273', '#8e5bd3'][i], color2: '#fffaf0', hair: i % 2 ? 'bun' : 'short', hat: i === 2 ? 'non' : undefined, face: 'calm', pose: i === 2 ? 'point' : 'hold', p: k.at(k.cue('today', i * 0.25), 0.6), shadow: false });
        k.text('những Sơn Tinh ngoài đời', 1480, 300, { size: 52, font: 'title', color: '#3f6f2a', p: k.at('serious', 1.6, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    {
      say: 'Còn một câu hỏi: {why}vì sao năm nào Thủy Tinh cũng thua? {season}Vì Thủy Tinh chỉ đến theo mùa. {people}Còn Sơn Tinh, tức là con người, thì kiên trì cả năm: {work}đắp đê, trồng rừng, dựng nhà cao, đào kênh thoát nước. {win}Thắng lũ không phải nhờ phép thuật, mà nhờ không bao giờ ngừng chuẩn bị.',
      sfx: [['drumroll', 'why', 0.4], ['pop', 'season'], ['pop', 'people'], ['pop', 'work'], ['tada', 'win', 0.4]],
      draw(k) {
        chap(k, 3, 'Giải mã: Sơn Tinh là ai?');
        k.backdrop('day', { ground: G });
        for (let i = 0; i < 4; i++) k.prop('calendar', 300 + i * 200, 300, 150, { p: k.at(k.cue('season', i * 0.2), 0.4), text: String(7 + i), label: 'MÙA MƯA' });
        k.char(1500, G, 360, { ...THUY, face: 'sad', pose: 'shrug', p: k.at('season', 0.5) });
        const jobs = [['dike', 'đắp đê'], ['tree', 'trồng rừng'], ['stilthouse', 'nhà cao'], ['boat', 'kênh, thuyền']];
        jobs.forEach(([pr, t], i) => {
          const c = k.cue('work', i * 0.6);
          k.prop(pr, 260 + i * 270, 680, 200, { p: k.at(c, 0.5) });
          k.text(t, 260 + i * 270, 820, { size: 40, font: 'title', p: k.at(c, 0.6, 'linear'), outline: '#fffaf0', outlineWidth: 8 });
        });
        cap(k, 'Thắng lũ nhờ không bao giờ ngừng chuẩn bị', 'win');
      },
    },

    {
      say: 'À, một chi tiết nhỏ: {banh}bánh chưng trong danh sách sính lễ cũng có truyền thuyết riêng. {lang}Tương truyền, nó do Lang Liêu, con trai vua Hùng thứ sáu, làm ra để dâng vua cha. {next}Một chiếc bánh vuông tượng trưng cho đất. Chuyện ấy, xin hẹn một tập khác.',
      sfx: [['pop', 'banh'], ['sparkle', 'lang', 0.5], ['ding', 'next', 0.5]],
      draw(k) {
        chap(k, 3, 'Giải mã: Sơn Tinh là ai?');
        k.backdrop('dawn', { ground: G });
        k.prop('banhchung', 600, 600, 360, { p: k.at('banh', 0.6) });
        k.char(1150, G, 360, { body: 'man', outfit: 'tunic', color: '#3bb273', color2: '#f6c344', hair: 'topknot', hat: 'band', face: 'happy', pose: 'present', p: k.at('lang', 0.6) });
        k.text('Lang Liêu', 1150, 430, { size: 60, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at(k.cue('lang', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.char(1550, G, 340, { ...KING, face: 'happy', pose: 'stand', p: k.at(k.cue('lang', 1), 0.6) });
        k.text('bánh vuông = đất', 600, 340, { size: 52, font: 'title', fx: 'fade', p: k.at('next', 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.text('(hẹn một tập khác!)', 960, 160, { size: 48, weight: 600, fx: 'fade', p: k.at(k.cue('next', 2), 0.5), outline: '#fffaf0', outlineWidth: 8 });
      },
    },

    // ---------------- Kết luận ----------------
    {
      chapter: 'Vậy vì cô gái hay vì con đê?',
      say: 'Vậy Sơn Tinh, Thủy Tinh đánh nhau vì cô gái, hay vì con đê? {both}Đáp án: vì cả hai. {wrap}Chuyện tình là lớp vỏ để con cháu dễ nhớ. {core}Còn bên trong là kinh nghiệm sống còn suốt hàng nghìn năm: sống chung với lũ, và không bao giờ bỏ cuộc.',
      sfx: [['drumroll', 0.4, 0.4], ['tada', 'both', 0.5], ['pop', 'wrap'], ['sparkle', 'core', 0.5]],
      draw(k) {
        chap(k, 4, 'Vậy vì cô gái hay vì con đê?');
        k.backdrop('dawn', { ground: G });
        k.prop('heart', 620, 420, 200, { p: k.at('both', 0.5) });
        k.prop('dike', 1300, 470, 340, { p: k.at(k.cue('both', 0.4), 0.5), w: 1.2 });
        k.text('+', 960, 440, { size: 140, font: 'title', fx: 'pop', p: k.at(k.cue('both', 0.6), 0.4), color: '#b5482c' });
        k.text('VÌ CẢ HAI!', 960, 190, { size: 100, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('both', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.text('chuyện tình = lớp vỏ', 620, 600, { size: 44, weight: 600, fx: 'fade', p: k.at('wrap', 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.text('chống lũ = cốt lõi', 1300, 600, { size: 44, weight: 600, fx: 'fade', p: k.at('core', 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.char(200, G, 240, { ...SON, face: 'happy', pose: 'wave', p: k.at('core', 0.6) });
        k.char(360, G, 200, { ...MY, face: 'happy', pose: 'stand', p: k.at(k.cue('core', 0.3), 0.6) });
        k.char(1720, G, 240, { ...THUY, face: 'smug', pose: 'shrug', p: k.at(k.cue('core', 0.6), 0.6) });
      },
    },
    {
      chapter: 'Tóm tắt',
      say: 'Tóm lại: {a}Thủy Tinh là lũ sông Hồng, {b}Sơn Tinh là người Việt cổ chống lũ, {c}và con đê là "sính lễ" mà người Việt đã đắp suốt gần một nghìn năm.',
      sfx: [['pop', 'a'], ['pop', 'b'], ['pop', 'c']],
      draw(k) {
        k.text('Tóm tắt', 960, 130, { size: 84, font: 'title', p: k.at(0.1, 0.8, 'linear') });
        const rows = [['a', 'Thủy Tinh = lũ sông Hồng', '#2f78c4', THUY], ['b', 'Sơn Tinh = người Việt cổ chống lũ', '#4f8a3f', SON], ['c', 'Con đê = "sính lễ" gần 1.000 năm', '#b08a5a', null]];
        rows.forEach(([c, t, col, ch], i) => {
          const y = 330 + i * 220;
          if (ch) k.char(330, y + 100, 200, { ...ch, face: 'happy', pose: 'stand', p: k.at(c, 0.5), shadow: false });
          else k.prop('dike', 330, y + 10, 200, { p: k.at(c, 0.5) });
          k.text(t, 480, y, { size: 58, font: 'title', align: 'left', color: col, p: k.at(c, 1.2, 'linear') });
        });
      },
    },
    subscribeScene({
      say: 'Tập sau: {q}một trăm cái trứng nở ra một trăm người con. Mẹ Âu Cơ chăm kiểu gì cho xuể? Đoán thử trong phần bình luận nhé. {sub}Và đăng ký Vẽ Là Hiểu, để cùng soi truyền thuyết theo cách vui nhất!',
      question: '100 cái trứng: mẹ Âu Cơ chăm kiểu gì?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
