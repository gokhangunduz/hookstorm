---
sidebar_position: 3
---

# useMousePosition

The `useMousePosition` hook tracks the user's mouse position.

## Usage

### Installation

```typescript
import { useMousePosition } from "hookstorm";
```

### Return Values

- **x**: The x-coordinate of the mouse.
- **y**: The y-coordinate of the mouse.

### Example Usage

```typescript
import { ReactElement } from "react";
import { useMousePosition } from "hookstorm";

export default function MouseComponent(): ReactElement {
  const { x, y } = useMousePosition();

  return (
    <p>
      Mouse Position: {x}, {y}
    </p>
  );
}
```

### Explanation

In the example above:

- The `useMousePosition` hook listens for `mousemove` events on the window and updates `x` and `y` coordinates in real time.
- Both values start at `0` and update whenever the user moves the mouse.

## Conclusion

`useMousePosition` provides a straightforward way to track cursor coordinates, making it easy to build interactive UI elements that follow or react to the mouse pointer.
