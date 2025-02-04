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

- The `useMousePosition` hook listens for mouse movements and updates the coordinates.
