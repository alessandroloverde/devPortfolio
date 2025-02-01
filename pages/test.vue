<!-- File: pages/test.vue -->
<script setup lang="ts">
  console.log('[Test Page] loaded')
</script>

<template>
  <h1>Highlight Test</h1>

  <!-- Put the directive on <pre> so it can search inside for <code> -->
  <pre v-highlight>
    <code class="language-javascript">
      function castoro() {
         console.log("Hello from Test.vue");
      }
    </code>
  </pre>
</template>
