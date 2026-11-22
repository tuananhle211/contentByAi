// Nhân Gian Chưa Kể — tập Ông Giẳng Ông Giăng | Trăng Dưới Giếng Hát Bằng Giọng Bố Tôi. Kịch bản + sổ dữ kiện: kich-ban.md.
// Công thức Gọi Hồn: bài đồng dao ai cũng thuộc; giọng biết hai câu chỉ người đã khuất biết; bí mật người sống (mẹ viết thư giả, bán máu; bà loà biết từ lá đầu);
// một điều kiêng duy nhất (không hát đáp); sửa 20/11 theo hướng chân thật: trăng + tiếng hát dưới giếng là hiện tượng "không thể" duy nhất, chỉ tôi thấy; hai danh tính không chọn. Không vẽ trẻ em trong tình huống nguy hiểm: cảnh ở miệng giếng chỉ quay từ xa hoặc nhìn từ trong giếng lên.
import * as thumbs from '/videos/130-ong-giang-trang-duoi-gieng/thumbs.js';
import { PAPER, AMBER, COLD, shade, cold, tag, quote, chapter, rules, nextScene, subScene, oil } from '/channel/nhan-gian.js';
import { sanNha, SAN, gianNha, GIAN, baiMo, mam } from '/channel/nhan-gian-babi.js';
import {
  NHIM, NHIM_BE, NHIM_LON, CON, ME_N, BA_N, BO_N, MANH, HANG_XOM, ch, trang, bong, matNuoc, gieng, GI, giengSang, soi, thanhGieng, hu,
  thu, phong, vo, homTon, anhBo, banTay, tayKim, chiDo, goiUot, cub, noiBanh, chuong, roXoi, huong, domDo, tuyet, benhVien, canHo, nhaTam, TAM, sepia,
} from '/channel/nhan-gian-gieng.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const black = (k, c = '#07060a') => { k.ctx.fillStyle = c; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); };
const zoom = (k, cx, cy, s, fn) => k.group({ x: cx, y: cy, s }, () => k.group({ x: -cx, y: -cy }, fn));
const grain = (sc) => ({ ...sc, draw(k) { const s = 1 + 0.05 * Math.min(1, k.t / Math.max(1, k.d)); k.group({ x: k.W / 2, y: k.H / 2, s }, () => k.group({ x: -k.W / 2, y: -k.H / 2 }, () => sc.draw(k))); sepia(k, 0.75); } });
const M1 = 70, M2 = 190, M3 = 340, M4 = 560;
const DAY = { x: 1500, y: 300, r: 1700 };
const LAMP = { x: GIAN.lamp.x, y: GIAN.lamp.y - 70, r: 680, warm: 1, flicker: 1 };
const BED = { x: 1600, y: 672 };
const dimDay = (k) => shade(k, 0.2, [DAY], { vig: 0.4 });
const dimIn = (k, a = 0.6, extra = []) => shade(k, a, [LAMP, { x: 1500, y: 560, r: 560, warm: 1, flicker: 1 }, ...extra], { vig: 0.5 });
const dimWell = (k, a = 0.8, l = [{ x: GI.x, y: 720, r: 620 }]) => shade(k, a, l, { vig: 0.55 });
const phong3 = (k, o = {}) => { gianNha(k, o); anhBo(k, 760, 340, 0.72); oil(k, GIAN.lamp.x, 682, 1); };
const baNgoi = (k, o = {}) => ch(k, BED.x, BED.y, 420, { ...BA_N, action: 'sit', face: 'sleep', arms: 'hold', ...o });
// Cận mặt trên nền tối; o.moon = ánh trăng hắt từ dưới lên.
function mat(k, p, o = {}) {
  black(k, o.bg ?? '#141019'); zoom(k, 960, 430, 2.3, () => ch(k, 960, 860, o.h ?? 560, { ...p, arms: o.arms ?? 'chest', face: o.face ?? 'calm', tears: o.tears ?? 0, talk: o.talk ?? 0 }));
  shade(k, 0.45, [{ x: 960, y: o.moon ? 760 : 450, r: 740, warm: o.moon ? 0 : (o.warm ?? 1) }], { vig: 0.6 });
  if (o.moon) { const { ctx } = k, g = ctx.createLinearGradient(0, 1080, 0, 260); g.addColorStop(0, `rgba(226,228,206,${0.5 * o.moon})`); g.addColorStop(1, 'rgba(226,228,206,0)'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(0, 0, k.W, k.H); ctx.restore(); }
}
// Bố cõng con trên vai.
function cong(k, x, y, h, o = {}) { const { ctx } = k; ch(k, x, y - h * 0.86, h * 0.5, { ...NHIM_BE, action: 'sit', arms: 'raise', face: 'happy', shadow: false }); ch(k, x, y, h, { ...BO_N, arms: 'hold', face: 'happy', talk: o.talk ?? 0.4 }); for (const d of [-1, 1]) { ctx.fillStyle = NHIM_BE.pants; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(x + d * h * 0.2 - 24, y - h * 0.66, 48, h * 0.17, 22); ctx.fill(); ctx.stroke(); ctx.fillStyle = NHIM_BE.skin; ctx.beginPath(); ctx.ellipse(x + d * h * 0.2, y - h * 0.48, 30, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); } }
// Tờ lịch bóc.
function lich(k, so, thang) {
  const { ctx } = k; black(k, '#2a2018'); ctx.fillStyle = '#c8b690'; ctx.fillRect(0, 0, k.W, k.H);
  ctx.save(); ctx.translate(960, 540); ctx.rotate(-0.012); ctx.fillStyle = '#efe8d4'; ctx.strokeStyle = '#6a5a44'; ctx.lineWidth = 4; ctx.beginPath(); ctx.rect(-300, -420, 600, 840); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#b0342c'; ctx.fillRect(-300, -420, 600, 120); ctx.restore();
  k.text('ĐINH SỬU · 1997', 960, 182, { size: 50, font: 'title', color: '#f6eee0' }); k.text(String(so), 960, 500, { size: 330, font: 'title', color: '#b0342c' }); k.text(thang, 960, 800, { size: 42, font: 'title', color: '#3a2c20' });
}
// Hàng dấu chân ướt đi vào nhà.
function dauUot(k, n = 9) { const { ctx } = k; ctx.fillStyle = 'rgba(40,52,66,0.72)'; for (let i = 0; i < n; i++) { const p = i / (n - 1), x = SAN.gate - 60 - p * 780, y = 960 - p * 70 + (i % 2) * 26; ctx.beginPath(); ctx.ellipse(x, y, 46, 18, 0.08, 0, Math.PI * 2); ctx.fill(); for (let t = 0; t < 4; t++) { ctx.beginPath(); ctx.arc(x - 56, y - 14 + t * 9, 6, 0, Math.PI * 2); ctx.fill(); } } }
// Ngón tay cái miết dọc mép dưới lá thư.
function ngonTay(k, x, y) { const { ctx } = k; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 4; ctx.fillStyle = '#5e4634'; ctx.beginPath(); ctx.roundRect(x - 95, y + 120, 190, 400, 30); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#d8b498'; ctx.beginPath(); ctx.roundRect(x - 112, y + 6, 224, 150, 58); ctx.fill(); ctx.stroke(); ctx.strokeStyle = 'rgba(70,46,30,0.6)'; for (const d of [-54, 0, 54]) { ctx.beginPath(); ctx.moveTo(x + d, y + 12); ctx.lineTo(x + d, y + 62); ctx.stroke(); } ctx.strokeStyle = '#2c1f17'; ctx.fillStyle = '#d8b498'; ctx.beginPath(); ctx.roundRect(x - 40, y - 40, 214, 70, 34); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ecd8c4'; ctx.beginPath(); ctx.roundRect(x + 118, y - 30, 46, 50, 14); ctx.fill(); ctx.stroke(); }
// Chậu nước đặt dưới sàn nhà tắm, nhìn chếch.
const chau = (k, moon = 0) => { const { ctx } = k, { x, y, r } = TAM.chau; ctx.save(); ctx.translate(x, y + 90); ctx.scale(1, 0.42); ctx.translate(-x, -y); matNuoc(k, x, y, r * 1.25, { rim: '#6f8aa8', moon }); ctx.restore(); };
const THUC = (k, l) => { black(k, '#1a130d'); thu(k, 960, l.y ?? 560, l.s ?? 1.02, l); };

const video = {
  meta: {
    title: 'Ông Giẳng Ông Giăng | Trăng Dưới Giếng Hát Bằng Giọng Bố Tôi',
    description: `Đêm ba mươi, trời không có trăng. Vậy mà năm 1997, tôi cúi xuống cái giếng cổ đầu làng và thấy một vầng trăng tròn. Có người ngồi trên đó, hát bài ông giẳng ông giăng.
Người ấy hát thêm hai câu mà cả đời tôi chỉ một người biết: bố tôi. Mà bố tôi thì đang ở nước Nga, thư vẫn về đều mỗi năm hai lần.

Mười một lá thư, một quyển vở học trò dưới đáy hòm, và người bà loà cứ miết ngón tay dọc mép giấy sau mỗi lần nghe đọc thư.`,
    footer: `📖 Truyện hư cấu dựa trên bài đồng dao Ông Giẳng Ông Giăng và những điều kiêng kỵ dân gian về giếng làng. Tên người, tên địa danh và tình tiết đều hư cấu.
🕯️ Nhân Gian Chưa Kể: những chuyện người xưa truyền tai nhau, mà chưa ai giải thích được.`,
    links: [['▶ Tập trước: Ma Giấu', '127-ma-giau-bay-dua-di-tron'], ['▶ Gọi Hồn', '106-goi-hon-nguoi-ve-goi-vo-la-chi'], ['🔔 Đăng ký', 'https://www.youtube.com/@nhangianchuake?sub_confirmation=1']],
    tags: ['ông giẳng ông giăng', 'trăng dưới giếng', 'giếng cổ', 'chuyện ma giếng làng', 'đồng dao', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'truyện ma làng quê', 'hoạt hình kinh dị', 'nhân gian chưa kể'],
    hashtags: ['truyenma', 'onggiangonggiang', 'tamlinh'],
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
      say: '{a}Đêm ba mươi, trời không có trăng. Đứa trẻ nào ở quê cũng biết điều ấy. {b}Vậy mà năm 1997, đêm ba mươi tháng Bảy, tôi cúi xuống cái giếng cổ đầu làng, {c}và thấy một vầng trăng tròn.',
      sfx: [['wind', 0, 0.3], ['stinger', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { gieng(k, { time: 'night' }); dimWell(k, 0.86); tag(k, 'NĂM 1997 · ĐÊM BA MƯƠI', 'b'); return; }
        soi(k, { moon: M1 + k.at('c', 4, 'linear') * 30 });
      },
    },
    {
      say: '{a}Có người đang ngồi trên vầng trăng ấy. {b}Người đó hát: ông giẳng, ông giăng, xuống chơi với tôi. {c}Bài đồng dao ấy, đứa trẻ nào cũng thuộc. {d}Nhưng người dưới giếng còn hát thêm hai câu, mà cả đời tôi, chỉ một người biết. {e}Người đó là bố tôi. {f}Mà năm ấy, bố tôi đang ở nước Nga, cách làng tôi gần bảy nghìn cây số.',
      sfx: [['heartbeat', 'd', 0.4], ['stinger', 'e', 0.4], ['wind', 'f', 0.3]],
      draw(k) {
        if (k.t < k.cue('e')) { soi(k, { moon: 130, who: k.at('a', 1.4) }); quote(k, '"Ông giẳng, ông giăng, xuống chơi với tôi."', 'b', { color: COLD, size: 56, until: 'c' }); return; }
        if (k.t < k.cue('f')) { black(k, '#1a130d'); anhBo(k, 960, 500, 2.5); shade(k, 0.3, [{ x: 960, y: 500, r: 720, warm: 1 }], { vig: 0.6 }); return; }
        tuyet(k, { fn() { ch(k, 960 + k.at('f', 7, 'linear') * 120, 900, 440, { ...BO_N, top: '#3c4044', view: 'side', action: 'walk', face: 'calm', arms: 'down' }); } }); shade(k, 0.35, [{ x: 960, y: 500, r: 1000 }], { vig: 0.5 }); quote(k, 'Nước Nga. Gần bảy nghìn cây số.', 'f', { color: PAPER, size: 56 });
      },
    },
    {
      say: '{a}Đây là Nhân Gian Chưa Kể. Nếu bạn muốn nghe tiếp những chuyện chưa có lời giải, hãy bấm đăng ký. {b}Còn bây giờ, xin bạn tắt bớt đèn.',
      draw(k) { black(k); const fade = 1 - k.at('b', 3, 'linear') * 0.7; oil(k, 960, 790, 2.1); shade(k, 0.84, [{ x: 960, y: 620, r: 680 * fade, warm: 1, flicker: 1 }], { vig: 0.5 }); k.text('NHÂN GIAN CHƯA KỂ', 960, 300, { size: 92, font: 'title', color: AMBER, fx: 'fade', p: k.at('a', 1) * fade }); },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Thư từ nước Nga',
      say: '{a}Làng tôi ở xứ Đoài, đất đá ong. Đầu làng có một cái giếng cổ, thành xếp bằng những viên đá ong sần sùi, sâu hun hút, không ai biết có từ đời nào. {b}Nước giếng lạnh và trong, pha chè rất thơm. {c}Người làng gọi nó là giếng Trăng, vì những đêm rằm, trăng rơi xuống lòng giếng, tròn vừa khít.',
      draw(k) {
        if (k.t < k.cue('c')) { gieng(k, { time: 'day' }); ch(k, 1460, 985, 470, { ...HANG_XOM[0], view: 'side', flip: true, face: 'calm', arms: 'hold' }); dimDay(k); chapter(k, 1, 'Thư Từ Nước Nga'); return; }
        soi(k, { moon: 300 });
      },
    },
    {
      say: '{a}Về bố, tôi chỉ giữ được một ký ức. Những đêm rằm, bố cõng tôi trên vai ra giếng, chỉ cho tôi xem trăng dưới nước. {b}Bố hát: ông giẳng ông giăng, xuống chơi với tôi, có bầu có bạn, có ván cơm xôi. {c}Rồi bố tự chế thêm hai câu, chỉ hát cho mình tôi nghe: {q}có cái Nhím con, ngồi trên vai bố. {d}Nhím là tên ở nhà của tôi.',
      draw(k) { gieng(k, { time: 'dusk' }); cong(k, 560, 1000, 620); shade(k, 0.42, [{ x: 620, y: 560, r: 900, warm: 1 }], { vig: 0.5 }); cold(k, 0.35); quote(k, 'Có cái Nhím con, ngồi trên vai bố.', 'q', { color: AMBER, size: 62 }); },
    },
    {
      say: '{a}Thành giếng có một viên đá ong lung lay, ngay dưới miệng giếng, vừa tầm tay với. Bố hay lay nó cho tôi xem, rồi cười: {q}viên này lỏng từ đời các cụ, mà chẳng bao giờ rơi.',
      sfx: [['scratch', 'q', 0.2]],
      draw(k) { thanhGieng(k, { open: Math.max(0, Math.sin(k.t * 3)) * 0.018 }); shade(k, 0.4, [{ x: 960, y: 430, r: 640, warm: 1 }], { vig: 0.6 }); cold(k, 0.3); },
    },
    {
      say: '{a}Sau Tết năm 1989, bố đi hợp tác lao động ở Liên Xô. Năm ấy tôi chưa đầy bốn tuổi. {b}Bố gửi về một tấm ảnh, đội mũ lông, đứng giữa tuyết. Bà nội bắt treo nó lên tường, dù bà không nhìn thấy. {c}Rồi Liên Xô tan. Trong thư, bố bảo ở lại đi buôn quần áo ở một cái chợ bên Nga, chưa về được.',
      draw(k) {
        if (k.t < k.cue('b')) { sanNha(k, { time: 'dawn', gateOpen: true }); ch(k, 1250, 985, 500, { ...BO_N, view: 'side', face: 'happy', arms: 'wave' }); ch(k, 880, 990, 470, { ...ME_N, skin: '#e8c8a8', view: 'side', flip: false, face: 'sad', arms: 'chest' }); ch(k, 1000, 995, 230, { ...NHIM_BE, face: 'sad', arms: 'raise' }); shade(k, 0.28, [DAY], { vig: 0.45 }); tag(k, 'SAU TẾT 1989', 'a'); return; }
        if (k.t < k.cue('c')) { phong3(k); zoom(k, 760, 340, 2, () => anhBo(k, 760, 340, 0.72)); dimIn(k, 0.42, [{ x: 760, y: 340, r: 520, warm: 1 }]); return; }
        black(k, '#1a130d'); phong(k, 960, 500, 1.8, { r: -0.03 }); shade(k, 0.3, [{ x: 960, y: 500, r: 860, warm: 1 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Mấy năm đầu, thư về theo đường bưu điện. {b}Từ năm tôi lên bảy, chú Mạnh, người cùng đợt với bố đã về nước trước, mang thư và tiền đến tận nhà, mỗi năm hai lần. {c}Tiền ấy là tiền thuốc của bà, tiền học của tôi. Cả nhà tôi sống bằng những lá thư ấy.',
      draw(k) {
        sanNha(k, { time: 'day', gateOpen: true }); cub(k, 1720, 985, 0.95); ch(k, 1330, 985, 500, { ...MANH, view: 'side', flip: true, face: 'calm', arms: 'point' }); ch(k, 960, 990, 470, { ...ME_N, view: 'side', face: 'calm', arms: 'chest' });
        if (after(k, 'b')) phong(k, 1145, 800, 0.24, { r: 0.1 }); dimDay(k);
      },
    },
    {
      say: '{a}Bà nội tôi bị loà. Hai bác tôi đi bộ đội, hi sinh năm 1968 và năm 1972, bà khóc đến mù hai mắt. {b}Bố là đứa con trai cuối cùng bà còn lại. {c}Từ năm tôi lên bảy, mẹ giao cho tôi việc đọc thư cho bà nghe. Mẹ bảo mẹ bận.',
      draw(k) { phong3(k); baNgoi(k, { tears: k.t < k.cue('b') ? 0.7 : 0 }); if (after(k, 'c')) ch(k, 1250, 960, 340, { ...NHIM, view: 'side', face: 'calm', arms: 'hold', talk: 0.5 }); dimIn(k); },
    },
    {
      say: '{a}Tôi ngồi cạnh giường, đọc to: {q}kính thưa mẹ, con ở bên này vẫn khoẻ. {b}Đọc xong, bà cầm lá thư, miết ngón tay cái dọc mép dưới thật chậm, từ đầu này sang đầu kia. {c}Rồi bà đưa lên mũi, hít một hơi dài, gấp lại, để dưới gối. Bà bảo: {r}thư thơm lắm. {d}Tôi tưởng bà nhớ con.',
      draw(k) {
        if (k.t < k.cue('b')) { THUC(k, {}); shade(k, 0.3, [{ x: 960, y: 500, r: 900, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, '"Kính thưa mẹ, con ở bên này vẫn khoẻ."', 'q', { size: 54 }); return; }
        if (k.t < k.cue('c')) { THUC(k, { y: 240, s: 1.5 }); const p = k.at('b', 5, 'inOut'); ngonTay(k, 620 + p * 640, 870); shade(k, 0.3, [{ x: 960, y: 800, r: 900, warm: 1, flicker: 1 }], { vig: 0.6 }); return; }
        phong3(k); baNgoi(k, { face: 'calm', arms: 'chest' }); ch(k, 1250, 960, 340, { ...NHIM, view: 'side', face: 'calm', arms: 'hold' }); dimIn(k); quote(k, '"Thư thơm lắm."', 'r', { color: AMBER, size: 62 });
      },
    },
    {
      say: '{a}Còn mẹ tôi thì tôi không hiểu nổi. Mẹ gầy, da xanh như tàu lá, giữa mùa hè vẫn mặc áo dài tay. {b}Cứ hai ba tháng, chú Mạnh lại đèo mẹ đi từ lúc trời chưa sáng, đến chiều mới về. Về đến nhà, mặt mẹ trắng bệch, nằm vật ra giường. {c}Người làng bắt đầu xì xào: chồng đi Nga tám năm, vợ ở nhà có người đèo. {d}Năm mười hai tuổi, tôi ghét mẹ tôi.',
      draw(k) {
        if (k.t < k.cue('b')) { sanNha(k, { time: 'day', line: true }); ch(k, 960, 990, 500, { ...ME_N, face: 'blank', arms: 'hold' }); dimDay(k); return; }
        if (k.t < k.cue('c')) { sanNha(k, { time: 'dawn', gateOpen: true }); const x = 1200 + k.at('b', 6, 'inOut') * 900; ch(k, x - 40, 830, 430, { ...MANH, action: 'sit', view: 'side', flip: false, face: 'calm', arms: 'point' }); ch(k, x - 140, 830, 400, { ...ME_N, action: 'sit', view: 'side', face: 'blank', arms: 'hold' }); cub(k, x - 60, 985, 0.95, { spin: 1 }); shade(k, 0.5, [{ x: 1400, y: 500, r: 900 }], { vig: 0.5 }); return; }
        if (k.t < k.cue('d')) { gieng(k, { time: 'day' }); ch(k, 620, 990, 470, { ...HANG_XOM[0], view: 'side', face: 'smug', arms: 'point', talk: 0.6 }); ch(k, 860, 990, 470, { ...HANG_XOM[1], view: 'side', flip: true, face: 'smug', arms: 'chest', talk: 0.5 }); dimDay(k); quote(k, '"Chồng đi Nga tám năm, vợ ở nhà có người đèo."', 'c', { color: PAPER, size: 54 }); return; }
        mat(k, NHIM, { face: 'angry', arms: 'down', warm: 0.8 });
      },
    },
    {
      say: '{a}Và cứ đến đêm cuối tháng âm lịch, chiều ấy mẹ lại đồ một nắm xôi nhỏ, không cho ai ăn. {b}Nửa đêm, tôi nghe tiếng then cửa kéo rất khẽ.',
      sfx: [['creak', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { black(k, '#1a130d'); roXoi(k, 960, 800, 3.6); shade(k, 0.35, [{ x: 960, y: 620, r: 720, warm: 1, flicker: 1 }], { vig: 0.6 }); return; }
        phong3(k); ch(k, 300, 980, 490, { ...ME_N, view: 'side', flip: true, action: 'walk', face: 'blank', arms: 'hold' }); shade(k, 0.85, [{ x: 330, y: 660, r: 340, warm: 1 }], { vig: 0.55 });
      },
    },
    {
      say: '{a}Về cái giếng ấy, bà nội chỉ dặn tôi đúng một điều, dặn từ bé. {r1}Nếu nghe dưới giếng có người hát, thì tuyệt đối không được hát đáp lại. {b}Đáp một câu, là đã nhận lời xuống chơi.',
      sfx: [['click', 'r1', 0.3], ['heartbeat', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('r1')) { phong3(k); baNgoi(k, { talk: 0.5, arms: 'point' }); ch(k, 1250, 960, 300, { ...NHIM_BE, ...NHIM, view: 'side', face: 'calm', arms: 'down' }); dimIn(k); return; }
        phong3(k); baNgoi(k, { talk: 0.5, arms: 'point', face: 'blank' }); ch(k, 1250, 960, 300, { ...NHIM_BE, ...NHIM, view: 'side', face: 'fear', arms: 'down' }); dimIn(k); quote(k, 'Nghe dưới giếng có người hát: không được đáp.', 'r1', { color: AMBER, size: 56, until: 'b' }); quote(k, 'Đáp một câu, là đã nhận lời xuống chơi.', 'b', { color: COLD, size: 56 });
      },
    },
    {
      say: '{a}Bà kể, năm đói Ất Dậu, bà hai mươi tuổi, cái giếng ấy đã lấy của làng ba người. {b}Cả ba, trước hôm mất, đều bảo nghe thấy tiếng người nhà gọi xuống ăn cơm. {c}Có ván cơm xôi. Có nồi cơm nếp. Người đói nghe câu ấy, thì ai mà không xuống.',
      sfx: [['wind', 'a', 0.3], ['heartbeat', 'c', 0.35]],
      draw(k) { gieng(k, { time: 'dusk', bucket: false }); shade(k, 0.66, [{ x: GI.x, y: 700, r: 520 }], { vig: 0.6 }); cold(k, 0.85); tag(k, 'NĂM ĐÓI ẤT DẬU · 1945', 'a'); quote(k, 'Có ván cơm xôi. Có nồi cơm nếp.', 'c', { color: COLD, size: 58 }); },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Đêm ba mươi tháng Bảy',
      say: '{a}Đêm ba mươi tháng Bảy năm 1997. Trời tối đen, không một ánh sao. {b}Nửa đêm, then cửa lại kéo khẽ. Mẹ cắp cái rổ nhỏ đi ra ngõ. {c}Lần này tôi nhổm dậy, đi theo. Tôi muốn tận mắt nhìn xem người đàn ông ấy là ai.',
      sfx: [['creak', 'b', 0.35], ['owl', 'c', 0.25]],
      draw(k) {
        sanNha(k, { time: 'night', gateOpen: true, moon: false }); const p = k.at('b', 7, 'linear'); ch(k, 700 + p * 900, 985, 470, { ...ME_N, view: 'side', action: 'walk', face: 'blank', arms: 'hold' }); roXoi(k, 790 + p * 900, 800, 0.7);
        if (after(k, 'c')) ch(k, 520 + k.at('c', 5, 'linear') * 620, 985, 330, { ...NHIM, view: 'side', action: 'walk', face: 'angry', arms: 'down' });
        shade(k, 0.84, [{ x: 800 + p * 800, y: 700, r: 460 }], { vig: 0.55 }); chapter(k, 2, 'Đêm Ba Mươi Tháng Bảy');
      },
    },
    {
      say: '{a}Mẹ đi thẳng ra đầu làng, đến bên giếng thì dừng lại. Tôi nấp sau gốc đa. {b}Tối quá, tôi chỉ nhìn thấy một đốm đỏ bé xíu, lập loè ngay cạnh mẹ, như đầu một điếu thuốc. {c}Tôi nghe mẹ thì thầm với ai đó rất lâu. Không nghe rõ tiếng người kia. {d}Rồi mẹ quay về một mình.',
      sfx: [['wind', 0, 0.25]],
      draw(k) {
        gieng(k, { time: 'night' }); const inP = k.at(0, 3.5, 'linear'), mx = GI.left - 300 + inP * 330; ch(k, mx, 975, 470, { ...ME_N, view: 'side', action: inP < 1 ? 'walk' : 'stand', face: 'sad', arms: 'chest', talk: after(k, 'c') && !after(k, 'd') ? 0.3 : 0, flip: after(k, 'd') }); ch(k, 90, 1010, 330, { ...NHIM, view: 'side', face: 'fear', arms: 'chest' });
        shade(k, 0.9, [{ x: mx + 10, y: 720, r: 340 }], { vig: 0.55 }); if (after(k, 'b')) domDo(k, GI.left + 210, 660);
      },
    },
    {
      say: '{a}Tôi đợi mẹ đi khuất, rồi ra giếng, tìm xem người kia đã đi lối nào. Không có ai. {b}Tôi đang giận, và tôi mười hai tuổi. {c}Tôi bám vào thành giếng, cúi xuống.',
      sfx: [['heartbeat', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { gieng(k, { time: 'night' }); ch(k, GI.left - 100 + k.at('a', 4, 'linear') * 40, 985, 330, { ...NHIM, view: 'side', action: k.t < 4 ? 'walk' : 'stand', face: 'fear', arms: 'down' }); dimWell(k, 0.88, [{ x: 760, y: 760, r: 460 }]); return; }
        soi(k, { moon: 0 });
      },
    },
    {
      say: '{a}Có ánh sáng rọi ngược lên mặt tôi. {b}Tận đáy giếng, có một vầng trăng tròn, trắng, bé bằng cái đĩa. {c}Tôi ngẩng lên trời. Đen kịt. {d}Tôi cúi xuống. Trăng vẫn ở đó.',
      sfx: [['stinger', 'b', 0.4], ['wind', 'c', 0.3], ['heartbeat', 'd', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, NHIM, { face: 'fear', arms: 'down', moon: k.at('a', 2) }); return; }
        if (k.t < k.cue('c')) { soi(k, { moon: M1 }); return; }
        if (k.t < k.cue('d')) { black(k, '#06080e'); shade(k, 0.2, [], { vig: 0.5 }); return; }
        soi(k, { moon: M1 });
      },
    },
    {
      say: '{a}Rồi tôi thấy một cái bóng nhỏ đang ngồi trên vầng trăng ấy, quay lưng lại. {b}Và từ dưới sâu, một giọng đàn ông cất lên, rất chậm: {q}ông giẳng, ông giăng, xuống chơi với tôi. {c}Tôi không nhớ mình đã về nhà bằng cách nào.',
      sfx: [['drip', 'b', 0.3], ['stinger', 'q', 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) { zoom(k, 960, 540, 1 + k.at('a', 9, 'linear') * 0.5, () => soi(k, { moon: M1, who: k.at('a', 1.5) })); quote(k, '"Ông giẳng, ông giăng, xuống chơi với tôi."', 'q', { color: COLD, size: 56 }); return; }
        black(k); 
      },
    },
    {
      say: '{a}Sáng hôm sau, người làng vẫn ra giếng gánh nước như mọi ngày. Không ai thấy gì lạ. {b}Bà nội sờ tóc tôi, ngửi, rồi hỏi: {q}đêm qua mày ra giếng à? Người mày có mùi nước giếng. Tôi chối. {c}Tối hôm ấy, tôi không dám nhìn vào bát nước trên bàn.',
      sfx: [['drip', 'c', 0.35], ['heartbeat', 'c', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { gieng(k, { time: 'day' }); ch(k, 1440, 985, 470, { ...HANG_XOM[1], view: 'side', flip: true, face: 'calm', arms: 'hold' }); ch(k, 620, 985, 470, { ...HANG_XOM[3], view: 'side', face: 'calm', arms: 'hold' }); dimDay(k); return; }
        if (k.t < k.cue('c')) { phong3(k); baNgoi(k, { face: 'calm', arms: 'point', talk: 0.4 }); ch(k, 1270, 960, 340, { ...NHIM, view: 'side', face: 'fear', arms: 'down' }); dimIn(k); quote(k, '"Người mày có mùi nước giếng."', 'q', { color: COLD, size: 56 }); return; }
        black(k, '#2a1e14'); matNuoc(k, 960, 540, 380, { rim: '#d8d0bc', moon: 0 }); shade(k, 0.35, [{ x: 960, y: 540, r: 720, warm: 1, flicker: 1 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Tháng Tám năm ấy thiếu, không có đêm ba mươi. Tôi đếm từng tờ lịch. {b}Càng đếm, tôi càng bớt sợ. Vì có một điều cứ lởn vởn trong đầu tôi. {c}Cái giọng ấy, tôi đã nghe ở đâu rồi.',
      sfx: [['scratch', 'a', 0.2], ['heartbeat', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) { lich(k, 29, 'THÁNG TÁM · THÁNG THIẾU'); shade(k, 0.35, [{ x: 960, y: 500, r: 780, warm: 1 }], { vig: 0.6 }); return; }
        mat(k, NHIM, { face: 'blank', arms: 'down', warm: 0.6 }); quote(k, 'Cái giọng ấy, tôi đã nghe ở đâu rồi.', 'c', { color: AMBER, size: 56 });
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      chapter: 'Hai câu hát của bố',
      say: '{a}Đêm ba mươi tháng Chín. Mẹ đi rồi về, y như lần trước. Tôi ra giếng. {b}Vầng trăng đã lên cao hơn, to bằng cái mâm, lơ lửng ở lưng chừng giếng. {c}Tôi cúi xuống, hát khẽ, như để thử: {q}ông giẳng, ông giăng.',
      sfx: [['stinger', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { gieng(k, { time: 'night' }); dimWell(k, 0.88); giengSang(k, 0.25); chapter(k, 3, 'Hai Câu Hát Của Bố'); tag(k, 'ĐÊM BA MƯƠI THÁNG CHÍN', 'a'); return; }
        soi(k, { moon: M1 + k.at('b', 2.5) * (M2 - M1), who: 1 }); quote(k, '"Ông giẳng, ông giăng."', 'q', { color: PAPER, size: 60 });
      },
    },
    {
      say: '{a}Dưới giếng im bặt. Cái bóng không nhúc nhích. {b}Rồi giọng ấy hát tiếp, từng tiếng, từng tiếng: xuống chơi với tôi, có bầu có bạn, có ván cơm xôi. {c}Tôi nín thở. {d}Có cái Nhím con. {e}Ngồi trên vai bố.',
      sfx: [['heartbeat', 'c', 0.4], ['stinger', 'e', 0.5]],
      draw(k) {
        zoom(k, 960, 540, 1 + k.at('a', 14, 'linear') * 0.32, () => soi(k, { moon: M2, who: 1 }));
        quote(k, 'Có cái Nhím con.', 'd', { color: AMBER, size: 76, y: 880 }); quote(k, 'Ngồi trên vai bố.', 'e', { color: AMBER, size: 76, y: 975 });
      },
    },
    {
      say: '{a}Tôi ngồi thụp xuống chân giếng. Hai câu ấy, cả làng không ai biết. Mẹ tôi cũng không biết, vì bố chỉ hát lúc hai bố con ở ngoài giếng. {b}Bố tôi đang ở nước Nga. Thư vẫn về đều. {c}Vậy thì ai đang ngồi dưới ấy?',
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, NHIM, { face: 'shock', arms: 'cover', moon: 0.7 }); return; }
        if (k.t < k.cue('c')) { black(k, '#1a130d'); phong(k, 960, 500, 1.8, { r: -0.03 }); shade(k, 0.35, [{ x: 960, y: 500, r: 860, warm: 1 }], { vig: 0.6 }); return; }
        soi(k, { moon: M2, who: 1 }); quote(k, 'Vậy thì ai đang ngồi dưới ấy?', 'c', { color: COLD, size: 62 });
      },
    },
    {
      say: '{a}Đến đây, nếu là bạn, mười hai tuổi, nghe giọng bố mình vọng lên từ đáy giếng, bạn có dám đáp lại không? Hãy để lại câu trả lời của bạn. {b}Vì chỉ một tháng sau, tôi đã đáp.',
      draw(k) { gieng(k, { time: 'night' }); dimWell(k, 0.9); giengSang(k, 0.4); quote(k, 'Nếu là bạn, bạn có dám đáp lại không?', 'a', { color: PAPER, size: 60 }); },
    },
    {
      say: '{a}Tôi quyết định viết thư cho bố. Tôi chỉ muốn hỏi một câu: bố có còn sống không? {b}Nhưng tôi không có địa chỉ. Mọi thư từ đều qua tay chú Mạnh. {c}Hôm mẹ đi vắng, tôi lấy chìa khoá, mở cái hòm tôn mẹ vẫn khoá kỹ dưới gầm giường.',
      sfx: [['click', 'c', 0.4], ['creak', ['c', 1.2], 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) { phong3(k); ch(k, 760, 1000, 360, { ...NHIM, action: 'sit', view: 'side', face: 'sad', arms: 'hold' }); dimIn(k, 0.5, [{ x: 800, y: 720, r: 500, warm: 1 }]); return; }
        black(k, '#1e1610'); homTon(k, 960, 960, 1.7); shade(k, 0.4, [{ x: 960, y: 560, r: 760, warm: 1 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Trong hòm là sáu lá thư cũ, phong bì dán tem Liên Xô, từ năm 1989 đến năm 1991. Đúng chữ bố, nghiêng nghiêng. {b}Cuối mỗi lá, ở góc dưới, có ba lỗ thủng nhỏ xíu, như mọt đục. Tôi không để ý. {c}Vì dưới đáy hòm, còn một quyển vở học trò.',
      draw(k) {
        if (k.t < k.cue('b')) { black(k, '#1a130d'); for (let i = 0; i < 6; i++) phong(k, 420 + (i % 3) * 540, 320 + Math.floor(i / 3) * 420, 0.82, { r: -0.06 + i * 0.03 }); shade(k, 0.3, [{ x: 960, y: 520, r: 1000, warm: 1 }], { vig: 0.6 }); return; }
        if (k.t < k.cue('c')) { THUC(k, { y: 160, s: 1.65, holes: true }); shade(k, 0.3, [{ x: 1300, y: 800, r: 800, warm: 1 }], { vig: 0.6 }); return; }
        black(k, '#1e1610'); homTon(k, 960, 960, 1.7, { letters: false }); shade(k, 0.55, [{ x: 960, y: 620, r: 560, warm: 1 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Tôi mở ra. Trang nào cũng kín chữ. Từng dòng, từng dòng, chỉ một câu: {q}kính thưa mẹ, con ở bên này vẫn khoẻ. {b}Những dòng đầu nét run run, vụng về. Càng về sau, nét càng nghiêng dần, càng giống. {c}Đến trang cuối, giống hệt chữ bố tôi. {d}Đó là chữ của mẹ tôi.',
      sfx: [['scratch', 'a', 0.25], ['stinger', 'd', 0.5]],
      draw(k) { vo(k, { p: k.at('a', Math.max(6, k.cue('c') - k.cue('a')), 'linear') }); shade(k, 0.25, [{ x: 960, y: 540, r: 1100, warm: 1 }], { vig: 0.55 }); quote(k, 'Đó là chữ của mẹ tôi.', 'd', { color: AMBER, size: 74 }); },
    },
    {
      say: '{a}Mười một lá thư tôi đọc cho bà suốt năm năm nay, là mẹ tôi viết. Từ năm 1992, bố tôi không còn viết một chữ nào. {b}Tôi ngồi dưới gầm giường, ghép từng thứ lại với nhau. Chú Mạnh. Những chuyến đi trước khi trời sáng. Đốm đỏ đầu điếu thuốc bên miệng giếng. Giọng bố tôi dưới đáy giếng. {c}Năm ấy tôi mười hai tuổi, và tôi chỉ nghĩ ra được một câu: {q}mẹ tôi và chú Mạnh đã giết bố, rồi thả bố xuống giếng.',
      sfx: [['heartbeat', 'b', 0.4], ['stinger', 'q', 0.5]],
      draw(k) {
        if (k.t < k.cue('b')) { black(k, '#1a130d'); for (let i = 0; i < 11; i++) thu(k, 250 + (i % 6) * 285 + (i > 5 ? 140 : 0), 330 + Math.floor(i / 6) * 420, 0.44, { r: -0.08 + (i % 4) * 0.05 }); shade(k, 0.3, [{ x: 960, y: 520, r: 1000, warm: 1 }], { vig: 0.6 }); return; }
        if (k.t < k.cue('c')) { mat(k, NHIM, { face: 'fear', arms: 'chest', warm: 0.6, bg: '#0d0c12' }); return; }
        soi(k, { moon: 0 }); quote(k, 'Mẹ tôi và chú Mạnh đã giết bố, rồi thả bố xuống giếng.', 'q', { color: AMBER, size: 54 });
      },
    },
    {
      say: '{a}Tôi không dám nói với ai. Từ hôm đó, tôi không ăn cơm mẹ nấu. Mẹ gắp thức ăn vào bát, tôi gạt ra. {b}Mẹ nhìn tôi, không hỏi gì. Mẹ chỉ kéo tay áo xuống, rồi quay đi.',
      draw(k) { phong3(k, { chieu: true, bed: false }); mam(k, 960, 960, 1); ch(k, 650, 985, 340, { ...NHIM, action: 'sit', view: 'side', face: 'angry', arms: 'down' }); ch(k, 1300, 990, 470, { ...ME_N, action: 'sit', view: 'side', flip: true, face: after(k, 'b') ? 'sad' : 'calm', arms: 'hold' }); dimIn(k, 0.58, [{ x: 960, y: 700, r: 620, warm: 1, flicker: 1 }]); },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Câu đáp',
      say: '{a}Đêm ba mươi tháng Mười. Vầng trăng đã lên rất gần, chỉ còn cách miệng giếng chừng ba sải tay. {b}Cái bóng ngồi trên đó, giờ tôi nhìn rõ: một người đàn ông, đầu đội mũ lông, đúng như trong tấm ảnh trên tường nhà tôi. {c}Giọng ấy hát đến câu: có cái Nhím con. Rồi ngừng lại. {d}Nó đợi.',
      sfx: [['stinger', 'a', 0.35], ['heartbeat', 'd', 0.5]],
      draw(k) {
        soi(k, { moon: M2 + k.at('a', 3) * (M3 - M2), who: 1 }); if (k.t > 3.2) tag(k, 'ĐÊM BA MƯƠI THÁNG MƯỜI', 0); chapter(k, 4, 'Câu Đáp');
        quote(k, 'Nó đợi.', 'd', { color: COLD, size: 84 });
      },
    },
    {
      say: '{a}Tôi nhớ lời bà dặn. Tôi nhớ rất rõ. {b}Nhưng tám năm rồi, tôi không có bố. Tôi khóc, và tôi hát đáp: {q}ngồi trên vai bố.',
      sfx: [['heartbeat', 'b', 0.45]],
      draw(k) { mat(k, NHIM, { face: 'cry', tears: k.at('b', 2), arms: 'chest', moon: 1, talk: after(k, 'q') ? 0.6 : 0 }); quote(k, '"Ngồi trên vai bố."', 'q', { color: AMBER, size: 76 }); },
    },
    {
      say: '{a}Không có tiếng gì cả. Giọng ấy không hát tiếp. {b}Chỉ có tiếng nước dưới đáy giếng, khẽ sóng sánh, như có ai vừa cựa mình. {c}Rồi vầng trăng mờ dần, tắt hẳn. Tôi đứng một mình bên cái giếng tối đen.',
      sfx: [['drip', 'b', 0.45], ['drip', ['b', 0.9], 0.35], ['wind', 'c', 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) { soi(k, { moon: M3, who: 1 }); return; }
        soi(k, { moon: M3, who: 1 }); k.ctx.fillStyle = `rgba(4,4,8,${k.at('c', 4, 'inOut')})`; k.ctx.fillRect(-200, -200, 2400, 1500); quote(k, 'Tôi đứng một mình bên cái giếng tối đen.', k.cue('c', 3), { color: COLD, size: 58 });
      },
    },
    {
      say: '{a}Từ đêm ấy, tôi ốm. Sốt li bì suốt mấy ngày. Mẹ đắp khăn ướt lên trán tôi, tưởng tôi mê sảng, vì tôi cứ lẩm bẩm mãi hai câu hát. {b}Đêm nào tôi cũng mơ thấy nước. Mơ thấy mình ngồi trên vai bố, nhìn xuống một cái giếng sâu hun hút, mà đáy giếng sáng như có trăng. {c}Có thể là sốt. Mẹ bảo là sốt.',
      sfx: [['drip', 'b', 0.35], ['heartbeat', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, NHIM, { face: 'sleep', arms: 'down', warm: 0.7 }); return; }
        black(k, '#0c0a08'); matNuoc(k, 960, 540, 470, { rim: '#5c4636', moon: 70 }); shade(k, 0.5, [{ x: 960, y: 540, r: 760 }], { vig: 0.6 }); cold(k, 0.6); quote(k, 'Mẹ bảo là sốt.', 'c', { color: COLD, size: 60 });
      },
    },
    {
      say: '{a}Bà nội ngồi bên giường, nghe tôi lẩm bẩm hai câu hát. Tay bà run lên. {q}Mày đáp rồi phải không? {b}Tôi oà khóc, gật đầu, rồi nhớ ra bà không nhìn thấy, tôi nói: dạ. {c}Bà bảo: thứ dưới giếng ấy hát bằng giọng người mình nhớ nhất. {d}Đáp rồi là nhận lời. Tháng Một năm nay lại thiếu, vậy đêm ba mươi tới là đêm ba mươi Tết. {e}Đêm ấy, nó đến đón.',
      sfx: [['heartbeat', 'q', 0.4], ['stinger', 'e', 0.5]],
      draw(k) {
        phong3(k); baNgoi(k, { face: 'fear', arms: 'point', talk: after(k, 'c') ? 0.5 : 0 }); ch(k, 1290, 960, 340, { ...NHIM, view: 'side', face: after(k, 'b') ? 'cry' : 'fear', tears: k.at('b', 2), arms: 'chest' }); dimIn(k);
        quote(k, '"Mày đáp rồi phải không?"', 'q', { color: COLD, size: 58, until: 'c' }); quote(k, 'Đêm ba mươi Tết, nó đến đón.', 'e', { color: AMBER, size: 62 });
      },
    },
    {
      say: '{a}Từ hôm đó, bà bắt tôi ngủ chung giường. Bà lấy một sợi chỉ đỏ, buộc cổ tay tôi vào cổ tay bà. {b}Có đêm tôi hỏi: bà ơi, bố con có còn sống không? {c}Bà im rất lâu. Bàn tay bà miết nhẹ trên cổ tay tôi. Rồi bà bảo: {q}bố mày ở Nga. Thư vẫn về đều đấy thôi.',
      draw(k) { chiDo(k); shade(k, 0.35, [{ x: 960, y: 540, r: 900, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, '"Bố mày ở Nga. Thư vẫn về đều đấy thôi."', 'q', { color: PAPER, size: 56 }); },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Đêm ba mươi Tết',
      say: '{a}Ba mươi Tết năm Đinh Sửu. Năm ấy đã cấm pháo mấy năm rồi, làng tôi im phăng phắc. {b}Mẹ tôi sốt từ chiều, vẫn cố canh nồi bánh chưng. Chú Mạnh đến, đưa lá thư thứ mười hai, rồi về. {c}Đêm xuống. Bà siết sợi chỉ đỏ thật chặt, bảo tôi ngủ đi.',
      sfx: [['wind', 0, 0.25]],
      draw(k) {
        if (k.t < k.cue('c')) { sanNha(k, { time: 'night', moon: false }); noiBanh(k, 900, 1000, 1); ch(k, 560, 990, 470, { ...ME_N, action: 'sit', view: 'side', face: 'sad', arms: 'hold' }); shade(k, 0.74, [{ x: 860, y: 860, r: 620, warm: 1, flicker: 1 }], { vig: 0.55 }); chapter(k, 5, 'Đêm Ba Mươi Tết'); return; }
        chiDo(k); shade(k, 0.55, [{ x: 960, y: 540, r: 700, warm: 1, flicker: 1 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Tôi không nhớ mình đã dậy thế nào. Tôi chỉ nhớ có tiếng hát, rất nhỏ, như vọng từ xa lắm. {b}Lúc tỉnh ra, tôi đã đứng ở đầu làng, chân trần. {c}Sợi chỉ đỏ đứt ở cổ tay.',
      sfx: [['drip', 'a', 0.35], ['wind', 'b', 0.35], ['stinger', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { black(k, '#0c0a08'); matNuoc(k, 960, 540, 470, { rim: '#5c4636', moon: 90 + k.at('a', 6, 'linear') * 60 }); shade(k, 0.5, [{ x: 960, y: 540, r: 760 }], { vig: 0.6 }); return; }
        chiDo(k, { broken: true }); shade(k, 0.5, [{ x: 960, y: 540, r: 800 }], { vig: 0.6 }); cold(k, 0.55);
      },
    },
    {
      say: '{a}Cái giếng sáng rực. Vầng trăng đã dâng lên tận miệng giếng, tròn vừa khít, như một cái mâm bạc đặt trên thành đá. {b}Cái bóng ngồi đó, quay lưng lại tôi. Nó từ từ giơ một cánh tay lên, như ngày xưa bố giơ tay đỡ tôi lên vai. {c}Giọng ấy gọi: {q}xuống chơi với bố.',
      sfx: [['stinger', 'a', 0.45], ['heartbeat', 'b', 0.5], ['stinger', 'q', 0.55]],
      draw(k) {
        if (k.t < k.cue('b')) { gieng(k, { time: 'night' }); shade(k, 0.72, [{ x: GI.x, y: 700, r: 820 }], { vig: 0.5 }); giengSang(k, 1, 1); return; }
        soi(k, { moon: M4, who: 1, raise: 0.5 + k.at('b', 3) * 0.6 }); quote(k, '"Xuống chơi với bố."', 'q', { color: COLD, size: 80 });
      },
    },
    {
      say: '{a}Tôi không sợ nữa. Tôi nhớ đôi vai ấy đã tám năm rồi. Tôi bước tới. Một bước. Hai bước. {b}Rồi có ai đó giật mạnh tôi lại từ phía sau, ngã sấp xuống đất. {c}Là mẹ tôi.',
      sfx: [['heartbeat', 'a', 0.45], ['whoosh', 'b', 0.5], ['stinger', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, NHIM, { face: 'blank', arms: 'down', moon: 1 }); return; }
        gieng(k, { time: 'night' }); ch(k, 470, 985, 480, { ...ME_N, view: 'side', face: 'shock', arms: 'hold' }); ch(k, 340, 1000, 330, { ...NHIM, view: 'side', face: 'shock', arms: 'chest' }); shade(k, 0.72, [{ x: 620, y: 720, r: 760 }], { vig: 0.5 }); giengSang(k, 0.85, 1);
      },
    },
    {
      say: '{a}Mẹ ôm chặt lấy tôi, người nóng hầm hập. Rổ xôi đổ tung dưới chân. Tôi gào lên: bố đang gọi con kìa! {b}Mẹ nhìn về phía giếng. Mẹ nhìn rất lâu. Rồi mẹ quay sang tôi, thảng thốt: {q}có gì đâu con? Tối om. {c}Vầng trăng vẫn sáng rực trước mắt tôi. Mà mẹ tôi không thấy gì cả.',
      sfx: [['heartbeat', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { gieng(k, { time: 'night' }); ch(k, 560, 985, 480, { ...ME_N, view: 'side', face: after(k, 'b') ? 'fear' : 'cry', arms: 'chest', talk: after(k, 'q') ? 0.5 : 0 }); ch(k, 400, 1000, 330, { ...NHIM, view: 'side', face: 'cry', arms: 'point' }); roXoi(k, 720, 1020, 0.8); shade(k, 0.8, [{ x: 520, y: 740, r: 600, warm: 1 }], { vig: 0.5 }); quote(k, '"Có gì đâu con? Tối om."', 'q', { color: PAPER, size: 58 }); return; }
        gieng(k, { time: 'night' }); shade(k, 0.72, [{ x: GI.x, y: 700, r: 820 }], { vig: 0.5 }); giengSang(k, 1, 1);
      },
    },
    {
      say: '{a}Tôi vùng ra. Tôi hét vào mặt mẹ tất cả những gì đã giấu suốt ba tháng: quyển vở, mười một lá thư, chú Mạnh. {q}Mẹ giết bố con rồi thả xuống đây, phải không? {b}Mẹ đứng im, không cãi một lời. {c}Mẹ chỉ từ từ xắn tay áo lên.',
      sfx: [['stinger', 'q', 0.45], ['heartbeat', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, NHIM, { face: 'cry', tears: 1, arms: 'chest', talk: 0.8, moon: 0.45 }); quote(k, '"Mẹ giết bố con rồi thả xuống đây, phải không?"', 'q', { color: AMBER, size: 54 }); return; }
        if (k.t < k.cue('c')) { mat(k, ME_N, { face: 'blank', arms: 'down', warm: 0.5 }); return; }
        tayKim(k, { p: k.at('c', 3, 'inOut') * 0.45 }); shade(k, 0.35, [{ x: 900, y: 540, r: 900 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Hai khuỷu tay mẹ chi chít vết kim, vết cũ chồng lên vết mới, thâm tím. {b}Mẹ bảo: {q}tiền bố gửi về đấy con. {c}Gần sáu năm nay, mẹ bán máu ở bệnh viện tỉnh. Chú Mạnh đèo mẹ đi, vì mẹ không tự về nổi.',
      sfx: [['stinger', 'q', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { tayKim(k, { p: 1 }); shade(k, 0.3, [{ x: 900, y: 540, r: 900 }], { vig: 0.6 }); quote(k, '"Tiền bố gửi về đấy con."', 'q', { color: AMBER, size: 70 }); return; }
        benhVien(k); ch(k, 960, 815, 440, { ...ME_N, action: 'sit', face: 'sleep', arms: 'chest' }); ch(k, 1230, 900, 480, { ...MANH, view: 'side', flip: true, face: 'sad', arms: 'down' }); shade(k, 0.42, [{ x: 960, y: 500, r: 860 }], { vig: 0.5 }); cold(k, 0.45);
      },
    },
    {
      say: '{a}Mẹ quỳ xuống bên thành giếng, thò tay vào trong, lay viên đá ong lung lay năm xưa. Viên đá rời ra. Sau đó là một cái hốc. {b}Mẹ lấy ra một cái hũ sành nhỏ, miệng niêm sáp đỏ, đặt vào tay tôi. Hũ nhẹ lắm. {c}Mẹ bảo: {q}bố đây con.',
      sfx: [['scratch', 'a', 0.35], ['stinger', 'q', 0.5]],
      draw(k) {
        if (k.t < k.cue('b')) { thanhGieng(k, { open: k.at(k.cue('a', 3.5), 1.6, 'inOut'), hu: true }); shade(k, 0.42, [{ x: 960, y: 450, r: 680 }], { vig: 0.6 }); return; }
        black(k, '#100c0a'); hu(k, 960, 860, 3.6); banTay(k, 455, 720, 1.05, 0.08, '#ecc8a4', { sleeve: '#a8796a', cuff: 170 }); banTay(k, 1465, 720, 1.05, Math.PI - 0.08, '#ecc8a4', { sleeve: '#a8796a', cuff: 170 }); shade(k, 0.35, [{ x: 960, y: 620, r: 700 }], { vig: 0.6 }); quote(k, '"Bố đây con."', 'q', { color: AMBER, size: 84 });
      },
    },
    {
      say: '{a}Mùa đông năm 1991, bố tôi mất ở bên Nga vì viêm phổi. Chú Mạnh mang tro bố về, giữa đêm, tháng Ba năm sau. {b}Đúng hôm ấy bà nội vừa qua cơn tai biến. Bác sĩ dặn, bà không chịu thêm được một cú sốc nào. Bà chỉ còn cố sống để đợi thằng Út về. {c}Mẹ lấy sáu lá thư cũ của bố ra, tập viết theo, suốt một mùa hè. Mẹ định giấu qua một năm. Rồi hai năm. Rồi gần sáu năm.',
      sfx: [['wind', 'a', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { tuyet(k); shade(k, 0.45, [{ x: 960, y: 500, r: 900 }], { vig: 0.55 }); cold(k, 0.5); tag(k, 'MÙA ĐÔNG 1991', 'a'); return; }
        if (k.t < k.cue('c')) { phong3(k); baNgoi(k, { face: 'sleep', arms: 'down', lean: 8 }); ch(k, 1250, 985, 480, { ...ME_N, view: 'side', face: 'cry', tears: 0.8, arms: 'cover' }); dimIn(k); cold(k, 0.4); return; }
        vo(k, { p: 0.4 + k.at('c', 9, 'linear') * 0.6 }); shade(k, 0.4, [{ x: 960, y: 540, r: 900, warm: 1, flicker: 1 }], { vig: 0.55 });
      },
    },
    {
      say: '{a}Mẹ không dám lập bàn thờ. Bà loà, nhưng ngày nào cũng tự tay lau bàn thờ, sờ từng bát hương. Thêm một bát, bà biết ngay. {b}Trước lúc mất, bố dặn chú Mạnh: đưa tôi về giếng làng, chỗ tôi cõng con bé đi soi trăng. {c}Nên đêm cuối tháng nào, lúc không ai dám ra giếng, mẹ cũng ra đây, đặt một nắm xôi, thắp một nén hương. {d}Cái đốm đỏ tôi nhìn thấy, là đầu nén hương ấy. {e}Còn thư, mẹ viết được, nhưng không đọc nổi: đọc đến câu con vẫn khoẻ là mẹ khóc. Nên mẹ giao cho tôi đọc.',
      draw(k) {
        if (k.t < k.cue('b')) { phong3(k); ch(k, 1030, 900, 400, { ...BA_N, face: 'sleep', arms: 'hold' }); dimIn(k, 0.48, [{ x: 1030, y: 300, r: 500, warm: 1 }]); return; }
        if (k.t < k.cue('c')) { gieng(k, { time: 'dusk' }); cong(k, 560, 1000, 620, { talk: 0 }); shade(k, 0.42, [{ x: 620, y: 560, r: 900, warm: 1 }], { vig: 0.5 }); cold(k, 0.6); return; }
        if (k.t < k.cue('e')) { black(k, '#0a0908'); roXoi(k, 720, 820, 2); huong(k, 1180, 500, 2.4); shade(k, 0.5, [{ x: 960, y: 620, r: 660, warm: 1, flicker: 1 }], { vig: 0.6 }); return; }
        THUC(k, {}); shade(k, 0.4, [{ x: 960, y: 500, r: 820, warm: 1, flicker: 1 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Tôi đứng ôm cái hũ, không nói được. Mẹ hỏi, giọng rất khẽ: {q}con vừa nghe thấy gì? Tôi bảo: bố hát. {b}Mẹ tôi bật khóc. Gần sáu năm, tôi chưa thấy mẹ khóc lần nào. {c}Mẹ bảo: gần sáu năm mẹ ra đây, chưa một lần thấy trăng, chưa một lần nghe được một tiếng nào. {d}Bố hát thế nào, con hát lại cho mẹ nghe với.',
      draw(k) {
        if (k.t < k.cue('b')) { gieng(k, { time: 'night' }); ch(k, 560, 985, 480, { ...ME_N, view: 'side', face: 'sad', arms: 'chest', talk: 0.4 }); ch(k, 760, 1000, 330, { ...NHIM, view: 'side', flip: true, face: 'blank', arms: 'hold' }); shade(k, 0.72, [{ x: 660, y: 760, r: 620 }], { vig: 0.5 }); giengSang(k, 0.8, 1); return; }
        mat(k, ME_N, { face: 'cry', tears: 1, arms: 'chest', warm: 0.6, talk: after(k, 'c') ? 0.4 : 0 }); quote(k, 'Bố hát thế nào, con hát lại cho mẹ nghe với.', 'd', { color: AMBER, size: 58 });
      },
    },
    {
      say: '{a}Nhưng tiếng gọi chưa dứt. {q}Xuống đây với bố. Tôi run bần bật, bảo mẹ: bố gọi con xuống. {b}Mẹ đứng dậy, loạng choạng đi đến sát thành giếng, nói vào cái giếng tối đen trong mắt mẹ: {r}anh ơi, con còn bé. Anh muốn gọi ai thì gọi em. Em xuống. Em mệt lắm rồi.',
      sfx: [['stinger', 'q', 0.45], ['heartbeat', 'r', 0.5]],
      draw(k) {
        if (k.t < k.cue('b')) { soi(k, { moon: M4, who: 1, raise: 1 }); quote(k, '"Xuống đây với bố."', 'q', { color: COLD, size: 76 }); return; }
        gieng(k, { time: 'night' }); ch(k, GI.left - 10, 985, 480, { ...ME_N, view: 'side', face: 'cry', tears: 1, arms: 'chest', talk: after(k, 'r') ? 0.5 : 0 }); shade(k, 0.74, [{ x: 760, y: 700, r: 620 }], { vig: 0.5 }); giengSang(k, 0.85, 1); quote(k, '"Anh muốn gọi ai thì gọi em."', 'r', { color: AMBER, size: 60 });
      },
    },
    {
      say: '{a}Giếng lặng đi rất lâu. {b}Rồi giọng ấy lại cất lên, nhỏ và khàn, như người đã hát suốt mấy chục năm: {q}ông giẳng ông giăng, đừng xuống với tôi. {c}Có bầu có bạn, có mẹ có bà. {d}Có cái Nhím con. {e}Ở lại với mẹ.',
      lead: 1.2,
      sfx: [['wind', 'a', 0.25], ['sparkle', 'e', 0.25]],
      draw(k) {
        soi(k, { moon: M4, who: 1 - k.at('e', 2) * 0.4 }); quote(k, '"Ông giẳng ông giăng, đừng xuống với tôi."', 'q', { color: COLD, size: 58, until: 'd' });
        quote(k, 'Có cái Nhím con.', 'd', { color: AMBER, size: 76, y: 880 }); quote(k, 'Ở lại với mẹ.', 'e', { color: AMBER, size: 76, y: 975 });
      },
    },
    {
      say: '{a}Vầng trăng từ từ chìm xuống, nhỏ dần, nhỏ dần, rồi tắt. Giếng tối đen. {b}Từ ngôi chùa cuối làng, tiếng chuông giao thừa vọng đến. {c}Tôi ngồi xuống cạnh mẹ, và hát lại cho mẹ nghe, từng câu một. Mẹ ôm cái hũ, nghe đến hết.',
      sfx: [['gong', 'b', 0.4], ['gong', ['b', 3], 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { soi(k, { moon: Math.max(0, M4 * (1 - k.at('a', Math.max(3, k.cue('b') - 0.8), 'inOut'))), who: 1 - k.at('a', 2) }); return; }
        if (k.t < k.cue('c')) { black(k, '#07080e'); chuong(k, 960, 260, 1.3, (k.t * 0.4) % 1); shade(k, 0.5, [{ x: 960, y: 560, r: 720, warm: 1 }], { vig: 0.6 }); return; }
        gieng(k, { time: 'night' }); ch(k, 700, 985, 460, { ...ME_N, action: 'sit', view: 'side', flip: true, face: 'cry', tears: 0.6, arms: 'hold' }); ch(k, 500, 1000, 320, { ...NHIM, action: 'sit', view: 'side', face: 'sad', arms: 'hold', talk: 0.4 }); hu(k, 760, 880, 0.7); shade(k, 0.72, [{ x: 620, y: 780, r: 620, warm: 1 }], { vig: 0.5 });
      },
    },

    // ===== CHƯƠNG 6 =====
    {
      chapter: 'Ba lỗ kim',
      say: '{a}Sáng mùng Một, bà nội yếu hẳn đi. Mẹ đưa tôi lá thư thứ mười hai, mắt sưng húp, gật đầu: đọc đi con, như mọi năm. {b}Tôi ngồi xuống cạnh giường. Giọng tôi run: {q}kính thưa mẹ, con ở bên này vẫn khoẻ.',
      draw(k) { phong3(k); baNgoi(k, { arms: 'down', lean: 6 }); ch(k, 1270, 960, 340, { ...NHIM, view: 'side', face: 'sad', arms: 'hold', talk: after(k, 'q') ? 0.5 : 0 }); ch(k, 960, 985, 480, { ...ME_N, view: 'side', face: 'sad', arms: 'chest' }); shade(k, 0.42, [DAY], { vig: 0.5 }); chapter(k, 6, 'Ba Lỗ Kim'); quote(k, '"Kính thưa mẹ, con ở bên này vẫn khoẻ."', 'q', { size: 52 }); },
    },
    {
      say: '{a}Bà giơ tay lên: {q}thôi. Đưa đây. {b}Bà cầm lá thư, miết ngón tay cái dọc mép dưới, từ đầu này sang đầu kia, như mọi lần. {c}Rồi bà quay mặt về phía mẹ tôi, hỏi rất nhẹ: {r}gần sáu năm rồi, mỏi tay chưa con?',
      lead: 0.8,
      sfx: [['heartbeat', 'c', 0.4], ['stinger', 'r', 0.5]],
      draw(k) {
        if (k.t < k.cue('c')) { THUC(k, { y: 240, s: 1.5 }); const p = k.at('b', 5, 'inOut'); ngonTay(k, 620 + p * 640, 870); shade(k, 0.3, [{ x: 960, y: 800, r: 900, warm: 1 }], { vig: 0.6 }); return; }
        mat(k, BA_N, { face: 'sleep', arms: 'hold', talk: after(k, 'r') ? 0.4 : 0, warm: 1 }); quote(k, '"Gần sáu năm rồi, mỏi tay chưa con?"', 'r', { color: AMBER, size: 66 });
      },
    },
    {
      say: '{a}Mẹ tôi khuỵu xuống. Bà nói rất chậm. Thằng Út biết mẹ mù. Từ lá thư đầu tiên, cuối thư nó luôn châm ba lỗ kim cho mẹ sờ. {b}Một lỗ cho anh cả nó. Một lỗ cho anh hai nó. Một lỗ cho nó. {c}Ý nó bảo: ba anh em con vẫn đủ, mẹ ạ. {d}Mười một lá thư này, mẹ sờ mãi, không có lỗ nào. {e}Mà thư từ nước Nga gì, lại thơm mùi khói rơm bếp nhà mình.',
      sfx: [['click', 'b', 0.3], ['click', ['b', 1.6], 0.3], ['click', ['b', 3.2], 0.3]],
      draw(k) {
        if (k.t < k.cue('d')) { THUC(k, { y: 160, s: 1.65, holes: true, ring: k.at('b', 1) }); shade(k, 0.28, [{ x: 1300, y: 800, r: 860, warm: 1 }], { vig: 0.6 }); quote(k, '"Ba anh em con vẫn đủ, mẹ ạ."', 'c', { color: AMBER, size: 60, y: 985 }); return; }
        if (k.t < k.cue('e')) { THUC(k, { y: 160, s: 1.65 }); shade(k, 0.28, [{ x: 1300, y: 800, r: 860, warm: 1 }], { vig: 0.6 }); return; }
        phong3(k); baNgoi(k, { talk: 0.4, arms: 'chest', face: 'sleep' }); ch(k, 1250, 900, 400, { ...ME_N, action: 'kneel', view: 'side', face: 'cry', tears: 1, arms: 'cover' }); dimIn(k, 0.5); quote(k, 'Thư từ nước Nga gì, lại thơm mùi khói rơm bếp nhà mình.', 'e', { size: 52 });
      },
    },
    {
      say: '{a}Mẹ tôi gục vào mép giường: mẹ biết từ bao giờ? {b}Bà bảo: {q}từ lá đầu tiên. {c}Mẹ tôi nấc lên: sao mẹ không nói? {d}Bà lần tay tìm mặt con dâu: {r}con giấu để mẹ sống. Mẹ giả vờ tin, để con còn có cớ mà gắng sống. {e}Hai mẹ con mình, đứa nào cũng sợ đứa kia chết trước.',
      draw(k) { phong3(k); baNgoi(k, { talk: after(k, 'b') ? 0.4 : 0, arms: after(k, 'd') ? 'point' : 'chest', flip: true }); ch(k, 1300, 900, 400, { ...ME_N, action: 'kneel', view: 'side', face: 'cry', tears: 1, arms: 'chest' }); dimIn(k, 0.5); quote(k, '"Từ lá đầu tiên."', 'q', { color: AMBER, size: 64, until: 'c' }); quote(k, 'Hai mẹ con mình, đứa nào cũng sợ đứa kia chết trước.', 'e', { color: AMBER, size: 54 }); },
    },
    {
      say: '{a}Bà luồn tay xuống gối, rút ra mười một lá thư đã sờn mép. Bà đặt cả vào tay mẹ tôi. {b}Bà bảo: {q}con trai mẹ mất rồi. {c}Mười một lá này, là thư của con gái mẹ.',
      tail: 2,
      sfx: [['sparkle', 'c', 0.2]],
      draw(k) { black(k, '#1a130d'); for (let i = 0; i < 11; i++) thu(k, 960 + (i - 5) * 62, 520 + Math.abs(i - 5) * 10, 0.72, { r: (i - 5) * 0.045 }); shade(k, 0.3, [{ x: 960, y: 520, r: 900, warm: 1 }], { vig: 0.6 }); quote(k, 'Mười một lá này, là thư của con gái mẹ.', 'c', { color: AMBER, size: 64 }); },
    },
    {
      say: '{a}Chiều mùng Ba Tết, bà nội tôi mất. Bà chỉ dặn một câu: đưa thằng Út về nằm cạnh mẹ. {b}Hôm đưa bà ra đồng, cả làng mới biết bố tôi đã mất từ gần sáu năm trước. Những người từng xì xào, lần lượt đến thắp hương, không ai nói gì. {c}Chú Mạnh đứng ngoài cổng, khóc như một đứa trẻ.',
      draw(k) {
        if (k.t < k.cue('c')) { baiMo(k, { time: 'dawn' }); HANG_XOM.forEach((p, i) => ch(k, 420 + i * 340, 990, 460, { ...p, face: 'sad', arms: 'chest' })); shade(k, 0.4, [{ x: 960, y: 500, r: 1100 }], { vig: 0.5 }); return; }
        sanNha(k, { time: 'dawn', gateOpen: true }); ch(k, SAN.gate, 985, 500, { ...MANH, face: 'cry', tears: 1, arms: 'cover' }); shade(k, 0.42, [{ x: SAN.gate, y: 700, r: 760 }], { vig: 0.5 });
      },
    },
    {
      say: '{a}Cái hũ được đặt xuống cạnh mộ bà. {b}Mẹ tôi đặt theo một nắm xôi nhỏ, như mọi đêm cuối tháng. {c}Mẹ bảo: từ nay bố không phải nằm một mình dưới giếng nữa.',
      draw(k) { black(k, '#100c0a'); hu(k, 960, 860, 3.6 + k.at('a', 12, 'linear') * 0.4); shade(k, 0.4, [{ x: 960, y: 620, r: 700, warm: 1 }], { vig: 0.6 }); quote(k, 'Từ nay bố không phải nằm một mình dưới giếng nữa.', 'c', { color: AMBER, size: 56 }); },
    },
    {
      say: '{a}Mẹ tôi tin, đêm ấy bố đã giữ tôi lại. Bố hát để đuổi tôi về. {b}Nhưng các cụ trong làng lắc đầu. Các cụ bảo, thứ dưới giếng ấy không vội. Nó biết hát bằng giọng người mình nhớ nhất, và nó biết đợi. {c}Đã đáp một câu, là đã nhận lời.',
      sfx: [['heartbeat', 'c', 0.45]],
      draw(k) { gieng(k, { time: 'dusk' }); ch(k, 620, 985, 480, { ...HANG_XOM[2], view: 'side', face: 'blank', arms: 'back' }); shade(k, 0.55, [{ x: GI.x, y: 700, r: 780, warm: 1 }], { vig: 0.55 }); quote(k, 'Đã đáp một câu, là đã nhận lời.', 'c', { color: COLD, size: 62 }); },
    },
    {
      say: '{a}Năm 2004, làng tôi có nước máy, người ta lấp cái giếng đi. {b}Năm nay tôi bốn mươi mốt tuổi, sống ở Hà Nội, có một đứa con gái lên năm. Tôi chưa bao giờ hát bài ấy cho con. Chưa một lần.',
      draw(k) {
        if (k.t < k.cue('b')) { gieng(k, { time: 'day', bucket: false }); dimDay(k); tag(k, 'NĂM 2004', 'a'); return; }
        canHo(k); ch(k, 880, 985, 520, { ...NHIM_LON, face: 'happy', arms: 'hold' }); ch(k, 1130, 990, 270, { ...CON, face: 'happy', arms: 'raise' }); shade(k, 0.16, [DAY], { vig: 0.4 }); tag(k, 'HÀ NỘI · NĂM NAY', 'b');
      },
    },
    {
      say: '{a}Tối qua mất điện. Con bé ngồi trong nhà tắm, nghịch chậu nước. Tôi nghe nó hát: ông giẳng ông giăng, xuống chơi với tôi. Chắc cô giáo dạy. {b}Rồi nó hát tiếp: {q}có cái Nhím con, ngồi trên vai bố.',
      sfx: [['drip', 'a', 0.3], ['stinger', 'q', 0.55]],
      draw(k) { nhaTam(k); ch(k, 810, 900, 340, { ...CON, action: 'sit', view: 'side', face: 'happy', arms: 'hold', talk: 0.5 }); chau(k); oil(k, 480, 900, 1.2); shade(k, 0.7, [{ x: 800, y: 720, r: 700, warm: 1, flicker: 1 }], { vig: 0.5 }); quote(k, 'Có cái Nhím con, ngồi trên vai bố.', 'q', { color: AMBER, size: 62 }); },
    },
    {
      say: '{a}Tôi đứng chết lặng ở cửa. Tôi hỏi: ai dạy con câu ấy? {b}Con bé chỉ vào chậu nước, cười: {q}ông dạy. Ông ngồi ở trong này. {c}Ông hỏi, mẹ lớn chưa.',
      sfx: [['heartbeat', 'b', 0.45], ['stinger', 'c', 0.55]],
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, NHIM_LON, { face: 'shock', arms: 'chest', warm: 1 }); return; }
        nhaTam(k); ch(k, 810, 900, 340, { ...CON, action: 'sit', view: 'side', face: 'happy', arms: 'point', talk: 0.5 }); chau(k, 0); oil(k, 480, 900, 1.2); shade(k, 0.7, [{ x: 860, y: 740, r: 720, warm: 1, flicker: 1 }], { vig: 0.5 }); quote(k, '"Ông hỏi, mẹ lớn chưa."', 'c', { color: COLD, size: 66 });
      },
    },
    {
      say: '{a}Tối qua là đêm ba mươi. Trời không có trăng. {b}Tôi đã đổ hết nước trong nhà, úp hết chậu. {c}Gần sáng, tôi thấy con bé ngồi bên cái chậu úp trong nhà tắm, áp tai xuống đáy chậu, mỉm cười, như đang nghe ai hát. Rồi nó hát khẽ theo: {q}ông giẳng. Ông giăng.',
      tail: 2.5,
      sfx: [['heartbeat', 'q', 0.4]],
      draw(k) { nhaTam(k); if (after(k, 'c')) ch(k, 810, 900, 340, { ...CON, action: 'sit', view: 'side', face: 'happy', arms: 'hold', talk: after(k, 'q') ? 0.4 : 0 }); chau(k, 0); shade(k, 0.86, [{ x: 860, y: 760, r: 520 }], { vig: 0.6 }); quote(k, 'Ông giẳng. Ông giăng.', 'q', { color: COLD, size: 72 }); },
    },

    // ===== CUỐI =====
    nextScene({
      say: '{next}Tập sau: năm 1994, năm đứa chúng tôi ngồi duỗi chân trên chiếu, chơi nu na nu nống. Năm đứa, mười bàn chân. Đến lúc đếm, bàn chân cuối hàng lạnh ngắt. Và đó là bàn chân thứ mười một.',
      title: 'Nu Na Nu Nống | Bàn Chân Thứ Mười Một',
      hook: 'Năm đứa ngồi chơi. Mười một bàn chân.',
      art(k) { const { ctx } = k; black(k, '#2a2015'); ctx.strokeStyle = 'rgba(180,150,90,0.35)'; ctx.lineWidth = 3; for (let x = 400; x < 1520; x += 26) { ctx.beginPath(); ctx.moveTo(x, 200); ctx.lineTo(x, 800); ctx.stroke(); } for (let i = 0; i < 11; i++) { const x = 500 + i * 92, pale = i === 10; ctx.fillStyle = pale ? '#b8c0c4' : '#dcb28e'; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(x, 540, 36, 92, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); for (let t = 0; t < 5; t++) { ctx.beginPath(); ctx.arc(x - 26 + t * 13, 442 + Math.abs(t - 1) * 4, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); } } },
    }),
    subScene({
      say: '{q}Theo bạn, người hát dưới giếng đêm ấy là bố tôi, hay là thứ đã mượn giọng bố? Hãy để lại câu trả lời. {sub}Và nếu muốn nghe tiếp những chuyện chưa có lời giải, hãy đăng ký Nhân Gian Chưa Kể.',
      question: 'Người hát dưới giếng là bố tôi, hay thứ đã mượn giọng bố?',
      art(k) { trang(k, 960, 960, 90, { a: 0.9 }); },
    }),
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
