// Hạt Bụi Xanh · tập 9 — Kính James Webb Vừa Thấy Thứ Không Thể Tồn Tại (bảng nguồn: kich-ban.md, 19/11/2026)
// Thang ngược thời gian: ảnh đầu tiên (4,6 tỷ năm) → "kẻ phá vũ trụ" (~600 triệu năm sau vụ nổ lớn) → kỷ lục 280–290 triệu năm
// → chấm đỏ nhỏ → hố đen quá sớm (trả vòng mở tập 109) → Big Bang có sai không? (không: thứ bị thách thức là tốc độ hình thành).
// Fact check (nguồn chính):
// - JWST phóng 25/12/2021 (Ariane 5, Kourou); gương 6,5 m, 18 mảnh berili mạ vàng (~6 lần diện tích Hubble); tấm chắn nắng 5 lớp cỡ sân tennis;
//   thiết bị lạnh dưới ~ −220°C; quỹ đạo quanh L2 cách ~1,5 triệu km (~4 lần khoảng cách Mặt Trăng); chi phí ~10 tỷ USD (NASA).
// - Ảnh đầu tiên (7/2022): đám thiên hà SMACS 0723, mảnh trời bằng hạt cát ở tầm tay, phơi sáng ~12,5 giờ; ánh sáng đám này ~4,6 tỷ năm (NASA).
// - Vũ trụ giãn nở kéo dài bước sóng → ánh sáng thiên hà sớm nhất tới ta ở dạng hồng ngoại (lý do Webb nhìn hồng ngoại).
// - Labbé et al. (2023, Nature): 6 ứng viên thiên hà ~500–700 triệu năm sau vụ nổ lớn, khối lượng ước tới cỡ Ngân Hà ("universe breakers");
//   phổ về sau cho thấy một số được hố đen làm sáng thêm, khối lượng sao bị ước cao — tranh luận còn tiếp.
// - JADES-GS-z14-0 (Carniani et al. 2024, Nature): ~290 triệu năm sau vụ nổ lớn, rộng ~1.600 năm ánh sáng, sáng bất thường;
//   ALMA thấy oxy (2025) → đã có thế hệ sao trước. MoM-z14 (Naidu et al. 2025): ~280 triệu năm — kỷ lục đã xác nhận bằng phổ.
// - "Chấm đỏ nhỏ" (little red dots): nhỏ gọn, đỏ, phổ biến ~0,6–1,5 tỷ năm sau vụ nổ lớn; gần như không phát tia X; bản chất chưa rõ
//   (hố đen bọc khí dày "black hole star" — giả thuyết 2025; hoặc cụm sao cực đặc) (NASA/STScI).
// - UHZ1 (Bogdán et al. 2023, Nature Astronomy; Chandra + Webb): hố đen ~10–100 triệu M☉, ~470 triệu năm sau vụ nổ lớn → ủng hộ "hạt giống nặng"
//   (đám khí sụp thẳng thành hố đen) — giả thuyết.
// - Tuổi vũ trụ ~13,8 tỷ năm; Trái Đất ~4,5 tỷ năm. Tinh vân Vành Nhẫn Nam (NGC 3132) ~2.500 năm ánh sáng, một ngôi sao đang chết (NASA/Webb 2022).
import { P, fill, space, bigNum, label, chip, chapterTag, scaleBar, countdown } from '/channel/hat-bui-xanh.js';
import { three } from '/engine/gl3d.js';
import { blackHoleScene, blackHoleUpdate } from '/channel/hat-bui-xanh-3d.js';
import * as thumbs from '/videos/139-kinh-james-webb-thu-khong-the-ton-tai/thumbs.js';

const W = 1920, H = 1080;
const lerp = (a, b, p) => a + (b - a) * p;
const SRC = { bg: 'rgba(245,241,230,0.85)', size: 22 };
const MP = { bg: 'rgba(255,211,78,0.9)', size: 22 };
const BH = blackHoleScene();
// Nền sao + những đám tinh vân mờ trôi chậm (để nền không bao giờ đứng yên).
function sky(k, o = {}) {
  space(k, o);
  const { ctx } = k, t = k.gt ?? 0;
  for (let i = 0; i < 22; i++) {
    const r = 70 + 90 * k.rand(i + 70), x = ((k.rand(i) * (W + 400) + t * (18 + 14 * k.rand(i + 3))) % (W + 400)) - 200, y = 80 + k.rand(i + 30) * 920 + 30 * Math.sin(t * 0.3 + i);
    const g = ctx.createRadialGradient(x, y, 2, x, y, r); const c = i % 3 ? '120,150,230' : '230,140,110';
    g.addColorStop(0, `rgba(${c},0.22)`); g.addColorStop(1, `rgba(${c},0)`); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
}
const bh3d = (k, o = {}) => three(k, 'bh', BH, blackHoleUpdate({ orbit: o.orbit ?? 0.05, dist: o.dist ?? 12, tilt: o.tilt ?? 0.14 }), 0, 0, W, H, { exposure: o.exp ?? 1.1 });
const earthPhoto = (k, x, y, r) => { const s = r / 0.85; k.ctx.save(); k.ctx.beginPath(); k.ctx.arc(x, y, r, 0, Math.PI * 2); k.ctx.clip(); k.photo('trai-dat-that', x - s, y - s, s * 2, s * 2, { zoom: [1, 1], credit: false }); k.ctx.restore(); };
const photo = (k, name, o = {}) => { fill(k, '#000'); k.photo(name, 0, 0, W, H, { zoom: o.zoom ?? [1.0, 1.18], pan: o.pan, focus: o.focus, dim: o.dim, p: o.p, fx: o.fx, credit: o.credit }); };
// Trục thời gian vũ trụ (13,8 tỷ năm): x0..x1, đánh dấu các mốc.
function timeline(k, marks, p = 1, o = {}) {
  const x0 = o.x0 ?? 180, x1 = o.x1 ?? 1740, y = o.y ?? 560, T = o.span ?? 13.8, t = (g) => lerp(x0, x1, g / T);
  k.ctx.strokeStyle = 'rgba(245,241,230,0.5)'; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.moveTo(x0, y); k.ctx.lineTo(lerp(x0, x1, p), y); k.ctx.stroke();
  k.text('VỤ NỔ LỚN', x0, y + 56, { size: 32, font: 'title', color: P.cream, p, outline: P.ink, outlineWidth: 6 });
  k.text(o.endLabel ?? 'HÔM NAY · 13,8 TỶ NĂM', x1, y + 56, { size: 32, font: 'title', color: P.cream, align: 'right', p, outline: P.ink, outlineWidth: 6 });
  marks.forEach(([g, text, col, q, up]) => { if (q <= 0) return; k.dot(t(g), y, 14, col, q); k.text(text, t(g), up ? y - 60 : y + 110, { size: 34, font: 'title', color: col, p: q, outline: P.ink, outlineWidth: 7 }); });
}
// Sóng ánh sáng bị kéo dài (lệch đỏ): từ trái sang phải bước sóng tăng, màu xanh → đỏ.
function stretchWave(k, p) {
  const { ctx } = k; const x0 = 160, x1 = 1760, y = 560;
  ctx.lineWidth = 6; ctx.beginPath();
  let ph = 0;
  for (let x = x0; x <= lerp(x0, x1, p); x += 3) { const u = (x - x0) / (x1 - x0), lam = lerp(40, 220, u); ph += (3 / lam) * Math.PI * 2; const yy = y + 110 * Math.sin(ph - k.gt * 3); x === x0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); }
  const g = ctx.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, '#7FB2FF'); g.addColorStop(0.5, '#FFD34E'); g.addColorStop(1, '#E5383B'); ctx.strokeStyle = g; ctx.stroke();
}

