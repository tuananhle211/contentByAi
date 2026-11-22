---
name: kenh-ve-la-hieu
description: Hồ sơ & "vibe" kênh Vẽ Là Hiểu (id `ve-la-hieu`, tiếng Việt, truyền thuyết & sử Việt kể kiểu tếu táo). Đọc TRƯỚC khi làm video, kịch bản, thumbnail, ý tưởng hay tiêu đề cho kênh này — khi người dùng nhắc "Vẽ Là Hiểu", "kênh Việt", "kênh truyền thuyết", hoặc chủ đề trong Studio có `channel: "ve-la-hieu"`.
---

# Kênh Vẽ Là Hiểu — vibe kênh

Quy trình sản xuất chung: skill `lam-video`. File này quyết định *giọng, hình, nhịp* — khi hai bên khác nhau, file này thắng.

## Danh tính
| | |
|---|---|
| Id Studio | `ve-la-hieu` · handle `@velahieu` |
| Ngách | Truyền thuyết & sử Việt, kể theo kiểu **giải mã** ("Thánh Gióng có thật không?") + sinh vật dân gian |
| Khán giả | Người Việt 15–35, xem điện thoại, thích kiến thức "ăn liền" nhưng chính xác |
| Ngôn ngữ | Tiếng Việt (`meta.lang` bỏ trống = `vi`) |
| Series | "Truyền thuyết Hùng Vương" (003 Thánh Gióng, 004 Sơn Tinh Thủy Tinh, 006 Con Rồng Cháu Tiên, 019 Thuồng luồng, 023 18 đời vua Hùng (cài Thục Phán + nỏ thần), tiếp: Mỵ Châu → Rùa thần; thứ tự đầy đủ trong Studio), "Sinh vật dân gian" (005 Halloween) |
| Chiến lược & nghiên cứu | `channel/KENH.md`, `channel/research/2026-10-29-tim-ngach.md`, `channel/tang-view.md` |

## Giọng kể: tếu táo, châm biếm
- Người dẫn chuyện "lắm mồm": kể đúng sự kiện rồi chêm một câu bình luận khô ("Mười hai tháng nhé, chứ không phải chín.").
- So sánh với đời sống hôm nay: thứ Hai đi làm, đặt hàng online, tuyển dụng, hoá đơn tiền chợ, trò truyền tin.
- Nhân vật **nói bằng giọng riêng** (`meta.voices` + `say` dạng mảng): câu ngắn, khẩu ngữ, có cảm xúc.
- Nhịp đùa: dựng → khựng ("…") → chốt; ngay sau câu chốt là SFX (boing / scratch / wahwah).
- **Ranh giới**: chỉ châm biếm *sự vô lý của chi tiết* và *chính chúng ta thời nay*. Không giễu anh hùng, tín ngưỡng, sự hy sinh; tránh lịch sử hiện đại (sau 1945). Kết video luôn trân trọng ý nghĩa thật của câu chuyện.
- Phân biệt rõ truyền thuyết / sử liệu: "tương truyền…", "theo Đại Việt sử ký toàn thư…". Câu đùa không được làm sai dữ kiện.
- Tập ma/kinh dị (vd 005): bí ẩn, kịch tính, giọng bà kể chuyện; vẫn giữ một chút tếu ở chỗ "giải mã" khoa học/xã hội.

### Mạch kể liền và lời tự nhiên (03/11 — người dùng: "ngắt nghỉ nhiều quá, bị chán ý, câu thoại tự nhiên hơn, nhanh hơn chút")
- **Mỗi cảnh mở bằng một câu nối với cảnh trước** (câu hỏi bật ra từ ý vừa nói: "Thế đi ăn thì ăn gì?", "Mà gửi thì phải theo nội quy hẳn hoi.", "Sao lại giống nhau đến thế?", "Còn mấy đốm sáng đỏ thì sao?"). Đừng mở cảnh bằng tiêu đề khô kiểu "Bí ẩn số hai: …" rồi bắt đầu lại từ đầu; nói "Câu hỏi thứ hai: …" như đang trò chuyện.
- **Không dùng thẻ chương che kín màn hình**: chỉ một dải tiêu đề nhỏ trượt xuống ở mép trên khoảng 3 giây (`intro()` trong 055), hình vẫn chạy bên dưới.
- **Dấu "…" chỉ dùng ở câu chốt thật** (tối đa 1 lần/cảnh). Giọng Edge dừng khá lâu ở "…" và ở dấu hai chấm, nên các chỗ còn lại dùng dấu phẩy.
- **Viết như nói**: dùng từ đệm và khẩu ngữ ("đấy", "nhé", "thế là", "thì chịu", "chứ", "cơ", "y như", "kiểu gì cũng"), chủ ngữ ngắn, tránh văn viết ("theo các bản kể… thực đơn gồm" → "bà không kể thì mình đi tra"). Có một nhân vật đồng hành thật xuyên suốt (055: bà nội gắt "Hỏi linh tinh. Ngủ đi!", "Đừng hỏi. Kinh lắm.") để lời dẫn thành cuộc trò chuyện.
- Câu thoại nhân vật: ≤ 10 từ, có cảm xúc, nói như người thật ("Ơ, thân tôi đâu? Ai lấy thân tôi rồi?").
- Đọc lại kịch bản thành tiếng trước khi build: chỗ nào phải ngừng để "đổi đề tài" thì thêm câu nối, chỗ nào hai câu liền nhau cùng một ý thì cắt.

