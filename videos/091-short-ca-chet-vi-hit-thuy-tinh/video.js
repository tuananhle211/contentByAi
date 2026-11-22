// Hạt Bụi Xanh · Short 1 của tập 090 (khủng long). Twist: cá chết vì hít thuỷ tinh → thuỷ tinh từ tiểu hành tinh cách 3.000 km.
// Fact check: Tanis, Bắc Dakota: hạt thuỷ tinh (spherule) trong mang cá hoá thạch (DePalma et al. 2019, PNAS; During et al. 2022, Nature),
// rơi xuống ~13–20 phút sau va chạm; Chicxulub cách ~3.000 km; ảnh NASA SRTM PIA03379; ranh giới K-Pg Colorado (Jeffrey Beall, CC BY 4.0).
// Khung 1080×1920: nội dung trong y 150–1300. Khung đầu = thumbnail (một câu hỏi).
import { P, fill, space, earth, cretaceous, ejectaRain, fishFossil, bigNum, label, chip, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080;
function thumb(k) {
  fill(k, '#C9B58E');
  for (let i = 0; i < 50; i++) k.dot(k.rand(i + 900) * W, 500 + k.rand(i + 960) * 900, 8 + 22 * k.rand(i + 990), '#B49A70', 0.5);
  const g = k.ctx.createRadialGradient(640, 860, 20, 640, 860, 260); g.addColorStop(0, 'rgba(255,211,78,0.55)'); g.addColorStop(1, 'rgba(255,211,78,0)');
  k.ctx.fillStyle = g; k.ctx.fillRect(300, 560, 700, 600);
  fishFossil(k, W / 2, 860, 980, { beads: 1 });
  k.ctx.fillStyle = 'rgba(6,16,26,0.85)'; k.ctx.fillRect(0, 140, W, 360);
  thumbLine(k, 'CÁ CHẾT VÌ', W / 2, 250, 110);
  thumbAsk(k, 'HÍT THUỶ TINH?', W / 2, 400, 100, P.gold);
}
// Ảnh hố Chicxulub 1920×1220, vành hố: tâm ảnh (560, 240), r ≈ 340 (đo trên ảnh, xem kich-ban tập 090).
function crater(k, z, fx, fy, arc) {
  k.group({ x: W / 2, y: 760, s: z }, () => {
    k.photo('ho-chicxulub', -fx, -70 - fy, 1920, 1220, { zoom: [1, 1] });
    if (arc > 0) { k.ctx.strokeStyle = '#E5383B'; k.ctx.lineWidth = 8 / z; k.ctx.setLineDash([18 / z, 12 / z]); k.ctx.beginPath(); k.ctx.arc(560 - fx, 170 - fy, 340, 0.1, 0.1 + 2.4 * arc); k.ctx.stroke(); k.ctx.setLineDash([]); }
  });
}

export default {
  meta: {
    title: 'Những Con Cá Chết Vì Hít Phải Thuỷ Tinh 🦖 #shorts',
    description: '66 triệu năm trước, những con cá ở Bắc Mỹ chết khi đang thở, mang chúng đầy những hạt thuỷ tinh nhỏ li ti. Thứ thuỷ tinh ấy rơi từ trên trời xuống, từ một nơi cách đó 3.000 km.\n\nBản đầy đủ: 24 Giờ Cuối Cùng Của Loài Khủng Long trên kênh Hạt Bụi Xanh.',
    links: [['▶ Bản đầy đủ: 24 Giờ Cuối Cùng Của Loài Khủng Long', '090-24-gio-cuoi-cung-cua-khung-long']],
    tags: ['khủng long tuyệt chủng', 'tiểu hành tinh chicxulub', 'tanis', 'hoá thạch', 'khủng long', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'khunglong', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    related: '090-24-gio-cuoi-cung-cua-khung-long', // YouTube Studio → Video liên quan (thay cảnh cuối "xem bản đầy đủ")
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Những con cá này chết khi đang thở.', draw(k) { thumb(k); } },
    {
      say: '{a}Trong mang chúng có thuỷ tinh. {b}Và thứ thuỷ tinh ấy rơi từ trên trời xuống.',
      draw(k) {
        cretaceous(k, { sky: 'dusk', y: 1250, trees: 6 });
        ejectaRain(k, k.at('b', 1.5), { n: 70 });
        bigNum(k, 'MƯA THUỶ TINH', W / 2, 380, 'b', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Sáu mươi sáu triệu năm trước, một tiểu hành tinh rộng mười km đâm xuống vùng biển nay là Mexico, cách đó ba nghìn km. {b}Vành hố va chạm vẫn còn thấy được trên bản đồ địa hình hôm nay.',
      draw(k) {
        fill(k, '#0B1A26');
        crater(k, 1.1 + 0.5 * k.at('a', 8, 'inOut'), 640, 330, k.at('b', 2));
        chip(k, 'NASA', 40, 180, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        bigNum(k, '~3.000 KM', W / 2, 330, 'a', { size: 100, color: P.cream });
        bigNum(k, 'HỐ ~180 KM', W / 2, 1220, 'b', { size: 96, color: P.red, outline: P.cream });
      },
    },
    {
      say: '{a}Cú va chạm làm đá nóng chảy, bắn lên tận không gian. Khi rơi lại, mỗi giọt nguội thành một hạt thuỷ tinh nhỏ. {b}Chưa đầy nửa giờ sau, chúng rơi xuống bờ sông, và lọt vào mang những con cá đang thở.',
      draw(k) {
        space(k, { n: 120 });
        earth(k, W / 2, 1500, 760, { spin: 0 });
        ejectaRain(k, k.at('a', 2), { n: 80 });
        bigNum(k, '< 30 PHÚT', W / 2, 380, 'b', { size: 120, color: P.gold });
      },
    },
    {
      say: '{a}Xương cá còn cho biết thêm: chúng chết vào mùa xuân. {b}Nhờ những hoá thạch như thế, chúng ta biết được từng phút của ngày khủng long biến mất.',
      draw(k) {
        fill(k, '#0E1A2B');
        for (let i = 0; i < 9; i++) { k.ctx.strokeStyle = i % 2 ? 'rgba(201,181,142,0.9)' : 'rgba(150,130,100,0.9)'; k.ctx.lineWidth = 14; k.ctx.beginPath(); k.ctx.arc(W / 2, 760, 40 + i * 30, 0, Math.PI * 2 * k.at(k.cue('a', i * 0.1), 0.6)); k.ctx.stroke(); }
        k.ctx.strokeStyle = '#7FD38A'; k.ctx.lineWidth = 16; k.ctx.beginPath(); k.ctx.arc(W / 2, 760, 310, -0.6, -0.6 + 1.2 * k.at('a', 1.5)); k.ctx.stroke();
        bigNum(k, 'MÙA XUÂN', W / 2, 300, 'a', { size: 120, color: '#7FD38A' });
      },
    },
    {
      say: '{a}Đó là ngày cuối cùng của khủng long. {b}Và những nhân chứng đầu tiên của nó là…',
      tail: 0.2,
      draw(k) {
        space(k, { n: 120 });
        earth(k, W / 2, 1500, 760, { spin: 0 });
        ejectaRain(k, 1, { n: 80 });
        bigNum(k, 'NGÀY CUỐI CỦA', W / 2, 330, 'a', { size: 96, color: P.cream });
        bigNum(k, 'KHỦNG LONG', W / 2, 450, 'a', { size: 110, color: P.gold });
      },
    },
  ],
};
