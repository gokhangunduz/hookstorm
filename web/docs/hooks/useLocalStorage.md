---
sidebar_position: 3
---

# useLocalStorage

The `useLocalStorage` hook is a custom React hook for managing a state with `localStorage`. It simplifies storing, retrieving, and removing values from `localStorage`, making it easier to persist state across sessions.

## Usage

### Installation

You can import the `useLocalStorage` hook from the `hookstorm` package like this:

```typescript
import { useLocalStorage } from "hookstorm";
```

### Parameters

- **key**: The key in `localStorage` to store the value under.
- **initialValue**: The initial value to use if no value is found in `localStorage`.

### Return Values

The `useLocalStorage` hook returns the following object:

- **value**: The current value from `localStorage` (or `initialValue`).
- **setValue**: A function to update the value in `localStorage`.
- **removeValue**: A function to remove the value from `localStorage`.

### Example Usage

The following example demonstrates how to use the `useLocalStorage` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useLocalStorage } from "hookstorm";

export default function LocalStorageComponent(): ReactElement {
  const { value, setValue, removeValue } = useLocalStorage<string>(
    "myKey",
    "initialValue"
  );

  return (
    <div>
      <p>Stored value: {value}</p>
      <button onClick={() => setValue("newValue")}>Set New Value</button>
      <button onClick={removeValue}>Remove Value</button>
    </div>
  );
}
```

### Explanation

In the example above:

- The `useLocalStorage` hook is used to manage a value in `localStorage` with a key of `"myKey"`.
- The `value` variable contains the current value from `localStorage` or the `initialValue`.
- The `setValue` function updates the `localStorage` with a new value and updates the state.
- The `removeValue` function removes the value from `localStorage` and resets the state to `null`.
- The component provides buttons to set a new value and remove the stored value, with the current value displayed.

## Conclusion

`useLocalStorage` is a convenient hook for managing state that persists across browser sessions, ideal for use cases where you need to maintain data between page reloads.
