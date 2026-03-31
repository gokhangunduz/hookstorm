import { useEffect, useRef, useState } from "react";

export interface UseClickOutsideReturn {
  ref: React.RefObject<HTMLElement | null>;
  isOutside: boolean;
}

/**
 * A custom hook to detect interaction outside of a referenced element.
 * Handles both mouse clicks and keyboard focus changes for accessibility.
 *
 * @param onClickOutside - The callback function triggered when interacting outside the element.
 *
 * @returns An object containing:
 * - ref: The reference to attach to the element.
 * - isOutside: A boolean indicating if the last interaction was outside the element.
 *
 * @example
 * const { ref, isOutside } = useClickOutside(() => setIsOpen(false));
 *
 * return <div ref={ref}>{isOutside ? "Clicked outside" : "Inside"}</div>;
 */
const useClickOutside = (onClickOutside?: () => void): UseClickOutsideReturn => {
  const ref = useRef<HTMLElement>(null);
  const [isOutside, setIsOutside] = useState<boolean>(false);

  useEffect(() => {
    const isOutsideElement = (target: EventTarget | null): boolean =>
      !!ref.current && !ref.current.contains(target as Node);

    const handlePointer = (event: MouseEvent): void => {
      const outside = isOutsideElement(event.target);
      setIsOutside(outside);
      if (outside) onClickOutside?.();
    };

    // Handles keyboard users tabbing focus out of the element
    const handleFocusIn = (event: FocusEvent): void => {
      const outside = isOutsideElement(event.target);
      setIsOutside(outside);
      if (outside) onClickOutside?.();
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [onClickOutside]);

  return { ref, isOutside };
};

export default useClickOutside;
