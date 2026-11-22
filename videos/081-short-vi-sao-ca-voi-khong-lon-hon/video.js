// Hạt Bụi Xanh · Short thứ 2, cắt từ chương 5 tập 079 (Cá Voi Xanh Lớn Đến Mức Nào?).
// Khung "Vì sao…?" + cú lật (bài học Shorts kênh Long Story Drawn: câu hỏi Why + twist thắng câu trần thuật).
// Fact check: NOAA/Guinness: dài gần 30 m, con nặng nhất ~190 t. Goldbogen et al., Science 2019: cá voi lọc mồi càng lớn
//   càng kiếm ăn hiệu quả; kích thước bị giới hạn bởi lượng mồi (krill) chỉ dồi dào ở vùng biển lạnh vài tháng mỗi năm.
// Khung 1080×1920: nội dung trong y 150–1300 (phụ đề ở y≈1420). Câu đầu = chữ to hiện ngay khung đầu (p: 1).
import { P, fill, space, ocean, earth, whale, human, krill, krillOne, balance, months, scaleBar, bigNum, label, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080;
// Thumbnail = khung đầu: chủ thể cá voi (≥ 40% khung) + chi tiết bóng người tí hon (quy mô) + câu hỏi có chủ thể.
function thumb(k) {
  ocean(k, { depth: 0.45 });
  // cá voi nằm chéo cho to hết khung đứng (≥ 40% khung), người tí hon cạnh bụng để thấy quy mô (30 m vs 1,7 m)
  k.group({ x: W / 2 - 70, y: 900, r: -0.62 }, () => whale(k, 0, 0, 1260, { swim: 0.3 }));
  human(k, 260, 1280, 1260 / 30 * 1.7, { color: P.gold, stroke: false });
  k.text('← người', 300, 1250, { size: 38, font: 'title', color: P.gold, align: 'left' });
  thumbLine(k, 'CÁ VOI XANH 30 MÉT', W / 2, 250, 88);
  thumbAsk(k, 'SAO KHÔNG LỚN HƠN?', W / 2, 395, 84, P.gold);
}
const lerp = (a, b, p) => a + (b - a) * p;

export default {
  meta: {
    title: 'Vì Sao Không Có Con Vật Nào Lớn Hơn Cá Voi Xanh? 🐋 #shorts',
    description: 'Cá voi xanh dài gần 30 mét, nặng tới 190 tấn — vậy vì sao nó không lớn thêm nữa? Câu trả lời nằm ở một con vật dài chỉ 5 phân (Goldbogen et al., Science 2019).\n\nBản đầy đủ: Cá Voi Xanh Lớn Đến Mức Nào? trên kênh Hạt Bụi Xanh.',
    links: [['▶ Bản đầy đủ: Cá Voi Xanh Lớn Đến Mức Nào?', '079-ca-voi-xanh-lon-den-muc-nao']],
    tags: ['cá voi xanh', 'vì sao cá voi xanh lớn', 'động vật lớn nhất thế giới', 'krill', 'khoa học', 'shorts', 'hạt bụi xanh'],
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
      say: '{a}Vì sao không có con vật nào lớn hơn cá voi xanh?',
      draw(k) { thumb(k); },
    },
    {
      say: '{a}Nó dài gần ba mươi mét, nặng tới một trăm chín mươi tấn. {b}Lớn hơn mọi con khủng long từng tồn tại.',
      sfx: [['whoosh', 'a', 0.25]],
      draw(k) {
        ocean(k, { depth: 0.35 });
        const s = 980 / 30;
        whale(k, (W - 980) / 2 + 490 + 900 * (1 - k.at('a', 1.3, 'out')), 700, 980, { swim: 0.5 });
        human(k, 60, 1010, 1.7 * s, { color: P.gold, stroke: false });
        scaleBar(k, 50, 1030, 1080, '≈ 30 MÉT · 190 TẤN', { p: k.at('a', 1.2) });
        label(k, 'lớn hơn mọi khủng long', W / 2, 330, 'b', { size: 54, color: P.gold });
      },
    },
    {
      say: '{a}Dưới biển, nước nâng đỡ cơ thể nó. {b}Vậy tại sao nó không lớn thêm nữa? Bốn mươi mét? Năm mươi?',
      draw(k) {
        ocean(k, { depth: 0.5 });
        const g = k.at(k.cue('b', 1.6), 2.6, 'inOut'), len = lerp(30, 50, g), s = 980 / 52;
        whale(k, 50 + len * s / 2, 760, len * s, { sil: true, color: '#2F6F99', swim: 0 });
        for (const x of [300, 780]) k.arrow(x, 1100, x, 900, { stroke: P.gold, width: 10, p: k.at('a', 0.8), seed: x });
        scaleBar(k, 50, 50 + len * s, 1180, `${Math.round(len)} MÉT?`, { p: k.at('b', 0.6) });
        bigNum(k, '?', W / 2, 360, 'b', { size: 200, color: P.gold });
      },
    },
    {
      say: '{a}Câu trả lời không nằm ở xương. {b}Mà ở bữa ăn.',
      sfx: [['sparkle', 'b', 0.25]],
      draw(k) {
        fill(k, P.space);
        bigNum(k, 'KHÔNG PHẢI XƯƠNG', W / 2, 360, 'a', { size: 76, color: P.mute, p: k.at('a', 0.4) * (1 - 0.6 * k.at('b', 0.4)) });
        bigNum(k, 'MÀ LÀ BỮA ĂN', W / 2, 520, 'b', { size: 100, color: P.gold });
        krillOne(k, W / 2, 900, 520 * k.at('b', 1, 'out') + 1);
      },
    },
    {
      say: '{a}Nó sống nhờ krill, con vật dài chừng năm phân. {b}Mà những đàn krill dày đặc chỉ có ở vùng biển lạnh, vài tháng mỗi năm.',
      draw(k) {
        space(k, { n: 60 });
        earth(k, W / 2, 520, 250, { spin: 0.03 });
        const c = k.at('b', 1) * (0.6 + 0.4 * Math.sin(k.t * 2));
        for (const y of [300, 740]) { k.dot(W / 2, y, 60, P.orange, 0.5 * c); k.dot(W / 2, y, 100, P.orange, 0.18 * c); }
        months(k, 140, 920, 120, [0, 1, 2], k.at('b', 0.8));
        label(k, 'krill ~5 cm', W / 2, 200, 'a', { size: 52, color: P.orange });
      },
    },
    {
      say: '{a}To hơn nữa, nó sẽ cần nhiều krill hơn mức đại dương có thể cung cấp. {b}Gã khổng lồ lớn nhất lịch sử, bị giới hạn bởi một con vật dài năm phân.',
      sfx: [['boom', 'b', 0.25]],
      draw(k) {
        fill(k, P.space);
        const pans = balance(k, W / 2, 1150, 900, 0);
        whale(k, pans.left[0], pans.left[1] - 60, 420, { swim: 0 });
        krillOne(k, pans.right[0], pans.right[1] - 26, 100);
        bigNum(k, 'GIỚI HẠN', W / 2, 260, 'b', { size: 120, color: P.gold });
        bigNum(k, '= BỮA ĂN', W / 2, 400, 'b', { size: 100, color: P.cream });
        k.text('Goldbogen et al., Science 2019', W / 2, 1260, { size: 30, color: P.mute, fx: 'fade', p: k.at('a', 0.6) });
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
        const bob = Math.sin(k.t * 6) * 14;
        k.arrow(W / 2, 1060 + bob, W / 2, 1200 + bob, { p: k.at(k.cue('full', 1.5), 0.5), width: 10, head: 40, stroke: P.gold, seed: 802 });
      },
    },
  ],
};
