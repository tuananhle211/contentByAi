// Shorts kênh Nếu Bạn Là — cắt từ "Tầng 4 (Phần 2)" (073): "Linda" là gã râu quai nón. Concept: #1* #13 #9.
// Truyện hư cấu dựa trên tin Thanh Niên 04/11/2026 (giả phụ nữ trẻ đẹp đầu tư, yêu đương rồi dụ nạp sàn ngoại hối giả).
import { fullVideoScene } from '/engine/templates.js';
import { G, TU, RAU, LINDA, KHAI, spk, phone, sunCurtain, scamRoom, ringCorner, bikeRepair, loveChat, vert, vbg, vcap, tRays, tSticker, tBig, tArrow } from '/channel/neu-ban-la.js';

const S = 520;
const lindaShot = (k, w, h) => { k.ctx.fillStyle = '#e9e4dc'; k.ctx.fillRect(-w / 2, -h / 2, w, h); sunCurtain(k, -w / 2, -h / 2, w * 0.45, h); k.char(w * 0.1, h / 2 + 10, h * 0.8, { ...LINDA, face: 'happy', pose: 'wave', shadow: false }); };
function monitor(k, x, y, w, h, fn) { k.group({ x, y }, () => { const { ctx } = k; ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(-w / 2 - 18, -h / 2 - 18, w + 36, h + 36, 14); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip(); fn(k, w, h); ctx.restore(); }); }

