import { N8N_WEBHOOK_URL } from "@/config/webhook";

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

  // Não definir Content-Type manualmente: o browser adiciona o boundary correto.
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    body: formData,
  });

  if (response.status !== 200) {
    throw new Error(`Falha ao enviar solicitação (HTTP ${response.status}).`);
  }
}
