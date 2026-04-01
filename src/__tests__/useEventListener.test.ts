import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useEventListener from "../useEventListener";

describe("useEventListener", () => {
  it("adds event listener to window by default", () => {
    const handler = vi.fn();
    const addSpy = vi.spyOn(window, "addEventListener");

    renderHook(() => useEventListener("click", handler));

    expect(addSpy).toHaveBeenCalledWith("click", expect.any(Function));
    addSpy.mockRestore();
  });

  it("removes event listener on unmount", () => {
    const handler = vi.fn();
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useEventListener("click", handler));
    unmount();

    expect(removeSpy).toHaveBeenCalledWith("click", expect.any(Function));
    removeSpy.mockRestore();
  });

  it("calls handler when event fires on window", () => {
    const handler = vi.fn();
    renderHook(() => useEventListener("click", handler));

    window.dispatchEvent(new Event("click"));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("adds event listener to a specific element", () => {
    const element = document.createElement("div");
    const ref = { current: element };
    const handler = vi.fn();
    const addSpy = vi.spyOn(element, "addEventListener");

    renderHook(() => useEventListener("click", handler, ref));

    expect(addSpy).toHaveBeenCalledWith("click", expect.any(Function));
  });

  it("calls handler when event fires on specific element", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const ref = { current: element };
    const handler = vi.fn();

    renderHook(() => useEventListener("click", handler, ref));
    element.dispatchEvent(new Event("click"));

    expect(handler).toHaveBeenCalledTimes(1);
    document.body.removeChild(element);
  });

  it("always calls the latest handler without re-registering", () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    let currentHandler = handler1;

    const { rerender } = renderHook(() => useEventListener("click", currentHandler));

    currentHandler = handler2;
    rerender();

    window.dispatchEvent(new Event("click"));

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});
