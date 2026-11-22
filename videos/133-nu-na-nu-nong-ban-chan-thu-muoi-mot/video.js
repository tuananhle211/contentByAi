// Nhân Gian Chưa Kể — tập Nu Na Nu Nống | Năm Đứa Ngồi Chơi, Tôi Đếm Được Mười Một Bàn Chân. Kịch bản + sổ dữ kiện: kich-ban.md.
// Sửa 20/11 theo hướng chân thật: bàn chân thứ mười một ở hiên đình là khoảnh khắc "không thể" duy nhất; cát ướt, mộng du, vệt nước đều chối được.
// Từ 19/11: KHÔNG dùng mô típ ba điều cấm. Động lực truyện: tự điều tra bàn chân lạ (bốn ngón) → bà Câm → tấm ảnh nhà trẻ 1975 → mẹ.
// Bí mật người sống: năm 12 tuổi mẹ nói dối đổ cho cô Nhàn; cô Nhàn im lặng 19 năm để che cho mẹ. Không vẽ trẻ em gặp nạn: chuyện năm 1975 chỉ kể, hình là bến sông trống.
import * as thumbs from '/videos/133-nu-na-nu-nong-ban-chan-thu-muoi-mot/thumbs.js';
import { PAPER, AMBER, COLD, shade, cold, tag, quote, chapter, nextScene, subScene, oil } from '/channel/nhan-gian.js';
import { benDo, BDO, baiMo, mam, gianNha, GIAN, sanNha, SAN } from '/channel/nhan-gian-babi.js';
import {
  TOI, COI, BIN, MAN, LY, ME, ME_NHO, BA_CAM, CO_NHAN, BA_HAO, ONG_TU, BON, ch, notRuoi, banChan, dauChan4, chieu, dinh, DINH, ngoiDuoi, kho, toiGao,
  tayNai, anhNhaTre, chieuGan, banTayDap, chanChan, sepia,
} from '/channel/nhan-gian-nuna.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const black = (k, c = '#07060a') => { k.ctx.fillStyle = c; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); };
const zoom = (k, cx, cy, s, fn) => k.group({ x: cx, y: cy, s }, () => k.group({ x: -cx, y: -cy }, fn));
const grain = (sc) => ({ ...sc, draw(k) { const s = 1 + 0.05 * Math.min(1, k.t / Math.max(1, k.d)); k.group({ x: k.W / 2, y: k.H / 2, s }, () => k.group({ x: -k.W / 2, y: -k.H / 2 }, () => sc.draw(k))); sepia(k, 0.75); } });
const KIDS = [TOI, COI, BIN, MAN, LY];
const GHOST = { cold: true, four: true, old: true };
const pair = (p) => [{ skin: p.skin, left: true }, { skin: p.skin }];
const FEET10 = KIDS.flatMap(pair);
const ME_GIA = { ...ME, kind: 'old', hairColor: '#a8a29a', top: '#6a6078' };
const DAY = { x: 960, y: 300, r: 1600 };
const dimDay = (k) => shade(k, 0.22, [DAY], { vig: 0.45 });
const dimDusk = (k, x = 960) => shade(k, 0.52, [{ x, y: 560, r: 1100, warm: 1 }], { vig: 0.5 });
const dimNight = (k, l = [{ x: 960, y: 700, r: 700, warm: 1, flicker: 1 }], a = 0.8) => shade(k, a, l, { vig: 0.55 });
const LAMP = { x: GIAN.lamp.x, y: GIAN.lamp.y - 70, r: 680, warm: 1, flicker: 1 };
const inNight = (k, o = {}) => { gianNha(k, o); oil(k, GIAN.lamp.x, 682, 1); };
// Cận mặt; o.mole = vẽ nốt ruồi ở cằm (mẹ).
function mat(k, p, o = {}) {
  black(k, o.bg ?? '#141019');
  zoom(k, 960, 430, 2.3, () => { const h = o.h ?? 560, info = ch(k, 960, 860, h, { ...p, arms: o.arms ?? 'chest', face: o.face ?? 'calm', tears: o.tears ?? 0, talk: o.talk ?? 0, tilt: o.tilt ?? 0 }); if (o.mole) notRuoi(k, info, h); });
  shade(k, 0.45, [{ x: 960, y: 450, r: 740, warm: o.warm ?? 1 }], { vig: 0.6 });
}
// Hàng năm đứa ngồi duỗi chân ở hiên đình. o.ghost = bàn chân lạnh ở cuối hàng (0..1).
function hien(k, o = {}) {
  dinh(k, { time: o.time ?? 'day' });
  const xs = o.xs ?? [560, 760, 960, 1160, 1360], who = o.who ?? KIDS;
  who.forEach((p, i) => ngoiDuoi(k, xs[i], 760, 260, p, { face: o.face ?? 'happy', ...(o.each?.(i) ?? {}) }));
  if (o.ghost) { const { ctx } = k; ctx.save(); ctx.globalAlpha *= o.ghost; banChan(k, (o.gx ?? 1500), 932, 260 / 760, GHOST); ctx.restore(); }
  if (o.cam) ch(k, 1555, 860, 380, { ...BA_CAM, action: 'sit', face: 'blank', arms: 'down', talk: o.cam === 'talk' ? 0.25 : 0 });
}
// Bàn tay đập nhịp: chạy từ chân đầu đến chân cuối của hàng n chân.
function dap(k, n, p, o = {}) { const x0 = o.x0 ?? 230, x1 = o.x1 ?? 1690, i = Math.min(n - 1, Math.floor(p * n)), x = n === 1 ? x0 : x0 + ((x1 - x0) * i) / (n - 1); banTayDap(k, x + 10, (o.y ?? 960) - 340 + Math.abs(Math.sin(p * n * Math.PI)) * -40, 0.95); }
function mua(k, a = 0.5) { const { ctx, W, H } = k, t = k.gt ?? 0; ctx.save(); ctx.strokeStyle = `rgba(206,218,230,${0.4 * a})`; ctx.lineWidth = 2.2; for (let i = 0; i < 160; i++) { const x = (k.rand(i + 800) * (W + 300) - t * 200) % (W + 300), y = (k.rand(i + 1000) * (H + 120) + t * 820) % (H + 120) - 60; ctx.beginPath(); ctx.moveTo(x < 0 ? x + W + 300 : x, y); ctx.lineTo((x < 0 ? x + W + 300 : x) - 10, y + 40); ctx.stroke(); } ctx.restore(); }
// Mâm cỗ bị hất đổ trên cỏ.
function mamDo(k, x, y) { const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.rotate(0.5); mam(k, 0, 0, 1); ctx.restore(); ctx.fillStyle = '#f0ead6'; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.ellipse(x - 220 + k.rand(i + 400) * 300, y + 30 + k.rand(i + 410) * 60, 22, 9, k.rand(i), 0, Math.PI * 2); ctx.fill(); } }
// Mộ mới đắp + bia.
function moMoi(k, x, y, o = {}) { const { ctx } = k; ctx.fillStyle = '#6a5640'; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x - 200, y); ctx.quadraticCurveTo(x, y - 150, x + 200, y); ctx.closePath(); ctx.fill(); ctx.stroke(); if (o.bia) { ctx.fillStyle = '#a8a08c'; ctx.beginPath(); ctx.roundRect(x - 50, y - 200, 100, 120, 10); ctx.fill(); ctx.stroke(); } }
// Đèn dầu ở đầu chiếu, hiên đình đêm.
const LAMPD = { x: 330, y: 820, r: 900, warm: 1, flicker: 1 };

