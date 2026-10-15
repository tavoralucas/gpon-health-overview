// T-023: Notificação service hook (frontend)

import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface NotificarInput {
  ticket_id: string;
  evento: 'resolvido' | 'fechado' | 'reaberto' | 'atribuido';
}

export function useNotificarChamado() {
  return useMutation({
    mutationFn: async (input: NotificarInput) => {
      // Fire-and-forget: invokes the edge function
      const { error } = await supabase.functions.invoke('notificar-chamado', {
        body: input,
      });

      if (error) {
        console.error('Falha ao enviar notificação:', error);
        // Failure does not block — this is non-blocking (AC-35)
      }
    },
  });
}
