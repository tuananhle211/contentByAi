// Shorts kênh Nếu Bạn Là — cắt từ "Tầng 4 (Phần 2)" (073): bảng chỉ tiêu lò lừa đảo. Concept: #9* #8 #3.
// Chỉ tiêu ~50 người/ngày, lương 700 USD, phạt 400–1.000 USD, giữ hộ chiếu: Dân trí 04/11/2026.
import { fullVideoScene } from '/engine/templates.js';
import { G, HO, KHAI, CHANTRAN, TOTRUONG, spk, scamRoom, safe, vert, vbg, vcap, tRays, tSticker, tBig, tCircle } from '/channel/neu-ban-la.js';

const S = 520;
const board = (k, x, y, s, o = {}) => k.group({ x, y, s, r: -0.02 }, () => {
  k.rect(-440, -330, 880, 660, { fill: '#f4efe6', fillStyle: 'solid', width: 5, seed: 31 });
  k.text('NỘI QUY · CHỈ TIÊU', 0, -260, { size: 52, font: 'title', color: '#1b1b24' });
  k.text('🎯 50 người / ngày', -390, -140, { size: 56, font: 'title', color: '#2e6da4', align: 'left', fx: 'pop', p: o.a ?? 1 });
  k.text('💵 Lương 700 $', -390, -20, { size: 56, font: 'title', color: '#2b7a3a', align: 'left', fx: 'pop', p: o.b ?? 1 });
  k.text('❌ PHẠT 400–1.000 $', -390, 120, { size: 60, font: 'title', color: '#d63a2f', align: 'left', fx: 'pop', p: o.c ?? 1 });
});

