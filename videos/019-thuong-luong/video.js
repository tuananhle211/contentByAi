// Tập 4 series Hùng Vương — Thuồng luồng có thật không? Vì sao người Việt cổ xăm mình (hoạt hình phẳng, tếu táo)
// Đối chiếu nguồn:
//   Đại Việt sử ký toàn thư (1479), Ngoại kỷ – Hồng Bàng thị: dân ở núi xuống sông đánh cá thường bị giao long làm hại; vua bảo giống
//     ở núi và giống ở nước khác nhau, chúng ưa đồng loại mà ghét dị loại; bèn bảo lấy mực vẽ hình thủy quái lên mình → thuồng luồng
//     không hại nữa; "tục vẽ mình của Bách Việt bắt đầu từ đó". Lĩnh Nam chích quái kể chuyện tương tự.
//   Hán thư – Địa lý chí (Ban Cố, thế kỷ 1): người Việt "văn thân đoạn phát, dĩ tị giao long chi hại" (vẽ mình cắt tóc để tránh hại giao long).
//   Toàn thư, Kỷ nhà Trần: tổ tiên họ Trần đời đời làm nghề đánh cá; gia pháp họ Trần con cháu chạm hình rồng ở đùi để tỏ không quên gốc;
//     Anh Tông lúc lên ngôi lẩn tránh việc ấy. Cuối năm 1284 quân sĩ thích hai chữ "Sát Thát" lên cánh tay.
//   Toàn thư, năm 1282 (Trần Nhân Tông): có cá sấu đến sông Lô; vua sai Thượng thư bộ Hình Nguyễn Thuyên làm văn ném xuống sông, cá sấu
//     bỏ đi; vua cho việc giống Hàn Dũ (văn hào đời Đường), ban đổi họ Hàn; Thuyên giỏi thơ phú quốc ngữ (Nôm), thơ phú nước ta dùng
//     nhiều quốc ngữ bắt đầu từ đó.
//   Thủy Tinh và quân thủy tộc: truyện Sơn Tinh – Thủy Tinh (tập 004). Lũ sông Hồng: mùa mưa lũ hằng năm.
//   Trăn gấm (Malayopython reticulatus): rắn dài nhất thế giới, cá thể > 6 m, bơi giỏi, giết mồi bằng cách siết.
//   Đuối nước: mỗi năm Việt Nam khoảng 2.000 trẻ em tử vong (Bộ LĐ-TB&XH, UNICEF).
import { C } from '/engine/kit.js';
import { subscribeScene, nextEpisodeScene } from '/engine/templates.js';
import * as thumbs from '/videos/019-thuong-luong/thumbs.js';

const G = 880; // mặt đất
const RIVER = '#5b9bd5';
const KING = { body: 'man', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'kingfeather', beard: true, hair: 'short', cape: '#b5482c' };
const THUY = { body: 'big', outfit: 'robe', color: '#2f78c4', color2: '#9fd3f2', hair: 'long', hairColor: '#1d3f66', hat: 'wave', cape: '#1d4f8a', prop: 'trident' };
const LLQ = { body: 'big', outfit: 'robe', color: '#1f7a8c', color2: '#f6c344', hair: 'long', hairColor: '#1d3f66', hat: 'crown', cape: '#155a6a' };
const BA = { body: 'woman', outfit: 'dress', color: '#6b4a2d', color2: '#c9a24a', hair: 'bun', hairColor: '#b9b4ab' };
const MADA = { body: 'woman', outfit: 'dress', color: '#eef2f0', color2: '#c9d6d0', hair: 'ghost', skin: '#dfe8e4', face: 'blank', float: true, alpha: 0.85 };
const DAN = (c, extra = {}) => ({ body: 'man', outfit: 'bare', color: c, color2: '#f6c344', hair: 'short', hat: 'feather', ...extra });
const TRAN = { body: 'man', outfit: 'robe', color: '#f6c344', color2: '#b5482c', hat: 'crown', hair: 'topknot', cape: '#b5482c' };
const QUAN = { body: 'man', outfit: 'robe', color: '#3d6fa8', color2: '#f6c344', hat: 'band', hair: 'topknot', beard: true };
const LINH = (c) => ({ body: 'man', outfit: 'tunic', color: c, color2: '#f6c344', hair: 'short', hat: 'helmet', sleeves: false });
const KC = ['#e4572e', '#2e86de', '#f6c344', '#3bb273', '#8e5bd3', '#ef6f9a', '#f08a24', '#1f7a8c'];
const KID = (i, extra = {}) => ({ body: 'kid', outfit: 'tunic', color: KC[i % KC.length], color2: '#fffaf0', hair: 'topknot', ...extra });

