// Thumbnail "Thầy" giải hạn online Phần 1 — mỗi mẫu ghép ≥ 2 concept (skill concept-truyen-thong), chữ = câu chốt 2 dòng.
import { LOC, LOC_MC, qrCard, altarFront, liveRoom, miniLive, tRays, tSticker, tBig, tCircle, tArrow } from '/channel/neu-ban-la.js';
export const style = 'clean';

const beard = (k, x, y, s, r = 0) => k.group({ x, y, s, r }, () => { const { ctx } = k; ctx.fillStyle = '#d9d4cc'; ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-40, -40); ctx.quadraticCurveTo(0, 120, 40, -40); ctx.quadraticCurveTo(0, -20, -40, -40); ctx.fill(); ctx.stroke(); });

// A — #4 tâm linh (vạch trò) + #6 tiền: thầy râu dán + QR 100 triệu. "LIVESTREAM 3 TIẾNG / CHỐT 100 TRIỆU?!"
export function a(k) {
  tRays(k, '#7a1414', '#a32020', 700, 640);
  tSticker(k, () => qrCard(k, 1500, 720, 1.35, { amount: '100 triệu', note: 'ND: họ tên + năm sinh' }), 12);
  tSticker(k, () => k.char(620, 1250, 1000, { ...LOC, face: 'smug', pose: 'present', beardPeel: 0.35, sweat: true, shadow: false }), 16);
  tCircle(k, 640, 880, 120, 150);
  k.text('👻', 1180, 520, { size: 130 });
  tBig(k, 'LIVESTREAM 3 TIẾNG', 960, 120, 108, '#ffffff', { r: -0.03 });
  tBig(k, 'CHỐT 100 TRIỆU?!', 960, 265, 120, '#ffe066', { box: '#14161d', r: -0.03 });
}

// B — #13 ngớ ngẩn + #9 bật mí: râu rơi giữa live mà càng bán chạy. "RÂU RƠI GIỮA LIVE… / CÀNG BÁN ĐƯỢC?!"
export function b(k) {
  tRays(k, '#1d2f5a', '#2a4580', 960, 640);
  tSticker(k, () => k.char(700, 1250, 1000, { ...LOC, beard: false, face: 'shout', pose: 'wave', vein: true, shadow: false }), 16);
  tSticker(k, () => beard(k, 1320, 640, 3, 0.4), 12);
  tArrow(k, 1560, 900, 1380, 760);
  k.text('💸💸💸', 1600, 980, { size: 90 });
  tBig(k, 'RÂU RƠI GIỮA LIVE…', 960, 120, 108, '#ffffff', { r: -0.03 });
  tBig(k, 'CÀNG BÁN ĐƯỢC?!', 960, 265, 120, '#ffe066', { box: '#d63a2f', r: -0.03 });
}

// C — #2 kỳ lạ + #9: đang ngủ mà mặt mình vẫn live trên 3 kênh. "ĐANG NGỦ… / MẶT MÌNH VẪN ĐANG LIVE?!"
export function c(k) {
  tRays(k, '#3a1d5a', '#55307f', 1300, 600);
  tSticker(k, () => miniLive(k, 980, 380, 860, 484, () => { liveRoom(k); k.char(960, 900, 650, { ...LOC, face: 'smug', pose: 'point', shadow: false }); altarFront(k); }, { view: '3.000' }), 12);
  tSticker(k, () => k.char(440, 1250, 1000, { ...LOC_MC, tie: false, color: '#8a6a4f', face: 'shock', tears: 0.5, sweat: true, pose: 'hold', shadow: false }), 16);
  tCircle(k, 1410, 700, 95, 80);
  tBig(k, 'ĐANG NGỦ…', 960, 120, 112, '#ffffff', { r: -0.03 });
  tBig(k, 'MẶT MÌNH VẪN ĐANG LIVE?!', 960, 265, 100, '#ffe066', { box: '#14161d', r: -0.03 });
}
