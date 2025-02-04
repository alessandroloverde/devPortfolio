<template>
   <div class="atom">
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
</template>

<script setup>
   const props = defineProps({
      data: {
         type: Object,
         required: false,
      },
   });
</script>