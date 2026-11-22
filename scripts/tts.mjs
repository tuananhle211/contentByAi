// Tạo giọng đọc: gọi API, trả về file mp3 + mốc thời gian từng từ (để đồng bộ hình và phụ đề).
//   node scripts/tts.mjs "Các cụ bảo…" out.mp3 [--provider omnivoice|elevenlabs|edge] [--voice <tên>] [--speed 0.95]
//   → out.mp3 và out.mp3.json = [{ t, d, text }] (giây)
// Dùng trong code: import { tts } from './tts.mjs'; await tts(text, 'out.mp3', { provider: 'omnivoice', voice: 'default' });
//
// Nhà cung cấp (khoá đặt trong .env, xem .env.example):
//   omnivoice  — server OmniVoice tự dựng (GPU): OMNI_URL (+ OMNI_KEY). Kênh Nhân Gian Chưa Kể + Hạt Bụi Xanh dùng giọng 'default'.
//   elevenlabs — ELEVENLABS_API_KEY + ELEVENLABS_VOICE_ID (ELEVENLABS_MODEL, mặc định eleven_flash_v2_5).
//   edge       — Edge TTS miễn phí, không cần khoá (cần Python + gói edge-tts, chạy scripts/tts_edge.py).
// OmniVoice đọc sai số ("2022" → "hai nghìn lẻ hai hai") nên số được đổi thành chữ trước (vi-so.mjs), mốc từng từ gom lại theo câu gốc.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { speakVi, regroupWords } from './vi-so.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Đọc .env (KEY=VALUE) vào process.env, không ghi đè biến đã có.
try {
  for (const line of fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] == null) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch {}

const exec = (cmd, args) => new Promise((resolve, reject) => {
  const p = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });
  let err = ''; p.stderr.on('data', (d) => { err += d; });
  p.on('close', (c) => (c === 0 ? resolve() : reject(new Error(`${cmd} lỗi (${c}): ${err.slice(-500)}`))));
});

// ---------- OmniVoice: POST {OMNI_URL}/tts → { audio_base64 (wav), words: [{t,d,text}] } ----------
export async function omnivoice(text, out, o = {}) {
  if (!process.env.OMNI_URL) throw new Error('OmniVoice cần OMNI_URL (+ OMNI_KEY) trong .env');
  const sp = o.speakNumbers === false ? { spoken: text, changed: false } : speakVi(text);
  const body = { text: sp.spoken, voice: o.voice ?? 'default', speed: o.speed ?? 1, num_step: o.steps ?? 32, language: o.lang ?? 'vi', timestamps: true, return_type: 'json', format: 'wav' };
  for (let attempt = 1; ; attempt++) {
    let err;
    try {
      const res = await fetch(`${process.env.OMNI_URL.replace(/\/+$/, '')}/tts`, {
        method: 'POST', body: JSON.stringify(body), signal: AbortSignal.timeout(95_000),
        headers: { 'Content-Type': 'application/json', ...(process.env.OMNI_KEY ? { Authorization: `Bearer ${process.env.OMNI_KEY}` } : {}) },
      });
      if (res.ok) {
        const { audio_base64, words: raw } = await res.json();
        if (!raw?.length) throw new Error('server không trả words (timestamps)');
        const words = sp.changed ? regroupWords(raw, text, sp.counts) : raw;
        const wav = `${out}.wav`;
        fs.writeFileSync(wav, Buffer.from(audio_base64, 'base64'));
        await exec('ffmpeg', ['-y', '-loglevel', 'error', '-i', wav, '-ar', '44100', '-ac', '1', '-b:a', '160k', out]);
        fs.unlinkSync(wav);
        fs.writeFileSync(`${out}.json`, JSON.stringify(words.map(({ t, d, text: w }) => ({ t, d, text: w }))));
        return words;
      }
      err = `HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`;
      if (res.status >= 400 && res.status < 500) throw new Error(`OmniVoice ${err}`); // sai khoá / sai tên giọng → dừng
    } catch (e) {
      if (/^OmniVoice HTTP 4/.test(e.message)) throw e;
      err = e.message;
    }
    if (attempt >= 4) throw new Error(`OmniVoice lỗi sau ${attempt} lần (${err})`);
    await new Promise((r) => setTimeout(r, 3000 * attempt));
  }
}

