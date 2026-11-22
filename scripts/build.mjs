#!/usr/bin/env node
// Dựng video từ videos/<slug>/video.js:
//   lời thoại → giọng đọc (Edge TTS / ElevenLabs / OmniVoice server) → dòng thời gian → render hoạt hình → MP4 + thumbnail + phụ đề + mô tả.
//
//   node scripts/build.mjs <slug>              dựng toàn bộ
//   node scripts/build.mjs <slug> --stills     chỉ xuất ảnh tĩnh mỗi cảnh (xem nhanh bố cục)
//   node scripts/build.mjs <slug> --preview    tạo giọng + mở trình xem trước trên trình duyệt
//   tuỳ chọn: --fps 30  --workers 4  --stills 3.5,10,42 (giây cụ thể)
//   --cool (hoặc RENDER_COOL=1 trong .env): render mát máy — chạy ưu tiên nền (macOS dồn sang nhân tiết kiệm điện),
//          2 tab Chromium, nén bằng chip phần cứng (h264_videotoolbox). Chậm hơn ~2–3 lần, Mac ít nóng hơn hẳn. --no-cool để tắt.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { once } from 'node:events';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';
import { ROOT, loadEnv, run, duration, serve, resolveVideo, fmtTime } from './lib.mjs';
import { renderTrack, toPcm16, SR } from './sfx.mjs';
import { speakVi, regroupWords } from './vi-so.mjs';

loadEnv();
const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
// Chế độ mát: chạy lại chính script này dưới `taskpolicy -b` (QoS nền: nhân tiết kiệm điện + giới hạn I/O); Chromium/ffmpeg con thừa hưởng.
const COOL = !flag('no-cool') && (flag('cool') || process.env.RENDER_COOL === '1');
if (COOL && process.platform === 'darwin' && !process.env.__BUILD_COOL_CHILD) {
  const child = spawn('taskpolicy', ['-b', process.execPath, ...process.argv.slice(1)], { stdio: 'inherit', env: { ...process.env, __BUILD_COOL_CHILD: '1' } });
  const [code] = await once(child, 'exit');
  process.exit(code ?? 1);
}
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : def; };
const { slug, out } = resolveVideo(argv.find((a) => !a.startsWith('--') && !/^[\d.,]+$/.test(a)));
const FPS = +opt('fps', 30);
const WORKERS = +opt('workers', COOL ? 2 : Math.max(2, Math.min(6, Math.floor(os.cpus().length / 2))));
// Bộ nén: chế độ mát dùng chip phần cứng của Mac (gần như không tốn CPU); bình thường x264 trên CPU.
// Tập có clip video thật (credits.json type 'clip'): hình quay thật khó nén hơn hình vẽ phẳng → bộ nén phần cứng chất lượng cao hơn.
const HAS_CLIPS = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'videos', slug, 'assets', 'credits.json'), 'utf8')).some((c) => c.type === 'clip'); } catch { return false; } })();
const VT_Q = +(process.env.RENDER_VT_Q ?? (HAS_CLIPS ? 75 : 65));
const ENCODER = COOL && process.platform === 'darwin' ? ['-c:v', 'h264_videotoolbox', '-q:v', String(VT_Q)] : ['-c:v', 'libx264', '-preset', 'medium', '-crf', '18'];
const CACHE = path.join(ROOT, '.cache', 'tts');
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(out, { recursive: true });

const log = (...a) => console.log('›', ...a);
if (COOL) log(`Chế độ mát: ưu tiên nền · ${WORKERS} tab · nén bằng chip phần cứng`);

// ---------- 1. đọc kịch bản (qua trình duyệt để video.js được import module của engine) ----------
const { server, url: BASE } = await serve();
// meta.gpu: true → Chromium dùng GPU thật (Metal) cho WebGL/3D (engine/gl3d.js) và canvas; mặc định giả lập CPU.
const GPU = /\bgpu:\s*true\b/.test(fs.readFileSync(path.join(ROOT, 'videos', slug, 'video.js'), 'utf8'));
const browser = await chromium.launch(GPU ? { args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] } : {});
async function newPage() {
  const page = await browser.newPage({ viewport: { width: 640, height: 400 } });
  await page.addInitScript(() => { window.__HEADLESS = true; });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e));
  page.on('console', (m) => { if (m.type() === 'error') console.error('  [trình duyệt]', m.text()); });
  await page.goto(`${BASE}/engine/player.html`);
  page.check = () => { if (errors.length) throw errors[0]; };
  return page;
}
const page0 = await newPage();
const script = await page0.evaluate(async (slug) => {
  const v = (await import(`/videos/${slug}/video.js`)).default;
  return { meta: v.meta, scenes: v.scenes.map(({ say, dur, minDur, lead, tail, chapter, sfx, transition }) => ({ say, dur, minDur, lead, tail, chapter, sfx, transition })) };
}, slug);
const meta = script.meta;

