// Thumbnail Phần 2 — gây tò mò + đánh vào thị giác, chữ = câu chốt 2 dòng (quy tắc trong skill kenh-neu-ban-la).
import { TOAN, LINH, CHUTICH, HO, phone, zena, houseGate, tRays, tSticker, tBig, tCircle, tArrow } from '/channel/neu-ban-la.js';
export const style = 'clean';

const HO_C = ['#3d7fc1', '#f29bb8', '#6bb56b', '#8a8f98', '#e8b84a', '#8a6a4f'];
const ho = (i, o = {}) => ({ ...HO(HO_C[i % 6], { hair: ['short', 'bun', 'spiky', 'bald', 'perm', 'short'][i % 6], body: [1, 4].includes(i % 6) ? 'chibiGirl' : 'chibi' }), face: 'angry', vein: true, flush: 0.6, pose: i % 2 ? 'shout' : 'point', shadow: false, ...o });

// A — Cả họ vây cổng: chú Toàn hoảng sau song sắt. "CẢ HỌ KÉO ĐẾN / ĐÒI 1,2 TỶ?!"
export function a(k) {
  tRays(k, '#c0262b', '#e0393e', 960, 420);
  for (let i = 0; i < 7; i++) k.char(120 + i * 280, 1180, 620, { ...ho(i), alpha: 0.7 });
  tSticker(k, () => k.char(960, 1330, 1250, { ...TOAN, hat: null, face: 'shock', sweat: true, tears: 0.5, pose: 'shrug', shadow: false }), 16);
  const { ctx } = k; ctx.strokeStyle = '#1b1f26'; ctx.lineWidth = 34; for (const x of [500, 640, 1280, 1420]) { ctx.beginPath(); ctx.moveTo(x, 120); ctx.lineTo(x, 1080); ctx.stroke(); }
  ctx.lineWidth = 40; ctx.beginPath(); ctx.moveTo(480, 120); ctx.lineTo(1440, 120); ctx.stroke();
  tSticker(k, () => k.char(250, 1250, 760, ho(2, { pose: 'fight' })), 12);
  tSticker(k, () => k.char(1680, 1250, 760, ho(4)), 12);
  tBig(k, 'CẢ HỌ KÉO ĐẾN', 960, 800, 116, '#ffffff', { r: -0.03 });
  tBig(k, 'ĐÒI 1,2 TỶ?!', 960, 955, 128, '#ffe066', { box: '#14161d', r: -0.03 });
}

// B — Chủ tịch xách vali lên máy bay, vẫy tay. "CHỦ TỊCH 'ĐI CÔNG TÁC' / RỒI KHÔNG VỀ?!"
export function b(k) {
  tRays(k, '#1d6e8a', '#2a86a6', 1300, 380);
  k.text('✈', 1640, 250, { size: 360, color: '#ffffff', outline: '#14161d', outlineWidth: 18 });
  tSticker(k, () => k.char(1250, 1320, 1250, { ...CHUTICH, face: 'smug', pose: 'wave', cig: true, shadow: false }), 16);
  const { ctx } = k; tSticker(k, () => { ctx.fillStyle = '#5a3a24'; ctx.fillRect(1520, 760, 220, 240); ctx.fillStyle = '#2b2b2b'; ctx.fillRect(1590, 720, 80, 40); }, 10);
  tSticker(k, () => k.char(300, 1250, 760, { ...TOAN, hat: null, face: 'shock', sweat: true, pose: 'shout', shadow: false }), 12);
  tArrow(k, 560, 380, 900, 320);
  tBig(k, 'CHỦ TỊCH "ĐI CÔNG TÁC"', 820, 130, 92, '#ffffff', { r: -0.03 });
  tBig(k, 'RỒI KHÔNG VỀ?!', 820, 265, 110, '#ffe066', { box: '#ff2a2a', r: -0.03 });
}

// C — Bị lừa xong lại có "luật sư" đòi phí: bé Linh giật điện thoại. "BỊ LỪA XONG… / LẠI BỊ LỪA LẦN 2?!"
export function c(k) {
  tRays(k, '#ffcc1a', '#ffe066', 1250, 520);
  tSticker(k, () => phone(k, 1250, 500, 1.35, { r: 0.12, screen: (kk, w, h) => { kk.ctx.fillStyle = '#1f2a44'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.text('LS. THU HỒI ⚖️', 0, -h / 2 + 50, { size: 30, font: 'title', color: '#fff' }); kk.text('Lấy lại 100%', 0, -60, { size: 34, font: 'title', color: '#7fe0a8' }); kk.text('Phí hồ sơ:', 0, 20, { size: 28, color: '#fff' }); kk.text('2.900.000đ', 0, 80, { size: 42, font: 'title', color: '#ff5a4a' }); kk.text('→ USDT', 0, 140, { size: 30, font: 'title', color: '#f2d27a' }); } }), 14);
  tCircle(k, 1260, 600, 230, 120);
  tSticker(k, () => k.char(560, 1450, 1300, { ...TOAN, hat: null, face: 'cry', tears: 1, pose: 'shrug', shadow: false }), 16);
  tSticker(k, () => k.char(1700, 1250, 760, { ...LINH, face: 'angry', vein: true, pose: 'shout', shadow: false }), 12);
  tBig(k, 'BỊ LỪA XONG…', 760, 800, 112, '#ffffff', { r: -0.03 });
  tBig(k, 'LẠI BỊ LỪA LẦN 2?!', 820, 955, 112, '#ffe066', { box: '#ff2a2a', r: -0.03 });
}
