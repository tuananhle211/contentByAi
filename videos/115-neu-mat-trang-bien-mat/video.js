// Hạt Bụi Xanh · tập 8 — Điều Gì Xảy Ra Nếu Mặt Trăng Biến Mất? (bảng nguồn: kich-ban.md, 16/11/2026)
// Thí nghiệm tưởng tượng (không quá trình nào đã biết làm Mặt Trăng biến mất). Thang đồng hồ: 1,3 giây → đêm đầu → sáng hôm sau
// → một năm → hàng triệu năm → nếu chưa từng có Mặt Trăng → sự thật: nó đang rời xa 3,8 cm/năm.
// Fact check (nguồn chính):
// - Khoảng cách TB 384.400 km; ánh sáng ~1,3 giây; đường kính Mặt Trăng 3.474 km (~27% Trái Đất; > 2 lần chiều dài Việt Nam ~1.650 km).
//   Tổng đường kính 7 hành tinh còn lại ≈ 380.000 km → xếp vừa khoảng cách trung bình Trái Đất–Mặt Trăng (NASA).
// - Apollo 8 chụp "Trái Đất mọc" 24/12/1968; 12 người đi trên Mặt Trăng (Apollo 11–17, 1969–1972); gương phản xạ laser Apollo 11/14/15
//   đo khoảng cách tới cỡ milimét; Mặt Trăng xa dần ~3,8 cm/năm (NASA, Lunar Laser Ranging).
// - Tâm khối Trái Đất–Mặt Trăng cách tâm Trái Đất ~4.670 km (nằm trong Trái Đất).
// - Đêm trăng rằm ~0,1–0,3 lux; đêm không trăng, trời quang ~0,001–0,002 lux (≈ tối hơn ~100 lần).
// - Sư tử săn mồi nhiều hơn vào đêm tối trăng (Packer et al. 2011, PLoS ONE); bọ hung định hướng nhờ ánh trăng phân cực (Dacke et al. 2003, Nature).
// - Rùa con bò về phía chân trời sáng hơn (mặt biển) (NOAA). San hô Rạn san hô Great Barrier đẻ trứng đồng loạt sau trăng tròn tháng 10–12 (AIMS).
// - Thuỷ triều: lực triều của Mặt Trời ≈ 46% của Mặt Trăng → không có Mặt Trăng, triều chỉ còn khoảng 1/3; hết chu kỳ nước rong/nước kém.
//   Vịnh Fundy (Canada) chênh triều tới ~16 m. Việt Nam: vịnh Bắc Bộ nhật triều, nhiều nơi bán nhật triều; nước lớn quanh rằm và mùng một.
// - Âm lịch Việt Nam là âm dương lịch theo pha trăng (tháng ~29,5 ngày). Nhật thực toàn phần: Mặt Trời lớn hơn ~400 lần và xa hơn ~400 lần.
// - Trục nghiêng 23,4° (dao động ~22,1–24,5° trong ~41.000 năm). Không có Mặt Trăng: Laskar et al. (1993, Nature) — hỗn loạn 0–85° (giả thuyết);
//   Lissauer, Barnes & Chambers (2012, Icarus) — dao động hẹp hơn nhiều trong hàng trăm triệu năm.
// - Ngày dài thêm ~1,8 ms mỗi thế kỷ (Stephenson et al. 2016); ~70 triệu năm trước năm có ~372 ngày, ngày ~23,5 giờ (de Winter et al. 2020);
//   ~1,4 tỷ năm trước ngày ~18 giờ (Meyers & Malinverno 2018, PNAS).
// - Va chạm khổng lồ (Theia, cỡ Sao Hoả) ~4,5 tỷ năm trước — giả thuyết hàng đầu; Mặt Trăng sinh ra gần hơn bây giờ hơn mười lần.
// - Triều mạnh thời cổ có thể góp phần đưa sự sống lên cạn — giả thuyết (Balbus 2014, Proc. R. Soc. A).
// - Sau ~600 triệu năm không còn nhật thực toàn phần (Mặt Trăng quá xa); Mặt Trời thành sao khổng lồ đỏ sau ~5 tỷ năm, trước khi Mặt Trăng kịp "thoát".
// - Tập sau (19/11): kính James Webb thấy những thiên hà/hố đen xuất hiện quá sớm, quá lớn.
import { P, fill, space, bigNum, label, chip, chapterTag, scaleBar, human, countdown } from '/channel/hat-bui-xanh.js';
import { three, texture } from '/engine/gl3d.js';
import { earthTextures, earthMoonScene, earthMoonUpdate } from '/channel/hat-bui-xanh-3d.js';
import * as thumbs from '/videos/115-neu-mat-trang-bien-mat/thumbs.js';

const W = 1920, H = 1080;
const lerp = (a, b, p) => a + (b - a) * p;
const SRC = { bg: 'rgba(245,241,230,0.85)', size: 22 };
const MP = { bg: 'rgba(255,211,78,0.9)', size: 22 };
const A = '/videos/115-neu-mat-trang-bien-mat/assets/';
const EM = earthMoonScene(await earthTextures(A), await texture(A + 'moon-tex.jpg'));
// Cảnh 3D Trái Đất–Mặt Trăng toàn khung.
const em = (k, o) => three(k, 'em', EM, earthMoonUpdate(o), 0, 0, W, H, { exposure: o.exp ?? 1.05 });
const earthPhoto = (k, x, y, r) => { const s = r / 0.85; k.ctx.save(); k.ctx.beginPath(); k.ctx.arc(x, y, r, 0, Math.PI * 2); k.ctx.clip(); k.photo('trai-dat-that', x - s, y - s, s * 2, s * 2, { zoom: [1, 1], credit: false }); k.ctx.restore(); };
const moonPhoto = (k, x, y, r, a = 1) => { if (a <= 0 || r <= 0) return; const s = r / 0.92; k.ctx.save(); k.ctx.globalAlpha *= a; k.ctx.beginPath(); k.ctx.arc(x, y, r, 0, Math.PI * 2); k.ctx.clip(); k.photo('trang-ram', x - s, y - s, s * 2, s * 2, { zoom: [1, 1], credit: false }); k.ctx.restore(); };
const framed = (k, name, x, y, w, h, o = {}) => {
  if ((o.p ?? 1) <= 0) return;
  k.ctx.save(); k.ctx.globalAlpha *= o.p ?? 1; k.ctx.fillStyle = P.cream; k.ctx.fillRect(x - 8, y - 8, w + 16, h + 16);
  k.photo(name, x, y, w, h, { zoom: o.zoom ?? [1, 1.08], focus: o.focus, pan: o.pan, credit: o.credit }); k.ctx.restore();
};
// Bầu trời đêm (vẽ): sao lấp lánh, độ sáng nền theo moonlight 0..1, dải Ngân Hà hiện rõ khi tối.
function nightSky(k, moonlight, o = {}) {
  const g = k.ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, `rgb(${lerp(4, 22, moonlight)},${lerp(6, 32, moonlight)},${lerp(16, 64, moonlight)})`); g.addColorStop(1, `rgb(${lerp(10, 40, moonlight)},${lerp(14, 54, moonlight)},${lerp(30, 90, moonlight)})`);
  k.ctx.fillStyle = g; k.ctx.fillRect(0, 0, W, H);
  const n = Math.round(lerp(700, 140, moonlight));
  for (let i = 0; i < n; i++) k.dot(k.rand(i) * W, k.rand(i + 300) * (o.ground ?? 860), 0.8 + 1.6 * Math.pow(k.rand(i + 600), 3) * 2, '#FFFFFF', (0.35 + 0.5 * k.rand(i + 9)) * (0.6 + 0.4 * Math.sin(k.gt * (1 + k.rand(i + 5) * 2) + i)));
  if (moonlight < 1) { k.ctx.save(); k.ctx.filter = 'blur(45px)'; k.ctx.globalAlpha = 0.22 * (1 - moonlight); const mw = k.ctx.createLinearGradient(200, 0, 1700, 860); mw.addColorStop(0, 'rgba(180,190,230,0)'); mw.addColorStop(0.5, 'rgba(200,205,240,0.6)'); mw.addColorStop(1, 'rgba(180,190,230,0)'); k.ctx.fillStyle = mw; k.ctx.beginPath(); k.ctx.moveTo(100, 900); k.ctx.quadraticCurveTo(900, 200, 1900, 0); k.ctx.lineTo(1900, 260); k.ctx.quadraticCurveTo(900, 420, 400, 900); k.ctx.fill(); k.ctx.restore(); }
}
// Mặt đất + hàng dừa bên biển (bóng tối).
function shore(k, y = 860, light = 0) {
  const { ctx } = k;
  ctx.fillStyle = `rgb(${lerp(14, 40, light)},${lerp(26, 60, light)},${lerp(40, 90, light)})`; ctx.fillRect(0, y - 40, W, 60);
  for (let x = 0; x < W; x += 50) k.dot(x + 25 * Math.sin(k.gt + x), y - 40 + 4 * Math.sin(k.gt * 1.5 + x * 0.05), 2, '#C9D6E3', 0.25 + 0.5 * light);
  ctx.fillStyle = '#05070C'; ctx.fillRect(0, y, W, H - y);
  for (const [x, h] of [[220, 300], [330, 240], [1620, 280]]) { ctx.strokeStyle = '#05070C'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 30, y - h / 2, x + 10, y - h); ctx.stroke(); for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.5; ctx.beginPath(); ctx.moveTo(x + 10, y - h); ctx.quadraticCurveTo(x + 10 + Math.cos(a) * 60, y - h + Math.sin(a) * 60 - 20, x + 10 + Math.cos(a) * 120, y - h + Math.sin(a) * 120 + 30); ctx.stroke(); } }
}
// Thước triều: mực nước dao động biên độ amp quanh y0.
function tideGauge(k, x, y0, amp, o = {}) {
  const { ctx } = k, lv = y0 - amp * Math.sin(k.gt * (o.speed ?? 0.9));
  ctx.fillStyle = 'rgba(46,134,222,0.55)'; ctx.fillRect(x - 70, lv, 140, y0 + 260 - lv);
  ctx.strokeStyle = P.cream; ctx.lineWidth = 3; ctx.strokeRect(x - 70, y0 - 260, 140, 520);
  for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(x - 70, y0 + i * 60); ctx.lineTo(x - 50, y0 + i * 60); ctx.stroke(); }
  if (o.text) k.text(o.text, x, y0 + 310, { size: 34, font: 'title', color: o.color ?? P.cream, outline: P.ink, outlineWidth: 8 });
}

