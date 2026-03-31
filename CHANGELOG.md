# Changelog

All notable changes to this project will be documented in this file.

See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

---

## [1.0.0] — 2026-03-31

First stable release. This version introduces a complete overhaul of the library's quality, tooling, and hook correctness.

### New Hooks

- **`useAsync`** — manage async function lifecycle with data, loading, error, and execute
- **`useInterval`** — declarative `setInterval` with pause support via `null` delay
- **`useTimeout`** — declarative `setTimeout` with `reset` and `clear` API
- **`useMounted`** — ref-based mount guard for safe async state updates

### Bug Fixes

- **`useCountdown`** — fixed interval constantly resetting due to `timeLeft` in dependency array; now uses ref-based active tracking
- **`useLockScroll`** — fixed race condition when multiple components use the hook simultaneously; replaced with module-level reference counter
- **`useLocalStorage`** / **`useSessionStorage`** — wrapped all JSON operations in `try/catch` to prevent crashes on malformed data
- **`useCookie`** — full RFC 6265 compliance; values and keys are `encodeURIComponent`/`decodeURIComponent` encoded; handles `=` in values correctly
- **`useCopyToClipboard`** — fixed memory leak where `setTimeout` could call `setState` after component unmount
- **`useMousePosition`** / **`useScrollPosition`** — added `requestAnimationFrame` throttling to prevent excessive re-renders
- **`useIdle`** — fixed listener flood caused by inline default events array creating a new reference on every render
- **`useGeoLocation`** — added unmount cancellation flag and `enableHighAccuracy`, `timeout`, `maximumAge` options; added `loading` state
- **`useWindowSize`** / **`useScrollPosition`** / **`useDocumentTitle`** — added SSR safety guards (`typeof window !== "undefined"`)
- **`useClickOutside`** — added `focusin` event listener for keyboard and screen reader accessibility
- **`useKeyPress`** — added case-insensitive key matching

### Improvements

- **Interface naming** — all `IuseX` interfaces renamed to `UseXReturn` / `UseXReturn<T>` and exported from the package root; consumers can now `import type { UseToggleReturn } from "hookstorm"`
- **`tsconfig.json`** — updated `jsx` from `"react"` to `"react-jsx"` (modern transform, no `import React` needed)
- **`package.json`** — added `peerDependencies` (React ≥18), `sideEffects: false`, `exports` field, `description`, and `keywords`
- **`index.ts`** — fixed two case-sensitivity bugs that would break builds on Linux CI (`useCountDown` → `useCountdown`, `useGeolocation` → `useGeoLocation`)

### Tooling

- **ESLint 9** — flat config (`eslint.config.mjs`) with `@typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-config-prettier`
- **Prettier** — added `.prettierrc`
- **Vitest** — full test suite with `jsdom` environment; 115 tests across 26 files, 97%+ source coverage
- **`.npmignore`** — excludes `src/`, `web/`, `.github/`, config files, and test files from published package
- **`release-it`** — added `.release-it.json` and `CHANGELOG.md` for automated release management
- **CI** — added `validate` job (lint → test → build) that must pass before any publish job runs; updated to `actions/setup-node@v4`, pinned `node-version: 20`

### Docs

- Migrated docs site from Vercel to GitHub Pages (`https://gokhangunduz.github.io/hookstorm`)
- Added `deploy-pages.yml` workflow for automatic deployment on push to `main`
- Redesigned Docusaurus theme with dark/light mode support
- Added About and Contact pages to sidebar
- Added new logo with dark mode variant (`logo.dark.svg`) and SVG favicon
- Updated README with full hook list, TypeScript types section, and usage examples

---

## [0.0.33] — prior

See [GitHub releases](https://github.com/gokhangunduz/hookstorm/releases) for earlier versions.
