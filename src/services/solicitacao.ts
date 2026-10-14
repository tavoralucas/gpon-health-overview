import { supabase } from "@/integrations/supabase/client";

export interface SolicitacaoPayload {
  nome: string;
  email: string;
  codigoCidade?: string;
  enderecoMac?: string;
  titulo: string;
  texto: string;
  imagem?: File | null;
}

async function invocar(formData: FormData): Promise<void> {
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

export async function enviarSolicitacao(payload: SolicitacaoPayload): Promise<void> {
  const formData = new FormData();
  formData.append("tipoSolicitacao", "problema_tecnico");
  formData.append("nome", payload.nome);
  formData.append("email", payload.email);
  formData.append("codigoCidade", payload.codigoCidade ?? "");
  formData.append("enderecoMac", payload.enderecoMac ?? "");
  formData.append("titulo", payload.titulo);
  formData.append("texto", payload.texto);
  if (payload.imagem) {
    formData.append("imagem", payload.imagem, payload.imagem.name);
  }

  await invocar(formData);
}

export type NovoAcessoPayload =
  | {
      modo: "individual";
      nomeSolicitante: string;
      nomeUsuario: string;
      loginUsuario: string;
      emailUsuario: string;
      cargo: string;
      area: string;
    }
  | {
      modo: "lote";
      nomeSolicitante: string;
      emailSolicitante: string;
      arquivo: File;
    };

export async function enviarNovoAcesso(payload: NovoAcessoPayload): Promise<void> {
  const formData = new FormData();
  formData.append("tipoSolicitacao", "novo_acesso");
  formData.append("modo", payload.modo);
  formData.append("nomeSolicitante", payload.nomeSolicitante);

  if (payload.modo === "individual") {
    formData.append("nomeUsuario", payload.nomeUsuario);
    formData.append("loginUsuario", payload.loginUsuario);
    formData.append("emailUsuario", payload.emailUsuario);
    formData.append("cargo", payload.cargo);
    formData.append("area", payload.area);
  } else {
    formData.append("emailSolicitante", payload.emailSolicitante);
    formData.append("arquivo", payload.arquivo, payload.arquivo.name);
  }

  await invocar(formData);
}
