---
title: "Vue 3"
description: "Descrizione per la pagina skills => vue"
logo: "/img/logos/vuejs.svg"
navigation:
  title: "Vue 3"
  icon: "/img/logos/vuejs.svg"
experience: 4
language: "javascript"
features:
  - intro: "Starting with Vue 2 and transitioning to Vue 3, I’ve gained a deep understanding of Vue.js and its evolving ecosystem. My focus is on building performant, modular applications, leveraging Vue's reactivity and component-based architecture. I ensure seamless user experiences through dynamic data binding, efficient routing, and reusable components. With a strong foundation in integrating Vue with various tech stacks, I develop scalable, maintainable solutions that align with both user and business needs."
  - name: "Reactivity & Watchers"
    description: "Vue 3’s reactivity system is awesome, but sometimes you need to react to changes manually. That’s where watch() and watchEffect() shine. watch() tracks specific variables, while watchEffect() runs instantly and reacts to all dependencies inside. Perfect for API calls or computed state updates."
    code: |
      <script setup>
        import { ref, watchEffect } from 'vue';
        const count = ref(0);
        const double = ref(0);

        watchEffect(() => {
          double.value = count.value * 2;
          console.log(`Count: ${count.value}, Double: ${double.value}`);
        });
      </script>

      <template>
        <button @click="count++">Count: {{ count }} (Double: {{ double }})</button>
      </template>

    ##image: "/img/snippets/vue-ReactiveDataBindings.jpg"
  - name: "Computed Properties"
    description: "Computed properties are reactive values that update automatically when dependencies change. Unlike methods, they cache their results, making them ideal for derived state. They’re perfect for things like formatted values, real-time calculations, and filtering data. You can even create getters and setters for two-way transformations."
    code: |
      <script setup>
        const price = ref(100);
        const taxRate = ref(0.2);
        const discount = ref(10);
        const finalPrice = computed(() => (price.value - discount.value) * 
                                          (1 + taxRate.value));
        const formattedPrice = computed({
          get: () => `$${finalPrice.value.toFixed(2)}`,
          set: (newValue) => {
            price.value = parseFloat(newValue.replace('$', '')) / 
                          (1 + taxRate.value) + discount.value;
          }
        });
      </script>

      <template>
        <p>Base Price: {{ price }} | 
           Discount: {{ discount }} | 
           Final: {{ formattedPrice }}</p>
        <button @click="price += 10">Increase Price</button>
        <button @click="discount += 5">Increase Discount</button>
      </template>

    ##image: "/img/snippets/vue-ComponentSystem.jpg"
  - name: "Vue Router & Navigation Guards"
    description: "VRouting in Vue 3 is flexible. Define routes, use router.push(), and protect pages with navigation guards. Need auth checks? beforeEach() has you covered. Dynamic and nested routes make complex apps feel simple."
    code: |
      import { createRouter, createWebHistory } from 'vue-router';
      import Home from './Home.vue';
      import Dashboard from './Dashboard.vue';

      const router = createRouter({
        history: createWebHistory(),
        routes: [
          { path: '/', component: Home }, 
          { path: '/dashboard', component: Dashboard }
        ]
      });

      router.beforeEach((to, from, next) => {
        const isAuthenticated = false; // Fake check
        if (to.path === '/dashboard' && !isAuthenticated) next('/');
        else next();
      });

      export default router;

    ##image: "/img/snippets/vue-Directives.jpg"
  - name: "Event Handling & v-model"
    description: "Vue makes handling events effortless. Whether it’s a button click or an input change, @click, @input, and v-model keep the UI in sync with the state. Vue 3 also allows custom events with defineEmits(), making child-to-parent communication seamless."
    code: |
      const message = ref('');
      const emit = defineEmits(['updateMessage']);

      const updateParent = () => {
        emit('updateMessage', message.value);
      };

      <template>
        <input v-model="message" @input="updateParent" />
        <button @click="message = ''">Clear</button>
      </template>

      <!-- Parent.vue -->
      import ChildInput from './ChildInput.vue';

      const parentMessage = ref('');

      const handleUpdate = (newMessage) => {
        parentMessage.value = newMessage;
      };

      <template>
        <ChildInput @updateMessage="handleUpdate" />
        <p>Parent sees: {{ parentMessage }}</p>
      </template>

    ##image: "/img/snippets/vue-ComputedProperties.jpg"
  - name: "Lifecycles"
    description: "Vue 3 provides lifecycle hooks to control component behavior at different stages. If you need async data fetching, onMounted() is the best place for it. Lifecycle hooks are crucial for performance, API calls, event listeners, and memory management."
    code: |
      <script setup>
      const logs = ref([]);
      const timer = ref(null);

      onMounted(() => {
        logs.value.push('🚀 Component mounted! Starting timer...');
        timer.value = setInterval(() => {
          logs.value.push(`⏳ Timer tick: ${new Date().toLocaleTimeString()}`);
        }, 2000);
      });
      onUpdated(() => {
        logs.value.push('🔄 Component updated!');
      });
      onUnmounted(() => {
        logs.value.push('🛑 Component unmounted. Cleaning up...');
        clearInterval(timer.value);
      });
      </script>

      <template>
        <h3>Lifecycle Logger</h3>
        <ul>
          <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
        </ul>
      </template>

    ##image: "/img/snippets/vue-Lifecycles.jpg"
---

<!-- <h2 class="TestClass SecondTestClass">Vue 3 nad Nuxt</h2>

<p>Starting with Vue 2 and transitioning to Vue 3, I’ve gained a deep understanding of Vue.js and its evolving ecosystem. My focus is on building performant, modular applications, leveraging Vue's **reactivity** and component-based architecture.
<br>
I ensure seamless user experiences through dynamic data binding, efficient routing, and reusable components. With a strong foundation in integrating Vue with various tech stacks, I develop scalable, maintainable solutions that align with both user and business needs.</p>

<h2 id="TestID">Reactive Data Binding</h2>
<p>Vue’s reactivity system ensures the UI stays in sync with underlying data, whether using ref() for primitives or reactive() for complex objects. I leverage this system to create dynamic interfaces that respond instantly to user input without manual DOM manipulation. 

Understanding the nuances of both methods, I apply them based on the specific data requirements, ensuring efficient, scalable and  maintainable code.</p>

Hello [World]{style="color: green;" .custom-class #custom-id}!



<img src="/img/logos/vuejs-original.svg" alt="Vue logo" class=""> -->
