// Ghép các cảnh thành dòng thời gian. Được dùng bởi:
//  - scripts/build.mjs (headless): __setup → __render(t) từng khung hình
//  - Xem trước trong trình duyệt: player.html?v=<slug>
import { Kit, C, ease, clamp, rng } from './kit.js';
import { makeBrush, brushWipe } from './brush.js';
import { makePost } from './post.js';

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let kit, video, timing, paper, W, H;
let post = null;
let brush = null, sctx = ctx; // meta.look = 'brush': cảnh vẽ lên brush.buf (nền trong suốt) rồi ghép rung + màu nước
const TRANSITION = 0.6;
const WIPE = 0.3; // nửa thời gian chuyển cảnh quệt cọ (phủ ở cuối cảnh trước, mở ở đầu cảnh sau)

function makePaper(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = video.meta.paper ?? C.paper;
  g.fillRect(0, 0, w, h);
  const r = rng(7);
  for (let i = 0; i < (w * h) / 900; i++) {
    g.fillStyle = r() < 0.5 ? 'rgba(120,90,40,0.05)' : 'rgba(255,255,255,0.18)';
    g.fillRect(r() * w, r() * h, 1 + r() * 2.5, 1 + r() * 2.5);
  }
  for (let i = 0; i < 40; i++) {
    g.fillStyle = 'rgba(160,120,60,0.025)';
    g.beginPath(); g.arc(r() * w, r() * h, 40 + r() * 160, 0, Math.PI * 2); g.fill();
  }
  const v = g.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(90,60,20,0.16)');
  g.fillStyle = v; g.fillRect(0, 0, w, h);
  return c;
}

// Ảnh thật tải bằng scripts/anh-that.mjs nằm trong assets/credits.json → tự nạp, kèm thông tin ghi công cho k.photo.
let credits = {};
async function loadImages(slug, map = {}) {
  const out = {};
  credits = {};
  try {
    const r = await fetch(`/videos/${slug}/assets/credits.json`);
    if (r.ok) for (const c of await r.json()) { credits[c.name] = c; if (c.type !== 'clip') map = { [c.name]: c.file, ...map }; }
  } catch { /* không có ảnh thật */ }
  await Promise.all(Object.entries(map).map(([name, file]) => new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => { out[name] = img; res(); };
    img.onerror = () => rej(new Error(`Không tải được ảnh ${file}`));
    img.src = `/videos/${slug}/${file}`;
  })));
  return out;
}

window.__setup = async ({ slug, timing: tm, bust = '' }) => {
  video = (await import(`/videos/${slug}/video.js${bust}`)).default;
  timing = tm;
  [W, H] = video.meta.format === 'short' ? [1080, 1920] : [1920, 1080];
  canvas.width = W; canvas.height = H;
  await Promise.all(['56px "Patrick Hand"', '56px Pangolin', '500 56px "Be Vietnam Pro"', '600 56px "Be Vietnam Pro"', '800 56px "Be Vietnam Pro"'].map((f) => document.fonts.load(f, 'Tiếng Việt')));
  brush = video.meta.look === 'brush' ? makeBrush(W, H, video.meta.brush ?? {}) : null;
  sctx = brush ? brush.buf.getContext('2d') : ctx;
  kit = new Kit(brush ? brush.buf : canvas, { W, H, images: await loadImages(slug, video.meta.images), style: video.meta.style });
  kit.credits = credits;
  // clip video: khung nạp theo yêu cầu, giữ tối đa ~150 khung trong bộ nhớ
  kit.slug = slug;
  kit.clipsMeta = Object.fromEntries(Object.values(credits).filter((c) => c.type === 'clip').map((c) => [c.name, c]));
  kit.clipCache = new Map();
  kit.pendingClips = new Set();
  paper = makePaper(W, H);
  return { W, H };
};

function drawScene(i, t, gt, pencil = true) {
  const tm = timing.scenes[i];
  pencil = pencil && (video.meta.pencil ?? video.meta.style !== 'clean');
  kit.begin({ scene: i, t, d: tm.dur, gt, cues: tm.cues, audio: tm.audio, pencil });
  sctx.save();
  // Máy quay khẽ đẩy vào suốt cảnh cho hình "sống" (scene.camera / meta.camera = 0 để tắt).
  const cam = video.scenes[i].camera ?? video.meta.camera ?? 0.035;
  if (cam) {
    const s = 1 + cam * ease.inOut(clamp(t / tm.dur));
    sctx.translate(W / 2, H / 2); sctx.scale(s, s); sctx.translate(-W / 2, -H / 2);
  }
  video.scenes[i].draw(kit);
  sctx.restore();
  if (pencil) {
    kit.drawPencil();
    if (kit.tip) window.__tipActive = true;
  }
}

