#!/usr/bin/env node
// Ảnh thật có giấy phép rõ ràng cho video (NASA + Wikimedia Commons; ESA/Hubble/Webb nằm trên Commons với CC BY 4.0).
//
//   node scripts/anh-that.mjs search "blue whale" [--src all|nasa|commons] [--n 12]
//       → in danh sách đánh số (giấy phép, cỡ, tác giả) + ghép ảnh nhỏ thành .cache/anh-that/sheet.jpg để xem nhanh.
//   node scripts/anh-that.mjs get <slug> <số|nasa:ID|commons:File:Tên.jpg> --name ten-anh [--focus 0.5,0.4]
//       → tải về videos/<slug>/assets/ten-anh.jpg (cạnh dài ≤ 2560) + ghi videos/<slug>/assets/credits.json.
//   node scripts/anh-that.mjs list <slug>         → các ảnh đã tải + ghi công.
// CLIP (video thật):
//   search "<từ khoá>" --video [--src nasa|commons]   → tìm video (NASA public domain, Commons CC0/BY/BY-SA)
//   get <slug> <số> --name ten-clip --from 3 --dur 6    → tải, cắt đoạn [from, from+dur] giây, BỎ TIẾNG, chuẩn hoá 30 khung/giây
//       (lặp/bỏ khung đều, không nội suy), tách khung JPEG chất lượng cao → videos/<slug>/assets/clips/<tên>/0001.jpg…
//       Dùng trong video.js: k.clip('ten-clip', x, y, w, h, { at: 'cue', speed, loop, zoom, pan, … }).
//   Ưu tiên nguồn ≥ 1080p và 30/60 khung/giây (clip 24 khung/giây chỉ nên dùng cho cảnh chuyển động chậm).
//
// Trong video.js: k.photo('ten-anh', …) — ảnh trong credits.json tự được nạp, không cần khai báo meta.images.
// build.mjs tự chèn mục "Nguồn hình ảnh" vào mô tả từ credits.json.
// Giấy phép cho phép: public domain (NASA/NOAA/PD), CC0, CC BY, CC BY-SA. Loại: NC, ND, "fair use", không rõ.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, run } from './lib.mjs';

const UA = 'ytbcreator-anh-that/1.0 (educational video tool)';
const CACHE = path.join(ROOT, '.cache', 'anh-that');
fs.mkdirSync(CACHE, { recursive: true });
const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const pos = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1].startsWith('--')));
const [cmd, ...rest] = pos;

const strip = (h = '') => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim();
// Wikimedia giới hạn tốc độ (429) → chờ theo Retry-After (hoặc tăng dần) rồi thử lại.
async function getJSON(url) {
  for (let i = 0; ; i++) {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (r.ok) return r.json();
    if ((r.status !== 429 && r.status < 500) || i >= 5) throw new Error(`${r.status} ${url}`);
    const wait = Math.min(60, +(r.headers.get('retry-after') ?? 0) || 3 * 2 ** i);
    console.error(`  (Wikimedia bắt chờ ${wait}s…)`);
    await new Promise((res) => setTimeout(res, wait * 1000));
  }
}

// Giấy phép Commons → { ok, label, url }
function commonsLicense(m) {
  const short = strip(m.LicenseShortName?.value ?? '');
  const code = (m.License?.value ?? '').toLowerCase();
  const all = `${short} ${code}`.toLowerCase();
  if (/(^|[^a-z])(nc|nd)([^a-z]|$)|non-?commercial|no ?deriv|fair use|copyrighted/.test(all)) return { ok: false, label: short || code };
  const ok = /^(pd|cc0|cc-zero)/.test(code) || /public domain|^cc0/.test(short.toLowerCase()) || /^cc-by(-sa)?-[\d.]+/.test(code) || /^cc by(-sa)? [\d.]+/.test(short.toLowerCase());
  return { ok, label: short || code, url: m.LicenseUrl?.value };
}

