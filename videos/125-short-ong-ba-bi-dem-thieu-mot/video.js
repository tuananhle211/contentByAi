// Nhân Gian Chưa Kể · Short 1 của tập 124 (Ông Ba Bị): "đếm thiếu một". Không lộ lời thú nhận của bà và mẹ.
// Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { HANH, CUN, DUNG, THAM, BA, ONG, ch, bi, ongGia, gocDa, vuonNa, NA, gianNha, GIAN, mam, sepia } from '/channel/nhan-gian-babi.js';
import { oil } from '/channel/nhan-gian.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const dusk = (k, x = 960) => shade(k, 0.46, [{ x, y: 420, r: 1300, warm: 1 }], { vig: 0 });
function close(k, o = {}) { k.ctx.fillStyle = '#120d09'; k.ctx.fillRect(0, 0, 1920, 1080); bi(k, 960, 1000, 2.7, { breathe: 1.6, eyes: 0.8, ...o }); shade(k, 0.5, [{ x: 960, y: 560, r: 780, warm: 0.7, flicker: 1 }], { vig: 0 }); }
function hoi(k, o = {}) { gocDa(k, { time: 'dusk' }); bi(k, 520, 950, 0.82, { eyes: 0.6 }); ch(k, 760, 965, 430, { ...ONG, action: 'sit', view: 'side', face: 'blank', arms: 'hold', tilt: o.nod ? Math.sin(k.t * 5) * 6 : 0 }); ch(k, 1080, 985, 340, { ...(o.kid ?? HANH), view: 'side', flip: true, face: o.face ?? 'fear', arms: 'chest', talk: o.talk ?? 0 }); dusk(k, 900); }
function bua(k, o = {}) { gianNha(k, { chieu: true }); oil(k, GIAN.lamp.x, 682, 1); ch(k, 620, 985, 400, { ...BA, action: 'sit', view: 'side', face: o.ba ?? 'calm', arms: 'hold' }); ch(k, 1290, 985, 270, { ...CUN, action: 'sit', view: 'side', flip: true, face: 'happy', arms: o.point ? 'point' : 'hold', talk: o.talk ?? 0 }); mam(k, 960, 985, 1); shade(k, 0.66, [{ x: 960, y: 760, r: 760, warm: 1, flicker: 1 }], { vig: 0 }); }
function thumb(k) {
  vframe(k, 900, () => hoi(k, {}), { y0: 520 });
  vline(k, 'NHÀ TÔI HAI ĐỨA,', 280, 0, { size: 88 });
  vline(k, 'ÔNG BẢO THIẾU MỘT', 400, 0, { size: 84, color: AMBER });
}
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Ông ăn mày hỏi nhà tôi mấy đứa, tôi đáp hai, ông lắc đầu: đếm thiếu một… #shorts',
    description: 'Năm tôi chín tuổi, một ông ăn mày đeo cái bị chín quai đến đầu làng. Ông hỏi mỗi đứa trẻ một câu: nhà mày mấy đứa? Đứa nào ông cũng gật. Đến lượt tôi, ông lắc đầu.\n\nBản đầy đủ: Ông Ba Bị | Nhà Mày Mấy Đứa? Tôi Đáp Hai, Ông Bảo Thiếu Một, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên câu dọa trẻ con trong dân gian.',
    links: [['▶ Bản đầy đủ: Ông Ba Bị', '124-ong-ba-bi-nha-may-may-dua']],
    tags: ['ông ba bị', 'ông ba bị chín quai mười hai con mắt', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
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
      say: '{a}Năm tôi chín tuổi, một ông ăn mày đeo cái bị chín quai đến đầu làng. {b}Ông không xin gì. Ông chỉ hỏi mỗi đứa trẻ một câu: {q}nhà mày mấy đứa?',
      sfx: [['heartbeat', 'q', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 1250, () => { gocDa(k, { time: 'dusk' }); ongGia(k, k.lerp(1600, 1230, k.at('a', 4)), 960, 480, { view: 'side', flip: true, action: k.at('a', 4) < 1 ? 'walk' : 'stand', face: 'blank' }); dusk(k, 1250); }); vline(k, 'CHÍN QUAI', 300, 'a', { size: 120, color: AMBER }); return; }
        vframe(k, 900, () => hoi(k, { kid: DUNG })); vline(k, '"NHÀ MÀY MẤY ĐỨA?"', 300, 'q', { size: 84, color: AMBER });
      },
    },
    {
      say: '{a}Thằng Dũng bảo ba đứa. Ông gật: đủ. {b}Cái Thắm bảo bốn đứa. Ông lại gật: đủ. {c}Đến lượt tôi. Tôi bảo: nhà cháu hai đứa.',
      draw(k) {
        const kid = k.t < k.cue('b') ? DUNG : k.t < k.cue('c') ? THAM : HANH;
        vframe(k, 900, () => hoi(k, { kid, nod: k.t < k.cue('c'), talk: 0.5 }));
        vline(k, k.t < k.cue('b') ? '"BA ĐỨA." · "ĐỦ."' : k.t < k.cue('c') ? '"BỐN ĐỨA." · "ĐỦ."' : '"NHÀ CHÁU HAI ĐỨA."', 300, 0, { size: 80 });
      },
    },
    {
      say: '{a}Ông ngẩng lên, nhìn tôi rất lâu, rồi lắc đầu: {q}đếm thiếu một.',
      sfx: [['stinger', 'q', 0.5]],
      draw(k) { vframe(k, 960, () => { k.ctx.fillStyle = '#1a130c'; k.ctx.fillRect(0, 0, 1920, 1080); k.group({ x: 960, y: 420, s: 2.4 }, () => k.group({ x: -960, y: -420 }, () => ch(k, 960, 800, 620, { ...ONG, face: 'blank', tilt: Math.sin(k.t * 2.6) * 7 }))); shade(k, 0.5, [{ x: 960, y: 440, r: 700, warm: 1 }], { vig: 0 }); }); vline(k, 'ĐẾM THIẾU MỘT', 300, 'q', { size: 104, color: AMBER }); },
    },
    {
      say: '{a}Đúng lúc ấy, trong cái bị, có tiếng một đứa con gái gọi rất khẽ: {q}mẹ ơi. {b}Ba đứa chúng tôi co cẳng chạy.',
      sfx: [['stinger', 'q', 0.5], ['whoosh', 'b', 0.3]],
      draw(k) { vframe(k, 960, () => close(k, { breathe: 2.4 })); vline(k, '"MẸ ƠI…"', 300, 'q', { size: 130, color: COLD }); },
    },
    {
      say: '{a}Tối ấy, trong bữa cơm, thằng Cún em tôi mới bốn tuổi, và cơm rồi nói như kể chuyện vặt: {q}chị Hoa bảo, nhà mình ba đứa. {b}Bà tôi đặt đũa xuống. {c}Xóm tôi không có đứa nào tên Hoa.',
      sfx: [['heartbeat', 'q', 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) { vframe(k, 960, () => bua(k, { ba: after(k, 'b') ? 'shock' : 'calm', talk: after(k, 'q') && !after(k, 'b') ? 0.6 : 0 })); vline(k, '"NHÀ MÌNH BA ĐỨA."', 300, 'q', { size: 84, color: AMBER }); return; }
        vframe(k, NA.x, () => { vuonNa(k, { time: 'dusk' }); shade(k, 0.66, [{ x: NA.x, y: 700, r: 480, warm: 0.4 }], { vig: 0 }); }); vline(k, 'CHỊ HOA LÀ AI?', 300, 'c', { size: 100, color: COLD });
      },
    },
    {
      say: '{a}Chị Hoa ở gốc na, nó bảo thế. {b}Và từ hôm ấy, tôi không còn dám chắc, khi có người hỏi tôi: {q}nhà mày mấy đứa?',
      sfx: [['wind', 'a', 0.3]],
      draw(k) { vframe(k, NA.x, () => { vuonNa(k, { time: 'night' }); shade(k, 0.72, [{ x: NA.x, y: 720, r: 460 }], { vig: 0 }); }); vline(k, '"CHỊ HOA Ở GỐC NA."', 300, 'a', { size: 80, color: COLD }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
