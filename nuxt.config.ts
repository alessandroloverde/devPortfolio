// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/google-fonts"],
  ssr: true,
  compatibilityDate: "2024-10-25",
  googleFonts: {
    families: {
      Barlow: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      "Bodoni Moda": [400, 500, 600, 700, 800, 900],
    },
  },
  css: [
    '~/public/styles/main.scss',
  ],
});