<template>
  <div class="homePage">
    <header>
      <Navigation />
    </header>
    <main>
      <div class="homePage--container">
        <section class="homePage--background"></section>
        <section class="homePage--content">
          <ContentDoc></ContentDoc>
          <div class="hero">
            <canvas id="heroCanvas"></canvas>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

// Particle effect logic
onMounted(() => {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  const ctx = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Update canvas size dynamically on resize
  window.addEventListener("resize", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  });

  const particles = [];
  const PARTICLE_COUNT = 100;
  const MAX_DIST = 120;
  const MOUSE_RADIUS = 150;
  const MAX_SPEED = 2; // Maximum particle speed
  const DAMPING = 0.98; // Speed damping factor

  const mouse = { x: null, y: null };

  // Mouse movement event
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect(); // Account for canvas offset
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  // Clear mouse position when leaving canvas
  canvas.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.size = 2 + Math.random();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Apply damping to slow particles down
      this.vx *= DAMPING;
      this.vy *= DAMPING;

      // Cap the velocity to prevent excessive speed
      if (Math.abs(this.vx) > MAX_SPEED) this.vx = Math.sign(this.vx) * MAX_SPEED;
      if (Math.abs(this.vy) > MAX_SPEED) this.vy = Math.sign(this.vy) * MAX_SPEED;

      // Bounce particles off canvas edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Apply mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          const repulse = force * 0.5; // Reduced strength of repulsion

          this.vx += Math.cos(angle) * repulse;
          this.vy += Math.sin(angle) * repulse;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();
      ctx.closePath();
    }
  }

  function createParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / MAX_DIST})`;
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    connectParticles();

    requestAnimationFrame(animate);
  }

  createParticles();
  animate();
});
</script>


<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
