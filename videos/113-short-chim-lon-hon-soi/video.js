// Nhân Gian Chưa Kể · Short 1 của tập 112 (Chim Lợn): hòn sỏi đổi nhà cho con chim. Không lộ lá thư / chuyện bốn mươi năm.
// Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { PAPER, AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { filmGrade } from '/channel/nhan-gian-hd.js';
import { xom, xomProps, XOM, chimLon, bedroom, ch, zoom, slingshot, fireStraw, lampLight, ONG, HAI, BO, TU_AO } from '/channel/nhan-gian-hd-xom.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const black = (k) => { k.ctx.fillStyle = '#05060a'; k.ctx.fillRect(-50, -50, k.W + 100, k.H + 100); };
const MOON = { x: 1560, y: 170, r: 900 };
const flyPath = (k, a, b, p) => ({ x: k.lerp(a.x, b.x, p), y: k.lerp(a.y, b.y, p) - Math.sin(p * Math.PI) * 140 });
function thumb(k) {
  vframe(k, XOM.ourGable.x, () => zoom(k, XOM.ourGable.x, XOM.ourGable.y, 1.9, () => { xom(k, { time: 'night' }); chimLon(k, XOM.ourGable.x, XOM.ourGable.y, 0.8, { glow: 0.9 }); shade(k, 0.6, [{ x: XOM.ourGable.x, y: XOM.ourGable.y - 60, r: 300 }, MOON], { vig: 0 }); }), { y0: 420 });
  vline(k, 'CHIM LỢN', 260, 0, { size: 130, color: AMBER });
  vline(k, 'MỘT HÒN SỎI', 410, 0, { size: 92 });
  vline(k, 'ĐỔI MỘT MẠNG?', 520, 0, { size: 92 });
}
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); filmGrade(k, 'day', 0.05); } });

