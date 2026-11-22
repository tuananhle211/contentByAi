// Nhân Gian Chưa Kể · Short 2 của tập 127 (Ma Giấu): gõ mâm tìm người + bát cơm để phần hoá đất. Không lộ chuyện cái hầm và lời thú nhận của bố.
// Sửa 20/11 (hướng chân thật): dép ở bờ ao thay vì ngọn tre; bỏ đếm ngược "ba bữa"; có công an xã. Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { dep } from '/channel/nhan-gian-cauco.js';
import { BA } from '/channel/nhan-gian-babi.js';
import { DAN, ch, mamDong, batPhan, duoc, ngoXom, bepVach, sepia } from '/channel/nhan-gian-magiau.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const dark = (k) => { k.ctx.fillStyle = '#1e1610'; k.ctx.fillRect(0, 0, 1920, 1080); };
const bat = (k, earth) => { dark(k); batPhan(k, 960, 760, 4.4, earth); shade(k, 0.35, [{ x: 960, y: 560, r: 760, warm: 1 }], { vig: 0 }); };
function doan(k, p) { ngoXom(k, { time: 'night' }); DAN.forEach((d, i) => { const x = 300 + p * 1200 - i * 170; duoc(k, x + 112, 575, 1.15); ch(k, x, 960, 430, { ...d, view: 'side', action: 'walk', face: 'fear', arms: 'point' }); }); shade(k, 0.62, [{ x: 960, y: 760, r: 1000, warm: 1, flicker: 1 }], { vig: 0 }); }
function ao(k) { const { ctx } = k, g = ctx.createLinearGradient(0, 0, 0, 600); g.addColorStop(0, '#8a9aa8'); g.addColorStop(1, '#d8c4a4'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 700); ctx.fillStyle = '#5e7a7e'; ctx.fillRect(0, 520, 1920, 300); ctx.strokeStyle = 'rgba(220,230,230,0.35)'; ctx.lineWidth = 3; for (let i = 0; i < 9; i++) { const y = 560 + i * 28, x = (i * 260 + k.t * 20) % 2100 - 100; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 160, y); ctx.stroke(); } ctx.fillStyle = '#8a7a50'; ctx.beginPath(); ctx.moveTo(0, 820); ctx.quadraticCurveTo(960, 760, 1920, 820); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#7c8a48'; ctx.fillRect(0, 900, 1920, 180); dep(k, 900, 850, 1.5, { color: '#3f7f9a', wire: false, r: -0.1 }); dep(k, 1030, 856, 1.5, { color: '#3f7f9a', wire: false, r: -0.1 }); shade(k, 0.22, [{ x: 960, y: 400, r: 1200 }], { vig: 0 }); }
function tre(k) { const { ctx } = k, g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#8a9aa8'); g.addColorStop(1, '#d8c4a4'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080); ctx.strokeStyle = '#4e6a30'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(920, 1200); ctx.quadraticCurveTo(940, 800, 960, 560); ctx.stroke(); ctx.strokeStyle = '#6a8a3a'; ctx.lineWidth = 26; ctx.stroke(); for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? '#587a3e' : '#6a8a4a'; ctx.beginPath(); ctx.ellipse(960 + Math.cos(i * 0.7) * 150, 575 + Math.sin(i * 1.3) * 30, 120, 22, Math.cos(i) * 0.3, 0, Math.PI * 2); ctx.fill(); } dep(k, 960, 420, 1.5, { color: '#3f7f9a', wire: false, r: Math.PI / 2 }); dep(k, 960, 515, 1.5, { color: '#3f7f9a', wire: false, r: Math.PI / 2 }); shade(k, 0.22, [{ x: 960, y: 400, r: 1200 }], { vig: 0 }); }
function thumb(k) {
  vframe(k, 960, () => bat(k, 1), { y0: 520 });
  vline(k, 'BÁT CƠM ĐỂ PHẦN,', 280, 0, { size: 88 });
  vline(k, 'SAO CÓ THÌA ĐẤT?', 400, 0, { size: 90, color: AMBER });
}
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Em tôi bị ma giấu, sáng ra bát cơm để phần có một thìa đất… #shorts',
    description: 'Em trai tôi mất tích lúc chơi trốn tìm. Bà tôi lấy cái mâm đồng méo trên vách xuống, đi khắp làng vừa gõ vừa gọi. Sáng ra, giữa bát cơm để phần có một thìa đất ướt.\n\nBản đầy đủ: Ma Giấu | Bảy Đứa Đi Trốn, Lúc Mở Mắt Tám Đứa Chạy Về, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu dựa trên tín ngưỡng dân gian.',
    links: [['▶ Bản đầy đủ: Ma Giấu', '127-ma-giau-bay-dua-di-tron']],
    tags: ['ma giấu', 'bị ma giấu', 'gõ mâm tìm người', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'magiau'],
    format: 'short', captions: true, gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '127-ma-giau-bay-dua-di-tron',
  },
  thumbnail: thumb,
  scenes: [
    {
      say: '{a}Em trai tôi mất tích lúc chơi trốn tìm. {b}Bà tôi lấy cái mâm đồng méo trên vách xuống, đi khắp làng, vừa đi vừa gõ.',
      sfx: [['gong', 'b', 0.35], ['gong', ['b', 1.6], 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 960, () => { bepVach(k); shade(k, 0.5, [{ x: 960, y: 520, r: 640, warm: 1, flicker: 1 }], { vig: 0 }); }); vline(k, 'MẤT TÍCH', 300, 'a', { size: 120, color: AMBER }); return; }
        vframe(k, 900, () => { ngoXom(k, { time: 'night' }); ch(k, 840, 985, 450, { ...BA, view: 'side', action: 'walk', face: 'blank', arms: 'hold' }); mamDong(k, 930, 780, 0.55, { ring: (k.t * 0.9) % 1 }); shade(k, 0.7, [{ x: 880, y: 760, r: 560, warm: 0.6 }], { vig: 0 }); }); vline(k, 'KENG. KENG. KENG.', 300, 'b', { size: 92, color: AMBER });
      },
    },
    {
      say: '{a}Ở làng tôi, người bị ma giấu thì phải gõ mâm gõ nồi mà gọi. {b}Các cụ bảo, người bị giấu chỉ còn nghe được tiếng kim khí. {c}Cả xóm khua vang cánh đồng suốt đêm.',
      sfx: [['gong', 'c', 0.3], ['gong', ['c', 1.8], 0.3]],
      draw(k) { vframe(k, 960, () => doan(k, k.at('a', Math.max(5, k.d), 'linear'))); vline(k, 'BỊ MA GIẤU', 300, 'a', { size: 112, color: AMBER }); },
    },
    {
      say: '{a}Gần sáng, công an xã xuống, loa xã đọc tin tìm trẻ lạc. Người ta chỉ thấy đôi dép nhựa xanh của nó, {b}xếp ngay ngắn trên bờ ao đầu xóm, hai mũi dép quay về phía vườn nhà tôi.',
      sfx: [['stinger', 'b', 0.45]],
      draw(k) { vframe(k, 960, () => ao(k)); vline(k, 'QUAY VỀ VƯỜN NHÀ TÔI', 300, 'b', { size: 84, color: AMBER }); },
    },
    {
      say: '{a}Tối hôm trước, bà tôi có xới một bát cơm để phần nó. {b}Sáng ra, giữa bát cơm trắng có một thìa đất ướt.',
      sfx: [['drip', 'b', 0.35], ['heartbeat', 'b', 0.4]],
      draw(k) { vframe(k, 960, () => bat(k, k.t > k.cue('b') ? 1 : 0)); vline(k, 'MỘT THÌA ĐẤT', 300, 'b', { size: 104, color: AMBER }); },
    },
    {
      say: '{a}Có thể là chuột. Có thể là ai đó. Nhưng bà tôi bảo, người bị ma giấu, nó cho ăn đất mà tưởng là cơm. {b}Ăn càng lâu, càng quên đường về.',
      sfx: [['heartbeat', 'b', 0.45]],
      draw(k) { vframe(k, 960, () => bat(k, 1)); vline(k, after(k, 'b') ? 'CÀNG QUÊN ĐƯỜNG VỀ' : 'ĂN ĐẤT TƯỞNG LÀ CƠM', 300, 'a', { size: 84, color: after(k, 'b') ? COLD : AMBER }); },
    },
    {
      say: '{a}Bà xới thêm một bát nữa, đặt lên bếp, rồi lại cầm cái mâm đồng ra ngõ. {b}Đêm thứ hai, đi tìm đứa em trai mất tích lúc chơi trốn tìm…',
      sfx: [['gong', 'a', 0.3], ['wind', 'b', 0.3]],
      draw(k) { if (k.t < k.cue('b')) { vframe(k, 960, () => bat(k, 0)); vline(k, 'THÊM MỘT BÁT NỮA', 300, 'a', { size: 96, color: AMBER }); return; } vframe(k, 960, () => doan(k, k.at('b', Math.max(4, k.d - k.cue('b')), 'linear'))); vline(k, 'ĐÊM THỨ HAI', 300, 'b', { size: 110, color: COLD }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
