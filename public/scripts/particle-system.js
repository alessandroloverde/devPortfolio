export function initializeParticleSystem(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error("Canvas element not found");
    return null;
  }

  const ctx = canvas.getContext("2d");
  let animationFrameId;

  const PARTICLE_COUNT = 150; // Number of interactive particles
  const BACKGROUND_PARTICLES = 50; // Number of background particles
  const MAX_DIST = 150; // Maximum distance for connections
  const MOUSE_RADIUS = 200; // Interaction radius for mouse
  const ATTRACTION_STRENGTH = 0.05; // Strength of attraction or repulsion
  const COLORS = ["rgba(15, 115, 144, 1)", "rgba(220, 15, 37, 1)"];
  const particles = [];
  const backgroundParticles = [];
  const mouse = { x: null, y: null };

  // Interaction mode: "attract" or "repel"
  const interactionMode = "repel"; // Change to "attract" for attraction effect

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
  }

  function handleMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  class Particle {
    constructor(isBackground = false) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = isBackground ? (Math.random() - 0.5) * 0.2 : (Math.random() - 0.5) * 1.2; // Subtle movement for background
      this.vy = isBackground ? (Math.random() - 0.5) * 0.2 : (Math.random() - 0.5) * 1.2;
      this.size = isBackground ? Math.random() * 1 + 0.2 : Math.random() * 2 + 1;
      this.color = isBackground ? "rgba(255, 255, 255, 0.2)" : COLORS[Math.floor(Math.random() * COLORS.length)];
      this.isBackground = isBackground;
    }

    update() {
      // Background movement
      this.x += this.vx;
      this.y += this.vy;

      // Bounce back on edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Interaction (only for interactive particles)
      if (!this.isBackground && mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
          const force = interactionMode === "attract" ? 1 : -1; // Attraction or repulsion
          const strength = force * ATTRACTION_STRENGTH * (1 - distance / MOUSE_RADIUS);

          this.vx += strength * dx;
          this.vy += strength * dy;
        }

        // Apply friction to slow velocity
        this.vx *= 0.98;
        this.vy *= 0.98;
      }
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
    for (let i = 0; i < BACKGROUND_PARTICLES; i++) {
      backgroundParticles.push(new Particle(true));
    }
  }

  function drawMesh() {
    particles.forEach((particle, i) => {
      for (let j = i + 1; j < particles.length; j++) {
        const otherParticle = particles[j];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MAX_DIST) {
          const opacity = 1 - distance / MAX_DIST;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = `rgba(15, 115, 144, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.closePath();
        }
      }
    });
  }

  function drawBackgroundParticles() {
    backgroundParticles.forEach((particle) => {
      particle.update(); // Background particles now move
      particle.draw();
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update background particles
    drawBackgroundParticles();

    // Update and draw interactive particles
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    // Draw mesh connections
    drawMesh();

    animationFrameId = requestAnimationFrame(animate);
  }

  resizeCanvas();
  createParticles();
  animate();

  window.addEventListener("resize", resizeCanvas);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resizeCanvas);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseleave", handleMouseLeave);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
