import { z } from "zod";

export const CABECALHOS_LOTE = ["Login", "Colaborador", "Email", "Cargo", "Operação"] as const;

export const MAX_LOTE_SIZE = 5 * 1024 * 1024; // 5 MB

export const novoAcessoSchema = z.object({
  nomeSolicitante: z
    .string()
    .trim()
    .min(1, { message: "O campo Nome do solicitante é obrigatório." })
    .max(100, { message: "O nome do solicitante deve ter no máximo 100 caracteres." }),
  nomeUsuario: z
    .string()
    .trim()
    .min(1, { message: "O campo Nome do novo usuário é obrigatório." })
    .max(100, { message: "O nome do novo usuário deve ter no máximo 100 caracteres." }),
  loginUsuario: z
    .string()
    .trim()
    .min(1, { message: "O campo Login do novo usuário é obrigatório." })
    .max(60, { message: "O login deve ter no máximo 60 caracteres." }),
  emailUsuario: z
    .string()
    .trim()
    .min(1, { message: "O campo E-mail do novo usuário é obrigatório." })
    .email({ message: "Informe um e-mail válido." })
    .max(255, { message: "O e-mail deve ter no máximo 255 caracteres." }),
  cargo: z
    .string()
    .trim()
    .min(1, { message: "O campo Cargo/Papel é obrigatório." })
    .max(100, { message: "O cargo deve ter no máximo 100 caracteres." }),
  area: z
    .string()
    .trim()
    .min(1, { message: "O campo Área é obrigatório." })
    .max(100, { message: "A área deve ter no máximo 100 caracteres." }),
});

export type NovoAcessoFormValues = z.infer<typeof novoAcessoSchema>;

export const loteSchema = z.object({
  nomeSolicitante: z
    .string()
    .trim()
    .min(1, { message: "O campo Nome do solicitante é obrigatório." })
    .max(100, { message: "O nome do solicitante deve ter no máximo 100 caracteres." }),
  emailSolicitante: z
    .string()
    .trim()
    .min(1, { message: "O campo E-mail do solicitante é obrigatório." })
    .email({ message: "Informe um e-mail válido." })
    .max(255, { message: "O e-mail deve ter no máximo 255 caracteres." }),
});

export type LoteFormValues = z.infer<typeof loteSchema>;

/**
 * Valida a lista de cabeçalhos de um arquivo de lote (CSV ou Excel).
 * Retorna null quando válido ou a mensagem de erro.
 */
export function validarCabecalhos(colunas: string[]): string | null {
  const faltando = CABECALHOS_LOTE.filter((c) => !colunas.includes(c));
  if (faltando.length > 0) {
    return `O arquivo não possui os cabeçalhos obrigatórios: ${faltando.join(
      ", "
    )}. Ajuste o arquivo para conter exatamente as colunas: ${CABECALHOS_LOTE.join(", ")}.`;
  }
  return null;
}

/**
 * Valida os cabeçalhos da primeira linha de um CSV de lote.
 * Aceita separador `;` ou `,`. Retorna null quando válido ou a mensagem de erro.
 */
export function validarCabecalhosCsv(primeiraLinha: string): string | null {
  const separador = primeiraLinha.includes(";") ? ";" : ",";
  const colunas = primeiraLinha
    .split(separador)
    .map((c) => c.trim().replace(/^"|"$/g, ""));
  return validarCabecalhos(colunas);
}
