---
sidebar_position: 1
---

# useToggle

The `useToggle` hook is a custom React hook used to manage a boolean state. This hook allows you to toggle your state (turning it on and off) and set the initial value of the state.

## Usage

### Installation

You can import the `useToggle` hook from the `hookstorm` package like this:

```typescript
import { useToggle } from "hookstorm";
```

### Parameters

- **initialValue**: (optional) A boolean representing the initial state. The default value is `false`.

### Return Values

The `useToggle` hook returns the following object:

- **value**: A boolean representing the current state value.
- **toggle**: A function that toggles the state value. It can accept an optional new value. If no new value is provided, it will toggle the current state.

### Example Usage

The following example shows how to use the `useToggle` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useToggle } from "hookstorm";

export default function ToggleComponent(): ReactElement {
  const { value, toggle } = useToggle();

  return (
    <div>
      <p>Status: {value ? "On" : "Off"}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => toggle(true)}>On</button>
      <button onClick={() => toggle(false)}>Off</button>
    </div>
  );
}
```

### Explanation

In the example above, the `ToggleComponent` works as follows:

- The `useToggle` hook is called, and the `value` and `toggle` function are obtained.
- A text element displays the current status (on or off).
- When the user clicks the "Toggle" button, the state value is toggled.
- When the "On" or "Off" buttons are clicked, the state is set directly to the specified value.

## Conclusion

`useToggle` is a simple and effective hook that makes it easier to manage boolean states. You can use it to handle state changes in your projects.
