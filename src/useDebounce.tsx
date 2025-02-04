import { useEffect, useState } from "react";

/**
 * A custom hook to debounce a value.
 *
 * @param value - The input value to debounce.
 * @param delay - The debounce delay in milliseconds.
 *
 * @returns The debounced value.
 *
 * @example
 * const debouncedValue = useDebounce(searchTerm, 500);
 */
const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
