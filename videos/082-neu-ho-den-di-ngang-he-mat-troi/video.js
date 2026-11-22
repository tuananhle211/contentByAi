// Hạt Bụi Xanh · tập 2 — Điều Gì Xảy Ra Nếu Một Hố Đen Đi Ngang Hệ Mặt Trời? (kịch bản: kich-ban.md, 11/11/2026)
// Fact check (đầy đủ trong kich-ban.md):
//   NASA/ESA Hubble heic2210 (6/2022), Sahu et al. 2022: vi thấu kính 2011 (OGLE, Las Campanas), sao sáng ~270 ngày, hố đen lang thang ~7 M☉,
//     ~5.000 năm ánh sáng (một nhóm khác cho rằng có thể là sao neutron → nói "các nhà khoa học cho rằng"); ~100 triệu hố đen lang thang; gần nhất có thể ~80 năm ánh sáng.
//   El-Badry et al. 2022: Gaia BH1 ~1.560 năm ánh sáng. Schwarzschild: ~3 km bán kính / M☉. NASA Imagine the Universe: thay Mặt Trời bằng hố đen cùng khối lượng → quỹ đạo không đổi.
//   ESA Gaia (2017): Gliese 710 sau ~1,3 triệu năm, cách ~2.300 tỷ km, xuyên đám mây Oort, có thể gây mưa sao chổi. Kaib & Raymond 2024 (ApJL): sao đi qua tác động Trái Đất qua hành tinh khổng lồ.
//   Giới hạn thuỷ triều r ≈ R⊕(M/M⊕)^(1/3) ≈ 845.000 km với 7 M☉ (ghi "ước tính"). Laughlin & Adams 2000 + ĐH Michigan: ~1 triệu năm đại dương mới đóng băng; sự sống quanh miệng phun thuỷ nhiệt.
//   NASA: Chicxulub ~10 km, 66 triệu năm. ESO: Sgr A* ~4,3 triệu M☉, ~27.000 năm ánh sáng, ảnh 2022, bản phân cực 2024 (eso2406); M87* 2019, ~55 triệu năm ánh sáng, ~6,5 tỷ M☉.
import { P, fill, space, earth, scaleBar, bigNum, label, src, chip, motorbike, blackHole, supernova, lensedStars, lightCurve, solarSystem, oortShell,
  comet, earthTorn, ventSection, shark, gravityRings, vnRoute, diver, ocean, chapterTag, months, sauropod } from '/channel/hat-bui-xanh.js';
import * as thumbs from '/videos/082-neu-ho-den-di-ngang-he-mat-troi/thumbs.js';

const W = 1920, H = 1080;
const lerp = (a, b, p) => a + (b - a) * p;
// Nhãn đếm ngược góc trên phải.
const countdown = (k, s) => k.text(s, W - 70, 80, { size: 64, font: 'title', color: P.gold, align: 'right', outline: P.ink, outlineWidth: 10, fx: 'pop', p: k.at(0, 0.5) });
const hypo = (k) => chip(k, 'KỊCH BẢN GIẢ ĐỊNH', 60, 120, { bg: P.orange });

