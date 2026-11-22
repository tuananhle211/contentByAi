// Đo ms/khung (vẽ + chép về + nén JPEG, đúng như render) theo từng cảnh: node scripts/bench.mjs <slug> [--cpu]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { serve, ROOT } from './lib.mjs';
const slug = process.argv[2], cpu = process.argv.includes('--cpu');
const timing = JSON.parse(fs.readFileSync(path.join(ROOT, 'output', slug, 'timing.json'), 'utf8'));
const { server, url } = await serve();
const browser = await chromium.launch(cpu ? {} : { args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 640, height: 400 } });
await page.addInitScript(() => { window.__HEADLESS = true; });
await page.goto(`${url}/engine/player.html`);
await page.evaluate((arg) => window.__setup(arg), { slug, timing });
let sum = 0, n = 0;
for (const s of timing.scenes) {
  const ms = await page.evaluate(async ([a, d]) => { for (let j = 0; j < 2; j++) await window.__frame(a + 0.1); const t0 = performance.now(); for (let j = 0; j < 20; j++) await window.__frame(a + 0.2 + d * 0.7 * j / 20); return (performance.now() - t0) / 20; }, [s.start, s.dur]);
  sum += ms * s.dur; n += s.dur;
}
console.log(`${slug} ${cpu ? 'CPU' : 'GPU'}: trung bình ${(sum / n).toFixed(1)} ms/khung → ${(sum / n * 30 / 1000).toFixed(2)} giây máy / 1 giây video (1 tab)`);
await browser.close(); server.close();
