import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useGeoLocation from "../useGeoLocation";

describe("useGeoLocation", () => {
  const mockGeolocation = {
    getCurrentPosition: vi.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(navigator, "geolocation", {
      value: mockGeolocation,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("starts with loading true and no location", () => {
    mockGeolocation.getCurrentPosition.mockImplementation(() => {
      // never resolves
    });
    const { result } = renderHook(() => useGeoLocation());
    expect(result.current.loading).toBe(true);
    expect(result.current.latitude).toBeNull();
    expect(result.current.longitude).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("resolves latitude and longitude on success", async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success: PositionCallback) => {
      success({ coords: { latitude: 39.9334, longitude: 32.8597 } } as GeolocationPosition);
    });

    const { result } = renderHook(() => useGeoLocation());

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.latitude).toBe(39.9334);
    expect(result.current.longitude).toBe(32.8597);
    expect(result.current.error).toBeNull();
  });

  it("sets error message on failure", async () => {
    mockGeolocation.getCurrentPosition.mockImplementation(
      (_success: PositionCallback, error: PositionErrorCallback) => {
        error({ message: "User denied geolocation" } as GeolocationPositionError);
      }
    );

    const { result } = renderHook(() => useGeoLocation());

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("User denied geolocation");
    expect(result.current.latitude).toBeNull();
  });

  it("sets error when geolocation is not supported", async () => {
    Object.defineProperty(navigator, "geolocation", {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useGeoLocation());

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Geolocation is not supported by this browser.");
  });
});
