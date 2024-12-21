<template>
  <div class="homePage">
    <header>
      <Navigation />
    </header>
    <main>
      <div class="homePage--container">
        <div class="hero">
            <canvas id="heroCanvas"></canvas>
          </div>
        <section class="homePage--background"></section>
        <section class="homePage--content">
          <ContentDoc></ContentDoc>

          <a href="#aboutPage">
            <div class="homePage--arrow" :ref="arrow" ><a href="#aboutPage"></a></div>
          </a>


        </section>
      </div>
    </main>
  </div>

  <div id="aboutPage">
    <div class="container">
      <section class="item-12-12">
        <h4>Introduction</h4>
        <h2>A bit of me and myself</h2>
      </section>
      <section class="item-6-12">
        <p>Col-1</p>
        <ContentDoc path="/about"></ContentDoc>
      </section>
      <section class="item-6-12">
        <p>Col-2</p>
      </section>
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
