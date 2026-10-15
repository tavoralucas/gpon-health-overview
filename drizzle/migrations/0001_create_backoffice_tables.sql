CREATE SEQUENCE public.seq_chamado_numero;

CREATE OR REPLACE FUNCTION public.next_chamado_numero()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 'CHM-' || lpad(nextval('public.seq_chamado_numero')::text, 6, '0');
$$;

CREATE TABLE public.tickets (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero            text NOT NULL UNIQUE,
  titulo            text NOT NULL,
  descricao         text NOT NULL,
  tipo              text NOT NULL CHECK (tipo IN ('problema_tecnico', 'novo_acesso_individual', 'novo_acesso_lote')),
  origem            text NOT NULL CHECK (origem IN ('publico', 'manual')),
  solicitante_nome  text NOT NULL,
  solicitante_email text NOT NULL,
  codigo_cidade     text,
  endereco_mac      text,
  urgencia          text NOT NULL CHECK (urgencia IN ('baixa', 'media', 'alta')),
  impacto           text NOT NULL CHECK (impacto IN ('local', 'setor', 'massa')),
  prioridade        text NOT NULL CHECK (prioridade IN ('baixa', 'media', 'alta', 'critica')),
  status            text NOT NULL DEFAULT 'novo' CHECK (status IN ('novo','atribuido','atendimento','espera','resolvido','fechado','reaberto')),
  atribuido_a       uuid REFERENCES public.profiles(id),
  criado_por        uuid REFERENCES public.profiles(id),
  novo_acesso       jsonb,
  chave_idempotencia text UNIQUE,
  resolvido_em      timestamptz,
  fechado_em        timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_tickets_status ON public.tickets(status);
CREATE INDEX idx_tickets_prioridade ON public.tickets(prioridade);
CREATE INDEX idx_tickets_atribuido_a ON public.tickets(atribuido_a);
CREATE INDEX idx_tickets_created_at ON public.tickets(created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.tickets TO authenticated;
GRANT ALL ON public.tickets TO service_role;
GRANT USAGE ON SEQUENCE public.seq_chamado_numero TO authenticated;
GRANT USAGE ON SEQUENCE public.seq_chamado_numero TO service_role;

ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tickets_select_authenticated" ON public.tickets
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "tickets_insert_authenticated" ON public.tickets
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "tickets_update_authenticated" ON public.tickets
  FOR UPDATE TO authenticated USING (true);

CREATE TABLE public.ticket_followups (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id   uuid NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  tipo        text NOT NULL CHECK (tipo IN ('followup_publico', 'nota_interna', 'status_change', 'assignment', 'system')),
  conteudo    text NOT NULL,
  autor       uuid REFERENCES public.profiles(id),
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_ticket_followups_ticket ON public.ticket_followups(ticket_id, created_at);

GRANT SELECT, INSERT ON public.ticket_followups TO authenticated;
GRANT ALL ON public.ticket_followups TO service_role;

ALTER TABLE public.ticket_followups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "followups_select_authenticated" ON public.ticket_followups
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "followups_insert_authenticated" ON public.ticket_followups
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE TABLE public.ticket_attachments (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id     uuid NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  storage_path  text NOT NULL,
  nome_arquivo  text NOT NULL,
  tamanho_bytes integer NOT NULL,
  content_type  text NOT NULL,
  uploaded_by   uuid REFERENCES public.profiles(id),
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_ticket_attachments_ticket ON public.ticket_attachments(ticket_id);

GRANT SELECT, INSERT ON public.ticket_attachments TO authenticated;
GRANT ALL ON public.ticket_attachments TO service_role;

ALTER TABLE public.ticket_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "attachments_select_authenticated" ON public.ticket_attachments
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "attachments_insert_authenticated" ON public.ticket_attachments
  FOR INSERT TO authenticated WITH CHECK (true);