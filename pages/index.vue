<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <div class="homePage">
      <header></header>
      <main>
         <div class="homePage--container">
            <div class="hero">
               <canvas id="heroCanvas"></canvas>
            </div>
            <section class="homePage--background"></section>
            <section class="homePage--content">
               <ContentDoc></ContentDoc>
               <div class="homePage--arrow">
                  <a href="#aboutPage">
                     <span class="inlineIcon--arrow-down"></span>
                  </a>
               </div>
            </section>
         </div>
      </main>
   </div>

   <div id="aboutPage" class="aboutPage">
      <div class="container aboutPage--firstPart">
         <section class="aboutPage--headline item-12-12">
            <h4>Introduction</h4>
            <h2>A bit of me and myself</h2>
         </section>
         <section class="item-12-12">
            <div style="float: right; width: 20%; margin: 0 0 4rem 4rem">
               <Lottie
                  ref="cricetoAnim"
                  :animation-data="cricetoJSON"
                  :loop="true"
                  :auto-play="true"
                  :speed="0.75"
                  @loopComplete="loopComplete"
                  @complete="complete"
                  @enterFrame="enterFrame"
                  @segmentStart="segmentStart"
                  @stopped="stopped"
               />
            </div>
            <ContentDoc path="/about"></ContentDoc>
            <div class="homePage--arrow">
               <a href="#skillsPage">
                  <span class="inlineIcon--arrow-down"></span>
               </a>
            </div>
         </section>
      </div>
   </div>

   <div id="skillsPage" class="skillsPage">
      <div class="container">
         <section class="aboutPage--headline item-12-12">
            <h4>My skills</h4>
            <h2>Languages, frameworks and tools</h2>
            <Navigation :isHomeNav="true" :class="'skillsPage--navigation'" />
            <ContentDoc path="/skills"></ContentDoc>
         </section>
      </div>
   </div>
</template>

<script setup>
   import { onMounted, onBeforeUnmount, computed } from "vue"
   import { initializeParticleSystem } from "../public/scripts/particle-system.js"
   import { queryContent, useAsyncData } from "#imports"
   import cricetoJSON from "../public/img/cricetoJSON.json"

   const { data: aboutContent } = await useAsyncData("aboutContent", () => queryContent("/about").findOne())

   //console.log("aboutContent", aboutContent.value)

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const images = aboutContent.value?.images || []

   let cleanupParticleSystem;

   onMounted(() => {
      cleanupParticleSystem = initializeParticleSystem("heroCanvas")

      let hiddenElements = document.querySelectorAll('h2');
      let observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               entry.target.classList.add('active')
            } else {
               entry.target.classList.remove('active')
            }
         })
      })

      hiddenElements ? hiddenElements.forEach((el) => observer.observe(el)) : null
   })

   onBeforeUnmount(() => {
      if (cleanupParticleSystem) cleanupParticleSystem()
   })

</script>

<style scoped lang="scss">
.hero {
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
}

canvas {
   width: 100%;
   height: 100%;
   display: block;
}
</style>
