import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import useLocalStorage from "../useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    const store: Record<string, string> = {};
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => { store[key] = value; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
    });
  });

  it("returns initial value when storage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current.value).toBe("default");
  });

  it("reads existing value from storage", () => {
    localStorage.setItem("key", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current.value).toBe("stored");
  });

  it("writes value to storage", () => {
    const { result } = renderHook(() => useLocalStorage("key", ""));
    act(() => result.current.setValue("new value"));
    expect(result.current.value).toBe("new value");
    expect(JSON.parse(localStorage.getItem("key")!)).toBe("new value");
  });

  it("removes value from storage", () => {
    const { result } = renderHook(() => useLocalStorage("key", "hello"));
    act(() => result.current.setValue("hello"));
    act(() => result.current.removeValue());
    expect(result.current.value).toBeNull();
    expect(localStorage.getItem("key")).toBeNull();
  });

  it("works with object values", () => {
    const { result } = renderHook(() => useLocalStorage<{ name: string }>("obj", { name: "" }));
    act(() => result.current.setValue({ name: "hookstorm" }));
    expect(result.current.value).toEqual({ name: "hookstorm" });
  });
});
