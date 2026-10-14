import { UserPlus, Wrench } from "lucide-react";

export type TipoSolicitacao = "novo_acesso" | "problema_tecnico";

interface TipoSolicitacaoSelectorProps {
  onSelect: (tipo: TipoSolicitacao) => void;
}

const opcoes: Array<{
  tipo: TipoSolicitacao;
  titulo: string;
  descricao: string;
  Icon: typeof UserPlus;
}> = [
  {
    tipo: "novo_acesso",
    titulo: "Novo acesso",
    descricao: "Solicite a criação de um ou mais usuários.",
    Icon: UserPlus,
  },
  {
    tipo: "problema_tecnico",
    titulo: "Problema técnico",
    descricao: "Relate uma falha, pedido ou problema técnico.",
    Icon: Wrench,
  },
];

export function TipoSolicitacaoSelector({ onSelect }: TipoSolicitacaoSelectorProps) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {opcoes.map(({ tipo, titulo, descricao, Icon }) => (
          <button
            key={tipo}
            type="button"
            onClick={() => onSelect(tipo)}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-background px-6 py-10 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-7 w-7" />
            </span>
            <span className="text-base font-semibold text-foreground">{titulo}</span>
            <span className="text-sm text-muted-foreground">{descricao}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
