// Hạt Bụi Xanh · tập 5 — Rãnh Mariana: Thứ Gì Sống Ở Đáy Sâu 11 Km? (bảng nguồn: kich-ban.md, 12/11/2026)
// Fact check (nguồn chính):
// - Trieste 23/1/1960: Jacques Piccard & Don Walsh, cầu thép ~2 m, kính nứt khi đang lặn, ~20 phút ở đáy (US Navy History & Heritage Command).
//   Piccard kể thấy "cá dẹt"; giới khoa học ngày nay cho rằng gần như không thể (cá không sống quá ~8.200–8.400 m) — có lẽ là hải sâm.
// - Challenger Deep ~10.900 m (các phép đo 10.900–10.935 m); rãnh dài ~2.550 km; áp suất > 1.000 lần mặt biển, "như 50 máy bay jumbo" (NOAA).
// - Ánh nắng tắt hẳn ở ~1.000 m; đáy ~1–4°C (NOAA). ~3/4 sinh vật vùng nước mở phát sáng (Martini & Haddock 2017, Scientific Reports).
// - Sứa ở rãnh Mariana, NOAA Okeanos Explorer EX1605 Dive 04, 24/4/2016 (~3.700 m).
// - Cá ốc Mariana Pseudoliparis swirei (Gerringer et al. 2017, Zootaxa): quay được ở 8.178 m (2017); kỷ lục 8.336 m rãnh Izu-Ogasawara 2022 (UWA/Tokyo, Guinness).
//   Giới hạn ~8.200–8.400 m (Jamieson; Yancey et al. 2014, PNAS — giả thuyết TMAO).
// - Giáp xác Hirondellea gigas tiêu hoá được gỗ (Kobayashi et al. 2012, PLoS ONE). Xenophyophore đơn bào khổng lồ ở >10 km (Scripps/NatGeo 2011).
// - Túi nhựa ở 10.898 m (Chiba et al. 2018, Marine Policy). Chất ô nhiễm PCB trong giáp xác Mariana (Jamieson et al. 2017, Nature Ecology & Evolution).
// - Biển sâu sống sót K-Pg: sinh vật ăn mùn/tuyết biển ít bị ảnh hưởng (Sheehan & Hansen 1986, giả thuyết; trùng lỗ đáy biển tuyệt chủng ít — Culver 2003).
// - Bản đồ đáy biển độ phân giải cao ~1/4 (Seabed 2030). Tín hiệu Wow!: 15/8/1977, kính Big Ear, 72 giây, không lặp lại.
import { P, fill, space, earth, ocean, surface, human, landmark81, plane, bigNum, label, src, chip, chapterTag, scaleBar, vnRoute,
  anglerfish, depthGauge, countdown } from '/channel/hat-bui-xanh.js';
import * as thumbs from '/videos/093-ranh-mariana-thu-gi-song-o-day/thumbs.js';

const W = 1920, H = 1080;
const lerp = (a, b, p) => a + (b - a) * p;
// Ảnh Trái Đất thật (Apollo 17), cắt tròn theo đĩa (đĩa chiếm ~85% khung ảnh).
const earthPhoto = (k, x, y, r) => { const s = r / 0.85; k.ctx.save(); k.ctx.beginPath(); k.ctx.arc(x, y, r, 0, Math.PI * 2); k.ctx.clip(); k.photo('trai-dat-that', x - s, y - s, s * 2, s * 2, { zoom: [1, 1] }); k.ctx.restore(); };
// Ảnh nhỏ đặt trong khung có viền (ảnh gốc < 1280 px).
const framed = (k, name, x, y, w, h, o = {}) => {
  k.ctx.fillStyle = P.cream; k.ctx.fillRect(x - 8, y - 8, w + 16, h + 16);
  k.photo(name, x, y, w, h, { zoom: o.zoom ?? [1, 1.06], focus: o.focus, kp: o.kp, p: o.p });
};
// Quả cầu lặn của Trieste (vẽ) tâm (x, y), bán kính r; crack 0..1 vết nứt kính.
function sphere(k, x, y, r, crack = 0) {
  const { ctx } = k;
  ctx.fillStyle = '#7A8796'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = P.ink; ctx.lineWidth = 6; ctx.stroke();
  ctx.fillStyle = '#B9C7D6'; ctx.beginPath(); ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.25, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0B1A26'; ctx.beginPath(); ctx.arc(x + r * 0.55, y + r * 0.1, r * 0.18, 0, Math.PI * 2); ctx.fill();
  if (crack > 0) { ctx.strokeStyle = P.cream; ctx.lineWidth = 3; ctx.beginPath(); const cx = x + r * 0.55, cy = y + r * 0.1; for (let i = 0; i < 5; i++) { const a = i * 1.3; ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * r * 0.2 * crack, cy + Math.sin(a) * r * 0.2 * crack); } ctx.stroke(); }
}
// Tuyết biển trôi xuống.
function snow(k, n = 80, sp = 30) { for (let i = 0; i < n; i++) { const y = (k.rand(i + 40) * H + (k.gt ?? 0) * sp * (0.5 + k.rand(i))) % H; k.dot(k.rand(i + 90) * W + 10 * Math.sin(k.gt * 0.5 + i), y, 1.5 + 2.5 * k.rand(i + 7), '#DDEEF2', 0.25 + 0.4 * k.rand(i + 3)); } }

