CREATE POLICY "anexos_chamados_select_authenticated"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'anexos-chamados');

CREATE POLICY "anexos_chamados_insert_authenticated"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'anexos-chamados');

CREATE POLICY "anexos_chamados_delete_authenticated"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'anexos-chamados');