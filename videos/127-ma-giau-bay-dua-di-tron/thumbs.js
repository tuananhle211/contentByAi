// Thumbnail Ma Giấu: "MA GIẤU" + MỘT câu hỏi 2 dòng. A #2 kỳ lạ + #4 ma · B #9 bí mật + #4 · C #2 + #4.
import { PAPER, AMBER, shade } from '/channel/nhan-gian.js';
import { vuonNhan, NHAN, TOI, HIEU, MAI, BAN, LANH, ch, batPhan, cuoc, sepia } from '/channel/nhan-gian-magiau.js';
export const style = 'clean';
function panel(k) { const { ctx } = k; const g = ctx.createLinearGradient(0, 0, 1150, 0); g.addColorStop(0, 'rgba(8,6,4,0.94)'); g.addColorStop(0.72, 'rgba(8,6,4,0.6)'); g.addColorStop(1, 'rgba(8,6,4,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1150, 1080); }
function title(k, l1, l2) {
  panel(k);
  k.text('MA GIẤU', 60, 150, { size: 150, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text(l1, 60, 310, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
  k.text(l2, 60, 425, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
}
// A: bọn trẻ đứng dưới gốc nhãn, đứa cuối nhợt nhạt nhìn thẳng. "7 ĐỨA ĐI TRỐN, / SAO 8 ĐỨA VỀ?"
export function a(k) {
  vuonNhan(k, { time: 'dusk', rom: false });
  [[1010, TOI, 400], [1170, HIEU, 440], [1330, MAI, 380], [1480, BAN[0], 380]].forEach(([x, p, h]) => ch(k, x, 1060, h, { ...p, face: 'fear', arms: 'down' }));
  ch(k, 1730, 1060, 400, { ...LANH, face: 'happy', arms: 'down' });
  shade(k, 0.55, [{ x: 1730, y: 780, r: 420 }, { x: 1250, y: 800, r: 620, warm: 1 }], { vig: 0.45 });
  sepia(k, 0.6);
  title(k, '7 ĐỨA ĐI TRỐN,', 'SAO 8 ĐỨA VỀ?');
}
// B: cây nhãn lúc chập tối, cái cuốc cắm bên gốc. "CÂY NHÃN NÀY / MỌC TRÊN CÁI GÌ?"
export function b(k) {
  k.group({ x: 480, y: -90, s: 1.1 }, () => { vuonNhan(k, { time: 'dusk', dig: 0.8, rom: false }); cuoc(k, NHAN.x - 250, 985, 1.3, -0.35); });
  shade(k, 0.5, [{ x: 1560, y: 860, r: 700, warm: 1 }], { vig: 0.45 });
  sepia(k, 0.6);
  title(k, 'CÂY NHÃN NÀY', 'MỌC TRÊN CÁI GÌ?');
}
// C: bát cơm để phần có một thìa đất. "BÁT CƠM ĐỂ PHẦN, / SAO CÓ THÌA ĐẤT?"
export function c(k) {
  k.ctx.fillStyle = '#1e1610'; k.ctx.fillRect(0, 0, 1920, 1080);
  batPhan(k, 1390, 1000, 8, 1);
  shade(k, 0.3, [{ x: 1390, y: 700, r: 760, warm: 1 }], { vig: 0.45 });
  sepia(k, 0.6);
  title(k, 'BÁT CƠM ĐỂ PHẦN,', 'SAO CÓ THÌA ĐẤT?');
}
