// Tập 6 series Hùng Vương — Nỏ thần có thật không? Mỵ Châu – Trọng Thủy và thành Cổ Loa (hoạt hình phẳng, tếu táo)
// Cấu trúc theo dữ liệu 31/10: chuỗi "5 bí ẩn" đánh số, không kể lại truyện quen quá ~30 giây liền (xem skill kenh-ve-la-hieu).
// Đối chiếu nguồn:
//   Đại Việt sử ký toàn thư (1479), Thục kỷ: An Dương Vương lên ngôi năm Giáp Thìn (257 TCN), nước Âu Lạc; xây thành ở Việt Thường/Phong Khê,
//     đắp đến đâu lở đến đấy; rùa vàng (sứ Thanh Giang) giúp, nửa tháng xong; thành xoắn như trôn ốc → Loa thành; rùa tháo vuốt làm lẫy nỏ.
//     Triệu Đà cầu hôn Mỵ Châu cho con là Trọng Thủy, Trọng Thủy ở rể, dỗ Mỵ Châu cho xem nỏ, ngầm đổi lẫy; hỏi chuyện lạc nhau → áo lông ngỗng.
//     Đà đánh, vua cậy nỏ "vẫn điềm nhiên đánh cờ, cười mà nói: Đà không sợ nỏ thần sao?"; nỏ mất vuốt, vua đặt Mỵ Châu ngồi sau ngựa chạy về
//     phương Nam; đến biển kêu "Sứ Thanh Giang đâu, mau lại cứu!"; rùa vàng: "Kẻ ngồi sau ngựa chính là giặc đó!"; vua chém Mỵ Châu, cầm sừng tê
//     bảy tấc, rùa rẽ nước dẫn xuống biển; tương truyền là Dạ Sơn (Mộ Dạ), Diễn Châu (đền Cuông, Nghệ An). Toàn thư chép mất nước năm 208 TCN.
//   Lĩnh Nam chích quái (truyện Rùa Vàng): lời khấn của Mỵ Châu (phản nghịch → cát bụi; trung hiếu bị lừa → châu ngọc), máu → trai hoá ngọc,
//     Trọng Thủy nhảy giếng, ngọc rửa nước giếng thêm sáng. Giếng Ngọc và am Mỵ Châu ở khu di tích Cổ Loa.
//   Giao Châu ngoại vực ký (dẫn trong Thủy kinh chú): thần nhân Cao Thông làm nỏ thần "một phát giết ba trăm người"; con Nam Việt vương sang
//     làm rể, được Mỵ Châu cho xem nỏ, lấy cưa cưa đứt nỏ → không có rùa vàng, lông ngỗng, ngọc trai.
//   Sử ký (Tư Mã Thiên), Nam Việt liệt truyện → nhiều nhà sử học hiện nay đặt Âu Lạc mất khoảng 179 TCN; sử học VN lấy làm mốc mở đầu Bắc thuộc
//     (đến chiến thắng Bạch Đằng 938).
//   Khảo cổ Cổ Loa: ba vòng thành đất (vòng ngoài ~8 km), hào nước nối sông. Tháng 6/1959 ở Cầu Vực đào được hố ~1 m × 1 m, sâu ~1,2 m, chứa
//     93 kg mũi tên đồng (~1 vạn chiếc), khoảng 3/4 chưa tu chỉnh (Nhân Dân; Kiến Thức). Lò và khuôn đúc mũi tên ở khu Đền Thượng.
//     Nam C. Kim, The Origins of Ancient Vietnam (Oxford University Press, 2015): Cổ Loa là công trình cần huy động lực lượng lớn → nhà nước.
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import * as thumbs from '/videos/033-my-chau-trong-thuy/thumbs.js';

const G = 880; // mặt đất
const ME = { body: 'man', outfit: 'bare', color: '#e4572e', color2: '#f6c344', hair: 'short', hat: 'feather', tattoo: true }; // "mình"
const ADV = { body: 'big', outfit: 'tunic', color: '#4a4a5a', color2: '#c9a24a', hat: 'helmet', hair: 'short', beard: true, cape: '#2b2f3d' };
const MC = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'long', hat: 'flower', cape: '#f4efe6' };
const TT = { body: 'man', outfit: 'robe', color: '#2e6da4', color2: '#e9e4dc', hair: 'topknot', hat: 'band' };
const TD = { body: 'big', outfit: 'robe', color: '#7a2e2e', color2: '#c9a24a', hat: 'crown', beard: 'long', hair: 'topknot', cape: '#4a1e1e' };
const NAM = { body: 'man', outfit: 'tunic', color: '#7a2e2e', color2: '#c9a24a', hat: 'helmet', hair: 'short' };
const OLD = { body: 'man', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'kingfeather', hair: 'short', cape: '#b5482c', beard: 'long', beardColor: '#ffffff', hairColor: '#e9e4dc' };
const DAN = (c, extra = {}) => ({ body: 'man', outfit: 'bare', color: c, color2: '#f6c344', hair: 'short', hat: 'feather', ...extra });
const KC = ['#e4572e', '#2e86de', '#f6c344', '#3bb273', '#8e5bd3', '#ef6f9a', '#f08a24', '#1f7a8c'];

