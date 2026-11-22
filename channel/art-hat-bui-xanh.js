// Ảnh đại diện kênh Hạt Bụi Xanh (800x800, YouTube cắt tròn) + banner 2560×1440 (cuối file). Render: npm run art -- hat-bui-xanh
// Vibe (skill kenh-hat-bui-xanh): nền vũ trụ chàm tối, Trái Đất xanh = "hạt bụi xanh", điểm nhấn vàng sao / cam.
// Hiển thị rất nhỏ (~40px) → một khối chính, tương phản mạnh, không chữ nhỏ.
import * as HB from '/channel/hat-bui-xanh.js';
export const style = 'clean';

const P = { night0: '#0B1026', night1: '#1B2550', blue: '#2E86DE', blueD: '#1A5FA8', green: '#3BA55C', greenD: '#2C7D46', orange: '#FF7A1A', star: '#FFD34E', cream: '#F5F1E6', ink: '#0B1026' };

function space(k, cx = 400, cy = 400) {
  const { ctx } = k;
  const g = ctx.createRadialGradient(cx, cy, 40, cx, cy, 620);
  g.addColorStop(0, P.night1); g.addColorStop(1, P.night0);
  ctx.fillStyle = g; ctx.fillRect(0, 0, 800, 800);
}
function stars(k, n = 60, seed = 0) {
  for (let i = 0; i < n; i++) {
    const r = k.rand(seed + i + 200);
    k.dot(k.rand(seed + i) * 800, k.rand(seed + i + 100) * 800, 1.5 + r * r * 4, r > 0.85 ? P.star : P.cream, 0.45 + r * 0.5);
  }
}
function sparkle(k, x, y, s, color = P.star) {
  const { ctx } = k;
  ctx.save(); ctx.translate(x, y); ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? s * 0.22 : s; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
  ctx.closePath(); ctx.fill(); ctx.restore();
}
function glow(k, x, y, r, color, a = 0.55) {
  const { ctx } = k;
  const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 1.6);
  g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.6, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
