---
sidebar_position: 26
---

# useResizeObserver

The `useResizeObserver` hook tracks the dimensions of a DOM element using the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver). Updates reactively whenever the element is resized.

## Usage

### Installation

```typescript
import { useResizeObserver } from "hookstorm";
```

### Parameters

- **target** — A ref pointing to the element to observe.

### Return Values

| Property | Type | Description |
| --- | --- | --- |
| `width` | `number` | Current content width of the element in pixels. |
| `height` | `number` | Current content height of the element in pixels. |
| `entry` | `ResizeObserverEntry \| null` | The latest observer entry, or `null` before first observation. |

### Example Usage

```typescript
import { useRef, ReactElement } from "react";
import { useResizeObserver } from "hookstorm";

export default function ResizablePanel(): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver(ref);

  return (
    <div ref={ref} style={{ resize: "both", overflow: "auto", minWidth: 100 }}>
      <p>
        {width.toFixed(0)} × {height.toFixed(0)} px
      </p>
    </div>
  );
}
```

## Notes

- The observer is automatically disconnected on component unmount.
- If `target.current` is `null` when the effect runs, no observer is created.
- `width` and `height` reflect the element's `contentRect`, which excludes padding and border.
