// Hạt Bụi Xanh · tập 4 — 24 Giờ Cuối Cùng Của Loài Khủng Long (kịch bản + bảng nguồn: kich-ban.md, 11/11/2026)
// Fact check (nguồn chính):
// - Va chạm ~66 triệu năm trước (Renne et al. 2013, Science); tiểu hành tinh ~10 km, ~20 km/s; hố Chicxulub ~180 km, bị vùi dưới ~1 km đá vôi.
// - Góc ~60° từ hướng đông bắc, góc tạo nhiều khí làm đổi khí hậu nhất (Collins et al. 2020, Nature Communications).
// - Tiểu hành tinh giàu carbon từ ngoài quỹ đạo Sao Mộc (Fischer-Gödde et al. 2024, Science, đồng vị ruthenium). Bennu ~490 m (NASA OSIRIS-REx).
// - Iridium ở Gubbio, Ý (Alvarez et al. 1980, Science); hố xác nhận 1991 (Hildebrand et al., Geology) từ dữ liệu khảo sát dầu khí Pemex.
// - Tanis, Bắc Dakota (~3.000 km): hạt thuỷ tinh rơi sau ~13–20 phút, mắc trong mang cá (DePalma et al. 2019, PNAS; một số chi tiết còn tranh cãi);
//   chết vào mùa xuân Bắc bán cầu (During et al. 2022, Nature).
// - Sóng thần cao ~1,5 km sau ~10 phút; năng lượng tới 30.000 lần sóng thần Ấn Độ Dương 2004; tới hầu hết bờ biển trong 48 giờ (Range et al. 2022, AGU Advances).
// - Khoan miệng hố 2016 (IODP Expedition 364): ~130 m vật liệu lấp miệng hố trong ngày đầu, thiếu đá chứa lưu huỳnh (Gulick et al. 2019, PNAS).
// - Bầu trời nóng rực: Robertson et al. 2004 (giả thuyết); phản biện Goldin & Melosh 2009 → nói rõ còn tranh luận.
// - Bụi silicat mịn: quang hợp gần như ngừng ~1,7 năm, lạnh tới ~15°C (Senel et al. 2023, Nature Geoscience); lạnh ≥26°C, 3–16 năm dưới mức đóng băng (Brugger et al. 2017, GRL).
// - Chỉ ~13% bề mặt Trái Đất đủ giàu hydrocarbon để gây tuyệt chủng hàng loạt (Kaiho & Oshima 2017, Scientific Reports — giả thuyết).
// - Sự sống trở lại miệng hố trong vài năm, hệ sinh thái hồi phục ~30.000 năm (Lowery et al. 2018, Nature). DART: 6,1 km/s, quỹ đạo Dimorphos ngắn đi 32 phút (NASA 2022).
import { P, fill, space, earth, human, landmark81, plane, trex, bigNum, label, src, chip, chapterTag, scaleBar, vnRoute,
  asteroid, triceratops, mammal, bird, cretaceous, ejectaRain, craterSection, tsunami, fishFossil, countdown, supernova, thermometer } from '/channel/hat-bui-xanh.js';
import * as thumbs from '/videos/090-24-gio-cuoi-cung-cua-khung-long/thumbs.js';

const W = 1920, H = 1080;
const lerp = (a, b, p) => a + (b - a) * p;
// Ảnh Trái Đất thật (Apollo 17), cắt tròn theo đĩa (đĩa chiếm ~85% khung ảnh).
const earthPhoto = (k, x, y, r) => { const s = r / 0.85; k.ctx.save(); k.ctx.beginPath(); k.ctx.arc(x, y, r, 0, Math.PI * 2); k.ctx.clip(); k.photo('trai-dat-that', x - s, y - s, s * 2, s * 2, { zoom: [1, 1] }); k.ctx.restore(); };
const ROCK = '#4A433C';
// Màn tối dần (bầu trời bị che) phủ lên cảnh.
const darken = (k, a) => { k.ctx.fillStyle = `rgba(8,6,6,${a})`; k.ctx.fillRect(0, 0, W, H); };

