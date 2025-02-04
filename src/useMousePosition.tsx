import { useEffect, useState } from "react";

interface IuseMousePosition {
  x: number;
  y: number;
}

/**
 * A custom hook to track mouse position.
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
const useMousePosition = (): IuseMousePosition => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return position;
};

export default useMousePosition;
