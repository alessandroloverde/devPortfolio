---
title: "Type | Script"
description: "Descrizione per la pagina skills => TypeScript"
logo: "/img/logos/typescript.svg"
navigation:
  title: "TypeScript"
  icon: "/img/logos/typescript.svg"
experience: 2
language: "typescript"
features:
  - intro: "TypeScript adds type safety and powerful tools to JavaScript without losing its flexibility. It helps catch bugs early, makes code more predictable, and improves maintainability. With type inference you don’t always need to specify types, but when you do, interfaces, generics, and utility types give you full control. A proper typed codebase saves you a lot of time for units test also."
  - name: "Type Inference & Annotations"
    description: "TypeScript is smart enough to guess types: it can determine the types of variables based on their usage and context, without the need for explicit type annotations. On the other hand explicit annotations give you control. let age = 25 is inferred as a number, but let user: string = 'Alice' makes it crystal clear. Explicit types help with readability and prevent dumb mistakes."
    code: |
      let age: number = 30;
      let username = "Stefano"; // Type inferred as string

      function greet(name: string): string {
        return `Hello, ${name}!`;
      }

      console.log(greet(username)); // ✅ "Hello, Stefano!"
      // console.log(greet(42)); // ❌ Error: Argument must be a string


  - name: "Interfaces & Type Aliases"
    description: "Interfaces and type aliases make object structures reusable and maintainable. interface defines shapes for objects, while type is more flexible, supporting unions and intersections. Interfaces are great for defining object contracts, while type aliases let you create more complex types like 'admin' | 'user'. They help ensure consistency across your codebase."
    code: |
      interface User {
        name: string;
        age: number;
      }

      type Role = "admin" | "editor" | "user";

      const stefano: User = { name: "Stefano", age: 29 };
      const role: Role = "admin"; // Can only be "admin", "editor", or "user"

      function describeUser(user: User): string {
        return `${user.name} is ${user.age} years old, his role is: ${role}`;
      }

      console.log(describeUser(stefano)); 
      // ✅ "Stefano is 29 years old, his role is: admin"


  - name: "Generics"
    description: "Generics allow you to create reusable functions, classes, and types without sacrificing type safety. Instead of writing separate functions for numbers, strings, or arrays, generics let you define a function that works with any type. They’re like type placeholders—once provided with a real type, they lock in that type for the function or class."
    code: |
      function identity<T>(value: T): T {
        return value;
      }

      const num = identity(42); // TypeScript knows it's a number
      const str = identity("Hello!"); // TypeScript knows it's a string

      function pair<T, U>(first: T, second: U): [T, U] {
        return [first, second];
      }

      const result = pair("Stefano", 30); // ✅ ["Stefano", 30]
      console.log(result);

  - name: "Utility Types & Mapped Types"
    description: "TypeScript has built-in utility types that modify existing types without rewriting them. Partial<T> makes all properties optional, Readonly<T> locks them, and Pick<T, K> selects only specific properties. These utilities help when working with APIs, form states, or immutable objects. Mapped types let you transform object types dynamically, making your code even more flexible."
    code: |
      interface User {
        name: string;
        age: number;
        email: string;
      }

      // Make all properties optional
      type PartialUser = Partial<User>;

      // Make all properties readonly
      type ReadOnlyUser = Readonly<User>;

      const user: ReadOnlyUser = { 
        name: "Stefano", 
        age: 30, 
        email: "stefano@mail.com" 
      };

      // user.age = 31; ❌ Error: Readonly properties cannot be reassigned

  - name: "Type Narrowing & Guards"
    description: "TypeScript isn't just about defining types—it also makes runtime checks smarter. Narrowing allows you to refine types based on conditions. With typeof, you can differentiate between strings and numbers, while instanceof helps distinguish between classes. Discriminated unions take it further, ensuring TypeScript enforces valid values dynamically."
    code: |
      function printId(id: string | number) {
        if (typeof id === "string") {
          console.log(`ID is a string: ${id.toUpperCase()}`);
        } else {
          console.log(`ID is a number: ${id.toFixed(2)}`);
        }
      }

      printId("abc123"); // ✅ ID is a string: ABC123
      printId(42.5); // ✅ ID is a number: 42.50

      class Animal { name = "Animal"; }
      class Dog extends Animal { bark() { return "Woof!"; } }

      function checkAnimal(pet: Animal) {
        if (pet instanceof Dog) console.log(pet.bark()); // ✅ "Woof!"
      }

      checkAnimal(new Dog());

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
