import { useState } from "react";

interface IuseCounter {
  count: number;
  increment: (amount?: number) => void;
  decrement: (amount?: number) => void;
  reset: () => void;
}

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
