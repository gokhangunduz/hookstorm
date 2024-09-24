---
sidebar_position: 3
---

# usePrefersTheme

The `usePrefersTheme` hook is a custom React hook used to determine if the user prefers a dark or light theme. It listens to the user's system preference for color scheme and updates accordingly.

## Usage

### Installation

You can import the `usePrefersTheme` hook from the `hookstorm` package like this:

```typescript
import { usePrefersTheme } from "hookstorm";
```

### Parameters

The `usePrefersTheme` hook does not accept any parameters.

### Return Values

The `usePrefersTheme` hook returns the following object:

- **theme**: A string indicating if the user prefers `"dark"` or `"light"` theme.

### Example Usage

The following example demonstrates how to use the `usePrefersTheme` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { usePrefersTheme } from "hookstorm";

export default function ThemeComponent(): ReactElement {
  const { theme } = usePrefersTheme();

  return (
    <div>
      {theme === "dark" ? (
        <p>Dark mode is preferred</p>
      ) : (
        <p>Light mode is preferred</p>
      )}
    </div>
  );
}
```

### Explanation

In the example above:

- The `usePrefersTheme` hook is used to determine the user's theme preference.
- The `theme` variable holds either `"dark"` or `"light"` based on the user's system settings.
- The component displays a message indicating whether dark or light mode is preferred.

## Conclusion

`usePrefersTheme` is a useful hook for adapting your application's theme to match the user's system preferences, providing a more personalized experience.
