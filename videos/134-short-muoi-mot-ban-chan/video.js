// Nhân Gian Chưa Kể · Short 1 của tập 133 (Nu Na Nu Nống): mười một bàn chân, bàn chân bốn ngón không chịu co. Không lộ bà Câm, tấm ảnh, lời thú nhận của mẹ.
// Sửa 20/11 (hướng chân thật): bỏ ván chơi thứ hai có bàn chân thứ chín. Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { TOI, COI, BIN, MAN, LY, banChan, chieu, chieuGan, banTayDap, dinh, ngoiDuoi, dauChan4, sepia } from '/channel/nhan-gian-nuna.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const GHOST = { cold: true, four: true, old: true };
const pair = (p) => [{ skin: p.skin, left: true }, { skin: p.skin }];
const X0 = 560, X1 = 1360;
const row = (k, list, o = {}) => vframe(k, 960, () => { chieuGan(k, list, { x0: X0, x1: X1, s: 0.55, y: 800 }); if (o.tap != null) { const n = list.length, i = Math.min(n - 1, Math.floor(o.tap * n)); banTayDap(k, X0 + ((X1 - X0) * i) / (n - 1) + 6, 590, 0.6); } shade(k, 0.3, [{ x: 960, y: 500, r: 1400 }], { vig: 0 }); });
const big = (k) => vframe(k, 960, () => { k.ctx.fillStyle = '#2a1e14'; k.ctx.fillRect(0, 0, 1920, 1080); chieu(k, -60, 1980, 0, 1120, { skew: 0, old: true }); banChan(k, 960, 1000, 3.2, GHOST); shade(k, 0.35, [{ x: 960, y: 560, r: 800 }], { vig: 0 }); });
const TEN = [TOI, COI, BIN, MAN, LY].flatMap(pair);
function thumb(k) { row(k, [...TEN, GHOST]); vline(k, '5 ĐỨA NGỒI CHƠI,', 280, 0, { size: 92 }); vline(k, 'SAO 11 BÀN CHÂN?', 400, 0, { size: 92, color: AMBER }); }
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Năm đứa ngồi chơi nu na nu nống, tôi đếm được mười một bàn chân… #shorts',
    description: 'Năm đứa chúng tôi ngồi duỗi chân chơi nu na nu nống. Năm đứa, mười bàn chân. Đến cuối hàng, tay tôi chạm vào một bàn chân thứ mười một, lạnh ngắt, chỉ có bốn ngón.\n\nBản đầy đủ: Nu Na Nu Nống | Năm Đứa Ngồi Chơi, Tôi Đếm Được Mười Một Bàn Chân, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên trò chơi đồng dao dân gian.',
    links: [['▶ Bản đầy đủ: Nu Na Nu Nống', '133-nu-na-nu-nong-ban-chan-thu-muoi-mot']],
    tags: ['nu na nu nống', 'đồng dao', 'trò chơi dân gian', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'nunanunong'],
    format: 'short', captions: true, gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '133-nu-na-nu-nong-ban-chan-thu-muoi-mot',
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Năm đứa chúng tôi ngồi duỗi chân, chơi nu na nu nống. Năm đứa, mười bàn chân. {b}Đến cuối hàng, tay tôi chạm vào bàn chân thứ mười một.',
      sfx: [['click', 'a', 0.25], ['stinger', 'b', 0.45]],
      draw(k) { const g = after(k, 'b'); row(k, g ? [...TEN, GHOST] : TEN, { tap: g ? 0.999 : Math.min(0.99, k.at('a', 3, 'linear')) }); vline(k, g ? 'BÀN CHÂN THỨ 11' : 'NĂM ĐỨA, MƯỜI BÀN CHÂN', 300, 'a', { size: g ? 100 : 76, color: g ? AMBER : undefined }); },
    },
    {
      say: '{a}Bàn chân ấy lạnh như đá, da nứt nẻ, gót chai sạn như chân người già. {b}Và nó chỉ có bốn ngón.',
      sfx: [['heartbeat', 'b', 0.45]],
      draw(k) { big(k); vline(k, after(k, 'b') ? 'CHỈ CÓ BỐN NGÓN' : 'LẠNH NHƯ ĐÁ', 300, 'a', { size: 100, color: after(k, 'b') ? COLD : AMBER }); },
    },
    {
      say: '{a}Bên trên nó, không có ai cả. {b}Cả bọn bỏ chạy. Trên chiếu chỉ còn lại một vệt nước ướt.',
      sfx: [['whoosh', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 1300, () => { dinh(k, { time: 'day' }); [TOI, COI, BIN, MAN, LY].forEach((p, i) => ngoiDuoi(k, 560 + i * 200, 760, 260, p, { face: 'shock' })); banChan(k, 1500, 932, 260 / 760, GHOST); shade(k, 0.3, [{ x: 1300, y: 500, r: 1400 }], { vig: 0 }); }); vline(k, 'KHÔNG CÓ AI CẢ', 300, 'a', { size: 100, color: COLD }); return; }
        vframe(k, 1300, () => { dinh(k, { time: 'day' }); dauChan4(k, [[1450, 950, 0.1]], { color: 'rgba(40,46,56,0.55)', s: 1.3 }); shade(k, 0.3, [{ x: 1300, y: 500, r: 1400 }], { vig: 0 }); }); vline(k, 'MỘT VỆT NƯỚC ƯỚT', 300, 'b', { size: 92, color: AMBER });
      },
    },
    {
      say: '{a}Hôm sau, cả bọn cãi nhau. Thằng Còi bảo cái Ly chơi khăm. Cái Ly thề sống thề chết. {b}Thằng Bin bảo, tại cái chiếu. Chiếu ấy là của một người vừa chết cóng ngay trên hiên đình.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) { vframe(k, 960, () => { dinh(k, { time: 'day' }); shade(k, 0.25, [{ x: 960, y: 300, r: 1600 }], { vig: 0 }); }); vline(k, after(k, 'b') ? 'CHIẾU CỦA NGƯỜI CHẾT' : 'AI CHƠI KHĂM?', 300, 'a', { size: 88, color: after(k, 'b') ? COLD : AMBER }); },
    },
    {
      say: '{a}Ông giữ đình cuộn chiếc chiếu lại, cất vào gian kho, khoá cửa. {b}Nhưng tối nào đi qua đình, cái Mận cũng thấy cửa kho hé ra một khe.',
      sfx: [['creak', 'b', 0.4]],
      draw(k) { vframe(k, 960, () => { dinh(k, { time: 'night' }); shade(k, 0.8, [{ x: 960, y: 700, r: 600 }], { vig: 0 }); }); vline(k, after(k, 'b') ? 'CỬA KHO HÉ RA' : 'CẤT VÀO KHO', 300, 'a', { size: 96, color: after(k, 'b') ? COLD : AMBER }); },
    },
    {
      say: '{a}Từ đấy, tôi không bao giờ dám chơi trò ấy nữa. {b}Vì tôi cứ nhớ mãi cái chiều hôm ấy, năm đứa chúng tôi ngồi duỗi chân…',
      sfx: [['wind', 'a', 0.3]],
      draw(k) { vframe(k, 1300, () => { dinh(k, { time: 'dusk' }); shade(k, 0.55, [{ x: 1300, y: 760, r: 700, warm: 1 }], { vig: 0 }); }); vline(k, 'KHÔNG DÁM CHƠI NỮA', 300, 'a', { size: 86, color: COLD }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
