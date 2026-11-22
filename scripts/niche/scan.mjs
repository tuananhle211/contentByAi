#!/usr/bin/env node
// Quét thị trường ngách trên YouTube Việt Nam.
//   node scripts/niche/scan.mjs <niches.json> [--per 2] [--budget 3000] [--label ten-dot-quet] [--channel ve-la-hieu]
//
// niches.json: [{ "id": "tai-chinh", "name": "Tài chính cá nhân", "seeds": ["lãi kép là gì", "lạm phát là gì", ...] }]
// Với mỗi ngách:
//   1. Gợi ý tìm kiếm YouTube (miễn phí) cho từng seed → đo độ rộng nhu cầu.
//   2. Tìm `--per` seed đầu qua YouTube Data API (100 đơn vị/lần) → top 25 video + số người đăng ký kênh.
//   3. Tính chỉ số cung–cầu, ghi output/research/<label>/data.json + report.md.
// Hạn mức API mặc định 10.000 đơn vị/ngày; `--budget` giới hạn mỗi lần chạy. Kết quả được cache 7 ngày ở .cache/yt/.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { ROOT, loadEnv } from '../lib.mjs';
import { accessToken } from '../youtube.mjs';

loadEnv();
const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const file = argv.find((a, i) => !a.startsWith('--') && !argv[i - 1]?.startsWith('--'));
if (!file) throw new Error('Thiếu file ngách. Ví dụ: node scripts/niche/scan.mjs research/niches.json');
const niches = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
const PER = +opt('per', 2);
const BUDGET = +opt('budget', 3000);
const label = opt('label', `${new Date().toISOString().slice(0, 10)}-${path.basename(file, '.json')}`);
const OUT = path.join(ROOT, 'output', 'research', label);
const CACHE = path.join(ROOT, '.cache', 'yt');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(CACHE, { recursive: true });

// ---------- nguồn dữ liệu ----------
const KEY = process.env.YOUTUBE_API_KEY;
const channel = opt('channel', fs.existsSync(path.join(ROOT, '.secrets', 'tokens')) ? fs.readdirSync(path.join(ROOT, '.secrets', 'tokens'))[0]?.replace(/\.json$/, '') : null);
if (!KEY && !channel) throw new Error('Cần YOUTUBE_API_KEY trong .env hoặc một kênh đã kết nối trong Studio.');
let units = 0;
const COST = { search: 100, videos: 1, channels: 1 };

async function yt(endpoint, params) {
  const qs = new URLSearchParams(params).toString();
  const cf = path.join(CACHE, crypto.createHash('sha1').update(`${endpoint}?${qs}`).digest('hex') + '.json');
  if (fs.existsSync(cf) && Date.now() - fs.statSync(cf).mtimeMs < 7 * 864e5) return JSON.parse(fs.readFileSync(cf, 'utf8'));
  if (units + COST[endpoint] > BUDGET) throw Object.assign(new Error('Hết ngân sách API cho lần chạy này'), { code: 'BUDGET' });
  const headers = KEY ? {} : { Authorization: `Bearer ${await accessToken(channel)}` };
  const res = await fetch(`https://www.googleapis.com/youtube/v3/${endpoint}?${qs}${KEY ? `&key=${KEY}` : ''}`, { headers });
  const j = await res.json();
  if (!res.ok) throw new Error(`YouTube API ${res.status}: ${j.error?.message}`);
  units += COST[endpoint];
  fs.writeFileSync(cf, JSON.stringify(j));
  return j;
}

async function suggest(q) {
  const cf = path.join(CACHE, 'ac-' + crypto.createHash('sha1').update(q).digest('hex') + '.json');
  if (fs.existsSync(cf) && Date.now() - fs.statSync(cf).mtimeMs < 7 * 864e5) return JSON.parse(fs.readFileSync(cf, 'utf8'));
  const r = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=vi&gl=VN&q=${encodeURIComponent(q)}`);
  const list = r.ok ? (await r.json())[1] ?? [] : [];
  fs.writeFileSync(cf, JSON.stringify(list));
  return list;
}

const isoDur = (s) => { const m = s?.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/); return m ? (+m[1] || 0) * 86400 + (+m[2] || 0) * 3600 + (+m[3] || 0) * 60 + (+m[4] || 0) : 0; };
const median = (a) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const fmt = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(n >= 1e4 ? 0 : 1)}K` : String(Math.round(n)));

async function searchQuery(q) {
  const s = await yt('search', { part: 'snippet', type: 'video', maxResults: 25, regionCode: 'VN', relevanceLanguage: 'vi', q });
  const ids = s.items.map((i) => i.id.videoId).filter(Boolean);
  if (!ids.length) return [];
  const v = await yt('videos', { part: 'statistics,contentDetails,snippet', id: ids.join(',') });
  const chIds = [...new Set(v.items.map((x) => x.snippet.channelId))];
  const c = await yt('channels', { part: 'statistics', id: chIds.join(',') });
  const subs = new Map(c.items.map((x) => [x.id, x.statistics.hiddenSubscriberCount ? null : +x.statistics.subscriberCount]));
  return v.items.map((x) => ({
    id: x.id, title: x.snippet.title, channel: x.snippet.channelTitle, channelId: x.snippet.channelId,
    subs: subs.get(x.snippet.channelId) ?? null, views: +(x.statistics.viewCount ?? 0),
    ageDays: Math.max(1, (Date.now() - new Date(x.snippet.publishedAt)) / 864e5), duration: isoDur(x.contentDetails.duration),
  }));
}

