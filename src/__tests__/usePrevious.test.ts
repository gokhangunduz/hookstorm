import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import usePrevious from "../usePrevious";

describe("usePrevious", () => {
  it("returns undefined on first render", () => {
    const { result } = renderHook(() => usePrevious(0));
    expect(result.current).toBeUndefined();
  });

  it("returns previous value after re-render", () => {
    const { result, rerender } = renderHook(({ val }) => usePrevious(val), {
      initialProps: { val: 1 },
    });
    rerender({ val: 2 });
    expect(result.current).toBe(1);
  });

  it("tracks multiple updates", () => {
    const { result, rerender } = renderHook(({ val }) => usePrevious(val), {
      initialProps: { val: "a" },
    });
    rerender({ val: "b" });
    expect(result.current).toBe("a");
    rerender({ val: "c" });
    expect(result.current).toBe("b");
  });
});
