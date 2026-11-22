#!/usr/bin/env node
// Thêm chủ đề vào Studio (data/studio.json), bỏ qua chủ đề trùng tiêu đề.
//   node scripts/niche/add-topics.mjs <topics.json>
// topics.json: { "channel": { "id": "...", "name": "...", "handle": "", "description": "" },   ← tạo kênh nếu chưa có
//                "topics": [{ "title": "...", "pillar": "...", "format": "long|short", "notes": "..." }] }
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { ROOT } from '../lib.mjs';

const file = process.argv[2];
if (!file) throw new Error('Ví dụ: node scripts/niche/add-topics.mjs research/topics-than-thoai.json');
const input = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
const DATA = path.join(ROOT, 'data', 'studio.json');
const db = JSON.parse(fs.readFileSync(DATA, 'utf8'));

const ch = input.channel;
if (!ch?.id) throw new Error('Thiếu channel.id');
if (!db.channels.some((c) => c.id === ch.id)) {
  db.channels.push({ id: ch.id, name: ch.name ?? ch.id, handle: ch.handle ?? '', description: ch.description ?? '' });
  console.log(`› Tạo kênh mới: ${ch.name ?? ch.id}`);
}
const norm = (s) => s.toLowerCase().normalize('NFC').replace(/\s+/g, ' ').trim();
const have = new Set(db.topics.filter((t) => t.channel === ch.id).map((t) => norm(t.title)));
let added = 0;
for (const t of input.topics) {
  if (have.has(norm(t.title))) continue;
  db.topics.push({
    id: crypto.randomBytes(5).toString('hex'), title: t.title.trim(), channel: ch.id, pillar: t.pillar ?? '',
    format: t.format === 'short' ? 'short' : 'long', status: 'idea', notes: t.notes ?? '', slug: null, createdAt: new Date().toISOString(),
  });
  have.add(norm(t.title));
  added++;
}
fs.writeFileSync(DATA + '.tmp', JSON.stringify(db, null, 2));
fs.renameSync(DATA + '.tmp', DATA);
console.log(`› Thêm ${added} chủ đề (bỏ qua ${input.topics.length - added} trùng) cho kênh ${ch.id}`);
