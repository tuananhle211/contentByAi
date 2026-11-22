// Nhân Gian Chưa Kể · Short 1 của tập 100 (Ma Xó). Không lộ cú lật (người em sinh đôi). Câu cuối vòng về câu đầu.
// Khung 1080×1920, nội dung y 150–1300, phụ đề ~1420. Khung đầu = thumbnail. Không cảnh cuối: dùng "Video liên quan" (meta.related).
import { G, PAPER, AMBER, COLD, BA, shade, kitchen, house, vframe, vline } from '/channel/nhan-gian.js';

const xo = (k, o = {}) => { kitchen(k, { fire: 0, bowl: o.bowl ?? true }); if (o.eyes) k.glowEyes(1610, 770, 0.35, '#ffe9a8', { p: o.eyes }); shade(k, o.dark ?? 0.82, [{ x: 1540, y: 860, r: o.r ?? 280, warm: 0.9 }], { vig: 0 }); };
function thumb(k) {
  vframe(k, 1520, () => k.group({ x: 1520, y: 860, s: 1.9 }, () => k.group({ x: -1520, y: -860 }, () => xo(k, { eyes: 0.7, dark: 0.85 }))), { s: 1.15 });
  vline(k, 'MA XÓ', 260, 0, { size: 130, color: AMBER });
  vline(k, 'AI ĂN', 420, 0, { size: 96 });
  vline(k, 'BÁT CƠM NÀY?', 530, 0, { size: 96 });
}

