<template>
   <h6 class="wave">{{ title }}</h6>
</template>

<script setup>
   const props = defineProps({
      title: {
         type: String,
         required: false,
      },
   })
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
      //position: relative;
      //background-clip: text;
      overflow: clip;
      //background-color: #fefcef;
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
