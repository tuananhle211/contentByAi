// Hạt Bụi Xanh · Short 1 của tập 085 (Megalodon). Twist: răng "11.000 năm tuổi" → phép đo không đáng tin.
// Fact check: tàu HMS Challenger (1873) vớt răng phủ mangan; Tschernezky 1959 ước tính ~11.000 năm từ độ dày lớp mangan, giả định lớp phủ
// bắt đầu ngay khi răng rơi xuống → không đáng tin (J. Scientific Exploration); tuyệt chủng ~3,6 triệu năm (Boessenecker et al. 2019).
// Khung 1080×1920: nội dung trong y 150–1300. Khung đầu = thumbnail (một câu hỏi).
import { P, fill, ocean, tooth, shark, diver, bigNum, label, chip, thumbLine, thumbAsk, whale } from '/channel/hat-bui-xanh.js';

const W = 1080;
function thumb(k) {
  fill(k, '#000');
  k.photo('rang-tay', 0, 480, W, 900, { zoom: [1.1, 1.1], focus: [0.5, 0.5], credit: false });
  thumbLine(k, 'RĂNG MEGALODON', W / 2, 250, 96);
  thumbAsk(k, 'MỚI 11.000 NĂM?', W / 2, 395, 96, P.gold);
}

export default {
  meta: {
    title: 'Răng Megalodon Chỉ 11.000 Năm Tuổi? 🦈 #shorts',
    description: 'Năm 1959, một nhà khoa học tuyên bố răng Megalodon vớt từ đáy biển chỉ khoảng 11.000 năm tuổi. Nếu đúng, Megalodon đã sống cùng thời với tổ tiên loài người. Nhưng phép đo ấy có một lỗ hổng.\n\nBản đầy đủ: Megalodon: Liệu Nó Vẫn Còn Sống Dưới Đáy Biển? trên kênh Hạt Bụi Xanh.',
    links: [['▶ Bản đầy đủ: Megalodon còn sống không?', '085-megalodon-con-song-khong']],
    tags: ['megalodon', 'răng megalodon', 'megalodon còn sống', 'cá mập tiền sử', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'megalodon', 'khoahoc', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    related: '085-megalodon-con-song-khong', // YouTube Studio → Video liên quan (thay cảnh cuối "xem bản đầy đủ")
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Chiếc răng này từng được cho là chỉ mười một nghìn năm tuổi.', draw(k) { thumb(k); } },
    {
      say: '{a}Nếu đúng, con cá mập lớn nhất lịch sử đã bơi cùng thời với tổ tiên loài người. {b}Và có thể vẫn còn sống, đâu đó dưới đáy biển.',
      draw(k) {
        ocean(k, { depth: 0.85, snow: 70 });
        shark(k, W / 2 + 150, 800, 1300, { swim: 0.5 });
        diver(k, 260, 1180, 120, { color: '#E9F1F6' });
        chip(k, 'MÔ PHỎNG', 40, 200, { bg: 'rgba(245,241,230,0.85)', size: 22 });
        bigNum(k, 'VẪN CÒN SỐNG?', W / 2, 300, 'b', { size: 96, color: P.cream });
      },
    },
    {
      say: '{a}Chiếc răng được một tàu khảo sát vớt lên từ đáy Thái Bình Dương năm 1873. {b}Gần một thế kỷ sau, người ta đo lớp khoáng phủ trên nó, và tính ra con số mười một nghìn năm.',
      draw(k) {
        fill(k, '#000');
        k.photo('rang-den', 0, 360, W, 760, { zoom: [1.0, 1.08] });
        k.ctx.fillStyle = `rgba(20,16,12,${0.45 * k.at('b', 2)})`; k.ctx.fillRect(0, 360, W, 760);
        label(k, '1873 · vớt từ đáy biển', W / 2, 260, 'a', { size: 56 });
        bigNum(k, '~11.000 NĂM', W / 2, 1180, 'b', { size: 100, color: P.red });
      },
    },
    {
      say: '{a}Nhưng phép tính ấy giả định lớp khoáng bắt đầu phủ ngay khi răng rơi xuống đáy. {b}Không ai chắc điều đó. Lớp khoáng dày lên nhanh hay chậm tuỳ từng nơi.',
      draw(k) {
        fill(k, '#000');
        k.photo('rang-den', 0, 400, W, 720, { zoom: [1.12, 1.2], dim: 0.3 });
        bigNum(k, 'GIẢ ĐỊNH SAI?', W / 2, 280, 'a', { size: 100, color: P.gold });
      },
    },
    {
      say: '{a}Các nghiên cứu hiện đại cho thấy Megalodon tuyệt chủng khoảng ba triệu sáu trăm nghìn năm trước. {b}Và nếu nó còn sống, cá voi ngày nay phải mang những vết cắn khổng lồ. Chưa ai từng thấy.',
      draw(k) {
        fill(k, '#000');
        k.clip('ca-voi-boi', -420, 400, 1920, 1080, { at: 0, zoom: [1, 1.05] });
        bigNum(k, '~3,6 TRIỆU NĂM', W / 2, 300, 'a', { size: 96, color: P.cream });
        bigNum(k, 'KHÔNG VẾT CẮN', W / 2, 1220, 'b', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Một con số gây sốc có thể sống rất lâu, dù nó đã sai. {b}Vậy mà đến hôm nay, người ta vẫn kể rằng…',
      tail: 0.2,
      draw(k) { thumb(k); },
    },
  ],
};
