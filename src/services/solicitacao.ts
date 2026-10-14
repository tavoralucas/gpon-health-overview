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

/** Converte a resposta de erro do webhook em mensagem legível. */
export function extrairMensagemErro(data: unknown): string | null {
  const corpo = data as { error?: string; details?: string } | null;
  if (!corpo) return null;
  if (corpo.details) {
    try {
      const parsed = JSON.parse(corpo.details);
      const item = Array.isArray(parsed) ? parsed[0] : parsed;
      const erros = item?.validacao?.erros ?? item?.json?.validacao?.erros;
      if (erros && typeof erros === "object") {
        const msgs = Object.values(erros).filter(Boolean) as string[];
        if (msgs.length) return msgs.join(" ");
      }
    } catch {
      /* corpo não é JSON */
    }
  }
  return corpo.error ?? null;
}

async function invocar(formData: FormData): Promise<void> {
  // Enviado através do backend para evitar bloqueio de CORS do navegador.
  const { data, error } = await supabase.functions.invoke("enviar-solicitacao", {
    body: formData,
  });

  if (error) {
    let corpo: unknown = data;
    const ctx = (error as { context?: Response }).context;
    if (!corpo && ctx && typeof ctx.json === "function") {
      try {
        corpo = await ctx.json();
      } catch {
        /* ignora */
      }
    }
    throw new Error(
      extrairMensagemErro(corpo) ??
        "Não foi possível enviar sua solicitação. Tente novamente."
    );
  }
}

export async function enviarSolicitacao(payload: SolicitacaoPayload): Promise<void> {
  const formData = new FormData();
  formData.append("tipo", "problema_tecnico");
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
      emailSolicitante: string;
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

/** Monta os campos comuns esperados pelo workflow (nome, email, titulo, texto). */
export function montarCamposNovoAcesso(payload: NovoAcessoPayload) {
  if (payload.modo === "individual") {
    return {
      nome: payload.nomeSolicitante,
      email: payload.emailSolicitante,
      titulo: `Novo acesso - ${payload.nomeUsuario}`,
      texto: [
        "Solicitação de criação de usuário:",
        `Nome: ${payload.nomeUsuario}`,
        `Login: ${payload.loginUsuario}`,
        `E-mail: ${payload.emailUsuario}`,
        `Cargo/Papel: ${payload.cargo}`,
        `Área: ${payload.area}`,
      ].join("\n"),
    };
  }
  return {
    nome: payload.nomeSolicitante,
    email: payload.emailSolicitante,
    titulo: `Novo acesso em lote - ${payload.arquivo.name}`,
    texto: `Solicitação de criação de usuários em lote. Arquivo anexado: ${payload.arquivo.name}`,
  };
}

export async function enviarNovoAcesso(payload: NovoAcessoPayload): Promise<void> {
  const formData = new FormData();
  formData.append("tipo", "novo_acesso");
  formData.append("tipoSolicitacao", "novo_acesso");
  formData.append("modo", payload.modo);
  const comuns = montarCamposNovoAcesso(payload);
  Object.entries(comuns).forEach(([k, v]) => formData.append(k, v));
  formData.append("nomeSolicitante", payload.nomeSolicitante);
  formData.append("emailSolicitante", payload.emailSolicitante);

  if (payload.modo === "individual") {
    formData.append("nomeUsuario", payload.nomeUsuario);
    formData.append("loginUsuario", payload.loginUsuario);
    formData.append("emailUsuario", payload.emailUsuario);
    formData.append("cargo", payload.cargo);
    formData.append("area", payload.area);
  } else {
    formData.append("arquivo", payload.arquivo, payload.arquivo.name);
  }

  await invocar(formData);
}
