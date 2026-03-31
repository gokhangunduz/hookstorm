import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useWindowSize from "../useWindowSize";

describe("useWindowSize", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", { value: 1024, writable: true, configurable: true });
    Object.defineProperty(window, "innerHeight", { value: 768, writable: true, configurable: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("initializes with current window dimensions", () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it("updates on window resize", () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, "innerWidth", { value: 1280, writable: true, configurable: true });
      Object.defineProperty(window, "innerHeight", { value: 900, writable: true, configurable: true });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(1280);
    expect(result.current.height).toBe(900);
  });

  it("cleans up event listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useWindowSize());
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
