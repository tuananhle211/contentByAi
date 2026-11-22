// Nhân Gian Chưa Kể · Short 2 của tập 136 (Bắc Kim Thang): 38 lồng đèn dưới mái chòi, tên Bé Rằm, mảnh giấy "cho Rằm". Không lộ chuyện nhận nuôi.
// Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { MA, NGOAI, ch, kinh, KINH, cho, nhaLa, longDen, lua, sepia } from '/channel/nhan-gian-kinh.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const dark = (k, c = '#2a2014') => { k.ctx.fillStyle = c; k.ctx.fillRect(0, 0, 1920, 1080); };
function thumb(k) { vframe(k, 960, () => { cho(k, { n: 37, lit: true }); shade(k, 0.45, [{ x: 960, y: 320, r: 1000, warm: 1 }], { vig: 0 }); }, { y0: 520 }); vline(k, '38 CÁI LỒNG ĐÈN,', 280, 0, { size: 92 }); vline(k, 'LÀM CHO AI?', 400, 0, { size: 100, color: AMBER }); }
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Bà già bên kia kinh mất, để lại 38 cái lồng đèn ghi tên một người không ai biết… #shorts',
    description: 'Bà già bên kia kinh mất, để lại ba mươi tám cái lồng đèn trong chòi. Cái nào cũng ghi một năm, từ 1961 đến 1998, và một cái tên không ai trong xóm mang: Bé Rằm.\n\nBản đầy đủ: Bắc Kim Thang | Đám Rước Không Người Dừng Trước Bến Nhà Tôi, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên đồng dao và tục rước đèn Trung thu.',
    links: [['▶ Bản đầy đủ: Bắc Kim Thang', '136-bac-kim-thang-dam-ruoc-khong-nguoi']],
    tags: ['bắc kim thang', 'lồng đèn trung thu', 'bí mật gia đình', 'truyện ma miền tây', 'truyện ma', 'chuyện tâm linh', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'backimthang'],
    format: 'short', captions: true, gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '136-bac-kim-thang-dam-ruoc-khong-nguoi',
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Bà già bên kia kinh mất, để lại ba mươi tám cái lồng đèn trong chòi. {b}Cái nào cũng buộc một mảnh giấy, ghi một năm, từ năm 1961 đến năm 1998.',
      sfx: [['heartbeat', 'b', 0.35]],
      draw(k) { vframe(k, 960, () => { cho(k, { n: 37, dang: true }); shade(k, 0.42, [{ x: 960, y: 420, r: 1000, warm: 1 }], { vig: 0 }); }); vline(k, after(k, 'b') ? '1961 → 1998' : '38 CÁI LỒNG ĐÈN', 300, 'a', { size: 104, color: AMBER }); },
    },
    {
      say: '{a}Và một cái tên không ai trong xóm mang: Bé Rằm. {b}Ngoại tôi, chị ruột của bà, gom hết ra sau chòi, đốt thành tro.',
      sfx: [['stinger', 'a', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 960, () => { dark(k); longDen(k, 900, 480, 2, 'ca', { lit: false, stick: false, tag: 1961 }); }); vline(k, '"BÉ RẰM"', 300, 'a', { size: 110, color: COLD }); return; }
        vframe(k, 960, () => { dark(k, '#140e0a'); lua(k, 960, 980, 2); ch(k, 1300, 1010, 480, { ...NGOAI, view: 'side', flip: true, face: 'blank', arms: 'chest' }); shade(k, 0.5, [{ x: 1000, y: 760, r: 780, warm: 1, flicker: 1 }], { vig: 0 }); }); vline(k, 'ĐỐT THÀNH TRO', 300, 'b', { size: 104, color: AMBER });
      },
    },
    {
      say: '{a}Trong khói, tôi nghe như có tiếng con nít hát, nhỏ xíu: {q}cột qua kèo, là kèo qua cột. {b}Ngoại nói tôi nghe lầm.',
      sfx: [['wind', 'a', 0.3]],
      draw(k) { vframe(k, 960, () => { dark(k, '#140e0a'); lua(k, 960, 1000, 2.2); shade(k, 0.5, [{ x: 960, y: 760, r: 760, warm: 1, flicker: 1 }], { vig: 0 }); }); vline(k, after(k, 'b') ? '"NGHE LẦM"' : '"CỘT QUA KÈO…"', 300, 'a', { size: 100, color: COLD }); },
    },
    {
      say: '{a}Rồi má tôi lục rương, lôi ra cái lồng đèn ông sao bà già ấy cho má năm má lên bảy. {b}Ở đuôi có một mảnh giấy nhỏ, ba mươi năm má chưa từng để ý: {q}cho Rằm.',
      sfx: [['heartbeat', 'q', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 1000, () => { nhaLa(k, { time: 'day' }); ch(k, 960, 960, 440, { ...MA, action: 'kneel', view: 'side', face: 'blank', arms: 'hold' }); longDen(k, 1130, 760, 0.5, 'sao', { lit: false, stick: false, color: '#a86a5a' }); shade(k, 0.2, [{ x: 960, y: 300, r: 1600 }], { vig: 0 }); }); vline(k, 'LỒNG ĐÈN NĂM 7 TUỔI', 300, 'a', { size: 84, color: AMBER }); return; }
        vframe(k, 960, () => { dark(k); longDen(k, 960, 440, 2, 'sao', { lit: false, stick: false, color: '#a86a5a' }); const { ctx } = k; ctx.save(); ctx.translate(960, 820); ctx.fillStyle = '#e2d6b4'; ctx.strokeStyle = '#7a6a52'; ctx.lineWidth = 3; ctx.fillRect(-180, -70, 360, 140); ctx.strokeRect(-180, -70, 360, 140); ctx.fillStyle = 'rgba(42,53,80,0.8)'; ctx.font = 'italic 500 56px "Be Vietnam Pro", Georgia, serif'; ctx.textAlign = 'center'; ctx.fillText('cho Rằm', 0, 18); ctx.restore(); }); vline(k, '"CHO RẰM"', 300, 'q', { size: 110, color: COLD });
      },
    },
    {
      say: '{a}Má tôi sinh đúng đêm rằm tháng Tám. {b}Năm nào vào đêm ấy, ngoại cũng đóng cửa thật sớm, không cho má ra bến coi đám rước.',
      sfx: [['creak', 'b', 0.35]],
      draw(k) { vframe(k, 1000, () => { kinh(k, { time: 'night', moon: true }); shade(k, 0.72, [{ x: 1620, y: 300, r: 900 }], { vig: 0 }); }); vline(k, after(k, 'b') ? 'NGOẠI ĐÓNG CỬA SỚM' : 'SINH ĐÊM RẰM', 300, 'a', { size: 92, color: AMBER }); },
    },
    {
      say: '{a}Ngoại chưa bao giờ nói vì sao. {b}Chỉ biết rằng suốt ba mươi bảy năm, bên kia kinh vẫn có một ngọn đèn chờ, cho đến hôm bà già bên kia kinh mất…',
      sfx: [['wind', 'a', 0.3]],
      draw(k) { vframe(k, KINH.cho, () => { kinh(k, { time: 'night', moon: true, choLit: true }); shade(k, 0.74, [{ x: KINH.cho, y: 360, r: 360, warm: 1 }], { vig: 0 }); }); vline(k, 'MỘT NGỌN ĐÈN CHỜ', 300, 'a', { size: 92, color: COLD }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