export default {
  meta: {
    title: 'Bữa nào bà cũng để cơm cho một đứa trẻ không ai thấy… #shorts',
    description: 'Bữa nào bà ngoại tôi cũng xới một bát cơm con, đặt vào góc tối sau chum nước. Sáng nào bát cũng sạch trơn, dù nhà chỉ có hai bà cháu.\n\nBản đầy đủ: Ma Xó | Góc Bếp Nhà Bà Ngoại 12 Năm Không Ai Được Quét, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên tín ngưỡng dân gian về ma xó.',
    links: [['▶ Bản đầy đủ: Ma Xó', '100-ma-xo-goc-bep-nha-ba-ngoai']],
    tags: ['ma xó', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'maxo'],
    format: 'short', captions: true,
    gpu: true, // vẽ canvas bằng GPU (Metal) cho nhanh — người dùng yêu cầu 14/11
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '100-ma-xo-goc-bep-nha-ba-ngoai',
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Bữa nào bà ngoại tôi cũng xới một bát cơm con, đặt vào góc tối sau chum nước.', draw(k) { thumb(k); } },
    {
      say: '{a}Sáng nào bát cơm cũng sạch trơn. {b}Mà nhà chỉ có hai bà cháu, và đôi đũa đặt kèm thì ngắn chỉ bằng một nửa đũa thường.',
      sfx: [['stinger', 'b', 0.3]],
      draw(k) {
        vframe(k, 1540, () => k.group({ x: 1540, y: 860, s: 2.6 }, () => k.group({ x: -1540, y: -860 }, () => { kitchen(k, { fire: 0, bowl: { empty: true } }); shade(k, 0.45, [{ x: 1540, y: 860, r: 400 }], { vig: 0 }); })));
        vline(k, 'SẠCH TRƠN', 300, 'a', { color: AMBER });
        vline(k, 'ĐŨA NGẮN BẰNG NỬA', 420, 'b', { size: 64, color: COLD });
      },
    },
    {
      say: '{a}Bà dặn tôi ba điều. {r1}Không được quét góc bếp ấy. {r2}Bữa nào cũng phải để phần cơm trước. {r3}Và đêm nghe gì trong bếp, cũng không được xuống.',
      sfx: [['click', 'r1', 0.2], ['click', 'r2', 0.2], ['click', 'r3', 0.2]],
      draw(k) {
        vframe(k, 960, () => { kitchen(k, { fire: 0.7 }); k.char(900, G, 470, { ...BA, pose: 'point', face: 'calm' }); shade(k, 0.6, [{ x: 520, y: 760, r: 600, warm: 1, flicker: 1 }], { vig: 0 }); });
        [['1. Không quét góc bếp', 'r1'], ['2. Luôn để phần cơm', 'r2'], ['3. Đêm không xuống bếp', 'r3']].forEach(([t, c], i) => vline(k, t, 260 + i * 110, c, { size: 64, color: i === 2 ? AMBER : PAPER }));
      },
    },
    {
      say: '{a}Tôi nghĩ là chuột. {b}Nên tối ấy, tôi rắc một vòng tro thật phẳng quanh bát cơm. {c}Sáng ra, bát vẫn sạch. Vòng tro thì phẳng lì. Không một vết chân.',
      sfx: [['stinger', 'c', 0.35]],
      draw(k) {
        vframe(k, 1540, () => k.group({ x: 1540, y: 880, s: 2.4 }, () => k.group({ x: -1540, y: -880 }, () => {
          kitchen(k, { fire: 0, bowl: { empty: after(k, 'c') } });
          const r = k.at('b', 1.5); if (r > 0) { const { ctx } = k; ctx.save(); ctx.globalAlpha = r; ctx.strokeStyle = '#7d766e'; ctx.lineWidth = 14; ctx.beginPath(); ctx.ellipse(1540, G - 4, 120, 22, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
          shade(k, after(k, 'c') ? 0.45 : 0.75, [{ x: 1540, y: 860, r: 380 }], { vig: 0 });
        })));
        vline(k, 'KHÔNG MỘT VẾT CHÂN', 300, 'c', { color: AMBER, size: 70 });
      },
    },
    {
      say: '{a}Đêm ấy, tôi phá điều thứ ba. Tôi xuống bếp. {b}Từ góc tối sau chum nước, một giọng trẻ con gọi đúng tên tôi: Minh ơi, mai đừng trèo cây vải. {c}Chiều hôm sau, cành vải tôi vẫn ngồi gãy lìa trong cơn giông.',
      sfx: [['heartbeat', 'b', 0.4], ['thunder', 'c', 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) {
          vframe(k, 1450, () => k.group({ x: 1500, y: 800, s: 1.6 }, () => k.group({ x: -1500, y: -800 }, () => xo(k, { eyes: 0.5 * k.at('b', 1), dark: 0.88, r: 220 }))));
          vline(k, '"Minh ơi. Mai đừng trèo cây vải."', 300, 'b', { color: COLD, size: 62 });
          return;
        }
        vframe(k, 600, () => { house(k, { time: 'storm', branch: 'broken' }); k.rain(0, 0, 1920, 1080); shade(k, 0.4, [{ x: 600, y: 300, r: 1200 }], { vig: 0 }); });
        k.flash(k.cue('c', 0.3), 0.4);
        vline(k, 'CÀNH VẢI GÃY LÌA', 300, 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Người làng gọi thứ trong góc bếp ấy là ma xó. {b}Còn bà ngoại tôi, tối hôm ấy, lại lặng lẽ xới thêm một bát cơm con.',
      draw(k) {
        vframe(k, 1450, () => { kitchen(k, { fire: 0.8, bowl: after(k, 'b', 1) ? { full: true } : false }); k.char(k.lerp(1000, 1400, k.at('b', 1.2)), G, 470, { ...BA, pose: 'hold', face: 'sad', walk: k.t > k.cue('b') && k.t < k.cue('b', 1.2) }); shade(k, 0.6, [{ x: 520, y: 760, r: 600, warm: 1, flicker: 1 }, { x: 1540, y: 860, r: 260, warm: 0.6 }], { vig: 0 }); });
        vline(k, 'MA XÓ', 300, 'a', { color: AMBER, size: 120 });
      },
    },
  ],
};
const after = (k, c, off = 0) => k.t > k.cue(c, off);
