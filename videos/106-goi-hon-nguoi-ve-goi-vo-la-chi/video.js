// Nhân Gian Chưa Kể — tập 3: Gọi Hồn | Người Về Lại Gọi Vợ Mình Là Chị. Kịch bản bản 2, duyệt 15/11: kich-ban.md.
// Một giọng người kể, kể liền mạch. Không giải thích khoa học, không ai dàn dựng: mập mờ "người về là bố hay cậu Út", kết để mở.
// Tục gọi hồn sau 49 ngày + tục "xin đường" của cánh lái xe, kể dưới dạng "làng tôi có tục". Truyện hư cấu, tên người tên làng hư cấu.
// Hình: bộ phông HD (channel/nhan-gian-hd*.js) + nhân vật có khối, vẽ bằng GPU. Bản 1 (bị bỏ): video-v1-bi-che.js.txt.
import * as thumbs from '/videos/106-goi-hon-nguoi-ve-goi-vo-la-chi/thumbs.js';
import { PAPER, AMBER, COLD, INK, shade, cold, tag, quote, chapter, rules, oil, bowl, nextScene, subScene } from '/channel/nhan-gian.js';
import { houseHD, filmGrade, cached, sky, landscape, bambooClump, bambooFence, grass } from '/channel/nhan-gian-hd.js';
import { charHD, kitchenHD, KITCHEN_HD, altarRoomHD, altarLightsHD, nhaTrongHD, lotusHD, quanHD, highwayHD, passHD } from '/channel/nhan-gian-hd-sets.js';
import {
  HUY, BO, ME, BA_NOI, CHU_TU, CHU_THINH, BA_HAI, LIEN, BIN, DAN,
  medium, truck, rod, bike, receipt,
} from '/channel/nhan-gian-lang.js';

// ---------- nhân vật & phông ----------
const UT = { blush: false, shadow: false, plain: true, body: 'kid', outfit: 'tunic', color: '#7a6a52', hair: 'buzz', hairColor: '#1d1712', skin: '#d4a57c', hat: 'non' };
const ME_TRE = { ...ME, hair: 'long' };
const BO_TRE = { ...BO, stubble: false };
const ch = (k, x, y, h, o) => charHD(k, x, y, h, o);
const PHOTO_BO = (k) => () => k.char(960, 560, 230, { ...BO, face: 'calm', shadow: false });
const altarRoom = (k, o = {}) => { altarRoomHD(k, o, PHOTO_BO(k)); if (o.ut) photo(k, 1225, 465, 104, 136, UT_PIC, o.ut); };
const altarLights = altarLightsHD;
const kitchen = kitchenHD, KITCHEN = KITCHEN_HD, house = houseHD, nhaTrong = nhaTrongHD, lotus = lotusHD, pass = passHD;
const quan = (k, o = {}) => quanHD(k, o, () => { k.char(1460, 830, 230, { ...BO, face: 'happy', pose: 'hold', shadow: false }); k.char(1500, 790, 115, { ...BIN, face: 'happy', shadow: false }); });
const highway = (k, x, o = {}) => { highwayHD(k, o); if (o.rider) bike(k, x, 880, 1, o.rider); };
const zoom = (k, cx, cy, s, fn) => k.group({ x: cx, y: cy, s }, () => k.group({ x: -cx, y: -cy }, fn));
const lie = (k, x, y, h, o) => k.group({ x, y, r: -Math.PI / 2 }, () => ch(k, 0, 0, h, o));
const black = (k) => { k.ctx.fillStyle = '#05060a'; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); };
const after = (k, c, off = 0) => k.t > k.cue(c, off);
const kneel = (k, x, y, h, o) => k.group({ x, y }, () => ch(k, 0, 0, h * 0.72, o));

// Buổi gọi hồn: bà đồng trước bàn thờ, cả nhà quỳ sau. o.turn hướng khăn (-1 về phía mẹ, 1 về phía tôi), o.shake, o.dark.
function seance(k, o = {}) {
  altarRoom(k, {});
  medium(k, 960, 940, 360, { shake: o.shake ?? 0, turn: o.turn ?? 0, slump: o.slump ?? 0 });
  kneel(k, 560, 1010, 470, { ...BA_NOI, face: o.baFace ?? 'sad', tears: o.baTears ?? 0, pose: 'hold' });
  kneel(k, 360, 1010, 440, { ...ME, face: o.meFace ?? 'blank', tilt: o.meDown ? 0.35 : 0 });
  kneel(k, 1360, 1010, 470, { ...CHU_THINH, face: o.thFace ?? 'blank', flip: true });
  kneel(k, 1560, 1010, 330, { ...HUY, face: o.huyFace ?? 'sad', flip: true });
  shade(k, o.dark ?? 0.72, [...altarLights(1), { x: 960, y: 700, r: 360, warm: 0.6 }]);
}

