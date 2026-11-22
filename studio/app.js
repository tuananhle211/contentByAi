// Studio — giao diện. Không framework: mỗi tab là một hàm render vào #view.
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const nf = new Intl.NumberFormat('vi-VN');
const fmtNum = (n) => (n == null ? '—' : nf.format(Math.round(n)));
const fmtDur = (s) => (s == null ? '' : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`);
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('vi-VN') : '');
const fmtTime = (d) => (d ? new Date(d).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }) : '');
const fmtSize = (b) => (b ? `${(b / 1e6).toFixed(1)} MB` : '');

const STATUS = { idea: 'Ý tưởng', script: 'Đang viết', rendered: 'Đã render', uploaded: 'Đã đăng (riêng tư)', published: 'Đã công khai' };
const TABS = { overview: 'Tổng quan', videos: 'Video', topics: 'Chủ đề', channels: 'Kênh' };
const PRIVACY = { public: 'Công khai', unlisted: 'Không công khai', private: 'Riêng tư' };

const store = {
  get(k, d) { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
const S = { data: null, channel: store.get('studio.channel', 'all'), stats: {}, videoFilter: 'all', topicQuery: '', openSlug: null, jobStatus: {}, selMode: false, sel: new Set() };

async function api(url, opts = {}) {
  const r = await fetch(url, { ...opts, headers: { 'Content-Type': 'application/json' }, body: opts.body && JSON.stringify(opts.body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error ?? `Lỗi ${r.status}`);
  return j;
}
function toast(msg, ms = 3500) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast.h);
  toast.h = setTimeout(() => { t.hidden = true; }, ms);
}
const tab = () => (TABS[location.hash.slice(1)] ? location.hash.slice(1) : 'overview');
const channels = () => S.data.channels;
const chanName = (id) => channels().find((c) => c.id === id)?.name ?? id;
const inChannel = (x) => S.channel === 'all' || x.channel === S.channel;

// ---------- khung ----------
async function refresh() {
  S.data = await api('/api/state');
  if (S.channel !== 'all' && !channels().some((c) => c.id === S.channel)) S.channel = 'all';
  renderChannelPick();
  renderJobsMini();
}
function renderChannelPick() {
  const sel = $('#channelPick');
  sel.innerHTML = `<option value="all">Tất cả kênh</option>${channels().map((c) => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}`;
  sel.value = S.channel;
}
function renderJobsMini() {
  const active = S.data.jobs.filter((j) => j.status === 'running' || j.status === 'queued');
  $('#jobsMini').innerHTML = active.map((j) => `<div class="job" title="${esc(j.slug)}">${j.status === 'running' ? '⏳' : '🕒'} ${{ build: 'Render', stills: 'Ảnh tĩnh', upload: 'Đăng' }[j.type]} · ${esc(j.slug)}</div>`).join('');
}
function render() {
  hideTip();
  const t = tab();
  document.querySelectorAll('#nav a').forEach((a) => a.classList.toggle('on', a.dataset.tab === t));
  $('#pageTitle').textContent = TABS[t];
  document.title = `${TABS[t]} · Studio`;
  ({ overview: renderOverview, videos: renderVideos, topics: renderTopics, channels: renderChannels })[t]();
}

// ---------- thống kê YouTube ----------
async function loadStats(id, refreshNow = false) {
  if (S.stats[id] && !refreshNow) return S.stats[id];
  try { S.stats[id] = await api(`/api/channels/${id}/stats${refreshNow ? '?refresh=1' : ''}`); } catch (e) { S.stats[id] = { connected: false, error: e.message }; }
  return S.stats[id];
}
function statsByVideoId() {
  const m = new Map();
  for (const st of Object.values(S.stats)) for (const v of st?.videos ?? []) m.set(v.id, v);
  return m;
}

// ---------- Tổng quan ----------
function pipelineHtml(topics) {
  return `<div class="pipeline">${S.data.statuses.map((s) => `<a href="#topics" class="stage"><div class="n">${topics.filter((t) => t.status === s).length}</div><div class="l">${STATUS[s]}</div></a>`).join('')}</div>`;
}
function renderOverview() {
  const topics = S.data.topics.filter(inChannel);
  const videos = S.data.videos.filter(inChannel);
  const v = $('#view');
  v.innerHTML = `
    <section class="card">
      <h2>Sản xuất</h2>
      <p class="sub">${topics.length} chủ đề · ${videos.length} video · ${videos.filter((x) => x.rendered).length} đã render</p>
      ${pipelineHtml(topics)}
    </section>
    ${channels().filter((c) => S.channel === 'all' || c.id === S.channel).map(planCard).join('')}
    <div id="yt" class="view" style="padding:0">${S.channel === 'all'
      ? channels().map((c) => `<section class="card" id="yt-${esc(c.id)}"><h2>${esc(c.name)}</h2><p class="muted">Đang tải số liệu YouTube…</p></section>`).join('')
      : `<section class="card"><p class="muted">Đang tải số liệu YouTube…</p></section>`}</div>`;
  // có số liệu YouTube → cập nhật trạng thái "đã hẹn / đã lên sóng" trong lịch
  const replan = (c) => { const el = $(`#plan-${CSS.escape(c.id)}`); if (el && tab() === 'overview') el.outerHTML = planCard(c); };
  if (S.channel === 'all') {
    for (const c of channels()) loadStats(c.id).then((st) => { const el = $(`#yt-${CSS.escape(c.id)}`); if (el && tab() === 'overview') el.outerHTML = channelSummary(c, st); replan(c); });
  } else {
    const c = channels().find((x) => x.id === S.channel);
    loadStats(c.id).then((st) => { if (tab() === 'overview' && S.channel === c.id) { renderYT(c, st); replan(c); } });
  }
}

function notConnectedHtml(c, st) {
  if (!S.data.hasClient) {
    return `<div class="card notice"><h2>${esc(c.name)} — chưa kết nối YouTube</h2>
      <p class="sub">Cần thiết lập một lần (~10 phút) để xem thống kê và đăng video:</p>
      <ol class="steps">
        <li>Vào <a href="https://console.cloud.google.com/" target="_blank" rel="noopener">Google Cloud Console</a>, tạo project.</li>
        <li>Bật <b>YouTube Data API v3</b> và <b>YouTube Analytics API</b>.</li>
        <li>OAuth consent screen → External → thêm email của bạn vào Test users.</li>
        <li>Credentials → OAuth client ID → <b>Desktop app</b> → tải JSON, lưu thành <code>.secrets/client_secret.json</code>.</li>
        <li>Tải lại trang này rồi bấm <b>Kết nối YouTube</b>.</li>
      </ol>
      <p class="sub" style="margin-top:12px">Chỉ muốn xem số liệu công khai? Thêm <code>YOUTUBE_API_KEY=...</code> vào <code>.env</code>, điền handle kênh (vd. <code>@velahieu</code>) trong mục Kênh, rồi khởi động lại Studio.</p>
    </div>`;
  }
  return `<div class="card notice"><h2>${esc(c.name)} — chưa kết nối YouTube</h2>
    <p class="sub">${esc(st?.error ?? 'Đăng nhập tài khoản Google sở hữu kênh để xem lượt xem, người đăng ký và đăng video từ Studio.')}</p>
    <button class="btn primary" data-connect="${esc(c.id)}">Kết nối YouTube</button></div>`;
}
function channelSummary(c, st) {
  if (!st?.connected) return `<section id="yt-${esc(c.id)}">${notConnectedHtml(c, st)}</section>`;
  const views28 = st.daily?.reduce((a, d) => a + d.views, 0);
  return `<section class="card" id="yt-${esc(c.id)}">
    <div class="section-head"><h2>${esc(c.name)}</h2><span class="muted">${esc(st.channel.handle ?? '')}</span><span class="spacer"></span><button class="btn sm" data-pick="${esc(c.id)}">Xem chi tiết →</button></div>
    <div class="tiles" style="margin-top:12px">
      ${tile('Người đăng ký', st.channel.hiddenSubs ? 'Ẩn' : fmtNum(st.channel.subscribers))}
      ${tile('Tổng lượt xem', fmtNum(st.channel.views))}
      ${tile('Video trên kênh', fmtNum(st.channel.videoCount))}
      ${views28 != null ? tile('Lượt xem 28 ngày', fmtNum(views28)) : ''}
    </div></section>`;
}
const tile = (label, value, hint = '') => `<div class="tile"><div class="label">${label}</div><div class="value">${value}</div>${hint ? `<div class="hint">${hint}</div>` : ''}</div>`;

function renderYT(c, st) {
  const box = $('#yt');
  if (!st.connected) { box.innerHTML = notConnectedHtml(c, st); return; }
  const d = st.daily ?? [];
  const sum = (k) => d.reduce((a, x) => a + x[k], 0);
  const vids = [...st.videos].sort((a, b) => b.views - a.views);
  box.innerHTML = `
    <div class="section-head">
      <h2>${esc(st.channel.title)}</h2><span class="muted">${esc(st.channel.handle ?? '')}</span>
      <span class="spacer"></span>
      <span class="muted">Cập nhật ${fmtTime(st.fetchedAt)}</span>
      <button class="btn sm" id="ytRefresh">↻ Làm mới</button>
    </div>
    ${st.source === 'public' ? '<p class="muted" style="margin:0">Đang xem số liệu công khai (API key). Kết nối OAuth trong mục Kênh để có lượt xem theo ngày.</p>' : ''}
    <div class="tiles">
      ${tile('Người đăng ký', st.channel.hiddenSubs ? 'Ẩn' : fmtNum(st.channel.subscribers), d.length ? `+${fmtNum(sum('subsGained'))} / −${fmtNum(sum('subsLost'))} trong 28 ngày` : '')}
      ${tile('Tổng lượt xem', fmtNum(st.channel.views))}
      ${tile('Video trên kênh', fmtNum(st.channel.videoCount))}
      ${d.length ? tile('Lượt xem 28 ngày', fmtNum(sum('views'))) : ''}
      ${d.length ? tile('Giờ xem 28 ngày', fmtNum(sum('minutes') / 60), 'Mốc kiếm tiền: 4.000 giờ / 12 tháng') : ''}
    </div>
    ${scheduleCard(st)}
    <section class="card">
      <div class="section-head"><h2>Lượt xem mỗi ngày</h2><span class="muted">28 ngày gần nhất (YouTube Analytics trễ 1–2 ngày)</span><span class="spacer"></span>${d.length ? '<button class="btn sm" id="dailyToggle">Xem dạng bảng</button>' : ''}</div>
      <div id="daily" style="margin-top:12px">${d.length ? '' : `<p class="muted">${esc(st.analyticsError ? `Không lấy được YouTube Analytics: ${st.analyticsError}. Hãy bật "YouTube Analytics API" trong Google Cloud rồi kết nối lại kênh.` : 'Không có dữ liệu theo ngày.')}</p>`}</div>
    </section>
    <section class="card">
      <h2>Video nhiều lượt xem nhất</h2>
      <p class="sub">Top ${Math.min(10, vids.length)} theo tổng lượt xem</p>
      ${vids.length ? `<div class="bars" id="topBars"></div>` : '<p class="muted">Kênh chưa có video.</p>'}
    </section>
    <section class="card">
      <h2>Tất cả video trên kênh</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Video</th><th>Ngày đăng</th><th>Trạng thái</th><th class="r">Lượt xem</th><th class="r">Thích</th><th class="r">Bình luận</th></tr></thead>
        <tbody>${[...st.videos].sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')).map((v) => `<tr>
          <td><a href="https://youtu.be/${esc(v.id)}" target="_blank" rel="noopener">${esc(v.title)}</a></td>
          <td>${fmtDate(v.publishedAt)}</td>
          <td><span class="badge">${esc(PRIVACY[v.privacy] ?? v.privacy ?? '')}${v.publishAt ? ` · lên sóng ${fmtTime(v.publishAt)}` : ''}</span></td>
          <td class="r">${fmtNum(v.views)}</td><td class="r">${fmtNum(v.likes)}</td><td class="r">${fmtNum(v.comments)}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">Chưa có video.</td></tr>'}</tbody>
      </table></div>
    </section>`;
  $('#ytRefresh').onclick = async () => { $('#ytRefresh').disabled = true; renderYT(c, await loadStats(c.id, true)); };
  if (d.length) {
    let asTable = false;
    const draw = () => { asTable ? dailyTable($('#daily'), d) : lineChart($('#daily'), d); };
    $('#dailyToggle').onclick = () => { asTable = !asTable; $('#dailyToggle').textContent = asTable ? 'Xem dạng biểu đồ' : 'Xem dạng bảng'; draw(); };
    draw();
    S.redraw = () => !asTable && $('#daily') && lineChart($('#daily'), d);
  }
  if (vids.length) barChart($('#topBars'), vids.slice(0, 10));
}

function scheduleCard(st) {
  const local = new Map(S.data.videos.filter((x) => x.uploaded).map((x) => [x.uploaded.id, x.slug]));
  const sched = st.videos.filter((x) => x.privacy === 'private' && isFuture(x.publishAt)).sort((a, b) => a.publishAt.localeCompare(b.publishAt));
  const waiting = st.videos.filter((x) => x.privacy !== 'public' && !isFuture(x.publishAt));
  const row = (x) => `<tr><td>${ytBadge(x)}</td><td>${local.has(x.id) ? `<a href="#videos" data-open="${esc(local.get(x.id))}">${esc(x.title)}</a>` : `<a href="https://youtu.be/${esc(x.id)}" target="_blank" rel="noopener">${esc(x.title)}</a>`}</td></tr>`;
  return `<section class="card">
    <div class="section-head"><h2>Lịch đăng</h2><span class="muted">${sched.length} video đã hẹn · ${waiting.length} chưa công khai</span></div>
    ${sched.length + waiting.length ? `<div class="table-wrap"><table class="plain"><tbody>${sched.map(row).join('')}${waiting.map(row).join('')}</tbody></table></div>`
      : '<p class="muted">Chưa có video nào đang chờ. Mở một video trong mục Video → Đăng / Hẹn giờ.</p>'}
  </section>`;
}

// Đường lượt xem theo ngày, có đường dò + chú thích khi rê chuột.
function niceMax(v) {
  if (v <= 0) return 4;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= v) return m * p;
  return 10 * p;
}
function lineChart(el, data) {
  const W = el.clientWidth || 800, H = 240, ml = 48, mr = 12, mt = 10, mb = 26;
  const iw = W - ml - mr, ih = H - mt - mb;
  const max = niceMax(Math.max(...data.map((d) => d.views)));
  const x = (i) => ml + (data.length === 1 ? iw / 2 : (i / (data.length - 1)) * iw);
  const y = (v) => mt + ih - (v / max) * ih;
  const pts = data.map((d, i) => `${x(i).toFixed(1)},${y(d.views).toFixed(1)}`);
  const ticks = [0, 1, 2, 3, 4].map((i) => (max / 4) * i);
  const step = Math.ceil(data.length / Math.max(3, Math.min(6, Math.floor(iw / 80))));
  const lab = (s) => { const [, m, d] = s.split('-'); return `${+d}/${+m}`; };
  el.innerHTML = `<div class="chart"><svg width="${W}" height="${H}" role="img" aria-label="Lượt xem mỗi ngày trong ${data.length} ngày">
    ${ticks.map((t) => `<line class="gridline" x1="${ml}" x2="${W - mr}" y1="${y(t)}" y2="${y(t)}"/><text class="axis" x="${ml - 8}" y="${y(t) + 4}" text-anchor="end">${nf.format(t)}</text>`).join('')}
    ${data.map((d, i) => (i % step === 0 || (i === data.length - 1 && i % step >= step / 2) ? `<text class="axis" x="${x(i)}" y="${H - 6}" text-anchor="middle">${lab(d.date)}</text>` : '')).join('')}
    <polygon class="area" points="${ml},${y(0)} ${pts.join(' ')} ${x(data.length - 1)},${y(0)}"/>
    <polyline class="line" points="${pts.join(' ')}"/>
    <line class="cross" id="cross" y1="${mt}" y2="${mt + ih}" visibility="hidden"/>
    <circle class="dot" id="cdot" r="5" visibility="hidden"/>
    <rect x="${ml}" y="0" width="${iw}" height="${H}" fill="transparent" id="hit"/>
  </svg></div>`;
  const hit = $('#hit', el), cross = $('#cross', el), dot = $('#cdot', el);
  hit.addEventListener('pointermove', (e) => {
    const r = hit.getBoundingClientRect();
    const i = Math.max(0, Math.min(data.length - 1, Math.round(((e.clientX - r.left) / r.width) * (data.length - 1))));
    const d = data[i];
    cross.setAttribute('x1', x(i)); cross.setAttribute('x2', x(i)); cross.setAttribute('visibility', 'visible');
    dot.setAttribute('cx', x(i)); dot.setAttribute('cy', y(d.views)); dot.setAttribute('visibility', 'visible');
    showTip(e, [`<strong>${fmtNum(d.views)}</strong><span class="k"></span>lượt xem · ${new Date(d.date).toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'numeric' })}`,
      `<span class="muted">${fmtNum(d.minutes / 60)} giờ xem · +${fmtNum(d.subsGained)} đăng ký</span>`]);
  });
  hit.addEventListener('pointerleave', () => { cross.setAttribute('visibility', 'hidden'); dot.setAttribute('visibility', 'hidden'); hideTip(); });
}
function dailyTable(el, data) {
  el.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Ngày</th><th class="r">Lượt xem</th><th class="r">Giờ xem</th><th class="r">Đăng ký +</th><th class="r">Đăng ký −</th></tr></thead><tbody>
    ${[...data].reverse().map((d) => `<tr><td>${fmtDate(d.date)}</td><td class="r">${fmtNum(d.views)}</td><td class="r">${fmtNum(d.minutes / 60)}</td><td class="r">${fmtNum(d.subsGained)}</td><td class="r">${fmtNum(d.subsLost)}</td></tr>`).join('')}
  </tbody></table></div>`;
}
function barChart(el, vids) {
  const max = Math.max(1, ...vids.map((v) => v.views));
  el.innerHTML = vids.map((v, i) => `<div class="bl" title="${esc(v.title)}">${esc(v.title)}</div>
    <div class="bt" tabindex="0" data-i="${i}"><div class="bb" style="width:${(v.views / max) * 100}%"></div></div>
    <div class="bv">${fmtNum(v.views)}</div>`).join('');
  el.querySelectorAll('.bt').forEach((b) => {
    const v = vids[+b.dataset.i];
    const lines = [`<strong>${fmtNum(v.views)}</strong><span class="k"></span>lượt xem`, esc(v.title), `<span class="muted">${fmtNum(v.likes)} thích · ${fmtNum(v.comments)} bình luận</span>`];
    b.addEventListener('pointermove', (e) => showTip(e, lines));
    b.addEventListener('pointerleave', hideTip);
    b.addEventListener('focus', () => { const r = b.getBoundingClientRect(); showTip({ clientX: r.left + 20, clientY: r.top }, lines); });
    b.addEventListener('blur', hideTip);
  });
}
function showTip(e, lines) {
  const t = $('#tip');
  t.innerHTML = lines.map((l) => `<div>${l}</div>`).join('');
  t.hidden = false;
  const w = t.offsetWidth, h = t.offsetHeight;
  t.style.left = `${Math.min(e.clientX + 14, innerWidth - w - 8)}px`;
  t.style.top = `${Math.max(8, e.clientY - h - 12)}px`;
}
function hideTip() { $('#tip').hidden = true; }

