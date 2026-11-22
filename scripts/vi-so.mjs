// Đọc số tiếng Việt cho TTS (OmniVoice tự chuẩn hoá số sai, vd "2022" → "hai nghìn lẻ hai hai").
// speakVi(text) → { spoken, counts }: spoken = câu đã đổi số thành chữ; counts[i] = số từ đọc của từ gốc thứ i
// (từ gốc = text.split(/\s+/)), để gom mốc thời gian từng từ về lại câu gốc (phụ đề vẫn hiện "2022").
// Hỗ trợ: 2022 · 8.336 (dấu chấm nghìn) · 2,5 (phẩy thập phân) · 22% · 15/8/1977 · 8/1977 · ~400. Từ có chữ cái (3I/ATLAS, KIC) giữ nguyên.
const D = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

// Ba chữ số; full = nhóm không đứng đầu (đọc đủ "không trăm", "lẻ").
function triple(n, full) {
  const h = Math.floor(n / 100), t = Math.floor(n / 10) % 10, u = n % 10, w = [];
  if (h > 0 || full) w.push(D[h], 'trăm');
  if (t === 0) { if (u > 0) { if (h > 0 || full) w.push('lẻ'); w.push(D[u]); } }
  else if (t === 1) { w.push('mười'); if (u === 5) w.push('lăm'); else if (u > 0) w.push(D[u]); }
  else { w.push(D[t], 'mươi'); if (u === 1) w.push('mốt'); else if (u === 4) w.push('tư'); else if (u === 5) w.push('lăm'); else if (u > 0) w.push(D[u]); }
  return w;
}
export function readInt(n) {
  n = Math.floor(Number(n));
  if (!Number.isFinite(n) || n < 0) return [String(n)];
  if (n === 0) return ['không'];
  const units = ['', 'nghìn', 'triệu', 'tỷ'], groups = [];
  for (let x = n; x > 0; x = Math.floor(x / 1000)) groups.push(x % 1000);
  if (groups.length > 4) return String(n).split('').map((c) => D[+c]);
  const w = [];
  for (let g = groups.length - 1; g >= 0; g--) {
    if (groups[g] === 0) continue;
    w.push(...triple(groups[g], g < groups.length - 1), ...(units[g] ? [units[g]] : []));
  }
  return w;
}

// Một từ gốc → các từ đọc (giữ dấu câu đầu/cuối dính vào từ đầu/cuối).
function speakToken(tok) {
  const m = tok.match(/^([("“'‘]*)(.*?)([.,;:!?…)"”'’]*)$/u);
  const [, pre, core0, post] = m;
  let core = core0, w = null;
  const approx = core.startsWith('~') ? (core = core.slice(1), ['khoảng']) : [];
  let pct = false;
  if (/%$/.test(core)) { pct = true; core = core.slice(0, -1); }
  let r;
  if ((r = core.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/))) w = [...readInt(r[1]), 'tháng', ...readInt(r[2]), 'năm', ...readInt(r[3])];
  else if ((r = core.match(/^(\d{1,2})\/(\d{4})$/))) w = ['tháng', ...readInt(r[1]), 'năm', ...readInt(r[2])];
  else if (/^\d{1,3}(\.\d{3})+$/.test(core)) w = readInt(core.replace(/\./g, ''));
  else if ((r = core.match(/^(\d+),(\d+)$/))) w = [...readInt(r[1]), 'phẩy', ...(r[2].startsWith('0') ? r[2].split('').map((c) => D[+c]) : readInt(r[2]))];
  else if (/^\d+$/.test(core)) w = readInt(core);
  if (!w) return [tok];
  w = [...approx, ...w, ...(pct ? ['phần', 'trăm'] : [])];
  w[0] = pre + w[0]; w[w.length - 1] += post;
  return w;
}

export function speakVi(text) {
  const toks = text.split(/\s+/).filter(Boolean);
  const parts = toks.map(speakToken);
  return { spoken: parts.flat().join(' '), counts: parts.map((p) => p.length), changed: parts.some((p, i) => p.length !== 1 || p[0] !== toks[i]) };
}

// Gom mốc thời gian các từ đọc về từ gốc: words (theo spoken) → words theo text gốc.
export function regroupWords(words, text, counts) {
  const toks = text.split(/\s+/).filter(Boolean);
  const total = counts.reduce((a, b) => a + b, 0);
  const scale = words.length / total; // server trả lệch số từ → chia theo tỉ lệ
  const out = []; let acc = 0;
  toks.forEach((tok, i) => {
    const a = Math.min(words.length - 1, Math.round(acc * scale)), b = Math.max(a, Math.min(words.length - 1, Math.round((acc + counts[i]) * scale) - 1));
    out.push({ t: words[a].t, d: +(words[b].t + words[b].d - words[a].t).toFixed(3), text: tok });
    acc += counts[i];
  });
  return out;
}
