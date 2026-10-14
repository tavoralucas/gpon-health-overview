import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useGuidedFlow } from "@/components/solicitacao/GuidedFlow";
import { SolicitacaoForm } from "@/components/solicitacao/SolicitacaoForm";

vi.mock("@/services/solicitacao", () => ({ enviarSolicitacao: vi.fn() }));

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
  it("preserves requester values when navigating back from details", async () => {
    render(<SolicitacaoForm onExit={() => undefined} />);
    fireEvent.change(screen.getByLabelText("Nome ou Login"), { target: { value: "Teste preservado" } });
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "teste@example.com" } });
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Continuar" })); });
    expect(screen.getByRole("heading", { name: "O que aconteceu?" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Voltar" }));
    expect(screen.getByLabelText("Nome ou Login")).toHaveValue("Teste preservado");
    expect(screen.getByLabelText("E-mail")).toHaveValue("teste@example.com");
  });
});
