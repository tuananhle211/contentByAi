# Cẩm nang tăng view — kênh Vẽ Là Hiểu (truyền thuyết & sử Việt)

Thứ tự ưu tiên: **nội dung giữ chân người xem > thumbnail + tiêu đề > lịch đăng đều > giờ đăng**. Giờ đăng chỉ ảnh hưởng 24–48 giờ đầu; video lịch sử sống nhiều năm nhờ tìm kiếm và đề xuất.

## 1. Giờ đăng

| | Ngày thường | Cuối tuần |
|---|---|---|
| **Video dài** | **17:00–18:00** (trước giờ cao điểm tối 19–23h) | 9:00–10:00 hoặc 17:00 |
| **Shorts** | 11:00–12:00 (giờ nghỉ trưa) hoặc 19:00–20:00 | 10:00 hoặc 20:00 |

- Đăng **trước giờ cao điểm 1–2 tiếng** để YouTube kịp xử lý và thử video với nhóm người xem đầu tiên. Hẹn giờ sẵn: `npm run upload -- <slug> --publish-at 2026-11-06T17:00:00+07:00`.
- **Đều đặn quan trọng hơn giờ vàng**: chọn 1–2 khung cố định (ví dụ Thứ 5 và Chủ nhật, 17:00) và giữ nguyên.
- Sau khoảng 1–2 tháng có dữ liệu: YouTube Studio → **Analytics → Khán giả → "Thời điểm người xem của bạn sử dụng YouTube"**. Biểu đồ này **thay thế mọi lời khuyên chung**, kể cả bảng trên.

## 2. Lịch theo mùa — "trick" mạnh nhất của ngách này

Người Việt tìm truyền thuyết nhiều nhất vào đúng dịp lễ. Đăng **trước dịp 7–14 ngày** để YouTube kịp "học" video:

| Dịp (âm lịch) | Đăng gì |
|---|---|
| Hội Gióng đền Sóc (đầu tháng Giêng) · Hội Gióng Phù Đổng (tháng Tư) | Thánh Gióng + Shorts cắt từ tập 1 |
| **Giỗ Tổ Hùng Vương (10/3)** | Chuỗi Hùng Vương: Con Rồng Cháu Tiên, Sơn Tinh – Thủy Tinh, Bánh chưng bánh giầy |
| Mùa lũ miền Bắc (tháng 7–9 dương lịch) | Sơn Tinh – Thủy Tinh ("cuộc chiến với lũ sông Hồng") |
| Rằm tháng Bảy | Ma lai, ma da, thủy quái — nhu cầu chuyện ma tăng vọt |
| 23 tháng Chạp → Tết | Táo Quân, sự tích bánh chưng, truyền thuyết ngày Tết |
| Đầu năm học / mùa kiểm tra | Các truyện có trong sách Ngữ văn THCS (Thánh Gióng, Sơn Tinh – Thủy Tinh… — học sinh đang tìm "… lớp 6") |

Mỗi năm, các dịp này lặp lại → video cũ tự "sống lại". Trước mỗi dịp, **đăng lại một Shorts** dẫn về video dài.

## 3. Trước khi đăng (quyết định tỉ lệ bấm xem)

- **Tiêu đề** = cụm người ta gõ + móc tò mò, phần quan trọng nằm trong 50–60 ký tự đầu.
  Tốt: "Thánh Gióng có thật không? Sự thật về ngựa sắt". Tránh: "Tập 1 – Truyền thuyết Thánh Gióng".
- **Thumbnail**: mặt nhân vật có cảm xúc + tối đa 4 chữ + một chi tiết gây tò mò. Làm 3 mẫu (`node scripts/thumbs.mjs <slug>`) rồi dùng **Studio → Thử nghiệm và so sánh**.
- **Mô tả**: 2 dòng đầu chứa từ khoá chính; mục lục (chapters) đã tự sinh.
- **Phụ đề**: lệnh upload tự tải `captions.srt` → YouTube hiểu nội dung tốt hơn, người xem tắt tiếng vẫn theo được.
- **Danh sách phát theo series**: "Truyền thuyết thời Hùng Vương", "Sinh vật dân gian", "Sử Việt" → người xem cày liền nhiều tập.
- **Màn hình kết thúc** (20 giây cuối): trỏ tới tập tiếp theo + nút đăng ký. **Thẻ (card)** ở đúng giây nhắc tới tập khác (ví dụ lúc nhắc "Sơn Tinh — tập sau").

