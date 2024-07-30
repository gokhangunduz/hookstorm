import { useState, useEffect } from "react";

interface IWindowSize {
  width: number;
  height: number;
}

interface IuseWindowSize {
  width: number;
  height: number;
}

enum WindowEvent {
  RESIZE = "resize",
}

const useWindowSize = (): IuseWindowSize => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = (): void => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener(WindowEvent.RESIZE, handleResize);

    return () => window.removeEventListener(WindowEvent.RESIZE, handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
