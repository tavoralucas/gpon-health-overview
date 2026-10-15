// T-019: Storage helpers

import { supabase } from '@/integrations/supabase/client';

const BUCKET_NAME = 'anexos-chamados';

export async function getSignedUrl(storagePath: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(storagePath, 3600); // 1 hour expiration

    if (error) throw error;
    return data.signedUrl;
  } catch (err) {
    console.error('Erro ao gerar URL assinada:', err);
    return null;
  }
}

export async function uploadFile(
  ticketId: string,
  file: File
): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const storagePath = `chamados/${ticketId}/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, file);

    if (uploadError) throw uploadError;
    return storagePath;
  } catch (err) {
    console.error('Erro ao fazer upload:', err);
    return null;
  }
}

export async function deleteFile(storagePath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([storagePath]);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Erro ao remover arquivo:', err);
    return false;
  }
}
