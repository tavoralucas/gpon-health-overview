import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlowProgress, FlowActions, FlowHeading, ReviewFields, useGuidedFlow } from "./GuidedFlow";
import { toast } from "sonner";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { ImageDropzone } from "./ImageDropzone";
import { solicitacaoSchema, type SolicitacaoFormValues } from "./schema";
import { enviarSolicitacao } from "@/services/solicitacao";
import {
  SolicitacaoConfirmacao,
  type SolicitacaoResumo,
} from "./SolicitacaoConfirmacao";


const defaultValues: Partial<SolicitacaoFormValues> = {
  nome: "",
  email: "",
  codigoCidade: "",
  enderecoMac: "",
  titulo: "",
  texto: "",
  imagem: null,
};

export function SolicitacaoForm({ onExit }: { onExit: () => void }) {
  const { step, setStep, advance } = useGuidedFlow();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SolicitacaoFormValues>({
    resolver: zodResolver(solicitacaoSchema),
    mode: "onChange",
    defaultValues: defaultValues as SolicitacaoFormValues,
  });

  const [resumo, setResumo] = useState<SolicitacaoResumo | null>(null);

  const imagem = watch("imagem") ?? null;

  const codigoCidadeField = register("codigoCidade");
  const enderecoMacField = register("enderecoMac");

  const onSubmit = async (values: SolicitacaoFormValues) => {
    try {
      await enviarSolicitacao({
        nome: values.nome,
        email: values.email,
        codigoCidade: values.codigoCidade,
        enderecoMac: values.enderecoMac,
        titulo: values.titulo,
        texto: values.texto,
        imagem: values.imagem ?? null,
      });
      toast.success("Solicitação enviada com sucesso.");
      setResumo({
        nome: values.nome,
        email: values.email,
        codigoCidade: values.codigoCidade ?? "",
        enderecoMac: values.enderecoMac ?? "",
        titulo: values.titulo,
        texto: values.texto,
        imagem: values.imagem
          ? { name: values.imagem.name, size: values.imagem.size }
          : null,
        enviadaEm: new Date(),
      });
      reset(defaultValues as SolicitacaoFormValues);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua solicitação. Tente novamente."
      );
    }
  };

  if (resumo) {
    return (
      <SolicitacaoConfirmacao
        resumo={resumo}
        onNovaSolicitacao={onExit}
      />
    );
  }



  return (
    <form onSubmit={(event) => { if (step !== 3) { event.preventDefault(); void advance(() => trigger(step === 1 ? ["nome", "email"] : ["codigoCidade", "enderecoMac", "titulo", "texto", "imagem"], { shouldFocus: true })); } else { void handleSubmit(onSubmit)(event); } }} className="guided-form" noValidate>
      <FlowProgress step={step} />
      <div className="step-content" key={step}>
      <FlowHeading eyebrow="Problema técnico" title={step === 1 ? "Vamos começar por você" : step === 2 ? "O que aconteceu?" : "Confira sua solicitação"} />
      <div hidden={step !== 1} className="space-y-5">
        {/* Nome */}
        <div className="space-y-1">
          <Label htmlFor="nome" className="text-sm">Nome ou Login</Label>
          <Input
            id="nome"
            placeholder="Preencha aqui seu nome ou login"
            disabled={isSubmitting}
            aria-invalid={!!errors.nome}
            className="h-12"
            {...register("nome")}
          />
          {errors.nome && (
            <p className="text-xs font-medium text-destructive">{errors.nome.message}</p>
          )}
        </div>

        {/* E-mail */}
        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu.email@empresa.com"
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            className="h-12"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs font-medium text-destructive">{errors.email.message}</p>
          )}
        </div>

      </div>
      <div hidden={step !== 2} className="space-y-5">
        {/* Código da Cidade + Endereço MAC (lado a lado) */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="codigoCidade" className="text-sm">Código da Cidade (opcional)</Label>
            <Input
              id="codigoCidade"
              placeholder="Ex.: 038"
              inputMode="numeric"
              maxLength={3}
              disabled={isSubmitting}
              aria-invalid={!!errors.codigoCidade}
              className="h-12"
              {...codigoCidadeField}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
                codigoCidadeField.onChange(e);
              }}
            />
            {errors.codigoCidade && (
              <p className="text-xs font-medium text-destructive">{errors.codigoCidade.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="enderecoMac" className="text-sm">Endereço MAC (opcional)</Label>
            <Input
              id="enderecoMac"
              placeholder="AA:BB:CC:DD:EE:FF"
              maxLength={17}
              disabled={isSubmitting}
              aria-invalid={!!errors.enderecoMac}
              className="h-12"
              {...enderecoMacField}
              onChange={(e) => {
                const hex = e.target.value
                  .replace(/[^0-9A-Fa-f]/g, "")
                  .slice(0, 12)
                  .toUpperCase();
                e.target.value = hex.replace(/(.{2})(?=.)/g, "$1:");
                enderecoMacField.onChange(e);
              }}
            />
            {errors.enderecoMac && (
              <p className="text-xs font-medium text-destructive">{errors.enderecoMac.message}</p>
            )}
          </div>
        </div>

        {/* Título */}
        <div className="space-y-1">
          <Label htmlFor="titulo" className="text-sm">Título</Label>
          <Input
            id="titulo"
            placeholder="Resumo da sua solicitação"
            disabled={isSubmitting}
            aria-invalid={!!errors.titulo}
            className="h-12"
            {...register("titulo")}
          />
          {errors.titulo && (
            <p className="text-xs font-medium text-destructive">{errors.titulo.message}</p>
          )}
        </div>

        {/* Descrição */}
        <div className="space-y-1">
          <Label htmlFor="texto" className="text-sm">Descrição</Label>
          <Textarea
            id="texto"
            rows={3}
            placeholder="Descreva sua solicitacao, pedido ou falha contendo a maior quantidade de informações possíveis"
            disabled={isSubmitting}
            aria-invalid={!!errors.texto}
            className="min-h-[112px] resize-y"
            {...register("texto")}
          />
          {errors.texto && (
            <p className="text-xs font-medium text-destructive">{errors.texto.message}</p>
          )}
        </div>

        {/* Imagem */}
        <div className="space-y-1">
          <Label className="text-sm">Imagem (opcional)</Label>
          <ImageDropzone
            file={imagem}
            disabled={isSubmitting}
            error={errors.imagem?.message as string | undefined}
            onChange={(file) => setValue("imagem", file, { shouldValidate: true })}
          />
        </div>
      </div>

      {step === 3 && <ReviewFields fields={[["Nome ou Login", watch("nome")], ["E-mail", watch("email")], ["Código da Cidade", watch("codigoCidade")], ["Endereço MAC", watch("enderecoMac")], ["Título", watch("titulo")], ["Descrição", watch("texto")], ["Imagem", imagem?.name]]} />}
      </div>
      <FlowActions step={step} busy={isSubmitting} onBack={() => step === 1 ? onExit() : setStep(step - 1)} onContinue={() => void advance(() => trigger(step === 1 ? ["nome", "email"] : ["codigoCidade", "enderecoMac", "titulo", "texto", "imagem"], { shouldFocus: true }))} />
    </form>
  );
}
