import { useEffect, useState } from "react";

export interface UsePageVisibilityReturn {
  isVisible: boolean;
}

/**
 * A custom hook to track page visibility.
 *
 * @returns An object containing:
 * - isVisible: A boolean indicating whether the page is currently visible.
 *
 * @example
 * const { isVisible } = usePageVisibility();
 *
 * return <p>{isVisible ? "Tab is active" : "Tab is inactive"}</p>;
 */
const usePageVisibility = (): UsePageVisibilityReturn => {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { isVisible };
};

export default usePageVisibility;
