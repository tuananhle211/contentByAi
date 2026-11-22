// Shorts kênh Nếu Bạn Là — cắt từ "Nếu Bạn Kéo Cả Họ Vào App AI Kiếm Tiền… (Phần 1)" (064): chuyện mẹ vợ.
// Truyện hư cấu; thủ đoạn theo tập 064 (gói Matrix 418,9 triệu, 7 cấp sao — VTV 30/10, Dân trí 26/10/2026).
import { fullVideoScene } from '/engine/templates.js';
import { soDo } from '/channel/drama.js';
import { G, TOAN, LUU, spk, pop, phone, zena, mam, feast, vert, vbg, vcap, confetti, counter, tRays, tSticker, tBig, tCircle, chickenLeg } from '/channel/neu-ban-la.js';

const S = 520;

export default {
  meta: {
    title: 'Mẹ vợ khinh thằng xe ôm… cho tới khi 😳 #shorts',
    description: 'Mười tám năm, mẹ vợ chỉ gọi chú Toàn là "thằng xe ôm". Rồi chú cài một cái app AI, và bà bán luôn mảnh đất hương hoả để nạp tiền. Truyện hư cấu dựa trên các vụ app "AI bán hàng" đa cấp được báo chí đưa tin năm 2026. Xem bản đầy đủ trên kênh Nếu Bạn Là!',
    links: [['▶ Bản đầy đủ', '064-neu-ban-keo-ca-ho-vao-app-ai-p1']],
    tags: ['mẹ vợ', 'con rể', 'app AI kiếm tiền', 'lừa đảo đa cấp', 'shorts', 'nếu bạn là'],
    hashtags: ['shorts', 'mevo', 'luadao'],
    format: 'short', captions: true,
    style: 'clean', tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1.1,
    lead: 0.15, tail: 0.3, pause: 0.12,
    transition: 'cut', sfxTransitions: false, camera: 0.03,
    images: { poster: 'assets/poster.jpg' },
    sfxVolume: 0.6,
    paper: '#14161d', privacy: 'private',
  },
  // Thumbnail dọc: mẹ vợ cười tươi gắp đùi gà cho chú Toàn rơm rớm, nách kẹp sổ đỏ khoanh đỏ.
  thumbnail(k) {
    tRays(k, '#c0262b', '#e0393e', 540, 1000);
    tSticker(k, () => k.char(640, 2050, 1500, { ...LUU, face: 'laugh', pose: { l: [40, -60], r: [100, -30] }, shadow: false }), 16);
    tSticker(k, () => chickenLeg(k, 175, 1100, 1.35, -0.25), 12);
    tSticker(k, () => soDo(k, 860, 1420, 1.1, 0.25), 12);
    tCircle(k, 860, 1420, 190, 140);
    tSticker(k, () => k.char(250, 1960, 820, { ...TOAN, face: 'cry', tears: 1, pose: 'cheer', shadow: false }), 12);
    tBig(k, 'MẸ VỢ KHINH', 540, 190, 110, '#ffffff', { r: -0.04 });
    tBig(k, 'THẰNG XE ÔM', 540, 330, 110, '#ffffff', { r: -0.04 });
    tBig(k, '…CHO TỚI KHI?!', 540, 480, 112, '#ffe066', { box: '#14161d', r: -0.04 });
  },
  scenes: [
    {
      say: 'Mười tám năm, mẹ vợ chỉ gọi bạn là thằng xe ôm. {q}Muốn bà gắp cho một cái đùi gà, bạn sẽ làm gì? {l1}Lấy thằng xe ôm thì cả đời ngồi sau.{e1}',
      sfx: [['boing', 'q', 0.4]],
      draw(k) {
        vbg(k);
        vert(k, 900, () => {
          feast(k);
          k.char(1250, G - 30, S * 1.05, { ...LUU, face: 'cold', pose: 'hips', talk: spk(k, 'l1', 'e1') });
          mam(k, 1250, G + 70, 1.1);
          k.char(620, G + 30, S, { ...TOAN, face: k.t > k.cue('l1') ? 'sad' : 'blank', pose: 'hold', shadow: false });
          mam(k, 620, G + 90, 1, { kids: true });
        });
        k.bubble(120, 260, 840, 130, 760, 470, { p: k.at('l1', 0.4), text: 'Lấy thằng xe ôm thì cả đời ngồi sau!', size: 42 });
        vcap(k, 'MÂM TRẺ CON', 0.3, { color: '#fff' });
      },
    },
    {
      say: 'Chú Toàn chọn cách: cài app AI. {money}Kiếm được tiền, chú đặt điện thoại lên bàn, mở lịch sử rút tiền cho bà xem. {scroll}Cuộn mãi không hết. {quiet}Lần đầu tiên, bà im lặng.',
      sfx: [['ding', 0.4, 0.4], ['cash', 'money', 0.4], ['click', 'scroll', 0.4], ['scratch', 'quiet', 0.3]],
      draw(k) {
        vbg(k);
        vert(k, 960, () => {
          feast(k);
          k.char(1250, G, S * 1.05, { ...LUU, face: k.t > k.cue('quiet') ? 'shock' : 'cold', pose: 'hold', lookY: k.t > k.cue('scroll') ? 1 : 0 });
          k.char(660, G, S, { ...TOAN, face: 'smug', pose: 'present' });
        });
        phone(k, 540, 900, 0.95, { p: k.at('money', 0.4), r: -0.08, screen: (kk, w, h) => { kk.ctx.fillStyle = '#fff'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); const off = (Math.max(0, kk.t - kk.cue('scroll')) * 140) % 60; for (let i = 0; i < 12; i++) kk.text(`Rút +${[200, 900, 900, 1500, 900, 900][i % 6]}.000đ ✓`, 0, -h / 2 + 40 + i * 60 - off, { size: 24, font: 'title', color: '#3fb86a' }); } });
        vcap(k, 'BÀ IM LẶNG…', 'quiet', { color: '#fff' });
      },
    },
    {
      say: 'Một tuần sau, bà bán mảnh đất hương hoả. Đất mà ông ngoại dặn: đói thì ăn cám, chứ không được bán. {buy}Bà nạp bốn trăm mười tám triệu chín. {seven}Chú Toàn lên Leader bảy sao.',
      sfx: [['scratch', 0.3, 0.3], ['cash', 'buy', 0.6], ['tada', 'seven', 0.6]],
      draw(k) {
        vbg(k, { hud: { ho: [0, 418.9, 'buy', 1.2], sao: [5, 7, 'seven', 0.6] } });
        vert(k, 1080, () => {
          k.backdrop('day', { ground: G });
          k.ctx.fillStyle = '#7fbf6a'; k.ctx.fillRect(900, 700, 900, 230);
          k.text('ĐẤT HƯƠNG HOẢ', 1350, 640, { size: 54, font: 'title', color: '#fff', outline: '#3b2f2a', outlineWidth: 10 });
          k.char(800, G, S * 1.1, { ...LUU, face: 'calm', pose: 'present' });
          if (k.t > k.cue('buy')) { k.ctx.save(); k.ctx.translate(1350, 760); k.ctx.rotate(-0.1); k.ctx.fillStyle = '#d63a2f'; k.ctx.fillRect(-160, -50, 320, 100); k.ctx.restore(); k.text('ĐÃ BÁN', 1350, 762, { size: 60, font: 'title', color: '#fff' }); }
        });
        confetti(k, k.at('seven', 0.3));
        counter(k, 540, 1640, 418.9, '', 'buy', 1.2, { dec: 1, fmt: (v) => `${String(Math.round(v * 10) / 10).replace('.', ',')} TRIỆU`, size: 90, color: '#f2c230' });
      },
    },
    {
      say: 'Giỗ năm ấy, bà gắp cho chú cái đùi gà. {l1}Ăn đi con.{e1} {cry}Chú cúi xuống ăn, mắt đỏ hoe. {then}Ba tuần sau, cái app ấy chỉ còn hai chữ: {st}đang xử lý.',
      sfx: [['pop', 0.3, 0.5], ['sparkle', 'l1', 0.4], ['drumroll', 'then', 0.3], ['boom', 'st', 0.6]],
      draw(k) {
        vbg(k);
        if (k.t < k.cue('then')) {
          vert(k, 1080, () => {
            feast(k);
            k.char(1250, G - 20, S * 1.05, { ...LUU, face: 'happy', pose: 'present', talk: spk(k, 'l1', 'e1') });
            k.char(900, G - 10, S * 1.05, { ...TOAN, face: k.t > k.cue('cry') ? 'cry' : 'shock', tears: k.at('cry', 1.5) * 0.7, pose: 'hold' });
            mam(k, 1080, G + 70, 1.2);
          });
          vcap(k, '"ĂN ĐI CON."', 'l1', { color: '#fff' });
          return;
        }
        phone(k, 540, 840, 1.4, { screen: zena('withdraw', { amt: '1.500.000đ' }) });
        vcap(k, 'ĐANG XỬ LÝ…', 'st', { color: '#ff6b5a', size: 100 });
      },
    },
    fullVideoScene({
      say: '{full}Chuyện gì xảy ra với mảnh đất hương hoả? Xem bản đầy đủ trên kênh Nếu Bạn Là nhé.',
      image: 'poster',
      title: 'Nếu Bạn Kéo Cả Họ Vào App AI Kiếm Tiền… (Phần 1)',
      channel: 'Nếu Bạn Là',
      tail: 1.2,
    }),
  ],
};
