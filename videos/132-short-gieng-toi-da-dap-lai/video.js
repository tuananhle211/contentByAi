// Nhân Gian Chưa Kể · Short 2 của tập 130 (Ông Giẳng Ông Giăng): lỡ đáp lại tiếng hát dưới giếng, trăng tắt, tôi ốm và mơ thấy nước. Sửa 20/11 theo hướng chân thật: bỏ dây gàu căng, gối ướt, chum đầy, dấu chân ướt. Không lộ chuyện lá thư, hũ tro, người mẹ.
// Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { sanNha, SAN } from '/channel/nhan-gian-babi.js';
import { NHIM, BA_N, ch, gieng, GI, giengSang, soi, matNuoc, goiUot, sepia } from '/channel/nhan-gian-gieng.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const dark = (k, c = '#141019') => { k.ctx.fillStyle = c; k.ctx.fillRect(0, 0, 1920, 1080); };
function thumb(k) {
  vframe(k, 960, () => soi(k, { moon: 340, who: 1 }), { y0: 520 });
  vline(k, 'DƯỚI GIẾNG CÓ NGƯỜI HÁT,', 280, 0, { size: 72 });
  vline(k, 'TÔI ĐÃ LỠ ĐÁP LẠI', 400, 0, { size: 88, color: AMBER });
}
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Dưới giếng có người hát, và tôi đã lỡ đáp lại một câu… #shorts',
    description: 'Bà tôi dặn: nghe dưới giếng có người hát, tuyệt đối không được đáp. Tôi đã đáp. Dưới giếng im bặt, rồi vầng trăng tắt. Từ đêm ấy tôi ốm, đêm nào cũng mơ thấy nước.\n\nBản đầy đủ: Ông Giẳng Ông Giăng | Trăng Dưới Giếng Hát Bằng Giọng Bố Tôi, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên đồng dao và kiêng kỵ dân gian.',
    links: [['▶ Bản đầy đủ: Ông Giẳng Ông Giăng', '130-ong-giang-trang-duoi-gieng']],
    tags: ['ông giẳng ông giăng', 'giếng cổ', 'tiếng hát dưới giếng', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
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
      say: '{a}Dưới giếng có người hát, và tôi đã lỡ đáp lại một câu. {b}Bà tôi dặn, đáp một câu, là đã nhận lời xuống chơi.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) { vframe(k, 960, () => soi(k, { moon: 300, who: 1 })); vline(k, after(k, 'b') ? 'ĐÃ NHẬN LỜI' : 'TÔI ĐÃ ĐÁP', 300, 'a', { size: 112, color: AMBER }); },
    },
    {
      say: '{a}Dưới giếng im bặt. Giọng ấy không hát tiếp. {b}Chỉ có tiếng nước dưới đáy, khẽ sóng sánh, như có ai vừa cựa mình. {c}Rồi vầng trăng mờ dần, tắt hẳn.',
      sfx: [['drip', 'b', 0.45], ['drip', ['b', 0.9], 0.35]],
      draw(k) { vframe(k, 960, () => { soi(k, { moon: 340, who: 1 }); k.ctx.fillStyle = `rgba(4,4,8,${after(k, 'c') ? k.at('c', 3, 'inOut') : 0})`; k.ctx.fillRect(-200, -200, 2400, 1500); }); vline(k, after(k, 'c') ? 'TRĂNG TẮT' : after(k, 'b') ? 'NƯỚC SÓNG SÁNH' : 'IM BẶT', 300, 'a', { size: 104, color: after(k, 'c') ? COLD : AMBER }); },
    },
    {
      say: '{a}Từ đêm ấy, tôi ốm. Sốt li bì mấy ngày, cứ lẩm bẩm mãi hai câu hát. {b}Đêm nào tôi cũng mơ thấy nước, mơ thấy mình ngồi trên vai bố, nhìn xuống một cái giếng sâu hun hút. Mẹ bảo là sốt.',
      sfx: [['drip', 'b', 0.35], ['heartbeat', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 960, () => { goiUot(k); shade(k, 0.3, [{ x: 960, y: 500, r: 900 }], { vig: 0 }); }); vline(k, 'TÔI ỐM', 300, 'a', { size: 110, color: AMBER }); return; }
        vframe(k, 960, () => { dark(k, '#0c0a08'); matNuoc(k, 960, 620, 420, { rim: '#5c4636', moon: 70 }); shade(k, 0.45, [{ x: 960, y: 620, r: 760 }], { vig: 0 }); }); vline(k, 'ĐÊM NÀO CŨNG MƠ THẤY NƯỚC', 270, 'b', { size: 66, color: COLD });
      },
    },
    {
      say: '{a}Bà nội tôi bị loà. Bà ngồi bên giường, nghe tôi lẩm bẩm, tay run lên: {q}mày đáp rồi phải không? {b}Bà bảo, thứ dưới giếng ấy hát bằng giọng người mình nhớ nhất. Đêm ba mươi Tết, nó đến đón.',
      sfx: [['heartbeat', 'q', 0.4], ['stinger', 'b', 0.5]],
      draw(k) { vframe(k, 1000, () => { dark(k, '#2a2018'); ch(k, 1000, 1010, 640, { ...BA_N, face: 'fear', arms: 'point', talk: 0.5 }); shade(k, 0.5, [{ x: 1000, y: 560, r: 640, warm: 1, flicker: 1 }], { vig: 0 }); }); vline(k, after(k, 'b') ? 'NÓ ĐẾN ĐÓN' : '"MÀY ĐÁP RỒI À?"', 300, 'q', { size: 92, color: after(k, 'b') ? AMBER : COLD }); },
    },
    {
      say: '{a}Tôi đếm từng ngày đến Tết. {b}Và đêm nào nhắm mắt, tôi cũng nghe lại cái đêm ấy, cái đêm dưới giếng có người hát, và tôi đã lỡ đáp lại một câu…',
      sfx: [['wind', 'a', 0.3]],
      draw(k) { vframe(k, GI.x, () => { gieng(k, { time: 'night' }); shade(k, 0.86, [{ x: GI.x, y: 720, r: 620 }], { vig: 0 }); giengSang(k, 0.5); }); vline(k, 'ĐẾM TỪNG NGÀY', 300, 'a', { size: 100, color: COLD }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
