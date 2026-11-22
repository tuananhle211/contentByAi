// Kênh Nếu Bạn Là — "Leader 7 Sao", PHẦN 1/2: lúc đi lên. Kịch bản đã duyệt: kich-ban.md (+ độ mặn theo yêu cầu 06/11).
// Truyện hư cấu; app "Zena AI" là tên hư cấu, dựng theo thủ đoạn có thật được báo chí đưa tin:
// - VTV 30/10/2026 https://vtv.vn/thu-doan-du-do-40000-nguoi-sap-bay-kiem-tien-bang-ai-qua-tatao-live-100261030092107298.htm
// - Dân trí 26/10/2026 https://dantri.com.vn/phap-luat/duong-day-tatao-live-o-ha-noi-lua-hang-van-nguoi-bang-vo-boc-cong-nghe-ai-20261026090723268.htm
//   App "AI dùng nhân vật ảo tự livestream bán hàng, hợp tác TikTok/Shopee/Lazada"; công khai giấy phép, mã số thuế, văn phòng
//   toà nhà ở Hà Nội; gói 3,9 tr giảm còn 2,9 tr "trọn đời"; Matrix 14,9 / 84,9 / 418,9 tr; 30–50 nghìn/ngày, Matrix 900 nghìn–1,5 tr/ngày;
//   tiền cộng ví sau 2–4 giờ ("Doanh thu livestream", "Hoa hồng AI"); ngưỡng rút 200 nghìn; giai đoạn đầu trả thật để lấy lòng tin;
//   7 cấp sao, hoa hồng 5–17%; hội nghị trao thưởng điện thoại, xe máy, iPad, tiền mặt; chủ người nước ngoài rời VN ~2 tháng trước khi lộ;
//   khi sập: lệnh rút "đang xử lý", nhóm Zalo đồng loạt giải tán, văn phòng đóng cửa. ~40.000 người, 404–407 tỷ.
import { nextEpisodeScene, subscribeScene } from '/engine/templates.js';
import { soDo } from '/channel/drama.js';
import * as thumbs from '/videos/064-neu-ban-keo-ca-ho-vao-app-ai-p1/thumbs.js';
import {
  G, TOAN, HANH, LINH, LUU, TI, CHUTICH, BAY, HAI, HO, spk, pop, tag, cap, vig, tint, paper, phone, chat, cash, gold, counter, living,
  hud, chapTop, hospitalGate, mam, feast, stage, crowd, sash, pawnShop, teaStall, nightRoad, moto, c2, ipad, zena, zaloGroup, confetti, vnd,
} from '/channel/neu-ban-la.js';

const S = 520;
// Màn hình điện thoại cầm tay góc phải (dùng nhiều cảnh).
const app = (k, mode, o = {}, x = 1500, y = 560, s = 0.95) => phone(k, x, y, s, { p: o.p ?? 1, r: o.r ?? 0.05, screen: zena(mode, o) });

