<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/gokhangunduz/hookstorm/main/web/static/img/logo.dark.svg">
    <img src="https://raw.githubusercontent.com/gokhangunduz/hookstorm/main/web/static/img/logo.svg" alt="Hookstorm Logo" width="96" height="96" />
  </picture>
</p>

<h1 align="center">Hookstorm</h1>

<p align="center">
  Production-ready React hooks. Zero dependencies. TypeScript first.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/hookstorm">
    <img src="https://img.shields.io/npm/v/hookstorm?style=flat-square&color=6366f1" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/hookstorm">
    <img src="https://img.shields.io/npm/dm/hookstorm?style=flat-square&color=6366f1" alt="npm downloads" />
  </a>
  <a href="https://github.com/gokhangunduz/hookstorm/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/hookstorm?style=flat-square&color=6366f1" alt="license" />
  </a>
  <a href="https://github.com/gokhangunduz/hookstorm/actions/workflows/release.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/gokhangunduz/hookstorm/release.yml?style=flat-square&label=CI&color=22c55e" alt="CI status" />
  </a>
  <img src="https://img.shields.io/badge/React-18%2B-61dafb?style=flat-square&logo=react&logoColor=white" alt="React 18+" />
  <img src="https://img.shields.io/badge/TypeScript-ready-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/dependencies-0-22c55e?style=flat-square" alt="zero dependencies" />
</p>

<p align="center">
  <a href="https://gokhangunduz.github.io/hookstorm/docs/installation"><strong>Get Started</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="https://gokhangunduz.github.io/hookstorm/docs/hooks"><strong>Browse Hooks</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="https://github.com/gokhangunduz/hookstorm/issues"><strong>Report a Bug</strong></a>
</p>

<br />

---

## Installation

```bash
npm install hookstorm
# or
yarn add hookstorm
# or
pnpm add hookstorm
```

> Requires React 18 or later as a peer dependency.

---

## Quick Start

```tsx
import { useToggle, useDebounce, useLocalStorage, useWindowSize } from "hookstorm";

function App() {
  const { value: isOpen, toggle } = useToggle();
  const { value: theme, setValue: setTheme } = useLocalStorage("theme", "light");
  const { width } = useWindowSize();
  const debouncedWidth = useDebounce(width, 300);

  return (
    <div>
      <button onClick={toggle}>{isOpen ? "Close" : "Open"}</button>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </button>
      <p>Window: {debouncedWidth}px</p>
    </div>
  );
}
```

---

## Hooks

### State & UI

