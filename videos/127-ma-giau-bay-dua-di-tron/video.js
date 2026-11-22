// Nhân Gian Chưa Kể — tập Ma Giấu | Bảy Đứa Đi Trốn, Lúc Mở Mắt Tám Đứa Chạy Về. Kịch bản + sổ dữ kiện: kich-ban.md.
// Công thức Gọi Hồn: trò chơi + tục gõ mâm ai cũng biết; biết điều chỉ người trong cuộc biết (đếm từ 71, "anh Sún"); bí mật người sống (bố bỏ em trong hầm);
// một điều kiêng duy nhất (không hỏi tên đứa thừa); hai danh tính không chọn. Sửa 20/11 theo hướng chân thật: chỉ một khoảnh khắc "không thể" (đứa thứ tám đếm từ 71). Không tả xác, không vẽ trẻ bị vùi.
import * as thumbs from '/videos/127-ma-giau-bay-dua-di-tron/thumbs.js';
import { PAPER, AMBER, COLD, shade, cold, tag, quote, chapter, rules, nextScene, subScene, oil } from '/channel/nhan-gian.js';
import { dollBike } from '/channel/nhan-gian-doll.js';
import { buong, net, duongDe, dep } from '/channel/nhan-gian-cauco.js';
import { ME, BA, sanNha, SAN, gianNha, GIAN, muaPhun } from '/channel/nhan-gian-babi.js';
import {
  TOI, TIT, HIEU, MAI, BAN, LANH, LANH_79, BO, BO_NHO, DAN, ch, lie, mamDong, chumNhan, quaNhan, batPhan, no, cuoc, duoc, sot, muaTo,
  vuonNhan, NHAN, ngoXom, sanKho, hamA, HAM, hamTrong, bepVach, banTho, sepia,
} from '/channel/nhan-gian-magiau.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const black = (k, c = '#07060a') => { k.ctx.fillStyle = c; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); };
const zoom = (k, cx, cy, s, fn) => k.group({ x: cx, y: cy, s }, () => k.group({ x: -cx, y: -cy }, fn));
const grain = (sc) => ({ ...sc, draw(k) { const s = 1 + 0.05 * Math.min(1, k.t / Math.max(1, k.d)); k.group({ x: k.W / 2, y: k.H / 2, s }, () => k.group({ x: -k.W / 2, y: -k.H / 2 }, () => sc.draw(k))); sepia(k, 0.75); } });
const DAY = { x: 1500, y: 300, r: 1700 };
const LAMP = { x: GIAN.lamp.x, y: GIAN.lamp.y - 70, r: 680, warm: 1, flicker: 1 };
const dimDay = (k) => shade(k, 0.2, [DAY], { vig: 0.4 });
const dimDusk = (k, x = 1000) => shade(k, 0.52, [{ x, y: 560, r: 1150, warm: 1 }], { vig: 0.5 });
const dimNight = (k, l = [{ x: 980, y: 600, r: 760 }], a = 0.74) => shade(k, a, l, { vig: 0.5 });
const inNight = (k, o = {}) => { gianNha(k, o); oil(k, GIAN.lamp.x, 682, 1); };
const ROW = [[300, TOI, 335], [470, HIEU, 370], [640, MAI, 315], [800, BAN[0], 315], [1140, BAN[1], 305], [1300, BAN[2], 305], [1460, BAN[3], 315]];
// Hàng bọn trẻ trước gốc nhãn; o.lanh = có đứa thứ tám.
function hang(k, o = {}) { ROW.forEach(([x, p, h]) => ch(k, x, 1010, h, { ...p, face: o.face ?? 'calm', arms: 'down' })); if (o.lanh) ch(k, 1640, 1010, 270, { ...LANH, face: o.lface ?? 'calm', arms: 'down' }); }
// Người đếm úp mặt vào gốc nhãn.
const up = (k, p, h = 275, o = {}) => ch(k, NHAN.x - 128, 915, h, { ...p, view: 'side', arms: 'cover', face: 'sleep', ...o });
// Cận mặt trên nền tối.
function mat(k, p, o = {}) { black(k, o.bg ?? '#141019'); zoom(k, 960, 430, 2.3, () => ch(k, 960, 860, o.h ?? 560, { ...p, arms: o.arms ?? 'chest', face: o.face ?? 'calm', tears: o.tears ?? 0, talk: o.talk ?? 0 })); shade(k, 0.45, [{ x: 960, y: 450, r: 740, warm: o.warm ?? 1 }], { vig: 0.6 }); }
// Khói thuốc lào.
function khoi(k, x, y) { const { ctx } = k; ctx.save(); ctx.globalAlpha = 0.35; ctx.strokeStyle = '#ddd'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); for (let j = 1; j < 11; j++) ctx.lineTo(x + Math.sin(k.t * 1.2 + j * 0.7) * j * 3, y - j * 18); ctx.stroke(); ctx.restore(); }
// Đoàn người đi tìm: đuốc + mâm, chạy ngang theo p.
function doan(k, p, o = {}) { const y = o.y ?? 960; DAN.forEach((d, i) => { const x = -200 + p * 2200 - i * 230; duoc(k, x + 118, y - 400, 1.15); ch(k, x, y, 450, { ...d, view: 'side', action: 'walk', face: 'fear', arms: 'point' }); }); }

