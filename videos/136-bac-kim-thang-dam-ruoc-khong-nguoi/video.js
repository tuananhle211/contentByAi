// Nhân Gian Chưa Kể — tập Bắc Kim Thang | Đám Rước Không Người. Kịch bản + sổ dữ kiện: kich-ban.md.
// Sửa 20/11 theo hướng chân thật: đám rước không người đêm rằm (chỉ tôi thấy) là khoảnh khắc "không thể" duy nhất. Bỏ cá chép trôi ngược, bọn trẻ cùng mơ, đám rước vòng quanh nhà, 38 lồng đèn giữa sân, đám rước năm 2026.
// Khung mới (từ 19/11): không có điều cấm, không điều tra kiểu 133. Động lực: món đồ lạ (38 lồng đèn "Bé Rằm") + lời hứa 37 năm giữa hai chị em.
// Bí mật người sống: bà Năm là mẹ ruột của má; ngoại (chị bà Năm) nhận nuôi, bắt em hứa cả đời không nhận con. Không có trẻ em gặp nạn.
import * as thumbs from '/videos/136-bac-kim-thang-dam-ruoc-khong-nguoi/thumbs.js';
import { PAPER, AMBER, COLD, shade, cold, tag, quote, chapter, nextScene, subScene, oil } from '/channel/nhan-gian.js';
import { boc } from '/channel/nhan-gian-babi.js';
import {
  UT, MA, NGOAI, BA_NAM, NAM_TRE, NGOAI_TRE, SAU, XOM, LANG, ch, longDen, LOAI, trong, co, damRuoc, xuong, kinh, KINH, cho, nhaLa, NHA, moVuon,
  hopThiec, aoSoSinh, giayRam, lua, sepia,
} from '/channel/nhan-gian-kinh.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const black = (k, c = '#07060a') => { k.ctx.fillStyle = c; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); };
const zoom = (k, cx, cy, s, fn) => k.group({ x: cx, y: cy, s }, () => k.group({ x: -cx, y: -cy }, fn));
const grain = (sc) => ({ ...sc, draw(k) { const s = 1 + 0.05 * Math.min(1, k.t / Math.max(1, k.d)); k.group({ x: k.W / 2, y: k.H / 2, s }, () => k.group({ x: -k.W / 2, y: -k.H / 2 }, () => sc.draw(k))); sepia(k, 0.72); } });
const DAY = { x: 960, y: 300, r: 1700 };
const dimDay = (k) => shade(k, 0.18, [DAY], { vig: 0.45 });
const dimDusk = (k, x = 960) => shade(k, 0.5, [{ x, y: 560, r: 1100, warm: 1 }], { vig: 0.5 });
const dimNight = (k, l = [{ x: 960, y: 700, r: 700 }], a = 0.72) => shade(k, a, l, { vig: 0.55 });
const MOON = { x: 1620, y: 300, r: 900 };
const LAMP = { x: 760, y: 620, r: 640, warm: 1, flicker: 1 };
const inNight = (k, o = {}) => { nhaLa(k, o); oil(k, 760, 700, 1); };
// Đêm bờ kinh: phông + shade, rồi đám rước vẽ SAU shade để lồng đèn sáng.
function demKinh(k, o = {}, fn) { kinh(k, { time: 'night', moon: o.moon ?? true, choLit: o.choLit, cho: o.cho }); if (o.before) o.before(); dimNight(k, [MOON, ...(o.lights ?? [])], o.a ?? 0.7); if (fn) fn(); }
function mat(k, p, o = {}) { black(k, o.bg ?? '#141019'); zoom(k, 960, 430, 2.3, () => ch(k, 960, 860, o.h ?? 560, { ...p, arms: o.arms ?? 'chest', face: o.face ?? 'calm', tears: o.tears ?? 0, talk: o.talk ?? 0 })); shade(k, 0.45, [{ x: 960, y: 450, r: 740, warm: o.warm ?? 1 }], { vig: 0.6 }); }
// Hàng lồng đèn đứng yên trong sân; lit(i) 0..1.
// Hai hàng lồng đèn hai bên sân, chừa khoảng giữa cho má.
function hangDen(k, n, y, x0, gap, s, lit = () => 1) { const xs = [160, 300, 440, 580, 1340, 1480, 1620, 1760, 1880]; for (let i = 0; i < Math.min(n, xs.length); i++) { const a = lit(i); if (a <= 0) continue; k.ctx.save(); k.ctx.globalAlpha *= a; longDen(k, xs[i], y + (i % 2) * 50 + Math.sin((k.gt ?? 0) * 2 + i) * 6, s, LOAI[i % 4], { stick: true }); k.ctx.restore(); } }
// Nồi chè đậu trắng.
function noiChe(k, x, y, s = 1) { const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#4a4a4c'; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-120, -110); ctx.lineTo(120, -110); ctx.quadraticCurveTo(130, 0, 90, 20); ctx.lineTo(-90, 20); ctx.quadraticCurveTo(-130, 0, -120, -110); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#efe6cc'; ctx.beginPath(); ctx.ellipse(0, -110, 118, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.strokeStyle = 'rgba(232,232,232,0.3)'; ctx.lineWidth = 12; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-60 + i * 60, -140); for (let j = 1; j < 7; j++) ctx.lineTo(-60 + i * 60 + Math.sin((k.gt ?? 0) * 1.4 + j + i) * j * 4, -140 - j * 26); ctx.stroke(); } ctx.restore(); }
function mua(k, a = 0.6) { const { ctx, W, H } = k, t = k.gt ?? 0; ctx.save(); ctx.strokeStyle = `rgba(206,218,230,${0.4 * a})`; ctx.lineWidth = 2.2; for (let i = 0; i < 170; i++) { let x = (k.rand(i + 800) * (W + 300) - t * 260) % (W + 300); if (x < 0) x += W + 300; const y = (k.rand(i + 1000) * (H + 120) + t * 860) % (H + 120) - 60; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 14, y + 42); ctx.stroke(); } ctx.restore(); }

