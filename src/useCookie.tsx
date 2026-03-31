import { useState } from "react";

export interface UseCookieReturn {
  value: string | null;
  setValue: (value: string, options?: CookieOptions) => void;
  removeValue: (options?: CookieOptions) => void;
}

interface CookieOptions {
  expires?: number; // Expiry time in days
  path?: string;
  sameSite?: "Strict" | "Lax" | "None";
  secure?: boolean;
}

/**
 * A custom hook to manage a cookie.
 * Values are automatically URL-encoded/decoded to handle special characters safely.
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
const useCookie = (key: string, initialValue: string): UseCookieReturn => {
  const readCookie = (): string | null => {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${encodeURIComponent(key)}=`));
    if (!match) return null;
    try {
      return decodeURIComponent(match.split("=").slice(1).join("="));
    } catch {
      return null;
    }
  };

  const [value, setValue] = useState<string | null>(
    () => readCookie() ?? initialValue
  );

  const setCookie = (newValue: string, options: CookieOptions = {}): void => {
    let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(newValue)}`;

    if (options.expires !== undefined) {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      cookieString += `; expires=${date.toUTCString()}`;
    }

    cookieString += `; path=${options.path ?? "/"}`;

    if (options.sameSite) cookieString += `; SameSite=${options.sameSite}`;
    if (options.secure) cookieString += `; Secure`;

    document.cookie = cookieString;
    setValue(newValue);
  };

  const removeCookie = (options: CookieOptions = {}): void => {
    setCookie("", { ...options, expires: -1 });
    setValue(null);
  };

  return { value, setValue: setCookie, removeValue: removeCookie };
};

export default useCookie;
