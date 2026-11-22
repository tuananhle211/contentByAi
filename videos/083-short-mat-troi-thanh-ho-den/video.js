// Hạt Bụi Xanh · Short đi kèm tập 082 (Nếu Một Hố Đen Đi Ngang Hệ Mặt Trời). Khung "câu hỏi + twist".
// Fact check: NASA Imagine the Universe — thay Mặt Trời bằng hố đen cùng khối lượng: quỹ đạo Trái Đất không đổi, chỉ tối và lạnh.
//   Bán kính chân trời sự kiện ~3 km / khối lượng Mặt Trời → Mặt Trời: đường kính ~6 km.
// Khung 1080×1920: nội dung trong y 150–1300 (phụ đề ở y≈1420). Câu đầu = chữ to hiện ngay khung đầu (p: 1).
import { P, fill, space, earth, blackHole, solarSystem, gravityRings, bigNum, label, scaleBar, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080;
// Thumbnail = khung đầu: chủ thể Mặt Trời nửa sáng nửa hố đen + chi tiết Trái Đất nhỏ có mũi tên + câu hỏi có chủ thể.
function thumb(k) {
  space(k, { n: 160 });
  const { ctx } = k; const cx = W / 2, cy = 820, r = 320;
  k.dot(cx, cy, r + 90, '#FFB43A', 0.18);
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI / 2, Math.PI * 1.5); ctx.closePath(); ctx.fillStyle = '#FFD34E'; ctx.fill(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ctx.fillStyle = '#000'; ctx.fill();
  ctx.strokeStyle = 'rgba(255,170,60,0.9)'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(cx, cy, r + 6, -Math.PI / 2, Math.PI / 2); ctx.stroke(); ctx.restore();
  earth(k, 860, 1230, 70, { spin: 0 });
  k.arrow(860, 1150, 800, 1030, { stroke: P.red, width: 9, head: 34, seed: 5 });
  thumbLine(k, 'MẶT TRỜI HOÁ HỐ ĐEN', W / 2, 250, 84);
  thumbAsk(k, 'TRÁI ĐẤT BỊ HÚT?', W / 2, 395, 90, P.gold);
}
const lerp = (a, b, p) => a + (b - a) * p;

export default {
  meta: {
    title: 'Nếu Mặt Trời Biến Thành Hố Đen, Trái Đất Có Bị Hút Vào? 🕳️ #shorts',
    description: 'Nếu Mặt Trời bỗng biến thành một hố đen có cùng khối lượng, Trái Đất có bị hút vào không? Câu trả lời của NASA sẽ khiến bạn bất ngờ.\n\nBản đầy đủ: Điều Gì Xảy Ra Nếu Một Hố Đen Đi Ngang Hệ Mặt Trời? trên kênh Hạt Bụi Xanh.',
    links: [['▶ Bản đầy đủ: Nếu Một Hố Đen Đi Ngang Hệ Mặt Trời', '082-neu-ho-den-di-ngang-he-mat-troi']],
    tags: ['hố đen', 'lỗ đen', 'mặt trời biến thành hố đen', 'điều gì xảy ra nếu', 'vũ trụ', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'hoden', 'vutru', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    images: { poster: 'assets/poster.jpg' },
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Nếu Mặt Trời biến thành hố đen, Trái Đất có bị hút vào không?',
      draw(k) { thumb(k); },
    },
    {
      say: '{a}Câu trả lời của NASA: không. {b}Trái Đất vẫn quay, đúng theo quỹ đạo cũ.',
      draw(k) {
        space(k, { n: 120 });
        solarSystem(k, W / 2, 760, 1500, { n: 3, dim: 1, speed: 0.35 });
        bigNum(k, 'KHÔNG.', W / 2, 260, 'a', { size: 150, color: P.gold });
        label(k, 'quỹ đạo không đổi', W / 2, 1220, 'b', { size: 50 });
      },
    },
    {
      say: '{a}Vì ở khoảng cách xa, hố đen hút y hệt một ngôi sao cùng khối lượng. {b}Nó không phải một cái máy hút bụi.',
      draw(k) {
        space(k, { n: 100 });
        gravityRings(k, W / 2, 560, 220); k.dot(W / 2, 560, 70, '#FFD34E');
        gravityRings(k, W / 2, 1020, 220); blackHole(k, W / 2, 1020, 26);
        bigNum(k, '=', W / 2, 800, 'a', { size: 120, color: P.gold });
        bigNum(k, 'KHÔNG PHẢI MÁY HÚT BỤI', W / 2, 250, 'b', { size: 66, color: P.red });
      },
    },
    {
      say: '{a}Nó chỉ nhỏ lại. Cả Mặt Trời bị nén vào một quả cầu chừng sáu cây số.',
      draw(k) {
        space(k, { n: 100 });
        const c = k.at('a', 3, 'inOut');
        k.dot(W / 2, 640, lerp(380, 10, c), '#FFD34E', 1);
        scaleBar(k, 290, 790, 1080, '~6 KM', { p: k.at('a', 1) });
      },
    },
    {
      say: '{a}Nhưng bầu trời sẽ tối đen. {b}Và Trái Đất sẽ lạnh dần.',
      draw(k) {
        space(k, { n: 160 });
        earth(k, W / 2, 700, 300, { spin: 0.02, ice: 0.9 * k.at('b', 3) });
        bigNum(k, 'TỐI ĐEN', W / 2, 250, 'a', { size: 110 });
        bigNum(k, 'LẠNH DẦN', W / 2, 1180, 'b', { size: 100, color: '#9FD8EA' });
      },
    },
    {
      say: '{full}Xem bản đầy đủ: nếu một hố đen đi ngang Hệ Mặt Trời, trên kênh Hạt Bụi Xanh.',
      tail: 1.6,
      sfx: [['whoosh', 'full', 0.3]],
      draw(k) {
        fill(k, P.space);
        bigNum(k, 'BẢN ĐẦY ĐỦ', W / 2, 260, 'full', { size: 100, color: P.gold });
        const p = k.at('full', 0.6, 'back'), w = W - 120, h = (w * 9) / 16;
        k.group({ x: W / 2, y: 330 + h / 2, s: Math.max(0.01, p) }, () => {
          k.ctx.fillStyle = P.cream; k.ctx.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20);
          k.image('poster', -w / 2, -h / 2, w, h, { fx: 'fade', p: p > 0 ? 1 : 0 });
        });
        label(k, 'Nếu Hố Đen Đi Ngang Hệ Mặt Trời?', W / 2, 330 + h + 90, k.cue('full', 0.6), { size: 50 });
        const bob = Math.sin(k.t * 6) * 14;
        k.arrow(W / 2, 1060 + bob, W / 2, 1200 + bob, { p: k.at(k.cue('full', 1.5), 0.5), width: 10, head: 40, stroke: P.gold, seed: 802 });
      },
    },
  ],
};
