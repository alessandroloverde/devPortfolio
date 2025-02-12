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
  - intro: "I have a good command of JavaScript, from core concepts like closures, event handling, and the event loop to modern ES6+ features like async/await, destructuring, and template literals. I write clean, maintainable code using functional programming, higher-order functions, and error handling for robust applications. I love using JavaScript to enrich interfaces and enhance user experience, integrating it seamlessly with CSS, SASS, and APIs to create dynamic, interactive, and scalable applications."
  - name: "Data manipulation"
    description: "JavaScript’s .reduce() and .sort() methods are powerful for transforming and summarizing data from APIs. This example calculates the total salary of individuals over a certain age and sorts the data by salary for better insights. Such techniques are indispensable for building dashboards, reports, or analytics-driven applications."
    code: |
      const apiData = [
        { id: 1, name: "Stefano", age: 30, salary: 3000 },
        { id: 2, name: "Edoardo", age: 25, salary: 2500 },
        { id: 3, name: "Maria", age: 35, salary: 4000 },
        { id: 4, name: "Sophia", age: 40, salary: 4500 },
      ];

      // Filter people over 30 and calculate total salary
      const totSalaryOver30 = apiData
        .filter(person => person.age > 30)
        .reduce((sum, person) => sum + person.salary, 0);

      const sortedBySalary = apiData.sort((a, b) => 
                                  b.salary - a.salary);

      console.log(`Tot. Salary of people > 30: ${totSalaryOver30}`);
      console.log(sortedBySalary);

  - name: "Destructuring & Spread/Rest Operators"
    description: "Destructuring lets you extract values from objects and arrays effortlessly. The spread operator expands elements, while the rest operator groups multiple values into one. These features simplify data handling and improve readability when working with function parameters or merging objects."
    code: |
      const user = { 
        name: "SteLaLauraurafano", 
        age: 30, 
        country: "Italy" 
      };
      const { name, age } = user;
      console.log(`${name} is ${age} years old.`); 
      // Laura is 30 years old.

      const numbers = [1, 2, 3];
      const allNumbers = [...numbers, 4, 5];
      console.log(allNumbers);  // [1, 2, 3, 4, 5]

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

  - name: "CSS Manipulation"
    description: "JavaScript can dynamically interact with CSS by modifying variables at runtime; useful for theme switching, and UI customization while keeping styles maintainable, especially with localStorage."
    code: |
      const themes = {
        light: { "--primary-color": "#3498db", "--text-color": "#333" },
        dark: { "--primary-color": "#e74c3c", "--text-color": "#fff" }
      };

      function setTheme(theme) {
        if (!themes[theme]) return;
        Object.entries(themes[theme]).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
        });
        localStorage.setItem("theme", theme);
      }
      function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
      }
      function toggleTheme() {
        const currentTheme = localStorage.getItem("theme") === "light" ? "dark" : "light";
        setTheme(currentTheme);
      }
      loadTheme();

      document.getElementById("toggle").addEventListener("click", toggleTheme);

  - name: "Error Handling & Try/Catch"
    description: "JavaScript doesn’t stop execution when an error occurs; the try/catch block ensures graceful error recovery, preventing the entire app from crashing. You can also use finally for cleanup and throw to generate custom errors. For asynchronous operations, try/catch works well with async/await, ensuring robust network requests and API calls"
    code: |
        async function fetchData() {
          try {
            console.log("Fetching data...");
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            
            if (!res.ok) {
              throw new Error(`HTTP Error! Status: ${res.status}`);
            }
            
            const data = await res.json();
            console.log("Fetched users:", data.map(user => user.name));
          } catch (error) {
            console.error("❌ Error fetching data:", error.message);
          } finally {
            console.log("✅ Fetch attempt completed.");
          }
        }

        fetchData();

---