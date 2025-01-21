// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  devtools: { enabled: false },
  modules: ["@nuxt/content", "@nuxtjs/google-fonts"],
  ssr: false,
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
  vite: {
    plugins: [svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "sass:math";`,
          quietDeps: true
        }
      }
    }
  },
  content: {
    markdown: {
      remarkPlugins: [],
      rehypePlugins: [],
      anchorLinks: false, // Disable heading anchors
    },
  },
});
