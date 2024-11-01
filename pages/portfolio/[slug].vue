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
    <div class="skill-info">
        <aside>
          <img :src="data?.logo" v-if="data?.logo" class="responsiveImg">
        </aside>
        <div class="skill-info--content">
          <div>
            <h1>{{ data?.title }}</h1>
            <h4 v-if="data?.experience"><span>since</span><i>{{ data?.experience }}</i> years</h4>
          </div>

        </div>
    </div>
  </header>

  <main>
    <article v-if="data" class="skill-features">
      <ul>
        <li v-for="feature of data.features">
          <h6 v-if="feature.intro">{{ feature.intro }}</h6>
          <h2 v-else>{{ feature.name }}</h2>
          <p>{{ feature.description }}</p>
          <img :src="feature.image" v-if="feature.image" class="responsiveImg skill-features--image">
        </li>
      </ul>
    </article>
  </main>
  <!-- <ContentDoc unwrap="p"/> -->
</template>
