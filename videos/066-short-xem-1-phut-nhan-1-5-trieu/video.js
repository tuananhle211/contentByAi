// Shorts kênh Nếu Bạn Là — cắt từ "Nếu Bạn Kéo Cả Họ Vào App AI Kiếm Tiền… (Phần 1)" (064): đường đi của đồng tiền.
// Dữ kiện như tập 064 (VTV 30/10/2026, Dân trí 26/10/2026): gói 2,9 tr; tiền vào ví sau 2–4 giờ; ngưỡng rút 200 nghìn,
// giai đoạn đầu trả thật; Matrix 84,9 tr ~900 nghìn/ngày; khi sập lệnh rút "đang xử lý", nhóm Zalo giải tán. App "Zena AI" là tên hư cấu.
import { fullVideoScene } from '/engine/templates.js';
import { soDo } from '/channel/drama.js';
import { G, TOAN, spk, pop, phone, zena, hud, hospitalGate, pawnShop, nightRoad, moto, zaloGroup, vert, vbg, vcap, cash, tRays, tSticker, tBig, tCircle, tArrow } from '/channel/neu-ban-la.js';

const S = 520;

export default {
  meta: {
    title: 'Xem video 1 phút, nhận 1,5 triệu mỗi ngày? 🤖 #shorts',
    description: 'Xem video một phút, ví cộng tiền, rút được thật… Chú Toàn chạy xe ôm đã nạp từ 2,9 triệu lên 84,9 triệu, cầm cả sổ đỏ. Cho tới một đêm, nút rút tiền chỉ còn hai chữ: đang xử lý. Truyện hư cấu dựa trên các vụ app "AI bán hàng" đa cấp được báo chí đưa tin năm 2026. Xem bản đầy đủ trên kênh Nếu Bạn Là!',
    links: [['▶ Bản đầy đủ', '064-neu-ban-keo-ca-ho-vao-app-ai-p1']],
    tags: ['app AI kiếm tiền', 'xem video kiếm tiền', 'lừa đảo đa cấp', 'app lừa đảo', 'shorts', 'nếu bạn là'],
    hashtags: ['shorts', 'luadao', 'appkiemtien'],
    format: 'short', captions: true,
    style: 'clean', tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1.1,
    lead: 0.15, tail: 0.3, pause: 0.12,
    transition: 'cut', sfxTransitions: false, camera: 0.03,
    images: { poster: 'assets/poster.jpg' },
    sfxVolume: 0.6,
    paper: '#14161d', privacy: 'private',
  },
  // Thumbnail dọc: chú Toàn sung sướng ôm điện thoại khổng lồ giữa mưa tiền — nhưng màn hình báo "Đang xử lý…".
  thumbnail(k) {
    tRays(k, '#ffcc1a', '#ffe066', 540, 900);
    for (let i = 0; i < 18; i++) cash(k, 60 + ((i * 263) % 960), 120 + ((i * 337) % 1500), 1, 1.1, 1);
    tSticker(k, () => phone(k, 690, 860, 1.7, { r: 0.08, screen: zena('withdraw', { amt: '1.500.000đ' }) }), 16);
    tCircle(k, 690, 1050, 250, 100);
    tSticker(k, () => k.char(290, 1880, 900, { ...TOAN, face: 'laugh', blush: true, pose: { l: [40, -110], r: [70, -60] }, shadow: false }), 16);
    tArrow(k, 1000, 1420, 880, 1140);
    tBig(k, 'XEM VIDEO 1 PHÚT', 540, 210, 104, '#ffffff', { r: -0.04 });
    tBig(k, 'NHẬN 1,5 TRIỆU?!', 540, 360, 112, '#ffe066', { box: '#ff2a2a', r: -0.04 });
  },
  scenes: [
    {
      say: 'Xem video một phút, mỗi ngày nhận một triệu rưỡi. {q}Bạn có nạp hai triệu chín không?',
      sfx: [['ding', 0.2, 0.5], ['boing', 'q', 0.5]],
      draw(k) {
        vbg(k, { hud: { nap: [0, 2.9, 'q', 0.8], vi: 0, rut: 0 } });
        vert(k, 960, () => { hospitalGate(k); k.char(560, G, S * 1.1, { ...TOAN, face: k.t > k.cue('q') ? 'shock' : 'happy', pose: 'hold' }); });
        phone(k, 760, 860, 1.05, { r: 0.08, screen: zena('live') });
        vcap(k, '1 PHÚT = 1,5 TRIỆU?', 0.3);
      },
    },
    {
      say: 'Chú Toàn chạy xe ôm thì nạp. {ting}Bốn tiếng sau, ví báo cộng ba mươi nghìn. {rut}Một tuần sau, rút hai trăm nghìn. Tiền về thật. {pho}Mua được bát phở thật.',
      sfx: [['ding', 'ting', 0.6], ['cash', 'rut', 0.6], ['tada', 'pho', 0.4]],
      draw(k) {
        vbg(k, { hud: { nap: 2.9, vi: [0, k.t > k.cue('rut') ? 0 : 0.03, 'ting', 0.6], rut: [0, 0.2, 'rut', 0.8] } });
        vert(k, 900, () => { hospitalGate(k); moto(k, 760, G, 1.3, { color: '#3d7fc1' }); k.char(740, G - 90, S, { ...TOAN, face: k.t > k.cue('rut') ? 'laugh' : 'happy', pose: k.t > k.cue('pho') ? 'cheer' : 'hold', shadow: false }); });
        phone(k, 780, 820, 0.9, { r: -0.06, screen: k.t > k.cue('rut') ? (kk, w, h) => { kk.ctx.fillStyle = '#fff'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.text('+200.000 VND', 0, -40, { size: 40, font: 'title', color: '#3fb86a' }); kk.text('ND: ZENA AI RUT TIEN', 0, 20, { size: 22, color: '#555' }); } : zena('wallet', { bal: '30.000đ', lines: ['+ Doanh thu livestream'] }) });
        vcap(k, k.t > k.cue('rut') ? 'TIỀN VỀ THẬT!' : '+30.000đ', k.t > k.cue('rut') ? 'rut' : 'ting', { color: '#7fe0a8' });
      },
    },
    {
      say: 'Thế là chú nạp tiếp tám mươi tư triệu chín. {pawn}Tiền tiết kiệm của vợ, cộng tiền cầm sổ đỏ. {day}Ngày nào ví cũng cộng chín trăm nghìn, rút lần nào cũng về.',
      sfx: [['cash', 0.3, 0.5], ['bonk', 'pawn', 0.5], ['cash', 'day', 0.4]],
      draw(k) {
        vbg(k, { hud: { nap: [2.9, 87.8, 0.3, 1], vi: [0.2, 4.5, 'day', 2], rut: [0.2, 12, 'day', 2] } });
        vert(k, 900, () => { pawnShop(k); k.ctx.fillStyle = '#6e4f3a'; k.ctx.fillRect(300, 640, 1320, 290); k.char(900, G, S * 1.1, { ...TOAN, face: k.t > k.cue('day') ? 'laugh' : 'blank', pose: 'present' }); soDo(k, 1150, 600, 0.9 * pop(k, 'pawn'), -0.1); });
        vcap(k, '84,9 TRIỆU + SỔ ĐỎ', 0.3, { color: '#ff8a7a' });
      },
    },
    {
      say: 'Cho tới một đêm, chú bấm rút một triệu rưỡi. {st}Trạng thái: đang xử lý. {grp}Bốn mươi tám giờ sau, nhóm Zalo ba nghìn người, {gone}giải tán.',
      sfx: [['click', 0.4, 0.5], ['slideDown', 'st', 0.5], ['ding', 'grp', 0.4], ['boom', 'gone', 0.6]],
      draw(k) {
        vbg(k, { hud: { nap: 87.8, vi: 286, rut: 31 } });
        if (k.t < k.cue('grp')) {
          vert(k, 900, () => { nightRoad(k); moto(k, 700, G, 1.3, { scooter: true, color: '#f4efe6', bow: true }); k.char(680, G - 100, S, { ...TOAN, hat: null, color: '#1b2338', tie: '#f2c230', face: k.t > k.cue('st') ? 'blank' : 'happy', pose: 'hold', shadow: false }); });
          phone(k, 760, 820, 1.0, { r: 0.06, screen: zena('withdraw', { amt: '1.500.000đ' }) });
          vcap(k, 'ĐANG XỬ LÝ…', 'st', { color: '#ff8a7a' });
          return;
        }
        zaloGroup(k, 140, 340, 800, 900, { title: 'AI ĐỔI ĐỜI 🚀🚀', members: '0 thành viên', banner: 'Trưởng nhóm đã giải tán nhóm', bannerCue: 'gone', msgs: [] });
        vcap(k, 'GIẢI TÁN!', 'gone', { color: '#ff6b5a', size: 110 });
      },
    },
    fullVideoScene({
      say: '{full}Mà chú Toàn còn kéo cả họ, cả mẹ vợ vào nạp nữa. Xem bản đầy đủ trên kênh Nếu Bạn Là nhé.',
      image: 'poster',
      title: 'Nếu Bạn Kéo Cả Họ Vào App AI Kiếm Tiền… (Phần 1)',
      channel: 'Nếu Bạn Là',
      tail: 1.2,
    }),
  ],
};
