import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type Route = { path: string; title: string };

const hubs: Record<string, { hubPath: string; routes: Route[] }> = {
  "/panorama-360": {
    hubPath: "/panorama-360",
    routes: [
      { path: "/panorama-360/visao-geral", title: "Visão Geral" },
      { path: "/panorama-360/acesso", title: "Acesso ao P360" },
      { path: "/panorama-360/autenticacao-google", title: "Autenticando com o Google Cloud" },
      { path: "/panorama-360/dashboards-paineis", title: "Dashboards e Painéis" },
      { path: "/panorama-360/datasource", title: "Conectando e configurando Datasource no PMC P360" },
      { path: "/panorama-360/refresh-automatico", title: "Dados em tempo real: Refresh automático" },
      { path: "/panorama-360/criando-dashboards", title: "Criando e gerenciando Dashboards" },
      { path: "/panorama-360/adicionar-cliente", title: "Adicionando um novo cliente na tela geral de monitoramento" },
      { path: "/panorama-360/integracao-telegram", title: "Integração com Telegram para notificações de alertas" },
      { path: "/panorama-360/configurar-alertas", title: "Como configurar Alertas" },
      { path: "/panorama-360/procedimentos-alertas", title: "Procedimentos para configurar Alertas" },
      { path: "/panorama-360/silenciar-notificacao", title: "Silenciando uma notificação de alerta" },
      { path: "/panorama-360/remover-silenciamentos", title: "Visualizando e Removendo Silenciamentos" },
      { path: "/panorama-360/tags-labels", title: "Adicionando uma nova tag de label em alertas" },
      { path: "/panorama-360/consultas-condicoes", title: "Configurando as consultas e condições de alertas" },
      { path: "/panorama-360/explorando-logs", title: "Explorando e analisando os Logs" },
      { path: "/panorama-360/instalando-agente", title: "Instalando e configurando o Agente" },
    ],
  },
  "/cost-management": {
    hubPath: "/cost-management",
    routes: [
      { path: "/cost-management/visao-geral", title: "Visão Geral" },
      { path: "/cost-management/historico-servico", title: "Histórico de Serviço" },
      { path: "/cost-management/tendencia-faturamento", title: "Tendência de Faturamento" },
      { path: "/cost-management/exportar-relatorios", title: "Exportar Relatórios" },
      { path: "/cost-management/consolidado-faturamento", title: "Consolidado de Faturamento" },
      { path: "/cost-management/custo-budget", title: "Custo de Budget" },
      { path: "/cost-management/conta-master", title: "Conta Master" },
      { path: "/cost-management/financeiro", title: "Financeiro" },
    ],
  },
  "/finops-360": {
    hubPath: "/finops-360",
    routes: [
      { path: "/finops-360/visao-geral", title: "Visão Geral" },
      { path: "/finops-360/dashboard", title: "Dashboard" },
      { path: "/finops-360/rightsizing", title: "Rightsizing" },
      { path: "/finops-360/compare-cloud", title: "Compare Cloud" },
      { path: "/finops-360/imaginary-cloud", title: "Imaginary Cloud" },
      { path: "/finops-360/provider-hint", title: "Provider Hint" },
    ],
  },
  "/mangue": {
    hubPath: "/mangue",
    routes: [
      { path: "/mangue/visao-geral", title: "Visão Geral" },
      { path: "/mangue/workloads", title: "Workloads" },
      { path: "/mangue/catalogo", title: "Catálogo" },
      { path: "/mangue/faturamento", title: "Faturamento" },
      { path: "/mangue/recomendacoes", title: "Recomendações" },
      { path: "/mangue/permissoes-integracoes", title: "Permissões e Integrações" },
      { path: "/mangue/nodes-namespaces", title: "Nodes e Namespaces" },
      { path: "/mangue/migracao-cluster", title: "Migração de Cluster" },
      { path: "/mangue/storage", title: "Storage" },
      { path: "/mangue/tarefas", title: "Tarefas" },
      { path: "/mangue/clusters", title: "Clusters" },
    ],
  },
  "/dci": {
    hubPath: "/dci",
    routes: [
      { path: "/dci/visao-geral", title: "Visão Geral" },
      { path: "/dci/administracao", title: "Administração" },
      { path: "/dci/portas", title: "Portas" },
      { path: "/dci/circuitos", title: "Circuitos" },
      { path: "/dci/excursionamentos", title: "Excursionamentos" },
      { path: "/dci/tarefas", title: "Tarefas" },
    ],
  },
  "/gpon-360": {
    hubPath: "/gpon-360",
    routes: [
      { path: "/gpon-360/clientes", title: "Clientes" },
      { path: "/gpon-360/dashboards", title: "Dashboards" },
      { path: "/gpon-360/monitoramento-sinal", title: "Monitoramento de Sinal" },
      { path: "/gpon-360/trap-massivo", title: "Trap Massivo" },
      { path: "/gpon-360/monitoramento-quedas", title: "Monitoramento de Quedas" },
      { path: "/gpon-360/performance", title: "Performance" },
      { path: "/gpon-360/relatorios", title: "Relatórios" },
      { path: "/gpon-360/gestao-parametros", title: "Gestão de Parâmetros" },
      { path: "/gpon-360/auditoria", title: "Auditoria" },
    ],
  },
};

export default function DocPager() {
  const location = useLocation();
  const hubKey = Object.keys(hubs).find((k) => location.pathname.startsWith(k + "/"));
  if (!hubKey) return null;

  const { routes } = hubs[hubKey];
  const currentIndex = routes.findIndex((r) => r.path === location.pathname);
  if (currentIndex === -1) return null;

  const previous = routes[currentIndex - 1];
  const next = routes[currentIndex + 1];

  return (
    <section className="px-6 pb-6 grid gap-3 sm:grid-cols-2">
      {previous ? (
        <Link
          to={previous.path}
          className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </div>
          <div className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary">
            {previous.title}
          </div>
        </Link>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4" />
      )}

      {next ? (
        <Link
          to={next.path}
          className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40"
        >
          <div className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Próximo
            <ArrowRight className="h-4 w-4" />
          </div>
          <div className="mt-2 text-right text-sm font-semibold text-foreground group-hover:text-primary">
            {next.title}
          </div>
        </Link>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4" />
      )}
    </section>
  );
}