async function searchCommons(q, n, video = false) {
  const u = new URL('https://commons.wikimedia.org/w/api.php');
  Object.entries({
    action: 'query', format: 'json', generator: 'search', gsrsearch: `filetype:${video ? 'video' : 'bitmap'} ${q}`, gsrnamespace: '6', gsrlimit: String(n * 2),
    prop: 'imageinfo', iiprop: 'url|extmetadata|size|mime', iiurlwidth: '480',
  }).forEach(([k, v]) => u.searchParams.set(k, v));
  const d = await getJSON(u);
  return Object.values(d.query?.pages ?? {}).sort((a, b) => a.index - b.index).map((p) => {
    const ii = p.imageinfo?.[0]; if (!ii || !(video ? /video|ogg|webm/ : /jpeg|png/).test(ii.mime)) return null;
    const m = ii.extmetadata ?? {};
    const lic = commonsLicense(m);
    return {
      src: 'commons', id: p.title, title: strip(m.ObjectName?.value) || p.title.replace(/^File:|\.\w+$/g, ''),
      author: strip(m.Artist?.value) || strip(m.Credit?.value) || 'Wikimedia Commons', license: lic.label, licenseUrl: lic.url, ok: lic.ok,
      w: ii.width, h: ii.height, thumb: ii.thumburl ?? (video ? null : ii.url), full: video ? ii.url : null, page: ii.descriptionurl,
      kind: video ? 'video' : 'image', dur: ii.duration,
    };
  }).filter(Boolean).slice(0, n);
}

async function searchNasa(q, n, video = false) {
  const d = await getJSON(`https://images-api.nasa.gov/search?media_type=${video ? 'video' : 'image'}&q=${encodeURIComponent(q)}`);
  return (d.collection?.items ?? []).slice(0, n).map((it) => {
    const x = it.data?.[0] ?? {};
    const desc = `${x.description ?? ''} ${x.photographer ?? ''} ${x.secondary_creator ?? ''}`;
    // Ảnh NASA phần lớn không có bản quyền; ảnh ghi © / copyright của bên thứ ba thì loại.
    const third = /©|copyright|getty|reuters|associated press|\bAP\b/i.test(desc);
    return {
      src: 'nasa', id: x.nasa_id, title: x.title ?? x.nasa_id, author: [x.photographer, x.secondary_creator, x.center && `NASA ${x.center}`].filter(Boolean).join(' / ') || 'NASA',
      license: third ? 'bên thứ ba (có ©)' : 'Public domain (NASA)', licenseUrl: 'https://www.nasa.gov/nasa-brand-center/images-and-media/', ok: !third,
      w: null, h: null, thumb: it.links?.find((l) => /\.(jpe?g|png)$/i.test(l.href))?.href ?? it.links?.[0]?.href, full: null, page: `https://images.nasa.gov/details/${encodeURIComponent(x.nasa_id)}`,
      kind: video ? 'video' : 'image',
    };
  });
}

// File mp4 của video NASA: bản gốc nếu ≤ 600 MB, không thì ~large → ~medium.
async function nasaVideo(id) {
  const d = await getJSON(`https://images-api.nasa.gov/asset/${encodeURIComponent(id)}`);
  const hrefs = (d.collection?.items ?? []).map((i) => i.href.replace(/^http:/, 'https:')).filter((h) => /\.(mp4|mov)$/i.test(h));
  const orig = hrefs.find((h) => /~orig\./i.test(h));
  if (orig) {
    const r = await fetch(orig, { method: 'HEAD', headers: { 'User-Agent': UA } }).catch(() => null);
    if (r?.ok && +(r.headers.get('content-length') ?? 0) <= 600e6) return orig;
  }
  return hrefs.find((h) => /~large\./i.test(h)) ?? hrefs.find((h) => /~medium\./i.test(h)) ?? orig ?? hrefs[0];
}

async function nasaFull(id) {
  const d = await getJSON(`https://images-api.nasa.gov/asset/${encodeURIComponent(id)}`);
  const hrefs = (d.collection?.items ?? []).map((i) => i.href.replace(/^http:/, 'https:'));
  return hrefs.find((h) => /~large\.jpg$/i.test(h)) ?? hrefs.find((h) => /~orig\.(jpe?g|png)$/i.test(h)) ?? hrefs.find((h) => /~medium\.jpg$/i.test(h)) ?? hrefs[0];
}

