---
name: lam-video
description: Sản xuất một video YouTube hoạt hình vẽ tay hoàn chỉnh (kịch bản, hình, giọng, render) từ một chủ đề, cho bất kỳ kênh nào trong Studio. Dùng khi người dùng nói "làm video về…", "viết kịch bản…", "làm tập … cho kênh …", hoặc chọn một chủ đề trong Studio để sản xuất. Luôn đọc skill vibe của kênh (`kenh-<id>`) trước.
---

# Làm video

## 0. Xác định kênh → đọc skill kênh (BẮT BUỘC)
Mỗi kênh có một skill riêng `.claude/skills/kenh-<id>/SKILL.md` giữ "vibe": ngôn ngữ, giọng kể, phong cách hình, giọng đọc, tốc độ, đóng gói, giờ đăng. Hiện có:
- `kenh-ve-la-hieu` — Vẽ Là Hiểu (tiếng Việt, truyền thuyết & sử Việt, tếu táo).
- `kenh-ancient-humans` — kênh tiếng Anh về người cổ đại (tên chưa chốt).
- `kenh-noi-co-sach` — Nói Có Sách (tiếng Việt, Shorts: câu nói xưa về gia đình, hai phe tranh luận).
- `kenh-neu-ban-la` — Nếu Bạn Là (tiếng Việt, truyện lừa đảo/đời ngầm ngôi "bạn", chibi bặm trợn, 2 tập × ~10 phút, một giọng).

Kênh lấy từ lời người dùng ("làm cho kênh nước ngoài…") hoặc trường `channel` của chủ đề trong `data/studio.json`. Không rõ kênh nào → hỏi. Đọc skill kênh trước khi viết dòng kịch bản đầu tiên; mọi chỗ skill kênh nói khác file này thì **theo skill kênh**. Kênh mới chưa có skill → tạo `kenh-<id>` theo cùng bố cục (Danh tính · Giọng kể · Câu nối tập sau · Hình & âm · Đóng gói) và hỏi người dùng các điểm chưa rõ trước khi làm video.

API vẽ đầy đủ và quy ước kỹ thuật: `CLAUDE.md`. Ví dụ hoàn chỉnh: `videos/001-bau-troi-mau-xanh/video.js` (dài), `videos/002-short-hoang-hon-do/video.js` (Shorts).

## 1. Chuẩn bị
- Tìm chủ đề trong `data/studio.json` (kênh, `notes` có góc kể + bằng chứng nhu cầu). Nếu chủ đề đã có `slug` → viết tiếp vào `videos/<slug>/video.js` (khung do Studio tạo). Nếu chưa → tạo `videos/NNN-slug/video.js` (NNN tiếp theo; Shorts: `NNN-short-...`) và cập nhật `slug`, `status: "script"` cho chủ đề.
- Đọc mục **"Bài học từ dữ liệu"** trong skill kênh và báo cáo hành vi mới nhất `channel/research/*-hanh-vi-<kênh>.md` (nếu có) — áp dụng vào hook, độ dài chương, câu hỏi cuối video.
- Đọc tiêu đề top video đối thủ trong `output/research/*/report.md` (nếu có) để chọn góc kể khác.
- **Kiểm tra sự thật**: mọi năm, số liệu, tên riêng, tên nhà nghiên cứu/nghiên cứu. Truyền thuyết/dã sử hay giả thuyết khoa học còn tranh cãi: nói rõ đâu là truyền thuyết/giả thuyết, đâu là bằng chứng.

## 2. Kịch bản (độ dài theo ngách)
- **Hook 15 giây** (không chào hỏi, không giới thiệu kênh):
  - 0–5 giây: một câu khiến người ta dừng lướt — câu hỏi lạ, con số vô lý, hoặc đặt câu chuyện vào một khoảnh khắc cụ thể ("Mình thức dậy ở…" — ngôi kể theo skill kênh).
  - 5–15 giây: **lời hứa** — người xem phải biết video sẽ trả lời câu hỏi gì, và có một chi tiết "chỉ xem hết mới biết". Hình đổi ít nhất 2 lần trong 15 giây này.
  - Hook phải khớp tiêu đề + thumbnail (cùng một câu hỏi), và nội dung phải trả lời được nó.