// Chữ to viền kem.
const T = (k, s, x, y, size, color, p, o = {}) => k.text(s, x, y, { size, font: 'title', color, fx: o.fx ?? 'pop', p, outline: '#fffaf0', outlineWidth: size * 0.15, maxWidth: o.maxWidth ?? 1700, align: o.align });
function cap(k, text, cue, o = {}) {
  const y = o.y ?? 995;
  const b = k.text(text, o.x ?? k.W / 2, y, { size: o.size ?? 54, font: 'title', p: k.at(cue, o.dur ?? 1.2, 'linear'), maxWidth: o.maxWidth ?? 1760, color: o.color ?? '#3b2f2a', outline: '#fffaf0', outlineWidth: 12 });
  if (o.hl) k.highlight((o.x ?? k.W / 2) - b.w / 2 - 16, y - 34, b.w + 32, 68, { p: k.at(k.cue(cue, (o.dur ?? 1.2) + 0.2), 0.5), color: o.hl });
}
function say(k, text, c, box, tail, o = {}) {
  k.bubble(box[0], box[1], box[2], box[3], tail[0], tail[1], { p: k.at(c, 0.4), text, size: o.size ?? 44, seed: o.seed, think: o.think });
}
function stamp(k, x, y, text, p, o = {}) {
  const s = Math.max(0.01, k.ease.back(Math.min(1, p)) * (1 + 0.6 * (1 - Math.min(1, p))));
  k.group({ x, y, s, r: o.r ?? -0.1, a: Math.min(1, p * 3) }, () => {
    const w = o.w ?? 420;
    k.rect(-w / 2, -60, w, 120, { stroke: o.color ?? '#c0392b', width: 8, fillStyle: 'solid', seed: 77 });
    k.text(text, 0, 4, { size: o.size ?? 60, font: 'title', color: o.color ?? '#c0392b' });
  });
}
// Tấm giấy trích sử: tiêu đề + các dòng [text, p, màu].
function doc(k, x, y, w, h, title, lines, p, o = {}) {
  k.group({ x, y, s: Math.max(0.01, k.ease.back(Math.min(1, p))), r: o.r ?? -0.02, a: Math.min(1, p * 3) }, () => {
    k.rect(-w / 2, -h / 2, w, h, { fill: '#f6e7c1', width: 5, seed: o.seed ?? Math.round(x) });
    k.text(title, 0, -h / 2 + 56, { size: o.titleSize ?? 44, font: 'title', color: '#b5482c', maxWidth: w - 60 });
    lines.forEach((l, i) => k.text(l[0], 0, -h / 2 + 140 + i * (o.gap ?? 64), { size: o.size ?? 40, color: l[2] ?? '#3b2f2a', maxWidth: w - 70, p: l[1] ?? 1, fx: 'fade', weight: 600 }));
  });
}
function box(k, x, y, w, h, text, p, o = {}) {
  k.group({ x, y, s: Math.max(0.01, k.ease.back(Math.min(1, p))), a: Math.min(1, p * 3) }, () => {
    k.rect(-w / 2, -h / 2, w, h, { fill: o.fill ?? '#fffaf0', fillStyle: 'solid', width: 5, seed: o.seed ?? Math.round(x + y) });
    k.text(text, 0, o.sub ? -16 : 4, { size: o.size ?? 44, font: 'title', color: o.color ?? '#3b2f2a', maxWidth: w - 30 });
    if (o.sub) k.text(o.sub, 0, 34, { size: o.subSize ?? 32, color: '#6b5f55', weight: 600, maxWidth: w - 30 });
  });
}
// Thẻ "BÍ ẨN n/5": phủ kín khung ~2,5 giây đầu (cue 'n'), sau đó còn nhãn nhỏ góc trái.
function intro(k, n, q) {
  const a = 1 - k.at(k.cue('n', 2.4), 0.5);
  k.group({ a }, () => {
    k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#2b2f3d', fillStyle: 'solid', stroke: 'none', seed: 990 });
    k.text(`BÍ ẨN ${n}/5`, 960, 400, { size: 120, font: 'title', color: '#f6c344', fx: 'pop', p: k.at('n', 0.5) });
    k.text(q, 960, 590, { size: 80, font: 'title', color: '#fffaf0', fx: 'pop', p: k.at(k.cue('n', 0.3), 0.5), maxWidth: 1600 });
  });
}
const pill = (k, n, p = 1) => k.text(`BÍ ẨN ${n}/5`, 30, 50, { size: 36, font: 'title', align: 'left', color: '#b5482c', outline: '#fffaf0', outlineWidth: 8, fx: 'fade', p });
// Thành Cổ Loa nhìn từ trên: 2 vòng đất uốn lượn + vòng trong chữ nhật, hào nước. p = [ngoài, giữa, trong, hào].
function citadel(k, cx, cy, s, p) {
  const ring = (rx, ry, j) => {
    const pts = [];
    for (let i = 0; i <= 28; i++) {
      const a = (i / 28) * Math.PI * 2, r = 1 + 0.08 * Math.sin(a * 3 + j) + 0.05 * Math.cos(a * 5 + j * 2);
      pts.push([cx + Math.cos(a) * rx * r * s, cy + Math.sin(a) * ry * r * s]);
    }
    return pts;
  };
  const rings = [ring(520, 330, 0.4), ring(360, 230, 1.9)];
  rings.forEach((r, i) => k.curve(r, { stroke: '#5b9bd5', width: 30 * s, p: p[3], seed: 950 + i }));
  rings.forEach((r, i) => k.curve(r, { stroke: '#a0703f', width: 13 * s, p: p[i], seed: 960 + i }));
  k.rect(cx - 130 * s, cy - 85 * s, 260 * s, 170 * s, { stroke: '#a0703f', width: 13 * s, p: p[2], seed: 970 });
}
// Đường xoắn ốc (Loa thành trong truyền thuyết).
function spiral(k, cx, cy, R, p, seed = 980) {
  const pts = [];
  for (let i = 0; i <= 60; i++) { const a = (i / 60) * Math.PI * 6, r = R * (1 - i / 66); pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.75]); }
  k.curve(pts, { stroke: '#a0703f', width: 8, p, seed });
}
// Vuốt rùa (vàng, cong).
const claw = (k, x, y, s, p, o = {}) => k.group({ x, y, s: Math.max(0.01, s * Math.min(1, p * 2)), r: o.r ?? 0, a: Math.min(1, p * 3) }, () => {
  k.poly([[-14, 30], [-10, -6], [4, -34], [16, -38], [8, -10], [10, 30]], { fill: o.fill ?? '#e8b84a', fillStyle: 'solid', width: 4, seed: 985 });
});
// Gươm.
const sword = (k, x, y, s, r, p) => k.group({ x, y, s: Math.max(0.01, s), r, a: p }, () => {
  k.poly([[-7, -150], [0, -172], [7, -150], [7, 20], [-7, 20]], { fill: '#d9dde3', fillStyle: 'solid', width: 4, seed: 986 });
  k.rect(-30, 20, 60, 12, { fill: '#c9a24a', fillStyle: 'solid', width: 4, seed: 987 });
  k.rect(-7, 32, 14, 46, { fill: '#6b4a2d', fillStyle: 'solid', width: 4, seed: 988 });
});
// Ruộng / đồng cỏ.
const field = (k, y, c = '#9cc06a') => k.rect(-40, y, k.W + 80, k.H - y + 40, { fill: c, fillStyle: 'solid', width: 4, seed: 300 });

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    title: 'Nỏ thần có thật không? Mỵ Châu – Trọng Thủy và thành Cổ Loa',
    description: `Nỏ thần của An Dương Vương bắn một phát giết ba trăm người? Năm 1959, ngay cạnh thành Cổ Loa, người ta đào được gần một vạn mũi tên đồng.
Video giải 5 bí ẩn của truyện Mỵ Châu – Trọng Thủy: thành ốc xây xong trong nửa tháng, nỏ thần, cái lẫy bị tráo, áo lông ngỗng và rùa vàng, và năm nước Âu Lạc mất. Bất ngờ nhất: bản kể cổ nhất trong Giao Châu ngoại vực ký không hề có rùa vàng.`,
    links: [
      ['▶ Tập trước: 18 đời vua Hùng sống 2.622 năm?', '023-18-doi-vua-hung'],
      ['▶ Con Rồng Cháu Tiên: 100 trứng và nguồn gốc người Việt', '006-con-rong-chau-tien'],
      ['▶ Xem từ đầu series: Thánh Gióng có thật không?', '003-thanh-giong-co-that-khong'],
      ['🔔 Đăng ký Vẽ Là Hiểu', 'https://www.youtube.com/@velahiu?sub_confirmation=1'],
    ],
    footer: `📚 Nguồn tham khảo: Đại Việt sử ký toàn thư (1479) – Thục kỷ; Lĩnh Nam chích quái – truyện Rùa Vàng; Giao Châu ngoại vực ký (dẫn trong Thủy kinh chú); Sử ký của Tư Mã Thiên – Nam Việt liệt truyện; Nam C. Kim, The Origins of Ancient Vietnam (Oxford University Press, 2015); kho mũi tên đồng Cầu Vực, Cổ Loa (phát hiện tháng 6/1959); lò và khuôn đúc mũi tên khu Đền Thượng, Cổ Loa.
🔔 Đăng ký Vẽ Là Hiểu để xem trọn series: Thánh Gióng → Sơn Tinh – Thủy Tinh → Con Rồng Cháu Tiên → Thuồng luồng → 18 đời vua Hùng → Mỵ Châu – Trọng Thủy → …
💬 Tập sau: Rùa thần Hồ Gươm: từ trả gươm đến cụ rùa thật.`,
    tags: ['mỵ châu trọng thủy', 'nỏ thần', 'nỏ thần có thật không', 'an dương vương', 'thành cổ loa', 'cổ loa', 'rùa vàng', 'kim quy', 'áo lông ngỗng', 'âu lạc', 'triệu đà', 'mũi tên đồng cổ loa', 'cao lỗ', 'truyền thuyết việt nam', 'giải mã truyền thuyết', 'vẽ là hiểu'],
    hashtags: ['mychautrongthuy', 'nothan', 'suviet'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '+0%',
    voices: {
      adv: { voice: 'vi-VN-NamMinhNeural', pitch: '-12Hz', rate: '-6%' },
      rua: { voice: 'vi-VN-NamMinhNeural', pitch: '-20Hz', rate: '-14%' },
      tt: { voice: 'vi-VN-NamMinhNeural', pitch: '+10Hz', rate: '+4%' },
      mc: { voice: 'vi-VN-HoaiMyNeural', pitch: '+0Hz', rate: '-2%' },
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
      say: '{wall}Mình đang đứng trên tường thành Cổ Loa. {army}Dưới kia, quân phương Bắc kéo đến kín cả cánh đồng. {calm}Nhưng mình không sợ. {bow}Cả nước Âu Lạc đều biết: vua của mình có một cái nỏ thần, {shot}bắn một phát, giặc chết hàng trăm. {aim}Vua giương nỏ. {pull}Bóp lẫy… {nothing}và chẳng có gì xảy ra. {who}Cái lẫy thần đã bị đánh tráo. {by}Và người đánh tráo, lại chính là… {son}con rể của nhà vua.',
      sfx: [['pop', 'wall'], ['drumroll', 'army', 0.3], ['pop', 'calm'], ['sparkle', 'bow', 0.5], ['boom', 'shot', 0.4], ['pop', 'aim'], ['click', 'pull', 0.8], ['wahwah', 'nothing', 0.6], ['scratch', 'who', 0.5], ['drumroll', 'by', 0.3], ['boing', 'son', 0.5]],
      draw(k) {
        const cut = k.at('who', 0.5);
        const fail = k.t > k.cue('nothing');
        k.group({ a: 1 - cut }, () => {
          k.backdrop('sunset', { ground: 820 });
          for (let i = 0; i < 3; i++) {
            const x = 1300 + i * 220;
            k.line(x, 900, x, 690, { width: 5, seed: 20 + i, p: k.at('army', 0.5) });
            k.poly([[x, 690], [x + 90, 712], [x, 738]], { fill: '#c0392b', fillStyle: 'solid', width: 3, seed: 30 + i, p: k.at('army', 0.5) });
          }
          for (let i = 0; i < 8; i++) {
            const x = 1180 + (i % 4) * 180 + (i > 3 ? 90 : 0), y = 920 + (i > 3 ? 110 : 0);
            k.char(x, y, 190, { ...NAM, face: 'angry', pose: i % 2 ? 'fight' : 'stand', walk: true, flip: true, shadow: false, p: k.at(k.cue('army', i * 0.08), 0.4) });
          }
          k.poly([[-40, 600], [1000, 600], [1130, 1120], [-40, 1120]], { fill: '#b98a55', fillStyle: 'solid', width: 5, seed: 11 });
          k.rect(-40, 585, 1050, 26, { fill: '#7fae5a', fillStyle: 'solid', width: 4, seed: 12 });
          k.char(250, 600, 330, { ...ME, face: fail ? 'shock' : k.t > k.cue('calm') ? 'smug' : 'calm', pose: fail ? 'facepalm' : k.t > k.cue('bow') ? 'point' : 'stand', p: k.at('wall', 0.4), shadow: false });
          T(k, 'mình', 250, 230, 46, '#b5482c', k.at('wall', 0.4) * (1 - k.at('army', 0.4)));
          k.char(640, 600, 420, { ...ADV, face: fail ? 'shock' : 'smug', pose: 'hold', p: k.at('bow', 0.5), shadow: false });
          k.prop('crossbow', 820, 430, 230, { glow: !fail, p: k.at('bow', 0.5) });
          k.sweat(700, 200, 1.2, { p: k.at('nothing', 0.4) });
          k.burst(1020, 330, 80, 'TẠCH', { p: k.at('pull', 0.3) * (1 - k.at('nothing', 0.3)), size: 36 });
          T(k, '. . . ?', 1030, 360, 100, '#3b2f2a', k.at('nothing', 0.5));
          T(k, 'THÀNH CỔ LOA', 520, 110, 84, '#b5482c', k.at('wall', 0.5));
          T(k, 'NỎ THẦN: 1 phát = hàng trăm giặc', 1400, 120, 54, '#e4572e', k.at('shot', 0.5) * (1 - k.at('nothing', 0.4)), { maxWidth: 900 });
        });
        k.group({ a: cut }, () => {
          k.prop('crossbow', 640, 470, 560);
          k.circle(610, 470, 110, { stroke: '#c0392b', width: 6, seed: 41, p: k.at('who', 0.6) });
          stamp(k, 640, 800, 'LẪY BỊ TRÁO', k.at(k.cue('who', 0.6), 0.5), { w: 520, size: 64 });
          k.char(1450, 920, 500, { ...TT, face: 'smug', pose: 'hips', p: k.at('son', 0.5) });
          T(k, 'CON RỂ?!', 1450, 220, 100, '#e4572e', k.at('son', 0.5));
        });
      },
    },
    {
      say: 'Đây là tập sáu trong series Truyền thuyết Hùng Vương. {prev}Tập trước, mình dặn bạn nhớ hai thứ: {thuc}cái tên Thục Phán, {bow}và cái nỏ thần. {today}Hôm nay dùng đến rồi đây. {sub}Nếu bạn mới đến, bấm đăng ký nhé: cả series đang chờ bạn ở cuối video.',
      sfx: [['pop', 0.3], ['pop', 'prev'], ['pop', 'thuc'], ['sparkle', 'bow', 0.5], ['tada', 'today', 0.5], ['ding', 'sub', 0.5]],
      draw(k) {
        k.text('SERIES TRUYỀN THUYẾT HÙNG VƯƠNG · TẬP 6', 960, 110, { size: 54, font: 'title', color: '#b5482c', p: k.at(0.2, 1.4, 'linear') });
        const pc = k.at('prev', 0.6, 'back');
        k.group({ x: 430, y: 500, s: Math.max(0.01, pc), r: -0.03 }, () => {
          k.rect(-280, -220, 560, 440, { fill: '#fffaf0', width: 6, seed: 40, p: pc > 0 ? 1 : 0 });
          k.char(-80, 150, 280, { ...OLD, face: 'shock', pose: 'shrug', shadow: false });
          k.text('2.622?', 130, -60, { size: 66, font: 'title', color: '#b5482c' });
          k.text('Tập 5 · 18 đời vua Hùng', 0, 270, { size: 40, font: 'title', outline: '#fffaf0', outlineWidth: 8 });
        });
        k.arrow(760, 500, 960, 500, { width: 7, p: k.at('thuc', 0.5) });
        k.char(1220, 820, 460, { ...ADV, face: 'smug', pose: 'hips', p: k.at('thuc', 0.5) });
        T(k, 'Thục Phán', 1220, 880, 50, '#3b2f2a', k.at('thuc', 0.5), { fx: 'fade' });
        k.prop('crossbow', 1590, 470, 300, { glow: true, p: k.at('bow', 0.5) });
        T(k, 'nỏ thần', 1590, 640, 50, '#b5482c', k.at('bow', 0.5), { fx: 'fade' });
        T(k, 'DÙNG ĐẾN RỒI!', 1420, 260, 64, '#e4572e', k.at('today', 0.4));
        stamp(k, 600, 980, 'ĐĂNG KÝ XEM TRỌN BỘ', k.at('sub', 0.5), { w: 640, size: 46 });
      },
    },
    {
      say: 'Hôm nay, mình giải {m}năm bí ẩn của truyện Mỵ Châu, Trọng Thủy. {b1}Một: thành ốc xây xong trong nửa tháng? {b2}Hai: nỏ thần bắn một phát, giết ba trăm người? {b3}Ba: cái lẫy thần bị tráo bằng cách nào? {b4}Bốn: áo lông ngỗng và rùa vàng từ đâu ra? {b5}Và năm: nước Âu Lạc mất vào năm nào? {tease}Bí ẩn số bốn, theo mình, là bất ngờ nhất.',
      sfx: [['tada', 'm', 0.5], ['pop', 'b1'], ['pop', 'b2'], ['pop', 'b3'], ['pop', 'b4'], ['pop', 'b5'], ['sparkle', 'tease', 0.5]],
      draw(k) {
        k.backdrop('sunset', { ground: G });
        T(k, 'Mỵ Châu – Trọng Thủy: 5 bí ẩn', 960, 100, 80, '#b5482c', k.at('m', 0.6));
        const rows = [['b1', 'Thành ốc xây trong nửa tháng?'], ['b2', 'Nỏ thần 1 phát giết 300 người?'], ['b3', 'Lẫy thần bị tráo thế nào?'], ['b4', 'Lông ngỗng, rùa vàng từ đâu ra?'], ['b5', 'Âu Lạc mất năm nào?']];
        rows.forEach(([c, t], i) => {
          const y = 240 + i * 130;
          k.circle(120, y, 44, { fill: i === 3 && k.t > k.cue('tease') ? '#e4572e' : '#f6c344', fillStyle: 'solid', width: 4, seed: 60 + i, p: k.at(c, 0.4) > 0 ? 1 : 0, alpha: k.at(c, 0.3) });
          k.text(String(i + 1), 120, y + 4, { size: 54, font: 'title', fx: 'pop', p: k.at(c, 0.4) });
          k.text(t, 190, y, { size: 58, font: 'title', align: 'left', p: k.at(c, 1, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        });
        k.icon('star', 1230, 630, 90, { p: k.at('tease', 0.4) });
        k.char(1450, G, 400, { ...MC, face: 'sad', pose: 'stand', p: k.at('m', 0.5) });
        k.char(1720, G, 420, { ...TT, face: 'smug', pose: 'hips', flip: true, p: k.at('m', 0.5) });
        k.prop('turtle', 1560, 980, 220, { glow: true, p: k.at('b4', 0.5) });
      },
    },

    // ---------------- Bí ẩn 1 ----------------
    {
      chapter: 'Bí ẩn 1: Thành ốc xây trong nửa tháng?',
      say: '{n}Bí ẩn số một. {y}Theo Đại Việt sử ký toàn thư, năm 257 trước Công nguyên, Thục Phán lên ngôi, xưng An Dương Vương, nước gọi là Âu Lạc. {build}Vua cho đắp thành. {fall}Nhưng đắp đến đâu, lở đến đấy. {turtle}Rồi một con rùa vàng nổi lên, xưng là sứ Thanh Giang, giúp vua xây. {half}Nửa tháng, thành xong. {loa}Thành cuộn như vỏ ốc, nên gọi là Loa thành. {joke}Nửa tháng, một toà thành. Các nhà thầu bây giờ nghe xong, chắc phải xin số của rùa.',
      sfx: [['drumroll', 'n', 0.3], ['pop', 'y'], ['pop', 'build'], ['boom', 'fall', 0.5], ['sparkle', 'turtle', 0.5], ['tada', 'half', 0.5], ['pop', 'loa'], ['boing', ['joke', 2.2], 0.5]],
      draw(k) {
        k.backdrop('day', { ground: 860 });
        k.ellipse(1560, 960, 700, 170, { fill: '#5b9bd5', fillStyle: 'solid', width: 4, seed: 101 });
        const base = 220 * k.at('build', 1.2);
        const fallen = base * (1 - 0.85 * k.at('fall', 0.5));
        const h = fallen + (280 - fallen) * k.at('half', 1.4, 'inOut');
        k.poly([[420, 862], [560, 862 - h], [1000, 862 - h], [1140, 862]], { fill: '#b98a55', fillStyle: 'solid', width: 5, seed: 102 });
        k.burst(780, 760, 90, 'ẦM!', { p: k.at('fall', 0.4) * (1 - k.at(k.cue('fall', 1.4), 0.3)), size: 44 });
        k.char(230, 900, 400, { ...ADV, face: k.t > k.cue('half') ? 'happy' : k.t > k.cue('fall') ? 'sad' : 'smug', pose: k.t > k.cue('turtle') ? 'cheer' : 'point', p: k.at('y', 0.5) });
        for (let i = 0; i < 3; i++) k.char(560 + i * 220, 990, 260, { ...DAN(KC[i]), face: k.t > k.cue('half') ? 'laugh' : k.t > k.cue('fall') ? 'shock' : 'happy', pose: 'hold', shadow: false, bob: 2, p: k.at(k.cue('build', i * 0.1), 0.4) });
        const rise = k.at('turtle', 1.2);
        k.prop('turtle', 1560, 1050 - rise * 130, 300, { glow: true, talk: k.t > k.cue('turtle') && k.t < k.cue('half'), p: rise > 0 ? 1 : 0, alpha: rise });
        T(k, 'sứ Thanh Giang', 1560, 700, 46, '#b5482c', k.at('turtle', 0.6), { fx: 'fade' });
        T(k, '257 TCN · ÂU LẠC', 960, 110, 70, '#b5482c', k.at('y', 0.5));
        T(k, 'NỬA THÁNG!', 780, 470, 90, '#e4572e', k.at('half', 0.5));
        const lp = k.at('loa', 0.5, 'back');
        k.group({ x: 1560, y: 330, s: Math.max(0.01, lp) }, () => {
          k.rect(-230, -150, 460, 300, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 103 });
          spiral(k, 0, -10, 150, lp > 0 ? 1 : 0);
          k.text('LOA THÀNH = thành ốc', 0, 120, { size: 34, font: 'title', color: '#b5482c' });
        });
        say(k, 'Rùa ơi, cho xin số!', 'joke', [1080, 520, 460, 110], [1000, 760]);
        pill(k, 1, k.at(k.cue('n', 2.4), 0.5));
        intro(k, 1, 'Thành ốc xây xong trong nửa tháng?');
      },
    },
    {
      say: 'Còn thành Cổ Loa thật, ở ngoại thành Hà Nội ngày nay? {three}Các nhà khảo cổ thấy ba vòng thành đắp bằng đất, lồng vào nhau. {outer}Vòng ngoài dài gần tám cây số. {moat}Quanh thành là hào nước nối với sông, thuyền ra vào được. {shape}Nhìn từ trên cao, các vòng thành uốn lượn như vòng xoáy; có lẽ vì thế mới thành chuyện thành ốc. {kim}Nhà khảo cổ Nam C. Kim, trong cuốn sách về nguồn gốc Việt Nam cổ đại, cho rằng: công trình cỡ này phải huy động rất nhiều người, trong thời gian dài, {state}tức là phải có một nhà nước biết tổ chức. {joke}Nửa tháng thì chắc là không. Trừ khi… có rùa.',
      sfx: [['pop', 'three'], ['pop', 'outer'], ['whoosh', 'moat', 0.4], ['pop', 'shape'], ['pop', 'kim'], ['tada', 'state', 0.4], ['boing', ['joke', 1.4], 0.5]],
      draw(k) {
        citadel(k, 640, 540, 1, [k.at('three', 1.2), k.at(k.cue('three', 0.5), 1.2), k.at(k.cue('three', 1), 0.8), k.at('moat', 1.4)]);
        T(k, 'CỔ LOA THẬT', 640, 120, 80, '#b5482c', k.at(0.2, 0.5));
        T(k, '3 vòng thành đất', 640, 540, 52, '#3b2f2a', k.at('three', 0.6), { fx: 'fade' });
        k.arrow(1100, 300, 1050, 380, { width: 6, p: k.at('outer', 0.4) });
        T(k, 'vòng ngoài ~8 km', 1100, 260, 50, '#a0703f', k.at('outer', 0.5));
        T(k, 'hào nước', 220, 930, 46, '#2e6da4', k.at('moat', 0.6), { fx: 'fade' });
        for (let i = 0; i < 2; i++) k.prop('boat', 360 + i * 560 + 30 * Math.sin(k.gt * 0.8 + i), 900 - i * 680, 130, { fill: '#8a5a35', p: k.at(k.cue('moat', 0.6 + i * 0.3), 0.4), flip: i === 1 });
        doc(k, 1520, 470, 620, 330, 'The Origins of Ancient Vietnam', [['Nam C. Kim · 2015', k.at('kim', 0.8)], ['→ cần rất nhiều người,', k.at(k.cue('kim', 2), 0.8)], ['   nhiều năm', k.at(k.cue('kim', 3), 0.8)]], k.at('kim', 0.5), { titleSize: 38 });
        stamp(k, 1520, 760, 'NHÀ NƯỚC CÓ TỔ CHỨC', k.at('state', 0.5), { w: 620, size: 48 });
        k.prop('turtle', 1560, 960, 170, { glow: true, p: k.at('joke', 0.5) });
        T(k, 'trừ khi… có rùa', 1260, 960, 50, '#e4572e', k.at(k.cue('joke', 1.2), 0.5));
        pill(k, 1);
      },
    },

    // ---------------- Bí ẩn 2 ----------------
    {
      chapter: 'Bí ẩn 2: Nỏ thần giết 300 người?',
      say: '{n}Bí ẩn số hai. {claw}Truyền thuyết kể: xây thành xong, rùa vàng tháo một chiếc vuốt, tặng vua làm lẫy nỏ. {old}Sách cổ Giao Châu ngoại vực ký còn chép hẳn một con số: {kill}nỏ thần bắn một phát, giết ba trăm người. {math}Một mũi tên, ba trăm người? {joke}Kể cả bắn xuyên qua cả một hàng dài đang xếp hàng mua vé, cũng chưa đủ. {clue}Nhưng ngay cạnh thành Cổ Loa, đất đã giữ lại một manh mối.',
      sfx: [['drumroll', 'n', 0.3], ['sparkle', 'claw', 0.5], ['pop', 'old'], ['boom', 'kill', 0.4], ['scratch', 'math', 0.5], ['whoosh', 'joke', 0.5], ['wahwah', ['joke', 2.6], 0.4], ['ding', 'clue', 0.5]],
      draw(k) {
        intro(k, 2, 'Nỏ thần một phát giết 300 người?');
        k.group({ a: k.at(k.cue('n', 2.4), 0.5) }, () => {
          const j = k.at('joke', 0.5);
          k.group({ a: 1 - j }, () => {
            k.prop('turtle', 360, 520, 300, { glow: true, p: k.at('claw', 0.5) });
            const fly = k.at(k.cue('claw', 1), 1.2, 'inOut');
            claw(k, k.lerp(480, 700, fly), k.lerp(430, 440, fly) - Math.sin(fly * Math.PI) * 120, 2, k.at(k.cue('claw', 0.8), 0.4));
            k.char(780, 820, 400, { ...ADV, face: 'happy', pose: 'hold', p: k.at('claw', 0.5) });
            doc(k, 1420, 360, 720, 360, 'GIAO CHÂU NGOẠI VỰC KÝ', [['(dẫn trong Thủy kinh chú)', k.at('old', 0.6), '#6b5f55'], ['"…nỏ thần một phát', k.at('kill', 0.6)], ['giết ba trăm người"', k.at(k.cue('kill', 0.6), 0.6), '#c0392b']], k.at('old', 0.5), { size: 44 });
            T(k, '1 mũi tên = 300 người?', 1420, 720, 72, '#e4572e', k.at('math', 0.5));
          });
          k.group({ a: j }, () => {
            k.backdrop('day', { ground: G });
            for (let i = 0; i < 9; i++) k.char(620 + i * 140, G, 260, { ...DAN(KC[i % KC.length], { outfit: 'tunic' }), face: 'blank', pose: 'stand', shadow: false });
            k.prop('crossbow', 260, 640, 220);
            const f = k.at(k.cue('joke', 0.8), 1.4, 'linear');
            k.line(330, 640, 330 + f * 1600, 640, { stroke: '#3b2f2a', width: 6, seed: 120, p: f > 0 ? 1 : 0 });
            k.text('ĐÃ ĐỦ 300 CHƯA?', 1200, 230, { size: 70, font: 'title', color: '#e4572e', fx: 'pop', p: k.at(k.cue('joke', 2.4), 0.4), outline: '#fffaf0', outlineWidth: 12 });
            k.text('… mới 9', 1200, 330, { size: 52, font: 'title', fx: 'fade', p: k.at(k.cue('joke', 2.8), 0.4) });
          });
          cap(k, 'Manh mối nằm ngay cạnh Cổ Loa…', 'clue', { y: 1000, hl: '#ffe08a' });
          pill(k, 2);
        });
      },
    },
    {
      say: '{y}Tháng sáu năm 1959, công nhân đắp đường ở khu Cầu Vực, sát thành Cổ Loa, {hole}đào trúng một cái hố vuông, mỗi bề chừng một mét. {in}Bên trong: chín mươi ba cân mũi tên đồng. {count}Ước chừng một vạn chiếc. {new}Khoảng ba phần tư còn nguyên như vừa ra khuôn, chưa được mài giũa. {joke}Nói kiểu bây giờ: một kho hàng… chưa bóc tem.',
      sfx: [['pop', 'y'], ['bonk', 'hole', 0.5], ['sparkle', 'in', 0.5], ['tada', 'count', 0.5], ['pop', 'new'], ['boing', ['joke', 1.4], 0.5]],
      draw(k) {
        k.backdrop('day', { ground: 620 });
        field(k, 620, '#c9a26a');
        T(k, '6/1959 · CẦU VỰC, CỔ LOA', 960, 100, 74, '#b5482c', k.at('y', 0.5));
        for (let i = 0; i < 3; i++) k.char(230 + i * 190, 760, 300, { ...DAN(KC[i + 1], { outfit: 'tunic', hat: 'non' }), face: k.t > k.cue('in') ? 'shock' : 'happy', pose: k.t > k.cue('in') ? 'point' : 'hold', p: k.at(k.cue('y', i * 0.15), 0.4), shadow: false });
        const hp = k.at('hole', 0.6);
        k.rect(760, 660, 420, 300, { fill: '#5a3d26', fillStyle: 'solid', width: 5, seed: 130, p: hp > 0 ? 1 : 0, alpha: hp });
        T(k, '~1 m × 1 m', 970, 610, 40, '#3b2f2a', k.at('hole', 0.6), { fx: 'fade' });
        for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
          const i = r * 6 + c;
          k.prop('arrowhead', 810 + c * 64, 730 + r * 90, 90, { rotate: (k.rand(i) - 0.5) * 0.8, p: k.at(k.cue('in', i * 0.04), 0.3) });
        }
        T(k, '93 kg', 1560, 330, 120, '#e4572e', k.at('in', 0.5));
        T(k, '≈ 10.000 mũi tên', 1560, 480, 70, '#3b2f2a', k.at('count', 0.5));
        T(k, '¾ vừa ra khuôn', 1560, 600, 56, '#6b5f55', k.at('new', 0.5));
        stamp(k, 1560, 840, 'CHƯA BÓC TEM', k.at('joke', 0.5), { w: 520, size: 60 });
        pill(k, 2);
      },
    },
    {
      say: 'Giờ mình thử sống một ngày làm thợ ở Cổ Loa, chỉ với những gì đã đào được. {morn}Sáng, mình gánh đất đắp thành, từng lớp, từng lớp. {noon}Trưa, mình vào xưởng trong thành, chỗ khu Đền Thượng bây giờ, nơi các nhà khảo cổ tìm thấy cả lò đúc lẫn khuôn đúc mũi tên. {pour}Rót đồng nóng chảy vào khuôn, {out}tách khuôn ra: một mũi tên ba cạnh. {aft}Chiều, mài cho sắc. {eve}Tối, lên thành gác, nhìn xuống hào nước. Ngày mai, lại thêm một mẻ tên nữa.',
      sfx: [['pop', 0.3], ['pop', 'morn'], ['whoosh', 'noon', 0.4], ['slideDown', 'pour', 0.4], ['ding', 'out', 0.5], ['scratch', 'aft', 0.4], ['sparkle', 'eve', 0.4]],
      draw(k) {
        const w = [1 - k.at('noon', 0.6), k.at('noon', 0.6) * (1 - k.at('aft', 0.6)), k.at('aft', 0.6) * (1 - k.at('eve', 0.6)), k.at('eve', 0.6)];
        k.backdrop('dawn', { ground: 760 });
        k.group({ a: k.at('noon', 0.6) }, () => k.backdrop('day', { ground: 760 }));
        k.group({ a: k.at('aft', 0.6) }, () => k.backdrop('sunset', { ground: 760 }));
        k.group({ a: k.at('eve', 0.6) }, () => k.backdrop('night', { ground: 760 }));
        const clock = ['SÁNG', 'TRƯA', 'CHIỀU', 'TỐI'];
        k.text('MỘT NGÀY LÀM THỢ Ở CỔ LOA', 960, 110, { size: 64, font: 'title', color: '#b5482c', fx: 'pop', p: k.at(0.3, 0.5), outline: '#fffaf0', outlineWidth: 12 });
        clock.forEach((c, i) => k.text(c, 230, 230, { size: 60, font: 'title', color: '#fff3c4', p: w[i] * k.at('morn', 0.4), fx: 'fade', outline: '#3b2f2a', outlineWidth: 10 }));
        const tag = (text, i) => k.group({ a: w[i] * k.at('morn', 0.4) }, () => box(k, 1500, 240, 700, 100, text, 1, { size: 36, fill: '#fff3c4' }));
        k.group({ a: w[0] }, () => {
          k.poly([[300, 762], [520, 560], [1500, 560], [1720, 762]], { fill: '#b98a55', fillStyle: 'solid', width: 5, seed: 140 });
          field(k, 760, '#9cc06a');
          k.char(900, 560, 330, { ...ME, face: 'happy', pose: 'hold', walk: true, shadow: false, bob: 3 });
          k.prop('pot', 1010, 470, 110, { fill: '#8a6a3a' });
          tag('thành đắp bằng đất', 0);
        });
        k.group({ a: w[1] }, () => {
          field(k, 760, '#c9a26a');
          k.prop('campfire', 640, 820, 260);
          k.prop('pot', 640, 700, 130, { fill: '#6b5f55' });
          k.char(960, 960, 380, { ...ME, face: k.t > k.cue('out') ? 'laugh' : 'calm', pose: k.t > k.cue('out') ? 'cheer' : 'hold', shadow: false });
          k.rect(1120, 800, 160, 110, { fill: '#a0703f', fillStyle: 'solid', width: 4, seed: 141, alpha: 1 - k.at('out', 0.4) });
          k.prop('arrowhead', 1200, 640, 200, { p: k.at('out', 0.5) });
          T(k, 'mũi tên 3 cạnh', 1200, 500, 46, '#b5482c', k.at(k.cue('out', 0.3), 0.5));
          tag('lò + khuôn đúc · khu Đền Thượng', 1);
        });
        k.group({ a: w[2] }, () => {
          field(k, 760, '#c9a26a');
          k.char(860, 960, 380, { ...ME, face: 'smug', pose: Math.sin(k.gt * 9) > 0 ? 'hold' : 'present', shadow: false });
          k.prop('arrowhead', 1060, 760, 140, { rotate: 0.4 });
          k.prop('rock', 1100, 880, 160);
          k.motion(1120, 760, 60, 0, { p: 1, n: 3, len: 50 });
          tag('mài giũa mũi tên', 2);
        });
        k.group({ a: w[3] }, () => {
          k.prop('moon', 1640, 380, 140);
          k.water(860, { color: '#2f5f8f', alpha: 0.9 });
          k.poly([[-40, 640], [1100, 640], [1240, 1120], [-40, 1120]], { fill: '#8a6a45', fillStyle: 'solid', width: 5, seed: 142 });
          k.char(640, 640, 360, { ...ME, face: 'calm', pose: 'hold', shadow: false });
          k.prop('crossbow', 800, 480, 200);
          tag('gác thành · hào nước', 3);
        });
        pill(k, 2);
      },
    },
    {
      say: '{same}Mũi tên Cổ Loa phần lớn có ba cạnh, {alike}và giống nhau như đúc, vì đúng là đúc từ khuôn. {mass}Đó là dấu hiệu của sản xuất hàng loạt. {team}Giờ hãy tưởng tượng: một hàng dài lính nỏ trên thành, {volley}cùng bắn một lúc, {stock}với cả vạn mũi tên dự trữ. {three}Ba trăm người ngã xuống sau một loạt tên, nghe không còn vô lý nữa. {secret}Có lẽ, nỏ thần không phải một cái nỏ, {line}mà là cả một dây chuyền sản xuất.',
      sfx: [['pop', 'same'], ['ding', 'alike', 0.4], ['pop', 'mass'], ['pop', 'team'], ['whoosh', 'volley', 0.6], ['whoosh', ['volley', 0.3], 0.5], ['pop', 'stock'], ['ding', 'three', 0.4], ['drumroll', 'secret', 0.3], ['tada', 'line', 0.5]],
      draw(k) {
        k.backdrop('sunset', { ground: 2000 });
        for (let i = 0; i < 9; i++) k.prop('arrowhead', 200 + i * 190, 220, 130, { p: k.at(k.cue('same', i * 0.08), 0.3) });
        T(k, 'GIỐNG NHAU NHƯ ĐÚC', 960, 360, 64, '#b5482c', k.at('alike', 0.5));
        k.poly([[-40, 720], [900, 720], [1000, 1120], [-40, 1120]], { fill: '#b98a55', fillStyle: 'solid', width: 5, seed: 150, p: k.at('team', 0.4) > 0 ? 1 : 0 });
        for (let i = 0; i < 6; i++) {
          k.char(90 + i * 140, 720, 220, { ...ME, color: KC[i % KC.length], face: 'angry', pose: 'hold', shadow: false, p: k.at(k.cue('team', i * 0.08), 0.3) });
          k.prop('crossbow', 160 + i * 140, 610, 110, { p: k.at(k.cue('team', i * 0.08), 0.3) });
        }
        for (let v = 0; v < 2; v++) {
          const f = k.at(k.cue('volley', v * 0.3), 1.4, 'linear');
          for (let i = 0; i < 6; i++) {
            const x0 = 230 + i * 140, x = x0 + f * (1050 - i * 40), y = 600 - Math.sin(f * Math.PI) * 140 + v * 30;
            k.line(x - 50, y + 6, x, y, { stroke: '#3b2f2a', width: 5, seed: 160 + i + v * 10, p: f > 0 && f < 1 ? 1 : 0 });
          }
        }
        stamp(k, 1460, 560, 'SẢN XUẤT HÀNG LOẠT', k.at('mass', 0.5), { w: 620, size: 48, color: '#3f6f2a' });
        T(k, '+ 10.000 mũi tên dự trữ', 1460, 720, 52, '#3b2f2a', k.at('stock', 0.5));
        stamp(k, 1460, 900, 'DÂY CHUYỀN SẢN XUẤT', k.at('line', 0.5), { w: 680, size: 50 });
        pill(k, 2);
      },
    },

    // ---------------- Bí ẩn 3 ----------------
    {
      chapter: 'Bí ẩn 3: Lẫy thần bị tráo thế nào?',
      say: '{n}Bí ẩn số ba. {td}Ở phương Bắc, Triệu Đà, vua nước Nam Việt, đánh Âu Lạc mãi không được. {plan}Đánh không được thì… làm thông gia. {ask}Triệu Đà cho con trai là Trọng Thủy sang hỏi Mỵ Châu, con gái An Dương Vương, làm vợ. {stay}Trọng Thủy ở lại Âu Lạc, làm rể. {job1}Nhiệm vụ chính thức: làm chồng. {job2}Nhiệm vụ không chính thức: tìm hiểu cái nỏ.',
      sfx: [['drumroll', 'n', 0.3], ['pop', 'td'], ['scratch', 'plan', 0.5], ['pop', 'ask'], ['sparkle', 'stay', 0.4], ['ding', 'job1', 0.4], ['boing', 'job2', 0.5]],
      draw(k) {
        intro(k, 3, 'Lẫy thần bị tráo thế nào?');
        k.group({ a: k.at(k.cue('n', 2.4), 0.5) }, () => {
          k.backdrop('day', { ground: G });
          k.prop('palace', 1350, 640, 560, { alpha: 0.9 });
          k.char(260, G, 460, { ...TD, face: k.t > k.cue('plan') ? 'smug' : 'angry', pose: k.t > k.cue('plan') ? 'think' : 'shout', p: k.at('td', 0.5) });
          T(k, 'Triệu Đà · Nam Việt', 260, 950, 44, '#7a2e2e', k.at('td', 0.5), { fx: 'fade' });
          T(k, 'THÔNG GIA!', 300, 260, 76, '#e4572e', k.at('plan', 0.5));
          k.char(820, G, 400, { ...TT, face: 'smug', pose: 'wave', p: k.at('ask', 0.5) });
          k.char(1060, G, 380, { ...MC, face: 'happy', pose: 'stand', p: k.at(k.cue('ask', 0.8), 0.5) });
          k.prop('heart', 940, 420, 110, { p: k.at('stay', 0.5), bob: 4 });
          k.char(1560, G, 440, { ...ADV, face: 'happy', pose: 'cheer', p: k.at('stay', 0.5) });
          T(k, 'Trọng Thủy', 820, 950, 42, '#2e6da4', k.at('ask', 0.5), { fx: 'fade' });
          T(k, 'Mỵ Châu', 1060, 950, 42, '#b5482c', k.at(k.cue('ask', 0.8), 0.5), { fx: 'fade' });
          box(k, 1350, 150, 760, 90, 'Nhiệm vụ chính thức: làm chồng', k.at('job1', 0.5), { size: 40, fill: '#e3f0dc' });
          box(k, 1350, 260, 760, 90, 'Không chính thức: tìm hiểu cái nỏ', k.at('job2', 0.5), { size: 40, fill: '#ffe9d6', color: '#c0392b' });
          k.icon('check', 1000, 150, 60, { p: k.at('job1', 0.5) });
          k.icon('eye', 1000, 260, 60, { p: k.at('job2', 0.5) });
          pill(k, 3);
        });
      },
    },
    {
      say: [
        '{dear}Trọng Thủy dỗ dành vợ:',
        { v: 'tt', text: '{see}Nàng cho ta xem nỏ thần của cha một chút, được không?' },
        '{show}Mỵ Châu tin chồng, đem nỏ ra cho xem. {swap}Trọng Thủy lén tháo chiếc vuốt rùa, {fake}thay bằng một cái lẫy thường. {nobody}Không ai hay biết. {modern}Thời nay, chúng ta cũng hay đưa mật khẩu cho người thân, rồi quên luôn là đã đưa. {lesson}Có lẽ đây là bài học bảo mật lâu đời nhất của người Việt: thứ quan trọng nhất, đừng cho ai xem.',
      ],
      sfx: [['pop', 'dear'], ['pop', 'see'], ['sparkle', 'show', 0.4], ['scratch', 'swap', 0.5], ['click', 'fake', 0.6], ['pop', 'nobody'], ['pop', 'modern'], ['boing', ['lesson', 2.6], 0.5]],
      draw(k) {
        const m = k.at('modern', 0.5);
        k.group({ a: 1 - m }, () => {
          k.backdrop('sunset', { ground: G });
          k.prop('palace', 960, 640, 600, { alpha: 0.5 });
          k.char(420, G, 420, { ...MC, face: 'happy', pose: k.t > k.cue('show') ? 'present' : 'stand', p: k.at('dear', 0.4) });
          k.char(900, G, 420, { ...TT, face: k.t > k.cue('swap') ? 'smug' : 'happy', pose: k.t > k.cue('swap') ? 'hold' : 'present', flip: true, p: k.at('dear', 0.4) });
          k.prop('crossbow', 660, 560, 220, { glow: k.t < k.cue('fake'), p: k.at('show', 0.5) });
          say(k, 'Cho ta xem nỏ một chút?', 'see', [880, 140, 480, 110], [920, 440]);
          const zp = k.at('swap', 0.5, 'back');
          k.group({ x: 1540, y: 560, s: Math.max(0.01, zp) }, () => {
            k.rect(-300, -220, 600, 440, { fill: '#fffaf0', fillStyle: 'solid', width: 6, seed: 170 });
            k.text('LẪY NỎ', 0, -170, { size: 44, font: 'title', color: '#b5482c' });
            claw(k, -130, 10, 2.4, 1 - k.at('fake', 0.5));
            k.rect(90, -50, 70, 110, { fill: '#9a9a9a', fillStyle: 'solid', width: 4, seed: 171, alpha: k.at('fake', 0.5) });
            k.arrow(-40, 0, 60, 0, { width: 6, p: k.at('fake', 0.5) });
            k.text('vuốt rùa → lẫy thường', 0, 170, { size: 36, font: 'title', fx: 'fade', p: k.at('fake', 0.5) });
          });
          T(k, 'không ai hay biết…', 960, 1010, 50, '#3b2f2a', k.at('nobody', 0.5), { fx: 'fade' });
        });
        k.group({ a: m }, () => {
          k.backdrop('day', { ground: G });
          k.char(520, G, 420, { ...DAN('#2e86de', { outfit: 'tunic', hat: undefined }), face: 'happy', pose: 'present' });
          k.char(1000, G, 400, { ...DAN('#ef6f9a', { outfit: 'dress', body: 'woman', hat: undefined, hair: 'long' }), face: 'laugh', pose: 'hold', flip: true });
          k.prop('phone', 760, 560, 160);
          k.text('mật khẩu: ******', 760, 400, { size: 46, font: 'title', fx: 'pop', p: k.at('modern', 0.5), outline: '#fffaf0', outlineWidth: 8 });
          stamp(k, 1480, 420, 'ĐỪNG CHO AI XEM', k.at('lesson', 0.5), { w: 600, size: 52 });
        });
        pill(k, 3);
      },
    },
    {
      say: 'Nhưng khoan, {old}bản kể cổ nhất mà ta còn đọc được nằm trong Giao Châu ngoại vực ký, được sách Thủy kinh chú của Trung Hoa dẫn lại. {cao}Bản này kể hơi khác: người làm nỏ là một thần nhân tên Cao Thông. {saw}Còn con trai Triệu Đà thì chẳng tráo gì cả: {cut}anh ta lấy cưa, cưa đứt luôn cái nỏ. {no}Không có vuốt rùa nào hết. {q}Vậy chiếc vuốt rùa từ đâu ra? {next}Đó là bí ẩn số bốn.',
      sfx: [['scratch', 0.2, 0.4], ['pop', 'old'], ['pop', 'cao'], ['scratch', 'saw', 0.5], ['scratch', ['saw', 0.6], 0.5], ['boom', 'cut', 0.4], ['bonk', 'no', 0.5], ['drumroll', 'q', 0.3], ['ding', 'next', 0.5]],
      draw(k) {
        doc(k, 520, 470, 820, 600, 'GIAO CHÂU NGOẠI VỰC KÝ', [['(dẫn trong Thủy kinh chú)', k.at('old', 0.6), '#6b5f55'], ['bản kể cổ nhất', k.at('old', 1), '#3f6f2a'], ['thần nhân Cao Thông làm nỏ', k.at('cao', 0.8)], ['con Triệu Đà…', k.at('saw', 0.6)], ['…cưa đứt nỏ!', k.at('cut', 0.6), '#c0392b']], k.at('old', 0.5), { gap: 80, size: 44 });
        const cut = k.at('cut', 0.5);
        k.group({ x: 1400, y: 420, r: -cut * 0.15 }, () => k.prop('crossbow', -40 * cut, 0, 420));
        const sx = Math.sin(k.gt * 12) * 40 * (k.t > k.cue('saw') && k.t < k.cue('cut') ? 1 : 0);
        k.group({ x: 1380 + sx, y: 330, r: 0.2, a: k.at('saw', 0.4) * (1 - k.at(k.cue('cut', 0.8), 0.4)) }, () => {
          k.rect(-120, -24, 240, 48, { fill: '#c9ced6', fillStyle: 'solid', width: 4, seed: 180 });
          k.rect(120, -30, 70, 60, { fill: '#8a5a35', fillStyle: 'solid', width: 4, seed: 181 });
          k.lines([[-120, 24], [-100, 40], [-80, 24], [-60, 40], [-40, 24], [-20, 40], [0, 24], [20, 40], [40, 24], [60, 40], [80, 24], [100, 40], [120, 24]], { width: 3, seed: 182 });
        });
        k.burst(1380, 440, 80, 'XOẸT!', { p: k.at('cut', 0.3) * (1 - k.at(k.cue('cut', 1.2), 0.3)), size: 40 });
        claw(k, 1150, 800, 2, k.at('no', 0.4));
        k.icon('cross', 1150, 790, 160, { p: k.at(k.cue('no', 0.3), 0.4) });
        T(k, 'không có vuốt rùa', 1530, 800, 54, '#c0392b', k.at('no', 0.5));
        k.icon('question', 1720, 200, 140, { p: k.at('q', 0.5) });
        T(k, '→ BÍ ẨN 4', 1500, 1000, 64, '#e4572e', k.at('next', 0.5));
        pill(k, 3);
      },
    },

    // ---------------- Bí ẩn 4 ----------------
    {
      chapter: 'Bí ẩn 4: Lông ngỗng và rùa vàng từ đâu ra?',
      say: [
        '{n}Bí ẩn số bốn. Nhưng trước hết, nghe nốt câu chuyện. {leave}Được việc, Trọng Thủy xin về thăm cha. Trước khi đi, chàng hỏi:',
        { v: 'tt', text: '{q}Nếu hai nước có chiến tranh, ta lạc nhau, thì làm sao tìm được nàng?' },
        { v: 'mc', text: '{a}Thiếp có áo lông ngỗng. Đi đến đâu, thiếp rắc lông ngỗng ở ngã ba đường làm dấu.' },
        '{sad}Một lời hẹn của người vợ thương chồng. {but}Nhưng lại thành tấm bản đồ, chỉ đường cho quân giặc.',
      ],
      sfx: [['drumroll', 'n', 0.3], ['pop', 'leave'], ['pop', 'q'], ['sparkle', 'a', 0.4], ['pop', 'sad'], ['scratch', 'but', 0.5]],
      draw(k) {
        intro(k, 4, 'Áo lông ngỗng và rùa vàng từ đâu ra?');
        k.group({ a: k.at(k.cue('n', 2.4), 0.5) }, () => {
          const b = k.at('but', 0.6);
          k.group({ a: 1 - b }, () => {
            k.backdrop('sunset', { ground: G });
            k.poly([[700, 1120], [900, G], [1020, G], [1220, 1120]], { fill: '#d9c08a', fillStyle: 'solid', stroke: 'none', seed: 190 });
            k.char(560, G, 420, { ...TT, face: 'sad', pose: k.t > k.cue('q') ? 'shrug' : 'wave', p: k.at('leave', 0.5) });
            k.char(1300, G, 400, { ...MC, face: k.t > k.cue('a') ? 'happy' : 'sad', pose: k.t > k.cue('a') ? 'present' : 'stand', flip: true, p: k.at('leave', 0.5) });
            for (let i = 0; i < 6; i++) {
              const t = (k.gt * 0.25 + i / 6) % 1;
              k.prop('feather', 1180 + Math.sin(t * 6 + i) * 120 - i * 40, 300 + t * 520, 70, { rotate: Math.sin(t * 5 + i), p: k.at('a', 0.5) });
            }
            say(k, 'Lạc nhau thì tìm nàng sao?', 'q', [300, 140, 520, 110], [560, 440]);
            say(k, 'Thiếp rắc lông ngỗng làm dấu!', 'a', [1040, 140, 600, 110], [1260, 460]);
          });
          k.group({ a: b }, () => {
            k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#e9e2c8', fillStyle: 'solid', stroke: 'none', seed: 191 });
            k.lines([[260, 900], [600, 700], [900, 760], [1200, 520], [1500, 420]], { stroke: '#a0703f', width: 10, seed: 192 });
            [[600, 700], [900, 760], [1200, 520]].forEach(([x, y], i) => k.prop('feather', x, y - 60, 90, { rotate: 0.4, p: k.at(k.cue('but', 0.3 + i * 0.25), 0.4) }));
            k.char(260, 900, 200, { ...ADV, face: 'shock', pose: 'stand', shadow: false });
            k.char(140, 900, 180, { ...MC, face: 'sad', pose: 'stand', shadow: false });
            for (let i = 0; i < 4; i++) k.char(1500 + i * 90, 470, 160, { ...NAM, face: 'angry', pose: 'point', flip: true, shadow: false, p: k.at(k.cue('but', 1), 0.4) });
            T(k, 'BẢN ĐỒ CHỈ ĐƯỜNG', 960, 140, 76, '#c0392b', k.at('but', 0.6));
          });
          pill(k, 4);
        });
      },
    },
    {
      say: 'Mà khoan, {pause}nhớ kỹ con rùa vàng nhé. {later}Tương truyền, hơn một nghìn sáu trăm năm sau, nó còn hiện lên một lần nữa, {lake}giữa một cái hồ ở Hà Nội, {sword}và lần ấy, nó đến để đòi lại một thanh gươm. {ep}Chuyện đó, để tập sau.',
      sfx: [['scratch', 'pause', 0.4], ['whoosh', 'later', 0.4], ['pop', 'lake'], ['sparkle', 'sword', 0.5], ['ding', 'ep', 0.4]],
      draw(k) {
        k.backdrop('dawn', { ground: 2000 });
        const l = k.at('lake', 0.6);
        k.ellipse(1300, 860, 1100 * Math.max(0.01, l), 280 * Math.max(0.01, l), { fill: '#5b9bd5', fillStyle: 'solid', width: 4, seed: 200 });
        k.prop('turtle', 600, 560, 520, { glow: true, p: k.at('pause', 0.5) });
        T(k, 'NHỚ KỸ!', 600, 180, 90, '#e4572e', k.at('pause', 0.5));
        T(k, '+1.600 năm', 1300, 200, 100, '#b5482c', k.at('later', 0.5));
        k.icon('clock', 1700, 380, 150, { p: k.at('later', 0.5), rotate: k.gt * 2 });
        k.prop('turtle', 1300, 840, 220, { p: k.at('sword', 0.5), bob: 4 });
        sword(k, 1300, 700, 1.4, 0, k.at(k.cue('sword', 0.4), 0.5));
        T(k, 'TẬP SAU', 1300, 1010, 64, '#e4572e', k.at('ep', 0.4));
        pill(k, 4);
      },
    },
    {
      say: [
        '{war}Rồi Triệu Đà đem quân sang đánh. {chess}Theo Toàn thư, An Dương Vương cậy có nỏ thần, vẫn điềm nhiên ngồi đánh cờ, cười mà nói:',
        { v: 'adv', text: '{laugh}Đà không sợ nỏ thần sao?' },
        '{near}Quân giặc đến sát thành. {shoot}Vua cầm nỏ lên, thì chiếc vuốt rùa đã mất. {flee}Vua thua, đặt Mỵ Châu ngồi sau ngựa, chạy về phương Nam. {fe}Dọc đường, lông ngỗng trắng rơi theo từng ngã ba.',
      ],
      sfx: [['drumroll', 'war', 0.3], ['click', 'chess', 0.5], ['pop', 'laugh'], ['boom', 'near', 0.4], ['wahwah', 'shoot', 0.5], ['whoosh', 'flee', 0.5], ['sparkle', 'fe', 0.3]],
      draw(k) {
        const f = k.at('flee', 0.6);
        k.group({ a: 1 - f }, () => {
          k.backdrop('sunset', { ground: G });
          k.prop('palace', 520, 640, 520, { alpha: 0.9 });
          k.rect(560, 760, 220, 120, { fill: '#c98a3a', fillStyle: 'solid', width: 4, seed: 210, p: k.at('chess', 0.4) > 0 ? 1 : 0 });
          for (let i = 1; i < 4; i++) { k.line(560 + i * 55, 760, 560 + i * 55, 800, { width: 2, seed: 211 + i }); }
          k.dot(600, 775, 9, '#c0392b'); k.dot(700, 780, 9, '#3b2f2a');
          const lost = k.t > k.cue('shoot');
          k.char(380, G, 440, { ...ADV, face: lost ? 'shock' : k.t > k.cue('laugh') ? 'laugh' : 'smug', pose: lost ? 'hold' : 'hips', p: k.at('chess', 0.5) });
          k.prop('crossbow', 520, 560, 200, { glow: false, p: k.at('shoot', 0.4) });
          say(k, 'Đà không sợ nỏ thần sao?', 'laugh', [60, 140, 560, 110], [380, 430]);
          const adv = k.at('near', 1.6, 'out');
          for (let i = 0; i < 6; i++) k.char(1900 - adv * 700 + (i % 3) * 150, G + (i > 2 ? 90 : 0), 260, { ...NAM, face: 'angry', pose: i % 2 ? 'fight' : 'point', walk: true, flip: true, shadow: false, p: k.at('war', 0.5) });
          T(k, 'mất vuốt rùa!', 520, 380, 56, '#c0392b', k.at(k.cue('shoot', 0.6), 0.5));
        });
        k.group({ a: f }, () => {
          k.backdrop('night', { ground: 900 });
          const x = 300 + 1100 * k.at('flee', 6, 'linear');
          k.char(x - 70, 860, 300, { ...MC, face: 'sad', pose: 'stand', shadow: false });
          k.char(x + 10, 840, 320, { ...ADV, face: 'sad', pose: 'point', shadow: false });
          k.prop('horse', x, 850, 360, { bob: 6 });
          k.motion(x - 220, 760, -1, 0, { p: 1, n: 4, len: 90 });
          for (let i = 0; i < 8; i++) {
            const fx = x - 240 - i * 160, fy = 940 + Math.sin(k.gt * 2 + i) * 10;
            k.prop('feather', fx, fy, 60, { rotate: 1.2 + Math.sin(i), p: k.at(k.cue('fe', i * 0.12), 0.4) * (fx > -40 ? 1 : 0) });
          }
          T(k, 'CHẠY VỀ PHƯƠNG NAM', 960, 140, 72, '#fff3c4', k.at('flee', 0.6), { fx: 'fade' });
        });
        pill(k, 4);
      },
    },
    {
      say: [
        '{sea}Đến bờ biển, hết đường. Vua kêu:',
        { v: 'adv', text: '{call}Sứ Thanh Giang đâu, mau lại cứu ta!' },
        '{rise}Rùa vàng nổi lên, nói:',
        { v: 'rua', text: '{enemy}Kẻ ngồi sau ngựa, chính là giặc đó.' },
        '{sword}Vua tuốt gươm chém Mỵ Châu, {horn}rồi cầm sừng tê bảy tấc, theo rùa rẽ nước xuống biển. {place}Tương truyền nơi ấy là núi Mộ Dạ, ở Diễn Châu, Nghệ An. Ở đó, đền Cuông vẫn thờ An Dương Vương đến tận hôm nay.',
      ],
      sfx: [['whoosh', 'sea', 0.4], ['pop', 'call'], ['sparkle', 'rise', 0.5], ['gong', 'enemy', 0.4], ['whoosh', 'sword', 0.4], ['slideDown', 'horn', 0.4], ['ding', 'place', 0.4]],
      draw(k) {
        k.backdrop('sunset', { ground: 2000 });
        k.water(760, { color: '#3f6f9a' });
        k.poly([[-40, 740], [760, 740], [980, 1120], [-40, 1120]], { fill: '#d9c08a', fillStyle: 'solid', width: 5, seed: 220 });
        const pl = k.at('place', 0.6);
        k.group({ a: pl }, () => {
          k.prop('mountain', 300, 600, 420, { fill: '#6fa860' });
          k.prop('temple', 300, 440, 150);
          T(k, 'đền Cuông · Diễn Châu, Nghệ An', 600, 160, 50, '#b5482c', 1, { fx: 'fade' });
        });
        k.prop('horse', 200, 900, 300, { alpha: 1 - pl });
        const fl = k.at('sword', 0.6);
        k.char(420, 960, 360, { ...MC, face: 'sad', pose: 'stand', alpha: 1 - fl, shadow: false });
        const wx = 640 + 520 * k.at('horn', 3, 'inOut');
        k.char(wx, 960 + 120 * k.at('horn', 3, 'inOut'), 420, { ...ADV, face: k.t > k.cue('enemy') ? 'shock' : 'sad', pose: k.t > k.cue('horn') ? 'hold' : k.t > k.cue('call') ? 'shout' : 'stand', shadow: false, alpha: 1 - pl * 0.9 });
        k.prop('horn', wx + 90, 640 + 120 * k.at('horn', 3, 'inOut'), 110, { p: k.at('horn', 0.4), alpha: 1 - pl * 0.9 });
        const rise = k.at('rise', 1.2);
        k.prop('turtle', 1440, 900 - rise * 130, 320, { glow: true, talk: k.t > k.cue('enemy') && k.t < k.cue('sword'), p: rise > 0 ? 1 : 0, alpha: rise });
        say(k, 'Kẻ ngồi sau ngựa là giặc!', 'enemy', [1100, 200, 680, 110], [1460, 640]);
        const flash = Math.sin(Math.min(1, fl) * Math.PI);
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#fffaf0', fillStyle: 'solid', stroke: 'none', seed: 221, alpha: flash * 0.85 });
        pill(k, 4);
      },
    },
    {
      say: [
        '{wish}Theo Lĩnh Nam chích quái, trước khi chết, Mỵ Châu khấn:',
        { v: 'mc', text: '{vow}Nếu thiếp có lòng phản nghịch, chết đi xin thành cát bụi. Nếu một lòng trung hiếu mà bị lừa dối, chết đi xin hoá thành châu ngọc.' },
        '{blood}Máu nàng chảy xuống biển, trai sò ăn phải, hoá thành ngọc. {tt}Trọng Thủy lần theo lông ngỗng tìm đến, ôm xác vợ mà khóc, {well}rồi về Loa thành, nhảy xuống giếng mà chết. {pearl}Người đời sau mò được ngọc trai, rửa bằng nước giếng ấy, ngọc sáng thêm. {today}Ở Cổ Loa ngày nay vẫn còn giếng Ngọc, và am thờ Mỵ Châu.',
      ],
      sfx: [['pop', 'wish'], ['sparkle', 'blood', 0.5], ['pop', 'tt'], ['slideDown', 'well', 0.4], ['sparkle', 'pearl', 0.5], ['ding', 'today', 0.4]],
      draw(k) {
        const d = k.at('today', 0.6);
        k.group({ a: 1 - d }, () => {
          k.backdrop('night', { ground: 2000 });
          k.water(420, { color: '#2f5f8f' });
          k.char(420, 860, 400, { ...MC, face: 'sad', pose: 'stand', float: true, alpha: 0.85 * (1 - k.at('blood', 0.8)), p: k.at('wish', 0.5) });
          say(k, 'Trung hiếu bị lừa… xin hoá châu ngọc', 'vow', [80, 120, 700, 120], [420, 400], { size: 40 });
          for (let i = 0; i < 4; i++) k.prop('oyster', 820 + i * 200, 1000, 140, { open: 0.5 + 0.5 * Math.sin(k.gt * 1.5 + i), glow: true, p: k.at(k.cue('blood', i * 0.2), 0.5) });
          k.prop('well', 1640, 900, 260, { p: k.at('well', 0.5) });
          k.char(1620, 760, 300, { ...TT, face: 'sad', pose: 'facepalm', shadow: false, p: k.at('tt', 0.5), alpha: 1 - k.at(k.cue('well', 1), 0.8) });
          T(k, 'NGỌC SÁNG THÊM', 1300, 220, 70, '#fff3c4', k.at('pearl', 0.5), { fx: 'fade' });
        });
        k.group({ a: d }, () => {
          k.backdrop('day', { ground: G });
          k.prop('temple', 560, 700, 300);
          k.prop('well', 1300, 860, 300);
          k.prop('tree', 1700, 760, 300);
          T(k, 'CỔ LOA NGÀY NAY', 960, 120, 80, '#b5482c', k.at('today', 0.5));
          T(k, 'am thờ Mỵ Châu', 560, 960, 50, '#3b2f2a', k.at(k.cue('today', 0.4), 0.5), { fx: 'fade' });
          T(k, 'giếng Ngọc', 1300, 990, 50, '#3b2f2a', k.at(k.cue('today', 0.8), 0.5), { fx: 'fade' });
        });
        pill(k, 4);
      },
    },
    {
      say: 'Và đây là lời giải cho bí ẩn số bốn. {gcn}Bản cổ nhất, trong Giao Châu ngoại vực ký: {no1}không có rùa vàng, {no2}không có áo lông ngỗng, {no3}không có ngọc trai, cũng chẳng có giếng. {later}Những chi tiết ấy xuất hiện ở các bản về sau: {lnck}Lĩnh Nam chích quái, {toan}rồi Đại Việt sử ký toàn thư năm 1479. {why}Vì sao người xưa thêm vào? {judge}Có lẽ, mỗi chi tiết là một lời phán xét. {f}Lông ngỗng nói: Mỵ Châu vô tình chỉ đường cho giặc. {c}Ván cờ nói: nhà vua đã chủ quan. {p}Còn ngọc trai thì nói: người ta vẫn thương nàng.',
      sfx: [['tada', 0.3, 0.4], ['pop', 'gcn'], ['bonk', 'no1', 0.4], ['bonk', 'no2', 0.4], ['bonk', 'no3', 0.4], ['pop', 'later'], ['pop', 'lnck'], ['pop', 'toan'], ['drumroll', 'why', 0.3], ['ding', 'judge', 0.4], ['pop', 'f'], ['pop', 'c'], ['sparkle', 'p', 0.5]],
      draw(k) {
        const j = k.at('judge', 0.6);
        k.group({ a: 1 - j }, () => {
          T(k, 'TRUYỆN LỚN DẦN THEO THỜI GIAN', 960, 90, 60, '#b5482c', k.at(0.3, 0.5));
          const cols = [['gcn', 'Giao Châu ngoại vực ký', 'bản cổ nhất', 330], ['lnck', 'Lĩnh Nam chích quái', '~ thế kỷ XIV–XV', 960], ['toan', 'Toàn thư', '1479', 1590]];
          cols.forEach(([c, t, s, x], i) => {
            box(k, x, 250, 520, 130, t, k.at(c, 0.5), { sub: s, size: 40 });
            if (i < 2) k.arrow(x + 270, 250, x + 360, 250, { width: 6, p: k.at(cols[i + 1][0], 0.4) });
          });
          [['turtle', 'no1'], ['feather', 'no2'], ['oyster', 'no3']].forEach(([pr, c], i) => {
            const y = 480 + i * 190;
            k.prop(pr, 330, y, 150, { p: k.at(c, 0.4), alpha: 0.5 });
            k.icon('cross', 330, y, 150, { p: k.at(k.cue(c, 0.2), 0.3) });
            k.prop(pr, 960, y, 150, { p: k.at('lnck', 0.4) });
            k.icon('check', 1080, y, 70, { p: k.at(k.cue('lnck', 0.3), 0.3) });
            k.prop(pr, 1590, y, 150, { p: k.at('toan', 0.4) });
            k.icon('check', 1710, y, 70, { p: k.at(k.cue('toan', 0.3), 0.3) });
          });
          T(k, '?', 960, 1000, 90, '#e4572e', k.at('why', 0.4));
        });
        k.group({ a: j }, () => {
          T(k, 'MỖI CHI TIẾT = 1 LỜI PHÁN XÉT', 960, 110, 64, '#b5482c', k.at('judge', 0.5));
          const items = [['f', 330, () => k.prop('feather', 330, 420, 220, { rotate: 0.4, p: k.at('f', 0.5) }), 'Mỵ Châu vô tình', 'chỉ đường cho giặc'],
            ['c', 960, () => { k.rect(840, 360, 240, 150, { fill: '#c98a3a', fillStyle: 'solid', width: 4, seed: 230, p: k.at('c', 0.4) > 0 ? 1 : 0 }); k.dot(900, 420, 14, '#c0392b', k.at('c', 0.4)); k.dot(1010, 450, 14, '#3b2f2a', k.at('c', 0.4)); }, 'Nhà vua', 'đã chủ quan'],
            ['p', 1590, () => k.prop('oyster', 1590, 430, 240, { glow: true, p: k.at('p', 0.5) }), 'Người ta', 'vẫn thương nàng']];
          items.forEach(([c, x, art, a, b]) => {
            art();
            k.text(a, x, 680, { size: 50, font: 'title', fx: 'pop', p: k.at(c, 0.5) });
            k.text(b, x, 760, { size: 50, font: 'title', color: c === 'p' ? '#3f6f2a' : '#c0392b', fx: 'pop', p: k.at(k.cue(c, 0.3), 0.5) });
          });
        });
        pill(k, 4);
      },
    },

    // ---------------- Bí ẩn 5 ----------------
    {
      chapter: 'Bí ẩn 5: Âu Lạc mất năm nào?',
      say: '{n}Bí ẩn cuối cùng. {toan}Toàn thư chép, Âu Lạc mất năm 208 trước Công nguyên. {sk}Nhưng dựa vào Sử ký của Tư Mã Thiên, nhiều nhà sử học hiện nay cho rằng Âu Lạc mất muộn hơn, khoảng năm 179 trước Công nguyên. {mark}Sử học Việt Nam ngày nay lấy mốc ấy làm điểm mở đầu {long}cho hơn một nghìn năm Bắc thuộc, {ngo}kéo dài đến tận chiến thắng Bạch Đằng của Ngô Quyền năm 938. {weight}Có lẽ vì thế, câu chuyện này mới được kể với nỗi đau lớn đến vậy: nó là cánh cửa mở vào nghìn năm ấy.',
      sfx: [['drumroll', 'n', 0.3], ['pop', 'toan'], ['scratch', 'sk', 0.4], ['pop', 'mark'], ['slideUp', 'long', 0.4], ['tada', 'ngo', 0.5], ['pop', 'weight']],
      draw(k) {
        intro(k, 5, 'Nước Âu Lạc mất năm nào?');
        k.group({ a: k.at(k.cue('n', 2.4), 0.5) }, () => {
          T(k, 'ÂU LẠC MẤT NĂM NÀO?', 960, 110, 74, '#b5482c', k.at(k.cue('n', 2.4), 0.5));
          k.arrow(140, 620, 1800, 620, { width: 8, p: k.at('toan', 1.6, 'linear') });
          const mk = (x, c, top, bot, col) => {
            k.line(x, 580, x, 660, { width: 6, p: k.at(c, 0.3), seed: Math.round(x) });
            k.text(top, x, 500, { size: 60, font: 'title', color: col, fx: 'pop', p: k.at(c, 0.5), outline: '#fffaf0', outlineWidth: 10 });
            k.text(bot, x, 720, { size: 38, font: 'title', fx: 'fade', p: k.at(c, 0.6), maxWidth: 400 });
          };
          mk(300, 'toan', '208 TCN', 'Toàn thư (1479)', '#b5482c');
          mk(800, 'sk', '~179 TCN', 'theo Sử ký · Tư Mã Thiên', '#2e6da4');
          mk(1640, 'ngo', '938', 'Bạch Đằng · Ngô Quyền', '#3f6f2a');
          const lp = k.at('long', 1.8, 'inOut');
          k.rect(800, 820, Math.max(1, 840 * lp), 80, { fill: '#8a7a6a', fillStyle: 'solid', width: 4, seed: 240, p: lp > 0 ? 1 : 0 });
          k.text('Bắc thuộc · hơn 1.000 năm', 1220, 862, { size: 46, font: 'title', color: '#fffaf0', fx: 'fade', p: k.at(k.cue('long', 1), 0.6) });
          k.char(300, 420, 220, { ...MC, face: 'sad', pose: 'stand', shadow: false, p: k.at('weight', 0.5) });
          T(k, 'cánh cửa mở vào nghìn năm', 960, 1010, 54, '#3b2f2a', k.at('weight', 1.2), { fx: 'fade' });
          pill(k, 5);
        });
      },
    },

    // ---------------- Kết ----------------
    {
      chapter: 'Nỏ thần thật sự là gì?',
      say: 'Quay lại khoảnh khắc đầu video: {pull}mình bóp lẫy, và chẳng có gì xảy ra. {know}Giờ thì mình hiểu. {notin}Phép thần chưa bao giờ nằm trong một chiếc vuốt rùa. {arrows}Nó nằm trong một vạn mũi tên đồng, {walls}trong ba vòng thành đất, {people}và trong những người thợ, người lính Cổ Loa. {lost}Thứ mất đi hôm ấy không phải phép thần, {echo}mà là sự cảnh giác. {now}Và hai nghìn năm sau, người Việt vẫn kể lại chuyện này, để nhắc nhau đừng đánh mất nó thêm lần nào nữa.',
      sfx: [['click', 'pull', 0.6], ['pop', 'know'], ['bonk', 'notin', 0.4], ['pop', 'arrows'], ['pop', 'walls'], ['pop', 'people'], ['pop', 'lost'], ['gong', 'echo', 0.4], ['sparkle', 'now', 0.5]],
      draw(k) {
        const a = k.at('arrows', 0.5);
        k.group({ a: 1 - a }, () => {
          k.backdrop('sunset', { ground: 820 });
          k.poly([[-40, 600], [1100, 600], [1230, 1120], [-40, 1120]], { fill: '#b98a55', fillStyle: 'solid', width: 5, seed: 250 });
          k.char(500, 600, 400, { ...ME, face: k.t > k.cue('know') ? 'calm' : 'shock', pose: 'hold', shadow: false });
          k.prop('crossbow', 680, 430, 230);
          claw(k, 1300, 420, 3, k.at('notin', 0.4));
          k.icon('cross', 1300, 410, 220, { p: k.at(k.cue('notin', 0.3), 0.4) });
        });
        k.group({ a }, () => {
          const cols = [['arrows', 330, '1 vạn mũi tên đồng', () => { for (let i = 0; i < 5; i++) k.prop('arrowhead', 230 + i * 50, 420, 110, { rotate: (i - 2) * 0.15 }); }],
            ['walls', 960, '3 vòng thành đất', () => citadel(k, 960, 420, 0.42, [1, 1, 1, 1])],
            ['people', 1590, 'người thợ, người lính', () => { for (let i = 0; i < 3; i++) k.char(1450 + i * 140, 560, 260, { ...ME, color: KC[i], face: 'happy', pose: 'hold', shadow: false }); }]];
          cols.forEach(([c, x, t, art]) => {
            k.group({ a: k.at(c, 0.5) }, art);
            k.text(t, x, 680, { size: 50, font: 'title', fx: 'pop', p: k.at(c, 0.5), outline: '#fffaf0', outlineWidth: 10 });
          });
          cap(k, 'Thứ mất đi không phải phép thần…', 'lost', { y: 850, size: 52, color: '#6b5f55' });
          cap(k, '…mà là sự cảnh giác', 'echo', { y: 960, size: 64, hl: '#ffe08a' });
        });
      },
    },

    // ---------------- Tóm tắt ----------------
    {
      chapter: 'Tóm tắt',
      say: '{remind}Trước khi tóm tắt: nhớ con rùa vàng nhé, tập sau nó quay lại. {t}Tóm lại năm bí ẩn: {a}Một, Cổ Loa có thật: ba vòng thành đất, vòng ngoài gần tám cây số. {b}Hai, nỏ thần có lẽ là cả một đội nỏ, cùng một xưởng đúc hàng vạn mũi tên. {c}Ba, bản kể cổ nhất nói nỏ bị cưa đứt, không có vuốt rùa. {d}Bốn, rùa vàng, lông ngỗng, ngọc trai được thêm dần về sau. {e}Năm, Âu Lạc mất năm 208 theo Toàn thư, hay khoảng năm 179 trước Công nguyên theo nhiều nhà sử học.',
      sfx: [['ding', 'remind', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['pop', 'e']],
      draw(k) {
        k.group({ a: 1 - k.at('t', 0.4) }, () => {
          k.prop('turtle', 960, 560, 560, { glow: true, p: k.at('remind', 0.5) });
          T(k, 'nhớ rùa vàng nhé!', 960, 180, 90, '#e4572e', k.at('remind', 0.5));
        });
        k.text('Tóm tắt: 5 bí ẩn', 960, 90, { size: 76, font: 'title', p: k.at('t', 0.8, 'linear') });
        const rows = [['a', 'Cổ Loa có thật: 3 vòng thành đất, vòng ngoài ~8 km', '#b5482c', () => citadel(k, 180, 220, 0.14, [1, 1, 1, 1])],
          ['b', 'Nỏ thần ≈ đội nỏ + xưởng đúc hàng vạn mũi tên', '#3f6f2a', () => k.prop('arrowhead', 180, 380, 110)],
          ['c', 'Bản cổ nhất: nỏ bị cưa đứt, không có vuốt rùa', '#7a2e2e', () => k.prop('crossbow', 180, 540, 140)],
          ['d', 'Rùa vàng, lông ngỗng, ngọc trai: thêm về sau', '#1f7a8c', () => k.prop('feather', 180, 700, 110, { rotate: 0.4 })],
          ['e', 'Âu Lạc mất: 208 TCN (Toàn thư) hay ~179 TCN', '#8e5bd3', () => k.text('?', 180, 860, { size: 90, font: 'title', color: '#8e5bd3' })]];
        rows.forEach(([c, t, col, art], i) => {
          k.group({ a: k.at(c, 0.4) }, art);
          k.text(t, 300, 220 + i * 160, { size: 50, font: 'title', align: 'left', color: col, p: k.at(c, 1.4, 'linear'), maxWidth: 1540 });
        });
      },
    },
    nextEpisodeScene({
      say: '{next}Tập sau: Rùa thần Hồ Gươm. {why}Hơn một nghìn sáu trăm năm sau Cổ Loa, rùa vàng hiện lên giữa hồ, đòi lại thanh gươm của vua Lê Lợi. {more}Và giữa chính cái hồ ấy, từng có một cụ rùa thật, sống đến tận năm 2016. Rùa thần và cụ rùa, có liên quan gì đến nhau không? Hẹn bạn ở tập sau.',
      title: 'Rùa thần Hồ Gươm: từ trả gươm đến cụ rùa thật',
      hook: 'Một cụ rùa thật sống giữa hồ đến năm 2016',
      when: 'Tập 7 · series Truyền thuyết Việt Nam',
      art: (k) => {
        k.prop('turtle', -150, 40, 380, { glow: true });
        sword(k, 260, 60, 1.2, 0.2, 1);
      },
      sfx: [['sparkle', 'why', 0.4]],
    }),
    subscribeScene({
      say: 'Còn bạn, {q}theo bạn, lỗi mất nỏ thần là của ai: Mỵ Châu cả tin, Trọng Thủy lừa dối, hay An Dương Vương chủ quan? Viết lý do của bạn vào phần bình luận nhé, mình đọc hết. {sub}Và bấm đăng ký, bật chuông, để không lỡ tập sau về Rùa thần Hồ Gươm!',
      question: 'Lỗi mất nỏ thần là của ai?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