// ---------- 2. giọng đọc ----------
// meta.voices = { kid: { voice, rate, pitch, elevenVoice } } — vai phụ; lời thoại dạng mảng: say: ['dẫn chuyện…', { v: 'kid', text: '…' }].
const provider = meta.tts ?? process.env.TTS ?? (process.env.ELEVENLABS_API_KEY ? 'elevenlabs' : 'edge');
const baseVoice = {
  voice: meta.voice ?? 'vi-VN-HoaiMyNeural', rate: meta.rate ?? '+0%', pitch: meta.pitch ?? '+0Hz',
  eleven: meta.elevenVoice ?? process.env.ELEVENLABS_VOICE_ID,
};
// meta.speed (vd 1.1 = nhanh hơn 10%) nhân thêm vào tốc độ của mọi giọng.
const speedUp = (rate) => {
  const r = Math.round(((1 + parseFloat(rate) / 100) * (meta.speed ?? 1) - 1) * 100);
  return `${r >= 0 ? '+' : ''}${r}%`;
};
function voiceOf(v) {
  const x = v ? meta.voices?.[v] : {};
  if (!x) throw new Error(`Chưa khai báo giọng "${v}" trong meta.voices`);
  return { voice: x.voice ?? baseVoice.voice, rate: speedUp(x.rate ?? baseVoice.rate), pitch: x.pitch ?? baseVoice.pitch, eleven: x.elevenVoice ?? baseVoice.eleven, omni: x.omniVoice ?? meta.omniVoice ?? 'cau_ca', speed: meta.speed ?? 1 };
}
const elevenModel = meta.elevenModel ?? process.env.ELEVENLABS_MODEL ?? 'eleven_flash_v2_5';
// tts: 'omnivoice' — OmniVoice server trên PC có GPU (.env: OMNI_URL, OMNI_KEY), trả audio + mốc từng từ (Whisper).
// Giọng: meta.omniVoice / meta.voices.<vai>.omniVoice (tên trong GET /voices, mẫu nghe ở channel/research/giong-omnivoice/),
// meta.omniSteps = số bước diffusion (16 nhanh · 32 chuẩn · 64 kỹ). Tốc độ theo meta.speed.
if (provider === 'omnivoice' && !process.env.OMNI_URL) throw new Error('OmniVoice cần OMNI_URL (+ OMNI_KEY) trong .env');
if (provider === 'elevenlabs' && (!process.env.ELEVENLABS_API_KEY || !baseVoice.eleven)) {
  throw new Error('ElevenLabs cần ELEVENLABS_API_KEY và ELEVENLABS_VOICE_ID trong file .env (xem .env.example)');
}
log(`Giọng đọc: ${provider} · ${provider === 'elevenlabs' ? `${baseVoice.eleven} · ${elevenModel}` : provider === 'omnivoice' ? `${voiceOf().omni} · ${process.env.OMNI_URL}` : baseVoice.voice}${meta.voices ? ` + ${Object.keys(meta.voices).length} vai` : ''}`);

// "{ten}" trong lời thoại là mốc (cue) để đồng bộ hình với lời: k.at('ten').
function parseSay(say) {
  const names = [];
  const s = say.replace(/\{([\w-]+)\}/g, (_, n) => { names.push(n); return '\u0001'; }).replace(/\s+/g, ' ').trim();
  const markers = [];
  let clean = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\u0001') { markers.push({ name: names[markers.length], pos: clean.length }); continue; }
    if (s[i] === ' ' && (clean === '' || clean.endsWith(' '))) continue;
    clean += s[i];
  }
  return { clean: clean.trim(), markers };
}
const segmentsOf = (say) => (!say ? [] : (Array.isArray(say) ? say : [say]).map((x) => (typeof x === 'string' ? { text: x } : x)));

