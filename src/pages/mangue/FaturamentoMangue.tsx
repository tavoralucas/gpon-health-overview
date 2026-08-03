import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Receipt, CheckCircle2, BarChart3, TrendingUp, Calendar, DollarSign, Info, Tag, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const overviewCards = [
  {
    title: "Overview do Cluster",
    icon: BarChart3,
    description: "Visão geral financeira de consumo de CPU e memória do cluster selecionado."
  },
  {
    title: "Lista de Aplicações",
    icon: TrendingUp,
    description: "Consumo detalhado por deployment com custo de CPU, memória e total."
  },
  {
    title: "Histórico e Previsão",
    icon: History,
    description: "Histórico de gastos com linha de tendência para projeção futura."
  },
  {
    title: "Faturamento por Tags",
    icon: Tag,
    description: "Agrupamento de custos por tags associadas aos deployments."
  }
];

const columns = [
  { name: "Aplicação", description: "Nome do deployment" },
  { name: "CPU (milicores)", description: "Custo mensal do consumo de CPU" },
  { name: "Memória (megabytes)", description: "Custo mensal do consumo de memória" },
  { name: "Total", description: "Somatória dos custos de CPU e memória" }
];

export default function FaturamentoMangue() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/mangue")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('mangue.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <Receipt className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('mangue.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Faturamento</h1>
          <p className="mt-1 text-muted-foreground">
            Acompanhamento e análise de custos dos recursos consumidos no cluster.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre o Faturamento</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O menu <strong>Faturamento</strong> apresenta o consumo do cluster em valores financeiros ao usuário. 
          Permite acompanhar a evolução do custo referente ao uso da infraestrutura computacional que suporta 
          e executa as aplicações.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/086_mangue_faturamento_cluster.png" 
            alt="Faturamento do Cluster" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela principal de Faturamento</p>
        </div>
      </section>

      {/* Cards de Overview */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Visões do Faturamento</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {overviewCards.map(({ title, icon: Icon, description }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Overview Financeiro */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Overview Financeiro</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Esta seção exibe os gráficos de consumo de CPU e memória ao longo do tempo, com valores em moeda 
          corrente e linha de tendência.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/087_mangue_overview_financeiro.png" 
            alt="Overview Financeiro" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Gráficos de consumo financeiro</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Visualização por CPU consumido em milicores</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Visualização por Memória consumida em megabytes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Linha vermelha indica a tendência do gráfico</span>
          </li>
        </ul>
      </section>

      {/* Lista de Aplicações */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Lista de Aplicações</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Tabela detalhada com o consumo de cada deployment presente no namespace selecionado.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/088_mangue_lista_aplicacoes.png" 
            alt="Lista de Aplicações" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de custos por aplicação</p>
        </div>
        <h3 className="font-semibold text-foreground mb-3">Colunas da Tabela</h3>
        <div className="space-y-2">
          {columns.map(({ name, description }) => (
            <div key={name} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
              <div>
                <span className="font-medium text-foreground text-sm">{name}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Histórico de Faturamento */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <History className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Histórico de Faturamento</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Permite visualizar o histórico de consumo e custos em diferentes períodos de tempo.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/089_mangue_historico_faturamento.png" 
            alt="Histórico Faturamento" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Histórico de faturamento</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3 mb-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/090_mangue_mes_ano.png" 
              alt="Mês e Ano" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Filtro por mês/ano</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/091_mangue_ano.png" 
              alt="Ano" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Filtro por ano</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/092_mangue_mes.png" 
              alt="Mês" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Filtro por mês</p>
          </div>
        </div>
      </section>

      {/* Histórico do Cluster */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Histórico do Cluster</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Visualização do histórico de consumo geral do cluster em formato de linha do tempo.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/093_mangue_historico_cluster.png" 
            alt="Histórico do Cluster" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Histórico geral do cluster</p>
        </div>
      </section>

      {/* Faturamento por Tags */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Tag className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Faturamento por Tags</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Agrupe e visualize os custos por tags associadas aos deployments, facilitando a análise por 
          projeto, time ou qualquer outra categoria definida pelo usuário.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/094_mangue_historico_tags.png" 
              alt="Histórico Tags" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Histórico por tags</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/095_mangue_detalhes_tag.png" 
              alt="Detalhes Tag" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Detalhes da tag</p>
          </div>
        </div>
      </section>

      {/* Cálculo do Valor */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Cálculo do Valor</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Os valores são calculados com base no valor/hora de vCPU e Memória RAM armazenado na base de dados 
          do Mangue.io. O preço de CPU e Memória é o mesmo dos recursos do contrato, definido via uCloud.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>A plataforma armazena o consumo (CPU e Memória) a cada minuto</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Ao término de cada hora, armazena o valor total do consumo</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Ao final do dia (24h), armazena o valor referente ao consumo diário</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>O preço total é a somatória do custo de CPU + custo de Memória</span>
          </li>
        </ul>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Custo Real da Infraestrutura</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Com as informações de faturamento, o usuário pode avaliar o <strong>custo real da infraestrutura</strong> 
              necessária para manter e suportar a execução de um deployment ativo e funcional 24x7. Os valores são 
              armazenados em base de dados interna para acompanhamento histórico.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

