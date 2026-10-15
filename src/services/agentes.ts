// T-014/T-024: Agents service hooks (TanStack Query)

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AgentProfile {
  id: string;
  name: string;
  email: string;
  role: 'agente' | 'admin';
  status: 'pending' | 'active' | 'disabled';
  created_at: string;
  updated_at: string;
}

export function useAgentes() {
  return useQuery({
    queryKey: ['agentes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as AgentProfile[];
    },
  });
}

export function useInviteAgente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { name: string; email: string }) => {
      // Create a profile with status 'pending'
      // In production, this would trigger an invite email via edge function
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: crypto.randomUUID(),
          name: input.name,
          email: input.email,
          role: 'agente',
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agentes'] });
    },
  });
}

export function useUpdateAgente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      id: string;
      role?: 'agente' | 'admin';
      status?: 'pending' | 'active' | 'disabled';
    }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(input)
        .eq('id', input.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agentes'] });
    },
  });
}

export function useAgentesAtivos() {
  return useQuery({
    queryKey: ['agentes', 'ativos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, role')
        .eq('status', 'active')
        .order('name', { ascending: true });

      if (error) throw error;
      return data as { id: string; name: string; email: string; role: string }[];
    },
  });
}