// Wikimedia trả 429 khi tải dồn dập → chờ tăng dần rồi thử lại.
async function download(url, file) {
  for (let i = 0; ; i++) {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (r.ok) { fs.writeFileSync(file, Buffer.from(await r.arrayBuffer())); return; }
    if ((r.status !== 429 && r.status < 500) || i >= 4) throw new Error(`Tải ${url} lỗi ${r.status}`);
    await new Promise((res) => setTimeout(res, 2000 * 2 ** i));
  }
}
// Bản lớn của một file Commons: ưu tiên ảnh thu nhỏ cỡ chuẩn (thumb.wikimedia.org, ít bị chặn 429),
// thử 2560 → 1920 → 1280 px (chỉ cỡ nhỏ hơn ảnh gốc), cuối cùng mới tải ảnh gốc. Trả danh sách URL để thử lần lượt.
async function commonsFull(title, w) {
  const urls = [];
  for (const size of [2560, 1920, 1280].filter((x) => !w || x < w)) {
    const u = new URL('https://commons.wikimedia.org/w/api.php');
    Object.entries({ action: 'query', format: 'json', titles: title, prop: 'imageinfo', iiprop: 'url', iiurlwidth: String(size) }).forEach(([k, v]) => u.searchParams.set(k, v));
    const ii = Object.values((await getJSON(u)).query.pages)[0].imageinfo[0];
    if (ii.thumburl && /thumb\.wikimedia|\/thumb\//.test(ii.thumburl)) urls.push(ii.thumburl);
  }
  if (!urls.length) {
    const u = new URL('https://commons.wikimedia.org/w/api.php');
    Object.entries({ action: 'query', format: 'json', titles: title, prop: 'imageinfo', iiprop: 'url' }).forEach(([k, v]) => u.searchParams.set(k, v));
    urls.push(Object.values((await getJSON(u)).query.pages)[0].imageinfo[0].url);
  }
  return urls;
}

// Ghép ảnh nhỏ có đánh số → sheet.jpg (xem nhanh để chọn).
async function contactSheet(items) {
  const dir = path.join(CACHE, 'thumbs');
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const tiles = [];
  const blank = path.join(dir, 'blank.jpg');
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'lavfi', '-i', 'color=c=0x333333:s=400x300', '-frames:v', '1', blank]);
  for (const [i, it] of items.entries()) {
    if (!it.thumb) { tiles.push(blank); continue; }
    const raw = path.join(dir, `${i}.src`), tile = path.join(dir, `${String(i + 1).padStart(2, '0')}.jpg`);
    try {
      await download(it.thumb, raw);
      // (ffmpeg bản Homebrew thường thiếu drawtext → không dán số; ảnh xếp đúng thứ tự danh sách, trái→phải, trên→dưới.)
      const vf = `scale=400:300:force_original_aspect_ratio=increase,crop=400:300${it.ok ? '' : ',drawbox=x=0:y=0:w=400:h=300:color=red:t=14'}`;
      await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-vf', vf, '-frames:v', '1', tile]);
      tiles.push(tile);
    } catch (e) { console.error(`  ảnh nhỏ ${i + 1}: ${e.message}`); tiles.push(blank); }
  }
  if (!tiles.length) return null;
  const out = path.join(CACHE, 'sheet.jpg');
  // ô xám = không tải được ảnh nhỏ (vẫn giữ đúng vị trí số thứ tự)
  const n = tiles.length;
  const layout = tiles.map((_, i) => `${(i % 4) * 406}_${Math.floor(i / 4) * 306}`).join('|');
  const args = ['-y', '-loglevel', 'error', ...tiles.flatMap((t) => ['-i', t])];
  if (n === 1) args.push('-frames:v', '1', out);
  else args.push('-filter_complex', `xstack=inputs=${n}:layout=${layout}:fill=white`, '-frames:v', '1', out);
  await run('ffmpeg', args);
  return out;
}

