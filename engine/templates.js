// Cảnh mẫu dùng lại giữa các video. Mỗi hàm trả về một object cảnh { say, draw, ... }.
import { C } from './kit.js';

// Nhãn chữ theo ngôn ngữ kênh: truyền lang: 'en' cho kênh tiếng Anh (mặc định 'vi').
const LABELS = {
  vi: { sub: 'ĐĂNG KÝ', subbed: 'ĐÃ ĐĂNG KÝ ✓', full: 'XEM BẢN ĐẦY ĐỦ', next: 'TẬP SAU' },
  en: { sub: 'SUBSCRIBE', subbed: 'SUBSCRIBED ✓', full: 'WATCH THE FULL VIDEO', next: 'NEXT EPISODE' },
};

// Thẻ tiêu đề lớn. icons: [{name, x, y, size}] vẽ quanh tiêu đề.
export function titleScene({ say, title, subtitle, icons = [], sfx = [], ...rest }) {
  return {
    say, ...rest,
    sfx: [['slideUp', 0.2, 0.5], ['tada', 1.5, 0.6], ...icons.map((_, i) => ['pop', 1.2 + i * 0.35, 0.5]), ...sfx],
    draw(k) {
      const cx = k.W / 2, cy = k.H / 2 - 40;
      const p = k.at(0.25, 1.4, 'inOut');
      const box = k.text(title, cx, cy, { size: k.W < k.H ? 110 : 120, font: 'title', p, maxWidth: k.W * 0.82 });
      k.underline(cx - box.w / 2, cy + box.h / 2 + 18, box.w, { p: k.at(1.5, 0.6), width: 6 });
      if (subtitle) k.text(subtitle, cx, cy + box.h / 2 + 90, { size: 54, color: C.gray, fx: 'fade', p: k.at(1.9, 0.6) });
      icons.forEach((ic, i) => k.icon(ic.name, ic.x, ic.y, ic.size ?? 170, { p: k.at(1.2 + i * 0.35, 0.9), ...ic }));
    },
  };
}

// Danh sách ý, mỗi ý hiện theo một cue trong lời thoại: items: [{ text, cue, icon }].
export function bulletsScene({ say, title, items, sfx = [], ...rest }) {
  return {
    say, ...rest,
    sfx: [...items.map((it, i) => ['pop', it.cue ?? 1 + i, 0.6]), ...sfx],
    draw(k) {
      const top = title ? 300 : 220;
      if (title) {
        const b = k.text(title, k.W / 2, 140, { size: 92, font: 'title', p: k.at(0.1, 1) });
        k.underline(k.W / 2 - b.w / 2, 200, b.w, { p: k.at(0.9, 0.5) });
      }
      const gap = Math.min(190, (k.H - top - 120) / items.length);
      items.forEach((it, i) => {
        const y = top + gap * i + gap / 2;
        const p = k.at(it.cue ?? 1 + i, 1.1);
        const x = k.W * 0.2;
        if (it.icon) k.icon(it.icon, x, y, 130, { p });
        else k.circle(x, y, 22, { p, fill: C.yellow });
        k.text(it.text, x + 110, y, { size: 62, align: 'left', p: k.at(it.cue ?? 1 + i, 1.6, 'linear'), maxWidth: k.W * 0.62 });
      });
    },
  };
}

// Kêu gọi đăng ký: nút "ĐĂNG KÝ" được con trỏ bấm vào ở cue `sub`, kèm chuông.
export function subscribeScene({ say, question, channel, lang = 'vi', sfx = [], ...rest }) {
  const L = LABELS[lang];
  return {
    say, ...rest,
    sfx: [...(question ? [['boing', 'q', 0.5]] : []), ['pop', 'sub', 0.7], ['click', ['sub', 2], 0.9], ['ding', ['sub', 2.4], 0.6], ...sfx],
    draw(k) {
      const cx = k.W / 2;
      const by = k.W < k.H ? 860 : 640, bw = 520, bh = 140;
      if (question) {
        k.icon('question', cx - 520, by - 390, 170, { p: k.at('q', 0.8) });
        k.text(question, cx + 60, by - 390, { size: 70, font: 'title', p: k.at('q', 1.8, 'linear'), maxWidth: 1050 });
      }
      const sub = k.cue('sub');
      const shown = k.at(sub, 0.7, 'back');
      const clicked = k.t > sub + 2.2;
      k.group({ x: cx, y: by, s: 0.6 + 0.4 * shown * (clicked ? 1 : 1 + 0.04 * Math.sin(k.t * 8)), a: k.at(sub, 0.3) }, () => {
        k.rect(-bw / 2, -bh / 2, bw, bh, { fill: clicked ? C.gray : C.red, fillStyle: 'solid', stroke: C.ink, width: 4, rough: 1.4 });
        k.text(clicked ? L.subbed : L.sub, 0, 4, { size: k.clean ? 60 : 76, font: 'title', color: C.white });
      });
      // chuông
      const bell = k.at(sub + 2.4, 0.6, 'back');
      if (bell > 0) k.group({ x: cx + 380, y: by, s: bell, r: Math.sin(k.t * 18) * 0.25 * Math.max(0, 1 - (k.t - sub - 2.4) / 1.5) }, () => {
        k.path('M -34 22 Q -30 -10 -24 -24 Q -14 -44 0 -44 Q 14 -44 24 -24 Q 30 -10 34 22 Z', { fill: C.yellow, fillStyle: 'solid', width: 4, seed: 11 });
        k.line(-44, 24, 44, 24, { width: 5, seed: 12 });
        k.dot(0, 34, 10, C.ink);
      });
      // con trỏ chuột bay tới nút rồi bấm
      const mv = k.at(sub + 0.8, 1.2, 'inOut');
      if (mv > 0 && k.t < sub + 4.5) {
        const x = k.lerp(cx + 700, cx + 60, mv), y = k.lerp(by + 360, by + 30, mv);
        const press = k.t > sub + 2 && k.t < sub + 2.3 ? 0.85 : 1;
        k.group({ x, y, s: press * 1.1 }, () => {
          k.poly([[0, 0], [0, 70], [18, 54], [32, 84], [44, 78], [30, 50], [54, 50]], { fill: C.white, fillStyle: 'solid', width: 4, seed: 13 });
        });
      }
      if (channel) k.text(channel, cx, by + 260, { size: 64, font: 'title', color: C.blue, fx: 'fade', p: k.at(sub + 1, 0.8) });
    },
  };
}