// Đầu ngõ ban đêm: lối đất giữa hai bụi tre, hai trụ cổng gạch ở tiền cảnh.
function lane(k) {
  const { ctx, W, H } = k;
  cached(k, `lane|${W}`, () => { const ctx = k.ctx;
    sky(k, 'night', 600); landscape(k, 'night', 600);
    ctx.fillStyle = '#221d17'; ctx.beginPath(); ctx.moveTo(880, 610); ctx.lineTo(1040, 610); ctx.lineTo(1560, H + 60); ctx.lineTo(360, H + 60); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 3; for (let i = 0; i < 14; i++) { const y = 640 + i * 32; ctx.beginPath(); ctx.moveTo(960 - (y - 600) * 0.95 + k.rand(i) * 60, y); ctx.lineTo(960 - (y - 600) * 0.6 + k.rand(i + 3) * 60, y + 4); ctx.stroke(); }
    bambooFence(k, -200, 860, 680, 110, '#0e0b08'); bambooFence(k, 1060, W + 200, 680, 110, '#0e0b08');
    bambooClump(k, 260, 700, 560, '#121810', 3); bambooClump(k, 1680, 700, 600, '#121810', 4); bambooClump(k, 640, 660, 360, '#0f140d', 7); bambooClump(k, 1300, 660, 380, '#0f140d', 8);
    for (let i = 0; i < 18; i++) grass(k, 380 + k.rand(i + 40) * 300, 900 + k.rand(i + 41) * 160, 0.9, '#1a2416', i);
    for (let i = 0; i < 18; i++) grass(k, 1260 + k.rand(i + 60) * 320, 900 + k.rand(i + 61) * 160, 0.9, '#1a2416', i + 20);
    for (const px of [150, 1680]) { ctx.fillStyle = '#4a3428'; ctx.fillRect(px, 420, 110, 700); ctx.fillStyle = '#5a4030'; ctx.fillRect(px - 14, 400, 138, 34); ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 2; for (let y = 450; y < 1080; y += 36) { ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px + 110, y); ctx.stroke(); } }
  });
}
// Buồng ngủ ban đêm: giường gỗ, gối, màn; who nằm trùm chăn (null = giường trống).
function bedroom(k, who, h = 330) {
  nhaTrong(k, { chong: false });
  const { ctx } = k, hx = 1100 - h * 0.85;
  ctx.fillStyle = '#3a2618'; ctx.fillRect(500, 790, 740, 44); for (const lx of [516, 1200]) ctx.fillRect(lx, 834, 26, 70);
  ctx.fillStyle = '#4a3020'; ctx.fillRect(490, 660, 30, 240); ctx.fillStyle = '#c9b8a0'; ctx.fillRect(500, 780, 740, 14);
  ctx.fillStyle = '#d8cdb8'; ctx.beginPath(); ctx.ellipse(who ? hx : 640, 782, 70, 18, 0, 0, Math.PI * 2); ctx.fill();
  if (who) lie(k, 1100, 752, h, who);
  ctx.fillStyle = '#6a4a5a'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(who ? 1100 - h * 0.66 : 720, who ? 700 : 742, who ? h * 0.66 + 40 : 480, who ? 92 : 48, 22); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(90,60,80,0.6)'; ctx.lineWidth = 2; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo((who ? 1100 - h * 0.66 : 720) + i * 50, who ? 704 : 746); ctx.lineTo((who ? 1100 - h * 0.66 : 720) + i * 50 - 10, 788); ctx.stroke(); }
  ctx.fillStyle = 'rgba(225,228,236,0.09)'; ctx.beginPath(); ctx.moveTo(530, 380); ctx.lineTo(1210, 380); ctx.lineTo(1250, 792); ctx.lineTo(490, 792); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(225,228,236,0.22)'; ctx.lineWidth = 2; ctx.stroke();
}
// Cái phích móp: đáy tại (x, y).
function phich(k, x, y, s = 1) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#c8402a'; ctx.strokeStyle = INK; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(-22, -120); ctx.quadraticCurveTo(0, -140, 22, -120); ctx.lineTo(22, -84); ctx.quadraticCurveTo(8, -70, 22, -56); ctx.lineTo(22, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#e8c06a'; ctx.fillRect(-22, -30, 44, 8); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-12, -150, 24, 16);
  ctx.restore();
}
// Điếu cày: đầu ống tại (x, y), xoay r.
function dieuCay(k, x, y, s = 1, r = 0) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s);
  const g = ctx.createLinearGradient(0, -22, 0, 22); g.addColorStop(0, '#6a4a22'); g.addColorStop(0.5, '#3a2410'); g.addColorStop(1, '#1e1208');
  ctx.fillStyle = g; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(0, -22, 360, 44, 10); ctx.fill(); ctx.stroke();
  for (const d of [90, 200, 300]) { ctx.strokeStyle = '#c9a35a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(d, -22); ctx.lineTo(d, 22); ctx.stroke(); }
  ctx.fillStyle = '#5a3a1a'; ctx.beginPath(); ctx.moveTo(250, -20); ctx.lineTo(236, -66); ctx.lineTo(256, -66); ctx.lineTo(266, -20); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#8a7a6a'; ctx.beginPath(); ctx.ellipse(246, -68, 14, 6, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
// Nắm sim chín tím.
function sim(k, x, y, s = 1, n = 11) {
  const { ctx } = k;
  for (let i = 0; i < n; i++) {
    const a = k.rand(i + 70) * Math.PI * 2, d = k.rand(i + 71) * 34 * s, px = x + Math.cos(a) * d * 1.5, py = y + Math.sin(a) * d * 0.5;
    const g = ctx.createRadialGradient(px - 4 * s, py - 4 * s, 1, px, py, 13 * s); g.addColorStop(0, '#9a6ab0'); g.addColorStop(0.6, '#4a1f5a'); g.addColorStop(1, '#22102c');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, 12 * s, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(230,240,255,0.55)'; ctx.beginPath(); ctx.arc(px - 4 * s, py - 4 * s, 2.4 * s, 0, Math.PI * 2); ctx.fill();
  }
}
// Đồng hồ treo tường / đeo tay chỉ 11:40.
function clock(k, x, y, r, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y);
  if (o.wrist) { ctx.fillStyle = '#3a3026'; ctx.fillRect(-r * 0.5, -r * 2.4, r, r * 1.4); ctx.fillRect(-r * 0.5, r, r, r * 1.4); }
  ctx.fillStyle = o.wrist ? '#2a2a2a' : '#5a3a20'; ctx.beginPath(); ctx.arc(0, 0, r * 1.12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#efe6d0'; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ctx.fillRect(Math.sin(a) * r * 0.82 - 3, -Math.cos(a) * r * 0.82 - 3, 6, 6); }
  if (o.crack) { ctx.strokeStyle = 'rgba(40,40,40,0.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-r * 0.7, -r * 0.3); ctx.lineTo(-r * 0.1, r * 0.1); ctx.lineTo(r * 0.5, -r * 0.2); ctx.moveTo(-r * 0.1, r * 0.1); ctx.lineTo(r * 0.1, r * 0.7); ctx.stroke(); }
  const hand = (a, len, w) => { ctx.strokeStyle = INK; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(a) * len, -Math.cos(a) * len); ctx.stroke(); };
  hand((11 + 40 / 60) / 12 * Math.PI * 2, r * 0.5, r * 0.09); hand(40 / 60 * Math.PI * 2, r * 0.78, r * 0.06);
  ctx.restore();
}
// Ảnh thờ / ảnh cũ: khung tâm (cx, cy), w×h, ố vàng. p = độ hiện.
const UT_PIC = (k) => k.char(0, 150, 250, { ...UT, face: 'happy' });
const BO_PIC = (k) => k.char(0, 150, 250, { ...BO, face: 'calm' });
function photo(k, cx, cy, w, h, fn, p = 1) {
  const { ctx } = k;
  if (p <= 0) return;
  ctx.save(); ctx.globalAlpha = p;
  ctx.fillStyle = '#2a1a10'; ctx.fillRect(cx - w / 2 - 8, cy - h / 2 - 8, w + 16, h + 16); ctx.strokeStyle = '#c99a3a'; ctx.lineWidth = 4; ctx.strokeRect(cx - w / 2 - 8, cy - h / 2 - 8, w + 16, h + 16);
  ctx.beginPath(); ctx.rect(cx - w / 2, cy - h / 2, w, h); ctx.clip();
  ctx.fillStyle = '#9a9284'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  k.group({ x: cx, y: cy - h * 0.08, s: h / 300 }, () => fn(k));
  ctx.globalCompositeOperation = 'color'; ctx.fillStyle = '#8a6a40'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(200,180,140,0.5)'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  ctx.restore();
}
// Lửa nhỏ đốt vàng mã trên mặt đất.
function fireSmall(k, x, y, s = 1) {
  const { ctx } = k, t = k.gt ?? 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 4; i++) { const f = 1 + 0.2 * Math.sin(t * 11 + i * 2); ctx.fillStyle = i % 2 ? '#ffb340' : '#ff7a2a'; ctx.beginPath(); ctx.moveTo(-30 + i * 18, 0); ctx.quadraticCurveTo(-36 + i * 18, -50 * f, -20 + i * 18, -80 * f); ctx.quadraticCurveTo(-6 + i * 18, -40 * f, 6 + i * 18, 0); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = '#d8b04a'; ctx.fillRect(-40, -6, 80, 8);
  ctx.restore();
}
// Hương cắm đất + khói.
function incense(k, x, y, n = 2) {
  const { ctx } = k, t = k.gt ?? 0;
  for (let i = 0; i < n; i++) {
    const px = x + i * 22;
    ctx.strokeStyle = '#b5482c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px + 4, y - 80); ctx.stroke();
    ctx.fillStyle = '#ff8a3a'; ctx.beginPath(); ctx.arc(px + 4, y - 82, 4, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.globalAlpha = 0.28; ctx.strokeStyle = '#d8dde3'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px + 4, y - 84); for (let j = 1; j < 16; j++) ctx.lineTo(px + 4 + Math.sin(t * 1.3 + j * 0.6 + i) * j * 3, y - 84 - j * 16); ctx.stroke(); ctx.restore();
  }
}
// Làn khói thuốc lào mỏng bay lên.
function wisp(k, x, y, a = 0.3) {
  if (a <= 0) return;
  const { ctx } = k, t = k.gt ?? 0;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#dfe4ea'; ctx.lineWidth = 10; ctx.lineCap = 'round';
  for (let w = 0; w < 2; w++) { ctx.beginPath(); ctx.moveTo(x + w * 14, y); for (let j = 1; j < 18; j++) ctx.lineTo(x + w * 14 + Math.sin(t * 0.9 + j * 0.45 + w) * j * 3.5, y - j * 22); ctx.stroke(); }
  ctx.restore();
}
// Chõng tre ngoài hiên (mặt chõng ở y).
function chong(k, x, y, w = 520) {
  const { ctx } = k;
  ctx.fillStyle = '#a8894f'; ctx.fillRect(x, y, w, 30); ctx.strokeStyle = 'rgba(60,40,20,0.6)'; ctx.lineWidth = 2; for (let xx = x; xx < x + w; xx += 22) { ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx, y + 30); ctx.stroke(); }
  ctx.fillStyle = '#6a4a2a'; for (const lx of [x + 16, x + w - 38]) ctx.fillRect(lx, y + 30, 22, 100);
}
// Chiếc nón lá rách vành ở vệ đường.
function nonLa(k, x, y, s = 1, a = 1) {
  if (a <= 0) return;
  const { ctx } = k;
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#c9b47a'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(0, -60); ctx.lineTo(90, 0); ctx.quadraticCurveTo(0, 16, -90, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(80,60,30,0.6)'; ctx.lineWidth = 2; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-90 + i * 22, -i * 14); ctx.lineTo(90 - i * 22, -i * 14); ctx.stroke(); }
  ctx.fillStyle = '#05060a'; ctx.beginPath(); ctx.moveTo(40, 2); ctx.lineTo(62, -10); ctx.lineTo(74, 4); ctx.closePath(); ctx.fill();
  ctx.restore();
}
// Bó củi bên vệ đường.
function cui(k, x, y, s = 1) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  for (let i = 0; i < 9; i++) { ctx.strokeStyle = i % 2 ? '#6a4a2a' : '#5a3a20'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-110, -10 - i * 7 + k.rand(i) * 6); ctx.lineTo(110, -16 - i * 6 + k.rand(i + 9) * 6); ctx.stroke(); }
  ctx.strokeStyle = '#a8894f'; ctx.lineWidth = 6; for (const d of [-50, 50]) { ctx.beginPath(); ctx.moveTo(d, -76); ctx.lineTo(d, -2); ctx.stroke(); }
  ctx.restore();
}
// Vàng mã bay ra cửa xe.
function vangMa(k, x0, y0, t0) {
  const { ctx } = k;
  for (let i = 0; i < 14; i++) {
    const q = k.t - t0 - i * 0.06; if (q <= 0) continue;
    ctx.save(); ctx.fillStyle = i % 2 ? '#e8c06a' : '#d8a040'; ctx.translate(x0 - 120 + q * 60 + k.rand(i) * 80, y0 + q * 120 + Math.sin(q * 3 + i) * 30); ctx.rotate(q * 2 + i); ctx.fillRect(-12, -9, 24, 18); ctx.restore();
  }
}

