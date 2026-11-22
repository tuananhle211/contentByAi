// Nhân Gian Chưa Kể · Short 1 của tập 136 (Bắc Kim Thang): đám rước không người, 38 lồng đèn đã đốt, con cá chép trôi ngược. Không lộ bí mật Bé Rằm.
// Sửa 20/11 (hướng chân thật): bỏ cá chép đậu bến và trôi ngược; chỉ tôi thấy đám rước. Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { NGOAI, ch, kinh, KINH, damRuoc, longDen, lua, sepia } from '/channel/nhan-gian-kinh.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const night = (k, fn, cx = 1000, o = {}) => vframe(k, cx, () => { kinh(k, { time: o.time ?? 'night', moon: true }); shade(k, o.a ?? 0.7, [{ x: 1620, y: 300, r: 900 }], { vig: 0 }); if (fn) fn(); });
function thumb(k) { night(k, () => damRuoc(k, 0, { x0: 1700, n: 8 }), 1000, { a: 0.72 }); vline(k, 'ĐÁM RƯỚC KHÔNG NGƯỜI,', 280, 0, { size: 76 }); vline(k, 'AI ĐANG HÁT?', 400, 0, { size: 100, color: AMBER }); }
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Nửa đêm rằm tháng Tám, có một đám rước không người đi qua bờ kinh… #shorts',
    description: 'Nửa đêm rằm tháng Tám, có một đám rước đi ngang qua bờ kinh trước nhà tôi. Có trống, có cờ, có lồng đèn. Không có một bóng người. Chỉ có tiếng con nít hát bắc kim thang.\n\nBản đầy đủ: Bắc Kim Thang | Đám Rước Không Người Dừng Trước Bến Nhà Tôi, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên đồng dao và tục rước đèn Trung thu.',
    links: [['▶ Bản đầy đủ: Bắc Kim Thang', '136-bac-kim-thang-dam-ruoc-khong-nguoi']],
    tags: ['bắc kim thang', 'đám rước không người', 'rước đèn trung thu', 'truyện ma miền tây', 'truyện ma', 'chuyện tâm linh', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'backimthang'],
    format: 'short', captions: true, gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '136-bac-kim-thang-dam-ruoc-khong-nguoi',
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Nửa đêm rằm tháng Tám, có một đám rước đi ngang qua bờ kinh trước nhà tôi. {b}Có trống, có cờ, có lồng đèn. Không có một bóng người.',
      sfx: [['drum', 'a', 0.4], ['drum', ['a', 1.5], 0.4], ['stinger', 'b', 0.4]],
      draw(k) { night(k, () => damRuoc(k, k.at('a', 8, 'linear'), { span: 1300 })); vline(k, after(k, 'b') ? 'KHÔNG MỘT BÓNG NGƯỜI' : 'NỬA ĐÊM RẰM THÁNG TÁM', 300, 'a', { size: 80, color: after(k, 'b') ? COLD : AMBER }); },
    },
    {
      say: '{a}Lồng đèn đung đưa ngang tầm tay con nít, mà không có tay ai cầm. Cái trống tự đánh từng tiếng một. {b}Và có tiếng con nít hát: {q}bắc kim thang, cà lang bí rợ.',
      sfx: [['drum', 'a', 0.4], ['heartbeat', 'q', 0.35]],
      draw(k) { night(k, () => k.group({ x: 1000, y: 720, s: 1.6 }, () => k.group({ x: -1000, y: -720 }, () => damRuoc(k, 0.5 + k.at('a', 10, 'linear') * 0.3, { span: 1300 })))); vline(k, after(k, 'q') ? '"BẮC KIM THANG…"' : 'KHÔNG AI CẦM', 300, 'a', { size: 96, color: after(k, 'q') ? COLD : AMBER }); },
    },
    {
      say: '{a}Tôi đếm. Ba mươi tám cái lồng đèn. {b}Đúng ba mươi tám cái mà một tháng trước, ngoại tôi đã đốt thành tro.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 960, () => { k.ctx.fillStyle = '#0a0e16'; k.ctx.fillRect(0, 0, 1920, 1080); const n = Math.min(38, 1 + Math.floor(k.at('a', 2.5, 'linear') * 38)); for (let i = 0; i < n; i++) { const r = Math.floor(i / 7), c = i % 7; longDen(k, 560 + c * 135, 200 + r * 150, 0.32, ['ca', 'sao', 'tho', 'keo'][i % 4], { stick: false }); } }); vline(k, '38 CÁI LỒNG ĐÈN', 300, 'a', { size: 100, color: AMBER }); return; }
        vframe(k, 960, () => { k.ctx.fillStyle = '#140e0a'; k.ctx.fillRect(0, 0, 1920, 1080); lua(k, 960, 980, 2); shade(k, 0.5, [{ x: 960, y: 760, r: 760, warm: 1, flicker: 1 }], { vig: 0 }); }); vline(k, 'ĐÃ ĐỐT THÀNH TRO', 300, 'b', { size: 96, color: AMBER });
      },
    },
    {
      say: '{a}Đám rước dừng lại trước bến nhà tôi, rồi từng cái một đi tiếp, tắt dần ở cuối xóm. {b}Tôi quay lại gọi má. Lúc má ra tới cửa sổ, bờ kinh chỉ còn tối om.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) { const go = after(k, 'a', 2) ? k.at(k.cue('a', 2), 5, 'linear') : 0; night(k, () => damRuoc(k, 0, { x0: KINH.ben + 820 + go * 1100, n: 10 }), KINH.ben + 200, { a: after(k, 'b') ? 0.86 : 0.7 }); vline(k, after(k, 'b') ? 'MÁ KHÔNG THẤY GÌ' : 'DỪNG TRƯỚC BẾN', 300, 'a', { size: 96, color: after(k, 'b') ? COLD : AMBER }); },
    },
    {
      say: '{a}Sáng ra, trên cầu bến nhà tôi có một cái khung cá chép làm dở. Mảnh giấy ở đuôi ghi: Bé Rằm, năm 1998. {b}Ngoại nói, chính tay ngoại đã ném nó vào đống lửa.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) { vframe(k, 960, () => { k.ctx.fillStyle = '#2a2014'; k.ctx.fillRect(0, 0, 1920, 1080); longDen(k, 900, 480, 2, 'ca', { lit: false, stick: false, dang: true, tag: 1998 }); shade(k, 0.3, [{ x: 960, y: 480, r: 800 }], { vig: 0 }); }); vline(k, after(k, 'b') ? 'ĐÃ NÉM VÀO LỬA' : '"BÉ RẰM, 1998"', 300, 'a', { size: 96, color: after(k, 'b') ? COLD : AMBER }); },
    },
    {
      say: '{a}Ngoại đóng hết cửa nẻo. {b}Nhưng tôi biết, nó sẽ còn quay lại. Vì đêm nào cũng vậy, cứ nửa đêm rằm tháng Tám…',
      sfx: [['drum', 'b', 0.35]],
      draw(k) { night(k, () => longDen(k, KINH.ben, 700, 0.7, 'ca', { stick: false })); vline(k, 'NÓ SẼ QUAY LẠI', 300, 'a', { size: 96, color: COLD }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
