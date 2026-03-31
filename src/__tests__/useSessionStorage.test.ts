import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import useSessionStorage from "../useSessionStorage";

describe("useSessionStorage", () => {
  beforeEach(() => sessionStorage.clear());

  it("returns initial value when storage is empty", () => {
    const { result } = renderHook(() => useSessionStorage("key", "default"));
    expect(result.current.value).toBe("default");
  });

  it("reads existing value from storage", () => {
    sessionStorage.setItem("key", JSON.stringify("stored"));
    const { result } = renderHook(() => useSessionStorage("key", "default"));
    expect(result.current.value).toBe("stored");
  });

  it("writes value to storage", () => {
    const { result } = renderHook(() => useSessionStorage("key", ""));
    act(() => result.current.setValue("saved"));
    expect(result.current.value).toBe("saved");
    expect(JSON.parse(sessionStorage.getItem("key")!)).toBe("saved");
  });

  it("removes value from storage", () => {
    const { result } = renderHook(() => useSessionStorage("key", "hello"));
    act(() => result.current.setValue("hello"));
    act(() => result.current.removeValue());
    expect(result.current.value).toBeNull();
    expect(sessionStorage.getItem("key")).toBeNull();
  });
});
