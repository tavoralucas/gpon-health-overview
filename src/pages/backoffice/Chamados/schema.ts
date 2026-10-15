// T-011: Chamado form schema (Zod)
// R3: Campos por tipo de chamado

import { z } from 'zod';

const TIPOS = ['problema_tecnico', 'novo_acesso_individual', 'novo_acesso_lote'] as const;
const URGENCIAS = ['baixa', 'media', 'alta'] as const;
const IMPACTOS = ['local', 'setor', 'massa'] as const;

const MAC_REGEX = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;

const anexoItem = z.object({
  nome: z.string(),
  tamanho: z.number().max(10 * 1024 * 1024, 'Anexo deve ter no máximo 10 MB'),
});

export const chamadoSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório').max(150, 'Título deve ter no máximo 150 caracteres'),
  tipo: z.enum(TIPOS, { required_error: 'Tipo é obrigatório' }),
  solicitante_nome: z.string().min(1, 'Nome do solicitante é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  solicitante_email: z.string().email('E-mail inválido').max(255, 'E-mail deve ter no máximo 255 caracteres'),
  urgencia: z.enum(URGENCIAS, { required_error: 'Urgência é obrigatória' }),
  impacto: z.enum(IMPACTOS, { required_error: 'Impacto é obrigatório' }),
  descricao: z.string().min(20, 'Descrição deve ter no mínimo 20 caracteres').max(5000, 'Descrição deve ter no máximo 5000 caracteres'),
  codigo_cidade: z.string().regex(/^\d{1,3}$/, 'Código da cidade deve ter no máximo 3 dígitos').optional(),
  endereco_mac: z.string().regex(MAC_REGEX, 'MAC deve estar no formato AA:BB:CC:DD:EE:FF').optional(),
  novo_usuario: z.object({
    nome: z.string().optional(),
    login: z.string().optional(),
    email: z.string().email().optional(),
    cargo: z.string().optional(),
    area: z.string().optional(),
  }).optional(),
  anexos: z.array(anexoItem).max(5, 'Máximo de 5 anexos').optional(),
}).strict();
// .strict() ensures no extra fields like 'prioridade' are passed

export type ChamadoFormData = z.infer<typeof chamadoSchema>;
