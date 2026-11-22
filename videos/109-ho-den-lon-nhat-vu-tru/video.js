// Hạt Bụi Xanh · tập 7 — Hố Đen Lớn Nhất Vũ Trụ Lớn Đến Mức Nào? (bảng nguồn: kich-ban.md, 14/11/2026)
// Thang leo: Mặt Trời nén thành hố đen (~6 km) → Sgr A* (4 triệu) → M87* (6,5 tỷ) → TON 618 (~40 tỷ) → giới hạn ~50 tỷ.
// Hình: 3D three.js (hố đen, Trái Đất) + hậu kỳ 'cosmos' (engine/post.js) + ảnh thật EHT/Hubble/ESO/NASA.
// Fact check (nguồn chính):
// - EHT: mạng kính vô tuyến khắp Trái Đất; ảnh M87* công bố 10/4/2019, ảnh Sgr A* 12/5/2022 (EHT Collaboration, CC BY 4.0).
// - Bán kính Schwarzschild ≈ 2,95 km × (khối lượng / Mặt Trời): Mặt Trời → đường kính ~6 km; Trái Đất → ~1,8 cm.
// - Sgr A*: ~4,3 triệu M☉, ~27.000 năm ánh sáng; chân trời ~25 triệu km ≈ 18 lần đường kính Mặt Trời, nằm gọn trong quỹ đạo Sao Thuỷ.
//   Sao S2 quay quanh mất ~16 năm, 2018 lao qua ~7.650 km/s (GRAVITY/ESO); Nobel 2020: Genzel, Ghez (cùng Penrose).
// - Gaia BH3 (2024): ~33 M☉, ~1.926 năm ánh sáng — hố đen sao lớn nhất đã biết trong Ngân Hà.
// - M87*: ~6,5 tỷ M☉, ~55 triệu năm ánh sáng; bán kính chân trời ~128 AU, đường kính ~256 AU ≈ 3 lần quỹ đạo Sao Diêm Vương (~79 AU);
//   tia plasma dài ~5.000 năm ánh sáng (Hubble).
// - TON 618: chuẩn tinh phát hiện 1957 (khảo sát Tonantzintla, Mexico); ánh sáng đi ~10,8 tỷ năm; khối lượng ước tính ~40 tỷ M☉
//   (có ước tính 66 tỷ — Shemmer et al. 2004); sáng ~1,4×10^14 lần Mặt Trời; đường kính chân trời ~1.600 AU → ánh sáng đi ngang ~9 ngày;
//   Voyager 1 (phóng 1977) ở ~170 AU năm 2026. Mật độ trung bình trong chân trời ∝ 1/M²: ~0,01 kg/m³ (không khí ~1,2 kg/m³).
//   Lực thuỷ triều ở chân trời hố đen siêu lớn rất yếu (không bị "kéo sợi mì" ngay); hố đen nhỏ thì ngược lại.
// - Hố đen "Móng Ngựa Vũ Trụ": ~36 tỷ M☉, đo bằng thấu kính hấp dẫn + chuyển động sao (Melo-Carneiro et al. 2025, MNRAS).
// - Phoenix A: ước tính ~100 tỷ, gián tiếp, gây tranh cãi. Giới hạn ~50 tỷ M☉ cho hố đen còn đĩa bồi tụ (King 2016, MNRAS Letters) — giả thuyết.
// - Năm thiên hà: Mặt Trời quay quanh tâm Ngân Hà ~230 km/s, một vòng ~230 triệu năm; ~230 triệu năm trước: những con khủng long đầu tiên.
// - Tập sau (18/11): Mặt Trăng xa dần ~3,8 cm/năm (đo laser, NASA).
import { P, fill, space, earth, bigNum, label, chip, chapterTag, scaleBar, solarSystem, human, countdown, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';
import { three } from '/engine/gl3d.js';
import { earthTextures, earthScene, earthUpdate, blackHoleScene, blackHoleUpdate } from '/channel/hat-bui-xanh-3d.js';
import * as thumbs from '/videos/109-ho-den-lon-nhat-vu-tru/thumbs.js';

const W = 1920, H = 1080;
const lerp = (a, b, p) => a + (b - a) * p;
const SRC = { bg: 'rgba(245,241,230,0.85)', size: 22 };
const MP = { bg: 'rgba(255,211,78,0.9)', size: 22 };
const TEX = await earthTextures('/videos/109-ho-den-lon-nhat-vu-tru/assets/');
const EARTH = earthScene(TEX), BH = blackHoleScene();
// Hố đen 3D toàn khung; o.dist (số hoặc hàm), o.orbit, o.tilt, o.exp độ sáng.
const bh3d = (k, o = {}) => three(k, 'bh', BH, blackHoleUpdate({ orbit: o.orbit ?? 0.04, dist: o.dist ?? 12, tilt: o.tilt ?? 0.12 }), 0, 0, W, H, { exposure: o.exp ?? 1.05, alpha: o.alpha ?? 1 });
const earthPhoto = (k, x, y, r) => { const s = r / 0.85; k.ctx.save(); k.ctx.beginPath(); k.ctx.arc(x, y, r, 0, Math.PI * 2); k.ctx.clip(); k.photo('trai-dat-that', x - s, y - s, s * 2, s * 2, { zoom: [1, 1], credit: false }); k.ctx.restore(); };
const framed = (k, name, x, y, w, h, o = {}) => {
  if ((o.p ?? 1) <= 0) return;
  k.ctx.save(); k.ctx.globalAlpha *= o.p ?? 1; k.ctx.fillStyle = P.cream; k.ctx.fillRect(x - 8, y - 8, w + 16, h + 16);
  k.photo(name, x, y, w, h, { zoom: o.zoom ?? [1, 1.06], focus: o.focus, pan: o.pan, credit: o.credit }); k.ctx.restore();
};
// Vòng chân trời sự kiện (vẽ): đĩa đen viền cam, tâm (x, y), bán kính r.
function horizon(k, x, y, r, o = {}) {
  if (r <= 0) return;
  const { ctx } = k;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  const g = ctx.createRadialGradient(x, y, r * 0.95, x, y, r * 1.25); g.addColorStop(0, 'rgba(255,150,60,0.55)'); g.addColorStop(1, 'rgba(255,150,60,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.25, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,190,110,0.9)'; ctx.lineWidth = Math.max(2, r * 0.015); ctx.stroke();
  ctx.restore();
}
// Quỹ đạo tròn nét đứt + nhãn.
function orbit(k, x, y, r, text, p = 1, color = 'rgba(245,241,230,0.7)') {
  if (p <= 0 || r <= 0) return;
  const { ctx } = k; ctx.save(); ctx.globalAlpha *= p; ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.setLineDash([12, 10]);
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  if (text) k.text(text, x, y - r - 30, { size: 34, font: 'title', color: P.cream, p, outline: P.ink, outlineWidth: 8 });
}

export default {
  meta: {
    title: 'Hố Đen Lớn Nhất Vũ Trụ Lớn Đến Mức Nào?',
    description: 'Năm 2019, loài người lần đầu nhìn thấy một hố đen. Nó nặng 6,5 tỷ lần Mặt Trời. Nhưng ngoài kia còn có những hố đen lớn hơn thế nhiều lần.\n\nTừ hố đen nhỏ nhất đến hố đen lớn nhất từng được tìm thấy: Sagittarius A* ở trung tâm Ngân Hà, M87* trong bức ảnh đầu tiên, TON 618 nặng khoảng 40 tỷ Mặt Trời, và câu hỏi hố đen có thể lớn đến đâu. So sánh bằng những thứ quen thuộc: Mặt Trời, quỹ đạo Sao Diêm Vương, tàu Voyager.',
    footer: '📚 Nguồn tham khảo\n• Event Horizon Telescope Collaboration (2019, 2022) – ảnh M87* và Sagittarius A*\n• GRAVITY Collaboration / ESO (2018) – sao S2 quanh Sagittarius A*; Giải Nobel Vật lý 2020\n• Gaia Collaboration (2024) – hố đen Gaia BH3\n• Shemmer et al. (2004), ApJ; Ge et al. (2019) – khối lượng TON 618\n• Melo-Carneiro et al. (2025), MNRAS – hố đen trong "Móng Ngựa Vũ Trụ"\n• King (2016), MNRAS Letters – giới hạn khối lượng hố đen\n• NASA, ESA, ESO, Hubble\n\n🌍 Hạt Bụi Xanh — khoa học về những thứ khổng lồ, cổ xưa và đáng sợ trên hạt bụi xanh của chúng ta. Video mới mỗi ngày lúc 20:00.',
    links: [['▶ Tập trước: Những Bí Ẩn Vũ Trụ Chưa Có Lời Giải', '106-nhung-bi-an-vu-tru-chua-co-loi-giai']],
    tags: ['hố đen', 'hố đen lớn nhất vũ trụ', 'ton 618', 'hố đen m87', 'sagittarius a', 'hố đen siêu khối lượng', 'vũ trụ', 'thiên văn học', 'khoa học', 'hạt bụi xanh'],
    hashtags: ['hoden', 'vutru', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi',
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.35, tail: 0.8, pause: 0.35, transition: 'cut', camera: 0.04,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    gpu: true, post: 'cosmos',
  },
  thumbnail: thumbs.a,
  scenes: [
    // ================= MỞ ĐẦU =================
    {
      chapter: 'Mở đầu: bức ảnh năm 2019',
      say: '{a}Ngày mười tháng tư năm 2019, các nhà khoa học công bố một bức ảnh mờ, màu cam, hình chiếc nhẫn. {b}Đó là lần đầu tiên trong lịch sử, loài người nhìn thấy một hố đen. {c}Nó nặng gấp sáu tỷ rưỡi lần Mặt Trời.',
      draw(k) {
        fill(k, '#000');
        k.photo('eht-m87', 0, 0, W, H, { zoom: [1.0, 1.25], pan: [[0.5, 0.5], [0.5, 0.5]] });
        chip(k, 'EVENT HORIZON TELESCOPE · M87*', 60, 70, SRC);
        countdown(k, '10/4/2019', { x: W - 60, y: 80, p: k.at('a', 0.6) });
        bigNum(k, '6,5 TỶ MẶT TRỜI', W / 2, 960, 'c', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Nghe đã khó tưởng tượng. {b}Nhưng ngoài kia còn có những hố đen lớn hơn nó nhiều lần. {c}Lớn đến mức, nếu đặt vào chỗ Mặt Trời, nó nuốt trọn quỹ đạo của mọi hành tinh, mà vẫn còn rộng gấp hàng chục lần.',
      draw(k) {
        bh3d(k, { dist: (k) => 16 - 5 * k.at(0, k.d, 'inOut'), orbit: 0.05 });
        bigNum(k, 'CÒN LỚN HƠN?', W / 2, 920, 'b', { size: 120, color: P.gold });
        chip(k, 'MÔ PHỎNG', 60, 70, MP);
      },
    },
    {
      say: '{a}Hôm nay, chúng ta sẽ leo một chiếc thang. {b}Từ hố đen nhỏ nhất, {c}đến hố đen ở trung tâm Ngân Hà, {d}đến hố đen trong bức ảnh đầu tiên, {e}rồi tới hố đen lớn nhất từng được tìm thấy. {f}Và đến cuối video, bạn sẽ biết vì sao hố đen có lẽ không thể lớn mãi.',
      draw(k) {
        space(k, { n: 160 });
        const steps = [['b', '~6 KM', 'MẶT TRỜI NÉN LẠI'], ['c', '4 TRIỆU', 'SGR A*'], ['d', '6,5 TỶ', 'M87*'], ['e', '~40 TỶ', 'TON 618']];
        steps.forEach(([c, n, t], i) => {
          const x = 300 + i * 440, r = [14, 40, 90, 170][i], p = k.at(c, 0.7);
          horizon(k, x, 560, r * p);
          label(k, t, x, 820, c, { size: 40, color: P.mute });
          bigNum(k, n, x, 900, c, { size: 64, color: i === 3 ? P.gold : P.cream });
        });
        bigNum(k, 'GIỚI HẠN?', W / 2, 180, 'f', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Đây là Hạt Bụi Xanh. {b}Ở tập trước, chúng ta đã đi qua năm bí ẩn vũ trụ chưa có lời giải. Hôm nay là thứ khổng lồ nhất mà vũ trụ từng tạo ra.',
      draw(k) {
        k.photo('alma', 0, 0, W, H, { zoom: [1.1, 1.2], pan: [[0.3, 0.5], [0.45, 0.5]] });
        chip(k, 'ALMA · ESO/B. TAFRESHI', 60, 70, SRC);
        bigNum(k, 'HẠT BỤI XANH', W / 2, 920, 'a', { size: 90, color: P.cream });
      },
    },

    // ================= 1. HỐ ĐEN LÀ GÌ, NHỎ NHẤT =================
    {
      chapter: 'Nấc 1: Mặt Trời nén lại còn bao nhiêu?',
      transition: 'fade',
      say: '{a}Hố đen là nơi vật chất bị nén chặt đến mức lực hấp dẫn không cho thứ gì thoát ra, kể cả ánh sáng. {b}Ranh giới không lối về ấy gọi là chân trời sự kiện. {c}Vượt qua nó, không gì quay lại được.',
      draw(k) {
        chapterTag(k, 'Nấc 1 · Hố đen nhỏ nhất');
        space(k, { n: 140 });
        horizon(k, W / 2, 560, 220);
        const { ctx } = k;
        for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, p = k.at(k.cue('a', 1 + i * 0.2), 2, 'in'), r0 = 700, r = lerp(r0, 230, p); ctx.strokeStyle = `rgba(255,236,170,${0.8 * (1 - p * 0.6)})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(W / 2 + Math.cos(a) * r0, 560 + Math.sin(a) * r0 * 0.8); ctx.lineTo(W / 2 + Math.cos(a) * r, 560 + Math.sin(a) * r * 0.8); ctx.stroke(); }
        k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 6; k.ctx.setLineDash([16, 10]); const q = k.at('b', 1.2); if (q > 0) { k.ctx.beginPath(); k.ctx.arc(W / 2, 560, 222, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * q); k.ctx.stroke(); } k.ctx.setLineDash([]);
        label(k, 'CHÂN TRỜI SỰ KIỆN', W / 2, 860, 'b', { size: 56, color: P.gold });
        bigNum(k, 'KHÔNG LỐI VỀ', W / 2, 160, 'c', { size: 84, color: P.cream });
      },
    },
    {
      say: '{a}Vậy phải nén một thứ nhỏ đến đâu? {b}Nếu nén cả Trái Đất thành hố đen, nó chỉ còn to bằng một viên bi, khoảng hai xăng-ti-mét. {c}Còn Mặt Trời, rộng một triệu bốn trăm nghìn km, sẽ chỉ còn rộng khoảng sáu km.',
      draw(k) {
        const shrink = k.at('b', 3, 'inOut');
        three(k, 'earth', EARTH, earthUpdate({ spin: 0.08, lon: -2.2, dist: lerp(4.8, 60, shrink) }), 0, 0, W, H);
        k.dot(W / 2, H / 2, 10, '#000', shrink > 0.95 ? 1 : 0);
        bigNum(k, '~2 CM', W / 2, 860, 'b', { size: 120, color: P.gold, p: k.at(k.cue('b', 2.5), 0.5) * (1 - k.at('c', 0.5)) });
        bigNum(k, 'MẶT TRỜI → ~6 KM', W / 2, 860, 'c', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Trong vũ trụ, chỉ những ngôi sao nặng hơn Mặt Trời nhiều lần, khi chết đi, mới tự sụp thành hố đen. {b}Hố đen sao lớn nhất từng thấy trong Ngân Hà tên là Gaia BH3, nặng khoảng ba mươi ba lần Mặt Trời, cách chúng ta chưa tới hai nghìn năm ánh sáng. {c}Chân trời của nó rộng chừng hai trăm km, bằng quãng đường Hà Nội đi Nam Định rồi quay về.',
      draw(k) {
        space(k, { n: 140 });
        const p = k.at('a', 3);
        const g = k.ctx.createRadialGradient(560, 520, 10, 560, 520, 260 * (1 - p * 0.9)); g.addColorStop(0, `rgba(190,215,255,${1 - p})`); g.addColorStop(1, 'rgba(120,160,255,0)');
        k.ctx.fillStyle = g; k.ctx.beginPath(); k.ctx.arc(560, 520, 260, 0, Math.PI * 2); k.ctx.fill();
        horizon(k, 560, 520, 60 * p);
        label(k, 'SAO NẶNG SỤP ĐỔ', 560, 860, 'a', { size: 44, color: P.mute });
        bigNum(k, 'GAIA BH3', 1340, 360, 'b', { size: 100, color: P.cream });
        bigNum(k, '~33 MẶT TRỜI', 1340, 500, 'b', { size: 70, color: P.gold });
        scaleBar(k, 1060, 1620, 720, '~200 KM', { p: k.at('c', 1.5) });
        chip(k, 'MINH HOẠ', 60, 70, MP);
      },
    },

    {
      say: '{a}Hố đen đầu tiên được công nhận nằm trong chòm Thiên Nga, tên là Cygnus X-1. {b}Đầu những năm 1970, các nhà thiên văn thấy một ngôi sao xanh khổng lồ đang quay quanh một bạn đồng hành vô hình, phát ra tia X dữ dội. {c}Stephen Hawking từng đặt cược rằng đó không phải hố đen. Năm 1990, ông chịu thua.',
      draw(k) {
        fill(k, '#000');
        k.photo('cyg-x1', 0, 0, W, H, { zoom: [1.0, 1.15], p: 1 - k.at('b', 0.8) });
        k.photo('cyg-mh', 0, 0, W, H, { zoom: [1.05, 1.15], pan: [[0.55, 0.5], [0.6, 0.5]], p: k.at('b', 0.8), fx: 'fade' });
        chip(k, k.t < k.cue('b') ? 'CHANDRA · TIA X · CYGNUS X-1' : 'MINH HOẠ · NASA', 60, 70, k.t < k.cue('b') ? SRC : MP);
        bigNum(k, 'HAWKING THUA CƯỢC', W / 2, 960, 'c', { size: 90, color: P.gold });
      },
    },
    // ================= 2. SGR A* =================
    {
      chapter: 'Nấc 2: Quái vật ở trung tâm Ngân Hà',
      transition: 'fade',
      say: '{a}Giờ hãy nhìn về trung tâm dải Ngân Hà, cách chúng ta khoảng hai mươi bảy nghìn năm ánh sáng. {b}Bụi dày che khuất ánh sáng thường. Nhưng kính hồng ngoại và tia X nhìn xuyên qua được. {c}Và ở chính giữa, có một thứ không phát sáng.',
      draw(k) {
        chapterTag(k, 'Nấc 2 · Sagittarius A*');
        fill(k, '#000');
        const z = lerp(1.0, 2.6, k.at('a', 9, 'inOut'));
        k.photo('tam-ngan-ha', 0, 0, W, H, { zoom: [z, z], pan: [[0.5, 0.5], [0.585, 0.6]], kp: k.at('a', 9, 'inOut') });
        chip(k, 'NASA / JPL-CALTECH / ESA / CXC / STSCI', 60, 1010, SRC);
        bigNum(k, '~27.000 NĂM ÁNH SÁNG', W / 2, 140, 'a', { size: 70, color: P.cream });
      },
    },
    {
      say: '{a}Các nhà thiên văn theo dõi những ngôi sao quanh đó suốt gần ba mươi năm. {b}Một ngôi sao tên S2 quay một vòng chỉ mất mười sáu năm, {c}và khi lao qua điểm gần nhất, nó đạt tốc độ hơn bảy nghìn km mỗi giây. {d}Chúng đang quay quanh một thứ vô hình, nặng khoảng bốn triệu lần Mặt Trời.',
      draw(k) {
        fill(k, '#03050C');
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(612, 132, 696, 696);
        k.clip('s2-that', 620, 140, 680, 680, { at: 0 });
        chip(k, 'ESO · DỮ LIỆU QUAN SÁT THẬT', 620, 100, SRC);
        bigNum(k, 'S2: 16 NĂM/VÒNG', 1620, 380, 'b', { size: 54, color: P.cream });
        bigNum(k, '> 7.000 KM/S', 1620, 520, 'c', { size: 70, color: P.gold });
        bigNum(k, '4 TRIỆU MẶT TRỜI', W / 2, 960, 'd', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Năm 2020, hai nhà thiên văn dẫn đầu những nghiên cứu ấy, Reinhard Genzel và Andrea Ghez, nhận giải Nobel Vật lý. {b}Thứ vô hình đó được đặt tên là Sagittarius A sao, hố đen ở trung tâm Ngân Hà. {c}Năm 2022, mạng kính thiên văn Event Horizon chụp được nó.',
      draw(k) {
        fill(k, '#000');
        k.photo('eht-sgra', 0, 0, W, H, { zoom: [1.05, 1.3], p: k.at('c', 0.8), fx: 'fade' });
        if (k.t < k.cue('c', 0.8)) { k.photo('tam-ngan-ha', 0, 0, W, H, { zoom: [1.6, 2.4], pan: [[0.55, 0.55], [0.585, 0.6]], kp: k.at(0, k.cue('c', 0.8), 'linear'), dim: 0.7, credit: false }); bigNum(k, 'NOBEL 2020', W / 2, 420, 'a', { size: 120, color: P.gold }); label(k, 'GENZEL · GHEZ', W / 2, 560, 'a', { size: 56 }); bigNum(k, 'SAGITTARIUS A*', W / 2, 760, 'b', { size: 90, color: P.cream }); }
        chip(k, 'EVENT HORIZON TELESCOPE · SGR A* · 2022', 60, 70, { ...SRC, p: k.at('c', 0.8) });
      },
    },
    {
      say: '{a}Để chụp nó, các nhà khoa học nối những kính thiên văn vô tuyến ở khắp Trái Đất, từ Chile đến Nam Cực, thành một kính thiên văn khổng lồ, to bằng cả hành tinh. {b}Chụp Sagittarius A sao từ Trái Đất khó như chụp một chiếc bánh vòng đặt trên Mặt Trăng.',
      draw(k) {
        fill(k, '#000');
        k.photo('alma', 0, 0, W, H, { zoom: [1.15, 1.25], pan: [[0.6, 0.5], [0.7, 0.45]], p: 1 - k.at('b', 0.8) });
        if (k.t > k.cue('b')) { space(k, { n: 120 }); earthPhoto(k, 360, 600, 180); k.dot(1600, 400, 70, '#C9C3B8', 1); k.ctx.strokeStyle = 'rgba(255,211,78,0.7)'; k.ctx.setLineDash([12, 10]); k.ctx.lineWidth = 3; k.ctx.beginPath(); k.ctx.moveTo(530, 560); k.ctx.lineTo(1540, 410); k.ctx.stroke(); k.ctx.setLineDash([]); k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 3; k.ctx.beginPath(); k.ctx.arc(1600, 400, 6, 0, Math.PI * 2); k.ctx.stroke(); label(k, 'BÁNH VÒNG TRÊN MẶT TRĂNG', 1400, 560, 'b', { size: 44, color: P.gold }); }
        chip(k, k.t < k.cue('b') ? 'ALMA, CHILE · MỘT PHẦN CỦA EHT' : 'MINH HOẠ', 60, 70, k.t < k.cue('b') ? SRC : MP);
      },
    },
    {
      say: '{a}Vậy nó lớn cỡ nào? {b}Chân trời sự kiện của Sagittarius A sao rộng khoảng hai mươi lăm triệu km, {c}gấp mười tám lần Mặt Trời. {d}Đặt vào giữa Hệ Mặt Trời, nó vẫn nằm gọn bên trong quỹ đạo Sao Thuỷ.',
      draw(k) {
        space(k, { n: 100 });
        const cx = W / 2, cy = 560;
        orbit(k, cx, cy, 440, '', k.at('d', 1));
        label(k, 'QUỸ ĐẠO SAO THUỶ', cx - 330, cy - 340, 'd', { size: 34, align: 'right' });
        horizon(k, cx, cy, 190 * k.at('b', 1.5));
        const sun = 190 / 18;
        k.photo('mat-troi', 1500 - 60, 300 - 60, 120, 120, { radius: 60, credit: false, p: k.at('c', 0.6) });
        k.ctx.save(); k.ctx.globalAlpha = k.at('c', 0.6); k.ctx.fillStyle = P.gold; k.ctx.beginPath(); k.ctx.arc(cx + 190 + 40, cy, sun, 0, Math.PI * 2); k.ctx.fill(); k.ctx.restore();
        label(k, 'MẶT TRỜI (CÙNG TỈ LỆ)', cx + 380, cy + 50, 'c', { size: 32, color: P.gold });
        bigNum(k, '~25 TRIỆU KM', cx, 140, 'b', { size: 84, color: P.cream });
        bigNum(k, '× 18 MẶT TRỜI', cx, 980, 'c', { size: 76, color: P.gold });
      },
    },

    {
      say: '{a}Nhưng hố đen của Ngân Hà đang khá yên ắng. Nó chỉ nhấm nháp một ít khí quanh mình. {b}Năm 2025, kính James Webb thấy nó lấp lóe liên tục, và mỗi ngày có vài lần chớp sáng lớn. {c}Nó không ngủ. Nó chỉ đang ăn rất ít.',
      draw(k) {
        fill(k, '#000');
        const fl = 0.25 + 0.2 * Math.sin(k.gt * 3.1) + 0.15 * Math.sin(k.gt * 7.3) + (k.t > k.cue('b', 2) && k.t < k.cue('b', 3) ? 0.6 : 0);
        k.photo('eht-sgra', 360, 40, 720, 720, { zoom: [1.1, 1.2], radius: 360, credit: false });
        const g = k.ctx.createRadialGradient(720, 400, 40, 720, 400, 380); g.addColorStop(0, `rgba(255,220,150,${0.5 * fl * k.at('a', 0.6)})`); g.addColorStop(1, 'rgba(255,160,60,0)');
        k.ctx.fillStyle = g; k.ctx.fillRect(300, 0, 840, 800);
        const { ctx } = k, p = k.at('a', k.d - 1, 'linear');
        ctx.strokeStyle = 'rgba(245,241,230,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1180, 200); ctx.lineTo(1180, 720); ctx.lineTo(1840, 720); ctx.stroke();
        ctx.strokeStyle = P.gold; ctx.lineWidth = 4; ctx.beginPath();
        for (let i = 0; i <= 300 * p; i++) { const u = i / 300, v = 0.15 + 0.08 * Math.sin(u * 90) + 0.05 * Math.sin(u * 211) + 0.6 * Math.exp(-Math.pow((u - 0.35) / 0.02, 2)) + 0.45 * Math.exp(-Math.pow((u - 0.78) / 0.015, 2)); (i ? ctx.lineTo : ctx.moveTo).call(ctx, 1180 + u * 660, 720 - 480 * v); }
        ctx.stroke();
        label(k, 'ĐỘ SÁNG (MINH HOẠ)', 1510, 770, 'b', { size: 30, color: P.mute });
        chip(k, 'EHT · SGR A*', 60, 70, SRC);
        bigNum(k, 'LẤP LÓE MỖI NGÀY', W / 2, 940, 'b', { size: 84, color: P.gold });
      },
    },
    // ================= 3. M87* =================
    {
      chapter: 'Nấc 3: Hố đen trong bức ảnh đầu tiên',
      transition: 'fade',
      say: '{a}Nhưng Sagittarius A sao chỉ là một hố đen cỡ trung bình. {b}Cách chúng ta năm mươi lăm triệu năm ánh sáng, giữa thiên hà khổng lồ M87, là hố đen trong bức ảnh năm 2019. {c}Nó nặng hơn hố đen của Ngân Hà khoảng một nghìn năm trăm lần.',
      draw(k) {
        chapterTag(k, 'Nấc 3 · M87*');
        fill(k, '#000');
        k.photo('m87-jet', 0, 0, W, H, { zoom: [1.0, 1.25], pan: [[0.4, 0.4], [0.33, 0.3]] });
        chip(k, 'HUBBLE · THIÊN HÀ M87', 60, 1010, SRC);
        bigNum(k, '× 1.500', W / 2, 940, 'c', { size: 130, color: P.gold });
      },
    },
    {
      say: '{a}Nó phóng ra một tia vật chất gần bằng tốc độ ánh sáng, {b}dài khoảng năm nghìn năm ánh sáng, dài hơn cả khoảng cách từ Trái Đất đến phần lớn những ngôi sao bạn thấy trên trời đêm.',
      draw(k) {
        fill(k, '#000');
        k.photo('m87-jet', 0, 0, W, H, { zoom: [2.2, 2.6], pan: [[0.3, 0.25], [0.55, 0.55]] });
        chip(k, 'HUBBLE · NASA', 60, 70, SRC);
        bigNum(k, '~5.000 NĂM ÁNH SÁNG', W / 2, 960, 'b', { size: 84, color: P.cream });
      },
    },
    {
      say: '{a}Chân trời sự kiện của M87 sao rộng khoảng ba mươi tám tỷ km. {b}Đặt vào chỗ Mặt Trời, nó nuốt trọn mọi hành tinh, nuốt cả Sao Diêm Vương, {c}và vẫn còn rộng gấp ba lần quỹ đạo của Sao Diêm Vương.',
      draw(k) {
        space(k, { n: 100 });
        const cx = W / 2, cy = 590, R = 380 * k.at('a', 2.5, 'inOut');
        horizon(k, cx, cy, R, { alpha: 0.95 });
        solarSystem(k, cx, cy, 140, { n: 8, alpha: 1 - 0.6 * k.at('b', 2) });
        orbit(k, cx, cy, 140, 'SAO DIÊM VƯƠNG', k.at('b', 0.8), P.gold);
        bigNum(k, '~38 TỶ KM', cx, 120, 'a', { size: 84, color: P.cream });
        bigNum(k, '× 3 QUỸ ĐẠO SAO DIÊM VƯƠNG', cx, 1010, 'c', { size: 64, color: P.gold });
      },
    },
    {
      say: '{a}Nghe có vẻ là đỉnh rồi. {b}Nhưng năm 1957, các nhà thiên văn ở Mexico ghi lại một chấm sáng mờ trong chòm sao Lạp Khuyển. {c}Phải mấy chục năm sau, người ta mới hiểu chấm sáng ấy là gì.',
      draw(k) {
        fill(k, '#000');
        const z = lerp(1.0, 2.2, k.at('b', 6, 'inOut'));
        k.photo('ton618', 0, 0, W, H, { zoom: [z, z], kp: k.at('b', 6, 'inOut') });
        k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 5; const p = k.at('b', 1); if (p > 0) { k.ctx.globalAlpha = p; k.ctx.beginPath(); k.ctx.arc(W / 2, H / 2, 60, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.globalAlpha = 1; }
        chip(k, 'SDSS · TON 618', 60, 70, SRC);
        countdown(k, '1957', { x: W - 60, y: 80, p: k.at('b', 0.6) });
      },
    },

    // ================= 4. TON 618 =================
    {
      chapter: 'Nấc 4: TON 618, gã khổng lồ',
      transition: 'fade',
      say: '{a}Chấm sáng ấy tên là TON 618. {b}Ánh sáng của nó đã đi gần mười một tỷ năm mới tới Trái Đất, lâu hơn gấp đôi tuổi của Hệ Mặt Trời. {c}Và để còn sáng thấy được từ xa đến thế, nó phải sáng gấp hơn một trăm nghìn tỷ lần Mặt Trời.',
      draw(k) {
        chapterTag(k, 'Nấc 4 · TON 618');
        bh3d(k, { dist: (k) => 30 - 12 * k.at(0, k.d, 'inOut'), orbit: 0.03, exp: lerp(1, 1.6, k.at('c', 2)) });
        chip(k, 'MÔ PHỎNG', 60, 1010, MP);
        bigNum(k, '~11 TỶ NĂM', W / 2, 160, 'b', { size: 90, color: P.cream });
        bigNum(k, '> 100.000 TỶ MẶT TRỜI', W / 2, 960, 'c', { size: 76, color: P.gold });
      },
    },
    {
      say: '{a}TON 618 là một chuẩn tinh: một hố đen đang nuốt khí ngấu nghiến, làm đĩa khí xoáy quanh nó nóng rực, sáng hơn hàng nghìn thiên hà như dải Ngân Hà gộp lại. {b}Từ độ sáng ấy, các nhà khoa học ước tính hố đen bên trong nặng khoảng bốn mươi tỷ lần Mặt Trời. {c}Có nghiên cứu còn ước tới sáu mươi sáu tỷ.',
      draw(k) {
        bh3d(k, { dist: (k) => 14 - 3 * k.at(0, k.d, 'inOut'), orbit: 0.06, tilt: 0.2, exp: 1.3 });
        chip(k, 'MÔ PHỎNG', 60, 70, MP);
        bigNum(k, '~40 TỶ MẶT TRỜI', W / 2, 940, 'b', { size: 100, color: P.gold });
        label(k, 'CÓ ƯỚC TÍNH: 66 TỶ', W / 2, 1040, 'c', { size: 44, color: P.cream });
      },
    },
    {
      say: '{a}Chân trời sự kiện của nó rộng khoảng hai trăm bốn mươi tỷ km. {b}Đặt vào chỗ Mặt Trời, quỹ đạo Sao Diêm Vương chỉ còn là một vòng tròn nhỏ ở giữa. {c}Tàu Voyager 1, bay suốt gần năm mươi năm từ năm 1977, đến nay vẫn chưa đi được một phần tư bán kính của nó.',
      draw(k) {
        space(k, { n: 100 });
        const cx = W / 2, cy = 590, R = 420;
        horizon(k, cx, cy, R * k.at('a', 2, 'inOut'));
        orbit(k, cx, cy, R / 20, '', k.at('b', 0.8), P.gold);
        label(k, 'QUỸ ĐẠO SAO DIÊM VƯƠNG', cx, cy - 60, 'b', { size: 34, color: P.gold });
        const vp = k.at('c', 4, 'inOut'), vx = cx + R * 0.215 * vp;
        k.ctx.strokeStyle = P.cream; k.ctx.lineWidth = 4; k.ctx.beginPath(); k.ctx.moveTo(cx, cy); k.ctx.lineTo(vx, cy); k.ctx.stroke();
        k.dot(vx, cy, 7, P.cream, k.at('c', 0.4));
        label(k, 'VOYAGER 1 · ~170 AU', vx + 20, cy + 50, 'c', { size: 34, align: 'left' });
        bigNum(k, '~240 TỶ KM', cx, 110, 'a', { size: 84, color: P.cream });
      },
    },
    {
      say: '{a}Ánh sáng, thứ nhanh nhất vũ trụ, đi từ Mặt Trăng tới Trái Đất chỉ hơn một giây. {b}Đi ngang qua chân trời của TON 618, ánh sáng cần khoảng chín ngày.',
      draw(k) {
        space(k, { n: 120 });
        const p = k.at('b', 6, 'linear'), x0 = 160, x1 = 1760;
        horizon(k, W / 2, 1500, 1100, { alpha: k.at('b', 0.8) });
        earthPhoto(k, 300, 340, 70 * (1 - k.at('b', 0.8)) + 0.01);
        k.dot(560, 340, 22 * (1 - k.at('b', 0.8)), '#C9C3B8', 1);
        const ly = k.t < k.cue('b') ? lerp(370, 538, k.at('a', 1.2, 'linear')) : 0;
        if (k.t < k.cue('b')) k.dot(ly, 340, 8, P.gold, 1);
        k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 6; if (p > 0) { k.ctx.beginPath(); k.ctx.moveTo(x0, 300); k.ctx.lineTo(lerp(x0, x1, p), 300); k.ctx.stroke(); k.dot(lerp(x0, x1, p), 300, 10, '#FFF3C4', 1); }
        bigNum(k, '~1 GIÂY', W / 2, 180, 'a', { size: 80, color: P.cream, p: k.at('a', 0.5) * (1 - k.at('b', 0.4)) });
        bigNum(k, '~9 NGÀY', W / 2, 180, 'b', { size: 130, color: P.gold });
      },
    },
    {
      say: '{a}Thử tưởng tượng TON 618 nằm ở chỗ của Sagittarius A sao, cách chúng ta hai mươi bảy nghìn năm ánh sáng. {b}Nếu không có bụi che, nó sẽ là một chấm sáng trên bầu trời, sáng hơn trăng rằm hơn mười lần. {c}Bạn có thể nhìn thấy nó giữa ban ngày.',
      draw(k) {
        const day = k.at('c', 2, 'inOut');
        const g = k.ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, `rgb(${lerp(8, 90, day)},${lerp(12, 150, day)},${lerp(34, 215, day)})`); g.addColorStop(1, `rgb(${lerp(26, 190, day)},${lerp(36, 215, day)},${lerp(70, 235, day)})`);
        k.ctx.fillStyle = g; k.ctx.fillRect(0, 0, W, H);
        if (day < 1) { k.ctx.save(); k.ctx.globalAlpha = 1 - day; for (let i = 0; i < 160; i++) k.dot(k.rand(i) * W + k.t * 6, k.rand(i + 300) * 760, 1 + 1.5 * k.rand(i + 600), '#FFFFFF', 0.4 + 0.5 * (0.5 + 0.5 * Math.sin(k.gt * (1 + k.rand(i + 9) * 2) + i))); k.ctx.restore(); }
        k.dot(1500, 260, 54, '#E9E4D8', 1);
        const b = Math.max(0.15 * k.at('a', 3), k.at('b', 1.5));
        const sg = k.ctx.createRadialGradient(620, 330, 2, 620, 330, 220); sg.addColorStop(0, `rgba(255,255,255,${b})`); sg.addColorStop(0.08, `rgba(220,235,255,${0.9 * b})`); sg.addColorStop(1, 'rgba(180,210,255,0)');
        k.ctx.fillStyle = sg; k.ctx.beginPath(); k.ctx.arc(620, 330, 220, 0, Math.PI * 2); k.ctx.fill();
        k.ctx.fillStyle = '#0D1A12'; k.ctx.beginPath(); k.ctx.moveTo(0, 860); for (let x = 0; x <= W; x += 80) k.ctx.lineTo(x, 840 - 40 * Math.abs(Math.sin(x * 0.004)) - (x > 1200 && x < 1500 ? 90 : 0)); k.ctx.lineTo(W, H); k.ctx.lineTo(0, H); k.ctx.fill();
        label(k, 'TRĂNG RẰM', 1500, 360, 'b', { size: 36 });
        label(k, 'TON 618 (GIẢ ĐỊNH)', 620, 470, 'b', { size: 40, color: P.gold });
        chip(k, 'GIẢ ĐỊNH · MINH HOẠ', 60, 70, MP);
        bigNum(k, 'SÁNG HƠN TRĂNG RẰM ×10', W / 2, 980, 'b', { size: 72, color: P.cream });
      },
    },
    {
      say: '{a}Và đây là điều kỳ lạ nhất. {b}Nếu chia đều khối lượng của TON 618 vào bên trong chân trời sự kiện, mật độ trung bình còn loãng hơn không khí bạn đang thở, khoảng một trăm lần. {c}Hố đen càng lớn, bên trong chân trời trung bình càng loãng.',
      draw(k) {
        space(k, { n: 100 });
        horizon(k, 560, 560, 300);
        for (let i = 0; i < 18; i++) { const a = k.rand(i) * 6.28, r = 260 * Math.sqrt(k.rand(i + 5)); k.dot(560 + Math.cos(a) * r, 560 + Math.sin(a) * r, 3, '#8FA3B8', 0.7 * k.at('b', 1)); }
        for (let i = 0; i < 160; i++) { const a = k.rand(i + 40) * 6.28, r = 260 * Math.sqrt(k.rand(i + 45)); k.dot(1360 + Math.cos(a) * r, 560 + Math.sin(a) * r, 3, '#CFE8F0', 0.8 * k.at('b', 1)); }
        k.ctx.strokeStyle = 'rgba(207,232,240,0.5)'; k.ctx.lineWidth = 3; k.ctx.beginPath(); k.ctx.arc(1360, 560, 300, 0, Math.PI * 2); k.ctx.stroke();
        label(k, 'TON 618 (TRUNG BÌNH)', 560, 920, 'b', { size: 40, color: P.gold });
        label(k, 'KHÔNG KHÍ', 1360, 920, 'b', { size: 40 });
        bigNum(k, 'LOÃNG HƠN ~100 LẦN', W / 2, 140, 'b', { size: 84, color: P.gold });
      },
    },
    {
      say: '{a}Điều đó dẫn tới một sự thật kỳ lạ khác. {b}Rơi vào một hố đen nhỏ, lực hấp dẫn ở chân và ở đầu bạn chênh nhau khủng khiếp, kéo dài bạn ra như sợi mì, từ rất xa trước chân trời. {c}Nhưng với một hố đen khổng lồ như TON 618, lực chênh ấy ở chân trời yếu đến mức bạn có thể vượt qua mà không cảm thấy gì. Ít nhất là lúc đầu.',
      draw(k) {
        space(k, { n: 120 });
        const s = k.at('b', 3);
        horizon(k, 480, 560, 70);
        k.ctx.save(); k.ctx.translate(820, 560); k.ctx.rotate(Math.PI / 2); k.ctx.scale(1 - 0.55 * s, 1 + 1.8 * s); human(k, 0, 120, 240); k.ctx.restore();
        label(k, 'HỐ ĐEN NHỎ: KÉO DÀI', 640, 880, 'b', { size: 40, color: P.red });
        horizon(k, 1820, 560, 520, { alpha: k.at('c', 0.8) });
        human(k, 1380, 680, 240, { alpha: k.at('c', 0.8) });
        label(k, 'HỐ ĐEN KHỔNG LỒ: BÌNH THƯỜNG?', 1400, 880, 'c', { size: 40, color: P.gold });
      },
    },
    {
      say: '{a}Lực chênh lệch ấy gọi là lực thuỷ triều. {b}Nghe quen không? Chính nó đang kéo nước biển Việt Nam lên xuống mỗi ngày. Nhưng thủ phạm không phải hố đen, mà là Mặt Trăng. Chúng ta sẽ quay lại chuyện này ở tập sau.',
      draw(k) {
        three(k, 'earth', EARTH, earthUpdate({ spin: 0.05, lon: -0.5, dist: 5.4 }), -240, 0, W, H);
        k.dot(1600, 360, 60 * k.at('b', 0.8), '#C9C3B8', 1);
        const { ctx } = k; ctx.save(); ctx.globalAlpha = 0.5 * k.at('b', 1); ctx.strokeStyle = '#5FB0E8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(W / 2 - 240, H / 2, 330 + 30 * Math.sin(k.gt * 0.8), 300, -0.3, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
        bigNum(k, 'LỰC THUỶ TRIỀU', 1400, 160, 'a', { size: 76, color: P.gold });
        label(k, 'MẶT TRĂNG', 1600, 460, 'b', { size: 40 });
      },
    },

    // ================= 5. GIỚI HẠN =================
    {
      chapter: 'Nấc 5: Hố đen có thể lớn đến đâu?',
      transition: 'fade',
      say: '{a}Vậy TON 618 có phải lớn nhất không? {b}Thật ra, những con số bốn mươi hay sáu mươi sáu tỷ đều là ước tính gián tiếp, từ độ sáng của khí quanh nó. {c}Năm 2025, các nhà khoa học đo được một hố đen theo cách chắc chắn hơn nhiều.',
      draw(k) {
        chapterTag(k, 'Nấc 5 · Giới hạn');
        space(k, { n: 140 });
        bigNum(k, '40 TỶ? 66 TỶ?', W / 2, 460, 'a', { size: 120, color: P.cream });
        label(k, 'ƯỚC TÍNH GIÁN TIẾP', W / 2, 620, 'b', { size: 56, color: P.mute });
        countdown(k, '2025', { x: W / 2, y: 820, align: 'center', size: 70, p: k.at('c', 0.6) });
      },
    },
    {
      say: '{a}Đây là "Móng Ngựa Vũ Trụ", cách chúng ta khoảng năm tỷ năm ánh sáng. {b}Một thiên hà nặng đến mức bẻ cong ánh sáng của thiên hà phía sau thành một vòng cung gần khép kín. {c}Từ độ cong ấy và tốc độ của các ngôi sao, các nhà khoa học tính ra hố đen ở giữa nặng khoảng ba mươi sáu tỷ lần Mặt Trời.',
      draw(k) {
        fill(k, '#000');
        const z = lerp(1.0, 3.2, k.at('a', 6, 'inOut'));
        k.photo('mong-ngua', 0, 0, W, H, { zoom: [z, z], pan: [[0.6, 0.55], [0.86, 0.585]], kp: k.at('a', 6, 'inOut') });
        chip(k, 'HUBBLE · ESA / NASA', 60, 70, SRC);
        bigNum(k, '~36 TỶ MẶT TRỜI', W / 2, 960, 'c', { size: 96, color: P.gold });
      },
    },
    {
      say: '{a}Còn những con số lớn hơn, như một trăm tỷ lần Mặt Trời cho hố đen Phoenix A, thì vẫn đang gây tranh cãi. {b}Vì có một câu hỏi lớn hơn: hố đen có thể lớn mãi không?',
      draw(k) {
        space(k, { n: 140 });
        bigNum(k, 'PHOENIX A: 100 TỶ?', W / 2, 420, 'a', { size: 100, color: P.cream });
        chip(k, 'GÂY TRANH CÃI', W / 2 - 150, 560, { ...MP, size: 30, p: k.at('a', 0.8) });
        bigNum(k, 'LỚN MÃI ĐƯỢC KHÔNG?', W / 2, 820, 'b', { size: 96, color: P.gold });
      },
    },
    {
      say: '{a}Một nhà vật lý người Anh, Andrew King, đã tính rằng: khi hố đen nặng quá khoảng năm mươi tỷ lần Mặt Trời, {b}khí quanh nó sẽ vỡ ra thành những ngôi sao mới trước khi kịp xoáy vào gần. {c}Không còn đĩa khí nóng sáng để nuôi nó. Hố đen gần như ngừng lớn, và tắt dần trong bóng tối.',
      draw(k) {
        bh3d(k, { dist: 12, orbit: 0.05, exp: lerp(1.2, 0.25, k.at('c', 5, 'inOut')) });
        chip(k, 'GIẢ THUYẾT · MINH HOẠ', 60, 70, MP);
        bigNum(k, '~50 TỶ: GIỚI HẠN?', W / 2, 940, 'a', { size: 96, color: P.gold });
      },
    },
    {
      say: '{a}Đó vẫn là giả thuyết. Hố đen còn có thể lớn thêm bằng cách nhập vào nhau. {b}Nhưng nếu đúng, những gã khổng lồ như TON 618 đã ở rất gần giới hạn mà vũ trụ cho phép. {c}Và chúng ta đang may mắn được nhìn thấy chúng, trong lúc chúng còn sáng.',
      draw(k) {
        space(k, { n: 160 });
        const items = [['SGR A*', 0.004], ['M87*', 6.5], ['MÓNG NGỰA', 36], ['TON 618', 40], ['GIỚI HẠN?', 50]];
        const x0 = 260, x1 = 1660;
        k.ctx.strokeStyle = 'rgba(245,241,230,0.4)'; k.ctx.lineWidth = 3; k.ctx.beginPath(); k.ctx.moveTo(x0, 620); k.ctx.lineTo(x1, 620); k.ctx.stroke();
        items.forEach(([t, m], i) => { const x = lerp(x0, x1, m / 50), p = k.at(k.cue('a', 1 + i * 0.6), 0.6); k.dot(x, 620, i === 4 ? 16 : 12, i === 4 ? P.red : P.gold, p); label(k, t, x, i % 2 ? 700 : 540, k.cue('a', 1 + i * 0.6), { size: 36, color: i === 4 ? P.red : P.cream }); });
        label(k, 'TỶ LẦN MẶT TRỜI →', x1, 780, 'a', { size: 30, color: P.mute, align: 'right' });
        bigNum(k, 'SÁT GIỚI HẠN', W / 2, 220, 'b', { size: 96, color: P.gold });
      },
    },

    {
      say: '{a}Và còn một câu hỏi chưa ai trả lời được. {b}Ánh sáng của TON 618 rời đi khi vũ trụ mới khoảng ba tỷ tuổi. {c}Làm sao một hố đen kịp lớn tới bốn mươi tỷ lần Mặt Trời nhanh như vậy? {d}Kính James Webb còn tìm thấy những hố đen lớn xuất hiện sớm hơn nữa, chỉ vài trăm triệu năm sau vụ nổ lớn. Đó là một trong những bí ẩn lớn nhất của thiên văn học hôm nay.',
      draw(k) {
        space(k, { n: 140 });
        const x0 = 200, x1 = 1720, y = 560, t = (g) => lerp(x0, x1, g / 13.8);
        k.ctx.strokeStyle = 'rgba(245,241,230,0.5)'; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.moveTo(x0, y); k.ctx.lineTo(lerp(x0, x1, k.at('a', 2)), y); k.ctx.stroke();
        label(k, 'VỤ NỔ LỚN', x0, y + 60, 'a', { size: 34 });
        label(k, 'HÔM NAY · 13,8 TỶ NĂM', x1, y + 60, 'a', { size: 34, align: 'right' });
        k.dot(t(2.9), y, 16, P.gold, k.at('b', 0.6)); label(k, 'TON 618 · ~3 TỶ NĂM', t(2.9), y - 60, 'b', { size: 38, color: P.gold });
        k.dot(t(0.47), y, 12, '#FF7A1A', k.at('d', 0.6)); label(k, 'WEBB · ~0,5 TỶ', t(0.47), y + 120, 'd', { size: 34, color: P.orange });
        bigNum(k, 'LỚN NHANH THẾ NÀO?', W / 2, 220, 'c', { size: 96, color: P.cream });
      },
    },
    // ================= KẾT =================
    {
      chapter: 'Kết: chúng ta cũng đang quay quanh một hố đen',
      transition: 'fade',
      say: '{a}Hãy nhìn lại thang của chúng ta. {b}Một hố đen nhỏ nhất rộng vài km. {c}Sagittarius A sao rộng gấp mười tám lần Mặt Trời. {d}M87 sao nuốt trọn Hệ Mặt Trời. {e}Còn TON 618, ánh sáng cũng cần chín ngày để đi ngang qua.',
      draw(k) {
        space(k, { n: 120 });
        const rows = [['b', '~6 KM', 'HỐ ĐEN NHỎ NHẤT'], ['c', '× 18 MẶT TRỜI', 'SGR A*'], ['d', '× 3 QUỸ ĐẠO SAO DIÊM VƯƠNG', 'M87*'], ['e', '9 NGÀY ÁNH SÁNG', 'TON 618']];
        rows.forEach(([c, a, b], i) => { const y = 260 + i * 170; label(k, b, 420, y, c, { size: 50, align: 'left', color: i === 3 ? P.gold : P.cream }); label(k, a, 1500, y, c, { size: 50, align: 'right', color: '#9FD8EA' }); });
      },
    },
    {
      say: '{a}Và có một điều ít người để ý. {b}Ngay lúc này, Trái Đất, Mặt Trời và mọi thứ bạn biết đang lao quanh Sagittarius A sao, với tốc độ khoảng hai trăm ba mươi km mỗi giây. {c}Một vòng mất khoảng hai trăm ba mươi triệu năm. {d}Lần cuối chúng ta ở đúng vị trí này, những con khủng long đầu tiên vừa xuất hiện.',
      draw(k) {
        fill(k, '#000');
        k.clip('ngan-ha', 0, 0, W, H, { at: 0, zoom: [1.05, 1.12], dim: 0.2 });
        chip(k, 'ASTROBOND · DẢI NGÂN HÀ', 60, 70, SRC);
        bigNum(k, '~230 KM/S', W / 2, 180, 'b', { size: 100, color: P.cream });
        bigNum(k, '1 VÒNG ≈ 230 TRIỆU NĂM', W / 2, 960, 'c', { size: 80, color: P.gold });
      },
    },
    {
      say: '{a}Chúng ta an toàn. Ở khoảng cách hai mươi bảy nghìn năm ánh sáng, hố đen ấy không thể kéo chúng ta vào. {b}Một hạt bụi xanh nhỏ bé, quay đều quanh một gã khổng lồ vô hình, {c}như nó đã làm từ trước khi có khủng long.',
      tail: 1.4,
      draw(k) {
        space(k, { n: 220 });
        const p = k.at('b', 6, 'inOut');
        horizon(k, W / 2, 540, lerp(10, 90, p), { alpha: p });
        const a = k.gt * 0.3, r = lerp(200, 380, p);
        earthPhoto(k, W / 2 + Math.cos(a) * r, 540 + Math.sin(a) * r * 0.4, lerp(260, 26, k.at('a', 5, 'inOut')));
      },
    },
    {
      say: '{a}Nếu được chọn, bạn muốn tận mắt nhìn hố đen nào: {b}Sagittarius A sao, gã hàng xóm ở trung tâm Ngân Hà, {c}hay TON 618, gã khổng lồ cách mười một tỷ năm ánh sáng? {d}Viết lựa chọn của bạn ở phần bình luận.',
      draw(k) {
        space(k, { n: 120 });
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(W / 2 - 3, 180, 6, 640);
        k.photo('eht-sgra', W / 4 - 220, 280, 440, 440, { zoom: [1.1, 1.1], radius: 220, credit: false });
        horizon(k, W * 3 / 4, 500, 220);
        bigNum(k, 'SGR A*', W / 4, 200, 'b', { size: 80, color: P.cream });
        bigNum(k, 'TON 618', W * 3 / 4, 200, 'c', { size: 80, color: P.gold });
        bigNum(k, 'BẠN CHỌN?', W / 2, 960, 'd', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Tập sau trên Hạt Bụi Xanh: thứ đang kéo biển của chúng ta lên xuống mỗi ngày. {b}Mỗi năm, Mặt Trăng rời xa Trái Đất khoảng ba phẩy tám xăng-ti-mét. {c}Điều gì sẽ xảy ra, nếu một đêm, nó biến mất hoàn toàn? {d}Đăng ký kênh để không bỏ lỡ.',
      tail: 2.2,
      draw(k) {
        space(k, { n: 200 });
        label(k, 'TẬP SAU', W / 2, 110, 'a', { size: 60, color: P.mute });
        const gone = k.at('c', 1.2);
        three(k, 'earth', EARTH, earthUpdate({ spin: 0.05, lon: -0.2, dist: 7 }), -300, 60, W, H);
        k.ctx.save(); k.ctx.globalAlpha = 1 - gone; k.dot(1500 + 40 * k.at('b', 3), 420, 70, '#C9C3B8', 1); k.ctx.restore();
        countdown(k, '+3,8 CM / NĂM', { x: 1500, y: 560, align: 'center', size: 46, p: k.at('b', 0.6) * (1 - gone) });
        bigNum(k, 'NẾU MẶT TRĂNG BIẾN MẤT?', W / 2, 900, 'c', { size: 80, color: P.gold });
        chip(k, '🔔 ĐĂNG KÝ HẠT BỤI XANH', W / 2 - 230, 1010, { bg: P.gold, p: k.at('d', 0.6) });
      },
    },
  ],
};
