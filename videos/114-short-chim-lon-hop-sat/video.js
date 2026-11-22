// Nhân Gian Chưa Kể · Short 2 của tập 112 (Chim Lợn): cái hộp sắt "đừng mở". Không lộ nội dung hộp / chuyện bốn mươi năm.
// Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { PAPER, AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { filmGrade } from '/channel/nhan-gian-hd.js';
import { xom, xomProps, XOM, chimLon, bedroom, ch, zoom, tin, sitting, lampLight, ONG, HAI, TU, TU_AO } from '/channel/nhan-gian-hd-xom.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const MOON = { x: 1560, y: 170, r: 900 };
function thumb(k) {
  vframe(k, 950, () => zoom(k, 950, 760, 1.8, () => { xom(k, { time: 'dusk' }); ch(k, 1120, 930, 420, { ...TU, face: 'calm', pose: 'hold', flip: true }); ch(k, 780, 950, 320, { ...HAI, face: 'shock', pose: 'hold' }); tin(k, 930, 760, 1.3); shade(k, 0.5, [{ x: 950, y: 760, r: 400, warm: 0.6 }], { vig: 0 }); }));
  vline(k, 'CHIM LỢN', 260, 0, { size: 130, color: AMBER });
  vline(k, 'CÁI HỘP SẮT', 410, 0, { size: 92 });
  vline(k, '"ĐỪNG MỞ"', 520, 0, { size: 92, color: COLD });
}
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); filmGrade(k, 'day', 0.05); } });

