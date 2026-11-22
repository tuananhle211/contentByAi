// Thumbnail Cầu Cơ — "CẦU CƠ" + MỘT câu hỏi 2 dòng. A #9 bí mật + #4 ma · B #2 kỳ lạ + #4 · C #2 + #4.
import { PAPER, AMBER, shade } from '/channel/nhan-gian.js';
import { board, coin, boardPos, fingerArm, lopHoc, deskFront, wallShadows, ROOM, candleLight, benDong, BEN, dep, NAM, QUAN, LINH, HAI, ch, sepia } from '/channel/nhan-gian-cauco.js';
export const style = 'clean';
function panel(k) { const { ctx } = k; const g = ctx.createLinearGradient(0, 0, 1100, 0); g.addColorStop(0, 'rgba(8,6,4,0.92)'); g.addColorStop(0.75, 'rgba(8,6,4,0.55)'); g.addColorStop(1, 'rgba(8,6,4,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1100, 1080); }
function title(k, l1, l2) {
  panel(k);
  k.text('CẦU CƠ', 60, 150, { size: 150, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text(l1, 60, 310, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
  k.text(l2, 60, 425, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
}
// A — tờ giấy cầu cơ, đồng xu ở chữ N, bốn ngón tay + một ngón tay xám lạnh. "AI ĐÃ ĐỨNG NHÌN / NÓ CHẾT?"
export function a(k) {
  k.group({ x: 2120, y: 560, s: 1.6 }, () => k.group({ x: -960, y: -520 }, () => {
    board(k, { hi: 'N' }); const [x, y] = boardPos('N');
    coin(k, x, y, 1.3);
    fingerArm(k, [260, 1200], [x - 26, y + 24], { skin: NAM.skin }); fingerArm(k, [1120, -140], [x + 20, y - 30], { skin: QUAN.skin });
    fingerArm(k, [1900, 1220], [x + 12, y + 36], { color: '#7a8a94', skin: '#b8c8cc', alpha: 0.9 });
    shade(k, 0.78, [{ x, y, r: 420, warm: 1 }], { vig: 0.5 });
  }));
  sepia(k, 0.6);
  title(k, 'AI ĐÃ ĐỨNG NHÌN', 'NÓ CHẾT?');
}
// B — bốn đứa quanh ngọn nến, trên tường năm cái bóng. "4 ĐỨA CHƠI, / 5 CÁI BÓNG?"
export function b(k) {
  k.group({ x: 1300, y: 560, s: 1.25 }, () => k.group({ x: -1000, y: -560 }, () => {
    lopHoc(k, {}); for (let i = 0; i < 2; i++) wallShadows(k, [560, 820, 1100, 1360], { extra: 1, extraX: 1230 });
    ch(k, 820, 880, 340, { ...LINH, action: 'sit', face: 'fear', arms: 'hold' }); ch(k, 1100, 880, 370, { ...QUAN, action: 'sit', face: 'blank', arms: 'hold' });
    deskFront(k, {});
    ch(k, 520, 905, 350, { ...NAM, view: 'side', action: 'sit', face: 'shock', arms: 'down' }); ch(k, 1400, 905, 310, { ...HAI, view: 'side', action: 'sit', flip: true, face: 'fear', arms: 'down' });
    shade(k, 0.8, [candleLight(ROOM.candle.x, ROOM.candle.y, 700)], { vig: 0.45 });
  }));
  sepia(k, 0.6);
  title(k, '4 ĐỨA CHƠI,', 'SAO CÓ 5 CÁI BÓNG?');
}
// C — chiếc dép tổ ong xanh ướt dưới gốc sung, bến sông lúc chạng vạng. "DÉP NGƯỜI CHẾT 1 NĂM, / SAO VẪN ƯỚT?"
export function c(k) {
  k.group({ x: 1100, y: 520, s: 1.6 }, () => k.group({ x: -(BEN.sung.x + 300), y: -(BEN.sung.y - 200) }, () => benDong(k, { time: 'dusk' })));
  dep(k, 1420, 720, 3.1, { r: 0.35, wet: 1 });
  shade(k, 0.6, [{ x: 1420, y: 700, r: 520, warm: 1 }], { vig: 0.5 });
  sepia(k, 0.6);
  title(k, 'DÉP CỦA NÓ,', 'SAO VẪN CÒN ƯỚT?');
}
