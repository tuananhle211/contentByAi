// Shorts kênh Nếu Bạn Là — cắt từ "Tầng 4 (Phần 1)" (070): người khách trả bằng túi du lịch. Concept: #6* #9 #13.
// Truyện hư cấu dựa trên tin Thanh Niên, Dân trí 04/11/2026 (lò lừa đảo thuê khách sạn/biệt thự).
import { fullVideoScene } from '/engine/templates.js';
import { G, KHAI, NGA, LY, spk, pop, lobby, lobbyDesk, cashBag, dollar, hotelFront, vert, vbg, vcap, tRays, tSticker, tBig, tCircle } from '/channel/neu-ban-la.js';

const S = 520;

export default {
  meta: {
    title: 'Có người thuê trọn khách sạn… cấm lên tầng 4? 😳 #shorts',
    description: 'Mười một giờ đêm, một người xách túi du lịch đầy tiền mặt tới thuê trọn cả khách sạn ba tháng. Ba điều kiện: không khai báo lưu trú, tắt camera, không ai được lên tầng 4. Truyện hư cấu dựa trên các vụ lò lừa đảo thuê trọn khách sạn được báo chí đưa tin tháng 11/2026. Xem bản đầy đủ trên kênh Nếu Bạn Là!',
    links: [['▶ Bản đầy đủ', '070-neu-ban-la-le-tan-khach-san-tang-4-p1']],
    tags: ['thuê trọn khách sạn', 'tầng 4', 'lò lừa đảo', 'lễ tân', 'shorts', 'nếu bạn là'],
    hashtags: ['shorts', 'luadao', 'canhgiac'],
    format: 'short', captions: true,
    style: 'clean', tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1.1,
    lead: 0.15, tail: 0.3, pause: 0.12,
    transition: 'cut', sfxTransitions: false, camera: 0.03, sfxVolume: 0.6,
    images: { poster: 'assets/poster.jpg' },
    paper: '#14161d', privacy: 'private',
  },
  thumbnail(k) {
    tRays(k, '#b3202a', '#d33a3f', 540, 900);
    tSticker(k, () => cashBag(k, 560, 1000, 1.5, { open: 1, eyes: 1 }), 14);
    tSticker(k, () => k.char(300, 1950, 1150, { ...KHAI, face: 'shock', sweat: true, pose: 'shrug', shadow: false }), 16);
    tSticker(k, () => k.char(860, 1880, 700, { ...LY, face: 'smug', pose: 'point', shadow: false }), 12);
    tBig(k, 'THUÊ TRỌN', 540, 190, 120, '#ffffff', { r: -0.04 });
    tBig(k, 'KHÁCH SẠN…', 540, 340, 110, '#ffffff', { r: -0.04 });
    tBig(k, 'CẤM LÊN TẦNG 4?!', 540, 500, 92, '#ffe066', { box: '#14161d', r: -0.04 });
  },
  scenes: [
    {
      say: 'Mười một giờ đêm, có người xách một túi du lịch tới quầy lễ tân của bạn. {open}Kéo khoá ra: toàn tiền mặt. {q}Anh ta muốn gì?',
      sfx: [['whoosh', 0.2, 0.4], ['cash', 'open', 0.7], ['boing', 'q', 0.4]],
      draw(k) {
        vbg(k);
        vert(k, 1000, () => {
          lobby(k);
          k.char(760, G - 40, S, { ...KHAI, face: k.t > k.cue('open') ? 'shock' : 'calm', pose: k.t > k.cue('open') ? 'shrug' : 'hold', sweat: k.t > k.cue('open') });
          k.char(1260, G, S, { ...LY, face: 'smug', pose: 'present' });
          lobbyDesk(k);
          cashBag(k, 1000, 640, 0.7, { open: k.at('open', 0.5) });
          if (k.t > k.cue('open')) k.focusLines(1000, 560, { p: k.at('open', 0.4), r: 260 });
        });
        vcap(k, 'ANH TA MUỐN GÌ?', 'q', { color: '#fff' });
      },
    },
    {
      say: '{l1}Anh thuê hết. Cả khách sạn, ba tháng, trả trước.{e1} {look}Bạn nhìn cái túi. {back}Cái túi nhìn lại bạn.',
      sfx: [['cash', 'l1', 0.4], ['boing', 'back', 0.5]],
      draw(k) {
        vbg(k);
        k.char(540, 1380, S * 1.5, { ...LY, face: 'smug', pose: 'hips', talk: spk(k, 'l1', 'e1'), shadow: false });
        cashBag(k, 540, 820, 1.5, { open: 1, eyes: k.at('back', 0.4) });
        vcap(k, 'THUÊ HẾT · 3 THÁNG', 'l1', { color: '#f2c230' });
      },
    },
    {
      say: 'Ba điều kiện. {c1}Một: không khai báo lưu trú. {c2}Hai: tắt camera hành lang. {c3}Ba: không ai được lên tầng bốn. {nod}Bà chủ gật ba cái, nhanh như gà mổ thóc.',
      sfx: [['pop', 'c1', 0.5], ['pop', 'c2', 0.5], ['boom', 'c3', 0.5], ['bonk', 'nod', 0.3], ['bonk', ['nod', 0.25], 0.3], ['bonk', ['nod', 0.5], 0.3]],
      draw(k) {
        vbg(k);
        vert(k, 620, () => {
          lobby(k);
          k.char(560, G, S, { ...NGA, hat: 'band', hatColor: '#f29bb8', face: k.t > k.cue('nod') ? 'laugh' : 'happy', pose: 'hold', lean: k.t > k.cue('nod') ? 0.15 * Math.sin((k.t - k.cue('nod')) * 14) : 0 });
          for (let i = 0; i < 5; i++) { const u = ((k.t * 3 + i / 5) % 1); dollar(k, 640 + u * 120, 560 - Math.sin(u * Math.PI) * 120, 0.35, u * 3); }
        });
        [['1. KHÔNG KHAI BÁO', 'c1'], ['2. TẮT CAMERA', 'c2'], ['3. CẤM LÊN TẦNG 4', 'c3']].forEach(([t, c], i) => {
          const p = k.at(c, 0.4, 'back'); if (p <= 0) return;
          k.group({ x: 540, y: 1520 + i * 110, s: p, r: -0.02 }, () => { k.rect(-420, -45, 840, 90, { fill: i === 2 ? '#d63a2f' : '#fffdf6', fillStyle: 'solid', width: 4, seed: 300 + i }); k.text(t, 0, 2, { size: 52, font: 'title', color: i === 2 ? '#fff' : '#1b1b24' }); });
        });
      },
    },
    {
      say: 'Còn bạn, lễ tân ca đêm. {l1}Lương gấp ba. Làm tốt có thưởng.{e1} {tip}Một tờ một trăm đô nhét vào túi áo. {q}Nếu là bạn, bạn có hỏi tầng bốn làm gì không?',
      sfx: [['ding', 'l1', 0.4], ['cash', 'tip', 0.6], ['boing', 'q', 0.4]],
      draw(k) {
        vbg(k);
        vert(k, 960, () => {
          hotelFront(k, { lit4: true });
          k.char(700, G, S, { ...KHAI, face: k.t > k.cue('q') ? 'think' : 'laugh', pose: 'hold', flush: 0.4 });
          k.char(1220, G, S, { ...LY, face: 'smug', pose: 'point', talk: spk(k, 'l1', 'e1') });
          dollar(k, 860, 700, 0.7, -0.3, k.at('tip', 0.4));
          if (k.t > k.cue('q')) { const { ctx } = k; ctx.save(); ctx.strokeStyle = '#ff2a2a'; ctx.lineWidth = 12; ctx.beginPath(); ctx.ellipse(960, 360, 480, 80, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
        });
        vcap(k, k.t > k.cue('q') ? 'TẦNG 4 LÀM GÌ?' : 'LƯƠNG ×3', k.t > k.cue('q') ? 'q' : 'l1', { color: '#f2c230' });
      },
    },
    fullVideoScene({
      say: '{full}Tầng bốn có gì? Xem bản đầy đủ trên kênh Nếu Bạn Là nhé.',
      image: 'poster',
      title: 'Nếu Bạn Là Lễ Tân Khách Sạn… Tầng 4 (Phần 1)',
      channel: 'Nếu Bạn Là',
      tail: 1.2,
    }),
  ],
};
