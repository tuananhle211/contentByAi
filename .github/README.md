# contentByAi: thuật toán hình ảnh

Code vẽ hoạt hình 2D cho video YouTube, toàn bộ hình do code tự vẽ trên canvas (không dùng ảnh AI). Repo chỉ chứa phần hình ảnh của 2 kênh:

- **Nhân Gian Chưa Kể**: truyện tâm linh dân gian Việt, tông tối, nhân vật búp bê, phủ sepia. Đây là nét vẽ hiện tại (từ tập 121).
- **Hạt Bụi Xanh**: khoa học kiểu phim tài liệu (vũ trụ, sinh vật khổng lồ), có cảnh 3D.

Không có trong repo: kịch bản, giọng đọc, pipeline render/TTS, video đã xuất, dữ liệu Studio. `.gitignore` chặn mọi thứ, chỉ mở đúng các file dưới đây.

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `engine/kit.js` | Bộ API vẽ `k` truyền vào `draw(k)`: nét tay (rough.js), chữ, thời gian/cue, camera, nhóm biến đổi |
| `engine/characters.js`, `props.js`, `icons.js` | Nhân vật, đạo cụ, icon dùng chung |
| `engine/brush.js`, `post.js` | Nét rung kiểu vẽ tay, hậu kỳ khung hình |
| `engine/gl3d.js` | Lớp 3D (three.js) |
| `engine/templates.js` | Cảnh mẫu: thẻ tiêu đề, gạch đầu dòng, mời đăng ký, tập sau |
| `engine/player.js`, `player.html` | Trình phát cảnh trong trình duyệt (cần `timing.json` do pipeline sinh ra) |
| `engine/fonts/` | Be Vietnam Pro, Pangolin, Patrick Hand (giấy phép OFL) |
| `channel/nhan-gian.js` | Nhân Gian: bảng màu (`PAPER`, `AMBER`, `COLD`), ánh sáng `shade`, đèn dầu, chữ (`tag`, `quote`, `chapter`), cảnh cuối |
| `channel/nhan-gian-doll.js` | Nhân vật búp bê `doll()` (đứng/đi/ngồi/quỳ, tay, mặt, quần áo nông thôn Bắc Bộ), `dollBike`, `dollFish`, lớp `sepia` |
| `channel/nhan-gian-hd.js` | Nền chi tiết "HD" dùng chung: trời, núi xa nhiều lớp, tre, cau, mái rơm, vách đất, gạch, gỗ, cây đa, giếng, nhà; chỉnh màu + hạt phim |
| `channel/nhan-gian-{babi,cauco,gieng,ke,kinh,magiau,nuna}.js` | Bộ cảnh theo truyện: sân nhà, cổng, bãi tha ma, giếng, tủ gỗ, xóm kinh miền Tây, lồng đèn, hiên đình, chiếu… |
| `channel/art-neu-ban-la.js` | Ảnh đại diện và banner kênh Nhân Gian Chưa Kể |
| `channel/hat-bui-xanh.js` | Hạt Bụi Xanh: bảng màu `P`, nền vũ trụ/đại dương, Trái Đất, thước tỉ lệ, sinh vật và vật so sánh (cá voi, khủng long, xe buýt, Landmark 81…) |
| `channel/hat-bui-xanh-3d.js` | Cảnh 3D qua three.js: Trái Đất xoay (texture ngày/đêm/mây tự cung cấp), hố đen |
| `channel/art-hat-bui-xanh.js` | Ảnh đại diện và banner kênh Hạt Bụi Xanh |

## Dùng thế nào

Mỗi cảnh là một hàm `draw(k)` gọi lại mỗi khung hình (1920×1080, hoặc 1080×1920 cho Shorts). Ví dụ:

```js
import { shade, quote } from '/channel/nhan-gian.js';
import { doll, sepia } from '/channel/nhan-gian-doll.js';

export function draw(k) {
  k.ctx.fillStyle = '#1a120c'; k.ctx.fillRect(0, 0, k.W, k.H);
  doll(k, 960, 980, 520, { kind: 'old', hair: 'bun', view: 'front', arms: 'chest', face: 'calm' });
  shade(k, 0.6, [{ x: 960, y: 600, r: 700, warm: 1, flicker: 1 }], { vig: 0.5 });
  quote(k, 'Bà tôi bảo, Ông Kẹ gõ cửa đúng ba tiếng.', 'a', { size: 56 });
  sepia(k, 0.6);
}
```

- Thời gian: `k.t` (giây trong cảnh), `k.at(cue, dur)` → 0..1, `k.cue(name, offset)`.
- Nét tay: `k.line/rect/circle/poly/path…` nhận `{ p, stroke, width, fill, seed }`. `p` 0..1 là vẽ dần.
- Module import bằng đường dẫn tuyệt đối (`/engine/...`, `/channel/...`), nên phục vụ thư mục gốc repo bằng một web server tĩnh.

Cài thư viện: `npm install` (roughjs, three; playwright-core chỉ cần khi render hàng loạt).
