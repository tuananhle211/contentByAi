// Hạt Bụi Xanh · Short 1 của tập 139 (James Webb). Vòng: thiên hà đã lớn khi vũ trụ mới 2% tuổi → sáng, rộng, đã có oxy
// → JADES-GS-z14-0, ~290 triệu năm, vũ trụ = 1 ngày → 00:30 → dự đoán cũ nhỏ & mờ → Big Bang không sai, sai là tốc độ → vòng lại.
// Fact check: xem videos/139-kinh-james-webb-thu-khong-the-ton-tai/video.js. 10 giây đầu không tên riêng/địa danh.
import { P, fill, space, bigNum, label, chip, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080, H = 1920;
const lerp = (a, b, p) => a + (b - a) * p;
const SRC = { bg: 'rgba(245,241,230,0.85)', size: 22 };
const MP = { bg: 'rgba(255,211,78,0.9)', size: 22 };
function thumb(k) {
  fill(k, '#000');
  k.photo('z14', 0, 420, W, 900, { zoom: [3.6, 3.6], pan: [[0.785, 0.2], [0.785, 0.2]], credit: false });
  k.ctx.strokeStyle = '#E5383B'; k.ctx.lineWidth = 8; k.ctx.beginPath(); k.ctx.arc(700, 770, 140, 0, Math.PI * 2); k.ctx.stroke();
  k.ctx.fillStyle = 'rgba(5,8,26,0.92)'; k.ctx.fillRect(0, 140, W, 300);
  thumbLine(k, 'VŨ TRỤ MỚI 2% TUỔI', W / 2, 230, 84);
  thumbAsk(k, 'SAO ĐÃ LỚN THẾ?', W / 2, 370, 104, P.gold);
}

export default {
  meta: {
    title: 'Thiên Hà Này Sinh Ra Quá Sớm Để Tồn Tại? 🔭 #shorts',
    description: 'Kính James Webb tìm thấy một thiên hà sáng rực, chỉ khoảng 290 triệu năm sau vụ nổ lớn, khi vũ trụ mới khoảng 2% tuổi. Trong nó thậm chí đã có oxy. Vậy Big Bang có sai không?',
    tags: ['kính james webb', 'thiên hà xa nhất', 'big bang', 'vũ trụ sơ khai', 'vũ trụ', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'jameswebb', 'vutru', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    gpu: true, post: 'cosmos',
    related: '139-kinh-james-webb-thu-khong-the-ton-tai', // YouTube Studio → Video liên quan
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Vì sao thiên hà này đã lớn đến thế, khi vũ trụ mới hai phần trăm tuổi?', draw(k) { thumb(k); } },
    {
      say: '{a}Nó sáng rực, rộng hơn một nghìn năm ánh sáng. {b}Và trong nó đã có oxy, thứ chỉ sinh ra khi các ngôi sao chết.',
      draw(k) {
        fill(k, '#000');
        k.photo('z14-mh', 0, 300, W, 1000, { zoom: [1.6, 1.9], pan: [[0.5, 0.5], [0.55, 0.45]] });
        chip(k, 'HÌNH MINH HOẠ · ESO/M. KORNMESSER', 40, 330, MP);
        bigNum(k, 'RỘNG > 1.000 NĂM AS', W / 2, 220, 'a', { size: 76, color: P.cream });
        bigNum(k, 'ĐÃ CÓ OXY', W / 2, 1220, 'b', { size: 110, color: '#7FD38A' });
      },
    },
    {
      say: '{a}Năm 2024, kính James Webb xác nhận nó: chỉ khoảng hai trăm chín mươi triệu năm sau vụ nổ lớn. {b}Nếu cả lịch sử vũ trụ là một ngày, nó xuất hiện lúc nửa giờ sáng.',
      draw(k) {
        fill(k, '#000');
        k.photo('z14', 0, 300, W, 1000, { zoom: [2.6, 3.8], pan: [[0.76, 0.26], [0.785, 0.22]] });
        chip(k, 'NASA, ESA, CSA, STSCI · B. ROBERTSON', 40, 330, SRC);
        bigNum(k, '~290 TRIỆU NĂM', W / 2, 220, 'a', { size: 90, color: P.gold });
        bigNum(k, '= 00:30 SÁNG', W / 2, 1220, 'b', { size: 100, color: P.cream });
      },
    },
    {
      say: '{a}Theo dự đoán cũ, thiên hà thời ấy phải nhỏ và mờ, như một thị trấn mới chỉ có vài ngôi nhà. {b}Nhưng Webb cứ thấy những thiên hà sáng rực, sớm hơn mọi dự đoán.',
      draw(k) {
        fill(k, '#000');
        k.photo('deep-field', 0, 300, W, 1000, { zoom: [1.4, 2.0], pan: [[0.5, 0.5], [0.6, 0.38]] });
        chip(k, 'NASA, ESA, CSA, STSCI', 40, 330, SRC);
        bigNum(k, 'LẼ RA NHỎ & MỜ', W / 2, 220, 'a', { size: 90, color: P.cream });
        bigNum(k, 'SỚM HƠN DỰ ĐOÁN', W / 2, 1220, 'b', { size: 86, color: P.gold });
      },
    },
    {
      say: '{a}Big Bang không sai. Thứ bị lung lay là tốc độ. {b}Có thể khí thời ấy đặc hơn, sao to hơn, nên mọi thứ lớn nhanh hơn ta tưởng. Hoặc có thứ vật lý mà ta chưa biết.',
      draw(k) {
        space(k, { n: 160, drift: 30 });
        for (let i = 0; i < 16; i++) { const r = 80 + 60 * k.rand(i), x = (k.rand(i + 3) * 1400 + k.gt * 30) % 1400 - 160, y = 400 + k.rand(i + 9) * 800; const g = k.ctx.createRadialGradient(x, y, 2, x, y, r); g.addColorStop(0, 'rgba(230,150,110,0.25)'); g.addColorStop(1, 'rgba(230,150,110,0)'); k.ctx.fillStyle = g; k.ctx.fillRect(x - r, y - r, 2 * r, 2 * r); }
        bigNum(k, 'BIG BANG: ĐÚNG', W / 2, 420, 'a', { size: 96, color: P.cream });
        bigNum(k, 'TỐC ĐỘ: SAI?', W / 2, 640, 'a', { size: 110, color: P.gold });
        label(k, 'KHÍ ĐẶC · SAO TO · VẬT LÝ MỚI?', W / 2, 1080, 'b', { size: 52, color: P.cream });
      },
    },
    {
      say: '{a}Nên đến hôm nay, các nhà khoa học vẫn đang hỏi…',
      tail: 0.2,
      draw(k) { thumb(k); },
    },
  ],
};
