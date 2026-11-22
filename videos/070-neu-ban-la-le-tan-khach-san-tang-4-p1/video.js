// Kênh Nếu Bạn Là — "Tầng 4", PHẦN 1/2: lúc tiền đến. Kịch bản: kich-ban.md (người dùng duyệt 09/11, + soát 16 concept).
// Truyện hư cấu; tên người, khách sạn, thị xã đều hư cấu. Thủ đoạn theo tin có thật:
// - Thanh Niên 04/11/2026 https://thanhnien.vn/bo-cong-an-thong-tin-ve-duong-day-toi-pham-xuyen-quoc-gia-tai-thanh-hoa-185261104124341427.htm
//   khách sạn ở Nghi Sơn (Thanh Hoá): 113 người nước ngoài, khởi tố 94 bị can (90 người nước ngoài + 4 người Việt); nhóm 4–5 người + tổ trưởng;
//   SIM không chính chủ lập tài khoản Line/QQ/WeChat/Facebook; giả doanh nhân thành đạt / phụ nữ trẻ đẹp đầu tư → yêu đương → sàn ngoại hối,
//   tiền ảo giả; cá cược bóng đá phát trên Douyin; ~50 tỷ; điều 290 + điều 348 (tổ chức cho người khác ở lại VN trái phép); điều tra 6–10/2026.
// - Dân trí 04/11/2026 https://dantri.com.vn/phap-luat/lat-tay-bi-mat-cua-nhom-nguoi-nuoc-ngoai-trong-can-biet-thu-khep-kin-20261104215525552.htm
//   12 máy tính, 87 điện thoại; giữ hộ chiếu; lương 700 USD, phạt 400–1.000 USD; ~50 người/ngày; thuê người nấu ăn, mua sắm; USDT.
import { nextEpisodeScene, subscribeScene } from '/engine/templates.js';
import * as thumbs from '/videos/070-neu-ban-la-le-tan-khach-san-tang-4-p1/thumbs.js';
import {
  G, GUARD, HO, spk, pop, tag, cap, tint, paper, phone, chat, cash, counter, chapTop, mam, living, goldshop, policeHall, gold,
  KHAI, THAO, BOTHAO, NGA, LY, MAN, SAU, TU, CHANTRAN, shiftLog, sunCurtain, hotelFront, lobby, lobbyDesk, lift, corridor4, vanInside,
  nailShop, bikeRepair, simShop, alley, washroom, beerTable, cashBag, dollar, box, forexApp,
} from '/channel/neu-ban-la.js';

const S = 520;
// Sổ giao ca: giá trị nền theo từng giai đoạn, ghi đè từng cảnh.
const LOG = {
  w1: { tip: 100, banh: 200, sim: 0, nuot: 0 },
  w2: { tip: 300, banh: 1800, sim: 600, nuot: 0 },
  w3: { tip: 400, banh: 3400, sim: 1200, nuot: 0 },
  m1: { tip: 900, banh: 6000, sim: 2200, nuot: 1 },
  m2: { tip: 8000, banh: 9800, sim: 3400, nuot: 2 },
};
const log = (k, base, o = {}) => shiftLog(k, { ...LOG[base], ...o });
// Túi bánh mì giấy (đạo cụ xách tay).
function breadBag(k, x, y, s = 1) {
  k.group({ x, y, s }, () => {
    const { ctx } = k;
    ctx.fillStyle = '#d9b27a'; ctx.strokeStyle = '#7a5a2a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-55, -90, 110, 120, 8); ctx.fill(); ctx.stroke();
    for (let i = 0; i < 3; i++) { ctx.fillStyle = '#c9862b'; ctx.beginPath(); ctx.ellipse(-28 + i * 28, -96, 14, 34, 0.2 * (i - 1), 0, Math.PI * 2); ctx.fill(); }
  });
}
// Ảnh "Linda": cô gái váy trắng cạnh cửa sổ, sau lưng là rèm hoa hướng dương.
function lindaPhoto(k, w, h) {
  const { ctx } = k;
  ctx.fillStyle = '#e9e4dc'; ctx.fillRect(-w / 2, -h / 2, w, h);
  sunCurtain(k, -w / 2, -h / 2, w * 0.42, h);
  ctx.fillStyle = '#9fc4e8'; ctx.fillRect(-w / 2 + w * 0.42, -h / 2 + 30, w * 0.4, h * 0.45);
  k.char(w * 0.12, h / 2 + 10, h * 0.78, { outfit: 'tunic', plain: true, body: 'chibiGirl', color: '#ffffff', hair: 'long', hairColor: '#1b1410', face: 'happy', pose: 'wave', shadow: false });
}

