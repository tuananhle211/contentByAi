// Hạt Bụi Xanh · Short 2 của tập 139 (James Webb). Vòng: những chấm đỏ nhỏ là gì → có khắp vũ trụ sơ khai rồi biến mất
// → Webb thấy hàng trăm, ~1 tỷ năm đầu → thiên hà thì quá đặc, hố đen thì thiếu tia X → giả thuyết hố đen bọc khí, lõi thiên hà ngày nay → vòng lại.
// Fact check: xem videos/139-kinh-james-webb-thu-khong-the-ton-tai/video.js (NASA/STScI 2025).
import { P, fill, space, bigNum, label, chip, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';
import { three } from '/engine/gl3d.js';
import { blackHoleScene, blackHoleUpdate } from '/channel/hat-bui-xanh-3d.js';

const W = 1080, H = 1920;
const lerp = (a, b, p) => a + (b - a) * p;
const SRC = { bg: 'rgba(245,241,230,0.85)', size: 22 };
const MP = { bg: 'rgba(255,211,78,0.9)', size: 22 };
const BH = blackHoleScene();
function thumb(k) {
  fill(k, '#000');
  k.photo('cham-do', 0, 420, W, 900, { zoom: [4.0, 4.0], pan: [[0.5, 0.245], [0.5, 0.245]], credit: false });
  k.ctx.fillStyle = 'rgba(5,8,26,0.92)'; k.ctx.fillRect(0, 140, W, 300);
  thumbLine(k, 'CHẤM ĐỎ NHỎ NÀY', W / 2, 230, 92);
  thumbAsk(k, 'LÀ THỨ GÌ?', W / 2, 370, 116, P.gold);
}
function reds(k, n, a) { for (let i = 0; i < n; i++) { const x = 60 + k.rand(i) * 960, y = 320 + k.rand(i + 400) * 960 + 20 * Math.sin(k.gt * 0.4 + i); k.dot(x, y, 5 + 4 * k.rand(i + 7), '#E5483B', a * (0.6 + 0.4 * Math.sin(k.gt * 2 + i))); } }

export default {
  meta: {
    title: 'Những Chấm Đỏ Nhỏ Khiến Các Nhà Khoa Học Bối Rối 🔭 #shorts',
    description: 'Kính James Webb tìm thấy hàng trăm chấm đỏ nhỏ trong vũ trụ sơ khai. Chúng không giống thiên hà, cũng không giống hố đen. Rồi chúng biến mất. Đây là những gì các nhà khoa học đang nghĩ.',
    tags: ['chấm đỏ nhỏ', 'kính james webb', 'little red dots', 'hố đen', 'vũ trụ sơ khai', 'khoa học', 'shorts', 'hạt bụi xanh'],
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
    { say: '{a}Những chấm đỏ nhỏ này là thứ gì?', draw(k) { thumb(k); } },
    {
      say: '{a}Chúng có ở khắp vũ trụ thuở sơ khai, khi vũ trụ chưa tới một tỷ rưỡi tuổi. {b}Rồi chúng biến mất. Và đến nay chưa ai giải thích được.',
      draw(k) {
        space(k, { n: 160, drift: 30 });
        reds(k, 140, k.at('a', 1) * (1 - 0.9 * k.at('b', 2)));
        bigNum(k, 'KHẮP NƠI', W / 2, 220, 'a', { size: 110, color: P.cream, p: k.at('a', 0.5) * (1 - k.at('b', 0.5)) });
        bigNum(k, 'RỒI BIẾN MẤT', W / 2, 220, 'b', { size: 110, color: P.gold });
        chip(k, 'MINH HOẠ', 40, 1290, MP);
      },
    },
    {
      say: '{a}Kính James Webb đã tìm thấy hàng trăm chấm như thế, trong khoảng một tỷ năm đầu sau vụ nổ lớn. {b}Nhỏ gọn, đỏ, và sáng.',
      draw(k) {
        fill(k, '#000');
        k.photo('cham-do', 0, 300, W, 1000, { zoom: [3.6, 4.2], pan: [[0.5, 0.245], [0.5, 0.245]] });
        chip(k, 'NASA, ESA, CSA, STSCI · D. KOCEVSKI', 40, 330, SRC);
        bigNum(k, 'HÀNG TRĂM', W / 2, 220, 'a', { size: 110, color: P.cream });
        bigNum(k, 'NHỎ · ĐỎ · SÁNG', W / 2, 1220, 'b', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Nếu là thiên hà, chúng quá đặc, quá nặng so với kích thước. {b}Nếu là hố đen đang nuốt khí, lẽ ra phải phát tia X rất mạnh. Nhưng gần như không có.',
      draw(k) {
        space(k, { n: 120, drift: 30 });
        reds(k, 30, 0.8);
        bigNum(k, 'THIÊN HÀ? QUÁ ĐẶC', W / 2, 480, 'a', { size: 80, color: P.cream });
        bigNum(k, 'HỐ ĐEN? THIẾU TIA X', W / 2, 900, 'b', { size: 80, color: P.gold });
      },
    },
    {
      say: '{a}Giả thuyết mới nhất: đó là những hố đen bị bọc trong một lớp khí dày, như một ngôi sao khổng lồ, một kiểu vật thể loài người chưa từng thấy. {b}Và có thể chính chúng đã trở thành lõi của những thiên hà ngày nay, kể cả dải Ngân Hà. Chưa ai chắc chắn.',
      draw(k) {
        fill(k, '#000');
        three(k, 'bh', BH, blackHoleUpdate({ dist: 13, orbit: 0.06, tilt: 0.14 }), 0, 400, W, 900, { exposure: 1.1 });
        const q = k.at('a', 2); const g = k.ctx.createRadialGradient(W / 2, 850, 40, W / 2, 850, 520); g.addColorStop(0, `rgba(200,60,40,${0.8 * q})`); g.addColorStop(1, 'rgba(120,30,20,0)'); k.ctx.fillStyle = g; k.ctx.fillRect(0, 300, W, 1100);
        bigNum(k, 'HỐ ĐEN BỌC KHÍ?', W / 2, 260, 'a', { size: 96, color: P.gold });
        label(k, 'LÕI THIÊN HÀ NGÀY NAY?', W / 2, 1250, 'b', { size: 60, color: P.cream });
        chip(k, 'GIẢ THUYẾT · MÔ PHỎNG', 40, 360, MP);
      },
    },
    {
      say: '{a}Vậy nên đến giờ, các nhà khoa học vẫn hỏi…',
      tail: 0.2,
      draw(k) { thumb(k); },
    },
  ],
};
