import { SolicitacaoForm } from "@/components/solicitacao/SolicitacaoForm";

export default function NovaSolicitacao() {
  return (
    <main className="min-h-screen w-full bg-white px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-[700px] animate-fade-in">
        <section className="rounded-2xl border border-border bg-muted/40 p-6 shadow-lg shadow-black/5 sm:p-10">
          <header className="mb-8 space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Nova Solicitação
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Preencha os campos abaixo para enviar sua solicitação.
            </p>
          </header>

          <SolicitacaoForm />
        </section>
      </div>
    </main>
  );
}