// Tải video, cắt đoạn, bỏ tiếng, chuẩn hoá 30 khung/giây, tách khung JPEG → assets/clips/<tên>/; ghi credits.json (type: 'clip').
async function getClip(slug, name, it) {
  const url = it.src === 'nasa' ? await nasaVideo(it.id) : it.full;
  if (!url) throw new Error('Không tìm được file video gốc');
  const vdir = path.join(CACHE, 'video'); fs.mkdirSync(vdir, { recursive: true });
  const raw = path.join(vdir, `${it.src}-${String(it.id).replace(/[^\w.-]+/g, '_').slice(0, 80)}${path.extname(new URL(url).pathname) || '.mp4'}`);
  if (!fs.existsSync(raw)) { console.error(`  tải ${url} …`); await download(url, raw); }
  const probe = JSON.parse(await run('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate:format=duration', '-of', 'json', raw]));
  const st = probe.streams[0]; const [a, b] = st.r_frame_rate.split('/').map(Number); const srcFps = +(a / (b || 1)).toFixed(2);
  const from = +opt('from', 0), dur = +opt('dur', 6);
  const dir = path.join(ROOT, 'videos', slug, 'assets', 'clips', name);
  fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(from), '-t', String(dur), '-i', raw, '-an',
    '-vf', "fps=30,scale='min(1920,iw)':-2", '-q:v', '2', path.join(dir, '%04d.jpg')]);
  const frames = fs.readdirSync(dir).filter((f) => f.endsWith('.jpg')).length;
  if (!frames) throw new Error('Không tách được khung nào (kiểm tra --from/--dur so với độ dài video)');
  const dims = (await run('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', path.join(dir, '0001.jpg')])).trim().split(',').map(Number);
  const credits = readCredits(slug).filter((c) => c.name !== name);
  credits.push({ name, type: 'clip', dir: `assets/clips/${name}`, frames, fps: 30, srcFps, srcW: st.width, srcH: st.height, from, w: dims[0], h: dims[1],
    src: it.src, id: it.id, title: it.title, author: it.author, license: it.license, licenseUrl: it.licenseUrl, page: it.page });
  fs.writeFileSync(creditsFile(slug), JSON.stringify(credits, null, 2));
  const warn = [st.width < 1920 ? `gốc chỉ ${st.width}×${st.height} → nên dùng khung nhỏ, đừng để full màn hình` : '', srcFps < 29 ? `gốc ${srcFps} khung/giây → chỉ hợp cảnh chuyển động chậm` : ''].filter(Boolean);
  console.log(`✓ clip ${name}: ${frames} khung (${(frames / 30).toFixed(1)}s) · ${dims.join('×')} · gốc ${st.width}×${st.height} @ ${srcFps} khung/giây · ${it.license}${warn.length ? `\n  ⚠️ ${warn.join(' · ')}` : ''}\n  Dùng: k.clip('${name}', …)`);
}

const creditsFile = (slug) => path.join(ROOT, 'videos', slug, 'assets', 'credits.json');
const readCredits = (slug) => (fs.existsSync(creditsFile(slug)) ? JSON.parse(fs.readFileSync(creditsFile(slug), 'utf8')) : []);

