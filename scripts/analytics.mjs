#!/usr/bin/env node
// Phân tích hành vi người xem (YouTube Analytics) cho các video đã đăng của một kênh.
// Đường giữ chân được ánh xạ vào từng cảnh / câu thoại / chương của kịch bản (output/<slug>/timing.json).
//   node scripts/analytics.mjs [kênh=ve-la-hieu]      → channel/research/<ngày>-hanh-vi-<kênh>.md + output/analytics/<kênh>.json
// Lưu ý: YouTube cần 24–72 giờ mới có số liệu chi tiết (giữ chân, nguồn traffic) cho video mới đăng.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT } from './lib.mjs';
import * as yt from './youtube.mjs';

const A = 'https://youtubeanalytics.googleapis.com/v2/reports';
const ymd = (d) => new Date(d).toISOString().slice(0, 10);
const readJson = (f) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return null; } };
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const pct = (x) => (x == null ? '—' : `${Math.round(x * 100)}%`);

async function query(token, params) {
  const res = await fetch(`${A}?${new URLSearchParams({ ids: 'channel==MINE', ...params })}`, { headers: { Authorization: `Bearer ${token}` } });
  const j = await res.json();
  if (!res.ok) throw new Error(j.error?.message ?? `Analytics ${res.status}`);
  const cols = (j.columnHeaders ?? []).map((c) => c.name);
  return (j.rows ?? []).map((r) => Object.fromEntries(r.map((v, i) => [cols[i], v])));
}
const safe = (p) => p.catch((e) => ({ error: e.message }));
export const TRAFFIC = { YT_SEARCH: 'Tìm kiếm YouTube', RELATED_VIDEO: 'Video đề xuất', SUBSCRIBER: 'Trang chủ / người đăng ký', YT_OTHER_PAGE: 'Trang YouTube khác', SHORTS: 'Shorts', YT_CHANNEL: 'Trang kênh', PLAYLIST: 'Danh sách phát', EXT_URL: 'Link bên ngoài', NO_LINK_OTHER: 'Trực tiếp / không rõ', NOTIFICATION: 'Thông báo', END_SCREEN: 'Màn hình kết thúc', ANNOTATION: 'Thẻ', CAMPAIGN_CARD: 'Thẻ', HASHTAGS: 'Hashtag', SOUND_PAGE: 'Trang âm thanh', YT_PLAYLIST_PAGE: 'Trang danh sách phát', LIVE_REDIRECT: 'Chuyển từ live' };

// Câu thoại đang đọc tại giây t (theo phụ đề).
function lineAt(timing, t) {
  const c = timing.captions.find((x) => t >= x.start && t < x.end) ?? timing.captions.reduce((a, b) => (Math.abs(b.start - t) < Math.abs(a.start - t) ? b : a));
  return c.words.map((w) => w.text).join(' ');
}
const sceneAt = (timing, t) => Math.max(0, timing.scenes.findIndex((s) => t < s.start + s.dur));
function chaptersOf(slug) {
  const desc = readJson(path.join(ROOT, 'output', slug, 'youtube.json'))?.description ?? '';
  return [...desc.matchAll(/^(\d+):(\d\d) (.+)$/gm)].map((m) => ({ t: +m[1] * 60 + +m[2], name: m[3] }));
}
// Nội suy tỉ lệ còn xem tại giây t.
function watchAt(points, t) {
  const i = points.findIndex((p) => p.t >= t);
  if (i <= 0) return points[Math.max(0, i)]?.w ?? null;
  const a = points[i - 1], b = points[i];
  return a.w + ((b.w - a.w) * (t - a.t)) / (b.t - a.t || 1);
}

