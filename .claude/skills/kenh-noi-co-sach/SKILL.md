---
name: kenh-noi-co-sach
description: Hồ sơ & "vibe" kênh Nói Có Sách (id `noi-co-sach`, tiếng Việt, Shorts tranh luận về câu nói xưa / triết lý gia đình). Đọc TRƯỚC khi làm video, kịch bản, thumbnail, ý tưởng hay tiêu đề cho kênh này — khi người dùng nhắc "Nói Có Sách", "kênh gia đình", "kênh triết lý", "các cụ nói", hoặc chủ đề trong Studio có `channel: "noi-co-sach"`.
---

# Kênh Nói Có Sách — vibe kênh

Quy trình sản xuất chung: skill `lam-video`. File này quyết định *giọng, hình, nhịp*; khi hai bên khác nhau, file này thắng.

## Danh tính
| | |
|---|---|
| Id Studio | `noi-co-sach` · handle chưa đăng ký (thử `@noicosach`) |
| Ngách | Câu nói xưa về gia đình (tục ngữ, Nho, Phật, sách phương Tây): **trích đúng nguồn → hai phe cãi → góc nhìn thứ ba → người xem bỏ phiếu** |
| Khán giả | Người Việt 18–55: phe "các cụ" (30–55) và phe Gen Z cùng vào bình luận |
| Định dạng chính | Shorts 50–60 giây; sau này thêm video dài ≥ 8 phút hằng tuần ghép 5–7 câu cùng chủ đề |
| Nghiên cứu | `channel/research/2026-11-03-tim-ngach-triet-ly-gia-dinh.md` (đối thủ, 15 tập đầu, kho câu nói) |
| Bộ dùng chung | `channel/noi-co-sach.js`: `ONG`, `CHAU`, `T`, `quote`, `vs`, `shortMeta`. Mẫu: `videos/062-short-tre-cay-cha-gia-cay-con/video.js` |

## Khuôn Short (5 cảnh)
1. **Hook**: câu hỏi gây tranh cãi (≤ 2 giây) → Ông Đồ đọc câu xưa → Cháu phản bác ngay một câu ngắn, láo vừa đủ ("Cháu có xin được đẻ ra đâu, ông!").
2. **Nguồn thật**: câu ở sách nào, ai nói, bối cảnh gốc (vì sao người xưa nói vậy). Trang sách `quote()` có dòng nguồn.
3. **Đối trọng**: một câu từ nguồn khác (sách phương Tây, kinh, khoa học) → hai nhân vật đấu khẩu, mỗi bên 1 lượt.
4. **Góc nhìn thứ ba**: không phân xử; chỉ ra hai câu nói về hai điều khác nhau, chốt bằng một cặp câu đối xứng ("Nuôi con ≠ cho vay / Quay lưng ≠ tự do").
5. **Bỏ phiếu**: "Bạn đứng phe nào? Một… Hai… Bình luận một hay hai nhé!" Câu cuối phải nối được về câu đầu để video lặp lại.

## Giọng kể
- Người dẫn trung tính, ấm, khẩu ngữ (xưng "bạn"). Ông Đồ: chậm, tự tin, hay "các cụ dạy cả rồi". Cháu Gen Z: nhanh, cãi bằng logic đời thường, không hỗn.
- Câu thoại nhân vật ≤ 10 từ. Mỗi cảnh có một câu chốt + SFX.
- **Công bằng tuyệt đối**: mỗi phe phải có lý thật, không biến phe nào thành trò cười. Không công kích giới tính, vùng miền, tôn giáo.
- **Nguồn chính xác 100%**: ghi sách + năm/chương; câu dân gian ghi "tục ngữ". Không chắc ai nói → không gán tên. Rất nhiều câu "Khổng Tử dạy" trên mạng là bịa, phải kiểm tra trước khi dùng. Ghi đối chiếu ở đầu `video.js` và nguồn trong `meta.footer`.

## Hình & âm
- `style: 'clean'`, `speed: 1.2`, `lead 0.2 / tail 0.3 / pause 0.12`, nền giấy `#f7f1e3` (có sẵn trong `shortMeta`).
- Màu phe: **đỏ `#c0392b` = lời xưa (phe 1)**, **xanh `#2e6da4` = phản biện (phe 2)**. Nền chia đôi đỏ/xanh + chữ VS (`vs()`) khi hai người cãi.
- Nhân vật cố định: Ông Đồ (`ONG`: áo the xanh đen, khăn vàng, râu tóc bạc) bên trái; Cháu (`CHAU`: cháu gái áo cam, tóc dài, `flip: true`) bên phải.
- Giọng: dẫn `vi-VN-NamMinhNeural`; `ong` NamMinh −16Hz −8%; `chau` HoaiMy +10Hz +8%.
- Edge TTS hay báo `NoAudioReceived`; câu đã đọc được vẫn vào cache, nên cứ chạy lại build vài lần.

## Đóng gói
- Tiêu đề: câu hỏi tranh cãi bằng lời thường, không nhồi tên câu tục ngữ ("Sinh con để dưỡng già: đúng hay ích kỷ?"), ≤ 60 ký tự + `#shorts`.
- Thumbnail dọc: 2–3 chữ to đỏ (vế gây tranh cãi + "?") + dòng nhỏ đen + hai nhân vật đối mặt có VS.
- Mô tả: câu xưa vs câu đối trọng + lời mời bỏ phiếu; nguồn ở `footer`.
- Lịch (tạm, chờ người dùng chốt): Shorts 12:00 và 20:00 hằng ngày; video dài Chủ nhật 10:00.

## Còn chờ người dùng chốt
- Handle YouTube, avatar/banner; kết nối kênh trong Studio.
- Lịch đăng thật và số Shorts/ngày.
- Có dùng ElevenLabs cho hai nhân vật không (giọng Edge khó phân biệt ông và cháu).

## Bài học từ dữ liệu
(chưa có — cập nhật bằng skill `phan-tich` sau khi đăng)
