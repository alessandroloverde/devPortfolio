<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
   import { onMounted, ref } from "vue";
   import SVGarrowDown from "~/public/img/icons/fi-rr-angle-down.svg";
   import rattoJSON from "~/public/img/rattoJSON.json";
   import { queryContent, useAsyncData } from '#imports';
   import { useRoute } from 'vue-router';

   const route = useRoute()
   const { data } = await useAsyncData("portfolio", () => queryContent(`/portfolio/${route.params.slug}`).findOne())
   console.log("data", data.value)
   let selectedIndex = ref(0)

   const scrollToSection = (index: number) => {
      const sections = document.querySelectorAll(".section")
      const section = sections[index]

      console.log("section", section)
      console.log("index", index)

      if (section) {
         section.scrollIntoView({ behavior: "smooth" });
         (section as HTMLElement).style.position = "relative";
      }
   }

   onMounted(() => {
      const sections = document.querySelectorAll(".section")
      const references = document.querySelectorAll(".reference")

      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               const index = [...sections].indexOf(entry.target) - 1 // The -1 must compensate for the slice(1) of the template

               if (index !== -1) {
                  if (entry.isIntersecting) {
                     selectedIndex.value = index + 1

                     entry.target.classList.add("visible")
                     references[index].classList.add("highlighted")
                  } else {
                     selectedIndex.value = index

                     entry.target.classList.remove("visible")
                     references[index].classList.remove("highlighted")
                  }
               }
            })
         },
         { threshold: 0.1 }
      )

      // Observe each section
      sections.forEach((section) => {
         observer.observe(section)
      })
   })
</script>

<template>
   <div id="skills" class="skill">
      <header>
         <Navigation :isHomeNav="false" />
         <div class="skill--info">
            <aside class="skill--info--logo">
               <img :src="data?.logo" v-if="data?.logo" class="responsiveImg" />
            </aside>
            <div class="skill--info--description">
               <div>
                  <h1>{{ data?.title?.replace(' | ', '&shy;')}}</h1>
                  <h3 v-if="data?.experience">
                     <span>since</span><i>{{ data?.experience }}</i> years
                  </h3>
               </div>
            </div>
            <div class="skill--info--refNavigation">
               <ul>
                  <li v-for="(feature, index) of data?.features.slice(1)" :key="index + 1" class="skill--info--refNavigation--reference reference">
                     <div class="skill--info--refNavigation--reference--number">
                        <AnimatedNumber :numberIndex="index + 1" />
                     </div>
                     <h3 class="shuffle-text"><a @click="scrollToSection(index + 1)">{{ feature.name }}</a></h3>
                  </li>
               </ul>
            </div>
         </div>
      </header>

      <main>
         <article v-if="data" class="skill-features">
            <section v-for="feature of data.features" class="section" :id="'topo-' + data.features.indexOf(feature)" :key="feature.name">
               <p v-if="feature.intro">{{ feature.intro }}
<!--                   <Lottie
                     ref="cricetoAnim"
                     :animation-data="rattoJSON"
                     :loop="true"
                     :auto-play="true"
                     :speed="0.75"
                  /> -->
               </p>
               <h2 v-else>{{ feature.name }}</h2>
               <p>{{ feature.description }}</p>
               <div class="skill-features--imageWrapper">
                  <div class="atom" v-if="feature.intro && data?.logo">
                     <div class="atom--center">
                        <img :src="data?.logo" class="responsiveImg" />
                     </div>
                     <div class="atom--orbit orbit1">
                        <div class="atom--orbit--electron"></div>
                     </div>
                     <div class="atom--orbit orbit2">
                        <div class="atom--orbit--electron"></div>
                     </div>
                     <div class="atom--orbit orbit3">
                        <div class="atom--orbit--electron"></div>
                     </div>
                  </div>
                  <img :src="feature.image" v-if="feature.image" class="responsiveImg skill-features--image" />
               </div>
               <NavigationArrow :target="`topo-${data.features.indexOf(feature) +1}`"></NavigationArrow>
            </section>
         </article>
      </main>
   </div>
   <!-- <ContentDoc unwrap="p"/> -->
</template>
