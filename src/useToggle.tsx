import { useState } from "react";

interface IuseToggle {
  value: boolean;
  toggle: (newValue?: boolean) => void;
}

const useToggle = (initialValue: boolean = false): IuseToggle => {
  const [value, setToggle] = useState<boolean>(initialValue);

  function toggle(newValue?: boolean): void {
    setToggle((prev) => newValue ?? !prev);
  }

  return {
    value,
    toggle,
  };
};

export default useToggle;
