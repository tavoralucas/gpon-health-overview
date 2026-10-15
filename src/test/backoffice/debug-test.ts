import { describe, it, expect } from "vitest";
import { chamadoSchema } from "@/pages/backoffice/Chamados/schema";

const BASE_VALIDO = {
  titulo: "Modem sem sinal na unidade",
  tipo: "problema_tecnico",
  solicitante_nome: "João Silva",
  solicitante_email: "joao@example.com",
  urgencia: "alta",
  impacto: "local",
  descricao: "O modem da unidade 038 perde o sinal de fibra durante a madrugada e precisa ser reiniciado.",
};

describe("debug", () => {
  it("logs error", () => {
    const result = chamadoSchema.safeParse(BASE_VALIDO);
    console.log("RESULT success:", result.success);
    if (!result.success) {
      console.log("ERRORS:", JSON.stringify(result.error.issues, null, 2));
    }
    expect(result.success).toBe(true);
  });
});
