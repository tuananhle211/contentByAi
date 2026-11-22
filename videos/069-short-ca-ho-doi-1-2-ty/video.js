// Shorts kênh Nếu Bạn Là — cắt từ "…Lúc App Sập (Phần 2)" (065): cả họ kéo đến đòi tiền.
// Truyện hư cấu; vụ app "AI bán hàng" đa cấp: VTV 30/10, Dân trí 26/10/2026 (khi sập: lệnh rút "đang xử lý", nhóm Zalo giải tán).
import { fullVideoScene } from '/engine/templates.js';
import { G, TOAN, LUU, BAY, HAI, HO, spk, pop, phone, zena, living, mam, feast, moto, houseGate, vert, vbg, vcap, hud, tRays, tSticker, tBig } from '/channel/neu-ban-la.js';

const S = 520;
const HO_C = ['#3d7fc1', '#f29bb8', '#6bb56b', '#8a8f98', '#e8b84a', '#8a6a4f'];
const ho = (i, o = {}) => ({ ...HO(HO_C[i % 6], { hair: ['short', 'bun', 'spiky', 'bald', 'perm', 'short'][i % 6], body: [1, 4].includes(i % 6) ? 'chibiGirl' : 'chibi' }), face: 'angry', vein: true, pose: i % 2 ? 'shout' : 'point', shadow: false, ...o });

