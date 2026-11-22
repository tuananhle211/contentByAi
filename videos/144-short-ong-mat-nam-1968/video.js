// Nhân Gian Chưa Kể · Short 2 của tập 142 (Ông Kẹ): ảnh thờ 1968 không có mộ, giỗ không khóc, thuốc lào, cái tủ khoá; giấy báo tử 1996.
// Không lộ bệnh phong, không lộ Ông Kẹ là ông. Câu cuối vòng về câu đầu. Không cảnh cuối: meta.related.
import { AMBER, COLD, shade, vframe, vline } from '/channel/nhan-gian.js';
import { baiMo } from '/channel/nhan-gian-babi.js';
import { BA, nha, NHA, anhOng, goiLa, thuocLao, tu, chiaKhoa, giayBaoTu, sepia } from '/channel/nhan-gian-ke.js';

const after = (k, c, off = 0) => k.t > k.cue(c, off);
const dark = (k, c = '#140e0a') => { k.ctx.fillStyle = c; k.ctx.fillRect(0, 0, 1920, 1080); };
const anh = (k, years) => vframe(k, 960, () => { dark(k); anhOng(k, 960, 500, 3.2, { years }); shade(k, 0.35, [{ x: 960, y: 500, r: 700, warm: 1 }], { vig: 0 }); });
function thumb(k) { anh(k, '1925 – 1968'); vline(k, 'ÔNG TÔI MẤT NĂM 1968,', 280, 0, { size: 82 }); vline(k, 'SAO GIẤY BÁO TỬ GHI 1996?', 400, 0, { size: 74, color: AMBER }); }
const grain = (sc) => ({ ...sc, draw(k) { sc.draw(k); sepia(k, 0.7); } });

