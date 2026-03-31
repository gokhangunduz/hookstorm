import { useState, useEffect, useRef, useCallback } from "react";

export interface UseCountdownReturn {
  timeLeft: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

/**
 * A custom hook for a countdown timer with customizable interval (in seconds) and optional stop time.
 *
 * @param startTime - The total countdown time in seconds. (e.g., 60)
 * @param interval - The interval duration in seconds. (e.g., 1 for 1 second)
 * @param stopTime - Optional value at which the countdown should stop automatically. (e.g., 10)
 *
 * @returns An object containing:
 * - timeLeft: The remaining time in seconds.
 * - start: A function to start or resume the countdown.
 * - stop: A function to stop the countdown.
 * - reset: A function to reset the countdown to the total start time.
 *
 * @example
 * const { timeLeft, start, stop, reset } = useCountdown(60, 1, 10);
 *
 * return (
 *   <div>
 *     <p>Time Left: {timeLeft} seconds</p>
 *     <button onClick={start}>Start</button>
 *     <button onClick={stop}>Stop</button>
 *     <button onClick={reset}>Reset</button>
 *   </div>
 * );
 */
const useCountdown = (
  startTime: number,
  interval: number = 1,
  stopTime?: number
): UseCountdownReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(startTime);
  const isActiveRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);
  // Keep stopTime in a ref so the interval callback always has the latest value
  const stopTimeRef = useRef<number | undefined>(stopTime);
  stopTimeRef.current = stopTime;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    isActiveRef.current = false;
    clearTimer();
  }, [clearTimer]);

  const start = useCallback(() => {
    if (isActiveRef.current) return;
    isActiveRef.current = true;

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        const hitStop =
          stopTimeRef.current !== undefined && next <= stopTimeRef.current;

        if (next <= 0 || hitStop) {
          isActiveRef.current = false;
          window.clearInterval(timerRef.current!);
          timerRef.current = null;
          return next <= 0 ? 0 : next;
        }

        return next;
      });
    }, interval * 1000);
  }, [interval]);

  const reset = useCallback(() => {
    stop();
    setTimeLeft(startTime);
  }, [stop, startTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return { timeLeft, start, stop, reset };
};

export default useCountdown;
