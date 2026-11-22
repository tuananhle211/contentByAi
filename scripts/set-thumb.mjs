#!/usr/bin/env node
// Thay thumbnail cho video đã đăng (đọc id + kênh từ output/<slug>/uploaded.json).
//   node scripts/set-thumb.mjs <slug>… [--variant a|b|c]   (mặc định: output/<slug>/thumbnail.jpg)
// Không tính vào giới hạn số video tải lên/ngày; kênh phải xác minh SĐT mới đặt được thumbnail tuỳ chỉnh.
import fs from 'node:fs';
import path from 'node:path';
import { resolveVideo } from './lib.mjs';
import { api, accessToken } from './youtube.mjs';

const argv = process.argv.slice(2);
const vi = argv.indexOf('--variant');
const variant = vi >= 0 ? argv[vi + 1] : null;
const slugs = argv.filter((a, i) => !a.startsWith('--') && (vi < 0 || i !== vi + 1));
let failed = 0;
for (const s of slugs) {
  const { slug, out } = resolveVideo(s);
  const file = path.join(out, variant ? `thumb-${variant}.jpg` : 'thumbnail.jpg');
  const upFile = path.join(out, 'uploaded.json');
  try {
    if (!fs.existsSync(upFile)) throw new Error('chưa đăng (không có uploaded.json)');
    if (!fs.existsSync(file)) throw new Error(`thiếu ${path.basename(file)}`);
    const up = JSON.parse(fs.readFileSync(upFile, 'utf8'));
    const token = await accessToken(up.channel);
    await api(`https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=${up.id}&uploadType=media`, { method: 'POST', headers: { 'Content-Type': 'image/jpeg' }, body: fs.readFileSync(file) }, token);
    fs.writeFileSync(upFile, JSON.stringify({ ...up, thumbSet: new Date().toISOString() }, null, 2));
    console.log(`› ${slug}: đã đặt ${path.basename(file)} → https://youtu.be/${up.id}`);
  } catch (e) {
    failed++;
    console.warn(`  ! ${slug}: ${e.message.slice(0, 300)}`);
  }
}
process.exit(failed ? 1 : 0);
