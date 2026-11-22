// Kết nối YouTube dùng chung cho upload.mjs và Studio: OAuth theo từng kênh + đọc thống kê.
// Token lưu ở .secrets/tokens/<kênh>.json.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { ROOT, loadEnv } from './lib.mjs';

loadEnv();
const SECRETS = path.join(ROOT, '.secrets');
export const SCOPES = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube.force-ssl',
  'https://www.googleapis.com/auth/yt-analytics.readonly',
];

export function clientConfig() {
  const f = path.join(SECRETS, 'client_secret.json');
  if (!fs.existsSync(f)) throw new Error('Thiếu .secrets/client_secret.json — xem README mục "Đăng lên YouTube".');
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  return j.installed ?? j.web;
}
export const hasClient = () => fs.existsSync(path.join(SECRETS, 'client_secret.json'));

const tokenFile = (channel) => path.join(SECRETS, 'tokens', `${channel}.json`);
export const isConnected = (channel) => fs.existsSync(tokenFile(channel));
export function disconnect(channel) { fs.rmSync(tokenFile(channel), { force: true }); }

async function tokenRequest(params) {
  const res = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body: new URLSearchParams(params) });
  const j = await res.json();
  if (!res.ok) throw new Error(`OAuth lỗi: ${j.error_description ?? j.error ?? res.status}`);
  return j;
}

// Bước 1 đăng nhập: tạo URL. redirect phải là http://127.0.0.1:<port> (OAuth client loại Desktop app).
const pending = new Map();
export function authUrl(channel, redirect) {
  const cfg = clientConfig();
  const verifier = crypto.randomBytes(32).toString('base64url');
  const state = crypto.randomBytes(12).toString('hex');
  pending.set(state, { channel, verifier, redirect });
  return `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
    client_id: cfg.client_id, redirect_uri: redirect, response_type: 'code', scope: SCOPES.join(' '), state,
    access_type: 'offline', prompt: 'consent select_account',
    code_challenge: crypto.createHash('sha256').update(verifier).digest('base64url'), code_challenge_method: 'S256',
  })}`;
}

// Bước 2: đổi code lấy token, lưu theo kênh. Trả về id kênh.
export async function finishAuth(code, state) {
  const p = pending.get(state);
  if (!p) throw new Error('Phiên đăng nhập không hợp lệ hoặc đã hết hạn — thử lại.');
  pending.delete(state);
  const cfg = clientConfig();
  const r = await tokenRequest({ client_id: cfg.client_id, client_secret: cfg.client_secret, code, code_verifier: p.verifier, redirect_uri: p.redirect, grant_type: 'authorization_code' });
  fs.mkdirSync(path.dirname(tokenFile(p.channel)), { recursive: true });
  fs.writeFileSync(tokenFile(p.channel), JSON.stringify({ refresh_token: r.refresh_token, access_token: r.access_token, expires_at: Date.now() + r.expires_in * 1000, scope: r.scope }, null, 2));
  return p.channel;
}

export async function accessToken(channel) {
  const f = tokenFile(channel);
  if (!fs.existsSync(f)) throw Object.assign(new Error(`Kênh "${channel}" chưa kết nối YouTube.`), { code: 'NOT_CONNECTED' });
  let tok = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (tok.access_token && tok.expires_at > Date.now() + 60_000) return tok.access_token;
  const cfg = clientConfig();
  try {
    const r = await tokenRequest({ client_id: cfg.client_id, client_secret: cfg.client_secret, refresh_token: tok.refresh_token, grant_type: 'refresh_token' });
    tok = { ...tok, access_token: r.access_token, expires_at: Date.now() + r.expires_in * 1000 };
  } catch (e) {
    // refresh token hết hạn (project Google ở chế độ Testing: 7 ngày) → phải đăng nhập lại
    disconnect(channel);
    throw Object.assign(new Error(`Phiên đăng nhập kênh "${channel}" đã hết hạn — kết nối lại. (${e.message})`), { code: 'NOT_CONNECTED' });
  }
  fs.writeFileSync(f, JSON.stringify(tok, null, 2));
  return tok.access_token;
}

export async function api(url, init = {}, token) {
  const res = await fetch(url, { ...init, headers: { ...(token && { Authorization: `Bearer ${token}` }), ...init.headers } });
  if (!res.ok) {
    let msg = await res.text();
    try { msg = JSON.parse(msg).error?.message ?? msg; } catch {}
    throw new Error(`YouTube API ${res.status}: ${msg}`);
  }
  return res;
}
const get = async (url, token) => (await api(url, {}, token)).json();
const YT = 'https://www.googleapis.com/youtube/v3';

// ---------- thống kê ----------
const ymd = (d) => d.toISOString().slice(0, 10);

async function videosOf(uploadsPlaylist, auth) {
  const ids = [];
  let page = '';
  do {
    const j = await get(`${YT}/playlistItems?part=contentDetails&maxResults=50&playlistId=${uploadsPlaylist}${page && `&pageToken=${page}`}${auth.key}`, auth.token);
    ids.push(...j.items.map((i) => i.contentDetails.videoId));
    page = j.nextPageToken ?? '';
  } while (page && ids.length < 200);
  const out = [];
  for (let i = 0; i < ids.length; i += 50) {
    const j = await get(`${YT}/videos?part=snippet,statistics,contentDetails,status&id=${ids.slice(i, i + 50).join(',')}${auth.key}`, auth.token);
    for (const v of j.items) {
      out.push({
        id: v.id, title: v.snippet.title, publishedAt: v.snippet.publishedAt,
        thumb: v.snippet.thumbnails?.medium?.url, duration: v.contentDetails.duration,
        privacy: v.status?.privacyStatus, publishAt: v.status?.publishAt,
        views: +(v.statistics.viewCount ?? 0), likes: +(v.statistics.likeCount ?? 0), comments: +(v.statistics.commentCount ?? 0),
      });
    }
  }
  return out;
}

