<template>
  <div>
    <ContentDoc />

    <Content :document="castoro" />

  </div>
</template>

<script setup>
  const { data: castoro } = await useAsyncData(() => queryContent('/castoro').findOne())
</script>
