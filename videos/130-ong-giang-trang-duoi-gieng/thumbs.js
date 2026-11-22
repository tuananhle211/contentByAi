// Thumbnail Ông Giẳng Ông Giăng: từ khoá + MỘT câu hỏi 2 dòng. A #2 kỳ lạ + #4 ma + #11 tình thân · B #2 + #4 · C #9 bí mật + #11.
import { PAPER, AMBER, shade } from '/channel/nhan-gian.js';
import { soi, thu, phong, sepia } from '/channel/nhan-gian-gieng.js';
export const style = 'clean';
function panel(k) { const { ctx } = k; const g = ctx.createLinearGradient(0, 0, 1180, 0); g.addColorStop(0, 'rgba(6,6,8,0.96)'); g.addColorStop(0.7, 'rgba(6,6,8,0.66)'); g.addColorStop(1, 'rgba(6,6,8,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1180, 1080); }
function title(k, l1, l2) {
  panel(k);
  k.text('TRĂNG DƯỚI', 60, 140, { size: 128, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text('GIẾNG', 60, 275, { size: 128, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text(l1, 60, 450, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
  k.text(l2, 60, 565, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
}
const well = (k, moon, who = 1, x = 460) => k.group({ x, y: 0 }, () => soi(k, { moon, who }));
// A: nhìn xuống giếng, trăng tròn, cái bóng đội mũ lông. "BỐ TÔI Ở NGA, / AI HÁT DƯỚI NÀY?"
export function a(k) { well(k, 300); sepia(k, 0.5); title(k, 'BỐ TÔI Ở NGA,', 'AI HÁT DƯỚI NÀY?'); }
// B: trăng rất to dâng lên miệng giếng. "ĐÊM BA MƯƠI, / SAO GIẾNG CÓ TRĂNG?"
export function b(k) { well(k, 370, 1, 590); sepia(k, 0.5); title(k, 'ĐÊM BA MƯƠI,', 'SAO GIẾNG CÓ TRĂNG?'); }
// C: lá thư + phong bì nước Nga, ánh đèn. "MƯỜI MỘT LÁ THƯ, / AI ĐÃ VIẾT?"
export function c(k) { k.ctx.fillStyle = '#1a130d'; k.ctx.fillRect(0, 0, 1920, 1080); phong(k, 1400, 840, 1.15, { r: 0.08 }); thu(k, 1420, 440, 0.86, { r: 0.05 }); shade(k, 0.3, [{ x: 1420, y: 520, r: 760, warm: 1 }], { vig: 0.45 }); sepia(k, 0.5); title(k, 'MƯỜI MỘT LÁ THƯ,', 'AI ĐÃ VIẾT?'); }
