// Cảnh mẫu Nhân Gian Chưa Kể: 3 cảnh ~30 giây — nhân vật búp bê, nhà gỗ ban đêm, ánh đèn dầu, lớp sepia.
// Định dạng video.js của dự án: mỗi cảnh có lời đọc `say` ({a}, {b}… là mốc để hình khớp lời) và hàm vẽ `draw(k)`.
// Ảnh xem trước: .github/mau-nhan-gian.jpg. Lời đọc tạo bằng scripts/tts.mjs (mốc từng từ → k.cue).
// Giọng: meta.tts 'edge' (miễn phí) cho mẫu; kênh thật dùng tts: 'omnivoice', omniVoice: 'default' (OMNI_URL + OMNI_KEY trong .env).
import { AMBER, COLD, shade, quote, tag, oil } from '/channel/nhan-gian.js';
import { BA, ch, bat, nha, NHA, sepia } from '/channel/nhan-gian-ke.js';

const black = (k, c = '#07060a') => { k.ctx.fillStyle = c; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); };
// Mỗi cảnh: máy quay đẩy chậm 5% + phủ sepia ngả nâu vàng (nét chung của kênh).
const grain = (sc) => ({ ...sc, draw(k) { const s = 1 + 0.05 * Math.min(1, k.t / Math.max(1, k.d)); k.group({ x: k.W / 2, y: k.H / 2, s }, () => k.group({ x: -k.W / 2, y: -k.H / 2 }, () => sc.draw(k))); sepia(k, 0.72); } });
const LAMP = { x: NHA.lamp.x, y: NHA.lamp.y, r: 640, warm: 1, flicker: 1 };
// Gian nhà ban đêm: dựng nền → đèn dầu → nhân vật (fn) → phủ bóng tối chừa vùng sáng.
function demNha(k, fn, lights = [LAMP]) { nha(k, { time: 'night' }); oil(k, NHA.lamp.x, 556, 0.9); if (fn) fn(); shade(k, 0.78, lights, { vig: 0.55 }); }

const video = {
  meta: {
    title: 'Mẫu | Cái Bát Để Phần',
    description: 'Cảnh mẫu cho bộ vẽ Nhân Gian Chưa Kể.',
    style: 'clean', tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 0.95,
    lead: 0.4, tail: 0.8, pause: 0.35, minDuration: 0,
    transition: 'fade', sfxTransitions: false, camera: 0.03, scribble: false,
    sfxVolume: 0.5, paper: '#07080c',
  },
  scenes: [
    {
      say: '{a}Các cụ bảo, nhà có người đi xa, bữa cơm nào cũng phải để phần một cái bát. {b}Bà tôi giữ lệ ấy suốt hai mươi năm.',
      sfx: [['wind', 0, 0.3]],
      draw(k) {
        const x = 1300 - k.at('a', 9, 'linear') * 600;
        demNha(k, () => { const i = ch(k, x, 990, 330, { ...BA, hat: null, view: 'side', flip: true, action: 'walk', face: 'calm', arms: 'hold' }); bat(k, i.hand[0], i.hand[1] + 4, 0.45); },
          [LAMP, { x, y: 820, r: 420, warm: 1, flicker: 1 }]);
        tag(k, 'MỘT ĐÊM MÙA ĐÔNG', 'a');
        quote(k, 'Bữa cơm nào cũng để phần một cái bát.', 'a', { color: AMBER, size: 56 });
      },
    },
    {
      say: '{a}Cái bát men xanh sứt miệng, lúc nào cũng đặt ở đầu mâm. {b}Không ai trong nhà được ăn bằng nó.',
      sfx: [['heartbeat', 'b', 0.35]],
      draw(k) {
        black(k, '#140e0a');
        bat(k, 960, 700, 3.6 + k.at('a', 8, 'linear') * 0.4);
        shade(k, 0.5, [{ x: 960, y: 600, r: 700, warm: 1, flicker: 1 }], { vig: 0.6 });
        quote(k, 'Không ai được ăn bằng nó.', 'b', { color: COLD, size: 62 });
      },
    },
    {
      say: '{a}Cho đến một đêm, tôi thấy bà ngồi một mình bên mâm cơm đã nguội, {b}khẽ gọi về phía cửa: {q}ông ơi, về ăn cơm.',
      sfx: [['stinger', 'q', 0.4]],
      draw(k) {
        demNha(k, () => ch(k, 1150, 990, 330, { ...BA, hat: null, view: 'side', flip: true, action: 'sit', face: 'sad', arms: 'chest', talk: k.t > k.cue('q') ? 0.5 : 0 }));
        quote(k, '"Ông ơi, về ăn cơm."', 'q', { color: AMBER, size: 64 });
      },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
