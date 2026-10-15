// T-020: Edge Function criar-chamado (n8n integration endpoint)
// verify_jwt = false, uses shared secret for auth

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.97.0';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const CRIAR_CHAMADO_SECRET = Deno.env.get('CRIAR_CHAMADO_SECRET') || '';

const TIPOS = ['problema_tecnico', 'novo_acesso_individual', 'novo_acesso_lote'] as const;
const MAC_REGEX = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;

const payloadSchema = z.object({
  tipo: z.enum(TIPOS, { required_error: 'tipo é obrigatório' }),
  solicitante: z.object({
    nome: z.string().min(1).max(100),
    email: z.string().email().max(255),
  }),
  titulo: z.string().min(1).max(150),
  descricao: z.string().min(20).max(5000),
  cidade: z.string().regex(/^\d{1,3}$/).optional(),
  mac: z.string().regex(MAC_REGEX).optional(),
  novo_acesso: z.object({
    nome: z.string().optional(),
    login: z.string().optional(),
    email: z.string().email().optional(),
    cargo: z.string().optional(),
    area: z.string().optional(),
  }).optional(),
  anexos: z.array(z.string()).optional(),
  chave_idempotencia: z.string().uuid().optional(),
});

const PRIORIDADE_MATRIZ: Record<string, Record<string, string>> = {
  baixa: { local: 'baixa', setor: 'media', massa: 'media' },
  media: { local: 'media', setor: 'alta', massa: 'alta' },
  alta: { local: 'alta', setor: 'critica', massa: 'critica' },
};

function calcularPrioridade(urgencia: string, impacto: string): string {
  return PRIORIDADE_MATRIZ[urgencia]?.[impacto] || 'media';
}

serve(async (req) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // Auth check
  const apiKey = req.headers.get('x-api-key');
  if (!apiKey || apiKey !== CRIAR_CHAMADO_SECRET) {
    return new Response(
      JSON.stringify({ error: 'Não autorizado' }),
      { status: 401, headers }
    );
  }

  try {
    const body = await req.json();
    const parsed = payloadSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: 'Dados inválidos',
          details: parsed.error.issues,
        }),
        { status: 400, headers }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Idempotency check
    if (parsed.data.chave_idempotencia) {
      const { data: existing } = await supabase
        .from('tickets')
        .select('id, numero, status, prioridade')
        .eq('chave_idempotencia', parsed.data.chave_idempotencia)
        .maybeSingle();

      if (existing) {
        return new Response(
          JSON.stringify(existing),
          { status: 200, headers }
        );
      }
    }

    // Get next sequence number
    const { data: seqData } = await supabase.rpc('next_chamado_numero');
    const seq = seqData || Math.floor(Math.random() * 999999);
    const numero = `CHM-${String(seq).padStart(6, '0')}`;

    // Default urgency/impact for public submissions (OPEN-5)
    const urg = 'media';
    const imp = 'local';
    const prioridade = calcularPrioridade(urg, imp);

    const { data: ticket, error: insertError } = await supabase
      .from('tickets')
      .insert({
        numero,
        titulo: parsed.data.titulo,
        descricao: parsed.data.descricao,
        tipo: parsed.data.tipo,
        origem: 'publico',
        solicitante_nome: parsed.data.solicitante.nome,
        solicitante_email: parsed.data.solicitante.email,
        codigo_cidade: parsed.data.cidade || null,
        endereco_mac: parsed.data.mac || null,
        urgencia: urg,
        impacto: imp,
        prioridade,
        status: 'novo',
        chave_idempotencia: parsed.data.chave_idempotencia || null,
      })
      .select('id, numero, status, prioridade')
      .single();

    if (insertError) {
      throw insertError;
    }

    // Create initial system followup
    await supabase
      .from('ticket_followups')
      .insert({
        ticket_id: ticket.id,
        tipo: 'system',
        conteudo: `Chamado criado via formulário público com prioridade ${prioridade}`,
      });

    return new Response(
      JSON.stringify({
        codigo: ticket.numero,
        id: ticket.id,
        status: ticket.status,
        prioridade: ticket.prioridade,
      }),
      { status: 201, headers }
    );
  } catch (err) {
    console.error('Erro ao criar chamado:', err);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers }
    );
  }
});