// Đầy đủ (OAuth): số liệu kênh + danh sách video + lượt xem theo ngày (YouTube Analytics API).
export async function channelReport(channel, days = 28) {
  const token = await accessToken(channel);
  const auth = { token, key: '' };
  const ch = (await get(`${YT}/channels?part=snippet,statistics,contentDetails&mine=true`, token)).items?.[0];
  if (!ch) throw new Error('Tài khoản Google này chưa có kênh YouTube.');
  const report = {
    source: 'oauth',
    channel: {
      id: ch.id, title: ch.snippet.title, handle: ch.snippet.customUrl, thumb: ch.snippet.thumbnails?.default?.url,
      subscribers: +(ch.statistics.subscriberCount ?? 0), views: +(ch.statistics.viewCount ?? 0), videoCount: +(ch.statistics.videoCount ?? 0),
      hiddenSubs: ch.statistics.hiddenSubscriberCount,
    },
    videos: await videosOf(ch.contentDetails.relatedPlaylists.uploads, auth),
  };
  // Analytics trễ ~2 ngày; lấy `days` ngày kết thúc hôm qua.
  const end = new Date(Date.now() - 864e5), start = new Date(end.getTime() - (days - 1) * 864e5);
  try {
    const a = await get(`https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==MINE&startDate=${ymd(start)}&endDate=${ymd(end)}&metrics=views,estimatedMinutesWatched,subscribersGained,subscribersLost&dimensions=day&sort=day`, token);
    const rows = new Map((a.rows ?? []).map((r) => [r[0], r]));
    report.daily = [];
    for (let d = new Date(start); d <= end; d = new Date(d.getTime() + 864e5)) {
      const r = rows.get(ymd(d));
      report.daily.push({ date: ymd(d), views: r?.[1] ?? 0, minutes: r?.[2] ?? 0, subsGained: r?.[3] ?? 0, subsLost: r?.[4] ?? 0 });
    }
  } catch (e) {
    report.analyticsError = e.message;
  }
  return report;
}

// Công khai (chỉ cần YOUTUBE_API_KEY + handle): không có số liệu theo ngày.
export async function publicReport(handle) {
  const key = process.env.YOUTUBE_API_KEY;
  const auth = { token: null, key: `&key=${key}` };
  const ch = (await get(`${YT}/channels?part=snippet,statistics,contentDetails&forHandle=${encodeURIComponent(handle.replace(/^@/, ''))}${auth.key}`)).items?.[0];
  if (!ch) throw new Error(`Không tìm thấy kênh ${handle}`);
  return {
    source: 'public',
    channel: {
      id: ch.id, title: ch.snippet.title, handle: ch.snippet.customUrl, thumb: ch.snippet.thumbnails?.default?.url,
      subscribers: +(ch.statistics.subscriberCount ?? 0), views: +(ch.statistics.viewCount ?? 0), videoCount: +(ch.statistics.videoCount ?? 0),
    },
    videos: await videosOf(ch.contentDetails.relatedPlaylists.uploads, auth),
  };
}

// ---------- trạng thái & lịch đăng của một video ----------
export function parseVideoId(s) {
  const m = String(s).trim().match(/(?:youtu\.be\/|v=|\/video\/|\/shorts\/|^)([\w-]{11})(?:[?&/#]|$)/);
  return m ? m[1] : null;
}

export async function videoStatus(channel, id) {
  const token = await accessToken(channel);
  const v = (await get(`${YT}/videos?part=status,statistics,snippet,processingDetails&id=${id}`, token)).items?.[0];
  if (!v) return { exists: false, id };
  return {
    exists: true, id, url: `https://youtu.be/${id}`, title: v.snippet.title, publishedAt: v.snippet.publishedAt,
    thumb: v.snippet.thumbnails?.medium?.url,
    privacy: v.status.privacyStatus, publishAt: v.status.publishAt ?? null,
    uploadStatus: v.status.uploadStatus, failure: v.status.failureReason ?? v.status.rejectionReason ?? null,
    processing: v.processingDetails?.processingStatus ?? null,
    views: +(v.statistics?.viewCount ?? 0), likes: +(v.statistics?.likeCount ?? 0), comments: +(v.statistics?.commentCount ?? 0),
  };
}

// mode: 'public' | 'unlisted' | 'private' | 'schedule' (cần publishAt). Trả về trạng thái mới + cờ locked nếu YouTube giữ nguyên riêng tư.
export async function setVideoStatus(channel, id, { mode, publishAt }) {
  const token = await accessToken(channel);
  const status = { privacyStatus: mode === 'schedule' ? 'private' : mode, selfDeclaredMadeForKids: false, embeddable: true, publicStatsViewable: true, license: 'youtube' };
  if (mode === 'schedule') {
    const at = new Date(publishAt);
    if (!(at > new Date(Date.now() + 10 * 60_000))) throw new Error('Giờ hẹn phải sau thời điểm hiện tại ít nhất 10 phút.');
    status.publishAt = at.toISOString();
  }
  try {
    await api(`${YT}/videos?part=status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) }, token);
  } catch (e) {
    if (/publishAt/i.test(e.message)) throw new Error('YouTube không cho hẹn giờ video này (video đã từng công khai, hoặc giờ hẹn không hợp lệ).');
    throw e;
  }
  const after = await videoStatus(channel, id);
  after.locked = (mode === 'public' || mode === 'unlisted') && after.privacy === 'private';
  return after;
}