export default {
  meta: {
    title: 'Rãnh Mariana: Thứ Gì Sống Ở Đáy Sâu 11 Km?',
    description: 'Năm 1960, hai người đàn ông chạm đáy rãnh Mariana, nơi sâu nhất Trái Đất, và kể rằng họ đã thấy một con cá. Hơn nửa thế kỷ sau, các nhà khoa học nói điều đó gần như không thể.\n\nRãnh Mariana sâu đến mức nào, áp suất dưới đáy khủng khiếp ra sao, sinh vật nào sống ở mỗi tầng sâu, con cá sâu nhất thế giới trông thế nào, và thứ gì con người đã để lại ở đáy biển. Video có nhiều cảnh quay thật từ tàu thám hiểm của NOAA. Mọi con số đều có nguồn bên dưới.',
    footer: '📚 Nguồn tham khảo\n• US Navy History and Heritage Command – chuyến lặn của Trieste (1960)\n• NOAA Ocean Exploration – độ sâu, áp suất, chuyến thám hiểm Marianas 2016\n• Gerringer et al. (2017), Zootaxa – cá ốc Mariana\n• Jamieson et al. – kỷ lục cá sâu nhất 8.336 m (2023); Yancey et al. (2014), PNAS – giới hạn độ sâu của cá\n• Martini & Haddock (2017), Scientific Reports – sinh vật phát sáng\n• Kobayashi et al. (2012), PLoS ONE – giáp xác Hirondellea gigas\n• Chiba et al. (2018), Marine Policy – rác nhựa ở biển sâu\n• Jamieson et al. (2017), Nature Ecology & Evolution – chất ô nhiễm ở rãnh Mariana\n• Sheehan & Hansen (1986), Geology; Culver (2003) – biển sâu sau cú va chạm khủng long\n• Seabed 2030 – bản đồ đáy biển\n\n🌍 Hạt Bụi Xanh — khoa học về những thứ khổng lồ, cổ xưa và đáng sợ trên hạt bụi xanh của chúng ta. Video mới mỗi ngày lúc 20:00.',
    links: [['▶ Tập trước: 24 Giờ Cuối Cùng Của Loài Khủng Long', '090-24-gio-cuoi-cung-cua-khung-long']],
    tags: ['rãnh mariana', 'rãnh mariana có gì', 'đáy đại dương', 'biển sâu', 'sinh vật biển sâu', 'nơi sâu nhất trái đất', 'challenger deep', 'cá biển sâu', 'đại dương', 'khoa học', 'hạt bụi xanh'],
    hashtags: ['ranhmariana', 'bienSau', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi',
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32, speakNumbers: false,
    lead: 0.35, tail: 0.8, pause: 0.35, transition: 'cut', camera: 0.04,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
  },
  thumbnail: thumbs.a,
  scenes: [
    // ================= MỞ ĐẦU =================
    {
      chapter: 'Mở đầu: con cá ở đáy sâu nhất',
      say: '{a}Ngày hai mươi ba tháng một, năm 1960. Giữa Thái Bình Dương. {b}Hai người đàn ông chui vào một quả cầu thép chỉ rộng khoảng hai mét, treo bên dưới con tàu lặn Trieste. {c}Họ sắp đi xuống nơi sâu nhất trên Trái Đất.',
      draw(k) {
        k.photo('trieste', 0, 0, W, H, { zoom: [1.0, 1.12], pan: [[0.5, 0.55], [0.42, 0.6]] });
        chip(k, 'HẢI QUÂN MỸ · 1960', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        label(k, 'tàu lặn Trieste', 700, 860, 'b', { size: 50 });
      },
    },
    {
      say: '{a}Càng xuống sâu, ánh sáng càng tắt dần. {b}Đến khoảng chín nghìn mét, một tiếng nổ lớn vang lên trong khoang. {c}Ô kính quan sát đã nứt. {d}Họ quyết định đi tiếp.',
      sfx: [['boom', 'b', 0.3]],
      draw(k) {
        ocean(k, { depth: lerp(0.3, 1, k.at('a', 6)), snow: 60 });
        const sh = k.t > k.cue('b') && k.t < k.cue('b', 0.6) ? 8 * Math.sin(k.t * 80) : 0;
        sphere(k, 860 + sh, 540, 170, k.at('c', 0.5));
        depthGauge(k, lerp(0, 9000, k.at('a', k.cue('b') - k.cue('a'), 'inOut')));
        bigNum(k, 'KÍNH NỨT', 860, 860, 'c', { size: 90, color: P.red });
      },
    },
    {
      say: '{a}Gần năm tiếng sau, họ chạm đáy. {b}Qua ô cửa nhỏ, Jacques Piccard kể rằng ông nhìn thấy một con cá dẹt, nằm trên lớp bùn. {c}Nhưng hơn nửa thế kỷ sau, các nhà khoa học nói: điều đó gần như không thể.',
      draw(k) {
        ocean(k, { depth: 1, snow: 50 });
        k.ctx.fillStyle = '#1D2A2A'; k.ctx.fillRect(0, 880, W, 200);
        sphere(k, 760, 640, 170, 1);
        depthGauge(k, 10900);
        k.ctx.globalAlpha = k.at('b', 1) * (1 - 0.7 * k.at('c', 1)); k.ctx.fillStyle = '#C9C3B0'; k.ctx.beginPath(); k.ctx.ellipse(1250, 880, 90, 22, 0, 0, Math.PI * 2); k.ctx.fill(); k.ctx.globalAlpha = 1;
        label(k, '"một con cá dẹt"', 1250, 790, 'b', { size: 50, color: P.cream });
        bigNum(k, 'KHÔNG THỂ?', 1250, 300, 'c', { size: 110, color: P.gold });
      },
    },
    {
      say: '{a}Vậy thứ gì thật sự sống dưới đáy rãnh Mariana? {b}Hôm nay, chúng ta sẽ đi xuống, từng tầng một, cho tới đáy. {c}Và ở cuối video, bạn sẽ biết câu trả lời cho câu hỏi còn bỏ ngỏ ở tập trước: vì sao khi khủng long biến mất, đáy biển sâu lại gần như yên lặng.',
      draw(k) {
        ocean(k, { depth: 0.6 });
        bigNum(k, 'THỨ GÌ SỐNG Ở ĐÁY?', W / 2, 260, 'a', { size: 100, color: P.cream });
        label(k, 'từng tầng một, tới đáy', W / 2, 480, 'b', { size: 50, color: P.gold });
        label(k, 'vì sao biển sâu sống sót khi khủng long biến mất?', W / 2, 760, 'c', { size: 46 });
      },
    },

    // ================= CHƯƠNG 1: SÂU CỠ NÀO =================
    {
      chapter: 'Rãnh Mariana sâu đến mức nào?',
      say: '{a}Rãnh Mariana nằm ở tây Thái Bình Dương, gần đảo Guam, cách Philippines gần hai nghìn km về phía đông. {b}Nó là một vết nứt hình lưỡi liềm dài khoảng hai nghìn năm trăm km. Dài hơn cả chiều dài nước Việt Nam. {c}Điểm sâu nhất của nó có tên Challenger Deep.',
      transition: 'fade',
      draw(k) {
        fill(k, '#0B2A3A');
        chapterTag(k, 'Chương 1 · Sâu cỡ nào');
        vnRoute(k, 260, 160, 760, 1);
        label(k, 'Việt Nam ~1.650 km', 420, 960, 'a', { size: 40 });
        k.ctx.strokeStyle = '#03141E'; k.ctx.lineWidth = 34; k.ctx.lineCap = 'round';
        k.ctx.beginPath(); k.ctx.arc(1300, 120, 520, 1.25, 1.25 + 1.4 * k.at('b', 2)); k.ctx.stroke();
        k.ctx.strokeStyle = '#1F7A99'; k.ctx.lineWidth = 6; k.ctx.stroke();
        k.dot(1350, 660, 14, P.gold); label(k, 'Guam', 1440, 660, 'a', { size: 36, align: 'left' });
        k.dot(1190, 640, 16 * k.at('c', 0.5, 'back'), P.red); label(k, 'Challenger Deep', 1190, 720, 'c', { size: 40, color: P.red });
        bigNum(k, '~2.550 KM', 1500, 300, 'b', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Nó sâu khoảng mười nghìn chín trăm mét. {b}Nếu đặt đỉnh Everest xuống đó, đỉnh núi vẫn còn cách mặt biển hơn hai km nước. {c}Bằng khoảng hai mươi ba toà Landmark 81 chồng lên nhau.',
      draw(k) {
        const top = 120, s = 860 / 10900;
        k.ctx.fillStyle = '#9CC9E0'; k.ctx.fillRect(0, 0, W, top);
        const g = k.ctx.createLinearGradient(0, top, 0, H); g.addColorStop(0, '#1F7A99'); g.addColorStop(1, '#010B12'); k.ctx.fillStyle = g; k.ctx.fillRect(0, top, W, H - top);
        chapterTag(k, 'Chương 1 · Sâu cỡ nào', true);
        k.ctx.fillStyle = '#2A2118'; k.ctx.beginPath(); k.ctx.moveTo(0, top); k.ctx.lineTo(500, top); k.ctx.lineTo(820, top + 10900 * s); k.ctx.lineTo(1100, top + 10900 * s); k.ctx.lineTo(1420, top); k.ctx.lineTo(W, top); k.ctx.lineTo(W, H); k.ctx.lineTo(0, H); k.ctx.closePath(); k.ctx.fill();
        const e = k.at('b', 2, 'out');
        k.ctx.globalAlpha = e; k.ctx.fillStyle = '#7A8796'; k.ctx.beginPath(); k.ctx.moveTo(760, top + 10900 * s); k.ctx.lineTo(960, top + (10900 - 8849) * s); k.ctx.lineTo(1160, top + 10900 * s); k.ctx.closePath(); k.ctx.fill(); k.ctx.globalAlpha = 1;
        scaleBar(k, 1240, 1240, top, '', {});
        k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 5; k.ctx.beginPath(); k.ctx.moveTo(1000, top); k.ctx.lineTo(1000, top + (10900 - 8849) * s); k.ctx.stroke();
        label(k, '> 2 km nước', 1030, top + 90, 'b', { size: 40, color: P.gold, align: 'left' });
        label(k, 'Everest', 960, top + (10900 - 8849) * s + 80, 'b', { size: 40 });
        for (let i = 0; i < 23; i++) landmark81(k, 1520, top + 10900 * s - i * 461 * s, 461 * s, { alpha: k.at(k.cue('c', i * 0.06), 0.3), color: '#B9C7D6', lw: 1 });
        bigNum(k, '~10.900 M', 300, 400, 'a', { size: 100, color: P.cream });
        label(k, '23 × Landmark 81', 1560, 260, 'c', { size: 36, align: 'left' });
      },
    },
    {
      say: '{a}Vì sao ở đây lại sâu đến vậy? {b}Đáy Thái Bình Dương là một mảng đá khổng lồ. Ở vùng này, nó thuộc loại đáy biển cổ nhất hành tinh, khoảng một trăm tám mươi triệu năm tuổi, lạnh và nặng. {c}Ở rãnh Mariana, mảng đá ấy trượt chui xuống bên dưới một mảng khác, chìm dần vào lòng Trái Đất. Rãnh sâu chính là nếp gấp nơi đáy biển đang bị kéo xuống.',
      draw(k) {
        const { ctx } = k;
        ctx.fillStyle = '#9CC9E0'; ctx.fillRect(0, 0, W, 300);
        ctx.fillStyle = '#1F5F7A'; ctx.fillRect(0, 300, W, 200);
        ctx.fillStyle = '#8A4A2E'; ctx.fillRect(0, 500, W, 580);
        const sl = k.at('c', 6, 'linear');
        ctx.fillStyle = '#5E4C3E'; ctx.beginPath(); ctx.moveTo(0, 500); ctx.lineTo(1100, 500); ctx.quadraticCurveTo(1250, 520, 1350, 640); ctx.lineTo(1700, 1080); ctx.lineTo(1400, 1080); ctx.quadraticCurveTo(1200, 700, 1050, 620); ctx.lineTo(0, 620); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#7D6650'; ctx.beginPath(); ctx.moveTo(1330, 520); ctx.lineTo(W, 420); ctx.lineTo(W, 1080); ctx.lineTo(1720, 1080); ctx.lineTo(1380, 640); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#C24A2A'; ctx.fillRect(0, 900, 1500, 180);
        for (let i = 0; i < 6; i++) k.arrow(200 + i * 160 + 100 * sl, 560, 300 + i * 160 + 100 * sl, 560, { stroke: P.cream, width: 5, p: k.at('c', 0.6), seed: 940 + i });
        k.arrow(1300, 700, 1480, 940, { stroke: P.gold, width: 8, p: k.at('c', 1), seed: 950 });
        label(k, 'mảng Thái Bình Dương · ~180 triệu năm', 560, 680, 'b', { size: 40 });
        label(k, 'RÃNH', 1330, 470, 'c', { size: 48, color: P.gold });
        chapterTag(k, 'Chương 1 · Sâu cỡ nào', true);
      },
    },
    {
      say: '{a}Để thấy nó sâu cỡ nào, hãy thử rút cạn nước các đại dương, dựa trên bản đồ đáy biển của NASA. {b}Rút xuống một nghìn mét, thềm lục địa lộ ra. Ba nghìn mét, những dãy núi ngầm hiện lên. {c}Đến khoảng chín nghìn mét, chỉ còn vài vệt nước nhỏ, nằm trong các rãnh sâu nhất. Một trong số đó là Mariana.',
      draw(k) {
        fill(k, '#000');
        // clip gốc từ giây 6, mực nước ≈ 80 + 201 m mỗi giây gốc (đọc từ chú thích bị cắt khỏi khung)
        const ts = 6 + k.clip('rut-nuoc', -360, -60, 2640, 1320, { at: 'a', speed: 2.2, zoom: [1, 1.07], pan: [[0.5, 0.5], [0.62, 0.45]] });
        depthGauge(k, Math.min(9750, 80 + 201 * ts), { max: 11000 });
        chip(k, 'DỮ LIỆU NASA', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
      },
    },
    {
      say: '{a}Ở đáy rãnh, mỗi centimet vuông chịu áp suất hơn một nghìn lần so với trên mặt biển. {b}Theo NOAA, nó giống như có khoảng năm mươi chiếc máy bay chở khách cỡ lớn đè lên một người. {c}Một chiếc cốc xốp thả xuống đó sẽ bị ép nhỏ lại chỉ còn bằng một cái chén.',
      draw(k) {
        ocean(k, { depth: 0.9, snow: 40 });
        bigNum(k, '> 1.000 LẦN', W / 2, 180, 'a', { size: 110, color: P.cream });
        human(k, 560, 960, 170, { color: P.gold, stroke: false });
        const n = Math.floor(50 * k.at('b', 3, 'linear'));
        for (let i = 0; i < n; i++) plane(k, 380 + (i % 5) * 72, 760 - Math.floor(i / 5) * 46, 90, { stroke: false });
        label(k, '~50 máy bay jumbo', 560, 220 + 60, 'b', { size: 40, color: P.gold });
        const c = k.at('c', 2, 'inOut'), cw = lerp(150, 70, c), ch = lerp(200, 90, c);
        k.ctx.fillStyle = P.cream; k.ctx.beginPath(); k.ctx.moveTo(1400 - cw / 2, 960 - ch); k.ctx.lineTo(1400 + cw / 2, 960 - ch); k.ctx.lineTo(1400 + cw * 0.35, 960); k.ctx.lineTo(1400 - cw * 0.35, 960); k.ctx.closePath(); k.ctx.globalAlpha = k.at('c', 0.4); k.ctx.fill(); k.ctx.globalAlpha = 1;
        label(k, 'cốc xốp bị ép nhỏ', 1400, 700, 'c', { size: 44 });
        src(k, 'NOAA Ocean Exploration', { y: 1040 });
      },
    },
    {
      say: '{a}Ánh nắng Mặt Trời tắt hẳn ở khoảng một nghìn mét. {b}Bên dưới là bóng tối vĩnh viễn. Nước lạnh chỉ một đến bốn độ C. {c}Lạnh, tối, và bị ép nặng như thế. Vậy mà ở đó vẫn có sự sống.',
      draw(k) {
        const { ctx } = k; const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2E9BC0'); g.addColorStop(0.12, '#0A4A5C'); g.addColorStop(0.3, '#01131C'); g.addColorStop(1, '#000'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        ctx.setLineDash([14, 12]); ctx.strokeStyle = 'rgba(245,241,230,0.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 320); ctx.lineTo(W, 320); ctx.stroke(); ctx.setLineDash([]);
        label(k, '~1.000 m · hết ánh nắng', 80, 290, 'a', { size: 44, align: 'left' });
        bigNum(k, '1–4°C', W / 2, 600, 'b', { size: 120, color: '#9FD8EA' });
        bigNum(k, 'VẪN CÓ SỰ SỐNG', W / 2, 860, 'c', { size: 90, color: P.gold });
      },
    },

    // ================= CHƯƠNG 2: ĐI XUỐNG =================
    {
      chapter: 'Đi xuống: ai sống trong bóng tối?',
      say: '{a}Ở vùng nước tối ấy, hầu hết sinh vật tự tạo ra ánh sáng. {b}Một nghiên cứu năm 2017 ước tính khoảng ba phần tư số sinh vật bơi trong lòng đại dương có thể phát sáng. {c}Như con sứa này, được chụp ở độ sâu hàng trăm mét. Màu đỏ của nó gần như vô hình trong bóng tối.',
      transition: 'fade',
      draw(k) {
        fill(k, '#01090F');
        chapterTag(k, 'Chương 2 · Đi xuống');
        for (let i = 0; i < 60; i++) k.dot(k.rand(i + 200) * W, k.rand(i + 230) * H, 2 + 4 * k.rand(i + 260), i % 3 ? '#7FF0E0' : '#9FB8FF', (0.3 + 0.5 * Math.abs(Math.sin(k.gt * (1 + k.rand(i)) + i))) * k.at('a', 1));
        bigNum(k, '~3/4 PHÁT SÁNG', 480, 300, 'b', { size: 80, color: '#7FF0E0' });
        src(k, 'Martini & Haddock, Scientific Reports 2017', { y: 1040 });
        if (k.t > k.cue('c')) { framed(k, 'sua-phat-sang', 1000, 240, 840, 560, { kp: k.at('c', 8, 'linear') }); chip(k, 'NOAA', 1000, 860, { bg: 'rgba(245,241,230,0.85)', size: 22 }); }
      },
    },
    {
      say: '{a}Xuống sâu hơn nữa. {b}Năm 2016, tàu thám hiểm Okeanos Explorer của NOAA thả robot lặn xuống rãnh Mariana, và quay được sinh vật này ở độ sâu khoảng ba nghìn bảy trăm mét. {c}Một con sứa với những xúc tu dài, và một khối màu đỏ vàng phát sáng ở giữa thân.',
      draw(k) {
        fill(k, '#000');
        k.clip('sua-mariana', 0, 0, W, H, { at: 'a', zoom: [1, 1.04] });
        chip(k, 'NOAA · MARIANA 2016', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        depthGauge(k, 3700);
      },
    },
    {
      say: '{a}Ở đây, thức ăn cực kỳ hiếm. Nên nhiều loài không đi săn. Chúng chờ. {b}Cá cần câu cái mang một chiếc cần phát sáng trên đầu để dụ con mồi tự bơi tới. {c}Còn con đực thì nhỏ hơn nhiều lần. Ở một số loài, khi tìm được con cái, nó cắn vào và dính liền vào cơ thể con cái suốt đời.',
      draw(k) {
        fill(k, '#01070C');
        snow(k, 50, 20);
        anglerfish(k, 900, 560, lerp(500, 900, k.at(0, k.cue('b', 1) , 'inOut')));
        k.dot(lerp(1600, 1440, k.at('b', 6, 'inOut')), 260, 8, '#9FB8FF', 0.8);
        anglerfish(k, 560, 700, 60, { alpha: k.at('c', 0.6) });
        label(k, 'con đực tí hon', 560, 780, 'c', { size: 40, color: P.gold });
        label(k, 'HÌNH MINH HOẠ', 60, 70, 'a', { size: 26, align: 'left', color: P.mute });
      },
    },
    {
      say: '{a}Ở vịnh Mexico, robot lặn bắt gặp sinh vật này. Trông như một con gà không đầu đang bơi. {b}Thật ra, đó là một loài hải sâm. Họ hàng của những con hải sâm nằm im trên đáy biển, nhưng loài này biết bơi, nhờ những chiếc vây mỏng như màng.',
      draw(k) {
        fill(k, '#000');
        k.clip('con-do', 0, 0, W, H, { at: 'a', zoom: [1, 1.04] });
        chip(k, 'NOAA', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        label(k, 'HẢI SÂM BIẾT BƠI', W - 80, 980, 'b', { size: 56, align: 'right' });
      },
    },
    {
      say: '{a}Một con bạch tuộc biển sâu, bò chậm trên lớp bùn mịn, ngoài khơi bờ tây nước Mỹ. {b}Không có ánh sáng, mắt nó gần như không có việc gì để làm. Nó tìm mồi bằng hàng trăm giác hút nhạy cảm trên tám xúc tu.',
      draw(k) {
        fill(k, '#000');
        k.clip('bach-tuoc', -300, -200, 2496, 1404, { at: 'a', zoom: [1, 1] });
        chip(k, 'NOAA', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
      },
    },
    {
      say: '{a}Và trên những vách đá dưới sâu ngoài khơi Hawaii là cả một khu rừng san hô. {b}Không cần ánh nắng, chúng lọc từng mẩu thức ăn nhỏ trôi trong nước. {c}Một số loài san hô biển sâu ở vùng này có thể sống hàng nghìn năm. Lâu hơn bất kỳ cái cây nào ở Việt Nam.',
      draw(k) {
        fill(k, '#000');
        k.clip('lan-hawaii', 0, 0, W, H, { at: 'a', speed: 0.8, zoom: [1, 1.07], pan: [[0.45, 0.5], [0.58, 0.45]] });
        chip(k, 'NOAA · HAWAII 2016', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        label(k, 'HÀNG NGHÌN NĂM', W - 80, 980, 'c', { size: 60, align: 'right', color: P.gold });
      },
    },

    // ================= CHƯƠNG 3: GIỚI HẠN CỦA CÁ =================
    {
      chapter: 'Con cá sâu nhất thế giới trông thế nào?',
      say: '{a}Tiếp tục xuống. Năm, sáu, bảy nghìn mét. {b}Năm 2017, các nhà khoa học công bố một loài cá mới, chỉ sống ở rãnh Mariana: cá ốc Mariana. {c}Một đàn cá ốc tụ lại quanh mồi, hàng nghìn mét dưới mặt biển.',
      transition: 'fade',
      draw(k) {
        fill(k, '#03141E');
        chapterTag(k, 'Chương 3 · Giới hạn của cá');
        depthGauge(k, lerp(5000, 7000, k.at('a', 4)));
        bigNum(k, 'CÁ ỐC MARIANA', 820, 160, 0, { size: 90, color: P.cream });
        if (k.t > k.cue('b')) framed(k, 'ca-oc-2', 160, 290, 1320, 580, { focus: [0.5, 0.47], zoom: [1, 1.08], kp: k.at('b', 14, 'linear'), p: k.at('b', 0.5) });
        chip(k, 'GERRINGER ET AL. 2017', 160, 930, { bg: 'rgba(245,241,230,0.85)', size: 22, p: k.at('c', 0.5) });
      },
    },
    {
      say: '{a}Thân nó mềm, trong suốt như thạch. Không có bong bóng bơi. Xương mềm, chưa cứng hẳn. {b}Chính sự mềm oặt ấy giúp nó chịu được áp suất. Không có khoang khí nào để bị ép bẹp. {c}Năm 2017, một con cá ốc Mariana được quay ở độ sâu tám nghìn một trăm bảy mươi tám mét. Kỷ lục ấy chỉ bị vượt năm 2022, bởi một con cá ốc khác, ở rãnh biển gần Nhật Bản: tám nghìn ba trăm ba mươi sáu mét.',
      draw(k) {
        ocean(k, { depth: 1, snow: 50 });
        const { ctx } = k;
        ctx.fillStyle = P.cream; ctx.fillRect(312, 272, 1296, 456); k.photo('ca-oc-2', 320, 280, 1280, 440, { focus: [0.5, 0.86], zoom: [1, 1.06] });
        label(k, 'không bong bóng bơi', 960, 200, 'a', { size: 44 });
        countdown(k, '8.178 M · 2017', { x: 560, y: 860, align: 'center', size: 56, p: k.at('c', 0.5) });
        countdown(k, '8.336 M · 2022', { x: 1360, y: 860, align: 'center', size: 56, p: k.at(k.cue('c', 6), 0.5) });
        src(k, 'Gerringer et al. 2017 · Jamieson et al. 2023', { y: 1040 });
      },
    },
    {
      say: '{a}Nhưng dưới khoảng tám nghìn bốn trăm mét, chưa ai tìm thấy một con cá nào. {b}Các nhà khoa học cho rằng có một giới hạn hoá học. Để chống lại áp suất, tế bào cá phải tích một chất bảo vệ. Càng sâu, càng cần nhiều. {c}Đến một độ sâu nào đó, lượng chất ấy làm nước tràn vào tế bào, và con cá không thể sống. {d}Vậy con "cá dẹt" mà Piccard thấy năm 1960 là gì? Nhiều nhà khoa học tin rằng đó là một con hải sâm.',
      draw(k) {
        const { ctx } = k; const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#03222E'); g.addColorStop(1, '#000'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        const y = 120 + (8400 / 11000) * 840;
        ctx.fillStyle = 'rgba(229,56,59,0.18)'; ctx.fillRect(0, y, W, H - y);
        ctx.setLineDash([16, 12]); ctx.strokeStyle = P.red; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W - 200, y); ctx.stroke(); ctx.setLineDash([]);
        depthGauge(k, 8400);
        label(k, 'GIỚI HẠN CỦA CÁ ~8.400 M', 760, y - 50, 'a', { size: 56, color: P.red });
        label(k, 'chất bảo vệ tế bào (TMAO) tăng theo độ sâu', 760, 300, 'b', { size: 44 });
        bigNum(k, 'CÁ DẸT = HẢI SÂM?', 760, 520, 'd', { size: 84, color: P.gold });
        chip(k, 'GIẢ THUYẾT', 60, 70, { bg: P.cream, p: k.at('b', 0.5) });
        src(k, 'Yancey et al., PNAS 2014', { y: 1040 });
      },
    },

    // ================= CHƯƠNG 4: DƯỚI 8.400 M =================
    {
      chapter: 'Dưới 8.400 mét còn gì?',
      say: '{a}Dưới giới hạn của cá, sự sống vẫn chưa dừng lại. {b}Đây là Hirondellea gigas, một loài giáp xác nhỏ sống ngay ở đáy Challenger Deep. Chỉ dài vài centimet. {c}Năm 2012, các nhà khoa học Nhật Bản phát hiện nó có những enzyme tiêu hoá được cả gỗ, từ những mẩu cây chìm xuống tận đáy biển.',
      transition: 'fade',
      draw(k) {
        fill(k, '#01070C');
        chapterTag(k, 'Chương 4 · Dưới 8.400 m');
        depthGauge(k, 10900);
        framed(k, 'giap-xac-day', 240, 220, 900, 640, { kp: k.at('b', 10, 'linear'), p: k.at('b', 0.4) });
        chip(k, 'HIRONDELLEA GIGAS', 240, 920, { bg: 'rgba(245,241,230,0.85)', size: 22, p: k.at('b', 0.5) });
        label(k, 'TIÊU HOÁ ĐƯỢC GỖ', 1420, 540, 'c', { size: 56, color: P.gold });
        src(k, 'Kobayashi et al., PLoS ONE 2012', { y: 1040 });
      },
    },
    {
      say: '{a}Còn đây là xenophyophore, một nhóm sinh vật từng được tìm thấy ở độ sâu hơn mười km trong rãnh Mariana. {b}Trông như một miếng bọt biển. Nhưng thật ra, cả khối này chỉ là một tế bào duy nhất. {c}Một tế bào to bằng bàn tay người, có loài to hơn thế.',
      draw(k) {
        fill(k, '#01070C');
        framed(k, 'xenophyophore', 260, 220, 860, 580, { kp: k.at('a', 10, 'linear') });
        chip(k, 'NOAA', 260, 860, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        bigNum(k, '1 TẾ BÀO', 1500, 420, 'b', { size: 110, color: P.cream });
        human(k, 1500, 820, 220, { color: P.gold, stroke: false, alpha: 0 });
        label(k, '≈ bàn tay người', 1500, 580, 'c', { size: 50, color: P.gold });
      },
    },
    {
      say: '{a}Không có ánh sáng, không có cây cỏ. Vậy chúng ăn gì? {b}Câu trả lời rơi từ trên xuống. Xác sinh vật, phân, những mảnh vụn nhỏ từ mặt biển chìm dần xuống, như tuyết. Người ta gọi nó là tuyết biển. {c}Tuyết biển rơi quanh một ống khói đá dưới đáy đại dương. Có những mẩu phải mất hàng tuần mới chìm tới đáy.',
      draw(k) {
        if (k.t < k.cue('c')) { ocean(k, { depth: 0.8, snow: 0 }); snow(k, 160, 40); bigNum(k, 'TUYẾT BIỂN', W / 2, 520, 'b', { size: 130, color: P.cream }); }
        else { k.photo('tuyet-bien', 0, 0, W, H, { zoom: [1.0, 1.1], kp: k.at('c', 9, 'linear') }); snow(k, 60, 30); chip(k, 'IFREMER', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 }); }
      },
    },
    {
      say: '{a}Và đây là lời giải cho câu hỏi ở tập trước. {b}Sáu mươi sáu triệu năm trước, khi bụi che kín bầu trời, sinh vật phù du ở mặt biển chết hàng loạt. {c}Nhưng dưới đáy sâu, nhiều sinh vật chưa bao giờ cần ánh nắng. Chúng sống nhờ tuyết biển và lớp mùn tích trong bùn qua hàng nghìn năm. {d}Vì thế, các nhà khoa học cho rằng những loài sống nhờ mùn ở biển sâu bị ảnh hưởng ít hơn hẳn. Thế giới trên kia sụp đổ, nhưng kho thức ăn dưới bùn vẫn còn đó.',
      draw(k) {
        const { ctx } = k; const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3A0E0E'); g.addColorStop(0.25, '#2B3A3C'); g.addColorStop(0.5, '#03222E'); g.addColorStop(1, '#000'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        for (let i = 0; i < 30; i++) k.dot(k.rand(i + 600) * W, 120 + k.rand(i + 630) * 150, 4, '#9FB8A0', 0.8 * (1 - k.at('b', 3)));
        ctx.fillStyle = '#3A2E24'; ctx.fillRect(0, 900, W, 180);
        for (let i = 0; i < 40; i++) k.dot(k.rand(i + 700) * W, 920 + k.rand(i + 730) * 140, 5, '#8C6B4F', 0.8 * k.at('c', 1));
        label(k, '66 TRIỆU NĂM TRƯỚC · MẶT BIỂN', W / 2, 90, 'b', { size: 40 });
        bigNum(k, 'KHO THỨC ĂN DƯỚI BÙN', W / 2, 760, 'c', { size: 76, color: P.gold });
        chip(k, 'GIẢ THUYẾT', 60, 1000, { bg: P.cream, p: k.at('d', 0.5) });
        src(k, 'Sheehan & Hansen, Geology 1986 · Culver 2003', { x: 300, y: 1000 });
      },
    },

    // ================= CHƯƠNG 5: CON NGƯỜI =================
    {
      chapter: 'Con người đã để lại gì dưới đáy?',
      say: '{a}Sau chuyến lặn năm 1960, phải hơn năm mươi năm sau mới lại có người xuống tới Challenger Deep. {b}Năm 2012, đạo diễn James Cameron lặn một mình. Từ năm 2019, thêm nhiều chuyến lặn nữa. {c}Đến nay, số người từng xuống tới đáy sâu nhất của đại dương vẫn ít hơn rất nhiều so với số người từng bay vào vũ trụ.',
      transition: 'fade',
      draw(k) {
        fill(k, '#03141E');
        chapterTag(k, 'Chương 5 · Con người');
        const it = [['1960', 'Trieste', 'a'], ['2012', 'James Cameron', 'b'], ['2019 →', 'nhiều chuyến', 'b']];
        it.forEach(([y, t, c], i) => { bigNum(k, y, 400 + i * 560, 380, k.cue(c, i * 0.6), { size: 90, color: P.gold }); label(k, t, 400 + i * 560, 480, k.cue(c, i * 0.6), { size: 44 }); });
        label(k, 'người xuống đáy  <  người bay vào vũ trụ', W / 2, 800, 'c', { size: 56, color: P.cream });
      },
    },
    {
      say: '{a}Năm 2015, NOAA thả một máy thu âm xuống đáy Challenger Deep suốt hơn ba tuần. {b}Họ tưởng nơi sâu nhất Trái Đất sẽ hoàn toàn im lặng. {c}Nhưng máy ghi được tiếng động đất, tiếng một cơn bão mạnh đi ngang trên mặt biển, tiếng chân vịt tàu. Và cả tiếng cá voi. {d}Nơi sâu nhất hành tinh, hoá ra, lại ồn ào.',
      draw(k) {
        ocean(k, { depth: 1, snow: 40 });
        k.ctx.fillStyle = '#1D2A2A'; k.ctx.fillRect(0, 880, W, 200);
        k.ctx.fillStyle = '#E0A33A'; k.ctx.fillRect(940, 760, 40, 120); k.dot(960, 750, 26, '#E0A33A');
        const items = [['động đất', 'c', 0], ['bão', 'c', 1], ['chân vịt tàu', 'c', 2], ['cá voi', 'c', 3.2]];
        items.forEach(([t, c, d], i) => { const p = k.at(k.cue(c, d), 0.6); k.ctx.strokeStyle = `rgba(255,211,78,${0.8 * p})`; k.ctx.lineWidth = 5; k.ctx.beginPath(); for (let x = 0; x < 360; x += 4) { const y = 220 + i * 120 + 26 * Math.sin(x * (0.05 + i * 0.03) + k.gt * 6) * Math.sin(x / 360 * Math.PI); x ? k.ctx.lineTo(560 + x, y) : k.ctx.moveTo(560 + x, y); } k.ctx.stroke(); label(k, t, 1000, 220 + i * 120, k.cue(c, d), { size: 44, align: 'left' }); });
        depthGauge(k, 10900);
        bigNum(k, 'KHÔNG IM LẶNG', 760, 760, 'd', { size: 76, color: P.gold });
        src(k, 'NOAA PMEL · Dziak et al. 2017', { y: 1040 });
      },
    },
    {
      say: '{a}Nhưng có một thứ đã xuống tới đó trước cả nhiều nhà thám hiểm. {b}Năm 1998, một robot lặn của Nhật Bản quay được một chiếc túi ni lông nằm ở độ sâu mười nghìn tám trăm chín mươi tám mét. {c}Một chiếc túi dùng một lần, ở nơi sâu nhất hành tinh.',
      draw(k) {
        ocean(k, { depth: 1, snow: 40 });
        k.ctx.fillStyle = '#1D2A2A'; k.ctx.fillRect(0, 880, W, 200);
        depthGauge(k, 10898);
        const p = k.at('b', 4, 'out');
        k.ctx.save(); k.ctx.translate(820, lerp(-200, 800, p)); k.ctx.rotate(0.2 * Math.sin(k.gt)); k.ctx.globalAlpha = 0.85;
        k.ctx.fillStyle = '#E8EEF2'; k.ctx.beginPath(); k.ctx.moveTo(-90, -120); k.ctx.lineTo(-40, -120); k.ctx.lineTo(-30, -80); k.ctx.lineTo(30, -80); k.ctx.lineTo(40, -120); k.ctx.lineTo(90, -120); k.ctx.lineTo(110, 100); k.ctx.lineTo(-110, 100); k.ctx.closePath(); k.ctx.fill(); k.ctx.restore();
        label(k, 'HÌNH MINH HOẠ', 60, 70, 'a', { size: 26, align: 'left', color: P.mute });
        bigNum(k, 'TÚI NI LÔNG · 10.898 M', W / 2 - 100, 200, 'b', { size: 80, color: P.cream });
        src(k, 'Chiba et al., Marine Policy 2018', { y: 1040 });
      },
    },
    {
      say: '{a}Năm 2017, các nhà khoa học phân tích những con giáp xác nhỏ ở đáy rãnh Mariana. {b}Trong cơ thể chúng có chất ô nhiễm công nghiệp, ở mức cao hơn nhiều lần so với cua sống ở vùng ruộng bên một trong những con sông ô nhiễm nhất Trung Quốc. {c}Thứ con người thải ra trên đất liền đã đi hết một chặng mười một km để tới nơi xa xôi nhất của đại dương.',
      draw(k) {
        fill(k, '#01070C');
        framed(k, 'giap-xac-day', 200, 240, 760, 540, { kp: k.at('a', 10, 'linear') });
        bigNum(k, 'CHẤT Ô NHIỄM', 1420, 360, 'b', { size: 90, color: P.red });
        label(k, 'cao hơn vùng ô nhiễm nặng trên đất liền', 1420, 470, 'b', { size: 40 });
        label(k, 'đất liền → 11 km dưới biển', 1420, 760, 'c', { size: 50, color: P.gold });
        src(k, 'Jamieson et al., Nature Ecology & Evolution 2017', { y: 1040 });
      },
    },
    {
      say: '{a}Và đây là điều đáng kinh ngạc nhất. {b}Đến nay, con người mới vẽ được bản đồ chi tiết của chỉ khoảng một phần tư đáy đại dương. {c}Chúng ta có bản đồ bề mặt Mặt Trăng và Sao Hoả rõ hơn bản đồ đáy biển của chính hành tinh mình.',
      draw(k) {
        space(k, { n: 100 });
        earth(k, 700, 560, 300, { spin: 0.01 });
        k.ctx.save(); k.ctx.beginPath(); k.ctx.arc(700, 560, 300, 0, Math.PI * 2); k.ctx.clip(); k.ctx.fillStyle = 'rgba(5,10,20,0.55)'; k.ctx.fillRect(400 + 600 * 0.25 * k.at('b', 2), 260, 600, 600); k.ctx.restore();
        bigNum(k, '~1/4 ĐÃ VẼ BẢN ĐỒ', 1400, 360, 'b', { size: 70, color: P.gold });
        k.dot(1420, 700, 70, '#C9C3B8'); k.dot(1640, 700, 50, '#C1440E');
        label(k, 'Mặt Trăng · Sao Hoả rõ hơn', 1520, 840, 'c', { size: 44 });
        src(k, 'Seabed 2030', { y: 1040 });
      },
    },

    // ================= KẾT =================
    {
      say: '{a}Quay lại năm 1960. Hai người đàn ông trong quả cầu thép, ô kính đã nứt, ở dưới mười một km nước. {b}Họ chỉ có hai mươi phút ở đáy. Và họ tin rằng mình đã thấy một con cá. {c}Hơn sáu mươi năm sau, nơi ấy vẫn là một trong những vùng ít được biết đến nhất trên hạt bụi xanh này. {d}Không phải ở ngoài vũ trụ. Mà ngay bên dưới chúng ta.',
      tail: 1.4,
      transition: 'fade',
      draw(k) {
        const up = k.at('c', 5, 'inOut');
        if (up < 1) { k.photo('trieste', 0, 0, W, H, { zoom: [1.12, 1.2], pan: [[0.42, 0.6], [0.42, 0.6]], dim: 0.2 }); }
        if (up > 0) { k.ctx.save(); k.ctx.globalAlpha = up; space(k, { n: 160 }); earthPhoto(k, W / 2, 540, lerp(300, 110, k.at('c', 8, 'inOut'))); k.ctx.restore(); }
        label(k, '20 PHÚT Ở ĐÁY', W / 2, 960, 'b', { size: 64, p: k.at('b', 0.6) * (1 - up) });
        label(k, 'NGAY BÊN DƯỚI CHÚNG TA', W / 2, 960, 'd', { size: 64, color: P.gold });
      },
    },
    {
      say: '{a}Nếu được chọn một chuyến đi, bạn sẽ chọn: {b}xuống đáy rãnh Mariana, {c}hay bay lên Mặt Trăng? {d}Viết lựa chọn của bạn ở phần bình luận.',
      draw(k) {
        k.ctx.fillStyle = '#03141E'; k.ctx.fillRect(0, 0, W / 2, H);
        k.ctx.save(); k.ctx.beginPath(); k.ctx.rect(W / 2, 0, W / 2, H); k.ctx.clip(); space(k, { n: 80 }); k.ctx.restore();
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(W / 2 - 3, 160, 6, 700);
        sphere(k, W / 4, 560, 140, 0);
        k.dot(W * 3 / 4, 560, 150, '#C9C3B8');
        bigNum(k, 'ĐÁY MARIANA', W / 4, 240, 'b', { size: 80, color: '#9FD8EA' });
        bigNum(k, 'MẶT TRĂNG', W * 3 / 4, 240, 'c', { size: 80, color: P.cream });
        bigNum(k, 'BẠN CHỌN?', W / 2, 960, 'd', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Tập sau trên Hạt Bụi Xanh, chúng ta rời đáy biển để đi ra ngoài vũ trụ. {b}Năm 1977, một kính thiên văn ở Mỹ bắt được một tín hiệu vô tuyến mạnh bất thường từ sâu trong không gian. Nó kéo dài bảy mươi hai giây. Và không bao giờ lặp lại. {c}Những bí ẩn vũ trụ chưa có lời giải. Đăng ký kênh để không bỏ lỡ.',
      tail: 2.2,
      draw(k) {
        space(k, { n: 200 });
        label(k, 'TẬP SAU', W / 2, 110, 'a', { size: 60, color: P.mute });
        const p = k.at('b', 3);
        k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 6; k.ctx.beginPath();
        for (let x = 200; x <= 200 + 1520 * p; x += 4) { const u = (x - 200) / 1520, peak = Math.exp(-Math.pow((u - 0.5) / 0.08, 2)); const y = 560 - 260 * peak - 12 * Math.sin(x * 0.3) * (0.3 + peak); x === 200 ? k.ctx.moveTo(x, y) : k.ctx.lineTo(x, y); }
        k.ctx.stroke();
        countdown(k, '72 GIÂY · 1977', { x: W / 2, y: 720, align: 'center', size: 60, p: k.at('b', 0.6) });
        bigNum(k, 'NHỮNG BÍ ẨN VŨ TRỤ CHƯA CÓ LỜI GIẢI', W / 2, 900, 'c', { size: 60, color: P.cream });
        chip(k, '🔔 ĐĂNG KÝ HẠT BỤI XANH', W / 2 - 230, 1015, { bg: P.gold, p: k.at('c', 0.6) });
      },
    },
  ],
};
