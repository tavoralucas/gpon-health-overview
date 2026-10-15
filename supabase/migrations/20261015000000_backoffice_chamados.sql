-- Backoffice de Chamados — migration inicial
-- T-001: Create tables profiles, tickets, ticket_followups, ticket_attachments, sequence
-- T-002: RLS policies and Storage bucket

-- 1. Sequence for ticket numbers (CHM-000001 format)
CREATE SEQUENCE IF NOT EXISTS public.seq_chamado_numero START 1;

-- 2. Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  name          text not null,
  email         text not null,
  role          text not null default 'agente' check (role in ('agente', 'admin')),
  status        text not null default 'pending' check (status in ('pending', 'active', 'disabled')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 3. Tickets table
CREATE TABLE IF NOT EXISTS public.tickets (
  id                uuid primary key default gen_random_uuid(),
  numero            text not null unique,
  titulo            text not null,
  descricao         text not null,
  tipo              text not null check (tipo in ('problema_tecnico', 'novo_acesso_individual', 'novo_acesso_lote')),
  origem            text not null check (origem in ('publico', 'manual')),
  solicitante_nome  text not null,
  solicitante_email text not null,
  codigo_cidade     text,
  endereco_mac      text,
  urgencia          text not null check (urgencia in ('baixa', 'media', 'alta')),
  impacto           text not null check (impacto in ('local', 'setor', 'massa')),
  prioridade        text not null check (prioridade in ('baixa', 'media', 'alta', 'critica')),
  status            text not null default 'novo' check (status in ('novo','atribuido','atendimento','espera','resolvido','fechado','reaberto')),
  atribuido_a       uuid references public.profiles(id),
  criado_por        uuid references public.profiles(id),
  chave_idempotencia text unique,
  resolvido_em      timestamptz,
  fechado_em        timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Indexes for listing queries
CREATE INDEX IF NOT EXISTS idx_tickets_status ON public.tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_prioridade ON public.tickets(prioridade);
CREATE INDEX IF NOT EXISTS idx_tickets_atribuido_a ON public.tickets(atribuido_a);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON public.tickets(created_at desc);

-- 4. Ticket followups (timeline)
CREATE TABLE IF NOT EXISTS public.ticket_followups (
  id          uuid primary key default gen_random_uuid(),
  ticket_id   uuid not null references public.tickets(id) on delete cascade,
  tipo        text not null check (tipo in ('followup_publico', 'nota_interna', 'status_change', 'assignment', 'system')),
  conteudo    text not null,
  autor       uuid references public.profiles(id),
  created_at  timestamptz not null default now()
);

CREATE INDEX IF NOT EXISTS idx_ticket_followups_ticket ON public.ticket_followups(ticket_id, created_at);

-- 5. Ticket attachments
CREATE TABLE IF NOT EXISTS public.ticket_attachments (
  id            uuid primary key default gen_random_uuid(),
  ticket_id     uuid not null references public.tickets(id) on delete cascade,
  storage_path  text not null,
  nome_arquivo  text not null,
  tamanho_bytes integer not null,
  content_type  text not null,
  uploaded_by   uuid references public.profiles(id),
  created_at    timestamptz not null default now()
);

CREATE INDEX IF NOT EXISTS idx_ticket_attachments_ticket ON public.ticket_attachments(ticket_id);

-- 6. Auto-create profile number function (trigger not used — profiles created by admin)
-- The numero is set by application code using: 'CHM-' || lpad(nextval('seq_chamado_numero')::text, 6, '0')

-- 7. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_followups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_attachments ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies

-- Profiles: all authenticated can read; only admin can insert/update
CREATE POLICY "profiles_select_authenticated" ON public.profiles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "profiles_insert_admin" ON public.profiles
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "profiles_update_admin" ON public.profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Tickets: authenticated can read all; authenticated can insert; authenticated can update
CREATE POLICY "tickets_select_authenticated" ON public.tickets
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "tickets_insert_authenticated" ON public.tickets
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "tickets_update_authenticated" ON public.tickets
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Followups: authenticated can read all; authenticated can insert; no update/delete (immutable timeline)
CREATE POLICY "followups_select_authenticated" ON public.ticket_followups
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "followups_insert_authenticated" ON public.ticket_followups
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Attachments: authenticated can read all; authenticated can insert; no update/delete
CREATE POLICY "attachments_select_authenticated" ON public.ticket_attachments
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "attachments_insert_authenticated" ON public.ticket_attachments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 9. Storage bucket for attachments
-- Note: Run this via Supabase dashboard or supabase CLI
-- INSERT INTO storage.buckets (id, name, public) VALUES ('anexos-chamados', 'anexos-chamados', false);
-- 
-- Storage bucket RLS policies:
-- CREATE POLICY "anexos_chamados_select_authenticated" ON storage.objects
--   FOR SELECT USING (bucket_id = 'anexos-chamados' AND auth.role() = 'authenticated');
-- 
-- CREATE POLICY "anexos_chamados_insert_authenticated" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'anexos-chamados' AND auth.role() = 'authenticated');
