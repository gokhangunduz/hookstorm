import { useState } from "react";

const useCounter = (initialValue?: number) => {
  const [count, setCount] = useState(initialValue || 0);

  const increment = (amount: number = 1) => setCount((prev) => prev + amount);
  const decrement = (amount: number = 1) => setCount((prev) => prev - amount);
  const reset = () => setCount(initialValue || 0);

  return { count, increment, decrement, reset };
};

export default useCounter;
