// Kênh Nếu Bạn Là — "Thầy" giải hạn online, PHẦN 2/2: khuôn mặt bạn đi làm 24/7.
// Kịch bản duyệt: kich-ban.md (12/11/2026). Kể liền mạch: mục tiêu + đồng hồ = cọc SH 30tr trước 9:00 sáng mai (thiếu 20tr);
// một lần lùi thời gian ở hook (7:00 → 6:00 hôm qua), sau đó chỉ đi tới; sợi chỉ = chòm râu dán (dán lại → bóc lần hai).
// Truyện hư cấu; tên người, "Pháp đàn Lộc Phát", địa danh đều hư cấu. Thủ đoạn theo tin có thật:
// - Bộ Công an cảnh báo 25 kịch bản lừa đảo (08/09/2026), nhóm AI/deepfake/deepvoice:
//   https://thitruongtaichinhtiente.vn/canh-bao-thu-doan-lua-dao-moi-khi-nguoi-than-cung-co-the-tro-thanh-mat-xich-trong-kich-ban-gia-mao-85628.html
// - Gọi video giả người thân "bị tai nạn, đang cấp cứu" đòi chuyển tiền gấp: https://baovanhoa.vn/phap-luat/canh-giac-chieu-gia-nguoi-than-vay-tien-qua-video-call-233442.html
// - Deepfake giả giọng/video từ 30 USD, theo thời gian thực: https://vnexpress.net/deepfake-lua-dao-ngay-cang-re-4948819.html
// - Cúng sao giải hạn online 2026 kết hợp deepfake: https://luatminhkhue.vn/canh-bao-lua-dao-cung-sao-giai-han-online.aspx
// - Đường dây lừa đảo tâm linh trên livestream (Đắk Lắk, 26/08/2026, hơn 50 tỷ):
//   https://baolaocai.vn/triet-pha-duong-day-loi-dung-yeu-to-tam-linh-tren-khong-gian-mang-lua-dao-chiem-doat-hon-50-ty-dong-post906978.html
import { nextEpisodeScene, subscribeScene } from '/engine/templates.js';
import * as thumbs from '/videos/096-neu-ban-la-thay-giai-han-online-p2/thumbs.js';
import {
  G, HO, spk, pop, tag, cap, tint, paper, phone, chat, cash, moto, ipad, tw, room, lamp, washroom, wedding, policeHall, alley,
  LOC, LOC_MC, BATAM, TITIN, TAM, ME, CALLGIRL, POLICE, CA, liveRoom, altarFront, liveUI, troRoom, miniLive,
} from '/channel/neu-ban-la.js';

const S = 520;
const LX = 960, LY = 870, LS = 650;
// ---------- nhân vật của tập ----------
export const CASUAL = { ...LOC_MC, tie: false, color: '#8a6a4f' };              // Lộc ngoài đời, áo nâu
export const BEARDED = { ...CASUAL, beard: 'goat', beardColor: '#d9d4cc' };      // Lộc dán lại râu
export const OLDTAM = { ...TAM, color: '#6b7a45' };                              // ông Tâm, áo bộ đội bạc màu
export const MOTHER = { ...ME, hairColor: '#a8a29a', color: '#5a6b8a' };         // mẹ Lộc
const AOTIM = { ...CALLGIRL('#8e44ad', 'bun'), belly: 0.5, blush: false }; // bà áo dài tím
const BRIDE = { ...CALLGIRL('#ffffff', 'bun') };
const GROOM = { ...LOC_MC, color: '#1b2338', tie: '#c0392b', hair: 'spiky' };

// ---------- bộ phận riêng ----------
const fmt = (v) => (v <= 0 ? '0' : v < 1 ? `${Math.round(v * 1000)}k` : `${String(Math.round(v * 100) / 100).replace('.', ',')}tr`);
// Bảng đếm góc phải: ⏰ giờ · 💰 hoa hồng 2% · 🛵 SH còn thiếu (hạn cọc 9:00).
function shHud(k, o = {}) {
  const { ctx } = k;
  const x = k.W - 520, y = 36, w = 484, h = 200;
  ctx.save(); ctx.globalAlpha *= 0.9; ctx.fillStyle = '#14161d'; ctx.beginPath(); ctx.roundRect(x, y, w, h, 18); ctx.fill(); ctx.restore();
  ctx.strokeStyle = '#f2c230'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x, y, w, h, 18); ctx.stroke();
  k.text('⏰ ' + (o.clock ?? '6:00'), x + 22, y + 38, { size: 30, font: 'title', align: 'left', color: '#c9ced4' });
  k.text('hạn cọc: 9:00', x + w - 22, y + 38, { size: 24, align: 'right', color: '#ff8a7a' });
  k.text('💰 HOA HỒNG 2%', x + 22, y + 88, { size: 26, font: 'title', align: 'left', color: '#c9ced4' });
  k.text(fmt(tw(k, o.hh ?? 0)), x + w - 22, y + 88, { size: 32, font: 'title', align: 'right', color: '#7fe0a8' });
  const miss = tw(k, o.miss ?? 20);
  k.text('🛵 SH CÒN THIẾU', x + 22, y + 150, { size: 26, font: 'title', align: 'left', color: '#c9ced4' });
  k.text(o.sold ? 'ĐÃ BÁN ❌' : fmt(miss), x + w - 22, y + 150, { size: 32, font: 'title', align: 'right', color: o.sold ? '#ff5a4a' : '#9fd0f0' });
  ctx.fillStyle = '#2b2f3d'; ctx.beginPath(); ctx.roundRect(x + 22, y + 172, w - 44, 12, 6); ctx.fill();
  ctx.fillStyle = o.sold ? '#ff5a4a' : '#9fd0f0'; ctx.beginPath(); ctx.roundRect(x + 22, y + 172, Math.max(12, (w - 44) * (o.sold ? 1 : Math.min(1, (30 - miss) / 30))), 12, 6); ctx.fill();
}
// Khung live của "thầy Lộc Phát" (bản deepfake): phòng + Lộc có râu + bàn thờ + giao diện.
function live(k, o = {}) {
  liveRoom(k);
  k.char(LX, LY, LS, { ...LOC, shadow: false, talk: o.mute ? 0 : 0.5 + 0.5 * Math.sin(k.gt * 7), face: 'smug', pose: 'present', ...o.loc });
  altarFront(k, { ring: 0 });
  liveUI(k, o.ui ?? {});
}
// Live thu nhỏ đặt vào ô (x, y, w, h).
export const liveMini = (k, x, y, w, h, o = {}) => miniLive(k, x, y, w, h, () => { liveRoom(k); k.char(LX, LY, LS, { ...LOC, face: 'smug', pose: o.pose ?? 'present', talk: 0.5 + 0.5 * Math.sin(k.gt * 7 + (o.ph ?? 0)), shadow: false }); altarFront(k); }, { view: o.view ?? '3.020', label: o.label });
// Ô tròn chèn: fn vẽ nhân vật với gốc (0, 0) ở giữa ô.
export function inset(k, x, y, r, bg, fn, p = 1) {
  if (p <= 0) return;
  k.group({ x, y, s: 0.6 + 0.4 * p }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, r + 10, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = bg; ctx.fillRect(-r, -r, 2 * r, 2 * r); fn(k);
    ctx.restore();
  });
}
export const tamOld = (k, face = 'sad', p = 1, x = 1640, y = 640, r = 150) => inset(k, x, y, r, '#1b2238', () => {
  k.char(0, r * 2, r * 2.8, { ...OLDTAM, face, pose: 'hold', shadow: false });
  const g = k.ctx.createRadialGradient(0, 40, 10, 0, 40, r); g.addColorStop(0, 'rgba(160,200,255,0.35)'); g.addColorStop(1, 'rgba(160,200,255,0)'); k.ctx.fillStyle = g; k.ctx.fillRect(-r, -r, 2 * r, 2 * r);
}, p);
// Chòm râu dê cầm tay.
export function heldBeard(k, x, y, s = 1, r = 0) {
  k.group({ x, y, s, r }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#d9d4cc'; ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-40, -40); ctx.quadraticCurveTo(0, 120, 40, -40); ctx.quadraticCurveTo(0, -20, -40, -40); ctx.fill(); ctx.stroke();
  });
}
// Cửa phòng trọ (bên phải), open 0..1.
export function door(k, open = 0, knock = null) {
  const { ctx } = k;
  ctx.fillStyle = '#2b2f36'; ctx.fillRect(1730, 330, 190, 600);
  const sh = knock != null && k.t > k.cue(knock) && k.t < k.cue(knock) + 1.4 ? Math.sin(k.t * 50) * 4 : 0;
  ctx.fillStyle = '#9b6a3a'; ctx.strokeStyle = '#5a3a1a'; ctx.lineWidth = 6;
  ctx.save(); ctx.translate(1740 + sh, 340); ctx.scale(1 - 0.85 * open, 1); ctx.fillRect(0, 0, 170, 590); ctx.strokeRect(0, 0, 170, 590); ctx.fillStyle = '#f2c230'; ctx.beginPath(); ctx.arc(140, 300, 10, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  if (knock != null) { const p = k.at(knock, 0.3, 'back'); if (p > 0 && k.t < k.cue(knock) + 1.6) k.burst(1640, 420, 80 * p, 'CỐC CỐC!', { p, size: 34, fill: '#fff', color: '#1b1b24' }); }
}
// Túi nilon đen căng phồng (tiền).
export function bag(k, x, y, s = 1) {
  k.group({ x, y, s }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.moveTo(-70, -60); ctx.quadraticCurveTo(-110, 60, -40, 70); ctx.lineTo(40, 70); ctx.quadraticCurveTo(110, 60, 70, -60); ctx.quadraticCurveTo(0, -40, -70, -60); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-30, -80, 18, 26, -0.4, 0, Math.PI * 2); ctx.ellipse(30, -80, 18, 26, 0.4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-50, -20); ctx.quadraticCurveTo(-60, 20, -30, 50); ctx.stroke();
  });
}
// Ảnh in khuôn mặt "thầy" có râu.
export function photoLoc(k, x, y, s = 1, r = -0.05) {
  k.group({ x, y, s, r }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#fff'; ctx.fillRect(-90, -110, 180, 220);
    ctx.save(); ctx.beginPath(); ctx.rect(-78, -98, 156, 170); ctx.clip(); ctx.fillStyle = '#5a1616'; ctx.fillRect(-78, -98, 156, 170);
    k.char(0, 170, 250, { ...LOC, face: 'smug', pose: 'stand', shadow: false }); ctx.restore();
    k.text('THẦY LỘC PHÁT', 0, 92, { size: 16, font: 'title', color: '#c0392b' });
  });
}
// Khung ảnh bà cụ (vợ ông Tâm).
export function wifeFrame(k, x, y, s = 1) {
  k.group({ x, y, s }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#5a3a1a'; ctx.fillRect(-90, -115, 180, 230);
    ctx.save(); ctx.beginPath(); ctx.rect(-74, -99, 148, 198); ctx.clip(); ctx.fillStyle = '#d8cfc0'; ctx.fillRect(-74, -99, 148, 198);
    k.char(0, 185, 260, { ...MOTHER, color: '#3a3f48', hairColor: '#d9d4cc', face: 'laugh', pose: 'stand', shadow: false }); ctx.restore();
    ctx.fillStyle = '#1b1b24'; ctx.fillRect(-90, -115, 40, 18);
  });
}
// Cốc mì tôm cắm hương.
export function noodleCup(k, x, y, s = 1, lit = true) {
  k.group({ x, y, s }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#f4f1ea'; ctx.beginPath(); ctx.moveTo(-50, -80); ctx.lineTo(50, -80); ctx.lineTo(38, 0); ctx.lineTo(-38, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#c0392b'; ctx.fillRect(-46, -60, 92, 24); k.text('MÌ', 0, -47, { size: 18, font: 'title', color: '#fff' });
    ctx.strokeStyle = '#7a4a2a'; ctx.lineWidth = 4; for (const d of [-14, 0, 14]) { ctx.beginPath(); ctx.moveTo(d, -80); ctx.lineTo(d * 1.4, -170); ctx.stroke(); }
    if (lit) k.steam(0, -180, 0.8);
  });
}
// Căn cước (CCCD).
export function idCard(k, x, y, s = 1, p = 1) {
  if (p <= 0) return;
  k.group({ x, y, s: s * k.ease.back(Math.min(1, p)), r: -0.06 }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#e8f0f8'; ctx.strokeStyle = '#2e6da4'; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(-220, -135, 440, 270, 18); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#c0392b'; ctx.fillRect(-220, -135, 440, 50); k.text('CĂN CƯỚC', 0, -108, { size: 30, font: 'title', color: '#f2c230' });
    ctx.fillStyle = '#c9d2e0'; ctx.fillRect(-190, -60, 120, 150);
    k.text('NGUYỄN VĂN LỘC', 40, -30, { size: 26, font: 'title', color: '#1b1b24' });
    k.text('MC đám cưới 🎤', 40, 20, { size: 22, color: '#5a5f66' });
    k.text('0•• ••• ••• 214', 40, 66, { size: 22, color: '#5a5f66' });
  });
}
// Thẻ thông tin to (giấy trắng, các dòng hiện theo cue): rows = [[chữ, cue, màu?]].
export function card(k, x, y, w, h, title, rows, o = {}) {
  const p = o.p ?? 1;
  if (p <= 0) return;
  k.group({ x, y, s: 0.6 + 0.4 * k.ease.back(Math.min(1, p)), r: o.r ?? -0.02 }, () => {
    const { ctx } = k;
    ctx.fillStyle = o.bg ?? '#fffdf6'; ctx.strokeStyle = o.border ?? '#1b1b24'; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 16); ctx.fill(); ctx.stroke();
    if (title) { ctx.fillStyle = o.head ?? '#1b1b24'; ctx.fillRect(-w / 2, -h / 2, w, 70); k.text(title, 0, -h / 2 + 36, { size: 34, font: 'title', color: o.headText ?? '#f2c230' }); }
    rows.forEach(([t, cue, c], i) => {
      const q = cue == null ? 1 : k.at(cue, 0.35);
      if (q <= 0) return;
      ctx.save(); ctx.globalAlpha *= q;
      k.text(t, -w / 2 + 34, -h / 2 + (title ? 120 : 60) + i * (o.gap ?? 64), { size: o.size ?? 34, align: 'left', color: c ?? '#1b1b24', font: c ? 'title' : undefined, maxWidth: w - 68 });
      ctx.restore();
    });
  });
}
// Tờ 200 câu thu âm (vọng lại Phần 1).
export function linesSheet(k, x, y, hl) {
  card(k, x, y, 700, 420, 'THU ÂM · 200 CÂU', [['1.  Nhà con có vong theo.'], ['2.  Chuyển khoản xong nhắn thầy.'], ['…'], ['140.  Mẹ ơi, con đây. Con đâm phải người ta…', null, hl ? '#c0392b' : undefined]], { size: 28, gap: 70, head: '#3a2a2e' });
}
// Cuộc gọi video (khung điện thoại nằm ngang): fn vẽ người gọi với gốc ở giữa đáy.
export function videoCall(k, x, y, w, h, name, fn, o = {}) {
  const p = o.p ?? 1;
  if (p <= 0) return;
  k.group({ x, y, s: 0.6 + 0.4 * k.ease.back(Math.min(1, p)) }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(-w / 2 - 16, -h / 2 - 16, w + 32, h + 32, 30); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 18); ctx.clip();
    ctx.fillStyle = o.bg ?? '#d8cfc0'; ctx.fillRect(-w / 2, -h / 2, w, h);
    k.group({ x: 0, y: h / 2 }, () => fn(k));
    ctx.restore();
    ctx.save(); ctx.globalAlpha *= 0.85; ctx.fillStyle = '#14161d'; ctx.fillRect(-w / 2, -h / 2, w, 56); ctx.restore();
    k.text('📞 ' + name, 0, -h / 2 + 29, { size: 30, font: 'title', color: '#fff' });
  });
}
const bigWord = (k, text, cue, x, y, color = '#ffe08a', size = 64) => k.text(text, x, y, { size, font: 'title', color, fx: 'pop', p: k.at(cue, 0.3), outline: '#1b1b24', outlineWidth: 12 });
// Lộc nằm trên đệm (xoay ngang).
const lying = (k, o = {}) => k.group({ x: 640, y: 800, r: -Math.PI / 2 }, () => k.char(0, 0, S * 0.9, { ...CASUAL, pose: 'hold', shadow: false, ...o }));
// Đồng hồ cát chờ (các bước "Nhìn màn hình. Nhìn bạn.").
const REAL = '#9fd0f0', FAKE = '#8a8f98';

