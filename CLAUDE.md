# Vẽ Là Hiểu — hướng dẫn cho Claude

Xưởng sản xuất video YouTube hoạt hình vẽ tay, tiếng Việt. Chiến lược kênh: `channel/KENH.md`. Hướng dẫn người dùng: `README.md`.
Người dùng nói tiếng Việt — trả lời bằng tiếng Việt.

## Bộ skill (`.claude/skills/`)

- `tim-ngach` — tìm ngách ít cạnh tranh, nhiều view (YouTube API + gợi ý tìm kiếm, `scripts/niche/`).
- `y-tuong-video` — danh sách tập đã kiểm chứng nhu cầu → đưa vào Studio.
- `lam-video` — sản xuất một video từ chủ đề (kịch bản → hình → render → kiểm tra).
- `thumbnail` — thiết kế/soát thumbnail mọi kênh: ảnh tự kể đủ "video về cái gì" + MỘT câu hỏi tò mò (2 dòng, ≤ 9 chữ), bảng chấm 10 điểm ở cỡ 320×180.
- `concept-truyen-thong` — 16 concept truyền thông (bí mật, con kiến kiện củ khoai, xa xỉ, tranh cãi…) để chấm ý tưởng, kịch bản, thumbnail mọi kênh; mỗi tập ≥ 3 concept, thumbnail ≥ 2.
- `phan-tich` — hành vi người xem (`scripts/analytics.mjs <kênh>`: giữ chân theo cảnh/câu thoại, nguồn traffic, từ khoá; Studio → video → tab "Người xem"), ghi bài học vào skill kênh.
- **Mỗi kênh một skill vibe** `kenh-<id>` (ngôn ngữ, giọng kể, hình, giọng đọc, tốc độ, đóng gói, giờ đăng): `kenh-ve-la-hieu` (tiếng Việt), `kenh-ancient-humans` (tiếng Anh, kênh Long Story Drawn, id `the-human-manual`), `kenh-noi-co-sach` (tiếng Việt, Shorts tranh luận câu nói xưa về gia đình), `kenh-neu-ban-la` (kênh **Nhân Gian Chưa Kể** @nhangianchuake, đổi hướng 13/11/2026: truyện tâm linh dân gian kể ngôi "tôi", nghiêm túc, 15–20 phút/truyện, 2D tông tối, giọng OmniVoice `default`; bộ cảnh `channel/nhan-gian.js`), `kenh-hat-bui-xanh` (tiếng Việt, khoa học kể nghiêm túc kiểu phim tài liệu, không hài: vũ trụ, sinh vật khổng lồ, "điều gì xảy ra nếu"; giọng OmniVoice `default`; xen ảnh thật NASA/ESA với hình vẽ). Làm bất cứ thứ gì cho một kênh → đọc skill kênh đó trước; skill kênh thắng mặc định chung. Kênh mới → tạo skill kênh mới.

Không tự upload / công khai video — đó là thao tác ra bên ngoài, hỏi người dùng trước. Kết quả nghiên cứu lưu ở `channel/research/`. Cẩm nang tăng view & giờ đăng: `channel/tang-view.md`.

## Phong cách mặc định cho video mới (từ tập 004; giọng/tốc độ/ngôn ngữ từng kênh: xem skill `kenh-<id>`)

`meta.style: 'clean'` (hoạt hình phẳng, nét sạch, font Be Vietnam Pro, không bút chì) và `meta.speed: 1.1` (đọc nhanh hơn 10% — người dùng yêu cầu; kênh Vẽ Là Hiểu từ 03/11 dùng 1.2 + khoảng lặng ngắn, xem skill kênh). Dùng `k.char` cho người, `k.prop` cho đồ vật/con vật, `k.backdrop` + `k.water` cho cảnh. Ví dụ đầy đủ: `videos/004-son-tinh-thuy-tinh/video.js`. Phong cách cũ (`style` bỏ trống = 'sketch', icon que) chỉ dùng khi người dùng muốn.

