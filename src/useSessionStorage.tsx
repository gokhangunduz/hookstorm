import { useState } from "react";

interface IuseSessionStorage<T> {
  value: T | null;
  setValue: (value: T) => void;
  removeValue: () => void;
}

/**
 * A custom hook to manage a state with sessionStorage.
 *
 * @param key - The key in sessionStorage to store the value under.
 * @param initialValue - The initial value to use if no value is found in sessionStorage.
 *
 * @returns An object containing:
 * - value: The current value from sessionStorage (or initialValue).
 * - setValue: A function to update the value in sessionStorage.
 * - removeValue: A function to remove the value from sessionStorage.
 *
 * @example
 * const { value, setValue, removeValue } = useSessionStorage<string>("myKey", "initialValue");
 *
 * return (
 *   <div>
 *     <p>Stored value: {value}</p>
 *     <button onClick={() => setValue("newValue")}>Set New Value</button>
 *     <button onClick={removeValue}>Remove Value</button>
 *   </div>
 * );
 */
const useSessionStorage = <T,>(
  key: string,
  initialValue: T
): IuseSessionStorage<T> => {
  const [value, setValue] = useState<T | null>(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  function updateValue(newValue: T): void {
    setValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  }

  function removeValue(): void {
    setValue(null);
    sessionStorage.removeItem(key);
  }

  return { value, setValue: updateValue, removeValue };
};

export default useSessionStorage;
