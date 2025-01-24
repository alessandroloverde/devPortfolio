<template>
   <div class="homePage--arrow">
      <a :href="`#${target}`">
         <span :class="`inlineIcon--arrow-${direction}`"></span>
      </a>
   </div>
</template>

<script setup>
   import SVGarrowDown from "~/public/img/icons/fi-rr-angle-down.svg";

   const props = defineProps(
      {
         direction: {
            type: String,
            default: "down",
         },
         target: {
            type: String,
         },
      }
   );
</script>

<style lang="scss" scoped></style>
