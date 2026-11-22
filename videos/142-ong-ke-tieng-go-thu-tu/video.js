// Nhân Gian Chưa Kể — tập Ông Kẹ | Tiếng Gõ Thứ Tư. Kịch bản + sổ dữ kiện: kich-ban.md.
// Khung (20/11): một tiếng động lặp lại trong đêm + một bí mật gia đình 28 năm. Một điều kiêng duy nhất ("nghe gõ thì đừng thưa").
// Hướng CHÂN THẬT (người dùng 20/11): thế giới thật (bệnh phong, trại phong, điện tín, xe khách Cẩm Phả 1996), cái rợn nhỏ, chối được
// (tiếng gõ, mùi thuốc lào), đúng MỘT khoảnh khắc "không thể": tiếng gõ thứ tư từ trong tủ, chỉ tôi và bà nghe, bố bảo là gió.
import * as thumbs from '/videos/142-ong-ke-tieng-go-thu-tu/thumbs.js';
import { AMBER, COLD, shade, cold, tag, quote, chapter, nextScene, subScene, oil, hearth, broom } from '/channel/nhan-gian.js';
import { sanNha, SAN, congNha, CONG, suong, baiMo, mam, gocDa } from '/channel/nhan-gian-babi.js';
import { ngoXom, bepVach } from '/channel/nhan-gian-magiau.js';
import {
  TOI, BA, BO, CO, THOM, LOC, ONG, BO_NHO, CO_NHO, BA_TRE, CON, TOI_LON, XOM, BENH, ch, lie, tayQuan, go, bat, dieuCay, thuocLao, khoi, chiaKhoa, tayNai, goiLa, xeDap,
  anhOng, nha, NHA, tu, tuGan, cua, CUA, buong, BUONG, chan, giayBaoTu, so, dienTin, trai, ro, nghiaTrai, NT, mo, sepia,
} from '/channel/nhan-gian-ke.js';
import { dollBike } from '/channel/nhan-gian-doll.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const black = (k, c = '#07060a') => { k.ctx.fillStyle = c; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); };
const zoom = (k, cx, cy, s, fn) => k.group({ x: cx, y: cy, s }, () => k.group({ x: -cx, y: -cy }, fn));
const grain = (sc) => ({ ...sc, draw(k) { const s = 1 + 0.05 * Math.min(1, k.t / Math.max(1, k.d)); k.group({ x: k.W / 2, y: k.H / 2, s }, () => k.group({ x: -k.W / 2, y: -k.H / 2 }, () => sc.draw(k))); sepia(k, 0.72); } });
const DAY = { x: 960, y: 300, r: 1700 };
const dimDay = (k) => shade(k, 0.18, [DAY], { vig: 0.45 });
const dimDusk = (k, x = 960) => shade(k, 0.5, [{ x, y: 560, r: 1100, warm: 1 }], { vig: 0.5 });
const LAMP = { x: NHA.lamp.x, y: NHA.lamp.y, r: 640, warm: 1, flicker: 1 };
const KN = ['k1', 'k2', 'k3'];
const knocks = (k, ids = KN) => ids.map((c) => k.cue(c));
// Gian giữa ban đêm: đèn dầu trên bàn thờ.
function demNha(k, o = {}, fn) { nha(k, { time: 'night', ...o }); if (o.lamp !== false) oil(k, NHA.lamp.x, 556, 0.9); if (fn) fn(); shade(k, o.a ?? 0.78, o.lights ?? [LAMP], { vig: 0.55 }); }
function ngayNha(k, o = {}, fn) { nha(k, { time: 'day', ...o }); if (fn) fn(); shade(k, 0.25, [{ x: 600, y: 400, r: 1400 }], { vig: 0.5 }); }
// Buồng ban đêm: tôi nằm phía ngoài, bà nằm phía trong (quay vào vách).
function demBuong(k, o = {}) {
  zoom(k, 1060, 640, o.z ?? 1.35, () => buong(k, { net: o.net ?? 1, now: o.now, tu: o.tu, doorFn: o.doorFn }, () => {
    if (o.ba !== false) lie(k, 1520, 720, 300, { ...BA, hat: null, face: 'sleep' });
    lie(k, o.kidX ?? 1080, 744, o.kidH ?? 260, { ...(o.kid ?? TOI), face: o.face ?? 'sleep' });
    chan(k, 640, 1600, 762, { color: o.now ? '#5a7a9a' : '#8a5a5a' });
    if (o.sit) o.sit();
  }));
  if (o.lamp) zoom(k, 1060, 640, o.z ?? 1.35, () => oil(k, 470, 900, 0.8));
  shade(k, o.a ?? 0.8, o.lights ?? [{ x: 1000, y: 560, r: 620 }, ...(o.lamp ? [{ x: 520, y: 980, r: 560, warm: 1, flicker: 1 }] : [])], { vig: 0.6 });
}
// Cận mặt.
function mat(k, p, o = {}) { black(k, o.bg ?? '#141019'); zoom(k, 960, 430, 2.3, () => { const info = ch(k, 960, 860, o.h ?? 560, { ...p, arms: o.arms ?? 'chest', face: o.face ?? 'calm', tears: o.tears ?? 0, talk: o.talk ?? 0, look: o.look ?? 0 }); if (o.key) chiaKhoa(k, 960, 615, 0.4); if (o.after) o.after(info); }); shade(k, 0.45, [{ x: 960, y: 450, r: 740, warm: o.warm ?? 1 }], { vig: 0.6 }); }
// Sân đêm có sương.
function demSan(k, o = {}, fn) { sanNha(k, { time: 'night', moon: false }); if (fn) fn(); suong(k, o.mist ?? 0.55, 760, 320); shade(k, o.a ?? 0.74, o.lights ?? [{ x: 700, y: 700, r: 520 }], { vig: 0.55 }); }
// Khe cửa: chỉ chừa một khe dọc giữa khung.
function khe(k, x0 = 700, x1 = 1220) { const { ctx } = k; ctx.fillStyle = '#05040a'; ctx.fillRect(-200, -200, x0 + 200, 1500); ctx.fillRect(x1, -200, 1200, 1500); ctx.fillStyle = '#3a2618'; ctx.fillRect(x0 - 30, -200, 30, 1500); ctx.fillRect(x1, -200, 30, 1500); }
// Bếp năm 1970: ông ngồi ăn bên bếp lửa.
function bep1970(k, o = {}) {
  bepVach(k); hearth(k, 1180, 900, 1.3, 1);
  const info = ch(k, 900, 930, 380, { ...ONG, view: 'front', action: 'sit', face: o.face ?? 'calm', arms: o.shh ? { r: [[9, 4], [-6, -16]], l: [[3, 13], [3, 25]] } : 'hold' });
  if (!o.shh) bat(k, 900, info.hand[1] + 6, 0.5); tayQuan(k, info, 380, { other: o.shh ? null : [900 - (info.hand[0] - 900), info.hand[1]] });
  if (o.dieu) dieuCay(k, 1010, 930, 0.7, -0.1);
  shade(k, 0.72, [{ x: 1180, y: 820, r: 620, warm: 1, flicker: 1 }], { vig: 0.55 });
}
// Xe khách (nhìn nghiêng), đầu xe quay phải.
function xeKhach(k, x, y, s = 1) { const { ctx } = k; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#2c1f17'; for (const wx of [-260, 250]) { ctx.beginPath(); ctx.arc(wx, -40, 52, 0, Math.PI * 2); ctx.fill(); } ctx.fillStyle = '#c8b060'; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-420, -330, 840, 290, 30); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#4e7a8a'; ctx.fillRect(-420, -150, 840, 30); ctx.fillStyle = '#9ab4c0'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.roundRect(-390 + i * 118, -300, 96, 110, 8); ctx.fill(); ctx.stroke(); } ctx.fillStyle = '#2c1f17'; ctx.font = '800 30px "Be Vietnam Pro"'; ctx.textAlign = 'center'; ctx.fillText('CẨM PHẢ – HẢI DƯƠNG', 0, -66); ctx.restore(); }
function duong(k, time = 'day') { ngoXom(k, { time }); }

const video = {
  meta: {
    title: 'Ông Kẹ | Tiếng Gõ Thứ Tư Phát Ra Từ Trong Tủ Nhà Tôi',
    description: `Bà tôi bảo, Ông Kẹ đi bắt con nít bao giờ cũng gõ cửa đúng ba tiếng. Mùa đông năm 1996, một giờ sáng, nhà tôi nghe ba tiếng gõ. Rồi đến tiếng thứ tư, phát ra từ bên trong cái tủ gỗ mà bà tôi khoá suốt hai mươi tám năm.

Một ảnh thờ ghi năm 1968, một tờ giấy báo tử ghi năm 1996, một cái bát men xanh không ai được ăn, và một người đã đi bộ mười tám cây số trong đêm chỉ để đứng ở cửa buồng.`,
    footer: `📖 Truyện hư cấu dựa trên hình tượng Ông Kẹ trong lời dọa trẻ con của người Việt. Tên người, tên địa danh và tình tiết đều hư cấu. Bệnh phong (bệnh Hansen) ngày nay chữa khỏi hoàn toàn và không lây qua tiếp xúc thông thường.
🕯️ Nhân Gian Chưa Kể: những chuyện người xưa truyền tai nhau, mà chưa ai giải thích được.`,
    links: [['▶ Tập trước: Bắc Kim Thang', '136-bac-kim-thang-dam-ruoc-khong-nguoi'], ['▶ Nu Na Nu Nống', '133-nu-na-nu-nong-ban-chan-thu-muoi-mot'], ['🔔 Đăng ký', 'https://www.youtube.com/@nhangianchuake?sub_confirmation=1']],
    tags: ['ông kẹ', 'ông kẹ là ai', 'tiếng gõ cửa lúc nửa đêm', 'gõ cửa ba tiếng', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'chuyện tâm linh có thật', 'hoạt hình kinh dị', 'trại phong', 'nhân gian chưa kể'],
    hashtags: ['truyenma', 'ongke', 'tamlinh'],
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
      say: '{a}Bà tôi bảo, Ông Kẹ đi bắt con nít, bao giờ cũng gõ cửa đúng ba tiếng. {b}Đứa nào thưa, đứa nào ra mở cửa, ông bỏ vào bao tải, vác đi. {c}Một đêm mùa đông, một giờ sáng, nhà tôi nghe ba tiếng gõ. {k1}Cộc. {k2}Cộc. {k3}Cộc.',
      sfx: [['wind', 0, 0.25], ['knock', 'k1', 0.8], ['knock', 'k2', 0.8], ['knock', 'k3', 0.8]],
      draw(k) {
        if (k.t < k.cue('b')) { demSan(k); quote(k, 'Ông Kẹ gõ cửa đúng ba tiếng.', 'a', { color: AMBER, size: 60 }); return; }
        if (k.t < k.cue('k1', -0.6)) { demBuong(k, { face: after(k, 'c') ? 'fear' : 'sleep' }); return; }
        cua(k); go(k, CUA.knock.x, CUA.knock.y, knocks(k)); shade(k, 0.7, [{ x: 960, y: 500, r: 760 }], { vig: 0.6 }); quote(k, 'Cộc. Cộc. Cộc.', 'k1', { color: AMBER, size: 70 });
      },
    },
    {
      say: '{a}Rồi đến tiếng thứ tư. {b}Tiếng thứ tư không phát ra từ cánh cửa. Nó phát ra từ bên trong cái tủ gỗ ở góc nhà. {c}Cái tủ mà suốt hai mươi tám năm, bà tôi khoá chặt, chìa đeo trên cổ, không cho ai mở.',
      sfx: [['knock', ['b', 0.1], 0.5], ['stinger', 'b', 0.4], ['heartbeat', 'c', 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) { tuGan(k, { open: 0 }); go(k, 960, 560, [k.cue('b', 0.1)], { color: '190,210,230', r: 300 }); shade(k, 0.72, [{ x: 960, y: 560, r: 640, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, 'Tiếng thứ tư, từ bên trong cái tủ.', 'b', { color: COLD, size: 60 }); return; }
        mat(k, BA, { face: 'blank', key: true }); quote(k, 'Hai mươi tám năm, chìa đeo trên cổ.', 'c', { color: AMBER, size: 58 });
      },
    },
    {
      say: '{a}Đây là Nhân Gian Chưa Kể. Nếu bạn muốn nghe tiếp những chuyện chưa có lời giải, hãy bấm đăng ký. {b}Còn bây giờ, xin bạn tắt bớt đèn.',
      draw(k) { black(k); const fade = 1 - k.at('b', 3, 'linear') * 0.7; oil(k, 960, 790, 2.1); shade(k, 0.84, [{ x: 960, y: 620, r: 680 * fade, warm: 1, flicker: 1 }], { vig: 0.5 }); k.text('NHÂN GIAN CHƯA KỂ', 960, 300, { size: 92, font: 'title', color: AMBER, fx: 'fade', p: k.at('a', 1) * fade }); },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Ông Kẹ gõ ba tiếng',
      say: '{a}Nhà tôi ở một làng nhỏ ven sông, thuộc tỉnh Hải Dương. Nhà ngói ba gian, sân gạch, cổng tre. {b}Năm ấy tôi mười tuổi, học lớp bốn. Bố mẹ tôi làm ở mỏ than Cẩm Phả, tận Quảng Ninh, mỗi năm chỉ về được dăm bảy ngày Tết. Từ năm lên năm, tôi ở với bà nội.',
      sfx: [['wind', 'a', 0.15]],
      draw(k) {
        sanNha(k, { time: 'day', line: true });
        if (after(k, 'b')) { ch(k, 860, 900, 270, { ...TOI, view: 'side', face: 'calm', arms: 'hold' }); ch(k, 1120, 905, 300, { ...BA, view: 'side', flip: true, face: 'calm', arms: 'hold' }); broom(k, 1180, 900, 0.9, 0.3); }
        dimDay(k); if (k.t < k.cue('b')) chapter(k, 1, 'Ông Kẹ Gõ Ba Tiếng'); tag(k, 'HẢI DƯƠNG · 1996', 'a');
      },
    },
    {
      say: '{a}Bà tôi năm ấy sáu mươi tám tuổi. Lưng còng, chít khăn mỏ quạ, không biết chữ, nhưng nhớ ngày giỗ của cả họ không sai một ngày. {b}Và bà có một cách dỗ con nít đi ngủ mà cả làng không ai giống: chuyện Ông Kẹ.',
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, BA, { face: 'calm', key: true }); return; }
        demBuong(k, { face: 'calm', lamp: true, sit: () => ch(k, 470, 900, 300, { ...BA, view: 'side', action: 'sit', face: 'calm', arms: 'chest', talk: 0.5 }) });
      },
    },
    {
      say: '{a}Ông Kẹ thì đứa trẻ nào ở quê cũng bị doạ. Nhưng Ông Kẹ của bà tôi có luật riêng. {b}Ông chỉ đi lúc nửa đêm. Ông gõ cửa đúng ba tiếng, không hơn, không kém. {c}Rồi ông đứng ở cửa buồng, nhìn từng đứa ngủ. Đứa nào mở mắt, đứa nào thưa, là ông bỏ vào bao tải.',
      sfx: [['knock', ['b', 1.6], 0.35], ['knock', ['b', 2.2], 0.35], ['knock', ['b', 2.8], 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { demBuong(k, { face: 'calm', lamp: true, sit: () => ch(k, 470, 900, 300, { ...BA, view: 'side', action: 'sit', face: 'calm', arms: 'point', talk: 0.6 }) }); return; }
        if (k.t < k.cue('c')) { cua(k); go(k, CUA.knock.x, CUA.knock.y, [k.cue('b', 1.6), k.cue('b', 2.2), k.cue('b', 2.8)]); shade(k, 0.78, [{ x: 960, y: 500, r: 700 }], { vig: 0.6 }); quote(k, 'Đúng ba tiếng.', 'b', { color: AMBER, size: 64 }); return; }
        demBuong(k, { face: 'fear', a: 0.86, lights: [{ x: 900, y: 650, r: 420 }] }); quote(k, 'Ông đứng ở cửa buồng, nhìn từng đứa ngủ.', 'c', { color: COLD, size: 56 });
      },
    },
    {
      say: '{a}Bố tôi cũng lớn lên với Ông Kẹ ấy. Tết năm nào, ngồi uống rượu, bố cũng kể: {q}hồi mười hai tuổi, bố từng nhìn thấy Ông Kẹ thật, ngồi bên bếp lửa nhà mình, đội nón, hai bàn tay quấn vải. {b}Cả nhà cười. Bà tôi không cười. Bà đứng dậy, đi xuống bếp.',
      draw(k) {
        nha(k, { time: 'day' }); mam(k, 900, 970, 1);
        ch(k, 640, 990, 330, { ...BO, view: 'side', action: 'sit', face: after(k, 'b') ? 'happy' : 'calm', arms: 'point', talk: after(k, 'b') ? 0 : 0.6 });
        ch(k, 820, 1000, 300, { ...CO, view: 'front', action: 'sit', face: after(k, 'b') ? 'happy' : 'calm', arms: 'hold' });
        ch(k, 1000, 1010, 260, { ...TOI, view: 'front', action: 'sit', face: 'calm', arms: 'hold' });
        if (after(k, 'b')) ch(k, 1260 + k.at(k.cue('b', 2.5), 5, 'linear') * 500, 1000, 310, { ...BA, view: 'side', action: 'walk', face: 'blank', arms: 'down' }); else ch(k, 1180, 1010, 290, { ...BA, view: 'side', flip: true, action: 'sit', face: 'blank', arms: 'hold' });
        shade(k, 0.28, [{ x: 900, y: 600, r: 1300 }], { vig: 0.5 }); tag(k, 'TẾT', 'a'); quote(k, '"Bố từng nhìn thấy Ông Kẹ thật."', 'q', { size: 56, until: 'b' });
      },
    },
    {
      say: '{a}Gian giữa nhà tôi có bàn thờ ông nội. Ảnh ông chụp năm 1967, mặt vuông, tóc chải lật. Dưới ảnh có dòng chữ: Nguyễn Văn Khang, 1925, 1968. {b}Bà bảo, năm 1968 ông đi đắp đường trên Lạng Sơn, ốm rồi mất trên ấy, người ta chôn luôn trên ấy. {c}Làng tôi, mộ ai cũng ở cánh đồng sau làng. Chỉ ông nội tôi là không có mộ.',
      draw(k) {
        if (k.t < k.cue('c')) { zoom(k, NHA.altar, 420, 1 + k.at('a', 8, 'inOut') * 0.9, () => nha(k, { time: 'day', incense: true })); shade(k, 0.3, [{ x: 930, y: 420, r: 900, warm: 1 }], { vig: 0.55 }); return; }
        baiMo(k, { time: 'day', moon: false }); dimDay(k); quote(k, 'Chỉ ông nội tôi là không có mộ.', 'c', { size: 58, color: AMBER });
      },
    },
    {
      say: '{a}Giỗ ông vào hai mươi tháng Chạp. Bà làm cỗ tươm tất, nhưng chưa năm nào tôi thấy bà khóc. {b}Cúng xong, bà gói một phần xôi, một miếng thịt vào lá chuối, cất riêng. {c}Đến mùng một tháng Giêng, bà mang gói ấy đi lễ chùa.',
      draw(k) {
        if (k.t < k.cue('b')) { zoom(k, 860, 640, 1 + k.at('a', 9, 'linear') * 0.3, () => { nha(k, { time: 'day', incense: true }); ch(k, 760, 1000, 320, { ...BA, view: 'side', action: 'kneel', face: 'blank', arms: 'chest' }); }); shade(k, 0.25, [{ x: 600, y: 400, r: 1400 }], { vig: 0.5 }); tag(k, 'HAI MƯƠI THÁNG CHẠP', 'a'); return; }
        if (k.t < k.cue('c')) { black(k, '#1a130d'); goiLa(k, 960, 600, 3); shade(k, 0.35, [{ x: 960, y: 560, r: 640, warm: 1 }], { vig: 0.6 }); return; }
        duong(k, 'dawn'); dollBike(k, 300 + k.at('c', 8, 'linear') * 1300, 990, 330, { rider: { ...BA, face: 'calm' }, frame: 'nu', basket: true }); dimDusk(k, 900); tag(k, 'MÙNG MỘT THÁNG GIÊNG', 'c');
      },
    },
    {
      say: '{a}Góc gian giữa có một cái tủ gỗ mít hai cánh, cao hơn đầu người lớn. Ông nội tôi là thợ mộc, cái tủ do chính tay ông đóng năm 1955, năm ông cưới bà. {b}Tủ lúc nào cũng khoá. Chìa bằng đồng, bà xâu dây gai đeo trên cổ, tắm cũng không tháo.',
      draw(k) {
        if (k.t < k.cue('b')) { ngayNha(k); return; }
        mat(k, BA, { face: 'calm', key: true }); quote(k, 'Tắm cũng không tháo.', 'b', { size: 56, color: AMBER });
      },
    },
    {
      say: '{a}Tôi chỉ một lần được thấy bên trong. Năm tôi lên tám, bà mở tủ lấy tiền đóng học cho tôi, quên che. {b}Trong đó có một cái áo bông cũ, một cái nón, và một cái bát men xanh sứt miệng. Không ai trong nhà ăn bằng cái bát ấy. {c}Và ở mặt trong cánh tủ bên trái, ngang tầm một người ngồi, có một chỗ gỗ mòn nhẵn, lõm xuống, bằng đồng xu.',
      sfx: [['creak', 'a', 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) { tuGan(k, { open: k.at('a', 2.5, 'inOut') }); shade(k, 0.3, [{ x: 960, y: 500, r: 900, warm: 1 }], { vig: 0.55 }); tag(k, 'NĂM 1994', 'a'); return; }
        zoom(k, 560, 680, 1 + k.at('c', 3) * 1.6, () => tuGan(k, { open: 1, dent: k.at(k.cue('c', 2), 1.5) })); shade(k, 0.3, [{ x: 960, y: 540, r: 800, warm: 1 }], { vig: 0.55 }); quote(k, 'Một chỗ gỗ mòn nhẵn, bằng đồng xu.', 'c', { size: 56, color: AMBER });
      },
    },
    {
      say: '{a}Mùng một hằng tháng, bà dậy từ bốn giờ, buộc cái làn lên xe đạp, đi lễ chùa Bãi Ổi, cách làng mười tám cây số. {b}Chiều tối bà mới về. Làn thì rỗng, người thì có mùi thuốc sát trùng, như mùi trạm xá xã. {c}Bà không hút thuốc. Vậy mà phiên chợ nào bà cũng mua một gói thuốc lào. Bà bảo, mua để cúng.',
      draw(k) {
        if (k.t < k.cue('b')) { duong(k, 'dawn'); dollBike(k, 300 + k.at('a', 8, 'linear') * 1300, 990, 330, { rider: { ...BA, face: 'calm' }, frame: 'nu', basket: true }); dimDusk(k, 900); tag(k, 'MÙNG MỘT HẰNG THÁNG', 'a'); return; }
        if (k.t < k.cue('c')) { duong(k, 'dusk'); dollBike(k, 1600 - k.at('b', 8, 'linear') * 1200, 990, 330, { rider: { ...BA, face: 'blank' }, frame: 'nu', basket: true, flip: true }); dimDusk(k, 900); return; }
        black(k, '#1a130d'); thuocLao(k, 960, 620, 4); shade(k, 0.35, [{ x: 960, y: 560, r: 640, warm: 1 }], { vig: 0.6 }); quote(k, 'Bà không hút thuốc.', 'c', { size: 58 });
      },
    },
    {
      say: '{a}Còn một chuyện nữa, mà mãi sau này tôi mới dám kể. {b}Có những đêm mùa đông, tôi tỉnh dậy, thấy chăn đã được ai đắp lại kín chân, kín cổ. Trong khi bà tôi vẫn nằm ngủ say ở đầu bên kia giường, quay mặt vào vách. {c}Tôi cứ nghĩ bà dậy đắp cho tôi rồi lại ngủ. Tôi chưa bao giờ hỏi.',
      draw(k) {
        demBuong(k, { face: after(k, 'b') ? 'calm' : 'sleep', a: 0.82 });
        if (k.t > k.cue('c')) quote(k, 'Tôi chưa bao giờ hỏi.', 'c', { size: 56, color: COLD });
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Đêm mùng bốn tháng Mười',
      say: '{a}Mùng một tháng Mười năm ấy, tức mười một tháng Mười Một dương lịch, bà lại đi chùa. Lần này bà về sớm hơn mọi khi, mắt đỏ hoe. {b}Tối ấy bà không ăn cơm. Bà ngồi nhìn cái tủ rất lâu, tay cứ mân mê cái chìa khoá trên cổ.',
      draw(k) {
        if (k.t < k.cue('b')) { duong(k, 'dusk'); dollBike(k, 1600 - k.at('a', 8, 'linear') * 900, 990, 330, { rider: { ...BA, face: 'sad' }, frame: 'nu', basket: true, flip: true }); dimDusk(k, 900); if (k.t < k.cue('a', 3)) chapter(k, 2, 'Đêm Mùng Bốn Tháng Mười'); tag(k, '11/11/1996 · MÙNG MỘT THÁNG MƯỜI', 'a'); return; }
        demNha(k, {}, () => { const i = ch(k, 1150, 990, 330, { ...BA, view: 'side', action: 'sit', face: 'sad', arms: 'chest' }); chiaKhoa(k, i.hand[0], i.hand[1] + 10, 0.35, { string: false }); });
      },
    },
    {
      say: '{a}Hai đêm sau, gió mùa đông bắc đầu tiên tràn về. Tôi nằm trong màn, nghe gió rít qua khe cửa. {b}Một giờ sáng. {k1}Cộc. {k2}Cộc. {k3}Cộc. {c}Ba tiếng gõ, chậm rãi, đều nhau, vào cánh cửa gian giữa.',
      sfx: [['wind', 'a', 0.35], ['knock', 'k1', 0.8], ['knock', 'k2', 0.8], ['knock', 'k3', 0.8]],
      draw(k) {
        if (k.t < k.cue('k1', -0.4)) { demBuong(k, { face: after(k, 'b') ? 'fear' : 'sleep' }); tag(k, 'ĐÊM 13 RẠNG SÁNG 14/11/1996', 'a'); quote(k, 'Một giờ sáng.', 'b', { size: 58 }); return; }
        cua(k); go(k, CUA.knock.x, CUA.knock.y, knocks(k)); shade(k, 0.74, [{ x: 960, y: 500, r: 720 }], { vig: 0.6 }); quote(k, 'Cộc. Cộc. Cộc.', 'k1', { color: AMBER, size: 70 });
      },
    },
    {
      say: '{a}Tôi rúc vào trong chăn, nín thở. Ông Kẹ. Đúng ba tiếng. {b}Nhưng bà tôi không sợ. Bà ngồi dậy, châm đèn dầu, đi ra gian giữa. Rồi tôi nghe tiếng then cửa kéo ra. {c}Bà mở cửa cho Ông Kẹ.',
      sfx: [['creak', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, TOI, { face: 'fear', warm: 0.4, bg: '#0a0c12' }); return; }
        if (k.t < k.cue('c')) { demNha(k, { lamp: false, lights: [] }, () => { const i = ch(k, 1300 - k.at('b', 6, 'linear') * 700, 990, 330, { ...BA, hat: null, view: 'side', flip: true, action: 'walk', face: 'calm', arms: 'hold' }); oil(k, i.hand[0], i.hand[1] + 30, 0.7); }); shade(k, 0.5, [{ x: 1300 - k.at('b', 6, 'linear') * 700, y: 800, r: 520, warm: 1, flicker: 1 }], { vig: 0.5 }); return; }
        demNha(k, { lamp: false, door: k.at('c', 2, 'inOut'), lights: [{ x: 330, y: 720, r: 500, warm: 1, flicker: 1 }] }, () => { const i = ch(k, 600, 990, 330, { ...BA, hat: null, view: 'side', flip: true, face: 'calm', arms: 'hold' }); oil(k, i.hand[0], i.hand[1] + 30, 0.7); }); quote(k, 'Bà mở cửa cho Ông Kẹ.', 'c', { size: 58, color: COLD });
      },
    },
    {
      say: '{a}Tôi vén màn, nhìn qua khe rèm. Bà đứng giữa sân, trong sương, tay cầm đèn. Ngoài sân không có ai. {b}Bà nói rất khẽ, khẽ như đang nói với người đứng sát bên: {q}Ông đấy à. Ông vào đi, ngoài này lạnh. {c}Bà đứng đó rất lâu. Rồi bà vào, cài then, ngồi xuống cạnh cái tủ. Đến gần sáng, tôi vẫn nghe tiếng bà khóc.',
      sfx: [['wind', 'a', 0.3]],
      draw(k) {
        if (k.t < k.cue('c')) { demSan(k, { lights: [{ x: 1000, y: 720, r: 420, warm: 1, flicker: 1 }] }, () => { const i = ch(k, 960, 960, 330, { ...BA, hat: null, view: 'side', face: 'calm', arms: 'hold', talk: after(k, 'q') ? 0.4 : 0 }); oil(k, i.hand[0], i.hand[1] + 30, 0.7); }); quote(k, '"Ông đấy à. Ông vào đi, ngoài này lạnh."', 'q', { size: 56 }); return; }
        demNha(k, {}, () => ch(k, 1150, 990, 330, { ...BA, hat: null, view: 'side', action: 'sit', face: 'cry', tears: 0.8, arms: 'cover' }));
      },
    },
    {
      say: '{a}Sáng ra, ở bậu cửa có mùi thuốc lào. Mùi khét, ngai ngái, của một người vừa rít xong điếu thuốc. {b}Nhà tôi không có đàn ông. Bà tôi không hút thuốc. {c}Bà lấy chổi quét bậu cửa mấy lượt, rồi bảo tôi: {q}Ông Kẹ đấy. Bà ra đuổi rồi.',
      draw(k) {
        sanNha(k, { time: 'dawn' }); if (k.t < k.cue('c')) khoi(k, 640, 860, 1, 260);
        if (after(k, 'c')) { ch(k, 760, 900, 300, { ...BA, view: 'side', flip: true, face: 'blank', arms: 'hold', talk: after(k, 'q') ? 0.5 : 0 }); broom(k, 700, 900, 0.9, -0.4 + Math.sin(k.t * 4) * 0.15); ch(k, 1000, 900, 260, { ...TOI, view: 'side', flip: true, face: 'calm', arms: 'down' }); }
        dimDusk(k, 700); quote(k, 'Bà tôi không hút thuốc.', 'b', { size: 56, until: 'c' }); quote(k, '"Ông Kẹ đấy. Bà ra đuổi rồi."', 'q', { size: 56 });
      },
    },
    {
      say: '{a}Tôi hỏi: {q}Sao bà lại mời ông ấy vào? {b}Bà quay lại nhìn tôi. Lần đầu tiên trong đời, tôi thấy bà tôi sợ. {c}Bà bảo: {q2}Con nghe nhầm. Rồi bà đi xuống bếp, không nói thêm một câu nào.',
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, TOI, { face: 'calm', talk: after(k, 'q') ? 0.5 : 0, warm: 0.6 }); quote(k, '"Sao bà lại mời ông ấy vào?"', 'q', { size: 56 }); return; }
        mat(k, BA, { face: 'fear', talk: after(k, 'q2') ? 0.4 : 0 }); quote(k, '"Con nghe nhầm."', 'q2', { size: 60, color: AMBER });
      },
    },
    {
      say: '{a}Trưa hôm ấy, tôi sang hỏi bà Thơm nhà bên, người bằng tuổi bà tôi. Bà Thơm cười: {q}Ông Kẹ thì đứa nào chả bị doạ. {b}Rồi bà Thơm ngừng lại, nghĩ một lúc: {q2}Nhưng gõ đúng ba tiếng thì chỉ bà mày nói thế thôi. Cả làng này, không ai nói thế cả.',
      draw(k) {
        gocDa(k, { time: 'noon' }); ch(k, 1400, 900, 300, { ...THOM, view: 'side', flip: true, action: 'sit', face: after(k, 'b') ? 'blank' : 'happy', arms: 'hold', talk: (after(k, 'q') && !after(k, 'b')) || after(k, 'q2') ? 0.5 : 0 }); ch(k, 1180, 900, 260, { ...TOI, view: 'side', face: 'calm', arms: 'down' });
        dimDay(k); quote(k, '"Gõ đúng ba tiếng thì chỉ bà mày nói thế thôi."', 'q2', { size: 54, color: AMBER });
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      chapter: 'Người đàn ông ở cổng',
      say: '{a}Chiều hôm sau, thứ Sáu, có một ông già đạp xe đến đứng ở cổng nhà tôi. {b}Ông đội mũ cối bạc màu, mặc áo bộ đội cũ. Ông không dắt xe vào sân, cũng không gọi. Ông chỉ đứng ngoài cổng, đợi. {c}Lúc ông bỏ mũ ra, tôi thấy bàn tay ông chỉ còn những đốt ngón cụt ngắn.',
      draw(k) {
        const arrive = k.at('a', 6, 'out');
        congNha(k, { time: 'dusk' }, () => { if (k.t < k.cue('b')) dollBike(k, 1700 - arrive * 560, CONG.outY + 10, 300, { rider: { ...LOC, face: 'calm' }, flip: true }); else { xeDap(k, 1240, CONG.outY + 10, 0.9, { flip: true }); ch(k, 1060, CONG.outY, 300, { ...LOC, hat: after(k, 'c') ? null : LOC.hat, view: 'front', face: 'blank', arms: after(k, 'c') ? 'chest' : 'down' }); } });
        dimDusk(k, 1060); if (k.t < k.cue('a', 3)) chapter(k, 3, 'Người Đàn Ông Ở Cổng'); tag(k, 'THỨ SÁU · 15/11/1996', 'a');
      },
    },
    {
      say: '{a}Bà tôi vừa nhìn thấy ông đã buông cái rổ rau. Bà ra cổng, nhưng không mở cổng. Hai người nói chuyện qua hàng rào, rất nhỏ. {b}Rồi tôi thấy bà tôi ngồi thụp xuống đất. {c}Ông già đưa qua hàng rào một cái tay nải vải nâu, cúi đầu chào, rồi đạp xe đi.',
      draw(k) {
        congNha(k, { time: 'dusk' }, () => { if (k.t < k.cue('c', 3)) { xeDap(k, 1240, CONG.outY + 10, 0.9, { flip: true }); ch(k, 1060, CONG.outY, 300, { ...LOC, hat: null, view: 'front', face: 'sad', arms: after(k, 'c') ? 'hold' : 'down', talk: after(k, 'b') ? 0 : 0.4 }); if (after(k, 'c')) tayNai(k, 1060, CONG.outY - 100, 0.5); } else dollBike(k, 1240 + k.at(k.cue('c', 3), 5, 'in') * 700, CONG.outY + 10, 300, { rider: { ...LOC, face: 'sad' } }); });
        if (after(k, 'b')) ch(k, 900, 1060, 360, { ...BA, view: 'side', action: 'kneel', face: 'cry', tears: 0.7, arms: 'cover' }); else ch(k, 930, 1070, 380, { ...BA, view: 'side', face: 'blank', arms: 'hold', talk: 0.3 });
        dimDusk(k, 1000);
      },
    },
    {
      say: '{a}Bà bảo, đó là ông Lộc, người quen ở chùa. {b}Bà ôm cái tay nải vào nhà, mở tủ, cất vào trong. Qua vai bà, tôi kịp thấy một cái nón lá rách vành, một cuốn sổ bìa xanh, và một tờ giấy đánh máy. {c}Bà khoá tủ lại. Rồi bà rửa tay ba lần bằng xà phòng.',
      sfx: [['creak', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, BA, { face: 'sad', talk: 0.4, tears: 0.3 }); quote(k, '"Ông Lộc. Người quen ở chùa."', 'a', { size: 56 }); return; }
        if (k.t < k.cue('c')) { tuGan(k, { open: 1, nai: true }); shade(k, 0.4, [{ x: 960, y: 560, r: 760, warm: 1 }], { vig: 0.55 }); return; }
        tuGan(k, { open: 0 }); shade(k, 0.5, [{ x: 960, y: 560, r: 760, warm: 1 }], { vig: 0.55 }); quote(k, 'Bà rửa tay ba lần bằng xà phòng.', 'c', { size: 56 });
      },
    },
    {
      say: '{a}Tối ấy, bà gọi tôi ra đầu hiên, chỗ có đèn. Bà đưa tôi tờ giấy đánh máy ấy. {b}Bà bảo: {q}Con đọc cho bà nghe. Đọc nhỏ thôi. Đọc xong thì quên đi. {c}Bà tôi không biết chữ. Cả nhà, chỉ còn tôi đọc được.',
      draw(k) {
        sanNha(k, { time: 'night', moon: false }); oil(k, 560, 840, 0.8);
        ch(k, 640, 860, 300, { ...BA, view: 'side', action: 'sit', face: 'sad', arms: 'hold', talk: after(k, 'q') && !after(k, 'c') ? 0.5 : 0 }); ch(k, 820, 862, 250, { ...TOI, view: 'side', flip: true, action: 'sit', face: 'calm', arms: 'hold' });
        shade(k, 0.8, [{ x: 600, y: 780, r: 520, warm: 1, flicker: 1 }], { vig: 0.55 }); quote(k, '"Con đọc cho bà nghe. Đọc nhỏ thôi."', 'q', { size: 56 });
      },
    },
    {
      say: '{a}Tôi đọc. Khu điều trị phong Bãi Ổi. Giấy báo tử. {b}Họ và tên: Nguyễn Văn Khang. Năm sinh: 1925. Quê quán: làng tôi. {c}Từ trần hồi một giờ sáng, ngày mười bốn tháng Mười Một năm 1996.',
      sfx: [['heartbeat', 'c', 0.4]],
      draw(k) { const n = after(k, 'c') ? 7 : after(k, 'b') ? 5 : 2; giayBaoTu(k, n, { hi: after(k, 'c') ? [5, 6] : after(k, 'b') ? [2] : [] }); shade(k, 0.38, [{ x: 960, y: 540, r: 760, warm: 1, flicker: 1 }], { vig: 0.55 }); },
    },
    {
      say: '{a}Tôi đọc đi đọc lại cái tên ấy. Rồi tôi ngẩng lên nhìn bàn thờ. {b}Nguyễn Văn Khang, 1925, 1968. {c}Người trong ảnh đã chết hai mươi tám năm. Vậy mà tờ giấy này bảo, ông mới chết. Một giờ sáng hôm qua.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { giayBaoTu(k, 7, { hi: [2] }); shade(k, 0.38, [{ x: 960, y: 540, r: 760, warm: 1, flicker: 1 }], { vig: 0.55 }); return; }
        black(k, '#140e0a'); anhOng(k, 960, 470, 3.2, { years: '1925 – 1968' }); shade(k, 0.4, [{ x: 960, y: 480, r: 700, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, 'Ông mới chết. Một giờ sáng hôm qua.', 'c', { size: 58, color: AMBER });
      },
    },
    {
      say: '{a}Tôi hỏi bà: {q}Bà ơi, ông còn sống à? {b}Bà tôi không trả lời. Bà chỉ nói một câu, như nói với chính mình: {q2}Đúng một giờ. {c}Rồi bà cầm lấy tờ giấy, gấp làm tư, và xin tôi, xin thật sự, như xin một người lớn: {q3}Con đừng kể với ai. Cả bố con cũng đừng.',
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, TOI, { face: 'shock', talk: after(k, 'q') ? 0.5 : 0, warm: 0.7 }); quote(k, '"Bà ơi, ông còn sống à?"', 'q', { size: 58 }); return; }
        mat(k, BA, { face: after(k, 'c') ? 'cry' : 'blank', tears: after(k, 'c') ? 0.6 : 0, talk: after(k, 'q2') && !after(k, 'c') || after(k, 'q3') ? 0.45 : 0 }); quote(k, '"Đúng một giờ."', 'q2', { size: 60, color: COLD, until: 'c' }); quote(k, '"Con đừng kể với ai. Cả bố con cũng đừng."', 'q3', { size: 56, color: AMBER });
      },
    },
    {
      say: '{a}Tôi mười tuổi. Tôi giữ một bí mật mà tôi còn chưa hiểu nó là gì. {b}Nếu là bạn năm ấy, bạn có giữ lời với bà không? Hãy để lại suy nghĩ của bạn ở phần bình luận.',
      draw(k) { demBuong(k, { face: 'sad', a: 0.84 }); quote(k, 'Nếu là bạn, bạn có giữ lời với bà không?', 'b', { size: 56, color: AMBER }); },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Đêm thứ hai',
      say: '{a}Đêm thứ Bảy, rạng sáng Chủ nhật, tôi không ngủ. Tôi nằm nghe tiếng đồng hồ quả lắc nhà bà Thơm vọng sang. Một tiếng. {k1}Cộc. {k2}Cộc. {k3}Cộc. {c}Ba tiếng gõ, đúng như đêm trước. Đúng một giờ.',
      sfx: [['gong', ['a', 5.5], 0.18], ['knock', 'k1', 0.8], ['knock', 'k2', 0.8], ['knock', 'k3', 0.8]],
      draw(k) {
        if (k.t < k.cue('k1', -0.4)) { demBuong(k, { face: 'fear' }); if (k.t < k.cue('a', 3)) chapter(k, 4, 'Đêm Thứ Hai'); tag(k, 'RẠNG SÁNG CHỦ NHẬT · 17/11/1996', 'a'); return; }
        cua(k); go(k, CUA.knock.x, CUA.knock.y, knocks(k)); shade(k, 0.74, [{ x: 960, y: 500, r: 720 }], { vig: 0.6 }); quote(k, 'Đúng một giờ.', 'c', { color: AMBER, size: 64 });
      },
    },
    {
      say: '{a}Lần này, bà tôi không mở cửa. Bà ra ngồi bệt xuống nền gạch, lưng tựa vào cánh cửa, như để giữ nó lại. {b}Rồi bà nói với cánh cửa, giọng run run: {q}Ông về đủ rồi. Ông đi đi. Thằng Thắng nó chưa biết gì đâu. {c}Thắng là tên bố tôi.',
      draw(k) {
        cua(k); oil(k, 1500, 1010, 0.8);
        ch(k, 860, 1090, 720, { ...BA, hat: null, view: 'side', flip: true, action: 'sit', face: after(k, 'b') ? 'cry' : 'sad', tears: after(k, 'b') ? 0.6 : 0, arms: 'chest', talk: after(k, 'q') && !after(k, 'c') ? 0.45 : 0 });
        shade(k, 0.72, [{ x: 1500, y: 940, r: 620, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, '"Ông về đủ rồi. Ông đi đi. Thằng Thắng nó chưa biết gì đâu."', 'q', { size: 52 });
      },
    },
    {
      say: '{a}Bên ngoài im lặng rất lâu. Chỉ có gió. Và qua khe cửa, mùi thuốc lào lại bay vào, khét, ngai ngái. {b}Rồi bà tôi ngồi đó đến sáng, một tay áp lên cánh cửa, như áp lên lưng một người.',
      sfx: [['wind', 'a', 0.35]],
      draw(k) {
        cua(k); oil(k, 1500, 1010, 0.8); khoi(k, 960, 560, 1, 380);
        ch(k, 860, 1090, 720, { ...BA, hat: null, view: 'side', flip: true, action: 'sit', face: 'sad', arms: after(k, 'b') ? { r: [[10, -2], [16, -14]] } : 'chest' });
        shade(k, 0.72, [{ x: 1500, y: 940, r: 620, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, 'Như áp lên lưng một người.', 'b', { size: 56, color: AMBER });
      },
    },
    {
      say: '{a}Trưa thứ Hai, tan học, tôi không về nhà. Tôi đi bộ ba cây số sang làng bên, nhà cô Thoa, em gái bố tôi. {b}Tôi kể hết. Tiếng gõ, mùi thuốc lào, ông Lộc, tờ giấy báo tử. {c}Cô Thoa nghe xong, mặt trắng bệch. Cô bảo: {q}Hồi bé, cô cũng bị bà doạ Ông Kẹ. Gõ đúng ba tiếng.',
      draw(k) {
        if (k.t < k.cue('b')) { duong(k, 'noon'); ch(k, 200 + k.at('a', 9, 'linear') * 1300, 990, 280, { ...TOI, view: 'side', action: 'walk', face: 'blank', arms: 'hold' }); dimDay(k); tag(k, 'THỨ HAI · 18/11/1996', 'a'); return; }
        if (k.t < k.cue('c')) { sanNha(k, { time: 'noon' }); ch(k, 820, 900, 270, { ...TOI, view: 'side', face: 'sad', arms: 'chest', talk: 0.5 }); ch(k, 1060, 905, 330, { ...CO, view: 'side', flip: true, face: 'calm', arms: 'hold' }); dimDay(k); return; }
        mat(k, CO, { face: 'shock', talk: after(k, 'q') ? 0.45 : 0 }); quote(k, '"Hồi bé, cô cũng bị bà doạ Ông Kẹ. Gõ đúng ba tiếng."', 'q', { size: 54, color: AMBER });
      },
    },
    {
      say: '{a}Tối ấy cô Thoa đạp xe chở tôi về. Cô và bà nói chuyện dưới bếp đến khuya. Tôi chỉ nghe được tiếng cô, càng lúc càng to, còn bà thì im lặng. {b}Sáng hôm sau, cô ra bưu điện xã đánh điện cho bố tôi. Bức điện chỉ có mấy chữ: {q}Anh Thắng về ngay. Chuyện của bố.',
      draw(k) {
        if (k.t < k.cue('b')) { bepVach(k); hearth(k, 1300, 900, 1.2, 0.7); ch(k, 760, 980, 360, { ...CO, view: 'side', face: 'angry', arms: 'point', talk: 0.7 }); ch(k, 1080, 990, 330, { ...BA, view: 'side', flip: true, action: 'sit', face: 'blank', arms: 'chest' }); shade(k, 0.74, [{ x: 1300, y: 820, r: 640, warm: 1, flicker: 1 }], { vig: 0.55 }); return; }
        dienTin(k, { p: k.at('q', 3, 'linear') }); shade(k, 0.3, [{ x: 960, y: 540, r: 900 }], { vig: 0.5 });
      },
    },
    {
      say: '{a}Chiều thứ Tư, bố tôi về, đi chuyến xe khách sớm nhất từ Cẩm Phả, quần áo còn bám bụi than. {b}Bố đứng giữa sân, nhìn bà, giọng khản đặc: {q}Mẹ giấu chúng con chuyện gì?',
      sfx: [['wind', 'a', 0.2]],
      draw(k) {
        if (k.t < k.cue('b')) { duong(k, 'dusk'); xeKhach(k, 600 + k.at('a', 4, 'out') * 300, 1000, 0.9); if (k.t > k.cue('a', 4)) ch(k, 1300, 990, 330, { ...BO, view: 'side', flip: true, face: 'blank', arms: 'hold' }); dimDusk(k, 900); tag(k, 'THỨ TƯ · 20/11/1996', 'a'); return; }
        sanNha(k, { time: 'dusk' }); ch(k, 1000, 905, 340, { ...BO, view: 'side', flip: true, face: 'angry', arms: 'down', talk: after(k, 'q') ? 0.6 : 0 }); ch(k, 720, 900, 300, { ...BA, view: 'side', face: 'sad', arms: 'chest' }); ch(k, 1250, 905, 320, { ...CO, view: 'side', flip: true, face: 'sad', arms: 'chest' }); dimDusk(k, 900); quote(k, '"Mẹ giấu chúng con chuyện gì?"', 'q', { size: 58, color: AMBER });
      },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Cái tủ gỗ mít',
      say: '{a}Tối hôm ấy, bà tôi tháo cái chìa khoá trên cổ ra. Hai mươi tám năm, đó là lần đầu tiên. {b}Bà mở cái tủ gỗ mít trước mặt bố tôi, cô Thoa, và tôi. {c}Trong tủ có cái áo bông cũ, cái nón, cái bát men xanh sứt miệng, một cái điếu cày, mấy gói thuốc lào còn nguyên. Và cái tay nải của ông Lộc.',
      sfx: [['creak', 'b', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, BA, { face: 'blank', key: true, after: () => {} }); if (k.t < k.cue('a', 3)) chapter(k, 5, 'Cái Tủ Gỗ Mít'); return; }
        if (k.t < k.cue('c')) { demNha(k, { tu: k.at('b', 3, 'inOut') }, () => { ch(k, 1150, 1000, 320, { ...BA, view: 'side', face: 'blank', arms: 'raise' }); ch(k, 760, 1010, 340, { ...BO, view: 'side', face: 'blank', arms: 'down' }); ch(k, 600, 1010, 310, { ...CO, view: 'side', face: 'sad', arms: 'chest' }); ch(k, 460, 1015, 250, { ...TOI, view: 'side', face: 'fear', arms: 'down' }); }); return; }
        tuGan(k, { open: 1, nai: true }); shade(k, 0.4, [{ x: 960, y: 560, r: 760, warm: 1, flicker: 1 }], { vig: 0.55 });
      },
    },
    {
      say: '{a}Bà ngồi xuống cạnh tủ và kể. {b}Năm 1968, tay ông nội tôi bắt đầu mất cảm giác. Ông bị bỏng mà không biết đau. Trên lưng ông nổi những mảng da loang. {c}Ông đi khám ở huyện. Người ta bảo ông bị bệnh phong. Ngày ấy, người làng gọi là bệnh hủi.',
      draw(k) {
        if (k.t < k.cue('b')) { demNha(k, { tu: 1 }, () => ch(k, 1150, 1000, 320, { ...BA, view: 'side', flip: true, action: 'sit', face: 'sad', arms: 'chest', talk: 0.4 })); return; }
        sanNha(k, { time: 'day' }); const i = ch(k, 860, 900, 330, { ...ONG, hat: null, view: 'front', face: after(k, 'c') ? 'sad' : 'calm', arms: 'hold' }); if (after(k, 'c')) tayQuan(k, i, 330, { other: [860 - (i.hand[0] - 860), i.hand[1]] }); ch(k, 1100, 900, 300, { ...BA_TRE, view: 'side', flip: true, face: 'sad', arms: 'chest' });
        dimDay(k); cold(k); tag(k, 'NĂM 1968', 'b'); quote(k, 'Bệnh phong. Người làng gọi là bệnh hủi.', 'c', { size: 56, color: AMBER });
      },
    },
    {
      say: '{a}Hồi ấy, nhà nào có người bị hủi thì cả nhà bị xa lánh. Con cái không ai cho chơi cùng, lớn lên không ai dạm hỏi. {b}Ông tự đi vào trại phong Bãi Ổi. Trước khi đi, ông dặn bà: {q}Bà cứ bảo tôi chết rồi. Chết ở đâu xa xa. Để các con nó còn được đi học, còn lấy vợ lấy chồng.',
      draw(k) {
        if (k.t < k.cue('b')) { gocDa(k, { time: 'day' }); XOM.forEach((p, i) => ch(k, 1300 + i * 150 - k.at('a', 8, 'linear') * 200, 900, 300, { ...p, view: 'side', face: 'blank', arms: 'hold' })); ch(k, 700, 900, 230, { ...BO_NHO, view: 'side', face: 'sad', arms: 'down' }); dimDay(k); cold(k); return; }
        demSan(k, { a: 0.7, lights: [{ x: 1400, y: 600, r: 600 }] }, () => { ch(k, 1300 + k.at('b', 10, 'linear') * 400, 900, 330, { ...ONG, view: 'side', action: 'walk', face: 'sad', arms: 'hold' }); tayNai(k, 1340 + k.at('b', 10, 'linear') * 400, 760, 0.5); }); cold(k); quote(k, '"Bà cứ bảo tôi chết rồi. Để các con nó còn được đi học."', 'q', { size: 52, color: AMBER });
      },
    },
    {
      say: '{a}Bà làm đúng như thế. Bà lập bàn thờ, treo ảnh, khóc một đám tang không có người nằm trong quan tài. {b}Cả làng tin. Bố tôi năm ấy mười tuổi, cũng tin.',
      draw(k) {
        nha(k, { time: 'day', incense: true }); ch(k, 760, 1000, 320, { ...BA_TRE, view: 'side', action: 'kneel', face: 'cry', tears: 0.7, arms: 'chest' }); ch(k, 1000, 1000, 250, { ...BO_NHO, view: 'side', face: 'sad', arms: 'down' }); ch(k, 1160, 1005, 210, { ...CO_NHO, view: 'side', face: 'sad', arms: 'down' });
        shade(k, 0.3, [{ x: 900, y: 500, r: 1200 }], { vig: 0.5 }); cold(k); tag(k, 'THÁNG CHẠP 1968', 'a');
      },
    },
    {
      say: '{a}Nhưng ông không chịu được. Mùa đông năm sau, một đêm gió bấc, ông đi bộ mười tám cây số về làng, đứng ở sân. Ông không dám gọi, chỉ dám gõ cửa. {b}Ba tiếng. {c}Bà mở cửa. Ông không bước vào buồng. Ông chỉ đứng ở cửa buồng, nhìn hai đứa con ngủ. Rồi đi.',
      sfx: [['knock', ['b', 0.1], 0.6], ['knock', ['b', 0.7], 0.6], ['knock', ['b', 1.3], 0.6]],
      draw(k) {
        if (k.t < k.cue('b')) { duong(k, 'night'); ch(k, 200 + k.at('a', 10, 'linear') * 1400, 990, 330, { ...ONG, view: 'side', action: 'walk', face: 'calm', arms: 'down' }); shade(k, 0.78, [{ x: 960, y: 600, r: 900 }], { vig: 0.55 }); cold(k); return; }
        if (k.t < k.cue('c')) { cua(k); go(k, CUA.knock.x, CUA.knock.y, [k.cue('b', 0.1), k.cue('b', 0.7), k.cue('b', 1.3)]); shade(k, 0.76, [{ x: 960, y: 500, r: 720 }], { vig: 0.6 }); cold(k); quote(k, 'Ba tiếng.', 'b', { size: 66, color: AMBER }); return; }
        buong(k, { net: 0.8, doorFn: () => ch(k, BUONG.door, 900, 360, { ...ONG, view: 'front', face: 'sad', arms: 'down', alpha: 0.95 }) }, () => { lie(k, 1080, 744, 250, { ...BO_NHO, face: 'sleep' }); lie(k, 1460, 744, 210, { ...CO_NHO, face: 'sleep' }); chan(k, 760, 1600, 762); });
        shade(k, 0.82, [{ x: BUONG.door, y: 600, r: 380 }, { x: 1100, y: 640, r: 400 }], { vig: 0.6 }); cold(k); quote(k, 'Ông chỉ đứng ở cửa buồng, nhìn hai đứa con ngủ.', 'c', { size: 54 });
      },
    },
    {
      say: '{a}Từ đấy, mỗi năm ông về ba bốn lần, toàn vào những đêm mùa đông dài. Gõ ba tiếng. Ngồi bên bếp ăn một bát cơm, bằng cái bát riêng bà để trong tủ. Rít một điếu thuốc lào. Đứng ở cửa buồng nhìn con. Rồi vác bao gạo bà gói sẵn, đi bộ về trại trước khi gà gáy. {b}Và để hai đứa con không bao giờ ra mở cửa, bà dựng nên Ông Kẹ. {c}Ông Kẹ gõ đúng ba tiếng. Ông Kẹ đứng ở cửa buồng nhìn con nít ngủ. Ông Kẹ vác bao tải. {d}Bà không bịa ra điều gì cả. Bà chỉ kể đúng những gì ông làm.',
      draw(k) {
        if (k.t < k.cue('b')) { bep1970(k, { dieu: true }); cold(k, 0.6); return; }
        if (k.t < k.cue('d')) { buong(k, { net: 0.8 }, () => { lie(k, 1080, 744, 250, { ...BO_NHO, face: 'fear' }); lie(k, 1460, 744, 210, { ...CO_NHO, face: 'fear' }); chan(k, 760, 1600, 762); ch(k, 470, 900, 320, { ...BA_TRE, view: 'side', action: 'sit', face: 'calm', arms: 'point', talk: 0.6 }); }); oil(k, 380, 900, 0.8); shade(k, 0.78, [{ x: 400, y: 820, r: 640, warm: 1, flicker: 1 }], { vig: 0.6 }); cold(k, 0.6); return; }
        black(k, '#120c08'); bat(k, 960, 640, 3.2); shade(k, 0.4, [{ x: 960, y: 560, r: 640, warm: 1 }], { vig: 0.6 }); quote(k, 'Bà chỉ kể đúng những gì ông làm.', 'd', { size: 58, color: AMBER });
      },
    },
    {
      say: '{a}Bố tôi ngồi lặng đi. Rồi bố hỏi, rất khẽ: {q}Thế cái đêm con mười hai tuổi… {b}Bà gật đầu. Mùa đông năm 1970, bố tôi tỉnh giấc, lần xuống bếp, nhìn thấy một người đàn ông đội nón, tay quấn vải, đang ngồi ăn cơm bên bếp lửa. {c}Người ấy ngẩng lên, nhìn bố, rồi đưa bàn tay quấn vải lên môi. Suỵt.',
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, BO, { face: 'blank', talk: after(k, 'q') ? 0.4 : 0 }); quote(k, '"Thế cái đêm con mười hai tuổi…"', 'q', { size: 56 }); return; }
        bep1970(k, { shh: after(k, 'c', 2.5) }); khe(k); cold(k, 0.6); tag(k, 'MÙA ĐÔNG 1970', 'b'); quote(k, 'Suỵt.', k.cue('c', 2.5), { size: 70, color: COLD });
      },
    },
    {
      say: '{a}Bố tôi khóc. Một người đàn ông ba mươi tám tuổi, làm thợ lò, ngồi khóc như đứa trẻ. {b}Bố bảo: {q}Thế mà con sợ bố con suốt hai mươi sáu năm. {c}Bà kể, sau đêm ấy, mỗi lần trong nhà có tiếng động, ông lại vào trốn trong cái tủ. Đợi cả nhà ngủ say, ông gõ một tiếng từ bên trong, để bà ra mở cho ông đi. {d}Cái chỗ gỗ mòn nhẵn trong cánh tủ, là hai mươi sáu năm của những tiếng gõ ấy.',
      sfx: [['knock', ['c', 4.5], 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) { mat(k, BO, { face: 'cry', tears: 0.9, arms: 'cover', talk: after(k, 'q') ? 0.4 : 0 }); quote(k, '"Thế mà con sợ bố con suốt hai mươi sáu năm."', 'q', { size: 56, color: AMBER }); return; }
        zoom(k, 560, 680, after(k, 'd') ? 1 + k.at('d', 3) * 1.6 : 1, () => tuGan(k, { open: 1, dent: after(k, 'd') ? 1 : 0.3 })); if (!after(k, 'd')) go(k, 560, 680, [k.cue('c', 4.5)], { color: '190,210,230', r: 200 }); shade(k, 0.42, [{ x: 960, y: 540, r: 800, warm: 1, flicker: 1 }], { vig: 0.55 }); quote(k, 'Hai mươi sáu năm của những tiếng gõ ấy.', 'd', { size: 56, color: AMBER });
      },
    },
    {
      say: '{a}Cô Thoa hỏi bà: {q}Sao chúng con lớn rồi, mẹ vẫn không nói? {b}Bà bảo: {q2}Ông không cho. Ông bảo, các con nó yên ổn rồi. Nói ra, chúng nó lại phải chọn, giữa làng và bố. Ông không muốn các con phải chọn.',
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, CO, { face: 'cry', tears: 0.5, talk: after(k, 'q') ? 0.45 : 0 }); quote(k, '"Sao chúng con lớn rồi, mẹ vẫn không nói?"', 'q', { size: 56 }); return; }
        mat(k, BA, { face: 'sad', tears: 0.4, talk: after(k, 'q2') ? 0.45 : 0 }); quote(k, '"Ông không muốn các con phải chọn."', k.cue('q2', 4.5), { size: 58, color: AMBER });
      },
    },

    // ===== CHƯƠNG 6 =====
    {
      chapter: 'Cuốn sổ bìa xanh',
      say: '{a}Trong tay nải có cuốn sổ bìa xanh. Chữ ông nội tôi nghiêng nghiêng, run run, mỗi lần về làng, ông ghi một dòng. {b}Bố tôi đọc to cho cả nhà nghe. Bà ngồi nghe, mắt nhắm lại, như đang nghe ông nói.',
      draw(k) {
        if (k.t < k.cue('b')) { so(k, 0, 0, 1, { lines: SO.slice(0, 2), n: 2 }); shade(k, 0.35, [{ x: 960, y: 540, r: 900, warm: 1, flicker: 1 }], { vig: 0.5 }); if (k.t < k.cue('a', 3)) chapter(k, 6, 'Cuốn Sổ Bìa Xanh'); return; }
        demNha(k, { tu: 1, lights: [{ x: 900, y: 760, r: 560, warm: 1, flicker: 1 }] }, () => { oil(k, 900, 930, 0.8); ch(k, 760, 1010, 340, { ...BO, view: 'side', action: 'sit', face: 'sad', arms: 'hold', talk: 0.5 }); ch(k, 1080, 1010, 310, { ...BA, view: 'side', flip: true, action: 'sit', face: 'sleep', arms: 'chest' }); ch(k, 560, 1012, 300, { ...CO, view: 'side', action: 'sit', face: 'sad', arms: 'chest' }); ch(k, 400, 1015, 240, { ...TOI, view: 'side', action: 'sit', face: 'calm', arms: 'hold' }); });
      },
    },
    {
      say: '{a}Tháng Chạp năm 1970: {q}Thằng Thắng thức. Nó nhìn thấy mình. Mình bảo nó suỵt. Nó sợ, khóc. Từ nay vào tủ. {b}Tháng Giêng năm 1985: {q2}Thằng Thắng lấy vợ. Đứng ngoài ngõ nghe tiếng pháo. {c}Tháng Mười năm 1986: {q3}Có cháu nội. Con trai.',
      draw(k) { const n = after(k, 'c') ? 5 : after(k, 'b') ? 4 : 3; so(k, 0, 0, 1, { lines: SO.slice(0, 5), n, hi: n - 1 }); shade(k, 0.35, [{ x: 960, y: 540, r: 900, warm: 1, flicker: 1 }], { vig: 0.5 }); },
    },
    {
      say: '{a}Rồi bố tôi dừng lại ở một dòng, nhìn sang tôi. Tháng Chạp năm 1993: {q}Thằng cháu ngủ hở chân. Đắp cho nó. Bà nó mắng. {b}Tôi nhớ đến những đêm mùa đông tỉnh dậy thấy chăn kín cổ. Không phải bà. {c}Bà mắng, vì ngày ấy người ta vẫn sợ, sợ cái bệnh ông mang, dù ông đã khỏi từ lâu.',
      draw(k) {
        if (k.t < k.cue('b')) { so(k, 0, 0, 1, { lines: SO.slice(0, 6), n: 6, hi: 5 }); shade(k, 0.35, [{ x: 960, y: 540, r: 900, warm: 1, flicker: 1 }], { vig: 0.5 }); return; }
        if (k.t < k.cue('c')) { buong(k, { net: 0.8, doorFn: () => ch(k, BUONG.door, 900, 360, { ...ONG, kind: 'old', view: 'front', face: 'calm', arms: 'down', alpha: 0.9 }) }, () => { lie(k, 1520, 720, 300, { ...BA, hat: null, face: 'sleep' }); lie(k, 1080, 744, 230, { ...TOI, face: 'sleep' }); chan(k, 640, 1600, 762); }); shade(k, 0.84, [{ x: 1000, y: 640, r: 460 }, { x: BUONG.door, y: 600, r: 300 }], { vig: 0.6 }); cold(k); tag(k, 'THÁNG CHẠP 1993', 'b'); quote(k, 'Không phải bà.', 'b', { size: 60, color: COLD }); return; }
        mat(k, TOI, { face: 'cry', tears: 0.6, warm: 0.7 });
      },
    },
    {
      say: '{a}Dòng cuối cùng, nét chữ xiêu vẹo hẳn. Mười ba tháng Mười Một năm 1996: {q}Đêm nay về. Lộc không chở. Thì đi bộ. {b}Ông mất lúc một giờ sáng hôm sau, trên giường trong trại, cách nhà tôi mười tám cây số.',
      sfx: [['heartbeat', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { so(k, 0, 0, 1, { lines: SO, n: SO.length, hi: SO.length - 1, shaky: true }); shade(k, 0.35, [{ x: 960, y: 540, r: 900, warm: 1, flicker: 1 }], { vig: 0.5 }); return; }
        black(k, '#08090e'); k.text('1 GIỜ SÁNG · 14/11/1996', 960, 470, { size: 64, font: 'title', color: COLD, fx: 'fade', p: k.at('b', 1) }); k.text('cách nhà mười tám cây số', 960, 570, { size: 44, color: '#a8a090', fx: 'fade', p: k.at('b', 1.5) });
      },
    },
    {
      say: '{a}Sáng thứ Năm, bố tôi đạp xe lên trại phong Bãi Ổi. Tôi ngồi sau. {b}Trại là mấy dãy nhà cấp bốn quét vôi vàng, mái ngói thấp, trước sân trồng mấy cây bàng. Những người trong trại ngồi đan rổ, có người không còn ngón tay. Họ nhìn bố con tôi, không ai nói gì. {c}Ông Lộc dẫn chúng tôi ra nghĩa trang sau trại. Mộ ông nội tôi là một nấm đất mới, cắm tấm biển gỗ viết tên bằng sơn trắng.',
      draw(k) {
        if (k.t < k.cue('b')) { duong(k, 'day'); const x = 200 + k.at('a', 8, 'linear') * 1300; dollBike(k, x, 990, 340, { rider: { ...BO, face: 'blank' } }); ch(k, x - 70, 905, 200, { ...TOI, view: 'side', action: 'sit', face: 'calm', arms: 'hold', shadow: false }); dimDay(k); tag(k, 'THỨ NĂM · 21/11/1996', 'a'); return; }
        if (k.t < k.cue('c')) { trai(k); BENH.forEach((p, i) => { const x = [300, 560, 1500][i]; ch(k, x, 900, 290, { ...p, view: 'side', flip: i === 2, action: 'sit', face: 'blank', arms: 'hold' }); ro(k, x + (i === 2 ? -60 : 60), 900, 0.7); }); ch(k, 960, 980, 330, { ...BO, view: 'side', face: 'blank', arms: 'down' }); ch(k, 1100, 985, 250, { ...TOI, view: 'side', face: 'calm', arms: 'down' }); dimDay(k); return; }
        nghiaTrai(k); ch(k, 600, 980, 330, { ...LOC, view: 'side', face: 'sad', arms: 'down' }); ch(k, 1300, 985, 340, { ...BO, view: 'side', flip: true, face: 'blank', arms: 'down' }); ch(k, 1480, 990, 250, { ...TOI, view: 'side', flip: true, face: 'sad', arms: 'down' }); dimDay(k);
      },
    },
    {
      say: '{a}Ông Lộc kể, mấy năm nay chân ông nội yếu, toàn ông Lộc đèo về làng bằng xe đạp, đứng đợi ở đầu ngõ. {b}Đêm mười ba, ông nội sốt cao, cứ đòi về. Ông Lộc không chở. {c}Ông Lộc bảo: {q}Gần một giờ, bác ấy tỉnh lại, giơ tay gõ lên thành giường. Ba cái. Rồi bác ấy đi.',
      sfx: [['knock', ['q', 4.2], 0.3], ['knock', ['q', 4.8], 0.3], ['knock', ['q', 5.4], 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { duong(k, 'night'); dollBike(k, 500 + k.at('a', 8, 'linear') * 600, 990, 330, { rider: { ...LOC, face: 'calm' } }); ch(k, 430 + k.at('a', 8, 'linear') * 600, 905, 260, { ...ONG, kind: 'old', view: 'side', action: 'sit', face: 'calm', arms: 'hold', shadow: false }); shade(k, 0.78, [{ x: 900, y: 600, r: 900 }], { vig: 0.55 }); cold(k); return; }
        mat(k, LOC, { face: 'sad', talk: 0.5, warm: 0.8 }); quote(k, '"Bác ấy giơ tay gõ lên thành giường. Ba cái."', k.cue('q', 3), { size: 54, color: AMBER });
      },
    },
    {
      say: '{a}Bố tôi quỳ xuống trước nấm mộ, lạy ba lạy. {b}Bố bảo: {q}Con về rồi đây, bố ạ. Con không sợ nữa.',
      draw(k) { nghiaTrai(k); ch(k, NT.x + 260, 990, 300, { ...BO, view: 'side', flip: true, action: 'kneel', face: 'cry', tears: 0.7, arms: 'chest', talk: after(k, 'q') ? 0.4 : 0 }); ch(k, NT.x + 480, 990, 250, { ...TOI, view: 'side', flip: true, face: 'sad', arms: 'down' }); dimDay(k); quote(k, '"Con về rồi đây, bố ạ. Con không sợ nữa."', 'q', { size: 56, color: AMBER }); },
    },
    {
      say: '{a}Chiều hôm ấy, bố tôi hạ tấm ảnh trên bàn thờ xuống, sửa lại dòng chữ: 1925, 1996. {b}Cả làng biết chuyện. Có nhà từ đó không sang chơi nữa. Có nhà tránh mặt bà tôi ngoài chợ. {c}Nhưng tối ấy, bà Thơm sang thắp cho ông một nén hương, rồi ngồi với bà tôi đến khuya, không nói gì, chỉ nắm tay.',
      draw(k) {
        if (k.t < k.cue('b')) { black(k, '#140e0a'); anhOng(k, 960, 470, 3.2, { years: k.t > k.cue('a', 3) ? '1925 – 1996' : '1925 – 1968' }); shade(k, 0.35, [{ x: 960, y: 480, r: 700, warm: 1 }], { vig: 0.6 }); return; }
        if (k.t < k.cue('c')) { gocDa(k, { time: 'day' }); ch(k, 700, 900, 300, { ...BA, view: 'side', face: 'blank', arms: 'hold' }); XOM.slice(0, 2).forEach((p, i) => ch(k, 1250 + i * 160, 900, 300, { ...p, view: 'side', face: 'blank', arms: 'hold' })); dimDay(k); return; }
        demNha(k, { years: '1925 – 1996', incense: true }, () => { ch(k, 820, 1000, 300, { ...BA, view: 'side', action: 'sit', face: 'sad', arms: 'chest' }); ch(k, 1000, 1000, 300, { ...THOM, view: 'side', flip: true, action: 'sit', face: 'sad', arms: 'point' }); });
      },
    },

    // ===== CHƯƠNG 7 =====
    {
      chapter: 'Tiếng gõ thứ tư',
      say: '{a}Đêm ấy, bố tôi kê cái chõng ở gian giữa, nằm ngay cạnh cửa. Bà và tôi nằm trong buồng. Không ai ngủ được. {b}Một giờ sáng. {k1}Cộc. {k2}Cộc. {k3}Cộc.',
      sfx: [['wind', 'a', 0.3], ['knock', 'k1', 0.85], ['knock', 'k2', 0.85], ['knock', 'k3', 0.85]],
      draw(k) {
        if (k.t < k.cue('k1', -0.4)) { demNha(k, { chong: true, years: '1925 – 1996' }, () => lie(k, 960, 900, 320, { ...BO, face: after(k, 'b') ? 'fear' : 'sleep' })); if (k.t < k.cue('a', 3)) chapter(k, 7, 'Tiếng Gõ Thứ Tư'); tag(k, 'ĐÊM 21 RẠNG SÁNG 22/11/1996', 'a'); return; }
        cua(k); go(k, CUA.knock.x, CUA.knock.y, knocks(k)); shade(k, 0.74, [{ x: 960, y: 500, r: 720 }], { vig: 0.6 }); quote(k, 'Cộc. Cộc. Cộc.', 'k1', { color: AMBER, size: 70 });
      },
    },
    {
      say: '{a}Bà tôi buột miệng, theo thói quen của hai mươi tám năm: {q}Đừng thưa! {b}Nhưng bố tôi đã ngồi dậy. Lần đầu tiên trong đời, bố thưa: {q2}Bố ơi. Con đây. {c}Bố kéo then, mở toang cánh cửa.',
      sfx: [['creak', 'c', 0.5], ['wind', 'c', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { mat(k, { ...BA, hat: null }, { face: 'fear', talk: after(k, 'q') ? 0.6 : 0 }); quote(k, '"Đừng thưa!"', 'q', { size: 66, color: AMBER }); return; }
        if (k.t < k.cue('c')) { mat(k, BO, { face: 'sad', talk: after(k, 'q2') ? 0.5 : 0 }); quote(k, '"Bố ơi. Con đây."', 'q2', { size: 64, color: AMBER }); return; }
        cua(k, { open: k.at('c', 2.2, 'inOut') }); shade(k, 0.66, [{ x: 960, y: 600, r: 900 }], { vig: 0.6 });
      },
    },
    {
      say: '{a}Ngoài sân không có ai. Chỉ có sương, trắng đục, và mùi thuốc lào, rất nhạt. {b}Bố tôi đứng ở bậu cửa rất lâu, quay lưng vào nhà. {c}Và tôi nghe thấy nó.',
      sfx: [['wind', 'a', 0.3], ['heartbeat', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { demSan(k, { mist: 0.75, lights: [{ x: 700, y: 700, r: 520, warm: 1, flicker: 1 }] }); khoi(k, 640, 840, 0.6, 300); return; }
        if (k.t < k.cue('c')) { demNha(k, { door: 1, chong: true, years: '1925 – 1996', lights: [LAMP, { x: 330, y: 600, r: 380 }] }, () => ch(k, 330, 880, 340, { ...BO, view: 'front', face: 'sleep', arms: 'down', alpha: 0.92 })); return; }
        mat(k, TOI, { face: 'fear', warm: 0.5, bg: '#0a0c12' });
      },
    },
    {
      say: '{k1}Cộc. {b}Một tiếng. Khẽ thôi, nhưng rõ ràng. Không phải từ cánh cửa bố đang đứng. Mà từ bên trong cái tủ gỗ, cái tủ bà đã khoá lại từ chiều. {c}Đúng cái tiếng ông vẫn gõ suốt hai mươi sáu năm, để bà ra mở cho ông đi.',
      lead: 1.4,
      sfx: [['knock', 'k1', 0.55], ['stinger', ['k1', 0.4], 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) { tuGan(k, { open: 0 }); go(k, 960, 560, [k.cue('k1')], { color: '190,210,230', r: 320 }); shade(k, 0.74, [{ x: 960, y: 560, r: 640, warm: 1, flicker: 1 }], { vig: 0.6 }); quote(k, 'Cộc.', 'k1', { size: 80, color: COLD, until: 'b' }); quote(k, 'Từ bên trong cái tủ gỗ.', 'b', { size: 60, color: COLD }); return; }
        demNha(k, { door: 1, chong: true, years: '1925 – 1996' }, () => { ch(k, 330, 880, 340, { ...BO, view: 'front', face: 'sleep', arms: 'down', alpha: 0.92 }); ch(k, 1700, 990, 300, { ...BA, hat: null, view: 'side', flip: true, face: 'shock', arms: 'chest' }); });
      },
    },
    {
      say: '{a}Bà tôi đứng dậy. Trong ánh đèn dầu, bà tháo chìa khoá, mở hai cánh tủ ra. {b}Trong tủ không có gì khác. Vẫn cái áo bông, cái nón, cái bát men xanh. {c}Bà đứng nhìn vào trong tủ, rồi nói khẽ: {q}Ông đi đấy à. Ông đi đi. Lần này, không ai phải giấu ông nữa.',
      sfx: [['creak', 'a', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { demNha(k, { door: 1, chong: true, years: '1925 – 1996', tu: k.at(k.cue('a', 3), 2.5, 'inOut') }, () => ch(k, 1180, 1000, 320, { ...BA, hat: null, view: 'side', face: 'blank', arms: 'raise' })); return; }
        if (k.t < k.cue('c')) { tuGan(k, { open: 1, dent: 1 }); shade(k, 0.45, [{ x: 960, y: 560, r: 760, warm: 1, flicker: 1 }], { vig: 0.55 }); return; }
        mat(k, { ...BA, hat: null }, { face: 'cry', tears: 0.7, talk: after(k, 'q') ? 0.4 : 0 }); quote(k, '"Lần này, không ai phải giấu ông nữa."', k.cue('q', 3), { size: 58, color: AMBER });
      },
    },
    {
      say: '{a}Bà để hai cánh tủ mở như thế đến sáng. Từ đêm ấy, ngôi nhà ba gian của bà không bao giờ còn nghe tiếng gõ nữa. {b}Sau này tôi hỏi bố có nghe thấy tiếng gõ thứ tư không. Bố bảo bố chỉ nghe tiếng gió. {c}Nhưng sáng hôm sau, tôi thấy bố đứng rất lâu trước cái tủ, bàn tay đặt lên chỗ gỗ mòn nhẵn bên trong cánh cửa.',
      draw(k) {
        if (k.t < k.cue('b')) { nha(k, { time: 'day', tu: 1, years: '1925 – 1996', door: 1, outside: 'day' }); shade(k, 0.3, [{ x: 600, y: 400, r: 1400 }], { vig: 0.5 }); tag(k, 'SÁNG HÔM SAU', 'a'); return; }
        if (k.t < k.cue('c')) { mat(k, BO, { face: 'blank', talk: 0.3, warm: 0.8 }); quote(k, '"Bố chỉ nghe tiếng gió."', 'b', { size: 58 }); return; }
        nha(k, { time: 'day', tu: 1, years: '1925 – 1996' }); ch(k, 1150, 1000, 340, { ...BO, view: 'side', face: 'sad', arms: { r: [[12, 0], [24, -8]] } }); shade(k, 0.3, [{ x: 1300, y: 500, r: 1000 }], { vig: 0.5 });
      },
    },

    // ===== KẾT =====
    {
      say: '{a}Năm 1999, bố tôi xin cải táng, đưa ông về nằm ở cánh đồng sau làng. Lần đầu tiên, ông nội tôi có một ngôi mộ ở quê. {b}Bà tôi mất năm 2008, tám mươi tuổi. Trước khi mất, bà dặn: cái tủ để lại cho thằng cháu. Đừng bao giờ khoá.',
      draw(k) {
        if (k.t < k.cue('b')) { baiMo(k, { time: 'day', moon: false }); mo(k, 960, 900, 1, false); dimDay(k); tag(k, 'NĂM 1999', 'a'); return; }
        mat(k, { ...BA, hairColor: '#d8d4cc' }, { face: 'calm', talk: 0.3 }); tag(k, 'NĂM 2008', 'b'); quote(k, '"Đừng bao giờ khoá."', k.cue('b', 4), { size: 60, color: AMBER });
      },
    },
    {
      say: '{a}Cái tủ bây giờ đặt ở góc nhà tôi. Tôi không khoá nó. {b}Tôi chưa bao giờ kể cho con trai tôi nghe chuyện Ông Kẹ. Tôi không muốn nó sợ một người đã đi bộ mười tám cây số, chỉ để đứng nhìn con mình ngủ.',
      draw(k) { nha(k, { time: 'now', tu: 0.15 }); ch(k, 760, 1000, 360, { ...TOI_LON, view: 'side', face: 'calm', arms: 'down' }); shade(k, 0.55, [{ x: 960, y: 260, r: 900, warm: 1 }], { vig: 0.55 }); tag(k, 'NĂM 2026', 'a'); },
    },
    {
      say: '{a}Tối qua, trời trở gió mùa. Con tôi chui sang giường tôi, hỏi: {q}Bố ơi, Ông Kẹ là ai? {b}Tôi hỏi ai kể cho con. Nó bảo không ai kể cả. {c}Nó bảo, đêm nào trở gió, nó lại nghe một ông gõ cửa ba tiếng, rồi đứng ở cửa buồng nhìn nó ngủ. Nó không sợ. {d}Vì ông ấy chưa bao giờ bước qua bậu cửa.',
      sfx: [['wind', 'a', 0.3]],
      draw(k) {
        if (k.t < k.cue('c')) { demBuong(k, { now: true, tu: true, kid: CON, kidX: 1060, kidH: 240, face: 'calm', ba: false, sit: () => lie(k, 1560, 720, 340, { ...TOI_LON, face: 'calm' }), lights: [{ x: 1200, y: 620, r: 560 }] }); quote(k, '"Bố ơi, Ông Kẹ là ai?"', 'q', { size: 58, until: 'b' }); return; }
        buong(k, { now: true, net: 0.8, tu: true }, () => { lie(k, 1060, 744, 240, { ...CON, face: 'sleep' }); chan(k, 760, 1600, 762, { color: '#5a7a9a' }); });
        shade(k, 0.86, [{ x: 1060, y: 640, r: 420 }, { x: BUONG.door, y: 620, r: 260 }], { vig: 0.6 }); quote(k, 'Ông ấy chưa bao giờ bước qua bậu cửa.', 'd', { size: 56, color: COLD });
      },
    },
    {
      say: '{a}Con tôi năm nay mười tuổi. Bằng tuổi tôi năm ấy. {b}Bằng tuổi bố tôi, cái năm ông đi. {c}Bà tôi bảo, Ông Kẹ bao giờ cũng gõ cửa đúng ba tiếng. Bà chỉ không bảo, ông gõ để làm gì.',
      tail: 2.5,
      sfx: [['knock', ['c', 4.4], 0.28], ['knock', ['c', 5.0], 0.28], ['knock', ['c', 5.6], 0.28]],
      draw(k) {
        if (k.t < k.cue('c')) { mat(k, CON, { face: 'sleep', warm: 0.5, bg: '#0a0c12' }); return; }
        cua(k); go(k, CUA.knock.x, CUA.knock.y, [k.cue('c', 4.4), k.cue('c', 5.0), k.cue('c', 5.6)], { r: 160 }); shade(k, 0.8, [{ x: 960, y: 500, r: 640 }], { vig: 0.6 }); quote(k, 'Bà chỉ không bảo, ông gõ để làm gì.', 'c', { size: 56, color: AMBER });
      },
    },

    // ===== CUỐI =====
    nextScene({
      say: '{next}Tập sau: năm 2003, ông nội tôi mất được bốn mươi chín ngày thì về báo mộng cho bố tôi. Ông chỉ nói đúng một câu: dưới gốc khế, sâu một gang tay. Cả nhà không ai tin. Bố tôi vẫn đào. Đúng một gang tay, có một cái hộp sắt han gỉ. Trong hộp là một chiếc vòng bạc trẻ con, khắc tên một người mà nhà tôi chưa ai từng nghe.',
      title: 'Báo Mộng | Dưới Gốc Khế, Một Gang Tay',
      hook: 'Ông về báo mộng một câu. Dưới gốc khế có cái hộp sắt.',
      art(k) { const { ctx } = k; black(k, '#141a14'); ctx.fillStyle = '#3a3020'; ctx.fillRect(0, 600, 1920, 480); ctx.strokeStyle = '#4a3a2a'; ctx.lineCap = 'round'; ctx.lineWidth = 56; ctx.beginPath(); ctx.moveTo(760, 640); ctx.quadraticCurveTo(740, 420, 800, 180); ctx.stroke(); ctx.lineWidth = 18; for (const [dx, dy] of [[-240, -100], [220, -130], [-120, -200]]) { ctx.beginPath(); ctx.moveTo(790, 320); ctx.lineTo(790 + dx, 320 + dy); ctx.stroke(); } ctx.fillStyle = '#5e7a3e'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(560 + i * 55, 140 + (i % 3) * 40, 70, 30, 0, 0, Math.PI * 2); ctx.fill(); } ctx.fillStyle = '#1e160e'; ctx.beginPath(); ctx.ellipse(1150, 620, 220, 56, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#7a5a40'; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 5; ctx.beginPath(); ctx.rect(1060, 540, 180, 80); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#d8d0c0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(1150, 500, 30, 0, Math.PI * 2); ctx.stroke(); },
    }),
    subScene({
      say: '{q}Nếu là bà tôi, bạn có giấu ông suốt hai mươi tám năm như thế không? Hãy để lại câu trả lời. {sub}Và nếu muốn nghe tiếp những chuyện chưa có lời giải, hãy đăng ký Nhân Gian Chưa Kể.',
      question: 'Nếu là bà tôi, bạn có giấu ông suốt 28 năm như thế không?',
      art(k) { bat(k, 960, 960, 1.2); },
    }),
  ],
};
// Các dòng trong cuốn sổ của ông.
const SO = [
  ['Tháng Chạp 1969', 'Về. Hai đứa ngủ. Thằng Thắng cao quá khung cửa sổ.'],
  ['Tháng Giêng 1970', 'Về. Con Thoa mất cái răng cửa.'],
  ['Tháng Chạp 1970', 'Thằng Thắng thức. Nó nhìn thấy mình. Mình bảo nó suỵt. Nó sợ, khóc. Từ nay vào tủ.'],
  ['Tháng Giêng 1985', 'Thằng Thắng lấy vợ. Đứng ngoài ngõ nghe tiếng pháo.'],
  ['Tháng Mười 1986', 'Có cháu nội. Con trai.'],
  ['Tháng Chạp 1993', 'Thằng cháu ngủ hở chân. Đắp cho nó. Bà nó mắng.'],
  ['13 tháng 11 năm 1996', 'Đêm nay về. Lộc không chở. Thì đi bộ.'],
];
video.scenes = video.scenes.map(grain);
export default video;
