// Tập 5 series Hùng Vương — 18 đời vua Hùng sống 2.622 năm? Giải mã nước Văn Lang (hoạt hình phẳng, tếu táo)
// Đối chiếu nguồn:
//   Đại Việt sử ký toàn thư (Ngô Sĩ Liên, 1479), Ngoại kỷ – Hồng Bàng thị: Kinh Dương Vương lên ngôi năm Nhâm Tuất (2879 TCN), con là
//     Lạc Long Quân; Hùng Vương truyền 18 đời; họ Hồng Bàng hết năm 258 TCN (Thục Phán lập Âu Lạc, xưng An Dương Vương) → 2.622 năm.
//     Đế Minh sinh Đế Nghi, rồi sinh Lộc Tục (Kinh Dương Vương); Đế Nghi trị phương Bắc, Kinh Dương Vương trị phương Nam.
//     Hùng Vương chia nước 15 bộ, đóng đô Phong Châu; tướng văn Lạc hầu, tướng võ Lạc tướng, con trai vua quan lang, con gái mỵ nương,
//     quan coi việc (hữu tư) bồ chính; đời đời cha truyền con nối gọi là phụ đạo. Thục Vương nhiều lần đánh Hùng Vương.
//   Đại Việt sử ký của Lê Văn Hưu (1272) chép bắt đầu từ Triệu Vũ Đế (Triệu Đà), không chép Hồng Bàng.
//   Giao Châu ngoại vực ký (dẫn trong Thủy kinh chú): Giao Chỉ xưa có Lạc điền, theo nước triều lên xuống; có Lạc vương, Lạc hầu, Lạc tướng.
//     H. Maspero cho rằng chữ Hùng 雄 là chép nhầm từ chữ Lạc 雒 (giả thuyết, còn tranh luận).
//   Sử học Việt Nam hiện nay: nhà nước Văn Lang ra đời khoảng thế kỷ VII TCN, tương ứng văn hoá Đông Sơn (trống đồng, lưỡi cày đồng,
//     nhà sàn, thuyền; mặt trống Ngọc Lũ có cảnh giã gạo, nhà sàn, thuyền, người đội lông chim).
//   Truyện bánh chưng bánh giầy (Lĩnh Nam chích quái; Ngữ văn 6): Hùng Vương thứ 6 sau khi phá giặc Ân muốn truyền ngôi; Lang Liêu con thứ 18,
//     mồ côi mẹ, chăm việc đồng áng; mộng thần bảo gạo quý nhất; bánh vuông tượng đất, bánh tròn tượng trời; được nối ngôi.
//   Truyện dưa hấu (Lĩnh Nam chích quái): Mai An Tiêm con nuôi vua Hùng, nói của cải là do "tiền thân" → bị đày ra bãi cát ngoài biển
//     (tương truyền vùng Nga Sơn, Thanh Hoá); chim thả hạt, trồng dưa, khắc tên thả biển, vua cho đón về. Dưa hấu gốc châu Phi; ghi chép ở
//     Trung Hoa khoảng thế kỷ X. Lĩnh Nam chích quái biên soạn khoảng thế kỷ XIV–XV.
//   Giỗ Tổ Hùng Vương 10/3 âm lịch; UNESCO ghi danh "Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ" năm 2012.
import { C } from '/engine/kit.js';
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import * as thumbs from '/videos/023-18-doi-vua-hung/thumbs.js';

const G = 880; // mặt đất
const KING = { body: 'man', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'kingfeather', beard: true, hair: 'short', cape: '#b5482c' };
const OLD = { ...KING, beard: 'long', beardColor: '#ffffff', hairColor: '#e9e4dc' };
const KDV = { body: 'man', outfit: 'robe', color: '#3f7d3a', color2: '#f6c344', hat: 'crown', beard: 'long', beardColor: '#e9e4dc', hair: 'long', hairColor: '#e9e4dc', cape: '#2f6a2c' };
const LLQ = { body: 'big', outfit: 'robe', color: '#1f7a8c', color2: '#f6c344', hair: 'long', hairColor: '#1d3f66', hat: 'crown', cape: '#155a6a' };
const DENGHI = { body: 'man', outfit: 'robe', color: '#8a3a3a', color2: '#f6c344', hat: 'crown', beard: true, hair: 'topknot' };
const LANG = (c, extra = {}) => ({ body: 'man', outfit: 'robe', color: c, color2: '#f6c344', hat: 'band', hair: 'topknot', ...extra });
const LIEU = { body: 'man', outfit: 'tunic', color: '#8a6a3a', color2: '#e8d9a8', hair: 'topknot', hat: 'feather' };
const SCHOLAR = (c) => ({ body: 'man', outfit: 'robe', color: c, color2: '#f6c344', hat: 'band', hair: 'topknot', beard: true });
const ANTIEM = { body: 'man', outfit: 'tunic', color: '#3b6ea5', color2: '#f6c344', hair: 'short', hat: 'feather' };
const VO = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'bun' };
const THAN = { body: 'man', outfit: 'robe', color: '#fffaf0', color2: '#f6c344', hair: 'bun', hairColor: '#ffffff', beard: 'long', beardColor: '#ffffff', float: true, alpha: 0.92 };
const THUC = { body: 'big', outfit: 'tunic', color: '#4a4a5a', color2: '#c9a24a', hat: 'helmet', hair: 'short', beard: true, cape: '#2b2f3d' };
const MN = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'long', hat: 'flower' };
const MASP = { body: 'man', outfit: 'tunic', color: '#4a4a5a', color2: '#9a9a9a', hair: 'short', hairColor: '#8a6a3a', beard: true, beardColor: '#8a6a3a', sleeves: true };
const DAN = (c, extra = {}) => ({ body: 'man', outfit: 'bare', color: c, color2: '#f6c344', hair: 'short', hat: 'feather', ...extra });
const ME = { body: 'man', outfit: 'bare', color: '#e4572e', color2: '#f6c344', hair: 'short', hat: 'feather', tattoo: true }; // "mình" — người dẫn ở ngôi thứ nhất
const CHIEF = { body: 'man', outfit: 'tunic', color: '#b5482c', color2: '#f6c344', hat: 'kingfeather', hair: 'topknot', beard: true };
const KC = ['#e4572e', '#2e86de', '#f6c344', '#3bb273', '#8e5bd3', '#ef6f9a', '#f08a24', '#1f7a8c'];

