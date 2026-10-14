import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, UserPlus, Users } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { ArquivoLoteDropzone } from "./ArquivoLoteDropzone";
import {
  loteSchema,
  novoAcessoSchema,
  type LoteFormValues,
  type NovoAcessoFormValues,
} from "./novo-acesso-schema";
import { enviarNovoAcesso } from "@/services/solicitacao";

type Modo = "individual" | "lote";

interface ResumoNovoAcesso {
  modo: Modo;
  nomeSolicitante: string;
  detalhe: string;
  enviadaEm: Date;
}

const defaultIndividual: NovoAcessoFormValues = {
  nomeSolicitante: "",
  emailSolicitante: "",
  nomeUsuario: "",
  loginUsuario: "",
  emailUsuario: "",
  cargo: "",
  area: "",
};

const defaultLote: LoteFormValues = {
  nomeSolicitante: "",
  emailSolicitante: "",
};

export function NovoAcessoForm() {
  const [modo, setModo] = useState<Modo>("individual");
  const [resumo, setResumo] = useState<ResumoNovoAcesso | null>(null);

  const individual = useForm<NovoAcessoFormValues>({
    resolver: zodResolver(novoAcessoSchema),
    mode: "onChange",
    defaultValues: defaultIndividual,
  });

  const lote = useForm<LoteFormValues>({
    resolver: zodResolver(loteSchema),
    mode: "onChange",
    defaultValues: defaultLote,
  });

  const [arquivo, setArquivo] = useState<File | null>(null);
  const [erroArquivo, setErroArquivo] = useState<string | null>(null);
  const [enviandoLote, setEnviandoLote] = useState(false);

  const onSubmitIndividual = async (values: NovoAcessoFormValues) => {
    try {
      await enviarNovoAcesso({
        modo: "individual",
        nomeSolicitante: values.nomeSolicitante,
        emailSolicitante: values.emailSolicitante,
        nomeUsuario: values.nomeUsuario,
        loginUsuario: values.loginUsuario,
        emailUsuario: values.emailUsuario,
        cargo: values.cargo,
        area: values.area,
      });
      toast.success("Solicitação enviada com sucesso.");
      setResumo({
        modo: "individual",
        nomeSolicitante: values.nomeSolicitante,
        detalhe: `${values.nomeUsuario} (${values.loginUsuario}) — ${values.emailUsuario}`,
        enviadaEm: new Date(),
      });
      individual.reset(defaultIndividual);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua solicitação. Tente novamente."
      );
    }
  };

  const onSubmitLote = async (values: LoteFormValues) => {
    if (!arquivo) {
      setErroArquivo("Anexe o arquivo CSV ou Excel com os usuários.");
      return;
    }
    setEnviandoLote(true);
    try {
      await enviarNovoAcesso({
        modo: "lote",
        nomeSolicitante: values.nomeSolicitante,
        emailSolicitante: values.emailSolicitante,
        arquivo,
      });
      toast.success("Solicitação enviada com sucesso.");
      setResumo({
        modo: "lote",
        nomeSolicitante: values.nomeSolicitante,
        detalhe: `Arquivo: ${arquivo.name}`,
        enviadaEm: new Date(),
      });
      lote.reset(defaultLote);
      setArquivo(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua solicitação. Tente novamente."
      );
    } finally {
      setEnviandoLote(false);
    }
  };

  if (resumo) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center animate-fade-in">
        <CheckCircle2 className="h-14 w-14 text-primary" />
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">Solicitação enviada</h2>
          <p className="text-sm text-muted-foreground">
            {resumo.modo === "individual" ? "Cadastro individual" : "Cadastro em lote"} solicitado
            por {resumo.nomeSolicitante}.
          </p>
          <p className="text-sm text-muted-foreground">{resumo.detalhe}</p>
          <p className="text-xs text-muted-foreground">
            Enviada em {resumo.enviadaEm.toLocaleString("pt-BR")}
          </p>
        </div>
        <Button type="button" variant="outline" onClick={() => setResumo(null)}>
          Nova solicitação
        </Button>
      </div>
    );
  }

  const isSubmitting = individual.formState.isSubmitting || enviandoLote;

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Abas */}
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
        <button
          type="button"
          onClick={() => setModo("individual")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            modo === "individual"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <UserPlus className="h-4 w-4" />
          Cadastro individual
        </button>
        <button
          type="button"
          onClick={() => setModo("lote")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            modo === "lote"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Users className="h-4 w-4" />
          Cadastro em lote
        </button>
      </div>

      {modo === "individual" ? (
        <form
          onSubmit={individual.handleSubmit(onSubmitIndividual)}
          className="flex h-full flex-col justify-between gap-3"
          noValidate
        >
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Use este formulário para solicitar a criação de um único usuário.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="nomeSolicitante" className="text-sm">Nome do solicitante</Label>
              <Input
                id="nomeSolicitante"
                placeholder="Seu nome"
                disabled={isSubmitting}
                aria-invalid={!!individual.formState.errors.nomeSolicitante}
                className="h-10"
                {...individual.register("nomeSolicitante")}
              />
              {individual.formState.errors.nomeSolicitante && (
                <p className="text-xs font-medium text-destructive">
                  {individual.formState.errors.nomeSolicitante.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="emailSolicitante" className="text-sm">E-mail do solicitante</Label>
              <Input
                id="emailSolicitante"
                type="email"
                placeholder="seu.email@empresa.com"
                disabled={isSubmitting}
                aria-invalid={!!individual.formState.errors.emailSolicitante}
                className="h-10"
                {...individual.register("emailSolicitante")}
              />
              {individual.formState.errors.emailSolicitante && (
                <p className="text-xs font-medium text-destructive">
                  {individual.formState.errors.emailSolicitante.message}
                </p>
              )}
            </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="nomeUsuario" className="text-sm">Nome do novo usuário</Label>
                <Input
                  id="nomeUsuario"
                  placeholder="Nome completo"
                  disabled={isSubmitting}
                  aria-invalid={!!individual.formState.errors.nomeUsuario}
                  className="h-10"
                  {...individual.register("nomeUsuario")}
                />
                {individual.formState.errors.nomeUsuario && (
                  <p className="text-xs font-medium text-destructive">
                    {individual.formState.errors.nomeUsuario.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="loginUsuario" className="text-sm">Login do novo usuário</Label>
                <Input
                  id="loginUsuario"
                  placeholder="Ex.: joao.silva"
                  disabled={isSubmitting}
                  aria-invalid={!!individual.formState.errors.loginUsuario}
                  className="h-10"
                  {...individual.register("loginUsuario")}
                />
                {individual.formState.errors.loginUsuario && (
                  <p className="text-xs font-medium text-destructive">
                    {individual.formState.errors.loginUsuario.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="emailUsuario" className="text-sm">E-mail do novo usuário</Label>
              <Input
                id="emailUsuario"
                type="email"
                placeholder="novo.usuario@empresa.com"
                disabled={isSubmitting}
                aria-invalid={!!individual.formState.errors.emailUsuario}
                className="h-10"
                {...individual.register("emailUsuario")}
              />
              {individual.formState.errors.emailUsuario && (
                <p className="text-xs font-medium text-destructive">
                  {individual.formState.errors.emailUsuario.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="cargo" className="text-sm">Cargo/Papel</Label>
                <Input
                  id="cargo"
                  placeholder="Ex.: Analista"
                  disabled={isSubmitting}
                  aria-invalid={!!individual.formState.errors.cargo}
                  className="h-10"
                  {...individual.register("cargo")}
                />
                {individual.formState.errors.cargo && (
                  <p className="text-xs font-medium text-destructive">
                    {individual.formState.errors.cargo.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="area" className="text-sm">Área</Label>
                <Input
                  id="area"
                  placeholder="Ex.: Operações"
                  disabled={isSubmitting}
                  aria-invalid={!!individual.formState.errors.area}
                  className="h-10"
                  {...individual.register("area")}
                />
                {individual.formState.errors.area && (
                  <p className="text-xs font-medium text-destructive">
                    {individual.formState.errors.area.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" className="h-10 w-full text-sm" disabled={isSubmitting}>
            {individual.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Solicitação
              </>
            )}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={lote.handleSubmit(onSubmitLote)}
          className="flex h-full flex-col justify-between gap-3"
          noValidate
        >
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Use o upload de arquivo para solicitar a criação de múltiplos usuários de uma vez.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="loteNomeSolicitante" className="text-sm">Nome do solicitante</Label>
                <Input
                  id="loteNomeSolicitante"
                  placeholder="Seu nome"
                  disabled={isSubmitting}
                  aria-invalid={!!lote.formState.errors.nomeSolicitante}
                  className="h-10"
                  {...lote.register("nomeSolicitante")}
                />
                {lote.formState.errors.nomeSolicitante && (
                  <p className="text-xs font-medium text-destructive">
                    {lote.formState.errors.nomeSolicitante.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="loteEmailSolicitante" className="text-sm">E-mail do solicitante</Label>
                <Input
                  id="loteEmailSolicitante"
                  type="email"
                  placeholder="seu.email@empresa.com"
                  disabled={isSubmitting}
                  aria-invalid={!!lote.formState.errors.emailSolicitante}
                  className="h-10"
                  {...lote.register("emailSolicitante")}
                />
                {lote.formState.errors.emailSolicitante && (
                  <p className="text-xs font-medium text-destructive">
                    {lote.formState.errors.emailSolicitante.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Arquivo CSV ou Excel</Label>
              <ArquivoLoteDropzone
                file={arquivo}
                disabled={isSubmitting}
                error={erroArquivo ?? undefined}
                onChange={(f) => {
                  setArquivo(f);
                  if (f) setErroArquivo(null);
                }}
              />
            </div>
          </div>

          <Button type="submit" className="h-10 w-full text-sm" disabled={isSubmitting}>
            {enviandoLote ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Solicitação
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