// ---------- trạng thái YouTube ----------
const PRIV = { public: ['Công khai', 'good'], unlisted: ['Không công khai', ''], private: ['Riêng tư', 'warn'] };
const isFuture = (d) => d && new Date(d) > new Date();
function ytBadge(st) {
  if (!st) return '';
  if (st.privacy === 'private' && isFuture(st.publishAt)) return `<span class="badge warn">🕒 Hẹn ${fmtTime(st.publishAt)}</span>`;
  const [l, c] = PRIV[st.privacy] ?? [st.privacy, ''];
  return `<span class="badge ${c}">● ${l}</span>`;
}
const toLocalInput = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
// Khung giờ đăng gợi ý: 17:00 gần nhất còn cách ít nhất 1 giờ.
function nextSlot() {
  const d = new Date(); d.setHours(17, 0, 0, 0);
  if (d - Date.now() < 3600e3) d.setDate(d.getDate() + 1);
  return toLocalInput(d);
}
// ---------- lịch đăng dự kiến (topic.planAt) ----------
const DOW = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const fmtSlot = (d) => { const x = new Date(d); return `${DOW[x.getDay()]} ${x.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })} · ${x.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`; };
const topicOf = (slug) => S.data.topics.find((t) => t.slug === slug);
// Giờ mặc định cho ô hẹn giờ: theo lịch dự kiến nếu còn ở tương lai.
const planSlot = (slug) => { const t = topicOf(slug); return t?.planAt && isFuture(t.planAt) ? toLocalInput(new Date(t.planAt)) : nextSlot(); };
function rulesText(c) {
  const r = { ...S.data.defaultSchedule, ...c.schedule };
  const one = (x) => `${x.days.map((d) => DOW[d]).join(' & ')} ${(x.times ?? [x.time]).join(' & ')}`;
  return `Video dài ${one(r.long)} · Shorts ${one(r.short)}`;
}
// Việc cần làm để kịp lịch: [nhãn, màu].
function planState(t) {
  const v = t.slug && S.data.videos.find((x) => x.slug === t.slug);
  const days = (new Date(t.planAt) - Date.now()) / 864e5;
  if (t.status === 'published') return ['✓ Đã lên sóng', 'good'];
  if (v?.uploaded) {
    const ys = statsByVideoId().get(v.uploaded.id);
    if (ys?.privacy === 'public') return ['✓ Đã lên sóng', 'good'];
    if (isFuture(ys?.publishAt ?? v.uploaded.publishAt)) return ['✓ Đã hẹn trên YouTube', 'good'];
    return ['Đã tải lên — bấm hẹn giờ', 'warn'];
  }
  if (days < 0) return ['⚠ Trễ lịch', 'bad'];
  if (v?.rendered) return ['⬆ Sẵn sàng — tải lên', 'warn'];
  return [days < 3 ? '⚠ Cần làm gấp' : 'Cần làm video', days < 3 ? 'bad' : ''];
}
function planCard(c) {
  const list = S.data.topics.filter((t) => t.channel === c.id && t.planAt && (t.status !== 'published' || new Date(t.planAt) > Date.now() - 2 * 864e5))
    .sort((a, b) => a.planAt.localeCompare(b.planAt));
  const unplanned = S.data.topics.filter((t) => t.channel === c.id && !t.planAt && t.status !== 'published').length;
  return `<section class="card" id="plan-${esc(c.id)}">
    <div class="section-head"><h2>Lịch đăng dự kiến${S.channel === 'all' ? ` · ${esc(c.name)}` : ''}</h2><span class="muted">${esc(rulesText(c))}</span></div>
    ${list.length ? `<div class="table-wrap"><table class="plain plan"><tbody>${list.map((t) => {
      const [l, cls] = planState(t);
      return `<tr><td class="num nowrap">${fmtSlot(t.planAt)}</td><td><span class="badge">${t.format === 'short' ? 'Shorts' : 'Dài'}</span></td>
        <td>${t.slug ? `<a href="#overview" data-open="${esc(t.slug)}">${esc(t.title)}</a>` : `<a href="#overview" data-edit="${esc(t.id)}">${esc(t.title)}</a>`}</td>
        <td><span class="badge ${cls}">${l}</span></td></tr>`;
    }).join('')}</tbody></table></div>` : '<p class="muted">Chưa có lịch. Bấm "Tự xếp lịch".</p>'}
    <div class="row" style="margin-top:10px">
      <button class="btn ${unplanned ? 'primary' : ''}" data-plan="${esc(c.id)}">Tự xếp lịch${unplanned ? ` (${unplanned} chủ đề chưa có lịch)` : ''}</button>
      <button class="btn sm" data-plan="${esc(c.id)}" data-reset="1">Xếp lại từ đầu</button>
      <span class="muted small">Mở một video → "Gói đăng" để có đủ tiêu đề, mô tả, thẻ, thumbnail và giờ hẹn khi tải lên YouTube Studio.</span>
    </div>
  </section>`;
}
async function runPlan(id, reset) {
  if (reset && !confirm('Xếp lại lịch cho mọi chủ đề chưa lên sóng (trừ video đã hẹn giờ trên YouTube)?')) return;
  try { await api(`/api/channels/${id}/plan`, { method: 'POST', body: { reset } }); await refresh(); render(); toast('Đã xếp lịch'); } catch (e) { toast(e.message); }
}

