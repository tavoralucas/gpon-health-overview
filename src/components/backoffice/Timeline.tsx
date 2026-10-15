// T-016: Timeline component

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TimelineEvent {
  id: string;
  tipo: string;
  conteudo: string;
  autor: string | null;
  autor_profile?: { name: string } | null;
  created_at: string;
}

interface TimelineProps {
  ticketId: string;
  followups: TimelineEvent[];
}

const TIPO_ICONS: Record<string, string> = {
  system: '⚙️',
  status_change: '🔄',
  assignment: '👤',
  followup_publico: '💬',
  nota_interna: '📝',
};

const TIPO_LABELS: Record<string, string> = {
  system: 'Sistema',
  status_change: 'Mudança de status',
  assignment: 'Atribuição',
  followup_publico: 'Follow-up público',
  nota_interna: 'Nota interna',
};

export function Timeline({ ticketId, followups }: TimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        {followups.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nenhum evento registrado.</p>
        ) : (
          <div className="relative space-y-4">
            {followups.map((event, index) => (
              <div key={event.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                    {TIPO_ICONS[event.tipo] || '📌'}
                  </div>
                  {index < followups.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className={`flex-1 pb-4 ${event.tipo === 'nota_interna' ? 'bg-yellow-50 p-3 rounded-md -ml-2' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">
                      {TIPO_LABELS[event.tipo] || event.tipo}
                    </span>
                    {event.tipo === 'nota_interna' && (
                      <Badge variant="outline" className="text-xs">Interno</Badge>
                    )}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{event.conteudo}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {event.autor_profile?.name || event.autor || 'Sistema'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.created_at).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
