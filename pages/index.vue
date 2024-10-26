<template>
  <div>
    <header>
      <Navigation />
    </header>
    <ContentDoc />
    <Content  :document="topo" />
  </div>
</template>

<script setup>
  const { data: topo, error } = await useAsyncData(() => queryContent('index').findOne())

  if (error) {
    console.error('porca madonna:', error)
  }
</script>
