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
  import { initializeParticleSystem } from "../public/scripts/particle-system.js";

  onMounted(() => {
    initializeParticleSystem("heroCanvas");
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
