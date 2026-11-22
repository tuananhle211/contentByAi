// Hạt Bụi Xanh · Short 2 của tập 109 (hố đen lớn nhất). Vòng: vì sao hố đen lớn nhất loãng hơn không khí → 40 tỷ Mặt Trời mà loãng ~100 lần
// → chân trời tỉ lệ thuận khối lượng → thể tích tăng lập phương → mật độ ∝ 1/M² → hố đen cỡ Mặt Trời đặc hơn hạt nhân, TON 618 ~0,01 kg/m³ → vòng lại.
// Fact check: ρ = 3c⁶/(32πG³M²): M☉ → ~1,8×10¹⁹ kg/m³ (hạt nhân ~2,3×10¹⁷); 4×10¹⁰ M☉ → ~0,011 kg/m³; không khí ~1,2 kg/m³.
// "Trung bình" = chia đều khối lượng trong thể tích bên trong chân trời; theo thuyết tương đối khối lượng dồn về tâm.
import { P, fill, space, bigNum, label, chip, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';
import { three } from '/engine/gl3d.js';
import { blackHoleScene, blackHoleUpdate } from '/channel/hat-bui-xanh-3d.js';

const W = 1080, H = 1920;
const MP = { bg: 'rgba(255,211,78,0.9)', size: 22 };
const SRC = { bg: 'rgba(245,241,230,0.85)', size: 22 };
const BH = blackHoleScene();
const bh = (k, o = {}) => three(k, 'bh', BH, blackHoleUpdate({ dist: o.dist ?? 12, orbit: o.orbit ?? 0.05, tilt: 0.14 }), 0, o.y ?? 300, W, 1100, { exposure: o.exp ?? 1.2 });
function horizon(k, x, y, r) {
  const { ctx } = k; const g = ctx.createRadialGradient(x, y, r * 0.95, x, y, r * 1.2); g.addColorStop(0, 'rgba(255,150,60,0.55)'); g.addColorStop(1, 'rgba(255,150,60,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
}
function thumb(k) {
  fill(k, '#000');
  bh(k, { dist: 11, orbit: 0, y: 380 });
  k.ctx.fillStyle = 'rgba(5,8,26,0.92)'; k.ctx.fillRect(0, 140, W, 300);
  thumbLine(k, 'HỐ ĐEN LỚN NHẤT', W / 2, 230, 96);
  thumbAsk(k, 'LOÃNG HƠN KHÍ?', W / 2, 370, 104, P.gold);
  chip(k, 'MÔ PHỎNG', 40, 1260, MP);
}
// Hộp chấm: n chấm trong ô vuông (x, y, s).
function box(k, x, y, s, n, color, p = 1) {
  k.ctx.strokeStyle = 'rgba(245,241,230,0.5)'; k.ctx.lineWidth = 3; k.ctx.strokeRect(x, y, s, s);
  for (let i = 0; i < n; i++) k.dot(x + 10 + k.rand(i + n) * (s - 20), y + 10 + k.rand(i + n + 500) * (s - 20), 4, color, p);
}

export default {
  meta: {
    title: 'Vì Sao Hố Đen Lớn Nhất Lại Loãng Hơn Không Khí? 🕳️ #shorts',
    description: 'Hố đen TON 618 nặng khoảng 40 tỷ lần Mặt Trời. Vậy mà nếu chia đều khối lượng vào bên trong chân trời sự kiện, nó còn loãng hơn không khí. Vì sao?',
    tags: ['hố đen', 'hố đen lớn nhất vũ trụ', 'ton 618', 'chân trời sự kiện', 'vũ trụ', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'hoden', 'vutru', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    gpu: true, post: 'cosmos',
    related: '109-ho-den-lon-nhat-vu-tru', // YouTube Studio → Video liên quan
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Vì sao hố đen lớn nhất lại loãng hơn không khí?', draw(k) { thumb(k); } },
    {
      say: '{a}Nó nặng khoảng bốn mươi tỷ lần Mặt Trời. {b}Vậy mà tính trung bình, nó còn loãng hơn không khí bạn đang thở, khoảng một trăm lần.',
      draw(k) {
        space(k, { n: 120 });
        horizon(k, W / 2, 640, 300);
        for (let i = 0; i < 6; i++) k.dot(W / 2 - 240 + k.rand(i) * 480, 400 + k.rand(i + 9) * 480, 4, '#8FA3B8', k.at('b', 1));
        bigNum(k, '40 TỶ MẶT TRỜI', W / 2, 220, 'a', { size: 90, color: P.cream });
        bigNum(k, 'LOÃNG HƠN ~100 LẦN', W / 2, 1180, 'b', { size: 84, color: P.gold });
      },
    },
    {
      say: '{a}Hố đen là nơi vật chất bị nén đến mức ánh sáng cũng không thoát ra. Ranh giới ấy gọi là chân trời sự kiện. {b}Hố đen nặng gấp đôi, chân trời rộng gấp đôi.',
      draw(k) {
        space(k, { n: 120 });
        horizon(k, 330, 760, 140); horizon(k, 770, 760, 280 * k.at('b', 1, 'out') || 0.01);
        label(k, '×1', 330, 980, 'a', { size: 52 });
        label(k, 'NẶNG ×2 → RỘNG ×2', 770, 1110, 'b', { size: 52, color: P.gold });
        bigNum(k, 'CHÂN TRỜI SỰ KIỆN', W / 2, 260, 'a', { size: 80, color: P.cream });
      },
    },
    {
      say: '{a}Nhưng thể tích bên trong tăng nhanh hơn nhiều. {b}Rộng gấp đôi thì chứa được gấp tám lần. {c}Nên hố đen càng nặng, chia đều ra lại càng loãng.',
      draw(k) {
        space(k, { n: 100 });
        box(k, 130, 560, 260, 40, P.gold, k.at('a', 0.6));
        box(k, 470, 420, 520, 80, P.gold, k.at('b', 0.6));
        label(k, '×1', 260, 880, 'a', { size: 52 });
        label(k, '×8 THỂ TÍCH', 730, 1000, 'b', { size: 52, color: P.gold });
        bigNum(k, 'CÀNG NẶNG CÀNG LOÃNG', W / 2, 1200, 'c', { size: 76, color: P.cream });
      },
    },
    {
      say: '{a}Một hố đen cỡ Mặt Trời, tính trung bình, còn đặc hơn cả hạt nhân nguyên tử. {b}Còn TON 618 chỉ khoảng một phần trăm ki-lô-gam mỗi mét khối. {c}Tất nhiên khối lượng thật không chia đều, mà theo lý thuyết, dồn hết về điểm chính giữa.',
      draw(k) {
        fill(k, '#000');
        k.photo('mat-troi', W / 2 - 200, 260, 400, 400, { radius: 200, credit: false, p: 1 - k.at('b', 0.6) });
        k.photo('eht-m87', W / 2 - 300, 250, 600, 600, { zoom: [1.3, 1.4], radius: 300, credit: false, p: k.at('b', 0.6), fx: 'fade' });
        chip(k, k.t < k.cue('b') ? 'NASA SDO · MẶT TRỜI' : 'EHT · M87*', 40, 190, SRC);
        bigNum(k, 'ĐẶC HƠN HẠT NHÂN', W / 2, 1000, 'a', { size: 76, color: P.cream, p: k.at('a', 0.5) * (1 - k.at('b', 0.4)) });
        bigNum(k, '~0,01 KG/M³', W / 2, 1000, 'b', { size: 110, color: P.gold });
        label(k, 'KHỐI LƯỢNG DỒN VỀ TÂM', W / 2, 1180, 'c', { size: 50 });
      },
    },
    {
      say: '{a}Nặng nhất, mà lại loãng nhất. {b}Nên câu hỏi kỳ lạ nhất về nó vẫn là…',
      tail: 0.2,
      draw(k) { thumb(k); },
    },
  ],
};
