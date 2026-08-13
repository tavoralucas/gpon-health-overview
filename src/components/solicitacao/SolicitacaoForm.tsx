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
        titulo: values.titulo,
        texto: values.texto,
        imagem: values.imagem ?? null,
      });
      toast.success("Solicitação enviada com sucesso.");
      setResumo({
        nome: values.nome,
        email: values.email,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Nome */}
      <div className="space-y-2">
        <Label htmlFor="nome">Nome ou Login</Label>
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

      {/* E-mail */}
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu.email@empresa.com"
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
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
          placeholder="Descreva sua solicitacao, pedido ou falha contendo a maior quantidade de informações possíveis"
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
