---
sidebar_position: 3
---

# useScrollPosition

The `useScrollPosition` hook is a custom React hook used to get the current scroll position of the window. It provides the horizontal and vertical scroll positions, updating them in response to scroll events.

## Usage

### Installation

You can import the `useScrollPosition` hook from the `hookstorm` package like this:

```typescript
import { useScrollPosition } from "hookstorm";
```

### Parameters

The `useScrollPosition` hook does not accept any parameters.

### Return Values

The `useScrollPosition` hook returns the following object:

- **scrollX**: The current horizontal scroll position of the window.
- **scrollY**: The current vertical scroll position of the window.

### Example Usage

The following example demonstrates how to use the `useScrollPosition` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useScrollPosition } from "hookstorm";

export default function ScrollPositionComponent(): ReactElement {
  const { scrollX, scrollY } = useScrollPosition();

  return (
    <div>
      <p>Scroll X: {scrollX}</p>
      <p>Scroll Y: {scrollY}</p>
    </div>
  );
}
```

### Explanation

In the example above:

- The `useScrollPosition` hook is used to retrieve the current scroll position of the window.
- The hook updates the `scrollX` and `scrollY` values as the user scrolls.
- The component displays the current horizontal and vertical scroll positions.

## Conclusion

`useScrollPosition` is a useful hook for tracking the current scroll position of the window, making it easy to implement features that respond to scrolling events.
