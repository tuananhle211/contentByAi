// Nhân Gian Chưa Kể · Short 1 của tập 127 (Ma Giấu): bảy đứa trốn, tám đứa về. Không lộ chuyện cái hầm và lời thú nhận của bố.
// Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { TOI, TIT, HIEU, MAI, BAN, LANH, ch, vuonNhan, NHAN, sepia } from '/channel/nhan-gian-magiau.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const dusk = (k, x = 980) => shade(k, 0.52, [{ x, y: 600, r: 1100, warm: 1 }], { vig: 0 });
const night = (k, x = 980) => shade(k, 0.72, [{ x, y: 760, r: 560 }], { vig: 0 });
const up = (k, p, h = 275) => ch(k, NHAN.x - 128, 915, h, { ...p, view: 'side', arms: 'cover', face: 'sleep' });
// Tám đứa đứng thành hàng gọn trong khung dọc, đứa cuối là Lành.
function hang(k, o = {}) { [[640, TOI, 300], [760, HIEU, 330], [880, MAI, 285], [1000, BAN[0], 285], [1110, BAN[1], 275], [1220, BAN[2], 275], [1330, BAN[3], 285]].forEach(([x, p, h]) => ch(k, x, 1010, h, { ...p, face: o.face ?? 'fear', arms: 'down' })); if (o.lanh !== false) ch(k, 1450, 1010, 245, { ...LANH, face: o.lface ?? 'calm', arms: 'down' }); }
function thumb(k) {
  vframe(k, 1040, () => { vuonNhan(k, { time: 'dusk', rom: false }); hang(k, { lface: 'happy' }); dusk(k, 1100); }, { y0: 520 });
  vline(k, 'BẢY ĐỨA ĐI TRỐN,', 280, 0, { size: 88 });
  vline(k, 'TÁM ĐỨA CHẠY VỀ', 400, 0, { size: 92, color: AMBER });
}
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Bảy đứa chúng tôi đi trốn, lúc mở mắt lại có tám đứa chạy về… #shorts',
    description: 'Bảy đứa chúng tôi chơi trốn tìm lúc chập tối. Thằng em tôi úp mặt vào gốc nhãn, đếm đến một trăm. Lúc nó mở mắt, tám đứa chạy về. Đứa thứ tám đòi đếm một lượt, nhưng nó không đếm từ một.\n\nBản đầy đủ: Ma Giấu | Bảy Đứa Đi Trốn, Lúc Mở Mắt Tám Đứa Chạy Về, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên tín ngưỡng dân gian.',
    links: [['▶ Bản đầy đủ: Ma Giấu', '127-ma-giau-bay-dua-di-tron']],
    tags: ['ma giấu', 'bị ma giấu', 'trốn tìm', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'magiau'],
    format: 'short', captions: true, gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '127-ma-giau-bay-dua-di-tron',
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Bảy đứa chúng tôi đi trốn. Thằng em tôi úp mặt vào gốc nhãn, đếm đến một trăm. {b}Lúc nó mở mắt, tám đứa chạy về.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, NHAN.x - 60, () => { vuonNhan(k, { time: 'dusk', rom: false }); up(k, TIT); dusk(k); }); vline(k, 'ĐẾM ĐẾN MỘT TRĂM', 300, 'a', { size: 88, color: AMBER }); return; }
        vframe(k, 1040, () => { vuonNhan(k, { time: 'dusk', rom: false }); hang(k); dusk(k, 1100); }); vline(k, 'TÁM ĐỨA CHẠY VỀ', 300, 'b', { size: 96, color: AMBER });
      },
    },
    {
      say: '{a}Đứng cuối hàng là một đứa con gái nhỏ, chân đất, người có mùi đất ướt, {b}dù cả tháng ấy trời không mưa. {c}Không đứa nào biết nó.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) { vframe(k, 1400, () => { vuonNhan(k, { time: 'dusk', rom: false }); ch(k, 1250, 1010, 290, { ...BAN[3], view: 'side', face: 'fear', arms: 'down' }); ch(k, 1450, 1010, 270, { ...LANH, face: 'calm', arms: 'down' }); dusk(k, 1400); }, { s: 1.15 }); vline(k, 'ĐỨA THỨ TÁM', 300, 'a', { size: 104, color: COLD }); },
    },
    {
      say: '{a}Bà tôi dặn: thấy thừa một đứa, không được hỏi tên nó. {b}Nhưng thằng Hiếu đã hỏi. {c}Con bé cười: {q}Lành. Em tên Lành.',
      sfx: [['stinger', 'q', 0.45]],
      draw(k) {
        vframe(k, 1260, () => { vuonNhan(k, { time: 'dusk', rom: false }); ch(k, 1080, 1010, 350, { ...HIEU, view: 'side', face: after(k, 'c') ? 'fear' : 'angry', arms: 'point', talk: after(k, 'b') && !after(k, 'c') ? 0.6 : 0 }); ch(k, 1420, 1010, 270, { ...LANH, view: 'side', flip: true, face: after(k, 'c') ? 'happy' : 'calm', arms: 'down', talk: after(k, 'q') ? 0.5 : 0 }); dusk(k, 1260); });
        vline(k, k.t < k.cue('c') ? 'KHÔNG ĐƯỢC HỎI TÊN' : '"EM TÊN LÀNH."', 300, 0, { size: 88, color: k.t < k.cue('c') ? AMBER : COLD });
      },
    },
    {
      say: '{a}Nó đòi đếm một lượt. Nhưng nó không đếm từ một. Nó đếm: {q}bảy mươi mốt, bảy mươi hai. {b}Hỏi sao đếm thế, nó bảo: {r}anh ấy đếm đến bảy mươi rồi.',
      sfx: [['heartbeat', 'q', 0.4], ['stinger', 'r', 0.45]],
      draw(k) { vframe(k, NHAN.x - 60, () => { vuonNhan(k, { time: 'dusk', rom: false }); up(k, LANH, 270); dusk(k); }); vline(k, after(k, 'r') ? '"ĐẾM ĐẾN 70 RỒI."' : '71 · 72 · 73…', 300, 'q', { size: 92, color: after(k, 'r') ? COLD : AMBER }); },
    },
    {
      say: '{a}Nó đi thẳng đến chỗ từng đứa trốn, đặt bàn tay lạnh ngắt lên vai: {q}thấy rồi. {b}Đủ bảy đứa. {c}Rồi nó nhìn quanh vườn, cười: {r}còn một đứa nữa. Nó trốn kỹ lắm.',
      sfx: [['heartbeat', 'q', 0.4], ['stinger', 'r', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) { const p = k.at('a', 3, 'linear'), x = k.lerp(1400, 860, p); vframe(k, 900, () => { vuonNhan(k, { time: 'night', rom: false }); ch(k, 760, 1010, 310, { ...HIEU, action: 'kneel', view: 'side', face: 'fear', arms: 'chest' }); ch(k, x, 1010, 270, { ...LANH, view: 'side', flip: true, action: p < 1 ? 'walk' : 'stand', face: 'calm', arms: p >= 1 ? 'point' : 'down' }); night(k, x); }); vline(k, '"THẤY RỒI."', 300, 'q', { size: 104, color: COLD }); return; }
        vframe(k, 1240, () => { vuonNhan(k, { time: 'night', rom: false }); ch(k, 1240, 1000, 280, { ...LANH, face: 'happy', arms: 'down' }); night(k, 1240); }); vline(k, '"CÒN MỘT ĐỨA NỮA."', 300, 'r', { size: 84, color: AMBER });
      },
    },
    {
      say: '{a}Đứa còn lại là em trai tôi. Đêm ấy, nó không về. {b}Đến giờ, tôi vẫn nhớ như in cái chiều hôm ấy, lúc bảy đứa chúng tôi đi trốn…',
      sfx: [['wind', 'a', 0.3]],
      draw(k) { vframe(k, NHAN.x, () => { vuonNhan(k, { time: 'night', rom: false }); night(k, NHAN.x); }); vline(k, 'NÓ KHÔNG VỀ.', 300, 'a', { size: 104, color: COLD }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
