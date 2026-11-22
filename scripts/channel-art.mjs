#!/usr/bin/env node
// Render ảnh đại diện + ảnh bìa kênh → output/channel/
//   npm run art                      → channel/art.js (Vẽ Là Hiểu)
//   npm run art -- <id>              → channel/art-<id>.js → output/channel/<id>/
// Mỗi hàm export là một ảnh: tên bắt đầu bằng 'banner' = 2560x1440, còn lại = 800x800. `export const style` chọn phong cách.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { ROOT, serve } from './lib.mjs';

const id = process.argv[2];
const mod = id ? `/channel/art-${id}.js` : '/channel/art.js';
if (!fs.existsSync(path.join(ROOT, mod))) throw new Error(`Chưa có ${mod.slice(1)}`);
const OUT = path.join(ROOT, 'output', 'channel', id ?? '');
fs.mkdirSync(OUT, { recursive: true });
const { server, url } = await serve();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.addInitScript(() => { window.__HEADLESS = true; });
await page.goto(`${url}/engine/player.html`);
const shots = await page.evaluate(async (mod) => {
  const { Kit } = await import('/engine/kit.js');
  const art = await import(`${mod}?${Date.now()}`);
  await Promise.all(['56px "Patrick Hand"', '56px Pangolin', '500 56px "Be Vietnam Pro"', '800 56px "Be Vietnam Pro"'].map((f) => document.fonts.load(f, 'Tiếng Việt')));
  const res = {};
  for (const [name, fn] of Object.entries(art)) {
    if (typeof fn !== 'function') continue;
    const [W, H] = name.startsWith('banner') ? [2560, 1440] : [800, 800];
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const k = new Kit(c, { W, H, style: art.style });
    k.begin({ scene: 0, t: 1e9, d: 1, gt: 0, still: true, pencil: false });
    fn(k);
    res[name] = c.toDataURL('image/png');
  }
  return res;
}, mod);
for (const [name, png] of Object.entries(shots)) {
  const file = path.join(OUT, `${name}.png`);
  fs.writeFileSync(file, Buffer.from(png.split(',')[1], 'base64'));
  console.log(`› ${path.relative(ROOT, file)}`);
}
await browser.close();
server.close();
