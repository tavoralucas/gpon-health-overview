import { describe, expect, it } from "vitest";
import {
  loteSchema,
  novoAcessoSchema,
  validarCabecalhosCsv,
} from "@/components/solicitacao/novo-acesso-schema";

const valido = {
  nomeSolicitante: "Maria Souza",
  emailSolicitante: "solicitante@empresa.com",
  nomeUsuario: "João Silva",
  loginUsuario: "joao.silva",
  emailUsuario: "joao.silva@empresa.com",
  cargo: "Analista",
  area: "Operações",
};

describe("novoAcessoSchema", () => {
  it("aceita cadastro individual completo", () => {
    expect(novoAcessoSchema.safeParse(valido).success).toBe(true);
  });

  it("rejeita campos obrigatórios vazios", () => {
    const resultado = novoAcessoSchema.safeParse({ ...valido, nomeUsuario: "" });
    expect(resultado.success).toBe(false);
  });

  it("rejeita e-mail inválido", () => {
    const resultado = novoAcessoSchema.safeParse({ ...valido, emailUsuario: "sem-arroba" });
    expect(resultado.success).toBe(false);
  });
});

describe("loteSchema", () => {
  it("exige nome e e-mail do solicitante", () => {
    expect(
      loteSchema.safeParse({ nomeSolicitante: "Maria", emailSolicitante: "maria@empresa.com" })
        .success
    ).toBe(true);
    expect(
      loteSchema.safeParse({ nomeSolicitante: "", emailSolicitante: "x@y.com" }).success
    ).toBe(false);
  });
});

describe("validarCabecalhosCsv", () => {
  it("aceita cabeçalhos corretos com vírgula", () => {
    expect(validarCabecalhosCsv("Login,Colaborador,Email,Cargo,Operação")).toBeNull();
  });

  it("aceita cabeçalhos corretos com ponto e vírgula", () => {
    expect(validarCabecalhosCsv("Login;Colaborador;Email;Cargo;Operação")).toBeNull();
  });

  it("rejeita quando falta uma coluna obrigatória", () => {
    const erro = validarCabecalhosCsv("Login,Colaborador,Email,Cargo");
    expect(erro).toContain("Operação");
  });

  it("rejeita cabeçalho divergente", () => {
    const erro = validarCabecalhosCsv("Login,Colaborador,E-mail,Cargo,Operação");
    expect(erro).toContain("Email");
  });
});
