// Shorts — Vì sao cả Đông Nam Á đều có ma đầu bay? (cắt từ 055; khuôn "Vì sao…" của 020 Xăm mình, mở bằng câu hỏi, CTA ngắn)
// Đối chiếu (Wikipedia "Krasue"): Krasue (Thái), Ahp (Campuchia), Kasu (Lào), Penanggalan (Malaysia), Kuyang (Indonesia), Ma lai (VN);
//   Manananggal (Philippines) tách nửa thân trên, cánh dơi. "Chuyện đi theo người" = một cách giải thích dễ hiểu, không phải kết luận học thuật.
import { fullVideoScene } from '/engine/templates.js';
import { SG, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const CO = { body: 'woman', outfit: 'dress', color: '#5a3a5a', color2: '#d9d4cb', hair: 'long', hairColor: '#2b2b2b' };
const head = (k, x, y, size, o = {}) => k.prop('malai', x + Math.sin((k.gt ?? 0) * 0.8 + x) * 14, y + Math.sin((k.gt ?? 0) * 1.4 + x) * 12, size, { guts: true, cute: true, ...o });

export default {
  meta: shortMeta({
    title: 'Vì sao cả Đông Nam Á đều có ma đầu bay? 👻 #shorts',
    description: 'Thái Lan có Krasue, Campuchia có Ahp, Malaysia có Penanggalan, Việt Nam có ma lai: cả Đông Nam Á đều có một con ma chỉ có cái đầu và bộ lòng. Vì sao lại giống nhau đến thế? Xem tập đầy đủ "Ma lai có thật không?" trên kênh Vẽ Là Hiểu!',
    tags: ['ma lai', 'krasue', 'penanggalan', 'manananggal', 'ma đầu bay', 'chuyện ma đông nam á', 'chuyện ma việt nam'],
    hashtags: ['malai', 'chuyenma'],
    music: 'assets/music/spooky.mp3',
  }),

  scenes: [
    {
      lead: 0.1,
      say: 'Vì sao cả Đông Nam Á {asean}đều có một con ma chỉ có cái đầu? {not}Không phải ma rủ nhau đi du lịch đâu. {why}Mà vì… {sum}cả vùng này chung một nỗi sợ.',
      sfx: [['pop', 0.1], ['pop', 'asean'], ['bonk', 'not', 0.5], ['drumroll', 'why', 0.3], ['boing', 'sum', 0.6]],
      draw(k) {
        k.backdrop('night', { ground: SG });
        T(k, 'CẢ ĐÔNG NAM Á', 540, 210, 100, '#b5482c', k.at(0.1, 0.5));
        T(k, 'đều có ma đầu bay?', 540, 340, 74, '#3b2f2a', k.at('asean', 0.5));
        head(k, 540, 720, 520, { p: k.at('asean', 0.5) });
        k.group({ a: k.at('not', 0.3) * (1 - k.at('sum', 0.3)) }, () => {
          T(k, 'ma đi du lịch', 540, 1080, 70, '#6b5f55', 1);
          k.icon('cross', 540, 1080, 220, { p: k.at(k.cue('not', 0.3), 0.3) });
        });
        stamp(k, 540, 1170, 'CHUNG NỖI SỢ', k.at('sum', 0.5), { w: 560, size: 70 });
      },
    },
    {
      say: '{th}Bên Thái gọi là Krasue, {kh}Campuchia là Ahp, {la}Lào là Kasu, {my}Malaysia là Penanggalan, {id}Indonesia là Kuyang, {vn}còn mình gọi là ma lai. {uni}Đồng phục y hệt nhau: đầu bay, ruột thòng. {ph}Riêng Philippines có Manananggal, tách luôn nửa người trên. {combo}Người ta gọi món lẻ, nó gọi nguyên combo.',
      sfx: [['pop', 'th'], ['pop', 'kh'], ['pop', 'la'], ['pop', 'my'], ['pop', 'id'], ['ding', 'vn', 0.5], ['tada', 'uni', 0.4], ['whoosh', 'ph', 0.4], ['boing', 'combo', 0.5]],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#2b3150', fillStyle: 'solid', stroke: 'none', seed: 5901 });
        const ph = k.at('ph', 0.6);
        k.group({ a: 1 - ph }, () => {
          k.rect(60, 120, 960, 120, { fill: '#b5482c', fillStyle: 'solid', width: 6, seed: 5902 });
          k.text('HỘI NGHỊ ĐẦU BAY', 540, 182, { size: 66, font: 'title', color: '#fffaf0' });
          const seats = [['th', 'KRASUE', 'Thái Lan'], ['kh', 'AHP', 'Campuchia'], ['la', 'KASU', 'Lào'], ['my', 'PENANGGALAN', 'Malaysia'], ['id', 'KUYANG', 'Indonesia'], ['vn', 'MA LAI', 'Việt Nam']];
          seats.forEach(([c, name, land], i) => {
            const x = 220 + (i % 2) * 640, y = 420 + Math.floor(i / 2) * 300, p = k.at(c, 0.5);
            head(k, x + 60, y, 190, { p, flip: i % 2 === 1 });
            k.group({ a: p }, () => {
              k.rect(x - 150, y + 90, 300, 100, { fill: i === 5 ? '#f6c344' : '#fffaf0', fillStyle: 'solid', width: 4, seed: 5903 + i });
              k.text(name, x, y + 126, { size: name.length > 8 ? 36 : 46, font: 'title', color: '#b5482c', maxWidth: 280 });
              k.text(land, x, y + 168, { size: 30, color: '#3b2f2a' });
            });
          });
          T(k, 'đầu bay · ruột thòng', 540, 1260, 70, '#f6c344', k.at('uni', 0.4));
        });
        k.group({ a: ph }, () => {
          k.backdrop('night', { ground: SG });
          for (const sd of [-1, 1]) k.poly([[540, 720], [540 + sd * 420, 480 + Math.sin(k.gt * 6) * 40], [540 + sd * 360, 720], [540 + sd * 260, 680], [540 + sd * 150, 800]], { fill: '#4a3a6a', fillStyle: 'solid', width: 6, seed: 5910 + sd });
          k.ctx.save(); k.ctx.beginPath(); k.ctx.rect(200, 0, 680, 900); k.ctx.clip();
          k.char(540, 1400 + Math.sin(k.gt * 2) * 14, 860, { ...CO, face: 'smug', pose: 'hips', shadow: false });
          k.ctx.restore();
          T(k, 'MANANANGGAL', 540, 220, 96, '#9fe8c8', 1);
          T(k, 'Philippines', 540, 330, 60, '#fffaf0', 1);
          stamp(k, 540, 1100, 'BAY CẢ COMBO', k.at('combo', 0.5), { w: 620, size: 76, color: '#e4572e' });
        });
      },
    },
    {
      say: '{why}Sao lại giống nhau đến thế? {same}Cùng trồng lúa, cùng sống ven sông, cùng những đêm không đèn, {trade}lại đi lại buôn bán với nhau cả nghìn năm. {travel}Người đi đến đâu, chuyện kể theo đến đấy. {tax}Hàng hoá qua biên giới thì phải đóng thuế, {free}còn chuyện ma thì cứ thế mà vào.',
      sfx: [['pop', 'why'], ['pop', 'same'], ['whoosh', 'trade', 0.4], ['pop', 'travel'], ['cash', 'tax', 0.5], ['boing', 'free', 0.5]],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#efe6d2', fillStyle: 'solid', stroke: 'none', seed: 5920 });
        T(k, 'VÌ SAO GIỐNG NHAU?', 540, 200, 84, '#b5482c', k.at('why', 0.5));
        [['rice', 'lúa nước', 190], ['moon', 'đêm không đèn', 880]].forEach(([ic, t, x], i) => {
          if (ic === 'rice') k.icon('rice', x, 440, 160, { p: k.at('same', 0.4) }); else k.prop('moon', x, 440, 150, { p: k.at('same', 0.4) });
          T(k, t, x, 580, 42, '#3b2f2a', k.at('same', 0.5));
        });
        k.wave(400, 450, 280, { p: k.at('same', 0.6), stroke: '#2e86de', width: 9, amp: 18 });
        T(k, 'sông ngòi', 540, 580, 42, '#3b2f2a', k.at('same', 0.6));
        const u = k.at('travel', 3, 'inOut');
        k.prop('boat', k.lerp(180, 900, u), 820, 300, { p: k.at('trade', 0.4) });
        head(k, k.lerp(180, 900, u), 680, 170, { p: k.at('travel', 0.4) });
        k.group({ a: k.at('tax', 0.4) }, () => {
          k.rect(140, 960, 800, 260, { fill: '#fffaf0', fillStyle: 'solid', width: 5, seed: 5921 });
          k.text('HÀNG HOÁ: có thuế', 540, 1030, { size: 54, font: 'title', color: '#3b2f2a' });
          k.text('CHUYỆN MA: ?', 540, 1130, { size: 54, font: 'title', color: '#3b2f2a' });
        });
        stamp(k, 640, 1290, 'MIỄN THUẾ', k.at('free', 0.5), { w: 440, size: 70 });
      },
    },
    fullVideoScene({
      say: '{full}Thế ai ở nhà trông cái thân? Tập đầy đủ ở kênh nhé!',
      image: 'poster',
      title: 'Ma lai có thật không? Bí ẩn con ma đầu bay',
      channel: 'Vẽ Là Hiểu',
      tail: 1,
    }),
  ],
};