// OmniVoice: tự đọc số thành chữ (scripts/vi-so.mjs). meta.speakNumbers: false = giữ cách đọc cũ của server (video làm trước 14/11/2026).
const SPEAK_NUM = meta.speakNumbers !== false;
// Mỗi đoạn lời (segment) là một lần đọc TTS riêng.
const segs = [];
script.scenes.forEach((sc, i) => segmentsOf(sc.say).forEach((g, k) => {
  const parsed = parseSay(g.text);
  if (!parsed.clean) return;
  const vo = voiceOf(g.v);
  const key = crypto.createHash('sha1').update(JSON.stringify(provider === 'omnivoice' ? [provider, vo.omni, vo.speed, meta.omniSteps ?? 32, SPEAK_NUM ? speakVi(parsed.clean).spoken : parsed.clean] : [provider, vo.voice, vo.eleven, elevenModel, vo.rate, vo.pitch, parsed.clean])).digest('hex').slice(0, 16);
  segs.push({ i, k, v: g.v ?? null, pause: g.pause ?? meta.pause ?? 0.3, ...parsed, text: parsed.clean, vo, file: path.join(CACHE, `${key}.mp3`) });
}));
const complete = (j) => {
  if (!fs.existsSync(j.file) || !fs.existsSync(j.file + '.json')) return false;
  const n = JSON.parse(fs.readFileSync(j.file + '.json', 'utf8')).length;
  return n >= 0.85 * (j.text.match(/[\p{L}\p{N}]+/gu) ?? []).length;
};
// Ước thời lượng từ số chữ TRƯỚC khi đọc giọng (OmniVoice `default` ~212 từ/phút ở speed 1, đo 10/11/2026; Edge ~190):
// video dài ước dưới 110% mức tối thiểu (ước tính thường dư ~7%) → dừng sớm, viết thêm rồi mới tốn thời gian đọc (người dùng chốt quy trình 15/11/2026).
{
  const words = segs.reduce((n, j) => n + (j.text.match(/[\p{L}\p{N}]+/gu) ?? []).length, 0);
  const wpm = (provider === 'omnivoice' ? 212 : 190) * (meta.speed ?? 1);
  const est = words / wpm * 60 + segs.length * ((meta.lead ?? 0.55) + (meta.tail ?? 0.7));
  const need = meta.minDuration ?? (meta.format === 'short' ? 0 : 480);
  log(`Kịch bản: ${words} từ · ước ${fmtTime(est)}${need ? ` (tối thiểu ${fmtTime(need)})` : ''}`);
  if (need && est < need * 1.1 && !flag('allow-short')) throw new Error(`Kịch bản ước ${fmtTime(est)}, thiếu so với tối thiểu ${fmtTime(need)} — viết thêm ~${Math.ceil((need * 1.1 - est) / 60 * wpm)} từ trước khi đọc giọng (hoặc --allow-short khi chỉ thử).`);
}
const todo = segs.filter((j) => !complete(j));
if (todo.length) {
  log(`Tạo giọng đọc cho ${todo.length}/${segs.length} đoạn…`);
  if (provider === 'edge') {
    const jf = path.join(CACHE, `jobs-${process.pid}.json`);
    fs.writeFileSync(jf, JSON.stringify(todo.map((j) => ({ text: j.text, voice: j.vo.voice, rate: j.vo.rate, pitch: j.vo.pitch, out: j.file }))));
    await run(path.join(ROOT, '.venv', 'bin', 'python'), [path.join(ROOT, 'scripts', 'tts_edge.py'), jf], { quiet: false });
    fs.unlinkSync(jf);
  } else if (provider === 'omnivoice') {
    // GPU server làm lần lượt; gửi 2 câu cùng lúc để che độ trễ mạng.
    let next = 0, done = 0;
    await Promise.all([0, 1].map(async () => {
      while (next < todo.length) {
        const j = todo[next++];
        await omnivoice(j);
        log(`  OmniVoice ${++done}/${todo.length} · ${j.text.slice(0, 50)}`);
      }
    }));
  } else {
    for (const j of todo) await elevenlabs(j);
  }
}

async function omnivoice(job) {
  // Tự đọc số thành chữ (server đọc sai năm: "2022" → "hai nghìn lẻ hai hai"); mốc từng từ gom lại theo câu gốc.
  const sp = SPEAK_NUM ? speakVi(job.text) : { spoken: job.text, changed: false };
  const body = {
    text: sp.spoken, voice: job.vo.omni, speed: job.vo.speed, num_step: meta.omniSteps ?? 32, language: meta.lang ?? 'vi',
    timestamps: true, return_type: 'json', format: 'wav',
  };
  for (let attempt = 1; ; attempt++) {
    let res, err;
    try {
      res = await fetch(`${process.env.OMNI_URL.replace(/\/+$/, '')}/tts`, {
        method: 'POST', body: JSON.stringify(body), signal: AbortSignal.timeout(95_000),
        headers: { 'Content-Type': 'application/json', ...(process.env.OMNI_KEY ? { Authorization: `Bearer ${process.env.OMNI_KEY}` } : {}) },
      });
      if (res.ok) {
        const { audio_base64, words: raw } = await res.json();
        if (!raw?.length) throw new Error('server không trả words (timestamps)');
        const words = sp.changed ? regroupWords(raw, job.text, sp.counts) : raw;
        const wav = `${job.file}.wav`;
        fs.writeFileSync(wav, Buffer.from(audio_base64, 'base64'));
        await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', wav, '-ar', '44100', '-ac', '1', '-b:a', '160k', job.file]);
        fs.unlinkSync(wav);
        fs.writeFileSync(job.file + '.json', JSON.stringify(words.map(({ t, d, text }) => ({ t, d, text }))));
        return;
      }
      err = `HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`;
      if (res.status >= 400 && res.status < 500) throw new Error(`OmniVoice ${err}`); // sai key / sai giọng → dừng luôn
    } catch (e) {
      if (/^OmniVoice HTTP 4/.test(e.message)) throw e;
      err = e.message;
    }
    if (attempt >= 4) throw new Error(`OmniVoice server lỗi sau ${attempt} lần (${err}). Máy PC và server OmniVoice còn bật? (curl $OMNI_URL/health)`);
    log(`  OmniVoice thử lại (${err})`);
    await new Promise((r) => setTimeout(r, 3000 * attempt));
  }
}

