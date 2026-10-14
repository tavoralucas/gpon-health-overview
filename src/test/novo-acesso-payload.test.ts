import { describe, it, expect } from "vitest";
import { montarCamposNovoAcesso, extrairMensagemErro } from "@/services/solicitacao";
import { novoAcessoSchema } from "@/components/solicitacao/novo-acesso-schema";

describe("payload novo acesso", () => {
  it("individual mapeia nome/email do solicitante e texto >= 20", () => {
    const r = montarCamposNovoAcesso({
      modo: "individual", nomeSolicitante: "Ana", emailSolicitante: "ana@x.com",
      nomeUsuario: "João", loginUsuario: "joao", emailUsuario: "j@x.com", cargo: "Analista", area: "Ops",
    });
    expect(r.nome).toBe("Ana");
    expect(r.email).toBe("ana@x.com");
    expect(r.titulo).toBe("Novo acesso - João");
    expect(r.texto.length).toBeGreaterThanOrEqual(20);
  });
  it("lote usa nome do arquivo no título", () => {
    const r = montarCamposNovoAcesso({
      modo: "lote", nomeSolicitante: "Ana", emailSolicitante: "ana@x.com",
      arquivo: new File(["a"], "usuarios.xlsx"),
    });
    expect(r.titulo).toBe("Novo acesso em lote - usuarios.xlsx");
    expect(r.texto.length).toBeGreaterThanOrEqual(20);
  });
  it("e-mail do solicitante é obrigatório no individual", () => {
    const r = novoAcessoSchema.safeParse({
      nomeSolicitante: "Ana", emailSolicitante: "", nomeUsuario: "J", loginUsuario: "j",
      emailUsuario: "j@x.com", cargo: "A", area: "B",
    });
    expect(r.success).toBe(false);
  });
  it("extrai erros de validação do n8n", () => {
    const msg = extrairMensagemErro({
      error: "HTTP 400",
      details: JSON.stringify([{ validacao: { erros: { email: "E-mail inválido." } } }]),
    });
    expect(msg).toBe("E-mail inválido.");
  });
});
