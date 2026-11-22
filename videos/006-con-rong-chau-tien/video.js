// Tập 3 series Hùng Vương — Con Rồng Cháu Tiên: 100 cái trứng nói gì về người Việt? (hoạt hình phẳng, tếu táo)
// Đối chiếu: truyện Con Rồng cháu Tiên / Hồng Bàng thị truyện (Lĩnh Nam chích quái; bản kể sách Ngữ văn 6):
//   Lạc Long Quân con thần Long Nữ, mình rồng, ở dưới nước; diệt Ngư Tinh, Hồ Tinh, Mộc Tinh; dạy dân trồng trọt, chăn nuôi, ăn ở.
//   Âu Cơ dòng họ Thần Nông, ở núi cao phương Bắc, tìm đến vùng Lạc Việt vì nghe nhiều hoa thơm cỏ lạ.
//   Bọc trăm trứng → trăm con trai; "không cần bú mớm mà tự lớn lên như thổi". Lời than của Âu Cơ và lời Lạc Long Quân theo sách Ngữ văn.
//   Con trưởng làm vua, hiệu Hùng Vương, đóng đô Phong Châu, nước Văn Lang; con trai vua gọi là lang, con gái gọi là mị nương.
//   Ngư Tinh: Long Quân nung khối sắt ném vào miệng cá (Lĩnh Nam chích quái). Hồ Tinh: cáo chín đuôi, hang sụt thành đầm → Hồ Tây (Đầm Xác Cáo).
// Đại Việt sử ký toàn thư (Ngô Sĩ Liên, 1479), Ngoại kỷ: Hồng Bàng thị 2.622 năm; chuyện vẽ mình để giao long (thuồng luồng) không hại → tập sau.
// Khảo cổ: Phùng Nguyên (~4.000 năm trước, Phú Thọ) → Đồng Đậu → Gò Mun → Đông Sơn; trống đồng Ngọc Lũ: sao nhiều cánh, chim mỏ dài, người đội lông chim, thuyền.
// Đồi núi ~3/4 diện tích; bờ biển >3.260 km. Giỗ Tổ 10/3 âm lịch; UNESCO ghi danh tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ năm 2012.
import { C } from '/engine/kit.js';
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import * as thumbs from '/videos/006-con-rong-chau-tien/thumbs.js';

const G = 880; // mặt đất
const LLQ = { body: 'big', outfit: 'robe', color: '#1f7a8c', color2: '#f6c344', hair: 'long', hairColor: '#1d3f66', hat: 'crown', cape: '#155a6a' };
const AUCO = { body: 'woman', outfit: 'dress', color: '#fdf0f3', color2: '#ef6f9a', hair: 'long', hat: 'flower' };
const KING = { body: 'man', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'kingfeather', beard: true, hair: 'short', cape: '#b5482c' };
const MY = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'long', hat: 'flower' };
const VIL = (c, extra = {}) => ({ body: 'man', outfit: 'bare', color: c, color2: '#f6c344', hair: 'short', hat: 'feather', ...extra });
const KC = ['#e4572e', '#2e86de', '#f6c344', '#3bb273', '#8e5bd3', '#ef6f9a', '#f08a24', '#1f7a8c'];
const KID = (i, extra = {}) => ({ body: 'kid', outfit: 'tunic', color: KC[i % KC.length], color2: '#fffaf0', hair: 'topknot', face: 'happy', ...extra });

