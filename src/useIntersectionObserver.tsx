import { useEffect, useState, type RefObject } from "react";

export interface UseIntersectionObserverReturn {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * A custom hook that observes whether an element is intersecting the viewport (or a custom root).
 * Useful for lazy loading, infinite scroll, and scroll-triggered animations.
 *
 * @param target - A ref pointing to the element to observe.
 * @param options - Optional IntersectionObserver options: root, rootMargin, threshold.
 *
 * @returns An object containing:
 * - isIntersecting: True while the element is intersecting the root.
 * - entry: The latest IntersectionObserverEntry (null before first observation).
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const { isIntersecting } = useIntersectionObserver(ref);
 *
 * return <div ref={ref}>{isIntersecting ? "Visible" : "Hidden"}</div>;
 */
const useIntersectionObserver = (
  target: RefObject<Element | null>,
  options: IntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
  const [state, setState] = useState<UseIntersectionObserverReturn>({
    isIntersecting: false,
    entry: null,
  });

  useEffect(() => {
    const element = target.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState({ isIntersecting: entry.isIntersecting, entry });
      },
      {
        root: options.root ?? null,
        rootMargin: options.rootMargin ?? "0px",
        threshold: options.threshold ?? 0,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, options.root, options.rootMargin, options.threshold]);

  return state;
};

export default useIntersectionObserver;
