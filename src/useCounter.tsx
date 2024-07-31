import { useState } from "react";

interface IuseCounter {
  count: number;
  increment: (amount?: number) => void;
  decrement: (amount?: number) => void;
  reset: () => void;
}

/**
 * A custom hook to manage a counter state with increment, decrement, and reset functionalities.
 *
 * @param initialValue - The initial value of the counter (default is 0).
 *
 * @returns An object containing:
 * - count: The current count value.
 * - increment: A function to increase the count by a specified amount (default is 1).
 * - decrement: A function to decrease the count by a specified amount (default is 1).
 * - reset: A function to reset the count to the initial value.
 *
 * @example
 * // Usage example within a component
 * const { count, increment, decrement, reset } = useCounter(10);
 *
 * return (
 *   <div>
 *     <p>Count: {count}</p>
 *     <button onClick={() => increment(2)}>Increment +2</button>
 *     <button onClick={() => decrement(3)}>Decrement -3</button>
 *     <button onClick={reset}>Reset</button>
 *   </div>
 * );
 */
const useCounter = (initialValue?: number): IuseCounter => {
  const [count, setCount] = useState<number>(initialValue || 0);

  function increment(amount?: number): void {
    setCount((prev) => prev + (amount || 1));
  }

  function decrement(amount?: number): void {
    setCount((prev) => prev - (amount || 1));
  }

  function reset(): void {
    setCount(initialValue || 0);
  }

  return { count, increment, decrement, reset };
};

export default useCounter;
