import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useTimeout from "../useTimeout";

describe("useTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls callback after the delay", () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1000));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not call callback before delay elapses", () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, 1000));

    act(() => vi.advanceTimersByTime(500));
    expect(callback).not.toHaveBeenCalled();
  });

  it("clear() cancels the pending timeout", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout(callback, 1000));

    act(() => result.current.clear());
    act(() => vi.advanceTimersByTime(1000));
    expect(callback).not.toHaveBeenCalled();
  });

  it("reset() restarts the timer", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout(callback, 1000));

    act(() => vi.advanceTimersByTime(800));
    act(() => result.current.reset());
    act(() => vi.advanceTimersByTime(800));
    // 800ms reset, then 800ms more = not yet 1000ms from reset
    expect(callback).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(200));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("clears timer on unmount", () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useTimeout(callback, 1000));

    unmount();
    act(() => vi.advanceTimersByTime(1000));
    expect(callback).not.toHaveBeenCalled();
  });
});
