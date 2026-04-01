import { useEffect, useRef, type RefObject } from "react";

export type UseMountedReturn = RefObject<boolean>;

/**
 * A custom hook that returns whether the component is currently mounted.
 * Useful for guarding async callbacks against post-unmount state updates in SSR environments.
 *
 * @returns A ref whose `.current` is `true` while the component is mounted, `false` after unmount.
 *
 * @example
 * const isMounted = useMounted();
 *
 * useEffect(() => {
 *   fetchData().then((data) => {
 *     if (isMounted.current) setState(data);
 *   });
 * }, []);
 */
const useMounted = (): UseMountedReturn => {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export default useMounted;
