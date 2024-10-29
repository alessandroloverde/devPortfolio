<script setup lang="ts">
const route = useRoute();

const { data } = await useAsyncData("portfolio", () =>
  queryContent(`portfolio/${route.params.slug}`).findOne()
);

console.log("data", data.value)
</script>

<template>
  <header>
    <Navigation />
  </header>
  <article v-if="data">
    <h1>{{ data.title }}</h1>
    <p>{{ data.description }}</p>
    <hr>
    <ContentDoc />
  
  </article>
</template>
