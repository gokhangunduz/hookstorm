---
sidebar_position: 3
---

# useKeyPress

The `useKeyPress` hook is a custom React hook used to track if a specific key is currently pressed. It provides an easy way to handle keyboard interactions in your components.

## Usage

### Installation

You can import the `useKeyPress` hook from the `hookstorm` package like this:

```typescript
import { useKeyPress } from "hookstorm";
```

### Parameters

- **targetKey**: A string representing the key to track (e.g., `"Enter"`, `"Escape"`).

### Return Values

The `useKeyPress` hook returns the following object:

- **key**: The key that is being tracked.
- **isPressed**: A boolean indicating whether the key is currently pressed.

### Example Usage

The following example demonstrates how to use the `useKeyPress` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useKeyPress } from "hookstorm";

export default function KeyPressComponent(): ReactElement {
  const { isPressed } = useKeyPress("Enter");

  return (
    <div>
      <p>Enter key is {isPressed ? "pressed" : "not pressed"}</p>
    </div>
  );
}
```

### Explanation

In the example above:

- The `useKeyPress` hook is used to track if the `"Enter"` key is pressed.
- The `isPressed` variable indicates whether the key is currently pressed.
- The component displays a message showing the current state of the `"Enter"` key.

## Conclusion

`useKeyPress` is a useful hook for handling keyboard interactions, allowing you to easily monitor and respond to key presses in your React applications.
