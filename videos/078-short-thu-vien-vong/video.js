// Shorts kênh Nếu Bạn Là — cắt từ "Thầy" Giải Hạn Online (Phần 1) (076): "thư viện vong" và lễ bổ sung. Concept: #9* #13.
// Lễ 3 triệu, "làm lễ chưa đúng thủ tục" → thêm lễ "cắt vong giải hạn": VTV 05/03/2026. Truyện hư cấu.
import { fullVideoScene } from '/engine/templates.js';
import { LOC, liveRoom, altarFront, qrCard, keng, vongBook, vert, vbg, vcap, tRays, tSticker, tBig, tCircle } from '/channel/neu-ban-la.js';

const ROWS = [[1, 'Ông bà chưa siêu thoát', 'khách trên 50 tuổi', 'v1'], [3, 'Cô gái chết đuối', 'chị em hay đau đầu', 'v3'], [9, 'Con chó cũ nhà hàng xóm 🐕', 'khách nghe 8 vong trên vẫn chưa chuyển', 'v9']];
const book = (k, rows, o = {}) => k.group({ x: 540, y: 700, s: 0.82 }, () => k.group({ x: 0, y: 0, s: 1 }, () => vongBook(k, 0, 0, 1, rows, o)));

export default {
  meta: {
    title: 'Lò lừa giải hạn có cả… "thư viện vong"? 👻 #shorts',
    description: 'Vong số 1 cho khách trên 50 tuổi, vong số 3 cho chị em hay đau đầu, vong số 9 là con chó cũ nhà hàng xóm. Và món bán chạy nhất không phải là lễ. Truyện hư cấu dựa trên các vụ lừa giải hạn online được báo chí đưa tin. Xem bản đầy đủ trên kênh Nếu Bạn Là!',
    links: [['▶ Bản đầy đủ', '076-neu-ban-la-thay-giai-han-online-p1']],
    tags: ['giải hạn online', 'lừa đảo tâm linh', 'vong theo', 'cắt vong', 'shorts', 'nếu bạn là'],
    hashtags: ['shorts', 'luadao', 'giaihan'],
    format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'fb2', speed: 1, // giọng 08 (từ 11/11); bản Edge cũ: tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1.1
    lead: 0.15, tail: 0.3, pause: 0.12,
    transition: 'cut', sfxTransitions: false, camera: 0.03, sfxVolume: 0.6,
    images: { poster: 'assets/poster.jpg' },
    paper: '#14161d', privacy: 'private',
  },
  thumbnail(k) {
    tRays(k, '#2a3a5a', '#3d5280', 540, 1100);
    tSticker(k, () => k.group({ x: 540, y: 1080, s: 0.8 }, () => vongBook(k, 0, 0, 1, ROWS, { last: 0 })), 12);
    tCircle(k, 300, 1255, 250, 75);
    k.text('👻', 880, 720, { size: 200 });
    tBig(k, 'LÒ LỪA GIẢI HẠN', 540, 200, 100, '#ffffff', { r: -0.04 });
    tBig(k, 'CÓ CẢ…', 540, 330, 110, '#ffffff', { r: -0.04 });
    tBig(k, 'THƯ VIỆN VONG?!', 540, 480, 104, '#ffe066', { box: '#d63a2f', r: -0.04 });
  },
  scenes: [
    {
      say: 'Ở lò lừa giải hạn online, có hẳn một tập hồ sơ, tên là: {t}Thư viện vong.',
      sfx: [['scratch', 0.2, 0.4], ['boom', 't', 0.5]],
      draw(k) {
        vbg(k);
        k.group({ x: 540, y: 760, s: k.at(0.2, 0.5, 'back') }, () => { const { ctx } = k; ctx.fillStyle = '#2a3a5a'; ctx.beginPath(); ctx.roundRect(-300, -400, 600, 800, 24); ctx.fill(); ctx.fillStyle = '#fffdf6'; ctx.fillRect(-240, -300, 480, 160); k.text('📕', 0, 120, { size: 220 }); });
        if (k.t > k.cue('t')) k.text('THƯ VIỆN VONG', 540, 540, { size: 52, font: 'title', color: '#c0392b', fx: 'pop', p: k.at('t', 0.3) });
        vcap(k, 'NỘI BỘ · CẤM MANG RA NGOÀI', 't', { color: '#ff8a7a', size: 60 });
      },
    },
    {
      say: '{v1}Vong số một: ông bà chưa siêu thoát, cho khách trên năm mươi. {v3}Vong số ba: cô gái chết đuối, cho chị em hay đau đầu. {v9}Vong số chín: con chó cũ nhà hàng xóm, cho khách đã nghe hết tám vong mà vẫn chưa chuyển khoản.',
      sfx: [['pop', 'v1', 0.4], ['pop', 'v3', 0.4], ['boing', 'v9', 0.5]],
      draw(k) {
        vbg(k);
        k.group({ x: 540, y: 740, s: 0.82 }, () => k.group({ x: 310, y: 0 }, () => vongBook(k, 0, 0, 1, ROWS)));
        vcap(k, k.t > k.cue('v9') ? 'VONG SỐ 9: CON CHÓ 🐕' : k.t > k.cue('v3') ? 'VONG SỐ 3' : 'VONG SỐ 1', k.t > k.cue('v9') ? 'v9' : k.t > k.cue('v3') ? 'v3' : 'v1', { color: '#f2c230' });
      },
    },
    {
      say: '{last}Trang cuối chỉ có một dòng: mọi thứ đều là vong. {snore}Chồng ngáy to? Vong. {qr}Lễ giải: ba triệu. {more}Ghi thiếu dấu? Vong không nhận. Cắt vong: chín triệu.',
      sfx: [['boom', 'last', 0.5], ['boing', 'snore', 0.4], ['ding', 'qr', 0.5], ['bonk', 'more', 0.5], ['cash', ['more', 1.6], 0.5]],
      draw(k) {
        vbg(k);
        if (k.t < k.cue('snore')) { k.group({ x: 540, y: 740, s: 0.82 }, () => k.group({ x: -310, y: 0 }, () => vongBook(k, 0, 0, 1, [], { last: 'last' }))); vcap(k, 'MỌI THỨ ĐỀU LÀ VONG', 'last', { color: '#ff8a7a' }); return; }
        vert(k, 960, () => { liveRoom(k); k.char(960, 900, 650, { ...LOC, face: 'smug', pose: 'present', talk: 0.5 + 0.5 * Math.sin(k.t * 7), shadow: false }); altarFront(k); }, { y0: 260 });
        const more = k.t > k.cue('more');
        qrCard(k, 820, 1000, 1, { amount: more ? '9.000.000đ' : '3.000.000đ', note: more ? 'LỄ CẮT VONG' : 'ND: họ tên + năm sinh', cue: more ? 'more' : 'qr' });
        if (k.t > k.cue('qr')) keng(k, more ? k.cue('more', 1.6) : k.cue('qr', 0.8), 300, 1000);
        vcap(k, more ? 'GHI THIẾU DẤU → +9 TRIỆU' : '😴 NGÁY TO = VONG', more ? 'more' : 'snore', { color: '#f2c230', size: 64 });
      },
    },
    {
      say: '{q}Đoán xem, món bán chạy nhất là gì? {ans}Không phải lễ. Mà là lễ bổ sung.',
      sfx: [['drumroll', 'q', 0.4], ['tada', 'ans', 0.5]],
      draw(k) {
        vbg(k);
        k.text('?', 540, 700, { size: 420, font: 'title', color: '#f2c230', fx: 'pop', p: k.at('q', 0.4), outline: '#1b1b24', outlineWidth: 20 });
        if (k.t > k.cue('ans')) { k.ctx.fillStyle = '#14161d'; k.ctx.fillRect(0, 300, 1080, 900); k.group({ x: 540, y: 760, s: k.at('ans', 0.4, 'back'), r: -0.06 }, () => { k.ctx.fillStyle = '#f2c230'; k.ctx.beginPath(); k.ctx.roundRect(-430, -170, 860, 340, 30); k.ctx.fill(); k.text('LỄ BỔ SUNG', 0, -40, { size: 110, font: 'title', color: '#7a1f1f' }); k.text('bán chạy nhất 🔥', 0, 80, { size: 64, font: 'title', color: '#7a1f1f' }); }); }
        vcap(k, 'MÓN BÁN CHẠY NHẤT?', 'q', { color: '#fff' });
      },
    },
    fullVideoScene({
      say: '{full}Bản đầy đủ: một đêm của thầy Lộc Phát, trên kênh Nếu Bạn Là.',
      image: 'poster',
      title: 'Nếu Bạn Là "Thầy" Giải Hạn Online… (Phần 1)',
      channel: 'Nếu Bạn Là',
    }),
  ],
};