- `k.char(x, yChân, cao, o)` — `o.body: man|woman|kid|big`, `outfit: tunic|robe|dress|bare`, `color`, `color2` (thắt lưng + hoa văn Đông Sơn), `hair: short|long|bun|topknot|bald`, `hairColor`, `beard: true|'long'`, `hat: feather|kingfeather|crown|helmet|non|mountain|wave|flower|band`, `cape`, `face` (cảm xúc), `pose: stand|wave|point|cheer|think|hips|shrug|hold|shout|facepalm|present|fight` hoặc `{l:[vai,khuỷu], r:[…]}`, `prop: spear|trident|staff|rod|bamboo|scroll`, `walk`, `flip`, `lean`, `bob`, `p`, `alpha`, `shadow`, `noHead` (thân không đầu, chỉ còn cổ cụt).
- Diễn xuất (từ demo 063): `k.char` nhận thêm `talk` (= `k.talk('vai')`, miệng nhép theo độ to giọng thật + gật đầu + khoa tay), `tilt` (nghiêng đầu), `tears` 0..1 (đọng → chảy), `look`/`lookY` (liếc), `flush` (mặt đỏ giận), `gloom` (chết lặng), `vein`, `plain` (áo trơn hiện đại), `ol` (viền; cận mặt cỡ 2400 dùng 0.5). Mood mới: `cry`, `cold` (khinh khỉnh). `k.pose(a, b, p)` trộn tư thế mượt; `k.focusLines(x,y,{p,r})` đường tập trung manga; `k.rain(x,y,w,h)`; `k.steam(x,y,s)`. Bộ cảnh drama (phòng ăn, bàn cơm, máy quay `cam`, cận mặt, sổ đỏ): `channel/drama.js`.
- Chibi (từ 064): `body: chibi|chibiGirl|chibiBig` (đầu to thân nhỏ); phụ kiện `shades` (true|màu), `chain` (true|'big'), `scar`, `stubble`, `cig`, `brows` (true|'up'), `belly` 0..1, `epaulet`; `hair: buzz|spiky|mohawk|perm`; `hat: police` (+ `capSlip` 0..1) | `cap`. Bộ cảnh kênh Nếu Bạn Là: `channel/neu-ban-la.js`.
- Nét rung (thử, từ 10/11, học từ ClaudeAnimationBase): `meta.look: 'brush'` → nét rung 12 lần/giây như vẽ tay từng khung; thumbnail giữ nét sắc. Lớp màu nước (vân loang + hạ tông) tắt mặc định vì người dùng chê đục — `meta.brush.watercolor: true` mới bật. `meta.brush = { boil (px, mặc định 5), watercolor, saturate, pigment, wipe: [màu…], thumb }`. Chuyển cảnh `transition: 'brush'` = quệt cọ phủ kín rồi kéo đi qua đường nối cảnh. `k.take(cue, amt)` → truyền vào `k.char(..., { sq })`: nhún ra đòn → bật vươn → nảy tắt (dùng khi đổi cảm xúc). Code: `engine/brush.js`. Render chậm hơn (~1× thời gian thực).
- `k.prop(name, x, y, size, o)` — `elephant(tusks) rooster(spurs) horse(manes, mane, fire) banhchung xoi mountain(snow) cloud storm(rain, bolt) palace stilthouse tree bamboo boat dike(w) fish crab serpent sun scroll calendar(text, label) phone drum heart malai(guts, cute, talk) owl(fly) thornfence(n) softshell(talk) sword(blade, hilt, glow) thaprua`; `o.flip`, `o.rotate`, `o.bob`, `o.p` (nảy vào), `o.shadow`.
- `k.water(mứcY, { color, amp, alpha })` — mặt nước dâng toàn khung, sóng tự chạy.
- Thumbnail: `thumbs.js` có `export const style = 'clean'` + các hàm `a`, `b`, `c`.

## API vẽ (`k` trong `draw(k)`)

Khung: 1920×1080 (dài) hoặc 1080×1920 (`short`; phụ đề nằm ở y≈1420, để trống vùng đó). `k.W`, `k.H`, màu `k.C.{ink,red,blue,sky,yellow,green,purple,orange,pink,brown,gray,white}`.

Thời gian: `k.t` (giây trong cảnh), `k.d` (độ dài cảnh), `k.gt` (giây toàn video).
- `k.at(start, dur=0.8, ease='out')` → 0..1. `start` là số giây hoặc tên cue. ease: `out|in|inOut|linear|back`.
- `k.cue(name, offset)` → giây; dùng để lệch: `k.at(k.cue('red', 1.2), 0.6)`.
- `k.seq(p, i, n, overlap)` chia một tiến độ thành n phần nối tiếp.
- Cue có sẵn: `start`, `end` (đầu/cuối lời đọc).

Nét tay (rough.js) — mọi hàm nhận `o = { p, stroke, width, fill, fillStyle:'hachure'|'solid'|'zigzag'|'cross-hatch', gap, rough, alpha, seed }`; `p` 0..1 = vẽ dần, bút chì tự đi theo đầu nét:
`line(x1,y1,x2,y2)`, `rect(x,y,w,h)`, `circle(cx,cy,r)`, `ellipse(cx,cy,w,h)`, `poly([[x,y]…])`, `lines([[x,y]…])`, `curve([[x,y]…])`, `arc(cx,cy,r,a0,a1)`, `path(svgD)`, `arrow(x1,y1,x2,y2,{bend,head})`, `wave(x,y,w,{amp,len,phase})`.
- `stroke: 'none'` để chỉ tô nền. Vật thể chuyển động liên tục: truyền `seed` cố định để nét không nhảy.
- Gọi hàm vẽ **vô điều kiện** (đừng bọc trong `if`) để seed tự động giữ ổn định; dùng `p: 0` để ẩn.

