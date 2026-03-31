import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import usePrefersTheme from "../usePrefersTheme";

describe("usePrefersTheme", () => {
  let listeners: Array<(e: MediaQueryListEvent) => void> = [];

  const mockMatchMedia = (matches: boolean) => {
    listeners = [];
    vi.stubGlobal("matchMedia", () => ({
      matches,
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: (_: string, fn: (e: MediaQueryListEvent) => void) => listeners.push(fn),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  };

  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("returns light when prefers-color-scheme is light", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => usePrefersTheme());
    expect(result.current.theme).toBe("light");
  });

  it("returns dark when prefers-color-scheme is dark", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => usePrefersTheme());
    expect(result.current.theme).toBe("dark");
  });

  it("updates theme when media query changes", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => usePrefersTheme());
    expect(result.current.theme).toBe("light");
    act(() => {
      listeners.forEach((fn) => fn({ matches: true } as MediaQueryListEvent));
    });
    expect(result.current.theme).toBe("dark");
  });
});
