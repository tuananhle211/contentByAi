#!/usr/bin/env node
// Studio: web quản lý kênh, chủ đề, video và thống kê YouTube. Chỉ chạy trên máy (127.0.0.1).
//   npm run studio   →   http://127.0.0.1:5180
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { ROOT } from '../scripts/lib.mjs';
import * as yt from '../scripts/youtube.mjs';
import { videoReport, advice } from '../scripts/analytics.mjs';

const PORT = +(process.env.STUDIO_PORT ?? 5180);
const BASE = `http://127.0.0.1:${PORT}`;
const DATA = path.join(ROOT, 'data', 'studio.json');
const STATUSES = ['idea', 'script', 'rendered', 'uploaded', 'published'];

// ---------- dữ liệu ----------
// Đọc lại vài lần nếu file đang được script khác ghi dở (JSON chưa trọn) thay vì làm sập server.
function load() {
  for (let i = 0; ; i++) {
    try { return JSON.parse(fs.readFileSync(DATA, 'utf8')); } catch (e) {
      if (i >= 5) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
    }
  }
}
function save(db) {
  fs.writeFileSync(DATA + '.tmp', JSON.stringify(db, null, 2));
  fs.renameSync(DATA + '.tmp', DATA);
}
const uid = () => crypto.randomBytes(5).toString('hex');
export const slugify = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').split('-').slice(0, 6).join('-');

const readJson = (f) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return null; } };

// ---------- dọn ổ đĩa: xoá file render nặng của video (giữ mã nguồn videos/<slug>, uploaded.json, mô tả, thumbnail, phụ đề) ----------
// File nặng = video/âm thanh (.mp4 .m4a .mp3 .wav), đoạn ghép tạm (.seg*), thư mục ảnh tĩnh stills/. Render lại được bất cứ lúc nào.
const HEAVY = (name, isDir) => (isDir ? name === 'stills' : /\.(mp4|m4a|mp3|wav)$/i.test(name) || name.startsWith('.seg'));
function dirSize(d) {
  let n = 0;
  if (!fs.existsSync(d)) return 0;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    n += e.isDirectory() ? dirSize(f) : fs.statSync(f).size;
  }
  return n;
}
function cleanupVideo(slug) {
  const out = path.join(ROOT, 'output', slug);
  if (!/^[\w-]+$/.test(slug) || !out.startsWith(path.join(ROOT, 'output') + path.sep) || !fs.existsSync(out)) return 0;
  let freed = 0;
  for (const e of fs.readdirSync(out, { withFileTypes: true })) {
    if (!HEAVY(e.name, e.isDirectory())) continue;
    const f = path.join(out, e.name);
    freed += e.isDirectory() ? dirSize(f) : fs.statSync(f).size;
    fs.rmSync(f, { recursive: true, force: true });
  }
  return freed;
}

