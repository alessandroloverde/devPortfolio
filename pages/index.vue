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
          <div class="homePage--arrow" :ref="arrow" @click="handleArrowClick"></div>
          <div class="hero">
            <canvas id="heroCanvas"></canvas>
          </div>
        </section>
      </div>
    </main>
  </div>

  <div class="aboutPage">
    <div class="container">
      <div class="item-3-12">
        <h2>Col-1</h2>
      </div>
      <div class="item-3-12">
        <h2>Col-2</h2>
      </div>
      <div class="item-3-12">
        <h2>Col-3</h2>
      </div>
      <div class="item-3-12">
        <h2>Col-4</h2>
      </div>
    </div>
  </div>

</template>
  
<script setup>
  import { onMounted, onBeforeUnmount } from 'vue';
  import { initializeParticleSystem } from "../public/scripts/particle-system.js";

  let cleanupParticleSystem;
  let arrow = ref(null);

  const handleArrowClick = () => {
      alert('arrow clicked');
    };

  onMounted(() => {
    cleanupParticleSystem = initializeParticleSystem('heroCanvas');
  });

  onBeforeUnmount(() => {
    if (cleanupParticleSystem) cleanupParticleSystem();
  });
</script>


<style scoped>
  .hero {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
   /*  pointer-events: none; */
  }

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
