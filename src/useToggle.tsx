import { useState } from "react";

interface IuseToggle {
  value: boolean;
  toggle: (newValue?: boolean) => void;
}

/**
 * A custom hook to manage boolean state with a toggle function.
 *
 * @param initialValue - The initial state value (default is false).
 *
 * @returns An object containing:
 * - value: The current state value.
 * - toggle: A function to toggle the state value. If a new value is provided, it sets the state to that value.
 *
 * @example
 * // Usage example within a component
 * const { value, toggle } = useToggle();
 */
const useToggle = (initialValue: boolean = false): IuseToggle => {
  const [value, setToggle] = useState<boolean>(initialValue);

  /**
   * Toggles the state value. If a new value is provided, sets the state to that value.
   *
   * @param newValue - An optional new value to set the state.
   */
  function toggle(newValue?: boolean): void {
    setToggle((prev) => newValue ?? !prev);
  }

  return {
    value,
    toggle,
  };
};

export default useToggle;