export default {
  meta: {
    title: 'Điều Gì Xảy Ra Nếu Một Hố Đen Đi Ngang Hệ Mặt Trời?',
    description: 'Năm 2011, một ngôi sao bỗng sáng lên suốt 270 ngày — vì một thứ vô hình nặng gấp 7 lần Mặt Trời đang trôi ngang qua. Nếu một hố đen như thế đi qua Hệ Mặt Trời, điều đáng sợ nhất lại không phải là bị nuốt.\n\nHố đen thật ra là gì, vì sao nó không phải "máy hút bụi vũ trụ", điều gì xảy ra với Trái Đất trong từng trường hợp (kịch bản giả định dựa trên vật lý), và khả năng chuyện này xảy ra thật là bao nhiêu. Mọi con số đều có nguồn bên dưới.',
    footer: '📚 Nguồn tham khảo\n• NASA – Hubble đo khối lượng hố đen lang thang (2022)\n• ESA/Hubble heic2210\n• Sahu et al. (2022), ApJ\n• Gaia BH1 – El-Badry et al. (2022)\n• NASA Imagine the Universe – Mặt Trời thành hố đen\n• ESA – Gliese 710 và đám mây Oort\n• Kaib & Raymond (2024), ApJ Letters\n• Laughlin & Adams (2000) – The Frozen Earth / ĐH Michigan\n• ESO – Sagittarius A* (eso2208, eso2406) và M87* (eso1907)\n\n🌍 Hạt Bụi Xanh — khoa học về những thứ khổng lồ, cổ xưa và đáng sợ trên hạt bụi xanh của chúng ta. Video mới mỗi ngày lúc 20:00.',
    tags: ['hố đen', 'lỗ đen', 'điều gì xảy ra nếu', 'hố đen đi qua hệ mặt trời', 'nếu hố đen đến gần trái đất', 'black hole', 'vũ trụ', 'thiên văn', 'hố đen gần trái đất nhất', 'sagittarius a', 'thấu kính hấp dẫn', 'khoa học', 'hạt bụi xanh'],
    hashtags: ['hoden', 'vutru', 'khoahoc', 'hatbuixanh'],
    links: [['▶ Tập trước: Cá Voi Xanh Lớn Đến Mức Nào?', '079-ca-voi-xanh-lon-den-muc-nao']],
    categoryId: '28', lang: 'vi',
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.35, tail: 0.8, pause: 0.35, transition: 'cut', camera: 0.04,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
  },
  thumbnail: thumbs.a,
  scenes: [
    // ================= MỞ ĐẦU =================
    {
      chapter: 'Mở đầu: ngôi sao sáng lên 270 ngày',
      say: '{a}Năm 2011. Đài thiên văn Las Campanas, Chile. {b}Các nhà thiên văn thấy một ngôi sao ở rất xa bỗng sáng lên. Sáng dần, sáng dần. {c}Suốt hai trăm bảy mươi ngày. {d}Rồi nó tắt về như cũ.',
      draw(k) {
        space(k, { n: 220 });
        const b = Math.exp(-Math.pow((k.at('b', 9, 'linear') - 0.5) / 0.22, 2)) * (1 - k.at('d', 1.5));
        k.dot(1250, 330, 6 + 26 * b, '#FFFFFF', 1); k.dot(1250, 330, 30 + 90 * b, '#CFE3FF', 0.25 * b);
        lightCurve(k, 260, 640, 1400, 300, k.at('b', 9, 'linear'));
        label(k, '2011 · LAS CAMPANAS, CHILE', 60, 70, 'a', { size: 36, align: 'left' });
        bigNum(k, '270 NGÀY', 960, 600, 'c', { size: 80, color: P.gold });
      },
    },
    {
      say: '{a}Giữa ngôi sao ấy và Trái Đất, không có gì cả. Không ánh sáng. Không vật thể nào kính thiên văn nhìn thấy được. {b}Chỉ có một thứ vô hình, nặng gấp khoảng bảy lần Mặt Trời, đang lặng lẽ trôi ngang qua. {c}Các nhà khoa học cho rằng đó là hố đen lang thang đầu tiên con người từng phát hiện.',
      draw(k) {
        fill(k, P.space);
        lensedStars(k, lerp(700, 1100, k.at('a', 12, 'linear')), 520, 180, k.at('b', 1.5));
        bigNum(k, 'VÔ HÌNH · 7× MẶT TRỜI', W / 2, 940, 'b', { size: 72 });
        label(k, 'hố đen lang thang đầu tiên', W / 2, 1030, 'c', { size: 40, color: P.gold });
      },
    },
    {
      say: '{a}Làm sao một thứ vô hình lại khiến ngôi sao sáng lên? {b}Vì lực hấp dẫn của nó bẻ cong ánh sáng đi ngang qua, giống như một chiếc kính lúp khổng lồ, gom ánh sao lại và hắt về phía chúng ta. {c}Hiện tượng này được dự đoán từ thuyết tương đối rộng của Einstein, hơn một trăm năm trước. {d}Năm 2011, nó giúp con người nhìn thấy một thứ không thể nhìn thấy.',
      draw(k) {
        fill(k, P.space);
        const { ctx } = k; const b = k.at('b', 2);
        k.dot(200, 540, 14, '#FFFFFF'); earth(k, 1720, 540, 50, { spin: 0 });
        k.dot(960, 540, 24, '#000', 1); k.dot(960, 540, 40, '#5FB0E8', 0.15 * b);
        for (let i = -3; i <= 3; i++) {
          if (!i) continue;
          ctx.beginPath(); ctx.moveTo(214, 540);
          ctx.quadraticCurveTo(960, 540 + i * lerp(60, 160, b), 1670, 540 + i * lerp(60, 4, b));
          ctx.strokeStyle = `rgba(255,236,170,${0.35 + 0.4 * b})`; ctx.lineWidth = 3; ctx.stroke();
        }
        label(k, 'EINSTEIN · THUYẾT TƯƠNG ĐỐI RỘNG', W / 2, 160, 'c', { size: 44 });
        label(k, 'ngôi sao xa', 200, 620, 'a', { size: 32, color: P.mute });
        label(k, 'Trái Đất', 1720, 630, 'a', { size: 32, color: P.mute });
      },
    },
    {
      say: '{a}Theo NASA, các nhà khoa học ước tính có khoảng một trăm triệu hố đen như thế đang trôi giữa các vì sao trong Ngân Hà. {b}Cái gần nhất có thể chỉ cách chúng ta tám mươi năm ánh sáng.',
      draw(k) {
        k.photo('ngan-ha', 0, 0, W, H, { zoom: [1.05, 1.15], pan: [[0.45, 0.4], [0.5, 0.45]], dim: 0.35 });
        chip(k, 'ẢNH THẬT · NGÂN HÀ', 60, 70, { bg: P.gold });
        bigNum(k, '~100.000.000', W / 2, 470, 'a', { size: 130 });
        label(k, 'hố đen lang thang trong Ngân Hà (ước tính)', W / 2, 580, 'a', { size: 44 });
        label(k, 'gần nhất có thể ~80 năm ánh sáng', W / 2, 700, 'b', { size: 50, color: P.gold });
        src(k, 'NASA · Hubble 2022', { y: 1000 });
      },
    },
    {
      say: '{a}Vậy nếu một ngày, một hố đen như thế đi ngang Hệ Mặt Trời của chúng ta, chuyện gì sẽ xảy ra? {b}Nó có nuốt chửng Trái Đất không? {c}Câu trả lời ngắn là: gần như chắc chắn là không. {d}Và điều đáng sợ nhất, lại nằm ở chỗ khác.',
      sfx: [['boom', 'd', 0.2]],
      draw(k) {
        space(k, { n: 120 });
        solarSystem(k, 960, 560, 430, { speed: 0.12 });
        blackHole(k, lerp(2100, 1650, k.at('a', 8, 'inOut')), 260, 46);
        bigNum(k, 'NUỐT CHỬNG?', W / 2, 150, 'b', { size: 90, color: P.cream, p: k.at('b', 0.5) * (1 - k.at('c', 0.4)) });
        bigNum(k, 'KHÔNG.', W / 2, 150, 'c', { size: 110, color: P.gold });
        bigNum(k, 'ĐIỀU ĐÁNG SỢ NHẤT Ở CHỖ KHÁC', W / 2, 980, 'd', { size: 64, color: P.red });
      },
    },

    // ================= CHƯƠNG 1 =================
    {
      chapter: 'Hố đen thật ra là gì?',
      say: '{a}Một hố đen là nơi có quá nhiều vật chất bị nén vào một chỗ quá nhỏ, {b}đến mức lực hấp dẫn giữ lại mọi thứ, kể cả ánh sáng.',
      transition: 'fade',
      draw(k) {
        space(k, { n: 100 });
        chapterTag(k, 'Chương 1 · Hố đen là gì');
        const c = k.at('a', 4, 'inOut');
        k.dot(W / 2, 540, lerp(260, 30, c), lerp(0, 1, c) > 0.9 ? '#000' : '#FFB43A', 1);
        if (c > 0.8) blackHole(k, W / 2, 540, 30);
        for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, r = lerp(520, 60, k.at('b', 2.5, 'in')); k.dot(W / 2 + Math.cos(a) * r, 540 + Math.sin(a) * r, 4, '#FFF3C4', 0.7 * k.at('b', 0.5)); }
        label(k, 'kể cả ánh sáng', W / 2, 960, 'b', { size: 54, color: P.gold });
      },
    },
    {
      say: '{a}Phần lớn hố đen cỡ này sinh ra từ cái chết của những ngôi sao rất nặng, nặng gấp hàng chục lần Mặt Trời. {b}Khi cạn nhiên liệu, lõi của chúng sụp xuống dưới sức nặng của chính mình, nhanh hơn một cái chớp mắt. {c}Lớp vỏ bên ngoài nổ tung thành siêu tân tinh. {d}Còn lõi trở thành một hố đen.',
      sfx: [['boom', 'c', 0.3]],
      draw(k) {
        space(k, { n: 100 });
        chapterTag(k, 'Chương 1 · Hố đen là gì');
        const live = 1 - k.at('c', 0.3);
        k.dot(W / 2, 540, 220 * (1 - 0.6 * k.at('b', 1.5, 'in')), '#7FB8FF', live); k.dot(W / 2, 540, 300, '#7FB8FF', 0.12 * live);
        supernova(k, W / 2, 540, 760, k.at('c', 3, 'out'));
        if (k.t > k.cue('d')) blackHole(k, W / 2, 540, 40 * k.at('d', 1, 'out') + 1);
        label(k, 'sao nặng gấp hàng chục lần Mặt Trời', W / 2, 140, 'a', { size: 44 });
        label(k, 'SIÊU TÂN TINH', W / 2, 960, 'c', { size: 60, color: P.orange });
      },
    },
    {
      say: '{a}Để biến Mặt Trời thành hố đen, bạn phải nén toàn bộ nó vào một quả cầu đường kính chỉ khoảng sáu cây số. {b}Quãng đường bạn chạy xe máy chưa tới mười phút.',
      draw(k) {
        space(k, { n: 100 });
        chapterTag(k, 'Chương 1 · Hố đen là gì');
        const c = k.at('a', 4, 'inOut');
        k.dot(700, 520, lerp(380, 14, c), '#FFD34E', 1); k.dot(700, 520, lerp(460, 20, c), '#FFB43A', 0.25);
        if (c >= 1) k.dot(700, 520, 14, '#000', 1);
        scaleBar(k, 1100, 1700, 760, '~6 KM', { p: k.at('b', 1) });
        motorbike(k, lerp(1100, 1600, k.at('b', 4, 'linear')), 720, 110);
        label(k, '< 10 phút xe máy', 1400, 860, 'b', { size: 44, color: P.gold });
      },
    },
    {
      say: '{a}Hố đen lang thang năm 2011 nặng gấp khoảng bảy lần Mặt Trời. Vùng không lối thoát của nó, gọi là chân trời sự kiện, rộng chừng bốn mươi cây số. {b}Cả một khối nặng gấp bảy lần Mặt Trời, gói gọn trong một quả cầu nhỏ hơn nhiều tỉnh thành ở Việt Nam.',
      draw(k) {
        fill(k, '#0D1B2A');
        chapterTag(k, 'Chương 1 · Hố đen là gì');
        vnRoute(k, 1000, 120, 840, 0);
        k.dot(1000 + 22 * 8.4, 120 + 4 * 8.4, 840 * 40 / 1650 * 0.5 + 2, '#000000', k.at('b', 0.5));
        k.dot(1000 + 22 * 8.4, 120 + 4 * 8.4, 26, P.red, 0.35 * k.at('b', 0.5));
        bigNum(k, '~40 KM', 520, 420, 'a', { size: 110, color: P.cream });
        label(k, 'chân trời sự kiện · 7× Mặt Trời', 520, 540, 'a', { size: 40 });
        label(k, 'chấm đen = đúng tỉ lệ', 520, 640, 'b', { size: 36, color: P.mute });
      },
    },
    {
      say: '{a}Nhưng đây là điều mà phim ảnh thường nói sai. Hố đen không phải một cái máy hút bụi vũ trụ. {b}Ở khoảng cách xa, lực hút của nó y hệt một ngôi sao có cùng khối lượng. Không hơn, không kém.',
      draw(k) {
        space(k, { n: 80 });
        chapterTag(k, 'Chương 1 · Hố đen là gì');
        gravityRings(k, 560, 560, 260); gravityRings(k, 1360, 560, 260);
        k.dot(560, 560, 70, '#FFD34E'); k.dot(560, 560, 110, '#FFB43A', 0.2);
        blackHole(k, 1360, 560, 30);
        label(k, 'NGÔI SAO 7× MẶT TRỜI', 560, 960, 'b', { size: 40 });
        label(k, 'HỐ ĐEN 7× MẶT TRỜI', 1360, 960, 'b', { size: 40 });
        bigNum(k, 'KHÔNG PHẢI MÁY HÚT BỤI', W / 2, 140, 'a', { size: 80, color: P.red });
        bigNum(k, '=', W / 2, 580, 'b', { size: 160, color: P.gold });
      },
    },
    {
      say: '{a}NASA đưa ra một thí nghiệm tưởng tượng. Nếu Mặt Trời bỗng biến thành một hố đen có đúng cùng khối lượng, {b}Trái Đất vẫn tiếp tục quay quanh nó, theo đúng quỹ đạo cũ. {c}Thứ duy nhất thay đổi là: bầu trời tối đen, và Trái Đất lạnh dần.',
      draw(k) {
        space(k, { n: 100 });
        chapterTag(k, 'Chương 1 · Hố đen là gì');
        const dim = k.at('a', 2, 'inOut');
        solarSystem(k, 960, 560, 1300, { n: 4, dim, speed: 0.25 });
        bigNum(k, 'QUỸ ĐẠO KHÔNG ĐỔI', W / 2, 140, 'b', { size: 80, color: P.gold });
        label(k, 'chỉ tối và lạnh dần', W / 2, 980, 'c', { size: 48, color: '#9FD8EA' });
        src(k, 'NASA · Imagine the Universe');
      },
    },
    {
      say: '{a}Vậy nên câu hỏi thật sự không phải là "nó có hút ta vào không". {b}Mà là: khi một vật nặng gấp bảy lần Mặt Trời đi xuyên qua sân nhà của chúng ta, mọi thứ sẽ bị xô lệch ra sao? {c}Và để trả lời, chúng ta có một vị khách có thật.',
      draw(k) {
        space(k, { n: 100 });
        chapterTag(k, 'Chương 1 · Hố đen là gì');
        solarSystem(k, 960, 560, 460, { wobble: 0.6 * k.at('b', 4), speed: 0.15 });
        blackHole(k, lerp(2000, 1500, k.at('b', 6, 'inOut')), lerp(100, 300, k.at('b', 6, 'inOut')), 40);
        label(k, 'mọi thứ bị xô lệch?', W / 2, 980, 'b', { size: 50 });
      },
    },

    // ================= CHƯƠNG 2 =================
    {
      chapter: 'Một vị khách có thật đang tới',
      say: '{a}Tên nó là Gliese 710. Không phải hố đen, mà là một ngôi sao, nhỏ hơn Mặt Trời một chút. {b}Theo dữ liệu của tàu vũ trụ Gaia, Cơ quan Vũ trụ châu Âu, khoảng một triệu ba trăm nghìn năm nữa, {c}nó sẽ đi qua cách Mặt Trời chỉ khoảng hai nghìn ba trăm tỷ cây số.',
      transition: 'fade',
      draw(k) {
        space(k, { n: 160 });
        chapterTag(k, 'Chương 2 · Vị khách có thật');
        k.dot(lerp(1500, 1150, k.at('a', 12, 'linear')), 420, 34, '#FF9B5E'); k.dot(lerp(1500, 1150, k.at('a', 12, 'linear')), 420, 70, '#FF9B5E', 0.2);
        label(k, 'GLIESE 710', lerp(1500, 1150, k.at('a', 12, 'linear')), 340, 'a', { size: 44, color: '#FF9B5E' });
        k.photo('gaia', 120, 560, 620, 440, { radius: 20, border: [P.cream, 5], p: k.at('b', 0.8), zoom: [1.05, 1.1] });
        bigNum(k, '+1,3 TRIỆU NĂM', 1250, 680, 'b', { size: 70, color: P.cream });
        bigNum(k, '~2.300 TỶ KM', 1250, 820, 'c', { size: 80, color: P.gold });
        src(k, 'ESA Gaia, 2017', { x: 120, y: 1040 });
      },
    },
    {
      say: '{a}Nghe thì xa. Nhưng con số ấy nằm sâu bên trong đám mây Oort, {b}lớp vỏ băng khổng lồ bao quanh Hệ Mặt Trời, nơi chứa hàng tỷ sao chổi đang ngủ yên.',
      draw(k) {
        space(k, { n: 80 });
        chapterTag(k, 'Chương 2 · Vị khách có thật');
        const z = lerp(1, 0.55, k.at('a', 3, 'inOut'));
        k.group({ x: 960, y: 540, s: z }, () => { solarSystem(k, 0, 0, 260, { speed: 0.15 }); oortShell(k, 0, 0, 900, { n: 520, size: 5 }); });
        k.ctx.save(); k.ctx.setLineDash([16, 14]); k.ctx.strokeStyle = 'rgba(255,155,94,0.8)'; k.ctx.lineWidth = 4;
        k.ctx.beginPath(); k.ctx.moveTo(1900, 120); k.ctx.lineTo(1900 - 1400 * k.at('a', 3), 120 + 500 * k.at('a', 3)); k.ctx.stroke(); k.ctx.restore();
        label(k, 'ĐÁM MÂY OORT', 960, 1000, 'b', { size: 54, color: '#CFE8F0' });
      },
    },
    {
      say: '{a}Khi nó đi qua, lực hấp dẫn của nó sẽ hất một phần sao chổi ấy rơi vào phía trong. {b}Các nhà khoa học dự đoán có thể có những trận mưa sao chổi kéo dài hàng triệu năm.',
      draw(k) {
        k.photo('sao-choi', 0, 0, W, H, { zoom: [1.0, 1.1], pan: [[0.5, 0.45], [0.5, 0.55]] });
        chip(k, 'ẢNH THẬT · SAO CHỔI HALE-BOPP', 60, 70, { bg: P.gold });
        label(k, 'mưa sao chổi kéo dài hàng triệu năm', W / 2, 980, 'b', { size: 50 });
      },
    },
    {
      say: '{a}Và mưa sao chổi không phải chuyện vô hại. {b}Sáu mươi sáu triệu năm trước, chỉ một vật thể rộng khoảng mười cây số lao vào Trái Đất là đủ khép lại thời đại khủng long. {c}Chúng ta sẽ quay lại câu chuyện ấy trong một tập khác.',
      sfx: [['boom', ['b', 2], 0.3]],
      draw(k) {
        space(k, { n: 100 });
        chapterTag(k, 'Chương 2 · Vị khách có thật');
        const b = k.at('b', 3, 'in');
        earth(k, 700, 620, 280, { spin: 0.01 });
        comet(k, lerp(1700, 860, b), lerp(160, 470, b), 260, -0.35, { alpha: b < 1 ? 1 : 0 });
        k.dot(870, 470, 140 * k.at(k.cue('b', 3), 0.6), '#FFE2A8', 1 - k.at(k.cue('b', 3.4), 1.5));
        sauropod(k, 1320, 980, 420, { alpha: 1 - k.at(k.cue('b', 3.5), 2) });
        label(k, '66 TRIỆU NĂM TRƯỚC · ~10 KM', W / 2, 120, 'b', { size: 50, color: P.orange });
      },
    },
    {
      say: '{a}Bây giờ, hãy thay Gliese 710 bằng một hố đen nặng gấp bảy lần Mặt Trời. Và cho nó đi gần hơn rất nhiều. {b}Từ đây trở đi là kịch bản giả định. Nhưng mọi bước đều dựa trên những định luật vật lý mà chúng ta đã biết.',
      draw(k) {
        space(k, { n: 120 });
        chapterTag(k, 'Chương 2 · Vị khách có thật');
        const a = k.at('a', 2, 'inOut');
        k.dot(960, 480, 70, '#FF9B5E', 1 - a);
        blackHole(k, 960, 480, 60 * a + 1);
        chip(k, 'KỊCH BẢN GIẢ ĐỊNH', W / 2 - 220, 900, { bg: P.orange, size: 40, p: k.at('b', 0.6) });
      },
    },

    // ================= CHƯƠNG 3 =================
    {
      chapter: 'Đếm ngược: khi nó tới gần',
      say: '{a}Hàng chục nghìn năm trước khi nó tới, chưa ai trên Trái Đất nhận ra điều gì. Nó vô hình. {b}Nhưng ở rìa Hệ Mặt Trời, những sao chổi đầu tiên đã bắt đầu rời khỏi chỗ cũ.',
      transition: 'fade',
      draw(k) {
        space(k, { n: 80 });
        chapterTag(k, 'Chương 3 · Đếm ngược'); countdown(k, '−50.000 NĂM'); hypo(k);
        k.group({ x: 960, y: 560, s: 0.55 }, () => { solarSystem(k, 0, 0, 260, { speed: 0.15 }); oortShell(k, 0, 0, 900, { n: 520, size: 5, stir: k.at('b', 6) }); });
      },
    },
    {
      say: '{a}Vài chục năm trước, các kính thiên văn bắt đầu thấy điều lạ. {b}Những ngôi sao phía sau một vùng trời trống rỗng bị méo đi, như nhìn qua đáy một cốc nước. {c}Thứ vô hình ấy đang bẻ cong ánh sáng.',
      draw(k) {
        fill(k, P.space);
        lensedStars(k, 960, 540, 200, k.at('b', 3));
        chapterTag(k, 'Chương 3 · Đếm ngược'); countdown(k, '−30 NĂM'); hypo(k);
        label(k, 'ánh sao bị bẻ cong', W / 2, 980, 'c', { size: 50, color: P.gold });
      },
    },
    {
      say: '{a}Rồi Sao Hải Vương và Sao Thiên Vương, những hành tinh khổng lồ ở xa, bắt đầu lệch khỏi quỹ đạo vài phần nhỏ. {b}Một nghiên cứu năm 2024 cho thấy, ngay cả những ngôi sao đi qua ở rất xa cũng tác động tới Trái Đất theo cách này: {c}chúng xô các hành tinh khổng lồ trước, rồi chính các hành tinh khổng lồ xô tới Trái Đất.',
      draw(k) {
        space(k, { n: 80 });
        chapterTag(k, 'Chương 3 · Đếm ngược'); countdown(k, '−20 NĂM'); hypo(k);
        solarSystem(k, 760, 560, 440, { wobble: 0.35 * k.at('a', 3), speed: 0.12 });
        blackHole(k, 1700, 220, 36);
        const c = k.at('c', 2);
        for (const [x1, y1, x2, y2, s] of [[1660, 250, 1200, 420, 0], [1150, 470, 860, 540, 0.4]]) k.arrow(x1, y1, lerp(x1, x2, Math.min(1, c * 1.6 - s)), lerp(y1, y2, Math.min(1, c * 1.6 - s)), { stroke: P.orange, width: 7, p: c > s ? 1 : 0, seed: x1 });
        label(k, 'hố đen → hành tinh khổng lồ → Trái Đất', W / 2, 1000, 'c', { size: 40 });
        src(k, 'Kaib & Raymond, ApJ Letters 2024', { y: 1050 });
      },
    },
    {
      say: '{a}Vài năm trước, không còn nghi ngờ gì nữa. Đường đi của nó được tính chính xác. Nó sẽ cắt qua Hệ Mặt Trời trong khoảng thời gian một đời người. {b}Và lúc này, câu hỏi duy nhất là: nó sẽ đi gần đến mức nào?',
      draw(k) {
        space(k, { n: 80 });
        chapterTag(k, 'Chương 3 · Đếm ngược'); countdown(k, '−5 NĂM'); hypo(k);
        const { ctx } = k;
        for (const [r, c, t] of [[480, 'rgba(95,176,232,0.12)', 'XA'], [300, 'rgba(255,211,78,0.14)', 'GẦN'], [110, 'rgba(229,56,59,0.2)', 'RẤT GẦN']]) {
          ctx.beginPath(); ctx.arc(960, 560, r, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill();
          k.text(t, 960, 560 - r + 34, { size: 30, font: 'title', color: P.cream, fx: 'fade', p: k.at('b', 0.6), outline: P.ink, outlineWidth: 6 });
        }
        solarSystem(k, 960, 560, 460, { speed: 0.12 });
        ctx.setLineDash([18, 14]); ctx.strokeStyle = 'rgba(245,241,230,0.6)'; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(1900, 80); ctx.lineTo(lerp(1900, 100, k.at('a', 4)), lerp(80, 1050, k.at('a', 4))); ctx.stroke(); ctx.setLineDash([]);
      },
    },
    {
      say: '{a}Nếu nó đi qua bên ngoài quỹ đạo Sao Hải Vương, Trái Đất có lẽ chỉ bị xô nhẹ. Quỹ đạo dài thêm hay ngắn đi một chút. {b}Nghe nhỏ. Nhưng một quỹ đạo lệch đi chút xíu cũng đủ làm khí hậu thay đổi: mùa hè gắt hơn, mùa đông dài hơn.',
      draw(k) {
        space(k, { n: 80 });
        chapterTag(k, 'Chương 3 · Đếm ngược'); hypo(k); countdown(k, 'TRƯỜNG HỢP 1 · XA');
        solarSystem(k, 760, 560, 440, { wobble: 0.15, speed: 0.12 });
        blackHole(k, lerp(1880, 1500, k.at('a', 6)), lerp(1000, 120, k.at('a', 6)), 30);
        months(k, 1250, 700, 90, [5, 6], k.at('b', 0.6));
        label(k, 'khí hậu thay đổi', 1530, 980, 'b', { size: 44, color: P.gold });
      },
    },
    {
      say: '{a}Nếu nó đi vào bên trong Hệ Mặt Trời, một vật nặng gấp bảy lần Mặt Trời sẽ giành lấy quyền kiểm soát. {b}Quỹ đạo của các hành tinh bị kéo giãn, xé rối. Có hành tinh bị kéo về phía Mặt Trời. Có hành tinh bị hất văng ra ngoài.',
      sfx: [['whoosh', 'b', 0.3]],
      draw(k) {
        space(k, { n: 80 });
        chapterTag(k, 'Chương 3 · Đếm ngược'); hypo(k); countdown(k, 'TRƯỜNG HỢP 2 · GẦN');
        solarSystem(k, 960, 560, 460, { wobble: 0.2 + 0.8 * k.at('b', 3), speed: 0.2, fling: 0.6 * k.at(k.cue('b', 2), 4, 'in'), flingDir: [1, -0.5] });
        blackHole(k, lerp(1500, 1250, k.at('a', 6)), lerp(250, 420, k.at('a', 6)), 44);
      },
    },
    {
      say: '{a}Và nếu Trái Đất đi qua thật gần, trong khoảng gấp đôi khoảng cách từ Trái Đất tới Mặt Trăng, lực thuỷ triều của hố đen sẽ kéo phía gần và phía xa của hành tinh với sức mạnh chênh lệch nhau. {b}Trái Đất sẽ bị kéo dài ra, rồi xé vụn, {c}từ rất lâu trước khi chạm tới chân trời sự kiện.',
      sfx: [['boom', 'b', 0.25]],
      draw(k) {
        space(k, { n: 80 });
        chapterTag(k, 'Chương 3 · Đếm ngược'); hypo(k); countdown(k, 'TRƯỜNG HỢP 3 · RẤT GẦN');
        blackHole(k, 1400, 540, 60);
        earthTorn(k, 700, 540, 170, k.at('a', 8, 'in'), k.at('b', 4), 1400, 540);
        label(k, '~800.000 KM ≈ 2 lần tới Mặt Trăng', W / 2, 960, 'a', { size: 44 });
        k.text('ước tính theo công thức giới hạn thuỷ triều', W / 2, 1030, { size: 26, color: P.mute, fx: 'fade', p: k.at('a', 0.6) });
      },
    },
    {
      say: '{a}Nhưng trường hợp thứ ba gần như không thể xảy ra, vì vũ trụ quá rộng và Trái Đất quá nhỏ. {b}Điều thật sự đáng sợ, lại nằm ở trường hợp thứ hai. Không phải bị nuốt. Không phải bị xé. {c}Mà là bị thả trôi.',
      tail: 1.4,
      draw(k) {
        space(k, { n: 120 });
        chapterTag(k, 'Chương 3 · Đếm ngược');
        const c = k.at('c', 3, 'inOut');
        k.dot(lerp(960, 1700, c), 540, lerp(60, 10, c), '#FFD34E', 1);
        earth(k, lerp(960, 420, c), lerp(400, 560, c), 70, { spin: 0.02 });
        bigNum(k, 'BỊ THẢ TRÔI', W / 2, 920, 'c', { size: 110, color: P.cream });
      },
    },

    // ================= CHƯƠNG 4 =================
    {
      chapter: 'Điều đáng sợ nhất: bị thả trôi',
      say: '{a}Nếu hố đen hất Trái Đất ra khỏi quỹ đạo, chúng ta sẽ trở thành một hành tinh lang thang, {b}trôi giữa các vì sao, không còn ngôi sao nào sưởi ấm.',
      transition: 'fade',
      draw(k) {
        space(k, { n: 200, drift: 20 });
        chapterTag(k, 'Chương 4 · Bị thả trôi');
        earth(k, 960, 540, 230, { spin: 0.01, ice: 0.25 * k.at('b', 4) });
        k.dot(1750, 160, lerp(18, 4, k.at('a', 8)), '#FFD34E', 1);
        label(k, 'HÀNH TINH LANG THANG', W / 2, 960, 'a', { size: 60 });
      },
    },
    {
      say: '{a}Mặt Trời sẽ nhỏ dần trên bầu trời, cho tới khi chỉ còn là một ngôi sao sáng hơn những ngôi sao khác một chút. {b}Không còn ngày. Không còn mùa. Biển bắt đầu đóng băng từ mặt xuống. {c}Theo nhà vật lý Fred Adams, phải mất khoảng một triệu năm, đại dương mới đóng băng hoàn toàn.',
      draw(k) {
        const night = k.at('a', 6, 'inOut');
        k.ctx.fillStyle = `rgb(${Math.round(lerp(120, 11, night))},${Math.round(lerp(170, 16, night))},${Math.round(lerp(210, 38, night))})`; k.ctx.fillRect(0, 0, W, 620);
        if (night > 0.5) space(k, { n: 140, bottom: P.space });
        k.dot(1500, lerp(180, 200, night), lerp(60, 5, night), '#FFD34E', 1);
        k.ctx.fillStyle = '#0B3A52'; k.ctx.fillRect(0, 620, W, 460);
        const ice = k.at('b', 6);
        k.ctx.fillStyle = 'rgba(225,240,250,0.92)'; k.ctx.fillRect(0, 620, W * ice, 30 + 60 * ice);
        chapterTag(k, 'Chương 4 · Bị thả trôi');
        bigNum(k, '~1 TRIỆU NĂM', W / 2, 860, 'c', { size: 90, color: P.cream });
        label(k, 'để đại dương đóng băng hoàn toàn', W / 2, 960, 'c', { size: 40 });
        src(k, 'Laughlin & Adams (2000) · ĐH Michigan', { y: 1050 });
      },
    },
    {
      say: '{a}Nhưng có một chi tiết các nhà khoa học hay nhắc tới: dưới lớp băng dày, lòng đất vẫn còn ấm nhờ nhiệt từ bên trong hành tinh. {b}Ở những miệng phun thuỷ nhiệt dưới đáy biển, nơi sự sống không cần ánh Mặt Trời, có thể vẫn còn những sinh vật tiếp tục sống. {c}Trong bóng tối hoàn toàn.',
      draw(k) {
        ventSection(k, k.at('b', 2));
        chapterTag(k, 'Chương 4 · Bị thả trôi');
        chip(k, 'GIẢ THUYẾT', W - 60, 130, { align: 'right', bg: P.orange });
        label(k, 'lớp băng', 160, 250, 'a', { size: 36, color: P.ink, outline: '#DDEBF3', align: 'left' });
        label(k, 'miệng phun thuỷ nhiệt', 1500, 620, 'b', { size: 40, color: '#7CF5E0' });
      },
    },
    {
      say: '{a}Đó là lý do câu trả lời cho câu hỏi đầu video lại đáng sợ đến vậy. {b}Một hố đen không cần chạm vào chúng ta. Nó chỉ cần đi ngang qua.',
      tail: 1.2,
      draw(k) {
        space(k, { n: 200 });
        earth(k, 760, 600, 160, { spin: 0.01, ice: 0.85 });
        blackHole(k, lerp(1500, 1820, k.at('a', 8)), lerp(260, 140, k.at('a', 8)), 24);
        bigNum(k, 'CHỈ CẦN ĐI NGANG QUA', W / 2, 960, 'b', { size: 80, color: P.cream });
      },
    },

    // ================= CHƯƠNG 5 =================
    {
      chapter: 'Liệu chuyện này có xảy ra?',
      say: '{a}Vậy chúng ta có nên lo không? {b}Hố đen gần nhất mà con người biết chắc, Gaia BH1, cách chúng ta một nghìn năm trăm sáu mươi năm ánh sáng. {c}Và trong Ngân Hà có khoảng hàng trăm tỷ ngôi sao. Một trăm triệu hố đen, giữa hàng trăm tỷ ngôi sao, là cực kỳ thưa thớt.',
      transition: 'fade',
      draw(k) {
        space(k, { n: 160 });
        chapterTag(k, 'Chương 5 · Có xảy ra không');
        k.dot(200, 400, 16, '#FFD34E'); label(k, 'Mặt Trời', 200, 470, 'b', { size: 34 });
        blackHole(k, 1720, 400, 22); label(k, 'Gaia BH1', 1720, 470, 'b', { size: 34 });
        scaleBar(k, 230, 1690, 400, '1.560 NĂM ÁNH SÁNG', { p: k.at('b', 1.5) });
        const c = k.at('c', 1);
        for (let i = 0; i < 600; i++) k.dot(160 + k.rand(i + 8000) * 1600, 640 + k.rand(i + 8100) * 330, 2.5, i === 300 ? '#000' : '#E9EEF5', c * (i === 300 ? 1 : 0.6));
        k.dot(160 + k.rand(8300) * 1600, 640 + k.rand(8400) * 330, 9, P.red, c);
        label(k, '1 hố đen : ~1.000+ ngôi sao', W / 2, 1030, 'c', { size: 40, color: P.gold });
      },
    },
    {
      say: '{a}Ngay cả một ngôi sao bình thường đi xuyên qua đám mây Oort cũng chỉ xảy ra cách nhau rất nhiều thế hệ loài người. {b}Còn một hố đen đi xuyên vào giữa Hệ Mặt Trời, khả năng ấy nhỏ đến mức các nhà khoa học không xếp nó vào danh sách mối đe doạ.',
      draw(k) {
        space(k, { n: 100 });
        chapterTag(k, 'Chương 5 · Có xảy ra không');
        k.ctx.strokeStyle = 'rgba(245,241,230,0.5)'; k.ctx.lineWidth = 4; k.ctx.beginPath(); k.ctx.moveTo(120, 560); k.ctx.lineTo(1800, 560); k.ctx.stroke();
        for (let i = 0; i < 40; i++) k.dot(120 + i * 42, 560, 4, P.mute, 0.8);
        bigNum(k, 'KHÔNG NẰM TRONG', W / 2, 330, 'b', { size: 80, color: P.cream });
        bigNum(k, 'DANH SÁCH ĐE DOẠ', W / 2, 450, 'b', { size: 80, color: P.gold });
      },
    },
    {
      say: '{a}Hố đen lớn nhất trong thiên hà của chúng ta thì nằm yên ở trung tâm Ngân Hà, cách hai mươi bảy nghìn năm ánh sáng. Nó nặng hơn bốn triệu lần Mặt Trời. {b}Năm 2022, con người lần đầu tiên chụp được ảnh của nó. {c}Đây là phiên bản năm 2024, chụp bằng ánh sáng phân cực, cho thấy cả từ trường đang xoắn quanh mép vực.',
      draw(k) {
        fill(k, '#000');
        k.photo('sgr-a', 420, 0, 1080, 1080, { zoom: [1.0, 1.12], p: k.at('b', 1) });
        chip(k, 'ẢNH THẬT · SAGITTARIUS A*', 60, 70, { bg: P.gold });
        label(k, '4,3 TRIỆU × MẶT TRỜI', 60, 200, 'a', { size: 44, align: 'left' });
        label(k, '27.000 năm ánh sáng', 60, 270, 'a', { size: 36, align: 'left', color: P.mute });
        label(k, 'ánh sáng phân cực · 2024', W - 60, 200, 'c', { size: 36, align: 'right', color: P.gold });
      },
    },
    {
      say: '{a}Ba năm trước đó, năm 2019, cùng nhóm nghiên cứu đã công bố bức ảnh hố đen đầu tiên trong lịch sử: {b}hố đen ở trung tâm thiên hà M87, cách chúng ta năm mươi lăm triệu năm ánh sáng, nặng khoảng sáu tỷ rưỡi lần Mặt Trời. {c}Chiếc vòng lửa ấy là ánh sáng của vật chất đang xoáy quanh mép vực, ngay trước khi biến mất mãi mãi.',
      draw(k) {
        fill(k, '#000');
        k.photo('m87', 420, 0, 1080, 1080, { zoom: [1.0, 1.15], p: k.at('a', 1) });
        chip(k, 'ẢNH THẬT · M87* · 2019', 60, 70, { bg: P.gold });
        label(k, '6,5 TỶ × MẶT TRỜI', 60, 200, 'b', { size: 44, align: 'left' });
        label(k, '55 triệu năm ánh sáng', 60, 270, 'b', { size: 36, align: 'left', color: P.mute });
      },
    },

    // ================= KẾT =================
    {
      say: '{a}Quay lại năm 2011. Ngôi sao ở Chile đã tắt về như cũ. Thứ vô hình kia vẫn đang trôi, ở đâu đó cách chúng ta hơn năm nghìn năm ánh sáng. {b}Và ngay lúc này, giữa một trăm triệu kẻ lang thang như thế, có một hạt bụi xanh nhỏ bé vẫn quay đều quanh ngôi sao của nó.',
      tail: 1.4,
      transition: 'fade',
      draw(k) {
        space(k, { n: 220 });
        const b = k.at('b', 5, 'inOut');
        lightCurve(k, 260, 640, 1400, 300, 1, { alpha: 1 - b });
        k.dot(1250, 330, 6, '#FFFFFF', 1 - b);
        earth(k, W / 2, 540, lerp(4, 60, b), { spin: 0.02 });
        k.dot(W / 2, 540, lerp(4, 90, b), '#5FB0E8', 0.15 * b);
      },
    },
    {
      say: '{a}Nếu các nhà khoa học phát hiện một hố đen đang tiến về Hệ Mặt Trời, trăm năm nữa mới tới: {b}bạn muốn được biết ngay, {c}hay thà không bao giờ biết? {d}Viết câu trả lời của bạn ở phần bình luận.',
      draw(k) {
        space(k, { n: 160 });
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(W / 2 - 3, 160, 6, 700);
        blackHole(k, W / 2, 560, 40);
        bigNum(k, 'BIẾT NGAY', W / 4, 560, 'b', { size: 80, color: P.gold });
        bigNum(k, 'KHÔNG BAO GIỜ BIẾT', W * 3 / 4, 560, 'c', { size: 64, color: P.cream });
        bigNum(k, 'BẠN CHỌN?', W / 2, 960, 'd', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Tập sau trên Hạt Bụi Xanh: {b}Megalodon, con cá mập lớn nhất từng tồn tại. Liệu nó có còn sống, đâu đó dưới đáy biển sâu? {c}Đăng ký kênh để không bỏ lỡ.',
      tail: 2.2,
      draw(k) {
        ocean(k, { depth: 0.9, snow: 90 });
        label(k, 'TẬP SAU', W / 2, 110, 'a', { size: 60, color: P.mute });
        shark(k, lerp(2300, 1000, k.at('b', 3, 'out')), 520, 1200, { swim: 0.6 });
        diver(k, 360, 780, 120, { color: '#D9E4EC' });
        bigNum(k, 'MEGALODON CÒN SỐNG?', W / 2, 900, 'b', { size: 80, color: P.cream });
        chip(k, '🔔 ĐĂNG KÝ HẠT BỤI XANH', W / 2 - 230, 1010, { bg: P.gold, p: k.at('c', 0.6) });
      },
    },
  ],
};