async function elevenlabs(job) {
  const n = segs.indexOf(job);
  const body = {
    text: job.text, model_id: elevenModel,
    previous_text: segs[n - 1]?.text, next_text: segs[n + 1]?.text,
    voice_settings: { stability: 0.45, similarity_boost: 0.75, style: 0.3, use_speaker_boost: true, speed: meta.elevenSpeed ?? job.vo.speed },
  };
  if (!/multilingual_v2/.test(elevenModel)) body.language_code = meta.lang ?? 'vi';
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${job.vo.eleven}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  const { audio_base64, alignment } = await res.json();
  fs.writeFileSync(job.file, Buffer.from(audio_base64, 'base64'));
  // Mốc theo ký tự → mốc theo từ.
  const words = [];
  let cur = null;
  alignment.characters.forEach((ch, i) => {
    if (/\s/.test(ch)) { if (cur) words.push(cur); cur = null; return; }
    if (!cur) cur = { t: alignment.character_start_times_seconds[i], text: '' };
    cur.text += ch;
    cur.d = alignment.character_end_times_seconds[i] - cur.t;
  });
  if (cur) words.push(cur);
  fs.writeFileSync(job.file + '.json', JSON.stringify(words));
}

// Độ to giọng đọc theo thời gian (ENV_HZ mẫu/giây, 0..1) → k.talk(vai) cho khẩu hình nhép môi. Lưu cache cạnh file mp3.
const ENV_HZ = 40;
async function envelope(file) {
  const cache = `${file}.env${ENV_HZ}.json`;
  if (fs.existsSync(cache)) return JSON.parse(fs.readFileSync(cache, 'utf8'));
  const pcm = await new Promise((resolve, reject) => {
    const p = spawn('ffmpeg', ['-loglevel', 'error', '-i', file, '-ac', '1', '-ar', '8000', '-f', 's16le', '-']);
    const chunks = [];
    p.stdout.on('data', (d) => chunks.push(d));
    p.on('close', (code) => (code === 0 ? resolve(Buffer.concat(chunks)) : reject(new Error(`ffmpeg không giải mã được ${file}`))));
  });
  const n = Math.floor(pcm.length / 2), win = 8000 / ENV_HZ, rms = [];
  for (let s = 0; s < n; s += win) {
    let sum = 0, c = 0;
    for (let j = s; j < Math.min(n, s + win); j++) { const x = pcm.readInt16LE(j * 2) / 32768; sum += x * x; c++; }
    rms.push(Math.sqrt(sum / Math.max(1, c)));
  }
  const ref = [...rms].sort((a, b) => a - b)[Math.floor(rms.length * 0.95)] || 1;
  const env = rms.map((r) => { const v = Math.min(1, r / ref); return v < 0.12 ? 0 : +Math.pow(v, 0.7).toFixed(2); });
  fs.writeFileSync(cache, JSON.stringify(env));
  return env;
}

