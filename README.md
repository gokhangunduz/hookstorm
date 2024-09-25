
<p align="center">
  <img src="https://hookstorm.vercel.app/img/logo.svg" alt="Hookstorm Logo" width="256" height="256" />
</p>


# Hookstorm

`hookstorm` is a collection of customizable and reusable React hooks designed to simplify your development workflow. Whether you need to manage state, interact with the DOM, or handle complex logic, `hookstorm` provides a suite of hooks to help you build powerful and efficient React applications.

## Documentation

For detailed documentation on each hook, please refer to the [Documentation](https://hookstorm.vercel.app/).

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

## Installation

You can install `hookstorm` using npm or yarn:

```bash
npm install hookstorm
```

or

```bash
yarn add hookstorm
```

## Usage

To use a hook from hookstorm, simply import it into your component:

```tsx
import { useCounter, useWindowSize } from "hookstorm";

const MyComponent = () => {
  const { count, increment, decrement } = useCounter();
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <p>
        Window size: {width} x {height}
      </p>
    </div>
  );
};
```

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

## License

`hookstorm` is licensed under the MIT License. See [LICENSE](LICENSE) for more details.
