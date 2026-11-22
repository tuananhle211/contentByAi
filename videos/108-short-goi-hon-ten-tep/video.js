// Nhân Gian Chưa Kể · Short 2 của tập 106 (Gọi Hồn): bà đồng nói đúng cái tên "Tép" mà chỉ hai bố con biết.
// Không lộ cú lật (cô Liên mớm, mẹ gửi tiền). Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, PAPER, shade, cold, vframe, vline } from '/channel/nhan-gian.js';
import { BO, HUY, ME, BA_NOI, CHU_THINH, medium, altarRoom, altarLights, lotus, rod, pass, truck } from '/channel/nhan-gian-lang.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const kneel = (k, x, y, h, o) => k.group({ x, y }, () => k.char(0, 0, h * 0.72, o));
function seance(k, o = {}) {
  altarRoom(k, {});
  medium(k, 960, 940, 360, { turn: o.turn ?? 0 });
  kneel(k, 560, 1010, 470, { ...BA_NOI, face: 'cry', tears: 1 });
  kneel(k, 360, 1010, 440, { ...ME, face: 'blank' });
  kneel(k, 1360, 1010, 470, { ...CHU_THINH, face: 'blank', flip: true });
  kneel(k, 1560, 1010, 330, { ...HUY, face: o.huy ?? 'cry', tears: 0.8, flip: true });
  shade(k, 0.72, [...altarLights(1), { x: 1300, y: 760, r: 360, warm: 0.6 }], { vig: 0 });
}
function thumb(k) {
  vframe(k, 900, () => { lotus(k, { time: 'dawn' }); k.char(760, 920, 470, { ...BO, face: 'happy', pose: 'hold' }); k.char(1000, 920, 330, { ...HUY, face: 'happy', pose: 'hold' }); rod(k, 800, 760, 1); rod(k, 1030, 800, 0.8); shade(k, 0.3, [{ x: 900, y: 500, r: 1000 }], { vig: 0 }); }, { s: 1.2 });
  vline(k, 'GỌI HỒN', 260, 0, { size: 130, color: AMBER });
  vline(k, 'SAO BÀ ĐỒNG BIẾT', 420, 0, { size: 82 });
  vline(k, 'CÁI TÊN NÀY?', 530, 0, { size: 82 });
}

export default {
  meta: {
    title: 'Bà đồng gọi đúng cái tên chỉ bố tôi biết… #shorts',
    description: 'Bố tôi gọi tôi là thằng Tép, chỉ khi hai bố con ngồi một mình. Bốn mươi chín ngày sau khi bố mất, bà đồng gọi hồn, và nói đúng cái tên ấy.\n\nBản đầy đủ: Gọi Hồn | Người Về Lại Gọi Vợ Mình Là Chị, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên tục gọi hồn trong dân gian.',
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
    { say: '{a}Bố tôi gọi tôi là thằng Tép, chỉ khi hai bố con ngồi một mình.', draw(k) { thumb(k); } },
    {
      say: '{a}Trước mặt mẹ, trước mặt bà, bố vẫn gọi tôi là Huy. {b}Không ai trên đời biết cái tên Tép. Ngoài bố tôi.',
      draw(k) {
        vframe(k, 900, () => { lotus(k, { time: 'dawn' }); k.char(760, 920, 470, { ...BO, face: 'happy', pose: 'hold' }); k.char(1000, 920, 330, { ...HUY, face: 'happy', pose: 'hold' }); rod(k, 800, 760, 1); shade(k, 0.3, [{ x: 900, y: 500, r: 1000 }], { vig: 0 }); }, { s: 1.2 });
        vline(k, '"THẰNG TÉP"', 300, 'a', { color: AMBER, size: 90 });
        vline(k, 'CHỈ HAI BỐ CON BIẾT', 420, 'b', { color: PAPER, size: 62 });
      },
    },
    {
      say: '{a}Sáng hôm đi chuyến cuối cùng, bố xoa đầu tôi, hẹn mùng Một về, hai bố con đi câu ở đầm sen. {b}Đêm ấy, xe tải của bố lao xuống đèo.',
      sfx: [['thunder', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 900, () => { lotus(k, { time: 'dawn' }); k.char(900, 920, 470, { ...BO, face: 'happy', pose: 'wave' }); k.char(1100, 920, 330, { ...HUY, face: 'happy' }); shade(k, 0.3, [{ x: 900, y: 500, r: 1000 }], { vig: 0 }); }, { s: 1.2 }); vline(k, 'HẸN MÙNG MỘT ĐI CÂU', 300, 'a', { color: AMBER, size: 64 }); return; }
        const p = k.at('b', 3, 'in');
        vframe(k, 1200, () => { pass(k, { rain: true }); k.group({ x: k.lerp(900, 1650, p), y: k.lerp(830, 1200, p * p), r: 0.6 * p }, () => truck(k, 0, 0, 0.7, { lights: p < 0.8 })); shade(k, 0.6, [{ x: k.lerp(1200, 1700, p), y: 800, r: 500 }], { vig: 0 }); });
        k.flash(k.cue('b', 0.3), 0.5);
      },
    },
    {
      say: '{a}Bốn mươi chín ngày sau, bà nội mời bà đồng về gọi hồn. {b}Người về nói đúng giọng bố, ho đúng tiếng ho của bố. Cả nhà khóc như mưa.',
      draw(k) {
        vframe(k, 900, () => seance(k, {}), { s: 1.2 });
        vline(k, 'BỐN MƯƠI CHÍN NGÀY', 300, 'a', { color: AMBER, size: 70 });
      },
    },
    {
      say: '{a}Trước khi bà đồng đổ gục xuống, tấm khăn đỏ quay về phía tôi. Giọng bố nói rất khẽ: {b}Tép ơi. Mùng Một bố không đi câu với con được rồi.',
      sfx: [['heartbeat', 'b', 0.45]],
      draw(k) {
        vframe(k, 1300, () => k.group({ x: 1300, y: 850, s: 1.4 }, () => k.group({ x: -1300, y: -850 }, () => seance(k, { turn: 1, huy: after(k, 'b') ? 'shock' : 'cry' }))));
        cold(k, 0.45);
        vline(k, '"Tép ơi."', 300, 'b', { color: COLD, size: 100 });
      },
    },
    {
      say: '{a}Bà đồng chưa từng gặp bố tôi. {b}Không ai trong nhà biết cái tên ấy. Đến giờ tôi vẫn chỉ biết một người có thể nói ra, vì…',
      draw(k) {
        vframe(k, 900, () => { lotus(k, { time: 'dawn' }); k.char(1000, 920, 330, { ...HUY, face: 'sad', pose: 'hold' }); rod(k, 1030, 800, 0.8); shade(k, 0.4, [{ x: 900, y: 500, r: 1000 }], { vig: 0 }); }, { s: 1.2 });
        vline(k, 'AI ĐÃ NÓI RA?', 300, 'b', { color: AMBER, size: 84 });
      },
    },
  ],
};
