export function initializeParticleSystem(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error("Canvas element not found");
    return null;
  }

  const ctx = canvas.getContext("2d");
  let animationFrameId;

  const PARTICLE_COUNT = 400; // Increased particle count
  const MAX_DIST = 150; // Maximum distance for connections within cluster
  const MOUSE_RADIUS = 200; // Radius of influence around the mouse (500px diameter)
  const BLUE_COLOR = "rgba(15, 115, 144, 1)"; // Blue color for cluster
  const RED_COLOR = "rgba(220, 15, 37, 1)"; // Red color for non-cluster particles
  const particles = [];
  const mouse = { x: null, y: null, active: false };

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    mouse.x = (e.clientX - rect.left) * scaleX;
    mouse.y = (e.clientY - rect.top) * scaleY;
    mouse.active = true;
  }

  function handleMouseLeave() {
    mouse.x = null;
    mouse.y = null;
    mouse.active = false;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5; // Gentle velocity
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 1.5 + 0.5;
      this.color = Math.random() > 0.5 ? RED_COLOR : BLUE_COLOR; // Assign red or blue
    }

    update() {
      // Subtle movement
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
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

  function drawCluster() {
    if (!mouse.active || !mouse.x || !mouse.y) return;

    particles.forEach((particle, i) => {
      // Check distance from mouse
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MOUSE_RADIUS) {
        // Enhance particle glow and enforce blue color
        ctx.save();
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = BLUE_COLOR; // Override color to blue
        ctx.shadowBlur = 20;
        ctx.shadowColor = BLUE_COLOR; // Glow in blue
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        // Connect particles within the cluster
        for (let j = i + 1; j < particles.length; j++) {
          const otherParticle = particles[j];
          const otherDx = otherParticle.x - particle.x;
          const otherDy = otherParticle.y - particle.y;
          const otherDistance = Math.sqrt(otherDx * otherDx + otherDy * otherDy);

          if (otherDistance < MAX_DIST) {
            const opacity = 0.8 * (1 - otherDistance / MAX_DIST) + 0.2; // Ensure minimum opacity
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = BLUE_COLOR.replace("1)", `${opacity})`); // Dynamic opacity
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update particles
    particles.forEach((particle) => {
      particle.update();
    });

    // Draw particles
    particles.forEach((particle) => {
      particle.draw();
    });

    // Draw cluster effect around mouse
    drawCluster();

    animationFrameId = requestAnimationFrame(animate);
  }

  resizeCanvas();
  createParticles();
  animate();

  // Event listeners
  window.addEventListener("resize", resizeCanvas);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseleave", handleMouseLeave);

  // Cleanup function
  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resizeCanvas);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseleave", handleMouseLeave);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
