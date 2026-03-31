---
sidebar_position: 2
---

# Changelog

All notable changes to Hookstorm are documented here.

---

## v1.0.1 — 2026-03-31

### Maintenance

- Updated devDependencies to latest stable: `@typescript-eslint/*` 8.58, `vitest` + `@vitest/coverage-v8` 4.x, `eslint-plugin-react-hooks` 7.x, `jsdom` 29.x, `release-it` 19.x
- Disabled new `react-hooks/refs` and `react-hooks/set-state-in-effect` rules (v7) — patterns are intentional and documented
- Fixed `vitest.config.ts` include pattern to prevent `dist/` test file false positives in vitest 4
- Fixed `usePrefersTheme` test to use `vi.stubGlobal` for jsdom 29 compatibility

---

## v1.0.0 — 2026-03-31

First stable release. This version introduces a complete overhaul of the library's quality, tooling, and hook correctness.

### New Hooks

| Hook | Description |
|------|-------------|
| [`useAsync`](/docs/hooks/useAsync) | Manage async function lifecycle with `data`, `loading`, `error`, and `execute` |
| [`useInterval`](/docs/hooks/useInterval) | Declarative `setInterval` with pause support via `null` delay |
| [`useTimeout`](/docs/hooks/useTimeout) | Declarative `setTimeout` with `reset` and `clear` API |
| [`useMounted`](/docs/hooks/useMounted) | Ref-based mount guard for safe async state updates |

### Bug Fixes

| Hook | Fix |
|------|-----|
| `useCountdown` | Fixed interval constantly resetting due to `timeLeft` in dependency array; now uses ref-based active tracking |
| `useLockScroll` | Fixed race condition when multiple components use the hook simultaneously; replaced with module-level reference counter |
| `useLocalStorage` / `useSessionStorage` | Wrapped all JSON operations in `try/catch` to prevent crashes on malformed data |
| `useCookie` | Full RFC 6265 compliance; values and keys are URL-encoded; handles `=` in values correctly |
| `useCopyToClipboard` | Fixed memory leak where `setTimeout` could call `setState` after component unmount |
| `useMousePosition` / `useScrollPosition` | Added `requestAnimationFrame` throttling to prevent excessive re-renders |
| `useIdle` | Fixed listener flood caused by inline default events array creating a new reference on every render |
| `useGeoLocation` | Added unmount cancellation flag and `enableHighAccuracy`, `timeout`, `maximumAge` options; added `loading` state |
| `useWindowSize` / `useScrollPosition` / `useDocumentTitle` | Added SSR safety guards (`typeof window !== "undefined"`) |
| `useClickOutside` | Added `focusin` event listener for keyboard and screen reader accessibility |
| `useKeyPress` | Added case-insensitive key matching |

### Improvements

- **Interface naming** — all `IuseX` interfaces renamed to `UseXReturn` and exported from the package root
- **`tsconfig.json`** — updated `jsx` from `"react"` to `"react-jsx"` (no `import React` needed)
- **`package.json`** — added `peerDependencies` (React ≥ 18), `sideEffects: false`, `exports` field, `description`, and `keywords`
- **`index.ts`** — fixed two case-sensitivity bugs that would break builds on Linux CI

### Tooling

- **ESLint 9** — flat config (`eslint.config.mjs`) with `@typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-config-prettier`
- **Prettier** — added `.prettierrc`
- **Vitest** — full test suite with `jsdom` environment; 115 tests across 26 files, 97%+ source coverage
- **`.npmignore`** — excludes `src/`, `web/`, `.github/`, config files, and test files from the published package
- **`release-it`** — added `.release-it.json` and `CHANGELOG.md` for automated release management
- **CI** — added `validate` job (lint → test → build) that must pass before any publish job runs

### Docs

- Migrated from Vercel to GitHub Pages (`https://gokhangunduz.github.io/hookstorm`)
- Added `deploy-pages.yml` workflow for automatic deployment on push to `main`
- Redesigned Docusaurus theme with dark/light mode support
- Added new logo with dark mode variant and SVG favicon
- Updated README with full hook list, TypeScript types section, and usage examples

---

## v0.0.33 and earlier

See [GitHub Releases](https://github.com/gokhangunduz/hookstorm/releases) for older versions.
