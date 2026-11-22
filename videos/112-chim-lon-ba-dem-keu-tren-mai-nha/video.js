// Nhân Gian Chưa Kể — tập 4: Chim Lợn | Ba Đêm Kêu Trên Mái Nhà Tôi. Kịch bản duyệt 15/11: kich-ban.md.
// Một giọng người kể, liền mạch, mập mờ, kết để mở; không giải thích khoa học. Truyện hư cấu dựa trên tín ngưỡng dân gian về chim lợn.
// Hình: phông HD (channel/nhan-gian-hd*.js, bộ xóm làng channel/nhan-gian-hd-xom.js) + nhân vật có khối, vẽ bằng GPU.
import * as thumbs from '/videos/112-chim-lon-ba-dem-keu-tren-mai-nha/thumbs.js';
import { PAPER, AMBER, COLD, shade, cold, tag, quote, chapter, rules, oil, bowl, nextScene, subScene } from '/channel/nhan-gian.js';
import { houseHD, filmGrade } from '/channel/nhan-gian-hd.js';
import { altarRoomHD, altarLightsHD, lotusHD, kitchenHD, KITCHEN_HD } from '/channel/nhan-gian-hd-sets.js';
import {
  HAI, HAI_LON, ONG, ONG_AO, TU, TU_AO, BO, ME, BA_LANH, BA_TRE, THIN_TRE, TU_TRE, DAN,
  ch, lie, kneel, sitting, zoom, hibiscus, lantern, chair, table, feather, chimLon, xom, xomProps, XOM, lampLight,
  gao, GAO, flood, hoi, bedroom, photo, tin, letter, slingshot, dog, footprints, coffin, wisp, fireStraw, tray,
} from '/channel/nhan-gian-hd-xom.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const black = (k) => { k.ctx.fillStyle = '#05060a'; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); };
const MOON = { x: 1560, y: 170, r: 900 };
const PHOTO_BA = (k) => () => k.char(960, 560, 230, { ...BA_TRE, hair: 'bun', face: 'calm', shadow: false });
const altar = (k, o = {}) => {
  altarRoomHD(k, {}, PHOTO_BA(k));
  if (o.bowl !== false) { const { ctx } = k; ctx.fillStyle = '#e8e4d8'; ctx.strokeStyle = '#211a15'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(1060, 552, 42, 12, 0, 0, Math.PI); ctx.lineTo(1018, 552); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(160,190,210,0.7)'; ctx.beginPath(); ctx.ellipse(1060, 550, 40, 9, 0, 0, Math.PI * 2); ctx.fill(); hibiscus(k, 1060, 546, 1.1); }
  if (o.feather) feather(k, 850, 556, 0.8, -0.1);
};
// Ảnh 1953: ông Từ (lùi sau), bà, ông tôi.
const PIC_1953 = (k) => { k.char(-120, 150, 220, { ...TU_TRE, face: 'calm' }); k.char(0, 150, 215, { ...BA_TRE, face: 'happy' }); k.char(120, 150, 232, { ...THIN_TRE, face: 'calm' }); };
// Đường bay chim: từ a đến b, cung vồng lên.
const flyPath = (k, a, b, p) => ({ x: k.lerp(a.x, b.x, p), y: k.lerp(a.y, b.y, p) - Math.sin(p * Math.PI) * 140 });
// Ngồi trên giường (buồng ngủ): chăn phủ đùi.
const sitBed = (k, x, o) => { sitting(k, x, 792, 470, o); const { ctx } = k; ctx.fillStyle = '#6a4a5a'; ctx.strokeStyle = '#211a15'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x - 150, 772, 360, 44, 18); ctx.fill(); ctx.stroke(); };
const night = (k, extra = [], a = 0.76) => shade(k, a, [MOON, ...extra]);

