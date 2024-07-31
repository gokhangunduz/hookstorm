import { useRef, useEffect } from "react";

/**
 * A custom hook to store the previous value of a given value.
 *
 * @param value - The current value to track the previous value of.
 *
 * @returns The previous value.
 *
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * return (
 *   <div>
 *     <p>Current count: {count}</p>
 *     <p>Previous count: {prevCount}</p>
 *     <button onClick={() => setCount(count + 1)}>Increment</button>
 *   </div>
 * );
 */
const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
