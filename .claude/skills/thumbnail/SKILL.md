---
name: thumbnail
description: Thiết kế và soát thumbnail YouTube cho mọi kênh trong xưởng (video dài và Shorts) — thumbnail phải tự kể đủ "video nói về cái gì" và đặt MỘT câu hỏi khiến người lướt phải bấm. Dùng khi làm `thumbs.js` cho một video, khi người dùng nói "thumbnail", "ảnh bìa", "ảnh thu nhỏ", "CTR thấp", "làm lại thumbnail", hoặc trước khi đặt/đổi thumbnail cho video đã đăng. Đọc skill kênh `kenh-<id>` trước để lấy màu, phong cách, nhân vật.
---

# Thumbnail: đủ thông tin + một câu hỏi tò mò

Người dùng yêu cầu (11/11/2026): **thumbnail phải truyền tải đủ thông tin của video ngay trên ảnh, và có câu hỏi làm tò mò.** Quy tắc này áp dụng cho mọi kênh. Skill kênh quyết định *phong cách* (màu, nhân vật, nét vẽ); skill này quyết định *nội dung và bố cục*. Chỗ nào skill kênh cũ giới hạn "tối đa 3–4 chữ", theo giới hạn chữ của skill này.

## 0. Góp ý mới nhất của người dùng (ưu tiên cao nhất)

- **11/11/2026, tập 082:** "truyền tải ý chính bằng **1 câu** thôi, gây tò mò, **nhiều chữ quá**". → Mỗi thumbnail chỉ có **MỘT câu** (chia tối đa 2 dòng), câu đó vừa nói ý chính vừa là câu hỏi. **Không** hộp dữ kiện, **không** chip/nhãn phụ, không dòng chữ thứ hai. Ví dụ đạt: "HỐ ĐEN ĐI NGANG, / TRÁI ĐẤT RA SAO?", "100 TRIỆU CÁI / ĐANG TRÔI QUANH TA?", "KHÔNG BỊ NUỐT, / MÀ CÒN TỆ HƠN?" (`videos/082-…/thumbs.js`).
- Trước đó người dùng tự làm thumbnail tập 079 kiểu nhiều chữ (thước đo + hộp 3 dữ kiện). Mình làm theo kiểu đó cho 082 thì bị chê nhiều chữ → **không dùng hộp dữ kiện nữa** trừ khi người dùng yêu cầu.

## 1. Công thức

Một thumbnail tốt trả lời được hai câu trong **3 giây, ở cỡ 320×180** (cỡ trên điện thoại):

1. **Video nói về cái gì?** Người lướt nhận ra ngay *chủ thể* và *bối cảnh*, kể cả khi che tiêu đề đi.
2. **Tôi muốn biết điều gì?** Có một câu hỏi mà câu trả lời nằm trong video, không nằm trên ảnh.

```
CHỦ THỂ (hình, chiếm ≥ 40% khung)
  + 1 CHI TIẾT LẠ hoặc CON SỐ (vòng đỏ / thước đo / so sánh quy mô)
  + MỘT CÂU HỎI (chữ, ≤ 2 dòng, kết bằng "?") — không thêm chữ nào khác
```

## 2. Câu hỏi trên ảnh

- **Luôn có đúng một câu hỏi**, kết bằng dấu "?". Không có câu hỏi thì không đạt.
- **Câu hỏi phải chứa chủ thể** (hoặc chủ thể hiện rõ bằng hình ngay cạnh), để câu hỏi tự đứng được: "MEGALODON CÒN SỐNG?" thay vì "NÓ CÒN SỐNG?".
- **Không lặp nguyên văn tiêu đề.** Tiêu đề và thumbnail hỏi cùng một vấn đề nhưng khác chữ, mỗi bên cho thêm một mẩu thông tin:
  - Tiêu đề: `Điều Gì Xảy Ra Nếu Một Hố Đen Đi Ngang Hệ Mặt Trời?`
  - Thumbnail: `HỐ ĐEN TỚI GẦN / TRÁI ĐẤT CÒN KHÔNG?` (hình: hố đen + Trái Đất bị kéo dẹt)
- **Câu trả lời phải nằm trong video**, và không lộ trên ảnh. Không hỏi điều video không trả lời (câu view).
- **Mẫu câu hỏi đã dùng tốt:**

