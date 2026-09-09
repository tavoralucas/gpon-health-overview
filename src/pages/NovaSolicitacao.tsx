import { SolicitacaoForm } from "@/components/solicitacao/SolicitacaoForm";

export default function NovaSolicitacao() {
  return (
    <main className="flex h-screen w-full flex-col bg-white px-4 py-2 sm:py-3">
      <div className="mx-auto flex h-full w-full max-w-[700px] animate-fade-in flex-col">
        <section className="flex h-full flex-col rounded-2xl border border-border bg-muted/40 p-4 shadow-lg shadow-black/5 sm:p-5">
          <header className="mb-3 shrink-0 space-y-0.5">
            <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              Nova Solicitação
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Preencha os campos abaixo para enviar sua solicitação.
            </p>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <SolicitacaoForm />
          </div>
        </section>
      </div>
    </main>
  );
}
