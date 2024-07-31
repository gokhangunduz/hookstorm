import { useState, useCallback } from "react";

interface IuseCopyToClipboard {
  copied: boolean;
  copyToClipboard: (text: string) => void;
}

/**
 * A custom hook to copy text to the clipboard.
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
const useCopyToClipboard = (): IuseCopyToClipboard => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied(true))
      .catch(() => setCopied(false))
      .finally(() => setTimeout(() => setCopied(false), 2000));
  }, []);

  return { copied, copyToClipboard };
};

export default useCopyToClipboard;
