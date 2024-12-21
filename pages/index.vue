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
            <div class="homePage--arrow" >
              <a href="#aboutPage"></a>
            </div>
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
      <section class="item-8-12">
        <ContentDoc path="/about"></ContentDoc>
      </section>
      <section class="item-4-12">
        <div class="image-list">
          <div v-for="image in images" :key="image.path" class="">
            <img :src="image.path" :alt="image.title" />
            <p><i>{{ image.title }}</i></p>
          </div>
        </div>
      </section>
    </div>
  </div>

</template>
  
<script setup>
  import { onMounted, onBeforeUnmount } from 'vue';
  import { initializeParticleSystem } from "../public/scripts/particle-system.js";
  
  const { data: aboutContent } = await useAsyncData('aboutContent', () =>
    queryContent('/about').findOne()
  );

  const images = aboutContent.value?.images || [];

  let cleanupParticleSystem;

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
