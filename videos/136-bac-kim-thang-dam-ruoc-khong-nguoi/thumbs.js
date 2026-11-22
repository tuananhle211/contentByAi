// Thumbnail Bắc Kim Thang: từ khoá + MỘT câu hỏi 2 dòng. A #2 kỳ lạ + #4 ma · B #9 bí mật + #4 · C #9 + #11 tình thân.
import { PAPER, AMBER, shade } from '/channel/nhan-gian.js';
import { kinh, KINH, damRuoc, cho, longDen, sepia } from '/channel/nhan-gian-kinh.js';
export const style = 'clean';
function panel(k) { const { ctx } = k; const g = ctx.createLinearGradient(0, 0, 1150, 0); g.addColorStop(0, 'rgba(6,6,10,0.95)'); g.addColorStop(0.7, 'rgba(6,6,10,0.6)'); g.addColorStop(1, 'rgba(6,6,10,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1150, 1080); }
function title(k, l1, l2) {
  panel(k);
  k.text('BẮC KIM', 60, 140, { size: 140, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text('THANG', 60, 285, { size: 140, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text(l1, 60, 460, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
  k.text(l2, 60, 575, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
}
// A: đám rước lồng đèn không người trên bờ kinh đêm trăng. "ĐÁM RƯỚC KHÔNG NGƯỜI, / AI ĐANG HÁT?"
export function a(k) { kinh(k, { time: 'night', moon: true }); shade(k, 0.72, [{ x: 1620, y: 300, r: 900 }], { vig: 0.4 }); k.group({ x: 1250, y: 760, s: 1.45 }, () => k.group({ x: -1250, y: -760 }, () => damRuoc(k, 0, { x0: 1900, n: 8 }))); sepia(k, 0.45); title(k, 'ĐÁM RƯỚC KHÔNG NGƯỜI,', 'AI ĐANG HÁT?'); }
// B: dưới mái chòi treo kín lồng đèn sáng. "38 CÁI LỒNG ĐÈN / LÀM CHO AI?"
export function b(k) { k.group({ x: 400, y: 0 }, () => cho(k, { n: 37, lit: true })); shade(k, 0.5, [{ x: 1400, y: 320, r: 900, warm: 1 }], { vig: 0.4 }); sepia(k, 0.45); title(k, '38 CÁI LỒNG ĐÈN,', 'LÀM CHO AI?'); }
// C: con cá chép giấy kiếng trên cầu bến, nhãn "Bé Rằm". "AI LÀ / BÉ RẰM?"
export function c(k) { k.ctx.fillStyle = '#0a0e16'; k.ctx.fillRect(0, 0, 1920, 1080); longDen(k, 1400, 520, 2.4, 'ca', { stick: false, tag: 1998 }); shade(k, 0.35, [{ x: 1400, y: 520, r: 760, warm: 1 }], { vig: 0.45 }); sepia(k, 0.45); title(k, 'LỒNG ĐÈN GỬI', 'CHO BÉ RẰM LÀ AI?'); }
