// Bộ công cụ vẽ "tay" cho từng khung hình. Mọi hàm đều thuần theo thời gian:
// cùng một t luôn cho ra cùng một hình → render song song được.
import rough from '/node_modules/roughjs/bundled/rough.esm.js';
import { ICONS } from './icons.js';
import { drawChar, POSES } from './characters.js';
import { PROPS, water } from './props.js';

export const C = {
  ink: '#2b2b2b', paper: '#f7f1e3', red: '#e4572e', blue: '#2e86de', sky: '#7ec8f0',
  yellow: '#f6c344', green: '#3bb273', purple: '#8e5bd3', orange: '#f08a24',
  pink: '#ef6f9a', brown: '#9c6b3f', gray: '#8a8a8a', white: '#ffffff',
};

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const ease = {
  linear: (x) => x,
  out: (x) => 1 - Math.pow(1 - x, 3),
  in: (x) => x * x * x,
  inOut: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  back: (x) => { const c = 1.70158; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); },
};

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SVGNS = 'http://www.w3.org/2000/svg';

const CHARACTERS = new Set(['person', 'child', 'warrior', 'woman', 'king', 'soldier']);

export class Kit {
  // style: 'sketch' (nét bút chì rung, mặc định cũ) | 'clean' (hoạt hình phẳng, nét sạch, font Be Vietnam Pro).
  constructor(canvas, { W, H, images = {}, style = 'sketch' }) {
    this.clean = style === 'clean';
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.W = W; this.H = H;
    this.C = C; this.ease = ease;
    this.gen = rough.generator();
    this.images = images;
    this.fontBody = this.clean ? '"Be Vietnam Pro"' : '"Patrick Hand"';
    this.fontTitle = this.clean ? '"Be Vietnam Pro"' : 'Pangolin';
    this.weightBody = this.clean ? 500 : '';
    this.weightTitle = this.clean ? 800 : '';
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    this.pathEl = document.createElementNS(SVGNS, 'path');
    svg.appendChild(this.pathEl);
    document.body.appendChild(svg);
    this.lenCache = new Map();
  }

  // Gọi trước khi vẽ mỗi cảnh trong một khung hình.
  begin({ scene, t, d, gt, cues = {}, audio = [], still = false, pencil = true }) {
    this.scene = scene; this.t = t; this.d = d; this.gt = gt; this.audio = audio ?? [];
    this.cues = cues; this.still = still; this.pencilOn = pencil;
    this.p = still ? 1 : clamp(t / d);
    this.idx = 0;
    this.boil = still || this.clean ? 0 : Math.floor(gt * 4) % 3;
    this.tip = null;
  }

  // ---------- thời gian ----------
  cue(name, off = 0) {
    if (typeof name === 'number') return name + off;
    if (!(name in this.cues)) throw new Error(`Không có cue "{${name}}" trong lời thoại cảnh ${this.scene}`);
    return this.cues[name] + off;
  }
  // Tiến độ 0..1 của một chuyển động bắt đầu ở `start` (giây hoặc tên cue), kéo dài `dur` giây.
  at(start, dur = 0.8, e = 'out') {
    if (this.still) return 1;
    const s = this.cue(start);
    return ease[e](clamp((this.t - s) / dur));
  }
  // Chia một tiến độ p thành n đoạn nối tiếp, trả về đoạn thứ i.
  seq(p, i, n, overlap = 0) {
    const span = 1 / (n - (n - 1) * overlap);
    const s = i * span * (1 - overlap);
    return clamp((p - s) / span + 1e-9);
  }
  lerp(a, b, p) { return a + (b - a) * p; }

  // Độ mở miệng 0..1 của vai `v` (tên trong meta.voices; null = giọng dẫn) ở thời điểm hiện tại, theo độ to giọng đọc thật.
  // Dùng: k.char(..., { talk: k.talk('me') }).
  talk(v = null) {
    if (this.still) return 0;
    for (const a of this.audio) {
      if ((a.v ?? null) !== v || !a.env) continue;
      const u = (this.t - a.at) * a.hz;
      if (u < 0 || u >= a.env.length) continue;
      const i = Math.floor(u), f = u - i;
      return a.env[i] * (1 - f) + (a.env[i + 1] ?? 0) * f;
    }
    return 0;
  }
  // Trộn hai tư thế (tên trong POSES hoặc {l,r}) theo p 0..1 → chuyển động tay mượt: pose: k.pose('stand', 'point', k.at('x', 0.4)).
  pose(a, b, p) {
    const A = typeof a === 'object' ? a : POSES[a], B = typeof b === 'object' ? b : POSES[b];
    const mix = (u, v) => u.map((x, i) => x + (v[i] - x) * p);
    return { l: mix(A.l, B.l), r: mix(A.r, B.r) };
  }
  rand(i) { return rng(i * 9301 + 49297)(); }
  // "Take" kiểu hoạt hình: nhún ra đòn (bẹt) ngay trước `start`, bật vươn lên, rồi nảy tắt dần.
  // Dùng: k.char(x, y, s, { sq: k.take('soc'), face: k.t > k.cue('soc') ? 'shock' : 'calm' }). amt ~0.6 (nhẹ) .. 1.5 (giật mình).
  take(start, amt = 1) {
    if (this.still) return 0;
    const u = this.t - this.cue(start);
    if (u < -0.14) return 0;
    if (u < 0) return 0.12 * amt * ease.out((u + 0.14) / 0.14);
    if (u < 0.09) return amt * this.lerp(0.12, -0.16, ease.out(u / 0.09));
    const v = u - 0.09;
    return -0.16 * amt * Math.exp(-5.5 * v) * Math.cos(17 * v);
  }

  // ---------- vẽ nét tay ----------
  _opts(o) {
    this.idx++;
    const seed = o.seed ?? (this.scene * 7919 + this.idx * 104729 + this.boil * 15485863) % 2147483646 + 1;
    const cl = this.clean;
    const r = {
      seed, stroke: o.stroke ?? (cl ? '#3b2f2a' : C.ink), strokeWidth: o.width ?? (cl ? 3.5 : 3),
      roughness: o.rough ?? (cl ? 0.25 : 1.1), bowing: o.bow ?? (cl ? 0.3 : 1),
      fillStyle: o.fillStyle ?? (cl ? 'solid' : 'hachure'), hachureGap: o.gap ?? 9,
      fillWeight: o.fillWeight ?? 2.2, hachureAngle: o.angle ?? -41,
    };
    if (o.fill) r.fill = o.fill;
    if (o.single || cl) r.disableMultiStroke = true;
    return r;
  }

  _len(d) {
    let L = this.lenCache.get(d);
    if (L === undefined) {
      if (this.lenCache.size > 20000) this.lenCache.clear();
      this.pathEl.setAttribute('d', d);
      L = this.pathEl.getTotalLength();
      this.lenCache.set(d, L);
    }
    return L;
  }

