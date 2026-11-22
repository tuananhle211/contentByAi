// Shorts — Vì sao người Việt cổ xăm mình? (dọc 9:16, cắt từ tập 019 Thuồng luồng)
// Đối chiếu: Đại Việt sử ký toàn thư, Ngoại kỷ – Hồng Bàng thị: dân xuống sông đánh cá bị giao long hại; vua bảo loài nước ưa đồng loại,
//   ghét dị loại; bảo lấy mực vẽ hình thủy quái lên mình → thuồng luồng không hại nữa. Kỷ nhà Trần: gia pháp con cháu chạm rồng ở đùi;
//   Anh Tông lúc lên ngôi lẩn tránh việc ấy.
import { C } from '/engine/kit.js';
import { fullVideoScene } from '/engine/templates.js';

const G = 1250;
const RIVER = '#5b9bd5';
const KING = { body: 'man', outfit: 'robe', color: '#e8b84a', color2: '#b5482c', hat: 'kingfeather', beard: true, hair: 'short', cape: '#b5482c' };
const TRAN = { body: 'man', outfit: 'robe', color: '#f6c344', color2: '#b5482c', hat: 'crown', hair: 'topknot', cape: '#b5482c' };
const DAN = (c, extra = {}) => ({ body: 'man', outfit: 'bare', color: c, color2: '#f6c344', hair: 'short', hat: 'feather', ...extra });

function under(k) {
  const { ctx, W, H } = k;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#6db3df'); g.addColorStop(1, '#14304d');
  ctx.save(); ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400); ctx.restore();
  for (let i = 0; i < 10; i++) {
    const x = (i * 157) % W, y = H - ((k.gt * 60 + i * 97) % (H + 100));
    k.circle(x + Math.sin(k.gt * 2 + i) * 10, y, 6 + (i % 3) * 4, { stroke: '#d6ecfa', width: 2, seed: 900 + i, alpha: 0.6 });
  }
}

