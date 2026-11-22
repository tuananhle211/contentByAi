// DEMO trần "Mức 1" (thuần code, không AI tạo hình): drama gia đình hoạt hình chuyển động.
// Khoe: nhép môi theo giọng thật (k.talk), nước mắt đọng → chảy, cận mặt, đẩy máy/zoom giật, đường tập trung manga,
// rung máy khi đập bàn, mưa ngoài cửa sổ, hơi cơm bốc, đổi biểu cảm theo lời, cú lật cuối.
import { ME, LAN, cam, roomBack, table, closeBg, soDo, vig } from '/channel/drama.js';

const clamp = (v) => Math.max(0, Math.min(1, v));
// Áp lực khi đập bàn: bát đĩa nảy lên rồi rơi xuống.
const bounce = (k, cue, dur = 0.35, h = 28) => { const u = (k.t - k.cue(cue)) / dur; return u > 0 && u < 1 ? Math.sin(u * Math.PI) * h : 0; };

export default {
  meta: {
    title: 'Mẹ chồng chê con dâu nghèo… và cái kết #shorts',
    description: 'Bản demo hoạt hình chuyển động: mẹ chồng chê con dâu nghèo ngay trong bữa cơm — nhưng con dâu đang giữ một thứ.',
    format: 'short', style: 'clean', captions: true,
    speed: 1.1, lead: 0.2, tail: 0.4, pause: 0.15,
    voice: 'vi-VN-HoaiMyNeural',
    voices: {
      me: { voice: 'vi-VN-HoaiMyNeural', pitch: '-20Hz', rate: '-6%' },
      lan: { voice: 'vi-VN-HoaiMyNeural', pitch: '+6Hz', rate: '-8%' },
    },
    transition: 'cut', camera: 0, sfxTransitions: false,
    music: 'assets/music/spooky.mp3', musicVolume: 0.09, sfxVolume: 0.6,
    paper: '#1e1a22',
    tags: ['drama gia đình', 'mẹ chồng nàng dâu', 'hoạt hình'],
    hashtags: ['shorts', 'mechongnangdau'],
    privacy: 'private',
  },

  scenes: [
    // 1 — TOÀN CẢNH: mẹ chồng đập bàn.
    {
      lead: 0.7,
      say: [{ v: 'me', text: '{slam}Nhà cô nghèo rớt mồng tơi, {q}lấy gì mà đòi làm dâu nhà này?' }],
      sfx: [['bonk', 'slam', 1], ['boom', ['slam', 0.02], 0.5]],
      draw(k) {
        const sh = k.shake('slam', 0.45, 24);
        const push = 1 + 0.12 * k.ease.inOut(k.p);
        const up = k.at(0.05, 0.4), hit = k.at('slam', 0.1, 'in');
        const raised = { l: [12, 6], r: [128, -12] }, onTable = { l: [12, 6], r: [38, -18] };
        const armMe = k.t < k.cue('slam') ? k.pose('hips', raised, up) : k.pose(raised, onTable, hit);
        cam(k, 470, 950, push, () => k.group({ x: sh.x, y: sh.y }, () => {
          roomBack(k);
          k.char(280, 1500, 860, { ...ME, pose: armMe, face: 'angry', flush: 0.45, look: 0.7, talk: k.talk('me'), tilt: 0.04 });
          const flinch = k.at('slam', 0.15) - k.at(k.cue('slam', 0.25), 0.4);
          k.char(800, 1500, 860, { ...LAN, flip: true, pose: 'hold', face: k.t > k.cue('slam') ? 'sad' : 'calm', lookY: k.at('q', 0.5) * 0.9, tilt: 0.1 * k.at('q', 0.6) - 0.08 * flinch, lean: -0.03 * flinch });
          table(k, 1150, { jump: bounce(k, 'slam') });
        }));
        vig(k, 0.45);
      },
    },

    // 2 — CẬN MẶT CON DÂU: nước mắt đọng rồi chảy.
    {
      lead: 1.2,
      say: [{ v: 'lan', text: 'Dạ… {tear}con biết nhà con nghèo.' }],
      draw(k) {
        const tears = 0.25 * k.at(0.15, 0.9) + 0.75 * k.at('tear', 1.4, 'inOut');
        const sob = k.t > k.cue('tear') ? Math.sin(k.gt * 13) * 4 * (1 - k.at('end', 0.8)) : 0;
        closeBg(k, { side: 'right' });
        cam(k, 540, 820, 1 + 0.07 * k.ease.inOut(k.p), () => {
          k.char(540, 2790 + sob, 2400, { ...LAN, flip: true, pose: 'hold', ol: 0.5, face: 'sad', tears, talk: k.talk('lan'), lookY: 0.8 - 0.9 * k.at('tear', 0.6), look: -0.6 * k.at('tear', 0.6), tilt: 0.06 });
        });
        vig(k, 0.55);
      },
    },

    // 3 — CẬN MẶT MẸ CHỒNG: zoom giật + đường tập trung.
    {
      lead: 0.25,
      say: [{ v: 'me', text: 'Biết thì {sign}ký đơn ly hôn đi!' }],
      sfx: [['boom', 'sign', 0.7], ['whoosh', ['sign', -0.05], 0.4]],
      draw(k) {
        const zoom = 1 + 0.16 * k.at('sign', 0.14, 'out');
        const sh = k.shake('sign', 0.35, 16);
        closeBg(k, { side: 'left', top: '#c7a27a', bottom: '#7d5638' });
        k.focusLines(540, 760, { p: k.at('sign', 0.1), r: 470, alpha: 0.75 });
        cam(k, 540, 760, zoom, () => k.group({ x: sh.x, y: sh.y }, () => {
          k.char(540, 2790, 2400, { ...ME, ol: 0.5, pose: k.pose('hips', 'point', k.at('sign', 0.2)), face: 'angry', flush: 0.5 + 0.4 * k.at('sign', 0.3), vein: k.t > k.cue('sign'), talk: k.talk('me'), look: 0.6, tilt: -0.03 });
        }));
        vig(k, 0.5);
      },
    },

    // 4 — TRUNG CẢNH CON DÂU: lau nước mắt, đặt sổ đỏ lên bàn.
    {
      lead: 0.5,
      say: [
        { v: 'lan', text: 'Dạ. {wipe}Vậy mẹ ký giúp con {book}cái này luôn nhé.' },
        { v: 'lan', text: 'Căn nhà mẹ thế chấp… {bank}ngân hàng bán cho con rồi.' },
      ],
      sfx: [['whoosh', 'book', 0.5], ['click', ['book', 0.45], 0.8], ['boom', ['bank', 0.9], 0.45]],
      draw(k) {
        const wipeUp = k.at('wipe', 0.3), wipeDown = k.at(k.cue('wipe', 0.7), 0.35);
        const wiping = { l: [12, 6], r: [28, 165] };
        const arm = wipeDown > 0 ? k.pose(wiping, 'hold', wipeDown) : k.pose('hold', wiping, wipeUp);
        const tears = 1 - k.at(k.cue('wipe', 0.3), 0.5);
        const firm = k.t > k.cue('wipe', 0.6);
        const push = 1 + 0.06 * k.ease.inOut(k.p) + 0.06 * k.at('bank', 0.25);
        cam(k, 540, 960, push, () => {
          cam(k, 640, 700, 1.5, () => roomBack(k));
          k.char(540, 1660, 1320, { ...LAN, flip: true, pose: arm, face: firm ? 'cold' : 'sad', tears: Math.max(0, tears), talk: k.talk('lan'), look: firm ? 0.5 : 0, lookY: firm ? 0 : 0.5, tilt: firm ? -0.04 : 0.06 });
          table(k, 1130, { x0: -200, x1: 1280, depth: 130, scale: 1.3, bowls: [1000], steam: true });
          const b = k.at('book', 0.5, 'out');
          soDo(k, k.lerp(980, 560, b), k.lerp(1900, 1200, b), 1.25, k.lerp(-0.5, -0.06, b));
        });
        vig(k, 0.45);
      },
    },

    // 5 — CẬN MẶT MẸ CHỒNG: chết lặng + cú chốt.
    {
      lead: 0.8, tail: 1.8,
      say: [{ v: 'me', text: 'Cái… cái gì?!' }],
      sfx: [['boom', 0.02, 0.9], ['slideDown', ['end', 0.2], 0.4]],
      draw(k) {
        const tremble = Math.sin(k.gt * 41) * 4;
        const { ctx, W, H } = k;
        const g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, '#3a3157'); g.addColorStop(1, '#14111f');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        k.focusLines(540, 760, { r: 520, color: '#e9e4ff', alpha: 0.35, n: 70 });
        cam(k, 540, 780, 1.05 + 0.2 * k.ease.inOut(k.p), () => k.group({ x: tremble, y: 0 }, () => {
          k.char(540, 2790, 2400, { ...ME, ol: 0.5, pose: 'stand', face: 'shock', gloom: k.at(0.1, 0.6), talk: k.talk('me'), gesture: false });
          k.sweat(800, 560, 3.2, { p: k.at(0.4, 0.3) });
          k.sweat(300, 620, 2.4, { p: k.at(0.7, 0.3) });
        }));
        k.flash(0.0, 0.5);
        vig(k, 0.6);
        const tc = k.at(k.cue('end', 0.3), 0.5, 'back');
        k.group({ x: 540, y: 300, s: Math.max(0.01, tc), a: clamp(tc * 2) }, () => {
          k.text('CÒN TIẾP…', 0, 0, { size: 120, font: 'title', color: '#ffd84d', outline: '#1b1b1b', outlineWidth: 18 });
        });
        k.text('Phần 2: mẹ chồng sẽ làm gì?', 540, 420, { size: 50, font: 'title', color: '#ffffff', outline: '#1b1b1b', outlineWidth: 10, p: k.at(k.cue('end', 0.7), 0.4), fx: 'fade' });
      },
    },
  ],

  thumbnail(k) {
    closeBg(k, { side: 'left', top: '#3a3157', bottom: '#14111f' });
    k.focusLines(540, 700, { r: 480, color: '#e9e4ff', alpha: 0.3, n: 70 });
    cam(k, 540, 760, 1.1, () => k.char(540, 2790, 2400, { ...ME, ol: 0.5, face: 'shock', gloom: 1 }));
    soDo(k, 760, 1500, 2.2, -0.12);
    k.text('MẸ CHỒNG', 540, 230, { size: 140, font: 'title', color: '#ffd84d', outline: '#1b1b1b', outlineWidth: 20 });
    k.text('CHẾT LẶNG', 540, 1780, { size: 140, font: 'title', color: '#ffffff', outline: '#c0392b', outlineWidth: 20 });
  },
};
