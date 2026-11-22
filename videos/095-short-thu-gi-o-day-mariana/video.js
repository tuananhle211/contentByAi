// Hạt Bụi Xanh · Short 2 của tập 093 (Rãnh Mariana). Twist: sinh vật trông như người ngoài hành tinh → thứ lạ nhất ở đáy lại là túi ni lông.
// Fact check: sứa quay ở rãnh Mariana, NOAA Okeanos Explorer EX1605 Dive 04, 24/4/2016, ~3.700 m (PD); túi ni lông ở 10.898 m, quay năm 1998
// (Chiba et al. 2018, Marine Policy); chất ô nhiễm PCB trong giáp xác Mariana (Jamieson et al. 2017, Nature Ecology & Evolution).
// Khung 1080×1920: nội dung trong y 150–1300. Khung đầu = thumbnail (một câu hỏi).
import { P, fill, ocean, depthGauge, bigNum, label, chip, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080;
const lerp = (a, b, p) => a + (b - a) * p;
function thumb(k) {
  fill(k, '#000');
  k.photo('sua-anh', 0, 480, W, 960, { zoom: [1.25, 1.25], focus: [0.3, 0.38], credit: false });
  k.ctx.fillStyle = 'rgba(6,16,26,0.9)'; k.ctx.fillRect(0, 140, W, 360);
  thumbLine(k, 'SINH VẬT NÀY', W / 2, 250, 110);
  thumbAsk(k, 'SỐNG Ở ĐÂU?', W / 2, 400, 110, P.gold);
}

export default {
  meta: {
    title: 'Thứ Kỳ Lạ Nhất Ở Rãnh Mariana Không Phải Sinh Vật 🌊 #shorts',
    description: 'Con sứa trông như người ngoài hành tinh này được quay ở rãnh Mariana, sâu 3.700 m. Nhưng thứ kỳ lạ nhất con người từng tìm thấy ở đáy rãnh lại không phải sinh vật nào cả.\n\nBản đầy đủ: Rãnh Mariana: Thứ Gì Sống Ở Đáy Sâu 11 Km? trên kênh Hạt Bụi Xanh.',
    links: [['▶ Bản đầy đủ: Rãnh Mariana: Thứ Gì Sống Ở Đáy Sâu 11 Km?', '093-ranh-mariana-thu-gi-song-o-day']],
    tags: ['rãnh mariana', 'sinh vật biển sâu', 'sứa biển sâu', 'rác nhựa đại dương', 'biển sâu', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'ranhmariana', 'biensau', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32, speakNumbers: false,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    related: '093-ranh-mariana-thu-gi-song-o-day', // YouTube Studio → Video liên quan (thay cảnh cuối "xem bản đầy đủ")
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Sinh vật này trông như đến từ hành tinh khác.', draw(k) { thumb(k); } },
    {
      say: '{a}Nhưng thứ kỳ lạ nhất ở nơi nó sống lại không phải là nó.',
      draw(k) {
        fill(k, '#000');
        k.clip('sua-mariana', -150, 60, 2133, 1200, { at: 0, zoom: [1, 1.05] });
        bigNum(k, 'KHÔNG PHẢI NÓ', W / 2, 1220, 'a', { size: 100, color: P.cream });
        chip(k, 'NOAA · 2016', 40, 110, { bg: 'rgba(245,241,230,0.85)', size: 22 });
      },
    },
    {
      say: '{a}Con sứa này được robot lặn quay năm 2016 ở rãnh Mariana, độ sâu ba nghìn bảy trăm mét. {b}Ở đó không có ánh nắng. Nó trôi lững lờ, xoè xúc tu chờ con mồi trong bóng tối.',
      draw(k) {
        fill(k, '#000');
        k.clip('sua-mariana', -150, 300, 2133, 1200, { at: -4, zoom: [1.05, 1.1] });
        bigNum(k, '~3.700 M', W / 2, 170, 'a', { size: 110, color: P.cream });
      },
    },
    {
      say: '{a}Còn ở tận đáy rãnh, gần mười một km, một robot lặn quay được thứ này năm 1998: {b}một chiếc túi ni lông dùng một lần.',
      sfx: [['boom', 'b', 0.2]],
      draw(k) {
        ocean(k, { depth: 1, snow: 50 });
        k.ctx.fillStyle = '#1D2A2A'; k.ctx.fillRect(0, 1150, W, 770);
        const p = k.at('b', 3, 'out');
        k.ctx.save(); k.ctx.translate(W / 2, 300 + 780 * p); k.ctx.rotate(0.2 * Math.sin(k.gt)); k.ctx.globalAlpha = 0.9 * k.at('b', 0.5);
        k.ctx.fillStyle = '#E8EEF2'; k.ctx.beginPath(); k.ctx.moveTo(-130, -170); k.ctx.lineTo(-60, -170); k.ctx.lineTo(-45, -110); k.ctx.lineTo(45, -110); k.ctx.lineTo(60, -170); k.ctx.lineTo(130, -170); k.ctx.lineTo(160, 140); k.ctx.lineTo(-160, 140); k.ctx.closePath(); k.ctx.fill(); k.ctx.restore();
        depthGauge(k, lerp(3700, 10898, k.at('a', 3)), { x: W - 70, y0: 200, y1: 1250 });
        bigNum(k, 'TÚI NI LÔNG', W / 2, 300, 'b', { size: 100, color: P.cream });
        chip(k, 'HÌNH MINH HOẠ', 40, 200, { bg: 'rgba(245,241,230,0.85)', size: 22 });
      },
    },
    {
      say: '{a}Những con giáp xác nhỏ ở đáy rãnh mang trong cơ thể chất ô nhiễm công nghiệp, cao hơn nhiều lần so với cua ở những vùng ô nhiễm nặng trên đất liền. {b}Nhựa và hoá chất trôi theo dòng biển, rồi chìm dần xuống nơi sâu nhất.',
      draw(k) {
        fill(k, '#01070C');
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(52, 432, W - 104, 736);
        k.photo('giap-xac-day', 60, 440, W - 120, 720, { zoom: [1, 1.08] });
        bigNum(k, 'CHẤT Ô NHIỄM', W / 2, 260, 'a', { size: 100, color: P.red });
        bigNum(k, 'CHÌM XUỐNG ĐÁY', W / 2, 1260, 'b', { size: 84, color: P.gold });
      },
    },
    {
      say: '{a}Rác của chúng ta tới đó trước cả hầu hết con người. {b}Vậy mà giữa bóng tối ấy, vẫn có…',
      tail: 0.2,
      draw(k) {
        fill(k, '#000');
        k.clip('sua-mariana', -150, 60, 2133, 1200, { at: -2, zoom: [1, 1.04] });
        bigNum(k, 'TRƯỚC CẢ CON NGƯỜI', W / 2, 1220, 'a', { size: 80, color: P.gold });
      },
    },
  ],
};
