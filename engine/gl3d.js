// 3D bằng three.js, vẽ vào khung 2D của engine. Video dùng 3D nên khai báo meta.gpu: true (Chromium chạy GPU thật).
//   import { three, texture } from '/engine/gl3d.js';
//   const tex = await texture('/videos/<slug>/assets/earth-day.jpg');   // nạp trước (top-level await) → khung đầu đã có ảnh
//   three(k, 'earth', (T) => ({ scene, camera, ...state }), (st, k, T) => { /* cập nhật theo k.t / k.gt */ }, x, y, w, h);
// build chạy MỘT lần cho mỗi key; update chạy mỗi khung, chỉ được dựa vào thời gian (k.t, k.gt) để render lặp lại được.
import * as THREE from '/node_modules/three/build/three.module.js';
export { THREE };

let renderer = null;
const states = new Map();
const loader = new THREE.TextureLoader();

export async function texture(url, o = {}) {
  const t = await loader.loadAsync(url);
  t.colorSpace = o.linear ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export function three(k, key, build, update, x = 0, y = 0, w = k.W, h = k.H, o = {}) {
  if (!renderer) {
    const c = document.createElement('canvas');
    renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
  }
  const sw = Math.round(w * (o.scale ?? 1)), sh = Math.round(h * (o.scale ?? 1));
  if (renderer.domElement.width !== sw || renderer.domElement.height !== sh) renderer.setSize(sw, sh, false);
  renderer.toneMappingExposure = o.exposure ?? 1;
  let st = states.get(key);
  if (!st) { st = build(THREE); states.set(key, st); }
  update(st, k, THREE);
  st.camera.aspect = w / h; st.camera.updateProjectionMatrix();
  renderer.setClearColor(0x000000, 0);
  renderer.render(st.scene, st.camera);
  k.ctx.save(); k.ctx.globalAlpha *= o.alpha ?? 1; k.ctx.drawImage(renderer.domElement, x, y, w, h); k.ctx.restore();
}

// Bầu trời sao 3D (điểm sáng trên mặt cầu lớn), kích thước theo độ sáng.
export function starfield(n = 6000, r = 400, seed = 7) {
  let s = seed; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = rnd() * 2 - 1, a = rnd() * Math.PI * 2, q = Math.sqrt(1 - u * u);
    pos.set([r * q * Math.cos(a), r * u, r * q * Math.sin(a)], i * 3);
    const b = 0.35 + Math.pow(rnd(), 4) * 1.6, warm = rnd();
    col.set([b * (warm > 0.8 ? 1 : 0.85), b * 0.9, b * (warm < 0.2 ? 1.1 : 0.95)], i * 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ size: 1.6, sizeAttenuation: false, vertexColors: true, transparent: true, depthWrite: false }));
}
