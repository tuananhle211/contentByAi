// Nhân Gian Chưa Kể — tập Ông Ba Bị | Nhà Mày Mấy Đứa? Kịch bản + sổ dữ kiện: kich-ban.md.
// Công thức Gọi Hồn: câu dọa ai cũng biết + biết điều chỉ người trong cuộc biết (đếm thiếu một, tên Hoa) + bí mật người sống hai lớp
// (bà trao cháu đi, mẹ biết mà không gọi lại) + ba điều cấm bị phạm + hai danh tính không chọn. Không vẽ ma, em bé chỉ là bọc chăn hoa.
import * as thumbs from '/videos/124-ong-ba-bi-nha-may-may-dua/thumbs.js';
import { PAPER, AMBER, COLD, shade, cold, tag, quote, chapter, rules, nextScene, subScene, oil, bowl, kitchen, KITCHEN } from '/channel/nhan-gian.js';
import { buong, net, duongDe } from '/channel/nhan-gian-cauco.js';
import {
  HANH, CUN, ME, ME_GIA, BA, THAM, DUNG, BA_TU, LAI_DO, ONG, ch, lie, bi, ongGia, vaiHoa, chan, boc, aoCuoi, anhCuoi, giay, dan, ganh, luaNho, suong, muaPhun, dauChan, nonUp,
  gocDa, DA, oAnQuan, sanNha, SAN, congNha, CONG, vuonNa, NA, gianNha, GIAN, mam, benDo, BDO, baiMo, sepia,
} from '/channel/nhan-gian-babi.js';

