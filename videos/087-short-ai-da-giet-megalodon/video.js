// Hạt Bụi Xanh · Short 2 của tập 085 (Megalodon). Khung câu hỏi "Ai đã giết…?" + twist kẻ nhỏ hơn.
// Fact check: Shimada et al. 2025 (dài tới ~24 m); tuyệt chủng ~3,6 triệu năm; McCormack et al. 2022 (Nat. Commun., đồng vị kẽm: cùng tầng thức ăn
// với cá mập trắng, cạnh tranh có thể góp phần, nhiều nguyên nhân cộng lại); biển lạnh đi cuối Pliocen (Pimiento et al. 2017).
// Khung 1080×1920: nội dung trong y 150–1300. Khung đầu = thumbnail (một câu hỏi).
import { P, fill, ocean, shark, thermometer, foodPyramid, bigNum, label, scaleBar, thumbLine, thumbAsk } from '/channel/hat-bui-xanh.js';

const W = 1080;
const MEG = '#3B4A57', WHITE = '#8FA3B4';
function thumb(k) {
  ocean(k, { depth: 0.6, snow: 60 });
  shark(k, 470, 760, 1000, { color: MEG, swim: 0.2 });
  shark(k, 900, 1120, 260, { color: WHITE, swim: 0.6 });
  thumbLine(k, 'AI ĐÃ GIẾT', W / 2, 250, 110);
  thumbAsk(k, 'MEGALODON?', W / 2, 400, 110, P.red, P.cream);
}

export default {
  meta: {
    title: 'Ai Đã Giết Con Cá Mập Lớn Nhất Từng Tồn Tại? 🦈 #shorts',
    description: 'Megalodon dài tới khoảng 24 mét, rồi biến mất 3,6 triệu năm trước. Một nghiên cứu năm 2022 chỉ ra một nghi phạm bất ngờ — nhỏ hơn nó rất nhiều.\n\nBản đầy đủ: Megalodon: Liệu Nó Vẫn Còn Sống Dưới Đáy Biển? trên kênh Hạt Bụi Xanh.',
    links: [['▶ Bản đầy đủ: Megalodon còn sống không?', '085-megalodon-con-song-khong']],
    tags: ['megalodon', 'megalodon tuyệt chủng', 'cá mập trắng', 'cá mập lớn nhất', 'khoa học', 'shorts', 'hạt bụi xanh'],
    hashtags: ['shorts', 'megalodon', 'camap', 'hatbuixanh'],
    categoryId: '28', lang: 'vi', format: 'short', captions: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1, omniSteps: 32,
    lead: 0.15, tail: 0.4, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
    related: '085-megalodon-con-song-khong', // YouTube Studio → Video liên quan (thay cảnh cuối "xem bản đầy đủ")
  },
  thumbnail: thumb,
  scenes: [
    { say: '{a}Ai đã giết con cá mập lớn nhất từng tồn tại?', draw(k) { thumb(k); } },
    {
      say: '{a}Nó dài tới hai mươi tư mét. {b}Và nghi phạm số một lại nhỏ hơn nó gần bốn lần.',
      draw(k) {
        ocean(k, { depth: 0.5 });
        shark(k, W / 2, 700, 1000, { color: MEG, swim: 0.4 });
        scaleBar(k, 40, 1040, 980, '≈ 24 MÉT', { p: k.at('a', 1.2) });
        shark(k, 820, 1180, 260, { color: WHITE, swim: 0.6, alpha: k.at('b', 0.6) });
        bigNum(k, 'NHỎ HƠN 4 LẦN', W / 2, 300, 'b', { size: 96, color: P.gold });
      },
    },
    {
      say: '{a}Megalodon thống trị đại dương gần hai mươi triệu năm. {b}Rồi khoảng ba triệu sáu trăm nghìn năm trước, nó biến mất.',
      draw(k) {
        ocean(k, { depth: 0.6 });
        shark(k, W / 2, 760, 1000, { color: MEG, swim: 0.4, alpha: 1 - 0.8 * k.at('b', 3) });
        bigNum(k, '~20 TRIỆU NĂM', W / 2, 300, 'a', { size: 96, color: P.cream });
        bigNum(k, 'BIẾN MẤT', W / 2, 1200, 'b', { size: 110, color: P.red });
      },
    },
    {
      say: '{a}Năm 2022, các nhà khoa học đo đồng vị kẽm trong răng hoá thạch, thứ cho biết con vật đứng ở đâu trong chuỗi thức ăn. {b}Kết quả: Megalodon và cá mập trắng từng săn cùng một tầng con mồi.',
      draw(k) {
        fill(k, P.space);
        const [tx, ty] = foodPyramid(k, W / 2, 1260, 980);
        shark(k, tx - 120, ty - 30, 200, { color: MEG, swim: 0.4, alpha: k.at('b', 0.6) });
        shark(k, tx + 130, ty - 30, 90, { color: WHITE, swim: 0.6, alpha: k.at('b', 0.6) });
        label(k, 'CÙNG TẦNG', tx, ty - 130, 'b', { size: 54, color: P.gold });
        label(k, '2022 · đồng vị kẽm', W / 2, 260, 'a', { size: 56 });
      },
    },
    {
      say: '{a}Cùng lúc ấy, biển lạnh đi và con mồi ít dần. Một gã khổng lồ chín mươi tấn cần lượng thức ăn khổng lồ. {b}Kẻ nhỏ hơn cần ít hơn nhiều, và chịu lạnh tốt hơn.',
      draw(k) {
        fill(k, '#000');
        k.photo('ca-map-trang', 0, 420, W, 760, { zoom: [1.0, 1.1], p: k.at('b', 0.5) });
        thermometer(k, 960, 360, 200, 0.3, { color: '#5FB0E8' });
        bigNum(k, 'BIỂN LẠNH ĐI', W / 2, 260, 'a', { size: 96, color: '#9FD8EA' });
      },
    },
    {
      say: '{a}Các nhà khoa học cho rằng không có một hung thủ duy nhất. Biển lạnh, con mồi thay đổi, và một đối thủ nhỏ mà linh hoạt. {b}Kẻ nhỏ ấy vẫn bơi trong đại dương hôm nay: cá mập trắng. Vậy rốt cuộc…',
      tail: 0.2,
      draw(k) {
        fill(k, '#000');
        k.photo('ca-map-trang-mat', 0, 420, W, 760, { zoom: [1.0, 1.1] });
        bigNum(k, 'NHIỀU NGUYÊN NHÂN', W / 2, 300, 'a', { size: 84, color: P.gold });
        bigNum(k, 'CÁ MẬP TRẮNG', W / 2, 1220, 'b', { size: 100, color: P.cream });
      },
    },
  ],
};
