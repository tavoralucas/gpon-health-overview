import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "./ImageDropzone";

export interface SolicitacaoResumo {
  nome: string;
  email: string;
  titulo: string;
  texto: string;
  imagem?: { name: string; size: number } | null;
  enviadaEm: Date;
}

interface Props {
  resumo: SolicitacaoResumo;
  onNovaSolicitacao: () => void;
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  );
}

export function SolicitacaoConfirmacao({ resumo, onNovaSolicitacao }: Props) {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="animate-scale-in flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </span>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Solicitação enviada com sucesso
        </h2>
        <p className="text-sm text-muted-foreground">
          Enviada em{" "}
          {resumo.enviadaEm.toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </p>
      </div>

      <dl className="space-y-4 rounded-xl border border-border bg-background p-5">
        <Campo label="Nome">{resumo.nome}</Campo>
        <Campo label="E-mail">{resumo.email}</Campo>
        <Campo label="Título">{resumo.titulo}</Campo>
        <Campo label="Descrição">
          <span className="whitespace-pre-wrap">{resumo.texto}</span>
        </Campo>
        <Campo label="Imagem">
          {resumo.imagem
            ? `${resumo.imagem.name} (${formatFileSize(resumo.imagem.size)})`
            : "Nenhuma imagem anexada"}
        </Campo>
      </dl>

      <Button
        type="button"
        size="lg"
        variant="outline"
        className="h-12 w-full text-base"
        onClick={onNovaSolicitacao}
      >
        <Plus className="mr-2 h-5 w-5" />
        Nova solicitação
      </Button>
    </div>
  );
}
