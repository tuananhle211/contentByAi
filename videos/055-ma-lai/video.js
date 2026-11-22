// Series Sinh vật dân gian — Ma lai có thật không? (nối 042 Rùa thần: đã hứa "vì sao có người bị cả làng đồn là ma lai"
//   và "nhớ những đốm sáng đỏ bay trên hồ năm 1786").
// Bản 03/11 — viết lại cho HÀI hơn (người dùng: "video chưa hài lắm"). Bài học dữ liệu áp dụng:
//   - Câu được tua lại xem là câu chốt kiểu "đời thường hoá" (Sơn Tinh "đến muộn mấy tiếng, mất luôn người yêu", Rồng Tiên
//     "du lịch sinh thái", Lang Liêu "MasterChef") → mỗi cảnh ≥ 1 câu chốt kiểu này + SFX ngay sau.
//   - Running gag "ai trông cái thân?" từ hook → gọi lại ở kết, biến thành ý nghĩa thật.
//   - Nhân vật có giọng riêng cãi nhau (cái đầu ma lai lắm mồm), hình gag (hội nghị thượng đỉnh, bãi gửi thân, nhóm chat).
//   - Bí ẩn 5 (nỗi oan có thật) KHÔNG đùa; kết trân trọng.
// Đối chiếu:
//  - Họ hàng Đông Nam Á (Wikipedia "Krasue"): Krasue (Thái), Ahp (Campuchia), Kasu (Lào), Penanggalan (Malaysia), Kuyang (Indonesia),
//    Ma lai (Việt Nam), Manananggal (Philippines — tách nửa thân trên, cánh dơi). Đầu phụ nữ bay, nội tạng thòng; phát sáng như ma trơi.
//    Thức ăn (bản Thái/Khmer): máu, thịt sống, khi không có máu thì đồ bẩn/phân; Ahp: nhau thai, trẻ sơ sinh.
//    Phòng: rào gai/tre gai để vướng ruột (Thái); chôn sâu nhau thai (Campuchia). Giấu/huỷ thân thì ma chết.
//    Phim: Krasue Sao (1973), Krasue Valentine (2006). Camera an ninh 2008: nhà nghiên cứu ĐH Chulalongkorn (Chawan Koopipat) kết luận
//    nhiều khả năng là ánh sáng phản chiếu trên nền ướt. Giả thuyết khí mê-tan bị Sirintornthep Towprayoon phản bác (không đủ để cháy).
//  - Carol Laderman, Wives and Midwives: Childbirth and Nutrition in Rural Malaysia (1983).
//  - Tang thương ngẫu lục: mùa hạ 1786, nửa đêm vật đỏ ối hiện giữa Hồ Gươm, toả sáng, bay về bờ nam rồi mất (đã dùng ở 042).
//  - Tiền Phong 24/7/2013 "Thảm án Ma lai…": người Xơ Đăng tin ma lai rút đầu kéo chùm ruột bay đi; tin ma lai cưỡi chim lợn,
//    chim lợn kêu là làng có người chết; người bị vu oan vì xinh đẹp, giàu, có mâu thuẫn, không được ưa.
//    Đắk Yă (Mang Yang, Gia Lai) 2007: sau khi một cụ bà chết, nghi "thuốc thư" → 3 người bị đánh chết, có cụ ông 76 tuổi.
//    Kon Tum: một người bị nghi ma lai sau khi có người chết vì ngộ độc rượu → bị đốt nhà, đuổi, sát hại. Bác sĩ: ngộ độc rượu,
//    xuất huyết não. Không nêu tên người.
//  - Báo Pháp luật VN 16/6/2012: thanh niên ở Gia Lai tự xưng có thuốc thư để được đưa tiền, nhậu ké; công an vào cuộc, nhận tội,
//    xin lỗi, được làng tha thứ; "các cuộc nhậu trong làng vui vẻ hơn".
//  - Cú lợn (barn owl): Malaysia dùng hộp tổ cho cú lợn bắt chuột trong đồn điền cọ dầu (MPOB).
//  - Săn phù thuỷ châu Âu TK 15–18: ước tính khoảng 40.000–60.000 người bị xử tử, phần lớn phụ nữ (Levack).
//  - Tập sau (Truyền thuyết đô thị VN): những căn nhà bỏ hoang ở Hà Nội từng bị đồn có ma (Báo Pháp luật VN: "ma ám chưa rõ, lãng phí thì có thật").
// Tôn trọng đồng bào vùng cao: không giễu niềm tin, chỉ giễu chi tiết vô lý + chính chúng ta; nhấn mạnh hiện tượng phổ quát.
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import * as thumbs from '/videos/055-ma-lai/thumbs.js';

const G = 880;
const ME = { body: 'man', outfit: 'tunic', color: '#e4572e', color2: '#f6c344', hair: 'topknot' }; // "mình"
const BA = { body: 'woman', outfit: 'dress', color: '#3b3f5a', color2: '#c9a24a', hair: 'bun', hairColor: '#e9e4dc' }; // bà nội
const CO = { body: 'woman', outfit: 'dress', color: '#7a6a8a', color2: '#d9d4cb', hair: 'long', hairColor: '#2b2b2b' }; // "ma lai" ban ngày
const SANPHU = { body: 'woman', outfit: 'dress', color: '#ef6f9a', color2: '#f6c344', hair: 'bun' };
const SCI = { body: 'woman', outfit: 'dress', color: '#2e6da4', color2: '#e9e4dc', hair: 'short', hairColor: '#c9a06a' };
const SCI2 = { body: 'man', outfit: 'robe', color: '#3bb273', color2: '#e9e4dc', hair: 'short' };
const DAN = (c, extra = {}) => ({ body: 'man', outfit: 'tunic', color: c, color2: '#f6c344', hair: 'short', ...extra });
const KC = ['#e4572e', '#2e86de', '#3bb273', '#8e5bd3', '#f08a24', '#1f7a8c'];

const T = (k, s, x, y, size, color, p, o = {}) => k.text(s, x, y, { size, font: 'title', color, fx: o.fx ?? 'pop', p, outline: o.outline ?? '#fffaf0', outlineWidth: size * 0.15, maxWidth: o.maxWidth ?? 1700, align: o.align });
const N = (k, s, x, y, size, color, p, o = {}) => T(k, s, x, y, size, color, p, { outline: '#141824', ...o });
function stamp(k, x, y, text, p, o = {}) {
  const s = Math.max(0.01, k.ease.back(Math.min(1, p)) * (1 + 0.6 * (1 - Math.min(1, p))));
  k.group({ x, y, s, r: o.r ?? -0.1, a: Math.min(1, p * 3) }, () => {
    const w = o.w ?? 420;
    k.rect(-w / 2, -60, w, 120, { stroke: o.color ?? '#c0392b', fill: o.bg ?? '#fffaf0', width: 8, fillStyle: 'solid', seed: 77 });
    k.text(text, 0, 4, { size: o.size ?? 60, font: 'title', color: o.color ?? '#c0392b' });
  });
}
function doc(k, x, y, w, h, title, lines, p, o = {}) {
  k.group({ x, y, s: Math.max(0.01, k.ease.back(Math.min(1, p))), r: o.r ?? -0.02, a: Math.min(1, p * 3) }, () => {
    k.rect(-w / 2, -h / 2, w, h, { fill: '#f6e7c1', fillStyle: 'solid', width: 5, seed: o.seed ?? Math.round(x) });
    k.text(title, 0, -h / 2 + 56, { size: o.titleSize ?? 44, font: 'title', color: '#b5482c', maxWidth: w - 60 });
    lines.forEach((l, i) => k.text(l[0], 0, -h / 2 + 140 + i * (o.gap ?? 64), { size: o.size ?? 40, color: l[2] ?? '#3b2f2a', maxWidth: w - 70, p: l[1] ?? 1, fx: 'fade' }));
  });
}
// Dải tiêu đề bí ẩn trượt xuống ở mép trên ~3 giây, hình bên dưới vẫn chạy (không cắt mạch truyện).
function intro(k, n, q) {
  const inP = k.at('n', 0.4), out = k.at(k.cue('n', 3.2), 0.4);
  const y = -110 + 110 * k.ease.out(inP) - 110 * out;
  k.group({ y, a: inP }, () => {
    k.rect(-20, -10, k.W + 40, 110, { fill: '#141824', fillStyle: 'solid', stroke: 'none', seed: 990 });
    k.text(`BÍ ẨN ${n}/5`, 40, 48, { size: 48, font: 'title', align: 'left', color: '#9fe8c8' });
    k.text(q, 300, 48, { size: 46, font: 'title', align: 'left', color: '#fffaf0', maxWidth: 1560 });
  });
}
const pill = (k, n, p = 1) => k.text(`BÍ ẨN ${n}/5`, 30, 40, { size: 36, font: 'title', align: 'left', color: '#9fe8c8', outline: '#141824', outlineWidth: 8, fx: 'fade', p });
// Bản làng ban đêm: trời đêm + nhà sàn.
function ban(k, o = {}) {
  k.backdrop('night', { ground: G });
  if (o.houses !== false) for (const [x, s] of [[200, 300], [1700, 340], [1250, 240]]) k.prop('stilthouse', x, G - s * 0.42, s, { alpha: 0.9 });
}
// Đầu ma lai (bản hoạt hình: ruột hồng, mắt thường) bay lượn quanh (x, y).
function head(k, x, y, size, o = {}) {
  const t = k.gt ?? 0;
  k.prop('malai', x + Math.sin(t * 0.7) * (o.dx ?? 30), y + Math.sin(t * 1.3) * (o.dy ?? 16), size, { guts: o.guts ?? true, cute: o.cute ?? true, talk: o.talk, p: o.p ?? 1, flip: o.flip, alpha: o.alpha });
}
// Phòng tối có cửa sổ (cảnh mở + kết).
function room(k, win) {
  k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#3a2e28', fillStyle: 'solid', stroke: 'none', seed: 5500 });
  k.rect(-40, G, k.W + 80, 300, { fill: '#2a211c', fillStyle: 'solid', stroke: 'none', seed: 5501 });
  k.rect(win[0], win[1], win[2], win[3], { fill: '#18213a', fillStyle: 'solid', width: 8, seed: 5502 });
  k.prop('moon', win[0] + win[2] - 90, win[1] + 90, 110);
  k.rect(80, G - 150, 760, 150, { fill: '#8a5a3a', fillStyle: 'solid', width: 6, seed: 5503 }); // giường
  k.rect(110, G - 190, 700, 70, { fill: '#c9605a', fillStyle: 'solid', width: 5, seed: 5504 }); // chăn
}
function clipWin(k, win, fn) {
  k.ctx.save(); k.ctx.beginPath(); k.ctx.rect(win[0] + 6, win[1] + 6, win[2] - 12, win[3] - 12); k.ctx.clip(); fn(); k.ctx.restore();
}