### Công thức hài (03/11 — người dùng: "video chưa hài lắm"; tập 042 có ~6 câu đùa/25 cảnh = quá ít)
Dữ liệu: các đoạn được **tua lại xem** đều là câu chốt kiểu đời thường hoá ("Đến muộn có mấy tiếng, mất luôn người yêu", "một chuyến du lịch sinh thái… từ mấy nghìn năm trước", "điểm lạ thứ nhất"); Shorts thắng có tiêu đề kiểu "Lang Liêu thắng MasterChef…", "đuổi cá sấu bằng… một bài văn"; bình luận hay nhất là người xem phán nhân vật ("thằng rể…", "master chef thời xưa solo…").
- **Mật độ**: mỗi cảnh ≥ 1 câu chốt + SFX ngay sau (trừ đoạn nỗi đau/hy sinh có thật). Khi duyệt kịch bản, đếm: cảnh nào không có câu chốt thì viết thêm hoặc gộp.
- **Bộ 6 kiểu chốt** (trộn đều, đừng lặp một kiểu):
  1. *Đời thường hoá*: gắn nhãn hiện đại cho chuyện cổ: "bãi gửi thân", "hội nghị thượng đỉnh đầu bay", "đội diệt chuột không lương", "nhập khẩu miễn thuế".
  2. *Hệ quả khô*: nói thẳng kết quả vô lý bằng giọng bình thản ("Con ma nổi tiếng nhất từng lên camera… là một vũng nước").
  3. *Soi logic*: hỏi câu ngây ngô mà ai cũng nghĩ ("thế ai ở nhà trông cái thân?", "cổ đâu có cửa sau").
  4. *Nhân vật cãi lại*: con vật/đồ vật/ma có giọng riêng, nói một câu ngắn khẩu ngữ ("Ơ… thân tôi đâu rồi?", "Ai trồng cái này?!").
  5. *Chính chúng ta hôm nay*: nếu chuyện xảy ra bây giờ thì "ba trăm video quay dọc, mười giả thuyết, một người khẳng định là flycam"; lời đồn trong "nhóm chat của xóm".
  6. *Tự giễu người dẫn*: "Thú thật, gặp cái mặt ấy lúc nửa đêm, mình cũng chạy."
- **Running gag**: chọn một câu ngớ ngẩn ở hook, gọi lại 2–3 lần, và ở cảnh kết biến nó thành ý nghĩa thật (055: "ai trông cái thân?" → "người bị đồn là ma lai ban ngày cũng có nhà, có con, có tên").
- **Gag bằng hình** (người xem điện thoại đọc chữ trên hình): bảng nội quy, thực đơn bị "ĐÃ KIỂM DUYỆT", vé gửi xe, biển tên hội nghị, khung chat nhóm, con dấu đỏ chốt câu. Mỗi gag hình đi với một câu chốt trong lời.
- **Đoạn tài liệu dài** (trích sách cổ, số liệu): sau mỗi trích dẫn chêm một câu phản ứng khô ngay — đừng để quá 2 câu dữ kiện liền mà không có phản ứng.
- **Nhịp tông**: "buồn cười → không buồn cười" phải báo trước bằng một câu ("đến đây thì hết buồn cười"); đoạn nghiêm túc không SFX vui, rồi thoát ra bằng một câu chuyện nhẹ có thật trước khi kết.