// Mỗi cảnh: máy quay đẩy chậm đều (tuyến tính, 6%) để cảnh tối ít chuyển động không bị "đứng hình" + hạt phim.
const grain = (sc) => ({ ...sc, draw(k) { const s = 1 + 0.06 * Math.min(1, k.t / Math.max(1, k.d)); k.group({ x: k.W / 2, y: k.H / 2, s }, () => k.group({ x: -k.W / 2, y: -k.H / 2 }, () => sc.draw(k))); filmGrade(k, 'day', 0.06); } });
const video = {
  meta: {
    title: 'Gọi Hồn | Người Về Lại Gọi Vợ Mình Là Chị',
    description: `Bốn mươi chín ngày sau khi bố tôi mất, nhà tôi mời bà đồng về gọi hồn. Người về ho đúng tiếng ho của bố, chỉ đúng chỗ bố giấu tiền. Rồi người ấy quay sang mẹ tôi, gọi: "Chị ơi."
Mười lăm năm lấy nhau, bố tôi chưa bao giờ gọi mẹ là chị.

Sau buổi gọi hồn ấy, người về không đi. Tiếng còi xe ở đầu ngõ lúc mười một giờ bốn mươi. Cái điếu cày đã chôn lại nằm trên chõng. Một nắm sim tím trên bàn thờ, ở nơi không có cây sim nào. Và tiếng ai đó gọi "chị ơi" ngoài sân mỗi đêm.`,
    footer: `📖 Truyện hư cấu dựa trên tục gọi hồn và tục "xin đường" của cánh lái xe trong dân gian. Tên người, tên làng và tình tiết đều hư cấu.
🕯️ Nhân Gian Chưa Kể: những chuyện người xưa truyền tai nhau, mà chưa ai giải thích được.`,
    links: [['▶ Tập trước: Ma Da', '101-ma-da-moi-nam-song-lay-mot-nguoi'], ['🔔 Đăng ký', 'https://www.youtube.com/@nhangianchuake?sub_confirmation=1']],
    tags: ['gọi hồn', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'bà đồng', 'ngoại cảm', 'chuyện tâm linh có thật', 'truyện ma làng quê', 'truyện ma tài xế', 'hoạt hình kinh dị', 'nhân gian chưa kể'],
    hashtags: ['truyenma', 'goihon', 'tamlinh'],
    gpu: true, // vẽ canvas bằng GPU (Metal) — người dùng yêu cầu 14/11
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 0.95,
    lead: 0.4, tail: 0.8, pause: 0.35,
    transition: 'fade', sfxTransitions: false, camera: 0.03, scribble: false,
    sfxVolume: 0.5, paper: '#07080c', privacy: 'private',
  },
  thumbnail: thumbs.a,

  scenes: [
    // ===== MỞ ĐẦU =====
    {
      chapter: 'Mở đầu',
      say: '{a}Bốn mươi chín ngày sau khi bố tôi mất, nhà tôi mời bà đồng về gọi hồn. {b}Người về ho đúng tiếng ho của bố tôi. Nói đúng giọng bố tôi. Chỉ đúng chỗ bố tôi giấu tiền, một chỗ cả nhà không ai biết. {c}Rồi người ấy quay sang mẹ tôi, khẽ gọi: Chị ơi. {d}Mười lăm năm lấy nhau, bố tôi chưa bao giờ gọi mẹ là chị.',
      sfx: [['gong', 0, 0.25], ['stinger', 'c', 0.4]],
      draw(k) {
        zoom(k, 960, 760, 1.25 - 0.25 * k.at('a', 6, 'inOut'), () => seance(k, { shake: after(k, 'b') && !after(k, 'c') ? 0.5 : 0, turn: after(k, 'c') ? -1 : 0, meDown: after(k, 'c'), baTears: after(k, 'b') ? 1 : 0, baFace: after(k, 'b') ? 'cry' : 'sad' }));
        tag(k, 'NGÀY THỨ BỐN MƯƠI CHÍN', 'a');
        quote(k, '"Chị ơi."', 'c', { color: COLD, until: 'd' });
      },
    },
    {
      say: '{a}Người về hôm ấy có phải bố tôi không, đến giờ tôi vẫn không dám chắc. {b}Tôi chỉ biết một điều: sau buổi gọi hồn ấy, người ấy không đi.',
      sfx: [['wind', 0, 0.3]],
      draw(k) {
        zoom(k, 960, 700, 1.15 - 0.1 * k.at('a', 9, 'linear'), () => lane(k));
        shade(k, 0.6, [{ x: 1560, y: 170, r: 900 }, { x: 960, y: 640, r: 260 }]);
        quote(k, 'Người ấy không đi.', 'b', { color: AMBER });
      },
    },
    {
      say: '{a}Đây là Nhân Gian Chưa Kể. Nếu bạn muốn nghe tiếp những chuyện chưa có lời giải, hãy bấm đăng ký. {c}Còn bây giờ, xin bạn tắt bớt đèn.',
      sfx: [['click', 'c', 0.5]],
      draw(k) {
        black(k); oil(k, 960, 820, 1.6);
        const off = k.at('c', 1.2);
        shade(k, 0.75 + 0.2 * off, [{ x: 960, y: 650, r: 700 - 300 * off, flicker: 1, warm: 1 }]);
        k.text('NHÂN GIAN CHƯA KỂ', k.W / 2, 230, { size: 92, font: 'title', color: PAPER, fx: 'fade', p: k.at('a', 1) });
        k.text('Gọi Hồn · Người Về Lại Gọi Vợ Mình Là Chị', k.W / 2, 330, { size: 46, color: AMBER, fx: 'fade', p: k.at('a', 1.5) });
      },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Hai tiếng còi',
      say: '{a}Năm ấy tôi mười bốn tuổi. Bố tôi lái xe tải đường dài, chở hàng từ xuôi lên mạn ngược. Mỗi tháng bố về nhà hai lần, mỗi lần chỉ ở một đêm. {b}Xe bố về đến đầu ngõ bao giờ cũng bấm hai tiếng còi ngắn. {t}Tít, tít. {m}Mẹ tôi nghe thấy thì bắc nồi cơm lên bếp, bà nội ra mở cổng, còn tôi chạy ra trước nhất. {c}Bố ít nói. Ở nhà, bố với mẹ ăn hết bữa cơm mà không ai nói với ai câu nào.',
      sfx: [['click', 't', 0.35], ['click', ['t', 0.4], 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) {
          house(k, { time: 'dusk' });
          truck(k, k.lerp(2300, 1880, k.at('b', 2.5)), 880, 0.6, { lights: after(k, 'b') });
          if (after(k, 'm')) { ch(k, k.lerp(1200, 1500, k.at('m', 3)), 940, 330, { ...HUY, face: 'happy', walk: true }); ch(k, 760, 920, 440, { ...BA_NOI, face: 'happy' }); }
          k.vignette(0.35); tag(k, '1997', 'a');
          quote(k, 'Tít, tít.', 't', { color: AMBER, until: 'c' });
          chapter(k, 1, 'Hai tiếng còi');
          return;
        }
        kitchen(k, { fire: 0.6, bowl: false });
        const { ctx } = k; ctx.fillStyle = '#5a4030'; ctx.beginPath(); ctx.ellipse(960, 896, 280, 26, 0, 0, Math.PI * 2); ctx.fill();
        ch(k, 760, 900, 470, { ...BO, face: 'blank' }); ch(k, 1160, 900, 430, { ...ME, face: 'blank', flip: true }); ch(k, 960, 900, 320, { ...HUY, face: 'blank' });
        shade(k, 0.55, [KITCHEN.fire]);
      },
    },
    {
      say: '{a}Nhưng khi chỉ có hai bố con, bố là một người khác. {b}Bố gọi tôi là thằng Tép, vì hồi bé tôi gầy nhom như con tép. Cái tên ấy bố chỉ gọi khi không có ai nghe. Trước mặt mẹ, trước mặt bà, tôi vẫn là Huy. {c}Sáng hôm bố đi chuyến cuối cùng, bố xoa đầu tôi: Tết này bố nghỉ mấy hôm. Sáng mùng Một, hai bố con ra đầm sen câu cá đầu năm. {d}Cả nhà còn ngủ. Không ai nghe thấy lời hẹn ấy.',
      draw(k) {
        lotus(k, { time: 'dawn' });
        ch(k, 760, 920, 470, { ...BO, face: after(k, 'a') ? 'happy' : 'calm', pose: after(k, 'c') ? 'wave' : 'hold' });
        ch(k, 1000, 920, 330, { ...HUY, face: 'happy', pose: 'hold' });
        rod(k, 800, 760, 1); rod(k, 1030, 800, 0.8);
        k.vignette(0.35);
        quote(k, '"Thằng Tép"', 'b', { color: AMBER, until: 'c' });
        quote(k, 'Sáng mùng Một, ra đầm sen câu cá.', 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Bố hút thuốc lào từ năm mười lăm tuổi, nên lúc nào cũng có một tiếng ho khan, khàn đặc, ho xong thì hắng giọng hai cái. Cái điếu cày của bố dựng ở góc hiên, ống tre lên nước bóng như gỗ mun. {b}Mỗi chuyến đi, bố mang theo một cái phích nước móp một bên. Tôi hỏi sao không mua cái mới. Bố bảo nó móp chứ có vỡ đâu.',
      draw(k) {
        house(k, { time: 'dusk' });
        chong(k, 640, 840, 560);
        ch(k, 900, 900, 440, { ...BO, face: 'calm', pose: 'hold' });
        dieuCay(k, 760, 760, 0.7, -1.2);
        wisp(k, 840, 600, 0.25);
        phich(k, 1080, 840, 0.9);
        ch(k, 1300, 920, 320, { ...HUY, face: 'calm', flip: true });
        k.vignette(0.4);
        quote(k, 'Cái phích móp một bên.', 'b', { color: AMBER });
      },
    },
    {
      say: '{a}Bố mẹ tôi quen nhau ở chân đèo Khe. Hồi ấy nhà ngoại tôi có quán chè xanh ngay dưới chân đèo, mẹ tôi ngồi bán. Bố tôi là anh lái xe trẻ, chuyến nào xuống đèo cũng dừng uống một bát nước chè. {b}Mỗi năm, đêm mười bốn tháng Chạp, mẹ tôi ra đầu ngõ thắp một nén hương, cắm xuống vệ cỏ, đứng một lúc rồi vào. Không ai trong nhà hỏi. Bố cũng không. {c}Còn bố, mỗi lần qua khúc cua thứ bảy của đèo Khe, {t}đều bấm hai tiếng còi và thả một nắm vàng mã qua cửa xe. Cánh lái xe gọi đó là xin đường. {q}Bố thì chỉ bảo: chào một người quen.',
      sfx: [['click', 't', 0.3], ['click', ['t', 0.4], 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { quan(k, {}); truck(k, 640, 890, 0.6, {}); ch(k, 1150, 830, 400, { ...ME_TRE, face: 'calm', pose: 'hold' }); ch(k, 900, 900, 440, { ...BO_TRE, face: 'happy' }); cold(k, 0.6); tag(k, 'CHÂN ĐÈO KHE', 'a'); return; }
        if (k.t < k.cue('c')) { lane(k); ch(k, 760, 960, 430, { ...ME, face: 'sad' }); incense(k, 900, 980, 1); shade(k, 0.75, [{ x: 900, y: 900, r: 240, warm: 0.8, flicker: 1 }, { x: 1560, y: 170, r: 700 }]); tag(k, 'ĐÊM 14 THÁNG CHẠP', 'b'); return; }
        pass(k, { rain: false });
        const p = k.at('c', 8, 'linear'), tx = k.lerp(-200, 900, p);
        truck(k, tx, 830, 0.7, { lights: true });
        vangMa(k, tx, 600, k.cue('t', 1));
        shade(k, 0.55, [{ x: k.lerp(200, 1300, p), y: 760, r: 500 }]);
        quote(k, '"Chào một người quen."', 'q', { color: AMBER });
      },
    },
    {
      say: '{a}Năm ấy, bố gửi tiền về ít hơn. Bố bảo hàng ít, chuyến ít. Những lần về, bố hay nhắc đến thị trấn Ba Lăng, nằm ở giữa đường, nơi bố dừng xe nghỉ qua đêm. {b}Mẹ tôi không hỏi gì thêm. Tháng nào mẹ cũng đạp xe lên bưu điện huyện một lần, về thì im lặng. Tôi tưởng mẹ gửi thư cho ông bà ngoại.',
      draw(k) {
        if (k.t < k.cue('b')) { kitchen(k, { fire: 0, bowl: false }); oil(k, 960, 860, 1); ch(k, 1100, 900, 430, { ...ME, face: 'blank', pose: 'hold' }); shade(k, 0.7, [{ x: 960, y: 760, r: 420, flicker: 1, warm: 1 }]); quote(k, 'Thị trấn Ba Lăng', 'a', { color: AMBER }); return; }
        highway(k, 0, { time: 'day' }); bike(k, k.lerp(300, 1500, k.at('b', 8, 'linear')), 880, 1, ME); k.vignette(0.35);
      },
    },
    {
      say: '{a}Một đêm cuối tháng Tám, trời mưa to. Gần nửa đêm, tôi tỉnh giấc vì hai tiếng còi ngắn ở đầu ngõ. {t}Tít, tít. {b}Mẹ tôi đã ngồi dậy từ trước. Mẹ thắp đèn, ra mở cổng. Ngõ tối om, nước chảy thành dòng. Không có xe nào. Không có ánh đèn pha nào. {c}Mẹ đứng ở cổng rất lâu, rồi vào, không nói gì. {h}Cái đồng hồ treo tường chỉ mười một giờ bốn mươi. {d}Gần sáng, người ta đến báo tin. Xe của bố tôi trượt bánh ở khúc cua thứ bảy đèo Khe, lao xuống vực.',
      sfx: [['thunder', 0, 0.3], ['click', 't', 0.4], ['click', ['t', 0.4], 0.4], ['stinger', 'h', 0.35], ['thunder', 'd', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { bedroom(k, { ...HUY, face: after(k, 't') ? 'shock' : 'blank' }); k.rain(0, 0, k.W, k.H); shade(k, 0.82, [{ x: 1700, y: 420, r: 500 }]); tag(k, 'CUỐI THÁNG TÁM', 'a'); quote(k, 'Tít, tít.', 't', { color: AMBER }); return; }
        if (k.t < k.cue('h')) { lane(k); ch(k, 960, 980, 440, { ...ME, face: 'blank', pose: 'hold' }); oil(k, 1010, 820, 0.7); k.rain(0, 0, k.W, k.H); shade(k, 0.82, [{ x: 1010, y: 720, r: 380, flicker: 1, warm: 1 }]); return; }
        if (k.t < k.cue('d')) { black(k); clock(k, 960, 500, 230); shade(k, 0.45, [{ x: 960, y: 500, r: 600, warm: 0.6 }]); quote(k, '11 giờ 40', 'h', { color: AMBER }); return; }
        pass(k, { rain: true });
        const p = k.at('d', 5, 'in');
        k.group({ x: k.lerp(900, 1650, p), y: k.lerp(830, 1200, p * p), r: 0.6 * p }, () => truck(k, 0, 0, 0.7, { lights: p < 0.8 }));
        shade(k, 0.65, [{ x: k.lerp(1200, 1700, p), y: 800, r: 500 * (1 - 0.7 * p) + 80 }]);
        tag(k, 'ĐÈO KHE · KHÚC CUA THỨ BẢY', 'd');
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Khúc cua thứ bảy',
      say: '{a}Bà nội ngất đi. Mẹ tôi không khóc. Mẹ lấy cái áo sơ mi trắng bố hay mặc đi ăn cỗ ra là phẳng, rồi ngồi ôm nó đến sáng. {b}Chú Tư, phụ xe của bố, văng ra khỏi ca-bin trước khi xe rơi, gãy một chân nhưng còn sống. Ngày đưa tang, chú chống nạng đến muộn nhất, đứng ở góc sân rất lâu. Chú chào bà nội, chào tôi, nhưng không dám nhìn mẹ tôi lấy một lần. {c}Người ta mang trả nhà tôi những gì tìm được trong ca-bin: cái đồng hồ đeo tay của bố, dừng ở mười một giờ bốn mươi. {p}Và cái phích móp. Phích không vỡ.',
      sfx: [['stinger', 'p', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) {
          kitchen(k, { fire: 0, bowl: false }); oil(k, 960, 860, 1);
          ch(k, 1100, 900, 430, { ...ME, face: 'blank', gloom: 0.7, pose: 'hold' });
          const { ctx } = k; ctx.fillStyle = '#efece4'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1040, 640); ctx.lineTo(1160, 640); ctx.lineTo(1150, 760); ctx.lineTo(1050, 760); ctx.closePath(); ctx.fill(); ctx.stroke();
          shade(k, 0.72, [{ x: 960, y: 760, r: 420, flicker: 1, warm: 1 }]);
          chapter(k, 2, 'Khúc cua thứ bảy');
          return;
        }
        if (k.t < k.cue('c')) {
          house(k, { time: 'dusk', chickens: false });
          for (let i = 0; i < 5; i++) ch(k, 450 + i * 110, 900, 400, { ...DAN(['#3a3a3a', '#4a4a4a', '#2e2e2e', '#3e3e3e', '#353535'][i]), face: 'sad', hat: 'band', hatColor: '#efece4' });
          ch(k, 1020, 900, 420, { ...ME, face: 'blank', hat: 'band', hatColor: '#efece4' });
          ch(k, 1180, 900, 320, { ...HUY, face: 'sad', hat: 'band', hatColor: '#efece4' });
          ch(k, 1650, 900, 440, { ...CHU_TU, face: 'sad', look: -1, prop: 'staff' });
          k.vignette(0.45);
          quote(k, 'Chú không dám nhìn mẹ tôi lấy một lần.', 'b', { size: 44 });
          return;
        }
        black(k);
        const { ctx } = k; ctx.fillStyle = '#3a2a1e'; ctx.fillRect(360, 700, 1200, 40);
        clock(k, 760, 600, 90, { wrist: true, crack: true });
        phich(k, 1160, 700, 1.4 * k.at('p', 0.6));
        shade(k, 0.4, [{ x: 960, y: 600, r: 700, warm: 0.5 }]);
        quote(k, 'Phích không vỡ.', 'p', { color: AMBER });
      },
    },
    {
      say: '{a}Tối hôm sau đám tang, chú Tư cho gọi tôi sang. Chú đã say. Chú bảo có một chuyện chú không dám kể với người lớn, kể ra người ta bảo chú điên. {b}Đêm ấy, gần đến khúc cua thứ bảy, bố bấm hai tiếng còi như mọi lần. Chưa kịp thả nắm vàng mã, bố bỗng nhoài người về phía trước, nheo mắt nhìn qua làn mưa: {c}Thằng bé nào đứng mưa thế kia? {d}Chú Tư nhìn theo. Chỉ có mưa, và vách núi. {e}Nó vẫy mình kìa, bố nói. Rồi bố đánh lái về phía nó.',
      sfx: [['click', ['b', 2.4], 0.3], ['click', ['b', 2.8], 0.3], ['heartbeat', 'c', 0.4], ['stinger', 'e', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { nhaTrong(k); ch(k, 560, 905, 440, { ...CHU_TU, face: 'sad', talk: 0.2 }); const { ctx } = k; ctx.fillStyle = 'rgba(200,220,200,0.7)'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.rect(900, 650, 40, 100); ctx.fill(); ctx.stroke(); ch(k, 1350, 900, 330, { ...HUY, face: 'calm', flip: true }); shade(k, 0.75, [{ x: 900, y: 620, r: 520, flicker: 1, warm: 1 }]); return; }
        pass(k, { rain: true });
        truck(k, 700, 830, 0.7, { lights: true });
        shade(k, 0.66, [{ x: 1250, y: 720, r: 420 }]);
        cold(k, 0.55);
        quote(k, '"Thằng bé nào đứng mưa thế kia?"', 'c', { color: COLD, until: 'd' });
        quote(k, 'Chỉ có mưa, và vách núi.', 'd', { until: 'e' });
        quote(k, '"Nó vẫy mình kìa."', 'e', { color: COLD });
      },
    },
    {
      say: '{a}Chú Tư chỉ nhớ đến đấy. Lúc tỉnh dậy, chú nằm bên vệ đường, mưa quất vào mặt. Chú thề với tôi, trên đèo đêm ấy không có ai. Không người, không nhà, không một ánh đèn. {b}Bố mày nhìn thấy cái gì, chú không biết, chú nói. {s}Nhưng bố mày không sợ. Lúc đánh lái, bố mày cười. {c}Tôi về nhà, không dám kể với mẹ. Tôi cũng không hỏi chú Tư vì sao chú không dám nhìn mẹ tôi. Có những câu, mười bốn tuổi người ta chưa biết hỏi.',
      sfx: [['stinger', 's', 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) {
          zoom(k, 660, 640, 1.5, () => { nhaTrong(k); ch(k, 560, 905, 440, { ...CHU_TU, face: after(k, 'b') ? 'cry' : 'sad', tears: after(k, 'b') ? 0.6 : 0, talk: 0.2, look: -1 }); shade(k, 0.75, [{ x: 900, y: 620, r: 520, flicker: 1, warm: 1 }]); });
          quote(k, '"Lúc đánh lái, bố mày cười."', 's', { color: AMBER });
          return;
        }
        highway(k, 0, { time: 'dusk' }); ch(k, k.lerp(1500, 700, k.at('c', 8, 'linear')), 880, 330, { ...HUY, face: 'blank', walk: true, walkSpeed: 0.4 }); bike(k, k.lerp(1600, 800, k.at('c', 8, 'linear')), 880, 0.9);
        shade(k, 0.6, [{ x: 1700, y: 300, r: 900 }]);
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      chapter: 'Ba điều cấm',
      say: '{a}Bố đi đột ngột, không kịp dặn một câu. Bà nội tôi không chịu được điều ấy. {b}Làng tôi có tục: người chết bất đắc kỳ tử, đến ngày thứ bốn mươi chín, gia đình mời bà đồng về gọi hồn, để người mất dặn lại những gì còn dang dở. {c}Chú Thịnh, em trai bố, không tin. Chú bảo, để xem bà ấy nói được gì. Mẹ tôi không cản. Mẹ chỉ hỏi bà đồng ở đâu. Bà nội bảo ở tận huyện bên kia sông, chưa từng đặt chân đến làng mình. Mẹ gật đầu.',
      draw(k) {
        altarRoom(k, {});
        ch(k, 620, 980, 470, { ...BA_NOI, face: 'sad', pose: 'hold' });
        if (after(k, 'c')) { ch(k, 1350, 980, 470, { ...CHU_THINH, face: 'smug', pose: 'hips', flip: true }); ch(k, 1550, 980, 430, { ...ME, face: 'blank', flip: true }); }
        shade(k, 0.6, [...altarLights(1.2), { x: 620, y: 700, r: 360 }]);
        chapter(k, 3, 'Ba điều cấm');
      },
    },
    {
      say: '{a}Bà Hai Quy đến khi trời đã chập tối. Bà không uống nước, không hỏi tên bố tôi, không nhìn ảnh trên bàn thờ. Bà chỉ dặn cả nhà ba điều. {b}Một: hồn về, không ai được gọi to tên người chết. {c}Hai: không ai được hỏi, có phải anh không. Hỏi thế, bà bảo, thì vong nào cũng nhận. {d}Ba: lúc tiễn, đưa ra đến cổng thì quay vào. Không ai được ngoảnh lại.',
      sfx: [['gong', 'b', 0.2], ['gong', 'c', 0.2], ['gong', 'd', 0.2]],
      draw(k) {
        if (k.t < k.cue('b')) { house(k, { time: 'dusk' }); ch(k, k.lerp(-100, 900, k.at('a', 4)), 900, 440, { ...BA_HAI, face: 'cold', walk: k.t < k.cue('a', 4) }); ch(k, 1150, 900, 440, { ...BA_NOI, face: 'sad', flip: true }); k.vignette(0.45); return; }
        black(k);
        rules(k, 960, 520, [['1. Không gọi to tên người chết.', 'b'], ['2. Không hỏi "có phải anh không".', 'c'], ['3. Tiễn đến cổng, không ngoảnh lại.', 'd']], { cue: 'b', w: 1200 });
        shade(k, 0.35, [{ x: 960, y: 520, r: 900, warm: 0.4 }]);
      },
    },
    {
      say: '{a}Bà tắt hết đèn, chỉ để hai ngọn nến. Bà trùm khăn đỏ lên đầu, ngồi trước bàn thờ, lầm rầm khấn. Khói hương dày đến mức tôi không nhìn rõ mặt ai. {b}Một lúc lâu, người bà run lên. Rồi dưới tấm khăn đỏ bật ra một tiếng ho. {h}Ho khan, khàn đặc. Ho xong, hắng giọng hai cái. {c}Bà nội tôi bật khóc.',
      sfx: [['heartbeat', 'b', 0.4], ['stinger', 'h', 0.35]],
      draw(k) {
        zoom(k, 960, 760, 1 + 0.35 * k.at('a', 10, 'inOut'), () => seance(k, { shake: after(k, 'b') ? 1 : 0, dark: 0.78, huyFace: after(k, 'h') ? 'shock' : 'sad', baFace: after(k, 'c') ? 'cry' : 'sad', baTears: after(k, 'c') ? 1 : 0 }));
        quote(k, 'Ho khan. Hắng giọng hai cái.', 'h', { color: AMBER });
      },
    },
    {
      say: '{a}Giọng cất lên không còn là giọng bà Hai Quy. Trầm, khàn, nói chậm, cuối câu bỏ lửng. Giọng bố tôi. {b}Mẹ ơi. Con về muộn. {c}Người ấy dặn: cái phích móp, mẹ đừng vứt, sáng nào cũng rót đầy cho con. {g}Rồi người ấy nói: Dưới chân bàn thờ, viên gạch thứ ba, con để lại ít tiền. {d}Chú Thịnh cầm đèn chui xuống gầm bàn thờ, cạy viên gạch thứ ba. Bên dưới có một gói giấy dầu. Trong gói là tiền. {e}Không ai trong nhà biết chỗ ấy. Chú Thịnh, người không tin, quỳ xuống lúc nào không hay.',
      sfx: [['creak', 'd', 0.35], ['stinger', ['d', 4], 0.35]],
      draw(k) {
        if (k.t < k.cue('d')) {
          altarRoom(k, {});
          medium(k, 960, 940, 360, { shake: 0.3, turn: after(k, 'b') ? -0.6 : 0 });
          if (after(k, 'b')) kneel(k, 760, 1010, 470, { ...BA_NOI, face: 'cry', tears: 1, pose: 'hold' }); else kneel(k, 560, 1010, 470, { ...BA_NOI, face: 'sad', pose: 'hold' });
          kneel(k, 360, 1010, 440, { ...ME, face: 'blank' });
          kneel(k, 1360, 1010, 470, { ...CHU_THINH, face: 'blank', flip: true });
          kneel(k, 1560, 1010, 330, { ...HUY, face: 'shock', flip: true });
          shade(k, 0.72, [...altarLights(1), { x: 960, y: 700, r: 360, warm: 0.6 }]);
          quote(k, '"Mẹ ơi. Con về muộn."', 'b', { color: COLD, until: 'c' });
          quote(k, '"Viên gạch thứ ba."', 'g', { color: COLD });
          return;
        }
        if (k.t < k.cue('e')) {
          zoom(k, 900, 900, 2.2, () => { altarRoom(k, { brick: k.at(k.cue('d', 2), 1) }); ch(k, 1120, 990, 470, { ...CHU_THINH, face: 'shock', pose: 'point' }); oil(k, 1040, 990, 0.7); shade(k, 0.6, [{ x: 960, y: 900, r: 420, warm: 0.8 }]); });
          return;
        }
        altarRoom(k, { brick: 1 });
        medium(k, 960, 940, 360, { shake: 0.2 });
        kneel(k, 560, 1010, 470, { ...BA_NOI, face: 'cry', tears: 1, pose: 'hold' }); kneel(k, 360, 1010, 440, { ...ME, face: 'blank' });
        kneel(k, 1360, 1010, 470, { ...CHU_THINH, face: 'shock', flip: true, gloom: 0.5 }); kneel(k, 1560, 1010, 330, { ...HUY, face: 'cry', flip: true });
        shade(k, 0.72, [...altarLights(1), { x: 960, y: 700, r: 360, warm: 0.6 }]);
        quote(k, 'Không ai trong nhà biết chỗ ấy.', 'e', { color: AMBER });
      },
    },
    {
      say: '{a}Rồi tấm khăn đỏ quay về phía mẹ tôi. {b}Chị ơi. Em xin lỗi chị. {c}Cả gian thờ im phắc. {n}Mười lăm năm, bố gọi mẹ là mình, là bà nó, là mẹ thằng Huy. Chưa bao giờ là chị. {d}Ai cũng ngẩng lên nhìn nhau. Chỉ có mẹ tôi cúi đầu thấp hơn. Và tôi thấy môi mẹ mấp máy, như đang thưa lại một tiếng rất khẽ. {e}Người ấy nói thêm: Mẹ với chị lo giúp con thằng bé ở Ba Lăng. Bà nội hỏi thằng bé nào. Không ai trả lời.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) {
        const z = after(k, 'd') && !after(k, 'e') ? 1 + 0.6 * k.at('d', 2, 'inOut') : 1;
        zoom(k, 360, 900, z, () => seance(k, { turn: -1, meDown: after(k, 'd'), meFace: after(k, 'd') ? 'sad' : 'blank', thFace: after(k, 'c') ? 'shock' : 'blank', baFace: after(k, 'c') ? 'shock' : 'cry', huyFace: 'shock' }));
        quote(k, '"Chị ơi. Em xin lỗi chị."', 'b', { color: COLD, until: 'n' });
        quote(k, 'Chưa bao giờ là chị.', 'n', { color: AMBER, until: 'd' });
        quote(k, '"…thằng bé ở Ba Lăng."', 'e', { color: COLD });
      },
    },
    {
      say: '{a}Rồi tấm khăn đỏ quay về phía tôi. Giọng khẽ đến mức chỉ tôi ngồi gần mới nghe được: {b}Tép ơi. Mùng Một bố không đi câu với con được rồi. {c}Tôi quên hết ba điều cấm. Tôi buột miệng hỏi: {q}Có phải bố không? {d}Tấm khăn đỏ im rất lâu. Rồi giọng ấy đáp, vẫn chậm và khàn: {e}Ai về thì cũng là người nhà mình cả.',
      sfx: [['heartbeat', 'b', 0.45], ['stinger', 'e', 0.45]],
      draw(k) {
        zoom(k, 1300, 800, 1.3 + 0.3 * k.at('c', 6, 'inOut'), () => seance(k, { turn: 1, huyFace: after(k, 'c') ? 'shock' : after(k, 'b') ? 'cry' : 'sad', dark: 0.8 }));
        quote(k, '"Tép ơi. Mùng Một bố không đi câu với con được rồi."', 'b', { color: COLD, size: 46, until: 'c' });
        quote(k, '"Có phải bố không?"', 'q', { until: 'd' });
        quote(k, '"Ai về thì cũng là người nhà mình cả."', 'e', { color: COLD });
      },
    },
    {
      say: '{a}Đến lúc tiễn, bà Hai Quy đi trước, cả nhà đi sau, ra đến cổng. Vừa đến cổng, bà nội tôi không giữ được nữa. {g}Bà gào lên: Thành ơi! Ở lại với mẹ! {b}Bà Hai Quy đứng sững. Bà kéo tấm khăn khỏi đầu, nhìn bà nội tôi rất lâu, rồi nói bằng giọng của chính mình, mệt mỏi: {c}Bà gọi thì có người ở lại. Nhưng chưa chắc là người bà gọi. {d}Bà không nhận tiền. Bà đi ngay trong đêm. {e}Lúc cả nhà quay vào, tôi đi sau cùng, và tôi thấy mẹ tôi ngoảnh lại nhìn ra ngõ. {f}Ba điều cấm, nhà tôi đã phạm cả ba.',
      sfx: [['wind', 'a', 0.3], ['stinger', 'c', 0.45]],
      draw(k) {
        lane(k);
        if (k.t < k.cue('d')) {
          ch(k, 960, 930, 420, { ...BA_HAI, face: after(k, 'b') ? 'cold' : 'blank', hat: after(k, 'b') ? undefined : 'band', hatColor: '#a8231e' });
          ch(k, 700, 990, 440, { ...BA_NOI, face: after(k, 'g') ? 'shout' : 'sad', tears: after(k, 'g') ? 1 : 0, pose: after(k, 'g') ? 'shout' : 'stand' });
          ch(k, 520, 1010, 430, { ...ME, face: 'blank' }); ch(k, 1250, 1010, 470, { ...CHU_THINH, face: 'blank', flip: true }); ch(k, 1420, 1030, 330, { ...HUY, face: 'shock', flip: true });
          shade(k, 0.75, [{ x: 960, y: 700, r: 520, warm: 0.5 }, { x: 1560, y: 170, r: 600 }]);
          quote(k, '"Thành ơi! Ở lại với mẹ!"', 'g', { until: 'b' });
          quote(k, '"Bà gọi thì có người ở lại. Nhưng chưa chắc là người bà gọi."', 'c', { color: AMBER, size: 44 });
          return;
        }
        if (k.t < k.cue('e')) { const p = k.at('d', 4); ch(k, k.lerp(960, 1000, p), k.lerp(930, 640, p), k.lerp(420, 120, p), { ...BA_HAI, face: 'cold', walk: true }); shade(k, 0.8, [{ x: 1560, y: 170, r: 700 }]); return; }
        ch(k, 760, 1020, 430, { ...ME, face: 'blank', flip: true, look: -1 });
        ch(k, 1150, 1040, 330, { ...HUY, face: 'shock', look: -1 });
        shade(k, 0.8, [{ x: 960, y: 640, r: 300 }, { x: 760, y: 700, r: 300 }]);
        quote(k, 'Ba điều cấm, nhà tôi đã phạm cả ba.', 'f', { color: AMBER });
      },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Người ở lại',
      say: '{a}Đêm ấy, mười một giờ bốn mươi, ở đầu ngõ có hai tiếng còi. {t}Tít, tít. {b}Cả nhà đều nghe. Không ai ra mở cổng. Chó nhà hàng xóm không sủa. {c}Tôi nằm trùm chăn, nghe tim mình đập. Bên buồng bên, bà nội tôi khóc khẽ. {m}Nhưng là khóc mừng: Nó về đấy.',
      sfx: [['click', 't', 0.45], ['click', ['t', 0.4], 0.45], ['heartbeat', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { black(k); clock(k, 960, 500, 200); shade(k, 0.5, [{ x: 960, y: 500, r: 520, warm: 0.4 }]); tag(k, 'ĐÊM THỨ NHẤT', 'a'); quote(k, 'Tít, tít.', 't', { color: AMBER }); chapter(k, 4, 'Người ở lại'); return; }
        if (k.t < k.cue('c')) { lane(k); shade(k, 0.8, [{ x: 1560, y: 170, r: 700 }, { x: 960, y: 640, r: 200 }]); return; }
        bedroom(k, { ...HUY, face: 'shock' });
        shade(k, 0.85, [{ x: 800, y: 700, r: 360 }]);
        quote(k, '"Nó về đấy."', 'm', { color: COLD });
      },
    },
    {
      say: '{a}Đêm thứ ba, tôi nghe tiếng ho ngoài hiên. Ho khan, khàn đặc, rồi hắng giọng hai cái. {b}Sáng ra, cái điếu cày của bố, vốn được bà nội cất trong gian thờ, nằm ngang trên chõng ngoài hiên. {w}Nõ điếu còn ướt, ám mùi thuốc lào mới. Trong nhà tôi không còn ai hút thuốc lào. {c}Cái phích móp mẹ rót đầy đặt trên bàn thờ, sáng ấy chỉ còn một nửa. {d}Chú Thịnh không nói gì, mang cái điếu cày ra vườn chôn. {e}Hai hôm sau, nó lại nằm trên chõng.',
      sfx: [['stinger', 'e', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { house(k, { time: 'night' }); chong(k, 660, 840, 520); wisp(k, 900, 820, 0.18 * k.at('a', 2)); shade(k, 0.82, [{ x: 1560, y: 170, r: 800 }]); tag(k, 'ĐÊM THỨ BA', 'a'); return; }
        if (k.t < k.cue('c')) { zoom(k, 920, 820, 2, () => { house(k, { time: 'day', chickens: false }); chong(k, 660, 840, 520); dieuCay(k, 760, 830, 0.8, 0); }); k.vignette(0.45); quote(k, 'Nõ điếu còn ướt.', 'w', { color: AMBER }); return; }
        if (k.t < k.cue('d')) { zoom(k, 1160, 560, 2.4, () => { altarRoom(k, {}); phich(k, 1200, 560, 0.7); shade(k, 0.5, altarLights(1.3)); }); quote(k, 'Chỉ còn một nửa.', 'c', { color: AMBER }); return; }
        house(k, { time: 'day', chickens: false });
        if (k.t < k.cue('e')) { ch(k, 300, 920, 470, { ...CHU_THINH, face: 'angry', pose: 'hold' }); dieuCay(k, 200, 760, 0.6, 0.3); }
        else { chong(k, 660, 840, 520); dieuCay(k, 760, 830, 0.8, 0); }
        k.vignette(0.45);
        quote(k, 'Hai hôm sau, nó lại nằm trên chõng.', 'e', { color: AMBER });
      },
    },
    {
      say: '{a}Đêm thứ bảy, không có tiếng gì cả. Sáng ra, trên bàn thờ, cạnh bát cơm của bố, {s}có một nắm sim chín tím, còn đẫm sương. {b}Làng tôi là đất đồng chiêm trũng. Quanh đây không có một cây sim nào. Sim chỉ mọc trên đồi, gần nhất là trên đèo Khe, cách nhà tôi sáu mươi cây số. {c}Bà nội bảo chắc hàng xóm nào mang sang. Mẹ tôi đứng nhìn nắm sim rất lâu. Rồi mẹ gom từng quả vào lòng bàn tay, {o}mang ra đầu ngõ, đặt xuống vệ cỏ. {d}Đúng chỗ năm nào mẹ cũng thắp hương đêm mười bốn tháng Chạp.',
      sfx: [['stinger', 's', 0.4]],
      draw(k) {
        if (k.t < k.cue('o')) {
          zoom(k, 1000, 540, 2.6, () => { altarRoom(k, {}); bowl(k, 900, 560, 0.7); sim(k, 1050, 548, 0.9, after(k, 's') ? 11 : 0); if (after(k, 'c', 4)) ch(k, 1250, 980, 430, { ...ME, face: 'sad' }); shade(k, 0.45, [{ x: 1000, y: 520, r: 500, warm: 0.3 }]); });
          tag(k, 'ĐÊM THỨ BẢY', 'a');
          quote(k, 'Quanh đây không có một cây sim nào.', 'b', { color: AMBER, until: 'c' });
          return;
        }
        lane(k);
        ch(k, 820, 980, 430, { ...ME, face: 'sad', pose: 'hold' });
        sim(k, 980, 1000, 1, after(k, 'o', 2) ? 11 : 0);
        shade(k, 0.55, [{ x: 960, y: 900, r: 500, warm: 0.3 }]);
        quote(k, 'Đúng chỗ mẹ thắp hương đêm 14 tháng Chạp.', 'd', { color: AMBER, size: 44 });
      },
    },
    {
      say: '{a}Đêm thứ chín, tôi tỉnh giấc vì một tiếng gọi ngoài sân. {b}Chị ơi. Chị ơi. {c}Vẫn là giọng bố tôi, nhưng không phải cách bố tôi nói. Nó nhanh hơn, cao hơn, kéo dài cuối câu, như một đứa trẻ gọi chị ra chơi. {d}Tôi nghe tiếng cửa buồng mẹ mở. Mẹ tôi bước ra hiên, đứng trong bóng tối, nói khẽ, rất bình thường, như nói với một người còn sống: {e}Ừ. Chị đây. Ngủ đi. {f}Tiếng gọi tắt.',
      sfx: [['wind', 0, 0.3], ['heartbeat', 'b', 0.45], ['creak', 'd', 0.35]],
      draw(k) {
        if (k.t < k.cue('d')) { bedroom(k, { ...HUY, face: after(k, 'b') ? 'shock' : 'blank' }); shade(k, 0.86, [{ x: 1700, y: 420, r: 420 }]); tag(k, 'ĐÊM THỨ CHÍN', 'a'); quote(k, '"Chị ơi… Chị ơi…"', 'b', { color: COLD }); return; }
        house(k, { time: 'night' });
        ch(k, 960, 820, 420, { ...ME, face: 'calm', talk: after(k, 'e') && !after(k, 'f') ? 0.25 : 0 });
        shade(k, 0.82, [{ x: 1560, y: 170, r: 800 }, { x: 960, y: 600, r: 260 }]);
        quote(k, '"Ừ. Chị đây. Ngủ đi."', 'e', { color: AMBER });
      },
    },
    {
      say: '{a}Từ đêm ấy, cứ cách vài đêm lại có tiếng gọi. Và lần nào mẹ cũng thưa. {b}Tôi không dám hỏi mẹ. Tôi chỉ nhớ lời bà đồng: bà gọi thì có người ở lại, nhưng chưa chắc là người bà gọi. {c}Đến đây, nếu là bạn, bạn nghĩ người ở lại trong nhà tôi là ai? Hãy để lại suy đoán của bạn, rồi nghe tiếp. Vì tôi cũng đã đi tìm câu trả lời. {d}Và chỗ đầu tiên tôi tìm là Ba Lăng.',
      draw(k) {
        bedroom(k, { ...HUY, face: 'blank', look: 0, lookY: -1 });
        shade(k, 0.84, [{ x: 800, y: 700, r: 380 }]);
        quote(k, '"Chưa chắc là người bà gọi."', 'b', { color: COLD, until: 'c' });
        quote(k, 'Bạn nghĩ người ở lại là ai?', 'c', { color: AMBER, until: 'd' });
      },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Thị trấn Ba Lăng',
      say: '{a}Chủ nhật tuần ấy, tôi nói dối mẹ là đi học thêm, đạp xe một mạch lên Ba Lăng. Một trăm cây số, tôi đi từ lúc trời chưa sáng đến quá trưa. Tôi không biết mình tìm ai. Tôi chỉ biết người về đã nhắc đến một thằng bé ở đó. {b}Hỏi đến người thứ ba, một bà bán xăng lẻ chỉ tôi vào quán nước dưới gốc bàng đầu thị trấn. Bà bảo: quán cô Liên, anh lái xe mất ở đèo Khe hay nghỉ ở đấy.',
      draw(k) {
        highway(k, k.lerp(200, 980, k.at('a', 12, 'linear')), { time: 'day', sign: true, rider: { ...HUY, face: 'angry' } });
        truck(k, k.lerp(2300, -400, (k.t % 4) / 4), 860, 0.5, { flip: true });
        if (after(k, 'b')) ch(k, 1180, 900, 400, { ...DAN('#6a5a4a', { body: 'woman', hair: 'bun', hat: 'non' }), face: 'calm', pose: 'point' });
        k.vignette(0.35); tag(k, 'CHỦ NHẬT', 'a');
        chapter(k, 5, 'Thị trấn Ba Lăng');
      },
    },
    {
      say: '{a}Trước cửa quán có một thằng bé chừng năm tuổi đang chơi cái ô tô gỗ. Nó ngẩng lên nhìn tôi. Đôi mắt một mí, đuôi hơi xếch, nhìn người lạ thì nhìn rất lâu. Đôi mắt của bố tôi. {b}Tôi không cần hỏi gì thêm. {c}Nó giơ cái ô tô gỗ lên khoe: bố nó đẽo cho. {t}Rồi nó bảo, rất nghiêm trang, rằng bố nó đi xa, nhưng Tết bố về dẫn nó đi chơi.',
      draw(k) {
        zoom(k, 1000, 800, after(k, 'c') ? 1.5 : 1 + 1.2 * k.at('a', 6, 'inOut'), () => {
          quan(k, {});
          ch(k, 1000, 960, 260, { ...BIN, face: after(k, 'c') ? 'happy' : 'blank', pose: after(k, 'c') ? 'cheer' : 'hold', talk: after(k, 'c') ? 0.25 : 0 });
          const { ctx } = k; ctx.fillStyle = '#a8732f'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.rect(after(k, 'c') ? 1040 : 940, after(k, 'c') ? 760 : 930, 70, 30); ctx.fill(); ctx.stroke();
          ch(k, 820, 960, 330, { ...HUY, face: after(k, 'b') ? 'sad' : 'shock' });
        });
        k.vignette(0.4);
        quote(k, '"Tết bố về dẫn đi chơi."', 't', { color: AMBER });
      },
    },
    {
      say: '{a}Cô Liên nhận ra tôi ngay. Bố tôi hay khoe ảnh tôi mặc đồng phục ngày khai giảng. {f}Trên vách quán, cô treo một tấm ảnh bố tôi bế thằng Bin, cười. Một nụ cười ở nhà tôi chưa bao giờ thấy. {b}Cô kể, năm năm trước quán cô ngập lũ, xe bố tôi kẹt lại thị trấn ba ngày, bố xắn quần lội nước khiêng đồ giúp cô. Rồi chuyến sau bố dừng lại. Rồi chuyến sau nữa. Chú Tư biết hết, nhưng bố bắt chú thề không được nói. {c}Tôi kể cho cô nghe về buổi gọi hồn. Cô nghe đến đâu, mặt tái đến đấy. {k}Cô không biết nhà tôi gọi hồn. Cô chưa từng nghe tên bà Hai Quy. Cô chưa bao giờ đặt chân đến làng tôi.',
      sfx: [['stinger', 'k', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { zoom(k, 1480, 540, after(k, 'f') ? 1 + 1.4 * k.at('f', 2, 'inOut') : 1, () => { quan(k, { photo: true }); ch(k, 1200, 830, 420, { ...LIEN, face: 'sad' }); ch(k, 800, 900, 330, { ...HUY, face: 'blank' }); }); k.vignette(0.4); return; }
        if (k.t < k.cue('c')) { quan(k, {}); k.water(820, { color: '#7a6a4a', amp: 8, alpha: 0.8 }); ch(k, 1000, 900, 440, { ...BO, face: 'calm', pose: 'hold' }); ch(k, 1250, 900, 420, { ...LIEN, face: 'sad' }); cold(k, 0.55); return; }
        zoom(k, 1100, 600, 1.4, () => { quan(k, {}); ch(k, 1100, 860, 420, { ...LIEN, face: after(k, 'k') ? 'shock' : 'sad', pose: 'hold' }); ch(k, 800, 900, 330, { ...HUY, face: 'blank', talk: !after(k, 'k') ? 0.2 : 0 }); });
        k.vignette(0.4);
        quote(k, 'Cô không biết nhà tôi gọi hồn.', 'k', { color: AMBER });
      },
    },
    {
      say: '{a}Nhưng gói tiền dưới viên gạch thứ ba thì cô biết. Năm ngoái bố dặn cô: nếu anh có mệnh hệ gì, dưới chân bàn thờ nhà anh có ít tiền, là của thằng Bin. Ngoài cô ra, bố không nói với ai. {b}Còn chữ chị, cô bảo, mỗi lần nhắc đến mẹ tôi, bố đều gọi là chị ấy. {q}Chị ấy là người tốt, em đừng bao giờ làm chị ấy buồn. Bốn năm trời, ở Ba Lăng, bố tôi gọi vợ mình là chị. {c}Cô kể thêm, ba năm nay, tháng nào cũng có một khoản tiền gửi đến quán, không ghi tên người gửi. Cô cứ tưởng là bố tôi. {d}Tôi hỏi cô, bố có bao giờ gọi con là Tép không. {n}Cô lắc đầu. Cô chưa từng nghe cái tên ấy.',
      sfx: [['stinger', 'n', 0.4]],
      draw(k) {
        zoom(k, 1100, 600, 1.6, () => { quan(k, {}); ch(k, 1100, 860, 420, { ...LIEN, face: after(k, 'n') ? 'blank' : 'cry', tears: 0.7, talk: 0.2, tilt: after(k, 'b') && !after(k, 'c') ? 0.3 : 0 }); });
        k.vignette(0.45);
        quote(k, '"Chị ấy là người tốt."', 'q', { color: COLD, until: 'c' });
        quote(k, 'Cô chưa từng nghe cái tên ấy.', 'n', { color: AMBER });
      },
    },
    {
      say: '{a}Rồi cô kể hai chuyện mà đến giờ tôi vẫn nhớ. {b}Đêm bố tôi mất, gần nửa đêm, thằng Bin đang ngủ bỗng ngồi bật dậy, khóc thét: {q}Bố ơi, đừng đi theo anh ấy! Sáng ra hỏi, nó không nhớ gì. {c}Và đêm thứ bốn mươi chín, đúng đêm nhà tôi gọi hồn, thằng Bin nằm nói chuyện một mình đến khuya. Cô hỏi nó nói với ai. Nó bảo: bố về. {d}Bố bảo đêm nay bố phải dẫn một người về nhà.',
      sfx: [['heartbeat', 'q', 0.4], ['stinger', 'd', 0.45]],
      draw(k) {
        bedroom(k, k.t < k.cue('c') ? null : { ...BIN, face: 'calm', talk: 0.2, look: 1 }, 230);
        if (k.t < k.cue('c')) { ch(k, 820, 790, 260, { ...BIN, face: after(k, 'q') ? 'cry' : 'blank', tears: after(k, 'q') ? 1 : 0, pose: after(k, 'q') ? 'shout' : 'stand' }); if (after(k, 'q', 3)) ch(k, 620, 900, 400, { ...LIEN, face: 'shock', pose: 'hold' }); }
        shade(k, 0.8, [{ x: 800, y: 600, r: 420 }]);
        cold(k, 0.55);
        quote(k, '"Bố ơi, đừng đi theo anh ấy!"', 'q', { color: COLD, until: 'c' });
        quote(k, '"Bố phải dẫn một người về nhà."', 'd', { color: COLD });
      },
    },
    {
      say: '{a}Trên đường về, tôi tưởng mình đã hiểu được một nửa. Chữ chị là chữ của bố ở Ba Lăng. Gói tiền là của thằng Bin. Người về hôm ấy biết những điều chỉ bố và cô Liên biết, và cái tên Tép chỉ bố và tôi biết. {b}Vậy thì người về là bố. {c}Nhưng tiếng gọi chị ơi ngoài sân mỗi đêm không phải cách bố nói. Bố chưa bao giờ hái sim. Và thằng Bin đã khóc: bố ơi, đừng đi theo anh ấy. {d}Anh ấy là ai?',
      sfx: [['stinger', 'd', 0.4]],
      draw(k) {
        highway(k, 0, { time: 'dusk' }); ch(k, k.lerp(1500, 600, k.at('a', 14, 'linear')), 880, 330, { ...HUY, face: 'blank', walk: true, walkSpeed: 0.4 }); bike(k, k.lerp(1600, 700, k.at('a', 14, 'linear')), 880, 0.9);
        k.vignette(0.45);
        quote(k, 'Vậy thì người về là bố.', 'b', { color: AMBER, until: 'c' });
        quote(k, 'Anh ấy là ai?', 'd', { color: COLD, size: 64 });
      },
    },

    // ===== CHƯƠNG 6 =====
    {
      chapter: 'Người thứ hai gọi mẹ là chị',
      say: '{a}Về đến nhà thì trời đã tối. Mẹ ngồi nhặt rau trong bếp, không hỏi tôi đi đâu cả ngày. {s}Tôi đứng ở cửa bếp, nói: con vừa ở Ba Lăng về. {b}Tay mẹ dừng lại. Rồi mẹ nhặt rau tiếp. {c}Mẹ bảo, mẹ biết từ ba năm trước. Có người ở chợ huyện thấy bố bế một đứa bé ở Ba Lăng, về kể lại. Mẹ không hỏi bố, không làm ầm lên. Mẹ mà làm to chuyện thì nhà mình tan. Mà bố con thì ngày nào cũng phải đi qua Ba Lăng.',
      sfx: [['stinger', 'c', 0.35]],
      draw(k) {
        kitchen(k, { fire: 0.5, bowl: false });
        ch(k, 900, 900, 430, { ...ME, face: after(k, 'c') ? 'sad' : 'blank', pose: 'hold', talk: after(k, 'c') ? 0.2 : 0 });
        ch(k, 300, 900, 330, { ...HUY, face: 'blank' });
        shade(k, 0.62, [KITCHEN.fire, { x: 900, y: 700, r: 360, warm: 0.5 }]);
        quote(k, '"Con vừa ở Ba Lăng về."', 's', { until: 'b' });
        quote(k, '"Mẹ biết từ ba năm trước."', 'c', { color: AMBER });
        chapter(k, 6, 'Người thứ hai gọi mẹ là chị');
      },
    },
    {
      say: '{a}Mẹ lấy trong túi áo ra một xấp giấy mỏng. Biên lai gửi tiền ở bưu điện huyện. Người nhận: Lê Thị Liên, thị trấn Ba Lăng. Tháng nào cũng có, từ ba năm trước. {b}Những chuyến đạp xe lên bưu điện, mẹ không gửi thư cho ông bà ngoại. Mẹ gửi tiền nuôi đứa con riêng của chồng mình. {k}Không ký tên. {c}Tôi hỏi tại sao. Mẹ chỉ nói: {q}Thằng bé ấy không có tội gì.',
      sfx: [['stinger', 'a', 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) {
          black(k);
          receipt(k, 820, 520, 1.3, ['Người nhận: LÊ THỊ LIÊN', 'Địa chỉ: Thị trấn Ba Lăng', 'Ngày gửi: 03/1995', 'Người gửi: (để trống)'], -0.05, k.at('a', 1));
          receipt(k, 1150, 600, 1.2, ['Người nhận: LÊ THỊ LIÊN', 'Ngày gửi: 10/1997'], 0.08, k.at('a', 6));
          shade(k, 0.4, [{ x: 960, y: 560, r: 900, warm: 0.5 }]);
          quote(k, 'Không ký tên.', 'k', { color: AMBER });
          return;
        }
        zoom(k, 900, 650, 1.8, () => { kitchen(k, { fire: 0.4, bowl: false }); ch(k, 900, 900, 430, { ...ME, face: 'sad', tears: 0.5, pose: 'hold', talk: 0.25 }); shade(k, 0.62, [KITCHEN.fire, { x: 900, y: 650, r: 400, warm: 0.6 }]); });
        quote(k, '"Thằng bé ấy không có tội gì."', 'q', { color: AMBER });
      },
    },
    {
      say: '{a}Rồi tôi hỏi điều tôi sợ nhất: {q}tiếng gọi chị ơi ngoài sân, mẹ thưa với ai? {b}Mẹ im rất lâu. Rồi mẹ vào buồng, mang ra một cái hộp gỗ nhỏ tôi chưa bao giờ được mở. {p}Trong hộp có một tấm ảnh đen trắng đã ố: một cậu bé chừng mười hai tuổi, đầu cắt trọc, đội cái nón lá rách vành, cười toe. {c}Cậu Út của con, mẹ nói. Em trai mẹ.',
      sfx: [['creak', ['b', 3], 0.3], ['stinger', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('p')) { kitchen(k, { fire: 0.3, bowl: false }); ch(k, 900, 900, 430, { ...ME, face: 'blank', pose: 'hold' }); ch(k, 300, 900, 330, { ...HUY, face: 'sad' }); shade(k, 0.68, [KITCHEN.fire, { x: 900, y: 700, r: 340, warm: 0.5 }]); quote(k, '"Mẹ thưa với ai?"', 'q', { until: 'b' }); return; }
        black(k);
        const { ctx } = k; ctx.fillStyle = '#4a2e1a'; ctx.fillRect(560, 700, 800, 260); ctx.fillStyle = '#2a1a0e'; ctx.fillRect(590, 720, 740, 210);
        photo(k, 960, 470, 300, 380, UT_PIC, k.at('p', 1.5));
        shade(k, 0.45, [{ x: 960, y: 520, r: 620, warm: 0.6, flicker: 1 }]);
        quote(k, '"Cậu Út của con. Em trai mẹ."', 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Năm mẹ mười sáu tuổi, mẹ dẫn cậu Út lên đèo Khe kiếm củi. Trời đổ mưa. Mẹ bảo cậu đứng chờ ở vệ đường, chỗ khúc cua thứ bảy, để mẹ lên dốc gom nốt bó củi. {s}Cậu còn hái cho mẹ một nắm sim, bảo để dành cho chị. {b}Lúc mẹ xuống, chỉ còn bó củi nằm bên đường, mấy quả sim tím vương trên mặt đường ướt. Một chiếc xe chở gỗ đã đi khuất. {c}Tiếng cuối cùng mẹ nghe thấy, từ dưới dốc vọng lên, là cậu gọi: {q}Chị ơi! {d}Hôm ấy là mười bốn tháng Chạp.',
      sfx: [['wind', 0, 0.3], ['stinger', 'q', 0.45]],
      draw(k) {
        pass(k, { rain: true });
        if (k.t < k.cue('b')) sim(k, 900, 880, 1.2, after(k, 's') ? 11 : 0);
        else { cui(k, 820, 880, 1); sim(k, 1040, 880, 1.1, 6); sim(k, 1180, 900, 1, 4); }
        shade(k, 0.6, [{ x: 960, y: 840, r: 520 }]);
        cold(k, 0.65);
        tag(k, 'ĐÈO KHE · 1977', 'a');
        quote(k, '"Để dành cho chị."', 's', { color: COLD, until: 'b' });
        quote(k, '"Chị ơi!"', 'q', { color: COLD, size: 72, until: 'd' });
        quote(k, 'Mười bốn tháng Chạp.', 'd', { color: AMBER });
      },
    },
    {
      say: '{a}Mấy năm sau, cánh lái xe qua đèo Khe đồn nhau: những đêm mưa, ở khúc cua thứ bảy, hay có một thằng bé đội nón đứng vẫy xe. Có người bảo nó xin đi nhờ. Có người bảo nó vẫy để báo đường trơn. {b}Anh lái xe trẻ ngồi uống nước chè ở quán nhà ngoại đã nghe mẹ kể chuyện cậu Út. Từ đấy, mỗi lần qua khúc cua thứ bảy, bố bấm hai tiếng còi và thả một nắm vàng mã. {q}Chào một người quen. {c}Tôi kể cho mẹ chuyện chú Tư: đêm ấy bố thấy một thằng bé đứng mưa vẫy, và bố đánh lái về phía nó, miệng cười. {d}Mẹ nhắm mắt lại.',
      sfx: [['heartbeat', 'c', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { const p = k.at('a', 9, 'linear'); pass(k, { rain: true }); truck(k, k.lerp(-200, 700, p), 830, 0.7, { lights: true }); nonLa(k, 1250, 840, 0.9, 0.85 * k.at('a', 3)); shade(k, 0.72, [{ x: k.lerp(300, 1250, p), y: 760, r: 380 }]); return; }
        if (k.t < k.cue('c')) { quan(k, {}); truck(k, 640, 890, 0.6, {}); ch(k, 1150, 830, 400, { ...ME_TRE, face: 'sad', talk: 0.2 }); ch(k, 900, 900, 440, { ...BO_TRE, face: 'sad' }); cold(k, 0.6); quote(k, '"Chào một người quen."', 'q', { color: AMBER }); return; }
        zoom(k, 900, 650, 1.6, () => { kitchen(k, { fire: 0.3, bowl: false }); ch(k, 900, 900, 430, { ...ME, face: after(k, 'd') ? 'sad' : 'blank', gloom: after(k, 'd') ? 0.5 : 0, pose: 'hold' }); shade(k, 0.68, [KITCHEN.fire, { x: 900, y: 650, r: 400, warm: 0.6 }]); });
        quote(k, 'Mẹ nhắm mắt lại.', 'd', { color: AMBER });
      },
    },
    {
      say: '{a}Tôi hỏi mẹ: vậy người về hôm ấy là bố, hay là cậu Út? {b}Mẹ bảo: {q}Mẹ không biết. Ai gọi mẹ là chị, mẹ cũng thưa. {c}Rồi mẹ cất tấm ảnh vào hộp, đóng nắp, và nói thêm một câu mà mãi nhiều năm sau tôi mới hiểu: {d}Bố con hiền lắm. Bố con chẳng nỡ để ai đứng mưa một mình.',
      draw(k) {
        zoom(k, 900, 650, 1.8, () => { kitchen(k, { fire: 0.3, bowl: false }); ch(k, 900, 900, 430, { ...ME, face: after(k, 'b') ? 'cry' : 'sad', tears: after(k, 'b') ? 0.7 : 0, pose: 'hold', talk: after(k, 'b') ? 0.2 : 0 }); shade(k, 0.66, [KITCHEN.fire, { x: 900, y: 650, r: 400, warm: 0.6 }]); });
        quote(k, '"Ai gọi mẹ là chị, mẹ cũng thưa."', 'q', { color: AMBER, until: 'c' });
        quote(k, '"Bố con chẳng nỡ để ai đứng mưa một mình."', 'd', { color: AMBER, size: 46 });
      },
    },

    // ===== KẾT =====
    {
      chapter: 'Kết',
      say: '{a}Đêm mười bốn tháng Chạp năm ấy, mẹ ra đầu ngõ như mọi năm. Nhưng lần này mẹ thắp hai nén hương, đặt xuống vệ cỏ một bát cơm, một nắm sim, và cái phích móp rót đầy nước chè. Mẹ đốt vàng, rồi nói rất khẽ, đủ để tôi đứng trong cổng nghe thấy: {b}Về đi. Cả hai. Đừng đứng mưa nữa. {c}Mẹ quay vào, không ngoảnh lại. {d}Từ đêm ấy, không còn tiếng còi, không còn tiếng ho, không còn ai gọi chị ơi ngoài sân. Cái điếu cày nằm yên trong gian thờ.',
      sfx: [['wind', 'a', 0.25]],
      draw(k) {
        if (k.t < k.cue('d')) {
          lane(k);
          incense(k, 880, 1000, 2); bowl(k, 980, 1010, 0.6); sim(k, 1080, 1000, 0.8); phich(k, 1170, 1010, 0.7); fireSmall(k, 760, 1010, 0.9);
          ch(k, after(k, 'c') ? k.lerp(960, 1300, k.at('c', 3)) : 960, after(k, 'c') ? 1060 : 1000, 430, { ...ME, face: 'sad', walk: after(k, 'c'), flip: after(k, 'c'), talk: after(k, 'b') && !after(k, 'c') ? 0.2 : 0 });
          shade(k, 0.8, [{ x: 820, y: 940, r: 420, warm: 1, flicker: 1 }]);
          tag(k, 'ĐÊM 14 THÁNG CHẠP', 'a');
          quote(k, '"Về đi. Cả hai. Đừng đứng mưa nữa."', 'b', { color: AMBER, until: 'd' });
          return;
        }
        zoom(k, 960, 560, 1.6, () => { altarRoom(k, {}); dieuCay(k, 760, 590, 0.6, 0); shade(k, 0.55, altarLights(1.3)); });
      },
    },
    {
      say: '{a}Sáng mùng Một Tết, tôi ra đầm sen câu cá, như lời hẹn. Tôi mang theo hai cái cần, cắm một cái bên cạnh, không mắc mồi. Sương dày đến mức không nhìn thấy bờ bên kia. {b}Ngồi được một lúc, tôi ngửi thấy mùi thuốc lào. {c}Tôi không quay lại. Lần này, tôi nhớ ba điều cấm.',
      sfx: [['wind', 0, 0.2]],
      draw(k) {
        lotus(k, { time: 'dawn' });
        ch(k, 1000, 920, 330, { ...HUY, face: after(k, 'b') ? 'sad' : 'calm', pose: 'hold', tears: after(k, 'c') ? 0.5 : 0 });
        rod(k, 1030, 800, 0.8); rod(k, 760, 860, 0.9);
        wisp(k, 760, 860, 0.25 * k.at('b', 3));
        const { ctx } = k; const fg = ctx.createLinearGradient(0, 280, 0, 760); fg.addColorStop(0, 'rgba(235,235,232,0)'); fg.addColorStop(0.5, 'rgba(235,235,232,0.35)'); fg.addColorStop(1, 'rgba(235,235,232,0)'); ctx.fillStyle = fg; ctx.fillRect(-200, 280, k.W + 400, 480);
        k.vignette(0.4);
        tag(k, 'MÙNG MỘT TẾT', 'a');
        quote(k, 'Tôi không quay lại.', 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Chiều mùng Một, mẹ nhờ người lên Ba Lăng đón cô Liên và thằng Bin về. Mẹ ra tận đầu ngõ, dắt thằng bé vào gian thờ, đưa cho nó nén hương thắp cho bố. Năm ấy, lần đầu tiên, trên bàn thờ nhà tôi có thêm tấm ảnh cậu Út. {b}Thằng Bin cắm hương xong, đứng nhìn ảnh bố rất lâu. {p}Rồi nó quay sang tấm ảnh cậu bé đội nón, chỉ tay, nói rất tự nhiên: {c}Anh này hay ngồi trên xe với bố. {e}Anh ấy bảo anh ấy về nhà chị. {d}Cả gian thờ im phắc. Mẹ tôi quay đi, lau mắt.',
      sfx: [['stinger', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) {
          altarRoom(k, { ut: 1 });
          ch(k, 980, 980, 260, { ...BIN, face: 'calm', pose: after(k, 'p') ? 'point' : 'hold', flip: after(k, 'p') });
          ch(k, 700, 980, 430, { ...ME, face: 'sad' }); ch(k, 1420, 980, 420, { ...LIEN, face: 'sad', flip: true }); ch(k, 520, 980, 440, { ...BA_NOI, face: 'sad' }); ch(k, 1600, 990, 330, { ...HUY, face: 'blank', flip: true });
          shade(k, 0.55, [...altarLights(1.3), { x: 960, y: 700, r: 500, warm: 0.6 }]);
          tag(k, 'CHIỀU MÙNG MỘT', 'a');
          return;
        }
        zoom(k, 1225, 465, 2.6, () => { altarRoom(k, { ut: 1 }); shade(k, 0.45, altarLights(1.4)); });
        quote(k, '"Anh này hay ngồi trên xe với bố."', 'c', { color: COLD, until: 'e' });
        quote(k, '"Anh ấy bảo anh ấy về nhà chị."', 'e', { color: COLD });
      },
    },
    {
      say: '{a}Nhiều năm sau, tôi cũng lái xe qua đèo Khe. Đến khúc cua thứ bảy, {t}tôi bấm hai tiếng còi, thả một nắm vàng mã qua cửa xe. {q}Chào hai người quen. {b}Có những đêm mưa, tôi tưởng như thấy ở vệ đường một cái bóng nhỏ đội nón. {m}Có đêm, bên cạnh nó, như có thêm một người đàn ông đứng rít thuốc lào. {c}Tôi không dừng lại. {e}Tôi cũng không đánh lái.',
      sfx: [['click', 't', 0.35], ['click', ['t', 0.4], 0.35], ['wind', 'b', 0.3]],
      draw(k) {
        pass(k, { rain: true });
        const p = k.at('a', 18, 'linear'), tx = k.lerp(-300, 700, p);
        truck(k, tx, 830, 0.7, { lights: true });
        vangMa(k, tx, 600, k.cue('t', 1));
        nonLa(k, 1260, 820, 0.8, 0.6 * k.at('b', 2));
        wisp(k, 1360, 820, 0.22 * k.at('m', 2));
        shade(k, 0.68, [{ x: k.lerp(100, 1200, p), y: 760, r: 520 }]);
        tag(k, 'NHIỀU NĂM SAU', 'a');
        quote(k, '"Chào hai người quen."', 'q', { color: AMBER, until: 'b' });
        quote(k, 'Tôi cũng không đánh lái.', 'e', { color: AMBER });
      },
    },
    {
      lead: 0.8, tail: 2.5,
      say: '{a}Bốn mươi chín ngày sau khi bố tôi mất, người về gọi mẹ tôi là chị. {b}Người ấy biết cái tên chỉ bố tôi gọi. Người ấy mang về những quả sim chỉ cậu Út hái. {c}Đến giờ, tôi vẫn không biết hôm ấy ai đã về. Hay là cả hai.',
      sfx: [['wind', 0, 0.25], ['gong', 'c', 0.2]],
      draw(k) {
        zoom(k, 1090, 440, 1.8 - 0.4 * k.at('a', 14, 'inOut'), () => { altarRoom(k, { ut: 1 }); sim(k, 1060, 548, 0.8); phich(k, 820, 560, 0.5); shade(k, 0.5, altarLights(1.4)); });
        quote(k, 'Ai đã về? Hay là cả hai.', 'c', { color: PAPER, size: 56 });
      },
    },

    // ===== CUỐI =====
    nextScene({
      say: '{next}Tập sau: ở xóm tôi, người ta bảo chim lợn kêu trên mái nhà nào, nhà ấy sắp có tang. Năm ấy, nó kêu trên mái nhà tôi ba đêm liền. Nhưng không ai trong nhà chết cả.',
      title: 'Chim Lợn | Ba Đêm Kêu Trên Mái Nhà Tôi',
      hook: 'Ba đêm liền… nhưng không ai trong nhà chết cả.',
      art(k) {
        const { ctx } = k;
        const g = ctx.createLinearGradient(0, 200, 0, 800); g.addColorStop(0, '#070a14'); g.addColorStop(1, '#1c2640'); ctx.fillStyle = g; ctx.fillRect(400, 200, 1120, 600);
        ctx.fillStyle = '#efe8cf'; ctx.beginPath(); ctx.arc(1350, 300, 46, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#14161c'; ctx.beginPath(); ctx.moveTo(500, 800); ctx.lineTo(700, 560); ctx.lineTo(1220, 560); ctx.lineTo(1420, 800); ctx.closePath(); ctx.fill();
        k.prop('owl', 960, 540, 120);
        k.vignette(0.5);
      },
    }),
    subScene({
      say: '{q}Theo bạn, người về hôm ấy là bố của Huy, hay là cậu Út? Hãy để lại câu trả lời. {sub}Và nếu muốn nghe tiếp những chuyện chưa có lời giải, hãy đăng ký Nhân Gian Chưa Kể.',
      question: 'Người về hôm ấy là bố của Huy, hay là cậu Út?',
      art(k) { photo(k, 860, 960, 120, 156, BO_PIC); photo(k, 1060, 960, 120, 156, UT_PIC); },
    }),
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
