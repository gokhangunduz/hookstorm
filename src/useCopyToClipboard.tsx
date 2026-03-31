import { useState, useCallback, useRef, useEffect } from "react";

export interface UseCopyToClipboardReturn {
  copied: boolean;
  copyToClipboard: (text: string) => void;
}

/**
 * A custom hook to copy text to the clipboard.
 * The `copied` flag resets to false automatically after 2 seconds.
 * Safe to use in components that may unmount before the reset fires.
 *
 * @returns An object containing:
 * - copied: A boolean indicating if the text was successfully copied to clipboard.
 * - copyToClipboard: A function to copy the provided text to the clipboard.
 *
 * @example
 * const { copied, copyToClipboard } = useCopyToClipboard();
 *
 * return (
 *   <div>
 *     <button onClick={() => copyToClipboard('Text to copy')}>Copy Text</button>
 *     {copied && <p>Text copied to clipboard!</p>}
 *   </div>
 * );
 */
const useCopyToClipboard = (): UseCopyToClipboardReturn => {
  const [copied, setCopied] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);

    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (mountedRef.current) setCopied(true);
      })
      .catch(() => {
        if (mountedRef.current) setCopied(false);
      })
      .finally(() => {
        timerRef.current = window.setTimeout(() => {
          if (mountedRef.current) setCopied(false);
        }, 2000);
      });
  }, []);

  return { copied, copyToClipboard };
};

export default useCopyToClipboard;
