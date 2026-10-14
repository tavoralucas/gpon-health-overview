import { ArrowUpRight, UserPlus, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
export type TipoSolicitacao = "novo_acesso" | "problema_tecnico";
export function TipoSolicitacaoSelector({ onSelect }: { onSelect: (tipo: TipoSolicitacao) => void }) {
  return <div className="grid gap-4 sm:grid-cols-2">
    {[{ tipo: "novo_acesso" as const, title: "Novo acesso", detail: "Criação de usuários", Icon: UserPlus, number: "01" }, { tipo: "problema_tecnico" as const, title: "Problema técnico", detail: "Falhas, pedidos e suporte", Icon: Wrench, number: "02" }].map(({tipo, title, detail, Icon, number}) =>
      <Button key={tipo} type="button" variant="outline" onClick={() => onSelect(tipo)} className="request-option group">
        <span className="flex w-full items-center justify-between"><span className="option-icon"><Icon /></span><span className="font-mono text-xs text-muted-foreground">{number}</span></span>
        <span className="mt-7 flex w-full items-center justify-between"><span className="text-xl font-semibold">{title}</span><ArrowUpRight className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
        <span className="w-full text-left text-sm font-normal text-muted-foreground">{detail}</span>
      </Button>)}
  </div>;
}
