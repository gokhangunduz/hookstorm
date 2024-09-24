---
sidebar_position: 3
---

# useSessionStorage

The `useSessionStorage` hook is a custom React hook used to manage state with `sessionStorage`. It provides an easy interface to store, update, and remove data from `sessionStorage`, while keeping it in sync with your component state.

## Usage

### Installation

You can import the `useSessionStorage` hook from the `hookstorm` package like this:

```typescript
import { useSessionStorage } from "hookstorm";
```

### Parameters

- **key**: A string representing the key in `sessionStorage` to store the value under.
- **initialValue**: The initial value to use if no value is found in `sessionStorage`.

### Return Values

The `useSessionStorage` hook returns the following object:

- **value**: The current value from `sessionStorage` (or `initialValue` if nothing is stored).
- **setValue**: A function to update the value in `sessionStorage`. Takes a new value as an argument.
- **removeValue**: A function to remove the value from `sessionStorage`.

### Example Usage

The following example demonstrates how to use the `useSessionStorage` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useSessionStorage } from "hookstorm";

export default function SessionStorageComponent(): ReactElement {
  const { value, setValue, removeValue } = useSessionStorage<string>(
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

- The `useSessionStorage` hook is used to store a string in `sessionStorage` under the key `"myKey"`.
- The `value` is retrieved from `sessionStorage` and displayed.
- The user can set a new value or remove the current value from `sessionStorage` using the respective buttons.

## Conclusion

`useSessionStorage` simplifies working with `sessionStorage` in your React components by keeping your state and `sessionStorage` data synchronized.