const video = {
  meta: {
    title: 'Bắc Kim Thang | Đám Rước Không Người Dừng Trước Bến Nhà Tôi',
    description: `Năm 1998, ở một xóm kinh miền Tây, đêm rằm tháng Tám, có một đám rước đi ngang qua bờ kinh trước nhà tôi. Có trống, có cờ, có đèn lồng. Không có một bóng người. Chỉ có tiếng con nít hát: bắc kim thang, cà lang bí rợ.
Ba mươi tám cái lồng đèn, mà một tháng trước, chính tay ngoại tôi đã đốt thành tro.

Một bà già làm lồng đèn cho con nít cả xóm không lấy tiền, hai chị em ruột ba mươi bảy năm không nhìn mặt nhau, và một cái tên không ai trong xóm mang: Bé Rằm.`,
    footer: `📖 Truyện hư cấu dựa trên bài đồng dao Bắc Kim Thang, tục rước đèn Trung thu và tín ngưỡng dân gian miền Tây. Tên người, tên địa danh và tình tiết đều hư cấu.
🕯️ Nhân Gian Chưa Kể: những chuyện người xưa truyền tai nhau, mà chưa ai giải thích được.`,
    links: [['▶ Tập trước: Nu Na Nu Nống', '133-nu-na-nu-nong-ban-chan-thu-muoi-mot'], ['▶ Ông Giẳng Ông Giăng', '130-ong-giang-trang-duoi-gieng'], ['🔔 Đăng ký', 'https://www.youtube.com/@nhangianchuake?sub_confirmation=1']],
    tags: ['bắc kim thang', 'đám rước không người', 'rước đèn trung thu', 'lồng đèn', 'truyện ma miền tây', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'chuyện tâm linh có thật', 'hoạt hình kinh dị', 'nhân gian chưa kể'],
    hashtags: ['truyenma', 'backimthang', 'tamlinh'],
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
      // Hook 0–20 giây (số liệu Facebook 21/11): tục quen thuộc + cú bẻ, không năm, không địa danh.
      say: '{a}Rằm tháng Tám, con nít rước đèn, vừa đi vừa hát bắc kim thang. Đứa nào lớn lên cũng nhớ. {d}Nhưng đêm rằm năm ấy, lúc nửa đêm, có một đám rước đi ngang bờ kinh trước nhà tôi. {b}Có trống. Có cờ. Có lồng đèn cá chép, ông sao, con thỏ, đung đưa ngang tầm tay một đứa con nít. {c}Nhưng không có một bóng người.',
      sfx: [['drum', 'd', 0.3], ['wind', 'd', 0.25], ['stinger', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('d')) { black(k, '#140e0a'); for (let i = 0; i < 5; i++) longDen(k, 760 + i * 100, 640 - (i % 2) * 40 + Math.sin(k.t * 1.6 + i) * 8, 0.8, LOAI[i % 4], { lit: true, stick: false }); shade(k, 0.45, [{ x: 960, y: 620, r: 720, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, 'Rằm tháng Tám, con nít rước đèn.', 'a', { color: AMBER, size: 60 }); return; }
        if (k.t < k.cue('b')) { demKinh(k, {}, () => damRuoc(k, k.at('d', 14, 'linear'), { span: 1300 })); tag(k, 'NỬA ĐÊM RẰM', 'd'); return; }
        if (k.t < k.cue('c')) { demKinh(k, {}, () => zoom(k, 900, 700, 1.7, () => damRuoc(k, 0.55 + k.at('b', 10, 'linear') * 0.3, { span: 1300 }))); return; }
        demKinh(k, {}, () => damRuoc(k, 0.85 + k.at('c', 8, 'linear') * 0.2, { span: 1300 })); quote(k, 'Không có một bóng người.', 'c', { color: COLD, size: 64 });
      },
    },
    {
      say: '{a}Chỉ có tiếng con nít hát, lanh lảnh, đều đều: {q}bắc kim thang, cà lang bí rợ, cột qua kèo, là kèo qua cột. {b}Đám rước dừng lại đúng trước bến nhà tôi. Ba mươi tám cái lồng đèn. {c}Ba mươi tám cái lồng đèn mà một tháng trước, chính tay ngoại tôi đã đốt thành tro.',
      sfx: [['heartbeat', 'b', 0.4], ['stinger', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { const stop = after(k, 'b') ? 1 : 0; demKinh(k, {}, () => damRuoc(k, 0, { x0: KINH.ben + 900 - (1 - stop) * 300 + (stop ? 0 : k.at('a', 6, 'linear') * 300), n: 14 })); quote(k, '"Bắc kim thang, cà lang bí rợ…"', 'q', { color: COLD, size: 58, until: 'b' }); quote(k, 'Ba mươi tám cái lồng đèn.', 'b', { color: AMBER, size: 62 }); return; }
        black(k, '#140e0a'); lua(k, 960, 900, 1.6); for (let i = 0; i < 5; i++) longDen(k, 760 + i * 100, 860 - (i % 2) * 40, 0.6, LOAI[i % 4], { lit: false, stick: false }); shade(k, 0.5, [{ x: 960, y: 700, r: 700, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, 'Ngoại tôi đã đốt thành tro.', 'c', { color: AMBER, size: 62 });
      },
    },
    {
      say: '{a}Đây là Nhân Gian Chưa Kể. Nếu bạn muốn nghe tiếp những chuyện chưa có lời giải, hãy bấm đăng ký. {b}Còn bây giờ, xin bạn tắt bớt đèn.',
      draw(k) { black(k); const fade = 1 - k.at('b', 3, 'linear') * 0.7; oil(k, 960, 790, 2.1); shade(k, 0.84, [{ x: 960, y: 620, r: 680 * fade, warm: 1, flicker: 1 }], { vig: 0.5 }); k.text('NHÂN GIAN CHƯA KỂ', 960, 300, { size: 92, font: 'title', color: AMBER, fx: 'fade', p: k.at('a', 1) * fade }); },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Bà Năm lồng đèn',
      say: '{a}Xóm tôi nằm dọc một con kinh nhỏ. Nhà nào cũng cất sát mé nước, có cái cầu bến bắc ra để rửa chén, giặt đồ, cột xuồng. {b}Ba tôi chạy ghe chở lúa thuê, mỗi chuyến đi cả tháng mới về. Ở nhà chỉ có ngoại, má, và tôi. Năm đó, tôi mười một tuổi.',
      draw(k) {
        if (k.t < k.cue('b')) { kinh(k, { time: 'day' }); dimDay(k); chapter(k, 1, 'Bà Năm Lồng Đèn'); return; }
        nhaLa(k, { time: 'day' }); ch(k, 420, 820, 440, { ...NGOAI, action: 'sit', face: 'calm', arms: 'hold' }); ch(k, 900, 990, 500, { ...MA, view: 'side', flip: true, face: 'calm', arms: 'hold' }); ch(k, 700, 995, 340, { ...UT, view: 'side', face: 'happy', arms: 'down' }); dimDay(k);
      },
    },
    {
      say: '{a}Bên kia kinh, ngay trước mặt nhà tôi, có một cái chòi lá nhỏ, vách lá dừa nước. Đó là nhà bà Năm. {b}Con nít trong xóm kêu bà là bà Năm Lồng Đèn. Quanh năm bà giăng câu, hái rau, mà tối nào cũng ngồi chuốt tre, dán giấy kiếng. {c}Đến Trung thu, con nít cả xóm, đứa nào cũng có một cái lồng đèn bà Năm cho, không lấy một đồng.',
      draw(k) {
        if (k.t < k.cue('b')) { kinh(k, { time: 'dusk', choLit: true }); dimDusk(k, KINH.cho); return; }
        if (k.t < k.cue('c')) { cho(k, { n: 0 }); ch(k, 760, 990, 470, { ...BA_NAM, action: 'sit', face: 'calm', arms: 'hold' }); longDen(k, 1100, 700, 0.9, 'ca', { lit: false, dang: true, stick: false }); oil(k, 1300, 760, 1); shade(k, 0.6, [{ x: 1000, y: 640, r: 760, warm: 1, flicker: 1 }], { vig: 0.5 }); return; }
        kinh(k, { time: 'dusk' }); XOM.forEach((p, i) => { ch(k, 820 + i * 220, 920, 320, { ...p, face: 'happy', arms: 'hold' }); longDen(k, 880 + i * 220, 760, 0.45, LOAI[i], {}); }); dimDusk(k);
      },
    },
    {
      say: '{a}Năm nào, bà cũng là người đánh trống đi đầu đám rước đèn của xóm. Cái trống da cũ, lá cờ ngũ sắc đã bạc màu. {b}Bà dắt cả đám con nít đi dọc bờ kinh, vừa đi vừa dạy hát: {q}bắc kim thang, cà lang bí rợ. {c}Bà hát chậm hơn người ta, kéo dài chữ cuối, như đang ru con nít ngủ.',
      sfx: [['drum', 'a', 0.3]],
      draw(k) {
        demKinh(k, { moon: true, a: 0.62, before() { const p = k.at(0, Math.max(6, k.d), 'linear'); const x = 300 + p * 900; ch(k, x + 200, 900, 470, { ...BA_NAM, view: 'side', action: 'walk', face: 'happy', arms: 'hold', talk: after(k, 'b') ? 0.4 : 0 }); XOM.forEach((pp, i) => ch(k, x - i * 190, 905, 310, { ...pp, view: 'side', action: 'walk', face: 'happy', arms: 'hold' })); } }, () => { const p = k.at(0, Math.max(6, k.d), 'linear'), x = 300 + p * 900; trong(k, x + 330, 760, 0.55); co(k, x + 120, 900, 0.8); XOM.forEach((pp, i) => longDen(k, x - i * 190 + 60, 700, 0.45, LOAI[i], {})); });
        quote(k, '"Bắc kim thang, cà lang bí rợ…"', 'q', { size: 58 });
      },
    },
    {
      say: '{a}Cái lồng đèn đẹp nhất mỗi năm bao giờ cũng là của tôi. Năm thì con cá chép có vảy giấy kiếng, năm thì ông sao năm cánh dán giấy đỏ. {b}Lần nào đưa lồng đèn, bà cũng hỏi đúng một câu: {q}má con mạnh giỏi không? {c}Tôi cầm về, ngoại thấy là giật lấy, bắt đem trả. Má thì không nói gì, lén treo nó lên đầu ván cho tôi.',
      draw(k) {
        if (k.t < k.cue('c')) { kinh(k, { time: 'day', nha: false }); ch(k, KINH.ben + 160, 900, 470, { ...BA_NAM, view: 'side', flip: true, face: 'happy', arms: 'hold', talk: after(k, 'q') ? 0.5 : 0 }); ch(k, KINH.ben - 120, 905, 330, { ...UT, view: 'side', face: 'happy', arms: 'hold' }); longDen(k, KINH.ben + 30, 700, 0.6, 'ca', { lit: false }); dimDay(k); quote(k, '"Má con mạnh giỏi không?"', 'q', { color: AMBER, size: 60 }); return; }
        inNight(k, { ca: true }); ch(k, 1200, 990, 480, { ...NGOAI, view: 'side', flip: true, face: 'angry', arms: 'point', talk: 0.5 }); ch(k, 960, 995, 330, { ...UT, view: 'side', face: 'sad', arms: 'hold' }); longDen(k, 1050, 830, 0.42, 'ca', { lit: false }); dimNight(k, [LAMP], 0.62);
      },
    },
    {
      say: '{a}Có một năm, năm tôi lên tám, tôi lên cơn sốt đúng đêm rằm, không đi rước đèn được. {b}Gần nửa đêm, má mở cửa sổ cho thoáng. Tôi thấy bên kia kinh, trên cầu bến chòi bà Năm, có một đốm sáng. Bà Năm đứng đó, cầm cái lồng đèn con cá chép, đứng yên ngó qua nhà tôi. {c}Sáng ra tôi hết sốt. Cái lồng đèn con cá chép đã nằm trên cầu bến nhà tôi, không biết ai đem qua. Ngoại cầm lên, ngó qua bên kia kinh rất lâu. Lần đó, ngoại để yên cho tôi giữ.',
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, UT, { face: 'sleep', arms: 'down', warm: 0.8 }); return; }
        if (k.t < k.cue('c')) { demKinh(k, { a: 0.8 }, () => { longDen(k, KINH.cho - 40, 400, 0.26, 'ca', {}); }); ch(k, KINH.cho - 70, 450, 150, { ...BA_NAM, view: 'side', flip: true, face: 'sad', arms: 'hold', alpha: 0.85 }); return; }
        kinh(k, { time: 'dawn' }); ch(k, KINH.ben - 30, 905, 470, { ...NGOAI, view: 'side', flip: true, face: 'sad', arms: 'hold' }); longDen(k, KINH.ben + 40, 760, 0.45, 'ca', { lit: false, stick: false }); dimDusk(k, 1100);
      },
    },
    {
      say: '{a}Ngoại với bà Năm là hai chị em ruột. Vậy mà ba mươi mấy năm nay, hai người không nhìn mặt nhau. {b}Cách nhau có một con kinh rộng chừng ba chục thước, mà chưa bao giờ tôi thấy bà Năm bước qua cầu khỉ sang nhà tôi. {c}Hỏi thì ngoại nói: chuyện người lớn. Hỏi má, má lắc đầu: má cũng không biết.',
      draw(k) {
        if (k.t < k.cue('c')) { kinh(k, { time: 'day' }); ch(k, KINH.ben - 30, 905, 460, { ...NGOAI, view: 'side', face: 'blank', arms: 'back' }); ch(k, KINH.cho, 440, 170, { ...BA_NAM, view: 'side', flip: true, face: 'blank', arms: 'down' }); dimDay(k); return; }
        nhaLa(k, { time: 'day' }); ch(k, 760, 990, 480, { ...MA, view: 'side', face: 'blank', arms: 'hold' }); ch(k, 1060, 995, 330, { ...UT, view: 'side', flip: true, face: 'calm', arms: 'down', talk: 0.4 }); dimDay(k);
      },
    },
    {
      say: '{a}Còn một chuyện nữa, tôi nhớ vì năm nào cũng vậy. Rằm tháng Tám là sinh nhật của má. {b}Ngoại nói má sinh đúng giờ Tý đêm rằm, khóc to nhất xóm. Nhà nghèo, không có bánh kem, ngoại chỉ nấu một nồi chè đậu trắng. {c}Và đêm đó, bao giờ ngoại cũng đóng cửa thật sớm, không cho má ra bến coi đám rước.',
      sfx: [['creak', 'c', 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) { inNight(k); noiChe(k, 1000, 860, 1.2); dimNight(k, [LAMP, { x: 1000, y: 760, r: 500, warm: 1 }], 0.6); return; }
        inNight(k); ch(k, 300, 990, 480, { ...NGOAI, view: 'side', flip: true, face: 'blank', arms: 'point' }); ch(k, 1150, 990, 480, { ...MA, view: 'side', flip: true, face: 'sad', arms: 'hold' }); dimNight(k, [LAMP], 0.66);
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Ba mươi tám cái lồng đèn',
      say: '{a}Đầu tháng Bảy năm 1998, mấy bữa liền không thấy khói bếp bên chòi bà Năm. Mấy người hàng xóm bơi xuồng qua coi. {b}Bà nằm trên bộ ván, tay còn cầm cây tre chuốt dở. Bà đi êm, không ai hay. {c}Bà không chồng, không con. Người đứng ra lo đám, là ngoại tôi, người chị ruột ba mươi mấy năm không nhìn mặt bà.',
      sfx: [['wind', 'a', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { kinh(k, { time: 'dawn' }); xuong(k, 900 + k.at('a', 6, 'linear') * 300, 640, 0.9, -0.2); ch(k, 880 + k.at('a', 6, 'linear') * 300, 630, 260, { ...LANG[0], view: 'side', face: 'calm', arms: 'hold' }); dimDusk(k, 1200); chapter(k, 2, 'Ba Mươi Tám Cái Lồng Đèn'); tag(k, 'ĐẦU THÁNG BẢY · 1998', 'a'); return; }
        if (k.t < k.cue('c')) { cho(k, { n: 37, dang: true }); shade(k, 0.5, [{ x: 960, y: 700, r: 640 }], { vig: 0.55 }); cold(k, 0.4); return; }
        kinh(k, { time: 'day' }); ch(k, KINH.cho - 60, 440, 170, { ...NGOAI, view: 'side', face: 'blank', arms: 'chest' }); LANG.forEach((p, i) => ch(k, KINH.cho + 80 + i * 80, 440, 160, { ...p, view: 'side', flip: true, face: 'sad', arms: 'chest' })); dimDay(k);
      },
    },
    {
      say: '{a}Đám tang làm ba ngày. Ngoại lo đủ, không thiếu thứ gì, mà không rơi một giọt nước mắt. {b}Chiều ngày cuối, ngoại sai người dọn chòi. Dưới mái lá, người ta thấy treo kín những cái lồng đèn. {c}Tôi đứng đếm. Ba mươi bảy cái treo dưới mái. Và một con cá chép đang làm dở trên bộ ván, khung tre mới dán được một nửa. {d}Ba mươi tám cái.',
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, NGOAI, { face: 'blank', arms: 'chest', warm: 0.6 }); return; }
        cho(k, { n: 37, dang: true }); ch(k, 200, 1010, 330, { ...UT, view: 'side', face: 'shock', arms: 'down' }); shade(k, 0.38, [{ x: 960, y: 500, r: 1100, warm: 1 }], { vig: 0.5 }); quote(k, 'Ba mươi tám cái.', 'd', { color: AMBER, size: 70 });
      },
    },
    {
      say: '{a}Cái nào cũng còn mới, giấy kiếng không phai. Cái nào cũng buộc một mảnh giấy nhỏ ở đuôi. {b}Trên mỗi mảnh giấy, nét chữ run run, ghi một năm, từ năm 1961 đến năm 1998. {c}Và một cái tên: {q}Bé Rằm.',
      sfx: [['heartbeat', 'q', 0.4]],
      draw(k) {
        black(k, '#2a2014'); const n = Math.max(1, Math.min(6, 1 + Math.floor(k.at('a', Math.max(3, k.cue('q') - k.cue('a')), 'linear') * 5)));
        for (let i = 0; i < n; i++) longDen(k, 330 + i * 260, 440 + (i % 2) * 60, 0.95, LOAI[i % 4], { lit: false, stick: false, tag: i === 5 ? 1998 : 1961 + i * 7 });
        shade(k, 0.3, [{ x: 960, y: 500, r: 1000, warm: 1 }], { vig: 0.55 }); quote(k, '"Bé Rằm."', 'q', { color: AMBER, size: 84 });
      },
    },
    {
      say: '{a}Cả xóm không ai tên Rằm. Không ai biết Bé Rằm là ai. {b}Con nít xin đem về chơi. Ngoại không cho. Ngoại nói đồ của người chết, phải đốt theo cho người ta. {c}Chiều hôm đó, ngoại gom hết ba mươi tám cái lồng đèn ra bãi đất sau chòi, châm lửa. Ngoại đứng nhìn đến khi tắt hết. Má tôi không ra.',
      sfx: [['scratch', 'c', 0.3]],
      draw(k) {
        if (k.t < k.cue('c')) { kinh(k, { time: 'dusk' }); ch(k, KINH.ben - 40, 905, 470, { ...NGOAI, view: 'side', face: 'angry', arms: 'point', talk: after(k, 'b') ? 0.5 : 0 }); XOM.forEach((p, i) => ch(k, KINH.ben + 200 + i * 130, 910, 300, { ...p, view: 'side', flip: true, face: 'sad', arms: 'hold' })); dimDusk(k); return; }
        black(k, '#140e0a'); for (let i = 0; i < 7; i++) longDen(k, 700 + i * 90, 900 - (i % 3) * 50, 0.55, LOAI[i % 4], { lit: false, stick: false }); lua(k, 960, 960, 1.6); ch(k, 1500, 1010, 480, { ...NGOAI, view: 'side', flip: true, face: 'blank', arms: 'chest' }); shade(k, 0.55, [{ x: 1000, y: 760, r: 780, warm: 1, flicker: 1 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Có một điều tôi nhớ mãi. Lúc giấy kiếng cháy, nó co lại, nổ lép bép. Và trong khói, tôi nghe như có tiếng con nít hát, nhỏ xíu, ở đâu rất xa: {q}cột qua kèo, là kèo qua cột. {b}Tôi quay lại hỏi ngoại. Ngoại nói tôi nghe lầm.',
      sfx: [['wind', 'q', 0.3]],
      draw(k) { black(k, '#140e0a'); lua(k, 960, 980, 2); shade(k, 0.5, [{ x: 960, y: 760, r: 760, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, '"Cột qua kèo, là kèo qua cột."', 'q', { color: COLD, size: 58 }); },
    },

    // ===== CHƯƠNG 3 =====
    {
      say: '{a}Tối đó, lần đầu tiên trong đời, tôi thấy cái chòi bên kia kinh tối om, không một ngọn đèn. {b}Má ngồi trên cầu bến tới khuya, ngó qua bên đó. Tôi ra ngồi cạnh. Má hỏi, như hỏi chính mình: {q}Bé Rằm là ai, mà bà Năm làm cho nó ba mươi tám cái lồng đèn, con? {c}Tôi không trả lời được. Ngoại trong nhà kêu vô ngủ, giọng gắt hơn mọi ngày.',
      draw(k) { demKinh(k, { a: 0.78, before() { ch(k, KINH.ben - 20, 800, 400, { ...MA, action: 'sit', view: 'side', flip: true, face: 'sad', arms: 'hold', talk: after(k, 'q') ? 0.4 : 0 }); ch(k, KINH.ben + 110, 805, 290, { ...UT, action: 'sit', view: 'side', flip: true, face: 'calm', arms: 'down' }); } }); quote(k, '"Bé Rằm là ai, con?"', 'q', { color: AMBER, size: 62 }); },
    },
    {
      chapter: 'Đám rước không người',
      say: '{a}Rằm tháng Tám năm đó nhằm ngày mùng năm tháng Mười dương lịch. Năm đó không còn bà Năm, con nít trong xóm tự rước đèn với nhau, lèo tèo, chín giờ đã tan. {b}Ngoại đóng cửa sớm như mọi năm. Má nấu nồi chè đậu trắng, không ai ăn.',
      draw(k) {
        if (k.t < k.cue('b')) { demKinh(k, { before() { XOM.slice(0, 2).forEach((p, i) => ch(k, 700 + i * 200 + k.at('a', 8, 'linear') * 300, 905, 300, { ...p, view: 'side', action: 'walk', face: 'calm', arms: 'hold' })); } }, () => XOM.slice(0, 2).forEach((p, i) => longDen(k, 760 + i * 200 + k.at('a', 8, 'linear') * 300, 750, 0.42, LOAI[i], {}))); chapter(k, 3, 'Đám Rước Không Người'); tag(k, 'RẰM THÁNG TÁM · 05/10/1998', 'a'); return; }
        inNight(k); noiChe(k, 1000, 860, 1.2); ch(k, 1350, 990, 480, { ...MA, view: 'side', flip: true, face: 'sad', arms: 'hold' }); dimNight(k, [LAMP, { x: 1100, y: 760, r: 500, warm: 1 }], 0.62);
      },
    },
    {
      say: '{a}Nửa đêm, tôi giật mình thức dậy vì tiếng trống. Thùng. Thùng. Thùng. Đều đều, chậm rãi, từ phía đầu xóm. {b}Tôi bò ra cửa sổ. Trên bờ kinh, có một đám rước đang đi tới.',
      sfx: [['drum', 'a', 0.4], ['drum', ['a', 1.6], 0.4], ['drum', ['a', 3.2], 0.4]],
      draw(k) {
        nhaLa(k, { outside: after(k, 'b') ? (x, y) => { for (let i = 0; i < 6; i++) longDen(k, x - 260 + ((k.at('b', 8, 'linear') * 300 + i * 70) % 520), y + 40, 0.2, LOAI[i % 4], { stick: false }); } : null });
        ch(k, NHA.win.x - 40, 990, 340, { ...UT, view: 'side', face: after(k, 'b') ? 'fear' : 'shock', arms: 'chest' }); dimNight(k, [{ x: NHA.win.x, y: NHA.win.y, r: 560 }], 0.78);
      },
    },
    {
      say: '{a}Có trống, có cờ, có lồng đèn. Lồng đèn đung đưa ngang tầm tay một đứa con nít, cái nào cũng thắp sáng, mà không có tay ai cầm. {b}Lá cờ ngũ sắc phất phơ mà không có người vác. Cái trống da tự đánh từng tiếng một. {c}Và tiếng con nít hát, rõ mồn một: {q}bắc kim thang, cà lang bí rợ.',
      sfx: [['drum', 'b', 0.4], ['heartbeat', 'q', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { demKinh(k, {}, () => zoom(k, 960, 720, 1.6, () => damRuoc(k, 0.3 + k.at('a', 10, 'linear') * 0.4, { span: 1300, drum: false }))); return; }
        if (k.t < k.cue('c')) { demKinh(k, {}, () => zoom(k, 1100, 760, 1.8, () => { co(k, 900, 900, 1); trong(k, 1200, 780, 0.9); })); return; }
        demKinh(k, {}, () => damRuoc(k, 0.5 + k.at('c', 8, 'linear') * 0.3, { span: 1300 })); quote(k, '"Bắc kim thang, cà lang bí rợ."', 'q', { color: COLD, size: 58 });
      },
    },
    {
      say: '{a}Tôi đếm. Cá chép, ông sao, con thỏ, đèn kéo quân. Ba mươi tám cái. {b}Đúng ba mươi tám cái lồng đèn đã cháy thành tro sau chòi bà Năm.',
      sfx: [['click', 'a', 0.25], ['stinger', 'b', 0.45]],
      draw(k) { black(k, '#0a0e16'); const n = Math.min(38, Math.floor(k.at('a', 5, 'linear') * 38) + 1); for (let i = 0; i < n; i++) { const r = Math.floor(i / 13), c = i % 13; longDen(k, 160 + c * 133 + (r % 2) * 60, 260 + r * 250, 0.4, LOAI[i % 4], { stick: false }); } shade(k, 0.35, [{ x: 960, y: 540, r: 1100 }], { vig: 0.55 }); quote(k, 'Ba mươi tám cái.', 'b', { color: AMBER, size: 70 }); },
    },
    {
      say: '{a}Đám rước dừng lại trước bến nhà tôi. Tiếng trống ngừng. Tiếng hát cũng ngừng. {b}Ba mươi tám cái lồng đèn đứng yên, đung đưa, ngay trước cầu bến. {c}Rồi từng cái một đi tiếp, tắt dần ở cuối xóm.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) {
        const go = after(k, 'c') ? k.at('c', 6, 'linear') : 0;
        demKinh(k, {}, () => damRuoc(k, 0, { x0: KINH.ben + 820 + go * 1100, n: 12 }));
      },
    },
    {
      say: '{a}Tôi quay lại gọi má. Má chạy tới, ghé mắt ra cửa sổ. {b}Bờ kinh tối om. Má nói má không thấy gì hết, má chỉ nghe tiếng trống. {q}Ngoại thì ngồi trên bộ ván, quay mặt vô vách, nói giọng khô khốc: đóng cửa sổ lại. Ngủ đi.',
      draw(k) { nhaLa(k, {}); ch(k, NHA.win.x - 60, 990, 340, { ...UT, view: 'side', flip: true, face: 'fear', arms: 'chest' }); ch(k, NHA.win.x - 260, 990, 490, { ...MA, view: 'side', face: after(k, 'b') ? 'blank' : 'shock', arms: 'chest' }); ch(k, 420, 820, 440, { ...NGOAI, action: 'sit', view: 'side', flip: true, face: 'blank', arms: 'hold', talk: after(k, 'q') ? 0.5 : 0 }); dimNight(k, [LAMP], 0.72); quote(k, 'Má không thấy gì hết.', 'b', { color: COLD, size: 60, until: 'q' }); quote(k, '"Đóng cửa sổ lại. Ngủ đi."', 'q', { color: AMBER, size: 60 }); },
    },
    {
      say: '{a}Sáng ra, trên cầu bến nhà tôi có một cái khung con cá chép, tre chuốt dở, giấy kiếng mới dán được một nửa. Mảnh giấy buộc ở đuôi ghi: Bé Rằm, năm 1998. {b}Đúng con cá chép làm dở trên bộ ván bà Năm. Ngoại nói, chính tay ngoại đã ném nó vào đống lửa. {c}Ngoại cầm lên, đứng ngó qua bên kia kinh rất lâu. Rồi ngoại đem cất lên gác, không đốt nữa.',
      sfx: [['stinger', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) { black(k, '#2a2014'); longDen(k, 960, 480, 1.6, 'ca', { lit: false, stick: false, dang: true, tag: 1998 }); shade(k, 0.25, [DAY], { vig: 0.55 }); return; }
        kinh(k, { time: 'dawn' }); ch(k, KINH.ben, 905, 470, { ...NGOAI, view: 'side', face: 'sad', arms: 'hold' }); longDen(k, KINH.ben + 70, 760, 0.42, 'ca', { lit: false, stick: false, dang: true }); dimDusk(k, 1100);
      },
    },
    {
      say: '{a}Trưa hôm đó, thằng Lượm lén kéo tôi ra sau hè. Nó thú thật, hôm dọn chòi, nó có giấu một cái khung cá chép dở dưới áo, đem về. {b}Nó giấu dưới gầm giường nhà nó, không cho ai biết. {c}Sáng nay, cái khung ấy không còn ở đó nữa.',
      sfx: [['heartbeat', 'c', 0.45]],
      draw(k) {
        kinh(k, { time: 'day' }); ch(k, KINH.ben + 260, 910, 320, { ...XOM[0], view: 'side', flip: true, face: after(k, 'c') ? 'fear' : 'calm', arms: 'chest', talk: 0.5 }); ch(k, KINH.ben - 40, 905, 330, { ...UT, view: 'side', face: after(k, 'c') ? 'fear' : 'calm', arms: 'down' }); dimDay(k); quote(k, 'Sáng nay, cái khung ấy không còn ở đó nữa.', 'c', { color: AMBER, size: 58 });
      },
    },
    {
      say: '{a}Đến đây, nếu là bạn, nửa đêm nghe tiếng trống ngoài bờ kinh, bạn có dám mở cửa ra nhìn không? Hãy để lại câu trả lời. {b}Vì hai đêm sau đó, tiếng trống vẫn chưa dứt.',
      draw(k) { demKinh(k, { a: 0.8 }, () => longDen(k, KINH.ben, 700, 0.74, 'ca', { stick: false })); quote(k, 'Nếu là bạn, bạn có dám mở cửa ra nhìn không?', 'a', { color: PAPER, size: 56 }); },
    },

    // ===== CHƯƠNG 4 =====
    {
      say: '{a}Đêm mười sáu, tiếng trống lại tới. Không có đám rước. Chỉ có tiếng trống, rất xa, từ phía chòi bà Năm, ba tiếng rồi thôi. {b}Có thể là thằng nào trong xóm phá. {c}Ngoại ngồi giữa nhà, tay lần chuỗi hạt, miệng niệm Phật không dứt, không dám ngó ra.',
      sfx: [['drum', ['a', 3.2], 0.3], ['drum', ['a', 4.4], 0.3], ['drum', ['a', 5.6], 0.3]],
      draw(k) {
        if (k.t < k.cue('c')) { demKinh(k, { a: 0.82 }); return; }
        inNight(k); ch(k, 760, 990, 440, { ...NGOAI, action: 'sit', face: 'fear', arms: 'chest', talk: 0.4 }); dimNight(k, [LAMP], 0.66);
      },
    },
    {
      say: '{a}Sáng ra, ngoại ngã bệnh, sốt mê man. Trong cơn mê, ngoại cứ kêu: {q}Năm ơi, chị xin lỗi. Năm ơi. {b}Má ngồi bên giường, mặt lạnh tanh. Tôi biết, má cũng đã nghe thấy.',
      draw(k) { if (k.t < k.cue('b')) { mat(k, NGOAI, { face: 'sleep', arms: 'chest', talk: after(k, 'q') ? 0.4 : 0, tears: 0.5, warm: 0.8 }); quote(k, '"Năm ơi, chị xin lỗi."', 'q', { color: AMBER, size: 62 }); return; } mat(k, MA, { face: 'blank', arms: 'hold', warm: 0.7 }); },
    },
    {
      say: '{a}Gần trưa, má lục cái rương gỗ dưới gầm ván, lôi ra một cái lồng đèn ông sao cũ mèm, giấy đỏ đã bạc. Đó là cái lồng đèn bà Năm cho má năm má lên bảy. Má giữ hoài, không biết vì sao. {b}Ở đuôi ngôi sao, có một mảnh giấy nhỏ, mực đã mờ, mà ba mươi năm nay má chưa từng để ý. {c}Trên đó chỉ có hai chữ: {q}cho Rằm.',
      sfx: [['heartbeat', 'q', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { nhaLa(k, { time: 'day' }); ch(k, 960, 960, 440, { ...MA, action: 'kneel', view: 'side', face: 'blank', arms: 'hold' }); longDen(k, 1130, 760, 0.5, 'sao', { lit: false, stick: false, color: '#a86a5a' }); dimDay(k); return; }
        black(k, '#2a2014'); longDen(k, 760, 500, 2.2, 'sao', { lit: false, stick: false, color: '#a86a5a' }); const { ctx } = k; ctx.save(); ctx.translate(1300, 640); ctx.rotate(0.06); ctx.fillStyle = '#e2d6b4'; ctx.strokeStyle = '#7a6a52'; ctx.lineWidth = 3; ctx.fillRect(-170, -70, 340, 140); ctx.strokeRect(-170, -70, 340, 140); ctx.fillStyle = 'rgba(42,53,80,0.75)'; ctx.font = 'italic 500 52px "Be Vietnam Pro", Georgia, serif'; ctx.textAlign = 'center'; ctx.fillText('cho Rằm', 0, 18); ctx.restore();
        ctx.strokeStyle = '#3a2c20'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(760, 640); ctx.lineTo(1150, 620); ctx.stroke(); shade(k, 0.25, [DAY], { vig: 0.55 }); quote(k, '"Cho Rằm."', 'q', { color: AMBER, size: 76 });
      },
    },
    {
      say: '{a}Tôi không chịu nổi nữa. Đầu giờ chiều, tôi bơi xuồng qua chòi bà Năm. {b}Dưới gầm bộ ván, tôi tìm thấy một cái hộp thiếc đựng bánh, rỉ sét. {c}Trong hộp có một cái áo sơ sinh bằng vải trắng đã ngả vàng, và một tờ giấy cũ gấp tư.',
      sfx: [['creak', 'b', 0.3], ['click', 'c', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { kinh(k, { time: 'day' }); const p = k.at('a', 5, 'linear'); xuong(k, 900 + p * 400, 620, 0.85); ch(k, 880 + p * 400, 610, 230, { ...UT, view: 'side', face: 'calm', arms: 'hold' }); dimDay(k); return; }
        if (k.t < k.cue('c')) { cho(k, { n: 0 }); hopThiec(k, 960, 880, 0.9); shade(k, 0.5, [{ x: 960, y: 820, r: 520 }], { vig: 0.55 }); return; }
        black(k, '#2a2014'); hopThiec(k, 700, 700, 1.2, k.at('c', 1)); aoSoSinh(k, 1260, 520, 1.6); giayRam(k, 1300, 880, 0.6, { lines: ['', '', ''] }); shade(k, 0.3, [DAY], { vig: 0.55 });
      },
    },
    {
      say: '{a}Trên tờ giấy, mực đã nhòe, có mấy dòng chữ: {q}Bé Rằm. Sinh giờ Tý, đêm rằm tháng Tám, năm Tân Sửu. {b}Tân Sửu là năm 1961. Rằm tháng Tám, giờ Tý. {c}Đó là ngày sinh của má tôi.',
      sfx: [['heartbeat', 'b', 0.4], ['stinger', 'c', 0.5]],
      draw(k) { black(k, '#2a2014'); giayRam(k, 960, 500, 1.5); shade(k, 0.25, [DAY], { vig: 0.55 }); quote(k, 'Đó là ngày sinh của má tôi.', 'c', { color: AMBER, size: 70 }); },
    },
    {
      say: '{a}Tôi ngồi chết lặng giữa chòi. Ba mươi tám cái lồng đèn, từ năm 1961 đến năm 1998. Mỗi năm một cái. {b}Má tôi, rằm tháng Tám năm đó, vừa tròn ba mươi bảy tuổi.',
      draw(k) { cho(k, { n: 37, tags: false, lit: false }); ch(k, 960, 1010, 330, { ...UT, action: 'sit', face: 'shock', arms: 'down' }); shade(k, 0.42, [{ x: 960, y: 520, r: 1100, warm: 1 }], { vig: 0.5 }); quote(k, 'Mỗi năm một cái.', 'a', { color: AMBER, size: 62 }); },
    },
    {
      say: '{a}Tôi bơi xuồng về, đặt tờ giấy trước mặt má. Má đọc. Má không khóc. {b}Má đi thẳng vô buồng, đứng trước giường ngoại, giơ tờ giấy lên. Má chỉ hỏi đúng một câu: {q}má ơi, Bé Rằm là ai?',
      sfx: [['stinger', 'q', 0.45]],
      draw(k) { nhaLa(k, { time: 'day' }); ch(k, 420, 820, 440, { ...NGOAI, action: 'sit', face: 'fear', arms: 'chest' }); ch(k, 820, 990, 490, { ...MA, view: 'side', flip: true, face: after(k, 'b') ? 'angry' : 'blank', arms: after(k, 'b') ? 'point' : 'hold', talk: after(k, 'q') ? 0.6 : 0 }); ch(k, 1150, 995, 330, { ...UT, view: 'side', flip: true, face: 'fear', arms: 'down' }); dimDay(k); quote(k, '"Má ơi, Bé Rằm là ai?"', 'q', { color: AMBER, size: 64 }); },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Ba mươi bảy năm',
      say: '{a}Ngoại nằm im rất lâu. Rồi ngoại kể. {b}Năm 1960, bà Năm hai mươi hai tuổi, thương một anh chạy ghe tên Sáu. Hai người hẹn qua Tết thì cưới. {c}Cuối năm đó, mùa gió chướng, ghe anh Sáu chìm ở vàm sông, không tìm được xác. {d}Qua Tết, bà Năm biết mình có bầu.',
      sfx: [['wind', 'c', 0.35], ['thunder', 'c', 0.25]],
      draw(k) {
        if (k.t < k.cue('c')) { kinh(k, { time: 'day', nha: false }); ch(k, KINH.ben - 200, 905, 470, { ...NAM_TRE, view: 'side', face: 'happy', arms: 'hold' }); ch(k, KINH.ben + 220, 905, 500, { ...SAU, view: 'side', flip: true, face: 'happy', arms: 'wave' }); dimDay(k); cold(k, 0.6); chapter(k, 5, 'Ba Mươi Bảy Năm'); tag(k, 'NĂM 1960', 'b'); return; }
        if (k.t < k.cue('d')) { kinh(k, { time: 'dusk', nha: false, cho: false }); xuong(k, 1100 + Math.sin((k.gt ?? 0) * 3) * 30, 600, 1.3); shade(k, 0.6, [{ x: 1100, y: 600, r: 700 }], { vig: 0.55 }); mua(k, 1); cold(k, 0.6); return; }
        mat(k, NAM_TRE, { face: 'cry', tears: 1, arms: 'chest', warm: 0.4 }); cold(k, 0.6);
      },
    },
    {
      say: '{a}Hồi đó, con gái chửa hoang là cái nhục của cả dòng họ. Ông cố tôi đòi đuổi bà Năm ra khỏi xóm. {b}Ngoại khi ấy đã có chồng mấy năm mà không có con. Ngoại xin ông cố: để đứa nhỏ cho con nuôi, coi như con con đẻ. Đổi lại, Năm phải hứa cả đời không nhận con. {c}Đêm rằm tháng Tám năm Tân Sửu, giờ Tý, đứa bé ra đời. Bà Năm đặt tên nó là Bé Rằm. {d}Sáng hôm sau, ngoại bế nó về, làm giấy khai sinh, đặt tên khác.',
      draw(k) {
        if (k.t < k.cue('c')) { nhaLa(k, { time: 'day' }); ch(k, 760, 990, 480, { ...NGOAI_TRE, view: 'side', face: 'sad', arms: 'point', talk: after(k, 'b') ? 0.5 : 0 }); ch(k, 1150, 980, 420, { ...NAM_TRE, view: 'side', flip: true, action: 'kneel', face: 'cry', tears: 1, arms: 'chest' }); dimDay(k); cold(k, 0.6); return; }
        if (k.t < k.cue('d')) { demKinh(k, { choLit: true, lights: [{ x: KINH.cho, y: 360, r: 340, warm: 1 }] }); cold(k, 0.5); tag(k, 'RẰM THÁNG TÁM · TÂN SỬU 1961', 'c'); return; }
        kinh(k, { time: 'dawn' }); ch(k, KINH.ben, 905, 480, { ...NGOAI_TRE, view: 'side', face: 'blank', arms: 'hold' }); boc(k, KINH.ben + 50, 730, 0.75); ch(k, KINH.cho, 440, 170, { ...NAM_TRE, view: 'side', flip: true, face: 'cry', arms: 'chest' }); dimDusk(k, 1100); cold(k, 0.5);
      },
    },
    {
      say: '{a}Ngoại kể, đêm ấy bà Năm ôm con ngồi bên cửa chòi tới gần sáng. Trăng rằm sáng trưng. Bà hát cho con nghe, hát đi hát lại có một bài: {q}bắc kim thang, cà lang bí rợ. {b}Gà gáy, bà tự tay đưa con cho chị, rồi quay vô chòi, đóng cửa. {c}Ngoại nói, tiếng hát ấy, mỗi đêm rằm tháng Tám suốt ba mươi bảy năm, vẫn vọng qua bên này kinh. Nên ngoại đóng cửa.',
      draw(k) {
        if (k.t < k.cue('c')) { demKinh(k, { choLit: true, a: 0.7, before() { ch(k, KINH.cho, 440, 170, { ...NAM_TRE, action: 'sit', face: 'sad', arms: 'hold', talk: k.t < k.cue('b') ? 0.3 : 0 }); }, lights: [{ x: KINH.cho, y: 380, r: 320, warm: 1 }] }); cold(k, 0.45); quote(k, '"Bắc kim thang, cà lang bí rợ…"', 'q', { color: COLD, size: 58 }); return; }
        inNight(k); ch(k, 300, 990, 480, { ...NGOAI_TRE, view: 'side', flip: true, face: 'sad', arms: 'point' }); dimNight(k, [LAMP], 0.66); cold(k, 0.45);
      },
    },
    {
      say: '{a}Bà Năm giữ lời. Ba mươi bảy năm, bà không bước qua con kinh một lần nào. Bà cất cái chòi đúng chỗ ngó qua được nhà ngoại, để mỗi ngày nhìn con mình lớn lên. {b}Bà làm lồng đèn cho con nít cả xóm, năm nào cũng làm, không lấy tiền. {c}Chỉ để mỗi rằm tháng Tám, có cớ đưa một cái lồng đèn tận tay con mình, mà không ai nghi.',
      draw(k) {
        if (k.t < k.cue('b')) { kinh(k, { time: 'dusk' }); ch(k, KINH.cho, 440, 170, { ...BA_NAM, view: 'side', flip: true, face: 'sad', arms: 'down' }); ch(k, 300, 905, 330, { ...UT, kind: 'kid', top: '#a8b8c8', view: 'side', face: 'happy', arms: 'down' }); dimDusk(k, 1000); return; }
        if (k.t < k.cue('c')) { cho(k, { n: 0 }); ch(k, 760, 990, 470, { ...BA_NAM, action: 'sit', face: 'calm', arms: 'hold' }); for (let i = 0; i < 4; i++) longDen(k, 1100 + i * 170, 820, 0.5, LOAI[i], { lit: false, stick: false }); oil(k, 1550, 760, 1); shade(k, 0.6, [{ x: 1100, y: 640, r: 760, warm: 1, flicker: 1 }], { vig: 0.5 }); return; }
        kinh(k, { time: 'dusk', nha: false }); ch(k, KINH.ben + 160, 900, 470, { ...BA_NAM, view: 'side', flip: true, face: 'happy', arms: 'hold' }); ch(k, KINH.ben - 120, 905, 300, { ...MA, kind: 'kid', view: 'side', face: 'happy', arms: 'hold' }); longDen(k, KINH.ben + 30, 700, 0.55, 'sao', {}); dimDusk(k); cold(k, 0.4);
      },
    },
    {
      say: '{a}Còn ba mươi tám cái lồng đèn dưới mái chòi, là của riêng Bé Rằm. Mỗi năm một cái, làm xong đúng đêm sinh nhật, thắp lên một lần, rồi tắt, treo lên mái. Không bao giờ đưa. {b}Ngoại biết. Ngoại biết hết. Ngoại sợ. Ngoại sợ một ngày con Hai biết chuyện, con Hai sẽ bỏ ngoại mà qua bên kia kinh. {c}Nên ngoại cấm. Ngoại đóng cửa mỗi đêm rằm. Và ngoại đốt.',
      draw(k) {
        if (k.t < k.cue('b')) { cho(k, { n: 37, lit: true }); shade(k, 0.45, [{ x: 960, y: 320, r: 1100, warm: 1 }], { vig: 0.5 }); return; }
        if (k.t < k.cue('c')) { mat(k, NGOAI, { face: 'cry', tears: 1, arms: 'chest', talk: 0.4, warm: 0.8 }); return; }
        black(k, '#140e0a'); lua(k, 960, 960, 1.8); shade(k, 0.5, [{ x: 960, y: 760, r: 760, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, 'Và ngoại đốt.', 'c', { color: AMBER, size: 76 });
      },
    },
    {
      say: '{a}Ngoại khóc. Lần đầu tiên trong đời, tôi thấy ngoại khóc. {b}Ngoại nói: {q}Năm nó chờ con ba mươi bảy năm. Nó chết rồi, mà nó vẫn còn chờ. {c}Má tôi đứng như trời trồng, tay cầm tờ giấy. Rồi má quay đi, không nói một lời.',
      draw(k) { if (k.t < k.cue('c')) { mat(k, NGOAI, { face: 'cry', tears: 1, arms: 'cover', talk: after(k, 'q') ? 0.4 : 0, warm: 0.8 }); quote(k, '"Nó chết rồi, mà nó vẫn còn chờ."', 'q', { color: AMBER, size: 60 }); return; } mat(k, MA, { face: 'blank', arms: 'hold', warm: 0.6 }); },
    },
    {
      say: '{a}Đêm mười bảy. Từ chiều, má lấy cái khung cá chép dở trên gác xuống, ngồi dán nốt chỗ giấy kiếng còn thiếu. Tay má vụng, dán đi dán lại. {b}Gần nửa đêm, má thắp ngọn đèn cầy bên trong. {q}Ngoại trên giường nhìn theo, người run lên. Lần này, ngoại không cản nữa.',
      sfx: [['heartbeat', 'q', 0.4]],
      draw(k) {
        inNight(k); ch(k, 1000, 990, 440, { ...MA, action: 'sit', view: 'side', flip: true, face: 'sad', arms: 'hold' }); longDen(k, 860, 820, 0.55, 'ca', { lit: after(k, 'b'), stick: false, dang: !after(k, 'b') }); ch(k, 1450, 820, 440, { ...NGOAI, action: 'sit', face: 'cry', tears: 0.6, arms: 'chest' }); dimNight(k, [LAMP, ...(after(k, 'b') ? [{ x: 860, y: 820, r: 420, warm: 1, flicker: 1 }] : [])], 0.7); tag(k, 'ĐÊM MƯỜI BẢY', 'a');
      },
    },
    {
      say: '{a}Má cầm con cá chép ra cầu bến, quỳ xuống, ngó qua cái chòi tối om bên kia kinh. {b}Đúng giờ Tý. {q}Má kêu, lần đầu tiên trong đời, bằng cái tiếng má chưa từng được kêu: má ơi. Con đây. Bé Rằm đây má.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) {
        demKinh(k, { a: 0.78, lights: [{ x: KINH.ben - 120, y: 760, r: 380, warm: 1, flicker: 1 }], before() { ch(k, KINH.ben - 20, 860, 400, { ...MA, action: 'kneel', view: 'side', flip: true, face: after(k, 'q') ? 'cry' : 'sad', tears: after(k, 'q') ? 1 : 0, arms: 'hold', talk: after(k, 'q') ? 0.6 : 0 }); } }, () => longDen(k, KINH.ben - 130, 790, 0.4, 'ca', { stick: false }));
        quote(k, '"Má ơi. Con đây. Bé Rằm đây má."', 'q', { color: AMBER, size: 60 });
      },
    },
    {
      say: '{a}Rồi má hát. Má hát chậm, kéo dài chữ cuối, như ru con nít ngủ: {q}bắc kim thang, cà lang bí rợ. {b}Chưa ai dạy má hát kiểu đó. Nhưng ba mươi bảy năm, đêm rằm nào bài hát ấy cũng vọng qua kinh, lọt qua khe cửa ngoại đóng.',
      sfx: [['wind', 'a', 0.3]],
      draw(k) { demKinh(k, { a: 0.78, lights: [{ x: KINH.ben - 120, y: 760, r: 380, warm: 1, flicker: 1 }], before() { ch(k, KINH.ben - 20, 860, 400, { ...MA, action: 'kneel', view: 'side', flip: true, face: 'cry', tears: 1, arms: 'hold', talk: after(k, 'q') && !after(k, 'b') ? 0.5 : 0 }); } }, () => longDen(k, KINH.ben - 130, 790, 0.4, 'ca', { stick: false })); quote(k, '"Bắc kim thang, cà lang bí rợ…"', 'q', { color: COLD, size: 58, until: 'b' }); },
    },
    {
      say: '{a}Bên kia kinh, trong cái chòi tối om, có một đốm sáng nhỏ loé lên ở khung cửa, như ai vừa thắp một ngọn đèn. {b}Chỉ một thoáng, rồi tắt. Có thể là đom đóm. Má cúi đầu, không thấy. Chỉ có tôi thấy. {c}Ngọn đèn cầy trong con cá chép của má cháy đến gần sáng mới tắt.',
      sfx: [['sparkle', 'a', 0.2]],
      draw(k) { const lit = after(k, 'a', 0.5) && !after(k, 'b', 1.2); demKinh(k, { a: 0.8, choLit: lit, lights: [{ x: KINH.ben - 120, y: 760, r: 380, warm: 1, flicker: 1 }, ...(lit ? [{ x: KINH.cho, y: 420, r: 160, warm: 1 }] : [])], before() { ch(k, KINH.ben - 20, 860, 400, { ...MA, action: 'kneel', view: 'side', flip: true, face: 'sad', tears: 0.5, arms: 'hold', talk: 0 }); } }, () => longDen(k, KINH.ben - 130, 790, 0.4, 'ca', { stick: false })); quote(k, 'Chỉ có tôi thấy.', 'b', { color: COLD, size: 60 }); },
    },
    {
      say: '{a}Sáng hôm sau, ngoại dứt cơn sốt. Ngoại nhờ người chèo xuồng đưa ngoại qua mộ bà Năm. {b}Ngoại ngồi bên mộ cả buổi, không nói gì, chỉ vuốt mãi tấm bia. Lúc về, ngoại nói với má: {q}con muốn kêu ai bằng má thì kêu. Ngoại không giận.',
      draw(k) { moVuon(k, { time: 'day' }); ch(k, 760, 990, 420, { ...NGOAI, action: 'sit', view: 'side', face: 'sad', arms: 'point' }); if (after(k, 'b')) ch(k, 1350, 990, 490, { ...MA, view: 'side', flip: true, face: 'sad', arms: 'chest' }); dimDay(k); quote(k, '"Con muốn kêu ai bằng má thì kêu."', 'q', { color: AMBER, size: 58 }); },
    },
    {
      say: '{a}Từ năm đó, nhà tôi không đóng cửa đêm rằm tháng Tám nữa. Má tôi học chuốt tre, dán giấy kiếng. {b}Năm nào má cũng làm lồng đèn cho con nít cả xóm, không lấy tiền. Và năm nào, má cũng là người đánh cái trống da cũ, đi đầu đám rước.',
      sfx: [['drum', 'b', 0.3]],
      draw(k) { demKinh(k, { a: 0.6, before() { const x = 400 + k.at(0, Math.max(6, k.d), 'linear') * 800; ch(k, x + 200, 900, 480, { ...MA, view: 'side', action: 'walk', face: 'happy', arms: 'hold' }); XOM.forEach((pp, i) => ch(k, x - i * 190, 905, 310, { ...pp, view: 'side', action: 'walk', face: 'happy', arms: 'hold' })); } }, () => { const x = 400 + k.at(0, Math.max(6, k.d), 'linear') * 800; trong(k, x + 330, 760, 0.55); XOM.forEach((pp, i) => longDen(k, x - i * 190 + 60, 700, 0.45, LOAI[i], {})); }); },
    },
    {
      say: '{a}Có người hỏi má, giờ má kêu ai là má. Má cười: má có hai người má. Một người nuôi má ba mươi bảy năm. Một người chờ má ba mươi bảy năm. {b}Mỗi rằm tháng Tám, nhà tôi nấu hai nồi chè. Một nồi để trên bàn thờ bà Năm. Nồi kia, má múc chén đầu tiên, mời ngoại.',
      draw(k) { nhaLa(k, { time: 'day', ca: true }); noiChe(k, 760, 900, 0.8); noiChe(k, 1160, 900, 0.8); ch(k, 420, 820, 440, { ...NGOAI, action: 'sit', face: 'happy', arms: 'hold' }); ch(k, 1450, 990, 480, { ...MA, view: 'side', flip: true, face: 'happy', arms: 'hold', talk: k.t < k.cue('b') ? 0.4 : 0 }); dimDay(k); },
    },
    {
      say: '{a}Con cá chép năm 1998, má treo trên bàn thờ bà Năm. Mỗi năm, đêm rằm, má dán lại giấy kiếng cho nó một lần. {b}Ngoại tôi mất năm ngoái, chín mươi lăm tuổi. Lúc hấp hối, ngoại cứ ngó ra bờ kinh, miệng mấp máy, như đang hát theo ai.',
      draw(k) { if (k.t < k.cue('b')) { nhaLa(k, { time: 'day', ca: true }); shade(k, 0.3, [{ x: 1010, y: 260, r: 520, warm: 1 }, DAY], { vig: 0.5 }); return; } mat(k, NGOAI, { face: 'sleep', arms: 'down', talk: 0.25, warm: 0.6 }); },
    },
    {
      say: '{a}Rằm tháng Tám vừa rồi, đám rước của xóm tan từ chín giờ. Nửa đêm, tôi nghe như có tiếng trống, rất xa. {b}Tôi ra bến. Bên kia kinh, cái chòi bà Năm đã sập từ lâu, chỉ còn bụi dừa nước. Trên cầu bến nhà tôi, má ngồi một mình, tay cầm con cá chép. {c}Má nói, đêm rằm nào má cũng nghe hai bà hát bên kia kinh, một giọng khàn, một giọng trầm, hát chung với nhau: {q}cột qua kèo, là kèo qua cột.',
      sfx: [['drum', 'a', 0.25], ['wind', 'b', 0.3]],
      draw(k) {
        demKinh(k, { cho: false, a: 0.76, lights: [{ x: KINH.ben, y: 760, r: 360, warm: 1, flicker: 1 }], before() { ch(k, KINH.ben, 860, 420, { ...MA, kind: 'old', hairColor: '#a8a29a', action: 'sit', view: 'side', flip: true, face: 'calm', arms: 'hold', talk: after(k, 'c') ? 0.4 : 0 }); } }, () => longDen(k, KINH.ben - 90, 800, 0.38, 'ca', { stick: false }));
        tag(k, 'RẰM THÁNG TÁM · NĂM NAY', 'a'); quote(k, '"Cột qua kèo, là kèo qua cột."', 'q', { color: COLD, size: 58 });
      },
    },
    {
      say: '{a}Tôi đứng sau lưng má rất lâu. Tôi không nghe thấy gì hết, ngoài tiếng nước. {b}Má tôi năm nay sáu mươi lăm tuổi. {c}Rằm tháng Tám tới, tôi sẽ đóng cửa thật sớm. Như ngoại ngày xưa.',
      tail: 2.5,
      sfx: [['wind', 'a', 0.3], ['stinger', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { demKinh(k, { cho: false, a: 0.8, lights: [{ x: KINH.ben, y: 760, r: 360, warm: 1, flicker: 1 }], before() { ch(k, KINH.ben, 860, 420, { ...MA, kind: 'old', hairColor: '#a8a29a', action: 'sit', view: 'side', flip: true, face: 'calm', arms: 'hold' }); ch(k, KINH.ben + 260, 905, 470, { ...UT, kind: 'woman', top: '#5a6a7a', view: 'side', flip: true, face: 'sad', arms: 'chest' }); } }, () => longDen(k, KINH.ben - 90, 800, 0.38, 'ca', { stick: false })); return; }
        inNight(k); ch(k, 300, 990, 340, { ...UT, kind: 'woman', top: '#5a6a7a', view: 'side', flip: true, face: 'sad', arms: 'point' }); dimNight(k, [LAMP], 0.7); quote(k, 'Rằm tháng Tám tới, tôi sẽ đóng cửa thật sớm.', 'c', { color: AMBER, size: 56 });
      },
    },

    // ===== CUỐI =====
    nextScene({
      say: '{next}Tập sau: năm 1996, bà tôi bảo, Ông Kẹ đi bắt con nít, bao giờ cũng gõ cửa đúng ba tiếng. Đêm ấy, nhà tôi nghe ba tiếng gõ. Rồi đến tiếng thứ tư. Tiếng thứ tư không phát ra từ cửa, mà từ bên trong cái tủ gỗ.',
      title: 'Ông Kẹ | Tiếng Gõ Thứ Tư',
      hook: 'Ba tiếng gõ ngoài cửa. Tiếng thứ tư ở trong tủ.',
      art(k) { const { ctx } = k; black(k, '#1a130d'); ctx.fillStyle = '#5a3e28'; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 5; ctx.beginPath(); ctx.rect(760, 240, 400, 540); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(960, 240); ctx.lineTo(960, 780); ctx.stroke(); ctx.fillStyle = '#c8a24a'; ctx.beginPath(); ctx.arc(935, 520, 9, 0, Math.PI * 2); ctx.arc(985, 520, 9, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#05040a'; ctx.fillRect(956, 260, 8, 500); for (let i = 0; i < 4; i++) { ctx.strokeStyle = `rgba(240,220,170,${i === 3 ? 0.7 : 0.35})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(i === 3 ? 960 : 560, i === 3 ? 520 : 360 + i * 120, 40, -0.8, 0.8); ctx.stroke(); } },
    }),
    subScene({
      say: '{q}Theo bạn, ngoại tôi giữ Bé Rằm lại suốt ba mươi bảy năm là vì thương, hay vì ích kỷ? Hãy để lại câu trả lời. {sub}Và nếu muốn nghe tiếp những chuyện chưa có lời giải, hãy đăng ký Nhân Gian Chưa Kể.',
      question: 'Ngoại giữ Bé Rằm lại suốt 37 năm là vì thương, hay vì ích kỷ?',
      art(k) { longDen(k, 960, 930, 0.6, 'ca', { stick: false }); },
    }),
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
