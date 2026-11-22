// Nhân Gian Chưa Kể · Short 1 của tập 101 (Ma Da): người rơm thế mạng bị sông trả về, tay cầm mái chèo của bố.
// Không lộ cú lật (bố gỡ tay Lụa, cả làng đứng nhìn). Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { PAPER, AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { BO, THONG, ME, boat, riverWide, torchCrowd, strawman, raft, paddle, sanRoom, SAN, underPier, dinh, MOON } from '/channel/nhan-gian-song.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const black = (k) => { k.ctx.fillStyle = '#05060a'; k.ctx.fillRect(0, 0, k.W, k.H); };
function thumb(k) {
  vframe(k, 1600, () => { sanRoom(k, {}); strawman(k, 1700, SAN.y, 460, { wet: true, blank: true, paddle: true }); shade(k, 0.6, [{ x: 1700, y: 600, r: 500 }], { vig: 0 }); }, { s: 1.15 });
  vline(k, 'MA DA', 260, 0, { size: 130, color: AMBER });
  vline(k, 'SÔNG TRẢ VỀ', 420, 0, { size: 92 });
  vline(k, 'NGƯỜI THẾ MẠNG?', 530, 0, { size: 92 });
}

export default {
  meta: {
    title: 'Thả người rơm thế mạng xuống sông… sáng ra nó đứng ở cửa nhà #shorts',
    description: 'Làng tôi thả một người rơm xuống sông để thế mạng cho bố tôi. Sáng hôm sau, nó đứng ở cửa nhà tôi, tay cầm cái mái chèo bố đánh mất từ năm ngoái.\n\nBản đầy đủ: Ma Da | Mỗi Năm Sông Lấy Đi Đúng Một Người, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên tín ngưỡng dân gian về ma da và tục hình nhân thế mạng.',
    links: [['▶ Bản đầy đủ: Ma Da', '101-ma-da-moi-nam-song-lay-mot-nguoi']],
    tags: ['ma da', 'hình nhân thế mạng', 'truyện ma', 'chuyện tâm linh', 'shorts', 'nhân gian chưa kể'],
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
    { say: '{a}Làng tôi thả một người rơm xuống sông, để thế mạng cho bố tôi.', draw(k) { thumb(k); } },
    {
      say: '{a}Sáng hôm sau, nó đứng dựa vào cửa nhà tôi. Ướt sũng. {b}Và trong tay nó là cái mái chèo bố tôi đánh mất từ năm ngoái.',
      sfx: [['stinger', 'a', 0.35], ['stinger', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 1500, () => { sanRoom(k, { day: true }); strawman(k, 1700, SAN.y, 460, { wet: true, blank: true }); k.char(1250, SAN.y, 440, { ...ME, face: 'shock', pose: 'shout' }); shade(k, 0.35, [SAN.door], { vig: 0 }); }); vline(k, 'ƯỚT SŨNG', 300, 'a', { color: AMBER }); return; }
        black(k); paddle(k, 540, 820, 2, -1.1); shade(k, 0.45, [{ x: 540, y: 820, r: 700, warm: 0.3 }], { vig: 0 });
        vline(k, 'MÁI CHÈO CỦA BỐ', 300, 'b', { color: AMBER });
      },
    },
    {
      say: '{a}Người làng tôi tin, mỗi năm sông lấy đi đúng một người. {b}Năm ấy, đêm nào dưới gầm bến cũng có tiếng con gái gọi: Sáu ơi. {c}Làng tôi chỉ có một người tên Sáu. Là bố tôi.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 960, () => { riverWide(k, { time: 'night', sand: false }); shade(k, 0.6, [{ x: MOON.x, y: MOON.y, r: 1200 }], { vig: 0 }); }); vline(k, 'MỖI NĂM MỘT NGƯỜI', 300, 'a', { color: AMBER, size: 72 }); return; }
        vframe(k, 960, () => { underPier(k); shade(k, 0.65, [{ x: 960 + Math.sin(k.t * 5) * 30, y: 700, r: 380 }], { vig: 0 }); });
        vline(k, '"Sáu ơi…"', 300, 'b', { color: COLD, size: 90 });
        vline(k, 'BỐ TÔI', 1180, 'c', { color: AMBER, size: 90 });
      },
    },
    {
      say: '{a}Thầy cúng bó rơm thành hình người, mặc áo của bố, đội nón của bố, dán tên tuổi bố lên ngực. {b}Đêm ấy, người ta đặt nó lên bè chuối, thắp nến, đẩy ra giữa dòng, cho sông nhận thay bố tôi.',
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 950, () => { dinh(k, { time: 'night', dark: true }); k.char(700, 900, 480, { ...THONG, face: 'calm', pose: 'hold' }); strawman(k, 1100, 900, 440 * Math.max(0.05, k.at('a', 3, 'out')), {}); shade(k, 0.65, [{ x: 950, y: 600, r: 600, warm: 0.8, flicker: 1 }], { vig: 0 }); }); vline(k, 'NGƯỜI THẾ MẠNG', 300, 'a', { color: AMBER }); return; }
        const p = k.at('b', 6, 'linear'), s = 1 - 0.8 * p, rx = k.lerp(900, 1400, p), ry = k.lerp(820, 580, p);
        vframe(k, k.lerp(950, 1300, p), () => { riverWide(k, { time: 'night' }); strawman(k, rx, ry - 10 * s, 300 * s, {}); raft(k, rx, ry, s, 1); const L = torchCrowd(k, 300, 900, 960, 5, { h: 300 }); shade(k, 0.7, [{ x: MOON.x, y: MOON.y, r: 1200 }, ...L, { x: rx, y: ry - 40, r: 160 * s + 40, warm: 0.8 }], { vig: 0 }); });
      },
    },
    {
      say: '{a}Sáng ra, tờ giấy ghi tên bố trên ngực nó đã bị nước xoá trắng. {b}Còn cái mái chèo sơn xanh, khắc con cá trên cán, bố đã đánh rơi đúng đêm rằm năm ngoái. {c}Cái đêm có một cô gái chết đuối, ngay cạnh thuyền nhà tôi.',
      sfx: [['stinger', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) { vframe(k, 1650, () => k.group({ x: 1700, y: 560, s: 1.5 }, () => k.group({ x: -1700, y: -560 }, () => { sanRoom(k, { day: true }); strawman(k, 1700, SAN.y, 460, { wet: true, blank: true, paddle: after(k, 'b') }); shade(k, 0.4, [SAN.door], { vig: 0 }); }))); vline(k, 'TÊN BỐ BỊ XOÁ TRẮNG', 300, 'a', { color: AMBER, size: 70 }); return; }
        vframe(k, 900, () => { riverWide(k, { time: 'night', sand: false }); boat(k, 1150, 660, 1.1, { color: '#3f7a6a' }); boat(k, 700, 700, 0.9, { capsized: true }); shade(k, 0.65, [{ x: MOON.x, y: MOON.y, r: 1200 }, { x: 900, y: 650, r: 500 }], { vig: 0 }); });
        vline(k, 'RẰM THÁNG BẢY NĂM NGOÁI', 300, 'c', { color: COLD, size: 66 });
      },
    },
    {
      say: '{a}Bố tôi ngồi sụp xuống. {b}Sông không nhận người thế mạng. Sông muốn chính bố tôi. Vậy mà đêm trước đó, cả làng tôi vẫn còn tin rằng…',
      draw(k) {
        vframe(k, 1300, () => { sanRoom(k, { day: true }); strawman(k, 1700, SAN.y, 460, { wet: true, blank: true, paddle: true }); k.group({ x: 1200, y: SAN.y }, () => k.char(0, 0, 330, { ...BO, face: 'shock', pose: 'facepalm' })); shade(k, 0.4, [SAN.door], { vig: 0 }); });
        vline(k, 'SÔNG MUỐN CHÍNH BỐ TÔI', 300, 'b', { color: AMBER, size: 68 });
      },
    },
  ],
};
