import { describe, it, expect } from "vitest";
import { chamadoSchema } from "@/pages/backoffice/Chamados/schema";
import type { TipoChamado, Urgencia, Impacto } from "@/lib/prioridade";

// AC-09: Criação com campos obrigatórios
// AC-10: Validação dos campos obrigatórios
// AC-11, AC-12: Anexos
// R3: Campos por tipo de chamado

const BASE_VALIDO = {
  titulo: "Modem sem sinal na unidade",
  tipo: "problema_tecnico" as TipoChamado,
  solicitante_nome: "João Silva",
  solicitante_email: "joao@example.com",
  urgencia: "alta" as Urgencia,
  impacto: "local" as Impacto,
  descricao: "O modem da unidade 038 perde o sinal de fibra durante a madrugada e precisa ser reiniciado.",
};

describe("chamadoSchema — campos comuns obrigatórios (R3)", () => {
  it("aceita chamado completo e válido", () => {
    const result = chamadoSchema.safeParse(BASE_VALIDO);
    expect(result.success).toBe(true);
  });

  it("rejeita título vazio", () => {
    const result = chamadoSchema.safeParse({ ...BASE_VALIDO, titulo: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes("titulo"))).toBe(
        true
      );
    }
  });

  it("rejeita título com mais de 150 caracteres", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      titulo: "X".repeat(151),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes("titulo"))).toBe(
        true
      );
    }
  });

  it("rejeita tipo inválido", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      // @ts-expect-error — tipo inválido intencional
      tipo: "tipo_invalido",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita nome do solicitante vazio", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      solicitante_nome: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.includes("solicitante_nome"))
      ).toBe(true);
    }
  });

  it("rejeita nome do solicitante com mais de 100 caracteres", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      solicitante_nome: "X".repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it("rejeita e-mail do solicitante inválido", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      solicitante_email: "invalido",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.includes("solicitante_email"))
      ).toBe(true);
    }
  });

  it("rejeita e-mail do solicitante com mais de 255 caracteres", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      solicitante_email: `${"a".repeat(246)}@example.com`,
    });
    expect(result.success).toBe(false);
  });

  it("rejeita urgência inválida", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      // @ts-expect-error — urgência inválida intencional
      urgencia: "urgentissima",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita impacto inválido", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      // @ts-expect-error — impacto inválido intencional
      impacto: "global",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita descrição com menos de 20 caracteres", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      descricao: "Curta",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.includes("descricao"))
      ).toBe(true);
    }
  });

  it("rejeita descrição com mais de 5000 caracteres", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      descricao: "X".repeat(5001),
    });
    expect(result.success).toBe(false);
  });
});

describe("chamadoSchema — campos específicos por tipo (R3)", () => {
  it("problema_tecnico aceita codigo_cidade e endereco_mac opcionais", () => {
    const comRede = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      codigo_cidade: "038",
      endereco_mac: "AA:BB:CC:DD:EE:FF",
    });
    expect(comRede.success).toBe(true);
  });

  it("problema_tecnico aceita chamado sem dados de rede", () => {
    const semRede = chamadoSchema.safeParse(BASE_VALIDO);
    expect(semRede.success).toBe(true);
  });

  it("problema_tecnico rejeita codigo_cidade com mais de 3 dígitos", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      codigo_cidade: "1234",
    });
    expect(result.success).toBe(false);
  });

  it("problema_tecnico rejeita endereco_mac com formato inválido", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      endereco_mac: "ZZ:ZZ:ZZ:ZZ:ZZ:ZZ",
    });
    expect(result.success).toBe(false);
  });

  it("novo_acesso_individual aceita campos opcionais do novo usuário", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      tipo: "novo_acesso_individual",
      novo_usuario: {
        nome: "Maria Souza",
        login: "maria.souza",
        email: "maria@example.com",
        cargo: "Analista",
        area: "Operações",
      },
    });
    expect(result.success).toBe(true);
  });

  it("novo_acesso_individual aceita sem dados de novo usuário (criação manual)", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      tipo: "novo_acesso_individual",
    });
    expect(result.success).toBe(true);
  });

  it("novo_acesso_lote aceita arquivo opcional", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      tipo: "novo_acesso_lote",
    });
    expect(result.success).toBe(true);
  });
});

describe("chamadoSchema — anexos (R4)", () => {
  it("aceita lista vazia de anexos", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      anexos: [],
    });
    expect(result.success).toBe(true);
  });

  it("rejeita mais de 5 anexos", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      anexos: Array(6).fill({ nome: "foto.jpg", tamanho: 1000 }),
    });
    expect(result.success).toBe(false);
  });

  it("rejeita anexo com mais de 10 MB", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      anexos: [{ nome: "grande.pdf", tamanho: 11 * 1024 * 1024 }],
    });
    expect(result.success).toBe(false);
  });
});

describe("chamadoSchema — campos calculados não devem ser enviados", () => {
  it("rejeita prioridade explícita (deve ser calculada pelo sistema)", () => {
    const result = chamadoSchema.safeParse({
      ...BASE_VALIDO,
      // @ts-expect-error — prioridade não deve estar no schema de input
      prioridade: "alta",
    });
    expect(result.success).toBe(false);
  });
});
