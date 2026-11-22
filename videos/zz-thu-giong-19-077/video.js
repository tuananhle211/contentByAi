// Shorts kênh Nếu Bạn Là — cắt từ "Thầy" Giải Hạn Online (Phần 1) (076): râu dán bong giữa livestream → biến thành "bằng chứng có vong". Concept: #13* #9.
// Kịch bản dọa "nhà có vong theo", lễ giải hạn qua chuyển khoản: VTV 05/03/2026. Truyện hư cấu.
import { fullVideoScene } from '/engine/templates.js';
import { LOC, BATAM, liveRoom, altarFront, keng, vert, vbg, vcap, tRays, tSticker, tBig, tCircle, tArrow } from '/channel/neu-ban-la.js';

const live = (k, o = {}) => vert(k, 960, () => {
  liveRoom(k);
  k.char(960, 900, 650, { ...LOC, shadow: false, ...o });
  if (o.after) o.after(k);
  altarFront(k, { ring: o.ring ?? 0 });
}, { y0: 260, s: 1 });
const beard = (k, x, y, s = 1, r = 0) => k.group({ x, y, s, r }, () => { const { ctx } = k; ctx.fillStyle = '#d9d4cc'; ctx.strokeStyle = '#3b2f2a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-40, -40); ctx.quadraticCurveTo(0, 120, 40, -40); ctx.quadraticCurveTo(0, -20, -40, -40); ctx.fill(); ctx.stroke(); });
// Bình luận khung dọc (dưới khung live, trên phụ đề).
function cmts(k, list) {
  const shown = list.filter((c) => k.t >= k.cue(c.cue)).slice(-3);
  shown.forEach((c, i) => {
    const y = 1080 + i * 74;
    const { ctx } = k; ctx.font = '600 32px "Be Vietnam Pro"';
    const w = Math.min(1000, ctx.measureText(`${c.n}  ${c.t}`).width + 60);
    ctx.save(); ctx.globalAlpha = 0.85; ctx.fillStyle = '#14161d'; ctx.beginPath(); ctx.roundRect(40, y - 32, w, 64, 32); ctx.fill(); ctx.restore();
    k.text(c.n, 66, y, { size: 30, font: 'title', align: 'left', color: '#f2c230' });
    ctx.font = '800 30px "Be Vietnam Pro"'; const nw = ctx.measureText(c.n).width;
    k.text(c.t, 66 + nw + 16, y, { size: 32, align: 'left', color: '#fff' });
  });
}
const liveTag = (k, view) => { const { ctx } = k; ctx.fillStyle = '#ff2d55'; ctx.beginPath(); ctx.roundRect(40, 190, 110, 44, 10); ctx.fill(); k.text('LIVE', 95, 213, { size: 30, font: 'title', color: '#fff' }); k.text(`👁 ${view}`, 170, 213, { size: 34, font: 'title', align: 'left', color: '#fff' }); };

export default {
  meta: {
    title: 'Râu thầy rơi giữa livestream… mà càng bán được? 😳 #shorts',
    description: 'Thầy giải hạn online đang livestream trước ba nghìn người thì chòm râu dán bong ra. Năm giây sau, chính cái râu ấy thành "bằng chứng có vong". Truyện hư cấu dựa trên các vụ lừa giải hạn online được báo chí đưa tin. Xem bản đầy đủ trên kênh Nếu Bạn Là!',
    links: [['▶ Bản đầy đủ', '076-neu-ban-la-thay-giai-han-online-p1']],
    tags: ['giải hạn online', 'thầy bói online', 'lừa đảo tâm linh', 'livestream', 'shorts', 'nếu bạn là'],
    hashtags: ['shorts', 'luadao', 'giaihan'],
    format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'ngoc_ngan', speed: 1, // giọng 08 (từ 11/11); bản Edge cũ: tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1.1
    lead: 0.15, tail: 0.3, pause: 0.12,
    transition: 'cut', sfxTransitions: false, camera: 0.03, sfxVolume: 0.6,
    images: { poster: 'assets/poster.jpg' },
    paper: '#14161d', privacy: 'private',
  },
  thumbnail(k) {
    tRays(k, '#7a1414', '#a32020', 540, 1100);
    tSticker(k, () => k.char(470, 2150, 1300, { ...LOC, beard: false, face: 'shout', pose: 'wave', vein: true, shadow: false }), 16);
    tSticker(k, () => beard(k, 830, 900, 3.2, 0.4), 12);
    tCircle(k, 830, 960, 190, 220);
    tBig(k, 'RÂU THẦY RƠI', 540, 200, 112, '#ffffff', { r: -0.04 });
    tBig(k, 'GIỮA LIVE…', 540, 340, 112, '#ffffff', { r: -0.04 });
    tBig(k, 'CÀNG BÁN ĐƯỢC?!', 540, 490, 100, '#ffe066', { box: '#14161d', r: -0.04 });
  },
  scenes: [
    {
      say: 'Bạn là "thầy" giải hạn online, đang livestream trước ba nghìn người. {peel}Thì chòm râu dán bắt đầu bong. {q}Bạn sẽ làm gì?',
      sfx: [['pop', 0.2, 0.4], ['slideDown', 'peel', 0.5], ['boing', 'q', 0.4]],
      draw(k) {
        vbg(k);
        live(k, { face: k.t > k.cue('q') ? 'shock' : 'smug', pose: 'hold', sweat: k.t > k.cue('peel'), beardPeel: 0.7 * k.at('peel', 1.2, 'back'), sq: k.take('q', 1) });
        liveTag(k, '3.000');
        vcap(k, k.t > k.cue('q') ? 'BẠN LÀM GÌ?' : 'RÂU BONG GIỮA LIVE?!', k.t > k.cue('q') ? 'q' : 'peel', { color: k.t > k.cue('q') ? '#fff' : '#ff8a7a' });
      },
    },
    {
      say: '{flood}Bình luận nổ tung: Râu thầy rơi kìa! Thầy giả à? {cut}Sau máy quay, bà chủ đưa ngón tay vạch ngang cổ.',
      sfx: [['pop', 'flood', 0.4], ['pop', ['flood', 0.4], 0.4], ['scratch', 'cut', 0.5]],
      draw(k) {
        vbg(k);
        if (k.t < k.cue('cut')) live(k, { face: 'blank', pose: 'hold', sweat: true, beardPeel: 0.72, tilt: 0.04 * Math.sin(k.t * 2) });
        else vert(k, 960, () => { k.ctx.fillStyle = '#3a2a2e'; k.ctx.fillRect(0, 0, 1920, 1080); k.char(960, 1000, 700, { ...BATAM, face: 'angry', pose: { l: [12, 6], r: [70, 140] }, shadow: false }); k.line(860, 740, 1060, 740, { width: 12, stroke: '#ff2d2d', p: k.at(k.cue('cut', 0.3), 0.4), seed: 7 }); }, { y0: 260 });
        liveTag(k, '4.150');
        cmts(k, [{ n: 'Lan 1968', t: 'Râu thầy rơi kìa!!', cue: 'flood' }, { n: 'Bình 1980', t: 'Thầy giả à? 🤨', cue: ['flood', 0.4] }, { n: 'Tuấn 1990', t: 'RÂU DÁN 😂😂', cue: ['flood', 0.8] }].map((c) => ({ ...c, cue: Array.isArray(c.cue) ? k.cue(c.cue[0], c.cue[1]) : c.cue })));
        if (k.t > k.cue('cut')) vcap(k, '✂️ XONG PHIM?', 'cut', { color: '#ff8a7a' });
      },
    },
    {
      say: '{grab}Bạn giật phăng chòm râu, giơ lên, gầm: {roar}Vong đang giật râu ta! {rule}Ai nhìn thấy râu ta rơi, nhà người đó có vong nặng! {k1}Keng. {k2}Keng. {k3}Keng keng keng.',
      sfx: [['scratch', 'grab', 0.6], ['boom', 'roar', 0.5], ['boom', 'rule', 0.4], ['ding', 'k1', 0.6], ['ding', 'k2', 0.6], ['ding', 'k3', 0.6], ['cash', ['k3', 0.4], 0.6]],
      draw(k) {
        vbg(k);
        live(k, { beard: false, face: k.t > k.cue('k1') ? 'laugh' : 'shout', pose: 'wave', vein: k.t < k.cue('k1'), talk: k.t > k.cue('roar') && k.t < k.cue('k1') ? 0.6 + 0.4 * Math.sin(k.t * 9) : 0, sq: k.take('grab', 1.2), ring: k.t > k.cue('k1') ? 1 : 0, after: (k) => beard(k, 1105, 450 + 8 * Math.sin(k.t * 8), 1.3, 0.3 * Math.sin(k.t * 6)) });
        liveTag(k, k.t > k.cue('k1') ? '5.200' : '4.150');
        cmts(k, [{ n: 'Lan 1968', t: 'CON THẤY!!', cue: 'k1' }, { n: 'Thu 1972', t: 'Thầy cứu con!!! 🙏', cue: 'k2' }, { n: 'Mai 1966', t: 'Con chuyển rồi ạ', cue: 'k3' }]);
        keng(k, 'k1', 300, 500); keng(k, 'k2', 800, 420); keng(k, 'k3', 540, 600, 'KENG KENG!');
        if (k.t < k.cue('k1')) vcap(k, k.t > k.cue('rule') ? 'AI THẤY = CÓ VONG!' : 'VONG GIẬT RÂU TA!', k.t > k.cue('rule') ? 'rule' : 'roar', { color: '#ffe066' });
      },
    },
    {
      say: '{num}Ba mươi triệu thành năm mươi sáu triệu. {lesson}Với người đang sợ, cái gì cũng là bằng chứng. {q}Còn bạn, có thấy râu rơi không?',
      sfx: [['cash', 'num', 0.5], ['sparkle', 'lesson', 0.4], ['boing', 'q', 0.4]],
      draw(k) {
        vbg(k);
        const v = 30 + 26 * k.at('num', 1.4);
        k.text(`${Math.round(v)} TRIỆU`, 540, 560, { size: 170, font: 'title', color: '#7fe0a8', outline: '#1b1b24', outlineWidth: 18 });
        k.text('30tr → 56tr', 540, 730, { size: 70, font: 'title', color: '#fff', fx: 'fade', p: k.at('num', 0.4) });
        beard(k, 540, 960, 2.2, 0.2 * Math.sin(k.t * 3));
        vcap(k, k.t > k.cue('q') ? 'BẠN CÓ THẤY KHÔNG? 👀' : 'SỢ → CÁI GÌ CŨNG LÀ BẰNG CHỨNG', k.t > k.cue('q') ? 'q' : 'lesson', { color: '#f2c230', size: 64 });
      },
    },
    fullVideoScene({
      say: '{full}Bản đầy đủ: một đêm của thầy Lộc Phát, trên kênh Nếu Bạn Là.',
      image: 'poster',
      title: 'Nếu Bạn Là "Thầy" Giải Hạn Online… (Phần 1)',
      channel: 'Nếu Bạn Là',
    }),
  ],
};