// ---------- 3. dòng thời gian ----------
const scenes = [];
const allWords = [];
let clock = 0;
for (let i = 0; i < script.scenes.length; i++) {
  const s = script.scenes[i];
  const mine = segs.filter((g) => g.i === i);
  const lead = s.lead ?? (i === 0 ? 0.3 : meta.lead ?? 0.55); // meta.lead/tail/pause: khoảng lặng mặc định cả video
  const cues = {};
  let dur = s.dur ?? 3;
  if (mine.length) {
    let off = 0;
    const audio = [];
    for (const g of mine) {
      const aDur = await duration(g.file);
      const lower = g.clean.toLowerCase();
      const words = JSON.parse(fs.readFileSync(g.file + '.json', 'utf8'));
      let pos = 0;
      for (const w of words) {
        const needle = w.text.toLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
        const j = needle ? lower.indexOf(needle, pos) : -1;
        if (j >= 0 && j - pos < 60) { w.pos = j; pos = j + needle.length; } else w.pos = pos;
        w.brk = /^[^\p{L}\p{N}]*[.!?…]/u.test(g.clean.slice(pos, pos + 3)) ? 2 : /^[^\p{L}\p{N}]*[,;:—-]/u.test(g.clean.slice(pos, pos + 3)) ? 1 : 0;
      }
      if (words.length) words[words.length - 1].brk = 2; // đổi giọng = ngắt câu phụ đề
      for (const m of g.markers) {
        const w = words.find((w) => w.pos >= m.pos);
        cues[m.name] = lead + off + (w ? w.t : aDur);
      }
      for (const w of words) allWords.push({ t: clock + lead + off + w.t, d: w.d, text: w.text.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}%]+$/gu, ''), brk: w.brk, scene: i });
      audio.push({ file: g.file, at: lead + off, v: g.v, hz: ENV_HZ, env: await envelope(g.file) });
      off += aDur + g.pause;
    }
    off -= mine[mine.length - 1].pause;
    cues.start = lead;
    cues.end = lead + off;
    dur = Math.max(s.minDur ?? 0, lead + off + (s.tail ?? meta.tail ?? 0.7));
    scenes.push({ start: clock, dur, lead, cues, audio });
  } else {
    scenes.push({ start: clock, dur, lead: 0, cues: { start: 0, end: dur }, audio: [] });
  }
  clock += dur;
}
const total = clock;

function chunkWords(words, maxWords, maxChars) {
  const chunks = [];
  let cur = [];
  const flush = () => { if (cur.length) chunks.push(cur); cur = []; };
  words.forEach((w, i) => {
    const next = words[i + 1];
    cur.push(w);
    const chars = cur.map((x) => x.text).join(' ').length;
    // số từ còn lại tới hết câu — tránh để sót 1–2 từ lẻ thành một dòng riêng
    let left = 0;
    for (let j = i + 1; j < words.length && words[j].scene === w.scene; j++) { left++; if (words[j].brk === 2) break; }
    const full = (cur.length >= maxWords || chars >= maxChars) && left > 2;
    if (!next || next.scene !== w.scene || w.brk === 2 || (w.brk === 1 && cur.length >= 3) || full || next.t - (w.t + w.d) > 0.6) flush();
  });
  return chunks.map((c, i) => {
    const nextStart = chunks[i + 1]?.[0].t ?? Infinity;
    const last = c[c.length - 1];
    return { start: c[0].t, end: Math.min(nextStart, last.t + last.d + 0.4), words: c.map((w) => ({ t: w.t, text: w.text })) };
  });
}
const short = meta.format === 'short';
// format ghi lại để Studio phân tab Video dài/Shorts theo bản render thật (meta có thể sinh từ hàm như shortMeta()).
const timing = { format: short ? 'short' : 'long', total, scenes, captions: chunkWords(allWords, short ? 4 : 12, short ? 20 : 64) };
fs.writeFileSync(path.join(out, 'timing.json'), JSON.stringify(timing));
log(`Thời lượng: ${fmtTime(total)} · ${scenes.length} cảnh`);
// Video dài phải ≥ meta.minDuration giây (mặc định 8 phút — người dùng yêu cầu, đủ chèn quảng cáo giữa video).
const minDur = meta.minDuration ?? (meta.format === 'short' ? 0 : 480);
if (total < minDur && !flag('allow-short')) throw new Error(`Video dài ${fmtTime(total)}, ngắn hơn tối thiểu ${fmtTime(minDur)} — thêm nội dung (hoặc chạy với --allow-short khi chỉ thử).`);

// Phụ đề .srt để tải lên YouTube.
const srtTime = (s) => { const ms = Math.round(s * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2, '0')}:${String(Math.floor(ms / 60000) % 60).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };
const srt = chunkWords(allWords, 12, 64).map((c, i) => `${i + 1}\n${srtTime(c.start)} --> ${srtTime(c.end)}\n${c.words.map((w) => w.text).join(' ')}\n`).join('\n');
fs.writeFileSync(path.join(out, 'captions.srt'), srt);

// Hiệu ứng âm thanh: scene.sfx = [[tên, thời điểm, âm lượng?]]; thời điểm = giây trong cảnh | 'cue' | ['cue', lệch].
const sfxEvents = [];
script.scenes.forEach((s, i) => {
  const sc = scenes[i];
  for (const [name, at, vol] of s.sfx ?? []) {
    const t = typeof at === 'number' ? at : Array.isArray(at) ? sc.cues[at[0]] + at[1] : sc.cues[at];
    if (!Number.isFinite(t)) throw new Error(`Cảnh ${i + 1}: sfx "${name}" dùng cue không có: ${JSON.stringify(at)}`);
    sfxEvents.push({ name, at: sc.start + t, vol: vol ?? 1 });
  }
  if (i > 0 && meta.sfxTransitions !== false && (s.transition ?? meta.transition ?? 'slide') !== 'cut') sfxEvents.push({ name: 'whoosh', at: sc.start - 0.08, vol: 0.3 });
});

