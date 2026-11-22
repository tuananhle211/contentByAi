// Shorts kênh Nếu Bạn Là — cắt từ "…Lúc App Sập (Phần 2)" (065): lừa lần hai ("luật sư thu hồi tiền").
// Thủ đoạn "lấy lại tiền bị lừa, thu phí trước, đổi sang USDT" được cơ quan công an cảnh báo nhiều lần; vụ app AI: VTV 30/10, Dân trí 26/10/2026.
import { fullVideoScene } from '/engine/templates.js';
import { G, TOAN, LINH, HO, spk, pop, phone, zena, chat, living, atmBooth, vert, vbg, vcap, tRays, tSticker, tBig, tCircle } from '/channel/neu-ban-la.js';

const S = 520;
const LS = HO('#2b2f3d', { hair: 'short', shades: true, tie: '#c0392b' });
const lsScreen = (k, w, h) => { k.ctx.fillStyle = '#1f2a44'; k.ctx.fillRect(-w / 2, -h / 2, w, h); k.text('LS. THU HỒI ⚖️', 0, -h / 2 + 50, { size: 30, font: 'title', color: '#fff' }); k.text('Lấy lại 100%', 0, -60, { size: 34, font: 'title', color: '#7fe0a8' }); k.text('Phí hồ sơ:', 0, 20, { size: 28, color: '#fff' }); k.text('2.900.000đ', 0, 80, { size: 42, font: 'title', color: '#ff5a4a' }); k.text('→ USDT', 0, 140, { size: 30, font: 'title', color: '#f2d27a' }); };

