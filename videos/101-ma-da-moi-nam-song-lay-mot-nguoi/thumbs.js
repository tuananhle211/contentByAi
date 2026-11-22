// Thumbnail Ma Da — tông tối, chữ "MA DA" + MỘT câu hỏi 2 dòng. A #4 tâm linh + #9 bí mật (cả làng đứng nhìn) · B #2 kỳ lạ · C #4 + #11.
import { PAPER, AMBER, shade, cold } from '/channel/nhan-gian.js';
import { BO, THANG, MOON, riverWide, torchCrowd, wader, strawman, sanRoom, SAN, underwater, paleHand } from '/channel/nhan-gian-song.js';
export const style = 'clean';
function title(k, l1, l2) {
  k.text('MA DA', 60, 150, { size: 170, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text(l1, 60, 330, { size: 96, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
  k.text(l2, 60, 450, { size: 96, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
}
// A — người lội giữa sông đêm, cả làng cầm đuốc đứng trên bờ. "CẢ LÀNG / ĐỨNG NHÌN?"
export function a(k) {
  riverWide(k, { time: 'night' });
  const L = torchCrowd(k, 80, 1000, 1000, 9, { h: 360 });
  wader(k, 1450, 700, 700, { ...BO, face: 'sad' }, 0.55);
  shade(k, 0.6, [{ x: MOON.x, y: MOON.y, r: 1200 }, ...L, { x: 1450, y: 520, r: 480 }]);
  title(k, 'CẢ LÀNG', 'ĐỨNG NHÌN?');
}
// B — người rơm ướt sũng ở cửa, tay cầm mái chèo xanh. "SÔNG TRẢ VỀ / NGƯỜI THẾ MẠNG?"
export function b(k) {
  k.group({ x: 1600, y: 640, s: 1.5 }, () => k.group({ x: -1700, y: -640 }, () => { sanRoom(k, { day: false }); strawman(k, 1700, SAN.y, 460, { wet: true, blank: true, paddle: true }); shade(k, 0.6, [{ x: 1700, y: 600, r: 500 }]); }));
  title(k, 'SÔNG TRẢ VỀ', 'NGƯỜI THẾ MẠNG?');
}
// C — bàn tay nhỏ nắm cổ chân dưới nước. "AI NẮM CHÂN TÔI / RỒI BUÔNG RA?"
export function c(k) {
  underwater(k);
  k.char(1350, 1000, 900, { ...THANG, face: 'shock', pose: 'cheer' });
  paleHand(k, 1300, 1030, 2.6, 0.2, 0.85);
  cold(k, 0.4); k.vignette(0.6);
  title(k, 'AI NẮM CHÂN', 'RỒI BUÔNG RA?');
}
