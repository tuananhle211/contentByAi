// Tập 7 · series Truyền thuyết Việt Nam — Rùa thần Hồ Gươm có thật không? (nối tập 033 Mỵ Châu: rùa vàng Kim Quy quay lại).
// Dựng theo bài học 02/11 (skill kenh-ve-la-hieu): hook khoảnh khắc ngôi thứ nhất → vào thẳng Bí ẩn 1, KHÔNG giới thiệu series/agenda
//   trong 60 giây đầu (người xem rời ở đúng đoạn đó); chuỗi "Bí ẩn 1…5"; tóm tắt cực ngắn.
// Đối chiếu nguồn (Lê Thời Tân, Nguyễn Văn Phương, Dương Văn Duyên, "Truyền thuyết 'Hồ Hoàn Kiếm' – một cách đọc liên văn bản",
//   Tạp chí Khoa học ĐHSP TP.HCM 16(2), 2019, tr. 83–91):
//   - Lam Sơn thực lục (1431, Nguyễn Trãi được xem là người chấp bút): Lê Thận người trại Mục Sơn, bạn của vua, làm nghề quăng chài; ở vực
//     Ma Viện đêm thấy đáy nước sáng như bó đuốc; quăng chài suốt đêm không được cá, chỉ được mảnh sắt dài hơn một thước, để chỗ tối. Ngày giỗ,
//     vua tới, thấy ánh sáng, hỏi "Sắt nào đây?", xin về, mài sáng thấy chữ "Thuận Thiên" cùng chữ "Lợi". Một hôm ra ngoài cửa thấy chuôi gươm
//     đã mài thành hình, khấn "Nếu quả là gươm Trời cho thì xin chuôi và lưỡi liền nhau", lắp vào thành gươm. KHÔNG có chuyện trả gươm.
//   - Sơn cư tạp thuật, thiên Vật quái (Đan Sơn, ~1786–1789): rùa to như cái lọng nổi lên, khấn yểm không đi; vua lấy kiếm chỉ, rùa nghển cổ;
//     vua giận ném kiếm xuống hồ, rùa lẩn; sai tát cạn hồ, không thấy gì, kiếm cũng mất.
//   - Tang thương ngẫu lục (Phạm Đình Hổ, Nguyễn Án): kiếm rơi xuống nước, rùa lặn theo; vua sai đắp bờ ngang, tát nước tìm, không thấy;
//     đời sau nhân cái bờ chia hai hồ Tả Vọng, Hữu Vọng. Cũng chép: mùa hạ năm Bính Ngọ, Cảnh Hưng (1786), nửa đêm có vật đỏ ối hiện trên
//     đảo giữa hồ, toả sáng, bay về bờ nam rồi mất, sau đó sóng gió nổi.
//   - Đại Nam nhất thống chí (1865–1882): tương truyền Lê Thái Tổ du thuyền, rùa lớn nổi lên, vua cầm kiếm chỉ, rùa ngậm kiếm lặn; một
//     thuyết khác: kiếm thần, ấn thần mất đêm vua Lê Thánh Tông băng, người sau thấy chuôi kiếm nổi giữa hồ rồi chìm.
//   - Nguyễn Đổng Chi, Kho tàng truyện cổ tích Việt Nam (thế kỷ 20; bản trong SGK Ngữ văn 6): sau khi đuổi giặc Minh một năm, vua dạo thuyền
//     rồng, Long Quân sai rùa vàng: "Bệ hạ hoàn gươm cho Long Quân!" → bản "trả gươm" duy nhất mang ý cao đẹp. Hữu Vọng (thời Tự Đức gọi hồ
//     Thủy Quân) bị chính quyền Pháp san lấp từ 1884.
//   Cụ rùa: Rafetus swinhoei (rùa mai mềm / giải); cân 169 kg khi đưa lên bể chữa trị năm 2011; được phát hiện chết 19/1/2016, làm tiêu bản;
//   đền Ngọc Sơn có tiêu bản cụ rùa mất năm 1967. Năm 2000 GS Hà Đình Đức đề xuất tên Rafetus leloii (đa số coi cùng loài R. swinhoei).
//   Bảo tồn: sau khi cá thể cái cuối cùng được biết (Tô Châu) chết năm 2019 và cá thể Đồng Mô chết năm 2023, chỉ còn biết vài cá thể, chưa
//   thấy con cái nào. Văn Miếu: 82 bia tiến sĩ dựng trên lưng rùa đá.
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import * as thumbs from '/videos/042-rua-than-ho-guom/thumbs.js';

const G = 880; // mặt đất
const LAKE = '#5f9e8f'; // Lục Thủy: nước xanh lục
const ME = { body: 'man', outfit: 'tunic', color: '#e4572e', color2: '#f6c344', hair: 'topknot', hat: 'non' }; // "mình"
const LL = { body: 'big', outfit: 'tunic', color: '#3f5a3a', color2: '#c9a24a', hair: 'topknot', beard: true }; // Lê Lợi thời Lam Sơn
const VUA = { body: 'big', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'crown', hair: 'topknot', beard: true, cape: '#b5482c' }; // Lê Thái Tổ
const THAN = { body: 'man', outfit: 'tunic', color: '#8a6a3a', color2: '#e8d9a8', hair: 'short', hat: 'non' }; // Lê Thận
const QUAN = (c) => ({ body: 'man', outfit: 'robe', color: c, color2: '#f6c344', hat: 'band', hair: 'topknot' });
const SCI = { body: 'woman', outfit: 'dress', color: '#2e6da4', color2: '#e9e4dc', hair: 'bun' }; // nhà khoa học
const DAN = (c, extra = {}) => ({ body: 'man', outfit: 'tunic', color: c, color2: '#f6c344', hair: 'short', ...extra });
const KC = ['#e4572e', '#2e86de', '#f6c344', '#3bb273', '#8e5bd3', '#ef6f9a', '#f08a24', '#1f7a8c'];

