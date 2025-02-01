// plugins/highlightjs.client.ts
import { defineNuxtPlugin } from '#app'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai.css'

export default defineNuxtPlugin((nuxtApp) => {
   nuxtApp.vueApp.directive('highlight', {
     mounted(el) {
       // Called once at initial mount
       highlightAllCodeBlocks(el)
     },
     updated(el) {
       // Called on each subsequent update
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
 