## 4. Trong video (quyết định việc YouTube có đẩy tiếp hay không)

Những điều này đã có trong bộ skill `lam-video`:
- **5 giây đầu là câu đùa hoặc câu hỏi**, không chào hỏi.
- **Mỗi 15–20 giây một "cú hích"**: hiệu ứng âm thanh, bong bóng thoại, câu đùa, đổi cảnh.
- **Vòng mở (open loop)**: hứa trước điều sắp tới ("điểm lạ thứ ba còn hay hơn…").
- Sau mỗi video: Studio → **Mức độ giữ chân khán giả** → tìm chỗ tụt mạnh nhất → ghi vào ghi chú của chủ đề trong Studio để tập sau tránh.

## 5. 48 giờ đầu sau khi đăng

1. **Ghim bình luận** đầu tiên là một câu hỏi ("Bạn đoán Sơn Tinh đánh nhau vì cô gái hay vì con đê?").
2. **Trả lời mọi bình luận** trong 1–2 giờ đầu: tăng tương tác và kéo người xem quay lại.
3. Đăng **1 Shorts** cắt từ video (dùng tính năng **Video liên quan** của Shorts để trỏ về video dài) + 1 bài **Cộng đồng** (ảnh thumbnail + câu hỏi).
4. Chia sẻ có chọn lọc: nhóm Facebook yêu lịch sử/văn hoá (đúng nội quy nhóm, kèm vài câu tóm tắt chứ không chỉ dán link), TikTok/Reels bản 60 giây.
5. Không đổi tiêu đề/thumbnail trong 24 giờ đầu; sau 2–3 ngày nếu CTR < 3% thì thử mẫu khác.

## 6. Shorts làm phễu

Mỗi tập dài → **3 Shorts** (30–50 giây), mỗi Shorts là một "cú twist" có sẵn trong tập. Ví dụ tập 1:
- "Ba tuổi chưa biết nói, câu đầu tiên đã… đặt hàng ngựa sắt"
- "Giặc Ân đi bộ 2.000 km để đánh Gióng?"
- "Truyền tin qua 5 người: Giặc đến! → Ngựa sắt phun lửa!"

## 7. Đừng làm (hại kênh lâu dài)

- **Mua view/sub, sub4sub, nhóm "tương tác chéo"**: vi phạm chính sách, và kéo nhầm người xem → YouTube đề xuất sai tệp.
- **Nhờ bạn bè, người thân xem rồi thoát nhanh**: làm tụt mức giữ chân và gây nhiễu dữ liệu.
- **Tiêu đề giật tít sai nội dung**: người xem bỏ đi sau vài giây → video bị hạ đề xuất; có thể vi phạm chính sách "nội dung gây hiểu lầm".
- **Đăng dồn rồi nghỉ dài**: kênh nhỏ cần nhịp đều để thuật toán và khán giả quen.
- **Châm biếm lố tay** vào anh hùng, tín ngưỡng, lịch sử hiện đại: ngách lịch sử Việt rất nhạy cảm. Chỉ đùa về chi tiết vô lý và về chính chúng ta thời nay.

## 8. Đọc số liệu (Studio của bạn → Tổng quan, hoặc YouTube Studio)

| Chỉ số | Kênh mới, mức tốt | Nếu thấp |
|---|---|---|
| CTR (tỉ lệ bấm) | 4–8% | Đổi thumbnail/tiêu đề |
| Thời lượng xem trung bình (video 10 phút) | ≥ 3:30 (35%+) | Hook mạnh hơn, cắt đoạn lan man |
| Người xem quay lại | tăng dần mỗi tháng | Làm series, playlist, hẹn tập sau |
| Shorts: "đã xem" vs "vuốt qua" | ≥ 70% đã xem | Câu đầu phải là câu hỏi/câu đùa |
