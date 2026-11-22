// Hạt Bụi Xanh · Short 2 của tập 090 (khủng long). Twist: kẻ thống trị chết, kẻ nhỏ có mỏ sống → chim là khủng long.
// Fact check: T. rex dài ~12 m, nặng ~8 tấn; bụi mịn làm quang hợp gần như ngừng ~1,7 năm (Senel et al. 2023, Nature Geoscience);
// chim có mỏ, ăn hạt sống sót, hạt tồn tại lâu trong đất (Larson et al. 2016, Current Biology — giả thuyết); chim là khủng long chân thú.
// Ảnh: xương T. rex bản đúc MOR 555 (Robosorne, CC BY-SA 3.0). Khung 1080×1920: nội dung trong y 150–1300. Khung đầu = thumbnail.
import { P, fill, cretaceous, trex, bird, mammal, bigNum, label, chip, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080;
function thumb(k) {
  cretaceous(k, { sky: 'dusk', y: 1250, trees: 5, river: false });
  trex(k, -60, 1260, 1000, { color: '#8A5A3A' });
  bird(k, 880, 1260, 300, {});
  thumbLine(k, 'VÌ SAO CON GÀ', W / 2, 250, 110);
  thumbAsk(k, 'SỐNG SÓT?', W / 2, 400, 110, P.gold);
}

export default {
  meta: {
    title: 'T. rex Chết, Vì Sao Tổ Tiên Con Gà Lại Sống? 🦖 #shorts',
    description: 'Tiểu hành tinh giết chết T. rex và hầu hết các loài khủng long. Nhưng một nhóm khủng long nhỏ, có mỏ, lại sống sót. Ngày nay, chúng đang đi lại ngoài sân nhà bạn.\n\nBản đầy đủ: 24 Giờ Cuối Cùng Của Loài Khủng Long trên kênh Hạt Bụi Xanh.',
    links: [['▶ Bản đầy đủ: 24 Giờ Cuối Cùng Của Loài Khủng Long', '090-24-gio-cuoi-cung-cua-khung-long']],
    tags: ['khủng long', 'chim là khủng long', 't rex', 'khủng long tuyệt chủng', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'khunglong', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    related: '090-24-gio-cuoi-cung-cua-khung-long', // YouTube Studio → Video liên quan (thay cảnh cuối "xem bản đầy đủ")
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Tiểu hành tinh giết chết T. rex. Nhưng tổ tiên con gà thì sống.', draw(k) { thumb(k); } },
    {
      say: '{a}Kẻ thống trị mặt đất chết hết. {b}Còn một con vật nhỏ có mỏ lại qua được. Vì sao?',
      draw(k) {
        fill(k, '#000');
        k.photo('xuong-trex', 0, 150, W, 1150, { zoom: [1.15, 1.3], pan: [[0.6, 0.45], [0.66, 0.4]] });
        bigNum(k, 'VÌ SAO?', W / 2, 1180, 'b', { size: 110, color: P.gold });
      },
    },
    {
      say: '{a}Sau cú va chạm, bụi và khói che kín bầu trời gần hai năm. {b}Thiếu ánh nắng, cây cối gần như ngừng lớn.',
      draw(k) {
        cretaceous(k, { sky: 'dark', y: 1250, trees: 6, river: false });
        k.ctx.fillStyle = `rgba(8,6,6,${0.3 + 0.4 * k.at('a', 3)})`; k.ctx.fillRect(0, 0, W, 1920);
        trex(k, 60, 1260, 900, { color: '#4A3326' });
        for (let i = 0; i < 60; i++) k.dot(k.rand(i + 300) * W, (k.rand(i + 330) * 1300 + k.t * 20) % 1300, 3, '#8C8070', 0.5);
        bigNum(k, '~2 NĂM TỐI TĂM', W / 2, 330, 'a', { size: 96, color: P.cream });
      },
    },
    {
      say: '{a}Không có cây, loài ăn cỏ chết đói. Loài ăn cỏ chết, loài ăn thịt chết theo. {b}Con vật càng to càng cần nhiều thức ăn, càng chết sớm. Gần như không loài động vật trên cạn nào nặng hơn hai mươi lăm ký sống sót.',
      draw(k) {
        fill(k, '#151515');
        const steps = [['CÂY', '#3BA55C'], ['ĂN CỎ', '#9C8F6B'], ['ĂN THỊT', '#C98B5A']];
        steps.forEach(([t, c], i) => { k.ctx.fillStyle = c; k.ctx.globalAlpha = 1 - 0.75 * k.at(k.cue('a', i * 1.3 + 0.8), 0.8); k.ctx.fillRect(140, 260 + i * 200, 800, 140); k.ctx.globalAlpha = 1; label(k, t, W / 2, 330 + i * 200, k.cue('a', i * 1.3), { size: 60 }); });
        trex(k, 60, 1280, 700, { color: '#4A3326', alpha: 1 - 0.6 * k.at('b', 2) });
        bigNum(k, '> 25 KG: GẦN NHƯ HẾT', W / 2, 1000, 'b', { size: 76, color: P.red });
      },
    },
    {
      say: '{a}Những kẻ sống sót đều nhỏ, và ăn được thứ còn sót lại. {b}Các nhà khoa học cho rằng những con khủng long nhỏ có mỏ, không răng, đã sống nhờ ăn hạt, thứ có thể nằm trong đất nhiều năm.',
      draw(k) {
        fill(k, '#1A1512');
        mammal(k, 280, 1150, 220, { alpha: k.at('a', 0.6) });
        for (let i = 0; i < 14; i++) k.dot(560 + i * 30, 1170 + 10 * Math.sin(i * 2), 7, '#D9B36A', k.at('b', 1));
        bird(k, W / 2 + 160, 1150, 380, { alpha: k.at('b', 0.6) });
        bigNum(k, 'NHỎ · ĂN HẠT', W / 2, 360, 'a', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Ngày nay ta gọi chúng là chim. {b}Đó là lý do vì sao…',
      tail: 0.2,
      sfx: [['sparkle', 'a', 0.25]],
      draw(k) {
        fill(k, '#000');
        k.photo('ga-trong', 0, 360, W, 900, { zoom: [1.0, 1.08], focus: [0.4, 0.5] });
        bigNum(k, 'CHIM = KHỦNG LONG', W / 2, 260, 'a', { size: 84, color: P.cream });
      },
    },
  ],
};
