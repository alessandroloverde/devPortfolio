<script setup lang="ts">
const route = useRoute();

const { data } = await useAsyncData("portfolio", () =>
  queryContent(`portfolio/${route.params.slug}`).findOne()
);
</script>

<template>
  <header>
    <Navigation />
  </header>
  <article v-if="data">
    <h1>{{ data.title }}</h1>
    <p>{{ data.description }}</p>
    <pre>{{ data }}</pre>
  </article>
</template>
