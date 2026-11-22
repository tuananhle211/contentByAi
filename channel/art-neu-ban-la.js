// Ảnh kênh "Nhân Gian Chưa Kể" (id cũ `neu-ban-la`, đổi hướng 13/11/2026: truyện tâm linh kể ngôi "tôi").
// `npm run art -- neu-ban-la` → output/channel/neu-ban-la/
// Avatar 800×800: YouTube cắt tròn và hiển thị rất nhỏ → 1 hình khối sáng trên nền tối. Banner 2560×1440: vùng an toàn giữa 1546×423.
export const style = 'clean';

const BG = '#0d0f14', AMBER = '#f2b24a', EYE = '#f2c230', PAPER = '#efe4cc';

function dark(k, W, H) {
  const { ctx } = k;
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
}

function glow(k, x, y, r, a = 0.55) {
  const { ctx } = k;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(255,190,90,${a})`);
  g.addColorStop(0.45, `rgba(242,140,50,${a * 0.35})`);
  g.addColorStop(1, 'rgba(242,140,50,0)');
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

// Đèn dầu: (x, y) = cổ đèn (chỗ bấc), s = tỉ lệ (1 ≈ cao 340px).
function lamp(k, x, y, s = 1) {
  const { ctx } = k;
  glow(k, x, y - 60 * s, 420 * s);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.lineWidth = 6; ctx.strokeStyle = '#2a1a0c';
  // chân + bầu dầu
  ctx.fillStyle = '#7a4f24';
  ctx.beginPath(); ctx.moveTo(-70, 150); ctx.lineTo(70, 150); ctx.lineTo(45, 118); ctx.lineTo(-45, 118); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#a8732f';
  ctx.beginPath(); ctx.ellipse(0, 80, 88, 50, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(255,220,150,0.35)'; ctx.beginPath(); ctx.ellipse(-30, 66, 30, 14, -0.3, 0, Math.PI * 2); ctx.fill();
  // cổ đèn
  ctx.fillStyle = '#6b4420'; ctx.fillRect(-40, 14, 80, 22); ctx.strokeRect(-40, 14, 80, 22);
  // bóng thuỷ tinh
  ctx.beginPath();
  ctx.moveTo(-34, 14); ctx.bezierCurveTo(-90, -30, -80, -110, -30, -150); ctx.lineTo(-34, -190); ctx.lineTo(34, -190); ctx.lineTo(30, -150);
  ctx.bezierCurveTo(80, -110, 90, -30, 34, 14); ctx.closePath();
  ctx.fillStyle = 'rgba(255,236,200,0.16)'; ctx.fill();
  ctx.strokeStyle = 'rgba(255,236,200,0.75)'; ctx.lineWidth = 5; ctx.stroke();
  // ngọn lửa
  ctx.beginPath(); ctx.moveTo(0, -95); ctx.bezierCurveTo(26, -55, 22, -12, 0, -6); ctx.bezierCurveTo(-22, -12, -26, -55, 0, -95);
  ctx.fillStyle = '#ffa733'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, -70); ctx.bezierCurveTo(12, -45, 10, -18, 0, -14); ctx.bezierCurveTo(-10, -18, -12, -45, 0, -70);
  ctx.fillStyle = '#fff4c8'; ctx.fill();
  ctx.restore();
}

// Một mắt mèo: tâm (x, y), rộng w, xoay r. Đồng tử dọc.
function catEye(k, x, y, w, r = 0, o = {}) {
  const { ctx } = k, h = w * 0.62;
  ctx.save(); ctx.translate(x, y); ctx.rotate(r);
  ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.quadraticCurveTo(0, -h, w / 2, 0); ctx.quadraticCurveTo(0, h, -w / 2, 0); ctx.closePath();
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, w / 2);
  g.addColorStop(0, '#fff07a'); g.addColorStop(0.6, o.color ?? EYE); g.addColorStop(1, '#b8780e');
  ctx.fillStyle = g; ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, 0, w * (o.pupil ?? 0.07), h * 0.46, 0, 0, Math.PI * 2); ctx.fillStyle = '#07080b'; ctx.fill();
  ctx.beginPath(); ctx.arc(-w * 0.14, -h * 0.16, w * 0.045, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fill();
  ctx.restore();
}

// Bóng mèo đen ngồi (chỉ hiện viền sáng nhẹ), chân tại (x, y), cao h.
function catShadow(k, x, y, h) {
  const { ctx } = k, s = h / 400;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath();
  ctx.moveTo(-110, 0); ctx.bezierCurveTo(-130, -140, -90, -230, -60, -260);
  ctx.lineTo(-78, -330); ctx.lineTo(-30, -290); ctx.quadraticCurveTo(0, -298, 30, -290); ctx.lineTo(78, -330); ctx.lineTo(60, -260);
  ctx.bezierCurveTo(95, -225, 130, -140, 110, 0); ctx.closePath();
  ctx.fillStyle = '#050608'; ctx.fill();
  ctx.strokeStyle = 'rgba(242,178,74,0.35)'; ctx.lineWidth = 6; ctx.stroke();
  ctx.restore();
  catEye(k, x - 30 * s, y - 250 * s, 44 * s, 0.12);
  catEye(k, x + 30 * s, y - 250 * s, 44 * s, -0.12);
}

// A — Đôi mắt mèo vàng trong bóng tối, ngọn đèn dầu nhỏ phía dưới. Nhận ra ngay cả ở cỡ 48px.
export function avatarA(k) {
  dark(k, 800, 800);
  glow(k, 400, 640, 380, 0.4);
  catEye(k, 255, 330, 250, 0.16);
  catEye(k, 545, 330, 250, -0.16);
  lamp(k, 400, 640, 0.62);
}

// B — Ngọn đèn dầu lớn giữa khung, bóng mèo đen ngồi bên cạnh.
export function avatarB(k) {
  dark(k, 800, 800);
  lamp(k, 330, 520, 1.15);
  catShadow(k, 590, 760, 400);
}

// C — Đèn dầu + chữ tên kênh (chữ chỉ đọc được ở cỡ lớn; dùng nếu muốn avatar có tên).
export function avatarC(k) {
  dark(k, 800, 800);
  lamp(k, 400, 430, 0.95);
  k.text('NHÂN GIAN', 400, 640, { size: 92, font: 'title', color: PAPER });
  k.text('CHƯA KỂ', 400, 735, { size: 92, font: 'title', color: AMBER });
}

// Banner — tên kênh + câu định vị trong vùng an toàn giữa; mắt mèo bên phải, đèn dầu bên trái.
export function banner(k) {
  dark(k, 2560, 1440);
  lamp(k, 600, 760, 0.7);
  catEye(k, 1925, 700, 66, 0.14);
  catEye(k, 2005, 700, 66, -0.14);
  k.text('NHÂN GIAN CHƯA KỂ', 1280, 690, { size: 92, font: 'title', color: PAPER });
  k.text('Chuyện người xưa truyền tai, chưa ai giải thích được', 1280, 790, { size: 40, color: AMBER });
}
