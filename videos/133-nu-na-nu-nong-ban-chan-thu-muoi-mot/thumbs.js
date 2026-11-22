// Thumbnail Nu Na Nu Nống: từ khoá + MỘT câu hỏi 2 dòng. A #2 kỳ lạ + #4 ma · B #4 + #9 bí mật · C #9 + #11 tình thân.
import { PAPER, AMBER, COLD, shade } from '/channel/nhan-gian.js';
import { benDo, BDO } from '/channel/nhan-gian-babi.js';
import { ME, banChan, chieuGan, anhNhaTre, ch, notRuoi, sepia } from '/channel/nhan-gian-nuna.js';
export const style = 'clean';
const GHOST = { cold: true, four: true, old: true };
function panel(k) { const { ctx } = k; const g = ctx.createLinearGradient(0, 0, 1150, 0); g.addColorStop(0, 'rgba(8,6,4,0.95)'); g.addColorStop(0.7, 'rgba(8,6,4,0.62)'); g.addColorStop(1, 'rgba(8,6,4,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1150, 1080); }
function title(k, l1, l2) {
  panel(k);
  k.text('NU NA', 60, 140, { size: 140, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text('NU NỐNG', 60, 285, { size: 140, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text(l1, 60, 460, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
  k.text(l2, 60, 575, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
}
const skin = ['#e8c09c', '#c8966e', '#ecc8a4', '#f0d0b0', '#e0b48e'];
// A: hàng bàn chân trên chiếu, bàn chân cuối tái lạnh, bốn ngón. "5 ĐỨA NGỒI CHƠI, / SAO 11 BÀN CHÂN?"
export function a(k) { k.group({ x: 300, y: 80 }, () => chieuGan(k, [...skin.flatMap((s) => [{ skin: s, left: true }, { skin: s }]), GHOST], { x0: 420, x1: 1520, s: 0.85, y: 960 })); shade(k, 0.45, [{ x: 1700, y: 760, r: 520 }, { x: 1200, y: 800, r: 700, warm: 1 }], { vig: 0.45 }); sepia(k, 0.5); title(k, '5 ĐỨA NGỒI CHƠI,', 'SAO 11 BÀN CHÂN?'); }
// B: bàn chân bốn ngón cận cảnh. "BÀN CHÂN BỐN NGÓN / LÀ CỦA AI?"
export function b(k) { k.ctx.fillStyle = '#2a1e14'; k.ctx.fillRect(0, 0, 1920, 1080); chieuGan(k, [GHOST], { x0: 1430, x1: 1430, s: 2.9, y: 1060 }); shade(k, 0.35, [{ x: 1430, y: 560, r: 720 }], { vig: 0.45 }); sepia(k, 0.5); title(k, 'BÀN CHÂN BỐN NGÓN', 'LÀ CỦA AI?'); }
// C: ảnh nhà trẻ 1975, khoanh đứa con gái có nốt ruồi. "SAO MẸ TÔI LẠI / CÓ TRONG ẢNH NÀY?"
export function c(k) { k.ctx.fillStyle = '#1e1610'; k.ctx.fillRect(0, 0, 1920, 1080); anhNhaTre(k, 1400, 560, 1.15, { ring: 1, r: 0.04 }); shade(k, 0.3, [{ x: 1400, y: 520, r: 760, warm: 1 }], { vig: 0.45 }); sepia(k, 0.5); title(k, 'SAO MẸ TÔI LẠI', 'CÓ TRONG ẢNH NÀY?'); }
