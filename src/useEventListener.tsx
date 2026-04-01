import { useEffect, useRef, type RefObject } from "react";

/**
 * A custom hook that attaches an event listener to an element or window.
 * The handler is always kept fresh — updating it does not re-register the listener.
 *
 * @param eventName - The name of the event to listen for.
 * @param handler - The callback to invoke when the event fires.
 * @param element - Optional ref to the target element. Defaults to window.
 *
 * @example
 * useEventListener("keydown", (e) => {
 *   if ((e as KeyboardEvent).key === "Escape") closeModal();
 * });
 *
 * const ref = useRef<HTMLDivElement>(null);
 * useEventListener("click", handleClick, ref);
 */
const useEventListener = (
  eventName: string,
  handler: (event: Event) => void,
  element?: RefObject<HTMLElement | null> | null
): void => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const target: EventTarget = element?.current ?? window;
    if (!target) return;

    const listener = (event: Event) => handlerRef.current(event);
    target.addEventListener(eventName, listener);
    return () => target.removeEventListener(eventName, listener);
  }, [eventName, element]);
};

export default useEventListener;
