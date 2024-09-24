---
sidebar_position: 3
---

# useCounter

The `useCounter` hook is a custom React hook designed to manage a counter state with functionalities for incrementing, decrementing, and resetting the counter.

## Usage

### Installation

You can import the `useCounter` hook from the `hookstorm` package like this:

```typescript
import { useCounter } from "hookstorm";
```

### Parameters

- **initialValue**: (optional) The initial value of the counter. The default is `0`.

### Return Values

The `useCounter` hook returns the following object:

- **count**: The current count value.
- **increment**: A function to increase the count by a specified amount. Defaults to `1` if no amount is provided.
- **decrement**: A function to decrease the count by a specified amount. Defaults to `1` if no amount is provided.
- **reset**: A function to reset the count to the initial value.

### Example Usage

The following example demonstrates how to use the `useCounter` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useCounter } from "hookstorm";

export default function CounterComponent(): ReactElement {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => increment(2)}>Increment +2</button>
      <button onClick={() => decrement(3)}>Decrement -3</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Explanation

In the example above:

- The `useCounter` hook is initialized with an initial value of `10`.
- The `count` variable holds the current count value.
- The `increment` function increases the count by `2` when the corresponding button is clicked.
- The `decrement` function decreases the count by `3` when the corresponding button is clicked.
- The `reset` function resets the count to the initial value of `10`.

## Conclusion

`useCounter` provides a straightforward way to manage and manipulate a counter state in your React applications, offering simple methods for updating and resetting the count.
