// Soát tính đồng nhất của kịch bản: gom mọi con số, khoảng cách, mốc thời gian, tuổi/lớp, tên riêng
// theo từng cảnh để so chéo (vd. "cách 60 cây số" ở cảnh 20 nhưng "100 cây số" ở cảnh 35).
// Dùng: node scripts/soat-kich-ban.mjs <slug> [<slug short> ...]  (nhiều slug = so tập dài với Shorts)
import fs from 'fs';

const NUM = '(?:\\d+(?:[.,]\\d+)?|một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười|mươi|mốt|lăm|trăm|nghìn|ngàn|triệu|rưỡi|nửa|vài|mấy)';
const UNIT = '(?:cây số|km|ki-lô-mét|mét|cây|dặm|tiếng|giờ|phút|giây|ngày|đêm|hôm|tuần|tháng|năm|tuổi|lần|người|đứa|bước|nén|chữ|cái|chiếc|đồng|nghìn|triệu)';
const PATS = {
  'Số + đơn vị': new RegExp(`(?:${NUM}\\s){0,3}${NUM}\\s${UNIT}`, 'giu'),
  'Chữ số': /\d[\d.,/:]*/g,
  'Lớp / tuổi': /(?:lớp|năm lớp|hết lớp|lên lớp)\s+\S+|\S+\s+tuổi/giu,
  'Mốc thời gian': /(?:sáng|trưa|chiều|tối|đêm|hôm|ngày|tuần|tháng|năm|mùa|hè|rằm|mùng|giỗ)\s+(?:hôm\s+)?(?:sau|trước|ấy|đó|thứ\s+\S+|nay|kia|tháng\s+\S+|\S+\s+âm lịch)|(?:rằm|mùng)\s+tháng\s+\S+|(?:\d+|một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười)\s+giờ(?:\s+(?:sáng|chiều|tối|đêm))?/giu,
  'Khoảng cách / vị trí': /cách\s+[^,.;:]{1,40}|tầng\s+\S+|(?:đầu|cuối|giữa)\s+(?:làng|xóm|chợ|ngõ|dãy|sông|đường)/giu,
};

function scenes(slug) {
  // Chưa có video.js (mới viết kịch bản): đọc các đoạn đánh số trong mục "## Lời đọc" của kich-ban.md.
  if (!fs.existsSync(`videos/${slug}/video.js`)) {
    const md = fs.readFileSync(`videos/${slug}/kich-ban.md`, 'utf8').split('## Lời đọc')[1].split(/\n## /)[0];
    return [...md.matchAll(/^\d+\.\s+(.+)$/gm)].map((m) => m[1].trim());
  }
  const src = fs.readFileSync(`videos/${slug}/video.js`, 'utf8');
  const out = []; const re = /say:\s*(['`])((?:\\.|(?!\1).)*)\1/gs; let m;
  while ((m = re.exec(src))) out.push(m[2].replace(/\\'/g, "'").replace(/\{[a-z0-9]+\}/gi, '').replace(/\s+/g, ' ').trim());
  return out;
}

const slugs = process.argv.slice(2);
if (!slugs.length) { console.error('Dùng: node scripts/soat-kich-ban.mjs <slug> [<slug>...]'); process.exit(1); }
const names = new Map();
for (const slug of slugs) {
  const sc = scenes(slug);
  console.log(`\n=== ${slug} (${sc.length} cảnh)`);
  for (const [cat, re] of Object.entries(PATS)) {
    const rows = [];
    sc.forEach((t, i) => { const hits = [...new Set((t.match(re) || []).map((s) => s.trim()))]; if (hits.length) rows.push(`  ${String(i + 1).padStart(2)}: ${hits.join(' · ')}`); });
    if (rows.length) console.log(`-- ${cat}\n${rows.join('\n')}`);
  }
  // Tên riêng: từ viết hoa không đứng đầu câu.
  sc.forEach((t, i) => {
    for (const m of t.matchAll(/(?<![.!?:]\s|^)(?:(?:bà|ông|bác|cô|chú|thầy|thằng|cái|anh|chị|em)\s+)?\p{Lu}[\p{L}]*(?:\s\p{Lu}[\p{L}]*)*/gu)) {
      const k = m[0].replace(/^(?:bà|ông|bác|cô|chú|thầy|thằng|cái|anh|chị|em)\s+/u, '');
      if (k.length < 2) continue;
      if (!names.has(k)) names.set(k, new Set()); names.get(k).add(`${slug.slice(0, 3)}:${i + 1}`);
    }
  });
}
console.log('\n=== Tên riêng (tên → cảnh xuất hiện). Soát: tên gần giống nhau dễ nhầm khi nghe (Tùng/Tòng), một người hai tên.');
for (const [k, v] of [...names].sort((a, b) => a[0].localeCompare(b[0], 'vi'))) console.log(`  ${k}: ${[...v].join(' ')}`);