const LOCK_NOTE = 'Lưu ý: video tải lên qua API từ dự án Google Cloud <b>chưa được YouTube xét duyệt</b> sẽ bị khoá ở chế độ riêng tư. Cách chắc chắn: tải video lên bằng YouTube Studio (để Riêng tư), rồi <b>liên kết</b> ở đây để hẹn giờ / công khai.';

// ---------- Video ----------
function videoState(v) {
  if (v.uploaded) return ytBadge(statsByVideoId().get(v.uploaded.id)) || `<span class="badge good">● Đã đăng</span>`;
  if (!v.rendered) return `<span class="badge">Chưa render</span>`;
  if (new Date(v.sourceChangedAt) > new Date(v.renderedAt)) return `<span class="badge warn">● Kịch bản đã sửa — cần render lại</span>`;
  return `<span class="badge good">● Đã render</span>`;
}
function renderVideos() {
  const byId = statsByVideoId();
  const list = S.data.videos.filter(inChannel).filter((v) => S.videoFilter === 'all' || v.format === S.videoFilter);
  for (const slug of [...S.sel]) if (!list.some((v) => v.slug === slug)) S.sel.delete(slug); // bỏ chọn video không còn hiện
  const chosen = list.filter((v) => S.sel.has(v.slug));
  const selBytes = chosen.reduce((a, v) => a + (v.disk ?? 0), 0);
  const totalBytes = list.reduce((a, v) => a + (v.disk ?? 0), 0);
  $('#view').innerHTML = `
    <div class="row">
      ${[['all', 'Tất cả'], ['long', 'Video dài'], ['short', 'Shorts']].map(([k, l]) => `<button class="btn ${S.videoFilter === k ? 'primary' : ''}" data-vf="${k}">${l}</button>`).join('')}
      <span class="spacer"></span><span class="muted">${list.length} video · ${fmtSize(totalBytes) || '0 MB'} trên ổ đĩa</span>
      <button class="btn ${S.selMode ? 'primary' : ''}" data-selmode>${S.selMode ? 'Xong' : '🗑 Dọn bộ nhớ'}</button>
    </div>
    ${S.selMode ? `<div class="row selbar">
      <span>Đã chọn <b>${chosen.length}</b> video · <b>${fmtSize(selBytes) || '0 MB'}</b></span>
      <button class="btn sm" data-selpub>Chọn video đã đăng</button>
      <button class="btn sm" data-selall>Chọn tất cả</button>
      <button class="btn sm" data-selnone>Bỏ chọn</button>
      <span class="spacer"></span>
      <button class="btn danger" data-cleanup ${chosen.length ? '' : 'disabled'}>Xoá file render (${fmtSize(selBytes) || '0 MB'})</button>
    </div>
    <p class="muted">Chỉ xoá file nặng (video.mp4, âm thanh, ảnh tĩnh soát hình). Giữ nguyên kịch bản, thông tin đăng YouTube, mô tả, thumbnail, phụ đề — render lại được bất cứ lúc nào.</p>` : ''}
    ${list.length ? `<div class="grid">${list.map((v) => {
      const yv = v.uploaded && byId.get(v.uploaded.id);
      const on = S.sel.has(v.slug);
      return `<button class="vcard ${S.selMode && on ? 'sel' : ''}" ${S.selMode ? `data-sel="${esc(v.slug)}"` : `data-open="${esc(v.slug)}"`}>
        <div class="vthumb ${v.format === 'short' ? 'short' : ''}" style="${v.thumb ? `background-image:url('${esc(v.thumb)}')` : ''}">${v.thumb ? '' : 'Chưa có hình'}${v.duration ? `<span class="dur">${fmtDur(v.duration)}</span>` : ''}${S.selMode ? `<span class="vcheck">${on ? '✓' : ''}</span>` : ''}</div>
        <div class="vbody">
          <div class="t">${esc(v.title)}</div>
          <div class="row">${videoState(v)}<span class="badge">${v.format === 'short' ? 'Shorts' : 'Video dài'}</span>${S.channel === 'all' ? `<span class="badge">${esc(chanName(v.channel))}</span>` : ''}${v.disk > 1e6 ? `<span class="badge">${fmtSize(v.disk)}</span>` : ''}</div>
          ${yv ? `<div class="muted num">${fmtNum(yv.views)} lượt xem · ${fmtNum(yv.likes)} thích</div>` : ''}
        </div></button>`;
    }).join('')}</div>` : '<p class="muted">Chưa có video. Vào mục Chủ đề → "Tạo khung video".</p>'}`;
  // nạp số liệu YouTube để hiện lượt xem trên thẻ video đã đăng
  const need = [...new Set(list.filter((v) => v.uploaded).map((v) => v.channel))].filter((c) => !S.stats[c]);
  if (need.length) Promise.all(need.map((c) => loadStats(c))).then(() => tab() === 'videos' && renderVideos());
}

