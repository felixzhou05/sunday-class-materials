# Arrow Functions vs Traditional Function Declarations

This document explains implications of using arrow functions (`()=>{}`) instead
of traditional function declarations (`function name(){}`) in JavaScript.

Key differences and implications:

- `this` binding:
  - Arrow functions use lexical `this` — they capture the `this` value from the
    surrounding scope at the time they are created. They do not get their own
    `this` when called. This makes arrow functions convenient for callbacks
    that need access to the outer `this` (for example, inside a class method).
  - Traditional functions get their `this` depending on how they are called
    (object method, `call`/`apply`, or direct call), which can be useful when
    you need dynamic `this` behavior.

- `arguments` object:
  - Arrow functions do not have their own `arguments` object. Use rest
    parameters (`...args`) in arrow functions when you need the argument list.
  - Traditional functions have `arguments` available.

- `new` operator / constructors:
  - Arrow functions cannot be used as constructors (they will throw when used
    with `new`). Use function declarations or class constructors for types that
    need instantiation.

- `prototype` property:
  - Arrow functions do not have a `prototype` property, so they cannot be used
    to create prototype methods for instances the same way constructor
    functions can.

- Implicit return and brevity:
  - Arrow functions can implicitly return an expression when written without a
    block body: `const add = (a,b) => a+b`. This leads to concise callbacks.
  - For multi-line logic, use a block body with `return`.

- Readability and team style:
  - Arrow functions are compact and excellent for short callbacks (map/filter).
  - For exported utilities or API methods, traditional function declarations can
    be clearer (they have hoisting and a visible name in stack traces).

Examples:

- Arrow function capturing outer `this`:

```js
class Timer {
  constructor() { this.seconds = 0 }
  start() {
    setInterval(() => { // arrow captures `this` from start()
      this.seconds++;
    }, 1000);
  }
}
```

- Traditional function where `this` is dynamic:

```js
const obj = { value: 10, get: function(){ return this.value } }
// Calling obj.get() binds this to obj
```

Summary:
- Use arrow functions for short callbacks and when you want lexical `this`.
- Use traditional functions when you need `arguments`, `this` to be dynamic,
  or when creating constructors / prototypes.
