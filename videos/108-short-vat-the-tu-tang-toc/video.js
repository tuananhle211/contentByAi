// Hạt Bụi Xanh · Short 2 của tập 106 (Bí ẩn vũ trụ). Vòng: hòn đá tự tăng tốc → không động cơ, không đuôi, từ hệ sao khác → ʻOumuamua 2017
// → nhanh hơn lực hấp dẫn cho phép → giả thuyết băng chứa hydro (2023) → chưa kiểm chứng được → vòng lại.
// Fact check: 1I/ʻOumuamua phát hiện 19/10/2017 (Pan-STARRS1, Hawaii), vật thể liên sao đầu tiên; dài ước tính tới ~400 m; độ sáng đổi ~10 lần,
// chu kỳ ~7–8 giờ; gia tốc phi hấp dẫn (Micheli et al. 2018, Nature); không thấy khí/đuôi (Spitzer, Trilling et al. 2018);
// Loeb & Bialy 2018 (cánh buồm ánh sáng); Bergner & Seligman 2023 (Nature): hydro trong băng nước do tia vũ trụ — giả thuyết.
// Hình: minh hoạ ESO/M. Kornmesser (CC BY 4.0, gắn nhãn MINH HOẠ), ảnh chụp thật WHT (A. Fitzsimmons, PD), Pan-STARRS (PD), sao chổi NEOWISE (CC BY-SA 4.0).
import { P, fill, space, bigNum, label, chip, landmark81, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080;
const SRC = { bg: 'rgba(245,241,230,0.85)', size: 22 };
const MP = { bg: 'rgba(255,211,78,0.9)', size: 22 };
function thumb(k) {
  fill(k, '#000');
  k.photo('oumuamua-mh', 0, 420, W, 900, { zoom: [1.3, 1.3], pan: [[0.6, 0.42], [0.6, 0.42]], credit: false });
  k.ctx.fillStyle = 'rgba(5,8,26,0.92)'; k.ctx.fillRect(0, 140, W, 300);
  thumbLine(k, 'HÒN ĐÁ TỪ NGOÀI', W / 2, 230, 100);
  thumbAsk(k, 'TỰ TĂNG TỐC?', W / 2, 370, 110, P.gold);
  chip(k, 'MINH HOẠ · ESO', 40, 1270, MP);
}
// Hòn đá dài lộn vòng (minh hoạ), tâm (x, y), dài len, góc ang.
function cigar(k, x, y, len, ang, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.beginPath(); ctx.ellipse(0, 0, len / 2, len * 0.07, 0, 0, Math.PI * 2); ctx.fillStyle = '#6B4A3A'; ctx.fill(); ctx.strokeStyle = P.ink; ctx.lineWidth = 3; ctx.stroke();
  ctx.restore();
}

export default {
  meta: {
    title: 'Vì Sao Hòn Đá Này Tự Tăng Tốc Khi Rời Mặt Trời? ☄️ #shorts',
    description: 'Năm 2017, một vật thể từ hệ sao khác bay xuyên Hệ Mặt Trời. Không động cơ, không đuôi khí, vậy mà nó tự tăng tốc khi rời đi. Đây là lời giải được nhiều nhà khoa học chấp nhận nhất.',
    tags: ['oumuamua', 'vật thể liên sao', 'bí ẩn vũ trụ', 'người ngoài hành tinh', 'thiên văn học', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'biAnVuTru', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32, speakNumbers: false,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    related: '106-nhung-bi-an-vu-tru-chua-co-loi-giai', // YouTube Studio → Video liên quan
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Vì sao hòn đá này tự tăng tốc khi rời xa Mặt Trời?', draw(k) { thumb(k); } },
    {
      say: '{a}Nó không có động cơ. {b}Không có đuôi khí như sao chổi. {c}Và nó đến từ một hệ sao khác.',
      draw(k) {
        fill(k, '#000');
        k.clip('oumuamua-mp', -420, 300, 1920, 1080, { at: 0, zoom: [1.1, 1.15] });
        chip(k, 'MÔ PHỎNG · ESO', 40, 330, MP);
        bigNum(k, 'KHÔNG ĐỘNG CƠ', W / 2, 220, 'a', { size: 86, color: P.cream });
        bigNum(k, 'KHÔNG ĐUÔI', W / 2, 1180, 'b', { size: 86, color: P.cream, p: k.at('b', 0.5) * (1 - k.at('c', 0.4)) });
        bigNum(k, 'TỪ HỆ SAO KHÁC', W / 2, 1180, 'c', { size: 86, color: P.gold });
      },
    },
    {
      say: '{a}Năm 2017, các nhà thiên văn phát hiện ʻOumuamua, vật thể đầu tiên từ ngoài Hệ Mặt Trời. {b}Kính chỉ thấy một chấm sáng, nhưng độ sáng của nó cho biết: nó dài tới bốn trăm mét, và đang lộn vòng.',
      draw(k) {
        fill(k, '#000');
        k.photo('pan-starrs', 0, 150, W, 1150, { zoom: [1, 1.08], pan: [[0.45, 0.5], [0.4, 0.5]], p: 1 - k.at('b', 0.6) });
        k.photo('oumuamua-that', 0, 150, W, 1150, { zoom: [1.6, 1.8], p: k.at('b', 0.6), fx: 'fade', credit: 'A. Fitzsimmons (QUB) · ING' });
        landmark81(k, 860, 1250, 460, { alpha: k.at(k.cue('b', 3), 0.6) });
        cigar(k, 470, 1060, 400, k.gt * 0.8, { alpha: k.at(k.cue('b', 3), 0.6) });
        label(k, '~400 M', 470, 1180, k.cue('b', 3), { size: 56, color: P.gold });
        chip(k, k.t < k.cue('b') ? 'PAN-STARRS · HAWAII' : 'ẢNH CHỤP · 10/2017', 40, 190, SRC);
      },
    },
    {
      say: '{a}Khi rời đi, nó nhanh hơn mức lực hấp dẫn cho phép. {b}Sao chổi làm được vậy nhờ phụt khí, nhưng nó không có đuôi. {c}Có nhà thiên văn còn nghĩ đó là cánh buồm của người ngoài hành tinh.',
      draw(k) {
        fill(k, '#000');
        k.photo('sao-choi', 0, 150, W, 1150, { zoom: [1.1, 1.2], pan: [[0.35, 0.6], [0.4, 0.6]], p: k.at('b', 0.5) * (1 - k.at('c', 0.5)) });
        if (k.t < k.cue('b')) { space(k, { n: 120 }); const p = k.at('a', 3); k.ctx.strokeStyle = 'rgba(245,241,230,0.5)'; k.ctx.setLineDash([12, 10]); k.ctx.lineWidth = 5; k.ctx.beginPath(); k.ctx.moveTo(120, 1150); k.ctx.lineTo(120 + 800 * p, 1150 - 700 * p); k.ctx.stroke(); k.ctx.setLineDash([]); k.ctx.strokeStyle = P.orange; k.ctx.beginPath(); k.ctx.moveTo(120, 1150); k.ctx.quadraticCurveTo(120 + 500 * p, 1150 - 500 * p, 120 + 860 * p, 1150 - 900 * p); k.ctx.stroke(); }
        if (k.t >= k.cue('c')) { space(k, { n: 120 }); k.ctx.fillStyle = 'rgba(200,215,230,0.85)'; k.ctx.beginPath(); k.ctx.ellipse(W / 2, 720, 300, 300 * Math.abs(Math.cos(k.gt * 0.5)) + 8, 0.3, 0, Math.PI * 2); k.ctx.fill(); chip(k, 'GIẢ THUYẾT · ÍT NGƯỜI ỦNG HỘ', 40, 330, MP); }
        bigNum(k, 'AI ĐẨY NÓ?', W / 2, 230, 'a', { size: 110, color: P.gold });
        if (k.t >= k.cue('b') && k.t < k.cue('c')) chip(k, 'SAO CHỔI NEOWISE · 2020', 40, 330, SRC);
        bigNum(k, 'CÁNH BUỒM ÁNH SÁNG?', W / 2, 1200, 'c', { size: 76, color: P.cream });
      },
    },
    {
      say: '{a}Năm 2023, một lời giải đơn giản hơn: nó là khối băng nước. {b}Tia vũ trụ biến một phần băng thành hydro, nhốt bên trong. {c}Gần Mặt Trời, hydro thoát ra đẩy nó đi, quá loãng để nhìn thấy.',
      draw(k) {
        space(k, { n: 100 });
        cigar(k, W / 2, 720, 760, 0.12);
        for (let i = 0; i < 30; i++) k.dot(330 + k.rand(i + 10) * 420, 700 + (k.rand(i + 20) - 0.5) * 50, 5, '#9FD8EA', k.at(k.cue('b', 0.1 * i), 0.4) * 0.9);
        if (k.t >= k.cue('c')) for (let i = 0; i < 26; i++) { const t = (k.t - k.cue('c') + i * 0.15) % 2.5; k.dot(140 - t * 60, 680 + (k.rand(i) - 0.5) * 160 * t, 4, '#CFE8F0', Math.max(0, 0.45 - t * 0.15)); }
        bigNum(k, 'BĂNG + HYDRO', W / 2, 300, 'a', { size: 110, color: P.gold });
        label(k, 'HYDRO THOÁT RA → LỰC ĐẨY', W / 2, 1050, 'c', { size: 52, color: P.cream });
        chip(k, 'GIẢ THUYẾT · NATURE 2023', 40, 190, MP);
      },
    },
    {
      say: '{a}Nhưng nó đã bay quá xa để kiểm tra lại. {b}Nên đến hôm nay, các nhà khoa học vẫn chưa dám chắc…',
      tail: 0.2,
      draw(k) { thumb(k); },
    },
  ],
};
