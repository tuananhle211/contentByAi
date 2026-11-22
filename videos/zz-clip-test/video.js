// Video THỬ k.clip (không đăng): cảnh 1–2 clip nguyên khung không zoom (để đo chất lượng), cảnh 3–4 cách dùng thật (vẽ chồng, khung nhỏ).
import { P, space, ocean, chip, label, bigNum } from '/channel/hat-bui-xanh.js';
export default {
  meta: { title: 'Thử clip', style: 'clean', transition: 'cut', camera: 0, scribble: false, sfxTransitions: false, paper: P.space },
  scenes: [
    { dur: 6, draw(k) { k.clip('trai-dat-ve-tinh', 0, 0, k.W, k.H, { zoom: [1, 1], credit: false }); } },
    { dur: 6, draw(k) { k.clip('ca-bien-sau', 0, 0, k.W, k.H, { zoom: [1, 1], credit: false }); } },
    { dur: 6, draw(k) {
      space(k);
      k.clip('iss-trai-dat', 560, 180, 1120, 630, { radius: 24, border: [P.cream, 6], p: k.at(0.2, 0.6) });
      chip(k, 'VIDEO THẬT · ISS', 60, 70, { bg: P.gold });
      label(k, 'Trái Đất nhìn từ trạm vũ trụ', 360, 900, 0.5, { size: 50 });
    } },
    { dur: 6, draw(k) {
      k.clip('ca-bien-sau', 0, 0, k.W, k.H, { zoom: [1, 1.04], dim: 0.15 });
      chip(k, 'VIDEO THẬT · NOAA', 60, 70, { bg: P.gold });
      k.arrow(1500, 220, 1150, 470, { stroke: P.gold, width: 8, p: k.at(1, 0.8), seed: 7 });
      bigNum(k, 'BIỂN SÂU', 1500, 160, 1, { size: 80 });
    } },
  ],
};
