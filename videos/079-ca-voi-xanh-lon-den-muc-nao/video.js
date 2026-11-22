// Hạt Bụi Xanh · tập 1 — Cá Voi Xanh Lớn Đến Mức Nào? (kịch bản duyệt 11/11/2026: kich-ban.md)
// Fact check (nguồn đầy đủ trong kich-ban.md):
//   NOAA Fisheries – Blue whale: dài tới ~33 m, nặng tới ~150 t, nghe xa ~1.600 km, cấm săn 1966, số lượng đang tăng.
//   Guinness: con nặng nhất ~190 t (1947, Nam Cực); lưỡi nặng ~ một con voi. Britannica/Guinness: con mới sinh ~7 m, ~2,5 t, +90 kg/ngày.
//   CBC/ROM: tim >180 kg (Trout River, Newfoundland, 2014). Goldbogen et al. PNAS 2019: nhịp tim lặn 4–8, thấp nhất 2; mặt nước 25–37.
//   Stanford (Goldbogen): mỗi cú đớp nuốt khối nước lớn hơn cơ thể. Savoca et al. Nature 2021: ~16 t krill/ngày (ĐB Thái Bình Dương).
//   SSB IWS / Bảo tàng South Georgia: 29.649–30.406 cá voi xanh bị giết mùa 1930/31. Flinders Univ.: Nam Cực 239.000 → ~360.
//   Goldbogen et al. Science 2019: lọc mồi càng lớn càng hiệu quả, giới hạn bởi lượng mồi theo mùa (~300 con, >50.000 cú đớp).
//   Bianucci et al. Nature 2023 (Perucetus 85–340 t) → Motani & Pyenson PeerJ 2024 (60–114 t).
//   Báo Nhân Dân: cá voi Bryde ở Đề Gi (Bình Định); Bryde dài tới ~15 m. Argentinosaurus ~70 t: ước tính phổ biến (nói "theo các ước tính").
import { P, fill, cream, space, ocean, surface, earth, whale, human, bus, trex, sauropod, scaleBar, bigNum, label, src, chip, krill,
  motorbike, elephant, fishingBoat, spout, heart, eCar, balance, pitch, ecg, dotGrid, vnRoute, diver, months, energyChart, fossil,
  blackHole, baleen, krillOne, chapterTag } from '/channel/hat-bui-xanh.js';
import * as thumbs from '/videos/079-ca-voi-xanh-lon-den-muc-nao/thumbs.js';

const W = 1920, H = 1080;
const BRYDE = '#4B5560';
const lerp = (a, b, p) => a + (b - a) * p;
// Nước phủ lên phần thân dưới mặt biển (để con vật "nổi" lên).
function waterOver(k, y, a = 0.72) { k.ctx.fillStyle = `rgba(14,74,98,${a})`; k.ctx.fillRect(0, y, W, H - y); }
function dawnSurface(k, y) {
  surface(k, y, { sky: '#F4B88A' });
  k.dot(1500, y - 40, 70, '#FFE2A8', 0.9);
}