const video = {
  meta: {
    title: 'Ông già bên kia rào đưa tôi một cái hộp sắt: "Đừng mở"… #shorts',
    description: 'Ông già bên kia bờ rào bốn mươi năm không nói với nhà tôi một câu. Đúng đêm chim lợn kêu lần thứ hai trên mái nhà tôi, ông đưa tôi một cái hộp sắt và dặn: đừng mở.\n\nBản đầy đủ: Chim Lợn | Ba Đêm Kêu Trên Mái Nhà Tôi, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên tín ngưỡng dân gian về chim lợn.',
    links: [['▶ Bản đầy đủ: Chim Lợn', '112-chim-lon-ba-dem-keu-tren-mai-nha']],
    tags: ['chim lợn', 'chim lợn kêu', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'chimlon'],
    format: 'short', captions: true,
    gpu: true, // vẽ canvas bằng GPU (Metal) — người dùng yêu cầu 14/11
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '112-chim-lon-ba-dem-keu-tren-mai-nha',
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Ông già bên kia bờ rào, bốn mươi năm không nói với nhà tôi một câu. {b}Hôm ấy, ông đưa qua rào cho tôi một cái hộp sắt.', draw(k) { thumb(k); } },
    {
      say: '{a}Ông dặn: lúc nào ông mày ăn được bát cháo đầu tiên, thì đưa cho ông mày. {b}Đừng mở.',
      sfx: [['stinger', 'b', 0.4]],
      draw(k) {
        vframe(k, 1000, () => zoom(k, 1000, 640, 2.2, () => { xom(k, { time: 'dusk' }); ch(k, 1120, 930, 420, { ...TU, face: 'calm', pose: 'hold', flip: true, talk: 0.25 }); shade(k, 0.5, [{ x: 1100, y: 640, r: 400, warm: 0.6 }], { vig: 0 }); }));
        vline(k, '"ĐỪNG MỞ."', 300, 'b', { color: AMBER, size: 110 });
      },
    },
    {
      say: '{a}Ông tôi khi ấy nằm liệt giường. Trên mái nhà tôi, chim lợn đã kêu hai đêm. {b}Tôi hỏi: nếu ông cháu không ăn được thì sao? {c}Ông già cười: ăn được.',
      sfx: [['owl', ['a', 2], 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 700, () => { xom(k, { time: 'night' }); chimLon(k, XOM.ourGable.x, XOM.ourGable.y, 0.7, { glow: 0.6 }); shade(k, 0.74, [{ x: XOM.ourGable.x, y: XOM.ourGable.y - 60, r: 240 }, MOON], { vig: 0 }); }); vline(k, 'HAI ĐÊM CHIM LỢN KÊU', 300, 'a', { color: COLD, size: 72 }); return; }
        vframe(k, 1000, () => zoom(k, 1000, 640, 2, () => { xom(k, { time: 'dusk' }); ch(k, 1120, 930, 420, { ...TU, face: after(k, 'c') ? 'happy' : 'calm', pose: 'hold', flip: true }); ch(k, 780, 950, 320, { ...HAI, face: 'sad', talk: after(k, 'c') ? 0 : 0.2 }); shade(k, 0.5, [{ x: 1000, y: 640, r: 420, warm: 0.6 }], { vig: 0 }); }));
        vline(k, '"ĂN ĐƯỢC."', 300, 'c', { color: AMBER, size: 110 });
      },
    },
    {
      say: '{a}Đêm thứ ba, tôi lén ra bờ rào. Ông ngồi trên ghế mây, áo trắng, hai chén rượu rót đầy. {b}Ông phẩy tay bảo tôi về. {c}Rồi ngọn đèn tắt. Không có gió.',
      sfx: [['click', 'c', 0.3], ['stinger', 'c', 0.45]],
      draw(k) {
        vframe(k, 1300, () => zoom(k, 1300, 720, 1.5, () => { xom(k, { time: 'night' }); xomProps(k, { lamp: after(k, 'c') ? 0 : 1, sitter: { ...TU_AO, face: 'calm', flip: true, pose: after(k, 'b') && !after(k, 'c') ? 'wave' : 'stand' }, cups: [true, true] }); shade(k, after(k, 'c') ? 0.88 : 0.72, after(k, 'c') ? [{ x: 1330, y: 700, r: 160 }] : [lampLight(1.2)], { vig: 0 }); }));
        vline(k, 'KHÔNG CÓ GIÓ.', 300, 'c', { color: COLD, size: 96 });
      },
    },
    {
      say: '{a}Sáng ra, ông tôi đòi ăn cháo. {b}Còn ông già bên kia rào, không bao giờ dậy nữa. {c}Hai chén rượu: một chén đầy, một chén cạn.',
      sfx: [['stinger', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 900, () => { bedroom(k, null, 440, { net: false }); sitting(k, 900, 792, 470, { ...ONG, face: 'happy', pose: 'hold' }); shade(k, 0.4, [{ x: 1700, y: 420, r: 1000 }], { vig: 0 }); }); vline(k, 'ÔNG TÔI ĐÒI ĂN CHÁO', 300, 'a', { color: AMBER, size: 76 }); return; }
        vframe(k, 1400, () => zoom(k, 1420, 720, 1.6, () => { xom(k, { time: 'dawn' }); xomProps(k, { lamp: 0, sitter: { ...TU_AO, face: 'calm', flip: true }, cups: [true, false] }); shade(k, 0.45, [{ x: 1400, y: 700, r: 700 }], { vig: 0 }); }));
        vline(k, 'MỘT CHÉN ĐẦY,', 280, 'c', { size: 84 });
        vline(k, 'MỘT CHÉN CẠN.', 390, k.cue('c', 1.5), { color: AMBER, size: 84 });
      },
    },
    {
      say: '{a}Trong hộp có gì, tôi phải đợi ông tôi ăn xong bát cháo mới dám mở. {b}Và người đưa nó cho tôi, là ông già bên kia bờ rào…',
      draw(k) {
        vframe(k, 960, () => { k.ctx.fillStyle = '#05060a'; k.ctx.fillRect(0, 0, 1920, 1080); tin(k, 960, 660, 3.2, 0); shade(k, 0.35, [{ x: 960, y: 560, r: 600, warm: 0.6, flicker: 1 }], { vig: 0 }); });
        vline(k, 'TRONG HỘP CÓ GÌ?', 300, 'a', { color: AMBER, size: 96 });
      },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
