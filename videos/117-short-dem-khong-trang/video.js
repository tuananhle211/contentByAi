// Hạt Bụi Xanh · Short 2 của tập 115 (Mặt Trăng). Vòng: đêm nay Mặt Trăng biến mất, sáng mai biển ra sao → không sóng thần, triều còn ~1/3
// → cơ chế nước phồng 2 phía, Mặt Trời ~46% → Fundy 16 m, con nước theo lịch âm biến mất → rừng ngập mặn, san hô → vòng lại.
// Fact check: xem videos/115-neu-mat-trang-bien-mat/video.js. Thí nghiệm tưởng tượng (nói rõ "giả định" trên hình).
import { P, fill, space, bigNum, label, chip, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080, H = 1920;
const lerp = (a, b, p) => a + (b - a) * p;
const SRC = { bg: 'rgba(245,241,230,0.85)', size: 22 };
const MP = { bg: 'rgba(255,211,78,0.9)', size: 22 };
const disc = (k, name, x, y, r, f = 0.92, a = 1) => { if (a <= 0) return; const s = r / f; k.ctx.save(); k.ctx.globalAlpha *= a; k.ctx.beginPath(); k.ctx.arc(x, y, r, 0, Math.PI * 2); k.ctx.clip(); k.photo(name, x - s, y - s, s * 2, s * 2, { zoom: [1, 1], credit: false }); k.ctx.restore(); };
function thumb(k) {
  fill(k, '#03050C');
  for (let i = 0; i < 200; i++) k.dot(k.rand(i) * W, 450 + k.rand(i + 300) * 850, 1 + 1.4 * k.rand(i + 600), '#FFFFFF', 0.4 + 0.5 * k.rand(i + 9));
  disc(k, 'trang-ram', W / 2, 760, 260, 0.92, 0.35);
  k.ctx.strokeStyle = 'rgba(255,211,78,0.9)'; k.ctx.lineWidth = 6; k.ctx.setLineDash([18, 14]); k.ctx.beginPath(); k.ctx.arc(W / 2, 760, 260, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.setLineDash([]);
  k.ctx.fillStyle = 'rgba(46,134,222,0.6)'; k.ctx.fillRect(0, 1150, W, 150);
  k.ctx.fillStyle = 'rgba(5,8,26,0.92)'; k.ctx.fillRect(0, 140, W, 300);
  thumbLine(k, 'ĐÊM KHÔNG TRĂNG', W / 2, 230, 96);
  thumbAsk(k, 'BIỂN RA SAO?', W / 2, 370, 116, P.gold);
}

export default {
  meta: {
    title: 'Nếu Đêm Nay Mặt Trăng Biến Mất, Sáng Mai Biển Ra Sao? 🌊 #shorts',
    description: 'Không sóng thần, không lũ lụt. Nhưng con nước ở khắp nơi sẽ chỉ còn khoảng một phần ba, và chu kỳ nước lớn nước ròng theo lịch âm sẽ biến mất. Thí nghiệm tưởng tượng với những con số thật.',
    tags: ['mặt trăng', 'thuỷ triều', 'nếu mặt trăng biến mất', 'điều gì xảy ra nếu', 'biển', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'mattrang', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    gpu: true, post: 'cosmos',
    related: '115-neu-mat-trang-bien-mat', // YouTube Studio → Video liên quan
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Nếu đêm nay Mặt Trăng biến mất, sáng mai biển sẽ ra sao?', draw(k) { thumb(k); } },
    {
      say: '{a}Không có sóng thần. Không có lũ. {b}Nhưng con nước ở khắp nơi sẽ teo lại, chỉ còn khoảng một phần ba.',
      draw(k) {
        space(k, { n: 120 });
        const lv = lerp(380, 120, k.at('b', 2, 'inOut')), y0 = 1000, amp = lv * Math.sin(k.gt * 1.2);
        k.ctx.fillStyle = 'rgba(46,134,222,0.6)'; k.ctx.fillRect(140, y0 - amp, 800, 400 + amp);
        k.ctx.strokeStyle = P.cream; k.ctx.lineWidth = 3; k.ctx.strokeRect(140, 560, 800, 840);
        bigNum(k, 'KHÔNG SÓNG THẦN', W / 2, 250, 'a', { size: 84, color: P.cream, p: k.at('a', 0.5) * (1 - k.at('b', 0.4)) });
        bigNum(k, 'TRIỀU CÒN ~1/3', W / 2, 250, 'b', { size: 100, color: P.gold });
        chip(k, 'GIẢ ĐỊNH · MINH HOẠ', 40, 1290, MP);
      },
    },
    {
      say: '{a}Lực hút của Mặt Trăng kéo nước biển phồng lên ở cả hai phía Trái Đất. {b}Mặt Trời cũng làm vậy, nhưng chỉ yếu bằng chưa tới một nửa.',
      draw(k) {
        space(k, { n: 100 });
        const b = 70 * (1 - 0.6 * k.at('b', 2));
        k.ctx.fillStyle = 'rgba(46,134,222,0.55)'; k.ctx.beginPath(); k.ctx.ellipse(W / 2, 820, 200, 230 + b, 0, 0, Math.PI * 2); k.ctx.fill();
        disc(k, 'trai-dat-that', W / 2, 820, 190, 0.85);
        disc(k, 'trang-ram', W / 2, 260, 60, 0.92, 1 - k.at('b', 1));
        label(k, 'NƯỚC PHỒNG 2 PHÍA', W / 2, 1150, 'a', { size: 52, color: P.gold });
        label(k, 'MẶT TRỜI: < 1/2', W / 2, 1240, 'b', { size: 52 });
        chip(k, 'MINH HOẠ · PHÓNG ĐẠI', 40, 190, MP);
      },
    },
    {
      say: '{a}Ở vịnh Fundy, Canada, nước lên xuống chênh nhau tới mười sáu mét. {b}Ở Việt Nam, ngư dân xem con nước theo lịch âm: nước lớn quanh ngày rằm và mùng một. Không còn Mặt Trăng, chu kỳ ấy biến mất.',
      draw(k) {
        fill(k, '#000');
        const sw = (Math.sin(k.gt * 0.9) + 1) / 2;
        k.photo('fundy-len', 0, 300, W, 1000, { zoom: [1.2, 1.25], p: 1 - sw * k.at('a', 1) });
        k.photo('fundy-xuong', 0, 300, W, 1000, { zoom: [1.2, 1.25], p: sw * k.at('a', 1), fx: 'fade' });
        chip(k, 'VỊNH FUNDY · D. KERELUK', 40, 330, SRC);
        bigNum(k, 'TỚI 16 M', W / 2, 200, 'a', { size: 110, color: P.gold });
        bigNum(k, 'HẾT CON NƯỚC RẰM', W / 2, 1220, 'b', { size: 80, color: P.cream });
      },
    },
    {
      say: '{a}Rừng ngập mặn sống nhờ nước triều tràn vào mỗi ngày sẽ khô dần. {b}San hô mất chiếc đồng hồ ánh trăng để hẹn ngày đẻ trứng. Biển vẫn còn, nhưng nhịp thở của nó yếu đi.',
      draw(k) {
        fill(k, '#000');
        k.photo('san-ho', 0, 300, W, 1000, { zoom: [1.1, 1.3], p: k.at('b', 0.6), fx: 'fade' });
        if (k.t < k.cue('b', 0.6)) { const g = k.ctx.createLinearGradient(0, 300, 0, 1300); g.addColorStop(0, '#7FB2D0'); g.addColorStop(1, '#D9E8EF'); k.ctx.fillStyle = g; k.ctx.fillRect(0, 300, W, 1000); for (let i = 0; i < 8; i++) { const x = 70 + i * 135; k.dot(x, 760, 80, '#2E5E3A', 1); k.ctx.strokeStyle = '#3E2B1E'; k.ctx.lineWidth = 6; for (let r = -2; r <= 2; r++) { k.ctx.beginPath(); k.ctx.moveTo(x, 800); k.ctx.lineTo(x + r * 30, 1000); k.ctx.stroke(); } } const lv = lerp(900, 1100, k.at('a', 4, 'inOut')); k.ctx.fillStyle = 'rgba(70,110,120,0.8)'; k.ctx.fillRect(0, lv, W, 1300 - lv); }
        chip(k, k.t < k.cue('b', 0.6) ? 'MINH HOẠ · RỪNG NGẬP MẶN' : 'SAN HÔ ĐẺ TRỨNG · NOAA', 40, 330, k.t < k.cue('b', 0.6) ? MP : SRC);
        bigNum(k, 'NHỊP THỞ YẾU ĐI', W / 2, 1220, 'b', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Đó là lý do câu hỏi đầu tiên mà ngư dân sẽ hỏi là…',
      tail: 0.2,
      draw(k) { thumb(k); },
    },
  ],
};
