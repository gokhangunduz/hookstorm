---
sidebar_position: 3
---

# usePageVisibility

The `usePageVisibility` hook allows you to detect when the user switches between browser tabs or minimizes the page.

## Usage

### Installation

You can import the `usePageVisibility` hook from the `hookstorm` package like this:

```typescript
import { usePageVisibility } from "hookstorm";
```

### Return Values

The `usePageVisibility` hook returns the following object:

- **isVisible**: A boolean indicating whether the page is currently visible (`true`) or hidden (`false`).

### Example Usage

The following example demonstrates how to use the `usePageVisibility` hook:

```typescript
import { ReactElement } from "react";
import { usePageVisibility } from "hookstorm";

export default function PageVisibilityComponent(): ReactElement {
  const { isVisible } = usePageVisibility();

  return <p>{isVisible ? "Tab is active" : "Tab is inactive"}</p>;
}
```

### Explanation

In the example above:

- The `usePageVisibility` hook detects whether the current browser tab is active.
- The `isVisible` state updates whenever the tab's visibility changes.
- The component conditionally renders based on whether the tab is visible.

## Conclusion

`usePageVisibility` is useful for optimizing background processes, pausing animations, or stopping API calls when the page is inactive.