// ---------- 4. âm thanh: giọng + nhạc nền (tự hạ khi có lời) + hiệu ứng + bút chì → chuẩn hoá -14 LUFS ----------
const audioOut = path.join(out, 'narration.m4a');
async function mixAudio(scribble = []) {
  const fxFile = path.join(out, '.sfx.wav');
  const fx = renderTrack(total, sfxEvents, scribble, meta.scribbleVolume ?? 0.1);
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 's16le', '-ar', String(SR), '-ac', '1', '-i', '-', fxFile], { input: toPcm16(fx) });
  const voiced = scenes.flatMap((s) => s.audio.map((a) => ({ file: a.file, at: s.start + a.at })));
  const args = ['-y', '-loglevel', 'error'];
  let f, n;
  if (voiced.length) {
    voiced.forEach((v) => args.push('-i', v.file));
    f = voiced.map((v, i) => `[${i}]adelay=${Math.round(v.at * 1000)}:all=1[a${i}]`);
    f.push(`${voiced.map((_, i) => `[a${i}]`).join('')}amix=inputs=${voiced.length}:normalize=0:dropout_transition=0,apad=whole_dur=${total.toFixed(3)}[vo]`);
    n = voiced.length;
  } else { // video không lời (vd video thử bố cục): rãnh im lặng
    args.push('-f', 'lavfi', '-t', total.toFixed(3), '-i', 'anullsrc=r=44100:cl=stereo');
    f = ['[0]anull[vo]'];
    n = 1;
  }
  args.push('-i', fxFile);
  f.push(`[${n++}]volume=${meta.sfxVolume ?? 0.5},aformat=sample_rates=44100:channel_layouts=stereo[fx]`);
  const musicFile = meta.music && path.join(ROOT, meta.music);
  if (musicFile && fs.existsSync(musicFile)) {
    args.push('-stream_loop', '-1', '-i', musicFile);
    f.push(`[vo]asplit[vo1][vo2]`);
    f.push(`[${n++}]aformat=sample_rates=44100:channel_layouts=stereo,volume=${meta.musicVolume ?? 0.12},atrim=0:${total.toFixed(3)},afade=t=in:d=1.5,afade=t=out:st=${Math.max(0, total - 3).toFixed(3)}:d=3[mu]`);
    f.push(`[mu][vo1]sidechaincompress=threshold=0.03:ratio=6:attack=30:release=600[duck]`);
    f.push(`[vo2][duck][fx]amix=inputs=3:normalize=0[mix]`);
  } else {
    if (meta.music) console.warn(`  ! Không thấy nhạc nền ${meta.music} — bỏ qua`);
    f.push(`[vo][fx]amix=inputs=2:normalize=0[mix]`);
  }
  f.push(`[mix]aformat=channel_layouts=stereo,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000,atrim=0:${total.toFixed(3)}[out]`);
  args.push('-filter_complex', f.join(';'), '-map', '[out]', '-c:a', 'aac', '-b:a', '192k', audioOut);
  await run('ffmpeg', args);
  fs.rmSync(fxFile, { force: true });
}

// ---------- 5. hình ----------
async function setupPage(page) {
  await page.evaluate((arg) => window.__setup(arg), { slug, timing });
  page.check();
}
const decode = (dataUrl) => Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64');

await setupPage(page0);
const thumbPng = path.join(out, 'thumbnail.png');
fs.writeFileSync(thumbPng, decode(await page0.evaluate(() => window.__thumbnail())));
await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', thumbPng, '-vf', short ? 'scale=1080:1920' : 'scale=1280:720', '-q:v', '2', path.join(out, 'thumbnail.jpg')]);
fs.unlinkSync(thumbPng);

