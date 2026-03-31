import { useState, useEffect } from "react";

export interface UseDocumentTitleReturn {
  title: string;
  setDocumentTitle: (newTitle: string) => void;
}

const isBrowser = typeof document !== "undefined";

/**
 * A custom hook to manage the document title.
 * SSR-safe: no-op on the server.
 *
 * @returns An object containing:
 * - title: The current document title.
 * - setDocumentTitle: A function to update the document title.
 *
 * @example
 * const { title, setDocumentTitle } = useDocumentTitle();
 *
 * return (
 *   <div>
 *     <p>Current Title: {title}</p>
 *     <button onClick={() => setDocumentTitle("New Title")}>Change Title</button>
 *   </div>
 * );
 */
const useDocumentTitle = (): UseDocumentTitleReturn => {
  const [title, setTitle] = useState<string>(isBrowser ? document.title : "");

  useEffect(() => {
    if (!isBrowser) return;
    document.title = title;
  }, [title]);

  const setDocumentTitle = (newTitle: string): void => {
    setTitle(newTitle);
  };

  return { title, setDocumentTitle };
};

export default useDocumentTitle;
