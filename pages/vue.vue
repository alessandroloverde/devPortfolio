<template>
  <div>
    <Content :document="castoro" />
    <ContentDoc />

  </div>
</template>

<script setup>
  const { data: castoro } = await useAsyncData(() => queryContent('/castoro').findOne())
</script>