if (cmd === 'search') {
  const q = rest.join(' ');
  if (!q) throw new Error('Thiếu từ khoá: node scripts/anh-that.mjs search "blue whale"');
  const src = opt('src', 'all'), n = +opt('n', 12), video = argv.includes('--video');
  const lists = await Promise.all([
    src === 'all' || src === 'nasa' ? searchNasa(q, src === 'all' ? Math.ceil(n / 2) : n, video).catch((e) => (console.error('NASA:', e.message), [])) : [],
    src === 'all' || src === 'commons' ? searchCommons(q, src === 'all' ? Math.ceil(n / 2) : n, video).catch((e) => (console.error('Commons:', e.message), [])) : [],
  ]);
  const items = lists.flat();
  fs.writeFileSync(path.join(CACHE, 'last.json'), JSON.stringify({ q, items }, null, 2));
  items.forEach((it, i) => console.log(`${String(i + 1).padStart(2)}. ${it.ok ? '✓' : '✗'} [${it.src}${it.kind === 'video' ? ' · VIDEO' : ''}] ${it.title.slice(0, 60)}${it.w ? ` · ${it.w}×${it.h}` : ''}${it.dur ? ` · ${Math.round(it.dur)}s` : ''}\n      ${it.license} · ${it.author.slice(0, 70)}\n      ${it.page}`));
  const sheet = await contactSheet(items);
  if (sheet) console.log(`\nẢnh xem nhanh: ${sheet}   (xếp theo thứ tự 1, 2, 3… trái→phải; khung đỏ = giấy phép không dùng được)`);
} else if (cmd === 'get') {
  const [slug, ref] = rest;
  const name = opt('name');
  if (!slug || !ref || !name) throw new Error('Cú pháp: get <slug> <số|nasa:ID|commons:File:…> --name ten-anh');
  if (!/^[a-z0-9-]+$/.test(name)) throw new Error('--name chỉ gồm chữ thường, số, gạch ngang');
  let it;
  if (/^\d+$/.test(ref)) it = JSON.parse(fs.readFileSync(path.join(CACHE, 'last.json'), 'utf8')).items[+ref - 1];
  else if (ref.startsWith('nasa:')) it = (await searchNasa(ref.slice(5), 5)).find((x) => x.id === ref.slice(5));
  else if (ref.startsWith('commons:')) {
    // tên file có thể viết bằng "_" (như URL) hoặc dấu cách
    const norm = (s) => s.replace(/_/g, ' ');
    it = (await searchCommons(`"${norm(ref.slice(8).replace(/^File:|\.\w+$/g, ''))}"`, 5)).find((x) => norm(x.id) === norm(ref.slice(8)));
  }
  if (!it) throw new Error(`Không tìm thấy ảnh ${ref}`);
  if (!it.ok && !argv.includes('--force-license')) throw new Error(`Giấy phép "${it.license}" không dùng được cho video (NC/ND/không rõ). Chọn ảnh khác.`);
  if (it.kind === 'video') { await getClip(slug, name, it); process.exit(0); }
  const urls = it.src === 'nasa' ? [await nasaFull(it.id)] : await commonsFull(it.id, it.w);
  const dir = path.join(ROOT, 'videos', slug, 'assets');
  fs.mkdirSync(dir, { recursive: true });
  const raw = path.join(CACHE, `dl-${Date.now()}`);
  let lastErr;
  for (const url of urls) { try { await download(url, raw); lastErr = null; break; } catch (e) { lastErr = e; } }
  if (lastErr) throw lastErr;
  const file = path.join(dir, `${name}.jpg`);
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-vf', "scale='if(gt(iw,ih),min(2560,iw),-2)':'if(gt(iw,ih),-2,min(2560,ih))'", '-q:v', '3', file]);
  fs.unlinkSync(raw);
  const dims = (await run('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', file])).trim().split(',').map(Number);
  const credits = readCredits(slug).filter((c) => c.name !== name);
  const focus = opt('focus')?.split(',').map(Number);
  credits.push({ name, file: `assets/${name}.jpg`, w: dims[0], h: dims[1], src: it.src, id: it.id, title: it.title, author: it.author, license: it.license, licenseUrl: it.licenseUrl, page: it.page, ...(focus ? { focus } : {}) });
  fs.writeFileSync(creditsFile(slug), JSON.stringify(credits, null, 2));
  console.log(`✓ ${path.relative(ROOT, file)} (${dims.join('×')}) · ${it.license} · ${it.author}\n  Dùng: k.photo('${name}', …)`);
} else if (cmd === 'list') {
  for (const c of readCredits(rest[0])) console.log(`${c.name.padEnd(22)} ${c.type === 'clip' ? `CLIP ${c.frames} khung (${(c.frames / c.fps).toFixed(1)}s, gốc ${c.srcFps} khung/giây) ` : ''}${c.w}×${c.h}  ${c.license} · ${c.author}\n${' '.repeat(23)}${c.page}`);
} else {
  console.log('Lệnh: search "<từ khoá>" | get <slug> <số> --name <tên> | list <slug>  (xem đầu file)');
}