export default {
  meta: {
    title: '24 Giờ Cuối Cùng Của Loài Khủng Long',
    description: 'Mùa xuân, 66 triệu năm trước. Những hạt thuỷ tinh nóng rơi từ trời xuống một bờ sông ở Bắc Mỹ, mắc vào mang những con cá đang thở. Ba nghìn km về phía nam, một tảng đá rộng 10 km vừa chạm đất.\n\nĐi qua 24 giờ cuối cùng của thời đại khủng long, từng giây, từng phút, từng giờ: tiểu hành tinh Chicxulub lớn cỡ nào, chuyện gì xảy ra ở giây số 0, vì sao bầu trời đỏ rực, và vì sao những con khủng long khổng lồ chết còn tổ tiên nhỏ bé của chúng ta sống sót. Mọi con số đều có nguồn bên dưới.',
    footer: '📚 Nguồn tham khảo\n• Renne et al. (2013), Science – niên đại va chạm\n• Collins et al. (2020), Nature Communications – góc va chạm\n• Fischer-Gödde et al. (2024), Science – thành phần tiểu hành tinh\n• Alvarez et al. (1980), Science – lớp iridium\n• Hildebrand et al. (1991), Geology – xác nhận hố Chicxulub\n• DePalma et al. (2019), PNAS; During et al. (2022), Nature – địa điểm Tanis, mùa va chạm\n• Range et al. (2022), AGU Advances – sóng thần\n• Gulick et al. (2019), PNAS – ngày đầu tiên trong miệng hố\n• Robertson et al. (2004); Goldin & Melosh (2009) – tranh luận về bầu trời nóng\n• Senel et al. (2023), Nature Geoscience; Brugger et al. (2017), GRL – mùa đông va chạm\n• Kaiho & Oshima (2017), Scientific Reports – vị trí va chạm\n• Lowery et al. (2018), Nature – sự sống trở lại miệng hố\n• NASA – sứ mệnh DART, OSIRIS-REx\n\n🌍 Hạt Bụi Xanh — khoa học về những thứ khổng lồ, cổ xưa và đáng sợ trên hạt bụi xanh của chúng ta. Video mới mỗi ngày lúc 20:00.',
    links: [['▶ Tập trước: Megalodon còn sống không?', '085-megalodon-con-song-khong']],
    tags: ['khủng long tuyệt chủng', 'khủng long', 'tiểu hành tinh chicxulub', 'thiên thạch giết khủng long', 'vì sao khủng long tuyệt chủng', 'ngày cuối cùng của khủng long', 'chicxulub', 't rex', 'tiểu hành tinh', 'khoa học', 'hạt bụi xanh'],
    hashtags: ['khunglong', 'khoahoc', 'vutru', 'hatbuixanh'],
    categoryId: '28', lang: 'vi',
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.35, tail: 0.8, pause: 0.35, transition: 'cut', camera: 0.04,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
  },
  thumbnail: thumbs.a,
  scenes: [
    // ================= MỞ ĐẦU =================
    {
      chapter: 'Mở đầu: bờ sông ở Bắc Dakota',
      say: '{a}Bạn đang đứng bên một con sông, ở nơi mà ngày nay là bang Bắc Dakota, nước Mỹ. {b}Sáu mươi sáu triệu năm trước. Mùa xuân. {c}Bên kia sông, một con Triceratops đang cúi xuống uống nước. {d}Bạn không biết rằng, cách đó ba nghìn km về phía nam, một thứ vừa chạm đất.',
      draw(k) {
        cretaceous(k, { sky: 'calm', y: 700 });
        triceratops(k, lerp(1500, 1380, k.at('c', 4, 'inOut')), 790, 560, { flip: true, color: '#55603C', lw: 4 });
        countdown(k, 'MÙA XUÂN · 66 TRIỆU NĂM TRƯỚC', { p: k.at('b', 0.6), size: 40 });
        k.ctx.fillStyle = `rgba(255,236,190,${0.5 * k.at('d', 0.3) * (1 - k.at(k.cue('d', 0.4), 1.5))})`; k.ctx.fillRect(0, 0, W, H);
      },
    },
    {
      say: '{a}Chưa đầy nửa giờ sau, những hạt thuỷ tinh nhỏ li ti bắt đầu rơi từ trên trời xuống. {b}Chúng rơi xuống mặt sông, xuống lá cây, và lọt vào mang những con cá đang thở. {c}Sáu mươi sáu triệu năm sau, các nhà khoa học tìm thấy chính những hạt thuỷ tinh ấy, vẫn còn mắc trong mang cá hoá thạch.',
      draw(k) {
        if (k.t < k.cue('c')) {
          cretaceous(k, { sky: 'dusk', y: 700 });
          ejectaRain(k, k.at('a', 3), { n: 60 });
          for (let i = 0; i < 40; i++) { const ph = (k.rand(i + 50) + k.t * 0.25) % 1; k.dot(k.rand(i + 70) * W, ph * H, 3, '#FFE7A8', 0.8 * k.at('b', 1)); }
        } else {
          fill(k, '#C9B58E');
          for (let i = 0; i < 60; i++) k.dot(k.rand(i + 900) * W, k.rand(i + 960) * H, 6 + 20 * k.rand(i + 990), '#B49A70', 0.5);
          fishFossil(k, W / 2, 540, 1100, { beads: k.at(k.cue('c', 1.5), 2.5) });
          label(k, 'hạt thuỷ tinh trong mang cá', W / 2 + 300, 330, k.cue('c', 2), { size: 46, color: P.gold });
          chip(k, 'HÌNH MINH HOẠ', 60, 70, { bg: P.cream });
        }
      },
    },
    {
      say: '{a}Đó là ngày cuối cùng của thời đại khủng long. {b}Chỉ một ngày. Nhưng nó mở đầu cho sự biến mất của khoảng ba phần tư số loài sinh vật trên Trái Đất. {c}Hôm nay, chúng ta sẽ đi qua hai mươi tư giờ ấy. Từng giây, từng phút, từng giờ.',
      sfx: [['boom', 'b', 0.2]],
      draw(k) {
        space(k, { n: 140 });
        earthPhoto(k, W / 2, 560, 300);
        bigNum(k, '~75% SỐ LOÀI', W / 2, 180, 'b', { size: 110, color: P.gold });
        countdown(k, '24:00:00', { x: W / 2, y: 960, align: 'center', size: 80, p: k.at('c', 0.6) });
      },
    },
    {
      say: '{a}Và đến cuối video, bạn sẽ hiểu vì sao một tảng đá rộng mười km có thể giết những sinh vật lớn nhất từng đi trên mặt đất, {b}trong khi tổ tiên nhỏ bé của chúng ta lại sống sót.',
      draw(k) {
        fill(k, '#1A1512');
        trex(k, 120, 860, 1000 * k.at('a', 1, 'out') + 1, { color: '#C98B5A' });
        mammal(k, 1550, 860, 200, { alpha: k.at('b', 0.8) });
        bigNum(k, 'VÌ SAO KẺ LỚN CHẾT?', W / 2, 180, 'a', { size: 90, color: P.cream });
        bigNum(k, 'KẺ NHỎ SỐNG?', 1550, 700, 'b', { size: 70, color: P.gold });
      },
    },

    // ================= CHƯƠNG 1: MỘT NGÀY TRƯỚC =================
    {
      chapter: 'Một ngày trước: nó ở đâu?',
      say: '{a}Hai mươi tư giờ trước va chạm. {b}Tiểu hành tinh còn cách Trái Đất khoảng một triệu bảy trăm nghìn km. Gấp hơn bốn lần khoảng cách tới Mặt Trăng. {c}Nó lao tới với tốc độ khoảng hai mươi km mỗi giây.',
      transition: 'fade',
      draw(k) {
        space(k, { n: 180 });
        chapterTag(k, 'Chương 1 · Một ngày trước');
        countdown(k, 'CÒN 24 GIỜ', { p: k.at('a', 0.5) });
        earth(k, 260, 560, 70, { spin: 0.02 });
        k.dot(260 + 380 * 0.42, 560 - 60, 14, '#C9C3B8');
        scaleBar(k, 260, 1700, 760, '≈ 1.700.000 KM', { p: k.at('b', 1.5) });
        label(k, 'Mặt Trăng', 260 + 160, 470, 'b', { size: 34, color: P.mute });
        asteroid(k, 1700, 560, 18, { rot: k.gt * 0.3 });
        bigNum(k, '~20 KM/GIÂY', W / 2, 920, 'c', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Hai mươi km mỗi giây nhanh cỡ nào? {b}Quãng đường từ Hà Nội vào Thành phố Hồ Chí Minh, khoảng một nghìn sáu trăm năm mươi km. {c}Nó đi hết trong chưa đầy một trăm giây.',
      draw(k) {
        fill(k, P.space);
        chapterTag(k, 'Chương 1 · Một ngày trước');
        vnRoute(k, 760, 120, 860, k.at('b', 3, 'inOut'));
        const t = Math.min(82, 82 * k.at('c', 3, 'linear'));
        countdown(k, `${t.toFixed(0)} GIÂY`, { x: 1500, y: 540, align: 'center', size: 90, p: k.at('c', 0.4) });
        label(k, 'Hà Nội → TP.HCM ≈ 1.650 km', 1500, 380, 'b', { size: 44 });
      },
    },
    {
      say: '{a}Nó lớn cỡ nào? {b}Khoảng mười km bề ngang. {c}Đặt xuống mặt đất, nó cao hơn đỉnh Everest. {d}Bằng hơn hai mươi toà Landmark 81 chồng lên nhau.',
      draw(k) {
        cretaceous(k, { sky: 'calm', y: 980, river: false, trees: 0 });
        chapterTag(k, 'Chương 1 · Một ngày trước', true);
        const s = 900 / 10000; // px mỗi mét: 10 km = 900 px
        // Everest (8.849 m) cách điệu
        k.ctx.globalAlpha = k.at('c', 0.8);
        k.ctx.beginPath(); k.ctx.moveTo(250, 980); k.ctx.lineTo(560, 980 - 8849 * s); k.ctx.lineTo(900, 980); k.ctx.closePath(); k.ctx.fillStyle = '#7A8796'; k.ctx.fill();
        k.ctx.beginPath(); k.ctx.moveTo(470, 980 - 6500 * s); k.ctx.lineTo(560, 980 - 8849 * s); k.ctx.lineTo(660, 980 - 6400 * s); k.ctx.closePath(); k.ctx.fillStyle = '#F5F1E6'; k.ctx.fill();
        k.ctx.globalAlpha = 1;
        label(k, 'Everest 8.849 m', 560, 980 - 8849 * s - 40, 'c', { size: 36 });
        asteroid(k, 1350, 980 - 450, 450 * k.at('b', 1, 'back') + 1, { rot: 0.4 });
        for (let i = 0; i < 21; i++) landmark81(k, 1800, 980 - i * 461 * s, 461 * s, { alpha: k.at(k.cue('d', i * 0.08), 0.3), color: '#3E5873', lw: 1 });
        bigNum(k, '~10 KM', 1350, 520, 'b', { size: 100, color: P.cream });
        label(k, '21 × Landmark 81', 1790, 980 - 21 * 461 * s - 36, 'd', { size: 34, align: 'right' });
      },
    },
    {
      say: '{a}Nó làm bằng gì? {b}Năm 2024, các nhà khoa học đo đồng vị của kim loại ruthenium trong lớp đất của ngày hôm ấy. {c}Kết luận: đó là một tiểu hành tinh giàu carbon, đến từ vùng xa hơn quỹ đạo Sao Mộc. {d}Một tảng đá tối màu, giống như Bennu, tiểu hành tinh mà tàu vũ trụ của NASA đã bay tới tận nơi để chụp. Bennu chỉ rộng khoảng năm trăm mét. Tảng đá giết khủng long lớn gấp hai mươi lần.',
      draw(k) {
        if (k.t < k.cue('d')) {
          space(k, { n: 160 });
          chapterTag(k, 'Chương 1 · Một ngày trước');
          k.ctx.strokeStyle = 'rgba(245,241,230,0.25)'; k.ctx.lineWidth = 3;
          for (const r of [180, 300, 520]) { k.ctx.beginPath(); k.ctx.arc(420, 560, r, 0, Math.PI * 2); k.ctx.stroke(); }
          k.dot(420, 560, 40, P.gold);
          label(k, 'Sao Mộc', 420 + 520, 470, 'c', { size: 36, color: P.mute });
          asteroid(k, lerp(1500, 1100, k.at('c', 3)), 360, 60, { rot: k.gt * 0.3 });
          label(k, 'GIÀU CARBON', 1300, 860, 'c', { size: 60, color: P.cream });
          src(k, 'Fischer-Gödde et al., Science 2024', { y: 1040 });
        } else {
          k.photo('bennu', 0, 0, W, H, { zoom: [1.0, 1.1], kp: k.at('d', 9, 'linear') });
          chip(k, 'NASA OSIRIS-REx', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
          label(k, 'Bennu · ~500 m', W - 80, 980, k.cue('d', 1.5), { size: 50, align: 'right' });
        }
      },
    },
    {
      say: '{a}Có ai nhìn thấy nó đến không? {b}Không ai biết chắc. Một tảng đá đen như than, giữa nền trời đen. {c}Nhưng trong những giờ cuối, nếu nó tới từ phía bầu trời đêm, nó có thể đã hiện ra như một ngôi sao mới, sáng dần lên mỗi giờ. {d}Không một sinh vật nào trên Trái Đất hiểu điều đó có nghĩa là gì.',
      draw(k) {
        cretaceous(k, { sky: 'dusk', y: 800 });
        darken(k, 0.45);
        const b = k.at('c', 8, 'in');
        k.dot(1300, 260, 3 + 9 * b, '#FFFFFF', 0.4 + 0.6 * k.at('c', 1)); k.dot(1300, 260, 20 + 40 * b, '#FFE9B0', 0.25 * b);
        triceratops(k, 600, 880, 420, { stroke: false, color: '#2E3424' });
        countdown(k, 'CÒN VÀI GIỜ', { p: k.at('c', 0.5) });
      },
    },
    {
      say: '{a}Nếu là hôm nay, con người có làm được gì không? {b}Năm 2022, NASA đã thử: lao một con tàu vũ trụ vào một tiểu hành tinh nhỏ, để xem có đẩy lệch được nó không. {c}Camera trên con tàu gửi về những hình ảnh này trong những giây cuối cùng, khi nó lao tới với tốc độ hơn sáu km mỗi giây. {d}Rồi tín hiệu mất.',
      draw(k) {
        if (k.t < k.cue('c')) {
          space(k, { n: 160 });
          asteroid(k, 1300, 500, 120, { rot: k.gt * 0.2, seed: 930 });
          k.ctx.fillStyle = P.cream; k.ctx.fillRect(lerp(200, 900, k.at('b', 6, 'in')), 560, 60, 30);
          bigNum(k, 'NASA · DART · 2022', W / 2, 900, 'b', { size: 80, color: P.cream });
        } else {
          fill(k, '#000');
          k.clip('dart-lao-toi', 0, 0, W, H, { at: k.cue('d') - 10.4, zoom: [1, 1], hold: true }); // khung đỏ (mất tín hiệu) ở 10,4 s → trùng câu {d}
          chip(k, 'NASA/JHUAPL', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
          label(k, '> 6 KM/GIÂY', W - 80, 980, k.cue('c', 1), { size: 50, align: 'right' });
        }
      },
    },
    {
      say: '{a}Cú đâm làm quỹ đạo của tiểu hành tinh ấy ngắn đi ba mươi hai phút. {b}Lần đầu tiên, con người đẩy lệch được một thiên thể. {c}Nhưng sáu mươi sáu triệu năm trước, không có ai ở đó. Và tảng đá kia lớn hơn hàng nghìn lần.',
      draw(k) {
        space(k, { n: 160 });
        k.ctx.strokeStyle = 'rgba(245,241,230,0.35)'; k.ctx.lineWidth = 4; k.ctx.setLineDash([12, 12]);
        k.ctx.beginPath(); k.ctx.ellipse(700, 540, 300, 180, 0, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.setLineDash([]);
        k.ctx.strokeStyle = P.gold; k.ctx.beginPath(); k.ctx.ellipse(700, 540, 300 - 30 * k.at('a', 1.5), 180 - 18 * k.at('a', 1.5), 0, 0, Math.PI * 2); k.ctx.stroke();
        asteroid(k, 700, 540, 70, { seed: 931 });
        const a = k.gt * 0.8; asteroid(k, 700 + Math.cos(a) * 270, 540 + Math.sin(a) * 162, 16, { seed: 932 });
        bigNum(k, '−32 PHÚT', 1450, 400, 'a', { size: 110, color: P.gold });
        bigNum(k, 'KHÔNG AI Ở ĐÓ', 1450, 760, 'c', { size: 80, color: P.cream });
      },
    },

    // ================= CHƯƠNG 2: GIÂY SỐ 0 =================
    {
      chapter: 'Giây số 0: khi nó chạm đất',
      say: '{a}Mười giây cuối. Tiểu hành tinh xuyên vào bầu khí quyển. {b}Không khí phía trước nó bị nén lại, nóng hơn cả bề mặt Mặt Trời. {c}Nó đi qua toàn bộ lớp khí quyển chỉ trong vài giây.',
      transition: 'fade',
      sfx: [['whoosh', 'a', 0.3]],
      draw(k) {
        cretaceous(k, { sky: 'dusk', y: 860 });
        chapterTag(k, 'Chương 2 · Giây số 0');
        const p = k.at('a', 9, 'in');
        asteroid(k, lerp(1700, 1000, p), lerp(-120, 520, p), 140, { glow: 0.4 + 0.6 * k.at('b', 1), dir: Math.atan2(640, -700), rot: 0.3 });
        countdown(k, `T − ${Math.max(0, 10 - Math.floor(k.t - k.cue('a'))).toString().padStart(2, '0')} GIÂY`, { p: k.at('a', 0.4) });
        label(k, 'nóng hơn bề mặt Mặt Trời', 600, 200, 'b', { size: 50, color: P.gold });
      },
    },
    {
      say: '{a}Và đây là chi tiết khiến nhiều người rùng mình. {b}Tảng đá rộng mười km. Máy bay chở khách bay ở độ cao khoảng mười km. {c}Nghĩa là khi mặt dưới của nó chạm vào đáy biển, phần trên của nó vẫn còn ở độ cao của một chiếc máy bay.',
      draw(k) {
        fill(k, '#9CC9E0');
        k.ctx.fillStyle = '#2F7EA0'; k.ctx.fillRect(0, 960, W, 120);
        const s = 700 / 10000;
        k.ctx.setLineDash([16, 14]); k.ctx.strokeStyle = 'rgba(14,26,43,0.5)'; k.ctx.lineWidth = 3; k.ctx.beginPath(); k.ctx.moveTo(0, 960 - 10000 * s); k.ctx.lineTo(W, 960 - 10000 * s); k.ctx.stroke(); k.ctx.setLineDash([]);
        plane(k, 1350, 960 - 10000 * s, 220, { alpha: k.at('b', 0.6) });
        label(k, 'máy bay ~10 km', 1460, 960 - 10000 * s - 50, 'b', { size: 40, color: P.ink, outline: '#DCEBF2' });
        const p = k.at('a', k.cue('c', 2.5) - k.cue('a'), 'in');
        asteroid(k, 700, lerp(-400, 960 - 350, p), 350, { glow: 0.8, dir: Math.PI / 2 + 0.3 });
        bigNum(k, '10 KM', 700, 960 - 350, 'c', { size: 90, color: P.cream });
      },
    },
    {
      say: '{a}Giây số không. {b}Nó đâm xuống vùng biển nông ở nơi ngày nay là bán đảo Yucatán, Mexico. {c}Theo một mô phỏng năm 2020, nó lao xuống từ hướng đông bắc, nghiêng khoảng sáu mươi độ. {d}Đó gần như là góc tệ nhất có thể, vì nó hất lên nhiều khí làm thay đổi khí hậu nhất.',
      sfx: [['boom', 'a', 0.45]],
      draw(k) {
        fill(k, '#000');
        supernova(k, W / 2, 560, 1400, k.at('a', 3, 'linear'));
        if (k.t > k.cue('b')) {
          k.ctx.globalAlpha = k.at('b', 0.8);
          fill(k, '#0B1A26');
          // bản đồ vịnh Mexico cách điệu
          k.ctx.fillStyle = '#5E7B52';
          k.ctx.beginPath(); k.ctx.moveTo(0, 0); k.ctx.lineTo(1200, 0); k.ctx.bezierCurveTo(1150, 200, 900, 260, 700, 300); k.ctx.bezierCurveTo(500, 380, 420, 600, 520, 800); k.ctx.bezierCurveTo(700, 900, 900, 820, 1050, 760);
          k.ctx.bezierCurveTo(1150, 650, 1300, 600, 1420, 640); k.ctx.bezierCurveTo(1460, 760, 1400, 900, 1300, 1080); k.ctx.lineTo(0, 1080); k.ctx.closePath(); k.ctx.fill();
          k.ctx.globalAlpha = 1;
          k.ctx.strokeStyle = P.red; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.arc(1180, 700, 70 * k.at('b', 0.8, 'back'), 0, Math.PI * 2); k.ctx.stroke();
          label(k, 'YUCATÁN · MEXICO', 1180, 830, 'b', { size: 44 });
          k.arrow(1700, 120, 1230, 650, { stroke: P.gold, width: 8, head: 30, p: k.at('c', 1.2), seed: 901 });
          label(k, 'từ hướng đông bắc · ~60°', 1880, 70, 'c', { size: 40, color: P.gold, align: 'right' });
          src(k, 'Collins et al., Nature Communications 2020', { y: 1040 });
        }
      },
    },
    {
      say: '{a}Năng lượng giải phóng tương đương hàng tỷ quả bom nguyên tử ném xuống Hiroshima. {b}Không phải nổ rải rác ở nhiều nơi. Mà dồn vào một điểm. {c}Trong vài giây, đá ở đó không chỉ vỡ vụn. Nó bốc hơi.',
      draw(k) {
        fill(k, '#140A06');
        const n = Math.floor(400 * k.at('a', 4, 'linear'));
        for (let i = 0; i < 400; i++) k.dot(160 + (i % 40) * 40, 140 + Math.floor(i / 40) * 40, 7, i < n ? P.orange : 'rgba(255,122,26,0.08)');
        bigNum(k, 'HÀNG TỶ × HIROSHIMA', W / 2, 640, 'a', { size: 90, color: P.cream });
        supernova(k, W / 2, 900, 500, k.at('c', 2, 'linear'));
        label(k, 'mỗi chấm ≈ hàng triệu quả bom', W / 2, 740, 'a', { size: 36, color: P.mute });
        bigNum(k, 'ĐÁ BỐC HƠI', W / 2, 920, 'c', { size: 80, color: P.gold });
      },
    },
    {
      say: '{a}Mặt đất bị khoét thành một cái hố sâu hàng chục km, {b}rồi sụp lại chỉ trong vài phút, để lại một hố va chạm rộng khoảng một trăm tám mươi km. {c}Dài hơn quãng đường từ Hà Nội về Thanh Hoá.',
      draw(k) {
        fill(k, '#1B2550');
        craterSection(k, W / 2, 420, 1500, 520 * (1 - 0.6 * k.at('b', 3, 'inOut')), { p: k.at('a', 2, 'out'), melt: k.t < k.cue('b', 2) });
        bigNum(k, 'SÂU HÀNG CHỤC KM', W / 2, 200, 'a', { size: 80, color: P.cream, p: k.at('a', 0.5) * (1 - k.at('b', 0.5)) });
        bigNum(k, '~180 KM', W / 2, 200, 'b', { size: 110, color: P.gold });
        scaleBar(k, 210, 1710, 380, '', { p: k.at('b', 1.5) });
        label(k, '> Hà Nội → Thanh Hoá', W / 2, 960, 'c', { size: 56 });
      },
    },
    {
      say: '{a}Và cái hố ấy vẫn còn đó. {b}Tàu con thoi của NASA đã đo địa hình vùng này từ quỹ đạo. Đường cong mờ bạn thấy là một phần mép hố, ẩn dưới gần một km đá vôi. {c}Thứ đã giết khủng long nằm ngay dưới chân những người dân Yucatán hôm nay.',
      draw(k) {
        // ảnh 1920×1220 vẽ khít ngang (lệch dọc 70 px); vành hố: tâm ảnh (560, 240), r ≈ 340 (đo trên ảnh)
        const kp = k.at('a', 12, 'inOut'), z = lerp(1, 1.6, kp), fx = lerp(960, 640, kp), fy = lerp(540, 330, kp);
        k.group({ x: W / 2, y: H / 2, s: z }, () => {
          k.photo('ho-chicxulub', -fx, -70 - fy, W, 1220, { zoom: [1, 1] });
          const c = k.at('b', 1.5);
          if (c > 0) { k.ctx.strokeStyle = `rgba(229,56,59,${c})`; k.ctx.lineWidth = 7 / z; k.ctx.setLineDash([18 / z, 12 / z]); k.ctx.beginPath(); k.ctx.arc(560 - fx, 240 - 70 - fy, 340, 0.1, 0.1 + 2.4 * c); k.ctx.stroke(); k.ctx.setLineDash([]); }
        });
        chip(k, 'NASA SRTM', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        label(k, 'mép hố Chicxulub', 1250, 820, k.cue('b', 1), { size: 46, color: P.cream });
      },
    },
    {
      say: '{a}Nhưng suốt hàng chục năm, không ai biết nó ở đó. {b}Năm 1980, hai cha con nhà khoa học Luis và Walter Alvarez tìm thấy trong một lớp đất sét mỏng ở Ý lượng iridium cao bất thường. Đó là kim loại rất hiếm trên bề mặt Trái Đất, nhưng phổ biến trong thiên thạch. {c}Họ đưa ra giả thuyết về một tiểu hành tinh khổng lồ. Nhiều người khi ấy không tin. {d}Phải đến năm 1991, cái hố mới được xác nhận, nhờ dữ liệu của những người đi tìm dầu ở Mexico.',
      draw(k) {
        fill(k, '#2A2118');
        const L = [['#C9B58E', 300], ['#7D6650', 26], ['#B49A70', 300]];
        let y = 220; for (const [c, h] of L) { k.ctx.fillStyle = c; k.ctx.fillRect(160, y, 760, h); y += h; }
        k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 5; k.ctx.strokeRect(150, 512, 780, 46);
        label(k, 'lớp sét · IRIDIUM CAO', 540, 610, 'b', { size: 40, color: P.gold });
        bigNum(k, '1980', 1400, 260, 'b', { size: 100, color: P.cream });
        label(k, 'Luis & Walter Alvarez', 1400, 360, 'b', { size: 44 });
        bigNum(k, 'KHÔNG AI TIN', 1400, 560, 'c', { size: 70, color: P.mute });
        bigNum(k, '1991: TÌM THẤY HỐ', 1400, 800, 'd', { size: 76, color: P.gold });
        src(k, 'Alvarez et al., Science 1980 · Hildebrand et al., Geology 1991', { y: 1040 });
      },
    },
    {
      say: '{a}Lớp đất mỏng ấy có ở khắp nơi trên thế giới. {b}Như ở vách đá này, tại bang Colorado, nước Mỹ. {c}Bên dưới ranh giới là thế giới của khủng long. Bên trên, không còn một hoá thạch khủng long nào nữa.',
      draw(k) {
        k.photo('ranh-gioi-kpg', 0, 0, W, H, { zoom: [1.05, 1.15], pan: [[0.5, 0.45], [0.5, 0.42]], kp: k.at('a', 10, 'linear') });
        chip(k, 'RANH GIỚI K-Pg · COLORADO', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        label(k, 'TRÊN: KHÔNG CÒN KHỦNG LONG', W - 80, 200, k.cue('c', 1.5), { size: 50, align: 'right' });
        label(k, 'DƯỚI: THỜI KHỦNG LONG', W - 80, 980, 'c', { size: 50, align: 'right', color: P.gold });
      },
    },

    // ================= CHƯƠNG 3: NHỮNG PHÚT ĐẦU =================
    {
      chapter: 'Những phút đầu: ai chết trước?',
      say: '{a}Mọi sinh vật trong bán kính hàng trăm km chết gần như ngay lập tức. {b}Một cột khí nóng và đá bốc hơi phụt lên, cao vượt ra khỏi bầu khí quyển. {c}Chúng không kịp thấy gì. Không kịp nghe gì.',
      transition: 'fade',
      draw(k) {
        cretaceous(k, { sky: 'red', y: 880 });
        chapterTag(k, 'Chương 3 · Những phút đầu');
        countdown(k, 'GIÂY THỨ 1', { p: k.at('a', 0.4) });
        const p = k.at('b', 5, 'out');
        const g = k.ctx.createRadialGradient(W / 2, 880, 50, W / 2, 880 - 600 * p, 900 * p + 10);
        g.addColorStop(0, 'rgba(255,240,200,0.95)'); g.addColorStop(0.4, 'rgba(255,140,50,0.8)'); g.addColorStop(1, 'rgba(120,30,10,0)');
        k.ctx.fillStyle = g; k.ctx.beginPath(); k.ctx.ellipse(W / 2, 880 - 500 * p, 260 + 500 * p, 300 + 600 * p, 0, 0, Math.PI * 2); k.ctx.fill();
        label(k, 'vượt khỏi khí quyển', W / 2, 160, 'b', { size: 50 });
      },
    },
    {
      say: '{a}Vài phút sau, sóng địa chấn lan qua lòng đất. {b}Các nhà khoa học ước tính trận động đất ấy mạnh khoảng mười đến mười một độ. {c}Trận động đất mạnh nhất con người từng đo được, ở Chile năm 1960, là 9,5 độ. {d}Và cứ mỗi độ, năng lượng tăng khoảng ba mươi hai lần.',
      draw(k) {
        fill(k, '#140F0C');
        countdown(k, 'PHÚT THỨ 2', { p: k.at('a', 0.4) });
        const amp = 60 + 60 * k.at('b', 1);
        k.ctx.strokeStyle = P.orange; k.ctx.lineWidth = 5; k.ctx.beginPath();
        for (let x = 0; x <= W; x += 6) { const y = 330 + amp * Math.sin(x * 0.05 + k.t * 10) * Math.sin(x * 0.004 + 0.4) * k.at('a', 1); x ? k.ctx.lineTo(x, y) : k.ctx.moveTo(x, y); }
        k.ctx.stroke();
        const bar = (x, h, c, t, cue) => { const p = k.at(cue, 1); k.ctx.fillStyle = c; k.ctx.fillRect(x - 90, 980 - h * p, 180, h * p); label(k, t, x, 940 - h * p, cue, { size: 46 }); };
        bar(560, 120, '#5FB0E8', 'Chile 1960 · 9,5', 'c');
        bar(1360, 420, P.red, 'Chicxulub · ~10–11?', 'b');
        bigNum(k, '×32 MỖI ĐỘ', 560, 640, 'd', { size: 80, color: P.gold });
      },
    },
    {
      say: '{a}Rồi đến cơn mưa từ trời. {b}Một khối đá nóng chảy khổng lồ đã bị bắn lên tận không gian. Giờ nó rơi ngược trở lại, khắp Trái Đất, như hàng tỷ ngôi sao băng. {c}Mỗi giọt nguội đi thành một hạt thuỷ tinh nhỏ. {d}Đó chính là những hạt thuỷ tinh rơi xuống bờ sông ở Bắc Dakota trong phần mở đầu.',
      draw(k) {
        space(k, { n: 100 });
        earth(k, W / 2, 1400, 900, { spin: 0 });
        ejectaRain(k, k.at('b', 3), { n: 90 });
        countdown(k, 'PHÚT THỨ 10', { p: k.at('a', 0.4) });
        if (k.t > k.cue('c')) { for (let i = 0; i < 7; i++) { const x = 400 + i * 180, p = k.at(k.cue('c', i * 0.1), 0.5, 'back'); k.dot(x, 300, 30 * p, '#3A3226'); k.dot(x - 8, 292, 9 * p, '#9BE0C8', 0.8); } label(k, 'hạt thuỷ tinh · cỡ hạt cát', W / 2, 400, 'c', { size: 44 }); }
      },
    },
    {
      say: '{a}Ở Tanis, cách hố va chạm khoảng ba nghìn km, các nhà nghiên cứu cho rằng những hạt thuỷ tinh đầu tiên rơi xuống chỉ sau khoảng mười ba đến hai mươi phút. {b}Cùng lúc ấy, rung chấn làm nước sông dâng lên thành sóng, cuốn cá, cây cối và xác động vật vào cùng một chỗ. {c}Một số chi tiết ở Tanis vẫn còn được tranh luận. Nhưng những hạt thuỷ tinh trong mang cá đã được nhiều nhóm khác xác nhận.',
      draw(k) {
        fill(k, '#E9DCC0');
        k.ctx.fillStyle = '#5E7B52';
        k.ctx.beginPath(); k.ctx.moveTo(300, 80); k.ctx.lineTo(1500, 80); k.ctx.lineTo(1450, 500); k.ctx.bezierCurveTo(1300, 560, 1150, 700, 1150, 900); k.ctx.lineTo(950, 950); k.ctx.bezierCurveTo(900, 700, 700, 650, 520, 560); k.ctx.closePath(); k.ctx.fill();
        k.dot(1180, 880, 16, P.red); label(k, 'Chicxulub', 1180, 950, 'a', { size: 40, color: P.ink, outline: '#E9DCC0' });
        k.dot(900, 200, 16, P.gold); label(k, 'Tanis', 900, 140, 'a', { size: 40, color: P.ink, outline: '#E9DCC0' });
        k.arrow(1170, 860, 915, 225, { stroke: P.red, width: 6, p: k.at('a', 1.5), seed: 902, bend: -0.15 });
        bigNum(k, '~3.000 KM', 1560, 520, 'a', { size: 70, color: P.ink, outline: '#E9DCC0' });
        countdown(k, '13–20 PHÚT', { p: k.at('a', 0.6) });
        chip(k, 'CÒN TRANH LUẬN', 60, 70, { bg: P.orange, p: k.at('c', 0.5) });
        src(k, 'DePalma et al., PNAS 2019 · During et al., Nature 2022', { y: 1040, color: 'rgba(14,26,43,0.7)' });
      },
    },
    {
      say: '{a}Những con cá ấy còn tiết lộ thêm một điều. {b}Năm 2022, một nhóm nhà khoa học soi xương của chúng bằng tia X cực mạnh, đọc các vòng tăng trưởng như đọc vòng gỗ. {c}Kết luận: chúng chết vào mùa xuân. {d}Ở Nam bán cầu khi ấy là mùa thu. Một số nhà khoa học cho rằng điều này có thể đã giúp nhiều loài ở phương nam sống sót tốt hơn.',
      draw(k) {
        fill(k, '#0E1A2B');
        const cx = 620, cy = 540;
        for (let i = 0; i < 9; i++) { k.ctx.strokeStyle = i % 2 ? 'rgba(201,181,142,0.9)' : 'rgba(150,130,100,0.9)'; k.ctx.lineWidth = 14; k.ctx.beginPath(); k.ctx.arc(cx, cy, 40 + i * 30, 0, Math.PI * 2 * k.at(k.cue('b', 1 + i * 0.1), 0.6)); k.ctx.stroke(); }
        k.ctx.strokeStyle = '#7FD38A'; k.ctx.lineWidth = 16; k.ctx.beginPath(); k.ctx.arc(cx, cy, 40 + 9 * 30, -0.6, -0.6 + 1.2 * k.at('c', 1)); k.ctx.stroke();
        bigNum(k, 'MÙA XUÂN', 1400, 400, 'c', { size: 110, color: '#7FD38A' });
        label(k, 'Nam bán cầu: mùa thu', 1400, 640, 'd', { size: 50, color: P.orange });
        src(k, 'During et al., Nature 2022', { y: 1040 });
      },
    },
    {
      say: '{a}Trong khi đó, ở vịnh Mexico, nước biển bị hất tung. {b}Khoảng mười phút sau va chạm, một bức tường nước cao khoảng một km rưỡi lan ra từ miệng hố. {c}Cao gấp hơn ba lần Landmark 81.',
      sfx: [['whoosh', 'b', 0.3]],
      draw(k) {
        fill(k, '#9CC9E0');
        k.ctx.fillStyle = '#2F7EA0'; k.ctx.fillRect(0, 900, W, 180);
        countdown(k, 'PHÚT THỨ 10', { p: k.at('a', 0.4) });
        const s = 700 / 1500;
        tsunami(k, lerp(700, 1300, k.at('b', 6, 'linear')), 900, 1500 * s * k.at('b', 1.5, 'out') + 1, 900);
        landmark81(k, 1650, 900, 461 * s, { alpha: k.at('c', 0.5) });
        label(k, 'Landmark 81', 1650, 900 - 461 * s - 40, 'c', { size: 36, color: P.ink, outline: '#DCEBF2' });
        bigNum(k, '~1,5 KM', 500, 200, 'b', { size: 100, color: P.cream });
      },
    },
    {
      say: '{a}Theo một mô phỏng năm 2022, năng lượng ban đầu của cơn sóng thần này có thể gấp tới ba mươi nghìn lần trận sóng thần Ấn Độ Dương năm 2004. {b}Trong vòng hai ngày, sóng đã chạm tới bờ biển gần như khắp thế giới.',
      draw(k) {
        space(k, { n: 120 });
        earth(k, W / 2, 560, 330, { spin: 0.01 });
        const p = k.at('b', 4, 'out');
        for (let i = 0; i < 4; i++) { const r = (60 + 300 * p) - i * 50; if (r > 0) { k.ctx.strokeStyle = `rgba(95,176,232,${0.7 - i * 0.15})`; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.arc(W / 2 - 120, 480, r, 0, Math.PI * 2); k.ctx.stroke(); } }
        bigNum(k, '×30.000 SÓNG THẦN 2004', W / 2, 140, 'a', { size: 76, color: P.gold });
        countdown(k, '48 GIỜ', { x: W / 2, y: 980, align: 'center', size: 70, p: k.at('b', 0.6) });
        src(k, 'Range et al., AGU Advances 2022', { y: 1040 });
      },
    },

    // ================= CHƯƠNG 4: BẦU TRỜI =================
    {
      chapter: 'Vài giờ sau: vì sao bầu trời đỏ rực?',
      say: '{a}Một giờ sau va chạm. Bạn ở cách đó hàng nghìn km, và bạn vẫn còn sống. {b}Nhưng bầu trời bắt đầu đổi màu. {c}Hàng tỷ mảnh vụn đang rơi xuyên qua khí quyển cùng một lúc, và mỗi mảnh đều nung nóng lớp không khí quanh nó.',
      transition: 'fade',
      draw(k) {
        cretaceous(k, { sky: k.t > k.cue('b') ? 'red' : 'dusk', y: 800 });
        chapterTag(k, 'Chương 4 · Bầu trời');
        countdown(k, 'GIỜ THỨ 1', { p: k.at('a', 0.4) });
        ejectaRain(k, k.at('c', 3), { n: 80, speed: 0.4 });
        triceratops(k, 700, 880, 380, { stroke: false, color: '#2A2A1E' });
      },
    },
    {
      say: '{a}Một số mô phỏng cho rằng trong vài giờ, bầu trời trên nhiều vùng nóng rực như lò nướng. {b}Đủ để làm lá cây bốc cháy. Đủ để giết những con vật không có chỗ trốn. {c}Nhưng đây là điểm các nhà khoa học còn tranh luận. Một số nghiên cứu khác cho rằng chính lớp mảnh vụn đã che bớt sức nóng. Tro than của cháy rừng có được tìm thấy, nhưng không đều khắp mọi nơi.',
      draw(k) {
        cretaceous(k, { sky: 'red', y: 800 });
        ejectaRain(k, 1, { n: 60, speed: 0.4 });
        k.ctx.fillStyle = `rgba(255,90,20,${0.25 * k.at('a', 2)})`; k.ctx.fillRect(0, 0, W, H);
        for (let i = 0; i < 14; i++) { const x = 100 + i * 130, f = k.at(k.cue('b', i * 0.12), 0.6); const h = (40 + 60 * k.rand(i)) * f * (1 + 0.2 * Math.sin(k.gt * 9 + i)); k.ctx.fillStyle = 'rgba(255,170,40,0.85)'; k.ctx.beginPath(); k.ctx.moveTo(x - 25, 820); k.ctx.quadraticCurveTo(x, 820 - h * 2, x + 25, 820); k.ctx.fill(); }
        thermometer(k, 1760, 520, 380, 0.95, { color: P.red });
        chip(k, 'CÒN TRANH LUẬN', 60, 70, { bg: P.orange, p: k.at('c', 0.5) });
        src(k, 'Robertson et al. 2004 · Goldin & Melosh 2009', { y: 1040 });
      },
    },
    {
      say: '{a}Vậy trong ngày đầu tiên, ai có cơ hội sống sót? {b}Những sinh vật nhỏ, biết trốn: chui xuống hang, lặn xuống nước, nấp dưới lớp đất. {c}Một con Tyrannosaurus nặng tám tấn không thể chui xuống đất. Một con thú nhỏ cỡ con chuột thì có thể.',
      draw(k) {
        fill(k, '#3A0E0E');
        k.ctx.fillStyle = '#5E4C3E'; k.ctx.fillRect(0, 700, W, 380);
        ejectaRain(k, 0.7, { n: 40 });
        trex(k, 300, 700, 1000, { color: '#8A5A3A' });
        k.ctx.fillStyle = '#2A1E16'; k.ctx.beginPath(); k.ctx.ellipse(1500, 860, 220, 100, 0, 0, Math.PI * 2); k.ctx.fill();
        mammal(k, 1500, 900, 200 * k.at('c', 0.6, 'back') + 1, {});
        label(k, '8 TẤN · KHÔNG CHỖ TRỐN', 760, 180, 'c', { size: 60, color: P.red });
        label(k, 'HANG DƯỚI ĐẤT', 1500, 1030, k.cue('c', 1.5), { size: 44, color: P.gold });
      },
    },
    {
      say: '{a}Một bộ xương T. rex, dựng lại trong bảo tàng. {b}Dài khoảng mười hai mét. Một trong những kẻ săn mồi lớn nhất từng sống trên cạn. {c}Và loài của nó sống đúng vào những năm cuối cùng của thời đại khủng long, trên chính vùng đất mà những hạt thuỷ tinh đã rơi xuống.',
      draw(k) {
        k.photo('xuong-trex', 0, 0, W, H, { zoom: [1.0, 1.12], pan: [[0.5, 0.45], [0.62, 0.4]], kp: k.at('a', 12, 'linear') });
        chip(k, 'BẢN ĐÚC MẪU MOR 555', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        label(k, '~12 MÉT', W - 80, 980, 'b', { size: 70, align: 'right' });
      },
    },
    {
      say: '{a}Nhưng có một nơi gần như không cảm nhận được ngày hôm ấy. {b}Đáy biển sâu. Ở đó, nhiều nhóm sinh vật nhỏ sống sót tốt hơn hẳn so với những loài sống gần mặt biển. {c}Vì sao bóng tối lại là nơi trú ẩn an toàn nhất? Hãy giữ câu hỏi này. Chúng ta sẽ quay lại nó.',
      draw(k) {
        const { ctx } = k;
        const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#E0662A'); g.addColorStop(0.18, '#1F7A99'); g.addColorStop(0.6, '#03222E'); g.addColorStop(1, '#010B12'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        ejectaRain(k, 0.4, { n: 25 });
        for (let i = 0; i < 30; i++) k.dot(k.rand(i + 300) * W, 820 + k.rand(i + 330) * 220, 3 + 4 * k.rand(i + 360), '#9FE8D8', 0.3 + 0.5 * k.at(k.cue('b', 0.5 + i * 0.03), 0.6));
        label(k, 'MẶT BIỂN', 160, 230, 'a', { size: 40, align: 'left' });
        bigNum(k, 'ĐÁY BIỂN SÂU', W / 2, 640, 'b', { size: 100, color: '#9FE8D8' });
        bigNum(k, 'VÌ SAO?', W / 2, 820, 'c', { size: 80, color: P.gold });
      },
    },
    {
      say: '{a}Ngày đầu tiên ấy đã được ghi lại. Theo đúng nghĩa đen. {b}Năm 2016, một con tàu khoan xuống chính miệng hố Chicxulub và lấy lên những lõi đá. {c}Họ phát hiện: chỉ trong ngày đầu tiên, khoảng một trăm ba mươi mét đá và trầm tích đã lấp vào miệng hố. Bằng một toà nhà hơn bốn mươi tầng. {d}Và trong lõi đá ấy, có một thứ lẽ ra phải có mà không có: lưu huỳnh.',
      draw(k) {
        fill(k, '#0B1A26');
        k.ctx.fillStyle = '#2F7EA0'; k.ctx.fillRect(0, 300, W, 80);
        k.ctx.fillStyle = '#DDE6EE'; k.ctx.fillRect(320, 200, 260, 100); k.ctx.fillRect(430, 60, 20, 140);
        const p = k.at('b', 3);
        k.ctx.fillStyle = '#C9B58E'; k.ctx.fillRect(0, 380, W, 700);
        k.ctx.strokeStyle = P.ink; k.ctx.lineWidth = 8; k.ctx.beginPath(); k.ctx.moveTo(440, 300); k.ctx.lineTo(440, 300 + 700 * p); k.ctx.stroke();
        const c = k.at('c', 2);
        k.ctx.fillStyle = '#7D6650'; k.ctx.fillRect(900, 380, 300, 520 * c);
        bigNum(k, '~130 M', 1050, 300, 'c', { size: 80, color: P.gold });
        label(k, 'trong 24 giờ đầu', 1050, 960, 'c', { size: 44, color: P.ink, outline: '#C9B58E' });
        bigNum(k, 'THIẾU LƯU HUỲNH', 1560, 640, 'd', { size: 60, color: P.red, maxWidth: 600 });
        src(k, 'Gulick et al., PNAS 2019 · IODP Expedition 364', { y: 1040, color: 'rgba(14,26,43,0.75)' });
      },
    },

    // ================= CHƯƠNG 5: SAU 24 GIỜ =================
    {
      chapter: 'Sau ngày cuối: thứ gì thật sự giết khủng long?',
      say: '{a}Lưu huỳnh đã đi đâu? {b}Đá ở Yucatán chứa rất nhiều thạch cao, một loại khoáng giàu lưu huỳnh. Khi bị bốc hơi, lưu huỳnh bay lên tầng cao khí quyển, {c}tạo thành một màn hạt li ti phản chiếu ánh nắng ngược ra vũ trụ. {d}Cùng với muội than từ những đám cháy, và bụi đá mịn như bột.',
      transition: 'fade',
      draw(k) {
        space(k, { n: 120 });
        chapterTag(k, 'Chương 5 · Sau ngày cuối');
        earth(k, W / 2, 620, 320, { spin: 0.01 });
        const veil = k.at('c', 4);
        k.ctx.fillStyle = `rgba(200,180,120,${0.55 * veil})`; k.ctx.beginPath(); k.ctx.arc(W / 2, 620, 360, 0, Math.PI * 2); k.ctx.arc(W / 2, 620, 320, 0, Math.PI * 2, true); k.ctx.fill();
        for (let i = 0; i < 8; i++) { const a = -0.4 + i * 0.1; k.arrow(W / 2 - 900 + i * 40, 100 + i * 20, W / 2 - 330 * Math.cos(a), 620 - 340, { stroke: P.gold, width: 4, p: k.at('c', 1), seed: 910 + i, head: 0 }); }
        k.ctx.fillStyle = `rgba(30,25,20,${0.5 * k.at('d', 3)})`; k.ctx.beginPath(); k.ctx.arc(W / 2, 620, 380, 0, Math.PI * 2); k.ctx.fill();
        label(k, 'lưu huỳnh', 1500, 240, 'b', { size: 50, color: '#E8D27A' });
        label(k, 'muội than · bụi', 1500, 320, 'd', { size: 50, color: P.mute });
      },
    },
    {
      say: '{a}Thứ thật sự giết khủng long không phải vụ nổ. {b}Mà là bóng tối kéo dài sau đó. {c}Theo một nghiên cứu năm 2023, bụi mịn có thể đã khiến cây cối trên cạn và tảo dưới biển gần như ngừng quang hợp trong gần hai năm.',
      draw(k) {
        cretaceous(k, { sky: 'dark', y: 800 });
        darken(k, 0.3 + 0.4 * k.at('b', 3));
        bigNum(k, 'KHÔNG PHẢI VỤ NỔ', W / 2, 260, 'a', { size: 90, color: P.cream });
        bigNum(k, 'MÀ LÀ BÓNG TỐI', W / 2, 420, 'b', { size: 100, color: P.gold });
        countdown(k, '~2 NĂM KHÔNG QUANG HỢP', { x: W / 2, y: 640, align: 'center', size: 60, p: k.at('c', 0.6) });
        src(k, 'Senel et al., Nature Geoscience 2023', { y: 1040 });
      },
    },
    {
      say: '{a}Nhiệt độ toàn cầu tụt mạnh. {b}Tuỳ mô phỏng, nhiệt độ trung bình có thể đã giảm từ mười lăm đến hơn hai mươi độ C. {c}Nhiều vùng nằm dưới mức đóng băng suốt nhiều năm. Một mùa đông không có mùa xuân.',
      draw(k) {
        fill(k, '#1A2230');
        for (let i = 0; i < 80; i++) { const ph = (k.rand(i + 400) + k.t * 0.08) % 1; k.dot(k.rand(i + 430) * W, ph * H, 2 + 3 * k.rand(i + 460), '#DDE8F0', 0.6 * k.at('c', 1)); }
        thermometer(k, 500, 820, 560, lerp(0.75, 0.15, k.at('a', 5, 'inOut')), { color: '#5FB0E8' });
        bigNum(k, '−15 → −26°C', 1250, 400, 'b', { size: 110, color: '#9FD8EA' });
        label(k, 'dưới mức đóng băng nhiều năm', 1250, 600, 'c', { size: 50 });
        src(k, 'Senel et al. 2023 · Brugger et al., GRL 2017', { y: 1040 });
      },
    },
    {
      say: '{a}Không có ánh sáng, cây chết. Cây chết, loài ăn cỏ chết đói. Loài ăn cỏ chết, loài ăn thịt chết theo. {b}Những con vật lớn, cần nhiều thức ăn, chết trước. Gần như không có loài động vật trên cạn nào nặng hơn khoảng hai mươi lăm ký sống sót. {c}Những kẻ còn lại đều nhỏ, ăn hạt, ăn sâu bọ, ăn xác mục: côn trùng, ếch, rùa, cá sấu, và những loài thú nhỏ.',
      draw(k) {
        fill(k, '#151515');
        const steps = [['CÂY', '#3BA55C'], ['ĂN CỎ', '#9C8F6B'], ['ĂN THỊT', '#C98B5A']];
        steps.forEach(([t, c], i) => { const p = k.at(k.cue('a', i * 1.6), 0.6); k.ctx.fillStyle = c; k.ctx.globalAlpha = 1 - 0.75 * k.at(k.cue('a', i * 1.6 + 0.8), 0.8); k.ctx.fillRect(260 + i * 520, 200, 380, 140 * p); k.ctx.globalAlpha = 1; label(k, t, 450 + i * 520, 270, k.cue('a', i * 1.6), { size: 54 }); if (i < 2) k.arrow(660 + i * 520, 270, 760 + i * 520, 270, { stroke: P.cream, width: 6, p: p, seed: 920 + i }); });
        bigNum(k, '> 25 KG: GẦN NHƯ KHÔNG CÒN', W / 2, 520, 'b', { size: 76, color: P.red });
        mammal(k, 600, 880, 160, { alpha: k.at('c', 0.6) });
        bird(k, 1000, 880, 150, { alpha: k.at('c', 0.6) });
        k.ctx.globalAlpha = k.at('c', 0.6); k.ctx.fillStyle = '#6E8B4E'; k.ctx.beginPath(); k.ctx.ellipse(1400, 860, 80, 40, 0, Math.PI, 0); k.ctx.fill(); k.ctx.globalAlpha = 1;
        label(k, 'NHỎ · ĂN HẠT · ĂN SÂU BỌ', W / 2, 980, 'c', { size: 50, color: P.gold });
      },
    },
    {
      say: '{a}Và một nhóm khủng long. {b}Những con khủng long nhỏ, có lông vũ, có mỏ, ăn hạt. {c}Ngày nay, chúng ta gọi chúng là chim. Con gà ngoài sân nhà bạn là hậu duệ của những kẻ đã sống sót qua ngày hôm ấy.',
      sfx: [['sparkle', 'c', 0.25]],
      draw(k) {
        fill(k, '#1A1512');
        trex(k, 200, 900, 900, { color: '#8A5A3A', alpha: 1 - 0.7 * k.at('b', 2) });
        bird(k, 1450, 900, 420 * k.at('b', 1, 'back') + 1, { alpha: 1 - k.at('c', 0.6) });
        if (k.t > k.cue('c')) k.photo('ga-trong', 960, 0, 960, H, { zoom: [1.0, 1.08], p: k.at('c', 0.6) });
        bigNum(k, 'KHỦNG LONG CHƯA CHẾT HẾT', W / 2, 160, 'a', { size: 76, color: P.cream });
        bigNum(k, 'CHIM', 1440, 900, 'c', { size: 120, color: P.gold });
      },
    },

    // ================= CHƯƠNG 6: NẾU RƠI CHỖ KHÁC =================
    {
      chapter: 'Nếu nó rơi chỗ khác thì sao?',
      say: '{a}Có một câu hỏi khiến nhiều nhà khoa học trăn trở: nếu nó rơi xuống một nơi khác thì sao? {b}Năm 2017, hai nhà khoa học Nhật Bản tính toán rằng chỉ khoảng mười ba phần trăm bề mặt Trái Đất có loại đá giàu chất hữu cơ, đủ để tạo ra lượng muội than gây tuyệt chủng hàng loạt. {c}Theo họ, nếu rơi xuống phần còn lại, khủng long có thể đã sống sót.',
      transition: 'fade',
      draw(k) {
        space(k, { n: 120 });
        chapterTag(k, 'Chương 6 · Nếu rơi chỗ khác');
        earth(k, 640, 560, 330, { spin: 0.015 });
        const p = k.at('b', 2);
        k.ctx.save(); k.ctx.beginPath(); k.ctx.arc(640, 560, 330, 0, Math.PI * 2); k.ctx.clip();
        for (let i = 0; i < 9; i++) { k.ctx.fillStyle = `rgba(255,122,26,${0.75 * p})`; k.ctx.beginPath(); k.ctx.ellipse(380 + k.rand(i + 500) * 520, 300 + k.rand(i + 530) * 520, 30 + 30 * k.rand(i + 560), 18 + 20 * k.rand(i + 590), k.rand(i), 0, Math.PI * 2); k.ctx.fill(); }
        k.ctx.restore();
        bigNum(k, '~13%', 1400, 420, 'b', { size: 150, color: P.orange });
        label(k, 'bề mặt đủ "nguy hiểm"', 1400, 560, 'b', { size: 50 });
        chip(k, 'GIẢ THUYẾT', 1260, 720, { bg: P.cream, p: k.at('c', 0.5) });
        src(k, 'Kaiho & Oshima, Scientific Reports 2017', { y: 1040 });
      },
    },
    {
      say: '{a}Đó là một giả thuyết, và không phải ai cũng đồng ý. {b}Cũng có những nhà khoa học cho rằng tiểu hành tinh không đơn độc: cùng thời gian ấy, ở Ấn Độ, những đợt núi lửa phun trào kéo dài hàng trăm nghìn năm đã làm khí hậu xấu đi từ trước. {c}Nhưng phần lớn bằng chứng hiện nay vẫn cho thấy: tiểu hành tinh là đòn quyết định.',
      draw(k) {
        if (k.t < k.cue('c')) {
          k.photo('nui-lua-deccan', 0, 0, W, H, { zoom: [1.0, 1.1], kp: k.at('a', 14, 'linear'), dim: 0.15 });
          label(k, 'những lớp dung nham cổ · cao nguyên Deccan, Ấn Độ', W / 2, 960, 'b', { size: 44, color: P.cream });
        } else {
          fill(k, '#1A1512');
          asteroid(k, W / 2, 420, 180, { glow: 0.6 * k.at('c', 1), rot: 0.4 });
          bigNum(k, 'ĐÒN QUYẾT ĐỊNH', W / 2, 780, 'c', { size: 90, color: P.gold });
        }
      },
    },
    {
      say: '{a}Nếu khủng long còn sống, có lẽ thú có vú vẫn chỉ là những sinh vật nhỏ bé lẩn trốn trong bóng đêm. {b}Có thể không có voi. Không có cá voi xanh. {c}Và có thể, không có con người. Chúng ta có mặt ở đây, một phần, nhờ ngày tồi tệ nhất trong lịch sử sự sống.',
      draw(k) {
        cretaceous(k, { sky: 'dusk', y: 820 });
        darken(k, 0.35);
        triceratops(k, 600, 900, 520, { stroke: false, color: '#2E3424' });
        mammal(k, 1250, 900, 120, { color: '#5A4636' });
        human(k, 1600, 900, 300, { color: P.gold, alpha: 0.25 + 0.75 * k.at('c', 1), stroke: false });
        bigNum(k, 'CON NGƯỜI?', 1600, 520, 'c', { size: 70, color: P.gold });
      },
    },
    {
      say: '{a}Và sự sống không cần nhiều thời gian để quay lại, ngay cả ở nơi bị tàn phá nặng nhất. {b}Năm 2018, các nhà khoa học phát hiện sinh vật đã có mặt trở lại trong chính miệng hố chỉ vài năm sau va chạm, {c}và một hệ sinh thái đầy đủ hồi phục ở đó trong khoảng ba mươi nghìn năm.',
      draw(k) {
        fill(k, '#0B2A30');
        for (let i = 0; i < 40; i++) k.dot(k.rand(i + 700) * W, 400 + k.rand(i + 730) * 500, 4 + 6 * k.rand(i + 760), '#7FD38A', 0.6 * k.at(k.cue('b', i * 0.06), 0.6));
        bigNum(k, 'VÀI NĂM', 600, 300, 'b', { size: 100, color: '#7FD38A' });
        bigNum(k, '~30.000 NĂM', 1350, 300, 'c', { size: 100, color: P.cream });
        src(k, 'Lowery et al., Nature 2018', { y: 1040 });
      },
    },

    // ================= KẾT =================
    {
      say: '{a}Hai mươi tư giờ ấy, tóm lại. {b}Giây số không: tảng đá chạm đất. {c}Phút thứ mười: bức tường nước cao một km rưỡi. {d}Phút thứ hai mươi: mưa thuỷ tinh ở Bắc Dakota. {e}Những giờ sau đó: bầu trời rực đỏ. {f}Và rồi, nhiều năm trong bóng tối. Chỉ có đáy biển sâu là gần như yên lặng.',
      draw(k) {
        fill(k, P.space);
        k.ctx.fillStyle = P.mute; k.ctx.fillRect(200, 560, 1520 * k.at('a', 2), 6);
        const it = [['0 GIÂY', 'chạm đất', 'b'], ['10 PHÚT', 'sóng 1,5 km', 'c'], ['20 PHÚT', 'mưa thuỷ tinh', 'd'], ['VÀI GIỜ', 'trời rực đỏ', 'e'], ['NHIỀU NĂM', 'bóng tối', 'f']];
        it.forEach(([t, s, c], i) => { const x = 260 + i * 350; k.dot(x, 563, 18 * k.at(c, 0.5, 'back'), P.gold); label(k, t, x, 470, c, { size: 46, color: P.gold }); label(k, s, x, 650, c, { size: 40 }); });
        label(k, 'đáy biển sâu: gần như yên lặng', W / 2, 900, k.cue('f', 2), { size: 46, color: '#9FE8D8' });
      },
    },
    {
      say: '{a}Quay lại bờ sông ở Bắc Dakota, mùa xuân sáu mươi sáu triệu năm trước. {b}Con Triceratops ấy không biết rằng nó đang sống những giờ cuối cùng của một thời đại đã kéo dài hơn một trăm sáu mươi triệu năm. {c}Trên hạt bụi xanh này, một thời đại có thể kết thúc chỉ trong một ngày.',
      tail: 1.4,
      transition: 'fade',
      draw(k) {
        const up = k.at('c', 3, 'inOut');
        if (up < 1) { cretaceous(k, { sky: 'calm', y: 700 }); triceratops(k, 1380, 760, 520, { flip: true, stroke: false, color: '#6E7A4E' }); }
        if (up > 0) { k.ctx.save(); k.ctx.globalAlpha = up; space(k, { n: 180 }); earthPhoto(k, W / 2, 540, lerp(300, 110, k.at('c', 9, 'inOut'))); k.ctx.restore(); }
        label(k, '> 160 TRIỆU NĂM', W / 2, 180, 'b', { size: 70, p: k.at('b', 0.6) * (1 - up) });
      },
    },
    {
      say: '{a}Nếu tiểu hành tinh rơi chỗ khác, và khủng long còn sống đến hôm nay, theo bạn: {b}con người có xuất hiện không? {c}Viết câu trả lời của bạn ở phần bình luận.',
      draw(k) {
        fill(k, P.space);
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(W / 2 - 3, 160, 6, 700);
        trex(k, 150, 760, 620, { color: '#C98B5A' });
        human(k, W * 3 / 4, 760, 380, { color: P.gold, stroke: false });
        bigNum(k, 'KHỦNG LONG CÒN SỐNG', W / 4, 220, 'a', { size: 64, color: P.cream });
        bigNum(k, 'CÓ CON NGƯỜI?', W * 3 / 4, 220, 'b', { size: 70, color: P.gold });
        bigNum(k, 'BẠN NGHĨ SAO?', W / 2, 960, 'c', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Tập sau trên Hạt Bụi Xanh: {b}Rãnh Mariana. Nơi sâu nhất trên Trái Đất, gần mười một km dưới mặt biển, nơi ánh sáng Mặt Trời không bao giờ chạm tới. Thứ gì đang sống ở đó? {c}Đăng ký kênh để không bỏ lỡ.',
      tail: 2.2,
      draw(k) {
        const { ctx } = k;
        const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1F7A99'); g.addColorStop(0.35, '#03222E'); g.addColorStop(1, '#000'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        label(k, 'TẬP SAU', W / 2, 110, 'a', { size: 60, color: P.mute });
        const d = k.at('b', 6, 'inOut');
        ctx.strokeStyle = P.gold; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(W / 2, 200); ctx.lineTo(W / 2, 200 + 560 * d); ctx.stroke();
        k.dot(W / 2, 200 + 560 * d, 14, P.gold);
        bigNum(k, `${(10.9 * d).toFixed(1).replace('.', ',')} KM`, W / 2 + 260, 200 + 560 * d, 'b', { size: 70, color: P.cream });
        bigNum(k, 'RÃNH MARIANA: THỨ GÌ SỐNG Ở ĐÓ?', W / 2, 900, 'b', { size: 64, color: P.cream });
        chip(k, '🔔 ĐĂNG KÝ HẠT BỤI XANH', W / 2 - 230, 1015, { bg: P.gold, p: k.at('c', 0.6) });
      },
    },
  ],
};