// ---------- ElevenLabs: /with-timestamps trả mốc theo ký tự → gom thành từ ----------
export async function elevenlabs(text, out, o = {}) {
  const key = process.env.ELEVENLABS_API_KEY, voice = o.voice ?? process.env.ELEVENLABS_VOICE_ID;
  if (!key || !voice) throw new Error('ElevenLabs cần ELEVENLABS_API_KEY và ELEVENLABS_VOICE_ID trong .env');
  const model = o.model ?? process.env.ELEVENLABS_MODEL ?? 'eleven_flash_v2_5';
  const body = { text, model_id: model, previous_text: o.previous, next_text: o.next, voice_settings: { stability: 0.45, similarity_boost: 0.75, style: 0.3, use_speaker_boost: true, speed: o.speed ?? 1 } };
  if (!/multilingual_v2/.test(model)) body.language_code = o.lang ?? 'vi';
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': key, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  const { audio_base64, alignment } = await res.json();
  fs.writeFileSync(out, Buffer.from(audio_base64, 'base64'));
  const words = []; let cur = null;
  alignment.characters.forEach((ch, i) => {
    if (/\s/.test(ch)) { if (cur) words.push(cur); cur = null; return; }
    if (!cur) cur = { t: alignment.character_start_times_seconds[i], text: '' };
    cur.text += ch; cur.d = alignment.character_end_times_seconds[i] - cur.t;
  });
  if (cur) words.push(cur);
  fs.writeFileSync(`${out}.json`, JSON.stringify(words));
  return words;
}

// ---------- Edge TTS (miễn phí): chạy scripts/tts_edge.py ----------
export async function edge(text, out, o = {}) {
  const rate = o.speed ? `${o.speed >= 1 ? '+' : ''}${Math.round((o.speed - 1) * 100)}%` : '+0%';
  const jobs = `${out}.job.json`;
  fs.writeFileSync(jobs, JSON.stringify([{ text, voice: o.voice ?? 'vi-VN-NamMinhNeural', rate, pitch: o.pitch ?? '+0Hz', out }]));
  const venv = path.join(ROOT, '.venv', 'bin', 'python');
  try { await exec(fs.existsSync(venv) ? venv : 'python3', [path.join(ROOT, 'scripts', 'tts_edge.py'), jobs]); } finally { fs.rmSync(jobs, { force: true }); }
  return JSON.parse(fs.readFileSync(`${out}.json`, 'utf8'));
}

export async function tts(text, out, o = {}) {
  const provider = o.provider ?? process.env.TTS ?? (process.env.OMNI_URL ? 'omnivoice' : process.env.ELEVENLABS_API_KEY ? 'elevenlabs' : 'edge');
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  return ({ omnivoice, elevenlabs, edge })[provider](text, out, o);
}

// ---------- CLI ----------
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const argv = process.argv.slice(2);
  const opt = (n) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : undefined; };
  const pos = argv.filter((a, i) => !a.startsWith('--') && !argv[i - 1]?.startsWith('--'));
  const [text, out = 'tts.mp3'] = pos;
  if (!text) { console.log('Dùng: node scripts/tts.mjs "câu cần đọc" out.mp3 [--provider omnivoice|elevenlabs|edge] [--voice tên] [--speed 0.95]'); process.exit(1); }
  const words = await tts(text, out, { provider: opt('provider'), voice: opt('voice'), speed: opt('speed') ? +opt('speed') : undefined });
  console.log(`${out} · ${words.length} từ · ${(words.at(-1).t + words.at(-1).d).toFixed(2)} giây`);
}
