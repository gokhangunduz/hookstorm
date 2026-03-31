import { useEffect, useState } from "react";

export interface UseGeoLocationReturn {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

interface GeoLocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

/**
 * A custom hook to get the user's geolocation.
 * Requires user permission. Cleans up gracefully on unmount.
 *
 * @param options - Optional PositionOptions: enableHighAccuracy, timeout, maximumAge.
 *
 * @returns An object containing:
 * - latitude: The user's latitude (null until resolved).
 * - longitude: The user's longitude (null until resolved).
 * - error: Error message if location access is denied or unavailable.
 * - loading: True while the position request is in progress.
 *
 * @example
 * const { latitude, longitude, error, loading } = useGeoLocation();
 *
 * if (loading) return <p>Locating...</p>;
 * if (error) return <p>Error: {error}</p>;
 * return <p>Location: {latitude}, {longitude}</p>;
 */
const useGeoLocation = (options: GeoLocationOptions = {}): UseGeoLocationReturn => {
  const [location, setLocation] = useState<UseGeoLocationReturn>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    if (!navigator.geolocation) {
      setLocation({ latitude: null, longitude: null, loading: false, error: "Geolocation is not supported by this browser." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!cancelled) {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            loading: false,
          });
        }
      },
      (err) => {
        if (!cancelled) {
          setLocation((prev) => ({ ...prev, error: err.message, loading: false }));
        }
      },
      {
        enableHighAccuracy: options.enableHighAccuracy ?? false,
        timeout: options.timeout ?? 10000,
        maximumAge: options.maximumAge ?? 0,
      }
    );

    return () => {
      cancelled = true;
    };
  }, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

  return location;
};

export default useGeoLocation;
