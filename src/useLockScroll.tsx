import { useState, useEffect } from "react";

export interface UseLockScrollReturn {
  isLocked: boolean;
  toggleScrollLock: (value?: boolean) => void;
}

// Module-level counter so multiple hook instances share state safely.
// When any instance locks scroll the counter goes above 0; when all unlock it returns to 0.
let lockCount = 0;

/**
 * A custom hook to manage the scroll lock state on the document body.
 * Safe to use in multiple components simultaneously — scroll is only restored
 * once every consumer has unlocked.
 *
 * @param initialLock - The initial scroll lock state (default is false).
 *
 * @returns An object containing:
 * - isLocked: A boolean indicating whether the scroll is currently locked.
 * - toggleScrollLock: A function to toggle the scroll lock state. If a value is provided, it sets the state to that value.
 *
 * @example
 * const { isLocked, toggleScrollLock } = useLockScroll();
 *
 * return (
 *   <div>
 *     <button onClick={() => toggleScrollLock(true)}>Lock Scroll</button>
 *     <button onClick={() => toggleScrollLock(false)}>Unlock Scroll</button>
 *     <p>Scroll is {isLocked ? "locked" : "unlocked"}</p>
 *   </div>
 * );
 */
const useLockScroll = (initialLock?: boolean): UseLockScrollReturn => {
  const [isLocked, setIsLocked] = useState<boolean>(initialLock || false);

  function toggleScrollLock(value?: boolean): void {
    setIsLocked((prev) => (value !== undefined ? value : !prev));
  }

  useEffect(() => {
    if (isLocked) {
      lockCount += 1;
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (isLocked) {
        lockCount = Math.max(0, lockCount - 1);
        if (lockCount === 0) {
          document.body.style.overflow = "";
        }
      }
    };
  }, [isLocked]);

  return { isLocked, toggleScrollLock };
};

export default useLockScroll;