| Mẫu | Ví dụ | Hợp kênh |
|---|---|---|
| Có thật / còn …? | MEGALODON CÒN SỐNG? | khoa học, bí ẩn |
| Vì sao …? | VÌ SAO KHÔNG GÌ LỚN HƠN? | khoa học, sử |
| … bao nhiêu / lớn cỡ nào? | TIM NÀY NẶNG BAO NHIÊU? | quy mô, kỷ lục |
| Nếu … thì sao? | NẾU MẶT TRỜI TẮT? | "điều gì xảy ra nếu" |
| A hay B? | VÌ GÁI HAY VÌ ĐÊ? | tranh luận, truyền thuyết |
| … là ai / là gì? | AI ĐỨNG SAU LÒ LỪA? | truyện, lừa đảo |
| … có …? (nghi vấn chen số) | 30 MÉT MÀ VẪN ĐÓI? | khoa học, tếu táo |

## 3. Thông tin trên ảnh (để không cần đọc tiêu đề)

- **Chủ thể nhận ra được ở cỡ nhỏ:** hình khối rõ, tương phản mạnh với nền, chiếm ≥ 40% khung. Kênh vẽ: hình phẳng viền đậm. Ảnh thật: cắt sát, tăng tương phản, phủ tối nền nếu cần.
- **Thêm đúng một chi tiết làm rõ "chuyện gì"**, chọn một:
  - so sánh quy mô (vật khổng lồ cạnh vật quen rất nhỏ: người, xe buýt, Trái Đất);
  - con số trong nhãn nhỏ ("30 MÉT", "180 KG", "1966");
  - vòng/mũi tên đỏ chỉ vào thứ bất thường;
  - mặt nhân vật với cảm xúc *khớp nội dung* (kênh có nhân vật).
- Không đặt quá **2 ý hình** (chủ thể + một chi tiết). Ba vật trở lên ở cỡ nhỏ thành rối.

## 4. Chữ và bố cục

- **MỘT câu, tối đa 2 dòng, tổng 4–9 chữ.** Dòng 1 (màu trắng ngà) mở ý, dòng 2 (màu nhấn của kênh) kết bằng phần hỏi "?". Không thêm chữ nào khác trên ảnh.
- **Cỡ chữ:** dòng chính ≥ 110 px trên khung 1920×1080 (đọc được ở 320×180); viền tối dày 16–22 px; font tiêu đề của kênh.
- **Vùng cấm:**
  - góc dưới phải ~ 300×120 px (YouTube đè thời lượng video);
  - mép khung ≥ 40 px;
  - không đặt chữ đè lên mặt hoặc lên chi tiết chính.
- **Bố cục chuẩn:** chủ thể một bên (≈ 55–60% khung), chữ bên kia. Hoặc chủ thể giữa, chữ trên/dưới. Mắt đi: chủ thể → chi tiết lạ → câu hỏi.
- **Màu:** nền tương phản với chủ thể, 1 màu nhấn duy nhất cho phần hỏi; không dùng nền trắng trơn, không chuyển màu loè loẹt.
- **Shorts có HAI thumbnail (kiểm chứng 16/11/2026):** ảnh ngang `hqdefault` (tìm kiếm, trang chủ) nhận thumbnail đặt qua API/Studio; còn **ảnh dọc `oar2` ở tab Shorts và luồng Shorts là khung YouTube tự cắt từ giữa video** (dính phụ đề, chữ dở). API không đặt được ảnh dọc → sau khi đăng, người dùng phải mở **app YouTube điện thoại → Chỉnh sửa Short → Hình thu nhỏ → chọn khung đầu tiên** (hoặc tải `thumbnail.jpg` dọc). Kiểm tra: `https://i.ytimg.com/vi/<id>/oar2.jpg` (không chỉ `hqdefault.jpg`). Gói đăng trong Studio đã có bước này.
- **Shorts (1080×1920):** thumbnail chọn trong app thường là một khung trong video. Vì vậy khung đầu của Short phải tự là thumbnail: câu hỏi chữ to hiện ngay (`p: 1`), nằm trong y 150–1300.

## 5. Quy trình

