-- B2: Server-side status transition enforcement (AC-20)
-- B2b: Profile existence check in RLS policies (AC-04)

-- 1. Status transition validation function (mirrors src/lib/transitions.ts)
CREATE OR REPLACE FUNCTION public.validar_transicao_status(
  p_old_status text,
  p_new_status text
) RETURNS boolean
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  IF p_old_status = p_new_status THEN
    RETURN false;
  END IF;

  RETURN EXISTS (
    SELECT 1 FROM (VALUES
      ('novo', 'atribuido'),
      ('novo', 'atendimento'),
      ('atribuido', 'atendimento'),
      ('atendimento', 'espera'),
      ('atendimento', 'resolvido'),
      ('espera', 'atendimento'),
      ('espera', 'resolvido'),
      ('resolvido', 'fechado'),
      ('resolvido', 'reaberto'),
      ('fechado', 'reaberto'),
      ('reaberto', 'atendimento')
    ) AS t(de, para)
    WHERE t.de = p_old_status AND t.para = p_new_status
  );
END;
$$;

-- 2. Trigger function to enforce status transitions on update
CREATE OR REPLACE FUNCTION public.check_status_transition()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    IF NOT public.validar_transicao_status(OLD.status, NEW.status) THEN
      RAISE EXCEPTION 'Transição de status inválida: % → %', OLD.status, NEW.status
        USING HINT = 'Consulte a tabela de transições permitidas em src/lib/transitions.ts';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- 3. Apply the trigger to tickets table
DROP TRIGGER IF EXISTS trg_tickets_check_status_transition ON public.tickets;
CREATE TRIGGER trg_tickets_check_status_transition
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.check_status_transition();

-- 4. RPC for direct status updates (alternative path, e.g., from edge functions)
CREATE OR REPLACE FUNCTION public.atualizar_status_chamado(
  p_ticket_id uuid,
  p_novo_status text,
  p_autor_id uuid DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_old_status text;
  v_ticket jsonb;
BEGIN
  SELECT status INTO v_old_status FROM public.tickets WHERE id = p_ticket_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Chamado não encontrado';
  END IF;

  IF NOT public.validar_transicao_status(v_old_status, p_novo_status) THEN
    RAISE EXCEPTION 'Transição de status inválida: % → %', v_old_status, p_novo_status;
  END IF;

  UPDATE public.tickets
  SET status = p_novo_status, updated_at = now()
  WHERE id = p_ticket_id;

  -- Register timeline event
  INSERT INTO public.ticket_followups (ticket_id, tipo, conteudo, autor)
  VALUES (p_ticket_id, 'status_change', format('Status alterado: %s → %s', v_old_status, p_novo_status), p_autor_id);

  SELECT jsonb_build_object(
    'id', t.id,
    'status', t.status,
    'numero', t.numero,
    'updated_at', t.updated_at
  ) INTO v_ticket
  FROM public.tickets t
  WHERE t.id = p_ticket_id;

  RETURN v_ticket;
END;
$$;

-- 5. Drop existing RLS policies that only check auth.role()
DROP POLICY IF EXISTS "profiles_select_authenticated" ON public.profiles;
DROP POLICY IF EXISTS "tickets_select_authenticated" ON public.tickets;
DROP POLICY IF EXISTS "tickets_insert_authenticated" ON public.tickets;
DROP POLICY IF EXISTS "tickets_update_authenticated" ON public.tickets;
DROP POLICY IF EXISTS "followups_select_authenticated" ON public.ticket_followups;
DROP POLICY IF EXISTS "followups_insert_authenticated" ON public.ticket_followups;
DROP POLICY IF EXISTS "attachments_select_authenticated" ON public.ticket_attachments;
DROP POLICY IF EXISTS "attachments_insert_authenticated" ON public.ticket_attachments;

-- 6. Recreate policies with profile existence + active status check (AC-04)
CREATE POLICY "profiles_select_authenticated" ON public.profiles
  FOR SELECT USING (
    auth.role() = 'authenticated'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'active')
  );

CREATE POLICY "tickets_select_authenticated" ON public.tickets
  FOR SELECT USING (
    auth.role() = 'authenticated'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'active')
  );

CREATE POLICY "tickets_insert_authenticated" ON public.tickets
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'active')
  );

CREATE POLICY "tickets_update_authenticated" ON public.tickets
  FOR UPDATE USING (
    auth.role() = 'authenticated'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'active')
  );

CREATE POLICY "followups_select_authenticated" ON public.ticket_followups
  FOR SELECT USING (
    auth.role() = 'authenticated'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'active')
  );

CREATE POLICY "followups_insert_authenticated" ON public.ticket_followups
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'active')
  );

CREATE POLICY "attachments_select_authenticated" ON public.ticket_attachments
  FOR SELECT USING (
    auth.role() = 'authenticated'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'active')
  );

CREATE POLICY "attachments_insert_authenticated" ON public.ticket_attachments
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'active')
  );

-- 7. Storage bucket RLS policies (uncommented from original migration)
-- Note: Bucket must exist; run via Supabase dashboard if not already created:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('anexos-chamados', 'anexos-chamados', false)
--   ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "anexos_chamados_select_authenticated" ON storage.objects;
CREATE POLICY "anexos_chamados_select_authenticated" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'anexos-chamados'
    AND auth.role() = 'authenticated'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'active')
  );

DROP POLICY IF EXISTS "anexos_chamados_insert_authenticated" ON storage.objects;
CREATE POLICY "anexos_chamados_insert_authenticated" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'anexos-chamados'
    AND auth.role() = 'authenticated'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'active')
  );
