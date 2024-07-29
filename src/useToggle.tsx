import { useState } from "react";

/**
 * Custom hook to toggle a boolean value.
 *
 * @param initialValue - The initial state of the toggle, default is `false`.
 * @returns An object containing the current value and a function to toggle it.
 */
const useToggle = (initialValue: boolean = false) => {
  // State to hold the current value of the toggle
  const [value, setToggle] = useState<boolean>(initialValue);

  /**
   * Function to toggle the value.
   *
   * @param newValue - If provided, sets the toggle to this value. Otherwise, toggles the current value.
   */
  function handleToggle(newValue?: boolean): void {
    setToggle((prev) => newValue ?? !prev);
  }

  return {
    value,
    handleToggle,
  };
};

export default useToggle;