function scanVideos(db) {
  const dir = path.join(ROOT, 'videos');
  return fs.readdirSync(dir).filter((d) => fs.existsSync(path.join(dir, d, 'video.js'))).sort().map((slug) => {
    const src = fs.readFileSync(path.join(dir, slug, 'video.js'), 'utf8');
    const out = path.join(ROOT, 'output', slug);
    const ytj = readJson(path.join(out, 'youtube.json'));
    const timing = readJson(path.join(out, 'timing.json'));
    const mp4 = path.join(out, 'video.mp4');
    const stat = fs.existsSync(mp4) ? fs.statSync(mp4) : null;
    const topic = db.topics.find((t) => t.slug === slug);
    const uploaded = readJson(path.join(out, 'uploaded.json'));
    const stillsDir = path.join(out, 'stills');
    return {
      slug,
      title: ytj?.title ?? src.match(/title:\s*(['"`])(.+?)\1/)?.[2] ?? slug,
      // bản render thật > chủ đề trong Studio > dò mã nguồn (meta có thể sinh từ shortMeta() nên không chứa chữ format: 'short')
      format: timing?.format ?? topic?.format ?? (/format:\s*['"]short['"]/.test(src) || /^\d+-short-/.test(slug) ? 'short' : 'long'),
      channel: uploaded?.channel ?? topic?.channel ?? db.channels[0]?.id,
      topic: topic?.id,
      duration: timing?.total, scenes: timing?.scenes.length,
      rendered: !!stat, size: stat?.size, renderedAt: stat?.mtime,
      disk: dirSize(out), // tổng dung lượng output/<slug> (để dọn ổ đĩa)
      sourceChangedAt: fs.statSync(path.join(dir, slug, 'video.js')).mtime,
      thumb: fs.existsSync(path.join(out, 'thumbnail.jpg')) ? `/output/${slug}/thumbnail.jpg?v=${fs.statSync(path.join(out, 'thumbnail.jpg')).mtimeMs}` : null,
      description: fs.existsSync(path.join(out, 'description.txt')) ? fs.readFileSync(path.join(out, 'description.txt'), 'utf8') : null,
      ytDescription: ytj?.description ?? null,
      tags: ytj?.tags ?? [],
      thumbs: ['a', 'b', 'c'].filter((x) => fs.existsSync(path.join(out, `thumb-${x}.jpg`))).map((x) => `/output/${slug}/thumb-${x}.jpg?v=${fs.statSync(path.join(out, `thumb-${x}.jpg`)).mtimeMs}`),
      captions: fs.existsSync(path.join(out, 'captions.srt')) ? `/output/${slug}/captions.srt` : null,
      stills: fs.existsSync(stillsDir) ? fs.readdirSync(stillsDir).filter((f) => f.endsWith('.jpg')).sort().map((f) => `/output/${slug}/stills/${f}`) : [],
      uploaded,
      // Short: tập dài để chọn ở mục "Video liên quan" (meta.related = slug tập dài; Short không còn cảnh cuối "xem bản đầy đủ").
      relatedSlug: src.match(/related:\s*['"]([^'"]+)['"]/)?.[1] ?? null,
    };
  }).map((v, _, all) => {
    if (!v.relatedSlug) return v;
    const r = all.find((x) => x.slug === v.relatedSlug);
    return { ...v, related: { slug: v.relatedSlug, title: r?.title ?? v.relatedSlug, url: r?.uploaded?.id ? `https://youtu.be/${r.uploaded.id}` : null } };
  });
}

// Khung video mới cho một chủ đề — để Claude/bạn viết tiếp lời và hình.
function scaffold(db, topic) {
  const nums = fs.readdirSync(path.join(ROOT, 'videos')).map((d) => parseInt(d, 10)).filter(Number.isFinite);
  const n = String((nums.length ? Math.max(...nums) : 0) + 1).padStart(3, '0');
  const slug = `${n}-${topic.format === 'short' ? 'short-' : ''}${slugify(topic.title)}`;
  const ch = db.channels.find((c) => c.id === topic.channel) ?? db.channels[0];
  const q = JSON.stringify(topic.title);
  const short = topic.format === 'short';
  const src = `// ${topic.title}
// Khung do Studio tạo — viết lời (say) và hình (draw) cho từng cảnh. Xem CLAUDE.md để biết API vẽ.
import { C } from '/engine/kit.js';
import { titleScene, bulletsScene, subscribeScene } from '/engine/templates.js';

export default {
  meta: {
    title: ${q},
    description: ${JSON.stringify(topic.notes || '')},
    tags: [],
    voice: 'vi-VN-HoaiMyNeural',
    music: 'assets/music/background.mp3',${short ? "\n    format: 'short',\n    captions: true," : ''}
  },
  scenes: [
    {
      chapter: 'Mở đầu',
      say: 'Câu mở đầu gây tò mò {q}về chủ đề này.',
      draw(k) {
        k.icon('question', k.W / 2, k.H / 2 - 80, 260, { p: k.at('q', 0.8) });
        k.text(${q}, k.W / 2, k.H / 2 + 160, { size: 80, font: 'title', maxWidth: k.W * 0.85, p: k.at(0.2, 1.6, 'linear') });
      },
    },${short ? '' : `
    titleScene({ say: ${JSON.stringify(`${topic.title} Hãy cùng vẽ ra để hiểu nhé!`)}, title: ${q}, subtitle: ${JSON.stringify(ch?.name ?? '')} }),`}
    bulletsScene({
      chapter: 'Tóm tắt',
      say: 'Tóm lại: {a}ý thứ nhất. {b}Ý thứ hai.',
      title: 'Tóm tắt',
      items: [{ text: 'Ý thứ nhất', cue: 'a', icon: 'bulb' }, { text: 'Ý thứ hai', cue: 'b', icon: 'check' }],
    }),
    subscribeScene({ say: ${JSON.stringify(`Đừng quên {sub}đăng ký kênh ${ch?.name ?? ''} nhé!`)}, channel: ${JSON.stringify(ch?.name ?? '')}, tail: 1.2 }),
  ],
};
`;
  fs.mkdirSync(path.join(ROOT, 'videos', slug), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'videos', slug, 'video.js'), src);
  return slug;
}

// ---------- tác vụ nền (render, upload) — chạy lần lượt ----------
const jobs = [];
let running = null;
function enqueue(type, slug, extra = {}) {
  const args = {
    stills: ['scripts/build.mjs', slug, '--stills'],
    build: ['scripts/build.mjs', slug],
    upload: ['scripts/upload.mjs', slug, '--channel', extra.channel, ...(extra.publishAt ? ['--publish-at', new Date(extra.publishAt).toISOString()] : ['--privacy', ['private', 'unlisted', 'public'].includes(extra.privacy) ? extra.privacy : 'private'])],
  }[type];
  if (!args) throw new Error(`Tác vụ không hợp lệ: ${type}`);
  const job = { id: uid(), type, slug, status: 'queued', log: '', createdAt: Date.now() };
  job.args = args;
  jobs.unshift(job);
  jobs.splice(30);
  pump();
  return job;
}
function pump() {
  if (running) return;
  const job = [...jobs].reverse().find((j) => j.status === 'queued');
  if (!job) return;
  running = job;
  job.status = 'running';
  const p = spawn(process.execPath, job.args, { cwd: ROOT });
  const onData = (d) => {
    // giữ dòng tiến độ cuối cùng (\r) thay vì cộng dồn
    for (const part of d.toString().split(/(\r|\n)/)) {
      if (part === '\r') job.log = job.log.replace(/[^\n]*$/, '');
      else job.log += part;
    }
    if (job.log.length > 20000) job.log = job.log.slice(-20000);
  };
  p.stdout.on('data', onData);
  p.stderr.on('data', onData);
  p.on('close', (code) => {
    job.status = code === 0 ? 'done' : 'failed';
    job.endedAt = Date.now();
    if (code === 0 && job.type !== 'stills') {
      try {
        const db = load();
        const t = db.topics.find((x) => x.slug === job.slug);
        if (t) {
          const next = job.type === 'build' ? 'rendered' : 'uploaded';
          if (STATUSES.indexOf(t.status) < STATUSES.indexOf(next)) { t.status = next; save(db); }
        }
      } catch (e) { console.error(`! Không cập nhật được trạng thái ${job.slug}:`, e.message); }
    }
    running = null;
    pump();
  });
}

// ---------- trạng thái đăng của từng video ----------
const uploadedFile = (slug) => path.join(ROOT, 'output', slug, 'uploaded.json');
const ytCache = new Map();
const anaCache = new Map();
function syncTopic(slug, st) {
  if (!st?.exists) return;
  const db = load();
  const t = db.topics.find((x) => x.slug === slug);
  if (!t) return;
  const next = st.privacy === 'public' ? 'published' : 'uploaded';
  let dirty = false;
  if (t.status !== next && STATUSES.indexOf(next) >= STATUSES.indexOf('uploaded')) { t.status = next; dirty = true; }
  // giờ hẹn thật trên YouTube là lịch chính thức
  if (st.publishAt && st.privacy === 'private' && t.planAt !== new Date(st.publishAt).toISOString()) { t.planAt = new Date(st.publishAt).toISOString(); dirty = true; }
  if (dirty) save(db);
}
async function ytOfVideo(slug, refresh) {
  const up = readJson(uploadedFile(slug));
  if (!up) return null;
  const c = ytCache.get(slug);
  if (c && !refresh && Date.now() - c.at < 60_000) return c.data;
  const ch = up.channel ?? load().channels[0]?.id;
  const data = { ...(await yt.videoStatus(ch, up.id)), channel: ch, linked: !!up.linked };
  ytCache.set(slug, { at: Date.now(), data });
  syncTopic(slug, data);
  return data;
}

// ---------- thống kê YouTube (cache 10 phút) ----------
const statCache = new Map();
async function stats(channel, refresh) {
  const c = statCache.get(channel.id);
  if (c && !refresh && Date.now() - c.at < 600_000) return c.data;
  let data;
  if (yt.isConnected(channel.id)) data = await yt.channelReport(channel.id);
  else if (process.env.YOUTUBE_API_KEY && channel.handle) data = await yt.publicReport(channel.handle);
  else return { connected: false, hasClient: yt.hasClient(), hasKey: !!process.env.YOUTUBE_API_KEY };
  data.connected = true;
  data.fetchedAt = Date.now();
  if (data.source === 'oauth') autoLink(channel.id, data.videos);
  statCache.set(channel.id, { at: Date.now(), data });
  return data;
}

// Video đăng tay trên YouTube Studio có tiêu đề trùng video trong xưởng → tự liên kết, rồi tự đặt thumbnail.jpg của xưởng
// (người dùng yêu cầu 09/11 để khỏi đặt tay). Mỗi video chỉ đặt một lần (uploaded.json → thumbSet).
async function autoThumb(slug) {
  const f = uploadedFile(slug), up = readJson(f), img = path.join(ROOT, 'output', slug, 'thumbnail.jpg');
  if (!up || up.thumbSet || up.thumbFail || !fs.existsSync(img)) return;
  try {
    const token = await yt.accessToken(up.channel);
    await yt.api(`https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=${up.id}&uploadType=media`, { method: 'POST', headers: { 'Content-Type': 'image/jpeg' }, body: fs.readFileSync(img) }, token);
    fs.writeFileSync(f, JSON.stringify({ ...readJson(f), thumbSet: new Date().toISOString() }, null, 2));
    console.log(`› Đã tự đặt thumbnail: ${slug}`);
  } catch (e) {
    fs.writeFileSync(f, JSON.stringify({ ...readJson(f), thumbFail: String(e.message).slice(0, 200) }, null, 2));
    console.warn(`  ! Không tự đặt được thumbnail ${slug}: ${String(e.message).slice(0, 200)}`);
  }
}
const normTitle = (s) => String(s ?? '').normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
function autoLink(chId, ytVideos) {
  const db = load();
  const taken = new Set(scanVideos(db).filter((v) => v.uploaded).map((v) => v.uploaded.id));
  for (const v of scanVideos(db)) {
    if (v.uploaded || !v.rendered || v.channel !== chId) continue;
    const hit = ytVideos.find((y) => !taken.has(y.id) && normTitle(y.title) === normTitle(v.title));
    if (!hit) continue;
    taken.add(hit.id);
    fs.writeFileSync(uploadedFile(v.slug), JSON.stringify({ id: hit.id, url: `https://youtu.be/${hit.id}`, channel: chId, linked: true, auto: true, at: new Date().toISOString() }, null, 2));
    syncTopic(v.slug, { exists: true, privacy: hit.privacy, publishAt: hit.publishAt });
    autoThumb(v.slug);
  }
}

// ---------- lịch đăng dự kiến (topic.planAt) ----------
// Quy tắc theo kênh: channel.schedule = { tz, long: { days, time, times? }, short: { days, time, times? } }; days: 0 = CN … 6 = T7; times = nhiều giờ đăng mỗi ngày.
const DEFAULT_SCHEDULE = { tz: '+07:00', long: { days: [4, 0], time: '17:00' }, short: { days: [2, 6], time: '19:30' } };
function slotsAfter(rules, format, from, n) {
  const r = rules[format];
  const [, sg, hh, mm] = rules.tz.match(/([+-])(\d\d):(\d\d)/);
  const off = (sg === '-' ? -1 : 1) * (+hh * 60 + +mm) * 60_000;
  const out = [];
  for (let d = 0; out.length < n && d < 800; d++) {
    const day = new Date(from + off + d * 864e5);
    if (!r.days.includes(day.getUTCDay())) continue;
    for (const time of [...(r.times ?? [r.time])].sort()) {
      const at = new Date(`${day.toISOString().slice(0, 10)}T${time}:00${rules.tz}`);
      if (+at > from && out.length < n) out.push(at);
    }
  }
  return out;
}
// Xếp chủ đề chưa có lịch vào các khung trống, theo thứ tự trong danh sách, nối tiếp sau lịch đã có.
// reset: xếp lại mọi chủ đề chưa lên sóng và chưa được hẹn trên YouTube.
function planChannel(db, chId, reset) {
  const ch = db.channels.find((c) => c.id === chId);
  const rules = { ...DEFAULT_SCHEDULE, ...ch?.schedule };
  const minAt = Date.now() + 12 * 3600e3; // chừa thời gian làm và tải video lên
  const topics = db.topics.filter((t) => t.channel === chId && ['long', 'short'].includes(t.format) && t.status !== 'published');
  const ytAt = (t) => t.slug && readJson(uploadedFile(t.slug))?.publishAt;
  if (reset) for (const t of topics) if (!(ytAt(t) && new Date(ytAt(t)) > Date.now())) delete t.planAt;
  const taken = new Set(db.topics.filter((t) => t.planAt).map((t) => +new Date(t.planAt)));
  for (const fmt of ['long', 'short']) {
    const todo = topics.filter((t) => t.format === fmt && !t.planAt);
    const last = Math.max(0, ...topics.filter((t) => t.format === fmt && t.planAt).map((t) => +new Date(t.planAt)));
    const free = slotsAfter(rules, fmt, Math.max(minAt, last), todo.length + taken.size).filter((s) => !taken.has(+s));
    todo.forEach((t, i) => { t.planAt = free[i].toISOString(); taken.add(+free[i]); });
  }
  return rules;
}

// ---------- HTTP ----------
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4', '.ttf': 'font/ttf', '.svg': 'image/svg+xml' };

function sendFile(req, res, file) {
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('Không tìm thấy'); return; }
  const size = fs.statSync(file).size;
  const type = MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream';
  const m = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
  if (m) {
    const start = m[1] ? +m[1] : 0, end = m[2] ? +m[2] : size - 1;
    res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
    fs.createReadStream(file, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' });
    fs.createReadStream(file).pipe(res);
  }
}
const json = (res, code, data) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(data)); };
const body = (req) => new Promise((resolve, reject) => {
  let s = '';
  req.on('data', (d) => { s += d; if (s.length > 1e6) req.destroy(); });
  req.on('end', () => { try { resolve(s ? JSON.parse(s) : {}); } catch (e) { reject(e); } });
});

async function route(req, res) {
  const u = new URL(req.url, BASE);
  const p = decodeURIComponent(u.pathname);
  const M = req.method;

  // Chặn trang web lạ gọi API của Studio (chỉ chấp nhận yêu cầu từ chính Studio).
  if (p.startsWith('/api/') && M !== 'GET' && req.headers.origin && req.headers.origin !== BASE) return json(res, 403, { error: 'origin' });

  // Google chuyển về đây sau khi đăng nhập (redirect_uri = BASE).
  if (p === '/' && (u.searchParams.has('code') || u.searchParams.has('error'))) {
    let msg;
    try {
      if (u.searchParams.get('error')) throw new Error(u.searchParams.get('error'));
      const ch = await yt.finishAuth(u.searchParams.get('code'), u.searchParams.get('state'));
      statCache.delete(ch);
      msg = `connected=${encodeURIComponent(ch)}`;
    } catch (e) { msg = `authError=${encodeURIComponent(e.message)}`; }
    res.writeHead(302, { Location: `/?${msg}#overview` });
    res.end();
    return;
  }
  if (p === '/') return sendFile(req, res, path.join(ROOT, 'studio', 'index.html'));
  for (const dir of ['studio', 'output', 'engine']) {
    if (p.startsWith(`/${dir}/`)) {
      const f = path.join(ROOT, p);
      if (!f.startsWith(path.join(ROOT, dir) + path.sep)) return json(res, 403, { error: 'path' });
      return sendFile(req, res, f);
    }
  }

  if (p === '/api/state' && M === 'GET') {
    const db = load();
    return json(res, 200, {
      ...db, statuses: STATUSES, videos: scanVideos(db),
      connected: Object.fromEntries(db.channels.map((c) => [c.id, yt.isConnected(c.id)])),
      hasClient: yt.hasClient(), hasKey: !!process.env.YOUTUBE_API_KEY,
      defaultSchedule: DEFAULT_SCHEDULE,
      jobs: jobs.map(({ args, log, ...j }) => j),
    });
  }

  // kênh
  if (p === '/api/channels' && M === 'POST') {
    const b = await body(req);
    const db = load();
    if (!b.name?.trim()) return json(res, 400, { error: 'Thiếu tên kênh' });
    const id = b.id || slugify(b.name);
    if (!id) return json(res, 400, { error: 'Tên kênh không hợp lệ' });
    let c = db.channels.find((x) => x.id === id);
    if (!c) { if (b.isNew && db.channels.some((x) => x.id === id)) return json(res, 400, { error: 'Kênh đã tồn tại' }); c = { id }; db.channels.push(c); }
    Object.assign(c, { name: b.name.trim(), handle: b.handle?.trim() ?? '', description: b.description?.trim() ?? '' });
    save(db);
    return json(res, 200, c);
  }
  let m;
  if ((m = p.match(/^\/api\/channels\/([\w-]+)$/)) && M === 'DELETE') {
    const db = load();
    if (db.topics.some((t) => t.channel === m[1])) return json(res, 400, { error: 'Kênh còn chủ đề — chuyển hoặc xoá chủ đề trước.' });
    db.channels = db.channels.filter((c) => c.id !== m[1]);
    yt.disconnect(m[1]);
    save(db);
    return json(res, 200, { ok: true });
  }
  if ((m = p.match(/^\/api\/channels\/([\w-]+)\/plan$/)) && M === 'POST') {
    const b = await body(req);
    const db = load();
    if (!db.channels.some((c) => c.id === m[1])) return json(res, 404, { error: 'Không có kênh' });
    const rules = planChannel(db, m[1], !!b.reset);
    save(db);
    return json(res, 200, { rules, topics: db.topics.filter((t) => t.channel === m[1]) });
  }
  if ((m = p.match(/^\/api\/channels\/([\w-]+)\/connect$/)) && M === 'POST') {
    try { return json(res, 200, { url: yt.authUrl(m[1], BASE) }); } catch (e) { return json(res, 400, { error: e.message }); }
  }
  if ((m = p.match(/^\/api\/channels\/([\w-]+)\/disconnect$/)) && M === 'POST') {
    yt.disconnect(m[1]); statCache.delete(m[1]);
    return json(res, 200, { ok: true });
  }
  if ((m = p.match(/^\/api\/channels\/([\w-]+)\/stats$/)) && M === 'GET') {
    const ch = load().channels.find((c) => c.id === m[1]);
    if (!ch) return json(res, 404, { error: 'Không có kênh' });
    try { return json(res, 200, await stats(ch, u.searchParams.has('refresh'))); } catch (e) {
      return json(res, e.code === 'NOT_CONNECTED' ? 200 : 502, { connected: false, error: e.message, hasClient: yt.hasClient() });
    }
  }

  // chủ đề
  if (p === '/api/topics' && M === 'POST') {
    const b = await body(req);
    if (!b.title?.trim()) return json(res, 400, { error: 'Thiếu tiêu đề' });
    const db = load();
    const t = { id: uid(), title: b.title.trim(), channel: b.channel ?? db.channels[0]?.id, pillar: b.pillar ?? '', format: b.format === 'short' ? 'short' : 'long', status: 'idea', notes: b.notes ?? '', slug: null, createdAt: new Date().toISOString() };
    db.topics.push(t);
    save(db);
    return json(res, 200, t);
  }
  if ((m = p.match(/^\/api\/topics\/(\w+)$/))) {
    const db = load();
    const t = db.topics.find((x) => x.id === m[1]);
    if (!t) return json(res, 404, { error: 'Không có chủ đề' });
    if (M === 'DELETE') { db.topics = db.topics.filter((x) => x !== t); save(db); return json(res, 200, { ok: true }); }
    if (M === 'PUT') {
      const b = await body(req);
      for (const k of ['title', 'channel', 'pillar', 'format', 'notes', 'slug']) if (k in b) t[k] = b[k];
      if ('planAt' in b) { if (b.planAt && !isNaN(new Date(b.planAt))) t.planAt = new Date(b.planAt).toISOString(); else delete t.planAt; }
      if (b.status && STATUSES.includes(b.status)) t.status = b.status;
      save(db);
      return json(res, 200, t);
    }
  }
  if ((m = p.match(/^\/api\/topics\/(\w+)\/scaffold$/)) && M === 'POST') {
    const db = load();
    const t = db.topics.find((x) => x.id === m[1]);
    if (!t) return json(res, 404, { error: 'Không có chủ đề' });
    if (t.slug) return json(res, 400, { error: `Đã có video ${t.slug}` });
    t.slug = scaffold(db, t);
    if (t.status === 'idea') t.status = 'script';
    save(db);
    return json(res, 200, t);
  }

  // trạng thái đăng / hẹn giờ / công khai
  if ((m = p.match(/^\/api\/videos\/([\w-]+)\/youtube$/)) && M === 'GET') {
    try { return json(res, 200, (await ytOfVideo(m[1], u.searchParams.has('refresh'))) ?? { uploaded: false }); } catch (e) { return json(res, 502, { error: e.message }); }
  }
  if ((m = p.match(/^\/api\/videos\/([\w-]+)\/analytics$/)) && M === 'GET') {
    const up = readJson(uploadedFile(m[1]));
    if (!up) return json(res, 200, { error: 'Video chưa đăng / chưa liên kết YouTube.' });
    const c = anaCache.get(m[1]);
    if (c && !u.searchParams.has('refresh') && Date.now() - c.at < 600_000) return json(res, 200, c.data);
    try {
      const r = await videoReport(up.channel ?? load().channels[0]?.id, m[1]);
      const data = { ...r, advice: advice(r) };
      anaCache.set(m[1], { at: Date.now(), data });
      return json(res, 200, data);
    } catch (e) { return json(res, 502, { error: e.message }); }
  }
  if ((m = p.match(/^\/api\/videos\/([\w-]+)\/publish$/)) && M === 'POST') {
    const up = readJson(uploadedFile(m[1]));
    if (!up) return json(res, 400, { error: 'Video chưa được đăng hoặc liên kết với YouTube.' });
    const b = await body(req);
    if (!['public', 'unlisted', 'private', 'schedule'].includes(b.mode)) return json(res, 400, { error: 'Chế độ không hợp lệ' });
    try {
      const ch = up.channel ?? load().channels[0]?.id;
      const st = { ...(await yt.setVideoStatus(ch, up.id, b)), channel: ch, linked: !!up.linked };
      ytCache.set(m[1], { at: Date.now(), data: st });
      statCache.delete(ch);
      syncTopic(m[1], st);
      return json(res, 200, st);
    } catch (e) { return json(res, 400, { error: e.message }); }
  }
  if ((m = p.match(/^\/api\/videos\/([\w-]+)\/link$/)) && M === 'POST') {
    const b = await body(req);
    const id = yt.parseVideoId(b.video ?? '');
    if (!id) return json(res, 400, { error: 'Không nhận ra mã video. Dán link YouTube hoặc mã 11 ký tự.' });
    const ch = b.channel ?? load().channels[0]?.id;
    try {
      const st = await yt.videoStatus(ch, id);
      if (!st.exists) return json(res, 400, { error: 'Không tìm thấy video này trên kênh đã kết nối.' });
      fs.mkdirSync(path.dirname(uploadedFile(m[1])), { recursive: true });
      fs.writeFileSync(uploadedFile(m[1]), JSON.stringify({ id, url: `https://youtu.be/${id}`, channel: ch, linked: true, at: new Date().toISOString() }, null, 2));
      ytCache.delete(m[1]);
      syncTopic(m[1], st);
      return json(res, 200, { ...st, channel: ch, linked: true });
    } catch (e) { return json(res, 400, { error: e.message }); }
  }
  if ((m = p.match(/^\/api\/videos\/([\w-]+)\/unlink$/)) && M === 'POST') {
    const f = uploadedFile(m[1]);
    if (fs.existsSync(f)) fs.renameSync(f, f + '.bak');
    ytCache.delete(m[1]);
    return json(res, 200, { ok: true });
  }

  // tác vụ
  // Xoá file render nặng của nhiều video một lúc: { slugs: [...] } → { freed, done: [...], skipped: [...] }
  if (p === '/api/videos/cleanup' && M === 'POST') {
    const b = await body(req);
    const slugs = [...new Set((Array.isArray(b.slugs) ? b.slugs : []).filter((x) => typeof x === 'string' && /^[\w-]+$/.test(x)))];
    if (!slugs.length) return json(res, 400, { error: 'Chưa chọn video nào' });
    const busy = new Set(jobs.filter((j) => j.status === 'queued' || j.status === 'running').map((j) => j.slug));
    let freed = 0; const done = [], skipped = [];
    for (const slug of slugs) {
      if (busy.has(slug)) { skipped.push({ slug, reason: 'đang trong hàng chờ render/upload' }); continue; }
      freed += cleanupVideo(slug); done.push(slug);
    }
    return json(res, 200, { freed, done, skipped });
  }
  if (p === '/api/jobs' && M === 'POST') {
    const b = await body(req);
    if (!fs.existsSync(path.join(ROOT, 'videos', path.basename(b.slug ?? ''), 'video.js'))) return json(res, 400, { error: 'Không có video' });
    if (b.type === 'upload' && !yt.isConnected(b.channel)) return json(res, 400, { error: 'Kênh chưa kết nối YouTube — vào mục Kênh để kết nối.' });
    try { const { args, ...j } = enqueue(b.type, path.basename(b.slug), b); return json(res, 200, j); } catch (e) { return json(res, 400, { error: e.message }); }
  }
  if ((m = p.match(/^\/api\/jobs\/(\w+)$/)) && M === 'GET') {
    const j = jobs.find((x) => x.id === m[1]);
    if (!j) return json(res, 404, { error: 'Không có tác vụ' });
    const { args, ...rest } = j;
    return json(res, 200, rest);
  }
  json(res, 404, { error: 'Không tìm thấy' });
}

if (!fs.existsSync(DATA)) throw new Error(`Thiếu ${DATA}`);
// Lỗi ngoài request (job, timer) chỉ ghi log — Studio không được chết giữa lúc đang tải video.
process.on('uncaughtException', (e) => console.error('! Lỗi chưa bắt (Studio vẫn chạy):', e));
process.on('unhandledRejection', (e) => console.error('! Promise lỗi chưa bắt (Studio vẫn chạy):', e));
http.createServer((req, res) => route(req, res).catch((e) => { console.error(e); json(res, 500, { error: e.message }); }))
  .listen(PORT, '127.0.0.1', () => {
    console.log(`› Studio: ${BASE}  (Ctrl+C để dừng)`);
    if (process.argv.includes('--open')) spawn('open', [BASE]);
  });
