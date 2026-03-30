---
sidebar_position: 3
---

# useIdle

The `useIdle` hook detects if the user has been inactive for a specified duration.

## Usage

### Installation

You can import the `useIdle` hook from the `hookstorm` package like this:

```typescript
import { useIdle } from "hookstorm";
```

### Parameters

- **timeout**: (optional) The duration in milliseconds after which the user is considered idle. Defaults to `60000` (1 minute).
- **events**: (optional) An array of DOM event names that reset the idle timer. Defaults to `["mousemove", "keydown", "click", "scroll", "touchstart"]`.

### Return Values

- **isIdle**: A boolean indicating whether the user is currently idle.
- **resetIdle**: A function to manually reset the idle state.

### Example Usage

```typescript
import { ReactElement } from "react";
import { useIdle } from "hookstorm";

export default function IdleComponent(): ReactElement {
  const { isIdle, resetIdle } = useIdle(60000);

  return (
    <div>
      <p>{isIdle ? "User is idle 💤" : "User is active 🏃"}</p>
      <button onClick={resetIdle}>Reset Idle</button>
    </div>
  );
}
```

### Explanation

In the example above:

- The `useIdle` hook listens to user events and resets an inactivity timer.
- After the specified `timeout` period, it sets `isIdle` to `true`.
- You can manually call `resetIdle()` to reset the idle state.

## Conclusion

`useIdle` is a practical hook for detecting user inactivity, useful for session timeouts, screensavers, or any feature that should trigger after a period of no interaction.
