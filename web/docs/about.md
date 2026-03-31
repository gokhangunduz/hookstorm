---
sidebar_position: 4
---

# About

**Hookstorm** is a curated collection of production-ready React custom hooks designed to handle common patterns in modern web applications — from state management and DOM interaction to browser APIs and utility logic.

The goal is simple: ship less boilerplate, write more product.

---

## Philosophy

### Zero Dependencies

React is the only runtime requirement. Hookstorm introduces no third-party packages into your bundle. Every hook is built on top of React's standard APIs and native browser capabilities.

### TypeScript First

All hooks are written in TypeScript with full type inference. You get accurate IntelliSense, strict return types, and parameter validation without any extra configuration.

### Tree-Shakeable

Import only what you use. Modern bundlers (Vite, webpack, Rollup) automatically eliminate unused hooks from your production bundle, keeping your output lean.

---

## What's Included

Hookstorm currently ships **22+ hooks** grouped by purpose:

| Category | Hooks |
|---|---|
| **UI State** | `useToggle`, `useCounter`, `useDebounce`, `usePrevious` |
| **DOM & Browser** | `useWindowSize`, `useScrollPosition`, `useMousePosition`, `useHover`, `useClickOutside`, `useDocumentTitle`, `useLockScroll`, `useKeyPress` |
| **Storage** | `useLocalStorage`, `useSessionStorage`, `useCookie` |
| **Network & Device** | `useOnlineStatus`, `useGeoLocation`, `usePageVisibility`, `usePrefersTheme` |
| **Timers & Lifecycle** | `useCountdown`, `useIdle` |
| **Clipboard** | `useCopyToClipboard` |

Each hook is documented with a description, parameters, return values, and a working TypeScript example.

---

## Versioning

Hookstorm follows [Semantic Versioning](https://semver.org). Breaking changes are introduced only in major releases. Minor releases add new hooks or features without breaking existing APIs. Patch releases contain bug fixes.

---

## License

Released under the [MIT License](https://github.com/gokhangunduz/hookstorm/blob/main/LICENSE). Free to use in personal and commercial projects.

---

## Links

- **npm** — [npmjs.com/package/hookstorm](https://www.npmjs.com/package/hookstorm)
- **GitHub** — [github.com/gokhangunduz/hookstorm](https://github.com/gokhangunduz/hookstorm)
- **Issues** — [github.com/gokhangunduz/hookstorm/issues](https://github.com/gokhangunduz/hookstorm/issues)
