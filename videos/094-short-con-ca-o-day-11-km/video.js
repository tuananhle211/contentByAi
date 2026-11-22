// Hạt Bụi Xanh · Short 1 của tập 093 (Rãnh Mariana). Twist: "cá dẹt" của Piccard ở 10.900 m → cá không sống quá ~8.400 m → có lẽ là hải sâm.
// Fact check: Trieste 23/1/1960 (US Navy); Jamieson & Yancey 2012, Biol. Bull. (nghi vấn "cá dẹt"); cá sâu nhất 8.336 m (2022, Izu-Ogasawara, UWA/Tokyo);
// giới hạn ~8.200–8.400 m (Yancey et al. 2014, PNAS — giả thuyết). Ảnh: Trieste (US Navy, PD), cá ốc Mariana (Gerringer et al. 2017, CC BY 3.0), clip hải sâm (NOAA, CC0).
// Khung 1080×1920: nội dung trong y 150–1300. Khung đầu = thumbnail (một câu hỏi).
import { P, fill, ocean, depthGauge, bigNum, label, chip, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080;
const lerp = (a, b, p) => a + (b - a) * p;
function thumb(k) {
  fill(k, '#000');
  k.photo('trieste', 0, 520, W, 900, { zoom: [1.35, 1.35], pan: [[0.42, 0.62], [0.42, 0.62]], credit: false });
  k.ctx.fillStyle = 'rgba(6,16,26,0.9)'; k.ctx.fillRect(0, 140, W, 380);
  thumbLine(k, 'CÁ SỐNG Ở', W / 2, 250, 120);
  thumbAsk(k, 'ĐÁY 11 KM?', W / 2, 410, 120, P.gold);
}

export default {
  meta: {
    title: 'Con Cá Ở Đáy Sâu Nhất Trái Đất Có Thật Không? 🌊 #shorts',
    description: 'Năm 1960, hai người đàn ông chạm đáy rãnh Mariana, sâu gần 11 km, và kể rằng họ thấy một con cá dẹt. Nhưng các nhà khoa học ngày nay nói điều đó gần như không thể.\n\nBản đầy đủ: Rãnh Mariana: Thứ Gì Sống Ở Đáy Sâu 11 Km? trên kênh Hạt Bụi Xanh.',
    links: [['▶ Bản đầy đủ: Rãnh Mariana: Thứ Gì Sống Ở Đáy Sâu 11 Km?', '093-ranh-mariana-thu-gi-song-o-day']],
    tags: ['rãnh mariana', 'cá biển sâu', 'cá sâu nhất thế giới', 'đáy đại dương', 'biển sâu', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'ranhmariana', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32, speakNumbers: false,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    related: '093-ranh-mariana-thu-gi-song-o-day', // YouTube Studio → Video liên quan (thay cảnh cuối "xem bản đầy đủ")
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Năm 1960, hai người đàn ông chạm đáy nơi sâu nhất Trái Đất, và thấy một con cá.', draw(k) { thumb(k); } },
    {
      say: '{a}Vấn đề là: ở độ sâu ấy, không con cá nào có thể sống.',
      draw(k) {
        ocean(k, { depth: 1, snow: 60 });
        k.ctx.fillStyle = '#1D2A2A'; k.ctx.fillRect(0, 1150, W, 770);
        k.ctx.globalAlpha = 1 - 0.7 * k.at('a', 2); k.ctx.fillStyle = '#C9C3B0'; k.ctx.beginPath(); k.ctx.ellipse(W / 2, 1140, 160, 36, 0, 0, Math.PI * 2); k.ctx.fill(); k.ctx.globalAlpha = 1;
        bigNum(k, 'KHÔNG THỂ?', W / 2, 400, 'a', { size: 130, color: P.gold });
        depthGauge(k, 10900, { x: W - 70, y0: 200, y1: 1250 });
      },
    },
    {
      say: '{a}Đáy rãnh Mariana sâu gần mười một km. {b}Áp suất ở đó hơn một nghìn lần trên mặt biển, như năm mươi chiếc máy bay lớn đè lên một người.',
      draw(k) {
        ocean(k, { depth: 0.9, snow: 40 });
        bigNum(k, '~10.900 M', W / 2, 300, 'a', { size: 120, color: P.cream });
        bigNum(k, '> 1.000 LẦN', W / 2, 1200, 'b', { size: 110, color: P.gold });
        depthGauge(k, lerp(0, 10900, k.at('a', 3)), { x: W - 70, y0: 420, y1: 1080 });
      },
    },
    {
      say: '{a}Để chống lại áp suất, tế bào cá phải tích một chất bảo vệ, càng sâu càng cần nhiều. {b}Các nhà khoa học cho rằng đến khoảng tám nghìn bốn trăm mét, lượng chất ấy nhiều đến mức nước tràn vào tế bào, và con cá không thể sống.',
      draw(k) {
        const g = k.ctx.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#03222E'); g.addColorStop(1, '#000'); k.ctx.fillStyle = g; k.ctx.fillRect(0, 0, W, 1920);
        k.ctx.fillStyle = 'rgba(229,56,59,0.2)'; k.ctx.fillRect(0, 880, W, 1040);
        k.ctx.setLineDash([16, 12]); k.ctx.strokeStyle = P.red; k.ctx.lineWidth = 5; k.ctx.beginPath(); k.ctx.moveTo(0, 880); k.ctx.lineTo(W, 880); k.ctx.stroke(); k.ctx.setLineDash([]);
        bigNum(k, 'GIỚI HẠN ~8.400 M', W / 2, 800, 'b', { size: 84, color: P.red });
        bigNum(k, 'CHẤT BẢO VỆ TẾ BÀO', W / 2, 360, 'a', { size: 72, color: P.cream });
      },
    },
    {
      say: '{a}Con cá sâu nhất từng được quay là một con cá ốc, ở tám nghìn ba trăm ba mươi sáu mét. {b}Sâu hơn nữa, chỉ còn những sinh vật không xương sống: giáp xác, hải sâm.',
      draw(k) {
        fill(k, '#03141E');
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(32, 412, W - 64, 576);
        k.photo('ca-oc-2', 40, 420, W - 80, 560, { focus: [0.5, 0.47], zoom: [1, 1.08] });
        bigNum(k, '8.336 M', W / 2, 260, 'a', { size: 130, color: P.cream });
        bigNum(k, 'SÂU HƠN: HẢI SÂM', W / 2, 1180, 'b', { size: 84, color: P.gold });
      },
    },
    {
      say: '{a}Nên nhiều nhà khoa học tin rằng thứ họ thấy là một con hải sâm. {b}Nhưng suốt hàng chục năm, người ta vẫn kể rằng…',
      tail: 0.2,
      draw(k) {
        fill(k, '#000');
        k.clip('con-do', -420, 330, 1920, 1080, { at: 0, zoom: [1, 1.05] });
        bigNum(k, 'HẢI SÂM?', W / 2, 190, 'a', { size: 110, color: P.gold });
        chip(k, 'NOAA', 40, 300, { bg: 'rgba(245,241,230,0.85)', size: 22 });
      },
    },
  ],
};
