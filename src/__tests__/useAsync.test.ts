import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useAsync from "../useAsync";

describe("useAsync", () => {
  it("starts with loading true when immediate is true", () => {
    const asyncFn = vi.fn(() => new Promise<string>(() => {}));
    const { result } = renderHook(() => useAsync(asyncFn));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("starts with loading false when immediate is false", () => {
    const asyncFn = vi.fn(() => Promise.resolve("hello"));
    const { result } = renderHook(() => useAsync(asyncFn, false));
    expect(result.current.loading).toBe(false);
  });

  it("resolves data and sets loading false on success", async () => {
    const asyncFn = vi.fn(() => Promise.resolve("hello"));
    const { result } = renderHook(() => useAsync(asyncFn));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBe("hello");
    expect(result.current.error).toBeNull();
  });

  it("sets error and loading false on failure", async () => {
    const asyncFn = vi.fn(() => Promise.reject(new Error("fetch failed")));
    const { result } = renderHook(() => useAsync(asyncFn));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("fetch failed");
    expect(result.current.data).toBeNull();
  });

  it("execute() can manually trigger the async function", async () => {
    let callCount = 0;
    const asyncFn = vi.fn(() => {
      callCount++;
      return Promise.resolve(`call ${callCount}`);
    });
    const { result } = renderHook(() => useAsync(asyncFn, false));

    expect(asyncFn).not.toHaveBeenCalled();

    await act(async () => {
      result.current.execute();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBe("call 1");
  });

  it("does not update state after unmount", async () => {
    let resolve: (value: string) => void = () => {};
    const asyncFn = vi.fn(
      () => new Promise<string>((res) => { resolve = res; })
    );

    const { result, unmount } = renderHook(() => useAsync(asyncFn));
    unmount();

    // Should not throw / update state after unmount
    await act(async () => { resolve("late"); });
    expect(result.current.data).toBeNull();
  });
});
