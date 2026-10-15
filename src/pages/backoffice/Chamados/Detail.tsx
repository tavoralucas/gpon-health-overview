// T-012: Chamado detail page

import { useParams, useNavigate } from 'react-router-dom';
import { useTicket, useFollowups, useAttachments } from '@/services/tickets';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusTransition } from '@/components/backoffice/StatusTransition';
import { AgentAssignment } from '@/components/backoffice/AgentAssignment';
import { FollowUpForm } from '@/components/backoffice/FollowUpForm';
import { Timeline } from '@/components/backoffice/Timeline';
import { AttachmentList } from '@/components/backoffice/AttachmentList';
import { AttachmentDropzone } from '@/components/backoffice/AttachmentDropzone';
import { useTranslation } from 'react-i18next';

const PRIORIDADE_COLORS: Record<string, string> = {
  baixa: 'bg-gray-100 text-gray-800',
  media: 'bg-blue-100 text-blue-800',
  alta: 'bg-yellow-100 text-yellow-800',
  critica: 'bg-red-100 text-red-800',
};

const STATUS_COLORS: Record<string, string> = {
  novo: 'bg-gray-100 text-gray-800',
  atribuido: 'bg-blue-100 text-blue-800',
  atendimento: 'bg-yellow-100 text-yellow-800',
  espera: 'bg-orange-100 text-orange-800',
  resolvido: 'bg-green-100 text-green-800',
  fechado: 'bg-gray-100 text-gray-600',
  reaberto: 'bg-red-100 text-red-800',
};

const STATUS_LABELS: Record<string, string> = {
  novo: 'Novo',
  atribuido: 'Atribuído',
  atendimento: 'Em atendimento',
  espera: 'Em espera',
  resolvido: 'Resolvido',
  fechado: 'Fechado',
  reaberto: 'Reaberto',
};

export function ChamadoDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: ticket, isLoading, error } = useTicket(id || '');
  const { data: followups } = useFollowups(id || '');
  const { data: attachments } = useAttachments(id || '');

  if (isLoading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (error || !ticket) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Chamado não encontrado.</p>
        <Button onClick={() => navigate('/backoffice/chamados')} className="mt-4">
          Voltar para lista
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate('/backoffice/chamados')}>
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold">{ticket.numero}</h1>
          <Badge className={STATUS_COLORS[ticket.status] || ''}>
            {STATUS_LABELS[ticket.status] || ticket.status}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{ticket.titulo}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tipo</label>
              <p>{ticket.tipo}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Prioridade</label>
              <Badge className={PRIORIDADE_COLORS[ticket.prioridade] || ''}>
                {ticket.prioridade}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Urgência</label>
              <p>{ticket.urgencia}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Impacto</label>
              <p>{ticket.impacto}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Origem</label>
              <p>{ticket.origem === 'publico' ? 'Público' : 'Manual'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Solicitante</label>
              <p>{ticket.solicitante_nome}</p>
              <p className="text-sm text-muted-foreground">{ticket.solicitante_email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Criado em</label>
              <p>{new Date(ticket.created_at).toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Atualizado em</label>
              <p>{new Date(ticket.updated_at).toLocaleString('pt-BR')}</p>
            </div>
          </div>

          {/* Network context */}
          {(ticket.codigo_cidade || ticket.endereco_mac) && (
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Contexto de rede</h3>
              <div className="grid grid-cols-2 gap-4">
                {ticket.codigo_cidade && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Código da cidade</label>
                    <p>{ticket.codigo_cidade}</p>
                  </div>
                )}
                {ticket.endereco_mac && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Endereço MAC</label>
                    <p className="font-mono">{ticket.endereco_mac}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Descrição</h3>
            <p className="whitespace-pre-wrap">{ticket.descricao}</p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatusTransition ticketId={ticket.id} currentStatus={ticket.status as any} />
        <AgentAssignment ticketId={ticket.id} currentAgentId={ticket.atribuido_a} currentStatus={ticket.status as any} />
      </div>

      {/* Follow-up */}
      <FollowUpForm ticketId={ticket.id} />

      {/* Attachments */}
      <Card>
        <CardHeader>
          <CardTitle>Anexos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AttachmentDropzone ticketId={ticket.id} />
          {attachments && attachments.length > 0 && (
            <AttachmentList attachments={attachments} />
          )}
        </CardContent>
      </Card>

      {/* Timeline */}
      <Timeline ticketId={ticket.id} followups={followups || []} />
    </div>
  );
}
