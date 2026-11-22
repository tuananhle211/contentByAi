// Thử nhân vật búp bê (channel/nhan-gian-doll.js) theo ảnh mẫu người dùng gửi 17/11.
import { filmGrade } from '/channel/nhan-gian-hd.js';
import { highwayHD, lotusHD } from '/channel/nhan-gian-hd-sets.js';
import { doll, dollBike, dollFish, sepia } from '/channel/nhan-gian-doll.js';

// Quần áo thường nông thôn Bắc Bộ: áo cánh hoa nhỏ + quần đen, sơ mi cũ + quần vải xắn ống, áo bộ đội cũ, áo nâu + khăn mỏ quạ, áo phông + quần đùi.
const ME = { kind: 'woman', skin: '#ecc8a4', hair: 'bun', hairColor: '#2a1e16', top: '#c8b8a0', topStyle: 'canh', print: 'flower', printColor: '#b0605a', pants: '#2a2622', shoes: '#6a5a4a' };
const HUY = { kind: 'man', skin: '#e6d0b4', hair: 'spiky', hairColor: '#2a1e16', top: '#e8e2d4', topStyle: 'shirt', sleeve: 'short', pants: '#3a4450', shoes: '#4a5a6a' };
const BO = { kind: 'man', skin: '#d8ac84', hair: 'short', hairColor: '#2a1e16', top: '#5e6a4a', topStyle: 'army', pants: '#3a3430', roll: true, shoes: '#3a4a5a', hat: 'coi' };
const BA = { kind: 'old', skin: '#d8b498', hair: 'bun', hairColor: '#8a8078', top: '#6a4a34', topStyle: 'baba', pants: '#1e1c1a', shoes: '#4a3a2a', hat: 'moquo' };
const BE = { kind: 'kid', skin: '#f0d0b0', hair: 'buzz', hairColor: '#2a1e16', top: '#d8c8a0', topStyle: 'tee', sleeve: 'short', pants: '#4a6a7a', roll: true, shoes: '#c84a3a' };

export default {
  meta: { title: 'thử nhân vật búp bê', style: 'clean', camera: 0, transition: 'cut', minDuration: 0, scribble: false, gpu: true },
  scenes: [
    { dur: 3, draw(k) { // giống ảnh mẫu: hai người đối diện
      lotusHD(k, { time: 'dawn' });
      doll(k, 600, 960, 520, { ...ME, face: 'cry', arms: 'hold' });
      doll(k, 1400, 960, 540, { ...HUY, face: 'smug', arms: 'point', talk: after(k, 1) ? 0.6 : 0 });
      sepia(k, 1); k.vignette(0.35);
    } },
    { dur: 3, draw(k) { // các cảm xúc
      highwayHD(k, { time: 'dusk' });
      ['calm', 'happy', 'sad', 'fear', 'shock', 'angry'].forEach((f, i) => doll(k, 220 + i * 300, 940, 380, { ...(i % 2 ? ME : BO), face: f, arms: ['down', 'chest', 'hold', 'cover', 'raise', 'hips'][i], hat: null }));
      sepia(k, 1); k.vignette(0.35);
    } },
    { dur: 4, draw(k) { // đi bộ nghiêng + nhìn thẳng
      highwayHD(k, { time: 'day' });
      doll(k, k.lerp(200, 1200, k.t / 4), 900, 400, { ...BO, view: 'side', action: 'walk', face: 'calm' });
      doll(k, k.lerp(1700, 1100, k.t / 4), 940, 380, { ...BA, view: 'side', action: 'walk', flip: true, face: 'blank' });
      doll(k, k.lerp(-100, 500, k.t / 4), 970, 250, { ...BE, view: 'side', action: 'walk', face: 'happy' });
      sepia(k, 1); k.vignette(0.3);
    } },
    { dur: 4, draw(k) { // đạp xe
      highwayHD(k, { time: 'day' });
      dollBike(k, k.lerp(-200, 1400, k.t / 4), 900, 420, { rider: { ...BO, face: 'angry' } });
      dollBike(k, k.lerp(2050, 1000, k.t / 4), 950, 400, { rider: { ...ME, face: 'calm' }, flip: true, frame: 'nu', basket: true, color: '#3a5a5a' });
      sepia(k, 1); k.vignette(0.3);
    } },
    { dur: 4, draw(k) { // câu cá
      lotusHD(k, { time: 'dawn' });
      const { ctx } = k; ctx.fillStyle = '#5a5a3a'; ctx.beginPath(); ctx.moveTo(-50, 820); ctx.quadraticCurveTo(500, 790, 760, 830); ctx.lineTo(760, 1200); ctx.lineTo(-50, 1200); ctx.fill();
      dollFish(k, 420, 830, 420, { ...BO, hat: 'non', face: 'calm', water: 870, cast: 30, bite: k.t > 2.6 ? Math.min(1, (k.t - 2.6) * 2) : 0 });
      sepia(k, 1); k.vignette(0.35);
    } },
  ],
};
function after(k, t) { return k.t > t; }
