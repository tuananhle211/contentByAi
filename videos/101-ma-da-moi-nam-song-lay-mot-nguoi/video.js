// Nhân Gian Chưa Kể — tập 2: Ma Da | Mỗi Năm Sông Lấy Đi Đúng Một Người. Kịch bản bản 2 (13/11): kich-ban.md.
// Bản 2 theo góp ý: MỘT giọng người kể, kể liền mạch có nhân quả như tập 1, không nhá cảnh, không thẻ đếm ngược.
// Tín ngưỡng: ma da (hồn người chết đuối kéo người thế chỗ), không thưa khi dưới nước gọi tên, hình nhân thế mạng.
// "Luật làng không cứu người đêm rằm" là hư cấu. Truyện hư cấu. Không tả xác, không vẽ "con ma".
import * as thumbs from '/videos/101-ma-da-moi-nam-song-lay-mot-nguoi/thumbs.js';
import { PAPER, AMBER, COLD, shade, cold, tag, quote, chapter, oil, nextScene, subScene } from '/channel/nhan-gian.js';
import {
  THANG, BO, ME, ONG, NA, TEO, CUU, HIEN, THONG, LUA, CA, DAN, MOON,
  riverWide, torchCrowd, wader, boat, paddle, strawman, raft, doll, paleHand,
  pier, PIER, underPier, sanRoom, SAN, dinh, board, market, hill, HILL, hut, HUT, underwater,
} from '/channel/nhan-gian-song.js';

const moon = { x: MOON.x, y: MOON.y, r: 1200 };
const zoom = (k, cx, cy, s, fn) => k.group({ x: cx, y: cy, s }, () => k.group({ x: -cx, y: -cy }, fn));
const lie = (k, x, y, h, o) => k.group({ x, y, r: -Math.PI / 2 }, () => k.char(0, 0, h, o));
const black = (k) => { k.ctx.fillStyle = '#05060a'; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); };
const after = (k, c, off = 0) => k.t > k.cue(c, off);
const ROWS = [['1945', 'Anh Tý · đi lưới đêm'], ['1968', 'Chị Hến · giặt áo'], ['1978', 'Ông Cò · say rượu'], ['1991', 'Lụa · 17 tuổi']];
const VIL = ['#3a4a5a', '#5a4a3a', '#4a5a4a', '#5a3a3a', '#3a3a4a', '#4a4a3a'];
function ram(k, o = {}) {
  riverWide(k, { time: 'night' });
  const L = torchCrowd(k, 60, 1100, 900, 11, { h: 300 });
  if (o.bo !== false) wader(k, 1350, 640, 300, { ...BO, face: 'sad' }, o.sink ?? 0.5);
  if (o.me) k.char(300, 990, 420, { ...ME, face: 'cry', tears: 1, pose: 'shout' });
  if (o.ong) k.char(520, 990, 300, { ...ONG, face: 'sad', pose: 'hold' });
  if (o.na) k.char(660, 990, 260, { ...NA, face: 'shout', pose: 'shout' });
  shade(k, 0.72, [moon, ...L, { x: 1350, y: 560, r: 260 }]);
}
function memo(k, x, y, c, fn) {
  const p = k.at(c, 0.6); if (p <= 0) return;
  const { ctx } = k; ctx.save(); ctx.globalAlpha = p; ctx.beginPath(); ctx.rect(x, y, 440, 248); ctx.clip();
  k.group({ x, y, s: 440 / 1920 }, fn); ctx.restore();
  ctx.save(); ctx.globalAlpha = p; ctx.strokeStyle = 'rgba(239,228,204,0.7)'; ctx.lineWidth = 3; ctx.strokeRect(x, y, 440, 248); ctx.restore();
}