export default {
  meta: {
    style: 'clean',
    speed: 1.1,
    format: 'short',
    captions: true,
    title: 'Vì sao người Việt cổ phải xăm mình mới dám xuống sông? 🐉 #shorts',
    description: 'Không phải để đẹp, không phải để ngầu: người Việt cổ vẽ hình thủy quái lên mình để thuồng luồng tưởng là người nhà. Xem tập đầy đủ "Thuồng luồng có thật không?" trên kênh Vẽ Là Hiểu!',
    tags: ['thuồng luồng', 'người việt cổ xăm mình', 'tục xăm mình', 'giao long', 'truyền thuyết việt nam', 'nhà trần', 'shorts', 'vẽ là hiểu'],
    hashtags: ['shorts', 'thuongluong', 'suviet'],
    voice: 'vi-VN-NamMinhNeural',
    rate: '+0%',
    voices: {
      king: { voice: 'vi-VN-NamMinhNeural', pitch: '-12Hz', rate: '-6%' },
      anhtong: { voice: 'vi-VN-NamMinhNeural', pitch: '+8Hz', rate: '+12%' },
    },
    images: { poster: 'assets/poster.jpg' },
    music: 'assets/music/background.mp3',
    musicVolume: 0.08,
    sfxVolume: 0.5,
    transition: 'fade',
  },

  scenes: [
    {
      lead: 0.1,
      say: 'Vì sao người Việt cổ {tat}phải xăm mình, {river}mới dám xuống sông? {not}Không phải để đẹp đâu. {monster}Mà vì… con này.',
      sfx: [['scratch', 'tat', 0.5], ['pop', 'river'], ['bonk', 'not', 0.5], ['boom', 'monster', 0.6]],
      draw(k) {
        k.backdrop('day', { ground: G });
        const rise = k.at('monster', 1, 'out');
        k.prop('thuongluong', 600, k.lerp(1400, 980, rise), 760, { glow: true, open: 0.7 * rise, flip: true });
        k.water(1060, { color: RIVER, alpha: 0.9 });
        k.text('XĂM MÌNH', k.W / 2, 220, { size: 140, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('tat', 0.5), outline: '#fffaf0', outlineWidth: 16 });
        k.text('mới dám xuống sông?', k.W / 2, 360, { size: 72, font: 'title', p: k.at('river', 1, 'linear'), outline: '#fffaf0', outlineWidth: 12 });
        k.group({ a: 1 - k.at('monster', 0.4) }, () => {
          k.char(k.W / 2, 1060, 520, { ...DAN('#b5482c'), tattoo: k.t > k.cue('tat'), face: k.t > k.cue('not') ? 'smug' : 'happy', pose: 'hips', p: k.at(0, 0.5) });
          k.text('để đẹp', 780, 560, { size: 70, font: 'title', color: '#6b5f55', fx: 'pop', p: k.at('not', 0.4), outline: '#fffaf0', outlineWidth: 10 });
          k.icon('cross', 780, 560, 160, { p: k.at(k.cue('not', 0.3), 0.3) });
        });
        k.vignette(0.35 * rise);
      },
    },
    {
      say: [
        'Sử cũ chép: thời vua Hùng, {fish}dân xuống sông đánh cá {bite}hay bị thuồng luồng cắn. {king}Vua bảo:',
        { v: 'king', text: '{logic}Loài dưới nước ưa đồng loại, ghét kẻ khác loài.' },
        '{ink}Vậy thì vẽ hình thủy quái lên mình, {friend}cho nó tưởng là người nhà!',
      ],
      sfx: [['pop', 'fish'], ['boom', 'bite', 0.5], ['pop', 'king'], ['scratch', 'ink', 0.5], ['tada', 'friend', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: G });
        k.prop('thuongluong', 680, 820, 400, { glow: true, open: 0.8 * k.at('bite', 0.4), p: k.at('bite', 0.4), flip: true });
        k.water(760, { color: RIVER, alpha: 0.9 });
        k.poly([[600, 1010], [1140, 1010], [1140, 2000], [500, 2000]], { fill: '#8fbf6a', fillStyle: 'solid', width: 4, seed: 31 });
        k.prop('boat', 360, 790, 380, { fill: '#c98a3a', bob: 5, p: k.at('fish', 0.4) });
        k.char(360, 770, 240, { ...DAN('#3b6ea5'), tattoo: k.t > k.cue('ink'), face: k.t > k.cue('ink') ? 'laugh' : k.t > k.cue('bite') ? 'shock' : 'happy', pose: k.t > k.cue('bite') && k.t < k.cue('ink') ? 'shout' : 'hold', p: k.at('fish', 0.4), shadow: false });
        k.burst(620, 520, 80, 'ÁI!', { p: k.at('bite', 0.4) * (1 - k.at('king', 0.3)), size: 50 });
        k.char(840, G, 380, { ...KING, face: k.t > k.cue('ink') ? 'smug' : 'calm', pose: k.t > k.cue('ink') ? 'present' : 'think', p: k.at('king', 0.5) });
        k.bubble(80, 900, 560, 150, 640, 1060, { p: k.at('logic', 0.4), text: 'Ưa đồng loại, ghét kẻ khác loài!', size: 44 });
        k.text('VẼ HÌNH THỦY QUÁI', k.W / 2, 220, { size: 90, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('ink', 0.5), outline: '#fffaf0', outlineWidth: 14 });
        k.text('= NGƯỜI NHÀ!', k.W / 2, 350, { size: 90, font: 'title', color: '#3f6f2a', fx: 'pop', p: k.at('friend', 0.5), outline: '#fffaf0', outlineWidth: 14 });
      },
    },
    {
      say: [
        '{trick}Thuồng luồng nhìn lên: {think}"À, họ hàng." {swim}Rồi bơi đi. {tran}Tục này kéo dài tới tận nhà Trần: {thigh}con cháu vua phải xăm rồng lên đùi. {at}Trừ vua Trần Anh Tông, {run}người đã lẩn đi, không chịu xăm.',
        { v: 'anhtong', text: '{bye}Hôm nay trẫm bận!' },
      ],
      sfx: [['pop', 'trick'], ['ding', 'think', 0.4], ['whoosh', 'swim', 0.5], ['pop', 'tran'], ['scratch', 'thigh', 0.4], ['whoosh', 'run', 0.5], ['boing', 'bye', 0.6]],
      draw(k) {
        const cut = k.at('tran', 0.5);
        k.group({ a: 1 - cut }, () => {
          under(k);
          k.char(380, 620, 440, { ...DAN('#b5482c'), tattoo: true, face: 'smug', pose: { l: [150, 10], r: [150, 10] }, bob: 6, shadow: false });
          const sw = k.at('swim', 1.8, 'in');
          k.prop('thuongluong', 720 + sw * 700, 1050, 560, { flip: true, open: 0.1, p: k.at('trick', 0.5) });
          k.bubble(500, 640, 480, 130, 700, 900, { p: k.at('think', 0.4), text: 'À, họ hàng.', size: 52, think: true });
        });
        k.group({ a: cut }, () => {
          k.backdrop('day', { ground: G });
          k.prop('palace', 820, 820, 520);
          k.prop('dragon', k.W / 2, 330, 420, { p: k.at('thigh', 0.6) });
          k.text('NHÀ TRẦN: XĂM RỒNG', k.W / 2, 160, { size: 76, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('tran', 0.5), outline: '#fffaf0', outlineWidth: 12 });
          const run = k.at('run', 1.4, 'inOut');
          k.char(560 - run * 300, G, 460, { ...TRAN, face: k.t > k.cue('run') ? 'shock' : 'calm', pose: k.t > k.cue('bye') ? 'wave' : 'stand', walk: run > 0 && run < 1, flip: run > 0 && run < 1, p: k.at('at', 0.5) });
          k.text('Trần Anh Tông', 560 - run * 300, 700, { size: 54, font: 'title', fx: 'fade', p: k.at('at', 0.5), outline: '#fffaf0', outlineWidth: 10 });
          k.bubble(380, 520, 520, 130, 300, 760, { p: k.at('bye', 0.4), text: 'Hôm nay trẫm bận!', size: 50 });
        });
      },
    },
    fullVideoScene({
      say: '{full}Vậy thuồng luồng thật ra là con gì? Xem tập đầy đủ trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: 'Thuồng luồng có thật không? Vì sao người Việt cổ xăm mình',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
