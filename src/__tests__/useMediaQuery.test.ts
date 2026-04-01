import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useMediaQuery from "../useMediaQuery";

describe("useMediaQuery", () => {
  let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;

  const createMql = (matches: boolean) => ({
    matches,
    addEventListener: vi.fn((_: string, handler: (e: MediaQueryListEvent) => void) => {
      changeHandler = handler;
    }),
    removeEventListener: vi.fn(),
  });

  beforeEach(() => {
    changeHandler = null;
  });

  it("returns true when query matches", () => {
    vi.stubGlobal("matchMedia", () => createMql(true));
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("returns false when query does not match", () => {
    vi.stubGlobal("matchMedia", () => createMql(false));
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(false);
  });

  it("updates to true when media query starts matching", () => {
    vi.stubGlobal("matchMedia", () => createMql(false));
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(false);

    act(() => {
      changeHandler?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });

  it("updates to false when media query stops matching", () => {
    vi.stubGlobal("matchMedia", () => createMql(true));
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(true);

    act(() => {
      changeHandler?.({ matches: false } as MediaQueryListEvent);
    });

    expect(result.current).toBe(false);
  });

  it("removes event listener on unmount", () => {
    const mql = createMql(false);
    vi.stubGlobal("matchMedia", () => mql);

    const { unmount } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    unmount();

    expect(mql.removeEventListener).toHaveBeenCalled();
  });
});
