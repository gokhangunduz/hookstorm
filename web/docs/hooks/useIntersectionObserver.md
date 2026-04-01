---
sidebar_position: 23
---

# useIntersectionObserver

The `useIntersectionObserver` hook detects whether an element is visible within the viewport (or a custom scroll container) using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Useful for lazy loading, infinite scroll, and scroll-triggered animations.

## Usage

### Installation

```typescript
import { useIntersectionObserver } from "hookstorm";
```

### Parameters

- **target** — A ref pointing to the element to observe.
- **options** _(optional)_ — Intersection observer configuration:
  - `root` — The scroll container to observe within (default: viewport).
  - `rootMargin` — Margin around the root (default: `"0px"`).
  - `threshold` — Visibility ratio threshold to trigger (default: `0`).

### Return Values

| Property | Type | Description |
| --- | --- | --- |
| `isIntersecting` | `boolean` | `true` while the element is within the root. |
| `entry` | `IntersectionObserverEntry \| null` | The latest observer entry, or `null` before first observation. |

### Example Usage

```typescript
import { useRef, ReactElement } from "react";
import { useIntersectionObserver } from "hookstorm";

export default function LazyImage(): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <div ref={ref} style={{ minHeight: 200 }}>
      {isIntersecting ? (
        <img src="/heavy-image.jpg" alt="Loaded when visible" />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
```

## Notes

- The observer is automatically disconnected on component unmount.
- If `target.current` is `null` when the effect runs, no observer is created.
- To trigger at a specific scroll depth, combine `rootMargin` with a negative value (e.g. `"-100px"`).