## Cấu trúc kịch bản (người dùng chọn, từ tập 023)
- **Ngôi thứ nhất**: người dẫn xưng "mình", tự bước vào câu chuyện và trải nghiệm thay người xem; chỉ gọi "bạn" khi hỏi/mời người xem (bình luận, đăng ký).
- **Hook = một khoảnh khắc cụ thể, kể ở ngôi thứ nhất**, thay cho việc nêu con số/sự kiện khô ngay câu đầu: "Mình thức dậy trong một ngôi nhà sàn. Ngoài kia là ruộng lúa, xa hơn là sông Hồng đỏ phù sa…" → rồi mới thả chi tiết vô lý/câu hỏi của tập ("…và ông vua của mình đã ngồi ngai được một trăm bốn mươi năm."). Vẫn đúng quy tắc 15 giây của `lam-video` §2.
- **"Dựng lại một ngày"**: mỗi tập dài có ít nhất một cảnh sống liền mạch ở ngôi thứ nhất, dựng từ sử liệu/khảo cổ ("Giờ mình thử sống một ngày ở Văn Lang: sáng ra đồng với lưỡi cày đồng, trưa giã gạo, chiều chèo thuyền…") thay cho liệt kê hiện vật. Mỗi chi tiết trong cảnh phải có căn cứ; chỗ suy đoán nói rõ "có lẽ", "nhiều khả năng".
- **Ít nhất 3 nguồn có tên thật mỗi tập** (bộ sử, sách cổ, di chỉ/hiện vật, nhà nghiên cứu): nhắc tên ngắn gọn trong lời ("theo Đại Việt sử ký toàn thư…", "trên mặt trống đồng Ngọc Lũ…"), chi tiết đầy đủ ghi ở `footer`. Không bịa tên.
- **Câu kết lặp lại câu mở, nhưng nghĩa đã đổi**: hook "146 năm một vua?" → kết "Không phải 146 năm một vua, mà là hơn hai nghìn năm người Việt nhớ về gốc của mình." Viết câu mở và câu kết cùng lúc khi lên dàn ý.

## Câu nối tập sau (ví dụ đúng giọng kênh)
- Câu đặt tập vào series ("Đây là tập 3 trong series Truyền thuyết Hùng Vương, nếu bạn mới đến, tập Thánh Gióng đang chờ bạn ở cuối video."): kênh này đặt **sau Bí ẩn 1 (~2:30)**, không đặt sau hook như `lam-video` §2a (dữ liệu 02/11: người xem rời đúng ở câu giới thiệu đầu video).
- Vòng mở giữa video: "Mà khoan, chiếc bánh chưng trong sính lễ ấy có một lai lịch còn ly kỳ hơn — tập sau mình sẽ kể."
- Cuối: `nextEpisodeScene` (poster "TẬP SAU") + `subscribeScene` "bấm đăng ký và bật chuông để không lỡ tập sau".
- **Không ghi ngày/giờ cụ thể** trong lời đọc và `when` của poster ("Chủ nhật này…") — người dùng hay đăng sớm/muộn hơn lịch, câu sẽ sai (vụ tập 010). Dùng "Tập N · series …" và "Hẹn bạn ở tập sau".

## Hình & âm
- `meta.style: 'clean'`, **`meta.speed: 1.2`** (03/11: người dùng muốn nhanh hơn; trước là 1.1), **`lead: 0.2, tail: 0.3, pause: 0.12`** trong `meta` để giữa các cảnh/giọng không bị khoảng lặng (Shorts: đã có sẵn trong `shortMeta`). Người: `k.char`; đồ vật/con vật: `k.prop`; cảnh: `k.backdrop` + `k.water`. Mẫu chuẩn: `videos/004-son-tinh-thuy-tinh/video.js`.
- Trang phục Việt cổ: áo `tunic` + `color2` hoa văn Đông Sơn, mũ `feather`/`kingfeather`, tóc `topknot`/`bun`. Mỗi nhân vật chính một preset ở đầu file.
- Mỗi cảnh có mặt cảm xúc, bong bóng thoại, burst/shake ở chỗ va chạm, SFX ở mọi câu chốt.
- Giọng: Edge `vi-VN-NamMinhNeural` (dẫn) / `vi-VN-HoaiMyNeural`; nhân vật chỉnh `pitch`/`rate` (xem `meta.voices` tập 004–005). ElevenLabs được phép.
- Nhạc: `assets/music/background.mp3` (calm) hoặc `spooky.mp3` cho tập ma.

