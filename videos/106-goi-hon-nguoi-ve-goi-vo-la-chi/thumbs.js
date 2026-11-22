// Thumbnail Gọi Hồn (bản 2) — tông tối, "GỌI HỒN" + MỘT câu hỏi 2 dòng. A #2 kỳ lạ + #9 bí mật · B #4 tâm linh + #2 · C #4 + #3 tranh cãi.
import { PAPER, AMBER, shade } from '/channel/nhan-gian.js';
import { altarRoomHD, altarLightsHD } from '/channel/nhan-gian-hd-sets.js';
import { BO, ME, medium } from '/channel/nhan-gian-lang.js';
export const style = 'clean';
const PHOTO_BO = (k) => () => k.char(960, 560, 230, { ...BO, face: 'calm', shadow: false });
function title(k, l1, l2) {
  k.text('GỌI HỒN', 60, 150, { size: 160, font: 'title', align: 'left', color: AMBER, outline: '#000', outlineWidth: 14 });
  k.text(l1, 60, 320, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
  k.text(l2, 60, 435, { size: 92, font: 'title', align: 'left', color: PAPER, outline: '#000', outlineWidth: 12 });
}
function photo(k, cx, cy, w, h, who) {
  const { ctx } = k;
  ctx.save();
  ctx.fillStyle = '#2a1a10'; ctx.fillRect(cx - w / 2 - 10, cy - h / 2 - 10, w + 20, h + 20); ctx.strokeStyle = '#c99a3a'; ctx.lineWidth = 6; ctx.strokeRect(cx - w / 2 - 10, cy - h / 2 - 10, w + 20, h + 20);
  ctx.beginPath(); ctx.rect(cx - w / 2, cy - h / 2, w, h); ctx.clip();
  ctx.fillStyle = '#9a9284'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  k.group({ x: cx, y: cy - h * 0.08, s: h / 300 }, () => k.char(0, 150, 250, who));
  ctx.globalCompositeOperation = 'color'; ctx.fillStyle = '#8a6a40'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(200,180,140,0.5)'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  ctx.restore();
}
const UT = { blush: false, shadow: false, plain: true, body: 'kid', outfit: 'tunic', color: '#7a6a52', hair: 'buzz', hairColor: '#1d1712', skin: '#d4a57c', hat: 'non', face: 'happy' };
function sim(k, x, y, s = 1, n = 14) {
  const { ctx } = k;
  for (let i = 0; i < n; i++) {
    const a = k.rand(i + 70) * Math.PI * 2, d = k.rand(i + 71) * 34 * s, px = x + Math.cos(a) * d * 1.5, py = y + Math.sin(a) * d * 0.5;
    const g = ctx.createRadialGradient(px - 4 * s, py - 4 * s, 1, px, py, 13 * s); g.addColorStop(0, '#9a6ab0'); g.addColorStop(0.6, '#4a1f5a'); g.addColorStop(1, '#22102c');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, 12 * s, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(230,240,255,0.55)'; ctx.beginPath(); ctx.arc(px - 4 * s, py - 4 * s, 2.4 * s, 0, Math.PI * 2); ctx.fill();
  }
}
// A — bà đồng khăn đỏ quay về phía người vợ đang cúi đầu. "AI GỌI MẸ TÔI / LÀ CHỊ?"
export function a(k) {
  k.group({ x: 1300, y: 760, s: 1.5 }, () => k.group({ x: -1100, y: -760 }, () => {
    altarRoomHD(k, {}, PHOTO_BO(k));
    medium(k, 960, 940, 360, { turn: 1 });
    k.group({ x: 1400, y: 1010 }, () => k.char(0, 0, 340, { ...ME, face: 'sad', tilt: 0.4, blush: false, shadow: false }));
    shade(k, 0.7, [...altarLightsHD(1.2), { x: 1200, y: 760, r: 420, warm: 0.6 }]);
  }));
  title(k, 'AI GỌI MẸ TÔI', 'LÀ "CHỊ"?');
}
// B — nắm sim tím cạnh bát cơm trên bàn thờ. "NẮM SIM NÀY / TỪ ĐÂU RA?"
export function b(k) {
  k.group({ x: 1360, y: 620, s: 2.6 }, () => k.group({ x: -1000, y: -540 }, () => {
    altarRoomHD(k, {}, PHOTO_BO(k));
    sim(k, 1040, 548, 1);
    shade(k, 0.45, [{ x: 1000, y: 520, r: 500, warm: 0.3 }]);
  }));
  title(k, 'NẮM SIM NÀY', 'TỪ ĐÂU RA?');
}
// C — hai tấm ảnh thờ: người đàn ông và cậu bé đội nón. "NGƯỜI VỀ / LÀ AI?"
export function c(k) {
  k.ctx.fillStyle = '#05060a'; k.ctx.fillRect(0, 0, 1920, 1080);
  photo(k, 1150, 600, 380, 500, { ...BO, face: 'calm', shadow: false, blush: false });
  photo(k, 1640, 650, 330, 430, UT);
  shade(k, 0.4, [{ x: 1380, y: 600, r: 900, warm: 0.5, flicker: 1 }]);
  title(k, 'NGƯỜI VỀ', 'LÀ AI?');
}
