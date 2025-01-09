<template>
   <nav class="nav">
      <ContentNavigation v-slot="{ navigation }">
         <ul>
            <li v-for="link in getPortfolioPaths(navigation)" :key="link._path">
               <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
            </li>
         </ul>
      </ContentNavigation>
   </nav>
</template>

<script setup>
const getPortfolioPaths = (navigation) => {
   if (!navigation || !Array.isArray(navigation)) return [];

   const portfolioItem = navigation.find(item => item._path === "/portfolio");
   const homePageItem = navigation.find(item => item.title === "Home");
   const homeItem = homePageItem ? [homePageItem] : [];
   const portfolioChildren = portfolioItem?.children || [];

   return [...homeItem, ...portfolioChildren];
};
</script>