function cap(k, text, cue, o = {}) {
  const y = o.y ?? 995;
  const b = k.text(text, o.x ?? k.W / 2, y, { size: o.size ?? 54, font: 'title', p: k.at(cue, o.dur ?? 1.2, 'linear'), maxWidth: 1760, color: o.color ?? '#3b2f2a', outline: '#fffaf0', outlineWidth: 12 });
  if (o.hl) k.highlight((o.x ?? k.W / 2) - b.w / 2 - 16, y - 34, b.w + 32, 68, { p: k.at(k.cue(cue, (o.dur ?? 1.2) + 0.2), 0.5), color: o.hl });
}
function say(k, text, c, box, tail, o = {}) {
  k.bubble(box[0], box[1], box[2], box[3], tail[0], tail[1], { p: k.at(c, 0.4), text, size: o.size ?? 44, seed: o.seed, think: o.think });
}
// Con dấu đỏ nghiêng.
function stamp(k, x, y, text, p, o = {}) {
  const s = Math.max(0.01, k.ease.back(Math.min(1, p)) * (1 + 0.6 * (1 - Math.min(1, p))));
  k.group({ x, y, s, r: o.r ?? -0.12, a: Math.min(1, p * 3) }, () => {
    const w = o.w ?? 420;
    k.rect(-w / 2, -60, w, 120, { stroke: o.color ?? '#c0392b', width: 8, fillStyle: 'solid', seed: 77 });
    k.text(text, 0, 4, { size: o.size ?? 60, font: 'title', color: o.color ?? '#c0392b' });
  });
}
// Tấm giấy trích sử: tiêu đề + các dòng.
function doc(k, x, y, w, h, title, lines, p, o = {}) {
  k.group({ x, y, s: Math.max(0.01, k.ease.back(Math.min(1, p))), r: o.r ?? -0.02, a: Math.min(1, p * 3) }, () => {
    k.rect(-w / 2, -h / 2, w, h, { fill: '#f6e7c1', width: 5, seed: o.seed ?? Math.round(x) });
    k.text(title, 0, -h / 2 + 56, { size: o.titleSize ?? 44, font: 'title', color: '#b5482c', maxWidth: w - 60 });
    lines.forEach((l, i) => k.text(l[0], 0, -h / 2 + 140 + i * (o.gap ?? 64), { size: o.size ?? 40, color: '#3b2f2a', maxWidth: w - 70, p: l[1] ?? 1, fx: 'fade', weight: 600 }));
  });
}
// Bờ sông bên trái (hoặc phải nếu o.right).
function bank(k, x, y, o = {}) {
  const pts = o.right ? [[k.W + 40, y], [x, y], [x - 120, k.H + 40], [k.W + 40, k.H + 40]] : [[-40, y], [x, y], [x + 120, k.H + 40], [-40, k.H + 40]];
  k.poly(pts, { fill: o.color ?? '#8fbf6a', fillStyle: 'solid', width: 4, seed: o.seed ?? 31 });
  k.poly(pts.map(([px, py]) => [px, Math.max(py, y + 26)]), { fill: '#b98b5a', fillStyle: 'solid', stroke: 'none', seed: (o.seed ?? 31) + 1, alpha: 0.55 });
}
// Khung dưới nước: nền xanh sẫm dần + vệt sáng.
function under(k) {
  const { ctx, W, H } = k;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#6db3df'); g.addColorStop(1, '#14304d');
  ctx.save(); ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400);
  ctx.globalAlpha = 0.12; ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 5; i++) { const x = 200 + i * 380 + Math.sin(k.gt * 0.5 + i) * 40; ctx.beginPath(); ctx.moveTo(x, -50); ctx.lineTo(x + 90, -50); ctx.lineTo(x + 260, H); ctx.lineTo(x + 120, H); ctx.closePath(); ctx.fill(); }
  ctx.restore();
  for (let i = 0; i < 14; i++) {
    const x = (i * 157) % W, y = H - ((k.gt * 60 + i * 97) % (H + 100));
    k.circle(x + Math.sin(k.gt * 2 + i) * 10, y, 6 + (i % 3) * 4, { stroke: '#d6ecfa', width: 2, seed: 900 + i, alpha: 0.6 });
  }
}
// Biển số nghi phạm.
function plate(k, x, y, n, name, p) {
  k.group({ x, y, s: Math.max(0.01, k.ease.back(Math.min(1, p))), a: Math.min(1, p * 3) }, () => {
    k.rect(-170, -50, 340, 100, { fill: '#2b2f3d', stroke: '#fffaf0', width: 4, seed: 600 + n });
    k.text(`#${n} · ${name}`, 0, 4, { size: 42, font: 'title', color: '#fff3c4' });
  });
}

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    title: 'Thuồng luồng có thật không? Vì sao người Việt cổ xăm mình',
    description: `Thuồng luồng có thật không? Vì sao người Việt cổ phải vẽ hình thủy quái lên mình mới dám xuống sông đánh cá? Đội quân thủy tộc của Thủy Tinh rốt cuộc là ai?
Vẽ Là Hiểu giải mã truyền thuyết thuồng luồng (giao long): từ Đại Việt sử ký toàn thư, Hán thư, gia pháp xăm rồng của nhà Trần, chuyện Hàn Thuyên đuổi cá sấu năm 1282, đến cá sấu, trăn gấm và xoáy nước trên sông.`,
    footer: `📚 Nguồn tham khảo: Đại Việt sử ký toàn thư (1479) – Ngoại kỷ, Hồng Bàng thị; Kỷ nhà Trần (năm 1282, 1284, gia pháp chạm rồng); Lĩnh Nam chích quái; Hán thư – Địa lý chí; truyện Sơn Tinh – Thủy Tinh; số liệu đuối nước trẻ em: Bộ LĐ-TB&XH, UNICEF.
🔔 Đăng ký Vẽ Là Hiểu để xem trọn series Truyền thuyết Hùng Vương: Thánh Gióng → Sơn Tinh – Thủy Tinh → Con Rồng Cháu Tiên → Thuồng luồng → …
💬 Tập sau: 18 đời vua Hùng sống 2.622 năm? Giải mã nước Văn Lang.`,
    links: [
      ['▶ Tập trước: Con Rồng Cháu Tiên', '006-con-rong-chau-tien'],
      ['▶ Sơn Tinh – Thủy Tinh: cuộc chiến với lũ sông Hồng', '004-son-tinh-thuy-tinh'],
      ['▶ Xem từ đầu series: Thánh Gióng có thật không?', '003-thanh-giong-co-that-khong'],
      ['🔔 Đăng ký Vẽ Là Hiểu', 'https://www.youtube.com/@velahiu?sub_confirmation=1'],
    ],
    tags: ['thuồng luồng', 'thuồng luồng có thật không', 'giao long', 'thủy quái việt nam', 'người việt cổ xăm mình', 'tục xăm mình', 'sát thát', 'hàn thuyên đuổi cá sấu', 'sơn tinh thủy tinh', 'truyền thuyết hùng vương', 'truyền thuyết việt nam', 'sinh vật huyền bí việt nam', 'vẽ là hiểu'],
    hashtags: ['thuongluong', 'truyenthuyetvietnam', 'suviet'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '+0%',
    voices: {
      king: { voice: 'vi-VN-NamMinhNeural', pitch: '-12Hz', rate: '-6%' },
      dan: { voice: 'vi-VN-NamMinhNeural', pitch: '+14Hz', rate: '+10%' },
      ba: { voice: 'vi-VN-HoaiMyNeural', pitch: '-8Hz', rate: '-8%' },
      anhtong: { voice: 'vi-VN-NamMinhNeural', pitch: '+8Hz', rate: '+12%' },
      kids: { voice: 'vi-VN-HoaiMyNeural', pitch: '+40Hz', rate: '+18%' },
    },
    paper: '#f7f3ea',
    music: 'assets/music/background.mp3',
    musicVolume: 0.08,
    sfxVolume: 0.5,
  },

  scenes: [
    // ---------------- Mở đầu ----------------
    {
      chapter: 'Mở đầu',
      lead: 0.2,
      say: 'Ngày xưa, {need}muốn xuống sông đánh cá, người Việt phải làm một việc mà ngày nay… {mom}dễ bị mẹ mắng nhất: {tattoo}xăm mình. {why}Không phải để đẹp. {why2}Không phải để ngầu. {monster}Mà để một con quái vật dưới nước… {mist}nhầm mình là người nhà.',
      sfx: [['pop', 'need'], ['boing', 'mom', 0.6], ['scratch', 'tattoo', 0.5], ['bonk', 'why', 0.4], ['bonk', 'why2', 0.4], ['boom', 'monster', 0.5], ['wahwah', ['mist', 1.2], 0.5]],
      draw(k) {
        k.backdrop('day', { ground: G });
        const rise = k.at('monster', 1.4, 'out');
        k.prop('thuongluong', 1420, k.lerp(1020, 640, rise), 640, { glow: true, open: 0.2 + 0.5 * k.at('monster', 0.6), flip: true });
        k.water(720, { color: RIVER, alpha: 0.9 });
        bank(k, 640, 700);
        const tat = k.t > k.cue('tattoo');
        k.char(470, 720, 380, { ...DAN('#b5482c'), tattoo: tat, face: k.t > k.cue('mist') ? 'smug' : k.t > k.cue('mom') ? 'shock' : 'happy', pose: k.t > k.cue('mist') ? 'hips' : 'hold', p: k.at(0, 0.5) });
        k.char(180, 720, 330, { ...BA, color: '#ef6f9a', hair: 'bun', hairColor: '#3a2a20', face: 'angry', pose: 'hips', p: k.at('mom', 0.5), alpha: 1 - k.at('monster', 0.5) });
        k.group({ a: 1 - k.at('monster', 0.5) }, () => say(k, 'XĂM Á?!', 'mom', [60, 230, 300, 100], [170, 400]));
        k.text('XĂM MÌNH', 960, 150, { size: 130, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('tattoo', 0.5), outline: '#fffaf0', outlineWidth: 16 });
        k.group({ a: 1 - k.at('monster', 0.5) }, () => {
          [['để đẹp', 'why', 330], ['để ngầu', 'why2', 450]].forEach(([t, c, y]) => {
            k.text(t, 1300, y, { size: 64, font: 'title', color: '#6b5f55', fx: 'pop', p: k.at(c, 0.4), outline: '#fffaf0', outlineWidth: 10 });
            k.icon('cross', 1300, y, 150, { p: k.at(k.cue(c, 0.3), 0.3) });
          });
        });
        say(k, '…người nhà à?', 'mist', [1220, 220, 420, 110], [1500, 520], { think: true });
        k.vignette(0.35 * rise);
      },
    },
    {
      say: 'Đây là tập bốn trong series Truyền thuyết Hùng Vương. {prev}Ở tập Sơn Tinh, Thủy Tinh, bạn đã thấy đội quân thủy quái của Thủy Tinh. {prev2}Tập Con Rồng Cháu Tiên, Lạc Long Quân ném sắt nung vào miệng Ngư Tinh. {today}Hôm nay, mình lặn xuống gặp con thủy quái nổi tiếng nhất: thuồng luồng. {sub}Nếu bạn mới đến, đăng ký kênh nhé, các tập trước đang chờ bạn ở cuối video.',
      sfx: [['pop', 0.3], ['pop', 'prev'], ['pop', 'prev2'], ['tada', 'today', 0.5], ['ding', 'sub', 0.5]],
      draw(k) {
        k.text('SERIES TRUYỀN THUYẾT HÙNG VƯƠNG · TẬP 4', 960, 120, { size: 54, font: 'title', color: '#b5482c', p: k.at(0.2, 1.4, 'linear') });
        const cards = [
          ['prev', 'Tập 2 · Sơn Tinh – Thủy Tinh', () => { k.char(-90, 120, 230, { ...THUY, face: 'angry', pose: 'fight', shadow: false }); k.prop('crab', 90, 80, 120); k.prop('serpent', 120, -20, 200); }],
          ['prev2', 'Tập 3 · Con Rồng Cháu Tiên', () => { k.char(-100, 120, 230, { ...LLQ, face: 'smug', pose: 'point', shadow: false }); k.prop('ngutinh', 110, 30, 220, { flip: true, open: 0.7 }); }],
          ['today', 'Tập 4 · Thuồng luồng', () => { k.prop('thuongluong', 0, 20, 360, { glow: true, open: 0.6 }); }],
        ];
        cards.forEach(([c, title, art], i) => {
          const x = 380 + i * 580, y = 520;
          const p = k.at(c, 0.6, 'back');
          k.group({ x, y, s: Math.max(0.01, p), r: (i - 1) * 0.03 }, () => {
            k.rect(-260, -200, 520, 400, { fill: i === 2 ? '#2b2f3d' : '#fffaf0', width: 6, seed: 40 + i, p: p > 0 ? 1 : 0 });
            art();
            k.text(title, 0, 250, { size: 40, font: 'title', color: i === 2 ? '#b5482c' : '#3b2f2a', outline: '#fffaf0', outlineWidth: 8 });
          });
        });
        k.text('HÔM NAY', 1540, 270, { size: 56, font: 'title', color: '#e4572e', fx: 'pop', p: k.at(k.cue('today', 0.5), 0.4), outline: '#fffaf0', outlineWidth: 10 });
        stamp(k, 960, 930, 'ĐĂNG KÝ XEM TRỌN BỘ', k.at('sub', 0.5), { w: 640, size: 46 });
      },
    },
    {
      say: 'Hôm nay: {title}thuồng luồng có thật không? {q1}Nó là con gì? {q2}Vì sao cả một dân tộc phải vẽ mình để tránh nó? {q3}Và đội quân thủy tộc của Thủy Tinh, rốt cuộc là ai? {decode}Kể xong truyền thuyết, mình cùng giải mã.',
      sfx: [['tada', 'title', 0.5], ['pop', 'q1'], ['pop', 'q2'], ['pop', 'q3'], ['ding', 'decode', 0.5]],
      draw(k) {
        k.backdrop('sunset', { ground: G });
        k.prop('thuongluong', 560, 640, 760, { glow: true, open: 0.5, bob: 8, p: k.at('title', 0.8) });
        k.water(760, { color: '#4f7fb0', alpha: 0.9 });
        k.text('Thuồng luồng có thật không?', 960, 160, { size: 110, font: 'title', color: '#b5482c', p: k.at('title', 1.4, 'linear'), outline: '#fffaf0', outlineWidth: 16 });
        [['q1', 'Nó là con gì?'], ['q2', 'Vì sao phải vẽ mình?'], ['q3', 'Quân Thủy Tinh là ai?']].forEach(([c, t], i) => {
          k.icon('question', 1180, 330 + i * 120, 90, { p: k.at(c, 0.5) });
          k.text(t, 1250, 330 + i * 120, { size: 58, font: 'title', align: 'left', p: k.at(c, 1, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        });
        k.burst(1450, 900, 90, 'GIẢI MÃ', { p: k.at('decode', 0.5), size: 48 });
      },
    },

    // ---------------- Chương 1: Thuồng luồng là ai? ----------------
    {
      chapter: 'Thuồng luồng là ai?',
      say: 'Thuồng luồng, {han}sách chữ Hán gọi là giao long, {body}là loài thủy quái mình dài như rắn, {big}tương truyền to như thân cây, {home}sống ở những khúc sông sâu, những vực nước xoáy. {eat}Món khoái khẩu của nó? {buff}Trâu, bò… {ppl}và người đi tắm sông.',
      sfx: [['pop', 'han'], ['pop', 'body'], ['pop', 'home'], ['drumroll', 'eat', 0.3], ['bonk', 'buff', 0.5], ['boom', 'ppl', 0.4]],
      draw(k) {
        k.prop('thuongluong', 1360, 520, 820, { glow: k.t > k.cue('ppl'), open: 0.3 + 0.5 * k.at('ppl', 0.5), p: k.at(0.1, 0.8), bob: 6 });
        k.group({ x: 520, y: 540, s: Math.max(0.01, k.ease.back(k.at(0.1, 0.6))), r: -0.03 }, () => {
          k.rect(-400, -420, 800, 840, { fill: '#f6e7c1', width: 6, seed: 11 });
          k.text('HỒ SƠ THỦY QUÁI', 0, -350, { size: 64, font: 'title', color: '#b5482c' });
          const rows = [[0.4, 'Tên:', 'Thuồng luồng'], ['han', 'Tên Hán:', 'giao long'], ['body', 'Hình dạng:', 'mình rắn, rất dài'], ['home', 'Nơi ở:', 'vực sâu, nước xoáy'], ['buff', 'Khẩu vị:', 'trâu, bò…']];
          rows.forEach(([c, a, b], i) => {
            const y = -230 + i * 120;
            k.text(a, -350, y, { size: 44, font: 'title', align: 'left', color: '#6b5f55', fx: 'fade', p: k.at(c, 0.4) });
            k.text(b, -90, y, { size: 46, font: 'title', align: 'left', p: k.at(c, 0.9, 'linear') });
          });
          k.text('+ người đi tắm sông!', 40, 370, { size: 52, font: 'title', color: '#c0392b', fx: 'pop', p: k.at('ppl', 0.4) });
        });
        k.prop('ox', 1650, 900, 200, { p: k.at('buff', 0.4) });
        k.sweat(1700, 820, 1, { p: k.at('ppl', 0.4) });
      },
    },
    {
      say: [
        'Ở làng quê ngày xưa, {ba}chuyện thuồng luồng thường được kể bằng một giọng thế này:',
        { v: 'ba', text: '{warn}Đừng có tắm ở khúc sông đó nghe chưa. Khúc đó có thuồng luồng. {pull}Nó quấn chân, kéo xuống, là không ai lên được đâu.' },
        '{kids}Và thế là, cả làng trẻ con… {run}tự giác né khúc sông đó ra.',
      ],
      sfx: [['pop', 'ba'], ['ding', 'warn', 0.4], ['boom', 'pull', 0.4], ['pop', 'kids'], ['whoosh', 'run', 0.5], ['boing', ['run', 0.6], 0.5]],
      draw(k) {
        k.backdrop('dawn', { ground: G });
        k.prop('whirlpool', 1450, 790, 420, { p: k.at('warn', 0.5) });
        k.water(740, { color: RIVER, alpha: 0.75 });
        k.prop('whirlpool', 1450, 800, 420, { p: k.at('warn', 0.5), alpha: 0.9 });
        k.glowEyes(1450, 770, 0.9, '#d6ff5a', { p: k.at('pull', 0.5) });
        bank(k, 1000, 720);
        k.prop('bamboo', 120, 600, 300);
        k.char(330, 720, 350, { ...BA, face: k.t > k.cue('pull') ? 'shout' : 'smug', pose: k.t > k.cue('warn') ? 'point' : 'stand', p: k.at('ba', 0.5), flip: false });
        say(k, 'Khúc đó có thuồng luồng!', 'warn', [80, 160, 560, 110], [320, 400]);
        const run = k.at('run', 1.6, 'in');
        for (let i = 0; i < 4; i++) {
          const x0 = 560 + i * 110;
          k.char(x0 - run * (700 + i * 60), 720, 190, { ...KID(i), face: k.t > k.cue('pull') ? 'shock' : 'happy', pose: k.t > k.cue('pull') ? 'shout' : 'stand', walk: run > 0, flip: run > 0, p: k.at(k.cue('kids', i * 0.1), 0.4), shadow: false });
          k.motion(x0 - run * (700 + i * 60) + 60, 620, 60, 0, { p: run > 0 && run < 1 ? 1 : 0, n: 3, len: 50 });
        }
      },
    },
    {
      say: 'Nếu bạn đã xem tập Halloween của kênh, {mada}thì ma da cũng có nghề kéo chân người tắm sông. {ngu}Còn Ngư Tinh ở tập trước, thì chuyên nuốt thuyền. {club}Hội thủy quái Việt Nam, phải nói là đông thành viên ra phết. {boss}Nhưng trùm cuối, con duy nhất có tên trong cả sử sách, {tl}là thuồng luồng.',
      sfx: [['pop', 'mada'], ['pop', 'ngu'], ['tada', 'club', 0.4], ['drumroll', 'boss', 0.3], ['boom', 'tl', 0.5]],
      draw(k) {
        under(k);
        k.text('HỘI THỦY QUÁI VIỆT NAM', 960, 130, { size: 76, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('club', 0.5), outline: '#1b1b24', outlineWidth: 12 });
        k.char(330, 820, 380, { ...MADA, p: k.at('mada', 0.6), bob: 6 });
        k.text('ma da', 330, 900, { size: 50, font: 'title', color: '#fffaf0', fx: 'fade', p: k.at(k.cue('mada', 0.4), 0.4), outline: '#1b1b24', outlineWidth: 10 });
        k.prop('ngutinh', 760, 580, 380, { flip: true, open: 0.7, p: k.at('ngu', 0.6), bob: 6 });
        k.text('Ngư Tinh', 760, 900, { size: 50, font: 'title', color: '#fffaf0', fx: 'fade', p: k.at(k.cue('ngu', 0.4), 0.4), outline: '#1b1b24', outlineWidth: 10 });
        const tl = k.at('tl', 0.8, 'back');
        k.prop('thuongluong', 1420, 560, 640 * Math.max(0.01, tl), { glow: true, open: 0.6, bob: 6 });
        k.text('TRÙM CUỐI', 1420, 900, { size: 64, font: 'title', color: '#e4572e', fx: 'pop', p: k.at(k.cue('tl', 0.5), 0.4), outline: '#fffaf0', outlineWidth: 12 });
        k.prop('scroll', 1680, 300, 150, { p: k.at('boss', 0.5), rotate: 0.2 });
      },
    },

    // ---------------- Chương 2: Đội quân của Thủy Tinh ----------------
    {
      chapter: 'Đội quân của Thủy Tinh',
      say: 'Nhớ trận Sơn Tinh, Thủy Tinh không? {rain}Thủy Tinh hô mưa, gọi gió, {army}kéo theo cả đội quân thủy tộc: {crab}cua, {fish}cá, {tl}và thuồng luồng. {flood}Nước dâng lên tận lưng đồi. {joke}Đội hình này mà đi thi đấu, chắc chắn xin đá sân nhà… {under}dưới nước.',
      sfx: [['boom', 'rain', 0.4], ['drumroll', 'army', 0.3], ['pop', 'crab'], ['pop', 'fish'], ['boom', 'tl', 0.5], ['slideUp', 'flood', 0.5], ['boing', 'under', 0.6]],
      draw(k) {
        k.backdrop('night', { ground: G });
        k.prop('storm', 500, 200, 380, { rain: true, bolt: k.t > k.cue('rain') && (k.gt % 1.6) < 0.15, p: k.at('rain', 0.5) });
        k.prop('storm', 1400, 180, 420, { rain: true, p: k.at('rain', 0.5) });
        const lv = k.lerp(1000, 640, k.at('flood', 3, 'inOut'));
        k.char(360, lv + 40, 420, { ...THUY, face: 'shout', pose: 'shout', p: k.at(0.2, 0.6), bob: 4 });
        k.prop('crab', 760, lv - 30, 170, { p: k.at('crab', 0.5), bob: 8 });
        k.prop('fish', 1000, lv - 60, 200, { p: k.at('fish', 0.5), bob: 8 });
        k.prop('thuongluong', 1450, lv - 140, 620, { glow: true, open: 0.6, p: k.at('tl', 0.6) });
        k.water(lv, { color: '#3f6f9f', alpha: 0.85 });
        k.text('ĐỘI QUÂN THỦY TỘC', 1150, 100, { size: 80, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('army', 0.5), outline: '#1b1b24', outlineWidth: 12 });
        cap(k, 'xin đá sân nhà… dưới nước', 'under', { y: 990, color: '#3b2f2a' });
      },
    },
    {
      say: 'Mà nói thật, {yearly}trận đánh ấy năm nào cũng diễn lại. {season}Cứ đến mùa mưa lũ, nước sông Hồng dâng cao. {dike}Đê vỡ, ruộng ngập, {ox}trâu bò, nhà cửa bị cuốn trôi. {think}Với người xưa, một thứ kéo được cả con trâu xuống nước, {must}thì chắc chắn phải là… một con gì đó rất to.',
      sfx: [['pop', 'yearly'], ['slideUp', 'season', 0.4], ['boom', 'dike', 0.6], ['whoosh', 'ox', 0.5], ['ding', 'think', 0.4], ['boom', ['must', 1.2], 0.5]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.prop('calendar', 230, 220, 200, { text: '↻', label: 'MỖI NĂM', p: k.at('yearly', 0.5) });
        const lv = k.lerp(900, 730, k.at('season', 2.5, 'inOut'));
        k.prop('stilthouse', 1550, 560, 340, { p: 1 });
        k.prop('dike', 760, 700, 500, { w: 2.2 });
        k.burst(760, 610, 90, 'VỠ!', { p: k.at('dike', 0.5) * (1 - k.at(k.cue('dike', 1.8), 0.4)), size: 48 });
        const sh = k.shake('dike', 0.5, 10);
        const drift = k.at('ox', 4, 'linear');
        k.group({ x: sh.x, y: sh.y }, () => {
          k.prop('ox', 1300 - drift * 600, lv - 30, 220, { p: k.at('ox', 0.5), rotate: Math.sin(k.gt * 2) * 0.15 });
        });
        k.group({ a: k.at('must', 1) * 0.55 }, () => k.prop('thuongluong', 1000, lv + 170, 760, { fill: '#123a3d' }));
        k.water(lv, { color: '#8a7a55', alpha: 0.8 });
        say(k, 'Con gì kéo được cả trâu?', 'think', [1180, 150, 560, 110], [1300, 340], { think: true });
      },
    },
    {
      say: 'Không chỉ lũ. {slide}Ở một số làng ven sông, mỗi khi bờ sông bỗng sạt lở, {hole}ruộng tự nhiên sụt thành hố, {rumor}người ta lại đồn: thuồng luồng vừa đi qua đấy. {sci}Ngày nay, ta biết đó là dòng nước âm thầm khoét chân bờ sông. {joke}Nhưng phải công nhận: hai chữ "thuồng luồng" nghe… {easy}dễ nhớ hơn "xói lở bờ sông" nhiều.',
      sfx: [['boom', 'slide', 0.5], ['bonk', 'hole', 0.5], ['pop', 'rumor'], ['ding', 'sci', 0.5], ['boing', 'easy', 0.6]],
      draw(k) {
        k.backdrop('day', { ground: 2000 });
        const cut = k.at('sci', 2, 'inOut');
        // mặt cắt bờ sông: khoét chân bờ
        const fall = k.at('slide', 0.8, 'in');
        k.water(620, { color: RIVER, alpha: 0.9 });
        k.poly([[-40, 520], [820 - fall * 60, 520 + fall * 30], [880 - cut * 80, 760], [760 - cut * 140, 860], [880, 1100], [-40, 1100]], { fill: '#b98b5a', fillStyle: 'solid', width: 4, seed: 70 });
        k.poly([[-40, 500], [820 - fall * 60, 500 + fall * 30], [820 - fall * 60, 524 + fall * 30], [-40, 524]], { fill: '#8fbf6a', fillStyle: 'solid', width: 3, seed: 71 });
        k.prop('stilthouse', 360, 410, 230);
        for (let i = 0; i < 3; i++) k.arrow(1300 - i * 30, 700 + i * 70, 960 - cut * 120, 760 + i * 40, { p: k.at(k.cue('sci', i * 0.2), 0.6), width: 6, stroke: '#1d4f8a', seed: 72 + i });
        k.text('dòng nước khoét chân bờ', 1350, 980, { size: 48, font: 'title', color: '#1d4f8a', p: k.at(k.cue('sci', 0.6), 1.2, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        k.char(150, 500, 230, { ...DAN('#3b6ea5', { outfit: 'tunic', hat: 'non' }), face: k.t > k.cue('easy') ? 'laugh' : 'shock', pose: k.t > k.cue('rumor') ? 'point' : 'shout', p: k.at('slide', 0.5), shadow: false });
        say(k, 'Thuồng luồng vừa đi qua đấy!', 'rumor', [80, 90, 600, 110], [180, 270]);
        k.group({ a: k.at('slide', 0.4) * (1 - k.at('sci', 0.5)) }, () => k.prop('thuongluong', 1250, 830, 520, { fill: '#123a3d', glow: true, alpha: 0.6 }));
        k.text('"THUỒNG LUỒNG"', 1370, 230, { size: 70, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('joke', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.text('>  "xói lở bờ sông"', 1370, 340, { size: 52, font: 'title', color: '#6b5f55', fx: 'pop', p: k.at('easy', 0.5), outline: '#fffaf0', outlineWidth: 10 });
      },
    },

    // ---------------- Chương 3: Xăm mình để sống ----------------
    {
      chapter: 'Xăm mình để sống',
      say: [
        'Bây giờ đến chi tiết kỳ lạ nhất. {book}Đại Việt sử ký toàn thư chép rằng: thời vua Hùng, {fish}dân ở vùng núi xuống sông đánh cá, {hurt}thường bị giao long làm hại. {king}Họ bèn lên tâu với vua.',
        { v: 'dan', text: '{complain}Tâu vua! Thuồng luồng nó cứ nhè bọn con mà cắn!' },
      ],
      sfx: [['sparkle', 'book', 0.5], ['pop', 'fish'], ['boom', 'hurt', 0.5], ['pop', 'king'], ['boing', ['complain', 1.5], 0.5]],
      draw(k) {
        const toKing = k.at('king', 0.6, 'inOut');
        k.group({ x: -toKing * 1920 }, () => {
          k.backdrop('day', { ground: G });
          k.prop('thuongluong', 1350, 840, 520, { glow: true, open: 0.8 * k.at('hurt', 0.4), p: k.at('hurt', 0.4), flip: true });
          k.water(760, { color: RIVER, alpha: 0.9 });
          k.prop('boat', 1050, 790, 420, { fill: '#c98a3a', bob: 5 });
          k.char(990, 770, 230, { ...DAN('#e4572e'), face: k.t > k.cue('hurt') ? 'shock' : 'happy', pose: k.t > k.cue('hurt') ? 'shout' : 'hold', p: k.at('fish', 0.4), shadow: false });
          k.char(1120, 770, 230, { ...DAN('#3bb273'), face: k.t > k.cue('hurt') ? 'shock' : 'calm', pose: k.t > k.cue('hurt') ? 'shout' : 'point', p: k.at('fish', 0.4), shadow: false });
          k.burst(1260, 560, 80, 'ÁI!', { p: k.at('hurt', 0.4), size: 50 });
          bank(k, 520, 700);
          k.prop('mountain', 240, 520, 360);
          doc(k, 420, 360, 600, 300, 'Đại Việt sử ký toàn thư', [['"…thường bị giao long làm hại"', k.at('hurt', 1)]], k.at('book', 0.6), { seed: 12 });
        });
        k.group({ x: 1920 - toKing * 1920 }, () => {
          k.backdrop('day', { ground: G });
          k.prop('palace', 1300, 560, 600);
          k.char(1250, G, 420, { ...KING, face: 'calm', pose: 'stand', p: toKing });
          k.char(620, G, 330, { ...DAN('#e4572e'), face: 'sad', pose: 'shout', p: toKing, bob: 3 });
          k.sweat(680, G - 290, 1, { p: k.at('complain', 0.4) });
          say(k, 'Nó cứ nhè bọn con mà cắn!', 'complain', [260, 220, 580, 110], [560, 520]);
        });
      },
    },
    {
      say: [
        'Vua nghe xong, phán một câu rất… khoa học:',
        { v: 'king', text: '{logic}Giống ở núi với giống ở nước vốn khác nhau. {like}Chúng ưa đồng loại, {hate}ghét kẻ khác loài, nên mới làm hại.' },
        '{so}Giải pháp? {ink}Lấy mực, vẽ hình thủy quái lên mình. {done}Và theo sử chép, từ đó, thuồng luồng không cắn hại nữa.',
      ],
      sfx: [['ding', 0.6, 0.4], ['pop', 'like'], ['bonk', 'hate', 0.5], ['drumroll', 'so', 0.3], ['scratch', 'ink', 0.5], ['tada', 'done', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.char(260, G, 400, { ...KING, face: k.t > k.cue('ink') ? 'smug' : 'calm', pose: k.t > k.cue('so') ? 'present' : 'think', p: k.at(0, 0.5) });
        k.text('ƯA ĐỒNG LOẠI · GHÉT DỊ LOẠI', 1150, 130, { size: 64, font: 'title', color: '#b5482c', p: k.at('like', 1.6, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
        // trước: người không xăm → bị cắn
        k.group({ x: 800, y: 0 }, () => {
          k.prop('thuongluong', 0, 470, 330, { glow: true, open: 0.8, p: k.at('hate', 0.5) });
          k.char(0, 820, 280, { ...DAN('#3b6ea5'), face: 'shock', pose: 'shout', p: k.at('hate', 0.5) });
          k.icon('cross', 150, 330, 140, { p: k.at(k.cue('hate', 0.4), 0.4) });
        });
        k.arrow(1000, 600, 1180, 600, { p: k.at('so', 0.5), width: 8, head: 30, seed: 5 });
        // sau: xăm hình thủy quái → được tha
        k.group({ x: 1460, y: 0 }, () => {
          k.prop('thuongluong', 30, 470, 330, { open: 0.1, p: k.at('ink', 0.5) });
          k.char(0, 820, 280, { ...DAN('#3b6ea5'), tattoo: true, face: 'laugh', pose: 'cheer', p: k.at('ink', 0.5), bob: 3 });
          k.prop('heart', 190, 340, 100, { p: k.at('done', 0.4), bob: 4 });
          k.icon('check', 250, 520, 140, { p: k.at(k.cue('done', 0.3), 0.4) });
        });
        cap(k, 'vẽ hình thủy quái lên mình', 'ink', { hl: '#ffe08a' });
      },
    },
    {
      say: 'Nghĩ kỹ thì đây là {camo}chiến thuật ngụy trang đầu tiên của người Việt. {look}Thuồng luồng nhìn lên, {see}thấy một sinh vật đầy vằn, đầy vảy, {thinks}chắc nghĩ: "À, họ hàng nhà mình." {pass}Rồi lặng lẽ bơi đi. {today}Kiểu như ngày nay, mặc áo đồng phục công ty, {gate}là bác bảo vệ cho qua cổng, không hỏi han gì.',
      sfx: [['tada', 'camo', 0.5], ['pop', 'look'], ['sparkle', 'see', 0.4], ['ding', 'thinks', 0.4], ['whoosh', 'pass', 0.5], ['pop', 'today'], ['boing', 'gate', 0.6]],
      draw(k) {
        const cut = k.at('today', 0.5);
        k.group({ a: 1 - cut }, () => {
          under(k);
          k.char(760, 520, 380, { ...DAN('#b5482c'), tattoo: true, face: k.t > k.cue('pass') ? 'smug' : 'calm', pose: { l: [150, 10], r: [150, 10] }, bob: 6, shadow: false });
          const sw = k.at('pass', 2, 'in');
          k.prop('thuongluong', 1450 + sw * 900, 820, 560, { flip: true, open: 0.1, p: k.at('look', 0.6) });
          say(k, 'À, họ hàng nhà mình.', 'thinks', [1120, 380, 480, 110], [1330, 700], { think: true });
          k.text('NGỤY TRANG', 960, 130, { size: 96, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('camo', 0.5), outline: '#1b1b24', outlineWidth: 14 });
        });
        k.group({ a: cut }, () => {
          k.backdrop('day', { ground: G });
          k.rect(860, 420, 60, 460, { fill: '#7d858f', fillStyle: 'solid', width: 4, seed: 81 });
          k.rect(1300, 420, 60, 460, { fill: '#7d858f', fillStyle: 'solid', width: 4, seed: 82 });
          k.text('CÔNG TY', 1110, 380, { size: 52, font: 'title', p: cut });
          k.char(1520, G, 360, { body: 'man', outfit: 'tunic', color: '#4b5d7a', color2: '#f6c344', hair: 'short', hat: 'band', face: k.t > k.cue('gate') ? 'happy' : 'calm', pose: k.t > k.cue('gate') ? 'wave' : 'hips' });
          const walk = k.at('gate', 2.2, 'linear');
          k.char(500 + walk * 560, G, 340, { body: 'man', outfit: 'tunic', color: '#e4572e', color2: '#fffaf0', hair: 'short', face: 'smug', walk: walk > 0 && walk < 1 });
          say(k, 'Người nhà, mời vào!', 'gate', [1260, 230, 480, 110], [1500, 470]);
        });
      },
    },
    {
      say: 'Thú vị là, {china}không chỉ sử Việt kể vậy. {han}Sách Hán thư của Trung Hoa, viết cách đây gần hai nghìn năm, {quote}cũng chép người Việt ở phương Nam "văn thân, đoạn phát", {mean}nghĩa là vẽ mình, cắt tóc ngắn, {why}để tránh cái hại của giao long. {two}Hai bộ sử, hai nước, cùng một lời giải thích. {real}Tức là: tục xăm mình của người Việt cổ là có thật. {legend}Còn chuyện vì thuồng luồng, là cách người xưa giải thích tục ấy.',
      sfx: [['pop', 'china'], ['sparkle', 'han', 0.4], ['scratch', 'quote', 0.4], ['pop', 'mean'], ['ding', 'two', 0.5], ['tada', 'real', 0.4]],
      draw(k) {
        doc(k, 520, 470, 700, 560, 'Đại Việt sử ký toàn thư', [['(Việt Nam, 1479)', 1], ['"lấy mực vẽ hình', k.at(0.3, 0.8)], ['thủy quái lên mình"', k.at(0.3, 0.8)]], k.at(0.1, 0.6), { seed: 21 });
        doc(k, 1400, 470, 700, 560, 'Hán thư', [['(Trung Hoa, thế kỷ 1)', k.at('han', 0.6)], ['', 1], ['', 1]], k.at('han', 0.6), { seed: 22, r: 0.02 });
        k.text('文身斷髮', 1400, 560, { size: 110, font: 'title', color: '#3b2f2a', fx: 'pop', p: k.at('quote', 0.5) });
        k.text('vẽ mình · cắt tóc ngắn', 1400, 680, { size: 44, font: 'title', color: '#b5482c', p: k.at('mean', 1.2, 'linear') });
        k.text('=', 960, 470, { size: 140, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('two', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.text('"để tránh hại giao long"', 960, 815, { size: 56, font: 'title', p: k.at('why', 1.2, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        stamp(k, 520, 960, 'TỤC XĂM: CÓ THẬT', k.at('real', 0.5), { w: 620, size: 50, color: '#3f6f2a' });
        stamp(k, 1400, 960, 'LÝ DO: TRUYỀN THUYẾT', k.at('legend', 0.5), { w: 680, size: 46, r: 0.08 });
      },
    },
    {
      say: 'Mà khoan. {when}Toàn thư bảo chuyện này xảy ra thời vua Hùng. {long}Mà thời các vua Hùng, theo chính bộ sử ấy, kéo dài… {num}hai nghìn sáu trăm hai mươi hai năm. {kings}Chỉ với mười tám đời vua. {math}Chia ra, mỗi vua trị vì gần một trăm bốn mươi sáu năm? {hold}Giữ con số này lại nhé. Tập sau, mình giải mã.',
      sfx: [['scratch', 0.1, 0.4], ['pop', 'when'], ['drumroll', 'long', 0.3], ['boom', 'num', 0.5], ['pop', 'kings'], ['boing', 'math', 0.6], ['ding', 'hold', 0.5]],
      draw(k) {
        k.backdrop('dawn', { ground: G });
        k.text('2.622 năm', 600, 300, { size: 150, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('num', 0.5), outline: '#fffaf0', outlineWidth: 16 });
        k.text('÷ 18 đời vua', 600, 470, { size: 90, font: 'title', fx: 'pop', p: k.at('kings', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.text('≈ 146 năm/vua ?!', 600, 640, { size: 100, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('math', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.char(1450, G, 440, { ...KING, beard: 'long', beardColor: '#ffffff', face: k.t > k.cue('math') ? 'shock' : 'smug', pose: k.t > k.cue('math') ? 'shrug' : 'hips', p: k.at('when', 0.5) });
        k.sweat(1510, G - 380, 1.2, { p: k.at('math', 0.4) });
        stamp(k, 600, 860, 'TẬP SAU GIẢI MÃ', k.at('hold', 0.5), { w: 600, size: 54 });
      },
    },
    {
      say: 'Tục xăm mình còn sống rất lâu sau thời Hùng Vương. {tran}Đến nhà Trần, thế kỷ mười ba, {law}Toàn thư chép: gia pháp họ Trần, con cháu đều phải xăm hình rồng lên đùi, {root}để tỏ ý không quên gốc. {fish}Gốc gì? {boat}Tổ tiên họ Trần, đời đời làm nghề đánh cá. {river}Dân sông nước chính hiệu.',
      sfx: [['pop', 'tran'], ['scratch', 'law', 0.4], ['ding', 'root', 0.5], ['drumroll', 'fish', 0.3], ['tada', 'boat', 0.4]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.text('NHÀ TRẦN · thế kỷ 13', 960, 110, { size: 72, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('tran', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        doc(k, 480, 470, 640, 420, 'Gia pháp họ Trần', [['con cháu xăm rồng lên đùi', k.at('law', 1)], ['→ không quên gốc', k.at('root', 0.8)]], k.at('law', 0.6), { seed: 31, size: 42 });
        k.prop('dragon', 480, 590, 260, { p: k.at('law', 0.8) });
        k.char(1100, G, 420, { ...TRAN, outfit: 'bare', color: '#f6c344', tattoo: true, tattooColor: '#1f7a8c', face: 'smug', pose: 'hips', p: k.at('root', 0.5) });
        const bx = k.lerp(2100, 1560, k.at('boat', 1.6, 'out'));
        k.water(860, { color: RIVER, alpha: 0.9 });
        k.prop('boat', bx, 860, 380, { fill: '#c98a3a', bob: 5, p: k.at('boat', 0.3) });
        k.char(bx - 30, 840, 200, { ...DAN('#3b6ea5', { outfit: 'tunic', hat: 'non' }), face: 'happy', pose: 'hold', shadow: false, p: k.at('boat', 0.3) });
        k.text('tổ tiên: làm nghề đánh cá', 1560, 640, { size: 46, font: 'title', p: k.at(k.cue('boat', 0.6), 1.2, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: [
        'Nhưng có một người không chịu: {at}vua Trần Anh Tông. {hide}Theo Toàn thư, lúc mới lên ngôi, ngài đã lẩn tránh, {no}không chịu xăm rồng.',
        { v: 'anhtong', text: '{bye}Thôi… hôm nay trẫm bận!' },
        '{why}Vì sao ư? {nobook}Sử không ghi. {guess}Nhưng mình đoán… {needle}làm vua cả một nước, có khi vẫn sợ… mũi kim.',
      ],
      sfx: [['pop', 'at'], ['whoosh', 'hide', 0.5], ['bonk', 'no', 0.4], ['boing', 'bye', 0.5], ['pop', 'nobook'], ['drumroll', 'guess', 0.3], ['wahwah', ['needle', 1.4], 0.5]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.prop('palace', 1450, 560, 560);
        const run = k.at('hide', 1.6, 'inOut');
        k.char(900 - run * 520, G, 400, { ...TRAN, color: '#f6c344', face: k.t > k.cue('needle') ? 'sad' : k.t > k.cue('hide') ? 'shock' : 'calm', pose: k.t > k.cue('bye') ? 'wave' : 'stand', walk: run > 0 && run < 1, flip: run > 0 && run < 1, p: k.at('at', 0.5) });
        k.motion(900 - run * 520 + 120, 650, 80, 0, { p: run > 0 && run < 1 ? 1 : 0, n: 3, len: 70 });
        k.text('Trần Anh Tông', 900 - run * 520, 440, { size: 52, font: 'title', fx: 'fade', p: k.at('at', 0.5), outline: '#fffaf0', outlineWidth: 10 });
        say(k, 'Hôm nay trẫm bận!', 'bye', [60, 150, 480, 110], [330, 390]);
        // mũi kim xăm + mực
        k.group({ x: 1250, y: 700, r: -0.5, a: k.at('no', 0.5) }, () => {
          k.rect(-8, -150, 16, 200, { fill: '#c98a3a', fillStyle: 'solid', width: 3, seed: 90 });
          k.poly([[-6, 50], [6, 50], [0, 90]], { fill: '#7d858f', fillStyle: 'solid', width: 3, seed: 91 });
        });
        k.prop('pot', 1360, 800, 140, { p: k.at('no', 0.5), fill: '#24476b' });
        k.text('Sử không ghi lý do', 1300, 220, { size: 52, font: 'title', color: '#6b5f55', fx: 'pop', p: k.at('nobook', 0.4), outline: '#fffaf0', outlineWidth: 10 });
        k.text('Đoán: sợ kim?', 1300, 320, { size: 64, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('needle', 0.5), outline: '#fffaf0', outlineWidth: 12 });
      },
    },
    {
      say: 'Và rồi, {y}cuối năm 1284, {war}khi quân Nguyên Mông sắp tràn sang lần thứ hai, {arm}quân sĩ nhà Trần đồng lòng thích lên cánh tay hai chữ: {st}"Sát Thát", nghĩa là giết giặc Thát. {now}Lần này, hình xăm không còn để đuổi thuồng luồng nữa, {heart}mà là một lời thề giữ nước.',
      sfx: [['gong', 'y', 0.5], ['drumroll', 'war', 0.4], ['gong', 'arm', 0.5], ['boom', 'st', 0.5], ['sparkle', 'heart', 0.5]],
      draw(k) {
        k.backdrop('sunset', { ground: G });
        k.text('1284', 960, 120, { size: 90, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('y', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        for (let i = 0; i < 5; i++) k.char(180 + i * 150, G, 300, { ...LINH(['#7a3b2a', '#4f6b3a', '#3d5a80', '#7a3b2a', '#4f6b3a'][i]), face: 'angry', pose: k.t > k.cue('st') ? 'cheer' : 'stand', p: k.at(k.cue('war', i * 0.12), 0.4), bob: 2 });
        // cánh tay cận cảnh
        const p = k.at('arm', 0.7, 'back');
        k.group({ x: 1240, y: 560, s: Math.max(0.01, p), r: -0.1 }, () => {
          const { ctx } = k;
          ctx.save(); ctx.beginPath(); ctx.roundRect(-400, -105, 760, 210, 100); ctx.fillStyle = '#e7b48a'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#3b2f2a'; ctx.stroke(); ctx.restore();
          k.circle(400, 0, 115, { fill: '#e7b48a', fillStyle: 'solid', width: 6, seed: 96 });
          k.text('殺韃', -210, 0, { size: 100, font: 'title', color: '#24476b', p: k.at('st', 0.6), fx: 'fade' });
          k.text('SÁT THÁT', 110, 0, { size: 66, font: 'title', color: '#24476b', p: k.at('st', 1, 'linear') });
        });
        cap(k, 'từ đuổi thủy quái → lời thề giữ nước', 'now', { hl: '#ffe08a' });
      },
    },

    // ---------------- Chương 4: Giải mã ----------------
    {
      chapter: 'Giải mã: thuồng luồng là con gì?',
      say: 'Vậy rốt cuộc, {q}thuồng luồng là con gì? {line}Mình mời các nghi phạm ra xếp hàng. {s1}Nghi phạm số một: cá sấu. {s2}Số hai: trăn khổng lồ. {s3}Và số ba: một kẻ… {none}không có hình dạng.',
      sfx: [['drumroll', 'q', 0.3], ['click', 'line', 0.6], ['pop', 's1'], ['pop', 's2'], ['pop', 's3'], ['boom', 'none', 0.4]],
      draw(k) {
        k.rect(-100, -100, 2120, 1280, { fill: '#3a3f4f', fillStyle: 'solid', stroke: 'none', seed: 100 });
        for (let i = 0; i < 6; i++) {
          const y = 240 + i * 110;
          k.line(80, y, 1840, y, { stroke: '#8a93a6', width: 3, seed: 101 + i, p: k.at('line', 0.6) });
          k.text(`${(6 - i) * 0.5} m`, 60, y, { size: 26, color: '#c9d0dc', align: 'left', p: k.at('line', 0.6), fx: 'fade' });
        }
        k.text('NGHI PHẠM', 960, 120, { size: 80, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('q', 0.5), outline: '#1b1b24', outlineWidth: 12 });
        k.prop('crocodile', 380, 700, 520, { p: k.at('s1', 0.5), open: 0.3 + 0.3 * Math.max(0, Math.sin(k.gt * 2)) });
        plate(k, 380, 930, 1, 'Cá sấu', k.at('s1', 0.5));
        k.prop('python', 960, 650, 420, { p: k.at('s2', 0.5) });
        plate(k, 960, 930, 2, 'Trăn', k.at('s2', 0.5));
        k.prop('whirlpool', 1540, 760, 380, { p: k.at('s3', 0.5) });
        k.icon('question', 1540, 520, 220, { p: k.at('none', 0.5) });
        plate(k, 1540, 930, 3, '???', k.at('s3', 0.5));
      },
    },
    {
      say: 'Nghi phạm số một: {croc}cá sấu. {once}Bạn có thể nghĩ cá sấu chỉ có ở phương Nam. {wrong}Sai. {his}Sử cũ chép, cá sấu từng xuất hiện cả ở sông nước miền Bắc. {mouth}Hàm to, da vảy, nằm im dưới nước như khúc gỗ, {grab}đớp con mồi rồi lăn tròn kéo xuống sâu. {fit}Người trên bờ chỉ kịp thấy nước cuộn lên, rồi mất hút. {match}Khớp với lời đồn thuồng luồng đến lạ.',
      sfx: [['pop', 'croc'], ['pop', 'once'], ['bonk', 'wrong', 0.6], ['sparkle', 'his', 0.4], ['boom', 'grab', 0.6], ['whoosh', 'fit', 0.4], ['ding', 'match', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: G });
        const lunge = k.at('grab', 0.4, 'back');
        k.prop('crocodile', k.lerp(1300, 1100, lunge), k.lerp(800, 700, lunge), 700, { open: lunge > 0 ? 0.9 : 0.05, rotate: -0.15 * lunge, p: k.at('croc', 0.5) });
        k.water(780, { color: '#4f8a7a', alpha: 0.85 });
        k.prop('whirlpool', 1100, 820, 420, { p: k.at('fit', 0.5) });
        k.burst(980, 560, 90, 'PHẬP!', { p: k.at('grab', 0.4), size: 52 });
        bank(k, 600, 720);
        k.char(300, 720, 330, { ...DAN('#8e5bd3', { outfit: 'tunic', hat: 'non' }), face: k.t > k.cue('grab') ? 'shock' : k.t > k.cue('wrong') ? 'shock' : 'smug', pose: k.t > k.cue('fit') ? 'shout' : 'think', p: k.at('once', 0.5) });
        say(k, 'Cá sấu chỉ ở miền Nam thôi mà?', 'once', [30, 110, 720, 150], [300, 380], { think: true, size: 40 });
        k.icon('cross', 720, 120, 110, { p: k.at('wrong', 0.3) });
        k.text('miền Bắc cũng có!', 1300, 200, { size: 64, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('his', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        k.text('lăn tròn, kéo xuống sâu', 1300, 310, { size: 48, font: 'title', p: k.at('grab', 1.2, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        stamp(k, 1600, 430, 'KHỚP LỜI ĐỒN', k.at('match', 0.5), { w: 420, size: 46 });
      },
    },
    {
      say: [
        'Bằng chứng? {y}Năm 1282, đời vua Trần Nhân Tông, {croc}có cá sấu bơi đến sông Lô. {order}Vua sai quan Thượng thư bộ Hình là Nguyễn Thuyên… {write}làm một bài văn, {throw}rồi ném xuống sông. {gone}Và theo Toàn thư, cá sấu… tự bỏ đi.',
        '{lol}Không dao, không giáo. Chỉ một bài văn. {best}Có lẽ đây là bài văn có sức thuyết phục nhất lịch sử Việt Nam, {reader}vì người đọc là… một con cá sấu.',
      ],
      sfx: [['pop', 'y'], ['pop', 'croc'], ['pop', 'order'], ['scratch', 'write', 0.5], ['whoosh', 'throw', 0.5], ['slideDown', 'gone', 0.5], ['ding', 'best', 0.4], ['boing', ['reader', 1.2], 0.6]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.text('1282', 960, 110, { size: 90, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('y', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        const thr = k.at('throw', 1, 'inOut');
        const leave = k.at('gone', 2.5, 'in');
        k.prop('crocodile', 1450 + leave * 700, 780, 520, { p: k.at('croc', 0.5), flip: true, open: k.t > k.cue('throw') && k.t < k.cue('gone') ? 0.2 : 0 });
        k.sweat(1350 + leave * 700, 680, 1.2, { p: k.at(k.cue('throw', 1), 0.4) });
        k.water(800, { color: RIVER, alpha: 0.88 });
        bank(k, 780, 760);
        k.char(260, 760, 380, { ...TRAN, face: 'calm', pose: k.t > k.cue('order') ? 'point' : 'stand', p: k.at('y', 0.5) });
        k.char(600, 760, 360, { ...QUAN, face: k.t > k.cue('gone') ? 'smug' : 'calm', pose: k.t > k.cue('throw') ? 'present' : 'hold', p: k.at('order', 0.5) });
        k.text('Nguyễn Thuyên', 600, 330, { size: 46, font: 'title', fx: 'fade', p: k.at('order', 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.prop('scroll', k.lerp(660, 1360, thr), k.lerp(560, 760, thr) - Math.sin(thr * Math.PI) * 250, 120, { p: k.at('write', 0.4), rotate: thr * 6 });
        k.text('bài văn hay nhất…', 1300, 300, { size: 60, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('best', 0.5), outline: '#fffaf0', outlineWidth: 10 });
        k.text('người đọc: cá sấu', 1300, 400, { size: 60, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('reader', 0.5), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: 'Câu chuyện chưa hết. {han}Vua thấy việc này giống chuyện Hàn Dũ, một văn hào đời Đường bên Trung Hoa, cũng từng làm văn đuổi cá sấu. {name}Thế là vua ban cho Nguyễn Thuyên đổi sang họ Hàn: {hanthuyen}Hàn Thuyên. {nom}Ông còn giỏi làm thơ phú bằng chữ Nôm, {first}và Toàn thư ghi: thơ phú nước ta dùng nhiều tiếng Nôm, bắt đầu từ đó. {wow}Một con cá sấu lạc đường, {page}mà lại dính vào một trang lịch sử văn học Việt.',
      sfx: [['pop', 'han'], ['ding', 'name', 0.4], ['tada', 'hanthuyen', 0.5], ['sparkle', 'nom', 0.4], ['pop', 'first'], ['boing', 'wow', 0.5]],
      draw(k) {
        k.backdrop('dawn', { ground: G });
        k.char(360, G, 400, { ...QUAN, face: k.t > k.cue('hanthuyen') ? 'laugh' : 'smug', pose: k.t > k.cue('hanthuyen') ? 'cheer' : 'present', p: k.at(0, 0.5) });
        k.text('Nguyễn Thuyên', 1100, 230, { size: 80, font: 'title', p: k.at('name', 0.4), fx: 'fade', outline: '#fffaf0', outlineWidth: 12 });
        k.line(860, 230, 1340, 230, { p: k.at(k.cue('name', 0.8), 0.4), width: 8, stroke: '#c0392b', seed: 120 });
        k.text('HÀN THUYÊN', 1100, 380, { size: 110, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('hanthuyen', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.text('(như Hàn Dũ đời Đường)', 1100, 480, { size: 44, color: '#6b5f55', fx: 'fade', p: k.at('han', 0.5), weight: 600 });
        doc(k, 1100, 720, 640, 280, 'Thơ phú chữ Nôm', [['"bắt đầu từ đó" — Toàn thư', k.at('first', 1)]], k.at('nom', 0.6), { seed: 121, size: 40 });
        k.prop('crocodile', 1650, 960, 240, { p: k.at('wow', 0.5), flip: true, open: 0.4 });
      },
    },
    {
      say: 'Nghi phạm số hai: {py}trăn. {big}Trăn gấm, loài rắn dài nhất thế giới, có con dài hơn sáu mét, {swim}và bơi cực giỏi. {wrap}Trăn không cần nọc độc. Nó quấn chặt, rồi siết dần. {fit}"Quấn chân, kéo xuống", nghe quen không? {track}Một con trăn lớn trườn qua bãi sông, để lại vệt dài như rồng đi, {rumor}thế là cả làng có chuyện để kể… vài chục năm.',
      sfx: [['pop', 'py'], ['slideUp', 'big', 0.5], ['whoosh', 'swim', 0.4], ['scratch', 'wrap', 0.4], ['ding', 'fit', 0.4], ['pop', 'track'], ['boing', ['rumor', 1.2], 0.5]],
      draw(k) {
        k.backdrop('day', { ground: G });
        // thước so chiều dài
        const len = k.at('big', 1.4, 'out');
        k.line(200, 400, 200 + 1300 * len, 400, { width: 6, stroke: '#b5482c', seed: 130 });
        k.text('> 6 mét', 200 + 1300 * len + 140, 400, { size: 64, font: 'title', color: '#b5482c', p: k.at(k.cue('big', 1.2), 0.4), fx: 'pop', outline: '#fffaf0', outlineWidth: 10 });
        for (let i = 0; i < 4; i++) k.char(300 + i * 320, G, 300, { ...DAN(KC[i], { outfit: 'tunic', hat: undefined }), face: 'shock', pose: 'stand', p: k.at(k.cue('big', 0.3 + i * 0.2), 0.4) });
        k.text('= 4 người nằm nối nhau', 960, 500, { size: 50, font: 'title', p: k.at(k.cue('big', 1.6), 1, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        k.prop('python', 1600, 760, 380, { p: k.at('py', 0.5) });
        k.text('quấn chặt · siết dần', 1600, 980, { size: 48, font: 'title', p: k.at('wrap', 1.2, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
        k.curve([[200, 1050], [500, 1020], [800, 1060], [1100, 1025], [1400, 1055]], { width: 14, stroke: '#a88c5e', p: k.at('track', 1.5), seed: 131 });
        k.text('dân làng: "Rồng đi qua đấy!"', 760, 975, { size: 48, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('rumor', 0.5), outline: '#fffaf0', outlineWidth: 10 });
      },
    },
    {
      say: 'Còn nghi phạm số ba, {who}kẻ nguy hiểm nhất, {none}lại không có hình dạng. {bend}Ở những khúc sông uốn cong, dòng nước khoét đáy thành vực sâu, {swirl}tạo ra xoáy nước. {down}Người bơi qua bị dòng nước cuốn xuống, {feel}cảm giác y như có gì đó… kéo chân. {cramp}Thêm nước lạnh làm chuột rút, {gone}là đủ để cả người bơi giỏi cũng chìm. {same}Vâng, đây cũng chính là thủ phạm của ma da, trong tập Halloween.',
      sfx: [['boom', 'none', 0.4], ['pop', 'bend'], ['whoosh', 'swirl', 0.5], ['slideDown', 'down', 0.5], ['scratch', 'cramp', 0.4], ['ding', 'same', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: 2000 });
        k.water(380, { color: RIVER, alpha: 0.95 });
        // đáy sông + vực
        const deep = k.at('bend', 1.2, 'inOut');
        k.poly([[-40, 840], [600, 860], [760, 860 + 160 * deep], [1100, 880 + 180 * deep], [1260, 860], [1960, 840], [1960, 1120], [-40, 1120]], { fill: '#8a6a45', fillStyle: 'solid', width: 4, seed: 140 });
        k.text('VỰC SÂU', 930, 1000, { size: 56, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at(k.cue('bend', 0.8), 0.4), outline: '#3b2f2a', outlineWidth: 10 });
        k.prop('whirlpool', 930, 420, 500, { p: k.at('swirl', 0.5), speed: 1.5 });
        const sink = k.at('down', 2.5, 'inOut');
        k.char(930, 520 + sink * 220, 260, { ...DAN('#e4572e'), face: k.t > k.cue('cramp') ? 'sad' : 'shock', pose: 'shout', shadow: false, p: k.at('down', 0.4), bob: 5 });
        for (let i = 0; i < 3; i++) k.arrow(700 + i * 230, 470, 820 + i * 110, 740, { p: k.at(k.cue('down', i * 0.2), 0.5), width: 6, stroke: '#1d4f8a', bend: 0.3, seed: 141 + i });
        k.text('như bị… kéo chân', 1450, 560, { size: 58, font: 'title', color: '#fffaf0', p: k.at('feel', 1, 'linear'), outline: '#1b1b24', outlineWidth: 10 });
        k.prop('thermo', 1450, 720, 160, { level: 0.15, fill: '#2e86de', p: k.at('cramp', 0.4) });
        k.text('nước lạnh → chuột rút', 1450, 840, { size: 46, font: 'title', color: '#fffaf0', p: k.at('cramp', 1.2, 'linear'), outline: '#1b1b24', outlineWidth: 10 });
        k.char(330, 760, 300, { ...MADA, p: k.at('same', 0.5), bob: 6, face: 'smug' });
        k.text('ma da cũng là nó!', 330, 260, { size: 50, font: 'title', color: '#fff3c4', fx: 'pop', p: k.at('same', 0.5), outline: '#1b1b24', outlineWidth: 10 });
      },
    },
    {
      say: 'Vậy phán quyết của phiên toà: {all}thuồng luồng không phải một con vật. {mix}Mà là cả ba nghi phạm gộp lại: {c1}cái hàm của cá sấu, {c2}cái thân của trăn, {c3}và sức kéo của dòng nước xoáy. {word}Người xưa không có từ "dòng chảy ngầm", {so}nên họ đặt cho nỗi sợ ấy một cái tên: {tl}thuồng luồng.',
      sfx: [['bonk', 'all', 0.6], ['pop', 'c1'], ['pop', 'c2'], ['pop', 'c3'], ['drumroll', 'so', 0.3], ['tada', 'tl', 0.6]],
      draw(k) {
        k.text('PHÁN QUYẾT', 960, 110, { size: 90, font: 'title', color: '#b5482c', fx: 'pop', p: k.at(0, 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.prop('crocodile', 260, 430, 340, { p: k.at('c1', 0.5), open: 0.6 });
        k.text('hàm', 260, 580, { size: 52, font: 'title', p: k.at('c1', 0.5), fx: 'fade' });
        k.text('+', 500, 430, { size: 100, font: 'title', p: k.at('c2', 0.4), fx: 'pop' });
        k.prop('python', 720, 430, 300, { p: k.at('c2', 0.5) });
        k.text('thân', 720, 580, { size: 52, font: 'title', p: k.at('c2', 0.5), fx: 'fade' });
        k.text('+', 940, 430, { size: 100, font: 'title', p: k.at('c3', 0.4), fx: 'pop' });
        k.prop('whirlpool', 1170, 450, 320, { p: k.at('c3', 0.5) });
        k.text('sức kéo', 1170, 580, { size: 52, font: 'title', p: k.at('c3', 0.5), fx: 'fade' });
        k.text('=', 1400, 430, { size: 120, font: 'title', color: '#3f6f2a', p: k.at('tl', 0.4), fx: 'pop' });
        k.prop('thuongluong', 1660, 430, 300, { glow: true, open: 0.6, p: k.at('tl', 0.6) });
        cap(k, 'không có từ "dòng chảy ngầm" → đặt tên cho nỗi sợ', 'word', { y: 790, size: 50 });
        k.text('THUỒNG LUỒNG', 960, 940, { size: 110, font: 'title', color: '#e4572e', fx: 'pop', p: k.at('tl', 0.5), outline: '#fffaf0', outlineWidth: 14 });
      },
    },

    // ---------------- Chương 5: Vì sao ông bà cần thuồng luồng? ----------------
    {
      chapter: 'Vì sao ông bà cần thuồng luồng?',
      say: 'Nhưng đừng vội cười người xưa. {smart}Chuyện thuồng luồng thật ra là một tấm biển cảnh báo rất thông minh. {where}Thuồng luồng sống ở đâu? {deep}Ở vực sâu, khúc quanh, chỗ nước xoáy. {exact}Đó chính xác là những chỗ dễ chết đuối nhất. {sign}Không có biển báo, không có chòi cứu hộ, {story}người xưa dùng một câu chuyện đáng sợ, để trẻ con nhớ cả đời.',
      sfx: [['ding', 'smart', 0.5], ['pop', 'where'], ['pop', 'deep'], ['tada', 'exact', 0.4], ['pop', 'sign'], ['sparkle', 'story', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.prop('whirlpool', 1350, 820, 420, { p: k.at('deep', 0.5) });
        k.water(760, { color: RIVER, alpha: 0.8 });
        k.prop('whirlpool', 1350, 830, 420, { p: k.at('deep', 0.5), alpha: 0.9 });
        bank(k, 820, 720);
        // biển cảnh báo
        const p = k.at('smart', 0.6, 'back');
        k.group({ x: 700, y: 420, s: Math.max(0.01, p), r: -0.04 }, () => {
          k.rect(-12, 0, 24, 300, { fill: '#8a5a35', fillStyle: 'solid', width: 4, seed: 150 });
          k.rect(-300, -230, 600, 260, { fill: '#f6c344', fillStyle: 'solid', width: 6, seed: 151 });
          k.text('⚠ NGUY HIỂM', 0, -170, { size: 60, font: 'title', color: '#c0392b' });
          k.text('CÓ THUỒNG LUỒNG', 0, -90, { size: 54, font: 'title', color: '#3b2f2a' });
          k.text('(= nước sâu, nước xoáy)', 0, -30, { size: 36, color: '#3b2f2a', weight: 700, fx: 'fade', p: k.at('exact', 0.6) });
        });
        k.icon('check', 1350, 560, 180, { p: k.at('exact', 0.5) });
        for (let i = 0; i < 3; i++) k.char(110 + i * 110, 720, 180, { ...KID(i + 3), face: k.t > k.cue('story') ? 'shock' : 'calm', pose: k.t > k.cue('story') ? 'shout' : 'stand', p: k.at('sign', 0.4), shadow: false });
        k.char(450, 720, 260, { ...BA, face: 'smug', pose: 'point', p: k.at('story', 0.5) });
      },
    },
    {
      say: 'Và lời cảnh báo ấy, đến nay vẫn đúng. {stat}Mỗi năm, Việt Nam có khoảng hai nghìn trẻ em tử vong vì đuối nước. {where}Rất nhiều vụ xảy ra ở ngay ao, hồ, sông, suối gần nhà. {tips}Nên nếu bạn có em nhỏ, hãy nhắc: {t1}đừng tắm sông một mình, {t2}tránh chỗ nước sâu, nước xoáy, {t3}và học bơi. {serious}Thuồng luồng có thể không có thật, {real}nhưng khúc sông nguy hiểm thì có thật.',
      sfx: [['pop', 't1'], ['pop', 't2'], ['pop', 't3'], ['ding', 'real', 0.4]],
      draw(k) {
        k.text('≈ 2.000', 480, 300, { size: 170, font: 'title', color: '#c0392b', fx: 'pop', p: k.at('stat', 0.6), outline: '#fffaf0', outlineWidth: 16 });
        k.text('trẻ em đuối nước mỗi năm', 480, 440, { size: 50, font: 'title', p: k.at('stat', 1.4, 'linear'), maxWidth: 820 });
        k.text('(Việt Nam)', 480, 510, { size: 40, color: '#6b5f55', fx: 'fade', p: k.at(k.cue('stat', 1), 0.5), weight: 600 });
        for (let i = 0; i < 3; i++) k.char(300 + i * 180, 920, 220, { ...KID(i), face: 'happy', pose: 'stand', p: k.at('where', 0.5), shadow: false });
        [['t1', 'Không tắm sông một mình'], ['t2', 'Tránh nước sâu, nước xoáy'], ['t3', 'Học bơi']].forEach(([c, t], i) => {
          const y = 280 + i * 170;
          k.icon('check', 1060, y, 110, { p: k.at(c, 0.5) });
          k.text(t, 1140, y, { size: 56, font: 'title', align: 'left', p: k.at(c, 1.1, 'linear'), maxWidth: 740 });
        });
        cap(k, 'khúc sông nguy hiểm thì có thật', 'real', { y: 900, x: 1400, hl: '#ffe08a', size: 50 });
      },
    },
    {
      say: 'Còn tục xăm mình? {more}Nó nói nhiều hơn chuyện đuổi thủy quái. {draw}Vẽ hình thủy quái lên người, {say}tức là nói: ta cũng là con của nước. {dragon}Nhớ tập trước không? {llq}Lạc Long Quân là giống rồng, sống dưới nước. {kids}Con cháu vẽ hình thủy quái lên mình, {root}cũng là một cách nhắc nhau nhớ cái gốc ấy. {tran}Đúng như gia pháp nhà Trần: không quên gốc.',
      sfx: [['pop', 'more'], ['scratch', 'draw', 0.4], ['ding', 'say', 0.4], ['pop', 'dragon'], ['sparkle', 'llq', 0.5], ['tada', 'root', 0.4]],
      draw(k) {
        k.backdrop('dawn', { ground: G });
        k.water(820, { color: RIVER, alpha: 0.85 });
        k.prop('dragon', 1450, 360, 560, { p: k.at('llq', 0.6), bob: 8 });
        k.char(1450, 820, 380, { ...LLQ, face: 'happy', pose: 'present', p: k.at('llq', 0.6), shadow: false });
        for (let i = 0; i < 4; i++) k.char(240 + i * 190, 820, 260, { ...DAN(KC[i]), tattoo: true, face: 'happy', pose: k.t > k.cue('root') ? 'cheer' : 'stand', p: k.at(k.cue('kids', i * 0.12), 0.4), shadow: false, bob: 3 });
        k.text('TA LÀ CON CỦA NƯỚC', 620, 200, { size: 76, font: 'title', color: '#1f7a8c', fx: 'pop', p: k.at('say', 0.5), outline: '#fffaf0', outlineWidth: 12 });
        stamp(k, 620, 380, 'KHÔNG QUÊN GỐC', k.at('tran', 0.5), { w: 560, size: 56 });
      },
    },

    // ---------------- Kết luận ----------------
    {
      chapter: 'Vậy thuồng luồng có thật không?',
      say: 'Vậy, {q}thuồng luồng có thật không? {no}Một con rắn khổng lồ có sừng, sống dưới vực, {nobone}thì đến nay chưa ai tìm thấy, chưa có bộ xương nào. {yes}Nhưng cá sấu có thật. Trăn có thật. Xoáy nước có thật. {tat}Và những người Việt cổ xăm mình xuống sông kiếm ăn, cũng có thật. {legend}Truyền thuyết thuồng luồng là ký ức của một dân tộc sống chung với sông nước, {respect}và học cách sống sót cùng nó.',
      sfx: [['drumroll', 'q', 0.3], ['bonk', 'nobone', 0.4], ['pop', 'yes'], ['pop', 'tat'], ['sparkle', 'legend', 0.5]],
      draw(k) {
        k.text('Thuồng luồng có thật không?', 960, 110, { size: 80, font: 'title', p: k.at('q', 1, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
        k.rect(120, 200, 760, 640, { fill: '#f3e3e0', width: 5, seed: 160, p: k.at('no', 0.5) });
        k.text('CHƯA TÌM THẤY', 500, 260, { size: 58, font: 'title', color: '#c0392b', fx: 'pop', p: k.at('no', 0.4) });
        k.prop('thuongluong', 500, 520, 420, { p: k.at('no', 0.5), alpha: 0.75 });
        k.icon('question', 500, 740, 120, { p: k.at('nobone', 0.4) });
        k.rect(1040, 200, 760, 640, { fill: '#e3f0dc', width: 5, seed: 161, p: k.at('yes', 0.5) });
        k.text('CÓ THẬT', 1420, 260, { size: 58, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('yes', 0.4) });
        k.prop('crocodile', 1190, 420, 200, { p: k.at('yes', 0.4) });
        k.prop('python', 1430, 410, 170, { p: k.at(k.cue('yes', 0.6), 0.4) });
        k.prop('whirlpool', 1660, 440, 190, { p: k.at(k.cue('yes', 1.2), 0.4) });
        k.char(1420, 790, 260, { ...DAN('#b5482c'), tattoo: true, face: 'smug', pose: 'hips', p: k.at('tat', 0.5), shadow: false });
        cap(k, 'ký ức của một dân tộc sống chung với sông nước', 'legend', { y: 960, hl: '#ffe08a', size: 52 });
      },
    },
    {
      chapter: 'Tóm tắt',
      say: '{remind}Trước khi tóm tắt: nhớ con số hai nghìn sáu trăm hai mươi hai năm nhé, tập sau cần đấy. {t}Tóm lại: {a}thuồng luồng là thủy quái truyền thuyết, sống ở vực sâu, nước xoáy. {b}Người Việt cổ vẽ hình thủy quái lên mình để xuống sông, sử Việt lẫn sử Trung Hoa đều chép. {c}Nhà Trần vẫn giữ tục xăm rồng, để không quên gốc. {d}Và thuồng luồng thật ra là cá sấu, trăn, và dòng nước xoáy, gộp thành một nỗi sợ.',
      sfx: [['ding', 'remind', 0.4], ['pop', 'a'], ['pop', 'b'], ['pop', 'c'], ['pop', 'd']],
      draw(k) {
        k.group({ a: 1 - k.at('t', 0.4) }, () => {
          k.text('2.622 năm', 960, 420, { size: 150, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('remind', 0.5), outline: '#fffaf0', outlineWidth: 16 });
          k.text('nhớ con số này!', 960, 600, { size: 64, font: 'title', color: '#e4572e', fx: 'pop', p: k.at(k.cue('remind', 0.6), 0.5) });
        });
        k.text('Tóm tắt', 960, 120, { size: 84, font: 'title', p: k.at('t', 0.8, 'linear') });
        const rows = [['a', 'Thuồng luồng: thủy quái ở vực sâu, nước xoáy', '#1f7a8c', () => k.prop('thuongluong', 250, 280, 220, { p: k.at('a', 0.5) })],
          ['b', 'Người Việt cổ vẽ mình xuống sông (2 bộ sử chép)', '#b5482c', () => k.char(250, 560, 190, { ...DAN('#b5482c'), tattoo: true, face: 'smug', pose: 'hips', p: k.at('b', 0.5), shadow: false })],
          ['c', 'Nhà Trần xăm rồng: không quên gốc', '#8e5bd3', () => k.prop('dragon', 250, 690, 190, { p: k.at('c', 0.5) })],
          ['d', 'Thật ra: cá sấu + trăn + nước xoáy', '#3f6f2a', () => k.prop('crocodile', 250, 900, 200, { p: k.at('d', 0.5) })]];
        rows.forEach(([c, t, col, art], i) => {
          art();
          k.text(t, 420, 280 + i * 205, { size: 52, font: 'title', align: 'left', color: col, p: k.at(c, 1.4, 'linear'), maxWidth: 1420 });
        });
      },
    },
    nextEpisodeScene({
      say: '{next}Tập sau: mười tám đời vua Hùng, mà kéo dài hai nghìn sáu trăm hai mươi hai năm? {why}Mỗi vua trị vì gần một trăm rưỡi năm: là thật, hay là sử chép nhầm? {more}Và người Văn Lang thật sự sống ra sao, khảo cổ sẽ trả lời. Hẹn bạn ở tập sau.',
      title: '18 đời vua Hùng sống 2.622 năm?',
      hook: 'Mỗi vua trị vì gần 146 năm — thật hay nhầm?',
      when: 'Tập 5 · series Truyền thuyết Hùng Vương',
      art: (k) => {
        k.text('2.622', -240, -20, { size: 150, font: 'title', color: '#f6c344', outline: '#1b1b24', outlineWidth: 12 });
        k.text('÷ 18 = ?', -240, 110, { size: 80, font: 'title', color: '#fffaf0', outline: '#1b1b24', outlineWidth: 10 });
        k.char(320, 210, 320, { ...KING, beard: 'long', beardColor: '#ffffff', face: 'shock', pose: 'shrug', shadow: false });
      },
      sfx: [['boing', 'why', 0.4]],
    }),
    subscribeScene({
      say: 'Còn bạn, {q}quê bạn có khúc sông nào bị đồn là có thuồng luồng không? Theo bạn, đó thật ra là gì? Kể cho mình nghe dưới phần bình luận nhé. {sub}Và bấm đăng ký, bật chuông, để không lỡ tập sau về mười tám đời vua Hùng!',
      question: 'Quê bạn có khúc sông nào đồn có thuồng luồng?',
      channel: 'Vẽ Là Hiểu',
      tail: 1.5,
    }),
  ],

  thumbnail: thumbs.a,
};
