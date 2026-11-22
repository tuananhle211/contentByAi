// Nhân Gian Chưa Kể · Short 1 của tập 106 (Gọi Hồn): hồn về nói đúng chỗ giấu tiền, rồi gọi mẹ tôi là "chị".
// Không lộ cú lật (cô Liên mớm, mẹ gửi tiền). Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { ME, BA_NOI, CHU_THINH, HUY, medium, altarRoom, altarLights } from '/channel/nhan-gian-lang.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const kneel = (k, x, y, h, o) => k.group({ x, y }, () => k.char(0, 0, h * 0.72, o));
function seance(k, o = {}) {
  altarRoom(k, { brick: o.brick ?? 0 });
  medium(k, 960, 940, 360, { turn: o.turn ?? 0, shake: o.shake ?? 0 });
  kneel(k, 560, 1010, 470, { ...BA_NOI, face: o.ba ?? 'sad', tears: o.baT ?? 0 });
  kneel(k, 360, 1010, 440, { ...ME, face: o.me ?? 'blank', tilt: o.meDown ? 0.35 : 0 });
  kneel(k, 1360, 1010, 470, { ...CHU_THINH, face: o.th ?? 'blank', flip: true });
  kneel(k, 1560, 1010, 330, { ...HUY, face: 'shock', flip: true });
  shade(k, 0.7, [...altarLights(1), { x: 960, y: 700, r: 360, warm: 0.6 }], { vig: 0 });
}
function thumb(k) {
  vframe(k, 760, () => seance(k, { turn: -1, meDown: true, me: 'sad' }), { s: 1.2 });
  vline(k, 'GỌI HỒN', 260, 0, { size: 130, color: AMBER });
  vline(k, 'NGƯỜI VỀ GỌI VỢ', 420, 0, { size: 86 });
  vline(k, 'LÀ "CHỊ"?', 530, 0, { size: 86 });
}

export default {
  meta: {
    title: 'Hồn về chỉ đúng chỗ giấu tiền… rồi gọi vợ là "chị" #shorts',
    description: 'Bốn mươi chín ngày sau khi bố tôi mất, bà đồng gọi hồn bố về. Người về chỉ đúng chỗ bố giấu tiền dưới chân bàn thờ. Rồi quay sang mẹ tôi, gọi: chị ơi.\n\nBản đầy đủ: Gọi Hồn | Người Về Lại Gọi Vợ Mình Là Chị, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên tục gọi hồn trong dân gian.',
    links: [['▶ Bản đầy đủ: Gọi Hồn', '106-goi-hon-nguoi-ve-goi-vo-la-chi']],
    tags: ['gọi hồn', 'bà đồng', 'truyện ma', 'chuyện tâm linh', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'goihon'],
    format: 'short', captions: true,
    gpu: true, // vẽ canvas bằng GPU (Metal) cho nhanh — người dùng yêu cầu 14/11
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '106-goi-hon-nguoi-ve-goi-vo-la-chi',
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Bốn mươi chín ngày sau khi bố tôi mất, nhà tôi mời bà đồng về gọi hồn.', draw(k) { thumb(k); } },
    {
      say: '{a}Người về ho đúng tiếng ho của bố. {b}Rồi chỉ đúng chỗ bố giấu tiền: dưới viên gạch thứ ba, chân bàn thờ. Cả nhà không ai biết chỗ ấy.',
      sfx: [['heartbeat', 'a', 0.35], ['creak', 'b', 0.3]],
      draw(k) {
        vframe(k, 900, () => k.group({ x: 900, y: 900, s: after(k, 'b') ? 2 : 1 }, () => k.group({ x: -900, y: -900 }, () => seance(k, { shake: after(k, 'a') && !after(k, 'b') ? 1 : 0, brick: k.at('b', 3), th: 'shock' }))));
        vline(k, 'ĐÚNG TIẾNG HO CỦA BỐ', 300, 'a', { color: AMBER, size: 68, });
        if (after(k, 'b')) vline(k, 'VIÊN GẠCH THỨ BA', 420, 'b', { color: COLD, size: 64 });
      },
    },
    {
      say: '{a}Bà nội tôi lạy bà đồng như lạy Phật. {b}Đến chú tôi, người không tin chuyện gọi hồn, cũng đứng chết lặng.',
      draw(k) {
        vframe(k, 760, () => seance(k, { ba: 'cry', baT: 1, th: 'shock' }), { s: 1.2 });
        vline(k, 'CẢ NHÀ KHÓC NHƯ MƯA', 300, 'a', { color: AMBER, size: 66 });
      },
    },
    {
      say: '{a}Rồi tấm khăn đỏ quay về phía mẹ tôi. {b}Giọng bố tôi, chậm và khàn: Chị ơi, em xin lỗi chị.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) {
        vframe(k, 700, () => seance(k, { turn: -1, me: 'blank', ba: 'shock', th: 'shock' }), { s: 1.25 });
        vline(k, '"Chị ơi, em xin lỗi chị."', 300, 'b', { color: COLD, size: 70 });
      },
    },
    {
      say: '{a}Mười lăm năm lấy nhau, bố tôi chưa bao giờ gọi mẹ là chị. {b}Cả nhà ngẩng lên nhìn nhau. Chỉ có mẹ tôi là cúi đầu xuống thấp hơn.',
      draw(k) {
        vframe(k, 400, () => k.group({ x: 400, y: 900, s: after(k, 'b') ? 1.7 : 1.2 }, () => k.group({ x: -400, y: -900 }, () => seance(k, { turn: -1, meDown: after(k, 'b'), me: after(k, 'b') ? 'sad' : 'blank', ba: 'shock', th: 'shock' }))));
        vline(k, 'CHƯA BAO GIỜ LÀ "CHỊ"', 300, 'a', { color: AMBER, size: 66 });
        if (after(k, 'b')) vline(k, 'TRỪ MẸ TÔI', 420, 'b', { color: COLD, size: 66 });
      },
    },
    {
      say: '{a}Người ấy còn dặn thêm một câu: lo cho thằng bé ở Ba Lăng. {b}Cả nhà tôi không ai biết thằng bé nào. Trừ mẹ tôi. Mà mọi chuyện bắt đầu từ cái ngày…',
      sfx: [['stinger', 'b', 0.35]],
      draw(k) {
        vframe(k, 760, () => seance(k, { turn: -0.5, meDown: true, me: 'sad', ba: 'shock', th: 'angry' }), { s: 1.2 });
        vline(k, '"…thằng bé ở Ba Lăng."', 300, 'a', { color: COLD, size: 68 });
        vline(k, 'THẰNG BÉ NÀO?', 420, 'b', { color: AMBER, size: 72 });
      },
    },
  ],
};
