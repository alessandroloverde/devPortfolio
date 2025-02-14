<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <Head>
      <!-- Remove the Umami script from here -->
   </Head>
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
               <NavigationArrow target="aboutPage"></NavigationArrow>
            </section>
         </div>
      </main>
   </div>

   <div id="aboutPage" class="aboutPage">
      <div class="container aboutPage--firstPart">
<!--          <div class="test item-3-12">3-12</div>
         <div class="test item-3-12">3-12</div>
         <div class="test item-6-12">6-12</div> -->
         <section class="aboutPage--headline item-12-12">
            <h4>Introduction</h4>
            <h2>A bit of me and myself</h2>
         </section>
         <section class="item-12-12">
            <div class="aboutPage--lottie">
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
            <NavigationArrow target="skillsPage"></NavigationArrow>
         </section>
      </div>
   </div>

   <div id="skillsPage" class="skillsPage">
      <div class="container">
         <section class="aboutPage--headline item-12-12">
            <h4>My skills</h4>
            <h2>Languages, frameworks and tools</h2>
            <Navigation :isHomeNav="true" :class="'skillsPage--navigation'" />
            <div class="skillsPage--otherSkills mobile-item-12-12 item-10-12">
               <ol>
                  <li v-for="otherSkillLogo in images" :key="otherSkillLogo.title">
                     <figure>
                        <img :src="otherSkillLogo.path" :alt="otherSkillLogo.title" />
                        <figcaption>{{ otherSkillLogo.title }}</figcaption>
                     </figure>
                  </li>
               </ol>
            </div>
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
   const { data: skillsContent } = await useAsyncData("skillsContent", () => queryContent("/skills").findOne())

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const images = skillsContent.value?.images || []

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
