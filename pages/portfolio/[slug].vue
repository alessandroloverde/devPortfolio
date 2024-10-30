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
    <ul>
      <li v-for="feature of data.features">
        <h5>{{  feature.intro }}</h5>
        <h2>{{ feature.name }}</h2>
        <p>{{ feature.description }}</p>
        <img :src="feature.image" v-if="feature.image">
      </li>
    </ul>
  </article>
  <!-- <ContentDoc unwrap="p"/> -->
</template>
