import { useEffect, useRef } from "react";

/**
 * A custom hook that calls a callback at a fixed interval.
 * The callback is always fresh — changing it does not restart the interval.
 * Pass `null` as the delay to pause the interval.
 *
 * @param callback - The function to call on each tick.
 * @param delay - The interval delay in milliseconds, or `null` to pause.
 *
 * @example
 * const [count, setCount] = useState(0);
 * useInterval(() => setCount((c) => c + 1), 1000);
 *
 * return <p>Tick: {count}</p>;
 */
const useInterval = (callback: () => void, delay: number | null): void => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (delay === null) return;

    const id = window.setInterval(() => callbackRef.current(), delay);
    return () => window.clearInterval(id);
  }, [delay]);
};

export default useInterval;