export default {
  meta: {
    style: 'clean',
    speed: 1.2,
    lead: 0.2,
    tail: 0.3,
    pause: 0.12,
    title: 'Ma lai có thật không? Bí ẩn con ma đầu bay',
    description: `Ma lai có thật không? Một cái đầu người bay đi lúc nửa đêm, kéo theo cả bộ lòng — và cả Đông Nam Á, từ Thái Lan, Campuchia, Lào đến Malaysia, Indonesia, Philippines, đều có một con ma giống hệt.
Vẽ Là Hiểu mở hồ sơ ma lai: năm bí ẩn, từ "ai trông cái thân?", camera an ninh quay được ma, con cú lợn bị oan, đến câu chuyện không hề buồn cười: vì sao có những người thật bị cả làng đồn là ma lai.`,
    footer: `📚 Nguồn: Wikipedia "Krasue" (tổng hợp các bản kể Đông Nam Á); Carol Laderman, Wives and Midwives: Childbirth and Nutrition in Rural Malaysia (1983); Phạm Đình Hổ & Nguyễn Án, Tang thương ngẫu lục; Báo Tiền Phong, "Thảm án Ma lai — những cái chết bi thảm giữa đại ngàn Tây Nguyên" (2013); Báo Pháp luật Việt Nam, "Nỗi khiếp sợ của bản làng Tây Nguyên vừa bị xoá" (2012); Hội đồng Dầu cọ Malaysia (MPOB) về cú lợn bắt chuột; Brian P. Levack, The Witch-Hunt in Early Modern Europe.
⚠️ Video kể chuyện dân gian và giải mã văn hoá, không nhằm cổ xuý mê tín hay gán niềm tin cho bất kỳ dân tộc nào. Khi ốm đau, hãy đến cơ sở y tế.
🔔 Đăng ký Vẽ Là Hiểu để cùng soi truyền thuyết và lịch sử Việt.`,
    links: [['Tập trước: Rùa thần Hồ Gươm có thật không?', '042-rua-than-ho-guom'], ['5 con ma đáng sợ nhất dân gian Việt Nam', '005-halloween-5-con-ma-dan-gian'], ['Ma có thật không? 5 lần "gặp ma" khoa học giải thích được', '010-ma-co-that-khong']],
    tags: ['ma lai', 'ma lai có thật không', 'ma lai là gì', 'chuyện ma việt nam', 'krasue', 'penanggalan', 'manananggal', 'ma đầu bay', 'chim lợn', 'chuyện ma dân gian', 'sinh vật dân gian', 'truyền thuyết kinh dị việt nam', 'vẽ là hiểu'],
    hashtags: ['malai', 'chuyenma', 'truyenthuyetvietnam'],
    voice: 'vi-VN-NamMinhNeural',
    voices: {
      ba: { voice: 'vi-VN-HoaiMyNeural', pitch: '-25Hz', rate: '-12%' },
      malai: { voice: 'vi-VN-HoaiMyNeural', pitch: '+12Hz', rate: '+10%' },
      sci: { voice: 'vi-VN-HoaiMyNeural', pitch: '-4Hz', rate: '+0%' },
      sci2: { voice: 'vi-VN-NamMinhNeural', pitch: '-12Hz', rate: '+4%' },
    },
    transition: 'fade',
    music: 'assets/music/spooky.mp3',
    musicVolume: 0.09,
    images: { next: 'assets/next.jpg' },
    sfxVolume: 0.55,
  },

  scenes: [
    // ---------------- Mở đầu ----------------
    {
      chapter: 'Mở đầu',
      lead: 0.3,
      say: [
        '{dogs}Nửa đêm, chó cả xóm sủa ầm lên. {pull}Bà nội kéo chăn trùm kín đầu mình, thì thầm:',
        { v: 'ba', text: '{ba}Nằm im. Đừng có nhìn ra cửa sổ, ma lai nó đang đi ăn đấy.' },
        '{look}Bà dặn thế thì mình phải nhìn chứ. {head}Ngoài ruộng có một cái đầu người đang bay, {guts}lòng thòng cả một bộ ruột phía sau. {q}Mà câu đầu tiên mình nghĩ ra lại là: {who}ơ, thế cái thân để ở nhà thì ai trông?',
      ],
      sfx: [['bonk', 'dogs', 0.3], ['pop', 'ba'], ['boing', 'look', 0.4], ['whoosh', 'head', 0.4], ['scratch', 'guts', 0.4], ['drumroll', 'q', 0.25], ['boing', 'who', 0.5]],
      draw(k) {
        const win = [1000, 160, 760, 520];
        room(k, win);
        clipWin(k, win, () => {
          k.rect(win[0], 560, win[2], 200, { fill: '#2b3a2a', fillStyle: 'solid', stroke: 'none', seed: 5505 });
          const u = k.at('head', 5, 'linear');
          head(k, k.lerp(900, 1900, u), 420 + Math.sin(u * 9) * 30, 230, { p: k.at('head', 0.3), dy: 6 });
        });
        k.char(330, G - 120, 330, { ...BA, face: 'shock', pose: 'hold', shadow: false, p: k.at('pull', 0.5) });
        const look = k.t > k.cue('look');
        k.char(640, G - 100, 330, { ...ME, face: k.t > k.cue('head') ? 'shock' : look ? 'smug' : 'blank', pose: k.t > k.cue('guts') ? 'point' : 'stand', lean: look ? 0.12 : 0, shadow: false, p: k.at('dogs', 0.5) });
        k.text('GÂU! GÂU!', 1380, 120, { size: 64, font: 'title', color: '#f6c344', fx: 'pop', p: k.at('dogs', 0.4) * (1 - k.at('ba', 0.4)), outline: '#141824', outlineWidth: 10 });
        k.bubble(60, 120, 620, 130, 330, 520, { p: k.at('ba', 0.4) * (1 - k.at('look', 0.3)), text: 'Đừng nhìn ra cửa sổ…', size: 48 });
        k.group({ a: k.at('who', 0.4) }, () => {
          k.bubble(60, 90, 820, 300, 600, 470, { p: 1, think: true });
          k.char(250, 360, 210, { ...CO, noHead: true, shadow: false });
          k.text('Ai trông', 560, 200, { size: 64, font: 'title', color: '#b5482c' });
          k.text('cái thân??', 560, 280, { size: 64, font: 'title', color: '#b5482c' });
        });
      },
    },
    {
      say: [
        { v: 'ba', text: '{ba2}Hỏi linh tinh. Ngủ đi!' },
        '{file}Ngủ sao được. Thế là đêm ấy mình mở hẳn một bộ hồ sơ ma lai: năm câu hỏi, {meter}càng về cuối càng bớt buồn cười. {q1}Câu đầu tiên dễ thôi: con ma này đi làm kiểu gì?',
      ],
      sfx: [['pop', 'ba2'], ['bonk', ['ba2', 0.7], 0.4], ['pop', 'file'], ['slideUp', 'meter', 0.4], ['wahwah', ['meter', 1.5], 0.4], ['ding', 'q1', 0.4]],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#efe6d2', fillStyle: 'solid', stroke: 'none', seed: 5510 });
        doc(k, 700, 470, 760, 560, 'HỒ SƠ: MA LAI', [['Tình trạng: đang bay', k.at(k.cue('file', 1), 0.5)], ['Thân: không rõ ai trông', k.at(k.cue('file', 1.6), 0.5)], ['Số câu hỏi: 5', k.at(k.cue('file', 2.2), 0.5)]], k.at('file', 0.5), { seed: 5511, size: 46, titleSize: 64, gap: 90 });
        stamp(k, 960, 690, 'MẬT', k.at(k.cue('file', 2.6), 0.4), { w: 220 });
        k.char(1650, G + 30, 300, { ...BA, face: 'angry', pose: 'hips', p: k.at('ba2', 0.4) * (1 - k.at('file', 0.4)) });
        k.bubble(1240, 160, 560, 120, 1600, 560, { p: k.at('ba2', 0.3) * (1 - k.at('file', 0.4)), text: 'Hỏi linh tinh. Ngủ đi!', size: 46 });
        head(k, 1500, 420, 300, { p: k.at('file', 0.5) });
        const mp = k.at('meter', 0.4);
        k.rect(1100, 820, 600, 40, { fill: '#e2d6bd', fillStyle: 'solid', width: 4, seed: 5512, alpha: mp });
        k.rect(1100, 820, 600 * k.at('meter', 3, 'inOut'), 40, { fill: '#e4572e', fillStyle: 'solid', width: 4, seed: 5513, alpha: mp });
        T(k, 'buồn cười', 1170, 920, 40, '#3bb273', mp);
        T(k, 'không buồn cười', 1600, 920, 40, '#c0392b', k.at(k.cue('meter', 1.5), 0.4));
        T(k, 'Câu 1: đi làm kiểu gì?', 1400, 200, 50, '#b5482c', k.at('q1', 0.4));
      },
    },

    // ---------------- Bí ẩn 1 ----------------
    {
      chapter: 'Bí ẩn 1: Ma lai "đi làm" thế nào?',
      say: '{n}{day}Theo lời kể, ban ngày ma lai là người bình thường: cũng đi chợ, nấu cơm, gặp hàng xóm vẫn chào hỏi đàng hoàng. {night}Tối đến thì khác. {off}Cái đầu tự rời khỏi cổ, {guts}kéo theo bộ lòng, {fly}bay đi kiếm ăn. {body}Còn cái thân để lại trong nhà, {park}y như xe gửi ngoài bãi, đứng chờ chủ về lấy.',
      sfx: [['whoosh', 'n', 0.4], ['pop', 'day'], ['whoosh', 'night', 0.3], ['pop', 'off', 0.5], ['scratch', 'guts', 0.3], ['whoosh', 'fly', 0.4], ['bonk', 'body', 0.3], ['ding', 'park', 0.5]],
      draw(k) {
        const night = k.at('night', 1);
        k.group({ a: 1 - night }, () => {
          k.backdrop('day', { ground: G });
          k.prop('stilthouse', 1500, G - 140, 340);
          k.char(700, G + 30, 460, { ...CO, face: 'happy', pose: 'wave', p: k.at('day', 0.5) });
          T(k, 'BAN NGÀY: đi chợ · nấu cơm · chào hàng xóm', 960, 190, 56, '#3b2f2a', k.at('day', 0.5));
        });
        k.group({ a: night }, () => {
          ban(k, { houses: false });
          k.prop('stilthouse', 1500, G - 140, 340);
          const off = k.t > k.cue('off');
          k.char(700, G + 30, 460, { ...CO, noHead: off, face: 'sleep', shadow: false });
          const f = k.at('fly', 2.5, 'inOut');
          head(k, k.lerp(700, 1250, f), k.lerp(G - 400, 300, f), 200, { p: off ? 1 : 0, dy: 10 * f });
          N(k, 'BAN ĐÊM', 960, 170, 76, '#9fe8c8', k.at('night', 0.5) * (1 - k.at('park', 0.3)));
          k.group({ a: k.at('park', 0.5) }, () => {
            k.rect(320, 260, 520, 150, { fill: '#2e6da4', fillStyle: 'solid', width: 6, seed: 5520 });
            k.text('BÃI GỬI THÂN', 580, 335, { size: 60, font: 'title', color: '#fffaf0' });
            k.rect(470, 700, 230, 110, { fill: '#f6e7c1', fillStyle: 'solid', width: 4, seed: 5521, r: 0.1 });
            k.text('VÉ SỐ 13', 585, 740, { size: 34, font: 'title', color: '#b5482c' });
            k.text('trước gà gáy', 585, 785, { size: 26, color: '#3b2f2a' });
          });
        });
        pill(k, 1, k.at(k.cue('n', 2.4), 0.5));
        intro(k, 1, 'Ma lai "đi làm" thế nào?');
      },
    },
    {
      say: [
        '{rule}Mà gửi thì phải theo nội quy hẳn hoi. {r1}Phải về trước khi gà gáy. {r2}Về rồi thì lắp đúng vào thân mình, cấm lắp nhầm. {r3}Còn nếu có ai đem cái thân đi giấu, thì…',
        { v: 'malai', text: '{where}Ơ, thân tôi đâu? Ai lấy thân tôi rồi?' },
        '{stuck}Thì chịu, hết đường về. {catch}Nghĩa là muốn bắt ma lai, chẳng cần đánh đấm gì, {hide}cứ giấu cái thân đi là xong. {joke}Con ma đáng sợ nhất làng, cuối cùng lại thua vì mất chỗ đỗ xe.',
      ],
      sfx: [['pop', 'rule'], ['pop', 'r1'], ['pop', 'r2'], ['pop', 'r3'], ['boing', 'where', 0.3], ['wahwah', 'stuck', 0.4], ['pop', 'hide'], ['scratch', 'joke', 0.4]],
      draw(k) {
        ban(k, { houses: false });
        doc(k, 440, 360, 680, 480, 'NỘI QUY MA LAI', [['1. Về trước khi gà gáy', k.at('r1', 0.5)], ['2. Lắp đúng thân, cấm lắp nhầm', k.at('r2', 0.5)], ['3. Mất thân = hết đường về', k.at('r3', 0.5), '#c0392b']], k.at('rule', 0.5), { seed: 5530, gap: 90, size: 42, titleSize: 54 });
        k.prop('rooster', 1720, G - 70, 220, { p: k.at('r1', 0.5) });
        k.text('Ò Ó O!', 1720, 600, { size: 54, font: 'title', color: '#f6c344', fx: 'pop', p: k.at('r1', 0.4) * (1 - k.at('r2', 0.3)), outline: '#141824', outlineWidth: 9 });
        const hid = k.at('r3', 0.6);
        k.char(1180, G + 30, 380, { ...CO, noHead: true, shadow: false, alpha: 1 - hid });
        k.ellipse(1180, G - 30, 420 * hid + 1, 260 * hid + 1, { fill: '#c9a24a', fillStyle: 'solid', width: 6, seed: 5531, alpha: hid });
        for (let i = -3; i <= 3; i++) k.line(1180 + i * 50, G - 140 * hid, 1180 + i * 60, G + 70 * hid, { stroke: '#9c7a3a', width: 3, seed: 5532 + i, alpha: hid });
        N(k, 'cái nia', 1180, G - 200, 40, '#fffaf0', hid * (1 - k.at('joke', 0.3)));
        head(k, 1300, 360, 220, { talk: k.t > k.cue('where') && k.t < k.cue('stuck') });
        k.icon('question', 1440, 230, 90, { p: k.at('where', 0.4), stroke: '#9fe8c8' });
        k.bubble(1380, 70, 480, 120, 1330, 290, { p: k.at('where', 0.3) * (1 - k.at('stuck', 0.3)), text: 'Ai lấy thân tôi rồi?', size: 44 });
        N(k, 'THUA VÌ MẤT CHỖ ĐỖ XE', 960, 1010, 70, '#f6c344', k.at('joke', 0.4));
      },
    },
    {
      say: [
        '{menu}Thế đi ăn thì ăn gì?',
        { v: 'ba', text: '{bam}Đừng hỏi. Kinh lắm.' },
        '{th}Bà không kể thì mình đi tra. Các bản kể ở Thái Lan và Campuchia ghi: {blood}máu, {raw}thịt sống, {dirty}đói quá thì ăn cả đồ bẩn, loại bẩn nhất. {stop}Thôi, mình dừng ở đây, nhỡ bạn đang ăn cơm. {target}Đáng sợ hơn là nhiều bản kể bảo nó hay mò đến nhà vừa có người sinh con, có em bé mới đẻ. {weak}Tức là đến đúng lúc cả nhà đang yếu nhất.',
      ],
      sfx: [['pop', 'menu'], ['bonk', 'bam', 0.4], ['pop', 'blood'], ['pop', 'raw'], ['bonk', 'dirty', 0.4], ['scratch', 'stop', 0.4], ['pop', 'target'], ['drumroll', 'weak', 0.25]],
      draw(k) {
        const scare = k.at('target', 0.8);
        k.group({ a: 1 - scare }, () => {
          k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#efe6d2', fillStyle: 'solid', stroke: 'none', seed: 5540 });
          doc(k, 620, 520, 760, 720, 'THỰC ĐƠN ĐÊM', [['(bản kể Thái Lan · Campuchia)', k.at('th', 0.5), '#6b5f55'], ['• máu', k.at('blood', 0.4)], ['• thịt sống', k.at('raw', 0.4)], ['• đồ bẩn…', k.at('dirty', 0.4)]], k.at('menu', 0.5), { seed: 5541, gap: 100, size: 50, titleSize: 64 });
          k.rect(330, 780, 580, 70, { fill: '#141824', fillStyle: 'solid', stroke: 'none', seed: 5542, alpha: k.at('stop', 0.3) });
          k.text('ĐÃ KIỂM DUYỆT', 620, 818, { size: 40, font: 'title', color: '#fffaf0', fx: 'pop', p: k.at('stop', 0.3) });
          head(k, 1450, 420, 330, { talk: k.t > k.cue('th') && k.t < k.cue('stop') });
          k.bubble(1180, 120, 520, 110, 1400, 300, { p: k.at('bam', 0.3) * (1 - k.at('th', 0.3)), text: 'Đừng hỏi. Kinh lắm.', size: 44 });
          k.text('🍚?', 1460, 820, { size: 80, fx: 'pop', p: k.at('stop', 0.4) });
        });
        k.group({ a: scare }, () => {
          ban(k);
          k.char(560, G + 30, 380, { ...SANPHU, face: 'sleep', pose: 'hold', shadow: false });
          k.prop('baby', 572, G - 160, 110);
          head(k, 1180, 380, 220, { flip: true, guts: true });
          N(k, 'khách không mời', 1180, 180, 70, '#ff8a7a', k.at('target', 0.5));
          N(k, '…đến đúng lúc cả nhà yếu nhất', 960, 1010, 62, '#f6c344', k.at('weak', 0.4));
        });
      },
    },
    {
      say: '{series}À, nói thêm cho bạn nào mới đến: đây là series Sinh vật dân gian của Vẽ Là Hiểu. {prev}Tập trước mình có hẹn kể về ma lai, với cả mấy đốm sáng đỏ bay trên Hồ Gươm năm 1786. {sub}Hôm nay trả nợ cả hai, bạn bấm đăng ký rồi xem tiếp với mình nhé.',
      sfx: [['pop', 'series'], ['sparkle', 'prev', 0.4], ['pop', 'sub', 0.5], ['click', ['sub', 1.2], 0.7]],
      draw(k) {
        k.backdrop('night', { ground: G });
        N(k, 'SERIES SINH VẬT DÂN GIAN', 960, 170, 76, '#9fe8c8', k.at('series', 0.5));
        head(k, 520, 450, 260);
        k.group({ a: k.at('prev', 0.5) }, () => {
          k.rect(820, 300, 560, 380, { fill: '#18213a', fillStyle: 'solid', width: 6, seed: 5550 });
          clipWin(k, [820, 300, 560, 380], () => {
            k.water(560, { color: '#2f5a52', amp: 4 });
            k.prop('thaprua', 1100, 590, 120);
            k.circle(1180 + Math.sin(k.gt) * 60, 450, 22, { fill: '#ff4d3d', fillStyle: 'solid', stroke: 'none', seed: 5552 });
          });
          k.text('HỒ GƯƠM · 1786', 1100, 350, { size: 40, font: 'title', color: '#fffaf0' });
        });
        k.char(1620, G + 30, 340, { ...ME, face: 'happy', pose: 'wave', p: k.at('sub', 0.5) });
        N(k, 'ĐĂNG KÝ 🔔', 1620, 420, 64, '#f6c344', k.at('sub', 0.4));
      },
    },

    // ---------------- Bí ẩn 2 ----------------
    {
      chapter: 'Bí ẩn 2: Liên minh đầu bay Đông Nam Á',
      say: '{n}Câu hỏi thứ hai: sao ma lai lại có họ hàng khắp Đông Nam Á? {asean}Các nước Đông Nam Á có khối ASEAN, {ghost}thì ma đầu bay cũng có hội riêng. {th}Bên Thái gọi là Krasue, {kh}Campuchia gọi là Ahp, {la}Lào là Kasu, {my}Malaysia là Penanggalan, {id}Indonesia là Kuyang, {vn}còn mình gọi là ma lai. {same}Tên mỗi nước một kiểu, nhưng đồng phục thì y hệt: đầu bay, ruột thòng.',
      sfx: [['whoosh', 'n', 0.4], ['pop', 'asean'], ['tada', 'ghost', 0.4], ['pop', 'th'], ['pop', 'kh'], ['pop', 'la'], ['pop', 'my'], ['pop', 'id'], ['ding', 'vn', 0.5], ['boing', 'same', 0.4]],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#2b3150', fillStyle: 'solid', stroke: 'none', seed: 5560 });
        k.rect(-40, 760, k.W + 80, 400, { fill: '#3a2e28', fillStyle: 'solid', stroke: 'none', seed: 5561 });
        k.group({ a: k.at('n', 0.5) }, () => {
          k.rect(260, 140, 1400, 110, { fill: '#b5482c', fillStyle: 'solid', width: 6, seed: 5562 });
          k.text('HỘI NGHỊ THƯỢNG ĐỈNH ĐẦU BAY', 960, 197, { size: 62, font: 'title', color: '#fffaf0' });
          k.rect(160, 700, 1600, 90, { fill: '#8a5a3a', fillStyle: 'solid', width: 6, seed: 5563 });
        });
        N(k, 'ASEAN', 960, 400, 140, '#f6c344', k.at('asean', 0.4) * (1 - k.at('ghost', 0.4)));
        const seats = [['th', 'KRASUE', 'Thái Lan'], ['kh', 'AHP', 'Campuchia'], ['la', 'KASU', 'Lào'], ['my', 'PENANGGALAN', 'Malaysia'], ['id', 'KUYANG', 'Indonesia'], ['vn', 'MA LAI', 'Việt Nam']];
        seats.forEach(([c, name, land], i) => {
          const x = 290 + i * 268, p = k.at(c, 0.5);
          head(k, x, 470, 150, { p: i === 5 ? Math.max(k.at('n', 0.5), p) : p, dx: 6, dy: 10, flip: i % 2 === 1 });
          k.group({ a: p }, () => {
            k.rect(x - 120, 640, 240, 90, { fill: i === 5 ? '#f6c344' : '#fffaf0', fillStyle: 'solid', width: 4, seed: 5564 + i });
            k.text(name, x, 672, { size: name.length > 8 ? 28 : 36, font: 'title', color: '#b5482c', maxWidth: 220 });
            k.text(land, x, 710, { size: 26, color: '#3b2f2a' });
          });
        });
        N(k, 'ĐỒNG PHỤC: đầu bay · ruột thòng', 960, 900, 64, '#f6c344', k.at('same', 0.4));
        pill(k, 2, k.at(k.cue('n', 2.4), 0.5));
        intro(k, 2, 'Vì sao cả Đông Nam Á đều có ma đầu bay?');
      },
    },
    {
      say: '{ph}Trong hội thì Philippines chơi trội nhất. Manananggal không bay mỗi cái đầu, {half}mà tách luôn nửa người trên, {wing}mọc thêm đôi cánh dơi. {combo}Người ta gọi món lẻ, nó gọi nguyên combo. {star}Còn Krasue của Thái thì thành ngôi sao: {film}lên phim từ năm 1973, {love}có cả phim tình cảm tên là Krasue Valentine. {vn}Ma lai nhà mình thì đến giờ chưa có phim nào, {shy}nghe hơi tủi.',
      sfx: [['pop', 'ph'], ['whoosh', 'half', 0.4], ['boing', 'combo', 0.4], ['sparkle', 'star', 0.4], ['pop', 'film'], ['ding', 'love', 0.4], ['pop', 'vn'], ['wahwah', 'shy', 0.4]],
      draw(k) {
        k.backdrop('night', { ground: G });
        // Manananggal: nửa thân trên + cánh dơi
        const pp = k.at('half', 0.6);
        k.group({ x: 0, y: Math.sin(k.gt * 2) * 12, a: k.at('ph', 0.5) }, () => {
          for (const sd of [-1, 1]) k.poly([[440, 470], [440 + sd * 260, 330 + Math.sin(k.gt * 6) * 30], [440 + sd * 220, 470], [440 + sd * 160, 440], [440 + sd * 90, 520]], { fill: '#4a3a6a', fillStyle: 'solid', width: 5, seed: 5570 + sd, alpha: k.at('wing', 0.5) });
          k.ctx.save(); k.ctx.beginPath(); k.ctx.rect(240, 0, 400, 340 + 220 * (1 - pp) + 230); k.ctx.clip();
          k.char(440, 900 - 60 * pp, 520, { ...CO, color: '#5a3a5a', face: 'smug', pose: 'hips', shadow: false });
          k.ctx.restore();
        });
        N(k, 'MANANANGGAL · Philippines', 440, 170, 50, '#9fe8c8', k.at('ph', 0.5));
        N(k, 'bay cả COMBO', 440, 830, 64, '#f6c344', k.at('combo', 0.4));
        // Krasue ngôi sao
        k.group({ a: k.at('star', 0.5) }, () => {
          k.rect(1120, 160, 540, 640, { fill: '#2b1d2e', fillStyle: 'solid', width: 6, seed: 5575 });
          k.text('KRASUE', 1390, 230, { size: 64, font: 'title', color: '#f6c344' });
          k.prop('heart', 1390, 470, 200, { p: k.at('love', 0.5), fill: '#ef6f9a' });
          head(k, 1390, 450, 200, { dx: 10, dy: 8 });
          k.text('VALENTINE', 1390, 680, { size: 56, font: 'title', color: '#ef6f9a', fx: 'pop', p: k.at('love', 0.5) });
          k.text('lên phim từ 1973', 1390, 750, { size: 34, color: '#fffaf0', fx: 'fade', p: k.at('film', 0.5) });
        });
        k.group({ a: k.at('vn', 0.5) }, () => {
          k.prop('malai', 1780, 860, 150, { guts: true, cute: true });
          k.sweat(1810, 800, 1.2, { p: k.at('shy', 0.5) });
          N(k, 'ma lai VN: chưa có phim', 1480, 1010, 50, '#fffaf0', 1);
        });
      },
    },
    {
      say: '{why}Sao lại giống nhau đến thế? {one}Dễ hiểu thôi: cả vùng này {rice}cùng trồng lúa nước, {river}cùng sống ven sông, {dark}cùng những đêm không có đèn, {trade}lại đi lại buôn bán với nhau cả nghìn năm. {story}Người đi đến đâu, chuyện kể theo đến đấy. {joke}Hàng hoá qua biên giới thì phải đóng thuế, {free}còn chuyện ma thì cứ thế mà vào, chẳng ai thu đồng nào.',
      sfx: [['pop', 'why'], ['pop', 'rice'], ['pop', 'river'], ['pop', 'dark'], ['whoosh', 'trade', 0.4], ['pop', 'story'], ['cash', 'joke', 0.5], ['boing', 'free', 0.4]],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#efe6d2', fillStyle: 'solid', stroke: 'none', seed: 5580 });
        const blobs = [[520, 420], [960, 300], [1400, 440], [780, 680], [1200, 720]];
        blobs.forEach(([x, y], i) => k.ellipse(x, y, 300, 180, { fill: '#cfe3c4', fillStyle: 'solid', width: 4, seed: 5581 + i, p: k.at('one', 0.6) }));
        k.icon('rice', 520, 420, 110, { p: k.at('rice', 0.4) });
        k.wave(820, 300, 280, { p: k.at('river', 0.5), stroke: '#2e86de', width: 8, amp: 14 });
        k.prop('moon', 1400, 440, 110, { p: k.at('dark', 0.4) });
        const tp = k.at('trade', 1.2);
        k.arrow(640, 400, 1260, 420, { p: tp, stroke: '#b5482c', width: 6 });
        k.arrow(1080, 720, 900, 690, { p: tp, stroke: '#b5482c', width: 6 });
        k.prop('boat', k.lerp(620, 1240, k.at('trade', 3, 'inOut')), 560, 240, { p: k.at('trade', 0.4) });
        head(k, k.lerp(700, 1300, k.at('story', 3, 'inOut')), 520, 120, { p: k.at('story', 0.4), dy: 8 });
        T(k, 'chuyện kể đi theo người', 960, 120, 62, '#3b2f2a', k.at('story', 0.5));
        k.group({ a: k.at('joke', 0.4) }, () => {
          k.rect(1420, 760, 460, 200, { fill: '#fffaf0', fillStyle: 'solid', width: 4, seed: 5590 });
          k.text('HÀNG HOÁ: có thuế', 1650, 810, { size: 38, font: 'title', color: '#3b2f2a' });
          k.text('CHUYỆN MA: ?', 1650, 890, { size: 38, font: 'title', color: '#3b2f2a' });
        });
        stamp(k, 1650, 990, 'MIỄN THUẾ', k.at('free', 0.5), { w: 330, size: 50 });
      },
    },

    // ---------------- Bí ẩn 3 ----------------
    {
      chapter: 'Bí ẩn 3: Vì sao lại là nhà có trẻ sơ sinh?',
      say: [
        '{n}Câu hỏi thứ ba: sao con ma này cứ nhè nhà có em bé mà đến? {thorn}Ở Thái Lan, theo truyện, người ta trồng tre gai quanh nhà, {snag}để ruột ma bay qua là mắc ngay vào gai.',
        { v: 'malai', text: '{ouch}Ối! Nhà ai trồng cái này thế?!' },
        '{joke}Hệ thống chống ma không cần điện, không cần mật khẩu, chỉ cần ma hậu đậu. {bury}Bên Campuchia thì người ta chôn thật sâu nhau thai, để Ahp không đánh hơi thấy.',
      ],
      sfx: [['whoosh', 'n', 0.4], ['pop', 'thorn'], ['scratch', 'snag', 0.5], ['bonk', ['snag', 0.6], 0.5], ['boing', 'ouch', 0.4], ['ding', 'joke', 0.4], ['pop', 'bury']],
      draw(k) {
        ban(k, { houses: false });
        k.prop('stilthouse', 1420, G - 160, 380);
        k.prop('thornfence', 1020, G - 40, 560, { p: k.at('n', 0.6) });
        const s = k.at('snag', 1.2, 'out');
        const hx = k.lerp(300, 880, s), hy = k.lerp(380, 560, s);
        head(k, hx, hy, 220, { dx: 4 + 30 * (1 - s), dy: 4, talk: k.t > k.cue('ouch') && k.t < k.cue('joke'), p: k.at('n', 0.4) });
        k.burst(940, 650, 120, 'VƯỚNG!', { p: k.at(k.cue('snag', 0.6), 0.4) * (1 - k.at('joke', 0.3)), size: 56 });
        k.bubble(380, 160, 520, 120, hx - 20, hy - 120, { p: k.at('ouch', 0.3) * (1 - k.at('joke', 0.3)), text: 'Nhà ai trồng cái này?!', size: 46 });
        N(k, 'an ninh: không điện · không mật khẩu', 960, 170, 56, '#f6c344', k.at('joke', 0.4) * (1 - k.at('bury', 0.3)));
        N(k, 'Campuchia: chôn sâu nhau thai', 960, 170, 56, '#9fe8c8', k.at('bury', 0.4));
        k.ellipse(320, G + 60, 260, 70, { fill: '#5a4030', fillStyle: 'solid', width: 4, seed: 5600, alpha: k.at('bury', 0.4) });
        pill(k, 3, k.at(k.cue('n', 2.4), 0.5));
        intro(k, 3, 'Vì sao lại nhắm vào nhà có trẻ sơ sinh?');
      },
    },
    {
      say: '{funny}Nghe thì buồn cười, {but}nhưng ngày xưa, sinh con đúng là đi qua cửa tử. {fever}Chưa có kháng sinh, chưa có vắc xin, sốt hậu sản với uốn ván sơ sinh cướp đi không biết bao nhiêu mẹ con. {see}Hồi ấy chẳng ai nhìn thấy vi khuẩn. {night}Người ta chỉ thấy đứa bé đang khoẻ, tự dưng yếu dần trong đêm. {name}Nỗi đau như thế, người ta cần gọi nó bằng một cái tên. {fly}Và cái tên dễ hình dung nhất, là một thứ bay đến lúc nửa đêm.',
      sfx: [['pop', 'funny'], ['pop', 'fever'], ['pop', 'see'], ['ding', 'name', 0.4]],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#1d2233', fillStyle: 'solid', stroke: 'none', seed: 5610 });
        k.prop('candle', 960, 700, 170, { p: k.at('but', 0.5) });
        N(k, 'Ngày xưa: sinh con = lúc nguy hiểm nhất', 960, 190, 60, '#fffaf0', k.at('but', 0.5));
        N(k, 'sốt hậu sản · uốn ván sơ sinh', 960, 300, 56, '#ff8a7a', k.at('fever', 0.5));
        N(k, 'không ai nhìn thấy vi khuẩn', 960, 400, 52, '#d9d3e8', k.at('see', 0.5));
        N(k, 'nỗi đau cần một cái tên', 960, 920, 70, '#f6c344', k.at('name', 0.4));
        k.prop('malai', 1500, 560, 180, { p: k.at('fly', 0.6), alpha: 0.6 });
      },
    },
    {
      say: '{lad}Nhà nhân học Carol Laderman từng về sống ở một làng Mã Lai để tìm hiểu chuyện sinh nở, rồi viết cuốn Wives and Midwives năm 1983. {bd}Ở những làng như thế, bà đỡ vừa lo cho mẹ tròn con vuông, {guard}vừa lo che chắn luôn cả những thứ không nhìn thấy. {joke}Một người làm hai việc: {job1}ban ngày là bác sĩ sản, {job2}ban đêm kiêm luôn bảo vệ.',
      sfx: [['pop', 'lad'], ['pop', 'bd'], ['sparkle', 'guard', 0.4], ['pop', 'job1'], ['boing', 'job2', 0.4]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.prop('stilthouse', 1700, G - 150, 340);
        k.char(360, G + 30, 420, { ...SCI, face: 'calm', pose: 'hold', prop: 'scroll', p: k.at('lad', 0.5) });
        doc(k, 480, 250, 640, 240, 'WIVES AND MIDWIVES', [['Carol Laderman · 1983', k.at('lad', 0.8)]], k.at('lad', 0.5), { seed: 5620 });
        const mw = { body: 'woman', outfit: 'dress', color: '#b5482c', color2: '#f6c344', hair: 'bun', hairColor: '#d9d4cb' };
        k.char(1060, G + 30, 420, { ...mw, face: 'happy', pose: k.t > k.cue('job2') ? 'fight' : 'present', p: k.at('bd', 0.5) });
        k.char(1340, G + 30, 360, { ...SANPHU, face: 'happy', pose: 'hold', p: k.at('bd', 0.5) });
        k.prop('baby', 1352, G - 150, 100, { p: k.at('bd', 0.5) });
        k.group({ a: k.at('job1', 0.4) }, () => {
          k.rect(860, 160, 420, 90, { fill: '#fffaf0', fillStyle: 'solid', width: 4, seed: 5621 });
          k.text('✚ bác sĩ sản khoa', 1070, 205, { size: 40, font: 'title', color: '#2e6da4' });
        });
        k.group({ a: k.at('job2', 0.4) }, () => {
          k.rect(1300, 160, 440, 90, { fill: '#141824', fillStyle: 'solid', width: 4, seed: 5622 });
          k.text('🔦 bảo vệ ca đêm', 1520, 205, { size: 40, font: 'title', color: '#f6c344' });
        });
      },
    },
    {
      say: '{lake}Còn mấy đốm sáng đỏ trên Hồ Gươm thì sao? {book}Sách Tang thương ngẫu lục chép: mùa hè năm 1786, nửa đêm, giữa hồ hiện lên một vật đỏ rực, toả sáng, bay về phía bờ nam rồi mất hút. {today}Chuyện này mà xảy ra bây giờ thì {tt}sáng hôm sau đã có ba trăm cái video quay dọc, {theory}mười cái giả thuyết, {fc}và kiểu gì cũng có một ông khẳng định: flycam đấy. {old}Người xưa thì không có điện thoại, {glow}chỉ có bóng tối với trí tưởng tượng. {sea}Nên ở rất nhiều bản kể Đông Nam Á, ma đầu bay bao giờ cũng đi kèm một đốm sáng lập loè.',
      sfx: [['whoosh', 'lake', 0.4], ['pop', 'book'], ['pop', 'tt'], ['pop', 'theory'], ['boing', 'fc', 0.5], ['pop', 'old'], ['sparkle', 'sea', 0.4]],
      draw(k) {
        k.backdrop('night', { ground: 600 });
        k.water(620, { color: '#2f5a52', amp: 6 });
        k.prop('thaprua', 1100, 640, 180);
        const u = k.at('book', 4, 'inOut');
        k.circle(1100 + 500 * u, 470 - 80 * Math.sin(u * Math.PI), 34, { fill: '#ff4d3d', fillStyle: 'solid', stroke: 'none', seed: 5630, alpha: k.at('lake', 0.5) });
        const now = k.at('today', 0.4);
        doc(k, 480, 290, 640, 320, 'TANG THƯƠNG NGẪU LỤC', [['1786 · nửa đêm', k.at('book', 0.6)], ['vật đỏ ối giữa hồ, toả sáng', k.at('book', 0.9)], ['bay về bờ nam rồi mất', k.at('book', 1.2)]], k.at('book', 0.5) * (1 - now), { seed: 5631 });
        [['tt', 260], ['theory', 520], ['fc', 780]].forEach(([c, x], i) => {
          k.prop('phone', x, 880, 220, { p: k.at(c, 0.4), rotate: (i - 1) * 0.15 });
        });
        N(k, '300 video quay dọc', 520, 180, 54, '#fffaf0', k.at('tt', 0.4) * (1 - k.at('old', 0.3)));
        N(k, '10 giả thuyết', 520, 270, 54, '#fffaf0', k.at('theory', 0.4) * (1 - k.at('old', 0.3)));
        k.char(1600, 1040, 300, { ...DAN('#2e86de'), face: 'smug', pose: 'point', p: k.at('fc', 0.4) * (1 - k.at('old', 0.3)), shadow: false });
        k.bubble(1380, 640, 360, 110, 1580, 770, { p: k.at('fc', 0.3) * (1 - k.at('old', 0.3)), text: 'Flycam đấy!', size: 46 });
        N(k, 'đêm tối + trí tưởng tượng', 520, 220, 56, '#9fe8c8', k.at('glow', 0.4));
        head(k, 1500, 300, 160, { p: k.at('sea', 0.5), guts: false, cute: false });
      },
    },

    // ---------------- Bí ẩn 4 ----------------
    {
      chapter: 'Bí ẩn 4: Người ta đã "nhìn thấy" gì?',
      say: '{n}Câu hỏi thứ tư: vậy người ta đã thực sự nhìn thấy gì? {cctv}Năm 2008, bên Thái Lan có một đoạn camera an ninh được đồn là quay được Krasue. {buzz}Cả nước xôn xao, ai cũng chia sẻ. {sci}Một nhà nghiên cứu ở Đại học Chulalongkorn ngồi xem kỹ, rồi kết luận: {wet}nhiều khả năng chỉ là ánh sáng phản chiếu trên nền đất ướt. {joke}Tức là con ma nổi tiếng nhất từng lên camera, hoá ra là một vũng nước.',
      sfx: [['whoosh', 'n', 0.4], ['click', 'cctv', 0.6], ['pop', 'buzz'], ['pop', ['buzz', 0.3]], ['pop', 'sci'], ['ding', 'wet', 0.4], ['wahwah', 'joke', 0.5]],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#2b3150', fillStyle: 'solid', stroke: 'none', seed: 5640 });
        k.prop('cctv', 300, 300, 260, { p: k.at('n', 0.4) });
        k.rect(560, 180, 820, 520, { fill: '#0d1118', fillStyle: 'solid', width: 8, seed: 5641, p: k.at('n', 0.5) });
        k.ctx.save(); k.ctx.beginPath(); k.ctx.rect(570, 190, 800, 500); k.ctx.clip();
        for (let i = 0; i < 60; i++) k.dot(570 + k.rand(i + Math.floor(k.gt * 8) * 7) * 800, 190 + k.rand(i + 300 + Math.floor(k.gt * 8)) * 500, 2, '#9aa', 0.3);
        const wet = k.at('wet', 0.8);
        k.ellipse(970, 600, 420, 70, { fill: '#2a3a4a', fillStyle: 'solid', stroke: 'none', seed: 5642, alpha: wet });
        const g = k.ctx.createRadialGradient(970, 420 + 160 * wet, 4, 970, 420 + 160 * wet, 90);
        g.addColorStop(0, 'rgba(220,255,220,0.9)'); g.addColorStop(1, 'rgba(220,255,220,0)');
        k.ctx.globalAlpha = k.at('cctv', 0.6); k.ctx.fillStyle = g; k.ctx.fillRect(570, 190, 800, 500);
        k.ctx.restore();
        k.text('REC ● THÁI LAN · 2008', 600, 225, { size: 30, font: 'title', align: 'left', color: '#ff4d4d', fx: 'fade', p: k.at('cctv', 0.5) });
        for (let i = 0; i < 3; i++) k.bubble(1420 + (i % 2) * 120, 200 + i * 150, 200, 100, 1390, 400, { p: k.at(k.cue('buzz', i * 0.25), 0.3) * (1 - k.at('sci', 0.3)), text: ['Ma!!', 'Thật á?!', 'Share!'][i], size: 40 });
        k.char(1620, G + 140, 380, { ...SCI2, face: k.t > k.cue('joke') ? 'smug' : 'think', pose: 'think', p: k.at('sci', 0.5), shadow: false });
        stamp(k, 970, 860, 'VŨNG NƯỚC', k.at('joke', 0.5), { w: 460, size: 66 });
        pill(k, 4, k.at(k.cue('n', 2.4), 0.5));
        intro(k, 4, 'Người ta đã "nhìn thấy" gì?');
      },
    },
    {
      say: [
        '{gas}Thế còn mấy đốm sáng ngoài đồng? {m}Có người bảo là khí đầm lầy tự bốc cháy, giống ma trơi.',
        { v: 'sci2', text: '{no}Khí đó làm gì đủ nhiều mà tự cháy được.' },
        '{doubt}Đấy là ý kiến của một nhà nghiên cứu năng lượng người Thái. {honest}Đến giờ các nhà khoa học vẫn còn cãi nhau. {joke}Nhưng cãi bằng số liệu, chứ chưa ai rút bùa ra cãi cả.',
      ],
      sfx: [['pop', 'gas'], ['sparkle', 'm', 0.4], ['bonk', 'no', 0.4], ['pop', 'honest'], ['boing', 'joke', 0.4]],
      draw(k) {
        k.backdrop('night', { ground: 760 });
        for (let i = 0; i < 6; i++) k.dot(240 + i * 120 + Math.sin(k.gt * 2 + i) * 20, 640 + Math.sin(k.gt * 3 + i * 2) * 30, 14, '#bfffcf', 0.4 + 0.4 * Math.sin(k.gt * 4 + i));
        k.char(500, 1040, 360, { ...SCI, face: 'happy', pose: 'present', p: k.at('m', 0.5), shadow: false });
        k.bubble(240, 300, 560, 120, 480, 680, { p: k.at('m', 0.4), text: 'Khí đầm lầy!', size: 48 });
        k.char(1420, 1040, 360, { ...SCI2, face: k.t > k.cue('no') ? 'angry' : 'calm', pose: k.t > k.cue('no') ? 'point' : 'stand', flip: true, p: k.at('no', 0.5), shadow: false });
        k.bubble(1100, 300, 640, 120, 1420, 680, { p: k.at('no', 0.4), text: 'Không đủ để cháy!', size: 48 });
        N(k, 'KHOA HỌC: vẫn đang cãi', 960, 170, 62, '#f6c344', k.at('honest', 0.4));
        k.group({ a: k.at('joke', 0.4) }, () => {
          k.rect(760, 450, 400, 220, { fill: '#fffaf0', fillStyle: 'solid', width: 4, seed: 5650 });
          for (let i = 0; i < 4; i++) k.rect(810 + i * 85, 640 - (i + 1) * 38, 55, (i + 1) * 38, { fill: KC[i], fillStyle: 'solid', width: 3, seed: 5651 + i });
          k.text('số liệu ✓', 960, 480, { size: 34, font: 'title', color: '#3bb273' });
        });
      },
    },
    {
      say: '{owl}Có điều, có một nghi phạm biết bay thật: chim lợn, tức là cú lợn. {face}Mặt trắng bệch, hình trái tim, {silent}bay không phát ra một tiếng động, {scream}còn tiếng kêu thì rít lên như ai xé vải. {tn}Báo Tiền Phong kể, ở một số buôn làng Tây Nguyên, người ta tin ma lai cưỡi chim lợn đi đêm, nghe chim lợn kêu là lo trong làng sắp có người chết. {me}Nói thật, nửa đêm mà cái mặt ấy lướt qua cửa sổ thì mình cũng chạy.',
      sfx: [['pop', 'owl'], ['pop', 'face'], ['whoosh', 'silent', 0.25], ['scratch', 'scream', 0.6], ['pop', 'tn'], ['whoosh', 'me', 0.4], ['boing', ['me', 1.6], 0.4]],
      draw(k) {
        ban(k);
        const u = k.at('owl', 6, 'linear');
        k.prop('owl', k.lerp(-100, 1100, u), 380 + Math.sin(u * 8) * 40, 300, { fly: true, p: k.at('owl', 0.3) });
        N(k, 'CHIM LỢN = cú lợn', 960, 160, 66, '#9fe8c8', k.at('owl', 0.4) * (1 - k.at('tn', 0.3)));
        [['face', 'mặt trắng hình trái tim'], ['silent', 'bay không tiếng động'], ['scream', 'kêu như xé vải']].forEach(([c, t], i) => N(k, t, 1500, 330 + i * 90, 46, '#fffaf0', k.at(c, 0.4) * (1 - k.at('tn', 0.3))));
        k.group({ a: k.at('tn', 0.4) * (1 - k.at('me', 0.3)) }, () => {
          doc(k, 1420, 420, 760, 300, 'BÁO TIỀN PHONG · 2013', [['ma lai cưỡi chim lợn đi đêm', 1], ['chim lợn kêu = sợ có người chết', 1]], 1, { seed: 5660, size: 38 });
        });
        const run = k.at('me', 2, 'in');
        k.char(k.lerp(1300, 2200, run), G + 30, 340, { ...ME, face: 'shock', walk: k.t > k.cue('me'), walkSpeed: 20, p: k.at('me', 0.3) });
        k.motion(k.lerp(1300, 2200, run) - 120, G - 160, -160, 0, { p: k.at('me', 0.4) });
      },
    },
    {
      say: '{day}Thế ban ngày cú lợn làm gì? {rat}Bắt chuột, giỏi số một. {my}Ở Malaysia, chính quê của Penanggalan, các đồn điền cọ dầu còn đóng hộp tổ mời cú lợn về ở. {joke}Con chim bị đồn là điềm gở, {team}hoá ra là đội diệt chuột làm không công.',
      sfx: [['pop', 'day'], ['pop', 'rat'], ['pop', 'my'], ['tada', 'team', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: G });
        for (const [x, s] of [[180, 300], [520, 260], [1560, 320], [1800, 260]]) k.prop('tree', x, G - s * 0.45, s);
        k.line(1000, G, 1000, 420, { stroke: '#8a5a3a', width: 14, seed: 5670 });
        k.rect(900, 300, 200, 160, { fill: '#c9a06a', fillStyle: 'solid', width: 5, seed: 5671, p: k.at('my', 0.5) });
        k.circle(1000, 380, 40, { fill: '#2b1d16', fillStyle: 'solid', width: 4, seed: 5672, p: k.at('my', 0.5) });
        k.prop('owl', 1000, 360, 140, { p: k.at('my', 0.5) });
        T(k, 'HỘP TỔ · đồn điền Malaysia', 1000, 200, 52, '#3b2f2a', k.at('my', 0.5));
        const rp = k.at('rat', 0.5);
        for (let i = 0; i < 4; i++) {
          const x = 300 + i * 360 + Math.sin(k.gt * 3 + i) * 40, y = G + 40;
          k.ellipse(x, y, 70, 36, { fill: '#8a8a8a', fillStyle: 'solid', width: 3, seed: 5680 + i, alpha: rp * (1 - k.at('team', 0.5)) });
          k.curve([[x - 34, y], [x - 70, y - 20], [x - 90, y + 6]], { stroke: '#8a8a8a', width: 3, seed: 5690 + i, alpha: rp * (1 - k.at('team', 0.5)) });
        }
        stamp(k, 960, 620, 'ĐỘI DIỆT CHUỘT KHÔNG LƯƠNG', k.at('team', 0.5), { w: 900, size: 58, color: '#3f6f2a' });
      },
    },

    // ---------------- Bí ẩn 5 (nghiêm túc, không đùa) ----------------
    {
      chapter: 'Bí ẩn 5: Vì sao có người bị đồn là ma lai?',
      say: '{n}Câu hỏi cuối cùng, và đến đây thì hết đùa: vì sao có những người thật bị cả làng gọi là ma lai? {who}Báo chí từng ghi lại những ai hay bị nghi: {a}người đang có xích mích với hàng xóm, {b}người khá giả hơn, {c}người xinh đẹp hơn, {d}hay đơn giản là người không được lòng ai. {proof}Chẳng cần bằng chứng. {timing}Chỉ cần trong làng có người ốm, đúng hôm người đó đi ngang qua.',
      sfx: [['whoosh', 'n', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['bonk', 'proof', 0.3]],
      draw(k) {
        k.backdrop('dawn', { ground: G });
        const sus = [['a', 'có mâu thuẫn', DAN('#5a6b8a')], ['b', 'giàu hơn', DAN('#c9a24a', { hat: 'band' })], ['c', 'xinh đẹp hơn', CO], ['d', 'không được ưa', DAN('#9a9a8a')]];
        sus.forEach(([c, t, pr], i) => {
          const x = 300 + i * 440;
          k.char(x, G + 30, 340, { ...pr, face: k.t > k.cue(c) ? 'sad' : 'calm', p: k.at('n', 0.5) });
          T(k, t, x, G - 400, 46, '#3b2f2a', k.at(c, 0.4));
        });
        stamp(k, 960, 200, 'KHÔNG CẦN BẰNG CHỨNG', k.at('proof', 0.5), { w: 760, size: 58 });
        pill(k, 5, k.at(k.cue('n', 2.4), 0.5));
        intro(k, 5, 'Vì sao có người bị đồn là ma lai?');
      },
    },
    {
      say: '{y2007}Năm 2007, ở một làng tại Gia Lai, một cụ bà qua đời, dân làng nghi có người bỏ thuốc thư, tức là bùa hại người. {kill}Ba người bị đánh chết, trong đó có một cụ ông bảy mươi sáu tuổi. {kt}Ở Kon Tum, một người đàn ông bị đồn là ma lai, chỉ vì trong làng có người chết do ngộ độc rượu. {burn}Ông bị đốt nhà, bị đuổi khỏi làng, rồi bị sát hại. {doc}Khi bác sĩ xem xét, những cái chết bị đổ cho ma lai đều có nguyên nhân rõ ràng: ngộ độc rượu, xuất huyết não. {real}Con ma có thể không có thật. {oan}Nhưng nỗi oan thì có thật.',
      sfx: [['pop', 'y2007'], ['pop', 'kt'], ['pop', 'doc'], ['ding', 'real', 0.3]],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#1d2233', fillStyle: 'solid', stroke: 'none', seed: 5700 });
        doc(k, 560, 440, 820, 600, 'BÁO TIỀN PHONG · 2013', [['Gia Lai, 2007: nghi "thuốc thư"', k.at('y2007', 0.5)], ['3 người bị đánh chết', k.at('kill', 0.5), '#c0392b'], ['Kon Tum: bị đồn là ma lai', k.at('kt', 0.5)], ['đốt nhà · đuổi khỏi làng · sát hại', k.at('burn', 0.5), '#c0392b'], ['Bác sĩ: ngộ độc rượu, xuất huyết não', k.at('doc', 0.5), '#2e6da4']], k.at('y2007', 0.5), { seed: 5701, size: 38, gap: 84 });
        k.prop('candle', 1440, 640, 200);
        stamp(k, 1440, 300, 'NỖI OAN: CÓ THẬT', k.at('oan', 0.5), { w: 620, size: 58 });
      },
    },
    {
      say: '{other}Cũng có vụ kết thúc nhẹ nhàng hơn. {y2012}Năm 2012, cũng ở Gia Lai, có anh thanh niên đi khắp làng tự nhận mình có thuốc thư. {fear}Thế là cả làng sợ. {pay}Có người phải đưa tiền, {drink}anh đi nhậu ké nhà nào cũng chẳng ai dám đuổi. {police}Đến lúc công an vào cuộc, anh khai thật: toàn là doạ thôi. {sorry}Anh xin lỗi cả làng và được tha. {party}Báo còn kể, từ hôm đó, mấy cuộc nhậu trong làng vui hẳn ra. {lesson}Hoá ra nỗi sợ ma là thứ rất dễ bị người thật đem ra lợi dụng.',
      sfx: [['pop', 'other'], ['pop', 'y2012'], ['bonk', 'fear', 0.3], ['cash', 'pay', 0.5], ['pop', 'drink'], ['click', 'police', 0.5], ['wahwah', 'sorry', 0.4], ['tada', 'party', 0.5], ['ding', 'lesson', 0.4]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.prop('stilthouse', 1720, G - 150, 340);
        const sorry = k.t > k.cue('sorry');
        k.char(560, G + 30, 420, { ...DAN('#8e5bd3'), face: sorry ? 'sad' : 'smug', pose: sorry ? 'facepalm' : 'hips', p: k.at('y2012', 0.5) });
        k.prop('gourd', 690, G - 150, 110, { p: k.at('drink', 0.4) });
        T(k, '"Tôi có thuốc thư!"', 560, 230, 56, '#8e5bd3', k.at('y2012', 0.5) * (1 - k.at('police', 0.3)));
        const party = k.at('party', 0.5);
        for (let i = 0; i < 3; i++) {
          k.char(1000 + i * 220, G + 30, 340, { ...DAN(KC[i]), face: party > 0.5 ? 'laugh' : 'shock', pose: party > 0.5 ? 'cheer' : i === 0 && k.t > k.cue('pay') ? 'present' : 'stand', p: k.at('fear', 0.5) });
        }
        k.icon('coin', 860, G - 260, 80, { p: k.at('pay', 0.4) * (1 - k.at('police', 0.3)) });
        stamp(k, 560, 230, 'CHỈ LÀ DOẠ', k.at('police', 0.5), { w: 440, size: 58 });
        T(k, 'nhậu vui hẳn 🍶', 1220, 330, 60, '#3bb273', party);
        T(k, 'nỗi sợ ma = dễ bị lợi dụng', 960, 1010, 60, '#b5482c', k.at('lesson', 0.4));
      },
    },
    {
      say: '{not}Mà chuyện này cũng chẳng riêng gì vùng nào. {eu}Ở châu Âu, từ khoảng thế kỷ mười lăm đến mười tám, các nhà sử học ước tính bốn đến sáu vạn người bị xử tử vì bị cho là phù thuỷ, {women}phần lớn là phụ nữ. {formula}Công thức lúc nào cũng thế: {a}một tai hoạ không ai giải thích được, {b}cộng thêm một người "khác" trong làng, {c}là ra một cuộc săn ma. {now}Còn bây giờ thì sao? {chat}Chỉ cần một tin nhắn trong nhóm chat của xóm. {fast}Lời đồn bây giờ bay còn nhanh hơn cả đầu ma lai.',
      sfx: [['pop', 'not'], ['whoosh', 'eu', 0.4], ['pop', 'formula'], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'now'], ['ding', 'chat', 0.5], ['whoosh', 'fast', 0.5]],
      draw(k) {
        const now = k.at('now', 0.6);
        k.group({ a: 1 - now }, () => {
          k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#efe6d2', fillStyle: 'solid', stroke: 'none', seed: 5710 });
          T(k, 'CHÂU ÂU · TK 15–18', 500, 180, 66, '#b5482c', k.at('eu', 0.4));
          T(k, '~40.000–60.000 người bị xử tử', 500, 280, 46, '#3b2f2a', k.at('eu', 0.6));
          T(k, 'phần lớn là phụ nữ', 500, 360, 46, '#c0392b', k.at('women', 0.4));
          k.char(500, 960, 380, { body: 'woman', outfit: 'dress', color: '#4a4a5a', color2: '#9a9a9a', hair: 'long', hairColor: '#8a6a4a', face: 'sad', p: k.at('women', 0.5) });
          T(k, 'CÔNG THỨC', 1380, 200, 72, '#3b2f2a', k.at('formula', 0.4));
          [['a', 'tai hoạ không giải thích được', '#3b2f2a'], ['b', '+ một người "khác"', '#b5482c'], ['c', '= một cuộc săn ma', '#c0392b']].forEach(([c, t, col], i) => T(k, t, 1380, 360 + i * 140, 56, col, k.at(c, 0.4), { maxWidth: 900 }));
        });
        k.group({ a: now }, () => {
          k.backdrop('night', { ground: G });
          k.rect(640, 120, 640, 720, { fill: '#fffaf0', fillStyle: 'solid', width: 10, seed: 5720 });
          k.rect(640, 120, 640, 90, { fill: '#2e86de', fillStyle: 'solid', width: 6, seed: 5721 });
          k.text('Nhóm xóm 🏡 (238)', 960, 168, { size: 38, font: 'title', color: '#fffaf0' });
          [['Nghe nói nhà bên kia…', 'chat'], ['Thật á?!', ['chat', 0.5]], ['Share ngay!!', ['chat', 1]]].forEach(([t, c], i) => {
            const p = k.at(Array.isArray(c) ? k.cue(c[0], c[1]) : c, 0.3);
            k.rect(i === 1 ? 900 : 680, 260 + i * 130, 360, 90, { fill: i === 1 ? '#cfe3f7' : '#efe6d2', fillStyle: 'solid', width: 3, seed: 5722 + i, alpha: p });
            k.text(t, i === 1 ? 1080 : 860, 305 + i * 130, { size: 32, color: '#3b2f2a', fx: 'fade', p });
          });
          const f = k.at('fast', 2.5, 'in');
          head(k, k.lerp(-100, 1500, k.at('fast', 3.5, 'linear')), 960, 150, { dy: 4 });
          k.rect(k.lerp(-300, 2100, f) - 110, 920, 220, 80, { fill: '#2e86de', fillStyle: 'solid', width: 4, seed: 5730 });
          k.text('TIN ĐỒN', k.lerp(-300, 2100, f), 960, { size: 36, font: 'title', color: '#fffaf0' });
          k.motion(k.lerp(-300, 2100, f) - 130, 960, -200, 0, { p: k.at('fast', 0.3) });
        });
      },
    },
    {
      say: '{q}Thế rốt cuộc ma lai có thật không? {no}Đến giờ chưa có bằng chứng nào cho thấy đầu người tự bay được. {anat}Mà xét về giải phẫu thì rút đầu ra, ruột cũng chẳng theo lên được, vì cổ đâu có cửa sau. {best}Còn thứ đuổi ma lai hiệu quả nhất thì không phải hàng rào gai, {clinic}mà là trạm y tế, {mw}cô hộ sinh, {bulb}với cái bóng đèn điện. {joke}Ma lai sợ gà gáy thật, nhưng chắc còn sợ ống tiêm hơn.',
      sfx: [['drumroll', 'q', 0.3], ['bonk', 'no', 0.3], ['boing', 'anat', 0.6], ['pop', 'best'], ['ding', 'clinic', 0.4], ['pop', 'mw'], ['sparkle', 'bulb', 0.4], ['scratch', 'joke', 0.3]],
      draw(k) {
        const day = k.at('best', 0.8);
        k.group({ a: 1 - day }, () => {
          ban(k);
          head(k, 960, 400, 260, { alpha: 1 - k.at('no', 0.8) * 0.6 });
          stamp(k, 960, 400, 'CHƯA CÓ BẰNG CHỨNG', k.at('no', 0.5), { w: 680, size: 56 });
          N(k, 'cổ đâu có cửa sau 🚪', 960, 760, 64, '#f6c344', k.at('anat', 0.5));
        });
        k.group({ a: day }, () => {
          k.backdrop('day', { ground: G });
          k.rect(1000, G - 360, 640, 360, { fill: '#f5f5f0', fillStyle: 'solid', width: 6, seed: 5740 });
          k.rect(1260, G - 200, 120, 200, { fill: '#7fb5d5', fillStyle: 'solid', width: 5, seed: 5741 });
          T(k, '✚ TRẠM Y TẾ', 1320, G - 420, 60, '#c0392b', k.at('clinic', 0.4));
          k.char(760, G + 30, 400, { body: 'woman', outfit: 'dress', color: '#ffffff', color2: '#2e86de', hair: 'bun', face: 'happy', pose: 'present', p: k.at('mw', 0.5) });
          k.char(480, G + 30, 380, { ...SANPHU, face: 'happy', pose: 'hold', p: k.at('mw', 0.5) });
          k.prop('baby', 492, G - 150, 104, { p: k.at('mw', 0.5) });
          k.prop('lamp', 1760, G - 220, 160, { p: k.at('bulb', 0.5) });
          T(k, 'thứ đuổi ma lai giỏi nhất', 760, 190, 64, '#3b2f2a', k.at('best', 0.5));
          T(k, 'sợ gà gáy… sợ ống tiêm hơn 💉', 960, 1010, 58, '#b5482c', k.at('joke', 0.4));
        });
      },
    },

    // ---------------- Kết ----------------
    {
      chapter: 'Kết',
      say: '{back}Nửa đêm. Chó lại sủa. {light}Ngoài ruộng vẫn có đốm sáng bay, chắc là đom đóm. {owl}Hoặc bác cú lợn đang đi làm ca đêm. {ba}Bà lại kéo chăn cho mình. {q}Còn câu hỏi ai trông cái thân, giờ thì mình có câu trả lời rồi. {ans}Người bị đồn là ma lai, ban ngày cũng chỉ là một người bình thường: có nhà, có con, có tên. {worst}Thứ đáng sợ nhất trong chuyện ma lai không phải cái đầu biết bay. {point}Mà là lúc cả làng cùng chỉ tay vào một người.',
      sfx: [['whoosh', 'back', 0.4], ['sparkle', 'light', 0.4], ['pop', 'owl'], ['pop', 'ba'], ['ding', 'ans', 0.4]],
      draw(k) {
        const win = [1000, 160, 760, 520];
        room(k, win);
        clipWin(k, win, () => {
          k.rect(win[0], 560, win[2], 200, { fill: '#2b3a2a', fillStyle: 'solid', stroke: 'none', seed: 5750 });
          for (let i = 0; i < 12; i++) k.dot(1050 + k.rand(i) * 660, 300 + k.rand(i + 30) * 300, 6, '#d6ff9a', 0.5 + 0.5 * Math.sin((k.gt ?? 0) * 3 + i));
          const u = k.at('owl', 5, 'linear');
          k.prop('owl', k.lerp(900, 1900, u), 330, 150, { fly: true, p: k.at('owl', 0.3) });
        });
        const ansP = k.at('ans', 0.6);
        k.char(330, G - 120, 330, { ...BA, face: 'happy', pose: 'hold', shadow: false, p: k.at('ba', 0.5) });
        k.char(640, G - 100, 330, { ...ME, face: k.t > k.cue('point') ? 'sad' : 'calm', shadow: false });
        k.group({ a: ansP * (1 - k.at('worst', 0.4)) }, () => {
          k.rect(1040, 720, 680, 300, { fill: '#f6e7c1', fillStyle: 'solid', width: 5, seed: 5751 });
          k.char(1200, 990, 230, { ...CO, face: 'happy', pose: 'hold', shadow: false });
          k.prop('baby', 1210, 900, 70);
          k.text('có nhà · có con · có tên', 1500, 870, { size: 38, font: 'title', color: '#b5482c', maxWidth: 380 });
        });
        N(k, 'không phải cái đầu bay…', 960, 950, 60, '#d9d3e8', k.at('worst', 0.5));
        N(k, '…mà là lúc cả làng chỉ tay vào một người', 960, 1035, 62, '#f6c344', k.at('point', 0.4), { maxWidth: 1800 });
      },
    },
    {
      say: '{a}Tóm lại: ma lai là đầu bay của cả Đông Nam Á, {b}sinh ra từ đêm tối và những cái chết không ai giải thích được, {c}còn nỗi oan của người bị đồn thì có thật.',
      sfx: [['pop', 'a'], ['pop', 'b'], ['pop', 'c']],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#1d2233', fillStyle: 'solid', stroke: 'none', seed: 5760 });
        const rows = [['a', 'Ma lai: đầu bay của cả Đông Nam Á'], ['b', 'Sinh ra từ đêm tối + bệnh tật không lời giải'], ['c', 'Nỗi oan của người bị đồn: có thật']];
        rows.forEach(([c, t], i) => {
          k.icon('check', 300, 330 + i * 170, 90, { p: k.at(c, 0.4), stroke: '#9fe8c8' });
          k.text(t, 390, 340 + i * 170, { size: 58, font: 'title', align: 'left', color: '#fffaf0', fx: 'fade', p: k.at(c, 0.5) });
        });
        head(k, 1650, 220, 160);
      },
    },
    nextEpisodeScene({
      say: '{next}Tập sau: năm con ma đáng sợ nhất dân gian Việt Nam. {why}Ma xó, ma trành, ma da, quỷ nhập tràng, và một gương mặt quen: ma lai. {more}Con nào cũng có một sự thật rất đời đứng phía sau. Hẹn bạn ở tập sau nhé.',
      title: '5 con ma đáng sợ nhất dân gian Việt Nam',
      hook: 'Ma xó, ma trành, ma da… và sự thật phía sau',
      when: 'Series Sinh vật dân gian',
      art: (k) => { k.image('next', -300, -190, 600, 338, { fx: 'fade' }); },
      sfx: [['slideUp', 'why', 0.4]],
    }),
    subscribeScene({
      say: 'Còn bạn, {q}ở quê bạn ma lai được kể thế nào, người ta có mẹo gì để "chống" nó không? Kể mình nghe dưới phần bình luận nhé. {sub}Nhớ bấm đăng ký với bật chuông, để không lỡ tập sau!',
      question: 'Ở quê bạn, ma lai được kể thế nào?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
