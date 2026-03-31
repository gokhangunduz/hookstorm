import { useState, useEffect } from "react";

export interface UseWindowSizeReturn {
  width: number;
  height: number;
}

const isBrowser = typeof window !== "undefined";

/**
 * A custom hook to track the current window size.
 * SSR-safe: returns zeros on the server.
 *
 * @returns An object containing:
 * - width: The current width of the window.
 * - height: The current height of the window.
 *
 * @example
 * const { width, height } = useWindowSize();
 *
 * return (
 *   <div>
 *     <p>Window width: {width}px</p>
 *     <p>Window height: {height}px</p>
 *   </div>
 * );
 */
const useWindowSize = (): UseWindowSizeReturn => {
  const [windowSize, setWindowSize] = useState<UseWindowSizeReturn>({
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (!isBrowser) return;

    const handleResize = (): void => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
