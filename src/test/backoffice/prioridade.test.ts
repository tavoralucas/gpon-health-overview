import { describe, it, expect } from "vitest";
import { calcularPrioridade } from "@/lib/prioridade";
import type { Urgencia, Impacto, Prioridade } from "@/lib/prioridade";

// AC-26: Prioridade calculada na criação
// AC-27: Prioridade recalculada ao alterar urgência/impacto
// R2: Matriz de prioridade (GLPI 3×3)
//
// Matriz:
//          | local    | setor    | massa
// ---------|----------|----------|--------
// baixa    | baixa    | media    | media
// media    | media    | alta     | alta
// alta     | alta     | critica  | critica

type MatrixEntry = {
  urgencia: Urgencia;
  impacto: Impacto;
  esperado: Prioridade;
};

const CASOS: MatrixEntry[] = [
  // Linha baixa
  { urgencia: "baixa", impacto: "local", esperado: "baixa" },
  { urgencia: "baixa", impacto: "setor", esperado: "media" },
  { urgencia: "baixa", impacto: "massa", esperado: "media" },
  // Linha media
  { urgencia: "media", impacto: "local", esperado: "media" },
  { urgencia: "media", impacto: "setor", esperado: "alta" },
  { urgencia: "media", impacto: "massa", esperado: "alta" },
  // Linha alta
  { urgencia: "alta", impacto: "local", esperado: "alta" },
  { urgencia: "alta", impacto: "setor", esperado: "critica" },
  { urgencia: "alta", impacto: "massa", esperado: "critica" },
];

describe("calcularPrioridade — matriz 3×3 (R2)", () => {
  it.each(CASOS)(
    "retorna $esperado quando urgência=$urgencia e impacto=$impacto",
    ({ urgencia, impacto, esperado }) => {
      const resultado = calcularPrioridade(urgencia, impacto);
      expect(resultado).toBe(esperado);
    }
  );

  it("lança erro para urgência inválida", () => {
    // @ts-expect-error — testando entrada inválida intencionalmente
    expect(() => calcularPrioridade("invalida", "local")).toThrow();
  });

  it("lança erro para impacto inválido", () => {
    // @ts-expect-error — testando entrada inválida intencionalmente
    expect(() => calcularPrioridade("baixa", "invalido")).toThrow();
  });

  it("retorna o tipo correto (string do conjunto Prioridade)", () => {
    const resultado = calcularPrioridade("alta", "massa");
    const prioridades: Prioridade[] = ["baixa", "media", "alta", "critica"];
    expect(prioridades).toContain(resultado);
  });
});
