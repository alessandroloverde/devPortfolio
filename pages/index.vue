<!-- eslint-disable vue/multi-word-component-names -->
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
                  <div class="homePage--arrow"></div>
               </a>
            </section>
         </div>
      </main>
   </div>

   <div id="aboutPage" class="aboutPage">
      <div class="container">
         <section class="aboutPage--headline item-12-12">
            <h4>Introduction</h4>
            <h2>A bit of me and myself</h2>
         </section>
         <section class="item-7-12">
            <!-- <ContentDoc path="/about"></ContentDoc> -->
            <div v-html="renderedContent.beforeSeparator"></div>
         </section>
         <section class="item-5-12">
            <!--    <div v-for="image in images" :key="image.path" class="aboutPage--image">
          <img :src="image.path" :alt="image.title" />
          <p><i>{{ image.title }}</i></p>
        </div> -->
            <Lottie
               ref="castoroAnim"
               :animation-data="castoroJSON"
               :loop="true"
               :auto-play="true"
               :speed="0.75"
               @loopComplete="loopComplete"
               @complete="complete"
               @enterFrame="enterFrame"
               @segmentStart="segmentStart"
               @stopped="stopped"
            />
         </section>
         <section class="item-12-12">
            <hr />
         </section>
         <section class="item-5-12">
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
         </section>
         <section class="item-7-12">
            <div v-html="renderedContent.afterSeparator"></div>
         </section>
      </div>
   </div>
</template>

<script setup>
   import { onMounted, onBeforeUnmount, computed } from "vue"
   import { initializeParticleSystem } from "../public/scripts/particle-system.js"
   import { queryContent, useAsyncData } from "#imports"
   import castoroJSON from "../public/img/castoroJSON.json"
   import cricetoJSON from "../public/img/cricetoJSON.json"

   const { data: aboutContent } = await useAsyncData("aboutContent", () => queryContent("/about").findOne())

   console.log("aboutContent", aboutContent.value)

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const images = aboutContent.value?.images || []

   let cleanupParticleSystem

   const renderedContent = computed(() => {
      const children = aboutContent.value?.body?.children || []
      const beforeSeparator = []
      const afterSeparator = []
      let isSeparatorFound = false

      for (const child of children) {
         if (!isSeparatorFound && child.tag === "p") {
            const containsSeparator = (function searchChildren(nodes) {
               for (const node of nodes) {
                  if (node.tag === "span") {
                     return true
                  } else if (node.children) {
                     if (searchChildren(node.children)) {
                        return true
                     }
                  }
               }
               return false
            })(child.children)

            if (containsSeparator) {
               isSeparatorFound = true
               continue
            }
         }

         if (!isSeparatorFound) {
            beforeSeparator.push(child)
         } else {
            afterSeparator.push(child)
         }
      }

      return {
         beforeSeparator: renderToHtml(beforeSeparator),
         afterSeparator: renderToHtml(afterSeparator),
      }
   })

   const renderToHtml = (nodes) => {
      return nodes
         .map((node) => {
            if (node.type === "text") return node.value
            if (node.type === "element") {
               const children = node.children ? renderToHtml(node.children) : ""

               return `<${node.tag}>${children}</${node.tag}>`
            }
            return ""
         })
         .join("")
   }

   onMounted(() => {
      cleanupParticleSystem = initializeParticleSystem("heroCanvas")
   })

   onBeforeUnmount(() => {
      if (cleanupParticleSystem) cleanupParticleSystem()
   })

   console.log("topone", renderedContent.value)
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
