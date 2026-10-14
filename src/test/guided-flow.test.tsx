import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useGuidedFlow } from "@/components/solicitacao/GuidedFlow";

describe("guided flow navigation", () => {
  it("does not advance when the current fields are invalid", async () => {
    const { result } = renderHook(() => useGuidedFlow());
    await act(async () => { await result.current.advance(async () => false); });
    expect(result.current.step).toBe(1);
  });
  it("advances after validation and stops at review", async () => {
    const { result } = renderHook(() => useGuidedFlow());
    await act(async () => { await result.current.advance(async () => true); });
    expect(result.current.step).toBe(2);
    await act(async () => { await result.current.advance(async () => true); });
    expect(result.current.step).toBe(3);
    await act(async () => { await result.current.advance(async () => true); });
    expect(result.current.step).toBe(3);
  });
});
