import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import useCookie from "../useCookie";

describe("useCookie", () => {
  beforeEach(() => {
    // Clear all cookies between tests
    document.cookie.split(";").forEach((c) => {
      const key = c.split("=")[0].trim();
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });
  });

  it("returns initialValue when cookie does not exist", () => {
    const { result } = renderHook(() => useCookie("test-key", "default"));
    expect(result.current.value).toBe("default");
  });

  it("sets and reads cookie value", () => {
    const { result } = renderHook(() => useCookie("test-key", "default"));
    act(() => result.current.setValue("hello"));
    expect(result.current.value).toBe("hello");
  });

  it("removes cookie and resets to null", () => {
    const { result } = renderHook(() => useCookie("test-key", "default"));
    act(() => result.current.setValue("hello"));
    act(() => result.current.removeValue());
    expect(result.current.value).toBeNull();
  });

  it("handles special characters via URL encoding", () => {
    const { result } = renderHook(() => useCookie("test-key", ""));
    act(() => result.current.setValue("hello world & more=stuff"));
    expect(result.current.value).toBe("hello world & more=stuff");
  });

  it("handles key with special characters", () => {
    const { result } = renderHook(() => useCookie("my key", "default"));
    act(() => result.current.setValue("value"));
    expect(result.current.value).toBe("value");
  });

  it("syncs value when window gains focus after external change", () => {
    const { result } = renderHook(() => useCookie("test-key", "default"));

    document.cookie = `${encodeURIComponent("test-key")}=${encodeURIComponent("external-value")}`;

    act(() => {
      window.dispatchEvent(new Event("focus"));
    });

    expect(result.current.value).toBe("external-value");
  });
});