export default {
  meta: {
    title: 'Kéo cả họ vào app… app sập thì sao? 😱 #shorts',
    description: 'Chú Toàn kéo 32 người họ hàng vào một app AI kiếm tiền, cả họ nạp hơn 1,2 tỷ. Rồi app sập. Sáng hôm sau, cả họ trải chiếu trước cổng nhà chú. Truyện hư cấu dựa trên các vụ app "AI bán hàng" đa cấp được báo chí đưa tin năm 2026. Xem bản đầy đủ trên kênh Nếu Bạn Là!',
    links: [['▶ Bản đầy đủ', '065-neu-ban-keo-ca-ho-vao-app-ai-p2']],
    tags: ['app sập', 'lừa đảo đa cấp', 'họ hàng', 'app AI kiếm tiền', 'shorts', 'nếu bạn là'],
    hashtags: ['shorts', 'luadao', 'dacap'],
    format: 'short', captions: true,
    style: 'clean', tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1.1,
    lead: 0.15, tail: 0.3, pause: 0.12,
    transition: 'cut', sfxTransitions: false, camera: 0.03, sfxVolume: 0.6,
    images: { poster: 'assets/poster.jpg' },
    paper: '#14161d', privacy: 'private',
  },
  thumbnail(k) {
    tRays(k, '#c0262b', '#e0393e', 540, 1000);
    for (let i = 0; i < 4; i++) k.char(130 + i * 280, 1700, 560, { ...ho(i), alpha: 0.75 });
    tSticker(k, () => k.char(540, 1950, 1250, { ...TOAN, hat: null, face: 'shock', sweat: true, tears: 0.5, pose: 'shrug', shadow: false }), 16);
    const { ctx } = k; ctx.strokeStyle = '#1b1f26'; ctx.lineWidth = 30; for (const x of [80, 190, 890, 1000]) { ctx.beginPath(); ctx.moveTo(x, 620); ctx.lineTo(x, 1920); ctx.stroke(); }
    tSticker(k, () => k.char(170, 1880, 600, ho(2, { pose: 'fight' })), 12);
    tSticker(k, () => k.char(910, 1880, 600, ho(4)), 12);
    tBig(k, 'KÉO CẢ HỌ VÀO APP', 540, 200, 92, '#ffffff', { r: -0.04 });
    tBig(k, 'APP SẬP…', 540, 340, 110, '#ffffff', { r: -0.04 });
    tBig(k, 'CẢ HỌ ĐÒI 1,2 TỶ?!', 540, 490, 98, '#ffe066', { box: '#14161d', r: -0.04 });
  },
  scenes: [
    {
      say: 'Bạn kéo cả họ vào một cái app kiếm tiền. Cả họ nạp hơn một tỷ hai. {crash}Rồi app sập. {q}Sáng hôm sau, chuyện gì xảy ra?',
      sfx: [['cash', 0.3, 0.4], ['boom', 'crash', 0.6], ['boing', 'q', 0.4]],
      draw(k) {
        vbg(k, { hud: { ho: [0, 1200, 0.3, 1.5], vi: 286, frozen: k.t > k.cue('crash') } });
        phone(k, 540, 820, 1.25, { r: 0.06, screen: k.t > k.cue('crash') ? zena('withdraw', { amt: '286.000.000đ' }) : zena('star') });
        vcap(k, 'SÁNG HÔM SAU?', 'q', { color: '#fff' });
      },
    },
    {
      say: 'Sáu giờ sáng, ba mươi hai người họ hàng đã đứng trước cổng. {mess}Có người mang theo chiếu, nồi cơm, và một cái loa kẹo kéo, vì định ở lâu. {l1}Thằng chó, ra đây!{e1}',
      sfx: [['boom', 0.3, 0.5], ['boing', 'mess', 0.4], ['boom', 'l1', 0.5]],
      draw(k) {
        vbg(k);
        vert(k, 960, () => {
          houseGate(k, { lock: true, mess: k.t > k.cue('mess') });
          for (let i = 0; i < 9; i++) k.char(120 + i * 210, G + 40, S * 0.62, { ...ho(i), talk: i === 4 ? spk(k, 'l1', 'e1') : 0, p: k.at(i * 0.08, 0.3) });
        });
        vcap(k, '32 NGƯỜI TRƯỚC CỔNG', 0.3, { color: '#ff8a7a' });
      },
    },
    {
      say: 'Hội xe ôm dắt mất chiếc Wave kiếm cơm ba mươi năm, để trừ nợ. {ipad}Cái iPad trao thưởng tắt ngúm: táo bị cắn hai miếng, hàng nhái. {wife}Tối đó, vợ quay lưng vào tường.',
      sfx: [['whoosh', 0.3, 0.4], ['boing', 'ipad', 0.4], ['slideDown', 'wife', 0.4]],
      draw(k) {
        vbg(k);
        vert(k, 1100, () => {
          houseGate(k, { lock: true });
          const x = k.lerp(1000, 1700, k.at(0.3, 3, 'in'));
          moto(k, x, G, 1.3, { color: '#3d7fc1' });
          k.char(x - 80, G - 10, S * 0.9, { ...BAY, face: 'smug', pose: 'hold', walk: true });
          k.char(x + 220, G - 10, S * 0.9, { ...HAI, face: 'cold', pose: 'present', walk: true });
          k.char(700, G, S, { ...TOAN, hat: null, face: 'cry', tears: 1, pose: 'wave' });
        });
        vcap(k, k.t > k.cue('wife') ? 'MẤT CẢ VỢ…' : k.t > k.cue('ipad') ? 'IPAD NHÁI!' : 'MẤT XE KIẾM CƠM', k.t > k.cue('wife') ? 'wife' : k.t > k.cue('ipad') ? 'ipad' : 0.3, { color: '#f2c230' });
      },
    },
    {
      say: 'Còn bà mẹ vợ, người bán cả đất hương hoả để nạp, {quiet}không chửi câu nào. {l1}Tao cũng tham. Không phải mình mày.{e1}',
      sfx: [['scratch', 'quiet', 0.3], ['sparkle', 'l1', 0.3]],
      draw(k) {
        vbg(k);
        vert(k, 780, () => {
          feast(k, { grandpa: 'sad' });
          k.char(860, G + 30, S * 1.05, { ...LUU, face: 'sad', tears: 0.4, pose: 'hold', shadow: false, talk: spk(k, 'l1', 'e1'), flip: true });
          k.char(520, G + 30, S, { ...TOAN, face: 'cry', tears: 0.7, pose: 'hold', shadow: false });
          mam(k, 680, G + 90, 1.05, { kids: true });
        });
        vcap(k, '"TAO CŨNG THAM."', 'l1', { color: '#fff' });
      },
    },
    fullVideoScene({
      say: '{full}Và ông Chủ tịch của cái app ấy, đã đi công tác từ lâu rồi. Xem bản đầy đủ trên kênh Nếu Bạn Là nhé.',
      image: 'poster',
      title: 'Nếu Bạn Kéo Cả Họ Vào App AI… Lúc App Sập (Phần 2)',
      channel: 'Nếu Bạn Là',
      tail: 1.2,
    }),
  ],
};
