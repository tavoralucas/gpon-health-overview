import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ImageDropzone } from "./ImageDropzone";
import { AREAS, solicitacaoSchema, type SolicitacaoFormValues } from "./schema";
import { enviarSolicitacao } from "@/services/solicitacao";
import {
  SolicitacaoConfirmacao,
  type SolicitacaoResumo,
} from "./SolicitacaoConfirmacao";


const defaultValues: Partial<SolicitacaoFormValues> = {
  nome: "",
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

  const imagem = watch("imagem") ?? null;
  const area = watch("area");

  const onSubmit = async (values: SolicitacaoFormValues) => {
    try {
      await enviarSolicitacao({
        nome: values.nome,
        area: values.area,
        titulo: values.titulo,
        texto: values.texto,
        imagem: values.imagem ?? null,
      });
      toast.success("Solicitação enviada com sucesso.");
      reset(defaultValues as SolicitacaoFormValues);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua solicitação. Tente novamente."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Nome */}
      <div className="space-y-2">
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          placeholder="Seu nome completo"
          disabled={isSubmitting}
          aria-invalid={!!errors.nome}
          {...register("nome")}
        />
        {errors.nome && (
          <p className="text-sm font-medium text-destructive">{errors.nome.message}</p>
        )}
      </div>

      {/* Área */}
      <div className="space-y-2">
        <Label htmlFor="area">Área</Label>
        <Select
          value={area ?? ""}
          disabled={isSubmitting}
          onValueChange={(value) =>
            setValue("area", value as SolicitacaoFormValues["area"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger id="area" aria-invalid={!!errors.area}>
            <SelectValue placeholder="Selecione a área" />
          </SelectTrigger>
          <SelectContent>
            {AREAS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.area && (
          <p className="text-sm font-medium text-destructive">{errors.area.message}</p>
        )}
      </div>

      {/* Título */}
      <div className="space-y-2">
        <Label htmlFor="titulo">Título</Label>
        <Input
          id="titulo"
          placeholder="Resumo da sua solicitação"
          disabled={isSubmitting}
          aria-invalid={!!errors.titulo}
          {...register("titulo")}
        />
        {errors.titulo && (
          <p className="text-sm font-medium text-destructive">{errors.titulo.message}</p>
        )}
      </div>

      {/* Descrição */}
      <div className="space-y-2">
        <Label htmlFor="texto">Descrição</Label>
        <Textarea
          id="texto"
          rows={6}
          placeholder="Descreva sua solicitação com pelo menos 20 caracteres"
          disabled={isSubmitting}
          aria-invalid={!!errors.texto}
          {...register("texto")}
        />
        {errors.texto && (
          <p className="text-sm font-medium text-destructive">{errors.texto.message}</p>
        )}
      </div>

      {/* Imagem */}
      <div className="space-y-2">
        <Label>Imagem (opcional)</Label>
        <ImageDropzone
          file={imagem}
          disabled={isSubmitting}
          error={errors.imagem?.message as string | undefined}
          onChange={(file) => setValue("imagem", file, { shouldValidate: true })}
        />
      </div>

      <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={isSubmitting}>
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
