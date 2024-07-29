import { useState } from "react";

/**
 * Custom hook to toggle a boolean value.
 *
 * @param initialValue - The initial state of the toggle, default is `false`.
 * @returns An object containing the current value and a function to toggle it.
 *
 * @example
 * // Usage in a React component
 * const MyComponent: React.FC = () => {
 *   const { value, handleToggle } = useToggle();
 *
 *   return (
 *     <div>
 *       <p>Current value: {value ? "On" : "Off"}</p>
 *       <button onClick={() => handleToggle()}>Toggle</button>
 *       <button onClick={() => handleToggle(true)}>Set On</button>
 *       <button onClick={() => handleToggle(false)}>Set Off</button>
 *     </div>
 *   );
 * };
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
