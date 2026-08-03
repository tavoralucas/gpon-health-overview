import { ArrowLeft, LayoutDashboard, CheckCircle2, Settings, Database, Code, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const prerequisites = [
  {
    icon: Settings,
    title: "Verifique suas permissões",
    description: "No PMC P360, diferentes usuários podem ter diferentes níveis de acesso. Verificar se o usuário tem permissão para criar e editar dashboards. Se não tiver certeza sobre suas permissões, consulte o administrador do sistema."
  },
  {
    icon: Database,
    title: "Configuração das Fontes de Dados",
    description: "Certificar-se de que a fonte de dados que o usuário deseja usar está configurada no sistema. Se não estiver, consultar o item Configurar Fontes de Dados para saber como adicionar e configurar novas fontes."
  },
  {
    icon: Code,
    title: "Conhecimento da Linguagem de Consulta",
    description: "Cada fonte de dados pode usar uma linguagem de consulta diferente. Familiarize-se com a linguagem de consulta da sua fonte de dados para extrair as informações necessárias de forma eficiente (por exemplo: PromQL para Prometheus, SQL para bancos de dados relacionais)."
  },
  {
    icon: RefreshCw,
    title: "Dados em tempo real",
    description: "Refresh automático é um recurso disponível em todos os dashboards do PMC P360, apresenta os dados logo que eles são disponibilizados pelos coletores/plugins. Esse recurso é limitado à origem dos dados para coleta, com taxa de atualização com variação entre 5 a 15 minutos."
  }
];

export default function DashboardsPaineis() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/panorama-360")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('panorama360.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <LayoutDashboard className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Dashboards e Painéis</h1>
          <p className="mt-1 text-muted-foreground">
            Visão geral dos dashboards e painéis disponíveis.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">A janela para os seus dados</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong className="text-foreground">Dashboards</strong> e <strong className="text-foreground">Painéis</strong> permitem visualizar os dados de forma gráfica. Cada painel precisa de pelo menos uma consulta para exibir uma visualização. Além da funcionalidade de exibição dos dados em tempo real com o refresh automático, em todos os dashboards.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          No coração do PMC P360 estão os Dashboards e Painéis que permitem visualizar dados em tempo real de forma gráfica e intuitiva.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Um Dashboard é como um cockpit de um avião, ou seja, um painel de controle que reúne, em uma única interface, todas as informações essenciais que precisa monitorar. Os painéis dentro do Dashboard são como os instrumentos do painel de controle, cada um apresentando uma visualização específica, como gráficos de desempenho, tabelas de métricas ou mapas de calor.
        </p>
      </section>

      {/* Antes de começar */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">Antes de começar: Preparar o terreno</h2>
        <p className="text-muted-foreground mb-4">
          Pense nisso como preparar o solo antes de plantar: um bom preparo garante que tudo funcione sem problemas. Portanto, antes de começar a criar os seus Dashboards e Painéis, é fundamental certificar de que o usuário tenha as permissões necessárias e que as fontes de dados que deseja utilizar estejam corretamente configuradas.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {prerequisites.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dica */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Dica</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Certifique-se de que a fonte de dados para a qual o usuário está escrevendo a consulta foi adicionada. As informações sobre como configurar uma fonte de dados encontram-se na documentação de "Conectando e configurando Datasource no PMC P360".
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
