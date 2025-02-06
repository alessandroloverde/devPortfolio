// plugins/highlightjs.client.ts

import { defineNuxtPlugin } from '#app'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'


export default defineNuxtPlugin((nuxtApp) => {
   nuxtApp.vueApp.directive('highlight', {
     mounted(el) {
       highlightAllCodeBlocks(el)
     },
     updated(el) {
       highlightAllCodeBlocks(el)
     },
   })
 })
 
 function highlightAllCodeBlocks(el: HTMLElement) {
   const blocks = el.querySelectorAll('code')
   blocks.forEach((block) => {
     hljs.highlightElement(block as HTMLElement)
   })
 }
 