const ONG_S = ONG; // ông già khi đã đặt bị xuống
const after = (k, c, off = 0) => k.t > k.cue(c, off);
const black = (k, c = '#07060a') => { k.ctx.fillStyle = c; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); };
const zoom = (k, cx, cy, s, fn) => k.group({ x: cx, y: cy, s }, () => k.group({ x: -cx, y: -cy }, fn));
const grain = (sc) => ({ ...sc, draw(k) { const s = 1 + 0.05 * Math.min(1, k.t / Math.max(1, k.d)); k.group({ x: k.W / 2, y: k.H / 2, s }, () => k.group({ x: -k.W / 2, y: -k.H / 2 }, () => sc.draw(k))); sepia(k, 0.75); } });
const DAY = { x: 1500, y: 300, r: 1700 };
const LAMP = { x: GIAN.lamp.x, y: GIAN.lamp.y - 70, r: 680, warm: 1, flicker: 1 };
const MOON = { x: 1560, y: 170, r: 1200 };
const dimDay = (k) => shade(k, 0.2, [DAY], { vig: 0.4 });
const dimDusk = (k, x = 1400) => shade(k, 0.46, [{ x, y: 420, r: 1300, warm: 1 }], { vig: 0.5 });
const dimNight = (k, l = [MOON], a = 0.66) => shade(k, a, l, { vig: 0.5 });
// Gian trong ban đêm, đèn dầu trên bàn con.
const inNight = (k, o = {}) => { gianNha(k, o); oil(k, GIAN.lamp.x, 682, 1); };
// Cái bị cận cảnh trên nền tối.
function biClose(k, o = {}) { black(k, '#120d09'); bi(k, 960, 960, 2.55, { breathe: 1, eyes: 0.7, ...o }); shade(k, 0.5, [{ x: 960, y: 560, r: 760, warm: 0.7, flicker: 1 }], { vig: 0.6 }); }
// Nồi cơm trên tay.
function noi(k, x, y, s = 1, lid = 1) { const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#3a342e'; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-58, -30); ctx.bezierCurveTo(-64, 34, 64, 34, 58, -30); ctx.closePath(); ctx.fill(); ctx.stroke(); if (lid) { ctx.fillStyle = '#58504a'; ctx.beginPath(); ctx.ellipse(0, -32, 60, 15, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); } ctx.restore(); }
// Hàng giày to dần: n đôi hiện lần lượt từ cue.
function hangGiay(k, cue, n = 6, y = 700) { for (let i = 0; i < n; i++) { const p = k.at(k.cue(cue, i * 0.7), 0.6); if (p <= 0) continue; const s = (0.42 + i * 0.13) * p; giay(k, 250 + i * 285, y, s); k.text(String(1989 + i), 250 + i * 285, y + 64, { size: 34, font: 'title', color: AMBER, fx: 'fade', p }); } }
// Bữa cơm trong gian: bà, Hạnh, Cún ngồi quanh mâm.
function bua(k, o = {}) { inNight(k, { chieu: true }); ch(k, 620, 985, 400, { ...BA, action: 'sit', view: 'side', face: o.ba ?? 'calm', arms: 'hold' }); ch(k, 960, 930, 300, { ...HANH, action: 'sit', face: o.hanh ?? 'calm', arms: 'hold' }); ch(k, 1290, 985, 270, { ...CUN, action: 'sit', view: 'side', flip: true, face: o.cun ?? 'happy', arms: o.point ? 'point' : 'hold', talk: o.talk ?? 0 }); mam(k, 960, 985, 1); shade(k, 0.68, [LAMP, { x: 960, y: 900, r: 560, warm: 1, flicker: 1 }], { vig: 0.5 }); }

const video = {
  meta: {
    title: 'Ông Ba Bị | Nhà Mày Mấy Đứa? Tôi Đáp Hai, Ông Bảo Thiếu Một',
    description: `Năm 1994, xóm tôi có một ông ăn mày đeo cái bị chín quai. Đi ngang qua, trẻ con nghe trong bị có tiếng trẻ con gọi mẹ. Ông chỉ hỏi mỗi đứa một câu: nhà mày mấy đứa?
Tôi bảo nhà cháu hai đứa. Ông lắc đầu: đếm thiếu một.

Ba điều bà nội cấm, những đôi giày len mẹ đan mỗi năm một to hơn rồi đem đốt, và đêm mười bốn tháng Ba ở bến đò không chạy đêm.`,
    footer: `📖 Truyện hư cấu dựa trên câu dọa trẻ con "Ông Ba Bị chín quai mười hai con mắt" trong dân gian Việt Nam. Tên người, tên địa danh và tình tiết đều hư cấu.
🕯️ Nhân Gian Chưa Kể: những chuyện người xưa truyền tai nhau, mà chưa ai giải thích được.`,
    links: [['▶ Tập trước: Cầu Cơ', '121-cau-co-thang-ban-chet-duoi'], ['▶ Gọi Hồn', '106-goi-hon-nguoi-ve-goi-vo-la-chi'], ['🔔 Đăng ký', 'https://www.youtube.com/@nhangianchuake?sub_confirmation=1']],
    tags: ['ông ba bị', 'ông ba bị chín quai mười hai con mắt', 'truyện ông ba bị', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'chuyện tâm linh có thật', 'truyện ma làng quê', 'hoạt hình kinh dị', 'nhân gian chưa kể'],
    hashtags: ['truyenma', 'ongbabi', 'tamlinh'],
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
      say: '{a}Năm 1994, xóm tôi có một ông ăn mày đeo cái bị tải. {b}Đi ngang qua, trẻ con nghe trong bị có tiếng trẻ con gọi mẹ. {c}Ông không xin gì. Ông chỉ hỏi mỗi đứa một câu: {q}nhà mày mấy đứa?',
      sfx: [['wind', 0, 0.3], ['heartbeat', 'b', 0.4], ['stinger', 'q', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { gocDa(k, { time: 'dusk' }); ongGia(k, k.lerp(1760, 1120, k.at('a', 6, 'linear')), 960, 470, { view: 'side', flip: true, action: 'walk', face: 'blank' }); ch(k, 300, 985, 320, { ...DUNG, face: 'fear', arms: 'down' }); ch(k, 470, 975, 300, { ...HANH, face: 'fear', arms: 'chest' }); dimDusk(k); tag(k, 'NĂM 1994', 'a'); return; }
        if (k.t < k.cue('c')) { biClose(k); quote(k, '"Mẹ ơi…"', k.cue('b', 2), { color: COLD, size: 70 }); return; }
        gocDa(k, { time: 'dusk' }); zoom(k, 960, 560, 1.7, () => ongGia(k, 960, 980, 620, { face: 'blank', arms: 'down' })); dimDusk(k, 960); quote(k, '"Nhà mày mấy đứa?"', 'q', { color: AMBER, size: 66 });
      },
    },
    {
      say: '{a}Đứa nào trả lời, ông cũng gật đầu. Đến lượt tôi. Tôi bảo: {b}nhà cháu hai đứa. {c}Ông nhìn tôi rất lâu, rồi lắc đầu: {q}đếm thiếu một. {d}Năm ấy tôi chín tuổi. Phải hai ngày sau, tôi mới biết ông nói đúng, và cả nhà tôi đã nói dối nhau suốt sáu năm.',
      sfx: [['stinger', 'q', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { gocDa(k, { time: 'dusk' }); ongGia(k, 1240, 950, 480, { view: 'side', flip: true, face: 'blank', arms: 'point' }); ch(k, 640, 985, 340, { ...HANH, view: 'side', face: after(k, 'b') ? 'calm' : 'fear', arms: 'down', talk: after(k, 'b') ? 0.5 : 0 }); dimDusk(k, 1000); quote(k, '"Nhà cháu hai đứa."', 'b', { size: 58 }); return; }
        if (k.t < k.cue('d')) { black(k, '#1a130c'); zoom(k, 960, 400, 2.4, () => ongGia(k, 960, 800, 620, { face: 'blank', tilt: Math.sin(k.t * 2.6) * 7, sack: false })); shade(k, 0.5, [{ x: 960, y: 420, r: 720, warm: 1 }], { vig: 0.6 }); quote(k, '"Đếm thiếu một."', 'q', { color: AMBER, size: 76 }); return; }
        inNight(k); ch(k, 540, 950, 450, { ...BA, face: 'blank', arms: 'chest' }); ch(k, 1320, 950, 470, { ...ME, view: 'side', flip: true, face: 'blank', arms: 'down' }); ch(k, 930, 960, 330, { ...HANH, face: 'sad', arms: 'down' }); shade(k, 0.68, [LAMP, { x: 900, y: 650, r: 620, warm: 1, flicker: 1 }], { vig: 0.5 }); quote(k, 'Cả nhà tôi đã nói dối nhau suốt sáu năm.', k.cue('d', 4), { size: 54 });
      },
    },
    {
      say: '{a}Đây là Nhân Gian Chưa Kể. Nếu bạn muốn nghe tiếp những chuyện chưa có lời giải, hãy bấm đăng ký. {b}Còn bây giờ, xin bạn tắt bớt đèn.',
      draw(k) {
        black(k); const fade = 1 - k.at('b', 3, 'linear') * 0.7; oil(k, 960, 790, 2.1);
        shade(k, 0.84, [{ x: 960, y: 620, r: 680 * fade, warm: 1, flicker: 1 }], { vig: 0.5 });
        k.text('NHÂN GIAN CHƯA KỂ', 960, 300, { size: 92, font: 'title', color: AMBER, fx: 'fade', p: k.at('a', 1) * fade });
      },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Ông Ba Bị chín quai',
      say: '{a}Làng tôi ở đồng bằng Bắc Bộ. Đầu làng có cây đa, cuối làng có bến đò sang sông. {b}Trẻ con làng tôi, đứa nào cũng thuộc một câu: {q}Ông Ba Bị, chín quai, mười hai con mắt. {c}Đứa nào khóc đêm, đứa nào không chịu ngủ trưa, mẹ chỉ cần dọa: ông Ba Bị đến bắt bỏ vào bị bây giờ. Là im thin thít. {d}Người lớn còn đồn một câu, nửa đùa nửa thật: {r}đứa nào trả lời thật với ông Ba Bị, tháng ấy nhà ấy mất một đứa.',
      sfx: [['wind', 'b', 0.25], ['heartbeat', 'r', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { gocDa(k, { time: 'day' }); dimDay(k); chapter(k, 1, 'Ông Ba Bị chín quai'); return; }
        if (k.t < k.cue('c')) { biClose(k, { eyes: 0.3 + 0.6 * k.at('q', 3) }); quote(k, 'Ông Ba Bị, chín quai, mười hai con mắt', 'q', { color: AMBER, size: 58 }); return; }
        if (k.t < k.cue('d')) { inNight(k); ch(k, 800, 950, 470, { ...ME, view: 'side', face: 'angry', arms: 'point', talk: 0.5 }); ch(k, 1130, 950, 270, { ...CUN, view: 'side', flip: true, face: 'fear', arms: 'chest' }); shade(k, 0.66, [LAMP, { x: 950, y: 650, r: 600, warm: 1, flicker: 1 }], { vig: 0.5 }); return; }
        biClose(k, { eyes: 0.9 }); quote(k, 'Trả lời thật, tháng ấy nhà ấy mất một đứa.', 'r', { color: COLD, size: 58 });
      },
    },
    {
      say: '{a}Nhà tôi ở cuối xóm, có bà nội, mẹ, tôi, và thằng Cún, em trai tôi, lên bốn. {b}Bố tôi đi làm thợ xây trên Hà Nội, Tết mới về. {c}Mẹ tôi gánh rau ra chợ huyện bán, đi từ lúc gà gáy, tối mịt mới về. Ở nhà, bà nội trông hai chị em.',
      draw(k) {
        if (k.t < k.cue('c')) { sanNha(k, { time: 'day' }); ch(k, 560, 960, 450, { ...BA, face: 'calm', arms: 'hold' }); ch(k, 800, 975, 480, { ...ME, face: 'calm', arms: 'down' }); ch(k, 1020, 985, 330, { ...HANH, face: 'happy', arms: 'down' }); ch(k, 1190, 990, 265, { ...CUN, face: 'happy', arms: 'wave' }); dimDay(k); tag(k, 'NHÀ TÔI, CUỐI XÓM', 'a'); quote(k, 'Bố làm thợ xây trên Hà Nội, Tết mới về.', 'b', { size: 48, until: 'c' }); return; }
        duongDe(k, { time: 'dusk' }); const x = k.lerp(320, 1560, k.at('c', 9, 'linear')); ch(k, x, 900, 470, { ...ME, view: 'side', action: 'walk', hat: 'non', face: 'calm', arms: 'hold' }); ganh(k, x, 660, 1.05); shade(k, 0.5, [{ x: 1500, y: 400, r: 1200, warm: 1 }], { vig: 0.5 }); tag(k, 'TỪ LÚC GÀ GÁY', 'c');
      },
    },
    {
      say: '{a}Bà nội tôi không dọa ông Ba Bị như các nhà khác. Bà dặn, nghiêm như dặn chuyện sống chết. Gặp người lạ đeo bị, có ba điều phải nhớ. {r1}Một, người lạ hỏi nhà mình mấy đứa, không được trả lời. {r2}Hai, không được nhìn vào trong bị của người ta. {r3}Ba, trời tối rồi thì không đưa cho người lạ thứ gì qua cổng, dù chỉ là bát nước. {b}Tôi hỏi tại sao. Bà chỉ bảo: {q}đếm con cho người lạ nghe, là để người ta biết mà đến lấy.',
      sfx: [['click', 'r1', 0.3], ['click', 'r2', 0.3], ['click', 'r3', 0.3]],
      draw(k) {
        if (k.t < k.cue('r1')) { inNight(k); ch(k, 760, 950, 450, { ...BA, view: 'side', face: 'blank', arms: 'point', talk: 0.5 }); ch(k, 1120, 960, 330, { ...HANH, view: 'side', flip: true, face: 'calm', arms: 'down' }); shade(k, 0.62, [LAMP, { x: 900, y: 620, r: 640, warm: 1, flicker: 1 }], { vig: 0.5 }); return; }
        if (k.t < k.cue('b')) { black(k); rules(k, 960, 540, [['1. Không trả lời "nhà mấy đứa".', 'r1'], ['2. Không nhìn vào trong bị.', 'r2'], ['3. Trời tối, không đưa gì qua cổng.', 'r3']], { cue: 'r1', w: 1300 }); shade(k, 0.35, [{ x: 960, y: 540, r: 820, warm: 0.8, flicker: 1 }], { vig: 0.5 }); return; }
        inNight(k); zoom(k, 760, 560, 1.7, () => ch(k, 760, 950, 450, { ...BA, view: 'side', face: 'blank', arms: 'chest', talk: after(k, 'q') ? 0.5 : 0 })); shade(k, 0.6, [{ x: 800, y: 480, r: 720, warm: 1, flicker: 1 }], { vig: 0.5 }); quote(k, '"Đếm con cho người lạ nghe, là để người ta biết mà đến lấy."', 'q', { color: AMBER, size: 48 });
      },
    },
    {
      say: '{a}Mẹ tôi cũng có một điều lạ. Mẹ không bao giờ cho ai đếm con mình. Hàng xóm khen nhà chị được hai đứa ngoan, mẹ chỉ cười, không ừ, không gật. {b}Và mỗi năm, đúng ngày mười bốn tháng Ba âm lịch, mẹ ngồi bên đèn dầu, đan một đôi giày len nhỏ màu hồng. {c}Đan xong, mẹ mang ra gốc na sau vườn, đốt. {d}Đôi năm sau bao giờ cũng to hơn đôi năm trước một chút. {e}Tôi hỏi giày cho ai. Mẹ bảo: {q}cho người dưới ấy.',
      sfx: [['drip', 'c', 0.2]],
      draw(k) {
        if (k.t < k.cue('b')) { sanNha(k, { time: 'day' }); ch(k, 700, 975, 480, { ...ME, face: 'calm', arms: 'hold' }); ch(k, 1120, 975, 460, { ...BA_TU, hat: null, top: '#7a7a5a', view: 'side', flip: true, face: 'happy', arms: 'point', talk: 0.6 }); dimDay(k); return; }
        if (k.t < k.cue('c')) { inNight(k, { chieu: true }); ch(k, 1000, 960, 440, { ...ME, action: 'sit', face: 'sad', arms: 'hold' }); dan(k, 1000, 835, 1.5); shade(k, 0.74, [LAMP], { vig: 0.5 }); tag(k, 'MƯỜI BỐN THÁNG BA', 'b'); return; }
        if (k.t < k.cue('d')) { vuonNa(k, { time: 'night' }); ch(k, 800, 950, 440, { ...ME, action: 'kneel', view: 'side', face: 'sad', arms: 'hold' }); luaNho(k, NA.x + 130, 930, 0.9); giay(k, NA.x + 130, 930, 0.5, { color: '#a06a6e' }); shade(k, 0.72, [{ x: NA.x + 130, y: 860, r: 520, warm: 1, flicker: 1 }], { vig: 0.5 }); return; }
        if (k.t < k.cue('e')) { black(k); hangGiay(k, 'd', 3, 640); shade(k, 0.35, [{ x: 960, y: 560, r: 900, warm: 0.8 }], { vig: 0.5 }); return; }
        vuonNa(k, { time: 'night' }); ch(k, 800, 950, 440, { ...ME, action: 'kneel', view: 'side', face: 'blank', arms: 'hold' }); ch(k, 500, 970, 320, { ...HANH, view: 'side', face: 'calm', arms: 'down' }); luaNho(k, NA.x + 130, 930, 0.6); shade(k, 0.72, [{ x: NA.x + 130, y: 860, r: 520, warm: 1, flicker: 1 }], { vig: 0.5 }); quote(k, '"Cho người dưới ấy."', 'q', { color: COLD, size: 62 });
      },
    },
    {
      say: '{a}Trên tường nhà tôi có tấm ảnh cưới của bố mẹ, ảnh đen trắng. Mẹ mặc chiếc áo cánh hoa, hoa nhỏ li ti. {b}Chiếc áo ấy mẹ vẫn cất trong rương. Một lần bà mang ra phơi, {c}tôi thấy cả vạt sau bị cắt mất một mảng vuông, như ai lấy kéo khoét đi. {d}Tôi hỏi. Bà giật lấy chiếc áo, gấp lại, không nói gì.',
      draw(k) {
        if (k.t < k.cue('b')) { black(k, '#b8a680'); anhCuoi(k, 960, 540, 2.7); shade(k, 0.25, [{ x: 960, y: 500, r: 900, warm: 1 }], { vig: 0.6 }); return; }
        sanNha(k, { time: 'day', line: true });
        if (!after(k, 'd')) aoCuoi(k, 1300, 530, 0.78, { hole: after(k, 'c') ? 1 : 0, bg: '#c4b48c' });
        ch(k, 760, 975, 330, { ...HANH, view: 'side', face: after(k, 'c') ? 'shock' : 'calm', arms: after(k, 'c') && !after(k, 'd') ? 'point' : 'down' });
        if (after(k, 'd')) { ch(k, 1160, 965, 450, { ...BA, view: 'side', flip: true, face: 'angry', arms: 'hold' }); chan(k, 1085, 800, 0.46); }
        dimDay(k);
      },
    },
    {
      say: '{a}Tôi còn một ký ức, lờ mờ đến mức không biết là thật hay mơ. {b}Năm tôi lên ba, có một đêm mưa phùn rất lạnh, tôi thấy bà nội bế một cái bọc nhỏ quấn vải hoa, đi ra ngõ. {c}Trong buồng, mẹ tôi rên khe khẽ. {d}Rồi cổng khép lại. Sáng ra, không ai nói gì về đêm ấy cả.',
      sfx: [['wind', 0, 0.3], ['creak', 'd', 0.35]],
      draw(k) {
        sanNha(k, { time: 'night', gateOpen: !after(k, 'd') });
        const x = k.lerp(760, SAN.gate - 10, k.at('b', 8, 'linear')); if (!after(k, 'd')) { ch(k, x, 960, 440, { ...BA, view: 'side', action: 'walk', face: 'sad', arms: 'hold' }); boc(k, x + 34, 800, 0.62); }
        dimNight(k, [{ x: 1000, y: 560, r: 1000 }], 0.68); cold(k, 0.8); muaPhun(k, 0.8); tag(k, 'NĂM TÔI LÊN BA', 'a');
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Nhà mày mấy đứa?',
      say: '{a}Chiều mười hai tháng Ba năm 1994, tôi với cái Thắm và thằng Dũng đang chơi ô ăn quan dưới gốc đa đầu làng, thì ông ấy đến. {b}Một ông già gầy, đội cái nón mê rách, chân đất. Vai ông đeo một cái bị tải to, vá chằng vá đụp, những miếng vá tròn trông như những con mắt. {c}Quai bị là mấy sợi dây chão buộc chằng chịt. Thằng Dũng đếm, rồi hét lên: {q}chín quai! Ông Ba Bị!',
      sfx: [['wind', 'b', 0.25], ['stinger', 'q', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) {
          gocDa(k, { time: 'dusk' }); oAnQuan(k, 1040, 975, 0.8);
          ch(k, 780, 985, 300, { ...THAM, action: 'sit', view: 'side', face: 'happy', arms: 'point' }); ch(k, 1290, 985, 310, { ...DUNG, action: 'sit', view: 'side', flip: true, face: 'happy', arms: 'point' }); ch(k, 1040, 925, 290, { ...HANH, action: 'sit', face: 'happy', arms: 'hold' });
          if (after(k, 'b')) ongGia(k, k.lerp(2120, 1620, k.at('b', 6, 'linear')), 950, 480, { view: 'side', flip: true, action: k.at('b', 6, 'linear') < 1 ? 'walk' : 'stand', face: 'blank' });
          dimDusk(k, 1100); tag(k, '12 THÁNG BA · 1994', 'a'); chapter(k, 2, 'Nhà mày mấy đứa?'); return;
        }
        const n = Math.min(9, Math.floor(k.at('c', Math.max(2, k.cue('q') - k.cue('c') - 0.3), 'linear') * 9.99));
        biClose(k, { hi: n, eyes: 0.7 }); k.text(String(n), 1620, 300, { size: 180, font: 'title', color: AMBER, fx: 'fade', p: n > 0 ? 1 : 0, outline: '#000', outlineWidth: 12 });
        quote(k, '"Chín quai! Ông Ba Bị!"', 'q', { color: AMBER, size: 66 });
      },
    },
    {
      say: '{a}Cả ba đứa dạt ra. Nhưng ông không đuổi. Ông đặt cái bị xuống gốc đa, ngồi xuống, rồi hỏi thằng Dũng, giọng khàn khàn: {q}nhà mày mấy đứa? {b}Dũng lí nhí: ba đứa ạ. {c}Ông gật: đủ. {d}Ông hỏi cái Thắm. Thắm bảo bốn. {e}Ông lại gật: đủ.',
      draw(k) {
        gocDa(k, { time: 'dusk' }); bi(k, 470, 950, 0.82, { eyes: 0.6 }); ch(k, 760, 965, 430, { ...ONG_S, action: 'sit', view: 'side', face: 'blank', arms: 'hold', tilt: (after(k, 'c') && !after(k, 'd')) || after(k, 'e') ? Math.sin(k.t * 5) * 6 : 0 });
        ch(k, 1170, 985, 330, { ...DUNG, view: 'side', flip: true, face: 'fear', arms: 'chest', talk: after(k, 'b') && !after(k, 'c') ? 0.5 : 0 }); ch(k, 1400, 985, 310, { ...THAM, view: 'side', flip: true, face: 'fear', arms: 'chest', talk: after(k, 'd') && !after(k, 'e') ? 0.5 : 0 }); ch(k, 1620, 985, 320, { ...HANH, view: 'side', flip: true, face: 'fear', arms: 'down' });
        dimDusk(k, 1000); quote(k, '"Nhà mày mấy đứa?"', 'q', { color: AMBER, size: 58, until: 'b' }); quote(k, '"Đủ."', 'c', { size: 80, until: 'd' }); quote(k, '"Đủ."', 'e', { size: 80 });
      },
    },
    {
      say: '{a}Đến lượt tôi. Tôi quên mất lời bà dặn. Tôi bảo: {b}nhà cháu hai đứa. {c}Ông ngẩng lên. Dưới vành nón, mắt ông đục như nước ao. {d}Ông nhìn tôi rất lâu, rồi lắc đầu: {q}đếm thiếu một.',
      sfx: [['heartbeat', 'c', 0.45], ['stinger', 'q', 0.5]],
      draw(k) {
        if (k.t < k.cue('c')) { gocDa(k, { time: 'dusk' }); zoom(k, 1100, 620, 1.5, () => { ch(k, 760, 965, 430, { ...ONG_S, action: 'sit', view: 'side', face: 'blank', arms: 'hold' }); ch(k, 1250, 985, 340, { ...HANH, view: 'side', flip: true, face: 'fear', arms: 'chest', talk: after(k, 'b') ? 0.6 : 0 }); }); dimDusk(k, 1000); quote(k, '"Nhà cháu hai đứa."', 'b', { size: 58 }); return; }
        black(k, '#1a130c'); zoom(k, 960, 420, 2.5, () => ch(k, 960, 800, 620, { ...ONG_S, face: 'blank', tilt: after(k, 'd') ? Math.sin(k.t * 2.6) * 7 : 0 })); shade(k, 0.55, [{ x: 960, y: 440, r: 680, warm: 1 }], { vig: 0.65 }); quote(k, '"Đếm thiếu một."', 'q', { color: AMBER, size: 80 });
      },
    },
    {
      say: '{a}Đúng lúc ấy, trong cái bị đặt dưới gốc đa, có tiếng gọi. Nhỏ lắm, như tiếng một đứa con gái gọi từ rất xa: {q}mẹ ơi. {b}Cái Thắm hét lên. Cả ba đứa co cẳng chạy, không đứa nào dám ngoái lại.',
      sfx: [['heartbeat', 'a', 0.4], ['stinger', 'q', 0.5], ['whoosh', 'b', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { biClose(k, { breathe: 2.2 }); quote(k, '"Mẹ ơi…"', 'q', { color: COLD, size: 84 }); return; }
        gocDa(k, { time: 'dusk' }); const p = k.at('b', 3.4, 'linear'); bi(k, 470, 950, 0.82); ch(k, 760, 965, 430, { ...ONG_S, action: 'sit', view: 'side', face: 'blank', arms: 'hold' });
        ch(k, 1100 + p * 1100, 985, 330, { ...DUNG, view: 'side', action: 'walk', face: 'shock', arms: 'raise' }); ch(k, 1300 + p * 1100, 985, 310, { ...THAM, view: 'side', action: 'walk', face: 'shock', arms: 'raise' }); ch(k, 960 + p * 1100, 985, 320, { ...HANH, view: 'side', action: 'walk', face: 'fear', arms: 'chest' }); dimDusk(k, 1000);
      },
    },
    {
      say: '{a}Tối ấy, mẹ chưa về. Tôi kể với bà. {b}Bà đang bưng nồi cơm, tay run đến nỗi cái vung rơi xuống đất. {c}Bà hỏi đi hỏi lại một câu: {q}mày trả lời nó rồi à? Mày bảo nó mấy đứa? {d}Tôi bảo: hai. {e}Bà lặng đi một lúc, rồi ra cài then cổng, lúc trời còn chưa tối hẳn.',
      sfx: [['click', 'b', 0.5], ['creak', 'e', 0.35]],
      draw(k) {
        if (k.t < k.cue('e')) {
          inNight(k); const shake = after(k, 'b') ? Math.sin(k.t * 40) * 3 : 0;
          ch(k, 780, 955, 450, { ...BA, view: 'side', face: after(k, 'b') ? 'shock' : 'calm', arms: 'hold', talk: after(k, 'q') && !after(k, 'd') ? 0.7 : 0 }); noi(k, 880 + shake, 760, 1, after(k, 'b') ? 0 : 1);
          if (after(k, 'b')) { const p = Math.min(1, (k.t - k.cue('b')) / 0.45); k.group({ x: 900, y: 730 + p * p * 215, r: p * 2 }, () => { k.ctx.fillStyle = '#58504a'; k.ctx.strokeStyle = '#2c1f17'; k.ctx.lineWidth = 3; k.ctx.beginPath(); k.ctx.ellipse(0, 0, 60, 15, 0, 0, Math.PI * 2); k.ctx.fill(); k.ctx.stroke(); }); }
          ch(k, 1190, 965, 330, { ...HANH, view: 'side', flip: true, face: after(k, 'b') ? 'fear' : 'calm', arms: 'down', talk: !after(k, 'b') || (after(k, 'd') && !after(k, 'e')) ? 0.5 : 0 });
          shade(k, 0.62, [LAMP, { x: 900, y: 650, r: 640, warm: 1, flicker: 1 }], { vig: 0.5 }); quote(k, '"Mày bảo nó mấy đứa?"', 'q', { color: AMBER, size: 58, until: 'd' }); quote(k, '"Hai."', 'd', { size: 80 }); return;
        }
        sanNha(k, { time: 'dusk' }); ch(k, SAN.gate - 40, 925, 440, { ...BA, view: 'side', face: 'blank', arms: 'point' }); dimDusk(k, 1500);
      },
    },
    {
      say: '{a}Bữa cơm, thằng Cún và cơm, rồi nói như kể chuyện vặt: {q}chị Hoa bảo, nhà mình ba đứa. {b}Bà đặt đũa xuống. Hoa nào? {c}Cún chỉ ra vườn, chỗ cây na: {r}chị Hoa ở gốc na. Chị Hoa to hơn em, bé hơn chị Hạnh. {d}Xóm tôi không có đứa con gái nào tên Hoa.',
      sfx: [['heartbeat', 'q', 0.4], ['wind', 'd', 0.3]],
      draw(k) {
        if (k.t < k.cue('d')) { bua(k, { ba: after(k, 'b') ? 'shock' : 'calm', hanh: after(k, 'q') ? 'fear' : 'calm', point: after(k, 'c'), talk: (after(k, 'q') && !after(k, 'b')) || after(k, 'r') ? 0.6 : 0 }); quote(k, '"Chị Hoa bảo, nhà mình ba đứa."', 'q', { color: AMBER, size: 58, until: 'b' }); quote(k, '"Chị Hoa ở gốc na."', 'r', { color: COLD, size: 58 }); return; }
        vuonNa(k, { time: 'dusk' }); shade(k, 0.66, [{ x: NA.x, y: 700, r: 480, warm: 0.4 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Đêm ấy, mẹ về muộn. Bà không kể gì với mẹ. {b}Tôi nằm cạnh thằng Cún, nghe nó nói mê, rồi cười khúc khích, như có ai đang chơi với nó trong màn.',
      sfx: [['creak', 'a', 0.25], ['wind', 'b', 0.25]],
      draw(k) {
        buong(k, { time: 'night', year: '1994', day: '12' }); lie(k, 720, 742, 300, { ...HANH, face: 'fear' }); lie(k, 1110, 742, 245, { ...CUN, face: after(k, 'b') ? 'happy' : 'sleep' }); net(k, 0.2);
        shade(k, 0.86, [{ x: 1450, y: 400, r: 320 }, { x: 900, y: 700, r: 340 }], { vig: 0.4 });
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      chapter: 'Đứa em năm đói',
      say: '{a}Sáng hôm sau, tôi ra quán nước bà Tư dưới gốc đa. Bà Tư biết chuyện cả làng. Tôi hỏi: {q}nhà cháu có phải ba đứa không bà? {b}Bà Tư nhìn tôi, thở dài. Năm đói ấy, mẹ mày có sinh thêm một đứa con gái. Được hơn hai mươi ngày thì mất. {c}Bà nội mày mang đi chôn ngoài bãi, một mình, ngay trong đêm. {d}Trẻ chưa đầy tháng, chưa có tên, không làm ma, không bàn thờ. Nên người ta không tính.',
      sfx: [['wind', 'c', 0.3]],
      draw(k) {
        if (k.t < k.cue('c')) { gocDa(k, { time: 'day' }); ch(k, DA.quan - 10, 930, 440, { ...BA_TU, action: 'sit', face: after(k, 'b') ? 'sad' : 'calm', arms: 'hold', talk: after(k, 'b') ? 0.5 : 0 }); ch(k, DA.quan - 400, 975, 330, { ...HANH, view: 'side', face: after(k, 'b') ? 'shock' : 'calm', arms: 'down', talk: after(k, 'q') && !after(k, 'b') ? 0.5 : 0 }); dimDay(k); tag(k, '13 THÁNG BA', 'a'); chapter(k, 3, 'Đứa em năm đói'); quote(k, '"Mẹ mày có sinh thêm một đứa con gái."', k.cue('b', 2), { color: AMBER, size: 54 }); return; }
        baiMo(k, { time: 'dusk' }); shade(k, 0.5, [{ x: 960, y: 760, r: 620, warm: 0.7 }], { vig: 0.55 }); quote(k, 'Nên người ta không tính.', k.cue('d', 3.5), { color: COLD, size: 58 });
      },
    },
    {
      say: '{a}Năm đói ấy là năm 1988. Làng tôi giáp hạt tháng Ba, nhà nào cũng ăn độn khoai sắn, nhiều nhà nhịn bữa. {b}Bà Tư kể thêm một câu, rồi tự im bặt, như lỡ lời: {q}năm ấy, cái ông ăn mày đeo bị cũng qua làng này một lần. {c}Đúng cái bị chín quai ấy.',
      sfx: [['stinger', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { sanNha(k, { time: 'dusk' }); ch(k, 760, 965, 440, { ...BA, hat: null, top: '#4e3e30', view: 'side', face: 'sad', arms: 'hold' }); bowl(k, 880, 800, 0.8, { empty: true }); dimDusk(k, 900); cold(k, 0.8); tag(k, 'NĂM 1988', 'a'); return; }
        if (k.t < k.cue('c')) { gocDa(k, { time: 'day' }); zoom(k, DA.quan - 10, 680, 1.6, () => ch(k, DA.quan - 10, 930, 440, { ...BA_TU, action: 'sit', face: 'blank', arms: 'hold', talk: 0.5 })); dimDay(k); quote(k, '"Năm ấy, cái ông ăn mày đeo bị cũng qua làng này."', 'q', { color: AMBER, size: 50 }); return; }
        biClose(k, { hi: 9 }); cold(k, 0.55); quote(k, 'Đúng cái bị chín quai ấy.', 'c', { color: COLD, size: 64 });
      },
    },
    {
      say: '{a}Tôi về nhà, ra đứng ở gốc na rất lâu. Hoá ra tôi có một đứa em gái. {b}Hoá ra những đôi giày len hồng, mẹ đốt cho nó. {c}Thế thì chị Hoa của thằng Cún là ai, tôi nghĩ mình đã biết. {d}Tôi sợ. Nhưng không hiểu sao, tôi lại thấy thương.',
      draw(k) { vuonNa(k, { time: 'day' }); ch(k, 620, 985, 340, { ...HANH, view: 'side', face: after(k, 'd') ? 'cry' : 'sad', arms: 'chest', tears: after(k, 'd') ? 0.7 : 0 }); shade(k, 0.3, [DAY, { x: NA.x, y: 760, r: 520, warm: 1 }], { vig: 0.45 }); },
    },
    {
      say: '{a}Trưa hôm ấy, ông ăn mày nằm ngủ dưới gốc đa, nón úp lên mặt. Cái bị đặt bên cạnh, miệng buộc lỏng. {b}Tôi đứng nhìn nó rất lâu. {c}Rồi tôi phạm điều thứ hai. Tôi rón rén lại gần, cởi nút dây, nhìn vào trong.',
      sfx: [['heartbeat', 'c', 0.4]],
      draw(k) {
        gocDa(k, { time: 'noon' }); lie(k, 760, 960, 430, { ...ONG_S, face: 'sleep', hat: null }); nonUp(k, 402, 975, 1.1);
        bi(k, 1100, 965, 0.72, { eyes: 0.6, open: after(k, 'c') }); const p = k.at('c', 5, 'linear'); ch(k, k.lerp(1640, 1310, p), 985, 330, { ...HANH, view: 'side', flip: true, action: p > 0 && p < 1 ? 'walk' : 'stand', face: 'fear', arms: p >= 1 ? 'point' : 'chest' }); shade(k, 0.2, [DAY], { vig: 0.45 });
      },
    },
    {
      say: '{a}Trong bị không có đứa trẻ nào. Chỉ có mấy cái bát mẻ, một cái nồi đất, và ở dưới cùng, {b}một cái chăn nhỏ gấp vuông. Chăn may bằng vải cánh hoa, hoa nhỏ li ti. {c}Đúng thứ vải trong ảnh cưới của mẹ. {d}Và vừa bằng mảng vải bị cắt mất trên vạt áo.',
      sfx: [['stinger', 'd', 0.4]],
      draw(k) {
        const { ctx } = k;
        if (k.t < k.cue('c')) { black(k, '#050403'); ctx.save(); ctx.beginPath(); ctx.ellipse(960, 540, 720, 410, 0, 0, Math.PI * 2); ctx.clip(); ctx.fillStyle = '#2c2116'; ctx.fillRect(0, 0, 1920, 1080); bowl(k, 620, 500, 1.8, { empty: true }); bowl(k, 1260, 470, 1.5, { empty: true }); ctx.fillStyle = '#4e3a2a'; ctx.strokeStyle = '#150f09'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(960, 380, 150, 90, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); chan(k, 960, 690, 1.6 + 0.3 * k.at('b', 3), {}); ctx.restore(); shade(k, 0.35, [{ x: 960, y: 640, r: 640, warm: 1 }], { vig: 0.5 }); return; }
        if (k.t < k.cue('d')) { black(k, '#b8a680'); anhCuoi(k, 960, 540, 2.7, { flower: true }); shade(k, 0.25, [{ x: 1040, y: 560, r: 760, warm: 1 }], { vig: 0.6 }); return; }
        black(k, '#b8a680'); aoCuoi(k, 960, 90, 2, { bg: '#b8a680' }); const p = k.at('d', 2.2, 'inOut'); ctx.save(); ctx.translate(k.lerp(1700, 963, p), 632); vaiHoa(k, -148, -172, 302, 338); ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 5; ctx.strokeRect(-148, -172, 302, 338); ctx.restore(); shade(k, 0.25, [{ x: 960, y: 620, r: 860, warm: 1 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Tôi chưa kịp lùi lại, thì từ trong cái bị chỉ có bát mẻ và nồi đất ấy, có tiếng gọi khẽ, sát bên tai tôi: {q}chị ơi. {b}Tôi buông dây, chạy một mạch về nhà. {c}Sau lưng, ông già vẫn nằm im, nón úp lên mặt. Nhưng tôi không chắc ông đang ngủ.',
      sfx: [['stinger', 'q', 0.5], ['whoosh', 'b', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { gocDa(k, { time: 'noon' }); zoom(k, 1250, 640, 2.3, () => { bi(k, 1100, 965, 0.72, { open: true, breathe: 1.5 }); ch(k, 1310, 985, 330, { ...HANH, view: 'side', flip: true, face: after(k, 'q') ? 'shock' : 'fear', arms: 'chest' }); }); shade(k, 0.32, [{ x: 1100, y: 500, r: 800 }], { vig: 0.6 }); quote(k, '"Chị ơi."', 'q', { color: COLD, size: 90 }); return; }
        gocDa(k, { time: 'noon' }); lie(k, 760, 960, 430, { ...ONG_S, face: 'sleep', hat: null }); nonUp(k, 402, 975, 1.1); bi(k, 1100, 965, 0.72, { eyes: 0.8 });
        const p = k.at('b', 2.6, 'linear'); if (p < 1) ch(k, 1310 + p * 900, 985, 330, { ...HANH, view: 'side', action: 'walk', face: 'shock', arms: 'raise' }); shade(k, 0.3, [DAY], { vig: 0.55 });
      },
    },
    {
      say: '{a}Chiều ấy, thằng Cún từ vườn chạy vào, tay cầm một đôi giày len hồng lấm bùn. Nó bảo chị Hoa cho nó xem. {b}Tôi nhận ra đôi giày ngay. Là đôi mẹ đan năm ngoái, {c}đôi mà chính mắt tôi đã thấy mẹ đốt ở gốc na, cháy thành tro. {d}Len không sém một sợi.',
      sfx: [['heartbeat', 'b', 0.4], ['stinger', 'd', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { sanNha(k, { time: 'dusk' }); const x = k.lerp(1500, 980, k.at('a', 3)); ch(k, x, 990, 270, { ...CUN, view: 'side', flip: true, action: k.at('a', 3) < 1 ? 'walk' : 'stand', face: 'happy', arms: 'point' }); giay(k, x - 120, 880, 0.42, { mud: 0.8 }); ch(k, 620, 975, 330, { ...HANH, view: 'side', face: 'calm', arms: 'down' }); dimDusk(k, 1000); return; }
        if (k.t < k.cue('c')) { black(k, '#1a130c'); giay(k, 960, 800, 3.4, { mud: 0.75 }); shade(k, 0.3, [{ x: 960, y: 620, r: 800, warm: 1 }], { vig: 0.6 }); return; }
        if (k.t < k.cue('d')) { vuonNa(k, { time: 'night' }); luaNho(k, NA.x + 130, 930, 1.5); giay(k, NA.x + 130, 925, 0.8, { color: '#a06a6e' }); shade(k, 0.72, [{ x: NA.x + 130, y: 840, r: 620, warm: 1, flicker: 1 }], { vig: 0.5 }); cold(k, 0.55); tag(k, 'NĂM NGOÁI', 'c'); return; }
        black(k, '#1a130c'); giay(k, 960, 800, 3.4, { mud: 0.75 }); shade(k, 0.3, [{ x: 960, y: 620, r: 800, warm: 1 }], { vig: 0.6 }); quote(k, 'Len không sém một sợi.', 'd', { color: AMBER, size: 64 });
      },
    },
    {
      say: '{a}Tôi hỏi Cún, chị Hoa lấy đâu ra. Nó bảo: {q}chị bảo chật rồi, chị không đi vừa nữa, cho em. {b}Tôi ướm vào chân thằng Cún. Rộng thùng thình. {c}Đôi giày ấy là cỡ chân của một đứa bé năm tuổi.',
      sfx: [['heartbeat', 'c', 0.45]],
      draw(k) {
        sanNha(k, { time: 'dusk' }); ch(k, 1010, 1000, 250, { ...CUN, action: 'sit', face: 'happy', arms: 'down', talk: after(k, 'q') && !after(k, 'b') ? 0.6 : 0 }); ch(k, 640, 985, 300, { ...HANH, action: 'kneel', view: 'side', face: after(k, 'c') ? 'fear' : 'calm', arms: 'point' });
        if (after(k, 'b')) giay(k, 860, 1020, 0.82, { mud: 0.75 });
        dimDusk(k, 900); quote(k, '"Chị bảo chật rồi, cho em."', 'q', { color: COLD, size: 58, until: 'c', y: 130 }); quote(k, 'Cỡ chân của một đứa bé năm tuổi.', 'c', { color: AMBER, size: 58, y: 130 });
      },
    },
    {
      say: '{a}Đến đây, nếu là bạn, bạn có tin đứa em gái của tôi đã chết vào cái đêm năm 1988 ấy không? Hãy để lại suy nghĩ của bạn. {b}Vì tối hôm sau, chính bà nội tôi đã trả lời câu hỏi ấy.',
      draw(k) { black(k); giay(k, 960, 760, 2.2, { mud: 0.7 }); shade(k, 0.55, [{ x: 960, y: 620, r: 560, warm: 1, flicker: 1 }], { vig: 0.55 }); k.text('Đêm năm 1988 ấy, em tôi đã chết thật chưa?', 960, 200, { size: 62, font: 'title', color: PAPER, fx: 'fade', p: k.at('a', 1), maxWidth: 1600 }); },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Bát cơm cho hai người',
      say: '{a}Ngày mười bốn tháng Ba, mẹ không đi chợ. Mẹ ở nhà, ngồi đan đôi giày hồng năm nay, to hơn đôi năm ngoái một chút. {b}Tôi không dám kể cho mẹ chuyện cái chăn, cũng không dám đưa mẹ đôi giày thằng Cún nhặt. Tôi giấu nó dưới gối. {c}Tối ấy chùa làng tụng kinh đón rằm, bà nội lên chùa, dặn tôi trông em.',
      sfx: [['gong', 'c', 0.2]],
      draw(k) {
        if (k.t < k.cue('b')) { inNight(k, { chieu: true }); ch(k, 1000, 960, 440, { ...ME, action: 'sit', face: 'sad', arms: 'hold' }); dan(k, 1000, 835, 1.5); shade(k, 0.45, [LAMP, { x: 900, y: 500, r: 900, warm: 1 }], { vig: 0.5 }); tag(k, '14 THÁNG BA', 'a'); chapter(k, 4, 'Bát cơm cho hai người'); return; }
        if (k.t < k.cue('c')) { inNight(k, { pillow: () => giay(k, 1600, 640, 0.38, { mud: 0.75 }) }); ch(k, 1480, 960, 330, { ...HANH, view: 'side', flip: true, face: 'fear', arms: 'point' }); shade(k, 0.5, [{ x: 1500, y: 620, r: 620, warm: 1 }], { vig: 0.5 }); return; }
        sanNha(k, { time: 'dusk' }); const p = k.at('c', 6, 'linear'); ch(k, k.lerp(900, SAN.gate, p), 925, 440, { ...BA, view: 'side', action: 'walk', face: 'calm', arms: 'hold' }); ch(k, 620, 985, 330, { ...HANH, face: 'fear', arms: 'down' }); ch(k, 450, 990, 265, { ...CUN, face: 'calm', arms: 'down' }); dimDusk(k);
      },
    },
    {
      say: '{a}Chập tối, có tiếng gọi ở cổng. Ông ăn mày đứng bên ngoài, cái bị trên vai. Ông không gọi ai, chỉ nói: {q}cho tôi xin bát cơm. Cho hai người. {b}Mẹ đang ở dưới bếp. Tôi đứng sau cổng, nhớ lời bà dặn. {c}Trời đã tối.',
      sfx: [['wind', 'a', 0.3], ['heartbeat', 'c', 0.4]],
      draw(k) { congNha(k, { time: 'dusk' }, () => ongGia(k, CONG.gate + 30, 830, 500, { view: 'side', flip: true, face: 'blank', arms: 'hold' })); ch(k, 560, 1040, 340, { ...HANH, view: 'side', face: 'fear', arms: 'chest' }); shade(k, 0.6, [{ x: 1000, y: 460, r: 1000, warm: 0.8 }], { vig: 0.5 }); quote(k, '"Cho tôi xin bát cơm. Cho hai người."', 'q', { color: AMBER, size: 56, until: 'b' }); quote(k, 'Trời đã tối.', 'c', { color: COLD, size: 64 }); },
    },
    {
      say: '{a}Nhưng ông nói thêm một câu: {q}con bé đói lâu rồi. {b}Và tôi nghe trong cái bị có tiếng thút thít, rất nhỏ, như một đứa trẻ cố nín khóc. {c}Tôi chạy vào bếp, xới đầy một bát cơm, gắp lên mấy con tép rang, {d}rồi đưa qua khe cổng. {e}Điều thứ ba, tôi cũng phạm nốt.',
      sfx: [['drip', 'b', 0.3], ['stinger', 'e', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { congNha(k, { time: 'dusk' }, () => ongGia(k, CONG.gate + 30, 830, 500, { view: 'side', flip: true, face: 'blank', arms: 'hold' })); ch(k, 560, 1040, 340, { ...HANH, view: 'side', face: 'fear', arms: 'chest' }); shade(k, 0.6, [{ x: 1000, y: 460, r: 1000, warm: 0.8 }], { vig: 0.5 }); quote(k, '"Con bé đói lâu rồi."', 'q', { color: COLD, size: 66 }); return; }
        if (k.t < k.cue('c')) { biClose(k, { breathe: 2.5, eyes: 0.8 }); return; }
        if (k.t < k.cue('d')) { kitchen(k, { fire: 1, bowl: false }); ch(k, 960, 930, 340, { ...HANH, view: 'side', face: 'fear', arms: 'hold' }); bowl(k, 1060, 800, 0.9, { full: true }); shade(k, 0.55, [KITCHEN.fire, { x: 960, y: 700, r: 520, warm: 1, flicker: 1 }], { vig: 0.5 }); return; }
        congNha(k, { time: 'dusk' }, () => ongGia(k, CONG.gate + 30, 830, 500, { view: 'side', flip: true, face: 'blank', arms: 'point' })); const p = k.at('d', 1.6); ch(k, k.lerp(560, 760, p), 1040, 340, { ...HANH, view: 'side', action: p < 1 ? 'walk' : 'stand', face: 'fear', arms: 'point' }); bowl(k, k.lerp(680, 960, p), 800, 0.75, { full: true }); shade(k, 0.6, [{ x: 1000, y: 460, r: 1000, warm: 0.8 }], { vig: 0.5 }); quote(k, 'Điều thứ ba, tôi cũng phạm nốt.', 'e', { color: AMBER, size: 58 });
      },
    },
    {
      say: '{a}Ông không ăn. Ông cởi miệng bị, đặt bát cơm vào trong, nói khẽ: {q}ăn đi con. Ăn no rồi còn đi. {b}Trong bị có tiếng nhai, nhỏ và vội, như của một đứa trẻ nhịn đói đã lâu lắm.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { congNha(k, { time: 'night' }, () => { bi(k, CONG.gate + 150, 830, 0.72, { open: true }); ch(k, CONG.gate - 40, 835, 430, { ...ONG_S, action: 'kneel', view: 'side', face: 'calm', arms: 'point', talk: after(k, 'q') ? 0.4 : 0 }); }); shade(k, 0.58, [{ x: CONG.gate, y: 520, r: 760, warm: 0.7 }], { vig: 0.5 }); quote(k, '"Ăn đi con. Ăn no rồi còn đi."', 'q', { color: COLD, size: 62 }); return; }
        biClose(k, { open: true, breathe: 1.4, eyes: 0.8 });
      },
    },
    {
      say: '{a}Mẹ tôi từ bếp đi lên, hỏi tôi nói chuyện với ai. {b}Rồi mẹ nhìn thấy ông già. Mẹ không nhìn mặt ông. {c}Mẹ nhìn vào một góc chăn vải hoa thò ra ở miệng bị. {d}Mẹ đứng sững.',
      sfx: [['stinger', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { congNha(k, { time: 'night' }, () => ongGia(k, CONG.gate + 30, 830, 500, { view: 'side', flip: true, face: 'blank', sackO: { chan: true } })); const x = k.lerp(120, 480, k.at('a', 2.6)); ch(k, x, 1040, 490, { ...ME, view: 'side', action: k.at('a', 2.6) < 1 ? 'walk' : 'stand', face: after(k, 'b') ? 'blank' : 'calm', arms: 'down', talk: after(k, 'b') ? 0 : 0.5 }); ch(k, 760, 1040, 340, { ...HANH, view: 'side', face: 'fear', arms: 'chest' }); shade(k, 0.6, [{ x: 900, y: 520, r: 900, warm: 0.8 }], { vig: 0.5 }); return; }
        if (k.t < k.cue('d')) { biClose(k, { chan: true, eyes: 0.4 }); return; }
        black(k, '#1a130c'); zoom(k, 960, 420, 2.2, () => ch(k, 960, 860, 620, { ...ME, face: 'shock', arms: 'chest' })); shade(k, 0.45, [{ x: 960, y: 440, r: 760, warm: 1 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Ông già rút cái chăn ra, gấp lại, đưa qua cổng cho mẹ. Ông bảo: {q}của con bé. Nó lớn rồi, không đắp vừa nữa. Nó nhờ tôi mang trả mẹ nó. {b}Mẹ ôm cái chăn vào ngực. {c}Ông nói thêm một câu, rồi quay đi về phía cuối làng: {r}nó chỉ muốn biết, nhà nó mấy đứa.',
      sfx: [['wind', 'c', 0.3]],
      draw(k) {
        const leaving = after(k, 'r');
        congNha(k, { time: 'night' }, () => ongGia(k, leaving ? CONG.gate + 30 + k.at('r', 4, 'linear') * 780 : CONG.gate + 30, 830, 500, { view: 'side', flip: !leaving, action: leaving ? 'walk' : 'stand', face: 'blank', arms: after(k, 'b') ? 'down' : 'point' }));
        ch(k, 760, 1040, 490, { ...ME, view: 'side', face: after(k, 'b') ? 'cry' : 'shock', arms: 'chest', tears: after(k, 'b') ? 1 : 0 });
        if (after(k, 'b')) chan(k, 802, 830, 0.7, { r: -0.1 }); else chan(k, k.lerp(1010, 880, k.at('a', 1.5)), 790, 0.7);
        ch(k, 470, 1040, 340, { ...HANH, view: 'side', face: 'fear', arms: 'chest' });
        shade(k, 0.6, [{ x: 900, y: 520, r: 900, warm: 0.8 }], { vig: 0.5 }); quote(k, '"Nó lớn rồi, không đắp vừa nữa."', 'q', { color: AMBER, size: 58, until: 'b' }); quote(k, '"Nó chỉ muốn biết, nhà nó mấy đứa."', 'r', { color: COLD, size: 58 });
      },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Ai đã nói dối ai?',
      say: '{a}Bà nội đi chùa về, thấy mẹ ngồi bệt giữa sân, ôm cái chăn hoa. {b}Bà khuỵu xuống. Hai người đàn bà nhìn nhau rất lâu. {c}Rồi bà nói, giọng như vỡ ra: {q}con bé không chết.',
      sfx: [['stinger', 'q', 0.5]],
      draw(k) {
        sanNha(k, { time: 'night' }); ch(k, 820, 1000, 440, { ...ME, action: 'sit', view: 'side', face: 'cry', arms: 'chest', tears: 1 }); chan(k, 860, 875, 0.62);
        const x = k.lerp(SAN.gate - 40, 1180, k.at('a', 3)); ch(k, x, 1000, 450, { ...BA, view: 'side', flip: true, action: after(k, 'b') ? 'kneel' : (k.at('a', 3) < 1 ? 'walk' : 'stand'), face: after(k, 'c') ? 'cry' : 'shock', arms: 'chest', talk: after(k, 'q') ? 0.6 : 0, tears: after(k, 'q') ? 1 : 0 });
        dimNight(k, [MOON, { x: 1000, y: 800, r: 620, warm: 0.4 }], 0.6); chapter(k, 5, 'Ai đã nói dối ai?'); quote(k, '"Con bé không chết."', 'q', { color: AMBER, size: 76 });
      },
    },
    {
      say: '{a}Bà kể. Tháng Ba năm 1988, bố tôi đi làm trên Hà Nội từ sau Tết, chưa gửi được đồng nào về. {b}Mẹ tôi sinh con được mấy hôm thì sốt, mê man, mất sữa. Nhà hết gạo. {c}Con bé khóc ngằn ngặt mấy đêm liền, khản cả tiếng, rồi khóc không thành tiếng nữa. {d}Bà ôm nó, sợ nó chết đói ngay trên tay bà.',
      sfx: [['wind', 0, 0.3]],
      draw(k) {
        inNight(k, { bed: true }); lie(k, 1850, 612, 400, { ...ME, hair: 'bob', face: 'sleep' });
        ch(k, 820, 960, 450, { ...BA, hat: null, hairColor: '#6a6258', view: 'side', face: after(k, 'c') ? 'cry' : 'sad', arms: 'hold', tears: after(k, 'd') ? 1 : 0 }); boc(k, 900, 800, 0.72);
        shade(k, 0.74, [LAMP, { x: 900, y: 700, r: 460, warm: 1, flicker: 1 }], { vig: 0.5 }); cold(k, 0.8); tag(k, 'THÁNG BA · 1988', 'a');
      },
    },
    {
      say: '{a}Chiều mười bốn tháng Ba năm ấy, có một ông ăn mày đeo bị qua ngõ. Bà cho ông bát cháo loãng cuối cùng trong nồi. {b}Ông nghe tiếng con bé, bảo bên kia sông có một nhà hiếm muộn, muốn xin con nuôi, nhà ấy no đủ. {c}Nếu bà bằng lòng, đêm nay ông mang sang.',
      draw(k) { congNha(k, { time: 'dusk' }, () => ongGia(k, CONG.gate + 30, 830, 500, { view: 'side', flip: true, face: 'calm', arms: 'hold', talk: after(k, 'b') ? 0.5 : 0 })); ch(k, 700, 1040, 450, { ...BA, hat: null, hairColor: '#6a6258', view: 'side', face: 'sad', arms: 'point' }); bowl(k, 860, 810, 0.7); shade(k, 0.55, [{ x: 1000, y: 460, r: 1000, warm: 0.8 }], { vig: 0.5 }); cold(k, 0.8); quote(k, '"Bên kia sông có một nhà hiếm muộn."', 'b', { color: COLD, size: 56 }); },
    },
    {
      say: '{a}Đêm ấy, bà cắt một mảng vạt áo cưới của mẹ, khâu thành cái chăn nhỏ. Bà bảo, áo ấy mẹ mặc lâu, còn hơi mẹ, con bé đắp vào sẽ đỡ khóc. {b}Bà quấn con bé, bế ra gốc đa, đặt vào cái bị chín quai. {c}Ông già buộc miệng bị lại, nhìn bà, nói một câu: {q}bà đếm cho đúng. Có ngày tôi quay lại hỏi.',
      sfx: [['heartbeat', 'c', 0.4], ['stinger', 'q', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { inNight(k); aoCuoi(k, 640, 240, 0.9, { hole: k.at(k.cue('a', 2), 1), bg: '#8a7a60' }); ch(k, 1000, 960, 440, { ...BA, hat: null, hairColor: '#6a6258', action: 'sit', face: 'sad', arms: 'hold' }); chan(k, 1000, 850, 0.5); shade(k, 0.68, [LAMP, { x: 800, y: 500, r: 640, warm: 1, flicker: 1 }], { vig: 0.5 }); cold(k, 0.8); return; }
        gocDa(k, { time: 'night', quan: false }); bi(k, 1200, 950, 0.82, { open: !after(k, 'c'), eyes: 0.7 }); ch(k, 1480, 960, 480, { ...ONG_S, view: 'side', flip: true, face: 'blank', arms: 'hold', talk: after(k, 'q') ? 0.4 : 0 }); const p = k.at('b', 3.5, 'inOut');
        ch(k, 880, 960, 450, { ...BA, hat: null, hairColor: '#6a6258', view: 'side', face: 'cry', arms: p < 1 ? 'hold' : 'chest', tears: 1 }); if (!after(k, 'c')) boc(k, k.lerp(970, 1200, p), k.lerp(800, 700, p), 0.72);
        shade(k, 0.72, [{ x: 1150, y: 640, r: 640 }], { vig: 0.5 }); cold(k, 0.8); muaPhun(k, 0.8); quote(k, '"Bà đếm cho đúng. Có ngày tôi quay lại hỏi."', 'q', { color: COLD, size: 54 });
      },
    },
    {
      say: '{a}Sáng ra, bà bảo mẹ con bé tắt thở lúc nửa đêm, bà đã chôn ngoài bãi. Ngoài bãi có một nấm đất nhỏ, bà tự tay đắp, bên dưới không có gì. {b}Qua mùa gặt, bà lặn lội sang bên kia sông, hỏi khắp các làng. Không có nhà hiếm muộn nào xin con nuôi năm ấy. {c}Ở bến, người lái đò bảo: {q}đêm ấy đò không chạy. {d}Không ai chở một ông già đeo bị sang sông cả.',
      sfx: [['wind', 'a', 0.3], ['stinger', 'q', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { baiMo(k, { time: 'dawn' }); ch(k, 620, 930, 440, { ...BA, hat: null, hairColor: '#6a6258', action: 'kneel', view: 'side', face: 'sad', arms: 'point' }); shade(k, 0.45, [{ x: 960, y: 700, r: 760 }], { vig: 0.5 }); cold(k, 0.8); return; }
        benDo(k, { time: 'day' }); ch(k, 620, 985, 450, { ...BA, hat: null, hairColor: '#6a6258', view: 'side', face: after(k, 'q') ? 'shock' : 'sad', arms: 'down' }); ch(k, 1040, 985, 470, { ...LAI_DO, view: 'side', flip: true, face: 'calm', arms: 'hold', talk: after(k, 'q') ? 0.5 : 0 }); shade(k, 0.3, [DAY], { vig: 0.45 }); cold(k, 0.8); quote(k, '"Đêm ấy đò không chạy."', 'q', { color: AMBER, size: 66 });
      },
    },
    {
      say: '{a}Từ đấy, bà đặt ra ba điều cấm. Bà sợ một ngày ông già quay lại, hỏi đến các cháu bà. Bà sợ đứa nào trả lời. {b}Bà gục đầu xuống, nói với mẹ tôi: {q}sáu năm nay, mẹ nói dối con.',
      draw(k) {
        if (k.t < k.cue('b')) { black(k); rules(k, 960, 540, [['1. Không trả lời "nhà mấy đứa".', 'a'], ['2. Không nhìn vào trong bị.', 'a'], ['3. Trời tối, không đưa gì qua cổng.', 'a']], { cue: 'a', w: 1300 }); shade(k, 0.5, [{ x: 960, y: 540, r: 740, warm: 0.8, flicker: 1 }], { vig: 0.55 }); return; }
        sanNha(k, { time: 'night' }); ch(k, 820, 1000, 440, { ...ME, action: 'sit', view: 'side', face: 'blank', arms: 'chest' }); chan(k, 860, 875, 0.62); ch(k, 1180, 1000, 450, { ...BA, view: 'side', flip: true, action: 'kneel', face: 'cry', arms: 'cover', lean: -14, tears: 1, talk: 0.5 }); dimNight(k, [MOON, { x: 1000, y: 800, r: 620, warm: 0.4 }], 0.6); quote(k, '"Sáu năm nay, mẹ nói dối con."', 'q', { color: AMBER, size: 62 });
      },
    },
    {
      say: '{a}Mẹ tôi im rất lâu. Rồi mẹ nói một câu, nhỏ đến nỗi tôi phải nín thở mới nghe được: {q}con biết. {b}Đêm ấy con tỉnh. Con nghe tiếng nó khóc xa dần ra ngõ. {c}Con không gọi mẹ lại. {d}Con sợ nó ở lại thì chết đói.',
      sfx: [['stinger', 'q', 0.5], ['heartbeat', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('b') || k.t > k.cue('d')) { black(k, '#141019'); zoom(k, 960, 420, 2.2, () => ch(k, 960, 860, 620, { ...ME, face: 'cry', arms: 'chest', tears: 1, talk: after(k, 'q') ? 0.4 : 0 })); shade(k, 0.45, [{ x: 960, y: 440, r: 760 }], { vig: 0.6 }); quote(k, '"Con biết."', 'q', { color: AMBER, size: 96, until: 'b' }); quote(k, '"Con sợ nó ở lại thì chết đói."', 'd', { color: PAPER, size: 62 }); return; }
        inNight(k); zoom(k, 1560, 620, 1.8, () => lie(k, 1850, 612, 400, { ...ME, hair: 'bob', face: 'cry', tears: 1 })); shade(k, 0.74, [{ x: 1000, y: 500, r: 760 }], { vig: 0.5 }); cold(k, 0.85); muaPhun(k, 0.5); quote(k, '"Con không gọi mẹ lại."', 'c', { color: COLD, size: 72 });
      },
    },
    {
      say: '{a}Hai người đàn bà ôm nhau khóc giữa sân. Tôi đứng ở hiên, ôm thằng Cún, và mới hiểu vì sao mẹ không bao giờ cho ai đếm con mình. {b}Vì sao những đôi giày mẹ đan, năm sau bao giờ cũng to hơn năm trước. {c}Người ta không đan giày to dần cho một đứa trẻ đã chết. {d}Mẹ đan cho một đứa trẻ đang lớn. {e}Rồi mẹ đốt đi, vì mẹ không biết gửi đến đâu.',
      sfx: [['gong', 'c', 0.22]],
      draw(k) {
        if (k.t < k.cue('b')) { sanNha(k, { time: 'night' }); ch(k, 880, 1000, 440, { ...ME, action: 'kneel', view: 'side', face: 'cry', arms: 'chest', tears: 1 }); ch(k, 1060, 1000, 450, { ...BA, action: 'kneel', view: 'side', flip: true, face: 'cry', arms: 'chest', tears: 1 }); ch(k, 420, 860, 320, { ...HANH, face: 'cry', arms: 'chest', tears: 0.8 }); ch(k, 560, 865, 250, { ...CUN, face: 'sad', arms: 'down' }); dimNight(k, [MOON, { x: 900, y: 800, r: 700, warm: 0.4 }], 0.58); return; }
        black(k); hangGiay(k, 'b', 6, 640); shade(k, 0.3, [{ x: 960, y: 560, r: 1000, warm: 0.8 }], { vig: 0.5 });
        quote(k, 'Người ta không đan giày to dần cho một đứa trẻ đã chết.', 'c', { color: AMBER, size: 54, y: 880, until: 'd' }); quote(k, 'Mẹ đan cho một đứa trẻ đang lớn.', 'd', { color: PAPER, size: 62, y: 880 });
      },
    },

    // ===== CHƯƠNG 6 =====
    {
      chapter: 'Bến đò không chạy đêm',
      say: '{a}Mẹ đứng dậy, cầm đôi giày hồng vừa đan xong, chạy ra ngõ. Tôi chạy theo. {b}Mẹ không hỏi ai, cứ thế chạy về phía bến đò cuối làng, như biết chắc ông đang ở đấy.',
      sfx: [['wind', 0, 0.35]],
      draw(k) {
        duongDe(k, { time: 'night' }); const p = k.at('a', Math.max(4, k.d - 1), 'linear'); ch(k, 300 + p * 1500, 900, 470, { ...ME, view: 'side', action: 'walk', face: 'cry', arms: 'chest', tears: 1 }); giay(k, 340 + p * 1500, 740, 0.4); ch(k, 40 + p * 1500, 905, 330, { ...HANH, view: 'side', action: 'walk', face: 'fear', arms: 'down' });
        dimNight(k, [MOON], 0.6); chapter(k, 6, 'Bến đò không chạy đêm');
      },
    },
    {
      say: '{a}Đêm mười bốn tháng Ba, trăng gần tròn, sương trên sông trắng đục. Đò đã neo từ chiều. {b}Ông già ngồi trên bậc bến, cái bị đặt bên cạnh. Thấy mẹ, ông không đứng dậy. {c}Ông chỉ hỏi, như đã hỏi tôi ở gốc đa: {q}nhà chị mấy đứa?',
      sfx: [['wind', 'a', 0.35], ['heartbeat', 'q', 0.4]],
      draw(k) {
        benDo(k, {}); suong(k, 0.8, 740, 150); bi(k, 620, 930, 0.72, { eyes: 0.6 }); ch(k, BDO.step.x, 930, 410, { ...ONG_S, action: 'sit', view: 'side', flip: true, face: 'blank', arms: 'hold', talk: after(k, 'q') ? 0.4 : 0 });
        if (after(k, 'b')) { ch(k, 1260, 1000, 480, { ...ME, view: 'side', flip: true, face: 'cry', arms: 'chest', tears: 1 }); ch(k, 1500, 1010, 330, { ...HANH, view: 'side', flip: true, face: 'fear', arms: 'down' }); }
        dimNight(k, [MOON, { x: 900, y: 760, r: 700 }], 0.58); quote(k, '"Nhà chị mấy đứa?"', 'q', { color: AMBER, size: 68 });
      },
    },
    {
      say: '{a}Mẹ quỳ xuống bậc đá ướt. Lần đầu tiên trong sáu năm, mẹ đếm con mình thành tiếng: {q}nhà tôi ba đứa. {b}Cái Hạnh, cái Hoa, thằng Cún. {c}Ba đứa.',
      sfx: [['gong', 'c', 0.3]],
      draw(k) {
        benDo(k, {}); suong(k, 0.8, 740, 150); bi(k, 620, 930, 0.72, { eyes: 0.6 }); ch(k, BDO.step.x, 930, 410, { ...ONG_S, action: 'sit', view: 'side', flip: true, face: 'blank', arms: 'hold' }); ch(k, 1120, 1010, 470, { ...ME, view: 'side', flip: true, action: 'kneel', face: 'cry', arms: 'chest', tears: 1, talk: after(k, 'q') ? 0.6 : 0 }); ch(k, 1500, 1010, 330, { ...HANH, view: 'side', flip: true, face: 'shock', arms: 'chest' });
        dimNight(k, [MOON, { x: 980, y: 760, r: 760 }], 0.56); quote(k, '"Nhà tôi ba đứa."', 'q', { color: AMBER, size: 76, until: 'b' }); quote(k, 'Cái Hạnh. Cái Hoa. Thằng Cún.', 'b', { color: PAPER, size: 62, until: 'c' }); quote(k, 'Ba đứa.', 'c', { color: AMBER, size: 90 });
      },
    },
    {
      say: '{a}Tôi giật mình. Hoa. {b}Sau này mẹ bảo, cái tên ấy mẹ chỉ đặt cho nó trong lòng, vì cái chăn vải hoa, chưa kịp đầy tháng để đặt tên thật. Mẹ chưa từng nói ra với ai, cả bà nội cũng không biết. {c}Vậy mà thằng Cún bốn tuổi đã gọi đúng cái tên ấy, từ hai hôm trước.',
      sfx: [['stinger', 'a', 0.4], ['heartbeat', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { black(k, '#141019'); zoom(k, 960, 430, 2.2, () => ch(k, 960, 860, 520, { ...HANH, face: 'shock', arms: 'chest' })); shade(k, 0.45, [{ x: 960, y: 450, r: 720 }], { vig: 0.6 }); k.text('HOA', 960, 860, { size: 150, font: 'title', color: AMBER, fx: 'fade', p: k.at('a', 0.8), outline: '#000', outlineWidth: 12 }); return; }
        if (k.t < k.cue('c')) { black(k, '#1a130c'); vaiHoa(k, 0, 0, 1920, 1080); shade(k, 0.55, [{ x: 960, y: 540, r: 700, warm: 1 }], { vig: 0.65 }); k.text('Hoa', 960, 540, { size: 170, font: 'title', color: PAPER, fx: 'fade', p: k.at('b', 1.2), outline: '#000', outlineWidth: 14 }); return; }
        bua(k, { ba: 'shock', hanh: 'fear', point: true, talk: 0.6 }); cold(k, 0.55); quote(k, '"Chị Hoa ở gốc na."', 'c', { color: COLD, size: 62 });
      },
    },
    {
      say: '{a}Ông già gật đầu: {q}đủ. {b}Từ trong cái bị có tiếng gọi, lần này rõ lắm: {r}mẹ ơi. {c}Mẹ tôi nhào tới. Ông đã đứng dậy, khoác bị lên vai, bước xuống mép nước. Sương dâng lên trùm lấy ông. {d}Lúc sương tan, trên bến chỉ còn hai mẹ con tôi. {e}Dấu chân đất của ông dừng lại ở mép nước. {f}Con đò vẫn neo nguyên chỗ cũ.',
      sfx: [['stinger', 'r', 0.5], ['wind', 'c', 0.45], ['gong', 'f', 0.25]],
      draw(k) {
        if (k.t < k.cue('c')) { benDo(k, {}); suong(k, 0.8, 740, 150); bi(k, 620, 930, 0.72, { breathe: after(k, 'b') ? 2.4 : 0.5, eyes: 0.7 }); ch(k, BDO.step.x, 930, 410, { ...ONG_S, action: 'sit', view: 'side', flip: true, face: 'blank', arms: 'hold', tilt: after(k, 'q') && !after(k, 'b') ? Math.sin(k.t * 5) * 6 : 0 }); ch(k, 1120, 1010, 470, { ...ME, view: 'side', flip: true, action: 'kneel', face: 'cry', arms: 'chest', tears: 1 }); dimNight(k, [MOON, { x: 900, y: 760, r: 760 }], 0.56); quote(k, '"Đủ."', 'q', { size: 90, until: 'b' }); quote(k, '"Mẹ ơi."', 'r', { color: COLD, size: 90 }); return; }
        if (k.t < k.cue('d')) { benDo(k, {}); const p = k.at('c', Math.max(3, k.cue('d') - k.cue('c')), 'linear'); ongGia(k, k.lerp(BDO.step.x, 560, p), k.lerp(930, 860, p), 440, { view: 'side', flip: true, action: 'walk', face: 'blank', alpha: Math.max(0, 1 - p * 1.1) }); ch(k, k.lerp(1120, 960, Math.min(1, p * 2)), 1010, 470, { ...ME, view: 'side', flip: true, action: 'walk', face: 'cry', arms: 'point', tears: 1 }); suong(k, 0.7 + p * 1.2, 800, 360); dimNight(k, [MOON, { x: 800, y: 760, r: 800 }], 0.5); return; }
        benDo(k, {}); dauChan(k, 980, 980, 6, { dx: -66, dy: -22, p: k.at('e', 2.5, 'linear') }); ch(k, 1160, 1010, 470, { ...ME, view: 'side', flip: true, action: 'kneel', face: 'cry', arms: 'chest', tears: 1 }); ch(k, 1420, 1010, 330, { ...HANH, view: 'side', flip: true, face: 'fear', arms: 'chest' }); suong(k, 0.35, 760, 200); dimNight(k, [MOON, { x: 900, y: 860, r: 760 }, ...(after(k, 'f') ? [{ x: BDO.boat.x, y: BDO.boat.y, r: 420 }] : [])], 0.55);
      },
    },
    {
      say: '{a}Mẹ đặt đôi giày hồng lên bậc bến, ngồi đấy đến sáng. {b}Sáng ra, đôi giày không còn nữa. {c}Về đến nhà, thằng Cún ra mở cổng, bảo: {q}chị Hoa đi rồi. Chị bảo, chị về nhà chị. {d}Tôi chạy vào lật gối. Đôi giày năm ngoái tôi giấu ở đấy cũng không còn. {e}Từ hôm ấy, nó không còn chơi một mình ở gốc na nữa.',
      sfx: [['gong', 'b', 0.2]],
      draw(k) {
        if (k.t < k.cue('c')) { benDo(k, { time: after(k, 'b') ? 'dawn' : 'night' }); if (!after(k, 'b')) giay(k, BDO.step.x, 898, 0.6); ch(k, 1160, 1000, 440, { ...ME, action: 'sit', view: 'side', flip: true, face: after(k, 'b') ? 'blank' : 'sad', arms: 'chest' }); suong(k, 0.4, 760, 220); if (after(k, 'b')) shade(k, 0.35, [{ x: 960, y: 500, r: 1100, warm: 0.7 }], { vig: 0.5 }); else dimNight(k, [MOON, { x: BDO.step.x, y: 860, r: 560 }], 0.58); return; }
        if (k.t < k.cue('d')) { congNha(k, { time: 'dawn' }, () => ch(k, CONG.gate + 30, 830, 480, { ...ME, view: 'side', flip: true, face: 'blank', arms: 'chest' })); ch(k, 760, 1040, 270, { ...CUN, view: 'side', face: 'happy', arms: 'wave', talk: after(k, 'q') ? 0.6 : 0 }); shade(k, 0.3, [{ x: 1100, y: 420, r: 1100, warm: 0.7 }], { vig: 0.5 }); quote(k, '"Chị bảo, chị về nhà chị."', 'q', { color: AMBER, size: 62 }); return; }
        if (k.t < k.cue('e')) { inNight(k, {}); ch(k, 1500, 960, 330, { ...HANH, view: 'side', flip: true, face: 'shock', arms: 'point' }); shade(k, 0.42, [{ x: 1500, y: 620, r: 620, warm: 1 }], { vig: 0.5 }); return; }
        vuonNa(k, { time: 'day' }); shade(k, 0.28, [DAY], { vig: 0.45 });
      },
    },
    {
      say: '{a}Người làng đồn, ai trả lời thật với ông Ba Bị, tháng ấy nhà ấy mất một đứa. {b}Tháng ấy, nhà thằng Dũng, nhà cái Thắm vẫn đủ. {c}Chỉ có nhà tôi. Đêm mẹ đếm đủ ba đứa, cũng là đêm nhà tôi mất một đứa. {d}Lần thứ hai.',
      sfx: [['heartbeat', 'c', 0.4], ['stinger', 'd', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { gocDa(k, { time: 'day' }); ch(k, 960, 985, 330, { ...DUNG, face: 'happy', arms: 'wave' }); ch(k, 1200, 985, 310, { ...THAM, face: 'happy', arms: 'down' }); ch(k, 700, 985, 320, { ...HANH, view: 'side', face: 'sad', arms: 'down' }); dimDay(k); return; }
        black(k); const { ctx } = k; [[560, HANH, 330], [960, null, 300], [1360, CUN, 265]].forEach(([x, p, h]) => { if (p) ch(k, x, 800, h, { ...p, face: 'sad', arms: 'down' }); else { ctx.save(); ctx.globalAlpha = 0.5 * (1 - k.at('c', 4, 'linear')); giay(k, x, 800, 0.8); ctx.restore(); } }); shade(k, 0.5, [{ x: 960, y: 620, r: 760, warm: 0.8 }], { vig: 0.55 }); quote(k, 'Lần thứ hai.', 'd', { color: AMBER, size: 90 });
      },
    },
    {
      say: '{a}Tôi đã nghĩ về câu ấy suốt hơn ba mươi năm. Chị về nhà chị. {b}Có thể em tôi còn sống. Ở một làng nào đó, có một người đàn bà gần bốn mươi tuổi, không biết mình từng có một cái chăn vải hoa. {c}Và ông già kia chỉ là người năm xưa mang nó đi, nay mang tiếng gọi của nó về một lần, để mẹ tôi đếm cho đủ.',
      draw(k) {
        if (k.t < k.cue('c')) { duongDe(k, { time: 'day' }); ch(k, k.lerp(1300, 1040, k.at('b', 12, 'linear')), 900, 460, { kind: 'woman', skin: '#dcb28e', hair: 'bun', hairColor: '#241a12', top: '#6a7a78', topStyle: 'canh', pants: '#2a2a2a', shoes: '#5a4a3a', hat: 'non', view: 'side', flip: true, action: 'walk', face: 'calm', arms: 'hold' }); dimDay(k); quote(k, 'Có thể em tôi còn sống.', 'b', { color: AMBER, size: 58 }); return; }
        gocDa(k, { time: 'dusk', quan: false }); ongGia(k, k.lerp(900, 1500, k.at('c', 11, 'linear')), 950, 460, { view: 'side', action: 'walk', face: 'calm', sackO: { flat: 0.6 } }); dimDusk(k, 1300);
      },
    },
    {
      say: '{a}Hoặc cũng có thể, con bé đã không qua được cái đêm mưa phùn tháng Ba năm ấy, trong cái bị chín quai, trên con đường không có đò. {b}Và ông già ấy không phải người. {c}Các cụ bảo, ông Ba Bị không bắt trẻ con. Ông chỉ mang đi những đứa trẻ không ai đếm. {d}Rồi một ngày, ông mang chúng về, hỏi xem nhà chúng mấy đứa.',
      sfx: [['wind', 0, 0.35], ['stinger', 'd', 0.4]],
      draw(k) {
        duongDe(k, { time: 'night' }); ongGia(k, k.lerp(1700, 420, k.at('a', Math.max(8, k.d - 1), 'linear')), 900, 470, { view: 'side', flip: true, action: 'walk', face: 'blank', sackO: { breathe: 0.8, eyes: 0.8 } }); dimNight(k, [{ x: 960, y: 640, r: 760 }], 0.68); cold(k, 0.85); muaPhun(k, 0.9); quote(k, 'Những đứa trẻ không ai đếm.', 'c', { color: COLD, size: 60, until: 'd' }); quote(k, '"Nhà mày mấy đứa?"', 'd', { color: AMBER, size: 64 });
      },
    },

    // ===== KẾT =====
    {
      chapter: 'Kết',
      say: '{a}Mẹ tôi chưa bao giờ lập bàn thờ cho em. Mẹ bảo, nó chưa chết. {b}Nhưng mỗi năm, đúng ngày mười bốn tháng Ba, mẹ vẫn đan một đôi giày. Mẹ không đốt nữa, mà mang ra đặt ở bậc bến đò. {c}Sáng hôm sau, bao giờ đôi giày cũng không còn. {d}Bà nội tôi mất năm 1999. Lúc hấp hối, bà chỉ hỏi mẹ một câu: {q}năm nay, giày có ai lấy không.',
      sfx: [['gong', 'd', 0.2]],
      draw(k) {
        if (k.t < k.cue('b')) { inNight(k, { chieu: true }); ch(k, 1000, 960, 440, { ...ME, action: 'sit', face: 'blank', arms: 'hold' }); dan(k, 1000, 835, 1.5); shade(k, 0.72, [LAMP], { vig: 0.5 }); return; }
        if (k.t < k.cue('d')) { benDo(k, { time: after(k, 'c') ? 'dawn' : 'dusk' }); if (!after(k, 'c')) { giay(k, BDO.step.x, 898, 0.6); ch(k, 1160, 1000, 470, { ...ME, view: 'side', flip: true, face: 'calm', arms: 'hold' }); } suong(k, 0.35, 760, 220); shade(k, 0.4, [{ x: BDO.step.x, y: 780, r: 900, warm: 0.8 }], { vig: 0.5 }); return; }
        inNight(k); lie(k, 1850, 612, 380, { ...BA, hat: null, face: 'sleep' }); ch(k, 1330, 975, 450, { ...ME, view: 'side', action: 'kneel', face: 'cry', arms: 'hold', tears: 1 }); shade(k, 0.68, [LAMP, { x: 1500, y: 620, r: 520, warm: 1, flicker: 1 }], { vig: 0.5 }); tag(k, 'NĂM 1999', 'd'); quote(k, '"Năm nay, giày có ai lấy không."', 'q', { color: AMBER, size: 60 });
      },
    },
    {
      lead: 0.8, tail: 2.5,
      say: '{a}Năm nay mẹ tôi đã ngoài sáu mươi, mắt kém, vẫn đan. {b}Đôi giày năm nay là cỡ chân của một người đàn bà. {c}Và bây giờ, hễ có ai hỏi nhà tôi mấy đứa, tôi đều trả lời: ba. {d}Tôi chỉ không biết, đứa thứ ba đang ở nhà nào.',
      sfx: [['wind', 0, 0.2], ['gong', 'd', 0.25]],
      draw(k) {
        if (k.t < k.cue('b')) { inNight(k, { chieu: true }); ch(k, 1000, 960, 440, { ...ME_GIA, action: 'sit', face: 'calm', arms: 'hold' }); dan(k, 1000, 835, 1.5); shade(k, 0.7, [LAMP], { vig: 0.5 }); return; }
        if (k.t < k.cue('c')) { black(k, '#1a130c'); giay(k, 960, 760, 4.6); shade(k, 0.35, [{ x: 960, y: 580, r: 860, warm: 1 }], { vig: 0.6 }); return; }
        benDo(k, { time: 'dusk' }); giay(k, BDO.step.x, 898, 0.72); suong(k, 0.5 + 0.4 * k.at('d', 6), 780, 280); shade(k, 0.5, [{ x: BDO.step.x, y: 800, r: 800, warm: 1 }], { vig: 0.55 }); quote(k, 'Tôi chỉ không biết, đứa thứ ba đang ở nhà nào.', 'd', { color: PAPER, size: 56 });
      },
    },

    // ===== CUỐI =====
    nextScene({
      say: '{next}Tập sau: năm 2001, xóm tôi chơi trốn tìm lúc chập tối. Thằng em tôi úp mặt vào gốc nhãn, đếm đến một trăm. Bảy đứa đi trốn. Lúc nó mở mắt, tám đứa chạy về.',
      title: 'Ma Giấu | Đếm Đến Một Trăm',
      hook: 'Bảy đứa đi trốn. Lúc mở mắt, tám đứa chạy về.',
      art(k) { vuonNa(k, { time: 'dusk' }); ch(k, NA.x - 90, 900, 300, { ...CUN, view: 'side', face: 'sleep', arms: 'cover' }); for (let i = 0; i < 8; i++) ch(k, 1000 + i * 68, 790, 128, { ...DUNG, top: '#3a3028', skin: '#3a3028', hairColor: '#241a12', face: 'blank', alpha: i === 7 ? 0.45 : 0.85, shadow: false }); shade(k, 0.55, [{ x: 900, y: 600, r: 800, warm: 1 }], { vig: 0.5 }); },
    }),
    subScene({
      say: '{q}Theo bạn, đứa em gái của tôi còn sống ở đâu đó, hay ông Ba Bị đã đưa nó về lần cuối? Hãy để lại câu trả lời. {sub}Và nếu muốn nghe tiếp những chuyện chưa có lời giải, hãy đăng ký Nhân Gian Chưa Kể.',
      question: 'Em gái tôi còn sống, hay ông Ba Bị đã đưa nó về lần cuối?',
      art(k) { giay(k, 960, 1010, 1); },
    }),
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
