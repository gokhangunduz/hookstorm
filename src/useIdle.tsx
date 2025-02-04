import { useEffect, useRef, useState, useCallback } from "react";

interface IuseIdle {
  isIdle: boolean;
  resetIdle: () => void;
}

/**
 * A highly optimized custom hook to detect user inactivity.
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
  events: string[] = ["mousemove", "keydown", "click", "scroll", "touchstart"]
): IuseIdle => {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<number | null>(null);

  const resetIdle = useCallback(() => {
    setIsIdle(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsIdle(true), timeout);
  }, [timeout]);

  useEffect(() => {
    resetIdle();

    events.forEach((event) => window.addEventListener(event, resetIdle));
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetIdle));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetIdle, events]);

  return { isIdle, resetIdle };
};

export default useIdle;
