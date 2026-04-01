---
sidebar_position: 24
---

# useMediaQuery

The `useMediaQuery` hook tracks whether a CSS media query currently matches and updates reactively when the match status changes.

## Usage

### Installation

```typescript
import { useMediaQuery } from "hookstorm";
```

### Parameters

- **query** — A valid CSS media query string (e.g. `"(min-width: 768px)"`).

### Return Values

Returns a `boolean` — `true` if the media query matches, `false` otherwise.

### Example Usage

```typescript
import { ReactElement } from "react";
import { useMediaQuery } from "hookstorm";

export default function Layout(): ReactElement {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div className={prefersDark ? "dark" : "light"}>
      {isDesktop ? <DesktopNav /> : <MobileNav />}
    </div>
  );
}
```

## Notes

- SSR-safe: returns `false` on the server where `window` is unavailable.
- Use `usePrefersTheme` instead if you only need dark/light mode detection — it provides a more semantic API for that specific case.
- Multiple calls with the same query string do not share a single `matchMedia` instance — each hook instance manages its own listener.
