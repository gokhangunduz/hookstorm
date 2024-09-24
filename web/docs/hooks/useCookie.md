---
sidebar_position: 3
---

# useCookie

The `useCookie` hook manages cookies in a React application, allowing you to get, set, and remove cookies.

## Usage

### Installation

You can import the `useCookie` hook from the `hookstorm` package like this:

```typescript
import { useCookie } from "hookstorm";
```

### Return Values

The `useCookie` hook returns the following object:

- **value**: The current value of the cookie (or `initialValue` if the cookie is not found).
- **setValue**: A function to set the cookie value.
- **removeValue**: A function to remove the cookie.

### Cookie Options

The `CookieOptions` interface allows you to specify additional options for setting cookies:

- **expires**: Expiry time in days.
- **path**: The path for which the cookie is valid.

### Example Usage

The following example demonstrates how to use the `useCookie` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useCookie } from "hookstorm";

export default function CookieComponent(): ReactElement {
  const { value, setValue, removeValue } = useCookie(
    "myCookie",
    "initialValue"
  );

  return (
    <div>
      <p>Cookie value: {value}</p>
      <button onClick={() => setValue("newValue", { expires: 7 })}>
        Set New Value
      </button>
      <button onClick={() => removeValue()}>Remove Cookie</button>
    </div>
  );
}
```

### Explanation

In the example above:

- The `useCookie` hook is used to manage a cookie with the key `"myCookie"` and an initial value of `"initialValue"`.
- The `setValue` function is used to update the cookie value and optionally set its expiry.
- The `removeValue` function is used to delete the cookie.

## Conclusion

`useCookie` provides a simple and effective way to manage cookies in React applications, including setting expiry times and paths.
