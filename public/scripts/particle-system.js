export function initializeParticleSystem(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  const ctx = canvas.getContext("2d");
  let animationFrameId;

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const particles = [];
  const PARTICLE_COUNT = 300;
  const MAX_DIST = 80;
  const MOUSE_RADIUS = canvas.width * 0.15;
  const COLORS = ["rgba(15, 115, 144, 0.7)", "rgba(220, 15, 37, 0.7)"];

  const mouse = { x: null, y: null };

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function handleMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.size = Math.random() * 1.5 + 0.5;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  function createParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawMesh() {
    if (mouse.x === null || mouse.y === null) return;

    particles.forEach((particle) => {
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MOUSE_RADIUS) {
        particles.forEach((otherParticle) => {
          const ox = otherParticle.x - particle.x;
          const oy = otherParticle.y - particle.y;
          const dist = Math.sqrt(ox * ox + oy * oy);

          if (dist < MAX_DIST) {
            const opacity = 0.65 + 0.25 * (1 - dist / MAX_DIST);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(15, 115, 144, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.closePath();
          }
        });
      }
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    drawMesh();
    animationFrameId = requestAnimationFrame(animate);
  }

  // Initialize
  createParticles();
  animate();

  // Add event listeners
  window.addEventListener("resize", resizeCanvas);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseleave", handleMouseLeave);

  // Cleanup function
  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resizeCanvas);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseleave", handleMouseLeave);
  };
}
