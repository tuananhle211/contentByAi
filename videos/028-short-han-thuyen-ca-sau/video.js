// Shorts — Hàn Thuyên đuổi cá sấu bằng một bài văn (cắt từ 019)
// Đối chiếu: Đại Việt sử ký toàn thư, năm 1282 (Trần Nhân Tông): cá sấu đến sông Lô; vua sai Thượng thư bộ Hình Nguyễn Thuyên làm văn ném xuống
//   sông, cá sấu tự đi; vua cho việc giống Hàn Dũ (đời Đường), ban đổi họ Hàn; Thuyên giỏi thơ phú quốc ngữ (Nôm), thơ phú nước ta dùng
//   nhiều quốc ngữ bắt đầu từ đó.
import { fullVideoScene } from '/engine/templates.js';
import { SG, RIVER, SCHOLAR, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const TRAN = { body: 'man', outfit: 'robe', color: '#f6c344', color2: '#b5482c', hat: 'crown', hair: 'topknot', cape: '#b5482c' };

export default {
  meta: shortMeta({
    title: 'Năm 1282, vua Trần đuổi cá sấu bằng… một bài văn #shorts',
    description: 'Năm 1282, cá sấu bơi đến sông Lô, và vua Trần Nhân Tông không sai lính, mà sai quan Nguyễn Thuyên làm một bài văn ném xuống sông. Chuyện có thật trong Đại Việt sử ký toàn thư. Xem tập đầy đủ "Thuồng luồng có thật không?" trên kênh Vẽ Là Hiểu!',
    tags: ['hàn thuyên', 'hàn thuyên đuổi cá sấu', 'nguyễn thuyên', 'trần nhân tông', 'chữ nôm', 'cá sấu sông lô', 'lịch sử việt nam'],
    hashtags: ['hanthuyen', 'lichsuvietnam'],
  }),

  scenes: [
    {
      lead: 0.1,
      say: '{me}Mình là một con cá sấu. {year}Năm 1282, mình bơi lạc tới sông Lô. {expect}Mình chờ lính, chờ giáo mác. {but}Nhưng người ta đuổi mình đi… {paper}bằng một bài văn.',
      sfx: [['pop', 'me'], ['whoosh', 'year', 0.4], ['drumroll', 'expect', 0.3], ['scratch', 'but', 0.5], ['boing', 'paper', 0.6]],
      draw(k) {
        k.backdrop('day', { ground: 900 });
        k.water(820, { color: RIVER, alpha: 0.9 });
        k.prop('crocodile', 540, 900, 700, { open: k.t > k.cue('paper') ? 0.9 : 0.3, bob: 4, p: k.at('me', 0.5) });
        T(k, 'mình', 540, 700, 52, '#b5482c', k.at('me', 0.4) * (1 - k.at('year', 0.4)));
        T(k, 'SÔNG LÔ · 1282', 540, 220, 96, '#b5482c', k.at('year', 0.5));
        k.prop('scroll', 540, 470, 220 * k.at('paper', 0.5), { p: k.at('paper', 0.5), rotate: Math.sin(k.gt * 3) * 0.2 });
        T(k, 'MỘT BÀI VĂN?!', 540, 1180, 90, '#e4572e', k.at('paper', 0.5));
        k.sweat(780, 820, 1.4, { p: k.at('paper', 0.4) });
      },
    },
    {
      say: 'Theo Đại Việt sử ký toàn thư, {king}vua Trần Nhân Tông sai Thượng thư bộ Hình là Nguyễn Thuyên {write}làm một bài văn, {throw}ném xuống sông. {gone}Và cá sấu… tự bỏ đi. {best}Bài văn thuyết phục nhất lịch sử Việt Nam, {reader}vì người đọc là một con cá sấu.',
      sfx: [['pop', 'king'], ['scratch', 'write', 0.5], ['whoosh', 'throw', 0.5], ['slideDown', 'gone', 0.5], ['ding', 'best', 0.4], ['boing', ['reader', 1.2], 0.6]],
      draw(k) {
        k.backdrop('day', { ground: 900 });
        k.water(860, { color: RIVER, alpha: 0.9 });
        k.poly([[-40, 900], [560, 900], [460, 2000], [-40, 2000]], { fill: '#8fbf6a', fillStyle: 'solid', width: 4, seed: 31 });
        k.char(160, 1180, 360, { ...TRAN, face: 'calm', pose: 'point', p: k.at('king', 0.4) });
        k.char(380, 1180, 360, { ...SCHOLAR('#3d6fa8'), face: 'smug', pose: k.t > k.cue('throw') ? 'point' : 'present', p: k.at('king', 0.4) });
        T(k, 'Nguyễn Thuyên', 380, 1280, 44, '#3b2f2a', k.at('king', 0.5), { fx: 'fade' });
        const th = k.at('throw', 1, 'out');
        k.prop('scroll', k.lerp(440, 760, th), k.lerp(720, 960, th) - Math.sin(th * Math.PI) * 200, 120, { p: k.at('write', 0.4), rotate: th * 6 });
        const go = k.at('gone', 2, 'in');
        k.prop('crocodile', 820 + go * 500, 1000, 420, { open: 0.2, flip: true, bob: 3 });
        T(k, 'tự bỏ đi', 760, 780, 60, '#3f6f2a', k.at('gone', 0.5));
        T(k, 'BÀI VĂN THUYẾT PHỤC NHẤT', 540, 220, 70, '#b5482c', k.at('best', 0.6), { maxWidth: 1000 });
        T(k, 'người đọc: 1 con cá sấu', 540, 340, 60, '#3b2f2a', k.at('reader', 0.6));
      },
    },
    {
      say: 'Vua thấy chuyện này giống {han}Hàn Dũ, một văn hào đời Đường, cũng từng làm văn đuổi cá sấu. {name}Thế là Nguyễn Thuyên được đổi sang họ Hàn: {ht}Hàn Thuyên. {nom}Ông còn giỏi làm thơ phú bằng chữ Nôm, {first}và Toàn thư ghi: thơ phú nước ta dùng nhiều tiếng Nôm, bắt đầu từ đó.',
      sfx: [['pop', 'han'], ['pop', 'name'], ['tada', 'ht', 0.5], ['scratch', 'nom', 0.4], ['sparkle', 'first', 0.5]],
      draw(k) {
        k.text('Nguyễn Thuyên', 540, 260, { size: 90, font: 'title', color: '#6b5f55', p: k.at('name', 0.4) > 0 ? 1 : 0, fx: 'fade' });
        k.line(240, 260, 840, 260, { stroke: '#c0392b', width: 10, p: k.at('ht', 0.4) });
        T(k, 'HÀN THUYÊN', 540, 420, 130, '#b5482c', k.at('ht', 0.5));
        k.char(540, 1050, 520, { ...SCHOLAR('#3d6fa8'), face: k.t > k.cue('ht') ? 'laugh' : 'smug', pose: k.t > k.cue('ht') ? 'cheer' : 'present', p: k.at(0, 0.4) });
        T(k, 'như Hàn Dũ (đời Đường)', 540, 1150, 46, '#3b2f2a', k.at('han', 0.5), { fx: 'fade' });
        stamp(k, 540, 1260, 'THƠ NÔM', k.at('first', 0.5), { w: 380, size: 64, color: '#3f6f2a', r: -0.05 });
      },
    },
    fullVideoScene({
      say: '{full}Còn thuồng luồng thì có thật không? Xem tập đầy đủ trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: 'Thuồng luồng có thật không? Vì sao người Việt cổ xăm mình',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
