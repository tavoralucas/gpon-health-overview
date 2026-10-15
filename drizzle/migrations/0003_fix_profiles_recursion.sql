CREATE OR REPLACE FUNCTION public.is_active_admin(_uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = _uid AND role = 'admin' AND status = 'active')
$$;
REVOKE EXECUTE ON FUNCTION public.is_active_admin(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.is_active_admin(uuid) TO authenticated;
DROP POLICY IF EXISTS "Admin lê todos os perfis" ON public.profiles;
DROP POLICY IF EXISTS "Admin atualiza perfis" ON public.profiles;
CREATE POLICY "Admin lê todos os perfis" ON public.profiles FOR SELECT TO authenticated USING (public.is_active_admin(auth.uid()));
CREATE POLICY "Admin atualiza perfis" ON public.profiles FOR UPDATE TO authenticated USING (public.is_active_admin(auth.uid())) WITH CHECK (public.is_active_admin(auth.uid()));
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;