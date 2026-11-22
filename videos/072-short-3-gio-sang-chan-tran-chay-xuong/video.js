// Shorts kênh Nếu Bạn Là — cắt từ "Tầng 4 (Phần 1)" (070): đôi chân trần lúc 3 giờ sáng. Concept: #2* #8 #3.
// Chi tiết giữ hộ chiếu người làm trong lò lừa đảo: Dân trí 04/11/2026.
import { fullVideoScene } from '/engine/templates.js';
import { G, KHAI, LY, GUARD, CHANTRAN, spk, lobby, lobbyDesk, dollar, phone, tag, vert, vbg, vcap, tRays, tSticker, tBig, tArrow } from '/channel/neu-ban-la.js';

const S = 520;
const dial = (k, digits, hl) => (kk, w, h) => { kk.ctx.fillStyle = '#1f2a44'; kk.ctx.fillRect(-w / 2, -h / 2, w, h); kk.text(digits || '_', 0, -170, { size: 80, font: 'title', color: '#fff' }); for (let i = 0; i < 9; i++) { const x = -80 + (i % 3) * 80, y = -40 + Math.floor(i / 3) * 80; kk.ctx.fillStyle = i === 0 && hl ? '#f2c230' : '#3a4560'; kk.ctx.beginPath(); kk.ctx.arc(x, y, 32, 0, Math.PI * 2); kk.ctx.fill(); kk.text(String(i + 1), x, y + 2, { size: 30, font: 'title', color: '#fff' }); } };

