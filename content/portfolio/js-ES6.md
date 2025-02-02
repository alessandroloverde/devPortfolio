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
    image: "/img/snippets/js-mobileTest.png"
  - name: "JS 3"
    description: ""
    code: "export default defineNuxtPlugin((nuxtApp) => {"
  - name: "JS 4"
    description: ""
    image: "/img/snippets/js-.jpg"
  - name: "JS 5"
    description: ""
    image: "/img/snippets/js-.jpg"
---
<pre v-highlight class="language-javascript">
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