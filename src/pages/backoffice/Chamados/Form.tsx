// T-011: Chamado form page (manual creation)

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTicket } from '@/services/tickets';
import { chamadoSchema, type ChamadoFormData } from '@/pages/backoffice/Chamados/schema';
import { calcularPrioridade } from '@/lib/prioridade';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useTranslation } from 'react-i18next';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES = 5;

const PRIORIDADE_LABELS: Record<string, string> = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
  critica: 'Crítica',
};

export function ChamadoFormPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createTicket = useCreateTicket();
  const [selectedUrgencia, setSelectedUrgencia] = useState<string>('media');
  const [selectedImpacto, setSelectedImpacto] = useState<string>('local');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ChamadoFormData>({
    resolver: zodResolver(chamadoSchema),
    defaultValues: {
      titulo: '',
      tipo: 'problema_tecnico',
      solicitante_nome: '',
      solicitante_email: '',
      urgencia: 'media',
      impacto: 'local',
      descricao: '',
      codigo_cidade: '',
      endereco_mac: '',
    },
  });

  const tipo = form.watch('tipo');
  const urgencia = form.watch('urgencia');
  const impacto = form.watch('impacto');
  const prioridade = calcularPrioridade(urgencia, impacto);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate total count
    const combined = [...selectedFiles, ...files];
    if (combined.length > MAX_FILES) {
      setFileError(`Máximo de ${MAX_FILES} arquivos permitidos.`);
      return;
    }

    // Validate each file
    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const validExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'csv', 'xls', 'xlsx'];
      if (!validExts.includes(ext || '')) {
        setFileError(`Formato não permitido: ${ext}. Use JPG, PNG, GIF, WEBP, PDF, CSV, XLS, XLSX.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`Arquivo muito grande: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB). Máximo: 10 MB.`);
        return;
      }
    }

    setSelectedFiles(combined);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError('');
  };

  const onSubmit = async (data: ChamadoFormData) => {
    try {
      const result = await createTicket.mutateAsync({
        titulo: data.titulo,
        tipo: data.tipo,
        descricao: data.descricao,
        solicitante_nome: data.solicitante_nome,
        solicitante_email: data.solicitante_email,
        urgencia: data.urgencia,
        impacto: data.impacto,
        codigo_cidade: data.codigo_cidade || undefined,
        endereco_mac: data.endereco_mac || undefined,
        origem: 'manual',
        novo_acesso: data.novo_usuario,
        files: selectedFiles.length > 0 ? selectedFiles : undefined,
      });

      navigate(`/backoffice/chamados/${result.id}`);
    } catch (err) {
      console.error('Erro ao criar chamado:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Novo Chamado</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do chamado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título do chamado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="problema_tecnico">Problema Técnico</SelectItem>
                        <SelectItem value="novo_acesso_individual">Novo Acesso Individual</SelectItem>
                        <SelectItem value="novo_acesso_lote">Novo Acesso em Lote</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="solicitante_nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do solicitante</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="solicitante_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail do solicitante</FormLabel>
                      <FormControl>
                        <Input placeholder="email@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva o problema (mín. 20 caracteres)"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Type-specific fields */}
          {tipo === 'problema_tecnico' && (
            <Card>
              <CardHeader>
                <CardTitle>Contexto de rede</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="codigo_cidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código da cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 038" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco_mac"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço MAC</FormLabel>
                      <FormControl>
                        <Input placeholder="AA:BB:CC:DD:EE:FF" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {tipo === 'novo_acesso_individual' && (
            <Card>
              <CardHeader>
                <CardTitle>Dados do novo usuário</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="novo_usuario.nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do usuário" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="novo_usuario.login"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Login</FormLabel>
                      <FormControl>
                        <Input placeholder="Login" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="novo_usuario.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="email@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="novo_usuario.cargo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <FormControl>
                        <Input placeholder="Cargo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="novo_usuario.area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Área</FormLabel>
                      <FormControl>
                        <Input placeholder="Área" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Prioridade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="urgencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgência</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="baixa">Baixa</SelectItem>
                          <SelectItem value="media">Média</SelectItem>
                          <SelectItem value="alta">Alta</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="impacto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impacto</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="local">Local</SelectItem>
                          <SelectItem value="setor">Setor</SelectItem>
                          <SelectItem value="massa">Massa</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4 p-3 bg-muted rounded-md">
                <span className="text-sm text-muted-foreground">
                  Prioridade calculada:{' '}
                  <strong>{PRIORIDADE_LABELS[prioridade] || prioridade}</strong>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle>Anexos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <p className="text-sm text-muted-foreground">
                  Arraste arquivos aqui ou clique para selecionar
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, GIF, WEBP, PDF, CSV, XLS, XLSX — Máx. 10 MB por arquivo (máx. {MAX_FILES})
                </p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.csv,.xls,.xlsx"
                  multiple
                />
              </div>

              {fileError && (
                <p className="text-sm text-red-500">{fileError}</p>
              )}

              {selectedFiles.length > 0 && (
                <ul className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                      <span className="text-sm truncate">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        Remover
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={createTicket.isLoading}>
              {createTicket.isLoading ? 'Salvando...' : 'Criar Chamado'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/backoffice/chamados')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
