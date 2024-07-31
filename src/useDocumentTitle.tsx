import { useState, useEffect } from "react";

interface IuseDocumentTitle {
  title: string;
  setDocumentTitle: (newTitle: string) => void;
}

/**
 * A custom hook to manage the document title.
 *
 * @returns An object containing:
 * - title: The current document title.
 * - setDocumentTitle: A function to update the document title.
 *
 * @example
 * const { title, setDocumentTitle } = useDocumentTitle();
 * useEffect(() => {
 *   setDocumentTitle('New Page Title');
 * }, []);
 *
 * return (
 *   <div>
 *     <p>Current Title: {title}</p>
 *     <p>The document title will be updated to 'New Page Title'.</p>
 *   </div>
 * );
 */
const useDocumentTitle = (): IuseDocumentTitle => {
  const [title, setTitle] = useState<string>(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const setDocumentTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  return { title, setDocumentTitle };
};

export default useDocumentTitle;