export default {
  meta: {
    title: '3 giờ sáng, có người chân trần chạy xuống quầy lễ tân… 😨 #shorts',
    description: 'Ba giờ sáng, một cậu thanh niên chân trần lao xuống quầy lễ tân xin điện thoại: "Passport… they take." Bạn đã bấm 1, rồi 1. Thì thang máy mở. Truyện hư cấu dựa trên các vụ lò lừa đảo giữ hộ chiếu người làm được báo chí đưa tin tháng 11/2026. Xem bản đầy đủ trên kênh Nếu Bạn Là!',
    links: [['▶ Bản đầy đủ', '070-neu-ban-la-le-tan-khach-san-tang-4-p1']],
    tags: ['lò lừa đảo', 'giữ hộ chiếu', 'lễ tân khách sạn', 'tầng 4', 'shorts', 'nếu bạn là'],
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
    tSticker(k, () => k.char(540, 1980, 1300, { ...CHANTRAN, face: 'cry', tears: 1, sweat: true, pose: 'shout', shadow: false }), 16);
    tSticker(k, () => phone(k, 860, 1100, 0.9, { r: 0.12, screen: dial(k, '11', true) }), 12);
    tArrow(k, 700, 760, 820, 880);
    tBig(k, '3 GIỜ SÁNG…', 540, 190, 120, '#ffffff', { r: -0.04 });
    tBig(k, 'CÓ NGƯỜI', 540, 340, 110, '#ffffff', { r: -0.04 });
    tBig(k, 'CHÂN TRẦN CHẠY XUỐNG?!', 540, 495, 64, '#ffe066', { box: '#d63a2f', r: -0.04 });
  },
  scenes: [
    {
      say: 'Ba giờ sáng, bạn đang trực quầy lễ tân. {door}Cửa thoát hiểm bật mở. {run}Một cậu thanh niên gầy nhom, chân trần, lao xuống.',
      sfx: [['bonk', 'door', 0.6], ['whoosh', 'run', 0.5]],
      draw(k) {
        vbg(k);
        vert(k, 620, () => {
          lobby(k, { exit: k.at('door', 0.3) });
          k.char(k.lerp(150, 520, k.at('run', 0.8)), G, S * 0.95, { ...CHANTRAN, face: 'cry', tears: 0.6, sweat: true, pose: 'shout', walk: k.t < k.cue('run', 0.8), p: k.at('run', 0.4), flip: true });
          k.char(1000, G - 40, S, { ...KHAI, face: k.t > k.cue('run') ? 'shock' : 'blank', pose: 'hold' });
          lobbyDesk(k, { x: 760, w: 600 });
        });
        vcap(k, '3:00 SÁNG', 0.2, { color: '#f2c230' });
      },
    },
    {
      say: '{l1}Phone. Please. Passport, they take.{e1} {d1}Bạn bấm số một. {d2}Rồi thêm một số một nữa.',
      sfx: [['scratch', 'l1', 0.3], ['click', 'd1', 0.7], ['click', 'd2', 0.7]],
      draw(k) {
        vbg(k);
        k.char(300, 1380, S * 1.3, { ...CHANTRAN, face: 'cry', tears: 1, pose: 'shout', talk: spk(k, 'l1', 'e1'), shadow: false });
        k.bubble(80, 160, 920, 170, 300, 560, { p: k.at('l1', 0.4), text: 'PHONE… PLEASE… PASSPORT… THEY TAKE!', size: 46 });
        const digits = k.t > k.cue('d2') ? '11' : k.t > k.cue('d1') ? '1' : '';
        phone(k, 760, 900, 1.05, { r: 0.06, p: k.at('d1', 0.3) || (k.t > k.cue('e1') ? 1 : 0), screen: dial(k, digits, k.t > k.cue('d1')) });
        vcap(k, digits ? `ĐÃ BẤM: ${digits}` : 'HỘ CHIẾU BỊ GIỮ?', digits ? 'd1' : 'l1', { color: '#ff8a7a' });
      },
    },
    {
      say: '{ting}Ting. Thang máy mở. {drag}Hai gã to con lôi cậu ấy đi, nhẹ nhàng như dìu một người bạn say. {five}Năm tờ một trăm đô đặt lên quầy. {l1}Nó nhớ nhà, hơi tâm thần. Em không thấy gì nhé.{e1}',
      sfx: [['ding', 'ting', 0.6], ['whoosh', 'drag', 0.4], ['cash', 'five', 0.6]],
      draw(k) {
        vbg(k);
        vert(k, 1150, () => {
          lobby(k, { lift: k.at('ting', 0.6), floor: '4' });
          const u = k.at('drag', 2.5, 'inOut'), x = k.lerp(700, 1700, u);
          if (k.t > k.cue('drag')) { k.char(x - 150, G, S * 1.1, { ...GUARD, face: 'cold', pose: { l: [40, 20], r: [40, 20] }, walk: true }); k.char(x, G, S * 0.9, { ...CHANTRAN, face: 'cry', tears: 1, pose: 'shrug', walk: true }); k.char(x + 150, G, S * 1.1, { ...GUARD, face: 'cold', pose: { l: [40, 20], r: [40, 20] }, walk: true }); }
          else k.char(700, G, S * 0.9, { ...CHANTRAN, face: 'shock', tears: 0.6, pose: 'shrug' });
          k.char(1250, G, S, { ...LY, face: 'smug', pose: k.t > k.cue('five') ? 'point' : 'hips', talk: spk(k, 'l1', 'e1'), p: k.at('ting', 0.4) });
          k.char(960, G - 40, S, { ...KHAI, face: 'shock', pose: 'hold', sweat: true });
          lobbyDesk(k, { x: 760, w: 460 });
          for (let i = 0; i < 5; i++) dollar(k, 840 + i * 70, 620 - i * 6, 0.4, -0.2 + i * 0.1, k.at(k.cue('five', i * 0.12), 0.3));
        });
        vcap(k, '"EM KHÔNG THẤY GÌ NHÉ"', 'l1', { color: '#fff', size: 66 });
      },
    },
    {
      say: '{q}Nếu là bạn: bấm nốt số ba, hay bấm xoá? {del}Cậu lễ tân trong truyện, đã bấm xoá.',
      sfx: [['boing', 'q', 0.4], ['click', 'del', 0.6]],
      draw(k) {
        vbg(k);
        phone(k, 540, 820, 1.4, { r: 0.04, screen: dial(k, k.t > k.cue('del') ? '' : '11', false) });
        if (k.t > k.cue('del')) k.text('ĐÃ XOÁ', 540, 420, { size: 110, font: 'title', color: '#ff5a4a', fx: 'pop', p: k.at('del', 0.3), outline: '#fff', outlineWidth: 14 });
        vcap(k, 'BẤM 3 HAY BẤM XOÁ?', 'q', { color: '#f2c230' });
      },
    },
    fullVideoScene({
      say: '{full}Cậu ấy là ai, và tầng bốn có gì? Xem bản đầy đủ trên kênh Nếu Bạn Là nhé.',
      image: 'poster',
      title: 'Nếu Bạn Là Lễ Tân Khách Sạn… Tầng 4 (Phần 1)',
      channel: 'Nếu Bạn Là',
      tail: 1.2,
    }),
  ],
};
