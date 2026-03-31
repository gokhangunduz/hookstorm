import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import usePageVisibility from "../usePageVisibility";

describe("usePageVisibility", () => {
  beforeEach(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      writable: true,
      value: false,
    });
  });

  it("returns true when document is visible", () => {
    const { result } = renderHook(() => usePageVisibility());
    expect(result.current.isVisible).toBe(true);
  });

  it("updates to false when page becomes hidden", () => {
    const { result } = renderHook(() => usePageVisibility());
    act(() => {
      Object.defineProperty(document, "hidden", { value: true, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(result.current.isVisible).toBe(false);
  });

  it("updates to true when page becomes visible again", () => {
    Object.defineProperty(document, "hidden", { value: true, configurable: true });
    const { result } = renderHook(() => usePageVisibility());
    act(() => {
      Object.defineProperty(document, "hidden", { value: false, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(result.current.isVisible).toBe(true);
  });
});
