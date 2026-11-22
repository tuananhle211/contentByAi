// Thumbnail "Tầng 4" Phần 1 — mỗi mẫu ghép ≥ 2 concept (skill concept-truyen-thong), chữ = câu chốt 2 dòng.
import { KHAI, LY, CHANTRAN, cashBag, dollar, sunCurtain, tRays, tSticker, tBig, tCircle, tArrow } from '/channel/neu-ban-la.js';
export const style = 'clean';

// Nút thang máy số 4 dán băng keo đỏ.
function btn4(k, x, y, s = 1) {
  k.group({ x, y, s }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#2b2f36'; ctx.beginPath(); ctx.roundRect(-150, -150, 300, 300, 30); ctx.fill();
    ctx.fillStyle = '#ffb74d'; ctx.beginPath(); ctx.arc(0, 0, 110, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff3d6'; ctx.beginPath(); ctx.arc(0, 0, 90, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.globalAlpha = 0.75; ctx.strokeStyle = '#d63a2f'; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-125, -125); ctx.lineTo(125, 125); ctx.moveTo(125, -125); ctx.lineTo(-125, 125); ctx.stroke(); ctx.restore();
    k.text('4', 0, 6, { size: 170, font: 'title', color: '#1b1b24', outline: '#fff3d6', outlineWidth: 18 });
  });
}

// A — #9 bí mật + #6 tiền: nút 4 bị cấm + túi tiền. "THUÊ TRỌN KHÁCH SẠN / CẤM LÊN TẦNG 4?!"
export function a(k) {
  tRays(k, '#b3202a', '#d33a3f', 1350, 400);
  tSticker(k, () => btn4(k, 1420, 380, 1.25), 14);
  tCircle(k, 1420, 380, 250, 250);
  tSticker(k, () => cashBag(k, 1450, 960, 1.1, { open: 1 }), 12);
  tSticker(k, () => k.char(560, 1500, 1400, { ...KHAI, face: 'shock', sweat: true, pose: 'shrug', shadow: false }), 16);
  tBig(k, 'THUÊ TRỌN KHÁCH SẠN', 760, 130, 100, '#ffffff', { r: -0.03 });
  tBig(k, 'CẤM LÊN TẦNG 4?!', 760, 275, 118, '#ffe066', { box: '#14161d', r: -0.03 });
}

// B — #6 tiền + #13 vô lý: ôm xấp đô, miệng kéo khoá. "LƯƠNG GẤP 3 / CHỈ CẦN ĐỪNG HỎI?!"
export function b(k) {
  tRays(k, '#1f7a4a', '#2e9a5e', 960, 600);
  for (let i = 0; i < 9; i++) tSticker(k, () => dollar(k, 300 + i * 170, 900 - (i % 3) * 40, 1.1, -0.4 + (i % 4) * 0.25), 8);
  tSticker(k, () => k.char(960, 1480, 1300, { ...KHAI, face: 'laugh', pose: 'cheer', flush: 0.5, shadow: false }), 16);
  k.text('🤐', 1500, 560, { size: 220 });
  tSticker(k, () => k.char(1680, 1250, 760, { ...LY, face: 'smug', pose: 'point', shadow: false }), 12);
  tBig(k, 'LƯƠNG GẤP 3', 960, 130, 120, '#ffffff', { r: -0.03 });
  tBig(k, 'CHỈ CẦN ĐỪNG HỎI?!', 960, 280, 110, '#ffe066', { box: '#d63a2f', r: -0.03 });
}

// C — #2 kỳ lạ + #8 kẻ yếu: cậu chân trần chạy xuống lúc 3 giờ sáng. "3 GIỜ SÁNG / CÓ NGƯỜI CHÂN TRẦN CHẠY XUỐNG?!"
export function c(k) {
  tRays(k, '#1d2f5a', '#2a4580', 600, 600);
  const { ctx } = k;
  tSticker(k, () => { ctx.fillStyle = '#3fb86a'; ctx.fillRect(160, 380, 260, 80); k.text('EXIT', 290, 422, { size: 60, font: 'title', color: '#fff' }); }, 10);
  tSticker(k, () => k.char(560, 1350, 1150, { ...CHANTRAN, face: 'cry', tears: 1, sweat: true, pose: 'shout', flip: true, shadow: false }), 16);
  tSticker(k, () => k.char(1450, 1350, 1000, { ...KHAI, face: 'shock', sweat: true, pose: 'shrug', shadow: false }), 14);
  tArrow(k, 1000, 640, 760, 760);
  tBig(k, '3 GIỜ SÁNG…', 960, 120, 110, '#ffffff', { r: -0.03 });
  tBig(k, 'CÓ NGƯỜI CHÂN TRẦN CHẠY XUỐNG?!', 960, 270, 78, '#ffe066', { box: '#d63a2f', r: -0.03 });
}
