<template>
   <div class="navigationArrow">
      <a :href="`#${target}`">
         <span :class="`inlineIcon--arrow-${direction}`"></span>
      </a>
   </div>
</template>

<script setup>
   import SVGarrowDown from "~/public/img/icons/fi-rr-angle-down.svg";

   const props = defineProps({
      direction: {
         type: String,
         default: "down",
      },
      target: {
         type: String,
      },
   });
</script>

<style lang="scss" scoped>
@use "/public/styles/variables" as *;

$arrowDimension: 6vh;

.navigationArrow {
   cursor: pointer;
   height: $arrowDimension;
   min-height: $arrowDimension;
   width: calc(#{$arrowDimension} * 1.5);
   margin: 0 auto 1vh auto;
   align-self: flex-end;

   & > a {
      display: block;
      height: 100%;
      width: 100%;
   }
}
</style>
