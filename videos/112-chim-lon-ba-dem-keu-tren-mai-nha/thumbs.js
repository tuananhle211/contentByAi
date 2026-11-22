// Thumbnail Chim Lợn — tông tối, "CHIM LỢN" + MỘT câu hỏi 2 dòng. A #4 tâm linh + #2 kỳ lạ · B #9 bí mật + #2 · C #3 tranh cãi + #4.
import { PAPER, AMBER, shade } from '/channel/nhan-gian.js';
import { xom, xomProps, XOM, chimLon, table, slingshot, hedge, lampLight, TU_AO } from '/channel/nhan-gian-hd-xom.js';
export const style = 'clean';
function title(k, l1, l2) {
  k.text('CHIM LỢN', 60, 150, { size: 160, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text(l1, 60, 320, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
  k.text(l2, 60, 435, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
}
// A — chim lợn trắng trên đầu hồi mái rạ dưới trăng. "BA ĐÊM KÊU / NHƯNG AI CHẾT?"
export function a(k) {
  k.group({ x: 1340, y: 560, s: 2.4 }, () => k.group({ x: -XOM.ourGable.x, y: -XOM.ourGable.y + 40 }, () => {
    xom(k, { time: 'night' });
    chimLon(k, XOM.ourGable.x, XOM.ourGable.y, 1.05, { glow: 0.9 });
    shade(k, 0.6, [{ x: XOM.ourGable.x, y: XOM.ourGable.y - 60, r: 320 }, { x: 1560, y: 170, r: 900 }]);
  }));
  title(k, 'BA ĐÊM KÊU,', 'NHƯNG AI CHẾT?');
}
// B — ghế mây, đèn bão, hai chén rượu (một đầy, một cạn). "HAI CHÉN RƯỢU / AI ĐÃ UỐNG?"
export function b(k) {
  k.group({ x: 1420, y: 720, s: 5 }, () => k.group({ x: -XOM.table.x, y: -XOM.table.y + 92 }, () => {
    xom(k, { time: 'night' });
    xomProps(k, { lamp: 1, chair: false, cups: [true, false] });
    shade(k, 0.6, [{ x: XOM.table.x, y: XOM.table.y - 100, r: 160, warm: 1, flicker: 1 }]);
  }));
  title(k, 'HAI CHÉN RƯỢU,', 'AI ĐÃ UỐNG?');
}
// C — súng cao su + bóng chim bay qua bờ rào dâm bụt. "MỘT HÒN SỎI / ĐỔI MỘT MẠNG?"
export function c(k) {
  k.group({ x: 1250, y: 620, s: 1.5 }, () => k.group({ x: -950, y: -560 }, () => {
    xom(k, { time: 'night' });
    xomProps(k, { lamp: 1, sitter: { ...TU_AO, face: 'blank', flip: true } });
    chimLon(k, 1150, 360, 0.8, { fly: 1, glow: 0.9 });
    shade(k, 0.66, [{ x: 1150, y: 300, r: 340 }, lampLight(1.1)]);
  }));
  slingshot(k, 1450, 860, 4.5, 0.25);
  title(k, 'MỘT HÒN SỎI', 'ĐỔI MỘT MẠNG?');
}
