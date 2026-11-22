// Kênh Nếu Bạn Là — "Leader 7 Sao", PHẦN 2/2: lúc đi xuống. Kịch bản duyệt: videos/064-…/kich-ban-p2.md (06/11/2026).
// Truyện hư cấu; app "Zena AI" là tên hư cấu. Dữ kiện có thật (VTV 30/10/2026, Dân trí 26/10/2026, vụ TATAO LIVE):
// app không có gian hàng/đơn hàng/khách hàng, tiền người sau trả người trước; ~40.000 người, hơn 400 tỷ; người cầm đầu là người
// nước ngoài rời VN ~2 tháng trước khi lộ; văn phòng đóng cửa, nhóm Zalo giải tán; kẻ gian yêu cầu nạn nhân đổi sang USDT chuyển
// sang Campuchia; mới thu hồi hơn 8,6 tỷ. Lừa "thu hồi tiền bị lừa" (lừa lần hai) là thủ đoạn được cơ quan công an cảnh báo nhiều lần.
import { nextEpisodeScene, subscribeScene } from '/engine/templates.js';
import * as thumbs from '/videos/065-neu-ban-keo-ca-ho-vao-app-ai-p2/thumbs.js';
import {
  G, TOAN, HANH, LINH, LUU, TI, CHUTICH, BAY, HAI, HO, spk, pop, cap, tint, paper, phone, chat, cash, counter, living,
  hud, chapTop, hospitalGate, mam, feast, stage, crowd, sash, moto, c2, ipad, zena, zaloGroup, confetti,
  houseGate, emptyOffice, bikeShop, atmBooth, policeHall, coachNight, nightRoad,
} from '/channel/neu-ban-la.js';

const S = 520;
// Trạng thái bảng đếm mặc định của phần 2 (đơn vị triệu): ví app treo "đang xử lý".
const H0 = { nap: 87.8, vi: 286, frozen: true, rut: 31, ho: 1200, no: 45 };
const H = (o = {}) => ({ ...H0, ...o });
// Quầng đèn vàng trước quán.
const lamp2 = (k) => { const g = k.ctx.createRadialGradient(1450, 500, 20, 1450, 500, 600); g.addColorStop(0, 'rgba(255,214,140,0.35)'); g.addColorStop(1, 'rgba(255,214,140,0)'); k.ctx.fillStyle = g; k.ctx.fillRect(850, 0, 1200, 1080); };
const app = (k, mode, o = {}, x = 1500, y = 560, s = 0.95) => phone(k, x, y, s, { p: o.p ?? 1, r: o.r ?? 0.05, screen: zena(mode, o) });
const angryHo = (k, i, x, y, s, o = {}) => k.char(x, y, s, { ...HO(['#3d7fc1', '#f29bb8', '#6bb56b', '#8a8f98', '#e8b84a', '#8a6a4f'][i % 6], { hair: ['short', 'bun', 'spiky', 'bald', 'perm', 'short'][i % 6], body: [1, 4].includes(i % 6) ? 'chibiGirl' : 'chibi' }), face: o.face ?? 'shout', vein: o.face == null, pose: o.pose ?? (i % 2 ? 'shout' : 'point'), shadow: false, ...o });

