---
sidebar_position: 3
---

# useClickOutside

The `useClickOutside` hook detects clicks outside of a referenced element and triggers a callback function.

## Usage

### Installation

You can import the `useClickOutside` hook from the `hookstorm` package like this:

```typescript
import { useClickOutside } from "hookstorm";
```

### Return Values

The `useClickOutside` hook returns the following object:

- **ref**: A reference to attach to the target element.
- **isOutside**: A boolean indicating whether the last click was outside the element.

### Example Usage

The following example demonstrates how to use the `useClickOutside` hook within a functional component:

```typescript
import { ReactElement, useState } from "react";
import { useClickOutside } from "hookstorm";

export default function Dropdown(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, isOutside } = useClickOutside(() => setIsOpen(false));

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Dropdown</button>
      {isOpen && (
        <div ref={ref}>
          <p>{isOutside ? "Clicked outside" : "Inside"}</p>
          <p>Dropdown content here...</p>
        </div>
      )}
    </div>
  );
}
```

### Explanation

In the example above:

- The `useClickOutside` hook is used to close a dropdown when a user clicks outside of it.
- The `ref` is attached to the dropdown element.
- The `isOutside` boolean indicates whether the last click was outside the dropdown.

## Conclusion

`useClickOutside` is a simple and effective way to handle interactions outside of an element, such as closing modals, dropdowns, or tooltips.
