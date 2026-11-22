// Kênh Nếu Bạn Là — "Tầng 4", PHẦN 2/2: lúc bạn bước ra khỏi thang máy. Dàn ý: videos/070-…/kich-ban.md (Phần 2).
// Truyện hư cấu; tên người, khách sạn, thị xã, sàn "Golden FX" đều hư cấu. Thủ đoạn theo tin có thật:
// - Thanh Niên 04/11/2026 https://thanhnien.vn/bo-cong-an-thong-tin-ve-duong-day-toi-pham-xuyen-quoc-gia-tai-thanh-hoa-185261104124341427.htm
//   nhóm 4–5 người + tổ trưởng; giả doanh nhân / phụ nữ trẻ đẹp đầu tư, làm quen, yêu đương → sàn ngoại hối, tiền ảo giả; cá cược bóng đá
//   phát trên Douyin; 113 người nước ngoài; 94 bị can (90 nước ngoài + 4 Việt); ~50 tỷ; điều 290, 348; đấu tranh từ tháng 6 đến tháng 10/2026.
// - Dân trí 04/11/2026 https://dantri.com.vn/phap-luat/lat-tay-bi-mat-cua-nhom-nguoi-nuoc-ngoai-trong-can-biet-thu-khep-kin-20261104215525552.htm
//   lương 700 USD + chuyên cần 200 USD; phạt 400–1.000 USD nếu không đạt; ~50 người/ngày; giữ hộ chiếu; quy đổi USDT, cuối ngày chuyển ví đầu nậu, phí 3%.
// Chi tiết "người mẫu thuê để gọi video", "cho rút ít để nạp nhiều" là thủ đoạn lừa tình–đầu tư phổ biến được công an cảnh báo; ở đây là hư cấu.
import { nextEpisodeScene, subscribeScene } from '/engine/templates.js';
import * as thumbs from '/videos/073-neu-ban-la-le-tan-khach-san-tang-4-p2/thumbs.js';
import {
  G, GUARD, HO, CA, spk, pop, tag, cap, tint, paper, phone, chat, counter, chapTop, scamRoom, policeHall, visitRoom, coachNight, safe,
  KHAI, THAO, BOTHAO, LY, TU, CHANTRAN, RAU, LINDA, TOTRUONG, POLICE, shiftLog, sunCurtain, hotelFront, lobby, lobbyDesk, corridor4, vanInside,
  bikeRepair, dollar, forexApp, ringCorner, siren, loveChat,
} from '/channel/neu-ban-la.js';

const S = 520;
const L0 = { tip: 8000, banh: 9840, sim: 3400, nuotOff: true };
const log = (k, o = {}) => shiftLog(k, { ...L0, ...o });
function breadBag(k, x, y, s = 1) {
  k.group({ x, y, s }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#d9b27a'; ctx.strokeStyle = '#7a5a2a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-55, -90, 110, 120, 8); ctx.fill(); ctx.stroke();
    for (let i = 0; i < 3; i++) { ctx.fillStyle = '#c9862b'; ctx.beginPath(); ctx.ellipse(-28 + i * 28, -96, 14, 34, 0.2 * (i - 1), 0, Math.PI * 2); ctx.fill(); }
  });
}
// Màn hình máy tính trên bàn (khung to): fn(k, w, h) vẽ nội dung, gốc ở giữa.
function monitor(k, x, y, w, h, fn, p = 1) {
  if (p <= 0) return;
  k.group({ x, y, s: 0.7 + 0.3 * p }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(-w / 2 - 18, -h / 2 - 18, w + 36, h + 36, 14); ctx.fill();
    ctx.fillRect(-30, h / 2 + 18, 60, 50); ctx.fillRect(-110, h / 2 + 64, 220, 16);
    ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip(); fn(k, w, h); ctx.restore();
  });
}
const TU_AVATAR = (k, x, y, r) => { const { ctx } = k; ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip(); ctx.fillStyle = '#9fc4e8'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); k.char(x, y + r * 2.2, r * 3.2, { ...TU, face: 'happy', shadow: false }); ctx.restore(); };