const video = {
  meta: {
    title: 'Ông tôi mất năm 1968. Năm 1996, có người mang đến giấy báo tử của ông… #shorts',
    description: 'Ảnh thờ ông nội tôi ghi rõ: 1925 – 1968. Làng tôi ai cũng có mộ, chỉ ông là không. Năm tôi mười tuổi, có người mang đến một tờ giấy báo tử, đúng tên ông, ghi năm 1996.\n\nBản đầy đủ: Ông Kẹ | Tiếng Gõ Thứ Tư Phát Ra Từ Trong Tủ Nhà Tôi, trên kênh Nhân Gian Chưa Kể. Truyện hư cấu.',
    links: [['▶ Bản đầy đủ: Ông Kẹ', '142-ong-ke-tieng-go-thu-tu']],
    tags: ['giấy báo tử', 'bí mật gia đình', 'ông kẹ', 'truyện ma', 'chuyện tâm linh', 'chuyện có thật', 'shorts', 'nhân gian chưa kể'],
    hashtags: ['shorts', 'truyenma', 'bimatgiadinh'],
    format: 'short', captions: true, gpu: true,
    style: 'clean', tts: 'omnivoice', omniVoice: 'default', speed: 1,
    lead: 0.15, tail: 0.35, pause: 0.25, transition: 'cut', camera: 0.03,
    scribble: false, sfxTransitions: false, sfxVolume: 0.4, paper: '#05060a', privacy: 'private',
    related: '142-ong-ke-tieng-go-thu-tu',
  },
  thumbnail: thumb,
  scenes: [
    {
      // 21/11 (số liệu Facebook): mở bằng tục quen thuộc + cú bẻ, không địa danh trong 10 giây đầu.
      say: '{a}Ở quê tôi, ai mất cũng có mộ, để con cháu có chỗ thắp hương. {c}Chỉ ông nội tôi là không. {b}Ảnh trên bàn thờ ghi rõ: mất năm 1968. Bà bảo ông đi đắp đường trên mạn ngược, ốm rồi mất trên ấy.',
      draw(k) { if (k.t < k.cue('b')) { vframe(k, 960, () => { baiMo(k, { time: 'day', moon: false }); shade(k, 0.25, [{ x: 960, y: 300, r: 1700 }], { vig: 0 }); }); vline(k, after(k, 'c') ? 'CHỈ ÔNG TÔI LÀ KHÔNG' : 'AI MẤT CŨNG CÓ MỘ', 300, 'a', { size: 74, color: after(k, 'c') ? COLD : AMBER }); return; } anh(k, '1925 – 1968'); vline(k, 'MẤT NĂM 1968', 300, 'b', { size: 110, color: AMBER }); },
    },
    {
      say: '{a}Giỗ ông, bà tôi chưa khóc lần nào. {b}Cúng xong, bà gói một phần xôi, cất riêng, đến mùng một mang đi chùa, cách làng mười tám cây số.',
      draw(k) { vframe(k, 960, () => { dark(k); goiLa(k, 960, 620, 3); shade(k, 0.35, [{ x: 960, y: 560, r: 640, warm: 1 }], { vig: 0 }); }); vline(k, after(k, 'b') ? 'MỘT PHẦN XÔI CẤT RIÊNG' : 'BÀ KHÔNG KHÓC', 300, 'a', { size: 84, color: AMBER }); },
    },
    {
      say: '{a}Bà không hút thuốc, mà phiên chợ nào cũng mua một gói thuốc lào. {b}Và bà khoá cái tủ gỗ suốt hai mươi tám năm, chìa đeo trên cổ.',
      sfx: [['heartbeat', 'b', 0.35]],
      draw(k) {
        if (k.t < k.cue('b')) { vframe(k, 960, () => { dark(k); thuocLao(k, 960, 640, 4); shade(k, 0.35, [{ x: 960, y: 560, r: 640, warm: 1 }], { vig: 0 }); }); vline(k, 'BÀ KHÔNG HÚT THUỐC', 300, 'a', { size: 96, color: AMBER }); return; }
        vframe(k, 960, () => { dark(k, '#1a120c'); tu(k, 960, 1060, 1.42, { items: false }); chiaKhoa(k, 1300, 500, 1.6); shade(k, 0.55, [{ x: 960, y: 600, r: 760, warm: 1, flicker: 1 }], { vig: 0 }); }); vline(k, 'KHOÁ SUỐT 28 NĂM', 300, 'b', { size: 100, color: COLD });
      },
    },
    {
      say: '{a}Năm tôi mười tuổi, có người mang đến một tờ giấy. Bà không biết chữ, bảo tôi đọc. {b}Giấy báo tử. Nguyễn Văn Khang. Từ trần hồi một giờ sáng, ngày mười bốn tháng Mười Một năm 1996. {c}Đúng cái đêm nhà tôi nghe ba tiếng gõ cửa.',
      draw(k) { vframe(k, 960, () => { giayBaoTu(k, after(k, 'b') ? 7 : 2, { hi: after(k, 'b') ? [2, 6] : [] }); shade(k, 0.35, [{ x: 960, y: 540, r: 760, warm: 1 }], { vig: 0 }); }, { s: 0.95, y0: 320 }); vline(k, after(k, 'c') ? 'ĐÊM GÕ CỬA' : after(k, 'b') ? 'NĂM 1996' : 'GIẤY BÁO TỬ', 230, 'a', { size: 110, color: after(k, 'b') ? COLD : AMBER }); },
      sfx: [['stinger', 'b', 0.45], ['knock', ['c', 1.6], 0.5], ['knock', ['c', 2.1], 0.5], ['knock', ['c', 2.6], 0.5]],
    },
    {
      say: '{a}Đúng tên ông tôi. {b}Người đã mất năm 1968.',
      tail: 0.6,
      draw(k) { anh(k, '1925 – 1968'); vline(k, after(k, 'b') ? 'NGƯỜI ĐÃ MẤT NĂM 1968' : 'ĐÚNG TÊN ÔNG TÔI', 300, 'a', { size: 88, color: after(k, 'b') ? AMBER : COLD }); },
    },
  ],
};
video.scenes = video.scenes.map(grain);
export default video;