export async function videoReport(channel, slug) {
  const up = readJson(path.join(ROOT, 'output', slug, 'uploaded.json'));
  if (!up) return { slug, error: 'Chưa đăng / chưa liên kết YouTube' };
  const token = await yt.accessToken(channel);
  const st = await yt.videoStatus(channel, up.id);
  const timing = readJson(path.join(ROOT, 'output', slug, 'timing.json'));
  const v = `video==${up.id}`;
  const range = { startDate: ymd(st.publishedAt ?? Date.now() - 30 * 864e5), endDate: ymd(Date.now()) };
  const [basic, ret, traffic, search, related, device, demo] = await Promise.all([
    safe(query(token, { ...range, metrics: 'views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained,likes,comments,shares', filters: v })),
    safe(query(token, { ...range, dimensions: 'elapsedVideoTimeRatio', metrics: 'audienceWatchRatio,relativeRetentionPerformance', filters: v })),
    safe(query(token, { ...range, dimensions: 'insightTrafficSourceType', metrics: 'views,estimatedMinutesWatched', filters: v, sort: '-views' })),
    safe(query(token, { ...range, dimensions: 'insightTrafficSourceDetail', metrics: 'views', filters: `${v};insightTrafficSourceType==YT_SEARCH`, sort: '-views', maxResults: '15' })),
    safe(query(token, { ...range, dimensions: 'insightTrafficSourceDetail', metrics: 'views', filters: `${v};insightTrafficSourceType==RELATED_VIDEO`, sort: '-views', maxResults: '10' })),
    safe(query(token, { ...range, dimensions: 'deviceType', metrics: 'views', filters: v, sort: '-views' })),
    safe(query(token, { ...range, dimensions: 'ageGroup,gender', metrics: 'viewerPercentage', filters: v })),
  ]);
  const r = { slug, id: up.id, title: st.title, privacy: st.privacy, publishedAt: st.publishedAt, live: { views: st.views, likes: st.likes, comments: st.comments } };
  r.basic = Array.isArray(basic) ? basic[0] ?? null : null;
  r.traffic = Array.isArray(traffic) ? traffic.map((x) => ({ ...x, label: TRAFFIC[x.insightTrafficSourceType] ?? x.insightTrafficSourceType })) : [];
  r.search = Array.isArray(search) ? search : [];
  r.related = Array.isArray(related) ? related : [];
  r.device = Array.isArray(device) ? device : [];
  r.demo = Array.isArray(demo) ? demo : [];
  r.hasData = !!(r.basic && r.basic.views > 0);
  if (Array.isArray(ret) && ret.length && timing) {
    const dur = timing.total;
    r.duration = dur;
    r.points = ret.map((x) => {
      const t = x.elapsedVideoTimeRatio * dur;
      return { r: x.elapsedVideoTimeRatio, t, w: x.audienceWatchRatio, rel: x.relativeRetentionPerformance, scene: sceneAt(timing, t) + 1, line: lineAt(timing, t) };
    });
    const P = r.points;
    r.check = { s30: watchAt(P, 30), s60: watchAt(P, 60), half: watchAt(P, dur / 2), end: watchAt(P, dur * 0.95) };
    r.relAvg = P.reduce((a, p) => a + p.rel, 0) / P.length;
    const steps = P.slice(1).map((p, i) => ({ ...p, d: P[i].w - p.w }));
    // điểm rơi mạnh nhất, cách nhau ≥ 20 giây (gộp các điểm sát nhau)
    r.drops = [];
    for (const p of steps.filter((x) => x.t > 3).sort((a, b) => b.d - a.d)) if (r.drops.length < 5 && r.drops.every((q) => Math.abs(q.t - p.t) >= 20)) r.drops.push(p);
    r.spikes = steps.filter((p) => p.d < -0.01).sort((a, b) => a.d - b.d).slice(0, 3);
    const ch = chaptersOf(slug);
    r.chapters = ch.map((c, i) => {
      const end = ch[i + 1]?.t ?? dur;
      const a = watchAt(P, Math.max(c.t, 1)), b = watchAt(P, end - 1);
      return { name: c.name, start: c.t, end, from: a, to: b, lossPerMin: a != null && b != null ? (a - b) / ((end - c.t) / 60) : null };
    });
  }
  return r;
}

