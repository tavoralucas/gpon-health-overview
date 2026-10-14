import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SolicitacaoForm } from "@/components/solicitacao/SolicitacaoForm";
import { NovoAcessoForm } from "@/components/solicitacao/NovoAcessoForm";
import {
  TipoSolicitacaoSelector,
  type TipoSolicitacao,
} from "@/components/solicitacao/TipoSolicitacaoSelector";

const subtitulos: Record<TipoSolicitacao, string> = {
  novo_acesso: "Solicite a criação de usuários, individualmente ou em lote.",
  problema_tecnico: "Preencha os campos abaixo para enviar sua solicitação.",
};

export default function NovaSolicitacao() {
  const [tipo, setTipo] = useState<TipoSolicitacao | null>(null);

  return (
    <main className="flex h-screen w-full flex-col bg-white px-4 py-2 sm:py-3">
      <div className="mx-auto flex h-full w-full max-w-[840px] animate-fade-in flex-col">
        <section className="flex h-full flex-col rounded-2xl border border-border bg-muted/40 p-5 shadow-lg shadow-black/5 sm:p-6">
          <header className="mb-3 shrink-0 space-y-0.5">
            <div className="flex items-center gap-2">
              {tipo && (
                <button
                  type="button"
                  onClick={() => setTipo(null)}
                  aria-label="Voltar para a escolha do tipo de solicitação"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Nova Solicitação
              </h1>
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {tipo
                ? subtitulos[tipo]
                : "Escolha o tipo de solicitação que deseja realizar."}
            </p>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto px-2">
            {!tipo && <TipoSolicitacaoSelector onSelect={setTipo} />}
            {tipo === "problema_tecnico" && <SolicitacaoForm />}
            {tipo === "novo_acesso" && <NovoAcessoForm />}
          </div>
        </section>
      </div>
    </main>
  );
}