function openVideo(slug) {
  const v = S.data.videos.find((x) => x.slug === slug);
  if (!v) return;
  S.openSlug = slug;
  const topic = S.data.topics.find((t) => t.slug === slug);
  const yv = v.uploaded && statsByVideoId().get(v.uploaded.id);
  const connected = S.data.connected[v.channel];
  const m = $('#modal');
  m.innerHTML = `<div class="dialog" role="dialog" aria-modal="true" aria-label="${esc(v.title)}">
    <div class="row"><h2>${esc(v.title)}</h2><span class="spacer"></span><button class="btn" data-close>✕</button></div>
    <div class="player">
      <div>${v.rendered
        ? `<video controls preload="metadata" src="/output/${esc(slug)}/video.mp4?v=${new Date(v.renderedAt).getTime()}" poster="${esc(v.thumb ?? '')}"></video>`
        : `<div class="empty">Chưa render.<br>Bấm "Render video" — video 3 phút mất khoảng 1 phút.</div>`}</div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="row">${videoState(v)}<span class="badge">${v.format === 'short' ? 'Shorts 9:16' : 'Video dài 16:9'}</span></div>
        <table><tbody>
          <tr><td class="muted">Thư mục</td><td><code>videos/${esc(slug)}</code></td></tr>
          <tr><td class="muted">Kênh</td><td>${esc(chanName(v.channel))}</td></tr>
          ${v.duration ? `<tr><td class="muted">Thời lượng</td><td>${fmtDur(v.duration)} · ${v.scenes} cảnh</td></tr>` : ''}
          ${v.rendered ? `<tr><td class="muted">Render lúc</td><td>${fmtTime(v.renderedAt)} · ${fmtSize(v.size)}</td></tr>` : ''}
          ${topic ? `<tr><td class="muted">Chủ đề</td><td>${esc(STATUS[topic.status])}</td></tr>` : ''}
          ${v.uploaded ? `<tr><td class="muted">YouTube</td><td><a href="${esc(v.uploaded.url)}" target="_blank" rel="noopener">${esc(v.uploaded.url)}</a>${yv ? `<br><span class="num">${fmtNum(yv.views)} lượt xem · ${fmtNum(yv.likes)} thích · ${fmtNum(yv.comments)} bình luận</span>` : ''}</td></tr>` : ''}
        </tbody></table>
        <div class="row">
          <button class="btn" data-job="stills">Ảnh tĩnh</button>
          <button class="btn primary" data-job="build">${v.rendered ? 'Render lại' : 'Render video'}</button>
          ${v.rendered ? `<a class="btn" href="/output/${esc(slug)}/video.mp4" download="${esc(slug)}.mp4">Tải xuống</a>` : ''}
        </div>
        <div id="ytPanel"></div>
        <div id="jobPanel"></div>
      </div>
    </div>
    <div class="row"><button class="btn primary" data-pane="desc">Gói đăng</button><button class="btn" data-pane="stills">Ảnh tĩnh (${v.stills.length})</button>${v.uploaded ? '<button class="btn" data-pane="aud">Người xem</button>' : ''}</div>
    <div id="pane"></div>
  </div>`;
  m.hidden = false;
  const pane = (p) => {
    m.querySelectorAll('[data-pane]').forEach((b) => b.classList.toggle('primary', b.dataset.pane === p));
    if (p === 'aud') return renderAudience(v);
    $('#pane').innerHTML = p === 'desc'
      ? (v.description ? kitHtml(v, topic) : '<p class="muted">Có sau khi render.</p>')
      : (v.stills.length ? `<div class="stills">${v.stills.map((s) => `<a href="${esc(s)}" target="_blank"><img loading="lazy" src="${esc(s)}?${Date.now()}" alt=""></a>`).join('')}</div>` : '<p class="muted">Bấm "Ảnh tĩnh" để xuất 1 ảnh cuối mỗi cảnh — xem bố cục nhanh.</p>');
    if (p === 'desc') bindKit(v);
  };
  m.querySelectorAll('[data-pane]').forEach((b) => { b.onclick = () => pane(b.dataset.pane); });
  pane('desc');
  m.querySelectorAll('[data-job]').forEach((b) => {
    b.onclick = async () => {
      const type = b.dataset.job;
      try {
        await api('/api/jobs', { method: 'POST', body: { type, slug, channel: v.channel } });
        toast('Đã thêm vào hàng chờ');
        await tick();
      } catch (e) { toast(e.message); }
    };
  });
  updateJobPanel();
  renderYtPanel(v);
}