export default {
  meta: {
    title: 'Lò lừa đảo phạt nhân viên nếu lừa không đủ người? 💸 #shorts',
    description: 'Bên trong một lò lừa đảo thuê trọn khách sạn: chỉ tiêu 50 nạn nhân mỗi ngày, lương 700 đô, lừa không đủ thì bị phạt tới 1.000 đô, hộ chiếu nằm trong két. Truyện hư cấu dựa trên tin báo chí tháng 11/2026. Xem bản đầy đủ trên kênh Nếu Bạn Là!',
    links: [['▶ Bản đầy đủ', '073-neu-ban-la-le-tan-khach-san-tang-4-p2']],
    tags: ['lò lừa đảo', 'chỉ tiêu lừa đảo', 'bị phạt', 'giữ hộ chiếu', 'shorts', 'nếu bạn là'],
    hashtags: ['shorts', 'luadao', 'canhgiac'],
    format: 'short', captions: true,
    style: 'clean', tts: 'edge', voice: 'vi-VN-NamMinhNeural', speed: 1.1,
    lead: 0.15, tail: 0.3, pause: 0.12,
    transition: 'cut', sfxTransitions: false, camera: 0.03, sfxVolume: 0.6,
    images: { poster: 'assets/poster.jpg' },
    paper: '#14161d', privacy: 'private',
  },
  thumbnail(k) {
    tRays(k, '#1d2f5a', '#2a4580', 540, 1000);
    tSticker(k, () => board(k, 540, 930, 1.05), 12);
    tCircle(k, 560, 1060, 470, 100);
    tSticker(k, () => k.char(540, 2150, 1050, { ...CHANTRAN, face: 'cry', tears: 1, sweat: true, pose: 'shrug', shadow: false }), 16);
    tBig(k, 'LỪA KHÔNG ĐỦ', 540, 200, 110, '#ffffff', { r: -0.04 });
    tBig(k, 'NGƯỜI…', 540, 340, 110, '#ffffff', { r: -0.04 });
    tBig(k, 'BỊ PHẠT 1.000 $?!', 540, 490, 100, '#ffe066', { box: '#d63a2f', r: -0.04 });
  },
  scenes: [
    {
      say: 'Ở lò lừa đảo, có bảng chỉ tiêu y như công ty thật. {n50}Mỗi người: năm mươi nạn nhân một ngày. {q}Không đủ thì sao?',
      sfx: [['pop', 0.2, 0.4], ['pop', 'n50', 0.4], ['boing', 'q', 0.4]],
      draw(k) {
        vbg(k);
        board(k, 540, 760, 1, { a: k.at('n50', 0.4), b: 0, c: 0 });
        vcap(k, 'KHÔNG ĐỦ THÌ SAO?', 'q', { color: '#fff' });
      },
    },
    {
      say: '{pay}Lương bảy trăm đô. {fine}Không đạt: phạt từ bốn trăm tới một nghìn đô. {joke}Tức là lừa không đủ, thì phải trả tiền cho chính người đã lừa mình sang đây.',
      sfx: [['cash', 'pay', 0.4], ['bonk', 'fine', 0.6], ['boing', 'joke', 0.4]],
      draw(k) {
        vbg(k);
        board(k, 540, 640, 1, { a: 1, b: k.at('pay', 0.4), c: k.at('fine', 0.4) });
        k.char(540, 1420, S * 0.9, { ...CHANTRAN, face: k.t > k.cue('fine') ? 'cry' : 'sad', tears: k.at('fine', 1) * 0.6, pose: 'shrug', shadow: false });
        vcap(k, 'LỪA THIẾU → BỊ PHẠT', 'joke', { color: '#f2c230' });
      },
    },
    {
      say: '{dep}Mỗi lần có người nạp tiền, {clap}cả phòng đứng dậy vỗ tay, tổ trưởng gõ chuông. {ten}Mười triệu. Có khi, là tiền của bố bạn.',
      sfx: [['ding', 'dep', 0.6], ['tada', 'clap', 0.5], ['scratch', 'ten', 0.4]],
      draw(k) {
        vbg(k);
        vert(k, 900, () => {
          scamRoom(k);
          const clap = k.t > k.cue('clap');
          for (let i = 0; i < 4; i++) k.char(420 + i * 300, clap ? 700 : 760, S * 0.62, { ...HO(['#5a5f66', '#3d7fc1', '#8a8f98', '#6b8e5a'][i], { hair: ['buzz', 'short', 'spiky', 'short'][i] }), face: clap ? 'laugh' : 'calm', pose: clap ? 'cheer' : { l: [60, -40], r: [60, -40] }, shadow: false });
          if (clap) k.burst(900, 260, 110, '👏👏', { p: k.at('clap', 0.3) });
        });
        vcap(k, k.t > k.cue('ten') ? '10 TRIỆU = TIỀN CỦA BỐ?' : '✅ ĐÃ NẠP 10.000.000Đ', k.t > k.cue('ten') ? 'ten' : 'dep', { color: k.t > k.cue('ten') ? '#ff8a7a' : '#7fe0a8', size: 64 });
      },
    },
    {
      say: '{l1}Me. Seven hundred dollar. Never pay.{e1} {safe}Hộ chiếu cả phòng, nằm trong két sắt. {q}Họ là kẻ đi lừa, hay cũng là người bị lừa?',
      sfx: [['scratch', 'l1', 0.3], ['pop', 'safe', 0.4], ['boing', 'q', 0.4]],
      draw(k) {
        vbg(k);
        vert(k, 1100, () => { scamRoom(k); safe(k, 1500, G, 1.1, {}); k.char(860, G, S, { ...CHANTRAN, face: 'cry', tears: 0.8, pose: k.t > k.cue('safe') ? 'point' : 'shrug', talk: spk(k, 'l1', 'e1') }); });
        vcap(k, 'KẺ LỪA HAY BỊ LỪA?', 'q', { color: '#f2c230' });
      },
    },
    fullVideoScene({
      say: '{full}Và cậu lễ tân mua SIM cho họ, đã làm gì? Xem bản đầy đủ trên kênh Nếu Bạn Là nhé.',
      image: 'poster',
      title: 'Nếu Bạn Là Lễ Tân Khách Sạn… Tầng 4 (Phần 2)',
      channel: 'Nếu Bạn Là',
      tail: 1.2,
    }),
  ],
};
