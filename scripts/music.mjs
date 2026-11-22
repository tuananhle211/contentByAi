#!/usr/bin/env node
// Tự tổng hợp nhạc nền nhẹ nhàng (không bản quyền), lặp liền mạch.
//   node scripts/music.mjs [assets/music/background.mp3] [--bpm 80] [--seed 3]
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, run } from './lib.mjs';

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const outFile = path.resolve(ROOT, argv.find((a, i) => !a.startsWith('--') && !argv[i - 1]?.startsWith('--')) ?? 'assets/music/background.mp3');
const MOOD = opt('mood', 'calm'); // calm | spooky
const BPM = +opt('bpm', MOOD === 'spooky' ? 58 : 80);
let seed = +opt('seed', 3);
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const SR = 44100;
const beat = 60 / BPM;
// Cmaj7 – Am7 – Fmaj7 – G6, mỗi hợp âm 2 ô nhịp, cả bài lặp 2 vòng (có biến tấu giai điệu).
const CHORDS = MOOD === 'spooky'
  ? [[45, 52, 57, 60], [41, 48, 53, 57], [38, 50, 53, 57], [40, 47, 52, 56]] // Am – F – Dm – E (u ám)
  : [[48, 52, 55, 59], [45, 52, 55, 60], [41, 48, 52, 57], [43, 50, 55, 59]];
const BARS_PER_CHORD = 2, ROUNDS = 2;
const totalBeats = CHORDS.length * BARS_PER_CHORD * 4 * ROUNDS;
const N = Math.round(totalBeats * beat * SR);
const L = new Float32Array(N), R = new Float32Array(N);
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

function add(start, len, fn, pan = 0) {
  const s0 = Math.round(start * SR), n = Math.round(len * SR);
  const gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);
  for (let i = 0; i < n; i++) {
    const v = fn(i / SR);
    const j = (s0 + i) % N; // cộng vòng → điểm nối vòng lặp không bị giật
    L[j] += v * gl; R[j] += v * gr;
  }
}

let t = 0;
for (let round = 0; round < ROUNDS; round++) {
  for (const chord of CHORDS) {
    const dur = BARS_PER_CHORD * 4 * beat;
    // pad êm: sin lệch tần nhẹ, attack/release chậm
    for (const m of chord) {
      const f = hz(m + 12);
      add(t, dur + 2.5, (x) => {
        const env = Math.min(1, x / 1.2) * Math.min(1, Math.max(0, (dur + 2.5 - x) / 2.5));
        return 0.035 * env * (Math.sin(2 * Math.PI * f * x) + 0.6 * Math.sin(2 * Math.PI * f * 1.003 * x + 1) + 0.25 * Math.sin(4 * Math.PI * f * x));
      });
    }
    // bass (spooky: tiếng ù trầm kéo dài, rung chậm)
    if (MOOD === 'spooky') add(t, dur + 1, (x) => 0.07 * Math.min(1, x / 2, (dur + 1 - x) / 1.5) * (0.7 + 0.3 * Math.sin(2 * Math.PI * 0.5 * x)) * Math.sin(2 * Math.PI * hz(chord[0] - 12) * x));
    else add(t, dur, (x) => 0.09 * Math.exp(-x * 0.6) * Math.min(1, x * 40) * Math.sin(2 * Math.PI * hz(chord[0] - 12) * x));
    // arpeggio kiểu đàn gảy, nốt móc đơn
    const notes = [...chord.map((m) => m + 12), chord[1] + 24, chord[2] + 12];
    for (let s = 0; s < BARS_PER_CHORD * 8; s++) {
      if (round === 0 && s % 4 === 3) continue;
      if (rand() < (MOOD === 'spooky' ? 0.62 : 0.18)) continue;
      const m = notes[Math.floor(rand() * notes.length)] + (round === 1 && rand() < 0.3 ? 12 : 0);
      const f = hz(m);
      const vel = 0.05 + rand() * 0.03;
      add(t + s * beat / 2 + rand() * 0.012, 2.2, (x) => vel * Math.exp(-x * 3.2) * Math.min(1, x * 300) * (Math.sin(2 * Math.PI * f * x) + 0.3 * Math.sin(4 * Math.PI * f * x) * Math.exp(-x * 6)), (s % 2 ? 0.45 : -0.45));
    }
    // tiếng lắc khẽ ở phách lệch
    for (let b = 0; b < (MOOD === 'spooky' ? 0 : BARS_PER_CHORD * 4); b++) {
      let lp = 0;
      add(t + b * beat + beat / 2, 0.09, (x) => { lp += 0.5 * ((rand() * 2 - 1) - lp); return 0.012 * Math.exp(-x * 45) * ((rand() * 2 - 1) - lp); }, 0.2);
    }
    t += dur;
  }
}

// vang nhẹ (delay phản hồi, chạy 2 lượt để đuôi vang nối vòng)
const d = Math.round(beat * 0.75 * SR);
for (let pass = 0; pass < 2; pass++) for (let i = 0; i < N; i++) {
  const j = (i - d + N) % N;
  L[i] += R[j] * 0.22; R[i] += L[j] * 0.22;
}
// lọc thông thấp mềm + chuẩn hoá
let peak = 0;
for (const ch of [L, R]) { let y = ch[N - 1]; for (let i = 0; i < N; i++) { y += 0.35 * (ch[i] - y); ch[i] = y; peak = Math.max(peak, Math.abs(y)); } }
const buf = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round((L[i] / peak) * 0.8 * 32767), i * 4);
  buf.writeInt16LE(Math.round((R[i] / peak) * 0.8 * 32767), i * 4 + 2);
}
fs.mkdirSync(path.dirname(outFile), { recursive: true });
await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 's16le', '-ar', String(SR), '-ac', '2', '-i', '-', '-c:a', 'libmp3lame', '-q:a', '2', outFile], { input: buf });
console.log(`› Nhạc nền ${(N / SR).toFixed(1)}s → ${path.relative(ROOT, outFile)}`);
