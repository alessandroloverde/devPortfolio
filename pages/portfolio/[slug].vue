<script setup lang="ts">
   const route = useRoute()

   const { data } = await useAsyncData("portfolio", () => queryContent(`portfolio/${route.params.slug}`).findOne())

   //console.log("data", data.value)
   let selectedIndex = ref(0)

   import { onMounted } from "vue"
   import SVGarrowDown from "~/public/img/icons/fi-rr-angle-down.svg"

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
   <header>
      <Navigation />
      <div class="skill-info">
         <aside>
            <img :src="data?.logo" v-if="data?.logo" class="responsiveImg" />
         </aside>
         <div class="skill-info--content">
            <div>
               <h1>{{ data?.title }}</h1>
               <h4 v-if="data?.experience">
                  <span>since</span><i>{{ data?.experience }}</i> years
               </h4>
            </div>
         </div>
         <div class="skill-info--toBeDefined">
            <ul class="referenceUL">
               <li v-for="(feature, index) of data?.features.slice(1)" :key="index + 1" class="reference">
                  <div class="reference--number">
                     <AnimatedNumber :numberIndex="index + 1" />
                  </div>
                  <h3 class="shuffle-text">{{ feature.name }}</h3>
               </li>
            </ul>
         </div>
      </div>
   </header>

   <main>
      <article v-if="data" class="skill-features">
         <section v-for="feature of data.features" class="section" :id="'topo-' + data.features.indexOf(feature)">
            <h6 v-if="feature.intro">{{ feature.intro }}</h6>
            <h2 v-else>{{ feature.name }}</h2>
            <p>{{ feature.description }}</p>
            <img :src="feature.image" v-if="feature.image" class="responsiveImg skill-features--image" />
            <div class="scroll-down">
               <SVGarrowDown />
            </div>
         </section>
      </article>
   </main>
   <!-- <ContentDoc unwrap="p"/> -->
</template>