function drawCaptions(gt) {
  const cap = timing.captions.find((c) => gt >= c.start && gt < c.end);
  if (!cap) return;
  const clean = video.meta.style === 'clean';
  let size = W < H ? (clean ? 76 : 84) : 60;
  const y = W < H ? H * 0.74 : H - 90;
  const font = (s) => (clean ? `800 ${s}px "Be Vietnam Pro"` : `${s}px Pangolin`);
  ctx.save();
  ctx.font = font(size);
  ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  const words = cap.words.map((w) => w.text.toUpperCase());
  // thu nhỏ cho vừa khung (chừa lề 50px mỗi bên)
  const gap = () => Math.max(ctx.measureText(' ').width, size * 0.32);
  const total = () => words.reduce((a, w) => a + ctx.measureText(w).width, 0) + gap() * (words.length - 1);
  if (total() > W - 100) { size = Math.floor(size * (W - 100) / total()); ctx.font = font(size); }
  const space = gap();
  const widths = words.map((w) => ctx.measureText(w).width);
  let x = W / 2 - (widths.reduce((a, b) => a + b, 0) + space * (words.length - 1)) / 2;
  const pop = ease.back(clamp((gt - cap.start) / 0.18));
  words.forEach((w, i) => {
    const active = gt >= cap.words[i].t;
    ctx.save();
    ctx.translate(x + widths[i] / 2, y);
    ctx.scale(pop, pop);
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = C.ink; ctx.strokeText(w, -widths[i] / 2, 0);
    ctx.fillStyle = active ? C.yellow : C.white;
    ctx.fillText(w, -widths[i] / 2, 0);
    ctx.restore();
    x += widths[i] + space;
  });
  ctx.restore();
}

window.__render = (gt) => {
  window.__tipActive = false;
  for (const c of new Set([ctx, sctx])) { c.setTransform(1, 0, 0, 1, 0, 0); c.globalAlpha = 1; }
  const sc = timing.scenes;
  let i = sc.findIndex((s) => gt < s.start + s.dur);
  if (i < 0) i = sc.length - 1;
  const t = gt - sc[i].start;
  const tr = video.scenes[i].transition ?? video.meta.transition ?? 'slide';
  if (brush) sctx.clearRect(0, 0, W, H); else ctx.drawImage(paper, 0, 0);
  if (i > 0 && t < TRANSITION && tr !== 'cut' && tr !== 'brush') {
    const e = ease.inOut(t / TRANSITION);
    const prevT = sc[i - 1].dur;
    if (tr === 'slide') {
      sctx.save(); sctx.translate(-W * e, 0); drawScene(i - 1, prevT, gt, false); sctx.restore();
      sctx.save(); sctx.translate(W * (1 - e), 0); sctx.drawImage(paper, 0, 0); drawScene(i, t, gt); sctx.restore();
    } else {
      sctx.save(); sctx.globalAlpha = 1 - e; drawScene(i - 1, prevT, gt, false); sctx.restore();
      sctx.save(); sctx.globalAlpha = e; drawScene(i, t, gt); sctx.restore();
    }
  } else {
    drawScene(i, t, gt);
  }
  if (brush) brush.compose(ctx, paper, gt);
  // quệt cọ qua đường nối cảnh: phủ trong WIPE giây cuối cảnh trước, mở trong WIPE giây đầu cảnh sau
  const wipeOf = (j) => (video.scenes[j]?.transition ?? video.meta.transition) === 'brush';
  const wc = video.meta.brush?.wipe;
  if (i > 0 && wipeOf(i) && t < WIPE) brushWipe(ctx, W, H, 0.5 + t / (2 * WIPE), wc, i);
  else if (i + 1 < sc.length && wipeOf(i + 1) && t > sc[i].dur - WIPE) brushWipe(ctx, W, H, (t - (sc[i].dur - WIPE)) / (2 * WIPE), wc, i + 1);
  // hậu kỳ: meta.post (preset/tuỳ chỉnh), cảnh ghi đè bằng scene.post (false = tắt)
  const pp = video.scenes[i].post ?? video.meta.post;
  if (pp && !window.__noPost) (post ??= makePost(W, H)).apply(ctx, gt, pp); // __noPost: dò chuyển động không tính hạt phim
  if (video.meta.captions) drawCaptions(gt);
};

