// Shorts — Camera an ninh từng quay được ma đầu bay? (cắt từ 055 Bí ẩn 4; mở bằng câu hỏi, CTA ngắn)
// Đối chiếu: Wikipedia "Krasue": đoạn camera an ninh 2008 ở Thái Lan; Chawan Koopipat (ĐH Chulalongkorn) kết luận nhiều khả năng là ánh sáng
//   phản chiếu trên nền ướt. Tiền Phong 2013: ở một số buôn làng Tây Nguyên tin ma lai cưỡi chim lợn. MPOB: hộp tổ cú lợn bắt chuột ở đồn điền cọ dầu.
import { fullVideoScene } from '/engine/templates.js';
import { SG, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const SCI = { body: 'man', outfit: 'robe', color: '#3bb273', color2: '#e9e4dc', hair: 'short' };
const DAN = (c) => ({ body: 'man', outfit: 'tunic', color: c, color2: '#f6c344', hair: 'short' });

export default {
  meta: shortMeta({
    title: 'Camera an ninh từng quay được ma đầu bay? 📹 #shorts',
    description: 'Năm 2008, một đoạn camera an ninh ở Thái Lan được đồn là quay được Krasue, họ hàng của ma lai Việt Nam. Một nhà nghiên cứu đã xem kỹ và tìm ra lời giải. Còn chim lợn thì sao? Xem tập đầy đủ "Ma lai có thật không?" trên kênh Vẽ Là Hiểu!',
    tags: ['ma lai', 'krasue', 'camera quay được ma', 'chim lợn', 'cú lợn', 'ma đầu bay', 'chuyện ma việt nam'],
    hashtags: ['malai', 'chuyenma'],
    music: 'assets/music/spooky.mp3',
  }),

  scenes: [
    {
      lead: 0.1,
      say: 'Camera an ninh {cam}từng quay được ma đầu bay thật à? {y}Năm 2008, bên Thái Lan có một đoạn camera được đồn là quay được Krasue, họ hàng của ma lai. {buzz}Cả nước xôn xao, ai cũng chia sẻ.',
      sfx: [['pop', 0.1], ['click', 'cam', 0.6], ['pop', 'y'], ['pop', 'buzz'], ['pop', ['buzz', 0.3]], ['pop', ['buzz', 0.6]]],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#2b3150', fillStyle: 'solid', stroke: 'none', seed: 6001 });
        T(k, 'CAMERA QUAY ĐƯỢC', 540, 200, 86, '#b5482c', k.at(0.1, 0.5));
        T(k, 'MA ĐẦU BAY?', 540, 320, 96, '#3b2f2a', k.at('cam', 0.5));
        k.prop('cctv', 220, 480, 300, { p: k.at('cam', 0.4) });
        k.rect(90, 560, 900, 560, { fill: '#0d1118', fillStyle: 'solid', width: 8, seed: 6002, p: k.at('cam', 0.5) });
        k.ctx.save(); k.ctx.beginPath(); k.ctx.rect(100, 570, 880, 540); k.ctx.clip();
        for (let i = 0; i < 70; i++) k.dot(100 + k.rand(i + Math.floor(k.gt * 8) * 7) * 880, 570 + k.rand(i + 300 + Math.floor(k.gt * 8)) * 540, 2, '#9aa', 0.3);
        k.prop('malai', 540 + Math.sin(k.gt) * 120, 800, 260, { p: k.at('cam', 0.5), alpha: 0.7 });
        k.ctx.restore();
        k.text('REC ● THÁI LAN · 2008', 130, 610, { size: 38, font: 'title', align: 'left', color: '#ff4d4d', fx: 'fade', p: k.at('y', 0.5) });
        for (let i = 0; i < 3; i++) k.bubble(80 + i * 330, 1150 + (i % 2) * 40, 280, 110, 200 + i * 330, 1110, { p: k.at(k.cue('buzz', i * 0.3), 0.3), text: ['Ma!!', 'Thật á?!', 'Share!'][i], size: 46 });
      },
    },
    {
      say: '{sci}Một nhà nghiên cứu ở Đại học Chulalongkorn ngồi xem kỹ, rồi kết luận: {wet}nhiều khả năng chỉ là ánh sáng phản chiếu trên nền đất ướt. {joke}Tức là con ma nổi tiếng nhất từng lên camera, {puddle}hoá ra là một vũng nước.',
      sfx: [['pop', 'sci'], ['ding', 'wet', 0.4], ['drumroll', 'joke', 0.3], ['wahwah', 'puddle', 0.5]],
      draw(k) {
        k.rect(-40, -40, k.W + 80, k.H + 80, { fill: '#2b3150', fillStyle: 'solid', stroke: 'none', seed: 6010 });
        k.rect(90, 200, 900, 560, { fill: '#0d1118', fillStyle: 'solid', width: 8, seed: 6011 });
        const wet = k.at('wet', 0.8);
        k.ctx.save(); k.ctx.beginPath(); k.ctx.rect(100, 210, 880, 540); k.ctx.clip();
        k.ellipse(540, 640, 600, 110, { fill: '#2a3a4a', fillStyle: 'solid', stroke: 'none', seed: 6012, alpha: wet });
        const g = k.ctx.createRadialGradient(540, 420 + 200 * wet, 4, 540, 420 + 200 * wet, 120);
        g.addColorStop(0, 'rgba(220,255,220,0.9)'); g.addColorStop(1, 'rgba(220,255,220,0)');
        k.ctx.fillStyle = g; k.ctx.fillRect(100, 210, 880, 540);
        k.ctx.restore();
        k.char(300, SG, 460, { ...SCI, face: k.t > k.cue('puddle') ? 'smug' : 'think', pose: 'think', p: k.at('sci', 0.5), shadow: false });
        T(k, 'ĐH Chulalongkorn', 700, 880, 54, '#9fe8c8', k.at('sci', 0.5), { maxWidth: 600 });
        T(k, 'ánh sáng + đất ướt', 700, 980, 54, '#fffaf0', k.at('wet', 0.5), { maxWidth: 600 });
        stamp(k, 700, 1150, 'VŨNG NƯỚC', k.at('puddle', 0.5), { w: 520, size: 80 });
      },
    },
    {
      say: '{owl}Còn một nghi phạm biết bay thật: chim lợn. {face}Mặt trắng bệch, bay không một tiếng động, kêu rít như ai xé vải. {fear}Nửa đêm gặp thì ai mà chẳng chạy. {truth}Nhưng ban ngày, đồn điền ở Malaysia còn đóng hộp tổ mời cú lợn về bắt chuột. {team}Đội diệt chuột làm không công đấy.',
      sfx: [['pop', 'owl'], ['scratch', 'face', 0.5], ['whoosh', 'fear', 0.4], ['pop', 'truth'], ['tada', 'team', 0.5]],
      draw(k) {
        const day = k.at('truth', 0.8);
        k.group({ a: 1 - day }, () => {
          k.backdrop('night', { ground: SG });
          k.prop('owl', 540 + Math.sin(k.gt * 1.2) * 160, 620 + Math.sin(k.gt * 2) * 40, 520, { fly: true, p: k.at('owl', 0.4) });
          T(k, 'CHIM LỢN', 540, 220, 110, '#9fe8c8', k.at('owl', 0.5), {});
          T(k, 'mặt trắng · bay êm · kêu như xé vải', 540, 940, 46, '#fffaf0', k.at('face', 0.5), { maxWidth: 980 });
          const run = k.at('fear', 1.5, 'in');
          k.char(k.lerp(540, 1300, run), SG, 340, { ...DAN('#e4572e'), face: 'shock', walk: true, walkSpeed: 20, p: k.at('fear', 0.3) });
        });
        k.group({ a: day }, () => {
          k.backdrop('day', { ground: SG });
          k.prop('tree', 160, SG - 150, 330); k.prop('tree', 920, SG - 150, 330);
          k.line(540, SG, 540, 640, { stroke: '#8a5a3a', width: 16, seed: 6020 });
          k.rect(420, 480, 240, 190, { fill: '#c9a06a', fillStyle: 'solid', width: 5, seed: 6021 });
          k.circle(540, 575, 50, { fill: '#2b1d16', fillStyle: 'solid', width: 4, seed: 6022 });
          k.prop('owl', 540, 550, 170);
          T(k, 'HỘP TỔ · Malaysia', 540, 260, 80, '#3b2f2a', day);
          stamp(k, 540, 960, 'ĐỘI DIỆT CHUỘT', k.at('team', 0.5), { w: 760, size: 78, color: '#3f6f2a' });
          T(k, 'không lương', 540, 1110, 64, '#3f6f2a', k.at('team', 0.6));
        });
      },
    },
    fullVideoScene({
      say: '{full}Vậy ma lai có thật không? Tập đầy đủ ở kênh nhé!',
      image: 'poster',
      title: 'Ma lai có thật không? Bí ẩn con ma đầu bay',
      channel: 'Vẽ Là Hiểu',
      tail: 1,
    }),
  ],
};
