#!/usr/bin/env node
// Tìm khung đăng trống sớm nhất của một kênh theo channels[].schedule (data/studio.json),
// bỏ qua khung đã có chủ đề cùng kênh (planAt) hoặc video đã hẹn/đăng trên YouTube (output/<slug>/uploaded.json).
//   node scripts/next-slot.mjs <kênh> [--format long|short] [--after ISO] [--n 2] [--set <slug>] [--set-next <tiêu đề chủ đề>]
//   --after   : chỉ lấy khung sau mốc này (vd lịch của tập trước — giữ đúng thứ tự series)
//   --set     : ghi khung đầu tiên vào planAt của chủ đề có slug này
//   --set-next: ghi khung kế tiếp (khung thứ hai nếu có --set, không thì khung đầu) vào planAt của chủ đề có tiêu đề này (tập sau)
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const chId = args[0];
const fmt = opt('format', 'long');
const n = +opt('n', 2);
const DATA = path.join(ROOT, 'data', 'studio.json');
const db = JSON.parse(fs.readFileSync(DATA, 'utf8'));
const ch = db.channels.find((c) => c.id === chId);
if (!ch?.schedule) throw new Error(`Kênh "${chId}" chưa có schedule trong data/studio.json`);
const rules = ch.schedule;

// Khung đã chiếm: lịch dự kiến + giờ hẹn/đăng thật trên YouTube của mọi video cùng kênh.
const taken = new Set();
for (const t of db.topics.filter((t) => t.channel === chId)) {
  if (t.planAt) taken.add(+new Date(t.planAt));
  const up = t.slug && fs.existsSync(path.join(ROOT, 'output', t.slug, 'uploaded.json')) && JSON.parse(fs.readFileSync(path.join(ROOT, 'output', t.slug, 'uploaded.json'), 'utf8'));
  if (up?.publishAt) taken.add(+new Date(up.publishAt));
}

// Chừa 12 giờ để tải lên + YouTube xử lý; không sớm hơn --after.
const from = Math.max(Date.now() + 12 * 3600e3, opt('after') ? +new Date(opt('after')) + 1 : 0);
const [, sg, hh, mm] = rules.tz.match(/([+-])(\d\d):(\d\d)/);
const off = (sg === '-' ? -1 : 1) * (+hh * 60 + +mm) * 60_000;
const r = rules[fmt];
const slots = [];
for (let d = 0; slots.length < n && d < 400; d++) {
  const day = new Date(from + off + d * 864e5);
  if (!r.days.includes(day.getUTCDay())) continue;
  for (const time of [...(r.times ?? [r.time])].sort()) {
    const at = new Date(`${day.toISOString().slice(0, 10)}T${time}:00${rules.tz}`);
    if (+at > from && !taken.has(+at) && slots.length < n) slots.push(at);
  }
}

const fmtTz = (d, tz) => d.toLocaleString('en-US', { timeZone: tz, weekday: 'long', day: '2-digit', month: '2-digit', hour: 'numeric', minute: '2-digit' });
for (const s of slots) {
  const et = s.toLocaleString('en-US', { timeZone: 'America/New_York', weekday: 'long', hour: 'numeric' }).toUpperCase().replace(/ (\d+) ([AP]M)/, ' · $1 $2');
  console.log(`${s.toISOString()}  | VN ${fmtTz(s, 'Asia/Ho_Chi_Minh')} | ET ${fmtTz(s, 'America/New_York')} | London ${fmtTz(s, 'Europe/London')} | poster "${et.replace(/, /, ' · ')} ET"`);
}

let dirty = false;
const set = (pred, at, label) => {
  const t = db.topics.find(pred);
  if (!t) throw new Error(`Không thấy chủ đề ${label}`);
  t.planAt = at.toISOString(); dirty = true;
  console.log(`› planAt "${t.title}" = ${t.planAt}`);
};
if (opt('set')) set((t) => t.slug === opt('set'), slots[0], opt('set'));
if (opt('set-next')) set((t) => t.channel === chId && t.title === opt('set-next'), slots[opt('set') ? 1 : 0], opt('set-next'));
if (dirty) fs.writeFileSync(DATA, `${JSON.stringify(db, null, 2)}\n`);
