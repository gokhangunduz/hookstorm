import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useDebounce from "../useDebounce";

describe("useDebounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("does not update value before delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "initial" },
    });
    rerender({ value: "updated" });
    expect(result.current).toBe("initial");
  });

  it("updates value after delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "initial" },
    });
    rerender({ value: "updated" });
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("updated");
  });

  it("resets timer when value changes before delay completes", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "initial" },
    });
    rerender({ value: "first" });
    act(() => vi.advanceTimersByTime(150));
    rerender({ value: "second" });
    act(() => vi.advanceTimersByTime(150));
    expect(result.current).toBe("initial");
    act(() => vi.advanceTimersByTime(150));
    expect(result.current).toBe("second");
  });

  it("works with number values", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
      initialProps: { value: 0 },
    });
    rerender({ value: 42 });
    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe(42);
  });
});
