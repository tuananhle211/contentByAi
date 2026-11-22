// Nhân Gian Chưa Kể · Short 2 của tập 101 (Ma Da): em gái 6 tuổi nghe "chị" gọi bố dưới gầm nhà, đưa búp bê qua khe sàn.
// Không lộ cú lật. Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { PAPER, AMBER, COLD, shade, cold, vframe, vline } from '/channel/nhan-gian.js';
import { NA, ME, THANG, LUA, sanRoom, SAN, pier, PIER, underPier, doll, MOON } from '/channel/nhan-gian-song.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const lie = (k, x, y, h, o) => k.group({ x, y, r: -Math.PI / 2 }, () => k.char(0, 0, h, o));
function thumb(k) {
  vframe(k, 420, () => { sanRoom(k, {}); lie(k, 600, SAN.y - 30, 260, { ...NA, face: 'calm' }); doll(k, 330, SAN.y + 30, 0.8, { r: 1.2 }); shade(k, 0.7, [{ ...SAN.lamp, r: 420 }], { vig: 0 }); }, { s: 1.3 });
  vline(k, 'MA DA', 260, 0, { size: 130, color: AMBER });
  vline(k, 'EM TÔI NÓI CHUYỆN', 420, 0, { size: 86 });
  vline(k, 'VỚI AI DƯỚI SÀN?', 530, 0, { size: 86 });
}

export default {
  meta: {
    title: 'Em gái 6 tuổi: "Đêm qua có chị gọi bố ở dưới gầm nhà" #shorts',
    description: 'Em gái tôi sáu tuổi, vừa chải tóc búp bê vừa nói: đêm qua có chị gọi bố ở dưới gầm nhà mình. Cái bát trên tay mẹ rơi xuống, vỡ làm đôi.\n\nBản đầy đủ: Ma Da | Mỗi Năm Sông Lấy Đi Đúng Một Người, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên tín ngưỡng dân gian về ma da.',
    links: [['▶ Bản đầy đủ: Ma Da', '101-ma-da-moi-nam-song-lay-mot-nguoi']],
    tags: ['ma da', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'mada'],
    format: 'short', captions: true,
    gpu: true, // vẽ canvas bằng GPU (Metal) cho nhanh — người dùng yêu cầu 14/11
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '101-ma-da-moi-nam-song-lay-mot-nguoi',
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Em gái tôi sáu tuổi, vừa chải tóc búp bê vừa nói: đêm qua có chị gọi bố ở dưới gầm nhà mình.', draw(k) { thumb(k); } },
    {
      say: '{a}Cái bát trên tay mẹ tôi rơi xuống, vỡ làm đôi. {b}Vì cả nhà tôi đều đoán được người đang gọi bố là ai.',
      sfx: [['bonk', 'a', 0.45]],
      draw(k) {
        vframe(k, 760, () => { sanRoom(k, { day: true }); k.char(520, SAN.y, 280, { ...NA, face: 'calm', pose: 'hold' }); doll(k, 560, SAN.y - 120, 1.1); k.char(900, SAN.y, 440, { ...ME, face: 'shock', pose: 'shrug' }); const { ctx } = k; ctx.fillStyle = '#e9e4d8'; ctx.beginPath(); ctx.ellipse(880, SAN.y - 4, 30, 8, 0.2, 0, Math.PI * 2); ctx.ellipse(950, SAN.y - 2, 26, 7, -0.3, 0, Math.PI * 2); ctx.fill(); shade(k, 0.4, [SAN.door, SAN.lamp], { vig: 0 }); });
        vline(k, 'AI ĐANG GỌI BỐ?', 300, 'b', { color: AMBER });
      },
    },
    {
      say: '{a}Nhà tôi là nhà sàn, chân cột cắm xuống sông. {b}Mấy đêm liền, cả xóm nghe dưới gầm bến có tiếng con gái gọi: Sáu ơi. {c}Bố tôi tên Sáu.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 1450, () => { pier(k, { time: 'night', lit: true }); shade(k, 0.6, [{ x: MOON.x, y: MOON.y, r: 1200 }, { x: 1520, y: 500, r: 300 }], { vig: 0 }); }); return; }
        vframe(k, 960, () => { underPier(k); shade(k, 0.65, [{ x: 960 + Math.sin(k.t * 5) * 30, y: 700, r: 380 }], { vig: 0 }); });
        vline(k, '"Sáu ơi…"', 300, 'b', { color: COLD, size: 90 });
      },
    },
    {
      say: '{a}Làng tôi tin, nghe dưới nước gọi tên mình thì không được thưa. Và mỗi năm, sông lấy đi đúng một người. {b}Năm ngoái, người sông lấy là chị Lụa, người hay cõng em tôi ra bến, dạy em hát.',
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 960, () => { pier(k, { time: 'night', boats: false }); shade(k, 0.65, [{ x: MOON.x, y: MOON.y, r: 1200 }], { vig: 0 }); }); vline(k, 'KHÔNG ĐƯỢC THƯA', 300, 'a', { color: AMBER }); return; }
        vframe(k, 780, () => { pier(k, { time: 'dusk', stilt: false, boats: false }); k.char(700, PIER.y - 20, 440, { ...LUA, face: 'happy', pose: 'hold' }); k.char(880, PIER.y - 20, 260, { ...NA, face: 'laugh' }); shade(k, 0.3, [{ x: 800, y: 400, r: 900 }], { vig: 0 }); cold(k, 0.55); });
        vline(k, 'CHỊ LỤA · NĂM NGOÁI', 300, 'b', { color: COLD, size: 72 });
      },
    },
    {
      say: '{a}Nửa đêm, tôi thấy em nằm sấp trong màn, ghé mặt xuống khe sàn, thì thầm với khoảng nước đen bên dưới: chị lạnh à, em cho chị mượn con búp bê này. {b}Sáng ra, con búp bê biến mất.',
      sfx: [['drip', 'a', 0.3], ['stinger', 'b', 0.4]],
      draw(k) {
        vframe(k, 420, () => { sanRoom(k, {}); if (k.t < k.cue('b')) { lie(k, 600, SAN.y - 30, 260, { ...NA, face: 'calm', talk: 0.2 }); doll(k, 330, SAN.y + 30, 0.8, { r: 1.2 }); } else k.char(440, SAN.y, 330, { ...THANG, face: 'shock' }); shade(k, 0.72, [{ ...SAN.lamp, r: 420 }], { vig: 0 }); }, { s: 1.3 });
        vline(k, '"Chị lạnh à?"', 300, 'a', { color: COLD, size: 90 });
        vline(k, 'BÚP BÊ BIẾN MẤT', 420, 'b', { color: AMBER, size: 70 });
      },
    },
    {
      say: '{a}Em tôi không khóc. Em chỉ bảo: chị Lụa cầm rồi. {b}Rồi em lại ngồi chải tóc, và kể với mẹ rằng…',
      draw(k) {
        vframe(k, 800, () => { sanRoom(k, { day: true }); k.char(700, SAN.y, 280, { ...NA, face: 'calm', talk: k.t < k.cue('b') ? 0.25 : 0 }); k.char(950, SAN.y, 330, { ...THANG, face: 'shock', flip: true }); shade(k, 0.4, [SAN.door, SAN.lamp], { vig: 0 }); });
        vline(k, '"Chị Lụa cầm rồi."', 300, 'a', { color: COLD, size: 84 });
      },
    },
  ],
};
