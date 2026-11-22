// Thumbnail Ông Kẹ: từ khoá + MỘT câu hỏi 2 dòng. A #2 kỳ lạ + #4 ma · B #9 bí mật + #4 · C #9 + #11 tình thân.
import { PAPER, AMBER, shade, oil } from '/channel/nhan-gian.js';
import { tu, cua, CUA, go, nha, NHA, bat, chiaKhoa, sepia } from '/channel/nhan-gian-ke.js';
export const style = 'clean';
function panel(k) { const { ctx } = k; const g = ctx.createLinearGradient(0, 0, 1150, 0); g.addColorStop(0, 'rgba(6,6,10,0.95)'); g.addColorStop(0.7, 'rgba(6,6,10,0.6)'); g.addColorStop(1, 'rgba(6,6,10,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1150, 1080); }
function title(k, l1, l2) {
  panel(k);
  k.text('ÔNG KẸ', 60, 190, { size: 170, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text(l1, 60, 400, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
  k.text(l2, 60, 515, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
}
// Vòng sóng tiếng gõ tĩnh (thumbnail không có thời gian).
function rings(k, x, y, col, n = 3, r0 = 60) { const { ctx } = k; for (let i = 0; i < n; i++) { ctx.strokeStyle = `rgba(${col},${0.8 - i * 0.22})`; ctx.lineWidth = 9 - i * 2; ctx.beginPath(); ctx.arc(x, y, r0 + i * 70, 0, Math.PI * 2); ctx.stroke(); } }
// A: cái tủ gỗ trong ánh đèn dầu, vòng tiếng gõ từ bên trong. "TIẾNG GÕ THỨ TƯ / TỪ ĐÂU RA?"
export function a(k) { k.ctx.fillStyle = '#1a120c'; k.ctx.fillRect(0, 0, 1920, 1080); tu(k, 1420, 1060, 1.42, { items: false }); oil(k, 1040, 1060, 1.3); shade(k, 0.6, [{ x: 1300, y: 640, r: 820, warm: 1 }], { vig: 0.4 }); rings(k, 1420, 560, '190,214,236'); sepia(k, 0.45); title(k, 'TIẾNG GÕ THỨ TƯ', 'TỪ TRONG TỦ?'); }
// B: cửa gỗ đêm, ba vòng gõ. "AI GÕ CỬA NHÀ TÔI / SUỐT 28 NĂM?"
export function b(k) { k.group({ x: 420, y: 0 }, () => cua(k)); shade(k, 0.68, [{ x: 1380, y: 480, r: 760 }], { vig: 0.4 }); for (let i = 0; i < 3; i++) rings(k, 1380, 300 + i * 190, '240,220,170', 2, 40); sepia(k, 0.45); title(k, 'AI GÕ CỬA NHÀ TÔI', 'SUỐT 28 NĂM?'); }
// C: cái bát men xanh sứt miệng + chìa khoá đồng. "BÀ TÔI GIẤU AI / TRONG CÁI TỦ NÀY?"
export function c(k) { k.ctx.fillStyle = '#140e0a'; k.ctx.fillRect(0, 0, 1920, 1080); bat(k, 1400, 760, 4.2); chiaKhoa(k, 1680, 420, 2.2); shade(k, 0.38, [{ x: 1400, y: 600, r: 760, warm: 1 }], { vig: 0.45 }); sepia(k, 0.45); title(k, 'BÀ TÔI GIẤU AI', 'TRONG CÁI TỦ NÀY?'); }