const grain = (sc) => ({ ...sc, draw(k) { const s = 1 + 0.06 * Math.min(1, k.t / Math.max(1, k.d)); k.group({ x: k.W / 2, y: k.H / 2, s }, () => k.group({ x: -k.W / 2, y: -k.H / 2 }, () => sc.draw(k))); filmGrade(k, 'day', 0.06); } });
const video = {
  meta: {
    title: 'Chim Lợn | Ba Đêm Kêu Trên Mái Nhà Tôi',
    description: `Ở làng tôi, các cụ bảo chim lợn kêu trên mái nhà nào, nhà ấy sắp có tang. Năm tôi mười hai tuổi, nó kêu trên mái nhà tôi ba đêm liền, ngay trên giường ông nội đang nằm liệt.
Nhưng không ai trong nhà tôi chết cả. Đêm thứ ba, người đi là ông Từ, ông già bên kia bờ rào dâm bụt, người bốn mươi năm không nói với ông tôi một câu. Và người bắn hòn sỏi khiến con chim bay sang mái nhà ông ấy, là tôi.

Một cái hộp sắt dặn "đừng mở", một lá thư viết trước khi con chim đổi nhà, và hai chén rượu: một chén đầy, một chén cạn.`,
    footer: `📖 Truyện hư cấu dựa trên tín ngưỡng dân gian về chim lợn. Tên người, tên làng và tình tiết đều hư cấu.
🕯️ Nhân Gian Chưa Kể: những chuyện người xưa truyền tai nhau, mà chưa ai giải thích được.`,
    links: [['▶ Tập trước: Gọi Hồn', '106-goi-hon-nguoi-ve-goi-vo-la-chi'], ['🔔 Đăng ký', 'https://www.youtube.com/@nhangianchuake?sub_confirmation=1']],
    tags: ['chim lợn', 'chim lợn kêu', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'điềm báo', 'chuyện tâm linh có thật', 'truyện ma làng quê', 'hoạt hình kinh dị', 'nhân gian chưa kể'],
    hashtags: ['truyenma', 'chimlon', 'tamlinh'],
    gpu: true, // vẽ canvas bằng GPU (Metal) — người dùng yêu cầu 14/11
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 0.95,
    lead: 0.4, tail: 0.8, pause: 0.35,
    transition: 'fade', sfxTransitions: false, camera: 0.03, scribble: false,
    sfxVolume: 0.5, paper: '#07080c', privacy: 'private',
  },
  thumbnail: thumbs.a,

  scenes: [
    // ===== MỞ ĐẦU =====
    {
      chapter: 'Mở đầu',
      say: '{a}Ở làng tôi, các cụ bảo: chim lợn kêu trên mái nhà nào, nhà ấy sắp có tang. {b}Năm tôi mười hai tuổi, nó kêu trên mái nhà tôi ba đêm liền. Ông nội tôi nằm liệt giường đã hai tháng. Mẹ tôi mua sẵn vải trắng. {c}Nhưng không ai trong nhà tôi chết cả.',
      sfx: [['wind', 0, 0.3], ['owl', 'b', 0.35]],
      draw(k) {
        zoom(k, 600, 420, 1.35 - 0.2 * k.at('a', 10, 'inOut'), () => { xom(k, { time: 'night' }); xomProps(k, { lamp: 1 }); chimLon(k, XOM.ourGable.x, XOM.ourGable.y, 0.7, { glow: 0.6 * k.at('b', 2) }); night(k, [lampLight()]); });
        tag(k, '1994', 'a');
        quote(k, 'Không ai trong nhà tôi chết cả.', 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Đêm thứ ba, người chết là ông Từ, ông già sống một mình bên kia bờ rào. Người bốn mươi năm không nói với ông tôi một câu nào. {b}Và người đã bắn hòn sỏi khiến con chim bay sang mái nhà ông ấy, {c}là tôi.',
      sfx: [['stinger', 'c', 0.4]],
      draw(k) {
        zoom(k, 1300, 720, 1.7, () => { xom(k, { time: 'night' }); xomProps(k, { lamp: after(k, 'b') ? 0 : 1, cups: [true, true] }); night(k, after(k, 'b') ? [] : [lampLight()], 0.8); });
        if (after(k, 'c')) { slingshot(k, 960, 560, 3 * k.at('c', 0.6, 'back')); }
        quote(k, '…là tôi.', 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Đây là Nhân Gian Chưa Kể. Nếu bạn muốn nghe tiếp những chuyện chưa có lời giải, hãy bấm đăng ký. {c}Còn bây giờ, xin bạn tắt bớt đèn.',
      sfx: [['click', 'c', 0.5]],
      draw(k) {
        black(k); oil(k, 960, 820, 1.6);
        const off = k.at('c', 1.2);
        shade(k, 0.75 + 0.2 * off, [{ x: 960, y: 650, r: 700 - 300 * off, flicker: 1, warm: 1 }]);
        k.text('NHÂN GIAN CHƯA KỂ', k.W / 2, 230, { size: 92, font: 'title', color: PAPER, fx: 'fade', p: k.at('a', 1) });
        k.text('Chim Lợn · Ba Đêm Kêu Trên Mái Nhà Tôi', k.W / 2, 330, { size: 46, color: AMBER, fx: 'fade', p: k.at('a', 1.5) });
      },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Bên kia bờ rào',
      say: '{a}Nhà tôi và nhà ông Từ chỉ cách nhau một bờ rào dâm bụt, thấp đến mức đứng bên này nói khẽ, bên kia cũng nghe thấy. Vậy mà suốt bốn mươi năm, ông tôi và ông Từ không nói với nhau một câu. {b}Không ai trong nhà biết vì sao. Bố tôi bảo, từ hồi bố còn bé đã thế. Hỏi ông, ông chỉ nói một câu: {q}nhà này không nợ ai cái gì.',
      draw(k) {
        xom(k, { time: 'day' }); xomProps(k, { lamp: 0 });
        ch(k, 420, 900, 440, { ...ONG, face: 'cold', look: 1 });
        ch(k, 1400, 920, 430, { ...TU, face: 'blank', look: -1, flip: true });
        k.vignette(0.35);
        quote(k, '"Nhà này không nợ ai cái gì."', 'q', { color: AMBER });
        chapter(k, 1, 'Bên kia bờ rào');
      },
    },
    {
      say: '{a}Ông Từ không vợ, không con. Ông ở một mình trong căn nhà thấp lè tè, đan rổ rá đem bán ở chợ phiên. {b}Tối nào ông cũng thắp một ngọn đèn bão treo ở hiên, rồi ngồi trên cái ghế mây, quay mặt sang nhà tôi, đến khuya mới vào. {c}Hồi bé tôi sợ ông lắm. Tôi cứ tưởng ông ngồi canh nhà tôi.',
      draw(k) {
        if (k.t < k.cue('b')) { zoom(k, 1450, 700, 1.6, () => { xom(k, { time: 'dusk' }); xomProps(k, { lamp: 0, chair: false }); kneel(k, 1420, 880, 420, { ...TU, face: 'calm', pose: 'hold' }); k.vignette(0.4); }); return; }
        zoom(k, 1000, 640, 1.25, () => { xom(k, { time: 'night' }); xomProps(k, { lamp: 1, sitter: { ...TU, face: 'blank', flip: true } }); if (after(k, 'c')) kneel(k, 620, 900, 320, { ...HAI, face: 'shock', look: 1 }); night(k, [lampLight(), { x: 620, y: 700, r: 260 }]); });
      },
    },
    {
      say: '{a}Bà nội tôi mất năm tôi sáu tuổi. Sáng ngày giỗ bà năm nào, trên bậc cửa nhà tôi cũng có một bông dâm bụt đỏ, còn ướt sương. {b}Ông tôi nhặt lên, thả vào một bát nước, đặt trên bàn thờ bà, không nói gì. Cả nhà cũng không ai hỏi ai để. {c}Nhà tôi không trồng dâm bụt. Cả bờ rào dâm bụt ấy là của ông Từ.',
      draw(k) {
        if (k.t < k.cue('b')) { zoom(k, 410, 830, 3, () => { xom(k, { time: 'day' }); hibiscus(k, 410, 832, 1.6, '#d2302a', 0.3); }); k.vignette(0.4); quote(k, 'Một bông dâm bụt, còn ướt sương.', 'a', { color: AMBER }); return; }
        if (k.t < k.cue('c')) { altar(k); ch(k, 1180, 980, 450, { ...ONG, face: 'sad', pose: 'hold' }); shade(k, 0.5, [...altarLightsHD(1.3), { x: 1060, y: 560, r: 300, warm: 0.5 }]); return; }
        zoom(k, 950, 760, 1.8, () => { xom(k, { time: 'day' }); }); k.vignette(0.4);
        quote(k, 'Bờ rào dâm bụt ấy là của ông Từ.', 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Mùa thu năm 1994, ông tôi ốm nặng. Phổi ông yếu, thở khò khè như kéo bễ, nằm liệt giường đã hai tháng. Ông lang trong làng bắt mạch xong, lắc đầu, dặn bố tôi chuẩn bị. {b}Mẹ tôi lên chợ huyện mua vải trắng về, gấp để trên rương. Cả nhà sống như đang chờ một người khách mà ai cũng biết sẽ đến.',
      sfx: [['wind', 0, 0.2]],
      draw(k) {
        bedroom(k, { ...ONG, face: 'sad' }, 440, { net: false, cloth: after(k, 'b') });
        ch(k, 1350, 905, 420, { ...ME, face: 'sad', pose: 'hold' });
        if (!after(k, 'b')) ch(k, 300, 905, 450, { ...DAN('#4a3a2a', { hairColor: '#cfc8bc', beard: 'goat' }), face: 'blank', pose: 'think' });
        shade(k, 0.55, [{ x: 1700, y: 420, r: 900 }, { x: 900, y: 700, r: 500 }]);
        tag(k, 'MÙA THU · 1994', 'a');
      },
    },
    {
      say: '{a}Năm ấy tôi có một cái súng cao su, bắn mười phát trúng chín. {b}Bố tôi cấm tôi bắn chim. Bố bảo, chim trời là của trời, đừng động vào. {c}Tôi nghe lời. Cho đến đêm thứ hai.',
      sfx: [['click', ['a', 2], 0.4]],
      draw(k) {
        houseHD(k, { time: 'day' });
        ch(k, 900, 920, 330, { ...HAI, face: after(k, 'b') ? 'sad' : 'smug', pose: 'point' }); slingshot(k, 1000, 760, 1.2, 0.3);
        if (after(k, 'b')) ch(k, 1250, 920, 470, { ...BO, face: 'angry', pose: 'point', flip: true });
        k.vignette(0.35);
        quote(k, 'Cho đến đêm thứ hai.', 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Ở làng tôi, ai cũng biết con chim lợn sống trên cây gạo đầu làng, cây gạo già hơn cả cái đình. Ban ngày không ai thấy nó. Chỉ những đêm có người sắp đi, người ta mới nghe tiếng nó. {b}Bà nội tôi kể, năm bảy mươi chín, nó kêu ba đêm trên mái nhà cụ Khoá cuối xóm. Sáng hôm sau đêm thứ ba, cụ Khoá ngồi dậy, đòi tắm, đòi thay áo mới, rồi nằm xuống không dậy nữa. {c}Từ đấy, cả làng hễ nghe tiếng chim lợn là đóng cửa, không ai dám ra ngõ.',
      sfx: [['owl', 'b', 0.25]],
      draw(k) {
        zoom(k, 700, 420, 1.3 - 0.25 * k.at('a', 12, 'inOut'), () => { gao(k, { time: 'dusk' }); chimLon(k, GAO.perch.x, GAO.perch.y, 0.5, { glow: 0.4 }); });
        if (after(k, 'b') && !after(k, 'c')) cold(k, 0.5);
        k.vignette(0.45);
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Đêm thứ nhất',
      say: '{a}Đêm ấy, khoảng canh ba, tôi tỉnh giấc vì một tiếng kêu trên mái nhà. {e}Éc… éc… {b}Nó không giống tiếng chim. Nó giống tiếng một con lợn bị chọc tiết ở rất xa, lại giống tiếng một người già đang ho trong cổ họng. {c}Tôi nghe tiếng bố bật dậy. Rồi tiếng mẹ thì thào, run run: chim lợn.',
      sfx: [['owl', 'e', 0.5], ['heartbeat', 'b', 0.35]],
      draw(k) {
        bedroom(k, { ...HAI, face: after(k, 'e') ? 'shock' : 'blank' }, 330);
        shade(k, 0.86, [{ x: 1700, y: 420, r: 420 }]);
        tag(k, 'ĐÊM THỨ NHẤT · CANH BA', 'a');
        quote(k, 'Éc… éc…', 'e', { color: COLD, size: 64, until: 'c' });
        quote(k, '"Chim lợn."', 'c', { color: COLD });
        chapter(k, 2, 'Đêm thứ nhất');
      },
    },
    {
      say: '{a}Bố tôi đốt một bó rơm, chạy ra sân, vừa khua cái mâm đồng vừa quát. Mẹ tôi đứng ở cửa, hai tay chắp trước ngực. {b}Con chim không bay ngay. Nó kêu thêm hai tiếng nữa, rồi mới vỗ cánh, một bóng trắng lặng lẽ, bay về phía cây gạo đầu làng. {c}Trong buồng, ông tôi đã thức. Ông nhìn lên mái nhà, nói khẽ, giọng bình thản như hỏi giờ: {q}nó đến sớm thế à.',
      sfx: [['click', ['a', 1], 0.35], ['click', ['a', 1.6], 0.35], ['owl', 'b', 0.4], ['whoosh', ['b', 4], 0.25]],
      draw(k) {
        if (k.t < k.cue('c')) {
          xom(k, { time: 'night' }); xomProps(k, { lamp: 1 });
          const p = k.at(k.cue('b', 4), 3, 'inOut'), pos = flyPath(k, XOM.ourGable, { x: -200, y: 200 }, p);
          chimLon(k, pos.x, pos.y, 0.7, { fly: p > 0 && p < 1 ? 1 : 0, glow: 0.4 });
          ch(k, 520, 960, 460, { ...BO, face: 'shout', pose: 'shout' }); fireStraw(k, 600, 840, 1); kneel(k, 420, 860, 260, { ...ME, face: 'shock' });
          night(k, [lampLight(), { x: 600, y: 700, r: 420, warm: 1, flicker: 1 }]);
          return;
        }
        bedroom(k, { ...ONG, face: 'calm', look: 0, lookY: -1 }, 440, { net: false });
        shade(k, 0.8, [{ x: 760, y: 700, r: 380 }]);
        quote(k, '"Nó đến sớm thế à."', 'q', { color: COLD });
      },
    },
    {
      say: '{a}Sáng ra, bố tôi bắc thang trèo lên mái xem. Ở đầu hồi, ngay trên chỗ ông nằm, mấy viên ngói bị xô lệch, như có cái gì nặng hơn một con chim đã đậu ở đấy. Giữa hai viên ngói kẹp một chiếc lông trắng, dài bằng bàn tay. {b}Bố tôi cầm xuống, định vứt. Trong buồng, ông tôi nói vọng ra: để đấy. {c}Bố tôi đặt chiếc lông lên bàn thờ bà, cạnh bát nước có bông dâm bụt.',
      draw(k) {
        if (k.t < k.cue('c')) { zoom(k, 690, 340, 2.6, () => { xom(k, { time: 'day' }); feather(k, 700, 330, 1, -0.3); }); k.vignette(0.4); quote(k, '"Để đấy."', 'b', { color: AMBER }); return; }
        zoom(k, 950, 520, 1.8, () => { altar(k, { feather: true }); shade(k, 0.45, altarLightsHD(1.3)); });
      },
    },
    {
      say: '{a}Sáng hôm sau, bà Ba Lành, người già nhất xóm, sang nhà tôi. Bà bảo chim lợn đã đậu nhà nào thì kêu đủ ba đêm. Đêm thứ nhất là báo. Đêm thứ hai là gọi. Đêm thứ ba là đón. {b}Rồi bà dặn cả nhà ba điều. {r1}Một: không ai được ném đá đuổi nó. Ném là nó đổi nhà, mang tang sang nhà người khác. {r2}Hai: lúc nó kêu, không ai được gọi người ốm. Gọi là chỉ đường cho nó. {r3}Ba: đêm thứ ba, đóng hết cửa, không ai được ra ngõ.',
      sfx: [['gong', 'r1', 0.2], ['gong', 'r2', 0.2], ['gong', 'r3', 0.2]],
      draw(k) {
        if (k.t < k.cue('r1')) { houseHD(k, { time: 'day', chickens: false }); kneel(k, 820, 880, 440, { ...BA_LANH, face: 'cold', talk: 0.2, pose: after(k, 'a', 6) ? 'present' : 'hold' }); ch(k, 1100, 900, 430, { ...ME, face: 'sad', flip: true }); ch(k, 1260, 910, 320, { ...HAI, face: 'blank', flip: true }); k.vignette(0.4); quote(k, 'Báo · Gọi · Đón', k.cue('a', 6), { color: AMBER }); return; }
        black(k);
        rules(k, 960, 520, [['1. Không ném đá đuổi nó.', 'r1'], ['2. Lúc nó kêu, không gọi người ốm.', 'r2'], ['3. Đêm thứ ba, không ai ra ngõ.', 'r3']], { cue: 'r1', w: 1200 });
        shade(k, 0.35, [{ x: 960, y: 520, r: 900, warm: 0.4 }]);
      },
    },
    {
      say: '{a}Trưa hôm ấy, tôi ra bờ rào nhặt quả bàng, thì thấy ông Từ đứng ở bên kia. Ông không nhìn tôi. Ông nhìn lên nóc nhà tôi, rất lâu. {b}Rồi ông hỏi, lần đầu tiên trong đời ông nói với tôi: đêm qua nó đậu chỗ nào? {c}Tôi chỉ lên đầu hồi, chỗ ngay trên giường ông tôi nằm. {d}Ông Từ gật đầu, nói như nói với chính mình: {q}nhầm nhà rồi. {e}Rồi ông quay vào.',
      sfx: [['stinger', 'q', 0.4]],
      draw(k) {
        zoom(k, 950, 640, 1.5, () => {
          xom(k, { time: 'day' });
          ch(k, 1180, 930, 420, { ...TU, face: after(k, 'q') ? 'sad' : 'blank', look: -1, lookY: after(k, 'b') ? 0 : -1, flip: true, talk: after(k, 'b') && !after(k, 'c') ? 0.25 : 0 });
          ch(k, 700, 950, 320, { ...HAI, face: 'shock', pose: after(k, 'c') && !after(k, 'd') ? 'point' : 'stand' });
        });
        k.vignette(0.4);
        quote(k, '"Đêm qua nó đậu chỗ nào?"', 'b', { until: 'c' });
        quote(k, '"Nhầm nhà rồi."', 'q', { color: COLD, size: 60 });
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      chapter: 'Đêm thứ hai',
      say: '{a}Cả ngày hôm ấy, ông Từ làm những việc rất lạ. Ông quét sân từ sáng đến trưa, quét cả gầm giường, cả bậc thềm. {b}Ông đốt một chồng giấy cũ ở góc vườn, khói bay sang tận nhà tôi. {c}Ông giặt cái áo sơ mi trắng duy nhất của ông, phơi lên bờ rào dâm bụt. {d}Bố tôi nhìn sang, bảo: ông già lẩn thẩn rồi.',
      draw(k) {
        zoom(k, 1350, 700, 1.5, () => {
          xom(k, { time: 'day' }); xomProps(k, { lamp: 0 });
          if (after(k, 'c')) { const { ctx } = k; ctx.fillStyle = '#ece8de'; ctx.strokeStyle = '#211a15'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(940, 720); ctx.lineTo(1020, 720); ctx.lineTo(1050, 750); ctx.lineTo(1030, 760); ctx.lineTo(1020, 745); ctx.lineTo(1020, 820); ctx.lineTo(940, 820); ctx.lineTo(940, 745); ctx.lineTo(930, 760); ctx.lineTo(910, 750); ctx.closePath(); ctx.fill(); ctx.stroke(); }
          if (after(k, 'b')) { fireStraw(k, 1700, 900, 0.6); wisp(k, 1700, 820, 0.35); }
          ch(k, after(k, 'b') ? 1600 : 1300, 930, 420, { ...TU, face: 'calm', pose: 'hold', walk: !after(k, 'b') });
        });
        k.vignette(0.35);
        chapter(k, 3, 'Đêm thứ hai');
      },
    },
    {
      say: '{a}Chiều tối, ông Từ gọi tôi lại bờ rào. Ông đưa qua cho tôi một cái hộp sắt nhỏ, loại hộp đựng bánh, nắp đã gỉ. {b}Ông bảo: cháu cầm lấy. Lúc nào ông mày ăn được bát cháo đầu tiên thì đưa cho ông mày. {n}Đừng mở. {c}Tôi hỏi: nếu ông cháu không ăn được thì sao? Ông Từ cười. Lần đầu tiên tôi thấy ông cười. Ông bảo: {e}ăn được. {d}Tôi giấu cái hộp dưới gầm giường.',
      draw(k) {
        zoom(k, 950, 700, 1.7, () => {
          xom(k, { time: 'dusk' });
          ch(k, 1150, 930, 420, { ...TU, face: after(k, 'c', 3) ? 'happy' : 'calm', pose: 'hold', flip: true, talk: after(k, 'b') && !after(k, 'c') ? 0.25 : 0 });
          ch(k, 760, 950, 320, { ...HAI, face: 'shock', pose: 'hold' });
          tin(k, k.lerp(1060, 860, k.at('a', 4)), 800, 0.7);
        });
        k.vignette(0.45);
        quote(k, '"Đừng mở."', 'n', { color: AMBER, until: 'c' });
        quote(k, '"Ăn được."', 'e', { color: AMBER });
      },
    },
    {
      say: '{a}Tối hôm ấy, con chó vàng nhà tôi bỏ cơm. Nó ra nằm ở chân bờ rào, mõm hướng sang nhà ông Từ, rên ư ử. Bố tôi gọi mấy nó cũng không về. {b}Trong buồng, ông tôi tỉnh lại một lúc. Ông nhìn trần nhà, gọi một câu không đầu không cuối: {q}Từ ơi, sông lên rồi. {c}Rồi ông lại chìm vào cơn mê. Lúc ấy, cả nhà tôi không ai hiểu câu ấy.',
      sfx: [['wind', 0, 0.25]],
      draw(k) {
        if (k.t < k.cue('b')) { zoom(k, 950, 760, 1.8, () => { xom(k, { time: 'dusk' }); dog(k, 900, 900, 1); xomProps(k, { lamp: 1, chair: false, table: false }); shade(k, 0.6, [lampLight(), { x: 900, y: 860, r: 300 }]); }); return; }
        bedroom(k, { ...ONG, face: 'blank', look: 0, lookY: -1 }, 440, { net: false });
        shade(k, 0.8, [{ x: 760, y: 700, r: 380 }]);
        quote(k, '"Từ ơi, sông lên rồi."', 'q', { color: COLD });
      },
    },
    {
      say: '{a}Đêm thứ hai, con chim đến đúng canh ba. Lần này nó không đậu trên nóc. Nó đậu ở đầu hồi, ngay trên chỗ ông tôi nằm, gần đến mức tôi nghe được cả tiếng móng nó cào trên mái. {e}Éc… éc… éc. {b}Trong buồng, ông tôi bắt đầu thở dốc. Một hơi dài, rồi ngắt. {c}Rồi rất lâu không có hơi thở tiếp theo.',
      sfx: [['scratch', ['a', 5], 0.25], ['owl', 'e', 0.55], ['heartbeat', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { zoom(k, 690, 360, 2.2, () => { xom(k, { time: 'night' }); chimLon(k, XOM.ourGable.x, XOM.ourGable.y, 0.75, { glow: 0.5 }); night(k, [{ x: 690, y: 300, r: 300 }]); }); tag(k, 'ĐÊM THỨ HAI', 'a'); quote(k, 'Éc… éc… éc.', 'e', { color: COLD, size: 64 }); return; }
        bedroom(k, { ...ONG, face: after(k, 'c') ? 'blank' : 'shock', gloom: after(k, 'c') ? 0.6 : 0 }, 440, { net: false });
        shade(k, 0.8, [{ x: 760, y: 700, r: 380 }]);
      },
    },
    {
      say: '{a}Mẹ tôi lay ông, quên cả lời bà Ba Lành, gọi to: {m}bố ơi! {n}Con chim quay đầu lại, nhìn thẳng xuống cửa buồng. {b}Bố tôi lại đốt rơm, khua mâm, ném cả cái gáo dừa lên mái. Lần này con chim không bay. Nó ngồi im trên đầu hồi, quay mặt xuống sân, như đang chờ. {c}Tôi đứng sau cột hiên, nắm chặt cái súng cao su trong túi.',
      sfx: [['stinger', 'n', 0.4], ['click', ['b', 1], 0.35]],
      draw(k) {
        if (k.t < k.cue('n')) { bedroom(k, { ...ONG, face: 'blank', gloom: 0.6 }, 440, { net: false }); ch(k, 1300, 905, 420, { ...ME, face: 'shout', pose: 'shout' }); shade(k, 0.75, [{ x: 900, y: 700, r: 480 }]); quote(k, '"Bố ơi!"', 'm'); return; }
        if (k.t < k.cue('b')) { zoom(k, 690, 340, 2.8, () => { xom(k, { time: 'night' }); chimLon(k, XOM.ourGable.x, XOM.ourGable.y, 0.75, { glow: 0.6, turn: 1 }); night(k, [{ x: 690, y: 300, r: 260 }]); }); return; }
        xom(k, { time: 'night' }); xomProps(k, { lamp: 1 }); chimLon(k, XOM.ourGable.x, XOM.ourGable.y, 0.7, { glow: 0.5 });
        ch(k, 520, 960, 460, { ...BO, face: 'shout', pose: 'shout' }); fireStraw(k, 600, 840, 1);
        if (after(k, 'c')) ch(k, 180, 900, 320, { ...HAI, face: 'angry', pose: 'hold' });
        night(k, [lampLight(), { x: 600, y: 700, r: 420, warm: 1, flicker: 1 }, { x: 180, y: 760, r: 240 }]);
      },
    },
    {
      say: '{a}Tôi không nghĩ gì cả. Tôi lắp một hòn sỏi, kéo căng dây, bắn. {b}Hòn sỏi trúng mái ngay cạnh chân nó. Con chim vỗ cánh. Nó không bay về phía cây gạo như đêm trước. Nó bay qua bờ rào, đậu xuống nóc nhà ông Từ. {c}Ở đó, nó kêu ba tiếng. Rồi im hẳn. {d}Bên kia bờ rào, ngọn đèn bão vẫn sáng. Cái ghế mây có người ngồi. {e}Trong buồng, ông tôi thở ra một hơi rất dài. Rồi thở đều.',
      sfx: [['whoosh', ['a', 4], 0.4], ['click', 'b', 0.5], ['owl', 'c', 0.45], ['stinger', 'd', 0.35]],
      draw(k) {
        if (k.t < k.cue('e')) {
          xom(k, { time: 'night' }); xomProps(k, { lamp: 1, sitter: after(k, 'd') ? { ...TU, face: 'blank', flip: true } : null, cups: [] });
          const fp = k.at(k.cue('b', 2), 3, 'inOut'), pos = fp <= 0 ? XOM.ourGable : flyPath(k, XOM.ourGable, XOM.tuRoof, fp);
          chimLon(k, pos.x, pos.y, 0.7, { fly: fp > 0 && fp < 1 ? 1 : 0, glow: 0.5 });
          ch(k, 220, 960, 330, { ...HAI, face: 'angry', pose: 'point' }); slingshot(k, 330, 780, 1.1, 0.5);
          const sp = k.at(k.cue('a', 4), 0.5, 'linear'); if (sp > 0 && sp < 1) k.dot(k.lerp(340, 680, sp), k.lerp(740, 340, sp), 6, '#cfc8bc', 1);
          night(k, [lampLight(), { x: 260, y: 760, r: 260 }, { x: pos.x, y: pos.y - 60, r: 200 }]);
          return;
        }
        bedroom(k, { ...ONG, face: 'calm' }, 440, { net: false });
        shade(k, 0.78, [{ x: 760, y: 700, r: 380 }]);
      },
    },
    {
      say: '{a}Sáng hôm sau, cả xóm đã biết. Bà Ba Lành đứng giữa sân nhà tôi, nhìn sang nóc nhà ông Từ, hỏi đúng một câu: {q}đứa nào ném? {b}Không ai trả lời. Bố tôi tưởng là cái gáo dừa của bố. Chỉ mình tôi biết. {c}Tôi đi ngang bờ rào, không dám nhìn sang. Nhưng tôi biết ông Từ đứng đó, và tôi biết ông thấy tôi. {d}Ông không nói gì. Ông chỉ gật đầu với tôi một cái, như người ta gật đầu cảm ơn.',
      draw(k) {
        xom(k, { time: 'day' });
        if (k.t < k.cue('c')) { ch(k, 560, 950, 440, { ...BA_LANH, face: 'cold', look: 1, pose: after(k, 'q') ? 'point' : 'stand' }); ch(k, 300, 960, 320, { ...HAI, face: 'sad', look: -1 }); k.vignette(0.35); quote(k, '"Đứa nào ném?"', 'q', { color: AMBER }); return; }
        ch(k, 1180, 930, 420, { ...TU, face: 'calm', flip: true, tilt: after(k, 'd') ? 0.25 * Math.max(0, Math.sin((k.t - k.cue('d')) * 3)) : 0 });
        ch(k, k.lerp(500, 720, k.at('c', 6)), 950, 320, { ...HAI, face: 'sad', walk: !after(k, 'c', 6), look: after(k, 'd') ? 1 : 0 });
        k.vignette(0.35);
      },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Đêm thứ ba',
      say: '{a}Chiều hôm ấy, bà Ba Lành sang rắc một vòng vôi bột quanh nhà tôi, từ cổng vào đến tận bậc cửa buồng ông, bảo: có gì đi vào, sáng ra sẽ biết. {b}Đêm thứ ba, nhà tôi đóng hết cửa, như lời bà Ba Lành. Cả nhà ngồi canh quanh giường ông. Đến canh ba, không có tiếng kêu nào trên mái nhà tôi. {c}Không có gì cả. Chỉ có gió, và tiếng tim tôi đập. {d}Tôi không chịu được nữa. Tôi lén mở cửa sau, ra bờ rào.',
      sfx: [['heartbeat', 'c', 0.45], ['creak', 'd', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { xom(k, { time: 'dusk' }); const { ctx } = k; ctx.strokeStyle = 'rgba(240,240,232,0.85)'; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(420, 900, 420 * k.at('a', 5), 70, 0, 0, Math.PI * 2); ctx.stroke(); ch(k, 700, 960, 420, { ...BA_LANH, face: 'cold', pose: 'hold' }); k.vignette(0.4); chapter(k, 4, 'Đêm thứ ba'); return; }
        bedroom(k, { ...ONG, face: 'blank' }, 440, { net: false });
        oil(k, 1300, 860, 0.9);
        ch(k, 1450, 905, 460, { ...BO, face: 'blank' }); ch(k, 340, 905, 420, { ...ME, face: 'sad' }); if (!after(k, 'd')) ch(k, 1600, 905, 320, { ...HAI, face: 'shock' });
        shade(k, 0.78, [{ x: 1300, y: 740, r: 500, warm: 1, flicker: 1 }]);
        tag(k, 'ĐÊM THỨ BA', 'b');
      },
    },
    {
      say: '{a}Bên kia bờ rào, ông Từ ngồi trên cái ghế mây, quay mặt sang nhà tôi, như bốn mươi năm nay. Ông mặc cái áo sơ mi trắng đã giặt. Trên cái bàn con trước mặt có hai chén rượu, rót đầy. {b}Ông thấy tôi. Ông giơ một tay lên, khẽ phẩy, như bảo: về đi. {c}Rồi ngọn đèn bão tắt. {d}Không có gió. Ngọn đèn bốn mươi năm đêm nào cũng cháy đến khuya, tắt phụt như có ai thổi.',
      sfx: [['click', 'c', 0.3], ['stinger', 'c', 0.45]],
      draw(k) {
        zoom(k, 1260, 700, 1.9, () => {
          xom(k, { time: 'night' });
          xomProps(k, { lamp: after(k, 'c') ? 0 : 1, sitter: { ...TU_AO, face: after(k, 'b') ? 'calm' : 'blank', flip: true, pose: after(k, 'b') && !after(k, 'c') ? 'wave' : 'stand' }, cups: [true, true] });
          ch(k, 900, 960, 320, { ...HAI, face: 'shock' });
          night(k, after(k, 'c') ? [{ x: 1300, y: 700, r: 160 }] : [lampLight(1.2)], after(k, 'c') ? 0.86 : 0.74);
        });
        quote(k, '"Về đi."', 'b', { color: COLD, until: 'c' });
      },
    },
    {
      say: '{a}Tôi chạy vào nhà. Trong buồng, ông tôi, người hai tháng nay không tự ngồi dậy được, đang ngồi trên giường. Ông nhìn ra khung cửa buồng tối om, nói chuyện với ai đó. {b}Mẹ tôi ôm lấy tôi, thì thầm: từ lúc con ra ngoài, ông cứ nói thế. {c}Tôi chỉ nghe được hai câu cuối. {q1}Mày sang đấy à, Từ. {d}Ông im một lúc, như đang nghe. Rồi ông nói: {q2}Ừ. Thì đi. {e}Rồi ông nằm xuống, ngủ một giấc rất êm.',
      sfx: [['heartbeat', 'q1', 0.4]],
      draw(k) {
        bedroom(k, after(k, 'e') ? { ...ONG, face: 'calm' } : null, 440, { net: false });
        if (!after(k, 'e')) sitBed(k, 900, { ...ONG, face: 'calm', look: 1, talk: after(k, 'q1') ? 0.2 : 0 });
        ch(k, 300, 905, 420, { ...ME, face: 'shock', pose: 'hold' }); ch(k, 420, 905, 320, { ...HAI, face: 'shock' });
        const { ctx } = k; ctx.fillStyle = '#020203'; ctx.fillRect(1560, 200, 300, 700);
        oil(k, 1300, 860, 0.9);
        shade(k, 0.78, [{ x: 1300, y: 740, r: 520, warm: 1, flicker: 1 }]);
        quote(k, '"Mày sang đấy à, Từ."', 'q1', { color: COLD, until: 'd' });
        quote(k, '"Ừ. Thì đi."', 'q2', { color: COLD, until: 'e' });
      },
    },
    {
      say: '{a}Sáng hôm sau, tôi ra xem vòng vôi bột. Trên lớp vôi trước cửa buồng ông tôi có một hàng dấu chân trần. Dấu chân đi từ bờ rào vào đến bậc cửa buồng, rồi quay ra. Chân người lớn, gầy, ngón cái choãi ra như chân người cả đời đi đất. {b}Không có dấu chân nào của tôi. {c}Dù đêm ấy tôi đã chạy ra bờ rào, rồi chạy vào.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) {
        zoom(k, 640, 900, 1.6, () => {
          xom(k, { time: 'day' });
          const { ctx } = k; ctx.fillStyle = 'rgba(240,240,232,0.85)'; ctx.beginPath(); ctx.ellipse(500, 920, 460, 80, 0, 0, Math.PI * 2); ctx.ellipse(500, 920, 400, 50, 0, 0, Math.PI * 2, true); ctx.fill('evenodd');
          ctx.fillStyle = 'rgba(240,240,232,0.6)'; ctx.fillRect(560, 850, 360, 60);
          const pts = []; for (let i = 0; i < 10; i++) pts.push([k.lerp(880, 600, i / 9), k.lerp(870, 860, i / 9), -1.57]);
          footprints(k, pts, k.at('a', 6, 'linear'), 0.9);
          ch(k, 300, 980, 320, { ...HAI, face: after(k, 'b') ? 'shock' : 'blank', look: 1 });
        });
        k.vignette(0.4);
        quote(k, 'Không có dấu chân nào của tôi.', 'b', { color: AMBER });
      },
    },
    {
      say: '{a}Sáng hôm sau, ông tôi đòi ăn cháo. Ông ăn hết một bát, rồi đòi bát nữa. {b}Cùng buổi sáng ấy, bà Ba Lành sang gọi cửa nhà ông Từ. Không ai thưa. Người ta thấy ông vẫn ngồi trên ghế mây, quay mặt sang nhà tôi, áo sơ mi trắng cài kín cúc. Ông đi lúc nào không ai biết. Mặt ông bình thản như đang ngủ. {c}Hai chén rượu trên bàn, một chén vẫn đầy. {d}Một chén đã cạn.',
      sfx: [['stinger', 'd', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { bedroom(k, null, 440, { net: false }); sitBed(k, 900, { ...ONG, face: 'happy', pose: 'hold' }); bowl(k, 980, 690, 0.6); ch(k, 1300, 905, 420, { ...ME, face: 'happy' }); shade(k, 0.4, [{ x: 1700, y: 420, r: 1000 }]); return; }
        if (k.t < k.cue('c')) { xom(k, { time: 'day' }); xomProps(k, { lamp: 0, cups: [true, false] }); for (let i = 0; i < 4; i++) ch(k, 1600 + i * 70, 960, 400, { ...DAN(['#3a3a3a', '#4a4a3a', '#2e2e2e', '#3e3e3e'][i]), face: 'sad', flip: true }); ch(k, 1500, 960, 430, { ...BA_LANH, face: 'sad', flip: true }); k.vignette(0.4); return; }
        zoom(k, XOM.table.x, XOM.table.y - 90, 4, () => { xom(k, { time: 'day' }); xomProps(k, { lamp: 0, chair: false, cups: [true, after(k, 'd') ? false : true] }); });
        k.vignette(0.5);
        quote(k, 'Một chén vẫn đầy.', 'c', { until: 'd' });
        quote(k, 'Một chén đã cạn.', 'd', { color: AMBER });
      },
    },
    {
      say: '{a}Cả xóm bảo: chim lợn đổi nhà. Có đứa nào ném nó, tang nhà này sang nhà kia. {b}Tôi không dám nói với ai. Tôi đem cái súng cao su ra ao, ném thật xa. {c}Đến đây, nếu là bạn, bạn có nghĩ hòn sỏi của tôi đã đổi một mạng người lấy một mạng người không? Hãy để lại suy nghĩ của bạn. {d}Vì tôi cũng đã mang câu hỏi ấy theo mình, cho đến ngày mở cái hộp sắt.',
      draw(k) {
        lotusHD(k, { time: 'dawn' });
        ch(k, 900, 930, 330, { ...HAI, face: 'sad', pose: after(k, 'b', 2) ? 'point' : 'hold' });
        const p = k.at(k.cue('b', 2), 1.2, 'out'); if (p > 0 && p < 1) slingshot(k, k.lerp(980, 1400, p), k.lerp(760, 640, p) + p * p * 120, 0.8, p * 8);
        if (p >= 1) { const { ctx } = k, q = Math.min(1, (k.t - k.cue('b', 3.2)) / 3); ctx.strokeStyle = `rgba(255,255,255,${0.5 * (1 - q)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(1400, 760, 20 + q * 120, 6 + q * 30, 0, 0, Math.PI * 2); ctx.stroke(); }
        k.vignette(0.45);
        quote(k, 'Hòn sỏi ấy có đổi một mạng người?', 'c', { color: AMBER, until: 'd' });
      },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Cái hộp sắt',
      say: '{a}Ông tôi đã ăn được bát cháo đầu tiên. Tôi nhớ lời ông Từ, lấy cái hộp sắt dưới gầm giường, đưa cho ông. {b}Ông nhìn cái hộp rất lâu. Tôi biết ông nhận ra nó. Tay ông run khi cạy cái nắp gỉ.',
      sfx: [['creak', ['b', 3], 0.3]],
      draw(k) {
        bedroom(k, null, 440, { net: false });
        sitBed(k, 900, { ...ONG, face: after(k, 'b') ? 'sad' : 'calm', pose: 'hold' });
        tin(k, after(k, 'a', 4) ? 920 : 1150, after(k, 'a', 4) ? 700 : 860, 0.7, k.at(k.cue('b', 3), 1.2));
        ch(k, 1200, 905, 320, { ...HAI, face: 'blank', flip: true });
        shade(k, 0.45, [{ x: 1700, y: 420, r: 1000 }]);
        chapter(k, 5, 'Cái hộp sắt');
      },
    },
    {
      say: '{a}Trong hộp có ba thứ. {p}Một tấm ảnh đen trắng chụp ba người trẻ đứng trước đình làng: ông tôi, bà tôi, và một người thanh niên gầy đứng hơi lùi ra sau. Ông Từ. Sau ảnh ghi: năm 1953. {f}Một bông dâm bụt ép khô, đã ngả màu nâu. {l}Và một mảnh giấy gấp tư, chữ viết run run: {q}Thìn. Con chim đến nhầm nhà. Năm năm mươi, mày kéo tao lên từ sông Đáy. Tao nợ mày một mạng. Giờ tao trả.',
      sfx: [['stinger', 'q', 0.4]],
      draw(k) {
        black(k);
        if (k.t < k.cue('l')) {
          photo(k, 760, 470, 520, 360, PIC_1953, k.at('p', 1));
          if (after(k, 'p')) k.text('1953', 760, 700, { size: 40, color: PAPER, fx: 'fade', p: k.at(k.cue('p', 6), 1) });
          if (after(k, 'f')) hibiscus(k, 1360, 520, 4 * k.at('f', 1), '#7a4a2a', 0.3);
          shade(k, 0.35, [{ x: 960, y: 520, r: 900, warm: 0.5 }]);
          return;
        }
        letter(k, 960, 520, 1300, ['Thìn.', 'Con chim đến nhầm nhà.', 'Năm năm mươi, mày kéo tao lên từ sông Đáy.', 'Tao nợ mày một mạng. Giờ tao trả.'], { p: k.at('l', 0.8), lineP: (i) => k.at(k.cue('q', i * 1.6), 1.6, 'linear'), size: 46 });
        shade(k, 0.3, [{ x: 960, y: 520, r: 900, warm: 0.5 }]);
      },
    },
    {
      say: '{a}Tôi đọc lại mảnh giấy ba lần. Ở dưới cùng, ông Từ ghi ngày. Đó là ngày thứ hai, ngày ông gọi tôi ra bờ rào đưa cái hộp. {b}Trước khi tôi bắn hòn sỏi. Trước cả khi con chim đến lần thứ hai. {c}Ông Từ đã viết lá thư ấy khi chưa ai biết con chim sẽ bay về đâu. {d}Hay là ông đã biết. {e}Tôi chạy ra bờ rào, nhìn sang ngôi nhà đã đóng cửa, khói hương còn vương. Lần đầu tiên sau mấy ngày, tôi thấy nhẹ người. Rồi lại thấy sợ hơn.',
      sfx: [['stinger', 'd', 0.45]],
      draw(k) {
        if (k.t < k.cue('e')) {
          black(k);
          letter(k, 960, 470, 1300, ['Thìn.', 'Con chim đến nhầm nhà.', 'Năm năm mươi, mày kéo tao lên từ sông Đáy.', 'Tao nợ mày một mạng. Giờ tao trả.'], { size: 46 });
          k.text('Ngày thứ hai · tháng Mười, 1994', 1520, 820, { size: 40, color: '#2a2018', align: 'right' });
          const { ctx } = k, p = k.at('a', 5); if (p > 0) { ctx.save(); ctx.strokeStyle = '#c8302a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(1300, 812, 270 * p, 40, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
          shade(k, 0.3, [{ x: 960, y: 520, r: 900, warm: 0.5 }]);
          quote(k, 'Hay là ông đã biết.', 'd', { color: AMBER });
          return;
        }
        zoom(k, 1300, 700, 1.5, () => { xom(k, { time: 'dusk' }); xomProps(k, { lamp: 0, cups: [] }); wisp(k, 1600, 760, 0.3); ch(k, 760, 960, 320, { ...HAI, face: 'sad', look: 1 }); });
        k.vignette(0.45);
      },
    },

    // ===== CHƯƠNG 6 =====
    {
      chapter: 'Bốn mươi năm',
      say: '{a}Hôm ấy, lần đầu tiên, ông tôi kể. {b}Năm 1950, sông Đáy lũ to. Ông Từ đi vớt củi, bị nước cuốn. Ông tôi nhảy xuống, kéo được ông Từ lên bờ, suýt chết theo. {c}Từ hôm ấy, hai người thành anh em. Ông Từ hay nói: tao nợ mày một mạng.',
      sfx: [['wind', 'b', 0.3], ['thunder', 'b', 0.25]],
      draw(k) {
        if (k.t < k.cue('b')) { bedroom(k, null, 440, { net: false }); sitBed(k, 900, { ...ONG, face: 'sad', talk: 0.2 }); shade(k, 0.5, [{ x: 1700, y: 420, r: 1000 }]); chapter(k, 6, 'Bốn mươi năm'); return; }
        flood(k);
        const p = k.at('b', 6, 'inOut');
        ch(k, k.lerp(1100, 700, p), k.lerp(1010, 850, p), 380, { ...TU_TRE, face: 'shock', pose: 'cheer' });
        k.water(860, { color: '#6a5634', amp: 12, alpha: 0.85 });
        ch(k, 560, 840, 420, { ...THIN_TRE, face: 'angry', pose: 'point' });
        cold(k, 0.6);
        tag(k, 'SÔNG ĐÁY · 1950', 'b');
        quote(k, '"Tao nợ mày một mạng."', 'c', { color: COLD });
      },
    },
    {
      say: '{a}Rồi cả hai cùng thương một người con gái. Bà nội tôi. {b}Ông tôi kể chậm rãi, mắt không nhìn ai. Bà thương ông Từ. Ai trong làng cũng biết bà thương ông Từ. {c}Nhưng đến mùa cưới năm năm mươi tư, ông Từ không đến hỏi. Ông Từ sang gặp ông tôi, bảo: mày hỏi đi. {q}Mày cứu tao, thì cái gì của tao cũng là của mày. {d}Bà nội về làm vợ ông tôi. Ông Từ trồng một bờ rào dâm bụt giữa hai nhà, rồi không bao giờ lấy vợ.',
      draw(k) {
        hoi(k);
        ch(k, 960, 960, 400, { ...BA_TRE, face: after(k, 'b') ? 'happy' : 'calm', look: after(k, 'b') ? -1 : 0 }); hibiscus(k, 990, 600, 1.4);
        ch(k, 600, 980, 440, { ...TU_TRE, face: after(k, 'c') ? 'sad' : 'happy', look: 1 });
        ch(k, 1320, 980, 450, { ...THIN_TRE, face: 'calm', look: -1, flip: true });
        if (after(k, 'c')) { for (let i = 0; i < 3; i++) ch(k, 200 + i * 120, 990, 400, { ...DAN(['#5a4a3a', '#3a4a5a', '#4a3a3a'][i]), face: 'happy' }); }
        cold(k, 0.55);
        tag(k, 'HỘI LÀNG · 1954', 'a');
        quote(k, '"Mày cứu tao, thì cái gì của tao cũng là của mày."', 'q', { color: COLD, size: 46, until: 'd' });
      },
    },
    {
      say: '{a}Hôm đám cưới, ông Từ không sang uống rượu. Cả buổi chiều, ông đứng ở mảnh đất giữa hai nhà, trồng từng gốc dâm bụt. Bờ rào ông trồng chỉ cao ngang ngực, để đứng bên này vẫn nhìn được sang bên kia. {b}Bà tôi về làm dâu, sáng nào cũng ra bờ rào hái lá dâm bụt gội đầu. Ông Từ bên kia đã dậy từ trước, cầm chổi quét sân. {c}Hai người không nói với nhau một câu, suốt ba mươi tư năm.',
      draw(k) {
        zoom(k, 950, 700, 1.5, () => {
          xom(k, { time: after(k, 'b') ? 'day' : 'dusk' });
          if (!after(k, 'b')) ch(k, 1000, 930, 420, { ...TU_TRE, face: 'sad', pose: 'hold' });
          else { ch(k, 720, 950, 400, { ...BA_TRE, face: 'calm', pose: 'hold', look: 1 }); ch(k, 1250, 930, 420, { ...TU_TRE, face: 'blank', pose: 'hold', look: -1, flip: true }); }
        });
        cold(k, 0.55);
        quote(k, 'Ba mươi tư năm không nói một câu.', 'c', { color: COLD });
      },
    },
    {
      say: '{a}Tôi hỏi ông: thế sao ông giận ông Từ? {b}Ông tôi lắc đầu. Ông bảo, ông không giận. {x}Ông xấu hổ. {c}Bốn mươi năm, tao ăn cơm bên này, biết bà mày nhìn sang bên kia. Biết thằng Từ ngồi đấy thắp đèn cho bà mày đỡ sợ tối. Tao không dám nhìn mặt nó. Nhìn mặt nó là thấy món nợ nó trả tao. {d}Ông nhìn mảnh giấy, rồi nói thêm, rất khẽ: {q}Nó trả tao hai lần rồi. Tao chưa trả nó lần nào.',
      sfx: [['stinger', 'q', 0.35]],
      draw(k) {
        zoom(k, 900, 620, 1.7, () => { bedroom(k, null, 440, { net: false }); sitBed(k, 900, { ...ONG, face: after(k, 'c') ? 'cry' : 'sad', tears: after(k, 'c') ? 0.8 : 0, talk: after(k, 'c') ? 0.2 : 0, pose: 'hold' }); hibiscus(k, 960, 690, 1.3, '#7a4a2a'); shade(k, 0.5, [{ x: 1700, y: 420, r: 1000 }, { x: 900, y: 600, r: 400, warm: 0.5 }]); });
        quote(k, 'Ông không giận. Ông xấu hổ.', 'x', { color: AMBER, until: 'c' });
        quote(k, '"Nó trả tao hai lần rồi. Tao chưa trả nó lần nào."', 'q', { color: AMBER, size: 46 });
      },
    },
    {
      say: '{a}Ông tôi kể thêm một chuyện nữa. Năm tám mươi tám, trước khi mất, bà tôi nắm tay ông, dặn một câu: {q}ông đừng đi trước anh Từ. Đừng để anh ấy ở lại một mình bên ấy. {b}Bà nói bên ấy. Ông tôi bảo, đến giờ ông vẫn không biết bà muốn nói bên kia bờ rào, hay bên kia một chỗ khác. {c}Ông giữ được nửa đầu lời dặn: ông không đi trước. Còn nửa sau thì bây giờ, ông Từ đã sang bên ấy một mình.',
      draw(k) {
        zoom(k, 960, 470, 1.9, () => { altar(k, { feather: true }); shade(k, 0.45, altarLightsHD(1.4)); });
        quote(k, '"Đừng để anh ấy ở lại một mình bên ấy."', 'q', { color: COLD, size: 46, until: 'b' });
        quote(k, 'Bên kia bờ rào, hay bên kia một chỗ khác?', 'b', { color: AMBER, size: 46, until: 'c' });
      },
    },
    {
      say: '{a}Đám tang ông Từ, ông tôi chống gậy tự đi sang, không cho ai dìu. Người làng nhìn nhau, vì chưa ai từng thấy ông bước qua bờ rào ấy. {b}Ông đứng bên quan tài rất lâu. Rồi ông bẻ một bông dâm bụt trên rào, đặt vào tay ông Từ. {c}Bốn mươi năm, đó là lần đầu tiên hai ông già đứng gần nhau đến thế.',
      sfx: [['gong', 0, 0.2]],
      draw(k) {
        xom(k, { time: 'day' }); xomProps(k, { lamp: 0, chair: false, table: false });
        coffin(k, 1420, 880, 1);
        for (let i = 0; i < 4; i++) ch(k, 1640 + i * 60, 960, 400, { ...DAN(['#3a3a3a', '#4a4a3a', '#2e2e2e', '#3e3e3e'][i]), face: 'sad', hat: 'band', hatColor: '#efece4', flip: true });
        const p = k.at('a', 6, 'inOut');
        ch(k, k.lerp(500, 1230, p), 960, 450, { ...ONG, face: 'sad', prop: 'staff', walk: p > 0 && p < 1, hat: 'band', hatColor: '#efece4' });
        if (after(k, 'b', 3)) hibiscus(k, 1360, 790, 1.2);
        k.vignette(0.4);
      },
    },

    // ===== KẾT =====
    {
      chapter: 'Kết',
      say: '{a}Sau đám tang, nhà ông Từ bỏ trống. Không có họ hàng nào về nhận. {b}Nhưng có những đêm, tôi nhìn qua bờ rào, thấy ngọn đèn bão ở hiên nhà ông Từ vẫn sáng. Có đêm tôi chạy vào buồng, thấy giường ông trống, và sáng ra ông bảo, như không có chuyện gì: tao sang thắp đèn cho nó. {c}Có đêm thì ông tôi vẫn đang ngủ. {d}Những đêm ấy, ai thắp, tôi chưa bao giờ dám hỏi.',
      sfx: [['wind', 0, 0.25]],
      draw(k) {
        if (after(k, 'c') && !after(k, 'd')) { bedroom(k, { ...ONG, face: 'calm' }, 440, { net: false }); shade(k, 0.82, [{ x: 760, y: 700, r: 360 }]); return; }
        zoom(k, 1100, 640, 1.3, () => { xom(k, { time: 'night' }); xomProps(k, { lamp: after(k, 'b') ? 1 : 0, cups: [] }); ch(k, 700, 960, 320, { ...HAI, face: 'blank', look: 1 }); night(k, after(k, 'b') ? [lampLight()] : []); });
        chapter(k, 7, 'Kết');
        quote(k, 'Ai thắp?', 'd', { color: COLD, size: 60 });
      },
    },
    {
      say: '{a}Ông tôi sống thêm đúng sáu năm, khoẻ hơn cả trước khi ốm. Mùa thu năm 2000, một đêm canh ba, cả nhà tôi lại tỉnh giấc vì tiếng {e}éc… éc… {b}Lần này nó không đậu trên mái nhà tôi. Nó đậu trên nóc nhà ông Từ. Ba đêm liền. {c}Không ai trong nhà tôi đốt rơm. Không ai khua mâm. Không ai ném đá. Năm ấy tôi mười tám tuổi. Cái súng cao su của tôi đã nằm dưới đáy ao từ sáu năm trước.',
      sfx: [['owl', 'e', 0.5]],
      draw(k) {
        zoom(k, 1300, 560, 1.4, () => { xom(k, { time: 'night' }); xomProps(k, { lamp: 0, cups: [] }); chimLon(k, XOM.tuRoof.x, XOM.tuRoof.y, 0.7, { glow: 0.6 * k.at('e', 2) }); night(k, [{ x: XOM.tuRoof.x, y: XOM.tuRoof.y - 60, r: 260 }]); });
        tag(k, 'NĂM 2000', 'a');
      },
    },
    {
      say: '{a}Ngày hôm ấy, ông tôi sang quét sân nhà ông Từ từ sáng đến trưa. Ông giặt cái áo sơ mi trắng, phơi lên bờ rào dâm bụt. Mẹ tôi nhìn sang, không nói gì, chỉ quay đi lau nước mắt. {b}Sau đêm thứ hai, ông tôi gọi tôi lại, bảo: {q}lần trước nó rủ, tao chưa đi được. Lần này đến lượt tao sang. Bà mày dặn rồi, không để nó ở bên ấy một mình. {c}Tôi không hiểu. Hoặc là tôi không muốn hiểu.',
      draw(k) {
        zoom(k, 1100, 700, 1.4, () => {
          xom(k, { time: 'day' }); xomProps(k, { lamp: 0, cups: [] });
          const { ctx } = k; ctx.fillStyle = '#ece8de'; ctx.strokeStyle = '#211a15'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(940, 720); ctx.lineTo(1020, 720); ctx.lineTo(1050, 750); ctx.lineTo(1030, 760); ctx.lineTo(1020, 745); ctx.lineTo(1020, 820); ctx.lineTo(940, 820); ctx.lineTo(940, 745); ctx.lineTo(930, 760); ctx.lineTo(910, 750); ctx.closePath(); ctx.fill(); ctx.stroke();
          if (!after(k, 'b')) { ch(k, 1550, 940, 450, { ...ONG, face: 'calm', pose: 'hold' }); ch(k, 500, 960, 420, { ...ME, face: 'sad', look: 1 }); }
          else { ch(k, 600, 950, 450, { ...ONG, face: 'calm', talk: after(k, 'q') && !after(k, 'c') ? 0.2 : 0 }); ch(k, 760, 960, 420, { ...HAI_LON, face: 'sad' }); }
        });
        k.vignette(0.35);
        quote(k, '"Lần này đến lượt tao sang."', 'q', { color: AMBER, until: 'c' });
      },
    },
    {
      say: '{a}Sáng hôm sau đêm thứ ba, giường ông tôi trống. {b}Người ta tìm thấy ông bên kia bờ rào, ngồi trên cái ghế mây của ông Từ, quay mặt sang nhà tôi, mặc cái áo sơ mi trắng đã giặt. Ngọn đèn bão ở hiên vẫn còn cháy. {c}Trên bàn có hai chén rượu. Một chén vẫn đầy. Một chén đã cạn. {d}Cạnh hai chén rượu là chiếc lông trắng mà bố tôi để trên bàn thờ bà từ sáu năm trước. Không ai trong nhà mang nó sang.',
      sfx: [['stinger', 'd', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { bedroom(k, null, 440, { net: false }); shade(k, 0.5, [{ x: 1700, y: 420, r: 1000 }]); return; }
        const z = after(k, 'c') ? 3.4 : 1.35;
        zoom(k, after(k, 'c') ? XOM.table.x : 1380, after(k, 'c') ? XOM.table.y - 90 : 700, z, () => { xom(k, { time: 'dawn' }); xomProps(k, { lamp: 1, sitter: { ...ONG_AO, face: 'calm', flip: true }, cups: [true, false], feather: after(k, 'd') }); shade(k, 0.4, [lampLight(1.3), MOON]); });
        quote(k, 'Một chén vẫn đầy. Một chén đã cạn.', 'c', { color: AMBER, until: 'd' });
        quote(k, 'Không ai trong nhà mang nó sang.', 'd', { color: COLD });
      },
    },
    {
      say: '{a}Bây giờ cả hai ngôi nhà đều không ai ở. Bố mẹ tôi lên huyện sống với tôi. Bờ rào dâm bụt không ai cắt tỉa, mọc cao quá đầu người. {b}Người trong xóm bảo, những đêm rằm đi qua đấy, vẫn thấy một ngọn đèn bão sáng ở hiên nhà ông Từ. Có người còn bảo nghe tiếng hai ông già nói chuyện, tiếng chén rượu chạm nhau. {c}Tôi chưa về xem lần nào. Tôi sợ nếu về, tôi sẽ thấy cái ghế mây ấy có hai người ngồi.',
      sfx: [['wind', 0, 0.25]],
      draw(k) {
        zoom(k, 1050, 600, 1.2, () => { xom(k, { time: 'night', tall: true }); xomProps(k, { lamp: after(k, 'b') ? 1 : 0, cups: [true, true] }); night(k, after(k, 'b') ? [lampLight()] : [], 0.8); });
        quote(k, 'Cái ghế mây ấy có hai người ngồi.', k.cue('c', 3), { color: COLD });
      },
    },
    {
      lead: 0.8, tail: 2.5,
      say: '{a}Ở làng tôi, các cụ bảo: chim lợn kêu trên mái nhà nào, nhà ấy sắp có tang. {b}Năm 1994, nó kêu trên mái nhà tôi, mà người đi là ông Từ. Sáu năm sau, nó kêu trên mái nhà ông Từ, mà người đi là ông tôi. {c}Đến giờ, tôi vẫn không biết con chim năm ấy đến nhầm nhà, hay hòn sỏi của tôi đã đổi đường cho nó. {d}Hay là hai ông già bên bờ rào đã hẹn với nhau từ trước.',
      sfx: [['wind', 0, 0.25], ['gong', 'd', 0.2]],
      draw(k) {
        xom(k, { time: 'dusk', tall: true }); xomProps(k, { lamp: 0, cups: [] });
        const p = k.at('b', 10, 'inOut'), pos = flyPath(k, XOM.tuRoof, { x: 2200, y: 120 }, p);
        chimLon(k, pos.x, pos.y, 0.6, { fly: p > 0 && p < 1 ? 1 : 0, glow: 0.4 });
        shade(k, 0.35, [{ x: 960, y: 400, r: 1300 }]);
        quote(k, 'Hay là hai ông già đã hẹn với nhau từ trước.', 'd', { color: PAPER, size: 52 });
      },
    },

    // ===== CUỐI =====
    nextScene({
      say: '{next}Tập sau: chị tôi đi Thái về, mang theo một bức tượng đứa trẻ bằng đất, dặn cả nhà mỗi sáng đặt cho nó một hộp sữa. Một sáng, cả nhà quên. Đến trưa, hộp sữa trong tủ lạnh đã bị cắn thủng.',
      title: 'Kumanthong | Bức Tượng Chị Tôi Mang Từ Thái Về',
      hook: 'Một sáng cả nhà quên… đến trưa, hộp sữa đã bị cắn thủng.',
      art(k) {
        const { ctx } = k;
        const g = ctx.createLinearGradient(0, 200, 0, 800); g.addColorStop(0, '#0c0a10'); g.addColorStop(1, '#2a1c18'); ctx.fillStyle = g; ctx.fillRect(400, 200, 1120, 600);
        ctx.fillStyle = '#5a3a26'; ctx.fillRect(700, 640, 520, 30);
        ctx.fillStyle = '#8a5a3a'; ctx.beginPath(); ctx.ellipse(900, 560, 46, 60, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(900, 470, 40, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#efe8d8'; ctx.fillRect(1040, 560, 60, 80); ctx.fillStyle = '#3a6aa8'; ctx.fillRect(1040, 590, 60, 18);
        k.vignette(0.5);
      },
    }),
    subScene({
      say: '{q}Theo bạn, con chim lợn năm ấy đến nhầm nhà, hay ông Từ đã xin đi thay? Hãy để lại câu trả lời. {sub}Và nếu muốn nghe tiếp những chuyện chưa có lời giải, hãy đăng ký Nhân Gian Chưa Kể.',
      question: 'Con chim lợn đến nhầm nhà, hay ông Từ đã xin đi thay?',
      art(k) { table(k, 960, 1040, 1.4, { cups: [true, false], feather: true }); },
    }),
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