export default {
  meta: {
    title: 'Bị lừa xong… lại có "luật sư" gọi tới giúp? 😳 #shorts',
    description: 'App sập, mất sạch tiền. Ba ngày sau, một "luật sư thu hồi tài sản" gọi tới: lấy lại 100%, chỉ cần nộp phí hồ sơ 2,9 triệu đổi sang USDT. Truyện hư cấu dựa trên các vụ app "AI bán hàng" đa cấp và chiêu "lấy lại tiền bị lừa" được báo chí, công an cảnh báo năm 2026. Xem bản đầy đủ trên kênh Nếu Bạn Là!',
    links: [['▶ Bản đầy đủ', '065-neu-ban-keo-ca-ho-vao-app-ai-p2']],
    tags: ['lấy lại tiền bị lừa', 'lừa đảo lần 2', 'luật sư thu hồi', 'app lừa đảo', 'shorts', 'nếu bạn là'],
    hashtags: ['shorts', 'luadao', 'canhgiac'],
    format: 'short', captions: true,
    style: 'clean', tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1.1,
    lead: 0.15, tail: 0.3, pause: 0.12,
    transition: 'cut', sfxTransitions: false, camera: 0.03, sfxVolume: 0.6,
    images: { poster: 'assets/poster.jpg' },
    paper: '#14161d', privacy: 'private',
  },
  thumbnail(k) {
    tRays(k, '#ffcc1a', '#ffe066', 540, 900);
    tSticker(k, () => phone(k, 680, 900, 1.6, { r: 0.1, screen: lsScreen }), 14);
    tCircle(k, 690, 1010, 240, 120);
    tSticker(k, () => k.char(300, 1900, 950, { ...TOAN, hat: null, face: 'cry', tears: 1, pose: 'shrug', shadow: false }), 16);
    tBig(k, 'BỊ LỪA XONG…', 540, 200, 110, '#ffffff', { r: -0.04 });
    tBig(k, 'LẠI CÓ "LUẬT SƯ"', 540, 350, 96, '#ffffff', { r: -0.04 });
    tBig(k, 'GỌI TỚI GIÚP?!', 540, 495, 110, '#ffe066', { box: '#ff2a2a', r: -0.04 });
  },
  scenes: [
    {
      say: 'Bị lừa mất sạch tiền. {call}Ba ngày sau, có người gọi tới, nhận lấy lại cho bạn một trăm phần trăm. {q}Bạn có nộp phí không?',
      sfx: [['slideDown', 0.2, 0.4], ['ding', 'call', 0.5], ['boing', 'q', 0.4]],
      draw(k) {
        vbg(k);
        vert(k, 900, () => { living(k, { night: true }); k.char(700, G, S * 1.1, { ...TOAN, hat: null, face: k.t > k.cue('call') ? 'shock' : 'cry', tears: k.t > k.cue('call') ? 0 : 0.8, pose: 'hold' }); });
        phone(k, 760, 860, 0.9, { r: 0.08, p: k.at('call', 0.4), ring: k.t > k.cue('call') && k.t < k.cue('q'), screen: (kk, w, h) => { kk.ctx.fillStyle = '#1f2a44'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.text('Số lạ', 0, -40, { size: 40, font: 'title', color: '#fff' }); kk.text('"Luật sư thu hồi"', 0, 20, { size: 26, color: '#c9d2e0' }); } });
        vcap(k, 'LẤY LẠI 100%?', 'call', { color: '#7fe0a8' });
      },
    },
    {
      say: 'Giọng rất lịch sự. {l1}Bên em có danh sách nạn nhân, có tên anh. Lấy lại trăm phần trăm, phí mười lăm phần trăm, xong việc mới thu.{e1} {docs}Gửi kèm giấy phép, con dấu đỏ chót, ảnh văn phòng ba mươi tầng.',
      sfx: [['sparkle', 'l1', 0.3], ['pop', 'docs', 0.4]],
      draw(k) {
        vbg(k);
        phone(k, 540, 640, 1.05, { screen: (kk, w, h) => { kk.ctx.fillStyle = '#1f2a44'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.char(0, h / 2 - 30, h * 0.65, { ...LS, face: 'happy', talk: spk(kk, 'l1', 'e1'), pose: 'present', shadow: false }); kk.text('LS. Thu hồi QT ⚖️', 0, -h / 2 + 40, { size: 26, font: 'title', color: '#fff' }); } });
        chat(k, 120, 1080, '📄 Giấy phép.pdf', { p: k.at('docs', 0.3) });
        chat(k, 120, 1190, '🔴 Con dấu · 🏢 VP 30 tầng', { p: k.at(k.cue('docs', 0.5), 0.3) });
        vcap(k, 'XONG VIỆC MỚI THU', 'l1', { color: '#fff' });
      },
    },
    {
      say: 'Rồi luật sư dặn thêm. {l1}Trước tiên anh nộp phí hồ sơ hai triệu chín, đổi sang USDT, chuyển vào ví này nhé.{e1} {same}Hai triệu chín. Đúng con số lúc bạn nạp app lần đầu tiên.',
      sfx: [['cash', 'l1', 0.4], ['boom', 'same', 0.5]],
      draw(k) {
        vbg(k);
        phone(k, 540, 760, 1.25, { r: 0.04, screen: lsScreen });
        if (k.t > k.cue('same')) { k.ctx.strokeStyle = '#ff2a2a'; k.ctx.lineWidth = 14; k.ctx.beginPath(); k.ctx.ellipse(540, 860, 260, 120, -0.05, 0, Math.PI * 2); k.ctx.stroke(); }
        vcap(k, '2,9 TRIỆU… LẦN NỮA?!', 'same', { color: '#ff6b5a' });
      },
    },
    {
      say: 'Bạn đứng ở cây ATM, ngón tay trên nút chuyển. {grab}Đúng lúc ấy, đứa con gái giật phắt cái điện thoại. {l1}Bố! Lừa đảo nó cũng có khuyến mãi lần hai đấy!{e1}',
      sfx: [['drumroll', 0.3, 0.3], ['whoosh', 'grab', 0.6], ['boom', 'l1', 0.5]],
      draw(k) {
        vbg(k);
        const grabbed = k.t > k.cue('grab');
        vert(k, 1000, () => {
          atmBooth(k);
          k.char(1150, G, S * 1.05, { ...TOAN, hat: null, face: grabbed ? 'shock' : 'blank', pose: grabbed ? 'shrug' : { l: [12, 6], r: [80, -30] }, sweat: !grabbed });
          k.char(grabbed ? 780 : -300, G, S, { ...LINH, face: 'angry', vein: true, pose: 'shout', talk: spk(k, 'l1', 'e1') });
          if (grabbed) k.burst(780, 260, 120, 'GIẬT!', { p: k.at('grab', 0.3) });
        });
        vcap(k, 'KHUYẾN MÃI LẦN HAI!', 'l1', { color: '#f2c230' });
      },
    },
    fullVideoScene({
      say: '{full}Còn ông Chủ tịch của cái app ấy giờ ở đâu? Xem bản đầy đủ trên kênh Nếu Bạn Là nhé.',
      image: 'poster',
      title: 'Nếu Bạn Kéo Cả Họ Vào App AI… Lúc App Sập (Phần 2)',
      channel: 'Nếu Bạn Là',
      tail: 1.2,
    }),
  ],
};
