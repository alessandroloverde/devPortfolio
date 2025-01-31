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
.navigationArrow {
   cursor: pointer;
   height: 8vh;
   min-height: 8vh;
   width: 12rem;
   margin: 0 auto 1vh auto;
   align-self: flex-end;

   & > a {
      display: block;
      height: 100%;
      width: 100%;
   }
}
</style>
