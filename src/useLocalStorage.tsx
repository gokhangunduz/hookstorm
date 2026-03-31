import { useState } from "react";

export interface UseLocalStorageReturn<T> {
  value: T | null;
  setValue: (value: T) => void;
  removeValue: () => void;
}

/**
 * A custom hook to manage a state with localStorage.
 *
 * @param key - The key in localStorage to store the value under.
 * @param initialValue - The initial value to use if no value is found in localStorage.
 *
 * @returns An object containing:
 * - value: The current value from localStorage (or initialValue).
 * - setValue: A function to update the value in localStorage.
 * - removeValue: A function to remove the value from localStorage.
 *
 * @example
 * const { value, setValue, removeValue } = useLocalStorage<string>("myKey", "initialValue");
 *
 * return (
 *   <div>
 *     <p>Stored value: {value}</p>
 *     <button onClick={() => setValue("newValue")}>Set New Value</button>
 *     <button onClick={removeValue}>Remove Value</button>
 *   </div>
 * );
 */
const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> => {
  const [value, setValue] = useState<T | null>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function updateValue(newValue: T): void {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch {
      // Storage might be full or access denied — state is still updated
    }
  }

  function removeValue(): void {
    try {
      setValue(null);
      localStorage.removeItem(key);
    } catch {
      // Ignore removal errors
    }
  }

  return { value, setValue: updateValue, removeValue };
};

export default useLocalStorage;
