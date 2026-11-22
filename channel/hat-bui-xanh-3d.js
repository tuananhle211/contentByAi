// Cảnh 3D cho kênh Hạt Bụi Xanh (three.js qua engine/gl3d.js). Video dùng: meta.gpu: true, meta.post: 'cosmos'.
//   const T = await earthTextures('/videos/<slug>/assets/');   // earth-day / earth-night / earth-clouds .jpg
//   three(k, 'earth', earthScene(T), earthUpdate({ spin, dist }), 0, 0, k.W, k.H);
//   three(k, 'bh', blackHoleScene(), blackHoleUpdate({ orbit, dist, tilt }));
import { THREE, texture, starfield } from '/engine/gl3d.js';

const OUT = '\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}';

// ---------- Trái Đất ----------
export async function earthTextures(dir) {
  const [day, night, clouds] = await Promise.all(['earth-day', 'earth-night', 'earth-clouds'].map((n) => texture(`${dir}${n}.jpg`, { linear: n === 'earth-clouds' })));
  clouds.wrapS = THREE.RepeatWrapping; // mây trôi theo thời gian → phải lặp, không thì vệt sọc ở mép (lỗi lộ ra sau ~5 phút)
  return { day, night, clouds };
}
export const earthScene = (T) => () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 16 / 9, 0.1, 1000);
  scene.add(starfield(7000, 400));
  const sun = new THREE.Vector3(-1, 0.15, 0.45).normalize();
  const mat = new THREE.ShaderMaterial({
    uniforms: { dayMap: { value: T.day }, nightMap: { value: T.night }, cloudMap: { value: T.clouds }, sunDir: { value: sun }, time: { value: 0 } },
    vertexShader: `varying vec3 vN; varying vec2 vUv; varying vec3 vW;
      void main(){ vUv = uv; vN = normalize(mat3(modelMatrix) * normal); vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: `uniform sampler2D dayMap, nightMap, cloudMap; uniform vec3 sunDir; uniform float time; varying vec3 vN; varying vec2 vUv; varying vec3 vW;
      void main(){
        vec3 N = normalize(vN); vec3 V = normalize(cameraPosition - vW);
        float ndl = dot(N, sunDir); float day = smoothstep(-0.12, 0.22, ndl);
        vec3 dc = texture2D(dayMap, vUv).rgb;
        float cl = texture2D(cloudMap, vUv + vec2(time * 0.0015, 0.0)).r;
        float water = smoothstep(0.02, 0.12, dc.b - dc.r);
        vec3 lit = dc * (0.08 + 1.25 * max(ndl, 0.0));
        lit = mix(lit, vec3(1.0) * (0.06 + 1.15 * max(ndl, 0.0)), cl * 0.9);
        vec3 R = reflect(-sunDir, N); float spec = pow(max(dot(R, V), 0.0), 45.0) * water * (1.0 - cl) * day;
        vec3 night = texture2D(nightMap, vUv).rgb * vec3(1.0, 0.85, 0.6) * 2.2 * (1.0 - day) * (1.0 - cl * 0.8);
        float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
        vec3 atm = vec3(0.3, 0.55, 1.0) * fres * (0.15 + 1.2 * smoothstep(-0.3, 0.6, ndl));
        gl_FragColor = vec4(lit * day + night + spec * vec3(1.0, 0.92, 0.75) * 1.4 + atm, 1.0);` + OUT,
  });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 160, 80), mat);
  earth.rotation.z = 0.41;
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(1.07, 96, 48), new THREE.ShaderMaterial({
    uniforms: { sunDir: { value: sun } }, side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
    vertexShader: `varying vec3 vNv; varying vec3 vN; void main(){ vNv = normalize(normalMatrix * normal); vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 sunDir; varying vec3 vNv; varying vec3 vN;
      void main(){ float i = pow(clamp(0.72 - dot(vNv, vec3(0.0, 0.0, 1.0)), 0.0, 2.0), 3.2);
        float lit = 0.12 + smoothstep(-0.35, 0.55, dot(normalize(vN), sunDir));
        gl_FragColor = vec4(vec3(0.3, 0.58, 1.0) * i * lit * 1.1, 1.0);` + OUT,
  }));
  scene.add(earth, atmo);
  return { scene, camera, earth, mat };
};
// o.spin vòng quay (radian/giây), o.dist khoảng cách (hàm theo k hoặc số), o.lon kinh độ quay về phía camera lúc t = 0.
export const earthUpdate = (o = {}) => (st, k) => {
  st.mat.uniforms.time.value = k.gt;
  st.earth.rotation.y = (o.lon ?? -1.9) + k.t * (o.spin ?? 0.05);
  const d = typeof o.dist === 'function' ? o.dist(k) : o.dist ?? 4.2;
  st.camera.position.set(0, 0.1 * d / 4, d); st.camera.lookAt(o.look ?? 0, 0, 0);
};

// ---------- Hố đen ----------
const NOISE = `float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y); }
  float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * vn(p); p *= 2.03; a *= 0.5; } return v; }`;
// Đĩa bồi tụ: nhiễu fbm trong toạ độ cực (kéo dài theo vòng quay) → các dải khí xoáy, không thành vòng đồng tâm đều.
const DISK_FS = NOISE + `
  uniform float time, rIn, rOut, gain, arcs; varying vec2 vP;
  void main(){
    float r = length(vP); float a = atan(vP.y, vP.x);
    float temp = clamp((rOut - r) / (rOut - rIn), 0.0, 1.0);
    float sw = a - time * 0.9 / pow(r, 1.5);
    vec2 q = vec2(cos(sw), sin(sw)) * 1.6 + vec2(log(r) * 3.5, 0.0);
    float n = fbm(vec2(sw * 2.2, log(r) * 9.0) + fbm(q * 2.0) * 1.5);
    n = 0.35 + 0.9 * smoothstep(0.25, 0.85, n);
    float dop = 1.0 + 0.8 * sin(a);
    vec3 col = mix(vec3(1.0, 0.33, 0.07), vec3(1.0, 0.85, 0.6), pow(temp, 1.8));
    float edge = smoothstep(rIn * 0.98, rIn * 1.18, r) * smoothstep(rOut, rOut * 0.55, r);
    float arc = mix(1.0, 0.15 + 0.85 * pow(abs(sin(a)), 1.5), arcs);
    float I = pow(temp, 1.4) * n * dop * edge * arc * gain;
    gl_FragColor = vec4(col * I, I);`;
function diskMat(rIn, rOut, gain, arcs) {
  return new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, rIn: { value: rIn }, rOut: { value: rOut }, gain: { value: gain }, arcs: { value: arcs } },
    vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: DISK_FS + OUT, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
  });
}
export const blackHoleScene = () => () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 16 / 9, 0.1, 1000);
  scene.add(starfield(9000, 400, 11));
  const hole = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 48), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  const disk = new THREE.Mesh(new THREE.RingGeometry(1.55, 6.2, 360, 24), diskMat(1.55, 6.2, 2.4, 0)); disk.rotation.x = -Math.PI / 2;
  // ảnh đĩa phía sau bị hấp dẫn bẻ cong → vòng quay mặt về camera, chủ yếu cung trên/dưới
  const lens = new THREE.Mesh(new THREE.RingGeometry(1.08, 2.9, 360, 8), diskMat(1.08, 2.9, 1.1, 1));
  const photon = new THREE.Mesh(new THREE.RingGeometry(0.96, 1.2, 256, 4), new THREE.ShaderMaterial({
    vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `varying vec2 vP; void main(){ float r = length(vP); float a = atan(vP.y, vP.x);
      float I = exp(-pow((r - 1.035) / 0.03, 2.0)) * 1.4 + exp(-pow((r - 1.06) / 0.09, 2.0)) * 0.35; I *= 0.75 + 0.45 * sin(a);
      gl_FragColor = vec4(vec3(1.0, 0.72, 0.42) * I, I);` + OUT,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  lens.renderOrder = 1; photon.renderOrder = 2; disk.renderOrder = 3;
  scene.add(hole, lens, photon, disk);
  return { scene, camera, mats: [disk.material, lens.material], lens, photon };
};
// o.orbit (radian/giây), o.dist, o.tilt (độ cao camera so với mặt đĩa, radian)
export const blackHoleUpdate = (o = {}) => (st, k) => {
  for (const m of st.mats) m.uniforms.time.value = k.gt;
  const d = typeof o.dist === 'function' ? o.dist(k) : o.dist ?? 12, a = 0.6 + k.t * (o.orbit ?? 0.04), el = o.tilt ?? 0.13;
  st.camera.position.set(Math.sin(a) * d * Math.cos(el), d * Math.sin(el), Math.cos(a) * d * Math.cos(el));
  st.camera.lookAt(0, 0, 0);
  // vòng thấu kính + vòng photon luôn quay mặt về camera, đặt hơi lùi sau tâm để hố đen che phần giữa
  const back = st.camera.position.clone().normalize().multiplyScalar(-0.02);
  for (const m of [st.lens, st.photon]) { m.quaternion.copy(st.camera.quaternion); m.position.copy(back); }
};

// ---------- Trái Đất + Mặt Trăng (tập 115) ----------
//   const M = await texture('/videos/<slug>/assets/moon-tex.jpg');
//   three(k, 'em', earthMoonScene(T, M), earthMoonUpdate({ moonDist, moonAng, cam, look, fade }));
// Bán kính Mặt Trăng = 0,273 Trái Đất; khoảng cách thật ≈ 60 bán kính Trái Đất (o.moonDist, mặc định 60).
export const earthMoonScene = (T, moonTex) => () => {
  const st = earthScene(T)();
  const sun = new THREE.Vector3(-1, 0.15, 0.45).normalize();
  const mmat = new THREE.ShaderMaterial({
    uniforms: { map: { value: moonTex }, sunDir: { value: sun }, fade: { value: 1 } },
    vertexShader: 'varying vec3 vN; varying vec2 vUv; void main(){ vUv = uv; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `uniform sampler2D map; uniform vec3 sunDir; uniform float fade; varying vec3 vN; varying vec2 vUv;
      void main(){ float ndl = max(dot(normalize(vN), sunDir), 0.0); vec3 c = texture2D(map, vUv).rgb * (0.03 + 1.25 * ndl);
        gl_FragColor = vec4(c, fade);` + OUT,
    transparent: true,
  });
  st.moon = new THREE.Mesh(new THREE.SphereGeometry(0.273, 96, 48), mmat);
  st.mmat = mmat;
  st.scene.add(st.moon);
  return st;
};
// o.moonDist (bán kính Trái Đất), o.moonAng (radian quanh trục y, 0 = phía camera bên phải), o.cam [x,y,z] hoặc hàm(k),
// o.look [x,y,z], o.fade 0..1 (1 = còn, 0 = biến mất), o.spin, o.lon như earthUpdate.
export const earthMoonUpdate = (o = {}) => (st, k) => {
  st.mat.uniforms.time.value = k.gt;
  st.earth.rotation.y = (o.lon ?? -1.9) + k.t * (o.spin ?? 0.05);
  const v = (x) => (typeof x === 'function' ? x(k) : x);
  const d = v(o.moonDist) ?? 60, a = v(o.moonAng) ?? 0.35;
  st.moon.position.set(Math.cos(a) * d, 0, -Math.sin(a) * d);
  st.moon.rotation.y = -a + Math.PI; // mặt gần luôn quay về Trái Đất
  const f = v(o.fade) ?? 1; st.mmat.uniforms.fade.value = f; st.moon.visible = f > 0.002;
  st.earth.rotation.z = v(o.tilt) ?? 0.41; // nghiêng trục (radian), mặc định 23,4°
  const c = v(o.cam) ?? [0, 0.4, 4.4], l = v(o.look) ?? [0, 0, 0];
  st.camera.position.set(...c); st.camera.lookAt(...l);
};