export default {
  meta: {
    title: 'Nếu Bạn Kéo Cả Họ Vào App AI Kiếm Tiền… (Phần 1)',
    description: `Chú Toàn chạy xe ôm, cả đời chưa thắng gì ngoài một nắp chai C2. Ba tháng sau, chú thành "Leader 7 sao" của một app AI, kéo cả hội xe ôm, cả họ hàng, và cả bà mẹ vợ khó tính nhất Việt Nam vào nạp tiền.
Câu chuyện hư cấu dựa trên các vụ app "AI tự livestream bán hàng" đa cấp được báo chí đưa tin năm 2026: xem video một phút, nhận tiền mỗi ngày, lên sao, nhận hoa hồng… cho tới ngày nút rút tiền chỉ còn hai chữ "đang xử lý".`,
    footer: `📚 Dựa trên tin VTV (30/10/2026), Dân trí (26/10/2026) về đường dây app "AI bán hàng" lôi kéo khoảng 40.000 người, hơn 400 tỷ đồng. Tên app, nhân vật và tình tiết đã được hư cấu.
⚠️ Nạp tiền để "xem video nhận lãi", hưởng hoa hồng khi kéo thêm người = mô hình đa cấp/lừa đảo. Đừng kéo người thân vào.
🔔 Đăng ký Nếu Bạn Là để xem Phần 2: lúc đi xuống.`,
    links: [['🔔 Đăng ký', 'https://www.youtube.com/@neubanlaa?sub_confirmation=1']],
    tags: ['app AI kiếm tiền', 'lừa đảo đa cấp', 'xem video kiếm tiền', 'app lừa đảo', 'leader 7 sao', 'nếu bạn là', 'hoạt hình'],
    hashtags: ['luadao', 'dacap', 'appkiemtien'],
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
      say: 'Bạn là chú Toàn, năm mươi hai tuổi, chạy xe ôm ở cổng bệnh viện tỉnh. {c2}Cả đời chưa thắng thứ gì, ngoài một lần trúng nắp chai C2. {prize}Mà phần thưởng cũng chỉ là thêm một chai C2. {bal}Số dư tài khoản: ba trăm hai mươi nghìn.',
      sfx: [['scratch', 0.1, 0.3], ['ding', 'c2', 0.5], ['cash', 'bal', 0.4]],
      draw(k) {
        hospitalGate(k);
        moto(k, 760, G, 1.4, { color: '#3d7fc1' });
        k.char(740, G - 95, S * 0.95, { ...TOAN, face: k.t > k.cue('prize') ? 'blank' : 'calm', pose: 'hold', shadow: false });
        c2(k, 1100, 900, 1.1 * pop(k, 'c2'), { cap: true, capY: k.t > k.cue('c2') ? -260 - 40 * Math.abs(Math.sin(k.t * 4)) : -200 });
        if (k.t > k.cue('prize')) c2(k, 1240, 900, 1.1 * pop(k, 'prize'));
        counter(k, 960, 160, 320, '', 'bal', 1, { fmt: (v) => `SỐ DƯ: ${v} NGHÌN`, size: 80, color: '#d63a2f' });
      },
    },
    {
      say: 'Ba tháng sau, {stage}bạn đứng trên sân khấu một khách sạn bốn sao, đeo băng rôn Leader bảy sao, cầm micro hô: {l1}AI là tương lai!{e1} {clap}Người vỗ tay to nhất ở hàng ghế đầu, là mẹ vợ bạn. {who}Người mười tám năm nay chỉ gọi bạn bằng ba chữ: thằng xe ôm.',
      sfx: [['whoosh', 'stage', 0.4], ['tada', 'l1', 0.6], ['pop', 'clap', 0.4], ['bonk', 'who', 0.5]],
      draw(k) {
        stage(k);
        k.char(960, 880, S * 0.95, { ...TOAN, hat: null, color: '#1b2338', tie: '#f2c230', face: 'laugh', pose: k.t > k.cue('l1') ? 'cheer' : 'wave', talk: spk(k, 'l1', 'e1'), shadow: false });
        sash(k, 960, 880, S * 0.95);
        confetti(k, k.at('l1', 0.3));
        crowd(k, 1);
        k.char(1450, 1180, S * 0.75, { ...LUU, face: k.t > k.cue('who') ? 'cold' : 'laugh', pose: 'cheer', shadow: false, p: pop(k, 'clap') });
        cap(k, 'THẰNG XE ÔM', 'who', { color: '#ff8a7a', y: 990, x: 560, size: 80 });
      },
    },
    {
      say: 'Làm sao một ông xe ôm ba trăm nghìn trong túi, lại kéo được cả họ, cả hội xe ôm, và cả mẹ vợ vào một cái app? {p1}Đây là phần một: lúc đi lên. {p2}Phần hai là lúc đi xuống. Và nó nhanh hơn nhiều. {sub}Bấm đăng ký để không lỡ nhé.',
      sfx: [['slideUp', 'p1', 0.5], ['slideDown', 'p2', 0.5], ['pop', 'sub', 0.4]],
      draw(k) {
        paper(k, '#14161d');
        const { ctx } = k;
        // biểu đồ đi lên rồi rơi thẳng
        const up = k.at('p1', 1.4, 'inOut'), dn = k.at('p2', 0.6, 'in');
        ctx.strokeStyle = '#7fe0a8'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(300, 850);
        for (let i = 1; i <= 20; i++) { const u = i / 20; if (u > up) break; ctx.lineTo(300 + u * 1000, 850 - u * 600 + Math.sin(i * 2) * 25); }
        ctx.stroke();
        if (dn > 0) { ctx.strokeStyle = '#ff6b5a'; ctx.beginPath(); ctx.moveTo(1300, 250); ctx.lineTo(1300 + 60 * dn, 250 + 700 * dn); ctx.stroke(); }
        k.char(1300, 260 - 10, 220, { ...TOAN, face: dn > 0 ? 'shock' : 'laugh', pose: 'cheer', shadow: false, p: k.at('p1', 0.3) });
        k.text('PHẦN 1: ĐI LÊN', 640, 200, { size: 64, font: 'title', color: '#7fe0a8', fx: 'pop', p: k.at('p1', 0.4) });
        k.text('PHẦN 2: ĐI XUỐNG', 1620, 980, { size: 54, font: 'title', color: '#ff6b5a', fx: 'pop', p: k.at('p2', 0.4) });
      },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Thằng xe ôm',
      say: 'Nhà bạn có ba người. {wife}Vợ bạn, cô Hạnh, bán xôi đầu ngõ từ năm giờ sáng. {linh}Con gái bạn, bé Linh, vừa đỗ đại học. Học phí kỳ đầu: mười hai triệu. {math}Bạn làm phép tính. Mười hai triệu chia ba trăm hai mươi nghìn một ngày, là ba mươi bảy ngày không ăn, không đổ xăng, không ốm.',
      sfx: [['pop', 'wife', 0.4], ['tada', 'linh', 0.4], ['click', 'math', 0.5]],
      draw(k) {
        living(k);
        chapTop(k, '1 · Thằng xe ôm');
        k.char(380, G, S, { ...HANH, face: 'happy', pose: 'hold', p: pop(k, 'wife') });
        k.steam(500, 640, 1);
        k.char(720, G, S, { ...LINH, face: 'happy', pose: 'cheer', p: pop(k, 'linh') });
        k.char(1080, G, S, { ...TOAN, face: k.t > k.cue('math') ? 'shock' : 'happy', pose: 'think', sweat: k.t > k.cue('math') });
        const p = k.at('math', 0.4);
        if (p > 0) { k.rect(1240, 200, 600, 330, { fill: '#fffdf6', width: 5 }); k.text('12.000.000', 1540, 260, { size: 50, font: 'title', color: '#1b1b24' }); k.text('÷ 320.000/ngày', 1540, 330, { size: 44, font: 'title', color: '#1b1b24' }); k.line(1300, 375, 1780, 375, { width: 5 }); k.text('= 37 NGÀY', 1540, 440, { size: 64, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at(k.cue('math', 2), 0.4) }); }
      },
    },
    {
      say: 'Ngày giỗ ông ngoại, cả họ ngồi bốn mâm. {kids}Bạn ngồi mâm trẻ con. Mâm có gà rán, có Coca, và không ai hỏi bạn làm gì. {luu}Mẹ vợ bạn, bà Lựu, liếc sang: {l1}Lấy thằng xe ôm thì cả đời ngồi sau.{e1} {laugh}Cả họ cười. Bạn cũng cười. Trong bụng thì chửi một câu, mà nói ra chắc đêm nay ngủ ngoài hiên.',
      sfx: [['pop', 'kids', 0.4], ['boing', 'luu', 0.4]],
      draw(k) {
        feast(k);
        k.char(1450, G - 30, S * 0.95, { ...LUU, face: 'cold', pose: 'hips', talk: spk(k, 'l1', 'e1'), p: pop(k, 'luu') });
        mam(k, 1450, G + 70, 1.1);
        for (const [x, c] of [[280, '#f29bb8'], [520, '#6bb56b']]) k.char(x, G - 10, S * 0.6, { ...HO(c), face: 'happy', shadow: false });
        k.char(400, G + 30, S * 0.95, { ...TOAN, face: k.t > k.cue('laugh') ? 'laugh' : 'blank', pose: 'hold', shadow: false, vein: k.t > k.cue('laugh') });
        mam(k, 400, G + 90, 1, { kids: true });
        k.text('MÂM TRẺ CON', 400, 380, { size: 44, font: 'title', color: '#fff', fx: 'pop', p: k.at('kids', 0.4), outline: '#1b1b24', outlineWidth: 10 });
        k.bubble(1000, 200, 620, 140, 1330, 400, { p: k.at('l1', 0.4), text: 'Lấy thằng xe ôm thì cả đời ngồi sau!', size: 40 });
        if (k.t > k.cue('laugh')) k.text('#@!%&', 560, 330, { size: 60, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at('laugh', 0.4) });
      },
    },
    {
      say: '{ti}Ở mâm chính, thằng Tí, cháu họ hai mươi hai tuổi, đang được cả họ vây quanh. {flex}Nó mới mua iPhone, mới đổi xe, nói chuyện toàn tiếng Anh: passive income, AI, leader. Nghe như đọc nhãn chai dầu gội. {leg}Bà Lựu gắp cho nó cái đùi gà. {you}Còn bạn, mười tám năm làm rể, chưa từng được gắp cái đùi gà nào.',
      sfx: [['sparkle', 'ti', 0.4], ['boing', 'flex', 0.4], ['pop', 'leg', 0.5]],
      draw(k) {
        feast(k);
        k.char(1000, G, S, { ...TI, face: 'smug', pose: 'hips', bob: 3 });
        k.char(1340, G - 20, S * 0.95, { ...LUU, face: 'happy', pose: k.t > k.cue('leg') ? 'present' : 'hold' });
        mam(k, 1150, G + 70, 1.1);
        ['PASSIVE INCOME', 'AI', 'LEADER'].forEach((t, i) => k.text(t, 700 + i * 120, 300 + i * 70, { size: 46, font: 'title', color: '#2e6da4', fx: 'pop', p: k.at(k.cue('flex', 0.8 + i * 0.4), 0.4), outline: '#fff', outlineWidth: 8 }));
        if (k.t > k.cue('leg')) { const u = k.at('leg', 0.8, 'inOut'); const { ctx } = k; ctx.fillStyle = '#d9862b'; ctx.beginPath(); ctx.ellipse(k.lerp(1300, 1060, u), 640 - Math.sin(u * Math.PI) * 120, 34, 22, 0.6, 0, Math.PI * 2); ctx.fill(); }
        k.char(300, G + 30, S * 0.9, { ...TOAN, face: k.t > k.cue('you') ? 'sad' : 'blank', look: 1, pose: 'hold', shadow: false, gloom: k.at('you', 1) * 0.6 });
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Một phút mỗi ngày',
      say: 'Tối hôm đó, Tí nhắn cho bạn. {l1}Chú ơi, app Zena AI. Nhân vật ảo AI nó tự livestream bán hàng trên TikTok, Shopee, Lazada. {easy}Chú chỉ việc mở app, xem video một phút. Ngày ba chục, năm chục nghìn. {big}Gói to thì ngày triệu rưỡi.{e1}',
      sfx: [['ding', 'l1', 0.5], ['ding', 'easy', 0.4], ['cash', 'big', 0.5]],
      draw(k) {
        paper(k, '#e9f1fb');
        chapTop(k, '2 · Một phút mỗi ngày');
        k.char(360, G, S, { ...TOAN, face: k.t > k.cue('big') ? 'shock' : 'blank', pose: 'hold' });
        chat(k, 640, 300, 'Chú ơi, app Zena AI 🤖', { p: k.at('l1', 0.4) });
        chat(k, 640, 410, 'AI tự livestream bán hàng TikTok, Shopee, Lazada', { p: k.at(k.cue('l1', 2), 0.4), size: 30 });
        chat(k, 640, 520, 'Chú chỉ việc xem video 1 phút 👀', { p: k.at('easy', 0.4) });
        chat(k, 640, 630, 'Gói to: 1,5 TRIỆU/NGÀY 💰💰', { p: k.at('big', 0.4) });
        app(k, 'live', {}, 1620, 560, 0.85);
      },
    },
    {
      say: 'Bạn cười khẩy. {old}Ba mươi năm chạy xe ôm, bạn đã chở đủ loại người, với đủ loại lời hứa. Bạn biết trên đời đếch có gì cho không. {but}Nhưng Tí gửi thêm một cái ảnh: giấy phép kinh doanh, mã số thuế, văn phòng trong toà nhà hai mươi tầng ở Hà Nội. {hmm}Lừa đảo cái quái gì mà có cả mã số thuế?',
      sfx: [['pop', 'but', 0.5], ['boing', 'hmm', 0.5]],
      draw(k) {
        paper(k, '#e9f1fb');
        k.char(360, G, S, { ...TOAN, face: k.t > k.cue('hmm') ? 'shock' : 'smug', pose: k.t > k.cue('hmm') ? 'think' : 'hips' });
        const p = pop(k, 'but');
        if (p > 0) k.group({ x: 1150, y: 520, s: p, r: -0.04 }, () => {
          k.rect(-420, -330, 840, 660, { fill: '#fffdf6', width: 5 });
          k.text('GIẤY CHỨNG NHẬN ĐĂNG KÝ DOANH NGHIỆP', 0, -270, { size: 30, font: 'title', color: '#b8322a' });
          k.text('CÔNG TY TNHH CÔNG NGHỆ ZENA AI', 0, -200, { size: 36, font: 'title', color: '#1b1b24' });
          k.text('Mã số thuế: 01xxxxxxxx', 0, -140, { size: 32, color: '#1b1b24' });
          const { ctx } = k; ctx.fillStyle = '#8a94a6'; ctx.fillRect(-140, -90, 280, 380); ctx.fillStyle = '#c9e3f7'; for (let r = 0; r < 9; r++) for (let c = 0; c < 4; c++) ctx.fillRect(-120 + c * 66, -74 + r * 40, 46, 26);
          ctx.strokeStyle = '#d63a2f'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(280, 220, 70, 0, Math.PI * 2); ctx.stroke();
        });
        cap(k, 'LỪA ĐẢO GÌ MÀ CÓ MÃ SỐ THUẾ?', 'hmm', { color: '#f2c230' });
      },
    },
    {
      say: 'Gói rẻ nhất giá ba triệu chín. {sale}Đang khuyến mãi còn hai triệu chín, dùng trọn đời. {joke}Lừa đảo mà cũng có khuyến mãi, đúng là bắt kịp thời đại. {box}Bạn lén lấy hai triệu chín trong hộp tiền bán xôi của vợ. {coins}Thiếu tiền chẵn, bạn bù bằng mấy tờ năm nghìn nhăn nhúm, còn dính cả mỡ hành.',
      sfx: [['pop', 'sale', 0.5], ['click', 'box', 0.4], ['cash', 'coins', 0.5]],
      hud: true,
      draw(k) {
        living(k, { night: true });
        hud(k, { nap: [0, 2.9, 'coins', 1] });
        const { ctx } = k;
        // biển giá gạch
        const p = pop(k, 0.2);
        if (p > 0) k.group({ x: 1450, y: 330, s: p, r: 0.05 }, () => { k.rect(-260, -130, 520, 260, { fill: '#f2c230', width: 5 }); k.text('3.900.000', 0, -50, { size: 54, font: 'title', color: '#1b1b24' }); if (k.t > k.cue('sale')) { k.line(-170, -50, 170, -50, { stroke: '#d63a2f', width: 10 }); k.text('2.900.000!', 0, 50, { size: 72, font: 'title', color: '#d63a2f' }); } });
        ctx.fillStyle = '#c0392b'; ctx.fillRect(760, 760, 220, 120); ctx.fillStyle = '#e8b84a'; ctx.fillRect(780, 740, 180, 30);
        k.text('TIỀN XÔI', 870, 830, { size: 34, font: 'title', color: '#fff' });
        k.char(540, G, S, { ...TOAN, face: 'smug', look: 1, pose: k.t > k.cue('box') ? { l: [12, 6], r: [70, -20] } : 'hold', sweat: true });
        if (k.t > k.cue('coins')) cash(k, 700, 620, 4, 0.7, k.at('coins', 0.4));
      },
    },
    {
      say: 'Sáng hôm sau, bạn đỗ xe trước cổng viện, mở app, xem đúng một phút video. {girl}Một cô gái ảo, mắt to như búp bê, ngực cũng to như búp bê, đang giới thiệu nồi chiên không dầu. {ting}Bốn tiếng sau, ví app báo: doanh thu livestream, cộng ba mươi nghìn. {wow}AI của bạn vừa bán được một cái nồi chiên, cho một người bạn chưa từng gặp, qua một buổi livestream bạn chưa từng xem.',
      sfx: [['pop', 'girl', 0.4], ['ding', 'ting', 0.6], ['sparkle', 'wow', 0.4]],
      draw(k) {
        hospitalGate(k);
        hud(k, { nap: 2.9, vi: [0, 0.03, 'ting', 0.8] });
        moto(k, 560, G, 1.3, { color: '#3d7fc1' });
        k.char(540, G - 90, S * 0.9, { ...TOAN, face: k.t > k.cue('ting') ? 'laugh' : 'blank', pose: 'hold', shadow: false, look: 1 });
        app(k, k.t > k.cue('ting') ? 'wallet' : 'live', { bal: '30.000đ', lines: ['+ Doanh thu livestream', '  30.000đ'], p: 'ting' }, 1250, 520, 1.1);
        if (k.t > k.cue('ting')) k.text('+30.000đ', 1250, 120, { size: 90, font: 'title', color: '#3fb86a', fx: 'pop', p: k.at('ting', 0.4), outline: '#fff', outlineWidth: 12 });
      },
    },
    {
      say: 'Một tuần trôi qua. {cap}Ví app chạm hai trăm nghìn, đúng ngưỡng được rút. {press}Bạn bấm rút, tay run như đêm tân hôn. {bank}Hai ngày sau, điện thoại ting ting. Hai trăm nghìn về tài khoản thật. {pho}Tiền thật. Mua được bát phở thật. Bạn ăn bát phở ấy chậm như ăn cỗ.',
      sfx: [['ding', 'cap', 0.4], ['click', 'press', 0.6], ['cash', 'bank', 0.6], ['tada', 'pho', 0.4]],
      draw(k) {
        hospitalGate(k);
        hud(k, { nap: 2.9, vi: [0.03, k.t > k.cue('bank') ? 0 : 0.2, 'cap', 0.8], rut: [0, 0.2, 'bank', 0.8] });
        if (k.t < k.cue('pho')) {
          k.char(560, G, S, { ...TOAN, face: k.t > k.cue('bank') ? 'laugh' : 'shock', pose: k.t > k.cue('bank') ? 'cheer' : 'hold', sweat: k.t > k.cue('press') && k.t < k.cue('bank') });
          phone(k, 1250, 540, 1.05, { screen: k.t > k.cue('bank') ? (kk, w, h) => { kk.ctx.fillStyle = '#fff'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.text('NGÂN HÀNG', 0, -150, { size: 30, font: 'title', color: '#2e6da4' }); kk.text('+200.000 VND', 0, -60, { size: 40, font: 'title', color: '#3fb86a' }); kk.text('ND: ZENA AI RUT TIEN', 0, 10, { size: 22, color: '#555' }); } : zena('withdraw', { amt: '200.000đ' }) });
          return;
        }
        // bát phở
        const { ctx } = k;
        ctx.fillStyle = '#fffaf0'; ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(1200, 720, 160, 0, Math.PI); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e8c38a'; ctx.beginPath(); ctx.ellipse(1200, 720, 160, 30, 0, 0, Math.PI * 2); ctx.fill();
        k.steam(1200, 690, 2);
        k.char(700, G, S, { ...TOAN, face: 'cry', tears: 0.5, pose: 'hold' });
        cap(k, 'TIỀN THẬT. PHỞ THẬT.', 'pho', { color: '#f2c230' });
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      chapter: 'Lên sao',
      say: 'Từ hôm đó, bạn chở khách mà không nhìn đường, chỉ nhìn ví. {near}Suýt đâm vào xe cứu thương hai lần. {group}Tí kéo bạn vào nhóm Zalo AI Đổi Đời, ba nghìn thành viên. {morning}Sáng nào cũng có ba nghìn người gửi ảnh chụp ví, hăng như khoe cháu nội.',
      sfx: [['boing', 'near', 0.5], ['ding', 'group', 0.4], ['ding', ['morning', 0.3], 0.3], ['ding', ['morning', 0.6], 0.3]],
      draw(k) {
        if (k.t < k.cue('group')) {
          hospitalGate(k);
          chapTop(k, '3 · Lên sao');
          hud(k, { nap: 2.9, vi: 0.35, rut: 0.2 });
          const x = k.lerp(300, 1300, k.at(0, 4, 'linear'));
          moto(k, x, G, 1.2, { color: '#3d7fc1' });
          k.char(x - 20, G - 85, S * 0.85, { ...TOAN, face: 'happy', pose: 'hold', shadow: false, lookY: 1 });
          k.char(x - 120, G - 80, S * 0.8, { ...HO('#9aa3ad', { hair: 'bun', body: 'chibiGirl' }), face: 'shock', pose: 'shout', shadow: false });
          if (k.t > k.cue('near')) k.burst(1500, 640, 110, 'TÍT TÍT!', { p: k.at('near', 0.3) });
          return;
        }
        paper(k, '#e9f1fb');
        hud(k, { nap: 2.9, vi: 0.35, rut: 0.2 });
        zaloGroup(k, 620, 130, 760, 860, { msgs: [{ name: 'Lan Hương', text: 'Chốt ví sáng nay +1.200.000 🔥', cue: 'morning', color: '#f29bb8' }, { name: 'Tuấn Phát', text: '+900k, AI đỉnh quá ae ơi', cue: ['morning', 0.4], color: '#6bb56b' }, { name: 'Cô Bảy Q.3', text: 'Cảm ơn Zena đã đổi đời 🙏', cue: ['morning', 0.8], color: '#e8b84a' }, { name: 'Bạn', text: '+30.000 🥹', cue: ['morning', 1.3], me: true }] });
        k.char(300, G, S, { ...TOAN, face: 'happy', pose: 'hold' });
      },
    },
    {
      say: 'Rồi Tí nói tới phần quan trọng. {rank}App có bảy cấp sao. {com}Mời được người mới thì hưởng hoa hồng, từ năm đến mười bảy phần trăm. {matrix}Còn muốn ngày triệu rưỡi, phải lên gói Matrix: {p1}mười bốn triệu chín, {p2}tám mươi tư triệu chín, {p3}và gói to nhất, bốn trăm mười tám triệu chín.',
      sfx: [['pop', 'rank', 0.4], ['cash', 'com', 0.4], ['drumroll', 'matrix', 0.3], ['ding', 'p1', 0.4], ['ding', 'p2', 0.4], ['boom', 'p3', 0.5]],
      draw(k) {
        paper(k, '#1b1f2a');
        hud(k, { nap: 2.9, vi: 0.35, rut: 0.2, sao: 0 });
        k.char(340, G, S, { ...TI, face: 'smug', pose: 'present', talk: k.talk() });
        // kim tự tháp 7 sao
        const p = k.at('rank', 1.2);
        for (let i = 0; i < 7; i++) { if (i / 7 > p) break; const w = 520 - i * 64, y = 860 - i * 82; k.ctx.fillStyle = `hsl(${40 + i * 6},85%,${55 - i * 3}%)`; k.ctx.fillRect(900 - w / 2, y, w, 70); k.text('★'.repeat(i + 1), 900, y + 36, { size: 30, color: '#1b1b24' }); }
        k.text('HOA HỒNG 5% → 17%', 900, 120, { size: 56, font: 'title', color: '#7fe0a8', fx: 'pop', p: k.at('com', 0.4) });
        phone(k, 1560, 560, 1.0, { p: k.at('matrix', 0.4), screen: zena('packs', { hl: k.t > k.cue('p3') ? 3 : k.t > k.cue('p2') ? 2 : k.t > k.cue('p1') ? 1 : -1 }) });
      },
    },
    {
      say: 'Bạn đi gom tiền. {wife}Bốn mươi triệu tiết kiệm của vợ, để dành đóng học cho bé Linh. {pawn}Bốn mươi lăm triệu vay tiệm cầm đồ, cầm theo cái sổ đỏ căn nhà cấp bốn. {buy}Bạn mua gói tám mươi tư triệu chín. {kiss}Rồi hôn lên màn hình điện thoại. Lần cuối bạn hôn cái gì say đắm thế, là hôn vợ đêm tân hôn. Mà hôm đấy còn say rượu.',
      sfx: [['cash', 'wife', 0.5], ['bonk', 'pawn', 0.5], ['tada', 'buy', 0.5], ['pop', 'kiss', 0.5]],
      draw(k) {
        hud(k, {});
        if (k.t < k.cue('buy')) {
          pawnShop(k);
          hud(k, { nap: [2.9, k.t > k.cue('buy') ? 87.8 : 2.9, 'buy'], vi: 0.35, rut: 0.2 });
          k.char(1250, 700, S * 1.1, { ...CHUTICH, color: '#5a3a24', tie: null, shades: false, hair: 'bald', face: 'smug', pose: 'hold', shadow: false, cig: true });
          k.ctx.fillStyle = '#6e4f3a'; k.ctx.fillRect(300, 640, 1320, 290);
          k.char(560, G, S, { ...TOAN, face: 'blank', pose: 'present' });
          cash(k, 560, 520, 6, 0.8, pop(k, 'wife'));
          soDo(k, 960, 600, 0.9 * pop(k, 'pawn'), -0.1);
          return;
        }
        paper(k, '#f3e7d3');
        hud(k, { nap: [2.9, 87.8, 'buy', 1.2], vi: 0.35, rut: 0.2 });
        k.char(620, G, S * 1.1, { ...TOAN, face: k.t > k.cue('kiss') ? 'happy' : 'laugh', pose: { l: [40, -110], r: [40, -110] }, blush: true });
        app(k, 'packs', { hl: 2 }, 1250, 520, 1.0);
        if (k.t > k.cue('kiss')) for (let i = 0; i < 5; i++) k.text('💋', 900 + i * 60, 420 - ((k.t * 120 + i * 50) % 260), { size: 50 });
      },
    },
    {
      say: 'Mỗi ngày ví cộng chín trăm nghìn. {rut}Bạn rút đều. Có hôm chậm vài ngày, nhưng lần nào cũng về. {quit}Vợ bạn nghỉ bán xôi. Bán từ năm giờ sáng tới trưa, không bằng AI của chồng bán một tiếng. {night}Tối đến, hai vợ chồng nằm đếm tiền trong app. Rồi lâu lắm rồi, mới lại cùng nhau lên sao một lần.',
      sfx: [['cash', 0.4, 0.4], ['cash', 'rut', 0.4], ['sparkle', 'night', 0.4]],
      draw(k) {
        if (k.t < k.cue('night')) {
          living(k);
          hud(k, { nap: 87.8, vi: [0.35, 4.5, 0.2, 3], rut: [0.2, 12, 'rut', 2] });
          k.char(520, G, S, { ...TOAN, face: 'laugh', pose: 'cheer', bob: 4 });
          k.char(1100, G, S, { ...HANH, face: k.t > k.cue('quit') ? 'laugh' : 'happy', pose: k.t > k.cue('quit') ? 'cheer' : 'hold' });
          if (k.t > k.cue('quit')) { k.text('NGHỈ BÁN XÔI!', 1100, 260, { size: 64, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at('quit', 0.4), outline: '#fff', outlineWidth: 10 }); }
          for (let i = 0; i < 6; i++) { const u = ((k.t * 0.6 + i / 6) % 1); k.text('+900k', 820 + Math.sin(i * 3) * 120, 800 - u * 600, { size: 40, font: 'title', color: '#3fb86a' }); }
          return;
        }
        living(k, { night: true });
        hud(k, { nap: 87.8, vi: 4.5, rut: 12 });
        // chăn trùm, chỉ lộ hai cái đầu + ánh điện thoại; đèn tắt
        const { ctx } = k; ctx.fillStyle = '#e8b84a'; ctx.beginPath(); ctx.ellipse(960, 820, 520, 140, 0, 0, Math.PI * 2); ctx.fill();
        for (const x of [820, 1100]) k.char(x, 790, S * 0.7, { ...(x < 960 ? TOAN : HANH), hat: null, face: 'laugh', blush: true, shadow: false, lean: Math.sin(k.t * 6 + x) * 0.05 });
        ctx.fillStyle = '#e8b84a'; ctx.beginPath(); ctx.ellipse(960, 860, 520, 120, 0, Math.PI, 0, true); ctx.fill();
        tint(k, '#0d0f1a', 0.35 * k.at('night', 1.5));
        k.text('★ ★ ★', 960, 260, { size: 80, color: '#f2c230', fx: 'pop', p: k.at(k.cue('night', 3), 0.5) });
      },
    },
    {
      say: 'Bạn bắt đầu đi rủ. {xeom}Đầu tiên là hội xe ôm cổng viện. {bay}Ông Bảy chột nghi lắm. Bạn mở ví cho xem, ông nạp gói mười bốn triệu chín. {hai}Ông Hai còi nạp ngay gói tám mươi tư, vì đàn ông mà, cái gì cũng phải to hơn ông Bảy. {stars}Một tháng, bạn kéo được mười một người. Ba sao.',
      sfx: [['pop', 'xeom', 0.4], ['cash', 'bay', 0.4], ['cash', 'hai', 0.4], ['tada', 'stars', 0.5]],
      draw(k) {
        teaStall(k);
        hud(k, { nap: 87.8, vi: [4.5, 8, 'bay', 2], rut: 12, sao: [0, 3, 'stars', 0.8] });
        k.char(420, G, S, { ...TOAN, face: 'laugh', pose: 'present', talk: k.talk() * 0.6 });
        k.char(860, G, S * 0.95, { ...BAY, face: k.t > k.cue('bay') ? 'smug' : 'cold', pose: k.t > k.cue('bay') ? 'hold' : 'hips', p: pop(k, 'bay') });
        k.char(1250, G, S * 0.95, { ...HAI, face: k.t > k.cue('hai') ? 'angry' : 'blank', vein: k.t > k.cue('hai'), pose: k.t > k.cue('hai') ? 'point' : 'stand', p: pop(k, 'hai') });
        k.text('14,9 TR', 860, 330, { size: 54, font: 'title', color: '#1b1b24', fx: 'pop', p: k.at('bay', 0.4), outline: '#fff', outlineWidth: 10 });
        k.text('84,9 TR!!', 1250, 300, { size: 74, font: 'title', color: '#d63a2f', fx: 'pop', p: k.at('hai', 0.4), outline: '#fff', outlineWidth: 10 });
        if (k.t > k.cue('stars')) for (let i = 0; i < 11; i++) k.char(1500 + (i % 4) * 100, 640 + Math.floor(i / 4) * 120, 160, { ...HAI, color: ['#6b8e5a', '#8a6a4f', '#3d7fc1'][i % 3], face: 'happy', shadow: false, p: k.at(k.cue('stars', i * 0.05), 0.3) });
      },
    },
    {
      say: 'Hội nghị đầu tiên bạn đi là ở một khách sạn bốn sao. {led}Đèn led, nhạc xập xình, phông nền in chữ AI ĐỔI ĐỜI. {ct}Ông Chủ tịch bước ra, vest đen, kính đen, đồng hồ vàng to như cái nắp xoong. {l1}AI là tương lai. Ai không theo AI, thì AI bỏ mẹ lại!{e1} {prize}Cả hội trường vỗ tay, rồi trao thưởng iPad, xe máy, tiền mặt. {miss}Chỉ thiếu mỗi một thứ: bằng chứng là cái app này đã bán được cái gì.',
      sfx: [['boom', 'led', 0.4], ['drumroll', 'ct', 0.3], ['tada', 'e1', 0.5], ['cash', 'prize', 0.4]],
      draw(k) {
        stage(k);
        hud(k, { nap: 87.8, vi: 8, rut: 14, sao: 3 });
        k.char(960, 900, S * 1.1, { ...CHUTICH, face: 'laugh', pose: k.t > k.cue('l1') ? 'shout' : 'hips', talk: spk(k, 'l1', 'e1'), p: pop(k, 'ct'), shadow: false });
        // đồng hồ vàng to
        if (k.t > k.cue('ct')) { k.ctx.fillStyle = '#f2c230'; k.ctx.strokeStyle = '#8a6a14'; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.arc(1115, 730, 30, 0, Math.PI * 2); k.ctx.fill(); k.ctx.stroke(); }
        crowd(k, k.t > k.cue('e1') ? 1 : 0);
        if (k.t > k.cue('prize')) { ipad(k, 380, 560, 0.9 * pop(k, 'prize'), { r: -0.2 }); cash(k, 1560, 600, 6, 0.9, pop(k, 'prize')); }
        k.bubble(1180, 470, 600, 150, 1100, 560, { p: k.at('l1', 0.4) * (k.t < k.cue('prize') ? 1 : 0), text: 'Ai không theo AI thì AI bỏ mẹ lại!', size: 38 });
        cap(k, 'BẰNG CHỨNG BÁN ĐƯỢC HÀNG: ???', 'miss', { color: '#ff8a7a', y: 1000 });
      },
    },
    {
      say: 'Cuối buổi, ông Chủ tịch nói thêm một câu. {l1}Tháng sau tôi đi công tác nước ngoài, ký hợp đồng với đối tác lớn. Anh em cứ yên tâm.{e1} {clap}Bạn vỗ tay. {mark}Nhớ chuyến công tác này nhé. Phần hai, bạn sẽ cần tới nó.',
      sfx: [['pop', 'l1', 0.3], ['pop', 'clap', 0.4], ['drumroll', 'mark', 0.3]],
      draw(k) {
        stage(k, { title: 'HẸN GẶP LẠI!' });
        hud(k, { nap: 87.8, vi: 8, rut: 14, sao: 3 });
        k.char(960, 900, S * 1.1, { ...CHUTICH, face: 'smug', pose: 'wave', talk: spk(k, 'l1', 'e1'), shadow: false });
        // vali + máy bay
        const { ctx } = k; ctx.fillStyle = '#5a3a24'; ctx.fillRect(1180, 680, 110, 120); ctx.fillStyle = '#2b2b2b'; ctx.fillRect(1215, 660, 40, 20);
        k.text('✈', 1480, 300, { size: 140, color: '#fff', fx: 'pop', p: k.at('l1', 0.5) });
        crowd(k, k.t > k.cue('clap') ? 1 : 0);
        k.highlight(1100, 620, 260, 220, { p: k.at('mark', 0.6), color: '#f2c230' });
        cap(k, 'NHỚ CHUYẾN CÔNG TÁC NÀY', 'mark', { color: '#f2c230', y: 1000 });
      },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Chinh phục mẹ vợ',
      say: 'Bạn lên bốn sao, rồi năm sao. {ipad}Bạn được thưởng một cái iPad, mang về đặt giữa nhà như đặt bằng khen. {l1}Bé Linh hỏi: Bố ơi, app này bán được cái gì hả bố?{e1} {a1}AI bán. {l2}Bán cho ai ạ?{e2} {a2}Bố đang bận.',
      sfx: [['tada', 'ipad', 0.4], ['boing', 'l2', 0.4]],
      draw(k) {
        living(k);
        chapTop(k, '4 · Chinh phục mẹ vợ');
        hud(k, { nap: 87.8, vi: [8, 36, 0.3, 2], rut: [14, 24, 0.3, 2], sao: [3, 5, 0.3, 1.5] });
        ipad(k, 960, 380, 1.2 * pop(k, 'ipad'));
        k.text('🏆', 960, 230, { size: 80, fx: 'pop', p: k.at('ipad', 0.4) });
        k.char(520, G, S, { ...TOAN, face: k.t > k.cue('a2') ? 'blank' : 'smug', pose: k.t > k.cue('a2') ? 'hold' : 'hips', talk: spk(k, 'a1', 'l2') + spk(k, 'a2') });
        k.char(1300, G, S, { ...LINH, face: k.t > k.cue('a2') ? 'cold' : 'calm', pose: 'think', talk: spk(k, 'l1', 'e1') + spk(k, 'l2', 'e2'), flip: true });
        k.bubble(1360, 260, 460, 130, 1320, 380, { p: k.at('l1', 0.4) * (k.t < k.cue('a1') ? 1 : 0), text: 'App bán được cái gì hả bố?', size: 34 });
        k.bubble(1360, 260, 460, 130, 1320, 380, { p: k.at('l2', 0.4), text: 'Bán cho ai ạ?', size: 44 });
        k.bubble(260, 260, 400, 130, 480, 380, { p: k.at('a2', 0.4), text: 'Bố đang bận!', size: 44 });
      },
    },
    {
      say: 'Nhưng muốn lên bảy sao, bạn cần một người nạp thật lớn. {only}Cả họ chỉ có một người có tiền lớn: bà Lựu. {land}Bà có mảnh đất hương hoả ông ngoại để lại. {rule}Ông ngoại dặn: đói thì ăn cám, chứ không được bán đất.',
      sfx: [['drumroll', 'only', 0.3], ['sparkle', 'land', 0.4], ['bonk', 'rule', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: G });
        hud(k, { nap: 87.8, vi: 36, rut: 24, sao: 5 });
        const { ctx } = k;
        ctx.fillStyle = '#7fbf6a'; ctx.fillRect(900, 700, 900, 230); ctx.strokeStyle = '#6e4f3a'; ctx.lineWidth = 6; for (let x = 920; x < 1800; x += 80) { ctx.beginPath(); ctx.moveTo(x, 690); ctx.lineTo(x, 760); ctx.stroke(); }
        k.text('ĐẤT HƯƠNG HOẢ', 1350, 640, { size: 54, font: 'title', color: '#fff', outline: '#3b2f2a', outlineWidth: 10, fx: 'pop', p: k.at('land', 0.4) });
        k.char(560, G, S * 1.05, { ...LUU, face: 'cold', pose: 'hips', p: pop(k, 'only') });
        k.char(1500, 600, S * 0.6, { outfit: 'tunic', plain: true, body: 'chibi', color: '#5a5a5a', hair: 'short', hairColor: '#ddd', beard: true, face: 'angry', pose: 'point', alpha: 0.6 * k.at('rule', 0.6), float: true, shadow: false });
        k.bubble(1050, 160, 600, 140, 1450, 380, { p: k.at('rule', 0.4), text: 'Đói ăn cám, CẤM bán đất!', size: 40 });
      },
    },
    {
      say: 'Lần đầu bạn mở lời, bà Lựu cười vào mặt: {l1}Thằng xe ôm mà cũng đòi làm ăn. Mày làm ăn được thì tao đi bằng đầu.{e1} {phone}Bạn không cãi. Bạn chỉ đặt cái điện thoại lên bàn, mở lịch sử rút tiền, cuộn mãi không hết. {silent}Bà Lựu im lặng rất lâu. {look}Lần đầu tiên trong mười tám năm, bà nhìn bạn, mà không phải nhìn một thằng ngồi sau.',
      sfx: [['click', 'phone', 0.5], ['scratch', 'silent', 0.3]],
      draw(k) {
        feast(k);
        hud(k, { nap: 87.8, vi: 36, rut: 24, sao: 5 });
        k.char(1350, G, S * 1.05, { ...LUU, face: k.t > k.cue('look') ? 'shock' : k.t > k.cue('silent') ? 'blank' : 'laugh', pose: k.t > k.cue('silent') ? 'hold' : 'hips', talk: spk(k, 'l1', 'e1'), look: k.t > k.cue('phone') && k.t < k.cue('look') ? -1 : 0, lookY: k.t > k.cue('phone') && k.t < k.cue('look') ? 1 : 0 });
        k.char(520, G, S, { ...TOAN, face: k.t > k.cue('look') ? 'smug' : 'calm', pose: 'present' });
        k.ctx.fillStyle = '#7a4e33'; k.ctx.fillRect(700, 760, 520, 30);
        phone(k, 960, 640, 0.75, { p: k.at('phone', 0.4), r: -0.1, screen: (kk, w, h) => { kk.ctx.fillStyle = '#fff'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); const off = ((kk.t - kk.cue('phone')) * 140) % 60; for (let i = 0; i < 12; i++) kk.text(`Rút +${[200, 900, 900, 1500, 900, 900][i % 6]}.000đ ✓`, 0, -h / 2 + 40 + i * 60 - off, { size: 24, font: 'title', color: '#3fb86a' }); } });
      },
    },
    {
      say: 'Một tuần sau, bà Lựu bán mảnh đất hương hoả. {buy}Bà nạp gói to nhất: bốn trăm mười tám triệu chín. {seven}Điện thoại bạn nổ thông báo: Chúc mừng, bạn đã đạt Leader bảy sao. {ghost}Đêm đó, ông ngoại trên bàn thờ chắc phải ăn cám thật.',
      sfx: [['cash', 'buy', 0.6], ['tada', 'seven', 0.7]],
      draw(k) {
        if (k.t < k.cue('ghost')) {
          paper(k, '#1b1f2a');
          hud(k, { nap: 87.8, vi: [36, 107, 'buy', 1.5], rut: 24, ho: [0, 418.9, 'buy', 1.2], sao: [5, 7, 'seven', 0.6] });
          k.char(520, G, S * 1.05, { ...LUU, face: 'calm', pose: 'present' });
          counter(k, 960, 300, 418.9, '', 'buy', 1.2, { dec: 1, fmt: (v) => `${String(Math.round(v * 10) / 10).replace('.', ',')} TRIỆU`, size: 100, color: '#f2c230' });
          app(k, 'star', {}, 1450, 600, 1.0 * (k.t > k.cue('seven') ? 1 : 0.0001));
          confetti(k, k.at('seven', 0.3));
          return;
        }
        feast(k, { grandpa: 'cry' });
        hud(k, { nap: 87.8, vi: 107, rut: 24, ho: 418.9, sao: 7 });
        k.ctx.fillStyle = '#c9a27e'; k.ctx.beginPath(); k.ctx.ellipse(960, 560, 70, 26, 0, 0, Math.PI * 2); k.ctx.fill();
        k.text('CÁM', 960, 562, { size: 30, font: 'title', color: '#5a3a24' });
        cap(k, 'ÔNG NGOẠI ĂN CÁM', 'ghost', { color: '#fff', y: 1000 });
      },
    },
    {
      say: 'Ngày giỗ năm ấy, {table}bạn được mời lên mâm chính. {leg}Bà Lựu gắp cho bạn cái đùi gà, và gọi bạn bằng một chữ mà mười tám năm nay bạn chưa từng nghe: {l1}Ăn đi con.{e1} {cry}Bạn cúi xuống ăn, cố không để ai thấy mắt mình đỏ. {ti}Thằng Tí ngồi mâm trẻ con.',
      sfx: [['tada', 'table', 0.4], ['pop', 'leg', 0.5], ['sparkle', 'l1', 0.4]],
      draw(k) {
        feast(k);
        hud(k, { nap: 87.8, vi: 107, rut: 24, ho: 418.9, sao: 7 });
        k.char(1250, G - 20, S, { ...LUU, face: 'happy', pose: k.t > k.cue('leg') ? 'present' : 'hold', talk: spk(k, 'l1', 'e1') });
        k.char(900, G - 10, S, { ...TOAN, face: k.t > k.cue('cry') ? 'cry' : 'shock', tears: k.at('cry', 1.5) * 0.7, pose: 'hold' });
        mam(k, 1080, G + 70, 1.2);
        if (k.t > k.cue('leg')) { const u = k.at('leg', 0.8, 'inOut'); const { ctx } = k; ctx.fillStyle = '#d9862b'; ctx.beginPath(); ctx.ellipse(k.lerp(1180, 960, u), 680 - Math.sin(u * Math.PI) * 140, 38, 24, 0.6, 0, Math.PI * 2); ctx.fill(); }
        k.char(300, G + 30, S * 0.8, { ...TI, face: 'sad', pose: 'hold', shadow: false, p: k.at('ti', 0.3) });
        mam(k, 300, G + 90, 0.8, { kids: true });
      },
    },
    {
      say: 'Sau bà Lựu là cả họ. {ba}Cậu Ba nạp, {ut}dì Út nạp, {re}anh rể nạp, {tg}ông thông gia bên nội cũng nạp, dù chẳng ai hiểu ông dính gì tới họ này. {total}Cả họ cộng lại hơn một tỷ. {group}Bạn lập nhóm Zalo riêng: Gia Tộc AI. {boss}Bạn là trưởng nhóm.',
      sfx: [['cash', 'ba', 0.4], ['cash', 'ut', 0.4], ['cash', 're', 0.4], ['cash', 'tg', 0.4], ['boom', 'total', 0.5], ['tada', 'boss', 0.5]],
      draw(k) {
        paper(k, '#f3e7d3');
        hud(k, { nap: 87.8, vi: [107, 286, 'total', 1.5], rut: [24, 31, 'total', 1.5], ho: [418.9, 1200, 'ba', 6], sao: 7 });
        const R = [['ba', '#3d7fc1', 'short'], ['ut', '#f29bb8', 'bun'], ['re', '#6bb56b', 'spiky'], ['tg', '#8a8f98', 'bald']];
        R.forEach(([c, col, hair], i) => k.char(620 + i * 300, G, S * 0.85, { ...HO(col, { hair, body: hair === 'bun' ? 'chibiGirl' : 'chibi' }), face: 'laugh', pose: 'cheer', p: pop(k, c) }));
        if (k.t > k.cue('group')) zaloGroup(k, 1180, 160, 700, 460, { title: 'GIA TỘC AI 👑', members: '32 thành viên · Trưởng nhóm: Toàn', msgs: [{ name: 'Dì Út', text: 'Anh Toàn giỏi quá 🥰', cue: 'group', color: '#f29bb8' }, { name: 'Cậu Ba', text: 'Chốt ví +1tr2 🔥', cue: ['group', 0.5], color: '#3d7fc1' }] });
        counter(k, 520, 260, 1200, '', 'total', 1.2, { fmt: (v) => v >= 1000 ? `HƠN ${String(Math.round(v / 100) / 10).replace('.', ',')} TỶ` : `${v} TRIỆU`, size: 90, color: '#d63a2f' });
      },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Đêm trao giải',
      say: 'Đêm gala cuối năm. {stage}Bạn đứng trên sân khấu, băng rôn Leader bảy sao, cầm micro: {l1}AI là tương lai!{e1} {clap}Hàng ghế đầu, bà Lựu vỗ tay to nhất. {bike}Bạn được trao một chiếc xe ga mới, buộc nơ đỏ. {real}Ba mươi năm chạy xe ôm, lần đầu tiên bạn có cái xe không phải đi trả góp.',
      sfx: [['drumroll', 0.2, 0.3], ['tada', 'l1', 0.6], ['pop', 'clap', 0.4], ['tada', 'bike', 0.5]],
      draw(k) {
        stage(k, { title: 'GALA LEADER 2026', sub: 'VINH DANH LEADER 7 SAO' });
        chapTop(k, '5 · Đêm trao giải');
        hud(k, { nap: 87.8, vi: 286, rut: 31, ho: 1200, sao: 7 });
        k.char(760, 880, S * 0.95, { ...TOAN, hat: null, color: '#1b2338', tie: '#f2c230', face: 'laugh', pose: k.t > k.cue('l1') ? 'cheer' : 'wave', talk: spk(k, 'l1', 'e1'), shadow: false });
        sash(k, 760, 880, S * 0.95);
        if (k.t > k.cue('bike')) moto(k, 1250, 880, 1.2 * pop(k, 'bike'), { scooter: true, color: '#f4efe6', bow: true });
        confetti(k, k.at('l1', 0.3));
        crowd(k, 1);
        k.char(760, 1180, S * 0.75, { ...LUU, face: 'laugh', pose: 'cheer', shadow: false });
      },
    },
    {
      say: 'Mười một giờ đêm, bạn phóng chiếc xe ga mới về nhà, gió lùa vào bộ vest thuê. {press}Tới đèn đỏ, bạn mở app, rút một triệu rưỡi tiền lãi hôm nay, như mọi ngày. {status}Trạng thái: đang xử lý. {fine}Bình thường thôi. Thỉnh thoảng vẫn chậm.',
      sfx: [['whoosh', 0.2, 0.4], ['click', 'press', 0.5], ['slideDown', 'status', 0.4]],
      draw(k) {
        nightRoad(k);
        hud(k, { nap: 87.8, vi: 286, rut: 31, ho: 1200, sao: 7 });
        moto(k, 620, G, 1.3, { scooter: true, color: '#f4efe6', bow: true });
        k.char(600, G - 100, S * 0.9, { ...TOAN, hat: null, color: '#1b2338', tie: '#f2c230', face: k.t > k.cue('status') ? 'blank' : 'happy', pose: 'hold', shadow: false });
        k.ctx.fillStyle = '#d63a2f'; k.ctx.beginPath(); k.ctx.arc(1050, 300, 30, 0, Math.PI * 2); k.ctx.fill();
        app(k, 'withdraw', { amt: '1.500.000đ', p: k.at('press', 0.4) }, 1400, 540, 1.0);
      },
    },
    {
      say: 'Sáng hôm sau, vẫn đang xử lý. {admin}Admin nhóm thông báo: Hệ thống nâng cấp lên AI hai chấm không, tạm dừng rút bốn mươi tám giờ. {hearts}Ba nghìn thành viên thả tim. {you}Bạn cũng thả tim. Nâng cấp thì phải chờ. AI là máy chứ có phải trâu đâu, cũng phải nghỉ chứ.',
      sfx: [['ding', 'admin', 0.5], ['pop', 'hearts', 0.4], ['pop', ['hearts', 0.2], 0.4], ['pop', 'you', 0.4]],
      draw(k) {
        paper(k, '#e9f1fb');
        hud(k, { nap: 87.8, vi: 286, rut: 31, ho: 1200, sao: 7 });
        zaloGroup(k, 560, 120, 820, 860, { msgs: [{ name: 'Admin Zena 🛡', text: '⚙ Nâng cấp AI 2.0 · tạm dừng rút 48h', cue: 'admin', color: '#2e6da4' }, { name: 'Lan Hương', text: '❤️❤️ Zena đỉnh', cue: 'hearts', color: '#f29bb8' }, { name: 'Tuấn Phát', text: 'AI 2.0 chắc lãi gấp đôi 🚀', cue: ['hearts', 0.6], color: '#6bb56b' }, { name: 'Bạn', text: '❤️', cue: 'you', me: true }] });
        if (k.t > k.cue('hearts')) for (let i = 0; i < 14; i++) { const u = ((k.t - k.cue('hearts')) * 0.8 + i / 14) % 1; k.text('❤', 1450 + Math.sin(i * 2 + k.t) * 80, 900 - u * 700, { size: 50, color: '#d63a2f' }); }
        k.char(300, G, S, { ...TOAN, hat: null, face: 'happy', pose: 'hold' });
      },
    },
    {
      say: 'Bốn mươi tám giờ sau, bạn mở Zalo. {gone}Nhóm AI Đổi Đời ba nghìn người, giờ chỉ còn một dòng: Trưởng nhóm đã giải tán nhóm. {mine}Còn nhóm Gia Tộc AI, nhóm của bạn, vẫn đủ ba mươi hai người. {tag}Và cả ba mươi hai người, đang cùng lúc gắn tên bạn. {fuck}Lần đầu tiên trong đời, bạn buột miệng một câu: bỏ mẹ rồi. Mà không phải vì hết xăng.',
      sfx: [['slideDown', 'gone', 0.6], ['ding', 'mine', 0.4], ['ding', ['tag', 0.1], 0.5], ['ding', ['tag', 0.25], 0.5], ['ding', ['tag', 0.4], 0.5], ['ding', ['tag', 0.55], 0.5], ['boom', 'fuck', 0.6]],
      draw(k) {
        paper(k, '#14161d');
        hud(k, { nap: 87.8, vi: 286, rut: 31, ho: 1200, sao: 7 });
        if (k.t < k.cue('mine')) {
          zaloGroup(k, 560, 160, 820, 760, { title: 'AI ĐỔI ĐỜI 🚀🚀', members: '0 thành viên', banner: 'Trưởng nhóm đã giải tán nhóm', bannerCue: 'gone', msgs: [] });
        } else {
          const tags = ['@Toàn trả tiền đây', '@Toàn rút được không?', '@Toàn ơi ới!!', '@Toàn mày lừa tao à', '@Toàn bà mày bán đất đấy', '@Toàn !!!!!'];
          zaloGroup(k, 560, 120, 820, 860, { title: 'GIA TỘC AI 👑', members: '32 thành viên', msgs: tags.map((t, i) => ({ name: ['Cậu Ba', 'Dì Út', 'Anh rể', 'Ông thông gia', 'Mợ Hai', 'Ông Bảy chột'][i], text: t, cue: ['tag', i * 0.15], color: ['#3d7fc1', '#f29bb8', '#6bb56b', '#8a8f98', '#e8b84a', '#8a6a4f'][i] })) });
        }
        k.char(300, G, S, { ...TOAN, hat: null, face: k.t > k.cue('fuck') ? 'shout' : k.t > k.cue('tag') ? 'shock' : 'blank', pose: k.t > k.cue('fuck') ? 'facepalm' : 'hold', sweat: k.t > k.cue('tag'), gloom: k.at('gone', 1) * 0.5 });
        if (k.t > k.cue('fuck')) k.burst(1600, 300, 150, 'BỎ MẸ RỒI!', { p: k.at('fuck', 0.3) });
      },
    },
    nextEpisodeScene({
      title: 'Nếu Bạn Kéo Cả Họ Vào App AI… Lúc App Sập (Phần 2)',
      hook: '32 người họ hàng, một mảnh đất hương hoả, một chiếc xe ga buộc nơ. Và ông Chủ tịch vẫn đang "đi công tác".',
      when: 'Phần 2 · tối thứ Năm',
      say: '{next}Phần hai: ba mươi hai người họ hàng, một mảnh đất hương hoả, một chiếc xe ga buộc nơ đỏ. Và ông Chủ tịch, thì vẫn đang đi công tác.',
      art(k) {
        k.char(-260, 170, 380, { ...TOAN, hat: null, face: 'shock', pose: 'shrug', sweat: true });
        k.char(240, 170, 420, { ...LUU, face: 'angry', vein: true, pose: 'point' });
      },
    }),
    subscribeScene({
      question: 'Nếu là bạn, bạn có nạp 2,9 triệu không?',
      channel: 'Nếu Bạn Là',
      say: '{q}Nếu là bạn, bạn có nạp hai triệu chín không? Hay bạn biết ai trong nhà đang nạp? Bình luận cho mình biết. {sub}Đăng ký và bật chuông, để xem chú Toàn đi xuống thế nào.',
    }),
  ],
};
