// T-009: Tickets service hooks (TanStack Query)

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { calcularPrioridade } from '@/lib/prioridade';
import type { Urgencia, Impacto } from '@/lib/prioridade';

export interface TicketFilters {
  status?: string;
  prioridade?: string;
  tipo?: string;
  origem?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface Ticket {
  id: string;
  numero: string;
  titulo: string;
  descricao: string;
  tipo: string;
  origem: string;
  solicitante_nome: string;
  solicitante_email: string;
  codigo_cidade: string | null;
  endereco_mac: string | null;
  urgencia: string;
  impacto: string;
  prioridade: string;
  status: string;
  atribuido_a: string | null;
  criado_por: string | null;
  resolvido_em: string | null;
  fechado_em: string | null;
  novo_acesso: {
    nome?: string;
    login?: string;
    email?: string;
    cargo?: string;
    area?: string;
  } | null;
  created_at: string;
  updated_at: string;
  atribuido_a_profile?: { name: string } | null;
}

export function useTickets(filters: TicketFilters) {
  return useQuery({
    queryKey: ['tickets', filters],
    queryFn: async () => {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 20;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('tickets')
        .select('*', { count: 'exact' });

      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.prioridade) {
        query = query.eq('prioridade', filters.prioridade);
      }
      if (filters.tipo) {
        query = query.eq('tipo', filters.tipo);
      }
      if (filters.origem) {
        query = query.eq('origem', filters.origem);
      }
      if (filters.search) {
        query = query.or(
          `titulo.ilike.%${filters.search}%,numero.ilike.%${filters.search}%,descricao.ilike.%${filters.search}%,solicitante_nome.ilike.%${filters.search}%,solicitante_email.ilike.%${filters.search}%`
        );
      }

      if (filters.startDate) {
        query = query.gte('created_at', filters.startDate);
      }
      if (filters.endDate) {
        // Add one day to include the full end date
        const endDate = new Date(filters.endDate);
        endDate.setDate(endDate.getDate() + 1);
        query = query.lt('created_at', endDate.toISOString());
      }

      const sortBy = filters.sortBy || 'created_at';
      const sortOrder = filters.sortOrder || 'desc';
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;
      return { data: data as Ticket[], count: count ?? 0 };
    },
  });
}

