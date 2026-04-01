import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useRef } from "react";
import useIntersectionObserver from "../useIntersectionObserver";

describe("useIntersectionObserver", () => {
  let observerCallback: IntersectionObserverCallback;
  const mockObserve = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    observerCallback = () => {};
    mockObserve.mockClear();
    mockDisconnect.mockClear();
    vi.stubGlobal(
      "IntersectionObserver",
      class MockIntersectionObserver {
        constructor(cb: IntersectionObserverCallback) {
          observerCallback = cb;
        }
        observe = mockObserve;
        disconnect = mockDisconnect;
      }
    );
  });

  it("returns initial state as not intersecting", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement("div"));
      return useIntersectionObserver(ref);
    });
    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.entry).toBeNull();
  });

  it("updates when element intersects", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement("div"));
      return useIntersectionObserver(ref);
    });

    const mockEntry = { isIntersecting: true } as IntersectionObserverEntry;
    act(() => observerCallback([mockEntry], {} as IntersectionObserver));

    expect(result.current.isIntersecting).toBe(true);
    expect(result.current.entry).toBe(mockEntry);
  });

  it("updates when element leaves viewport", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement("div"));
      return useIntersectionObserver(ref);
    });

    const mockEntry = { isIntersecting: false } as IntersectionObserverEntry;
    act(() => observerCallback([mockEntry], {} as IntersectionObserver));

    expect(result.current.isIntersecting).toBe(false);
  });

  it("observes the target element", () => {
    const element = document.createElement("div");
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(element);
      return useIntersectionObserver(ref);
    });

    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement("div"));
      return useIntersectionObserver(ref);
    });

    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("does not observe when target ref is null", () => {
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useIntersectionObserver(ref);
    });

    expect(mockObserve).not.toHaveBeenCalled();
  });
});
