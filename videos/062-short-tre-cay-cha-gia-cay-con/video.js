// Shorts thử kênh Nói Có Sách — "Trẻ cậy cha, già cậy con" đấu với Khalil Gibran.
// Đối chiếu: "Trẻ cậy cha, già cậy con" là tục ngữ Việt. Gibran, "The Prophet" (1923), chương "On Children":
//   "Your children are not your children… You are the bows from which your children as living arrows are sent forth."
//   Bản dịch tiếng Việt thường lấy tên "Nhà Tiên Tri". Phần "góc nhìn thứ ba" là bình luận của kênh, không phân xử.
import { SG, RED, BLUE, ONG, CHAU, T, quote, vs, shortMeta } from '/channel/noi-co-sach.js';

const CHA = { body: 'man', outfit: 'tunic', color: '#8a6a3a', color2: '#e8d9a8', hair: 'short' };
const CON = { body: 'man', outfit: 'tunic', color: '#3bb273', color2: '#f6c344', hair: 'short' };
const GIA = { ...CHA, color: '#7a6a5a', hairColor: '#e9e4dc', beard: true, beardColor: '#ffffff' };

// Hai nhân vật đứng đối mặt, mỗi người một bong bóng thoại.
function duel(k, o) {
  k.char(270, SG, 600, { ...ONG, face: o.ongFace, pose: o.ongPose ?? 'stand', bob: o.ongTalk ? 4 : 0 });
  k.char(810, SG, 560, { ...CHAU, flip: true, face: o.chauFace, pose: o.chauPose ?? 'stand', bob: o.chauTalk ? 4 : 0 });
  k.bubble(30, 430, 600, 170, 270, 680, { p: o.ongP ?? 0, text: o.ongText, size: 50, seed: 6230 });
  k.bubble(450, 430, 600, 170, 810, 710, { p: o.chauP ?? 0, text: o.chauText, size: 50, seed: 6235 });
}

