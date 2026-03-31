import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useInterval from "../useInterval";

describe("useInterval", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls callback at each interval tick", () => {
    const callback = vi.fn();
    renderHook(() => useInterval(callback, 1000));

    vi.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("does not call callback when delay is null (paused)", () => {
    const callback = vi.fn();
    renderHook(() => useInterval(callback, null));

    vi.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it("clears interval on unmount", () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useInterval(callback, 1000));

    vi.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);

    unmount();
    vi.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("always uses the latest callback without restarting the interval", () => {
    let count = 0;
    const getCallback = () => () => { count++; };

    const { rerender } = renderHook(({ cb }) => useInterval(cb, 1000), {
      initialProps: { cb: getCallback() },
    });

    vi.advanceTimersByTime(1000);
    expect(count).toBe(1);

    const newCallback = vi.fn();
    rerender({ cb: newCallback });

    vi.advanceTimersByTime(1000);
    expect(newCallback).toHaveBeenCalledTimes(1);
    expect(count).toBe(1); // old callback not called again
  });

  it("restarts interval when delay changes", () => {
    const callback = vi.fn();
    const { rerender } = renderHook(({ delay }) => useInterval(callback, delay), {
      initialProps: { delay: 1000 as number | null },
    });

    vi.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);

    rerender({ delay: 500 });
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(4);
  });
});
