<template>
   <h6 ref="waveRef" class="wave">{{ title }}</h6>
 </template>
 
 <script setup>
 import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
 
 const props = defineProps({
   title: {
     type: String,
     required: false,
   },
 });
 
 const waveRef = ref(null);
 
 function adjustFontSize() {
   requestAnimationFrame(() => {
     const element = waveRef.value;
     if (!element) return;
 
     const parent = element.parentElement;
     if (!parent) return;
 
     // Get available width (excluding padding)
     let containerWidth = parent.clientWidth - 64;
     if (containerWidth <= 0) return;
 
     const charCount = props.title.length || 1; // Avoid division by 0
 
     // **Empirical reference values at containerWidth = 753px**
     const empiricalData = {
       5: 296,  // Vue 3
       11: 264, // TypeScript
       4: 298,  // Sass
       6: 236,  // JS ES6
     };
 
     // **Fine-tuned empirical factor based on testing**
     let empiricalFactor = empiricalData[charCount]
       ? (empiricalData[charCount] / (753 / charCount)) * 0.97 // Adjusted for accuracy
       : 0.85; // Default factor if unknown case
 
     let fontSize = (containerWidth / charCount) * empiricalFactor;
 
     // Apply safety reduction (5-10% smaller)
     fontSize *= 0.90;
 
     // Prevent extreme font sizes
     fontSize = Math.max(10, fontSize);
 
     element.style.fontSize = `${fontSize}px`;
   });
 }
 
 let resizeObserver;
 
 onMounted(() => {
   nextTick(() => {
     adjustFontSize(); // Initial adjustment
 
     resizeObserver = new ResizeObserver(() => {
       adjustFontSize();
     });
 
     if (waveRef.value?.parentElement) {
       resizeObserver.observe(waveRef.value.parentElement);
     }
   });
 });
 
 // Recalculate if the title changes dynamically
 watch(() => props.title, () => adjustFontSize());
 
 onBeforeUnmount(() => {
   if (resizeObserver) resizeObserver.disconnect(); // Cleanup observer
 });
 </script>

<style lang="scss" scoped>
   @use "/public/styles/variables" as *;
   @use "sass:color";
   @use "sass:map";

   @each $language, $color in $languageColors {
      .#{$language} .wave {
            color: map.get($languageColors, $language);
      }
   };

   h6 { margin-top: auto }
   .wave {
      font-weight: 900;
      font-size: 10vw;
      line-height: 1;
      color: $vueGreen;
      overflow: clip;
      will-change: transform; // Optimizes rendering

      &:before,
      &:after {
         content: "";
         position: absolute;
         background-color: color.scale($boxBkgColor, $alpha: -70%);
         width: 180%;
         top: 50%;
         left: 50%;
         aspect-ratio: 1;
         translate: -50% 0;
         border-top-left-radius: 60% 80%;
         border-top-right-radius: 50% 80%;
         border-bottom-left-radius: 60% 80%;
         border-bottom-right-radius: 50% 80%;
         //mix-blend-mode: multiply;
         animation: rot 10s linear infinite;
      }
      &:after {
         animation-delay: -4s;
         animation-duration: 8s;
      }
   }
   @keyframes rot {
      to {
         transform: rotate(1turn);
      }
   }
</style>