| Hook | Description |
| --- | --- |
| [`useToggle`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useToggle) | Toggle a boolean with an optional forced value |
| [`useCounter`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useCounter) | Increment, decrement, and reset a counter |
| [`usePrevious`](https://gokhangunduz.github.io/hookstorm/docs/hooks/usePrevious) | Access the previous value of any state or prop |
| [`useDebounce`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useDebounce) | Delay a value update until input settles |

### DOM & Browser

| Hook | Description |
| --- | --- |
| [`useWindowSize`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useWindowSize) | Track current window width and height |
| [`useScrollPosition`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useScrollPosition) | Read the current scroll position (RAF-throttled) |
| [`useMousePosition`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useMousePosition) | Track cursor position in real time (RAF-throttled) |
| [`useHover`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useHover) | Detect hover state on any element |
| [`useClickOutside`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useClickOutside) | Detect clicks (and focus) outside a referenced element |
| [`useDocumentTitle`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useDocumentTitle) | Dynamically update the browser tab title |
| [`useLockScroll`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useLockScroll) | Prevent or restore page scroll — safe for multiple instances |
| [`useKeyPress`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useKeyPress) | Detect when a specific key is held down |

### Storage

| Hook | Description |
| --- | --- |
| [`useLocalStorage`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useLocalStorage) | `localStorage` with a React state interface |
| [`useSessionStorage`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useSessionStorage) | `sessionStorage` with a React state interface |
| [`useCookie`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useCookie) | Read, write, and remove cookies (RFC 6265 compliant) |

### Network & Device

| Hook | Description |
| --- | --- |
| [`useOnlineStatus`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useOnlineStatus) | Detect online / offline status |
| [`useGeoLocation`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useGeoLocation) | Request and track user geolocation with loading state |
| [`usePageVisibility`](https://gokhangunduz.github.io/hookstorm/docs/hooks/usePageVisibility) | Know when the user switches away from the tab |
| [`usePrefersTheme`](https://gokhangunduz.github.io/hookstorm/docs/hooks/usePrefersTheme) | Read the OS `prefers-color-scheme` setting |

### Timers & Async

| Hook | Description |
| --- | --- |
| [`useAsync`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useAsync) | Manage async function lifecycle — data, loading, error |
| [`useInterval`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useInterval) | Declarative `setInterval` — pause with `null` |
| [`useTimeout`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useTimeout) | Declarative `setTimeout` with `reset` and `clear` |
| [`useCountdown`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useCountdown) | Countdown timer with start, stop, and reset |
| [`useIdle`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useIdle) | Detect inactivity after a configurable timeout |
| [`useCopyToClipboard`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useCopyToClipboard) | Copy text and track clipboard state |
| [`useMounted`](https://gokhangunduz.github.io/hookstorm/docs/hooks/useMounted) | Safe guard against post-unmount state updates |

---

## Examples

<details>
<summary><b>useAsync</b> — data fetching with loading and error states</summary>

```tsx
import { useAsync } from "hookstorm";

function UserProfile({ id }: { id: string }) {
  const { data, loading, error, execute } = useAsync(
    () => fetch(`/api/users/${id}`).then((r) => r.json()),
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} <button onClick={execute}>Retry</button></p>;

  return <p>Hello, {data.name}</p>;
}
```

</details>

<details>
<summary><b>useClickOutside</b> — close a dropdown when clicking away</summary>

```tsx
import { useClickOutside } from "hookstorm";

function Dropdown({ onClose }: { onClose: () => void }) {
  const { ref } = useClickOutside(onClose);

  return <div ref={ref}>Dropdown content</div>;
}
```

</details>

<details>
<summary><b>useDebounce</b> — search input with debounced API call</summary>

```tsx
import { useState, useEffect } from "react";
import { useDebounce } from "hookstorm";

function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

</details>

<details>
<summary><b>useInterval</b> — live clock</summary>

```tsx
import { useState } from "react";
import { useInterval } from "hookstorm";

function Clock() {
  const [time, setTime] = useState(new Date());
  useInterval(() => setTime(new Date()), 1000);

  return <p>{time.toLocaleTimeString()}</p>;
}
```

</details>

<details>
<summary><b>useLocalStorage</b> — persist user preference across sessions</summary>

```tsx
import { useLocalStorage } from "hookstorm";

function Settings() {
  const { value: lang, setValue: setLang } = useLocalStorage("lang", "en");

  return (
    <select value={lang ?? "en"} onChange={(e) => setLang(e.target.value)}>
      <option value="en">English</option>
      <option value="tr">Turkish</option>
    </select>
  );
}
```

</details>

<details>
<summary><b>useIdle</b> — detect user inactivity</summary>

```tsx
import { useIdle } from "hookstorm";

function App() {
  const { isIdle } = useIdle(30_000); // 30 seconds

  return <p>{isIdle ? "You've been away!" : "Welcome back."}</p>;
}
```

</details>

---

## Why Hookstorm?

| | |
| --- | --- |
| **Zero dependencies** | Only React is required — nothing else ships with your bundle |
| **TypeScript first** | Every hook is fully typed with exported return types |
| **Tree-shakeable** | `"sideEffects": false` — bundlers only ship what you import |
| **SSR safe** | All browser APIs are guarded for Next.js and Remix |
| **Battle-tested** | 115 tests across 26 test files, 97%+ source coverage |
| **MIT licensed** | Free for personal and commercial use |

---

## TypeScript

All return types are exported and ready to use:

```ts
import type {
  UseAsyncReturn,
  UseToggleReturn,
  UseLocalStorageReturn,
  UseCountdownReturn,
} from "hookstorm";
```

---

## Contributing

Contributions of all kinds are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feat/my-hook`
3. Make your changes and add tests
4. Open a pull request

When reporting a bug, please include the hook name, a minimal reproduction, and your React + TypeScript versions.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <a href="https://gokhangunduz.github.io/hookstorm">Documentation</a>
  &nbsp;·&nbsp;
  <a href="https://www.npmjs.com/package/hookstorm">npm</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/gokhangunduz/hookstorm/issues">Issues</a>
</p>

<p align="center">
  <sub>Made with ❤️ in Ankara</sub>
</p>
