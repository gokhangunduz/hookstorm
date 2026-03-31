import { useState, useEffect, useRef } from "react";

export interface UseScrollPositionReturn {
  scrollX: number;
  scrollY: number;
}

const isBrowser = typeof window !== "undefined";

/**
 * A custom hook to get the current scroll position of the window.
 * Updates are throttled to the display refresh rate via requestAnimationFrame.
 * SSR-safe: returns zeros on the server.
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
const useScrollPosition = (): UseScrollPositionReturn => {
  const [scrollPosition, setScrollPosition] = useState<UseScrollPositionReturn>({
    scrollX: isBrowser ? window.scrollX : 0,
    scrollY: isBrowser ? window.scrollY : 0,
  });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isBrowser) return;

    const handleScroll = (): void => {
      if (rafRef.current !== null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        setScrollPosition({ scrollX: window.scrollX, scrollY: window.scrollY });
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
