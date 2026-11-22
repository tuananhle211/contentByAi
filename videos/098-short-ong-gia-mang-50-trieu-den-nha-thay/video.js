// Shorts kênh Nếu Bạn Là — cắt từ "Thầy" Giải Hạn Online (Phần 2) (096): ông già mang 50 triệu tiền mặt đến tận phòng trọ "thầy",
// tháo râu nói thật cũng thành "bằng chứng", hai khuôn mặt. Concept: #2* #11.
// Lừa đảo tâm linh trên livestream, deepfake (Bộ Công an 08/09/2026; VnExpress). Truyện hư cấu.
import { fullVideoScene } from '/engine/templates.js';
import { LOC, troRoom, liveRoom, altarFront, vert, vbg, vcap, tRays, tSticker, tBig, tCircle } from '/channel/neu-ban-la.js';
import { CASUAL, BEARDED, OLDTAM, bag, photoLoc, door, heldBeard, wifeFrame, noodleCup, liveMini } from '/videos/096-neu-ban-la-thay-giai-han-online-p2/video.js';

const room = (k, fn) => vert(k, 1100, () => { troRoom(k, { dawn: true }); door(k, 1); fn(k); }, { y0: 260 });

export default {
  meta: {
    title: 'Ông già mang 50 triệu đến tận nhà "thầy"… 😳 #shorts',
    description: 'Ngân hàng chặn chuyển khoản, "thầy" trên livestream bảo mang tiền mặt đến pháp đàn. Địa chỉ pháp đàn: phòng trọ của bạn. Truyện hư cấu dựa trên các vụ lừa đảo giải hạn online và deepfake được báo chí đưa tin. Xem bản đầy đủ trên kênh Nếu Bạn Là!',
    links: [['▶ Bản đầy đủ', '096-neu-ban-la-thay-giai-han-online-p2']],
    tags: ['giải hạn online', 'lừa đảo tâm linh', 'deepfake', 'thầy bói online', 'shorts', 'nếu bạn là'],
    hashtags: ['shorts', 'luadao', 'giaihan'],
    format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'fb2', speed: 1,
    lead: 0.15, tail: 0.3, pause: 0.12,
    transition: 'cut', sfxTransitions: false, camera: 0.03, sfxVolume: 0.6,
    images: { poster: 'assets/poster.jpg' },
    paper: '#14161d', privacy: 'private',
  },
  thumbnail(k) {
    tRays(k, '#1d2f5a', '#2a4580', 540, 1100);
    tSticker(k, () => k.char(700, 2000, 1100, { ...OLDTAM, face: 'calm', pose: 'hold', flip: true, shadow: false }), 16);
    tSticker(k, () => photoLoc(k, 330, 1000, 2.6, -0.1), 12);
    tSticker(k, () => bag(k, 250, 1620, 2), 12);
    tCircle(k, 330, 960, 220, 260);
    tBig(k, 'ÔNG GIÀ GÕ CỬA', 540, 200, 108, '#ffffff', { r: -0.04 });
    tBig(k, 'MANG 50 TRIỆU…', 540, 340, 108, '#ffffff', { r: -0.04 });
    tBig(k, 'TÌM ĐÚNG MẶT MÌNH?!', 540, 490, 92, '#ffe066', { box: '#d63a2f', r: -0.04 });
  },
  scenes: [
    {
      say: '{q}Bảy giờ sáng, một ông già gõ cửa phòng trọ của bạn, {photo}tay cầm ảnh in mặt bạn có râu, {bag}tay xách năm mươi triệu. {who}Ông tìm "thầy Lộc Phát".',
      sfx: [['click', 'q', 0.6], ['click', ['q', 0.35], 0.6], ['pop', 'photo', 0.4], ['cash', 'bag', 0.5], ['boom', 'who', 0.5]],
      draw(k) {
        vbg(k);
        room(k, () => {
          k.char(1350, 1000, 600, { ...OLDTAM, face: 'calm', pose: 'hold', flip: true, talk: k.t > k.cue('who') ? k.talk() : 0, shadow: false });
          if (k.t > k.cue('photo')) photoLoc(k, 1170, 640, 1.2 * k.at('photo', 0.4, 'back'));
          if (k.t > k.cue('bag')) bag(k, 1480, 820, 1.1 * k.at('bag', 0.4, 'back'));
          k.char(850, 1000, 600, { ...CASUAL, face: 'shock', pose: 'hold', sweat: k.t > k.cue('photo'), shadow: false });
        });
        vcap(k, k.t > k.cue('who') ? '"THẦY LỘC PHÁT ƠI!"' : k.t > k.cue('bag') ? '💵 50 TRIỆU TIỀN MẶT' : '🚪 7:00 SÁNG', k.t > k.cue('who') ? 'who' : k.t > k.cue('bag') ? 'bag' : 'q', { color: '#f2c230' });
      },
    },
    {
      say: '{bank}Vì ngân hàng chặn chuyển khoản, {live}nên "thầy" trên livestream bảo ông: mang tiền mặt đến pháp đàn. {addr}Địa chỉ pháp đàn: chính phòng trọ của bạn.',
      sfx: [['bonk', 'bank', 0.5], ['pop', 'live', 0.4], ['boom', 'addr', 0.6]],
      draw(k) {
        vbg(k);
        if (k.t < k.cue('live')) { k.text('🏦 ⚠️', 540, 640, { size: 200 }); k.text('GIAO DỊCH CÓ DẤU HIỆU LỪA ĐẢO', 540, 880, { size: 54, font: 'title', color: '#ff8a7a', maxWidth: 960, fx: 'pop', p: k.at('bank', 0.3) }); }
        else if (k.t < k.cue('addr')) { vert(k, 960, () => { liveRoom(k); k.char(960, 870, 650, { ...LOC, face: 'smug', pose: 'point', talk: k.talk(), shadow: false }); altarFront(k); }, { y0: 260 }); }
        else room(k, () => { k.char(850, 1000, 600, { ...CASUAL, face: 'shock', pose: 'hold', sweat: true, shadow: false }); k.text('📍', 850, 300, { size: 120, fx: 'pop', p: k.at('addr', 0.3) }); });
        vcap(k, k.t > k.cue('addr') ? '📍 = PHÒNG CỦA MÌNH' : k.t > k.cue('live') ? 'MANG TIỀN MẶT ĐẾN!' : 'NGÂN HÀNG CHẶN', k.t > k.cue('addr') ? 'addr' : k.t > k.cue('live') ? 'live' : 'bank', { color: k.t > k.cue('addr') ? '#ff8a7a' : '#f2c230' });
      },
    },
    {
      say: '{peel}Bạn bóc râu: cháu không phải thầy. {seen}Ông lại reo: Vong giật râu thầy à? Càng phải làm lễ! {phone}Bạn đặt điện thoại vào tay ông: bạn đang im, mà "thầy" trên màn hình vẫn đang nói.',
      sfx: [['scratch', 'peel', 0.6], ['sparkle', 'seen', 0.5], ['boom', ['seen', 1.4], 0.4], ['click', 'phone', 0.4], ['boom', ['phone', 2.5], 0.4]],
      draw(k) {
        vbg(k);
        if (k.t < k.cue('phone')) {
          const off = k.t > k.cue('peel', 0.4);
          room(k, () => {
            noodleCup(k, 1080, 960, 1); wifeFrame(k, 1180, 820, 0.8);
            k.char(850, 1000, 600, { ...(off ? CASUAL : BEARDED), beardPeel: off ? 0 : 0.7 * k.at('peel', 0.4), face: k.t > k.cue('seen') ? 'shock' : 'sad', pose: off ? 'wave' : 'hold', talk: k.t < k.cue('seen') ? k.talk() : 0, shadow: false });
            if (off) heldBeard(k, 1010, 480, 1.3, 0.3 * Math.sin(k.t * 3));
            k.char(1380, 1000, 600, { ...OLDTAM, face: k.t > k.cue('seen') ? 'happy' : 'calm', pose: k.t > k.cue('seen') ? 'present' : 'hold', flip: true, talk: k.t > k.cue('seen') ? k.talk() : 0, shadow: false });
          });
          vcap(k, k.t > k.cue('seen') ? '"VONG GIẬT RÂU THẦY À?!"' : '"CHÁU KHÔNG PHẢI THẦY"', k.t > k.cue('seen') ? 'seen' : 'peel', { color: '#f2c230', size: 68 });
          return;
        }
        k.ctx.fillStyle = '#d8cfc0'; k.ctx.fillRect(40, 220, 1000, 540);
        k.ctx.save(); k.ctx.beginPath(); k.ctx.rect(40, 220, 1000, 540); k.ctx.clip(); k.char(540, 1250, 1300, { ...CASUAL, face: 'blank', pose: 'hold', shadow: false }); k.ctx.restore();
        k.text('🤐 BẠN', 900, 300, { size: 56, font: 'title', color: '#fff', outline: '#1b1b24', outlineWidth: 10 });
        liveMini(k, 70, 820, 940, 529, { pose: 'point', view: '3.200' });
        k.text('🗣 "THẦY"', 900, 900, { size: 56, font: 'title', color: '#fff', outline: '#1b1b24', outlineWidth: 10 });
        vcap(k, 'HAI KHUÔN MẶT', 'phone', { color: '#ff8a7a' });
      },
    },
    {
      say: '{ask}Ông hỏi khẽ: Bà nhà tôi có đói không? {ans}Bà không đói đâu bác. Bác cầm tiền về đi. {q}Còn bạn, có nhận năm mươi triệu không?',
      sfx: [['pop', 'ask', 0.3], ['sparkle', 'ans', 0.4], ['boing', 'q', 0.4]],
      draw(k) {
        vbg(k);
        room(k, () => {
          k.char(850, 1000, 600, { ...CASUAL, face: 'sad', pose: 'hold', talk: k.t > k.cue('ans') && k.t < k.cue('q') ? k.talk() : 0, shadow: false });
          k.char(1380, 1000, 600, { ...OLDTAM, face: 'sad', pose: 'hold', flip: true, talk: k.t < k.cue('ans') ? k.talk() : 0, shadow: false });
          bag(k, 1150, 950, 0.9);
        });
        vcap(k, k.t > k.cue('q') ? 'BẠN CÓ NHẬN KHÔNG? 💵' : k.t > k.cue('ans') ? '"BÁC CẦM TIỀN VỀ ĐI"' : '"BÀ CÓ ĐÓI KHÔNG?"', k.t > k.cue('q') ? 'q' : k.t > k.cue('ans') ? 'ans' : 'ask', { color: '#f2c230', size: 70 });
      },
    },
    fullVideoScene({
      say: '{full}Bản đầy đủ: khuôn mặt thầy Lộc Phát đi làm hai mươi bốn giờ một ngày, trên kênh Nếu Bạn Là.',
      image: 'poster',
      title: 'Nếu Bạn Là "Thầy" Giải Hạn Online… (Phần 2)',
      channel: 'Nếu Bạn Là',
    }),
  ],
};
