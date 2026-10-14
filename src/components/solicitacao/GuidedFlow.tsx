import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const labels = ["Tipo", "Seus dados", "Detalhes", "Revisão"];

export function FlowProgress({ step }: { step: number }) {
  return <ol className="flow-progress" aria-label="Etapas da solicitação">
    {labels.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className={cn("flow-progress-item", index <= step && "is-active", index < step && "is-complete")}>
      <span className="flow-step-number">{index < step ? <Check className="h-3.5 w-3.5" /> : `0${index + 1}`}</span>
      <span className="flow-step-label">{label}</span>
    </li>)}
  </ol>;
}

export function useGuidedFlow() {
  const [step, setStep] = useState(1);
  const advance = async (validate: () => Promise<boolean>) => {
    if (await validate()) setStep(current => Math.min(current + 1, 3));
  };
  return { step, setStep, advance };
}

export function FlowActions({ step, busy, onBack, onContinue }: { step: number; busy: boolean; onBack: () => void; onContinue: () => void }) {
  return <div className="flow-actions">
    <Button variant="ghost" type="button" disabled={busy} onClick={onBack}><ArrowLeft />Voltar</Button>
    {step < 3 ? <Button type="button" size="lg" onClick={onContinue} disabled={busy}>Continuar<ArrowRight /></Button> :
      <Button type="submit" size="lg" disabled={busy}>{busy ? <Loader2 className="animate-spin" /> : <Send />}{busy ? "Enviando..." : "Enviar solicitação"}</Button>}
  </div>;
}

export function ReviewFields({ fields }: { fields: Array<[string, string | undefined]> }) {
  return <dl className="review-fields">{fields.map(([label, value]) => <div key={label} className="review-field"><dt>{label}</dt><dd>{value || "Não informado"}</dd></div>)}</dl>;
}

export function FlowHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="mb-6"><p className="mb-2 text-xs font-medium uppercase text-primary">{eyebrow}</p><h2 className="text-2xl font-semibold text-foreground">{title}</h2></div>;
}

export function FlowFooter() {
  return <div className="flow-footer"><ShieldCheck className="h-4 w-4" /><span>Central de solicitações</span><span className="ml-auto font-mono">BEON / OPERAÇÕES</span></div>;
}

export function ConnectivityArt() {
  return <svg className="connectivity-art" viewBox="0 0 1200 350" fill="none" aria-hidden="true">
    <g className="circuit-lines">
      <path d="M0 70H170L230 130H390L450 190H610L680 120H870L940 50H1200" />
      <path d="M0 160H120L180 220H340L400 280H780L850 210H1030L1090 150H1200" />
      <path d="M80 0V45L140 105H360L430 35H760L840 115H1060L1130 45V0" />
      <path d="M0 300H160L230 230V160L300 90H550L620 160H800L880 240H1200" />
      {[ [170,70],[390,130],[610,190],[870,120],[120,160],[340,220],[780,280],[1030,210],[360,105],[760,35],[1060,115],[550,90],[800,160] ].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />)}
    </g>
    <path className="circuit-signal" d="M0 70H170L230 130H390L450 190H610L680 120H870L940 50H1200" />
    <path className="circuit-signal signal-secondary" d="M1200 300H880L800 220H620L550 150H300L230 220H0" />
  </svg>;
}