export default {
  meta: {
    title: 'Kính James Webb Vừa Thấy Thứ Không Thể Tồn Tại',
    description: 'Kính James Webb nhìn ngược thời gian về những ngày đầu của vũ trụ. Và nó thấy những thiên hà quá lớn, quá sáng, xuất hiện quá sớm, như những đứa trẻ sơ sinh đã cao bằng người lớn.\n\nNhững "kẻ phá vũ trụ" năm 2023, thiên hà xa nhất từng được xác nhận chỉ khoảng 280 triệu năm sau vụ nổ lớn, những "chấm đỏ nhỏ" chưa ai giải thích được, và hố đen khổng lồ xuất hiện quá sớm. Vậy Big Bang có sai không? Câu trả lời ở cuối video. Mọi con số đều có nguồn bên dưới.',
    footer: '📚 Nguồn tham khảo\n• NASA, ESA, CSA, STScI – kính James Webb, ảnh và dữ liệu\n• Labbé et al. (2023), Nature – các thiên hà quá lớn quá sớm\n• Carniani et al. (2024), Nature – JADES-GS-z14-0; quan sát oxy bằng ALMA (2025)\n• Naidu et al. (2025) – MoM-z14\n• Bogdán et al. (2023), Nature Astronomy – hố đen UHZ1 (Chandra + Webb)\n• NASA/STScI (2025) – "chấm đỏ nhỏ"\n\n🌍 Hạt Bụi Xanh — khoa học về những thứ khổng lồ, cổ xưa và đáng sợ trên hạt bụi xanh của chúng ta. Video mới mỗi ngày lúc 20:00.',
    links: [['▶ Tập trước: Điều Gì Xảy Ra Nếu Mặt Trăng Biến Mất?', '115-neu-mat-trang-bien-mat'], ['▶ Hố Đen Lớn Nhất Vũ Trụ Lớn Đến Mức Nào?', '109-ho-den-lon-nhat-vu-tru']],
    tags: ['kính james webb', 'james webb phát hiện', 'thiên hà xa nhất', 'vũ trụ sơ khai', 'big bang', 'chấm đỏ nhỏ', 'vũ trụ', 'thiên văn học', 'khoa học', 'hạt bụi xanh'],
    hashtags: ['jameswebb', 'vutru', 'khoahoc', 'hatbuixanh'],
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
      chapter: 'Mở đầu: bức ảnh tháng 7 năm 2022',
      say: '{a}Tháng bảy năm 2022, NASA công bố bức ảnh đầu tiên của kính thiên văn James Webb. {b}Nó chụp một mảnh trời chỉ bằng hạt cát cầm ở đầu ngón tay. {c}Và trong mảnh trời nhỏ xíu ấy, có hàng nghìn thiên hà.',
      draw(k) {
        photo(k, 'deep-field', { zoom: [1.0, 1.35], pan: [[0.5, 0.5], [0.46, 0.44]] });
        chip(k, 'NASA, ESA, CSA, STSCI · SMACS 0723', 60, 70, SRC);
        countdown(k, '7/2022', { x: W - 60, y: 80, p: k.at('a', 0.6) });
        bigNum(k, 'HÀNG NGHÌN THIÊN HÀ', W / 2, 960, 'c', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Nhưng thứ làm các nhà khoa học mất ngủ không phải bức ảnh đẹp ấy. {b}Mà là những gì Webb thấy sau đó, khi nhìn sâu hơn nữa: những thiên hà quá lớn, quá sáng, xuất hiện quá sớm. {c}Như những đứa trẻ sơ sinh, đã cao bằng người lớn.',
      draw(k) {
        photo(k, 'z14', { zoom: [1.4, 2.6], pan: [[0.55, 0.5], [0.79, 0.21]] });
        chip(k, 'NASA, ESA, CSA, STSCI · B. ROBERTSON', 60, 70, SRC);
        bigNum(k, 'QUÁ LỚN · QUÁ SỚM', W / 2, 960, 'b', { size: 96, color: P.gold });
      },
    },
    {
      say: '{a}Có những thứ mà theo hiểu biết của các nhà khoa học, lẽ ra không thể tồn tại vào lúc ấy. {b}Vậy Big Bang có sai không? {c}Đến cuối video, bạn sẽ có câu trả lời. Và bạn sẽ biết vì sao câu trả lời ấy còn kỳ lạ hơn cả câu hỏi.',
      draw(k) {
        sky(k, { n: 200 });
        const p = k.at('a', 3);
        for (let i = 0; i < 40; i++) { const a = k.rand(i) * 6.28, r = lerp(40, 700, (k.rand(i + 5) + k.t * 0.05) % 1); k.dot(W / 2 + Math.cos(a) * r, 540 + Math.sin(a) * r * 0.6, 3 + 4 * k.rand(i + 9), i % 3 ? '#FFB27A' : '#CFE3FF', p * 0.8); }
        bigNum(k, 'BIG BANG SAI?', W / 2, 540, 'b', { size: 140, color: P.cream });
      },
    },
    {
      say: '{a}Đây là Hạt Bụi Xanh. Tập trước, chúng ta tưởng tượng Mặt Trăng biến mất. {b}Hôm nay, chúng ta đi ngược thời gian, gần như về tới lúc vũ trụ ra đời.',
      draw(k) {
        fill(k, '#000');
        k.clip('hubble-zoom', 0, 0, W, H, { at: 0, zoom: [1, 1.03] });
        chip(k, 'HUBBLE · NASA/ESA', 60, 70, SRC);
        bigNum(k, 'NGƯỢC THỜI GIAN', W / 2, 960, 'b', { size: 100, color: P.gold });
      },
    },

    // ================= 1. KÍNH JAMES WEBB =================
    {
      chapter: 'Cỗ máy thời gian 10 tỷ đô',
      transition: 'fade',
      say: '{a}Ngày Giáng sinh năm 2021, kính James Webb được phóng lên từ Guyane thuộc Pháp, trên một tên lửa Ariane 5. {b}Đây là kính thiên văn không gian lớn nhất và đắt nhất từng được chế tạo, khoảng mười tỷ đô la.',
      draw(k) {
        chapterTag(k, 'Kính James Webb');
        photo(k, 'phong', { zoom: [1.0, 1.25], pan: [[0.5, 0.65], [0.5, 0.35]] });
        chip(k, 'NASA / CHRIS GUNN · 25/12/2021', 60, 1010, SRC);
        bigNum(k, '~10 TỶ ĐÔ LA', W / 2, 160, 'b', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Gương chính của nó rộng sáu phẩy năm mét, ghép từ mười tám mảnh lục giác, phủ một lớp vàng mỏng. {b}Gấp khoảng sáu lần diện tích gương của kính Hubble. {c}Người đứng phía trước trông nhỏ bé thế này.',
      draw(k) {
        photo(k, 'guong', { zoom: [1.0, 1.3], pan: [[0.5, 0.5], [0.5, 0.42]] });
        chip(k, 'NASA / MSFC · GƯƠNG CHÍNH JWST', 60, 70, SRC);
        bigNum(k, '6,5 M · 18 MẢNH VÀNG', W / 2, 960, 'a', { size: 84, color: P.gold });
        label(k, '≈ 6 × HUBBLE', W / 2, 1040, 'b', { size: 46, color: P.cream });
      },
    },
    {
      say: '{a}Webb không bay quanh Trái Đất. Nó trôi ở một điểm cách chúng ta một triệu rưỡi km, gấp khoảng bốn lần khoảng cách tới Mặt Trăng. {b}Một tấm chắn nắng năm lớp, rộng bằng sân tennis, che cho nó khỏi Mặt Trời. {c}Phía sau tấm chắn, các thiết bị lạnh tới khoảng âm hai trăm hai mươi độ C.',
      draw(k) {
        sky(k, { n: 160 });
        earthPhoto(k, 260, 560, 70);
        k.dot(260 + 1500 * 0.27, 560, 18, '#C9C3B8', 1);
        const p = k.at('a', 3); k.ctx.strokeStyle = 'rgba(255,211,78,0.8)'; k.ctx.lineWidth = 4; k.ctx.setLineDash([12, 10]); k.ctx.beginPath(); k.ctx.moveTo(340, 560); k.ctx.lineTo(lerp(340, 1700, p), 560); k.ctx.stroke(); k.ctx.setLineDash([]);
        const x = 1720, y = 560, q = k.at('b', 1);
        for (let i = 0; i < 5; i++) { k.ctx.fillStyle = `rgba(${200 - i * 12},${170 - i * 10},${220 - i * 8},${0.85 * q})`; k.ctx.beginPath(); k.ctx.moveTo(x - 120 + i * 6, y + 40 - i * 6); k.ctx.lineTo(x + 30, y + 90 - i * 6); k.ctx.lineTo(x + 120 - i * 6, y + 40 - i * 6); k.ctx.lineTo(x + 30, y - 10 - i * 6); k.ctx.closePath(); k.ctx.fill(); }
        k.dot(x + 20, y - 70, 28, '#D9B451', q);
        label(k, 'TRÁI ĐẤT', 260, 680, 'a', { size: 34 });
        bigNum(k, '1,5 TRIỆU KM', W / 2, 380, 'a', { size: 90, color: P.cream });
        bigNum(k, '~ −220°C', W / 2, 900, 'c', { size: 110, color: '#9FD8EA' });
        chip(k, 'MINH HOẠ', 60, 70, MP);
      },
    },
    {
      say: '{a}Gương và tấm chắn nắng quá lớn để nhét vừa tên lửa, nên Webb phải gấp lại như một con hạc giấy, rồi tự mở ra ngoài không gian. {b}Các kỹ sư đếm được ba trăm bốn mươi bốn điểm mà chỉ cần một điểm hỏng, cả sứ mệnh coi như thất bại. {c}Mất khoảng hai tuần để mở, và thêm nhiều tháng để căn chỉnh mười tám mảnh gương chính xác tới từng phần nhỏ của sợi tóc.',
      draw(k) {
        sky(k, { n: 140 });
        const p = k.at('a', 6, 'inOut'), cx = W / 2, cy = 520;
        for (let i = 0; i < 18; i++) { const row = Math.floor(i / 6), a = (i % 6) / 6 * Math.PI * 2 + 0.52, r = row === 0 ? 0 : row === 1 ? 92 : 170; const fold = (i % 3 === 2) ? 1 - p : 0; const x = cx + Math.cos(a) * r * (1 - 0.6 * fold), y = cy + Math.sin(a) * r; k.ctx.save(); k.ctx.translate(x, y); k.ctx.scale(1 - 0.7 * fold, 1); k.ctx.beginPath(); for (let j = 0; j < 6; j++) { const b = j / 6 * Math.PI * 2; k.ctx.lineTo(Math.cos(b) * 48, Math.sin(b) * 48); } k.ctx.closePath(); k.ctx.fillStyle = '#D9B451'; k.ctx.fill(); k.ctx.strokeStyle = '#7A5A1A'; k.ctx.lineWidth = 3; k.ctx.stroke(); k.ctx.restore(); }
        bigNum(k, '344 ĐIỂM CÓ THỂ HỎNG', W / 2, 160, 'b', { size: 84, color: P.red });
        bigNum(k, '~2 TUẦN ĐỂ MỞ', W / 2, 920, 'c', { size: 84, color: P.gold });
        chip(k, 'MINH HOẠ', 60, 70, MP);
      },
    },
    {
      say: '{a}Vì sao phải lạnh đến thế? Vì Webb nhìn bằng ánh sáng hồng ngoại, thứ ánh sáng của nhiệt. {b}Và có một lý do rất đặc biệt để nhìn hồng ngoại: vũ trụ đang giãn nở. {c}Ánh sáng đi qua hàng tỷ năm bị kéo dài ra, từ ánh sáng xanh, thành đỏ, rồi thành hồng ngoại mà mắt người không nhìn thấy.',
      draw(k) {
        sky(k, { n: 100 });
        stretchWave(k, k.at('b', 6, 'linear'));
        label(k, 'LÚC PHÁT RA', 260, 760, 'b', { size: 40, color: '#9FC4FF' });
        label(k, 'KHI TỚI WEBB: HỒNG NGOẠI', 1500, 760, 'c', { size: 40, color: P.red });
        bigNum(k, 'VŨ TRỤ GIÃN NỞ', W / 2, 230, 'b', { size: 96, color: P.cream });
        chip(k, 'MINH HOẠ', 60, 70, MP);
      },
    },
    {
      say: '{a}Ánh sáng còn cần thời gian để đi tới chúng ta. Nhìn càng xa, là nhìn càng sâu về quá khứ. {b}Đám thiên hà trong bức ảnh đầu tiên trông như nó của bốn tỷ sáu trăm triệu năm trước. {c}Còn những chấm đỏ mờ nhất phía sau, là ánh sáng đã đi hơn mười ba tỷ năm.',
      draw(k) {
        photo(k, 'deep-field', { zoom: [1.5, 2.2], pan: [[0.5, 0.5], [0.62, 0.36]] });
        chip(k, 'NASA, ESA, CSA, STSCI', 60, 70, SRC);
        bigNum(k, '4,6 TỶ NĂM', W / 2, 160, 'b', { size: 90, color: P.cream, p: k.at('b', 0.5) * (1 - k.at('c', 0.5)) });
        bigNum(k, '> 13 TỶ NĂM', W / 2, 160, 'c', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Các nhà thiên văn đo độ xa bằng một con số tên là "z", độ lệch đỏ. {b}Một thiên hà có z bằng mười bốn nghĩa là ánh sáng của nó đã bị kéo dài khoảng mười lăm lần trên đường đi. {c}Con số z càng lớn, thiên hà càng xa, và ta càng nhìn thấy nó trẻ hơn.',
      draw(k) {
        sky(k, { n: 100 });
        const z = Math.round(lerp(0, 14, k.at('a', 6, 'inOut')));
        bigNum(k, `z = ${z}`, W / 2, 400, 'a', { size: 180, color: P.gold });
        scaleBar(k, 360, 360 + 80, 680, '1×', { p: k.at('b', 0.6), color: '#9FC4FF' });
        scaleBar(k, 360, 360 + 80 * 15, 800, '× 15', { p: k.at('b', 2), color: P.red });
        bigNum(k, 'CÀNG XA · CÀNG TRẺ', W / 2, 980, 'c', { size: 70, color: P.cream });
      },
    },

    // ================= 2. KẺ PHÁ VŨ TRỤ =================
    {
      chapter: '2023: "những kẻ phá vũ trụ"',
      transition: 'fade',
      say: '{a}Theo hiểu biết trước đây, những thiên hà đầu tiên phải nhỏ bé và mờ nhạt. {b}Giống như một thị trấn mới lập thì chỉ có vài ngôi nhà, phải mất hàng tỷ năm mới thành thành phố. {c}Vũ trụ mới vài trăm triệu tuổi thì lấy đâu ra thời gian xây những thiên hà khổng lồ?',
      draw(k) {
        chapterTag(k, 'Kẻ phá vũ trụ');
        sky(k, { n: 120 });
        const p = k.at('b', 4, 'inOut');
        for (let i = 0; i < 12; i++) { const n = Math.round(lerp(3, 60, p * (i / 12 + 0.1))); for (let j = 0; j < n; j++) k.dot(160 + i * 140 + 40 * k.rand(i * 99 + j), 640 - 160 * k.rand(i * 77 + j) * (i / 12), 4, '#FFD9A0', 0.6); }
        timeline(k, [], k.at('a', 1.5), { y: 860 });
        bigNum(k, 'LẤY ĐÂU RA THỜI GIAN?', W / 2, 220, 'c', { size: 84, color: P.gold });
        chip(k, 'MINH HOẠ', 60, 1010, MP);
      },
    },
    {
      say: '{a}Tháng hai năm 2023, một nhóm nhà thiên văn công bố sáu ứng viên thiên hà, chỉ khoảng năm đến bảy trăm triệu năm sau vụ nổ lớn. {b}Ước tính ban đầu cho thấy vài thiên hà nặng gần bằng cả dải Ngân Hà ngày nay. {c}Báo chí đặt cho chúng một cái tên: "những kẻ phá vũ trụ".',
      draw(k) {
        sky(k, { n: 120 });
        timeline(k, [[0.6, '~0,5–0,7 TỶ NĂM', P.red, k.at('a', 0.8), true]], k.at('a', 1.5));
        bigNum(k, '6 ỨNG VIÊN', W / 2, 220, 'a', { size: 90, color: P.cream });
        bigNum(k, '"KẺ PHÁ VŨ TRỤ"', W / 2, 900, 'c', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Nhưng khoa học không dừng ở tiêu đề báo. {b}Khi đo kỹ hơn, nhiều ứng viên hoá ra nhỏ hơn ước tính. Một phần ánh sáng của chúng không đến từ sao, mà từ một hố đen đang nuốt khí ở giữa. {c}Câu hỏi nhỏ lại. Nhưng không biến mất. Và Webb càng nhìn sâu, nó càng thấy nhiều thứ lạ hơn.',
      draw(k) {
        sky(k, { n: 120 });
        const p = k.at('b', 3, 'inOut');
        const g = k.ctx.createRadialGradient(W / 2, 520, 4, W / 2, 520, lerp(300, 150, p)); g.addColorStop(0, 'rgba(255,220,170,1)'); g.addColorStop(1, 'rgba(255,140,80,0)'); k.ctx.fillStyle = g; k.ctx.beginPath(); k.ctx.arc(W / 2, 520, 300, 0, Math.PI * 2); k.ctx.fill();
        k.dot(W / 2, 520, 22 * k.at('b', 1), '#000', 1); k.ctx.strokeStyle = `rgba(255,180,90,${k.at('b', 1)})`; k.ctx.lineWidth = 5; k.ctx.beginPath(); k.ctx.ellipse(W / 2, 520, 60, 14, -0.2, 0, Math.PI * 2); k.ctx.stroke();
        label(k, 'MỘT PHẦN ÁNH SÁNG: HỐ ĐEN', W / 2, 860, 'b', { size: 52, color: P.gold });
        bigNum(k, 'NHỎ HƠN ƯỚC TÍNH', W / 2, 200, 'b', { size: 84, color: P.cream });
        chip(k, 'MINH HOẠ', 60, 70, MP);
      },
    },

    {
      say: '{a}Và có cả những lần chính Webb bị lừa. {b}Năm 2022, một ứng viên tên CEERS-93316 từng được báo là thiên hà xa nhất, chỉ hai trăm năm mươi triệu năm sau vụ nổ lớn. {c}Nhưng khi đo phổ ánh sáng, các nhà khoa học phát hiện nó gần hơn rất nhiều: bụi và khí đỏ đã khiến nó trông như ở xa. {d}Vì thế, một kỷ lục chỉ được công nhận khi có phổ ánh sáng xác nhận.',
      draw(k) {
        sky(k, { n: 120 });
        bigNum(k, 'CEERS-93316', W / 2, 260, 'b', { size: 96, color: P.cream });
        bigNum(k, 'z ≈ 16?', W / 2, 460, 'b', { size: 130, color: P.gold, p: k.at('b', 0.5) * (1 - k.at('c', 0.5)) });
        bigNum(k, 'z ≈ 4,9', W / 2, 460, 'c', { size: 130, color: P.red });
        k.ctx.strokeStyle = `rgba(229,56,59,${k.at('c', 0.5)})`; k.ctx.lineWidth = 10; k.ctx.beginPath(); k.ctx.moveTo(W / 2 - 260, 600); k.ctx.lineTo(W / 2 + 260, 320); k.ctx.stroke();
        label(k, 'CHỈ TIN KHI CÓ PHỔ ÁNH SÁNG', W / 2, 880, 'd', { size: 56, color: P.cream });
      },
    },
    // ================= 3. KỶ LỤC =================
    {
      chapter: 'Thiên hà xa nhất: 280 triệu năm',
      transition: 'fade',
      say: '{a}Năm 2024, Webb xác nhận một thiên hà tên JADES-GS-z14-0. {b}Ánh sáng của nó rời đi chỉ khoảng hai trăm chín mươi triệu năm sau vụ nổ lớn, khi vũ trụ mới khoảng hai phần trăm tuổi hiện nay. {c}Nó không phải một đốm mờ. Nó rộng khoảng một nghìn sáu trăm năm ánh sáng, và sáng một cách bất thường.',
      draw(k) {
        chapterTag(k, 'Kỷ lục');
        photo(k, 'z14', { zoom: [2.2, 4.2], pan: [[0.78, 0.22], [0.785, 0.18]] });
        chip(k, 'NASA, ESA, CSA, STSCI · JADES-GS-Z14-0', 60, 1010, SRC);
        bigNum(k, '~290 TRIỆU NĂM', W / 2, 160, 'b', { size: 96, color: P.gold });
        label(k, '≈ 2% TUỔI VŨ TRỤ', W / 2, 270, 'b', { size: 50, color: P.cream });
      },
    },
    {
      say: '{a}Rồi đến điều lạ nhất. Năm 2025, kính vô tuyến ALMA ở Chile tìm thấy oxy trong thiên hà ấy. {b}Oxy chỉ sinh ra trong lòng những ngôi sao, rồi được tung ra khi chúng chết. {c}Nghĩa là chưa đầy ba trăm triệu năm sau vụ nổ lớn, đã có cả một thế hệ sao kịp sinh ra, sống, và chết ở đó.',
      draw(k) {
        fill(k, '#000');
        k.photo('z14-mh', 0, 0, W, H, { zoom: [1.05, 1.3], pan: [[0.5, 0.5], [0.55, 0.45]] });
        chip(k, 'HÌNH MINH HOẠ · ESO/M. KORNMESSER', 60, 70, MP);
        bigNum(k, 'OXY', 1520, 300, 'a', { size: 150, color: '#7FD38A' });
        bigNum(k, 'SAO ĐÃ KỊP SỐNG VÀ CHẾT', W / 2, 960, 'c', { size: 80, color: P.gold });
      },
    },
    {
      say: '{a}Cũng năm 2025, một thiên hà khác, MoM-z14, phá kỷ lục: khoảng hai trăm tám mươi triệu năm sau vụ nổ lớn. {b}Mỗi lần Webb nhìn sâu hơn, những thiên hà sáng rực vẫn ở đó, sớm hơn mọi dự đoán. {c}Như thể vũ trụ sơ khai sinh sao nhanh hơn nhiều so với những gì chúng ta tưởng.',
      draw(k) {
        sky(k, { n: 140 });
        timeline(k, [[0.6, 'KẺ PHÁ VŨ TRỤ', '#FFB27A', k.at(0, 0.5), true], [0.29, 'JADES · 290 TR', P.gold, k.at(0, 0.5), false], [0.28, 'MOM-Z14 · 280 TR', P.red, k.at('a', 0.8), true]], 1, { span: 1.0, endLabel: '1 TỶ NĂM' });
        bigNum(k, 'SỚM HƠN MỌI DỰ ĐOÁN', W / 2, 220, 'b', { size: 84, color: P.cream });
      },
    },
    {
      say: '{a}Thử nén cả lịch sử vũ trụ vào một ngày hai mươi tư giờ, bắt đầu lúc nửa đêm. {b}Thiên hà kỷ lục của Webb xuất hiện lúc khoảng nửa giờ sáng. {c}Trái Đất ra đời lúc hơn bốn giờ chiều. {d}Còn loài người xuất hiện chưa tới hai giây trước nửa đêm hôm sau.',
      draw(k) {
        sky(k, { n: 100 });
        const cx = W / 2, cy = 520, R = 300, { ctx } = k;
        ctx.strokeStyle = 'rgba(245,241,230,0.6)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
        for (let h = 0; h < 24; h++) { const a = h / 24 * Math.PI * 2 - Math.PI / 2; ctx.lineWidth = h % 6 ? 2 : 5; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R * 0.9, cy + Math.sin(a) * R * 0.9); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke(); }
        const mark = (hh, col, cue, text, dx = 0, dy = 0) => { const q = k.at(cue, 0.6); if (q <= 0) return; const a = hh / 24 * Math.PI * 2 - Math.PI / 2; ctx.strokeStyle = col; ctx.globalAlpha = q; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R * 0.85, cy + Math.sin(a) * R * 0.85); ctx.stroke(); ctx.globalAlpha = 1; k.text(text, cx + Math.cos(a) * (R + 120) + dx, cy + Math.sin(a) * (R + 60) + dy, { size: 34, font: 'title', color: col, p: q, outline: P.ink, outlineWidth: 6 }); };
        mark(0.5, P.gold, 'b', '00:30 · THIÊN HÀ KỶ LỤC', 260, 40);
        mark(16.1, '#5FB0E8', 'c', '16:06 · TRÁI ĐẤT');
        mark(23.9995, P.red, 'd', '23:59:58 · LOÀI NGƯỜI', -280, 40);
        bigNum(k, 'VŨ TRỤ = 1 NGÀY', W / 2, 950, 'a', { size: 76, color: P.cream });
      },
    },

    // ================= 4. CHẤM ĐỎ NHỎ =================
    {
      chapter: 'Những chấm đỏ nhỏ',
      transition: 'fade',
      say: '{a}Rồi Webb tìm thấy một thứ không ai đặt tên trước: những chấm đỏ nhỏ. {b}Chúng nhỏ gọn, đỏ, xuất hiện nhiều trong khoảng một tỷ năm đầu của vũ trụ, rồi biến mất dần. {c}Các nhà khoa học vẫn chưa biết chúng là gì.',
      draw(k) {
        chapterTag(k, 'Chấm đỏ nhỏ');
        photo(k, 'cham-do', { zoom: [3.8, 4.1], pan: [[0.5, 0.245], [0.5, 0.245]] });
        chip(k, 'NASA, ESA, CSA, STSCI · D. KOCEVSKI', 60, 1010, SRC);
        bigNum(k, 'CHÚNG LÀ GÌ?', W / 2, 160, 'c', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Nếu đó là những thiên hà đầy sao, thì chúng quá đặc, quá nặng so với kích thước. {b}Nếu đó là hố đen đang nuốt khí, thì lẽ ra chúng phải phát ra tia X rất mạnh. Nhưng gần như không có. {c}Giả thuyết mới nhất: đó là những hố đen bị bọc trong một lớp khí dày đặc, như một ngôi sao khổng lồ chưa từng thấy. Chưa ai chắc chắn.',
      draw(k) {
        bh3d(k, { dist: (k) => 14 - 3 * k.at(0, k.d, 'inOut'), exp: lerp(1.1, 0.5, k.at('c', 2)) });
        const q = k.at('c', 2); const g = k.ctx.createRadialGradient(W / 2, 540, 60, W / 2, 540, 520); g.addColorStop(0, `rgba(200,60,40,${0.8 * q})`); g.addColorStop(0.6, `rgba(150,40,30,${0.6 * q})`); g.addColorStop(1, 'rgba(120,30,20,0)'); k.ctx.fillStyle = g; k.ctx.fillRect(0, 0, W, H);
        label(k, 'THIÊN HÀ? QUÁ ĐẶC', 420, 140, 'a', { size: 44, color: P.cream });
        label(k, 'HỐ ĐEN? THIẾU TIA X', 1500, 140, 'b', { size: 44, color: P.cream });
        bigNum(k, 'HỐ ĐEN BỌC KHÍ?', W / 2, 960, 'c', { size: 90, color: P.gold });
        chip(k, 'GIẢ THUYẾT · MÔ PHỎNG', 60, 1010, MP);
      },
    },
    {
      say: '{a}Và chúng không hề hiếm. Webb đã tìm thấy hàng trăm chấm đỏ như thế. {b}Rồi khi vũ trụ được khoảng một tỷ rưỡi tuổi, chúng gần như biến mất. {c}Chúng đã trở thành thứ gì? Có lẽ là lõi của những thiên hà lớn ngày nay, kể cả dải Ngân Hà của chúng ta. Đó vẫn là một câu hỏi mở.',
      draw(k) {
        sky(k, { n: 100 });
        const p = k.at('a', 2), gone = k.at('b', 3, 'inOut');
        for (let i = 0; i < 220; i++) { const x = 120 + k.rand(i) * 1680, y = 160 + k.rand(i + 400) * 640; k.dot(x, y, 4 + 3 * k.rand(i + 7), '#E5483B', p * (1 - gone * (k.rand(i + 9) < 0.92 ? 1 : 0.2))); }
        bigNum(k, 'HÀNG TRĂM', W / 2, 180, 'a', { size: 96, color: P.cream, p: k.at('a', 0.5) * (1 - k.at('b', 0.5)) });
        bigNum(k, 'RỒI BIẾN MẤT?', W / 2, 180, 'b', { size: 96, color: P.gold });
        label(k, 'LÕI THIÊN HÀ NGÀY NAY?', W / 2, 920, 'c', { size: 56, color: P.cream });
        chip(k, 'MINH HOẠ', 60, 1010, MP);
      },
    },

    // ================= 5. HỐ ĐEN QUÁ SỚM =================
    {
      chapter: 'Hố đen khổng lồ xuất hiện quá sớm',
      transition: 'fade',
      say: '{a}Ở tập về hố đen lớn nhất, chúng ta để lại một câu hỏi: làm sao hố đen kịp lớn tới hàng chục tỷ lần Mặt Trời khi vũ trụ còn trẻ? {b}Năm 2023, kính tia X Chandra và kính Webb cùng nhìn vào một chấm sáng tên UHZ1. {c}Ở đó có một hố đen nặng khoảng mười đến một trăm triệu lần Mặt Trời, chỉ bốn trăm bảy mươi triệu năm sau vụ nổ lớn.',
      draw(k) {
        chapterTag(k, 'Hố đen quá sớm');
        photo(k, 'uhz1', { zoom: [1.0, 1.9], pan: [[0.5, 0.5], [0.3, 0.2]] });
        chip(k, 'NASA/CXC/SAO · NASA/ESA/CSA/STSCI', 60, 1010, SRC);
        bigNum(k, '~470 TRIỆU NĂM', W / 2, 160, 'c', { size: 96, color: P.gold });
      },
    },
    {
      say: '{a}Một hố đen bình thường sinh ra từ một ngôi sao chết, chỉ nặng vài chục lần Mặt Trời. {b}Dù nuốt khí nhanh nhất có thể, nó cũng khó lớn tới chục triệu lần Mặt Trời trong thời gian ngắn như vậy. {c}Nên các nhà khoa học cho rằng UHZ1 bắt đầu từ một "hạt giống nặng": cả một đám khí khổng lồ sụp thẳng thành hố đen, bỏ qua bước làm ngôi sao.',
      draw(k) {
        sky(k, { n: 120 });
        const p = k.at('a', 2), q = k.at('c', 4, 'inOut');
        k.dot(520, 560, 12 * p, '#000', 1); k.ctx.strokeStyle = 'rgba(255,190,110,0.9)'; k.ctx.lineWidth = 3; k.ctx.beginPath(); k.ctx.arc(520, 560, 16 * p + 0.1, 0, Math.PI * 2); k.ctx.stroke();
        label(k, 'TỪ SAO CHẾT: VÀI CHỤC M☉', 520, 700, 'a', { size: 38 });
        for (let i = 0; i < 160; i++) { const a = k.rand(i) * 6.28, r = lerp(320, 30, q) * Math.sqrt(k.rand(i + 7)); k.dot(1400 + Math.cos(a) * r, 520 + Math.sin(a) * r, 3, '#9FC4FF', 0.6 * k.at('c', 1) * (1 - q * 0.8)); }
        k.dot(1400, 520, 60 * q, '#000', q > 0 ? 1 : 0); k.ctx.strokeStyle = `rgba(255,170,60,${q})`; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.ellipse(1400, 520, 140 * q + 0.1, 30 * q + 0.1, -0.15, 0, Math.PI * 2); k.ctx.stroke();
        label(k, '"HẠT GIỐNG NẶNG"', 1400, 760, 'c', { size: 48, color: P.gold });
        chip(k, 'GIẢ THUYẾT · MINH HOẠ', 60, 70, MP);
      },
    },
    {
      say: '{a}Webb còn bắt được một hố đen khác đang lớn, trong thiên hà GN-z11, khoảng bốn trăm ba mươi triệu năm sau vụ nổ lớn. {b}Nó nặng khoảng một triệu sáu trăm nghìn lần Mặt Trời, và đang nuốt khí với tốc độ rất nhanh. {c}Từng mảnh ghép một, Webb đang cho thấy những hố đen khổng lồ như TON 618 có thể đã bắt đầu sớm hơn, và lớn nhanh hơn chúng ta từng nghĩ.',
      draw(k) {
        bh3d(k, { dist: (k) => 15 - 4 * k.at(0, k.d, 'inOut'), exp: 1.25 });
        bigNum(k, 'GN-Z11 · ~430 TR NĂM', W / 2, 150, 'a', { size: 76, color: P.cream });
        bigNum(k, '~1,6 TRIỆU MẶT TRỜI', W / 2, 960, 'b', { size: 84, color: P.gold });
        chip(k, 'MÔ PHỎNG', 60, 70, MP);
      },
    },

    // ================= 6. BIG BANG CÓ SAI KHÔNG =================
    {
      chapter: 'Vậy Big Bang có sai không?',
      transition: 'fade',
      say: '{a}Giờ là câu hỏi lớn: những phát hiện này có làm sụp đổ thuyết Big Bang không? {b}Câu trả lời ngắn gọn: không. {c}Rất nhiều bằng chứng độc lập vẫn cho thấy vũ trụ bắt đầu từ một trạng thái cực nóng, cực đặc, khoảng mười ba phẩy tám tỷ năm trước, và đã giãn nở từ đó.',
      draw(k) {
        chapterTag(k, 'Big Bang có sai?');
        sky(k, { n: 160 });
        const p = k.at('a', k.d, 'linear');
        for (let i = 0; i < 120; i++) { const a = k.rand(i) * 6.28, r = (80 + 600 * k.rand(i + 3)) * (0.3 + 0.7 * p); k.dot(W / 2 + Math.cos(a) * r, 540 + Math.sin(a) * r * 0.6, 2 + 3 * k.rand(i + 9), '#FFE9B0', 0.7); }
        bigNum(k, 'KHÔNG', W / 2, 540, 'b', { size: 200, color: P.gold });
        label(k, '13,8 TỶ NĂM · VẪN ĐANG GIÃN NỞ', W / 2, 900, 'c', { size: 52, color: P.cream });
      },
    },
    {
      say: '{a}Thứ bị lung lay là một chuyện khác: tốc độ. {b}Những mô hình cũ cho rằng thiên hà và hố đen lớn lên chậm rãi. Webb cho thấy chúng lớn nhanh hơn nhiều. {c}Có thể khí thời ấy đặc hơn, nên sao hình thành dày hơn. Có thể những ngôi sao đầu tiên to hơn, sáng hơn ngôi sao bây giờ. Có thể hố đen làm thiên hà trông sáng hơn thật. Hoặc, có thể có thứ vật lý mà chúng ta chưa biết.',
      draw(k) {
        sky(k, { n: 100 });
        const { ctx } = k, x0 = 220, x1 = 1700, y0 = 860;
        ctx.strokeStyle = 'rgba(245,241,230,0.4)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, 260); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
        const curve = (f, p, col, dash) => { ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.setLineDash(dash); ctx.beginPath(); for (let i = 0; i <= 100 * p; i++) { const u = i / 100; (i ? ctx.lineTo : ctx.moveTo).call(ctx, x0 + u * (x1 - x0), y0 - 560 * f(u)); } ctx.stroke(); ctx.setLineDash([]); };
        curve((u) => Math.pow(u, 2.2), k.at('a', 3), 'rgba(245,241,230,0.6)', [14, 10]);
        curve((u) => 1 - Math.pow(1 - u, 3), k.at('b', 3), P.gold, []);
        label(k, 'DỰ ĐOÁN CŨ', 1480, 640, 'a', { size: 38, color: P.cream });
        label(k, 'WEBB THẤY', 900, 360, 'b', { size: 42, color: P.gold });
        label(k, 'KÍCH THƯỚC THIÊN HÀ', x0 + 10, 230, 'a', { size: 30, color: P.mute, align: 'left' });
        label(k, 'THỜI GIAN SAU VỤ NỔ LỚN →', x1, 910, 'a', { size: 30, color: P.mute, align: 'right' });
        bigNum(k, 'VẬT LÝ MỚI?', W / 2, 1010, 'c', { size: 60, color: P.cream });
        chip(k, 'MINH HOẠ XU HƯỚNG', 60, 70, MP);
      },
    },
    {
      say: '{a}Và đó là điều kỳ lạ hơn cả câu hỏi. {b}Vũ trụ không sai. Chỉ là nó đã làm mọi thứ nhanh hơn, mạnh tay hơn, sớm hơn, so với những gì chúng ta dám tưởng tượng. {c}Còn chúng ta, mới chỉ nhìn được những tấm ảnh đầu tiên của thời thơ ấu ấy.',
      draw(k) {
        photo(k, 'vach-vu-tru', { zoom: [1.0, 1.25], pan: [[0.35, 0.6], [0.6, 0.5]] });
        chip(k, 'NASA, ESA, CSA, STSCI · VÁCH NÚI VŨ TRỤ', 60, 70, SRC);
        bigNum(k, 'NHANH HƠN · SỚM HƠN', W / 2, 960, 'b', { size: 90, color: P.gold });
      },
    },

    {
      say: '{a}Và câu chuyện chưa kết thúc. Webb mang đủ nhiên liệu để làm việc khoảng hai mươi năm. {b}Cuối thập kỷ này, Kính Cực Lớn của châu Âu, với gương rộng ba mươi chín mét, sẽ mở mắt ở sa mạc Chile. {c}Những đứa trẻ sơ sinh của vũ trụ sẽ còn được nhìn rõ hơn nữa.',
      draw(k) {
        fill(k, '#000');
        k.clip('ngan-ha', 0, 0, W, H, { at: 0, zoom: [1.05, 1.12], dim: 0.2 });
        chip(k, 'ASTROBOND · DẢI NGÂN HÀ', 60, 70, SRC);
        bigNum(k, '~20 NĂM', W / 2, 200, 'a', { size: 110, color: P.cream });
        bigNum(k, 'GƯƠNG 39 M', W / 2, 940, 'b', { size: 110, color: P.gold });
      },
    },
    // ================= KẾT =================
    {
      chapter: 'Kết: ánh sáng già hơn Trái Đất',
      transition: 'fade',
      say: '{a}Hãy nhìn lại hành trình của chúng ta. {b}Bức ảnh đầu tiên: bốn tỷ sáu trăm triệu năm về trước. {c}Những kẻ phá vũ trụ: khoảng sáu trăm triệu năm sau vụ nổ lớn. {d}Kỷ lục: hai trăm tám mươi triệu năm. {e}Chấm đỏ nhỏ, và hố đen quá sớm: chưa có lời giải.',
      draw(k) {
        sky(k, { n: 120 });
        const rows = [['b', 'ẢNH ĐẦU TIÊN', '4,6 TỶ NĂM TRƯỚC'], ['c', 'KẺ PHÁ VŨ TRỤ', '~600 TR NĂM SAU BIG BANG'], ['d', 'KỶ LỤC', '~280 TR NĂM'], ['e', 'CHẤM ĐỎ · UHZ1', 'CHƯA CÓ LỜI GIẢI']];
        rows.forEach(([c, a, b], i) => { const y = 260 + i * 170; label(k, a, 380, y, c, { size: 50, align: 'left', color: i === 3 ? P.gold : P.cream }); label(k, b, 1540, y, c, { size: 48, align: 'right', color: i === 3 ? P.red : '#9FD8EA' }); });
      },
    },
    {
      say: '{a}Ánh sáng mà Webb bắt được đã rời khỏi những thiên hà ấy hơn mười ba tỷ năm trước. {b}Khi nó bắt đầu chuyến đi, Mặt Trời chưa ra đời. Trái Đất chưa có. {c}Nó bay qua cả lịch sử vũ trụ, để rơi vào một tấm gương vàng, do những sinh vật trên một hạt bụi xanh làm ra.',
      tail: 1.4,
      draw(k) {
        sky(k, { n: 220 });
        const p = k.at('a', k.d - 1, 'linear');
        for (let i = 0; i < 8; i++) { const u = (p + i / 8) % 1; k.dot(lerp(1800, 760, u), lerp(160, 520, u), 4, '#FFE9B0', 0.9 * (1 - Math.abs(u - 0.5) * 1.4)); }
        earthPhoto(k, 560, 600, lerp(40, 200, k.at('c', 4, 'inOut')));
        bigNum(k, 'CHƯA CÓ TRÁI ĐẤT', W / 2, 960, 'b', { size: 70, color: P.cream, p: k.at('b', 0.6) * (1 - k.at('c', 0.6)) });
      },
    },
    {
      say: '{a}Theo bạn, vì sao vũ trụ sơ khai lớn nhanh đến vậy: {b}khí đặc hơn, sao to hơn, nên mọi thứ chỉ đơn giản là nhanh hơn, {c}hay có một thứ vật lý mà chúng ta chưa biết? {d}Viết lựa chọn của bạn ở phần bình luận.',
      draw(k) {
        sky(k, { n: 120 });
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(W / 2 - 3, 180, 6, 640);
        k.photo('z14-mh', 120, 260, 760, 500, { zoom: [1.2, 1.25], credit: false });
        three(k, 'bh', BH, blackHoleUpdate({ orbit: 0.05, dist: 11, tilt: 0.14 }), W / 2 + 40, 260, W / 2 - 160, 500, { exposure: 1.1 });
        bigNum(k, 'SAO TO HƠN', W / 4, 160, 'b', { size: 76, color: P.cream });
        bigNum(k, 'VẬT LÝ MỚI', W * 3 / 4, 160, 'c', { size: 76, color: P.gold });
        bigNum(k, 'BẠN CHỌN?', W / 2, 960, 'd', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Tập sau trên Hạt Bụi Xanh: Webb còn chụp được tấm ảnh này. {b}Một ngôi sao đang chết, tung lớp vỏ của nó ra không gian. {c}Khoảng năm tỷ năm nữa, Mặt Trời của chúng ta cũng sẽ như vậy. Khi Mặt Trời chết, Trái Đất sẽ ra sao? Đăng ký kênh để không bỏ lỡ.',
      tail: 2.2,
      draw(k) {
        photo(k, 'vanh-nhan', { zoom: [1.0, 1.3], dim: 0.1 });
        chip(k, 'NASA, ESA, CSA, STSCI · TINH VÂN VÀNH NHẪN NAM', 60, 70, SRC);
        label(k, 'TẬP SAU', W / 2, 150, 'a', { size: 60, color: P.cream });
        bigNum(k, 'KHI MẶT TRỜI CHẾT?', W / 2, 900, 'c', { size: 90, color: P.gold });
        chip(k, '🔔 ĐĂNG KÝ HẠT BỤI XANH', W / 2 - 230, 1010, { bg: P.gold, p: k.at('c', 0.6) });
      },
    },
  ],
};
