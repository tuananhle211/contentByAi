// Nhân Gian Chưa Kể · Short 1 của tập 142 (Ông Kẹ): luật Ông Kẹ gõ ba tiếng, đêm 1 bà mở cửa "Ông đấy à", mùi thuốc lào.
// Không lộ bệnh phong, không lộ Ông Kẹ là ông. Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline, oil } from '/channel/nhan-gian.js';
import { sanNha, suong, gocDa } from '/channel/nhan-gian-babi.js';
import { BA, TOI, THOM, ch, lie, cua, CUA, go, buong, chan, khoi, sepia } from '/channel/nhan-gian-ke.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const KN = ['k1', 'k2', 'k3'];
const door = (k, times = []) => vframe(k, 960, () => { cua(k); go(k, CUA.knock.x, CUA.knock.y, times); shade(k, 0.72, [{ x: 960, y: 500, r: 720 }], { vig: 0 }); });
const bed = (k, face) => vframe(k, 1080, () => { buong(k, {}, () => { lie(k, 1520, 720, 300, { ...BA, hat: null, face: 'sleep' }); lie(k, 1080, 744, 260, { ...TOI, face }); chan(k, 640, 1600, 762); }); shade(k, 0.8, [{ x: 1000, y: 600, r: 520 }], { vig: 0 }); });
const san = (k, fn) => vframe(k, 900, () => { sanNha(k, { time: 'night', moon: false }); if (fn) fn(); suong(k, 0.55, 760, 320); shade(k, 0.72, [{ x: 960, y: 720, r: 440, warm: 1, flicker: 1 }], { vig: 0 }); });
function thumb(k) { door(k, []); vline(k, 'ÔNG KẸ GÕ CỬA', 280, 0, { size: 92 }); vline(k, 'ĐÚNG BA TIẾNG', 400, 0, { size: 100, color: AMBER }); }
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Bà tôi bảo Ông Kẹ gõ cửa đúng ba tiếng. Đêm ấy, bà ra mở cửa… #shorts',
    description: 'Bà tôi bảo, Ông Kẹ đi bắt con nít bao giờ cũng gõ cửa đúng ba tiếng. Một đêm mùa đông năm 1996, một giờ sáng, nhà tôi nghe ba tiếng gõ. Bà tôi không sợ. Bà ra mở cửa.\n\nBản đầy đủ: Ông Kẹ | Tiếng Gõ Thứ Tư Phát Ra Từ Trong Tủ Nhà Tôi, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên hình tượng Ông Kẹ trong lời doạ trẻ con.',
    links: [['▶ Bản đầy đủ: Ông Kẹ', '142-ong-ke-tieng-go-thu-tu']],
    tags: ['ông kẹ', 'ông kẹ là ai', 'gõ cửa ba tiếng', 'tiếng gõ cửa lúc nửa đêm', 'truyện ma', 'chuyện tâm linh', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'ongke'],
    format: 'short', captions: true, gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '142-ong-ke-tieng-go-thu-tu',
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Bà tôi bảo, Ông Kẹ đi bắt con nít, bao giờ cũng gõ cửa đúng ba tiếng. {b}Đứa nào thưa, ông bỏ vào bao tải.',
      sfx: [['knock', ['a', 3.2], 0.6], ['knock', ['a', 3.8], 0.6], ['knock', ['a', 4.4], 0.6]],
      draw(k) { door(k, [k.cue('a', 3.2), k.cue('a', 3.8), k.cue('a', 4.4)]); vline(k, after(k, 'b') ? 'ĐỨA NÀO THƯA…' : 'ĐÚNG BA TIẾNG', 300, 'a', { size: 100, color: after(k, 'b') ? COLD : AMBER }); },
    },
    {
      say: '{a}Một đêm mùa đông, một giờ sáng, nhà tôi nghe ba tiếng gõ. {k1}Cộc. {k2}Cộc. {k3}Cộc.',
      sfx: [['wind', 'a', 0.3], ['knock', 'k1', 0.8], ['knock', 'k2', 0.8], ['knock', 'k3', 0.8]],
      draw(k) { if (k.t < k.cue('k1', -0.3)) { bed(k, 'fear'); vline(k, '1 GIỜ SÁNG', 300, 'a', { size: 110, color: AMBER }); return; } door(k, KN.map((c) => k.cue(c))); vline(k, 'CỘC. CỘC. CỘC.', 300, 'k1', { size: 110, color: AMBER }); },
    },
    {
      say: '{a}Bà tôi không sợ. Bà châm đèn, ra mở cửa. {b}Ngoài sân không có ai. {c}Vậy mà bà nói rất khẽ, như với người đứng sát bên: {q}Ông đấy à. Ông vào đi, ngoài này lạnh. Rồi bà đứng đó rất lâu, trong sương, tay cầm đèn.',
      sfx: [['creak', 'a', 0.4], ['wind', 'b', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 960, () => { cua(k, { open: k.at('a', 2.5, 'inOut') }); shade(k, 0.66, [{ x: 960, y: 600, r: 900 }], { vig: 0 }); }); vline(k, 'BÀ RA MỞ CỬA', 300, 'a', { size: 100, color: AMBER }); return; }
        san(k, () => { const i = ch(k, 960, 960, 330, { ...BA, hat: null, view: 'side', face: 'calm', arms: 'hold', talk: after(k, 'q') ? 0.4 : 0 }); oil(k, i.hand[0], i.hand[1] + 30, 0.7); });
        vline(k, after(k, 'q') ? '"ÔNG ĐẤY À?"' : 'KHÔNG CÓ AI', 300, 'b', { size: 104, color: COLD });
      },
    },
    {
      say: '{a}Sáng ra, ở bậu cửa có mùi thuốc lào. Mùi của một người vừa rít xong điếu thuốc. {b}Nhà tôi không có đàn ông. Bà tôi không hút thuốc. {c}Bà quét bậu cửa mấy lượt, rồi bảo tôi: Ông Kẹ đấy, bà ra đuổi rồi.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) { vframe(k, 700, () => { sanNha(k, { time: 'dawn' }); khoi(k, 640, 860, 1, 260); shade(k, 0.45, [{ x: 700, y: 600, r: 1000, warm: 1 }], { vig: 0 }); }); vline(k, after(k, 'c') ? '"ÔNG KẸ ĐẤY"' : after(k, 'b') ? 'BÀ KHÔNG HÚT THUỐC' : 'MÙI THUỐC LÀO', 300, 'a', { size: 96, color: after(k, 'b') ? COLD : AMBER }); },
    },
    {
      say: '{a}Bà hàng xóm bảo: Ông Kẹ thì đứa nào chả bị doạ. {b}Nhưng cả làng này, chỉ có bà tôi nói, ông ấy gõ cửa đúng ba tiếng.',
      sfx: [['stinger', 'b', 0.4]],
      draw(k) { vframe(k, 1300, () => { gocDa(k, { time: 'noon' }); ch(k, 1400, 900, 300, { ...THOM, view: 'side', flip: true, action: 'sit', face: after(k, 'b') ? 'blank' : 'happy', arms: 'hold', talk: 0.5 }); ch(k, 1180, 900, 260, { ...TOI, view: 'side', face: 'calm', arms: 'down' }); shade(k, 0.2, [{ x: 960, y: 300, r: 1700 }], { vig: 0 }); }); vline(k, after(k, 'b') ? 'CHỈ BÀ TÔI NÓI THẾ' : 'ÔNG KẸ', 300, 'a', { size: 96, color: after(k, 'b') ? AMBER : AMBER }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
