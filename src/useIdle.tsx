import { useEffect, useRef, useState, useCallback } from "react";

export interface UseIdleReturn {
  isIdle: boolean;
  resetIdle: () => void;
}

// Stable default event list defined outside the hook to avoid new array
// references on every render, which would cause the effect to re-run endlessly.
const DEFAULT_EVENTS = ["mousemove", "keydown", "click", "scroll", "touchstart"] as const;

/**
 * A custom hook to detect user inactivity.
 *
 * @param timeout - The duration (in milliseconds) after which the user is considered idle.
 * @param events - The events that should reset the idle timer.
 *
 * @returns An object containing:
 * - isIdle: A boolean indicating whether the user is inactive.
 * - resetIdle: A function to manually reset the idle state.
 *
 * @example
 * const { isIdle, resetIdle } = useIdle(60000);
 *
 * return (
 *   <div>
 *     <p>{isIdle ? "User is idle 💤" : "User is active 🏃"}</p>
 *     <button onClick={resetIdle}>Reset Idle</button>
 *   </div>
 * );
 */
const useIdle = (
  timeout: number = 60000,
  events: readonly string[] = DEFAULT_EVENTS
): UseIdleReturn => {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<number | null>(null);
  // Keep timeout in a ref so resetIdle doesn't need to be recreated when it changes
  const timeoutRef = useRef(timeout);
  timeoutRef.current = timeout;

  const resetIdle = useCallback(() => {
    setIsIdle(false);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setIsIdle(true), timeoutRef.current);
  }, []);

  useEffect(() => {
    resetIdle();
    events.forEach((event) => window.addEventListener(event, resetIdle));
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetIdle));
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [resetIdle, events]);

  return { isIdle, resetIdle };
};

export default useIdle;
