import { useState, useEffect, useCallback } from "react";

export interface UseKeyPressReturn {
  key: string;
  isPressed: boolean;
}

/**
 * A custom hook to track if a specific key is currently pressed.
 * Key matching is case-insensitive (e.g., "enter" and "Enter" both work).
 *
 * @param targetKey - The key to track (e.g., "Enter", "Escape", "a").
 *
 * @returns An object containing:
 * - key: The normalized key that is being tracked.
 * - isPressed: A boolean indicating whether the key is currently pressed.
 *
 * @example
 * const { isPressed } = useKeyPress("Enter");
 *
 * return (
 *   <div>
 *     <p>Enter key is {isPressed ? "pressed" : "not pressed"}</p>
 *   </div>
 * );
 */
const useKeyPress = (targetKey: string): UseKeyPressReturn => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const normalizedKey = targetKey.toLowerCase();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key.toLowerCase() === normalizedKey) setIsPressed(true);
    },
    [normalizedKey]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key.toLowerCase() === normalizedKey) setIsPressed(false);
    },
    [normalizedKey]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return { key: targetKey, isPressed };
};

export default useKeyPress;
