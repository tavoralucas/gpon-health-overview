import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, UserPlus, Users, Waypoints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SolicitacaoForm } from "@/components/solicitacao/SolicitacaoForm";
import { NovoAcessoForm } from "@/components/solicitacao/NovoAcessoForm";
import { TipoSolicitacaoSelector, type TipoSolicitacao } from "@/components/solicitacao/TipoSolicitacaoSelector";
import { ConnectivityArt, FlowFooter, FlowHeading, FlowProgress } from "@/components/solicitacao/GuidedFlow";

export default function NovaSolicitacao() {
  const [tipo, setTipo] = useState<TipoSolicitacao | null>(null);
  const [modo, setModo] = useState<"individual" | "lote" | null>(null);
  const restart = () => { setTipo(null); setModo(null); };
  useEffect(() => {
    const link = document.createElement("link"); link.rel = "stylesheet"; link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"; document.head.appendChild(link);
    return () => link.remove();
  }, []);
  return <div className="solicitation-page">
    <div className="connection-banner"><ConnectivityArt /><div className="connection-mark"><Waypoints className="h-7 w-7" /></div></div>
    <div className="request-shell">
      <header className="request-header"><p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Atendimento digital</p><h1 className="text-3xl font-semibold sm:text-4xl">Nova solicitação<span className="text-primary">.</span></h1></header>
      {!tipo || (tipo === "novo_acesso" && !modo) ? <div className="guided-form"><FlowProgress step={0} /><div className="step-content"><FlowHeading eyebrow="Etapa 01 / Tipo" title={!tipo ? "Como podemos ajudar?" : "Como deseja cadastrar?"} />
        {!tipo ? <TipoSolicitacaoSelector onSelect={setTipo} /> : <div className="grid gap-4 sm:grid-cols-2">{[{ value: "individual" as const, label: "Cadastro individual", desc: "Um novo usuário", Icon: UserPlus }, { value: "lote" as const, label: "Cadastro em lote", desc: "Vários usuários via planilha", Icon: Users }].map(({value,label,desc,Icon}) => <Button key={value} variant="outline" className="request-option" onClick={() => setModo(value)}><span className="option-icon"><Icon /></span><span className="mt-5 flex w-full items-center justify-between text-lg font-semibold">{label}<ArrowUpRight /></span><span className="w-full text-left font-normal text-muted-foreground">{desc}</span></Button>)}</div>}
      </div><div className="flow-actions">{tipo ? <Button variant="ghost" onClick={restart}><ArrowLeft />Voltar</Button> : <span className="text-xs text-muted-foreground">01 — Escolha sua solicitação</span>}<span className="text-xs text-muted-foreground">4 etapas</span></div></div> : tipo === "problema_tecnico" ? <SolicitacaoForm onExit={restart} /> : modo ? <NovoAcessoForm modo={modo} onExit={() => setModo(null)} /> : null}
      <FlowFooter />
    </div>
  </div>;
}
