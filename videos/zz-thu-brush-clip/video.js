// THỬ: clip ngắn phong cách brush (nét rung + màu nước + quệt cọ + take) — không đăng.
import v from '/videos/073-neu-ban-la-le-tan-khach-san-tang-4-p2/video.js';
import { KHAI, G } from '/channel/neu-ban-la.js';
const demo = {
  dur: 4.5,
  draw(k) {
    k.backdrop('night', { ground: G });
    const s = 1.0;
    // trái: kiểu cũ — mặt đổi cái rụp
    k.char(620, G, 420, { ...KHAI, face: k.t > s ? 'shock' : 'calm', sweat: k.t > s });
    // phải: có "take" — nhún ra đòn, bật lên, nảy tắt dần
    k.char(1300, G, 420, { ...KHAI, sq: k.take(s, 1.3), face: k.t > s ? 'shock' : 'calm', sweat: k.t > s });
    k.burst(1300, 260, 70, '!', { p: k.at(s + 0.05, 0.3, 'back') });
  },
};
export default { ...v, scenes: [demo, ...v.scenes.slice(0, 4)], meta: { ...v.meta, look: 'brush', transition: 'brush', title: 'thử brush clip' } };