export default {
  meta: {
    title: 'Nếu Bạn Là Lễ Tân Khách Sạn… Tầng 4 (Phần 2)',
    description: `Sau cánh cửa tầng 4: những dãy bàn, hàng trăm điện thoại, một tập kịch bản tán tỉnh, và một cô "Linda" đang nhắn tin với bố bạn.
Câu chuyện hư cấu dựa trên các vụ lò lừa đảo thuê trọn khách sạn, biệt thự ở Việt Nam được báo chí đưa tin tháng 11/2026: chỉ tiêu 50 người mỗi ngày, phạt tiền nếu không lừa đủ, và những "cô gái xinh đẹp giỏi đầu tư" chưa từng tồn tại.`,
    footer: `📚 Dựa trên tin Thanh Niên (04/11/2026) về đường dây 113 người nước ngoài thuê khách sạn ở Thanh Hoá lừa đảo khoảng 50 tỷ, và Dân trí (04/11/2026) về nhóm lừa đảo trong biệt thự ở Đà Nẵng. Tên người, khách sạn, sàn giao dịch và tình tiết đã được hư cấu.
⚠️ "Người yêu qua mạng" rủ đầu tư sàn ngoại hối, tiền ảo = lừa đảo. Cho rút được ít tiền lúc đầu là mồi. Bán SIM, khai báo lưu trú hộ người lạ có thể là phạm tội. Thấy dấu hiệu đáng ngờ: gọi 113.
🔔 Đăng ký Nếu Bạn Là để xem câu chuyện tiếp theo.`,
    links: [['▶ Phần 1', '070-neu-ban-la-le-tan-khach-san-tang-4-p1'], ['🔔 Đăng ký', 'https://www.youtube.com/@neubanlaa?sub_confirmation=1']],
    tags: ['lừa đảo', 'lò lừa đảo', 'lừa tình qua mạng', 'sàn ngoại hối lừa đảo', 'khách sạn', 'lễ tân', 'nếu bạn là', 'hoạt hình'],
    hashtags: ['luadao', 'luatinh', 'canhgiac'],
    style: 'clean', tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1.1,
    lead: 0.25, tail: 0.45, pause: 0.2,
    transition: 'cut', sfxTransitions: false, camera: 0.04,
    sfxVolume: 0.6,
    paper: '#f7f1e3', privacy: 'private',
  },
  thumbnail: thumbs.a,

  scenes: [
    // ===== HOOK =====
    {
      say: 'Hai giờ sáng, hành lang tầng bốn. {door}Cửa phòng bốn trăm linh bốn hé ra một khe. {screen}Bên trong, một màn hình đang mở khung chat, tên là: Linda, tim đỏ, Tư Xe Đạp. {who}Người đang gõ, là một gã râu quai nón to như con gấu, đeo kính lão. {type}Gã gõ: Anh yêu ơi, em nhớ anh.',
      sfx: [['drumroll', 0.1, 0.3], ['scratch', 'door', 0.4], ['ding', 'screen', 0.5], ['boom', 'who', 0.5], ['click', 'type', 0.3], ['click', ['type', 0.2], 0.3], ['click', ['type', 0.4], 0.3]],
      draw(k) {
        if (k.t < k.cue('screen')) {
          corridor4(k);
          tag(k, '2:00 SÁNG');
          k.char(1560, 1500, S * 1.9, { ...KHAI, face: 'shock', pose: 'hold', shadow: false, sweat: true, look: -1 });
        } else {
          paper(k, '#0d0f16');
          const { ctx } = k; ctx.fillStyle = '#1b1f2a'; ctx.fillRect(0, 0, 360, k.H); ctx.fillRect(k.W - 360, 0, 360, k.H);
          monitor(k, 700, 470, 620, 480, loveChat('Linda ❤️ Tư Xe Đạp', [{ text: 'Anh ăn cơm chưa? 🥰' }, { text: 'Anh ăn rồi. Em ăn chưa?', me: true }, { text: 'Anh yêu ơi, em nhớ anh', cue: 'type' }], { size: 30, msgSize: 30 }));
          k.char(1350, G + 120, S * 1.45, { ...RAU, face: k.t > k.cue('type') ? 'happy' : 'blank', pose: { l: [60, -40], r: [60, -40] }, p: pop(k, 'who'), shadow: false });
          if (k.t > k.cue('who')) k.text('LINDA?!', 1350, 160, { size: 90, font: 'title', color: '#ff5a7a', fx: 'pop', p: k.at('who', 0.4), outline: '#fff', outlineWidth: 12 });
        }
      },
    },
    {
      say: 'Mười ngày sau, {land}bố bạn đặt cọc bán ba sào ruộng hương hoả. {van}Còn bạn, ngồi trên xe thùng công an, vẫn đeo nơ. {why}Và lần này, chính bạn là người gọi họ tới.',
      sfx: [['slideDown', 'land', 0.4], ['boom', 'van', 0.5], ['sparkle', 'why', 0.4]],
      draw(k) {
        if (k.t < k.cue('van')) {
          bikeRepair(k);
          k.char(900, G, S, { ...TU, face: 'happy', pose: 'present', p: pop(k, 'land', 0.3) });
          k.group({ x: 1340, y: 520, s: pop(k, 'land'), r: 0.04 }, () => { k.rect(-220, -150, 440, 300, { fill: '#fffdf6', fillStyle: 'solid', width: 4, seed: 11 }); k.text('GIẤY ĐẶT CỌC', 0, -90, { size: 42, font: 'title', color: '#1b1b24' }); k.text('3 SÀO RUỘNG', 0, -20, { size: 46, font: 'title', color: '#d63a2f' }); k.text('Bên bán: Ông Tư', 0, 60, { size: 30, color: '#4a4f57' }); });
        } else {
          vanInside(k);
          for (let i = 0; i < 7; i++) if (i !== 3) k.char(170 + i * 265, 900, S * 0.78, { ...HO(['#3d7fc1', '#6bb56b', '#8a8f98', '#e8b84a', '#8a6a4f', '#5a5f66', '#e9e4dc'][i], { hair: ['buzz', 'short', 'spiky', 'short', 'bald', 'buzz', 'short'][i] }), face: 'blank', pose: 'hold', shadow: false });
          k.char(965, 900, S * 0.82, { ...KHAI, face: k.t > k.cue('why') ? 'sad' : 'blank', pose: 'hold', shadow: false });
          cap(k, 'CHÍNH BẠN GỌI HỌ TỚI', 'why', { color: '#f2c230' });
        }
      },
    },
    {
      say: 'Chuyện gì đã xảy ra sau cánh cửa ấy? {p2}Đây là phần hai, phần cuối. {p1}Chưa xem phần một thì link ở mô tả nhé. {sub}Và nhớ bấm đăng ký.',
      sfx: [['pop', 'p2', 0.4], ['pop', 'p1', 0.4], ['pop', 'sub', 0.4]],
      draw(k) {
        hotelFront(k, { lit4: true });
        k.text('PHẦN 2: SAU CÁNH CỬA', 960, 960, { size: 64, font: 'title', color: '#ff6b5a', fx: 'pop', p: k.at('p2', 0.4), outline: '#1b1b24', outlineWidth: 12 });
        k.char(330, G, S * 0.8, { ...KHAI, face: 'think', pose: 'point', p: pop(k, 0.2) });
      },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Bên trong tầng bốn',
      say: 'Bạn đẩy cửa. {in}Phòng bốn trăm linh bốn không còn cái giường nào. Chỉ có bàn dài, mỗi bàn năm người, sau lưng là một tổ trưởng cầm thước. {phones}Trước mặt mỗi người, sáu cái điện thoại. {ignore}Không ai nhìn bạn. Họ nhìn túi bánh mì. {joke}Hoá ra người ta cấm bạn lên, không phải sợ bạn thấy. Mà sợ bạn làm mất thời gian.',
      sfx: [['scratch', 0.2, 0.3], ['click', 'in', 0.3], ['click', ['in', 0.2], 0.3], ['pop', 'phones', 0.4], ['boing', 'joke', 0.4]],
      draw(k) {
        scamRoom(k);
        chapTop(k, '1 · Bên trong tầng bốn');
        log(k);
        for (let i = 0; i < 4; i++) k.char(420 + i * 300, 760, S * 0.62, { ...HO(['#5a5f66', '#3d7fc1', '#8a8f98', '#6b8e5a'][i], { hair: ['buzz', 'short', 'spiky', 'short'][i] }), face: k.t > k.cue('ignore') ? 'blank' : 'calm', look: k.t > k.cue('ignore') ? -1 : 0, pose: { l: [60, -40], r: [60, -40] }, shadow: false });
        k.char(1660, G, S * 0.95, { ...TOTRUONG, face: 'cold', pose: 'hips', p: pop(k, 'in') });
        if (k.t > k.cue('phones')) for (let i = 0; i < 6; i++) { const { ctx } = k; ctx.fillStyle = '#1b1b24'; ctx.fillRect(330 + i * 30, 610 - (i % 2) * 6, 22, 38); ctx.fillStyle = '#5fc3e4'; ctx.fillRect(333 + i * 30, 614 - (i % 2) * 6, 16, 28); }
        k.char(220, G + 60, S * 1.05, { ...KHAI, face: k.t > k.cue('joke') ? 'blank' : 'shock', pose: 'hold', shadow: false });
        breadBag(k, 300, G - 80, 1);
        cap(k, 'SỢ BẠN LÀM MẤT THỜI GIAN', 'joke', { color: '#f2c230' });
      },
    },
    {
      say: 'Trên bàn có hai tập kịch bản dày cộp. {b1}Một tập ghi: Doanh nhân thành đạt. {b2}Một tập ghi: Gái xinh đầu tư. {roles}Mỗi người đóng hai, ba vai một ngày. Sáng là Linda, Singapore. Chiều là anh Kevin, kỹ sư dầu khí. Tối là bà góa giàu ở Úc. {beard}Một gã râu quai nón, một ngày làm ba người phụ nữ. Năng suất hơn cả nhà máy may.',
      sfx: [['pop', 'b1', 0.4], ['pop', 'b2', 0.4], ['ding', 'roles', 0.3], ['ding', ['roles', 1.5], 0.3], ['ding', ['roles', 3.5], 0.3], ['boing', 'beard', 0.5]],
      draw(k) {
        paper(k, '#2b2f36');
        log(k);
        [['DOANH NHÂN', 'THÀNH ĐẠT', '#2e6da4', 'b1'], ['GÁI XINH', 'ĐẦU TƯ', '#c0397a', 'b2']].forEach(([a, b, c, cue], i) => {
          const p = k.at(cue, 0.5, 'back'); if (p <= 0) return;
          k.group({ x: 820 + i * 380, y: 420, s: p, r: -0.05 + i * 0.1 }, () => { k.rect(-160, -200, 320, 400, { fill: c, fillStyle: 'solid', width: 5, seed: 20 + i }); k.text('KỊCH BẢN', 0, -130, { size: 30, font: 'title', color: '#fff' }); k.text(a, 0, -40, { size: 44, font: 'title', color: '#fff' }); k.text(b, 0, 20, { size: 44, font: 'title', color: '#f2c230' }); k.text('Tập 3/12', 0, 140, { size: 26, color: '#fff' }); });
        });
        const roles = [['☀ LINDA 🇸🇬', 'roles', 0], ['🌤 KEVIN, KỸ SƯ DẦU KHÍ', 'roles', 1.5], ['🌙 BÀ GÓA GIÀU Ở ÚC', 'roles', 3.5]];
        roles.forEach(([t, c, d], i) => k.text(t, 1000, 720 + i * 80, { size: 46, font: 'title', color: '#fff', fx: 'pop', p: k.at(k.cue(c, d), 0.4), outline: '#1b1b24', outlineWidth: 10 }));
        k.char(300, 1200, S * 1.4, { ...RAU, face: k.t > k.cue('beard') ? 'smug' : 'calm', pose: 'present', shadow: false });
        cap(k, '1 NGƯỜI = 3 CÔ GÁI', 'beard', { color: '#ff8a7a' });
      },
    },
    {
      say: 'Trên tường là bảng chỉ tiêu. {n50}Mỗi người: năm mươi nạn nhân một ngày. {pay}Lương bảy trăm đô, chuyên cần thêm hai trăm. {fine}Không đạt chỉ tiêu, bị phạt từ bốn trăm tới một nghìn đô. {joke}Tức là ở đây, lừa không đủ người, thì phải trả tiền cho chính người đã lừa mình sang đây.',
      sfx: [['pop', 'n50', 0.4], ['cash', 'pay', 0.4], ['bonk', 'fine', 0.6], ['boing', 'joke', 0.4]],
      draw(k) {
        paper(k, '#3a4048');
        log(k);
        k.group({ x: 1100, y: 520, r: -0.02 }, () => {
          k.rect(-560, -420, 1120, 840, { fill: '#f4efe6', fillStyle: 'solid', width: 5, seed: 31 });
          k.text('NỘI QUY · CHỈ TIÊU', 0, -350, { size: 56, font: 'title', color: '#1b1b24' });
          k.text('🎯 50 người / ngày', -480, -220, { size: 52, font: 'title', color: '#2e6da4', align: 'left', fx: 'pop', p: k.at('n50', 0.4) });
          k.text('💵 Lương 700 $', -480, -100, { size: 52, font: 'title', color: '#2b7a3a', align: 'left', fx: 'pop', p: k.at('pay', 0.4) });
          k.text('⭐ Chuyên cần +200 $', -480, 0, { size: 52, font: 'title', color: '#2b7a3a', align: 'left', fx: 'pop', p: k.at(k.cue('pay', 1.5), 0.4) });
          k.text('❌ Không đạt: PHẠT 400–1.000 $', -480, 130, { size: 52, font: 'title', color: '#d63a2f', align: 'left', fx: 'pop', p: k.at('fine', 0.4) });
          for (let i = 0; i < 5; i++) { const { ctx } = k; ctx.fillStyle = ['#3d7fc1', '#3d7fc1', '#3d7fc1', '#e8b84a', '#d63a2f'][i]; ctx.fillRect(-480, 240 + i * 30, [800, 700, 560, 300, 80][i] * k.at('n50', 1), 20); }
        });
        k.char(260, 1150, S * 1.3, { ...CHANTRAN, face: k.t > k.cue('fine') ? 'cry' : 'sad', tears: k.at('fine', 1) * 0.6, pose: 'hold', shadow: false });
        cap(k, 'LỪA KHÔNG ĐỦ → BỊ PHẠT', 'joke', { y: 1030, color: '#f2c230' });
      },
    },
    {
      say: 'Đúng lúc đó, một màn hình nháy xanh: {dep}Đã nạp: mười triệu. {clap}Cả phòng đứng dậy vỗ tay. Tổ trưởng gõ chuông. {know}À. Ra đây là tràng vỗ tay bạn nghe mỗi đêm. {ten}Rồi bạn nhìn lại con số. Mười triệu. Đúng con số bố bạn khoe tối hôm trước.',
      sfx: [['ding', 'dep', 0.6], ['tada', 'clap', 0.5], ['ding', ['clap', 0.8], 0.6], ['scratch', 'ten', 0.4]],
      draw(k) {
        scamRoom(k);
        log(k, { bo: [0, 10, 'ten', 0.8] });
        const clap = k.t > k.cue('clap') && k.t < k.cue('ten');
        for (let i = 0; i < 4; i++) k.char(420 + i * 300, clap ? 700 : 760, S * 0.62, { ...HO(['#5a5f66', '#3d7fc1', '#8a8f98', '#6b8e5a'][i], { hair: ['buzz', 'short', 'spiky', 'short'][i] }), face: clap ? 'laugh' : 'calm', pose: clap ? 'cheer' : { l: [60, -40], r: [60, -40] }, shadow: false });
        monitor(k, 960, 300, 420, 200, (kk, w, h) => { kk.ctx.fillStyle = '#1f7a4a'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.text('✅ ĐÃ NẠP', 0, -40, { size: 40, font: 'title', color: '#fff' }); kk.text('10.000.000đ', 0, 30, { size: 54, font: 'title', color: '#f2c230' }); }, k.at('dep', 0.4));
        if (clap) k.burst(1620, 240, 110, '👏👏', { p: k.at('clap', 0.3) });
        k.char(240, G + 60, S * 1.05, { ...KHAI, face: k.t > k.cue('ten') ? 'shock' : 'think', pose: 'hold', shadow: false, gloom: k.at('ten', 1) * 0.5 });
        if (k.t > k.cue('ten')) k.focusLines(960, 300, { p: k.at('ten', 0.4), r: 240 });
        cap(k, '10 TRIỆU = TIỀN CỦA BỐ?', 'ten', { color: '#ff6b5a' });
      },
    },
    {
      say: 'Phòng bên cạnh, bốn trăm linh bảy, còn ồn hơn. {live}Một gã mặc áo cầu thủ, đứng trước màn hình bóng đá, livestream bằng tiếng nước ngoài, hô kèo như bán hàng chợ đêm. {bet}Người xem ở tận đâu đâu đặt cược ầm ầm. {joke}Hoá ra những tiếng hét lúc ba giờ sáng, không phải chốt đơn. Là chốt kèo.',
      sfx: [['whoosh', 0.2, 0.3], ['boing', 'live', 0.4], ['cash', 'bet', 0.4], ['cash', ['bet', 0.3], 0.4], ['boom', 'joke', 0.4]],
      draw(k) {
        scamRoom(k);
        tint(k, '#5a1a1a', 0.25);
        log(k, { bo: 10 });
        monitor(k, 1240, 420, 760, 440, (kk, w, h) => { const { ctx } = kk; ctx.fillStyle = '#2e8a3e'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.strokeRect(-w / 2 + 20, -h / 2 + 20, w - 40, h - 40); ctx.beginPath(); ctx.moveTo(0, -h / 2 + 20); ctx.lineTo(0, h / 2 - 20); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 60, 0, Math.PI * 2); ctx.stroke(); kk.dot(Math.sin(kk.t * 2) * 200, Math.cos(kk.t * 1.5) * 100, 14, '#fff'); ctx.fillStyle = '#d63a2f'; ctx.fillRect(-w / 2 + 10, -h / 2 + 10, 90, 36); kk.text('LIVE', -w / 2 + 55, -h / 2 + 28, { size: 24, font: 'title', color: '#fff' }); });
        k.char(560, G, S * 1.05, { ...HO('#d63a2f', { hair: 'spiky', hairColor: '#f2c230' }), face: 'shout', pose: k.t % 1 < 0.5 ? 'shout' : 'cheer', talk: k.t > k.cue('live') ? k.talk() || 0.6 : 0 });
        if (k.t > k.cue('bet')) for (let i = 0; i < 8; i++) { const u = ((k.t - k.cue('bet')) * 0.7 + i / 8) % 1; k.text(['¥ 500', '¥ 2.000', '🔥 x3', '¥ 800'][i % 4], 900 + (i % 4) * 160, 700 - u * 400, { size: 34, font: 'title', color: '#f2c230', outline: '#1b1b24', outlineWidth: 6 }); }
        cap(k, 'CHỐT ĐƠN → CHỐT KÈO', 'joke', { color: '#f2c230' });
      },
    },
    {
      say: 'Ở góc phòng, có một tấm rèm hoa hướng dương. {light}Trước rèm, đèn vòng sáng trưng, một cô gái váy trắng, tóc dài, đang gọi video. {read}Cô đọc thoại từ một tờ giấy dán cạnh camera: Anh ơi, em nhớ anh. {real}Linda có thật. Chỉ là Linda thuê theo giờ. {pay}Còn người trả tiền thuê, là những ông bố như bố bạn.',
      sfx: [['sparkle', 'light', 0.5], ['ding', 'read', 0.3], ['boom', 'real', 0.5], ['slideDown', 'pay', 0.4]],
      draw(k) {
        scamRoom(k);
        log(k, { bo: 10 });
        ringCorner(k, 1180, G - 20, 1.05);
        k.char(1180, G, S * 1.05, { ...LINDA, face: k.t > k.cue('pay') ? 'blank' : 'happy', pose: 'wave', talk: spk(k, 'read', 'real'), p: pop(k, 'light') });
        k.group({ x: 1560, y: 420, r: 0.05, s: k.at('read', 0.4, 'back') }, () => { k.rect(-150, -110, 300, 220, { fill: '#fffdf6', fillStyle: 'solid', width: 3, seed: 41 }); k.text('Anh ơi,', 0, -50, { size: 34, color: '#1b1b24' }); k.text('em nhớ anh ❤️', 0, 10, { size: 34, color: '#1b1b24' }); k.text('(cười)', 0, 64, { size: 28, color: '#8a8f98' }); });
        k.char(420, G + 40, S * 1.05, { ...KHAI, face: k.t > k.cue('real') ? 'shock' : 'calm', pose: 'hold', shadow: false });
        cap(k, 'LINDA THUÊ THEO GIỜ', 'real', { color: '#ff8a7a' });
      },
    },
    {
      say: 'Rồi bạn nhìn màn hình của gã râu quai nón. {ava}Ảnh đại diện: bố bạn, tóc nhuộm đen nhánh, cười hết cỡ. {m1}Linda viết: Anh nạp thêm năm mươi triệu gói VIP, rồi em mua vé sang Việt Nam thăm anh. {m2}Bố trả lời: Để anh bán ruộng. {quiet}Bạn đứng im. Túi bánh mì trên tay, tự nhiên nặng như một bao xi măng.',
      sfx: [['ding', 'ava', 0.5], ['ding', 'm1', 0.4], ['ding', 'm2', 0.5], ['boom', 'quiet', 0.4]],
      draw(k) {
        paper(k, '#14161d');
        log(k, { bo: 10 });
        monitor(k, 1060, 470, 980, 640, (kk, w, h) => {
          loveChat('Linda ❤️ Tư Xe Đạp', [{ text: 'Anh nạp thêm 50 triệu gói VIP 💎', cue: 'm1' }, { text: 'Rồi em mua vé sang VN thăm anh ✈️', cue: ['m1', 1.5] }, { text: 'Để anh bán ruộng.', me: true, cue: 'm2' }], { size: 34, msgSize: 38 })(kk, w, h);
          if (kk.t > kk.cue('ava')) TU_AVATAR(kk, -w / 2 + 50, -h / 2 + 35, 26);
        });
        k.char(260, 1200, S * 1.4, { ...KHAI, face: k.t > k.cue('quiet') ? 'cry' : 'shock', tears: k.at('quiet', 1.5) * 0.7, pose: 'hold', shadow: false, gloom: k.at('quiet', 1) * 0.6 });
        breadBag(k, 380, 1000, 1.2);
        cap(k, '"ĐỂ ANH BÁN RUỘNG."', 'm2', { color: '#fff', y: 1010, x: 1060 });
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Ai là người mua SIM?',
      say: 'Trên bàn gã râu, cạnh bàn phím, có một vỏ SIM vàng. {mark}Góc vỏ có dòng số viết tay bằng bút đỏ. Chữ của bạn. {lot}Lô hai trăm cái tuần trước, mỗi cái bạn ăn chênh hai mươi nghìn. {sum}Vậy là tài khoản Linda đang tán tỉnh bố bạn, chạy bằng một cái SIM do chính tay bạn mua.',
      sfx: [['pop', 0.3, 0.4], ['scratch', 'mark', 0.4], ['cash', 'lot', 0.4], ['boom', 'sum', 0.6]],
      draw(k) {
        paper(k, '#3a3f48');
        chapTop(k, '2 · Ai là người mua SIM?');
        log(k, { bo: 10 });
        k.group({ x: 1000, y: 520, s: 1 + 0.15 * k.at('mark', 1.5, 'inOut'), r: -0.05 }, () => {
          const { ctx } = k; ctx.fillStyle = '#f2c230'; ctx.beginPath(); ctx.roundRect(-300, -190, 600, 380, 20); ctx.fill(); ctx.strokeStyle = '#8a6a14'; ctx.lineWidth = 6; ctx.stroke();
          ctx.fillStyle = '#c9a21a'; ctx.fillRect(-90, -60, 180, 130); k.text('SIM 4G', 140, -130, { size: 40, font: 'title', color: '#1b1b24' });
          k.text('Lô 7 · K', -160, 130, { size: 46, font: 'title', color: '#d63a2f', fx: 'write', p: k.at('mark', 0.8) });
        });
        if (k.t > k.cue('mark')) k.circle(840, 650, 130, { stroke: '#ff2a2a', width: 10, p: k.at('mark', 0.6), seed: 51 });
        k.char(300, 1200, S * 1.4, { ...KHAI, face: k.t > k.cue('sum') ? 'cry' : 'shock', tears: k.at('sum', 1) * 0.6, pose: 'hold', shadow: false });
        cap(k, 'SIM CỦA LINDA = SIM BẠN MUA', 'sum', { color: '#ff6b5a' });
      },
    },
    {
      say: 'Túi bánh mì rơi xuống sàn. {ly}Sau lưng bạn, giọng anh Lý: {l1}Em lên đây làm gì?{e1} {point}Bạn chỉ màn hình: {l2}Bố em.{e2} {smile}Anh Lý nhìn, rồi cười. {l3}À. Người nhà mà. Để anh bảo nó cho bố em rút tiền.{e3}',
      sfx: [['bonk', 0.2, 0.5], ['scratch', 'ly', 0.4], ['boom', 'l2', 0.4], ['sparkle', 'l3', 0.4]],
      draw(k) {
        scamRoom(k);
        log(k, { bo: 10 });
        k.char(1180, G, S * 1.05, { ...RAU, face: 'blank', pose: { l: [60, -40], r: [60, -40] }, look: -1 });
        k.char(560, G + 20, S, { ...KHAI, face: k.t > k.cue('l3') ? 'think' : 'shock', pose: k.t > k.cue('point') ? 'point' : 'shrug', talk: spk(k, 'l2', 'e2'), sweat: true });
        breadBag(k, 700, G + 20, 1);
        k.char(k.lerp(200, 280, k.at('ly', 0.5)), G + 20, S * 1.05, { ...LY, face: k.t > k.cue('smile') ? 'smug' : 'cold', pose: k.t > k.cue('l3') ? 'present' : 'hips', talk: spk(k, 'l1', 'e1') || spk(k, 'l3', 'e3'), p: pop(k, 'ly') });
        k.bubble(560, 160, 520, 120, 320, 420, { p: k.at('l3', 0.4), text: 'Người nhà mà! Cho rút.', size: 40 });
      },
    },
    {
      say: 'Hôm sau bố gọi, sướng phát điên. {l1}Rút được năm triệu thật! Linda nói thật!{e1} {relief}Bạn thở phào. {bonus}Anh Lý gửi bạn hai nghìn đô, gọi là thưởng quản lý. {three}Ba ngày sau, bố nạp thêm năm mươi triệu. {why}Vì rút được, thì là thật. Năm triệu là mồi. Năm mươi triệu là cá. Còn bạn, là người cầm cần.',
      sfx: [['ding', 0.2, 0.4], ['tada', 'l1', 0.4], ['cash', 'bonus', 0.5], ['slideDown', 'three', 0.5], ['bonk', 'why', 0.4]],
      draw(k) {
        paper(k, '#1f2430');
        log(k, { tip: [8000, 10000, 'bonus', 1], bo: [10, 60, 'three', 1.2] });
        const { ctx } = k;
        ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(760, 120, 1060, 700, 24); ctx.fill();
        ctx.save(); ctx.beginPath(); ctx.rect(780, 140, 1020, 660); ctx.clip();
        k.group({ x: 780 - 200 * 0.6, y: 140 - 100 * 0.6, s: 0.72 }, () => bikeRepair(k));
        k.char(1100, 900, S * 1.1, { ...TU, face: 'laugh', pose: 'cheer', talk: spk(k, 'l1', 'e1'), flush: 0.5 });
        phone(k, 1560, 470, 0.85, { r: 0.08, screen: forexApp({ bal: k.t > k.cue('three') ? '58.000.000đ' : '8.000.000đ', gain: k.t > k.cue('l1') ? '✅ Rút 5.000.000đ' : '+30% / 3 ngày' }) });
        ctx.restore();
        k.char(330, G + 20, S, { ...KHAI, face: k.t > k.cue('why') ? 'blank' : 'happy', pose: 'hold' });
        if (k.t > k.cue('bonus')) dollar(k, 460, 640, 0.5, -0.2, k.at('bonus', 0.4));
        cap(k, k.t > k.cue('why') ? 'MỒI 5 · CÁ 50 · BẠN CẦM CẦN' : 'RÚT ĐƯỢC 5 TRIỆU!', k.t > k.cue('why') ? 'why' : 'l1', { color: k.t > k.cue('why') ? '#ff8a7a' : '#7fe0a8', y: 1000, x: 1290, size: 50 });
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      chapter: 'Con kiến đi cản củ khoai',
      say: 'Bạn bắt xe khách đêm về quê. {shop}Sáu giờ sáng, bố đang ngồi trước tiệm xe đạp, điện thoại dựng trên giá, gọi video với Linda. {grab}Bạn giật lấy điện thoại. {l1}Bố! Linda là một thằng râu quai nón!{e1}',
      sfx: [['whoosh', 0.2, 0.4], ['ding', 'shop', 0.3], ['whoosh', 'grab', 0.6], ['boom', 'l1', 0.5]],
      draw(k) {
        if (k.t < k.cue('shop')) { coachNight(k); chapTop(k, '3 · Con kiến đi cản củ khoai'); }
        else {
          bikeRepair(k, { dawn: true });
          k.char(860, G, S, { ...TU, face: k.t > k.cue('grab') ? 'shock' : 'happy', pose: k.t > k.cue('grab') ? 'shrug' : 'hold' });
          const grabbed = k.t > k.cue('grab');
          phone(k, grabbed ? 1250 : 1000, grabbed ? 420 : 560, 0.6, { r: grabbed ? -0.2 : 0.05, screen: (kk, w, h) => { kk.ctx.fillStyle = '#e9e4dc'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.char(0, h / 2, h * 0.75, { ...LINDA, face: 'happy', pose: 'wave', shadow: false }); } });
          if (grabbed) k.char(1350, G, S * 1.05, { ...KHAI, face: 'shout', vein: true, pose: { l: [22, -62], r: [150, -60] }, talk: spk(k, 'l1', 'e1'), p: pop(k, 'grab') });
        }
      },
    },
    {
      say: 'Bố không tin. {show}Bố giơ ra một tin nhắn Linda gửi từ tuần trước: Con trai anh sẽ ghen tị với tình yêu của chúng ta. Anh đừng nghe nó. {step}Bạn nhận ra câu này. Bước chín, trong tập kịch bản. {joke}Bị lừa đã đành. Đằng này, kẻ lừa còn soạn sẵn cả một trang, dành riêng để xử lý bạn.',
      sfx: [['ding', 'show', 0.4], ['scratch', 'step', 0.5], ['boing', 'joke', 0.4]],
      draw(k) {
        bikeRepair(k, { dawn: true });
        k.char(560, G, S, { ...TU, face: 'smug', pose: 'present' });
        phone(k, 820, 520, 0.85, { p: k.at('show', 0.4), r: -0.06, screen: loveChat('Linda ❤️', [{ text: 'Con trai anh sẽ ghen tị với tình yêu của chúng ta 😢' }, { text: 'Anh đừng nghe nó nhé' }], { msgSize: 22 }) });
        k.char(1400, G, S * 1.05, { ...KHAI, face: k.t > k.cue('step') ? 'shock' : 'angry', pose: k.t > k.cue('step') ? 'facepalm' : 'hips' });
        if (k.t > k.cue('step')) k.group({ x: 1300, y: 260, s: k.at('step', 0.4, 'back'), r: 0.04 }, () => { k.rect(-260, -90, 520, 180, { fill: '#fffdf6', fillStyle: 'solid', width: 4, seed: 61 }); k.text('Buoc 9: Con cái phản đối →', 0, -30, { size: 30, color: '#1b1b24' }); k.text('"nó ghen tị với tình yêu"', 0, 30, { size: 32, font: 'title', color: '#d63a2f' }); });
        cap(k, 'CÓ CẢ KỊCH BẢN XỬ LÝ BẠN', 'joke', { color: '#f2c230' });
      },
    },
    {
      say: 'Bố giật lại điện thoại. {l1}Mày làm lễ tân, thì biết gì về tài chính quốc tế?{e1} {sleep}Tối đó bố đi ngủ sớm. Trước khi ngủ, còn nhắn: Ngủ ngon em. {bank}Mười giờ đêm, điện thoại bạn rung. Tin nhắn từ bác hàng xóm: Bố mày vừa nhận cọc bán ruộng của tao đấy.',
      sfx: [['bonk', 'l1', 0.4], ['ding', 'sleep', 0.3], ['ding', 'bank', 0.6], ['boom', ['bank', 2.5], 0.5]],
      draw(k) {
        bikeRepair(k, { night: true });
        if (k.t < k.cue('sleep')) k.char(700, G, S, { ...TU, face: 'angry', vein: true, pose: 'point', talk: spk(k, 'l1', 'e1') });
        k.char(1250, G, S, { ...KHAI, face: k.t > k.cue('bank') ? 'shock' : 'sad', pose: 'hold', gloom: k.at('sleep', 1) * 0.5 });
        if (k.t > k.cue('sleep') && k.t < k.cue('bank')) k.bubble(320, 260, 480, 120, 640, 560, { p: k.at('sleep', 0.4), text: 'Ngủ ngon em 😘', size: 40 });
        phone(k, 1500, 480, 0.7, { p: k.at('bank', 0.4), r: 0.06, ring: k.t > k.cue('bank') && k.t < k.cue('bank', 1), screen: loveChat('Bác Hai hàng xóm', [{ text: 'Bố mày vừa nhận cọc bán ruộng của tao đấy 🌾' }], { msgSize: 24 }) });
        tag(k, '10:00 TỐI', 'bank');
      },
    },
    {
      say: 'Bạn ngồi ngoài hiên, làm một phép tính. {a}Báo công an: mất việc, mất nhẫn cưới, và chữ ký của bạn trên tờ khai báo lưu trú, có khi kéo cả bạn đi theo. {b}Im lặng: bố mất ba sào ruộng, mất luôn cả cái tình yêu duy nhất ông có từ ngày mẹ mất. {thao}Điện thoại rung. Thảo nhắn: Bố em hỏi bao giờ cưới.',
      sfx: [['click', 'a', 0.4], ['click', 'b', 0.4], ['ding', 'thao', 0.5]],
      draw(k) {
        paper(k, '#1b1f2a');
        k.char(960, 1150, S * 1.2, { ...KHAI, face: 'sad', pose: 'think', shadow: false, gloom: 0.4 });
        const card = (x, title, lines, c, cue) => { const p = k.at(cue, 0.5, 'back'); if (p <= 0) return; k.group({ x, y: 400, s: p }, () => { k.rect(-330, -260, 660, 520, { fill: '#fffdf6', fillStyle: 'solid', width: 5, seed: x }); k.text(title, 0, -200, { size: 46, font: 'title', color: c }); lines.forEach((t, i) => k.text(t, 0, -110 + i * 75, { size: 36, color: '#1b1b24' })); }); };
        card(450, '📞 BÁO CÔNG AN', ['− Mất việc', '− Mất nhẫn cưới', '− Chữ ký → ĐIỀU 348?'], '#2e6da4', 'a');
        card(1470, '🤐 IM LẶNG', ['− Bố mất 3 sào ruộng', '− Bố mất "Linda"', '+ Giữ tiền cưới'], '#d63a2f', 'b');
        phone(k, 1560, 800, 0.5, { p: k.at('thao', 0.4), ring: k.t > k.cue('thao') && k.t < k.cue('thao', 1), screen: loveChat('Thảo 💅', [{ text: 'Bố em hỏi bao giờ cưới 💍' }], { msgSize: 22 }) });
      },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Bạn chọn',
      say: 'Đêm hôm sau, hai giờ sáng. {up}Bạn lại mang bánh mì lên tầng bốn, như mọi đêm. {rec}Chỉ khác một điều: trong túi áo vest, có một cái điện thoại, camera thò ra đúng chỗ cái nơ. {joke}Lần đầu tiên, cái nơ có việc để làm.',
      sfx: [['drumroll', 0.2, 0.3], ['ding', 'up', 0.3], ['click', 'rec', 0.5], ['boing', 'joke', 0.4]],
      draw(k) {
        corridor4(k);
        chapTop(k, '4 · Bạn chọn');
        tag(k, '2:00 SÁNG');
        log(k, { tip: 10000, bo: 60 });
        k.char(960, 1250, S * 1.6, { ...KHAI, face: k.t > k.cue('joke') ? 'smug' : 'blank', pose: 'hold', shadow: false, sweat: true });
        breadBag(k, 1150, 1050, 1.4);
        if (k.t > k.cue('rec')) { const { ctx } = k; const on = Math.floor(k.t * 2) % 2; ctx.fillStyle = on ? '#ff2a2a' : 'rgba(255,42,42,0.3)'; ctx.beginPath(); ctx.arc(1000, 990, 16, 0, Math.PI * 2); ctx.fill(); k.text('● REC', 1120, 990, { size: 40, font: 'title', color: '#ff2a2a' }); k.circle(965, 990, 70, { stroke: '#ff2a2a', width: 6, p: k.at('rec', 0.5), seed: 71 }); }
      },
    },
    {
      say: 'Cậu chân trần nhận ra bạn. {safe}Cậu hất cằm về phía cái két sắt: hộ chiếu của cả phòng ở trong đó. {usdt}Rồi chỉ màn hình cuối ngày: tiền được đổi sang USDT, chuyển về ví ông chủ, trừ ba phần trăm phí. {l1}Me. Seven hundred dollar. Never pay. Always fine.{e1} {sub}Bảy trăm đô. Chưa nhận đồng nào. Vì tháng nào cũng bị phạt.',
      sfx: [['pop', 'safe', 0.4], ['cash', 'usdt', 0.4], ['scratch', 'l1', 0.3], ['slideDown', 'sub', 0.4]],
      draw(k) {
        scamRoom(k);
        log(k, { tip: 10000, bo: 60 });
        safe(k, 1640, G, 1.1, {});
        if (k.t > k.cue('safe')) k.text('🛂 ×113', 1640, 520, { size: 56, font: 'title', color: '#fff', fx: 'pop', p: k.at('safe', 0.4), outline: '#1b1b24', outlineWidth: 10 });
        monitor(k, 1000, 330, 520, 300, (kk, w, h) => { kk.ctx.fillStyle = '#0e1a2a'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.text('CUỐI NGÀY', 0, -100, { size: 30, font: 'title', color: '#c9ced4' }); kk.text('→ USDT 💱', 0, -30, { size: 44, font: 'title', color: '#7fe0a8' }); kk.text('Ví ông chủ · phí 3%', 0, 50, { size: 32, color: '#f2c230' }); }, k.at('usdt', 0.4));
        k.char(560, G, S, { ...CHANTRAN, face: k.t > k.cue('sub') ? 'cry' : 'sad', tears: k.at('sub', 1) * 0.8, pose: k.t > k.cue('safe') && k.t < k.cue('l1') ? 'point' : 'shrug', talk: spk(k, 'l1', 'e1') });
        k.char(230, G + 40, S * 1.05, { ...KHAI, face: 'sad', pose: 'hold', shadow: false });
        cap(k, '700 $ · CHƯA NHẬN ĐỒNG NÀO', 'sub', { color: '#ff8a7a' });
      },
    },
    {
      say: 'Tổ trưởng quay lại nhìn bạn. {beep}Đúng lúc ấy, điện thoại trong túi áo kêu: bíp. Pin yếu, hai mươi phần trăm. {cough}Bạn ho một tràng to như ông già hút thuốc lào, đánh rơi túi bánh mì, {run}rồi đi thật nhanh ra thang máy. Đi thôi, chứ không chạy. Chạy là lộ.',
      sfx: [['scratch', 0.2, 0.4], ['ding', 'beep', 0.8], ['bonk', 'cough', 0.4], ['bonk', ['cough', 0.3], 0.4], ['whoosh', 'run', 0.5]],
      draw(k) {
        scamRoom(k);
        log(k, { tip: 10000, bo: 60 });
        const sh = k.t > k.cue('beep') && k.t < k.cue('cough') ? Math.sin(k.t * 50) * 4 : 0;
        k.char(1400, G, S * 1.1, { ...TOTRUONG, face: k.t > k.cue('beep') ? 'angry' : 'cold', pose: 'hips', look: -1, vein: k.t > k.cue('beep') });
        k.char(k.lerp(560, -200, k.at('run', 2.5, 'in')) + sh, G + 20, S, { ...KHAI, face: k.t > k.cue('cough') ? 'shout' : k.t > k.cue('beep') ? 'shock' : 'blank', pose: k.t > k.cue('run') ? 'hold' : 'shrug', sweat: true, walk: k.t > k.cue('run'), flip: k.t > k.cue('run') });
        if (k.t > k.cue('beep')) k.burst(700, 300, 110, 'BÍP! 🔋20%', { p: k.at('beep', 0.3) });
        if (k.t > k.cue('cough') && k.t < k.cue('run', 1)) k.text('KHỤ KHỤ!', 560, 480, { size: 60, font: 'title', color: '#fff', fx: 'pop', p: k.at('cough', 0.3), outline: '#1b1b24', outlineWidth: 10 });
        if (k.t > k.cue('cough')) breadBag(k, 640, G + 20, 1);
        cap(k, 'ĐI, ĐỪNG CHẠY', 'run', { color: '#f2c230' });
      },
    },
    {
      say: 'Năm giờ sáng, bạn đứng ở công an phường, đúng cái phường bạn vẫn lên khai báo lưu trú. {watch}Cán bộ trực xem hết đoạn video, không nói gì. {drawer}Rồi anh mở ngăn kéo, rút ra một tập hồ sơ dày cộp. Ảnh khách sạn Hoàng Gia Quố Tế, chụp từ tháng Sáu. {l1}Bọn anh theo dõi lâu rồi. Video của em, được việc. Giờ về, làm như chưa có gì.{e1}',
      sfx: [['pop', 0.2, 0.4], ['click', 'watch', 0.4], ['scratch', 'drawer', 0.5], ['boom', ['drawer', 1.5], 0.5], ['ding', 'l1', 0.4]],
      draw(k) {
        policeHall(k);
        tag(k, '5:00 SÁNG');
        log(k, { tip: 10000, bo: 60 });
        k.char(1200, G, S * 1.05, { ...CA, face: k.t > k.cue('l1') ? 'smug' : 'calm', pose: k.t > k.cue('drawer') ? 'present' : 'hold', talk: spk(k, 'l1', 'e1') });
        k.char(560, G, S, { ...KHAI, face: k.t > k.cue('drawer') ? 'shock' : 'sad', pose: 'hold' });
        if (k.t > k.cue('drawer')) k.group({ x: 900, y: 420, s: k.at('drawer', 0.5, 'back'), r: -0.04 }, () => {
          k.rect(-240, -170, 480, 340, { fill: '#e8d9b8', fillStyle: 'solid', width: 5, seed: 81 }); k.text('HỒ SƠ · T6/2026', 0, -120, { size: 36, font: 'title', color: '#1b1b24' });
          k.group({ x: 0, y: 40, s: 0.32 }, () => { const { ctx } = k; ctx.save(); ctx.beginPath(); ctx.rect(-560, -360, 1120, 600); ctx.clip(); ctx.translate(-960, -560); hotelFront(k, { lit4: true }); ctx.restore(); });
        });
        cap(k, 'THEO DÕI TỪ THÁNG 6', k.cue('drawer', 1.5), { color: '#f2c230' });
      },
    },
    {
      say: 'Hai tuần sau, bốn giờ sáng. {lights}Hàng chục xe đỗ kín trước khách sạn, đèn xanh đỏ quét lên tầng bốn. {raid}Lực lượng ập vào. {beard}Gã râu quai nón bị dẫn ra, vẫn đeo tai nghe, miệng còn lẩm bẩm: em nhớ anh. {linda}Cô Linda váy trắng đi sau, tay che mặt. {count}Một trăm mười ba người nước ngoài, đi hết ba chuyến xe.',
      sfx: [['boom', 'lights', 0.5], ['whoosh', 'raid', 0.5], ['boom', ['raid', 0.4], 0.4], ['boing', 'beard', 0.4], ['pop', 'count', 0.4]],
      draw(k) {
        hotelFront(k, { lit4: true, vans: 1 });
        siren(k, k.at('lights', 0.5));
        tag(k, '4:00 SÁNG');
        if (k.t > k.cue('raid')) for (let i = 0; i < 3; i++) k.char(1500 + i * 120, G, S * 0.8, { ...POLICE, face: 'angry', pose: 'point', p: k.at(k.cue('raid', i * 0.15), 0.3) });
        if (k.t > k.cue('beard')) { const x = k.lerp(1000, 640, k.at('beard', 2)); k.char(x, G, S * 0.95, { ...RAU, face: 'happy', pose: 'hold', walk: true, talk: 0.4 + 0.3 * Math.sin(k.t * 8) }); k.char(x + 170, G, S * 0.85, { ...POLICE, face: 'cold', pose: 'hold', walk: true }); }
        if (k.t > k.cue('linda')) k.char(k.lerp(1200, 900, k.at('linda', 2)), G, S * 0.85, { ...LINDA, face: 'cry', pose: 'facepalm', walk: true });
        if (k.t > k.cue('beard') && k.t < k.cue('linda')) k.bubble(260, 180, 420, 110, 620, 520, { p: k.at('beard', 0.4), text: '…em nhớ anh…', size: 40 });
        k.text('113 NGƯỜI', 960, 100, { size: 80, font: 'title', color: '#fff', fx: 'pop', p: k.at('count', 0.4), outline: '#d63a2f', outlineWidth: 12 });
      },
    },
    {
      say: 'Còn bạn, {cuff}đứng ở quầy lễ tân, chìa tay ra trước khi ai kịp bảo. {why}Chữ ký trên tờ khai báo lưu trú, hai trăm cái SIM, mười hai cái máy tính. Không ai lừa bạn làm mấy việc đó. {van}Thế là bạn lên xe thùng, vẫn đeo nơ. {boy}Cậu chân trần ngồi cạnh, lần đầu tiên, cười với bạn.',
      sfx: [['bonk', 'cuff', 0.5], ['click', 'why', 0.3], ['slideDown', 'van', 0.4], ['sparkle', 'boy', 0.3]],
      draw(k) {
        if (k.t < k.cue('van')) {
          lobby(k);
          siren(k, 0.6);
          k.char(760, G - 40, S, { ...KHAI, face: 'sad', pose: { l: [60, -10], r: [60, -10] } });
          lobbyDesk(k);
          k.char(1250, G, S, { ...POLICE, face: 'calm', pose: 'hold', p: pop(k, 'cuff') });
          if (k.t > k.cue('why')) ['✍ CHỮ KÝ', '📵 200 SIM', '💻 12 MÁY TÍNH'].forEach((t, i) => k.text(t, 1550, 300 + i * 90, { size: 50, font: 'title', color: '#fff', fx: 'pop', p: k.at(k.cue('why', i * 0.8), 0.4), outline: '#1b1b24', outlineWidth: 10 }));
        } else {
          vanInside(k);
          k.char(760, 900, S * 0.85, { ...KHAI, face: 'sad', pose: 'hold', shadow: false });
          k.char(1160, 900, S * 0.8, { ...CHANTRAN, face: k.t > k.cue('boy') ? 'happy' : 'blank', pose: 'hold', shadow: false });
          cap(k, 'VẪN ĐEO NƠ', 'van', { color: '#ff8a7a' });
        }
      },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Ăn cơm chưa',
      say: 'Báo đăng: chín mươi tư bị can, trong đó bốn người Việt. Khoảng năm mươi tỷ đồng bị chiếm đoạt. {ring}Nhẫn cưới có hột của bạn, giờ nằm trong túi tang vật, có số thứ tự đàng hoàng. {call}Bố Thảo gọi đúng một cuộc. Lần này, ông không hỏi thăm cái ví nữa. {verdict}Ông hỏi thăm cái án.',
      sfx: [['pop', 0.2, 0.4], ['scratch', 'ring', 0.4], ['ding', 'call', 0.4], ['bonk', 'verdict', 0.5]],
      draw(k) {
        paper(k, '#f4efe6');
        chapTop(k, '5 · Ăn cơm chưa');
        k.group({ x: 560, y: 470, r: -0.03 }, () => { k.rect(-380, -330, 760, 660, { fill: '#fffdf6', fillStyle: 'solid', width: 4, seed: 91 }); k.text('BÁO PHÁP LUẬT', 0, -270, { size: 40, font: 'title', color: '#d63a2f' }); k.text('Triệt phá đường dây', 0, -180, { size: 40, font: 'title', color: '#1b1b24' }); k.text('113 người nước ngoài', 0, -120, { size: 40, font: 'title', color: '#1b1b24' }); k.text('94 bị can · 4 người Việt', 0, -20, { size: 44, font: 'title', color: '#2e6da4' }); k.text('~50 TỶ', 0, 90, { size: 90, font: 'title', color: '#d63a2f' }); });
        if (k.t > k.cue('ring')) k.group({ x: 1380, y: 400, s: pop(k, 'ring'), r: 0.06 }, () => { const { ctx } = k; ctx.fillStyle = 'rgba(200,220,240,0.6)'; ctx.strokeStyle = '#5a5f66'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-160, -180, 320, 360, 12); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#f2c230'; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(0, 10, 60, 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = '#d6f0ff'; ctx.beginPath(); ctx.moveTo(-26, -50); ctx.lineTo(26, -50); ctx.lineTo(0, -16); ctx.closePath(); ctx.fill(); k.text('TANG VẬT #037', 0, 140, { size: 30, font: 'title', color: '#d63a2f' }); });
        if (k.t > k.cue('call')) k.char(1500, 1200, S * 1.1, { ...BOTHAO, face: k.t > k.cue('verdict') ? 'smug' : 'cold', pose: 'hold', talk: k.t > k.cue('verdict') ? k.talk() : 0, shadow: false });
        cap(k, 'HỎI THĂM CÁI ÁN', 'verdict', { color: '#d63a2f', outline: '#fff' });
      },
    },
    {
      say: 'Ruộng thì giữ được, vì người mua chưa kịp chuyển nốt tiền. {lost}Nhưng bố mất sáu mươi triệu. Trong đó có hai mươi triệu, là tiền thưởng bạn cho. {math}Tiền bạn kiếm được nhờ cái khách sạn ấy, đã vòng một vòng, chui lại đúng vào cái khách sạn ấy. {joke}Đúng là tiền đi đâu, cũng nhớ đường về nhà.',
      sfx: [['ding', 0.2, 0.3], ['slideDown', 'lost', 0.5], ['whoosh', 'math', 0.4], ['boing', 'joke', 0.4]],
      draw(k) {
        paper(k, '#1f2430');
        log(k, { tip: 10000, bo: 60 });
        const { ctx } = k;
        const u = k.at('math', 3, 'inOut');
        ctx.strokeStyle = 'rgba(242,194,48,0.5)'; ctx.lineWidth = 8; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.ellipse(1060, 560, 500, 280, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
        k.text('🏨 KHÁCH SẠN', 1060, 260, { size: 44, font: 'title', color: '#fff' });
        k.text('🧑 KHẢI', 1580, 560, { size: 44, font: 'title', color: '#fff' });
        k.text('👴 BỐ', 1060, 860, { size: 44, font: 'title', color: '#fff' });
        k.text('📈 GOLDEN FX', 540, 560, { size: 44, font: 'title', color: '#fff' });
        if (u > 0) { const a = -Math.PI / 2 + u * Math.PI * 2; k.text('💸 20tr', 1060 + Math.cos(a) * 500, 560 + Math.sin(a) * 280, { size: 50, font: 'title', color: '#7fe0a8', outline: '#1b1b24', outlineWidth: 8 }); }
        counter(k, 1060, 560, 60, '', 'lost', 1, { fmt: (v) => `−${v} TRIỆU`, size: 80 });
        cap(k, 'TIỀN NHỚ ĐƯỜNG VỀ', 'joke', { color: '#f2c230' });
      },
    },
    {
      say: 'Bố lên thăm bạn. {hair}Ông không nhuộm tóc nữa, chân tóc trắng một nửa, râu cũng vậy. {l1}Bố biết Linda không có thật. Nhưng ba tháng ấy, ngày nào cũng có người hỏi bố ăn cơm chưa.{e1} {quiet}Bạn im rất lâu. {l2}Bố ăn cơm chưa?{e2} {smile}Bố cười.',
      sfx: [['scratch', 0.2, 0.3], ['ding', 'l2', 0.25]],
      draw(k) {
        visitRoom(k);
        const { ctx } = k;
        k.char(560, G, S * 1.05, { ...TU, hairColor: '#cfcfcf', beardColor: '#cfcfcf', face: k.t > k.cue('smile') ? 'happy' : 'sad', tears: k.t > k.cue('smile') ? 0.4 : 0, pose: 'hold', talk: spk(k, 'l1', 'e1') });
        k.char(1360, G, S, { ...KHAI, color: '#6b6f78', tie: null, face: k.t > k.cue('l2') ? 'sad' : 'blank', tears: k.at('quiet', 2) * 0.6, pose: 'hold', talk: spk(k, 'l2', 'e2') });
        if (k.t > k.cue('quiet')) tint(k, '#000', 0.15 * k.at('quiet', 1));
        if (k.t > k.cue('l2')) k.bubble(1180, 160, 460, 120, 1340, 400, { p: k.at('l2', 0.4), text: 'Bố ăn cơm chưa?', size: 44 });
      },
    },
    {
      say: 'Còn khách sạn, giờ dán giấy niêm phong. {fall}Biển hiệu rơi thêm mấy chữ, giờ chỉ còn đọc được: Quố Tế. {notice}Lần này thì có người để ý rồi. {all}Cả nước để ý.',
      sfx: [['scratch', 0.2, 0.3], ['bonk', 'fall', 0.5], ['bonk', ['fall', 0.3], 0.4], ['tada', 'all', 0.4]],
      draw(k) {
        hotelFront(k, { day: true, seal: true });
        for (let i = 0; i < 6; i++) k.char(300 + i * 240 + (i > 2 ? 520 : 0), G, S * 0.6, { ...HO(['#3d7fc1', '#f29bb8', '#6bb56b', '#8a8f98', '#e8b84a', '#8a6a4f'][i], { hair: ['short', 'bun', 'spiky', 'bald', 'perm', 'short'][i], body: [1, 4].includes(i) ? 'chibiGirl' : 'chibi' }), face: 'shock', pose: i % 2 ? 'point' : 'hold', look: i > 2 ? -1 : 1, p: k.at(k.cue('all', i * 0.1), 0.3) });
        cap(k, 'QUỐ TẾ… GIỜ AI CŨNG ĐỂ Ý', 'notice', { color: '#f2c230' });
      },
    },
    nextEpisodeScene({
      title: 'Nếu Bạn Là "Thầy" Giải Hạn Online…',
      hook: 'Livestream lúc nửa đêm, ba nghìn người xem, một "cái vong" và một mã QR chuyển khoản.',
      when: 'Câu chuyện tiếp theo',
      say: '{next}Câu chuyện tiếp theo: bạn là một "thầy" giải hạn online. Nửa đêm livestream, ba nghìn người xem, một cái vong, và một mã QR chuyển khoản.',
      art(k) {
        k.char(-200, 170, 380, { ...HO('#c0392b', { hair: 'bald', beard: true, beardColor: '#8a8a8a', belly: 0.8 }), face: 'smug', pose: 'present' });
        k.text('👻', 120, -60, { size: 140 });
        k.text('QR', 260, 60, { size: 90, font: 'title', color: '#1b1b24', outline: '#fff', outlineWidth: 10 });
      },
    }),
    subscribeScene({
      question: 'Khải là nạn nhân hay đồng phạm?',
      channel: 'Nếu Bạn Là',
      say: '{q}Theo bạn, Khải là nạn nhân, hay đồng phạm? Bình luận cho mình biết. {sub}Đăng ký và bật chuông, để không lỡ câu chuyện tiếp theo nhé.',
    }),
  ],
};
