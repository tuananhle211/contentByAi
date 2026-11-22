// Thumbnail Ông Ba Bị: "ÔNG BA BỊ" + MỘT câu hỏi 2 dòng. A #4 ma + #2 kỳ lạ · B #2 + #11 cảm động · C #9 bí mật + #4.
import { PAPER, AMBER, shade } from '/channel/nhan-gian.js';
import { bi, giay, gocDa, vuonNa, NA, congNha, CONG, ongGia, sepia } from '/channel/nhan-gian-babi.js';
export const style = 'clean';
function panel(k) { const { ctx } = k; const g = ctx.createLinearGradient(0, 0, 1150, 0); g.addColorStop(0, 'rgba(8,6,4,0.94)'); g.addColorStop(0.72, 'rgba(8,6,4,0.6)'); g.addColorStop(1, 'rgba(8,6,4,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1150, 1080); }
function title(k, l1, l2) {
  panel(k);
  k.text('ÔNG BA BỊ', 60, 150, { size: 136, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text(l1, 60, 310, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
  k.text(l2, 60, 425, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
}
// A: cái bị chín quai, góc chăn hoa thò ra. "TRONG BỊ CÓ TIẾNG / GỌI MẸ?"
export function a(k) {
  gocDa(k, { time: 'dusk', quan: false });
  bi(k, 1400, 1040, 2.9, { eyes: 0.85, chan: true });
  shade(k, 0.62, [{ x: 1400, y: 560, r: 720, warm: 1 }], { vig: 0.5 });
  sepia(k, 0.6);
  title(k, 'TRONG BỊ CÓ TIẾNG', 'GỌI MẸ?');
}
// B: đôi giày len hồng lấm bùn dưới gốc na. "GIÀY MẸ ĐÃ ĐỐT, / SAO CÒN Ở ĐÂY?"
export function b(k) {
  k.group({ x: 1000, y: 200, s: 1.3 }, () => k.group({ x: -NA.x + 200, y: -300 }, () => vuonNa(k, { time: 'dusk' })));
  giay(k, 1420, 930, 3.3, { mud: 0.75 });
  shade(k, 0.62, [{ x: 1420, y: 760, r: 640, warm: 1 }], { vig: 0.5 });
  sepia(k, 0.6);
  title(k, 'GIÀY MẸ ĐÃ ĐỐT,', 'SAO CÒN Ở ĐÂY?');
}
// C: ông già đội nón đứng ngoài cổng lúc chập tối. "NHÀ TÔI HAI ĐỨA, / SAO ÔNG BẢO BA?"
export function c(k) {
  k.group({ x: -30, y: -210, s: 1.36 }, () => congNha(k, { time: 'dusk' }, () => ongGia(k, CONG.gate + 30, 830, 560, { view: 'side', flip: true, face: 'blank', arms: 'point' })));
  shade(k, 0.5, [{ x: 1430, y: 460, r: 760, warm: 1 }], { vig: 0.5 });
  sepia(k, 0.6);
  title(k, 'NHÀ TÔI HAI ĐỨA,', 'SAO ÔNG BẢO BA?');
}