// Nạp các khung clip mà lần vẽ vừa rồi cần (k.clip ghi vào kit.pendingClips).
async function loadPendingClips() {
  const urls = [...kit.pendingClips]; kit.pendingClips.clear();
  await Promise.all(urls.map((u) => new Promise((ok) => {
    const img = new Image();
    img.onload = () => { kit.clipCache.set(u, img); ok(); };
    img.onerror = () => { console.error('Không tải được khung clip ' + u); ok(); };
    img.src = u;
  })));
  while (kit.clipCache.size > 150) kit.clipCache.delete(kit.clipCache.keys().next().value);
}
// Vẽ khung gt; nếu có khung clip chưa nạp thì nạp rồi vẽ lại (tối đa 3 lần) — render không bao giờ thiếu khung clip.
async function renderReady(gt) {
  for (let i = 0; i < 3; i++) {
    window.__render(gt);
    if (!kit.pendingClips?.size) return;
    await loadPendingClips();
  }
}
// Vẽ khung gt lên canvas (không nén) — dùng cho dò chuyển động ở bước --stills.
window.__draw = async (gt) => { await renderReady(gt); };
window.__frame = async (gt, q = 0.92) => { await renderReady(gt); return canvas.toDataURL('image/jpeg', q); };
// Khung hình + cờ "bút đang vẽ" (để ghép tiếng bút chì).
window.__frameTip = async (gt) => [await window.__frame(gt), window.__tipActive];

window.__thumbnail = () => {
  for (const c of new Set([ctx, sctx])) c.setTransform(1, 0, 0, 1, 0, 0);
  if (brush) sctx.clearRect(0, 0, W, H); else ctx.drawImage(paper, 0, 0);
  // không có thumbnail(k) riêng → dùng khung cuối cảnh đầu (đủ cue thật của cảnh đó)
  const s0 = timing.scenes[0];
  if (video.thumbnail) kit.begin({ scene: 999, t: 1e9, d: 1, gt: 0, cues: {}, still: true, pencil: false });
  else kit.begin({ scene: 0, t: s0.dur, d: s0.dur, gt: s0.start + s0.dur, cues: s0.cues, still: true, pencil: false });
  sctx.save();
  (video.thumbnail ?? video.scenes[0].draw)(kit);
  sctx.restore();
  // thumbnail giữ nét sắc (không rung, không phủ màu nước) — trừ khi meta.brush.thumb = true
  if (brush) { if (video.meta.brush?.thumb) brush.compose(ctx, paper, 0); else { ctx.drawImage(paper, 0, 0); ctx.drawImage(brush.buf, 0, 0); } }
  return canvas.toDataURL('image/png');
};

// ---------- chế độ xem trước ----------
async function preview() {
  const slug = new URLSearchParams(location.search).get('v');
  if (!slug) { document.body.innerHTML = '<p style="color:#eee;font:20px sans-serif;padding:2em">Mở player.html?v=&lt;tên-thư-mục-video&gt;</p>'; return; }
  const tm = await (await fetch(`/output/${slug}/timing.json?${Date.now()}`)).json();
  await window.__setup({ slug, timing: tm, bust: `?${Date.now()}` });
  const audio = new Audio(`/output/${slug}/narration.m4a?${Date.now()}`);
  const bar = document.getElementById('bar'), fill = document.getElementById('fill'), info = document.getElementById('info');
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const loop = () => {
    const gt = Math.min(audio.currentTime, tm.total - 0.001);
    window.__render(gt);
    if (kit.pendingClips?.size && !kit.loadingClips) { kit.loadingClips = true; loadPendingClips().then(() => { kit.loadingClips = false; }); }
    fill.style.width = `${(gt / tm.total) * 100}%`;
    const i = tm.scenes.findIndex((s) => gt < s.start + s.dur);
    info.textContent = `${fmt(gt)} / ${fmt(tm.total)}  ·  cảnh ${i + 1}/${tm.scenes.length}  ·  Space: phát/dừng, ←/→: tua 5s`;
    requestAnimationFrame(loop);
  };
  loop();
  addEventListener('keydown', (e) => {
    if (e.code === 'Space') { e.preventDefault(); audio.paused ? audio.play() : audio.pause(); }
    if (e.code === 'ArrowRight') audio.currentTime += 5;
    if (e.code === 'ArrowLeft') audio.currentTime -= 5;
  });
  bar.addEventListener('click', (e) => { audio.currentTime = (e.offsetX / bar.clientWidth) * tm.total; });
  canvas.addEventListener('click', () => (audio.paused ? audio.play() : audio.pause()));
}
if (!window.__HEADLESS) preview().catch((e) => { document.getElementById('info').textContent = e.message; });
