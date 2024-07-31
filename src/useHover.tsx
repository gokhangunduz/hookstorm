import { useState, useRef, useEffect } from "react";

enum MouseEvent {
  ENTER = "mouseenter",
  LEAVE = "mouseleave",
}

interface IuseHover {
  ref: React.RefObject<Element>;
  isHovered: boolean;
}

/**
 * A custom hook to track if an element is being hovered over.
 *
 * @returns An object containing:
 * - ref: A React ref object to attach to the target element.
 * - isHovered: A boolean indicating whether the element is currently being hovered.
 *
 * @example
 * // Usage example within a component
 * const { ref, isHovered } = useHover();
 *
 * return (
 *   <div ref={ref}>
 *     {isHovered ? "Hovered!" : "Not hovered"}
 *   </div>
 * );
 */
const useHover = (): IuseHover => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const ref = useRef<Element>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseEnter = (): void => setIsHovered(true);
    const handleMouseLeave = (): void => setIsHovered(false);

    node.addEventListener(MouseEvent.ENTER, handleMouseEnter);
    node.addEventListener(MouseEvent.LEAVE, handleMouseLeave);

    return () => {
      node.removeEventListener(MouseEvent.ENTER, handleMouseEnter);
      node.removeEventListener(MouseEvent.LEAVE, handleMouseLeave);
    };
  }, []);

  return { ref, isHovered };
};

export default useHover;