if (flag('meta')) {
  // Chỉ làm lại thumbnail + youtube.json/description.txt (vd sau khi tập được link đã lên) — không render video.
  await browser.close(); server.close();
} else if (flag('preview')) {
  await mixAudio();
  await browser.close(); server.close();
  const { url } = await serve(5173);
  log(`Xem trước: ${url}/engine/player.html?v=${slug}   (Ctrl+C để thoát)`);
  spawn('open', [`${url}/engine/player.html?v=${slug}`]);
} else if (flag('stills')) {
  // ảnh tĩnh không cần trộn âm thanh (bước trộn chậm khi máy bận) — --audio để vẫn trộn
  if (flag('audio')) await mixAudio();
  const dir = path.join(out, 'stills');
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const list = /^[\d.,]+$/.test(opt('stills', '')) ? opt('stills') : null;
  const times = list ? list.split(',').map(Number) : scenes.map((s) => s.start + s.dur - 0.25);
  for (const [i, t] of times.entries()) {
    fs.writeFileSync(path.join(dir, `${String(i + 1).padStart(2, '0')}-${t.toFixed(1)}s.jpg`), decode(await page0.evaluate((t) => window.__frame(t, 0.85), t)));
    page0.check();
  }
  log(`Ảnh tĩnh: ${dir}`);
  // Dò đứng hình ngay ở bước ảnh tĩnh (trước khi render): 2 khung/giây, ảnh xám 160×90, chênh trung bình < 0,6 liền ≥ 4 giây
  // ≈ ffmpeg freezedetect n=0.002 d=4 trên video thật; báo từ 3 giây vì lấy mẫu thưa (sai số ±1 giây). --no-motion để bỏ qua.
  if (!list && !flag('no-motion')) {
    const step = 1, ts = []; for (let t = 0.5; t < total; t += step) ts.push(t);
    // so với khung tham chiếu (đầu đoạn đứng yên) như ffmpeg freezedetect: lệch ≥ ngưỡng → đổi tham chiếu
    const diffs = await page0.evaluate(async (ts) => {
      const src = document.getElementById('c'), sm = document.createElement('canvas'); sm.width = 480; sm.height = 270;
      window.__noPost = true; // hạt phim/sương của hậu kỳ đổi mỗi khung nhưng bị nén mất trong video → không tính
      const g = sm.getContext('2d', { willReadFrequently: true }); let ref = null; const out = [];
      for (const t of ts) {
        await window.__draw(t);
        g.drawImage(src, 0, 0, 480, 270); const d = g.getImageData(0, 0, 480, 270).data, cur = new Float32Array(480 * 270);
        for (let i = 0; i < cur.length; i++) cur[i] = 0.3 * d[i * 4] + 0.59 * d[i * 4 + 1] + 0.11 * d[i * 4 + 2];
        if (ref) { let s = 0; for (let i = 0; i < cur.length; i++) s += Math.abs(cur[i] - ref[i]); s /= cur.length; out.push(s); if (s >= 0.51) ref = cur; }
        else ref = cur;
      }
      window.__noPost = false;
      return out;
    }, ts);
    page0.check();
    if (process.env.MOTION_DUMP) fs.writeFileSync(process.env.MOTION_DUMP, JSON.stringify({ ts, diffs }));
    const runs = []; let a = null;
    diffs.forEach((v, i) => { if (v < 0.51) { if (a === null) a = i; } else { if (a !== null && (i - a) * step >= 3) runs.push([ts[a], (i - a) * step]); a = null; } });
    if (a !== null && (diffs.length - a) * step >= 3) runs.push([ts[a], (diffs.length - a) * step]);
    if (!runs.length) log('Chuyển động: không có đoạn đứng hình ≥ 3 giây (lấy mẫu 1 khung/giây; video thật chặn ở 4 giây)');
    for (const [t, d] of runs) {
      const i = scenes.findIndex((s) => t < s.start + s.dur);
      log(`⚠ Đứng hình ${d.toFixed(1)}s từ ${t.toFixed(1)}s — cảnh ${i + 1} (giây ${(t - scenes[i].start).toFixed(1)} của cảnh): thêm chuyển động/hình xuất hiện sớm hơn`);
    }
  }
  await browser.close(); server.close();
} else {
  const N = Math.ceil(total * FPS);
  const per = Math.ceil(N / WORKERS);
  const parts = [];
  const drawing = new Uint8Array(N); // khung nào bút chì đang vẽ → tiếng sột soạt
  let done = 0;
  const t0 = Date.now();
  const tick = setInterval(() => {
    const el = (Date.now() - t0) / 1000;
    process.stdout.write(`\r› Render ${done}/${N} khung (${((done / N) * 100).toFixed(0)}%) · còn ~${done ? Math.round((el / done) * (N - done)) : '?'}s   `);
  }, 1000);
  await Promise.all(Array.from({ length: WORKERS }, async (_, w) => {
    const a = w * per, b = Math.min(N, a + per);
    if (a >= b) return;
    const seg = path.join(out, `.seg${w}.mp4`);
    parts[w] = seg;
    const page = w === 0 ? page0 : await newPage();
    if (w !== 0) await setupPage(page);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-',
      ...ENCODER, '-pix_fmt', 'yuv420p', '-r', String(FPS), seg], { stdio: ['pipe', 'ignore', 'inherit'] });
    const exit = once(ff, 'close');
    for (let f = a; f < b; f++) {
      const [img, tip] = await page.evaluate((t) => window.__frameTip(t), f / FPS);
      const buf = decode(img);
      drawing[f] = tip ? 1 : 0;
      page.check();
      if (!ff.stdin.write(buf)) await once(ff.stdin, 'drain');
      done++;
    }
    ff.stdin.end();
    const [code] = await exit;
    if (code !== 0) throw new Error(`ffmpeg segment ${w} lỗi`);
  }));
  clearInterval(tick);
  process.stdout.write(`\r› Render xong ${N} khung trong ${Math.round((Date.now() - t0) / 1000)}s              \n`);
  await browser.close(); server.close();

  const list = path.join(out, '.segs.txt');
  fs.writeFileSync(list, parts.filter(Boolean).map((s) => `file '${s}'`).join('\n'));
  const silent = path.join(out, '.video.mp4');
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', silent]);
  // Gộp các khung đang vẽ thành đoạn (bỏ qua khoảng ngắt < 0,2s) → tiếng bút chì.
  const scribble = [];
  for (let f = 0; f < N; f++) {
    if (!drawing[f]) continue;
    const st = f / FPS, last = scribble[scribble.length - 1];
    if (last && st - last[1] < 0.2) last[1] = (f + 1) / FPS; else scribble.push([st, (f + 1) / FPS]);
  }
  await mixAudio(meta.scribble === false ? [] : scribble.filter(([a, b]) => b - a > 0.15));
  const final = path.join(out, 'video.mp4');
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, '-i', audioOut, '-map', '0:v', '-map', '1:a', '-c', 'copy', '-shortest', '-movflags', '+faststart', final]);
  for (const f of [...parts.filter(Boolean), list, silent]) fs.rmSync(f, { force: true });
  log(`Video: ${final}`);
}

