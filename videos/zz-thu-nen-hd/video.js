import { house, shade, BA } from '/channel/nhan-gian.js';
import { houseHD, filmGrade } from '/channel/nhan-gian-hd.js';
export default {
  meta: { title: 'thử nền HD', style: 'clean', camera: 0, transition: 'cut', minDuration: 0, scribble: false, gpu: true },
  scenes: [
    { dur: 1.5, draw(k) { house(k, { time: 'dusk' }); k.char(1060, 900, 380, { ...BA, face: 'smug' }); k.vignette(0.45); } },
    { dur: 1.5, draw(k) { houseHD(k, { time: 'dusk' }); k.char(1060, 900, 380, { ...BA, face: 'smug' }); k.vignette(0.4); filmGrade(k, 'dusk'); } },
    { dur: 1.5, draw(k) { houseHD(k, { time: 'night', lit: true }); k.char(1060, 900, 380, { ...BA, face: 'sad' }); shade(k, 0.45, [{ x: 1560, y: 170, r: 1300 }, { x: 960, y: 690, r: 320, warm: 0.8 }]); filmGrade(k, 'night'); } },
    { dur: 1.5, draw(k) { houseHD(k, { time: 'day' }); k.char(1060, 900, 380, { ...BA, face: 'calm' }); k.vignette(0.3); filmGrade(k, 'day'); } },
  ],
};