## Đóng gói
- Độ dài: video dài ≥ 8 phút (8–12 là đẹp). Shorts 45–60 giây, 3 Shorts/tập dài, mỗi Short một khoảnh khắc khác nhau của tập.
- Tiêu đề: câu hỏi giải mã + từ khoá người Việt gõ ("Thánh Gióng có thật không? Giải mã…"), ≤ 60 ký tự.
- Thumbnail: 2–4 chữ to viền đậm (đỏ cam `#e4572e` + vàng kem), mặt nhân vật cảm xúc mạnh, kiểu tò mò ("VÌ GÁI HAY VÌ ĐÊ?"). **Mẫu người dùng khen (03/11, tập 055)**: một gag hình vô lý ngay giữa khung (đầu ma lai bay mà ruột còn nối với cái thân không đầu) + nhân vật "mình" chỉ tay, mặt sốc + 2 dòng chữ (dòng 1 đỏ cam = tên, dòng 2 kem = câu hỏi "CÓ THẬT?") hoặc một câu hỏi ngớ ngẩn từ hook ("AI TRÔNG CÁI THÂN?"). Phát huy kiểu này cho các tập sau: thumbnail = câu đùa chính của tập, vẽ thành hình.
- Lịch đăng (đã cài trong Studio, `channels[].schedule`, người dùng yêu cầu 31/10): **mỗi ngày 1 video dài + 3 Shorts cùng chủ đề, liên tục** — video dài **10:00**, 3 Shorts cắt từ chính tập đó **11:30 · 17:00 · 19:30** giờ VN (Short mạnh nhất lên 11:30). **Mỗi tập dài làm kèm đúng 3 Shorts** (khuôn "Vì sao…", xem Bài học). Thứ tự series không đảo (tập N+1 sau tập N); Shorts chỉ lên **sau** khi tập dài cùng ngày đã công khai. Trước dịp lễ (Giỗ Tổ, Rằm tháng Bảy, Tết…) chèn tập hợp dịp 7–14 ngày trước (`channel/tang-view.md`).
- Nghiên cứu: `tim-ngach` / `y-tuong-video` với thị trường VN (mặc định của script).

