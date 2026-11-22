// Hiệu ứng âm thanh tổng hợp bằng code (không bản quyền). Mỗi hàm trả về Float32Array mono 44.1kHz, đỉnh ~0.9.
// Dùng trong kịch bản: scene.sfx = [['pop', 'cue'], ['boing', 2.5, 0.8]]  (tên, cue hoặc giây trong cảnh, âm lượng).
// Nghe thử tất cả: node scripts/sfx.mjs  → output/sfx-demo.wav
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const SR = 44100;
const N = (sec) => Math.round(sec * SR);
const TAU = Math.PI * 2;

function noiseGen(seed = 1) {
  let s = seed >>> 0 || 1;
  return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) / 4294967296) * 2 - 1; };
}
// Bộ lọc biquad (RBJ) — đổi tần số theo từng mẫu được.
function biquad(type) {
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  return (x, f, q = 0.8) => {
    const w = (TAU * Math.min(f, SR * 0.45)) / SR, cs = Math.cos(w), al = Math.sin(w) / (2 * q);
    let b0, b1, b2;
    if (type === 'lp') { b0 = (1 - cs) / 2; b1 = 1 - cs; b2 = b0; }
    else if (type === 'hp') { b0 = (1 + cs) / 2; b1 = -(1 + cs); b2 = b0; }
    else { b0 = al; b1 = 0; b2 = -al; }
    const a0 = 1 + al, a1 = -2 * cs, a2 = 1 - al;
    const y = (b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x; y2 = y1; y1 = y;
    return y;
  };
}
function normalize(a, peak = 0.9) {
  let m = 0;
  for (const v of a) m = Math.max(m, Math.abs(v));
  if (m > 0) for (let i = 0; i < a.length; i++) a[i] *= peak / m;
  return a;
}
// Tạo âm từ hàm f(t, i) trong `sec` giây.
function make(sec, f, peak) {
  const a = new Float32Array(N(sec));
  for (let i = 0; i < a.length; i++) a[i] = f(i / SR, i);
  return normalize(a, peak);
}
const saw = (ph) => 2 * ((ph / TAU) % 1) - 1;

export const SFX = {
  // Nảy ra / xuất hiện
  pop() {
    let ph = 0;
    return make(0.13, (t) => { ph += (TAU * (1100 * Math.exp(-t * 28) + 260)) / SR; return Math.sin(ph) * Math.exp(-t * 32) * Math.min(1, t * 3000); });
  },
  // Lướt qua (chuyển cảnh, vật bay)
  whoosh(dur = 0.5) {
    const n = noiseGen(7), bp = biquad('bp');
    return make(dur, (t) => {
      const u = t / dur;
      return bp(n(), 300 + 2600 * Math.sin(Math.PI * u) ** 2, 1.2) * Math.sin(Math.PI * u) ** 2;
    }, 0.8);
  },
  // Lò xo hài
  boing() {
    let ph = 0;
    return make(0.7, (t) => {
      const f = 170 + 90 * Math.sin(TAU * 13 * t) * Math.exp(-t * 4) + 110 * Math.exp(-t * 6);
      ph += (TAU * f) / SR;
      return (Math.sin(ph) + 0.3 * Math.sin(2 * ph)) * Math.exp(-t * 4.5) * Math.min(1, t * 800);
    });
  },
  // Chuông "đúng rồi!"
  ding() {
    return make(1.4, (t) => [1, 2.76, 5.4, 8.93].reduce((s, m, i) => s + Math.sin(TAU * 1320 * m * t) * Math.exp(-t * (3 + i * 3)) / (i + 1), 0) * Math.min(1, t * 2000));
  },
  // Cốc đầu / va chạm
  bonk() {
    const n = noiseGen(3), lp = biquad('lp');
    let ph = 0;
    return make(0.35, (t) => {
      ph += (TAU * (520 * Math.exp(-t * 18) + 140)) / SR;
      return Math.sin(ph) * Math.exp(-t * 14) + lp(n(), 2000) * Math.exp(-t * 60) * 0.8;
    });
  },
  // Tiếng nện nặng (người khổng lồ dậm chân, BÙM)
  boom() {
    const n = noiseGen(11), lp = biquad('lp');
    let ph = 0;
    return make(1.1, (t) => {
      ph += (TAU * (75 * Math.exp(-t * 2) + 38)) / SR;
      return Math.sin(ph) * Math.exp(-t * 3.2) + lp(n(), 400 + 2000 * Math.exp(-t * 8)) * Math.exp(-t * 5) * 0.9;
    });
  },
  // Rít đĩa than — "khoan đã!"
  scratch() {
    const n = noiseGen(5), bp = biquad('bp');
    return make(0.55, (t) => {
      const sweep = t < 0.22 ? t / 0.22 : 1 - (t - 0.22) / 0.33;
      return bp(n(), 500 + 3200 * sweep, 4) * (0.6 + 0.4 * Math.sin(TAU * 40 * t)) * Math.min(1, t * 200) * Math.min(1, (0.55 - t) * 30);
    });
  },
  // Kèn buồn "wah wah wah waaah" — thất bại
  wahwah() {
    const notes = [[311, 0.32], [294, 0.32], [277, 0.32], [262, 1.0]];
    const lp = biquad('lp');
    let ph = 0, t0 = 0;
    const total = notes.reduce((s, x) => s + x[1], 0);
    return make(total, (t) => {
      let k = 0;
      for (t0 = 0; k < notes.length - 1 && t >= t0 + notes[k][1]; k++) t0 += notes[k][1];
      const [f, d] = notes[k];
      const lt = t - t0;
      const vib = k === notes.length - 1 ? 6 * Math.sin(TAU * 5.5 * lt) * Math.min(1, lt * 2) : 0;
      ph += (TAU * (f + vib)) / SR;
      const env = Math.min(1, lt * 25) * Math.min(1, (d - lt) * 12) * (0.6 + 0.4 * Math.sin(Math.PI * Math.min(1, lt / 0.12)));
      return lp(saw(ph), 900 + 900 * Math.min(1, lt * 6)) * env;
    }, 0.8);
  },
  // Còi trượt lên / xuống
  slideUp() {
    let ph = 0;
    return make(0.55, (t) => { ph += (TAU * (350 * Math.pow(4, t / 0.55) + 15 * Math.sin(TAU * 7 * t))) / SR; return Math.sin(ph) * Math.sin(Math.PI * t / 0.55) ** 0.5; }, 0.45);
  },
  slideDown() {
    let ph = 0;
    return make(0.6, (t) => { ph += (TAU * (1400 * Math.pow(0.25, t / 0.6) + 15 * Math.sin(TAU * 7 * t))) / SR; return Math.sin(ph) * Math.sin(Math.PI * t / 0.6) ** 0.5; }, 0.45);
  },
  // Lấp lánh (phép màu, ý tưởng)
  sparkle() {
    const r = noiseGen(9);
    const pings = Array.from({ length: 9 }, (_, i) => [i * 0.07 + Math.abs(r()) * 0.03, 2200 + Math.abs(r()) * 2600]);
    return make(1.2, (t) => pings.reduce((s, [st, f]) => (t > st ? s + Math.sin(TAU * f * (t - st)) * Math.exp(-(t - st) * 9) : s), 0), 0.55);
  },
  // Trống dồn (hồi hộp) — dừng gọn ở cuối
  drumroll(dur = 1.4) {
    const n = noiseGen(13), bp = biquad('bp');
    return make(dur, (t) => {
      const hit = (t * 24) % 1;
      return bp(n(), 1800, 0.7) * Math.exp(-hit * 9) * (0.35 + 0.65 * (t / dur)) * Math.min(1, (dur - t) * 40);
    }, 0.7);
  },
  // Kèn chiến thắng "ta-da!"
  tada() {
    const lp = biquad('lp');
    const chord = [523, 659, 784, 1047];
    const phs = [0, 0, 0, 0];
    return make(1.3, (t) => {
      let s = 0;
      chord.forEach((f, i) => {
        if (t < (i < 2 ? i * 0.09 : 0.18)) return;
        phs[i] += (TAU * f * (1 + 0.004 * Math.sin(TAU * 5 * t))) / SR;
        s += saw(phs[i]);
      });
      return lp(s / 3, 2400) * Math.min(1, t * 30) * Math.exp(-Math.max(0, t - 0.5) * 3);
    }, 0.65);
  },
  click() { const n = noiseGen(17), hp = biquad('hp'); return make(0.04, (t) => hp(n(), 2500) * Math.exp(-t * 180), 0.8); },
  // Rơi tiền / "ting ting" (đếm tiền, giá cả)
  cash() {
    const a = SFX.click(), b = SFX.ding();
    const out = new Float32Array(b.length + N(0.06));
    a.forEach((v, i) => { out[i] += v * 0.6; });
    b.forEach((v, i) => { out[i + N(0.06)] += v; });
    return normalize(out, 0.8);
  },
  // Ực / nuốt (ăn uống)
  gulp() {
    let ph = 0;
    return make(0.22, (t) => { ph += (TAU * (180 + 600 * Math.sin(Math.PI * t / 0.22))) / SR; return Math.sin(ph) * Math.sin(Math.PI * t / 0.22); }, 0.5);
  },
  // ---------- âm thanh rùng rợn ----------
  // Nhịp tim "thình thịch"
  heartbeat() {
    const beat = (t0) => (t) => { const u = t - t0; if (u < 0 || u > 0.25) return 0; return Math.sin(TAU * (55 + 30 * Math.exp(-u * 30)) * u) * Math.exp(-u * 22); };
    const a = beat(0), b = beat(0.22);
    return make(0.9, (t) => a(t) + 0.8 * b(t), 0.95);
  },
  // Gió rít
  wind(dur = 3) {
    const n = noiseGen(31), bp = biquad('bp'), lp = biquad('lp');
    return make(dur, (t) => {
      const f = 500 + 450 * Math.sin(TAU * 0.35 * t) + 250 * Math.sin(TAU * 0.9 * t + 1);
      const env = Math.min(1, t / 0.6, (dur - t) / 0.8);
      return (bp(n(), f, 6) * 0.8 + lp(n(), 300) * 0.4) * env;
    }, 0.6);
  },
  // Sấm: tiếng nổ + ầm ầm kéo dài
  thunder() {
    const n = noiseGen(37), lp = biquad('lp'), lp2 = biquad('lp');
    return make(3, (t) => lp(n(), 900 * Math.exp(-t * 3) + 120) * Math.exp(-t * 1.4) * (0.6 + 0.4 * Math.sin(TAU * 3 * t) ** 2) + lp2(n(), 3000) * Math.exp(-t * 25) * 0.8, 0.95);
  },
  // "Stinger" kinh dị: hợp âm nghịch tai + rung
  stinger() {
    const lp = biquad('lp');
    const fs = [233, 247, 349, 370, 494];
    const ph = fs.map(() => 0);
    return make(2.2, (t) => {
      let s = 0;
      fs.forEach((f, i) => { ph[i] += (TAU * f * (1 + 0.006 * Math.sin(TAU * 6 * t + i))) / SR; s += saw(ph[i]); });
      return lp(s / fs.length, 2600) * Math.min(1, t * 60) * Math.exp(-t * 1.3) * (0.75 + 0.25 * Math.sin(TAU * 11 * t));
    }, 0.8);
  },
  // Cửa / sàn gỗ kẽo kẹt
  creak() {
    const bp = biquad('bp'); const r = noiseGen(41);
    let ph = 0;
    return make(1.2, (t) => {
      const f = 140 + 70 * Math.sin(TAU * 0.6 * t) + 25 * r();
      ph += (TAU * f) / SR;
      const pulses = (Math.sin(TAU * (28 + 10 * Math.sin(t * 3)) * t) > 0.6 ? 1 : 0.25);
      return bp(saw(ph) * pulses, 900, 3) * Math.min(1, t * 10, (1.2 - t) * 6);
    }, 0.7);
  },
  // Giọt nước tí tách
  drip() {
    let ph = 0;
    return make(0.25, (t) => { ph += (TAU * (900 + 1400 * Math.exp(-t * 40))) / SR; return Math.sin(ph) * Math.exp(-t * 28) * Math.min(1, t * 4000); }, 0.6);
  },
  // Cú kêu "hù… hù"
  owl() {
    const note = (t0, f) => (t) => { const u = t - t0; if (u < 0 || u > 0.45) return 0; return Math.sin(TAU * f * u + 0.3 * Math.sin(TAU * 5 * u)) * Math.sin(Math.PI * u / 0.45) ** 1.5; };
    const a = note(0, 380), b = note(0.6, 340);
    return make(1.1, (t) => a(t) + b(t), 0.55);
  },
  // Mèo kêu "meo"
  meow() {
    const bp1 = biquad('bp'), bp2 = biquad('bp');
    let ph = 0;
    return make(0.7, (t) => {
      const f0 = 520 + 260 * Math.sin(Math.PI * Math.min(1, t / 0.6));
      ph += (TAU * f0) / SR;
      const src = saw(ph);
      const env = Math.sin(Math.PI * Math.min(1, t / 0.7));
      return (bp1(src, 900 + 900 * (t / 0.7), 3) + bp2(src, 2600 - 600 * (t / 0.7), 4)) * env;
    }, 0.6);
  },
  // Trống da (trống rước đèn): một tiếng "thùng" trầm, có tiếng da bật
  drum() {
    const n = noiseGen(41), lp = biquad('lp');
    return make(1.1, (t) => (Math.sin(TAU * (70 + 60 * Math.exp(-t * 18)) * t) * Math.exp(-t * 4.5) + lp(n(), 1200) * Math.exp(-t * 40) * 0.5) * Math.min(1, t * 500), 0.9);
  },
  // Gõ cửa gỗ: một tiếng "cộc" khô, trầm (khớp ngón tay lên ván gỗ dày)
  knock() {
    const n = noiseGen(57), lp = biquad('lp'), bp = biquad('bp');
    return make(0.45, (t) => {
      const body = [190, 410, 730].reduce((s, f, i) => s + Math.sin(TAU * f * t) * Math.exp(-t * (38 + i * 22)) / (i + 1), 0);
      const tap = (bp(n(), 1500, 1.2) * 0.7 + lp(n(), 600) * 0.6) * Math.exp(-t * 90);
      return (body + tap) * Math.min(1, t * 2000);
    }, 0.9);
  },
  // Chuông chùa / cồng trầm
  gong() {
    return make(4, (t) => [1, 2.1, 2.97, 4.2].reduce((s, m, i) => s + Math.sin(TAU * 110 * m * t + 0.5 * Math.sin(TAU * 2 * t)) * Math.exp(-t * (0.7 + i * 0.6)) / (i + 1), 0) * Math.min(1, t * 300), 0.8);
  },
};
export const SFX_NAMES = Object.keys(SFX);

// Tiếng bút chì sột soạt cho các đoạn đang vẽ: intervals = [[t0, t1], ...] (giây).
export function scribbleInto(buf, intervals) {
  const n = noiseGen(21), hp = biquad('hp'), bp = biquad('bp');
  const r = noiseGen(22);
  for (const [a, b] of intervals) {
    const i0 = N(a), i1 = Math.min(buf.length, N(b));
    let stroke = 0, len = 1;
    for (let i = i0; i < i1; i++) {
      if (--len <= 0) { len = N(0.06 + Math.abs(r()) * 0.12); stroke = 0.4 + Math.abs(r()) * 0.6; }
      const t = (i - i0) / SR, fade = Math.min(1, t * 20, (i1 - i) / SR * 20);
      const x = hp(n(), 1800) * 0.6 + bp(n(), 3500, 1.5) * 0.4;
      buf[i] += x * stroke * (0.55 + 0.45 * Math.sin(TAU * 9 * t)) * fade * 0.5;
    }
  }
}

// Gộp các sự kiện vào một rãnh âm thanh dài `total` giây.
export function renderTrack(total, events, scribble = [], scribbleGain = 0.12) {
  const buf = new Float32Array(N(total) + 1);
  const cache = {};
  for (const { name, at, vol = 1 } of events) {
    if (!SFX[name]) throw new Error(`Không có hiệu ứng "${name}". Có: ${SFX_NAMES.join(', ')}`);
    const s = (cache[name] ??= SFX[name]());
    const i0 = N(Math.max(0, at));
    for (let i = 0; i < s.length && i0 + i < buf.length; i++) buf[i0 + i] += s[i] * vol;
  }
  if (scribble.length) {
    const sc = new Float32Array(buf.length);
    scribbleInto(sc, scribble);
    for (let i = 0; i < buf.length; i++) buf[i] += sc[i] * scribbleGain;
  }
  return buf;
}

export function toPcm16(buf) {
  const out = Buffer.alloc(buf.length * 2);
  for (let i = 0; i < buf.length; i++) out.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(buf[i] * 32767))), i * 2);
  return out;
}

// node scripts/sfx.mjs → nghe thử tất cả hiệu ứng
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { run, ROOT } = await import('./lib.mjs');
  const events = SFX_NAMES.map((name, i) => ({ name, at: i * 1.6 }));
  const buf = renderTrack(SFX_NAMES.length * 1.6 + 1, events, [[SFX_NAMES.length * 1.6 - 0.2, SFX_NAMES.length * 1.6 + 0.8]], 0.5);
  const out = path.join(ROOT, 'output', 'sfx-demo.wav');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 's16le', '-ar', String(SR), '-ac', '1', '-i', '-', out], { input: toPcm16(buf) });
  console.log(`› ${SFX_NAMES.join(', ')} + bút chì → ${path.relative(ROOT, out)}`);
}
