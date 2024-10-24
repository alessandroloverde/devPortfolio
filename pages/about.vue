<template>
  <div>
    <!-- Ensure the `Content` component is spelled correctly and used with the `document` prop -->
    <ContentDoc />

    <Content :document="about" />
    <p>Mannaggia</p>
  </div>
</template>

<script setup>
// Fetch the content from the `about.md` file
const { data: about } = await useAsyncData(() => queryContent('about').findOne())
</script>
