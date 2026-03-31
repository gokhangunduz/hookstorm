---
sidebar_position: 21
---

# useTimeout

The `useTimeout` hook fires a callback once after a delay. It exposes `reset` to restart the timer and `clear` to cancel it. The timer is automatically cleared on unmount.

## Usage

### Installation

```typescript
import { useTimeout } from "hookstorm";
```

### Parameters

- **callback** — The function to call after the delay.
- **delay** — The timeout delay in milliseconds.

### Return Values

- **reset** — Restart the timer from scratch.
- **clear** — Cancel the pending timer.

### Example Usage

```typescript
import { useState, ReactElement } from "react";
import { useTimeout } from "hookstorm";

export default function Toast(): ReactElement {
  const [visible, setVisible] = useState(true);

  const { reset, clear } = useTimeout(() => setVisible(false), 3000);

  if (!visible) return <p>Toast dismissed.</p>;

  return (
    <div>
      <p>This will disappear in 3 seconds.</p>
      <button onClick={reset}>Restart timer</button>
      <button onClick={clear}>Dismiss now</button>
    </div>
  );
}
```

## Notes

- Changing `callback` does not restart the timer — only `delay` changes restart it.
- The timer is automatically cleared when the component unmounts.