// Gợi ý điều chỉnh rút ra từ số liệu (ngưỡng kinh nghiệm cho video giáo dục/kể chuyện dài).
export function advice(r) {
  const out = [];
  if (!r.hasData) return ['Chưa đủ dữ liệu — chờ YouTube xử lý (24–72 giờ sau khi đăng) rồi chạy lại.'];
  const c = r.check;
  if (c) {
    if (c.s30 < 0.55) out.push(`Hook yếu: chỉ còn ${pct(c.s30)} người xem sau 30 giây. Rút ngắn mở đầu, vào thẳng câu hỏi/cảnh gây tò mò trong 5 giây đầu; bỏ phần chào/giới thiệu series ra sau phút 1.`);
    else if (c.s30 >= 0.7) out.push(`Hook tốt (${pct(c.s30)} còn xem sau 30 giây) — giữ công thức mở đầu này.`);
    const worst = (r.chapters ?? []).filter((x) => x.lossPerMin != null).sort((a, b) => b.lossPerMin - a.lossPerMin)[0];
    if (worst) out.push(`Chương tụt nhanh nhất: "${worst.name}" (mất ${pct(worst.lossPerMin)} người xem mỗi phút). Rút gọn hoặc thêm hình/đùa/cú twist ở chương kiểu này.`);
    for (const d of r.drops.slice(0, 3)) if (d.d > 0.03) out.push(`Rơi mạnh ở ${mmss(d.t)} (cảnh ${d.scene}): "${d.line}…" — xem lại cảnh này (chuyển cảnh chậm? lời dài? hết tò mò?).`);
    for (const s of r.spikes) out.push(`Người xem tua lại ở ${mmss(s.t)} (cảnh ${s.scene}): "${s.line}…" — chi tiết hấp dẫn, nên làm thêm nội dung/Shorts kiểu này.`);
    if (r.relAvg != null) out.push(`So với video cùng độ dài trên YouTube: giữ chân ${r.relAvg >= 0.5 ? 'ngang/hơn' : 'kém hơn'} mức trung bình (chỉ số ${r.relAvg.toFixed(2)}, 0.5 = trung bình).`);
  }
  const tot = r.traffic.reduce((a, x) => a + x.views, 0) || 1;
  const share = (k) => (r.traffic.find((x) => x.insightTrafficSourceType === k)?.views ?? 0) / tot;
  if (share('YT_SEARCH') > 0.4) out.push(`Tìm kiếm chiếm ${pct(share('YT_SEARCH'))} lượt xem — tiêu đề/mô tả chứa đúng cụm người xem gõ là đòn bẩy chính.`);
  if (share('RELATED_VIDEO') + share('SUBSCRIBER') + share('YT_OTHER_PAGE') > 0.4) out.push('Đề xuất/trang chủ đang đẩy video — thumbnail + 30 giây đầu quyết định; thử "Test & compare" thumbnail.');
  if (share('SHORTS') > 0.15) out.push(`Shorts kéo ${pct(share('SHORTS'))} lượt xem về video này — tiếp tục cắt Shorts từ mỗi tập.`);
  if (r.basic?.subscribersGained != null && r.basic.views > 50) out.push(`${r.basic.subscribersGained} người đăng ký mới / ${r.basic.views} lượt xem (${((r.basic.subscribersGained / r.basic.views) * 100).toFixed(1)}%).`);
  return out;
}