const video = {
  meta: {
    title: 'Nu Na Nu Nống | Năm Đứa Ngồi Chơi, Tôi Đếm Được Mười Một Bàn Chân',
    description: `Năm 1994, năm đứa chúng tôi ngồi duỗi chân trên chiếu ngoài hiên đình, chơi nu na nu nống. Năm đứa, mười bàn chân. Đến cuối hàng, tay tôi chạm vào một bàn chân thứ mười một, lạnh ngắt, chỉ có bốn ngón.
Cả làng tôi chỉ có một người có bàn chân như thế, và người ấy đã chết cóng trên chiếc chiếu này hơn mười ngày trước.

Một bà già câm ở góc hiên đình, một túm gạo gói lá chuối không rõ của ai, và tấm ảnh nhà trẻ năm 1975 có khuôn mặt mà tôi không ngờ tới.`,
    footer: `📖 Truyện hư cấu dựa trên trò chơi đồng dao Nu Na Nu Nống và tín ngưỡng dân gian về người chết oan. Tên người, tên địa danh và tình tiết đều hư cấu.
🕯️ Nhân Gian Chưa Kể: những chuyện người xưa truyền tai nhau, mà chưa ai giải thích được.`,
    links: [['▶ Tập trước: Ông Giẳng Ông Giăng', '130-ong-giang-trang-duoi-gieng'], ['▶ Ma Giấu', '127-ma-giau-bay-dua-di-tron'], ['🔔 Đăng ký', 'https://www.youtube.com/@nhangianchuake?sub_confirmation=1']],
    tags: ['nu na nu nống', 'đồng dao', 'trò chơi dân gian', 'bàn chân thứ mười một', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'truyện ma làng quê', 'chuyện tâm linh có thật', 'hoạt hình kinh dị', 'nhân gian chưa kể'],
    hashtags: ['truyenma', 'nunanunong', 'tamlinh'],
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
      // Hook 0–20 giây (số liệu Facebook 21/11): trò chơi ai cũng thuộc + cú bẻ, không năm, không địa danh.
      say: '{a}Nu na nu nống, cái cống nằm trong. Đứa trẻ quê nào cũng từng ngồi duỗi chân chơi. Năm đứa, thì mười bàn chân. {b}Hôm ấy tôi là đứa đọc. Tay tôi đập từng bàn chân, đến cuối hàng, thì chạm vào một thứ lạnh ngắt. {c}Đó là bàn chân thứ mười một.',
      sfx: [['click', 'b', 0.25], ['stinger', 'c', 0.5]],
      draw(k) {
        if (k.t < k.cue('b')) { hien(k); dimDay(k); quote(k, '"Nu na nu nống, cái cống nằm trong…"', 'a', { size: 56, y: 160 }); return; }
        const g = after(k, 'c'); chieuGan(k, g ? [...FEET10, GHOST] : FEET10, { x1: g ? 1720 : 1590, s: 1.05 }); dap(k, g ? 11 : 10, k.at('b', Math.max(2, k.cue('c') - k.cue('b')), 'linear') * (g ? 1 : 0.99), { x1: g ? 1720 : 1590 }); shade(k, 0.3, [DAY], { vig: 0.5 });
        quote(k, 'Năm đứa. Mười một bàn chân.', 'c', { color: AMBER, size: 64, y: 160 });
      },
    },
    {
      say: '{a}Bàn chân ấy da nứt nẻ, gót chai sạn như chân người già. {b}Và nó chỉ có bốn ngón. {c}Cả làng tôi chỉ có một người có bàn chân như thế. Người ấy đã chết cóng ngay trên chiếc chiếu này, hơn mười ngày trước. {d}Nhưng phải ba tháng sau tôi mới biết, người phải trả lời cho bàn chân ấy, lại là mẹ tôi.',
      sfx: [['heartbeat', 'b', 0.4], ['wind', 'c', 0.3], ['stinger', 'd', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { black(k, '#2a1e14'); chieu(k, -60, 1980, 0, 1120, { skew: 0, old: true }); banChan(k, 960, 980, 3.6, GHOST); shade(k, 0.35, [{ x: 960, y: 520, r: 800 }], { vig: 0.6 }); quote(k, 'Bốn ngón.', 'b', { color: COLD, size: 76 }); return; }
        if (k.t < k.cue('d')) { dinh(k, { time: 'night' }); dimNight(k, [{ x: 1560, y: 860, r: 420 }], 0.86); return; }
        mat(k, ME, { face: 'blank', arms: 'down', mole: true, warm: 0.6 }); quote(k, 'Người phải trả lời, lại là mẹ tôi.', 'd', { color: AMBER, size: 58 });
      },
    },
    {
      say: '{a}Đây là Nhân Gian Chưa Kể. Nếu bạn muốn nghe tiếp những chuyện chưa có lời giải, hãy bấm đăng ký. {b}Còn bây giờ, xin bạn tắt bớt đèn.',
      draw(k) { black(k); const fade = 1 - k.at('b', 3, 'linear') * 0.7; oil(k, 960, 790, 2.1); shade(k, 0.84, [{ x: 960, y: 620, r: 680 * fade, warm: 1, flicker: 1 }], { vig: 0.5 }); k.text('NHÂN GIAN CHƯA KỂ', 960, 300, { size: 92, font: 'title', color: AMBER, fx: 'fade', p: k.at('a', 1) * fade }); },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Bà Câm',
      // 21/11: gộp hai cảnh giới thiệu (hook mới đã nói cách chơi) để biến cố đầu tiên đến sớm hơn ~16 giây.
      say: '{a}Làng tôi nằm bên một khúc sông. Giữa làng là ngôi đình cổ, cột lim to hai người ôm. Hiên đình là chỗ bọn trẻ con chơi nu na nu nống. {q}Người đọc đập tay lần lượt vào từng bàn chân, theo từng tiếng đồng dao. {b}Đến tiếng cuối, tè he chân rụt, trúng chân nào, chân ấy co lại.',
      sfx: [['click', 'b', 0.3]],
      draw(k) {
        if (k.t < k.cue('q')) { dinh(k, { time: 'day' }); dimDay(k); chapter(k, 1, 'Bà Câm'); return; }
        const out = after(k, 'b', 1.2), feet = FEET10.map((f, i) => (i === 6 && out ? { ...f, dy: -k.at(k.cue('b', 1.2), 0.6) * 260, s: 1 - k.at(k.cue('b', 1.2), 0.6) * 0.3 } : f));
        chieuGan(k, feet, { x1: 1590, s: 1.05 }); dap(k, 10, after(k, 'b') ? 0.65 : (k.at('q', Math.max(2, k.cue('b') - k.cue('q')), 'linear') * 3) % 1, { x1: 1590 }); shade(k, 0.28, [DAY], { vig: 0.5 });
        quote(k, '"Nu na nu nống, cái cống nằm trong…"', 'q', { size: 56, until: 'b', y: 160 }); quote(k, 'Tè he chân rụt.', 'b', { color: AMBER, size: 66, y: 160 });
      },
    },
    {
      say: '{a}Ở góc hiên, sát cái cột lim to nhất, lúc nào cũng có một bà già ngồi. Bọn trẻ gọi là bà Câm. {b}Bà ở nhờ gian kho bỏ không cạnh đình, đi nhặt rác, mót lúa, không nói với ai một câu nào. {c}Chân phải bà mất ngón út. Vết sẹo cũ xoắn lại như sợi thừng.',
      draw(k) {
        if (k.t < k.cue('b')) { dinh(k, { time: 'day' }); ch(k, 1555, 860, 380, { ...BA_CAM, action: 'sit', face: 'blank', arms: 'down' }); dimDay(k); return; }
        if (k.t < k.cue('c')) { kho(k, { time: 'dusk' }); ch(k, 1200, 990, 440, { ...BA_CAM, view: 'side', flip: true, action: 'walk', face: 'blank', arms: 'hold' }); dimDusk(k, 1100); return; }
        black(k, '#2a1e14'); chieu(k, -60, 1980, 0, 1120, { skew: 0, old: true }); banChan(k, 960, 980, 3.6, { four: true, old: true, skin: BA_CAM.skin }); shade(k, 0.3, [DAY], { vig: 0.6 });
      },
    },
    {
      say: '{a}Mỗi lần chúng tôi chơi nu na nu nống, bà lại duỗi chân ra, ngồi xem, môi mấp máy theo từng tiếng đồng dao, mà không phát ra tiếng nào. {b}Có hôm, thằng Còi nhặt hòn sỏi ném vào chân bà, cả bọn cười ồ. Bà chỉ co chân lại, rồi lại duỗi ra. {c}Người lớn trong làng bảo bà ấy dở hơi, tránh xa ra. Còn mẹ tôi thì cấm hẳn tôi đến gần bà, không giải thích một lời.',
      draw(k) {
        if (k.t < k.cue('c')) { hien(k, { cam: k.t < k.cue('b') ? 'talk' : true, xs: [420, 620, 820, 1020, 1220], each: (i) => (after(k, 'b') ? { face: 'laugh' } : {}) }); dimDay(k); return; }
        sanNha(k, { time: 'day' }); const m = ch(k, 760, 990, 500, { ...ME, view: 'side', face: 'angry', arms: 'point', talk: 0.6 }); notRuoi(k, m, 500, { dx: 0.06 }); ch(k, 1060, 995, 330, { ...TOI, view: 'side', flip: true, face: 'sad', arms: 'down' }); dimDay(k);
      },
    },
    {
      say: '{a}Nhưng có một chuyện, mãi sau này tôi mới hiểu. Cứ đầu tháng âm lịch, sáng ra, trước cửa gian kho của bà Câm lại có một túm gạo, gói lá chuối cẩn thận, buộc lạt. {b}Cả làng không ai biết là của ai.',
      draw(k) { kho(k, { time: 'dawn', gao: true }); shade(k, 0.42, [{ x: 960, y: 760, r: 760 }], { vig: 0.5 }); quote(k, 'Túm gạo của ai?', 'b', { color: AMBER, size: 62 }); },
    },
    {
      say: '{a}Năm ấy rét đậm. Sáng hai mươi tư tháng Chạp, ông Từ, người giữ đình, thấy bà Câm ngồi chết ở góc hiên, lưng tựa cột lim. {b}Bà ngồi duỗi thẳng hai chân trên chiếc chiếu cũ, như đang đợi ai đến đếm. {c}Không ai nhận là họ hàng. Thôn góp tiền, chôn bà ở cuối bãi tha ma. Ông Từ cất cái tay nải của bà vào gian kho.',
      sfx: [['wind', 0, 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { dinh(k, { time: 'dawn' }); [[1300, ONG_TU], [1080, BA_HAO], [860, { ...BA_CAM, hat: 'non', top: '#7a6a5a', hairColor: '#3a3028', kind: 'woman' }]].forEach(([x, p]) => ch(k, x, 990, 470, { ...p, view: 'side', face: 'sad', arms: 'chest' })); shade(k, 0.5, [{ x: 1200, y: 600, r: 1000 }], { vig: 0.5 }); cold(k, 0.5); tag(k, 'SÁNG 24 THÁNG CHẠP', 'a'); return; }
        if (k.t < k.cue('c')) { black(k, '#2a1e14'); chieu(k, -60, 1980, 0, 1120, { skew: 0, old: true }); banChan(k, 760, 960, 2.4, { left: true, old: true, skin: '#b9bfbf' }); banChan(k, 1160, 960, 2.4, { four: true, old: true, skin: '#b9bfbf' }); shade(k, 0.4, [{ x: 960, y: 600, r: 800 }], { vig: 0.6 }); cold(k, 0.6); return; }
        baiMo(k, { time: 'dusk' }); moMoi(k, 1300, 870); dimDusk(k, 1300);
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Bàn chân thứ mười một',
      say: '{a}Mùng sáu Tết năm Giáp Tuất. Năm đứa chúng tôi lại ra hiên đình: tôi, thằng Còi, thằng Bin, cái Mận, cái Ly. {b}Chiếc chiếu cũ của bà Câm vẫn cuộn ở góc hiên. Thằng Còi kéo ra trải giữa hiên, bảo: chiếu còn tốt, phí. {c}Cả bọn ngồi xuống, duỗi chân.',
      draw(k) {
        if (k.t < k.cue('c')) { dinh(k, { time: 'day', chieu: after(k, 'b') }); KIDS.forEach((p, i) => ch(k, 400 + i * 200, 990, 340, { ...p, view: 'side', face: 'happy', arms: i === 1 && after(k, 'b') ? 'point' : 'down', talk: i === 1 && after(k, 'b') ? 0.5 : 0 })); dimDay(k); chapter(k, 2, 'Bàn Chân Thứ Mười Một'); tag(k, 'MÙNG 6 TẾT GIÁP TUẤT', 'a'); return; }
        hien(k); dimDay(k);
      },
    },
    {
      say: '{a}Tôi làm người đọc. Tôi đọc to, tay đập từng bàn chân, từ đầu hàng đến cuối hàng. {b}Đến bàn chân thứ mười, đáng lẽ tay tôi phải quay lại đầu hàng. {c}Nhưng ở cuối hàng, còn một bàn chân nữa. Tay tôi chạm vào nó. Lạnh như đá.',
      sfx: [['click', 'a', 0.25], ['heartbeat', 'c', 0.45]],
      draw(k) {
        const g = after(k, 'b', 0.8), p = after(k, 'c') ? 1 : k.at('a', Math.max(2, k.cue('c') - k.cue('a')), 'linear');
        chieuGan(k, g ? [...FEET10, { ...GHOST, s: k.at(k.cue('b', 0.8), 1.2) }] : FEET10, { x1: 1720, s: 1.02 }); dap(k, 11, Math.min(0.999, p), { x1: 1720 }); shade(k, 0.3, [DAY], { vig: 0.5 });
      },
    },
    {
      say: '{a}Nó duỗi ra từ dưới mép chiếu, ở cuối hàng, sát cạnh chân cái Ly. Bên trên nó, không có ai cả. {b}Da nứt nẻ. Gót chai. Bốn ngón. Chỗ ngón út là một vết sẹo xoắn lại. {c}Cái Ly hét lên trước. Cả bọn bỏ chạy, chiếu tung lên. Lúc tôi ngoảnh lại, trên hiên đình chỉ còn chiếc chiếu nằm lệch, và một vệt nước ướt.',
      sfx: [['stinger', 'a', 0.4], ['whoosh', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { hien(k, { ghost: 1, face: 'blank' }); shade(k, 0.3, [DAY], { vig: 0.5 }); return; }
        if (k.t < k.cue('c')) { black(k, '#2a1e14'); chieu(k, -60, 1980, 0, 1120, { skew: 0, old: true }); banChan(k, 960, 980, 3.6, GHOST); shade(k, 0.35, [{ x: 960, y: 520, r: 800 }], { vig: 0.6 }); return; }
        dinh(k, { time: 'day', chieu: false }); chieu(k, 500, 1500, DINH.floor + 50, DINH.floor + 230, { old: true, skew: 140 }); dauChan4(k, [[1450, 950, 0.1]], { color: 'rgba(40,46,56,0.55)', s: 1.3 }); dimDay(k);
      },
    },
    {
      say: '{a}Về nhà, tôi không dám kể. Tôi tự nhủ mình hoa mắt. {b}Hôm sau, cả bọn cãi nhau. Thằng Còi bảo cái Ly chơi khăm, thò chân đứa em nó vào. Cái Ly thề sống thề chết. {c}Thằng Bin thì bảo, tại cái chiếu. Chiếu của người chết, ai lại đem ra ngồi.',
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, TOI, { face: 'fear', arms: 'down', warm: 0.7 }); return; }
        sanNha(k, { time: 'day' }); [[560, COI, 'angry', 'point'], [780, LY, 'cry', 'chest'], [1000, BIN, 'fear', 'down'], [1200, MAN, 'calm', 'down'], [1400, TOI, 'fear', 'down']].forEach(([x, p, face, arms], i) => ch(k, x, 905, 300, { ...p, view: 'side', flip: i > 0, face, arms, talk: (i === 0 && !after(k, 'c')) || (i === 2 && after(k, 'c')) ? 0.5 : 0 })); dimDay(k); quote(k, 'Chiếu của người chết, ai lại đem ra ngồi.', 'c', { size: 56 });
      },
    },
    {
      say: '{a}Từ hôm ấy, không đứa nào dám ra hiên đình chơi nữa. {b}Ông Từ cuộn chiếc chiếu của bà Câm lại, cất vào gian kho, khoá cửa. {c}Nhưng cái Mận bảo, tối nào đi qua đình, nó cũng thấy cửa kho hé ra một khe.',
      sfx: [['creak', 'c', 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) { dinh(k, { time: 'dusk' }); ch(k, 1200, 990, 470, { ...ONG_TU, view: 'side', face: 'blank', arms: 'hold' }); dimDusk(k, 1100); return; }
        kho(k); dimNight(k, [{ x: 960, y: 640, r: 520 }], 0.84); quote(k, 'Cửa kho hé ra một khe.', 'c', { color: COLD, size: 60 });
      },
    },
    {
      say: '{a}Tối ấy tôi ngủ với mẹ như mọi đêm. Bố tôi đi làm ở mỏ than ngoài Quảng Ninh, ra Giêng đã đi rồi. {b}Nửa đêm, tôi tỉnh dậy vì lạnh chân. Chăn bị tốc ra, hở cả hai bàn chân. {c}Tôi kéo chăn lên. Dưới đầu ngón chân tôi, lạnh ngắt, là một nắm cát ướt.',
      sfx: [['heartbeat', 'b', 0.4], ['stinger', 'c', 0.5]],
      draw(k) {
        if (k.t < k.cue('b')) { inNight(k); dimNight(k, [LAMP], 0.82); return; }
        chanChan(k, { five: 0, sand: after(k, 'c') }); shade(k, 0.6, [{ x: 940, y: 900, r: 700 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Tôi hét lên. Mẹ bật dậy, thắp đèn, lật chăn. {b}Cuối chiếu có một nắm cát ướt, thứ cát mịn và đen chỉ có ở bến sông. Chiều hôm ấy, tôi không hề ra bến. {c}Mẹ nhìn nắm cát rất lâu, tay cứ mân mê cái nốt ruồi to ở cằm, như mỗi lần mẹ lo. Tôi chưa bao giờ thấy mặt mẹ trắng như thế.',
      sfx: [['drip', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) { chanChan(k, { sand: after(k, 'b') }); shade(k, 0.45, [{ x: 960, y: 900, r: 820, warm: 1, flicker: 1 }], { vig: 0.6 }); return; }
        mat(k, ME, { face: 'fear', arms: 'chest', mole: true, warm: 1 });
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      say: '{a}Sáng hôm sau, cái Ly bảo cả bọn: bà Câm về đòi nợ, vì thằng Còi ném sỏi vào chân bà. {b}Thằng Còi sợ, xin mẹ nó một nắm hương, ra cuối bãi tha ma, quỳ trước nấm mộ mới, vừa khóc vừa lạy. {c}Nhưng đêm ấy, nhà thằng Còi chẳng có gì. Cát ướt lại nằm ở cuối chiếu nhà tôi. {d}Tôi bắt đầu hiểu, bàn chân ấy không tìm thằng Còi. Nó tìm nhà tôi.',
      sfx: [['heartbeat', 'd', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { dinh(k, { time: 'day', chieu: false }); [TOI, COI, BIN, MAN, LY].forEach((p, i) => ch(k, 560 + i * 200, 995, 330, { ...p, view: 'side', flip: i > 2, face: i === 4 ? 'angry' : 'fear', arms: i === 4 ? 'point' : 'down', talk: i === 4 ? 0.6 : 0 })); dimDay(k); return; }
        if (k.t < k.cue('c')) { baiMo(k, { time: 'day' }); moMoi(k, 1200, 880); ch(k, 900, 960, 300, { ...COI, view: 'side', action: 'kneel', face: 'cry', tears: 1, arms: 'chest' }); dimDay(k); return; }
        if (k.t < k.cue('d')) { chanChan(k, { sand: true }); shade(k, 0.6, [{ x: 960, y: 900, r: 700 }], { vig: 0.6 }); return; }
        mat(k, TOI, { face: 'fear', arms: 'down', warm: 0.6 }); quote(k, 'Nó tìm nhà tôi.', 'd', { color: AMBER, size: 70 });
      },
    },
    {
      chapter: 'Bến sông',
      say: '{a}Từ đêm ấy, mẹ tôi lạ lắm. Mẹ không ngủ, ngồi bên đèn dầu đến khuya. {b}Ba đêm sau, tôi tỉnh dậy, không thấy mẹ đâu. Cửa mở toang. Ngoài sân, một hàng dấu chân ướt đi ra ngõ.',
      sfx: [['creak', 'b', 0.4], ['owl', ['b', 2], 0.25]],
      draw(k) {
        if (k.t < k.cue('b')) { inNight(k); const m = ch(k, 1000, 990, 470, { ...ME, action: 'sit', view: 'side', face: 'blank', arms: 'hold' }); dimNight(k, [LAMP], 0.78); chapter(k, 3, 'Bến Sông'); return; }
        sanNha(k, { time: 'night', gateOpen: true }); dauChan4(k, [[800, 1000, 0.3], [930, 960, 0.4], [1060, 950, 0.5], [1200, 930, 0.6], [1340, 920, 0.7], [1480, 900, 0.8]], { color: 'rgba(170,190,210,0.4)', s: 0.9 }); dimNight(k, [{ x: 1200, y: 900, r: 700 }], 0.74);
      },
    },
    {
      say: '{a}Tôi đi theo. Dấu chân dẫn ra bến sông đầu làng. {b}Mẹ tôi đứng dưới nước, nước ngập đến mắt cá, mắt mở trừng trừng nhìn ra giữa dòng, như người ngủ mà mắt vẫn mở. {c}Trên bãi bùn chỉ có một hàng dấu chân của mẹ, đi thẳng xuống nước, đều và thẳng như người đang tỉnh.',
      sfx: [['wind', 'a', 0.3], ['drip', 'b', 0.3], ['heartbeat', 'c', 0.45]],
      draw(k) {
        if (true) { benDo(k, { time: 'night' }); const m = ch(k, BDO.step.x + 60, 1010, 470, { ...ME, view: 'side', face: 'blank', arms: 'down' }); notRuoi(k, m, 470, { dx: 0.06 }); if (after(k, 'b')) ch(k, 300, 1000, 330, { ...TOI, view: 'side', face: 'fear', arms: 'chest' }); dimNight(k, [{ x: 900, y: 760, r: 700 }], 0.74); return; }
        black(k, '#2c2820'); const { ctx } = k; ctx.fillStyle = '#3a342a'; ctx.fillRect(0, 0, 1920, 1080); dauChan4(k, [[700, 900, -0.1], [820, 700, -0.05], [700, 500, -0.1], [820, 300, -0.05]], { color: 'rgba(14,12,10,0.7)', s: 1.5, flat: 1 }); dauChan4(k, [[1200, 260, 0.05], [1100, 460, 0.05], [1220, 660, 0.05], [1100, 860, 0.05]], { color: 'rgba(14,12,10,0.7)', s: 1.5, flat: 1 }); shade(k, 0.5, [{ x: 960, y: 560, r: 760 }], { vig: 0.6 }); cold(k, 0.4); quote(k, 'Bàn chân phải chỉ có bốn ngón.', 'c', { color: COLD, size: 58 });
      },
    },
    {
      say: '{a}Tôi gọi to. Mẹ giật mình, nhìn quanh, rồi nhìn xuống chân mình. Mẹ không biết mình ra đây bằng cách nào. {b}Mẹ ôm tôi đi về, không nói một lời. Nhưng suốt dọc đường, mẹ cứ lẩm bẩm một câu, rất khẽ: {q}con xin cô. Con xin cô.',
      draw(k) {
        if (k.t < k.cue('b')) { benDo(k, { time: 'night' }); const m = ch(k, BDO.step.x + 60, 1010, 470, { ...ME, view: 'side', flip: true, face: 'shock', arms: 'chest' }); notRuoi(k, m, 470, { dx: -0.06 }); ch(k, 420, 1000, 330, { ...TOI, view: 'side', face: 'cry', arms: 'point', talk: 0.6 }); dimNight(k, [{ x: 700, y: 760, r: 760 }], 0.72); return; }
        sanNha(k, { time: 'night', gateOpen: true }); const x = 1650 - k.at('b', 6, 'linear') * 700; const m = ch(k, x, 990, 470, { ...ME, view: 'side', flip: true, action: 'walk', face: 'sad', arms: 'hold', talk: after(k, 'q') ? 0.3 : 0 }); notRuoi(k, m, 470, { dx: -0.06 }); ch(k, x + 140, 995, 330, { ...TOI, view: 'side', flip: true, action: 'walk', face: 'fear', arms: 'down' }); dimNight(k, [{ x, y: 760, r: 620 }], 0.74); quote(k, '"Con xin cô. Con xin cô."', 'q', { color: AMBER, size: 62 });
      },
    },
    {
      say: '{a}Con xin cô. Mẹ tôi chưa bao giờ gọi bà Câm là cô. Mẹ bảo mẹ không hề quen bà. {b}Sáng hôm sau, tôi đến đình tìm ông Từ, người giữ đình, người duy nhất trong làng vẫn hay mang cơm thừa cho bà Câm.',
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, TOI, { face: 'blank', arms: 'down', warm: 0.6 }); quote(k, 'Mẹ bảo mẹ không hề quen bà.', 'a', { size: 56 }); return; }
        dinh(k, { time: 'day' }); ch(k, 1250, 990, 470, { ...ONG_TU, view: 'side', flip: true, face: 'calm', arms: 'hold' }); ch(k, 700, 995, 330, { ...TOI, view: 'side', face: 'calm', arms: 'down' }); dimDay(k);
      },
    },
    {
      say: '{a}Ông Từ nghe tôi kể, im rất lâu. Rồi ông bảo: bà ấy không phải câm từ bé đâu. Ngày trước, bà tên là Nhàn, cô Nhàn, cô nuôi dạy trẻ ở nhà trẻ hợp tác xã. {b}Cả một lứa trẻ con làng này, kể cả bố mẹ chúng mày, đều do cô Nhàn bế, cô Nhàn dạy hát. Bài nu na nu nống, là cô ấy dạy cả làng.',
      draw(k) {
        if (k.t < k.cue('b')) { dinh(k, { time: 'day' }); ch(k, 1150, 990, 470, { ...ONG_TU, view: 'side', flip: true, face: 'sad', arms: 'chest', talk: 0.5 }); ch(k, 760, 995, 330, { ...TOI, view: 'side', face: 'shock', arms: 'down' }); dimDay(k); return; }
        dinh(k, { time: 'day' }); [0, 1, 2, 3, 4, 5].forEach((i) => ngoiDuoi(k, 460 + i * 170, 780, 190, { kind: 'kid', skin: '#e0bc98', hair: i % 2 ? 'bun' : 'buzz', hairColor: '#241a12', top: ['#c8b48e', '#a8b8a0', '#d0a890'][i % 3], topStyle: 'tee', sleeve: 'short', pants: '#4a4a4a' }, { face: 'happy' })); ch(k, 1520, 990, 500, { ...CO_NHAN, face: 'happy', arms: 'wave', talk: 0.5 }); dimDay(k); cold(k, 0.55); tag(k, 'NHÀ TRẺ HỢP TÁC XÃ', 'b');
      },
    },
    {
      say: '{a}Hè năm 1975, ở nhà trẻ có một thằng bé ba tuổi, tên là Tũn, con bà Hảo đầu xóm. {b}Một buổi trưa, thằng Tũn ra bến sông, trượt chân. Cô Nhàn lao xuống. Bàn chân cô vướng vào sợi xích sắt của con thuyền đậu ở bến, đứt mất ngón út. Cô không cứu được nó. {c}Người ta mò ba ngày, không thấy xác thằng bé.',
      sfx: [['wind', 'b', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { benDo(k, { time: 'day' }); dimDay(k); cold(k, 0.6); tag(k, 'HÈ NĂM 1975', 'a'); return; }
        if (k.t < k.cue('c')) { benDo(k, { time: 'day' }); const { ctx } = k; ctx.strokeStyle = '#3a3a3c'; ctx.lineWidth = 9; ctx.setLineDash([22, 10]); ctx.beginPath(); ctx.moveTo(BDO.boat.x - 160, BDO.boat.y + 10); ctx.quadraticCurveTo(1100, 1000, 940, 1080); ctx.stroke(); ctx.setLineDash([]); dimDay(k); cold(k, 0.6); return; }
        benDo(k, { time: 'dawn' }); dimDusk(k); cold(k, 0.6);
      },
    },
    {
      say: '{a}Người ta hỏi, ai dắt thằng Tũn ra bến? Có một đứa con gái phụ việc ở nhà trẻ hôm ấy, bảo: {q}cô Nhàn dắt em ra bến rửa chân. {b}Cô Nhàn nghe thế, nhìn đứa con gái ấy rất lâu. Rồi cô không nói gì. {c}Từ hôm ấy, cô không bao giờ nói thêm một câu nào nữa.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { dinh(k, { time: 'day', chieu: false }); [[1450, ONG_TU], [1250, BA_HAO], [1650, { ...ONG_TU, hair: 'short', kind: 'man', top: '#5a6a72' }]].forEach(([x, p]) => ch(k, x, 990, 470, { ...p, view: 'side', flip: true, face: 'angry', arms: 'chest' })); ch(k, 960, 995, 300, { ...ME_NHO, view: 'side', face: 'fear', arms: 'point', talk: after(k, 'q') ? 0.6 : 0 }); ch(k, 560, 990, 480, { ...CO_NHAN, view: 'side', face: 'blank', arms: 'down' }); dimDay(k); cold(k, 0.6); return; }
        mat(k, CO_NHAN, { face: 'sad', arms: 'down', warm: 0.3 }); cold(k, 0.6); quote(k, 'Cô không bao giờ nói thêm một câu nào nữa.', 'c', { color: COLD, size: 54 });
      },
    },
    {
      say: '{a}Tôi hỏi ông Từ: đứa con gái ấy là ai? {b}Ông Từ lắc đầu. Ông bảo, hôm ấy cả làng chỉ nhìn cô Nhàn. Chẳng ai để ý đến một đứa con gái mười hai tuổi đứng khóc ở góc sân. {c}Ông chỉ nhớ, từ hôm ấy, đứa con gái ấy không bao giờ bước chân đến nhà trẻ nữa.',
      draw(k) { dinh(k, { time: 'day' }); ch(k, 1150, 990, 470, { ...ONG_TU, view: 'side', flip: true, face: 'sad', arms: 'chest', talk: after(k, 'b') ? 0.5 : 0 }); ch(k, 760, 995, 330, { ...TOI, view: 'side', face: 'calm', arms: 'down', talk: k.t < k.cue('b') ? 0.5 : 0 }); dimDay(k); quote(k, '"Đứa con gái ấy là ai?"', 'a', { size: 58, until: 'b' }); },
    },
    {
      say: '{a}Hợp tác xã đuổi cô khỏi nhà trẻ. Bà Hảo nhổ nước bọt vào mặt cô, ngay giữa sân đình. {b}Cô ở lại làng, câm lặng suốt mười chín năm, nhặt rác, mót lúa, ngồi ở góc hiên nhìn bọn trẻ con chơi trò cô dạy. {c}Ông Từ vào gian kho, lấy ra cái tay nải của bà, đưa cho tôi: bà ấy chẳng có gì, chỉ giữ mỗi cái này.',
      draw(k) {
        if (k.t < k.cue('b')) { dinh(k, { time: 'day', chieu: false }); ch(k, 1150, 990, 480, { ...BA_HAO, view: 'side', flip: true, face: 'angry', arms: 'point', talk: 0.7 }); ch(k, 800, 990, 480, { ...CO_NHAN, view: 'side', face: 'blank', arms: 'down' }); dimDay(k); cold(k, 0.6); return; }
        if (k.t < k.cue('c')) { hien(k, { cam: true, time: 'dusk', xs: [420, 620, 820, 1020, 1220] }); dimDusk(k, 1300); return; }
        black(k, '#1e1610'); tayNai(k, 960, 700, 1.6); shade(k, 0.35, [{ x: 960, y: 560, r: 800, warm: 1 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Trong tay nải là một tấm ảnh cũ, chụp nhà trẻ hợp tác xã năm 1975, hôm được bằng khen. Mười mấy đứa trẻ ngồi duỗi chân trên chiếu. Đằng sau là cô Nhàn, còn trẻ, cười rất tươi. {b}Đứng cạnh cô, tay bế một thằng bé, là một đứa con gái chừng mười hai tuổi, có cái nốt ruồi to ở cằm. {c}Tôi nhận ra cái nốt ruồi ấy. {d}Đó là mẹ tôi.',
      sfx: [['heartbeat', 'b', 0.4], ['stinger', 'd', 0.5]],
      draw(k) {
        black(k, '#1e1610'); const z = after(k, 'b') ? 1 + k.at('b', 3, 'inOut') * 1.3 : 1;
        zoom(k, 960 + (z - 1) * 90, 560 - (z - 1) * 40, z, () => anhNhaTre(k, 960, 560, 1.5, { ring: after(k, 'c') ? k.at('c', 0.8) : 0 }));
        shade(k, 0.3, [{ x: 960, y: 520, r: 900, warm: 1 }], { vig: 0.6 }); quote(k, 'Đó là mẹ tôi.', 'd', { color: AMBER, size: 76 });
      },
    },
    {
      say: '{a}Đến đây, chắc bạn cũng đoán được đứa con gái phụ việc hôm ấy là ai. Nếu là bạn, mười hai tuổi, đứng trước cả làng, bạn có dám nói thật không? Hãy để lại câu trả lời. {b}Vì mẹ tôi phải mất mười chín năm, mới nói được.',
      draw(k) { black(k, '#1e1610'); anhNhaTre(k, 960, 520, 1.2); shade(k, 0.6, [{ x: 960, y: 520, r: 700, warm: 1 }], { vig: 0.6 }); quote(k, 'Nếu là bạn, bạn có dám nói thật không?', 'a', { color: PAPER, size: 58 }); },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Trăm ngày',
      say: '{a}Tôi mang tấm ảnh về, đặt trước mặt mẹ. Tôi chỉ hỏi một câu: mẹ có quen bà Câm không? {b}Mẹ nhìn tấm ảnh. Mẹ không trả lời. Mẹ cất nó vào túi áo, rồi đi nấu cơm như chưa có chuyện gì.',
      draw(k) { gianNha(k, { bed: false }); const m = ch(k, 1150, 990, 480, { ...ME, view: 'side', flip: true, face: after(k, 'b') ? 'blank' : 'calm', arms: 'hold' }); notRuoi(k, m, 480, { dx: -0.06 }); ch(k, 760, 995, 330, { ...TOI, view: 'side', face: 'angry', arms: 'point', talk: k.t < k.cue('b') ? 0.5 : 0 }); dimDay(k); chapter(k, 4, 'Trăm Ngày'); },
    },
    {
      say: '{a}Nhưng tối ấy, mẹ sang từng nhà trong xóm. Mẹ bảo, sắp đến trăm ngày bà Câm, mẹ muốn làm một mâm cỗ, mời cả làng ra mộ thắp hương. {b}Người ta nhìn mẹ như nhìn người lạ. {c}Bà Hảo đứng ở cổng, cười khẩy: {q}mụ ấy giết con tôi, chị làm cỗ cho mụ à?',
      sfx: [['stinger', 'q', 0.4]],
      draw(k) {
        sanNha(k, { time: 'dusk' }); const m = ch(k, 1250, 990, 480, { ...ME, view: 'side', face: 'sad', arms: 'chest', talk: k.t < k.cue('b') ? 0.5 : 0 }); notRuoi(k, m, 480, { dx: 0.06 });
        if (after(k, 'c')) ch(k, SAN.gate, 990, 480, { ...BA_HAO, view: 'side', flip: true, face: 'angry', arms: 'point', talk: after(k, 'q') ? 0.7 : 0 }); else ch(k, 900, 990, 470, { ...ONG_TU, view: 'side', flip: true, face: 'shock', arms: 'down' });
        dimDusk(k, 1300); quote(k, '"Chị làm cỗ cho mụ à?"', 'q', { color: AMBER, size: 60 });
      },
    },
    {
      say: '{a}Những ngày ấy, làng tôi bắt đầu xì xào. Bọn trẻ đồn nhau ma bà Câm về ngồi ở hiên đình. {b}Người lớn bảo nhảm, nhưng tối đến, không ai dắt con đi qua cổng đình nữa. {c}Bà Hảo nghe chuyện, đi đâu cũng chửi: chết rồi còn không để người ta yên.',
      sfx: [['wind', 'b', 0.3]],
      draw(k) {
        if (k.t < k.cue('c')) { dinh(k, { time: after(k, 'b') ? 'night' : 'dusk' }); if (after(k, 'b')) dimNight(k, [{ x: 960, y: 700, r: 600 }], 0.82); else dimDusk(k, 960); return; }
        sanNha(k, { time: 'day' }); ch(k, 900, 905, 470, { ...BA_HAO, view: 'side', face: 'angry', arms: 'point', talk: 0.7 }); dimDay(k); quote(k, '"Chết rồi còn không để người ta yên."', 'c', { color: AMBER, size: 56 });
      },
    },
    {
      say: '{a}Rồi một đêm, bà Hảo đập cửa nhà tôi, chân trần, tóc rũ rượi. {b}Bà bảo, nửa đêm bà nghe có tiếng trẻ con gọi mẹ ở dưới bến sông. Giọng nhỏ xíu, ngọng nghịu, y như giọng thằng Tũn mười chín năm trước. {c}Bà túm áo mẹ tôi: chị làm cỗ cho mụ ấy, mụ ấy về rồi, mụ ấy dắt cả con tôi về. {d}Mẹ tôi đứng im, không nói được câu nào.',
      sfx: [['creak', 'a', 0.4], ['heartbeat', 'b', 0.4]],
      draw(k) { sanNha(k, { time: 'night', gateOpen: true, moon: false }); ch(k, 1100, 990, 480, { ...BA_HAO, view: 'side', flip: true, face: after(k, 'c') ? 'angry' : 'fear', arms: after(k, 'c') ? 'point' : 'chest', talk: k.t < k.cue('d') ? 0.6 : 0 }); const m = ch(k, 820, 990, 480, { ...ME, view: 'side', face: 'blank', arms: 'down' }); notRuoi(k, m, 480, { dx: 0.06 }); dimNight(k, [{ x: 960, y: 760, r: 640, warm: 1 }], 0.76); quote(k, '"Mụ ấy dắt cả con tôi về."', 'c', { color: AMBER, size: 60 }); },
    },
    {
      say: '{a}Mẹ tôi khoá cửa từ trong, giấu chìa khoá dưới gối tôi, sợ mình lại mộng du. {b}Đêm ấy, mẹ không đi đâu. {c}Nhưng sáng ra, mẹ bảo, cả đêm mẹ mơ thấy mình đứng dưới nước, chân lạnh buốt, có ai cứ đếm mãi bên tai.',
      sfx: [['click', 'a', 0.35], ['heartbeat', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { inNight(k); const m = ch(k, 1000, 990, 470, { ...ME, view: 'side', face: 'blank', arms: 'hold' }); notRuoi(k, m, 470, { dx: 0.06 }); dimNight(k, [LAMP], after(k, 'b') ? 0.5 : 0.8); return; }
        mat(k, ME, { face: 'sad', arms: 'chest', mole: true, warm: 1 }); quote(k, 'Có ai cứ đếm mãi bên tai.', 'c', { color: COLD, size: 58 });
      },
    },
    {
      say: '{a}Mùng ba tháng Tư, lễ trăm ngày bà Câm. Chiều ấy trời oi, mây đen kéo về từ phía sông. Mẹ bê mâm cỗ ra bãi tha ma. {b}Cả làng chẳng ai đến, trừ ông Từ, tôi, và lũ bạn tôi đứng nép sau bụi duối. {c}Rồi bà Hảo đến. Bà không đến để thắp hương. Bà đến để hất đổ mâm cỗ.',
      sfx: [['thunder', 'a', 0.3], ['stinger', 'c', 0.45]],
      draw(k) {
        baiMo(k, { time: 'dusk' }); moMoi(k, 1300, 880);
        if (k.t < k.cue('c')) { mam(k, 1050, 930, 0.8); const m = ch(k, 860, 990, 480, { ...ME, face: 'sad', arms: 'chest' }); notRuoi(k, m, 480); if (after(k, 'b')) { ch(k, 560, 990, 460, { ...ONG_TU, face: 'sad', arms: 'chest' }); [TOI, COI, BIN, MAN, LY].forEach((p, i) => ch(k, 90 + i * 90, 1000, 260, { ...p, face: 'fear', arms: 'chest' })); } dimDusk(k, 1000); tag(k, 'MÙNG 3 THÁNG TƯ · LỄ TRĂM NGÀY', 'a'); return; }
        mam(k, 1050, 930, 0.8); const m = ch(k, 860, 990, 480, { ...ME, face: 'shock', arms: 'chest' }); notRuoi(k, m, 480); ch(k, 1640 - k.at('c', 2, 'out') * 300, 990, 480, { ...BA_HAO, view: 'side', flip: true, action: k.t < k.cue('c', 2) ? 'walk' : 'stand', face: 'angry', arms: 'point' }); dimDusk(k, 1100);
      },
    },
    {
      say: '{a}Mâm cỗ đổ tung trên cỏ. Bà Hảo gào lên: {q}con tôi không có mộ, sao mụ ấy lại có! Mười chín năm, tôi không có chỗ thắp cho con tôi một nén hương! {b}Mẹ tôi quỳ xuống giữa đám xôi thịt đổ, quay mặt về phía bà Hảo.',
      sfx: [['whoosh', 'a', 0.45], ['thunder', 'q', 0.3]],
      draw(k) { baiMo(k, { time: 'dusk' }); moMoi(k, 1300, 880); mamDo(k, 980, 960); ch(k, 1300, 990, 480, { ...BA_HAO, view: 'side', flip: true, face: 'cry', tears: 1, arms: 'point', talk: 0.7 }); const m = ch(k, 760, after(k, 'b') ? 960 : 990, after(k, 'b') ? 400 : 480, { ...ME, view: 'side', action: after(k, 'b') ? 'kneel' : 'stand', face: 'sad', arms: 'chest' }); notRuoi(k, m, after(k, 'b') ? 400 : 480, { dx: 0.06 }); dimDusk(k, 1000); quote(k, '"Con tôi không có mộ, sao mụ ấy lại có!"', 'q', { color: PAPER, size: 56, until: 'b' }); },
    },
    {
      say: '{a}Mẹ nói: bác Hảo ơi, hôm ấy không phải cô Nhàn dắt em Tũn ra bến. {b}Là cháu. {c}Em Tũn khóc đòi xem thuyền, cháu dắt em ra bến chơi, trong lúc cô Nhàn nấu cháo. Em trượt chân. Cháu sợ quá, đứng chết trân trên bậc đá. Cô Nhàn nghe cháu hét, mới chạy ra, lao xuống.',
      sfx: [['stinger', 'b', 0.5]],
      draw(k) {
        if (k.t < k.cue('c')) { mat(k, ME, { face: 'cry', tears: 1, arms: 'chest', talk: 0.5, mole: true, warm: 0.8 }); quote(k, '"Là cháu."', 'b', { color: AMBER, size: 84 }); return; }
        benDo(k, { time: 'day' }); ch(k, BDO.step.x - 40, 930, 300, { ...ME_NHO, view: 'side', face: 'shock', arms: 'cover' }); if (after(k, 'c', 6)) ch(k, 260 + k.at(k.cue('c', 6), 2) * 300, 990, 480, { ...CO_NHAN, view: 'side', action: 'walk', face: 'shock', arms: 'point' }); dimDay(k); cold(k, 0.6); tag(k, 'HÈ NĂM 1975', 'c');
      },
    },
    {
      say: '{a}Người ta hỏi. Cháu sợ bị đánh, cháu nói dối là cô dắt em ra. {b}Cô Nhàn nghe hết. Cô nhìn cháu. Cô biết, chỉ cần cô nói một câu, cả làng sẽ quay sang một đứa trẻ mười hai tuổi. {c}Nên cô không nói. Không phải chỉ hôm ấy. {d}Mà mười chín năm.',
      sfx: [['heartbeat', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { mat(k, CO_NHAN, { face: 'sad', arms: 'down', warm: 0.3 }); cold(k, 0.6); return; }
        hien(k, { cam: true, time: 'dusk', who: [], xs: [] }); dimDusk(k, 1500); quote(k, 'Mười chín năm.', 'd', { color: AMBER, size: 80 });
      },
    },
    {
      say: '{a}Túm gạo gói lá chuối trước cửa kho mỗi đầu tháng, là của mẹ tôi. Mười mấy năm, mẹ chỉ dám làm đến thế. {b}Mẹ bảo, nhiều lần mẹ định nói ra. Lần nào cũng vậy, mẹ đến góc hiên đình, bà Câm lại nhìn mẹ, lắc đầu, rất khẽ.',
      draw(k) {
        if (k.t < k.cue('b')) { kho(k, { time: 'night', gao: true }); const m = ch(k, 760, 990, 470, { ...ME, view: 'side', flip: true, action: 'walk', face: 'sad', arms: 'down' }); notRuoi(k, m, 470, { dx: -0.06 }); dimNight(k, [{ x: 900, y: 800, r: 560 }], 0.78); quote(k, 'Túm gạo là của mẹ tôi.', 'a', { color: AMBER, size: 58 }); return; }
        dinh(k, { time: 'dusk' }); ch(k, 1555, 860, 380, { ...BA_CAM, action: 'sit', face: 'sad', arms: 'down', tilt: Math.sin(k.t * 2.2) * 6 }); const m = ch(k, 1180, 990, 480, { ...ME, view: 'side', face: 'cry', tears: 0.6, arms: 'chest' }); notRuoi(k, m, 480, { dx: 0.06 }); dimDusk(k, 1400);
      },
    },
    {
      say: '{a}Bà Hảo đứng như trời trồng. Rồi bà khuỵu xuống, đấm vào ngực mình, khóc như mười chín năm chưa từng được khóc. {b}Bà bò đến bên nấm mộ mới, áp mặt vào đất: {q}Nhàn ơi. Tôi nhổ vào mặt cô. Mười chín năm, tôi nhổ vào mặt cô.',
      draw(k) { baiMo(k, { time: 'dusk' }); moMoi(k, 1300, 880); mamDo(k, 980, 960); ch(k, after(k, 'b') ? 1120 : 1300, 950, 400, { ...BA_HAO, view: 'side', action: 'kneel', face: 'cry', tears: 1, arms: after(k, 'b') ? 'point' : 'cover', talk: after(k, 'q') ? 0.6 : 0 }); const m = ch(k, 700, 960, 400, { ...ME, view: 'side', action: 'kneel', face: 'cry', tears: 1, arms: 'chest' }); notRuoi(k, m, 400, { dx: 0.06 }); dimDusk(k, 1000); quote(k, '"Nhàn ơi. Tôi nhổ vào mặt cô."', 'q', { color: AMBER, size: 60 }); },
    },
    {
      say: '{a}Trời đổ mưa. Không ai về. {b}Mẹ tôi và bà Hảo ngồi hai bên nấm mộ, ướt sũng, đến tận lúc tối mịt.',
      sfx: [['thunder', 'a', 0.35]],
      draw(k) { baiMo(k, { time: 'night', moon: false }); moMoi(k, 960, 900); const m = ch(k, 640, 950, 400, { ...ME, view: 'side', action: 'kneel', face: 'sad', arms: 'chest' }); notRuoi(k, m, 400, { dx: 0.06 }); ch(k, 1280, 950, 400, { ...BA_HAO, view: 'side', flip: true, action: 'kneel', face: 'sad', arms: 'chest' }); dimNight(k, [{ x: 960, y: 800, r: 760 }], 0.7); mua(k, 1); },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Tè he chân rụt',
      say: '{a}Đêm ấy mưa tạnh. Mẹ tôi mang chiếc chiếu cũ của bà Câm ra hiên đình, trải đúng chỗ góc cột lim. {b}Mẹ gọi tôi, gọi cả thằng Còi, thằng Bin, cái Mận, cái Ly. Mẹ bảo: các con ngồi xuống. Chơi một ván. Ván cuối.',
      draw(k) { dinh(k, { time: 'night', cx0: 300, cx1: 1640 }); oil(k, LAMPD.x, 900, 1.2); const m = ch(k, 1100, 990, 480, { ...ME, view: 'side', face: 'sad', arms: 'hold', talk: after(k, 'b') ? 0.5 : 0 }); notRuoi(k, m, 480, { dx: 0.06 }); if (after(k, 'b')) KIDS.forEach((p, i) => ch(k, 1350 + i * 110, 995, 300, { ...p, view: 'side', flip: true, face: 'fear', arms: 'down' })); dimNight(k, [LAMPD, { x: 1200, y: 760, r: 600, warm: 1 }], 0.78); chapter(k, 5, 'Tè He Chân Rụt'); },
    },
    {
      say: '{a}Năm đứa chúng tôi ngồi duỗi chân. Mẹ tôi ngồi xuống cuối hàng, cũng duỗi chân ra. {b}Và bà Hảo, lặng lẽ, ngồi xuống cạnh mẹ. {c}Mẹ đặt ngọn đèn dầu ở đầu chiếu. Mẹ bảo tôi đọc.',
      draw(k) {
        dinh(k, { time: 'night', cx0: 260, cx1: 1680 }); oil(k, LAMPD.x - 40, 900, 1.2); const xs = [480, 640, 800, 960, 1120];
        KIDS.forEach((p, i) => ngoiDuoi(k, xs[i], 770, 230, p, { face: 'fear' })); const m = ngoiDuoi(k, 1300, 760, 290, ME, { face: 'sad' }); notRuoi(k, m, 290); if (after(k, 'b')) ngoiDuoi(k, 1490, 760, 290, BA_HAO, { face: 'sad' });
        dimNight(k, [LAMPD, { x: 1000, y: 800, r: 820, warm: 1, flicker: 1 }], 0.74);
      },
    },
    {
      say: '{a}Tôi đếm trước. Năm đứa, mười bàn chân. Mẹ, bà Hảo, bốn bàn chân nữa. Mười bốn. {b}Cuối hàng, sát cạnh chân bà Hảo, mẹ chừa ra một khoảng chiếu trống, rộng vừa một bàn chân. {c}Không ai hỏi vì sao.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) {
        const feet = [...FEET10, ...pair(ME), ...pair(BA_HAO)];
        chieuGan(k, feet, { x0: 150, x1: 1666, s: 0.78, dk: -0.25 }); if (!after(k, 'b')) dap(k, 14, Math.min(0.999, k.at('a', Math.max(2, k.cue('b') - k.cue('a') - 0.3), 'linear')), { x0: 150, x1: 1666 }); dimNight(k, [{ x: 200, y: 700, r: 1500, warm: 1, flicker: 1 }, ...(after(k, 'b') ? [{ x: 1790, y: 800, r: 260 }] : [])], 0.5);
        quote(k, 'Một khoảng chiếu trống, rộng vừa một bàn chân.', 'b', { color: AMBER, size: 56, y: 160 });
      },
    },
    {
      say: '{a}Tôi đọc. Nu na nu nống. Cái cống nằm trong. Cái ong nằm ngoài. Tay tôi đập từng bàn chân. Củ khoai chấm mật. Phật ngồi Phật khóc. {b}Đến câu: con cóc nhảy ra, bà Hảo đọc theo. Giọng bà khàn, nhỏ, như lâu lắm rồi chưa dùng đến. Rồi mẹ tôi đọc theo. Rồi cả bọn.',
      sfx: [['heartbeat', 'b', 0.35]],
      draw(k) {
        const feet = [...FEET10, ...pair(ME), ...pair(BA_HAO)]; chieuGan(k, feet, { x0: 150, x1: 1666, s: 0.78, dk: -0.25 });
        dap(k, 15, (k.at('a', Math.max(3, k.d - 1), 'linear') * 2.6) % 1, { x0: 150, x1: 1780 }); dimNight(k, [{ x: 200, y: 700, r: 1500, warm: 1, flicker: 1 }], 0.5);
        quote(k, '"Con cóc nhảy ra…"', 'b', { color: COLD, size: 64, y: 160 });
      },
    },
    {
      say: '{a}Con gà ú ụ. Nhà mụ thổi xôi. Nhà tôi nấu chè. {b}Mẹ tôi bịt miệng, nước mắt chảy ròng ròng. Mười chín năm, đó là lần đầu tiên bài đồng dao của cô Nhàn được đọc lại, trên chính chiếc chiếu của cô. {c}Tè he. Chân rụt.',
      sfx: [['click', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) { mat(k, ME, { face: 'cry', tears: 1, arms: 'cover', mole: false, warm: 1 }); return; }
        const feet = [...FEET10, ...pair(ME), ...pair(BA_HAO)]; chieuGan(k, feet, { x0: 150, x1: 1666, s: 0.78, dk: -0.25 }); banTayDap(k, 1790, 640, 0.9); dimNight(k, [{ x: 1600, y: 760, r: 1100, warm: 1, flicker: 1 }], 0.5); quote(k, 'Tè he. Chân rụt.', 'c', { color: AMBER, size: 70, y: 160 });
      },
    },
    {
      say: '{a}Tiếng cuối rơi đúng vào khoảng chiếu trống. Không có bàn chân nào ở đó để co lại. {b}Mẹ đặt bàn tay lên khoảng chiếu ấy, giữ rất lâu. Mái đình còn nhỏ giọt sau cơn mưa. {c}Ngọn đèn dầu chao đi một cái. Lúc mẹ nhấc tay lên, chỗ ấy có một vệt nước ướt.',
      sfx: [['drip', 'b', 0.3], ['wind', 'c', 0.3]],
      draw(k) {
        if (k.t < k.cue('c')) { const feet = [...FEET10, ...pair(ME), ...pair(BA_HAO)]; chieuGan(k, feet, { x0: 150, x1: 1666, s: 0.78, dk: -0.25 }); banTayDap(k, 1790, after(k, 'b') ? 760 : 640, 0.9, ME.skin); dimNight(k, [{ x: 1600, y: 760, r: 1100, warm: 1, flicker: 1 }], 0.5); return; }
        dinh(k, { time: 'night' }); const { ctx } = k; ctx.fillStyle = 'rgba(150,170,190,0.35)'; ctx.beginPath(); ctx.ellipse(1560, 960, 60, 24, 0.1, 0, Math.PI * 2); ctx.fill(); oil(k, LAMPD.x, 900, 1.2); dimNight(k, [LAMPD, { x: 1560, y: 900, r: 480 }], 0.8); quote(k, 'Chỗ ấy có một vệt nước ướt.', 'c', { color: COLD, size: 60 });
      },
    },
    {
      say: '{a}Từ hôm ấy, không ai còn thấy bàn chân bốn ngón nữa. Mẹ tôi không còn mộng du ra bến sông. {b}Bà Hảo bỏ tiền xây lại mộ cô Nhàn, khắc đủ tên tuổi. Mẹ tôi và bà Hảo, từ đấy, năm nào cũng cùng nhau đi giỗ cô.',
      draw(k) {
        if (k.t < k.cue('b')) { benDo(k, { time: 'day' }); dimDay(k); return; }
        baiMo(k, { time: 'day' }); moMoi(k, 960, 900, { bia: true }); const m = ch(k, 680, 990, 480, { ...ME, view: 'side', face: 'calm', arms: 'chest' }); notRuoi(k, m, 480, { dx: 0.06 }); ch(k, 1240, 990, 480, { ...BA_HAO, view: 'side', flip: true, face: 'calm', arms: 'chest' }); dimDay(k);
      },
    },

    // ===== KẾT =====
    {
      say: '{a}Tối hôm sau, mẹ ngồi với tôi bên đèn dầu. Mẹ đặt tấm ảnh nhà trẻ lên bàn thờ nhà tôi, cạnh bát hương. {b}Mẹ bảo: mẹ nợ cô ấy một câu nói thật. Mẹ trả muộn mất mười chín năm. {c}Rồi mẹ kể cho tôi nghe về cô Nhàn ngày xưa. Cô hát hay nhất làng, bế đứa nào cũng ru được đến ngủ. {d}Và cô có một cái tật: chơi nu na nu nống với trẻ con, bao giờ cô cũng đếm thừa một tiếng vào khoảng chiếu trống ở cuối hàng. Cô bảo, đếm thừa cho may.',
      draw(k) {
        if (k.t < k.cue('c')) { inNight(k); const m = ch(k, 1000, 990, 470, { ...ME, action: 'sit', view: 'side', flip: true, face: 'sad', arms: 'hold', talk: after(k, 'b') ? 0.4 : 0 }); notRuoi(k, m, 470, { dx: -0.06 }); ch(k, 760, 995, 300, { ...TOI, action: 'sit', view: 'side', face: 'calm', arms: 'down' }); dimNight(k, [LAMP], 0.74); return; }
        if (k.t < k.cue('d')) { dinh(k, { time: 'day' }); ch(k, 960, 990, 500, { ...CO_NHAN, face: 'happy', arms: 'hold', talk: 0.5 }); dimDay(k); cold(k, 0.55); return; }
        chieuGan(k, [...FEET10.slice(0, 8), null], { x1: 1690, s: 1.02 }); dap(k, 9, Math.min(0.999, k.at('d', Math.max(3, k.d - k.cue('d') - 1), 'linear')), { x1: 1690 }); shade(k, 0.3, [DAY], { vig: 0.5 }); cold(k, 0.55); quote(k, '"Đếm thừa cho may."', 'd', { color: AMBER, size: 62, y: 160 });
      },
    },
    {
      say: '{a}Nhưng có một chuyện, chỉ mình tôi thấy, và tôi chưa kể với ai. {b}Đêm hôm ấy, lúc mọi người đã về, tôi quay lại hiên đình cuộn chiếc chiếu. Trên mặt chiếu, chỗ cuối hàng, có hai vệt nước. {c}Một vệt to, dài bằng bàn chân người lớn. {d}Và một vệt nhỏ xíu bên cạnh, bằng bàn chân đứa trẻ lên ba.',
      sfx: [['drip', 'c', 0.4], ['stinger', 'd', 0.5]],
      draw(k) {
        if (k.t < k.cue('c')) { dinh(k, { time: 'night' }); ch(k, 1000, 995, 330, { ...TOI, view: 'side', face: 'calm', arms: 'hold' }); dimNight(k, [{ x: 1000, y: 820, r: 540 }], 0.8); return; }
        black(k, '#2a1e14'); chieu(k, -60, 1980, 0, 1120, { skew: 0, old: true }); { const { ctx } = k; ctx.fillStyle = 'rgba(40,50,64,0.5)'; ctx.beginPath(); ctx.ellipse(820, 720, 70, 170, 0, 0, Math.PI * 2); ctx.fill(); if (after(k, 'd')) { ctx.beginPath(); ctx.ellipse(1180, 800, 30 * k.at('d', 1), 62 * k.at('d', 1), 0.1, 0, Math.PI * 2); ctx.fill(); } } shade(k, 0.45, [{ x: 960, y: 640, r: 760 }], { vig: 0.6 }); cold(k, 0.35);
      },
    },
    {
      say: '{a}Mẹ tôi tin, cô Nhàn đã tha thứ, rồi đi. {b}Ông Từ thì bảo khác. Mười chín năm, người ta mò không thấy xác thằng Tũn. Có lẽ suốt mười chín năm ấy, cô Nhàn cũng đi tìm. {c}Và đêm hôm ấy, cô tìm thấy rồi. {d}Hoặc là, nó đã tìm thấy cô.',
      sfx: [['wind', 'b', 0.3], ['heartbeat', 'd', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, ME, { face: 'calm', arms: 'chest', mole: true, warm: 0.8 }); return; }
        benDo(k, { time: 'night' }); dauChan4(k, [[BDO.step.x - 40, 980, 0], [BDO.step.x + 40, 1040, 0]], { color: 'rgba(170,190,210,0.42)', s: 0.9 }); if (after(k, 'c')) dauChan4(k, [[BDO.step.x + 120, 1000, 0], [BDO.step.x + 170, 1050, 0]], { color: 'rgba(170,190,210,0.42)', s: 0.42 }); dimNight(k, [{ x: BDO.step.x, y: 920, r: 560 }], 0.76); quote(k, 'Hoặc là, nó đã tìm thấy cô.', 'd', { color: COLD, size: 60 });
      },
    },
    {
      say: '{a}Năm nay tôi bốn mươi hai tuổi. Mẹ tôi đã ngoài sáu mươi. Tết nào về quê, mẹ cũng ra hiên đình, ngồi duỗi chân trên chiếu với lũ trẻ con trong xóm, dạy chúng nó chơi nu na nu nống. {b}Mẹ dạy đúng như cô Nhàn đã dạy mẹ, năm mẹ mười hai tuổi.',
      draw(k) { const kids = [BIN, MAN, COI, LY, TOI].map((p) => ({ ...p, top: p.top })); hien(k, { who: [...kids, ME_GIA], xs: [420, 590, 760, 930, 1100, 1320], each: (i) => (i === 5 ? { talk: 0.4, face: 'happy' } : {}) }); dimDay(k); tag(k, 'NĂM NAY', 'a'); },
    },
    {
      say: '{a}Tết vừa rồi, tôi đứng ở cổng đình nhìn mẹ chơi. Năm đứa trẻ, cộng mẹ tôi, mười hai bàn chân. {b}Mẹ đọc, tay đập từng bàn chân. Đến cuối hàng, mẹ dừng lại, mỉm cười, rồi đập thêm một tiếng vào khoảng chiếu trống. {c}Như bao năm nay vẫn thế.',
      sfx: [['click', 'b', 0.3]],
      draw(k) {
        const feet = [...[BIN, MAN, COI, LY, TOI].flatMap(pair), ...pair(ME_GIA), null]; chieuGan(k, feet, { x0: 170, x1: 1760, s: 0.9 }); const p = after(k, 'b') ? Math.min(0.999, k.at('b', 5, 'linear')) : 0.02; dap(k, 13, p, { x0: 170, x1: 1760 }); dimDay(k);
      },
    },
    {
      say: '{a}Tôi đếm lại. Mười hai bàn chân. Nhưng trên khoảng chiếu trống ấy, có một vệt nước nhỏ, bằng bàn chân đứa trẻ lên ba. {b}Năm 1994, năm đứa chúng tôi ngồi chơi nu na nu nống. Năm đứa, mười bàn chân. {c}Ba mươi hai năm rồi, tôi vẫn chưa dám hỏi mẹ, tiếng đếm thừa ấy, mẹ đếm cho ai.',
      tail: 2.5,
      sfx: [['drip', 'a', 0.4], ['heartbeat', 'c', 0.4]],
      draw(k) {
        const feet = [...[BIN, MAN, COI, LY, TOI].flatMap(pair), ...pair(ME_GIA), null]; chieuGan(k, feet, { x0: 170, x1: 1760, s: 0.9 }); dauChan4(k, [[1760, 900, 0.1]], { color: 'rgba(40,50,64,0.55)', s: 1.1 * k.at('a', 2), flat: 1 }); shade(k, after(k, 'b') ? 0.55 : 0.3, [{ x: 1700, y: 800, r: 700 }], { vig: 0.55 });
        quote(k, 'Tiếng đếm thừa ấy, mẹ đếm cho ai?', 'c', { color: AMBER, size: 60, y: 160 });
      },
    },

    // ===== CUỐI =====
    nextScene({
      say: '{next}Tập sau: năm 1998, ở một xóm kênh miền Tây. Nửa đêm, có một đám rước đi ngang qua bờ kênh trước nhà tôi. Có trống, có cờ, có đèn lồng. Nhưng không có một bóng người. Chỉ có tiếng trẻ con hát: bắc kim thang, cà lang bí rợ.',
      title: 'Bắc Kim Thang | Đám Rước Không Người',
      hook: 'Có trống, có cờ, có đèn lồng. Không có một bóng người.',
      art(k) { const { ctx } = k, t = k.gt ?? 0; black(k, '#0c1420'); ctx.fillStyle = '#16202c'; ctx.fillRect(400, 560, 1120, 240); ctx.strokeStyle = 'rgba(150,170,190,0.25)'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(420, 600 + i * 34); ctx.quadraticCurveTo(960, 590 + i * 34, 1500, 600 + i * 34); ctx.stroke(); } for (let i = 0; i < 6; i++) { const x = 520 + i * 180 + ((t * 30) % 180); ctx.strokeStyle = '#3a2c20'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, 540); ctx.lineTo(x, 330); ctx.stroke(); ctx.fillStyle = i % 2 ? '#b0342c' : '#d8a03c'; ctx.beginPath(); ctx.ellipse(x, 360 + Math.sin(t * 2 + i) * 6, 34, 44, 0, 0, Math.PI * 2); ctx.fill(); const g = ctx.createRadialGradient(x, 360, 5, x, 360, 110); g.addColorStop(0, 'rgba(255,180,90,0.35)'); g.addColorStop(1, 'rgba(255,180,90,0)'); ctx.fillStyle = g; ctx.fillRect(x - 110, 250, 220, 220); } },
    }),
    subScene({
      say: '{q}Nếu là bà Hảo, bạn có tha thứ cho mẹ tôi không? Hãy để lại câu trả lời. {sub}Và nếu muốn nghe tiếp những chuyện chưa có lời giải, hãy đăng ký Nhân Gian Chưa Kể.',
      question: 'Nếu là bà Hảo, bạn có tha thứ cho mẹ tôi không?',
      art(k) { dauChan4(k, [[900, 960, 0]], { color: 'rgba(180,196,210,0.5)', s: 1.1 }); dauChan4(k, [[1020, 990, 0]], { color: 'rgba(180,196,210,0.5)', s: 0.5 }); },
    }),
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
