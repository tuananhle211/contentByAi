// Hạt Bụi Xanh · tập 3 — Megalodon: Liệu Nó Vẫn Còn Sống Dưới Đáy Biển? (kịch bản + bảng nguồn: kich-ban.md, 11/11/2026)
// Nguồn chính: Tschernezky 1959 (phân tích trên J. Scientific Exploration), Shimada et al. 2025, Wroe et al. 2008, Griffiths et al. 2023 (PNAS),
// McCormack et al. 2022 (Nat. Commun.), Boessenecker et al. 2019 (PeerJ), Hawaii DLNR / Smithsonian (cá mập miệng to 1976).
import { P, fill, space, ocean, surface, earth, whale, human, bus, shark, diver, tooth, thermometer, foodPyramid, scaleBar, bigNum, label, src, chip,
  chapterTag, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';
import * as thumbs from '/videos/085-megalodon-con-song-khong/thumbs.js';

const W = 1920, H = 1080;
const lerp = (a, b, p) => a + (b - a) * p;
const MEG = '#3B4A57', WHITE = '#8FA3B4';

export default {
  meta: {
    title: 'Megalodon: Liệu Nó Vẫn Còn Sống Dưới Đáy Biển?',
    description: 'Năm 1959, một nhà khoa học tuyên bố răng Megalodon vớt từ đáy biển chỉ khoảng 11.000 năm tuổi. Nếu đúng, con cá mập lớn nhất từng tồn tại có thể vẫn đang sống?\n\nMegalodon lớn đến mức nào, nó sống ra sao, vì sao nó biến mất, và ba bằng chứng khoa học trả lời câu hỏi: nó còn sống không. Mọi con số đều có nguồn bên dưới.',
    footer: '📚 Nguồn tham khảo\n• Shimada et al. (2025), Palaeontologia Electronica – kích thước và dáng Megalodon\n• Wroe et al. (2008), Journal of Zoology – lực cắn\n• Griffiths et al. (2023), PNAS – Megalodon máu ấm một phần\n• McCormack et al. (2022), Nature Communications – đồng vị kẽm, cạnh tranh với cá mập trắng\n• Boessenecker et al. (2019), PeerJ – thời điểm tuyệt chủng\n• Journal of Scientific Exploration – phân tích răng tàu Challenger và phép đo năm 1959\n• Hawaii DLNR, Smithsonian Ocean – cá mập miệng to (1976)\n\n🌍 Hạt Bụi Xanh — khoa học về những thứ khổng lồ, cổ xưa và đáng sợ trên hạt bụi xanh của chúng ta. Video mới mỗi ngày lúc 20:00.',
    links: [['▶ Tập trước: Nếu Một Hố Đen Đi Ngang Hệ Mặt Trời', '082-neu-ho-den-di-ngang-he-mat-troi']],
    tags: ['megalodon', 'megalodon còn sống không', 'cá mập megalodon', 'cá mập lớn nhất', 'cá mập tiền sử', 'megalodon tuyệt chủng', 'cá mập trắng', 'răng megalodon', 'sinh vật biển sâu', 'khoa học', 'hạt bụi xanh'],
    hashtags: ['megalodon', 'camap', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi',
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.35, tail: 0.8, pause: 0.35, transition: 'cut', camera: 0.04,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
  },
  thumbnail: thumbs.a,
  scenes: [
    // ================= MỞ ĐẦU =================
    {
      chapter: 'Mở đầu: chiếc răng 11.000 năm tuổi',
      say: '{a}Năm 1873. Giữa Thái Bình Dương, con tàu khảo sát HMS Challenger thả một chiếc gàu xuống đáy biển sâu hàng nghìn mét. {b}Khi kéo lên, trong lớp bùn đen có những chiếc răng cá mập. {c}To gần bằng bàn tay người lớn.',
      draw(k) {
        k.photo('tau-challenger', 0, 0, W, H, { zoom: [1.0, 1.08], dim: 0.25, p: 1 - k.at('b', 0.6) });
        if (k.t > k.cue('b')) {
          k.photo('rang-tay', 0, 0, W, H, { zoom: [1.0, 1.1], kp: k.at('b', 8, 'linear') });
          label(k, 'gần bằng bàn tay', W - 80, 980, 'c', { size: 56, align: 'right' });
        }
        chip(k, 'TÀU HMS CHALLENGER · 1872', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22, p: 1 - k.at('b', 0.4) });
        label(k, '1873 · HMS CHALLENGER', W - 70, 70, 'a', { size: 40, align: 'right' });
      },
    },
    {
      say: '{a}Gần một thế kỷ sau, năm 1959, một nhà động vật học đo lớp khoáng mangan phủ trên hai chiếc răng ấy. {b}Và đưa ra một con số gây chấn động: {c}có chiếc chỉ khoảng mười một nghìn năm tuổi.',
      sfx: [['boom', 'c', 0.25]],
      draw(k) {
        fill(k, '#0B1620');
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(132, 112, 856, 856);
        k.photo('rang-den', 140, 120, 840, 840, { zoom: [1.0, 1.08], kp: k.at('a', 10, 'linear') });
        k.ctx.fillStyle = `rgba(20,16,12,${0.45 * k.at('a', 2)})`; k.ctx.fillRect(140, 120, 840, 840);
        label(k, 'lớp khoáng mangan (minh hoạ)', 560, 1010, 'a', { size: 36, color: P.gold });
        label(k, '1959', 1360, 260, 'a', { size: 60 });
        bigNum(k, '~11.000 NĂM?', 1360, 760, 'c', { size: 110, color: P.red });
      },
    },
    {
      say: '{a}Nếu đúng, chủ nhân của nó, Megalodon, con cá mập lớn nhất từng tồn tại, đã sống cùng thời với tổ tiên loài người. {b}Và có thể, đâu đó dưới đáy biển sâu, nó vẫn còn sống.',
      draw(k) {
        ocean(k, { depth: 0.85, snow: 80 });
        shark(k, lerp(2500, 1100, k.at('a', 6, 'out')), 520, 1500, { color: MEG, swim: 0.6 });
        diver(k, 330, 860, 130, { color: '#D9E4EC' });
        chip(k, 'MÔ PHỎNG', 1860, 70, { align: 'right', bg: 'rgba(245,241,230,0.85)', size: 22 });
        bigNum(k, 'VẪN CÒN SỐNG?', W / 2, 960, 'b', { size: 90, color: P.cream });
      },
    },
    {
      say: '{a}Vậy Megalodon còn sống không? {b}Để trả lời, chúng ta cần biết nó lớn đến mức nào, nó cần gì để sống, và điều gì đã thực sự xảy ra với nó. {c}Câu trả lời, hoá ra, nằm ngay trong chính những chiếc răng.',
      sfx: [['sparkle', 'c', 0.25]],
      draw(k) {
        k.photo('ham-amnh', 0, 0, W, H, { zoom: [1.0, 1.1], dim: 0.55 });
        bigNum(k, 'MEGALODON CÒN SỐNG?', W / 2, 200, 'a', { size: 96, color: P.gold });
        const items = ['LỚN CỠ NÀO?', 'SỐNG RA SAO?', 'VÌ SAO BIẾN MẤT?'];
        items.forEach((t, i) => label(k, t, 360 + i * 600, 520, k.cue('b', i * 1.2), { size: 50 }));
        label(k, 'câu trả lời nằm trong răng', W / 2, 820, 'c', { size: 56, color: P.gold });
        chip(k, 'HÀM PHỤC DỰNG · BẢO TÀNG AMNH', 60, 1030, { bg: 'rgba(245,241,230,0.85)', size: 22 });
      },
    },

    // ================= CHƯƠNG 1: LỚN CỠ NÀO =================
    {
      chapter: 'Megalodon lớn đến mức nào?',
      say: '{a}Megalodon gần như chỉ để lại răng và vài đốt sống. {b}Bộ xương của cá mập là sụn, rất hiếm khi hoá thạch được.',
      transition: 'fade',
      draw(k) {
        fill(k, '#000');
        k.photo('rang-thuoc', 560, 0, 800, H, { zoom: [1.0, 1.08] });
        chapterTag(k, 'Chương 1 · Lớn cỡ nào');
        label(k, 'gần như chỉ còn răng', 280, 480, 'a', { size: 46, color: P.cream });
        label(k, 'xương sụn', 1640, 440, 'b', { size: 50, color: P.cream });
        label(k, 'hiếm khi hoá thạch', 1640, 520, 'b', { size: 44, color: P.gold });
      },
    },
    {
      say: '{a}Một chiếc răng Megalodon, đặt cạnh hai chiếc răng của cá mập trắng hiện đại. {b}Chỉ khoảng một phần trăm răng Megalodon từng tìm được dài hơn mười lăm phân.',
      draw(k) {
        k.photo('rang-megalodon', 0, 0, W, H, { zoom: [1.0, 1.08], pan: [[0.45, 0.5], [0.5, 0.5]] });
        chip(k, 'MEGALODON & CÁ MẬP TRẮNG', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        label(k, 'Megalodon', 520, 980, 'a', { size: 50 });
        label(k, 'cá mập trắng', 1560, 260, 'a', { size: 44 });
        bigNum(k, '> 15 CM: CHỈ ~1%', W / 2, 120, 'b', { size: 70, color: P.cream });
      },
    },
    {
      say: '{a}Làm sao đoán được kích thước từ một chiếc răng? {b}Các nhà khoa học so tỉ lệ giữa răng và thân của cá mập trắng hiện đại, rồi nhân lên theo kích thước răng Megalodon. {c}Răng càng to, con cá mập càng dài.',
      draw(k) {
        ocean(k, { depth: 0.5 });
        chapterTag(k, 'Chương 1 · Lớn cỡ nào');
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(92, 132, 436, 296); k.photo('rang-megalodon', 100, 140, 420, 280, { zoom: [1, 1] }); shark(k, 300, 640, 320, { color: WHITE, swim: 0.4 });
        k.arrow(480, 500, 760, 500, { stroke: P.gold, width: 8, p: k.at('b', 0.8), seed: 61 });
        shark(k, 1250, 700, 1100 * k.at('c', 1.2, 'out') + 1, { color: MEG, swim: 0.3 });
        label(k, 'tỉ lệ răng : thân', 620, 440, 'b', { size: 40, color: P.gold });
      },
    },
    {
      say: '{a}Nhưng ở Bỉ có một hoá thạch hiếm hơn nhiều: một trăm bốn mươi mốt đốt sống của cùng một con Megalodon. {b}Xếp nối nhau, riêng phần cột sống còn sót lại đã dài khoảng mười một mét. {c}Gấp sáu lần chiều cao một người trưởng thành.',
      draw(k) {
        fill(k, '#2A2118');
        chapterTag(k, 'Chương 1 · Lớn cỡ nào');
        const n = Math.floor(141 * k.at('a', 5, 'linear'));
        for (let i = 0; i < 141; i++) { const x = 140 + i * 11.6; k.ctx.fillStyle = i < n ? '#C9B58E' : 'rgba(201,181,142,0.08)'; k.ctx.beginPath(); k.ctx.ellipse(x, 560 + 6 * Math.sin(i * 0.15), 5, 34 - Math.abs(i - 50) * 0.15, 0, 0, Math.PI * 2); k.ctx.fill(); }
        scaleBar(k, 140, 140 + 140 * 11.6, 680, '~11 MÉT', { p: k.at('b', 1.2), color: P.gold });
        human(k, 120, 900, 1640 / 11 * 1.7, { color: P.cream, stroke: false });
        label(k, '141 ĐỐT SỐNG · BỈ', W / 2, 200, 'a', { size: 60, color: '#E3D3B0', outline: '#2A2118' });
      },
    },
    {
      say: '{a}Từ răng và đốt sống, năm 2025, một nhóm nhà khoa học ước tính con lớn nhất có thể dài khoảng hai mươi tư mét, {b}nặng khoảng chín mươi tấn.',
      sfx: [['boom', 'b', 0.25]],
      draw(k) {
        ocean(k, { depth: 0.45 });
        chapterTag(k, 'Chương 1 · Lớn cỡ nào');
        shark(k, W / 2, 520, 1650 * k.at('a', 1.4, 'out') + 1, { color: MEG, swim: 0.4 });
        scaleBar(k, 135, 1785, 860, '≈ 24 MÉT', { p: k.at('a', 1.4) });
        bigNum(k, '~90 TẤN', W / 2, 990, 'b', { size: 90, color: P.gold });
        src(k, 'Shimada et al., 2025', { y: 1050 });
      },
    },
    {
      say: '{a}Cá mập trắng lớn nhất ngày nay dài khoảng sáu mét. {b}Megalodon dài gấp bốn lần. {c}Bằng hai chiếc xe buýt nối đuôi nhau.',
      draw(k) {
        ocean(k, { depth: 0.4 });
        chapterTag(k, 'Chương 1 · Lớn cỡ nào');
        const s = 1600 / 24, y = 980;
        shark(k, 160 + 3 * s, 300, 6 * s, { color: WHITE, swim: 0.6 });
        label(k, 'cá mập trắng ~6 m', 160 + 3 * s, 190, 'a', { size: 40 });
        shark(k, 160 + 12 * s, 560, 24 * s * k.at('b', 1.2, 'out') + 1, { color: MEG, swim: 0.3 });
        for (let i = 0; i < 2; i++) bus(k, 160 + i * 12 * s, y, 12 * s, { alpha: k.at(k.cue('c', i * 0.4), 0.4) });
        human(k, 120, y, 1.7 * s, { color: P.gold, stroke: false });
      },
    },
    {
      say: '{a}Nhưng nghiên cứu ấy còn chỉ ra một điều bất ngờ. {b}Megalodon có lẽ không mập mạp như một con cá mập trắng phóng to, mà thon dài hơn, giống cá mập chanh. {c}Chính các tác giả cũng nói rõ: đây vẫn là giả thuyết.',
      draw(k) {
        ocean(k, { depth: 0.5 });
        chapterTag(k, 'Chương 1 · Lớn cỡ nào');
        const b = k.at('b', 2, 'inOut');
        k.group({ x: W / 2, y: 520, s: 1 }, () => { k.ctx.save(); k.ctx.scale(1, lerp(1.35, 0.85, b)); shark(k, 0, 0, 1500, { color: MEG, swim: 0.3 }); k.ctx.restore(); });
        label(k, b < 0.5 ? 'cá mập trắng phóng to?' : 'thon dài, như cá mập chanh', W / 2, 900, 'b', { size: 50 });
        chip(k, 'GIẢ THUYẾT', W - 60, 120, { align: 'right', bg: P.orange, p: k.at('c', 0.5) });
      },
    },
    {
      say: '{a}Còn lực cắn? Năm 2008, các nhà khoa học mô phỏng trên máy tính: {b}có thể tới khoảng một trăm tám mươi nghìn niu-tơn. {c}Gần gấp mười lần cá mập trắng lớn nhất. Đủ để cắn nát xương sườn của một con cá voi.',
      sfx: [['boom', 'b', 0.3]],
      draw(k) {
        fill(k, P.space);
        chapterTag(k, 'Chương 1 · Lớn cỡ nào');
        const bw = 1300, x0 = 300;
        k.ctx.fillStyle = WHITE; k.ctx.fillRect(x0, 420, bw * 0.1 * k.at('a', 1), 90);
        k.ctx.fillStyle = P.red; k.ctx.fillRect(x0, 620, bw * k.at('b', 1.6, 'out'), 90);
        label(k, 'cá mập trắng ~18.000 N', x0, 380, 'a', { size: 40, align: 'left' });
        label(k, 'Megalodon tới ~180.000 N', x0, 580, 'b', { size: 40, align: 'left', color: P.gold });
        bigNum(k, '≈ ×10', W / 2, 900, 'c', { size: 120, color: P.red });
        src(k, 'Wroe et al., Journal of Zoology 2008 (mô phỏng)');
      },
    },

    // ================= CHƯƠNG 2: SỐNG RA SAO =================
    {
      chapter: 'Nó sống ra sao?',
      say: '{a}Megalodon sống ở các vùng biển ấm, gần bờ, khắp thế giới. {b}Từ khoảng hai mươi ba triệu năm trước, cho tới khoảng ba triệu sáu trăm nghìn năm trước.',
      transition: 'fade',
      draw(k) {
        space(k, { n: 80 });
        chapterTag(k, 'Chương 2 · Sống ra sao');
        earth(k, 700, 560, 330, { spin: 0.02 });
        for (let i = 0; i < 14; i++) { const a = k.rand(i + 900) * Math.PI * 2, d = 330 * (0.4 + 0.5 * k.rand(i + 950)); k.dot(700 + Math.cos(a) * d, 560 + Math.sin(a) * d, 9, P.orange, k.at(k.cue('a', i * 0.08), 0.3)); }
        bigNum(k, '23 → 3,6', 1400, 470, 'b', { size: 110, color: P.cream });
        label(k, 'triệu năm trước', 1400, 590, 'b', { size: 46 });
        label(k, '● nơi tìm thấy hoá thạch (minh hoạ)', 700, 960, 'a', { size: 32, color: P.orange });
      },
    },
    {
      say: '{a}Con mồi của nó là cá voi. {b}Các nhà cổ sinh vật học đã tìm thấy xương cá voi hoá thạch mang những vết cắn hình răng cưa, khớp với răng Megalodon.',
      draw(k) {
        ocean(k, { depth: 0.35 });
        chapterTag(k, 'Chương 2 · Sống ra sao');
        if (k.t < k.cue('b')) {
          k.clip('ca-voi-boi', 0, 0, W, H, { at: 'a', zoom: [1, 1.05] });
          chip(k, 'CÁ VOI LƯNG GÙ NGÀY NAY', 60, 1030, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        } else {
          k.photo('dot-song-ca-voi-bi-can', 0, 0, W, H, { zoom: [1.0, 1.12], kp: k.at('b', 10, 'linear') });
          label(k, 'đốt sống cá voi hoá thạch · vết răng Megalodon', W / 2, 980, k.cue('b', 0.5), { size: 44, color: P.gold });
        }
      },
    },
    {
      say: '{a}Năm 2021, các nhà khoa học chụp cắt lớp những đốt sống ở Bỉ, và đếm được bốn mươi sáu vòng tăng trưởng, giống như vòng tuổi của thân cây. Con Megalodon ấy chết khi khoảng bốn mươi sáu tuổi. {b}Đếm ngược về vòng đầu tiên, họ ước tính lúc mới sinh, nó đã dài khoảng hai mét. {c}Lớn bằng một người trưởng thành, ngay từ ngày đầu tiên.',
      draw(k) {
        fill(k, P.space);
        chapterTag(k, 'Chương 2 · Sống ra sao');
        const n = Math.floor(46 * k.at('a', 6, 'linear'));
        for (let i = 0; i < 46; i++) { k.ctx.beginPath(); k.ctx.arc(560, 520, 30 + i * 6.5, 0, Math.PI * 2); k.ctx.strokeStyle = i < n ? (i % 5 ? 'rgba(227,211,176,0.55)' : '#E3D3B0') : 'rgba(227,211,176,0.05)'; k.ctx.lineWidth = 3; k.ctx.stroke(); }
        bigNum(k, `${n} VÒNG`, 560, 900, 'a', { size: 70, color: P.cream, fx: 'fade' });
        const s = 170;
        shark(k, 1450, 520, 2 * s * k.at('b', 1, 'back') + 1, { color: MEG, swim: 0.8 });
        human(k, 1450, 860, 1.7 * s, { color: P.gold, stroke: false, alpha: k.at('c', 0.6) });
        label(k, 'mới sinh ~2 m', 1450, 370, 'b', { size: 46, color: P.gold });
        src(k, 'Shimada et al., Historical Biology 2021', { y: 1050 });
      },
    },
    {
      say: '{a}Những con non ấy lớn lên ở đâu? {b}Năm 2010, ở Panama, các nhà khoa học đào được hơn bốn trăm chiếc răng cá mập hoá thạch, trong đó có hai mươi tám chiếc của Megalodon. Phần lớn đều rất nhỏ. Răng của con non. {c}Khoảng mười triệu năm trước, nơi ấy là một vùng biển nông và ấm. Các nhà khoa học cho rằng đó là một nhà trẻ, nơi Megalodon con lớn lên, tránh xa những kẻ săn mồi khác ngoài khơi.',
      draw(k) {
        surface(k, 300, { sky: '#9CC9E0' });
        chapterTag(k, 'Chương 2 · Sống ra sao', true);
        k.ctx.fillStyle = '#D9C49A'; k.ctx.beginPath(); k.ctx.moveTo(0, 1080); k.ctx.lineTo(0, 860); k.ctx.quadraticCurveTo(900, 760, 1920, 900); k.ctx.lineTo(1920, 1080); k.ctx.closePath(); k.ctx.fill();
        for (let i = 0; i < 5; i++) shark(k, 300 + i * 330, 560 + 50 * Math.sin(i * 1.9), 200, { color: MEG, swim: 0.9, phase: i, alpha: k.at('c', 1) });
        chip(k, 'MÔ PHỎNG', 1860, 70, { align: 'right', bg: 'rgba(245,241,230,0.85)', size: 22 });
        label(k, 'PANAMA · ~10 TRIỆU NĂM TRƯỚC', W / 2, 160, 'b', { size: 50, color: P.ink, outline: '#DCEBF2' });
        label(k, '"nhà trẻ" Megalodon', W / 2, 240, 'c', { size: 46, color: P.red, outline: '#DCEBF2' });
        src(k, 'Pimiento et al., PLoS ONE 2010', { y: 1050, color: P.ink });
      },
    },
    {
      say: '{a}Năm 2023, một nghiên cứu trên tạp chí PNAS đo đồng vị trong răng hoá thạch, {b}và phát hiện Megalodon ấm hơn nước biển xung quanh nó: thân nhiệt trung bình khoảng hai mươi bảy độ. {c}Nó là loài máu ấm một phần.',
      draw(k) {
        ocean(k, { depth: 0.5 });
        chapterTag(k, 'Chương 2 · Sống ra sao');
        shark(k, 760, 540, 1100, { color: MEG, swim: 0.4 });
        k.dot(760, 540, 240, P.orange, 0.18 * k.at('b', 1));
        thermometer(k, 1550, 760, 420, 0.75 * k.at('b', 1.5), { text: '~27°C', size: 60, p: k.at('b', 0.8) });
        label(k, 'MÁU ẤM MỘT PHẦN', 760, 960, 'c', { size: 56, color: P.gold });
        src(k, 'Griffiths et al., PNAS 2023', { y: 1050 });
      },
    },
    {
      say: '{a}Máu ấm giúp nó bơi nhanh và săn được những con mồi lớn. {b}Nhưng cái giá phải trả là nó phải ăn rất, rất nhiều. {c}Hãy nhớ điều này. Nó sẽ quyết định câu trả lời cuối cùng.',
      draw(k) {
        ocean(k, { depth: 0.4 });
        chapterTag(k, 'Chương 2 · Sống ra sao');
        shark(k, lerp(300, 1500, k.at('a', 6, 'linear')), 480, 900, { color: MEG, swim: 1 });
        bigNum(k, 'PHẢI ĂN RẤT NHIỀU', W / 2, 860, 'b', { size: 90, color: P.gold });
        bigNum(k, '?', W - 140, 160, 'c', { size: 140, color: P.gold });
      },
    },

    // ================= CHƯƠNG 3: VÌ SAO BIẾN MẤT =================
    {
      chapter: 'Điều gì đã giết Megalodon?',
      say: '{a}Khoảng ba triệu sáu trăm nghìn năm trước, Megalodon biến mất. {b}Không có thiên thạch nào. Không có thảm hoạ đột ngột nào. {c}Chỉ có những thay đổi rất chậm.',
      transition: 'fade',
      draw(k) {
        ocean(k, { depth: lerp(0.4, 0.9, k.at('a', 6)) });
        chapterTag(k, 'Chương 3 · Vì sao biến mất');
        shark(k, W / 2, 500, 1200, { color: MEG, swim: 0.3, alpha: 1 - 0.85 * k.at('a', 5) });
        bigNum(k, '~3,6 TRIỆU NĂM TRƯỚC', W / 2, 160, 'a', { size: 70, color: P.cream });
        label(k, 'không thiên thạch · không thảm hoạ', W / 2, 900, 'b', { size: 46 });
        label(k, 'chỉ những thay đổi rất chậm', W / 2, 980, 'c', { size: 46, color: P.gold });
      },
    },
    {
      say: '{a}Trái Đất khi ấy đang lạnh dần. {b}Nhiều vùng biển ấm ven bờ, nơi Megalodon sinh sống và nuôi con, co lại. {c}Với một loài máu ấm phải ăn rất nhiều, mỗi vùng biển ấm mất đi là một bữa ăn mất đi.',
      draw(k) {
        space(k, { n: 80 });
        chapterTag(k, 'Chương 3 · Vì sao biến mất');
        const c = k.at('a', 6, 'inOut');
        earth(k, 700, 560, 330, { spin: 0.02, ice: 0.35 * c });
        for (let i = 0; i < 14; i++) { const a = k.rand(i + 900) * Math.PI * 2, d = 330 * (0.4 + 0.5 * k.rand(i + 950)); k.dot(700 + Math.cos(a) * d, 560 + Math.sin(a) * d, 9, P.orange, 1 - k.at(k.cue('b', i * 0.2), 0.6)); }
        thermometer(k, 1450, 780, 420, lerp(0.8, 0.35, c), { color: '#5FB0E8', text: 'biển lạnh dần', size: 44 });
      },
    },
    {
      say: '{a}Và Megalodon không phải nạn nhân duy nhất. {b}Năm 2017, các nhà khoa học phát hiện vào cuối thời kỳ ấy, tốc độ tuyệt chủng của động vật biển cỡ lớn cao gấp ba lần bình thường. {c}Khoảng một phần ba các chi động vật biển lớn, từ thú biển, chim biển, rùa biển đến cá mập, đã không sống sót. {d}Thủ phạm chính: những vùng biển nông ven bờ biến mất. Đúng nơi Megalodon nuôi con.',
      draw(k) {
        fill(k, '#0E1820');
        chapterTag(k, 'Chương 3 · Vì sao biến mất');
        const n = 30, dead = Math.round(n * 0.36 * k.at('c', 2));
        for (let i = 0; i < n; i++) { const x = 360 + (i % 10) * 125, y = 330 + Math.floor(i / 10) * 150; k.dot(x, y, 34, i < dead ? 'rgba(229,56,59,0.25)' : '#5FB0E8', 1); if (i < dead) k.line(x - 26, y - 26, x + 26, y + 26, { stroke: P.red, width: 6, seed: 900 + i }); }
        bigNum(k, '×3 TỐC ĐỘ TUYỆT CHỦNG', W / 2, 160, 'b', { size: 70, color: P.cream });
        bigNum(k, '~36% BIẾN MẤT', W / 2, 860, 'c', { size: 90, color: P.red });
        label(k, 'mất vùng biển nông ven bờ', W / 2, 970, 'd', { size: 46, color: P.gold });
        src(k, 'Pimiento et al., Nature Ecology & Evolution 2017', { y: 1050 });
      },
    },
    {
      say: '{a}Và một đối thủ mới đã xuất hiện: cá mập trắng. {b}Năm 2022, các nhà khoa học đo đồng vị kẽm trong răng của cả hai loài, {c}và phát hiện chúng ăn cùng một tầng trong chuỗi thức ăn. Chúng săn cùng loại con mồi.',
      draw(k) {
        k.photo('ca-map-trang', 0, 0, W, H, { zoom: [1.0, 1.08], p: 1 - k.at('b', 0.6), credit: true });
        if (k.t > k.cue('b')) {
          fill(k, P.space);
          chapterTag(k, 'Chương 3 · Vì sao biến mất');
          const [tx, ty] = foodPyramid(k, W / 2, 1000, 1100);
          shark(k, tx - 120, ty - 20, 200, { color: MEG, swim: 0.4, alpha: k.at('c', 0.6) });
          shark(k, tx + 130, ty - 20, 90, { color: WHITE, swim: 0.6, alpha: k.at('c', 0.6) });
          label(k, 'CÙNG TẦNG', tx, ty - 120, 'c', { size: 50, color: P.gold });
          src(k, 'McCormack et al., Nature Communications 2022', { y: 1050 });
        } else chip(k, 'CÁ MẬP TRẮNG', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
      },
    },
    {
      say: '{a}Cá mập trắng nhỏ hơn, cần ít thức ăn hơn, và chịu được nước lạnh tốt hơn. {b}Có thể chính tổ tiên của những con cá mập trắng hôm nay đã góp phần đẩy gã khổng lồ tới tuyệt chủng. {c}Các nhà khoa học nhấn mạnh: đó là nhiều nguyên nhân cộng lại, không phải một.',
      draw(k) {
        ocean(k, { depth: 0.6 });
        chapterTag(k, 'Chương 3 · Vì sao biến mất');
        k.photo('ca-map-trang-mat', 0, 0, W, H, { zoom: [1.0, 1.1], dim: 0.15 });
        label(k, 'nhỏ hơn · ăn ít hơn · chịu lạnh tốt hơn', W / 2, 140, 'a', { size: 48 });
        label(k, 'nhiều nguyên nhân cộng lại', W / 2, 960, 'c', { size: 50, color: P.gold });
      },
    },

    // ================= CHƯƠNG 4: CÒN SỐNG KHÔNG =================
    {
      chapter: 'Megalodon có còn sống?',
      say: '{a}Bây giờ, quay lại chiếc răng mười một nghìn năm tuổi. {b}Phép đo năm 1959 giả định rằng lớp mangan bắt đầu phủ lên chiếc răng ngay khi nó rơi xuống đáy biển. {c}Nhưng điều đó không nhất thiết đúng. Lớp phủ có thể bắt đầu muộn hơn rất nhiều. Vì vậy giới khoa học coi con số ấy là không đáng tin.',
      transition: 'fade',
      draw(k) {
        ocean(k, { depth: 0.95, snow: 60 });
        chapterTag(k, 'Chương 4 · Còn sống không');
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(212, 162, 816, 816); k.photo('rang-den', 220, 170, 800, 800, { zoom: [1.05, 1.12] });
        bigNum(k, '~11.000 NĂM?', 1360, 420, 'a', { size: 100, color: P.red });
        label(k, 'mangan có thể phủ muộn hơn rất nhiều', 1360, 600, 'c', { size: 42, color: P.cream });
        if (k.t > k.cue('c')) { const p = k.at('c', 0.5); k.line(1040, 360, 1680, 480, { stroke: P.red, width: 14, p, seed: 51 }); }
        label(k, 'KHÔNG ĐÁNG TIN', 1360, 760, k.cue('c', 1.5), { size: 60, color: P.gold });
      },
    },
    {
      say: '{a}Nhưng biển sâu vẫn giấu những bí mật thật. {b}Năm 1976, ngoài khơi Hawaii, một con cá mập dài hơn bốn mét mắc vào neo của một con tàu Hải quân Mỹ. {c}Đó là một loài hoàn toàn mới: cá mập miệng to. Trước ngày hôm đó, không ai biết nó tồn tại.',
      draw(k) {
        k.photo('ca-map-mieng-to', 0, 0, W, H, { zoom: [1.0, 1.1], p: k.at('c', 0.8) });
        if (k.t < k.cue('c')) {
          ocean(k, { depth: 0.8 });
          surface(k, 140, { sky: '#3B5A7A' });
          k.ctx.strokeStyle = 'rgba(245,241,230,0.7)'; k.ctx.lineWidth = 4; k.ctx.beginPath(); k.ctx.moveTo(960, 140); k.ctx.lineTo(960, 640); k.ctx.stroke();
          shark(k, 960, 720, 520 * k.at('b', 1, 'out') + 1, { color: '#6B5A55', swim: 0.6 });
          label(k, '1976 · HAWAII', 60, 230, 'b', { size: 44, align: 'left' });
        } else chip(k, 'MẪU CÁ MẬP MIỆNG TO', 60, 70, { bg: 'rgba(245,241,230,0.85)', size: 22 });
      },
    },
    {
      say: '{a}Vậy một con cá mập dài hai mươi mét có thể trốn dưới đáy biển không? {b}Các nhà khoa học trả lời: không. Và họ có ba lý do.',
      draw(k) {
        ocean(k, { depth: 0.9, snow: 90 });
        chapterTag(k, 'Chương 4 · Còn sống không');
        shark(k, W / 2, 480, 1200, { color: MEG, swim: 0.3, alpha: 0.5 });
        bigNum(k, 'KHÔNG.', W / 2, 820, 'b', { size: 150, color: P.gold });
        label(k, '3 LÝ DO', W / 2, 960, k.cue('b', 1.2), { size: 50 });
      },
    },
    {
      say: '{a}Lý do thứ nhất: răng. {b}Cá mập thay răng liên tục, mỗi con rụng hàng nghìn chiếc trong đời. Megalodon để lại vô số răng trên đáy các đại dương. {c}Vậy mà chưa có chiếc răng nào trẻ hơn khoảng ba triệu năm được giới khoa học xác nhận.',
      draw(k) {
        ocean(k, { depth: 0.85, snow: 40 });
        chapterTag(k, 'Chương 4 · Còn sống không');
        bigNum(k, '1. RĂNG', 160, 150, 'a', { size: 80, color: P.gold, align: 'left' });
        k.photo('ham-tellus', 0, 0, W, H, { zoom: [1.0, 1.1], dim: 0.35, p: k.at('b', 0.6) });
        chip(k, 'HÀM PHỤC DỰNG · BẢO TÀNG', 60, 1030, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        label(k, 'không chiếc nào trẻ hơn ~3 triệu năm', W / 2, 400, 'c', { size: 50, color: P.cream });
      },
    },
    {
      say: '{a}Lý do thứ hai: thức ăn. {b}Nhớ chuyện máu ấm chứ? Một sinh vật máu ấm nặng hàng chục tấn cần lượng thức ăn khổng lồ mỗi ngày. {c}Biển sâu thì lạnh, tối, và rất nghèo thức ăn. Một con Megalodon sẽ chết đói ở đó.',
      draw(k) {
        ocean(k, { depth: 0.98, snow: 30 });
        chapterTag(k, 'Chương 4 · Còn sống không');
        bigNum(k, '2. THỨC ĂN', 160, 150, 'a', { size: 80, color: P.gold, align: 'left' });
        shark(k, 900, 560, 1000, { color: MEG, swim: 0.15, alpha: 0.75 });
        thermometer(k, 1600, 820, 380, 0.15, { color: '#5FB0E8', text: 'lạnh · tối · đói', size: 40, p: k.at('c', 0.6) });
      },
    },
    {
      say: '{a}Ở vùng nước sâu và lạnh, chỉ những kẻ sống chậm mới tồn tại được. {b}Cá mập Greenland bơi rất chậm, lớn rất chậm, và sống rất lâu. Năm 2016, các nhà khoa học xác định một con cá mập Greenland ít nhất hai trăm bảy mươi hai tuổi. {c}Đó là kiểu sinh vật mà biển sâu nuôi nổi. Không phải một cỗ máy săn mồi máu ấm nặng hàng chục tấn.',
      draw(k) {
        ocean(k, { depth: 0.98, snow: 40 });
        chapterTag(k, 'Chương 4 · Còn sống không');
        k.photo('ca-map-greenland', 0, 0, W, H, { zoom: [1.0, 1.08], dim: 0.2, p: k.at('b', 0.6) });
        chip(k, 'NOAA', 60, 1030, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        bigNum(k, '≥ 272 TUỔI', W / 2, 220, 'b', { size: 110, color: P.cream });
        label(k, 'cá mập Greenland · biển sâu lạnh', W / 2, 340, 'b', { size: 44, color: '#9FD8EA' });
        label(k, 'sống chậm ≠ máu ấm 90 tấn', W / 2, 920, 'c', { size: 50, color: P.gold });
        src(k, 'Nielsen et al., Science 2016', { y: 1050 });
      },
    },
    {
      say: '{a}Lý do thứ ba: những vết cắn. {b}Nếu Megalodon vẫn săn cá voi như xưa, cá voi ngày nay phải mang những vết cắn khổng lồ. {c}Con người theo dõi cá voi trên khắp các đại dương, và chưa từng thấy một vết cắn nào như thế.',
      draw(k) {
        fill(k, '#000');
        k.clip('ca-voi-boi', 0, 0, W, H, { at: -3, zoom: [1.04, 1.1] });
        chapterTag(k, 'Chương 4 · Còn sống không');
        bigNum(k, '3. VẾT CẮN', 160, 150, 'a', { size: 80, color: P.gold, align: 'left' });
        bigNum(k, 'KHÔNG CÓ', W / 2, 900, 'c', { size: 100, color: P.cream });
      },
    },
    {
      say: '{a}Vậy vì sao vẫn có nhiều người tin Megalodon còn sống? {b}Năm 2013, một kênh truyền hình khoa học nổi tiếng phát sóng một phim tài liệu giả, dựng y như thật, kể rằng Megalodon vẫn đang săn mồi ngoài khơi. {c}Trong khảo sát của chính kênh ấy, hơn bảy mươi phần trăm người trả lời tin rằng nó còn sống. {d}Các nhà khoa học đã phản đối gay gắt. Vì một câu chuyện hay không làm nó trở thành sự thật.',
      draw(k) {
        fill(k, '#101820');
        const { ctx } = k;
        ctx.fillStyle = '#1D2A36'; ctx.beginPath(); ctx.roundRect(460, 180, 1000, 600, 30); ctx.fill(); ctx.strokeStyle = P.cream; ctx.lineWidth = 8; ctx.stroke();
        ctx.save(); ctx.beginPath(); ctx.roundRect(490, 210, 940, 540, 20); ctx.clip(); ocean(k, { depth: 0.7 }); shark(k, 960, 480, 700, { color: MEG, swim: 0.6 }); ctx.restore();
        if (k.t > k.cue('b', 2)) { ctx.save(); ctx.translate(960, 480); ctx.rotate(-0.12); k.text('PHIM TÀI LIỆU GIẢ', 0, 0, { size: 80, font: 'title', color: P.red, outline: P.cream, outlineWidth: 10, fx: 'pop', p: k.at(k.cue('b', 2), 0.5) }); ctx.restore(); }
        label(k, '2013', W / 2, 120, 'b', { size: 56 });
        bigNum(k, '> 70% TIN LÀ THẬT', W / 2, 900, 'c', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Megalodon đã thực sự biến mất. {b}Không phải vì một cú va chạm, cũng không phải vì một thảm hoạ. {c}Mà vì những thay đổi chậm rãi: biển lạnh đi, con mồi thay đổi, và một đối thủ nhỏ hơn, linh hoạt hơn.',
      tail: 1.2,
      draw(k) {
        ocean(k, { depth: 0.7 });
        bigNum(k, 'ĐÃ BIẾN MẤT', W / 2, 300, 'a', { size: 120, color: P.cream });
        const items = [['biển lạnh đi', '#5FB0E8'], ['con mồi thay đổi', P.orange], ['đối thủ nhỏ hơn', WHITE]];
        items.forEach(([t, c], i) => label(k, t, 400 + i * 560, 700, k.cue('c', i * 1.1), { size: 52, color: c }));
      },
    },

    // ================= KẾT =================
    {
      say: '{a}Quay lại năm 1873. Những chiếc răng đen trong gàu bùn của tàu Challenger không phải dấu vết của một con quái vật đang rình rập. {b}Chúng là lời nhắn từ hàng triệu năm trước, về một thời biển cả do những gã khổng lồ thống trị. {c}Trên hạt bụi xanh này, ngay cả kẻ săn mồi mạnh nhất cũng không tồn tại mãi.',
      tail: 1.4,
      transition: 'fade',
      draw(k) {
        const up = k.at('c', 4, 'inOut');
        if (up < 1) { fill(k, '#000'); const sz = lerp(820, 120, up); k.ctx.save(); k.ctx.globalAlpha = 1 - up; k.photo('rang-tay', W / 2 - sz * 0.67, 540 - sz / 2, sz * 1.33, sz, { zoom: [1, 1] }); k.ctx.restore(); }
        if (up > 0) { k.ctx.save(); k.ctx.globalAlpha = up; space(k); earth(k, W / 2, 540, lerp(30, 60, up)); k.ctx.restore(); }
      },
    },
    {
      say: '{a}Theo bạn, điều gì đã thực sự giết Megalodon: {b}biển lạnh đi, {c}hay những con cá mập trắng? {d}Viết lựa chọn của bạn ở phần bình luận.',
      draw(k) {
        ocean(k, { depth: 0.6 });
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(W / 2 - 3, 160, 6, 700);
        thermometer(k, W / 4, 700, 360, 0.25, { color: '#5FB0E8' });
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(W / 2 + 112, 352, 736, 456); k.photo('ca-map-trang', W / 2 + 120, 360, 720, 440, { zoom: [1.05, 1.1] });
        bigNum(k, 'BIỂN LẠNH', W / 4, 250, 'b', { size: 80, color: '#9FD8EA' });
        bigNum(k, 'CÁ MẬP TRẮNG', W * 3 / 4, 250, 'c', { size: 76, color: P.cream });
        bigNum(k, 'BẠN CHỌN?', W / 2, 960, 'd', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Tập sau trên Hạt Bụi Xanh: {b}hai mươi tư giờ cuối cùng của loài khủng long. Một ngày khiến khoảng ba phần tư số loài trên Trái Đất biến mất. {c}Đăng ký kênh để không bỏ lỡ.',
      tail: 2.2,
      draw(k) {
        space(k, { n: 160 });
        label(k, 'TẬP SAU', W / 2, 110, 'a', { size: 60, color: P.mute });
        earth(k, 760, 600, 260, { spin: 0.02 });
        const b = k.at('b', 4, 'in');
        k.dot(lerp(1800, 960, b), lerp(150, 470, b), 30, '#D9A066'); k.dot(lerp(1800, 960, b), lerp(150, 470, b), 60, '#FF7A1A', 0.25 * b);
        bigNum(k, '24 GIỜ CUỐI CỦA KHỦNG LONG', W / 2, 920, 'b', { size: 72, color: P.cream });
        chip(k, '🔔 ĐĂNG KÝ HẠT BỤI XANH', W / 2 - 230, 1015, { bg: P.gold, p: k.at('c', 0.6) });
      },
    },
  ],
};
