// Shorts kênh Nếu Bạn Là — cắt từ "Thầy" Giải Hạn Online (Phần 2) (096): câu thu âm số 140 → mẹ bị lừa bằng giọng của chính con,
// tiền chui vào tài khoản đứng tên con. Concept: #13* #11.
// Gọi video giả người thân bị tai nạn đòi tiền (Bộ Công an cảnh báo 08/09/2026; Báo Văn Hoá). Truyện hư cấu.
import { fullVideoScene } from '/engine/templates.js';
import { troRoom, vert, vbg, vcap, tRays, tSticker, tBig, tCircle } from '/channel/neu-ban-la.js';
import { CASUAL, BEARDED, MOTHER, card, linesSheet, videoCall, inset } from '/videos/096-neu-ban-la-thay-giai-han-online-p2/video.js';

const mom = (k, o = {}) => videoCall(k, 540, 720, 900, 820, 'Mẹ', (k) => { k.ctx.fillStyle = '#c4b8a6'; k.ctx.fillRect(-450, -820, 900, 820); k.char(0, 160, 980, { ...MOTHER, face: 'cry', tears: 1, pose: 'hold', talk: o.talk ?? 0, shadow: false }); }, { p: o.p ?? 1 });

export default {
  meta: {
    title: 'Mẹ bị lừa… bằng chính giọng của con mình? 😢 #shorts',
    description: 'Bạn thu âm 200 câu cho một "thầy" giải hạn online, lấy 10 triệu. Câu số 140: "Mẹ ơi, con đâm phải người ta…". Hai ngày sau, mẹ bạn gọi về. Truyện hư cấu dựa trên các vụ lừa đảo deepfake giả giọng người thân được báo chí đưa tin. Xem bản đầy đủ trên kênh Nếu Bạn Là!',
    links: [['▶ Bản đầy đủ', '096-neu-ban-la-thay-giai-han-online-p2']],
    tags: ['deepfake', 'giả giọng người thân', 'lừa đảo', 'lừa đảo tai nạn', 'shorts', 'nếu bạn là'],
    hashtags: ['shorts', 'luadao', 'deepfake'],
    format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'fb2', speed: 1,
    lead: 0.15, tail: 0.3, pause: 0.12,
    transition: 'cut', sfxTransitions: false, camera: 0.03, sfxVolume: 0.6,
    images: { poster: 'assets/poster.jpg' },
    paper: '#14161d', privacy: 'private',
  },
  thumbnail(k) {
    tRays(k, '#7a1414', '#a32020', 540, 1100);
    tSticker(k, () => mom(k), 12);
    tSticker(k, () => k.char(330, 2050, 1100, { ...CASUAL, face: 'shock', tears: 0.6, sweat: true, pose: 'hold', shadow: false }), 16);
    tCircle(k, 540, 700, 330, 300);
    tBig(k, 'MẸ BỊ LỪA…', 540, 200, 120, '#ffffff', { r: -0.04 });
    tBig(k, 'BẰNG GIỌNG', 540, 340, 112, '#ffffff', { r: -0.04 });
    tBig(k, 'CỦA CHÍNH CON?!', 540, 490, 100, '#ffe066', { box: '#14161d', r: -0.04 });
  },
  scenes: [
    {
      say: '{q}Vì sao một "thầy" giải hạn online lại bắt bạn thu âm câu: {c140}Mẹ ơi, con đâm phải người ta, mẹ chuyển giúp con hai mươi triệu? {pay}Bạn đọc, vì cạnh micro là mười triệu.',
      sfx: [['pop', 'q', 0.4], ['scratch', 'c140', 0.5], ['cash', 'pay', 0.5]],
      draw(k) {
        vbg(k);
        k.group({ x: 540, y: 700, s: 1.35 }, () => k.group({ x: -1200, y: -470 }, () => linesSheet(k, 1200, 470, k.t > k.cue('c140'))));
        if (k.t > k.cue('pay')) k.text('💵 10 TRIỆU', 540, 1150, { size: 90, font: 'title', color: '#7fe0a8', fx: 'pop', p: k.at('pay', 0.3), outline: '#1b1b24', outlineWidth: 12 });
        vcap(k, k.t > k.cue('c140') ? 'CÂU SỐ 140' : 'THU ÂM 200 CÂU?', k.t > k.cue('c140') ? 'c140' : 'q', { color: k.t > k.cue('c140') ? '#ff8a7a' : '#f2c230' });
      },
    },
    {
      say: '{call}Hai ngày sau, đang làm lễ thì mẹ gọi. {cry}Mẹ khóc: năm giờ sáng con gọi video về, mặt đầy máu, xin hai mươi triệu. {chick}Mẹ bán đàn gà, chuyển rồi.',
      sfx: [['boing', 'call', 0.4], ['boing', ['call', 0.4], 0.4], ['pop', 'cry', 0.3], ['boing', 'chick', 0.3]],
      draw(k) {
        vbg(k);
        mom(k, { p: k.at('call', 0.4, 'back'), talk: k.t > k.cue('cry') ? k.talk() : 0 });
        if (k.t > k.cue('cry') && k.t < k.cue('chick')) inset(k, 830, 360, 140, '#3a2a2e', () => { k.char(0, 290, 400, { ...CASUAL, face: 'cry', tears: 1, pose: 'hold', shadow: false }); const { ctx } = k; ctx.fillStyle = 'rgba(200,30,30,0.85)'; ctx.beginPath(); ctx.ellipse(-30, -10, 22, 12, 0.4, 0, Math.PI * 2); ctx.ellipse(36, 20, 14, 26, -0.3, 0, Math.PI * 2); ctx.fill(); }, k.at('cry', 0.4, 'back'));
        if (k.t > k.cue('chick')) k.text('🐔🐔🐔 → 💸', 540, 1210, { size: 90, fx: 'pop', p: k.at('chick', 0.3) });
        vcap(k, k.t > k.cue('chick') ? 'BÁN ĐÀN GÀ · 20 TRIỆU' : k.t > k.cue('cry') ? '"CON ĐÂM PHẢI NGƯỜI…"' : '📞 MẸ GỌI', k.t > k.cue('chick') ? 'chick' : k.t > k.cue('cry') ? 'cry' : 'call', { color: '#ff8a7a', size: 70 });
      },
    },
    {
      say: '{voice}Mà sao giọng con lạ lạ, nghe như thầy cúng. {name}Tài khoản nhận tiền: Nguyễn Văn Lộc. {me}Tên của chính bạn. {none}Không thẻ, không mật khẩu, không rút được một đồng.',
      sfx: [['scratch', 'voice', 0.4], ['boom', 'name', 0.5], ['boom', 'me', 0.4], ['bonk', 'none', 0.4], ['bonk', ['none', 1.2], 0.4]],
      draw(k) {
        vbg(k);
        if (k.t < k.cue('name')) { mom(k, { talk: k.talk() }); vcap(k, '"…NGHE NHƯ THẦY CÚNG"', 'voice', { color: '#ff8a7a', size: 70 }); return; }
        card(k, 540, 760, 960, 760, '✅ CHUYỂN KHOẢN', [
          ['−20.000.000đ', null, '#c0392b'],
          ['Người nhận:', null],
          ['NGUYEN VAN LOC', 'name', '#1b1b24'],
          ['ND: Me gui con', null],
          ['💳 ❌  🔑 ❌  💸 0đ', 'none', '#c0392b'],
        ], { size: 56, gap: 120, head: '#1f6f4a', headText: '#fff' });
        vcap(k, k.t > k.cue('me') ? 'TÊN CỦA CHÍNH MÌNH 🙃' : 'NGƯỜI NHẬN: ?', k.t > k.cue('me') ? 'me' : 'name', { color: '#f2c230' });
      },
    },
    {
      say: '{lesson}Giọng của bạn, mặt của bạn, tên của bạn: đều đang đi làm cho người khác. {q}Bạn đã bao giờ chụp căn cước cho người lạ chưa?',
      sfx: [['sparkle', 'lesson', 0.4], ['boing', 'q', 0.4]],
      draw(k) {
        vbg(k);
        vert(k, 700, () => { troRoom(k, { dawn: true }); k.char(700, 1000, 640, { ...BEARDED, face: 'blank', gloom: 0.7, pose: 'hold', shadow: false }); }, { y0: 260 });
        ['🗣 GIỌNG', '🙂 MẶT', '🪪 TÊN'].forEach((t, i) => k.text(t + ' → 💼', 540, 420 + i * 120, { size: 70, font: 'title', color: '#fff', fx: 'pop', p: k.at(k.cue('lesson', i * 0.8), 0.3), outline: '#1b1b24', outlineWidth: 12 }));
        vcap(k, k.t > k.cue('q') ? 'BẠN ĐÃ TỪNG CHƯA? 🪪' : 'ĐỀU ĐANG ĐI LÀM CHO NGƯỜI KHÁC', k.t > k.cue('q') ? 'q' : 'lesson', { color: '#f2c230', size: 64 });
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
