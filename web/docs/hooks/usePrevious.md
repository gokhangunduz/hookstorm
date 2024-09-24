---
sidebar_position: 3
---

# usePrevious

The `usePrevious` hook is a custom React hook used to store and retrieve the previous value of a given value. It allows you to access the value from the previous render of a component.

## Usage

### Installation

You can import the `usePrevious` hook from the `hookstorm` package like this:

```typescript
import { usePrevious } from "hookstorm";
```

### Parameters

- **value**: The current value to track the previous value of.

### Return Values

The `usePrevious` hook returns the previous value of the given `value`. If there is no previous value (e.g., on the initial render), it returns `undefined`.

### Example Usage

The following example demonstrates how to use the `usePrevious` hook within a functional component:

```typescript
import { ReactElement, useState } from "react";
import { usePrevious } from "hookstorm";

export default function PreviousValueComponent(): ReactElement {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current count: {count}</p>
      <p>Previous count: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Explanation

In the example above:

- The `usePrevious` hook is used to track the previous value of the `count` state.
- The `prevCount` variable stores the value of `count` from the previous render.
- The component displays both the current and previous values of `count`, and updates them when the button is clicked.

## Conclusion

`usePrevious` is a handy hook for accessing the previous value of a state or prop, which can be useful for implementing certain logic that depends on the previous value.
