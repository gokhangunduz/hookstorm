import { useState, useEffect } from "react";

interface IuseScrollPosition {
  scrollX: number;
  scrollY: number;
}

/**
 * A custom hook to get the current scroll position of the window.
 *
 * @returns An object containing:
 * - scrollX: The current horizontal scroll position.
 * - scrollY: The current vertical scroll position.
 *
 * @example
 * const { scrollX, scrollY } = useScrollPosition();
 *
 * return (
 *   <div>
 *     <p>Scroll X: {scrollX}</p>
 *     <p>Scroll Y: {scrollY}</p>
 *   </div>
 * );
 */
const useScrollPosition = (): IuseScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<IuseScrollPosition>({
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  });

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollPosition({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
