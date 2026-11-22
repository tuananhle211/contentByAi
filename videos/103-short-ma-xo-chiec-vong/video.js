// Nhân Gian Chưa Kể · Short 2 của tập 100 (Ma Xó): chiếc vòng bạc dưới viên gạch. Không lộ cú lật (sinh đôi). Câu cuối vòng về câu đầu.
import { G, PAPER, AMBER, COLD, BA, MINH, shade, kitchen, anklet, urn, vframe, vline } from '/channel/nhan-gian.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const black = (k) => { k.ctx.fillStyle = '#05060a'; k.ctx.fillRect(0, 0, k.W, k.H); };
function thumb(k) {
  black(k);
  anklet(k, 420, 860, 230, 'MINH · 14.3.1983', { size: 34 });
  anklet(k, 680, 1080, 230, 'ÚT · 14.3.1983', { tarnish: 1, size: 34, rot: 0.15 });
  shade(k, 0.45, [{ x: 540, y: 960, r: 800, warm: 0.4 }], { vig: 0 });
  vline(k, 'MA XÓ', 260, 0, { size: 130, color: AMBER });
  vline(k, 'HAI CHIẾC VÒNG', 420, 0, { size: 92 });
  vline(k, 'CÙNG NGÀY SINH?', 530, 0, { size: 92 });
}

export default {
  meta: {
    title: 'Chiếc vòng bạc dưới góc bếp khắc đúng ngày sinh của tôi… #shorts',
    description: 'Dưới một viên gạch lỏng trong bếp nhà bà ngoại, tôi tìm thấy một chiếc vòng bạc trẻ con. Trên đó khắc đúng ngày sinh của tôi, nhưng không phải tên tôi.\n\nBản đầy đủ: Ma Xó | Góc Bếp Nhà Bà Ngoại 12 Năm Không Ai Được Quét, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên tín ngưỡng dân gian về ma xó.',
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
    { say: '{a}Dưới một viên gạch lỏng trong bếp nhà bà ngoại, tôi tìm thấy một chiếc vòng bạc trẻ con.', draw(k) { thumb(k); } },
    {
      say: '{a}Trên đó khắc đúng ngày sinh của tôi. {b}Nhưng cái tên khắc trên đó, không phải tên tôi.',
      sfx: [['stinger', 'b', 0.4]],
      draw(k) {
        black(k);
        anklet(k, 540, 820, 300, after(k, 'b') ? 'ÚT · 14.3.1983' : '14.3.1983', { tarnish: 1, size: 48, p: 1 });
        shade(k, 0.45, [{ x: 540, y: 820, r: 700 }], { vig: 0 });
        vline(k, 'KHÔNG PHẢI TÊN TÔI', 300, 'b', { color: AMBER, size: 72 });
      },
    },
    {
      say: '{a}Góc bếp ấy, mười hai năm không ai được quét. {b}Bữa nào bà cũng đặt vào đó một bát cơm con, rồi gọi khẽ một cái tên: cái Út. {c}Nhà bà không có ai tên Út.',
      draw(k) {
        vframe(k, 1450, () => { kitchen(k, { fire: 0.7 }); k.char(k.t > k.cue('b') ? 1400 : 1000, G, 470, { ...BA, pose: 'hold', face: 'calm' }); shade(k, 0.6, [{ x: 520, y: 760, r: 600, warm: 1, flicker: 1 }, { x: 1540, y: 860, r: 260 }], { vig: 0 }); });
        vline(k, '12 NĂM KHÔNG AI QUÉT', 300, 'a', { color: AMBER, size: 70 });
        vline(k, '"Cho cái Út."', 1180, 'b', { color: COLD, size: 70 });
      },
    },
    {
      say: '{a}Một buổi trưa bà ra đồi chè, tôi lấy que tre chọc vào lớp tro. {b}Một viên gạch bật lên. Bên dưới là một cái hũ sành, miệng buộc vải đỏ.',
      sfx: [['creak', 'b', 0.35]],
      draw(k) {
        vframe(k, 1600, () => k.group({ x: 1640, y: 860, s: 2.4 }, () => k.group({ x: -1640, y: -860 }, () => {
          kitchen(k, { fire: 0, ash: 0.6, brick: k.at('b', 0.8), urn: after(k, 'b', 0.8) });
          if (k.t < k.cue('b')) { const { ctx } = k; ctx.strokeStyle = '#c9a35a'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1450, G - 200); ctx.lineTo(1640 + Math.sin(k.t * 6) * 10, G - 20); ctx.stroke(); }
          shade(k, 0.45, [{ x: 1640, y: 860, r: 400 }], { vig: 0 });
        })));
        vline(k, 'HŨ SÀNH DƯỚI VIÊN GẠCH', 300, 'b', { color: AMBER, size: 66 });
      },
    },
    {
      say: '{a}Trong hũ có một mảnh tã trẻ con, gói một chiếc vòng chân bạc đã xỉn đen. {b}Mặt trong khắc: Út, mười bốn tháng Ba năm tám mươi ba. {c}Cùng ngày, cùng tháng, cùng năm với tôi.',
      sfx: [['heartbeat', 'c', 0.45]],
      draw(k) {
        black(k);
        if (after(k, 'c')) { anklet(k, 420, 760, 220, 'MINH · 14.3.1983', { size: 32 }); anklet(k, 680, 1040, 220, 'ÚT · 14.3.1983', { tarnish: 1, size: 32, rot: 0.15 }); }
        else anklet(k, 540, 820, 280, after(k, 'b') ? 'ÚT · 14.3.1983' : '', { tarnish: 1, size: 44, p: k.at('b', 1.2, 'linear') });
        shade(k, 0.45, [{ x: 540, y: 880, r: 760, warm: 0.3 }], { vig: 0 });
        vline(k, 'CÙNG NGÀY SINH', 300, 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Bà đứng ở cửa bếp từ lúc nào. Lần đầu tiên trong đời, bà đánh tôi, rồi ngồi xuống cạnh chum nước mà khóc. {b}Bà chôn chiếc vòng lại, phủ tro lên, như chưa từng có ai đào. Nhưng tôi đã biết: dưới một viên gạch lỏng trong bếp nhà bà ngoại…',
      draw(k) {
        vframe(k, 1300, () => { kitchen(k, { fire: 0, ash: after(k, 'b') ? 1 : 0.6 }); k.char(after(k, 'a', 3) ? 1350 : 300, G, 470, { ...BA, face: after(k, 'a', 3) ? 'cry' : 'shock', tears: after(k, 'a', 3) ? 1 : 0 }); k.char(1000, G, 330, { ...MINH, face: 'sad', look: 1 }); shade(k, 0.5, [{ x: 0, y: 600, r: 900 }, { x: 1400, y: 800, r: 400 }], { vig: 0 }); });
      },
    },
  ],
};