  _render(drawable, o) {
    const p = (o.p ?? 1) > 0.9995 ? 1 : o.p;
    if (p <= 0) return;
    const { ctx, gen } = this;
    const ro = drawable.options;
    ctx.save();
    ctx.globalAlpha *= o.alpha ?? 1;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const outlines = [], fills = [];
    for (const s of drawable.sets) (s.type === 'path' ? outlines : fills).push(s);
    const pOutline = fills.length ? clamp(p / 0.7) : p;
    const pFill = fills.length ? clamp((p - 0.45) / 0.55) : 0;

    if (pFill > 0) {
      ctx.save();
      ctx.globalAlpha *= pFill;
      for (const s of fills) {
        const path = new Path2D(gen.opsToPath(s));
        if (s.type === 'fillPath') { ctx.fillStyle = ro.fill; ctx.fill(path); }
        else { ctx.strokeStyle = ro.fill; ctx.lineWidth = ro.fillWeight; ctx.stroke(path); }
      }
      ctx.restore();
    }

    if (o.stroke !== 'none') {
      ctx.strokeStyle = ro.stroke; ctx.lineWidth = ro.strokeWidth;
      // rough vẽ mỗi đoạn hai lần (2 subpath liền nhau) → gom theo cặp để hai nét cùng chạy.
      const subs = [];
      for (const s of outlines) for (const d of gen.opsToPath(s).split(/(?=M)/)) if (d.trim()) subs.push(d);
      const groups = [];
      const pair = !ro.disableMultiStroke && subs.length % 2 === 0;
      for (let i = 0; i < subs.length; i += pair ? 2 : 1) groups.push(pair ? [subs[i], subs[i + 1]] : [subs[i]]);
      if (pOutline >= 1) {
        for (const g of groups) for (const d of g) ctx.stroke(new Path2D(d));
      } else {
        const lens = groups.map((g) => Math.max(...g.map((d) => this._len(d))));
        const total = lens.reduce((a, b) => a + b, 0);
        let budget = pOutline * total;
        for (let i = 0; i < groups.length && budget > 0; i++) {
          const take = Math.min(budget, lens[i]);
          budget -= take;
          for (const d of groups[i]) {
            ctx.setLineDash([take, lens[i] + 10]);
            ctx.stroke(new Path2D(d));
          }
          if (take < lens[i]) {
            this.pathEl.setAttribute('d', groups[i][0]);
            const pt = this.pathEl.getPointAtLength(take);
            this._setTip(pt.x, pt.y);
          }
        }
        ctx.setLineDash([]);
      }
    }
    ctx.restore();
  }

  _setTip(x, y) {
    const m = this.ctx.getTransform();
    const q = m.transformPoint(new DOMPoint(x, y));
    this.tip = { x: q.x, y: q.y };
  }

  // Hình có tô gạch (hachure) được lót thêm một lớp màu mờ bên dưới → giống tô bút chì màu, đậm đà hơn.
  _shape(o, make) {
    const r = this._opts(o);
    const tint = o.tint ?? 0.32;
    if (r.fill && r.fillStyle !== 'solid' && tint > 0 && (o.p ?? 1) > 0.45) {
      const base = make({ ...r, fillStyle: 'solid', roughness: Math.min(r.roughness, 0.8) });
      const pf = clamp(((o.p ?? 1) - 0.45) / 0.55);
      const { ctx, gen } = this;
      ctx.save();
      ctx.globalAlpha *= (o.alpha ?? 1) * tint * pf;
      ctx.fillStyle = r.fill;
      for (const st of base.sets) if (st.type === 'fillPath') ctx.fill(new Path2D(gen.opsToPath(st)));
      ctx.restore();
    }
    this._render(make(r), o);
  }
  line(x1, y1, x2, y2, o = {}) { this._shape(o, (r) => this.gen.line(x1, y1, x2, y2, r)); }
  rect(x, y, w, h, o = {}) { this._shape(o, (r) => this.gen.rectangle(x, y, w, h, r)); }
  circle(cx, cy, rad, o = {}) { this._shape(o, (r) => this.gen.circle(cx, cy, rad * 2, r)); }
  ellipse(cx, cy, w, h, o = {}) { this._shape(o, (r) => this.gen.ellipse(cx, cy, w, h, r)); }
  poly(pts, o = {}) { this._shape(o, (r) => this.gen.polygon(pts, r)); }
  lines(pts, o = {}) { this._shape(o, (r) => this.gen.linearPath(pts, r)); }
  curve(pts, o = {}) { this._shape(o, (r) => this.gen.curve(pts, r)); }
  arc(cx, cy, rad, a0, a1, o = {}) { this._shape(o, (r) => this.gen.arc(cx, cy, rad * 2, rad * 2, a0, a1, !!o.closed, r)); }
  path(d, o = {}) { this._shape(o, (r) => this.gen.path(d, r)); }

  // Mũi tên; o.bend > 0 để uốn cong.
  arrow(x1, y1, x2, y2, o = {}) {
    const p = o.p ?? 1;
    const bend = o.bend ?? 0;
    const mx = (x1 + x2) / 2 - (y2 - y1) * bend, my = (y1 + y2) / 2 + (x2 - x1) * bend;
    const body = { ...o, p: clamp(p / 0.8) };
    if (bend) this.curve([[x1, y1], [mx, my], [x2, y2]], body); else this.line(x1, y1, x2, y2, body);
    const ang = bend ? Math.atan2(y2 - my, x2 - mx) : Math.atan2(y2 - y1, x2 - x1);
    const hs = o.head ?? 22;
    const hp = clamp((p - 0.8) / 0.2);
    const h = { ...o, p: hp };
    this.line(x2, y2, x2 - hs * Math.cos(ang - 0.5), y2 - hs * Math.sin(ang - 0.5), h);
    this.line(x2, y2, x2 - hs * Math.cos(ang + 0.5), y2 - hs * Math.sin(ang + 0.5), h);
  }

  // Sóng hình sin từ (x, y) dài w. len = bước sóng (px), phase để sóng chạy.
  wave(x, y, w, o = {}) {
    const amp = o.amp ?? 30, len = o.len ?? 120, ph = o.phase ?? 0;
    const pts = [];
    const n = Math.max(8, Math.ceil(w / (len / 8)));
    for (let i = 0; i <= n; i++) {
      const xx = x + (w * i) / n;
      pts.push([xx, y + amp * Math.sin(((xx - x) / len) * Math.PI * 2 + ph)]);
    }
    this.curve(pts, { rough: 0.6, ...o });
  }

  // ---------- chữ ----------
  _font(o) {
    const title = o.font === 'title';
    return `${o.weight ?? (title ? this.weightTitle : this.weightBody)} ${o.size ?? 56}px ${title ? this.fontTitle : o.font ?? this.fontBody}`;
  }

  wrap(str, o = {}) {
    const { ctx } = this;
    ctx.save(); ctx.font = this._font(o);
    const out = [];
    for (const para of String(str).split('\n')) {
      if (!o.maxWidth) { out.push(para); continue; }
      let line = '';
      for (const w of para.split(' ')) {
        const test = line ? line + ' ' + w : w;
        if (ctx.measureText(test).width > o.maxWidth && line) { out.push(line); line = w; } else line = test;
      }
      out.push(line);
    }
    ctx.restore();
    return out;
  }

