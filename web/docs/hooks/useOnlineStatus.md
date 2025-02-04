---
sidebar_position: 3
---

# useOnlineStatus

The `useOnlineStatus` hook tracks the user's internet connection status.

## Usage

### Installation

You can import the `useOnlineStatus` hook from the `hookstorm` package like this:

```typescript
import { useOnlineStatus } from "hookstorm";
```

### Return Values

The `useOnlineStatus` hook returns the following object:

- **isOnline**: A boolean indicating if the user is currently online.

### Example Usage

```typescript
import { ReactElement } from "react";
import { useOnlineStatus } from "hookstorm";

export default function NetworkStatus(): ReactElement {
  const { isOnline } = useOnlineStatus();

  return <p>{isOnline ? "You are online ✅" : "You are offline ❌"}</p>;
}
```

### Explanation

- The `useOnlineStatus` hook listens for `online` and `offline` events.
- When the internet connection changes, `isOnline` updates automatically.

## Conclusion

This hook is useful for handling cases where users go offline, such as pausing real-time updates or showing an offline message.
