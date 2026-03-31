import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useCopyToClipboard from "../useCopyToClipboard";

describe("useCopyToClipboard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes with copied false", () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current.copied).toBe(false);
  });

  it("sets copied to true after successful copy", async () => {
    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => {
      result.current.copyToClipboard("test text");
    });
    expect(result.current.copied).toBe(true);
  });

  it("resets copied to false after 2 seconds", async () => {
    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => {
      result.current.copyToClipboard("test text");
    });
    expect(result.current.copied).toBe(true);
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.copied).toBe(false);
  });

  it("handles clipboard write failure gracefully", async () => {
    (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Permission denied")
    );
    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => {
      result.current.copyToClipboard("test text");
    });
    expect(result.current.copied).toBe(false);
  });
});