  // Viết chữ. o.p chạy hiệu ứng: 'write' (bút viết từ trái sang phải), 'fade', 'pop'.
  text(str, x, y, o = {}) {
    const { ctx } = this;
    const p = o.p ?? 1;
    const size = o.size ?? 56;
    const lh = size * (o.lineHeight ?? 1.25);
    const lines = this.wrap(str, o);
    ctx.save();
    ctx.font = this._font(o);
    ctx.textBaseline = 'middle';
    const align = o.align ?? 'center';
    const widths = lines.map((l) => ctx.measureText(l).width);
    const box = { w: Math.max(0, ...widths), h: lh * lines.length };
    if (p <= 0) { ctx.restore(); return box; }
    const fx = o.fx ?? 'write';
    ctx.globalAlpha *= (o.alpha ?? 1) * (fx === 'fade' ? p : 1);
    const y0 = y - (lh * (lines.length - 1)) / 2 + (fx === 'fade' ? (1 - p) * 20 : 0);
    const total = widths.reduce((a, b) => a + b, 0) || 1;
    let budget = p * total;
    lines.forEach((l, i) => {
      const w = widths[i];
      const lx = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
      const ly = y0 + i * lh;
      ctx.save();
      if (fx === 'pop') {
        const s = ease.back(clamp(p));
        ctx.translate(x, ly); ctx.scale(s, s); ctx.translate(-x, -ly);
      }
      if (fx === 'write' && p < 1) {
        const take = clamp(budget / w);
        budget -= w;
        if (take <= 0) { ctx.restore(); return; }
        ctx.beginPath(); ctx.rect(lx - 10, ly - lh, w * take + 10, lh * 2); ctx.clip();
        if (take < 1) this._setTip(lx + w * take, ly + Math.sin(this.t * 40) * size * 0.15);
      }
      if (o.outline) {
        ctx.lineJoin = 'round'; ctx.lineWidth = o.outlineWidth ?? size * 0.16;
        ctx.strokeStyle = o.outline; ctx.strokeText(l, lx, ly);
      }
      ctx.fillStyle = o.color ?? C.ink;
      ctx.textAlign = 'left';
      ctx.fillText(l, lx, ly);
      ctx.restore();
    });
    ctx.restore();
    return box;
  }

  // Bút dạ quang tô sau chữ.
  highlight(x, y, w, h, o = {}) {
    const p = o.p ?? 1;
    if (p <= 0) return;
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha *= o.alpha ?? 0.45;
    ctx.fillStyle = o.color ?? C.yellow;
    ctx.beginPath();
    ctx.moveTo(x, y + 4); ctx.lineTo(x + w * p, y); ctx.lineTo(x + w * p + 6, y + h); ctx.lineTo(x - 4, y + h - 3);
    ctx.fill();
    ctx.restore();
  }
  underline(x, y, w, o = {}) { this.curve([[x, y], [x + w * 0.5, y + 6], [x + w, y - 2]], { width: 4, stroke: C.red, ...o }); }

  // ---------- ảnh & icon ----------
  // Ảnh vẽ tay (PNG) đặt trong videos/<slug>/assets, khai báo ở meta.images.
  image(name, x, y, w, h, o = {}) {
    const img = this.images[name];
    if (!img) throw new Error(`Chưa khai báo ảnh "${name}" trong meta.images`);
    const p = o.p ?? 1;
    if (p <= 0) return;
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha *= o.alpha ?? 1;
    if ((o.fx ?? 'wipe') === 'wipe' && p < 1) {
      ctx.beginPath(); ctx.rect(x, y, w * p, h); ctx.clip();
      this._setTip(x + w * p, y + h * (0.5 + 0.4 * Math.sin(this.t * 9)));
    } else if (o.fx === 'fade') ctx.globalAlpha *= p;
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();
  }

