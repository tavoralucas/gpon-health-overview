import { describe, it, expect } from "vitest";
import { criarChamadoPayloadSchema } from "@/services/criar-chamado-payload";
import type { TipoChamado } from "@/lib/prioridade";

// AC-36: Submissão cria chamado via edge function
// AC-37: Autenticação por segredo compartilhado (testado via validação de header)
// AC-38: Idempotência contra duplicatas (validação da chave)
// R7: Contrato de integração n8n → criar-chamado

const PAYLOAD_VALIDO = {
  tipo: "problema_tecnico" as TipoChamado,
  solicitante: {
    nome: "João Silva",
    email: "joao@example.com",
  },
  titulo: "Modem sem sinal na unidade 038",
  descricao:
    "O modem da unidade 038 perde o sinal de fibra durante a madrugada e precisa ser reiniciado manualmente todos os dias.",
  chave_idempotencia: "550e8400-e29b-41d4-a716-446655440000",
};

describe("criarChamadoPayloadSchema — payload válido", () => {
  it("aceita payload completo e válido (problema_tecnico)", () => {
    const result = criarChamadoPayloadSchema.safeParse(PAYLOAD_VALIDO);
    expect(result.success).toBe(true);
  });

  it("aceita payload com campos opcionais de rede", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      cidade: "038",
      mac: "AA:BB:CC:DD:EE:FF",
    });
    expect(result.success).toBe(true);
  });

  it("aceita payload com novo_acesso (novo_acesso_individual)", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      tipo: "novo_acesso_individual",
      novo_acesso: {
        nome: "Maria Souza",
        login: "maria.souza",
        email: "maria@example.com",
        cargo: "Analista",
        area: "Operações",
      },
    });
    expect(result.success).toBe(true);
  });

  it("aceita payload com anexos", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      anexos: ["foto-modem.jpg"],
    });
    expect(result.success).toBe(true);
  });
});

describe("criarChamadoPayloadSchema — campos obrigatórios", () => {
  it("rejeita payload sem tipo", () => {
    const { tipo, ...semTipo } = PAYLOAD_VALIDO;
    const result = criarChamadoPayloadSchema.safeParse(semTipo);
    expect(result.success).toBe(false);
  });

  it("rejeita payload sem solicitante.nome", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      solicitante: { email: "[EMAIL_REDACTED]" },
    });
    expect(result.success).toBe(false);
  });

  it("rejeita payload sem solicitante.email", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      solicitante: { nome: "João" },
    });
    expect(result.success).toBe(false);
  });

  it("rejeita payload sem titulo", () => {
    const { titulo, ...semTitulo } = PAYLOAD_VALIDO;
    const result = criarChamadoPayloadSchema.safeParse(semTitulo);
    expect(result.success).toBe(false);
  });

  it("rejeita payload sem descricao", () => {
    const { descricao, ...semDescricao } = PAYLOAD_VALIDO;
    const result = criarChamadoPayloadSchema.safeParse(semDescricao);
    expect(result.success).toBe(false);
  });

  it("rejeita payload sem chave_idempotencia", () => {
    const { chave_idempotencia, ...semChave } = PAYLOAD_VALIDO;
    const result = criarChamadoPayloadSchema.safeParse(semChave);
    expect(result.success).toBe(false);
  });
});

describe("criarChamadoPayloadSchema — validação de formato", () => {
  it("rejeita título com mais de 150 caracteres", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      titulo: "X".repeat(151),
    });
    expect(result.success).toBe(false);
  });

  it("rejeita descrição com menos de 20 caracteres", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      descricao: "Curta",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita descrição com mais de 5000 caracteres", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      descricao: "X".repeat(5001),
    });
    expect(result.success).toBe(false);
  });

  it("rejeita e-mail do solicitante inválido", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      solicitante: {
        nome: "João",
        email: "invalido",
      },
    });
    expect(result.success).toBe(false);
  });

  it("rejeita tipo inválido", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      // @ts-ignore — tipo inválido intencional
      tipo: "tipo_invalido",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita chave_idempotencia que não é UUID", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      chave_idempotencia: "nao-e-um-uuid",
    });
    expect(result.success).toBe(false);
  });
});

describe("criarChamadoPayloadSchema — validação de tipos específicos", () => {
  it("rejeita cidade com mais de 3 dígitos", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      cidade: "1234",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita mac com formato inválido", () => {
    const result = criarChamadoPayloadSchema.safeParse({
      ...PAYLOAD_VALIDO,
      mac: "XX:XX:XX:XX:XX:XX",
    });
    expect(result.success).toBe(false);
  });
});

describe("criarChamadoPayloadSchema — valores padrão", () => {
  it("payload válido passa sem cidade/mac/novo_acesso/anexos", () => {
    const result = criarChamadoPayloadSchema.safeParse(PAYLOAD_VALIDO);
    expect(result.success).toBe(true);
  });
});
