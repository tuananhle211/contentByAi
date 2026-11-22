#!/usr/bin/env node
// Đăng video lên YouTube qua YouTube Data API v3 (không cần thư viện ngoài).
//   node scripts/upload.mjs <slug> [--channel ve-la-hieu] [--privacy private|unlisted|public] [--publish-at 2026-11-05T19:00:00+07:00]
// Lần đầu: cần .secrets/client_secret.json (OAuth "Desktop app" từ Google Cloud Console) — xem README.
// Kênh chưa kết nối → mở trình duyệt để đăng nhập (hoặc kết nối trong Studio).
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { resolveVideo } from './lib.mjs';
import { api, accessToken, authUrl, finishAuth, isConnected } from './youtube.mjs';

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const { slug, out } = resolveVideo(argv.find((a, i) => !a.startsWith('--') && !argv[i - 1]?.startsWith('--')));
const channel = opt('channel', 've-la-hieu');

// Đăng nhập qua trình duyệt với server tạm trên 127.0.0.1.
async function login() {
  await new Promise((resolve, reject) => {
    const srv = http.createServer(async (req, res) => {
      const u = new URL(req.url, 'http://127.0.0.1');
      if (!u.searchParams.get('code') && !u.searchParams.get('error')) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      srv.close();
      try {
        if (u.searchParams.get('error')) throw new Error(u.searchParams.get('error'));
        await finishAuth(u.searchParams.get('code'), u.searchParams.get('state'));
        res.end('<h2>Đã kết nối ✓ — quay lại terminal.</h2>');
        resolve();
      } catch (e) { res.end(`<h2>Lỗi: ${e.message}</h2>`); reject(e); }
    });
    srv.listen(0, '127.0.0.1', () => {
      const url = authUrl(channel, `http://127.0.0.1:${srv.address().port}`);
      console.log(`› Đăng nhập tài khoản Google của kênh "${channel}":\n  ${url}`);
      spawn('open', [url]);
    });
  });
}

const yt = JSON.parse(fs.readFileSync(path.join(out, 'youtube.json'), 'utf8'));
const videoFile = path.join(out, 'video.mp4');
if (!fs.existsSync(videoFile)) throw new Error(`Chưa có ${videoFile} — chạy npm run build -- ${slug} trước.`);
const publishAt = opt('publish-at');
const privacy = publishAt ? 'private' : opt('privacy', yt.privacy);
if (!isConnected(channel)) await login();
const token = await accessToken(channel);

// 1. video (upload kiểu resumable)
const body = {
  snippet: {
    title: yt.title.slice(0, 100), description: yt.description.slice(0, 5000), tags: yt.tags,
    categoryId: yt.categoryId, defaultLanguage: yt.defaultLanguage, defaultAudioLanguage: yt.defaultLanguage,
  },
  status: { privacyStatus: privacy, selfDeclaredMadeForKids: false, ...(publishAt && { publishAt: new Date(publishAt).toISOString() }) },
};
const data = fs.readFileSync(videoFile);
const init = await api('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': String(data.length) },
  body: JSON.stringify(body),
}, token);
console.log(`› Đang tải lên ${(data.length / 1e6).toFixed(1)} MB…`);
// Gửi từng khúc 32 MB; đứt mạng thì hỏi YouTube đã nhận tới đâu rồi nối tiếp (gửi cả file một lần từng lỗi Headers Timeout với file lớn).
const uploadUrl = init.headers.get('location'), CHUNK = 32 * 1024 * 1024, total = data.length;
const nextByte = (res) => { const m = res.headers.get('range')?.match(/bytes=0-(\d+)/); return m ? +m[1] + 1 : 0; };
let sent = 0, fails = 0, video = null;
while (!video) {
  const end = Math.min(sent + CHUNK, total);
  let res = null;
  try {
    res = await fetch(uploadUrl, { method: 'PUT', redirect: 'manual', signal: AbortSignal.timeout(280_000), headers: { Authorization: `Bearer ${await accessToken(channel)}`, 'Content-Type': 'video/mp4', 'Content-Range': `bytes ${sent}-${end - 1}/${total}` }, body: data.subarray(sent, end) });
  } catch (e) { console.warn(`  ! Đứt kết nối ở ${(sent / 1e6).toFixed(0)} MB: ${e.message.slice(0, 120)}`); }
  if (res?.ok) { video = await res.json(); break; }
  if (res?.status === 308) { sent = nextByte(res); fails = 0; console.log(`  ${Math.round(sent / total * 100)}%`); continue; }
  if (res && res.status < 500) throw new Error(`YouTube từ chối tải lên (HTTP ${res.status}): ${(await res.text()).slice(0, 300)}`);
  if (++fails > 8) throw new Error(`Tải lên thất bại sau ${fails} lần thử, dừng ở ${(sent / 1e6).toFixed(0)} MB`);
  await new Promise((r) => setTimeout(r, 3000 * fails));
  // hỏi YouTube đã nhận được bao nhiêu
  const st = await fetch(uploadUrl, { method: 'PUT', redirect: 'manual', signal: AbortSignal.timeout(60_000), headers: { Authorization: `Bearer ${await accessToken(channel)}`, 'Content-Range': `bytes */${total}` } }).catch(() => null);
  if (st?.ok) video = await st.json(); else if (st?.status === 308) sent = nextByte(st);
}
console.log(`› Video: https://youtu.be/${video.id} (${privacy}${publishAt ? `, lên sóng ${publishAt}` : ''})`);

// 2. thumbnail — cả video dài lẫn Shorts (kênh phải xác minh số điện thoại mới được đặt thumbnail tuỳ chỉnh)
const thumb = path.join(out, 'thumbnail.jpg');
let thumbSet = null;
if (fs.existsSync(thumb)) {
  try {
    await api(`https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=${video.id}&uploadType=media`, { method: 'POST', headers: { 'Content-Type': 'image/jpeg' }, body: fs.readFileSync(thumb) }, token);
    thumbSet = new Date().toISOString();
    console.log('› Đã đặt thumbnail');
  } catch (e) { console.warn(`  ! Không đặt được thumbnail (kênh đã xác minh SĐT chưa?): ${e.message.slice(0, 200)}`); }
}

// 3. phụ đề
const srt = path.join(out, 'captions.srt');
if (fs.existsSync(srt)) {
  const b = `----${crypto.randomBytes(8).toString('hex')}`;
  const meta = JSON.stringify({ snippet: { videoId: video.id, language: yt.defaultLanguage, name: yt.defaultLanguage === 'en' ? 'English' : 'Tiếng Việt' } });
  const payload = Buffer.concat([
    Buffer.from(`--${b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n--${b}\r\nContent-Type: application/octet-stream\r\n\r\n`),
    fs.readFileSync(srt), Buffer.from(`\r\n--${b}--`),
  ]);
  try {
    await api('https://www.googleapis.com/upload/youtube/v3/captions?part=snippet&uploadType=multipart', { method: 'POST', headers: { 'Content-Type': `multipart/related; boundary=${b}` }, body: payload }, token);
    console.log('› Đã thêm phụ đề');
  } catch (e) { console.warn(`  ! Không thêm được phụ đề: ${e.message.slice(0, 200)}`); }
}

fs.writeFileSync(path.join(out, 'uploaded.json'), JSON.stringify({ id: video.id, url: `https://youtu.be/${video.id}`, channel, privacy, publishAt, at: new Date().toISOString(), ...(thumbSet && { thumbSet }) }, null, 2));
