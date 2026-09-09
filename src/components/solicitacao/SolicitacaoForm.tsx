import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
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

export function SolicitacaoForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SolicitacaoFormValues>({
    resolver: zodResolver(solicitacaoSchema),
    mode: "onBlur",
    defaultValues: defaultValues as SolicitacaoFormValues,
  });

  const [resumo, setResumo] = useState<SolicitacaoResumo | null>(null);

  const imagem = watch("imagem") ?? null;

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
        codigoCidade: values.codigoCidade,
        enderecoMac: values.enderecoMac,
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
        onNovaSolicitacao={() => setResumo(null)}
      />
    );
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col justify-between gap-4" noValidate>
      <div className="space-y-4">
        {/* Nome */}
        <div className="space-y-1.5">
          <Label htmlFor="nome" className="text-sm">Nome ou Login</Label>
          <Input
            id="nome"
            placeholder="Preencha aqui seu nome ou login"
            disabled={isSubmitting}
            aria-invalid={!!errors.nome}
            className="h-11"
            {...register("nome")}
          />
          {errors.nome && (
            <p className="text-xs font-medium text-destructive">{errors.nome.message}</p>
          )}
        </div>

        {/* E-mail */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu.email@empresa.com"
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            className="h-11"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs font-medium text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Código da Cidade + Endereço MAC (lado a lado) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="codigoCidade" className="text-sm">Código da Cidade</Label>
            <Input
              id="codigoCidade"
              placeholder="Ex.: 5100"
              disabled={isSubmitting}
              aria-invalid={!!errors.codigoCidade}
              className="h-11"
              {...register("codigoCidade")}
            />
            {errors.codigoCidade && (
              <p className="text-xs font-medium text-destructive">{errors.codigoCidade.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="enderecoMac" className="text-sm">Endereço MAC</Label>
            <Input
              id="enderecoMac"
              placeholder="AA:BB:CC:DD:EE:FF"
              disabled={isSubmitting}
              aria-invalid={!!errors.enderecoMac}
              className="h-11"
              {...register("enderecoMac")}
            />
            {errors.enderecoMac && (
              <p className="text-xs font-medium text-destructive">{errors.enderecoMac.message}</p>
            )}
          </div>
        </div>

        {/* Título */}
        <div className="space-y-1.5">
          <Label htmlFor="titulo" className="text-sm">Título</Label>
          <Input
            id="titulo"
            placeholder="Resumo da sua solicitação"
            disabled={isSubmitting}
            aria-invalid={!!errors.titulo}
            className="h-11"
            {...register("titulo")}
          />
          {errors.titulo && (
            <p className="text-xs font-medium text-destructive">{errors.titulo.message}</p>
          )}
        </div>

        {/* Descrição */}
        <div className="space-y-1.5">
          <Label htmlFor="texto" className="text-sm">Descrição</Label>
          <Textarea
            id="texto"
            rows={4}
            placeholder="Descreva sua solicitacao, pedido ou falha contendo a maior quantidade de informações possíveis"
            disabled={isSubmitting}
            aria-invalid={!!errors.texto}
            className="min-h-[96px] resize-none"
            {...register("texto")}
          />
          {errors.texto && (
            <p className="text-xs font-medium text-destructive">{errors.texto.message}</p>
          )}
        </div>

        {/* Imagem */}
        <div className="space-y-1.5">
          <Label className="text-sm">Imagem (opcional)</Label>
          <ImageDropzone
            file={imagem}
            disabled={isSubmitting}
            error={errors.imagem?.message as string | undefined}
            onChange={(file) => setValue("imagem", file, { shouldValidate: true })}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Enviar Solicitação
          </>
        )}
      </Button>
    </form>
  );
}
