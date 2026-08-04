import { supabase } from "@/integrations/supabase/client";

export interface SolicitacaoPayload {
  nome: string;
  area: string;
  titulo: string;
  texto: string;
  imagem?: File | null;
}

export async function enviarSolicitacao(payload: SolicitacaoPayload): Promise<void> {
  const formData = new FormData();
  formData.append("nome", payload.nome);
  formData.append("area", payload.area);
  formData.append("titulo", payload.titulo);
  formData.append("texto", payload.texto);
  if (payload.imagem) {
    formData.append("imagem", payload.imagem, payload.imagem.name);
  }

  // Enviado através do backend para evitar bloqueio de CORS do navegador.
  const { data, error } = await supabase.functions.invoke("enviar-solicitacao", {
    body: formData,
  });

  if (error) {
    const detalhe = (data as { error?: string } | null)?.error;
    throw new Error(
      detalhe ?? "Não foi possível enviar sua solicitação. Tente novamente."
    );
  }
}