export function useTicket(id: string) {
  return useQuery({
    queryKey: ['tickets', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Ticket;
    },
    enabled: !!id,
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      titulo: string;
      tipo: string;
      descricao: string;
      solicitante_nome: string;
      solicitante_email: string;
      urgencia: Urgencia;
      impacto: Impacto;
      codigo_cidade?: string;
      endereco_mac?: string;
      origem?: string;
      novo_acesso?: {
        nome?: string;
        login?: string;
        email?: string;
        cargo?: string;
        area?: string;
      };
      files?: File[];
    }) => {
      const prioridade = calcularPrioridade(input.urgencia, input.impacto);

      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;

      // Generate sequential ticket number
      const { data: seqData } = await supabase.rpc('next_chamado_numero');
      const numero = seqData || `CHM-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;

      const ticketInsert: Record<string, any> = {
        numero,
        titulo: input.titulo,
        descricao: input.descricao,
        tipo: input.tipo,
        origem: input.origem || 'manual',
        solicitante_nome: input.solicitante_nome,
        solicitante_email: input.solicitante_email,
        codigo_cidade: input.codigo_cidade || null,
        endereco_mac: input.endereco_mac || null,
        urgencia: input.urgencia,
        impacto: input.impacto,
        prioridade,
        status: 'novo',
        criado_por: userId,
      };

      if (input.novo_acesso) {
        ticketInsert.novo_acesso = input.novo_acesso;
      }

      const { data, error } = await supabase
        .from('tickets')
        .insert(ticketInsert as any)
        .select()
        .single();

      if (error) throw error;

      // Create initial timeline event
      await supabase
        .from('ticket_followups')
        .insert({
          ticket_id: data.id,
          tipo: 'system',
          conteudo: `Chamado criado com prioridade ${prioridade}`,
          autor: userId,
        });

      // Upload attachments if provided
      if (input.files && input.files.length > 0) {
        for (const file of input.files) {
          const fileExt = file.name.split('.').pop();
          const storagePath = `chamados/${data.id}/${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('anexos-chamados')
            .upload(storagePath, file);

          if (uploadError) {
            console.error('Erro ao fazer upload de anexo:', uploadError);
            continue;
          }

          await supabase
            .from('ticket_attachments')
            .insert({
              ticket_id: data.id,
              storage_path: storagePath,
              nome_arquivo: file.name,
              tamanho_bytes: file.size,
              content_type: file.type,
              uploaded_by: userId,
            });

          await supabase
            .from('ticket_followups')
            .insert({
              ticket_id: data.id,
              tipo: 'system',
              conteudo: `Arquivo anexado: ${file.name}`,
              autor: userId,
            });
        }
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
}

export function useUpdateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      id: string;
      status?: string;
      urgencia?: Urgencia;
      impacto?: Impacto;
      prioridade?: string;
      atribuido_a?: string | null;
      titulo?: string;
      descricao?: string;
    }) => {
      // If urgencia or impacto changed, recalculate prioridade
      const updateData: Record<string, any> = {};
      if (input.status) updateData.status = input.status;
      if (input.urgencia) updateData.urgencia = input.urgencia;
      if (input.impacto) updateData.impacto = input.impacto;
      if (input.titulo) updateData.titulo = input.titulo;
      if (input.descricao) updateData.descricao = input.descricao;
      if (input.atribuido_a !== undefined) updateData.atribuido_a = input.atribuido_a;

      if (input.urgencia && input.impacto) {
        updateData.prioridade = calcularPrioridade(input.urgencia, input.impacto);
      } else if (input.prioridade) {
        updateData.prioridade = input.prioridade;
      }

      const { data, error } = await supabase
        .from('tickets')
        .update(updateData as any)
        .eq('id', input.id)
        .select()
        .single();

      if (error) throw error;

      // Create timeline event for status change with old → new format (AC-19)
      if (input.status) {
        // Fetch old status first
        const { data: oldTicket } = await supabase
          .from('tickets')
          .select('status')
          .eq('id', input.id)
          .single();
        const oldStatus = oldTicket?.status || '?';
        await supabase
          .from('ticket_followups')
          .insert({
            ticket_id: input.id,
            tipo: 'status_change',
            conteudo: `Status alterado: ${oldStatus} → ${input.status}`,
            autor: (await supabase.auth.getSession()).data?.session?.user?.id,
          });
      }

      if (input.atribuido_a !== undefined) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', input.atribuido_a)
          .single();
        // Get old agent name if any (AC-22: "antigo → novo")
        const { data: oldTicket } = await supabase
          .from('tickets')
          .select('atribuido_a')
          .eq('id', input.id)
          .single();
        let oldAgentName = 'ninguém';
        if (oldTicket?.atribuido_a) {
          const { data: oldProfile } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', oldTicket.atribuido_a)
            .single();
          if (oldProfile?.name) oldAgentName = oldProfile.name;
        }
        await supabase
          .from('ticket_followups')
          .insert({
            ticket_id: input.id,
            tipo: 'assignment',
            conteudo: `Atribuição: ${oldAgentName} → ${profile?.name || 'agente'}`,
            autor: (await supabase.auth.getSession()).data?.session?.user?.id,
          });
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['tickets', data.id] });
      }
    },
  });
}

export function useCreateFollowup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      ticket_id: string;
      tipo: 'followup_publico' | 'nota_interna';
      conteudo: string;
    }) => {
      const { data: sessionData } = await supabase.auth.getSession();
      const { data, error } = await supabase
        .from('ticket_followups')
        .insert({
          ticket_id: input.ticket_id,
          tipo: input.tipo as any,
          conteudo: input.conteudo,
          autor: sessionData?.session?.user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tickets', data.ticket_id] });
      queryClient.invalidateQueries({ queryKey: ['followups', data.ticket_id] });
    },
  });
}

export function useFollowups(ticketId: string) {
  return useQuery({
    queryKey: ['followups', ticketId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ticket_followups')
        .select('*, autor_profile:autor(name)')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!ticketId,
  });
}

export function useUploadAttachment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      ticketId: string;
      file: File;
    }) => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      const fileExt = input.file.name.split('.').pop();
      const storagePath = `chamados/${input.ticketId}/${crypto.randomUUID()}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('anexos-chamados')
        .upload(storagePath, input.file);

      if (uploadError) throw uploadError;

      // Create attachment record
      const { data, error } = await supabase
        .from('ticket_attachments')
        .insert({
          ticket_id: input.ticketId,
          storage_path: storagePath,
          nome_arquivo: input.file.name,
          tamanho_bytes: input.file.size,
          content_type: input.file.type,
          uploaded_by: userId,
        })
        .select()
        .single();

      if (error) throw error;

      // Create timeline event
      await supabase
        .from('ticket_followups')
        .insert({
          ticket_id: input.ticketId,
          tipo: 'system',
          conteudo: `Arquivo anexado: ${input.file.name}`,
          autor: userId,
        });

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tickets', data.ticket_id] });
      queryClient.invalidateQueries({ queryKey: ['attachments', data.ticket_id] });
    },
  });
}

export function useAttachments(ticketId: string) {
  return useQuery({
    queryKey: ['attachments', ticketId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ticket_attachments')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!ticketId,
  });
}
