// Kênh Nếu Bạn Là — "Thầy" giải hạn online, PHẦN 1/2: một đêm livestream của thầy Lộc Phát.
// Kể liền mạch (skill kênh, mục "Kể liền mạch"): mục tiêu + đồng hồ = 100 triệu trong 3 tiếng; 2 lần nhảy thời gian (0:00 → 23:15, 3:05 → 6:00);
// sợi chỉ = chòm râu dán; vòng mở = 4 điện thoại quay 4 góc + 200 câu thu âm → cuối tập: mặt bạn đang live trên 3 kênh khi bạn đang ngủ.
// Truyện hư cấu; tên người, "Pháp đàn Lộc Phát", địa danh đều hư cấu. Thủ đoạn theo tin có thật:
// - VTV 05/03/2026 https://vtv.vn/mat-trang-tien-vi-tin-vao-livestream-dang-sao-giai-han-100260304213732869.htm
//   livestream "Gia đạo bất ổn! Nhà có vong theo! Phải làm lễ ngay nếu không hậu quả sẽ khó lường!", hàng nghìn người xem, lễ 3 triệu,
//   "làm lễ chưa đúng thủ tục" → thêm lễ "cắt vong giải hạn"; ở xa thì "chỉ cần theo dõi livestream"; gọi điện đọc đúng tên tuổi địa chỉ;
//   chatbot, deepfake "thầy bà ảo" dựa trên người thật; sau đó bị chặn liên lạc.
// - Tiền Phong 23/04/2026 https://tienphong.vn/bat-thay-tam-linh-tiktok-lua-dao-giai-nghiep-post1837990.html
//   "Master Dũng Văn" (TikTok 120.000 người theo dõi): "oan gia trái chủ", "âm binh quấy phá", tự xưng cảm xạ; 5–30 triệu mỗi lần; khởi tố, tạm giam.
// - VOH 06/02/2025 https://voh.com.vn/phap-luat/triet-pha-duong-day-lua-dao-tam-linh-chiem-doat-8-ty-dong-tu-28000-nan-nhan-578940.html
//   nhóm 29 người ở Tuyên Quang tự xưng "cô đồng", vật phẩm "trì chú" 200–500 nghìn (hàng giả), 28.000 nạn nhân, ~8 tỷ; thu giữ danh sách khách hàng.
import { nextEpisodeScene, subscribeScene } from '/engine/templates.js';
import * as thumbs from '/videos/076-neu-ban-la-thay-giai-han-online-p1/thumbs.js';
import {
  G, HO, spk, pop, tag, cap, tint, paper, phone, chat, cash, alley, moto, confetti, ipad,
  LOC, LOC_MC, BATAM, TITIN, TAM, CALLGIRL, liveRoom, altarFront, liveUI, liveHud, qrCard, keng, callFloor, packFloor, backstage, vongBook, invite, troRoom, miniLive, ringLight,
} from '/channel/neu-ban-la.js';

const S = 520;
const LX = 960, LY = 870, LS = 650; // Lộc ngồi sau bàn thờ trong khung live
// ---------- bộ phận riêng của tập ----------
// Khung live đầy đủ: phòng + Lộc + bàn thờ + giao diện + bảng đếm.
function live(k, o = {}) {
  liveRoom(k);
  k.char(LX, LY, LS, { ...LOC, shadow: false, ...o.loc });
  if (o.after) o.after(k);
  altarFront(k, { ring: o.ring ?? 0 });
  liveUI(k, o.ui ?? {});
  if (o.hud !== false) liveHud(k, o.hud ?? {});
}
// Ô tròn chèn (inset): fn vẽ nhân vật với gốc (0, 0) ở giữa ô.
function inset(k, x, y, r, bg, fn, p = 1) {
  if (p <= 0) return;
  k.group({ x, y, s: 0.6 + 0.4 * p }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, r + 10, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = bg; ctx.fillRect(-r, -r, 2 * r, 2 * r); fn(k);
    ctx.restore();
  });
}
// Bà Tám trong ô tròn (sau máy quay).
const tamInset = (k, face, pose = 'hips', p = 1, x = 1640, y = 640) => inset(k, x, y, 150, '#3a2a2e', () => k.char(0, 300, 420, { ...BATAM, face, pose, shadow: false }), p);
// Ông Tâm 77 tuổi trong ô tròn: phòng tối, ánh điện thoại.
const tamOld = (k, face = 'sad', p = 1, x = 1640, y = 640) => inset(k, x, y, 150, '#1b2238', () => {
  k.char(0, 300, 420, { ...TAM, face, pose: 'hold', shadow: false });
  const g = k.ctx.createRadialGradient(0, 40, 10, 0, 40, 160); g.addColorStop(0, 'rgba(160,200,255,0.35)'); g.addColorStop(1, 'rgba(160,200,255,0)'); k.ctx.fillStyle = g; k.ctx.fillRect(-160, -120, 320, 320);
}, p);
// Bong bóng "tai nghe" (giọng bà Tám) dưới bảng đếm.
function earBubble(k, text, cue, o = {}) {
  const p = k.at(cue, 0.35, 'back');
  if (p <= 0 || (o.until && k.t > k.cue(o.until))) return;
  k.group({ x: o.x ?? 1630, y: o.y ?? 330, s: p }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#b8325a'; ctx.beginPath(); ctx.roundRect(-270, -70, 540, 140, 22); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-200, 60); ctx.lineTo(-240, 110); ctx.lineTo(-150, 66); ctx.fill();
    k.text('🎧 ' + text, 0, 0, { size: 30, font: 'title', color: '#fff', maxWidth: 500 });
  });
}
// Thông báo chuyển khoản (góc phải).
function notif(k, name, amount, note, cue, y = 330) {
  const p = k.at(cue, 0.35, 'back');
  if (p <= 0) return;
  k.group({ x: 1630, y, s: p }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#fffdf6'; ctx.strokeStyle = '#3fb86a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(-270, -80, 540, 160, 22); ctx.fill(); ctx.stroke();
    k.text('🏦 ' + name, -245, -40, { size: 28, font: 'title', align: 'left', color: '#1b1b24' });
    k.text(amount, 245, -40, { size: 32, font: 'title', align: 'right', color: '#2e9a55' });
    k.text('ND: ' + note, -245, 30, { size: 30, align: 'left', color: '#5a5f66', maxWidth: 490 });
  });
}
// Chòm râu dê cầm tay.
function heldBeard(k, x, y, s = 1, r = 0) {
  k.group({ x, y, s, r }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#d9d4cc'; ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-40, -40); ctx.quadraticCurveTo(0, 120, 40, -40); ctx.quadraticCurveTo(0, -20, -40, -40); ctx.fill(); ctx.stroke();
  });
}
// Tai nghe chụp đầu cho nhân viên tầng 1 (vẽ sau k.char): (x, yFoot, size) như k.char chibiGirl.
function headset(k, x, y, size) {
  const s = size / 100, hy = y - 65 * s, hr = 26 * s;
  const { ctx } = k;
  ctx.strokeStyle = '#1b1b24'; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.arc(x, hy, hr * 1.08, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
  ctx.fillStyle = '#1b1b24'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + d * hr * 1.02, hy, 5 * s, 8 * s, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(x - hr * 1.02, hy + 6 * s); ctx.quadraticCurveTo(x - hr * 0.9, hy + hr * 0.7, x - hr * 0.35, hy + hr * 0.62); ctx.stroke();
}
// Mặt tiền nhà ba tầng cuối ngõ (không biển, không chuông).
function houseFront(k, open = 0) {
  alley(k);
  const { ctx } = k;
  ctx.fillStyle = '#6b6f78'; ctx.fillRect(760, 60, 420, 870);
  for (let f = 0; f < 3; f++) {
    const y = 120 + f * 240;
    ctx.fillStyle = f === 2 ? '#ff6a5a' : '#ffe08a'; ctx.globalAlpha = 0.85; ctx.fillRect(820, y, 300, 130); ctx.globalAlpha = 1;
    ctx.strokeStyle = '#3a3f48'; ctx.lineWidth = 8; ctx.strokeRect(820, y, 300, 130);
    for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(820 + i * 50, y); ctx.lineTo(820 + i * 50, y + 130); ctx.stroke(); }
  }
  // cửa sắt kéo
  ctx.fillStyle = '#2b2f3d'; ctx.fillRect(860, 760, 220, 170);
  ctx.fillStyle = '#ffe08a'; ctx.globalAlpha = 0.7 * open; ctx.fillRect(860, 760, 220 * open, 170); ctx.globalAlpha = 1;
  ctx.strokeStyle = '#4a4f57'; ctx.lineWidth = 5; for (let x = 860 + 220 * open; x < 1080; x += 18) { ctx.beginPath(); ctx.moveTo(x, 760); ctx.lineTo(x, 930); ctx.stroke(); }
}
// Tờ 200 câu thu âm: rows = [[số, câu, cue]].
function linesSheet(k, x, y, rows, hl) {
  k.group({ x, y, r: 0.02 }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#fffdf6'; ctx.fillRect(-330, -230, 660, 460);
    k.text('THU ÂM · 200 CÂU', 0, -185, { size: 34, font: 'title', color: '#1b1b24' });
    rows.forEach(([n, t, cue], i) => {
      const p = cue == null ? 1 : k.at(cue, 0.3);
      if (p <= 0) return;
      const yy = -120 + i * 82;
      if (hl === n) { ctx.fillStyle = 'rgba(255,90,74,0.25)'; ctx.fillRect(-320, yy - 34, 640, 74); }
      k.text(`${n}.`, -300, yy, { size: 28, font: 'title', align: 'left', color: '#8a8f98' });
      k.text(t, -230, yy, { size: 26, align: 'left', color: hl === n ? '#c0392b' : '#1b1b24', maxWidth: 540 });
    });
  });
}
const FAKE = '#8a8f98', REAL = '#9fd0f0';
const bigWord = (k, text, cue, x, y, color = '#ffe08a', size = 64) => k.text(text, x, y, { size, font: 'title', color, fx: 'pop', p: k.at(cue, 0.3), outline: '#1b1b24', outlineWidth: 12 });