export default {
  meta: {
    title: 'Nếu Bạn Là Lễ Tân Khách Sạn… Tầng 4 (Phần 1)',
    description: `Một đêm, có người xách một túi du lịch đầy tiền mặt tới thuê trọn cả khách sạn ba tháng. Lương lễ tân tăng gấp ba. Điều kiện duy nhất: không ai được lên tầng 4.
Câu chuyện hư cấu dựa trên các vụ lò lừa đảo thuê trọn khách sạn, biệt thự ở Việt Nam được báo chí đưa tin tháng 11/2026: SIM không chính chủ, hàng trăm điện thoại, giữ hộ chiếu, và những "cô gái xinh đẹp giỏi đầu tư" chưa từng tồn tại.`,
    footer: `📚 Dựa trên tin Thanh Niên (04/11/2026) về đường dây 113 người nước ngoài thuê khách sạn ở Thanh Hoá lừa đảo khoảng 50 tỷ, và Dân trí (04/11/2026) về nhóm lừa đảo trong biệt thự ở Đà Nẵng. Tên người, khách sạn và tình tiết đã được hư cấu.
⚠️ Làm quen qua mạng rồi được rủ "đầu tư sàn ngoại hối, tiền ảo" = lừa đảo. Bán/cho thuê SIM, khai báo lưu trú hộ người lạ cũng có thể là phạm tội. Thấy dấu hiệu đáng ngờ: gọi 113.
🔔 Đăng ký Nếu Bạn Là để xem Phần 2: sau cánh cửa tầng 4.`,
    links: [['▶ Câu chuyện trước: Leader 7 Sao', '064-neu-ban-keo-ca-ho-vao-app-ai-p1'], ['🔔 Đăng ký', 'https://www.youtube.com/@neubanlaa?sub_confirmation=1']],
    tags: ['lừa đảo', 'lò lừa đảo', 'khách sạn', 'lễ tân', 'lừa tình qua mạng', 'sàn ngoại hối lừa đảo', 'nếu bạn là', 'hoạt hình'],
    hashtags: ['luadao', 'canhgiac', 'neubanla'],
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
      say: 'Hai giờ sáng. {bags}Bạn đứng trong thang máy, tay xách bốn mươi ổ bánh mì pate và ba thùng mì tôm. {btn}Ngón tay bạn đặt lên cái nút mà ba tháng nay bạn bị cấm bấm. {four}Nút số bốn.',
      sfx: [['drumroll', 0.1, 0.3], ['pop', 'bags', 0.4], ['click', 'btn', 0.5], ['boom', 'four', 0.5]],
      draw(k) {
        lift(k, { press: k.at('four', 0.4) * (0.6 + 0.4 * Math.sin(k.t * 8)) });
        tag(k, '2:00 SÁNG');
        k.char(760, G, S * 1.05, { ...KHAI, face: k.t > k.cue('four') ? 'shock' : 'blank', pose: k.t > k.cue('btn') ? { l: [22, -62], r: [70, -20] } : 'hold', sweat: k.t > k.cue('btn'), look: k.t > k.cue('btn') ? 1 : 0 });
        breadBag(k, 640, G - 140, pop(k, 'bags'));
        breadBag(k, 560, G - 40, 0.9 * pop(k, 'bags'));
        box(k, 920, G + 20, 160, 110, 'MÌ TÔM ×3', pop(k, 'bags'));
        if (k.t > k.cue('four')) k.focusLines(1510, 400, { p: k.at('four', 0.4), r: 120 });
        cap(k, 'NÚT SỐ 4', 'four', { color: '#ff6b5a', size: 80 });
      },
    },
    {
      say: 'Hai tuần sau, {van}bạn ngồi trên xe thùng của công an, chen giữa một trăm mười ba người nước ngoài. {four}Cả đoàn chỉ có bốn người Việt. {you}Và người duy nhất vẫn còn mặc đồng phục lễ tân, có thắt nơ, là bạn.',
      sfx: [['slideDown', 0.2, 0.4], ['boom', 'van', 0.5], ['pop', 'four', 0.4], ['bonk', 'you', 0.5]],
      draw(k) {
        vanInside(k);
        const cols = ['#3d7fc1', '#6bb56b', '#8a8f98', '#e8b84a', '#8a6a4f', '#3b3f46', '#e9e4dc'];
        for (let i = 0; i < 7; i++) if (i !== 3) k.char(170 + i * 265, 900, S * 0.78, { ...HO(cols[i], { hair: ['buzz', 'short', 'spiky', 'short', 'bald', 'buzz', 'short'][i] }), face: ['blank', 'sad', 'blank', 'sad', 'blank', 'cold', 'sad'][i], pose: 'hold', shadow: false });
        k.char(965, 900, S * 0.82, { ...KHAI, face: 'sad', gloom: k.at('you', 1) * 0.6, pose: 'hold', shadow: false, tears: k.at('you', 2) * 0.5 });
        if (k.t > k.cue('you')) { const { ctx } = k; ctx.save(); ctx.globalAlpha = 0.3 * k.at('you', 0.4); ctx.fillStyle = '#fff2b0'; ctx.beginPath(); ctx.moveTo(900, 0); ctx.lineTo(1030, 0); ctx.lineTo(1160, 960); ctx.lineTo(770, 960); ctx.closePath(); ctx.fill(); ctx.restore(); }
        counter(k, 1500, 140, 113, '', 'van', 1, { fmt: (v) => `${v} NGƯỜI`, size: 76 });
        k.text('4 NGƯỜI VIỆT', 420, 140, { size: 64, font: 'title', color: '#f2c230', fx: 'pop', p: k.at('four', 0.4), outline: '#1b1b24', outlineWidth: 12 });
        cap(k, 'CÒN ĐEO NƠ', 'you', { color: '#ff8a7a' });
      },
    },
    {
      say: 'Làm sao một cậu lễ tân lương sáu triệu, lại thành người lo hậu cần cho cả một lò lừa đảo? {q}Và trên tầng bốn có gì, mà người ta trả tiền mặt ba tháng chỉ để không ai nhìn thấy? {p1}Đây là phần một: lúc tiền đến. {p2}Phần hai là lúc bạn bước ra khỏi thang máy. {sub}Bấm đăng ký để không lỡ nhé.',
      sfx: [['sparkle', 'q', 0.4], ['cash', 'p1', 0.5], ['slideDown', 'p2', 0.5], ['pop', 'sub', 0.4]],
      draw(k) {
        hotelFront(k, { lit4: true });
        const { ctx } = k;
        if (k.t > k.cue('q')) { ctx.save(); ctx.strokeStyle = '#ff2a2a'; ctx.lineWidth = 12; ctx.globalAlpha = k.at('q', 0.4); ctx.beginPath(); ctx.ellipse(960, 360, 500, 85, -0.02, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); k.text('?', 1520, 330, { size: 160, font: 'title', color: '#ff2a2a', fx: 'pop', p: k.at('q', 0.4), outline: '#fff', outlineWidth: 10 }); }
        k.text('PHẦN 1: LÚC TIỀN ĐẾN', 960, 950, { size: 60, font: 'title', color: '#7fe0a8', fx: 'pop', p: k.at('p1', 0.4), outline: '#1b1b24', outlineWidth: 12 });
        if (k.t > k.cue('p2')) k.text('PHẦN 2: BƯỚC RA KHỎI THANG MÁY', 960, 1030, { size: 44, font: 'title', color: '#ff6b5a', fx: 'pop', p: k.at('p2', 0.4), outline: '#1b1b24', outlineWidth: 10 });
        k.char(330, G, S * 0.8, { ...KHAI, face: 'smug', pose: 'present', p: pop(k, 'p1') });
      },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Khách sạn hai sao rưỡi',
      say: 'Bạn là Khải, hai mươi sáu tuổi, lễ tân ca đêm của khách sạn Hoàng Gia Quốc Tế, ở một thị xã ven biển miền Trung, nơi khu công nghiệp nhiều hơn khách du lịch. {sign}Từ năm ngoái, biển hiệu rơi mất chữ C, giờ đọc là: Hoàng Gia Quố Tế. {nobody}Chưa ai sửa, vì chưa ai để ý. {guest}Kể cả khách.',
      sfx: [['pop', 0.3, 0.4], ['bonk', 'sign', 0.6], ['boing', 'guest', 0.4]],
      draw(k) {
        hotelFront(k, { day: true, fall: k.at('sign', 0.8, 'in') });
        chapTop(k, '1 · Khách sạn hai sao rưỡi');
        k.char(1580, G, S * 0.95, { ...KHAI, face: k.t > k.cue('guest') ? 'blank' : 'happy', pose: k.t > k.cue('sign') ? 'shrug' : 'wave' });
        if (k.t > k.cue('sign')) k.text('QUỐ?!', 1180, 560, { size: 64, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at('sign', 0.4), outline: '#fff', outlineWidth: 10 });
        if (k.t > k.cue('guest')) k.char(330, G, S * 0.8, { ...HO('#6bb56b', { hair: 'short' }), face: 'blank', pose: 'hold', walk: true, p: pop(k, 'guest') });
      },
    },
    {
      say: 'Khách sạn có sáu mươi phòng. {avg}Trung bình mỗi đêm: bảy khách. {gg}Trên Google được bốn sao. {fake}Trong đó ba lượt chấm, là do chính bạn lập tài khoản tự chấm. {pay}Lương sáu triệu một tháng, bao một bữa: {mi}mì tôm, tự úp.',
      sfx: [['click', 'gg', 0.4], ['pop', 'fake', 0.4], ['pop', ['fake', 0.5], 0.4], ['pop', ['fake', 1], 0.4], ['cash', 'pay', 0.3], ['gulp', 'mi', 0.5]],
      draw(k) {
        lobby(k, { night: true });
        k.char(760, G - 40, S, { ...KHAI, face: k.t > k.cue('mi') ? 'sad' : k.t > k.cue('fake') ? 'smug' : 'calm', pose: 'hold' });
        lobbyDesk(k);
        counter(k, 1180, 260, 7, '', 'avg', 0.8, { fmt: (v) => `${v}/60 KHÁCH`, size: 64 });
        // laptop + đánh giá
        const p = k.at('gg', 0.4);
        if (p > 0) {
          k.group({ x: 1150, y: 560, s: p }, () => { const { ctx } = k; ctx.fillStyle = '#1b1b24'; ctx.fillRect(-220, -150, 440, 280); ctx.fillStyle = '#fff'; ctx.fillRect(-205, -135, 410, 250); k.text('★★★★☆ 4,0', 0, -95, { size: 40, font: 'title', color: '#e8a21a' });
            ['Khải ✓ ★★★★★', 'Khải_2 ★★★★★', 'K.Khải ★★★★★'].forEach((t, i) => k.text(t, -180, -35 + i * 48, { size: 30, align: 'left', color: '#1b1b24', fx: 'pop', p: k.at(k.cue('fake', i * 0.5), 0.3) })); });
        }
        if (k.t > k.cue('mi')) { const { ctx } = k; ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.ellipse(560, 620, 70, 26, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#e8b84a'; ctx.beginPath(); ctx.ellipse(560, 612, 56, 16, 0, 0, Math.PI * 2); ctx.fill(); k.steam(560, 590, 0.8); }
        cap(k, 'LƯƠNG 6 TRIỆU', 'pay', { color: '#f2c230' });
      },
    },
    {
      say: 'Bạn có người yêu tên Thảo, làm nail. {dad}Bố Thảo ra điều kiện: muốn cưới thì ba trăm triệu, không có thì thôi. {wallet}Mỗi lần bạn sang chơi, ông không hỏi bạn khoẻ không. Ông hỏi thăm sức khoẻ cái ví. {math}Bạn làm phép tính: ba trăm triệu chia sáu triệu, là bốn năm hai tháng không ăn, không tiêu. {wait}Bố Thảo thì không có kiên nhẫn tới bốn năm.',
      sfx: [['pop', 0.2, 0.4], ['boom', 'dad', 0.5], ['boing', 'wallet', 0.4], ['click', 'math', 0.5], ['bonk', 'wait', 0.5]],
      draw(k) {
        nailShop(k);
        k.char(420, G, S * 0.95, { ...THAO, face: 'happy', pose: 'hold', bob: 2 });
        k.char(820, G, S, { ...KHAI, face: k.t > k.cue('math') ? 'shock' : 'happy', pose: k.t > k.cue('math') ? 'think' : 'wave', sweat: k.t > k.cue('math') });
        k.char(1180, G, S * 1.1, { ...BOTHAO, face: 'cold', pose: 'hips', p: pop(k, 'dad'), talk: k.t > k.cue('wallet') && k.t < k.cue('math') ? k.talk() : 0 });
        k.bubble(1240, 170, 520, 120, 1220, 380, { p: k.at('wallet', 0.4) * (k.t < k.cue('math') ? 1 : 0), text: 'Cái ví dạo này khoẻ không?', size: 36 });
        const p = k.at('math', 0.4);
        if (p > 0) { k.rect(1240, 180, 600, 330, { fill: '#fffdf6', width: 5 }); k.text('300.000.000', 1540, 240, { size: 50, font: 'title', color: '#1b1b24' }); k.text('÷ 6.000.000/tháng', 1540, 310, { size: 42, font: 'title', color: '#1b1b24' }); k.line(1300, 355, 1780, 355, { width: 5 }); k.text('= 4 NĂM 2 THÁNG', 1540, 420, { size: 52, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at(k.cue('math', 2), 0.4) }); }
        cap(k, '300 TRIỆU MỚI CHO CƯỚI', 'dad', { color: '#ff8a7a' });
      },
    },
    {
      say: 'Bà chủ khách sạn, bà Nga, năm mươi lăm tuổi, {lip}son đỏ như đèn báo cháy. {l1}Khách là thượng đế. Nhưng thượng đế phải trả trước.{e1} {owe}Tháng này bà đang nợ lương bạn hai tuần. {god}Bà là thượng đế của chính bà.',
      sfx: [['sparkle', 'lip', 0.4], ['ding', 'l1', 0.4], ['slideDown', 'owe', 0.4], ['boing', 'god', 0.4]],
      draw(k) {
        k.group({ x: -380, y: -330, s: 1.35 }, () => {
          lobby(k);
          k.char(900, G, S, { ...NGA, face: k.t > k.cue('god') ? 'laugh' : 'smug', pose: k.t > k.cue('l1') ? 'point' : 'hips', talk: spk(k, 'l1', 'e1'), bob: 2 });
          k.char(1280, G - 40, S * 0.95, { ...KHAI, face: k.t > k.cue('owe') ? 'sad' : 'blank', pose: 'hold' });
          lobbyDesk(k, { x: 1060, w: 520 });
        });
        if (k.t > k.cue('lip') && k.t < k.cue('l1')) k.text('🚨', 850, 140, { size: 90, fx: 'pop', p: k.at('lip', 0.3) });
        k.bubble(80, 120, 700, 150, 640, 400, { p: k.at('l1', 0.4), text: 'Thượng đế phải trả trước!', size: 44 });
        cap(k, 'NỢ LƯƠNG 2 TUẦN', 'owe', { color: '#ff8a7a' });
      },
    },
    {
      say: 'Ở quê, bố bạn, ông Tư, góa vợ năm năm, sửa xe đạp. {dye}Dạo này ông lạ lắm: mua kem dưỡng da, nhuộm tóc, nhuộm luôn cả râu. {l1}Bố có bạn rồi. Linda. Người Singapore, bốn mươi tuổi, kinh doanh tài chính.{e1} {laugh}Bạn cười sặc. Một bà doanh nhân Singapore, đi yêu ông thợ xe đạp năm mươi tám tuổi. {border}Tình yêu không biên giới thật. Có biên giới thì chắc nằm ở cái ví.',
      sfx: [['ding', 0.2, 0.4], ['sparkle', 'dye', 0.4], ['pop', 'l1', 0.4], ['boing', 'laugh', 0.5]],
      draw(k) {
        paper(k, '#2b2f3d');
        k.char(330, G + 40, S * 1.05, { ...KHAI, face: k.t > k.cue('laugh') ? 'laugh' : 'happy', pose: 'hold', bob: k.t > k.cue('laugh') ? 5 : 0 });
        phone(k, 430, 640, 0.45, { r: -0.1 });
        // cửa sổ gọi video
        const { ctx } = k;
        ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(700, 100, 1120, 760, 24); ctx.fill();
        ctx.save(); ctx.beginPath(); ctx.rect(720, 120, 1080, 720); ctx.clip();
        k.group({ x: 720 - 300 * 0.6, y: 120 - 80 * 0.6, s: 0.75 }, () => { bikeRepair(k); });
        k.char(1500, 930, S * 1.25, { ...TU, face: 'happy', pose: k.t > k.cue('l1') ? 'present' : 'wave', talk: spk(k, 'l1', 'e1'), flush: 0.4 });
        if (k.t > k.cue('dye')) { k.text('✨', 1120, 360, { size: 70, fx: 'pop', p: k.at('dye', 0.3) }); k.text('NHUỘM CẢ RÂU', 1000, 220, { size: 44, font: 'title', color: '#fff', fx: 'pop', p: k.at(k.cue('dye', 1.5), 0.3), outline: '#1b1b24', outlineWidth: 10 }); }
        ctx.restore();
        k.text('📹 Bố', 760, 150, { size: 30, font: 'title', color: '#fff', align: 'left' });
        if (k.t > k.cue('l1')) k.bubble(750, 520, 560, 200, 1330, 560, { p: k.at('l1', 0.4), text: 'Linda 🇸🇬 · 40 tuổi · kinh doanh tài chính ❤️', size: 34 });
        cap(k, 'KHÔNG BIÊN GIỚI… TRỪ CÁI VÍ', 'border', { color: '#f2c230', size: 52 });
      },
    },
    {
      say: 'Ông cười ngượng. {l1}Từ ngày mẹ mày mất, mới có người sáng nào cũng hỏi bố ăn cơm chưa.{e1} {quiet}Bạn im một giây. {sleep}Rồi bảo bố đi ngủ sớm.',
      sfx: [['ding', 'l1', 0.25]],
      draw(k) {
        bikeRepair(k, { dawn: true });
        tint(k, '#1b1f2a', 0.25);
        k.char(900, G, S * 1.05, { ...TU, face: 'happy', tilt: 0.15, pose: 'hold', talk: spk(k, 'l1', 'e1'), shadow: true });
        phone(k, 1260, 560, 0.75, { r: 0.08, screen: (kk, w, h) => { kk.ctx.fillStyle = '#eef3f8'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.text('Linda ❤️', 0, -h / 2 + 40, { size: 30, font: 'title', color: '#1b1b24' }); chat(kk, -w / 2 + 16, -60, 'Anh ăn cơm chưa? 🥰', { size: 26, maxW: w - 30 }); chat(kk, -w / 2 + 16, 30, 'Nhớ anh lắm', { size: 26, maxW: w - 30 }); } });
        if (k.t > k.cue('quiet')) tint(k, '#000', 0.25 * k.at('quiet', 0.6));
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Người khách trả bằng túi du lịch',
      say: 'Một đêm tháng Sáu, mười một giờ đêm. {vans}Ba chiếc xe mười sáu chỗ đỗ xịch trước cửa. {ly}Bước xuống là anh Lý: kính đen giữa đêm, sơ mi hoa, dây chuyền to như xích xe đạp. {bag}Anh đặt lên quầy một cái túi du lịch, kéo khoá. {cash}Bên trong, toàn là tiền mặt.',
      sfx: [['whoosh', 'vans', 0.5], ['boom', ['vans', 1], 0.4], ['sparkle', 'ly', 0.4], ['pop', 'bag', 0.5], ['cash', 'cash', 0.7]],
      draw(k) {
        if (k.t < k.cue('bag')) {
          hotelFront(k, { vans: k.at('vans', 1.2, 'out') });
          tag(k, '11 GIỜ ĐÊM');
          chapTop(k, '2 · Người khách trả bằng túi du lịch');
          k.char(k.lerp(400, 820, k.at('ly', 1.5)), G, S, { ...LY, face: 'smug', pose: 'hold', walk: k.t < k.cue('ly', 1.5), p: pop(k, 'ly') });
          cashBag(k, k.lerp(400, 820, k.at('ly', 1.5)) + 140, G - 80, 0.4 * pop(k, 'ly'), { open: 0 });
        } else {
          lobby(k);
          k.char(760, G - 40, S, { ...KHAI, face: k.t > k.cue('cash') ? 'shock' : 'calm', pose: k.t > k.cue('cash') ? 'shrug' : 'hold', sweat: k.t > k.cue('cash') });
          k.char(1280, G, S, { ...LY, face: 'smug', pose: 'present' });
          lobbyDesk(k);
          cashBag(k, 1000, 640, 0.7, { open: k.at('cash', 0.5) });
          if (k.t > k.cue('cash')) k.focusLines(1000, 560, { p: k.at('cash', 0.4), r: 260 });
        }
      },
    },
    {
      say: '{l1}Anh thuê hết. Cả khách sạn, ba tháng, trả trước.{e1} {look}Bạn nhìn cái túi. {back}Cái túi nhìn lại bạn. {love}Hai bên im lặng rất lâu, như hai người vừa gặp được tình yêu đích thực.',
      sfx: [['cash', 'l1', 0.4], ['boing', 'back', 0.5], ['sparkle', 'love', 0.5]],
      draw(k) {
        paper(k, '#1b1f2a');
        const { ctx } = k; const g = ctx.createRadialGradient(960, 600, 50, 960, 600, 800); g.addColorStop(0, 'rgba(242,194,48,0.35)'); g.addColorStop(1, 'rgba(242,194,48,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, k.W, k.H);
        k.char(330, 1300, S * 2, { ...KHAI, face: k.t > k.cue('love') ? 'happy' : 'shock', pose: 'hold', flush: k.at('love', 1) * 0.6, look: 1, shadow: false });
        k.char(1640, 1250, S * 1.6, { ...LY, face: 'smug', pose: 'hips', talk: spk(k, 'l1', 'e1'), shadow: false });
        cashBag(k, 980, 800, 1.3, { open: 1, eyes: k.at('back', 0.4) });
        if (k.t > k.cue('love')) for (let i = 0; i < 8; i++) { const u = ((k.t - k.cue('love')) * 0.5 + i / 8) % 1; k.text('❤', 620 + Math.sin(i * 2.3) * 300 + u * 0, 650 - u * 500, { size: 54, color: '#ff5a7a' }); }
        cap(k, 'THUÊ HẾT. 3 THÁNG. TIỀN MẶT.', 'l1', { y: 120, color: '#f2c230' });
      },
    },
    {
      say: '{nga}Bà Nga từ tầng năm lao xuống, đầu còn quấn lô, đếm tiền nhanh hơn cả máy đếm tiền. {cond}Anh Lý đưa ra ba điều kiện. {c1}Một: anh làm công ty phần mềm, chuyên gia làm cho khu công nghiệp. Không cần khai báo lưu trú từng người, giấy tờ anh lo. {c2}Hai: tắt camera hành lang. {c3}Ba: không ai được lên tầng bốn. {nod}Bà Nga gật ba cái, nhanh như gà mổ thóc.',
      sfx: [['whoosh', 'nga', 0.5], ['cash', ['nga', 1], 0.5], ['pop', 'c1', 0.5], ['pop', 'c2', 0.5], ['boom', 'c3', 0.5], ['bonk', 'nod', 0.3], ['bonk', ['nod', 0.25], 0.3], ['bonk', ['nod', 0.5], 0.3]],
      draw(k) {
        lobby(k);
        const nod = k.t > k.cue('nod') ? Math.abs(Math.sin((k.t - k.cue('nod')) * 14)) * 14 : 0;
        k.char(k.lerp(1700, 560, k.at('nga', 0.8)), G - nod * 0.3, S, { ...NGA, hat: 'band', hatColor: '#f29bb8', face: k.t > k.cue('nod') ? 'laugh' : 'happy', pose: 'hold', walk: k.t < k.cue('nga', 0.8), lean: k.t > k.cue('nod') ? 0.15 * Math.sin((k.t - k.cue('nod')) * 14) : 0 });
        if (k.t > k.cue('nga', 0.8)) for (let i = 0; i < 6; i++) { const u = ((k.t * 3 + i / 6) % 1); dollar(k, 640 + u * 120, 560 - Math.sin(u * Math.PI) * 120, 0.35, u * 3); }
        k.char(1260, G, S, { ...LY, face: 'smug', pose: k.t > k.cue('c1') ? 'present' : 'hips', talk: spk(k, 'c1', 'nod') });
        lobbyDesk(k);
        [['1', 'KHÔNG KHAI BÁO LƯU TRÚ', 'c1'], ['2', 'TẮT CAMERA HÀNH LANG', 'c2'], ['3', 'CẤM LÊN TẦNG 4', 'c3']].forEach(([n, t, c], i) => {
          const p = k.at(c, 0.4, 'back'); if (p <= 0) return;
          k.group({ x: 960, y: 230 + i * 110, s: p, r: -0.02 }, () => { k.rect(-380, -45, 760, 90, { fill: i === 2 ? '#d63a2f' : '#fffdf6', fillStyle: 'solid', width: 4, seed: 300 + i }); k.text(`${n}. ${t}`, 0, 2, { size: 42, font: 'title', color: i === 2 ? '#fff' : '#1b1b24' }); });
        });
        if (k.t > k.cue('nga') && k.t < k.cue('c1')) cap(k, 'ĐẦU CÒN QUẤN LÔ', 'nga', { color: '#f29bb8' });
      },
    },
    {
      say: 'Rồi anh Lý quay sang bạn. {l1}Em ở lại ca đêm. Lương gấp ba. Làm tốt có thưởng.{e1} {tip}Anh nhét vào túi áo bạn một tờ một trăm đô. {first}Lần đầu tiên trong đời bạn cầm đô la. {lamp}Bạn soi nó dưới đèn ba lần. {frank}Ông Franklin trên tờ tiền, trông rất uy tín.',
      sfx: [['ding', 'l1', 0.4], ['cash', 'tip', 0.6], ['sparkle', 'lamp', 0.4], ['tada', 'frank', 0.4]],
      draw(k) {
        lobby(k);
        log(k, 'w1', { tip: [0, 100, 'tip', 1], banh: 0, p: k.at('tip', 0.5) });
        const lamped = k.t > k.cue('lamp');
        k.char(760, G - 40, S * 1.05, { ...KHAI, face: lamped ? 'laugh' : k.t > k.cue('tip') ? 'shock' : 'calm', pose: lamped ? { l: [22, -62], r: [160, -40] } : 'hold', flush: k.at('first', 1) * 0.4 });
        k.char(1240, G, S, { ...LY, face: 'smug', pose: k.t > k.cue('tip') ? 'point' : 'present', talk: spk(k, 'l1', 'e1') });
        lobbyDesk(k);
        if (k.t > k.cue('tip')) dollar(k, lamped ? 760 : 820, lamped ? 300 + Math.sin(k.t * 6) * 10 : 540, lamped ? 1.3 : 0.6, lamped ? Math.sin(k.t * 3) * 0.2 : -0.3, k.at('tip', 0.4));
        if (lamped) { const { ctx } = k; ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#fff2b0'; ctx.beginPath(); ctx.moveTo(740, 0); ctx.lineTo(780, 0); ctx.lineTo(980, 420); ctx.lineTo(540, 420); ctx.closePath(); ctx.fill(); ctx.restore(); }
        cap(k, 'LƯƠNG ×3', 'l1', { color: '#7fe0a8', y: 1000 });
        if (k.t > k.cue('frank')) k.text('UY TÍN ✓', 1060, 260, { size: 54, font: 'title', color: '#2b7a3a', fx: 'pop', p: k.at('frank', 0.4), outline: '#fff', outlineWidth: 10 });
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      chapter: 'Hậu cần không hỏi',
      say: 'Từ hôm đó, bạn không còn check in check out cho ai nữa. {list}Mỗi đêm anh Lý dán lên quầy một tờ giấy: {rice}một trăm mười ba suất cơm, {bread}hai trăm ổ bánh mì, ba mươi thùng nước. {sim}Và một dòng cuối, bao giờ cũng viết in hoa: SIM.',
      sfx: [['pop', 'list', 0.5], ['click', 'rice', 0.4], ['click', 'bread', 0.4], ['boom', 'sim', 0.5]],
      draw(k) {
        lobby(k, { keysGone: true });
        chapTop(k, '3 · Hậu cần không hỏi');
        log(k, 'w1', { tip: 100, banh: [0, 200, 'bread', 1.5] });
        k.char(560, G - 40, S, { ...KHAI, face: k.t > k.cue('sim') ? 'blank' : 'calm', pose: 'think' });
        lobbyDesk(k, { x: 380, w: 640 });
        const p = k.at('list', 0.5, 'back');
        if (p > 0) k.group({ x: 1300, y: 520, s: p, r: 0.03 }, () => {
          k.rect(-280, -330, 560, 660, { fill: '#fffdf6', fillStyle: 'solid', width: 4, seed: 77 });
          const { ctx } = k; ctx.fillStyle = '#c9c1b4'; ctx.fillRect(-60, -350, 120, 40);
          [['113 SUẤT CƠM', 'rice', '#1b1b24'], ['200 BÁNH MÌ', 'bread', '#1b1b24'], ['30 THÙNG NƯỚC', ['bread', 0.8], '#1b1b24'], ['SIM !!!', 'sim', '#d63a2f']].forEach(([t, c, col], i) => k.text(t, 0, -220 + i * 130, { size: i === 3 ? 92 : 50, font: 'title', color: col, fx: 'write', p: k.at(Array.isArray(c) ? k.cue(c[0], c[1]) : c, 0.6) }));
        });
      },
    },
    {
      say: 'SIM là việc khó nhất. {need}Mỗi tuần anh Lý cần hai trăm cái SIM đăng ký sẵn, không cần chính chủ. {shops}Bạn đi khắp các tiệm điện thoại trong thị xã. {owner}Chủ tiệm nhìn bạn, nhìn tờ đô, rồi không hỏi gì. {job}Hoá ra ở đây, không hỏi gì cũng là một nghề. {cut}Mỗi cái SIM, bạn ăn chênh hai mươi nghìn.',
      sfx: [['pop', 'need', 0.4], ['whoosh', 'shops', 0.4], ['cash', 'owner', 0.5], ['ding', 'cut', 0.5]],
      draw(k) {
        simShop(k);
        log(k, 'w2', { sim: [0, 600, 'shops', 3] });
        k.char(1180, G, S * 1.05, { ...HO('#8a8f98', { hair: 'bald', stubble: true, belly: 0.8 }), face: 'blank', pose: 'hold', look: -1 });
        k.char(620, G, S, { ...KHAI, face: k.t > k.cue('cut') ? 'smug' : 'calm', pose: 'present', walk: k.t > k.cue('shops') && k.t < k.cue('owner') });
        dollar(k, 880, 600, 0.6, 0.1, k.at('owner', 0.4));
        if (k.t > k.cue('shops')) for (let i = 0; i < 10; i++) { const u = ((k.t - k.cue('shops')) * 0.9 + i / 10) % 1; const { ctx } = k; k.group({ x: 1100 - u * 400, y: 500 - Math.sin(u * Math.PI) * 160, r: u * 6 }, () => { ctx.fillStyle = '#f2c230'; ctx.fillRect(-22, -30, 44, 60); ctx.fillStyle = '#c9a21a'; ctx.fillRect(-10, -6, 20, 16); }); }
        if (k.t > k.cue('job')) k.text('🤐', 1300, 330, { size: 100, fx: 'pop', p: k.at('job', 0.3) });
        cap(k, k.t > k.cue('cut') ? '+20.000Đ / SIM' : 'KHÔNG CẦN CHÍNH CHỦ', k.t > k.cue('cut') ? 'cut' : 'need', { color: '#f2c230' });
      },
    },
    {
      say: 'Tuần thứ hai, anh Lý cần thêm {ph}tám mươi bảy cái điện thoại cũ. {pc}Tuần thứ ba, mười hai cái máy tính. {ok}Bạn tự nhủ: công ty phần mềm thì cần máy tính, có gì lạ. {odd}Lạ là ở chỗ, một công ty phần mềm cần nhiều điện thoại hơn cả một cửa hàng điện thoại.',
      sfx: [['pop', 'ph', 0.4], ['pop', ['ph', 0.3], 0.4], ['pop', 'pc', 0.4], ['boing', 'odd', 0.5]],
      draw(k) {
        paper(k, '#c9b38f');
        const { ctx } = k; ctx.fillStyle = '#8a6a4f'; ctx.fillRect(0, G, k.W, 200);
        log(k, 'w3');
        for (let i = 0; i < 6; i++) box(k, 1000 + (i % 3) * 230, G - Math.floor(i / 3) * 170, 220, 170, i < 4 ? 'ĐT CŨ' : '', k.at(k.cue('ph', i * 0.15), 0.4));
        for (let i = 0; i < 3; i++) box(k, 1180 + i * 200, G - 340 - (i % 2) * 0, 200, 150, 'MÁY TÍNH', k.at(k.cue('pc', i * 0.2), 0.4));
        k.char(560, G, S, { ...KHAI, face: k.t > k.cue('odd') ? 'think' : 'calm', pose: k.t > k.cue('odd') ? 'think' : 'hold', sweat: k.t < k.cue('ok') });
        k.text('87 ĐIỆN THOẠI', 1300, 170, { size: 70, font: 'title', color: '#1b1b24', fx: 'pop', p: k.at('ph', 0.4), outline: '#fff', outlineWidth: 10 });
        k.text('12 MÁY TÍNH', 1300, 270, { size: 60, font: 'title', color: '#1b1b24', fx: 'pop', p: k.at('pc', 0.4), outline: '#fff', outlineWidth: 10 });
        if (k.t > k.cue('odd')) k.bubble(220, 420, 420, 120, 520, 560, { p: k.at('odd', 0.4), think: true, text: 'Phần mềm… cần 87 điện thoại?', size: 30 });
      },
    },
    {
      say: 'Đêm nào tầng bốn cũng sáng đèn tới sáng. {keys}Ngồi ở quầy, bạn nghe tiếng gõ phím rào rào như mưa trên mái tôn. {clap}Thỉnh thoảng lại có một tràng vỗ tay, ai đó hét to một câu tiếng nước ngoài, {again}rồi tiếng gõ phím lại rào rào. {man}Chị Mận lao công hỏi: {l1}Công ty gì mà ba giờ sáng còn chốt đơn?{e1} {l2}Chuyên gia thì giờ giấc khác.{e2} {swallow}Câu hỏi đã nuốt: một.',
      sfx: [['click', 'keys', 0.3], ['click', ['keys', 0.15], 0.3], ['click', ['keys', 0.3], 0.3], ['tada', 'clap', 0.5], ['click', 'again', 0.3], ['gulp', 'swallow', 0.6]],
      draw(k) {
        hotelFront(k, { lit4: true });
        log(k, 'w3', { banh: 5000, sim: 1600, nuot: [0, 1, 'swallow', 0.3] });
        if (k.t > k.cue('keys')) for (let i = 0; i < 5; i++) k.text(['tách', 'lạch cạch', 'tạch', 'rào rào', 'tách tách'][i], 600 + i * 180, 300 + Math.sin(k.t * 7 + i) * 15, { size: 32, font: 'title', color: '#9fe8c8', p: k.at(k.cue('keys', i * 0.15), 0.3), fx: 'pop' });
        if (k.t > k.cue('clap') && k.t < k.cue('again', 1)) k.burst(1250, 270, 120, '👏👏 !!!', { p: k.at('clap', 0.3) });
        k.char(1580, G, S * 0.95, { ...MAN, face: 'think', pose: 'point', talk: spk(k, 'l1', 'e1'), p: pop(k, 'man') });
        k.char(330, G, S * 0.95, { ...KHAI, face: k.t > k.cue('swallow') ? 'blank' : 'smug', pose: k.t > k.cue('l2') ? 'shrug' : 'hold', talk: spk(k, 'l2', 'e2') });
        if (k.t > k.cue('swallow')) k.text('🤐 +1', 560, 560, { size: 70, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at('swallow', 0.4), outline: '#fff', outlineWidth: 10 });
      },
    },
    {
      say: 'Hôm sau, chị Mận đi đổ rác về kể: {trash}rác dưới chân cầu thang tầng bốn toàn hộp cơm, vỏ SIM, {pics}với ảnh in màu mấy cô gái rất xinh, cắt dở. {l1}Hay chúng nó quay phim người lớn?{e1} {l2}Chị đừng nghĩ bậy.{e2} {night}Rồi cả đêm hôm đó, người ngồi nghĩ bậy lại là bạn.',
      sfx: [['pop', 'trash', 0.4], ['sparkle', 'pics', 0.4], ['boing', 'l1', 0.4], ['boing', 'night', 0.5]],
      draw(k) {
        alley(k);
        log(k, 'w3', { banh: 5000, sim: 1600, nuot: 1 });
        k.char(600, G, S, { ...MAN, face: k.t > k.cue('l1') ? 'smug' : 'happy', pose: k.t > k.cue('pics') ? 'present' : 'hold', talk: spk(k, 'l1', 'e1') });
        if (k.t > k.cue('trash')) { for (let i = 0; i < 4; i++) { const { ctx } = k; ctx.fillStyle = i % 2 ? '#fffaf0' : '#f2c230'; ctx.fillRect(820 + i * 60, 880 - (i % 2) * 20, 50, 34); } }
        const pp = k.at('pics', 0.5, 'back');
        if (pp > 0) for (let i = 0; i < 3; i++) k.group({ x: 860 + i * 170, y: 430 + (i % 2) * 40, s: pp, r: -0.15 + i * 0.15 }, () => { const { ctx } = k; ctx.fillStyle = '#fff'; ctx.fillRect(-70, -95, 140, 190); ctx.fillStyle = '#f8dbe4'; ctx.fillRect(-60, -85, 120, 150); k.char(0, 70, 150, { outfit: 'tunic', plain: true, body: 'chibiGirl', color: ['#f29bb8', '#ffffff', '#7b5ea7'][i], hair: 'long', hairColor: '#1b1410', face: 'happy', pose: 'wave', shadow: false }); ctx.strokeStyle = '#1b1b24'; ctx.setLineDash([8, 6]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-70, 40); ctx.lineTo(70, 30); ctx.stroke(); ctx.setLineDash([]); });
        const night = k.t > k.cue('night');
        k.char(1400, G, S, { ...KHAI, face: night ? 'smug' : k.t > k.cue('l2') ? 'angry' : 'calm', pose: night ? 'think' : k.t > k.cue('l2') ? 'point' : 'hold', talk: spk(k, 'l2', 'e2'), flush: night ? 0.8 : 0 });
        if (night) k.bubble(1450, 120, 380, 150, 1440, 420, { p: k.at('night', 0.4), think: true, text: '🙈 ???', size: 60 });
      },
    },
    {
      say: 'Trong đống rác còn một tờ giấy in tiếng Việt, sai dấu lung tung, đánh số từng bước. {s1}Bước một: chào buổi sáng, hỏi anh ăn cơm chưa. {s3}Bước ba: kể chuyện mình góa chồng, cô đơn. {s5}Bước năm: khoe ảnh lãi đầu tư. {s7}Bước bảy: anh thử nạp ít thôi, em chỉ cho. {laugh}Bạn đọc, thấy buồn cười: ai mà ngu thế. {ball}Rồi bạn vo tròn tờ giấy, ném trúng sọt rác. {pts}Ba điểm.',
      sfx: [['scratch', 0.2, 0.3], ['pop', 's1', 0.4], ['pop', 's3', 0.4], ['pop', 's5', 0.4], ['cash', 's7', 0.4], ['boing', 'laugh', 0.4], ['whoosh', 'ball', 0.5], ['tada', 'pts', 0.5]],
      draw(k) {
        paper(k, '#2b2f36');
        log(k, 'w3', { banh: 5000, sim: 1600, nuot: 1 });
        const balled = k.t > k.cue('ball');
        if (!balled) k.group({ x: 1080, y: 540, r: 0.02 }, () => {
          k.rect(-520, -440, 1040, 880, { fill: '#fffdf6', fillStyle: 'solid', width: 4, seed: 88 });
          k.text('KICH BAN CHAT · NHOM 3', 0, -370, { size: 40, font: 'title', color: '#8a8f98' });
          [['Buoc 1: Chào buổi sang, hỏi anh ăn com chua ❤️', 's1'], ['Buoc 3: Kể mình góa chồng, cô đon', 's3'], ['Buoc 5: Khoe ảnh lãi đầu tu 📈', 's5'], ['Buoc 7: "Anh thử nạp ít thôi, em chỉ cho"', 's7']].forEach(([t, c], i) => {
            k.text(t, -470, -250 + i * 150, { size: 40, align: 'left', color: i === 3 ? '#d63a2f' : '#1b1b24', fx: 'write', p: k.at(c, 0.7), maxWidth: 940 });
          });
          if (k.t > k.cue('s1')) k.highlight(-480, -285, 900, 70, { p: k.at('s1', 0.6), color: '#f2c230' });
        });
        k.char(240, 1250, S * 1.5, { ...KHAI, face: k.t > k.cue('laugh') ? 'laugh' : 'calm', pose: balled ? { l: [22, -62], r: [150, -80] } : 'hold', bob: k.t > k.cue('laugh') && !balled ? 6 : 0, shadow: false });
        if (balled) {
          const u = k.at('ball', 0.9, 'linear'); const { ctx } = k;
          ctx.fillStyle = '#3a8a4a'; ctx.fillRect(1500, 800, 200, 230);
          ctx.fillStyle = '#fffdf6'; ctx.beginPath(); ctx.arc(k.lerp(500, 1600, u), 600 - Math.sin(u * Math.PI) * 450 + u * 180, 50, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#8a8f98'; ctx.lineWidth = 3; ctx.stroke();
          k.text('3 ĐIỂM!', 1600, 650, { size: 90, font: 'title', color: '#f2c230', fx: 'pop', p: k.at('pts', 0.4), outline: '#1b1b24', outlineWidth: 14 });
        }
        if (k.t > k.cue('laugh') && !balled) k.text('AI MÀ NGU THẾ 😂', 1080, 1020, { size: 56, font: 'title', color: '#fff', fx: 'pop', p: k.at('laugh', 0.4), outline: '#1b1b24', outlineWidth: 12 });
      },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Đôi chân trần lúc ba giờ sáng',
      say: 'Đêm thứ ba mươi, ba giờ sáng, {door}cửa thoát hiểm bật mở. {run}Một cậu thanh niên gầy nhom, chân trần, chạy xuống quầy. {l1}Phone. Please. Passport, they take.{e1} {point}Cậu chỉ tay lên trên, rồi chỉ vào ngực mình.',
      sfx: [['bonk', 'door', 0.6], ['whoosh', 'run', 0.5], ['scratch', 'l1', 0.3]],
      draw(k) {
        lobby(k, { exit: k.at('door', 0.3) });
        tag(k, '3:00 SÁNG');
        chapTop(k, '4 · Đôi chân trần lúc ba giờ sáng');
        log(k, 'm1');
        const pointUp = k.t > k.cue('point') && (k.t - k.cue('point')) % 2 < 1;
        k.char(k.lerp(150, 520, k.at('run', 0.8)), G, S * 0.95, { ...CHANTRAN, face: 'cry', tears: 0.6, sweat: true, pose: k.t > k.cue('point') ? (pointUp ? { l: [10, 0], r: [170, 160] } : { l: [10, 0], r: [40, -140] }) : 'shout', walk: k.t < k.cue('run', 0.8), talk: spk(k, 'l1', 'e1'), p: pop(k, 'run'), flip: true });
        k.char(1000, G - 40, S, { ...KHAI, face: k.t > k.cue('run') ? 'shock' : 'blank', pose: k.t > k.cue('run') ? 'shrug' : 'hold', sweat: k.t > k.cue('l1') });
        lobbyDesk(k, { x: 760, w: 600 });
        if (k.t > k.cue('run')) k.motion(300, 700, -1, 0, { p: k.at('run', 0.5), n: 4, len: 120 });
        k.bubble(580, 150, 640, 140, 520, 420, { p: k.at('l1', 0.4), text: 'PHONE… PLEASE… PASSPORT… THEY TAKE!', size: 36 });
      },
    },
    {
      say: 'Bạn cầm điện thoại lên. {cold}Lần đầu tiên sau một tháng, sau gáy bạn lạnh toát. {d1}Bạn bấm số một. {d2}Rồi thêm một số một nữa.',
      sfx: [['scratch', 'cold', 0.3], ['click', 'd1', 0.7], ['click', 'd2', 0.7]],
      draw(k) {
        paper(k, '#14161d');
        log(k, 'm1');
        k.char(560, 1350, S * 2.1, { ...KHAI, face: 'shock', sweat: true, pose: 'hold', shadow: false, gloom: k.at('cold', 1) * 0.5 });
        const digits = k.t > k.cue('d2') ? '11' : k.t > k.cue('d1') ? '1' : '';
        phone(k, 1300, 540, 1.3, { r: 0.06, screen: (kk, w, h) => { kk.ctx.fillStyle = '#1f2a44'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.text(digits || '_', 0, -170, { size: 80, font: 'title', color: '#fff' }); for (let i = 0; i < 9; i++) { const x = -80 + (i % 3) * 80, y = -40 + Math.floor(i / 3) * 80; kk.ctx.fillStyle = i === 0 && k.t > k.cue('d1') && (k.t - k.cue(k.t > k.cue('d2') ? 'd2' : 'd1')) < 0.3 ? '#f2c230' : '#3a4560'; kk.ctx.beginPath(); kk.ctx.arc(x, y, 32, 0, Math.PI * 2); kk.ctx.fill(); kk.text(String(i + 1), x, y + 2, { size: 30, font: 'title', color: '#fff' }); } } });
        if (k.t > k.cue('cold')) for (let i = 0; i < 3; i++) k.text('❄', 700 + i * 120, 330 - i * 30, { size: 60, color: '#9fc4e8', fx: 'pop', p: k.at(k.cue('cold', i * 0.2), 0.3) });
      },
    },
    {
      say: '{ting}Ting. Thang máy mở. {ly}Anh Lý bước ra, vẫn kính đen, vẫn cười. {drag}Hai gã to con khoác vai cậu thanh niên lôi đi, nhẹ nhàng như dìu một người bạn say. {five}Anh Lý đặt lên quầy năm tờ một trăm đô. {l1}Nó nhớ nhà, hơi tâm thần. Em không thấy gì nhé.{e1} {look}Bạn nhìn năm tờ đô. Năm ông Franklin nhìn lại bạn. {del}Bạn bấm xoá. {swallow}Câu hỏi đã nuốt: hai. Câu này, to nhất từ trước tới giờ.',
      sfx: [['ding', 'ting', 0.6], ['sparkle', 'ly', 0.3], ['whoosh', 'drag', 0.4], ['cash', 'five', 0.6], ['click', 'del', 0.6], ['gulp', 'swallow', 0.7]],
      draw(k) {
        lobby(k, { lift: k.at('ting', 0.6), floor: '4' });
        log(k, 'm1', { tip: [900, 1400, 'five', 1], nuot: [1, 2, 'swallow', 0.3] });
        const dragU = k.at('drag', 2.5, 'inOut');
        k.char(k.lerp(1620, 1180, k.at('ly', 0.8)), G, S, { ...LY, face: 'smug', pose: k.t > k.cue('five') ? 'point' : 'hips', talk: spk(k, 'l1', 'e1'), p: k.at('ting', 0.4) });
        if (k.t > k.cue('drag')) {
          const x = k.lerp(420, 1700, dragU);
          k.char(x - 150, G, S * 1.1, { ...GUARD, face: 'cold', pose: { l: [40, 20], r: [40, 20] }, walk: true });
          k.char(x, G, S * 0.9, { ...CHANTRAN, face: 'cry', tears: 1, pose: 'shrug', walk: true, lean: -0.15 });
          k.char(x + 150, G, S * 1.1, { ...GUARD, face: 'cold', pose: { l: [40, 20], r: [40, 20] }, walk: true });
        } else k.char(420, G, S * 0.9, { ...CHANTRAN, face: 'shock', tears: 0.6, pose: 'shrug' });
        k.char(760, G - 40, S, { ...KHAI, face: k.t > k.cue('swallow') ? 'blank' : k.t > k.cue('look') ? 'think' : 'shock', pose: 'hold', sweat: true, gloom: k.at('swallow', 1) * 0.4 });
        lobbyDesk(k, { x: 560, w: 520 });
        for (let i = 0; i < 5; i++) dollar(k, 640 + i * 80, 620 - i * 6, 0.45, -0.2 + i * 0.1, k.at(k.cue('five', i * 0.12), 0.3));
        if (k.t > k.cue('del')) k.text('ĐÃ XOÁ: 11', 760, 330, { size: 56, font: 'title', color: '#ff5a4a', fx: 'pop', p: k.at('del', 0.3), outline: '#fff', outlineWidth: 10 });
        if (k.t > k.cue('swallow')) k.text('🤐 +1', 1000, 230, { size: 80, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at('swallow', 0.4), outline: '#fff', outlineWidth: 10 });
      },
    },
    {
      say: 'Đêm đó bạn rửa mặt bốn lần. {self}Bạn tự nhủ: người ta là chuyên gia, người ta có hợp đồng, người ta chỉ nhớ nhà thôi. {count}Rồi bạn lôi tiền ra đếm lại. {sleep}Với bạn, đếm tiền là cách dễ ngủ nhất.',
      sfx: [['gulp', 0.3, 0.3], ['gulp', 1.2, 0.3], ['cash', 'count', 0.5], ['sparkle', 'sleep', 0.3]],
      draw(k) {
        washroom(k);
        log(k, 'm1', { tip: 1400, nuot: 2 });
        const counting = k.t > k.cue('count');
        k.char(1320, 640, S * 0.8, { ...KHAI, face: 'sad', pose: 'hold', shadow: false, alpha: 0.55 });
        k.char(760, G, S * 1.05, { ...KHAI, face: counting ? 'happy' : 'sad', pose: counting ? 'hold' : { l: [80, 120], r: [80, 120] }, look: counting ? 0 : 1, sweat: !counting });
        if (!counting) for (let i = 0; i < 6; i++) { const u = (k.t * 1.5 + i / 6) % 1; k.dot(700 + i * 25, 520 + u * 200, 8, '#5fc3e4', 1 - u); }
        if (counting) for (let i = 0; i < 6; i++) { const u = ((k.t - k.cue('count')) * 2.5 + i / 6) % 1; dollar(k, 720 + u * 160, 640 - Math.sin(u * Math.PI) * 90, 0.35, u * 2); }
        cap(k, k.t > k.cue('sleep') ? 'ĐẾM TIỀN = THUỐC NGỦ' : 'RỬA MẶT LẦN 4', k.t > k.cue('sleep') ? 'sleep' : 0.5, { color: '#f2c230' });
      },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Quản lý hậu cần',
      say: 'Sang tháng thứ hai, bạn đã có hai trăm triệu. {ring}Bạn mua nhẫn cưới, loại có hột. {cry}Thảo khóc. {dinner}Bố Thảo lần đầu tiên rót rượu cho bạn, {wallet}và không hỏi thăm cái ví nữa. Vì cái ví đã tự lên tiếng rồi.',
      sfx: [['cash', 0.3, 0.4], ['sparkle', 'ring', 0.6], ['pop', 'cry', 0.4], ['ding', 'dinner', 0.4], ['tada', 'wallet', 0.4]],
      draw(k) {
        const dinner = k.t > k.cue('dinner');
        if (!dinner) {
          goldshop(k);
          chapTop(k, '5 · Quản lý hậu cần');
          k.char(700, G, S, { ...KHAI, face: 'laugh', pose: 'present' });
          k.char(1150, G, S * 0.95, { ...THAO, face: k.t > k.cue('cry') ? 'cry' : 'shock', tears: k.at('cry', 1), pose: 'cheer', p: pop(k, 'ring') });
          if (k.t > k.cue('ring')) { k.group({ x: 930, y: 420, s: pop(k, 'ring') * 1.4 }, () => { const { ctx } = k; ctx.strokeStyle = '#f2c230'; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(0, 30, 50, 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = '#d6f0ff'; ctx.beginPath(); ctx.moveTo(-24, -20); ctx.lineTo(24, -20); ctx.lineTo(0, 14); ctx.closePath(); ctx.fill(); }); k.text('✨', 1010, 330, { size: 60 }); }
          counter(k, 960, 170, 200, '', 0.3, 1.2, { fmt: (v) => `${v} TRIỆU`, size: 84, color: '#2b7a3a' });
        } else {
          living(k, { night: true });
          k.char(560, G + 30, S, { ...KHAI, face: 'laugh', pose: 'hold', shadow: false });
          k.char(860, G + 30, S * 0.92, { ...THAO, face: 'happy', pose: 'hold', shadow: false });
          k.char(1300, G + 30, S * 1.1, { ...BOTHAO, face: 'laugh', pose: { l: [22, -62], r: [100, -60] }, shadow: false, flush: 0.5 });
          mam(k, 930, G + 90, 1.3);
          k.bubble(1240, 140, 560, 120, 1300, 380, { p: k.at('wallet', 0.4), text: 'Con rể quý! Uống!', size: 40 });
        }
      },
    },
    {
      say: 'Bà Nga in cho bạn bảng tên mới: {tagn}Quản lý hậu cần. {ward}Anh Lý giao thêm việc: mỗi lần có người mới tới, bạn lên phường khai báo lưu trú, theo danh sách anh đưa. {names}Mười cái tên, đọc cái nào cũng na ná nhau. {sign}Bạn ký vào chỗ người khai báo. Bạn nghĩ đó chỉ là một chữ ký. {law}Luật thì không nghĩ thế. Luật có hẳn một điều dành riêng cho chữ ký ấy: tổ chức cho người khác ở lại Việt Nam trái phép.',
      sfx: [['tada', 'tagn', 0.4], ['whoosh', 'ward', 0.4], ['pop', 'names', 0.4], ['scratch', 'sign', 0.5], ['boom', 'law', 0.6]],
      draw(k) {
        policeHall(k);
        log(k, 'm2', { tip: 8000 });
        k.char(560, G, S * 1.05, { ...KHAI, face: k.t > k.cue('law') ? 'blank' : 'smug', pose: k.t > k.cue('sign') ? { l: [22, -62], r: [70, -10] } : 'hips' });
        if (k.t > k.cue('tagn')) k.group({ x: 600, y: 790, s: pop(k, 'tagn') }, () => { k.rect(-110, -24, 220, 48, { fill: '#f2c230', fillStyle: 'solid', width: 3, seed: 61 }); k.text('QUẢN LÝ HẬU CẦN', 0, 2, { size: 22, font: 'title', color: '#1b1b24' }); });
        const p = k.at('names', 0.5, 'back');
        if (p > 0) k.group({ x: 1250, y: 560, s: p, r: 0.02 }, () => {
          k.rect(-320, -380, 640, 760, { fill: '#fffdf6', fillStyle: 'solid', width: 4, seed: 62 });
          k.text('KHAI BÁO LƯU TRÚ', 0, -330, { size: 40, font: 'title', color: '#1b1b24' });
          ['LI WEI', 'LI WEN', 'LI WAI', 'LEE WEI', 'LI WEI (2)', 'LY VI'].forEach((n, i) => k.text(`${i + 1}. ${n}`, -260, -250 + i * 60, { size: 34, align: 'left', color: '#1b1b24' }));
          k.text('Người khai báo:', -260, 170, { size: 30, align: 'left', color: '#4a4f57' });
          k.curve([[-40, 230], [0, 190], [40, 250], [90, 200], [150, 240], [220, 205]], { p: k.at('sign', 0.8), stroke: '#2e6da4', width: 6, seed: 63 });
          if (k.t > k.cue('law')) k.group({ x: 120, y: 300, r: -0.2, s: k.lerp(1.8, 1, k.at('law', 0.3)) }, () => { k.rect(-170, -50, 340, 100, { stroke: '#d63a2f', width: 8, fill: 'none', seed: 64 }); k.text('ĐIỀU 348', 0, 2, { size: 54, font: 'title', color: '#d63a2f' }); });
        });
      },
    },
    {
      say: 'Tối đó bố gọi, giọng phấn khởi như hồi trai trẻ. {l1}Linda bày bố đầu tư sàn ngoại hối. Nạp mười triệu, ba ngày lãi ba triệu! Linda bảo bố là người đàn ông chân thành nhất cô ấy từng gặp.{e1} {busy}Bạn đang bận đếm SIM, ừ ừ cho qua. {send}Bạn còn chuyển cho bố hai mươi triệu: bố cứ tiêu đi, con giờ khá rồi. {later}Bạn không biết rằng ba tiếng sau, hai mươi triệu ấy, đã nằm trong sàn ngoại hối của Linda.',
      sfx: [['ding', 0.2, 0.4], ['cash', 'l1', 0.3], ['click', 'busy', 0.3], ['cash', 'send', 0.6], ['slideDown', 'later', 0.6]],
      draw(k) {
        paper(k, '#1f2430');
        log(k, 'm2');
        const { ctx } = k;
        // trái: Khải đếm SIM ở quầy
        k.char(330, G + 20, S, { ...KHAI, face: 'calm', pose: 'hold', look: 1, talk: k.t > k.cue('busy') && k.t < k.cue('send') ? k.talk() * 0.5 : 0 });
        for (let i = 0; i < 6; i++) { ctx.fillStyle = '#f2c230'; ctx.fillRect(200 + i * 40, 1000 - (i % 2) * 8, 32, 44); }
        // phải: video call bố
        ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.roundRect(760, 120, 1060, 700, 24); ctx.fill();
        ctx.save(); ctx.beginPath(); ctx.rect(780, 140, 1020, 660); ctx.clip();
        k.group({ x: 780 - 200 * 0.6, y: 140 - 100 * 0.6, s: 0.72 }, () => bikeRepair(k, { night: true }));
        k.char(1100, 900, S * 1.1, { ...TU, face: 'laugh', pose: 'cheer', talk: spk(k, 'l1', 'e1'), flush: 0.5 });
        phone(k, 1560, 470, 0.85, { r: 0.08, screen: forexApp({ bal: k.t > k.cue('later') ? '33.000.000đ' : '13.000.000đ' }) });
        ctx.restore();
        if (k.t > k.cue('send')) { const u = k.at('send', 1, 'inOut'); k.text('💸 20 TRIỆU', k.lerp(400, 1100, u), 500 - Math.sin(u * Math.PI) * 200, { size: 54, font: 'title', color: '#7fe0a8', outline: '#1b1b24', outlineWidth: 10 }); }
        if (k.t > k.cue('later')) { k.arrow(1180, 700, 1520, 640, { p: k.at('later', 0.6), width: 10, stroke: '#ff5a4a', bend: -0.2, seed: 71 }); k.text('3 TIẾNG SAU', 1300, 860, { size: 52, font: 'title', color: '#ff5a4a', fx: 'pop', p: k.at('later', 0.4), outline: '#1b1b24', outlineWidth: 10 }); }
        cap(k, 'NẠP 10 TRIỆU · 3 NGÀY LÃI 3 TRIỆU', 'l1', { y: 1000, color: '#7fe0a8', size: 48 });
      },
    },
    {
      say: 'Bố gửi ảnh Linda cho bạn xem: {pic}tóc dài, váy trắng, cười rất ngọt, đứng cạnh cửa sổ. {l1}Xinh thế, bố tốt số.{e1} {curtain}Bạn không để ý tấm rèm sau lưng cô ấy: rèm vải hoa hướng dương, {same}đúng loại bà Nga mua cả lô ngoài chợ, treo khắp khách sạn này.',
      sfx: [['ding', 'pic', 0.5], ['sparkle', 'l1', 0.3], ['drumroll', 'curtain', 0.4], ['boom', 'same', 0.6]],
      draw(k) {
        paper(k, '#14161d');
        log(k, 'm2');
        const pan = k.at('curtain', 1.4, 'inOut');
        k.group({ x: k.lerp(0, 200, pan), y: 0, s: 1 }, () => phone(k, 960, 540, k.lerp(1.6, 1.75, pan), { p: k.at('pic', 0.4), screen: lindaPhoto }));
        if (k.t > k.cue('curtain')) { const { ctx } = k; ctx.save(); ctx.strokeStyle = '#ff2a2a'; ctx.lineWidth = 14; ctx.globalAlpha = k.at(k.cue('curtain', 1.2), 0.4); ctx.beginPath(); ctx.ellipse(1000, 540, 140, 450, 0.02, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
        k.char(300, 1250, S * 1.5, { ...KHAI, face: 'happy', pose: 'wave', talk: spk(k, 'l1', 'e1'), shadow: false, alpha: k.t > k.cue('curtain') ? 0.35 : 1 });
        if (k.t > k.cue('same')) { k.group({ x: 1680, y: 500, s: 0.85 * k.at('same', 0.5, 'back') }, () => { k.rect(-220, -240, 440, 480, { fill: '#d9cfb4', fillStyle: 'solid', width: 4, seed: 81 }); sunCurtain(k, -200, -220, 140, 440); sunCurtain(k, 60, -220, 140, 440); k.text('SẢNH KHÁCH SẠN', 0, 270, { size: 34, font: 'title', color: '#fff', outline: '#1b1b24', outlineWidth: 8 }); }); k.text('=', 1470, 520, { size: 140, font: 'title', color: '#ff2a2a', fx: 'pop', p: k.at('same', 0.4) }); }
      },
    },

    // ===== CHƯƠNG 6 =====
    {
      chapter: 'Nút số bốn',
      say: 'Đêm thứ sáu mươi, bạn mời ông Sáu bảo vệ một chầu bia. {l1}Mày có bao giờ thắc mắc, tầng bốn làm cái đếch gì không?{e1} {l2}Chú ơi, nghề này, ai thắc mắc thì nghèo.{e2} {stop}Câu hỏi đã nuốt: bạn thôi không đếm nữa.',
      sfx: [['pop', 0.3, 0.4], ['gulp', 0.8, 0.4], ['boing', 'l1', 0.4], ['ding', 'l2', 0.4], ['scratch', 'stop', 0.5]],
      draw(k) {
        hotelFront(k, { lit4: true });
        chapTop(k, '6 · Nút số bốn');
        log(k, 'm2', { nuotOff: k.t > k.cue('stop') });
        tint(k, '#141b33', 0.2);
        k.char(560, G + 40, S * 1.05, { ...SAU, face: 'think', flush: 0.6, pose: k.t > k.cue('l1') ? 'point' : 'hold', talk: spk(k, 'l1', 'e1'), tilt: 0.1 });
        k.char(1360, G + 40, S * 1.05, { ...KHAI, face: 'laugh', flush: 0.4, pose: k.t > k.cue('l2') ? 'cheer' : 'hold', talk: spk(k, 'l2', 'e2') });
        beerTable(k, 960, G + 60);
        cap(k, 'AI THẮC MẮC THÌ NGHÈO', 'l2', { color: '#f2c230' });
      },
    },
    {
      say: 'Đúng hai giờ sáng, {ring}điện thoại quầy reo. {l1}Thang hàng hỏng. Người trên tầng bốn không xuống lấy đồ được. Em mang lên. Để trước cửa. Không gõ. Không nhìn.{e1} {bags}Bốn mươi ổ bánh mì, ba thùng mì tôm.',
      sfx: [['ding', 'ring', 0.5], ['ding', ['ring', 0.4], 0.5], ['pop', 'bags', 0.4]],
      draw(k) {
        lobby(k, { floor: '4' });
        tag(k, '2:00 SÁNG');
        log(k, 'm2', { nuotOff: true, banh: [9800, 9840, 'bags', 1] });
        const ringing = k.t > k.cue('ring') && k.t < k.cue('l1');
        k.char(700, G - 40, S, { ...KHAI, face: k.t > k.cue('l1') ? 'shock' : 'blank', pose: k.t > k.cue('l1') ? { l: [22, -62], r: [150, -30] } : 'hold', sweat: k.t > k.cue('l1') });
        lobbyDesk(k, { phoneRing: ringing });
        phone(k, 1260, 470, 0.7, { p: k.at('l1', 0.3), r: 0.06, screen: (kk, w, h) => { kk.ctx.fillStyle = '#1f2a44'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.char(0, h / 2 - 20, h * 0.7, { ...LY, face: 'cold', pose: 'point', talk: spk(kk, 'l1', 'e1'), shadow: false }); kk.text('Anh Lý · Tầng 4', 0, -h / 2 + 40, { size: 28, font: 'title', color: '#fff' }); } });
        k.group({ x: 1620, y: 640, r: 0.08, s: k.at('l1', 0.4, 'back') }, () => { k.rect(-150, -40, 300, 80, { fill: '#f2c230', fillStyle: 'solid', width: 4, seed: 91 }); k.text('THANG HÀNG HỎNG', 0, 2, { size: 30, font: 'title', color: '#1b1b24' }); });
        for (let i = 0; i < 3; i++) breadBag(k, 380 + i * 130, 620, 0.9 * pop(k, k.cue('bags', i * 0.15)));
        cap(k, 'KHÔNG GÕ. KHÔNG NHÌN.', k.cue('l1', 4), { color: '#ff8a7a' });
      },
    },
    {
      say: 'Và thế là bạn đứng trong thang máy, ngón tay đặt lên cái nút bị cấm. {press}Bạn bấm. {shake}Thang máy rung lên. {ting}Ting. {open}Cửa mở ra một hành lang tối om, chỉ có ánh xanh của hàng trăm màn hình hắt qua khe cửa. {end}Ở cuối hành lang, là một tấm rèm hoa hướng dương.',
      sfx: [['click', 'press', 0.7], ['boom', 'shake', 0.4], ['ding', 'ting', 0.8], ['whoosh', 'open', 0.4], ['drumroll', ['open', 0.8], 0.4], ['boom', 'end', 0.7]],
      draw(k) {
        const opened = k.t > k.cue('open');
        const sh = k.t > k.cue('shake') && k.t < k.cue('ting') ? Math.sin(k.t * 60) * 6 : 0;
        if (!opened) {
          k.group({ x: sh, y: 0 }, () => {
            lift(k, { press: k.at('press', 0.3), floor: k.t > k.cue('ting') ? '4' : k.t > k.cue('shake') ? '3' : '1' });
            k.char(760, G, S * 1.05, { ...KHAI, face: 'shock', pose: { l: [22, -62], r: [70, -20] }, sweat: true, look: 1 });
            breadBag(k, 640, G - 140, 1); breadBag(k, 560, G - 40, 0.9); box(k, 920, G + 20, 160, 110, 'MÌ TÔM ×3', 1);
          });
          log(k, 'm2', { nuotOff: true, banh: 9840 });
        } else {
          corridor4(k, { curtain: k.at('end', 1.2) });
          k.char(1560, 1500, S * 1.9, { ...KHAI, face: 'shock', pose: 'hold', shadow: false, sweat: true, look: -1 });
          if (k.t > k.cue('end')) k.focusLines(960, 470, { p: k.at('end', 0.5), r: 200 });
          log(k, 'm2', { nuotOff: true, banh: 9840, t4: k.t > k.cue('end') ? '???' : 'ĐANG MỞ' });
        }
      },
    },
    nextEpisodeScene({
      title: 'Nếu Bạn Là Lễ Tân Khách Sạn… Tầng 4 (Phần 2)',
      hook: 'Sau cánh cửa phòng 404: một chiếc ghế, một tấm rèm hoa hướng dương, và một màn hình đang nhắn tin với "Tư Xe Đạp".',
      when: 'Phần 2 · tuần này',
      say: '{next}Phần hai: sau cánh cửa phòng bốn trăm linh bốn, có một chiếc ghế, một tấm rèm hoa hướng dương, và một màn hình đang nhắn tin với một người tên là: Tư Xe Đạp.',
      art(k) {
        sunCurtain(k, 60, -220, 320, 400);
        k.char(-220, 170, 380, { ...KHAI, face: 'shock', pose: 'shrug', sweat: true });
        k.text('404', 220, -60, { size: 120, font: 'title', color: '#5fd3c8', outline: '#1b1b24', outlineWidth: 10 });
      },
    }),
    subscribeScene({
      question: 'Nếu là bạn: bấm nút số 4, hay cầm tiền rồi im?',
      channel: 'Nếu Bạn Là',
      say: '{q}Nếu là bạn, bạn có bấm nút số bốn không? Hay cầm tiền rồi im? Bình luận cho mình biết. {sub}Đăng ký và bật chuông, để không lỡ phần hai nhé.',
    }),
  ],
};
