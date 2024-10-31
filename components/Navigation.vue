<template>
   <!-- TODO: develop the component further so that it can handle nested navigation -->
   <nav class="nav">
      <ContentNavigation v-slot="{ navigation }">
      <ul>
         <li><NuxtLink :to="navigation[0]._path">{{ navigation[0].title }}</NuxtLink></li>
         <ul>
            <li v-for="link of navigation[1].children" :key="link._path">
               <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
            </li>
         </ul>
      </ul>
      </ContentNavigation>
   </nav>
 </template>
<script setup>
   /**
    * TODO: Comments are for reference and further development; remove before deployment
    */

   /* import { fetchContentNavigation } from '#imports' */
   //const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
   //console.log('Navigation:', navigation.value)
</script>