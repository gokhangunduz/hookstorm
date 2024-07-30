import { useState, useEffect } from "react";

interface IuseScrollLock {
  isLocked: boolean;
  toggleScrollLock: (value?: boolean) => void;
}

const useScrollLock = (initialLock?: boolean): IuseScrollLock => {
  const [isLocked, setIsLocked] = useState<boolean>(initialLock || false);

  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);

  function toggleScrollLock(value?: boolean): void {
    setIsLocked(value || !isLocked);
  }

  return { isLocked, toggleScrollLock };
};

export default useScrollLock;
