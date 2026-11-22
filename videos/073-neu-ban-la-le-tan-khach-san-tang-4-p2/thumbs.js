// Thumbnail "Tầng 4" Phần 2 — mỗi mẫu ghép ≥ 2 concept (skill concept-truyen-thong), chữ = câu chốt 2 dòng.
import { KHAI, TU, RAU, LINDA, CHANTRAN, phone, sunCurtain, tRays, tSticker, tBig, tCircle, tArrow } from '/channel/neu-ban-la.js';
export const style = 'clean';

const lindaShot = (k, w, h) => { k.ctx.fillStyle = '#e9e4dc'; k.ctx.fillRect(-w / 2, -h / 2, w, h); sunCurtain(k, -w / 2, -h / 2, w * 0.45, h); k.char(w * 0.1, h / 2 + 10, h * 0.8, { ...LINDA, face: 'happy', pose: 'wave', shadow: false }); };

// A — #1 lừa tình + #13 vô lý + #9 bí mật: "Linda" thật ra là gã râu quai nón. "BẠN GÁI CỦA BỐ / LÀ ÔNG RÂU NÀY?!"
export function a(k) {
  tRays(k, '#c0397a', '#de5a96', 1300, 600);
  tSticker(k, () => phone(k, 420, 640, 1.05, { r: -0.1, screen: lindaShot }), 14);
  tSticker(k, () => k.char(1350, 1500, 1350, { ...RAU, face: 'happy', pose: 'wave', flush: 0.6, shadow: false }), 16);
  tArrow(k, 640, 640, 950, 760);
  k.text('❤️', 760, 470, { size: 120 });
  tBig(k, 'BẠN GÁI CỦA BỐ', 960, 120, 110, '#ffffff', { r: -0.03 });
  tBig(k, 'LÀ ÔNG RÂU NÀY?!', 960, 265, 118, '#ffe066', { box: '#14161d', r: -0.03 });
}

// B — #9 bí mật + #8 kẻ yếu: bảng chỉ tiêu, phạt đô. "LỪA KHÔNG ĐỦ / BỊ PHẠT 1.000 $?!"
export function b(k) {
  tRays(k, '#1d2f5a', '#2a4580', 1300, 600);
  tSticker(k, () => { k.rect(980, 360, 820, 600, { fill: '#f4efe6', fillStyle: 'solid', width: 6, seed: 5 }); k.text('🎯 50 người / ngày', 1020, 470, { size: 64, font: 'title', color: '#2e6da4', align: 'left' }); k.text('💵 Lương 700 $', 1020, 600, { size: 64, font: 'title', color: '#2b7a3a', align: 'left' }); k.text('❌ PHẠT 1.000 $', 1020, 760, { size: 84, font: 'title', color: '#d63a2f', align: 'left' }); }, 12);
  tCircle(k, 1290, 760, 330, 90);
  tSticker(k, () => k.char(500, 1500, 1350, { ...CHANTRAN, face: 'cry', tears: 1, sweat: true, pose: 'shrug', shadow: false }), 16);
  tBig(k, 'LỪA KHÔNG ĐỦ…', 960, 120, 112, '#ffffff', { r: -0.03 });
  tBig(k, 'BỊ PHẠT 1.000 $?!', 960, 265, 118, '#ffe066', { box: '#d63a2f', r: -0.03 });
}

// C — #8 + #3: chính tay mua SIM cho kẻ lừa bố mình. "TỰ TAY MUA SIM / CHO KẺ LỪA BỐ MÌNH?!"
export function c(k) {
  tRays(k, '#b3202a', '#d33a3f', 960, 600);
  const { ctx } = k;
  tSticker(k, () => { ctx.save(); ctx.translate(1450, 720); ctx.rotate(0.15); ctx.fillStyle = '#f2c230'; ctx.beginPath(); ctx.roundRect(-220, -140, 440, 280, 18); ctx.fill(); ctx.fillStyle = '#c9a21a'; ctx.fillRect(-70, -50, 140, 100); ctx.restore(); k.text('Lô 7 · K', 1420, 820, { size: 50, font: 'title', color: '#d63a2f' }); }, 12);
  tSticker(k, () => k.char(560, 1500, 1350, { ...KHAI, face: 'shock', sweat: true, tears: 0.6, pose: 'shrug', shadow: false }), 16);
  tSticker(k, () => k.char(1750, 1250, 700, { ...TU, face: 'happy', pose: 'wave', shadow: false }), 12);
  tBig(k, 'TỰ TAY MUA SIM', 960, 120, 112, '#ffffff', { r: -0.03 });
  tBig(k, 'CHO KẺ LỪA BỐ MÌNH?!', 960, 265, 104, '#ffe066', { box: '#14161d', r: -0.03 });
}