export default {
  meta: {
    title: 'Điều Gì Xảy Ra Nếu Mặt Trăng Biến Mất?',
    description: 'Đêm rằm tháng Tám, Mặt Trăng bỗng biến mất khỏi bầu trời. Không vụ nổ, không mảnh vỡ. Chuyện gì xảy ra sau một giây, một đêm, một năm, một triệu năm?\n\nThuỷ triều, đêm tối, loài vật, âm lịch, nhật thực, trục quay và độ dài một ngày của Trái Đất: Mặt Trăng làm cho chúng ta nhiều việc hơn bạn tưởng. Và dù không biến mất, nó vẫn đang rời xa Trái Đất 3,8 cm mỗi năm. Đây là thí nghiệm tưởng tượng; mọi con số đều có nguồn bên dưới.',
    footer: '📚 Nguồn tham khảo\n• NASA – khoảng cách, kích thước Mặt Trăng; đo khoảng cách bằng laser (Lunar Laser Ranging)\n• NOAA – thuỷ triều và lực triều của Mặt Trời, Mặt Trăng\n• Laskar, Joutel & Robutel (1993), Nature; Lissauer, Barnes & Chambers (2012), Icarus – trục quay Trái Đất không có Mặt Trăng\n• Stephenson et al. (2016), Proc. R. Soc. A – ngày dài thêm; de Winter et al. (2020), Paleoceanography – năm 372 ngày\n• Meyers & Malinverno (2018), PNAS – ngày 18 giờ thời cổ\n• Packer et al. (2011), PLoS ONE – sư tử và trăng; Dacke et al. (2003), Nature – bọ hung và ánh trăng\n• Balbus (2014), Proc. R. Soc. A – thuỷ triều và sự sống lên cạn (giả thuyết)\n\n🌍 Hạt Bụi Xanh — khoa học về những thứ khổng lồ, cổ xưa và đáng sợ trên hạt bụi xanh của chúng ta. Video mới mỗi ngày lúc 20:00.',
    links: [['▶ Tập trước: Hố Đen Lớn Nhất Vũ Trụ Lớn Đến Mức Nào?', '109-ho-den-lon-nhat-vu-tru']],
    tags: ['mặt trăng', 'nếu mặt trăng biến mất', 'điều gì xảy ra nếu', 'thuỷ triều', 'mặt trăng rời xa trái đất', 'nhật thực', 'vũ trụ', 'khoa học', 'hạt bụi xanh'],
    hashtags: ['mattrang', 'dieugixayraneu', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi',
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.35, tail: 0.8, pause: 0.35, transition: 'cut', camera: 0.04,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    gpu: true, post: 'cosmos',
  },
  thumbnail: thumbs.a,
  scenes: [
    // ================= MỞ ĐẦU =================
    {
      chapter: 'Mở đầu: đêm rằm tháng Tám',
      say: '{a}Đêm rằm tháng Tám. Chín giờ tối, ở một thị trấn ven biển miền Trung. {b}Trẻ con rước đèn ông sao, người lớn ngồi ngoài hiên bóc bánh nướng. {c}Trên trời, Mặt Trăng tròn vành vạnh.',
      draw(k) {
        fill(k, '#000');
        k.photo('hoi-an', 0, 0, W, H, { zoom: [1.05, 1.18], pan: [[0.45, 0.55], [0.55, 0.45]], p: 1 - k.at('c', 0.8) });
        if (k.t > k.cue('c')) { nightSky(k, 1); moonPhoto(k, 1320, 320, 150 + 6 * k.at('c', 4)); shore(k, 860, 1); }
        chip(k, k.t < k.cue('c') ? 'PHỐ HỘI AN · CHRISTOPHE95' : 'MINH HOẠ', 60, 70, k.t < k.cue('c') ? SRC : MP);
        countdown(k, 'RẰM THÁNG TÁM · 21:00', { x: W - 60, y: 80, p: k.at('a', 0.6) });
      },
    },
    {
      say: '{a}Rồi, không một tiếng động, Mặt Trăng biến mất. {b}Không có vụ nổ. Không có mảnh vỡ nào rơi xuống. {c}Chỉ còn một khoảng trời đen, đúng chỗ nó vừa ở.',
      draw(k) {
        const gone = k.at('a', 1.5, 'inOut');
        nightSky(k, 1 - gone); moonPhoto(k, 1320, 320, 156, 1 - gone); shore(k, 860, 1 - gone);
        k.ctx.strokeStyle = `rgba(255,211,78,${0.7 * k.at('c', 0.8)})`; k.ctx.lineWidth = 3; k.ctx.setLineDash([10, 10]); k.ctx.beginPath(); k.ctx.arc(1320, 320, 156, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.setLineDash([]);
        chip(k, 'MINH HOẠ · GIẢ ĐỊNH', 60, 70, MP);
      },
    },
    {
      say: '{a}Chuyện gì sẽ xảy ra tiếp theo? {b}Sau một giây. {c}Sau một đêm. {d}Sau một năm. {e}Sau một triệu năm. {f}Đến cuối video, bạn sẽ thấy Mặt Trăng làm cho Trái Đất nhiều việc hơn bạn tưởng, từ con nước ngoài biển, đến chiếc bánh nướng đêm Trung thu, đến chính độ dài một ngày của bạn.',
      draw(k) {
        space(k, { n: 160 });
        [['b', '1 GIÂY'], ['c', '1 ĐÊM'], ['d', '1 NĂM'], ['e', '1 TRIỆU NĂM']].forEach(([c, t], i) => countdown(k, t, { x: 330 + i * 420, y: 420, align: 'center', size: 64, p: k.at(c, 0.5) }));
        bigNum(k, 'BIỂN · ĐÊM · LỊCH · MỘT NGÀY', W / 2, 760, 'f', { size: 70, color: P.gold });
      },
    },
    {
      say: '{a}Nói trước: đây là một thí nghiệm tưởng tượng. Không có quá trình nào mà khoa học biết có thể làm Mặt Trăng biến mất trong một đêm. {b}Nhưng tưởng tượng nó mất đi, là cách tốt nhất để thấy nó quan trọng đến mức nào. {c}Đây là Hạt Bụi Xanh. Tập trước, chúng ta đã đi tới hố đen lớn nhất vũ trụ. Hôm nay, chúng ta quay về thứ gần nhà nhất.',
      draw(k) {
        em(k, { moonDist: 4.5, moonAng: 0.4, cam: (k) => [lerp(1.2, 2.2, k.at(0, k.d, 'inOut')), 0.6, lerp(7.5, 6.2, k.at(0, k.d, 'inOut'))], look: [1.6, 0, -1], spin: 0.05 });
        chip(k, 'MÔ PHỎNG · KHÔNG ĐÚNG TỈ LỆ', 60, 70, MP);
        bigNum(k, 'THÍ NGHIỆM TƯỞNG TƯỢNG', W / 2, 960, 'a', { size: 80, color: P.gold, p: k.at('a', 0.6) * (1 - k.at('c', 0.5)) });
        bigNum(k, 'HẠT BỤI XANH', W / 2, 960, 'c', { size: 90, color: P.cream });
      },
    },

    // ================= 1. MẶT TRĂNG LỚN VÀ XA CỠ NÀO =================
    {
      chapter: 'Mặt Trăng thật ra lớn và xa cỡ nào?',
      transition: 'fade',
      say: '{a}Trước khi nó biến mất, hãy nhìn kỹ nó một lần. {b}Mặt Trăng rộng ba nghìn bốn trăm bảy mươi tư km, hơn một phần tư Trái Đất. {c}Nếu đặt nằm ngang trên bản đồ, nó dài hơn gấp đôi chiều dài nước Việt Nam.',
      draw(k) {
        chapterTag(k, 'Mặt Trăng · kích thước');
        em(k, { moonDist: 60, moonAng: 0, cam: (k) => [60 + lerp(-1.6, -1.1, k.at(0, k.d, 'inOut')), 0.05, lerp(0.9, 0.6, k.at(0, k.d, 'inOut'))], look: [60, 0, 0], spin: 0 });
        chip(k, 'MÔ PHỎNG · BẢN ĐỒ BỀ MẶT: SOLAR SYSTEM SCOPE', 60, 1010, MP);
        bigNum(k, '3.474 KM', W / 2, 150, 'b', { size: 110, color: P.cream });
        bigNum(k, '> 2 × CHIỀU DÀI VIỆT NAM', W / 2, 960, 'c', { size: 70, color: P.gold });
      },
    },
    {
      say: '{a}Nó ở cách chúng ta trung bình ba trăm tám mươi tư nghìn km. {b}Xa đến mức, khoảng trống giữa Trái Đất và Mặt Trăng vừa đủ để xếp hàng tất cả các hành tinh còn lại của Hệ Mặt Trời. {c}Ánh trăng bạn thấy mỗi đêm là ánh nắng phản chiếu, bay mất hơn một giây mới tới mắt bạn.',
      draw(k) {
        space(k, { n: 140 });
        const sc = 1560 / 384400, x0 = 160, y = 560;
        earthPhoto(k, x0, y, 12742 * sc / 2 * 1.0);
        moonPhoto(k, x0 + 384400 * sc, y, 3474 * sc / 2 + 1);
        const pl = [['SAO THUỶ', 4879, '#B8A99A'], ['SAO KIM', 12104, '#E8C27A'], ['SAO HOẢ', 6779, '#D4643C'], ['SAO MỘC', 139820, '#D9B38C'], ['SAO THỔ', 116460, '#E3CF9C'], ['THIÊN VƯƠNG', 50724, '#9AD3DE'], ['HẢI VƯƠNG', 49244, '#4C6FD8']];
        let x = x0 + 12742 * sc / 2; const p = k.at('b', 4, 'out');
        pl.forEach(([n, d, c], i) => { const r = d * sc / 2, q = Math.max(0, Math.min(1, p * 7 - i)); k.dot(x + r, y, r, c, q); if (r > 40) k.text(n, x + r, y + r + 34, { size: 26, font: 'title', color: P.cream, p: q }); x += 2 * r; });
        scaleBar(k, x0, x0 + 384400 * sc, 940, '384.400 KM', { p: k.at('a', 1.5) });
        bigNum(k, '~1,3 GIÂY ÁNH SÁNG', W / 2, 150, 'c', { size: 76, color: P.gold });
      },
    },
    {
      say: '{a}Năm 1968, ba phi hành gia Apollo 8 là những người đầu tiên bay vòng quanh Mặt Trăng. {b}Họ chụp được tấm ảnh này: Trái Đất mọc lên trên đường chân trời của Mặt Trăng. {c}Bảy tháng sau, con người lần đầu đặt chân lên đó. Tổng cộng, mười hai người đã đi bộ trên Mặt Trăng.',
      draw(k) {
        fill(k, '#000');
        k.photo('trai-dat-moc', 0, 0, W, H, { zoom: [1.0, 1.2], pan: [[0.5, 0.6], [0.56, 0.3]], p: 1 - k.at('c', 0.8) });
        k.photo('dau-chan', 0, 0, W, H, { zoom: [1.05, 1.2], p: k.at('c', 0.8), fx: 'fade' });
        chip(k, k.t < k.cue('c') ? 'NASA · APOLLO 8 · 24/12/1968' : 'NASA · APOLLO 11 · 1969', 60, 70, SRC);
        bigNum(k, '12 NGƯỜI', W / 2, 960, 'c', { size: 110, color: P.gold });
      },
    },
    {
      say: '{a}Họ để lại dấu chân, cờ, và một thứ ít ai để ý: những tấm gương phản xạ. {b}Đến hôm nay, các đài thiên văn vẫn bắn tia laser lên những tấm gương ấy, đo thời gian ánh sáng dội về, {c}và tính ra khoảng cách tới Mặt Trăng chính xác tới vài milimét. Hãy nhớ những tấm gương này. Chúng ta sẽ quay lại.',
      draw(k) {
        fill(k, '#000');
        k.photo('guong-laser', 0, 0, W, H, { zoom: [1.0, 1.25], pan: [[0.5, 0.5], [0.55, 0.45]] });
        chip(k, 'NASA · GƯƠNG PHẢN XẠ APOLLO 11', 60, 70, SRC);
        const p = k.at('b', 2, 'linear'); k.ctx.strokeStyle = `rgba(229,56,59,${0.9 * k.at('b', 0.4)})`; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.moveTo(W, 0); k.ctx.lineTo(lerp(W, 1060, Math.min(1, p * 2)), lerp(0, 520, Math.min(1, p * 2))); k.ctx.stroke();
        bigNum(k, 'CHÍNH XÁC TỚI MILIMÉT', W / 2, 960, 'c', { size: 80, color: P.gold });
      },
    },

    // ================= 2. GIÂY ĐẦU TIÊN =================
    {
      chapter: '1 giây: chuyện gì xảy ra ngay lập tức?',
      transition: 'fade',
      say: '{a}Quay lại đêm rằm ấy. Mặt Trăng biến mất. {b}Trong một giây ba phần mười đầu tiên, bạn vẫn còn thấy nó, vì ánh sáng cuối cùng của nó vẫn đang trên đường bay tới. {c}Rồi ánh trăng tắt.',
      draw(k) {
        chapterTag(k, '1 giây');
        const gone = k.at('a', 1.2, 'inOut');
        em(k, { moonDist: 4.5, moonAng: 0.4, fade: 1 - gone, cam: [2.0, 0.6, 6.4], look: [1.6, 0, -1], spin: 0.05 });
        const p = k.at('b', 3, 'linear'); k.dot(lerp(1500, 760, p), lerp(380, 520, p), 8, '#FFF3C4', k.t > k.cue('b') && k.t < k.cue('c') ? 1 : 0);
        chip(k, 'MÔ PHỎNG · KHÔNG ĐÚNG TỈ LỆ', 60, 1010, MP);
        countdown(k, '+1,3 GIÂY', { x: W - 60, y: 80, p: k.at('b', 0.5) });
      },
    },
    {
      say: '{a}Bình thường, Trái Đất và Mặt Trăng cùng xoay quanh một điểm chung, nằm cách tâm Trái Đất khoảng bốn nghìn bảy trăm km. Vì thế Trái Đất khẽ lắc lư mỗi tháng. {b}Khi Mặt Trăng mất, cái lắc ấy dừng lại. {c}Không động đất, không sóng thần, không ai bị hất lên trời. Bạn sẽ không cảm thấy gì cả.',
      draw(k) {
        space(k, { n: 120 });
        const stop = k.at('b', 2, 'inOut'), a = k.gt * 1.2;
        const wob = 40 * (1 - stop);
        earthPhoto(k, 860 + Math.cos(a) * wob, 540 + Math.sin(a) * wob * 0.6, 230);
        k.dot(860, 540, 8, P.red, 1 - stop);
        label(k, 'TÂM CHUNG · ~4.700 KM TỪ TÂM TRÁI ĐẤT', 860, 960, 'a', { size: 36, color: P.red, p: k.at('a', 0.6) * (1 - stop) });
        moonPhoto(k, 860 - Math.cos(a) * 640, 540 - Math.sin(a) * 300, 60, 1 - stop);
        bigNum(k, 'BẠN KHÔNG CẢM THẤY GÌ', W / 2, 150, 'c', { size: 80, color: P.cream });
      },
    },

    // ================= 3. ĐÊM ĐẦU TIÊN =================
    {
      chapter: '1 đêm: bóng tối và loài vật',
      transition: 'fade',
      say: '{a}Nhưng bầu trời đã khác. {b}Một đêm trăng rằm sáng gấp khoảng một trăm lần một đêm không trăng. {c}Từ nay, mọi đêm đều tối như đêm ba mươi. Đổi lại, dải Ngân Hà sẽ hiện ra rõ hơn bao giờ hết.',
      draw(k) {
        chapterTag(k, '1 đêm');
        const d = k.at('b', 6, 'inOut');
        nightSky(k, 1 - d); moonPhoto(k, 1320, 320, 150, 1 - d); shore(k, 860, 1 - d);
        bigNum(k, 'TỐI HƠN ~100 LẦN', W / 2, 960, 'b', { size: 84, color: P.gold });
        chip(k, 'MINH HOẠ', 60, 1010, MP);
      },
    },
    {
      say: '{a}Với loài vật, đó là một cú sốc. {b}Ở châu Phi, sư tử săn mồi thành công hơn vào những đêm tối trăng. Con mồi của chúng sẽ phải sống với những đêm như thế, vĩnh viễn. {c}Có những loài bọ hung định hướng bằng ánh trăng để lăn viên phân đi thẳng. Không còn trăng, chúng chỉ còn dựa vào ánh sao.',
      draw(k) {
        nightSky(k, 0.05, { ground: 900 });
        const { ctx } = k; ctx.fillStyle = '#0E1208'; ctx.fillRect(0, 880, W, 200);
        for (let i = 0; i < 2; i++) { const x = 500 + i * 70 + 10 * Math.sin(k.gt + i); ctx.fillStyle = '#C9A15A'; k.dot(x, 860, 6, '#F5D27A', 0.9); k.dot(x + 18, 860, 6, '#F5D27A', 0.9); }
        label(k, 'SƯ TỬ · SĂN TỐT HƠN KHI TỐI TRĂNG', 560, 960, 'b', { size: 36, color: P.gold });
        const bx = 1350 + 30 * Math.sin(k.t * 0.7); k.dot(bx, 870, 26, '#6B4A2A', k.at('c', 0.6)); k.dot(bx + 40, 868, 14, '#1A1A1A', k.at('c', 0.6));
        label(k, 'BỌ HUNG · LẠC HƯỚNG?', 1380, 960, 'c', { size: 36, color: P.cream });
        chip(k, 'MINH HOẠ', 60, 70, MP);
      },
    },
    {
      say: '{a}Trên những bãi biển, rùa con nở ra trong đêm và bò về phía chân trời sáng nhất, thường là mặt biển phản chiếu ánh trăng, ánh sao. {b}Đêm càng tối, mặt biển càng khó phân biệt. Ánh đèn trên bờ sẽ dễ dụ chúng đi lạc hơn.',
      draw(k) {
        fill(k, '#000');
        k.photo('rua-con', 0, 0, W, H, { zoom: [1.05, 1.2], pan: [[0.5, 0.6], [0.55, 0.5]] });
        chip(k, 'RÙA BIỂN CON · CAPE HATTERAS (NPS)', 60, 70, SRC);
        bigNum(k, 'BÒ VỀ PHÍA SÁNG NHẤT', W / 2, 960, 'a', { size: 80, color: P.cream });
      },
    },
    {
      say: '{a}Còn dưới biển, hàng tỷ con san hô trên những rạn san hô lớn nhất thế giới đẻ trứng đồng loạt, chỉ vài đêm mỗi năm, sau một kỳ trăng tròn. {b}Ánh trăng là một trong những chiếc đồng hồ giúp chúng hẹn giờ. {c}Mất chiếc đồng hồ ấy, các nhà khoa học lo rằng trứng và tinh trùng sẽ không còn gặp nhau đúng lúc.',
      draw(k) {
        fill(k, '#000');
        k.photo('san-ho', 0, 0, W, H, { zoom: [1.0, 1.2], pan: [[0.5, 0.5], [0.45, 0.45]] });
        chip(k, 'SAN HÔ ĐẺ TRỨNG · NOAA', 60, 70, SRC);
        bigNum(k, 'ĐỒNG HỒ ÁNH TRĂNG', W / 2, 960, 'b', { size: 84, color: P.gold });
      },
    },

    // ================= 4. SÁNG HÔM SAU: BIỂN =================
    {
      chapter: 'Sáng hôm sau: biển lạ đi',
      transition: 'fade',
      say: '{a}Sáng hôm sau, ngư dân ra biển sẽ thấy điều lạ đầu tiên: con nước. {b}Lực hút của Mặt Trăng kéo nước biển phồng lên ở phía gần nó, và cả ở phía đối diện. {c}Trái Đất xoay qua hai chỗ phồng ấy, nên ở nhiều nơi, nước lên xuống hai lần mỗi ngày.',
      draw(k) {
        chapterTag(k, 'Sáng hôm sau');
        space(k, { n: 100 });
        const cx = 820, cy = 540, b = 60 * k.at('b', 2);
        k.ctx.fillStyle = 'rgba(46,134,222,0.55)'; k.ctx.beginPath(); k.ctx.ellipse(cx, cy, 240 + b, 240, 0, 0, Math.PI * 2); k.ctx.fill();
        earthPhoto(k, cx, cy, 220);
        moonPhoto(k, 1650, 540, 70);
        k.ctx.strokeStyle = 'rgba(255,211,78,0.8)'; k.ctx.lineWidth = 4; k.ctx.setLineDash([12, 10]); k.ctx.beginPath(); k.ctx.moveTo(1100, 540); k.ctx.lineTo(1570, 540); k.ctx.stroke(); k.ctx.setLineDash([]);
        label(k, 'NƯỚC PHỒNG 2 PHÍA', cx, 860, 'b', { size: 44, color: P.gold });
        chip(k, 'MINH HOẠ · PHÓNG ĐẠI', 60, 1010, MP);
      },
    },
    {
      say: '{a}Ở vịnh Fundy, Canada, mực nước lên xuống chênh nhau tới mười sáu mét, cao bằng một toà nhà năm tầng. {b}Đây là cùng một bến cảng, cách nhau vài giờ.',
      draw(k) {
        fill(k, '#000');
        const sw = k.at('b', 1, 'inOut');
        k.photo('fundy-len', 0, 0, W, H, { zoom: [1.05, 1.12], p: 1 - sw });
        k.photo('fundy-xuong', 0, 0, W, H, { zoom: [1.05, 1.12], p: sw, fx: 'fade' });
        chip(k, sw < 0.5 ? 'VỊNH FUNDY · NƯỚC LÊN · D. KERELUK' : 'VỊNH FUNDY · NƯỚC RÚT · D. KERELUK', 60, 70, SRC);
        bigNum(k, 'TỚI 16 M', W / 2, 960, 'a', { size: 120, color: P.gold });
      },
    },
    {
      say: '{a}Mặt Trời cũng tạo ra thuỷ triều, nhưng chỉ yếu bằng chưa tới một nửa. {b}Không còn Mặt Trăng, con nước ở khắp nơi chỉ còn khoảng một phần ba. {c}Và chu kỳ ngư dân Việt Nam vẫn theo lịch âm, nước lớn quanh ngày rằm và mùng một, nước kém vào những ngày giữa tuần trăng, sẽ biến mất.',
      draw(k) {
        space(k, { n: 80 });
        tideGauge(k, 560, 520, 220 * (1 - 0.68 * k.at('b', 2, 'inOut')), { text: 'CON NƯỚC', color: P.cream });
        label(k, 'MẶT TRĂNG + MẶT TRỜI', 560, 140, 'a', { size: 40, color: P.cream, p: k.at('a', 0.6) * (1 - k.at('b', 0.6)) });
        label(k, 'CHỈ MẶT TRỜI', 560, 140, 'b', { size: 40, color: P.gold });
        bigNum(k, '~1/3', 1300, 420, 'b', { size: 170, color: P.gold });
        bigNum(k, 'HẾT NƯỚC RONG, NƯỚC KÉM', 1300, 640, 'c', { size: 60, color: P.cream });
      },
    },
    {
      say: '{a}Rừng ngập mặn như Cần Giờ sống nhờ nước triều tràn vào, rút ra mỗi ngày, mang theo phù sa, cá con và tôm cua. {b}Những vùng đất chỉ ngập khi triều cường sẽ khô hẳn. Những sinh vật quen sống ở ranh giới giữa nước và cạn sẽ mất nhà.',
      draw(k) {
        const g = k.ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#7FB2D0'); g.addColorStop(1, '#D9E8EF'); k.ctx.fillStyle = g; k.ctx.fillRect(0, 0, W, H);
        const lv = 760 + 140 * k.at('b', 3, 'inOut') + 20 * Math.sin(k.gt);
        for (let i = 0; i < 14; i++) { const x = 80 + i * 135, h = 260 + 60 * k.rand(i); k.ctx.strokeStyle = '#3E2B1E'; k.ctx.lineWidth = 6; for (let r = -2; r <= 2; r++) { k.ctx.beginPath(); k.ctx.moveTo(x, 760 - h * 0.4); k.ctx.quadraticCurveTo(x + r * 30, 820, x + r * 40, 900); k.ctx.stroke(); } k.dot(x, 760 - h * 0.5, 90, '#2E5E3A', 1); k.dot(x + 40, 760 - h * 0.6, 70, '#3E7A4A', 1); }
        k.ctx.fillStyle = 'rgba(70,110,120,0.75)'; k.ctx.fillRect(0, lv, W, H - lv);
        k.ctx.fillStyle = '#5A4632'; k.ctx.fillRect(0, 900, W, 180);
        label(k, 'RỪNG NGẬP MẶN', W / 2, 140, 'a', { size: 60, color: P.ink, outline: P.cream });
        bigNum(k, 'TRIỀU YẾU → ĐẤT KHÔ', W / 2, 260, 'b', { size: 70, color: P.red, outline: P.cream });
        chip(k, 'MINH HOẠ', 60, 1010, MP);
      },
    },

    // ================= 5. MỘT NĂM =================
    {
      chapter: '1 năm: lịch, Tết và nhật thực',
      transition: 'fade',
      say: '{a}Một năm trôi qua. {b}Âm lịch của người Việt được tính theo những lần trăng tròn, trăng khuyết. Mỗi tháng âm là một vòng trăng, khoảng hai mươi chín ngày rưỡi. {c}Không còn Mặt Trăng, ngày rằm chỉ còn là một con số trên tờ lịch. Đêm Trung thu sẽ không có trăng để ngắm.',
      draw(k) {
        chapterTag(k, '1 năm');
        fill(k, '#000');
        k.clip('pha-trang', 0, 0, W, H, { at: 0, zoom: [1.3, 1.35], p: 1 - k.at('c', 0.8) });
        k.photo('co-trung-thu', 0, 0, W, H, { zoom: [1.05, 1.15], p: k.at('c', 0.8), fx: 'fade', dim: 0.15 });
        chip(k, k.t < k.cue('c') ? 'NASA SVS · PHA TRĂNG' : 'CỖ TRUNG THU · VIETHAVVH', 60, 70, SRC);
        bigNum(k, '1 THÁNG ÂM ≈ 29,5 NGÀY', W / 2, 960, 'b', { size: 76, color: P.cream, p: k.at('b', 0.5) * (1 - k.at('c', 0.5)) });
        bigNum(k, 'TRUNG THU KHÔNG TRĂNG', W / 2, 960, 'c', { size: 84, color: P.gold });
      },
    },
    {
      say: '{a}Và sẽ không bao giờ còn nhật thực. {b}Mặt Trời lớn hơn Mặt Trăng khoảng bốn trăm lần, nhưng cũng ở xa hơn khoảng bốn trăm lần. Nhờ sự trùng hợp ấy, Mặt Trăng che vừa khít Mặt Trời, để lộ vầng sáng như thế này. {c}Đây là một trong những cảnh đẹp nhất mà con người có thể nhìn thấy bằng mắt. Không còn Mặt Trăng, nó biến mất mãi mãi.',
      draw(k) {
        fill(k, '#000');
        k.photo('nhat-thuc', 0, 0, W, H, { zoom: [1.0, 1.3], pan: [[0.5, 0.5], [0.5, 0.48]] });
        chip(k, 'NHẬT THỰC TOÀN PHẦN 2017 · O\'DEA', 60, 70, SRC);
        bigNum(k, '400 LẦN LỚN HƠN · 400 LẦN XA HƠN', W / 2, 960, 'b', { size: 64, color: P.gold });
      },
    },
    {
      say: '{a}Ánh trăng là ánh nắng phản chiếu, đi chỉ hơn một giây là tới mắt bạn. {b}Nhưng có những tia sáng đã bay hơn mười ba tỷ năm mới tới được kính thiên văn James Webb. {c}Và trong những tia sáng cổ xưa ấy, các nhà khoa học thấy những thứ mà theo hiểu biết của họ, lẽ ra không thể tồn tại. Chúng ta sẽ đến đó ở tập sau.',
      draw(k) {
        space(k, { n: 220 });
        const p = k.at('b', 4, 'inOut'), m = k.at(0, k.d, 'linear');
        moonPhoto(k, lerp(1400, 1700, m), lerp(380, 300, m), lerp(130, 40, m), 1 - p * 0.6);
        for (let i = 0; i < 6; i++) { const u = (k.t * 0.5 + i / 6) % 1; k.dot(lerp(lerp(1400, 1700, m), 960, u), lerp(380, 1000, u), 4, '#FFF3C4', 0.8 * (1 - p)); }
        for (let i = 0; i < 60; i++) { const a = k.rand(i) * 6.28, r = 600 * (1 - ((k.gt * 0.2 + k.rand(i + 7)) % 1)); k.dot(W / 2 + Math.cos(a) * r, 540 + Math.sin(a) * r * 0.6, 2 + 2 * k.rand(i + 3), i % 3 ? '#FFB27A' : '#CFE3FF', 0.7 * p); }
        bigNum(k, '> 13 TỶ NĂM', W / 2, 540, 'b', { size: 110, color: P.cream });
        bigNum(k, 'KHÔNG THỂ TỒN TẠI?', W / 2, 920, 'c', { size: 90, color: P.gold });
      },
    },

    // ================= 6. HÀNG TRIỆU NĂM =================
    {
      chapter: 'Hàng triệu năm: trục Trái Đất chao đảo',
      transition: 'fade',
      say: '{a}Giờ hãy tua nhanh hàng triệu năm. {b}Trục quay của Trái Đất nghiêng khoảng hai mươi ba độ rưỡi. Chính độ nghiêng ấy tạo ra bốn mùa. {c}Và độ nghiêng này gần như không đổi, chỉ dao động khoảng hai độ rưỡi, một phần là nhờ lực hút của Mặt Trăng giữ Trái Đất đứng vững, như con quay được giữ thăng bằng.',
      draw(k) {
        chapterTag(k, 'Hàng triệu năm');
        em(k, { moonDist: 6, moonAng: 0.5, cam: [0, 0.5, 5.2], look: [0.6, 0, 0], tilt: 0.41 + 0.04 * Math.sin(k.gt * 0.8), spin: 0.25 });
        const { ctx } = k; ctx.strokeStyle = P.gold; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(W / 2 - 110 * Math.sin(0.41), 540 - 420 * Math.cos(0.41) * 0.98); ctx.lineTo(W / 2 + 110 * Math.sin(0.41), 540 + 420 * Math.cos(0.41) * 0.98); ctx.stroke(); ctx.setLineDash([]);
        bigNum(k, '23,4°', W / 2 + 330, 220, 'b', { size: 100, color: P.gold });
        chip(k, 'MÔ PHỎNG', 60, 1010, MP);
      },
    },
    {
      say: '{a}Năm 1993, nhóm của nhà thiên văn Jacques Laskar tính thử: nếu không có Mặt Trăng, trục Trái Đất có thể chao đảo hỗn loạn, từ gần thẳng đứng tới nghiêng gần nằm ngang. {b}Khi ấy, có thể có những thời kỳ cả một vùng rộng lớn chìm trong ngày không đêm suốt nhiều tháng, trong khi phía bên kia đóng băng trong bóng tối.',
      draw(k) {
        const t = k.at('a', 6, 'inOut'), tilt = 0.41 + 1.0 * Math.sin(t * Math.PI * 1.5) * t;
        em(k, { moonDist: 6, moonAng: 0.5, fade: 0, cam: [0, 0.5, 5.2], look: [0, 0, 0], tilt, spin: 0.25 });
        chip(k, 'GIẢ THUYẾT 1993 · MÔ PHỎNG', 60, 70, MP);
        bigNum(k, '0° ↔ 85°?', W / 2, 960, 'a', { size: 110, color: P.gold });
      },
    },
    {
      say: '{a}Nhưng năm 2012, một nhóm khác chạy mô phỏng lâu hơn, chính xác hơn, và thấy bức tranh dịu hơn nhiều. {b}Không có Mặt Trăng, trục Trái Đất vẫn chao đảo, nhưng chậm và trong một khoảng hẹp hơn, trong hàng trăm triệu năm. {c}Mùa sẽ thất thường hơn, khí hậu dễ đổi hơn. Nhưng không phải ngày tận thế.',
      draw(k) {
        space(k, { n: 100 });
        const { ctx } = k, x0 = 200, x1 = 1720, y0 = 560;
        ctx.strokeStyle = 'rgba(245,241,230,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, 200); ctx.lineTo(x0, 900); ctx.lineTo(x1, 900); ctx.stroke();
        const line = (f, p, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); for (let i = 0; i <= 300 * p; i++) { const u = i / 300; (i ? ctx.lineTo : ctx.moveTo).call(ctx, x0 + u * (x1 - x0), f(u)); } ctx.stroke(); };
        line((u) => y0 - 280 * Math.sin(u * 31) * Math.cos(u * 7), k.at('a', 2), 'rgba(229,56,59,0.6)', 4);
        line((u) => y0 - 90 * Math.sin(u * 11) - 30 * Math.sin(u * 37), k.at('a', 4), P.gold, 6);
        line((u) => y0 - 14 * Math.sin(u * 60), 1, '#7FD38A', 4);
        label(k, '1993 (HỖN LOẠN)', 1500, 230, 'a', { size: 34, color: P.red });
        label(k, '2012 (DỊU HƠN)', 1500, 430, 'a', { size: 34, color: P.gold });
        label(k, 'CÓ MẶT TRĂNG', 1500, 620, 'a', { size: 34, color: '#7FD38A' });
        label(k, 'ĐỘ NGHIÊNG TRỤC', x0 + 10, 170, 'a', { size: 30, color: P.mute, align: 'left' });
        label(k, 'HÀNG TRĂM TRIỆU NĂM →', x1, 950, 'a', { size: 30, color: P.mute, align: 'right' });
        chip(k, 'MINH HOẠ XU HƯỚNG', 60, 70, MP);
        bigNum(k, 'KHÔNG PHẢI TẬN THẾ', W / 2, 1010, 'c', { size: 60, color: P.cream });
      },
    },
    {
      say: '{a}Còn một việc nữa Mặt Trăng đang âm thầm làm: nó phanh Trái Đất lại. {b}Thuỷ triều cọ xát với đáy biển, làm Trái Đất quay chậm dần. Một ngày dài thêm khoảng hai phần nghìn giây sau mỗi thế kỷ. {c}Bảy mươi triệu năm trước, thời khủng long, một năm có tới ba trăm bảy mươi hai ngày, mỗi ngày chỉ dài khoảng hai mươi ba tiếng rưỡi. {d}Hơn một tỷ năm trước nữa, một ngày chỉ có khoảng mười tám tiếng.',
      draw(k) {
        space(k, { n: 100 });
        earthPhoto(k, W / 2, 1620, lerp(620, 700, k.at(0, k.d, 'linear')));
        const rows = [['b', 'MỖI THẾ KỶ', '+~1,8 MILI GIÂY'], ['c', '70 TRIỆU NĂM TRƯỚC', '372 NGÀY · ~23,5 GIỜ'], ['d', '1,4 TỶ NĂM TRƯỚC', '~18 GIỜ / NGÀY']];
        rows.forEach(([c, a, b], i) => { label(k, a, 380, 330 + i * 200, c, { size: 48, align: 'left' }); label(k, b, 1540, 330 + i * 200, c, { size: 52, align: 'right', color: P.gold }); });
        const ang = k.t * 4; for (let i = 0; i < 40; i++) k.dot((k.rand(i) * W + k.t * 30) % W, 80 + k.rand(i + 9) * 900, 2, '#FFFFFF', 0.5); k.ctx.strokeStyle = P.cream; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.arc(W / 2, 150, 60, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.beginPath(); k.ctx.moveTo(W / 2, 150); k.ctx.lineTo(W / 2 + Math.cos(ang) * 50, 150 + Math.sin(ang) * 50); k.ctx.stroke();
        bigNum(k, 'MẶT TRĂNG PHANH TRÁI ĐẤT', W / 2, 960, 'a', { size: 70, color: P.cream, p: k.at(0, 0.6) });
      },
    },
    {
      say: '{a}Nếu Mặt Trăng biến mất, chiếc phanh ấy gần như được nhả ra. {b}Ngày của chúng ta sẽ thôi dài thêm, và dừng lại ở khoảng hai mươi bốn tiếng như bây giờ. {c}Bạn sẽ không nhận ra. Nhưng những chiếc đồng hồ nguyên tử thì có.',
      draw(k) {
        em(k, { moonDist: 6, moonAng: 0.5, fade: 1 - k.at('a', 1.5), cam: [0, 0.5, 6.4], look: [0.4, 0, 0], spin: 0.4 });
        bigNum(k, 'NGÀY THÔI DÀI THÊM', W / 2, 960, 'b', { size: 84, color: P.gold });
        chip(k, 'MÔ PHỎNG', 60, 70, MP);
      },
    },

    // ================= 7. NẾU CHƯA TỪNG CÓ MẶT TRĂNG =================
    {
      chapter: 'Nếu Mặt Trăng chưa từng tồn tại',
      transition: 'fade',
      say: '{a}Câu hỏi còn lạ hơn: nếu Mặt Trăng chưa từng tồn tại thì sao? {b}Các nhà khoa học cho rằng khoảng bốn tỷ rưỡi năm trước, một hành tinh nhỏ cỡ Sao Hoả đã đâm vào Trái Đất non trẻ. {c}Mảnh vỡ bắn ra, gom lại, thành Mặt Trăng. Lúc ấy nó ở gần hơn bây giờ hơn mười lần, và to khủng khiếp trên bầu trời.',
      draw(k) {
        chapterTag(k, 'Nếu chưa từng có');
        space(k, { n: 120 });
        const p = k.at(0, k.cue('b', 3), 'in'), boom = k.at(k.cue('b', 3), 2);
        k.dot(1200, 560, 230, '#B4532A', 1); k.dot(1200, 560, 230 * 0.95, '#D4643C', 0.6);
        k.dot(lerp(280, 980, p), lerp(260, 470, p), 120, '#8A7A6A', 1 - boom);
        for (let i = 0; i < 90; i++) { const a = -2.4 + k.rand(i) * 1.6, r = boom * (200 + 500 * k.rand(i + 5)); k.dot(1000 + Math.cos(a) * r, 470 + Math.sin(a) * r, 3 + 6 * k.rand(i + 9), i % 2 ? '#FFB27A' : '#C9C3B8', boom * (1 - k.at('c', 2) * 0.5)); }
        moonPhoto(k, 600, 300, 140 * k.at('c', 2), k.at('c', 2));
        chip(k, 'GIẢ THUYẾT VA CHẠM KHỔNG LỒ · MINH HOẠ', 60, 70, MP);
        bigNum(k, '~4,5 TỶ NĂM TRƯỚC', W / 2, 960, 'b', { size: 80, color: P.gold });
      },
    },
    {
      say: '{a}Thuỷ triều thời ấy mạnh hơn bây giờ rất nhiều. {b}Một số nhà khoa học cho rằng những vũng nước triều, lúc ngập lúc cạn ven bờ, có thể đã giúp những loài cá đầu tiên tập sống trên cạn. {c}Đó mới là giả thuyết. Nhưng nếu đúng, không có Mặt Trăng, có lẽ sẽ không có tổ tiên của chúng ta trườn lên bờ.',
      draw(k) {
        const g = k.ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#E8B27A'); g.addColorStop(1, '#5A7A8A'); k.ctx.fillStyle = g; k.ctx.fillRect(0, 0, W, H);
        moonPhoto(k, 1500, 260, 220);
        const lv = 700 + 120 * Math.sin(k.gt * 0.7); k.ctx.fillStyle = 'rgba(40,90,110,0.8)'; k.ctx.fillRect(0, lv, W, H - lv);
        k.ctx.fillStyle = '#6A5A48'; k.ctx.beginPath(); k.ctx.moveTo(0, 820); k.ctx.quadraticCurveTo(700, 700, 1100, 760); k.ctx.lineTo(1100, H); k.ctx.lineTo(0, H); k.ctx.fill();
        const fx = 700 + 120 * k.at('b', 6, 'inOut'); k.ctx.fillStyle = '#4A5A3A'; k.ctx.beginPath(); k.ctx.ellipse(fx, 742, 70, 20, -0.15, 0, Math.PI * 2); k.ctx.fill();
        chip(k, 'GIẢ THUYẾT · MINH HOẠ', 60, 70, MP);
        bigNum(k, 'TRIỀU MẠNH → LÊN CẠN?', W / 2, 960, 'b', { size: 80, color: P.cream });
      },
    },

    // ================= 8. SỰ THẬT: NÓ ĐANG RỜI ĐI =================
    {
      chapter: 'Sự thật: Mặt Trăng đang rời xa chúng ta',
      transition: 'fade',
      say: '{a}Giờ, hãy quay lại thế giới thật. Mặt Trăng sẽ không biến mất trong một đêm. {b}Nhưng nhớ những tấm gương mà các phi hành gia để lại không? {c}Nhờ chúng, các nhà khoa học biết một điều kỳ lạ: Mặt Trăng đang rời xa Trái Đất, mỗi năm khoảng ba phẩy tám xăng-ti-mét.',
      draw(k) {
        chapterTag(k, 'Sự thật');
        fill(k, '#000');
        k.photo('guong-laser', 0, 0, W, H, { zoom: [1.25, 1.45], pan: [[0.55, 0.45], [0.55, 0.45]], dim: 0.25 });
        chip(k, 'NASA · GƯƠNG PHẢN XẠ APOLLO 11', 60, 1010, SRC);
        bigNum(k, '+3,8 CM / NĂM', W / 2, 520, 'c', { size: 140, color: P.gold });
      },
    },
    {
      say: '{a}Ba phẩy tám xăng-ti-mét, gần bằng tốc độ móng tay bạn dài ra mỗi năm. {b}Nguyên nhân vẫn là thuỷ triều: chỗ nước phồng lên kéo Mặt Trăng nhích lên quỹ đạo cao hơn từng chút, còn Trái Đất thì quay chậm lại. {c}Năng lượng quay của Trái Đất đang được chuyển dần cho Mặt Trăng.',
      draw(k) {
        space(k, { n: 100 });
        const cx = 640, cy = 560;
        k.ctx.fillStyle = 'rgba(46,134,222,0.5)'; k.ctx.save(); k.ctx.translate(cx, cy); k.ctx.rotate(-0.3 + 0.05 * Math.sin(k.gt)); k.ctx.beginPath(); k.ctx.ellipse(0, 0, 290, 245, 0, 0, Math.PI * 2); k.ctx.fill(); k.ctx.restore();
        earthPhoto(k, cx, cy, 230);
        const r = lerp(820, 880, k.at('b', 6, 'inOut')), a = -0.25;
        k.ctx.strokeStyle = 'rgba(245,241,230,0.3)'; k.ctx.lineWidth = 2; k.ctx.beginPath(); k.ctx.arc(cx, cy, 820, -0.6, 0.6); k.ctx.stroke();
        k.ctx.strokeStyle = 'rgba(255,211,78,0.7)'; k.ctx.setLineDash([10, 8]); k.ctx.beginPath(); k.ctx.arc(cx, cy, r, -0.6, 0.6); k.ctx.stroke(); k.ctx.setLineDash([]);
        moonPhoto(k, cx + Math.cos(a) * r, cy + Math.sin(a) * r, 60);
        bigNum(k, '≈ MÓNG TAY MỌC', 1300, 900, 'a', { size: 70, color: P.cream });
        chip(k, 'MINH HOẠ · PHÓNG ĐẠI', 60, 70, MP);
      },
    },
    {
      say: '{a}Nghe thì chậm, nhưng thời gian của vũ trụ rất dài. {b}Khoảng sáu trăm triệu năm nữa, Mặt Trăng sẽ ở quá xa để che kín Mặt Trời. Nhật thực toàn phần cuối cùng sẽ xảy ra, và không bao giờ có lại. {c}Còn chuyện nó thoát hẳn khỏi Trái Đất thì sẽ không kịp xảy ra. Khoảng năm tỷ năm nữa, Mặt Trời sẽ phình to thành một sao khổng lồ đỏ, trước khi điều đó có thể đến.',
      draw(k) {
        space(k, { n: 140 });
        const x0 = 200, x1 = 1720, y = 560, t = (g) => lerp(x0, x1, g / 5);
        k.ctx.strokeStyle = 'rgba(245,241,230,0.5)'; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.moveTo(x0, y); k.ctx.lineTo(lerp(x0, x1, k.at('a', 2)), y); k.ctx.stroke();
        label(k, 'HÔM NAY', x0, y + 60, 'a', { size: 34 });
        k.dot(t(0.6), y, 16, P.gold, k.at('b', 0.6)); label(k, '~600 TRIỆU NĂM: NHẬT THỰC CUỐI', t(0.6), y - 60, 'b', { size: 34, color: P.gold, align: 'left' });
        k.dot(t(5), y, 30, '#E5383B', k.at('c', 0.6)); label(k, '~5 TỶ NĂM: MẶT TRỜI PHÌNH TO', t(5), y + 70, 'c', { size: 34, color: P.red, align: 'right' });
        bigNum(k, 'NÓ SẼ KHÔNG KỊP RỜI ĐI', W / 2, 920, 'c', { size: 80, color: P.cream });
      },
    },

    // ================= KẾT =================
    {
      chapter: 'Kết: ngẩng lên đêm nay',
      transition: 'fade',
      say: '{a}Vậy nếu Mặt Trăng biến mất: {b}trong một giây, bạn không cảm thấy gì. {c}Trong một đêm, bóng tối dày hơn trăm lần, và loài vật lạc mất chiếc đồng hồ của chúng. {d}Sáng hôm sau, con nước chỉ còn một phần ba. {e}Một năm sau, không còn rằm, không còn nhật thực. {f}Và hàng triệu năm sau, trục Trái Đất bắt đầu chao đảo.',
      draw(k) {
        space(k, { n: 120 });
        const rows = [['b', '1 GIÂY', 'KHÔNG CẢM THẤY GÌ'], ['c', '1 ĐÊM', 'TỐI HƠN 100 LẦN'], ['d', 'SÁNG MAI', 'TRIỀU CÒN 1/3'], ['e', '1 NĂM', 'HẾT RẰM, HẾT NHẬT THỰC'], ['f', 'TRIỆU NĂM', 'TRỤC CHAO ĐẢO']];
        rows.forEach(([c, a, b], i) => { const y = 220 + i * 150; label(k, a, 440, y, c, { size: 52, align: 'left', color: P.gold }); label(k, b, 1480, y, c, { size: 50, align: 'right' }); });
      },
    },
    {
      say: '{a}Hãy quay lại đêm rằm tháng Tám ấy, nhưng lần này, là thật. {b}Mặt Trăng vẫn ở đó, tròn vành vạnh trên đầu những đứa trẻ rước đèn. {c}Từ đêm Trung thu năm ngoái đến đêm nay, nó đã lùi xa thêm chừng ba, bốn phân. Chẳng ai nhận ra.',
      draw(k) {
        nightSky(k, 1); moonPhoto(k, 1320, 320, 150 + 4 * Math.sin(k.gt * 0.2)); shore(k, 860, 1);
        for (let i = 0; i < 6; i++) { const x = 300 + i * 160 + 30 * Math.sin(k.gt * 0.5 + i); k.dot(x, 820 + 6 * Math.sin(k.gt * 2 + i), 14, i % 2 ? '#FFD34E' : '#E5383B', 0.9 * k.at('b', 1)); k.ctx.save(); k.ctx.globalAlpha = 0.4 * k.at('b', 1); const g = k.ctx.createRadialGradient(x, 820, 2, x, 820, 60); g.addColorStop(0, 'rgba(255,200,90,0.8)'); g.addColorStop(1, 'rgba(255,200,90,0)'); k.ctx.fillStyle = g; k.ctx.fillRect(x - 60, 760, 120, 120); k.ctx.restore(); }
        bigNum(k, '+3–4 CM SAU MỘT NĂM', W / 2, 980, 'c', { size: 64, color: P.gold });
        chip(k, 'MINH HOẠ', 60, 70, MP);
      },
    },
    {
      say: '{a}Một hạt bụi xanh nhỏ bé, với một người bạn đồng hành bằng đá xám. {b}Nó giữ cho biển của chúng ta thở, cho đêm của chúng ta có ánh sáng, cho những chiếc lịch có ngày rằm. {c}Lần tới ngẩng lên nhìn trăng, hãy nhớ: nó đang rời đi, chậm đến mức chỉ những tấm gương nhỏ trên mặt nó mới biết.',
      tail: 1.4,
      draw(k) {
        fill(k, '#000');
        k.photo('trai-dat-moc', 0, 0, W, H, { zoom: [1.3, 1.0], pan: [[0.56, 0.3], [0.5, 0.55]] });
        chip(k, 'NASA · APOLLO 8 · TRÁI ĐẤT MỌC', 60, 70, SRC);
      },
    },
    {
      say: '{a}Nếu chỉ được giữ lại một điều, bạn chọn: {b}ánh trăng rằm đêm Trung thu, {c}hay một lần được tận mắt thấy nhật thực toàn phần? {d}Viết lựa chọn của bạn ở phần bình luận.',
      draw(k) {
        fill(k, '#000');
        k.photo('trang-ram', 120, 200, 760, 600, { zoom: [1.05, 1.1], credit: false });
        k.photo('nhat-thuc', 1040, 200, 760, 600, { zoom: [1.1, 1.15], credit: false });
        k.ctx.fillStyle = P.cream; k.ctx.fillRect(W / 2 - 3, 180, 6, 640);
        bigNum(k, 'TRĂNG RẰM', 500, 130, 'b', { size: 76, color: P.cream });
        bigNum(k, 'NHẬT THỰC', 1420, 130, 'c', { size: 76, color: P.gold });
        bigNum(k, 'BẠN CHỌN?', W / 2, 960, 'd', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Tập sau trên Hạt Bụi Xanh: kính James Webb nhìn ngược thời gian, về những ngày đầu của vũ trụ. {b}Và nó thấy những thiên hà quá lớn, quá sáng, xuất hiện quá sớm, như những đứa trẻ sơ sinh đã cao bằng người lớn. {c}Thứ mà các nhà khoa học nói là không thể tồn tại. Đăng ký kênh để không bỏ lỡ.',
      tail: 2.2,
      draw(k) {
        space(k, { n: 240 });
        label(k, 'TẬP SAU', W / 2, 110, 'a', { size: 60, color: P.mute });
        for (let i = 0; i < 40; i++) { const x = k.rand(i + 50) * W, y = 200 + k.rand(i + 60) * 560, r = 3 + 10 * Math.pow(k.rand(i + 70), 3); k.dot(x, y, r, i % 4 ? '#FFB27A' : '#CFE3FF', 0.5 + 0.5 * k.at('b', 1)); }
        const g = k.ctx.createRadialGradient(W / 2, 470, 4, W / 2, 470, 120 * k.at('b', 2)); g.addColorStop(0, 'rgba(255,120,80,1)'); g.addColorStop(1, 'rgba(255,80,40,0)'); k.ctx.fillStyle = g; k.ctx.fillRect(W / 2 - 130, 340, 260, 260);
        bigNum(k, 'KÍNH JAMES WEBB', W / 2, 780, 'a', { size: 80, color: P.cream });
        bigNum(k, 'THỨ KHÔNG THỂ TỒN TẠI?', W / 2, 900, 'c', { size: 76, color: P.gold });
        chip(k, '🔔 ĐĂNG KÝ HẠT BỤI XANH', W / 2 - 230, 1010, { bg: P.gold, p: k.at('c', 0.6) });
      },
    },
  ],
};
