// Nhân Gian Chưa Kể · Short 2 của tập 133 (Nu Na Nu Nống): cát ướt dưới chăn, mẹ mộng du ra bến sông (sửa 20/11: bỏ bàn chân thứ năm và dấu chân bốn ngón). Không lộ bà Câm, tấm ảnh, lời thú nhận của mẹ.
// Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { benDo, BDO, sanNha } from '/channel/nhan-gian-babi.js';
import { TOI, ME, ch, notRuoi, chanChan, dauChan4, sepia } from '/channel/nhan-gian-nuna.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const night = (k, x, y = 760, r = 620) => shade(k, 0.74, [{ x, y, r }], { vig: 0 });
const bed = (k, five, sand) => vframe(k, 940, () => { chanChan(k, { five, sand }); shade(k, 0.55, [{ x: 940, y: 900, r: 700 }], { vig: 0 }); });
function thumb(k) { vframe(k, BDO.step.x + 60, () => { benDo(k, { time: 'night' }); const m = ch(k, BDO.step.x + 60, 1010, 470, { ...ME, view: 'side', face: 'blank', arms: 'down' }); notRuoi(k, m, 470, { dx: 0.06 }); night(k, BDO.step.x + 60, 760, 600); }, { y0: 520 }); vline(k, 'NỬA ĐÊM MẸ ĐỨNG DƯỚI SÔNG,', 280, 0, { size: 70 }); vline(k, 'MẮT VẪN MỞ TRỪNG TRỪNG', 400, 0, { size: 78, color: AMBER }); }
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Nửa đêm, mẹ tôi đứng dưới bến sông, mắt vẫn mở trừng trừng… #shorts',
    description: 'Nửa đêm tôi tỉnh dậy vì lạnh chân, dưới chăn có một nắm cát ướt của bến sông. Ba đêm sau, mẹ tôi biến mất. Tôi tìm thấy mẹ đứng dưới bến sông, mắt mở trừng trừng, miệng lẩm bẩm: con xin cô.\n\nBản đầy đủ: Nu Na Nu Nống | Năm Đứa Ngồi Chơi, Tôi Đếm Được Mười Một Bàn Chân, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên trò chơi đồng dao dân gian.',
    links: [['▶ Bản đầy đủ: Nu Na Nu Nống', '133-nu-na-nu-nong-ban-chan-thu-muoi-mot']],
    tags: ['nu na nu nống', 'bàn chân bốn ngón', 'mộng du', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'nunanunong'],
    format: 'short', captions: true, gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '133-nu-na-nu-nong-ban-chan-thu-muoi-mot',
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Nửa đêm, tôi tỉnh dậy vì lạnh chân. Chăn bị tốc ra. {b}Dưới đầu ngón chân tôi, lạnh ngắt, là một nắm cát ướt.',
      sfx: [['heartbeat', 'a', 0.35], ['drip', 'b', 0.4]],
      draw(k) { bed(k, 0, after(k, 'b')); vline(k, after(k, 'b') ? 'MỘT NẮM CÁT ƯỚT' : 'LẠNH CHÂN', 300, 'a', { size: 100, color: after(k, 'b') ? COLD : AMBER }); },
    },
    {
      say: '{a}Thứ cát mịn và đen, chỉ có ở bến sông. {b}Chiều hôm ấy, tôi không hề ra bến. Mẹ nhìn nắm cát rất lâu, mặt trắng bệch.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) { bed(k, 0, true); vline(k, after(k, 'b') ? 'TÔI KHÔNG RA BẾN' : 'CÁT BẾN SÔNG', 300, 'a', { size: 96, color: AMBER }); },
    },
    {
      say: '{a}Ba đêm sau, mẹ biến mất. Cửa mở toang. {b}Tôi tìm thấy mẹ đứng dưới bến sông, nước ngập mắt cá, mắt mở trừng trừng.',
      sfx: [['creak', 'a', 0.35], ['wind', 'b', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 1150, () => { sanNha(k, { time: 'night', gateOpen: true }); night(k, 1150, 900, 700); }); vline(k, 'MẸ BIẾN MẤT', 300, 'a', { size: 104, color: AMBER }); return; }
        vframe(k, BDO.step.x + 60, () => { benDo(k, { time: 'night' }); const m = ch(k, BDO.step.x + 60, 1010, 470, { ...ME, view: 'side', face: 'blank', arms: 'down' }); notRuoi(k, m, 470, { dx: 0.06 }); night(k, BDO.step.x + 60, 760, 600); }); vline(k, 'DƯỚI BẾN SÔNG', 300, 'b', { size: 104, color: COLD });
      },
    },
    {
      say: '{a}Trên bãi bùn chỉ có một hàng dấu chân của mẹ, đi thẳng xuống nước, đều và thẳng như người đang tỉnh. {b}Tôi gọi to. Mẹ giật mình, không biết mình ra đây bằng cách nào.',
      sfx: [['heartbeat', 'a', 0.4]],
      draw(k) { vframe(k, BDO.step.x + 60, () => { benDo(k, { time: 'night' }); const m = ch(k, BDO.step.x + 60, 1010, 470, { ...ME, view: 'side', face: after(k, 'b') ? 'fear' : 'blank', arms: 'down' }); notRuoi(k, m, 470, { dx: 0.06 }); night(k, BDO.step.x + 60, 760, 600); }); vline(k, after(k, 'b') ? 'MẸ GIẬT MÌNH' : 'CHỈ CÓ DẤU CHÂN MẸ', 300, 'a', { size: 88, color: after(k, 'b') ? AMBER : COLD }); },
    },
    {
      say: '{a}Mẹ ôm tôi đi về, không nói một lời. {b}Suốt đường về, mẹ cứ lẩm bẩm: {q}con xin cô. Con xin cô.',
      sfx: [['heartbeat', 'q', 0.4]],
      draw(k) { vframe(k, 1100, () => { sanNha(k, { time: 'night', gateOpen: true }); const x = 1500 - k.at('a', 6, 'linear') * 500; const m = ch(k, x, 990, 470, { ...ME, view: 'side', flip: true, action: 'walk', face: 'sad', arms: 'hold', talk: after(k, 'q') ? 0.3 : 0 }); notRuoi(k, m, 470, { dx: -0.06 }); ch(k, x + 140, 995, 330, { ...TOI, view: 'side', flip: true, action: 'walk', face: 'fear', arms: 'down' }); night(k, x, 760, 600); }); vline(k, after(k, 'q') ? '"CON XIN CÔ."' : 'KHÔNG NHỚ GÌ', 300, 'a', { size: 100, color: after(k, 'q') ? AMBER : COLD }); },
    },
    {
      say: '{a}Mẹ bảo, chắc mẹ mộng du. Mẹ tôi chưa bao giờ gọi ai trong làng là cô. {b}Vậy mà từ đấy, đêm nào tôi cũng sợ, lại tỉnh dậy vì lạnh chân…',
      sfx: [['wind', 'a', 0.3]],
      draw(k) { bed(k, 0, false); vline(k, '"CHẮC MẸ MỘNG DU."', 300, 'a', { size: 88, color: COLD }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
