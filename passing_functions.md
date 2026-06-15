# Passing Functions as Arguments (Callbacks & Higher-Order Functions)

This document explains what it means to pass functions as arguments in JavaScript,
why it's useful, and common implications.

Concepts:

- First-class functions:
  - Functions in JavaScript are "first-class" — they can be stored in
    variables, passed as arguments, returned from other functions, and stored
    in data structures.

- Callbacks:
  - A callback is a function passed as an argument to be invoked later. This
    pattern is widely used for event handlers, timers, and asynchronous code.

- Higher-order functions (HOFs):
  - Functions that accept other functions as arguments or return functions.
  - Examples: `Array.prototype.map`, `filter`, `reduce`, `sort` (when a
    comparator function is passed).

Implications and best practices:

- Control flow and inversion of control:
  - Passing functions gives the callee control over when and how the passed
    function is executed. That can be powerful but also makes reasoning about
    flow more complex.

- `this` binding in callbacks:
  - When passing a method as a callback, be aware that its `this` may be lost.
    You can use `bind`, an arrow function wrapper, or pass an arrow function
    that calls the method on the correct context.

- Error handling:
  - When using callbacks in async flows, propagate or handle errors explicitly.
    Promises and async/await are often clearer for complex async control flows.

- Testing and composition:
  - Passing small, pure functions makes code easier to test and compose.
  - Favor small functions that do one thing; pass them into HOFs to build new
    behavior without mutating state.

Examples:

- Simple callback:

```js
function greet(name, formatter) {
  // call the passed function to format the name before greeting
  console.log('Hello ' + formatter(name));
}

greet('alex', n => n.toUpperCase()); // Hello ALEX
```

- Using functions with array HOFs:

```js
const nums = [1,2,3,4];
const doubled = nums.map(n => n*2); // map accepts a function argument
```

Summary:
- Passing functions is a core JS pattern enabling callbacks, event handlers,
  higher-order functions, and functional composition.
- Be mindful of `this`, error propagation, and keeping functions small and
  pure where possible to improve readability and testability.
