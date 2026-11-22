---
name: kenh-ancient-humans
description: Hồ sơ & "vibe" kênh tiếng Anh cho khán giả nước ngoài về người cổ đại / tiền sử / tiến hoá (id tạm `ancient-humans`, tên kênh chưa chốt). Đọc TRƯỚC khi làm video, kịch bản, thumbnail, ý tưởng, tiêu đề cho kênh này — khi người dùng nhắc "kênh nước ngoài", "kênh tiếng Anh", "ancient humans", hoặc chủ đề trong Studio có `channel: "ancient-humans"`.
---

# Kênh tiếng Anh "Ancient Humans" — vibe kênh

Quy trình sản xuất chung: skill `lam-video`. File này quyết định *giọng, hình, nhịp* — khi hai bên khác nhau, file này thắng. Nguồn gốc: `ancient_humans_master_prompt.docx.md` (đã chỉnh để kênh có bản sắc riêng, không nhái kênh khác).

> **Trạng thái:** kênh đã tạo — tên **Long Story Drawn**, handle `@LongStoryDrawn-p3u`, id Studio `the-human-manual` (tên thư mục skill vẫn là `kenh-ancient-humans`). Tập 1: `videos/011-how-ancient-humans-slept`. Avatar: `channel/art-odd-little-species.js` (`npm run art -- odd-little-species`; linh vật không có chữ nên dùng chung được).

## Danh tính
| | |
|---|---|
| Ngách | Người cổ đại, tiền sử, tiến hoá, nhân học, sinh tồn — họ ngủ, ăn, săn, nuôi con, vệ sinh ra sao. Thỉnh thoảng: đời sống trung cổ, lịch sử kỳ lạ, tâm lý người |
| Góc khác biệt (cần kiểm chứng bằng `tim-ngach`) | Tiền sử châu Á & Đông Nam Á (Denisovan, *Homo floresiensis*, văn hoá Hòa Bình, Đông Sơn) xen với chủ đề phổ quát |
| Khán giả | Mỹ, Anh, Canada, Úc; 18–44; tò mò, xem trên TV lẫn điện thoại |
| Ngôn ngữ | **Tiếng Anh tự nhiên như người bản xứ** — viết thẳng bằng tiếng Anh, không dịch từ tiếng Việt. `meta.lang: 'en'` |

