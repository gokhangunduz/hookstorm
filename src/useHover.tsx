import { useState, useRef, useEffect } from "react";

enum MouseEvent {
  ENTER = "mouseenter",
  LEAVE = "mouseleave",
}

interface IuseHover {
  ref: React.RefObject<Element>;
  isHovered: boolean;
}

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
