---
name: tim-ngach
description: Tìm thị trường ngách YouTube Việt Nam ít cạnh tranh mà nhiều view, bằng dữ liệu thật (YouTube Data API + gợi ý tìm kiếm). Dùng khi người dùng muốn tìm ngách mới, chọn chủ đề cho kênh mới, so sánh các hướng nội dung, hoặc hỏi "làm kênh về gì thì nhiều view".
---

# Tìm ngách YouTube

Mục tiêu: tìm ngách mà **người xem tìm nhiều** nhưng **kênh nhỏ vẫn lên top**, và **hợp với cách sản xuất của repo** (hoạt hình vẽ tay, giọng AI tiếng Việt, không lộ mặt).

Mặc định script quét thị trường **VN / tiếng Việt**. Kênh nước ngoài: đọc skill kênh (`kenh-<id>`) để biết thị trường; seed viết đúng cách người bản xứ gõ, và cần tham số vùng/ngôn ngữ cho script (xem "Việc kỹ thuật còn thiếu" trong `kenh-ancient-humans`).

## Công cụ

- `node scripts/niche/scan.mjs <niches.json> --per 2 --budget 3000 [--label ten]` → `output/research/<label>/report.md` + `data.json`
- `node scripts/niche/ideas.mjs "seed" ... [--deep] [--out f.json]` → gợi ý tìm kiếm YouTube (miễn phí)
- Cần một kênh đã kết nối trong Studio (`.secrets/tokens/`) hoặc `YOUTUBE_API_KEY` trong `.env`.
- **Hạn mức 10.000 đơn vị/ngày**: mỗi truy vấn tìm kiếm tốn ~102 đơn vị. 18 ngách × 2 truy vấn ≈ 3.700. Kết quả cache 7 ngày trong `.cache/yt/` — chạy lại không tốn thêm. Kiểm tra tổng đã dùng trong ngày trước khi chạy vòng mới.

## Quy trình

1. **Vòng 1 — quét rộng (15–20 ngách).** Viết `research/niches-<thang>.json`. Mỗi ngách 4 seed, viết **đúng cách người Việt gõ tìm kiếm** ("lãi kép là gì", không phải "giáo dục tài chính"). Seed đầu tiên/thứ hai được quét bằng API nên phải là truy vấn đại diện nhất. Loại ngay ngách không làm được bằng engine (vlog, review phim, nấu ăn quay thật, game).
2. **Đọc dữ liệu thô, không chỉ bảng điểm.** Với 5–6 ngách điểm cao nhất, in top 10 video mỗi truy vấn từ `data.json` và tự hỏi: kết quả có đúng chủ đề không? Điểm có bị thổi phồng bởi nội dung lạc đề không?
   Bài học đã gặp: "tại sao công ty phá sản" → toàn phim ngắn "tổng tài"; "thần thoại việt nam" → lẫn bài hát tên "Thần thoại". Truy vấn nhiễu → thay seed và quét lại.
3. **Vòng 2 — đào sâu 8–10 nhánh con** của 2–3 ngách tốt nhất (ví dụ "Lịch sử VN" → triều đại ít kể, nhân vật, Champa, truyền thuyết…). Ngách con thường lộ ra chỗ trống mà ngách mẹ che khuất.
4. **Vòng 3 — kiểm tra từng tập.** Lấy gợi ý từ `ideas.mjs --deep`, chọn 10–15 chủ đề tập cụ thể, mỗi chủ đề là một "ngách" 1 seed, chạy `--per 1`. Gợi ý tìm kiếm nhiều ≠ view nhiều (đã thấy: "tứ bất tử" nhiều gợi ý nhưng view thấp).
5. **Đánh giá định tính** từng ngách lọt vòng cuối theo bảng dưới, rồi **viết báo cáo** `channel/research/<ngay>-<ten>.md`: kết luận trước, bằng chứng (tên kênh nhỏ + số view + tuổi video), rủi ro, kế hoạch 10 video đầu.
6. Hỏi người dùng có muốn tạo kênh mới trong Studio và đưa danh sách tập vào không → dùng skill `y-tuong-video`.

## Đọc chỉ số (`report.md`)

| Chỉ số | Ý nghĩa | Tốt |
|---|---|---|
| View TB/ngày | trung vị view chia tuổi video — nhu cầu *hiện tại* | > 300 |
| Kênh nhỏ thắng | số video từ kênh ≤30K sub đạt ≥30K view | ≥ 5 (cửa cho kênh mới) |
| View/sub | trung vị view ÷ sub — thuật toán đẩy nội dung, không cần fan | > 1,5 |
| Kênh >1M | tỉ lệ top bị kênh lớn chiếm | < 20% |
| Tuổi top | video đầu bảng đã cũ → ít người làm mới | > 2 năm là cơ hội *nếu* view/ngày vẫn cao |
| Shorts | tỉ lệ Shorts trong top | cao → nên làm kèm Shorts |

Điểm tổng chỉ để **xếp hạng**, không phải dự báo view. Một ngách điểm cao nhưng lạc đề hoặc không làm được bằng engine vẫn phải loại.

## Tiêu chí định tính (chấm 1–5, ghi vào báo cáo)

- **Hợp engine**: vẽ tay/sơ đồ/bản đồ/sinh vật kể được không? (lịch sử, thần thoại, khoa học: rất hợp; review phim, mukbang: không)
- **Evergreen**: video có còn view sau 2–3 năm?
- **RPM**: tài chính/kinh doanh/công nghệ > giáo dục/lịch sử > giải trí > thiếu nhi.
- **Rủi ro chính sách**: nội dung chính trị hiện đại (sau 1945), y tế (lời khuyên sức khoẻ), mê tín gây sợ hãi, nội dung "dành cho trẻ em" (mất bình luận, RPM thấp). Ghi rõ cách tránh.
- **Độ sâu kho chủ đề**: có đủ ≥ 50 tập không?
- **Định dạng thắng**: độ dài video top (VD "Toàn bộ X trong N phút" 20–60 phút đang thắng ở lịch sử/thần thoại).

## Kết quả các lần quét trước

Đọc `channel/research/` trước khi bắt đầu để không quét lại thứ đã biết, và để so sánh xu hướng theo thời gian.
