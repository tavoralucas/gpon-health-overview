import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const panoramaRoutes = [
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
];

export default function PanoramaPager() {
  const location = useLocation();
  const currentIndex = panoramaRoutes.findIndex((route) => route.path === location.pathname);

  if (currentIndex === -1) return null;

  const previous = panoramaRoutes[currentIndex - 1];
  const next = panoramaRoutes[currentIndex + 1];

  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-2">
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
