// Thumbnail "Thầy" giải hạn online Phần 2 — mỗi mẫu ghép ≥ 2 concept (skill concept-truyen-thong), chữ = câu chốt 2 dòng.
import { LOC, LOC_MC, ME, TAM, liveRoom, altarFront, miniLive, tRays, tSticker, tBig, tCircle, tArrow } from '/channel/neu-ban-la.js';
export const style = 'clean';

const CASUAL = { ...LOC_MC, tie: false, color: '#8a6a4f' };
const OLDTAM = { ...TAM, color: '#6b7a45' };
const MOTHER = { ...ME, hairColor: '#a8a29a', color: '#5a6b8a' };
const liveBox = (k, x, y, w, h) => miniLive(k, x, y, w, h, () => { liveRoom(k); k.char(960, 870, 650, { ...LOC, face: 'smug', pose: 'present', shadow: false }); altarFront(k); }, { view: '9.000' });

// A — #13 ngớ ngẩn + #11 cảm động: mẹ bị lừa bằng giọng chính mình. "MẸ BỊ LỪA… / BẰNG GIỌNG CỦA MÌNH?!"
export function a(k) {
  tRays(k, '#7a1414', '#a32020', 700, 640);
  tSticker(k, () => liveBox(k, 1180, 360, 560, 315), 12);
  tSticker(k, () => k.group({ x: 1480, y: 880, s: 1.45 }, () => { const { ctx } = k; ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(-190, -150, 380, 300, 30); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.roundRect(-170, -130, 340, 260, 18); ctx.clip(); ctx.fillStyle = '#c4b8a6'; ctx.fillRect(-170, -130, 340, 260); k.char(0, 300, 520, { ...MOTHER, face: 'cry', tears: 1, pose: 'hold', shadow: false }); ctx.restore(); }), 12);
  tSticker(k, () => k.char(560, 1250, 1000, { ...CASUAL, face: 'shock', tears: 0.6, sweat: true, pose: 'hold', shadow: false }), 16);
  tBig(k, 'MẸ BỊ LỪA…', 960, 120, 112, '#ffffff', { r: -0.03 });
  tBig(k, 'BẰNG GIỌNG CỦA MÌNH?!', 960, 265, 108, '#ffe066', { box: '#14161d', r: -0.03 });
}

// B — #2 kỳ lạ + #9 bật mí: ông già gõ cửa, cầm ảnh mặt mình có râu. "ÔNG GIÀ GÕ CỬA… / TÌM ĐÚNG MẶT MÌNH?!"
export function b(k) {
  tRays(k, '#1d2f5a', '#2a4580', 960, 640);
  tSticker(k, () => k.char(1380, 1250, 950, { ...OLDTAM, face: 'calm', pose: 'hold', flip: true, shadow: false }), 16);
  tSticker(k, () => k.group({ x: 1020, y: 700, s: 2.2, r: -0.08 }, () => { const { ctx } = k; ctx.fillStyle = '#fff'; ctx.fillRect(-90, -110, 180, 220); ctx.save(); ctx.beginPath(); ctx.rect(-78, -98, 156, 170); ctx.clip(); ctx.fillStyle = '#5a1616'; ctx.fillRect(-78, -98, 156, 170); k.char(0, 170, 250, { ...LOC, face: 'smug', pose: 'stand', shadow: false }); ctx.restore(); k.text('THẦY LỘC PHÁT', 0, 92, { size: 16, font: 'title', color: '#c0392b' }); }), 12);
  tSticker(k, () => k.char(380, 1250, 950, { ...CASUAL, face: 'shock', sweat: true, pose: 'hold', shadow: false }), 16);
  tCircle(k, 1020, 640, 150, 170);
  tBig(k, 'ÔNG GIÀ GÕ CỬA…', 960, 120, 112, '#ffffff', { r: -0.03 });
  tBig(k, 'TÌM ĐÚNG MẶT MÌNH?!', 960, 265, 112, '#ffe066', { box: '#d63a2f', r: -0.03 });
}

// C — #9 bật mí + #6 tiền: tài khoản đứng tên mình nhận gần 1 tỷ. "TÀI KHOẢN TÊN MÌNH / NHẬN 1 TỶ?!"
export function c(k) {
  tRays(k, '#3a1d5a', '#55307f', 1300, 600);
  tSticker(k, () => k.group({ x: 1340, y: 720, s: 1, r: -0.05 }, () => { const { ctx } = k; ctx.fillStyle = '#fffdf6'; ctx.beginPath(); ctx.roundRect(-380, -230, 760, 460, 24); ctx.fill(); ctx.fillStyle = '#1f6f4a'; ctx.fillRect(-380, -230, 760, 90); k.text('🏦 TÀI KHOẢN', 0, -185, { size: 48, font: 'title', color: '#fff' }); k.text('NGUYỄN VĂN LỘC', 0, -70, { size: 60, font: 'title', color: '#1b1b24' }); k.text('+ 986.400.000đ', 0, 50, { size: 76, font: 'title', color: '#2e9a55' }); k.text('💳 ❌   🔑 ❌', 0, 150, { size: 50, color: '#c0392b' }); }), 12);
  tSticker(k, () => k.char(470, 1250, 1000, { ...CASUAL, face: 'shock', sweat: true, pose: 'facepalm', shadow: false }), 16);
  tCircle(k, 1340, 650, 330, 70);
  tBig(k, 'TÀI KHOẢN TÊN MÌNH', 960, 120, 108, '#ffffff', { r: -0.03 });
  tBig(k, 'NHẬN GẦN 1 TỶ?!', 960, 265, 120, '#ffe066', { box: '#14161d', r: -0.03 });
}
