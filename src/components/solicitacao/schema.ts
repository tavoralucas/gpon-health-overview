import { z } from "zod";
import { ACCEPTED_TYPES, MAX_FILE_SIZE } from "./ImageDropzone";

const MAC_REGEX = /^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/;

export const solicitacaoSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, { message: "O campo Nome ou Login é obrigatório." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "O campo E-mail é obrigatório." })
    .email({ message: "Informe um e-mail válido." })
    .max(255, { message: "O e-mail deve ter no máximo 255 caracteres." }),
  codigoCidade: z
    .string()
    .trim()
    .min(1, { message: "O campo Código da Cidade é obrigatório." })
    .max(50, { message: "O código da cidade deve ter no máximo 50 caracteres." }),
  enderecoMac: z
    .string()
    .trim()
    .min(1, { message: "O campo Endereço MAC é obrigatório." })
    .regex(MAC_REGEX, {
      message: "Informe um endereço MAC válido (ex.: AA:BB:CC:DD:EE:FF).",
    }),
  titulo: z
    .string()
    .trim()
    .min(1, { message: "O campo Título é obrigatório." })
    .max(150, { message: "O título deve ter no máximo 150 caracteres." }),
  texto: z
    .string()
    .trim()
    .min(20, { message: "A descrição deve ter no mínimo 20 caracteres." })
    .max(5000, { message: "A descrição deve ter no máximo 5000 caracteres." }),
  imagem: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || ACCEPTED_TYPES.includes(file.type), {
      message: "Formato inválido. Use JPG, JPEG, PNG, GIF ou WEBP.",
    })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "A imagem deve ter no máximo 10 MB.",
    }),
});

export type SolicitacaoFormValues = z.infer<typeof solicitacaoSchema>;
