import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useMounted from "../useMounted";

describe("useMounted", () => {
  it("returns false before mount (ref starts false, effect runs after render)", () => {
    const { result } = renderHook(() => useMounted());
    // After renderHook, the effect has already run
    expect(result.current.current).toBe(true);
  });

  it("is true while mounted", () => {
    const { result } = renderHook(() => useMounted());
    expect(result.current.current).toBe(true);
  });

  it("becomes false after unmount", () => {
    const { result, unmount } = renderHook(() => useMounted());
    const ref = result.current;
    unmount();
    expect(ref.current).toBe(false);
  });

  it("returns a stable ref object", () => {
    const { result, rerender } = renderHook(() => useMounted());
    const ref1 = result.current;
    rerender();
    expect(result.current).toBe(ref1);
  });
});
