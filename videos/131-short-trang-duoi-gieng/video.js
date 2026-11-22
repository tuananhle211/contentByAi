// Nhân Gian Chưa Kể · Short 1 của tập 130 (Ông Giẳng Ông Giăng): trăng dưới giếng đêm ba mươi + hai câu hát riêng của bố. Không lộ chuyện lá thư, hũ tro, người mẹ.
// Sửa 20/11: một điều kiêng duy nhất (không hát đáp). Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { sanNha } from '/channel/nhan-gian-babi.js';
import { NHIM, BA_N, ch, gieng, GI, giengSang, soi, phong, sepia } from '/channel/nhan-gian-gieng.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const dark = (k, c = '#141019') => { k.ctx.fillStyle = c; k.ctx.fillRect(0, 0, 1920, 1080); };
const M1 = 90, M2 = 210;
const well = (k, a = 0.4) => vframe(k, GI.x, () => { gieng(k, { time: 'night' }); shade(k, 0.86, [{ x: GI.x, y: 720, r: 620 }], { vig: 0 }); giengSang(k, a); });
function thumb(k) {
  vframe(k, 960, () => soi(k, { moon: 300, who: 1 }), { y0: 520 });
  vline(k, 'ĐÊM BA MƯƠI KHÔNG TRĂNG,', 280, 0, { size: 72 });
  vline(k, 'SAO GIẾNG CÓ TRĂNG?', 400, 0, { size: 86, color: AMBER });
}
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Đêm ba mươi không có trăng, tôi cúi xuống giếng lại thấy trăng tròn… #shorts',
    description: 'Đêm ba mươi, trời không có trăng. Vậy mà tôi cúi xuống cái giếng cổ đầu làng, lại thấy một vầng trăng tròn, và có người ngồi trên đó hát bài ông giẳng ông giăng.\n\nBản đầy đủ: Ông Giẳng Ông Giăng | Trăng Dưới Giếng Hát Bằng Giọng Bố Tôi, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên đồng dao và kiêng kỵ dân gian.',
    links: [['▶ Bản đầy đủ: Ông Giẳng Ông Giăng', '130-ong-giang-trang-duoi-gieng']],
    tags: ['ông giẳng ông giăng', 'trăng dưới giếng', 'giếng cổ', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'onggiangonggiang'],
    format: 'short', captions: true, gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '130-ong-giang-trang-duoi-gieng',
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Đêm ba mươi, trời không có trăng. {b}Vậy mà tôi cúi xuống giếng, lại thấy một vầng trăng tròn.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { well(k, 0.15); vline(k, 'ĐÊM BA MƯƠI', 300, 'a', { size: 112, color: AMBER }); return; }
        vframe(k, 960, () => soi(k, { moon: M1 + k.at('b', 3) * 40 })); vline(k, 'TRĂNG DƯỚI GIẾNG', 300, 'b', { size: 94, color: AMBER });
      },
    },
    {
      say: '{a}Có một cái bóng ngồi trên vầng trăng ấy, quay lưng lại. {b}Nó hát: {q}ông giẳng, ông giăng, xuống chơi với tôi.',
      sfx: [['heartbeat', 'a', 0.4], ['stinger', 'q', 0.4]],
      draw(k) { vframe(k, 960, () => soi(k, { moon: 130, who: k.at('a', 1.2) })); vline(k, after(k, 'q') ? '"XUỐNG CHƠI VỚI TÔI."' : 'CÓ NGƯỜI NGỒI TRÊN ĐÓ', 300, 'a', { size: 78, color: after(k, 'q') ? COLD : AMBER }); },
    },
    {
      say: '{a}Bà tôi chỉ dặn đúng một điều. {b}Nghe ai hát dưới giếng, {c}thì không được đáp. Đáp một câu, là đã nhận lời xuống chơi.',
      sfx: [['heartbeat', 'c', 0.35]],
      draw(k) {
        vframe(k, 1000, () => { dark(k, '#2a2018'); ch(k, 1000, 1010, 640, { ...BA_N, face: 'sleep', arms: 'point', talk: 0.5 }); shade(k, 0.5, [{ x: 1000, y: 560, r: 640, warm: 1, flicker: 1 }], { vig: 0 }); });
        vline(k, after(k, 'c') ? 'KHÔNG ĐƯỢC ĐÁP' : 'MỘT ĐIỀU DẶN', 300, 'a', { size: 92, color: AMBER });
      },
    },
    {
      say: '{a}Đêm ba mươi sau, tôi quay lại, và hát thử một câu. {b}Giọng ấy hát tiếp, đến hai câu mà cả đời tôi, chỉ một người biết: {q}có cái Nhím con, ngồi trên vai bố.',
      sfx: [['heartbeat', 'b', 0.4], ['stinger', 'q', 0.5]],
      draw(k) { vframe(k, 960, () => soi(k, { moon: M2, who: 1 })); vline(k, after(k, 'q') ? 'CÓ CÁI NHÍM CON,' : 'HAI CÂU HÁT', 300, 'a', { size: 88, color: AMBER }); if (after(k, 'q')) vline(k, 'NGỒI TRÊN VAI BỐ', 410, 'q', { size: 88, color: AMBER }); },
    },
    {
      say: '{a}Hai câu ấy, bố tôi tự chế, chỉ hát riêng cho tôi. {b}Mà bố tôi đang ở nước Nga, thư vẫn về đều. {c}Vậy thì ai đang ngồi dưới ấy?',
      sfx: [['stinger', 'c', 0.5]],
      draw(k) {
        if (k.t < k.cue('c')) { vframe(k, 960, () => { dark(k, '#1a130d'); phong(k, 960, 520, 1.5, { r: -0.03 }); shade(k, 0.3, [{ x: 960, y: 520, r: 760, warm: 1 }], { vig: 0 }); }); vline(k, 'BỐ TÔI Ở NGA', 300, 'b', { size: 104, color: AMBER }); return; }
        vframe(k, 960, () => soi(k, { moon: M2, who: 1 })); vline(k, 'AI Ở DƯỚI ẤY?', 300, 'c', { size: 104, color: COLD });
      },
    },
    {
      say: '{a}Tôi không dám kể với ai. {b}Chỉ biết rằng từ đấy về sau, tôi sợ nhất là cái đêm ba mươi, trời không có trăng…',
      sfx: [['wind', 'a', 0.3]],
      draw(k) { well(k, 0.5); vline(k, 'KHÔNG DÁM KỂ', 300, 'a', { size: 104, color: COLD }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