Chữ: `k.text(str, x, y, { size, font:'title'|undefined, color, align:'center'|'left'|'right', maxWidth, fx:'write'|'fade'|'pop', p, outline, outlineWidth })` → trả `{w,h}`.
`k.highlight(x,y,w,h,{p,color})` (bút dạ quang), `k.underline(x,y,w,{p})`.

Icon (hộp ~100px, tâm tại x,y): `k.icon(name, x, y, size, { p, fill, stroke, rotate })` — `sun cloud earth eye person bulb star heart check cross question clock coin book mountain tree house phone molecule rocket brain child warrior horse(fire) bamboo footprint rice scroll temple soldier drum woman(hat) king fire`. Thêm icon mới vào `engine/icons.js`.

Nhân vật & truyện tranh: icon nhân vật (`person child warrior woman king soldier`) nhận `face` (calm|happy|angry|shock|sad|smug|blank|shout|laugh, `false` để tắt), `bob` (nhún), `shadow`. `k.face(x,y,r,mood)`; `k.bubble(x,y,w,h,tx,ty,{text,size,p,think})`; `k.burst(x,y,r,'BÙM!',{p,size,fill,stroke,color})` (tự nở theo chữ); `k.motion(x,y,dx,dy,{p,n,len})`; `k.sweat(x,y,s,{p})`; `k.shake(cue,dur,amp)` → `{x,y}` cho `k.group`; `k.shadow(x,y,w)`; `k.backdrop('day'|'sunset'|'night'|'dawn',{ground,alpha})`. Hình có `fill` dạng hachure tự lót lớp màu mờ (`tint: 0` để tắt). Máy quay tự đẩy nhẹ mỗi cảnh (`camera: 0` để tắt).

Ảnh/clip thật (kênh khoa học): `scripts/anh-that.mjs` (search/get, `--video` cho clip) → `k.photo(name, x,y,w,h,{zoom,pan,credit,radius,border,dim})`, `k.clip(name, x,y,w,h,{at,speed,loop,…})` (khung clip nạp theo yêu cầu, render chờ đủ khung); nguồn ghi `videos/<slug>/assets/credits.json`, build tự chèn "Nguồn hình ảnh" vào mô tả.
Khác: `k.group({x,y,s,r,a}, fn)` biến đổi cục bộ; `k.dot(x,y,r,color,alpha)`; `k.image(name,x,y,w,h,{p,fx:'wipe'|'fade'})` với `meta.images`; `k.rand(i)` ngẫu nhiên cố định; `k.lerp(a,b,p)`; `k.ctx` để vẽ canvas thuần (gradient…).

Cảnh mẫu (`/engine/templates.js`): `titleScene({say,title,subtitle,icons})`, `bulletsScene({say,title,items:[{text,cue,icon}]})`, `subscribeScene({say,question,channel})` — `say` phải chứa `{sub}` (và `{q}` nếu có `question`). `nextEpisodeScene({say,title,hook,when,art})` — poster "TẬP SAU", `say` chứa `{next}`; bắt buộc ở cuối mọi video dài (xem skill lam-video §2a). `fullVideoScene({say,image,title,channel})` — cảnh cuối Shorts mời xem tập dài (**cũ, không dùng cho Short mới từ 12/11/2026**: thay bằng `meta.related: '<slug tập dài>'` → Gói đăng nhắc chọn Video liên quan trên YouTube Studio; quy tắc Shorts ở skill lam-video §2). Video dài tối thiểu 8 phút (build tự chặn nếu ngắn hơn, `meta.minDuration` để đổi).

Âm thanh & giọng: `say` có thể là mảng đoạn `['dẫn chuyện…', { v: 'kid', text: '{cue}…', pause }]` với `meta.voices = { kid: { voice, rate, pitch, elevenVoice } }`. `sfx: [['pop'|'whoosh'|'boing'|'ding'|'bonk'|'boom'|'scratch'|'wahwah'|'slideUp'|'slideDown'|'sparkle'|'drumroll'|'tada'|'click'|'cash'|'gulp', 'cue'|giây|['cue', lệch], âm lượng]]`. `meta.sfxVolume`, `meta.scribbleVolume`, `meta.scribble: false`, `meta.sfxTransitions: false`.