export default {
  meta: {
    title: 'Nếu Bạn Là "Thầy" Giải Hạn Online… (Phần 2)',
    description: `7 giờ sáng, một ông già gõ cửa phòng trọ của bạn: tay cầm tấm ảnh in khuôn mặt bạn, tay xách 50 triệu tiền mặt. Trên điện thoại, "bạn" vẫn đang livestream.
Phần 2 của câu chuyện hư cấu dựa trên các vụ lừa đảo giải hạn online và lừa đảo bằng deepfake được báo chí đưa tin năm 2026: khuôn mặt, giọng nói bị nhân bản để livestream 24/7, gọi video giả người thân "bị tai nạn", và tài khoản đứng tên người làm thuê.`,
    footer: `📚 Dựa trên cảnh báo của Bộ Công an về 25 kịch bản lừa đảo, trong đó có AI, deepfake, deepvoice (08/09/2026); thủ đoạn gọi video giả người thân bị tai nạn để vay tiền (Báo Văn Hoá); dịch vụ deepfake giá rẻ theo thời gian thực (VnExpress); đường dây lừa đảo tâm linh trên livestream bị triệt phá tại Đắk Lắk (26/08/2026). Tên người, địa danh và tình tiết đã được hư cấu.
⚠️ Người thân gọi video xin tiền gấp: cúp máy, gọi lại số quen, hỏi một câu chỉ người nhà biết. Đừng chụp căn cước, quay mặt "xác minh" hay cho người lạ mượn điện thoại cài app: tài khoản đứng tên bạn thì bạn là người chịu trách nhiệm. Thấy dấu hiệu lừa đảo: gọi 113.
🔔 Đăng ký Nếu Bạn Là để xem câu chuyện tiếp theo.`,
    links: [['▶ Phần 1', '076-neu-ban-la-thay-giai-han-online-p1'], ['🔔 Đăng ký', 'https://www.youtube.com/@neubanlaa?sub_confirmation=1']],
    tags: ['lừa đảo', 'giải hạn online', 'deepfake', 'lừa đảo deepfake', 'giả giọng người thân', 'thủ đoạn lừa đảo mới', 'lừa đảo tâm linh', 'nếu bạn là', 'hoạt hình'],
    hashtags: ['luadao', 'deepfake', 'canhgiac'],
    style: 'clean', tts: 'omnivoice', omniVoice: 'fb2', speed: 1,
    lead: 0.25, tail: 0.45, pause: 0.2,
    transition: 'cut', sfxTransitions: false, camera: 0.04,
    sfxVolume: 0.6,
    paper: '#f7f1e3', privacy: 'private',
  },
  thumbnail: thumbs.a,

  scenes: [
    // ===== 1. HOOK: 7:00, gõ cửa =====
    {
      say: '{knock}Cốc. Cốc. Cốc. Bảy giờ sáng, có người gõ cửa phòng trọ của bạn. {peep}Qua khe cửa: một ông già áo bộ đội bạc màu. {photo}Tay trái cầm tấm ảnh in khuôn mặt bạn, có râu. {bag}Tay phải xách cái túi nilon đen căng phồng. {call}Ông gọi: Thầy Lộc Phát ơi, tôi mang tiền đến tận nơi rồi. {phone}Bạn nhìn điện thoại. {live}Trên đó, thầy Lộc Phát vẫn đang livestream. {p2}Đây là phần hai, phần một ở mô tả, nhớ đăng ký. {back}Còn bây giờ, lùi lại hai mươi lăm tiếng.',
      sfx: [['click', 'knock', 0.6], ['click', ['knock', 0.35], 0.6], ['click', ['knock', 0.7], 0.6], ['whoosh', 'peep', 0.3], ['pop', 'photo', 0.4], ['pop', 'bag', 0.4], ['ding', 'call', 0.3], ['click', 'phone', 0.4], ['boom', 'live', 0.5], ['pop', 'p2', 0.4], ['slideDown', 'back', 0.5]],
      draw(k) {
        const peep = k.t > k.cue('peep') && k.t < k.cue('phone');
        if (k.t < k.cue('peep')) {
          troRoom(k, { dawn: true }); door(k, 0, 'knock'); tag(k, '7:00');
          lying(k, { face: 'shock', sq: k.take('knock', 0.8) });
          return;
        }
        if (peep) {
          paper(k, '#0b0b10');
          inset(k, 960, 520, 420, '#9aa3ad', () => {
            const { ctx } = k; ctx.fillStyle = '#c9c1b4'; ctx.fillRect(-420, -420, 840, 840); ctx.fillStyle = '#8a8f98'; ctx.fillRect(-420, 260, 840, 200);
            k.char(0, 420, 820, { ...OLDTAM, face: k.t > k.cue('call') ? 'calm' : 'blank', pose: { l: [40, 90], r: [40, 90] }, talk: spk(k, 'call', 'phone'), shadow: false });
            if (k.t > k.cue('photo')) photoLoc(k, -230, 120, 1.1 * pop(k, 'photo'), -0.12);
            if (k.t > k.cue('bag')) bag(k, 240, 230, 1.2 * pop(k, 'bag'));
          });
          if (k.t > k.cue('call')) cap(k, '"THẦY LỘC PHÁT ƠI!"', 'call', { color: '#f2c230', y: 1000 });
          return;
        }
        // điện thoại: thầy Lộc Phát vẫn đang live
        troRoom(k, { dawn: true }); door(k, 0); tint(k, '#14161d', 0.5);
        phone(k, 960, 520, 1.45, { p: k.at('phone', 0.4, 'back'), screen: (k, w, h) => {
          k.ctx.fillStyle = '#5a1616'; k.ctx.fillRect(-w / 2, -h / 2, w, h);
          k.group({ x: -288, y: -162, s: 0.3 }, () => { liveRoom(k); k.char(LX, LY, LS, { ...LOC, face: 'smug', pose: 'present', talk: 0.5 + 0.5 * Math.sin(k.gt * 7), shadow: false }); altarFront(k); });
          k.ctx.fillStyle = '#ff2d55'; k.ctx.beginPath(); k.ctx.roundRect(-w / 2 + 14, -h / 2 + 20, 76, 30, 6); k.ctx.fill(); k.text('LIVE', -w / 2 + 52, -h / 2 + 36, { size: 20, font: 'title', color: '#fff' });
        } });
        if (k.t > k.cue('live') && k.t < k.cue('p2')) cap(k, 'MÌNH Ở ĐÂY… MÀ "THẦY" VẪN ĐANG LIVE?!', 'live', { color: '#ff8a7a', y: 980, size: 54 });
        if (k.t > k.cue('p2')) {
          tint(k, '#14161d', 0.6 * k.at('p2', 0.4));
          k.text('NẾU BẠN LÀ', 960, 380, { size: 70, font: 'title', color: '#fff', fx: 'pop', p: k.at('p2', 0.4), outline: '#1b1b24', outlineWidth: 12 });
          k.text('"THẦY" GIẢI HẠN ONLINE', 960, 490, { size: 96, font: 'title', color: '#f2c230', fx: 'pop', p: k.at(k.cue('p2', 0.3), 0.4), outline: '#1b1b24', outlineWidth: 14 });
          k.text('PHẦN 2', 960, 610, { size: 60, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at(k.cue('p2', 0.6), 0.4), outline: '#1b1b24', outlineWidth: 12 });
        }
        if (k.t > k.cue('back')) { const p = k.at('back', 0.8); tint(k, '#0d1222', 0.6 * p); k.text('⏪ 6:00 HÔM QUA', 960, 760, { size: 84, font: 'title', color: '#9fd0f0', fx: 'pop', p, outline: '#1b1b24', outlineWidth: 12 }); }
      },
    },
    // ===== 2. 6:00 hôm qua: mặt mình làm ba ca =====
    {
      say: 'Sáu giờ sáng hôm qua. {sit}Bạn ngồi trên giường, nhìn mặt mình nói "Gia đạo bất ổn" trên ba kênh cùng lúc. {norm}Người bình thường sẽ hoảng. {mc}Nhưng bạn làm MC đám cưới mười năm, nên câu đầu tiên bạn nghĩ là: {fee}thế cát-xê tính sao? {call}Bạn gọi bà Tám.',
      sfx: [['pop', 'sit', 0.4], ['pop', ['sit', 0.3], 0.4], ['pop', ['sit', 0.6], 0.4], ['gulp', 'norm', 0.4], ['ding', 'mc', 0.3], ['cash', 'fee', 0.5], ['click', 'call', 0.4]],
      draw(k) {
        paper(k, '#14161d'); tag(k, '6:00');
        for (let i = 0; i < 3; i++) if (k.t > k.cue('sit', i * 0.3)) liveMini(k, 60 + i * 610, 170, 580, 326, { pose: ['point', 'present', 'shout'][i], ph: i * 2, view: '3.0' + (i + 1) + '0', label: ['Thầy Lộc Phát', 'Lộc Phát Official', 'Pháp Đàn Lộc Phát'][i] });
        const fee = k.t > k.cue('fee');
        k.char(420, 1250, S * 1.5, { ...CASUAL, face: fee ? 'smug' : k.t > k.cue('norm') && k.t < k.cue('mc') ? 'shock' : 'blank', pose: fee ? 'think' : 'hold', shadow: false, sq: k.take('fee', 1) });
        heldBeard(k, 760, 900, 1.3, 0.2);
        if (k.t > k.cue('norm') && k.t < k.cue('mc')) bigWord(k, '😱 HOẢNG?', 'norm', 1300, 700, '#ff8a7a', 70);
        if (fee) bigWord(k, '💸 CÁT-XÊ TÍNH SAO?', 'fee', 1300, 720, '#f2c230', 76);
        if (k.t > k.cue('call')) phone(k, 1500, 880, 0.4, { ring: true, p: k.at('call', 0.3, 'back') });
      },
    },
    // ===== 3. Điều bảy → 2% mỗi kênh =====
    {
      say: 'Bà Tám nghe máy, giọng như vừa ngủ dậy trên đống tiền: {d7}Em ký hợp đồng rồi mà. Điều bảy: bên B đồng ý cho bên A sử dụng hình ảnh, giọng nói, {forever}vĩnh viễn, trên toàn vũ trụ. {ipad}Bạn nhớ ra cái iPad đêm qua, "ký vào đây nhận tiền". {sign}Bạn đã ký, vì ngay cạnh chữ ký là mười triệu. {turn}Vì thế bạn đổi giọng: Chị ơi, mặt em làm ba ca, thì em phải có phần chứ. {pause}Bà Tám im ba giây. {two}Rồi: Hai phần trăm. Mỗi kênh.',
      sfx: [['pop', 0.3, 0.4], ['scratch', 'd7', 0.4], ['boom', 'forever', 0.4], ['click', 'ipad', 0.4], ['cash', 'sign', 0.4], ['slideUp', 'turn', 0.4], ['drumroll', 'pause', 0.4], ['ding', 'two', 0.6]],
      draw(k) {
        troRoom(k, { dawn: true }); tag(k, '6:05');
        const turn = k.t > k.cue('turn');
        k.char(520, G + 30, S * 1.2, { ...CASUAL, face: turn ? 'smug' : k.t > k.cue('forever') ? 'shock' : 'blank', pose: turn ? 'hips' : 'hold', talk: spk(k, 'turn', 'pause'), sq: k.take('two', 0.8) });
        phone(k, 640, 640, 0.25, {});
        // bà Tám nằm trên đống tiền
        inset(k, 1500, 600, 230, '#3a2a2e', () => {
          k.char(0, 460, 644, { ...BATAM, face: k.t > k.cue('pause') && k.t < k.cue('two') ? 'cold' : 'smug', pose: 'hold', talk: spk(k, 'd7', 'ipad') + spk(k, 'two', null), shadow: false });
          for (let i = 0; i < 4; i++) cash(k, -150 + i * 100, 215, 3, 0.9);
        });
        if (k.t > k.cue('d7') && k.t < k.cue('ipad')) card(k, 960, 300, 860, 300, 'HỢP ĐỒNG · ĐIỀU 7', [['Bên B đồng ý cho bên A sử dụng'], ['hình ảnh, giọng nói của bên B'], ['VĨNH VIỄN · TRÊN TOÀN VŨ TRỤ', 'forever', '#c0392b']], { p: k.at('d7', 0.4), size: 32, gap: 56 });
        if (k.t > k.cue('ipad') && k.t < k.cue('turn')) {
          tint(k, '#0d1222', 0.55);
          k.group({ x: 960, y: 480, s: 2 * pop(k, 'ipad') }, () => { ipad(k, 0, 0, 1, {}); k.ctx.fillStyle = '#fff'; k.ctx.fillRect(-110, -70, 220, 140); k.text('KÝ VÀO ĐÂY', 0, -30, { size: 26, font: 'title', color: '#1b1b24' }); k.text('NHẬN TIỀN 👉 ✍️', 0, 20, { size: 22, color: '#c0392b' }); });
          if (k.t > k.cue('sign')) cash(k, 1360, 560, 6, 1.3, k.at('sign', 0.4));
          tag(k, '⏪ ĐÊM QUA');
        }
        if (k.t > k.cue('pause') && k.t < k.cue('two')) k.text('…', 1500, 300, { size: 140, font: 'title', color: '#fff', outline: '#1b1b24', outlineWidth: 12 });
        if (k.t > k.cue('two')) cap(k, '2% MỖI KÊNH', 'two', { color: '#7fe0a8', y: 980, size: 90 });
      },
    },
    // ===== 4. Thu nhập thụ động + đồng hồ SH =====
    {
      say: '{calc}Bạn tính nhanh hơn máy tính Casio: ba kênh, mỗi kênh một đêm một trăm triệu, hai phần trăm, là sáu triệu. {sleep}Mỗi đêm. Trong lúc bạn ngủ. {passive}Lần đầu tiên trong đời, bạn có thu nhập thụ động, như mấy anh dạy làm giàu trên mạng. {dealer}Rồi đại lý xe nhắn: chiếc SH trắng cuối cùng, giảm mười triệu, giữ đến chín giờ sáng mai, cọc ba mươi triệu. {have}Bạn đang có mười. {gap}Còn thiếu hai mươi, và hai mươi bảy tiếng. {knock}Tám giờ, Tí Tin gõ cửa.',
      sfx: [['click', 'calc', 0.4], ['click', ['calc', 0.4], 0.4], ['tada', ['calc', 2.6], 0.4], ['sparkle', 'sleep', 0.4], ['cash', 'passive', 0.5], ['ding', 'dealer', 0.5], ['cash', 'have', 0.4], ['drumroll', 'gap', 0.4], ['click', 'knock', 0.6], ['click', ['knock', 0.3], 0.6]],
      draw(k) {
        troRoom(k, { dawn: true });
        const hudOn = k.t > k.cue('dealer');
        if (k.t < k.cue('sleep')) {
          k.char(460, G + 30, S * 1.2, { ...CASUAL, face: 'happy', pose: 'think' });
          card(k, 1150, 480, 860, 420, '🧮 CASIO', [['3 kênh × 100 triệu / đêm', 'calc'], ['× 2%', ['calc', 1.4]], ['= 6 TRIỆU / ĐÊM', ['calc', 2.6], '#2e9a55']].map(([t, c, col]) => [t, Array.isArray(c) ? k.cue(c[0], c[1]) : c, col]), { size: 46, gap: 90, head: '#2e6da4', headText: '#fff' });
        } else if (k.t < k.cue('dealer')) {
          lying(k, { face: 'happy' });
          for (let i = 0; i < 3; i++) k.text('Z', 820 + i * 60, 620 - i * 60 - 10 * Math.sin(k.t * 3 + i), { size: 50 + i * 14, font: 'title', color: '#2e6da4' });
          for (let i = 0; i < 8; i++) { const u = (k.t * 0.6 + i / 8) % 1; cash(k, 400 + i * 90, 150 + u * 600, 1, 0.9); }
          if (k.t > k.cue('passive')) cap(k, 'THU NHẬP THỤ ĐỘNG 😴💸', 'passive', { color: '#7fe0a8', y: 200, size: 70 });
        } else {
          k.char(460, G + 30, S * 1.2, { ...CASUAL, face: k.t > k.cue('gap') ? 'shock' : 'happy', pose: 'hold', sweat: k.t > k.cue('gap'), sq: k.take('gap', 0.7) });
          phone(k, 900, 560, 0.9, { p: k.at('dealer', 0.4, 'back'), screen: (k, w, h) => {
            k.ctx.fillStyle = '#0068ff'; k.ctx.fillRect(-w / 2, -h / 2, w, 60); k.text('Đại lý Honda Hưng Thịnh', 0, -h / 2 + 30, { size: 22, font: 'title', color: '#fff', maxWidth: w - 20 });
            chat(k, -w / 2 + 12, -150, 'SH trắng cuối cùng 🔥', { size: 22, maxW: w - 30 });
            chat(k, -w / 2 + 12, -90, 'Giảm 10tr · cọc 30tr', { size: 22, maxW: w - 30 });
            chat(k, -w / 2 + 12, -30, 'Giữ đến 9:00 sáng mai ⏰', { size: 22, maxW: w - 30 });
          } });
          moto(k, 1400, 900, 1.1, { scooter: true, color: '#f4f1ea', bow: true });
          if (k.t > k.cue('have')) k.text('CÓ: 10tr', 1400, 560, { size: 56, font: 'title', color: '#2e6da4', fx: 'pop', p: k.at('have', 0.3), outline: '#fff', outlineWidth: 10 });
          if (k.t > k.cue('gap')) k.text('THIẾU: 20tr · 27 TIẾNG', 1400, 640, { size: 56, font: 'title', color: '#c0392b', fx: 'pop', p: k.at('gap', 0.3), outline: '#fff', outlineWidth: 10 });
          if (k.t > k.cue('knock')) door(k, 0, 'knock');
        }
        if (hudOn) shHud(k, { clock: k.t > k.cue('knock') ? '8:00' : '6:15', hh: 0, miss: 20 });
        else tag(k, '6:10');
      },
    },
    // ===== 5. Tí Tin "làm thủ tục" (cài app, chép danh bạ) =====
    {
      say: 'Tí Tin đến để "làm thủ tục nhận hoa hồng". {id}Chụp căn cước hai mặt. {face}Quay mặt trái, mặt phải, lần này để mở tài khoản ngân hàng. {app}Rồi cậu mượn điện thoại bạn hai phút, cài cái app "chia hoa hồng". {book}Danh bạ của bạn có ba trăm mười hai số. {me}Số gọi nhiều nhất: Mẹ. {done}Tí Tin trả máy, cười: Xong. Từ giờ anh chỉ việc ngủ. {noon}Nhưng trưa nay bạn chưa ngủ được: bạn còn một đám cưới.',
      sfx: [['pop', 0.3, 0.4], ['click', 'id', 0.5], ['click', ['id', 0.5], 0.5], ['click', 'face', 0.4], ['click', ['face', 0.8], 0.4], ['slideUp', 'app', 0.4], ['scratch', 'book', 0.4], ['ding', 'me', 0.5], ['sparkle', 'done', 0.4], ['whoosh', 'noon', 0.4]],
      draw(k) {
        troRoom(k, { dawn: true }); door(k, 1);
        const turn = k.t > k.cue('face') && k.t < k.cue('app') ? (Math.floor((k.t - k.cue('face')) / 0.8) % 2 ? 1 : -1) : 0;
        k.char(420, G + 30, S * 1.15, { ...CASUAL, face: 'blank', pose: 'hold', look: turn, flip: turn < 0 });
        k.char(1260, G + 30, S * 1.05, { ...TITIN, face: 'happy', pose: k.t > k.cue('id') && k.t < k.cue('app') ? 'point' : 'hold', flip: true, talk: spk(k, 'done', 'noon') });
        if (k.t > k.cue('id') && k.t < k.cue('app')) { idCard(k, 860, 380, 1, k.at('id', 0.4)); k.text('📸', 1120, 260, { size: 80, fx: 'pop', p: k.at('id', 0.3) }); }
        if (k.t > k.cue('app') && k.t < k.cue('done')) {
          phone(k, 860, 500, 0.95, { p: k.at('app', 0.4, 'back'), screen: (k, w, h) => {
            if (k.t < k.cue('book')) {
              k.text('💰', 0, -120, { size: 90 }); k.text('Chia hoa hồng', 0, -30, { size: 30, font: 'title', color: '#1b1b24' });
              const p = k.at('app', 1.6, 'linear'); k.ctx.fillStyle = '#c9d2e0'; k.ctx.fillRect(-110, 30, 220, 18); k.ctx.fillStyle = '#3fb86a'; k.ctx.fillRect(-110, 30, 220 * p, 18);
              k.text('Cho phép truy cập danh bạ? ✅', 0, 110, { size: 18, color: '#c0392b', maxWidth: w - 20 });
              return;
            }
            k.ctx.fillStyle = '#2e6da4'; k.ctx.fillRect(-w / 2, -h / 2, w, 60); k.text('Danh bạ · 312', 0, -h / 2 + 30, { size: 26, font: 'title', color: '#fff' });
            ['Mẹ ❤️', 'Ngân', 'Tùng MC', 'Cô Hạnh', 'Anh Dũng âm thanh', '…'].forEach((n, i) => { if (i === 0 && k.t > k.cue('me')) { k.ctx.fillStyle = 'rgba(255,90,74,0.25)'; k.ctx.fillRect(-w / 2, -h / 2 + 76, w, 56); } k.text(n, -w / 2 + 24, -h / 2 + 104 + i * 64, { size: 28, align: 'left', color: '#1b1b24', font: i === 0 ? 'title' : undefined }); });
            if (k.t > k.cue('book')) { const u = (k.t * 1.5) % 1; k.ctx.fillStyle = 'rgba(63,184,106,0.35)'; k.ctx.fillRect(-w / 2, -h / 2 + 70 + u * (h - 70), w, 10); }
          } });
          if (k.t > k.cue('book')) k.text('📤 đang sao chép…', 860, 860, { size: 34, font: 'title', color: '#c0392b', fx: 'fade', p: k.at('book', 0.4) });
          if (k.t > k.cue('me')) { k.ctx.strokeStyle = '#ff2a2a'; k.ctx.lineWidth = 8; k.ctx.beginPath(); k.ctx.ellipse(800, 300, 140, 46, -0.05, 0, Math.PI * 2); k.ctx.stroke(); }
        }
        if (k.t > k.cue('done') && k.t < k.cue('noon')) cap(k, '"TỪ GIỜ ANH CHỈ VIỆC NGỦ" 😴', 'done', { color: '#7fe0a8', y: 330, x: 760 });
        if (k.t > k.cue('noon')) { tint(k, '#14161d', 0.5 * k.at('noon', 0.5)); bigWord(k, '💒 11:00 · ĐÁM CƯỚI', 'noon', 960, 480, '#f2c230', 90); }
        shHud(k, { clock: '8:00', hh: 0, miss: 20 });
      },
    },
    // ===== 6. Đám cưới: bàn số bảy nhận ra "thầy" =====
    {
      say: 'Mười một giờ, Hà Đông. {mc}Bạn cầm micro: Kính thưa quý vị đại biểu, hai họ nội ngoại… {aotim}Bàn số bảy có một bà mặc áo dài tím đứng phắt dậy: {name}Ơ! Thầy Lộc Phát! {t7}Cả bàn số bảy quay lại. {t8}Rồi bàn số tám. {cmp}Một bà giơ điện thoại lên so mặt bạn với màn hình: Thầy cạo râu rồi à? {choose}Bạn có hai giây để chọn: làm MC, hay làm thầy.',
      sfx: [['tada', 'mc', 0.25], ['scratch', 'aotim', 0.4], ['boom', 'name', 0.5], ['whoosh', 't7', 0.4], ['whoosh', 't8', 0.4], ['click', 'cmp', 0.4], ['drumroll', 'choose', 0.4]],
      draw(k) {
        wedding(k); tag(k, '11:00');
        const cmp = k.t > k.cue('cmp');
        k.char(420, G, S * 1.15, { ...LOC_MC, face: k.t > k.cue('name') ? 'shock' : 'happy', pose: k.t < k.cue('aotim') ? 'present' : 'hold', talk: spk(k, 'mc', 'aotim'), sweat: k.t > k.cue('t8'), sq: k.take('name', 1.2) });
        { const { ctx } = k; ctx.fillStyle = '#2b2b2b'; ctx.fillRect(520, 640, 12, 70); ctx.beginPath(); ctx.ellipse(526, 628, 18, 24, 0, 0, Math.PI * 2); ctx.fill(); }
        // khách bàn 7 (phải) + bàn 8 (giữa)
        const turned = (cue) => k.t > k.cue(cue);
        for (let i = 0; i < 3; i++) k.char(1280 + i * 150, 860, S * 0.55, { ...HO(['#3d7fc1', '#c0392b', '#6bb56b'][i], { hair: ['short', 'buzz', 'spiky'][i] }), face: turned('t7') ? 'shock' : 'happy', pose: 'hold', flip: turned('t7'), shadow: false });
        for (let i = 0; i < 3; i++) k.char(780 + i * 140, 870, S * 0.5, { ...HO(['#e8b84a', '#8a6a4f', '#5a5f66'][i], { hair: ['short', 'bald', 'buzz'][i] }), face: turned('t8') ? 'shock' : 'happy', pose: 'hold', flip: turned('t8'), shadow: false });
        k.char(1660, G, S * 0.95, { ...AOTIM, face: k.t > k.cue('name') ? 'shock' : 'happy', pose: k.t > k.cue('name') ? 'point' : 'hold', flip: true, talk: spk(k, 'name', 't7') + spk(k, 'cmp', 'choose'), p: k.t > k.cue('aotim') ? 1 : 0.0001 });
        if (k.t > k.cue('name') && k.t < k.cue('t7')) bigWord(k, 'Ơ! THẦY LỘC PHÁT!', 'name', 1300, 470, '#f2c230', 70);
        if (cmp) phone(k, 1420, 520, 0.6, { p: k.at('cmp', 0.4, 'back'), screen: (k, w, h) => { k.ctx.fillStyle = '#5a1616'; k.ctx.fillRect(-w / 2, -h / 2, w, h); k.group({ x: -288, y: -162, s: 0.3 }, () => { liveRoom(k); k.char(LX, LY, LS, { ...LOC, face: 'smug', pose: 'present', shadow: false }); altarFront(k); }); } });
        if (cmp && k.t < k.cue('choose')) k.arrow(1300, 520, 620, 520, { width: 8, head: 30, stroke: '#ff2a2a', bend: 0.15, p: k.at('cmp', 0.5), seed: 61 });
        if (k.t > k.cue('choose')) {
          tint(k, '#14161d', 0.55);
          k.text('🎤 MC', 640, 500, { size: 110, font: 'title', color: '#9fd0f0', fx: 'pop', p: k.at('choose', 0.3), outline: '#1b1b24', outlineWidth: 14 });
          k.text('hay', 960, 500, { size: 60, font: 'title', color: '#fff', fx: 'pop', p: k.at(k.cue('choose', 0.3), 0.3) });
          k.text('🔮 THẦY', 1280, 500, { size: 110, font: 'title', color: '#f2c230', fx: 'pop', p: k.at(k.cue('choose', 0.6), 0.3), outline: '#1b1b24', outlineWidth: 14 });
        }
        shHud(k, { clock: '11:00', hh: 0, miss: 20 });
      },
    },
    // ===== 7. "Đám cưới này có vong" — bán lễ giữa tiệc cưới =====
    {
      say: '{low}Bạn hạ micro, hạ giọng xuống ba tông: Thầy đi làm từ thiện. {vong}Đám cưới này có vong. {gasp}Cả hội trường nín thở. {happy}Vong vui thôi, ông bà về chung vui. {dan}Nhưng bàn bảy có ba người tuổi Dần, phạm hạn. {qr}Lễ giải, quét mã trên kênh thầy. {cake}Đến lúc cô dâu chú rể cắt bánh, bàn bảy và bàn tám đã chuyển mười hai triệu. {bride}Cô dâu đứng trên sân khấu, không ai nhìn. {hh}Bạn được hai trăm bốn mươi nghìn. {name}Rồi bà áo tím giơ điện thoại lên, và bạn thấy một cái tên quen.',
      sfx: [['slideDown', 'low', 0.4], ['boom', 'vong', 0.5], ['gulp', 'gasp', 0.4], ['sparkle', 'happy', 0.4], ['bonk', 'dan', 0.4], ['ding', 'qr', 0.5], ['cash', 'cake', 0.5], ['ding', ['cake', 0.4], 0.4], ['pop', 'bride', 0.3], ['cash', 'hh', 0.4], ['scratch', 'name', 0.4]],
      draw(k) {
        wedding(k);
        const cake = k.t > k.cue('cake');
        // cô dâu chú rể + bánh (giữa sau)
        k.char(860, 760, S * 0.62, { ...BRIDE, face: cake ? 'sad' : 'happy', pose: 'hold', shadow: false });
        k.char(1060, 760, S * 0.62, { ...GROOM, face: cake ? 'blank' : 'happy', pose: 'hold', shadow: false });
        { const { ctx } = k; for (let i = 0; i < 3; i++) { ctx.fillStyle = '#fffdf6'; ctx.strokeStyle = '#e8b84a'; ctx.lineWidth = 4; ctx.fillRect(930 + i * 15, 640 - i * 50, 60 - i * 30 + 30, 50); ctx.strokeRect(930 + i * 15, 640 - i * 50, 60 - i * 30 + 30, 50); } }
        // khách vây quanh "thầy" (phải)
        const crowded = k.t > k.cue('dan');
        k.char(cake ? 1300 : 560, G, S * 1.15, { ...LOC_MC, face: k.t > k.cue('name') ? 'shock' : k.t > k.cue('gasp') ? 'smug' : 'calm', pose: k.t > k.cue('vong') && k.t < k.cue('qr') ? 'point' : 'hold', brows: true, talk: spk(k, 'low', 'gasp') + spk(k, 'happy', 'cake'), sq: k.take('vong', 1) });
        if (crowded) for (let i = 0; i < 5; i++) k.char((cake ? 1100 : 760) + i * 120 + (i % 2) * 30, G + 10, S * 0.55, { ...HO(['#3d7fc1', '#c0392b', '#6bb56b', '#e8b84a', '#8a6a4f'][i], { hair: ['short', 'buzz', 'bun', 'spiky', 'bald'][i] }), face: 'shock', pose: i % 2 ? 'hold' : 'point', flip: true, shadow: false });
        k.char(1700, G, S * 0.95, { ...AOTIM, face: k.t > k.cue('name') ? 'blank' : 'happy', pose: k.t > k.cue('name') ? 'hold' : 'cheer', flip: true });
        if (k.t > k.cue('vong') && k.t < k.cue('gasp')) { tint(k, '#14161d', 0.35); bigWord(k, '👻 ĐÁM CƯỚI CÓ VONG', 'vong', 960, 380, '#ff8a7a', 76); }
        if (k.t > k.cue('happy') && k.t < k.cue('dan')) bigWord(k, '😇 VONG VUI THÔI', 'happy', 960, 380, '#7fe0a8', 70);
        if (k.t > k.cue('dan') && k.t < k.cue('qr')) bigWord(k, '🐯 3 NGƯỜI TUỔI DẦN · PHẠM HẠN', 'dan', 960, 380, '#f2c230', 60);
        if (k.t > k.cue('qr') && !cake) { k.group({ x: 1500, y: 470, s: pop(k, 'qr') * 0.75 }, () => { const { ctx } = k; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 8; ctx.beginPath(); ctx.roundRect(-150, -190, 300, 380, 20); ctx.fill(); ctx.stroke(); k.text('LỄ GIẢI HẠN', 0, -150, { size: 30, font: 'title', color: '#c0392b' }); ctx.fillStyle = '#1b1b24'; for (let i = 0; i < 11; i++) for (let j = 0; j < 11; j++) if (k.rand(i * 13 + j + 7) > 0.5) ctx.fillRect(-88 + i * 16, -118 + j * 16, 15, 15); k.text('quét trên kênh thầy', 0, 110, { size: 24, color: '#5a5f66' }); }); }
        if (cake) k.text('+12 TRIỆU', 1500, 380, { size: 70, font: 'title', color: '#7fe0a8', fx: 'pop', p: k.at('cake', 0.3), outline: '#1b1b24', outlineWidth: 12 });
        if (k.t > k.cue('bride') && k.t < k.cue('name')) { k.ctx.strokeStyle = '#ff2a2a'; k.ctx.lineWidth = 7; k.ctx.beginPath(); k.ctx.ellipse(960, 650, 230, 170, 0, 0, Math.PI * 2); k.ctx.stroke(); k.text('cô dâu 🥲', 960, 440, { size: 44, font: 'title', color: '#fff', outline: '#1b1b24', outlineWidth: 10, fx: 'pop', p: k.at('bride', 0.3) }); }
        if (k.t > k.cue('name')) phone(k, 1700, 520, 0.45, { p: k.at('name', 0.3, 'back'), ring: false });
        shHud(k, { clock: '11:40', hh: [0, 0.24, 'hh', 0.8], miss: [20, 19.76, 'hh', 0.8] });
      },
    },
    // ===== 8. Bản deepfake đòi ông Tâm làm lễ giỗ =====
    {
      say: '{live}Trên live, thầy Lộc Phát có râu đang nói: {gio}Ông Tâm ơi, sắp giỗ đầu bà rồi. Bà nhắn về: bà lạnh, bà đói, bà không tìm được đường về nhà. {fifty}Phải làm lễ giỗ ở pháp đàn, năm mươi triệu. {never}Bạn chưa bao giờ nói câu đó. {voice}Nhưng đó là giọng bạn, cái giọng trầm nhất đời bạn. {buffalo}Bên dưới, ông Tâm gõ chậm: Thầy cho tôi mấy hôm. Tôi bán con trâu.',
      sfx: [['pop', 'live', 0.4], ['boom', 'gio', 0.3], ['cash', 'fifty', 0.5], ['gulp', 'never', 0.5], ['slideDown', 'voice', 0.4], ['click', 'buffalo', 0.3], ['click', ['buffalo', 0.4], 0.3], ['click', ['buffalo', 0.8], 0.3]],
      draw(k) {
        const slow = k.t > k.cue('buffalo');
        live(k, { mute: k.t < k.cue('gio') || k.t > k.cue('never'), loc: { face: 'smug', pose: k.t > k.cue('fifty') ? 'point' : 'present' }, ui: { view: 3120, comments: [{ n: 'Hoa Sen 58', t: 'Thầy linh quá 🙏', c: FAKE }, { n: 'Ông Tâm 1949', t: 'Thay oi, ba nha toi co doi khong', cue: 'gio', c: REAL }, { n: 'Ông Tâm 1949', t: 'Thay cho toi may hom. Toi ban con trau.', cue: 'buffalo', c: REAL }] } });
        if (k.t > k.cue('gio') && k.t < k.cue('never')) bigWord(k, 'GIỖ ĐẦU · 50 TRIỆU', 'fifty', 1450, 360, '#ffe08a', 60);
        if (k.t > k.cue('never') && !slow) {
          inset(k, 1600, 600, 190, '#f0e6d2', () => k.char(0, 380, 540, { ...LOC_MC, face: k.t > k.cue('voice') ? 'sad' : 'shock', pose: 'hold', gloom: k.t > k.cue('voice') ? 0.5 : 0, shadow: false }), k.at('never', 0.4, 'back'));
          if (k.t < k.cue('buffalo')) cap(k, 'MÌNH CHƯA TỪNG NÓI CÂU ĐÓ', 'never', { color: '#ff8a7a', y: 300, x: 1450, size: 44 });
        }
        if (slow) { tamOld(k, 'sad', k.at('buffalo', 0.4, 'back'), 1600, 600, 190); k.text('🐃', 1600, 860, { size: 90, fx: 'pop', p: k.at(k.cue('buffalo', 1), 0.3) }); }
        shHud(k, { clock: '11:45', hh: 0.24, miss: 19.76 });
      },
    },
    // ===== 9. Nhà vệ sinh: nghi ngờ bị dập =====
    {
      say: '{wc}Bạn trốn vào nhà vệ sinh nhà hàng, nhắn bà Tám: Chị ơi, ông Tâm thì tha đi. {cat}Bà Tám trả lời bằng một cái sticker con mèo cười, {vol}rồi: Ông ấy tự nguyện mà em. {math}Hai phần trăm của năm mươi triệu là một triệu. Em còn thiếu mười chín triệu bảy trăm sáu mươi nghìn cho cái SH đấy. {stare}Bạn nhìn tin nhắn của mình rất lâu. {del}Rồi bạn xoá nó. {out}Ra ngoài, cầm micro, mời hai họ nâng ly. {sold}Tối hôm đó, ông Tâm bán được con trâu.',
      sfx: [['click', 'wc', 0.4], ['ding', ['wc', 1.6], 0.4], ['boing', 'cat', 0.4], ['ding', 'vol', 0.4], ['cash', 'math', 0.4], ['gulp', 'stare', 0.4], ['scratch', 'del', 0.5], ['tada', 'out', 0.25], ['slideDown', 'sold', 0.4]],
      draw(k) {
        if (k.t > k.cue('out') && k.t < k.cue('sold')) {
          wedding(k);
          k.char(760, G, S * 1.15, { ...LOC_MC, face: 'happy', pose: 'cheer', talk: 0.5 + 0.5 * Math.sin(k.t * 8) });
          for (let i = 0; i < 6; i++) k.char(1100 + i * 130, 880, S * 0.5, { ...HO(['#3d7fc1', '#c0392b', '#6bb56b', '#e8b84a', '#8a6a4f', '#5a5f66'][i]), face: 'laugh', pose: 'cheer', shadow: false });
          bigWord(k, '🍻 MỜI HAI HỌ NÂNG LY!', 'out', 960, 300, '#f2c230', 70);
          shHud(k, { clock: '12:30', hh: 0.24, miss: 19.76 });
          return;
        }
        if (k.t > k.cue('sold')) {
          paper(k, '#0d1222'); tag(k, '19:00');
          k.backdrop('night', { ground: G, alpha: 0.8 });
          k.text('🐃', 760 + 300 * k.at('sold', 3, 'linear'), 800, { size: 160 });
          k.char(1300, G, S * 1.1, { ...OLDTAM, face: 'sad', pose: 'hold', flip: true, gloom: 0.5 });
          cash(k, 1120, 880, 6, 1, k.at(k.cue('sold', 1.2), 0.4));
          cap(k, 'ÔNG TÂM BÁN CON TRÂU', 'sold', { color: '#ff8a7a', y: 200 });
          return;
        }
        washroom(k);
        const del = k.t > k.cue('del');
        k.char(520, G, S * 1.15, { ...LOC_MC, face: k.t > k.cue('stare') ? 'blank' : 'sad', pose: 'hold', gloom: k.t > k.cue('stare') && !del ? 0.6 : 0, look: 1 });
        phone(k, 1150, 500, 1.05, { screen: (k, w, h) => {
          k.ctx.fillStyle = '#b8325a'; k.ctx.fillRect(-w / 2, -h / 2, w, 60); k.text('Chị Tám 💅', 0, -h / 2 + 30, { size: 26, font: 'title', color: '#fff' });
          if (!del) { const p = k.at(k.cue('wc', 1.6), 0.3); if (p > 0) { k.ctx.save(); k.ctx.globalAlpha *= k.t > k.cue('del') ? 0 : 1; chat(k, w / 2 - 12, -170, 'Chị ơi, ông Tâm thì tha đi', { size: 22, maxW: w - 30, me: true, p }); k.ctx.restore(); } }
          else { k.text('🗑 Tin nhắn đã thu hồi', 40, -170, { size: 18, color: '#8a8f98' }); }
          if (k.t > k.cue('cat')) k.text('😹', -60, -80, { size: 90, fx: 'pop', p: k.at('cat', 0.3) });
          if (k.t > k.cue('vol')) chat(k, -w / 2 + 12, 20, 'Ông ấy tự nguyện mà em', { size: 22, maxW: w - 30, p: k.at('vol', 0.3) });
          if (k.t > k.cue('math')) chat(k, -w / 2 + 12, 90, '2% của 50tr = 1tr 😘', { size: 22, maxW: w - 30, p: k.at('math', 0.3) });
          if (k.t > k.cue('math')) chat(k, -w / 2 + 12, 160, 'Em còn thiếu 19tr760 đấy', { size: 22, maxW: w - 30, p: k.at(k.cue('math', 1.2), 0.3) });
        } });
        if (del) k.text('🗑', 1450, 300, { size: 110, fx: 'pop', p: k.at('del', 0.3) });
        shHud(k, { clock: '12:10', hh: 0.24, miss: 19.76 });
      },
    },
    // ===== 10. 22:00: ngân hàng chặn → "mang tiền mặt đến pháp đàn" =====
    {
      say: '{try}Mười giờ đêm. Ông Tâm chuyển năm mươi triệu. {no}Không đi được. {red}Ngân hàng hiện chữ đỏ: giao dịch có dấu hiệu lừa đảo. {again}Ông thử lại. Vẫn không đi. {live}Trên live, thầy Lộc Phát không nhíu mày, vì máy thì không biết nhíu: {bank}Ngân hàng có vong ngăn. {cash}Ông mang tiền mặt đến tận pháp đàn. Địa chỉ ghi trên túi gấm thầy gửi ông. {open}Bạn mở ảnh cái túi gấm, phóng to cái nhãn.',
      sfx: [['click', 'try', 0.4], ['bonk', 'no', 0.5], ['boom', 'red', 0.4], ['click', 'again', 0.4], ['bonk', ['again', 0.8], 0.5], ['pop', 'live', 0.4], ['boom', 'bank', 0.4], ['cash', 'cash', 0.4], ['click', 'open', 0.4], ['slideUp', ['open', 1], 0.4]],
      draw(k) {
        if (k.t < k.cue('live')) {
          paper(k, '#0d1222'); tag(k, '22:00');
          tamOld(k, 'sad', 1, 480, 560, 260);
          phone(k, 1200, 540, 1.1, { screen: (k, w, h) => {
            k.ctx.fillStyle = '#1f6f4a'; k.ctx.fillRect(-w / 2, -h / 2, w, 60); k.text('🏦 Ngân hàng', 0, -h / 2 + 30, { size: 26, font: 'title', color: '#fff' });
            k.text('Chuyển: 50.000.000đ', 0, -150, { size: 26, font: 'title', color: '#1b1b24' });
            k.text('→ PHAP DAN LOC PHAT', 0, -105, { size: 20, color: '#5a5f66' });
            if (k.t > k.cue('red')) { k.ctx.fillStyle = '#c0392b'; k.ctx.fillRect(-w / 2 + 14, -60, w - 28, 170); k.text('⚠️ GIAO DỊCH CÓ', 0, -20, { size: 24, font: 'title', color: '#fff' }); k.text('DẤU HIỆU LỪA ĐẢO', 0, 20, { size: 24, font: 'title', color: '#fff' }); k.text('đã tạm dừng', 0, 70, { size: 20, color: '#ffe0e0' }); }
            if (k.t > k.cue('no') && k.t < k.cue('red')) k.text('❌', 0, 20, { size: 90 });
          } });
          if (k.t > k.cue('again')) k.text('THỬ LẠI… ❌', 1200, 940, { size: 50, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at('again', 0.3), outline: '#1b1b24', outlineWidth: 10 });
          return;
        }
        if (k.t < k.cue('open')) {
          live(k, { loc: { face: 'smug', pose: 'point' }, ui: { view: 2900, comments: [{ n: 'Ông Tâm 1949', t: 'Ngan hang khong cho chuyen thay oi', cue: 'live', c: REAL }] } });
          bigWord(k, '🏦 NGÂN HÀNG CÓ VONG NGĂN', 'bank', 1300, 340, '#ff8a7a', 54);
          if (k.t > k.cue('cash')) bigWord(k, '💵 MANG TIỀN MẶT ĐẾN PHÁP ĐÀN', 'cash', 1300, 430, '#ffe08a', 50);
          shHud(k, { clock: '22:10', hh: 0.24, miss: 19.76 });
          return;
        }
        troRoom(k, {}); tag(k, '23:30');
        lying(k, { face: 'blank' });
        phone(k, 1100, 520, 1, { p: k.at('open', 0.4, 'back'), screen: (k, w, h) => {
          k.ctx.fillStyle = '#c0392b'; k.ctx.beginPath(); k.ctx.roundRect(-100, -180, 200, 240, 20); k.ctx.fill(); k.ctx.fillStyle = '#f2c230'; k.ctx.fillRect(-100, -140, 200, 14);
          k.ctx.fillStyle = '#fff'; k.ctx.fillRect(-80, 0, 160 + 40 * k.at(k.cue('open', 1), 0.6), 50); k.text('📍 Người gửi: …', -60, 25, { size: 16, align: 'left', color: '#1b1b24' });
          k.text('🔍', 90, 140, { size: 60 });
        } });
      },
    },
    // ===== 11. Nhãn vận đơn: người gửi = chính bạn =====
    {
      say: 'Pháp đàn Lộc Phát. {name}Người gửi: Nguyễn Văn Lộc. {tel}Số điện thoại: số của bạn. {addr}Địa chỉ: phòng trọ số chín, ngõ một trăm bốn mươi. {here}Chính cái phòng bạn đang nằm. {all}Cửa hàng, tài khoản ngân hàng, mã vận đơn: tất cả đều đứng tên bạn, làm từ cái căn cước sáng nay. {ceil}Bạn nhìn lên trần nhà. {far}Ông Tâm ở tận Thanh Hoá, bảy mươi bảy tuổi. {bus}Chắc ông không đi xe khách cả đêm đâu. {off}Bạn tắt đèn.',
      sfx: [['pop', 0.2, 0.4], ['boom', 'name', 0.5], ['pop', 'tel', 0.4], ['pop', 'addr', 0.4], ['boom', 'here', 0.6], ['scratch', 'all', 0.4], ['gulp', 'ceil', 0.4], ['slideDown', 'far', 0.3], ['sparkle', 'bus', 0.3], ['click', 'off', 0.6]],
      draw(k) {
        if (k.t < k.cue('ceil')) {
          paper(k, '#2a1e22');
          card(k, 960, 470, 1100, 620, '📦 PHIẾU GỬI HÀNG · COD', [
            ['Shop: PHÁP ĐÀN LỘC PHÁT 🔮'],
            ['Người gửi: NGUYỄN VĂN LỘC', 'name', '#c0392b'],
            ['ĐT: 0•• ••• ••• 214 (số của bạn)', 'tel', '#c0392b'],
            ['Địa chỉ: P.9, ngõ 140 …', 'addr', '#c0392b'],
            ['Hàng: túi gấm trì chú × 1'],
            ['Thu hộ: 390.000đ'],
          ], { size: 40, gap: 80, head: '#c0392b', headText: '#fff' });
          if (k.t > k.cue('here')) { tint(k, '#14161d', 0.4); bigWord(k, '📍 = PHÒNG MÌNH ĐANG NẰM', 'here', 960, 860, '#ff8a7a', 76); }
          if (k.t > k.cue('all')) { tint(k, '#14161d', 0.3); for (const [i, t] of ['🛒 SHOP', '🏦 TÀI KHOẢN', '📦 VẬN ĐƠN'].entries()) k.text(t + ' → LỘC', 960, 200 + i * 110, { size: 70, font: 'title', color: '#f2c230', fx: 'pop', p: k.at(k.cue('all', i * 0.5), 0.3), outline: '#1b1b24', outlineWidth: 12 }); idCard(k, 1600, 520, 0.8, k.at(k.cue('all', 1.6), 0.4)); }
          return;
        }
        troRoom(k, {}); tag(k, '23:45');
        lying(k, { face: k.t > k.cue('bus') ? 'calm' : 'blank', look: 0, lookY: -1 });
        if (k.t > k.cue('far')) card(k, 1300, 360, 640, 240, null, [['Ông Tâm · 77 tuổi', 'far', '#1b1b24'], ['Thanh Hoá → Hà Nội: 160 km', 'far'], ['🚌 xe khách đêm? chắc không đâu…', 'bus', '#2e6da4']], { p: k.at('far', 0.4), size: 34, gap: 64 });
        if (k.t > k.cue('off')) tint(k, '#000', 0.92 * k.at('off', 0.15));
      },
    },
    // ===== 12. 7:00 sáng nay: ông Tâm ở cửa =====
    {
      say: '{knock}Cốc. Cốc. Cốc. Bảy giờ sáng. {clock}Hai tiếng trước khi đại lý bán chiếc SH. {tam}Ông Tâm đứng ở cửa, nheo mắt nhìn bạn: Thầy cạo râu à? {voice}Không sao, tôi nhận ra cái giọng. {bag}Ông đặt cái túi nilon lên giường: năm mươi triệu, buộc dây chun, {smell}còn mùi chuồng trâu. {frame}Rồi một khung ảnh: một bà cụ cười móm. {ask}Ông nói: Thầy làm lễ ngay đây cho bà.',
      sfx: [['click', 'knock', 0.6], ['click', ['knock', 0.35], 0.6], ['click', ['knock', 0.7], 0.6], ['drumroll', 'clock', 0.3], ['scratch', 'tam', 0.4], ['ding', 'voice', 0.4], ['pop', 'bag', 0.5], ['cash', ['bag', 0.6], 0.4], ['boing', 'smell', 0.3], ['sparkle', 'frame', 0.3], ['gulp', 'ask', 0.5]],
      draw(k) {
        troRoom(k, { dawn: true });
        const inside = k.t > k.cue('bag');
        door(k, k.t > k.cue('tam') ? 1 : 0, 'knock');
        k.char(inside ? 1240 : 1820, G + 30, S * 1.1, { ...OLDTAM, face: k.t > k.cue('ask') ? 'sad' : k.t > k.cue('voice') ? 'happy' : 'calm', pose: k.t > k.cue('frame') ? 'hold' : 'stand', flip: true, talk: spk(k, 'tam', 'bag') + spk(k, 'ask', null), p: k.t > k.cue('tam') ? 1 : 0.0001 });
        k.char(520, G + 30, S * 1.15, { ...CASUAL, face: k.t > k.cue('tam') ? 'shock' : 'blank', pose: 'hold', sweat: k.t > k.cue('tam'), sq: k.take('tam', 1) });
        if (inside) { bag(k, 780, 790, 1.1); if (k.t > k.cue('smell')) { k.steam(780, 690, 1.2); k.text('🐃💨', 900, 640, { size: 56, fx: 'pop', p: k.at('smell', 0.3) }); } }
        if (k.t > k.cue('frame')) wifeFrame(k, 1020, 600, 1.1 * pop(k, 'frame'));
        if (k.t > k.cue('clock') && k.t < k.cue('tam')) bigWord(k, '⏳ CÒN 2 TIẾNG', 'clock', 960, 300, '#ff8a7a', 80);
        if (k.t > k.cue('ask')) cap(k, '"THẦY LÀM LỄ NGAY ĐÂY CHO BÀ"', 'ask', { color: '#f2c230', y: 330, x: 760, size: 56 });
        shHud(k, { clock: '7:00', hh: 0.24, miss: 19.76 });
      },
    },
    // ===== 13. Dán lại râu =====
    {
      say: '{calc}Mười chín triệu bảy trăm sáu mươi nghìn. Hai tiếng. {drawer}Bạn mở ngăn kéo. {beard}Chòm râu dê nằm đó, còn dính keo. {stick}Bạn dán lên cằm, cắm ba nén hương vào cái cốc mì tôm, {mc}mở giọng MC: Kính thưa hương hồn bà… {pray}Ông Tâm chắp tay. {hand}Một tay ông vẫn đè lên túi tiền, như sợ vong lấy mất. {buzz}Bạn vừa khấn được ba câu thì điện thoại rung. {me}Màn hình hiện: Mẹ.',
      sfx: [['cash', 'calc', 0.4], ['scratch', 'drawer', 0.4], ['sparkle', 'beard', 0.4], ['scratch', 'stick', 0.5], ['click', ['stick', 1.2], 0.3], ['tada', 'mc', 0.2], ['pop', 'pray', 0.3], ['boing', 'hand', 0.3], ['boing', 'buzz', 0.4], ['boing', ['buzz', 0.4], 0.4], ['boom', 'me', 0.5]],
      draw(k) {
        troRoom(k, { dawn: true }); door(k, 1);
        const on = k.t > k.cue('stick');
        if (k.t > k.cue('calc') && k.t < k.cue('drawer')) { bigWord(k, '19.760.000đ · 2 TIẾNG', 'calc', 960, 260, '#ff8a7a', 70); }
        if (k.t > k.cue('drawer') && !on) { const { ctx } = k; ctx.fillStyle = '#7a5a3a'; ctx.fillRect(820, 640, 300, 160); ctx.fillStyle = '#5a3a1a'; ctx.fillRect(820, 640 + 60 * k.at('drawer', 0.4), 300, 100); if (k.t > k.cue('beard')) { heldBeard(k, 970, 690, 1.2, 0.3); k.ctx.strokeStyle = '#f2c230'; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.arc(970, 700, 90, 0, Math.PI * 2); k.ctx.stroke(); } }
        k.char(on ? 640 : 520, G + 30, S * 1.15, { ...(on ? BEARDED : CASUAL), face: k.t > k.cue('me') ? 'shock' : on ? 'calm' : 'blank', pose: k.t > k.cue('mc') && k.t < k.cue('buzz') ? 'present' : 'hold', talk: spk(k, 'mc', 'pray'), sq: k.take('me', 1.2) });
        if (on) { noodleCup(k, 900, 900, 1); wifeFrame(k, 1020, 760, 0.8); bag(k, 1240, 880, 0.9); }
        k.char(1420, G + 30, S * 1.05, { ...OLDTAM, face: 'sad', pose: k.t > k.cue('pray') ? { l: [40, 120], r: [80, 30] } : 'hold', flip: true });
        if (k.t > k.cue('hand') && k.t < k.cue('buzz')) { k.ctx.strokeStyle = '#ff2a2a'; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.ellipse(1250, 860, 110, 80, 0, 0, Math.PI * 2); k.ctx.stroke(); }
        if (k.t > k.cue('buzz')) phone(k, 380, 560, 0.7, { ring: true, p: k.at('buzz', 0.3, 'back'), bg: '#1f2a44', screen: (k, w, h) => { k.ctx.fillStyle = '#8a94a6'; k.ctx.beginPath(); k.ctx.arc(0, -120, 54, 0, Math.PI * 2); k.ctx.fill(); if (k.t > k.cue('me')) k.text('MẸ ❤️', 0, -20, { size: 50, font: 'title', color: '#fff' }); for (const [x, c] of [[-80, '#d63a2f'], [80, '#3fb86a']]) { k.ctx.fillStyle = c; k.ctx.beginPath(); k.ctx.arc(x, 190, 36, 0, Math.PI * 2); k.ctx.fill(); } } });
        shHud(k, { clock: '7:15', hh: 0.24, miss: 19.76 });
      },
    },
    // ===== 14. Câu số 140 =====
    {
      say: '{cry}Mẹ khóc, nói không ra hơi: Con ơi, con có sao không? Người ta có đánh con không? {five}Năm giờ sáng con gọi video về, mặt đầy máu, bảo con đâm phải người, xin mẹ hai mươi triệu. {chick}Mẹ bán đàn gà, vay thêm cô Hạnh, chuyển rồi. {voice}Mà sao giọng con lúc ấy lạ lạ, nghe như thầy cúng. {c140}Câu số một trăm bốn mươi. Bạn đọc nó lúc ba giờ sáng hôm kia, để lấy mười triệu. {ask}Bạn hỏi: Mẹ chuyển vào tài khoản tên gì?',
      sfx: [['pop', 'cry', 0.3], ['boom', 'five', 0.4], ['boing', 'chick', 0.3], ['scratch', 'voice', 0.3], ['scratch', 'c140', 0.5], ['gulp', 'ask', 0.5]],
      draw(k) {
        paper(k, '#1b1f2e');
        const c140 = k.t > k.cue('c140') && k.t < k.cue('ask');
        k.char(400, 1180, S * 1.45, { ...BEARDED, face: 'shock', pose: 'hold', tears: k.t > k.cue('chick') ? 0.5 : 0, gloom: c140 ? 0.7 : 0, shadow: false, talk: spk(k, 'ask', null) });
        if (!c140) videoCall(k, 1200, 470, 900, 620, 'Mẹ', (k) => { k.ctx.fillStyle = '#c4b8a6'; k.ctx.fillRect(-450, -620, 900, 620); k.char(0, 120, 760, { ...MOTHER, face: 'cry', tears: 1, pose: 'hold', talk: spk(k, 'cry', 'c140'), shadow: false }); }, { p: k.at(0, 0.4) });
        if (k.t > k.cue('five') && k.t < k.cue('chick')) inset(k, 1560, 320, 150, '#3a2a2e', () => { k.char(0, 300, 420, { ...LOC_MC, tie: false, color: '#8a6a4f', face: 'cry', tears: 1, pose: 'hold', shadow: false }); const { ctx } = k; ctx.fillStyle = 'rgba(200,30,30,0.85)'; ctx.beginPath(); ctx.ellipse(-30, -10, 22, 12, 0.4, 0, Math.PI * 2); ctx.ellipse(36, 20, 14, 26, -0.3, 0, Math.PI * 2); ctx.fill(); k.text('5:02 · gọi video', 0, 120, { size: 22, font: 'title', color: '#fff' }); }, k.at('five', 0.4, 'back'));
        if (k.t > k.cue('chick') && k.t < k.cue('voice')) k.text('🐔🐔🐔 → 💸 20 TRIỆU', 1200, 900, { size: 56, font: 'title', color: '#f2c230', fx: 'pop', p: k.at('chick', 0.3), outline: '#1b1b24', outlineWidth: 10 });
        if (k.t > k.cue('voice') && k.t < k.cue('c140')) k.text('"…nghe như thầy cúng"', 1200, 900, { size: 54, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at('voice', 0.3), outline: '#1b1b24', outlineWidth: 10 });
        if (c140) { linesSheet(k, 1200, 470, true); tag(k, '⏪ 3:05 HÔM KIA'); }
      },
    },
    // ===== 15. Tài khoản tên chính bạn =====
    {
      say: '{name}Mẹ đọc: Nguyễn Văn Lộc. {safe}Tên con mà, nên mẹ yên tâm. {into}Hai mươi triệu của mẹ vừa chui vào một cái tài khoản mang tên bạn, mà bạn không có thẻ, không có mật khẩu, không rút được một đồng. {passive}Thu nhập thụ động. {laugh}Bạn bật cười một tiếng, nghe rất khó chịu. {why}Ông Tâm mở mắt: Thầy ơi, sao thầy dừng?',
      sfx: [['boom', 'name', 0.5], ['sparkle', 'safe', 0.3], ['bonk', 'into', 0.4], ['bonk', ['into', 1.5], 0.4], ['bonk', ['into', 3], 0.4], ['tada', 'passive', 0.25], ['gulp', 'laugh', 0.4], ['pop', 'why', 0.4]],
      draw(k) {
        if (k.t < k.cue('laugh')) {
          paper(k, '#1b1f2e');
          card(k, 960, 470, 980, 560, '✅ CHUYỂN KHOẢN THÀNH CÔNG', [
            ['−20.000.000đ', null, '#c0392b'],
            ['Người nhận: NGUYEN VAN LOC', 'name', '#1b1b24'],
            ['Nội dung: Me gui con', null],
            ['💳 Thẻ? ❌   🔑 Mật khẩu? ❌', 'into', '#c0392b'],
            ['💸 Rút được? 0 đồng', ['into', 3], '#c0392b'],
          ].map(([t, c, col]) => [t, Array.isArray(c) ? k.cue(c[0], c[1]) : c, col]), { size: 44, gap: 84, head: '#1f6f4a', headText: '#fff' });
          if (k.t > k.cue('safe') && k.t < k.cue('into')) k.text('"Tên con mà, mẹ yên tâm" 🥲', 960, 900, { size: 50, font: 'title', color: '#9fd0f0', fx: 'pop', p: k.at('safe', 0.3), outline: '#1b1b24', outlineWidth: 10 });
          if (k.t > k.cue('passive')) { tint(k, '#14161d', 0.5); bigWord(k, 'THU NHẬP THỤ ĐỘNG 🙃', 'passive', 960, 540, '#7fe0a8', 100); }
          return;
        }
        troRoom(k, { dawn: true }); door(k, 1);
        k.char(640, G + 30, S * 1.15, { ...BEARDED, face: 'laugh', pose: 'hold', gloom: 0.7, tears: 0.3 });
        noodleCup(k, 900, 900, 1); wifeFrame(k, 1020, 760, 0.8); bag(k, 1240, 880, 0.9);
        k.char(1420, G + 30, S * 1.05, { ...OLDTAM, face: 'calm', pose: { l: [40, 120], r: [80, 30] }, flip: true, talk: spk(k, 'why', null) });
        if (k.t > k.cue('why')) cap(k, '"THẦY ƠI, SAO THẦY DỪNG?"', 'why', { color: '#f2c230', y: 330, x: 760 });
        shHud(k, { clock: '7:25', hh: 0.24, miss: 19.76 });
      },
    },
    // ===== 16. Bóc râu lần hai — sự thật cũng thành bằng chứng =====
    {
      say: '{peel}Bạn bóc chòm râu ra. {one}Lần này không có ba nghìn người xem, chỉ có một ông già. {truth}Bác ơi, cháu không phải thầy. Cháu là MC đám cưới. {eyes}Ông Tâm nhìn chòm râu trên tay bạn, mắt sáng lên: {seen}Vong lại giật râu thầy à? Tôi xem live hôm trước rồi. {push}Ông đẩy túi tiền về phía bạn: Thế thì càng phải làm lễ. {lesson}Bài học thứ hai của nghề quay lại cắn bạn: với người đang sợ, cái gì cũng là bằng chứng. {truth2}Kể cả sự thật.',
      sfx: [['scratch', 'peel', 0.6], ['gulp', 'one', 0.3], ['pop', 'truth', 0.4], ['sparkle', 'eyes', 0.5], ['boom', 'seen', 0.4], ['slideUp', 'push', 0.4], ['cash', ['push', 0.4], 0.4], ['scratch', 'lesson', 0.4], ['boom', 'truth2', 0.5]],
      draw(k) {
        troRoom(k, { dawn: true }); door(k, 1);
        const off = k.t > k.cue('peel', 0.4);
        k.char(640, G + 30, S * 1.15, { ...(off ? CASUAL : BEARDED), beardPeel: off ? 0 : 0.7 * k.at('peel', 0.4), face: k.t > k.cue('seen') ? 'shock' : 'sad', pose: off ? 'wave' : 'hold', talk: spk(k, 'truth', 'eyes'), sq: k.take('peel', 1.2) });
        if (off) heldBeard(k, 790, 420 + 6 * Math.sin(k.t * 5), 1.3, 0.3 * Math.sin(k.t * 3));
        noodleCup(k, 900, 900, 1); wifeFrame(k, 1020, 760, 0.8);
        const pushed = k.at('push', 0.8, 'inOut');
        bag(k, 1240 - 300 * pushed, 880, 0.9);
        k.char(1420, G + 30, S * 1.05, { ...OLDTAM, face: k.t > k.cue('eyes') ? 'happy' : 'calm', pose: k.t > k.cue('push') ? 'present' : 'hold', flip: true, talk: spk(k, 'seen', 'lesson') });
        if (k.t > k.cue('eyes') && k.t < k.cue('push')) { k.text('✨', 1380, 470, { size: 70, fx: 'pop', p: k.at('eyes', 0.3) }); }
        if (k.t > k.cue('seen') && k.t < k.cue('push')) bigWord(k, '"VONG LẠI GIẬT RÂU THẦY À?"', 'seen', 1100, 260, '#ffe08a', 56);
        if (k.t > k.cue('lesson')) { tint(k, '#14161d', 0.45); cap(k, 'NGƯỜI ĐANG SỢ: CÁI GÌ CŨNG LÀ BẰNG CHỨNG', 'lesson', { color: '#f2c230', y: 420, size: 54 }); }
        if (k.t > k.cue('truth2')) cap(k, '…KỂ CẢ SỰ THẬT', 'truth2', { color: '#ff8a7a', y: 540, size: 90 });
        shHud(k, { clock: '7:30', hh: 0.24, miss: 19.76 });
      },
    },
    // ===== 17. Hai khuôn mặt =====
    {
      say: 'Vì thế bạn làm việc duy nhất còn lại: {open}mở TikTok, đặt điện thoại vào tay ông. {live}Thầy Lộc Phát đang live, có râu, đang nói "Gia đạo bất ổn". {me}Còn bạn, không râu, ngồi ngay trước mặt ông, mím chặt miệng. {look}Bác nhìn đi. {silent}Cháu đang im. Mà thầy vẫn đang nói. {s1}Ông Tâm nhìn màn hình. {s2}Nhìn bạn. {s3}Nhìn màn hình. {long}Rất lâu.',
      sfx: [['click', 'open', 0.4], ['pop', 'live', 0.4], ['gulp', 'me', 0.3], ['pop', 'look', 0.3], ['boom', 'silent', 0.4], ['whoosh', 's1', 0.3], ['whoosh', 's2', 0.3], ['whoosh', 's3', 0.3]],
      draw(k) {
        paper(k, '#14161d');
        // trái: bạn, im lặng; phải: live, đang nói
        k.group({ x: 0, y: 0 }, () => {
          const { ctx } = k; ctx.fillStyle = '#d8cfc0'; ctx.fillRect(40, 150, 820, 700);
          ctx.save(); ctx.beginPath(); ctx.rect(40, 150, 820, 700); ctx.clip();
          k.char(450, 1350, 1200, { ...CASUAL, face: 'blank', pose: 'hold', talk: spk(k, 'look', 'silent'), shadow: false });
          ctx.restore();
          k.text('BẠN · KHÔNG RÂU', 450, 900, { size: 40, font: 'title', color: '#fff', fx: 'pop', p: k.at('me', 0.3), outline: '#1b1b24', outlineWidth: 10 });
        });
        if (k.t > k.cue('live')) liveMini(k, 1000, 150, 880, 495, { pose: 'point', view: '3.200', label: 'THẦY · CÓ RÂU · ĐANG NÓI' });
        if (k.t > k.cue('silent')) { k.text('🤐', 450, 240, { size: 90, fx: 'pop', p: k.at('silent', 0.3) }); k.text('🗣️', 1440, 240, { size: 90, fx: 'pop', p: k.at(k.cue('silent', 0.6), 0.3) }); }
        // ông Tâm ở giữa dưới, quay đầu theo nhịp
        const lk = k.t > k.cue('s3') ? 1 : k.t > k.cue('s2') ? -1 : k.t > k.cue('s1') ? 1 : 0;
        k.char(960, 1220, S * 1.1, { ...OLDTAM, face: 'blank', pose: 'hold', look: lk, flip: lk < 0, shadow: false, gloom: k.t > k.cue('long') ? 0.5 : 0, p: k.at('open', 0.4, 'back') || 0.0001 });
        if (k.t > k.cue('long')) tint(k, '#000', 0.25 * k.at('long', 2));
      },
    },
    // ===== 18. "Bà có đói không" → mất chiếc SH =====
    {
      say: '{ask}Rồi ông hỏi, nhỏ như hôm trước: Thế… bà nhà tôi có đói không? {before}Hôm trước bạn chưa nói hết câu này. {say}Hôm nay bạn nói hết: Bà không đói đâu bác. Bác cầm tiền về, đi ngủ đi. {tie}Ông Tâm buộc lại túi nilon. {door}Ra đến cửa, ông quay lại: {mcgood}Cậu dẫn đám cưới chắc hay lắm. {sold}Tám giờ năm mươi chín, đại lý nhắn: xe đã có khách khác cọc. {knock}Chín giờ rưỡi, cửa lại có tiếng gõ.',
      sfx: [['pop', 'ask', 0.3], ['scratch', 'before', 0.3], ['sparkle', 'say', 0.3], ['scratch', 'tie', 0.4], ['whoosh', 'door', 0.3], ['ding', 'mcgood', 0.3], ['bonk', 'sold', 0.6], ['click', 'knock', 0.6], ['click', ['knock', 0.35], 0.6], ['click', ['knock', 0.7], 0.6]],
      draw(k) {
        troRoom(k, { dawn: true });
        const leaving = k.t > k.cue('door');
        door(k, k.t > k.cue('sold') ? 0 : 1, k.t > k.cue('knock') ? 'knock' : null);
        k.char(560, G + 30, S * 1.15, { ...CASUAL, face: k.t > k.cue('sold') ? 'blank' : k.t > k.cue('say') ? 'sad' : 'blank', pose: 'hold', talk: spk(k, 'say', 'tie'), gloom: k.t > k.cue('sold') ? 0.6 : 0, sq: k.take('sold', 0.8), tears: k.t > k.cue('mcgood') && k.t < k.cue('sold') ? 0.4 : 0 });
        if (k.t < k.cue('before')) { const { ctx } = k; noodleCup(k, 900, 900, 1, true); }
        if (k.t > k.cue('before') && k.t < k.cue('say')) { inset(k, 1300, 380, 190, '#5a1616', () => k.char(0, 380, 540, { ...LOC, beard: false, face: 'sad', pose: 'hold', shadow: false }), k.at('before', 0.4, 'back')); k.text('"Bác ơi, bà không đói đâu, bác đi ngủ—"', 1300, 620, { size: 32, font: 'title', color: '#fff', outline: '#1b1b24', outlineWidth: 8 }); tag(k, '⏪ PHẦN 1'); }
        if (k.t > k.cue('say') && k.t < k.cue('tie')) cap(k, '"BÀ KHÔNG ĐÓI ĐÂU BÁC. BÁC ĐI NGỦ ĐI."', 'say', { color: '#9fd0f0', y: 330, x: 760, size: 50 });
        if (k.t < k.cue('sold')) {
          const x = leaving ? 1300 + 520 * k.at('mcgood', 2.2, 'inOut') : 1300;
          k.char(x, G + 30, S * 1.05, { ...OLDTAM, face: k.t > k.cue('mcgood') ? 'happy' : 'sad', pose: 'hold', flip: !(leaving && k.t < k.cue('mcgood')), walk: leaving && k.t > k.cue('mcgood'), talk: spk(k, 'ask', 'before') + spk(k, 'mcgood', 'sold') });
          if (k.t < k.cue('tie')) bag(k, 1150, 880, 0.9); else k.group({ x: x - 90, y: 760 }, () => bag(k, 0, 0, 0.7));
        }
        if (k.t > k.cue('mcgood') && k.t < k.cue('sold')) cap(k, '"CẬU DẪN ĐÁM CƯỚI CHẮC HAY LẮM."', 'mcgood', { color: '#f2c230', y: 330, x: 760, size: 50 });
        if (k.t > k.cue('sold')) phone(k, 1200, 520, 0.85, { p: k.at('sold', 0.4, 'back'), screen: (k, w, h) => { k.ctx.fillStyle = '#0068ff'; k.ctx.fillRect(-w / 2, -h / 2, w, 60); k.text('Đại lý Honda', 0, -h / 2 + 30, { size: 24, font: 'title', color: '#fff' }); chat(k, -w / 2 + 12, -120, 'Xe đã có khách khác cọc ạ 🙏', { size: 22, maxW: w - 30 }); k.text('🛵❌', 0, 60, { size: 90 }); } });
        shHud(k, { clock: k.t > k.cue('knock') ? '9:30' : k.t > k.cue('sold') ? '8:59' : '7:45', hh: 0.24, miss: 19.76, sold: k.t > k.cue('sold') });
      },
    },
    // ===== 19. Công an → căn nhà ba tầng trống =====
    {
      say: '{ca}Lần này là hai anh công an. {money}Chỉ trong một ngày, các tài khoản đứng tên bạn nhận gần một tỷ, từ hơn bốn trăm người. {me}Có một khoản hai mươi triệu, nội dung: Mẹ gửi con. {house}Bạn dẫn họ đến căn nhà ba tầng cuối ngõ. {open}Cửa mở. {gone}Không còn bàn thờ xốp, không còn mười hai cô gái đeo tai nghe, không còn hai mươi cái điện thoại. {smell}Chỉ còn mùi mì tôm. {far}Bà Tám, Tí Tin và bốn cái điện thoại quay bốn góc đã đi đâu đó, chắc là rất xa. {left}Ở lại chỉ có một khuôn mặt và một cái tên, của bạn.',
      sfx: [['scratch', 'ca', 0.5], ['boom', 'money', 0.5], ['bonk', 'me', 0.4], ['whoosh', 'house', 0.3], ['scratch', 'open', 0.5], ['slideDown', 'gone', 0.4], ['sparkle', 'smell', 0.3], ['whoosh', 'far', 0.3], ['boom', 'left', 0.5]],
      draw(k) {
        if (k.t < k.cue('house')) {
          troRoom(k, { dawn: true }); door(k, 1); tag(k, '9:30');
          k.char(480, G + 30, S * 1.15, { ...CASUAL, face: 'shock', pose: 'hold', sweat: true });
          k.char(1240, G + 30, S * 1.1, { ...POLICE, face: 'cold', pose: 'hold', flip: true, talk: spk(k, 'money', 'house') });
          k.char(1480, G + 30, S * 1.1, { ...POLICE, color: '#4d6a2f', face: 'cold', pose: 'hips', flip: true });
          if (k.t > k.cue('money')) card(k, 860, 330, 820, 320, '🏦 TK đứng tên NGUYỄN VĂN LỘC', [['24 giờ: gần 1 TỶ', 'money', '#c0392b'], ['từ hơn 400 người', 'money'], ['+20.000.000đ · "Me gui con"', 'me', '#2e6da4']], { p: k.at('money', 0.4), size: 40, gap: 70, head: '#3d5a80', headText: '#fff' });
          return;
        }
        if (k.t < k.cue('open')) { alley(k); k.char(700, G, S, { ...CASUAL, walk: true, face: 'blank' }); k.char(1000, G, S, { ...POLICE, walk: true, face: 'cold' }); return; }
        // bên trong: trống trơn
        room(k, '#3a2a2e', '#2a1e22', '#4a3a32');
        lamp(k, 960, 200, 0.25);
        const { ctx } = k;
        ctx.setLineDash([16, 12]); ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 4;
        ctx.strokeRect(1180, 560, 420, 370); for (const [x, y] of [[420, 520], [620, 330], [900, 330], [1080, 520]]) ctx.strokeRect(x - 34, y - 60, 68, 120); ctx.strokeRect(1640, 300, 260, 200);
        ctx.setLineDash([]);
        if (k.t > k.cue('gone')) { for (const [i, t] of ['🛕 bàn thờ xốp', '🎧 12 cô gái', '📱 20 điện thoại'].entries()) k.text('❌ ' + t, 380 + i * 580, 200, { size: 44, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at(k.cue('gone', i * 0.8), 0.3), outline: '#1b1b24', outlineWidth: 10 }); }
        noodleCup(k, 960, 920, 1.2, true);
        if (k.t > k.cue('smell')) k.text('🍜…', 1080, 760, { size: 60, fx: 'pop', p: k.at('smell', 0.3) });
        k.char(560, G + 40, S * 1.1, { ...CASUAL, face: k.t > k.cue('left') ? 'blank' : 'shock', pose: 'hold', gloom: k.t > k.cue('left') ? 0.7 : 0 });
        k.char(1460, G + 40, S * 1.05, { ...POLICE, face: 'cold', pose: 'hips', flip: true });
        if (k.t > k.cue('far')) k.text('✈️ 💨', 1500, 420, { size: 90, fx: 'pop', p: k.at('far', 0.3) });
        if (k.t > k.cue('left')) { tint(k, '#000', 0.35); idCard(k, 960, 520, 1.3, k.at('left', 0.4)); }
      },
    },
    // ===== 20. Kết: "Nghề nghiệp?" — khuôn mặt vẫn đi làm =====
    {
      say: '{clock}Mười giờ sáng. {name}Anh công an mở sổ: Họ tên? Nguyễn Văn Lộc. {job}Nghề nghiệp? {habit}Theo thói quen mười năm, bạn mở miệng: Kính thưa… {stop}Bạn dừng lại. MC đám cưới ạ. {ngan}Điện thoại bạn rung. Ngân nhắn: Anh ơi, chủ nhật anh vẫn dẫn cho em chứ? {mom}Mẹ em bảo anh giống thầy Lộc Phát lắm, mẹ vừa chuyển cho thầy ba triệu. {live}Trên bàn, thầy Lộc Phát vẫn đang livestream, chín nghìn người xem. {server}Không ai tắt được khuôn mặt ấy, vì máy chủ ở nước ngoài. {end1}Khuôn mặt bạn vẫn đi làm. {end2}Chỉ có bạn là nghỉ việc.',
      sfx: [['click', 'clock', 0.4], ['scratch', 'name', 0.3], ['pop', 'job', 0.3], ['tada', 'habit', 0.2], ['bonk', 'stop', 0.4], ['boing', 'ngan', 0.4], ['ding', 'ngan', 0.4], ['bonk', 'mom', 0.5], ['pop', 'live', 0.4], ['slideDown', 'server', 0.4], ['boom', 'end2', 0.5]],
      draw(k) {
        policeHall(k); tag(k, '10:00');
        const { ctx } = k;
        k.char(1360, G, S * 1.15, { ...CA, face: 'cold', pose: 'hold', flip: true, talk: spk(k, 'name', 'job') + spk(k, 'job', 'habit') });
        k.char(560, G, S * 1.15, { ...CASUAL, face: k.t > k.cue('end1') ? 'blank' : k.t > k.cue('mom') ? 'shock' : k.t > k.cue('habit') && k.t < k.cue('stop') ? 'happy' : 'blank', pose: k.t > k.cue('habit') && k.t < k.cue('stop') ? 'present' : 'hold', talk: spk(k, 'habit', 'stop') + spk(k, 'stop', 'ngan'), gloom: k.t > k.cue('end1') ? 0.6 : 0, sq: k.take('mom', 1) });
        // bàn
        ctx.fillStyle = '#6e4f3a'; ctx.fillRect(700, 740, 560, 30); ctx.fillRect(720, 770, 24, 160); ctx.fillRect(1216, 770, 24, 160);
        ctx.fillStyle = '#fffdf6'; ctx.fillRect(1020, 700, 180, 40); k.text('BIÊN BẢN', 1110, 720, { size: 18, font: 'title', color: '#1b1b24' });
        if (k.t > k.cue('habit') && k.t < k.cue('stop')) bigWord(k, '🎤 "KÍNH THƯA…"', 'habit', 760, 330, '#ffe08a', 64);
        if (k.t > k.cue('stop') && k.t < k.cue('ngan')) cap(k, 'NGHỀ NGHIỆP: MC ĐÁM CƯỚI', 'stop', { color: '#fff' });
        if (k.t > k.cue('ngan') && k.t < k.cue('live')) phone(k, 960, 470, 0.95, { p: k.at('ngan', 0.4, 'back'), screen: (k, w, h) => {
          k.ctx.fillStyle = '#f29bb8'; k.ctx.fillRect(-w / 2, -h / 2, w, 60); k.text('Ngân 🌸', 0, -h / 2 + 30, { size: 26, font: 'title', color: '#fff' });
          chat(k, -w / 2 + 12, -150, 'Anh ơi chủ nhật anh vẫn dẫn cho em chứ? 🥰', { size: 20, maxW: w - 30 });
          if (k.t > k.cue('mom')) { chat(k, -w / 2 + 12, -60, 'Mẹ em bảo anh giống thầy Lộc Phát lắm 😂', { size: 20, maxW: w - 30, p: k.at('mom', 0.3) }); chat(k, -w / 2 + 12, 30, 'Mẹ vừa chuyển cho thầy 3 triệu 🙏', { size: 20, maxW: w - 30, p: k.at(k.cue('mom', 1.2), 0.3) }); }
        } });
        if (k.t > k.cue('live')) {
          liveMini(k, 760, 300, 400, 225, { pose: 'present', view: '9.000' });
          if (k.t > k.cue('server')) k.text('🌏 máy chủ ở nước ngoài · không ai tắt được', 960, 600, { size: 34, font: 'title', color: '#fff', fx: 'fade', p: k.at('server', 0.4), outline: '#1b1b24', outlineWidth: 8 });
        }
        if (k.t > k.cue('end1')) { tint(k, '#0d1222', 0.45 * k.at('end1', 0.8)); liveMini(k, 760, 300, 400, 225, { pose: 'present', view: '9.000' }); cap(k, 'KHUÔN MẶT BẠN VẪN ĐI LÀM.', 'end1', { color: '#f2c230', y: 760, size: 70 }); }
        if (k.t > k.cue('end2')) cap(k, 'CHỈ CÓ BẠN LÀ NGHỈ VIỆC.', 'end2', { color: '#ff8a7a', y: 880, size: 70 });
      },
    },
    nextEpisodeScene({
      title: 'Nếu Bạn Là Nhân Viên Sàn Chứng Khoán "Xịn"… (Phần 1)',
      hook: 'Hoa hồng tiền tỷ, sếp đi siêu xe. Chỉ có một điều không ai nói với bạn: cái sàn bạn đang mời khách nạp tiền vào.',
      when: 'Câu chuyện mới · tuần sau',
      say: '{next}Câu chuyện tiếp theo: bạn là nhân viên một sàn chứng khoán. Hoa hồng tiền tỷ, sếp đi siêu xe. Chỉ có một điều không ai nói với bạn: cái sàn mà bạn đang mời khách nạp tiền vào.',
      art(k) {
        k.char(-200, 190, 400, { ...LOC_MC, color: '#1b2338', tie: '#f2c230', hair: 'spiky', face: 'smug', pose: 'present' });
        k.arrow(80, 120, 300, -120, { width: 14, head: 40, stroke: '#3fb86a', seed: 5 });
        k.text('📈💰', 260, 60, { size: 90 });
      },
    }),
    subscribeScene({
      question: 'Nếu là Lộc, lúc 7 giờ sáng, bạn có nhận 50 triệu của ông Tâm không?',
      channel: 'Nếu Bạn Là',
      say: '{q}Nếu là Lộc, lúc bảy giờ sáng, bạn có nhận năm mươi triệu của ông Tâm không? Bình luận cho mình biết. {sub}Đăng ký và bật chuông, để không lỡ câu chuyện tiếp theo nhé.',
    }),
  ],
};