function mdVideo(r) {
  const L = [`## ${r.title}`, '', `Đăng ${r.publishedAt?.slice(0, 10) ?? '?'} · https://youtu.be/${r.id} · hiện ${r.live.views} lượt xem, ${r.live.likes} thích, ${r.live.comments} bình luận`, ''];
  if (!r.hasData) return [...L, '_Chưa có số liệu Analytics (YouTube cần 24–72 giờ)._', ''].join('\n');
  const b = r.basic;
  L.push('| Lượt xem | Phút xem | TB xem | % TB | Sub mới | Thích | Chia sẻ |', '|---|---|---|---|---|---|---|',
    `| ${b.views} | ${Math.round(b.estimatedMinutesWatched)} | ${mmss(b.averageViewDuration)} | ${b.averageViewPercentage.toFixed(0)}% | ${b.subscribersGained} | ${b.likes} | ${b.shares} |`, '');
  if (r.check) {
    L.push(`**Giữ chân:** 30s ${pct(r.check.s30)} · 1 phút ${pct(r.check.s60)} · giữa video ${pct(r.check.half)} · cuối ${pct(r.check.end)}`, '');
    if (r.chapters?.length) L.push('| Chương | Bắt đầu | Còn xem đầu → cuối chương | Mất/phút |', '|---|---|---|---|', ...r.chapters.map((c) => `| ${c.name} | ${mmss(c.start)} | ${pct(c.from)} → ${pct(c.to)} | ${pct(c.lossPerMin)} |`), '');
    L.push('**Rơi mạnh nhất:**', ...r.drops.map((d) => `- ${mmss(d.t)} · cảnh ${d.scene} · −${pct(d.d)} · "${d.line}"`), '');
    if (r.spikes.length) L.push('**Tua lại xem (đoạn hấp dẫn):**', ...r.spikes.map((d) => `- ${mmss(d.t)} · cảnh ${d.scene} · "${d.line}"`), '');
  }
  if (r.traffic.length) L.push('**Nguồn:** ' + r.traffic.map((x) => `${x.label} ${x.views}`).join(' · '), '');
  if (r.search.length) L.push('**Từ khoá tìm kiếm:** ' + r.search.map((x) => `"${x.insightTrafficSourceDetail}" (${x.views})`).join(', '), '');
  if (r.device.length) L.push('**Thiết bị:** ' + r.device.map((x) => `${x.deviceType} ${x.views}`).join(' · '), '');
  if (r.demo.length) L.push('**Khán giả:** ' + r.demo.filter((x) => x.viewerPercentage >= 3).map((x) => `${x.gender === 'female' ? 'nữ' : x.gender === 'male' ? 'nam' : x.gender} ${x.ageGroup.replace('age', '')} ${x.viewerPercentage.toFixed(0)}%`).join(' · '), '');
  L.push('**Gợi ý:**', ...advice(r).map((a) => `- ${a}`), '');
  return L.join('\n');
}

export async function channelReport(channel) {
  const slugs = fs.readdirSync(path.join(ROOT, 'output')).filter((s) => readJson(path.join(ROOT, 'output', s, 'uploaded.json'))?.channel === channel).sort();
  const videos = [];
  for (const s of slugs) videos.push(await videoReport(channel, s).catch((e) => ({ slug: s, error: e.message })));
  return { channel, at: new Date().toISOString(), videos };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const channel = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 've-la-hieu';
  const rep = await channelReport(channel);
  fs.mkdirSync(path.join(ROOT, 'output', 'analytics'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'output', 'analytics', `${channel}.json`), JSON.stringify(rep, null, 2));
  const ok = rep.videos.filter((v) => !v.error);
  const md = [`# Hành vi người xem — ${channel} — ${ymd(Date.now())}`, '',
    '| Video | Lượt xem | % TB xem | Còn xem sau 30s | Sub mới |', '|---|---|---|---|---|',
    ...ok.map((v) => `| ${v.title} | ${v.basic?.views ?? v.live.views} | ${v.basic?.averageViewPercentage ? v.basic.averageViewPercentage.toFixed(0) + '%' : '—'} | ${pct(v.check?.s30)} | ${v.basic?.subscribersGained ?? '—'} |`), '',
    ...ok.map(mdVideo), ...rep.videos.filter((v) => v.error).map((v) => `- ${v.slug}: ${v.error}`)].join('\n');
  const f = path.join(ROOT, 'channel', 'research', `${ymd(Date.now())}-hanh-vi-${channel}.md`);
  fs.writeFileSync(f, md);
  console.log(md);
  console.log(`\n› Báo cáo: ${path.relative(ROOT, f)}`);
}