export default {
  meta: {
    title: 'Bạn gái Singapore của bố… là ông râu quai nón? 😳 #shorts',
    description: 'Bố 58 tuổi có bạn gái Singapore tên Linda, sáng nào cũng hỏi "anh ăn cơm chưa". Rồi một đêm, bạn hé cửa phòng 404 của một khách sạn. Truyện hư cấu dựa trên các vụ lò lừa đảo giả gái xinh đầu tư được báo chí đưa tin tháng 11/2026. Xem bản đầy đủ trên kênh Nếu Bạn Là!',
    links: [['▶ Bản đầy đủ', '073-neu-ban-la-le-tan-khach-san-tang-4-p2']],
    tags: ['lừa tình qua mạng', 'bạn gái singapore', 'lừa đảo đầu tư', 'lò lừa đảo', 'shorts', 'nếu bạn là'],
    hashtags: ['shorts', 'luatinh', 'canhgiac'],
    format: 'short', captions: true,
    style: 'clean', tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1.1,
    lead: 0.15, tail: 0.3, pause: 0.12,
    transition: 'cut', sfxTransitions: false, camera: 0.03, sfxVolume: 0.6,
    images: { poster: 'assets/poster.jpg' },
    paper: '#14161d', privacy: 'private',
  },
  thumbnail(k) {
    tRays(k, '#c0397a', '#de5a96', 540, 1100);
    tSticker(k, () => phone(k, 300, 900, 0.95, { r: -0.1, screen: lindaShot }), 14);
    tSticker(k, () => k.char(700, 2000, 1250, { ...RAU, face: 'happy', pose: 'wave', flush: 0.6, shadow: false }), 16);
    tArrow(k, 380, 1200, 560, 1320);
    tBig(k, 'BẠN GÁI CỦA BỐ', 540, 200, 100, '#ffffff', { r: -0.04 });
    tBig(k, 'LÀ…', 540, 340, 110, '#ffffff', { r: -0.04 });
    tBig(k, 'ÔNG RÂU NÀY?!', 540, 490, 108, '#ffe066', { box: '#14161d', r: -0.04 });
  },
  scenes: [
    {
      say: 'Bố bạn năm mươi tám tuổi, có bạn gái người Singapore tên Linda. {pic}Tóc dài, váy trắng, sáng nào cũng hỏi: anh ăn cơm chưa? {q}Linda thật ra là ai?',
      sfx: [['ding', 0.2, 0.4], ['sparkle', 'pic', 0.4], ['boing', 'q', 0.4]],
      draw(k) {
        vbg(k);
        vert(k, 960, () => { bikeRepair(k); k.char(760, G, S, { ...TU, face: 'happy', pose: 'hold', flush: 0.5 }); });
        phone(k, 780, 700, 0.85, { r: 0.08, p: k.at('pic', 0.4), screen: lindaShot });
        vcap(k, 'LINDA LÀ AI?', 'q', { color: '#fff' });
      },
    },
    {
      say: '{door}Hai giờ sáng, bạn hé cửa một phòng khách sạn bị cấm lên. {who}Người đang gõ: anh yêu ơi, em nhớ anh, là một gã râu quai nón, to như con gấu.',
      sfx: [['scratch', 'door', 0.4], ['boom', 'who', 0.6]],
      draw(k) {
        vbg(k);
        monitor(k, 540, 560, 760, 420, loveChat('Linda ❤️ Tư Xe Đạp', [{ text: 'Anh ăn cơm chưa? 🥰' }, { text: 'Anh yêu ơi, em nhớ anh', cue: 'who' }], { size: 30, msgSize: 30 }));
        k.char(540, 1420, S * 1.3, { ...RAU, face: 'happy', pose: { l: [60, -40], r: [60, -40] }, p: k.at('who', 0.4, 'back'), shadow: false });
        vcap(k, 'LINDA = ÔNG NÀY?!', 'who', { color: '#ff8a7a' });
      },
    },
    {
      say: '{light}Còn cô gái váy trắng? Người mẫu thuê theo giờ, ngồi trước đèn vòng, đọc thoại dán cạnh camera. {roles}Sáng là Linda. Chiều là anh Kevin kỹ sư dầu khí. Tối là bà góa giàu ở Úc.',
      sfx: [['sparkle', 'light', 0.5], ['ding', 'roles', 0.3], ['ding', ['roles', 1.2], 0.3], ['ding', ['roles', 3], 0.3]],
      draw(k) {
        vbg(k);
        vert(k, 1180, () => { scamRoom(k); ringCorner(k, 1180, G - 20, 1.05); k.char(1180, G, S * 1.05, { ...LINDA, face: 'happy', pose: 'wave', talk: k.talk() * 0.6 }); });
        [['☀ LINDA 🇸🇬', 0], ['🌤 KEVIN, KỸ SƯ', 1.2], ['🌙 BÀ GÓA Ở ÚC', 3]].forEach(([t, d], i) => k.text(t, 540, 1540 + i * 90, { size: 58, font: 'title', color: '#fff', fx: 'pop', p: k.at(k.cue('roles', d), 0.4), outline: '#1b1b24', outlineWidth: 10 }));
      },
    },
    {
      say: '{m1}Rồi Linda nhắn: anh nạp thêm năm mươi triệu, em bay sang thăm anh. {m2}Bố trả lời: để anh bán ruộng. {q}Nếu là bạn, bạn sẽ làm gì?',
      sfx: [['ding', 'm1', 0.4], ['ding', 'm2', 0.5], ['boing', 'q', 0.4]],
      draw(k) {
        vbg(k);
        phone(k, 540, 820, 1.4, { r: 0.03, screen: loveChat('Linda ❤️ Tư Xe Đạp', [{ text: 'Nạp thêm 50 triệu nha anh 💎', cue: 'm1' }, { text: 'Em bay sang thăm anh ✈️', cue: ['m1', 1.2] }, { text: 'Để anh bán ruộng.', me: true, cue: 'm2' }], { msgSize: 22 }) });
        vcap(k, k.t > k.cue('q') ? 'BẠN SẼ LÀM GÌ?' : '"ĐỂ ANH BÁN RUỘNG"', k.t > k.cue('q') ? 'q' : 'm2', { color: '#f2c230' });
      },
    },
    fullVideoScene({
      say: '{full}Và người đã mua cái SIM cho Linda, lại chính là bạn. Xem bản đầy đủ trên kênh Nếu Bạn Là nhé.',
      image: 'poster',
      title: 'Nếu Bạn Là Lễ Tân Khách Sạn… Tầng 4 (Phần 2)',
      channel: 'Nếu Bạn Là',
      tail: 1.2,
    }),
  ],
};