// Trái Đất phẳng: đại dương, lục địa trừu tượng, mây, bóng đêm phía phải-dưới, viền khí quyển.
function earth(k, x, y, r, o = {}) {
  const { ctx } = k;
  if (o.glow !== false) glow(k, x, y, r, '#5FB4FF', o.glowA ?? 0.5);
  ctx.save();
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = P.blue; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  const land = (pts) => {
    ctx.beginPath();
    pts.forEach(([a, b], i) => { const px = x + a * r, py = y + b * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
    ctx.closePath(); ctx.fill();
  };
  ctx.fillStyle = P.green; ctx.lineJoin = 'round';
  // lục địa lớn phía trên-trái (gợi Á–Âu), dải chữ S (gợi Đông Dương), mảng dưới (gợi Úc)
  land([[-0.95, -0.35], [-0.6, -0.7], [-0.15, -0.85], [0.3, -0.72], [0.45, -0.45], [0.2, -0.3], [0.05, -0.05], [-0.2, -0.15], [-0.45, 0.05], [-0.7, -0.05]]);
  land([[0.08, -0.08], [0.22, -0.18], [0.3, 0.02], [0.22, 0.2], [0.3, 0.38], [0.18, 0.42], [0.12, 0.22], [0.16, 0.06]]);
  land([[0.35, 0.55], [0.7, 0.45], [0.85, 0.7], [0.55, 0.9], [0.3, 0.8]]);
  land([[-0.85, 0.35], [-0.55, 0.3], [-0.45, 0.6], [-0.7, 0.85], [-0.95, 0.6]]);
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (const [a, b, w, h, rot] of [[-0.3, 0.32, 0.5, 0.07, -0.2], [0.45, -0.1, 0.4, 0.06, 0.3], [-0.55, -0.55, 0.35, 0.05, 0.4], [0.05, 0.7, 0.45, 0.06, -0.1]]) {
    ctx.beginPath(); ctx.ellipse(x + a * r, y + b * r, w * r, h * r, rot, 0, Math.PI * 2); ctx.fill();
  }
  // bóng đêm
  ctx.fillStyle = 'rgba(6,10,30,0.32)';
  ctx.beginPath(); ctx.arc(x + r * 0.55, y + r * 0.45, r * 1.2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(6,10,30,0.14)';
  ctx.beginPath(); ctx.arc(x + r * 0.35, y + r * 0.3, r * 1.15, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  // viền khí quyển
  ctx.save(); ctx.lineWidth = Math.max(3, r * 0.05); ctx.strokeStyle = 'rgba(150,215,255,0.9)';
  ctx.beginPath(); ctx.arc(x, y, r, Math.PI * 0.75, Math.PI * 1.85); ctx.stroke(); ctx.restore();
}

// A — "Hạt bụi xanh": Trái Đất lớn giữa vũ trụ, Mặt Trăng nhỏ, ngôi sao vàng. Đọc tốt nhất ở cỡ nhỏ.
export function avatarA(k) {
  space(k);
  stars(k, 70, 0);
  const { ctx } = k;
  earth(k, 380, 420, 250);
  glow(k, 655, 190, 48, '#ffffff', 0.25);
  ctx.fillStyle = '#D9D5CA'; ctx.beginPath(); ctx.arc(655, 190, 48, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#B9B4A8';
  for (const [a, b, r] of [[-14, -10, 11], [16, 8, 8], [-4, 22, 6]]) { ctx.beginPath(); ctx.arc(655 + a, 190 + b, r, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = 'rgba(6,10,30,0.3)'; ctx.beginPath(); ctx.arc(680, 210, 52, 0, Math.PI * 2); ctx.fill();
  sparkle(k, 690, 560, 40);
  sparkle(k, 120, 150, 24, P.cream);
}

// B — Quy mô: rìa Mặt Trời cam khổng lồ bên trái, Trái Đất là một chấm xanh nhỏ tỏa sáng. Đúng tinh thần "khổng lồ cạnh vật nhỏ".
export function avatarB(k) {
  space(k, 560, 400);
  stars(k, 55, 300);
  const { ctx } = k;
  glow(k, -380, 400, 470, '#FF7A1A', 0.35);
  ctx.fillStyle = P.orange; ctx.beginPath(); ctx.arc(-380, 400, 640, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFA53D'; ctx.beginPath(); ctx.arc(-380, 400, 590, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = P.star; ctx.beginPath(); ctx.arc(-380, 400, 520, 0, Math.PI * 2); ctx.fill();
  earth(k, 545, 400, 115, { glowA: 0.8 });
}

// C — Linh vật phi hành gia: mũ bảo hộ cận cảnh, kính mũ phản chiếu Trái Đất.
export function avatarC(k) {
  space(k);
  stars(k, 60, 600);
  const { ctx } = k;
  const cx = 400, cy = 430;
  // thân/vai
  ctx.fillStyle = '#E6E3DA'; ctx.strokeStyle = P.ink; ctx.lineWidth = 12; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(110, 820); ctx.quadraticCurveTo(130, 650, 400, 640); ctx.quadraticCurveTo(670, 650, 690, 820); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = P.orange; ctx.fillRect(215, 700, 100, 32); ctx.strokeRect(215, 700, 100, 32);
  // mũ
  ctx.fillStyle = '#F2EFE6';
  ctx.beginPath(); ctx.arc(cx, cy, 255, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#D9D5CA'; ctx.beginPath(); ctx.arc(cx, cy, 255, Math.PI * 0.15, Math.PI * 0.85); ctx.arc(cx, cy, 225, Math.PI * 0.85, Math.PI * 0.15, true); ctx.fill();
  // kính
  ctx.save();
  ctx.beginPath(); ctx.ellipse(cx, cy - 10, 195, 170, 0, 0, Math.PI * 2); ctx.closePath();
  ctx.fillStyle = P.night0; ctx.fill(); ctx.clip();
  const g = ctx.createLinearGradient(cx - 200, cy - 180, cx + 200, cy + 160);
  g.addColorStop(0, '#26336a'); g.addColorStop(1, '#070a1c'); ctx.fillStyle = g; ctx.fillRect(cx - 200, cy - 190, 400, 360);
  for (let i = 0; i < 18; i++) k.dot(cx - 180 + k.rand(i + 900) * 360, cy - 170 + k.rand(i + 950) * 330, 1.5 + k.rand(i + 990) * 2.5, P.cream, 0.7);
  earth(k, cx + 20, cy + 5, 110, { glowA: 0.6 });
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.beginPath(); ctx.ellipse(cx - 95, cy - 95, 70, 28, -0.6, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = P.ink; ctx.lineWidth = 12;
  ctx.beginPath(); ctx.ellipse(cx, cy - 10, 195, 170, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = P.star; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.ellipse(cx, cy - 10, 212, 187, 0, Math.PI * 1.1, Math.PI * 1.45); ctx.stroke();
}

// ---------- Banner 2560×1440 ----------
// Vùng an toàn hiện trên mọi thiết bị = 1546×423 ở giữa (x 507–2053, y 508–931) → chữ nằm trọn trong đó.
const SAFE = { x: 507, y: 508, w: 1546, h: 423 };
function bannerTitle(k, x, y, align = 'center') {
  k.text('HẠT BỤI XANH', x, y, { size: 150, font: 'title', color: HB.P.cream, outline: HB.P.ink, outlineWidth: 18, align });
  k.text('Khoa học về những thứ khổng lồ, cổ xưa và đáng sợ', x, y + 120, { size: 46, font: 'title', color: HB.P.gold, outline: HB.P.ink, outlineWidth: 10, align });
  k.text('Video mới mỗi ngày · 20:00', x, y + 195, { size: 38, color: 'rgba(245,241,230,0.8)', align });
}
// A — vũ trụ: Trái Đất là một chấm nhỏ bên trái chữ, bóng cá voi xanh khổng lồ mờ trong dải sao phía sau.
export function bannerA(k) {
  HB.space(k, { n: 420 });
  HB.whale(k, 1280, 640, 2300, { sil: true, color: 'rgba(95,176,232,0.13)', stroke: false, swim: 0, lw: 0.01 });
  HB.earth(k, SAFE.x + 130, SAFE.y + SAFE.h / 2, 70, { spin: 0 });
  k.dot(SAFE.x + 130, SAFE.y + SAFE.h / 2, 110, '#5FB0E8', 0.12);
  bannerTitle(k, SAFE.x + 300, SAFE.y + 130, 'left');
}
// B — nửa biển sâu, nửa vũ trụ (hai trụ nội dung), Trái Đất ở góc trên phải.
export function bannerB(k) {
  HB.ocean(k, { depth: 0.6, snow: 160 });
  const { ctx } = k;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, k.W, 720); ctx.clip(); HB.space(k, { n: 260 }); ctx.restore();
  ctx.fillStyle = 'rgba(245,241,230,0.25)'; ctx.fillRect(0, 718, k.W, 4);
  HB.whale(k, 1900, 980, 1100, { swim: 0, alpha: 0.85 });
  HB.earth(k, 2330, 360, 110, { spin: 0 });
  bannerTitle(k, k.W / 2, SAFE.y + 110);
}
