alert('particle.js loaded')

const canvas = document.getElementById('polygonCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Settings
const POINT_COUNT = 100;
const points = [];
const MOUSE_RADIUS = 150;

// Mouse position
const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

// Generate random points
for (let i = 0; i < POINT_COUNT; i++) {
  points.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  });
}

// Mouse movement
canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach((point) => {
    // Update position
    point.x += point.vx;
    point.y += point.vy;

    // Bounce off edges
    if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
    if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

    // Draw point
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Draw lines to nearby points
    points.forEach((otherPoint) => {
      const dist = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y);
      if (dist < 100) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(otherPoint.x, otherPoint.y);
        ctx.stroke();
      }
    });

    // React to mouse
    const mouseDist = Math.hypot(point.x - mouse.x, point.y - mouse.y);
    if (mouseDist < MOUSE_RADIUS) {
      const angle = Math.atan2(point.y - mouse.y, point.x - mouse.x);
      point.vx += Math.cos(angle) * 0.2;
      point.vy += Math.sin(angle) * 0.2;
    }
  });

  requestAnimationFrame(animate);
}

animate();
