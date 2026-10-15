import { describe, it, expect } from "vitest";
import {
  transicoesPermitidas,
  validarTransicao,
  type StatusTicket,
} from "@/lib/transitions";

// R1. Workflow de status — tabela de transições
//
// | De          | Para           | Gatilho
// | novo        | atribuido      | Atribuição de agente
// | novo        | atendimento    | Agente inicia diretamente
// | atribuido   | atendimento    | Início do atendimento
// | atendimento | espera         | Aguardando cliente/terceiro
// | atendimento | resolvido      | Concluído → e-mail
// | espera      | atendimento    | Retomada
// | espera      | resolvido      | Resolução sem retorno
// | resolvido   | fechado        | Encerramento → e-mail
// | resolvido   | reaberto       | Reabertura → e-mail
// | fechado     | reaberto       | Reabertura → e-mail
// | reaberto    | atendimento    | Retomada obrigatória

const TODOS_STATUS: StatusTicket[] = [
  "novo",
  "atribuido",
  "atendimento",
  "espera",
  "resolvido",
  "fechado",
  "reaberto",
];

type TransicaoValida = {
  de: StatusTicket;
  para: StatusTicket;
};

const TRANSICOES_VALIDAS: TransicaoValida[] = [
  { de: "novo", para: "atribuido" },
  { de: "novo", para: "atendimento" },
  { de: "atribuido", para: "atendimento" },
  { de: "atendimento", para: "espera" },
  { de: "atendimento", para: "resolvido" },
  { de: "espera", para: "atendimento" },
  { de: "espera", para: "resolvido" },
  { de: "resolvido", para: "fechado" },
  { de: "resolvido", para: "reaberto" },
  { de: "fechado", para: "reaberto" },
  { de: "reaberto", para: "atendimento" },
];

describe("validarTransicao — transições permitidas (R1)", () => {
  it.each(TRANSICOES_VALIDAS)(
    "aceita transição $de → $para",
    ({ de, para }) => {
      expect(validarTransicao(de, para)).toBe(true);
    }
  );

  it("rejeita transição novo → resolvido (pularia etapas)", () => {
    expect(validarTransicao("novo", "resolvido")).toBe(false);
  });

  it("rejeita transição novo → fechado (pularia etapas)", () => {
    expect(validarTransicao("novo", "fechado")).toBe(false);
  });

  it("rejeita transição atribuido → fechado", () => {
    expect(validarTransicao("atribuido", "fechado")).toBe(false);
  });

  it("rejeita transição atribuido → reaberto (nunca foi resolvido)", () => {
    expect(validarTransicao("atribuido", "reaberto")).toBe(false);
  });

  it("rejeita transição atendimento → fechado (precisa resolver antes)", () => {
    expect(validarTransicao("atendimento", "fechado")).toBe(false);
  });

  it("rejeita transição novo → novo (mesmo status)", () => {
    expect(validarTransicao("novo", "novo")).toBe(false);
  });

  it("rejeita transição fechado → resolvido (fechado é terminal)", () => {
    expect(validarTransicao("fechado", "resolvido")).toBe(false);
  });

  it("rejeita toda transição que não está na tabela R1", () => {
    for (const de of TODOS_STATUS) {
      for (const para of TODOS_STATUS) {
        const valida = TRANSICOES_VALIDAS.some(
          (t) => t.de === de && t.para === para
        );
        expect(validarTransicao(de, para)).toBe(valida);
      }
    }
  });
});

describe("transicoesPermitidas — lista de destinos por status", () => {
  it("retorna [atribuido, atendimento] para novo", () => {
    expect(transicoesPermitidas("novo")).toEqual([
      "atribuido",
      "atendimento",
    ]);
  });

  it("retorna [atendimento] para atribuido", () => {
    expect(transicoesPermitidas("atribuido")).toEqual(["atendimento"]);
  });

  it("retorna [espera, resolvido] para atendimento", () => {
    expect(transicoesPermitidas("atendimento")).toEqual([
      "espera",
      "resolvido",
    ]);
  });

  it("retorna [atendimento, resolvido] para espera", () => {
    expect(transicoesPermitidas("espera")).toEqual([
      "atendimento",
      "resolvido",
    ]);
  });

  it("retorna [fechado, reaberto] para resolvido", () => {
    expect(transicoesPermitidas("resolvido")).toEqual([
      "fechado",
      "reaberto",
    ]);
  });

  it("retorna [reaberto] para fechado", () => {
    expect(transicoesPermitidas("fechado")).toEqual(["reaberto"]);
  });

  it("retorna [atendimento] para reaberto", () => {
    expect(transicoesPermitidas("reaberto")).toEqual(["atendimento"]);
  });
});

describe("Atribuição — regras especiais (AC-21, AC-22)", () => {
  it("atribuição em novo → muda para atribuido", () => {
    // Atribuição inicial: novo + agente → atribuido
    expect(validarTransicao("novo", "atribuido")).toBe(true);
  });

  it("reatribuição em atendimento → preserva status", () => {
    // Reatribuição não altera status (AC-22)
    // O status permanece o mesmo; a reatribuição é um evento separado
    expect(validarTransicao("atendimento", "atendimento")).toBe(false);
  });
});
