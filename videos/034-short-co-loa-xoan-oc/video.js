// Shorts — Vì sao thành Cổ Loa lại xoắn như con ốc? (cắt từ 033). Khuôn Short "Vì sao…" giữ chân tốt nhất kênh (020 Xăm mình):
//   câu đầu = câu hỏi tiêu đề → "không phải để đẹp đâu" → lật hình trong 5 giây → một câu thoại nhân vật → giải mã.
// Đối chiếu: Toàn thư (Thục kỷ): đắp thành đến đâu lở đến đấy; rùa vàng giúp, nửa tháng xong; thành xoắn như trôn ốc → Loa thành; rùa tháo
//   vuốt làm lẫy nỏ. Khảo cổ: ba vòng thành đất (vòng ngoài ~8 km), hào nước; tháng 6/1959 ở Cầu Vực đào được ~1 vạn mũi tên đồng (93 kg).
import { fullVideoScene } from '/engine/templates.js';
import { SG, KC, DAN, T, stamp, shortMeta } from '/channel/ve-la-hieu.js';

const ADV = { body: 'big', outfit: 'tunic', color: '#4a4a5a', color2: '#c9a24a', hat: 'helmet', hair: 'short', beard: true, cape: '#2b2f3d' };

function spiral(k, cx, cy, R, p, seed = 980) {
  const pts = [];
  for (let i = 0; i <= 60; i++) { const a = (i / 60) * Math.PI * 6, r = R * (1 - i / 66); pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.8]); }
  k.curve(pts, { stroke: '#a0703f', width: 12, p, seed });
}
function citadel(k, cx, cy, s, p) {
  const ring = (rx, ry, j) => {
    const pts = [];
    for (let i = 0; i <= 28; i++) {
      const a = (i / 28) * Math.PI * 2, r = 1 + 0.08 * Math.sin(a * 3 + j) + 0.05 * Math.cos(a * 5 + j * 2);
      pts.push([cx + Math.cos(a) * rx * r * s, cy + Math.sin(a) * ry * r * s]);
    }
    return pts;
  };
  const rings = [ring(440, 380, 0.4), ring(300, 260, 1.9)];
  rings.forEach((r, i) => k.curve(r, { stroke: '#5b9bd5', width: 34 * s, p: p[3], seed: 950 + i }));
  rings.forEach((r, i) => k.curve(r, { stroke: '#a0703f', width: 15 * s, p: p[i], seed: 960 + i }));
  k.rect(cx - 110 * s, cy - 90 * s, 220 * s, 180 * s, { stroke: '#a0703f', width: 15 * s, p: p[2], seed: 970 });
}

