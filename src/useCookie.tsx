import { useState } from "react";

interface IuseCookie {
  value: string | null;
  setValue: (value: string, options?: CookieOptions) => void;
  removeValue: (options?: CookieOptions) => void;
}

interface CookieOptions {
  expires?: number; // Expiry time in days
  path?: string;
}

/**
 * A custom hook to manage a cookie.
 *
 * @param key - The key of the cookie.
 * @param initialValue - The initial value to use if no cookie is found.
 *
 * @returns An object containing:
 * - value: The current value of the cookie (or initialValue).
 * - setValue: A function to set the cookie value.
 * - removeValue: A function to remove the cookie.
 *
 * @example
 * const { value, setValue, removeValue } = useCookie("myCookie", "initialValue");
 *
 * return (
 *   <div>
 *     <p>Cookie value: {value}</p>
 *     <button onClick={() => setValue("newValue", { expires: 7 })}>Set New Value</button>
 *     <button onClick={() => removeValue()}>Remove Cookie</button>
 *   </div>
 * );
 */
const useCookie = (key: string, initialValue: string): IuseCookie => {
  const [value, setValue] = useState<string | null>(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`));
    return cookieValue ? cookieValue.split("=")[1] : initialValue;
  });

  const setCookie = (value: string, options: CookieOptions = {}): void => {
    let cookieString = `${key}=${value}`;
    if (options.expires) {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      cookieString += `; expires=${date.toUTCString()}`;
    }
    if (options.path) {
      cookieString += `; path=${options.path}`;
    }
    document.cookie = cookieString;
    setValue(value);
  };

  const removeCookie = (options: CookieOptions = {}): void => {
    setCookie("", { expires: -1, ...options });
  };

  return { value, setValue: setCookie, removeValue: removeCookie };
};

export default useCookie;
