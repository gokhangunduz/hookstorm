---
sidebar_position: 3
---

# useHover

The `useHover` hook is a custom React hook designed to track if an element is being hovered over. It provides a simple way to manage hover states for elements in your components.

## Usage

### Installation

You can import the `useHover` hook from the `hookstorm` package like this:

```typescript
import { useHover } from "hookstorm";
```

### Return Values

The `useHover` hook returns the following object:

- **ref**: A React ref object to attach to the target element.
- **isHovered**: A boolean indicating whether the element is currently being hovered.

### Example Usage

The following example demonstrates how to use the `useHover` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useHover } from "hookstorm";

export default function HoverComponent(): ReactElement {
  const { ref, isHovered } = useHover();

  return <div ref={ref}>{isHovered ? "Hovered!" : "Not hovered"}</div>;
}
```

### Explanation

In the example above:

- The `useHover` hook is used to track hover state for a `div` element.
- The `ref` is attached to the `div`, allowing the hook to monitor mouse events on that element.
- The `isHovered` variable indicates whether the element is currently being hovered.
- The component displays a message based on the hover state of the `div`.

## Conclusion

`useHover` is a useful hook for managing hover interactions with elements, making it easier to implement hover-based UI effects in your React applications.
