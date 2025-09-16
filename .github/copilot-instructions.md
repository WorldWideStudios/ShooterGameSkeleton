---
applyTo: "**"
---

For every request with actions (e.g. not just a simple question) take the following steps:

1. **Start in plan mode** - Start by analyzing the request and planning out a series of steps that you plan to take before doing any work
2. **Present plan** - Present the plan as the series of steps asking for any feedback
3. **Present final plan** - After taking in feedback update plan if needed and always ask for confirmation before beginning work.

## Tech

- npm based project for ease of dependency management
- vite for dev server and build tool
- Built using html5 canvas and typescript
- Utilizing zod for data structures and validation
- utilizing zustand for state management
- phaser for game engine

# Project general coding standards

- Comment all code with a tsdoc. This should include an in depth description of what the function, type or bit of code does.
- Further, comment any non-trivial lines of code with a description of what the line does and why it is needed.

## Browser Compatibility

    - Prioritize feature detection (`if ('fetch' in window)` etc.).
        - Support latest two stable releases of major browsers:
    - Firefox, Chrome, Edge, Safari (macOS/iOS)
        - Emphasize progressive enhancement with polyfills or bundlers (e.g., **Babel**, **Vite**) as needed.

## Phaser Requirements

    - Remember that phaser types are included, don't try and install a types package

## JavaScript Requirements

    - **Minimum Compatibility**: ECMAScript 2020 (ES11) or higher
    - **Features to Use**:
    - Arrow functions
    - Template literals
    - Destructuring assignment
    - Spread/rest operators
    - Async/await for asynchronous code
    - Classes with proper inheritance when OOP is needed
    - Object shorthand notation
    - Optional chaining (`?.`)
    - Nullish coalescing (`??`)
    - Dynamic imports
    - BigInt for large integers
    - `Promise.allSettled()`
    - `String.prototype.matchAll()`
    - `globalThis` object
    - Private class fields and methods
    - Export * as namespace syntax
    - Array methods (`map`, `filter`, `reduce`, `flatMap`, etc.)
    - **Avoid**:
    - `var` keyword (use `const` and `let`)
    - jQuery or any external libraries
    - Callback-based asynchronous patterns when promises can be used
    - Internet Explorer compatibility
    - Legacy module formats (use ES modules)
    - Limit use of `eval()` due to security risks
    - **Performance Considerations:**
    - Recommend code splitting and dynamic imports for lazy loading
    **Error Handling**:
    - Use `try-catch` blocks **consistently** for asynchronous and API calls, and handle promise rejections explicitly.
    - Differentiate among:
    - **Network errors** (e.g., timeouts, server errors, rate-limiting)
    - **Functional/business logic errors** (logical missteps, invalid user input, validation failures)
    - **Runtime exceptions** (unexpected errors such as null references)
    - Provide **user-friendly** error messages (e.g., “Something went wrong. Please try again shortly.”) and log more technical details to dev/ops (e.g., via a logging service).
    - Consider a central error handler function or global event (e.g., `window.addEventListener('unhandledrejection')`) to consolidate reporting.
    - Carefully handle and validate JSON responses, incorrect HTTP status codes, etc.

## Folder Structure

    Follow this structured directory layout:

    	project-root/
    	├── src/                  # Application source code
    	│   ├── helpers/
    	│   ├── models/ # for zod schemas and their derived types
        │   ├── tests/ # for zod schemas and their derived types
    	├── scripts/              # Scripts for deployment, setup, etc.
        ├── index.html

## Documentation Requirements

    - Include JSDoc comments for JavaScript/TypeScript.
    - Document complex functions with clear examples.
    - Maintain concise Markdown documentation.
    - Minimum docblock info: `param`, `return`, `throws`, `author`

## Security Considerations

    - Sanitize all user inputs thoroughly.
    - Parameterize database queries.
    - Enforce strong Content Security Policies (CSP).
    - Use CSRF protection where applicable.
    - Ensure secure cookies (`HttpOnly`, `Secure`, `SameSite=Strict`).
    - Limit privileges and enforce role-based access control.
    - Implement detailed internal logging and monitoring.
