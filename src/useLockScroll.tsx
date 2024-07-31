import { useState, useEffect } from "react";

interface IuseScrollLock {
  isLocked: boolean;
  toggleScrollLock: (value?: boolean) => void;
}

/**
 * A custom hook to manage the scroll lock state on the document body.
 *
 * @param initialLock - The initial scroll lock state (default is false).
 *
 * @returns An object containing:
 * - isLocked: A boolean indicating whether the scroll is currently locked.
 * - toggleScrollLock: A function to toggle the scroll lock state. If a value is provided, it sets the state to that value.
 *
 * @example
 * // Usage example within a component
 * const { isLocked, toggleScrollLock } = useScrollLock();
 *
 * return (
 *   <div>
 *     <button onClick={() => toggleScrollLock(true)}>Lock Scroll</button>
 *     <button onClick={() => toggleScrollLock(false)}>Unlock Scroll</button>
 *     <p>Scroll is {isLocked ? "locked" : "unlocked"}</p>
 *   </div>
 * );
 */
const useScrollLock = (initialLock?: boolean): IuseScrollLock => {
  const [isLocked, setIsLocked] = useState<boolean>(initialLock || false);

  function toggleScrollLock(value?: boolean): void {
    setIsLocked(value || !isLocked);
  }

  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);

  return { isLocked, toggleScrollLock };
};

export default useScrollLock;
