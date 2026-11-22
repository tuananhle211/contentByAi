// Nhân Gian Chưa Kể — tập 6: Cầu Cơ | Thằng Bạn Chết Đuối Bảo: Có Người Đứng Nhìn. Kịch bản: kich-ban.md (người dùng cho làm luôn).
// Công thức Gọi Hồn (106, ~100K view Facebook): nghi lễ nói chuyện với người chết ai cũng biết (cầu cơ) + vong nói điều chỉ người chết
// biết (Nam Ròm, dép ở gốc sung) + bí mật người sống (Quân đứng nhìn) + ba điều cấm bị phạm + hai danh tính (Tùng hay ma da) không chọn.
// Một giọng kể, liền mạch, không giải thích khoa học, kết mở. Hình: nhân vật búp bê + bộ cảnh phẳng channel/nhan-gian-cauco.js.
import * as thumbs from '/videos/121-cau-co-thang-ban-chet-duoi/thumbs.js';
import { PAPER, AMBER, COLD, shade, cold, tag, quote, chapter, rules, nextScene, subScene } from '/channel/nhan-gian.js';
import { dollBike, dollFish } from '/channel/nhan-gian-doll.js';
import {
  NAM, QUAN, HAI, LINH, TUNG, BA_NOI, BA_THOA, ME_QUAN, THAY_BINH, ONG_KHIEM, ch, lie,
  candle, candleLight, dep, coin, board, boardPos, coinAt, fingerArm,
  lopHoc, deskFront, wallShadows, ROOM, benDong, BEN, bamboo, sung, duongDe, buong, net, hanhLang, cho, nhaKhiem, altarLights, sepia,
} from '/channel/nhan-gian-cauco.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const black = (k) => { k.ctx.fillStyle = '#05060a'; k.ctx.fillRect(-200, -200, k.W + 400, k.H + 400); };
const zoom = (k, cx, cy, s, fn) => k.group({ x: cx, y: cy, s }, () => k.group({ x: -cx, y: -cy }, fn));
const DAY = { x: 1700, y: 300, r: 1500 };
const MOON = { x: 1500, y: 170, r: 1100 };
const grain = (sc) => ({ ...sc, draw(k) { const s = 1 + 0.05 * Math.min(1, k.t / Math.max(1, k.d)); k.group({ x: k.W / 2, y: k.H / 2, s }, () => k.group({ x: -k.W / 2, y: -k.H / 2 }, () => sc.draw(k))); sepia(k, 0.75); } });

// Lớp học tầng ba: Linh + Quân ngồi phía sau bàn (nhìn thẳng), Nam đầu trái, Hải đầu phải (nhìn nghiêng).
function cls(k, o = {}) {
  const f = o.faces ?? {}, tk = o.talk ?? {};
  lopHoc(k, { open: o.open ?? 0, power: o.power ?? 0, prints: o.prints ?? 0 });
  wallShadows(k, [560, 820, 1100, 1360], { extra: o.fifth ?? 0, extraX: 1230 });
  if (o.kids !== false) {
    ch(k, 820, 810, 340, { ...LINH, action: 'sit', face: f.linh ?? 'calm', arms: 'hold', talk: tk.linh ?? 0 });
    ch(k, 1100, 810, 370, { ...QUAN, action: 'sit', face: f.quan ?? 'blank', arms: 'hold', talk: tk.quan ?? 0 });
  }
  deskFront(k, { candle: o.candle ?? 1, lean: o.lean ?? 0 });
  if (o.kids !== false) {
    ch(k, 520, 905, 350, { ...NAM, view: 'side', action: 'sit', face: f.nam ?? 'calm', arms: { r: [[12, 4], [24, 2]] }, talk: tk.nam ?? 0 });
    ch(k, 1400, 905, 310, { ...HAI, view: 'side', action: 'sit', flip: true, face: f.hai ?? 'fear', arms: { r: [[12, 4], [24, 2]] }, talk: tk.hai ?? 0 });
  }
  const on = o.candle ?? 1;
  shade(k, o.power ? 0.25 : 0.82, [candleLight(ROOM.candle.x, ROOM.candle.y, 620, on), ...(o.open ? [{ x: 1660, y: 420, r: 300 }] : [])], { vig: 0.45 });
}
// Cận tờ giấy: đồng xu đánh chữ `seq` từ thời điểm t0; bốn ngón tay theo đồng xu; fifth = ngón tay thứ năm (lạnh, ướt).
function brd(k, seq, t0, step = 0.7, o = {}) {
  const c = o.free ? { pos: o.pos ?? boardPos('.'), idx: -1 } : coinAt(k, seq, t0, step, o.from ?? '.');
  const chars = [...seq.replace(/ /g, '')];
  board(k, { hi: c.idx >= 0 ? chars[c.idx] : null, wet: o.wet });
  const [x, y] = c.pos;
  coin(k, x, y, 1.2);
  if (o.hands !== false) {
    const off = o.lift ? 140 * Math.min(1, o.lift) : 0;
    fingerArm(k, [x - 180, 1220], [x - 26 - off, y + 24 + off], { skin: NAM.skin });
    fingerArm(k, [x + 160, -160], [x + 20 + off * 0.3, y - 30 - off], { skin: QUAN.skin });
    fingerArm(k, [-160, y - 60], [x - 34 - off, y - 10 - off * 0.2], { skin: LINH.skin });
    if (!o.noHai) fingerArm(k, [2080, y + 80], [x + 34 + off, y + 14], { skin: HAI.skin });
    if (o.fifth) fingerArm(k, [1900, 1220], [x + 10, y + 34], { color: '#7a8a94', skin: '#b8c8cc', alpha: o.fifth });
  }
  shade(k, 0.55, [{ x, y, r: 700, warm: 1, flicker: 1 }], { vig: 0.5 });
}
// Bến Đống + người đứng.
function ben(k, o = {}) { benDong(k, { time: o.time ?? 'dusk', swirl: o.swirl ?? 0.6, moon: o.moon }); }