// ---------- 6. tiêu đề, mô tả, chương, thẻ ----------
const chapters = scenes.map((s, i) => [s.start, script.scenes[i].chapter]).filter(([, c]) => c);
if (chapters.length) chapters[0][0] = 0;
// meta.links: [[nhãn, url | slug video]] → dòng link sau phần tóm tắt. Slug chưa đăng (không có uploaded.json) hoặc
// đang riêng tư không hẹn giờ → bỏ qua; build lại khi video đó đã lên để có link.
const links = (meta.links ?? []).map(([label, target]) => {
  if (/^https?:\/\//.test(target)) return `${label}: ${target}`;
  const f = path.join(ROOT, 'output', target, 'uploaded.json');
  const up = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null;
  if (!up || (up.privacy === 'private' && !up.publishAt)) { log(`Bỏ link "${label}": ${target} chưa đăng công khai`); return ''; }
  return `${label}: ${up.url}`;
}).filter(Boolean);
// Ảnh thật (scripts/anh-that.mjs) → mục ghi công trong mô tả.
const creditsFile = path.join(ROOT, 'videos', slug, 'assets', 'credits.json');
const photoCredits = fs.existsSync(creditsFile) ? JSON.parse(fs.readFileSync(creditsFile, 'utf8')) : [];
const creditBlock = photoCredits.length
  ? `🖼️ ${meta.lang === 'en' ? 'Image credits' : 'Nguồn hình ảnh'}\n${photoCredits.map((c) => `• ${c.type === 'clip' ? '[video] ' : ''}${c.title} — ${c.author} (${c.license}, ${c.src === 'nasa' ? 'NASA Image Library' : 'Wikimedia Commons'})`).join('\n')}`
  : '';
const description = [
  meta.description?.trim(),
  links.join('\n'),
  chapters.length >= 3 && !short ? `⏱️ ${meta.lang === 'en' ? 'Chapters' : 'Mục lục'}\n${chapters.map(([t, c]) => `${fmtTime(t)} ${c}`).join('\n')}` : '',
  meta.footer?.trim(),
  creditBlock,
  (meta.hashtags ?? []).map((h) => `#${h}`).join(' '),
].filter(Boolean).join('\n\n');
const yt = { title: meta.title, description, tags: meta.tags ?? [], categoryId: meta.categoryId ?? '27', defaultLanguage: meta.lang ?? 'vi', privacy: meta.privacy ?? 'private', short };
fs.writeFileSync(path.join(out, 'youtube.json'), JSON.stringify(yt, null, 2));
fs.writeFileSync(path.join(out, 'description.txt'), `${meta.title}\n\n${description}\n\nTags: ${yt.tags.join(', ')}\n`);
if (flag('meta')) log(`Mô tả & thẻ → ${path.relative(ROOT, out)}/description.txt`);
else if (!flag('stills') && !flag('preview')) log(`Xong → ${path.relative(ROOT, out)}/ (video.mp4, thumbnail.jpg, captions.srt, youtube.json, description.txt)`);
