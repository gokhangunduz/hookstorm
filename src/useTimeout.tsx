import { useEffect, useRef, useCallback } from "react";

export interface UseTimeoutReturn {
  reset: () => void;
  clear: () => void;
}

/**
 * A custom hook that calls a callback once after a delay.
 * The timer is automatically cleared on unmount.
 * Exposes `reset` to restart the timer and `clear` to cancel it.
 *
 * @param callback - The function to call after the delay.
 * @param delay - The timeout delay in milliseconds.
 *
 * @returns An object containing:
 * - reset: Restart the timer from scratch.
 * - clear: Cancel the pending timer.
 *
 * @example
 * const { reset, clear } = useTimeout(() => setVisible(false), 3000);
 *
 * return (
 *   <div>
 *     <button onClick={reset}>Restart timer</button>
 *     <button onClick={clear}>Cancel timer</button>
 *   </div>
 * );
 */
const useTimeout = (callback: () => void, delay: number): UseTimeoutReturn => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const timerRef = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clear();
    timerRef.current = window.setTimeout(() => callbackRef.current(), delay);
  }, [clear, delay]);

  useEffect(() => {
    reset();
    return clear;
  }, [reset, clear]);

  return { reset, clear };
};

export default useTimeout;