- Video dài: thẻ tiêu đề (`titleScene`) → 4–6 chương, mỗi chương mở bằng một câu hỏi nhỏ, có `chapter:` → twist/bonus → `bulletsScene` tóm tắt → `subscribeScene` với câu hỏi gợi tập sau.
- **Phần thân chia mục rõ ràng**: tên chương (`chapter:`) là một câu hỏi hoặc lời hứa ngắn người xem đọc trong mục lục là muốn bấm ("Con số 2.622 từ đâu ra?", không phải "Phần 2"). Mỗi chương: câu hỏi → kể/bằng chứng → câu chốt → **một câu móc sang chương sau** (đừng để chương nào kết thúc phẳng).
- **Giọng như đang nói chuyện với một người**: xưng "mình/bạn" (tiếng Anh: "you"), câu ngắn, khẩu ngữ; đọc to từng câu — câu nào ngoài đời không ai nói (văn sách giáo khoa, liệt kê dài, mệnh đề lồng nhau) thì viết lại. Hỏi người xem một câu mỗi 30–60 giây.
- Cứ 10–20 giây phải có hình mới. Mỗi cảnh một ý, 10–25 giây lời.
- **Shorts** (người dùng chốt 12/11/2026; skill kênh có thể đổi độ dài): 40–50 giây, ~6 cảnh, **đủ một vòng thông tin có ích**: hook → đẩy tò mò → bối cảnh → bằng chứng/cơ chế → lời giải + điều rút ra → câu vòng lại. Không thẻ tiêu đề, `meta.format: 'short', captions: true`, `lead 0.15 / tail 0.4 / pause 0.25`. Nội dung nằm trong y 150–1300 (phụ đề ở y≈1420).
  1. **Câu 1 + tiêu đề** là câu hỏi ("Vì sao…?", "Nếu… thì…?"), chuyện 2 câu có cú lật, hoặc khẳng định gây sốc về chính người xem ("bạn"). **Không** mở bằng câu trần thuật đố vui ("Trái tim này nặng 180 ký", "This X did Y", "The oldest X"). Khung đầu = thumbnail (chữ to `p: 1`).
  2. **Câu 2 đẩy tò mò lên cao hơn** (đảo ngược, con số vô lý). Điểm rơi Shorts lặp ở giây 5–7 đúng chỗ câu 2 chuyển sang giải thích.
  3. **10 giây đầu không nêu tên nhà nghiên cứu hay địa danh** ("nơi sâu nhất Trái Đất" thay "rãnh Mariana").
  4. **Câu cuối vòng lại câu 1**, bỏ lửng để nối liền khi video tự phát lại; cảnh cuối `tail: 0.2`.
  5. **Không có cảnh cuối "xem bản đầy đủ"** (`fullVideoScene` kéo tỷ lệ xem xuống). Khai báo `meta.related: '<slug tập dài>'` → Gói đăng trong Studio nhắc chọn **Video liên quan** trên YouTube Studio.
  Mẫu: `videos/094-short-con-ca-o-day-11-km/video.js`. Lịch: mỗi tập dài kèm ≥ 1 Short, đăng 1–2 ngày SAU tập dài; tối đa ~2 Short/ngày/kênh.
- `meta`: tiêu đề, mô tả, `links`, tags, hashtags — xem §2c.

## 2c. Tiêu đề, thumbnail, mô tả & SEO
- **Tiêu đề + thumbnail là một cặp**: viết 5–15 phương án tiêu đề (< 60 ký tự, hoặc theo skill kênh), mỗi phương án kèm ý tưởng thumbnail đi cùng — thumbnail **bổ sung** chứ không lặp chữ của tiêu đề (tiêu đề nêu câu hỏi, thumbnail cho cảm xúc/vật thể/con số gây tò mò). Chọn 1 tiêu đề + 3 mẫu thumbnail (`thumbs.js` a/b/c). Không câu view: mọi lời hứa trong tiêu đề/thumbnail phải được trả lời trong video.
- **Cụm từ tìm kiếm thật**: lấy từ `scripts/niche/ideas.mjs "<cụm lõi>"` (gợi ý YouTube), `notes` của chủ đề, và từ khoá tìm kiếm trong báo cáo `phan-tich` của kênh. Chọn 1 cụm chính + 3–5 cụm phụ.
- **`meta.description`** (chỉ phần đầu, build tự ghép phần sau):
  1. Hai dòng đầu (~150 ký tự, phần hiện trước "xem thêm"): móc người đang lướt bằng câu hỏi/chi tiết lạ của video, chứa cụm chính một cách tự nhiên.
  2. Tóm tắt 2–4 câu: video trả lời gì, nhắc tự nhiên vài cụm phụ.