function chap(k, n, title) {
  k.text(`Chương ${n} · ${title}`, 60, 56, { size: 30, align: 'left', color: '#6b5f55', fx: 'fade', p: k.at(0, 0.6), outline: '#fffaf0', outlineWidth: 8 });
}
function cap(k, text, cue, o = {}) {
  const y = o.y ?? 995;
  const b = k.text(text, o.x ?? k.W / 2, y, { size: o.size ?? 54, font: 'title', p: k.at(cue, o.dur ?? 1.2, 'linear'), maxWidth: 1760, color: o.color ?? '#3b2f2a', outline: '#fffaf0', outlineWidth: 12 });
  if (o.hl) k.highlight((o.x ?? k.W / 2) - b.w / 2 - 16, y - 34, b.w + 32, 68, { p: k.at(k.cue(cue, (o.dur ?? 1.2) + 0.2), 0.5), color: o.hl });
}
function say(k, text, c, box, tail, o = {}) {
  k.bubble(box[0], box[1], box[2], box[3], tail[0], tail[1], { p: k.at(c, 0.4), text, size: o.size ?? 44, seed: o.seed, think: o.think });
}
function badge(k, x, y, title, sub, color, p) {
  if (p <= 0) return;
  const w = Math.max(520, title.length * 36, sub.length * 15 + 60);
  k.group({ x, y, s: k.ease.back(Math.min(1, p)) }, () => {
    k.rect(-w / 2, -60, w, 120, { fill: color, width: 4 });
    k.text(title, 0, -14, { size: 52, font: 'title', color: C.white, outline: '#3b2f2a', outlineWidth: 8 });
    k.text(sub, 0, 34, { size: 26, color: C.white, weight: 600 });
  });
}
// Con dấu đỏ nghiêng.
function stamp(k, x, y, text, p, o = {}) {
  const s = Math.max(0.01, k.ease.back(Math.min(1, p)) * (1 + 0.6 * (1 - Math.min(1, p))));
  k.group({ x, y, s, r: o.r ?? -0.12, a: Math.min(1, p * 3) }, () => {
    const w = o.w ?? 420;
    k.rect(-w / 2, -60, w, 120, { stroke: o.color ?? '#c0392b', width: 8, fillStyle: 'solid', seed: 77 });
    k.text(text, 0, 4, { size: o.size ?? 60, font: 'title', color: o.color ?? '#c0392b' });
  });
}
// Lệnh truy nã yêu quái.
function wanted(k, x, y, name, p, art) {
  k.group({ x, y, s: Math.max(0.01, k.ease.back(Math.min(1, p))), r: ((x / 540) % 2 - 1) * 0.04, a: Math.min(1, p * 3) }, () => {
    k.rect(-190, -250, 380, 500, { fill: '#f6e7c1', width: 5, seed: Math.round(x) });
    k.text('TRUY NÃ', 0, -190, { size: 64, font: 'title', color: '#b5482c' });
    art();
    k.text(name, 0, 195, { size: 54, font: 'title' });
  });
}
function flower(k, x, y, s, c, p, seed) {
  k.group({ x, y, s: Math.max(0.01, s * k.ease.back(Math.min(1, p))), a: Math.min(1, p * 3) }, () => {
    for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; k.circle(Math.cos(a) * 13, Math.sin(a) * 13, 10, { fill: c, width: 2.5, seed: seed + i }); }
    k.circle(0, 0, 8, { fill: '#f6c344', width: 2.5, seed: seed + 9 });
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
// Bản đồ Việt Nam giản lược (kinh độ, vĩ độ) → px.
const VN = [[102.15, 22.4], [102.9, 22.5], [103.5, 22.6], [104.1, 22.8], [104.8, 22.9], [105.3, 23.35], [106.0, 22.95], [106.7, 22.85], [107.35, 22.0], [107.95, 21.55], [107.3, 21.2], [106.75, 20.85], [106.3, 20.3], [105.95, 19.75], [105.75, 19.05], [106.0, 18.5], [106.45, 17.75], [107.1, 16.95], [108.2, 16.05], [108.8, 15.2], [109.2, 13.9], [109.45, 12.9], [109.2, 12.2], [109.0, 11.55], [108.1, 10.9], [107.1, 10.4], [106.75, 10.0], [106.5, 9.6], [105.8, 9.15], [105.2, 8.6], [104.8, 8.7], [104.9, 9.6], [105.1, 10.0], [104.5, 10.4], [105.1, 10.95], [105.9, 11.2], [106.45, 11.95], [107.55, 12.3], [107.55, 13.6], [107.45, 14.4], [107.45, 14.95], [107.35, 15.45], [107.2, 16.0], [106.6, 16.5], [106.0, 17.3], [105.6, 18.2], [104.8, 18.8], [104.05, 19.2], [104.5, 19.65], [104.85, 20.25], [104.2, 20.85], [103.2, 20.8], [102.9, 21.7]];
const mx = (lon) => 640 + (lon - 102) * 60, my = (lat) => 100 + (23.5 - lat) * 60;

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    title: 'Con Rồng Cháu Tiên: 100 cái trứng nói gì về người Việt?',
    description: `Con Rồng Cháu Tiên — Lạc Long Quân, Âu Cơ và một bọc trăm trứng. Vì sao người Việt gọi nhau là "đồng bào", năm mươi con lên núi năm mươi con xuống biển nghĩa là gì, và khảo cổ học nói gì về nước Văn Lang?
Vẽ Là Hiểu giải mã truyền thuyết con Rồng cháu Tiên: từ Lĩnh Nam chích quái, Đại Việt sử ký toàn thư đến văn hoá Phùng Nguyên, Đông Sơn và trống đồng Ngọc Lũ.`,
    footer: `📚 Nguồn tham khảo: truyện Con Rồng cháu Tiên (Lĩnh Nam chích quái – Hồng Bàng thị truyện; bản kể sách Ngữ văn 6), Đại Việt sử ký toàn thư – Ngoại kỷ (1479), các văn hoá khảo cổ Phùng Nguyên – Đồng Đậu – Gò Mun – Đông Sơn, trống đồng Ngọc Lũ, UNESCO (2012).
🔔 Đăng ký Vẽ Là Hiểu để xem trọn series Truyền thuyết Hùng Vương: Thánh Gióng → Sơn Tinh – Thủy Tinh → Con Rồng Cháu Tiên → …
💬 Tập sau: thuồng luồng & thủy quái Việt — vì sao người Việt cổ phải vẽ mình mới dám xuống sông?`,
    tags: ['con rồng cháu tiên', 'truyền thuyết con rồng cháu tiên', 'lạc long quân âu cơ', 'sự tích trăm trứng', 'bọc trăm trứng', 'nguồn gốc người việt', 'đồng bào là gì', 'hùng vương', 'nước văn lang', 'trống đồng đông sơn', 'giỗ tổ hùng vương', 'truyền thuyết việt nam', 'vẽ là hiểu'],
    hashtags: ['conrongchautien', 'truyenthuyetvietnam', 'suviet'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '+0%',
    voices: {
      llq: { voice: 'vi-VN-NamMinhNeural', pitch: '-12Hz', rate: '-6%' },
      auco: { voice: 'vi-VN-HoaiMyNeural', pitch: '+4Hz', rate: '-2%' },
      villager: { voice: 'vi-VN-HoaiMyNeural', pitch: '+12Hz', rate: '+12%' },
      kids: { voice: 'vi-VN-HoaiMyNeural', pitch: '+40Hz', rate: '+18%' },
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
      say: 'Có một bà mẹ, {one}sinh một lần… {hundred}một trăm người con. {notx}Không phải một trăm lần đâu nhé. Một lần. {hosp}Nếu là thời nay, chắc bệnh viện phải mở thêm… cả một khoa. {us}Mà bà mẹ ấy, theo truyền thuyết, là mẹ của tất cả chúng ta.',
      sfx: [['pop', 'one'], ['boom', 'hundred', 0.5], ['ding', 'notx', 0.5], ['boing', 'hosp', 0.6], ['sparkle', 'us', 0.5]],
      draw(k) {
        k.backdrop('dawn', { ground: G });
        k.char(470, G, 380, { ...AUCO, face: k.t > k.cue('us') ? 'happy' : 'calm', pose: 'stand', p: k.at(0.1, 0.6), blush: true });
        k.prop('eggsac', 940, 560, 360, { p: k.at('one', 0.6), glow: k.at('hundred', 0.8) });
        k.text('× 100', 940, 230, { size: 150, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('hundred', 0.5), outline: '#fffaf0', outlineWidth: 16 });
        k.text('(một lần!)', 940, 340, { size: 52, font: 'title', fx: 'pop', p: k.at('notx', 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.char(1500, G, 360, { body: 'man', outfit: 'tunic', color: '#ffffff', color2: '#7ec8f0', hair: 'short', face: 'shock', pose: 'facepalm', p: k.at('hosp', 0.5) });
        say(k, 'Mở thêm… cả một khoa!', 'hosp', [1280, 250, 520, 110], [1480, 500]);
        cap(k, 'mẹ của tất cả chúng ta', 'us', { hl: '#ffe08a' });
      },
    },
    {
      say: 'Đây là tập ba trong series Truyền thuyết Hùng Vương. {prev}Tập trước, Sơn Tinh, Thủy Tinh đánh nhau dưới thời vua Hùng thứ mười tám. {rew}Hôm nay, mình tua ngược lại, về tận vua Hùng thứ nhất, và cả bố mẹ của ngài. {sub}Nếu bạn mới đến, tập Thánh Gióng và Sơn Tinh, Thủy Tinh đang chờ bạn ở cuối video. Đăng ký kênh để xem trọn bộ nhé.',
      sfx: [['pop', 0.3], ['pop', 'prev'], ['slideDown', 'rew', 0.6], ['scratch', ['rew', 0.2], 0.4], ['ding', 'sub', 0.5]],
      draw(k) {
        const X = (n) => 200 + (n - 1) * (1520 / 17), y = 640;
        k.text('SERIES TRUYỀN THUYẾT HÙNG VƯƠNG · TẬP 3', 960, 120, { size: 54, font: 'title', color: '#b5482c', p: k.at(0.2, 1.4, 'linear') });
        k.arrow(150, y, 1790, y, { p: k.at(0.4, 1), width: 5 });
        for (let n = 1; n <= 18; n++) {
          k.line(X(n), y - 16, X(n), y + 16, { width: 4, p: k.at(0.6 + n * 0.04, 0.2) });
          if (n === 1 || n === 6 || n === 18) k.text(String(n), X(n), y + 60, { size: 40, font: 'title', fx: 'fade', p: k.at(0.8 + n * 0.04, 0.3) });
        }
        k.text('đời vua Hùng', 960, y + 120, { size: 38, weight: 600, fx: 'fade', p: k.at(1.2, 0.5) });
        k.char(X(18) - 90, y - 30, 220, { body: 'big', outfit: 'robe', color: '#4f8a3f', color2: '#c9a24a', hair: 'topknot', hat: 'mountain', face: 'smug', pose: 'hips', p: k.at('prev', 0.5), shadow: false });
        k.char(X(18) + 40, y - 30, 220, { body: 'big', outfit: 'robe', color: '#2f78c4', color2: '#9fd3f2', hair: 'long', hairColor: '#1d3f66', hat: 'wave', face: 'angry', pose: 'fight', p: k.at(k.cue('prev', 0.3), 0.5), shadow: false });
        k.text('tập trước', X(18) - 30, 300, { size: 40, font: 'title', fx: 'fade', p: k.at(k.cue('prev', 0.6), 0.4), outline: '#fffaf0', outlineWidth: 8 });
        const rw = k.at('rew', 1.8, 'inOut');
        const mxp = k.lerp(X(18), X(1), rw);
        k.group({ x: mxp, y: y - 40, a: k.at('rew', 0.3) }, () => {
          k.poly([[-22, -40], [22, -40], [0, 0]], { fill: '#e4572e', width: 3, seed: 5 });
          k.text('◀◀', 0, -80, { size: 56, font: 'title', color: '#e4572e' });
        });
        k.char(X(1) + 30, y - 30, 220, { ...KING, face: 'happy', pose: 'wave', p: k.at(k.cue('rew', 1.6), 0.5), shadow: false });
        k.char(X(1) + 150, y - 30, 220, { ...LLQ, face: 'smug', pose: 'hips', p: k.at(k.cue('rew', 2), 0.5), shadow: false });
        k.char(X(1) + 260, y - 30, 200, { ...AUCO, face: 'happy', pose: 'stand', p: k.at(k.cue('rew', 2.3), 0.5), shadow: false });
        k.text('hôm nay', X(1) + 140, 300, { size: 40, font: 'title', fx: 'fade', p: k.at(k.cue('rew', 2.4), 0.4), outline: '#fffaf0', outlineWidth: 8 });
        stamp(k, 1450, 920, 'ĐĂNG KÝ XEM TRỌN BỘ', k.at('sub', 0.5), { w: 640, size: 46 });
      },
    },
    {
      say: 'Hôm nay: {title}Con Rồng Cháu Tiên. {q}Vì sao người Việt tự nhận mình là con rồng, cháu tiên? {egg}Một trăm cái trứng ấy, nói gì về nguồn gốc của chúng ta? {decode}Kể xong truyền thuyết, mình cùng giải mã.',
      sfx: [['tada', 'title', 0.5], ['drumroll', 'q', 0.3], ['pop', 'egg'], ['ding', 'decode', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.prop('dragon', 520, 520, 560, { p: k.at('title', 0.8), bob: 10 });
        k.char(1530, G, 400, { ...AUCO, face: 'happy', pose: 'wave', p: k.at(k.cue('title', 0.5), 0.6), blush: true });
        for (let i = 0; i < 4; i++) flower(k, 1300 + i * 140, 840 - (i % 2) * 30, 1.1, ['#ef6f9a', '#f6c344', '#fffaf0', '#e4572e'][i], k.at(k.cue('title', 0.8 + i * 0.15), 0.4), 40 + i * 10);
        k.text('Con Rồng Cháu Tiên', 960, 160, { size: 120, font: 'title', color: '#b5482c', p: k.at('title', 1.4, 'linear'), outline: '#fffaf0', outlineWidth: 16 });
        k.text('vì sao ta là con rồng, cháu tiên?', 960, 280, { size: 56, weight: 600, p: k.at('q', 1.6, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        k.prop('eggsac', 1020, 720, 240, { p: k.at('egg', 0.5), glow: 0.6 });
        k.burst(960, 940, 80, 'GIẢI MÃ', { p: k.at('decode', 0.5), size: 44 });
      },
    },

    // ---------------- Chương 1: Chàng rồng biển ----------------
    {
      chapter: 'Chàng rồng biển',
      say: [
        'Chuyện kể rằng, {dragon}ở vùng đất Lạc Việt, có một vị thần mình rồng, tên là Lạc Long Quân. {mom}Ngài là con trai thần Long Nữ, {sea}thường sống dưới nước, thỉnh thoảng mới lên cạn. {strong}Sức khoẻ vô địch, lắm phép lạ.',
        { v: 'llq', text: '{hi}Chào bà con, tôi ở dưới biển lên đây!' },
      ],
      sfx: [['whoosh', 'dragon', 0.6], ['sparkle', 'mom', 0.4], ['whoosh', 'sea', 0.4], ['boom', 'strong', 0.4], ['pop', 'hi']],
      draw(k) {
        chap(k, 1, 'Chàng rồng biển');
        k.backdrop('day', { ground: G });
        const rise = k.at('dragon', 1.6, 'out');
        const dive = k.at('sea', 1.6, 'inOut');
        k.prop('dragon', 640, k.lerp(1060, 500, rise) + dive * 560, 540, { p: k.at('dragon', 0.4) });
        k.water(760, { amp: 10 });
        badge(k, 1450, 170, 'LẠC LONG QUÂN', 'thần mình rồng · con thần Long Nữ', '#1f7a8c', k.at(k.cue('dragon', 1.2), 0.6));
        k.char(1400, 800, 380, { ...LLQ, face: k.t > k.cue('hi') ? 'happy' : 'smug', pose: k.t > k.cue('hi') ? 'wave' : 'hips', p: k.at(k.cue('sea', 1), 0.6), bob: 3 });
        k.text('sức khoẻ vô địch', 1400, 330, { size: 40, font: 'title', fx: 'pop', p: k.at(k.cue('strong', 0.3), 0.4), outline: '#fffaf0', outlineWidth: 8 });
        say(k, 'Chào bà con, tôi ở dưới biển lên đây!', 'hi', [560, 360, 600, 120], [1280, 520]);
      },
    },
    {
      say: 'Lên cạn để làm gì? {job}Làm việc tốt. {three}Ngài diệt ba con yêu quái chuyên hại dân lành: {ngu}Ngư Tinh, {ho}Hồ Tinh, {moc}và Mộc Tinh. {combo}Một mình cân cả biển, cả hồ, cả rừng. Dịch vụ diệt yêu… ba trong một.',
      sfx: [['ding', 'job', 0.5], ['drumroll', 'three', 0.3], ['pop', 'ngu'], ['pop', 'ho'], ['pop', 'moc'], ['cash', 'combo', 0.6]],
      draw(k) {
        chap(k, 1, 'Chàng rồng biển');
        wanted(k, 420, 470, 'Ngư Tinh', k.at('ngu', 0.5), () => k.prop('ngutinh', 0, 10, 300, { flip: true }));
        wanted(k, 960, 470, 'Hồ Tinh', k.at('ho', 0.5), () => k.prop('fox', 0, -10, 270, { angry: true }));
        wanted(k, 1500, 470, 'Mộc Tinh', k.at('moc', 0.5), () => { k.prop('tree', 0, 10, 300, { fill: '#3f7a3a' }); k.face(0, -40, 40, 'angry'); });
        k.burst(960, 940, 70, 'DIỆT YÊU 3 TRONG 1', { p: k.at('combo', 0.5), size: 34 });
      },
    },
    {
      say: [
        '{fish}Ngư Tinh là một con cá khổng lồ ngoài biển Đông, chuyên nuốt thuyền, hại người đánh cá. {iron}Tương truyền, Lạc Long Quân nung đỏ một khối sắt, {throw}rồi ném thẳng vào miệng nó.',
        { v: 'llq', text: '{eat}Ăn đi, nóng giòn đây!' },
        '{gulp}Cá nuốt chửng. {end}Và đó là bữa ăn cuối cùng của Ngư Tinh.',
      ],
      sfx: [['boom', 'fish', 0.5], ['sparkle', 'iron', 0.4], ['whoosh', 'throw', 0.7], ['pop', 'eat'], ['gulp', 'gulp', 0.9], ['boom', ['gulp', 0.6], 0.6], ['wahwah', 'end', 0.4]],
      draw(k) {
        chap(k, 1, 'Chàng rồng biển');
        k.backdrop('day', { ground: G });
        const sh = k.shake(k.cue('gulp', 0.5), 0.6, 14);
        const dead = k.at('end', 1.4, 'inOut');
        k.group({ x: sh.x, y: sh.y }, () => {
          k.prop('ngutinh', k.lerp(2100, 1450, k.at('fish', 1.4)), 600 + dead * 120, 500, { flip: true, open: k.t > k.cue('gulp') ? 0.1 : 0.4 + 0.5 * k.at('iron', 1), rotate: dead * 2.8, p: k.at('fish', 0.3) });
        });
        k.water(720, { amp: 10 });
        k.prop('boat', 470, 760, 380, { bob: 4 });
        k.char(470, 735, 280, { ...LLQ, face: k.t > k.cue('end') ? 'laugh' : 'angry', pose: k.t > k.cue('throw') ? 'point' : 'hold', shadow: false });
        const fly = k.at('throw', 0.9, 'inOut');
        const ix = k.lerp(560, 1245, fly), iy = k.lerp(500, 600, fly) - Math.sin(fly * Math.PI) * 220;
        if (k.t < k.cue('gulp')) k.group({ x: ix, y: iy, r: fly * 6, a: k.at('iron', 0.4) }, () => {
          k.rect(-34, -26, 68, 52, { fill: '#e4572e', width: 4, seed: 31 });
          k.rect(-18, -12, 36, 24, { fill: '#f6c344', stroke: 'none', seed: 32 });
        });
        k.text('Ngư Tinh', 1450, 300, { size: 60, font: 'title', color: '#3b4a5f', fx: 'pop', p: k.at(k.cue('fish', 0.8), 0.4), outline: '#fffaf0', outlineWidth: 10 });
        say(k, 'Ăn đi, nóng giòn đây!', 'eat', [180, 200, 480, 110], [440, 440]);
        k.burst(1250, 430, 70, 'ỰC!', { p: k.at('gulp', 0.4), size: 56 });
      },
    },
    {
      say: [
        '{fox}Hồ Tinh là một con cáo chín đuôi, sống hơn nghìn năm, hay hoá thành người để bắt hại dân lành. {fight}Lạc Long Quân đánh nó tan tác, phá nát hang ổ. {lake}Tương truyền, chỗ hang cáo ấy sụt xuống thành một vùng nước lớn, {hotay}chính là Hồ Tây ở Hà Nội ngày nay.',
        { v: 'villager', text: '{view}Ơ, hoá ra hồ Tây là… hang cáo cũ à?' },
      ],
      sfx: [['scratch', 'fox', 0.4], ['boom', 'fight', 0.7], ['whoosh', 'lake', 0.6], ['sparkle', 'hotay', 0.5], ['boing', 'view', 0.5]],
      draw(k) {
        chap(k, 1, 'Chàng rồng biển');
        const lake = k.at('lake', 2, 'inOut');
        k.backdrop(lake > 0.5 ? 'dawn' : 'night', { ground: G });
        k.ellipse(1300, 860, 520 * (1 - lake) + 1, 120 * (1 - lake) + 1, { fill: '#2b2235', stroke: 'none', seed: 41 });
        k.ellipse(1250, 900, 1000 * lake + 1, 170 * lake + 1, { fill: '#5b9bd5', width: 4, seed: 42 });
        const sh = k.shake('fight', 0.6, 12);
        k.group({ x: sh.x, y: sh.y, a: 1 - lake }, () => k.prop('fox', 1300, 690, 380, { angry: true, p: k.at('fox', 0.6) }));
        k.char(520, G, 380, { ...LLQ, face: 'angry', pose: 'fight', p: k.at('fight', 0.5), alpha: 1 - k.at('hotay', 0.6) });
        k.burst(980, 520, 90, 'BỤP!', { p: k.at(k.cue('fight', 0.3), 0.4) * (1 - lake), size: 56 });
        k.text('HỒ TÂY', 1250, 640, { size: 110, font: 'title', color: '#1d4f8a', fx: 'pop', p: k.at('hotay', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.text('(xưa gọi là Đầm Xác Cáo)', 1250, 740, { size: 40, weight: 600, fx: 'fade', p: k.at(k.cue('hotay', 1), 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.char(380, G, 300, { ...VIL('#9c6b3f'), face: 'shock', pose: 'shrug', p: k.at('view', 0.5) });
        say(k, 'Hoá ra hồ Tây là… hang cáo cũ à?', 'view', [160, 260, 640, 110], [400, 560]);
      },
    },
    {
      say: '{tree}Còn Mộc Tinh là một cây cổ thụ thành tinh giữa rừng sâu, {chop}cũng bị ngài trừ nốt. {teach}Dẹp yêu xong, Lạc Long Quân còn dạy dân trồng trọt, chăn nuôi, cách ăn ở. {two}Vừa làm bảo vệ, vừa làm… cán bộ khuyến nông.',
      sfx: [['scratch', 'tree', 0.5], ['boom', 'chop', 0.6], ['sparkle', 'teach', 0.5], ['ding', 'two', 0.5]],
      draw(k) {
        chap(k, 1, 'Chàng rồng biển');
        k.backdrop('day', { ground: G });
        const farm = k.at('teach', 0.6);
        const fall = k.at(k.cue('chop', 0.3), 1, 'in');
        k.group({ a: 1 - farm }, () => {
          k.group({ x: 1350, y: G, r: fall * 1.3 }, () => {
            k.prop('tree', 0, -320, 640, { fill: '#3f7a3a', p: k.at('tree', 0.6) });
            k.face(0, -420, 60, fall > 0 ? 'shock' : 'angry');
          });
          k.char(640, G, 380, { ...LLQ, face: 'angry', pose: 'fight', p: k.at(k.cue('tree', 0.6), 0.5), prop: 'staff' });
          k.burst(1100, 420, 80, 'RẮC!', { p: k.at('chop', 0.4), size: 52 });
        });
        k.group({ a: farm }, () => {
          k.prop('stilthouse', 1550, 640, 360, {});
          rice(k, 160, 780, 9, 2, k.at('teach', 3));
          k.char(1000, G, 380, { ...LLQ, face: 'happy', pose: 'point' });
          for (let i = 0; i < 3; i++) k.char(1250 + i * 150, G, 240, { ...VIL(['#9c6b3f', '#b5482c', '#6b4a2d'][i]), face: 'happy', pose: i === 1 ? 'cheer' : 'hold', p: k.at(k.cue('teach', 0.5 + i * 0.2), 0.5) });
          badge(k, 960, 200, 'CÁN BỘ KHUYẾN NÔNG', 'kiêm bảo vệ · từ thời Hồng Bàng', '#3f8f3a', k.at('two', 0.5));
        });
      },
    },

    // ---------------- Chương 2: Nàng tiên trên núi ----------------
    {
      chapter: 'Nàng tiên & một trăm quả trứng',
      say: [
        '{auco}Trong khi đó, ở vùng núi cao phương Bắc, có nàng Âu Cơ, thuộc dòng họ Thần Nông, {pretty}xinh đẹp tuyệt trần. {flowers}Nghe nói vùng Lạc Việt có nhiều hoa thơm cỏ lạ, {trip}nàng bèn tìm đến thăm.',
        { v: 'auco', text: '{line}Nghe bảo dưới đó hoa đẹp lắm, đi thôi!' },
        '{eco}Một chuyến du lịch sinh thái… từ mấy nghìn năm trước.',
      ],
      sfx: [['sparkle', 'auco', 0.5], ['sparkle', 'pretty', 0.4], ['pop', 'flowers'], ['whoosh', 'trip', 0.5], ['pop', 'line'], ['ding', 'eco', 0.5]],
      draw(k) {
        chap(k, 2, 'Nàng tiên & một trăm quả trứng');
        k.backdrop('dawn', { ground: G });
        k.prop('mountain', 300, 600, 640, { snow: true });
        const go = k.at('trip', 3.5, 'inOut');
        k.char(k.lerp(560, 1050, go), G, 380, { ...AUCO, face: 'happy', pose: k.t > k.cue('line') && k.t < k.cue('eco') ? 'point' : 'stand', walk: go > 0 && go < 1, p: k.at('auco', 0.6), blush: true });
        badge(k, 600, 170, 'ÂU CƠ', 'dòng Thần Nông · núi cao phương Bắc', '#ef6f9a', k.at(k.cue('auco', 1), 0.6) * (1 - k.at('line', 0.4)));
        for (let i = 0; i < 8; i++) flower(k, 1250 + (i % 4) * 160, 760 + Math.floor(i / 4) * 80, 1.2, ['#ef6f9a', '#f6c344', '#fffaf0', '#e4572e'][i % 4], k.at(k.cue('flowers', i * 0.12), 0.4), 100 + i * 10);
        say(k, 'Nghe bảo dưới đó hoa đẹp lắm, đi thôi!', 'line', [480, 200, 640, 120], [k.lerp(560, 1050, go), 470]);
        const pt = k.at('eco', 0.6);
        k.group({ x: 1480, y: 330, r: 0.06, s: Math.max(0.01, k.ease.back(pt)) }, () => {
          k.rect(-300, -95, 600, 190, { fill: '#2e86de', width: 5, p: pt > 0 ? 1 : 0 });
          k.text('TOUR SINH THÁI', 0, -30, { size: 56, font: 'title', color: '#fff3c4', p: pt > 0 ? 1 : 0 });
          k.text('Núi phương Bắc → Lạc Việt', 0, 40, { size: 34, color: '#fff', weight: 600, p: pt > 0 ? 1 : 0 });
        });
      },
    },
    {
      say: '{meet}Và ở đó, nàng gặp Lạc Long Quân. {spark}Rồng gặp tiên. {from}Một người từ biển lên, một người từ núi xuống. {love}Hai người đem lòng yêu nhau, {wed}rồi nên vợ nên chồng. {best}Chuyến du lịch… có hậu nhất lịch sử.',
      sfx: [['pop', 'meet'], ['sparkle', 'spark', 0.6], ['whoosh', 'from', 0.4], ['ding', 'love', 0.5], ['tada', 'wed', 0.5], ['boing', 'best', 0.5]],
      draw(k) {
        chap(k, 2, 'Nàng tiên & một trăm quả trứng');
        k.backdrop('sunset', { ground: G });
        k.prop('mountain', 200, 620, 520, {});
        k.water(950, { amp: 8 });
        const a = k.at('meet', 2.2, 'inOut');
        k.char(k.lerp(380, 780, a), G, 380, { ...AUCO, face: 'happy', pose: k.t > k.cue('wed') ? 'cheer' : 'stand', walk: a > 0 && a < 1, blush: true });
        k.char(k.lerp(1700, 1150, a), G, 400, { ...LLQ, face: 'happy', pose: k.t > k.cue('wed') ? 'cheer' : 'wave', walk: a > 0 && a < 1, flip: true });
        k.text('núi', 380, 330, { size: 52, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('from', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.text('biển', 1600, 330, { size: 52, font: 'title', color: '#1d4f8a', fx: 'pop', p: k.at(k.cue('from', 0.8), 0.4), outline: '#fffaf0', outlineWidth: 10 });
        for (let i = 0; i < 5; i++) k.prop('heart', 965 + Math.cos(i * 1.3) * 90, 400 + Math.sin(i * 1.3) * 60 - k.at('love', 3) * 60, 60 + (i % 2) * 30, { p: k.at(k.cue('love', i * 0.15), 0.4) });
        k.group({ a: 1 - k.at('wed', 0.3) }, () => k.text('RỒNG + TIÊN', 965, 220, { size: 80, font: 'title', fx: 'pop', p: k.at('spark', 0.5), outline: '#fffaf0', outlineWidth: 10 }));
        const pb = k.at('wed', 0.6);
        k.group({ x: 965, y: 160, s: Math.max(0.01, k.ease.back(pb)), r: -0.03 }, () => {
          k.rect(-340, -60, 680, 120, { fill: '#b5482c', width: 5, p: pb > 0 ? 1 : 0 });
          k.text('TRĂM NĂM HẠNH PHÚC', 0, 4, { size: 54, font: 'title', color: '#fff3c4', p: pb > 0 ? 1 : 0 });
        });
        stamp(k, 1500, 560, 'TOUR 5 SAO', k.at('best', 0.5), { w: 420, size: 58 });
      },
    },
    {
      say: [
        '{belly}Ít lâu sau, Âu Cơ có mang. {birth}Đến kỳ sinh nở, nàng sinh ra… {sac}một cái bọc. {eggs}Trong bọc, có một trăm quả trứng.',
        { v: 'villager', text: '{count}Một trăm á?! Đếm lại xem nào!' },
        '{again}Đếm lại. Vẫn là một trăm.',
      ],
      sfx: [['pop', 'belly'], ['drumroll', 'birth', 0.4], ['boom', 'sac', 0.5], ['sparkle', 'eggs', 0.5], ['boing', 'count', 0.5], ['ding', 'again', 0.6]],
      draw(k) {
        chap(k, 2, 'Nàng tiên & một trăm quả trứng');
        k.backdrop('dawn', { ground: G });
        k.char(420, G, 380, { ...AUCO, face: k.t > k.cue('sac') && k.t < k.cue('eggs') ? 'shock' : 'happy', pose: k.t > k.cue('sac') ? 'present' : 'stand', blush: true });
        k.prop('eggsac', 1000, 600, 420, { p: k.at('sac', 0.6), glow: k.at('eggs', 1) });
        const n1 = Math.round(100 * k.at('eggs', 2.4, 'linear'));
        const n2 = Math.round(100 * k.at('again', 1.2, 'linear'));
        const n = k.t > k.cue('again') ? n2 : n1;
        k.text(`${n} quả trứng`, 1000, 220, { size: 96, font: 'title', color: '#b5482c', p: k.at('eggs', 0.3), outline: '#fffaf0', outlineWidth: 14 });
        k.char(1620, G, 300, { ...VIL('#9c6b3f'), face: 'shout', pose: 'shout', p: k.at('count', 0.5) });
        say(k, 'Một trăm á?! Đếm lại xem nào!', 'count', [1240, 330, 560, 110], [1600, 580]);
        stamp(k, 1000, 360, 'VẪN 100', k.at(k.cue('again', 1.3), 0.5), { w: 340, size: 64 });
      },
    },
    {
      say: [
        '{crack}Rồi trăm trứng nở ra một trăm người con trai, {pink}hồng hào, đẹp đẽ lạ thường.',
        { v: 'kids', text: '{hi}Chào mẹ ạ!' },
        '{shoes}Một trăm cậu con trai. Chỉ tính tiền mua dép thôi, đã là… hai trăm chiếc.',
      ],
      sfx: [['pop', 'crack'], ['pop', ['crack', 0.4]], ['pop', ['crack', 0.8]], ['pop', ['crack', 1.2]], ['sparkle', 'pink', 0.5], ['tada', 'hi', 0.5], ['cash', 'shoes', 0.6]],
      draw(k) {
        chap(k, 2, 'Nàng tiên & một trăm quả trứng');
        k.backdrop('day', { ground: G });
        for (let i = 0; i < 20; i++) {
          const x = 150 + (i % 10) * 180, y = i < 10 ? 470 : 820;
          const c0 = k.cue('crack', i * 0.09);
          const hatch = k.at(c0 + 0.5, 0.4);
          k.char(x, y + 10, 170, { ...KID(i), face: k.t > k.cue('hi') ? 'laugh' : 'happy', pose: k.t > k.cue('hi') ? (i % 2 ? 'cheer' : 'wave') : 'stand', p: k.at(c0 + 0.6, 0.4), bob: k.t > k.cue('hi') ? 3 : 0, shadow: false });
          k.prop('egg', x, y - 30, 120, { crack: k.at(c0, 0.4), hatch, alpha: 1 - k.at(c0 + 0.9, 0.4) * 0.6 });
        }
        k.text('minh hoạ 20/100 — 80 bạn còn lại đang… lớn', 960, 140, { size: 34, weight: 600, fx: 'fade', p: k.at('pink', 0.5), color: '#6b5f55', outline: '#fffaf0', outlineWidth: 8 });
        k.burst(960, 600, 120, 'DÉP × 200', { p: k.at('shoes', 0.5), size: 60, fill: '#fff3c4' });
      },
    },

    // ---------------- Chương 3: Chăm trăm con kiểu gì? ----------------
    {
      chapter: 'Mẹ Âu Cơ chăm trăm con kiểu gì?',
      say: '{prev}Tập trước, mình hỏi: mẹ Âu Cơ chăm một trăm đứa con kiểu gì cho xuể? {ans}Và đây là đáp án chính thức, từ chính truyền thuyết: {milk}đàn con không cần bú mớm, {grow}tự lớn lên như thổi, {strong}mặt mũi khôi ngô, khoẻ mạnh như thần.',
      sfx: [['drumroll', 'prev', 0.3], ['tada', 'ans', 0.5], ['pop', 'milk'], ['slideUp', 'grow', 0.6], ['ding', 'strong', 0.5]],
      draw(k) {
        chap(k, 3, 'Mẹ Âu Cơ chăm trăm con kiểu gì?');
        k.icon('question', 260, 190, 140, { p: k.at('prev', 0.6) });
        k.text('Mẹ Âu Cơ chăm 100 con kiểu gì?', 1000, 190, { size: 66, font: 'title', p: k.at('prev', 1.6, 'linear') });
        stamp(k, 960, 330, 'ĐÁP ÁN', k.at('ans', 0.5), { w: 340, size: 66, color: '#3f8f3a', r: -0.05 });
        const cols = [[420, 'milk', 'không cần bú mớm'], [960, 'grow', 'lớn như thổi'], [1500, 'strong', 'khoẻ như thần']];
        k.char(420, 840, 260, { ...KID(0), face: 'smug', pose: 'hips', p: k.at('milk', 0.5) });
        k.icon('cross', 560, 560, 120, { p: k.at(k.cue('milk', 0.4), 0.4) });
        k.text('sữa', 560, 650, { size: 40, font: 'title', fx: 'fade', p: k.at(k.cue('milk', 0.4), 0.4) });
        const gs = k.lerp(140, 400, k.at('grow', 1.6, 'back'));
        k.char(960, 840, gs, { ...KID(1), face: 'laugh', pose: 'cheer', p: k.at('grow', 0.3) });
        k.motion(960, 840 - gs - 20, 0, -1, { p: k.at('grow', 0.4) * (1 - k.at(k.cue('grow', 1.6), 0.4)), n: 3, len: 90 });
        k.char(1500, 840, 330, { ...KID(3), face: 'angry', pose: 'fight', p: k.at('strong', 0.5) });
        for (const [x, c, t] of cols) k.text(t, x, 950, { size: 46, font: 'title', color: '#b5482c', p: k.at(c, 1, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: '{giong}Nghe quen không? Thánh Gióng cũng lớn nhanh như thổi, {rice}nhưng ăn hết bảy nong cơm, ba nong cà. {free}Còn trăm anh em này, lớn mà không tốn… một giọt sữa. {award}Nếu có giải "Mẹ bỉm sữa nhàn nhất lịch sử", chắc chắn thuộc về mẹ Âu Cơ.',
      sfx: [['ding', 'giong', 0.4], ['pop', 'rice'], ['pop', ['rice', 0.5]], ['bonk', 'free', 0.5], ['tada', 'award', 0.6]],
      draw(k) {
        chap(k, 3, 'Mẹ Âu Cơ chăm trăm con kiểu gì?');
        k.backdrop('day', { ground: G });
        k.line(960, 160, 960, 1000, { width: 4, stroke: '#b9a37a', p: k.at(0.2, 0.6) });
        k.char(380, G, 440, { body: 'big', outfit: 'tunic', color: '#3b6fb6', color2: '#f6c344', hair: 'short', face: 'laugh', pose: 'hold', p: k.at('giong', 0.6) });
        k.text('Thánh Gióng', 380, 230, { size: 60, font: 'title', color: '#2f5fa0', fx: 'pop', p: k.at(k.cue('giong', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 10 });
        for (let i = 0; i < 7; i++) k.prop('xoi', 640 + (i % 2) * 120, 820 - Math.floor(i / 2) * 70, 120, { p: k.at(k.cue('rice', i * 0.1), 0.3) });
        k.text('7 nong cơm, 3 nong cà', 480, 330, { size: 44, font: 'title', fx: 'fade', p: k.at(k.cue('rice', 0.8), 0.5), outline: '#fffaf0', outlineWidth: 8 });
        for (let i = 0; i < 5; i++) k.char(1130 + i * 150, G, 220, { ...KID(i), face: 'happy', pose: i % 2 ? 'cheer' : 'wave', p: k.at(k.cue('free', -0.6 + i * 0.1), 0.4), bob: 3 });
        k.text('0 giọt sữa', 1440, 300, { size: 80, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('free', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        badge(k, 1440, 470, 'MẸ BỈM SỮA NHÀN NHẤT', 'giải thưởng lịch sử · mẹ Âu Cơ', '#ef6f9a', k.at('award', 0.5));
      },
    },
    {
      say: '{why}Vì sao truyền thuyết lại kể như vậy? {sign}Trong truyện cổ, ai sinh ra lạ thường, lớn lên lạ thường, thì đó là người phi thường. {mean}Một trăm người con khoẻ như thần, {us}nghĩa là: tổ tiên của chúng ta, không phải người thường. {proud}Một cách kể… rất biết tự hào.',
      sfx: [['drumroll', 'why', 0.3], ['pop', 'sign'], ['pop', ['sign', 1]], ['pop', ['sign', 2]], ['sparkle', 'us', 0.5], ['ding', 'proud', 0.5]],
      draw(k) {
        chap(k, 3, 'Mẹ Âu Cơ chăm trăm con kiểu gì?');
        k.backdrop('dawn', { ground: G });
        const steps = [['sinh lạ thường', 0], ['lớn lạ thường', 1], ['người phi thường', 2]];
        steps.forEach(([t, i]) => {
          const c = k.cue('sign', i);
          k.text(t, 330 + i * 630, 260, { size: 56, font: 'title', color: i === 2 ? '#b5482c' : '#3b2f2a', fx: 'pop', p: k.at(c, 0.5), outline: '#fffaf0', outlineWidth: 10 });
          if (i < 2) k.arrow(530 + i * 630, 260, 770 + i * 630, 260, { p: k.at(c + 0.5, 0.4), width: 5 });
        });
        k.prop('egg', 330, 470, 160, { crack: 1, hatch: 0.5, p: k.at('sign', 0.5) });
        k.prop('horse', 960, 470, 220, { fire: true, p: k.at(k.cue('sign', 1), 0.5) });
        k.prop('sun', 1590, 460, 180, { p: k.at(k.cue('sign', 2), 0.5) });
        for (let i = 0; i < 7; i++) k.char(300 + i * 220, G, 230, { ...KID(i), face: 'laugh', pose: 'cheer', p: k.at(k.cue('us', i * 0.1), 0.4), bob: 3 });
        k.burst(1300, 520, 80, 'TỰ HÀO!', { p: k.at('proud', 0.5), size: 50 });
      },
    },

    // ---------------- Chương 4: Cuộc chia tay ----------------
    {
      chapter: 'Cuộc chia tay văn minh nhất',
      say: [
        '{but}Nhưng Lạc Long Quân là rồng, {land}không quen ở mãi trên cạn. {gone}Ngài thường về thuỷ cung, để Âu Cơ một mình nuôi con, {wait}ngày đêm mong ngóng.',
        { v: 'auco', text: '{cry}Sao chàng bỏ thiếp mà đi, không cùng thiếp nuôi các con?' },
      ],
      sfx: [['pop', 'but'], ['whoosh', 'gone', 0.6], ['slideDown', ['gone', 0.5], 0.4]],
      draw(k) {
        chap(k, 4, 'Cuộc chia tay văn minh nhất');
        k.backdrop('sunset', { ground: G });
        const dv = k.at('gone', 2, 'in');
        k.prop('dragon', k.lerp(1450, 1650, dv), k.lerp(560, 1150, dv), 460, { p: k.at('but', 0.5), flip: false });
        k.water(860, { amp: 8 });
        k.char(520, 860, 380, { ...AUCO, face: 'sad', pose: k.t > k.cue('cry') ? 'present' : 'stand' });
        for (let i = 0; i < 6; i++) k.char(170 + (i % 3) * 100 + (i > 2 ? 560 : 0), 860, 170, { ...KID(i), face: 'sad', pose: 'stand', shadow: false });
        k.prop('moon', 300, 200, 160, { p: k.at('wait', 0.8) });
        say(k, 'Sao chàng bỏ thiếp mà đi?', 'cry', [620, 240, 520, 110], [560, 470]);
      },
    },
    {
      say: [
        { v: 'llq', text: '{llq}Ta vốn nòi rồng ở miền nước thẳm, nàng là dòng tiên ở chốn non cao. {diff}Kẻ ở cạn, người ở nước, tính tình tập quán khác nhau, khó mà ăn ở cùng nhau lâu dài được.' },
        '{modern}Dịch sang ngôn ngữ thời nay: {tag}"Mình… khác biệt lối sống."',
      ],
      sfx: [['pop', 'llq'], ['whoosh', 'diff', 0.4], ['scratch', 'modern', 0.6], ['boing', 'tag', 0.5]],
      draw(k) {
        chap(k, 4, 'Cuộc chia tay văn minh nhất');
        const { ctx } = k;
        ctx.fillStyle = '#d5ecc8'; ctx.fillRect(0, 0, 960, 1080);
        ctx.fillStyle = '#c2e2f4'; ctx.fillRect(960, 0, 960, 1080);
        k.prop('mountain', 300, 700, 520, { snow: true });
        for (let i = 0; i < 4; i++) k.wave(1000, 760 + i * 70, 880, { amp: 12, len: 120, phase: k.gt * 2 + i, stroke: '#2f78c4', width: 5 });
        k.lines([[960, 0], [940, 200], [980, 400], [940, 600], [980, 800], [960, 1080]], { width: 6, p: k.at(0.2, 0.8) });
        k.text('NÚI CAO', 480, 170, { size: 70, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('llq', 0.5) });
        k.text('NƯỚC THẲM', 1440, 170, { size: 70, font: 'title', color: '#1d4f8a', fx: 'pop', p: k.at('llq', 0.5) });
        k.char(640, G, 360, { ...AUCO, face: k.t > k.cue('tag') ? 'blank' : 'sad', pose: 'stand' });
        k.char(1320, G, 380, { ...LLQ, face: 'calm', pose: k.t > k.cue('diff') ? 'shrug' : 'present', flip: true, bob: 2 });
        const pt = k.at('tag', 0.5);
        k.group({ x: 960, y: 420, s: Math.max(0.01, k.ease.back(pt)), r: -0.03 }, () => {
          k.rect(-430, -80, 860, 160, { fill: '#ffffff', width: 5, p: pt > 0 ? 1 : 0 });
          k.text('Trạng thái: khác biệt lối sống', 0, 6, { size: 48, font: 'title', color: '#3b2f2a', p: pt > 0 ? 1 : 0 });
        });
      },
    },
    {
      say: [
        { v: 'llq', text: '{plan}Nay ta đưa năm mươi con xuống biển, {her}nàng đưa năm mươi con lên núi, chia nhau cai quản các phương. {help}Khi có việc gì, thì giúp đỡ lẫn nhau, đừng quên lời hẹn.' },
      ],
      sfx: [['pop', 'plan'], ['whoosh', ['plan', 0.6], 0.4], ['pop', 'her'], ['whoosh', ['her', 0.6], 0.4], ['ding', 'help', 0.5]],
      draw(k) {
        chap(k, 4, 'Cuộc chia tay văn minh nhất');
        k.backdrop('day', { ground: G });
        k.prop('mountain', 260, 620, 560, { snow: true });
        k.water(900, { amp: 8 });
        for (let i = 0; i < 4; i++) k.wave(1260, 600 + i * 70, 640, { amp: 10, len: 110, phase: k.gt * 2 + i, stroke: '#2f78c4', width: 5, alpha: k.at('plan', 0.6) });
        const sea = k.at('plan', 3, 'inOut'), mt = k.at('her', 3, 'inOut');
        k.char(k.lerp(1060, 1680, sea), G, 380, { ...LLQ, face: 'calm', pose: 'point', walk: sea > 0 && sea < 1 });
        k.char(k.lerp(860, 300, mt), G, 360, { ...AUCO, face: 'calm', pose: 'wave', walk: mt > 0 && mt < 1, flip: true });
        for (let i = 0; i < 5; i++) {
          k.char(k.lerp(1000 + i * 40, 1180 + i * 90, sea), G, 170, { ...KID(i), pose: 'stand', walk: sea > 0 && sea < 1, shadow: false });
          k.char(k.lerp(900 - i * 40, 420 + i * 80, mt), G, 170, { ...KID(i + 4), pose: 'stand', walk: mt > 0 && mt < 1, shadow: false, flip: true });
        }
        k.text('50 → biển', 1500, 230, { size: 70, font: 'title', color: '#1d4f8a', fx: 'pop', p: k.at('plan', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.text('50 → núi', 420, 230, { size: 70, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('her', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.prop('heart', 960, 420, 150, { p: k.at('help', 0.5), bob: 5 });
        k.text('có việc thì giúp nhau', 960, 560, { size: 50, font: 'title', color: '#b5482c', fx: 'fade', p: k.at(k.cue('help', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: '{civil}Chia tay, nhưng không cãi vã, không tranh chấp, không ra toà. {fair}Chia đôi con, chia đôi địa bàn, {promise}lại còn ký luôn một cam kết hỗ trợ trọn đời. {best}Có lẽ đây là cuộc chia tay văn minh nhất lịch sử.',
      sfx: [['pop', 'civil'], ['pop', ['civil', 0.6]], ['pop', ['civil', 1.2]], ['pop', 'fair'], ['ding', 'promise', 0.5], ['tada', 'best', 0.5]],
      draw(k) {
        chap(k, 4, 'Cuộc chia tay văn minh nhất');
        ['cãi vã', 'tranh chấp', 'ra toà'].forEach((t, i) => {
          const c = k.cue('civil', i * 0.6);
          k.text(t, 280, 300 + i * 160, { size: 54, font: 'title', fx: 'pop', p: k.at(c, 0.4) });
          k.icon('cross', 280, 300 + i * 160, 130, { p: k.at(c + 0.2, 0.3) });
        });
        const pd = k.at('fair', 0.6);
        k.group({ x: 1140, y: 490, s: Math.max(0.01, 0.8 + 0.2 * pd), a: pd }, () => {
          k.rect(-460, -380, 920, 760, { fill: '#fffaf0', width: 5, seed: 61 });
          k.text('BIÊN BẢN THOẢ THUẬN', 0, -300, { size: 56, font: 'title', color: '#b5482c' });
          k.text('1. 50 con theo cha → biển', -400, -180, { size: 44, align: 'left', weight: 600 });
          k.text('2. 50 con theo mẹ → núi', -400, -90, { size: 44, align: 'left', weight: 600 });
          k.text('3. Có việc thì giúp nhau — trọn đời', -400, 0, { size: 44, align: 'left', weight: 600, p: k.at('promise', 1.2, 'linear') });
          k.prop('dragon', -200, 200, 220, { p: k.at(k.cue('promise', 0.8), 0.5) });
          k.text('Lạc Long Quân', -200, 300, { size: 34, weight: 600, fx: 'fade', p: k.at(k.cue('promise', 0.8), 0.5) });
          flower(k, 220, 190, 2.4, '#ef6f9a', k.at(k.cue('promise', 1), 0.5), 200);
          k.text('Âu Cơ', 220, 300, { size: 34, weight: 600, fx: 'fade', p: k.at(k.cue('promise', 1), 0.5) });
        });
        stamp(k, 1560, 990, 'VĂN MINH', k.at('best', 0.5), { w: 380, size: 70, r: -0.08 });
      },
    },

    // ---------------- Chương 5: Vua Hùng đầu tiên ----------------
    {
      chapter: 'Vua Hùng đầu tiên',
      say: '{eldest}Người con trưởng theo mẹ lên núi, được tôn làm vua, lấy hiệu là Hùng Vương, {capital}đóng đô ở Phong Châu, {name}đặt tên nước là Văn Lang. {lang}Con trai vua gọi là lang, {mi}con gái vua gọi là mị nương. {link}Đúng vậy: nàng Mỵ Nương trong tập Sơn Tinh, Thủy Tinh, chính là mang danh xưng này.',
      sfx: [['tada', 'eldest', 0.5], ['pop', 'capital'], ['ding', 'name', 0.5], ['pop', 'lang'], ['pop', 'mi'], ['sparkle', 'link', 0.5]],
      draw(k) {
        chap(k, 5, 'Vua Hùng đầu tiên');
        k.backdrop('day', { ground: G });
        k.prop('palace', 1620, 640, 440, { p: k.at('capital', 0.6) });
        k.text('Phong Châu', 1620, 330, { size: 52, font: 'title', color: '#6b3f22', fx: 'pop', p: k.at(k.cue('capital', 0.3), 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.char(520, G, 420, { ...KING, face: 'happy', pose: 'present', p: k.at('eldest', 0.6) });
        k.text('HÙNG VƯƠNG', 520, 330, { size: 64, font: 'title', color: '#b5482c', fx: 'pop', p: k.at(k.cue('eldest', 1), 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.text('nước VĂN LANG', 960, 150, { size: 96, font: 'title', color: '#b5482c', p: k.at('name', 1.2, 'linear'), outline: '#fffaf0', outlineWidth: 14 });
        k.char(900, G, 300, { body: 'man', outfit: 'tunic', color: '#3bb273', color2: '#f6c344', hair: 'topknot', hat: 'band', face: 'smug', pose: 'hips', p: k.at('lang', 0.5) });
        k.text('lang', 900, 500, { size: 56, font: 'title', fx: 'pop', p: k.at(k.cue('lang', 0.3), 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.char(1180, G, 300, { ...MY, face: 'happy', pose: 'stand', p: k.at('mi', 0.5), blush: true });
        k.text('mị nương', 1180, 500, { size: 56, font: 'title', fx: 'pop', p: k.at(k.cue('mi', 0.3), 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.circle(1180, 730, 190, { stroke: '#e4572e', width: 7, p: k.at('link', 0.8) });
        k.text('(tập trước!)', 1180, 980, { size: 46, font: 'title', color: '#e4572e', fx: 'pop', p: k.at(k.cue('link', 0.6), 0.4), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: '{pass}Ngôi vua cha truyền con nối, {eighteen}mười tám đời đều lấy hiệu Hùng Vương. {toan}Mà theo Đại Việt sử ký toàn thư, cả thời Hồng Bàng kéo dài {years}hai nghìn sáu trăm hai mươi hai năm. {math}Chia cho chừng hai mươi đời vua, mỗi đời vẫn hơn trăm năm. {sus}Nghe có gì đó… sai sai. {later}Con số này, mình sẽ giải mã trong một tập riêng.',
      sfx: [['pop', 'pass'], ['pop', 'eighteen'], ['pop', ['eighteen', 0.4]], ['pop', ['eighteen', 0.8]], ['pop', 'toan'], ['ding', 'years', 0.5], ['pop', 'math'], ['boing', 'sus', 0.6], ['ding', 'later', 0.4]],
      draw(k) {
        chap(k, 5, 'Vua Hùng đầu tiên');
        for (let i = 0; i < 18; i++) k.char(130 + i * 98, 520, 150, { ...KING, beard: i % 3 === 0 ? 'long' : true, face: k.t > k.cue('sus') ? 'shock' : 'happy', pose: 'stand', p: k.at(k.cue('eighteen', i * 0.07), 0.3), shadow: false });
        k.text('18 đời Hùng Vương', 960, 170, { size: 64, font: 'title', fx: 'pop', p: k.at('eighteen', 0.5) });
        k.prop('scroll', 330, 760, 180, { p: k.at('toan', 0.5) });
        k.text('Toàn thư:', 330, 900, { size: 40, font: 'title', fx: 'fade', p: k.at(k.cue('toan', 0.3), 0.4) });
        k.text('2.622 năm', 860, 760, { size: 120, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('years', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.text('÷ ~20 đời = 130+ năm/đời', 860, 880, { size: 54, font: 'title', p: k.at('math', 1.4, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        k.burst(1540, 720, 90, 'SAI SAI?', { p: k.at('sus', 0.5), size: 52 });
        k.text('→ giải mã ở một tập riêng', 1540, 990, { size: 40, weight: 600, fx: 'fade', p: k.at('later', 0.5), color: '#6b5f55' });
      },
    },
    {
      say: 'Mà khoan. {fish}Nhớ con Ngư Tinh lúc nãy không? {more}Sông nước Việt còn một loài thuỷ quái đáng sợ hơn nhiều: {tl}thuồng luồng. {tattoo}Đáng sợ đến mức, người Việt cổ phải vẽ hình lên mình, {why}rồi mới dám xuống sông đánh cá. {next}Vì sao vậy? Tập sau, mình kể.',
      sfx: [['scratch', 0.1, 0.5], ['pop', 'fish'], ['drumroll', 'more', 0.3], ['boom', 'tl', 0.5], ['pop', 'tattoo'], ['ding', 'next', 0.5]],
      draw(k) {
        chap(k, 5, 'Vua Hùng đầu tiên');
        k.backdrop('night', { ground: G });
        k.prop('ngutinh', 420, 260, 260, { p: k.at('fish', 0.5), alpha: 0.7 * (1 - k.at('tl', 0.6)) });
        k.water(700, { amp: 10, color: '#3b6f9e' });
        k.prop('serpent', k.lerp(1900, 1100, k.at('tl', 2.5, 'out')), 860, 700, { p: k.at('tl', 0.5) });
        k.text('THUỒNG LUỒNG', 1100, 300, { size: 100, font: 'title', color: '#9fe8c8', fx: 'pop', p: k.at(k.cue('tl', 0.4), 0.5), outline: '#1b1b24', outlineWidth: 14 });
        k.char(420, 690, 360, { ...VIL('#9c6b3f', { hat: undefined }), face: 'shock', pose: 'hold', p: k.at('tattoo', 0.5), shadow: false });
        for (let i = 0; i < 3; i++) k.wave(380, 510 + i * 30, 80, { amp: 6, len: 30, stroke: '#2f5fa0', width: 4, p: k.at(k.cue('tattoo', 0.4 + i * 0.2), 0.4) });
        k.icon('question', 620, 380, 140, { p: k.at('why', 0.5) });
        stamp(k, 1450, 520, 'TẬP SAU', k.at('next', 0.5), { w: 340, size: 66, color: '#e4572e' });
      },
    },

    // ---------------- Chương 6: Giải mã ----------------
    {
      chapter: 'Giải mã: có thật 100 cái trứng?',
      say: '{decode}Giờ thì giải mã. {book}Chuyện trăm trứng được chép trong Lĩnh Nam chích quái, tập truyện cổ được biên soạn từ khoảng thế kỷ mười bốn, mười lăm. {toan}Năm 1479, sử gia Ngô Sĩ Liên đưa chuyện này vào Đại Việt sử ký toàn thư, {wai}đặt ở phần mở đầu, gọi là Ngoại kỷ. {note}Nghĩa là: câu chuyện đã được truyền miệng rất, rất lâu, trước khi có người chép thành chữ.',
      sfx: [['tada', 'decode', 0.4], ['pop', 'book'], ['pop', 'toan'], ['ding', 'wai', 0.4], ['pop', 'note']],
      draw(k) {
        chap(k, 6, 'Giải mã: có thật 100 cái trứng?');
        k.text('GIẢI MÃ', 960, 150, { size: 100, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('decode', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.prop('scroll', 520, 460, 260, { p: k.at('book', 0.5) });
        k.text('Lĩnh Nam chích quái', 520, 640, { size: 50, font: 'title', p: k.at(k.cue('book', 0.3), 1, 'linear') });
        k.text('~ thế kỷ 14–15', 520, 710, { size: 40, weight: 600, fx: 'fade', p: k.at(k.cue('book', 1.6), 0.5) });
        k.prop('scroll', 1300, 460, 260, { p: k.at('toan', 0.5) });
        k.char(1770, 760, 270, { body: 'man', outfit: 'robe', color: '#8e5bd3', color2: '#f6c344', hair: 'short', hat: 'band', beard: 'long', face: 'smug', pose: 'present', flip: true, p: k.at(k.cue('toan', 0.6), 0.5), shadow: false });
        k.text('Đại Việt sử ký toàn thư', 1300, 640, { size: 50, font: 'title', p: k.at(k.cue('toan', 0.3), 1, 'linear') });
        k.text('1479 · Ngô Sĩ Liên · phần Ngoại kỷ', 1300, 710, { size: 40, weight: 600, fx: 'fade', p: k.at('wai', 0.5) });
        for (let i = 0; i < 4; i++) k.char(300 + i * 200, 1030, 150, { ...VIL(['#9c6b3f', '#b5482c', '#6b4a2d', '#2e86de'][i]), hat: undefined, face: 'happy', pose: i % 2 ? 'present' : 'point', p: k.at(k.cue('note', i * 0.25), 0.4), shadow: false });
        for (let i = 0; i < 3; i++) k.arrow(360 + i * 200, 860, 440 + i * 200, 860, { p: k.at(k.cue('note', 0.3 + i * 0.25), 0.3), width: 4 });
        k.text('truyền miệng rất lâu → rồi mới chép', 1340, 900, { size: 44, font: 'title', fx: 'fade', p: k.at(k.cue('note', 1.2), 0.5), outline: '#fffaf0', outlineWidth: 8 });
      },
    },
    {
      say: '{word}Nhưng câu chuyện để lại một từ mà ta dùng hằng ngày: {db}đồng bào. {dong}Đồng là cùng. {bao}Bào là cái bọc. {mean}Đồng bào, nghĩa là cùng một bọc sinh ra. {call}Nên mỗi khi ai đó gọi "đồng bào ơi", là đang gọi bạn là anh em ruột, cùng một bọc trứng đấy.',
      sfx: [['pop', 'word'], ['tada', 'db', 0.5], ['pop', 'dong'], ['pop', 'bao'], ['ding', 'mean', 0.5], ['boing', 'call', 0.4]],
      draw(k) {
        chap(k, 6, 'Giải mã: có thật 100 cái trứng?');
        k.text('ĐỒNG', 640, 250, { size: 150, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('db', 0.5), outline: '#fffaf0', outlineWidth: 16 });
        k.text('BÀO', 1280, 250, { size: 150, font: 'title', color: '#b5482c', fx: 'pop', p: k.at(k.cue('db', 0.3), 0.5), outline: '#fffaf0', outlineWidth: 16 });
        k.text('= cùng', 640, 410, { size: 64, font: 'title', p: k.at('dong', 0.8, 'linear') });
        k.text('= cái bọc', 1280, 410, { size: 64, font: 'title', p: k.at('bao', 0.8, 'linear') });
        k.prop('eggsac', 1280, 600, 220, { p: k.at(k.cue('bao', 0.4), 0.5) });
        k.text('= cùng một bọc sinh ra', 760, 600, { size: 60, font: 'title', color: '#3f6f2a', p: k.at('mean', 1.3, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        k.highlight(400, 566, 720, 68, { p: k.at(k.cue('mean', 1.4), 0.5), color: '#ffe08a' });
        k.char(380, 1020, 300, { ...VIL('#2e86de', { outfit: 'tunic', hat: undefined }), face: 'shout', pose: 'shout', p: k.at('call', 0.5), shadow: false });
        say(k, 'Đồng bào ơi!', 'call', [520, 700, 360, 100], [430, 790]);
        for (let i = 0; i < 5; i++) k.char(1050 + i * 150, 1020, 200, { ...KID(i), face: 'laugh', pose: 'cheer', p: k.at(k.cue('call', 1 + i * 0.1), 0.4), bob: 3, shadow: false });
      },
    },
    {
      say: '{map}Giờ nhìn lại hình đất nước. {mt}Ba phần tư diện tích Việt Nam là đồi núi. {coast}Và một bờ biển dài hơn ba nghìn cây số. {fifty}Năm mươi con lên núi, năm mươi con xuống biển. {draw}Truyền thuyết đã "vẽ" đúng tấm bản đồ ấy, từ hàng nghìn năm trước.',
      sfx: [['pop', 'map'], ['pop', 'mt'], ['pop', ['mt', 0.3]], ['whoosh', 'coast', 0.4], ['ding', 'fifty', 0.5], ['tada', 'draw', 0.5]],
      draw(k) {
        chap(k, 6, 'Giải mã: có thật 100 cái trứng?');
        k.ctx.fillStyle = '#d6ecfa'; k.ctx.fillRect(0, 0, k.W, k.H);
        k.poly(VN.map(([lo, la]) => [mx(lo), my(la)]), { fill: '#a8d08d', width: 4, p: k.at('map', 1.4), seed: 91 });
        for (const [lo, la, s] of [[103.5, 21.9, 90], [105.3, 22.4, 80], [104.6, 20.5, 80], [105.6, 18.7, 70], [107.6, 14.6, 80], [107.9, 12.6, 70]]) k.prop('mountain', mx(lo), my(la), s, { p: k.at(k.cue('mt', (lo - 103) * 0.08), 0.4) });
        const cw = k.at('coast', 2.2);
        const coast = VN.slice(9, 30);
        coast.forEach(([lo, la], i) => { if (i % 2 === 0) k.wave(mx(lo) + 26, my(la), 60, { amp: 6, len: 24, stroke: '#2f78c4', width: 4, p: Math.max(0, Math.min(1, cw * coast.length / 2 - i / 2)) }); });
        for (const [lo, la, name, dx] of [[112, 16.5, 'Hoàng Sa', 0], [114, 10, 'Trường Sa', 0]]) {
          for (let i = 0; i < 5; i++) k.dot(mx(lo) + Math.cos(i * 1.7) * 18, my(la) + Math.sin(i * 1.7) * 12, 5, '#3f6f2a', k.at('map', 1));
          k.text(name, mx(lo) + dx, my(la) + 40, { size: 28, weight: 600, fx: 'fade', p: k.at(k.cue('map', 1), 0.5) });
        }
        k.text('¾ là đồi núi', 1600, 300, { size: 64, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('mt', 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.text('> 3.000 km bờ biển', 1600, 430, { size: 56, font: 'title', color: '#1d4f8a', fx: 'pop', p: k.at('coast', 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.text('50 ↑ núi · 50 ↓ biển', 1600, 600, { size: 56, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('fifty', 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.char(240, 980, 300, { ...AUCO, face: 'happy', pose: 'point', p: k.at('fifty', 0.5), shadow: false });
        k.char(440, 980, 320, { ...LLQ, face: 'smug', pose: 'hips', p: k.at(k.cue('fifty', 0.3), 0.5), shadow: false });
        k.burst(1700, 800, 80, 'ĐÚNG HÌNH!', { p: k.at('draw', 0.5), size: 44 });
      },
    },
    {
      say: '{many}Nhiều nhà nghiên cứu cho rằng, câu chuyện là ký ức về sự hoà hợp của nhiều cộng đồng: {up}người miền núi, {down}người miền biển và đồng bằng. {muong}Người Mường có sử thi Đẻ đất đẻ nước, cũng có chi tiết con người nở ra từ trứng. {bau}Còn nhiều dân tộc khác kể chuyện các dân tộc anh em cùng chui ra từ một quả bầu. {same}Khác chi tiết, nhưng chung một ý: chúng ta là anh em.',
      sfx: [['pop', 'many'], ['pop', 'up'], ['pop', 'down'], ['ding', 'muong', 0.4], ['boing', 'bau', 0.5], ['sparkle', 'same', 0.5]],
      draw(k) {
        chap(k, 6, 'Giải mã: có thật 100 cái trứng?');
        k.backdrop('day', { ground: G });
        k.text('nhiều cộng đồng — một câu chuyện', 960, 150, { size: 60, font: 'title', p: k.at('many', 1.4, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        const ppl = [
          ['up', { body: 'woman', outfit: 'dress', color: '#3b3b5c', color2: '#e4572e', hair: 'bun', hat: 'band' }],
          ['up', { body: 'man', outfit: 'tunic', color: '#2d3a4a', color2: '#f6c344', hair: 'short', hat: 'band' }],
          ['up', { body: 'kid', outfit: 'tunic', color: '#8e5bd3', color2: '#f6c344', hair: 'topknot' }],
          ['down', { body: 'man', outfit: 'bare', color: '#9c6b3f', color2: '#2e86de', hair: 'short', hat: 'non' }],
          ['down', { body: 'woman', outfit: 'dress', color: '#2e86de', color2: '#fffaf0', hair: 'long', hat: 'non' }],
          ['down', { body: 'kid', outfit: 'tunic', color: '#f08a24', color2: '#fffaf0', hair: 'topknot' }],
        ];
        ppl.forEach(([c, o], i) => k.char(260 + i * 280, G, o.body === 'kid' ? 220 : 300, { ...o, face: k.t > k.cue('same') ? 'laugh' : 'happy', pose: k.t > k.cue('same') ? 'cheer' : 'stand', p: k.at(k.cue(c, (i % 3) * 0.2), 0.5) }));
        k.prop('egg', 620, 420, 180, { crack: 1, hatch: k.at(k.cue('muong', 1), 0.6), p: k.at('muong', 0.5) });
        k.text('Đẻ đất đẻ nước (Mường)', 620, 570, { size: 40, font: 'title', fx: 'fade', p: k.at(k.cue('muong', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.prop('gourd', 1300, 420, 220, { p: k.at('bau', 0.5) });
        for (let i = 0; i < 3; i++) k.char(1240 + i * 60, 330, 90, { ...KID(i + 2), pose: 'cheer', p: k.at(k.cue('bau', 0.6 + i * 0.2), 0.4), shadow: false });
        k.text('quả bầu mẹ', 1300, 570, { size: 40, font: 'title', fx: 'fade', p: k.at(k.cue('bau', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.prop('heart', 960, 400, 120, { p: k.at('same', 0.5), bob: 4 });
      },
    },
    {
      say: '{dig}Còn khảo cổ học thì sao? {pn}Ở vùng trung du Phú Thọ, người ta tìm thấy dấu vết văn hoá Phùng Nguyên, cách nay khoảng bốn nghìn năm. {chain}Tiếp nối là Đồng Đậu, Gò Mun, {ds}rồi đến văn hoá Đông Sơn rực rỡ, với những chiếc trống đồng nổi tiếng. {cont}Một dòng chảy liên tục, trên chính vùng đất mà truyền thuyết gọi là Văn Lang.',
      sfx: [['pop', 'dig'], ['pop', 'pn'], ['pop', 'chain'], ['pop', ['chain', 0.6]], ['boom', 'ds', 0.4], ['sparkle', 'cont', 0.4]],
      draw(k) {
        chap(k, 6, 'Giải mã: có thật 100 cái trứng?');
        k.char(220, 980, 320, { body: 'man', outfit: 'tunic', color: '#b08a5a', color2: '#6b4a2d', hair: 'short', hat: 'non', face: 'happy', pose: 'hold', prop: 'staff', p: k.at('dig', 0.5), shadow: false });
        const y = 560;
        k.arrow(380, y, 1820, y, { p: k.at('pn', 1.2), width: 5 });
        const nodes = [['Phùng Nguyên', 'pn', 'pot', '#c98a5a', '≈ 4.000 năm trước'], ['Đồng Đậu', 'chain', 'pot', '#a8784e', ''], ['Gò Mun', ['chain', 0.6], 'pot', '#8c6a4a', ''], ['Đông Sơn', 'ds', 'drum', '#b5893c', 'trống đồng']];
        nodes.forEach(([name, c, pr, fill, sub], i) => {
          const x = 520 + i * 400; const cc = Array.isArray(c) ? k.cue(c[0], c[1]) : k.cue(c);
          k.prop(pr, x, y - 150, pr === 'drum' ? 220 : 170, { fill, p: k.at(cc, 0.5) });
          k.circle(x, y, 14, { fill: '#b5482c', width: 3, p: k.at(cc, 0.3) });
          k.text(name, x, y + 70, { size: 48, font: 'title', p: k.at(cc, 0.9, 'linear') });
          if (sub) k.text(sub, x, y + 130, { size: 36, weight: 600, fx: 'fade', p: k.at(cc + 0.6, 0.5), color: '#6b5f55' });
        });
        k.highlight(440, y - 30, 1360, 60, { p: k.at('cont', 1.2), color: '#ffe08a' });
        k.text('liên tục — trên đất "Văn Lang"', 1100, 880, { size: 54, font: 'title', color: '#b5482c', p: k.at(k.cue('cont', 0.4), 1.2, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: '{drum}Trên mặt trống đồng Ngọc Lũ, {star}chính giữa là một ngôi sao nhiều cánh. {birds}Xung quanh là những đàn chim mỏ dài bay vòng tròn, mà nhiều người gọi là chim Lạc. {feather}Người trên mặt trống đội mũ cắm lông chim, {boat}chèo những con thuyền dài. {mix}Chim của núi rừng, thuyền của sông biển, nằm chung trên một mặt trống. Nghe có quen không?',
      sfx: [['boom', 'drum', 0.4], ['sparkle', 'star', 0.5], ['whoosh', 'birds', 0.5], ['pop', 'feather'], ['pop', 'boat'], ['ding', 'mix', 0.5]],
      draw(k) {
        chap(k, 6, 'Giải mã: có thật 100 cái trứng?');
        k.prop('drumface', 600, 560, 780, { p: k.at('drum', 0.6) });
        k.text('Trống đồng Ngọc Lũ', 600, 1010, { size: 48, font: 'title', p: k.at(k.cue('drum', 0.5), 1, 'linear') });
        k.circle(600, 560, 70, { stroke: '#e4572e', width: 7, p: k.at('star', 0.7) });
        k.circle(600, 560, 330, { stroke: '#e4572e', width: 6, p: k.at('birds', 1.2) });
        k.prop('lacbird', 1420, 260, 300, { fly: true, p: k.at(k.cue('birds', 0.6), 0.5) });
        k.text('chim Lạc', 1420, 420, { size: 50, font: 'title', fx: 'pop', p: k.at(k.cue('birds', 1.6), 0.4), outline: '#fffaf0', outlineWidth: 8 });
        k.char(1260, 860, 280, { ...VIL('#b5893c'), face: 'happy', pose: 'cheer', p: k.at('feather', 0.5), shadow: false });
        k.prop('boat', 1600, 800, 340, { fill: '#b5893c', p: k.at('boat', 0.5), bob: 3 });
        k.char(1560, 790, 120, { ...VIL('#9c6b3f'), pose: 'hold', p: k.at(k.cue('boat', 0.3), 0.4), shadow: false });
        k.char(1680, 790, 120, { ...VIL('#6b4a2d'), pose: 'hold', p: k.at(k.cue('boat', 0.5), 0.4), shadow: false });
        k.text('núi + biển', 1450, 1000, { size: 64, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('mix', 0.5), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: '{today}Và cho đến hôm nay, {date}cứ mùng mười tháng ba âm lịch, người Việt khắp nơi lại hướng về Đền Hùng ở Phú Thọ. {unesco}Năm 2012, tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ được UNESCO ghi danh là di sản văn hoá phi vật thể đại diện của nhân loại. {verse}Dù ai đi ngược về xuôi, nhớ ngày giỗ Tổ mùng mười tháng ba.',
      sfx: [['gong', 'today', 0.4], ['pop', 'date'], ['ding', 'unesco', 0.5], ['sparkle', 'verse', 0.3]],
      draw(k) {
        chap(k, 6, 'Giải mã: có thật 100 cái trứng?');
        k.backdrop('dawn', { ground: G });
        k.prop('mountain', 960, 640, 900, { fill: '#8fb36b' });
        k.prop('temple', 960, 620, 440, { p: k.at('today', 0.6) });
        k.text('Đền Hùng', 960, 300, { size: 64, font: 'title', color: '#7a3b2a', fx: 'pop', p: k.at(k.cue('today', 0.6), 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.prop('calendar', 300, 330, 220, { p: k.at('date', 0.5), text: '10', label: 'THÁNG 3' });
        for (let i = 0; i < 6; i++) {
          const side = i < 3 ? -1 : 1; const j = i % 3;
          k.char(960 + side * (420 + j * 160), G, 230, { body: j === 1 ? 'woman' : 'man', outfit: j === 1 ? 'dress' : 'tunic', color: KC[i], color2: '#fffaf0', hair: j === 1 ? 'bun' : 'short', face: 'calm', pose: 'hold', flip: side > 0, p: k.at(k.cue('date', 0.6 + i * 0.15), 0.5) });
        }
        badge(k, 1580, 320, 'UNESCO · 2012', 'di sản văn hoá phi vật thể', '#2e86de', k.at('unesco', 0.5));
        cap(k, 'Dù ai đi ngược về xuôi · Nhớ ngày giỗ Tổ mùng mười tháng ba', 'verse', { size: 48, dur: 3 });
      },
    },

    // ---------------- Kết luận ----------------
    {
      chapter: 'Vậy có thật 100 cái trứng?',
      say: '{real}Vậy rốt cuộc, có thật một trăm cái trứng không? {no}Theo nghĩa đen, chắc chắn là không. {yes}Nhưng có một điều là thật: những cộng đồng ở núi, ở biển, ở đồng bằng, đã cùng nhau dựng nên một đất nước. {myth}Truyền thuyết chỉ chọn cách kể dễ nhớ nhất: một bọc, trăm con.',
      sfx: [['drumroll', 'real', 0.4], ['bonk', 'no', 0.5], ['sparkle', 'yes', 0.5], ['ding', 'myth', 0.5]],
      draw(k) {
        chap(k, 7, 'Vậy có thật 100 cái trứng?');
        k.backdrop('dawn', { ground: G });
        k.prop('eggsac', 420, 500, 320, { p: k.at('real', 0.5) });
        k.icon('cross', 420, 500, 300, { p: k.at('no', 0.4) });
        k.text('nghĩa đen', 420, 720, { size: 50, font: 'title', fx: 'fade', p: k.at('no', 0.5), outline: '#fffaf0', outlineWidth: 8 });
        k.prop('mountain', 1150, 560, 300, { p: k.at('yes', 0.5) });
        k.prop('boat', 1500, 600, 260, { p: k.at(k.cue('yes', 0.3), 0.5) });
        k.prop('stilthouse', 1760, 580, 220, { p: k.at(k.cue('yes', 0.6), 0.5) });
        k.icon('check', 1450, 330, 160, { p: k.at(k.cue('yes', 1), 0.4) });
        for (let i = 0; i < 6; i++) k.char(1000 + i * 150, G, 200, { ...KID(i, { body: i % 2 ? 'woman' : 'man', outfit: i % 2 ? 'dress' : 'tunic', hair: i % 2 ? 'bun' : 'short' }), face: 'happy', pose: 'cheer', p: k.at(k.cue('yes', 1.4 + i * 0.12), 0.4) });
        k.text('MỘT BỌC · TRĂM CON', 960, 150, { size: 84, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('myth', 0.5), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: '{promise}Còn lời hẹn của Lạc Long Quân, "khi có việc thì giúp đỡ lẫn nhau", {storm}thì mùa bão lũ nào ta cũng thấy: {help}miền xuôi gửi hàng lên miền ngược, {far}người ở xa gửi về quê nhà, {boat}những chiếc thuyền cứu hộ đi ngược dòng nước. {same}Bởi vì, chúng ta là đồng bào.',
      sfx: [['ding', 'promise', 0.4], ['whoosh', 'storm', 0.4], ['pop', 'help'], ['pop', 'far'], ['pop', 'boat'], ['sparkle', 'same', 0.5]],
      draw(k) {
        chap(k, 7, 'Vậy có thật 100 cái trứng?');
        const calm = k.at('same', 1.2);
        k.backdrop(calm > 0.5 ? 'dawn' : 'night', { ground: G });
        k.text('"có việc thì giúp nhau"', 960, 150, { size: 64, font: 'title', color: '#b5482c', p: k.at('promise', 1.4, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
        k.prop('storm', 420, 260, 300, { p: k.at('storm', 0.5), rain: 1 - calm, alpha: 1 - calm });
        k.prop('storm', 1500, 240, 280, { p: k.at(k.cue('storm', 0.3), 0.5), rain: 1 - calm, alpha: 1 - calm });
        k.water(820, { amp: 10, color: '#7a8fa6' });
        for (let i = 0; i < 3; i++) {
          const x = 260 + i * 170;
          k.char(x, 810, 220, { body: i === 1 ? 'woman' : 'man', outfit: i === 1 ? 'dress' : 'tunic', color: KC[i + 1], color2: '#fffaf0', hair: i === 1 ? 'bun' : 'short', hat: 'non', face: 'calm', pose: 'hold', p: k.at(k.cue('help', i * 0.2), 0.5), shadow: false });
          k.rect(x - 44, 600, 88, 64, { fill: '#c98a5a', width: 3, p: k.at(k.cue('help', 0.2 + i * 0.2), 0.3), seed: 300 + i });
        }
        k.prop('heart', 960, 520, 110, { p: k.at('far', 0.5), bob: 5 });
        k.text('gửi về quê', 960, 640, { size: 44, font: 'title', fx: 'fade', p: k.at('far', 0.5), outline: '#fffaf0', outlineWidth: 8 });
        const bx = k.lerp(1900, 1450, k.at('boat', 2, 'out'));
        k.prop('boat', bx, 830, 360, { fill: '#e4572e', bob: 5, p: k.at('boat', 0.3) });
        for (let i = 0; i < 2; i++) k.char(bx - 50 + i * 100, 810, 150, { body: 'man', outfit: 'tunic', color: '#f08a24', color2: '#fffaf0', hair: 'short', face: 'calm', pose: i ? 'point' : 'hold', shadow: false, p: k.at('boat', 0.3) });
        k.text('ĐỒNG BÀO', 960, 380, { size: 110, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('same', 0.6), outline: '#fffaf0', outlineWidth: 14 });
      },
    },
    {
      chapter: 'Tóm tắt',
      say: '{remind}Trước khi tóm tắt: nhớ chi tiết người Việt cổ vẽ hình lên mình nhé, tập sau cần đấy. {t}Tóm lại: {a}Lạc Long Quân giống rồng, Âu Cơ giống tiên. {b}Một bọc trăm trứng, nên ta gọi nhau là đồng bào. {c}Năm mươi lên núi, năm mươi xuống biển, đúng hình đất nước. {d}Và người con trưởng, là vua Hùng đầu tiên của nước Văn Lang.',
      sfx: [['ding', 'remind', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd']],
      draw(k) {
        k.group({ a: 1 - k.at('t', 0.4) }, () => {
          k.char(760, 760, 380, { ...VIL('#9c6b3f', { hat: undefined }), face: 'smug', pose: 'point', shadow: false });
          for (let i = 0; i < 3; i++) k.wave(715, 520 + i * 36, 90, { amp: 7, len: 32, stroke: '#2f5fa0', width: 5 });
          k.text('nhớ chi tiết này!', 1240, 460, { size: 64, font: 'title', color: '#e4572e', fx: 'pop', p: k.at(k.cue('remind', 0.5), 0.5) });
        });
        k.text('Tóm tắt', 960, 120, { size: 84, font: 'title', p: k.at('t', 0.8, 'linear') });
        const rows = [['a', 'Lạc Long Quân giống rồng, Âu Cơ giống tiên', '#1f7a8c', () => k.prop('dragon', 260, 270, 200, { p: k.at('a', 0.5) })],
          ['b', 'Một bọc trăm trứng → "đồng bào"', '#ef6f9a', () => k.prop('eggsac', 260, 470, 150, { p: k.at('b', 0.5) })],
          ['c', '50 lên núi, 50 xuống biển = hình đất nước', '#3f6f2a', () => k.prop('mountain', 260, 680, 170, { p: k.at('c', 0.5) })],
          ['d', 'Con trưởng = vua Hùng đầu tiên, nước Văn Lang', '#b5482c', () => k.char(260, 970, 190, { ...KING, face: 'happy', pose: 'stand', p: k.at('d', 0.5), shadow: false })]];
        rows.forEach(([c, t, col, art], i) => {
          art();
          k.text(t, 420, 270 + i * 210, { size: 54, font: 'title', align: 'left', color: col, p: k.at(c, 1.4, 'linear') });
        });
      },
    },
    nextEpisodeScene({
      say: '{next}Tập sau: thuồng luồng, và các thuỷ quái trong truyền thuyết Việt. {why}Vì sao người Việt cổ phải vẽ mình mới dám xuống sông? {army}Và đội quân thuỷ tộc của Thủy Tinh, liệu có thật? Hẹn bạn ở tập sau.',
      title: 'Thuồng luồng & thủy quái Việt',
      hook: 'Vì sao người Việt cổ phải vẽ mình mới dám xuống sông?',
      when: 'Tập 4 · series Truyền thuyết Hùng Vương',
      art: (k) => {
        for (let i = 0; i < 3; i++) k.wave(-460, -10 + i * 45, 920, { amp: 10, len: 110, phase: k.gt * 2 + i, stroke: '#5b9bd5', width: 5 });
        k.prop('serpent', -200, -40, 480);
        k.prop('ngutinh', 330, -30, 230, { flip: true, open: 0.6 });
      },
      sfx: [['boom', 'army', 0.4]],
    }),
    subscribeScene({
      say: 'Còn bạn, {q}nếu được chọn, bạn theo mẹ lên núi, hay theo cha xuống biển? Bình luận cho mình biết nhé. {sub}Và bấm đăng ký, bật chuông, để không lỡ tập sau về thuồng luồng!',
      question: 'Bạn theo mẹ lên núi, hay theo cha xuống biển?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