// Chữ to viền kem.
const T = (k, s, x, y, size, color, p, o = {}) => k.text(s, x, y, { size, font: 'title', color, fx: o.fx ?? 'pop', p, outline: '#fffaf0', outlineWidth: size * 0.15, maxWidth: o.maxWidth ?? 1700, align: o.align });
function say(k, text, c, box, tail, o = {}) {
  k.bubble(box[0], box[1], box[2], box[3], tail[0], tail[1], { p: o.p ?? k.at(c, 0.4), text, size: o.size ?? 44, seed: o.seed, think: o.think });
}
function stamp(k, x, y, text, p, o = {}) {
  const s = Math.max(0.01, k.ease.back(Math.min(1, p)) * (1 + 0.6 * (1 - Math.min(1, p))));
  k.group({ x, y, s, r: o.r ?? -0.1, a: Math.min(1, p * 3) }, () => {
    const w = o.w ?? 420;
    k.rect(-w / 2, -60, w, 120, { stroke: o.color ?? '#c0392b', width: 8, fillStyle: 'solid', seed: 77 });
    k.text(text, 0, 4, { size: o.size ?? 60, font: 'title', color: o.color ?? '#c0392b' });
  });
}
// Tấm giấy trích sách: tiêu đề + các dòng [text, p, màu].
function doc(k, x, y, w, h, title, lines, p, o = {}) {
  k.group({ x, y, s: Math.max(0.01, k.ease.back(Math.min(1, p))), r: o.r ?? -0.02, a: Math.min(1, p * 3) }, () => {
    k.rect(-w / 2, -h / 2, w, h, { fill: '#f6e7c1', width: 5, seed: o.seed ?? Math.round(x) });
    k.text(title, 0, -h / 2 + 56, { size: o.titleSize ?? 44, font: 'title', color: '#b5482c', maxWidth: w - 60 });
    lines.forEach((l, i) => k.text(l[0], 0, -h / 2 + 140 + i * (o.gap ?? 64), { size: o.size ?? 40, color: l[2] ?? '#3b2f2a', maxWidth: w - 70, p: l[1] ?? 1, fx: 'fade', weight: 600 }));
  });
}
// Thẻ "BÍ ẨN n/5": phủ kín khung ~2,5 giây đầu (cue 'n'), sau đó còn nhãn nhỏ góc trái (pill, vẽ cuối cùng).
function intro(k, n, q) {
  const a = 1 - k.at(k.cue('n', 2.4), 0.5);
  k.group({ a }, () => {
    k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#1f4a44', fillStyle: 'solid', stroke: 'none', seed: 990 });
    k.text(`BÍ ẨN ${n}/5`, 960, 400, { size: 120, font: 'title', color: '#f6c344', fx: 'pop', p: k.at('n', 0.5) });
    k.text(q, 960, 590, { size: 80, font: 'title', color: '#fffaf0', fx: 'pop', p: k.at(k.cue('n', 0.3), 0.5), maxWidth: 1600 });
  });
}
const pill = (k, n, p = 1) => k.text(`BÍ ẨN ${n}/5`, 30, 50, { size: 36, font: 'title', align: 'left', color: '#b5482c', outline: '#fffaf0', outlineWidth: 8, fx: 'fade', p });
// Mặt hồ: trời + bờ xa + nước xanh lục.
function lake(k, level = 600, o = {}) {
  k.backdrop(o.sky ?? 'day', { ground: level - 30 });
  if (o.city !== false) {
    k.prop('palace', 1620, level - 40, 230, { p: 1 });
    k.prop('banyan', 260, level - 50, 200);
    k.prop('banyan', 1200, level - 50, 150);
  }
  k.water(level, { color: o.color ?? LAKE, amp: o.amp ?? 8 });
}
// Dòng thời gian 5 bản kể; active = chỉ số bản đang nói (-1: không).
const ERAS = [['1431', 'Lam Sơn thực lục'], ['≈1786', 'Sơn cư tạp thuật'], ['đầu TK 19', 'Tang thương ngẫu lục'], ['1865–1882', 'Đại Nam nhất thống chí'], ['TK 20', 'Nguyễn Đổng Chi']];
function timeline(k, active, p = 1, y = 140) {
  k.line(260, y, 1660, y, { width: 6, seed: 400, p });
  ERAS.forEach(([yr, name], i) => {
    const x = 260 + i * 350, on = i === active;
    k.circle(x, y, on ? 22 : 14, { fill: on ? '#e4572e' : '#fffaf0', fillStyle: 'solid', width: 4, seed: 401 + i, p: p > i / 5 ? 1 : 0 });
    k.text(yr, x, y - 46, { size: on ? 40 : 30, font: 'title', color: on ? '#e4572e' : '#6b5f55', fx: 'fade', p: p > i / 5 ? 1 : 0 });
    k.text(name, x, y + 52, { size: on ? 32 : 26, color: on ? '#3b2f2a' : '#8a7f75', weight: 700, fx: 'fade', p: p > i / 5 ? 1 : 0, maxWidth: 340 });
  });
}
// Lưỡi gươm có chữ (to, nằm ngang).
function bladeText(k, x, y, s, p, text = '順天 · THUẬN THIÊN') {
  k.group({ x, y, s: Math.max(0.01, s * k.ease.back(Math.min(1, p))), a: Math.min(1, p * 3) }, () => {
    k.poly([[-430, -34], [380, -34], [450, 0], [380, 34], [-430, 34]], { fill: '#d9dde3', fillStyle: 'solid', width: 5, seed: 410 });
    k.rect(-470, -60, 40, 120, { fill: '#c9a24a', fillStyle: 'solid', width: 5, seed: 411 });
    k.text(text, -20, 4, { size: 42, font: 'title', color: '#b5482c' });
  });
}
// Kim Quy (mai vảy vàng) cạnh con giải thật — so sánh.
function compare(k, p1, p2, x1 = 560, x2 = 1360, y = 560) {
  k.prop('turtle', x1, y, 420, { glow: true, p: p1 });
  T(k, 'Rùa vàng trong truyện', x1, y + 240, 52, '#b5482c', p1);
  k.prop('softshell', x2, y, 460, { p: p2 });
  T(k, 'Giải: rùa mai mềm', x2, y + 240, 52, '#3f6f2a', p2);
}

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    title: 'Rùa thần Hồ Gươm có thật không? Bí ẩn chuyện trả gươm',
    description: `Rùa vàng nổi lên đòi gươm của vua Lê Lợi, ai cũng thuộc. Nhưng cuốn sách cổ nhất chép về thanh gươm (Lam Sơn thực lục, 1431) không hề có con rùa nào, và có bản chép cổ còn kể nhà vua ném gươm xuống hồ.
Video giải 5 bí ẩn của truyền thuyết Hồ Gươm: thanh gươm Thuận Thiên từ đâu ra, ai thêm con rùa vào câu chuyện, nửa kia của Hồ Gươm đi đâu, cụ rùa Hồ Gươm thật ra là con gì, và vì sao truyền thuyết Việt luôn chọn con rùa.`,
    links: [
      ['▶ Tập trước: Nỏ thần có thật không? Mỵ Châu – Trọng Thủy', '033-my-chau-trong-thuy'],
      ['▶ Con Rồng Cháu Tiên: Lạc Long Quân và 100 trứng', '006-con-rong-chau-tien'],
      ['▶ Xem từ đầu series: Thánh Gióng có thật không?', '003-thanh-giong-co-that-khong'],
      ['🔔 Đăng ký Vẽ Là Hiểu', 'https://www.youtube.com/@velahiu?sub_confirmation=1'],
    ],
    footer: `📚 Nguồn tham khảo: Lam Sơn thực lục (1431); Sơn cư tạp thuật – thiên Vật quái (Đan Sơn, cuối thế kỷ 18); Tang thương ngẫu lục (Phạm Đình Hổ, Nguyễn Án); Đại Nam nhất thống chí – mục hồ Hoàn Kiếm (Quốc sử quán triều Nguyễn); Nguyễn Đổng Chi, Kho tàng truyện cổ tích Việt Nam – Sự tích Hồ Gươm; Lê Thời Tân, Nguyễn Văn Phương, Dương Văn Duyên, "Truyền thuyết 'Hồ Hoàn Kiếm' – một cách đọc liên văn bản", Tạp chí Khoa học ĐHSP TP.HCM, 16(2), 2019; tư liệu về rùa Hồ Gươm (Rafetus swinhoei) của Asian Turtle Program và báo chí 2011, 2016.
🔔 Đăng ký Vẽ Là Hiểu để xem trọn series: Thánh Gióng → Sơn Tinh – Thủy Tinh → Con Rồng Cháu Tiên → Thuồng luồng → 18 đời vua Hùng → Mỵ Châu – Trọng Thủy → Rùa thần Hồ Gươm → …
💬 Tập sau: Ma lai là gì? Vì sao người xưa tin có ma lai.`,
    tags: ['rùa thần hồ gươm', 'hồ gươm', 'sự tích hồ gươm', 'lê lợi trả gươm', 'hồ hoàn kiếm', 'cụ rùa hồ gươm', 'rùa hồ gươm', 'gươm thuận thiên', 'lê thận', 'kim quy', 'rùa vàng', 'rafetus swinhoei', 'lam sơn thực lục', 'truyền thuyết việt nam', 'giải mã truyền thuyết', 'vẽ là hiểu'],
    hashtags: ['hoguom', 'leloi', 'suviet'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '+0%',
    voices: {
      rua: { voice: 'vi-VN-NamMinhNeural', pitch: '-20Hz', rate: '-14%' },
      ll: { voice: 'vi-VN-NamMinhNeural', pitch: '-10Hz', rate: '-6%' },
      than: { voice: 'vi-VN-NamMinhNeural', pitch: '+8Hz', rate: '+4%' },
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
      say: [
        '{me}Mình đang chèo một chiếc thuyền nhỏ, theo sau thuyền rồng của nhà vua, giữa một mặt hồ xanh ngắt trước kinh thành. {peace}Giặc Minh đã bị đuổi về nước được một năm. {bub}Bỗng mặt hồ sủi bọt. {rise}Một con rùa vàng khổng lồ nhô lên, và cất tiếng:',
        { v: 'rua', text: '{talk}Bệ hạ hoàn gươm cho Long Quân!' },
        '{fly}Thanh gươm rời tay vua, bay về phía con rùa. {name}Từ đó, hồ có tên là Hồ Gươm. {but}Câu chuyện ai cũng thuộc. {book}Nhưng mình vừa mở cuốn sách cổ nhất chép về thanh gươm này, viết năm 1431. {none}Và trong đó… không có con rùa nào cả.',
      ],
      sfx: [['pop', 'me'], ['sparkle', 'peace', 0.4], ['gulp', 'bub', 0.5], ['slideUp', 'rise', 0.5], ['pop', 'talk'], ['whoosh', 'fly', 0.6], ['tada', 'name', 0.5], ['scratch', 'book', 0.5], ['wahwah', 'none', 0.6]],
      draw(k) {
        const cut = k.at('book', 0.5);
        const rise = k.at('rise', 1.2, 'out');
        const fly = k.at('fly', 1.3, 'inOut');
        k.group({ a: 1 - cut }, () => {
          lake(k, 600);
          k.prop('turtle', 1420, k.lerp(900, 590, rise), 460, { glow: true, talk: k.t > k.cue('talk') && k.t < k.cue('fly'), p: rise > 0 ? 1 : 0 });
          for (let i = 0; i < 6; i++) k.circle(1380 + (i % 3) * 40, 640 - ((k.t * 60 + i * 25) % 70), 6 + (i % 2) * 4, { stroke: '#d6ecfa', width: 3, seed: 20 + i, p: k.at('bub', 0.3) * (1 - rise) });
          k.water(640, { color: LAKE, amp: 6, alpha: 0.75 });
          // thuyền rồng + vua
          k.prop('boat', 700, 760, 640, { fill: '#c9a24a' });
          k.char(640, 740, 330, { ...VUA, face: k.t > k.cue('fly') ? 'happy' : k.t > k.cue('rise') ? 'shock' : 'calm', pose: k.t > k.cue('fly') ? 'present' : 'hold', shadow: false });
          for (let i = 0; i < 2; i++) k.char(800 + i * 110, 740, 240, { ...QUAN(KC[i + 1]), face: k.t > k.cue('rise') ? 'shock' : 'calm', pose: 'stand', shadow: false });
          const sx = k.lerp(720, 1500, fly), sy = k.lerp(520, 620, fly) - Math.sin(fly * Math.PI) * 260;
          k.prop('sword', sx, sy, 200, { rotate: k.lerp(0.3, 1.6, fly), glow: true, alpha: 1 - k.at(k.cue('fly', 1.2), 0.3) });
          // thuyền nhỏ của "mình"
          k.prop('boat', 260, 920, 380, { fill: '#9c6b3f' });
          k.char(250, 905, 230, { ...ME, face: k.t > k.cue('rise') ? 'shock' : 'happy', pose: k.t > k.cue('rise') ? 'point' : 'hold', prop: 'rod', shadow: false });
          T(k, 'mình', 250, 600, 44, '#b5482c', k.at('me', 0.4) * (1 - k.at('peace', 0.4)));
          T(k, 'HỒ TRƯỚC KINH THÀNH', 960, 110, 70, '#1f4a44', k.at('me', 0.5) * (1 - k.at('talk', 0.3)));
          say(k, 'Bệ hạ hoàn gươm cho Long Quân!', 'talk', [1080, 150, 700, 150], [1460, 560], { size: 50 });
          T(k, 'HỒ GƯƠM', 960, 110, 120, '#e4572e', k.at('name', 0.5));
        });
        k.group({ a: cut }, () => {
          doc(k, 620, 560, 820, 620, 'LAM SƠN THỰC LỤC · 1431', [['sách cổ nhất chép về thanh gươm', 1, '#6b5f55'], ['✔ được gươm', k.at(k.cue('book', 1), 0.5), '#3f6f2a'], ['✘ rùa vàng', k.at('none', 0.5), '#c0392b'], ['✘ trả gươm', k.at(k.cue('none', 0.4), 0.5), '#c0392b']], cut, { size: 46, gap: 90 });
          k.prop('turtle', 1440, 520, 380, { p: cut });
          k.icon('cross', 1440, 520, 380, { p: k.at('none', 0.4) });
          T(k, 'KHÔNG CÓ RÙA?!', 1440, 860, 90, '#e4572e', k.at(k.cue('none', 0.6), 0.5));
        });
      },
    },
    {
      say: '{throw}Chưa hết. Có một bản chép cổ khác, nhà vua không trả gươm, mà… ném gươm xuống hồ. {real}Còn cụ rùa sống thật giữa Hồ Gươm đến năm 2016, {soft}thì không có mai vảy vàng như rùa trong tranh, mà là… một con giải mai mềm. {go}Năm bí ẩn. Mình giải lần lượt nhé.',
      sfx: [['scratch', 'throw', 0.4], ['boing', ['throw', 2.6], 0.5], ['pop', 'real'], ['bonk', 'soft', 0.5], ['drumroll', 'go', 0.3]],
      draw(k) {
        lake(k, 640, { city: false });
        // trái: vua ném gươm, gươm bay vòng cung rơi xuống nước
        k.prop('boat', 230, 560, 340, { fill: '#c9a24a', p: k.at('throw', 0.4) });
        k.char(220, 548, 220, { ...VUA, face: 'angry', pose: 'shout', shadow: false, p: k.at('throw', 0.4) });
        const f = k.at(k.cue('throw', 1.6), 1, 'in');
        k.prop('sword', k.lerp(260, 640, f), k.lerp(420, 700, f) - Math.sin(f * Math.PI) * 160, 200, { rotate: f * 3, p: k.at('throw', 0.4), alpha: 1 - k.at(k.cue('throw', 2.6), 0.2) });
        k.burst(640, 690, 80, 'TÕM!', { p: k.at(k.cue('throw', 2.6), 0.3) * (1 - k.at('real', 0.3)), size: 40 });
        T(k, '1 bản chép: NÉM GƯƠM?!', 480, 220, 66, '#e4572e', k.at('throw', 0.5), { maxWidth: 820 });
        // phải: cụ rùa thật
        k.prop('softshell', 1420, 640, 480, { p: k.at('real', 0.5) });
        k.water(690, { color: LAKE, amp: 5, alpha: 0.6 });
        T(k, 'cụ rùa thật · đến 2016', 1420, 220, 60, '#3b2f2a', k.at('real', 0.5), { maxWidth: 820 });
        T(k, 'MAI MỀM!', 1420, 380, 96, '#3f6f2a', k.at('soft', 0.5));
        stamp(k, 960, 470, '5 BÍ ẨN', k.at('go', 0.5), { w: 420, size: 72 });
      },
    },

    // ---------------- Bí ẩn 1 ----------------
    {
      chapter: 'Bí ẩn 1: Thanh gươm từ đâu ra?',
      say: '{n}Bí ẩn số một: thanh gươm từ đâu ra? {book}Cuốn sách cổ nhất là Lam Sơn thực lục, soạn năm 1431, ba năm sau khi Lê Lợi lên ngôi. {who}Nguyễn Trãi được xem là người chấp bút. {how}Và cuốn sách kể chuyện thanh gươm bắt đầu bằng… một người đi quăng chài.',
      sfx: [['drumroll', 'n', 0.3], ['pop', 'book'], ['pop', 'who'], ['boing', 'how', 0.5]],
      draw(k) {
        doc(k, 620, 560, 820, 560, 'LAM SƠN THỰC LỤC', [['soạn năm 1431', 1], ['3 năm sau khi Lê Lợi lên ngôi', 1, '#6b5f55'], ['chấp bút: Nguyễn Trãi', k.at('who', 0.5), '#b5482c']], k.at('book', 0.6), { size: 42, gap: 80 });
        k.char(1400, G, 420, { ...QUAN('#2e6da4'), beard: true, face: 'smug', pose: 'hold', prop: 'scroll', p: k.at('who', 0.5) });
        T(k, 'Nguyễn Trãi', 1400, 920, 50, '#3b2f2a', k.at('who', 0.5), { fx: 'fade' });
        k.prop('net', 1650, 360, 220, { p: k.at('how', 0.5) });
        T(k, 'quăng chài?', 1650, 200, 56, '#e4572e', k.at('how', 0.5));
        intro(k, 1, 'Thanh gươm từ đâu ra?');
        pill(k, 1, k.at(k.cue('n', 2.6), 0.4));
      },
    },
    {
      say: [
        '{try}Giờ mình thử làm Lê Thận một đêm. {who}Lê Thận là người trại Mục Sơn, bạn thân của Lê Lợi, sống bằng nghề quăng chài. {glow}Đêm ấy, ở vực Ma Viện, mình thấy dưới đáy nước sáng rực, như ai cầm bó đuốc soi. {cast}Mình quăng chài. Quăng cả đêm. {fish}Cá: không một con. {iron}Chỉ vớt lên một mảnh sắt, dài hơn một thước. {corner}Mang về, quẳng vào góc nhà tối.',
        { v: 'than', text: '{sigh}Đêm đánh cá tệ nhất đời mình.' },
        '{joke}Mà sau này nhìn lại, đó là mẻ lưới đáng giá nhất lịch sử Việt Nam.',
      ],
      sfx: [['pop', 'try'], ['pop', 'who'], ['sparkle', 'glow', 0.5], ['whoosh', 'cast', 0.5], ['wahwah', 'fish', 0.5], ['bonk', 'iron', 0.5], ['pop', 'corner'], ['pop', 'sigh'], ['tada', 'joke', 0.5]],
      draw(k) {
        const home = k.at('corner', 0.6);
        k.group({ a: 1 - home }, () => {
          k.backdrop('night', { ground: 560 });
          k.water(600, { color: '#2f5a6a', amp: 6 });
          const g = k.at('glow', 0.8) * (0.8 + 0.2 * Math.sin(k.t * 4));
          k.ellipse(1150, 900, 520 * Math.max(0.01, g), 200 * Math.max(0.01, g), { fill: '#fff3c4', fillStyle: 'solid', stroke: 'none', alpha: 0.45 * g, seed: 30 });
          k.prop('boat', 700, 660, 460, { fill: '#9c6b3f' });
          k.char(680, 645, 300, { ...THAN, face: k.t > k.cue('fish') ? 'sad' : k.t > k.cue('glow') ? 'shock' : 'calm', pose: k.t > k.cue('cast') ? 'point' : 'stand', shadow: false, p: k.at('try', 0.4) });
          k.prop('net', 1000, 780, 260 * Math.max(0.01, k.at('cast', 0.6)), { p: k.at('cast', 0.4) });
          T(k, 'LÊ THẬN · trại Mục Sơn', 700, 120, 60, '#f6c344', k.at('who', 0.5));
          T(k, 'vực Ma Viện', 1150, 300, 56, '#fff3c4', k.at('glow', 0.5));
          T(k, 'CÁ: 0', 1400, 460, 90, '#e4572e', k.at('fish', 0.4));
          k.prop('sword', 1150, 820, 160, { blade: true, hilt: false, rotate: 1.5, glow: true, p: k.at('iron', 0.5) });
          T(k, '1 mảnh sắt · dài hơn 1 thước', 1150, 1000, 50, '#fff3c4', k.at('iron', 0.5));
        });
        k.group({ a: home }, () => {
          k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#e9dcc0', fillStyle: 'solid', stroke: 'none', seed: 31 });
          k.rect(1200, 300, 600, 600, { fill: '#3b2f2a', fillStyle: 'solid', width: 5, seed: 32 });
          k.prop('sword', 1500, 760, 150, { hilt: false, rotate: 1.5, glow: true });
          k.text('góc nhà tối', 1500, 400, { size: 50, font: 'title', color: '#fff3c4', fx: 'fade', p: home });
          k.char(600, G, 460, { ...THAN, face: 'sad', pose: 'facepalm', shadow: false });
          say(k, 'Đêm đánh cá tệ nhất đời mình.', 'sigh', [180, 160, 700, 140], [580, 430], { size: 46 });
          stamp(k, 1150, 1000, 'MẺ LƯỚI ĐẮT GIÁ NHẤT', k.at('joke', 0.5), { w: 760, size: 56, color: '#3f6f2a' });
        });
      },
    },
    {
      say: [
        '{gio}Ít lâu sau, nhà Lê Thận có giỗ. {come}Lê Lợi đến chơi, thấy trong góc tối có ánh sáng.',
        { v: 'll', text: '{ask}Sắt nào đây?' },
        { v: 'than', text: '{ans}Đêm trước quăng chài vớt được.' },
        '{give}Lê Lợi xin, Lê Thận cho luôn. {clean}Đem về cạo rỉ, mài cho sáng, {word}trên lưỡi hiện ra hai chữ: Thuận Thiên. {li}Cùng một chữ nữa: Lợi. {joke}Gươm còn khắc sẵn tên người nhận, y như hàng đặt riêng.',
      ],
      sfx: [['pop', 'gio'], ['pop', 'come'], ['pop', 'ask'], ['pop', 'ans'], ['ding', 'give', 0.4], ['scratch', 'clean', 0.4], ['sparkle', 'word', 0.6], ['ding', 'li', 0.5], ['boing', 'joke', 0.5]],
      draw(k) {
        const zoom = k.at('clean', 0.6);
        k.group({ a: 1 - zoom }, () => {
          k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#e9dcc0', fillStyle: 'solid', stroke: 'none', seed: 31 });
          k.rect(1300, 300, 500, 600, { fill: '#3b2f2a', fillStyle: 'solid', width: 5, seed: 32 });
          k.prop('sword', 1550, 760, 150, { hilt: false, rotate: 1.5, glow: true });
          k.prop('incense', 900, 640, 160, { p: k.at('gio', 0.5) });
          k.prop('banhchung', 760, 690, 120, { p: k.at('gio', 0.5) });
          k.rect(640, 720, 400, 30, { fill: '#8a5a3a', fillStyle: 'solid', width: 4, seed: 33, p: k.at('gio', 0.5) > 0 ? 1 : 0 });
          k.char(400, G, 460, { ...THAN, face: k.t > k.cue('give') ? 'happy' : 'calm', pose: k.t > k.cue('give') ? 'present' : 'stand', shadow: false });
          k.char(1120, G, 480, { ...LL, face: k.t > k.cue('ask') ? 'shock' : 'calm', pose: k.t > k.cue('come') ? 'point' : 'wave', flip: false, shadow: false, p: k.at('come', 0.5) });
          say(k, 'Sắt nào đây?', 'ask', [1000, 140, 460, 130], [1160, 420], { size: 50 });
          say(k, 'Đêm trước quăng chài vớt được.', 'ans', [80, 140, 680, 130], [400, 420], { size: 44 });
          T(k, 'NGÀY GIỖ', 840, 120, 70, '#b5482c', k.at('gio', 0.5) * (1 - k.at('ask', 0.3)));
        });
        k.group({ a: zoom }, () => {
          k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#2b2f3d', fillStyle: 'solid', stroke: 'none', seed: 34 });
          bladeText(k, 960, 460, 1.6, k.at('clean', 0.6), '');
          k.text('順天', 760, 470, { size: 100, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('word', 0.5) });
          k.text('利', 1180, 470, { size: 100, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('li', 0.5) });
          T(k, 'THUẬN THIÊN', 760, 700, 80, '#f6c344', k.at('word', 0.5));
          T(k, 'LỢI', 1180, 700, 80, '#f6c344', k.at('li', 0.5));
          stamp(k, 960, 920, 'GƯƠM ĐẶT RIÊNG', k.at('joke', 0.5), { w: 620, size: 62 });
        });
      },
    },
    {
      say: [
        '{door}Rồi một hôm, ra ngoài cửa, Lê Lợi thấy một cái chuôi gươm, đã mài giũa thành hình. {pray}Ông khấn:',
        { v: 'll', text: '{vow}Nếu quả là gươm trời cho, thì xin chuôi và lưỡi liền nhau!' },
        '{fit}Lắp lưỡi vào chuôi: vừa khít. {joke}Lưỡi một nơi, chuôi một nẻo, mà lắp vào khít như hàng chính hãng. {tree}Còn bản kể quen thuộc ngày nay thì đặt cái chuôi ấy trên ngọn một cây đa giữa rừng.',
      ],
      sfx: [['pop', 'door'], ['sparkle', 'pray', 0.4], ['pop', 'vow'], ['click', 'fit', 0.7], ['ding', ['fit', 0.4], 0.5], ['boing', 'joke', 0.5], ['pop', 'tree']],
      draw(k) {
        k.backdrop('dawn', { ground: G });
        k.prop('stilthouse', 300, G, 420);
        k.char(720, G, 480, { ...LL, face: k.t > k.cue('fit') ? 'happy' : k.t > k.cue('vow') ? 'calm' : 'shock', pose: k.t > k.cue('fit') ? 'cheer' : k.t > k.cue('pray') ? 'present' : 'point', shadow: false, p: k.at('door', 0.4) });
        const fit = k.at('fit', 0.8, 'inOut');
        k.prop('sword', 1260, k.lerp(560, 520, fit), 260, { blade: false, glow: true, p: k.at('door', 0.5) });
        k.prop('sword', k.lerp(1500, 1260, fit), k.lerp(380, 520, fit), 260, { hilt: false, glow: true, rotate: k.lerp(0.8, 0, fit), p: k.at('vow', 0.5) });
        say(k, 'Xin chuôi và lưỡi liền nhau!', 'vow', [380, 130, 620, 140], [700, 400], { size: 46 });
        T(k, 'KHÍT!', 1260, 220, 110, '#e4572e', k.at('fit', 0.4));
        stamp(k, 1180, 900, 'HÀNG CHÍNH HÃNG', k.at('joke', 0.5), { w: 620, size: 58, color: '#3f6f2a' });
        k.group({ a: k.at('tree', 0.5) }, () => {
          k.rect(1540, 360, 340, 360, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 35 });
          k.text('bản ngày nay: cây đa', 1710, 410, { size: 30, font: 'title', color: '#3b2f2a' });
          k.prop('banyan', 1710, 650, 230);
          k.prop('sword', 1710, 510, 80, { blade: false, glow: true });
        });
      },
    },
    {
      say: '{mean}Thuận Thiên nghĩa là: thuận theo ý trời. {1428}Và năm 1428, khi lên ngôi, Lê Lợi đặt niên hiệu là… {same}Thuận Thiên. {motif}Một vị vua mở nước được trời trao gươm, đó là kiểu chuyện rất quen trong sử cũ: cách người xưa nói rằng người này được trời chọn. {war}Còn với nghĩa quân Lam Sơn, mười năm nếm mật nằm gai, {torch}một thanh gươm trời cho là ngọn đuốc giữ lửa cho cả đoàn quân.',
      sfx: [['pop', 'mean'], ['drumroll', '1428', 0.3], ['tada', 'same', 0.5], ['pop', 'motif'], ['pop', 'war'], ['sparkle', 'torch', 0.5]],
      draw(k) {
        bladeText(k, 960, 200, 1.1, k.at('mean', 0.5));
        T(k, '= thuận theo ý trời', 960, 330, 60, '#3b2f2a', k.at('mean', 0.6), { fx: 'fade' });
        k.char(560, G, 460, { ...VUA, face: 'happy', pose: 'present', p: k.at('1428', 0.5) });
        T(k, '1428 · niên hiệu', 560, 330 + 140, 56, '#6b5f55', k.at('1428', 0.5) * (1 - k.at('motif', 0.4)), { fx: 'fade' });
        T(k, 'THUẬN THIÊN', 1300, 560, 110, '#e4572e', k.at('same', 0.5));
        k.highlight(980, 510, 640, 100, { p: k.at(k.cue('same', 0.4), 0.5) });
        k.group({ a: k.at('war', 0.5) }, () => {
          for (let i = 0; i < 5; i++) k.char(1000 + i * 150, G + 70, 220, { ...DAN(KC[i]), hat: 'helmet', face: 'happy', pose: i % 2 ? 'cheer' : 'hold', prop: 'spear', shadow: false });
        });
        T(k, '10 năm Lam Sơn', 1300, 680, 54, '#3b2f2a', k.at('war', 0.5), { fx: 'fade' });
        k.icon('fire', 1300, 420, 100, { p: k.at('torch', 0.5) });
      },
    },
    {
      say: '{ep}À, đây là tập bảy trong series Truyền thuyết Việt Nam. {remember}Nhớ con rùa vàng ở tập Mỵ Châu chứ? {coloa}Nó giúp An Dương Vương xây thành Cổ Loa, tặng vuốt làm lẫy nỏ. {back}Hơn một nghìn sáu trăm năm sau, nó quay lại, lần này để… đòi đồ. {sub}Nếu bạn mới đến, bấm đăng ký nhé: cả series đang chờ bạn.',
      sfx: [['pop', 'ep'], ['pop', 'remember'], ['sparkle', 'coloa', 0.4], ['boing', 'back', 0.5], ['ding', 'sub', 0.5]],
      draw(k) {
        k.text('SERIES TRUYỀN THUYẾT VIỆT NAM · TẬP 7', 960, 110, { size: 54, font: 'title', color: '#b5482c', p: k.at('ep', 1.2, 'linear') });
        const pc = k.at('remember', 0.6, 'back');
        k.group({ x: 480, y: 520, s: Math.max(0.01, pc), r: -0.03 }, () => {
          k.rect(-300, -230, 600, 460, { fill: '#fffaf0', width: 6, seed: 40, p: pc > 0 ? 1 : 0 });
          k.prop('turtle', -40, 30, 300, { glow: true });
          k.prop('crossbow', 170, -80, 150);
          k.text('Tập 6 · Mỵ Châu – Trọng Thủy', 0, 280, { size: 38, font: 'title', outline: '#fffaf0', outlineWidth: 8 });
        });
        T(k, 'Cổ Loa · vuốt rùa', 480, 200, 48, '#6b5f55', k.at('coloa', 0.5), { fx: 'fade' });
        k.arrow(820, 520, 1060, 520, { width: 7, p: k.at('back', 0.5) });
        T(k, '+1.600 năm', 940, 450, 44, '#b5482c', k.at('back', 0.5), { fx: 'fade' });
        k.prop('turtle', 1400, 520, 380, { glow: true, talk: true, p: k.at('back', 0.5) });
        k.prop('sword', 1620, 380, 160, { rotate: 0.6, glow: true, p: k.at('back', 0.5) });
        T(k, 'ĐÒI ĐỒ!', 1420, 260, 90, '#e4572e', k.at(k.cue('back', 1.2), 0.4));
        stamp(k, 960, 960, 'ĐĂNG KÝ XEM TRỌN BỘ', k.at('sub', 0.5), { w: 640, size: 46 });
      },
    },

    // ---------------- Bí ẩn 2 ----------------
    {
      chapter: 'Bí ẩn 2: Ai thêm con rùa vào?',
      say: '{n}Bí ẩn số hai: ai đã thêm con rùa vào? {only}Lam Sơn thực lục chỉ kể chuyện được gươm. {none}Không có hồ, không có rùa, không có trả gươm. {flip}Vậy mình lật các sách cổ theo đúng thứ tự thời gian, {see}xem con rùa bước vào câu chuyện từ lúc nào.',
      sfx: [['drumroll', 'n', 0.3], ['pop', 'only'], ['bonk', 'none', 0.5], ['whoosh', 'flip', 0.5], ['pop', 'see']],
      draw(k) {
        timeline(k, 0, k.at('flip', 1.6, 'linear'), 200);
        doc(k, 600, 640, 720, 460, 'LAM SƠN THỰC LỤC', [['✔ được gươm', k.at('only', 0.5), '#3f6f2a'], ['✘ hồ · ✘ rùa · ✘ trả gươm', k.at('none', 0.5), '#c0392b']], k.at('only', 0.5), { size: 46, gap: 90 });
        k.prop('turtle', 1400, 640, 360, { p: k.at('see', 0.5), glow: true });
        T(k, '?', 1560, 480, 140, '#e4572e', k.at('see', 0.5));
        intro(k, 2, 'Ai đã thêm con rùa vào?');
        pill(k, 2, k.at(k.cue('n', 2.6), 0.4));
      },
    },
    {
      say: '{book}Hơn ba trăm năm sau, cuối thế kỷ mười tám, cuốn dã sử Sơn cư tạp thuật chép thế này. {early}Đầu đời vua Thái Tổ, {big}có con rùa to như cái lọng, nổi lên mặt hồ. {pray}Khấn yểm cách nào cũng không đuổi đi được. {point}Vua lấy gươm chỉ vào nó. {neck}Rùa nghển cổ, như ngóng nhìn. {throw}Vua giận, ném gươm xuống hồ. {gone}Rùa lặn mất. {drain}Vua sai tát cạn hồ. {nothing}Không thấy rùa. Gươm cũng chẳng biết ở đâu. {joke}Bản này không có chữ "trả". Chỉ có chữ "mất".',
      sfx: [['pop', 'book'], ['pop', 'early'], ['slideUp', 'big', 0.5], ['pop', 'pray'], ['pop', 'point'], ['boing', 'neck', 0.4], ['whoosh', 'throw', 0.5], ['gulp', 'gone', 0.5], ['slideDown', 'drain', 0.5], ['wahwah', 'nothing', 0.5], ['scratch', 'joke', 0.4]],
      draw(k) {
        const drain = k.at('drain', 1.5, 'inOut');
        k.backdrop('day', { ground: 470 });
        timeline(k, 1, 1, 120);
        k.rect(-40, 470, k.W + 80, 700, { fill: '#a88a5a', fillStyle: 'solid', width: 4, seed: 50 });
        const rise = k.at('big', 0.8) * (1 - k.at('gone', 0.6));
        k.prop('turtle', 1300, k.lerp(820, 600, rise), 420, { p: k.at('big', 0.4) > 0 && k.t < k.cue('drain') ? 1 : 0, alpha: rise });
        k.water(k.lerp(500, 1080, drain), { color: LAKE, amp: 6 });
        k.group({ x: 0, y: 0 }, () => {
          k.prop('boat', 560, 560 + drain * 300, 420, { fill: '#c9a24a' });
          k.char(540, 545 + drain * 300, 260, { ...VUA, face: k.t > k.cue('nothing') ? 'sad' : k.t > k.cue('throw') ? 'angry' : k.t > k.cue('pray') ? 'shock' : 'calm', pose: k.t > k.cue('drain') ? 'shrug' : k.t > k.cue('point') ? 'point' : 'stand', shadow: false });
        });
        const f = k.at('throw', 0.8, 'in');
        k.prop('sword', k.lerp(700, 1150, f), k.lerp(420, 640, f) - Math.sin(f * Math.PI) * 120, 140, { rotate: k.lerp(0.5, 3, f), p: k.at('point', 0.4), alpha: 1 - k.at('gone', 0.3) });
        k.icon('question', 1300, 760, 160, { p: k.at('nothing', 0.4) });
        T(k, 'rùa to như cái lọng', 1300, 330, 52, '#3b2f2a', k.at('big', 0.5) * (1 - k.at('throw', 0.3)), { fx: 'fade' });
        T(k, 'TÁT CẠN HỒ!', 1300, 330, 70, '#e4572e', k.at('drain', 0.5) * (1 - k.at('joke', 0.3)));
        stamp(k, 960, 980, 'KHÔNG "TRẢ" · CHỈ "MẤT"', k.at('joke', 0.5), { w: 760, size: 56 });
      },
    },
    {
      say: '{book}Sang đầu thế kỷ mười chín, Tang thương ngẫu lục của Phạm Đình Hổ và Nguyễn Án kể: {fall}gươm rơi xuống nước, rùa lặn theo. {dam}Vua sai đắp một bờ ngang, tát nước tìm. {no}Vẫn không thấy. {two}Đời sau, nhân cái bờ ấy, chia hồ làm hai: hồ Tả Vọng và hồ Hữu Vọng. {joke}Tức là trong bản này, thanh gươm không làm nên tên hồ… mà làm ra tận hai cái hồ.',
      sfx: [['pop', 'book'], ['gulp', 'fall', 0.5], ['bonk', 'dam', 0.4], ['wahwah', 'no', 0.4], ['tada', 'two', 0.4], ['boing', 'joke', 0.5]],
      draw(k) {
        timeline(k, 2, 1, 120);
        k.rect(160, 260, 1600, 700, { fill: '#e9e2c8', fillStyle: 'solid', width: 5, seed: 60 });
        const lakeShape = (cx, cy, rx, ry, seed, p) => k.ellipse(cx, cy, rx, ry, { fill: '#7fb8a8', fillStyle: 'solid', width: 5, seed, p });
        lakeShape(960, 610, 1300, 560, 61, k.at('book', 0.6));
        k.prop('sword', 820, 560, 140, { rotate: 1.3, p: k.at('book', 0.4), alpha: 1 - k.at('fall', 0.6) });
        k.prop('turtle', 1060, 600, 200, { p: k.at('book', 0.4), alpha: 1 - k.at('fall', 0.6) });
        k.rect(940, 330, 40, 560, { fill: '#a88a5a', fillStyle: 'solid', width: 4, seed: 62, p: k.at('dam', 0.8) });
        T(k, 'bờ ngang', 960, 300, 44, '#6b4a33', k.at('dam', 0.5), { fx: 'fade' });
        k.icon('question', 960, 610, 140, { p: k.at('no', 0.3) * (1 - k.at('two', 0.3)) });
        T(k, 'TẢ VỌNG', 640, 610, 80, '#1f4a44', k.at('two', 0.5));
        T(k, 'HỮU VỌNG', 1290, 610, 80, '#1f4a44', k.at(k.cue('two', 0.5), 0.5));
        stamp(k, 960, 980, '1 GƯƠM = 2 HỒ', k.at('joke', 0.5), { w: 560, size: 62 });
      },
    },
    {
      say: '{book}Đến triều Nguyễn, bộ địa chí Đại Nam nhất thống chí chép: {turtle}tương truyền vua Lê Thái Tổ dạo thuyền, có rùa lớn nổi lên. Vua cầm gươm chỉ vào, rùa ngậm gươm lặn xuống. {other}Sách còn ghi thêm một thuyết: {seal}gươm thần và ấn thần mất đúng đêm vua Lê Thánh Tông qua đời, {hilt}người đời sau thấy chuôi gươm nổi giữa hồ, rồi lại chìm. {see}Để ý không? Từ Sơn cư tạp thuật đến Đại Nam nhất thống chí, các bản cũ đều kể chuyện… mất gươm.',
      sfx: [['pop', 'book'], ['slideUp', 'turtle', 0.5], ['pop', 'other'], ['ding', 'seal', 0.4], ['sparkle', 'hilt', 0.4], ['scratch', 'see', 0.4]],
      draw(k) {
        timeline(k, 3, 1, 120);
        doc(k, 560, 600, 760, 640, 'ĐẠI NAM NHẤT THỐNG CHÍ', [['vua cầm gươm chỉ vào rùa', k.at('turtle', 0.5)], ['→ rùa ngậm gươm lặn xuống', k.at(k.cue('turtle', 2), 0.5), '#b5482c'], ['thuyết khác:', k.at('other', 0.5), '#6b5f55'], ['gươm + ấn mất đêm', k.at('seal', 0.5)], ['vua Lê Thánh Tông qua đời', k.at('seal', 0.5)]], k.at('book', 0.5), { size: 40, gap: 72 });
        k.water(820, { color: LAKE, amp: 6, alpha: 0.9 });
        const h = Math.sin(Math.min(1, k.at('hilt', 2.4, 'linear')) * Math.PI);
        k.prop('sword', 1400, 860 - h * 160, 220, { blade: false, glow: true, p: k.at('hilt', 0.3) });
        k.water(830, { color: LAKE, amp: 6, alpha: 0.75 });
        T(k, 'chuôi gươm nổi lên… rồi chìm', 1400, 440, 48, '#3b2f2a', k.at('hilt', 0.5), { fx: 'fade', maxWidth: 800 });
        stamp(k, 1400, 300, 'MẤT GƯƠM', k.at('see', 0.5), { w: 460, size: 66 });
      },
    },
    {
      say: [
        '{modern}Còn bản mà chúng ta học ở lớp sáu, lấy theo Kho tàng truyện cổ tích Việt Nam của Nguyễn Đổng Chi, thế kỷ hai mươi, mới có cảnh: {lq}Long Quân cho mượn gươm đánh giặc, {peace}đất nước yên rồi, sai rùa vàng lên đòi:',
        { v: 'rua', text: '{talk}Bệ hạ hoàn gươm cho Long Quân!' },
        '{paper}Các nhà nghiên cứu Lê Thời Tân và cộng sự, năm 2019, chỉ ra điều này: {old}các bản trung đại kể chuyện mất gươm, như một điềm triều đại suy vi. {new}Bản hiện đại biến nó thành trả gươm: hết giặc thì cất vũ khí đi. {joke}Giống một bộ phim được làm lại nhiều lần, mỗi bản đổi một cái kết. {grow}Câu chuyện không sai. Nó lớn lên cùng người kể.',
      ],
      sfx: [['pop', 'modern'], ['sparkle', 'lq', 0.4], ['pop', 'peace'], ['pop', 'talk'], ['pop', 'paper'], ['wahwah', 'old', 0.4], ['tada', 'new', 0.4], ['boing', 'joke', 0.5], ['ding', 'grow', 0.4]],
      draw(k) {
        timeline(k, 4, 1, 120);
        const ana = k.at('paper', 0.5);
        k.group({ a: 1 - ana }, () => {
          lake(k, 640, { city: false });
          k.prop('turtle', 1280, 640, 420, { glow: true, talk: k.t > k.cue('talk'), p: k.at('peace', 0.5) });
          k.water(680, { color: LAKE, amp: 5, alpha: 0.7 });
          k.prop('boat', 600, 760, 520, { fill: '#c9a24a' });
          k.char(560, 745, 300, { ...VUA, face: 'calm', pose: k.t > k.cue('talk') ? 'present' : 'stand', shadow: false });
          k.prop('sword', 760, 560, 160, { glow: true, rotate: 0.3, p: k.at('lq', 0.4) });
          T(k, 'SGK Ngữ văn 6 · Nguyễn Đổng Chi', 960, 280, 52, '#1f4a44', k.at('modern', 0.5), { maxWidth: 1400 });
          say(k, 'Bệ hạ hoàn gươm cho Long Quân!', 'talk', [1040, 340, 700, 150], [1330, 560], { size: 50 });
        });
        k.group({ a: ana }, () => {
          k.rect(240, 300, 620, 560, { fill: '#e9e2d0', fillStyle: 'solid', width: 5, seed: 70 });
          k.rect(1060, 300, 620, 560, { fill: '#e2f0e4', fillStyle: 'solid', width: 5, seed: 71 });
          k.text('Bản trung đại', 550, 370, { size: 50, font: 'title', color: '#6b5f55' });
          k.text('Bản hiện đại', 1370, 370, { size: 50, font: 'title', color: '#3f6f2a' });
          k.prop('sword', 550, 600, 200, { rotate: 2.6, alpha: 0.6, p: k.at('old', 0.5) });
          k.text('MẤT GƯƠM', 550, 780, { size: 64, font: 'title', color: '#c0392b', fx: 'pop', p: k.at('old', 0.5) });
          k.text('= điềm suy vi', 550, 470, { size: 40, color: '#6b5f55', weight: 700, fx: 'fade', p: k.at('old', 0.5) });
          k.prop('turtle', 1300, 620, 200, { glow: true, p: k.at('new', 0.5) });
          k.prop('sword', 1470, 580, 160, { glow: true, rotate: 0.5, p: k.at('new', 0.5) });
          k.text('TRẢ GƯƠM', 1370, 780, { size: 64, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('new', 0.5) });
          k.text('= hết giặc, cất vũ khí', 1370, 470, { size: 40, color: '#3f6f2a', weight: 700, fx: 'fade', p: k.at('new', 0.5) });
          k.arrow(880, 580, 1040, 580, { width: 7, p: k.at('new', 0.5) });
          T(k, 'Lê Thời Tân và cộng sự · 2019', 960, 260, 46, '#b5482c', ana, { fx: 'fade' });
          stamp(k, 960, 960, 'LÀM LẠI · ĐỔI KẾT', k.at('joke', 0.5), { w: 620, size: 56 });
        });
      },
    },

    // ---------------- Bí ẩn 3 ----------------
    {
      chapter: 'Bí ẩn 3: Nửa kia của Hồ Gươm',
      say: '{n}Bí ẩn số ba: nửa kia của Hồ Gươm đâu rồi? {names}Hồ này từng mang nhiều tên: Lục Thủy, nghĩa là nước xanh; rồi Tả Vọng, Hữu Vọng. {left}Tả Vọng là phần còn lại ngày nay. {right}Còn Hữu Vọng, thời vua Tự Đức gọi là hồ Thủy Quân, nơi tập trận thủy binh. {fill}Từ năm 1884, chính quyền Pháp cho san lấp hồ ấy, dựng khu phố Tây. {joke}Nên dạo vài con phố phía nam hồ hôm nay, có khi bạn đang đi… trên đáy một cái hồ cũ.',
      sfx: [['drumroll', 'n', 0.3], ['pop', 'names'], ['pop', 'left'], ['pop', 'right'], ['boom', 'fill', 0.4], ['boing', 'joke', 0.5]],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#e9e2c8', fillStyle: 'solid', stroke: 'none', seed: 80 });
        T(k, 'LỤC THỦY = nước xanh', 960, 140, 60, '#1f4a44', k.at('names', 0.5));
        const filled = k.at('fill', 1.4, 'inOut');
        k.ellipse(760, 520, 520, 300, { fill: '#7fb8a8', fillStyle: 'solid', width: 5, seed: 81, p: k.at('names', 0.6) });
        k.ellipse(1260, 720, 520, 260, { fill: '#7fb8a8', fillStyle: 'solid', width: 5, seed: 82, p: k.at('names', 0.6) });
        k.ellipse(1260, 720, 520 * Math.max(0.01, filled), 260 * Math.max(0.01, filled), { fill: '#c9a26a', fillStyle: 'solid', width: 4, seed: 83 });
        for (let i = 0; i < 6; i++) k.prop('stilthouse', 1040 + (i % 3) * 200, 680 + Math.floor(i / 3) * 140, 110, { p: k.at(k.cue('fill', 0.8 + i * 0.1), 0.4) });
        k.prop('thaprua', 760, 520, 120, { p: k.at('left', 0.5) });
        T(k, 'TẢ VỌNG', 640, 400, 70, '#1f4a44', k.at('left', 0.5));
        T(k, 'Hồ Gươm hôm nay', 760, 680, 44, '#3b2f2a', k.at('left', 0.5), { fx: 'fade' });
        T(k, 'HỮU VỌNG', 1360, 560, 70, '#1f4a44', k.at('right', 0.5) * (1 - k.at('fill', 0.3)));
        T(k, 'hồ Thủy Quân', 1360, 650, 44, '#3b2f2a', k.at('right', 0.5) * (1 - k.at('fill', 0.3)), { fx: 'fade' });
        T(k, '1884: SAN LẤP', 1360, 520, 70, '#c0392b', k.at('fill', 0.5));
        stamp(k, 700, 960, 'ĐI TRÊN ĐÁY HỒ', k.at('joke', 0.5), { w: 560, size: 58, color: '#3f6f2a' });
        intro(k, 3, 'Nửa kia của Hồ Gươm đâu rồi?');
        pill(k, 3, k.at(k.cue('n', 2.6), 0.4));
      },
    },
    {
      say: '{also}Tang thương ngẫu lục còn chép một chuyện lạ. {year}Mùa hạ năm 1786, nửa đêm, {red}giữa hồ bỗng hiện lên những vật đỏ ối, toả sáng bốn phía, {fly}bay về bờ nam, rồi biến mất. {storm}Sau đó, sóng gió nổi ầm ầm. {ghost}Người xưa thấy ánh sáng lạ bay trong đêm, là nghĩ ngay đến… ma. {loop}Mà nhắc đến thứ bay trong đêm, dân gian còn một chuyện rợn hơn nhiều: {head}một cái đầu người, tự rời khỏi cổ, bay đi lúc nửa đêm. {next}Ma lai. Tập sau mình sẽ kể.',
      sfx: [['pop', 'also'], ['pop', 'year'], ['sparkle', 'red', 0.5], ['whoosh', 'fly', 0.5], ['boom', 'storm', 0.4], ['wahwah', 'ghost', 0.4], ['drumroll', 'loop', 0.3], ['slideUp', 'head', 0.4], ['boing', 'next', 0.4]],
      draw(k) {
        const ml = k.at('head', 0.6);
        k.group({ a: 1 - ml }, () => {
          lake(k, 600, { sky: 'night', city: false });
          k.prop('thaprua', 960, 640, 180);
          const fl = k.at('fly', 1.6, 'inOut');
          for (let i = 0; i < 4; i++) {
            const x = 960 + (i - 1.5) * 70 + fl * (300 + i * 40), y = 560 - i * 20 - Math.sin(fl * Math.PI) * 120;
            k.circle(x, y, 26, { fill: '#e4572e', fillStyle: 'solid', stroke: 'none', alpha: k.at('red', 0.5) * (1 - k.at(k.cue('fly', 1.6), 0.4)), seed: 90 + i });
            k.circle(x, y, 48, { fill: '#ffb38a', fillStyle: 'solid', stroke: 'none', alpha: 0.3 * k.at('red', 0.5) * (1 - k.at(k.cue('fly', 1.6), 0.4)), seed: 95 + i });
          }
          k.water(660, { color: '#2f5a6a', amp: 6 + 16 * k.at('storm', 0.6), alpha: 0.8 });
          T(k, 'MÙA HẠ 1786 · NỬA ĐÊM', 960, 140, 64, '#f6c344', k.at('year', 0.5));
          T(k, 'Tang thương ngẫu lục', 960, 230, 44, '#fffaf0', k.at('also', 0.5), { fx: 'fade' });
          T(k, 'MA?!', 1500, 420, 110, '#e4572e', k.at('ghost', 0.4));
        });
        k.group({ a: ml }, () => {
          k.backdrop('night', { ground: G });
          k.prop('stilthouse', 420, G, 420);
          k.prop('malai', 1200, k.lerp(700, 460, k.at('head', 1.6)), 360, { bob: 6 });
          T(k, 'MA LAI', 1200, 160, 120, '#e4572e', k.at('next', 0.4));
          stamp(k, 1200, 900, 'TẬP SAU', k.at('next', 0.5), { w: 380, size: 60 });
        });
      },
    },

    // ---------------- Bí ẩn 4 ----------------
    {
      chapter: 'Bí ẩn 4: Cụ rùa thật là con gì?',
      say: '{n}Bí ẩn số bốn: cụ rùa thật là con gì? {real}Giữa Hồ Gươm từng có những cụ rùa sống thật. {but}Nhưng nhìn kỹ, cụ không giống rùa vàng trong tranh chút nào. {shell}Mai không có vảy cứng, mà phủ một lớp da trơn, màu như bùn. {nose}Mõm dài như một cái ống thở. {name}Người Việt gọi loài này là giải, tức rùa mai mềm. {joke}Rùa trong truyện: áo giáp vàng. Cụ rùa ngoài đời: áo da, mũi ống hút.',
      sfx: [['drumroll', 'n', 0.3], ['pop', 'real'], ['scratch', 'but', 0.4], ['pop', 'shell'], ['boing', 'nose', 0.4], ['ding', 'name', 0.4], ['boing', 'joke', 0.5]],
      draw(k) {
        compare(k, k.at('but', 0.5), k.at('real', 0.5));
        k.circle(1520, 520, 70, { stroke: '#e4572e', width: 6, seed: 100, p: k.at('nose', 0.5) });
        T(k, 'mõm ống', 1640, 400, 50, '#e4572e', k.at('nose', 0.5), { fx: 'fade' });
        T(k, 'mai da trơn', 1300, 330, 50, '#3f6f2a', k.at('shell', 0.5), { fx: 'fade' });
        T(k, 'GIẢI', 1360, 200, 110, '#3f6f2a', k.at('name', 0.5));
        stamp(k, 960, 980, 'GIÁP VÀNG vs ÁO DA', k.at('joke', 0.5), { w: 680, size: 56 });
        intro(k, 4, 'Cụ rùa thật là con gì?');
        pill(k, 4, k.at(k.cue('n', 2.6), 0.4));
      },
    },
    {
      say: '{sci}Tên khoa học của nó là Rafetus swinhoei, {cn}còn gọi là giải Thượng Hải, hay rùa Hoàn Kiếm, {big}một trong những loài rùa nước ngọt lớn nhất thế giới. {2000}Năm 2000, giáo sư Hà Đình Đức còn đề xuất cho cụ một cái tên riêng: Rafetus leloii, {ll}theo tên vua Lê Lợi. {most}Dù phần lớn các nhà khoa học vẫn coi nó cùng loài với giải Thượng Hải. {joke}Tức là cụ rùa suýt có họ… Lê.',
      sfx: [['pop', 'sci'], ['pop', 'cn'], ['tada', 'big', 0.4], ['pop', '2000'], ['sparkle', 'll', 0.5], ['bonk', 'most', 0.4], ['boing', 'joke', 0.5]],
      draw(k) {
        k.prop('softshell', 640, 620, 640, { p: k.at('sci', 0.5) });
        T(k, 'Rafetus swinhoei', 640, 220, 80, '#3f6f2a', k.at('sci', 0.5));
        T(k, 'giải Thượng Hải · rùa Hoàn Kiếm', 640, 330, 46, '#3b2f2a', k.at('cn', 0.5), { fx: 'fade', maxWidth: 1000 });
        T(k, 'rùa nước ngọt lớn bậc nhất thế giới', 640, 900, 46, '#6b5f55', k.at('big', 0.5), { fx: 'fade', maxWidth: 1100 });
        k.char(1460, G, 440, { ...SCI, face: k.t > k.cue('most') ? 'smug' : 'happy', pose: k.t > k.cue('most') ? 'shrug' : 'present', p: k.at('2000', 0.5) });
        say(k, 'Rafetus leloii!', '2000', [1200, 160, 480, 130], [1440, 430], { size: 50 });
        T(k, '(theo tên Lê Lợi)', 1440, 340, 40, '#b5482c', k.at('ll', 0.5), { fx: 'fade' });
        k.text('đa số: cùng loài R. swinhoei', 1440, 960, { size: 38, color: '#6b5f55', weight: 700, fx: 'fade', p: k.at('most', 0.5) });
        stamp(k, 640, 560, 'SUÝT HỌ LÊ', k.at('joke', 0.5), { w: 460, size: 64 });
      },
    },
    {
      say: '{y2011}Giờ mình đứng bên bờ hồ, đầu năm 2011. {sick}Cụ rùa nổi lên nhiều hơn hẳn, trên mình có những vết loét. {crowd}Cả Hà Nội lo. {net}Tháng tư năm ấy, hàng trăm người quây lưới, đưa cụ vào một bể chữa trị trên đảo giữa hồ. {scale}Cân lên: một trăm sáu mươi chín ki-lô-gam. {back}Chữa xong, cụ được thả về hồ. {joke}Mình đứng chen trên bờ, điện thoại giơ cao, giống hệt mọi người.',
      sfx: [['pop', 'y2011'], ['pop', 'sick'], ['pop', 'crowd'], ['whoosh', 'net', 0.4], ['drumroll', 'scale', 0.3], ['tada', ['scale', 1.2], 0.5], ['sparkle', 'back', 0.4], ['click', 'joke', 0.5]],
      draw(k) {
        lake(k, 600, { city: false });
        k.prop('thaprua', 1500, 610, 160);
        const caught = k.at('net', 1.2);
        k.prop('softshell', k.lerp(900, 1150, caught), 650, 360, { p: k.at('sick', 0.5) });
        k.water(670, { color: LAKE, amp: 5, alpha: 0.75 });
        k.prop('net', 1150, 640, 360 * Math.max(0.01, caught), { p: caught > 0 ? 1 : 0, alpha: 1 - k.at('back', 0.5) });
        for (let i = 0; i < 7; i++) k.char(120 + i * 120, 1000, 220, { ...DAN(KC[i % 8]), face: k.t > k.cue('back') ? 'happy' : 'sad', pose: i === 3 ? 'point' : 'stand', shadow: false, p: k.at(k.cue('crowd', i * 0.08), 0.4) });
        k.char(960, 1000, 240, { ...ME, face: 'happy', pose: k.t > k.cue('joke') ? 'cheer' : 'stand', shadow: false, p: k.at('y2011', 0.4) });
        k.prop('phone', 1000, 760, 70, { p: k.at('joke', 0.4) });
        T(k, 'HỒ GƯƠM · 2011', 960, 120, 70, '#1f4a44', k.at('y2011', 0.5));
        T(k, '169 kg', 1150, 330, 120, '#e4572e', k.at('scale', 0.5));
      },
    },
    {
      say: '{die}Ngày 19 tháng 1 năm 2016, cụ rùa được phát hiện đã chết. {keep}Xác cụ được làm tiêu bản. {ngoc}Ở đền Ngọc Sơn còn một tiêu bản khác, của một cụ rùa mất năm 1967. {rare}Còn cả loài này? Theo các nhà bảo tồn, sau nhiều năm tìm kiếm, cả thế giới chỉ còn biết vài cá thể, {female}và chưa tìm thấy con cái nào. {link}Vậy rùa thần với cụ rùa có liên quan gì không? {maybe}Con "rùa to như cái lọng" trong Sơn cư tạp thuật, nghe rất giống một con giải khổng lồ như thế. {guess}Nhiều khả năng, chính những con vật có thật nổi lên giữa hồ đã gợi nên con rùa trong truyện.',
      sfx: [['pop', 'die'], ['pop', 'keep'], ['pop', 'ngoc'], ['pop', 'rare'], ['pop', 'female'], ['drumroll', 'link', 0.3], ['sparkle', 'maybe', 0.4], ['ding', 'guess', 0.4]],
      draw(k) {
        const lk = k.at('link', 0.6);
        k.group({ a: 1 - lk }, () => {
          k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#e9e2d0', fillStyle: 'solid', stroke: 'none', seed: 110 });
          T(k, '19/1/2016', 600, 200, 100, '#3b2f2a', k.at('die', 0.5));
          k.prop('softshell', 600, 560, 520, { p: k.at('die', 0.5) });
          k.prop('temple', 1400, 520, 360, { p: k.at('ngoc', 0.5) });
          T(k, 'đền Ngọc Sơn · tiêu bản 1967', 1400, 800, 46, '#3b2f2a', k.at('ngoc', 0.5), { fx: 'fade' });
          T(k, 'tiêu bản', 600, 820, 46, '#6b5f55', k.at('keep', 0.5), { fx: 'fade' });
          stamp(k, 960, 980, 'CHỈ CÒN VÀI CÁ THỂ', k.at('rare', 0.5), { w: 700, size: 56 });
          T(k, '0 con cái được biết', 960, 880, 46, '#c0392b', k.at('female', 0.5), { fx: 'fade' });
        });
        k.group({ a: lk }, () => {
          compare(k, 1, 1, 520, 1400, 520);
          k.arrow(1180, 520, 760, 520, { width: 8, bend: -0.2, p: k.at('maybe', 0.8) });
          T(k, '"to như cái lọng"', 960, 220, 64, '#b5482c', k.at('maybe', 0.5));
          stamp(k, 960, 960, 'NHIỀU KHẢ NĂNG', k.at('guess', 0.5), { w: 560, size: 58, color: '#3f6f2a' });
        });
      },
    },

    // ---------------- Bí ẩn 5 ----------------
    {
      chapter: 'Bí ẩn 5: Vì sao luôn là rùa?',
      say: '{n}Bí ẩn cuối cùng: vì sao truyền thuyết Việt cứ chọn con rùa? {coloa}Ở Cổ Loa, rùa vàng trao vuốt làm lẫy nỏ, mở đầu một cuộc giữ nước. {hg}Ở Hồ Gươm, rùa vàng nhận lại thanh gươm, khép lại một cuộc chiến. {lq}Và trong bản kể hiện đại, rùa là sứ giả của Long Quân, người cha Rồng ở tập Con Rồng Cháu Tiên. {joke}Rùa đưa vũ khí, rùa thu vũ khí: giống ông thủ kho của cả dân tộc.',
      sfx: [['drumroll', 'n', 0.3], ['sparkle', 'coloa', 0.4], ['sparkle', 'hg', 0.4], ['pop', 'lq'], ['boing', 'joke', 0.5]],
      draw(k) {
        k.rect(300, 280, 560, 520, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 120, p: k.at('coloa', 0.4) > 0 ? 1 : 0 });
        k.prop('turtle', 520, 560, 300, { glow: true, p: k.at('coloa', 0.5) });
        k.prop('crossbow', 700, 420, 170, { p: k.at('coloa', 0.5) });
        k.text('CỔ LOA: trao vũ khí', 580, 760, { size: 40, font: 'title', color: '#b5482c', fx: 'fade', p: k.at('coloa', 0.5) });
        k.rect(1060, 280, 560, 520, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 121, p: k.at('hg', 0.4) > 0 ? 1 : 0 });
        k.prop('turtle', 1280, 560, 300, { glow: true, talk: true, p: k.at('hg', 0.5) });
        k.prop('sword', 1470, 440, 160, { glow: true, rotate: 0.4, p: k.at('hg', 0.5) });
        k.text('HỒ GƯƠM: thu vũ khí', 1340, 760, { size: 40, font: 'title', color: '#3f6f2a', fx: 'fade', p: k.at('hg', 0.5) });
        k.prop('dragon', 960, 120, 160, { p: k.at('lq', 0.5) });
        T(k, 'sứ giả Long Quân', 960, 230, 44, '#1f7a8c', k.at('lq', 0.5), { fx: 'fade' });
        stamp(k, 960, 960, 'THỦ KHO DÂN TỘC', k.at('joke', 0.5), { w: 620, size: 60 });
        intro(k, 5, 'Vì sao luôn là con rùa?');
        pill(k, 5, k.at(k.cue('n', 2.6), 0.4));
      },
    },
    {
      say: '{long}Rùa sống rất lâu, nên người xưa coi rùa là biểu tượng của sự bền vững. {vm}Ở Văn Miếu, tám mươi hai tấm bia tiến sĩ đều đặt trên lưng rùa đá. {carry}Rùa cõng tên người tài qua mấy trăm năm. {mean}Nên con rùa trong truyện không chỉ là con vật: nó là người giữ ký ức. {give}Giữ thanh gươm khi cần đánh giặc, {take}và giữ lại nó khi đất nước cần hoà bình.',
      sfx: [['pop', 'long'], ['pop', 'vm'], ['sparkle', 'carry', 0.4], ['ding', 'mean', 0.4], ['pop', 'give'], ['tada', 'take', 0.4]],
      draw(k) {
        k.backdrop('day', { ground: G });
        for (let i = 0; i < 4; i++) {
          const x = 300 + i * 330;
          k.prop('turtle', x, G - 50, 260, { fill: '#9a9a9a', p: k.at(k.cue('vm', i * 0.15), 0.4) });
          k.rect(x - 60, G - 330, 120, 230, { fill: '#c9c4b8', fillStyle: 'solid', width: 4, seed: 130 + i, p: k.at(k.cue('vm', i * 0.15), 0.4) > 0 ? 1 : 0 });
          for (let j = 0; j < 4; j++) k.line(x - 36, G - 290 + j * 40, x + 36, G - 290 + j * 40, { width: 3, seed: 140 + i * 4 + j, p: k.at(k.cue('carry', i * 0.1), 0.4) });
        }
        T(k, 'VĂN MIẾU · 82 bia tiến sĩ', 800, 160, 64, '#b5482c', k.at('vm', 0.5));
        T(k, 'trên lưng rùa đá', 800, 260, 48, '#3b2f2a', k.at('vm', 0.5), { fx: 'fade' });
        k.prop('sword', 1680, 540, 260, { glow: true, p: k.at('give', 0.5) });
        T(k, 'NGƯỜI GIỮ KÝ ỨC', 1600, 300, 56, '#3f6f2a', k.at('mean', 0.5), { maxWidth: 560 });
      },
    },

    // ---------------- Kết ----------------
    {
      chapter: 'Vậy rùa thần có thật không?',
      say: '{q}Vậy rùa thần Hồ Gươm có thật không? {no}Một con rùa vàng biết nói, nhận gươm từ tay vua, thì cuốn sách thời Lê sơ không hề chép. {yes}Nhưng con rùa thật thì có, từng sống ngay giữa hồ. {true}Và chuyện trả gươm, theo một nghĩa khác, là có thật: {pick}người Việt chọn kể về chiến thắng bằng cảnh… cất vũ khí đi. {echo}Năm xưa, rùa vàng nhắc vua: hoàn gươm cho Long Quân. {now}Hôm nay gươm đã trả rồi. {us}Đến lượt chúng ta giữ lấy con rùa.',
      sfx: [['drumroll', 'q', 0.3], ['bonk', 'no', 0.4], ['ding', 'yes', 0.4], ['pop', 'true'], ['sparkle', 'pick', 0.4], ['pop', 'echo'], ['pop', 'now'], ['tada', 'us', 0.5]],
      transition: 'fade',
      draw(k) {
        lake(k, 620, { sky: 'sunset' });
        k.prop('thaprua', 1300, 640, 200);
        k.prop('softshell', 760, 680, 380, { p: k.at('yes', 0.5) });
        k.water(700, { color: LAKE, amp: 5, alpha: 0.75 });
        k.prop('turtle', 1500, 360, 300, { glow: true, alpha: 0.6 * (1 - k.at('us', 0.6)), p: k.at('q', 0.5) });
        k.prop('sword', 1680, 300, 140, { glow: true, rotate: 0.4, alpha: 0.6 * (1 - k.at('now', 0.6)), p: k.at('q', 0.5) });
        T(k, 'Rùa vàng biết nói: ✘ sách thời Lê sơ', 600, 140, 50, '#c0392b', k.at('no', 0.5) * (1 - k.at('echo', 0.3)), { maxWidth: 1100 });
        T(k, 'Cụ rùa thật: ✔', 600, 230, 50, '#3f6f2a', k.at('yes', 0.5) * (1 - k.at('echo', 0.3)));
        T(k, 'Hoàn gươm cho Long Quân', 960, 160, 70, '#b5482c', k.at('echo', 0.5) * (1 - k.at('us', 0.3)));
        T(k, 'GƯƠM ĐÃ TRẢ', 960, 160, 90, '#e4572e', k.at('now', 0.5) * (1 - k.at('us', 0.3)));
        stamp(k, 960, 330, 'GIỮ LẤY CON RÙA', k.at('us', 0.5), { w: 640, size: 64, color: '#3f6f2a' });
      },
    },
    {
      say: '{sum}Tóm lại: {a}gươm vớt từ lưới chài, {b}rùa đến sau ba trăm năm, {c}hồ từng có hai nửa, {d}cụ rùa là một con giải, {e}và con rùa là người giữ ký ức. {red}À, nhớ những đốm sáng đỏ bay trên hồ năm 1786 nhé. Tập sau cần đấy.',
      sfx: [['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd'], ['pop', 'e'], ['sparkle', 'red', 0.4]],
      draw(k) {
        const rows = [['a', 'Gươm: vớt từ lưới chài (1431)'], ['b', 'Con rùa: thêm vào ~300 năm sau'], ['c', 'Hồ Gươm từng có 2 nửa'], ['d', 'Cụ rùa thật: con giải mai mềm'], ['e', 'Rùa = người giữ ký ức']];
        rows.forEach(([c, t], i) => {
          k.icon('check', 360, 220 + i * 130, 80, { p: k.at(c, 0.4) });
          k.text(t, 440, 230 + i * 130, { size: 52, font: 'title', align: 'left', color: '#3b2f2a', fx: 'fade', p: k.at(c, 0.5) });
        });
        k.circle(1600, 880, 30, { fill: '#e4572e', fillStyle: 'solid', stroke: 'none', seed: 150, alpha: k.at('red', 0.5) });
        k.text('1786?', 1600, 970, { size: 44, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('red', 0.5) });
      },
    },
    nextEpisodeScene({
      say: '{next}Tập sau: Ma lai. {why}Một cái đầu người tự rời khỏi cổ, bay đi lúc nửa đêm. {more}Vì sao người xưa tin có ma lai, và vì sao có những người bị cả làng đồn là ma lai? Hẹn bạn ở tập sau.',
      title: 'Ma lai là gì? Vì sao người xưa tin có ma lai',
      hook: 'Cái đầu bay trong đêm, và những người bị cả làng đồn',
      when: 'Series Sinh vật dân gian',
      art: (k) => {
        k.prop('malai', 0, 20, 360, { bob: 5 });
      },
      sfx: [['slideUp', 'why', 0.4]],
    }),
    subscribeScene({
      say: 'Còn bạn, {q}theo bạn, vì sao câu chuyện lại đổi từ mất gươm thành trả gươm? Viết giả thuyết của bạn vào phần bình luận nhé, mình đọc hết. {sub}Và bấm đăng ký, bật chuông, để không lỡ tập sau về ma lai!',
      question: 'Vì sao "mất gươm" thành "trả gươm"?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
