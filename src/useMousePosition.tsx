import { useEffect, useState, useRef } from "react";

export interface UseMousePositionReturn {
  x: number;
  y: number;
}

/**
 * A custom hook to track mouse position using requestAnimationFrame for performance.
 * Updates are throttled to the display refresh rate instead of firing on every mousemove event.
 *
 * @returns An object containing:
 * - x: The x-coordinate of the mouse.
 * - y: The y-coordinate of the mouse.
 *
 * @example
 * const { x, y } = useMousePosition();
 *
 * return <p>Mouse Position: {x}, {y}</p>;
 */
const useMousePosition = (): UseMousePositionReturn => {
  const [position, setPosition] = useState<UseMousePositionReturn>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<UseMousePositionReturn | null>(null);

  useEffect(() => {
    const handleMove = (event: MouseEvent): void => {
      pendingRef.current = { x: event.clientX, y: event.clientY };

      if (rafRef.current !== null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        if (pendingRef.current) setPosition(pendingRef.current);
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return position;
};

export default useMousePosition;
