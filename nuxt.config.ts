// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: '/img/Bkg-Alessandro.jpg'
        }
      ],
      script: [
        {
          src: 'https://cloud.umami.is/script.js',
          'data-website-id': '9735da4a-8aae-4a0a-8082-314268897477',
          defer: true
        }
      ]
    }
  },
  devtools: { enabled: false },
  modules:  ["@nuxt/content", "@nuxtjs/google-fonts"],
  ssr: false,
  compatibilityDate: "2024-10-25",
  googleFonts: {
    families: {
      "Fira Mono": [400, 500, 700],
      Barlow: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      "Bodoni Moda": [400, 500, 600, 700, 800, 900],
    },
  },
  css: [
     'highlight.js/styles/base16/onedark.css',
    /* 'highlight.js/styles/srcery.css', */
    '~/public/styles/main.scss',
  ],
  plugins: [
    '~/plugins/highlightjs.client.ts'
  ],
  vite: {
    plugins: [svgLoader()],
    build: {
      minify: true,
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    },
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
})
