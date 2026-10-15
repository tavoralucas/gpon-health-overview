-- Backoffice de Chamados — fixes da review
-- T-001a: Function next_chamado_numero for frontend RPC call

-- 1. Function to generate sequential ticket numbers (CHM-000001 format)
-- Called by frontend via supabase.rpc('next_chamado_numero')
CREATE OR REPLACE FUNCTION public.next_chamado_numero()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT 'CHM-' || lpad(nextval('seq_chamado_numero')::text, 6, '0');
$$;
