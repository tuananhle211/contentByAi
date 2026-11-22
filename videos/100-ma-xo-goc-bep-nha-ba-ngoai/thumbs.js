// Thumbnail Ma Xó — tông tối, 1 nguồn sáng ấm, chữ = MỘT câu hỏi (2 dòng, ≤ 9 chữ), từ khoá "MA XÓ" to.
// Concept: A #2 kỳ lạ + #4 tâm linh · B #9 bí mật + #11 cảm động · C #4 tâm linh + #14 trẻ em (cậu bé, không gặp nguy).
import { G, PAPER, AMBER, MINH, shade, kitchen, bowl, anklet, broom, oil } from '/channel/nhan-gian.js';
export const style = 'clean';

const zoom = (k, cx, cy, s, fn) => k.group({ x: cx, y: cy, s }, () => k.group({ x: -cx, y: -cy }, fn));
function title(k, l1, l2, x = 60, align = 'left') {
  k.text('MA XÓ', x, 150, { size: 170, font: 'title', align, color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text(l1, x, 330, { size: 96, font: 'title', align, color: PAPER, outline: '#000', outlineWidth: 12 });
  k.text(l2, x, 450, { size: 96, font: 'title', align, color: PAPER, outline: '#000', outlineWidth: 12 });
}

// A — Bát cơm con + đũa ngắn trong xó tối, hai đốm mắt sau lưng. "AI ĂN / BÁT CƠM NÀY?"
export function a(k) {
  zoom(k, 1480, 830, 2.6, () => {
    kitchen(k, { fire: 0, bowl: false });
    bowl(k, 1530, 896, 1.6);
    k.glowEyes(1650, 770, 0.55, '#ffe9a8');
    shade(k, 0.82, [{ x: 1530, y: 860, r: 330, warm: 1 }, { x: 1650, y: 770, r: 120 }]);
  });
  title(k, 'AI ĂN', 'BÁT CƠM NÀY?');
}

// B — Hai chiếc vòng bạc MINH / ÚT cùng ngày sinh. "HAI CHIẾC VÒNG / CÙNG NGÀY SINH?"
export function b(k) {
  k.ctx.fillStyle = '#07080c'; k.ctx.fillRect(0, 0, 1920, 1080);
  anklet(k, 1180, 720, 250, 'MINH · 14.3.1983', { size: 40 });
  anklet(k, 1560, 560, 250, 'ÚT · 14.3.1983', { tarnish: 1, size: 40, rot: 0.15 });
  shade(k, 0.5, [{ x: 1400, y: 640, r: 900, warm: 0.4 }]);
  title(k, 'HAI CHIẾC VÒNG', 'CÙNG NGÀY SINH?');
}

// C — Cậu bé cầm chổi trước góc tối, đèn dầu trên chum. "BÀ CẤM QUÉT / GÓC BẾP NÀY?"
export function c(k) {
  zoom(k, 1400, 760, 1.6, () => {
    kitchen(k, { fire: 0 });
    oil(k, 1230, G - 352, 0.8);
    k.char(1400, G, 330, { ...MINH, face: 'shock', pose: 'hold', look: 1 });
    broom(k, 1470, G - 230, 0.6, 0.4);
    k.glowEyes(1620, 770, 0.3, '#ffe9a8');
    shade(k, 0.85, [{ x: 1230, y: G - 430, r: 380, warm: 1 }, { x: 1560, y: 830, r: 160 }]);
  });
  title(k, 'BÀ CẤM QUÉT', 'GÓC BẾP NÀY?');
}
