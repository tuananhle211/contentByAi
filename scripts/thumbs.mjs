#!/usr/bin/env node
// Render các mẫu thumbnail của một video: mỗi hàm export trong videos/<slug>/thumbs.js → output/<slug>/thumb-<tên>.jpg (1280x720)
// kèm bảng so sánh thumbs-preview.jpg (cỡ lớn + cỡ nhỏ như trên điện thoại).
//   node scripts/thumbs.mjs <slug>
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { serve, run, resolveVideo } from './lib.mjs';

const { slug, dir, out } = resolveVideo(process.argv[2]);
if (!fs.existsSync(path.join(dir, 'thumbs.js'))) throw new Error(`Chưa có videos/${slug}/thumbs.js`);
fs.mkdirSync(out, { recursive: true });

const { server, url } = await serve();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.addInitScript(() => { window.__HEADLESS = true; });
await page.goto(`${url}/engine/player.html`);
const shots = await page.evaluate(async (slug) => {
  const { Kit } = await import('/engine/kit.js');
  const mod = await import(`/videos/${slug}/thumbs.js?${Date.now()}`);
  await Promise.all(['56px "Patrick Hand"', '56px Pangolin', '500 56px "Be Vietnam Pro"', '800 56px "Be Vietnam Pro"'].map((f) => document.fonts.load(f, 'Tiếng Việt')));
  // Ảnh cho thumbnail: meta.images của video + ảnh thật trong assets/credits.json (scripts/anh-that.mjs).
  let map = {};
  const credits = {};
  try { map = { ...((await import(`/videos/${slug}/video.js`)).default.meta.images ?? {}) }; } catch { /* không có video.js */ }
  try { const r = await fetch(`/videos/${slug}/assets/credits.json`); if (r.ok) for (const c of await r.json()) { credits[c.name] = c; map[c.name] ??= c.file; } } catch { /* không có ảnh thật */ }
  const images = {};
  await Promise.all(Object.entries(map).map(([n, f]) => new Promise((ok) => { const img = new Image(); img.onload = () => { images[n] = img; ok(); }; img.onerror = ok; img.src = `/videos/${slug}/${f}`; })));
  const res = {};
  for (const [name, fn] of Object.entries(mod)) {
    if (typeof fn !== 'function' || name === 'style') continue;
    const c = document.createElement('canvas');
    c.width = 1920; c.height = 1080;
    const k = new Kit(c, { W: 1920, H: 1080, style: mod.style, images });
    k.credits = credits;
    k.begin({ scene: 0, t: 1e9, d: 1, gt: 0.2, still: true, pencil: false });
    fn(k);
    res[name] = c.toDataURL('image/png');
  }
  return res;
}, slug);
await browser.close();
server.close();

const files = [];
for (const [name, png] of Object.entries(shots)) {
  const tmp = path.join(out, `.thumb-${name}.png`);
  const jpg = path.join(out, `thumb-${name}.jpg`);
  fs.writeFileSync(tmp, Buffer.from(png.split(',')[1], 'base64'));
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmp, '-vf', 'scale=1280:720', '-q:v', '2', jpg]);
  fs.unlinkSync(tmp);
  files.push(jpg);
  console.log(`› ${path.relative(process.cwd(), jpg)}`);
}
// Bảng so sánh: hàng trên cỡ 640x360, hàng dưới cỡ 320x180 (như trong lưới đề xuất trên điện thoại).
if (files.length) {
  const n = files.length;
  const inputs = files.flatMap((f) => ['-i', f]);
  const big = files.map((_, i) => `[${i}]split[s${i}a][s${i}b];[s${i}a]scale=640:360[b${i}];[s${i}b]scale=320:180,pad=640:200:0:10:0xf4f2ec[m${i}]`).join(';');
  const fc = `${big};${files.map((_, i) => `[b${i}]`).join('')}hstack=${n}[top];${files.map((_, i) => `[m${i}]`).join('')}hstack=${n}[bot];[top][bot]vstack=2`;
  await run('ffmpeg', ['-y', '-loglevel', 'error', ...inputs, '-filter_complex', n > 1 ? fc : `${big};[b0][m0]vstack=2`, path.join(out, 'thumbs-preview.jpg')]);
  console.log(`› ${path.relative(process.cwd(), path.join(out, 'thumbs-preview.jpg'))}`);
}
