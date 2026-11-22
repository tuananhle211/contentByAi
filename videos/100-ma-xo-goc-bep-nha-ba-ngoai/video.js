// Nhân Gian Chưa Kể — tập 1: Ma Xó | Góc Bếp Nhà Bà Ngoại 12 Năm Không Ai Được Quét. Kịch bản duyệt: kich-ban.md.
// Tín ngưỡng: ma xó = vong người chết oan, chết đột ngột hoặc không được thờ cúng đầy đủ, trú ở góc khuất trong nhà
// (Tiền Phong, "Rợn người nghi lễ nuôi ma xó"). Không kể "nuôi ma xó cầu lợi", không tả nghi lễ (phim Ma Xó 06/2026 bị nhắc nhở).
// Truyện hư cấu; tên người, tên làng hư cấu. Không bao giờ vẽ "con ma": chỉ xó tối, bát cơm, đốm mắt rất mờ.
import * as thumbs from '/videos/100-ma-xo-goc-bep-nha-ba-ngoai/thumbs.js';
import {
  G, PAPER, AMBER, COLD, BA, MINH, MINH_LON, ME, ME_GIA, BA_DO, TUN,
  shade, cold, dust, tag, quote, chapter, rules, bowl, jar, oil, urn, anklet, broom,
  kitchen, KITCHEN, house, HOUSE, lychee, well, room, ROOM, bamboo, busRoad, pond, study, hospital, nextScene, subScene,
} from '/channel/nhan-gian.js';

const FIRE = KITCHEN.fire, XO = KITCHEN.xo;
const ember = { x: 520, y: 840, r: 280, flicker: 1, warm: 0.5 };
const xoLight = (r = 230) => ({ x: 1560, y: 830, r });
const door = { x: -60, y: 600, r: 900 }; // ánh sáng ban ngày từ cửa bếp
const moon = { x: 1620, y: 170, r: 1100 };

// Phóng to quanh (cx, cy) hệ số s (toạ độ trong fn vẫn là toạ độ gốc).
const zoom = (k, cx, cy, s, fn) => k.group({ x: cx, y: cy, s }, () => k.group({ x: -cx, y: -cy }, fn));
// Nhân vật nằm (đầu bên trái): chân tại (x, y).
const lie = (k, x, y, h, o) => k.group({ x, y, r: -Math.PI / 2 }, () => k.char(0, 0, h, o));
// Bọc tã trẻ sơ sinh.
function baby(k, x, y, s = 1, o = {}) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#efe8da'; ctx.strokeStyle = '#211a15'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.ellipse(0, 0, 46, 26, -0.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = o.pale ? '#d9cfc4' : '#e8bf9a'; ctx.beginPath(); ctx.arc(-30, -8, 15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.restore();
}
// Ô ký ức nhỏ: vẽ fn (toạ độ khung 1920×1080) thu nhỏ vào ô (x, y, w=480, h=270).
function memo(k, x, y, p, fn) {
  if (p <= 0) return;
  const { ctx } = k, w = 480, h = 270;
  ctx.save(); ctx.globalAlpha = p; ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  k.group({ x, y, s: w / 1920 }, fn);
  ctx.restore();
  ctx.save(); ctx.globalAlpha = p; ctx.strokeStyle = 'rgba(239,228,204,0.7)'; ctx.lineWidth = 3; ctx.strokeRect(x, y, w, h); ctx.restore();
}
// Gầm đen + nền tối toàn khung.
const black = (k) => { k.ctx.fillStyle = '#07080c'; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); };
// Nón lá rơi.
function nonFall(k, x, y, p) {
  const { ctx } = k, yy = y + 260 * Math.min(1, p), r = p * 1.4;
  ctx.save(); ctx.translate(x, yy); ctx.rotate(r);
  ctx.fillStyle = '#d8c48f'; ctx.strokeStyle = '#211a15'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(0, -46); ctx.lineTo(70, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}
// Mảnh tã gấp / mở.
function cloth(k, x, y, s, open) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#e6dcc6'; ctx.strokeStyle = '#211a15'; ctx.lineWidth = 3;
  const w = 120 + 160 * open, h = 90 + 110 * open;
  ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(80,60,40,0.35)'; ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(w / 2, 0); ctx.moveTo(0, -h / 2); ctx.lineTo(0, h / 2); ctx.stroke();
  ctx.restore();
}
// Cái gàu múc nước đổ + vũng nước.
function bucket(k, x, y) {
  const { ctx } = k;
  ctx.fillStyle = 'rgba(160,190,220,0.35)'; ctx.beginPath(); ctx.ellipse(x + 60, y + 20, 200, 30, 0, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.translate(x, y); ctx.rotate(1.3);
  ctx.fillStyle = '#6a5a4a'; ctx.strokeStyle = '#211a15'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-30, -30); ctx.lineTo(30, -30); ctx.lineTo(22, 30); ctx.lineTo(-22, 30); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}
// Cảnh bếp ban đêm, nhìn gần cái xó (dùng nhiều lần).
function xoNight(k, s, o = {}) {
  zoom(k, 1500, 760, s, () => {
    kitchen(k, { fire: o.fire ?? 0, bowl: o.bowl ?? true, ash: o.ash ?? 1, brick: o.brick, urn: o.urn });
    if (o.kid) k.char(o.kidX ?? 1180, G, 330, { ...MINH, face: o.face ?? 'calm', pose: 'stand', flip: true, ...o.kid });
    if (o.eyes) k.glowEyes(1580, 760, 0.32, '#ffe9a8', { p: o.eyes });
    shade(k, o.dark ?? 0.86, [ember, xoLight(o.xr ?? 200), ...(o.lights ?? [])]);
  });
}
// Đèn pin hàng xóm.
const torch = (x, y) => ({ x, y, r: 260 });

const OLDMAN = { body: 'man', outfit: 'tunic', plain: true, color: '#4a4a3a', hair: 'bald', beard: 'long', beardColor: '#cfcac0', skin: '#cfa27a', blush: false, shadow: false };
const NEIGH = { body: 'man', outfit: 'tunic', plain: true, color: '#3a4a3a', hair: 'short', blush: false, shadow: false };

