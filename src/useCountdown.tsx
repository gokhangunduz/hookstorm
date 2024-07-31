import { useState, useEffect, useRef } from "react";

interface IuseCountdown {
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
 * // startTime = 60 seconds
 * // interval = 1 second
 * // stopTime = 10 seconds (optional, countdown stops automatically at this value)
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
  interval: number,
  stopTime?: number
): IuseCountdown => {
  const [timeLeft, setTimeLeft] = useState<number>(startTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, interval * 1000); // Convert interval from seconds to milliseconds

    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, interval]);

  useEffect(() => {
    if (stopTime !== undefined && timeLeft <= stopTime) {
      stop();
    }
  }, [timeLeft, stopTime]);

  function start() {
    setIsActive(true);
  }

  function stop() {
    setIsActive(false);
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
  }

  function reset() {
    stop();
    setTimeLeft(startTime);
  }

  return { timeLeft, start, stop, reset };
};

export default useCountdown;
