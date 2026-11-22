// Cảnh mẫu Hạt Bụi Xanh: 3 cảnh ~30 giây — vũ trụ + Trái Đất, đại dương + cá voi, so sánh tỉ lệ trên nền kem.
// Định dạng video.js của dự án: mỗi cảnh có lời đọc `say` ({a}, {b}… là mốc để hình khớp lời) và hàm vẽ `draw(k)`.
// Ảnh xem trước: .github/mau-hat-bui-xanh.jpg. Lời đọc tạo bằng scripts/tts.mjs (mốc từng từ → k.cue).
// Giọng: meta.tts 'edge' (miễn phí) cho mẫu; kênh thật dùng tts: 'omnivoice', omniVoice: 'default' (OMNI_URL + OMNI_KEY trong .env).
// Số liệu: cá voi xanh dài tới ~30 m (NOAA Fisheries); xe buýt thành phố ~10–12 m.
import { P, cream, space, ocean, earth, whale, human, bus, scaleBar, bigNum, label, chip } from '/channel/hat-bui-xanh.js';

const lerp = (a, b, p) => a + (b - a) * p;

const video = {
  meta: {
    title: 'Mẫu | Cá Voi Xanh Lớn Đến Mức Nào?',
    description: 'Cảnh mẫu cho bộ vẽ Hạt Bụi Xanh.',
    lang: 'vi', style: 'clean', tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1,
    lead: 0.35, tail: 0.8, pause: 0.35, minDuration: 0,
    transition: 'cut', camera: 0.04, scribble: false, sfxTransitions: false, sfxVolume: 0.35, paper: P.space,
  },
  scenes: [
    {
      say: '{a}Trái Đất. Hành tinh duy nhất mà ta biết có sự sống. {b}Nhưng sinh vật lớn nhất từng sống trên nó lại không ở trên cạn.',
      sfx: [['sparkle', 'b', 0.25]],
      draw(k) {
        space(k);
        const z = lerp(1, 1.5, k.at('a', 8, 'inOut'));
        k.group({ x: k.W / 2, y: k.H / 2, s: z }, () => earth(k, 0, 0, 300));
        bigNum(k, 'TRÁI ĐẤT', k.W / 2, 150, 'a', { size: 110 });
        bigNum(k, 'KHÔNG Ở TRÊN CẠN', k.W / 2, 930, 'b', { size: 90, color: P.gold });
      },
    },
    {
      say: '{a}Cá voi xanh dài tới khoảng ba mươi mét. {b}Bằng ba chiếc xe buýt nối đuôi nhau.',
      sfx: [['whoosh', 'a', 0.3]],
      draw(k) {
        ocean(k, { depth: 0.35 });
        const x = lerp(k.W + 700, k.W / 2, k.at('a', 3, 'out'));
        whale(k, x, 470, 1300, { swim: 0.4 });
        scaleBar(k, x - 650, x + 650, 700, '≈ 30 MÉT', { p: k.at('a', 1.5, 'out') * k.at(k.cue('a', 2), 1) });
        for (let i = 0; i < 3; i++) bus(k, x - 650 + i * 440, 960, 420 * k.at(k.cue('b', i * 0.35), 0.5, 'back')); // x = mép trái xe
        chip(k, 'MÔ PHỎNG', k.W - 60, 70, { align: 'right', p: k.at('a', 0.6) });
      },
    },
    {
      say: '{a}Đặt một người trưởng thành bên cạnh. {b}Cả người bạn còn chưa dài bằng vây đuôi của nó.',
      draw(k) {
        cream(k);
        const s = 52; // px mỗi mét
        k.ctx.fillStyle = 'rgba(14,26,43,0.08)'; k.ctx.fillRect(0, 900, k.W, 6);
        whale(k, 1060, 620, 30 * s, { sil: true, color: P.whale, alpha: 0.85 });
        human(k, 240, 900, 1.7 * s * k.at('a', 0.8, 'back'), { color: P.ink, stroke: false });
        label(k, '1,7 m', 240, 760, 'a', { size: 44, color: P.ink, outline: P.cream });
        label(k, 'CHƯA BẰNG VÂY ĐUÔI', 520, 990, 'b', { size: 52, color: P.red, outline: P.cream });
      },
    },
  ],
};
export default video;
