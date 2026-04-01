import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useRef } from "react";
import useResizeObserver from "../useResizeObserver";

describe("useResizeObserver", () => {
  let observerCallback: ResizeObserverCallback;
  const mockObserve = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    observerCallback = () => {};
    mockObserve.mockClear();
    mockDisconnect.mockClear();
    vi.stubGlobal(
      "ResizeObserver",
      class MockResizeObserver {
        constructor(cb: ResizeObserverCallback) {
          observerCallback = cb;
        }
        observe = mockObserve;
        disconnect = mockDisconnect;
      }
    );
  });

  it("returns initial state with zero dimensions", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement("div"));
      return useResizeObserver(ref);
    });

    expect(result.current.width).toBe(0);
    expect(result.current.height).toBe(0);
    expect(result.current.entry).toBeNull();
  });

  it("updates width and height when element resizes", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement("div"));
      return useResizeObserver(ref);
    });

    const mockEntry = {
      contentRect: { width: 320, height: 240 },
    } as ResizeObserverEntry;

    act(() => observerCallback([mockEntry], {} as ResizeObserver));

    expect(result.current.width).toBe(320);
    expect(result.current.height).toBe(240);
    expect(result.current.entry).toBe(mockEntry);
  });

  it("updates on subsequent resize events", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement("div"));
      return useResizeObserver(ref);
    });

    act(() => observerCallback([{ contentRect: { width: 100, height: 50 } } as ResizeObserverEntry], {} as ResizeObserver));
    expect(result.current.width).toBe(100);

    act(() => observerCallback([{ contentRect: { width: 200, height: 100 } } as ResizeObserverEntry], {} as ResizeObserver));
    expect(result.current.width).toBe(200);
    expect(result.current.height).toBe(100);
  });

  it("observes the target element", () => {
    const element = document.createElement("div");
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(element);
      return useResizeObserver(ref);
    });

    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement("div"));
      return useResizeObserver(ref);
    });

    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("does not observe when target ref is null", () => {
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useResizeObserver(ref);
    });

    expect(mockObserve).not.toHaveBeenCalled();
  });
});
