import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useToggle from "../useToggle";

describe("useToggle", () => {
  it("initializes with false by default", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  it("initializes with provided value", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.value).toBe(true);
  });

  it("toggles value on each call", () => {
    const { result } = renderHook(() => useToggle());
    act(() => result.current.toggle());
    expect(result.current.value).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.value).toBe(false);
  });

  it("sets value directly when argument is passed", () => {
    const { result } = renderHook(() => useToggle());
    act(() => result.current.toggle(true));
    expect(result.current.value).toBe(true);
    act(() => result.current.toggle(false));
    expect(result.current.value).toBe(false);
  });
});