export default {
  meta: shortMeta({
    title: 'Sinh con để dưỡng già: đúng hay ích kỷ? #shorts',
    description: 'Trẻ cậy cha, già cậy con, tục ngữ Việt dạy thế. Nhưng Khalil Gibran lại viết: "Con cái của bạn không phải là con của bạn." Bạn đứng phe nào? Bình luận 1 hoặc 2!',
    footer: 'Nguồn: tục ngữ Việt Nam "Trẻ cậy cha, già cậy con"; Khalil Gibran, "The Prophet" (Nhà Tiên Tri), 1923, chương "On Children".',
    tags: ['trẻ cậy cha già cậy con', 'sinh con để dưỡng già', 'nuôi con dưỡng già', 'khalil gibran', 'nhà tiên tri', 'con cái và cha mẹ', 'báo hiếu cha mẹ'],
    hashtags: ['giadinh', 'nuoiconduonggia'],
  }),

  scenes: [
    {
      lead: 0.1,
      say: [
        '{q}Sinh con để về già có người nuôi. {ask}Đúng, hay ích kỷ?',
        { v: 'ong', text: '{ong}Trẻ cậy cha, già cậy con. Các cụ dạy cả rồi!' },
        { v: 'chau', text: '{chau}Cháu có xin được đẻ ra đâu, ông!' },
      ],
      sfx: [['pop', 0.1], ['ding', 'ask', 0.5], ['whoosh', 'ong', 0.4], ['boing', 'chau', 0.5]],
      draw(k) {
        const duelP = k.at('ong', 0.5);
        vs(k, duelP, 1000);
        T(k, 'SINH CON ĐỂ DƯỠNG GIÀ?', 540, 230, 72, '#3b2f2a', k.at(0.1, 0.5), { maxWidth: 980 });
        T(k, 'Đúng hay ích kỷ?', 540, 370, 70, RED, k.at('ask', 0.5));
        k.group({ a: 1 - duelP }, () => k.prop('baby', 540, 820, 380, { p: k.at(0.1, 0.6), bob: 3 }));
        k.group({ a: duelP }, () => duel(k, {
          ongFace: k.t > k.cue('chau') ? 'shock' : 'smug', ongPose: k.t > k.cue('chau') ? 'stand' : 'present', ongTalk: k.t > k.cue('ong') && k.t < k.cue('chau'),
          chauFace: k.t > k.cue('chau') ? 'angry' : 'blank', chauPose: k.t > k.cue('chau') ? 'hips' : 'stand', chauTalk: k.t > k.cue('chau'),
          ongP: k.at('ong', 0.3) * (1 - k.at('chau', 0.3)), ongText: 'Già cậy con!',
          chauP: k.at('chau', 0.3), chauText: 'Cháu có xin được đẻ ra đâu!',
        }));
      },
    },
    {
      say: [
        '{src}Đây là tục ngữ Việt. {farm}Ngày xưa làm gì có lương hưu, {young}trẻ thì cha mẹ nuôi, {old}già thì trông vào con. {fund}Con cái chính là quỹ hưu trí.',
        { v: 'ong', text: '{ong}Đấy, các cụ tính cả rồi!' },
      ],
      sfx: [['pop', 'src'], ['scratch', 'farm', 0.4], ['pop', 'young'], ['whoosh', 'old', 0.4], ['cash', 'fund', 0.6], ['ding', 'ong', 0.4]],
      draw(k) {
        quote(k, 'Trẻ cậy cha, già cậy con', '— Tục ngữ Việt Nam', 540, 300, 940, 260, k.at('src', 0.5), { seed: 6240 });
        T(k, 'Không có lương hưu', 540, 540, 60, RED, k.at('farm', 0.4) * (1 - k.at('young', 0.3)));
        const y = k.at('young', 0.5), o = k.at('old', 0.5);
        k.char(250, SG, 460, { ...CHA, face: 'happy', pose: 'hold', p: y });
        k.prop('baby', 262, SG - 265, 120, { p: y });
        k.arrow(420, 860, 600, 860, { p: o, stroke: '#3b2f2a', width: 8, seed: 6245 });
        k.char(720, SG, 440, { ...GIA, face: 'happy', lean: 0.12, p: o });
        k.char(900, SG, 540, { ...CON, flip: true, face: 'calm', pose: 'hold', p: o });
        k.rect(250, 500, 580, 120, { fill: '#e8b84a', fillStyle: 'solid', width: 6, seed: 6246, alpha: k.at('fund', 0.4) });
        k.text('QUỸ HƯU TRÍ', 540, 563, { size: 72, font: 'title', color: '#3b2f2a', p: k.at('fund', 0.4), fx: 'pop' });
        k.bubble(30, 650, 460, 110, 250, 790, { p: k.at('ong', 0.3), text: 'Các cụ tính cả rồi!', size: 46, seed: 6247 });
      },
    },
    {
      say: [
        '{but}Nhưng năm 1923, {book}nhà thơ Khalil Gibran viết trong Nhà Tiên Tri: {q}con cái của bạn không phải là con của bạn. {bow}Cha mẹ là cây cung, {shot}con là mũi tên bắn đi xa.',
        { v: 'chau', text: '{chau}Đấy ông! Mũi tên phải bay đi chứ!' },
        { v: 'ong', text: '{ong}Bay hết rồi, lúc ông ốm thì ai lo?' },
      ],
      sfx: [['scratch', 'but', 0.4], ['pop', 'book'], ['sparkle', 'q', 0.4], ['pop', 'bow'], ['whoosh', 'shot', 0.6], ['boing', 'chau', 0.4], ['wahwah', 'ong', 0.4]],
      draw(k) {
        const talk = k.at('chau', 0.5);
        k.group({ a: 1 - talk }, () => {
          k.icon('book', 540, 330, 220, { p: k.at('book', 0.4) * (1 - k.at('q', 0.3)) });
          quote(k, 'Con cái của bạn không phải là con của bạn.', 'Khalil Gibran — Nhà Tiên Tri (1923)', 540, 330, 960, 300, k.at('q', 0.5), { size: 56, seed: 6250 });
          const b = k.at('bow', 0.6);
          k.arc(200, 860, 230, -1.15, 1.15, { p: b, stroke: '#8a5a35', width: 14, seed: 6251 });
          k.line(200 + 230 * Math.cos(-1.15), 860 + 230 * Math.sin(-1.15), 200 + 230 * Math.cos(1.15), 860 + 230 * Math.sin(1.15), { p: b, stroke: '#3b2f2a', width: 4, seed: 6252 });
          T(k, 'CHA MẸ', 290, 1160, 58, RED, b);
          const s = k.at('shot', 1.0);
          k.arrow(300, 860, k.lerp(320, 1010, s), 860 - 120 * s, { p: k.at('shot', 0.2), stroke: BLUE, width: 10, seed: 6253 });
          T(k, 'CON', k.lerp(400, 880, s), 960 - 120 * s, 58, BLUE, k.at('shot', 0.3));
        });
        k.group({ a: talk }, () => {
          vs(k, talk, 1000);
          T(k, 'Con là mũi tên', 540, 260, 70, BLUE, talk);
          duel(k, {
            ongFace: k.t > k.cue('ong') ? 'sad' : 'shock', ongTalk: k.t > k.cue('ong'),
            chauFace: k.t > k.cue('ong') ? 'blank' : 'smug', chauPose: k.t > k.cue('ong') ? 'stand' : 'point', chauTalk: k.t > k.cue('chau') && k.t < k.cue('ong'),
            chauP: k.at('chau', 0.3) * (1 - k.at('ong', 0.3)), chauText: 'Mũi tên phải bay đi chứ!',
            ongP: k.at('ong', 0.3), ongText: 'Lúc ông ốm ai lo?',
          });
          k.sweat(870, 640, 1.4, { p: k.at('ong', 0.3) });
        });
      },
    },
    {
      say: '{third}Thật ra hai câu không đá nhau. {duty}Một câu nói bổn phận, {free}một câu nói tự do. {loan}Nuôi con mà tính lãi thì thành cho vay. {back}Con lớn mà quay lưng, {ingrate}thì không phải tự do, mà là vô ơn.',
      sfx: [['pop', 'third'], ['pop', 'duty'], ['pop', 'free'], ['cash', 'loan', 0.5], ['bonk', 'back', 0.5], ['ding', 'ingrate', 0.5]],
      draw(k) {
        T(k, 'Hai câu có đá nhau?', 540, 210, 66, '#3b2f2a', k.at('third', 0.5));
        const d = k.at('duty', 0.5), f = k.at('free', 0.5);
        k.rect(60, 300, 440, 150, { fill: RED, fillStyle: 'solid', width: 6, seed: 6260, alpha: d });
        k.text('BỔN PHẬN', 280, 377, { size: 64, font: 'title', color: '#fffaf0', p: d, fx: 'pop' });
        k.rect(580, 300, 440, 150, { fill: BLUE, fillStyle: 'solid', width: 6, seed: 6261, alpha: f });
        k.text('TỰ DO', 800, 377, { size: 64, font: 'title', color: '#fffaf0', p: f, fx: 'pop' });
        // cái cân thăng bằng giữa hai vế
        const c = k.at('third', 0.8);
        k.line(540, 1200, 540, 560, { p: c, stroke: '#3b2f2a', width: 10, seed: 6262 });
        k.line(240, 580, 840, 580, { p: c, stroke: '#3b2f2a', width: 10, seed: 6263 });
        k.line(280, 580, 280, 680, { p: d, stroke: '#3b2f2a', width: 4, seed: 6264 });
        k.line(800, 580, 800, 680, { p: f, stroke: '#3b2f2a', width: 4, seed: 6265 });
        k.arc(280, 680, 110, 0, Math.PI, { p: d, stroke: RED, width: 8, seed: 6266 });
        k.arc(800, 680, 110, 0, Math.PI, { p: f, stroke: BLUE, width: 8, seed: 6267 });
        k.rect(380, 1180, 320, 40, { fill: '#3b2f2a', fillStyle: 'solid', stroke: 'none', seed: 6268, alpha: c });
        T(k, 'Nuôi con ≠ cho vay', 540, 900, 70, RED, k.at('loan', 0.4));
        T(k, 'Quay lưng ≠ tự do', 540, 1040, 70, BLUE, k.at('back', 0.4));
        k.burst(820, 1175, 70, 'VÔ ƠN', { p: k.at('ingrate', 0.4), size: 50, seed: 6269 });
      },
    },
    {
      say: '{vote}Bạn đứng phe nào? {one}Một, già cậy con. {two}Hai, con là mũi tên. {cmt}Bình luận một hay hai nhé!',
      tail: 0.8,
      sfx: [['drumroll', 'vote', 0.4], ['ding', 'one', 0.5], ['ding', 'two', 0.5], ['tada', 'cmt', 0.5]],
      draw(k) {
        vs(k, 1, 760);
        T(k, 'BẠN ĐỨNG PHE NÀO?', 540, 220, 84, '#3b2f2a', k.at('vote', 0.5));
        const one = k.at('one', 0.4), two = k.at('two', 0.4);
        k.circle(270, 470, 110, { fill: RED, fillStyle: 'solid', width: 6, seed: 6270, p: one });
        k.text('1', 270, 478, { size: 140, font: 'title', color: '#fffaf0', p: one, fx: 'pop' });
        T(k, 'Già cậy con', 270, 630, 52, RED, one);
        k.circle(810, 470, 110, { fill: BLUE, fillStyle: 'solid', width: 6, seed: 6271, p: two });
        k.text('2', 810, 478, { size: 140, font: 'title', color: '#fffaf0', p: two, fx: 'pop' });
        T(k, 'Con là mũi tên', 810, 630, 52, BLUE, two);
        const turn = k.t > k.cue('two');
        k.char(270, SG, 480, { ...ONG, face: turn ? 'blank' : 'happy', pose: k.t > k.cue('one') && !turn ? 'cheer' : 'stand', bob: !turn ? 3 : 0 });
        k.char(810, SG, 450, { ...CHAU, flip: true, face: turn ? 'happy' : 'blank', pose: turn ? 'cheer' : 'stand', bob: turn ? 3 : 0 });
        T(k, 'BÌNH LUẬN 1 HAY 2?', 540, 1300, 60, '#3b2f2a', k.at('cmt', 0.4), { maxWidth: 900 });
      },
    },
  ],

  thumbnail(k) {
    vs(k, 1, 1000);
    T(k, 'GIÀ CẬY CON?', 540, 300, 150, RED, 1);
    T(k, 'đúng hay ích kỷ', 540, 540, 80, '#3b2f2a', 1);
    duel(k, { ongFace: 'angry', ongPose: 'point', chauFace: 'shout', chauPose: 'hips', ongP: 0, chauP: 0 });
  },
};