function cap(k, text, cue, o = {}) {
  const y = o.y ?? 995;
  const b = k.text(text, o.x ?? k.W / 2, y, { size: o.size ?? 54, font: 'title', p: k.at(cue, o.dur ?? 1.2, 'linear'), maxWidth: o.maxWidth ?? 1760, color: o.color ?? '#3b2f2a', outline: '#fffaf0', outlineWidth: 12 });
  if (o.hl) k.highlight((o.x ?? k.W / 2) - b.w / 2 - 16, y - 34, b.w + 32, 68, { p: k.at(k.cue(cue, (o.dur ?? 1.2) + 0.2), 0.5), color: o.hl });
}
function say(k, text, c, box, tail, o = {}) {
  k.bubble(box[0], box[1], box[2], box[3], tail[0], tail[1], { p: k.at(c, 0.4), text, size: o.size ?? 44, seed: o.seed, think: o.think });
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
// Tấm giấy trích sử: tiêu đề + các dòng [text, p].
function doc(k, x, y, w, h, title, lines, p, o = {}) {
  k.group({ x, y, s: Math.max(0.01, k.ease.back(Math.min(1, p))), r: o.r ?? -0.02, a: Math.min(1, p * 3) }, () => {
    k.rect(-w / 2, -h / 2, w, h, { fill: '#f6e7c1', width: 5, seed: o.seed ?? Math.round(x) });
    k.text(title, 0, -h / 2 + 56, { size: o.titleSize ?? 44, font: 'title', color: '#b5482c', maxWidth: w - 60 });
    lines.forEach((l, i) => k.text(l[0], 0, -h / 2 + 140 + i * (o.gap ?? 64), { size: o.size ?? 40, color: l[2] ?? '#3b2f2a', maxWidth: w - 70, p: l[1] ?? 1, fx: 'fade', weight: 600 }));
  });
}
// Thẻ bo góc có chữ (sơ đồ tổ chức, nhãn).
function box(k, x, y, w, h, text, p, o = {}) {
  k.group({ x, y, s: Math.max(0.01, k.ease.back(Math.min(1, p))), a: Math.min(1, p * 3) }, () => {
    k.rect(-w / 2, -h / 2, w, h, { fill: o.fill ?? '#fffaf0', fillStyle: 'solid', width: 5, seed: o.seed ?? Math.round(x + y) });
    k.text(text, 0, o.sub ? -16 : 4, { size: o.size ?? 44, font: 'title', color: o.color ?? '#3b2f2a', maxWidth: w - 30 });
    if (o.sub) k.text(o.sub, 0, 34, { size: o.subSize ?? 32, color: '#6b5f55', weight: 600, maxWidth: w - 30 });
  });
}
// Ruộng lúa: các luống xanh.
function paddy(k, y, o = {}) {
  k.rect(-40, y, k.W + 80, k.H - y + 40, { fill: o.fill ?? '#9cc06a', fillStyle: 'solid', width: 4, seed: 300 });
  for (let i = 0; i < 26; i++) for (let j = 0; j < 3; j++) {
    const x = 40 + i * 74 + (j % 2) * 30, yy = y + 40 + j * 55;
    k.line(x, yy, x - 8, yy - 26, { stroke: '#3f7d3a', width: 4, seed: 310 + i * 3 + j });
    k.line(x, yy, x + 8, yy - 24, { stroke: '#3f7d3a', width: 4, seed: 410 + i * 3 + j });
  }
}

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    title: '18 đời vua Hùng sống 2.622 năm? Giải mã nước Văn Lang',
    description: `18 đời vua Hùng mà trị vì 2.622 năm, tức mỗi vua ngồi ngai gần 146 năm? Vậy vua Hùng có thật không, hay sử đã tính nhầm?
Video này lần ngược con số 2.622 năm về tận Đại Việt sử ký toàn thư (1479), so với sách cổ Giao Châu ngoại vực ký và giả thuyết chữ Hùng – chữ Lạc, rồi dùng khảo cổ văn hoá Đông Sơn để xem nước Văn Lang thật sự ra đời khi nào. Kèm theo: truyện bánh chưng bánh giầy của Lang Liêu và sự tích dưa hấu Mai An Tiêm kể gì về đời sống người Việt thời Hùng Vương.`,
    links: [
      ['▶ Tập trước: Thuồng luồng có thật không?', '019-thuong-luong'],
      ['▶ Con Rồng Cháu Tiên: 100 trứng và nguồn gốc người Việt', '006-con-rong-chau-tien'],
      ['▶ Sơn Tinh – Thủy Tinh (đời vua Hùng thứ 18)', '004-son-tinh-thuy-tinh'],
      ['▶ Xem từ đầu series: Thánh Gióng có thật không?', '003-thanh-giong-co-that-khong'],
      ['🔔 Đăng ký Vẽ Là Hiểu', 'https://www.youtube.com/@velahiu?sub_confirmation=1'],
    ],
    footer: `📚 Nguồn tham khảo: Đại Việt sử ký toàn thư (1479) – Ngoại kỷ, Hồng Bàng thị và Thục kỷ; Đại Việt sử ký của Lê Văn Hưu (1272); Giao Châu ngoại vực ký (dẫn trong Thủy kinh chú); H. Maspero về chữ Hùng – Lạc; khảo cổ văn hoá Đông Sơn, trống đồng Ngọc Lũ; Lĩnh Nam chích quái (truyện bánh chưng, truyện dưa hấu); UNESCO (2012) – Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ.
🔔 Đăng ký Vẽ Là Hiểu để xem trọn series Truyền thuyết Hùng Vương: Thánh Gióng → Sơn Tinh – Thủy Tinh → Con Rồng Cháu Tiên → Thuồng luồng → 18 đời vua Hùng → …
💬 Tập sau: Mỵ Châu – Trọng Thủy: nỏ thần, rùa vàng và thành Cổ Loa.`,
    tags: ['18 đời vua hùng', 'vua hùng có thật không', 'hùng vương', 'nước văn lang', '2622 năm', 'thời hồng bàng', 'kinh dương vương', 'bánh chưng bánh giầy', 'lang liêu', 'mai an tiêm', 'sự tích dưa hấu', 'văn hoá đông sơn', 'trống đồng', 'giỗ tổ hùng vương', 'truyền thuyết hùng vương', 'vẽ là hiểu'],
    hashtags: ['vuahung', 'truyenthuyetvietnam', 'suviet'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '+0%',
    voices: {
      king: { voice: 'vi-VN-NamMinhNeural', pitch: '-12Hz', rate: '-6%' },
      than: { voice: 'vi-VN-NamMinhNeural', pitch: '-20Hz', rate: '-14%' },
      lang: { voice: 'vi-VN-NamMinhNeural', pitch: '+12Hz', rate: '+8%' },
      antiem: { voice: 'vi-VN-NamMinhNeural', pitch: '+6Hz', rate: '+4%' },
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
      say: '{wake}Mình thức dậy trong một ngôi nhà sàn. {field}Ngoài kia là ruộng lúa, xa hơn là sông Hồng đỏ phù sa. {pound}Tiếng chày giã gạo đã vang từ sáng sớm. {normal}Một ngày bình thường ở nước Văn Lang. {but}Chỉ có một điều không bình thường: {king}theo sử sách mà chia ra, mỗi ông vua của mình… {res}ngồi ngai một trăm bốn mươi sáu năm. {math}Mười tám đời vua, hai nghìn sáu trăm hai mươi hai năm. {ask}Vua Hùng ăn gì mà thọ thế? {sus}Hay là… có ai đó đã tính nhầm?',
      sfx: [['pop', 'wake'], ['pop', 'field'], ['click', 'pound', 0.4], ['click', ['pound', 0.45], 0.4], ['click', ['pound', 0.9], 0.4], ['ding', 'normal', 0.4], ['scratch', 'but', 0.5], ['pop', 'king'], ['slideUp', 'res', 0.5], ['boing', ['res', 1.4], 0.5], ['pop', 'math'], ['pop', 'ask'], ['scratch', 'sus', 0.5]],
      draw(k) {
        const cut = k.at('but', 0.6);
        k.group({ a: 1 - cut }, () => {
          k.backdrop('dawn', { ground: 700 });
          k.rect(-40, 690, k.W + 80, 70, { fill: '#c47a4a', fillStyle: 'solid', width: 4, seed: 700 });
          paddy(k, 760);
          k.prop('stilthouse', 480, 640, 540);
          k.char(860, 960, 380, { ...ME, face: k.t > k.cue('field') ? 'happy' : 'blank', pose: k.t > k.cue('field') ? 'point' : 'cheer', p: k.at('wake', 0.5), shadow: false });
          k.text('mình', 860, 520, { size: 46, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('wake', 0.4) * (1 - k.at('field', 0.4)), outline: '#fffaf0', outlineWidth: 10 });
          const up = Math.sin(k.gt * 7) > 0;
          k.char(1420, 960, 330, { ...VO, face: 'happy', pose: up ? 'cheer' : 'hold', p: k.at('pound', 0.4), shadow: false });
          k.prop('pot', 1520, 940, 120, { p: k.at('pound', 0.4) });
          k.text('NƯỚC VĂN LANG', 960, 150, { size: 90, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('normal', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        });
        k.group({ a: cut }, () => {
          const old = k.at('res', 1.2, 'inOut');
          k.text('≈ 146 năm / vua', 560, 300, { size: 110, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('res', 0.6), outline: '#fffaf0', outlineWidth: 14 });
          k.text('18 vua · 2.622 năm', 560, 470, { size: 80, font: 'title', fx: 'pop', p: k.at('math', 0.5), outline: '#fffaf0', outlineWidth: 12 });
          box(k, 560, 680, 560, 110, 'Lên ngôi: 20 tuổi', k.at('king', 0.5), { size: 50 });
          box(k, 560, 820, 560, 110, 'Thoái vị: 166 tuổi', k.at(k.cue('res', 1), 0.5), { size: 50, color: '#c0392b', fill: '#ffe9d6' });
          const o = old > 0.5 ? OLD : KING;
          k.char(1420, 980, 600, { ...o, prop: old > 0.5 ? 'staff' : undefined, lean: old * 0.08, face: k.t > k.cue('sus') ? 'smug' : k.t > k.cue('ask') ? 'shock' : old > 0.5 ? 'blank' : 'happy', pose: k.t > k.cue('ask') ? 'shrug' : old > 0.5 ? 'hold' : 'wave', p: k.at('king', 0.5), bob: 2 });
          k.sweat(1500, 470, 1.2, { p: k.at('ask', 0.4) });
          say(k, 'Vua Hùng ăn gì mà thọ thế?', 'ask', [1040, 90, 620, 120], [1350, 300]);
          k.burst(1000, 930, 110, 'TÍNH NHẦM?', { p: k.at('sus', 0.5), size: 40 });
        });
      },
    },
    {
      say: 'Đây là tập năm trong series Truyền thuyết Hùng Vương. {prev}Ở tập Con Rồng Cháu Tiên, mình đã hứa sẽ giải mã con số này. {prev2}Tập thuồng luồng, mình còn dặn bạn nhớ kỹ nó. {today}Hôm nay, trả nợ. {sub}Nếu bạn mới đến, đăng ký kênh nhé, các tập trước đang chờ bạn ở cuối video.',
      sfx: [['pop', 0.3], ['pop', 'prev'], ['pop', 'prev2'], ['tada', 'today', 0.5], ['ding', 'sub', 0.5]],
      draw(k) {
        k.text('SERIES TRUYỀN THUYẾT HÙNG VƯƠNG · TẬP 5', 960, 120, { size: 54, font: 'title', color: '#b5482c', p: k.at(0.2, 1.4, 'linear') });
        const cards = [
          ['prev', 'Tập 3 · Con Rồng Cháu Tiên', () => { k.char(-90, 130, 240, { ...LLQ, face: 'smug', pose: 'point', shadow: false }); k.prop('egg', 110, 90, 120); k.text('2.622?', 110, -80, { size: 56, font: 'title', color: '#b5482c' }); }],
          ['prev2', 'Tập 4 · Thuồng luồng', () => { k.prop('thuongluong', 0, 20, 340, { glow: true, open: 0.6 }); }],
          ['today', 'Tập 5 · 18 đời vua Hùng', () => { k.char(-110, 140, 250, { ...OLD, face: 'shock', pose: 'shrug', shadow: false }); k.text('2.622', 110, -40, { size: 80, font: 'title', color: '#f6c344' }); k.text('÷ 18', 110, 50, { size: 60, font: 'title', color: '#fffaf0' }); }],
        ];
        cards.forEach(([c, title, art], i) => {
          const x = 380 + i * 580, y = 520;
          const p = k.at(c, 0.6, 'back');
          k.group({ x, y, s: Math.max(0.01, p), r: (i - 1) * 0.03 }, () => {
            k.rect(-260, -200, 520, 400, { fill: i === 2 ? '#2b2f3d' : '#fffaf0', width: 6, seed: 40 + i, p: p > 0 ? 1 : 0 });
            art();
            k.text(title, 0, 250, { size: 40, font: 'title', color: i === 2 ? '#b5482c' : '#3b2f2a', outline: '#fffaf0', outlineWidth: 8 });
          });
        });
        k.text('TRẢ NỢ!', 1540, 270, { size: 64, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('today', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        stamp(k, 960, 930, 'ĐĂNG KÝ XEM TRỌN BỘ', k.at('sub', 0.5), { w: 640, size: 46 });
      },
    },
    {
      say: 'Hôm nay: {title}mười tám đời vua Hùng, có thật đã kéo dài hai nghìn sáu trăm năm? {q1}Con số ấy từ đâu ra? {q2}Nước Văn Lang thật sự trông thế nào? {q3}Và chiếc bánh chưng, quả dưa hấu, kể gì về đời sống ông cha? {decode}Mình cùng giải mã.',
      sfx: [['tada', 'title', 0.5], ['pop', 'q1'], ['pop', 'q2'], ['pop', 'q3'], ['ding', 'decode', 0.5]],
      draw(k) {
        k.backdrop('sunset', { ground: G });
        k.prop('palace', 520, 700, 620, { p: k.at('title', 0.8) });
        k.char(560, G, 420, { ...KING, face: 'smug', pose: 'present', p: k.at('title', 0.6) });
        k.text('18 đời vua Hùng sống 2.622 năm?', 960, 140, { size: 96, font: 'title', color: '#b5482c', p: k.at('title', 1.4, 'linear'), outline: '#fffaf0', outlineWidth: 16 });
        [['q1', 'Con số từ đâu ra?'], ['q2', 'Văn Lang thật ra sao?'], ['q3', 'Bánh chưng, dưa hấu?']].forEach(([c, t], i) => {
          k.icon('question', 1100, 330 + i * 120, 90, { p: k.at(c, 0.5) });
          k.text(t, 1170, 330 + i * 120, { size: 58, font: 'title', align: 'left', p: k.at(c, 1, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        });
        k.prop('banhchung', 1300, 790, 150, { p: k.at('q3', 0.4) });
        k.prop('watermelon', 1500, 800, 150, { p: k.at(k.cue('q3', 0.6), 0.4) });
        k.burst(1720, 770, 90, 'GIẢI MÃ', { p: k.at('decode', 0.5), size: 44 });
      },
    },

    // ---------------- Chương 1: Con số 2.622 từ đâu ra? ----------------
    {
      chapter: 'Con số 2.622 từ đâu ra?',
      say: 'Con số này nằm trong {toan}Đại Việt sử ký toàn thư, bộ sử do Ngô Sĩ Liên hoàn thành năm 1479. {start}Sách chép: Kinh Dương Vương lên ngôi năm Nhâm Tuất, {bc}tức năm 2879 trước Công nguyên. {end}Họ Hồng Bàng kết thúc năm 258 trước Công nguyên, {thuc}khi Thục Phán lập ra nước Âu Lạc. {count}Đếm từ năm đầu đến năm cuối: {res}hai nghìn sáu trăm hai mươi hai năm.',
      sfx: [['pop', 'toan'], ['pop', 'start'], ['ding', 'bc', 0.4], ['pop', 'end'], ['pop', 'thuc'], ['drumroll', 'count', 0.3], ['tada', 'res', 0.5]],
      draw(k) {
        doc(k, 960, 220, 860, 260, 'ĐẠI VIỆT SỬ KÝ TOÀN THƯ', [['Ngô Sĩ Liên · hoàn thành năm 1479', k.at('toan', 0.8)]], k.at('toan', 0.5), { r: 0, size: 44 });
        k.arrow(260, 740, 1660, 740, { width: 8, p: k.at('start', 1.6, 'linear') });
        k.line(300, 710, 300, 770, { width: 6, p: k.at('start', 0.3) });
        k.line(1600, 710, 1600, 770, { width: 6, p: k.at('end', 0.3) });
        k.char(300, 690, 260, { ...KDV, face: 'smug', pose: 'wave', p: k.at('start', 0.5), shadow: false });
        k.text('2879 TCN', 300, 830, { size: 54, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('bc', 0.5) });
        k.text('Kinh Dương Vương', 300, 900, { size: 40, font: 'title', fx: 'fade', p: k.at('start', 0.6) });
        k.char(1600, 690, 260, { ...THUC, face: 'calm', pose: 'hips', p: k.at('thuc', 0.5), shadow: false, flip: true });
        k.text('258 TCN', 1600, 830, { size: 54, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('end', 0.5) });
        k.text('Thục Phán → Âu Lạc', 1600, 900, { size: 40, font: 'title', fx: 'fade', p: k.at('thuc', 0.6) });
        k.curve([[320, 640], [960, 520], [1580, 640]], { width: 5, stroke: '#e4572e', p: k.at('count', 1) });
        k.text('2.622 năm', 960, 560, { size: 120, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('res', 0.6), outline: '#fffaf0', outlineWidth: 16 });
      },
    },
    {
      say: 'Mà khoan, {fine}một chi tiết nhỏ mà quan trọng: {all}hai nghìn sáu trăm hai mươi hai năm là của cả họ Hồng Bàng, {kdv}tính luôn Kinh Dương Vương {llq}và Lạc Long Quân, {who}tức ông nội và bố của vua Hùng đầu tiên. {twenty}Vậy phải chia cho hai mươi người. {res}Mỗi người… một trăm ba mươi mốt năm. {better}Có đỡ hơn không? {no}Không. Không đỡ lắm.',
      sfx: [['scratch', 'fine', 0.4], ['pop', 'all'], ['pop', 'kdv'], ['pop', 'llq'], ['pop', 'twenty'], ['ding', 'res', 0.5], ['pop', 'better'], ['wahwah', 'no', 0.5]],
      draw(k) {
        k.text('HỌ HỒNG BÀNG', 960, 110, { size: 72, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('all', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.char(200, 640, 330, { ...KDV, face: 'smug', pose: 'wave', p: k.at('kdv', 0.5) });
        k.text('Kinh Dương Vương', 200, 700, { size: 30, font: 'title', fx: 'fade', p: k.at('kdv', 0.5) });
        k.char(500, 640, 360, { ...LLQ, face: 'happy', pose: 'hips', p: k.at('llq', 0.5) });
        k.text('Lạc Long Quân', 500, 700, { size: 30, font: 'title', fx: 'fade', p: k.at('llq', 0.5) });
        k.text('ông nội', 200, 250, { size: 40, font: 'title', color: '#6b5f55', fx: 'pop', p: k.at('who', 0.4) });
        k.text('bố', 500, 230, { size: 40, font: 'title', color: '#6b5f55', fx: 'pop', p: k.at(k.cue('who', 0.4), 0.4) });
        for (let i = 0; i < 18; i++) {
          const r = Math.floor(i / 9), c = i % 9;
          k.char(720 + c * 128, 400 + r * 250, 180, { ...KING, color: KC[i % KC.length], face: 'calm', pose: 'stand', p: k.at(k.cue('all', 0.3 + i * 0.05), 0.3), shadow: false });
        }
        k.text('+ 18 đời Hùng Vương', 1230, 720, { size: 44, font: 'title', fx: 'fade', p: k.at('all', 1) });
        k.text('2.622 ÷ 20 ≈ 131 năm / người', 960, 860, { size: 80, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('res', 0.6), outline: '#fffaf0', outlineWidth: 14 });
        stamp(k, 1600, 990, 'KHÔNG ĐỠ LẮM', k.at('no', 0.5), { w: 480, size: 50 });
      },
    },
    {
      say: [
        'Để dễ hình dung: {h1}nếu một vị vua trị vì một trăm ba mươi năm, {lh}thì một vị Lạc hầu, phục vụ đúng một đời vua thôi, {retire}cũng đã kịp về hưu… ba lần. {prince}Còn thái tử chờ nối ngôi, {wait}chờ từ lúc tóc xanh đến lúc tóc bạc, {still}vẫn chưa thấy bố nhường ghế.',
        { v: 'lang', text: '{ask}Bố ơi… bao giờ bố nghỉ ạ?' },
        { v: 'king', text: '{soon}Sắp rồi con. Tầm trăm năm nữa.' },
      ],
      sfx: [['pop', 'h1'], ['pop', 'lh'], ['ding', 'retire', 0.4], ['ding', ['retire', 0.5], 0.4], ['ding', ['retire', 1], 0.4], ['pop', 'prince'], ['slideDown', 'wait', 0.4], ['pop', 'ask'], ['boing', 'soon', 0.5], ['wahwah', ['soon', 1.6], 0.4]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.prop('palace', 960, 640, 560, { alpha: 0.9 });
        k.char(860, G, 470, { ...OLD, prop: 'staff', face: k.t > k.cue('soon') ? 'smug' : 'calm', pose: 'hold', p: k.at('h1', 0.5) });
        k.icon('clock', 1700, 230, 160, { p: k.at('wait', 0.5), rotate: k.gt * 2 * k.at('wait', 0.3) });
        k.char(270, G, 360, { ...SCHOLAR('#3d6fa8'), face: k.t > k.cue('retire') ? 'laugh' : 'calm', pose: k.t > k.cue('retire') ? 'cheer' : 'stand', p: k.at('lh', 0.5) });
        k.text('Lạc hầu', 270, 940, { size: 44, font: 'title', fx: 'fade', p: k.at('lh', 0.5) });
        [0, 0.5, 1].forEach((d, i) => k.text(`VỀ HƯU #${i + 1}`, 270, 300 + i * 90, { size: 46, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at(k.cue('retire', d), 0.4), outline: '#fffaf0', outlineWidth: 8 }));
        const gray = k.at('wait', 2, 'inOut');
        k.char(1360, G, 420, { ...LANG('#2e86de'), hairColor: gray > 0.5 ? '#e9e4dc' : '#3a2a20', beard: gray > 0.5 ? 'long' : false, beardColor: '#e9e4dc', lean: gray * 0.06, face: k.t > k.cue('soon') ? 'shock' : gray > 0.5 ? 'sad' : 'happy', pose: k.t > k.cue('ask') ? 'shrug' : 'stand', p: k.at('prince', 0.5) });
        k.text('thái tử', 1360, 940, { size: 44, font: 'title', fx: 'fade', p: k.at('prince', 0.5) });
        say(k, 'Bố ơi… bao giờ bố nghỉ ạ?', 'ask', [1140, 120, 520, 120], [1340, 400]);
        say(k, 'Tầm trăm năm nữa.', 'soon', [560, 160, 440, 110], [820, 400]);
        k.sweat(1430, 500, 1.2, { p: k.at('soon', 0.4) });
      },
    },

    // ---------------- Chương 2: Vì sao sử chép như vậy? ----------------
    {
      chapter: 'Vì sao sử chép như vậy?',
      say: 'Vậy sao lại có con số ấy? {lvh}Năm 1272, sử gia Lê Văn Hưu viết bộ quốc sử đầu tiên mà ta còn biết tên, {trieu}và ông bắt đầu chép từ Triệu Đà. {nohb}Không có dòng nào về họ Hồng Bàng. {nsl}Hai trăm năm sau, Ngô Sĩ Liên mới đưa thời Hồng Bàng vào chính sử, {src}dựa trên những truyện kể dân gian, như Lĩnh Nam chích quái.',
      sfx: [['pop', 'lvh'], ['pop', 'trieu'], ['bonk', 'nohb', 0.5], ['whoosh', 'nsl', 0.4], ['pop', 'src']],
      draw(k) {
        k.char(170, 900, 380, { ...SCHOLAR('#3d6fa8'), face: 'calm', pose: 'present', p: k.at('lvh', 0.5) });
        doc(k, 620, 440, 560, 420, 'Đại Việt sử ký · 1272', [['Lê Văn Hưu', k.at('lvh', 0.8)], ['bắt đầu: Triệu Đà', k.at('trieu', 0.8)], ['Hồng Bàng: không chép', k.at('nohb', 0.8), '#c0392b']], k.at('lvh', 0.5), { titleSize: 42 });
        k.icon('cross', 620, 610, 100, { p: k.at(k.cue('nohb', 0.3), 0.4) });
        k.char(1760, 900, 380, { ...SCHOLAR('#8e5bd3'), face: 'smug', pose: 'present', flip: true, p: k.at('nsl', 0.5) });
        doc(k, 1300, 440, 560, 420, 'Toàn thư · 1479', [['Ngô Sĩ Liên', k.at('nsl', 0.8)], ['+ thêm Hồng Bàng thị', k.at(k.cue('nsl', 1), 0.8), '#3f6f2a'], ['nguồn: truyện dân gian', k.at('src', 0.8)]], k.at('nsl', 0.5), { titleSize: 42, r: 0.02 });
        k.arrow(800, 880, 1120, 880, { width: 6, p: k.at('nsl', 1) });
        k.text('≈ 200 năm sau', 960, 930, { size: 50, font: 'title', fx: 'fade', p: k.at('nsl', 0.8) });
        k.prop('scroll', 1300, 140, 120, { p: k.at('src', 0.5) });
        k.text('Lĩnh Nam chích quái', 1300, 225, { size: 36, font: 'title', fx: 'fade', p: k.at('src', 0.6), outline: '#fffaf0', outlineWidth: 8 });
      },
    },
    {
      say: 'Và Ngô Sĩ Liên đặt năm khởi đầu ở đâu? {nghi}Sách chép, Kinh Dương Vương là anh em với Đế Nghi, một vị vua huyền thoại của phương Bắc. {split}Anh cai quản phương Bắc, em cai quản phương Nam. {mean}Nhiều nhà nghiên cứu cho rằng: đặt ông tổ nước Nam ngang hàng với vua phương Bắc, {msg}là một cách nói: nước ta cũng lâu đời, chẳng kém ai. {joke}Kiểu như hàng xóm khoe nhà xây từ thời ông cố, {joke2}thì nhà mình phải có gia phả… từ thời ông cố của ông cố.',
      sfx: [['pop', 'nghi'], ['whoosh', 'split', 0.4], ['ding', 'mean', 0.4], ['tada', 'msg', 0.4], ['pop', 'joke'], ['slideDown', 'joke2', 0.5], ['boing', ['joke2', 2.6], 0.5]],
      draw(k) {
        const j = k.at('joke', 0.5);
        k.group({ a: 1 - j }, () => {
          k.line(960, 160, 960, 900, { width: 5, stroke: '#6b5f55', p: k.at('split', 0.6) });
          k.text('PHƯƠNG BẮC', 520, 150, { size: 60, font: 'title', color: '#8a3a3a', fx: 'pop', p: k.at('split', 0.5) });
          k.text('PHƯƠNG NAM', 1400, 150, { size: 60, font: 'title', color: '#3f7d3a', fx: 'pop', p: k.at('split', 0.5) });
          k.char(560, 800, 460, { ...DENGHI, face: 'calm', pose: 'hips', p: k.at('nghi', 0.5) });
          k.text('Đế Nghi', 560, 870, { size: 48, font: 'title', fx: 'fade', p: k.at('nghi', 0.5) });
          k.char(1360, 800, 460, { ...KDV, face: 'smug', pose: 'hips', flip: true, p: k.at('nghi', 0.5) });
          k.text('Kinh Dương Vương', 1360, 870, { size: 48, font: 'title', fx: 'fade', p: k.at('nghi', 0.5) });
          stamp(k, 960, 470, 'NGANG HÀNG', k.at('mean', 0.5), { w: 460, size: 64, r: -0.08 });
          cap(k, 'nước ta cũng lâu đời, chẳng kém ai', 'msg', { y: 990, hl: '#ffe08a' });
        });
        k.group({ a: j }, () => {
          k.backdrop('day', { ground: G });
          k.prop('stilthouse', 420, 640, 460);
          k.prop('stilthouse', 1500, 640, 460);
          k.char(700, G, 360, { ...DAN('#2e86de'), face: 'smug', pose: 'point', flip: true });
          say(k, 'Nhà tôi xây từ thời ông cố!', 'joke', [180, 120, 640, 120], [620, 520]);
          k.char(1080, G, 360, { ...DAN('#e4572e'), face: 'smug', pose: 'hold' });
          const unroll = k.at('joke2', 1.8, 'out');
          k.rect(1170, 560, 160, 20 + unroll * 330, { fill: '#f6e7c1', fillStyle: 'solid', width: 4, seed: 501 });
          for (let i = 0; i < 6; i++) k.line(1190, 600 + i * 50, 1310, 600 + i * 50, { stroke: '#b9a37a', width: 3, seed: 510 + i, p: unroll > i / 6 ? 1 : 0 });
          say(k, 'Gia phả nhà tôi: từ ông cố của ông cố!', 'joke2', [1000, 120, 760, 130], [1100, 520], { size: 40 });
        });
      },
    },
    {
      say: 'Còn số mười tám? {nine}Để ý nhé: truyện xưa của ta rất thích số chín. {ele}Voi chín ngà, {roo}gà chín cựa, {hor}ngựa chín hồng mao. {double}Mười tám, là hai lần chín. {sym}Có ý kiến cho rằng mười tám là một con số tượng trưng, {means}nghĩa là: rất nhiều, rất lâu, {not}chứ không phải bản danh sách đếm từng người.',
      sfx: [['pop', 'nine'], ['pop', 'ele'], ['pop', 'roo'], ['pop', 'hor'], ['tada', 'double', 0.4], ['ding', 'sym', 0.4], ['bonk', 'not', 0.4]],
      draw(k) {
        k.text('SỐ 9 ĐẸP', 960, 120, { size: 80, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('nine', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.prop('elephant', 440, 400, 340, { tusks: 9, p: k.at('ele', 0.5) });
        k.prop('rooster', 960, 400, 300, { spurs: 9, p: k.at('roo', 0.5) });
        k.prop('horse', 1480, 400, 340, { manes: 9, p: k.at('hor', 0.5) });
        [['ele', 'voi 9 ngà', 440], ['roo', 'gà 9 cựa', 960], ['hor', 'ngựa 9 hồng mao', 1480]].forEach(([c, t, x]) => k.text(t, x, 620, { size: 46, font: 'title', fx: 'fade', p: k.at(c, 0.6) }));
        k.text('18 = 9 × 2', 960, 790, { size: 130, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('double', 0.6), outline: '#fffaf0', outlineWidth: 16 });
        cap(k, '18 = "rất nhiều, rất lâu" (tượng trưng)', 'means', { y: 980, hl: '#ffe08a' });
      },
    },
    {
      say: 'Cách giải thích thứ hai: {branch}chữ "đời" ở đây có thể là một ngành, một chi, {many}mỗi ngành gồm nhiều vị vua nối nhau, cùng xưng là Hùng Vương. {pho}Giống như quán phở gia truyền: {g1}ông nội mở quán, {g2}bố nối nghiệp, {g3}con nối tiếp, {sign}ba đời người, vẫn chỉ một tấm biển: Phở Hùng.',
      sfx: [['pop', 'branch'], ['pop', 'many'], ['pop', 'pho'], ['pop', 'g1'], ['pop', 'g2'], ['pop', 'g3'], ['tada', 'sign', 0.5]],
      draw(k) {
        k.rect(90, 180, 760, 700, { fill: '#fffaf0', width: 5, seed: 520, p: k.at('branch', 0.5) });
        k.text('1 "đời" = 1 ngành?', 470, 250, { size: 60, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('branch', 0.5) });
        for (let i = 0; i < 4; i++) {
          const x = 200 + i * 180;
          k.char(x, 700, 300, { ...KING, color: KC[i + 2], face: 'happy', pose: 'stand', p: k.at(k.cue('many', i * 0.2), 0.4), shadow: false });
        }
        k.text('cùng xưng: Hùng Vương', 470, 830, { size: 44, font: 'title', color: '#b5482c', fx: 'fade', p: k.at('many', 1) });
        // quán phở
        const ps = k.at('pho', 0.6, 'back');
        k.group({ x: 1400, y: 300, s: Math.max(0.01, ps), r: -0.02 }, () => {
          k.rect(-400, -90, 800, 180, { fill: '#c0392b', fillStyle: 'solid', width: 6, seed: 530 });
          k.text('PHỞ HÙNG', 0, -12, { size: 88, font: 'title', color: '#fff3c4' });
          k.text('gia truyền', 0, 58, { size: 40, font: 'title', color: '#fffaf0' });
        });
        k.icon('star', 1400, 160, 80, { p: k.at('sign', 0.4) });
        k.char(1130, 900, 360, { ...LANG('#6b4a2d'), hat: undefined, beard: 'long', beardColor: '#ffffff', hairColor: '#e9e4dc', face: 'happy', pose: 'present', p: k.at('g1', 0.5) });
        k.char(1400, 900, 380, { ...LANG('#2e86de'), hat: undefined, beard: true, face: 'smug', pose: 'hips', p: k.at('g2', 0.5) });
        k.char(1670, 900, 330, { ...LANG('#3bb273'), hat: undefined, face: 'laugh', pose: 'wave', p: k.at('g3', 0.5) });
        [['g1', 'ông', 1130], ['g2', 'bố', 1400], ['g3', 'con', 1670]].forEach(([c, t, x]) => k.text(t, x, 960, { size: 44, font: 'title', fx: 'fade', p: k.at(c, 0.5) }));
      },
    },
    {
      say: 'Cách thứ ba, {third}đơn giản nhất: {oral}những chuyện này được kể bằng miệng suốt hơn một nghìn năm, rồi mới có người chép lại. {game}Bạn chơi trò truyền tin chưa? {ten}Chỉ qua tám người thôi, {last}câu cuối đã khác hẳn câu đầu rồi. {thousand}Huống chi là hơn một nghìn năm.',
      sfx: [['pop', 'third'], ['pop', 'oral'], ['pop', 'game'], ['whoosh', 'ten', 0.4], ['boing', 'last', 0.6], ['wahwah', 'thousand', 0.4]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.text('hơn 1.000 năm kể miệng', 960, 110, { size: 70, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('oral', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        const pass = k.at('ten', 3.2, 'linear');
        for (let i = 0; i < 8; i++) {
          const x = 160 + i * 228;
          const on = pass * 8 > i;
          k.char(x, G, 300, { ...DAN(KC[i]), face: i === 7 && k.t > k.cue('last') ? 'laugh' : on ? 'shock' : 'calm', pose: i === 0 ? 'present' : 'stand', p: k.at(k.cue('game', i * 0.06), 0.4), shadow: false, bob: on ? 3 : 0 });
          k.dot(x + 60, 560, 10, '#e4572e', i < 7 && Math.abs(pass * 8 - i - 0.5) < 0.5 ? 1 : 0);
        }
        say(k, 'Nhà Hùng làm vua rất lâu…', 'game', [40, 220, 560, 120], [170, 520], { size: 40 });
        say(k, 'Mỗi vua sống 146 năm!', 'last', [1320, 220, 560, 120], [1760, 520], { size: 40 });
        k.burst(1600, 700, 70, '?!', { p: k.at('thousand', 0.4) * (1 - k.at(k.cue('thousand', 2), 0.3)), size: 50 });
      },
    },

    // ---------------- Chương 3: Văn Lang thật ra trông thế nào? ----------------
    {
      chapter: 'Văn Lang thật ra thế nào?',
      say: 'Muốn biết hai nghìn sáu trăm năm sai đến đâu, phải xem nước Văn Lang thật ra trông thế nào. {rule}Toàn thư chép: vua Hùng chia nước làm mười lăm bộ, {cap}đóng đô ở Phong Châu. {lh}Tướng văn gọi là Lạc hầu, {lt}tướng võ gọi là Lạc tướng. {ql}Con trai vua gọi là quan lang, {mn}con gái gọi là mỵ nương. {bc}Quan coi việc gọi là bồ chính. {pd}Và các chức ấy, đời đời cha truyền con nối. {org}Nghe như sơ đồ một công ty gia đình: {ceo}giám đốc là bố, {mgr}trưởng phòng là chú bác, {kids}còn con cháu thì… đương nhiên là quản lý.',
      sfx: [['pop', 'rule'], ['pop', 'cap'], ['pop', 'lh'], ['pop', 'lt'], ['pop', 'ql'], ['pop', 'mn'], ['pop', 'bc'], ['ding', 'pd', 0.4], ['pop', 'org'], ['pop', 'ceo'], ['pop', 'mgr'], ['boing', 'kids', 0.6]],
      draw(k) {
        k.text('VĂN LANG · 15 bộ · kinh đô Phong Châu', 960, 90, { size: 52, font: 'title', color: '#b5482c', p: k.at('rule', 1.4, 'linear') });
        box(k, 960, 230, 440, 120, 'HÙNG VƯƠNG', k.at('rule', 0.5), { size: 56, fill: '#ffe08a', sub: k.t > k.cue('ceo') ? '= giám đốc' : undefined });
        const row2 = [['lh', 'Lạc hầu', 'tướng văn', 620], ['lt', 'Lạc tướng', 'tướng võ', 1300]];
        const row3 = [['ql', 'Quan lang', 'con trai vua', 380], ['mn', 'Mỵ nương', 'con gái vua', 960], ['bc', 'Bồ chính', 'quan coi việc', 1540]];
        row2.forEach(([c, t, s, x]) => { k.line(960, 290, x, 400, { width: 4, p: k.at(c, 0.4) }); box(k, x, 460, 400, 130, t, k.at(c, 0.5), { sub: k.t > k.cue('mgr') ? '= chú bác' : s, size: 50 }); });
        row3.forEach(([c, t, s, x]) => { k.line(x < 960 ? 620 : x > 960 ? 1300 : 960, 525, x, 640, { width: 4, p: k.at(c, 0.4) }); box(k, x, 700, 400, 130, t, k.at(c, 0.5), { sub: k.t > k.cue('kids') && x < 1500 ? '= "quản lý"' : s, size: 50 }); });
        stamp(k, 960, 880, 'CHA TRUYỀN CON NỐI', k.at('pd', 0.5), { w: 640, size: 52, r: -0.05 });
        cap(k, 'công ty gia đình?', 'org', { y: 1010, x: 1560, size: 50, hl: '#ffe08a' });
      },
    },
    {
      say: 'Đó là trên giấy. Còn ngoài đời thì sao? {try}Giờ mình thử sống một ngày ở Văn Lang, chỉ bằng những gì các nhà khảo cổ đã tìm thấy. {morn}Sáng sớm, mình vác lưỡi cày bằng đồng ra ruộng; loại lưỡi cày này được đào lên ở nhiều di chỉ văn hoá Đông Sơn. {noon}Trưa về, giã gạo bằng chày, đúng như cảnh khắc trên mặt trống đồng Ngọc Lũ. {aft}Chiều, chèo thuyền dài trên sông, cũng là hình trên mặt trống. {eve}Tối, về ngôi nhà sàn mái cong.',
      sfx: [['pop', 'try'], ['pop', 'morn'], ['click', 'noon', 0.4], ['click', ['noon', 0.45], 0.4], ['whoosh', 'aft', 0.4], ['sparkle', 'eve', 0.4]],
      draw(k) {
        const w = [1 - k.at('noon', 0.6), k.at('noon', 0.6) * (1 - k.at('aft', 0.6)), k.at('aft', 0.6) * (1 - k.at('eve', 0.6)), k.at('eve', 0.6)];
        k.backdrop('dawn', { ground: 760 });
        k.group({ a: k.at('noon', 0.6) }, () => k.backdrop('day', { ground: 760 }));
        k.group({ a: k.at('aft', 0.6) }, () => k.backdrop('sunset', { ground: 760 }));
        k.group({ a: k.at('eve', 0.6) }, () => k.backdrop('night', { ground: 760 }));
        const clock = ['SÁNG SỚM', 'TRƯA', 'CHIỀU', 'TỐI'];
        k.text('MỘT NGÀY CỦA MÌNH Ở VĂN LANG', 960, 100, { size: 64, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('try', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        clock.forEach((c, i) => k.text(c, 260, 220, { size: 60, font: 'title', color: '#fff3c4', p: w[i] * k.at('morn', 0.4), fx: 'fade', outline: '#3b2f2a', outlineWidth: 10 }));
        const tag = (text, i) => k.group({ a: w[i] * k.at('morn', 0.4) }, () => box(k, 1500, 230, 680, 100, text, 1, { size: 36, fill: '#fff3c4' }));
        // sáng: ra đồng với lưỡi cày đồng
        k.group({ a: w[0] }, () => {
          paddy(k, 760);
          k.char(900, 960, 380, { ...ME, face: 'happy', pose: 'hold', walk: true, p: k.at('morn', 0.4), shadow: false });
          k.prop('plough', 1010, 800, 120, { p: k.at('morn', 0.4), rotate: 0.5 });
          tag('lưỡi cày đồng · di chỉ Đông Sơn', 0);
        });
        // trưa: giã gạo
        k.group({ a: w[1] }, () => {
          k.prop('stilthouse', 420, 640, 480);
          const up = Math.sin(k.gt * 7) > 0;
          k.char(900, G, 380, { ...ME, face: 'laugh', pose: up ? 'cheer' : 'hold', shadow: false });
          k.char(1180, G, 340, { ...VO, face: 'happy', pose: up ? 'hold' : 'cheer', shadow: false });
          k.prop('pot', 1040, 860, 130);
          k.prop('drumface', 1600, 620, 300, { spin: 0.1 });
          tag('cảnh giã gạo · trống Ngọc Lũ', 1);
        });
        // chiều: chèo thuyền
        k.group({ a: w[2] }, () => {
          k.water(760, { color: '#4f7fb0', alpha: 0.9 });
          const bx = 700 + 300 * k.at('aft', 4, 'linear');
          k.prop('boat', bx, 800, 420, { fill: '#c98a3a', bob: 5 });
          k.char(bx, 780, 260, { ...ME, face: 'happy', pose: 'hold', prop: 'rod', shadow: false });
          tag('thuyền dài · trống Ngọc Lũ', 2);
        });
        // tối: nhà sàn
        k.group({ a: w[3] }, () => {
          k.prop('moon', 1600, 220, 160);
          k.prop('stilthouse', 900, 600, 640);
          k.char(1300, G, 340, { ...ME, face: 'smug', pose: 'wave', shadow: false });
          tag('nhà sàn mái cong · trống Ngọc Lũ', 3);
        });
      },
    },
    {
      say: '{fest}Còn ngày hội, mình đội mũ cắm lông chim, đánh trống đồng. {eat}Ăn gì? Chủ yếu là cơm, có lẽ thêm cá và rau. {boss}Còn ông vua của mình, nhiều khả năng là thủ lĩnh đứng đầu các làng trồng lúa, {gold}chứ không phải hoàng đế ngồi cung điện dát vàng như trên phim. {real}Văn Lang không lộng lẫy. Nhưng rất thật.',
      sfx: [['boom', 'fest', 0.4], ['boom', ['fest', 0.5], 0.4], ['pop', 'eat'], ['pop', 'boss'], ['wahwah', 'gold', 0.4], ['tada', 'real', 0.4]],
      draw(k) {
        const e = k.at('eat', 0.6);
        k.group({ a: 1 - e }, () => {
          k.backdrop('day', { ground: G });
          k.prop('drum', 960, 790, 300, { shake: 0 });
          for (let i = 0; i < 4; i++) {
            const x = [300, 560, 1360, 1620][i];
            k.char(x, G, 320, { ...DAN(KC[i]), hat: 'feather', face: 'laugh', pose: Math.sin(k.gt * 5 + i) > 0 ? 'cheer' : 'wave', bob: 6, shadow: false, p: k.at(k.cue('fest', i * 0.1), 0.4) });
          }
          k.char(760, G, 360, { ...ME, hat: 'feather', face: 'laugh', pose: Math.sin(k.gt * 8) > 0 ? 'point' : 'cheer', shadow: false });
          k.text('NGÀY HỘI', 960, 160, { size: 90, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('fest', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        });
        k.group({ a: e }, () => {
          k.backdrop('day', { ground: G });
          k.prop('xoi', 330, 560, 220, { p: k.at('eat', 0.5) });
          k.prop('fish', 560, 600, 150, { p: k.at(k.cue('eat', 0.6), 0.4) });
          k.text('cơm · có lẽ thêm cá, rau', 450, 720, { size: 44, font: 'title', fx: 'fade', p: k.at('eat', 0.6), outline: '#fffaf0', outlineWidth: 8 });
          k.char(1100, G, 440, { ...CHIEF, face: 'smug', pose: 'hips', p: k.at('boss', 0.5) });
          k.text('thủ lĩnh các làng lúa', 1100, 950, { size: 44, font: 'title', fx: 'fade', p: k.at('boss', 0.5), outline: '#fffaf0', outlineWidth: 8 });
          for (let i = 0; i < 3; i++) k.char(1380 + i * 150, G, 240, { ...DAN(KC[i + 4]), face: 'happy', pose: 'stand', shadow: false, p: k.at('boss', 0.5) });
          k.group({ a: k.at('gold', 0.4) * (1 - k.at('real', 0.4)) }, () => {
            k.rect(1320, 160, 480, 330, { fill: '#fff3c4', fillStyle: 'solid', width: 5, seed: 720 });
            k.prop('palace', 1560, 330, 260, { fill: '#f6c344' });
            k.text('cung điện vàng', 1560, 450, { size: 36, font: 'title' });
            k.icon('cross', 1560, 320, 220, { p: k.at(k.cue('gold', 0.6), 0.4) });
          });
          stamp(k, 1560, 330, 'RẤT THẬT', k.at('real', 0.5), { w: 420, size: 70, color: '#3f6f2a' });
        });
      },
    },
    {
      say: 'Vậy Văn Lang ra đời khi nào? {sgk}Các nhà sử học ngày nay cho rằng: khoảng thế kỷ thứ bảy trước Công nguyên. {to}Đến năm 258 trước Công nguyên, {sum}là chừng ba, bốn trăm năm. {vs}Đặt cạnh con số của Toàn thư, {long}thì thanh hai nghìn sáu trăm năm phải dài thêm… ba màn hình nữa. {calc}Giờ thử lấy mười tám đời, mỗi đời chừng hai mươi lăm năm: {res}bốn trăm năm mươi năm. {close}Không xa lắm! {care}Tất nhiên, đó chỉ là một phép thử vui, không phải bằng chứng. {point}Nhưng nó cho thấy: con số mười tám đời không hề vô lý. {only}Chỉ có hai nghìn sáu trăm năm là… hơi hào phóng.',
      sfx: [['pop', 'sgk'], ['pop', 'to'], ['ding', 'sum', 0.4], ['pop', 'vs'], ['slideDown', 'long', 0.5], ['drumroll', 'calc', 0.3], ['tada', 'res', 0.5], ['ding', 'close', 0.4], ['wahwah', 'only', 0.5]],
      draw(k) {
        k.text('Sử học ngày nay', 400, 150, { size: 46, font: 'title', align: 'left', color: '#3f6f2a', fx: 'fade', p: k.at('sgk', 0.5) });
        k.rect(400, 200, 1100 * k.at('to', 1.2), 90, { fill: '#3bb273', fillStyle: 'solid', width: 5, seed: 560, p: k.at('sgk', 0.3) > 0 ? 1 : 0 });
        k.text('~ thế kỷ VII TCN', 400, 330, { size: 40, font: 'title', fx: 'fade', p: k.at('sgk', 0.5) });
        k.text('258 TCN', 1500, 330, { size: 40, font: 'title', fx: 'fade', p: k.at('to', 0.5) });
        k.text('≈ 300–400 năm', 950, 246, { size: 50, font: 'title', color: '#fffaf0', fx: 'pop', p: k.at('sum', 0.5) });
        const lg = k.at('vs', 1.4, 'out');
        k.text('Toàn thư: 2.622 năm', 1500, 430, { size: 46, font: 'title', align: 'right', color: '#b5482c', fx: 'fade', p: k.at('vs', 0.5) });
        k.rect(1500 - 7200 * lg, 470, 7200 * lg, 90, { fill: '#e4572e', fillStyle: 'solid', width: 5, seed: 561, p: lg > 0 ? 1 : 0 });
        k.text('← còn dài thêm 3 màn hình nữa…', 90, 610, { size: 46, font: 'title', align: 'left', color: '#c0392b', fx: 'pop', p: k.at('long', 0.5) });
        k.text('18 đời × 25 năm ≈ 450 năm', 840, 780, { size: 76, font: 'title', fx: 'pop', p: k.at('res', 0.6), outline: '#fffaf0', outlineWidth: 12 });
        k.icon('check', 1580, 780, 130, { p: k.at('close', 0.5) });
        k.text('(phép thử vui, không phải bằng chứng)', 840, 870, { size: 38, color: '#6b5f55', weight: 600, fx: 'fade', p: k.at('care', 0.6) });
        cap(k, '2.622 năm thì… hơi hào phóng', 'only', { y: 990, hl: '#ffd2c2' });
      },
    },
    {
      say: 'Mà khoan. {end}Nước Văn Lang không kéo dài mãi. {north}Ở vùng núi phía bắc, có một thủ lĩnh người Âu Việt, tên là Thục Phán. {weapon}Và về sau, trong truyền thuyết, ông sẽ có trong tay một thứ vũ khí khiến cả thiên hạ phải nể: {bow}một cái nỏ thần. {remember}Nhớ cái tên Thục Phán nhé. Tập sau, ông là nhân vật chính.',
      sfx: [['scratch', 'end', 0.4], ['boom', 'north', 0.4], ['drumroll', 'weapon', 0.3], ['sparkle', 'bow', 0.6], ['ding', 'remember', 0.4]],
      draw(k) {
        k.backdrop('sunset', { ground: G });
        k.prop('mountain', 1400, 560, 900, { alpha: 0.9 });
        k.vignette(0.3);
        const rise = k.at('north', 1, 'out');
        k.char(1400, G, 560, { ...THUC, face: 'smug', pose: k.t > k.cue('bow') ? 'present' : 'hips', flip: true, p: rise, alpha: 0.4 + 0.6 * rise });
        k.prop('crossbow', 860, 600, 300, { glow: true, p: k.at('bow', 0.6), bob: 6 });
        k.text('THỤC PHÁN', 1400, 160, { size: 110, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('north', 0.5), outline: '#2b2f3d', outlineWidth: 16 });
        k.text('nỏ thần', 860, 440, { size: 60, font: 'title', color: '#f6c344', fx: 'pop', p: k.at('bow', 0.5), outline: '#2b2f3d', outlineWidth: 10 });
        for (let i = 0; i < 3; i++) k.char(220 + i * 170, G, 280, { ...DAN(KC[i]), face: k.t > k.cue('north') ? 'shock' : 'calm', pose: 'stand', p: k.at(0.2, 0.5), shadow: false });
        stamp(k, 450, 380, 'NHỚ TÊN NÀY!', k.at('remember', 0.5), { w: 480, size: 58 });
      },
    },

    // ---------------- Chương 4: Bánh chưng ----------------
    {
      chapter: 'Bánh chưng: cuộc thi nối ngôi',
      say: 'Mở đầu video, mình hỏi: vua Hùng ăn gì mà thọ thế? {now}Truyện xưa có hẳn một thực đơn. Món đầu tiên là bánh chưng, món mình đã hẹn từ tập Sơn Tinh, và nó gắn với đúng chuyện nối ngôi: mười tám đời ấy truyền cho nhau thế nào. {king6}Tương truyền, đời vua Hùng thứ sáu, sau khi đánh tan giặc Ân, {giong}đúng đời Thánh Gióng đấy, {old}vua đã già, muốn chọn người nối ngôi. {rule}Đề bài: ai dâng lễ vật làm vừa ý Tiên vương, người ấy được làm vua. {any}Không kể con trưởng hay con thứ.',
      sfx: [['pop', 'now'], ['pop', 'king6'], ['pop', 'giong'], ['pop', 'old'], ['tada', 'rule', 0.5], ['ding', 'any', 0.4]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.prop('palace', 1500, 640, 600);
        k.char(1380, G, 470, { ...OLD, face: k.t > k.cue('rule') ? 'smug' : 'calm', pose: k.t > k.cue('rule') ? 'present' : 'stand', flip: true, p: k.at('king6', 0.5) });
        k.text('VUA HÙNG THỨ 6', 1380, 150, { size: 72, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('king6', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        const pg = k.at('giong', 0.5, 'back');
        k.group({ x: 300, y: 230, s: Math.max(0.01, pg), r: -0.05, a: Math.min(1, pg * 3) * (1 - k.at('rule', 0.4)) }, () => {
          k.rect(-200, -130, 400, 260, { fill: '#2b2f3d', width: 5, seed: 570 });
          k.prop('horse', 0, -10, 200, { fire: true });
          k.text('đời Thánh Gióng!', 0, 100, { size: 40, font: 'title', color: '#f6c344' });
        });
        doc(k, 640, 330, 680, 330, 'ĐỀ BÀI NỐI NGÔI', [['Dâng lễ vừa ý Tiên vương', k.at('rule', 0.8)], ['→ được làm vua', k.at(k.cue('rule', 0.8), 0.6), '#3f6f2a'], ['(không kể con trưởng, con thứ)', k.at('any', 0.6), '#6b5f55']], k.at('rule', 0.5), { size: 38 });
        for (let i = 0; i < 5; i++) k.char(160 + i * 200, G, 300 + (i % 2) * 20, { ...LANG(KC[i]), face: k.t > k.cue('any') ? 'shock' : 'happy', pose: 'stand', p: k.at(k.cue('old', i * 0.1), 0.4), shadow: false });
      },
    },
    {
      say: 'Thế là {rich}các lang đua nhau tìm của ngon vật lạ, {sea}sơn hào, hải vị. {mc}Một cuộc thi MasterChef hoàng gia, {budget}ngân sách không giới hạn. {ll}Chỉ có một người ngồi buồn: Lang Liêu, {n18}con trai thứ mười tám. {again}Mười tám, lại là mười tám! {poor}Lang Liêu mồ côi mẹ từ nhỏ, chỉ biết chăm việc đồng áng, {rice}trong nhà chẳng có gì ngoài lúa gạo.',
      sfx: [['pop', 'rich'], ['pop', 'sea'], ['tada', 'mc', 0.5], ['cash', 'budget', 0.5], ['slideDown', 'll', 0.4], ['pop', 'n18'], ['boing', 'again', 0.6], ['wahwah', 'rice', 0.4]],
      draw(k) {
        k.backdrop('day', { ground: G });
        const sb = k.at('mc', 0.6, 'back');
        k.group({ x: 620, y: 140, s: Math.max(0.01, sb), r: -0.02 }, () => {
          k.rect(-480, -80, 960, 160, { fill: '#2b2f3d', fillStyle: 'solid', width: 6, seed: 580 });
          k.text('MASTERCHEF VĂN LANG', 0, -10, { size: 66, font: 'title', color: '#f6c344' });
          k.text('ngân sách: không giới hạn', 0, 50, { size: 34, font: 'title', color: '#fffaf0', fx: 'fade', p: k.at('budget', 0.5) });
        });
        const dishes = [['fish', 220], ['crab', 470], ['meat', 720], ['elephant', 970]];
        dishes.forEach(([d, x], i) => {
          k.char(x, G, 330, { ...LANG(KC[i]), face: 'smug', pose: 'present', p: k.at(k.cue('rich', i * 0.15), 0.4), shadow: false });
          k.prop(d, x + 30, 470, d === 'elephant' ? 150 : 120, { p: k.at(k.cue('sea', i * 0.15), 0.4) });
        });
        k.char(1550, G, 360, { ...LIEU, face: 'sad', pose: 'think', p: k.at('ll', 0.5) });
        k.text('Lang Liêu', 1550, 940, { size: 46, font: 'title', fx: 'fade', p: k.at('ll', 0.5) });
        k.text('con thứ 18', 1550, 1000, { size: 40, font: 'title', color: '#b5482c', fx: 'fade', p: k.at('n18', 0.5) });
        k.burst(1740, 360, 100, 'LẠI 18!', { p: k.at('again', 0.4) * (1 - k.at('poor', 0.4)), size: 42 });
        k.icon('rice', 1330, 760, 130, { p: k.at('rice', 0.5) });
        k.prop('cloud', 1560, 360, 220, { p: k.at('poor', 0.5), fill: '#9a9a9a', alpha: 0.85 });
      },
    },
    {
      say: [
        '{dream}Một đêm, Lang Liêu nằm mộng, thấy một vị thần hiện ra, bảo:',
        { v: 'than', text: '{god}Trong trời đất, không gì quý bằng hạt gạo.' },
        '{make}Tỉnh dậy, chàng lấy gạo nếp, {square}gói bánh vuông, tượng trưng cho đất. {round}Giã xôi làm bánh tròn, tượng trưng cho trời. {win}Vua cha nếm thử, khen ngon, {throne}và truyền ngôi cho Lang Liêu.',
      ],
      sfx: [['sparkle', 'dream', 0.5], ['ding', 'god', 0.4], ['pop', 'make'], ['pop', 'square'], ['pop', 'round'], ['tada', 'win', 0.5], ['sparkle', 'throne', 0.5]],
      draw(k) {
        const day = k.at('make', 0.6);
        k.group({ a: 1 - day }, () => {
          k.backdrop('night', { ground: G });
          k.char(560, G, 380, { ...LIEU, face: 'blank', pose: 'stand' });
          k.dot(1240, 460, 300, '#fff3c4', 0.25 * k.at('dream', 0.8));
          k.char(1240, 760, 460, { ...THAN, face: 'calm', pose: 'present', p: k.at('dream', 0.8), bob: 6 });
          say(k, 'Không gì quý bằng hạt gạo.', 'god', [700, 130, 620, 120], [1080, 420]);
          k.icon('rice', 900, 540, 120, { p: k.at('god', 0.5) });
        });
        k.group({ a: day }, () => {
          k.backdrop('day', { ground: G });
          k.prop('palace', 1520, 640, 560);
          k.prop('banhchung', 620, 300, 240, { p: k.at('square', 0.5) });
          k.text('vuông = ĐẤT', 620, 440, { size: 56, font: 'title', color: '#3f7d3a', fx: 'pop', p: k.at('square', 0.5), outline: '#fffaf0', outlineWidth: 10 });
          k.prop('banhday', 1000, 310, 220, { p: k.at('round', 0.5) });
          k.text('tròn = TRỜI', 1000, 440, { size: 56, font: 'title', color: '#2e86de', fx: 'pop', p: k.at('round', 0.5), outline: '#fffaf0', outlineWidth: 10 });
          k.char(280, G, 360, { ...LIEU, hat: k.t > k.cue('throne') ? 'crown' : 'feather', face: k.t > k.cue('throne') ? 'laugh' : 'happy', pose: k.t > k.cue('throne') ? 'cheer' : 'present' });
          k.char(1380, G, 450, { ...OLD, face: k.t > k.cue('win') ? 'laugh' : 'calm', pose: k.t > k.cue('win') ? 'point' : 'stand', flip: true });
          say(k, 'Ngon!', 'win', [1180, 230, 240, 110], [1340, 440]);
          k.burst(300, 400, 80, 'NỐI NGÔI!', { p: k.at('throne', 0.5), size: 34 });
        });
      },
    },
    {
      say: 'Giải mã nào. {who}Trong truyện, người thắng không phải người mang món đắt nhất, {but}mà là người hiểu giá trị của hạt gạo. {nation}Với một nước sống bằng lúa nước, {msg}đó là thông điệp rất rõ: lúa gạo là gốc. {tet}Và đến tận hôm nay, mỗi dịp Tết, nhà nhà vẫn gói bánh chưng. {joke}Một cuộc thi nấu ăn mà món thắng giải được nấu lại tới tận bây giờ, {champ}thì đúng là… vô địch.',
      sfx: [['pop', 'who'], ['ding', 'but', 0.4], ['pop', 'nation'], ['tada', 'msg', 0.4], ['sparkle', 'tet', 0.5], ['pop', 'joke'], ['tada', 'champ', 0.5]],
      draw(k) {
        k.rect(100, 120, 760, 560, { fill: '#f3e3e0', width: 5, seed: 590, p: k.at('who', 0.5) });
        k.text('món đắt nhất', 480, 190, { size: 54, font: 'title', color: '#c0392b', fx: 'pop', p: k.at('who', 0.5) });
        k.prop('crab', 330, 400, 180, { p: k.at('who', 0.5) });
        k.prop('elephant', 600, 400, 230, { p: k.at('who', 0.5) });
        k.icon('cross', 480, 400, 260, { p: k.at(k.cue('who', 1.2), 0.4) });
        k.rect(1060, 120, 760, 560, { fill: '#e3f0dc', width: 5, seed: 591, p: k.at('but', 0.5) });
        k.text('hạt gạo', 1440, 190, { size: 54, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('but', 0.5) });
        k.icon('rice', 1440, 420, 280, { p: k.at('but', 0.5) });
        k.icon('check', 1640, 560, 130, { p: k.at('msg', 0.4) });
        cap(k, 'lúa gạo là gốc', 'msg', { y: 770, size: 70, color: '#3f6f2a', hl: '#ffe08a' });
        for (let i = 0; i < 5; i++) k.prop('banhchung', 380 + i * 120, 920 - (i % 2) * 20, 120, { p: k.at(k.cue('tet', i * 0.15), 0.4) });
        k.text('Tết hôm nay', 560, 1030, { size: 40, font: 'title', fx: 'fade', p: k.at('tet', 0.5) });
        stamp(k, 1440, 930, 'VÔ ĐỊCH', k.at('champ', 0.5), { w: 420, size: 72, color: '#d4a017' });
      },
    },

    // ---------------- Chương 5: Mai An Tiêm ----------------
    {
      chapter: 'Mai An Tiêm và quả dưa',
      say: [
        'Món thứ hai trong thực đơn thời vua Hùng là một loại quả. {ant}Và nó bắt đầu từ chuyện một người bị đày ra đảo hoang: Mai An Tiêm. {adopt}Tương truyền, An Tiêm là con nuôi của vua Hùng, được vua rất quý. {said}Nhưng có lần, chàng nói thẳng:',
        { v: 'antiem', text: '{line}Của cải con có được, là nhờ tiền thân của con mà có.' },
        '{explain}Tiền thân, tức là do kiếp trước, chứ không phải nhờ vua ban. {angry}Vua nổi giận.',
        { v: 'king', text: '{test}Được. Để xem tiền thân có nuôi nổi con không!' },
        '{exile}Thế là cả nhà An Tiêm bị đày ra một bãi cát giữa biển.',
      ],
      sfx: [['pop', 'ant'], ['pop', 'adopt'], ['pop', 'said'], ['scratch', 'explain', 0.4], ['boom', 'angry', 0.5], ['bonk', 'test', 0.4], ['whoosh', 'exile', 0.5]],
      draw(k) {
        const ex = k.at('exile', 0.6);
        k.group({ a: 1 - ex }, () => {
          k.backdrop('day', { ground: G });
          k.prop('palace', 1450, 640, 560);
          k.char(1380, G, 460, { ...KING, face: k.t > k.cue('angry') ? 'angry' : 'happy', pose: k.t > k.cue('test') ? 'point' : k.t > k.cue('angry') ? 'hips' : 'stand', flip: true, p: k.at('adopt', 0.5) });
          k.char(680, G, 400, { ...ANTIEM, face: k.t > k.cue('angry') ? 'shock' : 'smug', pose: k.t > k.cue('angry') ? 'shrug' : k.t > k.cue('line') ? 'present' : 'stand', p: k.at('ant', 0.5) });
          k.text('Mai An Tiêm', 680, 940, { size: 46, font: 'title', fx: 'fade', p: k.at('ant', 0.5) });
          k.text('con nuôi vua Hùng', 680, 1000, { size: 38, color: '#6b5f55', weight: 600, fx: 'fade', p: k.at('adopt', 0.5) });
          say(k, 'Nhờ tiền thân mà có!', 'line', [200, 160, 520, 120], [600, 430]);
          say(k, 'Để xem tiền thân có nuôi nổi con không!', 'test', [1000, 110, 620, 140], [1320, 400], { size: 40 });
          k.burst(1560, 420, 70, 'HỪM!', { p: k.at('angry', 0.4) * (1 - k.at('test', 0.3)), size: 40 });
        });
        k.group({ a: ex }, () => {
          k.backdrop('day', { ground: 2000 });
          k.water(640, { color: '#4f8fc4' });
          k.prop('island', 960, 600, 700);
          k.prop('boat', 600 + 300 * k.at('exile', 2.5, 'inOut'), 700, 300, { fill: '#c98a3a', bob: 5 });
          k.text('ĐÀY RA BÃI CÁT', 960, 150, { size: 80, font: 'title', color: '#b5482c', fx: 'pop', p: k.at(k.cue('exile', 0.4), 0.5), outline: '#fffaf0', outlineWidth: 12 });
        });
      },
    },
    {
      say: 'Trên đảo, {birds}An Tiêm thấy chim thả xuống những hạt lạ. {plant}Chàng đem trồng, {grow}mọc lên một giống quả vỏ xanh, ruột đỏ, ngọt mát. {carve}An Tiêm khắc tên mình lên vỏ, {float}thả xuống biển. {ship}Thuyền buôn vớt được, đem về bán, {news}tin đến tai vua. {back}Vua hối hận, cho đón cả nhà về. {name}Và đó là sự tích quả dưa hấu. {where}Tương truyền, bãi cát ấy ở vùng Nga Sơn, Thanh Hoá ngày nay.',
      sfx: [['whoosh', 'birds', 0.4], ['pop', 'plant'], ['sparkle', 'grow', 0.5], ['scratch', 'carve', 0.5], ['whoosh', 'float', 0.4], ['pop', 'ship'], ['ding', 'news', 0.4], ['tada', 'back', 0.5], ['pop', 'name'], ['pop', 'where']],
      draw(k) {
        k.backdrop('day', { ground: 2000 });
        k.water(820, { color: '#4f8fc4' });
        k.prop('island', 700, 760, 1100);
        for (let i = 0; i < 3; i++) {
          const fx = k.at(k.cue('birds', i * 0.3), 2.4, 'linear');
          k.prop('bird', 1900 - fx * 1700, 200 + i * 60 + Math.sin(k.gt * 3 + i) * 10, 90, { fly: true, phase: i, flip: true, p: fx > 0 && fx < 1 ? 1 : 0 });
          k.dot(1900 - fx * 1700, 240 + i * 60 + (fx > 0.5 ? (fx - 0.5) * 600 : 0), 8, '#3b2f2a', fx > 0.5 && fx < 0.95 ? 1 : 0);
        }
        k.char(470, 640, 300, { ...ANTIEM, face: k.t > k.cue('back') ? 'laugh' : k.t > k.cue('grow') ? 'happy' : 'calm', pose: k.t > k.cue('back') ? 'cheer' : k.t > k.cue('carve') ? 'present' : 'point', shadow: false });
        k.char(320, 640, 270, { ...VO, face: k.t > k.cue('grow') ? 'happy' : 'sad', pose: 'stand', shadow: false });
        for (let i = 0; i < 3; i++) k.prop('watermelon', [600, 920, 1030][i], 620, 110, { p: k.at(k.cue('grow', i * 0.2), 0.5) });
        k.prop('watermelon', 900, 470, 160, { slice: true, p: k.at('grow', 0.5) * (1 - k.at('carve', 0.3)) });
        const fl = k.at('float', 3, 'linear');
        k.prop('watermelon', 1000 + fl * 500, 830, 130, { text: 'AN TIÊM', p: k.at('carve', 0.5), bob: 6, rotate: Math.sin(k.gt * 2) * 0.1 });
        k.prop('boat', 2100 - 520 * k.at('ship', 1.5, 'out'), 810, 320, { fill: '#8a5a35', bob: 5, flip: true });
        k.char(2100 - 520 * k.at('ship', 1.5, 'out'), 790, 220, { ...DAN('#f08a24', { outfit: 'tunic', hat: 'non' }), face: 'shock', pose: 'point', shadow: false, flip: true });
        k.text('SỰ TÍCH DƯA HẤU', 960, 120, { size: 76, font: 'title', color: '#3f8a3a', fx: 'pop', p: k.at('name', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.text('(tương truyền: Nga Sơn, Thanh Hoá)', 960, 210, { size: 40, font: 'title', fx: 'fade', p: k.at('where', 0.5), outline: '#fffaf0', outlineWidth: 8 });
      },
    },
    {
      say: 'Nhưng khoan, {sci}các nhà thực vật học có một tin hơi phũ: {africa}dưa hấu có nguồn gốc từ châu Phi. {china}Ghi chép về dưa hấu ở Trung Hoa, phải đến khoảng thế kỷ thứ mười mới xuất hiện. {lnck}Còn truyện An Tiêm thì được chép trong Lĩnh Nam chích quái, khoảng thế kỷ mười bốn, mười lăm. {maybe}Nên rất có thể, quả "dưa" ban đầu trong chuyện kể là một loại quả khác, {update}và người kể đời sau đã… cập nhật thực đơn theo trái cây thời mình. {point}Nhưng ý nghĩa thì giữ nguyên: tự tay lao động, thì ở đâu cũng sống được.',
      sfx: [['scratch', 'sci', 0.5], ['pop', 'africa'], ['pop', 'china'], ['pop', 'lnck'], ['pop', 'maybe'], ['scratch', 'update', 0.5], ['boing', ['update', 1.6], 0.5], ['sparkle', 'point', 0.5]],
      draw(k) {
        k.text('TIN HƠI PHŨ', 960, 100, { size: 70, font: 'title', color: '#c0392b', fx: 'pop', p: k.at('sci', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        const nodes = [['africa', 'châu Phi', 'quê gốc', 300], ['china', 'Trung Hoa', '~ thế kỷ X', 960], ['lnck', 'Lĩnh Nam chích quái', '~ thế kỷ XIV–XV', 1620]];
        nodes.forEach(([c, t, s, x], i) => {
          k.prop('watermelon', x, 300, 180, { slice: i === 0, p: k.at(c, 0.5) });
          k.text(t, x, 440, { size: 50, font: 'title', fx: 'pop', p: k.at(c, 0.5) });
          k.text(s, x, 500, { size: 40, color: '#6b5f55', weight: 700, fx: 'fade', p: k.at(c, 0.6) });
          if (i < 2) k.arrow(x + 170, 300, x + 490, 300, { width: 5, p: k.at(nodes[i + 1][0], 0.5) });
        });
        // người chép sách sửa thực đơn
        doc(k, 760, 760, 620, 300, 'THỰC ĐƠN AN TIÊM', [['quả … (?)', k.at('maybe', 0.6)], ['→ dưa hấu', k.at('update', 0.6), '#3f8a3a']], k.at('maybe', 0.5), { size: 48 });
        k.line(650, 752, 870, 752, { stroke: '#c0392b', width: 6, p: k.at('update', 0.4) });
        k.char(1260, 1010, 330, { ...SCHOLAR('#8e5bd3'), face: 'smug', pose: 'point', flip: true, p: k.at('maybe', 0.5) });
        say(k, 'Cập nhật cho hợp thời!', 'update', [1360, 600, 460, 110], [1300, 760], { size: 38 });
        cap(k, 'tự tay lao động, ở đâu cũng sống được', 'point', { y: 1035, size: 46, hl: '#ffe08a', x: 760, maxWidth: 1100 });
      },
    },

    // ---------------- Chương 6: Hồi kết Văn Lang ----------------
    {
      chapter: 'Đời thứ 18: hồi kết',
      say: 'Và rồi, đến đời vua Hùng thứ mười tám. {mn}Đây chính là đời có nàng Mỵ Nương, {st}và cuộc chiến Sơn Tinh, Thủy Tinh mà bạn đã xem. {thuc}Theo Toàn thư, Thục Phán nhiều lần đem quân đánh Văn Lang. {y258}Năm 258 trước Công nguyên, nước Văn Lang kết thúc. {aulac}Thục Phán xưng An Dương Vương, lập nước Âu Lạc, {name}ghép tên hai nhóm Âu Việt và Lạc Việt. {cont}Nhưng người Lạc Việt vẫn ở đó, ruộng lúa vẫn ở đó. Chỉ có tên nước là đổi.',
      sfx: [['pop', 'mn'], ['pop', 'st'], ['boom', 'thuc', 0.4], ['gong', 'y258', 0.5], ['pop', 'aulac'], ['pop', 'name'], ['sparkle', 'cont', 0.4]],
      draw(k) {
        k.backdrop('day', { ground: 760 });
        paddy(k, 760);
        const pc = k.at('mn', 0.5, 'back');
        k.group({ x: 330, y: 260, s: Math.max(0.01, pc), r: -0.04, a: Math.min(1, pc * 3) }, () => {
          k.rect(-250, -170, 500, 340, { fill: '#fffaf0', width: 5, seed: 600 });
          k.char(-90, 120, 240, { ...MN, face: 'happy', pose: 'stand', shadow: false });
          k.prop('mountain', 100, 40, 160);
          k.prop('storm', 110, -70, 120);
          k.text('Tập 2 · Sơn Tinh – Thủy Tinh', 0, 210, { size: 34, font: 'title', outline: '#fffaf0', outlineWidth: 8 });
        });
        k.char(1560, 760, 440, { ...THUC, face: 'smug', pose: 'point', flip: true, p: k.at('thuc', 0.5) });
        const sw = k.at('aulac', 0.6);
        k.text('VĂN LANG', 960, 200, { size: 110, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('st', 0.5) * (1 - sw), outline: '#fffaf0', outlineWidth: 14 });
        k.text('ÂU LẠC', 960, 200, { size: 110, font: 'title', color: '#4a4a5a', fx: 'pop', p: sw, outline: '#fffaf0', outlineWidth: 14 });
        k.text('= Âu Việt + Lạc Việt', 960, 310, { size: 52, font: 'title', fx: 'fade', p: k.at('name', 0.6), outline: '#fffaf0', outlineWidth: 10 });
        stamp(k, 960, 470, '258 TCN', k.at('y258', 0.5), { w: 380, size: 70, color: '#4a4a5a', r: -0.06 });
        for (let i = 0; i < 4; i++) k.char(380 + i * 220, 900, 260, { ...DAN(KC[i]), face: k.t > k.cue('cont') ? 'happy' : 'calm', pose: k.t > k.cue('cont') ? 'wave' : 'hold', shadow: false, p: k.at('cont', 0.5), bob: 2 });
      },
    },

    // ---------------- Chương 7: Vua Hùng có thật không? ----------------
    {
      chapter: 'Vua Hùng có thật không?',
      say: 'Còn câu hỏi lớn nhất: {q}vua Hùng có thật không? {old}Một sách cổ của Trung Hoa, Giao Châu ngoại vực ký, có chép về vùng đất này, từ trước khi thành quận huyện: {field}có ruộng Lạc, theo nước triều lên xuống mà cày cấy, {lv}và có Lạc vương, Lạc hầu, Lạc tướng.',
      sfx: [['drumroll', 'q', 0.3], ['pop', 'old'], ['pop', 'field'], ['ding', 'lv', 0.5]],
      draw(k) {
        k.text('Vua Hùng có thật không?', 960, 100, { size: 84, font: 'title', p: k.at('q', 1, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
        doc(k, 560, 540, 820, 600, 'GIAO CHÂU NGOẠI VỰC KÝ', [['(sách cổ Trung Hoa)', k.at('old', 0.6), '#6b5f55'], ['"…đất có ruộng Lạc,', k.at('field', 0.8)], ['theo nước triều lên xuống…', k.at(k.cue('field', 0.8), 0.8)], ['có Lạc vương, Lạc hầu,', k.at('lv', 0.8)], ['Lạc tướng…"', k.at(k.cue('lv', 0.6), 0.6)]], k.at('old', 0.5), { gap: 80, size: 44 });
        ['雒王', '雒侯', '雒將'].forEach((t, i) => k.text(t, 1180 + i * 260, 360, { size: 90, color: '#b5482c', fx: 'pop', p: k.at(k.cue('lv', i * 0.3), 0.4), weight: 700 }));
        ['Lạc vương', 'Lạc hầu', 'Lạc tướng'].forEach((t, i) => k.text(t, 1180 + i * 260, 470, { size: 36, font: 'title', fx: 'fade', p: k.at(k.cue('lv', i * 0.3), 0.5) }));
        k.rect(1110, 640, 640, 320, { fill: '#9cc06a', fillStyle: 'solid', width: 4, seed: 610, p: k.at('field', 0.4) > 0 ? 1 : 0, alpha: k.at('field', 0.4) });
        const tide = 0.5 + 0.5 * Math.sin(k.gt * 1.2);
        k.rect(1110, 640 + 200 - tide * 120, 640, 120 + tide * 120, { fill: '#5b9bd5', fillStyle: 'solid', stroke: 'none', seed: 611, alpha: 0.6 * k.at('field', 0.6) });
        for (let i = 0; i < 8; i++) k.line(1160 + i * 78, 760, 1150 + i * 78, 720, { stroke: '#3f7d3a', width: 5, seed: 620 + i, p: k.at('field', 0.5) });
        k.text('ruộng Lạc · nước triều', 1430, 1010, { size: 40, font: 'title', fx: 'fade', p: k.at('field', 0.6) });
      },
    },
    {
      say: 'Để ý nhé: sách ghi Lạc vương, chứ không phải Hùng vương. {masp}Học giả người Pháp Henri Maspero cho rằng: chữ Hùng là do người chép sách viết nhầm từ chữ Lạc, {look}vì hai chữ Hán này trông khá giống nhau. {other}Nhiều nhà nghiên cứu khác phản đối, và cuộc tranh luận đến nay vẫn chưa ngã ngũ. {but}Nhưng dù gọi là vua Hùng hay vua Lạc, {real}thì những người thủ lĩnh của cư dân trồng lúa bên sông Hồng, là có thật.',
      sfx: [['pop', 'masp'], ['ding', 'look', 0.4], ['pop', 'other'], ['bonk', ['other', 0.6], 0.4], ['pop', 'but'], ['tada', 'real', 0.5]],
      draw(k) {
        const lk = k.at('look', 0.6, 'back');
        [['雄', 'Hùng', 560], ['雒', 'Lạc', 1100]].forEach(([ch, t, x], i) => {
          k.group({ x, y: 360, s: Math.max(0.01, lk), r: (i ? 1 : -1) * 0.03, a: Math.min(1, lk * 3) }, () => {
            k.rect(-200, -200, 400, 400, { fill: '#fffaf0', fillStyle: 'solid', width: 6, seed: 630 + i });
            k.text(ch, 0, -10, { size: 260, color: '#3b2f2a', weight: 700 });
            k.text(t, 0, 160, { size: 52, font: 'title', color: '#b5482c' });
          });
        });
        k.text('≈ ?', 830, 360, { size: 100, font: 'title', fx: 'pop', p: k.at(k.cue('look', 0.4), 0.4) });
        k.char(1580, 860, 440, { ...MASP, face: 'smug', pose: 'point', flip: true, p: k.at('masp', 0.5) });
        k.text('Henri Maspero', 1580, 930, { size: 44, font: 'title', fx: 'fade', p: k.at('masp', 0.5) });
        say(k, 'Chép nhầm đấy!', 'masp', [1360, 120, 400, 110], [1560, 400]);
        say(k, 'Không phải!', 'other', [30, 650, 280, 90], [140, 830], { size: 38 });
        say(k, 'Chưa chắc!', k.cue('other', 0.5), [340, 650, 280, 90], [330, 830], { size: 38 });
        for (let i = 0; i < 3; i++) k.char(140 + i * 180, 1060, 240, { ...SCHOLAR(KC[i + 3]), face: 'angry', pose: i === 1 ? 'shout' : 'point', p: k.at(k.cue('other', i * 0.2), 0.4), shadow: false });
        cap(k, 'thủ lĩnh cư dân trồng lúa bên sông Hồng: có thật', 'real', { y: 1030, x: 1220, size: 42, hl: '#ffe08a', maxWidth: 1200 });
      },
    },
    {
      say: 'Vậy, {q}mười tám đời vua Hùng kéo dài hai nghìn sáu trăm năm? {no}Theo sử học hiện đại thì không. {yes}Nhưng một nhà nước sơ khai của người Lạc Việt, {ds}với trống đồng, ruộng lúa, nhà sàn, {real}là có thật. {mean}Con số hai nghìn sáu trăm năm có thể sai về phép tính, {msg}nhưng điều nó muốn nói thì đúng. Không phải một trăm bốn mươi sáu năm một vua, {echo}mà là hơn hai nghìn năm, người Việt vẫn nhớ về gốc của mình. {gio}Thế nên đến nay, cứ mùng mười tháng ba âm lịch, người Việt vẫn nhớ ngày Giỗ Tổ Hùng Vương. {unesco}Năm 2012, UNESCO đã ghi danh tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ là di sản văn hoá phi vật thể của nhân loại.',
      sfx: [['drumroll', 'q', 0.3], ['bonk', 'no', 0.4], ['pop', 'yes'], ['pop', 'ds'], ['tada', 'real', 0.4], ['pop', 'mean'], ['pop', 'msg'], ['sparkle', 'echo', 0.5], ['gong', 'gio', 0.4], ['sparkle', 'unesco', 0.5]],
      draw(k) {
        const g = k.at('gio', 0.6);
        k.group({ a: 1 - g }, () => {
          k.rect(120, 160, 760, 620, { fill: '#f3e3e0', width: 5, seed: 640, p: k.at('no', 0.5) });
          k.text('2.622 NĂM', 500, 240, { size: 64, font: 'title', color: '#c0392b', fx: 'pop', p: k.at('no', 0.4) });
          k.char(500, 640, 300, { ...OLD, face: 'blank', pose: 'shrug', p: k.at('no', 0.5), shadow: false });
          k.icon('cross', 500, 520, 200, { p: k.at(k.cue('no', 0.4), 0.4) });
          k.rect(1040, 160, 760, 620, { fill: '#e3f0dc', width: 5, seed: 641, p: k.at('yes', 0.5) });
          k.text('CÓ THẬT', 1420, 240, { size: 64, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('yes', 0.4) });
          k.prop('drumface', 1220, 440, 220, { p: k.at('ds', 0.5) });
          k.icon('rice', 1440, 440, 150, { p: k.at(k.cue('ds', 0.4), 0.4) });
          k.prop('stilthouse', 1640, 470, 200, { p: k.at(k.cue('ds', 0.8), 0.4) });
          k.text('nhà nước sơ khai của người Lạc Việt', 1420, 660, { size: 40, font: 'title', fx: 'fade', p: k.at('real', 0.6), maxWidth: 700 });
          cap(k, 'Không phải 146 năm một vua…', 'msg', { y: 860, size: 50, color: '#6b5f55' });
          cap(k, '…mà hơn 2.000 năm nhớ về gốc của mình', 'echo', { y: 960, hl: '#ffe08a', size: 58 });
        });
        k.group({ a: g }, () => {
          k.backdrop('dawn', { ground: G });
          k.prop('mountain', 960, 720, 760, { fill: '#6fa860' });
          k.prop('temple', 960, 420, 220);
          k.prop('incense', 760, 840, 160);
          k.prop('incense', 1160, 840, 160);
          for (let i = 0; i < 6; i++) k.char(260 + i * 280 + (i > 2 ? 120 : 0) - (i < 3 ? 120 : 0), 1000, 240, { ...DAN(KC[i], { outfit: 'tunic', hat: i % 2 ? 'non' : 'band' }), face: 'calm', pose: 'stand', shadow: false });
          k.text('Dù ai đi ngược về xuôi', 960, 110, { size: 64, font: 'title', color: '#b5482c', p: k.at('gio', 1.4, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
          k.text('Nhớ ngày Giỗ Tổ mùng mười tháng ba', 960, 200, { size: 60, font: 'title', color: '#b5482c', p: k.at(k.cue('gio', 1.4), 1.6, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
          stamp(k, 1600, 520, 'UNESCO 2012', k.at('unesco', 0.5), { w: 440, size: 60, color: '#2e6da4', r: -0.06 });
        });
      },
    },

    // ---------------- Tóm tắt ----------------
    {
      chapter: 'Tóm tắt',
      say: '{remind}Trước khi tóm tắt: nhớ cái tên Thục Phán và cái nỏ thần nhé, tập sau cần đấy. {t}Tóm lại: {a}hai nghìn sáu trăm hai mươi hai năm là của cả họ Hồng Bàng, theo Toàn thư năm 1479. {b}Con số ấy có thể đến từ ý muốn khẳng định nước ta lâu đời, và từ hơn nghìn năm kể miệng. {c}Sử học ngày nay: Văn Lang ra đời khoảng thế kỷ bảy trước Công nguyên. {d}Còn bánh chưng và dưa hấu nhắc ta: ông cha sống bằng hạt giống, và đôi bàn tay.',
      sfx: [['ding', 'remind', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd']],
      draw(k) {
        k.group({ a: 1 - k.at('t', 0.4) }, () => {
          k.char(700, 760, 440, { ...THUC, face: 'smug', pose: 'hips', p: k.at('remind', 0.5) });
          k.prop('crossbow', 1200, 520, 340, { glow: true, p: k.at(k.cue('remind', 0.6), 0.5) });
          k.text('Thục Phán + nỏ thần', 960, 200, { size: 90, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('remind', 0.5), outline: '#fffaf0', outlineWidth: 14 });
          k.text('nhớ nhé!', 960, 900, { size: 64, font: 'title', color: '#e4572e', fx: 'pop', p: k.at(k.cue('remind', 0.8), 0.5) });
        });
        k.text('Tóm tắt', 960, 110, { size: 84, font: 'title', p: k.at('t', 0.8, 'linear') });
        const rows = [['a', '2.622 năm = cả họ Hồng Bàng (Toàn thư, 1479)', '#b5482c', () => k.char(250, 330, 170, { ...OLD, face: 'shock', pose: 'shrug', p: k.at('a', 0.5), shadow: false })],
          ['b', 'Vì muốn "lâu đời" + hơn nghìn năm kể miệng', '#8e5bd3', () => k.prop('scroll', 250, 470, 140, { p: k.at('b', 0.5) })],
          ['c', 'Sử học: Văn Lang ~ thế kỷ VII TCN', '#3f6f2a', () => k.prop('drumface', 250, 680, 150, { p: k.at('c', 0.5) })],
          ['d', 'Bánh chưng, dưa hấu: hạt giống + đôi tay', '#1f7a8c', () => k.prop('banhchung', 250, 890, 150, { p: k.at('d', 0.5) })]];
        rows.forEach(([c, t, col, art], i) => {
          art();
          k.text(t, 420, 270 + i * 205, { size: 52, font: 'title', align: 'left', color: col, p: k.at(c, 1.4, 'linear'), maxWidth: 1420 });
        });
      },
    },
    nextEpisodeScene({
      say: '{next}Tập sau: Mỵ Châu, Trọng Thủy. {why}Một cái nỏ thần, một con rùa vàng, và một chiếc áo lông ngỗng. {more}Nỏ thần có thật không? Ở Cổ Loa, các nhà khảo cổ đã đào được cả một kho mũi tên đồng. Hẹn bạn ở tập sau.',
      title: 'Mỵ Châu – Trọng Thủy: nỏ thần có thật?',
      hook: 'Cổ Loa đào được cả kho mũi tên đồng',
      when: 'Tập 6 · series Truyền thuyết Hùng Vương',
      art: (k) => {
        k.prop('crossbow', -230, 0, 380, { glow: true });
        k.char(300, 210, 320, { ...THUC, face: 'smug', pose: 'hips', shadow: false, flip: true });
      },
      sfx: [['sparkle', 'why', 0.4]],
    }),
    subscribeScene({
      say: 'Còn bạn, {q}theo bạn, mười tám đời nghĩa là gì: mười tám vị vua, mười tám ngành, hay chỉ là con số tượng trưng? Và Tết nhà bạn gói bánh chưng hay bánh tét? Kể cho mình nghe dưới phần bình luận nhé. {sub}Và bấm đăng ký, bật chuông, để không lỡ tập sau về nỏ thần Cổ Loa!',
      question: 'Theo bạn, "18 đời" nghĩa là gì?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