// Hành vi người xem: đường giữ chân (kèm vạch chương), điểm rơi, nguồn traffic, gợi ý — từ scripts/analytics.mjs.
async function renderAudience(v, refreshNow = false) {
  const el = $('#pane');
  el.innerHTML = '<p class="muted">Đang tải số liệu YouTube Analytics…</p>';
  let r;
  try { r = await api(`/api/videos/${v.slug}/analytics${refreshNow ? '?refresh=1' : ''}`); } catch (e) { el.innerHTML = `<p class="muted">${esc(e.message)}</p>`; return; }
  if (S.openSlug !== v.slug || !$('#pane')) return;
  if (r.error) { el.innerHTML = `<p class="muted">${esc(r.error)}</p>`; return; }
  const p100 = (x) => (x == null ? '—' : `${Math.round(x * 100)}%`);
  const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const head = `<div class="row"><span class="muted">Hiện ${fmtNum(r.live.views)} lượt xem · ${fmtNum(r.live.likes)} thích · ${fmtNum(r.live.comments)} bình luận</span><span class="spacer"></span><button class="btn sm" id="audRefresh">Tải lại</button></div>`;
  if (!r.hasData) { el.innerHTML = `${head}<p class="muted">Chưa có số liệu chi tiết — YouTube cần 24–72 giờ sau khi đăng để xử lý giữ chân, nguồn traffic.</p>`; bindAud(v); return; }
  const b = r.basic;
  let chart = '';
  if (r.points?.length) {
    const W = 800, H = 220, X = (t) => (t / r.duration) * W, Y = (w) => H - 16 - (Math.min(w, 1.2) / 1.2) * (H - 30);
    const line = r.points.map((p, i) => `${i ? 'L' : 'M'}${X(p.t).toFixed(1)},${Y(p.w).toFixed(1)}`).join(' ');
    chart = `<svg class="ret" viewBox="0 0 ${W} ${H}" role="img" aria-label="Đường giữ chân">
      ${[0.25, 0.5, 0.75, 1].map((g) => `<line x1="0" x2="${W}" y1="${Y(g)}" y2="${Y(g)}" class="grid"/><text x="2" y="${Y(g) - 3}" class="ax">${g * 100}%</text>`).join('')}
      ${(r.chapters ?? []).map((c) => `<line x1="${X(c.start)}" x2="${X(c.start)}" y1="8" y2="${H - 16}" class="chap"><title>${esc(c.name)}</title></line>`).join('')}
      <path d="${line}" class="curve"/>
      ${r.drops.map((d) => `<circle cx="${X(d.t)}" cy="${Y(d.w)}" r="5" class="drop"><title>${mmss(d.t)} · −${p100(d.d)} · ${esc(d.line)}</title></circle>`).join('')}
    </svg>`;
  }
  el.innerHTML = `${head}
    <div class="tiles">${tile('Lượt xem', fmtNum(b.views))}${tile('TB mỗi lượt', mmss(b.averageViewDuration), `${b.averageViewPercentage.toFixed(0)}% video`)}${tile('Còn xem sau 30s', p100(r.check?.s30))}${tile('Sub mới', fmtNum(b.subscribersGained))}</div>
    ${chart}
    ${r.chapters?.length ? `<div class="table-wrap"><table class="plain"><tbody>${r.chapters.map((c) => `<tr><td>${esc(c.name)}</td><td class="num">${mmss(c.start)}</td><td class="num">${p100(c.from)} → ${p100(c.to)}</td><td class="num">−${p100(c.lossPerMin)}/phút</td></tr>`).join('')}</tbody></table></div>` : ''}
    ${r.drops?.length ? `<b>Rơi mạnh nhất</b><ul>${r.drops.map((d) => `<li>${mmss(d.t)} · cảnh ${d.scene} · −${p100(d.d)} · “${esc(d.line)}”</li>`).join('')}</ul>` : ''}
    ${r.traffic.length ? `<p><b>Nguồn:</b> ${r.traffic.map((x) => `${esc(x.label)} ${fmtNum(x.views)}`).join(' · ')}</p>` : ''}
    ${r.search.length ? `<p><b>Từ khoá:</b> ${r.search.map((x) => `“${esc(x.insightTrafficSourceDetail)}” (${x.views})`).join(', ')}</p>` : ''}
    <b>Gợi ý cho video sau</b><ul>${r.advice.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>`;
  bindAud(v);
}
function bindAud(v) { const b = $('#audRefresh'); if (b) b.onclick = () => renderAudience(v, true); }