## Giọng kể: điềm tĩnh, thông minh, ngôi thứ hai
- Luôn "you", "your ancestors", "your body", "your brain" — không "we", "I".
- Nhịp câu: Short sentence. Short sentence. One longer sentence that builds depth. Short sentence. Question? — cứ 4–6 câu có một câu hỏi.
- Mạch: **Hook** (thả người xem vào một khoảnh khắc giác quan: "You wake up when your body is ready. No alarm.") → **Reframe** ("For 99% of human history, this wasn't a hypothetical.") → **số liệu hiện đại gây sốc** → **chồng bằng chứng** (một nghiên cứu có tên → xác nhận chéo văn hoá / xương / khảo cổ) → **dựng lại một cảnh cụ thể** ("So let's reconstruct a day…") → **twist ngược trực giác** ("agriculture was a trap") → **soi vào đời hôm nay** → **câu kết lặp lại câu đầu, nghĩa đã đổi**.
- **Bằng chứng**: ≥ 3 nhà nghiên cứu / nghiên cứu / di chỉ **có thật** mỗi tập (Richard Lee 1963, James Suzman, Polly Wiessner, Chauvet, Blombos…). Không bịa tên. Thuật ngữ nào cũng giải nghĩa ngay bằng tiếng Anh thường.
- Hài: **khô, nhẹ, kiểu Anh** — một câu nhận xét lạnh mỗi 1–2 phút, không tếu táo ồn ào, không giọng nhân vật lố. SFX tiết chế (pop, whoosh, ding, sparkle; boing/wahwah hiếm).
- Tôn trọng các dân tộc săn bắt hái lượm được nhắc tới (Ju/'hoansi, Hadza…): không mô tả họ là "nguyên thuỷ" hay "hoá thạch sống". Điều còn tranh cãi thì nói là còn tranh cãi.

## Câu nối tập sau (tiếng Anh)
- Mở đầu: "This is part of our series on how your ancestors actually lived — if you're new, the episode on prehistoric sleep is waiting at the end."
- **Nhịp mở đầu (từ tập 7, chuẩn giữ chân):** cảnh 1 (cold open, ≤ 30 giây) **trả ngay lời hứa của poster tập trước** dưới dạng một khoảnh khắc giác quan ngôi "you" (tập 7: dầu ô liu + strigil) — người từ tập trước được thưởng, người mới gặp hình lạ. Cảnh 2 **≤ 15 giây**: một câu series ("This is episode N of How Your Ancestors Actually Lived") + 3 ý của tập + một câu mời đăng ký ngắn. **Không** mở bằng "Last episode, we…" (người đến từ tìm kiếm/đề xuất chưa xem tập trước sẽ thoát). Callback tập trước đặt sau, khi đã giữ được người xem.
- Mỗi chương mở bằng một "móc" ("But here's the strange part…", "But were the Romans actually healthier?") — cứ ~60 giây một câu hỏi/twist mới.
- Tiêu đề chứa cụm người ta gõ, có thể dài hơn tiêu đề trên poster tập trước (poster "How Did Ancient Humans Stay Clean?" → tiêu đề "…Stay Clean Without Soap?"); cập nhật `title` chủ đề trong Studio cho khớp.
- Shorts: **chữ to hiện ngay khung đầu** (`p: 1`, không `fx: 'pop'` theo cue) — luồng Shorts hiển thị khung đầu trước khi người xem quyết định vuốt.
- Vòng mở: "But that fire did something stranger to your brain — and that's the next episode."
- Cuối: poster "NEXT EPISODE" + subscribe "so you don't miss what happened next". Cliffhanger phải cụ thể và đúng với tập sau.
- **Từ video tập 3 trở đi: không ghi lịch đăng trong video** (người dùng yêu cầu): `nextEpisodeScene({ …, when: 'COMING SOON' })`, lời đọc kết bằng "Coming soon." — không nói thứ/giờ ("Friday", "12 PM ET", "tomorrow"…). Lịch chỉ nằm trong Studio (`planAt`), đổi lịch không cần render lại. Tập 1–2 đã render với ngày cụ thể → giữ nguyên, không render lại.

## Hình & âm
- **Bộ vẽ dùng chung** (từ tập 2): `import { P, G, YOU, ANC, ANCW, ELDER, KID, SCI, HIST, ancient, savanna, night, campNight, paper, chap, big, note, card, redX, lying, zzz, glow } from '/channel/long-story-drawn.js'` — bảng màu, preset nhân vật, nền, thẻ nghiên cứu (tự co chữ). Mẫu: `videos/012-how-fire-made-you-human/video.js`.
- `meta.style: 'clean'`, màu phẳng, viền đậm, **không gradient, không đổ bóng giả**. Bảng màu: cam `#F58220`, trời `#7FB5D5`, trời nhạt `#ABD3E5`, cỏ `#4E9A45`, đất cát `#D2B488`, nâu `#8B5A2B`, xám đá `#8A8A8A`, đêm `#283A6E`, chàm `#322B5E`, chữ đỏ `#E0302B`, vàng `#F4C430`, kem `#F5F1E6`.
- Nền theo cảm xúc: kem/trắng = khái niệm & chữ; trời xanh + đất cát + cây = ngoài trời; **trời cam + đất cát + cây keo đơn độc = tiền sử/xa xưa**; xanh đêm + trăng vàng = đêm yên; chàm + sao = ngủ.
- Khung hay dùng: khung chữ khái niệm (chữ đỏ in hoa giữa nền kem: "300,000 YEARS"); chữ trên vật (tảng đá ghi "SURVIVAL"); bong bóng suy nghĩ; **dấu X đỏ** = "không phải thế"; lửa trại + bộ lạc; nhà khảo cổ (mũ cối nâu, ba lô, đèn); chuỗi tiến hoá trái → phải; mây mưa trên nhân vật buồn.
- **Linh vật riêng** (không dùng người que tóc cam của kênh khác): chốt ở tập thử. Đề xuất: `k.char` thân `man`, tóc `short` nâu đen, băng đô `band` xanh lá, áo `tunic` vàng mù tạt, mặt biểu cảm lớn. Người tiền sử: tóc `long` rối nâu, áo `bare`/`tunic` màu da thú; người già: tóc `bun` xám.
- Giọng: ElevenLabs giọng nam trầm điềm tĩnh tiếng Anh (model đa ngôn ngữ), hoặc Edge `en-US-AndrewMultilingualNeural` / `en-US-ChristopherNeural`. `meta.speed: 1.0` (≈150–160 từ/phút) — tốc độ 1.1 là của kênh Việt; chỉnh sau tập thử.
- Nhạc: calm, nhỏ; không nhạc kinh dị trừ tập sinh tồn/thú săn mồi.

## Đóng gói
- Độ dài: 8–12 phút (kịch bản 1.500–2.400 từ). Shorts: một sự thật gây sốc 30–50 giây.
- **Shorts kéo người xem về tập dài — BẮT BUỘC: mỗi video dài làm xong phải render kèm 1 Short** (người dùng yêu cầu), cùng lúc, cùng lên lịch: mỗi tập dài một Short `NNN-short-…`, câu đầu là câu hỏi, 3 cảnh + `fullVideoScene({ lang: 'en', image: 'poster', … })` (poster = `thumb-a.jpg` của tập dài chép vào `assets/poster.jpg`). Lên lịch bằng `next-slot.mjs --format short --after <planAt tập dài>` — Short chỉ lên sau khi tập dài đã công khai. Mẫu: `videos/016-short-honeyguide/video.js`.
- **2 Shorts mỗi ngày (từ 06/11, người dùng duyệt; trước đó 3/ngày làm lượt xem mỗi Short tụt từ ~350 xuống ~25):** khung 02:00 UTC và 21:00 UTC. Short của tập dài mới đăng **1–2 ngày sau** tập đó (khi tập dài đã công khai); khung còn lại = Short cắt từ các tập dài đã công khai (chi tiết lạ: xem Fact check đầu `video.js`). Mỗi lần làm tập mới: đếm khung Short trống tới hết ngày đăng tập đó, render bù đủ. Dùng `shortMeta` + `hook` trong `/channel/long-story-drawn.js` (chữ hook hiện ngay khung đầu; nền tối dùng `c1: '#fffaf0', o1: P.ink`). Mẫu: `videos/040-short-orangutan-doctor/video.js`. Khung kể bắt buộc: xem "Bài học từ dữ liệu" 06/11 (twist / "you" / "Why…?").
- Tiêu đề < 70 ký tự theo 6 góc đã chứng minh: "What/How Did Ancient Humans ___?", "How Did Ancient Humans Survive ___?", "The CRAZIEST ___ Used by Ancient Humans", "What ___ Was Like in Ancient/Medieval Times", "Why You Wouldn't Last a Day in ___" / "POV: …", "What If ___?". Không câu view sai nội dung.
- Mô tả: 2–3 câu hook cùng giọng mở đầu → 3–4 câu tóm tắt ngôi "you" → lời mời like/comment/subscribe → chương → dòng 15–25 hashtag. Tags: 25–40, trộn từ rộng (ancient humans, human evolution, prehistory, anthropology, hunter gatherers) + đuôi dài theo tập.
- Thumbnail (bản 03/11, người dùng yêu cầu "tò mò + truyền đạt ý chính cho người lướt"): dùng bộ `tRays/tText/tTag/tRing/tArrow/tBust` trong `channel/long-story-drawn.js`, mẫu `videos/058-…/thumbs.js`.
  1. **Một vật chính** mang ý bất ngờ nhất của tập, chiếm ≥ 40% khung (miếng bọt biển trên que, cái kim có lỗ, lều xương) — không phải linh vật đứng toàn thân.
  2. **Mặt cận cảnh** (`tBust`, đầu r 150–230) với cảm xúc *khớp nội dung*: `gross` (ghê), `smug`, `sad`, `happy`, `shock` — đừng tập nào cũng `shock`.
  3. **Vòng/mũi tên đỏ** chỉ vào chi tiết lạ → người xem muốn biết "đó là gì?".
  4. **Chữ ≤ 3 từ bổ sung cho tiêu đề, không lặp tiêu đề** ("SHARED SPONGE?", "THIS SAVED YOU", "30→70"); nhãn nhỏ `tTag` cho bối cảnh/số liệu ("ANCIENT ROME", "40,000 YEARS OLD"). Chữ phải đúng sự thật trong video.
  5. Nền phẳng tia nắng (không gradient), tương phản mạnh với vật chính; kiểm tra ở cỡ 320×180 (hàng dưới `thumbs-preview.jpg`). Chữ không chạm mép trái (x ≥ ~430 với cỡ 170+), không đặt vòng đỏ lên chữ đỏ.
  3 mẫu a/b/c khác *ý* (không chỉ khác màu) → "Test & compare" của YouTube.
- Giờ đăng (từ 31/10, người dùng yêu cầu): **1 video dài mỗi ngày lúc 17:00 UTC** = 12:00–13:00 ET (nghỉ trưa Mỹ) + 17:00 London / 18:00 Paris (tối châu Âu) = **00:00 VN**. **2 Shorts mỗi ngày (từ 06/11): 02:00 UTC** (21–22h ET, tối Mỹ = 09:00 VN) và **21:00 UTC** (tan làm ET + tối London = 04:00 VN); bỏ khung 13:00 (Shorts khung này chỉ 7–93 lượt). Ghim theo UTC. Studio: `schedule: { tz: '+00:00', long: { days: [0..6], time: '17:00' }, short: { days: [0..6], time: '21:00', times: ['02:00', '21:00'] } }`. Upload qua API của project chưa audit có thể bị khoá riêng tư → kiểm tra trong YouTube Studio. **Không tự tải lên / không tự đưa vào hàng chờ upload** (người dùng yêu cầu 03/11 sau nhiều lần vượt giới hạn ~10 video/ngày): render xong → để `rendered`, báo người dùng; người dùng tự bấm đăng trong Studio.
- **Lên lịch đăng ngay khi làm xong mỗi video (BẮT BUỘC — người dùng yêu cầu):** khung đẹp, không trùng, sớm nhất có thể.
  1. Khung đẹp = khung trong `schedule` của kênh (dài: mỗi ngày 2 khung 00:00 + 17:00 UTC = 07:00 + 00:00 VN; Shorts: mỗi ngày 21:00 UTC = 04:00 VN). Không đăng ngoài khung. Mỗi ngày phải đủ 2 tập — ngày nào thiếu thì lấp bằng tập sẵn có sớm nhất (được phép kéo lên nếu poster tập trước chưa đăng còn sửa được).
  2. Chạy `node scripts/next-slot.mjs the-human-manual --after <planAt tập trước trong series>` → khung trống sớm nhất (đã trừ mọi `planAt` cùng kênh + giờ hẹn/đăng thật trong `output/*/uploaded.json`, chừa ≥ 12 giờ để tải lên). Shorts thêm `--format short`.
  3. Tập 3 đã được poster tập 2 hứa "SATURDAY · 1 PM ET" (= 31/10 17:00 UTC) → giữ đúng khung đó. Từ tập 4, poster không ghi ngày nên lịch tự do: tập đã có `planAt` thì giữ, trừ khi kéo lên khung trống sớm hơn được (vẫn sau tập trước trong series).
  4. Tập chưa có lịch → `--set <slug>` ghi khung đầu tiên; giữ chỗ cho tập sau bằng `--set-next "<tiêu đề tập sau>"`. (Cột `poster` của script chỉ để tham khảo — từ tập 3 video không ghi lịch.)
  5. Thứ tự series không đảo: tập N+1 luôn sau tập N. Khung trống phía trước (vd không đủ tập) → đề xuất lấp bằng Shorts hoặc video độc lập, không kéo tập series lên.
  6. Báo người dùng: giờ VN + ET + London, và các bước tải lên YouTube Studio → Schedule (upload qua API của project chưa audit có thể bị khoá riêng tư — nhắc kiểm tra video không bị "Locked: private").
- **Đừng** quảng bá kênh này tới nhóm/bạn bè người Việt — lượt xem đầu tiên dạy thuật toán sai đối tượng.

## Việc kỹ thuật còn thiếu (làm trước tập đầu)
- [ ] `scripts/niche/scan.mjs`, `ideas.mjs`: thêm `--region US --lang en` (đang cố định `VN`/`vi`).
- [x] `engine/templates.js`: truyền `lang: 'en'` vào `subscribeScene` / `nextEpisodeScene` / `fullVideoScene` → "SUBSCRIBE", "NEXT EPISODE", "WATCH THE FULL VIDEO".
- [ ] Font chữ kiểu bút dạ cho tiếng Anh (Be Vietnam Pro vẫn dùng được cho phần thân).
- [x] Props đã có: `campfire(fire)`, `acacia`, `cave`, `grassbed(ash, leaves)`, `nest`, `chimp`, `bed`, `candle`, `thermo(level)`; mũ `hat: 'safari'` (nhà khảo cổ); mặt `face: 'sleep'`. Còn thiếu: voi ma mút, công cụ đá (rìu tay vẽ tạm trong `channel/art-odd-little-species.js`), hộp sọ.
- [x] Mẫu `description` / footer tiếng Anh + `categoryId: '27'`: xem `meta` tập 011. Mô tả tự ghi "Chapters" khi `meta.lang: 'en'`.
- [x] Kênh trong Studio (`the-human-manual`, có `schedule` giờ ET) + token YouTube.
- [ ] (Tuỳ chọn) chế độ cảnh dùng ảnh Google Flow: xuất file prompt theo cảnh cho `h2dev_flow`, tự nạp `Downloads/<thư mục>/NNN_*.png` vào `k.image`.

## Bài học từ dữ liệu (cập nhật bằng skill `phan-tich`; đọc trước khi viết kịch bản)
- 31/10 · chưa đủ dữ liệu: tập 1 công khai < 24 giờ (3 lượt xem), Short 3AM 12 lượt xem; Analytics chưa có. Quy tắc nhịp mở đầu/Shorts ở mục "Câu nối tập sau" là chuẩn ngành, chưa phải bài học từ số liệu kênh → chạy lại `node scripts/analytics.mjs the-human-manual` từ 02/11 và so % còn xem sau 30s của tập 1–6 (mở đầu cũ) với tập 7 (mở đầu mới).
- 02/11→06/11 · Shorts (số công khai, 3–6 ngày tuổi; Analytics mất kết nối): **thắng** = chuyện có twist (Ox "They Called It Skinny" 1.268) và khẳng định gây sốc về **"you"**/cơ thể/ăn uống (Same Calories as You 702, Why You Can't Live on Raw Food 451), câu hỏi "Why…?" (Grandmothers 213), con vật lạ (Honeyguide 165). **Thua** = câu trần thuật đố vui "This X did Y" / "The oldest X" / "Ancient Y had Z" — kể cả chủ đề y tế/vệ sinh: Ice Age Dentists 2, Hands-On Dads 18, Orangutan 18, Athletes' Sweat 29, Oldest Surgery 52, Oldest Bed 93. → **Khung kể quan trọng hơn chủ đề**: mọi Short phải là (a) chuyện 2 câu có twist ("He did X. Then Y."), (b) khẳng định về "you"/"your body", hoặc (c) câu hỏi "Why/Would you…?"; cấm tiêu đề dạng "This X…/The oldest…". 3AM: % xem TB 20%, rơi ở 0:04 vì câu mở kể lể → câu đầu = chính khẳng định gây sốc (≤ 2 giây). Shorts đăng 31/10–02/11 trung bình ~350 lượt, đăng 03–05/11 trung bình ~25 → nghi đăng 3 Short/ngày làm loãng hoặc khung kể yếu; kiểm "Viewed vs swiped away" trong Studio trước khi giữ nhịp 3/ngày.
- 12/11 · Analytics đầy đủ (29/10–09/11): 3.760 lượt, **97% từ Shorts**, 5 sub. Lượt/ngày: 01/11 đỉnh 2.218 (Ox + Same Calories) → 250–500 (02–04/11) → **~35/ngày từ 05/11**: Shorts mới không còn được thử (Shorts sau 03/11 đều < 35 lượt, kể cả khung "you" như Spit 20, Fiber 15) → không chỉ do khung kể. Shorts dài 45–53 s chỉ giữ ~36–50% ở 30 s, % xem TB 30–60% → quá dài. Điểm rơi Shorts lặp ở 0:05–0:07 đúng câu thứ hai chuyển sang giải thích/tên riêng ("Richard Lee in the…", "honeyguide and it lives in Africa…", "staring at the ceiling…"). → **Shorts ≤ 30 giây, câu 2 phải leo thang (không tên nhà nghiên cứu, không địa danh trong 10 giây đầu), bỏ/rút cảnh `fullVideoScene` (dùng Related video thay thế), kết vòng lặp về câu đầu.** Video dài: % xem TB khá (23–42%) nhưng 30 s chỉ 33–50%; rơi lặp ở 0:07–0:10 đúng câu reframe "For most / almost all of human history…" (tập 5, 6) → **bỏ câu reframe chung chung sau hook**, đi thẳng vào chi tiết cụ thể. Nguồn video dài: Video đề xuất + Trang chủ (Work Less: 43 lượt từ Trang chủ) — browse đang thử, cần thumbnail thật (vẫn chưa đặt được). Quốc gia: US 23%, PH 14%, **VN 11%**, ID, IN — VN cao bất thường → kiểm tra không ai trong nhóm xem/chia sẻ từ VN.
- 06/11 · video dài: 2–49 lượt/tập sau 2–7 ngày, lượt xem chủ yếu từ Short cùng chủ đề (Ox 1.268 → tập 4 có 49; Grandmothers 213 → tập 5 có 19; ~4–9%). Thumbnail tuỳ chỉnh vẫn chưa lên (khung tự chọn). Kênh 2 sub / 3.624 lượt xem (0,06%). → Mỗi tập dài cần 1 Short thắng (khung a/b/c ở trên) trỏ về nó, đăng 1–2 ngày SAU tập dài; ưu tiên xác minh SĐT + đặt thumbnail trước khi làm thêm tập dài.
- 03/11 · thumbnail chưa từng lên YouTube: API trả 403 "doesn't have permissions to upload and set custom video thumbnails" → kênh chưa xác minh SĐT (youtube.com/verify); các video dài đang dùng khung hình tự chọn. Sau khi xác minh: `node scripts/set-thumb.mjs <slug>…` (không tính vào giới hạn tải lên).
- 30–31/10 · giới hạn tải lên: kênh mới bị YouTube chặn sau ~10 video/ngày qua API ("exceeded the number of videos they may upload") → tải bù hôm sau; xác minh SĐT kênh để nâng hạn mức.
