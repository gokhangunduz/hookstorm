import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useDocumentTitle from "../useDocumentTitle";

describe("useDocumentTitle", () => {
  it("returns current document title", () => {
    document.title = "Initial Title";
    const { result } = renderHook(() => useDocumentTitle());
    expect(result.current.title).toBe("Initial Title");
  });

  it("updates document.title when setDocumentTitle is called", () => {
    const { result } = renderHook(() => useDocumentTitle());
    act(() => result.current.setDocumentTitle("New Title"));
    expect(document.title).toBe("New Title");
    expect(result.current.title).toBe("New Title");
  });
});
