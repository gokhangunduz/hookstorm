import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useKeyPress from "../useKeyPress";

describe("useKeyPress", () => {
  it("initializes with isPressed false", () => {
    const { result } = renderHook(() => useKeyPress("Enter"));
    expect(result.current.isPressed).toBe(false);
  });

  it("returns the original key string", () => {
    const { result } = renderHook(() => useKeyPress("Escape"));
    expect(result.current.key).toBe("Escape");
  });

  it("sets isPressed true on keydown", () => {
    const { result } = renderHook(() => useKeyPress("Enter"));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });

    expect(result.current.isPressed).toBe(true);
  });

  it("sets isPressed false on keyup", () => {
    const { result } = renderHook(() => useKeyPress("Enter"));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
    });

    expect(result.current.isPressed).toBe(false);
  });

  it("is case-insensitive (target: 'enter', event key: 'Enter')", () => {
    const { result } = renderHook(() => useKeyPress("enter"));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });

    expect(result.current.isPressed).toBe(true);
  });

  it("is case-insensitive (target: 'ESCAPE', event key: 'Escape')", () => {
    const { result } = renderHook(() => useKeyPress("ESCAPE"));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(result.current.isPressed).toBe(true);
  });

  it("does not set isPressed for a different key", () => {
    const { result } = renderHook(() => useKeyPress("Enter"));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(result.current.isPressed).toBe(false);
  });
});
