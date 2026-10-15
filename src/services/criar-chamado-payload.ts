// T-023: criar-chamado-payload schema (R7 — n8n integration contract)
// chave_idempotencia is REQUIRED per R7

import { z } from 'zod';

const TIPOS = ['problema_tecnico', 'novo_acesso_individual', 'novo_acesso_lote'] as const;
const MAC_REGEX = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;

export const criarChamadoPayloadSchema = z.object({
  tipo: z.enum(TIPOS, { required_error: 'tipo é obrigatório' }),
  solicitante: z.object({
    nome: z.string().min(1, 'Nome é obrigatório').max(100),
    email: z.string().email('E-mail inválido').max(255),
  }),
  titulo: z.string().min(1, 'Título é obrigatório').max(150),
  descricao: z.string().min(20, 'Descrição deve ter no mínimo 20 caracteres').max(5000),
  cidade: z.string().regex(/^\d{1,3}$/, 'Cidade deve ter no máximo 3 dígitos').optional(),
  mac: z.string().regex(MAC_REGEX, 'MAC inválido').optional(),
  novo_acesso: z.object({
    nome: z.string().optional(),
    login: z.string().optional(),
    email: z.string().email().optional(),
    cargo: z.string().optional(),
    area: z.string().optional(),
  }).optional(),
  anexos: z.array(z.string()).optional(),
  chave_idempotencia: z.string().uuid('chave_idempotencia deve ser um UUID'),
});

export type CriarChamadoPayload = z.infer<typeof criarChamadoPayloadSchema>;
