#!/usr/bin/env node
// Đào ý tưởng video từ gợi ý tìm kiếm YouTube (miễn phí, không tốn hạn mức API).
//   node scripts/niche/ideas.mjs "truyền thuyết việt nam" "thần thoại việt nam" [--deep] [--out file.json]
// --deep: thêm "seed + a…z" và tiền tố câu hỏi ("tại sao", "ai là"…) → nhiều gợi ý hơn (~40 yêu cầu/seed).
// Gợi ý xuất hiện từ NHIỀU truy vấn khác nhau = chủ đề người xem tìm nhiều.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { ROOT } from '../lib.mjs';

const argv = process.argv.slice(2);
const deep = argv.includes('--deep');
const outIdx = argv.indexOf('--out');
const seeds = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--out');
if (!seeds.length) throw new Error('Ví dụ: node scripts/niche/ideas.mjs "truyền thuyết việt nam" --deep');
const CACHE = path.join(ROOT, '.cache', 'yt');
fs.mkdirSync(CACHE, { recursive: true });

async function suggest(q) {
  const cf = path.join(CACHE, 'ac-' + crypto.createHash('sha1').update(q).digest('hex') + '.json');
  if (fs.existsSync(cf) && Date.now() - fs.statSync(cf).mtimeMs < 7 * 864e5) return JSON.parse(fs.readFileSync(cf, 'utf8'));
  const r = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=vi&gl=VN&q=${encodeURIComponent(q)}`);
  const list = r.ok ? (await r.json())[1] ?? [] : [];
  fs.writeFileSync(cf, JSON.stringify(list));
  await new Promise((res) => setTimeout(res, 120)); // lịch sự với máy chủ gợi ý
  return list;
}

const PREFIX = ['tại sao', 'vì sao', 'ai là', 'sự thật về', 'bí ẩn', 'nguồn gốc', 'top'];
const count = new Map();
for (const seed of seeds) {
  const qs = [seed];
  if (deep) {
    for (const c of 'abcdeghiklmnopqrstuvxy') qs.push(`${seed} ${c}`);
    for (const p of PREFIX) qs.push(`${p} ${seed}`);
  }
  for (const q of qs) for (const s of await suggest(q)) {
    const e = count.get(s) ?? { text: s, hits: 0, from: new Set() };
    e.hits++; e.from.add(seed);
    count.set(s, e);
  }
}
const list = [...count.values()].map((e) => ({ text: e.text, hits: e.hits, seeds: [...e.from] })).sort((a, b) => b.hits - a.hits || a.text.localeCompare(b.text));
if (outIdx >= 0) fs.writeFileSync(path.resolve(argv[outIdx + 1]), JSON.stringify(list, null, 2));
for (const e of list) console.log(`${String(e.hits).padStart(3)}  ${e.text}`);
console.error(`› ${list.length} gợi ý từ ${seeds.length} seed${deep ? ' (deep)' : ''}`);