export default {
  meta: shortMeta({
    title: 'Vì sao thành Cổ Loa lại xoắn như con ốc? 🐚 #shorts',
    description: 'Tương truyền thành Cổ Loa cuộn như vỏ ốc vì được rùa vàng giúp xây trong nửa tháng. Còn ngoài đời, ba vòng thành đất ấy giấu một bí mật khác: gần một vạn mũi tên đồng. Xem tập đầy đủ "Nỏ thần có thật không? Mỵ Châu – Trọng Thủy" trên kênh Vẽ Là Hiểu!',
    tags: ['thành cổ loa', 'cổ loa', 'loa thành', 'an dương vương', 'rùa vàng', 'nỏ thần', 'mũi tên đồng cổ loa', 'mỵ châu trọng thủy'],
    hashtags: ['coloa', 'nothan'],
    voices: { rua: { voice: 'vi-VN-NamMinhNeural', pitch: '-20Hz', rate: '-14%' } },
  }),

  scenes: [
    {
      lead: 0.1,
      say: 'Vì sao thành Cổ Loa {snail}lại xoắn như con ốc? {not}Không phải để đẹp đâu. {why}Mà vì… {turtle}một con rùa.',
      sfx: [['pop', 0.1], ['scratch', 'snail', 0.5], ['bonk', 'not', 0.5], ['drumroll', 'why', 0.3], ['sparkle', 'turtle', 0.6]],
      draw(k) {
        k.backdrop('day', { ground: SG });
        const r = k.at('turtle', 0.8, 'out');
        T(k, 'CỔ LOA', 540, 220, 150, '#b5482c', k.at(0.1, 0.5));
        T(k, 'xoắn như con ốc?', 540, 370, 80, '#3b2f2a', k.at('snail', 0.6));
        k.group({ a: 1 - r }, () => {
          k.rect(140, 480, 800, 620, { fill: '#e9d9b0', fillStyle: 'solid', width: 5, seed: 10, p: 1 });
          spiral(k, 540, 790, 330, k.at('snail', 1.4));
          T(k, 'để đẹp', 540, 790, 90, '#6b5f55', k.at('not', 0.4));
          k.icon('cross', 540, 790, 260, { p: k.at(k.cue('not', 0.3), 0.3) });
        });
        k.ellipse(540, 1150, 900 * Math.max(0.01, r), 200 * Math.max(0.01, r), { fill: '#5b9bd5', fillStyle: 'solid', width: 4, seed: 11 });
        k.prop('turtle', 540, k.lerp(1300, 900, r), 640, { glow: true, p: r > 0 ? 1 : 0, alpha: r });
        k.vignette(0.3 * r);
      },
    },
    {
      say: [
        'Sử cũ chép: {build}An Dương Vương đắp thành, {fall}đắp đến đâu, lở đến đấy. {gold}Rồi rùa vàng hiện lên giúp vua. {half}Nửa tháng, thành xong, cuộn như vỏ ốc, {name}nên gọi là Loa thành: thành ốc. {claw}Trước khi đi, rùa còn để lại một chiếc vuốt:',
        { v: 'rua', text: '{give}Đem làm lẫy nỏ, giặc đến thì cứ bắn!' },
      ],
      sfx: [['pop', 'build'], ['boom', 'fall', 0.5], ['sparkle', 'gold', 0.5], ['tada', 'half', 0.5], ['pop', 'name'], ['pop', 'claw'], ['ding', 'give', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: SG });
        const base = 200 * k.at('build', 1);
        const fallen = base * (1 - 0.85 * k.at('fall', 0.5));
        const h = fallen + (300 - fallen) * k.at('half', 1.4, 'inOut');
        k.poly([[100, SG + 2], [240, SG - h], [840, SG - h], [980, SG + 2]], { fill: '#b98a55', fillStyle: 'solid', width: 5, seed: 20 });
        k.burst(540, SG - 160, 90, 'ẦM!', { p: k.at('fall', 0.4) * (1 - k.at(k.cue('fall', 1.2), 0.3)), size: 44 });
        k.char(230, SG + 40, 420, { ...ADV, face: k.t > k.cue('half') ? 'happy' : k.t > k.cue('fall') ? 'sad' : 'smug', pose: k.t > k.cue('gold') ? 'cheer' : 'point', p: k.at('build', 0.5), shadow: false });
        k.prop('turtle', 780, 820, 360, { glow: true, talk: k.t > k.cue('give'), p: k.at('gold', 0.6), bob: 4 });
        T(k, 'NỬA THÁNG!', 540, 220, 110, '#e4572e', k.at('half', 0.5));
        T(k, 'LOA THÀNH = thành ốc', 540, 360, 70, '#b5482c', k.at('name', 0.5));
        k.bubble(380, 470, 660, 150, 760, 700, { p: k.at('give', 0.4), text: 'Làm lẫy nỏ, giặc đến cứ bắn!', size: 46 });
      },
    },
    {
      say: '{real}Còn ngoài đời: {three}Cổ Loa có ba vòng thành đắp bằng đất, {outer}vòng ngoài dài gần tám cây số, {moat}bên ngoài là hào nước. {layer}Ba vòng thành, ba lớp phòng thủ: giặc vượt được vòng này, lại gặp vòng khác. {defend}Nhìn từ trên cao thì giống vỏ ốc, nhưng thật ra là… một mê cung cho quân giặc.',
      sfx: [['scratch', 'real', 0.4], ['pop', 'three'], ['pop', 'outer'], ['whoosh', 'moat', 0.4], ['boom', 'layer', 0.4], ['boing', ['defend', 2.2], 0.5]],
      draw(k) {
        T(k, 'CỔ LOA THẬT', 540, 200, 110, '#b5482c', k.at('real', 0.5));
        citadel(k, 540, 720, 0.9, [k.at('three', 1), k.at(k.cue('three', 0.4), 1), k.at(k.cue('three', 0.8), 0.8), k.at('moat', 1.2)]);
        T(k, 'vòng ngoài ~8 km', 540, 330, 64, '#a0703f', k.at('outer', 0.5));
        T(k, 'hào nước', 540, 1150, 56, '#2e6da4', k.at('moat', 0.5), { fx: 'fade' });
        const g = k.at('layer', 2.4, 'linear');
        for (let i = 0; i < 3; i++) {
          const ang = -0.9 + i * 0.3, rr = 470 - g * 330;
          k.char(540 + Math.cos(ang) * rr, 720 + Math.sin(ang) * rr * 0.85 + 60, 130, { body: 'man', outfit: 'tunic', color: '#7a2e2e', color2: '#c9a24a', hat: 'helmet', hair: 'short', face: g > 0.5 ? 'shock' : 'angry', pose: 'point', shadow: false, flip: true, p: k.at(k.cue('layer', i * 0.1), 0.3) });
        }
        k.sweat(840, 520, 1, { p: k.at(k.cue('layer', 1.6), 0.4) });
        stamp(k, 540, 1265, 'MÊ CUNG CHO GIẶC', k.at('defend', 0.5), { w: 680, size: 60 });
      },
    },
    {
      say: '{and}Còn nỏ thần? {y}Năm 1959, ngay cạnh thành, công nhân đào được {pile}gần một vạn mũi tên đồng, {same}giống nhau như đúc. {maybe}Có lẽ, đó mới là phép thần thật của Cổ Loa.',
      sfx: [['pop', 'and'], ['pop', 'y'], ['sparkle', 'pile', 0.5], ['ding', 'same', 0.4], ['tada', 'maybe', 0.5]],
      draw(k) {
        k.backdrop('day', { ground: 760 });
        k.rect(-40, 760, 1160, 1400, { fill: '#c9a26a', fillStyle: 'solid', width: 4, seed: 30 });
        T(k, 'NỎ THẦN?', 540, 200, 120, '#b5482c', k.at('and', 0.5));
        T(k, '1959 · CẦU VỰC', 540, 340, 70, '#3b2f2a', k.at('y', 0.5));
        k.prop('crossbow', 820, 560, 260, { glow: true, p: k.at('and', 0.5) });
        k.char(240, 760, 300, { ...DAN(KC[1], { outfit: 'tunic', hat: 'non' }), face: k.t > k.cue('pile') ? 'shock' : 'happy', pose: k.t > k.cue('pile') ? 'point' : 'hold', shadow: false, p: k.at('y', 0.4) });
        k.rect(180, 820, 720, 370, { fill: '#5a3d26', fillStyle: 'solid', width: 5, seed: 31 });
        for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
          const i = r * 6 + c;
          k.prop('arrowhead', 250 + c * 115, 880 + r * 110, 110, { rotate: (k.rand(i) - 0.5) * 0.7, p: k.at(k.cue('pile', i * 0.04), 0.3) });
        }
        T(k, '≈ 10.000', 540, 1000, 120, '#fff3c4', k.at(k.cue('pile', 0.9), 0.5));
        stamp(k, 540, 1265, 'PHÉP THẦN THẬT?', k.at('maybe', 0.5), { w: 620, size: 60, color: '#3f6f2a' });
      },
    },
    fullVideoScene({
      say: '{full}Vậy có nỏ thần, có thành ốc, mà sao vẫn mất nước? Xem tập đầy đủ trên kênh Vẽ Là Hiểu nhé!',
      image: 'poster',
      title: 'Nỏ thần có thật không? Mỵ Châu – Trọng Thủy và thành Cổ Loa',
      channel: 'Vẽ Là Hiểu',
      tail: 1.2,
    }),
  ],
};
