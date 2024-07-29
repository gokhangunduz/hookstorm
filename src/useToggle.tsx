import { useState } from "react";

const useToggle = (defaultValue?: boolean) => {
  const [value, setToggle] = useState<boolean>(defaultValue || false);

  function handleToggle(value?: boolean) {
    setToggle(value || !value);
  }

  const useToggle = {
    value,
    handleToggle,
  };

  return useToggle;
};

export default useToggle;
