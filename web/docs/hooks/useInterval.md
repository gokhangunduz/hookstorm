---
sidebar_position: 20
---

# useInterval

The `useInterval` hook is a declarative wrapper around `setInterval`. The callback is always kept fresh — updating it does not restart the interval. Pass `null` as the delay to pause the interval.

## Usage

### Installation

```typescript
import { useInterval } from "hookstorm";
```

### Parameters

- **callback** — The function to call on each tick.
- **delay** — The interval delay in milliseconds, or `null` to pause.

### Example Usage

```typescript
import { useState, ReactElement } from "react";
import { useInterval } from "hookstorm";

export default function Counter(): ReactElement {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(true);

  useInterval(() => setCount((c) => c + 1), running ? 1000 : null);

  return (
    <div>
      <p>Tick: {count}</p>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? "Pause" : "Resume"}
      </button>
    </div>
  );
}
```

## Notes

- Changing `callback` does not restart the interval — only `delay` changes restart it.
- Set `delay` to `null` to pause; restore a number value to resume.
