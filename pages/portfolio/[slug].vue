<script setup lang="ts">
const route = useRoute();

const { data } = await useAsyncData("portfolio", () =>
  queryContent(`portfolio/${route.params.slug}`).findOne()
);

//console.log("data", data.value)

import { onMounted } from 'vue';

onMounted(() => {
  const sections = document.querySelectorAll('.section');
  const references = document.querySelectorAll('.reference');

  // Set up the Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Get the index of the currently intersecting section
      const index = [...sections].indexOf(entry.target);

      if (index !== -1) {
        if (entry.isIntersecting) {
          // Add the class to both the section and the corresponding reference
          entry.target.classList.add('visible');
          references[index].classList.add('highlighted');
        } else {
          // Remove the class when the section is out of view
          entry.target.classList.remove('visible');
          references[index].classList.remove('highlighted');
        }
      }
    });
  }, { threshold: 0.1 });

  // Observe each section
  sections.forEach(section => {
    observer.observe(section);
  });
});



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
        <div class="skill-info--toBeDefined">
          <ul>
            <li v-for="feature of data?.features" class="reference">
              <p>{{ feature.name }}</p>
            </li>
          </ul>
        </div>
    </div>
  </header>

  <main>
    <article v-if="data" class="skill-features">
      <section v-for="feature of data.features" class="section">
        <h6 v-if="feature.intro">{{ feature.intro }}</h6>
        <h2 v-else>{{ feature.name }}</h2>
        <p>{{ feature.description }}</p>
        <img :src="feature.image" v-if="feature.image" class="responsiveImg skill-features--image">
      </section>
    </article>
  </main>
  <!-- <ContentDoc unwrap="p"/> -->
</template>
