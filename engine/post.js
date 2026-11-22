// Hậu kỳ cho mỗi khung (chạy sau khi vẽ cảnh, trước phụ đề): phát sáng (bloom), chỉnh màu, viền tối, hạt phim, sương trôi.
// Bật: meta.post = 'cosmos' | 'nhangian' | { ...tuỳ chỉnh } ; từng cảnh ghi đè: scene.post = false | preset.
// Chạy hoàn toàn bằng canvas 2D (ctx.filter) → không cần WebGL; nhanh hơn khi Chromium bật GPU (meta.gpu).
export const PRESETS = {
  // Hạt Bụi Xanh: vũ trụ lạnh, sâu; sao/chữ vàng toả sáng.
  cosmos: { bloom: 0.55, bloomCut: 0.62, bloomR: [6, 22], tint: '#1c3270', tintA: 0.16, sat: 1.1, contrast: 1.06, vignette: 0.5, grain: 0.045 },
  // Nhân Gian Chưa Kể: tối, ám xanh rêu, lửa ấm toả sáng, sương khói, hạt phim dày hơn.
  nhangian: { bloom: 0.6, bloomCut: 0.55, bloomR: [8, 30], tint: '#2b4a46', tintA: 0.12, warm: '#ff9a3c', warmA: 0.06, sat: 1.0, contrast: 1.08, vignette: 0.45, grain: 0.06, haze: 0.07 },
};

export function makePost(W, H) {
  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  const small = mk(W / 4, H / 4), sctx = small.getContext('2d');
  const blur = mk(W / 4, H / 4), bctx = blur.getContext('2d');
  // hạt phim: 4 tấm nhiễu cố định (seed), chọn theo khung
  let seed = 1234567;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  const grains = [0, 1, 2, 3].map(() => {
    const c = mk(512, 512), g = c.getContext('2d'), img = g.createImageData(512, 512);
    for (let i = 0; i < img.data.length; i += 4) { const v = 128 + (rnd() - 0.5) * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
    g.putImageData(img, 0, 0); return c;
  });
  // sương: một tấm khói mềm lớn (nhiều đốm mờ), trôi chậm
  const fog = mk(W / 2, H / 2), fg = fog.getContext('2d');
  fg.filter = 'blur(40px)';
  for (let i = 0; i < 70; i++) { fg.fillStyle = `rgba(200,210,220,${0.05 + rnd() * 0.12})`; fg.beginPath(); fg.ellipse(rnd() * W / 2, rnd() * H / 2, 60 + rnd() * 220, 30 + rnd() * 90, rnd() * 3, 0, Math.PI * 2); fg.fill(); }
  fg.filter = 'none';
  const vign = new Map();

  function apply(ctx, gt, opt) {
    const o = typeof opt === 'string' ? PRESETS[opt] : { ...(PRESETS[opt?.preset] ?? {}), ...opt };
    if (!o) return;
    const src = ctx.canvas;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
    // 1. chỉnh màu (độ bão hoà, tương phản) — vẽ lại chính khung qua filter
    if ((o.sat ?? 1) !== 1 || (o.contrast ?? 1) !== 1) {
      sctx.filter = 'none';
      ctx.filter = `saturate(${o.sat ?? 1}) contrast(${o.contrast ?? 1})`;
      ctx.globalCompositeOperation = 'copy'; ctx.drawImage(src, 0, 0); ctx.filter = 'none'; ctx.globalCompositeOperation = 'source-over';
    }
    // 2. bloom: thu nhỏ ¼ → giữ vùng sáng (brightness/contrast) → làm mờ 2 cỡ → cộng sáng (screen)
    if (o.bloom) {
      const cut = o.bloomCut ?? 0.6;
      sctx.globalCompositeOperation = 'copy';
      sctx.filter = `brightness(${(1 - cut) * 1.6 + 0.2}) contrast(${2 + cut * 3}) saturate(1.3)`;
      sctx.drawImage(src, 0, 0, W / 4, H / 4); sctx.filter = 'none';
      ctx.globalCompositeOperation = 'screen';
      for (const r of o.bloomR ?? [6, 22]) {
        bctx.globalCompositeOperation = 'copy'; bctx.filter = `blur(${r / 4 * 4}px)`; bctx.drawImage(small, 0, 0); bctx.filter = 'none';
        ctx.globalAlpha = o.bloom * 0.6; ctx.drawImage(blur, 0, 0, W, H);
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    }
    // 3. sương trôi (chỉ sáng lên vùng có ánh sáng → 'soft-light')
    if (o.haze) {
      const x = -((gt * 18) % (W)), y = -20 + 12 * Math.sin(gt * 0.2);
      ctx.globalAlpha = o.haze; ctx.globalCompositeOperation = 'screen';
      ctx.drawImage(fog, x, y, W + 40, H + 40); ctx.drawImage(fog, x + W, y, W + 40, H + 40);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    }
    // 4. ám màu: tint (soft-light) + chút ấm ở vùng sáng
    if (o.tint) { ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = o.tintA ?? 0.15; ctx.fillStyle = o.tint; ctx.fillRect(0, 0, W, H); }
    if (o.warm) { ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = o.warmA ?? 0.08; ctx.fillStyle = o.warm; ctx.fillRect(0, 0, W, H); }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    // 5. viền tối (multiply, gradient cache theo độ mạnh)
    if (o.vignette) {
      let g = vign.get(o.vignette);
      if (!g) { g = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 1.05); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${o.vignette})`); vign.set(o.vignette, g); }
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
    // 6. hạt phim (overlay), đổi tấm + dịch theo khung 24 lần/giây
    if (o.grain) {
      const f = Math.floor(gt * 24), gc = grains[f % 4], ox = -((f * 137) % 512), oy = -((f * 251) % 512);
      ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = o.grain;
      for (let y = oy; y < H; y += 512) for (let x = ox; x < W; x += 512) ctx.drawImage(gc, x, y);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    }
    ctx.restore();
  }
  return { apply };
}
