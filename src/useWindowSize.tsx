import { useState, useEffect } from "react";

interface IWindowSize {
  width: number;
  height: number;
}

interface IuseWindowSize {
  width: number;
  height: number;
}

enum WindowEvent {
  RESIZE = "resize",
}

/**
 * A custom hook to track the current window size.
 *
 * @returns An object containing:
 * - width: The current width of the window.
 * - height: The current height of the window.
 *
 * @example
 * // Usage example within a component
 * const { width, height } = useWindowSize();
 *
 * return (
 *   <div>
 *     <p>Window width: {width}px</p>
 *     <p>Window height: {height}px</p>
 *   </div>
 * );
 */
const useWindowSize = (): IuseWindowSize => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = (): void => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener(WindowEvent.RESIZE, handleResize);

    return () => window.removeEventListener(WindowEvent.RESIZE, handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
