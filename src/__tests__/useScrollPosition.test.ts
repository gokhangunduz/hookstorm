import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useScrollPosition from "../useScrollPosition";

describe("useScrollPosition", () => {
  beforeEach(() => {
    // Mock requestAnimationFrame to execute synchronously
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 0;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);

    Object.defineProperty(window, "scrollX", { value: 0, writable: true, configurable: true });
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("initializes with current scroll position", () => {
    const { result } = renderHook(() => useScrollPosition());
    expect(result.current.scrollX).toBe(0);
    expect(result.current.scrollY).toBe(0);
  });

  it("updates scroll position on scroll event", () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, "scrollX", { value: 100, writable: true, configurable: true });
      Object.defineProperty(window, "scrollY", { value: 250, writable: true, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.scrollX).toBe(100);
    expect(result.current.scrollY).toBe(250);
  });
});