export default {
  meta: {
    title: 'Cá Voi Xanh Lớn Đến Mức Nào? (So Với Landmark 81, Xe Buýt, Khủng Long)',
    description: 'Ngư dân Bình Định từng thấy một con cá voi dài 14 mét — và nó chỉ dài bằng một nửa cá voi xanh. Vì sao sau 4 tỷ năm, chưa từng có gì lớn hơn nó?\n\nCá voi xanh lớn đến mức nào, trái tim 180 ký đập chậm ra sao, nó ăn bao nhiêu mỗi ngày, và điều gì thật sự giới hạn kích thước của sinh vật lớn nhất từng sống trên Trái Đất. Mọi con số đều có nguồn khoa học bên dưới.',
    footer: '📚 Nguồn tham khảo\n• NOAA Fisheries – Blue whale\n• Goldbogen et al. (2019), PNAS – nhịp tim cá voi xanh\n• Goldbogen et al. (2019), Science – Why whales are big but not bigger\n• Savoca et al. (2021), Nature – lượng mồi của cá voi tấm sừng\n• Motani & Pyenson (2024), PeerJ – Perucetus\n• Royal Ontario Museum – tim cá voi xanh\n• Đại học Flinders – cá voi xanh Nam Cực\n• International Whaling Statistics (SSB)\n\n🌍 Hạt Bụi Xanh — khoa học về những thứ khổng lồ, cổ xưa và đáng sợ trên hạt bụi xanh của chúng ta. Đăng ký để không lỡ tập sau.',
    tags: ['cá voi xanh', 'cá voi xanh lớn như thế nào', 'cá voi xanh lớn cỡ nào', 'động vật lớn nhất thế giới', 'sinh vật lớn nhất trái đất', 'blue whale', 'cá voi', 'khoa học', 'đại dương', 'so sánh kích thước', 'tim cá voi xanh', 'krill', 'perucetus', 'khủng long', 'hạt bụi xanh', 'khám phá'],
    hashtags: ['cavoixanh', 'khoahoc', 'daiduong', 'hatbuixanh'],
    categoryId: '28', lang: 'vi',
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.35, tail: 0.8, pause: 0.35, transition: 'cut', camera: 0.04,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
  },
  thumbnail: thumbs.a,
  scenes: [
    // ================= MỞ ĐẦU =================
    {
      chapter: 'Mở đầu: con cá voi ở Đề Gi',
      say: '{a}Biển Đề Gi, Bình Định. Sáng sớm. {b}Ngư dân thấy một cái lưng đen nhô lên cạnh mạn thuyền. {c}Rồi một cột nước phụt lên trời. {d}Một con cá voi. Dài khoảng mười bốn mét, dài hơn cả chiếc thuyền.',
      sfx: [['whoosh', 'c', 0.3]],
      draw(k) {
        const y = 600;
        dawnSurface(k, y);
        fishingBoat(k, 1120, y, 520);
        const rise = k.at('b', 2.2, 'inOut');
        whale(k, 760, y + 70 - 50 * rise, 700, { color: BRYDE, swim: 0.3 });
        waterOver(k, y);
        spout(k, 1080, y - 10, 260, k.at('c', 2.5, 'out'));
        label(k, 'BIỂN ĐỀ GI · BÌNH ĐỊNH', 60, 70, 'a', { size: 34, align: 'left' });
        scaleBar(k, 410, 1110, y + 150, '≈ 14 MÉT', { p: k.at('d', 1.2) });
        chip(k, 'MÔ PHỎNG', W - 60, 70, { align: 'right', p: k.at('a', 0.6) });
      },
    },
    {
      say: '{a}Người ta gọi nó là khổng lồ. Và nó là khổng lồ thật. {b}Nhưng nó chỉ dài bằng một nửa {c}con vật mà chúng ta sắp gặp.',
      sfx: [['slideDown', 'b', 0.3]],
      draw(k) {
        ocean(k, { depth: 0.35 });
        const z = lerp(1, 0.48, k.at('b', 2, 'inOut'));
        k.group({ x: W / 2, y: 470, s: z }, () => {
          whale(k, 0, 0, 700, { color: BRYDE, swim: 0.4 });
          scaleBar(k, -350, 350, 140, '14 m', { p: 1, color: P.cream });
        });
        const c = k.at('b', 3, 'out');
        whale(k, lerp(W + 800, W / 2, c), 800, 1400 * 0.96, { sil: true, swim: 0.2, color: '#2F5D80', alpha: 0.9 });
        label(k, '× 2', W / 2, 1000, 'c', { size: 70, color: P.gold });
      },
    },
    {
      say: '{a}Cá voi xanh. Sinh vật lớn nhất từng sống trên Trái Đất. Lớn hơn mọi con khủng long từng có. {b}Nó lớn đến mức nào? {c}Và một câu hỏi lạ hơn: sau gần bốn tỷ năm sự sống, vì sao chưa từng có thứ gì lớn hơn nó? {d}Câu trả lời nằm ở một sinh vật nhỏ hơn ngón tay của bạn.',
      sfx: [['sparkle', 'd', 0.25]],
      draw(k) {
        space(k);
        const z = lerp(1, 1.6, k.at('b', 6, 'inOut'));
        k.group({ x: W / 2, y: H / 2, s: z }, () => earth(k, 0, 0, 300));
        bigNum(k, 'CÁ VOI XANH', W / 2, 150, 'a', { size: 110 });
        bigNum(k, 'VÌ SAO KHÔNG LỚN HƠN?', W / 2, 920, 'c', { size: 96, color: P.gold });
        const d = k.at('d', 0.6) * (1 - k.at(k.cue('d', 3.2), 0.8));
        k.dot(W / 2, H / 2, 10, P.orange, d);
        k.dot(W / 2, H / 2, 26, P.orange, d * 0.25);
      },
    },

    // ================= CHƯƠNG 1: THANG ĐO =================
    {
      chapter: 'Thang đo: 30 mét là bao lớn?',
      say: '{a}Hãy bắt đầu từ bạn. {b}Một người trưởng thành cao khoảng một mét bảy.',
      draw(k) {
        cream(k);
        chapterTag(k, 'Chương 1 · Thang đo', true);
        const s = 300; // px/m
        k.ctx.fillStyle = 'rgba(14,26,43,0.08)'; k.ctx.fillRect(0, 900, W, 6);
        human(k, W / 2, 900, 1.7 * s * k.at('a', 0.8, 'back'), { color: P.ink, stroke: false });
        scaleBar(k, W / 2 + 160, W / 2 + 160, 900, '', { p: 0 });
        label(k, '1,7 m', W / 2 + 200, 900 - 1.7 * s / 2, 'b', { size: 56, color: P.ink, outline: P.cream, align: 'left' });
      },
    },
    {
      say: '{a}Chiếc xe máy bạn đi mỗi ngày dài chưa tới hai mét. {b}Một chiếc xe buýt thành phố: mười hai mét.',
      sfx: [['whoosh', 'b', 0.25]],
      draw(k) {
        cream(k);
        chapterTag(k, 'Chương 1 · Thang đo', true);
        const s = lerp(220, 90, k.at('b', 1.5, 'inOut')), y = 900;
        k.ctx.fillStyle = 'rgba(14,26,43,0.08)'; k.ctx.fillRect(0, y, W, 6);
        human(k, 200, y, 1.7 * s, { color: P.ink, stroke: false });
        motorbike(k, 300, y, 1.9 * s * k.at('a', 0.6, 'back'));
        bus(k, lerp(W + 100, 560, k.at('b', 1.2, 'out')), y, 12 * s);
        label(k, 'xe máy ~1,9 m', 300 + 0.95 * s, y + 60, 'a', { size: 38, color: P.ink, outline: P.cream });
        label(k, 'xe buýt 12 m', 560 + 6 * s, y + 60, k.cue('b', 0.8), { size: 38, color: P.ink, outline: P.cream });
      },
    },
    {
      say: '{a}Một con khủng long bạo chúa: khoảng mười hai, mười ba mét từ mõm đến đuôi. {b}Bằng chiếc xe buýt.',
      draw(k) {
        cream(k);
        chapterTag(k, 'Chương 1 · Thang đo', true);
        const s = 90, y = 900;
        k.ctx.fillStyle = 'rgba(14,26,43,0.08)'; k.ctx.fillRect(0, y, W, 6);
        human(k, 200, y, 1.7 * s, { color: P.ink, stroke: false });
        bus(k, 560, y, 12 * s, { alpha: 0.35 });
        trex(k, 560 + 900 * (1 - k.at('a', 1.2, 'out')), y, 12.5 * s, { alpha: k.at('a', 0.6) });
        scaleBar(k, 560, 560 + 12.5 * s, y + 70, '', { p: k.at('b', 0.8), color: P.red });
        label(k, 'T. rex ~12–13 m', 560 + 6 * s, 160, 'a', { size: 50, color: P.ink, outline: P.cream });
        label(k, '= 1 xe buýt', 560 + 6 * s, 230, 'b', { size: 44, color: P.red, outline: P.cream });
      },
    },
    {
      say: '{a}Và bây giờ là cá voi xanh. {b}Con dài nhất từng được đo đáng tin cậy: gần ba mươi mét. {c}Gần ba chiếc xe buýt nối đuôi nhau.',
      sfx: [['whoosh', 'a', 0.3], ['boom', 'b', 0.2]],
      draw(k) {
        ocean(k, { depth: 0.3 });
        chapterTag(k, 'Chương 1 · Thang đo');
        const s = lerp(110, 56, k.at('a', 2.2, 'inOut')), y = 900;
        human(k, 90, y, 1.7 * s, { color: P.gold, stroke: false });
        for (let i = 0; i < 3; i++) bus(k, 140 + i * 12.2 * s, y, 12 * s, { alpha: k.at(k.cue('c', i * 0.4), 0.4) });
        const wx = lerp(W + 1000, 140 + 15 * s, k.at('a', 2.4, 'out'));
        whale(k, wx, y - 330, 30 * s, { swim: 0.5 });
        scaleBar(k, 140, 140 + 30 * s, y + 60, '≈ 30 MÉT', { p: k.at('b', 1.4), above: -66 });
      },
    },
    {
      say: '{a}Đây không phải hình vẽ phóng đại. {b}Đây là một con cá voi xanh thật, chụp từ trên cao, từ máy bay khảo sát. {c}Phần thân sáng dưới mặt nước kia dài gần bằng ba chiếc xe buýt.',
      sfx: [['click', 'a', 0.3]],
      draw(k) {
        k.photo('ca-voi-tu-tren-cao', 0, 0, W, H, { zoom: [1.02, 1.14], pan: [[0.45, 0.55], [0.55, 0.6]], credit: 'NOAA Fisheries · public domain' });
        chip(k, 'ẢNH THẬT', 60, 70, { bg: P.gold, p: k.at('a', 0.5) });
        k.arrow(1450, 260, 1180, 470, { stroke: P.gold, width: 8, p: k.at('c', 0.8), seed: 81 });
      },
    },
    {
      say: '{a}Ba mươi mét nghe vẫn còn trừu tượng. Vậy hãy đặt nó lên một sân bóng. {b}Một sân bóng đá dài khoảng một trăm mét. {c}Ba con cá voi xanh nằm nối nhau là gần kín chiều dài sân.',
      draw(k) {
        fill(k, '#24432B');
        chapterTag(k, 'Chương 1 · Thang đo');
        const w = 1380, s = w / 105;
        pitch(k, W / 2, H / 2 + 30, w);
        for (let i = 0; i < 3; i++) {
          const p = k.at(k.cue('c', i * 0.6), 0.8, 'out');
          whale(k, W / 2 - w / 2 + (i + 0.5) * 30.5 * s + 70, H / 2 + 30, 30 * s, { sil: true, color: '#2F6F99', swim: 0, alpha: p });
        }
        label(k, '~105 m', W / 2, H / 2 + 30 - w * 0.325 - 40, 'b', { size: 44 });
      },
    },
    {
      say: '{a}Nhưng chiều dài chưa phải điều đáng sợ nhất. {b}Có những con khủng long cổ dài, như Argentinosaurus, cũng dài ba mươi mét, thậm chí hơn.',
      draw(k) {
        cream(k);
        chapterTag(k, 'Chương 1 · Thang đo', true);
        const s = 40, x0 = 160;
        k.ctx.fillStyle = 'rgba(14,26,43,0.08)'; k.ctx.fillRect(0, 660, W, 5);
        sauropod(k, x0 + 1100 * (1 - k.at('b', 1.2, 'out')), 660, 32 * s, { alpha: k.at('b', 0.6) });
        whale(k, x0 + 15 * s, 860, 30 * s, { sil: true, color: '#5B7A99', swim: 0 });
        scaleBar(k, x0, x0 + 30 * s, 990, '30 m', { p: 1, color: P.ink, above: 40 });
        bigNum(k, 'NHƯNG…', 520, 170, 'a', { size: 110, color: P.red, outline: P.cream });
        label(k, 'Argentinosaurus ~30–35 m', 520, 290, 'b', { size: 40, color: P.ink, outline: P.cream });
      },
    },
    {
      say: '{a}Thứ làm cá voi xanh trở thành vô địch là cân nặng. {b}Theo NOAA, cơ quan Đại dương và Khí quyển Hoa Kỳ, một con cá voi xanh trưởng thành có thể nặng tới khoảng một trăm năm mươi tấn. {c}Con nặng nhất từng được cân, một con cái bắt ở Nam Cực năm 1947, nặng khoảng {d}một trăm chín mươi tấn.',
      sfx: [['boom', 'd', 0.3]],
      draw(k) {
        fill(k, P.space);
        chapterTag(k, 'Chương 1 · Thang đo');
        const pans = balance(k, W / 2, 980, 1100, k.at('a', 1.4, 'back') * -0.8);
        whale(k, pans.left[0], pans.left[1] - 60, 520, { swim: 0 });
        bigNum(k, '~150 TẤN', W / 2, 170, 'b', { size: 110, color: P.cream, p: k.at('b', 0.5) * (1 - k.at('d', 0.3)) });
        bigNum(k, '190 TẤN', W / 2, 170, 'd', { size: 150, color: P.gold, p: k.at('d', 0.5) });
        src(k, 'Nguồn: NOAA Fisheries · Guinness World Records', { p: k.at('b', 0.6) });
      },
    },
    {
      say: '{a}Để cân bằng một trăm chín mươi tấn, bạn cần khoảng ba mươi con voi châu Phi. {b}Hay gần hai nghìn chiếc xe máy. {c}Còn con khủng long cổ dài kia, theo các ước tính phổ biến, chỉ nặng khoảng bảy mươi tấn. {d}Chưa tới một nửa.',
      draw(k) {
        fill(k, P.space);
        chapterTag(k, 'Chương 1 · Thang đo');
        const ea = k.at('a', 1.5), mb = k.at('b', 1.5), sp = k.at('c', 1.2);
        // trái: cá voi; phải: lần lượt voi → xe máy → khủng long
        const tilt = -0.8 + 0.8 * ea * (1 - mb) + 0.8 * mb * (1 - sp) + sp * -0.45;
        const pans = balance(k, W / 2, 980, 1100, tilt);
        whale(k, pans.left[0], pans.left[1] - 60, 520, { swim: 0 });
        const [rx, ry] = pans.right;
        if (sp <= 0) {
          for (let i = 0; i < 30; i++) elephant(k, rx - 220 + (i % 10) * 46, ry - 20 - Math.floor(i / 10) * 44, 60, { alpha: ea * (1 - mb), lw: 1.5 });
          for (let i = 0; i < 60; i++) motorbike(k, rx - 230 + (i % 15) * 31, ry - 2 - Math.floor(i / 15) * 24, 34, { alpha: mb, lw: 1 });
        }
        sauropod(k, rx - 200, ry - 4, 400, { alpha: sp });
        label(k, ea > 0 && mb <= 0 ? '≈ 30 con voi châu Phi' : sp <= 0 ? '≈ 2.000 xe máy' : 'Argentinosaurus ≈ 70 tấn', rx, 140, 'a', { size: 50, color: P.gold });
        bigNum(k, '< 1/2', W / 2 + 60, 240, 'd', { size: 110, color: P.red });
      },
    },
    {
      say: '{a}Nói cách khác, trong toàn bộ lịch sử Trái Đất mà chúng ta biết, chưa có con vật nào nặng hơn nó. {b}Và nó đang sống. Ngay bây giờ. Trong cùng những đại dương bao quanh chúng ta.',
      transition: 'fade',
      draw(k) {
        space(k);
        const z = lerp(0.6, 1.1, k.at('a', 9, 'inOut'));
        k.group({ x: W / 2, y: H / 2, s: z }, () => earth(k, 0, 0, 360, { spin: 0.04 }));
        label(k, 'ĐANG SỐNG. NGAY BÂY GIỜ.', W / 2, 950, 'b', { size: 60 });
      },
    },

    // ================= CHƯƠNG 2: BÊN TRONG =================
    {
      chapter: 'Trái tim 180 ký đập chậm cỡ nào?',
      say: '{a}Năm 2014, ở Newfoundland, Canada, một con cá voi xanh chết trôi dạt vào bờ. {b}Các nhà khoa học của Bảo tàng Hoàng gia Ontario quyết định làm một việc chưa ai từng làm: {c}lấy nguyên trái tim của nó ra, và bảo quản lại.',
      transition: 'fade',
      draw(k) {
        surface(k, 560, { sky: '#B9C9D6' });
        chapterTag(k, 'Chương 2 · Bên trong', true);
        k.ctx.fillStyle = '#5E6B5A'; k.ctx.beginPath(); k.ctx.moveTo(0, 560); k.ctx.lineTo(0, 420); k.ctx.lineTo(380, 380); k.ctx.lineTo(620, 470); k.ctx.lineTo(900, 560); k.ctx.closePath(); k.ctx.fill();
        whale(k, 1150, 600, 1000, { swim: 0, alpha: 0.95 });
        label(k, '2014 · NEWFOUNDLAND, CANADA', 60, 120, 'a', { size: 40, align: 'left' });
        heart(k, 1500, 260, 220 * k.at('c', 1, 'back'), { beat: 0 });
      },
    },
    {
      say: '{a}Trái tim ấy nặng hơn một trăm tám mươi ký. {b}Nó to cỡ một chiếc xe điện chở khách quanh phố cổ.',
      sfx: [['boom', 'a', 0.25]],
      draw(k) {
        fill(k, '#1A1420');
        chapterTag(k, 'Chương 2 · Bên trong');
        heart(k, 640, 560, 520, { beat: 0.5 + 0.5 * Math.sin(k.t * 3) });
        eCar(k, 1080, 860, 700 * k.at('b', 1, 'back'));
        bigNum(k, '180 KG', 640, 180, 'a', { size: 130, color: P.red, outline: '#1A1420' });
        src(k, 'Royal Ontario Museum · CBC News');
      },
    },
    {
      say: '{a}Nhưng điều kỳ lạ nhất về trái tim này không phải kích thước. {b}Mà là nhịp đập.',
      draw(k) {
        fill(k, '#081218');
        chapterTag(k, 'Chương 2 · Bên trong');
        k.ctx.strokeStyle = 'rgba(91,227,138,0.6)'; k.ctx.lineWidth = 5; k.ctx.beginPath(); k.ctx.moveTo(200, H / 2); k.ctx.lineTo(1720, H / 2); k.ctx.stroke();
        label(k, 'NHỊP ĐẬP', W / 2, 330, 'b', { size: 80, color: '#5BE38A', outline: '#081218' });
      },
    },
    {
      say: '{a}Năm 2019, nhóm của nhà sinh học Jeremy Goldbogen, Đại học Stanford, làm một việc tưởng như không thể: {b}gắn máy đo nhịp tim lên một con cá voi xanh đang sống, bằng giác hút, ngoài khơi California.',
      draw(k) {
        ocean(k, { depth: 0.25 });
        chapterTag(k, 'Chương 2 · Bên trong');
        whale(k, W / 2, 600, 1500, { swim: 0.6 });
        const p = k.at('b', 0.8, 'back');
        k.dot(W / 2 + 120, 600 - 1500 / 1030 * 62 + 4, 16 * p, '#F5F1E6');
        k.dot(W / 2 + 120, 600 - 1500 / 1030 * 62 + 4, 7 * p, Math.sin(k.t * 6) > 0 ? P.red : '#5BE38A');
        label(k, 'STANFORD · 2019', 60, 120, 'a', { size: 40, align: 'left' });
        src(k, 'Goldbogen et al., PNAS 2019');
      },
    },
    {
      say: '{a}Khi nó lặn sâu để săn mồi, tim nó chậm lại. Bốn đến tám nhịp mỗi phút. {b}Có lúc, chỉ còn hai nhịp. {c}Hai nhịp một phút. {d}Tim bạn, lúc ngồi yên xem video này, đập khoảng bảy mươi lần.',
      sfx: [['click', 'b', 0.3]],
      draw(k) {
        fill(k, '#081218');
        chapterTag(k, 'Chương 2 · Bên trong');
        ecg(k, 160, 380, 1600, 120, k.t < k.cue('b') ? 6 : 2, { label: 'CÁ VOI XANH (đang lặn)', speed: 260 });
        ecg(k, 160, 790, 1600, 90, 70, { label: 'BẠN', color: '#FF9B5E', p: k.at('d', 0.6), speed: 260 });
        bigNum(k, '2 NHỊP / PHÚT', W / 2, 560, 'c', { size: 100, color: '#5BE38A', outline: '#081218' });
      },
    },
    {
      say: '{a}Rồi khi nó trồi lên mặt nước để thở, trái tim ấy tăng tốc lên hơn ba mươi nhịp mỗi phút, gần chạm giới hạn mà một trái tim cỡ đó có thể chịu được. {b}Các nhà khoa học cho rằng chính giới hạn này là một trong những lý do cá voi không thể lớn thêm nữa. {c}Hãy nhớ điều đó. Chúng ta sẽ quay lại.',
      sfx: [['whoosh', 'a', 0.25]],
      draw(k) {
        const y = 520;
        surface(k, y, { sky: '#9CC9E0' });
        chapterTag(k, 'Chương 2 · Bên trong', true);
        whale(k, 900, y + 40, 1100, { swim: 0.2 });
        waterOver(k, y, 0.5);
        spout(k, 1300, y, 300, k.at('a', 2.5));
        k.ctx.fillStyle = 'rgba(8,18,24,0.75)'; k.ctx.fillRect(0, 760, W, 320);
        ecg(k, 160, 900, 1600, 80, 34, { speed: 260 });
        k.ctx.strokeStyle = P.red; k.ctx.lineWidth = 4; k.ctx.setLineDash([16, 12]); k.ctx.beginPath(); k.ctx.moveTo(160, 805); k.ctx.lineTo(1760, 805); k.ctx.stroke(); k.ctx.setLineDash([]);
        label(k, 'GIỚI HẠN', 1760, 790, 'b', { size: 34, color: P.red, align: 'right' });
        bigNum(k, '?', W - 120, 160, 'c', { size: 140, color: P.gold });
      },
    },
    {
      say: '{a}Cái lưỡi của nó nặng vài tấn. {b}Theo Sách Kỷ lục Guinness, nặng ngang một con voi.',
      draw(k) {
        fill(k, P.space);
        chapterTag(k, 'Chương 2 · Bên trong');
        const pans = balance(k, W / 2, 980, 1000, -0.3 * (1 - k.at('b', 1.5, 'out')));
        const [lx, ly] = pans.left, [rx, ry] = pans.right;
        k.ctx.fillStyle = '#E58A9A'; k.ctx.strokeStyle = P.ink; k.ctx.lineWidth = 3;
        k.ctx.beginPath(); k.ctx.ellipse(lx, ly - 50, 150, 50, 0, 0, Math.PI * 2); k.ctx.fill(); k.ctx.stroke();
        elephant(k, rx - 120, ry, 240, { alpha: k.at('b', 0.6) });
        label(k, 'LƯỠI', lx, ly - 150, 'a', { size: 46 });
        label(k, '= 1 CON VOI', rx, ry - 230, 'b', { size: 46, color: P.gold });
        src(k, 'Guinness World Records');
      },
    },
    {
      say: '{a}Một con cá voi xanh mới sinh đã dài khoảng bảy mét và nặng chừng hai tấn rưỡi. {b}Trong những tháng đầu đời, chỉ nhờ sữa mẹ, mỗi ngày nó nặng thêm tới chín mươi ký. {c}Mỗi ngày, thêm một người trưởng thành.',
      draw(k) {
        ocean(k, { depth: 0.2 });
        chapterTag(k, 'Chương 2 · Bên trong');
        whale(k, 820, 420, 1250, { swim: 0.4 });
        whale(k, 1040, 690, 7 / 30 * 1250 * 1.3, { swim: 0.8, phase: 1 });
        label(k, 'con non ~7 m · ~2,5 tấn', 1040, 790, 'a', { size: 38 });
        bigNum(k, '+90 KG / NGÀY', W / 2, 150, 'b', { size: 90, color: P.gold });
        const n = Math.floor(k.at('c', 3, 'linear') * 10);
        for (let i = 0; i < 10; i++) human(k, 560 + i * 80, 1020, 90, { color: P.cream, stroke: false, alpha: i < n ? 1 : 0 });
      },
    },
    {
      say: '{a}Và nó là một trong những con vật ồn ào nhất hành tinh. {b}Theo NOAA, trong điều kiện thuận lợi, tiếng gọi của nó có thể truyền tới những con cá voi khác cách xa khoảng một nghìn sáu trăm cây số. {c}Gần bằng quãng đường từ Hà Nội vào Sài Gòn. {d}Vậy mà phần lớn tiếng gọi ấy trầm đến mức tai bạn gần như không nghe thấy.',
      draw(k) {
        fill(k, '#0D1B2A');
        chapterTag(k, 'Chương 2 · Bên trong');
        vnRoute(k, 700, 140, 820, k.at('b', 4, 'linear'));
        bigNum(k, '~1.600 KM', 1420, 420, 'c', { size: 100, color: P.gold });
        label(k, 'tần số rất trầm', 1420, 560, 'd', { size: 44, color: P.mute });
        src(k, 'Nguồn: NOAA Fisheries');
      },
    },

    // ================= CHƯƠNG 3: BỮA ĂN =================
    {
      chapter: 'Con vật lớn nhất ăn gì?',
      say: '{a}Một cơ thể như vậy cần ăn gì? {b}Cá mập? Mực khổng lồ? {c}Không. Nó ăn thứ này.',
      transition: 'fade',
      sfx: [['sparkle', 'c', 0.3]],
      draw(k) {
        ocean(k, { depth: 0.45 });
        chapterTag(k, 'Chương 3 · Bữa ăn');
        whale(k, 560, 600, 1100, { mouth: 0.4 * k.at('b', 1.2), swim: 0.4 });
        const c = k.at('c', 1.2, 'out');
        k.dot(1500, 420, lerp(8, 0, c), P.orange, 1 - c);
        krillOne(k, 1480, 420, 460 * c, { alpha: c });
      },
    },
    {
      say: '{a}Nhuyễn thể, hay krill. Một loài giáp xác nhỏ, dài cỡ ngón tay út. {b}Con vật lớn nhất hành tinh sống bằng một trong những con vật nhỏ nhất mà nó có thể nhìn thấy.',
      draw(k) {
        k.photo('krill', 0, 0, W, H, { zoom: [1.0, 1.1], pan: [[0.45, 0.55], [0.5, 0.5]] });
        chip(k, 'ẢNH THẬT', 60, 70, { bg: P.gold });
        label(k, 'KRILL NAM CỰC · ~5 cm', W - 80, 980, 'a', { size: 44, align: 'right' });
      },
    },
    {
      say: '{a}Nhưng nó không ăn từng con. {b}Nó tìm những đàn krill dày đặc, rồi lao thẳng vào.',
      sfx: [['whoosh', 'b', 0.35]],
      draw(k) {
        ocean(k, { depth: 0.3 });
        chapterTag(k, 'Chương 3 · Bữa ăn');
        krill(k, 1250, 360, 260, 420);
        const b = k.at('b', 2.4, 'in');
        whale(k, lerp(-500, 900, b), lerp(980, 520, b), 1300, { swim: 0.9, mouth: 0.3 * b });
      },
    },
    {
      say: '{a}Trong vài giây, hàm dưới của nó mở gần như vuông góc. {b}Những nếp gấp dưới họng giãn căng như một chiếc dù. {c}Theo các nhà nghiên cứu ở Stanford, mỗi cú đớp, nó nuốt vào một khối nước lớn hơn cả chính cơ thể mình.',
      sfx: [['slideUp', 'a', 0.3]],
      draw(k) {
        ocean(k, { depth: 0.3 });
        chapterTag(k, 'Chương 3 · Bữa ăn');
        krill(k, 1450, 470, 200, 260, { alpha: 0.6 * (1 - k.at('b', 2)) });
        whale(k, 880, 480, 1400, { mouth: k.at('a', 1.5, 'out'), swim: 0.3 });
        bigNum(k, 'NƯỚC > CƠ THỂ', W / 2, 960, 'c', { size: 80, color: P.gold });
        src(k, 'Goldbogen · Stanford', { y: 40 + 1000 });
      },
    },
    {
      say: '{a}Rồi nó ngậm miệng, dùng chiếc lưỡi nặng như con voi ép nước thoát ra qua những tấm sừng hàm, như chiếc lược khổng lồ. {b}Nước đi ra. {c}Krill ở lại.',
      draw(k) {
        fill(k, '#082A36');
        chapterTag(k, 'Chương 3 · Bữa ăn');
        baleen(k, 160, 140, 900, 640);
        for (let i = 0; i < 40; i++) {
          const t = ((k.t * 0.7 + k.rand(i)) % 1), x = 200 + k.rand(i + 3) * 820;
          k.dot(x, 820 + t * 200, 5, '#9FD8EA', k.at('b', 0.6) * (1 - t));
        }
        for (let i = 0; i < 30; i++) k.dot(220 + k.rand(i + 40) * 780, 200 + k.rand(i + 70) * 120, 5, P.orange, k.at('c', 0.6));
        k.photo('sung-ham', 1140, 160, 640, 480, { radius: 20, border: [P.cream, 5], p: k.at('a', 0.8), pan: [[0.55, 0.35], [0.6, 0.38]], zoom: [1.3, 1.4] });
        label(k, 'tấm sừng hàm thật (bảo tàng)', 1460, 690, 'a', { size: 32 });
      },
    },
    {
      say: '{a}Bao nhiêu thì đủ? {b}Năm 2021, một nhóm nghiên cứu công bố trên tạp chí Nature: trong mùa kiếm ăn, một con cá voi xanh trưởng thành ở Đông Bắc Thái Bình Dương ăn khoảng {c}mười sáu tấn krill mỗi ngày. {d}Nhiều gấp ba lần những gì giới khoa học từng nghĩ.',
      sfx: [['boom', 'c', 0.25]],
      draw(k) {
        fill(k, P.space);
        chapterTag(k, 'Chương 3 · Bữa ăn');
        label(k, 'NATURE · 2021', 60, 120, 'b', { size: 40, align: 'left' });
        const c = k.at('c', 2);
        krill(k, W / 2, 620, 340 * c + 1, Math.floor(700 * c));
        bigNum(k, '16 TẤN / NGÀY', W / 2, 220, 'c', { size: 110, color: P.orange });
        label(k, '× 3 so với ước tính cũ', W / 2, 960, 'd', { size: 50, color: P.gold });
        src(k, 'Savoca et al., Nature 2021');
      },
    },
    {
      say: '{a}Mười sáu tấn mỗi ngày. Đó là bữa ăn của một sinh vật đẩy cơ thể mình tới giới hạn. {b}Và đây là manh mối đầu tiên cho câu hỏi ở đầu video: tại sao không có gì lớn hơn nó? {c}Câu trả lời liên quan đến chính những con krill này. {d}Nhưng trước đó, chúng ta cần nói về lần nó suýt biến mất.',
      draw(k) {
        ocean(k, { depth: lerp(0.3, 0.9, k.at('d', 3)) });
        chapterTag(k, 'Chương 3 · Bữa ăn');
        krill(k, W / 2, 500, 300, Math.floor(400 * (1 - k.at('c', 4))));
        bigNum(k, 'VÌ SAO KHÔNG LỚN HƠN?', W / 2, 200, 'b', { size: 80, color: P.gold });
        label(k, 'manh mối #1: krill', W / 2, 300, 'c', { size: 46 });
      },
    },

    // ================= CHƯƠNG 4: SUÝT BIẾN MẤT =================
    {
      chapter: 'Lần cá voi xanh suýt biến mất',
      say: '{a}Đầu thế kỷ hai mươi, con người có tàu săn cá voi chạy bằng hơi nước, {b}và súng phóng lao có đầu nổ. {c}Lần đầu tiên, sinh vật nhanh và lớn nhất đại dương không còn chỗ trốn.',
      transition: 'fade',
      draw(k) {
        if (k.images['tau-san-ca-voi']) k.photo('tau-san-ca-voi', 0, 0, W, H, { zoom: [1.0, 1.08], dim: 0.35, credit: 'Sæbjørn Sæbjørnsen · public domain' });
        else { fill(k, '#202A30'); fishingBoat(k, 600, 700, 700, { color: '#2B2B2B' }); }
        chapterTag(k, 'Chương 4 · Suýt biến mất');
        chip(k, 'ẢNH TƯ LIỆU', 60, 120, { bg: P.cream, p: k.at('a', 0.5) });
        label(k, 'ĐẦU THẾ KỶ 20', W - 80, 980, 'a', { size: 46, align: 'right' });
      },
    },
    {
      say: '{a}Chỉ riêng mùa săn 1930 đến 1931 ở Nam Cực, gần ba mươi nghìn con cá voi xanh đã bị giết. {b}Trong một mùa.',
      tail: 1.6,
      draw(k) {
        fill(k, '#0E0F14');
        chapterTag(k, 'Chương 4 · Suýt biến mất');
        dotGrid(k, 160, 300, 1600, 680, 3000, k.at('a', 6, 'linear'), { color: '#C7D2DC' });
        bigNum(k, `~${Math.round(30 * k.at('a', 6, 'linear'))}.000`, W / 2, 170, 'a', { size: 120, color: P.cream, outline: '#0E0F14', fx: 'fade' });
        label(k, 'mỗi chấm = 10 con · mùa 1930–31', W / 2, 1020, 'a', { size: 32, color: P.mute });
        label(k, 'TRONG MỘT MÙA.', W / 2, 260, 'b', { size: 56, color: P.red });
      },
    },
    {
      say: '{a}Trước khi bị săn, ở vùng biển quanh Nam Cực từng có khoảng hai trăm ba mươi chín nghìn con cá voi xanh. {b}Đến giữa thế kỷ hai mươi, các nhà khoa học ước tính chỉ còn khoảng {c}ba trăm sáu mươi con.',
      draw(k) {
        fill(k, '#0E0F14');
        chapterTag(k, 'Chương 4 · Suýt biến mất');
        const left = 1 - k.at('b', 4, 'inOut') * (1 - 360 / 239000);
        dotGrid(k, 160, 300, 1600, 680, 2390, left, { color: '#5FB0E8' });
        bigNum(k, k.t < k.cue('c') ? '239.000' : '~360', W / 2, 170, 'a', { size: 120, color: k.t < k.cue('c') ? P.cream : P.red, outline: '#0E0F14', fx: 'fade' });
        label(k, 'mỗi chấm = 100 con', W / 2, 1020, 'a', { size: 32, color: P.mute });
        src(k, 'Đại học Flinders (nghiên cứu di truyền) · International Whaling Statistics', { y: 1060 });
      },
    },
    {
      say: '{a}Ba trăm sáu mươi. {b}Ít hơn số học sinh của một trường cấp hai.',
      draw(k) {
        fill(k, '#0E0F14');
        chapterTag(k, 'Chương 4 · Suýt biến mất');
        for (let i = 0; i < 360; i++) {
          const col = i % 30, row = Math.floor(i / 30);
          human(k, 420 + col * 36, 380 + row * 52, 40, { color: '#5FB0E8', stroke: false, alpha: k.at(k.cue('b', i * 0.004), 0.3) });
        }
        bigNum(k, '360', W / 2, 200, 'a', { size: 140, color: P.red, outline: '#0E0F14' });
      },
    },
    {
      say: '{a}Năm 1966, thế giới cấm hoàn toàn việc săn bắt cá voi xanh vì mục đích thương mại. {b}Hôm nay, chúng vẫn nằm trong danh sách nguy cấp. {c}Nhưng theo NOAA, số lượng của chúng đang tăng lên trên toàn cầu. {d}Chậm. Rất chậm. Nhưng đang tăng.',
      draw(k) {
        k.photo('ca-voi-phun-nuoc', 0, 0, W, H, { zoom: [1.05, 1.12], pan: [[0.5, 0.45], [0.48, 0.5]], p: 1 });
        chip(k, 'ẢNH THẬT', 60, 70, { bg: P.gold });
        label(k, '1966 · CẤM SĂN', 60, 160, 'a', { size: 46, align: 'left' });
        chip(k, 'NGUY CẤP', 60, 240, { bg: P.red, color: P.cream, p: k.at('b', 0.5) });
        label(k, 'đang tăng ↑', W - 80, 160, 'c', { size: 52, color: P.gold, align: 'right' });
      },
    },

    // ================= CHƯƠNG 5: VÌ SAO KHÔNG LỚN HƠN =================
    {
      chapter: 'Vì sao cá voi không thể lớn hơn?',
      say: '{a}Bây giờ, quay lại câu hỏi ở đầu video. {b}Nếu lớn là mạnh, vì sao cá voi xanh không lớn hơn nữa? {c}Bốn mươi mét? Năm mươi mét?',
      transition: 'fade',
      draw(k) {
        ocean(k, { depth: 0.5 });
        chapterTag(k, 'Chương 5 · Giới hạn');
        const g = k.at('c', 2.5, 'inOut'), len = lerp(30, 50, g);
        const s = 1700 / 52;
        whale(k, 120 + len * s / 2, 560, len * s, { sil: true, color: '#2F6F99', swim: 0 });
        scaleBar(k, 120, 120 + len * s, 820, `${Math.round(len)} MÉT?`, { p: 1 });
        bigNum(k, '?', W - 160, 200, 'b', { size: 160, color: P.gold });
      },
    },
    {
      say: '{a}Trước hết, vì sao nó có thể lớn như vậy? {b}Trên cạn, mỗi bước đi của một con khủng long phải gánh toàn bộ sức nặng của nó trên bốn cái chân. {c}Dưới biển, nước nâng đỡ cơ thể. Cá voi không phải chống lại trọng lực theo cách đó.',
      draw(k) {
        fill(k, '#E9E1CF');
        k.ctx.fillStyle = '#0A4A5C'; k.ctx.fillRect(W / 2, 0, W / 2, H);
        chapterTag(k, 'Chương 5 · Giới hạn', true);
        sauropod(k, 120, 820, 720);
        for (const x of [320, 540]) k.arrow(x, 520, x, 760, { stroke: P.red, width: 10, p: k.at('b', 0.8), seed: x });
        whale(k, 1440, 520, 760, { swim: 0.4 });
        for (const x of [1280, 1600]) k.arrow(x, 900, x, 640, { stroke: P.gold, width: 10, p: k.at('c', 0.8), seed: x });
        label(k, 'TRÊN CẠN', W / 4, 120, 'b', { size: 54, color: P.ink, outline: '#E9E1CF' });
        label(k, 'DƯỚI NƯỚC', W * 3 / 4, 120, 'c', { size: 54 });
      },
    },
    {
      say: '{a}Năm 2019, nhóm của Goldbogen công bố một nghiên cứu trên tạp chí Science. {b}Họ gắn thiết bị theo dõi lên khoảng ba trăm con cá voi thuộc nhiều loài, {c}ghi lại hơn năm mươi nghìn lần đớp mồi.',
      draw(k) {
        space(k, { n: 60 });
        chapterTag(k, 'Chương 5 · Giới hạn');
        earth(k, 640, 560, 330, { spin: 0.03 });
        for (let i = 0; i < 40; i++) {
          const a = k.rand(i + 3000) * Math.PI * 2, d = 330 * Math.sqrt(k.rand(i + 3100)) * 0.9;
          k.dot(640 + Math.cos(a) * d, 560 + Math.sin(a) * d, 6, P.gold, k.at(k.cue('b', i * 0.05), 0.3));
        }
        label(k, 'SCIENCE · 2019', 1360, 300, 'a', { size: 50 });
        bigNum(k, '~300 CON', 1360, 470, 'b', { size: 90, color: P.gold });
        bigNum(k, '50.000+ CÚ ĐỚP', 1360, 640, 'c', { size: 80, color: P.orange });
        src(k, 'Goldbogen et al., Science 2019');
      },
    },
    {
      say: '{a}Họ phát hiện: với những con cá voi lọc mồi như cá voi xanh, càng lớn thì mỗi cú đớp càng có lãi. {b}Cơ thể to hơn tốn thêm năng lượng để lao tới, {c}nhưng miệng to hơn nuốt được lượng krill còn tăng nhanh hơn thế.',
      draw(k) {
        fill(k, P.space);
        chapterTag(k, 'Chương 5 · Giới hạn');
        energyChart(k, 260, 220, 1400, 640, Math.max(k.at('b', 1.5), 0.001) * (k.t < k.cue('c') ? 1 : 1));
        label(k, 'năng lượng tốn', 1700, 520, 'b', { size: 38, color: P.red, align: 'right' });
        label(k, 'năng lượng thu', 1700, 260, 'c', { size: 38, color: P.gold, align: 'right' });
      },
    },
    {
      say: '{a}Vậy thì cứ lớn mãi được sao? {b}Không. Vì krill không ở đâu cũng có. {c}Những đàn krill dày đặc chỉ xuất hiện ở vùng biển lạnh, trong vài tháng mùa hè ngắn ngủi. {d}Trong những tháng ấy, cá voi xanh phải ăn đủ cho cả năm.',
      draw(k) {
        space(k, { n: 60 });
        chapterTag(k, 'Chương 5 · Giới hạn');
        earth(k, 520, 560, 330, { spin: 0.03 });
        const c = k.at('c', 1) * (0.6 + 0.4 * Math.sin(k.t * 2));
        for (const y of [260, 860]) { k.dot(520, y, 70, P.orange, 0.5 * c); k.dot(520, y, 120, P.orange, 0.18 * c); }
        months(k, 980, 360, 130, [0, 1, 2], k.at('c', 0.8));
        label(k, 'vài tháng hè ở vùng biển lạnh', 1350, 700, 'c', { size: 40, color: P.gold });
        label(k, '→ ăn đủ cho cả năm', 1350, 780, 'd', { size: 46 });
      },
    },
    {
      say: '{a}Một con cá voi to hơn nữa sẽ cần nhiều krill hơn mức đại dương có thể cung cấp trong khoảng thời gian ấy. {b}Kích thước của nó không bị giới hạn bởi xương, cũng không chỉ bởi trái tim. {c}Mà bởi bữa ăn. {d}Gã khổng lồ lớn nhất lịch sử bị giới hạn bởi một con vật dài năm phân.',
      sfx: [['boom', 'c', 0.25]],
      draw(k) {
        fill(k, P.space);
        chapterTag(k, 'Chương 5 · Giới hạn');
        const pans = balance(k, W / 2, 1000, 1200, 0);
        whale(k, pans.left[0], pans.left[1] - 70, 560, { swim: 0 });
        krillOne(k, pans.right[0], pans.right[1] - 30, 120);
        bigNum(k, 'GIỚI HẠN = BỮA ĂN', W / 2, 200, 'c', { size: 100, color: P.gold });
        label(k, '~5 cm', pans.right[0], pans.right[1] - 110, 'd', { size: 44, color: P.orange });
      },
    },
    {
      say: '{a}Nhưng có một thử thách cho ngôi vô địch. {b}Năm 2023, các nhà khoa học công bố hoá thạch Perucetus colossus, một loài cá voi cổ ở Peru, với ước tính có thể nặng tới {c}ba trăm bốn mươi tấn. {d}Báo chí khắp thế giới viết: cá voi xanh đã mất ngôi.',
      sfx: [['boom', 'c', 0.3]],
      draw(k) {
        fill(k, '#2A2118');
        chapterTag(k, 'Chương 5 · Giới hạn');
        fossil(k, W / 2, 560, 1300 * k.at('b', 1.4, 'out') + 1);
        label(k, 'PERUCETUS COLOSSUS · PERU · 2023', W / 2, 160, 'b', { size: 44, color: '#E3D3B0', outline: '#2A2118' });
        bigNum(k, '340 TẤN?', W / 2, 860, 'c', { size: 120, color: P.red, outline: '#2A2118' });
        label(k, '"Cá voi xanh mất ngôi"', W / 2, 980, 'd', { size: 44, color: P.cream, outline: '#2A2118' });
        chip(k, 'MÔ PHỎNG', W - 60, 70, { align: 'right' });
      },
    },
    {
      say: '{a}Một năm sau, hai nhà cổ sinh vật học khác tính lại. {b}Kết quả: Perucetus có lẽ chỉ nặng khoảng sáu mươi đến một trăm mười tấn. {c}Cá voi xanh vẫn giữ ngôi. {d}Ít nhất là cho đến hoá thạch tiếp theo.',
      draw(k) {
        fill(k, '#2A2118');
        chapterTag(k, 'Chương 5 · Giới hạn');
        const b = k.at('b', 1.4, 'inOut');
        fossil(k, 620, 560, lerp(1300, 620, b));
        whale(k, 1360, 560, lerp(0, 820, k.at('c', 1.2, 'out')) + 1, { swim: 0.3 });
        bigNum(k, k.t < k.cue('b') ? '340 TẤN?' : '60–114 TẤN', 620, 860, 'b', { size: 100, color: k.t < k.cue('b') ? P.red : P.cream, outline: '#2A2118', fx: 'fade' });
        label(k, 'PeerJ 2024 · Motani & Pyenson', 620, 970, 'b', { size: 34, color: '#E3D3B0', outline: '#2A2118' });
        bigNum(k, 'VẪN GIỮ NGÔI', 1360, 860, 'c', { size: 80, color: P.gold, outline: '#2A2118' });
      },
    },

    // ================= BẠN VÀ NÓ =================
    {
      chapter: 'Nếu bạn bơi cạnh nó',
      say: '{a}Vậy nếu một ngày, bạn được lặn xuống, bơi cạnh một con cá voi xanh? {b}Toàn bộ cơ thể bạn sẽ chỉ dài bằng một phần nhỏ cái đầu của nó. {c}Bạn sẽ thấy trước mặt mình một bức tường xám xanh lốm đốm, trôi qua mãi không hết. {d}Và đâu đó trong lòng nước, một trái tim nặng một trăm tám mươi ký, đập một nhịp… rồi im lặng rất lâu.',
      transition: 'fade',
      draw(k) {
        ocean(k, { depth: 0.4 });
        const pass = k.at('c', 9, 'linear');
        whale(k, lerp(2600, -700, pass), 560, 3200, { swim: 0.15 });
        diver(k, 300, 880, 260 * k.at('a', 1), { color: '#D9E4EC' });
        const beat = Math.max(0, Math.sin(k.t * 0.8)) ** 30;
        k.dot(W / 2, H / 2, 160, P.red, 0.12 * beat * k.at('d', 1));
      },
    },

    // ================= KẾT =================
    {
      say: '{a}Quay lại vùng biển Đề Gi. Con cá voi dài mười bốn mét vẫn đang săn mồi cạnh những chiếc thuyền. {b}Ở những vùng biển lạnh xa hơn, có những sinh vật dài gấp đôi nó. Chúng từng chỉ còn vài trăm con. {c}Và chúng đang quay lại. {d}Trên một hạt bụi xanh, giữa vũ trụ rộng lớn, sinh vật lớn nhất từng tồn tại vẫn đang thở.',
      tail: 1.4,
      transition: 'fade',
      draw(k) {
        const up = k.at('d', 4, 'inOut');
        if (up < 1) {
          k.group({ x: W / 2, y: H / 2, s: lerp(1, 0.05, up) }, () => {
            k.group({ x: -W / 2, y: -H / 2 }, () => {
              dawnSurface(k, 600);
              fishingBoat(k, 1120, 600, 520);
              whale(k, 760, 640, 700, { color: BRYDE, swim: 0.3 });
              waterOver(k, 600);
              spout(k, 1080, 590, 260, k.at('a', 2.5));
            });
          });
        }
        if (up > 0) { k.ctx.save(); k.ctx.globalAlpha = up; space(k); earth(k, W / 2, H / 2, lerp(40, 70, up)); k.ctx.restore(); }
        label(k, 'đang quay lại', W / 2, 980, 'c', { size: 48, p: k.at('c', 0.8) * (1 - up) });
      },
    },
    {
      say: '{a}Nếu được chọn một lần trong đời: {b}bạn muốn lặn cạnh một con cá voi xanh, {c}hay bay lên nhìn Trái Đất từ vũ trụ? {d}Viết lựa chọn của bạn ở phần bình luận.',
      draw(k) {
        ocean(k, { depth: 0.3 });
        k.ctx.save(); k.ctx.beginPath(); k.ctx.rect(W / 2, 0, W / 2, H); k.ctx.clip(); space(k); earth(k, W * 3 / 4, 560, 220); k.ctx.restore();
        k.ctx.save(); k.ctx.beginPath(); k.ctx.rect(0, 0, W / 2, H); k.ctx.clip(); whale(k, W / 4, 600, 820, { swim: 0.4 }); diver(k, 260, 820, 90); k.ctx.restore();
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(W / 2 - 3, 0, 6, H);
        label(k, 'LẶN CẠNH CÁ VOI', W / 4, 160, 'b', { size: 54, color: P.cream });
        label(k, 'NHÌN TRÁI ĐẤT', W * 3 / 4, 160, 'c', { size: 54, color: P.cream });
        bigNum(k, 'BẠN CHỌN?', W / 2, 960, 'd', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Tập sau trên Hạt Bụi Xanh: {b}điều gì sẽ xảy ra nếu một hố đen đi ngang Hệ Mặt Trời của chúng ta? {c}Đăng ký kênh để không bỏ lỡ.',
      tail: 2.2,
      draw(k) {
        space(k);
        label(k, 'TẬP SAU', W / 2, 110, 'a', { size: 60, color: P.mute });
        blackHole(k, W / 2 + 140, 520, 120 * k.at('b', 1.4, 'out') + 1);
        earth(k, 420, 760, 42);
        bigNum(k, 'NẾU MỘT HỐ ĐEN ĐI NGANG HỆ MẶT TRỜI?', W / 2, 900, 'b', { size: 64, color: P.cream, maxWidth: 1700 });
        chip(k, '🔔 ĐĂNG KÝ HẠT BỤI XANH', W / 2 - 230, 1010, { bg: P.gold, p: k.at('c', 0.6) });
      },
    },
  ],
};
