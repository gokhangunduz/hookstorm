import { useState, useEffect } from "react";

interface IuseKeyPress {
  key: string;
  isPressed: boolean;
}

/**
 * A custom hook to track if a specific key is currently pressed.
 *
 * @param targetKey - The key to track (e.g., "Enter", "Escape").
 *
 * @returns An object containing:
 * - key: The key that is being tracked.
 * - isPressed: A boolean indicating whether the key is currently pressed.
 *
 * @example
 * // Usage example within a component
 * const { isPressed } = useKeyPress("Enter");
 *
 * return (
 *   <div>
 *     <p>Enter key is {isPressed ? "pressed" : "not pressed"}</p>
 *   </div>
 * );
 */
const useKeyPress = (targetKey: string): IuseKeyPress => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === targetKey) {
      setIsPressed(true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent): void => {
    if (event.key === targetKey) {
      setIsPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [targetKey]);

  return { key: targetKey, isPressed };
};

export default useKeyPress;
