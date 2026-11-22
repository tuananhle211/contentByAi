---
name: y-tuong-video
description: Lập danh sách ý tưởng video đã kiểm chứng nhu cầu cho một kênh/ngách và đưa vào Studio. Dùng khi người dùng xin ý tưởng video, muốn lên lịch nội dung, cần thêm chủ đề cho kênh, hoặc vừa chọn xong ngách.
---

# Ý tưởng video có dữ liệu

Không đoán ý tưởng — lấy từ thứ người xem đang gõ, rồi kiểm tra có view thật.

## Quy trình

1. **Xác định kênh & ngách.** Đọc skill vibe của kênh (`.claude/skills/kenh-<id>/`) — ngôn ngữ, thị trường, góc tiêu đề — rồi `data/studio.json` (kênh, chủ đề đã có) và báo cáo ngách gần nhất trong `channel/research/`. Seed và tiêu đề viết bằng ngôn ngữ của kênh.
2. **Đào gợi ý** (miễn phí):
   `node scripts/niche/ideas.mjs "seed 1" "seed 2" ... --deep --out output/research/ideas-<ten>.json`
   Seed = 3–6 cụm từ lõi của ngách. Gom các gợi ý thành **chủ đề tập** (một tập trả lời một câu hỏi/kể một câu chuyện), bỏ trùng, bỏ gợi ý lạc đề (bài hát, phim, karaoke, tên kênh đối thủ).
3. **Kiểm chứng 10–15 chủ đề mạnh nhất** bằng API (~102 đơn vị/chủ đề): tạo `research/<ten>-tap.json` dạng `[{ "id", "name", "seeds": ["truy vấn chính"] }]` rồi
   `node scripts/niche/scan.mjs research/<ten>-tap.json --per 1 --budget 1600`.
   Giữ chủ đề có *view TB/ngày* cao và *kênh nhỏ thắng* ≥ 3. Chủ đề view thấp → để cuối danh sách hoặc gộp vào tập tổng hợp.
4. **Thiết kế tập**, mỗi tập ghi vào `notes`:
   - Góc kể khác đối thủ (xem tiêu đề top video trong `report.md` để tránh trùng góc).
   - Tiêu đề nháp < 60 ký tự (hoặc theo skill kênh), chứa đúng cụm người xem gõ, khơi tò mò, **kèm ý tưởng thumbnail** đi cùng (2–4 chữ to + nhân vật cảm xúc + một vật thể/con số; bổ sung chứ không lặp chữ tiêu đề). Không câu view: tập đó phải trả lời được đúng điều tiêu đề hứa.
   - Định dạng: video dài (8–20 phút cho ngách kể chuyện), hoặc Shorts (30–50 giây, một "sự thật gây sốc").
   - Bằng chứng: "<truy vấn>: view TB …, kênh nhỏ thắng …".
   - **Concept** (skill `concept-truyen-thong`): `Concept: #9 #8 #13`, ≥ 3 cho tập dài, ≥ 2 cho Short; đánh dấu concept cốt lõi bằng `*`, ví dụ `#9*`. Ý tưởng chỉ có concept trang trí → để cuối danh sách.
   Xen kẽ: chủ đề **lớn, quen thuộc** (kéo view tìm kiếm) và chủ đề **lạ, tò mò** (kéo click từ đề xuất). Mỗi 4–5 tập có một tập tổng hợp "Toàn bộ X trong N phút".
5. **Đưa vào Studio**: viết `research/topics-<ten>.json`:
   ```json
   { "channel": { "id": "kenh-id", "name": "Tên kênh", "handle": "@handle", "description": "..." },
     "topics": [{ "title": "...", "pillar": "...", "format": "long", "notes": "Góc kể… · Bằng chứng…" }] }
   ```
   rồi `node scripts/niche/add-topics.mjs research/topics-<ten>.json` (tự tạo kênh nếu chưa có, bỏ qua trùng tiêu đề). Nếu Studio đang chạy, bảo người dùng tải lại trang.
6. Báo lại: bảng 10 tập ưu tiên (tiêu đề, ý tưởng thumbnail, định dạng, concept, bằng chứng), và tập nên làm đầu tiên + lý do.

## Khi người dùng chỉ xin ý tưởng tiêu đề
Đưa **15 tiêu đề**, mỗi dòng: tiêu đề (< 60 ký tự, đếm cả dấu) · ý tưởng thumbnail (chữ trên thumbnail, nhân vật + cảm xúc, vật thể chính, màu nền) · cụm tìm kiếm nó nhắm tới. Trộn các kiểu: câu hỏi giải mã ("… có thật không?"), con số vô lý, so sánh với đời nay, "vì sao…", bí ẩn/đáng sợ — theo các góc đã chứng minh trong skill kênh. Gạch bỏ phương án nào hứa điều nội dung không trả lời được. Đánh dấu 3 phương án mạnh nhất.
