// Hạt Bụi Xanh · Short 1 của tập 109 (hố đen lớn nhất). Vòng: ánh sáng bay ngang hố đen lớn nhất mất bao lâu → 7,5 vòng Trái Đất/giây
// mà vẫn mất nhiều ngày → TON 618 ~40 tỷ M☉ → chân trời ~240 tỷ km, Sao Diêm Vương lọt thỏm → ~9 ngày, Voyager < ¼ bán kính → vòng lại.
// Fact check: xem videos/109-ho-den-lon-nhat-vu-tru/video.js (đường kính chân trời ~1.600 AU; ánh sáng ~499 giây/AU → ~9 ngày; Voyager 1 ~170 AU).
// Khung 1080×1920: nội dung trong y 150–1300. Khung đầu = thumbnail. 3D: meta.gpu; hậu kỳ 'cosmos'.
import { P, fill, space, bigNum, label, chip, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';
import { three } from '/engine/gl3d.js';
import { blackHoleScene, blackHoleUpdate } from '/channel/hat-bui-xanh-3d.js';

const W = 1080, H = 1920;
const lerp = (a, b, p) => a + (b - a) * p;
const SRC = { bg: 'rgba(245,241,230,0.85)', size: 22 };
const MP = { bg: 'rgba(255,211,78,0.9)', size: 22 };
const BH = blackHoleScene();
const bh = (k, o = {}) => three(k, 'bh', BH, blackHoleUpdate({ dist: o.dist ?? 12, orbit: o.orbit ?? 0.05, tilt: 0.14 }), 0, o.y ?? 300, W, 1100, { exposure: o.exp ?? 1.2 });
function horizon(k, x, y, r) {
  const { ctx } = k; const g = ctx.createRadialGradient(x, y, r * 0.95, x, y, r * 1.2); g.addColorStop(0, 'rgba(255,150,60,0.55)'); g.addColorStop(1, 'rgba(255,150,60,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
}
function thumb(k) {
  fill(k, '#000');
  bh(k, { dist: 10, orbit: 0, y: 380 });
  k.ctx.fillStyle = 'rgba(5,8,26,0.92)'; k.ctx.fillRect(0, 140, W, 300);
  thumbLine(k, 'ÁNH SÁNG BAY NGANG', W / 2, 230, 74);
  thumbAsk(k, 'MẤT BAO LÂU?', W / 2, 370, 110, P.gold);
  chip(k, 'MÔ PHỎNG', 40, 1260, MP);
}

export default {
  meta: {
    title: 'Ánh Sáng Bay Ngang Hố Đen Này Mất Bao Lâu? 🕳️ #shorts',
    description: 'Ánh sáng đi vòng quanh Trái Đất bảy lần rưỡi mỗi giây. Vậy mà để bay ngang hố đen lớn nhất từng được tìm thấy, nó cần nhiều ngày. Đây là TON 618.',
    tags: ['hố đen', 'hố đen lớn nhất vũ trụ', 'ton 618', 'tốc độ ánh sáng', 'vũ trụ', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'hoden', 'vutru', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    gpu: true, post: 'cosmos',
    related: '109-ho-den-lon-nhat-vu-tru', // YouTube Studio → Video liên quan
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Ánh sáng cần bao lâu để bay ngang hố đen lớn nhất?', draw(k) { thumb(k); } },
    {
      say: '{a}Ánh sáng đi vòng quanh Trái Đất bảy lần rưỡi mỗi giây. {b}Vậy mà để bay ngang hố đen này, nó cần nhiều ngày.',
      draw(k) {
        space(k, { n: 160 });
        const s = 340 / 0.85; k.ctx.save(); k.ctx.beginPath(); k.ctx.arc(W / 2, 700, 340, 0, Math.PI * 2); k.ctx.clip(); k.photo('trai-dat-that', W / 2 - s, 700 - s, s * 2, s * 2, { zoom: [1, 1], credit: false }); k.ctx.restore();
        const a = k.t * 7.5 * Math.PI * 2 * 0.15;
        k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.arc(W / 2, 700, 380, a, a + 1.2); k.ctx.stroke();
        bigNum(k, '7,5 VÒNG / GIÂY', W / 2, 250, 'a', { size: 84, color: P.cream });
        bigNum(k, 'NHIỀU NGÀY?', W / 2, 1220, 'b', { size: 110, color: P.gold });
      },
    },
    {
      say: '{a}Hố đen đó tên là TON 618, nặng khoảng bốn mươi tỷ lần Mặt Trời. {b}Ánh sáng của nó đi gần mười một tỷ năm mới tới được chúng ta.',
      draw(k) {
        fill(k, '#000');
        k.photo('ton618', 0, 300, W, 1000, { zoom: [1.4, 2.2] });
        k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 5; k.ctx.beginPath(); k.ctx.arc(W / 2, 800, 70, 0, Math.PI * 2); k.ctx.stroke();
        chip(k, 'SDSS · TON 618', 40, 330, SRC);
        bigNum(k, '~40 TỶ MẶT TRỜI', W / 2, 220, 'a', { size: 86, color: P.gold });
        bigNum(k, '~11 TỶ NĂM', W / 2, 1220, 'b', { size: 96, color: P.cream });
      },
    },
    {
      say: '{a}Chân trời sự kiện của nó, ranh giới không gì thoát ra được, rộng khoảng hai trăm bốn mươi tỷ km. {b}Đặt vào chỗ Mặt Trời, quỹ đạo Sao Diêm Vương chỉ còn là một vòng nhỏ ở giữa.',
      draw(k) {
        space(k, { n: 120 });
        horizon(k, W / 2, 760, 440 * k.at('a', 2, 'inOut'));
        const p = k.at('b', 0.8); k.ctx.strokeStyle = `rgba(255,211,78,${p})`; k.ctx.lineWidth = 3; k.ctx.setLineDash([8, 6]); k.ctx.beginPath(); k.ctx.arc(W / 2, 760, 22, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.setLineDash([]);
        label(k, 'QUỸ ĐẠO SAO DIÊM VƯƠNG', W / 2, 700, 'b', { size: 34, color: P.gold });
        bigNum(k, '~240 TỶ KM', W / 2, 230, 'a', { size: 100, color: P.cream });
      },
    },
    {
      say: '{a}Ánh sáng bay ngang qua nó mất khoảng chín ngày. {b}Còn tàu Voyager 1, bay gần năm mươi năm, vẫn chưa đi hết một phần tư bán kính của nó.',
      draw(k) {
        space(k, { n: 120 });
        horizon(k, W / 2, 760, 440);
        const p = k.at('a', 4, 'linear'); k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.moveTo(W / 2 - 440, 760); k.ctx.lineTo(W / 2 - 440 + 880 * p, 760); k.ctx.stroke();
        const v = k.at('b', 3, 'inOut'); k.ctx.strokeStyle = P.cream; k.ctx.lineWidth = 4; k.ctx.beginPath(); k.ctx.moveTo(W / 2, 860); k.ctx.lineTo(W / 2 + 440 * 0.215 * v, 860); k.ctx.stroke();
        label(k, 'VOYAGER 1', W / 2 + 60, 910, 'b', { size: 34, align: 'left' });
        bigNum(k, '~9 NGÀY', W / 2, 240, 'a', { size: 130, color: P.gold });
        bigNum(k, '< ¼ BÁN KÍNH', W / 2, 1240, 'b', { size: 90, color: P.cream });
      },
    },
    {
      say: '{a}Và đó mới là hố đen lớn nhất mà chúng ta biết. {b}Nên nếu bạn vẫn đang tự hỏi…',
      tail: 0.2,
      draw(k) { thumb(k); },
    },
  ],
};