  // Ảnh thật (scripts/anh-that.mjs → assets/credits.json, tự nạp): cắt vừa khung (cover) + Ken Burns + ghi công.
  //   k.photo('ca-voi', 0, 0, k.W, k.H, { zoom: [1, 1.08], pan: [[0.4, 0.5], [0.6, 0.5]], p: k.at('x', 0.8), credit: true })
  // o.zoom [đầu, cuối] (≥ 1), o.pan [[fx,fy] đầu, [fx,fy] cuối] = điểm nhìn 0..1 trong ảnh (mặc định credits.focus hoặc giữa),
  // o.kp tiến độ chuyển động (mặc định cả cảnh k.p), o.p hiện ra (fx 'fade' | 'wipe' | 'zoom'), o.radius bo góc, o.border [màu, dày],
  // o.credit true (tác giả + giấy phép từ credits.json) | chuỗi | false, o.dim 0..1 phủ tối (để chữ nổi), o.alpha.
  photo(name, x = 0, y = 0, w = this.W, h = this.H, o = {}) {
    const img = this.images[name];
    if (!img) throw new Error(`Chưa có ảnh "${name}" (tải bằng scripts/anh-that.mjs get <slug> … --name ${name})`);
    const p = o.p ?? 1;
    if (p <= 0) return;
    const { ctx } = this;
    const cr = this.credits?.[name] ?? {};
    const kp = clamp(o.kp ?? this.p);
    const [z0, z1] = o.zoom ?? [1, 1.06];
    const f0 = o.pan?.[0] ?? o.focus ?? cr.focus ?? [0.5, 0.5];
    const f1 = o.pan?.[1] ?? f0;
    const e = ease.inOut(kp);
    let z = z0 + (z1 - z0) * e;
    const fx = f0[0] + (f1[0] - f0[0]) * e, fy = f0[1] + (f1[1] - f0[1]) * e;
    const fxIn = o.fx ?? 'fade';
    if (fxIn === 'zoom' && p < 1) z *= 1 + 0.12 * (1 - ease.out(p));
    // vùng cắt trong ảnh gốc: tỉ lệ khung w/h, phủ kín (cover) rồi thu nhỏ theo zoom, tâm tại điểm nhìn
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const s = Math.max(w / iw, h / ih) * z;
    const sw = w / s, sh = h / s;
    const sx = clamp(fx * iw - sw / 2, 0, iw - sw), sy = clamp(fy * ih - sh / 2, 0, ih - sh);
    ctx.save();
    ctx.globalAlpha *= (o.alpha ?? 1) * (fxIn === 'fade' || fxIn === 'zoom' ? ease.out(p) : 1);
    const r = o.radius ?? 0;
    ctx.beginPath();
    if (r) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
    if (fxIn === 'wipe' && p < 1) { ctx.save(); ctx.clip(); ctx.beginPath(); ctx.rect(x, y, w * ease.out(p), h); }
    ctx.save(); ctx.clip();
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    if (o.dim) { ctx.fillStyle = `rgba(0,0,0,${o.dim})`; ctx.fillRect(x, y, w, h); }
    ctx.restore();
    if (fxIn === 'wipe' && p < 1) ctx.restore();
    if (o.border) {
      ctx.beginPath();
      if (r) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
      ctx.strokeStyle = o.border[0]; ctx.lineWidth = o.border[1] ?? 6; ctx.stroke();
    }
    const credit = o.credit === false ? '' : typeof o.credit === 'string' ? o.credit
      : o.credit || /BY/i.test(cr.license ?? '') ? [cr.author, cr.license].filter(Boolean).join(' · ') : '';
    if (credit) {
      const size = Math.max(16, Math.round(Math.min(w, h) * 0.022));
      ctx.font = `500 ${size}px ${this.fontBody}`;
      const txt = `📷 ${credit}`.slice(0, 90);
      const tw = ctx.measureText(txt).width;
      const bx = x + w - tw - size * 1.4, by = y + h - size * 2;
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.beginPath(); ctx.roundRect(bx, by, tw + size, size * 1.5, size * 0.4); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.88)'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
      ctx.fillText(txt, bx + size * 0.5, by + size * 0.76);
    }
    ctx.restore();
  }

  // Clip video thật (scripts/anh-that.mjs get … --video → assets/clips/<tên>/0001.jpg…, credits.json type 'clip').
  //   k.clip('ca-voi-boi', 0, 0, k.W, k.H, { at: 'cue', speed: 1, loop: false, zoom: [1, 1.04], pan, p, fx, dim, radius, border, credit })
  // Khung clip = (thời gian trong cảnh − at) × 30 × speed. Khung chưa nạp → player chờ nạp rồi vẽ lại (không mất khung).
  // Zoom tối đa ~1,05: clip đã là ảnh động, phóng thêm sẽ mờ.
  clip(name, x = 0, y = 0, w = this.W, h = this.H, o = {}) {
    const c = this.clipsMeta?.[name];
    if (!c) throw new Error(`Chưa có clip "${name}" (tải bằng scripts/anh-that.mjs search … --video, rồi get … --name ${name})`);
    const start = o.at == null ? 0 : this.cue(o.at);
    // Không để clip đứng hình khi lời đọc dài hơn clip (người dùng: "bị đứng như lag", 12/11/2026):
    // clip ngắn hơn phần còn lại của cảnh → tự chậm lại cho vừa (tối đa còn 1/2 tốc độ); vẫn thiếu → chạy xuôi rồi ngược (ping-pong).
    // o.hold = true giữ cách cũ (dừng ở khung cuối, vd khung "mất tín hiệu"); o.loop = lặp vòng.
    const len = c.frames / c.fps, avail = Math.max(0.1, (this.d ?? len) - start);
    let speed = o.speed ?? 1, bounce = false;
    if (!o.hold && !o.loop && len / speed < avail) {
      const fit = len / avail;
      if (fit >= speed * 0.5) speed = fit; else { speed = speed * 0.5; bounce = true; }
    }
    const local = Math.max(0, (this.still ? (o.stillAt ?? 0) : this.t - start)) * speed;
    let fi = Math.floor(local * c.fps + 1e-6);
    if (bounce) { const n = c.frames - 1, m = fi % (2 * n); fi = m <= n ? m : 2 * n - m; }
    else fi = o.loop ? fi % c.frames : Math.min(fi, c.frames - 1);
    const url = `/videos/${this.slug}/${c.dir}/${String(fi + 1).padStart(4, '0')}.jpg`;
    let img = this.clipCache?.get(url);
    if (!img) { this.pendingClips.add(url); img = this.clipLast?.[name]; if (!img) return fi / c.fps; }
    (this.clipLast ??= {})[name] = img;
    const prevImg = this.images.__clip, prevCr = this.credits?.__clip;
    this.images.__clip = img; if (this.credits) this.credits.__clip = c;
    this.photo('__clip', x, y, w, h, { zoom: [1, 1.03], ...o });
    this.images.__clip = prevImg; if (this.credits) this.credits.__clip = prevCr;
    return fi / c.fps; // giây trong clip đang chiếu (để đồng bộ đồ hoạ vẽ chồng)
  }

  // o.bob: biên độ nhún (đơn vị icon, ~2–4) cho nhân vật "sống"; o.shadow: bóng đổ dưới chân (mặc định cho nhân vật).
  icon(name, x, y, size = 160, o = {}) {
    const fn = ICONS[name];
    if (!fn) throw new Error(`Không có icon "${name}". Có: ${Object.keys(ICONS).join(', ')}`);
    const p = o.p ?? 1;
    const phase = (x * 0.013 + y * 0.007) % 6.28;
    const bob = o.bob ? Math.sin((this.gt ?? 0) * 4 + phase) * o.bob : 0;
    // p = 0: vẫn gọi hàm vẽ (giữ seed ổn định) nhưng trong suốt, tránh chấm đầu nét còn sót.
    this.group({ x, y, s: size / 100, r: o.rotate ?? 0, a: p > 0 ? 1 : 0 }, () => {
      if ((o.shadow ?? CHARACTERS.has(name)) && p > 0.3) this.shadow(0, 50, 64, Math.min(1, (p - 0.3) / 0.4));
      this.group({ y: bob, s: 1 }, () => fn(this, p, { ...o, phase }));
    });
  }

  // Nhân vật hoạt hình phẳng: (x, y) = điểm giữa hai bàn chân, size = chiều cao (px). Xem engine/characters.js.
  char(x, y, size, o = {}) { drawChar(this, x, y, size, o); }

  // Đồ vật phẳng: (x, y) = tâm, size = cạnh hộp (px). o.p hiện ra kiểu "nảy", o.flip lật ngang. Xem engine/props.js.
  prop(name, x, y, size = 160, o = {}) {
    const fn = PROPS[name];
    if (!fn) throw new Error(`Không có prop "${name}". Có: ${Object.keys(PROPS).join(', ')}`);
    const p = o.p ?? 1;
    if (p <= 0) return;
    const s = (size / 100) * (0.75 + 0.25 * ease.back(clamp(p)));
    const bob = o.bob ? Math.sin((this.gt ?? 0) * 4 + x * 0.01) * o.bob : 0;
    const { ctx } = this;
    ctx.save();
    ctx.translate(x, y + bob);
    ctx.globalAlpha *= clamp(p / 0.4) * (o.alpha ?? 1);
    ctx.rotate(o.rotate ?? 0);
    ctx.scale(s * (o.flip ? -1 : 1), s);
    if (o.shadow) { ctx.save(); ctx.globalAlpha *= 0.16; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(0, 50, 46, 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    fn(this, o);
    ctx.restore();
  }

  // Nước dâng toàn khung ở mức y (px).
  water(level, o = {}) { water(this, level, o); }

  // ---------- không khí rùng rợn ----------
  // Phủ bóng tối, khoét các vùng sáng: lights = [{ x, y, r, flicker, warm }].
  darkness(a, lights = [], color = 'rgb(8,10,24)') {
    if (a <= 0) return;
    const { W, H } = this;
    const c = (this._dark ??= Object.assign(document.createElement('canvas'), { width: W, height: H }));
    const g = c.getContext('2d');
    g.globalCompositeOperation = 'source-over';
    g.clearRect(0, 0, W, H);
    g.globalAlpha = a; g.fillStyle = color; g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = 'destination-out'; g.globalAlpha = 1;
    const t = this.gt ?? 0;
    for (const l of lights) {
      const r = l.r * (1 + (l.flicker ?? 0) * (0.06 * Math.sin(t * 13 + l.x) + 0.04 * Math.sin(t * 29 + l.y)));
      const rg = g.createRadialGradient(l.x, l.y, 0, l.x, l.y, r);
      rg.addColorStop(0, 'rgba(0,0,0,1)'); rg.addColorStop(0.55, 'rgba(0,0,0,0.75)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = rg; g.fillRect(l.x - r, l.y - r, r * 2, r * 2);
    }
    this.ctx.drawImage(c, 0, 0);
    for (const l of lights) if (l.warm) {
      const ctx = this.ctx;
      const rg = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r * 0.7);
      rg.addColorStop(0, `rgba(255,190,90,${0.28 * l.warm})`); rg.addColorStop(1, 'rgba(255,190,90,0)');
      ctx.save(); ctx.fillStyle = rg; ctx.fillRect(l.x - l.r, l.y - l.r, l.r * 2, l.r * 2); ctx.restore();
    }
  }

  // Sương mù trôi ngang ở độ cao y.
  fog(o = {}) {
    const { ctx, W } = this; const t = this.gt ?? 0;
    const y = o.y ?? this.H * 0.8, a = o.alpha ?? 0.35;
    ctx.save();
    for (let i = 0; i < 9; i++) {
      const x = ((i * 290 + t * (o.speed ?? 25) * (1 + (i % 3) * 0.3)) % (W + 600)) - 300;
      const yy = y + Math.sin(i * 2.1 + t * 0.4) * 40;
      const rg = ctx.createRadialGradient(x, yy, 0, x, yy, 260);
      rg.addColorStop(0, `rgba(220,230,240,${a})`); rg.addColorStop(1, 'rgba(220,230,240,0)');
      ctx.fillStyle = rg; ctx.beginPath(); ctx.ellipse(x, yy, 300, 110, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  // Chớp sáng toàn khung (sấm sét) tại cue.
  flash(start, dur = 0.6, color = '255,255,255') {
    if (this.still) return;
    const u = (this.t - this.cue(start)) / dur;
    if (u < 0 || u > 1) return;
    const { ctx } = this;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = `rgba(${color},${0.85 * (1 - u) ** 2 * (u < 0.15 || u > 0.3 ? 1 : 0.3)})`;
    ctx.fillRect(0, 0, this.W, this.H); ctx.restore();
  }

  // Viền tối quanh khung.
  vignette(a = 0.5) {
    const { ctx, W, H } = this;
    const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, W * 0.7);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
  }

  // Đôi mắt phát sáng trong bóng tối (tự chớp).
  glowEyes(x, y, s = 1, color = '#ffe066', o = {}) {
    const p = o.p ?? 1;
    if (p <= 0) return;
    const blink = !this.still && ((this.gt ?? 0) + x * 0.01) % 4 < 0.15;
    const { ctx } = this;
    ctx.save(); ctx.globalAlpha *= p; ctx.shadowColor = color; ctx.shadowBlur = 25 * s; ctx.fillStyle = color;
    for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + d * 22 * s, y, 11 * s, (blink ? 1.5 : 7) * s, d * -0.15, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }

  // Bóng đổ mềm hình elip.
  shadow(x, y, w, a = 1) {
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha *= 0.16 * a;
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(x, y, w / 2, w / 7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  // Mặt nhân vật: tâm (x, y), bán kính đầu r. mood: calm | happy | angry | shock | sad | smug | blank | shout | laugh | sleep | gross | cry | cold.
  // o.mouth 0..1 = miệng mở khi nói (k.talk), o.tears 0..1 = nước mắt (đọng → chảy), o.look -1..1 = liếc ngang,
  // o.flush 0..1 = mặt đỏ giận, o.gloom 0..1 = vạch tối trên trán (chết lặng), o.vein = gân giận, o.lw = hệ số độ dày nét.
  face(x, y, r, mood = 'calm', o = {}) {
    const p = o.p ?? 1;
    if (p < 0.6) return;
    const { ctx } = this;
    const ink = o.ink ?? '#2b2b2b';
    const blink = !this.still && ((this.gt ?? 0) + (o.phase ?? 0)) % 3.7 < 0.12 && !['shock', 'shout', 'laugh', 'blank', 'smug', 'cry', 'sleep'].includes(mood);
    ctx.save();
    ctx.globalAlpha *= Math.min(1, (p - 0.6) / 0.3);
    ctx.translate(x, y);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = ink; ctx.fillStyle = ink;
    const lw = Math.max(1.5, r * 0.11) * (o.lw ?? 1);
    ctx.lineWidth = lw;
    const ex = r * 0.36, ey = -r * 0.08, er = r * 0.11;
    const line = (x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };
    const curve = (x1, y1, cx, cy, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(cx, cy, x2, y2); ctx.stroke(); };
    const tears = o.tears ?? 0, look = (o.look ?? 0) * er * 0.55, lookY = (o.lookY ?? 0) * er * 0.6, gt = this.still ? 0 : this.gt ?? 0;
    // mặt đỏ bừng / vạch tối trên trán (vẽ trước để nét mặt nằm trên)
    if (o.flush) { ctx.save(); ctx.globalAlpha *= 0.3 * o.flush; ctx.fillStyle = '#e8402f'; ctx.beginPath(); ctx.ellipse(0, r * 0.12, r * 0.85, r * 0.6, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    if (o.gloom) {
      ctx.save(); ctx.globalAlpha *= o.gloom;
      const g = ctx.createLinearGradient(0, -r * 0.55, 0, r * 0.1); g.addColorStop(0, 'rgba(70,60,140,0.55)'); g.addColorStop(1, 'rgba(70,60,140,0)');
      ctx.beginPath(); ctx.ellipse(0, -r * 0.12, r * 0.95, r * 0.99, 0, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = g; ctx.fillRect(-r, -r * 0.55, r * 2, r * 0.65);
      ctx.strokeStyle = '#3f3570'; ctx.lineWidth = lw * 0.5;
      for (let i = -3; i <= 3; i++) line(i * r * 0.12, -r * (0.5 - 0.03 * Math.abs(i)), i * r * 0.12, -r * (0.24 - 0.02 * Math.abs(i)));
      ctx.restore();
    }
    // mắt
    for (const d of [-1, 1]) {
      const X = d * ex;
      if (blink || mood === 'blank') line(X - er * 1.2, ey, X + er * 1.2, ey);
      else if (mood === 'sleep' || mood === 'cry') curve(X - er * 1.4, ey, X, ey + er * 1.3, X + er * 1.4, ey);
      else if (mood === 'happy' || mood === 'laugh') curve(X - er * 1.4, ey + er * 0.6, X, ey - er * 1.6, X + er * 1.4, ey + er * 0.6);
      else if (mood === 'shout') { line(X - d * er * 1.3, ey - er, X + d * er * 0.6, ey); line(X + d * er * 0.6, ey, X - d * er * 1.3, ey + er); }
      else if (mood === 'gross') { line(X + d * er * 1.3, ey - er, X - d * er * 0.6, ey); line(X - d * er * 0.6, ey, X + d * er * 1.3, ey + er); }
      else if (mood === 'shock') {
        ctx.save(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(X, ey, er * 2.1, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
        ctx.beginPath(); ctx.arc(X, ey, er * 0.9, 0, Math.PI * 2); ctx.fill();
      } else if (mood === 'smug') line(X - er * 1.4, ey, X + er * 1.4, ey - er * 0.2);
      else if (mood === 'cold') { // khinh khỉnh: mí trên sụp nửa mắt
        ctx.save(); ctx.beginPath(); ctx.rect(X - er * 2, ey - er * 0.15, er * 4, er * 3); ctx.clip();
        ctx.beginPath(); ctx.ellipse(X + look, ey, er * 1.35, er * 1.6, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        line(X - er * 1.7, ey - er * 0.15 - d * er * 0.15, X + er * 1.7, ey - er * 0.15 + d * er * 0.15);
      } else if (o.big) {
        ctx.beginPath(); ctx.ellipse(X + look, ey + lookY, er * 1.35, er * 1.75, 0, 0, Math.PI * 2); ctx.fill();
        ctx.save(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(X + look - er * 0.4, ey + lookY - er * 0.6, er * 0.45, 0, Math.PI * 2); ctx.fill();
        if (tears > 0) { ctx.globalAlpha *= Math.min(1, tears * 3); ctx.beginPath(); ctx.arc(X + look + er * 0.45, ey + er * 0.7, er * 0.3, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(X + look + er * 0.1, ey - er * 0.1, er * 0.16, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      } else { ctx.beginPath(); ctx.arc(X + look, ey, er, 0, Math.PI * 2); ctx.fill(); }
      // lông mày
      const by = ey - r * 0.3;
      if (mood === 'angry' || mood === 'shout') line(X + d * r * 0.08 * -1 + d * r * 0.05, by + r * 0.1, X + d * r * 0.3, by - r * 0.06);
      else if (mood === 'sad' || mood === 'cry') line(X - d * r * 0.05, by - r * 0.08, X + d * r * 0.25, by + r * 0.06);
      else if (mood === 'cold') line(X - r * 0.18, by + d * r * 0.03, X + r * 0.18, by - d * r * 0.03);
      else if (mood === 'shock') curve(X - r * 0.18, by - r * 0.02, X, by - r * 0.16, X + r * 0.18, by - r * 0.02);
      else if (mood === 'smug' && d === 1) line(X - r * 0.15, by - r * 0.08, X + r * 0.2, by - r * 0.02);
    }
    // miệng
    const my = r * 0.38;
    const m = o.mouth ?? 0;
    if (m > 0.04 && mood !== 'gross') { // đang nói: miệng mở theo độ to giọng
      const wide = ['angry', 'shout'].includes(mood) || o.flush ? 1.3 : mood === 'cold' ? 0.85 : 1;
      const down = mood === 'sad' || mood === 'cry' ? 1 : 0;
      const mw = r * (0.15 + 0.1 * m) * wide, mh = r * (0.035 + 0.2 * m), cy0 = my + down * r * 0.07;
      const mouth = mood === 'shock' ? () => { ctx.beginPath(); ctx.ellipse(0, my + r * 0.04, r * 0.12 + mw * 0.2, r * 0.12 + mh * 0.9, 0, 0, Math.PI * 2); } : () => { ctx.beginPath(); ctx.moveTo(-mw, cy0); ctx.quadraticCurveTo(0, cy0 - mh * (down ? 1.4 : 0.5), mw, cy0); ctx.quadraticCurveTo(0, cy0 + mh * (down ? 0.7 : 1.6), -mw, cy0); ctx.closePath(); };
      ctx.save(); mouth(); ctx.fillStyle = '#7a2a22'; ctx.fill(); ctx.clip();
      ctx.fillStyle = '#e8707a'; ctx.beginPath(); ctx.ellipse(0, cy0 + mh * 1.3, mw * 0.6, mh * 0.6, 0, 0, Math.PI * 2); ctx.fill();
      if (wide > 1) { ctx.fillStyle = '#fff'; ctx.fillRect(-mw, cy0 - mh, mw * 2, mh * 0.75); }
      ctx.restore(); mouth(); ctx.stroke();
    } else if (mood === 'happy') curve(-r * 0.3, my - r * 0.06, 0, my + r * 0.3, r * 0.3, my - r * 0.06);
    else if (mood === 'laugh' || mood === 'shout') {
      ctx.beginPath(); ctx.moveTo(-r * 0.3, my - r * 0.08); ctx.quadraticCurveTo(0, my + r * 0.5, r * 0.3, my - r * 0.08); ctx.closePath();
      ctx.save(); ctx.fillStyle = '#7a2a22'; ctx.fill(); ctx.restore(); ctx.stroke();
    } else if (mood === 'angry' || mood === 'sad') curve(-r * 0.24, my + r * 0.1, 0, my - r * 0.14, r * 0.24, my + r * 0.1);
    else if (mood === 'shock') { ctx.beginPath(); ctx.ellipse(0, my + r * 0.04, r * 0.12, r * 0.17, 0, 0, Math.PI * 2); ctx.save(); ctx.fillStyle = '#7a2a22'; ctx.fill(); ctx.restore(); ctx.stroke(); }
    else if (mood === 'smug') curve(-r * 0.2, my + r * 0.02, r * 0.08, my + r * 0.12, r * 0.28, my - r * 0.1);
    else if (mood === 'gross') { // miệng méo + lưỡi thè, má xanh
      ctx.beginPath(); ctx.moveTo(-r * 0.3, my); ctx.quadraticCurveTo(-r * 0.15, my - r * 0.1, 0, my); ctx.quadraticCurveTo(r * 0.15, my + r * 0.1, r * 0.3, my); ctx.stroke();
      ctx.save(); ctx.fillStyle = '#e8707a'; ctx.beginPath(); ctx.ellipse(r * 0.06, my + r * 0.1, r * 0.09, r * 0.11, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.globalAlpha *= 0.4; ctx.fillStyle = '#7cc46a';
      for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * r * 0.55, my - r * 0.14, r * 0.16, r * 0.1, 0, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    }
    else if (mood === 'blank') line(-r * 0.15, my, r * 0.15, my);
    else if (mood === 'cry') { ctx.beginPath(); ctx.moveTo(-r * 0.22, my + r * 0.08); ctx.lineTo(-r * 0.1, my - r * 0.02); ctx.lineTo(0, my + r * 0.04); ctx.lineTo(r * 0.1, my - r * 0.02); ctx.lineTo(r * 0.22, my + r * 0.08); ctx.stroke(); }
    else if (mood === 'cold') line(-r * 0.16, my + r * 0.04, r * 0.18, my);
    else curve(-r * 0.2, my, 0, my + r * 0.12, r * 0.2, my);
    // nước mắt: đọng ở mi dưới → chảy thành dòng dọc má → nhỏ giọt
    if (tears > 0) for (const d of [-1, 1]) {
      const X = d * ex, ty = ey + er * 1.7;
      ctx.save(); ctx.fillStyle = 'rgba(150,205,255,0.9)'; ctx.beginPath(); ctx.ellipse(X, ty, er * 1.5, er * 0.4 * Math.min(1, tears * 3), 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      const L = r * 1.0 * clamp((tears - 0.25) / 0.75);
      if (L > 0) {
        const sx = X + d * er * 0.9, w = Math.sin(gt * 5 + d) * er * 0.25;
        ctx.save(); ctx.lineCap = 'round';
        ctx.strokeStyle = 'rgba(120,185,250,0.85)'; ctx.lineWidth = er * 0.95;
        ctx.beginPath(); ctx.moveTo(sx, ty); ctx.quadraticCurveTo(sx + d * er * 0.6 + w, ty + L * 0.5, sx + d * er * 0.3, ty + L); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,0.75)'; ctx.lineWidth = er * 0.25;
        ctx.beginPath(); ctx.moveTo(sx - d * er * 0.15, ty + er * 0.3); ctx.quadraticCurveTo(sx + d * er * 0.4 + w, ty + L * 0.5, sx + d * er * 0.15, ty + L * 0.9); ctx.stroke();
        if (tears >= 1) { const u = (gt * 1.3 + (d + 1) * 0.37) % 1; ctx.globalAlpha *= 1 - u; ctx.fillStyle = 'rgba(120,185,250,0.9)'; ctx.beginPath(); ctx.arc(sx + d * er * 0.3, ty + L + u * r * 0.7, er * 0.45, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      }
    }
    if (o.vein) { // dấu gân giận ở thái dương
      ctx.save(); ctx.strokeStyle = '#d63a2f'; ctx.lineWidth = lw * 0.9; const vx = r * 0.52, vy = -r * 0.62, q = r * 0.1;
      for (const [a, b] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) curve(vx + a * q * 0.4, vy + b * q * 1.4, vx + a * q * 0.5, vy + b * q * 0.5, vx + a * q * 1.4, vy + b * q * 0.4);
      ctx.restore();
    }
    // má hồng
    if (mood === 'happy' || mood === 'laugh' || o.blush) {
      ctx.save(); ctx.globalAlpha *= 0.35; ctx.fillStyle = '#ef6f9a';
      for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * r * 0.55, my - r * 0.12, r * 0.14, r * 0.08, 0, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    }
    ctx.restore();
  }

  // ---------- hiệu ứng truyện tranh ----------
  // Chữ nổ trong hình sao gai: "BÙM!", "RẮC!"…
  burst(x, y, r, str, o = {}) {
    const p = o.p ?? 1;
    if (p <= 0) return;
    const s = ease.back(clamp(p));
    const size = o.size ?? r * 0.62;
    if (str) { // hình nổ tự nở theo độ dài chữ
      this.ctx.save(); this.ctx.font = this._font({ size, font: 'title' });
      r = Math.max(r, this.ctx.measureText(str).width * 0.56 + size * 0.3);
      this.ctx.restore();
    }
    this.group({ x, y, s, r: o.rotate ?? -0.08 }, () => {
      const pts = [];
      const n = o.spikes ?? 14;
      for (let i = 0; i < n * 2; i++) {
        const a = (i / (n * 2)) * Math.PI * 2;
        const rr = i % 2 ? r * 0.72 : r * (1 + 0.12 * Math.sin(i * 7.3));
        pts.push([Math.cos(a) * rr * 1.35, Math.sin(a) * rr]);
      }
      this.poly(pts, { fill: o.fill ?? C.yellow, fillStyle: 'solid', stroke: o.stroke ?? C.red, width: 5, seed: o.seed ?? 700 });
      if (str) this.text(str, 0, 4, { size, font: 'title', color: o.color ?? C.red, outline: C.white, outlineWidth: size * 0.14 });
    });
  }

  // Bong bóng thoại: hộp (x, y, w, h), đuôi chỉ về (tx, ty). o.text tự xuống dòng; o.think = bong bóng suy nghĩ.
  bubble(x, y, w, h, tx, ty, o = {}) {
    const p = o.p ?? 1;
    if (p <= 0) return;
    const s = ease.back(clamp(p * 1.4));
    const cx = x + w / 2, cy = y + h / 2;
    this.group({ x: cx, y: cy, s }, () => {
      this.group({ x: -cx, y: -cy }, () => {
        const fill = o.fill ?? C.white;
        if (o.think) {
          this.ellipse(cx, cy, w, h, { fill, fillStyle: 'solid', width: 4, seed: o.seed ?? 710 });
          for (let i = 1; i <= 3; i++) {
            const k = i / 4;
            this.circle(this.lerp(cx, tx, 0.55 + k * 0.4), this.lerp(y + h, ty, 0.2 + k * 0.7), 16 - i * 4, { fill, fillStyle: 'solid', width: 3, seed: (o.seed ?? 710) + i });
          }
        } else {
          const bx = Math.max(x + 40, Math.min(x + w - 90, tx - 30));
          const below = ty > y + h;
          const by = below ? y + h - 3 : y + 3;
          this.rect(x, y, w, h, { fill, fillStyle: 'solid', width: 4, rough: this.clean ? 0.15 : 1.2, seed: o.seed ?? 710 });
          this.poly([[bx, by], [tx, ty], [bx + 56, by]], { fill, fillStyle: 'solid', width: 4, seed: (o.seed ?? 710) + 1 });
          this.line(bx + 3, by, bx + 53, by, { stroke: fill, width: 8, seed: (o.seed ?? 710) + 2 });
        }
        if (o.text) this.text(o.text, cx, cy, { size: o.size ?? 52, font: 'title', maxWidth: w - 50, color: o.color ?? C.ink, p: o.textP ?? clamp((p - 0.3) / 0.7), fx: o.fx ?? 'fade' });
      });
    });
  }

  // Vệt tốc độ phía sau vật chuyển động theo hướng (dx, dy).
  motion(x, y, dx, dy, o = {}) {
    const n = o.n ?? 4, len = o.len ?? 120, gap = o.gap ?? 26;
    const L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    for (let i = 0; i < n; i++) {
      const off = (i - (n - 1) / 2) * gap;
      const sx = x - ux * 30 - uy * off, sy = y - uy * 30 + ux * off;
      this.line(sx, sy, sx - ux * len * (0.6 + 0.4 * ((i * 7) % 3) / 2), sy - uy * len * (0.6 + 0.4 * ((i * 7) % 3) / 2), { p: o.p ?? 1, stroke: o.stroke ?? C.gray, width: o.width ?? 4, seed: (o.seed ?? 730) + i });
    }
  }

  // Đường tập trung kiểu manga: tia đen từ mép khung chụm về (x, y), chừa vòng tròn trống bán kính r.
  focusLines(x, y, o = {}) {
    const p = o.p ?? 1;
    if (p <= 0) return;
    const { ctx, W, H } = this;
    const n = o.n ?? 90, r0 = o.r ?? 380, R = Math.hypot(W, H);
    const frame = this.still ? 0 : Math.floor((this.gt ?? 0) * 12);
    const rnd = rng(frame * 31 + (o.seed ?? 1));
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha *= p * (o.alpha ?? 0.85); ctx.fillStyle = o.color ?? '#1d1d1d';
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + rnd() * 0.05, w = (0.004 + rnd() * 0.012), ri = r0 * (1 + rnd() * 0.5);
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a - w) * R, y + Math.sin(a - w) * R);
      ctx.lineTo(x + Math.cos(a) * ri, y + Math.sin(a) * ri);
      ctx.lineTo(x + Math.cos(a + w) * R, y + Math.sin(a + w) * R);
      ctx.fill();
    }
    ctx.restore();
  }

  // Mưa rơi chéo trong khung (x, y, w, h).
  rain(x, y, w, h, o = {}) {
    const { ctx } = this; const t = this.gt ?? 0;
    const n = o.n ?? 60, len = o.len ?? 40, sp = o.speed ?? 1400, slant = o.slant ?? 0.18;
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.strokeStyle = o.color ?? 'rgba(210,225,255,0.55)'; ctx.lineWidth = o.width ?? 3; ctx.lineCap = 'round';
    for (let i = 0; i < n; i++) {
      const yy = y + (((this.rand(i) * (h + len) + t * sp * (0.8 + 0.4 * this.rand(i + 99))) % (h + len))) - len;
      const xx = x + this.rand(i + 7) * (w + h * slant) - (yy - y) * slant;
      ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx - len * slant, yy + len); ctx.stroke();
    }
    ctx.restore();
  }

  // Hơi nóng bốc lên (bát cơm, nồi canh) tại (x, y).
  steam(x, y, s = 1, o = {}) {
    const { ctx } = this; const t = this.gt ?? 0;
    ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 6 * s;
    for (let i = 0; i < (o.n ?? 3); i++) {
      const u = ((t * 0.5 + i / 3) % 1);
      ctx.strokeStyle = `rgba(255,255,255,${0.55 * Math.sin(u * Math.PI) * (o.alpha ?? 1)})`;
      const bx = x + (i - 1) * 18 * s, by = y - u * 90 * s;
      ctx.beginPath(); ctx.moveTo(bx, by);
      ctx.bezierCurveTo(bx + 14 * s * Math.sin(t * 2 + i), by - 20 * s, bx - 14 * s, by - 35 * s, bx + 6 * s * Math.sin(t * 3 + i), by - 55 * s);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Giọt mồ hôi (lo lắng).
  sweat(x, y, s = 1, o = {}) {
    if ((o.p ?? 1) <= 0) return;
    const drop = ((this.gt ?? 0) * 0.8) % 1;
    this.group({ x, y: y + drop * 20 * s, s }, () => this.path('M 0 -18 Q 12 2 0 10 Q -12 2 0 -18 Z', { fill: C.sky, fillStyle: 'solid', stroke: C.blue, width: 2.5, seed: 740, alpha: 1 - drop * 0.6 }));
  }

  // Độ rung màn hình (va chạm): trả về {x, y} để dùng trong k.group.
  shake(start, dur = 0.5, amp = 18) {
    if (this.still) return { x: 0, y: 0 };
    const u = (this.t - this.cue(start)) / dur;
    if (u < 0 || u > 1) return { x: 0, y: 0 };
    const a = amp * (1 - u);
    return { x: Math.sin(this.t * 90) * a, y: Math.cos(this.t * 77) * a };
  }

  // Phông nền toàn khung: 'day' | 'sunset' | 'night' | 'dawn'. o.ground = y đường chân đồi (null = không có đồi).
  backdrop(kind = 'day', o = {}) {
    const { ctx, W, H } = this;
    const pal = {
      day: ['#bfe3f7', '#e9f3ee', '#9cc97a', '#7fb35f'],
      sunset: ['#f3a86b', '#f7d6a0', '#a7a35c', '#8a8c4c'],
      night: ['#22304f', '#46547a', '#3d5a4a', '#2f4a3b'],
      dawn: ['#f6c9b7', '#f6ead6', '#a8c48a', '#8db06e'],
    }[kind];
    const a = o.alpha ?? 1;
    ctx.save();
    ctx.globalAlpha *= a;
    const g = ctx.createLinearGradient(0, 0, 0, o.ground ?? H);
    g.addColorStop(0, pal[0]); g.addColorStop(1, pal[1]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, o.ground ?? H);
    ctx.restore();
    if (kind === 'night') for (let i = 0; i < 40; i++) this.dot(this.rand(i) * W, this.rand(i + 50) * (o.ground ?? H) * 0.7, 2 + this.rand(i + 9) * 2, '#fff7d6', a * (0.5 + 0.5 * Math.sin((this.gt ?? 0) * 2 + i)));
    if (o.ground != null) {
      const gy = o.ground;
      const hill = (yy, amp, ph, col, seed) => {
        let d = `M -40 ${H + 40} L -40 ${yy}`;
        for (let x = 0; x <= W + 80; x += 160) d += ` Q ${x - 80} ${yy - amp * (1 + Math.sin(x * 0.01 + ph))} ${x} ${yy}`;
        d += ` L ${W + 40} ${H + 40} Z`;
        this.path(d, { fill: col, fillStyle: 'solid', stroke: 'none', seed, alpha: a });
      };
      hill(gy - 40, 50, 1.3, pal[2], 760);
      hill(gy, 24, 4.1, pal[3], 761);
    }
  }

  // Biến đổi cục bộ: tịnh tiến, phóng to, xoay, độ mờ.
  group({ x = 0, y = 0, s = 1, r = 0, a = 1 } = {}, fn) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s);
    ctx.globalAlpha *= a;
    fn();
    ctx.restore();
  }

  dot(x, y, r, color = C.ink, alpha = 1) {
    const { ctx } = this;
    ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }

  // Bút chì ở đầu nét đang vẽ.
  drawPencil() {
    if (!this.tip || !this.pencilOn) return;
    const { ctx } = this;
    const { x, y } = this.tip;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(x, y); ctx.rotate(-0.55);
    ctx.shadowColor = 'rgba(0,0,0,0.18)'; ctx.shadowBlur = 14; ctx.shadowOffsetX = 8; ctx.shadowOffsetY = 10;
    ctx.fillStyle = '#f2c14e';
    ctx.fillRect(28, -11, 190, 22);
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#e0a93a'; ctx.fillRect(28, 3, 190, 8);
    ctx.fillStyle = '#c9c9c9'; ctx.fillRect(218, -11, 16, 22);
    ctx.fillStyle = '#ef8fa0'; ctx.fillRect(234, -11, 22, 22);
    ctx.fillStyle = '#f3d9b1';
    ctx.beginPath(); ctx.moveTo(28, -11); ctx.lineTo(0, 0); ctx.lineTo(28, 11); ctx.fill();
    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.moveTo(9, -3.6); ctx.lineTo(0, 0); ctx.lineTo(9, 3.6); ctx.fill();
    ctx.restore();
  }
}
