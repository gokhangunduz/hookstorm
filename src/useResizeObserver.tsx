import { useEffect, useState, type RefObject } from "react";

export interface UseResizeObserverReturn {
  width: number;
  height: number;
  entry: ResizeObserverEntry | null;
}

/**
 * A custom hook that tracks the dimensions of an element using ResizeObserver.
 * Updates reactively whenever the element is resized.
 *
 * @param target - A ref pointing to the element to observe.
 *
 * @returns An object containing:
 * - width: The current content width of the element in pixels.
 * - height: The current content height of the element in pixels.
 * - entry: The latest ResizeObserverEntry (null before first observation).
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const { width, height } = useResizeObserver(ref);
 *
 * return <div ref={ref}>Size: {width}x{height}</div>;
 */
const useResizeObserver = (target: RefObject<Element | null>): UseResizeObserverReturn => {
  const [state, setState] = useState<UseResizeObserverReturn>({
    width: 0,
    height: 0,
    entry: null,
  });

  useEffect(() => {
    const element = target.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setState({ width, height, entry });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return state;
};

export default useResizeObserver;
