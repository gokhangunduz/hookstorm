---
sidebar_position: 3
---

# useDebounce

The `useDebounce` hook delays the execution of a value update.

## Usage

### Installation

You can import the `useDebounce` hook from the `hookstorm` package like this:

```typescript
import { useDebounce } from "hookstorm";
```

### Parameters

- **value**: The input value to debounce. Can be any type.
- **delay**: (optional) The debounce delay in milliseconds. Defaults to `500`.

### Return Values

The `useDebounce` hook returns the debounced value of the same type as the input.

### Example Usage

The following example demonstrates how to use the `useDebounce` hook within a functional component:

```typescript
import { useState, ReactElement } from "react";
import { useDebounce } from "hookstorm";

export default function SearchComponent(): ReactElement {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      <p>Debounced value: {debouncedQuery}</p>
    </div>
  );
}
```

### Explanation

In the example above:

- The `useDebounce` hook delays updating `debouncedQuery` until 500ms after the user stops typing.
- This prevents expensive operations (e.g., API calls) from firing on every keystroke.

## Conclusion

`useDebounce` is a lightweight hook for throttling rapid value changes, making it ideal for search inputs, resize handlers, and any scenario where you want to wait for a pause before reacting to user input.
