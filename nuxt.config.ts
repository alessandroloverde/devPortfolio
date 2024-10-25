// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content"],
  ssr: false, // check https://nuxt.com/docs/getting-started/deployment#static-hosting since is not entirely static
  nitro: {
    // TODO: check prerender more elengant way
    prerender: {
      routes: [
        "/",
        "/portfolio/castoro",
        "/portfolio/gianni",
        "/portfolio/me",
        "/portfolio/vue",
      ],
    },
    static: true,
  },
  compatibilityDate: "2024-10-25",
});
