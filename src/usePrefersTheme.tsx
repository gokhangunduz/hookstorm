import { useState, useEffect } from "react";

interface IusePrefersTheme {
  theme: "dark" | "light";
}

/**
 * A custom hook to determine if the user prefers a dark or light theme.
 *
 * @returns An object containing:
 * - theme: A string indicating if the user prefers "dark" or "light" theme.
 *
 * @example
 * const { theme } = usePrefersTheme();
 *
 * return (
 *   <div>
 *     {theme === "dark" ? <p>Dark mode is preferred</p> : <p>Light mode is preferred</p>}
 *   </div>
 * );
 */
const usePrefersTheme = (): IusePrefersTheme => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    // Set initial value
    setTheme(darkModeMediaQuery.matches ? "dark" : "light");

    // Add event listener for changes
    darkModeMediaQuery.addEventListener("change", handleChange);

    // Cleanup event listener on component unmount
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return { theme };
};

export default usePrefersTheme;
