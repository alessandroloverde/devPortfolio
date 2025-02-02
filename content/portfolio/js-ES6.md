---
title: "JS ES6"
description: "Descrizione per la pagina skills => ES6"
logo: "/img/logos/es6.svg"
navigation:
  title: "JS ES6"
  icon: "/img/logos/es6.svg"
experience: 6
features:
  - intro: "Intro text for JavaScript ES6"
  - name: "Data manipulation"
    description: "JavaScript’s .reduce() and .sort() methods are powerful for transforming and summarizing data from APIs. This example calculates the total salary of individuals over a certain age and sorts the data by salary for better insights. Such techniques are indispensable for building dashboards, reports, or analytics-driven applications."
    image: "/img/snippets/js-dataManipulation.jpg"
  - name: "JS 2"
    description: ""
    code: |
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update particles
        particles.forEach((particle) => {
          particle.update();
        });

        // Draw particles
        particles.forEach((particle) => {
          particle.draw();
        });

        // Draw cluster effect around mouse
        drawCluster();

        animationFrameId = requestAnimationFrame(animate);
      }
  - name: "JS 3"
    description: ""
    code: |
      export default defineNuxtPlugin((nuxtApp) => {
        nuxtApp.vueApp.directive('highlight', {
          mounted(el) {
            // ...
          },
          updated(el) {
            // ...
          },
        })
      })
  - name: "JS 4"
    description: ""
    image: "/img/snippets/js-.jpg"
  - name: "JS 5"
    description: ""
    image: "/img/snippets/js-.jpg"
---
<pre v-highlight  class="feature1">
  <code> 
export default defineNuxtPlugin((nuxtApp) => {
   nuxtApp.vueApp.directive('highlight', {
    mounted(el) {
        highlightAllCodeBlocks(el)
    },
    updated(el) {
        highlightAllCodeBlocks(el)
    },
   })
})
  </code>
</pre>

<pre v-highlight  class="feature2">
  <code> 
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update particles
  particles.forEach((particle) => {
    particle.update();
  });

  // Draw particles
  particles.forEach((particle) => {
    particle.draw();
  });

  // Draw cluster effect around mouse
  drawCluster();

  animationFrameId = requestAnimationFrame(animate);
}
  </code>
</pre>