// Hạt Bụi Xanh · tập 6 — Những Bí Ẩn Vũ Trụ Chưa Có Lời Giải (bảng nguồn: kich-ban.md, 14/11/2026)
// Thang leo: một tín hiệu 72 giây → một hòn đá ~400 m → một ngôi sao → một khoảng trống 330 triệu năm ánh sáng → 85% vật chất.
// Fact check (nguồn chính):
// - Tín hiệu Wow!: 15/8/1977, kính Big Ear (ĐH Bang Ohio), ~72 giây = thời gian một điểm trên trời trôi qua chùm thu khi Trái Đất quay;
//   "6EQUJ5" = cường độ theo từng khoảng 12 giây (6, 14, 26, 30, 19, 5 lần độ lệch nhiễu); gần 1420 MHz (vạch hydro).
//   Jerry Ehman khoanh đỏ và viết "Wow!" vài ngày sau. Cocconi & Morrison (1959, Nature) đề xuất tìm tín hiệu ở tần số hydro.
//   Tìm lại nhiều lần (Ehman; Gray & Marvel 2001 bằng VLA…) không thấy. Méndez et al. (2024, arXiv "Arecibo Wow!") — giả thuyết:
//   đám mây hydro lạnh bừng sáng do một đợt bức xạ (vd sao từ/magnetar) — CHƯA kiểm chứng.
// - ʻOumuamua (1I/2017 U1): phát hiện 19/10/2017, Robert Weryk, Pan-STARRS1 (Haleakalā, Hawaii); quỹ đạo hyperbol; độ sáng đổi ~10 lần,
//   chu kỳ ~7–8 giờ → rất dài hoặc dẹt; dài ước tính tới ~400 m (ESO). Gia tốc phi hấp dẫn (Micheli et al. 2018, Nature);
//   Spitzer không thấy khí (Trilling et al. 2018). Loeb & Bialy 2018 (cánh buồm ánh sáng, giả thuyết thiểu số);
//   Bergner & Seligman 2023 (Nature): hydro sinh ra trong băng nước do tia vũ trụ, thoát ra khi gần Mặt Trời — giả thuyết.
//   Vị khách liên sao sau: 2I/Borisov (2019), 3I/ATLAS (phát hiện 1/7/2025) — đều có khí/bụi như sao chổi.
// - Sao Tabby KIC 8462852: ~1.470 năm ánh sáng (Gaia), Kepler theo dõi ~150.000 sao (2009–2013); tối tới ~15% và ~22%, không chu kỳ;
//   Planet Hunters phát hiện; Boyajian et al. (2016, MNRAS; arXiv 9/2015). Ý tưởng "siêu cấu trúc" (J. Wright, 2015).
//   Kickstarter ~1.700 người ủng hộ; đợt tối 2017 tối hơn ở ánh sáng xanh → bụi hạt nhỏ (Boyajian et al. 2018, ApJL). Nguồn bụi: chưa rõ.
// - Khoảng trống Boötes: Kirshner, Oemler, Schechter & Shectman (1981); đường kính ~330 triệu năm ánh sáng; ~60 thiên hà tìm thấy;
//   Greg Aldering: nếu Ngân Hà ở giữa, mãi đến thập niên 1960 ta mới biết có thiên hà khác. Mô phỏng ΛCDM có khoảng trống cỡ này.
//   HUDF: mảnh trời bằng hạt cát ở tầm tay, ~10.000 thiên hà, phơi sáng ~11 ngày (NASA/ESA).
// - Vật chất tối: Zwicky 1933 (đám Coma); Rubin & Ford 1970 (Andromeda, đường cong quay phẳng); đám Viên Đạn (Clowe et al. 2006);
//   Planck 2018: vật chất thường ~5%, vật chất tối ~27%, năng lượng tối ~68% → vật chất tối ~85% vật chất.
//   LZ (Sanford Lab, ~1,5 km dưới đất, ~7 tấn xenon lỏng) chưa bắt được hạt nào (2022, 2024). Euclid (ESA, 2023), đài Vera C. Rubin (2025).
// - TON 618 (tập sau): ước tính ~40 tỷ lần khối lượng Mặt Trời → bán kính chân trời sự kiện ~790 AU ≈ 20 lần quỹ đạo Sao Diêm Vương (~40 AU).
import { P, fill, space, earth, bigNum, label, chip, chapterTag, scaleBar, dotGrid, landmark81, human, comet, solarSystem, countdown } from '/channel/hat-bui-xanh.js';
import * as thumbs from '/videos/106-nhung-bi-an-vu-tru-chua-co-loi-giai/thumbs.js';

const W = 1920, H = 1080;
const lerp = (a, b, p) => a + (b - a) * p;
const SRC = { bg: 'rgba(245,241,230,0.85)', size: 22 };
const MP = { bg: 'rgba(255,211,78,0.9)', size: 22 }; // nhãn MÔ PHỎNG / MINH HOẠ
// Ảnh Trái Đất thật (Apollo 17), cắt tròn theo đĩa.
const earthPhoto = (k, x, y, r) => { const s = r / 0.85; k.ctx.save(); k.ctx.beginPath(); k.ctx.arc(x, y, r, 0, Math.PI * 2); k.ctx.clip(); k.photo('trai-dat-that', x - s, y - s, s * 2, s * 2, { zoom: [1, 1] }); k.ctx.restore(); };
// Ảnh nhỏ trong khung viền kem.
const framed = (k, name, x, y, w, h, o = {}) => {
  if ((o.p ?? 1) <= 0) return;
  k.ctx.save(); k.ctx.globalAlpha *= o.p ?? 1;
  k.ctx.fillStyle = P.cream; k.ctx.fillRect(x - 8, y - 8, w + 16, h + 16);
  k.photo(name, x, y, w, h, { zoom: o.zoom ?? [1, 1.06], focus: o.focus, pan: o.pan, credit: o.credit });
  k.ctx.restore();
};
// Kính Big Ear (vẽ): mặt phản xạ phẳng nằm trên cánh đồng + tấm parabol dựng đứng.
function bigEar(k, x, y, s, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#5C6B7A'; ctx.beginPath(); ctx.moveTo(-420, 40); ctx.lineTo(420, 40); ctx.lineTo(320, -10); ctx.lineTo(-320, -10); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(200,215,230,0.35)'; ctx.lineWidth = 2;
  for (let i = -6; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(i * 50, -10); ctx.lineTo(i * 66, 40); ctx.stroke(); }
  ctx.fillStyle = '#7C8C9C'; ctx.beginPath(); ctx.moveTo(-340, -10); ctx.quadraticCurveTo(-360, -140, -330, -190); ctx.lineTo(330, -190); ctx.quadraticCurveTo(360, -140, 340, -10); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(14,26,43,0.5)'; ctx.lineWidth = 3; for (let i = -5; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(i * 62, -186); ctx.lineTo(i * 64, -12); ctx.stroke(); }
  ctx.fillStyle = '#9AA9B8'; ctx.fillRect(330, -260, 60, 300);
  ctx.restore();
  if (o.beam) { ctx.save(); ctx.globalAlpha = 0.18 * o.beam; ctx.fillStyle = P.gold; ctx.beginPath(); ctx.moveTo(x - 60 * s, y - 190 * s); ctx.lineTo(x - 260 * s, 0); ctx.lineTo(x + 140 * s, 0); ctx.closePath(); ctx.fill(); ctx.restore(); }
}
// Bãi cỏ đêm.
function nightField(k, y = 860) {
  space(k, { n: 220, top: '#05081A', bottom: '#14204A' });
  k.ctx.fillStyle = '#0D1A12'; k.ctx.beginPath(); k.ctx.moveTo(0, y); for (let x = 0; x <= W; x += 60) k.ctx.lineTo(x, y + 10 * Math.sin(x * 0.01)); k.ctx.lineTo(W, H); k.ctx.lineTo(0, H); k.ctx.fill();
}
// Giấy in ra từ máy tính: các cột số trôi lên; cột 'wow' hiện chuỗi 6EQUJ5.
function printout(k, x, y, w, h, shift, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  ctx.fillStyle = '#F4F1E4'; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = 'rgba(120,150,120,0.35)'; ctx.lineWidth = 2;
  for (let r = 0; r < 40; r++) { const yy = y + ((r * 34 - shift) % (h + 40) + h + 40) % (h + 40) - 20; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke(); }
  ctx.font = '600 30px "Courier New", monospace'; ctx.fillStyle = '#2A2A2A'; ctx.textBaseline = 'middle';
  const seq = '6EQUJ5';
  for (let r = 0; r < 40; r++) {
    const yy = y + ((r * 34 - shift) % (h + 40) + h + 40) % (h + 40) - 20;
    for (let c = 0; c < 12; c++) {
      let ch = k.rand(r * 31 + c) < 0.35 ? String(1 + Math.floor(k.rand(r * 17 + c + 900) * 3)) : '';
      if (o.wow && c === 3 && r >= 18 && r < 24) ch = seq[r - 18];
      if (ch) ctx.fillText(ch, x + 30 + c * (w - 60) / 12, yy);
    }
  }
  ctx.restore();
}
// Cột cường độ 6EQUJ5 (lần độ lệch nhiễu nền).
function wowBars(k, x, y, w, h, p, o = {}) {
  const vals = [6, 14, 26, 30, 19, 5], ch = '6EQUJ5', bw = w / 6;
  const { ctx } = k;
  ctx.strokeStyle = 'rgba(245,241,230,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  vals.forEach((v, i) => {
    const q = Math.max(0, Math.min(1, p * 6 - i));
    ctx.fillStyle = i === 3 ? P.gold : '#5FB0E8'; ctx.fillRect(x + i * bw + bw * 0.18, y + h - h * v / 32 * q, bw * 0.64, h * v / 32 * q);
    k.text(ch[i], x + i * bw + bw / 2, y + h + 50, { size: 56, font: 'title', color: P.cream, p: q });
    k.text(String(v), x + i * bw + bw / 2, y + h - h * v / 32 * q - 34, { size: 36, font: 'title', color: i === 3 ? P.gold : P.cream, p: q });
  });
  if (o.curve) {
    ctx.strokeStyle = P.red; ctx.lineWidth = 5; ctx.beginPath();
    for (let i = 0; i <= 100 * o.curve; i++) { const u = i / 100, g = Math.exp(-Math.pow((u - 0.52) / 0.2, 2)); (i ? ctx.lineTo : ctx.moveTo).call(ctx, x + u * w, y + h - h * 31 / 32 * g); }
    ctx.stroke();
  }
}
// Hòn đá dài lộn vòng (hình minh hoạ ʻOumuamua), tâm (x, y), dài len, góc ang.
function cigar(k, x, y, len, ang, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.beginPath(); ctx.ellipse(0, 0, len / 2, len / 2 * (o.ratio ?? 0.14), 0, 0, Math.PI * 2); ctx.fillStyle = '#6B4A3A'; ctx.fill();
  ctx.strokeStyle = P.ink; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(len * 0.05, len * 0.02, len * 0.42, len / 2 * (o.ratio ?? 0.14) * 0.5, 0, 0, Math.PI); ctx.fill();
  ctx.restore();
}
// Đồ thị độ sáng sao: hàm f(u) trả độ tối 0..1 tại u 0..1; khung (x, y, w, h), maxDip = độ tối lớn nhất của trục.
function fluxChart(k, x, y, w, h, f, p, o = {}) {
  const { ctx } = k; const maxDip = o.maxDip ?? 0.25;
  ctx.save(); ctx.strokeStyle = 'rgba(245,241,230,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  ctx.beginPath(); for (let i = 0; i <= 400 * p; i++) { const u = i / 400; (i ? ctx.lineTo : ctx.moveTo).call(ctx, x + u * w, y + h * 0.08 + (h * 0.84) * f(u) / maxDip); }
  ctx.strokeStyle = o.color ?? P.gold; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
}
const dip = (u, c, wd, d) => d * Math.exp(-Math.pow((u - c) / wd, 2));
// Trường thiên hà (chấm) với một khoảng trống tròn ở (vx, vy) bán kính vr; empty 0..1 độ trống.
function galaxyField(k, vx, vy, vr, empty, o = {}) {
  const n = o.n ?? 1400;
  for (let i = 0; i < n; i++) {
    // dồn chấm về các "sợi": lệch theo sin để thành mạng
    let x = k.rand(i + 7000) * W, y = k.rand(i + 7400) * H;
    const fx = Math.sin(x * 0.006 + Math.cos(y * 0.004) * 2), fy = Math.cos(y * 0.007 + Math.sin(x * 0.003) * 2);
    x += fx * 40; y += fy * 40;
    const d = Math.hypot(x - vx, y - vy);
    if (d < vr && k.rand(i + 7800) < empty * 0.97) continue;
    k.dot(x, y, 1.2 + 2.2 * k.rand(i + 8100), i % 7 ? '#CFE3FF' : '#FFE9B0', 0.35 + 0.5 * k.rand(i + 8200));
  }
}
// Thiên hà xoắn ốc nhỏ (vẽ), tâm (x, y), bán kính r, góc quay rot.
function spiral(k, x, y, r, rot = 0, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 0.35); g.addColorStop(0, 'rgba(255,240,200,0.95)'); g.addColorStop(1, 'rgba(255,220,160,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 0.35, 0, Math.PI * 2); ctx.fill();
  for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 70; i++) {
    const t = i / 70, a = rot + arm * Math.PI + t * 4.2, rr = r * (0.15 + 0.85 * t);
    k.dot(x + Math.cos(a) * rr, y + Math.sin(a) * rr * (o.tilt ?? 0.55), 2 + 2 * (1 - t), '#CFE3FF', 0.7 * (1 - t * 0.6));
  }
  ctx.restore();
}