const video = {
  meta: {
    title: 'Chim lợn kêu trên mái nhà tôi, và tôi đã bắn một hòn sỏi… #shorts',
    description: 'Chim lợn kêu trên mái nhà nào, nhà ấy sắp có tang. Đêm thứ hai, nó đậu ngay trên giường ông nội tôi, và tôi đã làm điều các cụ cấm.\n\nBản đầy đủ: Chim Lợn | Ba Đêm Kêu Trên Mái Nhà Tôi, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên tín ngưỡng dân gian về chim lợn.',
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
    { say: '{a}Chim lợn kêu trên mái nhà nào, nhà ấy sắp có tang. {b}Năm tôi mười hai tuổi, nó đậu ngay trên giường ông nội tôi.', sfx: [['owl', 'b', 0.4]], draw(k) { thumb(k); } },
    {
      say: '{a}Đêm thứ hai, nó kêu ba tiếng. {b}Trong buồng, ông tôi ngừng thở. {c}Bố tôi đốt rơm, khua mâm. Nó vẫn không bay.',
      sfx: [['owl', 'a', 0.5], ['heartbeat', 'b', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, XOM.ourGable.x, () => zoom(k, XOM.ourGable.x, XOM.ourGable.y + 60, 2.2, () => { xom(k, { time: 'night' }); chimLon(k, XOM.ourGable.x, XOM.ourGable.y, 0.8, { glow: 0.6 }); shade(k, 0.7, [{ x: XOM.ourGable.x, y: XOM.ourGable.y - 60, r: 260 }], { vig: 0 }); })); vline(k, 'ÉC… ÉC… ÉC', 300, 'a', { color: COLD }); return; }
        if (k.t < k.cue('c')) { vframe(k, 800, () => { bedroom(k, { ...ONG, face: 'blank', gloom: 0.6 }, 440, { net: false }); shade(k, 0.8, [{ x: 760, y: 700, r: 380 }], { vig: 0 }); }); vline(k, 'ÔNG TÔI NGỪNG THỞ', 300, 'b', { color: AMBER, size: 76 }); return; }
        vframe(k, 600, () => { xom(k, { time: 'night' }); xomProps(k, { lamp: 1 }); chimLon(k, XOM.ourGable.x, XOM.ourGable.y, 0.7, { glow: 0.5 }); ch(k, 520, 960, 460, { ...BO, face: 'shout', pose: 'shout' }); fireStraw(k, 600, 840, 1); shade(k, 0.74, [{ x: 600, y: 700, r: 420, warm: 1, flicker: 1 }, MOON], { vig: 0 }); });
        vline(k, 'NÓ VẪN KHÔNG BAY', 300, 'c', { color: AMBER, size: 76 });
      },
    },
    {
      say: '{a}Các cụ dặn: không ai được ném đá đuổi nó. {b}Ném là nó đổi nhà, mang tang sang nhà người khác.',
      sfx: [['gong', 'a', 0.2]],
      draw(k) {
        black(k);
        vline(k, 'KHÔNG ĐƯỢC NÉM ĐÁ', 640, 'a', { color: AMBER, size: 90 });
        vline(k, 'Ném là nó đổi nhà,', 820, 'b', { size: 70 });
        vline(k, 'mang tang sang nhà khác.', 920, 'b', { size: 70 });
        shade(k, 0.3, [{ x: 540, y: 800, r: 700, warm: 0.4 }], { vig: 0.4 });
      },
    },
    {
      say: '{a}Tôi mười hai tuổi. Tôi lắp một hòn sỏi, kéo căng dây, {b}bắn.',
      sfx: [['whoosh', 'b', 0.45], ['click', ['b', 0.5], 0.5]],
      draw(k) {
        vframe(k, 450, () => {
          xom(k, { time: 'night' }); chimLon(k, XOM.ourGable.x, XOM.ourGable.y, 0.7, { glow: 0.5 });
          ch(k, 260, 960, 330, { ...HAI, face: 'angry', pose: 'point' }); slingshot(k, 360, 780, 1.2, 0.5);
          const sp = k.at('b', 0.5, 'linear'); if (sp > 0 && sp < 1) k.dot(k.lerp(380, 680, sp), k.lerp(740, 340, sp), 7, '#cfc8bc', 1);
          shade(k, 0.72, [{ x: 300, y: 760, r: 260 }, { x: XOM.ourGable.x, y: XOM.ourGable.y - 60, r: 220 }, MOON], { vig: 0 });
        });
        vline(k, 'TÔI BẮN.', 300, 'b', { color: AMBER, size: 110 });
      },
    },
    {
      say: '{a}Con chim bay qua bờ rào, đậu xuống nóc nhà ông già bên cạnh. Kêu ba tiếng, rồi im. {b}Trong buồng, ông tôi thở lại.',
      sfx: [['owl', ['a', 3], 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) {
          vframe(k, 1110, () => {
            xom(k, { time: 'night' }); xomProps(k, { lamp: 1, sitter: { ...TU_AO, face: 'blank', flip: true } });
            const fp = k.at('a', 2.5, 'inOut'), pos = flyPath(k, XOM.ourGable, XOM.tuRoof, fp);
            chimLon(k, pos.x, pos.y, 0.7, { fly: fp > 0 && fp < 1 ? 1 : 0, glow: 0.6 });
            shade(k, 0.72, [lampLight(), { x: pos.x, y: pos.y - 60, r: 220 }, MOON], { vig: 0 });
          });
          vline(k, 'NÓ ĐỔI NHÀ', 300, 'a', { color: COLD });
          return;
        }
        vframe(k, 800, () => { bedroom(k, { ...ONG, face: 'calm' }, 440, { net: false }); shade(k, 0.78, [{ x: 760, y: 700, r: 380 }], { vig: 0 }); });
        vline(k, 'ÔNG TÔI THỞ LẠI', 300, 'b', { color: AMBER, size: 84 });
      },
    },
    {
      say: '{a}Sáng hôm sau, ông già bên kia rào ngồi chết trên ghế mây. Trước mặt ông có hai chén rượu: một chén đầy, một chén cạn. {b}Tôi chưa bao giờ dám kể với ai. Vì ở làng tôi, ai cũng biết…',
      sfx: [['stinger', ['a', 4], 0.4]],
      draw(k) {
        vframe(k, 1400, () => zoom(k, 1400, 700, 1.6, () => { xom(k, { time: 'dawn' }); xomProps(k, { lamp: 0, sitter: { ...TU_AO, face: 'calm', flip: true }, cups: [true, false] }); shade(k, 0.45, [{ x: 1400, y: 700, r: 700 }], { vig: 0 }); }));
        vline(k, 'MỘT CHÉN ĐẦY,', 280, k.cue('a', 4), { size: 84 });
        vline(k, 'MỘT CHÉN CẠN.', 390, k.cue('a', 5), { color: AMBER, size: 84 });
      },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
