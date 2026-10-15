// T-014: Agent assignment component

import { useState } from 'react';
import { useAgentesAtivos } from '@/services/agentes';
import { useUpdateTicket } from '@/services/tickets';
import { useNotificarChamado } from '@/services/notificacao';
import { STATUS_LABELS, type StatusTicket } from '@/lib/transitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AgentAssignmentProps {
  ticketId: string;
  currentAgentId: string | null;
  currentStatus: StatusTicket;
}

export function AgentAssignment({ ticketId, currentAgentId, currentStatus }: AgentAssignmentProps) {
  const [selectedAgent, setSelectedAgent] = useState(currentAgentId || '');
  const [loading, setLoading] = useState(false);
  const { data: agents } = useAgentesAtivos();
  const updateTicket = useUpdateTicket();
  const notificar = useNotificarChamado();

  const handleAssign = async () => {
    if (!selectedAgent) return;
    setLoading(true);
    try {
      const updateData: any = {
        id: ticketId,
        atribuido_a: selectedAgent,
      };

      // If current status is 'novo', assignment changes to 'atribuido' (AC-21)
      if (currentStatus === 'novo') {
        updateData.status = 'atribuido';
      }

      await updateTicket.mutateAsync(updateData);
      // Fire-and-forget notification to assigned agent after assignment (AC-32)
      notificar.mutate({ ticket_id: ticketId, evento: 'atribuido' });
    } catch (err) {
      console.error('Erro ao atribuir agente:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agente responsável</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um agente" />
              </SelectTrigger>
              <SelectContent>
                {agents?.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAssign} disabled={loading || !selectedAgent}>
            {loading ? 'Atribuindo...' : currentAgentId ? 'Reatribuir' : 'Atribuir'}
          </Button>
        </div>
        {currentAgentId && (
          <p className="text-sm text-muted-foreground mt-2">
            Agente atual: {agents?.find((a) => a.id === currentAgentId)?.name || currentAgentId}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