export default {
  meta: {
    title: 'Những Bí Ẩn Vũ Trụ Chưa Có Lời Giải',
    description: 'Năm 1977, một kính thiên văn bắt được một tín hiệu vô tuyến kéo dài 72 giây, rồi không bao giờ nghe lại. Đó mới chỉ là bí ẩn đầu tiên.\n\nNăm bí ẩn vũ trụ khoa học vẫn chưa giải xong, mỗi bí ẩn lớn hơn bí ẩn trước: tín hiệu Wow!, vị khách liên sao ʻOumuamua tự tăng tốc, ngôi sao Tabby tối đi 22%, khoảng trống Boötes rộng 330 triệu năm ánh sáng, và vật chất tối chiếm 85% vật chất của vũ trụ. Với mỗi bí ẩn: điều đã biết chắc, giả thuyết đang được bàn, và điều vẫn còn bỏ ngỏ.',
    footer: '📚 Nguồn tham khảo\n• Ehman, Kraus – Big Ear Radio Observatory, tín hiệu Wow! (1977); Cocconi & Morrison (1959), Nature\n• Méndez et al. (2024), "Arecibo Wow!" (bản thảo arXiv) – giả thuyết đám mây hydro\n• Meech et al. (2017), Nature; Micheli et al. (2018), Nature; Bergner & Seligman (2023), Nature – ʻOumuamua\n• Boyajian et al. (2016), MNRAS; Boyajian et al. (2018), ApJ Letters – sao Tabby\n• Kirshner et al. (1981), ApJ – khoảng trống Boötes\n• Zwicky (1933); Rubin & Ford (1970), ApJ; Clowe et al. (2006), ApJ Letters – vật chất tối\n• Planck Collaboration (2018) – thành phần của vũ trụ\n• LZ Collaboration (2024) – tìm vật chất tối dưới lòng đất\n• NASA, ESA, ESO, NOIRLab\n\n🌍 Hạt Bụi Xanh — khoa học về những thứ khổng lồ, cổ xưa và đáng sợ trên hạt bụi xanh của chúng ta. Video mới mỗi ngày lúc 20:00.',
    links: [['▶ Tập trước: Rãnh Mariana: Thứ Gì Sống Ở Đáy Sâu 11 Km?', '093-ranh-mariana-thu-gi-song-o-day']],
    tags: ['bí ẩn vũ trụ', 'những bí ẩn vũ trụ chưa có lời giải', 'tín hiệu wow', 'oumuamua', 'sao tabby', 'khoảng trống boötes', 'vật chất tối', 'vũ trụ', 'thiên văn học', 'khoa học', 'hạt bụi xanh'],
    hashtags: ['biAnVuTru', 'vutru', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi',
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32, speakNumbers: false,
    lead: 0.35, tail: 0.8, pause: 0.35, transition: 'cut', camera: 0.04,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
  },
  thumbnail: thumbs.a,
  scenes: [
    // ================= MỞ ĐẦU =================
    {
      chapter: 'Mở đầu: 72 giây năm 1977',
      say: '{a}Đêm mười lăm tháng tám, năm 1977. Một cánh đồng ở bang Ohio, nước Mỹ. {b}Một kính thiên văn vô tuyến khổng lồ đang lặng lẽ lắng nghe bầu trời. {c}Không ai ở đó. Chỉ có một chiếc máy tính, in từng dòng số lên giấy.',
      draw(k) {
        k.group({ x: W / 2, y: H / 2, s: lerp(1.15, 1, k.at('a', 6, 'inOut')) }, () => { k.ctx.translate(-W / 2, -H / 2); nightField(k, 840); bigEar(k, 900, 880, 1.2, { beam: k.at('b', 2) }); });
        k.ctx.save(); k.ctx.globalAlpha = k.at('c', 0.8); printout(k, 1340, 160, 460, 760, k.t * 40); k.ctx.restore();
        countdown(k, '15/8/1977 · 22:16', { x: 70, y: 80, align: 'left', p: k.at('a', 0.6) });
      },
    },
    {
      say: '{a}Vài ngày sau, nhà thiên văn Jerry Ehman ngồi đọc lại xấp giấy in. {b}Rồi ông dừng lại ở một cột. Sáu, E, Q, U, J, năm. {c}Ông lấy bút đỏ khoanh lại. Và viết bên cạnh một chữ: Wow!',
      draw(k) {
        fill(k, '#000');
        const z = lerp(1.0, 1.9, k.at('b', 4, 'inOut'));
        k.photo('wow-in', 0, 0, W, H, { zoom: [z, z], pan: [[0.5, 0.5], [0.36, 0.47]], kp: k.at('b', 4, 'inOut') });
        chip(k, 'BIG EAR · NAAPO', 60, 70, SRC);
      },
    },
    {
      say: '{a}Đó là tín hiệu vô tuyến mạnh nhất và lạ nhất mà chương trình tìm kiếm sự sống ngoài Trái Đất ở đây từng bắt được. {b}Nó kéo dài bảy mươi hai giây. Rồi biến mất. {c}Gần năm mươi năm nay, chưa ai nghe lại nó lần nào.',
      draw(k) {
        space(k, { n: 200 });
        const p = k.at('a', 4);
        k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 6; k.ctx.beginPath();
        for (let x = 160; x <= 160 + 1600 * p; x += 4) { const u = (x - 160) / 1600, peak = Math.exp(-Math.pow((u - 0.5) / 0.07, 2)); const y = 560 - 300 * peak - 10 * Math.sin(x * 0.31) * (0.4 + peak); x === 160 ? k.ctx.moveTo(x, y) : k.ctx.lineTo(x, y); }
        k.ctx.stroke();
        bigNum(k, '72 GIÂY', W / 2, 800, 'b', { size: 130, color: P.cream });
        label(k, 'KHÔNG BAO GIỜ LẶP LẠI', W / 2, 940, 'c', { size: 56, color: P.gold });
      },
    },
    {
      say: '{a}Nhưng tín hiệu Wow chỉ là bí ẩn đầu tiên. {b}Trong video này, chúng ta sẽ đi qua năm bí ẩn vũ trụ mà khoa học vẫn chưa giải xong. Mỗi bí ẩn lớn hơn bí ẩn trước: {c}từ một tín hiệu bảy mươi hai giây, {d}một hòn đá lạ bay xuyên Hệ Mặt Trời, {e}một ngôi sao tự nhiên tối đi, {f}một khoảng trống khổng lồ giữa vũ trụ, {g}và cuối cùng là thứ chiếm tới tám mươi lăm phần trăm vật chất của vũ trụ.',
      draw(k) {
        space(k, { n: 160 });
        const items = [['c', '72 GIÂY', 'TÍN HIỆU'], ['d', '~400 M', 'HÒN ĐÁ'], ['e', '~2 TRIỆU KM', 'NGÔI SAO'], ['f', '330 TRIỆU NĂM AS', 'KHOẢNG TRỐNG'], ['g', '85%', 'VẬT CHẤT']];
        items.forEach(([c, n, t], i) => {
          const x = 230 + i * 365, y = 820 - i * 120, p = k.at(c, 0.6), g = k.at(k.cue('b', i * 0.7), 1.2);
          k.ctx.globalAlpha = 0.35 * g * (1 - p); k.ctx.fillStyle = 'rgba(95,176,232,0.5)'; k.ctx.fillRect(x - 160, lerp(H, y - 40, g), 320, H - lerp(H, y - 40, g));
          k.ctx.globalAlpha = p; k.ctx.fillStyle = i === 4 ? 'rgba(255,211,78,0.25)' : 'rgba(95,176,232,0.18)'; k.ctx.fillRect(x - 160, y - 40, 320, H - y + 40); k.ctx.globalAlpha = 1;
          label(k, t, x, y - 80, c, { size: 40, color: P.mute });
          bigNum(k, n, x, y, c, { size: i === 4 ? 90 : 52, color: i === 4 ? P.gold : P.cream });
        });
        label(k, '5 BÍ ẨN', W / 2, 120, 'b', { size: 70, color: P.cream });
      },
    },
    {
      say: '{a}Và đến cuối video, bạn sẽ biết vì sao bí ẩn lớn nhất không hề ở xa. {b}Nó có thể đang đi xuyên qua người bạn, ngay lúc này. {c}Đây là Hạt Bụi Xanh. Hãy bắt đầu với bảy mươi hai giây, năm 1977.',
      draw(k) {
        fill(k, '#05081A');
        for (let i = 0; i < 90; i++) { const y = (k.rand(i + 300) * H + k.t * (60 + 80 * k.rand(i))) % H; k.ctx.strokeStyle = `rgba(160,190,255,${0.15 + 0.25 * k.rand(i + 9)})`; k.ctx.lineWidth = 2; k.ctx.beginPath(); k.ctx.moveTo(k.rand(i) * W, y); k.ctx.lineTo(k.rand(i) * W - 30, y - 60); k.ctx.stroke(); }
        human(k, W / 2, 900, 520, { alpha: k.at('a', 1) });
        label(k, 'XUYÊN QUA BẠN?', W / 2, 160, 'b', { size: 70, color: P.gold });
      },
    },

    // ================= 1. TÍN HIỆU WOW =================
    {
      chapter: 'Bí ẩn 1: Tín hiệu Wow! đến từ đâu?',
      transition: 'fade',
      say: '{a}Kính thiên văn ấy tên là Big Ear, Tai Lớn. {b}Nó không giống chảo ăng-ten bạn hay thấy. Nó là một mặt kim loại rộng bằng khoảng ba sân bóng đá, nằm im trên mặt đất. {c}Nó không xoay. Trái Đất tự quay, và kéo bầu trời trôi qua tầm nghe của nó.',
      draw(k) {
        chapterTag(k, 'Bí ẩn 1 · Tín hiệu Wow!');
        nightField(k, 820);
        bigEar(k, 860, 860, 1.4);
        for (let i = 0; i < 3; i++) { const p = k.at('b', 0.6); k.ctx.globalAlpha = p * 0.8; k.ctx.strokeStyle = P.cream; k.ctx.lineWidth = 3; k.ctx.strokeRect(330 + i * 380, 1000, 360, 50); k.ctx.globalAlpha = 1; }
        label(k, '≈ 3 SÂN BÓNG ĐÁ', 900, 960, 'b', { size: 48, color: P.gold });
        const sweep = k.at('c', 6, 'linear');
        for (let i = 0; i < 40; i++) k.dot((k.rand(i + 50) * W + sweep * 500) % W, 120 + k.rand(i + 60) * 300, 3, '#FFE9B0', 0.8);
      },
    },
    {
      say: '{a}Vì thế, một nguồn sóng ở rất xa sẽ đi ngang qua tầm nghe trong đúng bảy mươi hai giây: mạnh dần, đạt đỉnh, rồi yếu dần. {b}Tín hiệu Wow làm đúng như vậy. {c}Đó là dấu hiệu nó đến từ bầu trời, chứ không phải từ một chiếc máy phát nào đó gần bên.',
      draw(k) {
        space(k, { n: 120 });
        wowBars(k, 460, 240, 1000, 520, k.at('b', 3), { curve: k.at('a', 4) });
        label(k, '72 GIÂY', 960, 880, 'a', { size: 50, color: P.red });
        label(k, 'TỪ BẦU TRỜI', 960, 150, 'c', { size: 60, color: P.gold });
      },
    },
    {
      say: '{a}Mỗi ký tự trong chuỗi sáu, E, Q, U, J, năm là độ mạnh của tín hiệu trong mười hai giây. {b}Chữ U nghĩa là mạnh gấp khoảng ba mươi lần mức nhiễu nền của vũ trụ.',
      draw(k) {
        fill(k, '#000');
        k.photo('wow-in', 0, 0, W, H, { zoom: [2.2, 2.35], pan: [[0.45, 0.456], [0.45, 0.456]], dim: 0.1 });
        k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 8; const p = k.at('b', 0.6); if (p > 0) { k.ctx.globalAlpha = p; k.ctx.beginPath(); k.ctx.arc(W / 2, H / 2, 85, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.globalAlpha = 1; }
        bigNum(k, 'U = ×30', 1500, 540, 'b', { size: 110, color: P.gold });
      },
    },
    {
      say: '{a}Nhưng điều khiến các nhà khoa học lạnh gáy là tần số. {b}Tín hiệu nằm sát một nghìn bốn trăm hai mươi megahertz, tần số mà nguyên tử hydro, nguyên tố phổ biến nhất vũ trụ, tự phát ra. {c}Từ năm 1959, đã có nhà khoa học đề xuất: nếu ai đó ngoài kia muốn gọi chúng ta, rất có thể họ sẽ gọi ở chính tần số này.',
      draw(k) {
        space(k, { n: 120 });
        k.ctx.strokeStyle = 'rgba(245,241,230,0.35)'; k.ctx.lineWidth = 3; k.ctx.beginPath(); k.ctx.moveTo(160, 760); k.ctx.lineTo(1760, 760); k.ctx.stroke();
        for (let i = 0; i <= 8; i++) label(k, String(1000 + i * 100), 160 + i * 200, 810, 'a', { size: 30, color: P.mute });
        const x0 = 160 + 4.2 * 200;
        k.ctx.fillStyle = `rgba(255,211,78,${0.8 * k.at('b', 0.8)})`; k.ctx.fillRect(x0 - 6, 300, 12, 460);
        k.dot(x0, 250, 36, '#5FB0E8', k.at('b', 0.6)); label(k, 'H', x0, 250, 'b', { size: 44 });
        bigNum(k, '1.420 MHz', x0, 160, 'b', { size: 90, color: P.gold });
        label(k, '"HỌ SẼ GỌI Ở ĐÂY?" · 1959', W / 2, 940, 'c', { size: 52, color: P.cream });
      },
    },
    {
      say: '{a}Ehman và đồng nghiệp quay lại nghe đúng hướng ấy, trong chòm sao Nhân Mã, hàng chục lần. {b}Những năm sau, các kính thiên văn lớn hơn ở nhiều nơi trên thế giới cũng thử. {c}Không có gì.',
      draw(k) {
        fill(k, '#000');
        k.clip('dia-vo-tuyen', 0, 0, W, H, { at: 0, zoom: [1, 1.05], dim: 0.25 });
        chip(k, 'KÍNH VÔ TUYẾN EFFELSBERG · ĐỨC', 60, 70, SRC);
        bigNum(k, 'KHÔNG CÓ GÌ', W / 2, 860, 'c', { size: 120, color: P.cream });
      },
    },
    {
      say: '{a}Vậy đó là người ngoài hành tinh? {b}Năm 2024, một nhóm nhà khoa học ở Puerto Rico đưa ra một lời giải khác. {c}Lục lại dữ liệu cũ của kính Arecibo, họ tìm thấy những tín hiệu rất giống Wow, chỉ yếu hơn, phát ra từ những đám mây hydro lạnh giữa các vì sao.',
      draw(k) {
        space(k, { n: 160 });
        const g = k.ctx.createRadialGradient(1100, 520, 20, 1100, 520, 380); g.addColorStop(0, `rgba(95,176,232,${0.45 * k.at('c', 1)})`); g.addColorStop(1, 'rgba(95,176,232,0)');
        k.ctx.fillStyle = g; k.ctx.beginPath(); k.ctx.arc(1100, 520, 380, 0, Math.PI * 2); k.ctx.fill();
        for (let i = 0; i < 4; i++) { const p = k.at(k.cue('c', 1 + i * 0.7), 0.8); wowBarsMini(k, 300 + i * 120, 820, p); }
        label(k, 'MÂY HYDRO LẠNH', 1100, 520, 'c', { size: 54, color: P.cream });
        label(k, '2024 · DỮ LIỆU ARECIBO', 520, 950, 'b', { size: 44, color: P.mute });
        bigNum(k, 'NGƯỜI NGOÀI HÀNH TINH?', W / 2, 150, 'a', { size: 76, color: P.gold, p: k.at('a', 0.5) * (1 - k.at('b', 0.6)) });
      },
    },
    {
      say: '{a}Giả thuyết của họ: một chớp năng lượng cực mạnh, có thể từ xác một ngôi sao đã chết, quét qua một đám mây hydro, làm nó bừng sáng trong chốc lát. {b}Nếu đúng, Wow là một hiện tượng tự nhiên hiếm thấy, chứ không phải một lời chào. {c}Nhưng giả thuyết này chưa được kiểm chứng. Và tín hiệu kia vẫn chưa bao giờ quay lại.',
      draw(k) {
        space(k, { n: 160 });
        const f = k.at('a', 3), r = 40 + 900 * f;
        k.dot(380, 540, 22, '#FFFFFF', 1);
        k.ctx.strokeStyle = `rgba(255,255,255,${0.6 * (1 - f)})`; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.arc(380, 540, r, -0.5, 0.5); k.ctx.stroke();
        const lit = r > 820 ? Math.max(0, 1 - (k.t - k.cue('a', 2.6)) * 0.4) : 0;
        const g = k.ctx.createRadialGradient(1300, 540, 20, 1300, 540, 300); g.addColorStop(0, `rgba(95,176,232,${0.25 + 0.6 * lit})`); g.addColorStop(1, 'rgba(95,176,232,0)');
        k.ctx.fillStyle = g; k.ctx.beginPath(); k.ctx.arc(1300, 540, 300, 0, Math.PI * 2); k.ctx.fill();
        label(k, 'XÁC SAO', 380, 640, 'a', { size: 40, color: P.mute });
        chip(k, 'GIẢ THUYẾT', 60, 70, MP);
        bigNum(k, 'CHƯA KIỂM CHỨNG', W / 2, 900, 'c', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Bốn mươi năm sau tín hiệu Wow, một vị khách khác ghé thăm. {b}Lần này, nó không phải là sóng. {c}Nó là một vật thể thật, bay xuyên qua Hệ Mặt Trời.',
      draw(k) {
        space(k, { n: 160 });
        const p = k.at('c', 4, 'linear');
        solarSystem(k, W / 2, 560, 420, { n: 5, speed: 0.1 });
        k.dot(lerp(-50, W + 50, p), lerp(80, 980, p) - 300 * Math.sin(p * Math.PI) * 0.6, 7, '#FFB27A', k.at('c', 0.4));
        label(k, '2017', W / 2, 120, 'a', { size: 70, color: P.gold });
      },
    },

    // ================= 2. ʻOUMUAMUA =================
    {
      chapter: 'Bí ẩn 2: Vị khách tự tăng tốc',
      transition: 'fade',
      say: '{a}Ngày mười chín tháng mười, năm 2017. Trên đỉnh một ngọn núi lửa ở Hawaii, kính thiên văn Pan-STARRS {b}bắt được một chấm sáng nhỏ, di chuyển nhanh bất thường.',
      draw(k) {
        chapterTag(k, 'Bí ẩn 2 · ʻOumuamua');
        fill(k, '#000');
        k.photo('pan-starrs', 0, 0, W, H, { zoom: [1.0, 1.3], pan: [[0.45, 0.5], [0.3, 0.42]], kp: k.at(0, k.cue('b') + 0.5, 'linear'), p: 1 - k.at('b', 0.8) });
        k.photo('oumuamua-that', 0, 0, W, H, { zoom: [1.1, 1.25], p: k.at('b', 0.8), fx: 'fade', credit: false });
        chip(k, k.t < k.cue('b') ? 'PAN-STARRS · HAWAII' : 'KÍNH WILLIAM HERSCHEL · 10/2017', 60, 1010, SRC);
        countdown(k, '19/10/2017', { x: W - 60, y: 80, p: k.at('a', 0.6) });
      },
    },
    {
      say: '{a}Tính quỹ đạo của nó, các nhà thiên văn sững sờ. {b}Nó không quay quanh Mặt Trời. {c}Nó đến từ ngoài Hệ Mặt Trời, lướt qua một lần, và đang bay đi mãi mãi. {d}Đây là vật thể đầu tiên từ một hệ sao khác mà loài người từng thấy.',
      draw(k) {
        space(k, { n: 120 });
        solarSystem(k, 1100, 560, 380, { n: 6, speed: 0.08 });
        const { ctx } = k; const p = k.at('a', 7, 'inOut');
        ctx.strokeStyle = P.orange; ctx.lineWidth = 4; ctx.setLineDash([14, 10]); ctx.beginPath();
        for (let i = 0; i <= 100 * p; i++) { const u = i / 100 * 2 - 1; const x = 1100 + 120 - 900 * u * u, y = 560 + 700 * u * 0.9; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.stroke(); ctx.setLineDash([]);
        bigNum(k, 'TỪ NGOÀI HỆ MẶT TRỜI', W / 2, 120, 'd', { size: 76, color: P.gold });
      },
    },
    {
      say: '{a}Người ta đặt tên nó là ʻOumuamua, tiếng Hawaii nghĩa là sứ giả từ phương xa, đến đầu tiên. {b}Và đây là toàn bộ những gì kính thiên văn thấy được: một chấm sáng. {c}Chưa ai từng chụp được hình dáng thật của nó.',
      draw(k) {
        fill(k, '#000');
        const z = lerp(1.0, 2.4, k.at('b', 4, 'inOut'));
        k.photo('oumuamua-that', 0, 0, W, H, { zoom: [z, z], pan: [[0.5, 0.5], [0.5, 0.48]], kp: k.at('b', 4, 'inOut'), credit: 'A. Fitzsimmons (QUB) · Isaac Newton Group' });
        k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 6; const p = k.at('b', 1); if (p > 0) { k.ctx.globalAlpha = p; k.ctx.beginPath(); k.ctx.arc(W / 2, H / 2 - 8, 70, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.globalAlpha = 1; }
        bigNum(k, 'ʻOUMUAMUA', W / 2, 160, 'a', { size: 110, color: P.cream });
      },
    },
    {
      say: '{a}Nhưng độ sáng của chấm ấy thay đổi rất mạnh, chênh nhau gần mười lần, cứ khoảng bảy, tám giờ lặp lại. {b}Chỉ có một cách giải thích: nó đang lộn vòng, và nó dài hơn rộng rất nhiều, như một điếu xì gà, hoặc một chiếc bánh kếp mỏng. {c}Dài có thể tới bốn trăm mét, gần bằng tòa Landmark 81.',
      draw(k) {
        space(k, { n: 100 });
        fluxChart(k, 140, 160, 760, 300, (u) => 0.5 + 0.5 * Math.cos(u * Math.PI * 8), k.at('a', 4), { maxDip: 1.1, color: '#5FB0E8' });
        label(k, 'ĐỘ SÁNG ~×10', 520, 520, 'a', { size: 44, color: '#5FB0E8' });
        cigar(k, 520, 800, 520, k.gt * 0.9, { alpha: k.at('b', 0.6) });
        chip(k, 'MINH HOẠ', 380, 960, { ...MP, p: k.at('b', 0.6) });
        landmark81(k, 1420, 1000, 520 * 461 / 400, { alpha: k.at('c', 0.6) });
        cigar(k, 1420, 1000 - 520 * 461 / 400 * 0.45, 520, -Math.PI / 2, { alpha: k.at('c', 0.6), ratio: 0.12 });
        label(k, '~400 M  ·  LANDMARK 81: 461 M', 1420, 1040, 'c', { size: 36, color: P.gold });
      },
    },
    {
      say: '{a}Các nhà khoa học hình dung nó thế này: một khối đá dài, màu đỏ sẫm, lộn vòng chậm rãi trong bóng tối. {b}Nó đã trôi giữa các vì sao có thể hàng trăm triệu năm, trước khi lướt qua chúng ta.',
      draw(k) {
        fill(k, '#000');
        k.clip('oumuamua-mp', 0, 0, W, H, { at: 0, zoom: [1, 1.04] });
        chip(k, 'MÔ PHỎNG · ESO / M. KORNMESSER', 60, 70, MP);
      },
    },
    {
      say: '{a}Rồi đến điều kỳ lạ nhất. {b}Khi rời xa Mặt Trời, ʻOumuamua chạy nhanh hơn một chút so với mức lực hấp dẫn cho phép. {c}Như thể có ai đó khẽ đẩy nó từ phía sau.',
      draw(k) {
        space(k, { n: 120 });
        k.dot(260, 760, 60, P.gold, 1); label(k, 'MẶT TRỜI', 260, 860, 'a', { size: 34, color: P.mute });
        const { ctx } = k; const p = k.at('b', 4, 'inOut');
        const path = (dy, col, dash) => { ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.setLineDash(dash); ctx.beginPath(); for (let i = 0; i <= 80 * p; i++) { const u = i / 80; const x = 420 + u * 1300, y = 700 - u * 380 - dy * u * u; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.setLineDash([]); };
        path(0, 'rgba(245,241,230,0.5)', [12, 10]);
        path(160, P.orange, []);
        label(k, 'CHỈ CÓ LỰC HẤP DẪN', 1500, 430, 'b', { size: 36, color: P.mute, p: k.at('b', 4) > 0.95 ? 1 : 0 });
        label(k, 'THỰC TẾ', 1650, 200, 'b', { size: 44, color: P.orange, p: k.at('b', 4) > 0.95 ? 1 : 0 });
        bigNum(k, 'AI ĐẨY NÓ?', W / 2, 960, 'c', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Sao chổi làm được điều này. Băng trên sao chổi bốc hơi, phụt khí ra như một động cơ nhỏ, và để lại cái đuôi dài thế này. {b}Nhưng ʻOumuamua không có đuôi, không có đám khí nào. {c}Ngay cả kính thiên văn không gian Spitzer cũng không thấy gì.',
      draw(k) {
        fill(k, '#000');
        const half = k.at('b', 0.8);
        k.photo('sao-choi', 0, 0, W, H, { zoom: [1.05, 1.15], pan: [[0.5, 0.55], [0.4, 0.6]] });
        chip(k, 'SAO CHỔI NEOWISE · 2020', 60, 70, SRC);
        if (half > 0) {
          k.ctx.save(); k.ctx.globalAlpha = half; k.ctx.fillStyle = '#04060E'; k.ctx.fillRect(W / 2, 0, W / 2, H); k.ctx.restore();
          cigar(k, W * 0.75, 520, 360, 0.3 + k.gt * 0.5, { alpha: half });
          label(k, 'ʻOUMUAMUA: KHÔNG ĐUÔI', W * 0.75, 860, 'b', { size: 52, color: P.gold });
          k.ctx.fillStyle = P.cream; k.ctx.globalAlpha = half; k.ctx.fillRect(W / 2 - 3, 0, 6, H); k.ctx.globalAlpha = 1;
        }
      },
    },
    {
      say: '{a}Một nhà thiên văn ở đại học Harvard, Avi Loeb, đã nói thẳng: có thể đây là một cánh buồm ánh sáng, do một nền văn minh khác làm ra. {b}Phần lớn các nhà khoa học không đồng ý. Họ tìm một lời giải tự nhiên hơn.',
      draw(k) {
        space(k, { n: 140 });
        const { ctx } = k; const a = k.gt * 0.4;
        ctx.save(); ctx.translate(W / 2, 520); ctx.rotate(0.3);
        ctx.fillStyle = 'rgba(200,215,230,0.85)'; ctx.beginPath(); ctx.ellipse(0, 0, 320, 320 * Math.abs(Math.cos(a)) * 0.9 + 6, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        for (let i = 0; i < 12; i++) { ctx.strokeStyle = 'rgba(255,211,78,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 200 + i * 60); ctx.lineTo(W / 2 - 340, 300 + i * 40); ctx.stroke(); }
        chip(k, 'GIẢ THUYẾT · ÍT NGƯỜI ỦNG HỘ', 60, 70, MP);
        bigNum(k, 'CÁNH BUỒM ÁNH SÁNG?', W / 2, 920, 'a', { size: 84, color: P.cream });
      },
    },
    {
      say: '{a}Năm 2023, hai nhà khoa học Mỹ đưa ra một lời giải đơn giản hơn. ʻOumuamua có thể là một khối băng nước. {b}Trên đường bay hàng triệu năm, tia vũ trụ đã biến một phần băng thành khí hydro, bị giữ lại bên trong. {c}Khi đến gần Mặt Trời, hydro thoát ra, đủ để đẩy nó đi, nhưng quá loãng để kính thiên văn nhìn thấy.',
      draw(k) {
        space(k, { n: 100 });
        cigar(k, 900, 540, 640, 0.15, { ratio: 0.16 });
        for (let i = 0; i < 30; i++) { const q = k.at(k.cue('b', 0.1 * i), 0.4); k.dot(700 + k.rand(i + 10) * 400, 520 + (k.rand(i + 20) - 0.5) * 60, 4, '#9FD8EA', q * 0.9); }
        for (let i = 0; i < 26; i++) { const t = (k.t - k.cue('c') + i * 0.15) % 2.5; if (k.t < k.cue('c')) continue; k.dot(1240 + t * 260, 560 + (k.rand(i) - 0.5) * 140 * t, 3, '#CFE8F0', Math.max(0, 0.35 - t * 0.12)); }
        label(k, 'BĂNG NƯỚC', 900, 760, 'a', { size: 48 });
        label(k, 'H₂ BỊ GIỮ BÊN TRONG', 900, 840, 'b', { size: 44, color: '#9FD8EA' });
        label(k, 'HYDRO THOÁT RA → LỰC ĐẨY', 1300, 300, 'c', { size: 46, color: P.gold });
        chip(k, 'GIẢ THUYẾT · NATURE 2023', 60, 70, MP);
      },
    },
    {
      say: '{a}Đó là lời giải được nhiều người chấp nhận nhất hiện nay. Nhưng ʻOumuamua đã bay quá xa để kiểm tra lại. {b}Từ đó, loài người đã thấy thêm hai vị khách từ các hệ sao khác: {c}sao chổi Borisov năm 2019, {d}và 3I/ATLAS năm 2025. Cả hai đều có khí và bụi như sao chổi. {e}ʻOumuamua vẫn là vị khách lạ nhất.',
      draw(k) {
        fill(k, '#03060E');
        const far = k.at('a', k.cue('b') - k.cue('a'), 'linear');
        if (far < 1) { k.ctx.save(); k.ctx.globalAlpha = 1 - k.at('b', 0.6); k.photo('oumuamua-that', 0, 0, W, H, { zoom: [lerp(2.4, 1.0, far), lerp(2.4, 1.0, far)], kp: far, credit: false }); k.ctx.restore(); }
        label(k, 'ĐÃ BAY QUÁ XA', W / 2, 960, 'a', { size: 60, color: P.gold, p: k.at('a', 0.6) * (1 - k.at('b', 0.5)) });
        framed(k, 'borisov', 140, 230, 760, 553, { p: k.at('c', 0.6), focus: [0.5, 0.55] });
        framed(k, 'atlas', 1020, 230, 760, 575, { p: k.at('d', 0.6), focus: [0.5, 0.5] });
        label(k, '2I/BORISOV · 2019', 520, 880, 'c', { size: 46 });
        label(k, '3I/ATLAS · 2025', 1400, 880, 'd', { size: 46 });
        chip(k, 'HUBBLE · NASA/ESA', 60, 70, { ...SRC, p: k.at('c', 0.6) });
        bigNum(k, 'ʻOUMUAMUA VẪN LẠ NHẤT', W / 2, 990, 'e', { size: 70, color: P.gold });
      },
    },
    {
      say: '{a}Một hòn đá lạ thì còn có thể giải thích. {b}Nhưng nếu cả một ngôi sao, lớn hơn Mặt Trời, tự nhiên tối đi một phần năm, thì sao?',
      draw(k) {
        space(k, { n: 140 });
        const d = k.at('b', 3);
        const g = k.ctx.createRadialGradient(W / 2, 540, 10, W / 2, 540, 300); g.addColorStop(0, `rgba(255,240,200,${1 - 0.22 * d})`); g.addColorStop(0.35, `rgba(255,200,110,${0.8 - 0.2 * d})`); g.addColorStop(1, 'rgba(255,160,60,0)');
        k.ctx.fillStyle = g; k.ctx.beginPath(); k.ctx.arc(W / 2, 540, 300, 0, Math.PI * 2); k.ctx.fill();
        bigNum(k, '−22%?', W / 2, 920, 'b', { size: 120, color: P.gold });
      },
    },

    // ================= 3. SAO TABBY =================
    {
      chapter: 'Bí ẩn 3: Ngôi sao tự tối đi',
      transition: 'fade',
      say: '{a}Năm 2009, NASA phóng kính thiên văn Kepler lên vũ trụ. {b}Nhiệm vụ của nó: nhìn chằm chằm vào khoảng một trăm năm mươi nghìn ngôi sao, để bắt những lần sao tối đi một chút, khi có hành tinh đi ngang qua.',
      draw(k) {
        chapterTag(k, 'Bí ẩn 3 · Sao Tabby');
        fill(k, '#000');
        k.photo('kepler-phong', 0, 0, W, H, { zoom: [1.0, 1.12], pan: [[0.5, 0.35], [0.5, 0.5]] });
        chip(k, 'NASA · 3/2009', 60, 1010, SRC);
        bigNum(k, '~150.000 SAO', 1500, 540, 'b', { size: 90, color: P.cream });
      },
    },
    {
      say: '{a}Một hành tinh cỡ Sao Mộc chỉ làm sao tối đi khoảng một phần trăm, đều đặn như đồng hồ. {b}Nhưng có một ngôi sao, cách chúng ta gần một nghìn năm trăm năm ánh sáng, làm điều không ai hiểu nổi.',
      draw(k) {
        space(k, { n: 80 });
        fluxChart(k, 160, 200, 1600, 300, (u) => dip(u, 0.2, 0.012, 0.01) + dip(u, 0.5, 0.012, 0.01) + dip(u, 0.8, 0.012, 0.01), k.at('a', 4), { maxDip: 0.25, color: '#5FB0E8' });
        label(k, 'HÀNH TINH: −1%, ĐỀU ĐẶN', 960, 560, 'a', { size: 44, color: '#5FB0E8' });
        label(k, 'KIC 8462852 · ~1.470 NĂM ÁNH SÁNG', 960, 800, 'b', { size: 54, color: P.gold });
      },
    },
    {
      say: '{a}Có lúc nó tối đi mười lăm phần trăm. {b}Có lúc hai mươi hai phần trăm. {c}Không theo nhịp nào cả. Có lần tối kéo dài nhiều ngày, có lúc hàng loạt lần tối nhỏ nối nhau, lộn xộn.',
      draw(k) {
        space(k, { n: 80 });
        const f = (u) => dip(u, 0.22, 0.015, 0.15) + dip(u, 0.74, 0.02, 0.22) + dip(u, 0.79, 0.012, 0.08) + dip(u, 0.83, 0.01, 0.05) + dip(u, 0.87, 0.015, 0.1);
        fluxChart(k, 160, 160, 1600, 640, f, lerp(0, 1, k.at('a', 9, 'linear')), { maxDip: 0.25, color: P.gold });
        label(k, '−15%', 160 + 0.22 * 1600, 820, 'a', { size: 48, color: P.cream, p: k.at(k.cue('a', 1.5), 0.5) });
        label(k, '−22%', 160 + 0.74 * 1600, 980, 'b', { size: 60, color: P.red });
        chip(k, 'DỮ LIỆU KEPLER · BOYAJIAN 2016', 60, 70, SRC);
      },
    },
    {
      say: '{a}Người phát hiện ra điều này đầu tiên không phải các nhà khoa học, mà là những người tình nguyện, ngồi ở nhà xem dữ liệu Kepler trong dự án Planet Hunters. {b}Năm 2015, nhà thiên văn Tabetha Boyajian công bố nghiên cứu về ngôi sao này. Từ đó, người ta gọi nó là sao Tabby.',
      draw(k) {
        fill(k, '#03060E');
        for (let i = 0; i < 6; i++) { const x = 200 + i * 260; k.ctx.fillStyle = '#1B2550'; k.ctx.fillRect(x, 520, 200, 130); fluxChart(k, x + 20, 540, 160, 90, (u) => dip(u, 0.5 + 0.1 * Math.sin(i), 0.04, 0.15), k.at(k.cue('a', i * 0.4), 1), { maxDip: 0.2, color: P.gold }); human(k, x + 100, 860, 190, { alpha: k.at(k.cue('a', i * 0.4), 0.6) }); }
        bigNum(k, 'SAO TABBY', W / 2, 260, 'b', { size: 120, color: P.cream });
        label(k, 'PLANET HUNTERS · NGƯỜI TÌNH NGUYỆN', W / 2, 960, 'a', { size: 44, color: P.mute });
      },
    },
    {
      say: '{a}Rồi một ý tưởng gây chấn động. {b}Liệu có một nền văn minh đang xây những tấm thu năng lượng khổng lồ quanh ngôi sao của họ, che bớt ánh sáng? {c}Một siêu cấu trúc của người ngoài hành tinh. Báo chí khắp thế giới đưa tin.',
      draw(k) {
        space(k, { n: 140 });
        const g = k.ctx.createRadialGradient(W / 2, 540, 10, W / 2, 540, 220); g.addColorStop(0, 'rgba(255,240,200,1)'); g.addColorStop(1, 'rgba(255,170,70,0)');
        k.ctx.fillStyle = g; k.ctx.beginPath(); k.ctx.arc(W / 2, 540, 220, 0, Math.PI * 2); k.ctx.fill();
        for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2 + k.gt * 0.1, r = 330 + 30 * Math.sin(i * 1.7); const q = k.at(k.cue('b', i * 0.12), 0.4); k.ctx.save(); k.ctx.translate(W / 2 + Math.cos(a) * r, 540 + Math.sin(a) * r * 0.5); k.ctx.rotate(a); k.ctx.globalAlpha = q; k.ctx.fillStyle = '#3B4A63'; k.ctx.fillRect(-50, -20, 100, 40); k.ctx.strokeStyle = '#9FB4D0'; k.ctx.lineWidth = 2; k.ctx.strokeRect(-50, -20, 100, 40); k.ctx.restore(); }
        chip(k, 'GIẢ THUYẾT · MINH HOẠ', 60, 70, MP);
        bigNum(k, 'SIÊU CẤU TRÚC?', W / 2, 960, 'c', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Câu trả lời đến từ chính những người yêu thiên văn. {b}Hơn một nghìn bảy trăm người góp tiền, để các đài thiên văn theo dõi ngôi sao này liên tục. {c}Năm 2017, nó lại tối đi. Và lần này, họ đo được ở nhiều màu ánh sáng khác nhau.',
      draw(k) {
        fill(k, '#03060E');
        dotGrid(k, 260, 200, 1400, 480, 1700, k.at('b', 3), { color: P.gold });
        bigNum(k, '> 1.700 NGƯỜI GÓP TIỀN', W / 2, 820, 'b', { size: 84, color: P.cream });
        label(k, '2017: ĐO NHIỀU MÀU ÁNH SÁNG', W / 2, 960, 'c', { size: 52, color: '#5FB0E8' });
      },
    },
    {
      say: '{a}Ánh sáng xanh bị chặn nhiều hơn ánh sáng đỏ. {b}Một tấm pin khổng lồ, đặc và to, sẽ chặn mọi màu như nhau. {c}Chỉ có những hạt bụi cực nhỏ mới chặn ánh sáng xanh mạnh hơn. Vậy thủ phạm là bụi.',
      draw(k) {
        space(k, { n: 80 });
        const bars = [['XANH', '#5FB0E8', 0.9], ['LỤC', '#3BA55C', 0.7], ['ĐỎ', '#E5383B', 0.45]];
        bars.forEach(([t, c, v], i) => { const q = k.at('a', 2); k.ctx.fillStyle = c; k.ctx.fillRect(300 + i * 220, 760 - 460 * v * q, 150, 460 * v * q); label(k, t, 375 + i * 220, 820, 'a', { size: 40 }); });
        label(k, 'MỨC BỊ CHẶN', 595, 220, 'a', { size: 44, color: P.mute });
        bigNum(k, 'TẤM PIN: ĐỀU NHAU', 1400, 400, 'b', { size: 60, color: P.mute });
        bigNum(k, 'BỤI!', 1400, 620, 'c', { size: 170, color: P.gold });
      },
    },
    {
      say: '{a}Nhưng bụi từ đâu ra? {b}Vì sao nhiều đến thế, và vì sao nó che sáng lộn xộn như vậy? Một đàn sao chổi vỡ vụn? Mảnh vỡ của một mặt trăng bị xé nát? {c}Đến hôm nay, vẫn chưa ai biết chắc.',
      draw(k) {
        fill(k, '#000');
        k.photo('tabby-webb', 0, 0, W, H, { zoom: [1.0, 1.15] });
        chip(k, 'SAO TABBY · KÍNH JAMES WEBB (HỒNG NGOẠI)', 60, 70, SRC);
        for (let i = 0; i < 160; i++) { const a = k.rand(i + 30) * Math.PI * 2 + k.gt * 0.05, r = 200 + 160 * k.rand(i + 40); k.dot(W / 2 + Math.cos(a) * r * 1.6, H / 2 + Math.sin(a) * r * 0.5, 2 + 3 * k.rand(i), '#C9A27A', 0.5 * k.at('b', 1)); }
        bigNum(k, 'BỤI TỪ ĐÂU?', W / 2, 960, 'c', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Giờ hãy lùi ra xa hơn nữa. {b}Xa đến mức mỗi chấm sáng không còn là một ngôi sao, mà là cả một thiên hà.',
      draw(k) {
        fill(k, '#000');
        k.clip('hubble-zoom', 0, 0, W, H, { at: 0, zoom: [1, 1.02] });
        chip(k, 'HUBBLE · NASA/ESA', 60, 70, SRC);
      },
    },

    // ================= 4. KHOẢNG TRỐNG BOÖTES =================
    {
      chapter: 'Bí ẩn 4: Khoảng trống lớn nhất',
      transition: 'fade',
      say: '{a}Đây là một mảnh trời chỉ bằng hạt cát cầm ở đầu ngón tay, khi bạn duỗi thẳng tay. Kính Hubble đã nhìn vào nó suốt khoảng mười một ngày. {b}Gần như mọi chấm sáng bạn thấy là một thiên hà. Mỗi thiên hà có hàng tỷ ngôi sao.',
      draw(k) {
        chapterTag(k, 'Bí ẩn 4 · Khoảng trống Boötes');
        fill(k, '#000');
        k.photo('hubble-sau', 0, 0, W, H, { zoom: [1.0, 1.25], pan: [[0.5, 0.5], [0.55, 0.45]] });
        chip(k, 'HUBBLE ULTRA DEEP FIELD · NASA/ESA', 60, 1010, SRC);
        bigNum(k, '~10.000 THIÊN HÀ', W / 2, 160, 'b', { size: 90, color: P.cream });
      },
    },
    {
      say: '{a}Ở quy mô lớn nhất, các thiên hà không rải đều. {b}Chúng tụ thành những sợi dài, nối nhau như một tấm lưới. Các nhà khoa học gọi nó là mạng vũ trụ. {c}Giữa các sợi là những khoảng trống mênh mông.',
      draw(k) {
        fill(k, '#000');
        k.photo('mang-vu-tru', 0, 0, W, H, { zoom: [1.3, 1.5], pan: [[0.5, 0.32], [0.45, 0.3]] });
        chip(k, 'MÔ HÌNH MẠNG VŨ TRỤ · NASA/ESA', 60, 70, MP);
        label(k, 'MẠNG VŨ TRỤ', W / 2, 960, 'b', { size: 70, color: P.cream });
      },
    },
    {
      say: '{a}Năm 1981, nhà thiên văn Robert Kirshner và đồng nghiệp phát hiện một khoảng trống, về phía chòm sao Mục Phu. {b}Người ta gọi nó là khoảng trống Boötes. {c}Nó rộng khoảng ba trăm ba mươi triệu năm ánh sáng.',
      draw(k) {
        fill(k, '#03060E');
        galaxyField(k, 960, 540, 380, k.at('a', 4, 'inOut'));
        k.ctx.strokeStyle = P.gold; k.ctx.lineWidth = 4; k.ctx.setLineDash([16, 12]); const p = k.at('b', 1.5); k.ctx.beginPath(); k.ctx.arc(960, 540, 380, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); k.ctx.stroke(); k.ctx.setLineDash([]);
        bigNum(k, 'BOÖTES', 960, 540, 'b', { size: 110, color: P.cream });
        scaleBar(k, 580, 1340, 990, '~330 TRIỆU NĂM ÁNH SÁNG', { p: k.at('c', 1.2) });
        chip(k, 'MINH HOẠ', 60, 70, MP);
      },
    },
    {
      say: '{a}Dải Ngân Hà của chúng ta rộng khoảng một trăm nghìn năm ánh sáng. {b}Bạn phải xếp hơn ba nghìn dải Ngân Hà nối đuôi nhau, mới đi hết bề ngang khoảng trống ấy.',
      draw(k) {
        fill(k, '#03060E');
        spiral(k, 360, 380, 140, k.gt * 0.2);
        label(k, 'NGÂN HÀ ~100.000 NĂM AS', 120, 580, 'a', { size: 34, align: 'left' });
        const n = Math.floor(lerp(1, 3300, k.at('b', 5, 'in')));
        for (let i = 0; i < Math.min(n, 3300); i++) k.dot(120 + (i % 110) * 15.5, 680 + Math.floor(i / 110) * 11, 4, '#CFE3FF', 0.8);
        bigNum(k, '× 3.300', 1300, 380, 'b', { size: 150, color: P.gold });
      },
    },
    {
      say: '{a}Một vùng rộng như vậy lẽ ra phải có hàng nghìn thiên hà. {b}Các nhà thiên văn chỉ tìm thấy khoảng sáu mươi.',
      draw(k) {
        fill(k, '#03060E');
        const p = k.at('b', 1.5);
        for (let i = 0; i < 1200; i++) { const a = k.rand(i + 9000) * Math.PI * 2, r = 440 * Math.sqrt(k.rand(i + 9100)); if (i >= 60 && p > k.rand(i + 9200)) continue; k.dot(960 + Math.cos(a) * r, 560 + Math.sin(a) * r * 0.9, i < 60 ? 5 : 3, i < 60 ? P.gold : '#CFE3FF', i < 60 ? 0.95 : 0.6); }
        bigNum(k, 'HÀNG NGHÌN?', 960, 120, 'a', { size: 80, color: P.mute, p: k.at('a', 0.5) * (1 - p) });
        bigNum(k, '~60 THIÊN HÀ', 960, 120, 'b', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Nhà thiên văn Greg Aldering từng nói: nếu dải Ngân Hà nằm ở giữa khoảng trống Boötes, {b}bầu trời đêm vẫn đầy sao như bây giờ, vì những ngôi sao ấy thuộc về thiên hà của chính chúng ta. {c}Nhưng những thiên hà khác ở xa đến mức, phải đến những năm 1960, con người mới biết là chúng tồn tại.',
      draw(k) {
        fill(k, '#000');
        k.clip('ngan-ha', 0, 0, W, H, { at: 0, zoom: [1.05, 1.1], pan: [[0.4, 0.4], [0.5, 0.4]], dim: 0.15 });
        chip(k, 'ASTROBOND · ĐÀI THIÊN VĂN ASSY-TURGEN', 60, 70, SRC);
        bigNum(k, 'THIÊN HÀ KHÁC: 1960 MỚI THẤY', W / 2, 960, 'c', { size: 70, color: P.gold });
      },
    },
    {
      say: '{a}Nhưng đây là chỗ cần nói thật. {b}Khoảng trống Boötes lạ, nhưng không phá vỡ hiểu biết của chúng ta. Mô phỏng vũ trụ trên siêu máy tính cũng tạo ra những khoảng trống khổng lồ như vậy, và Boötes có thể là nhiều khoảng trống nhỏ nhập lại. {c}Bí ẩn thật sự nằm ở thứ đã kéo vật chất thành tấm lưới ấy. Một thứ chưa ai từng nhìn thấy.',
      draw(k) {
        fill(k, '#03060E');
        k.group({ x: W / 2, y: H / 2, s: lerp(1.15, 1, k.at(0, k.d, 'linear')) }, () => { k.ctx.translate(-W / 2, -H / 2); galaxyField(k, 700, 540, 260, 1, { n: 1100 }); });
        k.ctx.strokeStyle = 'rgba(255,211,78,0.7)'; k.ctx.lineWidth = 3; k.ctx.setLineDash([12, 10]);
        [[700, 540, 260], [1180, 460, 200], [1420, 640, 160]].forEach(([x, y, r], i) => { const q = k.at(k.cue('b', 2 + i * 0.6), 0.8); if (q > 0) { k.ctx.globalAlpha = q; k.ctx.beginPath(); k.ctx.arc(x, y, r, 0, Math.PI * 2); k.ctx.stroke(); } });
        k.ctx.setLineDash([]); k.ctx.globalAlpha = 1;
        bigNum(k, 'THỨ VÔ HÌNH NÀO?', W / 2, 960, 'c', { size: 90, color: P.gold });
      },
    },

    // ================= 5. VẬT CHẤT TỐI =================
    {
      chapter: 'Bí ẩn 5: 85% vật chất ở đâu?',
      transition: 'fade',
      say: '{a}Năm 1933, nhà thiên văn Fritz Zwicky đo tốc độ các thiên hà trong đám thiên hà Coma. {b}Chúng bay quá nhanh. Nhanh đến mức lẽ ra cả đám phải tan rã từ lâu. {c}Phải có thứ gì đó vô hình, và rất nặng, đang giữ chúng lại.',
      draw(k) {
        chapterTag(k, 'Bí ẩn 5 · Vật chất tối');
        fill(k, '#000');
        k.photo('zwicky', 0, 0, W, H, { zoom: [1.0, 1.25], pan: [[0.3, 0.32], [0.3, 0.25]], kp: k.at(0, k.cue('b') + 0.5, 'linear'), p: 1 - k.at('b', 0.8) });
        k.photo('coma', 0, 0, W, H, { zoom: [1.05, 1.2], p: k.at('b', 0.8), fx: 'fade' });
        chip(k, k.t < k.cue('b') ? 'FRITZ ZWICKY · 1960' : 'ĐÁM THIÊN HÀ COMA · NOIRLAB', 60, 70, SRC);
        for (let i = 0; i < 8; i++) { const q = k.at('b', 1); if (q <= 0) continue; const x = 400 + k.rand(i + 1) * 1100, y = 250 + k.rand(i + 2) * 550, a = k.rand(i + 3) * 6.28; k.ctx.strokeStyle = `rgba(229,56,59,${q})`; k.ctx.lineWidth = 5; k.ctx.beginPath(); k.ctx.moveTo(x, y); k.ctx.lineTo(x + Math.cos(a) * 120 * q, y + Math.sin(a) * 120 * q); k.ctx.stroke(); }
        bigNum(k, 'THỨ GÌ GIỮ CHÚNG LẠI?', W / 2, 960, 'c', { size: 80, color: P.gold });
      },
    },
    {
      say: '{a}Gần bốn mươi năm sau, nhà thiên văn Vera Rubin đo tốc độ quay của các thiên hà xoắn ốc, bắt đầu với thiên hà Andromeda. {b}Những ngôi sao ở rìa ngoài lẽ ra phải quay chậm, như Sao Hải Vương đi chậm hơn Trái Đất rất nhiều. {c}Nhưng không. Chúng quay nhanh gần bằng những ngôi sao gần tâm.',
      draw(k) {
        fill(k, '#000');
        k.photo('vera-rubin', 0, 0, W, H, { zoom: [1.0, 1.06], focus: [0.4, 0.3], p: 1 - k.at('b', 0.8) });
        k.photo('andromeda', 0, 0, W, H, { zoom: [1.1, 1.2], p: k.at('b', 0.8), fx: 'fade' });
        chip(k, k.t < k.cue('b') ? 'VERA RUBIN · NOIRLAB' : 'THIÊN HÀ ANDROMEDA · BRODY WESNER', 60, 70, SRC);
        const q = k.at('c', 1);
        if (q > 0) for (let i = 0; i < 3; i++) { const r = 150 + i * 220, a = k.gt * 0.6 * (i === 0 ? 1 : 0.95); k.ctx.strokeStyle = `rgba(255,211,78,${q})`; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.ellipse(W / 2, H / 2, r, r * 0.35, -0.6, a, a + 0.8); k.ctx.stroke(); }
      },
    },
    {
      say: '{a}Vẽ tốc độ quay theo khoảng cách tới tâm, ta thấy rõ. {b}Nếu chỉ có những ngôi sao và khí ta nhìn thấy, đường này phải đi xuống. {c}Thực tế, nó gần như nằm ngang. {d}Phải có một khối lượng khổng lồ, vô hình, bao quanh mỗi thiên hà. Người ta gọi nó là vật chất tối.',
      draw(k) {
        space(k, { n: 60 });
        const x0 = 260, y0 = 820, w = 1400, h = 560, { ctx } = k;
        ctx.strokeStyle = 'rgba(245,241,230,0.45)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y0 - h); ctx.lineTo(x0, y0); ctx.lineTo(x0 + w, y0); ctx.stroke();
        label(k, 'TỐC ĐỘ QUAY', x0 + 10, y0 - h - 40, 'a', { size: 34, color: P.mute, align: 'left' });
        label(k, 'KHOẢNG CÁCH TỚI TÂM →', x0 + w, y0 + 50, 'a', { size: 34, color: P.mute, align: 'right' });
        const curve = (fn, p, col, dash) => { ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.setLineDash(dash); ctx.beginPath(); for (let i = 0; i <= 100 * p; i++) { const u = i / 100; (i ? ctx.lineTo : ctx.moveTo).call(ctx, x0 + u * w, y0 - h * fn(u)); } ctx.stroke(); ctx.setLineDash([]); };
        curve((u) => u < 0.15 ? u / 0.15 * 0.85 : 0.85 * Math.sqrt(0.15 / u), k.at('b', 2.5), 'rgba(245,241,230,0.6)', [14, 10]);
        curve((u) => u < 0.15 ? u / 0.15 * 0.85 : 0.85 + 0.05 * (u - 0.15), k.at('c', 2.5), P.gold, []);
        label(k, 'DỰ ĐOÁN', x0 + w - 120, y0 - 170, 'b', { size: 40, color: P.cream, p: k.at('b', 2.5) > 0.9 ? 1 : 0 });
        label(k, 'ĐO ĐƯỢC', x0 + w - 120, y0 - h * 0.95 - 30, 'c', { size: 40, color: P.gold, p: k.at('c', 2.5) > 0.9 ? 1 : 0 });
        bigNum(k, 'VẬT CHẤT TỐI', W / 2, 960, 'd', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Và đây là bằng chứng rõ nhất. Đám Viên Đạn: hai đám thiên hà vừa đâm xuyên qua nhau. {b}Màu hồng là khí nóng, chiếm phần lớn vật chất thường. Va chạm làm nó chậm lại, dồn ở giữa. {c}Còn màu xanh là nơi khối lượng thật sự nằm, đo bằng cách ánh sáng phía sau bị nó bẻ cong. {d}Phần khối lượng ấy đã đi xuyên qua nhau, như không có gì cản.',
      draw(k) {
        fill(k, '#000');
        k.photo('vien-dan', 0, 0, W, H, { zoom: [1.12, 1.25], pan: [[0.5, 0.45], [0.5, 0.45]] });
        chip(k, 'NASA / CXC / M. WEISS · ẢNH GHÉP', 60, 70, SRC);
        label(k, 'KHÍ NÓNG', 1060, 260, 'b', { size: 50, color: '#FF8FB0' });
        label(k, 'KHỐI LƯỢNG (VẬT CHẤT TỐI)', 560, 900, 'c', { size: 46, color: '#8FB8FF' });
        label(k, 'KHỐI LƯỢNG', 1500, 900, 'c', { size: 46, color: '#8FB8FF' });
      },
    },
    {
      say: '{a}Gộp tất cả lại: vật chất tối nhiều gấp khoảng năm lần vật chất thường. {b}Mọi ngôi sao, hành tinh, khí, bụi, mọi thứ chúng ta từng nhìn thấy, chỉ là khoảng mười lăm phần trăm vật chất. {c}Tám mươi lăm phần trăm còn lại, chúng ta không biết là gì.',
      draw(k) {
        space(k, { n: 60 });
        const n = 100, lit = 15;
        for (let i = 0; i < n; i++) { const x = 460 + (i % 20) * 50, y = 300 + Math.floor(i / 20) * 50; const isLit = i < lit; k.dot(x, y, 18, isLit ? P.gold : '#2A3560', isLit ? k.at('b', 0.8) : k.at('a', 0.8)); }
        bigNum(k, '15%: THỨ TA THẤY', 960, 660, 'b', { size: 70, color: P.gold });
        bigNum(k, '85%: CHƯA BIẾT LÀ GÌ', 960, 820, 'c', { size: 80, color: P.cream });
      },
    },
    {
      say: '{a}Các nhà khoa học đã xây những máy dò sâu hơn một km dưới lòng đất, chứa hàng tấn xenon lỏng, chờ một hạt vật chất tối va vào. {b}Hàng chục năm tìm kiếm. {c}Chưa bắt được một hạt nào.',
      draw(k) {
        const { ctx } = k;
        ctx.fillStyle = '#5A4632'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#9CC9E0'; ctx.fillRect(0, 0, W, 120);
        for (let i = 0; i < 6; i++) { ctx.fillStyle = i % 2 ? '#4E3C2B' : '#614C36'; ctx.fillRect(0, 120 + i * 120, W, 120); }
        ctx.fillStyle = '#20262E'; ctx.fillRect(900, 120, 40, 700);
        ctx.fillStyle = '#7C8C9C'; ctx.beginPath(); ctx.roundRect(780, 760, 280, 260, 30); ctx.fill();
        ctx.fillStyle = '#5FB0E8'; ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.roundRect(810, 800, 220, 190, 20); ctx.fill(); ctx.globalAlpha = 1;
        label(k, 'XENON LỎNG', 920, 900, 'a', { size: 36 });
        const dp = k.at('a', 3, 'inOut'); ctx.strokeStyle = P.gold; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1150, 120); ctx.lineTo(1150, 120 + 640 * dp); ctx.stroke();
        for (let i = 0; i < 24; i++) k.dot(820 + k.rand(i + 5) * 200, 820 + ((k.rand(i + 6) * 160 + k.t * 30) % 160), 3, '#E6F4FF', 0.3 + 0.4 * Math.sin(k.t * 3 + i));
        for (let i = 0; i < 6; i++) { const y = ((k.t * 220 + i * 190) % 1100) - 50; ctx.strokeStyle = 'rgba(160,190,255,0.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(300 + i * 260, y); ctx.lineTo(280 + i * 260, y - 60); ctx.stroke(); }
        label(k, '~1,5 KM', 1280, 440, 'a', { size: 56, color: P.gold });
        chip(k, 'SƠ ĐỒ · MÁY DÒ LZ, MỸ', 60, 70, MP);
        bigNum(k, '0 HẠT', 420, 560, 'c', { size: 130, color: P.cream });
      },
    },
    {
      say: '{a}Nếu vật chất tối là một loại hạt, như phần lớn các nhà khoa học tin, {b}thì ngay lúc này chúng đang trôi qua căn phòng của bạn, xuyên qua cơ thể bạn, xuyên qua cả Trái Đất, {c}mà không chạm vào thứ gì.',
      draw(k) {
        fill(k, '#05081A');
        for (let i = 0; i < 120; i++) { const y = (k.rand(i + 300) * H + k.t * (80 + 120 * k.rand(i))) % H; k.ctx.strokeStyle = `rgba(160,190,255,${(0.15 + 0.3 * k.rand(i + 9)) * k.at('b', 1)})`; k.ctx.lineWidth = 2; k.ctx.beginPath(); k.ctx.moveTo(k.rand(i) * W, y); k.ctx.lineTo(k.rand(i) * W - 30, y - 70); k.ctx.stroke(); }
        human(k, 700, 920, 560);
        earth(k, 1450, 560, 230, { spin: 0.02 });
        label(k, 'KHÔNG CHẠM VÀO GÌ', W / 2, 140, 'c', { size: 64, color: P.gold });
      },
    },
    {
      say: '{a}Còn hố đen thì sao? Liệu vật chất tối chỉ là vô số hố đen trôi trong bóng tối? {b}Các cuộc tìm kiếm cho thấy những hố đen bình thường không đủ nhiều để làm nên tất cả. {c}Nhưng hố đen có thể lớn đến mức khó tin. Có một hố đen nặng gấp hàng chục tỷ lần Mặt Trời. Chúng ta sẽ gặp nó ở tập sau.',
      draw(k) {
        k.group({ x: W / 2, y: H / 2, s: lerp(1, 1.12, k.at(0, k.d, 'linear')) }, () => { k.ctx.translate(-W / 2, -H / 2); space(k, { n: 160 }); });
        for (let i = 0; i < 9; i++) { const q = k.at(k.cue('a', 0.2 + i * 0.35), 0.4) * (1 - 0.7 * k.at('b', 1.5)); k.dot(200 + k.rand(i + 70) * 1500, 200 + k.rand(i + 80) * 600, 14, '#000', q); k.ctx.strokeStyle = `rgba(255,190,90,${q})`; k.ctx.lineWidth = 3; k.ctx.beginPath(); k.ctx.arc(200 + k.rand(i + 70) * 1500, 200 + k.rand(i + 80) * 600, 20, 0, Math.PI * 2); k.ctx.stroke(); }
        const p = k.at('c', 2.5);
        if (p > 0) { k.dot(W / 2, 520, 220 * p, '#000', 1); k.ctx.strokeStyle = `rgba(255,170,60,${p})`; k.ctx.lineWidth = 30 * p; k.ctx.beginPath(); k.ctx.ellipse(W / 2, 520, 560 * p, 120 * p, -0.15, 0, Math.PI * 2); k.ctx.stroke(); }
        label(k, 'KHÔNG ĐỦ NHIỀU', W / 2, 960, 'b', { size: 54, color: P.mute, p: k.at('b', 0.6) * (1 - k.at('c', 0.5)) });
        bigNum(k, 'HÀNG CHỤC TỶ MẶT TRỜI', W / 2, 960, 'c', { size: 80, color: P.gold });
      },
    },
    {
      say: '{a}Những kính thiên văn mới như Euclid của châu Âu, và đài thiên văn Vera Rubin ở Chile, mang tên chính bà, đang vẽ bản đồ vật chất tối qua hàng tỷ thiên hà. {b}Có thể câu trả lời sẽ đến ngay trong đời chúng ta.',
      draw(k) {
        fill(k, '#000');
        k.clip('rubin-sau', 0, 0, W, H, { at: 0, zoom: [1, 1.04] });
        chip(k, 'ĐÀI VERA C. RUBIN · NSF–DOE / NOIRLAB', 60, 70, SRC);
      },
    },

    // ================= KẾT =================
    {
      chapter: 'Kết: phần vũ trụ ta không thấy',
      transition: 'fade',
      say: '{a}Năm bí ẩn. {b}Một tín hiệu bảy mươi hai giây. {c}Một hòn đá tự tăng tốc. {d}Một ngôi sao bị bụi che. {e}Một khoảng trống ba trăm triệu năm ánh sáng. {f}Và tám mươi lăm phần trăm vật chất vô hình. {g}Ba bí ẩn đầu từng bị nghi là dấu vết người ngoài hành tinh. Mỗi lần, khoa học đều tìm ra một lời giải tự nhiên, hoặc gần có.',
      draw(k) {
        space(k, { n: 120 });
        const rows = [['b', 'TÍN HIỆU WOW!', 'MÂY HYDRO BỪNG SÁNG?'], ['c', 'ʻOUMUAMUA', 'HYDRO THOÁT RA?'], ['d', 'SAO TABBY', 'BỤI · TỪ ĐÂU?'], ['e', 'BOÖTES', 'MẠNG VŨ TRỤ'], ['f', 'VẬT CHẤT TỐI', 'CHƯA BIẾT']];
        rows.forEach(([c, a, b], i) => { const y = 200 + i * 140; label(k, a, 420, y, c, { size: 54, align: 'left', color: i === 4 ? P.gold : P.cream }); label(k, b, 1500, y, k.cue('g', 0.5 + i * 0.3), { size: 44, align: 'right', color: i === 4 ? P.red : '#9FD8EA' }); });
      },
    },
    {
      say: '{a}Hãy quay lại đêm năm 1977 ấy. {b}Chiếc kính thiên văn trên cánh đồng lắng nghe bầu trời bằng sóng vô tuyến, thứ ánh sáng mà mắt ta không nhìn thấy. {c}Hoá ra, phần lớn vũ trụ cũng như vậy. Nó ở ngay đó. Chỉ là ta không thấy.',
      draw(k) {
        k.group({ x: W / 2, y: H / 2, s: lerp(1, 1.18, k.at(0, k.d, 'linear')) }, () => { k.ctx.translate(-W / 2, -H / 2); nightField(k, 840); bigEar(k, 900, 880, 1.2, { beam: 0.4 + 0.3 * Math.sin(k.t * 1.5) }); });
        k.ctx.save(); k.ctx.globalAlpha = k.at('c', 2); for (let i = 0; i < 80; i++) { const y = (k.rand(i + 300) * H + k.t * (50 + 60 * k.rand(i))) % H; k.ctx.strokeStyle = `rgba(160,190,255,${0.12 + 0.2 * k.rand(i + 9)})`; k.ctx.lineWidth = 2; k.ctx.beginPath(); k.ctx.moveTo(k.rand(i) * W, y); k.ctx.lineTo(k.rand(i) * W - 30, y - 60); k.ctx.stroke(); } k.ctx.restore();
      },
    },
    {
      say: '{a}Mọi thứ bạn từng chạm vào, Mặt Trời, Trái Đất, chính cơ thể bạn, đều làm từ phần nhỏ ấy, phần ta nhìn thấy được. {b}Một hạt bụi xanh, làm từ thứ vật chất hiếm hoi nhất của vũ trụ.',
      tail: 1.4,
      draw(k) {
        space(k, { n: 200 });
        earthPhoto(k, W / 2, 520, lerp(340, 120, k.at('b', 6, 'inOut')));
        label(k, '15%', W / 2, 940, 'a', { size: 60, color: P.gold, p: k.at('a', 0.8) * (1 - k.at('b', 0.8)) });
      },
    },
    {
      say: '{a}Còn bạn nghĩ sao: tín hiệu Wow năm 1977 là {b}một đám mây hydro bừng sáng, {c}hay là một lời chào từ ai đó? {d}Viết lựa chọn của bạn ở phần bình luận.',
      draw(k) {
        space(k, { n: 120 });
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(W / 2 - 3, 180, 6, 640);
        const g = k.ctx.createRadialGradient(W / 4, 500, 10, W / 4, 500, 240); g.addColorStop(0, 'rgba(95,176,232,0.7)'); g.addColorStop(1, 'rgba(95,176,232,0)'); k.ctx.fillStyle = g; k.ctx.beginPath(); k.ctx.arc(W / 4, 500, 240, 0, Math.PI * 2); k.ctx.fill();
        wowBars(k, W * 0.75 - 220, 380, 440, 240, 1);
        bigNum(k, 'MÂY HYDRO', W / 4, 240, 'b', { size: 76, color: '#9FD8EA' });
        bigNum(k, 'LỜI CHÀO', W * 3 / 4, 240, 'c', { size: 76, color: P.cream });
        bigNum(k, 'BẠN CHỌN?', W / 2, 960, 'd', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Tập sau trên Hạt Bụi Xanh: hố đen lớn nhất từng được tìm thấy. {b}Các nhà khoa học ước tính nó nặng khoảng bốn mươi tỷ lần Mặt Trời. {c}Nếu đặt nó vào chỗ Mặt Trời, vùng không lối thoát của nó rộng gấp khoảng hai mươi lần quỹ đạo Sao Diêm Vương. {d}Đăng ký kênh để không bỏ lỡ.',
      tail: 2.2,
      draw(k) {
        space(k, { n: 200 });
        label(k, 'TẬP SAU', W / 2, 110, 'a', { size: 60, color: P.mute });
        const r = 300 * k.at('b', 3, 'inOut');
        if (r > 0) { k.dot(W / 2, 520, r, '#000', 1); k.ctx.strokeStyle = 'rgba(255,170,60,0.85)'; k.ctx.lineWidth = Math.max(2, r * 0.12); k.ctx.beginPath(); k.ctx.ellipse(W / 2, 520, r * 2.2, r * 0.45, -0.12, 0, Math.PI * 2); k.ctx.stroke(); }
        k.ctx.strokeStyle = P.cream; k.ctx.lineWidth = 3; k.ctx.setLineDash([8, 8]); k.ctx.beginPath(); k.ctx.arc(W / 2, 520, 15, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.setLineDash([]);
        label(k, 'QUỸ ĐẠO SAO DIÊM VƯƠNG', W / 2 + 40, 470, 'c', { size: 30, color: P.cream, align: 'left' });
        countdown(k, '~40 TỶ × MẶT TRỜI', { x: W / 2, y: 880, align: 'center', size: 60, p: k.at('b', 0.6) });
        chip(k, '🔔 ĐĂNG KÝ HẠT BỤI XANH', W / 2 - 230, 1000, { bg: P.gold, p: k.at('d', 0.6) });
      },
    },
  ],
};

// Cột nhỏ (tín hiệu yếu giống Wow trong dữ liệu Arecibo), đáy tại (x, y).
function wowBarsMini(k, x, y, p) {
  if (p <= 0) return;
  [3, 6, 9, 10, 7, 3].forEach((v, i) => { k.ctx.fillStyle = `rgba(95,176,232,${p})`; k.ctx.fillRect(x + i * 14, y - v * 8 * p, 10, v * 8 * p); });
}