Thuộc tính cảnh: `say`, `draw`, `chapter`, `transition: 'slide'|'fade'|'cut'`, `lead` (giây trước khi đọc), `tail` (giây sau khi đọc), `minDur`, `dur` (cảnh không lời).
`meta`: `lead, tail, pause` (khoảng lặng mặc định đầu/cuối cảnh và giữa các giọng, mặc định 0.55/0.7/0.3), `title, description, links, footer, tags, hashtags, voice, rate, pitch, tts, elevenVoice, elevenModel, music, musicVolume, format, captions, transition, images, categoryId, privacy, paper`. `thumbnail(k)` vẽ ảnh thu nhỏ (mọi `at()` = 1). `links: [[nhãn, url|slug]]` chèn sau mô tả (slug → link YouTube từ `uploaded.json`; chưa đăng thì bỏ). `node scripts/build.mjs <slug> --meta` chỉ làm lại mô tả/thumbnail, không render.

## Studio

`npm run studio` (studio/server.mjs, cổng 5180): quản lý kênh/chủ đề (`data/studio.json`, trạng thái idea→script→rendered→uploaded→published), xem video, chạy build/upload qua hàng chờ, thống kê YouTube (`scripts/youtube.mjs`, token theo kênh ở `.secrets/tokens/`). Khi viết xong kịch bản cho một chủ đề, cập nhật `status` của chủ đề đó thành `script` và `slug` trỏ tới thư mục video. Đăng/hẹn giờ/công khai: `POST /api/videos/<slug>/publish {mode: public|unlisted|private|schedule, publishAt}`, liên kết video đăng tay: `POST /api/videos/<slug>/link {video}` (ghi `output/<slug>/uploaded.json`); trạng thái chủ đề tự đồng bộ theo YouTube; video đăng tay có tiêu đề trùng tự được liên kết khi Studio tải số liệu kênh, rồi tự đặt `thumbnail.jpg` lên YouTube (một lần, ghi `thumbSet`/`thumbFail` trong `uploaded.json`). Upload qua Studio cũng tự đặt thumbnail cho cả video dài lẫn Shorts. Đổi thumbnail video đã đăng: `node scripts/set-thumb.mjs <slug> [--variant b]`.

Dọn ổ đĩa: tab Video → "🗑 Dọn bộ nhớ" → chọn nhiều (hoặc "Chọn video đã đăng") → "Xoá file render" = `POST /api/videos/cleanup {slugs}`: chỉ xoá file nặng trong `output/<slug>` (`.mp4 .m4a .mp3 .wav`, `.seg*`, `stills/`), giữ `videos/<slug>`, `uploaded.json`, mô tả, thumbnail, phụ đề; bỏ qua video đang trong hàng chờ.

Lịch đăng dự kiến: mỗi chủ đề có `planAt` (ISO); quy tắc theo kênh ở `channels[].schedule = { tz, long: { days, time }, short: { days, time } }` (days 0 = CN). `POST /api/channels/<id>/plan {reset}` xếp chủ đề chưa có lịch vào khung trống, theo thứ tự trong danh sách. Khung trống sớm nhất cho một video (không trùng lịch/giờ hẹn YouTube cùng kênh): `node scripts/next-slot.mjs <kênh> [--after ISO] [--set <slug>] [--set-next <tiêu đề>]`. Tab Tổng quan có thẻ "Lịch đăng dự kiến"; cửa sổ video có "Gói đăng" (tiêu đề/mô tả/thẻ/thumbnail/phụ đề + checklist + giờ hẹn) để người dùng tự tải lên YouTube Studio. Video upload qua API từ project chưa audit bị khoá riêng tư.

## Ghi chú kỹ thuật

- `video.js` chạy trong trình duyệt (import bằng đường dẫn tuyệt đối `/engine/...`).
- OmniVoice đọc sai số ("2022" → "hai nghìn lẻ hai hai") → `scripts/vi-so.mjs` đổi số thành chữ trước khi gửi (năm, 8.336, 2,5, 22%, 15/8/1977), mốc từng từ gom lại theo câu gốc nên phụ đề vẫn hiện chữ số. Số đọc sai thêm kiểu mới → sửa `vi-so.mjs`. Áp dụng cho video làm từ 14/11/2026; các video cũ chưa đăng (093–095, 106–108) có `meta.speakNumbers: false` để giữ đúng bản đã render (người dùng chọn).
- Edge TTS đôi khi đứt kết nối giữa chừng; `tts_edge.py` kiểm tra số từ và thử lại; cache ở `.cache/tts/`.
- Sửa `data/studio.json` từ script/`node -e`: ghi ra file tạm rồi `rename` (như `save()` trong `studio/server.mjs`), đừng `writeFileSync` thẳng — Studio có thể đọc đúng lúc file đang ghi dở.
- Render song song nhiều tab Chromium (`--workers`), ~5–6× thời gian thực. `.env` có `RENDER_COOL=1` (người dùng muốn Mac bớt nóng, 11/11/2026): build chạy ưu tiên nền (`taskpolicy -b`, nhân tiết kiệm điện), 2 tab, nén `h264_videotoolbox -q:v 65` → chậm ~2,7× nhưng mát; `--no-cool` để render nhanh như cũ.
