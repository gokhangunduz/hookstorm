import { useState, useEffect, useCallback, useRef } from "react";

export interface UseAsyncReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: () => void;
}

/**
 * A custom hook to manage an async function's lifecycle.
 * Handles loading, error, and data states automatically.
 * Safe to use in components that may unmount before the async call resolves.
 *
 * @param asyncFn - The async function to execute.
 * @param immediate - Whether to execute immediately on mount (default: true).
 *
 * @returns An object containing:
 * - data: The resolved value, or `null` if not yet resolved.
 * - loading: `true` while the async function is running.
 * - error: The caught error, or `null` if no error occurred.
 * - execute: A function to manually trigger or re-trigger the async call.
 *
 * @example
 * const { data, loading, error, execute } = useAsync(() => fetch("/api/user").then(r => r.json()));
 *
 * if (loading) return <p>Loading...</p>;
 * if (error) return <p>Error: {error.message}</p>;
 * return <p>Hello {data?.name}</p>;
 */
const useAsync = <T,>(
  asyncFn: () => Promise<T>,
  immediate: boolean = true
): UseAsyncReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(() => {
    setLoading(true);
    setError(null);

    asyncFn()
      .then((result) => {
        if (mountedRef.current) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (mountedRef.current) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });
  }, [asyncFn]);

  useEffect(() => {
    if (immediate) execute();
  }, [immediate, execute]);

  return { data, loading, error, execute };
};

export default useAsync;
