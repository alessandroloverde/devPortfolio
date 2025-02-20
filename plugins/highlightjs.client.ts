// plugins/highlightjs.client.ts

import { defineNuxtPlugin } from '#app'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';  // Required for Vue syntax

import 'highlight.js/styles/atom-one-dark.css'

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('xml', xml);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('highlight', {
    mounted(el) {
      highlightAllCodeBlocks(el)
    },
    updated(el) {
      highlightAllCodeBlocks(el)
    },
  })
  
  return {
    provide: {
      hljs
    }
  }
})

function highlightAllCodeBlocks(el: HTMLElement) {
  const blocks = el.querySelectorAll('code')
  blocks.forEach((block) => {
    hljs.highlightElement(block as HTMLElement)
  })
}
