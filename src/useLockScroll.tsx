import { useState, useEffect } from "react";

const useScrollLock = (initialLock: boolean = false) => {
  const [isLocked, setIsLocked] = useState(initialLock);

  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);

  const toggleScrollLock = (value?: boolean) => setIsLocked(value || !isLocked);

  return [isLocked, toggleScrollLock] as const;
};

export default useScrollLock;
