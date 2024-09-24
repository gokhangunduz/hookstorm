---
sidebar_position: 3
---

# useScrollLock

The `useScrollLock` hook is a custom React hook used to manage the scroll lock state on the document body. It provides an easy way to lock or unlock scrolling, which can be useful for modals, dialogs, or any scenario where you need to control the scrolling behavior.

## Usage

### Installation

You can import the `useScrollLock` hook from the `hookstorm` package like this:

```typescript
import { useScrollLock } from "hookstorm";
```

### Parameters

- **initialLock**: (optional) A boolean representing the initial scroll lock state. Defaults to `false`.

### Return Values

The `useScrollLock` hook returns the following object:

- **isLocked**: A boolean indicating whether the scroll is currently locked.
- **toggleScrollLock**: A function to toggle the scroll lock state. If a value is provided, it sets the state to that value.

### Example Usage

The following example demonstrates how to use the `useScrollLock` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useScrollLock } from "hookstorm";

export default function ScrollLockComponent(): ReactElement {
  const { isLocked, toggleScrollLock } = useScrollLock();

  return (
    <div>
      <button onClick={() => toggleScrollLock(true)}>Lock Scroll</button>
      <button onClick={() => toggleScrollLock(false)}>Unlock Scroll</button>
      <p>Scroll is {isLocked ? "locked" : "unlocked"}</p>
    </div>
  );
}
```

### Explanation

In the example above:

- The `useScrollLock` hook is used to manage the scroll lock state of the document body.
- The `isLocked` variable indicates whether the scroll is locked or not.
- The `toggleScrollLock` function allows you to lock or unlock scrolling based on the value passed or by toggling the current state.
- The component displays buttons to lock or unlock the scroll, and a message showing the current scroll lock state.

## Conclusion

`useScrollLock` is a practical hook for controlling the scroll behavior of your application, especially when you need to manage scrolling during modal displays or other focused interactions.
