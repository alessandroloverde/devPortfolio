<script setup lang="ts">
await useAsyncData("portfolio", () => queryContent("portfolio").findOne());
</script>

<template>
  <ContentDoc />
</template>