// Hashtag Facebook: hashtag cuối mô tả (bỏ #shorts → #reels) rồi tới thẻ YouTube, bỏ dấu, viết liền, tối đa 10;
// luôn giữ hashtag tên kênh ở cuối.
function fbTags(v) {
  const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '');
  const fromDesc = ((v.ytDescription ?? v.description ?? '').match(/#[\p{L}\p{N}_]+/gu) ?? []).map((h) => h.slice(1));
  const out = [];
  for (const t of [...fromDesc, ...v.tags]) {
    let h = norm(t);
    if (h === 'shorts') h = 'reels';
    if (h && !out.includes(h)) out.push(h);
  }
  const ch = norm(channels().find((c) => c.id === v.channel)?.name ?? '');
  const list = ch ? [...out.filter((h) => h !== ch).slice(0, 9), ch] : out.slice(0, 10);
  return list.map((h) => `#${h}`).join(' ');
}

// Gói đăng: mọi thứ cần dán vào YouTube Studio khi tải video lên tay, kèm giờ hẹn theo lịch và checklist.
function kitHtml(v, topic) {
  const plan = topic?.planAt;
  const when = plan ? `Chế độ hiển thị → Lên lịch: ${fmtSlot(plan)}` : 'Chế độ hiển thị → Lên lịch (chưa có lịch dự kiến)';
  const steps = v.format === 'short' ? [
    'YouTube Studio → Tạo → Tải video lên: chọn video.mp4 (dọc 9:16, YouTube tự nhận là Shorts)',
    'Dán tiêu đề, mô tả, thẻ (nút Sao chép ở trên)',
    v.related ? `Video liên quan (Related video): chọn "${v.related.title}"${v.related.url ? ` — ${v.related.url}` : ' (tập dài này cần được đăng trước)'}` : 'Video liên quan (Related video): chọn tập dài tương ứng',
    'Phụ đề đã in sẵn trong video — không cần tải .srt',
    'Khán giả: Không, video này không dành cho trẻ em',
    when,
    'SAU KHI ĐĂNG — app YouTube trên điện thoại: mở Short → Chỉnh sửa → Hình thu nhỏ → chọn KHUNG ĐẦU TIÊN (hoặc tải ảnh thumbnail.jpg dọc 1080×1920). Tab Shorts và luồng Shorts chỉ dùng ảnh này; thumbnail đặt qua API/Studio máy tính chỉ hiện ở tìm kiếm/trang chủ',
  ] : [
    'YouTube Studio → Tạo → Tải video lên: chọn video.mp4 (nút "Tải video" bên dưới)',
    'Dán tiêu đề, mô tả, thẻ (nút Sao chép ở trên)',
    v.thumbs.length > 1 ? `Thumbnail → "Test & compare": tải lên cả ${v.thumbs.length} mẫu (${'ABC'.slice(0, v.thumbs.length).split('').join('/')}) ở trên — YouTube tự chọn mẫu nhiều người bấm nhất (để yên 1–2 tuần)` : 'Chọn thumbnail',
    'Phụ đề: tải captions.srt lên, chọn đúng ngôn ngữ của video',
    `Thêm vào danh sách phát: ${topic?.pillar || 'theo series'}`,
    'Khán giả: Không, video này không dành cho trẻ em',
    'Màn hình kết thúc: video tiếp theo của series + nút đăng ký',
    when,
  ];
  const done = JSON.parse(store.get(`kit.${v.slug}`, '[]'));
  const field = (label, id, text) => `<div class="kitf"><div class="row"><b>${label}</b><span class="spacer"></span><button class="btn sm" data-copy="${id}">Sao chép</button></div><pre class="desc" id="${id}">${esc(text)}</pre></div>`;
  return `<div class="kit">
    <div class="kitplan ${plan ? '' : 'muted'}">🗓 ${plan ? `Lịch đăng: <b>${fmtSlot(plan)}</b> — trong YouTube Studio chọn <b>Lên lịch</b> đúng giờ này.` : 'Chưa có lịch dự kiến — vào Tổng quan → "Tự xếp lịch".'}</div>
    ${field('Tiêu đề', 'kTitle', v.title)}
    ${field('Mô tả', 'kDesc', v.ytDescription ?? v.description)}
    ${v.tags.length ? field('Thẻ', 'kTags', v.tags.join(', ')) : ''}
    ${fbTags(v) ? field('Tag Facebook', 'kFb', fbTags(v)) : ''}
    ${v.thumbs.length ? `<div class="kitf"><b>Thumbnail</b><div class="kthumbs">${v.thumbs.map((t, i) => `<a href="${esc(t)}" download="${esc(v.slug)}-thumb-${'abc'[i]}.jpg" title="Tải xuống"><img src="${esc(t)}" alt="Mẫu ${'ABC'[i]}"><span>${'ABC'[i]}${i === 0 ? ' · đề xuất' : ''}</span></a>`).join('')}</div></div>` : ''}
    <div class="row">${v.captions ? `<a class="btn sm" href="${esc(v.captions)}" download="${esc(v.slug)}.srt">Tải phụ đề .srt</a>` : ''}<a class="btn sm" href="/output/${esc(v.slug)}/video.mp4" download="${esc(v.slug)}.mp4">Tải video</a></div>
    <div class="kitf"><b>Checklist khi đăng</b>${steps.map((s, i) => `<label class="check"><input type="checkbox" data-kit="${i}" ${done.includes(i) ? 'checked' : ''}> ${esc(s)}</label>`).join('')}
      <p class="muted small">Sau khi tải lên, Studio tự nhận ra video (trùng tiêu đề) và theo dõi trạng thái.</p></div>
  </div>`;
}
function bindKit(v) {
  document.querySelectorAll('#pane [data-copy]').forEach((b) => { b.onclick = () => navigator.clipboard.writeText($(`#${b.dataset.copy}`).textContent).then(() => toast('Đã sao chép')); });
  document.querySelectorAll('#pane [data-kit]').forEach((c) => {
    c.onchange = () => store.set(`kit.${v.slug}`, JSON.stringify([...document.querySelectorAll('#pane [data-kit]:checked')].map((x) => +x.dataset.kit)));
  });
}

// Khung YouTube trong cửa sổ video: đăng mới / liên kết, hoặc trạng thái + hẹn giờ + công khai.
async function renderYtPanel(v) {
  const el = $('#ytPanel');
  if (!el) return;
  const box = (html) => { if (S.openSlug === v.slug && $('#ytPanel')) $('#ytPanel').innerHTML = `<div class="ytbox">${html}</div>`; };
  if (!S.data.connected[v.channel]) return box('<b>YouTube</b><span class="muted">Kênh chưa kết nối — vào mục Kênh để kết nối.</span>');

  if (!v.uploaded) {
    const chVideos = (await loadStats(v.channel))?.videos ?? [];
    const linked = new Set(S.data.videos.filter((x) => x.uploaded).map((x) => x.uploaded.id));
    const pick = chVideos.filter((x) => !linked.has(x.id));
    box(`<b>Đăng lên YouTube</b>
      <div class="row">
        <select id="upMode" aria-label="Chế độ đăng">
          <option value="schedule">Hẹn giờ công khai</option><option value="private">Riêng tư</option>
          <option value="unlisted">Không công khai</option><option value="public">Công khai ngay</option>
        </select>
        <input type="datetime-local" id="upAt" value="${planSlot(v.slug)}" aria-label="Giờ đăng">
        <button class="btn primary" id="upGo" ${v.rendered ? '' : 'disabled'}>Đăng</button>
      </div>
      <p class="muted small">${LOCK_NOTE}</p>
      <details ${pick.length ? 'open' : ''}><summary>Đã đăng tay trên YouTube Studio? Liên kết video</summary>
        <div class="row" style="margin-top:8px">
          ${pick.length ? `<select id="linkPick" style="flex:1"><option value="">— chọn video trên kênh —</option>${pick.map((x) => `<option value="${esc(x.id)}">${esc(x.title)} · ${esc(PRIV[x.privacy]?.[0] ?? x.privacy)}</option>`).join('')}</select>` : ''}
          <input id="linkUrl" placeholder="hoặc dán link / mã video" style="flex:1;min-width:180px">
          <button class="btn" id="linkGo">Liên kết</button>
        </div>
      </details>`);
    const mode = $('#upMode'), at = $('#upAt');
    if (!mode) return;
    mode.onchange = () => { at.style.display = mode.value === 'schedule' ? '' : 'none'; };
    $('#upGo').onclick = async () => {
      const label = { schedule: `hẹn công khai lúc ${new Date(at.value).toLocaleString('vi-VN')}`, private: 'RIÊNG TƯ', unlisted: 'KHÔNG CÔNG KHAI', public: 'CÔNG KHAI NGAY — ai cũng xem được' }[mode.value];
      if (mode.value === 'schedule' && !(new Date(at.value) > new Date(Date.now() + 15 * 60_000))) return toast('Chọn giờ hẹn sau hiện tại ít nhất 15 phút.');
      if (!confirm(`Đăng "${v.title}" lên kênh ${chanName(v.channel)}: ${label}?`)) return;
      try {
        await api('/api/jobs', { method: 'POST', body: { type: 'upload', slug: v.slug, channel: v.channel, privacy: mode.value === 'schedule' ? 'private' : mode.value, publishAt: mode.value === 'schedule' ? new Date(at.value).toISOString() : undefined } });
        toast('Đã thêm vào hàng chờ đăng');
        await tick();
      } catch (e) { toast(e.message); }
    };
    $('#linkGo').onclick = async () => {
      const video = $('#linkUrl').value.trim() || $('#linkPick')?.value;
      if (!video) return toast('Chọn video hoặc dán link YouTube.');
      try {
        await api(`/api/videos/${v.slug}/link`, { method: 'POST', body: { video, channel: v.channel } });
        toast('Đã liên kết video');
        await refresh(); openVideo(v.slug);
      } catch (e) { toast(e.message); }
    };
    return;
  }

  box('<b>YouTube</b> <span class="muted">Đang tải trạng thái…</span>');
  let st;
  try { st = await api(`/api/videos/${v.slug}/youtube?refresh=1`); } catch (e) { return box(`<b>YouTube</b><span class="badge bad">${esc(e.message)}</span>`); }
  if (!st.exists) return box(`<b>YouTube</b><span class="muted">Không tìm thấy video ${esc(st.id)} trên kênh (đã xoá?).</span><div class="row"><button class="btn sm danger" id="unlink">Bỏ liên kết</button></div>`), bindUnlink(v);
  const isPublic = st.privacy === 'public';
  box(`<div class="row"><b>YouTube</b>${ytBadge(st)}${st.processing && st.processing !== 'succeeded' ? '<span class="badge">⏳ Đang xử lý</span>' : ''}<span class="spacer"></span><a href="${esc(st.url)}" target="_blank" rel="noopener">Mở trên YouTube ↗</a></div>
    <div class="muted num">${fmtNum(st.views)} lượt xem · ${fmtNum(st.likes)} thích · ${fmtNum(st.comments)} bình luận${st.publishedAt ? ` · tải lên ${fmtDate(st.publishedAt)}` : ''}</div>
    ${st.failure ? `<span class="badge bad">${esc(st.failure)}</span>` : ''}
    <div class="row">
      <button class="btn primary" data-pub="public" ${isPublic ? 'disabled' : ''}>Công khai ngay</button>
      <input type="datetime-local" id="pubAt" value="${st.publishAt ? toLocalInput(new Date(st.publishAt)) : planSlot(v.slug)}" ${isPublic ? 'disabled' : ''} aria-label="Giờ hẹn">
      <button class="btn" data-pub="schedule" ${isPublic ? 'disabled title="Video đã công khai thì không hẹn giờ được"' : ''}>${isFuture(st.publishAt) ? 'Đổi lịch' : topicOf(v.slug)?.planAt && isFuture(topicOf(v.slug).planAt) ? 'Hẹn giờ theo lịch' : 'Hẹn giờ'}</button>
    </div>
    <div class="row">
      <button class="btn sm" data-pub="unlisted" ${st.privacy === 'unlisted' ? 'disabled' : ''}>Không công khai</button>
      <button class="btn sm" data-pub="private" ${st.privacy === 'private' && !isFuture(st.publishAt) ? 'disabled' : ''}>Chuyển riêng tư</button>
      <span class="spacer"></span><button class="btn sm danger" id="unlink">Bỏ liên kết</button>
    </div>
    ${st.linked ? '' : `<p class="muted small">${LOCK_NOTE}</p>`}`);
  document.querySelectorAll('#ytPanel [data-pub]').forEach((b) => {
    b.onclick = async () => {
      const mode = b.dataset.pub;
      const at = $('#pubAt').value;
      const label = { public: 'CÔNG KHAI NGAY — ai cũng xem được', unlisted: 'chuyển sang Không công khai', private: 'chuyển về Riêng tư (huỷ lịch nếu có)', schedule: `hẹn công khai lúc ${new Date(at).toLocaleString('vi-VN')}` }[mode];
      if (!confirm(`"${v.title}": ${label}?`)) return;
      b.disabled = true;
      try {
        const r = await api(`/api/videos/${v.slug}/publish`, { method: 'POST', body: { mode, publishAt: mode === 'schedule' ? new Date(at).toISOString() : undefined } });
        if (r.locked) toast('YouTube vẫn giữ video ở chế độ Riêng tư — video tải lên qua API chưa xét duyệt bị khoá. Hãy đăng tay qua YouTube Studio rồi liên kết.', 12000);
        else toast(mode === 'schedule' ? `Đã hẹn công khai lúc ${fmtTime(r.publishAt)}` : `Đã chuyển: ${PRIV[r.privacy]?.[0] ?? r.privacy}`);
        delete S.stats[v.channel];
        await refresh(); renderYtPanel(v);
      } catch (e) { toast(e.message, 8000); b.disabled = false; }
    };
  });
  bindUnlink(v);
}
function bindUnlink(v) {
  const b = $('#unlink');
  if (b) b.onclick = async () => {
    if (!confirm('Bỏ liên kết video này với YouTube? (video trên YouTube không bị xoá)')) return;
    await api(`/api/videos/${v.slug}/unlink`, { method: 'POST' });
    await refresh(); openVideo(v.slug);
  };
}
function closeModal() { hideTip(); $('#modal').hidden = true; $('#modal').innerHTML = ''; S.openSlug = null; }

async function updateJobPanel() {
  const el = $('#jobPanel');
  if (!el || !S.openSlug) return;
  const j = S.data.jobs.find((x) => x.slug === S.openSlug);
  if (!j) { el.innerHTML = ''; return; }
  const full = await api(`/api/jobs/${j.id}`).catch(() => null);
  if (!full || !$('#jobPanel')) return;
  const label = { build: 'Render', stills: 'Ảnh tĩnh', upload: 'Đăng YouTube' }[j.type];
  const st = { queued: '🕒 Đang chờ', running: '⏳ Đang chạy', done: '✓ Xong', failed: '✕ Lỗi' }[j.status];
  $('#jobPanel').innerHTML = `<div class="muted" style="margin-bottom:4px">${label}: ${st}</div><pre class="log">${esc(full.log.trim().split('\n').slice(-14).join('\n') || '…')}</pre>`;
  const pre = $('#jobPanel pre');
  pre.scrollTop = pre.scrollHeight;
}

// ---------- Chủ đề ----------
function renderTopics() {
  const q = S.topicQuery.toLowerCase();
  const topics = S.data.topics.filter(inChannel).filter((t) => !q || t.title.toLowerCase().includes(q) || t.pillar.toLowerCase().includes(q));
  const pillars = [...new Set(S.data.topics.map((t) => t.pillar).filter(Boolean))];
  $('#view').innerHTML = `
    <section class="card">
      <h2>Thêm chủ đề</h2>
      <p class="sub">Mỗi chủ đề là một câu hỏi "tại sao". Khi sẵn sàng, bấm "Tạo khung video" rồi nhờ Claude viết kịch bản.</p>
      <form class="add" id="addTopic">
        <input name="title" placeholder="Vd: Tại sao mèo kêu gừ gừ?" required aria-label="Tiêu đề">
        <input name="pillar" placeholder="Nhóm nội dung" list="pillars" aria-label="Nhóm nội dung">
        <select name="format" aria-label="Định dạng"><option value="long">Video dài</option><option value="short">Shorts</option></select>
        <select name="channel" aria-label="Kênh">${channels().map((c) => `<option value="${esc(c.id)}" ${c.id === S.channel ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select>
        <button class="btn primary">Thêm</button>
        <datalist id="pillars">${pillars.map((p) => `<option value="${esc(p)}">`).join('')}</datalist>
      </form>
    </section>
    <div class="row"><input id="tq" placeholder="Tìm chủ đề…" value="${esc(S.topicQuery)}" style="min-width:260px"><span class="muted">${topics.length} chủ đề</span></div>
    <div class="board">${S.data.statuses.map((s) => {
      const items = topics.filter((t) => t.status === s);
      return `<div class="col"><h3><span>${STATUS[s]}</span><span>${items.length}</span></h3>${items.map(topicCard).join('')}</div>`;
    }).join('')}</div>`;
  $('#addTopic').onsubmit = async (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    try { await api('/api/topics', { method: 'POST', body: f }); await refresh(); renderTopics(); toast('Đã thêm chủ đề'); } catch (err) { toast(err.message); }
  };
  const tq = $('#tq');
  tq.oninput = () => { S.topicQuery = tq.value; renderTopics(); const n = $('#tq'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); };
}
function topicCard(t) {
  return `<div class="tcard">
    <div class="t">${esc(t.title)}</div>
    <div class="meta">${t.planAt && t.status !== 'published' ? `<span class="badge ${planState(t)[1]}" title="${esc(planState(t)[0])}">🗓 ${fmtSlot(t.planAt)}</span>` : ''}${t.pillar ? `<span class="badge">${esc(t.pillar)}</span>` : ''}<span class="badge">${t.format === 'short' ? 'Shorts' : 'Video dài'}</span>${S.channel === 'all' ? `<span class="badge">${esc(chanName(t.channel))}</span>` : ''}</div>
    <div class="acts">
      <select data-status="${t.id}" aria-label="Trạng thái">${S.data.statuses.map((s) => `<option value="${s}" ${s === t.status ? 'selected' : ''}>${STATUS[s]}</option>`).join('')}</select>
      ${t.slug ? `<button class="btn sm" data-open="${esc(t.slug)}">Xem video</button>` : `<button class="btn sm" data-scaffold="${t.id}">Tạo khung video</button>`}
      <button class="btn sm" data-edit="${t.id}" aria-label="Sửa">✎</button>
      <button class="btn sm danger" data-del="${t.id}" aria-label="Xoá">✕</button>
    </div></div>`;
}
function editTopic(id) {
  const t = S.data.topics.find((x) => x.id === id);
  const m = $('#modal');
  m.innerHTML = `<div class="dialog narrow"><div class="row"><h2>Sửa chủ đề</h2><span class="spacer"></span><button class="btn" data-close>✕</button></div>
    <form class="form" id="topicForm">
      <label class="field"><span>Tiêu đề</span><input name="title" value="${esc(t.title)}" required></label>
      <label class="field"><span>Nhóm nội dung</span><input name="pillar" value="${esc(t.pillar)}"></label>
      <div class="row">
        <label class="field"><span>Định dạng</span><select name="format"><option value="long">Video dài</option><option value="short" ${t.format === 'short' ? 'selected' : ''}>Shorts</option></select></label>
        <label class="field"><span>Kênh</span><select name="channel">${channels().map((c) => `<option value="${esc(c.id)}" ${c.id === t.channel ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select></label>
        <label class="field"><span>Thư mục video</span><select name="slug"><option value="">(chưa có)</option>${S.data.videos.map((v) => `<option ${v.slug === t.slug ? 'selected' : ''}>${esc(v.slug)}</option>`).join('')}</select></label>
      </div>
      <label class="field"><span>Lịch đăng dự kiến (để trống = bỏ lịch)</span><input type="datetime-local" name="planAt" value="${t.planAt ? toLocalInput(new Date(t.planAt)) : ''}"></label>
      <label class="field"><span>Ghi chú (ý chính, nguồn tham khảo…)</span><textarea name="notes">${esc(t.notes)}</textarea></label>
      <div class="row"><span class="spacer"></span><button type="button" class="btn" data-close>Huỷ</button><button class="btn primary">Lưu</button></div>
    </form></div>`;
  m.hidden = false;
  $('#topicForm').onsubmit = async (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    f.slug = f.slug || null;
    f.planAt = f.planAt ? new Date(f.planAt).toISOString() : null;
    try { await api(`/api/topics/${id}`, { method: 'PUT', body: f }); closeModal(); await refresh(); render(); } catch (err) { toast(err.message); }
  };
}

// ---------- Kênh ----------
function renderChannels() {
  $('#view').innerHTML = `
    ${S.data.hasClient ? '' : notConnectedHtml({ name: 'YouTube' }, null)}
    <div class="grid">${channels().map((c) => {
      const on = S.data.connected[c.id];
      const n = S.data.topics.filter((t) => t.channel === c.id).length;
      return `<section class="card" style="display:flex;flex-direction:column;gap:8px">
        <div class="row"><h2>${esc(c.name)}</h2><span class="spacer"></span><span class="badge ${on ? 'good' : ''}">${on ? '● Đã kết nối' : 'Chưa kết nối'}</span></div>
        <div class="muted">${esc(c.handle || 'chưa có handle')} · <code>${esc(c.id)}</code> · ${n} chủ đề</div>
        ${c.description ? `<div>${esc(c.description)}</div>` : ''}
        <div class="row" style="margin-top:auto">
          ${on ? `<button class="btn" data-disconnect="${esc(c.id)}">Ngắt kết nối</button>` : `<button class="btn primary" data-connect="${esc(c.id)}" ${S.data.hasClient ? '' : 'disabled'}>Kết nối YouTube</button>`}
          <button class="btn" data-editch="${esc(c.id)}">Sửa</button>
          <button class="btn danger" data-delch="${esc(c.id)}">Xoá</button>
        </div></section>`;
    }).join('')}
    <section class="card"><h2>Thêm kênh</h2><p class="sub">Mỗi kênh đăng nhập một tài khoản Google riêng.</p>${channelForm({})}</section></div>`;
  bindChannelForm(null);
}
function channelForm(c) {
  return `<form class="form channel-form">
    <label class="field"><span>Tên kênh</span><input name="name" value="${esc(c.name ?? '')}" required></label>
    <label class="field"><span>Handle YouTube</span><input name="handle" value="${esc(c.handle ?? '')}" placeholder="@tenkenh"></label>
    <label class="field"><span>Mô tả ngắn</span><input name="description" value="${esc(c.description ?? '')}"></label>
    <div class="row"><span class="spacer"></span>${c.id ? '<button type="button" class="btn" data-close>Huỷ</button>' : ''}<button class="btn primary">${c.id ? 'Lưu' : 'Thêm kênh'}</button></div>
  </form>`;
}
function bindChannelForm(id) {
  const form = id ? $('#modal .channel-form') : $('#view .channel-form');
  form.onsubmit = async (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    try {
      await api('/api/channels', { method: 'POST', body: id ? { ...f, id } : { ...f, isNew: true } });
      if (id) closeModal();
      await refresh(); render(); toast(id ? 'Đã lưu' : 'Đã thêm kênh');
    } catch (err) { toast(err.message); }
  };
}

// ---------- sự kiện ----------
document.addEventListener('click', async (e) => {
  const el = e.target.closest('[data-plan],[data-open],[data-close],[data-connect],[data-disconnect],[data-pick],[data-vf],[data-scaffold],[data-edit],[data-del],[data-editch],[data-delch],[data-selmode],[data-sel],[data-selall],[data-selpub],[data-selnone],[data-cleanup]');
  if (!el) { if (e.target.id === 'modal') closeModal(); return; }
  const d = el.dataset;
  try {
    if (d.plan) await runPlan(d.plan, !!d.reset);
    else if (d.open) { openVideo(d.open); }
    else if ('close' in d) closeModal();
    else if (d.connect) { const { url } = await api(`/api/channels/${d.connect}/connect`, { method: 'POST' }); location.href = url; }
    else if (d.disconnect) { if (!confirm('Ngắt kết nối kênh này khỏi Studio?')) return; await api(`/api/channels/${d.disconnect}/disconnect`, { method: 'POST' }); delete S.stats[d.disconnect]; await refresh(); render(); }
    else if (d.pick) { setChannel(d.pick); }
    else if (d.vf) { S.videoFilter = d.vf; renderVideos(); }
    else if ('selmode' in d) { S.selMode = !S.selMode; S.sel.clear(); renderVideos(); }
    else if (d.sel) { S.sel.has(d.sel) ? S.sel.delete(d.sel) : S.sel.add(d.sel); renderVideos(); }
    else if ('selall' in d || 'selpub' in d || 'selnone' in d) {
      const list = S.data.videos.filter(inChannel).filter((v) => S.videoFilter === 'all' || v.format === S.videoFilter);
      S.sel = new Set('selnone' in d ? [] : list.filter((v) => (v.disk ?? 0) > 0 && ('selall' in d || v.uploaded)).map((v) => v.slug));
      renderVideos();
    }
    else if ('cleanup' in d) {
      const chosen = S.data.videos.filter((v) => S.sel.has(v.slug));
      if (!chosen.length) return;
      const bytes = chosen.reduce((a, v) => a + (v.disk ?? 0), 0);
      const notUp = chosen.filter((v) => !v.uploaded);
      const warn = notUp.length ? `\n\n⚠️ ${notUp.length} video CHƯA ĐĂNG — muốn đăng sẽ phải render lại:\n${notUp.slice(0, 8).map((v) => '• ' + v.title).join('\n')}${notUp.length > 8 ? '\n…' : ''}` : '';
      if (!confirm(`Xoá file render của ${chosen.length} video (~${fmtSize(bytes)})?\nGiữ nguyên kịch bản, thông tin đăng, mô tả, thumbnail, phụ đề.${warn}`)) return;
      const r = await api('/api/videos/cleanup', { method: 'POST', body: { slugs: chosen.map((v) => v.slug) } });
      S.sel.clear(); await refresh(); renderVideos();
      toast(`Đã giải phóng ${fmtSize(r.freed) || '0 MB'}${r.skipped.length ? ` · bỏ qua ${r.skipped.length} video đang render/upload` : ''}`, 6000);
    }
    else if (d.scaffold) { const t = await api(`/api/topics/${d.scaffold}/scaffold`, { method: 'POST' }); await refresh(); render(); toast(`Đã tạo videos/${t.slug}/video.js — nhờ Claude viết kịch bản`, 6000); }
    else if (d.edit) editTopic(d.edit);
    else if (d.del) { if (!confirm('Xoá chủ đề này? (thư mục video, nếu có, vẫn giữ nguyên)')) return; await api(`/api/topics/${d.del}`, { method: 'DELETE' }); await refresh(); render(); }
    else if (d.editch) {
      const c = channels().find((x) => x.id === d.editch);
      $('#modal').innerHTML = `<div class="dialog narrow"><div class="row"><h2>Sửa kênh</h2><span class="spacer"></span><button class="btn" data-close>✕</button></div>${channelForm(c)}</div>`;
      $('#modal').hidden = false;
      bindChannelForm(c.id);
    }
    else if (d.delch) { if (!confirm('Xoá kênh này khỏi Studio?')) return; await api(`/api/channels/${d.delch}`, { method: 'DELETE' }); await refresh(); render(); }
  } catch (err) { toast(err.message); }
});
document.addEventListener('change', async (e) => {
  const id = e.target.dataset?.status;
  if (!id) return;
  try { await api(`/api/topics/${id}`, { method: 'PUT', body: { status: e.target.value } }); await refresh(); renderTopics(); } catch (err) { toast(err.message); }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#modal').hidden) closeModal(); });
function setChannel(id) {
  S.channel = id;
  store.set('studio.channel', id);
  renderChannelPick();
  render();
}
$('#channelPick').onchange = (e) => setChannel(e.target.value);
addEventListener('hashchange', () => { closeModal(); render(); });
let rt;
addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => tab() === 'overview' && S.redraw?.(), 150); });

// Theo dõi tác vụ nền: khi có tác vụ chạy xong thì cập nhật giao diện.
async function tick() {
  const before = S.jobStatus;
  await refresh();
  S.jobStatus = Object.fromEntries(S.data.jobs.map((j) => [j.id, j.status]));
  const finished = S.data.jobs.filter((j) => before[j.id] && before[j.id] !== j.status && (j.status === 'done' || j.status === 'failed'));
  for (const j of finished) toast(`${{ build: 'Render', stills: 'Ảnh tĩnh', upload: 'Đăng YouTube' }[j.type]} ${j.slug}: ${j.status === 'done' ? 'xong ✓' : 'lỗi ✕'}`);
  if (finished.length) {
    if (finished.some((j) => j.type === 'upload')) for (const k of Object.keys(S.stats)) delete S.stats[k];
    if (S.openSlug) openVideo(S.openSlug); else if (tab() !== 'topics' || !document.activeElement?.matches('input,textarea,select')) render();
  } else updateJobPanel();
}
setInterval(() => { if (S.data?.jobs.some((j) => j.status === 'running' || j.status === 'queued')) tick(); }, 1500);

// khởi động
(async () => {
  const qs = new URLSearchParams(location.search);
  if (qs.has('connected')) toast(`Đã kết nối YouTube cho kênh ${qs.get('connected')} ✓`);
  if (qs.has('authError')) toast(`Kết nối thất bại: ${qs.get('authError')}`, 8000);
  if (qs.size) history.replaceState(null, '', `/${location.hash}`);
  await refresh();
  S.jobStatus = Object.fromEntries(S.data.jobs.map((j) => [j.id, j.status]));
  render();
})().catch((e) => { $('#view').innerHTML = `<p class="muted">Không tải được Studio: ${esc(e.message)}</p>`; });
