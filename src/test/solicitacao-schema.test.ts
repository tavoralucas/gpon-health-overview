import { describe, it, expect } from "vitest";
import { solicitacaoSchema } from "@/components/solicitacao/schema";

const base = {
  nome: "Lucas Távora",
  email: "lucas.tavora@claro.com.br",
  titulo: "Modem sem sinal",
  texto: "O modem da unidade perde o sinal de fibra durante a madrugada.",
};

describe("solicitacaoSchema: Código da Cidade e Endereço MAC são opcionais", () => {
  it("aceita o envio sem Código da Cidade e sem Endereço MAC", () => {
    const result = solicitacaoSchema.safeParse({
      ...base,
      codigoCidade: "",
      enderecoMac: "",
    });
    expect(result.success).toBe(true);
  });

  it("aceita o envio quando os dois campos não são informados", () => {
    const result = solicitacaoSchema.safeParse(base);
    expect(result.success).toBe(true);
  });

  it("continua validando o formato quando preenchidos", () => {
    const invalid = solicitacaoSchema.safeParse({
      ...base,
      codigoCidade: "1234",
      enderecoMac: "ZZ:ZZ",
    });
    expect(invalid.success).toBe(false);
    const messages = invalid.error.issues.map((i) => i.message);
    expect(messages).toContain(
      "Informe apenas números (máx. 3 dígitos, ex.: 038)."
    );
    expect(messages).toContain(
      "Informe um endereço MAC válido (ex.: AA:BB:CC:DD:EE:FF)."
    );
  });

  it("aceita valores preenchidos em formato válido", () => {
    const valid = solicitacaoSchema.safeParse({
      ...base,
      codigoCidade: "038",
      enderecoMac: "AA:BB:CC:DD:EE:FF",
    });
    expect(valid.success).toBe(true);
  });

  it("mantém os demais campos obrigatórios", () => {
    const result = solicitacaoSchema.safeParse({});
    expect(result.success).toBe(false);
    const messages = result.error.issues.map((i) => i.message);
    expect(messages).toContain("O campo Nome ou Login é obrigatório.");
    expect(messages).toContain("O campo E-mail é obrigatório.");
    expect(messages).toContain("O campo Título é obrigatório.");
  });
});