// Shorts: cảnh cuối mời xem video dài. image = tên ảnh trong meta.images (thường là thumbnail tập dài); say chứa {full}.
// Mũi tên chỉ xuống chỗ YouTube hiện nút "video liên quan".
export function fullVideoScene({ say, image, title, channel, lang = 'vi', sfx = [], ...rest }) {
  const L = LABELS[lang];
  return {
    say, ...rest,
    sfx: [['whoosh', 'full', 0.5], ['ding', ['full', 0.6], 0.5], ...sfx],
    draw(k) {
      if (k.clean) k.backdrop('dawn', {});
      const p = k.at('full', 0.6, 'back');
      k.text(L.full, k.W / 2, 230, { size: L.full.length > 16 ? 74 : 92, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('full', 0.4), outline: '#fffaf0', outlineWidth: 14 });
      const w = k.W - 120, h = (w * 9) / 16, y0 = 330;
      k.group({ x: k.W / 2, y: y0 + h / 2, s: Math.max(0.01, p), r: -0.02 }, () => {
        k.rect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24, { fill: '#fffaf0', width: 6, p: p > 0 ? 1 : 0, seed: 801 });
        if (image) k.image(image, -w / 2, -h / 2, w, h, { fx: 'fade', p: p > 0 ? 1 : 0 });
      });
      if (title) k.text(title, k.W / 2, y0 + h + 110, { size: 52, font: 'title', maxWidth: k.W - 120, p: k.at(k.cue('full', 0.6), 1.2, 'linear'), outline: '#fffaf0', outlineWidth: 10 });
      if (channel) k.text(channel, k.W / 2, y0 + h + 300, { size: 64, font: 'title', color: C.blue, fx: 'fade', p: k.at(k.cue('full', 1.2), 0.6), outline: '#fffaf0', outlineWidth: 10 });
      const bob = Math.sin(k.t * 6) * 16;
      k.arrow(k.W / 2, 1600 + bob, k.W / 2, 1760 + bob, { p: k.at(k.cue('full', 1.5), 0.5), width: 10, head: 40, stroke: '#b5482c', seed: 802 });
    },
  };
}

// Poster "TẬP SAU": giới thiệu tập kế tiếp để người xem muốn đăng ký. Đặt ngay trước subscribeScene.
// say phải chứa {next} (lúc hiện poster); hook = câu hỏi gây tò mò; art(k) vẽ minh hoạ trong khung (tuỳ chọn);
// when = lịch phát hành (vd "Thứ Năm tuần sau").
export function nextEpisodeScene({ say, title, hook, when, art, lang = 'vi', sfx = [], ...rest }) {
  const L = LABELS[lang];
  return {
    say, ...rest,
    sfx: [['drumroll', 0.2, 0.4], ['tada', 'next', 0.5], ...sfx],
    draw(k) {
      const p = k.at('next', 0.7, 'back');
      if (k.clean) k.backdrop('dawn', {});
      k.text(L.next, k.W / 2, 120, { size: 90, font: 'title', color: '#b5482c', fx: 'pop', p: k.at('next', 0.4), outline: '#fffaf0', outlineWidth: 12 });
      k.group({ x: k.W / 2, y: 560, s: Math.max(0.01, p), r: -0.02 }, () => {
        k.rect(-560, -330, 1120, 660, { fill: '#2b2f3d', stroke: '#fffaf0', width: 10, p: p > 0 ? 1 : 0 });
        if (art) k.group({ x: 0, y: 40 }, () => art(k));
        k.text(title, 0, -215, { size: 60, font: 'title', color: '#fff3c4', maxWidth: 1040, outline: '#1b1b24', outlineWidth: 10, p: p > 0 ? 1 : 0 });
        if (hook) k.text(hook, 0, 255, { size: 46, font: 'title', color: '#9fe8c8', maxWidth: 1040, outline: '#1b1b24', outlineWidth: 8, p: k.at(k.cue('next', 1), 1.4, 'linear') });
      });
      if (when) k.text(when, k.W / 2, 1000, { size: 46, font: 'title', color: '#3b2f2a', fx: 'fade', p: k.at(k.cue('next', 1.5), 0.6), outline: '#fffaf0', outlineWidth: 8 });
    },
  };
}
