import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArquivoLoteDropzone } from "./ArquivoLoteDropzone";
import { novoAcessoSchema, type NovoAcessoFormValues } from "./novo-acesso-schema";
import { enviarNovoAcesso } from "@/services/solicitacao";
import { FlowActions, FlowHeading, FlowProgress, ReviewFields, useGuidedFlow } from "./GuidedFlow";

const defaults: NovoAcessoFormValues = { nomeSolicitante: "", emailSolicitante: "", nomeUsuario: "", loginUsuario: "", emailUsuario: "", cargo: "", area: "" };
const requester = ["nomeSolicitante", "emailSolicitante"] as const;
const userFields = ["nomeUsuario", "loginUsuario", "emailUsuario", "cargo", "area"] as const;
const labels: Record<keyof NovoAcessoFormValues, string> = { nomeSolicitante: "Nome do solicitante", emailSolicitante: "E-mail do solicitante", nomeUsuario: "Nome do novo usuário", loginUsuario: "Login do novo usuário", emailUsuario: "E-mail do novo usuário", cargo: "Cargo/Papel", area: "Área" };
const placeholders: Record<keyof NovoAcessoFormValues, string> = { nomeSolicitante: "Seu nome", emailSolicitante: "seu.email@empresa.com", nomeUsuario: "Nome completo", loginUsuario: "Ex.: joao.silva", emailUsuario: "novo.usuario@empresa.com", cargo: "Ex.: Analista", area: "Ex.: Operações" };

export function NovoAcessoForm({ modo, onExit }: { modo: "individual" | "lote"; onExit: () => void }) {
  const { step, setStep, advance } = useGuidedFlow();
  const form = useForm<NovoAcessoFormValues>({ resolver: zodResolver(novoAcessoSchema), mode: "onChange", defaultValues: defaults });
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [erroArquivo, setErroArquivo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState<{ fields: Array<[string, string]>; date: Date } | null>(null);
  const fields: Array<[string, string]> = [...requester, ...(modo === "individual" ? userFields : [])].map(key => [labels[key], form.watch(key)]);
  if (modo === "lote") fields.push(["Arquivo", arquivo?.name ?? "Não informado"]);

  const validate = async () => {
    if (step === 1) return form.trigger([...requester], { shouldFocus: true });
    if (modo === "individual") return form.trigger([...userFields], { shouldFocus: true });
    if (!arquivo) { setErroArquivo("Anexe o arquivo CSV ou Excel com os usuários."); return false; }
    return true;
  };
  const submit = async () => {
    const valid = await form.trigger(modo === "individual" ? [...requester, ...userFields] : [...requester], { shouldFocus: true });
    if (!valid || (modo === "lote" && !arquivo)) return;
    setBusy(true);
    try {
      const values = form.getValues();
      if (modo === "individual") await enviarNovoAcesso({ modo, ...values });
      else if (arquivo) await enviarNovoAcesso({ modo, nomeSolicitante: values.nomeSolicitante, emailSolicitante: values.emailSolicitante, arquivo });
      setSuccess({ fields, date: new Date() });
      toast.success("Solicitação enviada com sucesso.");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Não foi possível enviar sua solicitação. Tente novamente."); }
    finally { setBusy(false); }
  };
  const renderField = (key: keyof NovoAcessoFormValues) => <div key={key} className="space-y-2">
    <Label htmlFor={key}>{labels[key]}</Label><Input id={key} placeholder={placeholders[key]} type={key.startsWith("email") ? "email" : "text"} className="h-12" disabled={busy} aria-invalid={!!form.formState.errors[key]} {...form.register(key)} />
    {form.formState.errors[key] && <p className="text-xs font-medium text-destructive">{form.formState.errors[key]?.message}</p>}
  </div>;
  if (success) return <div className="step-content space-y-7"><div className="success-heading"><CheckCircle2 className="h-12 w-12 text-primary" /><h2 className="text-2xl font-semibold">Solicitação enviada com sucesso</h2><p className="text-sm text-muted-foreground">Enviada em {success.date.toLocaleString("pt-BR")}</p></div><ReviewFields fields={success.fields} /><Button onClick={onExit} size="lg">Nova solicitação</Button></div>;
  return <form className="guided-form" noValidate onSubmit={event => { event.preventDefault(); if (step === 3) { if (!busy) void submit(); } else void advance(validate); }}>
    <FlowProgress step={step} />
    <div className="step-content" key={step}>
      <FlowHeading eyebrow={`Novo acesso / ${modo === "individual" ? "Individual" : "Em lote"}`} title={step === 1 ? "Quem está solicitando?" : step === 2 ? modo === "individual" ? "Dados do novo usuário" : "Usuários para cadastro" : "Confira sua solicitação"} />
      <div hidden={step !== 1} className="grid gap-5 sm:grid-cols-2">{requester.map(renderField)}</div>
      <div hidden={step !== 2}>
        {modo === "individual" ? <div className="grid gap-5 sm:grid-cols-2">{userFields.map(renderField)}</div> : <div className="space-y-2"><Label>Arquivo CSV ou Excel</Label><ArquivoLoteDropzone file={arquivo} disabled={busy} error={erroArquivo ?? undefined} onChange={file => { setArquivo(file); if (file) setErroArquivo(null); }} /></div>}
      </div>
      {step === 3 && <ReviewFields fields={fields} />}
    </div>
    <FlowActions step={step} busy={busy} onBack={() => step === 1 ? onExit() : setStep(step - 1)} onContinue={() => void advance(validate)} />
  </form>;
}
