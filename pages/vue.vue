<template>
  <header>
      <Navigation />
  </header>
  <div>
    <Content :document="skill_vue" />
    <ContentDoc />
  </div>
</template>

<script setup>
  const { data: skill_vue } = await useAsyncData(() => queryContent('vue').findOne())

  console.log("castoro", skill_vue.value)
</script>
