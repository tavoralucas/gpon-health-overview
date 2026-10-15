// T-013: Status transition UI component

import { useState } from 'react';
import { useUpdateTicket } from '@/services/tickets';
import { useNotificarChamado } from '@/services/notificacao';
import { transicoesPermitidas, STATUS_LABELS, type StatusTicket } from '@/lib/transitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatusTransitionProps {
  ticketId: string;
  currentStatus: StatusTicket;
}

export function StatusTransition({ ticketId, currentStatus }: StatusTransitionProps) {
  const [loading, setLoading] = useState(false);
  const updateTicket = useUpdateTicket();
  const notificar = useNotificarChamado();

  const allowedTransitions = transicoesPermitidas(currentStatus);

  const handleTransition = async (newStatus: StatusTicket) => {
    setLoading(true);
    try {
      await updateTicket.mutateAsync({
        id: ticketId,
        status: newStatus,
      });
      // Fire-and-forget notification after successful status transition (AC-32/33/34/35)
      if (newStatus === 'resolvido' || newStatus === 'fechado' || newStatus === 'reaberto') {
        notificar.mutate({ ticket_id: ticketId, evento: newStatus });
      }
    } catch (err) {
      console.error('Erro ao alterar status:', err);
    } finally {
      setLoading(false);
    }
  };

  if (allowedTransitions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alterar status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {allowedTransitions.map((status) => (
            <Button
              key={status}
              variant="outline"
              size="sm"
              disabled={loading}
              onClick={() => handleTransition(status)}
            >
              {STATUS_LABELS[status]}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