## Bài học từ dữ liệu (cập nhật bằng skill `phan-tich`; đọc trước khi viết kịch bản)
- 03/11 · **Hài = thứ được xem lại**: điểm tua lại ở các tập dài đều là câu chốt đời thường hoá (Sơn Tinh "mất luôn người yêu", Rồng Tiên "du lịch sinh thái"), không phải đoạn dữ kiện. Người dùng nhận xét video "chưa hài lắm" (042 chỉ ~6 câu đùa/25 cảnh). → Áp dụng mục "Công thức hài" ở trên từ tập 055 Ma lai: ≥ 1 câu chốt/cảnh, running gag từ hook, nhân vật cãi lại. So giữ chân 055 với 042 khi có số liệu (≥ 48 giờ).
- 03/11 · **3 Shorts/ngày vẫn ổn**: 3 Shorts Mỵ Châu (02/11) đạt 767–1.131 lượt trong < 24 giờ; Short thứ 5 của 01/11 (Mai An Tiêm) vẫn chỉ 15 lượt. → Tối đa 3–4 Shorts/ngày; ngày nào đã có Short cũ hẹn giờ thì báo người dùng.
- 03/11 · Bình luận nhiều nhất rơi vào Short có nhân vật "đáng trách" (nỏ thần: "thằng rể…", "thua tại con gái…"). → Câu hỏi bình luận nên mời người xem phán nhân vật/ chọn phe ("Lỗi tại ai?"), không chỉ hỏi kiến thức.
- 02/11 · **60 giây đầu tập dài**: cả 4 tập có số liệu đều mất 30–35% người xem trong 40 giây đầu, và điểm rơi nằm đúng ở câu giới thiệu series/kênh hoặc câu liệt kê nội dung ("Đây là tập Halloween thứ hai…" −14% ở 0:15; Thuồng luồng "Đây là tập bốn…" + "Hôm nay: …" 0:14–0:43 từ 102% → 64%; Sơn Tinh vào kể truyện ở 0:30 −20%). → Hook xong là **vào thẳng Bí ẩn 1**, không giới thiệu series, không liệt kê "hôm nay mình giải…". Câu series + đăng ký dời ra sau khi trả lời xong Bí ẩn 1 (~2:30), tối đa 15 giây. Áp dụng từ tập 042.
- 02/11 · **Cuối tập dài**: chương "Tóm tắt" mất 12–29% người xem/phút (cao nhất video). → Tóm tắt ≤ 15 giây hoặc bỏ, đưa poster TẬP SAU lên ngay sau câu kết.
- 02/11 · **Tập dài theo chủ đề Short viral**: Thuồng luồng (cùng chủ đề với Short Xăm mình 6.668 lượt) có 1.004 lượt xem, 40,6% xem trung bình, 4 sub/114 lượt. Đây là tập dài tốt nhất kênh. Các tập không có Short mạnh cùng chủ đề chỉ được 140–270 lượt. Đoạn "phiên toà nghi phạm" (4:42–8:03) giữ người xem gần như phẳng. → Giữ lịch 1 dài + 3 Shorts cùng chủ đề; khung "điều tra / phiên toà / bí ẩn đánh số" là xương sống của tập dài.
- 02/11 · Shorts: Xăm mình 93,6% xem trung bình, 143% ở giây đầu (người xem xem lại vòng lặp), 85% ở giây 30. Hồ Tây mở bằng ngôi thứ nhất ("Mình đang đứng bên Hồ Tây…") mất 1/3 người xem trong 12 giây đầu. → Shorts **không** mở bằng ngôi thứ nhất; câu đầu luôn là câu hỏi ở tiêu đề. Câu mời cuối Short rút còn ~3 giây ("Tập đầy đủ ở kênh nhé!"), vì đoạn "Vẽ Là Hiểu nhé" làm mất thêm 5–9% người xem. Khán giả: 78% ở tuổi 25–44, nam nhỉnh hơn nữ; tập dài xem nhiều trên TV.
- 02/11 · Tín hiệu sớm: Short Mai An Tiêm (đăng 19:30 01/11, là Short thứ 5 trong ngày) chỉ có 8 lượt sau 14 giờ. Có thể YouTube không đẩy khi một ngày có quá nhiều Shorts; theo dõi thêm trước khi tăng số Shorts/ngày.
- 31/10 · Shorts gấp 5–20 lần video dài (Xăm mình 2.899 lượt xem < 1 ngày, Ma da 2.170, Đồng bào 1.713, Hồ Tây 1.432 < 1 ngày; tập dài tốt nhất Thánh Gióng 620 sau 2 ngày). Shorts thắng đều theo một khuôn: **"Vì sao [người Việt / ông bà] [làm, gọi, cấm] [điều quen thuộc]?"** hoặc **nguồn gốc một nơi quen** (Hồ Tây). Shorts tóm tắt cốt truyện (Thánh Gióng lớn nhanh: 257) yếu hơn. Người dùng xác nhận Short Xăm mình (020) giữ chân tốt nhất → **khuôn mẫu Shorts**: câu đầu đọc đúng câu hỏi ở tiêu đề → phủ định một đáp án hiển nhiên ("Không phải để đẹp đâu.") → lật hình bất ngờ trong 5 giây ("Mà vì… con này.") → một câu thoại nhân vật có logic ngộ ("Loài dưới nước ưa đồng loại") → giải mã + câu chốt. → Shorts: tiêu đề "Vì sao…" gắn với thứ người xem đã biết hoặc đã thấy, không kể lại cốt truyện. Mỗi tập dài có ít nhất 1 Shorts đăng cùng tuần, trỏ về tập dài **đã công khai**.
- 31/10 · Giữ chân Thánh Gióng (82 lượt, tín hiệu sớm): 80% còn xem ở giây 30, nhưng **mất ~20% trong chương kể lại truyền thuyết** (1:00–2:30, ai cũng học ở trường). Từ lúc vào phần giải mã ("Dấu vết", "Sử sách", "Những điểm vô lý"), đường giữ chân **gần như phẳng** từ 2:30 đến 6:40; 25% xem đến hết; % xem trung bình 39,5%. → Không kể lại truyện quen quá ~30 giây liền. Mỗi nhịp truyện phải kèm ngay một "điểm lạ" hoặc bằng chứng. Nên dựng tập dài thành **chuỗi bí ẩn đánh số** ("Bí ẩn 1… 5"), câu chuyện chỉ là sợi chỉ nối các bí ẩn.
- 31/10 · Nguồn traffic tập dài: 79% từ **video đề xuất**, tìm kiếm chỉ 3%; **50% lượt xem trên TV** (cả nhà xem). Tiêu đề có "có thật không?" (Thánh Gióng 620, Ma có thật 185, Thuồng luồng 146 < 1 ngày) hơn hẳn tiêu đề chơi chữ (Sơn Tinh "vì cô gái hay vì con đê?": 85). → Tiêu đề tập dài giữ khuôn "X có thật không?" kèm tên truyện. Chữ trên hình to, đọc được từ xa.
- 30/10 · bình luận: người xem hưởng ứng góc "giải mã" bằng cách tự đưa giả thuyết (Thánh Gióng là một vị tướng trẻ có thật…). → Cuối mỗi tập, câu hỏi bình luận nên mời người xem đưa giả thuyết/ý kiến riêng, không chỉ "đoán xem"; trả lời bình luận sớm.
