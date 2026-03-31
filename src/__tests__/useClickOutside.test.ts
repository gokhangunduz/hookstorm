import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import useClickOutside from "../useClickOutside";

describe("useClickOutside", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("initializes with isOutside false", () => {
    const { result } = renderHook(() => useClickOutside());
    expect(result.current.isOutside).toBe(false);
  });

  it("returns a ref object", () => {
    const { result } = renderHook(() => useClickOutside());
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref).toHaveProperty("current");
  });

  it("calls onClickOutside when clicking outside the element", () => {
    const onClickOutside = vi.fn();
    const { result } = renderHook(() => useClickOutside(onClickOutside));

    // Create container element and assign to ref
    const container = document.createElement("div");
    document.body.appendChild(container);
    Object.defineProperty(result.current.ref, "current", {
      value: container,
      writable: true,
      configurable: true,
    });

    // Click on something outside the container
    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(onClickOutside).toHaveBeenCalled();
    expect(result.current.isOutside).toBe(true);
  });

  it("does not call onClickOutside when element contains the click target", () => {
    const onClickOutside = vi.fn();
    const { result } = renderHook(() => useClickOutside(onClickOutside));

    const container = document.createElement("div");
    const inner = document.createElement("button");
    container.appendChild(inner);
    document.body.appendChild(container);

    Object.defineProperty(result.current.ref, "current", {
      value: container,
      writable: true,
      configurable: true,
    });

    act(() => {
      inner.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it("sets isOutside true on focusin outside the element", () => {
    const onClickOutside = vi.fn();
    const { result } = renderHook(() => useClickOutside(onClickOutside));

    const container = document.createElement("div");
    document.body.appendChild(container);
    Object.defineProperty(result.current.ref, "current", {
      value: container,
      writable: true,
      configurable: true,
    });

    // Focus something outside the container
    act(() => {
      document.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    });

    expect(result.current.isOutside).toBe(true);
    expect(onClickOutside).toHaveBeenCalled();
  });
});
