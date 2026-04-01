import { useState, useEffect } from "react";

export interface UseMediaQueryReturn {
  matches: boolean;
}

/**
 * A custom hook that tracks whether a CSS media query currently matches.
 * Updates reactively when the match status changes.
 *
 * @param query - A valid CSS media query string (e.g. "(min-width: 768px)").
 *
 * @returns True if the media query matches, false otherwise.
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 * const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
 *
 * return <p>{isDesktop ? "Desktop" : "Mobile"}</p>;
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

export default useMediaQuery;
