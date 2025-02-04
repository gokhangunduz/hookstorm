import { useEffect, useState } from "react";

interface IuseOnlineStatus {
  isOnline: boolean;
}

/**
 * A custom hook to track the user's online status.
 *
 * @returns An object containing:
 * - isOnline: A boolean indicating if the user is online.
 *
 * @example
 * const { isOnline } = useOnlineStatus();
 *
 * return <p>{isOnline ? "Online" : "Offline"}</p>;
 */
const useOnlineStatus = (): IuseOnlineStatus => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return { isOnline };
};

export default useOnlineStatus;
