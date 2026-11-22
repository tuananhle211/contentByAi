// Nhân Gian Chưa Kể · Short 1 của tập 121 (Cầu Cơ): bốn đứa, năm cái bóng. Không lộ chuyện Quân đứng nhìn / ma da.
// Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { PAPER, AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { NAM, QUAN, HAI, LINH, ch, board, boardPos, coinAt, coin, fingerArm, lopHoc, deskFront, wallShadows, ROOM, candleLight, sepia } from '/channel/nhan-gian-cauco.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
function cls(k, o = {}) {
  const f = o.faces ?? {};
  lopHoc(k, { open: o.open ?? 0, power: o.power ?? 0, prints: o.prints ?? 0 });
  wallShadows(k, [560, 820, 1100, 1360], { extra: o.fifth ?? 0, extraX: 1230 });
  if (o.kids !== false) { ch(k, 820, 810, 340, { ...LINH, action: 'sit', face: f.linh ?? 'fear', arms: 'hold' }); ch(k, 1100, 810, 370, { ...QUAN, action: 'sit', face: f.quan ?? 'blank', arms: 'hold' }); }
  deskFront(k, { candle: o.candle ?? 1 });
  if (o.kids !== false) { ch(k, 520, 905, 350, { ...NAM, view: 'side', action: 'sit', face: f.nam ?? 'calm', arms: { r: [[12, 4], [24, 2]] } }); ch(k, 1400, 905, 310, { ...HAI, view: 'side', action: 'sit', flip: true, face: f.hai ?? 'fear', arms: { r: [[12, 4], [24, 2]] } }); }
  shade(k, o.power ? 0.25 : 0.82, [candleLight(ROOM.candle.x, ROOM.candle.y, 620, o.candle ?? 1)], { vig: 0 });
}
function brd(k, seq, t0, step, from = '.') {
  const c = coinAt(k, seq, t0, step, from), chars = [...seq];
  board(k, { hi: c.idx >= 0 ? chars[c.idx] : null }); const [x, y] = c.pos; coin(k, x, y, 1.2);
  fingerArm(k, [x - 180, 1220], [x - 26, y + 24], { skin: NAM.skin }); fingerArm(k, [x + 160, -160], [x + 20, y - 30], { skin: QUAN.skin });
  fingerArm(k, [-160, y - 60], [x - 34, y - 10], { skin: LINH.skin }); fingerArm(k, [2080, y + 80], [x + 34, y + 14], { skin: HAI.skin });
  shade(k, 0.55, [{ x, y, r: 700, warm: 1, flicker: 1 }], { vig: 0 });
  return c.pos;
}
function thumb(k) {
  vframe(k, 960, () => cls(k, { fifth: 1, faces: { nam: 'shock' } }), { y0: 520 });
  vline(k, 'BỐN ĐỨA CHƠI CẦU CƠ,', 280, 0, { size: 78 });
  vline(k, 'SAO CÓ 5 CÁI BÓNG?', 400, 0, { size: 88, color: AMBER });
}
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Bốn đứa chơi cầu cơ trong lớp, trên tường lại có năm cái bóng… #shorts',
    description: 'Bốn đứa chúng tôi chơi cầu cơ trên tầng ba của trường lúc mất điện. Đồng xu đánh ra tên một đứa bạn đã chết đuối, rồi gọi tôi bằng cái tên chỉ nó từng gọi.\n\nBản đầy đủ: Cầu Cơ | Thằng Bạn Chết Đuối Bảo: Có Người Đứng Nhìn, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu; không khuyến khích chơi cầu cơ.',
    links: [['▶ Bản đầy đủ: Cầu Cơ', '121-cau-co-thang-ban-chet-duoi']],
    tags: ['cầu cơ', 'cầu cơ kinh dị', 'chơi cầu cơ', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'cauco'],
    format: 'short', captions: true, gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '121-cau-co-thang-ban-chet-duoi',
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Bốn đứa chúng tôi chơi cầu cơ trên tầng ba của trường, lúc mất điện. {b}Đồng xu đánh ra tên một đứa bạn đã chết đuối mùa hè năm trước.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 960, () => cls(k, {})); vline(k, 'CẦU CƠ', 300, 'a', { size: 120, color: AMBER }); return; }
        vframe(k, 960, () => brd(k, 'TUNG', k.cue('b', 0.8), 0.6));
        vline(k, 'T · U · N · G', 300, k.cue('b', 3), { size: 96, color: AMBER });
      },
    },
    {
      say: '{a}Tôi không tin. Tôi bảo nó gọi tôi bằng cái tên chỉ nó gọi. {b}Đồng xu chạy: Nờ. A. Mờ. Rờ. O. Mờ. {c}Nam Ròm.',
      sfx: [['stinger', 'c', 0.4]],
      draw(k) {
        vframe(k, 960, () => brd(k, 'NAMROM', k.cue('b', 0.2), 0.5, 'G'));
        vline(k, 'NAM RÒM', 300, 'c', { size: 110, color: AMBER });
      },
    },
    {
      say: '{a}Rồi nó đánh tiếp, không ai hỏi: {b}có người đứng nhìn.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) {
        vframe(k, 960, () => brd(k, 'CONGUOIDUNGNHIN', k.cue('a', 0.5), 0.2, 'M'));
        vline(k, 'CÓ NGƯỜI', 280, 'b', { size: 100, color: AMBER });
        vline(k, 'ĐỨNG NHÌN', 400, 'b', { size: 100, color: AMBER });
      },
    },
    {
      say: '{a}Tôi ngẩng lên. Ánh nến hắt bóng chúng tôi lên bức tường phía sau. {b}Bốn đứa ngồi quanh bàn. {c}Tôi đếm được năm cái bóng.',
      sfx: [['heartbeat', 'c', 0.5]],
      draw(k) {
        vframe(k, 960, () => cls(k, { fifth: k.at('c', 1.2), faces: { nam: after(k, 'c') ? 'shock' : 'fear' } }), { s: 1.4, y0: 120 });
        vline(k, '5 CÁI BÓNG', 300, 'c', { size: 110, color: COLD });
      },
    },
    {
      say: '{a}Thằng Hải sợ quá, hỏi đúng câu bị cấm: bao giờ thì đến lượt đứa tiếp theo? {b}Đồng xu lao về phía hàng số. Một. Năm. Bảy. {c}Rồi ngọn nến phụt tắt.',
      sfx: [['stinger', 'b', 0.35], ['wind', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) { vframe(k, 960, () => brd(k, '157', k.cue('b', 0.3), 0.7, 'N')); vline(k, '1 · 5 · 7', 300, k.cue('b', 1), { size: 110, color: AMBER }); return; }
        vframe(k, 960, () => cls(k, { candle: Math.max(0, 1 - (k.t - k.cue('c')) / 0.4) })); vline(k, 'NẾN TẮT.', 300, 'c', { size: 110, color: COLD });
      },
    },
    {
      say: '{a}Lúc điện có lại, trên nền gạch có một hàng dấu chân trần, nhỏ, ướt sũng, đi vào từ cửa sổ. {b}Phòng học ấy ở tầng ba. {c}Đến giờ, tôi vẫn không dám kể với ai rằng hôm ấy…',
      sfx: [['drip', 'a', 0.35]],
      draw(k) {
        vframe(k, 1300, () => cls(k, { power: 1, open: 1, candle: 0, kids: false, prints: k.at('a', 4, 'linear') }));
        vline(k, 'PHÒNG Ở TẦNG BA', 300, 'b', { size: 88, color: AMBER });
      },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
