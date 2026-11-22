// Hạt Bụi Xanh · Short 1 của tập 115 (Mặt Trăng). Vòng: Mặt Trăng chạy xa bao nhiêu mỗi năm → đo bằng laser bắn vào gương trên Mặt Trăng
// → gương Apollo 11 (1969), chính xác milimét → 3,8 cm/năm, thuỷ triều là thủ phạm → ngày dài thêm, 600 triệu năm hết nhật thực → vòng lại.
// Fact check: xem videos/115-neu-mat-trang-bien-mat/video.js (NASA LLR 3,8 cm/năm; ~1,8 ms/thế kỷ; 70 triệu năm trước ~23,5 giờ; ~600 triệu năm).
// Khung 1080×1920: nội dung y 150–1300. Khung đầu = thumbnail. 10 giây đầu không tên/địa danh.
import { P, fill, space, bigNum, label, chip, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080, H = 1920;
const lerp = (a, b, p) => a + (b - a) * p;
const SRC = { bg: 'rgba(245,241,230,0.85)', size: 22 };
const MP = { bg: 'rgba(255,211,78,0.9)', size: 22 };
const disc = (k, name, x, y, r, f = 0.92, a = 1) => { if (a <= 0) return; const s = r / f; k.ctx.save(); k.ctx.globalAlpha *= a; k.ctx.beginPath(); k.ctx.arc(x, y, r, 0, Math.PI * 2); k.ctx.clip(); k.photo(name, x - s, y - s, s * 2, s * 2, { zoom: [1, 1], credit: false }); k.ctx.restore(); };
function thumb(k) {
  space(k, { n: 200 });
  disc(k, 'trang-ram', W / 2, 820, 360);
  k.ctx.fillStyle = 'rgba(5,8,26,0.92)'; k.ctx.fillRect(0, 140, W, 300);
  thumbLine(k, 'MẶT TRĂNG ĐANG', W / 2, 230, 96);
  thumbAsk(k, 'BỎ CHẠY?', W / 2, 370, 120, P.gold);
}

export default {
  meta: {
    title: 'Mặt Trăng Đang Rời Xa Trái Đất Mỗi Năm? 🌕 #shorts',
    description: 'Mỗi năm, Mặt Trăng rời xa Trái Đất khoảng 3,8 cm. Con số ấy được đo bằng tia laser bắn vào những tấm gương mà phi hành gia để lại trên Mặt Trăng.',
    tags: ['mặt trăng', 'mặt trăng rời xa trái đất', 'apollo 11', 'thuỷ triều', 'vũ trụ', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'mattrang', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    gpu: true, post: 'cosmos',
    related: '115-neu-mat-trang-bien-mat', // YouTube Studio → Video liên quan
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Mỗi năm, Mặt Trăng chạy khỏi Trái Đất bao xa?', draw(k) { thumb(k); } },
    {
      say: '{a}Câu trả lời được đo bằng tia laser, {b}bắn thẳng vào những tấm gương đang nằm trên Mặt Trăng.',
      draw(k) {
        space(k, { n: 160 });
        disc(k, 'trai-dat-that', W / 2, 1180, 150, 0.85);
        disc(k, 'trang-ram', W / 2, 420, 110);
        const p = k.at('a', 1.5, 'linear'); k.ctx.strokeStyle = `rgba(229,56,59,${k.at('a', 0.3)})`; k.ctx.lineWidth = 5; k.ctx.beginPath(); k.ctx.moveTo(W / 2, 1030); k.ctx.lineTo(W / 2, lerp(1030, 530, Math.min(1, p))); k.ctx.stroke();
        bigNum(k, 'LASER + GƯƠNG', W / 2, 220, 'b', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Năm 1969, các phi hành gia Apollo 11 đặt tấm gương đầu tiên. {b}Các đài thiên văn bắn laser lên, đo lúc ánh sáng dội về, chính xác tới vài milimét.',
      draw(k) {
        fill(k, '#000');
        k.photo('guong-laser', 0, 300, W, 1000, { zoom: [1.1, 1.3], pan: [[0.5, 0.5], [0.55, 0.45]] });
        chip(k, 'NASA · APOLLO 11 · 1969', 40, 330, SRC);
        bigNum(k, 'CHÍNH XÁC MILIMÉT', W / 2, 1220, 'b', { size: 80, color: P.gold });
      },
    },
    {
      say: '{a}Kết quả: Mặt Trăng xa thêm khoảng ba phẩy tám xăng-ti-mét mỗi năm, gần bằng tốc độ móng tay bạn mọc. {b}Thủ phạm là thuỷ triều: chỗ nước phồng lên kéo Mặt Trăng nhích dần ra xa, còn Trái Đất thì quay chậm lại.',
      draw(k) {
        space(k, { n: 120 });
        k.ctx.fillStyle = 'rgba(46,134,222,0.5)'; k.ctx.beginPath(); k.ctx.ellipse(W / 2, 1050, 250, 210, 0, 0, Math.PI * 2); k.ctx.fill();
        disc(k, 'trai-dat-that', W / 2, 1050, 200, 0.85);
        const y = lerp(560, 470, k.at('b', 5, 'inOut')); disc(k, 'trang-ram', W / 2, y, 70);
        k.ctx.strokeStyle = 'rgba(255,211,78,0.7)'; k.ctx.setLineDash([10, 8]); k.ctx.lineWidth = 3; k.ctx.beginPath(); k.ctx.moveTo(W / 2 - 200, 560); k.ctx.lineTo(W / 2 + 200, 560); k.ctx.stroke(); k.ctx.setLineDash([]);
        bigNum(k, '+3,8 CM / NĂM', W / 2, 250, 'a', { size: 110, color: P.gold });
        chip(k, 'MINH HOẠ · PHÓNG ĐẠI', 40, 1290, MP);
      },
    },
    {
      say: '{a}Vì vậy ngày của chúng ta dài thêm từng chút. Thời khủng long, một ngày chỉ khoảng hai mươi ba tiếng rưỡi. {b}Và sáu trăm triệu năm nữa, sẽ không còn nhật thực toàn phần.',
      draw(k) {
        fill(k, '#000');
        k.photo('nhat-thuc', 0, 300, W, 1000, { zoom: [1.2, 1.35], p: k.at('b', 0.6), fx: 'fade' });
        if (k.t < k.cue('b', 0.6)) { space(k, { n: 120 }); bigNum(k, '~23,5 GIỜ', W / 2, 700, 'a', { size: 130, color: P.cream }); label(k, 'MỘT NGÀY THỜI KHỦNG LONG', W / 2, 840, 'a', { size: 46, color: P.gold }); }
        chip(k, 'NHẬT THỰC 2017 · O\'DEA', 40, 330, { ...SRC, p: k.at('b', 0.6) });
        bigNum(k, '~600 TRIỆU NĂM', W / 2, 1220, 'b', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Nó sẽ không kịp thoát hẳn, vì Mặt Trời sẽ già đi trước. {b}Nhưng mỗi lần ngẩng lên nhìn trăng, hãy nhớ câu hỏi…',
      tail: 0.2,
      draw(k) { thumb(k); },
    },
  ],
};
