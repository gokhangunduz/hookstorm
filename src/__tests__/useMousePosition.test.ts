import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useMousePosition from "../useMousePosition";

describe("useMousePosition", () => {
  let pendingRAF: FrameRequestCallback | null = null;
  let rafId = 0;

  const flushRAF = () => {
    if (pendingRAF) {
      const cb = pendingRAF;
      pendingRAF = null;
      cb(0);
    }
  };

  beforeEach(() => {
    pendingRAF = null;
    rafId = 0;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      pendingRAF = cb;
      return ++rafId;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {
      pendingRAF = null;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("initializes at (0, 0)", () => {
    const { result } = renderHook(() => useMousePosition());
    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(0);
  });

  it("updates position on mousemove after RAF flush", () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 150, clientY: 200 }));
      flushRAF();
    });

    expect(result.current.x).toBe(150);
    expect(result.current.y).toBe(200);
  });

  it("uses the latest pending position when multiple events fire before RAF flush", () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 50, clientY: 60 }));
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 100, clientY: 120 }));
      flushRAF(); // flushes once; should use latest pendingRef ({100, 120})
    });

    expect(result.current.x).toBe(100);
    expect(result.current.y).toBe(120);
  });
});
