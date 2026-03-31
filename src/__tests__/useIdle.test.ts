import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useIdle from "../useIdle";

describe("useIdle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes as not idle", () => {
    const { result } = renderHook(() => useIdle(1000));
    expect(result.current.isIdle).toBe(false);
  });

  it("becomes idle after timeout elapses", () => {
    const { result } = renderHook(() => useIdle(1000));
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.isIdle).toBe(true);
  });

  it("resets idle timer on user activity", () => {
    const { result } = renderHook(() => useIdle(1000));

    act(() => vi.advanceTimersByTime(800));
    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove"));
    });
    act(() => vi.advanceTimersByTime(800));

    // Only 800ms have passed since last activity, not idle yet
    expect(result.current.isIdle).toBe(false);
  });

  it("becomes idle after timeout following the last activity", () => {
    const { result } = renderHook(() => useIdle(1000));

    act(() => vi.advanceTimersByTime(800));
    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove"));
    });
    act(() => vi.advanceTimersByTime(1000));

    expect(result.current.isIdle).toBe(true);
  });

  it("resetIdle manually resets idle state", () => {
    const { result } = renderHook(() => useIdle(1000));
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.isIdle).toBe(true);

    act(() => result.current.resetIdle());
    expect(result.current.isIdle).toBe(false);
  });
});