const video = {
  meta: {
    title: 'Ma Giấu | Bảy Đứa Đi Trốn, Lúc Mở Mắt Tám Đứa Chạy Về',
    description: `Năm 2001, xóm tôi chơi trốn tìm lúc chập tối. Thằng em tôi úp mặt vào gốc nhãn sau vườn, đếm đến một trăm. Bảy đứa đi trốn. Lúc nó mở mắt, tám đứa chạy về.
Đứa thứ tám đòi đếm một lượt. Sau lượt ấy, em trai tôi không về nhà nữa.

Một cái mâm đồng méo, một bát cơm để phần có một thìa đất ướt, và cây nhãn ngọt nhất xóm mà suốt hai mươi hai năm bố tôi không ăn một quả.`,
    footer: `📖 Truyện hư cấu dựa trên tín ngưỡng dân gian về ma giấu và tục gõ mâm gõ nồi đi tìm người. Tên người, tên địa danh và tình tiết đều hư cấu.
🕯️ Nhân Gian Chưa Kể: những chuyện người xưa truyền tai nhau, mà chưa ai giải thích được.`,
    links: [['▶ Tập trước: Ông Ba Bị', '124-ong-ba-bi-nha-may-may-dua'], ['▶ Gọi Hồn', '106-goi-hon-nguoi-ve-goi-vo-la-chi'], ['🔔 Đăng ký', 'https://www.youtube.com/@nhangianchuake?sub_confirmation=1']],
    tags: ['ma giấu', 'bị ma giấu', 'chuyện ma giấu người', 'trốn tìm', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'chuyện tâm linh có thật', 'truyện ma làng quê', 'hoạt hình kinh dị', 'nhân gian chưa kể'],
    hashtags: ['truyenma', 'magiau', 'tamlinh'],
    gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 0.95,
    lead: 0.4, tail: 0.8, pause: 0.35,
    transition: 'fade', sfxTransitions: false, camera: 0.03, scribble: false,
    sfxVolume: 0.5, paper: '#07080c', privacy: 'private',
  },
  thumbnail: thumbs.a,

  scenes: [
    // ===== MỞ ĐẦU =====
    {
      say: '{a}Năm 2001, xóm tôi chơi trốn tìm lúc chập tối. Thằng em tôi úp mặt vào gốc nhãn sau vườn, đếm đến một trăm. {b}Bảy đứa đi trốn. {c}Lúc nó mở mắt, tám đứa chạy về.',
      sfx: [['wind', 0, 0.3], ['stinger', 'c', 0.45]],
      draw(k) {
        vuonNhan(k, { time: 'dusk' });
        if (k.t < k.cue('c')) { up(k, TIT); if (after(k, 'b')) ROW.forEach(([x, p, h], i) => ch(k, x + (x > 960 ? 1 : -1) * k.at('b', 1.8, 'linear') * 900, 1010, h, { ...p, view: 'side', flip: x < 960, action: 'walk', face: 'happy', arms: 'down' })); dimDusk(k); tag(k, 'NĂM 2001', 'a'); return; }
        hang(k, { lanh: true, face: 'fear' }); ch(k, 150, 1010, 275, { ...TIT, view: 'side', face: 'shock', arms: 'point' }); dimDusk(k); quote(k, 'Bảy đứa đi trốn. Tám đứa chạy về.', 'c', { color: AMBER, size: 62, y: 150 });
      },
    },
    {
      say: '{a}Đứa thứ tám là một đứa con gái nhỏ, chân đất, người có mùi đất ướt. Không đứa nào biết nó là ai. {b}Đêm ấy, nó đòi đếm một lượt. {c}Và sau lượt ấy, em trai tôi không về nhà nữa. {d}Phải hai ngày sau, tôi mới biết cây nhãn ấy đã mọc lên từ đâu.',
      sfx: [['heartbeat', 'c', 0.4], ['stinger', 'd', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, LANH, { face: 'calm', arms: 'down', warm: 0.3 }); return; }
        if (k.t < k.cue('d')) { vuonNhan(k, { time: 'night' }); up(k, LANH, 270); dimNight(k, [{ x: 880, y: 720, r: 480 }]); quote(k, 'Em trai tôi không về nhà nữa.', 'c', { color: COLD, size: 60 }); return; }
        vuonNhan(k, { time: 'night' }); dimNight(k, [{ x: NHAN.x, y: 760, r: 520 }]); quote(k, 'Cây nhãn ấy đã mọc lên từ đâu?', 'd', { color: AMBER, size: 62 });
      },
    },
    {
      say: '{a}Đây là Nhân Gian Chưa Kể. Nếu bạn muốn nghe tiếp những chuyện chưa có lời giải, hãy bấm đăng ký. {b}Còn bây giờ, xin bạn tắt bớt đèn.',
      draw(k) { black(k); const fade = 1 - k.at('b', 3, 'linear') * 0.7; oil(k, 960, 790, 2.1); shade(k, 0.84, [{ x: 960, y: 620, r: 680 * fade, warm: 1, flicker: 1 }], { vig: 0.5 }); k.text('NHÂN GIAN CHƯA KỂ', 960, 300, { size: 92, font: 'title', color: AMBER, fx: 'fade', p: k.at('a', 1) * fade }); },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Cây nhãn của bố',
      say: '{a}Nhà tôi ở cuối xóm, vùng nhãn lồng của đồng bằng Bắc Bộ. Sau vườn có một cây nhãn to nhất xóm, tán trùm kín nửa khu vườn. Bố tôi trồng nó từ năm bố lên mười. {b}Nhãn nhà tôi ngọt có tiếng, mùa nào người ta cũng đến tận vườn đặt mua.',
      draw(k) {
        if (k.t < k.cue('b')) { vuonNhan(k, { time: 'day' }); dimDay(k); chapter(k, 1, 'Cây nhãn của bố'); return; }
        black(k, '#3c5a32'); for (let i = 0; i < 5; i++) chumNhan(k, 300 + i * 330, 160 + (i % 2) * 90, 3.2); sot(k, 960, 1040, 2); shade(k, 0.2, [DAY], { vig: 0.5 });
      },
    },
    {
      say: '{a}Nhưng bố tôi có mấy điều lạ với cây nhãn ấy. Bố không bao giờ ăn một quả nào, dù chỉ nếm. {b}Bố cấm trẻ con chơi dưới gốc. {c}Và chiều nào cũng vậy, lúc trời nhá nhem, bố ra ngồi dưới gốc, rít một điếu thuốc lào, không nói gì. {d}Hỏi thì bố chỉ bảo: {q}cây của bố, bố thích ngồi.',
      draw(k) {
        if (k.t < k.cue('b')) { vuonNhan(k, { time: 'day' }); ch(k, 760, 990, 490, { ...BO, view: 'side', face: 'blank', arms: 'back' }); ch(k, 1190, 990, 470, { ...DAN[1], view: 'side', flip: true, face: 'happy', arms: 'point', talk: 0.5 }); quaNhan(k, 1040, 800, 0.9); dimDay(k); return; }
        if (k.t < k.cue('c')) { vuonNhan(k, { time: 'day' }); ch(k, 700, 990, 490, { ...BO, view: 'side', face: 'angry', arms: 'point', talk: 0.6 }); ch(k, 1160, 1000, 300, { ...TIT, view: 'side', flip: true, face: 'fear', arms: 'chest' }); ch(k, 1340, 1000, 335, { ...TOI, view: 'side', flip: true, face: 'fear', arms: 'down' }); dimDay(k); return; }
        vuonNhan(k, { time: 'dusk' }); ch(k, 800, 985, 470, { ...BO, action: 'sit', view: 'side', face: 'blank', arms: 'hold' }); khoi(k, 880, 730); dimDusk(k, 880); quote(k, '"Cây của bố, bố thích ngồi."', 'q', { size: 56 });
      },
    },
    {
      say: '{a}Trên vách bếp nhà tôi treo một cái mâm đồng méo mó, vành móp đi một bên, mặt mâm lõm chi chít như bị ai đập. Không ai được lấy xuống dùng. {b}Tôi hỏi bà nội, bà chỉ bảo: {q}mâm ấy đã đi tìm người.',
      sfx: [['drip', 'q', 0.25]],
      draw(k) { bepVach(k); shade(k, 0.5, [{ x: 960, y: 520, r: 640, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, '"Mâm ấy đã đi tìm người."', 'q', { color: AMBER, size: 62 }); },
    },
    {
      say: '{a}Bà nội tôi chỉ dặn anh em tôi đúng một điều, dặn từ bé. {r}Chơi trốn tìm, đang chơi mà thấy thừa một đứa, thì không được hỏi tên nó. {b}Cứ thế giải tán, ai về nhà nấy. Đừng hỏi, đừng gọi, đừng nhìn lại.',
      sfx: [['click', 'r', 0.3], ['heartbeat', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('r')) { inNight(k); ch(k, 760, 950, 450, { ...BA, view: 'side', face: 'blank', arms: 'point', talk: 0.5 }); ch(k, 1090, 960, 330, { ...TOI, view: 'side', flip: true, face: 'calm', arms: 'down' }); ch(k, 1260, 965, 275, { ...TIT, view: 'side', flip: true, face: 'calm', arms: 'down' }); shade(k, 0.62, [LAMP, { x: 900, y: 620, r: 640, warm: 1, flicker: 1 }], { vig: 0.5 }); return; }
        mat(k, BA, { face: 'blank', talk: 0.5 }); quote(k, 'Thấy thừa một đứa: không được hỏi tên nó.', 'r', { color: AMBER, size: 58, until: 'b' }); quote(k, 'Đừng hỏi, đừng gọi, đừng nhìn lại.', 'b', { color: COLD, size: 60 });
      },
    },
    {
      say: '{a}Năm ấy tôi mười hai tuổi. Em trai tôi tên Tít, lên tám. Tít là đứa đếm giỏi nhất xóm. Nó thích đếm, đếm bậc thềm, đếm quả nhãn, đếm cả số lần bà nội ho. {b}Cứ mỗi lần nó đếm to trong nhà, bố tôi lại gắt lên bắt im. {c}Tôi tưởng bố khó tính.',
      draw(k) {
        sanNha(k, { time: 'day' }); ch(k, 760, 985, 335, { ...TOI, face: 'happy', arms: 'down' }); ch(k, 1010, 990, 280, { ...TIT, face: after(k, 'b') ? 'fear' : 'happy', arms: after(k, 'b') ? 'chest' : 'point', talk: after(k, 'b') ? 0 : 0.6 });
        if (after(k, 'b')) ch(k, 1290, 975, 490, { ...BO, view: 'side', flip: true, face: 'angry', arms: 'point', talk: 0.6 });
        dimDay(k); if (!after(k, 'b')) k.text(String(1 + Math.floor(k.t * 1.6) % 30), 1010, 560, { size: 90, font: 'title', color: AMBER, outline: '#000', outlineWidth: 8 });
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Đứa thứ tám',
      say: '{a}Hai mươi tháng Sáu âm lịch năm 2001. Đang mùa nhãn. Từ sáng sớm, bố tôi chở hai sọt nhãn lên chợ Long Biên, hẹn mai mới về. {b}Chiều hôm ấy, cả xã mất điện. Trời oi, người lớn kéo chiếu ra ngõ ngồi quạt. {c}Bọn trẻ trong xóm rủ nhau ra vườn nhà tôi, vì bố tôi vắng nhà.',
      draw(k) {
        if (k.t < k.cue('b')) { duongDe(k, { time: 'day' }); const x = k.lerp(200, 1640, k.at('a', 9, 'linear')); dollBike(k, x, 900, 470, { rider: { ...BO, face: 'calm' }, color: '#3a4a4a' }); sot(k, x - 190, 850, 1.05); sot(k, x - 90, 850, 1.05); dimDay(k); tag(k, '20 THÁNG SÁU · 2001', 'a'); chapter(k, 2, 'Đứa thứ tám'); return; }
        ngoXom(k, { time: 'dusk' }); ch(k, 300, 985, 440, { ...DAN[1], hat: null, action: 'sit', face: 'calm', arms: 'hold' }); ch(k, 560, 985, 450, { ...DAN[0], action: 'sit', face: 'calm', arms: 'hold' });
        if (after(k, 'c')) { const p = k.at('c', 4, 'linear'); [TOI, HIEU, MAI, TIT].forEach((c, i) => ch(k, 900 + p * 1200 - i * 150, 1000, i === 3 ? 275 : 325, { ...c, view: 'side', action: 'walk', face: 'happy', arms: 'down' })); }
        dimDusk(k, 800);
      },
    },
    {
      say: '{a}Bảy đứa chúng tôi đi trốn: tôi, thằng Hiếu béo, cái Mai, và bốn đứa nữa. Tít làm người đếm. {b}Trời đã nhá nhem. {c}Tít úp mặt vào gốc nhãn, bắt đầu đếm: {q}một, hai, ba.',
      sfx: [['wind', 'b', 0.3]],
      draw(k) {
        vuonNhan(k, { time: 'dusk' });
        if (k.t < k.cue('c')) { hang(k, { face: 'happy' }); ch(k, 1660, 1010, 275, { ...TIT, face: 'happy', arms: 'wave' }); dimDusk(k); return; }
        up(k, TIT); ROW.forEach(([x, p, h]) => ch(k, x + (x > 960 ? 1 : -1) * k.at('c', 2, 'linear') * 900, 1010, h, { ...p, view: 'side', flip: x < 960, action: 'walk', face: 'happy', arms: 'down' })); dimDusk(k); quote(k, '"Một, hai, ba…"', 'q', { color: AMBER, size: 62 });
      },
    },
    {
      say: '{a}Tôi chui vào đống rơm góc vườn. Đếm đến một trăm, Tít mở mắt, quay lại. Luật là đứa nào chạy về chạm được gốc nhãn thì thoát. {b}Từng đứa một ùa ra, chạy về gốc cây, thở hổn hển. {c}Tít đứng đếm lại. Rồi nó cau mặt: {q}sao lại tám đứa?',
      sfx: [['heartbeat', 'c', 0.4], ['stinger', 'q', 0.45]],
      draw(k) {
        vuonNhan(k, { time: 'dusk' });
        if (k.t < k.cue('b')) { zoom(k, NHAN.rom, 800, 1.9, () => { ch(k, NHAN.rom, 960, 330, { ...TOI, action: 'sit', face: 'happy', arms: 'chest' }); const { ctx } = k; ctx.fillStyle = '#c8a860'; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(NHAN.rom, 960, 200, 76, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }); dimDusk(k, NHAN.rom); return; }
        hang(k, { lanh: after(k, 'c'), face: after(k, 'q') ? 'fear' : 'happy' }); ch(k, 150, 1010, 275, { ...TIT, view: 'side', face: after(k, 'c') ? 'angry' : 'happy', arms: 'point', talk: after(k, 'q') ? 0.6 : 0 }); dimDusk(k); quote(k, '"Sao lại tám đứa?"', 'q', { color: AMBER, size: 66, y: 150 });
      },
    },
    {
      say: '{a}Chúng tôi nhìn nhau. Đứng cuối hàng là một đứa con gái nhỏ, chừng bảy tuổi, tóc cắt ngang trán, mặc áo cộc màu cháo lòng đã cũ, chân đất. {b}Người nó có mùi đất ướt, dù cả tháng ấy trời không mưa. {c}Không đứa nào biết nó. Thằng Hiếu béo hỏi: {q}mày con nhà ai? Mày tên gì?',
      sfx: [['heartbeat', 'q', 0.45]],
      draw(k) {
        vuonNhan(k, { time: 'dusk' });
        if (k.t < k.cue('c')) { zoom(k, 1560, 760, 2.1, () => { ch(k, 1460, 1010, 315, { ...BAN[3], view: 'side', face: 'fear', arms: 'down' }); ch(k, 1640, 1010, 270, { ...LANH, face: 'calm', arms: 'down' }); }); dimDusk(k, 1400); return; }
        ch(k, 1060, 1010, 370, { ...HIEU, view: 'side', face: 'angry', arms: 'point', talk: after(k, 'q') ? 0.6 : 0 }); ch(k, 1420, 1010, 270, { ...LANH, view: 'side', flip: true, face: 'calm', arms: 'down' }); ch(k, 760, 1010, 335, { ...TOI, view: 'side', face: 'fear', arms: 'raise' }); dimDusk(k, 1100); quote(k, '"Mày tên gì?"', 'q', { color: AMBER, size: 72, y: 150 });
      },
    },
    {
      say: '{a}Tôi chưa kịp bịt miệng nó. Con bé cười, hai mắt híp lại: {q}Lành. Em tên Lành. {b}Cái tên ấy với tôi không có nghĩa gì. Tôi chỉ nhớ, lúc nó nói, gió ở đâu thổi qua tán nhãn, mùi đất ướt sực lên cả vườn.',
      sfx: [['stinger', 'q', 0.4], ['wind', 'b', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, LANH, { face: 'happy', arms: 'down', warm: 0.4, talk: after(k, 'q') ? 0.5 : 0 }); quote(k, '"Lành. Em tên Lành."', 'q', { color: COLD, size: 72 }); return; }
        vuonNhan(k, { time: 'dusk' }); hang(k, { lanh: true, face: 'fear', lface: 'happy' }); dimDusk(k);
      },
    },
    {
      say: '{a}Lành bảo: lượt này em đếm cho. Bọn trẻ thấy lạ thì thích. Thằng Tít cũng chạy đi trốn. {b}Lành úp mặt vào gốc nhãn, đúng chỗ Tít vừa úp. Nhưng nó không đếm từ một. Nó đếm: {q}bảy mươi mốt. Bảy mươi hai. {c}Thằng Hiếu cười: đếm thế là ăn gian! {d}Lành không quay lại. Nó bảo: {r}anh ấy đếm đến bảy mươi rồi.',
      sfx: [['heartbeat', 'q', 0.4], ['stinger', 'r', 0.45]],
      draw(k) {
        vuonNhan(k, { time: 'dusk' });
        if (k.t < k.cue('b')) { hang(k, { lanh: true, face: 'happy', lface: 'happy' }); dimDusk(k); return; }
        up(k, LANH, 270); ch(k, 1300, 1010, 370, { ...HIEU, view: 'side', flip: true, face: after(k, 'd') ? 'fear' : 'happy', arms: 'point', talk: after(k, 'c') && !after(k, 'd') ? 0.7 : 0 }); ch(k, 1500, 1010, 335, { ...TOI, view: 'side', flip: true, face: 'fear', arms: 'down' });
        dimDusk(k, 980); quote(k, '"Bảy mươi mốt. Bảy mươi hai."', 'q', { color: AMBER, size: 62, until: 'd' }); quote(k, '"Anh ấy đếm đến bảy mươi rồi."', 'r', { color: COLD, size: 62 });
      },
    },
    {
      say: '{a}Chỉ ba mươi tiếng là đến một trăm. Chúng tôi chạy toán loạn. Tôi lại chui vào đống rơm. {b}Lành quay lại. Nó không đi tìm như người ta đi tìm. Nó đi thẳng đến từng chỗ, không ngó nghiêng, {c}đặt bàn tay lên vai từng đứa: {q}thấy rồi. {d}Tay nó lạnh, và ẩm, như đất dưới sâu.',
      sfx: [['heartbeat', 'c', 0.4]],
      draw(k) {
        vuonNhan(k, { time: 'night' });
        if (k.t < k.cue('b')) { up(k, LANH, 270); ROW.forEach(([x, p, h]) => ch(k, x + (x > 960 ? 1 : -1) * k.at('a', 2, 'linear') * 900, 1010, h, { ...p, view: 'side', flip: x < 960, action: 'walk', face: 'fear', arms: 'down' })); dimNight(k, [{ x: 960, y: 640, r: 800 }], 0.6); return; }
        const p = k.at('b', Math.max(4, k.cue('d') - k.cue('b')), 'linear'), x = k.lerp(1640, 690, p);
        ch(k, 620, 1010, 330, { ...HIEU, action: 'kneel', view: 'side', face: after(k, 'c') ? 'fear' : 'calm', arms: 'chest' }); ch(k, 1120, 1010, 300, { ...MAI, action: 'kneel', view: 'side', flip: true, face: 'fear', arms: 'chest' });
        ch(k, x, 1010, 270, { ...LANH, view: 'side', flip: true, action: p < 1 ? 'walk' : 'stand', face: 'calm', arms: p >= 1 ? 'point' : 'down' });
        dimNight(k, [{ x, y: 780, r: 620 }], 0.62); quote(k, '"Thấy rồi."', 'q', { color: COLD, size: 76, until: 'd' });
      },
    },
    {
      say: '{a}Tôi là đứa thứ bảy. Nó cúi xuống sát tai tôi, nói khẽ: {q}về bảo anh Sún, anh ấy chưa đếm xong đâu. {b}Rồi nó đứng thẳng lên, nhìn quanh vườn, cười: {r}còn một đứa nữa. Nó trốn kỹ lắm.',
      sfx: [['stinger', 'q', 0.45], ['heartbeat', 'r', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { black(k, '#1a130c'); zoom(k, 960, 560, 1.9, () => { ch(k, 800, 980, 340, { ...TOI, action: 'sit', view: 'side', face: 'fear', arms: 'chest' }); ch(k, 1060, 980, 290, { ...LANH, view: 'side', flip: true, face: 'calm', arms: 'down', lean: -12, talk: after(k, 'q') ? 0.4 : 0 }); }); shade(k, 0.45, [{ x: 960, y: 520, r: 720, warm: 0.5 }], { vig: 0.6 }); quote(k, '"Về bảo anh Sún, anh ấy chưa đếm xong đâu."', 'q', { color: COLD, size: 56 }); return; }
        vuonNhan(k, { time: 'night' }); ch(k, 1240, 1000, 280, { ...LANH, face: 'happy', arms: 'down' }); dimNight(k, [{ x: 1240, y: 800, r: 460 }], 0.76); quote(k, '"Còn một đứa nữa. Nó trốn kỹ lắm."', 'r', { color: AMBER, size: 60 });
      },
    },
    {
      say: '{a}Trời tối sập. Cái Mai bắt đầu khóc. Ngoài ngõ, người lớn gọi con về ăn cơm. {b}Cả bọn ùa chạy, mỗi đứa một ngả. Tôi cũng chạy. {c}Tôi không quay lại.',
      sfx: [['whoosh', 'b', 0.3], ['heartbeat', 'c', 0.45]],
      draw(k) {
        vuonNhan(k, { time: 'night' });
        if (k.t < k.cue('b')) { ch(k, 960, 1005, 315, { ...MAI, face: 'cry', arms: 'cover', tears: 1 }); ch(k, 720, 1010, 370, { ...HIEU, face: 'fear', arms: 'down' }); ch(k, 1190, 1010, 335, { ...TOI, face: 'fear', arms: 'down' }); dimNight(k, [{ x: 960, y: 760, r: 600 }]); return; }
        const p = k.at('b', 3, 'linear'); ROW.forEach(([x, c, h]) => ch(k, x + (x > 960 ? 1 : -1) * p * 1300, 1010, h, { ...c, view: 'side', flip: x < 960, action: 'walk', face: 'fear', arms: 'raise' })); dimNight(k, [{ x: 960, y: 760, r: 760 }], 0.68); quote(k, 'Tôi không gọi tên đứa nào cả.', 'c', { color: AMBER, size: 62 });
      },
    },
    {
      say: '{a}Về đến nhà, bà nội đang dọn mâm, hỏi: {q}thằng Tít đâu? {b}Tôi đứng sững. Bà nhìn tôi, rồi nhìn ra vườn. {c}Bà hỏi, giọng rất khẽ: {r}lúc chơi, có thừa đứa nào không? {d}Tôi gật đầu.',
      sfx: [['stinger', 'd', 0.45]],
      draw(k) {
        inNight(k, { chieu: true }); ch(k, 760, 950, 450, { ...BA, view: 'side', face: after(k, 'c') ? 'blank' : 'calm', arms: 'hold', talk: (after(k, 'q') && !after(k, 'b')) || (after(k, 'r') && !after(k, 'd')) ? 0.5 : 0 }); ch(k, 1130, 960, 335, { ...TOI, view: 'side', flip: true, face: 'fear', arms: 'down', tilt: after(k, 'd') ? Math.sin(k.t * 5) * 6 : 0 });
        shade(k, 0.66, [LAMP, { x: 920, y: 640, r: 620, warm: 1, flicker: 1 }], { vig: 0.5 }); quote(k, '"Thằng Tít đâu?"', 'q', { size: 62, until: 'c' }); quote(k, '"Lúc chơi, có thừa đứa nào không?"', 'r', { color: AMBER, size: 60 });
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      chapter: 'Cái mâm đồng',
      say: '{a}Bà không nói một lời. Bà bắc ghế, lấy cái mâm đồng méo trên vách xuống, cầm cái muôi đồng, đi thẳng ra ngõ, vừa đi vừa gõ. {g}Keng. Keng. Keng. {b}Ở làng tôi, người bị ma giấu thì phải gõ mâm gõ nồi mà gọi. Các cụ bảo, người bị giấu chỉ còn nghe được tiếng kim khí. {c}Cả xóm đổ ra. Đuốc, đèn pin, mâm, nồi, thau chậu khua vang cả cánh đồng. {q}Tít ơi. Tít ơi về đi.',
      sfx: [['gong', 'g', 0.4], ['gong', ['g', 1], 0.4], ['gong', ['g', 2], 0.4], ['gong', 'c', 0.3], ['gong', ['c', 2.5], 0.3], ['gong', 'q', 0.3]],
      draw(k) {
        if (k.t < k.cue('g')) { bepVach(k, { mam: false }); ch(k, 960, 1090, 620, { ...BA, face: 'blank', arms: 'raise' }); mamDong(k, 960, 500, 1.5); shade(k, 0.55, [{ x: 960, y: 520, r: 640, warm: 1, flicker: 1 }], { vig: 0.6 }); chapter(k, 3, 'Cái mâm đồng'); return; }
        if (k.t < k.cue('c')) { ngoXom(k, { time: 'night' }); const x = k.lerp(420, 1250, k.at('g', 12, 'linear')); ch(k, x, 985, 450, { ...BA, view: 'side', action: 'walk', face: 'blank', arms: 'hold' }); mamDong(k, x + 90, 780, 0.5, { ring: (k.t * 0.9) % 1 }); dimNight(k, [{ x, y: 760, r: 560, warm: 0.6 }], 0.72); return; }
        ngoXom(k, { time: 'night' }); doan(k, k.at('c', Math.max(5, k.d - k.cue('c')), 'linear')); dimNight(k, [{ x: 960, y: 760, r: 1100, warm: 1, flicker: 1 }], 0.62); quote(k, '"Tít ơi. Tít ơi về đi."', 'q', { color: AMBER, size: 66 });
      },
    },
    {
      say: '{a}Người ta mò ao, soi giếng, lật từng đống rơm, rọi từng bụi tre. Gần sáng, công an xã xuống lập biên bản, loa xã đọc tin tìm trẻ lạc. {b}Đến sáng vẫn không thấy. Chỉ thấy đôi dép nhựa xanh của thằng Tít, xếp ngay ngắn trên bờ ao đầu xóm. {c}Hai mũi dép quay về phía vườn nhà tôi.',
      sfx: [['stinger', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { vuonNhan(k, { time: 'night' }); doan(k, 0.45 + k.at('a', 10, 'linear') * 0.5, { y: 985 }); dimNight(k, [{ x: 960, y: 760, r: 1000, warm: 1, flicker: 1 }], 0.64); return; }
        const { ctx } = k; const g = ctx.createLinearGradient(0, 0, 0, 600); g.addColorStop(0, '#8a9aa8'); g.addColorStop(1, '#d8c4a4'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 2200, 800);
        ctx.fillStyle = '#5e7a7e'; ctx.fillRect(-100, 520, 2200, 300); ctx.strokeStyle = 'rgba(220,230,230,0.35)'; ctx.lineWidth = 3; for (let i = 0; i < 9; i++) { const y = 560 + i * 28, x = (i * 260 + k.t * 20) % 2100 - 100; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 160, y); ctx.stroke(); }
        ctx.fillStyle = '#8a7a50'; ctx.beginPath(); ctx.moveTo(-100, 820); ctx.quadraticCurveTo(960, 760, 2020, 820); ctx.lineTo(2020, 1200); ctx.lineTo(-100, 1200); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#7c8a48'; ctx.fillRect(-100, 900, 2200, 300);
        dep(k, 900, 850, 1.5, { color: '#3f7f9a', wire: false, r: -0.1 }); dep(k, 1030, 856, 1.5, { color: '#3f7f9a', wire: false, r: -0.1 }); shade(k, 0.22, [DAY], { vig: 0.5 }); quote(k, 'Hai mũi dép quay về phía vườn nhà tôi.', 'c', { color: AMBER, size: 58 });
      },
    },
    {
      say: '{a}Tối hôm trước, bà có xới một bát cơm để phần Tít, đặt trên bếp. {s}Sáng ra, giữa bát cơm trắng có một thìa đất ướt. {b}Có thể là chuột. Có thể là ai đó. Nhưng bà nội nhìn bát cơm rất lâu. {c}Bà bảo, người bị ma giấu, nó cho ăn đất mà tưởng là cơm. {d}Ăn càng lâu, càng quên đường về.',
      sfx: [['drip', 's', 0.3], ['heartbeat', 'd', 0.45]],
      draw(k) { black(k, '#1e1610'); zoom(k, 960, 560, 1 + 0.3 * k.t / k.d, () => batPhan(k, 960, 720, 4.2, after(k, 's', 1.5) ? 1 : 0)); shade(k, 0.35, [{ x: 960, y: 520, r: 780, warm: 1 }], { vig: 0.6 }); quote(k, 'Ăn càng lâu, càng quên đường về.', 'd', { color: AMBER, size: 60 }); },
    },
    {
      say: '{a}Trưa hôm ấy, bố tôi về tới nơi. Nghe chuyện, bố vứt cả xe giữa sân, mặt trắng bệch. Bố hỏi tôi đúng một câu: {q}đứa thứ tám, nó tên gì? {b}Tôi bảo: Lành. {c}Bố tôi đứng im. Rồi đầu gối bố khuỵu xuống, như có ai chặt ngang.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) {
        sanNha(k, { time: 'day' }); ch(k, 1200, 985, 335, { ...TOI, view: 'side', flip: true, face: 'fear', arms: 'down', talk: after(k, 'b') && !after(k, 'c') ? 0.6 : 0 });
        ch(k, 820, 985, 490, { ...BO, view: 'side', action: after(k, 'c', 2) ? 'kneel' : 'stand', face: after(k, 'b') ? 'shock' : 'fear', arms: after(k, 'c') ? 'down' : 'point', talk: after(k, 'q') && !after(k, 'b') ? 0.6 : 0 });
        dimDay(k); quote(k, '"Đứa thứ tám, nó tên gì?"', 'q', { color: AMBER, size: 60, until: 'b' }); quote(k, '"Lành."', 'b', { color: COLD, size: 90 });
      },
    },
    {
      say: '{a}Tôi kể nốt câu con bé dặn: {q}về bảo anh Sún, anh ấy chưa đếm xong đâu. {b}Bố ôm đầu. {c}Bà nội nhìn bố, hỏi: {r}Sún nào? {d}Trong nhà, không ai gọi bố là Sún cả. Bố không trả lời.',
      sfx: [['heartbeat', 'b', 0.45]],
      draw(k) {
        sanNha(k, { time: 'day' }); ch(k, 820, 985, 490, { ...BO, view: 'side', action: 'kneel', face: 'cry', arms: 'cover', tears: after(k, 'b') ? 0.7 : 0 }); ch(k, 1200, 985, 335, { ...TOI, view: 'side', flip: true, face: 'fear', arms: 'down', talk: after(k, 'q') && !after(k, 'b') ? 0.6 : 0 }); if (after(k, 'c')) ch(k, 480, 975, 450, { ...BA, view: 'side', face: 'blank', arms: 'hold', talk: after(k, 'r') && !after(k, 'd') ? 0.5 : 0 });
        dimDay(k); quote(k, '"Anh ấy chưa đếm xong đâu."', 'q', { color: COLD, size: 60, until: 'c' }); quote(k, '"Sún nào?"', 'r', { color: AMBER, size: 76 });
      },
    },
    {
      say: '{a}Tối ấy, bà nội kể cho tôi nghe chuyện mà suốt mười hai năm tôi chưa từng được nghe. Bố tôi có một đứa em gái, tên là Lành. {b}Hè năm 1979, Lành lên bảy, đi chơi trốn tìm rồi không về nữa. {c}Cái mâm đồng này, bà đã gõ ba đêm liền đi khắp làng, khắp đồng, gõ đến méo đi. Không tìm thấy. {d}Người ta bảo Lành bị ma giấu. Từ đấy, nhà tôi không ai nhắc đến tên cô.',
      sfx: [['gong', 'c', 0.25], ['gong', ['c', 2], 0.25]],
      draw(k) {
        if (k.t < k.cue('b') || after(k, 'd')) { inNight(k, { chieu: true }); ch(k, 800, 970, 440, { ...BA, action: 'sit', view: 'side', face: 'sad', arms: 'hold', talk: 0.45 }); mamDong(k, 960, 930, 0.55); ch(k, 1160, 975, 310, { ...TOI, action: 'sit', view: 'side', flip: true, face: 'shock', arms: 'chest' }); shade(k, 0.66, [LAMP, { x: 950, y: 720, r: 600, warm: 1, flicker: 1 }], { vig: 0.5 }); return; }
        if (k.t < k.cue('c')) { mat(k, LANH_79, { face: 'happy', arms: 'down', warm: 0.6 }); no(k, 1100, 170, 1.6); cold(k, 0.75); tag(k, 'NĂM 1979', 'b'); return; }
        duongDe(k, { time: 'night' }); const x = k.lerp(300, 1600, k.at('c', 9, 'linear')); ch(k, x, 900, 450, { ...BA, hat: null, hairColor: '#4a4238', view: 'side', action: 'walk', face: 'cry', arms: 'hold', tears: 1 }); mamDong(k, x + 90, 700, 0.5, { dent: 0.6, ring: (k.t * 0.9) % 1 }); dimNight(k, [{ x, y: 700, r: 620 }], 0.66); cold(k, 0.75);
      },
    },
    {
      say: '{a}Bà bảo, ngày Lành mất tích là ngày hai mươi tháng Sáu. {b}Đúng hôm chúng tôi chơi, hai mươi hai năm sau. {c}Điều bà dặn anh em tôi, bà dặn từ sau năm ấy.',
      sfx: [['gong', 'b', 0.25]],
      draw(k) { black(k); k.text('20 THÁNG SÁU · 1979', 960, 400, { size: 86, font: 'title', color: COLD, fx: 'fade', p: k.at('a', 1) }); k.text('20 THÁNG SÁU · 2001', 960, 590, { size: 86, font: 'title', color: AMBER, fx: 'fade', p: k.at('b', 1) }); },
    },
    {
      say: '{a}Đến đây, nếu là bạn, bạn nghĩ đứa con gái chạy về gốc nhãn hôm ấy là cô Lành của tôi, hay là một thứ khác, mượn tên cô? Hãy để lại suy nghĩ của bạn. {b}Vì đêm hôm ấy, tôi nghe được một câu mà tôi không bao giờ quên.',
      draw(k) { vuonNhan(k, { time: 'night' }); ch(k, NHAN.x + 240, 1000, 270, { ...LANH, face: 'calm', arms: 'down', alpha: 0.55 }); dimNight(k, [{ x: NHAN.x + 240, y: 820, r: 380 }], 0.8); k.text('Cô Lành, hay một thứ mượn tên cô?', 960, 200, { size: 64, font: 'title', color: PAPER, fx: 'fade', p: k.at('a', 1), maxWidth: 1600 }); },
    },
    {
      say: '{a}Đêm thứ hai, cả làng vẫn gõ. Tôi ra vườn tìm bố. Bố ngồi dưới gốc nhãn, không hút thuốc. Bố áp cả hai bàn tay lên thân cây, trán tì vào vỏ cây. {b}Tôi đứng sau bụi tre, nghe bố nói khe khẽ với cái cây: {q}trả nó cho anh đi em. Anh lạy em.',
      sfx: [['gong', 'a', 0.15], ['wind', 'b', 0.3]],
      draw(k) { vuonNhan(k, { time: 'night' }); ch(k, NHAN.x - 130, 960, 450, { ...BO, action: 'kneel', view: 'side', face: 'cry', arms: 'point', tears: 1, lean: 8, talk: after(k, 'q') ? 0.4 : 0 }); ch(k, 300, 985, 335, { ...TOI, view: 'side', face: 'fear', arms: 'chest' }); dimNight(k, [{ x: NHAN.x - 130, y: 760, r: 500 }, { x: 300, y: 820, r: 240 }], 0.76); quote(k, '"Trả nó cho anh đi em. Anh lạy em."', 'q', { color: COLD, size: 62 }); },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Bố đếm đến bảy mươi',
      say: '{a}Bố nhìn thấy tôi. Bố không mắng. Bố đứng dậy, vào nhà, gọi cả nhà ra gốc nhãn: bà nội, mẹ, tôi. {b}Bố quỳ xuống trước mặt bà. Bố bảo: {q}mẹ ơi, con biết em Lành ở đâu. {c}Con biết từ năm ấy.',
      sfx: [['stinger', 'c', 0.5]],
      draw(k) {
        vuonNhan(k, { time: 'night' }); duoc(k, 140, 780, 1.2); ch(k, 620, 985, 450, { ...BA, view: 'side', face: after(k, 'c') ? 'shock' : 'blank', arms: 'hold' }); ch(k, 400, 990, 470, { ...ME, view: 'side', face: 'fear', arms: 'chest' }); ch(k, 220, 1000, 335, { ...TOI, view: 'side', face: 'fear', arms: 'down' });
        ch(k, 960, 1000, 490, { ...BO, view: 'side', flip: true, action: after(k, 'b') ? 'kneel' : 'stand', face: after(k, 'b') ? 'cry' : 'blank', arms: 'chest', tears: after(k, 'b') ? 1 : 0, talk: after(k, 'q') ? 0.5 : 0 });
        dimNight(k, [{ x: 600, y: 700, r: 900, warm: 1, flicker: 1 }], 0.6); chapter(k, 4, 'Bố đếm đến bảy mươi'); quote(k, '"Mẹ ơi, con biết em Lành ở đâu."', 'q', { color: AMBER, size: 60, until: 'c' }); quote(k, '"Con biết từ năm ấy."', 'c', { color: COLD, size: 70 });
      },
    },
    {
      say: '{a}Bố kể. Hè năm 1979, bố lên mười. Sau vườn nhà tôi có một cái hầm chữ A đào từ thời chiến tranh. Hết chiến tranh, người lớn đã lấp cửa hầm. Nhưng hai anh em bố moi được một lỗ chui sau bụi tre, làm chỗ chơi riêng. Người lớn không ai biết. {b}Lành đi đâu cũng bám theo bố. {c}Răng cửa bố bị sún, nên nó gọi bố là anh Sún. Cả nhà chỉ có nó gọi thế.',
      draw(k) { hamA(k, { time: 'day' }); ch(k, 560, 985, 340, { ...BO_NHO, view: 'side', face: 'happy', arms: 'point', talk: after(k, 'c') ? 0 : 0.4 }); const x = k.lerp(120, 330, k.at('b', 3)); ch(k, x, 990, 270, { ...LANH_79, view: 'side', action: k.at('b', 3) < 1 && after(k, 'b') ? 'walk' : 'stand', face: 'happy', arms: 'wave', talk: after(k, 'c') ? 0.6 : 0 }); shade(k, 0.25, [DAY], { vig: 0.45 }); cold(k, 0.55); tag(k, 'HÈ NĂM 1979', 'a'); quote(k, '"Anh Sún ơi!"', 'c', { color: AMBER, size: 70 }); },
    },
    {
      say: '{a}Chiều hai mươi tháng Sáu năm ấy, đội chiếu bóng về sân kho hợp tác xã. Lũ con trai rủ nhau đi sớm để giữ chỗ. {b}Lành đòi theo. Bố không muốn dắt em. {c}Bố nghĩ ra một mẹo: chơi trốn tìm. Bố bảo nó vào hầm mà trốn, trốn thật kỹ, {q}bao giờ anh tìm thấy mới được ra.',
      draw(k) {
        if (k.t < k.cue('b')) { sanKho(k); shade(k, 0.3, [{ x: 960, y: 420, r: 800, warm: 0.5 }], { vig: 0.5 }); cold(k, 0.5); return; }
        hamA(k, { time: 'dusk' }); ch(k, 620, 985, 340, { ...BO_NHO, view: 'side', face: after(k, 'c') ? 'smug' : 'angry', arms: 'point', talk: 0.6 }); ch(k, 840, 990, 270, { ...LANH_79, view: 'side', flip: true, face: after(k, 'c') ? 'happy' : 'sad', arms: 'hold' }); dimDusk(k, HAM.x); cold(k, 0.55); quote(k, '"Bao giờ anh tìm thấy mới được ra."', 'q', { color: AMBER, size: 58 });
      },
    },
    {
      say: '{a}Lành chui vào hầm. {b}Bố úp mặt vào bụi tre, đếm thật to cho em nghe. Một. Hai. Ba. {c}Đếm đến bảy mươi, bố rón rén bỏ đi. {d}Rồi bố chạy một mạch ra sân kho.',
      sfx: [['heartbeat', 'c', 0.45]],
      draw(k) {
        hamA(k, { time: 'dusk' });
        if (k.t < k.cue('b')) { const p = k.at('a', 2, 'linear'); ch(k, k.lerp(780, HAM.x, p), k.lerp(990, 880, p), 270 * (1 - p * 0.25), { ...LANH_79, view: 'side', action: 'walk', face: 'happy', arms: 'down', alpha: 1 - Math.max(0, p - 0.7) / 0.3 }); dimDusk(k, HAM.x); cold(k, 0.55); return; }
        const p = k.at('d', 3, 'linear'); ch(k, after(k, 'c') ? k.lerp(420, -300, Math.max(k.at('c', 6, 'linear'), p)) : 420, 985, 340, { ...BO_NHO, view: 'side', flip: after(k, 'c'), action: after(k, 'c') ? 'walk' : 'stand', arms: after(k, 'c') ? 'down' : 'cover', face: after(k, 'c') ? 'smug' : 'sleep' });
        dimDusk(k, HAM.x); cold(k, 0.55); const n = after(k, 'c') ? 70 : Math.min(70, 1 + Math.floor(k.at('b', k.cue('c') - k.cue('b'), 'linear') * 69)); k.text(String(n), 1500, 300, { size: 170, font: 'title', color: AMBER, outline: '#000', outlineWidth: 12 });
      },
    },
    {
      say: '{a}Phim hôm ấy hay lắm. Giữa buổi, trời đổ mưa, rồi gió giật thành bão. Người ta chạy tán loạn. {b}Bố về đến nhà lúc mười giờ đêm, ướt như chuột lột. Bà nội đang cuống cuồng đi tìm Lành. Bà hỏi: {q}có thấy em đâu không? {c}Bố sợ đòn. Bố bảo: {r}con không biết.',
      sfx: [['thunder', 'a', 0.4], ['wind', 'b', 0.4], ['heartbeat', 'r', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { sanKho(k); muaTo(k, k.at('a', 4)); shade(k, 0.35, [{ x: 960, y: 420, r: 800, warm: 0.4 }], { vig: 0.5 }); cold(k, 0.5); return; }
        sanNha(k, { time: 'night' }); ch(k, 700, 985, 450, { ...BA, hat: null, hairColor: '#4a4238', view: 'side', face: 'fear', arms: 'point', talk: after(k, 'q') && !after(k, 'c') ? 0.6 : 0 }); ch(k, 1050, 985, 340, { ...BO_NHO, view: 'side', flip: true, face: 'fear', arms: 'back', talk: after(k, 'r') ? 0.5 : 0 }); dimNight(k, [{ x: 880, y: 680, r: 640 }], 0.62); cold(k, 0.7); muaTo(k, 0.9); quote(k, '"Có thấy em đâu không?"', 'q', { size: 60, until: 'r' }); quote(k, '"Con không biết."', 'r', { color: AMBER, size: 76 });
      },
    },
    {
      say: '{a}Gần sáng, bố lén ra sau vườn. Cái hầm đã sụp. Đất lấp kín, bụi tre đổ đè lên. {b}Bố lấy tay bới đến bật cả móng, rồi ngồi đấy gọi khẽ. Không có tiếng ai trả lời. {c}Trời sáng, người lớn kéo đến. Ai cũng tưởng cái hầm ấy đã lấp từ lâu, chỗ đất sụt chỉ là do mưa bão. Bố đứng dậy, không dám nói. Càng để lâu, càng không dám nói.',
      sfx: [['wind', 'a', 0.35]],
      draw(k) {
        hamA(k, { time: after(k, 'c') ? 'dawn' : 'night', fall: 1 }); ch(k, 760, 985, 340, { ...BO_NHO, view: 'side', action: after(k, 'c') ? 'stand' : 'kneel', face: 'cry', arms: after(k, 'c') ? 'back' : 'point', tears: 1 });
        if (after(k, 'c')) { ch(k, 300, 985, 470, { ...DAN[0], view: 'side', face: 'fear', arms: 'down' }); ch(k, 110, 985, 450, { ...DAN[1], view: 'side', face: 'fear', arms: 'down' }); shade(k, 0.42, [{ x: 960, y: 500, r: 1000 }], { vig: 0.5 }); } else dimNight(k, [{ x: 860, y: 760, r: 560 }], 0.7);
        cold(k, 0.75); if (!after(k, 'c')) muaPhun(k, 0.7);
      },
    },
    {
      say: '{a}Cuối năm ấy, bố xin bà một cây nhãn con, trồng đúng lên chỗ đất sụt. Bà tưởng bố nhớ em. {b}Hai mươi hai năm, bố không ăn một quả nhãn nào. {c}Còn cả xóm tôi, hai mươi hai năm, vẫn khen nhãn nhà tôi ngọt.',
      sfx: [['stinger', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { hamA(k, { time: 'day', fall: 1 }); const { ctx } = k; ctx.strokeStyle = '#5e4a3a'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(HAM.x, 830); ctx.lineTo(HAM.x, 660); ctx.stroke(); for (let i = 0; i < 7; i++) { ctx.fillStyle = i % 2 ? '#587a3e' : '#4c6c36'; ctx.beginPath(); ctx.ellipse(HAM.x + Math.cos(i) * 56, 640 + Math.sin(i) * 34, 54, 30, i, 0, Math.PI * 2); ctx.fill(); } ch(k, 740, 985, 340, { ...BO_NHO, action: 'kneel', view: 'side', face: 'sad', arms: 'point' }); shade(k, 0.3, [DAY], { vig: 0.45 }); cold(k, 0.55); return; }
        vuonNhan(k, { time: 'day' }); [[560, 1], [840, 0], [1200, 1]].forEach(([x], i) => ch(k, x, 1000, 440, { ...DAN[i], view: 'side', flip: x > 960, face: 'happy', arms: 'point', talk: 0.5 })); dimDay(k); quote(k, 'Cả xóm vẫn khen nhãn nhà tôi ngọt.', 'c', { color: AMBER, size: 60 });
      },
    },
    {
      say: '{a}Không ai nói gì. Bà nội ngồi im như tượng. Bà không khóc, không đánh bố. Bà nhìn cái cây rất lâu. {b}Rồi bà nói, giọng khô khốc: {q}đếm nốt đi. {c}Mày còn nợ em mày ba mươi tiếng.',
      sfx: [['gong', 'q', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { vuonNhan(k, { time: 'dusk' }); ch(k, 620, 985, 430, { ...BA, action: 'sit', view: 'side', face: 'blank', arms: 'hold' }); ch(k, 960, 1000, 490, { ...BO, view: 'side', flip: true, action: 'kneel', face: 'cry', arms: 'chest', tears: 1 }); dimDusk(k, 800); return; }
        mat(k, BA, { face: 'blank', arms: 'hold', h: 540, talk: 0.4 }); quote(k, '"Đếm nốt đi."', 'q', { color: AMBER, size: 84, until: 'c' }); quote(k, '"Mày còn nợ em mày ba mươi tiếng."', 'c', { color: AMBER, size: 64 });
      },
    },
    {
      lead: 0.8,
      say: '{a}Đêm đã khuya. Bố tôi đứng dậy, úp mặt vào gốc nhãn, như thằng bé mười tuổi năm nào. Giọng bố run: {n1}bảy mươi mốt. {n2}Bảy mươi hai. {n3}Bảy mươi ba. {b}Ngoài đồng, tiếng gõ mâm cả làng bỗng im bặt, không ai bảo ai. {n4}Bố đếm. Tám mươi. {n5}Chín mươi. {c}Nước mắt bố chảy xuống rễ cây. {n6}Chín mươi chín. {n7}Một trăm.',
      sfx: [['heartbeat', 'n1', 0.3], ['heartbeat', 'n4', 0.35], ['heartbeat', 'n6', 0.4], ['gong', 'n7', 0.45]],
      draw(k) {
        vuonNhan(k, { time: 'night' }); zoom(k, NHAN.x - 90, 700, 1.6, () => up(k, BO, 500, { face: 'cry', tears: 1 })); dimNight(k, [{ x: NHAN.x - 90, y: 600, r: 900, warm: 1, flicker: 1 }], 0.6);
        const cs = [['n1', 71], ['n2', 72], ['n3', 73], ['n4', 80], ['n5', 90], ['n6', 99], ['n7', 100]]; let n = null; for (const [c, v] of cs) if (after(k, c)) n = v;
        if (n) k.text(String(n), 1420, 330, { size: n === 100 ? 240 : 190, font: 'title', color: n === 100 ? AMBER : PAPER, outline: '#000', outlineWidth: 14 });
      },
    },
    {
      say: '{a}Bố quay lại. Bố gọi to, như một đứa trẻ: {q}anh đi tìm đây. {b}Lành ơi, anh thua rồi. Ra đi em. {c}Rồi bố cầm lấy cái cuốc.',
      sfx: [['stinger', 'c', 0.4]],
      draw(k) { vuonNhan(k, { time: 'night' }); duoc(k, 1400, 800, 1.2); ch(k, 800, 1000, 490, { ...BO, face: 'cry', arms: after(k, 'c') ? 'hold' : 'raise', tears: 1, talk: after(k, 'q') && !after(k, 'c') ? 0.7 : 0 }); if (after(k, 'c')) cuoc(k, 930, 1010, 1.2, 0.2); dimDusk(k, 820); quote(k, '"Anh đi tìm đây."', 'q', { color: AMBER, size: 70, until: 'b' }); quote(k, '"Lành ơi, anh thua rồi. Ra đi em."', 'b', { color: AMBER, size: 62 }); },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Dưới gốc nhãn',
      say: '{a}Hàng xóm kéo đến. Không ai hỏi gì. Mười mấy người đàn ông thay nhau cuốc, chặt từng chiếc rễ to bằng bắp chân, suốt đêm. {b}Bà nội ngồi bên miệng hố, gõ cái mâm đồng từng tiếng một. {c}Bà bảo tôi: gọi tên em mày đi, gọi to vào, cho nó nghe đường về. {d}Tôi gọi tên em tôi đến khản cổ. {q}Tít ơi. Về đi Tít ơi.',
      sfx: [['gong', 'b', 0.35], ['gong', ['b', 2.2], 0.35], ['gong', 'd', 0.3]],
      draw(k) {
        const dig = 0.25 + 0.7 * Math.min(1, k.t / Math.max(1, k.d));
        vuonNhan(k, { time: 'night', dig, rom: false }); duoc(k, 420, 800, 1.3); duoc(k, 1560, 800, 1.3);
        [[640, 0], [1330, 2]].forEach(([x, i]) => { const up2 = Math.sin(k.t * 3 + i) > 0; ch(k, x, 985, 470, { ...DAN[i], view: 'side', flip: x > 960, face: 'blank', arms: up2 ? 'raise' : 'point' }); cuoc(k, x + (x > 960 ? -110 : 110), up2 ? 800 : 950, 0.85, x > 960 ? -0.7 : 0.7); });
        if (after(k, 'b')) { ch(k, 300, 1010, 430, { ...BA, action: 'sit', view: 'side', face: 'blank', arms: 'hold' }); mamDong(k, 410, 870, 0.5, { ring: (k.t * 0.5) % 1 }); }
        if (after(k, 'c')) ch(k, 1640, 1010, 335, { ...TOI, view: 'side', flip: true, face: 'cry', arms: 'raise', tears: 1, talk: 0.7 });
        dimNight(k, [{ x: 960, y: 800, r: 900, warm: 1, flicker: 1 }], 0.66); chapter(k, 5, 'Dưới gốc nhãn'); quote(k, '"Tít ơi. Về đi Tít ơi."', 'q', { color: AMBER, size: 66 });
      },
    },
    {
      say: '{a}Gần sáng, lưỡi cuốc chạm vào gỗ. Xà hầm cũ. Người ta dỡ ra. {b}Bên dưới là một khoảng trống nhỏ, tối om, đất khô. {c}Bố tôi cầm đèn pin, tụt xuống.',
      sfx: [['click', 'a', 0.5], ['heartbeat', 'b', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { vuonNhan(k, { time: 'dawn', dig: 1, rom: false }); ch(k, 640, 985, 470, { ...DAN[0], view: 'side', face: 'shock', arms: 'down' }); ch(k, 1330, 985, 470, { ...DAN[2], view: 'side', flip: true, face: 'shock', arms: 'down' }); shade(k, 0.55, [{ x: 960, y: 800, r: 760, warm: 0.7 }], { vig: 0.5 }); return; }
        hamTrong(k); ch(k, 960, k.lerp(330, 880, k.at('c', 2.5)), 490, { ...BO, face: 'fear', arms: 'raise' }); shade(k, 0.35, [{ x: 960, y: 500, r: 620, warm: 1 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Thằng Tít nằm đó, co người trong một hốc đất giữa đám rễ nhãn, sát xà hầm. Người nó lấm lem, môi khô nứt nẻ. {b}Bố gọi mãi, nó mới hé mắt. {c}Hoá ra hai mươi hai năm, rễ nhãn đã làm đất phía bụi tre sụt thành một cái hốc, lá tre phủ kín miệng, vừa lọt một đứa trẻ. Nó chui vào trốn, rồi bị kẹt lại. {d}Người ta bế nó chạy ra trạm xá xã. Nó phải truyền nước suốt hai ngày.',
      sfx: [['heartbeat', 'a', 0.35], ['stinger', 'b', 0.3]],
      draw(k) { hamTrong(k); lie(k, 1160, 850, 280, { ...TIT, face: after(k, 'b', 1.5) ? 'calm' : 'sleep' }); ch(k, 620, 930, 490, { ...BO, action: 'kneel', view: 'side', face: 'cry', arms: 'point', tears: 1 }); shade(k, 0.38, [{ x: 960, y: 620, r: 700, warm: 1 }], { vig: 0.6 }); quote(k, 'Một cái hốc lá tre phủ kín, vừa lọt một đứa trẻ.', 'c', { color: AMBER, size: 56, until: 'd' }); },
    },
    {
      say: '{a}Góc hầm, có một đôi dép nhựa đỏ xếp ngay ngắn, và một cái nơ đã bạc màu. {b}Cạnh đó là những gì còn lại của cô Lành. Bố tôi cởi áo, phủ lên, không cho ai nhìn. {c}Bố chỉ bảo: {q}cô ngồi quay mặt ra phía cửa hầm. Như đang đợi.',
      sfx: [['gong', 'q', 0.25]],
      draw(k) {
        hamTrong(k, { beam: false });
        dep(k, 590, 880, 1.15, { color: '#b0403a', wire: false, r: 0.12 }); dep(k, 700, 880, 1.15, { color: '#b0403a', wire: false, r: 0.12 }); no(k, 950, 880, 1.5);
        if (after(k, 'b')) { const { ctx } = k; ctx.fillStyle = '#66766a'; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1120, 930); ctx.quadraticCurveTo(1180, 720, 1360, 730); ctx.quadraticCurveTo(1540, 740, 1580, 930); ctx.closePath(); ctx.fill(); ctx.stroke(); }
        shade(k, 0.42, [{ x: 960, y: 800, r: 720, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, '"Cô ngồi quay mặt ra phía cửa hầm. Như đang đợi."', 'q', { color: COLD, size: 54, y: 150 });
      },
    },
    {
      say: '{a}Thằng Tít kể, chị Lành dắt nó xuống. Chị bảo chỗ này trốn kỹ nhất, chị trốn ở đây lâu lắm rồi mà chưa ai tìm thấy. {b}Chị cho nó ăn cơm. Rồi chị bảo nó nằm yên, lát nữa anh Sún đến. {c}Nó ngước lên hỏi bố tôi: {q}bố ơi, anh Sún là ai?',
      sfx: [['stinger', 'q', 0.45]],
      draw(k) { vuonNhan(k, { time: 'dawn', dig: 1, rom: false }); ch(k, 880, 985, 490, { ...BO, action: 'kneel', view: 'side', face: 'cry', arms: 'hold', tears: 1 }); ch(k, 1090, 990, 270, { ...TIT, view: 'side', flip: true, face: 'calm', arms: 'down', talk: 0.5 }); shade(k, 0.42, [{ x: 960, y: 700, r: 900, warm: 0.7 }], { vig: 0.5 }); quote(k, '"Bố ơi, anh Sún là ai?"', 'q', { color: AMBER, size: 68 }); },
    },
    {
      say: '{a}Bố tôi không trả lời được. Bà nội đỡ lấy cái áo, ôm vào lòng. Bà không khóc. {b}Bà chỉ nói rất khẽ: {q}về nhà thôi con. Mẹ tìm thấy con rồi. {c}Sáng hôm ấy, bát cơm để phần trên bếp vẫn trắng nguyên.',
      sfx: [['gong', 'c', 0.25]],
      draw(k) {
        if (k.t < k.cue('c')) { vuonNhan(k, { time: 'dawn', dig: 1, rom: false }); zoom(k, 900, 620, 1.7, () => { ch(k, 900, 985, 450, { ...BA, action: 'kneel', face: 'cry', arms: 'chest', tears: 0.6, talk: after(k, 'q') ? 0.3 : 0 }); const { ctx } = k; ctx.fillStyle = '#66766a'; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(900, 815, 76, 46, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }); shade(k, 0.4, [{ x: 960, y: 560, r: 800, warm: 0.8 }], { vig: 0.55 }); quote(k, '"Về nhà thôi con. Mẹ tìm thấy con rồi."', 'q', { color: AMBER, size: 60 }); return; }
        black(k, '#1e1610'); batPhan(k, 960, 720, 4.2, 0); shade(k, 0.3, [{ x: 960, y: 520, r: 800, warm: 1 }], { vig: 0.6 });
      },
    },

    // ===== KẾT =====
    {
      chapter: 'Kết',
      say: '{a}Sáng ấy, công an xã về lập biên bản. Cô Lành được chôn cất đàng hoàng, có bàn thờ, có bát hương. Cái mâm đồng méo, bà đặt lên bàn thờ cô. {b}Cây nhãn bị đào mất nửa gốc mà không chết. {c}Suốt một năm ấy, bà nội không nói với bố tôi một câu nào.',
      draw(k) {
        if (k.t < k.cue('b')) { banTho(k); shade(k, 0.5, [{ x: 960, y: 520, r: 760, warm: 1, flicker: 1 }], { vig: 0.55 }); return; }
        sanNha(k, { time: 'day' }); if (after(k, 'c')) { ch(k, 640, 975, 450, { ...BA, view: 'side', flip: true, face: 'blank', arms: 'hold' }); ch(k, 1160, 985, 490, { ...BO, view: 'side', flip: true, face: 'sad', arms: 'down' }); } dimDay(k);
      },
    },
    {
      say: '{a}Giỗ đầu của cô, đúng mùa nhãn. Cúng xong, bà nội ra vườn, hái một chùm, bóc một quả. {b}Bà đưa đến trước mặt bố: {q}ăn đi. Em mày cho đấy. {c}Bố tôi cầm quả nhãn, tay run bần bật. Hai mươi ba năm, lần đầu tiên bố ăn. {d}Bố vừa nhai vừa khóc, như thằng bé mười tuổi.',
      sfx: [['gong', 'q', 0.25]],
      draw(k) {
        if (k.t < k.cue('c')) { vuonNhan(k, { time: 'day', dig: 0 }); ch(k, 780, 985, 450, { ...BA, view: 'side', face: 'blank', arms: 'point', talk: after(k, 'q') ? 0.4 : 0 }); ch(k, 1160, 985, 490, { ...BO, view: 'side', flip: true, face: 'sad', arms: 'down' }); quaNhan(k, 960, 790, 1, { peeled: true }); dimDay(k); quote(k, '"Ăn đi. Em mày cho đấy."', 'q', { color: AMBER, size: 70 }); return; }
        mat(k, BO, { face: 'cry', arms: 'hold', tears: 1, h: 540, talk: after(k, 'd') ? 0.7 : 0.2 }); if (!after(k, 'd')) quaNhan(k, 960, 860, 3, { peeled: true });
      },
    },
    {
      say: '{a}Tôi tưởng chuyện đến đấy là hết. Nhưng thằng Tít, từ sau hai đêm ấy, không bao giờ đếm nữa. {b}Và những đêm ngủ mê, nó gọi bà nội tôi là mẹ. {c}Nó gọi bố tôi là anh. {q}Anh Sún ơi, đếm xong chưa?',
      sfx: [['wind', 'b', 0.3], ['stinger', 'q', 0.5]],
      draw(k) { buong(k, { time: 'night', year: '2001', day: '23' }); lie(k, 980, 742, 270, { ...TIT, face: 'sleep', talk: after(k, 'b') ? 0.3 : 0 }); net(k, 0.2); shade(k, 0.84, [{ x: 1450, y: 400, r: 320 }, { x: 820, y: 700, r: 360 }], { vig: 0.4 }); quote(k, '"Anh Sún ơi, đếm xong chưa?"', 'q', { color: COLD, size: 66 }); },
    },
    {
      say: '{a}Lần đầu nghe, bố tôi ngồi chết lặng bên giường. {b}Rồi bố cúi xuống, vuốt tóc con, khẽ đáp: {q}xong rồi. Anh đây. {c}Từ đấy, đêm nào nó gọi, bố cũng thưa.',
      sfx: [['gong', 'c', 0.2]],
      draw(k) { buong(k, { time: 'night', year: '2001', day: '23' }); lie(k, 980, 742, 270, { ...TIT, face: 'sleep' }); ch(k, 620, 900, 470, { ...BO, action: 'sit', view: 'side', face: after(k, 'b') ? 'cry' : 'blank', arms: 'point', tears: after(k, 'b') ? 1 : 0, lean: after(k, 'b') ? 8 : 0, talk: after(k, 'q') && !after(k, 'c') ? 0.4 : 0 }); shade(k, 0.8, [{ x: 1450, y: 400, r: 320 }, { x: 760, y: 680, r: 460, warm: 0.6 }], { vig: 0.4 }); quote(k, '"Xong rồi. Anh đây."', 'q', { color: AMBER, size: 76 }); },
    },
    {
      say: '{a}Bà nội bảo, cô Lành chỉ muốn có người tìm thấy. Cô mượn thằng Tít hai đêm, để dắt bố tôi đến đúng chỗ, rồi trả nó về. {b}Nhưng các cụ trong làng thì bảo khác. Ma giấu không bao giờ trả ai lại nguyên vẹn. {c}Thứ đã bò ra từ cái hốc ấy, ai dám chắc là đứa nào?',
      sfx: [['wind', 'b', 0.35], ['stinger', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { banTho(k); shade(k, 0.5, [{ x: 960, y: 520, r: 760, warm: 1, flicker: 1 }], { vig: 0.55 }); quote(k, 'Cô Lành chỉ muốn có người tìm thấy.', 'a', { color: AMBER, size: 58 }); return; }
        hamTrong(k, { beam: false }); shade(k, 0.6, [{ x: 960, y: 760, r: 460 }], { vig: 0.6 }); quote(k, 'Ai dám chắc là đứa nào?', 'c', { color: COLD, size: 70 });
      },
    },
    {
      say: '{a}Năm nay thằng Tít ba mươi ba tuổi, đã có con. Nó hiền lành, không nhớ gì về hai đêm ấy. {b}Mỗi lần về quê, lúc trời nhá nhem, nó vẫn ra đứng ở gốc nhãn, úp mặt vào thân cây một lúc lâu. {c}Rồi quay lại, cười.',
      sfx: [['wind', 'b', 0.25], ['heartbeat', 'c', 0.4]],
      draw(k) {
        const lon = { ...BO, skin: '#f0d0b0', top: '#7a6a5a', topStyle: 'tee', sleeve: 'short', hair: 'buzz' };
        vuonNhan(k, { time: 'dusk' });
        if (k.t < k.cue('c')) up(k, lon, 490, { face: 'sleep' }); else ch(k, NHAN.x - 128, 960, 490, { ...lon, face: 'happy', arms: 'down' });
        dimDusk(k, NHAN.x - 120); tag(k, 'BÂY GIỜ', 'a');
      },
    },
    {
      lead: 0.8, tail: 2.5,
      say: '{a}Năm 2001, bảy đứa chúng tôi đi trốn, tám đứa chạy về. {b}Bà nội dặn tôi từ bé: thấy thừa một đứa, không được hỏi tên nó. {c}Nên đến giờ, mỗi lần nhìn em trai mình, tôi vẫn chưa bao giờ dám hỏi: {q}mày tên gì?',
      sfx: [['wind', 0, 0.2], ['gong', 'q', 0.3]],
      draw(k) {
        if (k.t < k.cue('c')) { vuonNhan(k, { time: 'dusk' }); hang(k, { lanh: true, face: 'calm' }); dimDusk(k); return; }
        mat(k, { ...BO, skin: '#f0d0b0', top: '#7a6a5a', topStyle: 'tee', sleeve: 'short', hair: 'buzz' }, { face: 'happy', arms: 'down', h: 560, warm: 0.7 }); quote(k, '"Mày tên gì?"', 'q', { color: PAPER, size: 80 });
      },
    },

    // ===== CUỐI =====
    nextScene({
      say: '{next}Tập sau: năm 1997, làng tôi có một cái giếng cổ. Đêm ba mươi, trời tối đen không một ánh sao. Cúi xuống giếng, tôi thấy một vầng trăng tròn, và có người đang ngồi trên đó hát: ông giẳng, ông giăng.',
      title: 'Ông Giẳng Ông Giăng | Trăng Dưới Giếng',
      hook: 'Đêm ba mươi không trăng. Dưới giếng lại có một vầng trăng tròn.',
      art(k) { const { ctx } = k; black(k, '#141a24'); for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; ctx.fillStyle = i % 2 ? '#6e6a60' : '#7e7a6e'; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(960 + Math.cos(a) * 225, 500 + Math.sin(a) * 225, 66, 46, a + Math.PI / 2, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); } ctx.fillStyle = '#080c14'; ctx.beginPath(); ctx.arc(960, 500, 190, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#efe6cc'; ctx.beginPath(); ctx.arc(960, 500, 92, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = 'rgba(180,170,140,0.5)'; ctx.beginPath(); ctx.arc(930, 475, 22, 0, Math.PI * 2); ctx.arc(990, 530, 15, 0, Math.PI * 2); ctx.fill(); },
    }),
    subScene({
      say: '{q}Theo bạn, đứa đã về nhà tôi đêm ấy là thằng Tít, hay là cô Lành? Hãy để lại câu trả lời. {sub}Và nếu muốn nghe tiếp những chuyện chưa có lời giải, hãy đăng ký Nhân Gian Chưa Kể.',
      question: 'Đứa đã về nhà tôi đêm ấy là thằng Tít, hay là cô Lành?',
      art(k) { quaNhan(k, 960, 960, 1.4, { peeled: true }); },
    }),
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
