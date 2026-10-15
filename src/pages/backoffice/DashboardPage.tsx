// T-018: Dashboard page with KPI cards

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCard } from '@/components/backoffice/KpiCard';
import { useTranslation } from 'react-i18next';

export function DashboardPage() {
  const { t } = useTranslation();

  const { data: chamadosAbertos } = useQuery({
    queryKey: ['dashboard', 'abertos'],
    queryFn: async () => {
      const { count } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true })
        .in('status', ['novo', 'atribuido', 'atendimento', 'espera', 'reaberto']);
      return count ?? 0;
    },
  });

  const { data: semAgente } = useQuery({
    queryKey: ['dashboard', 'sem-agente'],
    queryFn: async () => {
      const { count } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true })
        .in('status', ['novo', 'atribuido', 'atendimento', 'espera', 'reaberto'])
        .is('atribuido_a', null);
      return count ?? 0;
    },
  });

  const { data: statusCounts } = useQuery({
    queryKey: ['dashboard', 'status'],
    queryFn: async () => {
      const statuses = ['novo', 'atribuido', 'atendimento', 'espera', 'resolvido', 'fechado', 'reaberto'];
      const results: Record<string, number> = {};
      for (const s of statuses) {
        const { count } = await supabase
          .from('tickets')
          .select('*', { count: 'exact', head: true })
          .eq('status', s);
        results[s] = count ?? 0;
      }
      return results;
    },
  });

  const { data: prioridadeCounts } = useQuery({
    queryKey: ['dashboard', 'prioridade'],
    queryFn: async () => {
      const prioridades = ['baixa', 'media', 'alta', 'critica'];
      const results: Record<string, number> = {};
      for (const p of prioridades) {
        const { count } = await supabase
          .from('tickets')
          .select('*', { count: 'exact', head: true })
          .in('status', ['novo', 'atribuido', 'atendimento', 'espera', 'reaberto'])
          .eq('prioridade', p);
        results[p] = count ?? 0;
      }
      return results;
    },
  });

  const { data: resolvidos7d } = useQuery({
    queryKey: ['dashboard', 'resolvidos-7d'],
    queryFn: async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { count } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'resolvido')
        .gte('updated_at', sevenDaysAgo.toISOString());
      return count ?? 0;
    },
  });

  const { data: resolvidos30d } = useQuery({
    queryKey: ['dashboard', 'resolvidos-30d'],
    queryFn: async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const { count } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'resolvido')
        .gte('updated_at', thirtyDaysAgo.toISOString());
      return count ?? 0;
    },
  });

  const statusLabels: Record<string, string> = {
    novo: 'Novo',
    atribuido: 'Atribuído',
    atendimento: 'Em atendimento',
    espera: 'Em espera',
    resolvido: 'Resolvido',
    fechado: 'Fechado',
    reaberto: 'Reaberto',
  };

  const prioridadeLabels: Record<string, string> = {
    baixa: 'Baixa',
    media: 'Média',
    alta: 'Alta',
    critica: 'Crítica',
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Chamados abertos" value={chamadosAbertos ?? 0} />
        <KpiCard title="Sem agente" value={semAgente ?? 0} />
        <KpiCard title="Resolvidos (7d)" value={resolvidos7d ?? 0} />
        <KpiCard title="Resolvidos (30d)" value={resolvidos30d ?? 0} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Por status</CardTitle>
          </CardHeader>
          <CardContent>
            {statusCounts && (
              <div className="space-y-2">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center">
                    <span>{statusLabels[status] || status}</span>
                    <span className="font-bold">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Abertos por prioridade</CardTitle>
          </CardHeader>
          <CardContent>
            {prioridadeCounts && (
              <div className="space-y-2">
                {Object.entries(prioridadeCounts).map(([prioridade, count]) => (
                  <div key={prioridade} className="flex justify-between items-center">
                    <span>{prioridadeLabels[prioridade] || prioridade}</span>
                    <span className="font-bold">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