const video = {
  meta: {
    title: 'Cầu Cơ | Thằng Bạn Chết Đuối Bảo: Có Người Đứng Nhìn',
    description: `Hè năm lên lớp chín, bốn đứa chúng tôi chơi cầu cơ trên tầng ba của trường cấp hai. Đồng xu đánh ra tên thằng Tùng, đứa bạn chết đuối ở bến sông làng tôi mùa hè năm trước. Rồi nó đánh tiếp: có người đứng nhìn.
Trong bốn đứa ngồi quanh ngọn nến hôm ấy, có một đứa đã đứng trên bờ sông, nhìn nó chìm.

Một chiếc dép tổ ong vẫn ướt sau hơn một năm, một tiếng gọi "Nam Ròm ơi, ra tắm sông" ngoài cửa sổ, và đêm rằm tháng Bảy ở bến Đống.`,
    footer: `📖 Truyện hư cấu dựa trên trò cầu cơ và tín ngưỡng dân gian về ma da, người chết đuối. Truyện không khuyến khích chơi cầu cơ. Tên người, tên địa danh và tình tiết đều hư cấu.
🕯️ Nhân Gian Chưa Kể: những chuyện người xưa truyền tai nhau, mà chưa ai giải thích được.`,
    links: [['▶ Tập trước: Chim Lợn', '112-chim-lon-ba-dem-keu-tren-mai-nha'], ['▶ Gọi Hồn', '106-goi-hon-nguoi-ve-goi-vo-la-chi'], ['🔔 Đăng ký', 'https://www.youtube.com/@nhangianchuake?sub_confirmation=1']],
    tags: ['cầu cơ', 'cầu cơ kinh dị', 'chơi cầu cơ', 'ma da', 'truyện ma', 'chuyện tâm linh', 'truyện ma hoạt hình', 'chuyện tâm linh có thật', 'truyện ma làng quê', 'hoạt hình kinh dị', 'nhân gian chưa kể'],
    hashtags: ['truyenma', 'cauco', 'tamlinh'],
    gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 0.95,
    lead: 0.4, tail: 0.8, pause: 0.35,
    transition: 'fade', sfxTransitions: false, camera: 0.03, scribble: false,
    sfxVolume: 0.5, paper: '#07080c', privacy: 'private',
  },
  thumbnail: thumbs.a,

  scenes: [
    // ===== MỞ ĐẦU =====
    {
      chapter: 'Mở đầu',
      say: '{a}Hè năm lên lớp chín, bốn đứa chúng tôi chơi cầu cơ trên tầng ba của trường cấp hai, vào một tối học thêm. {b}Đồng xu chạy trên tờ giấy, đánh ra tên thằng Tùng, đứa bạn chết đuối ở bến sông làng tôi mùa hè năm trước. {c}Rồi nó đánh tiếp bốn chữ: có người đứng nhìn.',
      sfx: [['heartbeat', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { cls(k, { faces: { linh: 'fear', quan: 'blank', nam: 'calm', hai: 'fear' } }); tag(k, '2009', 'a'); return; }
        if (k.t < k.cue('c')) { brd(k, 'TUNG', k.cue('b', 1.5), 0.8); quote(k, 'T · U · N · G', k.cue('b', 4), { color: AMBER }); return; }
        brd(k, 'CONGUOIDUNGNHIN', k.cue('c', 0.6), 0.32);
        quote(k, 'CÓ NGƯỜI ĐỨNG NHÌN', k.cue('c', 4), { color: AMBER, size: 60 });
      },
    },
    {
      say: '{a}Trong bốn đứa ngồi quanh ngọn nến hôm ấy, có một đứa, ngày Tùng chết, đã đứng trên bờ sông nhìn nó chìm. {b}Và đến giờ, tôi vẫn không biết thứ đã về qua đồng xu hôm ấy là thằng Tùng, hay là một thứ khác, mượn tên nó.',
      sfx: [['wind', 'b', 0.25]],
      draw(k) {
        if (k.t < k.cue('b')) { zoom(k, 960, 600, 1.35, () => cls(k, { faces: { linh: 'fear', quan: 'sad', nam: 'blank', hai: 'fear' }, fifth: k.at('a', 6) * 0.8 })); return; }
        ben(k, { time: 'night', swirl: 0.9 }); shade(k, 0.6, [MOON, { x: BEN.swirl.x, y: BEN.swirl.y, r: 300 }], { vig: 0.5 });
        quote(k, 'Thằng Tùng, hay một thứ khác mượn tên nó?', k.cue('b', 3), { color: COLD });
      },
    },
    {
      say: '{a}Đây là Nhân Gian Chưa Kể. Nếu bạn muốn nghe tiếp những chuyện chưa có lời giải, hãy bấm đăng ký. {c}Còn bây giờ, xin bạn tắt bớt đèn.',
      draw(k) {
        black(k); candle(k, 960, 760, 2.4, { on: after(k, 'c', 1.5) ? Math.max(0, 1 - (k.t - k.cue('c', 1.5)) / 0.6) : 1 });
        k.text('NHÂN GIAN CHƯA KỂ', 960, 330, { size: 92, font: 'title', color: PAPER, fx: 'fade', p: k.at('a', 1) });
        k.text('Cầu Cơ', 960, 450, { size: 60, font: 'title', color: AMBER, fx: 'fade', p: k.at('a', 1.5) });
        shade(k, 0.5, [{ x: 960, y: 600, r: 700, warm: 1, flicker: 1 }], { vig: 0.5 });
      },
    },

    // ===== CHƯƠNG 1 =====
    {
      chapter: 'Bến Đống',
      say: '{a}Làng tôi ở ven một con sông nhỏ của đồng bằng Bắc Bộ. Đầu làng có một khúc sông lượn gấp, người ta gọi là bến Đống. {b}Mặt nước ở đấy lúc nào cũng phẳng lặng, nhưng ngay giữa dòng có một vòng xoáy, nhỏ bằng cái nong. {c}Các cụ trong làng dặn con cháu một câu, từ đời này sang đời khác: trẻ con không được tắm ở bến Đống. Nước ở đấy, năm nào cũng phải lấy người.',
      draw(k) {
        if (k.t < k.cue('b')) { ben(k, { time: 'day', swirl: 0.3 }); chapter(k, 1, 'Bến Đống'); return; }
        zoom(k, BEN.swirl.x, BEN.swirl.y, k.t < k.cue('c') ? 1.8 : 1.2, () => ben(k, { time: 'day', swirl: 1 }));
        quote(k, 'Nước ở đấy, năm nào cũng phải lấy người.', 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Bà nội tôi còn dặn thêm một điều nữa, mà hồi bé tôi nghe đến thuộc lòng. {q}Đêm nằm, nếu có ai gọi tên mình ngoài cửa sổ, thì đừng thưa. {b}Người sống muốn gặp mình thì gõ cửa. Chỉ có thứ không vào được nhà mới đứng ngoài cửa sổ mà gọi.',
      draw(k) {
        buong(k, { time: 'night' });
        ch(k, 1000, 880, 400, { ...BA_NOI, face: 'calm', arms: 'hold', talk: after(k, 'q') ? 0.25 : 0 });
        ch(k, 700, 880, 300, { ...NAM, top: '#d8d0bc', topStyle: 'tee', face: 'calm', arms: 'down' });
        shade(k, 0.72, [{ x: 860, y: 520, r: 520, warm: 0.8 }, { x: 1450, y: 400, r: 260 }], { vig: 0.4 });
        quote(k, '"Có ai gọi tên ngoài cửa sổ, thì đừng thưa."', 'q', { color: AMBER });
      },
    },
    {
      say: '{a}Thằng Tùng là con bà Thoa bán xôi ở đầu chợ. Nó nghịch nhất lớp, đen nhẻm, lúc nào cũng đi một đôi dép tổ ong màu xanh, đứt quai thì lấy dây thép buộc lại. {b}Cả lớp gọi tôi là Nam. Riêng nó, lúc chỉ có hai đứa, gọi tôi là Nam Ròm, vì tôi gầy. {c}Cái tên ấy, chỉ có nó gọi, chưa ai khác từng nghe.',
      draw(k) {
        if (k.t < k.cue('b')) { cho(k); ch(k, 800, 900, 400, { ...BA_THOA, hat: null, face: 'happy', arms: 'hold' }); ch(k, 1420, 930, 300, { ...TUNG, face: 'happy', arms: 'wave' }); shade(k, 0.25, [DAY], { vig: 0.35 }); cold(k, 0.35); tag(k, 'MÙA HÈ NĂM LỚP 8', 'a'); return; }
        duongDe(k, { time: 'day' });
        ch(k, 760, 960, 330, { ...NAM, face: 'happy', arms: 'down' }); ch(k, 1060, 960, 300, { ...TUNG, face: 'happy', arms: 'point', talk: after(k, 'b', 2) ? 0.4 : 0 });
        shade(k, 0.25, [DAY], { vig: 0.35 }); cold(k, 0.35);
        quote(k, '"Nam Ròm!"', k.cue('b', 2), { color: AMBER });
      },
    },
    {
      say: '{a}Tôi với Tùng hay ra gốc sung ở bến Đống ngồi câu, dù bị cấm. Chỉ ngồi trên bờ, không bao giờ xuống nước. {b}Nó có một cách gọi riêng: huýt sáo hai tiếng ngắn dưới cửa sổ nhà tôi, là tôi biết nó rủ đi câu. {c}Bà nội ghét tiếng huýt sáo ấy lắm. Bà bảo, đêm hôm mà huýt sáo, là gọi ma.',
      sfx: [['whoosh', ['b', 2], 0.25]],
      draw(k) {
        if (k.t < k.cue('b')) { zoom(k, BEN.sung.x + 300, BEN.sung.y - 200, 1.3, () => { ben(k, { time: 'day', swirl: 0.3 }); dollFish(k, BEN.sung.x + 180, 930, 300, { ...TUNG, face: 'happy', water: 900, cast: 30 }); dollFish(k, BEN.sung.x + 420, 935, 320, { ...NAM, face: 'calm', water: 900, cast: 20 }); }); cold(k, 0.35); shade(k, 0.25, [DAY], { vig: 0.4 }); return; }
        buong(k, { time: after(k, 'c') ? 'night' : 'day' });
        quote(k, '♪ fuýt · fuýt ♪', k.cue('b', 2), { color: AMBER, until: 'c' });
        if (after(k, 'c')) ch(k, 1000, 880, 400, { ...BA_NOI, face: 'angry', arms: 'point', talk: 0.3 });
        shade(k, after(k, 'c') ? 0.7 : 0.3, [{ x: 1450, y: 400, r: 400 }, { x: 900, y: 500, r: 500, warm: 0.8 }], { vig: 0.4 });
        quote(k, 'Đêm hôm huýt sáo, là gọi ma.', 'c', { color: COLD });
      },
    },
    {
      say: '{a}Mùa hè năm ấy, lúc chúng tôi vừa hết lớp bảy, Tùng chết đuối ở bến Đống. Sáng hôm sau người ta mới vớt được nó, ngay cạnh vòng xoáy. {b}Chân trái nó vẫn còn một chiếc dép tổ ong xanh. Chiếc bên phải, cả làng mò suốt ba ngày, không ai tìm thấy. {c}Người ta bảo, chắc nó đi tắm một mình.',
      sfx: [['drip', 'b', 0.3]],
      draw(k) {
        if (k.t < k.cue('b')) { ben(k, { time: 'day', swirl: 0.8 }); for (let i = 0; i < 5; i++) ch(k, 900 + i * 150, 960, 330, { ...[ME_QUAN, THAY_BINH, BA_NOI, ONG_KHIEM, ME_QUAN][i], face: 'sad', arms: 'hold', hat: null }); shade(k, 0.35, [DAY], { vig: 0.4 }); return; }
        black(k); dep(k, 760, 560, 3, { r: -0.2, color: '#3a8a9a' }); k.ctx.save(); k.ctx.globalAlpha = 0.25; k.ctx.setLineDash([16, 12]); k.ctx.strokeStyle = '#ddd'; k.ctx.lineWidth = 6; k.ctx.beginPath(); k.ctx.ellipse(1180, 560, 110, 210, 0.2, 0, Math.PI * 2); k.ctx.stroke(); k.ctx.restore();
        shade(k, 0.3, [{ x: 960, y: 560, r: 700, warm: 0.3 }], { vig: 0.5 });
        quote(k, 'Chiếc bên phải, không ai tìm thấy.', 'b', { color: AMBER, until: 'c' });
        quote(k, '"Chắc nó đi tắm một mình."', 'c', { color: COLD });
      },
    },
    {
      say: '{a}Từ hôm ấy, chiều nào bà Thoa cũng dọn hàng sớm, ra đứng ở bến Đống, gọi vọng xuống mặt nước: {q}Tùng ơi, về ăn cơm. {b}Cả làng quen tiếng gọi ấy, như quen tiếng gà gáy. Không ai nỡ bảo bà thôi.',
      draw(k) {
        ben(k, { time: 'dusk', swirl: 0.5 });
        ch(k, 760, 920, 420, { ...BA_THOA, view: 'side', face: 'sad', arms: 'raise', talk: after(k, 'q') && !after(k, 'b') ? 0.6 : 0 });
        shade(k, 0.45, [{ x: 1300, y: 500, r: 1200, warm: 1 }], { vig: 0.45 });
        quote(k, '"Tùng ơi, về ăn cơm."', 'q', { color: AMBER });
      },
    },
    {
      say: '{a}Người khác hẳn đi sau cái chết của Tùng là thằng Quân, bạn thân nhất của nó. Quân to con nhất lớp, trước kia nói cười ầm ĩ. {b}Từ mùa hè ấy, nó ít nói hẳn. Và nó không bao giờ đi qua bến Đống nữa. {c}Sáng nào nó cũng đạp xe vòng đường đê, xa hơn hai cây số, để khỏi phải nhìn thấy khúc sông ấy.',
      draw(k) {
        if (k.t < k.cue('c')) { duongDe(k, { time: 'day' }); ch(k, 960, 960, 400, { ...QUAN, face: after(k, 'b') ? 'blank' : 'happy', arms: 'down' }); shade(k, 0.3, [DAY], { vig: 0.4 }); if (!after(k, 'b')) cold(k, 0.35); return; }
        duongDe(k, { time: 'day' });
        dollBike(k, k.lerp(-200, 1500, k.at('c', 9, 'linear')), 980, 400, { rider: { ...QUAN, face: 'blank' } });
        shade(k, 0.3, [DAY], { vig: 0.4 });
        tag(k, 'ĐƯỜNG ĐÊ · XA HƠN 2 CÂY SỐ', 'c');
      },
    },

    // ===== CHƯƠNG 2 =====
    {
      chapter: 'Ba điều dặn',
      say: '{a}Hè năm sau, lên lớp chín, chúng tôi phải đi học thêm hè, ôn trước cho kỳ thi vào cấp ba. Tối nào cũng học ở phòng cuối dãy tầng ba trường cấp hai. {b}Hôm ấy, mất điện cả xã. Thầy Bình thắp cho chúng tôi một cây nến, dặn tự ôn đến chín giờ, rồi đạp xe về trước vì nhà có việc. {c}Mấy đứa nhà xa xin về theo. Trong lớp còn lại bốn đứa: tôi, Quân, thằng Hải còi, và cái Linh.',
      sfx: [['click', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { cls(k, { power: 1, kids: true, faces: { linh: 'calm', quan: 'blank', nam: 'calm', hai: 'calm' } }); chapter(k, 2, 'Ba điều dặn'); return; }
        if (k.t < k.cue('c')) { cls(k, { kids: false }); ch(k, 1300, 900, 420, { ...THAY_BINH, face: 'calm', arms: 'point', talk: 0.3 }); shade(k, 0.3, [candleLight(960, 752)], { vig: 0.3 }); tag(k, 'MẤT ĐIỆN CẢ XÃ', 'b'); return; }
        cls(k, { faces: { linh: 'smug', quan: 'blank', nam: 'calm', hai: 'calm' } });
        tag(k, 'TÔI · QUÂN · HẢI · LINH', 'c');
      },
    },
    {
      say: '{a}Cái Linh có bà chị họ học trên Hà Nội. Nó lôi trong cặp ra một tờ giấy đã kẻ sẵn: đủ các chữ cái, mười chữ số, hai chữ có và không, ở giữa là một vòng tròn. {b}Nó đặt lên đó một đồng xu năm trăm, bảo: chơi cầu cơ đi, chị tao bảo cái này linh lắm.',
      draw(k) {
        if (k.t < k.cue('a', 4)) { cls(k, { faces: { linh: 'happy', quan: 'blank', nam: 'calm', hai: 'shock' }, talk: { linh: 0.3 } }); return; }
        brd(k, '', 0, 1, { free: true, pos: boardPos('.'), hands: false });
        quote(k, '"Chơi cầu cơ đi."', 'b', { color: AMBER });
      },
    },
    {
      say: '{a}Linh bảo, chơi cầu cơ có ba điều phải nhớ. {r1}Một, không được hỏi ngày chết của bất cứ ai. {r2}Hai, khi chưa tiễn vong về, không đứa nào được buông tay khỏi đồng xu. {r3}Ba, không được chơi vào đêm rằm. {b}Thằng Hải hỏi: hôm nay âm lịch ngày bao nhiêu? Không đứa nào biết.',
      sfx: [['gong', 'r3', 0.2]],
      draw(k) {
        if (k.t < k.cue('b')) { black(k); rules(k, 960, 540, [['1. Không hỏi ngày chết của ai.', 'r1'], ['2. Chưa tiễn vong, không buông tay.', 'r2'], ['3. Không chơi vào đêm rằm.', 'r3']], { cue: 'a', w: 1300 }); shade(k, 0.35, [{ x: 960, y: 540, r: 800, warm: 0.8, flicker: 1 }], { vig: 0.5 }); return; }
        zoom(k, 1300, 650, 1.6, () => cls(k, { faces: { linh: 'calm', quan: 'blank', nam: 'calm', hai: 'fear' }, talk: { hai: 0.3 } }));
        quote(k, 'Hôm nay âm lịch ngày bao nhiêu?', 'b', { color: COLD });
      },
    },
    {
      say: '{a}Quân không chịu chơi. Nó ngồi xa, cúi mặt vào quyển sách. Linh trêu: {q}to xác thế mà sợ à. {b}Quân im một lúc rất lâu. Rồi nó kéo ghế lại, đặt ngón tay lên đồng xu, cạnh ngón tay tôi. {c}Ngón tay nó lạnh ngắt, và run.',
      draw(k) {
        if (k.t < k.cue('b')) { lopHoc(k, {}); ch(k, 300, 900, 380, { ...QUAN, view: 'side', action: 'sit', face: 'blank', arms: { r: [[10, 8], [16, 6]] } }); deskFront(k, {}); ch(k, 820, 880, 340, { ...LINH, action: 'sit', face: 'smug', arms: 'point', talk: after(k, 'q') ? 0.4 : 0 }); shade(k, 0.8, [candleLight(960, 752), { x: 300, y: 640, r: 260 }], { vig: 0.45 }); quote(k, '"To xác thế mà sợ à."', 'q', { color: AMBER }); return; }
        brd(k, '', 0, 1, { free: true, pos: boardPos('.') });
        quote(k, 'Ngón tay nó lạnh ngắt, và run.', 'c', { color: COLD });
      },
    },
    {
      say: '{a}Linh khấn, giọng nó run run: {q}hồn nào ở quanh đây, nếu có thì về với chúng con. {b}Đồng xu nằm im rất lâu. Ngoài cửa sổ, gió thổi qua rặng tre nghe rào rào. {c}Rồi ngọn nến bỗng ngả rạp xuống, về phía cửa sổ, như có ai vừa thở vào. Đồng xu trượt đi, chậm chạp, dừng ở chữ có. {d}Và cả phòng học trên tầng ba bỗng sực lên mùi bùn sông.',
      sfx: [['wind', 'b', 0.35], ['scratch', ['c', 3], 0.3]],
      draw(k) {
        if (k.t < k.cue('c', 3)) { zoom(k, 960, 640, 1.5, () => cls(k, { lean: after(k, 'c') ? Math.min(1, (k.t - k.cue('c')) / 0.4) * 0.9 : Math.sin(k.t * 2) * 0.05, faces: { linh: 'fear', quan: 'blank', nam: 'fear', hai: 'fear' }, talk: { linh: after(k, 'q') && !after(k, 'b') ? 0.3 : 0 } })); return; }
        brd(k, '+', k.cue('c', 3), 2);
        quote(k, 'CÓ', k.cue('c', 4.5), { color: AMBER, size: 70, until: 'd' });
        quote(k, 'Phòng học sực lên mùi bùn sông.', 'd', { color: COLD });
      },
    },

    // ===== CHƯƠNG 3 =====
    {
      chapter: 'Có người đứng nhìn',
      say: '{a}Linh hỏi: {q}bạn tên gì? {b}Đồng xu chạy đến chữ tờ. Rồi chữ u. Rồi nờ. Rồi gờ. {c}Không đứa nào nói gì. Thằng Hải bảo đứa nào đẩy thì thôi đi. Không ai đẩy cả. Bốn ngón tay chỉ đặt hờ lên đồng xu, và tôi thấy rõ, ngón tay của Quân đang run bần bật.',
      sfx: [['heartbeat', 'c', 0.35]],
      draw(k) {
        brd(k, 'TUNG', k.cue('b', 0.3), 1.0, { from: '+' });
        chapter(k, 3, 'Có người đứng nhìn');
        quote(k, '"Bạn tên gì?"', 'q', { color: PAPER, until: 'b' });
        quote(k, 'T · U · N · G', k.cue('b', 4.5), { color: AMBER, size: 64 });
      },
    },
    {
      say: '{a}Tôi không tin. Tôi hỏi: {q}nếu là Tùng thật, thì gọi tôi bằng cái tên chỉ mày gọi. {b}Đồng xu đứng yên một lúc, rồi đi rất nhanh. Nờ. A. Mờ. Rờ. O. Mờ. {c}Nam Ròm. Cái tên ấy, ngoài tôi ra, chỉ có nó biết.',
      sfx: [['stinger', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { zoom(k, 560, 640, 1.8, () => cls(k, { faces: { nam: 'angry', linh: 'fear', quan: 'sad', hai: 'fear' }, talk: { nam: after(k, 'q') ? 0.4 : 0 } })); return; }
        brd(k, 'NAMROM', k.cue('b', 1.6), 0.55, { from: 'G' });
        quote(k, 'NAM RÒM', 'c', { color: AMBER, size: 70 });
      },
    },
    {
      say: '{a}Linh hỏi tiếp, giọng lạc đi: {q}Tùng ơi, mày muốn gì? {b}Đồng xu chạy một vòng quanh tờ giấy, rồi bắt đầu dừng ở từng chữ. {c}Có người đứng nhìn.',
      sfx: [['stinger', 'c', 0.5]],
      draw(k) {
        brd(k, 'CONGUOIDUNGNHIN', k.cue('b', 2), 0.42, { from: 'M' });
        quote(k, '"Tùng ơi, mày muốn gì?"', 'q', { color: PAPER, until: 'b' });
        quote(k, 'CÓ NGƯỜI ĐỨNG NHÌN', 'c', { color: AMBER, size: 64 });
      },
    },
    {
      say: '{a}Rồi nó chạy tiếp, không ai hỏi: dép ở gốc sung. {b}Ở bến Đống, sát mép nước, có một cây sung già, rễ trồi lên như những ngón tay. Chúng tôi vẫn hay ngồi ở đấy câu cá.',
      draw(k) {
        if (k.t < k.cue('b')) { brd(k, 'DEPOGOCSUNG', k.cue('a', 0.3), 0.32, { from: 'N' }); quote(k, 'DÉP Ở GỐC SUNG', k.cue('a', 3.5), { color: AMBER, size: 64 }); return; }
        zoom(k, BEN.sung.x + 150, BEN.sung.y - 260, 1.6, () => ben(k, { time: 'dusk' })); shade(k, 0.5, [{ x: 500, y: 600, r: 700, warm: 1 }], { vig: 0.5 });
      },
    },
    {
      say: '{a}Tôi ngẩng lên. Ánh nến hắt bóng chúng tôi lên bức tường vôi phía sau. {b}Bốn đứa ngồi quanh bàn. {c}Tôi đếm được năm cái bóng.',
      sfx: [['heartbeat', 'c', 0.5]],
      draw(k) {
        zoom(k, 960, 480, after(k, 'c') ? 1.4 : 1.15, () => cls(k, { fifth: k.at('c', 1.2), faces: { linh: 'fear', quan: 'sad', nam: 'shock', hai: 'fear' } }));
        quote(k, 'Năm cái bóng.', 'c', { color: COLD, size: 64 });
      },
    },
    {
      say: '{a}Thằng Hải là đứa nhát nhất. Nó lắp bắp hỏi một câu mà Linh đã cấm: {q}bao giờ thì đến lượt đứa tiếp theo? {b}Đồng xu lao về phía hàng số. Một. Năm. Rồi bảy. {c}Hải giật tay ra. Đồng xu vẫn trượt thêm một đoạn, không ai chạm vào, rồi rơi xuống đất. Ngọn nến phụt tắt.',
      sfx: [['stinger', 'b', 0.35], ['click', ['c', 2.5], 0.4], ['wind', ['c', 3.5], 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { zoom(k, 1380, 640, 1.8, () => cls(k, { faces: { hai: 'fear', nam: 'fear', linh: 'shock', quan: 'blank' }, talk: { hai: after(k, 'q') ? 0.4 : 0 } })); quote(k, '"Bao giờ đến lượt đứa tiếp theo?"', 'q', { color: AMBER }); return; }
        if (k.t < k.cue('c', 3.5)) { const freeT = k.cue('c', 1); brd(k, '157', k.cue('b', 0.6), 0.9, { from: 'N', noHai: after(k, 'c'), lift: after(k, 'c', 0.5) ? (k.t - k.cue('c', 0.5)) / 0.5 : 0 }); quote(k, '1 · 5 · 7', k.cue('b', 3), { color: AMBER, size: 64 }); return; }
        black(k); candle(k, 960, 760, 2, { on: 0 });
      },
    },
    {
      say: '{a}Lúc điện có lại, cửa sổ phòng học mở toang, dù tôi nhớ chắc nó đã cài. {b}Trên nền gạch, từ cửa sổ đến chân bàn, có một hàng dấu chân trần, nhỏ, ướt sũng. {c}Phòng học ấy ở tầng ba.',
      sfx: [['click', 'a', 0.4], ['drip', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { cls(k, { power: 1, open: 1, candle: 0, faces: { linh: 'shock', quan: 'shock', nam: 'shock', hai: 'cry' } }); return; }
        zoom(k, 1250, 930, 1.7, () => cls(k, { power: 1, open: 1, candle: 0, kids: false, prints: k.at('b', 3, 'linear') }));
        quote(k, 'Phòng học ấy ở tầng ba.', 'c', { color: AMBER });
      },
    },

    // ===== CHƯƠNG 4 =====
    {
      chapter: 'Đừng thưa',
      say: '{a}Đêm ấy, tôi nằm cạnh bà nội, không sao ngủ được. Gần nửa đêm, ngoài cửa sổ có hai tiếng huýt sáo ngắn. Rồi tiếng gọi khẽ: {q}Nam Ròm ơi, ra tắm sông. {b}Tôi suýt thưa. Bà nội đã tỉnh từ bao giờ, lấy tay bịt chặt miệng tôi. Tay bà lạnh, mà run. {c}Sáng ra, dưới cửa sổ có một vũng nước, lẫn mấy cọng rong sông. Đêm ấy trời không mưa.',
      sfx: [['heartbeat', 'q', 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) {
          buong(k, { time: 'night' });
          lie(k, 720, 740, 330, { ...NAM, top: '#d8d0bc', topStyle: 'tee', face: after(k, 'q') ? 'fear' : 'blank' });
          lie(k, 1190, 740, 360, { ...BA_NOI, hat: null, face: after(k, 'b') ? 'fear' : 'sleep' });
          net(k, 0.22);
          shade(k, 0.86, [{ x: 1450, y: 400, r: 320 }, { x: 900, y: 700, r: 300 }], { vig: 0.5 });
          chapter(k, 4, 'Đừng thưa');
          quote(k, '"Nam Ròm ơi, ra tắm sông."', 'q', { color: COLD, until: 'b' });
          quote(k, 'Đừng thưa.', 'b', { color: AMBER });
          return;
        }
        buong(k, { time: 'day' });
        const { ctx } = k; ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = '#6a7a80'; ctx.beginPath(); ctx.ellipse(1450, 930, 220, 30, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#3a5a3a'; ctx.lineWidth = 5; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(1360 + i * 50, 930); ctx.quadraticCurveTo(1380 + i * 50, 900, 1410 + i * 50, 935); ctx.stroke(); } ctx.restore();
        shade(k, 0.3, [DAY], { vig: 0.4 });
        quote(k, 'Đêm ấy trời không mưa.', k.cue('c', 3), { color: AMBER });
      },
    },
    {
      say: '{a}Thằng Hải ốm liền ba hôm, sốt mê man, cứ kêu lạnh. Mẹ nó bảo cái khăn đắp trán lúc nào cũng ướt sũng, vắt bao nhiêu cũng không khô. {b}Lúc tôi đến thăm, nó kéo tay tôi, thì thào: lúc ấy tao không định buông. {c}Tao thấy trên đồng xu có thêm một ngón tay. Ngón thứ năm. Nó lạnh, và ướt, và nó chạm vào tay tao.',
      sfx: [['drip', 'a', 0.3], ['stinger', 'c', 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) { buong(k, { time: 'day', wall: '#cbbf9c' }); lie(k, 800, 740, 300, { ...HAI, top: '#d8d0bc', topStyle: 'tee', face: 'fear', talk: after(k, 'b') ? 0.3 : 0 }); ch(k, 1150, 880, 340, { ...NAM, view: 'side', flip: true, face: 'sad', arms: 'hold' }); const { ctx } = k; ctx.fillStyle = '#e8eef0'; ctx.fillRect(610, 700, 70, 22); shade(k, 0.45, [DAY], { vig: 0.4 }); return; }
        brd(k, '', 0, 1, { free: true, pos: boardPos('.'), fifth: k.at('c', 1.5) });
        quote(k, 'Ngón tay thứ năm.', 'c', { color: COLD, size: 64 });
      },
    },
    {
      say: '{a}Sáng thứ hai, bác Mão bảo vệ trường đi kể khắp nơi. Đêm nào bác cũng nghe có tiếng chân trần chạy lên cầu thang, lên tận tầng ba, rồi tiếng phấn viết lạch cạch trên bảng. {b}Sáng ra, bác mở cửa phòng học cuối dãy. Trên bảng có hai chữ phấn, nét nguệch ngoạc như trẻ con viết: Nam Ròm.',
      sfx: [['creak', 'a', 0.3], ['stinger', ['b', 3], 0.45]],
      draw(k) {
        if (k.t < k.cue('b', 3)) { cls(k, { power: 1, kids: false, candle: 0 }); ch(k, 1300, 905, 420, { kind: 'old', skin: '#c89c7c', hair: 'buzz', hairColor: '#8a8078', top: '#5e6a4a', topStyle: 'army', pants: '#3a3430', face: 'fear', arms: 'point', talk: after(k, 'a', 1) ? 0.4 : 0 }); shade(k, 0.3, [DAY], { vig: 0.4 }); return; }
        zoom(k, 880, 400, 1.6, () => { lopHoc(k, { power: 1, chalk: 'NAM RÒM', chalkP: k.at(k.cue('b', 3), 1.5, 'linear') }); });
        shade(k, 0.3, [DAY], { vig: 0.45 });
      },
    },
    {
      say: '{a}Quân thì không ốm. Nhưng mẹ nó kể, sáng nào ra mở cửa cũng thấy đôi dép của Quân ở bậc thềm ướt sũng, lẫn rong. {b}Tôi sang tìm. Quân ngồi trên giường, mắt thâm quầng, không nhìn tôi. Nó chỉ hỏi một câu: {q}đêm nào mày có nghe nó gọi không? {c}Tôi lắc đầu. Quân bảo, đêm nào nó cũng nghe. Không phải gọi tên. Chỉ một câu: Quân ơi, kéo tao.',
      sfx: [['drip', 'a', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { buong(k, { time: 'day', wall: '#c8bc9c' }); const { ctx } = k; ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = '#5a6a6a'; ctx.beginPath(); ctx.ellipse(1450, 935, 160, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); ch(k, 900, 900, 400, { ...ME_QUAN, face: 'fear', arms: 'point', talk: 0.35 }); shade(k, 0.35, [DAY], { vig: 0.4 }); return; }
        buong(k, { time: 'day', wall: '#c8bc9c' });
        ch(k, 820, 880, 380, { ...QUAN, top: '#c8b890', topStyle: 'tee', action: 'sit', face: 'blank', arms: 'hold', talk: after(k, 'q') && !after(k, 'c') ? 0.35 : 0 });
        ch(k, 1250, 900, 340, { ...NAM, view: 'side', flip: true, face: 'fear', arms: 'down' });
        shade(k, 0.5, [DAY], { vig: 0.45 });
        quote(k, '"Đêm nào mày có nghe nó gọi không?"', 'q', { color: PAPER, until: 'c' });
        quote(k, '"Quân ơi, kéo tao."', k.cue('c', 4), { color: COLD });
      },
    },
    {
      say: '{a}Đêm thứ tư, mẹ Hải hớt hải chạy đi tìm con lúc hai giờ sáng. Người ta thấy nó đứng giữa cái ao sau nhà, nước ngập đến đầu gối, mắt mở trừng trừng. {b}Bố nó bế lên, nó không giãy. Nó chỉ lẩm bẩm mãi một câu: {q}chưa đủ. Chưa đủ người.',
      sfx: [['heartbeat', 'a', 0.4], ['stinger', 'q', 0.45]],
      draw(k) {
        benDong(k, { time: 'night', sung: false, swirl: 0 });
        const { ctx } = k; ctx.save(); ctx.beginPath(); ctx.rect(-100, -100, 2200, 945); ctx.clip();
        ch(k, 1000, 875, 330, { ...HAI, top: '#d8d0bc', topStyle: 'tee', face: 'blank', arms: 'down', shadow: false, talk: after(k, 'q') ? 0.3 : 0 });
        ctx.restore();
        ch(k, 600, 960, 400, { ...ME_QUAN, top: '#7a6a5a', face: 'fear', arms: 'raise' });
        shade(k, 0.72, [MOON, { x: 1000, y: 650, r: 260 }], { vig: 0.5 });
        tag(k, '2 GIỜ SÁNG', 'a');
        quote(k, '"Chưa đủ. Chưa đủ người."', 'q', { color: COLD });
      },
    },
    {
      say: '{a}Chiều hôm sau, tôi với Linh đạp xe ra bến Đống. Quân không chịu đi. {b}Dưới gốc sung, trong một hốc rễ sâu, có một chiếc dép tổ ong màu xanh, chân phải, sợi dây thép buộc quai đã tuột một đầu. {c}Đã hơn một năm. Chiếc dép vẫn ướt, như vừa có người xỏ chân đi từ dưới nước lên.',
      sfx: [['drip', 'c', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { duongDe(k, { time: 'dusk' }); const x = k.lerp(-300, 1600, k.at('a', 7, 'linear')); dollBike(k, x, 975, 380, { rider: { ...NAM, face: 'fear' } }); dollBike(k, x - 330, 985, 360, { rider: { ...LINH, face: 'fear' }, frame: 'nu' }); shade(k, 0.4, [{ x: 1500, y: 400, r: 1300, warm: 1 }], { vig: 0.4 }); return; }
        zoom(k, BEN.sung.x + 80, BEN.sung.y - 40, 2.3, () => { ben(k, { time: 'dusk' }); dep(k, BEN.sung.x + 60, BEN.sung.y + 10, 0.45, { r: 1.2, wet: after(k, 'c') ? 1 : 0.3 }); });
        shade(k, 0.45, [{ x: 800, y: 600, r: 700, warm: 1 }], { vig: 0.5 });
        quote(k, 'Đã hơn một năm. Chiếc dép vẫn ướt.', 'c', { color: AMBER });
      },
    },
    {
      say: '{a}Đúng lúc ấy, bà Thoa ra bến gọi con. Bà nhìn thấy chiếc dép trên tay tôi. Bà giật lấy, áp vào ngực, run lên: {q}dép của nó. Dép của thằng Tùng nhà tôi. {b}Rồi bà hỏi một câu mà tôi không trả lời được: {q2}cả làng mò ba ngày không thấy. Đứa nào biết nó ở đây?',
      draw(k) {
        ben(k, { time: 'dusk' });
        ch(k, 700, 950, 330, { ...NAM, face: 'fear', arms: 'hold' }); ch(k, 470, 960, 320, { ...LINH, face: 'fear', arms: 'chest' });
        ch(k, 1000, 950, 420, { ...BA_THOA, face: after(k, 'b') ? 'angry' : 'cry', arms: 'chest', talk: after(k, 'q') ? 0.4 : 0 });
        shade(k, 0.45, [{ x: 1300, y: 500, r: 1200, warm: 1 }], { vig: 0.45 });
        quote(k, '"Dép của thằng Tùng nhà tôi."', 'q', { color: AMBER, until: 'b' });
        quote(k, '"Đứa nào biết nó ở đây?"', 'q2', { color: COLD });
      },
    },
    {
      say: '{a}Tối ấy, Linh chạy sang nhà tôi, mặt cắt không còn hột máu. Tờ giấy cầu cơ, nó đã gấp lại, kẹp vào sách, cất trong cặp. Sáng ra, tờ giấy ướt nhèm, bốc mùi bùn. {b}Và đồng xu năm trăm, cái đồng xu đã rơi xuống gầm bàn hôm chơi cầu cơ, không đứa nào dám nhặt, nằm ngay ngắn trên tờ giấy, ở chữ có.',
      sfx: [['stinger', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('b')) { buong(k, { time: 'night' }); ch(k, 900, 900, 340, { ...LINH, face: 'fear', arms: 'chest', talk: 0.3 }); ch(k, 600, 900, 340, { ...NAM, top: '#d8d0bc', topStyle: 'tee', face: 'fear', arms: 'down' }); shade(k, 0.7, [{ x: 760, y: 500, r: 600, warm: 0.8 }], { vig: 0.45 }); return; }
        const { ctx } = k; brd(k, '', 0, 1, { free: true, pos: boardPos('+'), hands: false, wet: 1 });
        quote(k, 'Đồng xu nằm ở chữ CÓ.', k.cue('b', 3), { color: AMBER });
      },
    },

    // ===== CHƯƠNG 5 =====
    {
      chapter: 'Người đứng nhìn',
      say: '{a}Bà nội tôi nghe chuyện, im lặng rất lâu. Rồi bà bảo: {q}cầu cơ không gọi được người mình muốn gọi. Đứa nào đói thì đứa ấy về. {b}Gọi về mà không tiễn đi, thì nó ở lại. Phải ngồi lại đủ người, đúng chỗ ấy, tiễn cho tử tế.',
      draw(k) {
        buong(k, { time: 'day' });
        ch(k, 1050, 880, 400, { ...BA_NOI, face: 'blank', arms: 'hold', talk: after(k, 'q') ? 0.3 : 0 });
        ch(k, 650, 900, 330, { ...NAM, face: 'fear', arms: 'down' }); ch(k, 420, 905, 320, { ...LINH, face: 'fear', arms: 'chest' });
        shade(k, 0.35, [DAY], { vig: 0.4 });
        chapter(k, 5, 'Người đứng nhìn');
        quote(k, '"Đứa nào đói thì đứa ấy về."', 'q', { color: AMBER });
      },
    },
    {
      say: '{a}Bà dẫn chúng tôi đến ông Khiêm, thầy cúng trong làng. Ông nghe xong, chỉ hỏi một câu: {q}hôm ấy là đêm rằm phải không? {b}Linh lật lịch. Hôm ấy là rằm tháng Sáu. {c}Ông bảo, phải làm trước rằm tháng Bảy. Qua rằm tháng Bảy, ông không dám chắc.',
      sfx: [['gong', 'b', 0.25]],
      draw(k) {
        nhaKhiem(k);
        ch(k, 1350, 900, 400, { ...ONG_KHIEM, view: 'side', flip: true, face: 'angry', arms: 'hold', talk: after(k, 'q') ? 0.3 : 0 });
        ch(k, 520, 905, 330, { ...NAM, view: 'side', face: 'fear', arms: 'down' }); ch(k, 300, 905, 320, { ...LINH, view: 'side', face: 'fear', arms: 'chest' });
        shade(k, 0.6, altarLights, { vig: 0.45 });
        quote(k, 'Rằm tháng Sáu.', 'b', { color: AMBER, until: 'c' });
        quote(k, 'Phải xong trước rằm tháng Bảy.', 'c', { color: COLD });
      },
    },
    {
      say: '{a}Tối thứ bảy, chúng tôi lên lại phòng học tầng ba. Đủ bốn đứa. Thằng Hải vẫn còn sốt, mẹ nó phải đèo đến. {b}Ông Khiêm không chịu vào trong. Ông đứng ngoài hành lang, cắm ba nén hương lên lan can, bảo: tiễn xong thì gọi ông. {c}Chúng tôi đặt tay lên đồng xu. Lần này nó không đợi Linh khấn. Nó chạy ngay. Quờ. U. A. Nờ.',
      sfx: [['stinger', ['c', 4], 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { cls(k, { faces: { linh: 'fear', quan: 'blank', nam: 'fear', hai: 'sad' } }); return; }
        if (k.t < k.cue('c')) { hanhLang(k); ch(k, 1250, 900, 400, { ...ONG_KHIEM, face: 'blank', arms: 'hold' }); shade(k, 0.7, [{ x: 1000, y: 600, r: 300, warm: 1 }, { x: 330, y: 380, r: 380, warm: 1 }, { x: 1560, y: 150, r: 600 }], { vig: 0.45 }); return; }
        brd(k, 'QUAN', k.cue('c', 3), 0.75);
        quote(k, 'Q · U · Â · N', k.cue('c', 6), { color: AMBER, size: 64 });
      },
    },
    {
      say: '{a}Quân rụt tay lại như bị bỏng. Rồi nó khóc. Lần đầu tiên từ mùa hè năm ấy, tôi thấy thằng Quân khóc. {b}Nó kể. Hôm ấy, hai đứa ra gốc sung câu cá. Trời nóng, Tùng rủ xuống tắm. Không phải Tùng đi một mình. Sợi dây thép buộc quai dép phải lại tuột, Tùng tháo ra, đưa Quân: mày giữ hộ tao. Rồi nó lội xuống, chân trái vẫn đi dép. {c}Tùng bơi ra giữa, đến gần vòng xoáy thì bị hút xuống. Tùng ngoi lên, gọi: {q}Quân ơi, kéo tao.',
      sfx: [['stinger', 'b', 0.4]],
      draw(k) {
        if (k.t < k.cue('c')) { zoom(k, 1100, 600, 1.8, () => cls(k, { faces: { quan: 'cry', linh: 'shock', nam: 'shock', hai: 'fear' }, talk: { quan: after(k, 'b') ? 0.35 : 0 } })); quote(k, 'Không phải Tùng đi một mình.', k.cue('b', 2), { color: AMBER }); return; }
        ben(k, { time: 'day', swirl: 1 }); cold(k, 0.55);
        const { ctx } = k, t = k.t - k.cue('c'); for (let i = 0; i < 3; i++) { const u = ((t * 0.5 + i / 3) % 1); ctx.save(); ctx.globalAlpha = (1 - u) * 0.6; ctx.strokeStyle = '#eef'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(BEN.swirl.x, BEN.swirl.y, 30 + u * 160, 8 + u * 40, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
        shade(k, 0.3, [DAY], { vig: 0.5 });
        quote(k, '"Quân ơi, kéo tao."', 'q', { color: COLD, size: 60 });
      },
    },
    {
      say: '{a}Quân bơi kém. Nó đứng dưới gốc sung, tay vẫn cầm chiếc dép Tùng nhờ nó giữ hộ, chân không nhúc nhích được. {b}Nó đứng nhìn. Nhìn Tùng ngoi lên hai lần nữa, rồi không ngoi lên nữa. {c}Rồi nó nhét chiếc dép vào hốc rễ sung, như thể giấu nó đi thì không ai biết mình đã ở đấy, vác cái cần câu của Tùng chạy một mạch về nhà, trùm chăn kín đầu. Nó không nói với ai. Sáng hôm sau, người ta vớt được Tùng.',
      draw(k) {
        ben(k, { time: 'day', swirl: after(k, 'b', 3) ? 0.3 : 1 });
        if (k.t < k.cue('c')) ch(k, BEN.sung.x + 160, 950, 330, { ...QUAN, top: '#c8b890', topStyle: 'tee', view: 'side', face: 'fear', arms: 'chest' });
        else ch(k, k.lerp(BEN.sung.x + 160, -200, k.at('c', 2.5, 'in')), 950, 330, { ...QUAN, top: '#c8b890', topStyle: 'tee', view: 'side', flip: true, action: 'walk', face: 'cry', arms: 'cover' });
        cold(k, 0.55); shade(k, 0.3, [DAY], { vig: 0.5 });
        quote(k, 'Nó đứng nhìn.', 'b', { color: AMBER, until: 'c' });
      },
    },
    {
      say: '{a}Quân bảo, suốt một năm ấy, đêm nào nó cũng mơ cùng một giấc mơ. Tùng đứng dưới gốc sung, người ướt sũng, chìa tay ra cho nó. {b}Trong mơ, Quân chưa bao giờ dám nắm lấy bàn tay ấy. {c}Nó không biết Tùng chìa tay ra để kéo nó xuống, hay để nó kéo lên.',
      draw(k) {
        ben(k, { time: 'night', swirl: 0.7 });
        const { ctx } = k; ctx.save(); ctx.globalAlpha = 0.85; ctx.filter = 'brightness(0.25) saturate(0.4)'; ch(k, BEN.sung.x + 140, 950, 300, { ...TUNG, face: 'blank', arms: 'point' }); ctx.restore();
        ch(k, 1000, 955, 370, { ...QUAN, top: '#c8b890', topStyle: 'tee', view: 'side', flip: true, face: 'fear', arms: 'back' });
        cold(k, 0.5); shade(k, 0.66, [MOON, { x: BEN.sung.x + 200, y: 760, r: 300 }], { vig: 0.5 });
        quote(k, 'Kéo xuống, hay để nó kéo lên?', 'c', { color: COLD });
      },
    },
    {
      say: '{a}Phòng học im phăng phắc. Rồi đồng xu trượt đi, chậm lắm: tao không giận. {b}Quân gục xuống bàn mà khóc. Linh cũng khóc. Tôi tưởng đến đó là hết. {c}Nhưng đồng xu chạy tiếp: lạnh quá. {d}Rồi: chưa đi được. Thiếu một người.',
      sfx: [['stinger', 'd', 0.5]],
      draw(k) {
        if (k.t < k.cue('b')) { brd(k, 'TAOKHONGGIAN', k.cue('a', 2), 0.32, { from: 'N' }); quote(k, 'TAO KHÔNG GIẬN', k.cue('a', 5.5), { color: AMBER }); return; }
        if (k.t < k.cue('c')) { cls(k, { faces: { quan: 'cry', linh: 'cry', nam: 'sad', hai: 'sad' } }); return; }
        if (k.t < k.cue('d')) { brd(k, 'LANHQUA', k.cue('c', 0.5), 0.4, { from: 'N' }); quote(k, 'LẠNH QUÁ', k.cue('c', 3), { color: COLD }); return; }
        brd(k, 'CHUADIDUOCTHIEUMOTNGUOI', k.cue('d', 0.3), 0.27, { from: 'A' });
        quote(k, 'CHƯA ĐI ĐƯỢC. THIẾU MỘT NGƯỜI.', k.cue('d', 3.5), { color: AMBER, size: 56 });
      },
    },
    {
      say: '{a}Ngoài hành lang, ông Khiêm quát vọng vào: {q}tiễn đi! Tiễn ngay! {b}Linh lắp bắp đọc lời tiễn. Cả bốn đứa nhấc tay khỏi đồng xu cùng một lúc, đúng như lời dặn. {c}Đồng xu không có ai chạm vào, vẫn tự trượt về phía hàng số. Một. Năm. Bảy. {d}Rằm tháng Bảy.',
      sfx: [['gong', 'a', 0.3], ['heartbeat', 'c', 0.45], ['stinger', 'd', 0.5]],
      draw(k) {
        if (k.t < k.cue('b')) { hanhLang(k); ch(k, 1250, 900, 400, { ...ONG_KHIEM, face: 'angry', arms: 'point', talk: 0.6 }); shade(k, 0.7, [{ x: 1000, y: 600, r: 300, warm: 1 }, { x: 330, y: 380, r: 380, warm: 1 }], { vig: 0.45 }); quote(k, '"Tiễn đi! Tiễn ngay!"', 'q', { color: AMBER }); return; }
        brd(k, '157', k.cue('c', 1), 1.0, { from: 'I', lift: after(k, 'b', 2) ? Math.min(1, (k.t - k.cue('b', 2)) / 0.5) : 0 });
        quote(k, 'RẰM THÁNG BẢY', 'd', { color: AMBER, size: 70 });
      },
    },

    // ===== CHƯƠNG 6 =====
    {
      chapter: 'Rằm tháng Bảy',
      say: '{a}Bà nội bảo, ở làng tôi, người chết đuối không đi ngay được. Vong ở lại dưới nước, đợi. Đợi có người xuống thế chỗ thì mới đi. {b}Các cụ gọi là ma da. {c}Tôi nghĩ mãi về hai chữ thiếu một người. Thứ về qua đồng xu là thằng Tùng, muốn nghe Quân nói thật một lần? Hay là cái bến Đống, đang gọi người thế?',
      draw(k) {
        if (k.t < k.cue('c')) { ben(k, { time: 'night', swirl: 1 }); shade(k, 0.7, [MOON, { x: BEN.swirl.x, y: BEN.swirl.y, r: 260 }], { vig: 0.5 }); chapter(k, 6, 'Rằm tháng Bảy'); quote(k, 'Ma da', 'b', { color: COLD, size: 70 }); return; }
        buong(k, { time: 'night' }); ch(k, 800, 900, 340, { ...NAM, top: '#d8d0bc', topStyle: 'tee', view: 'side', face: 'blank', arms: 'hold' });
        shade(k, 0.82, [{ x: 1450, y: 400, r: 300 }, { x: 800, y: 600, r: 300 }], { vig: 0.5 });
        quote(k, 'Thằng Tùng, hay bến Đống gọi người thế?', k.cue('c', 4), { color: AMBER });
      },
    },
    {
      say: '{a}Trưa rằm tháng Bảy, Quân đạp xe sang nhà tôi. Nó dựng xe ở cổng, đưa cho tôi cái cần câu tre. Cái cần của Tùng, Quân giữ từ mùa hè năm ấy. {b}Nó bảo: {q}mày giữ hộ tao. {c}Đúng câu Tùng đã nói với nó, lúc đưa chiếc dép cho nó cầm, ở gốc sung.',
      sfx: [['stinger', 'c', 0.4]],
      draw(k) {
        duongDe(k, { time: 'day' });
        dollBike(k, 1450, 985, 380, { rider: null, kick: true });
        ch(k, 1150, 980, 400, { ...QUAN, view: 'side', flip: true, face: 'blank', arms: 'point', talk: after(k, 'q') && !after(k, 'c') ? 0.35 : 0 });
        ch(k, 760, 985, 350, { ...NAM, view: 'side', face: 'fear', arms: { r: [[10, 4], [20, -2]] } });
        const { ctx } = k; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(960, 820); ctx.quadraticCurveTo(900, 500, 820, 260); ctx.stroke(); ctx.strokeStyle = '#c8aa62'; ctx.lineWidth = 5; ctx.stroke();
        shade(k, 0.3, [DAY], { vig: 0.4 });
        quote(k, '"Mày giữ hộ tao."', 'q', { color: AMBER });
      },
    },
    {
      say: '{a}Rằm tháng Bảy năm ấy, nhà nào trong làng cũng cúng cô hồn. Chiều, bà Thoa vẫn ra bến gọi con như mọi ngày. {b}Tối ấy, cái Linh sợ, sang ngồi nhà tôi. Chín giờ, mẹ Quân chạy sang, chân không dép: {q}thằng Quân đâu? Xe đạp nó vẫn ở nhà, mà người thì không thấy. {c}Tôi biết nó ở đâu.',
      sfx: [['heartbeat', 'c', 0.45]],
      draw(k) {
        if (k.t < k.cue('b')) { ben(k, { time: 'dusk' }); ch(k, 760, 920, 420, { ...BA_THOA, view: 'side', face: 'sad', arms: 'raise', talk: 0.5 }); shade(k, 0.5, [{ x: 1300, y: 500, r: 1200, warm: 1 }], { vig: 0.45 }); tag(k, 'RẰM THÁNG BẢY', 'a'); return; }
        buong(k, { time: 'night' }); ch(k, 1050, 900, 400, { ...ME_QUAN, face: 'cry', arms: 'chest', talk: after(k, 'q') ? 0.5 : 0, noFeet: true }); ch(k, 650, 900, 340, { ...NAM, top: '#d8d0bc', topStyle: 'tee', face: after(k, 'c') ? 'angry' : 'fear', arms: 'down' });
        shade(k, 0.7, [{ x: 860, y: 500, r: 600, warm: 0.8 }], { vig: 0.45 });
        quote(k, '"Thằng Quân đâu?"', 'q', { color: AMBER, until: 'c' });
        quote(k, 'Tôi biết nó ở đâu.', 'c', { color: COLD });
      },
    },
    {
      say: '{a}Tôi với Linh chạy ra bến Đống. Trăng rằm sáng vằng vặc, mặt sông trắng như tấm bạc. {b}Quân đang lội ra giữa sông, nước ngập đến ngực. Bên cạnh nó, sát vai nó, có một cái bóng nhỏ hơn, thấp hơn, đang đi cùng. {c}Tôi gào tên Quân. Nó không quay lại. Nó đi thẳng về phía vòng xoáy.',
      sfx: [['wind', 'a', 0.3], ['stinger', 'b', 0.4]],
      draw(k) {
        ben(k, { time: 'night', swirl: 1 });
        const p = k.at('b', 12, 'linear'), qx = k.lerp(820, 1080, p);
        const { ctx } = k;
        // Quân lội nước (nửa người chìm) + bóng nhỏ đi cạnh
        ctx.save(); ctx.beginPath(); ctx.rect(-100, -100, 2200, 820); ctx.clip();
        ch(k, qx, 840, 380, { ...QUAN, view: 'side', face: 'blank', arms: 'down', shadow: false });
        if (after(k, 'b')) { ctx.globalAlpha = 0.75 * k.at('b', 2); ctx.filter = 'brightness(0.15)'; ch(k, qx + 70, 820, 260, { ...TUNG, view: 'side', face: 'blank', arms: 'down', shadow: false }); ctx.filter = 'none'; }
        ctx.restore();
        ch(k, 360, 960, 340, { ...NAM, view: 'side', face: 'shock', arms: 'point', talk: after(k, 'c') ? 0.7 : 0 }); ch(k, 170, 965, 320, { ...LINH, view: 'side', face: 'fear', arms: 'cover' });
        shade(k, 0.62, [MOON, { x: qx, y: 650, r: 260 }], { vig: 0.5 });
        quote(k, 'Một cái bóng nhỏ hơn, đi cùng.', k.cue('b', 4), { color: COLD, until: 'c' });
      },
    },
    {
      say: '{a}Rồi Quân chìm. Mặt nước khép lại, phẳng lặng như chưa từng có ai. Tôi đứng chết lặng trên bờ, ngay dưới gốc sung, đúng chỗ Quân đã đứng một năm trước. {b}Không biết bao lâu. Rồi mặt nước vỡ ra. Quân bị hất lên, như có ai đẩy từ dưới, dạt vào sát bờ, ho sặc sụa. {c}Trên bờ, bà Thoa đã đứng đó từ lúc nào. Bà ôm chiếc dép tổ ong xanh, nhìn xuống mặt nước, nói khẽ: {q}về thôi con.',
      sfx: [['stinger', 'b', 0.5]],
      draw(k) {
        ben(k, { time: 'night', swirl: after(k, 'b') ? 0.4 : 1 });
        if (k.t < k.cue('b')) { ch(k, BEN.sung.x + 120, 960, 340, { ...NAM, view: 'side', face: 'blank', arms: 'down' }); shade(k, 0.66, [MOON, { x: 500, y: 700, r: 300 }], { vig: 0.5 }); return; }
        const { ctx } = k; if (k.t < k.cue('b', 4)) { for (let i = 0; i < 4; i++) { const u = (((k.t - k.cue('b')) * 0.7 + i / 4) % 1); ctx.save(); ctx.globalAlpha = (1 - u) * 0.7; ctx.strokeStyle = '#eef'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(900, 840, 40 + u * 200, 10 + u * 40, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); } }
        lie(k, 900, 900, 330, { ...QUAN, face: 'shock' });
        ch(k, 600, 960, 340, { ...NAM, face: 'shock', arms: 'raise' });
        if (after(k, 'c')) ch(k, 1250, 950, 420, { ...BA_THOA, hat: null, view: 'side', flip: true, face: 'sad', arms: 'chest', talk: after(k, 'q') ? 0.3 : 0 });
        shade(k, 0.62, [MOON, { x: 900, y: 800, r: 420 }], { vig: 0.5 });
        quote(k, '"Về thôi con."', 'q', { color: AMBER });
      },
    },
    {
      say: '{a}Mấy hôm sau, Quân mới nói được. Nó bảo, lúc chìm xuống, có một bàn tay nắm cổ chân nó kéo xuống. {b}Rồi có một bàn tay khác, nhỏ hơn, đẩy nó lên. {c}Cả hai bàn tay đều lạnh như nhau.',
      sfx: [['stinger', 'c', 0.45]],
      draw(k) {
        const { ctx } = k; const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#2a3a40'); g.addColorStop(1, '#0a1014'); ctx.fillStyle = g; ctx.fillRect(-100, -100, 2200, 1300);
        for (let i = 0; i < 18; i++) { const u = ((k.t * 0.15 + k.rand(i)) % 1); ctx.fillStyle = 'rgba(200,220,230,0.25)'; ctx.beginPath(); ctx.arc(200 + k.rand(i + 7) * 1500, 1080 - u * 1100, 4 + k.rand(i + 2) * 6, 0, Math.PI * 2); ctx.fill(); }
        // hai bàn tay búp bê: một kéo xuống (to), một đẩy lên (nhỏ)
        const pull = k.at('a', 2), push = k.at('b', 2);
        if (pull) { ctx.save(); ctx.globalAlpha = pull; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 92; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(700, 1300); ctx.lineTo(760, 760); ctx.stroke(); ctx.strokeStyle = '#4a5a60'; ctx.lineWidth = 84; ctx.stroke(); ctx.fillStyle = '#9aa8ac'; ctx.beginPath(); ctx.arc(760, 740, 56, 0, Math.PI * 2); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#2c1f17'; ctx.stroke(); ctx.restore(); }
        if (push) { ctx.save(); ctx.globalAlpha = push; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 62; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1250, 1300); ctx.lineTo(1180, 820); ctx.stroke(); ctx.strokeStyle = '#a8b8c0'; ctx.lineWidth = 56; ctx.stroke(); ctx.fillStyle = '#b8c4c8'; ctx.beginPath(); ctx.arc(1180, 800, 40, 0, Math.PI * 2); ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#2c1f17'; ctx.stroke(); ctx.restore(); }
        shade(k, 0.4, [{ x: 960, y: 700, r: 800 }], { vig: 0.6 });
        quote(k, 'Một bàn tay kéo xuống.', 'a', { color: COLD, until: 'b', y: 200 });
        quote(k, 'Một bàn tay nhỏ hơn đẩy lên.', 'b', { color: AMBER, until: 'c', y: 200 });
        quote(k, 'Cả hai đều lạnh như nhau.', 'c', { color: PAPER, y: 200 });
      },
    },

    // ===== KẾT =====
    {
      chapter: 'Kết',
      say: '{a}Ông Khiêm làm lễ ở bến Đống ba ngày liền. Tờ giấy cầu cơ, ông đem đốt. Đồng xu năm trăm, ông thả xuống giữa vòng xoáy. {b}Năm sau, nhà Quân chuyển lên Hà Nội. Nghe nói bây giờ nó dạy bơi cho trẻ con ở một bể bơi trên ấy. Nó chưa bao giờ xuống sông.',
      draw(k) {
        if (k.t < k.cue('b')) { ben(k, { time: 'day', swirl: 0.6 }); ch(k, 760, 950, 420, { ...ONG_KHIEM, view: 'side', face: 'blank', arms: 'point' }); const { ctx } = k; const p = k.at('a', 8, 'linear'); if (p > 0.6) coin(k, k.lerp(900, BEN.swirl.x, Math.min(1, (p - 0.6) / 0.4)), k.lerp(700, BEN.swirl.y, Math.min(1, (p - 0.6) / 0.4)) - Math.sin(Math.min(1, (p - 0.6) / 0.4) * Math.PI) * 120, 0.5); shade(k, 0.3, [DAY], { vig: 0.4 }); return; }
        const { ctx } = k; ctx.fillStyle = '#7ab8c8'; ctx.fillRect(-100, -100, 2200, 1300); ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 6; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(-100, 200 + i * 70 + Math.sin(k.t + i) * 10); ctx.bezierCurveTo(500, 180 + i * 70, 1400, 230 + i * 70, 2100, 200 + i * 70); ctx.stroke(); }
        ctx.fillStyle = '#e8e4da'; ctx.fillRect(-100, 900, 2200, 300); ctx.fillStyle = '#c8c0b0'; for (let x = -100; x < 2100; x += 90) ctx.fillRect(x, 900, 4, 300); ctx.fillStyle = '#2a6a8a'; ctx.fillRect(-100, 890, 2200, 14);
        ch(k, 960, 1000, 440, { ...QUAN, top: '#2a5a8a', topStyle: 'tee', face: 'happy', arms: 'point' });
        shade(k, 0.2, [DAY], { vig: 0.35 }); tag(k, 'HÀ NỘI · BÂY GIỜ', 'b');
      },
    },
    {
      say: '{a}Bà Thoa vẫn bán xôi đầu chợ, và chiều nào cũng ra bến Đống gọi con. Lần gần nhất tôi về quê, bà kéo tay tôi, cười, bảo: {q}dạo này chiều nào bà gọi, nó cũng thưa. {b}Rồi bà hạ giọng: {q2}mà bà nghe những hai tiếng thưa.',
      sfx: [['stinger', 'q2', 0.45]],
      draw(k) {
        ben(k, { time: 'dusk' });
        ch(k, 900, 950, 420, { ...BA_THOA, hat: null, face: after(k, 'b') ? 'blank' : 'happy', arms: 'hold', talk: after(k, 'q') ? 0.35 : 0 });
        ch(k, 600, 955, 420, { ...NAM, top: '#5a6a72', topStyle: 'shirt', sleeve: 'long', face: 'calm', arms: 'down' });
        shade(k, 0.45, [{ x: 1300, y: 500, r: 1200, warm: 1 }], { vig: 0.45 });
        quote(k, '"Chiều nào bà gọi, nó cũng thưa."', 'q', { color: AMBER, until: 'b' });
        quote(k, '"Mà bà nghe những hai tiếng thưa."', 'q2', { color: COLD });
      },
    },
    {
      lead: 0.8, tail: 2.5,
      say: '{a}Hè năm lên lớp chín, bốn đứa chúng tôi chơi cầu cơ trên tầng ba của trường cấp hai. Đồng xu đánh ra tên thằng Tùng. {b}Đến giờ, tôi vẫn không biết đêm rằm tháng Bảy ấy, dưới bến Đống, ai đã kéo Quân xuống, và ai đã đẩy nó lên. {c}Có khi, là cùng một người.',
      sfx: [['wind', 0, 0.2], ['gong', 'c', 0.2]],
      draw(k) {
        if (k.t < k.cue('b')) { cls(k, { faces: { linh: 'fear', quan: 'blank', nam: 'calm', hai: 'fear' } }); return; }
        zoom(k, BEN.swirl.x, BEN.swirl.y, 2 - 0.6 * k.at('b', 14, 'inOut'), () => ben(k, { time: 'night', swirl: 1 }));
        shade(k, 0.6, [MOON, { x: BEN.swirl.x, y: BEN.swirl.y, r: 300 }], { vig: 0.5 });
        quote(k, 'Có khi, là cùng một người.', 'c', { color: PAPER, size: 56 });
      },
    },

    // ===== CUỐI =====
    nextScene({
      say: '{next}Tập sau: năm 1994, xóm tôi có một ông ăn mày đeo cái bị tải. Đi ngang qua, trẻ con nghe trong bị có tiếng trẻ con gọi mẹ. Ông chỉ hỏi mỗi đứa một câu: nhà mày mấy đứa?',
      title: 'Ông Ba Bị | Nhà Mày Mấy Đứa?',
      hook: 'Đứa nào trả lời thật, tháng ấy nhà ấy mất một đứa.',
      art(k) {
        duongDe(k, { time: 'dusk' });
        ch(k, 960, 980, 480, { kind: 'old', skin: '#a88a6a', hair: 'bald', top: '#4a4038', topStyle: 'baba', pants: '#2a2622', face: 'smug', arms: 'hold', view: 'side', flip: true });
        const { ctx } = k; ctx.fillStyle = '#7a6a4a'; ctx.strokeStyle = '#2c1f17'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(1060, 800, 90, 120, 0.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        shade(k, 0.55, [{ x: 1500, y: 400, r: 1100, warm: 1 }], { vig: 0.5 });
      },
    }),
    subScene({
      say: '{q}Theo bạn, đêm ấy ai đã kéo Quân xuống, và ai đã đẩy nó lên? Hãy để lại câu trả lời. {sub}Và nếu muốn nghe tiếp những chuyện chưa có lời giải, hãy đăng ký Nhân Gian Chưa Kể.',
      question: 'Đêm ấy, ai đã kéo Quân xuống, ai đã đẩy nó lên?',
      art(k) { coin(k, 960, 1000, 2); },
    }),
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
