<template>
  <div>
    <Content :document="castoro" />
    <ContentDoc />
    <h2>Mannaggia al castoro</h2>
  </div>
</template>

<script setup>
  const { data: castoro } = await useAsyncData(() => queryContent('/castoro').findOne())

  console.log("castoro", castoro.value)
</script>
