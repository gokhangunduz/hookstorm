import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useCounter from "../useCounter";

describe("useCounter", () => {
  it("initializes with 0 by default", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("initializes with provided value", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it("increments by 1 by default", () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it("increments by custom amount", () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => result.current.increment(5));
    expect(result.current.count).toBe(5);
  });

  it("decrements by 1 by default", () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => result.current.decrement());
    expect(result.current.count).toBe(4);
  });

  it("decrements by custom amount", () => {
    const { result } = renderHook(() => useCounter(10));
    act(() => result.current.decrement(3));
    expect(result.current.count).toBe(7);
  });

  it("resets to initial value", () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => result.current.increment(10));
    act(() => result.current.reset());
    expect(result.current.count).toBe(5);
  });
});
