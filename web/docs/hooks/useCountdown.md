---
sidebar_position: 3
---

# useCountdown

The `useCountdown` hook provides functionality for managing a countdown timer with customizable interval and optional automatic stop time.

## Usage

### Installation

You can import the `useCountdown` hook from the `hookstorm` package like this:

```typescript
import { useCountdown } from "hookstorm";
```

### Parameters

- **startTime**: The total countdown time in seconds (e.g., `60`).
- **interval**: The interval duration in seconds (e.g., `1` for 1 second).
- **stopTime**: (optional) The value at which the countdown should stop automatically (e.g., `10`).

### Return Values

The `useCountdown` hook returns the following object:

- **timeLeft**: The remaining time in seconds.
- **start**: A function to start or resume the countdown.
- **stop**: A function to stop the countdown.
- **reset**: A function to reset the countdown to the total start time.

### Example Usage

The following example demonstrates how to use the `useCountdown` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useCountdown } from "hookstorm";

export default function CountdownComponent(): ReactElement {
  const { timeLeft, start, stop, reset } = useCountdown(60, 1, 10);

  return (
    <div>
      <p>Time Left: {timeLeft} seconds</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Explanation

In the example above:

- The `useCountdown` hook is initialized with a total countdown time of `60` seconds, an interval of `1` second, and an optional stop time of `10` seconds.
- The `timeLeft` variable holds the remaining time in seconds.
- The `start` function begins or resumes the countdown.
- The `stop` function halts the countdown.
- The `reset` function returns the countdown to the initial `60` seconds.

## Conclusion

`useCountdown` provides a flexible solution for managing countdown timers in React applications, allowing for automatic stopping and customizable intervals.