1. **Đọc** skill kênh (`kenh-<id>`) + kịch bản/`video.js`: câu hỏi lớn của video là gì, chi tiết đắt nhất là gì, video trả lời ở đâu.
2. **Viết 3 phương án khác ý** (không chỉ khác màu), mỗi phương án một dòng: `hình chính | chi tiết | câu hỏi 2 dòng | concept`. Ghép với tiêu đề để chắc hai bên bổ sung cho nhau. Mỗi thumbnail trúng ≥ 2 concept (skill `concept-truyen-thong`).
3. **Vẽ** `videos/<slug>/thumbs.js` với `a`, `b`, `c` (`export const style = 'clean'`). Dùng bộ vẽ của kênh. Ảnh thật dùng `k.photo` (đã nạp từ `credits.json`, `credit: false` trên thumbnail). `video.js` phải có `import * as thumbs from '/videos/<slug>/thumbs.js'` + `thumbnail: thumbs.a`.
4. **Render:** `node scripts/thumbs.mjs <slug>` → `output/<slug>/thumb-{a,b,c}.jpg` + `thumbs-preview.jpg` (hàng trên cỡ lớn, hàng dưới cỡ điện thoại).
5. **Soát** bằng cách xem `thumbs-preview.jpg` (hàng dưới) theo bảng chấm ở mục 6. Mẫu nào dưới 8/10 → sửa và render lại.
6. **Chọn `a`** là mẫu điểm cao nhất (đặt làm `thumbnail`); `b`, `c` để "Thử nghiệm và so sánh" trên YouTube Studio.
7. **Video đã đăng muốn đổi:** sửa `thumbs.js` → `node scripts/build.mjs <slug> --meta` (làm lại `thumbnail.jpg`) → `node scripts/set-thumb.mjs <slug> [--variant b]`. Không đổi trong 24 giờ đầu sau khi đăng.

## 6. Bảng chấm (mỗi mục 0/1, đạt khi ≥ 8/10)

| # | Câu hỏi soát (nhìn ở cỡ 320×180) |
|---|---|
| 1 | Che tiêu đề, vẫn nói được video nói về **ai/cái gì** |
| 2 | Có **đúng một câu hỏi**, kết bằng "?", có chủ thể trong câu hoặc ngay cạnh |
| 3 | Câu hỏi **không lặp nguyên văn tiêu đề**, và tiêu đề + ảnh cộng lại cho nhiều thông tin hơn mỗi bên |
| 4 | Video **trả lời** được câu hỏi; ảnh **không lộ** câu trả lời |
| 5 | Chủ thể chiếm ≥ 40% khung, nhận ra trong 1 giây |
| 6 | Có đúng **một chi tiết lạ/con số** làm rõ "chuyện gì" |
| 7 | Chỉ MỘT câu (≤ 2 dòng, ≤ 9 chữ), không chữ phụ, đọc được ở cỡ nhỏ, không chạm vùng cấm |
| 8 | Tương phản tốt; một màu nhấn; không rối (≤ 2 ý hình) |
| 9 | Đúng phong cách kênh (màu, nét, nhân vật theo `kenh-<id>`) |
| 10 | Mọi chữ/số/nhãn trên ảnh **đúng sự thật** trong video; ≥ 2 concept |

## 7. Không được làm

- Hứa điều video không có, phóng đại số liệu, mặt la hét không liên quan nội dung.
- Ảnh thật không có giấy phép (xem `scripts/anh-that.mjs`); ảnh AI trông như thật mà không ghi nhãn (bật "nội dung tổng hợp" khi đăng).
- Logo/thương hiệu của người khác, mặt người thật đang sống (trừ ảnh tư liệu có giấy phép và đúng ngữ cảnh).

## 8. Học từ số liệu

CTR (tỷ lệ bấm) chỉ có trong YouTube Studio (Analytics → Phạm vi tiếp cận), API không trả. Khi người dùng gửi số liệu hoặc khi chạy skill `phan-tich`: ghi mẫu thắng/thua vào mục "Bài học từ dữ liệu" của skill kênh, kèm câu hỏi và kiểu hình đã dùng. Mốc tham khảo: CTR < 3% sau 2–3 ngày → thử mẫu khác.