- Build ghép theo thứ tự: `description` → **`meta.links`** → mục lục chương (tự động) → `footer` (nguồn tham khảo, lời mời đăng ký, tập sau) → hashtags.
- **`meta.links`**: `[['▶ Tập trước: Con Rồng Cháu Tiên', '006-con-rong-chau-tien'], ['🔔 Đăng ký', 'https://www.youtube.com/@velahieu?sub_confirmation=1']]` — giá trị là URL hoặc slug video (tự lấy link từ `output/<slug>/uploaded.json`; slug chưa đăng thì bị bỏ, build lại sau khi video đó lên). Link tập trước/tập liên quan trong series + link đăng ký kênh.
- Tránh nhồi từ khoá: mỗi cụm xuất hiện tối đa 1–2 lần trong mô tả, không dán danh sách từ khoá; các biến thể để trong `tags`.

## 2d. Concept truyền thông
Đọc skill `concept-truyen-thong`. Kịch bản trúng ≥ 3 concept (Shorts ≥ 2), thumbnail ≥ 2; có ít nhất một cảnh bật mí (#9) và câu hỏi chia phe cuối tập (#3) nếu skill kênh không cấm. Ghi `Concept: #…` vào `notes` của chủ đề.

## 2e. Bài học chung từ dữ liệu (nhiều kênh — cập nhật bằng skill `phan-tich` khi một bài học lặp ở ≥ 2 kênh)
- 13/11/2026 · **Shorts mang 94–97% lượt xem** ở cả Long Story Drawn (97%) và Hạt Bụi Xanh (94%); tập dài chỉ nhận ~4–9% lượt xem từ Short cùng chủ đề. → Short là cửa vào chính: mỗi tập dài kèm ≥ 1 Short theo khung thắng (§2) trỏ về nó qua Video liên quan; tiêu đề tập dài phải chứa cụm người ta gõ tìm (đừng trông vào lượt chuyển từ Short).
- 13/11/2026 · **Khung kể của Short quan trọng hơn chủ đề**: câu hỏi / cú lật / "bạn" thắng; câu trần thuật đố vui thua ở cả hai kênh (Hạt Bụi Xanh: 081 "Vì sao…?" 3.126 lượt vs 080 "Trái tim này nặng 180 ký" 32 lượt; Long Story Drawn: "This X…/The oldest…" 2–93 lượt).
- 13/11/2026 · **Đừng dồn lịch**: 3 Short/ngày ở Long Story Drawn trùng lúc lượt xem tụt từ ~350 xuống ~25/Short. Một ngày tối đa 1 tập dài + 1–2 Short mỗi kênh; Short không đăng sát giờ tập dài.
- 13/11/2026 · Câu hỏi chọn phe 2 lựa chọn cuối tập dài có người trả lời (Hạt Bụi Xanh 079) → giữ (§2d, concept #3).
- Tỷ lệ đăng ký mọi kênh còn < 0,3% lượt xem → theo dõi Short vòng lặp + Video liên quan (từ 12/11) có cải thiện so với cảnh "xem bản đầy đủ" cũ không.

## 2a. Câu nối tập sau — BẮT BUỘC (người dùng yêu cầu, để người xem muốn đăng ký)
Lấy tập kế tiếp từ `data/studio.json` (chủ đề cùng kênh ở trạng thái `idea`/`script`, ưu tiên cùng series) và ghi nó vào `notes` của tập đang làm. Trong kịch bản phải có đủ 4 điểm:
1. **Mở đầu (sau hook, ~30 giây)**: một câu đặt tập này vào series + nhắc khẽ đăng ký.
2. **Giữa video (~40–60%)**: một "vòng mở" — cài một chi tiết bỏ ngỏ sẽ được giải ở tập sau.
3. **Trước tóm tắt / kết luận**: nhắc lại vòng mở bằng một câu ngắn.
4. **Cuối video**: `nextEpisodeScene({ say: '…{next}…', title, hook, when, art })` với một cliffhanger *cụ thể* (câu hỏi + chi tiết lạ, không chung chung kiểu "tập sau sẽ hay"), rồi `subscribeScene` có lời kêu gọi đăng ký + bật chuông "để không lỡ tập sau".
Câu nối phải đúng sự thật về tập sau (đừng hứa điều tập sau không có), viết bằng ngôn ngữ và giọng của kênh — ví dụ mẫu nằm trong skill kênh.

## 2b. Giọng kể
Theo mục "Giọng kể" của skill kênh (Vẽ Là Hiểu: tếu táo châm biếm; kênh tiếng Anh: điềm tĩnh ngôi thứ hai, hài khô). Dữ kiện luôn chính xác 100% — câu đùa không được làm sai sự thật.

## 3. Hình
- **Vật có thật → dùng ảnh/clip thật, không vẽ lại** (người dùng 12/11/2026: "chiếc răng này là… nhưng lại vẽ lại khiến người xem khó chịu"). Khi lời kể nói về một vật/sinh vật/địa điểm **đang tồn tại và có ảnh** (hoá thạch, răng, xương bảo tàng, con vật còn sống, con tàu, hố va chạm, thành phố…) thì hình phải là ảnh/clip thật có giấy phép (`scripts/anh-that.mjs`). **Chỉ vẽ khi mô phỏng hoặc giải thích**: sinh vật đã tuyệt chủng đang sống, cảnh không ai chụp được, so sánh quy mô, sơ đồ cơ chế, dòng thời gian, bản đồ ý tưởng, biểu đồ. Vẽ chồng lên ảnh thật (vòng, mũi tên, nhãn) là giải thích → được. Không tìm được ảnh có giấy phép → vẽ nhưng gắn chip "HÌNH MINH HOẠ". Khi soát ảnh tĩnh (§4), rà từng cảnh: "thứ này có thật và có ảnh không?" → có thì thay bằng ảnh.
- `meta.style`, `meta.speed`, `meta.lang`, giọng đọc, bảng màu: **theo skill kênh** (cả hai kênh hiện dùng `style: 'clean'`). Dựng nhân vật bằng `k.char`, đồ vật bằng `k.prop`; mỗi nhân vật chính khai báo một preset (màu áo, mũ, tóc) ở đầu file và dùng lại suốt tập.
- Đặt `{cue}` trong `say` ngay trước từ cần hình xuất hiện; `k.at('cue', dur)` trong `draw`.
- Thiếu hình vẽ (rồng, chiến binh, đền…) → thêm icon mới vào `engine/icons.js` (hộp 100px quanh tâm), hoặc dùng ảnh vẽ tay của người dùng (`meta.images` + `k.image`).
- Cảnh ngoài trời dùng `k.backdrop('day'|'sunset'|'night'|'dawn', { ground: 880 })`; cảnh phân tích (bản đồ, dòng thời gian) để nền giấy cho rõ.
- Nhân vật có mặt: `face: 'calm'|'happy'|'angry'|'shock'|'sad'|'smug'|'blank'|'shout'|'laugh'` — đổi cảm xúc theo cue (`k.t > k.cue('x') ? 'shock' : 'calm'`), thêm `bob: 2–6` cho nhân vật đang nói/chạy.
- Thoại → `k.bubble(...)` với `text`; va chạm → `k.burst(x, y, r, 'BÙM!')` + `k.shake(cue)`; chạy → `k.motion`; lo lắng → `k.sweat`.
- Mỗi cảnh có `sfx: [[tên, cue|giây|[cue, lệch], âm lượng]]` (danh sách trong `scripts/sfx.mjs`). Chuyển cảnh tự có whoosh, bút chì tự có tiếng sột soạt.
- `thumbnail(k)`: theo skill **`thumbnail`** (đủ thông tin video + một câu hỏi tò mò, 2 dòng ≤ 9 chữ, chấm ≥ 8/10 ở cỡ điện thoại). Làm 3 mẫu trong `thumbs.js` → `node scripts/thumbs.mjs <slug>`.

## 4. Kiểm tra & render
0. Nghe thử hiệu ứng nếu cần: `node scripts/sfx.mjs` → `output/sfx-demo.wav`.
0b. **Soát giữ chân trên kịch bản** (trước khi build, và lặp lại khi `phan-tich` có số liệu): đọc lại toàn bộ lời, đánh dấu đoạn dễ khiến người xem rời đi, ghi lý do, viết lại ngay. Dấu hiệu:
   - 30 giây đầu chưa có lời hứa rõ, hoặc có chào hỏi/giới thiệu dài trước khi vào chuyện;
   - lời dài > 20 giây mà hình không đổi; một cảnh nhồi > 2 ý;
   - giải thích bối cảnh dài trước khi người xem kịp tò mò (nên đặt câu hỏi trước, giải thích sau);
   - câu nghe như kết thúc giữa video ("Vậy là…", "Tóm lại…" trước phần tóm tắt thật) → người xem tưởng hết;
   - lặp lại ý đã nói, liệt kê nhiều số liệu liền nhau, đoạn văn sách vở;
   - cuối chương không có câu móc; lời kêu gọi đăng ký giữa video dài hơn 1 câu;
   - dưới 3 concept truyền thông, hoặc thumbnail hứa concept (bí mật, tiền…) mà video không có.
   Ghi kết quả ngắn vào `notes` của chủ đề ("Soát giữ chân: sửa cảnh X vì…").
**Quy trình nhanh (người dùng chốt 15/11/2026, 1 tập dài + 2 Short ≈ 25 phút):** chỉ render MỘT lần, mọi lỗi phải bắt ở bước ảnh tĩnh.
   - **Viết đủ độ dài ngay lần đầu**: video dài ≥ 2.000 từ (~9,5–10 phút ở OmniVoice speed 1). Build in `Kịch bản: N từ · ước m:ss` trước khi đọc giọng và **dừng** nếu ước dưới 90% mức tối thiểu → viết thêm cảnh trước, đừng đọc giọng rồi mới thêm.
   - **`--stills` tự dò đứng hình** (1 khung/giây, so với khung đầu đoạn như ffmpeg freezedetect): dòng `⚠ Đứng hình …s — cảnh N (giây x của cảnh)` → sửa ngay (hình xuất hiện sớm hơn, Ken Burns mạnh hơn, máy quay đẩy, hạt trôi) rồi chạy lại `--stills` đến khi báo "không có đoạn đứng hình" (bước dò tắt hạt phim/sương của hậu kỳ vì video nén mất chúng — tập 115 từng lọt một đoạn 4,3 giây vì hạt phim; báo từ 3 giây để bù sai số lấy mẫu; khi máy đang render video khác, bước này chậm vì chế độ mát ưu tiên thấp). Ảnh tĩnh không trộn âm thanh (thêm `--audio` nếu cần).
   - Trong lúc render tập dài: viết Short, `kich-ban.md`, cập nhật Studio; Short render nối ngay sau.
1. `node scripts/build.mjs <slug> --stills` → ghép ảnh `output/<slug>/stills/*.jpg` bằng ffmpeg `tile` và **nhìn từng cảnh**: chữ tràn, hình chồng, bút chì sót, cảnh trống.
2. Sửa → lặp lại đến khi sạch.
3. `node scripts/build.mjs <slug>` → trích 4–6 khung giữa chuyển động (`ffmpeg -ss t -i video.mp4 -frames:v 1`) để kiểm tra chuyển động và chuyển cảnh.
4. Cập nhật chủ đề trong `data/studio.json`: `status: "rendered"`. Chủ đề phải có `planAt` (lịch đăng dự kiến) — nếu chưa có, gọi `POST /api/channels/<kênh>/plan` (Studio đang chạy) hoặc đặt tay theo quy tắc `channels[].schedule`. Câu "tập sau" và `when` của poster phải khớp thứ tự lịch.
5. Báo người dùng: thời lượng, đường dẫn video/thumbnail, **giờ đăng theo lịch**, và nhắc mở "Gói đăng" trong Studio. **Không tự đăng YouTube** — đó là thao tác công khai, phải hỏi trước.
