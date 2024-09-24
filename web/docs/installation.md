---
sidebar_position: 1
---

# Installation

To use the `hookstorm` package, follow the installation instructions below for your project.

## Installation

You can install the `hookstorm` package from the npm registry using either npm or yarn.

### Using npm

Run the following command in your terminal:

```bash
npm install hookstorm
```

### Using yarn

Alternatively, you can use yarn to install the package:

```bash
yarn add hookstorm
```

## Features

- **useCookie**: Manage cookies with ease.
- **useCopyToClipboard**: Copy text to the clipboard and handle copy events.
- **useCountDown**: Implement countdown timers with configurable intervals.
- **useCounter**: Create counters with easy increment and decrement functionality.
- **useDocumentTitle**: Update the document title dynamically.
- **useHover**: Detect hover states on elements.
- **useKeyPress**: Detect key press events.
- **useLocalStorage**: Manage local storage with hooks.
- **useLockScroll**: Lock or unlock scroll on elements or the entire page.
- **usePrefersTheme**: Detect user’s preferred theme ('dark' or 'light').
- **usePrevious**: Access previous state or props values.
- **useScrollPosition**: Track and manage scroll position.
- **useSessionStorage**: Manage session storage with hooks.
- **useToggle**: Toggle between true and false states.
- **useWindowSize**: Track window size changes.

## Importing Hooks

Once installed, you can import the hooks from the `hookstorm` package into your React components. For example:

```typescript
import { useCounter, useDocumentTitle, useKeyPress } from "hookstorm";
```

## Example

Here's a quick example of how to use a hook from the `hookstorm` package:

```typescript
import { useCounter } from "hookstorm";
import React from "react";

const CounterComponent: React.FC = () => {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => increment(2)}>Increment +2</button>
      <button onClick={() => decrement(3)}>Decrement -3</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default CounterComponent;
```

## Notes

- Ensure that your React version is compatible with the `hookstorm` package requirements.
- For more detailed documentation on each hook, refer to the [Hooks Documentation](#) (link to your hooks documentation if available).

## Conclusion

The `hookstorm` package provides a set of useful custom hooks to enhance your React applications. Install it today to start leveraging its powerful functionality in your projects.
