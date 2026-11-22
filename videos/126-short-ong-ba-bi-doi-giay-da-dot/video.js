// Nhân Gian Chưa Kể · Short 2 của tập 124 (Ông Ba Bị): đôi giày đã đốt quay về. Không lộ lời thú nhận của bà và mẹ.
// Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline, oil } from '/channel/nhan-gian.js';
import { HANH, CUN, ME, ch, giay, dan, luaNho, vuonNa, NA, sanNha, gianNha, GIAN, sepia } from '/channel/nhan-gian-babi.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const dark = (k) => { k.ctx.fillStyle = '#1a130c'; k.ctx.fillRect(0, 0, 1920, 1080); };
function dandem(k) { gianNha(k, { chieu: true }); oil(k, GIAN.lamp.x, 682, 1); ch(k, 1000, 960, 440, { ...ME, action: 'sit', face: 'sad', arms: 'hold' }); dan(k, 1000, 835, 1.5); shade(k, 0.72, [{ x: GIAN.lamp.x, y: 610, r: 680, warm: 1, flicker: 1 }], { vig: 0 }); }
function dot(k) { vuonNa(k, { time: 'night' }); ch(k, 800, 950, 440, { ...ME, action: 'kneel', view: 'side', face: 'sad', arms: 'hold' }); luaNho(k, NA.x + 130, 930, 1.3); giay(k, NA.x + 130, 925, 0.7, { color: '#a06a6e' }); shade(k, 0.72, [{ x: NA.x + 130, y: 840, r: 620, warm: 1, flicker: 1 }], { vig: 0 }); }
function hang(k, cue, n) { for (let i = 0; i < n; i++) { const p = k.at(k.cue(cue, i * 0.5), 0.5); if (p <= 0) continue; giay(k, 190 + (i % 3) * 350, 480 + Math.floor(i / 3) * 420, (0.7 + i * 0.16) * p); k.text(String(1989 + i), 190 + (i % 3) * 350, 560 + Math.floor(i / 3) * 420, { size: 54, font: 'title', color: AMBER, fx: 'fade', p }); } }
function thumb(k) {
  vframe(k, 960, () => { dark(k); giay(k, 960, 820, 3.6, { mud: 0.75 }); shade(k, 0.3, [{ x: 960, y: 620, r: 800, warm: 1 }], { vig: 0 }); }, { y0: 520 });
  vline(k, 'GIÀY MẸ ĐÃ ĐỐT,', 280, 0, { size: 92 });
  vline(k, 'SAO CÒN Ở ĐÂY?', 400, 0, { size: 96, color: AMBER });
}
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Mẹ tôi đan một đôi giày len rồi đem đốt, năm sau nó tự quay về… #shorts',
    description: 'Mỗi năm, đúng ngày mười bốn tháng Ba, mẹ tôi đan một đôi giày len nhỏ màu hồng rồi mang ra gốc na đốt. Đôi năm sau bao giờ cũng to hơn đôi năm trước. Năm tôi chín tuổi, đôi giày đã cháy thành tro quay về, lấm bùn.\n\nBản đầy đủ: Ông Ba Bị | Nhà Mày Mấy Đứa? Tôi Đáp Hai, Ông Bảo Thiếu Một, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu.',
    links: [['▶ Bản đầy đủ: Ông Ba Bị', '124-ong-ba-bi-nha-may-may-dua']],
    tags: ['ông ba bị', 'giày len', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'ongbabi'],
    format: 'short', captions: true, gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '124-ong-ba-bi-nha-may-may-dua',
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Mỗi năm, đúng ngày mười bốn tháng Ba, mẹ tôi ngồi bên đèn dầu, đan một đôi giày len nhỏ màu hồng. {b}Đan xong, mẹ mang ra gốc na sau vườn, đốt.',
      sfx: [['drip', 'b', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 1000, () => dandem(k)); vline(k, '14 THÁNG BA', 300, 'a', { size: 110, color: AMBER }); return; }
        vframe(k, NA.x + 40, () => dot(k)); vline(k, 'ĐAN XONG, ĐEM ĐỐT', 300, 'b', { size: 88, color: AMBER });
      },
    },
    {
      say: '{a}Đôi năm sau, bao giờ cũng to hơn đôi năm trước một chút. {b}Tôi hỏi giày cho ai. Mẹ chỉ bảo: {q}cho người dưới ấy.',
      draw(k) {
        if (k.t < k.cue('b')) { k.ctx.fillStyle = '#05060a'; k.ctx.fillRect(0, 0, k.W, k.H); k.group({ x: 0, y: 250 }, () => hang(k, 'a', 6)); vline(k, 'MỖI NĂM MỘT TO HƠN', 260, 'a', { size: 80, color: AMBER }); return; }
        vframe(k, NA.x + 40, () => dot(k)); vline(k, '"CHO NGƯỜI DƯỚI ẤY."', 300, 'q', { size: 80, color: COLD });
      },
    },
    {
      say: '{a}Năm tôi chín tuổi, một buổi chiều, thằng em bốn tuổi từ vườn chạy vào, tay cầm một đôi giày len hồng lấm bùn. {b}Là đôi mẹ đan năm ngoái. {c}Đôi mà chính mắt tôi đã thấy cháy thành tro.',
      sfx: [['heartbeat', 'b', 0.4], ['stinger', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 1100, () => { sanNha(k, { time: 'dusk' }); const x = k.lerp(1500, 1100, k.at('a', 3)); ch(k, x, 990, 280, { ...CUN, view: 'side', flip: true, action: k.at('a', 3) < 1 ? 'walk' : 'stand', face: 'happy', arms: 'point' }); giay(k, x - 120, 880, 0.42, { mud: 0.8 }); ch(k, 820, 975, 330, { ...HANH, view: 'side', face: 'calm', arms: 'down' }); shade(k, 0.46, [{ x: 1100, y: 420, r: 1300, warm: 1 }], { vig: 0 }); }); return; }
        vframe(k, 960, () => { dark(k); giay(k, 960, 800, 3.4, { mud: 0.75 }); shade(k, 0.3, [{ x: 960, y: 620, r: 800, warm: 1 }], { vig: 0 }); }); vline(k, 'ĐÃ CHÁY THÀNH TRO', 300, 'c', { size: 86, color: AMBER });
      },
    },
    {
      say: '{a}Len không sém một sợi. {b}Tôi hỏi nó lấy đâu ra. Nó bảo có một chị ở gốc na cho. {q}Chị bảo chật rồi, chị không đi vừa nữa.',
      sfx: [['heartbeat', 'q', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 960, () => { dark(k); giay(k, 960, 800, 3.4, { mud: 0.75 }); shade(k, 0.3, [{ x: 960, y: 620, r: 800, warm: 1 }], { vig: 0 }); }); vline(k, 'KHÔNG SÉM MỘT SỢI', 300, 'a', { size: 84, color: AMBER }); return; }
        vframe(k, NA.x, () => { vuonNa(k, { time: 'dusk' }); shade(k, 0.62, [{ x: NA.x, y: 720, r: 480, warm: 0.5 }], { vig: 0 }); }); vline(k, '"CHỊ BẢO CHẬT RỒI."', 300, 'q', { size: 84, color: COLD });
      },
    },
    {
      say: '{a}Tôi ướm vào chân thằng em. Rộng thùng thình. {b}Đôi giày ấy là cỡ chân của một đứa bé năm tuổi. {c}Mà nhà tôi, không có đứa nào năm tuổi cả.',
      sfx: [['stinger', 'c', 0.45]],
      draw(k) { vframe(k, 900, () => { sanNha(k, { time: 'dusk' }); ch(k, 1010, 1000, 250, { ...CUN, action: 'sit', face: 'happy', arms: 'down' }); ch(k, 640, 985, 300, { ...HANH, action: 'kneel', view: 'side', face: after(k, 'c') ? 'fear' : 'calm', arms: 'point' }); giay(k, 860, 1020, 0.82, { mud: 0.75 }); shade(k, 0.46, [{ x: 900, y: 420, r: 1300, warm: 1 }], { vig: 0 }); }); vline(k, 'CỠ CHÂN 5 TUỔI', 300, 'b', { size: 96, color: AMBER }); },
    },
    {
      say: '{a}Hôm sau, tôi nhìn mẹ ngồi đan đôi giày mới, to hơn đôi cũ một chút. {b}Và tôi bắt đầu tự hỏi, vì sao mỗi năm, đúng ngày mười bốn tháng Ba…',
      sfx: [['wind', 'b', 0.3]],
      draw(k) { vframe(k, 1000, () => dandem(k)); vline(k, 'TO HƠN MỘT CHÚT…', 300, 'a', { size: 88, color: COLD }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
