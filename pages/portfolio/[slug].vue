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
    <div class="skill--info">
        <aside>
          <img :src="data?.logo" v-if="data?.logo" class="responsiveImg">
        </aside>
        <div>
          <h1>{{ data?.title }}</h1>
          <h4><span>since</span><i>{{ data?.experience }}</i> years</h4>
        </div>
    </div>
  </header>

  <main>
    <article v-if="data">
    <ul>
      <li v-for="feature of data.features">
        <h6>{{ feature.intro }}</h6>
        <h2>{{ feature.name }}</h2>
        <p>{{ feature.description }}</p>
        <img :src="feature.image" v-if="feature.image" class="responsiveImg">
      </li>
    </ul>
  </article>
  </main>
  <!-- <ContentDoc unwrap="p"/> -->
</template>
