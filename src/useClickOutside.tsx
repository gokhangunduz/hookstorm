import { useEffect, useRef, useState } from "react";

interface IuseClickOutside {
  ref: React.RefObject<HTMLElement>;
  isOutside: boolean;
}

/**
 * A custom hook to detect clicks outside of a referenced element.
 *
 * @param onClickOutside - The callback function triggered when clicking outside the element.
 *
 * @returns An object containing:
 * - ref: The reference to attach to the element.
 * - isOutside: A boolean indicating if the last click was outside the element.
 *
 * @example
 * const { ref, isOutside } = useClickOutside(() => setIsOpen(false));
 *
 * return <div ref={ref}>{isOutside ? "Clicked outside" : "Inside"}</div>;
 */
const useClickOutside = (onClickOutside?: () => void): IuseClickOutside => {
  const ref = useRef<HTMLElement>(null);
  const [isOutside, setIsOutside] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = !ref.current?.contains(event.target as Node);
      setIsOutside(clickedOutside);
      if (clickedOutside) onClickOutside?.();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClickOutside]);

  return { ref, isOutside };
};

export default useClickOutside;
