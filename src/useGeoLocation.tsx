import { useEffect, useState } from "react";

interface IuseGeoLocation {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

/**
 * A custom hook to get the user's geolocation.
 *
 * @returns An object containing:
 * - latitude: The user's latitude.
 * - longitude: The user's longitude.
 * - error: Any error message if location access is denied.
 *
 * @example
 * const { latitude, longitude } = useGeoLocation();
 */
const useGeoLocation = (): IuseGeoLocation => {
  const [location, setLocation] = useState<IuseGeoLocation>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({ ...prev, error: "Geolocation not supported" }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => setLocation((prev) => ({ ...prev, error: error.message }))
    );
  }, []);

  return location;
};

export default useGeoLocation;
