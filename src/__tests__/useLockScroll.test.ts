import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import useLockScroll from "../useLockScroll";

describe("useLockScroll", () => {
  afterEach(() => {
    // Reset body overflow after each test
    document.body.style.overflow = "";
  });

  it("initializes as unlocked by default", () => {
    const { result } = renderHook(() => useLockScroll());
    expect(result.current.isLocked).toBe(false);
    expect(document.body.style.overflow).toBe("");
  });

  it("initializes as locked when initialLock is true", () => {
    const { result } = renderHook(() => useLockScroll(true));
    expect(result.current.isLocked).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("locks scroll when toggleScrollLock(true) is called", () => {
    const { result } = renderHook(() => useLockScroll());
    act(() => result.current.toggleScrollLock(true));
    expect(result.current.isLocked).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores scroll when toggleScrollLock(false) is called", () => {
    const { result } = renderHook(() => useLockScroll(true));
    act(() => result.current.toggleScrollLock(false));
    expect(result.current.isLocked).toBe(false);
    expect(document.body.style.overflow).toBe("");
  });

  it("toggles state when called without argument", () => {
    const { result } = renderHook(() => useLockScroll());
    act(() => result.current.toggleScrollLock());
    expect(result.current.isLocked).toBe(true);
    act(() => result.current.toggleScrollLock());
    expect(result.current.isLocked).toBe(false);
  });

  it("keeps scroll locked while any instance is still locked", () => {
    const hook1 = renderHook(() => useLockScroll());
    const hook2 = renderHook(() => useLockScroll());

    act(() => hook1.result.current.toggleScrollLock(true));
    act(() => hook2.result.current.toggleScrollLock(true));
    act(() => hook1.result.current.toggleScrollLock(false));

    // hook2 is still locked, so body should still be hidden
    expect(document.body.style.overflow).toBe("hidden");

    act(() => hook2.result.current.toggleScrollLock(false));
    expect(document.body.style.overflow).toBe("");
  });
});