export default {
  meta: {
    title: 'Ma Xó | Góc Bếp Nhà Bà Ngoại 12 Năm Không Ai Được Quét',
    description: `Ở nhà bà ngoại tôi, có một góc bếp mười hai năm không ai được quét. Bữa nào bà cũng xới một bát cơm con, đặt đôi đũa ngắn vào đó, và khẽ gọi một cái tên không ai trong nhà mang.
Mùa hè năm 1995, tôi mười hai tuổi. Giọng nói trong xó bếp biết tên tôi. Và dưới một viên gạch lỏng, có một chiếc vòng bạc khắc đúng ngày sinh của tôi.

Truyện ma xó kể bằng hoạt hình: một góc bếp, một bát cơm con, ba điều cấm của bà ngoại, và một bí mật bà giữ suốt mười hai năm.`,
    footer: `📖 Truyện hư cấu dựa trên tín ngưỡng dân gian về ma xó: các cụ quan niệm đó là vong người chết oan, chết đột ngột hoặc không được thờ cúng đầy đủ, trú ở những góc khuất trong nhà. Tên người, tên làng và tình tiết đều hư cấu.
🕯️ Nhân Gian Chưa Kể: những chuyện người xưa truyền tai nhau, mà chưa ai giải thích được. Đăng ký để nghe truyện tiếp theo.`,
    links: [['🔔 Đăng ký', 'https://www.youtube.com/@nhangianchuake?sub_confirmation=1']],
    tags: ['ma xó', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'hoạt hình kinh dị', 'truyện ma làng quê', 'kiêng kỵ dân gian', 'chuyện tâm linh có thật', 'truyện kinh dị', 'nhân gian chưa kể'],
    hashtags: ['truyenma', 'maxo', 'tamlinh'],
    gpu: true, // vẽ canvas bằng GPU (Metal) cho nhanh — người dùng yêu cầu 14/11
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 0.9,
    lead: 0.5, tail: 1.0, pause: 0.4,
    transition: 'fade', sfxTransitions: false, camera: 0.03, scribble: false,
    sfxVolume: 0.5,
    paper: '#07080c', privacy: 'private',
  },
  thumbnail: thumbs.c,

  scenes: [
    // ===== MỞ ĐẦU =====
    {
      chapter: 'Mở đầu',
      say: '{a}Ở nhà bà ngoại tôi, có một góc bếp không ai được quét. {b}Nó nằm sau chum nước, sát chân vách đất. Bụi và tro ở đó dày đến mức đặt ngón tay vào là lún xuống một đốt. {c}Mười hai năm không ai động đến một hạt. Đúng bằng tuổi tôi năm ấy. {d}Mùa hè năm tôi mười hai tuổi, tôi đã quét nó. {e}Và đêm ấy, lần đầu tiên, cái giọng trong xó bếp gọi tôi là anh.',
      sfx: [['wind', 0, 0.35], ['drip', 'b', 0.35], ['creak', 'd', 0.4], ['heartbeat', 'e', 0.5]],
      draw(k) {
        const s = 1 + 0.9 * k.at('b', 6, 'inOut');
        zoom(k, 1540, 820, s, () => {
          kitchen(k, { fire: 0.25 });
          if (k.t > k.cue('d')) { k.ctx.save(); k.ctx.globalAlpha = 0.6 * k.at('d', 1); broom(k, 1700, 520, 0.9, 0.5); k.ctx.restore(); }
          k.glowEyes(1590, 770, 0.3, '#ffe9a8', { p: 0.6 * k.at('e', 1.2) });
          shade(k, 0.84, [ember, xoLight(220)]);
        });
        quote(k, 'MƯỜI HAI NĂM KHÔNG AI QUÉT', 'c', { size: 44, color: AMBER, until: 'd' });
      },
    },
    {
      say: '{a}Người làng gọi thứ sống trong góc bếp ấy là ma xó. {b}Bà ngoại tôi thì không bao giờ gọi như thế. {c}Bữa nào bà cũng xới một bát cơm con, đặt vào đó, và khẽ gọi một cái tên. {d}Phải đến cuối mùa hè ấy, tôi mới biết đó là tên của ai.',
      sfx: [['gong', 'a', 0.3], ['click', 'c', 0.3]],
      draw(k) {
        const put = k.at('c', 1.5, 'inOut');
        kitchen(k, { fire: 0.9, bowl: put > 0.9 });
        k.char(k.lerp(900, 1420, put), G, 470, { ...BA, face: 'calm', pose: 'hold', walk: put > 0 && put < 1, talk: k.t > k.cue('c', 1.6) && k.t < k.cue('d') ? 0.3 : 0 });
        if (put < 0.9 && k.t > k.cue('b')) bowl(k, k.lerp(900, 1420, put) + 10, G - 230, 0.6);
        shade(k, 0.6, [FIRE, xoLight(240)]);
        k.text('MA XÓ', k.W / 2, 230, { size: 140, font: 'title', color: AMBER, fx: 'fade', p: k.at('a', 1) * (k.t < k.cue('b', 1) ? 1 : Math.max(0, 1 - (k.t - k.cue('b', 1)))), outline: '#000', outlineWidth: 10 });
      },
    },
    {
      say: '{a}Đây là Nhân Gian Chưa Kể. Ở đây, tôi kể những chuyện người xưa truyền tai nhau, mà chưa ai giải thích được. {b}Nếu bạn muốn nghe tiếp, hãy bấm đăng ký. {c}Còn bây giờ, xin bạn tắt bớt đèn.',
      sfx: [['click', 'c', 0.5]],
      draw(k) {
        black(k);
        oil(k, 960, 820, 1.6);
        const off = k.at('c', 1.2);
        shade(k, 0.75 + 0.2 * off, [{ x: 960, y: 650, r: 700 - 300 * off, flicker: 1, warm: 1 }]);
        k.text('NHÂN GIAN CHƯA KỂ', k.W / 2, 230, { size: 92, font: 'title', color: PAPER, fx: 'fade', p: k.at('a', 1) });
        k.text('Ma Xó · Góc Bếp Nhà Bà Ngoại', k.W / 2, 330, { size: 46, color: AMBER, fx: 'fade', p: k.at('a', 1.5) });
        quote(k, '🔔 Đăng ký để nghe tiếp', 'b', { size: 38, until: 'c', y: 990 });
      },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Nhà bà ngoại',
      say: '{a}Năm ấy là năm chín mươi lăm. Hè nào bố mẹ tôi cũng gửi tôi về nhà bà ngoại ở xóm Bãi, một xóm nhỏ nằm giữa hai quả đồi chè, đi xe khách mất nửa ngày. {b}Thật ra không phải bố mẹ muốn gửi. Là bà đòi. {c}Cứ đầu tháng Năm, bà lại nhờ người viết thư lên thành phố, thư nào cũng chỉ một câu: {d}Cho cái Minh về với bà. {e}Mẹ tôi bảo bà già rồi, thương cháu. Tôi thì chỉ nghĩ về quê là được trèo cây.',
      sfx: [['whoosh', 'c', 0.3]],
      draw(k) {
        busRoad(k, k.lerp(300, 1500, k.t / k.d), { kid: true });
        const letter = k.t > k.cue('c') && k.t < k.cue('e');
        if (letter) {
          const p = k.at('c', 0.6);
          k.ctx.save(); k.ctx.globalAlpha = 0.6 * p; k.ctx.fillStyle = '#000'; k.ctx.fillRect(0, 0, k.W, k.H); k.ctx.restore();
          rules(k, 960, 520, [['Cho cái Minh về với bà.', 'd']], { cue: 'c', w: 1000 });
        }
        k.vignette(0.4);
        tag(k, 'HÈ 1995 · XÓM BÃI', 'a');
        chapter(k, 1, 'Nhà bà ngoại');
      },
    },
    {
      say: '{a}Nhà bà là ba gian nhà gỗ mái rạ, có cái sân gạch, cái giếng đá ong, {b}và một cây vải già sau nhà, cành vươn qua cả mái bếp. {c}Ông ngoại mất từ trước khi tôi sinh ra. Bà sống một mình, nuôi mấy con gà và một khoảnh chè. {d}Bà ít nói. Nhưng lúc nấu cơm, bà hay hát. Lúc nào cũng chỉ một bài: {e}Bống bống bang bang, lên ăn cơm vàng cơm bạc nhà ta.',
      draw(k) {
        if (k.t < k.cue('d')) {
          house(k, { time: 'day' });
          k.char(1120, 900, 380, { ...BA, face: 'calm', pose: k.t > k.cue('c') ? 'wave' : 'stand' });
          k.char(k.lerp(-100, 900, k.at('a', 4, 'out')), 900, 280, { ...MINH, face: 'happy', walk: k.t < k.cue('a', 4) });
          k.vignette(0.35);
          return;
        }
        kitchen(k, { fire: 1 });
        k.char(760, G, 470, { ...BA, face: 'calm', pose: 'hold', talk: k.t > k.cue('e') ? 0.25 : 0 });
        k.ctx.save(); k.ctx.globalAlpha = 0.5; k.steam(520, 680, 1); k.ctx.restore();
        shade(k, 0.5, [FIRE, xoLight()]);
        quote(k, '♪ Bống bống bang bang, lên ăn cơm vàng…', 'e', { color: AMBER });
      },
    },
    {
      say: '{a}Bếp nhà bà là gian bếp rạ tách riêng, có cái chum nước to bằng cả người tôi. {b}Sau chum nước là cái xó tối, nơi ánh lửa không bao giờ chạm tới. {c}Bữa nào cũng vậy. Trước khi cả nhà ngồi ăn, bà xới một bát cơm con, gắp lên vài miếng thức ăn, {d}đặt kèm một đôi đũa ngắn chỉ bằng nửa đôi đũa thường, {e}rồi đẩy vào cái xó ấy.',
      sfx: [['click', 'd', 0.3]],
      draw(k) {
        const s = k.t > k.cue('b') && k.t < k.cue('c') ? 1 + 0.4 * k.at('b', 3, 'inOut') : 1;
        zoom(k, 1500, 760, s, () => {
          kitchen(k, { fire: 0.9, bowl: k.t > k.cue('e', 0.8) });
          k.char(1000, G, 330, { ...MINH, face: 'calm', look: 0.6, alpha: k.t < k.cue('c') ? 1 : 0 });
          if (k.t > k.cue('c')) k.char(k.lerp(800, 1400, k.at('e', 1, 'inOut')), G, 470, { ...BA, pose: 'hold', face: 'calm' });
          shade(k, 0.55, [FIRE, xoLight(k.t > k.cue('b') ? 160 : 260)]);
        });
        const cu = k.t > k.cue('d') && k.t < k.cue('e', 0.6);
        if (cu) {
          const p = k.at('d', 0.5);
          k.ctx.save(); k.ctx.globalAlpha = 0.85 * p; k.ctx.fillStyle = '#0a0b10'; k.ctx.fillRect(0, 0, k.W, k.H); k.ctx.restore();
          k.ctx.save(); k.ctx.globalAlpha = p;
          bowl(k, 960, 640, 3.2);
          k.ctx.strokeStyle = '#211a15'; k.ctx.lineWidth = 16; k.ctx.lineCap = 'round'; k.ctx.beginPath(); k.ctx.moveTo(560, 330); k.ctx.lineTo(1380, 290); k.ctx.stroke();
          k.ctx.strokeStyle = '#c99a5a'; k.ctx.lineWidth = 9; k.ctx.stroke();
          k.ctx.restore();
          k.text('đũa thường', 1400, 250, { size: 32, color: '#9a8f80', p });
          k.text('đũa của "cái Út"', 960, 830, { size: 40, font: 'title', color: AMBER, p });
        }
      },
    },
    {
      say: '{a}Ngày đầu tiên tôi về, bà dặn ba điều. {r1}Một: không bao giờ được quét cái xó sau chum nước. {r2}Hai: bữa nào cũng phải để phần cơm vào đó trước, rồi mới được ăn. {r3}Ba: đêm nghe trong bếp có tiếng gì, cũng không được xuống. {q}Tôi hỏi phần cơm ấy để cho ai. {b}Bà nhìn vào cái xó một lúc lâu, rồi bảo: {ut}Cho cái Út. {n}Nhà bà không có ai tên Út. Tôi hỏi tiếp thì bà đã quay đi cời bếp, như thể câu hỏi ấy chưa bao giờ được nói ra.',
      sfx: [['click', 'r1', 0.25], ['click', 'r2', 0.25], ['click', 'r3', 0.25], ['stinger', 'n', 0.35]],
      draw(k) {
        kitchen(k, { fire: 0.8 });
        k.char(900, G, 470, { ...BA, face: k.t > k.cue('b') ? 'sad' : 'calm', pose: k.t < k.cue('q') ? 'point' : 'stand', look: k.t > k.cue('b') ? 1 : 0, talk: (k.t < k.cue('q') || (k.t > k.cue('ut') && k.t < k.cue('n'))) ? 0.35 : 0 });
        k.char(1080, G, 330, { ...MINH, face: k.t > k.cue('n') ? 'blank' : 'calm', flip: true });
        shade(k, 0.55, [FIRE, xoLight()]);
        if (k.t < k.cue('q')) rules(k, 960, 470, [['1. Không quét cái xó sau chum nước.', 'r1'], ['2. Bữa nào cũng để phần cơm vào đó trước.', 'r2'], ['3. Đêm nghe gì trong bếp, không được xuống.', 'r3']], { cue: 'r1', w: 1300 });
        quote(k, '"Cho cái Út."', 'ut');
      },
    },
    {
      say: '{a}Bọn trẻ trong xóm thì biết. Ngay chiều hôm ấy, thằng Tũn nhà bên kéo tôi ra bờ ao, thì thầm như kể một bí mật quốc gia: {b}nhà bà mày có ma xó. {c}Nó bảo, người lớn trong xóm vẫn nói, những ai chết oan, chết bất đắc kỳ tử, hoặc chết mà không ai thờ cúng, thì hồn không đi đâu được, {d}cứ quanh quẩn ở những góc tối trong nhà. Người ta gọi là ma xó. {e}Mà bà mày còn để cơm cho nó ăn, Tũn nói, mắt tròn xoe. Mười mấy năm rồi.',
      sfx: [['owl', 'd', 0.3]],
      draw(k) {
        const lore = k.t > k.cue('c') && k.t < k.cue('e');
        if (lore) {
          xoNight(k, 1.5, { eyes: k.at('d', 1.5), dark: 0.9 });
          quote(k, 'Chết oan · chết đột ngột · không ai thờ cúng', 'c', { size: 40, color: COLD, until: 'd' });
          quote(k, '→ quanh quẩn ở góc tối trong nhà', 'd', { size: 40, color: COLD });
          return;
        }
        pond(k);
        k.char(760, 900, 330, { ...TUN, face: k.t > k.cue('e') ? 'shock' : 'smug', pose: k.t > k.cue('b') ? 'point' : 'stand', talk: k.t > k.cue('b') ? 0.4 : 0 });
        k.char(960, 900, 330, { ...MINH, face: 'calm', flip: true });
        k.vignette(0.4);
        quote(k, '"Nhà bà mày có ma xó."', 'b', { until: 'c' });
        quote(k, '"Mười mấy năm rồi."', 'e');
      },
    },
    {
      say: '{a}Tôi không sợ. Năm ấy tôi mười hai tuổi, và tôi tin vào những thứ mình nhìn thấy. {b}Giữa tôi và bà, chỉ có một kỷ vật: một chiếc vòng bạc. Mẹ tôi giữ nó trong hộp gỗ ở thành phố. {c}Đó là chiếc vòng chân bà ngoại đánh cho tôi hồi đầy tháng. {d}Mặt trong khắc chữ MINH, và ngày sinh của tôi: mười bốn tháng Ba năm tám mươi ba. {e}Tôi nhớ chi tiết ấy, chỉ vì sau này, tôi đã nhìn thấy đúng những nét khắc ấy thêm một lần nữa. Ở một nơi không ai ngờ tới.',
      sfx: [['sparkle', 'c', 0.3], ['stinger', 'e', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { pond(k); k.char(960, 900, 360, { ...MINH, face: 'smug' }); k.vignette(0.4); return; }
        black(k);
        const { ctx } = k;
        ctx.fillStyle = '#4a3220'; ctx.strokeStyle = '#211a15'; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.rect(560, 640, 800, 220); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#2a1c12'; ctx.beginPath(); ctx.rect(590, 660, 740, 60); ctx.fill();
        const p = k.at('c', 1);
        anklet(k, 960, 520 - 60 * p, 200, k.t > k.cue('d') ? 'MINH · 14.3.1983' : '', { p: k.at('d', 2, 'linear'), size: 36 });
        shade(k, 0.6 + 0.25 * k.at('e', 2), [{ x: 960, y: 520, r: 620, warm: 0.4 }]);
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Tiếng hát trong bếp',
      say: '{a}Đêm thứ năm ở nhà bà, tôi tỉnh giấc lúc gần nửa đêm. Ngoài vườn, dế kêu ran. Bà ngủ say ở giường bên, thở đều. {b}Rồi tôi nghe thấy nó. {c}Từ phía gian bếp, rất khẽ, có tiếng ai đó đang hát.',
      sfx: [['owl', 1.5, 0.25], ['heartbeat', 'b', 0.4]],
      draw(k) {
        room(k);
        lie(k, 560, G - 175, 300, { ...BA, face: 'sleep' });
        if (k.t < k.cue('b')) lie(k, 1090, G - 175, 230, { ...MINH, face: 'calm' });
        else k.char(910, G - 140, 230, { ...MINH, face: 'shock', look: -1 });
        shade(k, 0.72, [ROOM.moon, ROOM.lamp]);
        tag(k, 'ĐÊM THỨ NĂM', 'a');
        chapter(k, 2, 'Tiếng hát trong bếp');
      },
    },
    {
      say: '{a}Tôi đã nhớ điều thứ ba. Nhưng tôi mười hai tuổi, và tôi muốn biết. {b}Tôi rón rén qua sân, dừng ở cửa bếp. Bếp lửa đã tàn, chỉ còn vài hòn than đỏ. {c}Tiếng hát phát ra từ sau chum nước. Giọng một đứa trẻ, mỏng như sợi chỉ, hát sai nhịp: {d}Bống bống bang bang, lên ăn cơm vàng. {e}Đúng bài bà vẫn hát mỗi chiều.',
      sfx: [['creak', 'b', 0.35], ['drip', 'c', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) {
          house(k, { time: 'night' });
          k.char(k.lerp(700, 1300, k.at('a', 6, 'linear')), 900, 260, { ...MINH, face: 'calm', walk: true, walkSpeed: 0.5 });
          shade(k, 0.55, [moon]);
          quote(k, '3. Đêm nghe gì trong bếp, không được xuống.', 'a', { size: 38, color: '#b8ad98' });
          return;
        }
        xoNight(k, 1 + 0.5 * k.at('c', 4, 'inOut'), { kid: { alpha: k.t < k.cue('c') ? 1 : 0 }, kidX: 300, dark: 0.85 });
        quote(k, '♪ Bống bống bang bang… lên ăn cơm vàng…', 'd', { color: COLD });
      },
    },
    {
      say: '{a}Tôi đứng im. Tiếng hát tắt ngay lập tức, như thể nó biết tôi ở đó. {b}Một lúc lâu. {c}Rồi từ trong xó tối, giọng ấy cất lên, rõ ràng, gọi đúng tên tôi: {d}Minh ơi. Mai đừng trèo cây vải. {e}Tôi chạy về giường, trùm chăn kín đầu đến sáng.',
      sfx: [['heartbeat', 'b', 0.45], ['stinger', 'd', 0.4], ['whoosh', 'e', 0.3]],
      draw(k) {
        if (k.t < k.cue('e')) {
          xoNight(k, 1.6, { eyes: 0.5 * k.at('c', 1.5), dark: 0.88 });
          quote(k, '"Minh ơi. Mai đừng trèo cây vải."', 'd', { color: COLD });
          return;
        }
        room(k);
        lie(k, 560, G - 175, 300, { ...BA, face: 'sleep' });
        k.ctx.fillStyle = '#7a7a6a'; k.ctx.beginPath(); k.ctx.ellipse(910, G - 170, 170, 46, 0, Math.PI, 0); k.ctx.fill();
        shade(k, 0.75, [ROOM.moon, ROOM.lamp]);
      },
    },
    {
      say: '{a}Sáng hôm sau, tôi là người đầu tiên xuống bếp. {b}Bát cơm con trong xó đã sạch trơn. Không còn một hạt. {c}Đôi đũa ngắn gác ngay ngắn trên miệng bát, như có người ăn xong rồi xếp lại. {d}Tôi tự nhủ: chuột. Chắc chắn là chuột.',
      draw(k) {
        zoom(k, 1540, 860, 1 + 1.4 * k.at('b', 2, 'inOut'), () => {
          kitchen(k, { fire: 0, bowl: { empty: true } });
          k.char(1180, G, 330, { ...MINH, face: k.t > k.cue('d') ? 'blank' : 'shock', flip: true, alpha: k.t < k.cue('b') ? 1 : 0 });
          shade(k, 0.5, [door, xoLight(300)]);
        });
        quote(k, 'Chuột. Chắc chắn là chuột.', 'd', { color: '#b8ad98' });
      },
    },
    {
      say: '{a}Tối hôm ấy, tôi làm một việc mà tôi nghĩ là rất thông minh. {b}Tôi bốc một nắm tro trong bếp, rắc mỏng một vòng quanh bát cơm, phẳng như mặt giấy. Chuột hay mèo bò vào, kiểu gì cũng để lại dấu chân. {c}Sáng ra, bát cơm lại sạch trơn. {d}Còn vòng tro quanh bát vẫn phẳng lì. Không một vết chân. Không một vết xước.',
      sfx: [['scratch', 'b', 0.25], ['stinger', 'd', 0.4]],
      draw(k) {
        const night = k.t < k.cue('c');
        zoom(k, 1540, 880, night ? 1.8 : 1.8 + 0.8 * k.at('d', 2, 'inOut'), () => {
          kitchen(k, { fire: night ? 0.4 : 0, bowl: { empty: !night } });
          const r = k.at('b', 1.5);
          if (r > 0) { const { ctx } = k; ctx.save(); ctx.globalAlpha = r; ctx.strokeStyle = '#7d766e'; ctx.lineWidth = 14; ctx.beginPath(); ctx.ellipse(1540, G - 4, 120, 22, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
          if (night) k.char(1300, G, 330, { ...MINH, face: 'smug', pose: 'hold' });
          shade(k, night ? 0.75 : 0.45, night ? [FIRE, xoLight(260)] : [door, xoLight(320)]);
        });
        quote(k, 'Không một vết chân.', 'd');
      },
    },
    {
      say: '{a}Chiều hôm ấy, tôi không trèo cây vải. Tôi không biết vì sao mình nghe lời. Có lẽ vì giọng nói đêm qua không có gì đáng sợ. Nó chỉ như một lời dặn. {b}Gần tối, trời nổi giông. Gió quật qua đồi chè, rạp cả luống. {c}Rồi một tiếng rắc khô khốc vang lên sau nhà.',
      sfx: [['wind', 'b', 0.5], ['thunder', ['b', 2], 0.4], ['boom', 'c', 0.5]],
      draw(k) {
        const storm = k.t > k.cue('b');
        const sh = k.shake('c', 0.6, 10);
        k.group({ x: sh.x, y: sh.y }, () => {
          house(k, { time: storm ? 'storm' : 'day', branch: 'seat' });
          k.char(storm ? 1150 : 520, 900, 280, { ...MINH, face: storm ? 'shock' : 'calm', look: storm ? -1 : 0, lookY: -1 });
          if (storm) { k.rain(0, 0, k.W, k.H); shade(k, 0.45, [{ x: 960, y: 300, r: 1400 }]); }
          else k.vignette(0.35);
        });
        k.flash(k.cue('b', 2), 0.6); k.flash('c', 0.5);
      },
    },
    {
      say: '{a}Cành vải to nhất, cái cành có chạc ba mà chiều nào tôi cũng ngồi vắt vẻo đọc truyện, đã gãy lìa, đổ ngang sân. {b}Chỗ chạc ba ấy, tấm ván tôi đặt làm chỗ ngồi văng ra tận bờ giếng. {c}Bà đứng nhìn cành cây rất lâu. Rồi bà quay sang tôi, hỏi một câu tôi không ngờ tới: {d}Đêm qua mày xuống bếp phải không? {e}Tôi không trả lời. Bà cũng không hỏi nữa. {f}Tối hôm ấy, bát cơm trong xó được bà xới đầy hơn mọi ngày.',
      sfx: [['stinger', 'd', 0.3]],
      draw(k) {
        if (k.t < k.cue('f')) {
          house(k, { time: 'day', branch: 'broken' });
          k.char(1000, 900, 380, { ...BA, face: k.t > k.cue('d') ? 'sad' : 'calm', look: k.t > k.cue('c', 2) ? 1 : -1, talk: k.t > k.cue('d') && k.t < k.cue('e') ? 0.35 : 0 });
          k.char(1200, 900, 280, { ...MINH, face: k.t > k.cue('d') ? 'blank' : 'calm', flip: true });
          k.vignette(0.4);
          quote(k, '"Đêm qua mày xuống bếp phải không?"', 'd');
          return;
        }
        zoom(k, 1540, 840, 1.6, () => { kitchen(k, { fire: 0.6, bowl: { full: true } }); shade(k, 0.7, [FIRE, xoLight(260)]); });
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      chapter: 'Viên gạch lỏng',
      say: '{a}Từ hôm ấy, tôi bắt đầu để ý cái xó bếp. Tôi không còn sợ nữa, chỉ tò mò đến phát điên. {b}Một buổi trưa, bà ra đồi chè. Tôi cầm một que tre, chui ra sau chum nước. {c}Tôi không quét. Tôi tự nhủ mình không phá điều thứ nhất. Tôi chỉ chọc thử.',
      draw(k) {
        kitchen(k, { fire: 0.2 });
        const x = k.t > k.cue('b') ? k.lerp(1000, 1420, k.at('b', 2)) : 1000;
        k.char(x, G, 330, { ...MINH, face: 'calm', pose: k.t > k.cue('c') ? 'point' : 'stand', walk: k.t > k.cue('b') && k.t < k.cue('b', 2) });
        if (k.t > k.cue('c')) { const { ctx } = k; ctx.strokeStyle = '#c9a35a'; ctx.lineWidth = 7; ctx.lineCap = 'round'; const w = Math.sin(k.t * 6) * 10; ctx.beginPath(); ctx.moveTo(x + 70, G - 200); ctx.lineTo(1620 + w, G - 20); ctx.stroke(); }
        shade(k, 0.45, [door, xoLight(300)]);
        tag(k, 'MỘT BUỔI TRƯA', 'b');
        chapter(k, 3, 'Viên gạch lỏng');
      },
    },
    {
      say: '{a}Dưới lớp tro dày, đầu que chạm phải một thứ cứng. {b}Một viên gạch nung, nằm lệch so với nền đất. Tôi lấy tay cạy. {c}Viên gạch lung lay, rồi bật lên. {d}Bên dưới là một cái hũ sành nhỏ, miệng buộc vải đỏ đã bạc thành màu hồng nhạt.',
      sfx: [['click', 'a', 0.4], ['scratch', 'b', 0.3], ['creak', 'c', 0.4]],
      draw(k) {
        zoom(k, 1640, 860, 3, () => {
          kitchen(k, { fire: 0, ash: 1 - 0.5 * k.at('a', 2), brick: k.at('c', 0.8), urn: k.t > k.cue('d') });
          shade(k, 0.45, [door, xoLight(320)]);
        });
      },
    },
    {
      say: '{a}Trong hũ là một mảnh vải trắng ngà, gấp vuông vức như tã trẻ con. Tôi mở ra. {b}Một chiếc vòng chân bạc. Nhỏ xíu. Đã xỉn đen. {c}Tôi lật mặt trong lên, nghiêng về phía ánh sáng ngoài cửa.',
      sfx: [['sparkle', 'b', 0.3]],
      draw(k) {
        black(k);
        const o = k.at('a', 2, 'inOut');
        cloth(k, 960, 560, 2, o);
        if (k.t > k.cue('b')) anklet(k, 960, 540 - 40 * k.at('c', 1.5), 150, '', { tarnish: 1, rot: -0.12 + 0.5 * k.at('c', 2) });
        shade(k, 0.55, [{ x: 300, y: 300, r: 1300, warm: 0.3 }]);
      },
    },
    {
      say: '{a}Nét khắc giống hệt chiếc vòng trong hộp gỗ của mẹ tôi. Cùng một kiểu chữ. Cùng một bàn tay thợ bạc. {b}Nhưng ở đây không phải chữ MINH. {c}Mà là chữ ÚT. {d}Và ngay bên cạnh: mười bốn tháng Ba năm tám mươi ba. {e}Ngày sinh của tôi.',
      sfx: [['stinger', 'c', 0.45], ['heartbeat', 'e', 0.55]],
      draw(k) {
        black(k);
        const both = k.t > k.cue('e');
        const x = both ? k.lerp(960, 1300, k.at('e', 1, 'inOut')) : 960;
        anklet(k, x, 540, 230, k.t > k.cue('c') ? (k.t > k.cue('d') ? 'ÚT · 14.3.1983' : 'ÚT') : '', { tarnish: 1, size: 42, p: k.at('c', 1, 'linear') });
        if (k.t < k.cue('b')) { k.ctx.save(); k.ctx.globalAlpha = 0.35 * k.at('a', 1); anklet(k, 960, 540, 230, 'MINH', { size: 42 }); k.ctx.restore(); }
        if (both) { k.ctx.save(); k.ctx.globalAlpha = k.at('e', 1); anklet(k, 620, 540, 230, 'MINH · 14.3.1983', { size: 42 }); k.ctx.restore(); }
        shade(k, 0.5, [{ x: 960, y: 540, r: 900, warm: 0.3 }]);
      },
    },
    {
      say: '{a}Tôi không biết bà đứng ở cửa bếp từ lúc nào. Cái nón trên tay bà rơi xuống đất. {b}Lần đầu tiên trong đời, bà đánh tôi. Một cái vào mu bàn tay, không đau, nhưng tay bà run đến mức tôi tưởng bà sắp ngã. {c}Bà giật lấy chiếc vòng, gói lại vào mảnh tã, đặt về hũ, đậy viên gạch, rồi vốc tro phủ lên. Từng vốc, từng vốc, cho đến khi cái xó trở lại y như cũ. {d}Rồi bà ngồi xuống cạnh chum nước, và khóc. Không thành tiếng.',
      sfx: [['whoosh', 'a', 0.3], ['click', 'b', 0.6], ['scratch', 'c', 0.25], ['scratch', ['c', 2], 0.25]],
      draw(k) {
        const ash = k.t > k.cue('c') ? 0.4 + 0.6 * k.at('c', 6, 'linear') : 0.5;
        kitchen(k, { fire: 0, ash, brick: k.t < k.cue('c', 1) ? 1 : 0, urn: k.t < k.cue('c', 1) ? 'open' : false });
        const baX = k.t < k.cue('b') ? 200 : k.t < k.cue('c') ? 1200 : k.t < k.cue('d') ? 1500 : 1380;
        k.char(baX, G, 470, { ...BA, face: k.t > k.cue('d') ? 'cry' : k.t > k.cue('b') ? 'angry' : 'shock', tears: k.t > k.cue('d') ? 1 : 0, pose: k.t > k.cue('c') && k.t < k.cue('d') ? 'hold' : 'stand', flip: k.t > k.cue('b') });
        k.char(k.t < k.cue('c') ? 1420 : 900, G, 330, { ...MINH, face: k.t > k.cue('b') ? 'sad' : 'shock', look: -1 });
        if (k.t < k.cue('b')) nonFall(k, 300, G - 400, k.at('a', 1.2, 'in'));
        else { const { ctx } = k; ctx.save(); ctx.translate(380, G - 10); ctx.rotate(0.3); ctx.fillStyle = '#d8c48f'; ctx.strokeStyle = '#211a15'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(0, -46); ctx.lineTo(70, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
        shade(k, 0.5, [door, xoLight(300)]);
      },
    },
    {
      say: '{a}Tối hôm ấy, bà không nói với tôi một lời nào. Tôi cũng không dám hỏi. {b}Ai là Út? {c}Vì sao một đứa tên Út lại sinh cùng ngày với tôi? {d}Và nếu nó có thật, thì giờ nó đang ở đâu? {e}Nếu là bạn, bạn sẽ hỏi bà, hay sẽ hỏi cái giọng trong xó bếp?',
      draw(k) {
        kitchen(k, { fire: 0.7 });
        k.char(800, G, 470, { ...BA, face: 'sad', gloom: 0.6 });
        k.char(1050, G, 330, { ...MINH, face: 'sad', look: 0.8, flip: true });
        shade(k, 0.68, [FIRE, xoLight(200)]);
        const qs = [['Ai là Út?', 'b', 'c'], ['Vì sao sinh cùng ngày với tôi?', 'c', 'd'], ['Giờ nó đang ở đâu?', 'd', 'e']];
        for (const [t, c, u] of qs) quote(k, t, c, { until: u, color: PAPER });
        quote(k, 'Bạn sẽ hỏi bà, hay hỏi giọng trong xó bếp?', 'e', { color: AMBER, size: 46 });
      },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Đêm bà ngã',
      say: '{a}Mấy đêm liền sau đó, xó bếp im lặng. Không tiếng hát. {b}Sáng ra, bát cơm vẫn sạch, nhưng không còn giọng nói nào gọi tôi. Tôi nghĩ nó giận vì tôi đã đào chỗ của nó. {c}Rồi đến đêm rằm tháng Bảy.',
      sfx: [['gong', 'c', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { xoNight(k, 1.4, { dark: 0.9, bowl: { empty: true } }); }
        else if (k.t < k.cue('c')) { zoom(k, 1540, 860, 2.2, () => { kitchen(k, { fire: 0, bowl: { empty: true } }); shade(k, 0.5, [door, xoLight(300)]); }); }
        else { house(k, { time: 'night' }); shade(k, 0.5, [moon]); tag(k, 'RẰM THÁNG BẢY', 'c'); }
        chapter(k, 4, 'Đêm bà ngã');
      },
    },
    {
      say: '{a}Khoảng hai giờ sáng, có ai đó lay vai tôi. {b}Không phải bà. Bàn tay ấy nhỏ, và lạnh như vừa nhúng nước giếng. {c}Tôi mở mắt. Trong màn không có ai. Chỉ có giọng nói, ngay sát tai: {d}Minh ơi. Bà ngã ở giếng.',
      sfx: [['heartbeat', 'b', 0.45], ['stinger', 'd', 0.45]],
      draw(k) {
        room(k, { baEmpty: true, hand: k.t > k.cue('a') && k.t < k.cue('c') ? 0.4 + 0.3 * Math.sin(k.t * 3) : 0 });
        if (k.t < k.cue('c')) lie(k, 1090, G - 175, 230, { ...MINH, face: 'sleep' });
        else k.char(910, G - 140, 230, { ...MINH, face: 'shock', look: 0.5 });
        shade(k, 0.75, [ROOM.moon, { ...ROOM.lamp, r: 200 }]);
        tag(k, '2:00 SÁNG', 'a');
        quote(k, '"Minh ơi. Bà ngã ở giếng."', 'd', { color: COLD });
      },
    },
    {
      say: '{a}Giường bên cạnh trống trơn. {b}Tôi chạy ra sân. Dưới ánh trăng rằm, bà nằm co bên thành giếng, cái gàu đổ lăn lóc, nước loang ra cả mảng sân gạch. {c}Bà dậy múc nước như mọi đêm, trượt chân trên rêu, ngã đập hông xuống đá ong. {d}Bà tỉnh, nhưng không đứng lên được, và cũng không đủ sức gọi ai.',
      sfx: [['whoosh', 'b', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { room(k, { baEmpty: true }); k.char(910, G - 140, 230, { ...MINH, face: 'shock', look: -1 }); shade(k, 0.72, [ROOM.moon, ROOM.lamp]); return; }
        house(k, { time: 'night', branch: 'broken' });
        bucket(k, 1840, 975);
        lie(k, 1760, 1000, 360, { ...BA, face: 'sad', pose: 'hold' });
        k.char(k.lerp(600, 1150, k.at('b', 1.5)), 950, 300, { ...MINH, face: 'shock', walk: k.t < k.cue('b', 1.5) });
        shade(k, 0.55, [moon, { x: 1500, y: 900, r: 550 }]);
      },
    },
    {
      say: '{a}Tôi chạy sang nhà thằng Tũn, đập cửa đến bật cả then. {b}Bố Tũn và mấy người hàng xóm sang khiêng bà vào nhà. {c}Ông lang trong xóm bảo bà rạn xương hông, phải nằm một chỗ cả tháng. {d}May mà thằng cháu dậy kịp, ông nói. Để đến sáng thì nước giếng đêm ngấm vào người, bà cụ khó qua.',
      sfx: [['click', 'a', 0.6], ['click', ['a', 0.3], 0.6], ['click', ['a', 0.6], 0.6]],
      draw(k) {
        if (k.t < k.cue('c')) {
          house(k, { time: 'night', branch: 'broken' });
          lie(k, 1760, 1000, 360, { ...BA, face: 'sad' });
          if (k.t > k.cue('b')) { k.char(1300, 980, 400, { ...NEIGH, pose: 'hold' }); k.char(1800, 980, 400, { ...NEIGH, color: '#4a3a3a', pose: 'hold', flip: true }); }
          k.char(1050, 960, 300, { ...MINH, face: 'sad' });
          shade(k, 0.6, [moon, ...(k.t > k.cue('b') ? [torch(1300, 800), torch(1800, 800)] : [])]);
          return;
        }
        room(k);
        lie(k, 560, G - 175, 300, { ...BA, face: 'sad' });
        k.char(760, G, 470, { ...OLDMAN, face: 'calm', talk: k.t > k.cue('d') ? 0.35 : 0, flip: true });
        k.char(1000, G, 330, { ...MINH, face: 'sad' });
        shade(k, 0.6, [{ ...ROOM.lamp, r: 600 }]);
        quote(k, '"May mà thằng cháu dậy kịp."', 'd');
      },
    },
    {
      say: '{a}Khi mọi người về hết, bà nắm tay tôi, nắm rất chặt. {b}Ai gọi mày dậy? {c}Tôi im một lúc, rồi kể thật. Tiếng hát. Cành vải. Bàn tay lạnh. Câu bà ngã ở giếng. {d}Bà nhắm mắt lại. Nước mắt chảy dài xuống gối. Rồi bà nói, giọng rất nhẹ, như sợ đánh thức ai: {e}Nó thương mày đấy. Nó là em mày.',
      sfx: [['stinger', 'e', 0.45]],
      draw(k) {
        zoom(k, 500, 700, 1.5, () => {
          room(k);
          lie(k, 560, G - 175, 300, { ...BA, face: k.t > k.cue('d') ? 'cry' : 'sad', tears: k.t > k.cue('d') ? 1 : 0 });
          k.char(640, G, 330, { ...MINH, face: k.t > k.cue('e') ? 'shock' : 'sad', pose: 'hold', talk: k.t > k.cue('c') && k.t < k.cue('d') ? 0.3 : 0 });
          shade(k, 0.6, [{ ...ROOM.lamp, r: 500 }]);
        });
        quote(k, '"Ai gọi mày dậy?"', 'b', { until: 'c' });
        quote(k, '"Nó thương mày đấy. Nó là em mày."', 'e', { color: AMBER });
      },
    },

    // ===== CHƯƠNG 5: hồi tưởng 1983 (màu lạnh) =====
    {
      chapter: 'Lời bà kể',
      say: '{a}Bà kể. Lần duy nhất bà kể. {b}Tháng Ba năm tám mươi ba, mẹ tôi về nhà bà để sinh. Đêm mười bốn, mẹ trở dạ. Bà đỡ trong làng được gọi sang. {c}Gần mười giờ đêm, mẹ sinh tôi, nặng ba cân hai, khóc to đến nỗi chó cả xóm sủa theo. {d}Rồi mẹ lịm đi vì mất sức.',
      draw(k) {
        room(k);
        lie(k, 560, G - 175, 330, { ...ME, face: k.t > k.cue('d') ? 'sleep' : 'sad' });
        k.char(760, G, 470, { ...BA_DO, face: 'calm', pose: 'hold' });
        k.char(1000, G, 470, { ...BA, color: '#6a5444', hairColor: '#5a5048', face: k.t > k.cue('c') ? 'happy' : 'calm', pose: 'hold' });
        if (k.t > k.cue('c')) baby(k, 1000, G - 290, 1.3);
        shade(k, 0.6, [{ ...ROOM.lamp, r: 650 }]);
        cold(k);
        tag(k, '14.3.1983', 'b');
        chapter(k, 5, 'Lời bà kể');
      },
    },
    {
      say: '{a}Mười lăm phút sau, bà đỡ ngẩng lên, mặt tái đi. Vẫn còn một đứa nữa. {b}Đứa thứ hai nhỏ hơn tôi nhiều. Nó không khóc, chỉ thở khò khè như con mèo con. {c}Bà ngoại ôm nó vào ngực, sưởi bên bếp lửa suốt đêm. {d}Gần sáng, nó thôi thở. {e}Trong lúc ấy, mẹ tôi vẫn chưa tỉnh lại.',
      sfx: [['stinger', 'a', 0.35], ['heartbeat', 'd', 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) {
          room(k);
          lie(k, 560, G - 175, 330, { ...ME, face: 'sleep' });
          k.char(760, G, 470, { ...BA_DO, face: 'shock', pose: 'hold' });
          if (k.t > k.cue('b')) baby(k, 760, G - 290, 0.9, { pale: true });
          shade(k, 0.6, [{ ...ROOM.lamp, r: 600 }]);
          cold(k);
          return;
        }
        const f = k.t > k.cue('d') ? 0.6 - 0.5 * k.at('d', 3) : 0.6;
        kitchen(k, { fire: f, bowl: false });
        k.char(800, G, 470, { ...BA, color: '#6a5444', hairColor: '#5a5048', face: k.t > k.cue('d') ? 'cry' : 'sad', tears: k.t > k.cue('d') ? 1 : 0, pose: 'hold' });
        baby(k, 800, G - 290, 0.9, { pale: true });
        shade(k, 0.55 + 0.3 * k.at('d', 3), [{ ...FIRE, r: 620 * (0.5 + f) }]);
        cold(k);
      },
    },
    {
      say: '{a}Năm trước đó, mẹ tôi đã mất một đứa con khi mới mang thai năm tháng. Mẹ suy sụp suốt cả năm, có những đêm ngồi ngoài hiên đến sáng. {b}Bà ngoại nhìn đứa con gái đang ngủ mê, rồi quyết định một điều mà bà giữ suốt mười hai năm: {c}không nói cho mẹ biết. Bà đỡ thề giữ kín. Bà đỡ ấy mất năm chín mươi. Từ đó, cả thế gian chỉ còn một mình bà ngoại tôi biết. {d}Khi mẹ tỉnh lại, người ta chỉ đặt vào tay mẹ một đứa trẻ. {e}Là tôi.',
      draw(k) {
        if (k.t < k.cue('b')) {
          house(k, { time: 'night' });
          k.char(960, 790, 380, { ...ME, face: 'sad', gloom: 0.7 });
          shade(k, 0.55, [moon]);
          cold(k);
          return;
        }
        room(k);
        const awake = k.t > k.cue('d');
        lie(k, 560, G - 175, 330, { ...ME, face: awake ? 'happy' : 'sleep' });
        if (awake) baby(k, 420, G - 230, 1.2);
        k.char(760, G, 470, { ...BA_DO, face: 'sad', flip: k.t > k.cue('c') });
        k.char(1000, G, 470, { ...BA, color: '#6a5444', hairColor: '#5a5048', face: 'sad', look: -1, flip: k.t > k.cue('c') && !awake });
        shade(k, 0.6, [{ ...ROOM.lamp, r: 650 }]);
        cold(k);
        quote(k, 'Không nói cho mẹ biết.', 'c', { until: 'd', color: COLD });
        quote(k, 'Là tôi.', 'e');
      },
    },
    {
      say: '{a}Bà một mình đem em ra chôn dưới bụi tre cuối vườn. Không cỗ, không áo quan, không thầy cúng. {b}Không ai biết nó từng sinh ra, nên cũng không ai biết nó đã mất. {c}Không có tên trong sổ, không có bát hương trên bàn thờ. Đúng như người ta vẫn nói về những vong không ai thờ cúng.',
      sfx: [['wind', 0, 0.35]],
      draw(k) {
        bamboo(k, { mound: k.t > k.cue('b') });
        if (k.t < k.cue('b')) { k.char(k.lerp(400, 900, k.at('a', 5, 'linear')), G, 470, { ...BA, color: '#6a5444', hairColor: '#5a5048', face: 'sad', pose: 'hold', walk: true, walkSpeed: 0.4 }); baby(k, k.lerp(400, 900, k.at('a', 5, 'linear')), G - 290, 0.9, { pale: true }); }
        k.fog({ y: 860, alpha: 0.25 });
        shade(k, 0.38, [{ x: 170, y: 170, r: 1500 }]);
        cold(k, 0.7);
      },
    },
    {
      say: '{a}Bà sợ nó lạnh, bà nói. Sợ nó đói. Sợ nó đi lang thang ngoài kia không biết về đâu. {b}Nên bà để cho nó một chỗ cạnh bếp lửa. Bữa nào bà cũng xới cho nó một bát, như xới cho cháu bà. {c}Một tháng sau, khi đi đánh vòng bạc cho tôi, bà đặt thợ làm hai chiếc. {d}Chiếc khắc MINH đưa cho mẹ. {e}Chiếc kia, bà khắc chữ ÚT, vì em chưa kịp có tên, rồi chôn dưới viên gạch trong xó bếp.',
      sfx: [['sparkle', 'c', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) {
          zoom(k, 500, 700, 1.5, () => { room(k); lie(k, 560, G - 175, 300, { ...BA, face: 'cry', tears: 0.7, talk: 0.3 }); shade(k, 0.62, [{ ...ROOM.lamp, r: 450 }]); });
          return;
        }
        if (k.t < k.cue('c')) { kitchen(k, { fire: 0.9, bowl: true }); shade(k, 0.6, [FIRE, { x: 1540, y: 820, r: 330, warm: 0.8 }]); return; }
        black(k);
        anklet(k, 620, 540, 210, 'MINH · 14.3.1983', { size: 38, p: k.at('d', 1.2, 'linear') });
        anklet(k, 1300, 540, 210, 'ÚT · 14.3.1983', { size: 38, p: k.at('e', 1.2, 'linear') });
        shade(k, 0.45, [{ x: 960, y: 540, r: 1000, warm: 0.3 }]);
        cold(k, 0.5);
      },
    },
    {
      say: '{a}Tôi hỏi bà: vì sao hè nào bà cũng đòi con về? {b}Bà cười, lần đầu tiên trong đêm ấy. {c}Để em nó được ở với anh. Mỗi năm có ba tháng.',
      draw(k) {
        zoom(k, 500, 700, 1.6, () => {
          room(k);
          lie(k, 560, G - 175, 300, { ...BA, face: k.t > k.cue('b') ? 'happy' : 'sad', tears: 0.6, talk: k.t > k.cue('c') ? 0.3 : 0 });
          k.char(640, G, 330, { ...MINH, face: 'sad', pose: 'hold' });
          shade(k, 0.6, [{ ...ROOM.lamp, r: 500 }]);
        });
        quote(k, '"Để em nó được ở với anh. Mỗi năm có ba tháng."', 'c', { color: AMBER });
      },
    },

    // ===== CHƯƠNG 6 =====
    {
      chapter: 'Quét cho em đi',
      say: '{a}Đêm hôm sau, tôi không chờ nó gọi. Tôi tự xuống bếp, ngồi xuống trước chum nước, nói vào cái xó tối: {b}Út ơi. {c}Một lúc lâu. Rồi giọng nói ấy đáp lại, khẽ hơn mọi lần, như đứa trẻ vừa bị mắng: {d}Minh ơi.',
      draw(k) {
        zoom(k, 1450, 760, 1.3, () => {
          kitchen(k, { fire: 0 });
          oil(k, 1230, G - 352, 0.8);
          k.char(1380, G, 330, { ...MINH, face: 'calm', look: 1, talk: k.t > k.cue('b') && k.t < k.cue('c') ? 0.3 : 0 });
          k.glowEyes(1610, 770, 0.3, '#ffe9a8', { p: 0.5 * k.at('d', 1) });
          shade(k, 0.82, [{ x: 1230, y: G - 430, r: 420, flicker: 1, warm: 1 }, xoLight(180)]);
        });
        quote(k, '"Út ơi."', 'b', { until: 'c' });
        quote(k, '"Minh ơi."', 'd', { color: COLD });
        chapter(k, 6, 'Quét cho em đi');
      },
    },
    {
      say: '{a}Tôi hỏi nó có sợ tối không. {b}Nó bảo không, vì bếp lúc nào cũng có lửa. Chỉ có những năm bà ốm, bếp nguội ba ngày liền, là nó lạnh. {c}Tôi hỏi nó trông thế nào. {d}Nó im một lúc rất lâu, rồi bảo: {e}Giống Minh. Chỉ nhỏ hơn.',
      sfx: [['heartbeat', 'e', 0.35]],
      draw(k) {
        zoom(k, 1450, 760, 1.3 + 0.5 * k.at('d', 3, 'inOut'), () => {
          kitchen(k, { fire: 0 });
          oil(k, 1230, G - 352, 0.8);
          k.char(1380, G, 330, { ...MINH, face: k.t > k.cue('e') ? 'blank' : 'calm', look: 1, talk: (k.t > k.cue('a') && k.t < k.cue('b')) || (k.t > k.cue('c') && k.t < k.cue('d')) ? 0.3 : 0 });
          k.glowEyes(1610, 770, 0.3, '#ffe9a8', { p: 0.45 });
          shade(k, 0.82, [{ x: 1230, y: G - 430, r: 420, flicker: 1, warm: 1 }, xoLight(180)]);
        });
        quote(k, '"Giống Minh. Chỉ nhỏ hơn."', 'e', { color: COLD });
      },
    },
    {
      say: '{a}Đêm ấy chúng tôi nói chuyện đến gần sáng. {b}Nó biết hết mọi thứ trong nhà: con gà mái nào đẻ ở đâu, bà giấu tiền trong ống tre nào, năm nào tôi về, năm nào tôi khóc vì nhớ mẹ. {c}Nó bảo, mười hai năm nay, nó chỉ ngồi ở đây. Nghe bà hát. Chờ tôi về. {d}Rồi nó im lặng rất lâu, và xin tôi một điều.',
      draw(k) {
        zoom(k, 1450, 760, 1.3 + 0.3 * k.at('d', 3, 'inOut'), () => {
          kitchen(k, { fire: 0 });
          oil(k, 1230, G - 352, 0.8);
          k.char(1380, G, 330, { ...MINH, face: k.t > k.cue('c') ? 'sad' : k.t > k.cue('b') ? 'happy' : 'calm', look: 1 });
          k.glowEyes(1610, 770, 0.3, '#ffe9a8', { p: 0.4 });
          shade(k, 0.82, [{ x: 1230, y: G - 430, r: 420, flicker: 1, warm: 1 }, xoLight(180)]);
        });
        dust(k, 1000, 300, 700, 500, 20, 0.35);
      },
    },
    {
      say: '{a}Minh ơi. Quét cho em đi. {b}Tôi hỏi tại sao. {c}Bà giữ em lâu quá rồi. Bà già rồi. Em muốn đi.',
      sfx: [['heartbeat', 'a', 0.4]],
      draw(k) {
        xoNight(k, 2, { eyes: 0.5, dark: 0.88, lights: [{ x: 1230, y: G - 430, r: 300, flicker: 1, warm: 0.6 }] });
        quote(k, '"Minh ơi. Quét cho em đi."', 'a', { color: COLD, until: 'b' });
        quote(k, '"Bà giữ em lâu quá rồi. Em muốn đi."', 'c', { color: COLD });
      },
    },
    {
      say: '{a}Sáng hôm sau, tôi kể với bà. Bà quay mặt vào vách, rất lâu, không nói gì. Tôi tưởng bà sẽ cấm. {b}Rồi bà nói, mắt vẫn nhìn vách: {c}Ừ. Bà giữ em lâu quá rồi. {d}Rồi bà dặn thêm: quét xong, đem chiếc vòng ra bụi tre cuối vườn, chôn cùng với em.',
      draw(k) {
        zoom(k, 500, 700, 1.5, () => {
          room(k);
          lie(k, 560, G - 175, 300, { ...BA, face: k.t > k.cue('c') ? 'cry' : 'sad', tears: k.t > k.cue('c') ? 0.8 : 0, look: -1, talk: k.t > k.cue('c') ? 0.25 : 0 });
          k.char(640, G, 330, { ...MINH, face: 'sad', pose: 'hold' });
          shade(k, 0.4, [{ x: 1450, y: 400, r: 1200 }]);
        });
        quote(k, '"Ừ. Bà giữ em lâu quá rồi."', 'c', { until: 'd' });
        quote(k, 'Chôn chiếc vòng cùng với em.', 'd', { color: AMBER });
      },
    },
    {
      say: '{a}Đêm ấy, tôi thắp đèn dầu, đặt lên nắp chum nước, cầm cái chổi rơm của bà. {b}Tôi quét. Mười hai năm tro và bụi bốc lên trong ánh đèn như sương. {c}Mỗi nhát chổi, cái xó lại sáng thêm một chút, rộng thêm một chút, cho đến khi nó chỉ còn là một góc nhà bình thường, nền đất nện, chân vách đất. Không có gì đáng sợ. {d}Tôi cạy viên gạch, lấy hũ sành lên, ôm vào lòng.',
      sfx: [['scratch', 'b', 0.3], ['scratch', ['b', 1.2], 0.3], ['scratch', ['b', 2.4], 0.3], ['scratch', ['c', 1], 0.3], ['creak', 'd', 0.35]],
      draw(k) {
        const sw = k.at('b', k.cue('d') - k.cue('b'), 'linear');
        zoom(k, 1450, 760, 1.3, () => {
          kitchen(k, { fire: 0, bowl: false, ash: 1 - sw, brick: k.t > k.cue('d') ? 1 : 0 });
          oil(k, 1230, G - 352, 0.8);
          const sweeping = k.t > k.cue('b') && k.t < k.cue('d');
          k.char(1420, G, 330, { ...MINH, face: 'calm', pose: 'hold', flip: true });
          if (k.t > k.cue('a', 2) && k.t < k.cue('d')) broom(k, 1500, G - 230, 0.6, 0.5 + (sweeping ? 0.35 * Math.sin(k.t * 5) : 0));
          if (k.t > k.cue('d')) urn(k, 1420, G - 150, 0.6);
          shade(k, 0.8 - 0.35 * sw, [{ x: 1230, y: G - 430, r: 420 + 400 * sw, flicker: 1, warm: 1 }]);
          if (k.t > k.cue('b')) dust(k, 1350, 450, 450, 450, 40, 0.6 * (1 - 0.6 * sw));
        });
      },
    },
    {
      say: '{a}Tôi ra bụi tre cuối vườn, đào một hố nhỏ, đặt chiếc vòng vào, lấp đất lại. {b}Gió đi qua bụi tre, kêu kẽo kẹt. {c}Rồi ngay sau lưng tôi, giọng nói ấy cất lên lần cuối cùng. Không còn mỏng như sợi chỉ, mà rõ ràng, ấm áp như một đứa trẻ đang cười: {d}Anh ơi. {e}Mười hai năm, đó là lần đầu tiên nó gọi tôi là anh. {f}Tôi quay lại. Sau lưng tôi chỉ có ánh trăng.',
      sfx: [['wind', 'b', 0.45], ['creak', ['b', 1], 0.3], ['sparkle', 'd', 0.35]],
      draw(k) {
        bamboo(k, { mound: k.t > k.cue('b') });
        k.char(900, G, 330, { ...MINH, face: k.t > k.cue('d') ? 'cry' : 'sad', tears: k.t > k.cue('e') ? 1 : 0, pose: k.t < k.cue('b') ? 'hold' : 'stand', flip: k.t > k.cue('f') });
        if (k.t < k.cue('b')) anklet(k, 960, G - 30, 26, '', {});
        k.fog({ y: 860, alpha: 0.2 });
        shade(k, 0.5 - 0.15 * k.at('d', 2), [{ x: 170, y: 170, r: 1500 }]);
        quote(k, '"Anh ơi."', 'd', { color: AMBER, size: 64, until: 'f' });
      },
    },
    {
      say: '{a}Khi tôi về đến nhà, trời đã hửng. Bà vẫn thức, nằm nghiêng nhìn ra cửa. {b}Bà hỏi khẽ: Em đi rồi à? {c}Tôi gật đầu. {d}Bà quay mặt vào vách. Rồi bà hát, rất khẽ, như ru một đứa trẻ đã ngủ say: {e}Bống bống bang bang, lên ăn cơm vàng cơm bạc nhà ta.',
      draw(k) {
        zoom(k, 500, 700, 1.5, () => {
          room(k);
          lie(k, 560, G - 175, 300, { ...BA, face: k.t > k.cue('d') ? 'cry' : 'sad', tears: k.t > k.cue('d') ? 1 : 0, look: k.t > k.cue('d') ? -1 : 1, talk: (k.t > k.cue('b') && k.t < k.cue('c')) || k.t > k.cue('e') ? 0.25 : 0 });
          k.char(680, G, 330, { ...MINH, face: 'sad', pose: 'stand' });
          shade(k, 0.5, [{ x: 1450, y: 400, r: 1100 }, { ...ROOM.lamp, r: 400 }]);
        });
        quote(k, '"Em đi rồi à?"', 'b', { until: 'd' });
        quote(k, '♪ Bống bống bang bang, lên ăn cơm vàng cơm bạc nhà ta…', 'e', { color: AMBER, size: 44 });
      },
    },
    {
      say: '{a}Sáng hôm sau, bát cơm cuối cùng bà nhờ tôi xới vẫn nằm nguyên trong góc bếp. {b}Cơm nguội lạnh, đôi đũa ngắn vẫn gác bên cạnh, như lúc tôi đặt xuống. {c}Lần đầu tiên sau mười hai năm, không ai ăn.',
      draw(k) {
        zoom(k, 1540, 860, 1.4 + 1 * k.at('b', 4, 'inOut'), () => {
          kitchen(k, { fire: 0, ash: 0, bowl: { full: true, cold: true } });
          shade(k, 0.35, [door, xoLight(400)]);
        });
        quote(k, 'Không ai ăn.', 'c');
      },
    },

    // ===== CHƯƠNG 7 =====
    {
      chapter: 'Điều tôi vẫn chưa hiểu',
      say: '{a}Bà sống thêm chín năm, đi được, dù phải chống gậy. Bà không bao giờ để bát cơm vào góc bếp nữa. {b}Nhưng những đêm mất ngủ, tôi vẫn nghe bà hát rất khẽ: bống bống bang bang. {c}Năm hai nghìn không trăm lẽ bốn, bà mất. {d}Trước khi đi, bà chỉ dặn tôi một câu: đừng kể với mẹ.',
      sfx: [['gong', 'c', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { house(k, { time: 'dusk' }); k.char(1100, 900, 360, { ...BA, face: 'calm', prop: 'staff', lean: 0.08 }); k.vignette(0.45); }
        else if (k.t < k.cue('c')) { room(k); k.char(380, G - 140, 300, { ...BA, face: 'calm', talk: 0.2 }); shade(k, 0.7, [ROOM.lamp, ROOM.moon]); quote(k, '♪ Bống bống bang bang…', 'b', { color: AMBER }); }
        else {
          black(k);
          k.prop('incense', 960, 700, 260);
          shade(k, 0.6, [{ x: 960, y: 640, r: 600, warm: 0.6 }]);
          tag(k, '2004', 'c');
          quote(k, '"Đừng kể với mẹ."', 'd');
        }
        chapter(k, 7, 'Điều tôi vẫn chưa hiểu');
      },
    },
    {
      say: '{a}Tôi giữ lời rất lâu. Rồi năm ngoái, mẹ tôi ốm nặng. {b}Một đêm trong bệnh viện, mẹ lấy chiếc vòng MINH ra khỏi hộp gỗ, xoay xoay trong tay, rồi kể, như kể một chuyện vu vơ. {c}Mẹ bảo, đêm sinh tôi, mẹ lịm đi. Khi tỉnh dậy, bà ngoại bế tôi đưa cho mẹ. Bà khóc rất nhiều. Mẹ hỏi sao bà khóc, bà bảo: tại mừng quá. {d}Mẹ chưa bao giờ thấy bà khóc như thế, mẹ nói. Cả đời bà, chỉ có một lần ấy. {e}Tôi đã không kể với mẹ. Đến bây giờ, tôi vẫn chưa kể.',
      draw(k) {
        hospital(k);
        lie(k, 1600, G - 210, 380, { ...ME_GIA, face: k.t > k.cue('d') ? 'sad' : 'calm', talk: k.t > k.cue('c') && k.t < k.cue('e') ? 0.25 : 0 });
        k.char(700, G, 520, { ...MINH_LON, face: k.t > k.cue('e') ? 'sad' : 'calm', flip: false });
        if (k.t > k.cue('b')) anklet(k, 1400, G - 260, 34, '', {});
        shade(k, 0.55, [{ x: 1200, y: 600, r: 800 }]);
        tag(k, 'NĂM NGOÁI', 'a');
        quote(k, '"Tại mừng quá."', 'c', { until: 'd' });
        quote(k, 'Cả đời bà, chỉ có một lần ấy.', 'd', { until: 'e' });
      },
    },
    {
      say: '{a}Sau này, tôi đọc ở đâu đó rằng trẻ con hay tưởng tượng ra một người bạn vô hình, nhất là những đứa trẻ cô đơn. Có thể lắm. Năm ấy tôi mười hai tuổi, ở một mình với bà giữa hai quả đồi chè. {b}Nhưng người bạn tưởng tượng thì không biết cành vải nào sắp gãy. {c}Không biết bà tôi ngã ở giếng lúc hai giờ sáng. {d}Và không thể biết về một đứa trẻ mà chính tôi cũng không biết từng tồn tại.',
      draw(k) {
        study(k);
        k.char(500, 1000, 560, { ...MINH_LON, face: 'blank', pose: 'think' });
        shade(k, 0.5, [{ x: 640, y: 500, r: 700, warm: 0.5 }]);
        memo(k, 760, 140, k.at('b', 0.8), () => house(k, { time: 'day', branch: 'broken' }));
        memo(k, 1300, 140, k.at('c', 0.8), () => { house(k, { time: 'night' }); shade(k, 0.4, [moon]); });
        memo(k, 1030, 470, k.at('d', 0.8), () => { black(k); anklet(k, 960, 540, 300, 'ÚT', { tarnish: 1, size: 90 }); });
      },
    },
    {
      say: '{a}Nhà bà giờ đã bán cho người khác. Gian bếp rạ đã phá đi, xây lại lát gạch men trắng. Bụi tre cuối vườn vẫn còn. {b}Tháng trước, tôi về xóm Bãi, đứng ở cổng rất lâu. {c}Lúc tôi quay đi, trong gian bếp mới của nhà người ta, có tiếng một đứa trẻ đang hát, rất khẽ: {d}Bống bống bang bang. {e}Có thể là con nhà chủ mới. Tôi không quay lại để xem.',
      sfx: [['wind', 'b', 0.3]],
      draw(k) {
        house(k, { time: 'dusk', lit: k.t > k.cue('c') });
        k.char(k.t > k.cue('c') ? 300 : 420, 1000, 520, { ...MINH_LON, face: 'sad', flip: k.t > k.cue('c'), walk: k.t > k.cue('c') && k.t < k.cue('e'), walkSpeed: 0.4 });
        shade(k, 0.45, [{ x: 935, y: 660, r: k.t > k.cue('c') ? 380 : 0, warm: 0.8 }, { x: 960, y: 200, r: 1300 }]);
        tag(k, 'THÁNG TRƯỚC', 'b');
        quote(k, '♪ Bống bống bang bang…', 'd', { color: COLD });
      },
    },
    {
      say: '{a}Ở nhà bà ngoại tôi, từng có một góc bếp không ai được quét. Tôi đã quét nó. {b}Và đến giờ, tôi vẫn không biết, đêm ấy, mình đã tiễn em đi, {c}hay chỉ đuổi em ra khỏi nhà.',
      tail: 2.5,
      sfx: [['heartbeat', 'c', 0.35]],
      draw(k) {
        zoom(k, 1540, 820, 1 + 0.8 * (k.t / k.d), () => {
          kitchen(k, { fire: 0, ash: 0, bowl: false });
          shade(k, 0.9, [xoLight(260)]);
        });
        quote(k, 'Tiễn em đi, hay đuổi em ra khỏi nhà?', 'c', { color: PAPER, size: 54 });
      },
    },

    // ===== CUỐI =====
    nextScene({
      say: '{next}Tập sau: ở làng chài của ông nội tôi, người ta tin mỗi năm sông lấy đi đúng một người. Năm ấy, đến ngày rằm tháng Bảy, người được chọn là bố tôi.',
      title: 'Ma Da | Mỗi Năm Sông Lấy Đi Đúng Một Người',
      hook: 'Năm ấy, người được chọn là bố tôi.',
      art(k) {
        const { ctx } = k;
        const g = ctx.createLinearGradient(0, 200, 0, 800); g.addColorStop(0, '#0b1222'); g.addColorStop(1, '#1d2a3e');
        ctx.fillStyle = g; ctx.fillRect(400, 200, 1120, 600);
        ctx.fillStyle = '#efe8cf'; ctx.beginPath(); ctx.arc(1300, 300, 46, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0e1828'; ctx.fillRect(400, 560, 1120, 240);
        for (let i = 0; i < 6; i++) { ctx.fillStyle = 'rgba(239,232,207,0.25)'; ctx.fillRect(1240 + Math.sin((k.gt ?? 0) * 2 + i) * 20, 580 + i * 26, 120 - i * 14, 4); }
        k.prop('boat', 800, 580, 260);
        k.vignette(0.5);
      },
    }),
    subScene({
      say: '{q}Nếu là bạn, bạn có quét góc bếp ấy không? Hãy để lại câu trả lời của bạn. {sub}Và nếu muốn nghe tiếp những chuyện chưa có lời giải, hãy đăng ký Nhân Gian Chưa Kể.',
      question: 'Nếu là bạn, bạn có quét góc bếp ấy không?',
      art(k) { bowl(k, 960, 980, 1.2); },
    }),
  ],
};
