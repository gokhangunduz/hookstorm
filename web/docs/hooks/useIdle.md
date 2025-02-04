---
sidebar_position: 3
---

# useIdle

The `useIdle` hook detects if the user has been inactive for a specified duration.

## Usage

### Installation

```typescript
import { useIdle } from "hookstorm";
```

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

- The `useIdle` hook listens to user events and resets an inactivity timer.
- After the specified `timeout` period, it sets `isIdle` to `true`.
- You can manually call `resetIdle()` to reset the idle state.
