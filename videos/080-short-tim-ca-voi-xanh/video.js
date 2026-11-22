// Hạt Bụi Xanh · Short đi kèm tập 079 (Cá Voi Xanh Lớn Đến Mức Nào?). Kịch bản duyệt 11/11/2026 (079/kich-ban.md).
// Fact check: CBC/ROM tim >180 kg; Goldbogen et al. PNAS 2019: nhịp khi lặn 4–8, thấp nhất 2 nhịp/phút; NOAA: dài tới ~30–33 m.
// Khung 1080×1920: nội dung trong y 150–1300 (phụ đề ở y≈1420). Câu đầu = chữ to hiện ngay khung đầu (p: 1).
import { P, fill, ocean, whale, human, heart, eCar, ecg, bigNum, label, scaleBar, chip, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080;
// Thumbnail = khung đầu (skill `thumbnail`): chủ thể tim cá voi + chi tiết điện tim + câu hỏi có chủ thể.
function thumb(k) {
  fill(k, '#140C12');
  const g = k.ctx.createRadialGradient(W / 2, 820, 50, W / 2, 820, 620); g.addColorStop(0, 'rgba(229,56,59,0.35)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  k.ctx.fillStyle = g; k.ctx.fillRect(0, 0, W, 1920);
  heart(k, W / 2, 860, 600, { beat: 0.5 + 0.5 * Math.sin((k.t ?? 0) * 3) });
  // điện tim một nhịp duy nhất giữa đường phẳng dài (gợi "đập rất chậm")
  const { ctx } = k; ctx.beginPath(); ctx.moveTo(90, 1240); ctx.lineTo(500, 1240); ctx.lineTo(520, 1260); ctx.lineTo(545, 1150); ctx.lineTo(570, 1290); ctx.lineTo(590, 1240); ctx.lineTo(990, 1240);
  ctx.strokeStyle = '#5BE38A'; ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.stroke();
  thumbLine(k, 'TIM CÁ VOI 180 KG', W / 2, 250, 92);
  thumbAsk(k, 'ĐẬP MẤY LẦN 1 PHÚT?', W / 2, 395, 80, P.gold);
}

export default {
  meta: {
    title: 'Trái Tim 180 Ký Chỉ Đập 2 Lần Mỗi Phút 🐋 #shorts',
    description: 'Trái tim của cá voi xanh nặng hơn 180 ký — và khi nó lặn sâu, có lúc chỉ đập 2 lần mỗi phút (Goldbogen et al., PNAS 2019).\n\nBản đầy đủ: Cá Voi Xanh Lớn Đến Mức Nào? trên kênh Hạt Bụi Xanh.',
    links: [['▶ Bản đầy đủ: Cá Voi Xanh Lớn Đến Mức Nào?', '079-ca-voi-xanh-lon-den-muc-nao']],
    tags: ['cá voi xanh', 'tim cá voi xanh', 'nhịp tim cá voi', 'động vật lớn nhất', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'cavoixanh', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    images: { poster: 'assets/poster.jpg' },
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Trái tim này nặng một trăm tám mươi ký.',
      draw(k) { thumb(k); },
    },
    {
      say: '{a}Nó thuộc về con vật lớn nhất từng sống trên Trái Đất: {b}cá voi xanh. Dài gần ba mươi mét.',
      sfx: [['whoosh', 'b', 0.3]],
      draw(k) {
        ocean(k, { depth: 0.3 });
        const s = 980 / 30;
        whale(k, (W - 980) / 2 + 490 + 900 * (1 - k.at('b', 1.4, 'out')), 700, 980, { swim: 0.5 });
        human(k, 60, 1010, 1.7 * s, { color: P.gold, stroke: false });
        scaleBar(k, 50, 1030, 1080, '≈ 30 MÉT', { p: k.at('b', 1.2) });
        bigNum(k, 'CÁ VOI XANH', W / 2, 300, 'b', { size: 110 });
      },
    },
    {
      say: '{a}Năm 2019, các nhà khoa học gắn máy đo lên một con cá voi xanh đang lặn.',
      draw(k) {
        ocean(k, { depth: 0.5 });
        whale(k, W / 2, 760, 1000, { swim: 0.6 });
        const y = 760 - 1000 / 1030 * 62 + 4;
        k.dot(W / 2 + 80, y, 14, P.cream); k.dot(W / 2 + 80, y, 6, Math.sin(k.t * 6) > 0 ? P.red : '#5BE38A');
        label(k, 'STANFORD · 2019', W / 2, 300, 'a', { size: 60 });
        k.text('Goldbogen et al., PNAS 2019', W / 2, 1220, { size: 30, color: P.mute, fx: 'fade', p: k.at('a', 0.6) });
      },
    },
    {
      say: '{a}Nhưng khi nó lặn sâu, trái tim khổng lồ ấy chỉ đập… {b}hai lần mỗi phút.',
      sfx: [['click', 'b', 0.3]],
      draw(k) {
        fill(k, '#081218');
        ecg(k, 80, 760, 920, 140, k.t < k.cue('b') ? 6 : 2, { label: 'CÁ VOI XANH', speed: 200 });
        bigNum(k, '2 NHỊP', W / 2, 320, 'b', { size: 170, color: '#5BE38A', outline: '#081218' });
        bigNum(k, 'MỖI PHÚT', W / 2, 480, 'b', { size: 90, color: P.cream, outline: '#081218' });
      },
    },
    {
      say: '{a}Còn tim bạn, trong lúc xem video này, đã đập hàng chục lần.',
      draw(k) {
        fill(k, '#081218');
        ecg(k, 80, 520, 920, 110, 2, { label: 'CÁ VOI XANH', speed: 200 });
        ecg(k, 80, 960, 920, 110, 72, { label: 'BẠN', color: '#FF9B5E', speed: 200, p: k.at('a', 0.5) });
      },
    },
    {
      say: '{full}Xem bản đầy đủ: cá voi xanh lớn đến mức nào, trên kênh Hạt Bụi Xanh.',
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
        label(k, 'Cá Voi Xanh Lớn Đến Mức Nào?', W / 2, 330 + h + 90, k.cue('full', 0.6), { size: 52 });
        chip(k, 'HẠT BỤI XANH', W / 2 - 160, 330 + h + 210, { bg: P.gold, p: k.at(k.cue('full', 1.2), 0.6) });
        const bob = Math.sin(k.t * 6) * 14;
        k.arrow(W / 2, 1060 + bob, W / 2, 1200 + bob, { p: k.at(k.cue('full', 1.5), 0.5), width: 10, head: 40, stroke: P.gold, seed: 802 });
      },
    },
  ],
};
