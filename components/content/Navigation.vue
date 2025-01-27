<template>
  <nav ref="navRef" class="nav">
   <ContentNavigation v-slot="{ navigation }" :isHomeNav="isHomeNav">
       <ul>
         <li v-for="link in getPortfolioPaths(navigation)" :key="link._path">
           <NuxtLink :to="link._path">
            <span v-if="!isHomeNav && link.title === 'Home'">{{ link.icon }}</span>
             <span v-if="!isHomeNav && link.title !== 'Home'">{{ link.title }}</span>
             <img v-if="link.icon && isHomeNav" :src="link.icon" :alt="link.title" />
           </NuxtLink>
         </li>
       </ul>
     </ContentNavigation>
   </nav>
 </template>
 

<script setup>
const props = defineProps({
   isHomeNav: {
     type: Boolean,
     default: false,
   },
});

console.log("navigation", navigation)

const getPortfolioPaths = (navigation) => {
   if (!navigation || !Array.isArray(navigation)) return [];

   const portfolioItem = navigation.find(item => item._path === "/portfolio");
   const homePageItem = navigation.find(item => item.title === "Home");
   const homeItem = homePageItem ? [homePageItem] : [];
   const portfolioChildren = portfolioItem?.children || [];

   return [...homeItem, ...portfolioChildren];
};
</script>
