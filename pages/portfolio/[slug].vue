<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
   import { onMounted, ref } from "vue";
   import SVGarrowDown from "~/public/img/icons/fi-rr-angle-down.svg";
   import rattoJSON from "~/public/img/rattoJSON.json";
   import { queryContent, useAsyncData } from '#imports';
   import { useRoute } from 'vue-router';

   const route = useRoute()
   const { data } = await useAsyncData("portfolio", () => queryContent(`/portfolio/${route.params.slug}`).findOne())
   let selectedIndex = ref(0)

   function normalizeString(input: string): string {
      return input.toLowerCase().replace(/\s+/g, '');
   }

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
      const headerToHide = document.querySelector(".skill--info")

      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               const index = [...sections].indexOf(entry.target) - 1 // The -1 must compensate for the slice(1) of the template

               if (index !== -1) {
                  if (entry.isIntersecting) {
                     selectedIndex.value = index + 1

                     entry.target.classList.add("visible");

                     references[index].classList.add("highlighted");                     
                  } else {
                     selectedIndex.value = index

                     entry.target.classList.remove("visible");

                     references[index].classList.remove("highlighted");
                  }
               }

               if (entry.isIntersecting && index === 1) {
                  (headerToHide as HTMLElement).classList.remove("mobileFlex");

                  (headerToHide as HTMLElement).classList.add("mobileHidden")
               } else if (entry.isIntersecting && index === 0) {
                  (headerToHide as HTMLElement).classList.remove("mobileHidden");

                  (headerToHide as HTMLElement).classList.add("mobileFlex");
               }
            })
         },
         { threshold: 0.0 }
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
                  <li v-for="(feature, index) of data?.features.slice(1)" 
                      :key="index + 1"   
                      class="skill--info--refNavigation--reference reference">
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
         <article v-if="data" 
                  class="skill-features" 
                  :class="data?.navigation.title && normalizeString(data?.navigation.title)">
            <section v-for="feature of data.features" 
            class="section" 
            :id="'topo-' + data.features.indexOf(feature)" 
            :key="feature.name">
               <p v-if="feature.intro">{{ feature.intro }}</p>
               <!-- <ElectronAnim :data="data" v-if="feature.intro && data?.logo" /> -->
                <LanguageWave :title="data?.title?.replace(' | ', '&shy;')" v-if="feature.intro" />

               <h2 v-else>{{ feature.name }}</h2>
               <p>{{ feature.description }}</p>
               <pre v-highlight v-if="feature.code" :class="`language-${data?.language}`">
                  <code>{{ feature.code }}</code>
               </pre>
               <div v-if="feature.image" class="skill-features--imageWrapper">
                  <img :src="feature.image" v-if="feature.image" class="responsiveImg skill-features--image" />
               </div>
               <NavigationArrow 
               :direction="data.features.indexOf(feature) === data.features.length - 1 ? 'up' : 'down'"
               :target="
                  data.features.indexOf(feature) === data.features.length - 1
                  ? `topo-0`
                  : `topo-${data.features.indexOf(feature) +1}`
               ">
               </NavigationArrow>
            </section>
         </article>
      </main>
   </div>
   <!-- <ContentDoc unwrap="p"/> -->
</template>