export default {
  meta: {
    title: 'Ma Da | Mỗi Năm Sông Lấy Đi Đúng Một Người',
    description: `Làng chài của tôi tin rằng mỗi năm, sông Cái lấy đi đúng một người. Rằm tháng Bảy năm 1992, người được chọn là bố tôi: bảy đêm trước rằm, dưới gầm bến có tiếng con gái gọi "Sáu ơi".
Giấu bố lên đồi, nước vẫn tìm đến. Thả người rơm thế mạng, sáng ra nó đứng ở cửa nhà tôi, tay cầm cái mái chèo bố đánh mất từ năm trước.

Truyện ma da kể bằng hoạt hình: một làng chài, một luật làng ác nghiệt, và một bí mật cả làng giữ kín suốt một năm.`,
    footer: `📖 Truyện hư cấu dựa trên tín ngưỡng dân gian về ma da (hồn người chết đuối) và tục hình nhân thế mạng. Tên người, tên làng và tình tiết đều hư cấu.
🛟 Thấy người đuối nước: hô hoạn, gọi 112/114, ném phao hoặc vật nổi; chỉ xuống nước cứu nếu bạn biết cách cứu đuối.
🕯️ Nhân Gian Chưa Kể: những chuyện người xưa truyền tai nhau, mà chưa ai giải thích được.`,
    links: [['▶ Tập trước: Ma Xó', '100-ma-xo-goc-bep-nha-ba-ngoai'], ['🔔 Đăng ký', 'https://www.youtube.com/@nhangianchuake?sub_confirmation=1']],
    tags: ['ma da', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'truyện ma làng quê', 'hình nhân thế mạng', 'rằm tháng bảy', 'hoạt hình kinh dị', 'chuyện tâm linh có thật', 'nhân gian chưa kể'],
    hashtags: ['truyenma', 'mada', 'tamlinh'],
    gpu: true, // vẽ canvas bằng GPU (Metal) cho nhanh — người dùng yêu cầu 14/11
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 0.92,
    lead: 0.5, tail: 1.0, pause: 0.4,
    transition: 'fade', sfxTransitions: false, camera: 0.03, scribble: false,
    sfxVolume: 0.5, paper: '#05060a', privacy: 'private',
  },
  thumbnail: thumbs.b,

  scenes: [
    {
      chapter: 'Mở đầu',
      say: '{a}Đêm rằm tháng Bảy năm chín mươi hai, tôi đứng trên bờ sông, nhìn bố tôi lội xuống nước. {b}Sau lưng tôi, cả làng đứng thành một hàng dài, tay cầm đuốc. Không một ai bước xuống. {c}Từ dưới mặt sông đen, có tiếng một người con gái gọi tên bố tôi. {d}Cả đời, ông nội dạy tôi một điều: nghe dưới nước gọi tên mình, thì không bao giờ được thưa. {e}Bố tôi thưa.',
      sfx: [['wind', 0, 0.3], ['heartbeat', 'c', 0.4], ['stinger', 'e', 0.45]],
      draw(k) {
        zoom(k, 1350, 620, 1.4 - 0.4 * k.at('b', 4, 'inOut'), () => ram(k, { sink: 0.35 + 0.2 * k.at('a', 6) }));
        tag(k, 'RẰM THÁNG BẢY · 1992', 'a');
        quote(k, '"Sáu ơi…"', 'c', { color: COLD, until: 'd' });
      },
    },
    {
      say: '{a}Người làng tôi tin rằng, mỗi năm, sông lấy đi đúng một người. Năm ấy, người được chọn là bố tôi. {b}Để kể vì sao bố tôi thưa, tôi phải kể lại từ bảy đêm trước. Cái đêm tôi nghe thấy tiếng gọi ấy lần đầu tiên.',
      draw(k) {
        riverWide(k, { time: after(k, 'b') ? 'dusk' : 'night', sand: false });
        shade(k, after(k, 'b') ? 0.4 : 0.6, [moon, { x: 960, y: 300, r: 1300 }]);
        quote(k, 'Mỗi năm, sông lấy đi đúng một người.', 'a', { color: AMBER, until: 'b' });
      },
    },
    {
      say: '{a}Đây là Nhân Gian Chưa Kể. Nếu bạn muốn nghe tiếp những chuyện chưa có lời giải, hãy bấm đăng ký. {c}Còn bây giờ, xin bạn tắt bớt đèn.',
      sfx: [['click', 'c', 0.5]],
      draw(k) {
        black(k); oil(k, 960, 820, 1.6);
        const off = k.at('c', 1.2);
        shade(k, 0.75 + 0.2 * off, [{ x: 960, y: 650, r: 700 - 300 * off, flicker: 1, warm: 1 }]);
        k.text('NHÂN GIAN CHƯA KỂ', k.W / 2, 230, { size: 92, font: 'title', color: PAPER, fx: 'fade', p: k.at('a', 1) });
        k.text('Ma Da · Mỗi Năm Sông Lấy Đi Đúng Một Người', k.W / 2, 330, { size: 46, color: AMBER, fx: 'fade', p: k.at('a', 1.5) });
      },
    },
    {
      chapter: 'Làng chài bên sông Cái',
      say: '{a}Làng tôi là một làng chài nhỏ bên sông Cái. Nhà nào cũng là nhà sàn, chân cột cắm xuống nước, dưới gầm buộc một chiếc thuyền. Người làng tôi sống nhờ sông, và cũng sợ sông hơn sợ bất cứ thứ gì. {b}Bố tôi tên Sáu, đánh cá giỏi nhất bến. Thuyền nhà tôi là chiếc duy nhất sơn màu xanh, vì bố bảo màu xanh thì cá không sợ. {c}Trên cán mái chèo, bố tự tay khắc một con cá nhỏ.',
      draw(k) {
        if (k.t < k.cue('c')) {
          pier(k, { time: 'dusk', lit: true });
          if (after(k, 'b')) k.char(820, PIER.y - 20, 440, { ...BO, face: 'happy', pose: 'hold' });
          shade(k, 0.35, [{ x: 960, y: 300, r: 1400 }, { x: 700, y: 760, r: 300 }]);
          tag(k, 'LÀNG CHÀI · 1992', 'a');
        } else { black(k); paddle(k, 960, 560, 2.8, -0.12); shade(k, 0.4, [{ x: 760, y: 560, r: 700, warm: 0.4 }]); }
        chapter(k, 1, 'Làng chài bên sông Cái');
      },
    },
    {
      say: '{a}Ông nội tôi, ông Lành, đánh cá sáu mươi năm. Ông dạy cháu chắt ba điều, trước cả khi dạy bơi. {r1}Một: không tắm sông lúc trời tối. {r2}Hai: nghe dưới nước gọi tên mình, thì không được thưa. {r3}Ba: đêm rằm tháng Bảy, không ai được xuống nước, kể cả để cứu người. {b}Điều thứ ba, ông bao giờ cũng nói rất nhỏ, như sợ sông nghe thấy. {c}Hồi ấy tôi không hiểu tại sao lại có người không được cứu. Phải đến mùa hè năm mười ba tuổi, tôi mới hiểu.',
      sfx: [['click', 'r1', 0.25], ['click', 'r2', 0.25], ['click', 'r3', 0.25]],
      draw(k) {
        sanRoom(k, { day: false });
        k.char(760, SAN.y, 470, { ...ONG, face: after(k, 'r3') ? 'sad' : 'calm', pose: after(k, 'r1') ? 'point' : 'stand' });
        k.char(1020, SAN.y, 330, { ...THANG, face: after(k, 'c') ? 'blank' : 'calm', flip: true });
        k.char(1220, SAN.y, 270, { ...NA, face: 'calm', flip: true });
        shade(k, 0.55, [SAN.lamp, { x: 900, y: 600, r: 600, warm: 0.5 }]);
        const items = [['1. Không tắm sông lúc trời tối.', 'r1'], ['2. Nghe dưới nước gọi tên, không thưa.', 'r2'], ['3. Rằm tháng Bảy, không xuống nước, kể cả để cứu người.', 'r3']];
        items.forEach(([t, c], i) => k.text(t, 110, 170 + i * 76, { size: 44, font: 'title', align: 'left', color: i === 2 ? AMBER : PAPER, fx: 'fade', p: k.at(c, 0.6), outline: '#000', outlineWidth: 6 }));
      },
    },
    {
      say: '{a}Vì năm trước đó, người sông lấy là Lụa. {b}Lụa mười bảy tuổi, con gái bà Hiền xóm dưới, hát hay nhất bến. Chiều nào chị cũng ra bến giặt áo, hay cõng bé Na, em gái tôi, theo cùng. Chị dạy Na hát, dạy Na thả thuyền giấy. Na quý chị hơn cả quý tôi. {c}Đêm rằm tháng Bảy năm ấy, thuyền Lụa lật giữa sông. Sáng ra, ông Cửu, người vớt xác của làng, vớt được chị ở khúc sông cong.',
      draw(k) {
        if (k.t < k.cue('c')) {
          pier(k, { time: 'dusk', stilt: false, boats: false });
          k.char(700, PIER.y - 20, 440, { ...LUA, face: 'happy', pose: 'hold', talk: after(k, 'b') ? 0.2 : 0 });
          k.char(880, PIER.y - 20, 260, { ...NA, face: 'laugh' });
          cold(k, 0.55); tag(k, 'NĂM NGOÁI', 'a');
          return;
        }
        riverWide(k, { time: 'night', sand: false });
        boat(k, 960, 640, 0.9, { capsized: true });
        shade(k, 0.7, [moon]); cold(k, 0.8);
      },
    },
    {
      say: '{a}Từ đó, bà Hiền đêm nào cũng ra ngồi ở đầu bến, nhìn xuống nước đến sáng. Người làng gọi bà là bà điên. {b}Còn bé Na, sau đêm ấy, sốt li bì ba ngày. Khỏi sốt, Na không bao giờ nhắc đến chị Lụa nữa. Và nhất định không chịu bước lên thuyền. {c}Cả nhà tôi nghĩ Na còn nhỏ, sợ sông vì thấy người chết đuối. Không ai hỏi thêm.',
      draw(k) {
        if (k.t < k.cue('b')) { pier(k, { time: 'night', boats: false }); k.char(560, PIER.y - 20, 300, { ...HIEN, face: 'blank', gloom: 0.6 }); shade(k, 0.7, [moon, { x: 560, y: 500, r: 300 }]); return; }
        sanRoom(k, {});
        if (k.t < k.cue('c')) lie(k, 640, SAN.y - 20, 260, { ...NA, face: 'sleep' });
        else k.char(560, SAN.y, 280, { ...NA, face: 'blank', look: 1 });
        k.char(860, SAN.y, 420, { ...ME, face: 'sad', pose: 'hold' });
        shade(k, 0.62, [SAN.lamp]);
      },
    },
    {
      chapter: 'Tiếng gọi dưới gầm bến',
      say: '{a}Bảy đêm trước rằm, tôi và thằng Tèo đi soi ếch dọc bờ bến. Tèo là bạn thân nhất của tôi, cũng là đứa nhát nhất xóm, đi đâu cũng níu vạt áo tôi. {b}Đến gần bến cá, Tèo bỗng dừng phắt lại, hỏi tôi có nghe thấy gì không.',
      sfx: [['owl', 1, 0.25]],
      draw(k) {
        pier(k, { time: 'night' });
        const x = k.lerp(200, 700, k.at('a', 6, 'linear'));
        k.char(x, PIER.y - 20, 330, { ...THANG, face: 'calm', walk: !after(k, 'b') });
        k.char(x - 150, PIER.y - 20, 300, { ...TEO, face: after(k, 'b') ? 'shock' : 'sad', walk: !after(k, 'b') });
        shade(k, 0.78, [moon, { x: x + 200, y: PIER.y + 40, r: 280 }]);
        tag(k, 'BẢY ĐÊM TRƯỚC RẰM', 'a');
        chapter(k, 2, 'Tiếng gọi dưới gầm bến');
      },
    },
    {
      say: '{a}Dưới gầm bến, chỗ những cây cột gỗ cắm xuống nước, có tiếng một người con gái. Rất khẽ, kéo dài, như gọi người ở xa về ăn cơm: {b}Sáu ơi. Sáu ơi. {c}Làng tôi chỉ có một người tên Sáu. {d}Tèo vứt cả đèn pin, chạy một mạch. Tôi đứng lại thêm một lúc, rồi cũng chạy. Suốt đêm ấy, tôi không dám kể với bố.',
      sfx: [['drip', 'a', 0.35], ['heartbeat', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('d')) {
          zoom(k, 960, 600, 1 + 0.3 * k.at('a', 8, 'inOut'), () => { underPier(k); shade(k, 0.65, [{ x: 960 + Math.sin(k.t * 5) * 30, y: 700, r: 360 }]); });
          quote(k, '"Sáu ơi… Sáu ơi…"', 'b', { color: COLD });
          return;
        }
        pier(k, { time: 'night' });
        k.char(k.lerp(500, -200, k.at('d', 2, 'in')), PIER.y - 20, 300, { ...TEO, face: 'shock', walk: true, walkSpeed: 2 });
        k.char(after(k, 'd', 3) ? k.lerp(700, -200, k.at(k.cue('d', 3), 2, 'in')) : 700, PIER.y - 20, 330, { ...THANG, face: 'shock', walk: after(k, 'd', 3), walkSpeed: 2 });
        shade(k, 0.78, [moon]);
      },
    },
    {
      say: '{a}Nhưng tôi không cần kể. Sáng hôm sau, cả chợ cá đã biết. Bà bán cá nghe thấy, hai người đi lưới đêm cũng nghe thấy. Cùng một giọng, cùng một cái tên. {b}Tôi về nhà, định kể cho mẹ thì bé Na đã nói trước. Na vừa chải tóc con búp bê vải, vừa nói, thản nhiên như kể chuyện ăn cơm: {c}Đêm qua có chị gọi bố ở dưới gầm nhà mình đấy. Chị gọi lâu lắm. {d}Cái bát trên tay mẹ rơi xuống sàn, vỡ làm đôi.',
      sfx: [['bonk', 'd', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) {
          market(k);
          k.char(420, 880, 420, { ...DAN('#8a5a4a', { body: 'woman', hair: 'bun' }), face: 'shock', talk: 0.3 });
          k.char(800, 880, 470, { ...DAN('#3a4a5a'), face: 'blank', flip: true }); k.char(1000, 880, 470, { ...DAN('#4a3a2a'), face: 'blank', look: 1 });
          k.char(1550, 880, 330, { ...THANG, face: 'blank', flip: true });
          k.vignette(0.4);
          return;
        }
        sanRoom(k, { day: true });
        k.char(520, SAN.y, 280, { ...NA, face: 'calm', pose: 'hold', talk: after(k, 'c') && !after(k, 'd') ? 0.3 : 0 });
        doll(k, 560, SAN.y - 120, 1.1);
        k.char(900, SAN.y, 440, { ...ME, face: after(k, 'd') ? 'shock' : 'calm', pose: after(k, 'd') ? 'shrug' : 'hold' });
        k.char(1150, SAN.y, 330, { ...THANG, face: after(k, 'c') ? 'shock' : 'calm', flip: true });
        if (after(k, 'd')) { const { ctx } = k; ctx.fillStyle = '#e9e4d8'; ctx.beginPath(); ctx.ellipse(880, SAN.y - 4, 30, 8, 0.2, 0, Math.PI * 2); ctx.ellipse(950, SAN.y - 2, 26, 7, -0.3, 0, Math.PI * 2); ctx.fill(); }
        shade(k, 0.4, [SAN.door, SAN.lamp]);
        quote(k, '"Đêm qua có chị gọi bố ở dưới gầm nhà mình đấy."', 'c', { color: COLD });
      },
    },
    {
      say: '{a}Chiều hôm ấy, thầy Thông, thầy cúng của làng, gọi mọi người ra sân đình. Thầy chỉ nói một câu: {b}Sông chọn rồi. Là anh Sáu. {c}Mọi người quay sang nhìn bố tôi. Tôi chờ bố cãi lại, chờ bố cười, chờ bố bảo đó là chuyện nhảm. {d}Bố chỉ cúi đầu, như một người đã biết trước từ lâu. {e}Đó là lần đầu tiên tôi tự hỏi: bố tôi biết điều gì mà tôi không biết?',
      sfx: [['gong', 'b', 0.3]],
      draw(k) {
        dinh(k, { time: 'dusk' });
        k.char(960, 820, 480, { ...THONG, face: 'cold', pose: after(k, 'b') ? 'point' : 'stand', talk: after(k, 'b') && !after(k, 'c') ? 0.3 : 0 });
        for (let i = 0; i < 6; i++) k.char(200 + i * 110 + (i > 2 ? 900 : 0), 1000, 380, { ...DAN(VIL[i]), face: 'blank', flip: i > 2, look: after(k, 'c') ? 1 : 0 });
        k.char(1300, 960, 470, { ...BO, face: after(k, 'd') ? 'sad' : 'blank', tilt: after(k, 'd') ? 0.25 : 0 });
        shade(k, 0.45, [{ x: 960, y: 400, r: 1100 }]);
        quote(k, '"Sông chọn rồi. Là anh Sáu."', 'b', { until: 'c' });
        quote(k, 'Bố tôi biết điều gì mà tôi không biết?', 'e', { color: AMBER });
      },
    },
    {
      say: '{a}Lúc mọi người về, tôi nán lại trong đình. Ở góc đình có một tấm bảng gỗ đen mà trẻ con không đứa nào dám nhìn lâu. Trên đó, người ta sơn trắng tên những người sông đã lấy, mỗi năm một dòng. {b}Anh Tý đi lưới đêm. Chị Hến giặt áo. Ông Cò say rượu. Và dòng gần nhất: Lụa, mười bảy tuổi. {c}Dưới tên Lụa, ai đó đã kẻ sẵn một vạch trắng cho năm chín mươi hai. Để trống. Chờ.',
      sfx: [['creak', 'a', 0.3], ['stinger', 'c', 0.35]],
      draw(k) {
        black(k);
        const z = after(k, 'c') ? 1 + 0.6 * k.at('c', 2.5, 'inOut') : 1;
        zoom(k, 960, after(k, 'c') ? 760 : 540, z, () => board(k, 960, 540, 1, ROWS, { p: after(k, 'b') ? 1 : 0.15 }));
        shade(k, 0.45, [{ x: 960, y: 540, r: 900, warm: 0.3 }]);
      },
    },
    {
      chapter: 'Lên đồi',
      say: '{a}Tối ấy, mẹ mời thầy Thông về nhà, quỳ xuống xin thầy một cách. {b}Thầy bảo có hai cách. Một là đưa người đi thật xa khỏi nước. Hai là làm người thế mạng. Rồi thầy ngừng lại, nói thêm rằng còn một cách thứ ba, nhưng không ai muốn nghe. {c}Mẹ hỏi cách thứ ba là gì. Thầy nhìn qua vai mẹ, về phía bố tôi đang đứng ngoài hiên, nói khẽ: {d}Người nợ thì tự đi trả. {e}Tôi không hiểu bố nợ ai. Mẹ thì không hỏi. Mẹ chỉ chọn cách thứ nhất.',
      draw(k) {
        sanRoom(k, {});
        k.char(1000, SAN.y, 480, { ...THONG, face: 'cold', talk: after(k, 'b') && !after(k, 'e') ? 0.25 : 0, look: after(k, 'c') ? 1 : -1 });
        k.group({ x: 700, y: SAN.y }, () => k.char(0, 0, 330, { ...ME, face: 'cry', tears: 0.7, pose: 'hold' }));
        k.char(450, SAN.y, 460, { ...ONG, face: 'sad' });
        k.char(1700, SAN.y, 440, { ...BO, face: 'blank', flip: true, alpha: after(k, 'c') ? 1 : 0.6 });
        shade(k, 0.62, [SAN.lamp, { x: 900, y: 600, r: 500, warm: 0.6, flicker: 1 }, { x: 1700, y: 500, r: 300 }]);
        quote(k, '"Người nợ thì tự đi trả."', 'd', { color: AMBER, until: 'e' });
        chapter(k, 3, 'Lên đồi');
      },
    },
    {
      say: '{a}Sáng sớm hôm sau, bác Cả trên đồi xuống đón bố. Nhà bác cách sông mười cây số, trên một quả đồi đất đỏ, giếng phải đào mấy chục mét mới có nước. Không sông, không ao, không ai gọi tên bố. {b}Bố không muốn đi. Bố bảo trốn được năm nay thì sang năm sao. Mẹ khóc, bảo sang năm thì sang năm tính, năm nay anh phải sống. {c}Lúc xe đạp đi qua bến, bố ngoái lại nhìn sông rất lâu. Bà Hiền đang ngồi ở đầu bến. Hai người nhìn nhau. {d}Tôi không hiểu cái nhìn ấy. Phải mấy ngày sau, tôi mới hiểu.',
      draw(k) {
        if (k.t < k.cue('b')) { hill(k, { time: 'day' }); const { ctx } = k; ctx.strokeStyle = 'rgba(239,228,204,0.9)'; ctx.lineWidth = 6; ctx.setLineDash([18, 14]); ctx.beginPath(); ctx.moveTo(1800, 1000); ctx.quadraticCurveTo(1300, 700, 440, 600); ctx.stroke(); ctx.setLineDash([]); k.text('10 cây số', 1250, 760, { size: 56, font: 'title', color: PAPER, outline: '#000', outlineWidth: 8, fx: 'fade', p: k.at('a', 1) }); return; }
        if (k.t < k.cue('c')) { sanRoom(k, { day: true }); k.char(800, SAN.y, 470, { ...BO, face: 'angry', flip: true }); k.char(560, SAN.y, 420, { ...ME, face: 'cry', tears: 0.7 }); k.char(1450, SAN.y, 450, { ...CA, face: 'sad' }); shade(k, 0.4, [SAN.door, SAN.lamp]); return; }
        pier(k, { time: 'dawn', boats: true });
        const x = k.lerp(200, 1100, k.at('c', 6, 'linear'));
        k.char(x, PIER.y - 20, 440, { ...CA, face: 'calm', walk: true, walkSpeed: 0.5 });
        k.char(x - 60, PIER.y - 30, 420, { ...BO, face: 'sad', look: -1, flip: true });
        k.char(300, PIER.y - 20, 300, { ...HIEN, face: 'blank', look: 1 });
        shade(k, 0.35, [{ x: 960, y: 300, r: 1400 }]);
      },
    },
    {
      say: '{a}Bố đi được đúng một đêm. {b}Đêm ấy trên đồi mưa to. Sáng ra, bác Cả thấy bố nằm úp mặt xuống cái vũng trâu đằm sau nhà, nước sâu chưa đến một gang tay. Bác lôi bố lên thì mặt bố đã tím tái, ho ra cả bùn. {c}Bố kể, bố ra sau nhà rửa chân thì trượt ngã, rồi không sao ngóc đầu lên được. Như có một bàn tay ghì gáy bố xuống. Một bàn tay nhỏ, như tay con gái. {d}Trên gáy bố, có một vệt đỏ hằn năm đường.',
      sfx: [['thunder', 'b', 0.3], ['heartbeat', 'c', 0.35]],
      draw(k) {
        if (k.t < k.cue('c')) {
          hill(k, { time: 'night', rain: true });
          if (after(k, 'b', 2)) lie(k, HILL.pool.x + 140, HILL.pool.y - 10, 400, { ...BO, face: 'sleep' });
          shade(k, 0.6, [{ x: HILL.pool.x, y: HILL.pool.y, r: 520 }]);
          k.flash(k.cue('b', 0.4), 0.4);
          return;
        }
        if (k.t < k.cue('d')) {
          hill(k, { time: 'dawn' });
          k.char(HILL.pool.x - 250, 940, 470, { ...BO, face: 'shock', pose: 'hold', talk: 0.2 });
          k.char(HILL.pool.x - 450, 940, 450, { ...CA, face: 'sad', pose: 'hold' });
          paleHand(k, HILL.pool.x + 60, HILL.pool.y - 10, 1.4, 0.4, 0.3 * k.at('c', 2));
          shade(k, 0.45, [{ x: 960, y: 300, r: 1300 }]);
          return;
        }
        black(k);
        const { ctx } = k;
        ctx.fillStyle = '#c99868'; ctx.beginPath(); ctx.ellipse(960, 560, 360, 260, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#1d1712'; ctx.beginPath(); ctx.ellipse(960, 330, 380, 140, 0, 0, Math.PI); ctx.fill();
        ctx.strokeStyle = `rgba(190,40,40,${0.7 * k.at('d', 1)})`; ctx.lineWidth = 16; ctx.lineCap = 'round';
        for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(800 + i * 70, 470 + Math.abs(i - 2) * 16); ctx.lineTo(810 + i * 66, 660 - Math.abs(i - 2) * 22); ctx.stroke(); }
        shade(k, 0.4, [{ x: 960, y: 560, r: 700 }]);
      },
    },
    {
      say: '{a}Bác Cả đưa bố về làng ngay chiều hôm ấy. Ông nội đứng sau lưng bố rất lâu, rồi nói một câu mà tôi nhớ mãi: {b}Sông không cần mày ra sông. Nước ở đâu, nó ở đó. {c}Cũng chiều ấy, ông Cửu kể với mọi người rằng suốt đêm qua, ông thấy bà Hiền ngồi ở đầu bến, không rời một bước. {d}Tôi nghe, và không biết nên thấy nhẹ người hay thấy sợ hơn.',
      draw(k) {
        pier(k, { time: 'dusk', lit: true, boats: true });
        k.char(1400, 590, 420, { ...BO, face: 'blank', gloom: 0.6 });
        k.char(1620, 590, 440, { ...ONG, face: 'sad', flip: true, talk: after(k, 'b') && !after(k, 'c') ? 0.3 : 0 });
        if (after(k, 'c')) { k.char(500, PIER.y - 20, 440, { ...CUU, face: 'blank', talk: !after(k, 'd') ? 0.3 : 0 }); k.char(260, PIER.y - 20, 300, { ...HIEN, face: 'blank', alpha: 0.6 }); }
        shade(k, 0.45, [{ x: 1500, y: 400, r: 700 }, { x: 400, y: 500, r: 400 }]);
        quote(k, '"Nước ở đâu, nó ở đó."', 'b', { color: AMBER, until: 'c' });
      },
    },
    {
      say: '{a}Đêm ấy, tôi tỉnh dậy vì tiếng bé Na thì thầm. Na nằm sấp trong màn, ghé mặt xuống khe sàn, nói chuyện với khoảng tối bên dưới: {b}Chị lạnh à? Em cho chị mượn con búp bê này. {c}Tôi bế xốc Na lên. Dưới khe sàn chỉ có nước đen vỗ vào chân cột. Không có ai. {d}Sáng ra, con búp bê vải của Na biến mất. Na không khóc. Na bảo chị Lụa cầm rồi.',
      sfx: [['drip', 'c', 0.35], ['stinger', 'd', 0.35]],
      draw(k) {
        if (k.t < k.cue('d')) {
          zoom(k, 420, 820, 1.6, () => {
            sanRoom(k, {});
            if (k.t < k.cue('c')) { lie(k, 600, SAN.y - 30, 260, { ...NA, face: 'calm', talk: after(k, 'b') ? 0.25 : 0 }); doll(k, 330, SAN.y + 30, 0.8, { r: 1.2 }); }
            else k.char(440, SAN.y, 330, { ...THANG, face: 'shock', pose: 'hold' });
            shade(k, 0.75, [{ ...SAN.lamp, r: 380 }]);
          });
          quote(k, '"Chị lạnh à? Em cho chị mượn con búp bê này."', 'b', { color: COLD, until: 'c' });
          return;
        }
        sanRoom(k, { day: true });
        k.char(700, SAN.y, 280, { ...NA, face: 'calm' });
        k.char(950, SAN.y, 330, { ...THANG, face: 'shock', flip: true });
        shade(k, 0.4, [SAN.door, SAN.lamp]);
        quote(k, '"Chị Lụa cầm rồi."', 'd', { color: COLD });
      },
    },
    {
      chapter: 'Người thế mạng',
      say: '{a}Cách thứ nhất đã hỏng, mẹ quay sang cách thứ hai. {b}Thầy Thông bó rơm thành hình người, mặc cho nó cái áo nâu bố hay mặc đi lưới, đội cái nón của bố, dán lên ngực một tờ giấy ghi tên tuổi bố. {c}Người làng tôi tin, sông sẽ nhận người rơm thay cho người thật.',
      draw(k) {
        dinh(k, { time: 'night', dark: true });
        k.char(700, 900, 480, { ...THONG, face: 'calm', pose: 'hold' });
        strawman(k, 1100, 900, 440 * Math.max(0.05, k.at('b', 4, 'out')), {});
        const L = torchCrowd(k, 1400, 1850, 1000, 4, { h: 320 });
        shade(k, 0.7, [{ x: 950, y: 600, r: 600, warm: 0.8, flicker: 1 }, ...L]);
        chapter(k, 4, 'Người thế mạng');
      },
    },
    {
      say: '{a}Đêm ấy, cả làng ra bến. Người ta đặt người rơm lên một chiếc bè chuối, thắp nến, đẩy ra giữa dòng. Chiếc bè trôi xa dần, ngọn nến nhỏ như hạt đỗ, rồi tắt hẳn. {b}Bố đứng nhìn cho đến khi không còn thấy gì nữa. Bà Hiền cũng đứng đó. {c}Lần đầu tiên sau một năm, tôi thấy bà cười.',
      sfx: [['wind', 'a', 0.3]],
      draw(k) {
        riverWide(k, { time: 'night' });
        const p = k.at('a', k.cue('b') - k.cue('a'), 'linear'), s = 1 - 0.85 * p;
        const rx = k.lerp(900, 1500, p), ry = k.lerp(820, 560, p);
        strawman(k, rx, ry - 10 * s, 300 * s, {}); raft(k, rx, ry, s, p < 0.95 ? 1 : 0);
        const L = torchCrowd(k, 60, 700, 960, 7, { h: 300 });
        k.char(780, 990, 470, { ...BO, face: 'blank', look: 1 });
        k.char(220, 1000, 440, { ...HIEN, face: after(k, 'c') ? 'smug' : 'blank', look: 1 });
        shade(k, 0.7, [moon, ...L, { x: rx, y: ry - 40, r: 160 * s + 40, warm: 0.8 }, ...(after(k, 'c') ? [{ x: 220, y: 700, r: 260 }] : [])]);
      },
    },
    {
      say: '{a}Sáng hôm sau, tiếng mẹ hét làm cả xóm chạy sang. {b}Người rơm đứng dựa vào cửa nhà tôi. Ướt sũng, nước chảy ròng ròng xuống sàn. Tờ giấy trên ngực đã bị nước xoá trắng, không còn một chữ. {c}Sông đã trả nó về.',
      sfx: [['stinger', 'a', 0.4], ['drip', 'b', 0.4]],
      draw(k) {
        sanRoom(k, { day: true });
        const z = after(k, 'b', 2) ? 1 + 0.6 * k.at(k.cue('b', 2), 2, 'inOut') : 1;
        zoom(k, 1700, 560, z, () => {
          strawman(k, 1700, SAN.y, 460, { wet: true, blank: true });
          k.char(1250, SAN.y, 440, { ...ME, face: 'shock', pose: 'shout' });
          shade(k, 0.35, [SAN.door]);
        });
        quote(k, 'Sông đã trả nó về.', 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Và trong tay người rơm, có ai đó đã nhét vào một cái mái chèo. Mái chèo sơn xanh, trên cán khắc một con cá nhỏ. {b}Mái chèo của bố tôi. Cái mái chèo bố đã đánh mất, đúng vào đêm rằm tháng Bảy năm ngoái, cái đêm Lụa chết. {c}Bố lùi lại một bước, rồi ngồi sụp xuống sàn. {d}Tôi nhìn bố, rồi nhìn cái mái chèo, và lần đầu tiên tôi sợ một điều còn hơn cả sợ sông: tôi sợ biết sự thật. {e}Nếu là bạn, bạn có đi tìm sự thật ấy không?',
      sfx: [['stinger', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) {
          black(k);
          paddle(k, 960, 560, 3 * (1 + 0.08 * k.at('a', 8, 'linear')), -0.15);
          if (after(k, 'a', 2)) { const { ctx } = k; ctx.strokeStyle = AMBER; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(960 - 330, 560 + 50, 90, 50, -0.15, 0, Math.PI * 2 * k.at(k.cue('a', 2), 0.8)); ctx.stroke(); }
          shade(k, 0.45, [{ x: 960, y: 560, r: 900, warm: 0.4 }]);
          return;
        }
        sanRoom(k, { day: true });
        strawman(k, 1700, SAN.y, 460, { wet: true, blank: true, paddle: true });
        k.group({ x: 1200, y: SAN.y }, () => k.char(0, 0, 330, { ...BO, face: 'shock', pose: 'facepalm' }));
        k.char(900, SAN.y, 330, { ...THANG, face: after(k, 'd') ? 'sad' : 'shock', look: 1 });
        shade(k, 0.4, [SAN.door]);
        quote(k, 'Bạn có đi tìm sự thật ấy không?', 'e', { color: AMBER });
      },
    },
    {
      chapter: 'Người vớt xác',
      say: '{a}Tôi đã đi tìm. Cái mái chèo mất giữa sông, thì người vớt được nó chỉ có thể là người ngày nào cũng ở trên sông. Ông Cửu. {b}Ông Cửu vớt xác trên sông Cái đã ba mươi năm. Ông sống một mình trong túp lều trên bãi bồi, ngày nào cũng say. {c}Tôi đặt cái mái chèo xuống trước mặt ông. Ông nhìn nó rất lâu, rồi rót một chén rượu, hỏi tôi có thật muốn biết không.',
      draw(k) {
        hut(k);
        k.char(800, 900, 470, { ...CUU, face: after(k, 'c') ? 'blank' : 'calm', talk: after(k, 'c', 4) ? 0.25 : 0 });
        k.char(k.t < k.cue('b') ? k.lerp(1700, 1250, k.at('a', 3)) : 1250, 900, 330, { ...THANG, face: 'calm', flip: true, walk: k.t < k.cue('a', 3) });
        if (after(k, 'c')) paddle(k, 1020, 860, 0.8, 0.05);
        shade(k, 0.62, [HUT.lamp]);
        chapter(k, 5, 'Người vớt xác');
      },
    },
    {
      say: '{a}Ông kể, năm ngoái ông vớt Lụa lên, hai bàn tay chị nắm chặt đến mức ông phải gỡ từng ngón một. {b}Trong kẽ móng tay chị có vụn sơn. Sơn màu xanh. {c}Cả cái bến này, chỉ có một chiếc thuyền sơn xanh.',
      sfx: [['stinger', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('c')) {
          black(k);
          paleHand(k, 960, 600, 4, 0, 0.9);
          if (after(k, 'b')) { const { ctx } = k; ctx.fillStyle = '#3f7a6a'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(888 + i * 48, 360, 8, 5, 0, 0, Math.PI * 2); ctx.fill(); } }
          shade(k, 0.4, [{ x: 960, y: 560, r: 700 }]); cold(k, 0.6);
          return;
        }
        pier(k, { time: 'day', stilt: false });
        boat(k, 960, 760, 1.5, { color: '#3f7a6a' });
        k.vignette(0.4);
      },
    },
    {
      say: '{a}Đêm rằm năm ngoái, thuyền Lụa lật ngay cạnh thuyền bố tôi. Lụa bơi lại, bám vào mạn thuyền xanh. {b}Và luật làng thì ai cũng thuộc: đêm rằm tháng Bảy, không được cứu người. {c}Ông Cửu nói, giọng khàn đặc: Bố mày giữ đúng luật. Bố mày gỡ tay nó ra.',
      sfx: [['heartbeat', 'a', 0.4], ['stinger', 'c', 0.45]],
      draw(k) {
        riverWide(k, { time: 'night', sand: false });
        boat(k, 1150, 660, 1.2, { color: '#3f7a6a' });
        k.char(1180, 640, 380, { ...BO, face: after(k, 'c') ? 'cry' : 'shock', pose: 'hold' });
        k.char(1300, 650, 220, { ...NA, face: 'shock', alpha: 0.85 });
        boat(k, 600, 700, 0.9, { capsized: true });
        if (k.t < k.cue('c', 3)) paleHand(k, 960, 650, 1.2, 0.3, 0.85);
        const L = torchCrowd(k, 60, 600, 1060, 6, { h: 260 });
        shade(k, 0.72, [moon, ...L, { x: 1100, y: 600, r: 420 }]);
        cold(k, 0.75);
        quote(k, '"Bố mày gỡ tay nó ra."', 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Tôi hỏi ông, có ai nhìn thấy không. {b}Ông Cửu cười, một tiếng cười khô như vỏ hến. Cả làng đứng trên bờ, cầm đuốc. Cả làng nhìn thấy. Không ai nói gì, vì ai cũng giữ đúng luật. {c}Rồi ông nói nhỏ hẳn: đêm ấy ông cũng đứng đó. Ba mươi năm vớt người chết, ông chưa cứu được một người sống nào. Đêm ấy là lần duy nhất ông có thể.',
      draw(k) {
        if (after(k, 'b', 2) && k.t < k.cue('c')) { riverWide(k, { time: 'night' }); const L = torchCrowd(k, 60, 1860, 900, 16, { h: 320 }); shade(k, 0.8, L); cold(k, 0.7); quote(k, 'Cả làng nhìn thấy. Không ai nói gì.', 'b', { color: AMBER }); return; }
        zoom(k, 800, 650, 1.4, () => { hut(k); k.char(800, 900, 470, { ...CUU, face: after(k, 'c') ? 'cry' : 'smug', tears: after(k, 'c') ? 0.7 : 0, talk: after(k, 'b') ? 0.25 : 0 }); shade(k, 0.6, [HUT.lamp]); });
      },
    },
    {
      say: '{a}Tôi chạy một mạch về nhà. Mẹ đang vo gạo bên mép sàn. Tôi hỏi mẹ có biết không. {b}Tay mẹ dừng lại giữa rá gạo. Mẹ không trả lời, và thế là đủ. Đêm ấy mẹ cũng đứng trên bờ, như mọi người. {c}Mẹ nói, mắt không nhìn tôi: đêm ấy, bố với em đang ở giữa sông, mẹ chỉ nhìn thấy mỗi chiếc thuyền nhà mình. {d}Hoá ra, cả làng tôi đã giữ chung một bí mật. Chỉ có trẻ con là không biết.',
      draw(k) {
        sanRoom(k, { day: true });
        k.char(760, SAN.y, 440, { ...ME, face: after(k, 'b') ? 'sad' : 'calm', pose: 'hold', talk: after(k, 'c') && !after(k, 'd') ? 0.25 : 0, look: after(k, 'c') ? -1 : 0 });
        k.char(1100, SAN.y, 330, { ...THANG, face: after(k, 'd') ? 'cry' : after(k, 'b') ? 'shock' : 'angry', tears: after(k, 'd') ? 0.6 : 0, flip: true });
        shade(k, 0.42, [SAN.door, SAN.lamp]);
        quote(k, 'Cả làng giữ chung một bí mật.', 'd', { color: AMBER });
      },
    },
    {
      say: '{a}Tôi giận tất cả mọi người, giận đến mức không khóc được. Nhưng tôi cũng biết, chỉ còn hai đêm nữa là đến rằm. {b}Chiều hôm ấy, tôi bắt Tèo dạy tôi lặn. Tèo nhát nhất xóm, nhưng bơi giỏi nhất xóm, nín thở lâu hơn cả người lớn. {c}Tèo hỏi tôi tập làm gì. Tôi không trả lời. Tèo cũng không hỏi lại. Nó chỉ ngồi đếm cho tôi, hết lượt này đến lượt khác, cho đến khi trời tối.',
      draw(k) {
        pier(k, { time: after(k, 'c', 3) ? 'dusk' : 'day', stilt: false, boats: false });
        const dive = after(k, 'b', 3) && Math.sin(k.t * 0.8) > 0.1;
        wader(k, 1300, PIER.y + 90, 300, { ...TEO, face: 'calm', pose: 'point' }, 0.55);
        if (!dive) wader(k, 1050, PIER.y + 90, 300, { ...THANG, face: 'angry' }, 0.55);
        else { const { ctx } = k; ctx.strokeStyle = 'rgba(220,230,245,0.6)'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(1050 + i * 14, PIER.y + 80 - i * 20, 6, 0, Math.PI * 2); ctx.stroke(); } }
        k.vignette(0.4);
        if (dive) k.text(String(1 + Math.floor((k.t * 1.2) % 40)), 1300, 300, { size: 80, font: 'title', color: PAPER, outline: '#000', outlineWidth: 8 });
        tag(k, 'CÒN HAI ĐÊM', 'a');
      },
    },
    {
      chapter: 'Lời thú của bố',
      say: '{a}Đêm trước rằm, tiếng gọi lại vang lên dưới gầm bến. Lần này tôi không chạy. {b}Tôi để Tèo đứng trên bờ, một mình chui xuống gầm bến, lội nước đến đầu gối, chĩa đèn pin về phía tiếng gọi.',
      sfx: [['drip', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { pier(k, { time: 'night' }); k.char(600, PIER.y - 20, 330, { ...THANG, face: 'angry' }); k.char(470, PIER.y - 20, 300, { ...TEO, face: 'shock' }); shade(k, 0.78, [moon, { x: 600, y: 520, r: 320 }]); }
        else { underPier(k); wader(k, k.lerp(300, 700, k.at('b', 5, 'linear')), 760, 330, { ...THANG, face: 'angry', pose: 'point', walk: true }, 0.4); shade(k, 0.65, [{ x: k.lerp(500, 1000, k.at('b', 5, 'linear')), y: 720, r: 380 }]); }
        chapter(k, 6, 'Lời thú của bố');
      },
    },
    {
      say: '{a}Là bà Hiền. {b}Bà ngồi ôm một cây cột bến, nửa người ngâm dưới nước, tóc xoã ướt, môi tím ngắt. Miệng bà vẫn mấp máy gọi tên bố tôi. Hoá ra chỉ là một người mẹ. {c}Nhưng bà quay sang nhìn thẳng vào ánh đèn, không chớp mắt, và nói một câu mà đến giờ tôi vẫn nhớ: {d}Tao không gọi nó. Con Lụa gọi. Tao chỉ gọi theo, cho người ta nghe thấy. {e}Lúc chạy lên bờ, tôi chợt nghĩ: bà Hiền có thể ngồi dưới gầm bến. Nhưng bà không thể ở trên đồi, cách đây mười cây số, cái đêm bố ngã xuống vũng trâu.',
      sfx: [['stinger', 'a', 0.45], ['stinger', 'e', 0.3]],
      draw(k) {
        if (k.t < k.cue('e')) {
          zoom(k, 1110, 640, after(k, 'c') ? 1.3 + 0.4 * k.at('c', 2, 'inOut') : 1.3, () => { underPier(k); wader(k, 1110, 760, 420, { ...HIEN, face: after(k, 'c') ? 'cold' : 'blank', gloom: 0.6, look: after(k, 'c') ? -1 : 0, talk: after(k, 'd') ? 0.25 : 0 }, 0.45); shade(k, 0.6, [{ x: 1110, y: 620, r: 440 }]); });
          quote(k, '"Con Lụa gọi. Tao chỉ gọi theo."', 'd', { color: COLD });
          return;
        }
        hill(k, { time: 'night', rain: true }); shade(k, 0.6, [{ x: HILL.pool.x, y: HILL.pool.y, r: 520 }]);
        quote(k, 'Mười cây số.', 'e', { color: AMBER });
      },
    },
    {
      say: '{a}Đêm ấy, tôi đặt cái mái chèo trước mặt bố, và kể hết những gì tôi biết. {b}Bố tôi khóc. Đó là lần đầu tiên tôi thấy bố khóc. {c}Bố nói, đêm ấy bé Na ngồi trong thuyền. Thuyền nhỏ. Nếu Lụa trèo lên, thuyền lật, cả ba cùng chết. Bố không giữ luật làng. Bố chọn. {d}Bố gỡ tay một đứa con gái mười bảy tuổi, để giữ lấy đứa con gái năm tuổi của mình. {e}Và tôi hiểu vì sao từ đêm ấy, bé Na không bao giờ chịu bước lên thuyền nữa.',
      sfx: [['heartbeat', 'd', 0.3]],
      draw(k) {
        sanRoom(k, {});
        lie(k, 600, SAN.y - 20, 240, { ...NA, face: 'sleep' });
        k.char(1000, SAN.y, 470, { ...BO, face: after(k, 'b') ? 'cry' : 'sad', tears: after(k, 'b') ? 1 : 0, talk: after(k, 'c') && !after(k, 'd') ? 0.3 : 0, look: after(k, 'c') ? -1 : 0 });
        k.char(1280, SAN.y, 330, { ...THANG, face: 'sad', flip: true });
        paddle(k, 1150, SAN.y - 10, 0.7, 0);
        shade(k, 0.66, [SAN.lamp, { x: 1050, y: 600, r: 420, warm: 0.6 }]);
        quote(k, '"Bố không giữ luật làng. Bố chọn."', 'c', { color: AMBER, until: 'e' });
      },
    },
    {
      say: '{a}Gần sáng, bố gọi tôi ra mép sàn, dạy tôi buộc cái nút dây thuyền mà ông nội dạy bố ngày xưa. Buộc đi buộc lại, đến khi tôi thắt được mà không cần nhìn. {b}Bố bảo, từ giờ thuyền nhà mình con giữ. Giữ thuyền, giữ em. {c}Tôi không hiểu sao bố lại dạy tôi việc ấy đúng vào sáng hôm ấy. Giờ thì tôi hiểu.',
      draw(k) {
        pier(k, { time: 'dawn', lit: false });
        k.char(1400, 590, 420, { ...BO, face: 'calm', pose: 'hold', talk: after(k, 'b') && !after(k, 'c') ? 0.25 : 0 });
        k.char(1600, 590, 300, { ...THANG, face: 'sad', pose: 'hold', flip: true });
        const { ctx } = k; ctx.strokeStyle = '#a8905a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1500, 450); ctx.bezierCurveTo(1520, 520 + Math.sin(k.t * 2) * 10, 1480, 560, 1460, 760); ctx.stroke();
        shade(k, 0.35, [{ x: 960, y: 300, r: 1400 }]);
        quote(k, 'Giữ thuyền, giữ em.', 'b', { color: AMBER });
      },
    },
    {
      chapter: 'Đêm rằm',
      say: '{a}Chiều rằm, bố cạo râu, mặc cái áo sạch nhất, ngồi ăn bữa cơm với cả nhà. Bố gắp cho bé Na miếng cá to nhất. Không ai nói gì. {b}Ăn xong, bố bảo mẹ: Anh không trốn nữa. {c}Lúc ấy tôi mới nhớ ra câu của thầy Thông. Người nợ thì tự đi trả.',
      draw(k) {
        sanRoom(k, { day: true });
        const { ctx } = k; ctx.fillStyle = '#5a4030'; ctx.beginPath(); ctx.ellipse(900, SAN.y - 6, 300, 30, 0, 0, Math.PI * 2); ctx.fill();
        k.char(700, SAN.y, 470, { ...BO, face: after(k, 'b') ? 'sad' : 'calm', stubble: false, color: '#5a6a7a', talk: after(k, 'b') && !after(k, 'c') ? 0.3 : 0 });
        k.char(1100, SAN.y, 420, { ...ME, face: 'sad', flip: true }); k.char(900, SAN.y, 270, { ...NA, face: 'calm' }); k.char(1300, SAN.y, 320, { ...THANG, face: after(k, 'c') ? 'shock' : 'sad', flip: true }); k.char(480, SAN.y, 450, { ...ONG, face: 'sad' });
        shade(k, 0.45, [SAN.door, { x: 900, y: 600, r: 600, warm: 0.6 }]);
        quote(k, '"Anh không trốn nữa."', 'b', { until: 'c' });
        quote(k, 'Người nợ thì tự đi trả.', 'c', { color: AMBER });
        chapter(k, 7, 'Đêm rằm');
      },
    },
    {
      say: '{a}Tối hôm ấy, cả làng ra bến như mọi năm. Người ta nấu cháo thí, thả đèn, thắp hương cho những người sông đã lấy. {b}Rồi người ta thắp đuốc, đứng thành hàng dọc bờ sông, và chờ. {c}Bố tôi bước ra khỏi hàng người, đi thẳng xuống nước.',
      sfx: [['gong', 'a', 0.25]],
      draw(k) {
        riverWide(k, { time: 'night' });
        for (let i = 0; i < 9; i++) { const x = 400 + i * 160 + Math.sin(k.t * 0.5 + i) * 30, y = 620 + (i % 3) * 50; k.ctx.fillStyle = '#ffb340'; k.ctx.beginPath(); k.ctx.arc(x, y, 7, 0, Math.PI * 2); k.ctx.fill(); }
        const L = after(k, 'b') ? torchCrowd(k, 60, 1100, 920, 11, { h: 320 }) : [];
        if (after(k, 'c')) { const p = k.at('c', 4, 'linear'); wader(k, k.lerp(1150, 1350, p), k.lerp(880, 640, p), 360, { ...BO, face: 'calm', walk: true, walkSpeed: 0.5 }, k.lerp(0, 0.45, p)); }
        shade(k, 0.7, [moon, ...L, { x: 960, y: 650, r: 700, warm: 0.4 }]);
        tag(k, 'RẰM THÁNG BẢY', 'a');
      },
    },
    {
      say: '{a}Và đó là cảnh tôi đã kể với bạn từ đầu. Nước lên đến ngực bố, rồi đến vai. Mẹ gào lên, hai người đàn ông giữ chặt tay mẹ. Ông nội quỳ trên cát. {b}Từ dưới mặt nước, tiếng người con gái gọi: Sáu ơi. {c}Bố tôi thưa: Anh đây. Anh xin lỗi em. {d}Bé Na vùng ra khỏi tay mẹ, hét lên một câu mà cả năm trời nó chưa từng nói: Chị Lụa ơi, đừng! {e}Rồi đầu bố chìm xuống.',
      sfx: [['heartbeat', 'b', 0.45], ['whoosh', 'e', 0.35]],
      draw(k) {
        zoom(k, 1350, 620, after(k, 'd') ? 1 : 1.3, () => ram(k, { sink: 0.55 + (after(k, 'e') ? 0.6 * k.at('e', 1.2, 'in') : 0), me: true, ong: true, na: after(k, 'd') }));
        quote(k, '"Sáu ơi."', 'b', { color: COLD, until: 'c' });
        quote(k, '"Anh đây. Anh xin lỗi em."', 'c', { color: AMBER, until: 'd' });
        quote(k, '"Chị Lụa ơi, đừng!"', 'd', { color: COLD, until: 'e' });
      },
    },
    {
      say: '{a}Thầy Thông bước ra, giơ tay chặn trước hàng người, quát không ai được xuống. {b}Ông nội tôi đang nắm chặt cổ tay tôi. Tôi cảm thấy bàn tay ông siết lại, chặt đến đau. {c}Rồi, tôi không biết vì sao, ông buông ra.',
      draw(k) {
        if (k.t < k.cue('b')) { riverWide(k, { time: 'night' }); const L = torchCrowd(k, 60, 1860, 980, 14, { h: 300 }); k.char(960, 960, 500, { ...THONG, face: 'angry', pose: 'shout', talk: 0.4 }); shade(k, 0.65, [...L, { x: 960, y: 650, r: 400, warm: 0.6 }]); return; }
        riverWide(k, { time: 'night' });
        zoom(k, 900, 700, 2.2, () => {
          torchCrowd(k, 60, 600, 1000, 5, { h: 300 });
          const go = after(k, 'c');
          k.char(820, 1000, 470, { ...ONG, face: go ? 'cry' : 'sad', tears: go ? 1 : 0, pose: go ? 'stand' : 'point', look: 1 });
          k.char(go ? k.lerp(1010, 1250, k.at('c', 1, 'in')) : 1010, 1000, 330, { ...THANG, face: 'angry', look: 1, walk: go, walkSpeed: 3 });
        });
        shade(k, 0.55, [{ x: 960, y: 560, r: 700, warm: 0.7, flicker: 1 }]);
      },
    },
    {
      say: '{a}Tôi chạy qua hàng đuốc, nhảy ùm xuống sông. Đêm rằm tháng Bảy, xuống nước, để cứu người. Tôi phá điều luật cuối cùng của làng. {b}Dưới nước tối như mực. Tôi nín thở, đúng như Tèo đã dạy, lần theo bọt khí cho đến khi túm được cổ áo bố, rồi kéo ngược lên.',
      sfx: [['boom', ['a', 1], 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) {
          riverWide(k, { time: 'night' });
          const L = torchCrowd(k, 60, 1100, 960, 10, { h: 300 });
          const x = k.lerp(300, 1250, k.at('a', 2, 'in'));
          k.char(x, k.t > k.cue('a', 1.5) ? 700 : 960, 330, { ...THANG, face: 'shout', walk: true, walkSpeed: 3 });
          shade(k, 0.65, [moon, ...L]);
          return;
        }
        underwater(k);
        k.char(900, 760, 330, { ...THANG, face: 'angry', pose: 'cheer' });
        k.char(1100, 640, 420, { ...BO, face: 'sleep', alpha: 0.85 });
        cold(k, 0.45); k.vignette(0.6);
      },
    },
    {
      say: '{a}Rồi có cái gì đó nắm lấy cổ chân tôi. Một bàn tay. Nhỏ, và lạnh. {b}Nó nắm chặt. Tôi nghĩ, thế là hết. {c}Rồi bàn tay ấy buông ra.',
      sfx: [['heartbeat', 'a', 0.5]],
      draw(k) {
        underwater(k);
        const up = after(k, 'c') ? k.at('c', 1.5, 'out') : 0;
        k.char(900, 760 - 300 * up, 330, { ...THANG, face: 'shock', pose: 'cheer' });
        k.char(1100, 640 - 300 * up, 420, { ...BO, face: 'sleep', alpha: 0.85 });
        paleHand(k, 880, 810 - 300 * up + 60 * k.at('c', 0.6), 1.1, -0.3, 0.8 * k.at('a', 0.5) * (1 - k.at('c', 0.8)));
        cold(k, 0.45); k.vignette(0.7);
      },
    },
    {
      say: '{a}Tôi ngoi lên, ôm được đầu bố trên mặt nước. {b}Người đầu tiên lội ra kéo hai bố con tôi là thằng Tèo, đứa nhát nhất xóm. Rồi bố Tèo. Rồi người thứ ba, người thứ tư. {c}Cái luật giữ cả làng đứng yên suốt bao nhiêu năm, vỡ ra chỉ trong mấy hơi thở.',
      draw(k) {
        riverWide(k, { time: 'night' });
        const L = torchCrowd(k, 60, 1100, 960, 10, { h: 300 });
        wader(k, 1300, 640, 300, { ...THANG, face: 'cry' }, 0.62); wader(k, 1420, 650, 380, { ...BO, face: 'sleep' }, 0.75);
        if (after(k, 'b')) wader(k, k.lerp(900, 1180, k.at('b', 2)), 680, 300, { ...TEO, face: 'shout', walk: true }, 0.5);
        if (after(k, 'b', 3)) for (let i = 0; i < 3; i++) wader(k, k.lerp(700, 1050 - i * 90, k.at(k.cue('b', 3 + i * 0.8), 1.5)), 720 + i * 30, 440, { ...DAN(VIL[i]), face: 'shout', walk: true }, 0.45);
        shade(k, 0.62, [moon, ...L, { x: 1300, y: 600, r: 360 }]);
      },
    },
    {
      say: '{a}Bố tôi nằm trên cát, ho ra nước, nhưng còn sống. {b}Không ai để ý rằng ở đầu bến, có một người đang lội ra sông, chậm rãi, không vùng vẫy. Bà Hiền. {c}Tôi nghe bà gọi, lần này không phải tên bố tôi: Lụa ơi, mẹ xuống với con đây. {d}Khi tôi chạy được đến đầu bến, mặt sông đã phẳng lặng.',
      sfx: [['wind', 'b', 0.3]],
      draw(k) {
        riverWide(k, { time: 'night' });
        const L = torchCrowd(k, 60, 900, 980, 8, { h: 300 });
        lie(k, 1100, 940, 440, { ...BO, face: 'sad' });
        k.char(900, 960, 330, { ...THANG, face: after(k, 'c') ? 'shock' : 'cry', look: after(k, 'b') ? 1 : 0 });
        if (after(k, 'b') && !after(k, 'd')) wader(k, k.lerp(1500, 1720, k.at('b', 8, 'linear')), 600, 300, { ...HIEN, face: 'calm' }, k.lerp(0.4, 0.85, k.at('b', 10, 'linear')));
        shade(k, 0.65, [moon, ...L, { x: 1000, y: 800, r: 400 }]);
        quote(k, '"Lụa ơi, mẹ xuống với con đây."', 'c', { color: COLD, until: 'd' });
      },
    },
    {
      chapter: 'Điều tôi vẫn chưa hiểu',
      say: '{a}Sáng hôm sau, ông Cửu vớt được bà Hiền ở khúc sông cong, đúng chỗ năm ngoái ông vớt được Lụa. Ông bảo mặt bà bình thản như người đang ngủ. {b}Trong vòng tay bà, ôm chặt vào ngực, là con búp bê vải của bé Na. {c}Năm ấy, sông vẫn lấy đi đúng một người.',
      sfx: [['stinger', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { riverWide(k, { time: 'dawn', sand: false }); boat(k, 960, 640, 1.2, {}); k.char(960, 610, 400, { ...CUU, face: 'sad', pose: 'hold' }); shade(k, 0.35, [{ x: 960, y: 300, r: 1400 }]); }
        else { black(k); doll(k, 960, 700, 3.5, { wet: true }); shade(k, 0.45, [{ x: 960, y: 560, r: 700 }]); quote(k, 'Năm ấy, sông vẫn lấy đi đúng một người.', 'c', { color: AMBER }); }
        chapter(k, 8, 'Điều tôi vẫn chưa hiểu');
      },
    },
    {
      say: '{a}Tuần sau, ông nội tôi ra đình, đứng trước cả làng, nói rằng từ nay đêm nào thấy người chìm cũng phải cứu, đêm rằm cũng cứu. Không ai cãi. {b}Người ta sơn tên bà Hiền vào dòng năm chín mươi hai trên tấm bảng gỗ đen. Rồi ông nội tự tay gỡ tấm bảng xuống, chẻ làm củi. Ông Cửu bỏ rượu từ năm ấy. {c}Sông Cái vẫn có người chết đuối, như mọi con sông khác. Nhưng từ năm ấy, không năm nào người làng tôi đứng trên bờ mà nhìn.',
      draw(k) {
        if (k.t < k.cue('b')) { dinh(k, { time: 'day' }); k.char(960, 840, 500, { ...ONG, face: 'angry', pose: 'shout', talk: 0.3 }); for (let i = 0; i < 6; i++) k.char(250 + i * 110 + (i > 2 ? 980 : 0), 1010, 380, { ...DAN(VIL[i]), face: 'sad', flip: i > 2 }); k.vignette(0.35); return; }
        if (k.t < k.cue('c')) { black(k); k.group({ x: 960, y: 540, r: after(k, 'b', 5) ? 0.15 * k.at(k.cue('b', 5), 1) : 0 }, () => board(k, 0, 0, 1, ROWS, { fill: 'Bà Hiền', fillP: k.at('b', 2, 'linear') })); shade(k, 0.45, [{ x: 960, y: 540, r: 900, warm: 0.3 }]); return; }
        pier(k, { time: 'day' }); k.vignette(0.35);
      },
    },
    {
      say: '{a}Sau này, tôi đã thử giải thích mọi chuyện. {b}Người ta có thể chết đuối trong một vũng nước sâu một gang tay, nếu ngất đi. {c}Người rơm có thể do ai đó vớt lên, mang về dựng ở cửa. {d}Tiếng gọi dưới gầm bến là bà Hiền. {e}Mọi thứ đều có một lời giải. Trừ một điều.',
      draw(k) {
        k.ctx.fillStyle = '#1f242c'; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400);
        k.char(400, 1000, 560, { ...DAN('#3c4652'), face: 'blank', pose: 'think' });
        memo(k, 760, 120, 'b', () => hill(k, { time: 'day' }));
        memo(k, 1290, 120, 'c', () => { sanRoom(k, { day: true }); strawman(k, 1700, SAN.y, 460, { wet: true, blank: true }); });
        memo(k, 1025, 420, 'd', () => { underPier(k); wader(k, 1110, 760, 420, { ...HIEN, face: 'blank' }, 0.45); });
        shade(k, 0.45, [{ x: 600, y: 500, r: 700, warm: 0.4 }, { x: 1300, y: 400, r: 800 }]);
        quote(k, 'Trừ một điều.', 'e', { color: AMBER });
      },
    },
    {
      say: '{a}Bàn tay đã nắm cổ chân tôi đêm ấy. Nó nhỏ, như tay một đứa con gái mười bảy tuổi. {b}Nó có thể kéo tôi xuống. Nhưng nó buông ra. {c}Như thể nó vừa nhận ra, tôi đang làm đúng cái việc mà năm trước, cả một làng người cầm đuốc đã không ai làm cho nó.',
      draw(k) {
        underwater(k);
        const rel = after(k, 'b') ? k.at('b', 2, 'inOut') : 0;
        paleHand(k, 960, 560 + 140 * rel, 2.6, -0.2, 0.75 * (1 - 0.6 * rel));
        cold(k, 0.4); k.vignette(0.6);
      },
    },
    {
      say: '{a}Bé Na bây giờ đã ngoài ba mươi. Chiều nào em cũng ra bến dạy bơi cho trẻ con trong làng, không lấy tiền. {b}Em bảo, em không nhớ gì về đêm rằm năm em năm tuổi. Em chỉ nhớ có một chị tóc dài, hát rất hay.',
      draw(k) {
        pier(k, { time: after(k, 'b') ? 'dusk' : 'day', boats: false, stilt: false });
        k.text('LỚP DẠY BƠI', 300, 520, { size: 40, font: 'title', color: '#2a1c10' });
        wader(k, 1000, 760, 470, { ...ME, color: '#3f7a6a', hair: 'long', face: 'happy', pose: 'present' }, 0.4);
        for (let i = 0; i < 3; i++) wader(k, 1200 + i * 150, 780, 280, { ...DAN(['#c86a6a', '#5a7aa8', '#e8b84a'][i], { body: 'kid' }), face: 'happy' }, 0.5);
        k.vignette(0.3);
        tag(k, 'BÂY GIỜ', 'a');
      },
    },
    {
      lead: 0.8, tail: 2.5,
      say: '{a}Làng tôi vẫn tin, mỗi năm sông lấy đi đúng một người. {b}Nhưng năm ấy, lần đầu tiên, sông trả lại một người.',
      sfx: [['wind', 0, 0.25]],
      draw(k) {
        riverWide(k, { time: 'dusk', sand: false });
        shade(k, 0.4, [{ x: 960, y: 300, r: 1400 }]);
        quote(k, 'Năm ấy, lần đầu tiên, sông trả lại một người.', 'b', { color: PAPER, size: 54 });
      },
    },
    nextScene({
      say: '{next}Tập sau là một chuyện khác, ở một làng khác: bà đồng gọi hồn một người chồng vừa mất. Người về nói đúng giọng anh ấy, kể đúng những chuyện chỉ anh ấy biết. Nhưng người ấy lại gọi vợ mình là chị.',
      title: 'Gọi Hồn | Người Về Lại Gọi Vợ Mình Là Chị',
      hook: 'Nói đúng giọng, kể đúng chuyện… nhưng gọi vợ là "chị".',
      art(k) {
        const { ctx } = k;
        ctx.fillStyle = '#120d0a'; ctx.fillRect(400, 200, 1120, 600);
        k.prop('incense', 960, 640, 200);
        for (let i = 0; i < 2; i++) { ctx.fillStyle = '#ffb340'; ctx.beginPath(); ctx.ellipse(700 + i * 520, 560, 10, 22, 0, 0, Math.PI * 2); ctx.fill(); }
        k.char(960, 800, 420, { ...DAN('#7a2a2a', { body: 'woman', hair: 'bun' }), outfit: 'dress', face: 'blank', alpha: 0.9 });
        k.vignette(0.6);
      },
    }),
    subScene({
      say: '{q}Nếu là bạn, ngồi trên chiếc thuyền ấy với đứa con năm tuổi bên cạnh, bạn có gỡ tay Lụa ra không? Hãy để lại câu trả lời. {sub}Và nếu muốn nghe tiếp những chuyện chưa có lời giải, hãy đăng ký Nhân Gian Chưa Kể.',
      question: 'Ngồi trên chiếc thuyền ấy, bạn có gỡ tay Lụa ra không?',
      art(k) { paddle(k, 960, 960, 1, 0); },
    }),
  ],
};
