---
title: "JS ES6"
description: "Descrizione per la pagina skills => ES6"
logo: "/img/logos/es6.svg"
navigation:
  title: "JS ES6"
  icon: "/img/logos/es6.svg"
experience: 7
language: "javascript"
features:
  - intro: "Intro text for JavaScript ES6"
  - name: "Data manipulation"
    description: "JavaScript’s .reduce() and .sort() methods are powerful for transforming and summarizing data from APIs. This example calculates the total salary of individuals over a certain age and sorts the data by salary for better insights. Such techniques are indispensable for building dashboards, reports, or analytics-driven applications."
    code: |
      const apiData = [
        { id: 1, name: "Stefano", age: 30, salary: 3000 },
        { id: 2, name: "Edoardo", age: 25, salary: 2500 },
        { id: 3, name: "Maria", age: 35, salary: 4000 },
        { id: 4, name: "Sophia", age: 40, salary: 4500 },
        { id: 5, name: "Luca", age: 28, salary: 2800 }
      ];

      // Filter people over 30 and calculate total salary
      const totalSalaryOver30 = apiData
        .filter(person => person.age > 30)
        .reduce((sum, person) => sum + person.salary, 0);

      // Sort people by salary in descending order
      const sortedBySalary = apiData.sort((a, b) => b.salary - a.salary);

      console.log(`Total Salary of people over 30: ${totalSalaryOver30}`);
      console.log(sortedBySalary);

  - name: "Destructuring & Spread/Rest Operators"
    description: "Destructuring lets you extract values from objects and arrays effortlessly. The spread operator expands elements, while the rest operator groups multiple values into one. These features simplify data handling and improve readability when working with function parameters or merging objects."
    code: |
      const user = { name: "SteLaLauraurafano", age: 30, country: "Italy" };
      const { name, age } = user;
      console.log(`${name} is ${age} years old.`); // Laura is 30 years old.

      const numbers = [1, 2, 3];
      const allNumbers = [...numbers, 4, 5];
      console.log(allNumbers); // [1, 2, 3, 4, 5]

  - name: "Promises & Async/Await"
    description: "JavaScript uses promises to handle asynchronous tasks without callback hell. Instead of chaining .then(), async/await makes the code more readable, executing like synchronous code. It’s useful for fetching data, handling timeouts, and running async operations sequentially."
    code: |
      function fetchData() {
        return new Promise((resolve) => 
                       setTimeout(() => 
                       resolve("Data loaded!"), 1500));
      }

      async function loadData() {
        console.log("Fetching...");
        const data = await fetchData();
        console.log(data);
      }

      loadData(); // Fetching... (waits 1.5s) Data loaded!

  - name: "JS 4"
    description: ""
    image: "/img/snippets/js-.jpg"
  - name: "JS 5"
    description: ""
    image: "/img/snippets/js-.jpg"
---
<pre v-highlight  class="feature1">
  <code> 
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
  </code>
</pre>

<pre v-highlight  class="feature2">
  <code> 
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update particles
  particles.forEach((particle) => {
    particle.update();
  });

  // Draw particles
  particles.forEach((particle) => {
    particle.draw();
  });

  // Draw cluster effect around mouse
  drawCluster();

  animationFrameId = requestAnimationFrame(animate);
}
  </code>
</pre>