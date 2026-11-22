// Hạt Bụi Xanh · Short 2 của tập 082 (hố đen). Khung chuyện có twist: ngôi sao sáng 270 ngày → thứ vô hình → hố đen lang thang.
// Fact check: NASA/ESA Hubble heic2210 (2022), Sahu et al. 2022: sự kiện vi thấu kính 2011, sáng ~270 ngày, ~7 M☉; ~100 triệu hố đen lang thang (ước tính NASA).
// Khung 1080×1920: nội dung trong y 150–1300 (phụ đề ở y≈1420). Khung đầu = thumbnail (skill `thumbnail`: một câu hỏi).
import { P, fill, space, earth, lensedStars, lightCurve, blackHole, bigNum, label, thumbLine, thumbAsk, shortEnd } from '/channel/hat-bui-xanh.js';

const W = 1080;
function thumb(k) {
  space(k, { n: 180 });
  const g = k.ctx.createRadialGradient(W / 2, 820, 10, W / 2, 820, 360); g.addColorStop(0, 'rgba(255,255,255,0.95)'); g.addColorStop(0.15, 'rgba(207,227,255,0.6)'); g.addColorStop(1, 'rgba(207,227,255,0)');
  k.ctx.fillStyle = g; k.ctx.fillRect(0, 400, W, 900);
  lightCurve(k, 90, 1110, 900, 160, 1);
  thumbLine(k, 'SAO SÁNG 270 NGÀY', W / 2, 250, 90);
  thumbAsk(k, 'VÌ THỨ GÌ?', W / 2, 395, 100, P.gold);
}

export default {
  meta: {
    title: 'Ngôi Sao Bỗng Sáng Lên 270 Ngày Vì Một Thứ Vô Hình 🕳️ #shorts',
    description: 'Năm 2011, một ngôi sao bỗng sáng lên suốt 270 ngày — dù giữa nó và Trái Đất không có gì cả. Thủ phạm là một thứ vô hình nặng gấp 7 lần Mặt Trời.\n\nBản đầy đủ: Điều Gì Xảy Ra Nếu Một Hố Đen Đi Ngang Hệ Mặt Trời? trên kênh Hạt Bụi Xanh.',
    links: [['▶ Bản đầy đủ: Nếu Một Hố Đen Đi Ngang Hệ Mặt Trời', '082-neu-ho-den-di-ngang-he-mat-troi']],
    tags: ['hố đen', 'hố đen lang thang', 'thấu kính hấp dẫn', 'vũ trụ', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'hoden', 'vutru', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    images: { poster: 'assets/poster.jpg' },
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Năm 2011, một ngôi sao ở rất xa bỗng sáng lên. Suốt hai trăm bảy mươi ngày.', draw(k) { thumb(k); } },
    {
      say: '{a}Giữa ngôi sao ấy và Trái Đất, không có gì cả. Không ánh sáng. Không vật thể nào kính thiên văn nhìn thấy.',
      draw(k) {
        space(k, { n: 160 });
        k.dot(W / 2, 360, 12, '#FFFFFF'); earth(k, W / 2, 1150, 90, { spin: 0 });
        k.ctx.setLineDash([16, 14]); k.ctx.strokeStyle = 'rgba(245,241,230,0.4)'; k.ctx.lineWidth = 4; k.ctx.beginPath(); k.ctx.moveTo(W / 2, 380); k.ctx.lineTo(W / 2, 1050); k.ctx.stroke(); k.ctx.setLineDash([]);
        bigNum(k, 'KHÔNG CÓ GÌ?', W / 2, 760, 'a', { size: 90 });
      },
    },
    {
      say: '{a}Nhưng có một thứ vô hình, nặng gấp khoảng bảy lần Mặt Trời, đang trôi ngang qua. {b}Lực hấp dẫn của nó bẻ cong ánh sao, như một chiếc kính lúp khổng lồ.',
      draw(k) {
        fill(k, P.space);
        lensedStars(k, W / 2, 780, 230, k.at('b', 2.5));
        bigNum(k, '7× MẶT TRỜI', W / 2, 260, 'a', { size: 100, color: P.gold });
        label(k, 'VÔ HÌNH', W / 2, 1250, 'a', { size: 60 });
      },
    },
    {
      say: '{a}Đó là hố đen lang thang đầu tiên con người từng phát hiện. {b}Và theo NASA, trong Ngân Hà có thể có khoảng một trăm triệu cái như thế.',
      sfx: [['boom', 'b', 0.2]],
      draw(k) {
        space(k, { n: 160 });
        blackHole(k, W / 2, 760, 120 * k.at('a', 1, 'back') + 1);
        bigNum(k, 'HỐ ĐEN LANG THANG', W / 2, 260, 'a', { size: 80 });
        bigNum(k, '~100 TRIỆU CÁI', W / 2, 1150, 'b', { size: 100, color: P.gold });
      },
    },
    {
      say: '{full}Xem bản đầy đủ: nếu một hố đen đi ngang Hệ Mặt Trời, trên kênh Hạt Bụi Xanh.',
      tail: 1.6,
      sfx: [['whoosh', 'full', 0.3]],
      draw(k) { shortEnd(k, 'Nếu Hố Đen Đi Ngang Hệ Mặt Trời?'); },
    },
  ],
};