export default {
  meta: {
    title: 'Nếu Bạn Là "Thầy" Giải Hạn Online… (Phần 1)',
    description: `Nửa đêm livestream, ba nghìn người xem, một chòm râu dán và một mã QR chuyển khoản: bạn có ba tiếng để "giải hạn" ra một trăm triệu.
Câu chuyện hư cấu dựa trên các vụ lừa đảo giải hạn, "giải nghiệp", bán vật phẩm "trì chú" qua mạng được báo chí đưa tin năm 2025–2026: kịch bản dọa "nhà có vong theo", lễ bổ sung, danh sách khách hàng mua sẵn và cả "thầy ảo" deepfake.`,
    footer: `📚 Dựa trên tin VTV (05/03/2026) về livestream dâng sao giải hạn và deepfake "thầy bà ảo", Tiền Phong (23/04/2026) về "thầy tâm linh" TikTok bị khởi tố vì lừa "giải nghiệp", VOH (06/02/2025) về đường dây bán vật phẩm "trì chú" lừa 28.000 người. Tên người, địa danh và tình tiết đã được hư cấu.
⚠️ Không có "vong" nào nhận chuyển khoản. Người lạ đọc đúng tên tuổi, địa chỉ của bạn là vì họ mua được dữ liệu, không phải vì có "căn". Giọng nói và khuôn mặt trên mạng có thể bị làm giả: người thân gọi xin tiền gấp thì gọi lại số quen để kiểm tra. Thấy dấu hiệu lừa đảo: gọi 113.
🔔 Đăng ký Nếu Bạn Là để xem Phần 2.`,
    links: [['🔔 Đăng ký', 'https://www.youtube.com/@neubanlaa?sub_confirmation=1']],
    tags: ['lừa đảo', 'giải hạn online', 'thầy bói online', 'lừa đảo tâm linh', 'livestream giải hạn', 'deepfake', 'nếu bạn là', 'hoạt hình'],
    hashtags: ['luadao', 'giaihan', 'canhgiac'],
    style: 'clean', tts: 'omnivoice', omniVoice: 'fb2', speed: 1, // giọng 08 (từ 11/11); bản Edge cũ: tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1.1
    lead: 0.25, tail: 0.45, pause: 0.2,
    transition: 'cut', sfxTransitions: false, camera: 0.04,
    sfxVolume: 0.6,
    paper: '#f7f1e3', privacy: 'private',
  },
  thumbnail: thumbs.a,

  scenes: [
    // ===== 1. HOOK: 0:00, đèn vòng bật =====
    {
      say: 'Không giờ đúng. {light}Đèn vòng bật. {beard}Bạn ngồi trước một cái bàn thờ làm bằng xốp, râu dán ngứa như có kiến bò. {view}Trên màn hình: ba nghìn người đang xem. {goal}Trong ba tiếng tới, bạn phải làm cho họ chuyển khoản một trăm triệu. {no}Bạn không biết cúng. Bạn chưa gặp vong bao giờ. {voice}Bạn chỉ có một thứ: giọng của một anh MC đám cưới.',
      sfx: [['click', 'light', 0.5], ['scratch', 'beard', 0.3], ['pop', 'view', 0.4], ['cash', 'goal', 0.5], ['gulp', 'no', 0.5], ['ding', 'voice', 0.4]],
      draw(k) {
        live(k, {
          loc: { face: k.t > k.cue('no') ? 'shock' : 'blank', pose: k.t > k.cue('beard') && k.t < k.cue('view') ? 'think' : 'hold', sweat: k.t > k.cue('no'), sq: k.take('no', 0.8) },
          ui: { view: [0, 3000, 'view', 1.6] },
          hud: k.t > k.cue('goal') ? { clock: '0:00', left: '3 tiếng', chot: 0 } : false,
          after: (k) => { if (k.t > k.cue('beard') && k.t < k.cue('view')) k.focusLines(LX, 600, { p: 1, r: 260 }); },
        });
        tint(k, '#000', 0.85 * (1 - k.at('light', 0.3)));
      },
    },
    {
      say: 'Nếu bạn là "thầy" giải hạn online, {p1}đây là phần một. {sub}Bấm đăng ký đi, {back}rồi mình lùi lại bốn mươi lăm phút.',
      sfx: [['pop', 'p1', 0.4], ['ding', 'sub', 0.4], ['slideDown', 'back', 0.5]],
      draw(k) {
        live(k, { loc: { face: 'blank', pose: 'hold' }, ui: { view: 3000 }, hud: { clock: '0:00', left: '3 tiếng', chot: 0 } });
        tint(k, '#14161d', 0.6);
        k.text('NẾU BẠN LÀ', 960, 380, { size: 70, font: 'title', color: '#fff', fx: 'pop', p: k.at(0, 0.4), outline: '#1b1b24', outlineWidth: 12 });
        k.text('"THẦY" GIẢI HẠN ONLINE', 960, 490, { size: 96, font: 'title', color: '#f2c230', fx: 'pop', p: k.at(0.3, 0.4), outline: '#1b1b24', outlineWidth: 14 });
        k.text('PHẦN 1', 960, 610, { size: 60, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at('p1', 0.4), outline: '#1b1b24', outlineWidth: 12 });
        if (k.t > k.cue('back')) { const p = k.at('back', 0.8); tint(k, '#0d1222', 0.6 * p); k.text('⏪ 23:15', 960, 760, { size: 90, font: 'title', color: '#9fd0f0', fx: 'pop', p, outline: '#1b1b24', outlineWidth: 12 }); }
      },
    },
    // ===== 2. 23:15 — vì sao bạn ở đây =====
    {
      say: 'Mười một giờ mười lăm. {ngo}Bạn đứng đầu một con ngõ ngoại thành, tay cầm tấm thiệp cưới. {ngan}Thiệp của Ngân, người yêu cũ. Chú rể đi SH. {msg}Ngân nhắn: Anh làm MC cho em nhé, anh nói hay mà. {sh}Con SH cũ giá bảy mươi triệu. {mc}Còn một đám cưới, bạn được ba trăm nghìn với một hộp xôi. {calc}Tính ra phải dẫn hai trăm ba mươi đám cưới. {zalo}Nhưng chiều nay, trong nhóm Zalo việc làm có một tin: Tuyển MC giọng trầm. Việc đêm. Hoa hồng mười phần trăm. {addr}Địa chỉ: căn nhà cuối con ngõ này.',
      sfx: [['scratch', 'ngo', 0.3], ['pop', 'ngan', 0.4], ['ding', 'msg', 0.4], ['cash', 'sh', 0.4], ['bonk', 'mc', 0.4], ['slideDown', 'calc', 0.4], ['ding', 'zalo', 0.5], ['whoosh', 'addr', 0.3]],
      draw(k) {
        alley(k); tag(k, '23:15');
        const zalo = k.t > k.cue('zalo');
        k.char(560, G, S * 1.15, { ...LOC_MC, face: zalo ? 'happy' : k.t > k.cue('calc') ? 'sad' : k.t > k.cue('ngan') ? 'cold' : 'blank', pose: 'hold', look: zalo ? 1 : 0, gloom: k.t > k.cue('calc') && !zalo ? 0.6 : 0, sq: k.take('zalo', 0.7) });
        if (!zalo) {
          invite(k, 1260, 420, 1, k.at('ngo', 0.5, 'back'));
          if (k.t > k.cue('msg')) chat(k, 1000, 760, 'Anh làm MC cho em nhé, anh nói hay mà 🥰', { size: 34, maxW: 760, p: k.at('msg', 0.3) });
          if (k.t > k.cue('sh')) { k.text('SH CŨ = 70.000.000đ', 1300, 140, { size: 50, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at('sh', 0.3), outline: '#1b1b24', outlineWidth: 10 }); }
          if (k.t > k.cue('mc')) k.text('1 ĐÁM = 300K + 🍚', 1300, 210, { size: 44, font: 'title', color: '#fff', fx: 'pop', p: k.at('mc', 0.3), outline: '#1b1b24', outlineWidth: 10 });
          if (k.t > k.cue('calc')) cap(k, 'CẦN 230 ĐÁM CƯỚI', 'calc', { color: '#f2c230' });
        } else {
          phone(k, 1250, 520, 1.15, { p: k.at('zalo', 0.4, 'back'), screen: (k, w, h) => {
            const { ctx } = k; ctx.fillStyle = '#0068ff'; ctx.fillRect(-w / 2, -h / 2, w, 64);
            k.text('VIỆC LÀM 24H', 0, -h / 2 + 33, { size: 26, font: 'title', color: '#fff' });
            k.text('🔥 TUYỂN MC GIỌNG TRẦM', 0, -150, { size: 26, font: 'title', color: '#c0392b', maxWidth: w - 20 });
            k.text('Việc đêm · không cần kinh nghiệm', 0, -90, { size: 22, color: '#1b1b24', maxWidth: w - 20 });
            k.text('Hoa hồng 10%', 0, -30, { size: 40, font: 'title', color: '#2e9a55' });
            k.text('📍 nhà cuối ngõ', 0, 50, { size: 26, color: '#5a5f66', p: k.at('addr', 0.3), fx: 'fade' });
          } });
        }
      },
    },
    // ===== 3. Cửa nhà: bà Tám =====
    {
      say: 'Căn nhà ba tầng cuối ngõ không có biển, không có chuông, {smell}chỉ có mùi hương trầm trộn mùi mì tôm. {door}Người mở cửa là bà Tám: móng tay đỏ, dây chuyền vàng to như xích chó, tay cầm iPad. {look}Bà nhìn bạn từ đầu đến chân, rồi phán đúng ba câu: {v1}Giọng được. {v2}Mặt non. {v3}Thiếu râu.',
      sfx: [['sparkle', 'smell', 0.3], ['scratch', 'door', 0.5], ['slideUp', 'look', 0.3], ['ding', 'v1', 0.5], ['bonk', 'v2', 0.5], ['boom', 'v3', 0.4]],
      draw(k) {
        houseFront(k, k.at('door', 0.8));
        if (k.t > k.cue('smell') && k.t < k.cue('door')) { k.steam(970, 720, 2); k.text('🍜 + 🪔', 970, 600, { size: 60, fx: 'pop', p: k.at('smell', 0.3) }); }
        k.char(470, G, S * 1.1, { ...LOC_MC, face: k.t > k.cue('v3') ? 'shock' : 'blank', pose: 'hold', sq: k.take('v3', 1) });
        if (k.t > k.cue('door')) {
          k.char(1350, G, S * 1.25, { ...BATAM, face: 'cold', pose: 'hold', look: -1, lookY: k.t > k.cue('look') && k.t < k.cue('v1') ? Math.sin(k.t * 3) : 0, p: pop(k, 'door') });
          ipad(k, 1350, 760, 0.5, {});
        }
        const stamp = (t, c, x, y, cue) => { const p = k.at(cue, 0.3, 'back'); if (p > 0) k.group({ x, y, s: p, r: -0.08 }, () => { k.ctx.strokeStyle = c; k.ctx.lineWidth = 8; k.ctx.strokeRect(-150, -46, 300, 92); k.text(t, 0, 2, { size: 46, font: 'title', color: c }); }); };
        stamp('GIỌNG ✓', '#3fb86a', 300, 220, 'v1'); stamp('MẶT ✗', '#c0392b', 640, 160, 'v2'); stamp('RÂU ✗', '#c0392b', 560, 330, 'v3');
      },
    },
    // ===== 4. Dán râu, thành "thầy Lộc Phát" =====
    {
      say: 'Vì thế, việc đầu tiên trong sự nghiệp tâm linh của bạn là: {glue}dán râu. Bà Tám bôi keo, ấn một chòm râu dê bạc trắng vào cằm bạn. {pho}Thầy mà không râu, như phở không hành. {name}Từ giờ, em là thầy Lộc Phát. {itch}Keo dán sắt đấy, live ba tiếng không rơi. Bạn gật. Cằm bạn bắt đầu ngứa. {up}Rồi bà dẫn bạn lên cầu thang. Và tới đây bạn mới hiểu: đây không phải nhà một ông thầy. {factory}Đây là một cái nhà máy.',
      sfx: [['scratch', 'glue', 0.5], ['pop', 'pho', 0.3], ['tada', 'name', 0.4], ['scratch', 'itch', 0.3], ['whoosh', 'up', 0.3], ['boom', 'factory', 0.5]],
      draw(k) {
        if (k.t < k.cue('up')) {
          paper(k, '#3a2a2e'); k.ctx.fillStyle = '#4a3a32'; k.ctx.fillRect(0, G, k.W, k.H - G);
          const named = k.t > k.cue('name');
          k.char(560, G + 40, S * 1.35, { ...BATAM, face: k.t > k.cue('pho') && k.t < k.cue('name') ? 'laugh' : 'smug', pose: k.t < k.cue('pho') ? 'point' : 'present', talk: spk(k, 'pho', 'up') });
          k.char(1260, G + 40, S * 1.5, { ...(named ? LOC : LOC_MC), beard: k.t > k.cue('glue', 0.6) ? 'goat' : false, beardColor: '#d9d4cc', face: k.t > k.cue('itch') ? 'blank' : 'shock', pose: k.t > k.cue('itch') ? 'think' : 'hold', sweat: k.t > k.cue('itch'), sq: k.take('name', 0.8) });
          if (k.t > k.cue('glue') && k.t < k.cue('pho')) { k.text('🧴 KEO', 900, 500, { size: 50, font: 'title', color: '#fff', fx: 'pop', p: k.at('glue', 0.3), outline: '#1b1b24', outlineWidth: 10 }); }
          if (named) cap(k, 'THẦY LỘC PHÁT', 'name', { color: '#f2c230', y: 160, size: 80 });
          if (k.t > k.cue('itch')) for (let i = 0; i < 4; i++) k.text('🐜', 1150 + 70 * i + 10 * Math.sin(k.gt * 6 + i), 560 + 20 * Math.cos(k.gt * 5 + i), { size: 34 });
        } else {
          // cầu thang tối + ba tầng sáng
          paper(k, '#1b1b24');
          const { ctx } = k;
          for (let f = 0; f < 3; f++) { ctx.fillStyle = ['#cfd8d4', '#f0dcc0', '#5a1616'][f]; ctx.fillRect(120 + f * 580, 160 + (2 - f) * 120, 520, 400); k.text(['TẦNG 1 · GỌI ĐIỆN', 'TẦNG 2 · ĐÓNG GÓI', 'TẦNG 3 · LIVESTREAM'][f], 380 + f * 580, 220 + (2 - f) * 120, { size: 34, font: 'title', color: f === 2 ? '#f2c230' : '#1b1b24', fx: 'pop', p: k.at(k.cue('up', 0.4 + f * 0.4), 0.3) }); }
          ctx.strokeStyle = '#8a8f98'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(100, 1000); for (let i = 0; i < 9; i++) { ctx.lineTo(100 + i * 200, 1000 - i * 70); ctx.lineTo(100 + (i + 1) * 200, 1000 - i * 70); } ctx.stroke();
          k.char(260 + 900 * k.at('up', 3, 'inOut'), 990 - 315 * k.at('up', 3, 'inOut'), S * 0.75, { ...BATAM, walk: true, face: 'smug', shadow: false });
          k.char(110 + 900 * k.at(k.cue('up', 0.3), 3, 'inOut'), 1040 - 315 * k.at(k.cue('up', 0.3), 3, 'inOut'), S * 0.75, { ...LOC, walk: true, face: 'shock', shadow: false });
          cap(k, 'MỘT CÁI NHÀ MÁY', 'factory', { color: '#ff8a7a', y: 110, size: 76 });
        }
      },
    },
    // ===== 5. Tầng 1: danh sách 28.000 dòng =====
    {
      say: 'Tầng một: {girls}mười hai cô gái đeo tai nghe, mỗi người một màn hình. {list}Trên màn hình là một danh sách hai mươi tám nghìn dòng: họ tên, năm sinh, địa chỉ, số điện thoại. {call}Một cô đang gọi: Chị Hoa, sinh năm bảy mốt, nhà gần đình làng phải không ạ? {sob}Đầu bên kia im một giây, rồi sụt sịt: Sao cô biết? {why}Cô biết, vì danh sách mua của một nhóm bán dữ liệu. {can}Còn chị Hoa tưởng cô biết, vì cô có căn. {next}Bà Tám kéo bạn đi tiếp: Chưa phải phần hay đâu.',
      sfx: [['click', 'girls', 0.4], ['slideDown', 'list', 0.4], ['ding', 'call', 0.3], ['gulp', 'sob', 0.4], ['cash', 'why', 0.4], ['sparkle', 'can', 0.4], ['whoosh', 'next', 0.3]],
      draw(k) {
        callFloor(k); tag(k, '23:25');
        const cols = ['#3d7fc1', '#f29bb8', '#6bb56b', '#e8b84a'];
        for (let i = 0; i < 4; i++) { const x = 250 + i * 470 + 150, sz = S * 0.62; k.char(x, 905, sz, { ...CALLGIRL(cols[i], i % 2 ? 'bun' : 'long'), face: 'blank', pose: 'hold', talk: i === 1 && k.t > k.cue('call') && k.t < k.cue('sob') ? 0.6 + 0.4 * Math.sin(k.t * 9) : 0, shadow: false, p: k.at(k.cue('girls', i * 0.12), 0.3) }); headset(k, x, 905, sz); }
        if (k.t > k.cue('list') && k.t < k.cue('call')) {
          k.group({ x: 960, y: 470, s: k.at('list', 0.4, 'back') }, () => {
            const { ctx } = k; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#3fb86a'; ctx.lineWidth = 8; ctx.fillRect(-620, -300, 1240, 560); ctx.strokeRect(-620, -300, 1240, 560);
            ctx.fillStyle = '#3fb86a'; ctx.fillRect(-620, -300, 1240, 70); k.text('khach_hang_FULL.xlsx · 28.000 dòng', 0, -264, { size: 34, font: 'title', color: '#fff' });
            const rows = [['Họ tên', 'Năm sinh', 'Địa chỉ', 'Điện thoại'], ['Nguyễn Thị Hoa', '1971', 'gần đình làng', '09•• ••• 213'], ['Trần Văn Bảy', '1958', 'xóm Chợ', '08•• ••• 771'], ['Lê Thị Hương', '1975', 'tổ 4', '03•• ••• 090'], ['…', '…', '…', '…']];
            rows.forEach((r, i) => r.forEach((c, j) => k.text(c, -560 + [0, 380, 600, 920][j], -170 + i * 90, { size: 32, font: i === 0 ? 'title' : undefined, align: 'left', color: i === 0 ? '#5a5f66' : '#1b1b24' })));
          });
        }
        if (k.t > k.cue('call') && k.t < k.cue('why')) {
          chat(k, 760, 300, 'Chị Hoa, sinh năm 71, nhà gần đình làng phải không ạ?', { size: 32, maxW: 700, p: k.at('call', 0.3) });
          if (k.t > k.cue('sob')) inset(k, 1560, 360, 170, '#e9d8c4', () => k.char(0, 330, 460, { ...CALLGIRL('#8e5fb0', 'bun'), face: 'cry', tears: 0.8, pose: 'hold', shadow: false }), k.at('sob', 0.4, 'back'));
          if (k.t > k.cue('sob')) chat(k, 1560, 590, 'Sao cô biết?! 😭', { size: 34, maxW: 400, p: k.at('sob', 0.3) });
        }
        if (k.t > k.cue('why') && k.t < k.cue('next')) { tint(k, '#14161d', 0.45); cap(k, 'BIẾT VÌ MUA DỮ LIỆU', 'why', { color: '#ff8a7a', y: 420, size: 76 }); }
        if (k.t > k.cue('can') && k.t < k.cue('next')) cap(k, '…KHÔNG PHẢI VÌ CÓ CĂN 🔮', 'can', { color: '#f2c230', y: 530, size: 60 });
        if (k.t > k.cue('next')) { k.char(260 + 400 * k.at('next', 1.5), G + 60, S * 0.9, { ...BATAM, walk: true, face: 'smug' }); k.char(80 + 400 * k.at(k.cue('next', 0.2), 1.5), G + 60, S * 0.9, { ...LOC, walk: true, face: 'shock' }); }
      },
    },
    // ===== 6. Tầng 2: trì chú bằng cách thổi =====
    {
      say: 'Tầng hai: {boys}ba thanh niên ngồi giữa núi vòng tay, tì hưu, túi gấm. {price}Hàng sỉ ngoài chợ, mười lăm nghìn một cái. Mỗi túi phải được thầy trì chú, rồi mới bán: ba trăm chín mươi nghìn. {blow}Bà Tám giơ một túi lên sát miệng bạn: Thổi. {phu}Bạn thổi. Phù. {done}Xong. Trì chú rồi đấy. Còn hai trăm túi nữa. {shelf}Nhưng thứ làm bạn đứng sững, là tập hồ sơ trên cái kệ ở góc phòng.',
      sfx: [['pop', 'boys', 0.3], ['cash', 'price', 0.4], ['boing', 'blow', 0.4], ['whoosh', 'phu', 0.6], ['sparkle', 'done', 0.5], ['drumroll', 'shelf', 0.4]],
      draw(k) {
        packFloor(k); tag(k, '23:35');
        for (let i = 0; i < 3; i++) k.char(700 + i * 260, 700, S * 0.55, { ...HO(['#5a5f66', '#3d7fc1', '#8a6a4f'][i], { hair: ['buzz', 'spiky', 'short'][i] }), face: 'blank', pose: 'hold', shadow: false, p: k.at(k.cue('boys', i * 0.15), 0.3) });
        if (k.t > k.cue('price') && k.t < k.cue('blow')) {
          k.group({ x: 960, y: 260, s: k.at('price', 0.4, 'back') }, () => {
            k.text('15.000đ', -300, 0, { size: 80, font: 'title', color: '#fff', outline: '#1b1b24', outlineWidth: 12 });
            k.arrow(-120, 0, 90, 0, { width: 10, head: 36, stroke: '#ff5a4a', seed: 31 });
            k.text('390.000đ', 300, 0, { size: 90, font: 'title', color: '#f2c230', outline: '#1b1b24', outlineWidth: 12 });
            k.text('= thổi 1 cái', 300, 90, { size: 40, font: 'title', color: '#fff', outline: '#1b1b24', outlineWidth: 8, fx: 'fade', p: k.at(k.cue('price', 2.5), 0.4) });
          });
        }
        const shelf = k.t > k.cue('shelf');
        k.char(560, G + 60, S * 1.2, { ...BATAM, face: 'smug', pose: k.t > k.cue('blow') && !shelf ? 'point' : 'hold', talk: spk(k, 'blow', 'phu') + spk(k, 'done', 'shelf') });
        k.char(1180, G + 60, S * 1.25, { ...LOC, face: shelf ? 'shock' : k.t > k.cue('phu') ? 'happy' : 'blank', pose: 'hold', look: shelf ? 1 : -1, sq: k.take('shelf', 1) });
        if (k.t > k.cue('blow') && !shelf) {
          k.group({ x: 980, y: 520 }, () => { const { ctx } = k; ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.roundRect(-40, -50, 80, 100, 10); ctx.fill(); ctx.fillStyle = '#f2c230'; ctx.fillRect(-40, -34, 80, 8); });
          if (k.t > k.cue('phu')) k.motion(1100, 500, -110, 0, { p: k.at('phu', 0.4), n: 3, len: 80 });
          if (k.t > k.cue('done')) k.text('✨ ĐÃ TRÌ CHÚ ✨', 980, 400, { size: 50, font: 'title', color: '#f2c230', fx: 'pop', p: k.at('done', 0.3), outline: '#1b1b24', outlineWidth: 10 });
        }
        if (shelf) {
          const { ctx } = k; ctx.fillStyle = '#5a3a1a'; ctx.fillRect(1560, 340, 300, 24);
          const g = ctx.createRadialGradient(1710, 290, 10, 1710, 290, 200); g.addColorStop(0, 'rgba(255,230,140,0.6)'); g.addColorStop(1, 'rgba(255,230,140,0)'); ctx.fillStyle = g; ctx.fillRect(1510, 90, 400, 400);
          ctx.fillStyle = '#2a3a5a'; ctx.fillRect(1650, 220, 120, 120); k.text('📕', 1710, 280, { size: 60 });
        }
      },
    },
    // ===== 7. Thư viện vong =====
    {
      say: 'Gáy hồ sơ ghi: Thư viện vong. {v1}Vong số một: ông bà chưa siêu thoát, dùng cho khách trên năm mươi tuổi. {v3}Vong số ba: cô gái chết đuối, dùng cho chị em hay đau đầu. {v9}Vong số chín: con chó cũ nhà hàng xóm, dùng cho khách đã nghe hết tám vong trên, mà vẫn chưa chuyển khoản. {price}Trang bên cạnh là bảng giá, có cả khuyến mãi cho khách quen. {last}Bạn lật đến trang cuối. Trang cuối chỉ có đúng một dòng.',
      sfx: [['scratch', 0.2, 0.4], ['pop', 'v1', 0.4], ['pop', 'v3', 0.4], ['boing', 'v9', 0.5], ['cash', 'price', 0.4], ['scratch', 'last', 0.5]],
      draw(k) {
        paper(k, '#2a1e22');
        vongBook(k, 960, 560, 1, [[1, 'Ông bà chưa siêu thoát', 'khách trên 50 tuổi', 'v1'], [3, 'Cô gái chết đuối', 'chị em hay đau đầu', 'v3'], [9, 'Con chó cũ nhà hàng xóm 🐕', 'khách nghe 8 vong trên vẫn chưa chuyển', 'v9']]);
        if (k.t > k.cue('price')) k.group({ x: 1270, y: 560, s: 1 }, () => {
          k.text('BẢNG GIÁ', 0, -280, { size: 46, font: 'title', color: '#c0392b', fx: 'pop', p: k.at('price', 0.3) });
          const rows = [['Lễ giải hạn', '3 triệu'], ['Lễ cắt vong', '9 triệu'], ['Mâm cơm cúng online', '5 triệu'], ['Vòng trì chú', '390k'], ['Khách quen', 'giảm 10% 🎁']];
          rows.forEach(([a, b], i) => { const p = k.at(k.cue('price', 0.2 + i * 0.25), 0.3); if (p > 0) { k.text(a, -260, -180 + i * 80, { size: 32, align: 'left', color: '#1b1b24' }); k.text(b, 260, -180 + i * 80, { size: 34, font: 'title', align: 'right', color: '#2e6da4' }); } });
        });
        if (k.t > k.cue('last')) { tint(k, '#000', 0.5 * k.at('last', 0.6)); k.text('?', 960, 540, { size: 300, font: 'title', color: '#f2c230', fx: 'pop', p: k.at(k.cue('last', 1), 0.4), outline: '#1b1b24', outlineWidth: 20 }); }
      },
    },
    // ===== 8. Mọi thứ đều là vong → tầng 3, 4 điện thoại quay 4 góc =====
    {
      say: '{big}Mọi thứ đều là vong. {up}Tầng ba là phòng livestream: bàn thờ xốp, hai cây nến điện, một cái chuông, và bốn cái điện thoại dựng bốn góc. {tin}Tí Tin, cậu kỹ thuật đeo kính, bảo bạn: {l}Anh quay trái. {r}Quay phải. {u}Ngẩng lên. {d}Cúi xuống. {why}Để làm ảnh bìa ạ. {rec}Bạn quay. Bốn cái điện thoại cùng nháy đèn đỏ. {clock}Mười một giờ năm mươi tám. Bạn chưa thuộc một chữ nào.',
      sfx: [['boom', 'big', 0.5], ['whoosh', 'up', 0.3], ['pop', 'tin', 0.3], ['click', 'l', 0.3], ['click', 'r', 0.3], ['click', 'u', 0.3], ['click', 'd', 0.3], ['ding', 'rec', 0.4], ['drumroll', 'clock', 0.4]],
      draw(k) {
        if (k.t < k.cue('up')) {
          paper(k, '#2a1e22');
          vongBook(k, 960, 560, 1, [], { last: 'big' });
          k.focusLines(1270, 810, { p: k.at('big', 0.3), r: 200 });
          return;
        }
        backstage(k, { rec: k.t > k.cue('rec'), prompter: false });
        tag(k, k.t > k.cue('clock') ? '23:58' : '23:50', k.t > k.cue('clock') ? 'clock' : 'up');
        const turn = k.t > k.cue('d') ? 'd' : k.t > k.cue('u') ? 'u' : k.t > k.cue('r') ? 'r' : k.t > k.cue('l') ? 'l' : '';
        k.char(760, G + 40, S * 1.2, { ...LOC, face: k.t > k.cue('clock') ? 'shock' : 'blank', pose: 'hold', shadow: false, look: turn === 'l' ? -1 : turn === 'r' ? 1 : 0, lookY: turn === 'u' ? -1 : turn === 'd' ? 1 : 0, tilt: turn === 'u' ? -0.12 : turn === 'd' ? 0.12 : 0, flip: turn === 'l', sweat: k.t > k.cue('clock'), sq: k.take('clock', 1) });
        k.char(1420, G + 40, S * 1.05, { ...TITIN, face: 'happy', pose: k.t > k.cue('tin') && k.t < k.cue('rec') ? 'point' : 'hold', talk: spk(k, 'tin', 'rec'), flip: true, p: pop(k, 'tin') });
        if (k.t > k.cue('rec') && k.t < k.cue('clock')) cap(k, '📸 ẢNH BÌA?', 'rec', { color: '#ff8a7a', y: 120 });
      },
    },
    // ===== 9. Màn hình chạy chữ + nick ảo → 3, 2, 1 =====
    {
      say: 'Bà Tám chỉ lên màn hình phía sau máy quay: {prompt}chữ chạy, đọc theo là được. {rack}Rồi chỉ sang góc phòng: hai mươi cái điện thoại cắm sạc, mỗi cái một nick: {n1}Hoa Sen Năm Tám. {n2}Bé Na. {n3}Con Cảm Ơn Thầy. {ask}Bạn hỏi: Thế trong ba nghìn người xem, ai là người thật? {real}Bà Tám cười: Người thật, là người chuyển khoản. {c3}Ba. {c2}Hai. {c1}Một.',
      sfx: [['pop', 'prompt', 0.3], ['pop', 'rack', 0.3], ['pop', 'n1', 0.3], ['pop', 'n2', 0.3], ['pop', 'n3', 0.3], ['gulp', 'ask', 0.3], ['cash', 'real', 0.5], ['click', 'c3', 0.5], ['click', 'c2', 0.5], ['ding', 'c1', 0.6]],
      draw(k) {
        backstage(k, { rack: true, rec: true, prompter: true });
        tag(k, '23:59');
        const pt = k.t > k.cue('rack') ? 'rack' : 'prompt';
        k.char(980, G + 40, S * 1.2, { ...BATAM, face: k.t > k.cue('real') && k.t < k.cue('c3') ? 'laugh' : 'smug', pose: k.t > k.cue('prompt') && k.t < k.cue('ask') ? 'point' : 'hips', flip: pt === 'prompt', talk: spk(k, 'prompt', 'ask') + spk(k, 'real', 'c3') });
        k.char(560, G + 40, S * 1.15, { ...LOC, face: k.t > k.cue('ask') && k.t < k.cue('real') ? 'calm' : k.t > k.cue('c3') ? 'shock' : 'blank', pose: k.t > k.cue('ask') && k.t < k.cue('real') ? 'shrug' : 'hold', talk: spk(k, 'ask', 'real'), sweat: k.t > k.cue('c3') });
        [['Hoa Sen 58', 'n1'], ['Bé Na', 'n2'], ['Con Cảm Ơn Thầy', 'n3']].forEach(([t, c], i) => { if (k.t > k.cue(c)) k.text(t, 1770, 600 + i * 70, { size: 34, font: 'title', color: '#fff', fx: 'pop', p: k.at(c, 0.3), outline: '#1b1b24', outlineWidth: 8 }); });
        if (k.t > k.cue('real') && k.t < k.cue('c3')) cap(k, 'NGƯỜI THẬT = NGƯỜI CHUYỂN KHOẢN', 'real', { color: '#f2c230', y: 130, size: 54 });
        for (const [n, c] of [['3', 'c3'], ['2', 'c2'], ['1', 'c1']]) { const a = k.at(c, 0.25, 'back'), nxt = { c3: 'c2', c2: 'c1', c1: null }[c]; if (a > 0 && (!nxt || k.t < k.cue(nxt))) { tint(k, '#000', 0.4); k.text(n, 960, 520, { size: 360 * a, font: 'title', color: '#ff2d55', outline: '#fff', outlineWidth: 18 }); } }
      },
    },
    // ===== 10. LIVE: lỡ miệng MC =====
    {
      say: '{on}Đèn đỏ bật. Bạn hít một hơi, và theo thói quen mười năm đứng sân khấu cưới, bạn mở miệng: {mc}Kính thưa quý vị đại biểu, hai họ nội ngoại… {cmt}Bình luận đầu tiên hiện lên: Thầy là MC à? {tam}Sau máy quay, mặt bà Tám tối như đáy nồi.',
      sfx: [['click', 'on', 0.4], ['tada', 'mc', 0.25], ['pop', 'cmt', 0.4], ['bonk', 'cmt', 0.4], ['boom', 'tam', 0.4]],
      draw(k) {
        live(k, {
          loc: { face: k.t > k.cue('cmt') ? 'shock' : 'happy', pose: k.t > k.cue('mc') && k.t < k.cue('cmt') ? 'present' : 'hold', talk: spk(k, 'mc', 'cmt'), sweat: k.t > k.cue('cmt'), sq: k.take('cmt', 1.2) },
          ui: { view: 3012, comments: [{ n: 'Bé Na', t: 'Thầy là MC à? 😂', cue: 'cmt', c: FAKE }] },
          hud: { clock: '0:00', left: '3 tiếng', chot: 0 },
        });
        if (k.t > k.cue('mc') && k.t < k.cue('cmt')) k.text('🎤 KÍNH THƯA HAI HỌ…', 1350, 330, { size: 48, font: 'title', color: '#fff', fx: 'pop', p: k.at('mc', 0.3), outline: '#1b1b24', outlineWidth: 10 });
        tamInset(k, 'angry', 'hips', k.at('tam', 0.4, 'back'));
      },
    },
    // ===== 11. Câu dọa =====
    {
      say: 'Vì thế, bạn nhìn thẳng màn hình chạy chữ, và đọc bằng cái giọng trầm nhất đời mình: {l1}Gia đạo bất ổn! {l2}Nhà có vong theo! {l3}Phải làm lễ ngay, nếu không, hậu quả sẽ khó lường! {up}Ba nghìn người xem. Ba nghìn hai. Ba nghìn rưỡi. {real}Rồi bình luận thật đầu tiên hiện lên.',
      sfx: [['boom', 'l1', 0.4], ['boom', 'l2', 0.4], ['boom', 'l3', 0.5], ['slideUp', 'up', 0.4], ['ding', 'real', 0.5]],
      draw(k) {
        const loud = k.t > k.cue('l1') && k.t < k.cue('up');
        live(k, {
          loc: { face: loud ? 'shout' : 'smug', pose: loud ? 'point' : 'hold', brows: true, talk: spk(k, 'l1', 'up'), vein: loud },
          ui: { view: [3012, 3500, 'up', 3], comments: [{ n: 'Hoa Sen 58', t: 'Mô phật 🙏', cue: 'l2', c: FAKE }, { n: 'Con Cảm Ơn Thầy', t: 'Thầy linh lắm ạ', cue: 'l3', c: FAKE }, { n: 'Hương 1975', t: 'Thầy ơi cho con hỏi…', cue: 'real', c: REAL }] },
          hud: { clock: '0:02', left: '2:58', chot: 0 },
          after: (k) => { if (loud) k.focusLines(LX, 520, { p: 1, r: 300 }); },
        });
        bigWord(k, 'GIA ĐẠO BẤT ỔN!', 'l1', 1500, 330); bigWord(k, 'NHÀ CÓ VONG THEO!', 'l2', 1500, 420, '#ff8a7a'); bigWord(k, 'LÀM LỄ NGAY!', 'l3', 1500, 510);
      },
    },
    // ===== 12. Bán vụ đầu tiên =====
    {
      say: 'Chị Hương, năm bảy lăm: {q}Thầy ơi, chồng con đêm nào cũng ngáy to như máy cày, có phải vong không ạ? {page}Bạn nhớ trang cuối: mọi thứ đều là vong. {ans}Phải rồi con ạ. Vong số một. Ông nội chồng con chưa siêu thoát, đêm nào cũng về nằm cạnh. {qr}Lễ giải ba triệu. Chuyển vào mã QR, nội dung ghi họ tên năm sinh. {wait}Bạn đếm thầm. Một. Hai. {keng}Keng! {math}Ba triệu. Bốn phút. Bằng mười đám cưới. {ear}Bạn chưa kịp cười, thì tai nghe rè rè.',
      sfx: [['pop', 'q', 0.3], ['sparkle', 'page', 0.3], ['drumroll', 'wait', 0.4], ['ding', 'keng', 0.7], ['cash', 'keng', 0.6], ['tada', 'math', 0.35], ['scratch', 'ear', 0.5]],
      draw(k) {
        const paid = k.t > k.cue('keng');
        live(k, {
          loc: { face: paid ? 'laugh' : k.t > k.cue('ans') ? 'smug' : 'calm', pose: k.t > k.cue('ear') ? 'think' : k.t > k.cue('qr') && !paid ? 'present' : 'hold', talk: spk(k, 'ans', 'wait'), look: k.t > k.cue('ear') ? 1 : 0, sq: k.take('keng', 0.9) },
          ring: paid && k.t < k.cue('keng', 1.2) ? 1 : 0,
          ui: { view: 3540, comments: [{ n: 'Hương 1975', t: 'Chồng con ngáy như máy cày, có phải vong ko ạ? 😰', cue: 'q', c: REAL }, { n: 'Bé Na', t: 'Đúng vong rồi chị ơi', cue: 'ans', c: FAKE }, { n: 'Hương 1975', t: 'Con chuyển rồi ạ 🙏', cue: 'keng', c: REAL }], qr: k.t > k.cue('qr') && !paid ? { amount: '3.000.000đ', cue: 'qr' } : null },
          hud: { clock: '0:04', left: '2:56', chot: [0, 3, 'keng', 0.8] },
        });
        if (k.t > k.cue('page') && k.t < k.cue('ans')) k.text('MỌI THỨ ĐỀU LÀ VONG', 1450, 330, { size: 46, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at('page', 0.3), outline: '#1b1b24', outlineWidth: 10 });
        if (k.t > k.cue('wait') && !paid) k.text(k.t > k.cue('wait', 0.9) ? '2…' : '1…', 1450, 420, { size: 90, font: 'title', color: '#fff', outline: '#1b1b24', outlineWidth: 12 });
        keng(k, 'keng', 1450, 420);
        if (k.t > k.cue('math')) cap(k, '4 PHÚT = 10 ĐÁM CƯỚI', 'math', { color: '#7fe0a8', y: 320, x: 1440, size: 50 });
      },
    },
    // ===== 13. Lễ bổ sung =====
    {
      say: 'Giọng bà Tám trong tai: {say}Bảo nó ghi sai nội dung, vong không nhận. Phải làm lễ cắt vong, chín triệu. {pause}Bạn khựng một giây. Một giây thôi. {do}Rồi bạn thở dài thật não nề: Con ơi, con ghi thiếu dấu, vong không nhận lễ rồi. Giờ phải cắt hẳn. Chín triệu. {keng}Keng. {lesson}Bài học đầu tiên của nghề: thứ bán chạy nhất không phải là lễ. Mà là lễ bổ sung. {clock}Một giờ sáng. Mười bốn triệu. Còn tám mươi sáu triệu, và hai tiếng.',
      sfx: [['scratch', 'say', 0.4], ['gulp', 'pause', 0.5], ['ding', 'keng', 0.7], ['cash', 'keng', 0.6], ['pop', 'lesson', 0.4], ['drumroll', 'clock', 0.4]],
      draw(k) {
        const paid = k.t > k.cue('keng'), late = k.t > k.cue('clock');
        live(k, {
          loc: { face: k.t > k.cue('pause') && k.t < k.cue('do') ? 'blank' : k.t > k.cue('do') && !paid ? 'sad' : 'smug', pose: k.t < k.cue('pause') ? 'think' : 'hold', talk: spk(k, 'do', 'keng'), gloom: k.t > k.cue('pause') && k.t < k.cue('do') ? 0.5 : 0 },
          ring: paid && k.t < k.cue('keng', 1.2) ? 1 : 0,
          ui: { view: late ? 3820 : 3600, comments: [{ n: 'Hương 1975', t: 'Dạ con sợ quá, con chuyển ngay', cue: 'do', c: REAL }, { n: 'Hoa Sen 58', t: 'Thầy cứu chị ấy với', cue: 'keng', c: FAKE }], qr: k.t > k.cue('do') && !paid ? { amount: '9.000.000đ', note: 'LỄ CẮT VONG', cue: 'do' } : null },
          hud: { clock: late ? '1:00' : '0:12', left: late ? '2 tiếng' : '2:48', chot: late ? [12, 14, 'clock', 0.8] : [3, 12, 'keng', 0.8] },
        });
        earBubble(k, 'Bảo nó ghi sai ND. Cắt vong 9 triệu!', 'say', { until: 'pause' });
        if (k.t > k.cue('pause') && k.t < k.cue('do')) tint(k, '#14161d', 0.35);
        keng(k, 'keng', 1450, 420);
        if (k.t > k.cue('lesson') && !late) k.group({ x: 1450, y: 400, s: k.at('lesson', 0.4, 'back'), r: -0.06 }, () => { k.ctx.fillStyle = '#f2c230'; k.ctx.beginPath(); k.ctx.roundRect(-250, -80, 500, 160, 20); k.ctx.fill(); k.text('LỄ BỔ SUNG', 0, -20, { size: 56, font: 'title', color: '#7a1f1f' }); k.text('bán chạy nhất 🔥', 0, 40, { size: 34, font: 'title', color: '#7a1f1f' }); });
      },
    },
    // ===== 14. Vào nhịp → ông Tâm =====
    {
      say: '{rhythm}Bạn bắt đầu vào nhịp. {a}Vong ông bà. {b}Vong chết đuối. {c}Vong con chó. {up}Mười tám triệu. Hai mươi lăm. {slow}Rồi một dòng bình luận gõ rất chậm, không dấu: {tam}Thầy ơi, vợ tôi mất năm ngoái. Tôi chỉ muốn hỏi bà ấy có đói không. {name}Tài khoản: Ông Tâm, bốn chín.',
      sfx: [['ding', 'a', 0.5], ['ding', 'b', 0.5], ['boing', 'c', 0.5], ['cash', 'up', 0.5], ['click', 'slow', 0.3], ['click', ['slow', 0.4], 0.3], ['click', ['slow', 0.8], 0.3]],
      draw(k) {
        const slow = k.t > k.cue('slow');
        const pose = k.t > k.cue('c') ? 'shout' : k.t > k.cue('b') ? 'point' : k.t > k.cue('a') ? 'present' : 'hold';
        live(k, {
          loc: { face: slow ? 'blank' : 'smug', pose: slow ? 'hold' : pose, talk: spk(k, 'rhythm', 'slow') },
          ring: !slow && k.t > k.cue('a') ? 0.5 : 0,
          ui: { view: 4100, comments: slow ? [] : [{ n: 'Lan 1968', t: 'Con chuyển 3tr rồi ạ', cue: 'a', c: REAL }, { n: 'Bình 1980', t: 'Nhà con có vong chó thật 😱', cue: 'c', c: REAL }, { n: 'Hoa Sen 58', t: 'Thầy linh quá', cue: 'up', c: FAKE }] },
          hud: { clock: slow ? '1:30' : '1:15', left: slow ? '1:30' : '1:45', chot: [14, 25, 'up', 1.6] },
        });
        if (!slow) for (const [c, t] of [['a', 'VONG ÔNG BÀ'], ['b', 'VONG CHẾT ĐUỐI'], ['c', 'VONG CON CHÓ 🐕']]) { const nx = { a: 'b', b: 'c', c: 'up' }[c]; if (k.t > k.cue(c) && k.t < k.cue(nx)) bigWord(k, t, c, 1450, 360, '#ffe08a', 60); }
        if (slow) {
          tint(k, '#0d1222', 0.45 * k.at('slow', 0.6));
          k.group({ x: 900, y: 820, s: k.at('tam', 0.4, 'back') }, () => {
            k.ctx.fillStyle = '#fffdf6'; k.ctx.beginPath(); k.ctx.roundRect(-640, -110, 1280, 220, 24); k.ctx.fill();
            k.text('Thay oi, vo toi mat nam ngoai.', 0, -38, { size: 46, color: '#1b1b24', fx: 'write', p: k.at('tam', 2.2, 'linear') });
            k.text('Toi chi muon hoi ba ay co doi khong.', 0, 34, { size: 46, color: '#1b1b24', fx: 'write', p: k.at(k.cue('tam', 2.2), 2.4, 'linear') });
          });
          tamOld(k, 'sad', k.at('name', 0.4, 'back'), 1660, 470);
          if (k.t > k.cue('name')) k.text('Ông Tâm · 1949', 1660, 670, { size: 38, font: 'title', color: '#fff', fx: 'fade', p: k.at('name', 0.4), outline: '#1b1b24', outlineWidth: 8 });
        }
      },
    },
    // ===== 15. Nghi ngờ bị dập =====
    {
      say: 'Đây là câu hỏi thật duy nhất đêm nay. {try}Bạn nói: Bác ơi, bà không đói đâu, bác đi ngủ— {red}Màn hình chạy chữ chuyển đỏ: Mâm cơm cúng online, năm triệu. {ear}Tai nghe: Đọc. {read}Bạn đọc. {pay}Ba phút sau, ông Tâm chuyển năm triệu. Nội dung: cho bà no. {chin}Bạn chưa kịp nghĩ gì, thì thấy cằm mình mát lạnh.',
      sfx: [['scratch', 'red', 0.4], ['bonk', 'ear', 0.4], ['ding', 'pay', 0.4], ['slideDown', 'chin', 0.4]],
      draw(k) {
        if (k.t > k.cue('red') && k.t < k.cue('read')) {
          backstage(k, { red: true, lines: ['MÂM CƠM CÚNG', 'ONLINE', '5 TRIỆU'], rec: true });
          k.char(1000, G + 40, S * 1.15, { ...BATAM, face: 'cold', pose: 'point', flip: true, talk: spk(k, 'ear', 'read') });
          k.focusLines(300, 260, { p: k.at('red', 0.3), r: 180 });
          liveHud(k, { clock: '1:32', left: '1:28', chot: 25 });
          return;
        }
        live(k, {
          loc: { face: k.t > k.cue('chin') ? 'shock' : k.t > k.cue('read') ? 'blank' : 'sad', pose: 'hold', talk: spk(k, 'try', 'red') + spk(k, 'read', 'pay'), gloom: k.t > k.cue('pay') && k.t < k.cue('chin') ? 0.7 : 0, beardPeel: 0.12 * k.at('chin', 0.5), look: k.t > k.cue('chin') ? 0 : 0, lookY: k.t > k.cue('chin') ? 1 : 0 },
          ui: { view: 4080, comments: [{ n: 'Ông Tâm 1949', t: 'Thay oi, vo toi mat nam ngoai…', c: REAL }, { n: 'Ông Tâm 1949', t: 'cam on thay', cue: 'pay', c: REAL }] },
          hud: { clock: '1:35', left: '1:25', chot: [25, 30, 'pay', 0.8] },
          after: (k) => { if (k.t > k.cue('chin')) k.focusLines(LX, 580, { p: k.at('chin', 0.3), r: 140 }); },
        });
        if (k.t > k.cue('read') && k.t < k.cue('pay')) k.text('🍚 MÂM CƠM CÚNG ONLINE · 5 TRIỆU', 1380, 330, { size: 40, font: 'title', color: '#fff', fx: 'pop', p: k.at('read', 0.3), outline: '#1b1b24', outlineWidth: 8, maxWidth: 900 });
        notif(k, 'Ông Tâm 1949', '+5.000.000đ', 'cho ba no', 'pay', 360);
      },
    },
    // ===== 16. Râu bong =====
    {
      say: 'Ba tiếng dưới đèn vòng, mồ hôi chảy ròng ròng, và keo dán sắt của bà Tám bắt đầu đầu hàng. {peel}Chòm râu bong ra một bên, lủng lẳng như cái rèm cửa hỏng. {flood}Bình luận nổ tung: Râu thầy rơi kìa! Thầy giả à? Hai mươi nick ảo gõ không kịp đỡ. {cut}Sau máy quay, bà Tám đưa ngón tay vạch ngang cổ. {shit}Bạn nghĩ đúng hai chữ: bỏ mẹ.',
      sfx: [['slideDown', 'peel', 0.5], ['pop', 'flood', 0.4], ['pop', ['flood', 0.3], 0.4], ['pop', ['flood', 0.6], 0.4], ['scratch', 'cut', 0.5], ['boom', 'shit', 0.5]],
      draw(k) {
        live(k, {
          loc: { face: k.t > k.cue('shit') ? 'shock' : k.t > k.cue('flood') ? 'blank' : 'blank', pose: 'hold', sweat: true, beardPeel: 0.12 + 0.6 * k.at('peel', 1.2, 'back'), sq: k.take('shit', 1.4), tilt: 0.04 * Math.sin(k.t * 2) },
          ui: { view: 4150, comments: [{ n: 'Lan 1968', t: 'Râu thầy rơi kìa!!', cue: 'flood', c: REAL }, { n: 'Bình 1980', t: 'Thầy giả à? 🤨', cue: ['flood', 0.4], c: REAL }, { n: 'Tuấn 1990', t: 'RÂU DÁN 😂😂😂', cue: ['flood', 0.8], c: REAL }, { n: 'Bé Na', t: 'Thầy vẫn linh mà…', cue: ['flood', 1.6], c: FAKE }] },
          hud: { clock: '1:45', left: '1:15', chot: 30 },
          after: (k) => { if (k.t > k.cue('shit')) k.focusLines(LX, 480, { p: 1, r: 280 }); },
        });
        tamInset(k, 'angry', { l: [12, 6], r: [70, 140] }, k.at('cut', 0.4, 'back'), 1640, 620);
        if (k.t > k.cue('cut')) k.line(1580, 560, 1700, 560, { width: 10, stroke: '#ff2d2d', p: k.at(k.cue('cut', 0.3), 0.4), seed: 77 });
        if (k.t > k.cue('shit')) bigWord(k, 'BỎ MẸ.', 'shit', 1450, 380, '#ff5a4a', 90);
      },
    },
    // ===== 17. Sự cố → bằng chứng =====
    {
      say: 'Nhưng mười năm đứng sân khấu cưới dạy bạn một điều: micro hỏng thì hát to hơn. {grab}Bạn giật phăng chòm râu, giơ lên trước ống kính, gầm lên: {roar}Vong đang giật râu ta! Vong này mạnh lắm! {rule}Ai vừa nhìn thấy râu ta rơi, thì nhà người đó có vong nặng! {silence}Ba giây im lặng. {flood}Rồi: Con thấy! Con cũng thấy! Thầy cứu con! {k1}Keng. {k2}Keng. {k3}Keng keng keng.',
      sfx: [['scratch', 'grab', 0.6], ['boom', 'roar', 0.5], ['boom', 'rule', 0.4], ['gulp', 'silence', 0.3], ['pop', 'flood', 0.4], ['pop', ['flood', 0.3], 0.4], ['ding', 'k1', 0.6], ['ding', 'k2', 0.6], ['ding', 'k3', 0.6], ['ding', ['k3', 0.25], 0.6], ['cash', ['k3', 0.5], 0.6]],
      draw(k) {
        const grab = k.t > k.cue('grab'), hold = k.t > k.cue('silence') && k.t < k.cue('flood');
        live(k, {
          loc: { face: k.t > k.cue('k1') ? 'laugh' : hold ? 'blank' : grab ? 'shout' : 'blank', pose: grab ? 'wave' : 'hold', beard: grab ? false : 'goat', beardPeel: 0.72, vein: grab && !hold && k.t < k.cue('k1'), talk: spk(k, 'roar', 'silence'), sq: k.take('grab', 1.2) },
          after: (k) => { if (grab && k.t < k.cue('silence')) k.focusLines(LX, 480, { p: 1, r: 320 }); if (grab) heldBeard(k, 1105, 420 + 8 * Math.sin(k.t * 8), 1.3, 0.3 * Math.sin(k.t * 6)); },
          ring: k.t > k.cue('k1') ? 1 : 0,
          ui: { view: hold ? 4150 : [4150, 5200, 'flood', 2], comments: [{ n: 'Lan 1968', t: 'CON THẤY!!', cue: 'flood', c: REAL }, { n: 'Bình 1980', t: 'Con cũng thấy 😱', cue: ['flood', 0.3], c: REAL }, { n: 'Thu 1972', t: 'Thầy cứu con!!!', cue: ['flood', 0.6], c: REAL }, { n: 'Mai 1966', t: 'Con chuyển rồi ạ 🙏🙏', cue: 'k2', c: REAL }] },
          hud: { clock: '2:00', left: '1 tiếng', chot: [30, 56, 'k1', 3] },
        });
        bigWord(k, 'VONG GIẬT RÂU TA!', 'roar', 1450, 330, '#ff8a7a', 58);
        if (k.t > k.cue('rule') && k.t < k.cue('silence')) bigWord(k, 'AI THẤY = CÓ VONG!', 'rule', 1450, 420, '#ffe08a', 52);
        if (hold) tint(k, '#000', 0.3);
        keng(k, 'k1', 1450, 330); keng(k, 'k2', 1560, 470); keng(k, 'k3', 1400, 560, 'KENG KENG!');
      },
    },
    // ===== 18. Bài học thứ hai → đứng im ở 86 triệu =====
    {
      say: 'Một sự cố, biến thành bằng chứng. {lesson}Bài học thứ hai của nghề: với người đang sợ, cái gì cũng là bằng chứng. {thumb}Bà Tám giơ ngón cái. {sh}Góc màn hình, tiền mua SH của bạn nhảy lên năm triệu sáu. {stall}Nhưng hai giờ bốn lăm, con số đứng im ở tám mươi sáu triệu.',
      sfx: [['sparkle', 'lesson', 0.4], ['ding', 'thumb', 0.4], ['cash', 'sh', 0.5], ['slideUp', ['stall', 0.2], 0.4], ['bonk', ['stall', 1.6], 0.5]],
      draw(k) {
        backstage(k, { rec: true, lines: ['VONG GIẬT RÂU', 'AI THẤY = CÓ VONG', '(ứng biến 👍)'] });
        const stall = k.t > k.cue('stall');
        k.char(1340, G + 40, S * 1.15, { ...BATAM, face: stall ? 'cold' : 'laugh', pose: k.t > k.cue('thumb') && !stall ? 'cheer' : 'hips', flip: true });
        k.char(720, G + 40, S * 1.15, { ...LOC, beard: false, face: stall ? 'blank' : 'happy', pose: 'hold', sweat: stall, sq: k.take('thumb', 0.6) });
        heldBeard(k, 820, 760, 0.9, 0.2);
        if (k.t > k.cue('thumb') && !stall) k.text('👍', 1450, 430, { size: 120, fx: 'pop', p: k.at('thumb', 0.3) });
        if (k.t > k.cue('lesson') && k.t < k.cue('thumb')) cap(k, 'NGƯỜI ĐANG SỢ: CÁI GÌ CŨNG LÀ BẰNG CHỨNG', 'lesson', { color: '#f2c230', y: 120, size: 50 });
        liveHud(k, { clock: stall ? '2:45' : '2:10', left: stall ? '15 phút' : '50 phút', chot: stall ? [56, 86, 'stall', 1.4] : 56 });
        if (k.t > k.cue('sh') && !stall) { k.ctx.strokeStyle = '#ff2a2a'; k.ctx.lineWidth = 8; k.ctx.beginPath(); k.ctx.ellipse(k.W - 278, 202, 260, 34, 0, 0, Math.PI * 2); k.ctx.stroke(); }
        if (k.t > k.cue('stall', 1.6)) k.text('⏸ 86 TRIỆU', 1640, 330, { size: 60, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at(k.cue('stall', 1.6), 0.3), outline: '#1b1b24', outlineWidth: 10 });
      },
    },
    // ===== 19. Cả nhà máy chạy hết công suất =====
    {
      say: 'Người xem bắt đầu đi ngủ. {all}Vì thế, cả cái nhà máy chạy hết công suất. {f1}Tầng một gọi cho những người đã xem mà chưa chuyển: Chị Hoa ơi, thầy vừa nhắc tên chị trên live đấy. {f2}Tầng hai đóng gói vòng trì chú. {f3}Còn bạn thổi phù phù vào túi gấm trước ống kính, như thổi nến sinh nhật cho cả nước. {n1}Chín mươi lăm. {n2}Chín mươi tám. {n3}Chín mươi chín triệu rưỡi. {last}Hai giờ năm mươi chín. Thiếu đúng năm trăm nghìn.',
      sfx: [['whoosh', 'all', 0.4], ['ding', 'f1', 0.3], ['pop', 'f2', 0.4], ['whoosh', 'f3', 0.5], ['ding', 'n1', 0.5], ['ding', 'n2', 0.5], ['ding', 'n3', 0.5], ['drumroll', 'last', 0.5]],
      draw(k) {
        const seg = k.t > k.cue('f3') ? 3 : k.t > k.cue('f2') ? 2 : k.t > k.cue('f1') ? 1 : 0;
        const chot = k.t > k.cue('n3') ? [98, 99.5, 'n3', 0.6] : k.t > k.cue('n2') ? [95, 98, 'n2', 0.6] : k.t > k.cue('n1') ? [86, 95, 'n1', 0.6] : 86;
        const hud = { clock: k.t > k.cue('last') ? '2:59' : '2:50', left: k.t > k.cue('last') ? '1 phút' : '10 phút', chot };
        if (seg <= 1) {
          callFloor(k);
          for (let i = 0; i < 4; i++) { const x = 250 + i * 470 + 150, sz = S * 0.62; k.char(x, 905, sz, { ...CALLGIRL(['#3d7fc1', '#f29bb8', '#6bb56b', '#e8b84a'][i], i % 2 ? 'bun' : 'long'), face: 'happy', pose: 'hold', talk: seg === 1 ? 0.5 + 0.5 * Math.sin(k.t * 9 + i) : 0, shadow: false }); headset(k, x, 905, sz); }
          if (seg === 1) chat(k, 900, 330, 'Chị Hoa ơi, thầy vừa nhắc tên chị trên live đấy!', { size: 34, maxW: 760, p: k.at('f1', 0.3) });
          if (seg === 0) cap(k, 'CẢ NHÀ MÁY: HẾT CÔNG SUẤT', 'all', { color: '#f2c230', y: 330 });
          liveHud(k, hud);
        } else if (seg === 2) {
          packFloor(k);
          for (let i = 0; i < 3; i++) k.char(700 + i * 260, 700, S * 0.55, { ...HO(['#5a5f66', '#3d7fc1', '#8a6a4f'][i], { hair: ['buzz', 'spiky', 'short'][i] }), face: 'happy', pose: Math.floor(k.t * 4 + i) % 2 ? 'hold' : 'present', shadow: false });
          for (let i = 0; i < 6; i++) { const u = (k.t * 1.2 + i / 6) % 1; k.group({ x: 600 + u * 900, y: 420 - Math.sin(u * Math.PI) * 140 }, () => { k.ctx.fillStyle = '#c0392b'; k.ctx.fillRect(-20, -26, 40, 52); }); }
          liveHud(k, hud);
        } else {
          live(k, {
            loc: { beard: false, face: 'happy', pose: 'hold', talk: 0.5 + 0.5 * Math.sin(k.t * 6) },
            after: (k) => { k.group({ x: 1170, y: 690 }, () => { k.ctx.fillStyle = '#c0392b'; k.ctx.beginPath(); k.ctx.roundRect(-40, -50, 80, 100, 10); k.ctx.fill(); k.ctx.fillStyle = '#f2c230'; k.ctx.fillRect(-40, -34, 80, 8); }); k.motion(1060, 650, 70, 30, { p: 1, n: 3, len: 50 }); },
            ui: { view: 2600, comments: [{ n: 'Ngọc 1979', t: 'Cho con 1 vòng trì chú', cue: 'f3', c: REAL }, { n: 'Hải 1984', t: 'Con lấy 2 túi gấm', cue: 'n1', c: REAL }, { n: 'Hoa 1971', t: 'Thầy nhắc tên con ạ? 😭', cue: 'n2', c: REAL }] },
            hud,
          });
          if (k.t > k.cue('last')) { tint(k, '#000', 0.35); k.text('THIẾU 500.000đ', 960, 420, { size: 100, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at('last', 0.3), outline: '#1b1b24', outlineWidth: 14 }); }
        }
      },
    },
    // ===== 20. Ông Tâm: đủ 100 triệu =====
    {
      say: 'Một dòng bình luận gõ chậm: {msg}Thầy ơi, cho bà nhà tôi thêm cái áo ấm. {who}Ông Tâm. {keng}Keng. Năm trăm nghìn. {goal}Một trăm triệu. {clap}Cả căn nhà ba tầng vỗ tay. {bell}Còn bạn nhìn cái tên ông Tâm, và tự nhiên cái chuông trong tay nặng như cục gạch. {cash}Bà Tám đếm ra mười triệu tiền mặt. Nhưng chưa đưa.',
      sfx: [['click', 'msg', 0.3], ['click', ['msg', 0.4], 0.3], ['ding', 'keng', 0.7], ['tada', 'goal', 0.6], ['cash', 'cash', 0.5]],
      draw(k) {
        const done = k.t > k.cue('goal');
        if (k.t < k.cue('cash')) {
          live(k, {
            loc: { beard: false, face: k.t > k.cue('bell') ? 'blank' : done ? 'happy' : 'blank', pose: 'hold', gloom: k.t > k.cue('bell') ? 0.6 : 0 },
            ring: k.t > k.cue('keng') && k.t < k.cue('bell') ? 1 : 0,
            ui: { view: 2400, comments: [{ n: 'Ông Tâm 1949', t: 'cho ba nha toi them cai ao am', cue: 'msg', c: REAL }] },
            hud: { clock: '2:59', left: '1 phút', chot: [99.5, 100, 'keng', 0.5] },
          });
          tamOld(k, 'calm', k.at('who', 0.4, 'back'), 1640, 640);
          notif(k, 'Ông Tâm 1949', '+500.000đ', 'cho ba them cai ao am', 'keng', 330);
          if (done && k.t < k.cue('bell')) confetti(k, k.at('clap', 1.5, 'linear'));
          if (k.t > k.cue('bell')) { tint(k, '#0d1222', 0.4 * k.at('bell', 1)); }
        } else {
          backstage(k, { prompter: false });
          k.char(1180, G + 40, S * 1.15, { ...BATAM, face: 'smug', pose: 'hold', flip: true });
          cash(k, 960, 820, 5, 1.2, k.at('cash', 0.4, 'back'));
          k.char(640, G + 40, S * 1.15, { ...LOC, beard: false, face: 'happy', pose: 'hold', look: 1 });
          tag(k, '3:00');
        }
      },
    },
    // ===== 21. 200 câu thu âm (vòng mở) =====
    {
      say: 'Bà đặt tay lên cọc tiền: Đọc nốt cái này cho Tí Tin, rồi về. {mic}Hai trăm câu. Tí Tin chìa micro. {c1}Câu một: Nhà con có vong theo. {c2}Câu hai: Chuyển khoản xong nhắn thầy. {c140}Đến câu một trăm bốn mươi: Mẹ ơi, con đây. Con đâm phải người ta, mẹ chuyển giúp con hai mươi triệu. {stop}Bạn dừng lại. Câu này đâu phải giải hạn? {nail}Bà Tám gõ móng tay xuống cọc tiền: Thư viện, em ạ. Vong thì nhiều loại. {read}Bạn đọc nốt sáu mươi câu. Cầm tiền. Về.',
      sfx: [['pop', 'mic', 0.4], ['click', 'c1', 0.3], ['click', 'c2', 0.3], ['scratch', 'c140', 0.4], ['bonk', 'stop', 0.5], ['click', 'nail', 0.5], ['click', ['nail', 0.15], 0.5], ['click', ['nail', 0.3], 0.5], ['whoosh', 'read', 0.4]],
      draw(k) {
        backstage(k, { prompter: false, rec: true });
        tag(k, '3:05');
        const stop = k.t > k.cue('stop') && k.t < k.cue('read');
        k.char(1500, G + 40, S * 1.1, { ...BATAM, face: k.t > k.cue('nail') ? 'cold' : 'smug', pose: 'hold', flip: true, talk: spk(k, 0, 'mic') + spk(k, 'nail', 'read') });
        cash(k, 1300, 860, 5, 1, 1);
        k.char(1060, G + 40, S * 0.95, { ...TITIN, face: 'happy', pose: 'present', flip: true, p: pop(k, 'mic') });
        k.char(330, G + 40, S * 1.1, { ...LOC, beard: false, face: stop ? 'shock' : 'blank', pose: 'hold', talk: spk(k, 'c1', 'stop') + spk(k, 'read', null), sq: k.take('stop', 1), look: stop ? 1 : 0 });
        if (k.t > k.cue('mic')) { const { ctx } = k; ctx.fillStyle = '#2b2b2b'; ctx.fillRect(560, 560, 14, 120); ctx.beginPath(); ctx.ellipse(567, 548, 26, 36, 0, 0, Math.PI * 2); ctx.fill(); }
        if (k.t > k.cue('mic')) linesSheet(k, 840, 330, [[1, 'Nhà con có vong theo.', 'c1'], [2, 'Chuyển khoản xong nhắn thầy.', 'c2'], ['…', '…', 'c2'], [140, 'Mẹ ơi, con đây. Con đâm phải người ta, mẹ chuyển giúp con 20 triệu.', 'c140']], k.t > k.cue('c140') ? 140 : null);
        if (k.t > k.cue('nail') && k.t < k.cue('read')) cap(k, '"THƯ VIỆN. VONG THÌ NHIỀU LOẠI."', 'nail', { color: '#ff8a7a', y: 980, size: 50 });
      },
    },
    // ===== 22. 6:00 sáng, phòng trọ =====
    {
      say: 'Sáu giờ sáng, phòng trọ. {cash}Mười triệu nằm dưới gối. {mirror}Bạn đứng trước gương, cạo chỗ keo còn dính trên cằm. {calc}Một đêm, mười triệu. Bảy đêm nữa là con SH. Đám cưới Ngân còn mười ngày. {sleep}Bạn nằm xuống, mỉm cười. {buzz}Điện thoại rung.',
      sfx: [['cash', 'cash', 0.4], ['scratch', 'mirror', 0.4], ['tada', 'calc', 0.3], ['sparkle', 'sleep', 0.3], ['boing', 'buzz', 0.4], ['boing', ['buzz', 0.4], 0.4]],
      draw(k) {
        troRoom(k, { dawn: true }); tag(k, '6:00');
        const lie = k.t > k.cue('sleep');
        if (!lie) k.char(k.t > k.cue('mirror') ? 520 : 760, G + 30, S * 1.1, { ...LOC_MC, tie: false, color: '#8a6a4f', face: k.t > k.cue('calc') ? 'happy' : 'blank', pose: k.t > k.cue('mirror') && k.t < k.cue('calc') ? 'think' : 'hold', flip: k.t > k.cue('mirror') && k.t < k.cue('calc') });
        else k.group({ x: 640, y: 800, r: -Math.PI / 2 }, () => k.char(0, 0, S * 0.9, { ...LOC_MC, tie: false, color: '#8a6a4f', face: k.t > k.cue('buzz') ? 'shock' : 'happy', pose: 'hold', shadow: false }));
        heldBeard(k, 900, 820, 0.7, 1.2);
        if (k.t > k.cue('cash')) cash(k, 340, 790, 3, 0.7, k.at('cash', 0.4, 'back'));
        if (k.t > k.cue('calc') && !lie) k.text('10tr × 7 đêm = 🛵', 1200, 640, { size: 64, font: 'title', color: '#2e6da4', fx: 'pop', p: k.at('calc', 0.3), outline: '#fff', outlineWidth: 10 });
        if (k.t > k.cue('calc') && !lie) k.text('Đám cưới Ngân: còn 10 ngày', 1200, 730, { size: 40, font: 'title', color: '#c0392b', fx: 'fade', p: k.at(k.cue('calc', 1.2), 0.4) });
        if (k.t > k.cue('buzz')) phone(k, 1050, 760, 0.45, { ring: true, p: k.at('buzz', 0.3, 'back') });
      },
    },
    // ===== 23. Mặt bạn đang live — KẾT =====
    {
      say: 'Thằng bạn MC nhắn: {msg}Ê, mày đang live à? Ba kênh một lúc? {open}Bạn mở TikTok. {lives}Thầy Lộc Phát đang livestream. Cùng khuôn mặt bạn. Cùng giọng trầm của bạn. {say}Đang nói: Gia đạo bất ổn. Nhà có vong theo. {three}Ba kênh cùng lúc. Mỗi kênh ba nghìn người xem. {beard}Bạn nhìn chòm râu trên tay mình. {end}Người trên màn hình, vẫn còn râu.',
      sfx: [['ding', 'msg', 0.5], ['click', 'open', 0.4], ['boom', 'lives', 0.5], ['pop', 'three', 0.4], ['pop', ['three', 0.3], 0.4], ['gulp', 'beard', 0.4], ['boom', 'end', 0.6]],
      draw(k) {
        if (k.t < k.cue('open')) {
          troRoom(k, { dawn: true });
          phone(k, 960, 540, 1.3, { screen: (k, w, h) => { k.ctx.fillStyle = '#eef3f8'; k.ctx.fillRect(-w / 2, -h / 2, w, h); k.text('Tùng MC', 0, -h / 2 + 40, { size: 28, font: 'title', color: '#1b1b24' }); chat(k, -w / 2 + 14, -60, 'Ê mày đang live à? 3 kênh 1 lúc?? 😳', { size: 26, maxW: w - 40, p: k.at('msg', 0.3) }); } });
          return;
        }
        paper(k, '#14161d');
        const panel = (i) => miniLive(k, 60 + i * 610, 170, 580, 326, () => { liveRoom(k, {}); k.char(LX, LY, LS, { ...LOC, face: 'smug', pose: ['point', 'present', 'shout'][i], talk: 0.5 + 0.5 * Math.sin(k.gt * 7 + i * 2), shadow: false }); altarFront(k); }, { view: '3.0' + (i + 1) + '0', label: ['Thầy Lộc Phát', 'Lộc Phát Official', 'Pháp Đàn Lộc Phát'][i] });
        const n = k.t > k.cue('three') ? 3 : 1;
        for (let i = 0; i < n; i++) { if (i === 0 || k.t > k.cue('three', (i - 1) * 0.3)) panel(i === 0 ? 1 : i === 1 ? 0 : 2); }
        if (k.t > k.cue('say') && k.t < k.cue('beard')) k.text('"Gia đạo bất ổn. Nhà có vong theo…"', 960, 620, { size: 44, font: 'title', color: '#ff8a7a', fx: 'fade', p: k.at('say', 0.4) });
        if (k.t > k.cue('beard')) {
          k.char(400, 1250, S * 1.5, { ...LOC_MC, tie: false, color: '#8a6a4f', face: k.t > k.cue('end') ? 'shock' : 'blank', pose: 'hold', shadow: false, gloom: k.t > k.cue('end') ? 0.6 : 0, sq: k.take('end', 1.2) });
          heldBeard(k, 720, 880, 1.6, 0.2);
          if (k.t > k.cue('end')) {
            k.ctx.strokeStyle = '#ff2a2a'; k.ctx.lineWidth = 9; k.ctx.beginPath(); k.ctx.ellipse(960, 372, 52, 48, 0, 0, Math.PI * 2); k.ctx.stroke();
            k.arrow(780, 820, 935, 440, { width: 10, head: 34, stroke: '#ff2a2a', bend: -0.15, p: k.at('end', 0.5), seed: 41 });
            k.text('VẪN CÒN RÂU', 1350, 760, { size: 80, font: 'title', color: '#ff8a7a', fx: 'pop', p: k.at(k.cue('end', 0.5), 0.4), outline: '#1b1b24', outlineWidth: 12 });
          }
        }
      },
    },
    nextEpisodeScene({
      title: 'Nếu Bạn Là "Thầy" Giải Hạn Online… (Phần 2)',
      hook: 'Khuôn mặt bạn đi làm 24 tiếng một ngày. Và một sáng, có người gõ cửa tìm đúng khuôn mặt ấy.',
      when: 'Phần 2 · tuần sau',
      say: '{next}Phần hai: khuôn mặt bạn đi làm hai mươi bốn tiếng một ngày, kể cả khi bạn đang ngủ. Và một buổi sáng, có người gõ cửa phòng trọ, tìm đúng khuôn mặt ấy.',
      art(k) {
        k.char(-260, 190, 400, { ...LOC, face: 'smug', pose: 'present' });
        k.char(240, 190, 400, { ...LOC_MC, tie: false, color: '#8a6a4f', face: 'shock', pose: 'hold', sweat: true });
        k.text('🚪✊', 40, -80, { size: 90 });
      },
    }),
    subscribeScene({
      question: 'Lộc là kẻ lừa đảo, hay chỉ là cái giọng đi làm thuê?',
      channel: 'Nếu Bạn Là',
      say: '{q}Theo bạn, Lộc là kẻ lừa đảo, hay chỉ là một cái giọng đi làm thuê? Bình luận cho mình biết. {sub}Đăng ký và bật chuông, để không lỡ phần hai nhé.',
    }),
  ],
};
