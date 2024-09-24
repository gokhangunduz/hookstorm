---
sidebar_position: 2
---

# useWindowSize

The `useWindowSize` hook is a custom React hook used to track the current window size. It listens for window resize events and provides the current width and height of the window.

## Usage

### Installation

You can import the `useWindowSize` hook from the `hookstorm` package like this:

```typescript
import { useWindowSize } from "hookstorm";
```

### Parameters

The `useWindowSize` hook does not accept any parameters.

### Return Values

The `useWindowSize` hook returns the following object:

- **width**: A number representing the current width of the window.
- **height**: A number representing the current height of the window.

### Example Usage

The following example demonstrates how to use the `useWindowSize` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useWindowSize } from "hookstorm";

export default function WindowSizeComponent(): ReactElement {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window width: {width}px</p>
      <p>Window height: {height}px</p>
    </div>
  );
}
```

### Explanation

In the example above, the `useWindowSize` hook is used to retrieve the current window dimensions, which are then displayed within the component. Whenever the window is resized, the hook updates the component with the new width and height values.

## Conclusion

`useWindowSize` is a useful hook for tracking window size changes in your React components. It provides a straightforward way to respond to resizing events.
