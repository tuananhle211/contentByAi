// Hạt Bụi Xanh · Short 1 của tập 106 (Bí ẩn vũ trụ). Vòng: tín hiệu 72 giây → ai gửi? → tần số hydro → giả thuyết mây hydro 2024 → chưa kiểm chứng → vòng lại.
// Fact check: Wow! 15/8/1977, kính Big Ear (ĐH Bang Ohio), ~72 giây, "6EQUJ5", U ≈ 30 lần nhiễu nền, gần 1420 MHz (vạch hydro);
// Jerry Ehman khoanh đỏ "Wow!"; Cocconi & Morrison 1959 đề xuất tần số hydro; tìm lại nhiều lần không thấy;
// Méndez et al. 2024 (arXiv): mây hydro lạnh bừng sáng do đợt bức xạ (vd sao từ) — giả thuyết. Ảnh: bản in (Big Ear/NAAPO, public domain).
// Khung 1080×1920: nội dung trong y 150–1300. Khung đầu = thumbnail (một câu hỏi). Không cảnh "xem bản đầy đủ" → meta.related.
import { P, fill, space, bigNum, label, chip, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080;
const SRC = { bg: 'rgba(245,241,230,0.85)', size: 22 };
function thumb(k) {
  fill(k, '#000');
  k.photo('wow-in', 0, 420, W, 900, { zoom: [1.6, 1.6], pan: [[0.4, 0.47], [0.4, 0.47]], credit: false });
  k.ctx.fillStyle = 'rgba(5,8,26,0.92)'; k.ctx.fillRect(0, 140, W, 300);
  thumbLine(k, 'TÍN HIỆU 72 GIÂY', W / 2, 230, 100);
  thumbAsk(k, 'AI ĐÃ GỬI?', W / 2, 370, 110, P.gold);
}
// Cột cường độ 6EQUJ5.
function bars(k, x, y, w, h, p) {
  const v = [6, 14, 26, 30, 19, 5], ch = '6EQUJ5', bw = w / 6;
  v.forEach((n, i) => { const q = Math.max(0, Math.min(1, p * 6 - i)); k.ctx.fillStyle = i === 3 ? P.gold : '#5FB0E8'; k.ctx.fillRect(x + i * bw + bw * 0.15, y + h - h * n / 32 * q, bw * 0.7, h * n / 32 * q); k.text(ch[i], x + i * bw + bw / 2, y + h + 50, { size: 56, font: 'title', color: P.cream, p: q }); });
}

export default {
  meta: {
    title: 'Tín Hiệu 72 Giây Từ Vũ Trụ: Ai Đã Gửi? 📡 #shorts',
    description: 'Năm 1977, một kính thiên văn bắt được một tín hiệu vô tuyến mạnh bất thường từ sâu trong vũ trụ. Nó kéo dài 72 giây, rồi không bao giờ lặp lại. Gần 50 năm sau, khoa học có một lời giải, nhưng chưa ai kiểm chứng được.',
    tags: ['tín hiệu wow', 'bí ẩn vũ trụ', 'người ngoài hành tinh', 'tín hiệu từ vũ trụ', 'thiên văn học', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'biAnVuTru', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32, speakNumbers: false,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    related: '106-nhung-bi-an-vu-tru-chua-co-loi-giai', // YouTube Studio → Video liên quan
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Tín hiệu bảy mươi hai giây này, ai đã gửi?', draw(k) { thumb(k); } },
    {
      say: '{a}Nó đến từ sâu trong vũ trụ, mạnh gấp khoảng ba mươi lần tiếng ồn nền của bầu trời. {b}Và gần năm mươi năm nay, chưa ai nghe lại nó lần nào.',
      draw(k) {
        space(k, { n: 160 });
        const p = k.at('a', 3); k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 6; k.ctx.beginPath();
        for (let x = 60; x <= 60 + 960 * p; x += 4) { const u = (x - 60) / 960, pk = Math.exp(-Math.pow((u - 0.5) / 0.08, 2)); const y = 760 - 320 * pk - 10 * Math.sin(x * 0.3) * (0.4 + pk); x === 60 ? k.ctx.moveTo(x, y) : k.ctx.lineTo(x, y); }
        k.ctx.stroke();
        bigNum(k, '× 30', W / 2, 360, 'a', { size: 140, color: P.gold });
        bigNum(k, 'KHÔNG LẶP LẠI', W / 2, 1050, 'b', { size: 96, color: P.cream });
      },
    },
    {
      say: '{a}Năm 1977, kính thiên văn Big Ear ở Mỹ bắt được nó. {b}Nhà thiên văn Jerry Ehman khoanh đỏ bản in, và viết: Wow!',
      draw(k) {
        fill(k, '#000');
        const z = 1.2 + 0.9 * k.at('b', 4, 'inOut');
        k.photo('wow-in', 0, 150, W, 1150, { zoom: [z, z], pan: [[0.45, 0.5], [0.4, 0.47]], kp: k.at('b', 4, 'inOut') });
        chip(k, 'BIG EAR · NAAPO', 40, 190, SRC);
        bigNum(k, '15/8/1977', W / 2, 1200, 'a', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Nó nằm sát tần số của hydro, {b}đúng nơi các nhà khoa học từng đoán người ngoài hành tinh sẽ gọi. {c}Họ quay lại nghe hàng chục lần. Không có gì.',
      draw(k) {
        fill(k, '#000');
        k.clip('dia-vo-tuyen', -420, 300, 1920, 1080, { at: 0, zoom: [1, 1.05], dim: 0.2 });
        bigNum(k, '1.420 MHz', W / 2, 220, 'a', { size: 120, color: P.gold });
        label(k, '"HỌ SẼ GỌI Ở ĐÂY?"', W / 2, 340, 'b', { size: 56, color: P.cream });
        bigNum(k, 'KHÔNG CÓ GÌ', W / 2, 1200, 'c', { size: 100, color: P.cream });
        chip(k, 'EFFELSBERG · ĐỨC', 40, 1320, SRC);
      },
    },
    {
      say: '{a}Năm 2024, một nhóm nghiên cứu đề xuất: một chớp năng lượng đã làm một đám mây hydro bừng sáng trong chốc lát. {b}Họ còn thấy những tín hiệu giống vậy, chỉ yếu hơn. {c}Nếu đúng, đó là thiên nhiên. Nhưng chưa ai kiểm chứng.',
      draw(k) {
        space(k, { n: 140 });
        const f = k.at('a', 4), r = 40 + 900 * f;
        k.dot(200, 500, 20, '#FFFFFF', 1);
        k.ctx.strokeStyle = `rgba(255,255,255,${0.6 * (1 - f)})`; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.arc(200, 500, r, -0.6, 0.6); k.ctx.stroke();
        const g = k.ctx.createRadialGradient(780, 560, 20, 780, 560, 260); g.addColorStop(0, `rgba(95,176,232,${0.3 + 0.5 * f})`); g.addColorStop(1, 'rgba(95,176,232,0)'); k.ctx.fillStyle = g; k.ctx.beginPath(); k.ctx.arc(780, 560, 260, 0, Math.PI * 2); k.ctx.fill();
        label(k, 'MÂY HYDRO', 780, 560, 'a', { size: 52 });
        bars(k, 240, 880, 600, 200, k.at('b', 2));
        chip(k, 'GIẢ THUYẾT', 40, 190, { bg: 'rgba(255,211,78,0.9)', size: 22 });
        bigNum(k, 'CHƯA KIỂM CHỨNG', W / 2, 1260, 'c', { size: 84, color: P.gold });
      },
    },
    {
      say: '{a}Vậy nên đến hôm nay, câu hỏi năm 1977 vẫn còn nguyên…',
      tail: 0.2,
      draw(k) { thumb(k); },
    },
  ],
};
