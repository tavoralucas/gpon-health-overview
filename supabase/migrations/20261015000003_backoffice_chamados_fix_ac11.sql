-- AC-11/AC-17: Add novo_acesso JSONB column for new access data
-- AC-36: Persist novo_acesso data from public submissions
-- AC-12/AC-25: Enforce attachment count limit server-side

-- 1. Add novo_acesso JSONB column to tickets
ALTER TABLE public.tickets
  ADD COLUMN IF NOT EXISTS novo_acesso jsonb;

-- 2. Function and trigger to enforce max 5 attachments per ticket
CREATE OR REPLACE FUNCTION public.check_attachment_limit()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  v_count integer;
BEGIN
  SELECT COUNT(*) INTO v_count
  FROM public.ticket_attachments
  WHERE ticket_id = NEW.ticket_id;

  IF v_count >= 5 THEN
    RAISE EXCEPTION 'Máximo de 5 anexos por chamado.';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_ticket_attachments_check_limit ON public.ticket_attachments;
CREATE TRIGGER trg_ticket_attachments_check_limit
  BEFORE INSERT ON public.ticket_attachments
  FOR EACH ROW
  EXECUTE FUNCTION public.check_attachment_limit();

-- 3. Update updated_at trigger to auto-set on any change
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_tickets_update_updated_at ON public.tickets;
CREATE TRIGGER trg_tickets_update_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
