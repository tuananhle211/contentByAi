// Nhân Gian Chưa Kể · Short 2 của tập 121 (Cầu Cơ): "đừng thưa" + chiếc dép vẫn ướt. Không lộ chuyện Quân / ma da.
// Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { PAPER, AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { NAM, BA_NOI, ch, lie, buong, net, benDong, BEN, dep, sepia } from '/channel/nhan-gian-cauco.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const DAY = { x: 1700, y: 300, r: 1500 };
function bed(k, o = {}) {
  buong(k, { time: 'night' });
  lie(k, 720, 740, 330, { ...NAM, top: '#d8d0bc', topStyle: 'tee', face: o.nam ?? 'blank' });
  lie(k, 1190, 740, 360, { ...BA_NOI, hat: null, face: o.ba ?? 'sleep' });
  net(k, 0.2);
  shade(k, 0.86, [{ x: 1450, y: 400, r: 320 }, { x: 900, y: 700, r: 320 }], { vig: 0 });
}
function thumb(k) {
  vframe(k, 1400, () => bed(k, { nam: 'fear' }), { y0: 520 });
  vline(k, 'CÓ AI GỌI TÊN', 280, 0, { size: 92 });
  vline(k, 'NGOÀI CỬA SỔ?', 400, 0, { size: 100, color: AMBER });
}
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Bà tôi dặn: đêm có ai gọi tên ngoài cửa sổ, đừng thưa… #shorts',
    description: 'Bà tôi dặn: đêm nằm, có ai gọi tên ngoài cửa sổ thì đừng thưa. Đêm ấy, ngoài cửa sổ có tiếng gọi tôi bằng cái tên chỉ một người từng gọi, và người ấy đã chết đuối mùa hè năm trước.\n\nBản đầy đủ: Cầu Cơ | Thằng Bạn Chết Đuối Bảo: Có Người Đứng Nhìn, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên tín ngưỡng dân gian.',
    links: [['▶ Bản đầy đủ: Cầu Cơ', '121-cau-co-thang-ban-chet-duoi']],
    tags: ['đừng thưa', 'kiêng kỵ ban đêm', 'cầu cơ', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'kiengky'],
    format: 'short', captions: true, gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '121-cau-co-thang-ban-chet-duoi',
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Bà tôi dặn: đêm nằm, có ai gọi tên ngoài cửa sổ thì đừng thưa. {b}Đêm ấy, ngoài cửa sổ có hai tiếng huýt sáo, rồi một giọng gọi tôi bằng cái tên chỉ một người từng gọi.',
      sfx: [['heartbeat', 'b', 0.4]],
      draw(k) { vframe(k, 960, () => bed(k, { nam: after(k, 'b') ? 'fear' : 'blank' })); vline(k, 'ĐỪNG THƯA', 300, 'a', { size: 120, color: AMBER }); },
    },
    {
      say: '{a}Nam Ròm ơi, ra tắm sông. {b}Người gọi tôi như thế đã chết đuối, mùa hè năm trước.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 1450, () => bed(k, { nam: 'fear' }), { s: 1.6, y0: 150 }); vline(k, '"NAM RÒM ƠI,', 280, 'a', { size: 88, color: COLD }); vline(k, 'RA TẮM SÔNG."', 390, 'a', { size: 88, color: COLD }); return; }
        vframe(k, BEN.swirl.x, () => { benDong(k, { time: 'night', swirl: 1 }); shade(k, 0.6, [{ x: 1500, y: 170, r: 1000 }, { x: BEN.swirl.x, y: BEN.swirl.y, r: 300 }], { vig: 0 }); });
        vline(k, 'NÓ ĐÃ CHẾT ĐUỐI', 300, 'b', { size: 88, color: AMBER });
      },
    },
    {
      say: '{a}Tôi suýt thưa. Bà bịt chặt miệng tôi. Tay bà lạnh, mà run. {b}Sáng ra, dưới cửa sổ có một vũng nước lẫn rong sông. Đêm ấy trời không mưa.',
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 960, () => bed(k, { nam: 'fear', ba: 'fear' }), { s: 1.4, y0: 150 }); vline(k, 'TÔI SUÝT THƯA', 300, 'a', { size: 92, color: AMBER }); return; }
        vframe(k, 1450, () => { buong(k, { time: 'day' }); const { ctx } = k; ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = '#6a7a80'; ctx.beginPath(); ctx.ellipse(1450, 930, 220, 30, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#3a5a3a'; ctx.lineWidth = 5; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(1360 + i * 50, 930); ctx.quadraticCurveTo(1380 + i * 50, 900, 1410 + i * 50, 935); ctx.stroke(); } ctx.restore(); shade(k, 0.3, [DAY], { vig: 0 }); });
        vline(k, 'TRỜI KHÔNG MƯA.', 300, k.cue('b', 3), { size: 92, color: COLD });
      },
    },
    {
      say: '{a}Mấy hôm sau, dưới gốc cây sung ở bến sông, tôi tìm thấy chiếc dép của nó, chiếc mà cả làng mò ba ngày không thấy. {b}Đã hơn một năm. Chiếc dép vẫn ướt.',
      sfx: [['drip', 'b', 0.4]],
      draw(k) {
        vframe(k, 960, () => { k.ctx.fillStyle = '#3a2c20'; k.ctx.fillRect(0, 0, 1920, 1080); dep(k, 960, 560, 3.2, { r: 0.2, wet: after(k, 'b') ? 1 : 0.4 }); shade(k, 0.3, [{ x: 960, y: 560, r: 700, warm: 0.6 }], { vig: 0 }); });
        vline(k, 'VẪN CÒN ƯỚT', 300, 'b', { size: 100, color: AMBER });
      },
    },
    {
      say: '{a}Bà bảo, người chết đuối không đi ngay được, phải đợi có người xuống thế chỗ. {b}Nên họ đứng ngoài cửa sổ, gọi đúng cái tên chỉ họ hay gọi, đợi người ấy thưa.',
      sfx: [['wind', 'a', 0.3]],
      draw(k) { vframe(k, 1450, () => { buong(k, { time: 'night' }); shade(k, 0.86, [{ x: 1450, y: 400, r: 360 }], { vig: 0 }); }, { s: 1.6, y0: 150 }); vline(k, 'ĐỢI NGƯỜI ẤY THƯA', 300, 'b', { size: 84, color: COLD }); },
    },
    {
      say: '{a}Nên đêm nay, nếu ngoài cửa sổ có ai gọi tên bạn, {b}hãy nhớ lời bà tôi dặn…',
      draw(k) { vframe(k, 1450, () => bed(k, { nam: 'blank' }), { s: 1.5, y0: 150 }); vline(k, 'ĐÊM NAY…', 300, 'a', { size: 110, color: COLD }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