// Chỉ số cho một danh sách kết quả tìm kiếm.
function metrics(vids) {
  const views = vids.map((v) => v.views);
  const known = vids.filter((v) => v.subs != null);
  const smallWins = vids.filter((v) => v.subs != null && v.subs <= 30_000 && v.views >= 30_000);
  return {
    n: vids.length,
    medianViews: median(views),
    medianViewsPerDay: median(vids.map((v) => v.views / v.ageDays)),
    recentStrong: vids.filter((v) => v.ageDays <= 365 && v.views >= 20_000).length,
    smallWins: smallWins.length,
    outlier: median(known.map((v) => v.views / Math.max(v.subs, 1000))),
    bigShare: known.length ? known.filter((v) => v.subs >= 1_000_000).length / known.length : 0,
    channels: new Set(vids.map((v) => v.channelId)).size,
    medianAgeDays: median(vids.map((v) => v.ageDays)),
    shortsShare: vids.length ? vids.filter((v) => v.duration <= 60).length / vids.length : 0,
    medianDurationMin: median(vids.map((v) => v.duration)) / 60,
  };
}
// Điểm cơ hội (chỉ để XẾP HẠNG, không phải dự báo view):
//   cầu cao (median view/ngày) + kênh nhỏ vẫn thắng + video top đã cũ (chưa ai làm mới) − kênh lớn chiếm top.
function score(m) {
  return Math.round(
    Math.log10(m.medianViewsPerDay + 1) * 20 +
    Math.min(m.smallWins, 10) * 3 +
    Math.min(m.outlier, 20) * 1.5 +
    Math.min(m.medianAgeDays / 365, 4) * 3 -
    m.bigShare * 25,
  );
}

const results = [];
for (const n of niches) {
  process.stdout.write(`› ${n.name}: gợi ý tìm kiếm…`);
  const suggestions = new Set();
  for (const s of n.seeds) for (const x of await suggest(s)) suggestions.add(x);
  const queries = [];
  try {
    for (const q of n.seeds.slice(0, PER)) {
      process.stdout.write(` tìm "${q}"…`);
      const vids = await searchQuery(q);
      queries.push({ q, metrics: metrics(vids), videos: vids.sort((a, b) => b.views - a.views) });
    }
  } catch (e) {
    if (e.code !== 'BUDGET') throw e;
    console.log(`\n  ! ${e.message} (đã dùng ${units} đơn vị)`);
  }
  const all = queries.flatMap((q) => q.videos);
  const m = all.length ? metrics(all) : null;
  results.push({ ...n, suggestions: [...suggestions], queries, metrics: m, score: m ? score(m) : null });
  console.log(m ? ` điểm ${score(m)}` : ' (chưa quét API)');
}
results.sort((a, b) => (b.score ?? -1e9) - (a.score ?? -1e9));
fs.writeFileSync(path.join(OUT, 'data.json'), JSON.stringify({ at: new Date().toISOString(), units, results }, null, 2));

// ---------- báo cáo ----------
const L = [];
L.push(`# Quét ngách — ${label}`, '', `Dữ liệu: YouTube VN (regionCode=VN, tiếng Việt), top 25 kết quả cho ${PER} truy vấn/ngách · dùng ${units} đơn vị API.`, '');
L.push('| # | Ngách | Điểm | View TB/ngày | View TB | Kênh nhỏ thắng | View/sub | Kênh >1M | Tuổi top (năm) | Shorts | Gợi ý tìm kiếm |', '|---|---|---|---|---|---|---|---|---|---|---|');
results.forEach((r, i) => {
  const m = r.metrics;
  L.push(m
    ? `| ${i + 1} | ${r.name} | **${r.score}** | ${fmt(m.medianViewsPerDay)} | ${fmt(m.medianViews)} | ${m.smallWins} | ${m.outlier.toFixed(1)} | ${Math.round(m.bigShare * 100)}% | ${(m.medianAgeDays / 365).toFixed(1)} | ${Math.round(m.shortsShare * 100)}% | ${r.suggestions.length} |`
    : `| ${i + 1} | ${r.name} | — | | | | | | | | ${r.suggestions.length} |`);
});
L.push('', '**Cách đọc:** *Kênh nhỏ thắng* = số video từ kênh ≤30K sub đạt ≥30K view (cao = cửa cho kênh mới). *View/sub* = trung vị lượt xem chia số sub (>1 = thuật toán đẩy nội dung, không phụ thuộc fan). *Kênh >1M* = tỉ lệ top bị kênh lớn chiếm. *Tuổi top* cao = video đầu bảng đã cũ, ít người làm mới.', '');
for (const r of results) {
  L.push(`## ${r.name}${r.score != null ? ` — điểm ${r.score}` : ''}`, '');
  if (r.suggestions.length) L.push(`Người xem đang gõ: ${r.suggestions.slice(0, 12).map((s) => `“${s}”`).join(', ')}`, '');
  for (const q of r.queries) {
    L.push(`**“${q.q}”** — view TB ${fmt(q.metrics.medianViews)}, kênh nhỏ thắng ${q.metrics.smallWins}, kênh >1M ${Math.round(q.metrics.bigShare * 100)}%`, '');
    L.push('| Video | Kênh | Sub | View | Tuổi |', '|---|---|---|---|---|');
    for (const v of q.videos.slice(0, 6)) L.push(`| ${v.title.replace(/\|/g, '/')} | ${v.channel.replace(/\|/g, '/')} | ${v.subs == null ? 'ẩn' : fmt(v.subs)} | ${fmt(v.views)} | ${v.ageDays < 365 ? `${Math.round(v.ageDays / 30)} th` : `${(v.ageDays / 365).toFixed(1)} n`} |`);
    L.push('');
  }
}
fs.writeFileSync(path.join(OUT, 'report.md'), L.join('\n'));
console.log(`› Đã dùng ${units} đơn vị API · báo cáo: ${path.relative(ROOT, OUT)}/report.md`);