export default {
  meta: {
    title: 'Nếu Bạn Kéo Cả Họ Vào App AI… Lúc App Sập (Phần 2)',
    description: `App báo "đang xử lý", nhóm Zalo ba nghìn người giải tán, và 32 người họ hàng đang trải chiếu trước cổng nhà chú Toàn. Phần 2: phí mở khoá, văn phòng trống trơn, "luật sư thu hồi tiền", và chuyến công tác một chiều của ông Chủ tịch.
Câu chuyện hư cấu dựa trên vụ app "AI tự livestream bán hàng" lôi kéo khoảng 40.000 người, hơn 400 tỷ đồng được báo chí đưa tin năm 2026, và chiêu "lấy lại tiền bị lừa" đang nhắm vào chính các nạn nhân.`,
    footer: `📚 Dựa trên tin VTV (30/10/2026), Dân trí (26/10/2026). Tên app, nhân vật và tình tiết đã được hư cấu.
⚠️ Không có "văn phòng thu hồi tiền bị lừa" nào đòi phí trước. Bị lừa: trình báo công an nơi gần nhất, đừng chuyển thêm đồng nào.
🔔 Đăng ký Nếu Bạn Là: mỗi câu chuyện, bạn sống thử một cuộc đời.`,
    links: [['▶ Phần 1: Nếu Bạn Kéo Cả Họ Vào App AI Kiếm Tiền…', '064-neu-ban-keo-ca-ho-vao-app-ai-p1'], ['🔔 Đăng ký', 'https://www.youtube.com/@neubanlaa?sub_confirmation=1']],
    tags: ['app AI kiếm tiền', 'lừa đảo đa cấp', 'app sập', 'lấy lại tiền bị lừa', 'leader 7 sao', 'nếu bạn là', 'hoạt hình'],
    hashtags: ['luadao', 'dacap', 'appkiemtien'],
    style: 'clean', tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1.1,
    lead: 0.25, tail: 0.45, pause: 0.2,
    transition: 'cut', sfxTransitions: false, camera: 0.04, sfxVolume: 0.6,
    paper: '#f7f1e3', privacy: 'private',
  },
  thumbnail: thumbs.a,

  scenes: [
    // ===== HOOK =====
    {
      say: 'Sáu giờ sáng, bạn mở mắt vì tiếng ồn ngoài cổng. {app}Ví app vẫn hiện hai trăm tám mươi sáu triệu, đang xử lý. {gate}Ngoài cổng, ba mươi hai người họ hàng đã đứng chờ. {mess}Có người còn mang theo chiếu, nồi cơm, và một cái loa kẹo kéo, vì định ở lâu.',
      sfx: [['bonk', 0.3, 0.4], ['click', 'app', 0.4], ['boom', 'gate', 0.5], ['boing', 'mess', 0.4]],
      draw(k) {
        houseGate(k, { mess: k.t > k.cue('mess') });
        hud(k, H());
        for (let i = 0; i < 9; i++) angryHo(k, i, 120 + i * 210, G + 40, S * 0.62, { p: k.at(k.cue('gate', i * 0.08), 0.3) });
        app(k, 'withdraw', { amt: '286.000.000đ', p: k.at('app', 0.4) }, 1620, 420, 0.8);
        cap(k, '32 NGƯỜI HỌ HÀNG', 'gate', { color: '#ff8a7a', y: 330 });
      },
    },
    {
      say: 'Ba ngày trước, {stage}bạn là Leader bảy sao. {today}Hôm nay, bạn là người duy nhất trong họ mà ai cũng thuộc địa chỉ nhà.',
      sfx: [['tada', 'stage', 0.4], ['slideDown', 'today', 0.5]],
      draw(k) {
        if (k.t < k.cue('today')) {
          stage(k, { title: 'GALA LEADER 2026', sub: 'VINH DANH LEADER 7 SAO' });
          k.char(960, 880, S * 0.95, { ...TOAN, hat: null, color: '#1b2338', tie: '#f2c230', face: 'laugh', pose: 'cheer', shadow: false });
          sash(k, 960, 880, S * 0.95); crowd(k, 1); tint(k, '#f2d27a', 0.2);
          cap(k, 'BA NGÀY TRƯỚC', 0, { y: 120, size: 50, color: '#fff' });
          return;
        }
        houseGate(k, { mess: true });
        hud(k, H());
        k.char(960, G - 160, S * 0.8, { ...TOAN, hat: null, face: 'shock', pose: 'shrug', sweat: true, shadow: false });
        for (let i = 0; i < 9; i++) angryHo(k, i, 120 + i * 210, G + 40, S * 0.62);
        cap(k, 'AI CŨNG THUỘC ĐỊA CHỈ NHÀ', 'today', { color: '#f2c230', y: 330 });
      },
    },
    {
      say: 'Phần một là lúc đi lên, chưa xem thì link ở mô tả. {down}Đây là lúc đi xuống. {save}Và cuối tập này, sẽ có một người tới cứu bạn. {twist}Người đó, cũng muốn lấy nốt chỗ tiền còn lại.',
      sfx: [['slideDown', 'down', 0.5], ['sparkle', 'save', 0.4], ['boom', 'twist', 0.5]],
      draw(k) {
        paper(k, '#14161d');
        const { ctx } = k;
        ctx.strokeStyle = '#7fe0a8'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(200, 850); ctx.lineTo(900, 250); ctx.stroke();
        const dn = k.at('down', 1.2, 'in');
        ctx.strokeStyle = '#ff6b5a'; ctx.beginPath(); ctx.moveTo(900, 250); ctx.lineTo(900 + 80 * dn, 250 + 700 * dn); ctx.stroke();
        k.char(900 + 80 * dn, 240 + 700 * dn, 220, { ...TOAN, face: 'shock', pose: 'cheer', shadow: false });
        k.text('PHẦN 2: ĐI XUỐNG', 1400, 300, { size: 70, font: 'title', color: '#ff6b5a', fx: 'pop', p: k.at('down', 0.4) });
        k.char(1500, G, S * 0.9, { ...HO('#2b2f3d', { hair: 'short', shades: true, tie: '#c0392b' }), face: k.t > k.cue('twist') ? 'smug' : 'happy', pose: 'wave', p: pop(k, 'save'), alpha: 0.9 });
        k.text('?', 1500, 420, { size: 160, font: 'title', color: '#f2c230', fx: 'pop', p: k.at('twist', 0.4) });
      },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Phí mở khoá',
      say: 'Trưa hôm đó, app bật lại. {joy}Bạn mừng như bắt được vàng. {msg}Thông báo hiện lên: Để rút tiền, tài khoản cần xác minh. Phí xác minh: mười phần trăm số dư. {fee}Hai mươi tám triệu sáu.',
      sfx: [['ding', 0.3, 0.5], ['tada', 'joy', 0.4], ['pop', 'msg', 0.4], ['boom', 'fee', 0.5]],
      draw(k) {
        living(k);
        chapTop(k, '1 · Phí mở khoá');
        hud(k, H());
        k.char(560, G, S, { ...TOAN, hat: null, face: k.t > k.cue('fee') ? 'shock' : 'laugh', pose: k.t > k.cue('fee') ? 'shrug' : 'cheer' });
        phone(k, 1250, 540, 1.1, { screen: (kk, w, h) => {
          zena('wallet', { bal: '286 TRIỆU', lines: [] })(kk, w, h);
          if (kk.t > kk.cue('msg')) { kk.ctx.fillStyle = '#fff'; kk.ctx.beginPath(); kk.ctx.roundRect(-w / 2 + 16, -40, w - 32, 220, 16); kk.ctx.fill(); kk.text('XÁC MINH TÀI KHOẢN', 0, -5, { size: 24, font: 'title', color: '#1b1b24' }); kk.text('Phí 10% số dư', 0, 40, { size: 24, color: '#555' }); kk.text('28.600.000đ', 0, 100, { size: 36, font: 'title', color: '#d63a2f', p: kk.at('fee', 0.3) }); }
        } });
      },
    },
    {
      say: 'Đầu bạn bảo: lừa rồi. {heart}Tim bạn bảo: đã mất tám mươi tám triệu, thêm hai mươi tám triệu nữa là rút được hai trăm tám mươi sáu. {gamble}Đánh bạc thua thì phải gỡ. Đàn ông ai chẳng thế.',
      sfx: [['bonk', 0.3, 0.4], ['sparkle', 'heart', 0.4], ['drumroll', 'gamble', 0.3]],
      draw(k) {
        paper(k, '#1b1f2a');
        hud(k, H());
        k.char(960, G, S * 1.1, { ...TOAN, hat: null, face: k.t > k.cue('gamble') ? 'smug' : 'blank', pose: 'think' });
        k.bubble(180, 220, 560, 160, 800, 420, { p: k.at(0.3, 0.4), text: '🧠 Lừa rồi!', size: 54, think: true });
        k.bubble(1180, 220, 600, 200, 1100, 420, { p: k.at('heart', 0.4), text: '❤️ Nộp 28 tr → rút 286 tr!', size: 44, think: true });
        if (k.t > k.cue('gamble')) k.text('GỠ!', 960, 140, { size: 120, font: 'title', color: '#f2c230', fx: 'pop', p: k.at('gamble', 0.4), outline: '#1b1b24', outlineWidth: 14 });
      },
    },
    {
      say: 'Bạn dắt chiếc xe ga trao thưởng ra tiệm bán. {check}Ông chủ lật qua lật lại: {l1}Không giấy tờ, số khung bị mài. Bốn triệu, bán thì bán.{e1} {stolen}Hoá ra cái xe bạn tự hào nhất đời, là xe ăn trộm. {sell}Bạn bán bốn triệu, vay nóng thêm hai mươi lăm triệu, nộp phí.',
      sfx: [['click', 'check', 0.4], ['boom', 'stolen', 0.5], ['cash', 'sell', 0.5]],
      draw(k) {
        bikeShop(k);
        hud(k, H({ nap: [87.8, 116.4, 'sell', 1.2], no: [45, 70, 'sell', 1.2] }));
        moto(k, 960, G, 1.4, { scooter: true, color: '#f4efe6', bow: true });
        k.char(1460, G, S * 1.05, { ...BAY, color: '#3b3f46', scar: false, face: k.t > k.cue('l1') ? 'cold' : 'blank', pose: 'point', talk: spk(k, 'l1', 'e1'), flip: true, cig: true });
        k.char(460, G, S, { ...TOAN, hat: null, face: k.t > k.cue('stolen') ? 'shock' : 'blank', pose: k.t > k.cue('stolen') ? 'facepalm' : 'hold', sweat: k.t > k.cue('stolen') });
        if (k.t > k.cue('check')) { k.ctx.strokeStyle = '#d63a2f'; k.ctx.lineWidth = 10; k.ctx.beginPath(); k.ctx.ellipse(1010, 870, 120, 50, 0, 0, Math.PI * 2); k.ctx.stroke(); k.text('SỐ KHUNG BỊ MÀI', 1010, 780, { size: 40, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at('check', 0.4), outline: '#fff', outlineWidth: 8 }); }
        cap(k, 'XE ĂN TRỘM!', 'stolen', { color: '#ff6b5a', y: 160, size: 90 });
      },
    },
    {
      say: 'Nộp xong, màn hình báo: Xác minh thành công. Đang xử lý. {tax}Lần này có thêm một dòng nhỏ: Thuế thu nhập cá nhân, hai mươi phần trăm. {throw}Bạn ném điện thoại vào tường. {pick}Rồi bò ra nhặt lại, vì cái điện thoại còn đang trả góp.',
      sfx: [['ding', 0.4, 0.4], ['boom', 'tax', 0.5], ['bonk', 'throw', 0.8], ['boing', 'pick', 0.4]],
      draw(k) {
        living(k, { night: true });
        hud(k, H({ nap: 116.4, no: 70 }));
        const thrown = k.t > k.cue('throw') && k.t < k.cue('pick');
        if (k.t < k.cue('throw')) {
          k.char(560, G, S, { ...TOAN, hat: null, face: k.t > k.cue('tax') ? 'angry' : 'blank', vein: k.t > k.cue('tax'), pose: 'hold' });
          phone(k, 1250, 540, 1.1, { screen: (kk, w, h) => { zena('withdraw', { amt: '286.000.000đ' })(kk, w, h); if (kk.t > kk.cue('tax')) { kk.ctx.fillStyle = '#fff'; kk.ctx.fillRect(-w / 2 + 16, 150, w - 32, 90); kk.text('+ Thuế TNCN 20%', 0, 195, { size: 26, font: 'title', color: '#d63a2f' }); } } });
          return;
        }
        k.char(thrown ? 560 : 1150, G, S, { ...TOAN, hat: null, face: thrown ? 'shout' : 'cry', tears: thrown ? 0 : 0.6, pose: thrown ? 'fight' : { l: [80, 30], r: [80, 30] }, lean: thrown ? 0 : 0.5 });
        if (thrown) { const u = k.at('throw', 0.4, 'in'); phone(k, k.lerp(700, 1650, u), 500, 0.5, { r: u * 6, screen: zena('withdraw') }); if (u >= 1) k.burst(1650, 500, 120, 'BỐP!', { p: 1 }); }
        else phone(k, 1300, 880, 0.45, { r: 1.4, screen: zena('withdraw') });
        cap(k, '(CÒN ĐANG TRẢ GÓP)', 'pick', { color: '#f2c230' });
      },
    },

    {
      say: 'Đêm đó, bạn nhắn vào nhóm Gia Tộc AI để trấn an. {msg}Mọi người bình tĩnh, hệ thống đang nâng cấp, tiền vẫn còn nguyên. {seen}Ba mươi hai người xem. Không ai trả lời. {rename}Sáng hôm sau, bạn phát hiện cả họ đã đồng loạt đổi tên bạn trong danh bạ, thành: Toàn Lừa.',
      sfx: [['click', 'msg', 0.4], ['scratch', 'seen', 0.3], ['boom', 'rename', 0.5]],
      draw(k) {
        paper(k, '#e9f1fb');
        hud(k, H({ nap: 116.4, no: 70 }));
        if (k.t < k.cue('rename')) {
          zaloGroup(k, 560, 120, 820, 860, { title: 'GIA TỘC AI 👑', members: '32 thành viên', msgs: [{ name: 'Bạn', text: 'Mọi người bình tĩnh, hệ thống đang nâng cấp 🙏', cue: 'msg', me: true }], banner: 'Đã xem bởi 32 người', bannerCue: 'seen' });
        } else {
          phone(k, 960, 540, 1.3, { screen: (kk, w, h) => { kk.ctx.fillStyle = '#fff'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.text('DANH BẠ', 0, -h / 2 + 50, { size: 30, font: 'title', color: '#2e6da4' }); ['Toàn Lừa 🐍', 'Toàn Lừa (rể)', 'TOÀN LỪA ĐẢO', 'Thằng Toàn ❌', 'Toàn 7 sao lừa'].forEach((t, i) => kk.text(t, -w / 2 + 30, -h / 2 + 120 + i * 70, { size: 28, font: 'title', align: 'left', color: '#d63a2f', p: kk.at(kk.cue('rename', i * 0.2), 0.3) })); } });
        }
        k.char(300, G, S, { ...TOAN, hat: null, face: k.t > k.cue('rename') ? 'shock' : k.t > k.cue('seen') ? 'sad' : 'calm', pose: 'hold' });
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Toà nhà hai mươi tầng',
      say: '{bus}Bạn bắt xe khách đêm ra Hà Nội, tìm văn phòng in trên giấy phép. {tower}Toà nhà hai mươi tầng có thật. Tầng mười hai có thật. {empty}Văn phòng, thì trống trơn.',
      sfx: [['whoosh', 'bus', 0.4], ['ding', 'tower', 0.4], ['slideDown', 'empty', 0.5]],
      draw(k) {
        if (k.t < k.cue('tower')) { coachNight(k); chapTop(k, '2 · Toà nhà hai mươi tầng'); hud(k, H({ nap: 116.4, no: 70 })); return; }
        if (k.t < k.cue('empty')) {
          k.backdrop('day', { ground: G });
          const { ctx } = k; ctx.fillStyle = '#7f9fb8'; ctx.fillRect(760, 40, 400, 890); for (let r = 0; r < 20; r++) for (let c = 0; c < 6; c++) { ctx.fillStyle = r === 8 ? '#f2c230' : '#c9e3f7'; ctx.fillRect(780 + c * 64, 60 + r * 43, 48, 30); }
          k.text('TẦNG 12', 1300, 420, { size: 60, font: 'title', color: '#1b1b24', fx: 'pop', p: k.at('tower', 0.4), outline: '#fff', outlineWidth: 10 });
          k.char(500, G, S, { ...TOAN, hat: null, face: 'happy', pose: 'point' });
          hud(k, H({ nap: 116.4, no: 70 }));
          return;
        }
        emptyOffice(k);
        hud(k, H({ nap: 116.4, no: 70 }));
        k.char(500, G, S, { ...TOAN, hat: null, face: 'shock', pose: 'shrug' });
        cap(k, 'TRỐNG TRƠN', 'empty', { color: '#ff6b5a', y: 160, size: 90 });
      },
    },
    {
      say: 'Trên xe khách, ngồi cạnh bạn là một bà cụ, cũng đi Hà Nội tìm văn phòng Zena. {pension}Bà nạp gói mười bốn triệu chín, bằng tiền lương hưu của ba tháng. {look}Hai người nhìn nhau. Không ai nói gì. {why}Vì người giới thiệu cho bà, là một leader năm sao, ở tận tỉnh khác. Không phải bạn. Lần này thôi.',
      sfx: [['click', 0.3, 0.3], ['cash', 'pension', 0.4], ['scratch', 'look', 0.3]],
      draw(k) {
        paper(k, '#1b1f2a');
        hud(k, H({ nap: 116.4, no: 70 }));
        const { ctx } = k; ctx.fillStyle = '#2e4a6b'; ctx.fillRect(200, 560, 1520, 370); ctx.fillStyle = '#9fc4e8'; ctx.fillRect(260, 220, 1400, 300); tint(k, '#0d0f1a', 0.35);
        k.char(720, 900, S * 1.05, { ...TOAN, hat: null, face: k.t > k.cue('look') ? 'sad' : 'blank', look: k.t > k.cue('look') ? 1 : 0, pose: 'hold', shadow: false });
        k.char(1200, 900, S, { ...HO('#8a6a4f', { hair: 'bun', hairColor: '#ddd', body: 'chibiGirl' }), face: 'sad', look: k.t > k.cue('look') ? -1 : 0, pose: 'hold', shadow: false, flip: true });
        k.text('LƯƠNG HƯU 3 THÁNG', 1200, 180, { size: 54, font: 'title', color: '#f2c230', fx: 'pop', p: k.at('pension', 0.4), outline: '#1b1b24', outlineWidth: 10 });
      },
    },
    {
      say: 'Chỉ còn một chậu kim tiền héo, mấy cái ghế xoay, và tấm phông AI Đổi Đời rơi một góc. {peel}Chữ Đổi bị bong. Còn lại: AI ĐỜI. {guard}Bác bảo vệ bảo: {l1}Họ dọn đi từ tuần trước. Ngày nào cũng có người tới khóc, chú là người thứ hai trăm. {tea}Nước nóng ở góc kia, khóc xong thì tự rót.{e1}',
      sfx: [['slideDown', 'peel', 0.5], ['pop', 'guard', 0.4], ['click', 'tea', 0.4]],
      draw(k) {
        emptyOffice(k);
        hud(k, H({ nap: 116.4, no: 70 }));
        k.highlight(960, 660, 560, 200, { p: k.at('peel', 0.5), color: '#f2c230' });
        k.char(420, G, S, { ...TOAN, hat: null, face: k.t > k.cue('tea') ? 'cry' : 'blank', tears: k.at('tea', 1.5) * 0.7, pose: 'hold' });
        k.char(760, G, S * 0.95, { ...HO('#5d7a3a', { hair: 'short', hat: 'cap', hatColor: '#3a4d24', stubble: true }), face: 'blank', pose: k.t > k.cue('tea') ? 'point' : 'hold', talk: spk(k, 'l1', 'e1'), p: pop(k, 'guard') });
        k.text('#200', 760, 330, { size: 70, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at(k.cue('l1', 2), 0.4), outline: '#fff', outlineWidth: 10 });
      },
    },
    {
      say: 'Bạn gọi cho thằng Tí. Thuê bao. {fb}Bạn vào Facebook nó. Ảnh mới nhất: nó đang ở Phú Quốc, kèm đúng một chữ: chữa lành. {swear}Bạn chửi một câu to tới mức bác bảo vệ phải rót cho bạn thêm cốc nước nữa.',
      sfx: [['click', 0.3, 0.4], ['ding', 'fb', 0.5], ['boom', 'swear', 0.5]],
      draw(k) {
        emptyOffice(k);
        hud(k, H({ nap: 116.4, no: 70 }));
        const p = pop(k, 'fb');
        if (p > 0) k.group({ x: 1200, y: 520, s: p * 0.9, r: 0.03 }, () => {
          const { ctx } = k; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-460, -440, 920, 880, 24); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#ff7a59'; ctx.beginPath(); ctx.arc(-390, -380, 34, 0, Math.PI * 2); ctx.fill();
          k.text('Tí Leader 💎 · Phú Quốc', -340, -380, { size: 32, font: 'title', align: 'left', color: '#1b1b24' });
          ctx.fillStyle = '#5fc3e4'; ctx.fillRect(-430, -320, 860, 520); ctx.fillStyle = '#f2d27a'; ctx.fillRect(-430, 80, 860, 120);
          k.char(0, 180, 440, { ...TI, face: 'laugh', pose: 'cheer', shadow: false });
          k.text('Chữa lành 🌴', 0, 280, { size: 46, font: 'title', color: '#1b1b24' });
        });
        k.char(330, G, S, { ...TOAN, hat: null, face: k.t > k.cue('swear') ? 'shout' : 'angry', vein: true, pose: k.t > k.cue('swear') ? 'shout' : 'hold' });
        if (k.t > k.cue('swear')) k.burst(560, 300, 130, '#@%&!!', { p: k.at('swear', 0.3) });
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      chapter: 'Gia tộc AI',
      say: 'Về tới nhà, {lock}cổng sắt đã bị ai đó khoá bằng một cái khoá xe máy. {in}Bên trong là vợ con bạn. {out}Bên ngoài, là cả họ.',
      sfx: [['click', 'lock', 0.6], ['pop', 'in', 0.4], ['boom', 'out', 0.5]],
      draw(k) {
        houseGate(k, { lock: k.t > k.cue('lock'), mess: true });
        chapTop(k, '3 · Gia tộc AI');
        hud(k, H({ nap: 116.4, no: 70 }));
        k.char(860, 780, S * 0.6, { ...HANH, face: 'sad', pose: 'hold', shadow: false, p: pop(k, 'in') });
        k.char(1060, 780, S * 0.6, { ...LINH, face: 'sad', pose: 'hold', shadow: false, p: pop(k, 'in') });
        for (let i = 0; i < 8; i++) angryHo(k, i, 120 + i * 240, G + 50, S * 0.65, { p: k.at(k.cue('out', i * 0.06), 0.3) });
        if (k.t > k.cue('lock')) k.text('🔒', 960, 600, { size: 70, fx: 'pop', p: k.at('lock', 0.3) });
      },
    },
    {
      say: 'Cậu Ba đòi tiền. {ut}Dì Út khóc. {re}Anh rể xắn tay áo: {l1}Thằng chó, ra đây!{e1} {tg}Ông thông gia bên nội thì vẫn chẳng ai biết ông dính gì tới họ này, nhưng chửi to nhất.',
      sfx: [['boing', 0.3, 0.4], ['slideDown', 'ut', 0.4], ['boom', 'l1', 0.5], ['bonk', 'tg', 0.5]],
      draw(k) {
        houseGate(k, { lock: true, mess: true });
        hud(k, H({ nap: 116.4, no: 70 }));
        angryHo(k, 0, 300, G + 20, S * 0.9, { p: 1 });
        angryHo(k, 1, 650, G + 20, S * 0.9, { face: 'cry', tears: 1, pose: 'facepalm', p: pop(k, 'ut') });
        angryHo(k, 2, 1050, G + 20, S * 0.95, { face: 'angry', vein: true, pose: 'fight', talk: spk(k, 'l1', 'e1'), p: pop(k, 're') });
        angryHo(k, 3, 1500, G + 20, S, { face: 'shout', vein: true, flush: 0.6, pose: 'shout', talk: k.t > k.cue('tg') ? k.talk() : 0, p: pop(k, 'tg') });
        k.bubble(880, 160, 460, 140, 1050, 400, { p: k.at('l1', 0.4) * (k.t < k.cue('tg') ? 1 : 0), text: 'Thằng chó, ra đây!', size: 46 });
        if (k.t > k.cue('tg')) k.burst(1500, 240, 130, '#@!%&!!!', { p: k.at('tg', 0.3) });
      },
    },
    {
      say: 'Mợ Hai dựng điện thoại trước cổng, livestream: {title}Bóc phốt leader lừa đảo, ngay tại nhà riêng. {views}Hai nghìn người xem. {irony}Đông hơn mọi buổi livestream của cô gái ảo bán nồi chiên cộng lại.',
      sfx: [['click', 0.3, 0.4], ['pop', 'title', 0.4], ['ding', 'views', 0.4], ['boing', 'irony', 0.4]],
      draw(k) {
        houseGate(k, { lock: true, mess: true });
        hud(k, H({ nap: 116.4, no: 70 }));
        k.char(560, G + 20, S, { ...HO('#e8b84a', { hair: 'perm', body: 'chibiGirl' }), face: 'laugh', pose: 'point', talk: k.talk() });
        phone(k, 1150, 520, 1.1, { r: 0.05, screen: (kk, w, h) => {
          kk.ctx.fillStyle = '#c9b38f'; kk.ctx.fillRect(-w / 2, -h / 2, w, h);
          kk.char(0, h / 2 - 20, h * 0.6, { ...TOAN, hat: null, face: 'shock', pose: 'shrug', shadow: false });
          kk.ctx.fillStyle = '#d63a2f'; kk.ctx.fillRect(-w / 2 + 14, -h / 2 + 20, 70, 30); kk.text('LIVE', -w / 2 + 49, -h / 2 + 36, { size: 20, font: 'title', color: '#fff' });
          kk.text(`👁 ${Math.min(2000, Math.floor(Math.max(0, kk.t - kk.cue('views')) * 900))}`, w / 2 - 70, -h / 2 + 36, { size: 22, font: 'title', color: '#fff' });
          kk.text('BÓC PHỐT LEADER', 0, -h / 2 + 100, { size: 26, font: 'title', color: '#fff', p: kk.at('title', 0.3) });
        } });
        cap(k, '2.000 MẮT XEM', 'views', { color: '#f2c230', y: 180 });
      },
    },
    {
      say: 'Ông Bảy chột với ông Hai còi dắt mất chiếc Wave của bạn, cái xe kiếm cơm ba mươi năm. {l1}Xe này trừ nợ.{e1} {l2}Tao nạp tám mươi tư, xe mày đáng mười, còn bảy mươi tư tao ghi sổ.{e2} {gone}Bạn đứng nhìn chiếc Wave đi xa, như nhìn người yêu cũ đi lấy chồng.',
      sfx: [['bonk', 'l1', 0.4], ['click', 'l2', 0.4], ['whoosh', 'gone', 0.4]],
      draw(k) {
        houseGate(k, { lock: true });
        hud(k, H({ nap: 116.4, no: 70 }));
        const x = k.lerp(900, 2300, k.at('gone', 3, 'in'));
        moto(k, x, G, 1.3, { color: '#3d7fc1' });
        k.char(x - 80, G - 10, S * 0.9, { ...BAY, face: 'smug', pose: 'hold', talk: spk(k, 'l1', 'e1'), walk: k.t > k.cue('gone') });
        k.char(x + 220, G - 10, S * 0.9, { ...HAI, face: 'cold', pose: 'present', talk: spk(k, 'l2', 'e2'), walk: k.t > k.cue('gone') });
        k.char(360, G, S, { ...TOAN, hat: null, face: k.t > k.cue('gone') ? 'cry' : 'shock', tears: k.at('gone', 1.5), pose: k.t > k.cue('gone') ? 'wave' : 'shrug' });
        k.text('84 − 10 = 74 GHI SỔ', 1200, 200, { size: 56, font: 'title', color: '#1b1b24', fx: 'pop', p: k.at('l2', 0.4) * (k.t < k.cue('gone') ? 1 : 0), outline: '#fff', outlineWidth: 10 });
        if (k.t > k.cue('gone')) k.text('💔', 520, 330, { size: 110, fx: 'pop', p: k.at('gone', 0.4) });
      },
    },
    {
      say: 'Trong nhà, cái iPad trao thưởng tự nhiên tắt ngúm. {flip}Bé Linh lật mặt sau: {apple}quả táo, bị cắn hai miếng. {fake}Hàng nhái. Mà nhái cũng không tới nơi.',
      sfx: [['click', 0.3, 0.4], ['whoosh', 'flip', 0.4], ['boing', 'apple', 0.5]],
      draw(k) {
        living(k);
        hud(k, H({ nap: 116.4, no: 70 }));
        k.char(560, G, S, { ...LINH, face: k.t > k.cue('apple') ? 'cold' : 'blank', pose: 'hold' });
        const flipped = k.t > k.cue('flip');
        k.group({ x: 1150, y: 520, s: 1.6 }, () => {
          const { ctx } = k; ctx.fillStyle = flipped ? '#c9ced4' : '#1b1b24'; ctx.beginPath(); ctx.roundRect(-130, -90, 260, 180, 16); ctx.fill();
          if (flipped && k.t > k.cue('apple')) { ctx.fillStyle = '#1b1b24'; ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#c9ced4'; for (const [bx, by] of [[38, -10], [30, 22]]) { ctx.beginPath(); ctx.arc(bx, by, 16, 0, Math.PI * 2); ctx.fill(); } }
        });
        cap(k, 'TÁO BỊ CẮN 2 MIẾNG', 'apple', { color: '#f2c230' });
      },
    },
    {
      say: 'Tối đó, vợ bạn nằm quay lưng vào tường. {stars}Ba tháng trước, hai vợ chồng cùng nhau lên sao. {down}Giờ thì cùng nhau xuống sao. Mỗi người một bên giường.',
      sfx: [['slideDown', 'down', 0.5]],
      draw(k) {
        living(k, { night: true });
        hud(k, H({ nap: 116.4, no: 70 }));
        const { ctx } = k; ctx.fillStyle = '#e8b84a'; ctx.fillRect(360, 780, 1200, 150);
        k.char(560, 790, S * 0.75, { ...TOAN, hat: null, face: 'sad', shadow: false, lean: -0.15 });
        k.char(1360, 790, S * 0.75, { ...HANH, face: 'cold', shadow: false, flip: true, lean: 0.15, look: 1 });
        k.text('★ ★ ★', 960, 260, { size: 90, color: '#f2c230', fx: 'fade', p: 1 - k.at('down', 1.5) });
        if (k.t > k.cue('down')) { k.ctx.strokeStyle = '#fff'; k.ctx.setLineDash([16, 14]); k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.moveTo(960, 560); k.ctx.lineTo(960, 930); k.ctx.stroke(); k.ctx.setLineDash([]); }
        tint(k, '#0d0f1a', 0.25);
      },
    },
    {
      say: 'Còn bà Lựu, người nạp nhiều nhất, {no}thì không tới. Không gọi. Không nhắn. {fear}Mười tám năm, bạn sợ nhất là bà chửi. {worse}Hoá ra cái im lặng của bà, còn đáng sợ hơn.',
      sfx: [['scratch', 'no', 0.3], ['slideDown', 'worse', 0.5]],
      draw(k) {
        paper(k, '#14161d');
        hud(k, H({ nap: 116.4, no: 70 }));
        phone(k, 560, 540, 1.1, { screen: (kk, w, h) => { kk.ctx.fillStyle = '#eef3f8'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.text('Mẹ Lựu', 0, -200, { size: 34, font: 'title', color: '#1b1b24' }); kk.text('Đã xem · 3 ngày trước', 0, -150, { size: 22, color: '#888' }); kk.text('…', 0, 40, { size: 80, color: '#aaa' }); } });
        k.char(1300, G, S * 1.1, { ...LUU, face: 'cold', gloom: k.at('worse', 1.5), pose: 'hips', alpha: 0.85 });
        cap(k, '……', 'worse', { color: '#fff', size: 120 });
      },
    },

    {
      say: 'Tháng đó, bé Linh xin đi bưng bê ở quán nhậu đầu ngõ, mỗi tối năm tiếng. {fee}Tiền học kỳ đầu mười hai triệu, con tự lo. {night}Mười một giờ đêm, bạn đứng ngoài quán đợi con về. Lần đầu tiên trong đời, bạn chở khách mà không lấy tiền.',
      sfx: [['click', 0.3, 0.4], ['cash', 'fee', 0.4], ['sparkle', 'night', 0.3]],
      draw(k) {
        nightRoad(k);
        hud(k, H({ nap: 116.4, no: 70 }));
        const { ctx } = k; ctx.fillStyle = '#c0392b'; ctx.fillRect(1100, 380, 700, 90); k.text('QUÁN NHẬU 68', 1450, 426, { size: 46, font: 'title', color: '#f2c230' }); ctx.fillStyle = '#5a3a24'; ctx.fillRect(1100, 470, 700, 460); lamp2(k);
        k.char(1400, G, S, { ...LINH, color: '#2e6da4', face: 'calm', pose: 'hold', p: 1 });
        k.text('12 TRIỆU · CON TỰ LO', 1400, 300, { size: 46, font: 'title', color: '#fff', fx: 'pop', p: k.at('fee', 0.4), outline: '#1b1b24', outlineWidth: 10 });
        k.char(600, G, S * 0.95, { ...TOAN, face: k.t > k.cue('night') ? 'cry' : 'sad', tears: k.at('night', 1.5) * 0.6, pose: 'hold', p: k.t > k.cue('night') ? 1 : 0.0001 });
        if (k.t > k.cue('night')) moto(k, 420, G, 1.2, { color: '#8a8f98' });
      },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Luật sư thu hồi',
      say: 'Ba ngày sau, một số lạ gọi tới, giọng rất lịch sự. {l1}Em là luật sư văn phòng thu hồi tài sản quốc tế. Bên em có danh sách nạn nhân Zena AI, có tên anh. {pct}Bên em lấy lại được trăm phần trăm. Phí mười lăm phần trăm, xong việc mới thu.{e1}',
      sfx: [['ding', 0.3, 0.5], ['sparkle', 'pct', 0.5]],
      draw(k) {
        living(k);
        chapTop(k, '4 · Luật sư thu hồi');
        hud(k, H({ nap: 116.4, no: 70 }));
        k.char(480, G, S, { ...TOAN, hat: null, face: k.t > k.cue('pct') ? 'happy' : 'blank', pose: 'hold' });
        phone(k, 1300, 520, 1.1, { screen: (kk, w, h) => { kk.ctx.fillStyle = '#1f2a44'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.char(0, h / 2 - 40, h * 0.6, { ...HO('#2b2f3d', { hair: 'short', shades: true, tie: '#c0392b' }), face: 'happy', talk: spk(kk, 'l1', 'e1'), pose: 'present', shadow: false }); kk.text('LS. Thu hồi QT ⚖️', 0, -h / 2 + 40, { size: 26, font: 'title', color: '#fff' }); } });
        k.text('LẤY LẠI 100%', 1300, 160, { size: 70, font: 'title', color: '#3fb86a', fx: 'pop', p: k.at('pct', 0.4), outline: '#fff', outlineWidth: 10 });
      },
    },
    {
      say: 'Bạn như người chết đuối vớ được cọc. {docs}Luật sư gửi giấy phép, con dấu, ảnh văn phòng, còn đầy đủ hơn cả Zena. {l1}Trước tiên anh nộp phí hồ sơ hai triệu chín, đổi sang USDT, chuyển vào ví này nhé.{e1}',
      sfx: [['pop', 'docs', 0.4], ['cash', 'l1', 0.4]],
      draw(k) {
        paper(k, '#e9f1fb');
        hud(k, H({ nap: 116.4, no: 70 }));
        k.char(340, G, S, { ...TOAN, hat: null, face: 'happy', pose: 'hold' });
        chat(k, 640, 220, '📄 Giấy phép hoạt động.pdf', { p: k.at('docs', 0.3) });
        chat(k, 640, 330, '🔴 Con dấu đỏ chót', { p: k.at(k.cue('docs', 0.4), 0.3) });
        chat(k, 640, 440, '🏢 Văn phòng 30 tầng', { p: k.at(k.cue('docs', 0.8), 0.3) });
        chat(k, 640, 590, 'Phí hồ sơ: 2.900.000đ → USDT 💱', { p: k.at('l1', 0.3), size: 40 });
        chat(k, 640, 700, 'Ví: TQx8…9fK3', { p: k.at(k.cue('l1', 1.5), 0.3) });
        k.text('2,9 TRIỆU?!', 1500, 900, { size: 80, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at(k.cue('l1', 1), 0.4), outline: '#fff', outlineWidth: 12 });
      },
    },
    {
      say: 'Hai triệu chín. Đúng con số ngày đầu tiên. {atm}Bạn đứng ở cây ATM, ngón tay đặt trên nút chuyển. {grab}Đúng lúc ấy, bé Linh giật phắt cái điện thoại. {l1}Bố! Lừa đảo nó cũng có khuyến mãi lần hai đấy!{e1}',
      sfx: [['drumroll', 'atm', 0.3], ['whoosh', 'grab', 0.6], ['boom', 'l1', 0.5]],
      draw(k) {
        atmBooth(k);
        hud(k, H({ nap: 116.4, no: 70 }));
        const grabbed = k.t > k.cue('grab');
        k.char(1100, G, S, { ...TOAN, hat: null, face: grabbed ? 'shock' : 'blank', pose: grabbed ? 'shrug' : { l: [12, 6], r: [80, -30] }, sweat: !grabbed });
        k.char(grabbed ? 720 : -300, G, S, { ...LINH, face: 'angry', vein: true, pose: 'shout', talk: spk(k, 'l1', 'e1') });
        if (grabbed) phone(k, 820, 560, 0.5, { r: -0.4, screen: zena('wallet', { bal: '2.900.000đ', lines: ['→ USDT'] }) });
        if (grabbed) k.burst(720, 250, 120, 'GIẬT!', { p: k.at('grab', 0.3) });
        cap(k, 'KHUYẾN MÃI LẦN HAI', 'l1', { color: '#f2c230' });
      },
    },
    {
      say: 'Bạn đứng giữa vỉa hè, khóc như đứa trẻ. {hug}Đứa con gái mười tám tuổi ôm ông bố năm mươi hai tuổi. {pass}Người đi đường tưởng hai bố con vừa trượt đại học.',
      sfx: [['slideDown', 0.3, 0.3], ['sparkle', 'hug', 0.3], ['pop', 'pass', 0.4]],
      draw(k) {
        atmBooth(k);
        hud(k, H({ nap: 116.4, no: 70 }));
        k.char(900, G, S * 1.05, { ...TOAN, hat: null, face: 'cry', tears: 1, pose: 'hold' });
        k.char(1080, G, S * 0.95, { ...LINH, face: 'sad', tears: 0.5, pose: { l: [80, -60], r: [80, -60] }, flip: true, p: pop(k, 'hug') });
        k.char(k.lerp(-200, 400, k.at('pass', 3, 'linear')), G, S * 0.8, { ...HO('#8a8f98', { hair: 'bun', body: 'chibiGirl' }), face: 'sad', walk: true, look: 1, pose: 'hold', p: k.t > k.cue('pass') ? 1 : 0 });
        k.bubble(80, 220, 480, 130, 260, 420, { p: k.at(k.cue('pass', 1.2), 0.4), text: 'Tội, trượt đại học à…', size: 36, think: true });
      },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Chuyến công tác',
      say: 'Bạn lên công an tỉnh trình báo. {crowd}Phòng tiếp dân đông như chợ. {ho}Ba mươi hai người họ của bạn ở đó. Ông Bảy, ông Hai cũng ở đó. {ti}Và cả thằng Tí, mặt bơ phờ.',
      sfx: [['click', 0.3, 0.4], ['boing', 'crowd', 0.4], ['pop', 'ti', 0.5]],
      draw(k) {
        policeHall(k);
        chapTop(k, '5 · Chuyến công tác');
        hud(k, H({ nap: 116.4, no: 70 }));
        for (let i = 0; i < 12; i++) angryHo(k, i, 100 + (i % 6) * 330, i < 6 ? 800 : G + 60, S * 0.55, { face: 'sad', pose: 'hold', p: k.at(k.cue('crowd', i * 0.05), 0.3) });
        k.char(700, G + 40, S * 0.9, { ...TOAN, hat: null, face: 'blank', pose: 'hold' });
        k.char(1250, G + 40, S * 0.9, { ...TI, shades: false, face: 'sad', gloom: 0.7, pose: 'hold', p: pop(k, 'ti') });
      },
    },
    {
      say: 'Bạn được phát một tờ đơn trình báo. {amt}Mục số tiền bị chiếm đoạt, bạn ghi: tám mươi bảy triệu tám. {ref}Đến mục số người bạn đã giới thiệu, bạn ngồi đếm. {count}Hết ngón tay, sang ngón chân. Vẫn chưa đủ.',
      sfx: [['click', 0.3, 0.4], ['pop', 'amt', 0.4], ['drumroll', 'ref', 0.3], ['boing', 'count', 0.4]],
      draw(k) {
        policeHall(k);
        hud(k, H({ nap: 116.4, no: 70 }));
        k.rect(980, 180, 760, 620, { fill: '#fffdf6', width: 5 });
        k.text('ĐƠN TRÌNH BÁO', 1360, 240, { size: 46, font: 'title', color: '#b8322a' });
        k.text('Số tiền bị chiếm đoạt:', 1020, 340, { size: 32, align: 'left', color: '#1b1b24' });
        k.text('87.800.000đ', 1360, 400, { size: 50, font: 'title', color: '#1b1b24', fx: 'write', p: k.at('amt', 1, 'linear') });
        k.text('Số người đã giới thiệu:', 1020, 500, { size: 32, align: 'left', color: '#1b1b24', p: k.at('ref', 0.3) });
        const n = Math.min(32, Math.floor(Math.max(0, k.t - k.cue('count')) * 8));
        k.text(n ? '|'.repeat(Math.min(n, 20)) + (n > 20 ? ' …' : '') : '', 1360, 580, { size: 44, font: 'title', color: '#d63a2f' });
        k.char(560, G + 40, S, { ...TOAN, hat: null, face: k.t > k.cue('count') ? 'shock' : 'blank', pose: k.t > k.cue('count') ? 'shrug' : 'think', sweat: k.t > k.cue('count') });
      },
    },
    {
      say: 'Hoá ra Tí mất nhiều hơn bạn: hai tỷ. {why}Nó nạp hết hoa hồng vào gói cao hơn để lên sao. {pq}Chuyến Phú Quốc là chuyến du lịch thưởng, đi bằng chính tiền của nó. {heal}Chữa lành, theo đúng nghĩa đen.',
      sfx: [['boom', 0.3, 0.5], ['cash', 'why', 0.4], ['sparkle', 'pq', 0.3], ['bonk', 'heal', 0.4]],
      draw(k) {
        policeHall(k);
        hud(k, H({ nap: 116.4, no: 70 }));
        k.char(1000, G + 40, S * 1.1, { ...TI, shades: false, face: 'cry', tears: 1, pose: 'facepalm' });
        counter(k, 1000, 260, 2000, '', 0.3, 1.2, { fmt: (v) => v >= 1000 ? `MẤT ${String(Math.round(v / 100) / 10).replace('.', ',')} TỶ` : `MẤT ${v} TRIỆU`, size: 100, color: '#d63a2f' });
        k.char(500, G + 40, S * 0.9, { ...TOAN, hat: null, face: 'shock', pose: 'hold' });
        cap(k, 'CHỮA LÀNH (NGHĨA ĐEN)', 'heal', { color: '#f2c230' });
      },
    },
    {
      say: 'Anh cán bộ thụ lý giải thích. {nation}Cả nước có chừng bốn mươi nghìn người như các anh. Hơn bốn trăm tỷ đồng. {nothing}App không bán được cái gì cả. Không gian hàng, không đơn hàng, không khách hàng. {ponzi}Tiền người sau trả lãi cho người trước. {girl}Cô gái ảo bán nồi chiên, chỉ là một cái video lặp đi lặp lại.',
      sfx: [['pop', 'nation', 0.4], ['boom', 'nothing', 0.5], ['click', 'ponzi', 0.4], ['slideDown', 'girl', 0.4]],
      draw(k) {
        policeHall(k);
        hud(k, H({ nap: 116.4, no: 70 }));
        k.char(1450, G + 40, S * 1.05, { ...TOAN, color: '#5d7a3a', hat: 'police', epaulet: true, hair: 'short', stubble: false, belly: 0.3, face: 'calm', pose: 'present', talk: k.talk(), flip: true });
        k.rect(160, 240, 960, 520, { fill: '#fffdf6', width: 5, p: k.at('nation', 0.3) });
        k.text('~40.000 NGƯỜI · >400 TỶ', 640, 310, { size: 52, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at('nation', 0.4) });
        ['✗ Gian hàng', '✗ Đơn hàng', '✗ Khách hàng'].forEach((t, i) => k.text(t, 260, 410 + i * 70, { size: 46, font: 'title', align: 'left', color: '#1b1b24', fx: 'pop', p: k.at(k.cue('nothing', i * 0.4), 0.3) }));
        if (k.t > k.cue('ponzi')) { k.arrow(780, 600, 1000, 430, { stroke: '#2e6da4', width: 8, p: k.at('ponzi', 0.5) }); k.text('NGƯỜI SAU → NGƯỜI TRƯỚC', 900, 690, { size: 34, font: 'title', color: '#2e6da4' }); }
        if (k.t > k.cue('girl')) phone(k, 1000, 520, 0.6, { screen: zena('live'), p: k.at('girl', 0.4) });
      },
    },
    {
      say: 'Bạn hỏi: Thế còn ông Chủ tịch? {sigh}Anh cán bộ thở dài. Người đứng tên trên giấy tờ thì đang bị điều tra. {boss}Còn người cầm đầu thật, người nước ngoài, đã rời Việt Nam từ hai tháng trước khi app sập. {flash}Bạn nhớ lại câu: Tháng sau tôi đi công tác nước ngoài, anh em cứ yên tâm. {one}Ông ấy đi công tác thật. Chỉ là chuyến công tác một chiều.',
      sfx: [['boing', 0.3, 0.4], ['slideDown', 'sigh', 0.3], ['whoosh', 'boss', 0.5], ['scratch', 'flash', 0.4], ['boom', 'one', 0.6]],
      draw(k) {
        if (k.t > k.cue('flash') && k.t < k.cue('one')) {
          stage(k, { title: 'HẸN GẶP LẠI!' }); tint(k, '#f2d27a', 0.25);
          k.char(960, 900, S * 1.1, { ...CHUTICH, face: 'smug', pose: 'wave', shadow: false });
          cap(k, 'HỒI TƯỞNG', 'flash', { y: 120, size: 44, color: '#fff' });
          return;
        }
        k.backdrop('day', { ground: G });
        hud(k, H({ nap: 116.4, no: 70 }));
        const t = k.at('boss', 4, 'inOut');
        k.text('✈', k.lerp(300, 1700, t), k.lerp(600, 180, t), { size: 160, color: '#1b1b24' });
        k.text('VIỆT NAM →', 300, 820, { size: 50, font: 'title', color: '#1b1b24', fx: 'fade', p: k.at('boss', 0.4) });
        k.text('2 THÁNG TRƯỚC KHI SẬP', 1300, 820, { size: 50, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at(k.cue('boss', 1.5), 0.4), outline: '#fff', outlineWidth: 10 });
        if (k.t > k.cue('one')) { cap(k, 'VÉ MỘT CHIỀU', 'one', { color: '#ff6b5a', y: 400, size: 110 }); }
      },
    },
    {
      say: 'Anh cán bộ nói thêm. {l1}Mới thu hồi được một phần rất nhỏ. Các anh chuẩn bị tinh thần.{e1} {turn}Ba mươi hai người họ quay sang nhìn bạn. {quiet}Lần này, không ai chửi. {why}Vì ai cũng nhớ, chính mình cũng từng kéo thêm người.',
      sfx: [['slideDown', 'l1', 0.4], ['scratch', 'turn', 0.3]],
      draw(k) {
        policeHall(k);
        hud(k, H({ nap: 116.4, no: 70 }));
        for (let i = 0; i < 12; i++) angryHo(k, i, 100 + (i % 6) * 330, i < 6 ? 800 : G + 60, S * 0.55, { face: k.t > k.cue('quiet') ? 'sad' : 'cold', look: k.t > k.cue('turn') ? (i % 6 < 2 ? 1 : -1) : 0, pose: 'hold', gloom: k.at('why', 1) * 0.5 });
        k.char(700, G + 40, S * 0.9, { ...TOAN, hat: null, face: 'sad', pose: 'hold' });
        if (k.t > k.cue('why')) for (let i = 0; i < 6; i++) k.arrow(100 + i * 330, 560, 100 + ((i + 2) % 6) * 330, 520, { stroke: 'rgba(255,90,74,0.6)', width: 5, bend: 0.4, p: k.at(k.cue('why', i * 0.15), 0.4) });
        cap(k, 'AI CŨNG TỪNG KÉO THÊM NGƯỜI', 'why', { color: '#fff' });
      },
    },

    // ===== CHƯƠNG 6 =====
    {
      chapter: 'Mâm trẻ con',
      say: 'Giỗ ông ngoại năm sau. {land}Nhà bà Lựu không còn mảnh đất hương hoả. Mâm cỗ cũng bớt đi một mâm. {kids}Bạn tự giác bưng bát, xuống mâm trẻ con.',
      sfx: [['scratch', 'land', 0.3], ['pop', 'kids', 0.4]],
      draw(k) {
        feast(k, { grandpa: 'sad' });
        chapTop(k, '6 · Mâm trẻ con');
        hud(k, { nap: 116.4, rut: 31, no: 70 });
        mam(k, 1350, G + 70, 1.1);
        for (const [x, c] of [[1200, '#3d7fc1'], [1500, '#f29bb8']]) k.char(x, G - 20, S * 0.85, { ...HO(c), face: 'blank', shadow: false });
        k.char(480, G + 30, S * 0.9, { ...TOAN, face: 'blank', pose: 'hold', shadow: false, p: pop(k, 'kids') });
        mam(k, 480, G + 90, 1, { kids: true });
        k.text('MÂM TRẺ CON', 480, 380, { size: 44, font: 'title', color: '#fff', fx: 'pop', p: k.at('kids', 0.4), outline: '#1b1b24', outlineWidth: 10 });
      },
    },
    {
      say: 'Đang ăn thì bà Lựu bưng bát của bà đi xuống, ngồi cạnh bạn. {silent}Cả họ im phăng phắc. {wing}Bà gắp cho bạn một cái cánh gà. Không phải đùi. {l1}Ngồi đây cũng được.{e1} {later}Một lúc sau, bà nói nhỏ. {l2}Tao cũng tham. Không phải mình mày.{e2}',
      sfx: [['pop', 0.4, 0.4], ['scratch', 'silent', 0.3], ['pop', 'wing', 0.4]],
      draw(k) {
        feast(k, { grandpa: 'sad' });
        hud(k, { nap: 116.4, rut: 31, no: 70 });
        const x = k.lerp(1400, 760, k.at(0.3, 2, 'inOut'));
        k.char(x, G + 30, S * 0.95, { ...LUU, face: k.t > k.cue('l2') ? 'sad' : 'blank', tears: k.t > k.cue('l2') ? 0.4 : 0, pose: 'hold', shadow: false, talk: spk(k, 'l1', 'e1') + spk(k, 'l2', 'e2'), walk: k.t < 2.3, flip: true });
        k.char(480, G + 30, S * 0.9, { ...TOAN, face: k.t > k.cue('l2') ? 'cry' : 'shock', tears: k.at('l2', 1.5) * 0.6, pose: 'hold', shadow: false });
        mam(k, 620, G + 90, 1.05, { kids: true });
        if (k.t > k.cue('wing')) { const { ctx } = k; ctx.fillStyle = '#d9862b'; ctx.beginPath(); ctx.moveTo(560, 760); ctx.quadraticCurveTo(620, 700, 660, 760); ctx.quadraticCurveTo(620, 790, 560, 760); ctx.fill(); }
        k.bubble(900, 220, 560, 140, 820, 420, { p: k.at('l2', 0.4), text: 'Tao cũng tham. Không phải mình mày.', size: 36 });
      },
    },
    {
      say: 'Cổng bệnh viện, một buổi sáng. {bike}Bạn chạy xe ôm lại, bằng chiếc xe cũ thuê của ông Bảy, ba mươi nghìn một ngày. {bal}Số dư: ba trăm hai mươi nghìn. Đúng như ngày đầu tiên. {cap}Bạn mở một chai C2, lật nắp: Chúc bạn may mắn lần sau.',
      sfx: [['scratch', 0.2, 0.3], ['click', 'bike', 0.4], ['cash', 'bal', 0.4], ['pop', 'cap', 0.5]],
      draw(k) {
        hospitalGate(k);
        moto(k, 700, G, 1.4, { color: '#8a8f98' });
        k.char(680, G - 95, S * 0.95, { ...TOAN, face: k.t > k.cue('cap') ? 'smug' : 'blank', pose: 'hold', shadow: false });
        counter(k, 960, 160, 320, '', 'bal', 1, { fmt: (v) => `SỐ DƯ: ${v} NGHÌN`, size: 80, color: '#d63a2f' });
        c2(k, 1150, 900, 1.2, {});
        if (k.t > k.cue('cap')) k.group({ x: 1450, y: 560, s: k.ease.back(Math.min(1, k.at('cap', 0.5))) }, () => { const { ctx } = k; ctx.fillStyle = '#3a8a4a'; ctx.beginPath(); ctx.arc(0, 0, 150, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 8; ctx.stroke(); k.text('CHÚC BẠN', 0, -30, { size: 40, font: 'title', color: '#fff' }); k.text('MAY MẮN', 0, 20, { size: 40, font: 'title', color: '#fff' }); k.text('LẦN SAU', 0, 70, { size: 34, font: 'title', color: '#f2c230' }); });
      },
    },
    {
      say: 'Điện thoại ting ting. {notif}AI ba chấm không ra mắt. Xem video một phút, nhận hai triệu mỗi ngày. {sale}Khuyến mãi, chỉ còn một triệu chín. {look}Bạn nhìn rất lâu. {del}Rồi bấm xoá. {ride}Rồi chở khách. Lần này, bạn nhìn đường.',
      sfx: [['ding', 0.2, 0.6], ['pop', 'notif', 0.4], ['cash', 'sale', 0.4], ['click', 'del', 0.7], ['whoosh', 'ride', 0.4]],
      draw(k) {
        hospitalGate(k);
        if (k.t < k.cue('ride')) {
          moto(k, 700, G, 1.4, { color: '#8a8f98' });
          k.char(680, G - 95, S * 0.95, { ...TOAN, face: k.t > k.cue('del') ? 'smug' : 'blank', pose: 'hold', shadow: false, lookY: 1 });
          phone(k, 1300, 520, 1.1, { screen: (kk, w, h) => {
            zena('live')(kk, w, h);
            const gone = kk.t > kk.cue('del'), p = kk.at('notif', 0.3) * (gone ? 1 - kk.at('del', 0.4) : 1);
            if (p > 0) { kk.ctx.save(); kk.ctx.globalAlpha = p; kk.ctx.fillStyle = '#fff'; kk.ctx.beginPath(); kk.ctx.roundRect(-w / 2 + 14, -h / 2 + 60, w - 28, 200, 16); kk.ctx.fill(); kk.text('Zena AI 3.0 🚀', 0, -h / 2 + 100, { size: 26, font: 'title', color: '#1b1b24' }); kk.text('1 phút = 2 triệu/ngày', 0, -h / 2 + 150, { size: 24, color: '#1b1b24' }); if (kk.t > kk.cue('sale')) kk.text('KM chỉ 1.900.000đ', 0, -h / 2 + 205, { size: 26, font: 'title', color: '#d63a2f' }); kk.ctx.restore(); }
            if (gone) kk.text('🗑 Đã xoá', 0, 120, { size: 34, font: 'title', color: '#fff', p: kk.at('del', 0.3) });
          } });
          return;
        }
        const x = k.lerp(500, 1500, k.at('ride', 3, 'linear'));
        moto(k, x, G, 1.4, { color: '#8a8f98' });
        k.char(x - 170, G - 90, S * 0.85, { ...HO('#9aa3ad', { hair: 'bun', body: 'chibiGirl' }), face: 'happy', pose: 'hold', shadow: false });
        k.char(x - 20, G - 95, S * 0.95, { ...TOAN, face: 'calm', pose: 'hold', shadow: false });
        cap(k, 'LẦN NÀY, NHÌN ĐƯỜNG.', 'ride', { color: '#fff', y: 200 });
      },
    },
    nextEpisodeScene({
      title: 'Nếu Bạn Là Lễ Tân Khách Sạn… Tầng 4',
      hook: 'Có người thuê trọn cả khách sạn, trả tiền mặt ba tháng. Điều kiện duy nhất: không ai được lên tầng bốn.',
      when: 'Câu chuyện tiếp theo',
      say: '{next}Câu chuyện tiếp theo: bạn là lễ tân ca đêm. Một ngày, có người thuê trọn cả khách sạn, trả tiền mặt ba tháng. Lương bạn tăng gấp ba. Điều kiện duy nhất: không ai được lên tầng bốn.',
      art(k) {
        const { ctx } = k; ctx.fillStyle = '#8a5a3a'; ctx.fillRect(80, -200, 300, 400); ctx.strokeStyle = '#5a3a24'; ctx.lineWidth = 8; ctx.strokeRect(80, -200, 300, 400);
        k.char(-200, 170, 360, { ...HO('#e9e4dc', { hair: 'short' }), face: 'shock', pose: 'hold' });
        k.text('4', 220, -40, { size: 200, font: 'title', color: '#d63a2f', outline: '#fff', outlineWidth: 10 });
      },
    }),
    subscribeScene({
      question: 'Chú Toàn có lỗi với cả họ, hay cả họ cùng có lỗi?',
      channel: 'Nếu Bạn Là',
      say: '{q}Theo bạn, chú Toàn có lỗi với cả họ, hay cả họ cùng có lỗi? Bình luận cho mình biết nhé. {sub}Đăng ký Nếu Bạn Là và bật chuông. Mỗi câu chuyện, bạn sống thử một cuộc đời.',
    }),
  ],
};
