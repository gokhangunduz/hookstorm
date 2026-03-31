import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useCountdown from "../useCountdown";

describe("useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes with startTime", () => {
    const { result } = renderHook(() => useCountdown(10));
    expect(result.current.timeLeft).toBe(10);
  });

  it("counts down each second after start", () => {
    const { result } = renderHook(() => useCountdown(10, 1));
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.timeLeft).toBe(7);
  });

  it("stops at 0 and does not go negative", () => {
    const { result } = renderHook(() => useCountdown(3, 1));
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(10000));
    expect(result.current.timeLeft).toBe(0);
  });

  it("stops when stop() is called", () => {
    const { result } = renderHook(() => useCountdown(10, 1));
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(2000));
    act(() => result.current.stop());
    const timeAfterStop = result.current.timeLeft;
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.timeLeft).toBe(timeAfterStop);
  });

  it("resets to startTime", () => {
    const { result } = renderHook(() => useCountdown(10, 1));
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(4000));
    act(() => result.current.reset());
    expect(result.current.timeLeft).toBe(10);
  });

  it("stops automatically at stopTime", () => {
    const { result } = renderHook(() => useCountdown(10, 1, 5));
    act(() => result.current.start());
    // Advance one tick at a time so React flushes between each tick,
    // allowing clearInterval to take effect before the next tick fires.
    for (let i = 0; i < 5; i++) {
      act(() => vi.advanceTimersByTime(1000));
    }
    expect(result.current.timeLeft).toBe(5);
    // Verify no more ticks happen after stop
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.timeLeft).toBe(5);
  });

  it("does not start a second interval if start() is called twice", () => {
    const { result } = renderHook(() => useCountdown(10, 1));
    act(() => result.current.start());
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.timeLeft).toBe(8);
  });
});
