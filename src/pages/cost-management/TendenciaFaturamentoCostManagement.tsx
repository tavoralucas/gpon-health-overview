import { ArrowLeft, TrendingUp, AlertTriangle, BarChart3, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import tendenciaFaturamentoFiltros from "@/assets/tendencia-faturamento-filtros.png";
import tendenciaFaturamentoContrato from "@/assets/tendencia-faturamento-contrato.png";
import tendenciaFaturamentoGrafico from "@/assets/tendencia-faturamento-grafico.png";
import tendenciaFaturamentoProjecao from "@/assets/tendencia-faturamento-projecao.png";
import tendenciaFaturamentoRecursoGrade from "@/assets/tendencia-faturamento-recurso-grade.png";
import tendenciaFaturamentoRecursoLista from "@/assets/tendencia-faturamento-recurso-lista.png";

export default function TendenciaFaturamentoCostManagement() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/cost-management")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('costManagement.title') })}
      </button>

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('costManagement.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Tendência de Faturamento</h1>
          <p className="mt-1 text-muted-foreground">
            Análise preditiva e tendencial de gastos em nuvem com detecção de anomalias e projeção de custos
          </p>
        </div>
      </div>

      {/* Visão Geral */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t("common.overview")}</h2>
        <p className="text-muted-foreground mb-3">
          A Tendência de Faturamento permite que gestores financeiros e responsáveis técnicos visualizem o comportamento
          histórico de gastos de contratos de nuvem, identifiquem anomalias, entendam tendências e projetem
          custos futuros com base em modelos estatísticos estabelecidos. Os dados são apresentados em dois níveis,
          sendo tanto o consolidado por contrato, quanto detalhado por recurso/serviço.
        </p>
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Proporcionar visibilidade preditiva e analítica sobre gastos de nuvem, habilitando
            decisões proativas, identificação de desvios anômalos e planejamento financeiro baseado em dados.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Filtros Disponíveis</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Agrupamento</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Nome de produto</strong> (padrão) ou <strong>Tag</strong>.
              Tag recomendado para períodos de até 3 meses (impacto de performance).
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Período de Análise</h3>
            <p className="text-sm text-muted-foreground">
              Seleção por mês/ano. Padrão: <strong>últimos 3 meses</strong>. Disponível para todos os meses desde o início do contrato, desde que tenha-se no mínimo 3 meses de dados no bilhetados no portal.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Linked Accounts</h3>
            <p className="text-sm text-muted-foreground">
              Filtro por sub-contas vinculadas. Por padrão, <strong>todas selecionadas</strong>. Suporta busca por texto.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Apresentar apenas anomalias</h3>
            <p className="text-sm text-muted-foreground">
              Toggle on/off. Quando ativado, exibe somente recursos com desvio anômalo no período. Por padrão, <strong>desativado</strong>.
            </p>
          </div>
        </div>
        <img
          src={tendenciaFaturamentoFiltros}
          alt="Filtros da Tendência de Faturamento"
          className="w-full border border-border mt-6"
          style={{ borderRadius: "8px" }}
        />
      </section>

      {/* Card Principal */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Visão por Contrato</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>Após aplicar os filtros, o card exibe:</p>
          <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
            <li>Identificação do contrato no formato <code className="bg-muted px-1 rounded text-xs">[TIPO]NÚMERO-NOME-PROVEDOR</code></li>
            <li>Valor total do período em R$ (4 casas decimais)</li>
            <li>Período de referência (ex.: Mar 2026 até Mai 2026)</li>
            <li>Status de anomalias: <span className="text-green-700 dark:text-green-400">Não existem anomalias de gastos</span> (verde) ou alerta vermelho</li>
          </ul>
        </div>
        <img
          src={tendenciaFaturamentoContrato}
          alt="Visão por Contrato"
          className="w-full border border-border mt-6"
          style={{ borderRadius: "8px" }}
        />
      </section>

      {/* Gráfico Principal */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Gráfico Principal do Contrato</h2>
        </div>
        <p className="text-muted-foreground mb-4">Gráfico de barras com séries sobrepostas:</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-3 rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800">
            <p className="font-semibold text-green-800 dark:text-green-200">Custo (barra verde)</p>
            <p className="text-sm text-green-700 dark:text-green-300">Valor real gasto no mês</p>
          </div>
          <div className="p-3 rounded-lg border border-border bg-muted/50">
            <p className="font-semibold text-foreground">Média (linha preta tracejada)</p>
            <p className="text-sm text-muted-foreground">Média aritmética simples do período</p>
          </div>
          <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800">
            <p className="font-semibold text-red-800 dark:text-red-200">Média Móvel (linha vermelha)</p>
            <p className="text-sm text-red-700 dark:text-red-300">Tendência por regressão linear: <code className="bg-red-100 dark:bg-red-900 px-1 rounded text-xs">y = a × x + b</code></p>
          </div>
          <div className="p-3 rounded-lg border border-orange-200 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-800">
            <p className="font-semibold text-orange-800 dark:text-orange-200">Tolerância (linha laranja)</p>
            <p className="text-sm text-orange-700 dark:text-orange-300">Limite de anomalia via método IQR (Tukey): <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded text-xs">Q3 + 1,5 × (Q3 - Q1)</code></p>
          </div>
        </div>
        <div className="mt-4 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-sm">
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Mês corrente:</strong> label no eixo X exibido em <span className="text-blue-600">azul</span>, indicando dados parciais.
            Botão <strong>"Expandir gráfico"</strong> abre modal em tela cheia com legenda completa.
          </p>
        </div>
        <img
          src={tendenciaFaturamentoGrafico}
          alt="Gráfico Principal do Contrato"
          className="w-full border border-border mt-6"
          style={{ borderRadius: "8px" }}
        />
      </section>

      {/* Projeção de Custos */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Projeção de Custos</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>Funcionalidade exclusiva do card principal do contrato:</p>
          <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
            <li>Campo <strong>"Projetar custo para"</strong>: seletor de mês/ano futuro</li>
            <li>Botão <strong>"Projetar custos"</strong>: calcula via regressão linear <code className="bg-muted px-1 rounded">y = a × x + b</code> e adiciona barra amarela/dourada ao gráfico</li>
            <li>Botão <strong>"Limpar projeção"</strong>: remove a barra projetada e restaura o estado original</li>
            <li>A projeção só pode ser feita para meses futuros ao último mês do período</li>
            <li>A barra projetada não altera o valor total exibido no card, é estritamente visual/informativa</li>
          </ul>
        </div>
        <img
          src={tendenciaFaturamentoProjecao}
          alt="Projeção de Custos para 4 meses futuros"
          className="w-full border border-border mt-6"
          style={{ borderRadius: "8px" }}
        />
        <div className="mt-4 bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800 text-sm">
          <p className="text-green-800 dark:text-green-200">
            <strong>Interpretação:</strong> No exemplo acima, a projeção foi estendida por 4 meses à frente
            (06/2026 a 09/2026). As barras amareladas representam os valores projetados pela regressão linear,
            que se mostram progressivamente menores que os meses reais (verdes). A linha vermelha (média móvel)
            também segue em queda acentuada, indicando uma <strong>tendência clara de economia</strong> e
            redução do faturamento no horizonte projetado, sinal positivo para o planejamento financeiro do contrato.
          </p>
        </div>
      </section>

      {/* Relatório por Recurso */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Relatório por Recurso</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>Seção <strong>"Relatório por recurso: N"</strong> (N = total de serviços identificados no período). Dois modos de visualização:</p>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border bg-muted/50 space-y-3">
              <h3 className="font-semibold text-foreground">Grade (padrão)</h3>
              <p className="text-sm">Cards em duas colunas, cada um representando um produto/serviço.</p>
              <img
                src={tendenciaFaturamentoRecursoGrade}
                alt="Visualização em Grade"
                className="w-full border border-border"
                style={{ borderRadius: "8px" }}
              />
            </div>
            <div className="p-4 rounded-lg border border-border bg-muted/50 space-y-3">
              <h3 className="font-semibold text-foreground">Lista</h3>
              <p className="text-sm">Visualização tabular compacta para comparação rápida entre recursos.</p>
              <img
                src={tendenciaFaturamentoRecursoLista}
                alt="Visualização em Lista"
                className="w-full border border-border"
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>
          <p className="text-sm">Cada card de recurso exibe: <strong>maior média</strong>, <strong>menor média</strong>, <strong>média geral</strong>, <strong>valor total</strong> e gráfico individual com as mesmas séries do gráfico principal.</p>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800 text-sm">
            <p className="text-amber-800 dark:text-amber-200">
              Recursos são ordenados por <strong>valor total decrescente</strong>. Recursos com valor zero são exibidos normalmente.
              Valores negativos (estornos/créditos) aparecem no recurso <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">crédito/desconto</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Detecção de Anomalias */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Detecção de Anomalias</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p><strong>Algoritmo:</strong> Método IQR (Tukey's Fence).</p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm">
            <p>Limite de anomalia = Q3 + 1,5 × (Q3 - Q1)</p>
            <p className="text-xs text-muted-foreground mt-1">Q1 = primeiro quartil | Q3 = terceiro quartil dos gastos mensais</p>
          </div>
          <p className="text-sm">Qualquer mês cujo custo supere o limite é classificado como anomalia. O filtro "Apresentar apenas anomalias" exibe somente recursos que ultrapassaram o limite em pelo menos um mês do período.</p>
        </div>
      </section>

      {/* Fluxo de Uso */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Fluxo de Uso Ideal</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside ml-2">
          <li>Acesso à Tendência de Faturamento pelo menu lateral.</li>
          <li>Sistema carrega automaticamente dados do contrato global com período padrão (últimos 3 meses).</li>
          <li>Usuário visualiza card consolidado com total, status de anomalias e gráfico principal.</li>
          <li>Usuário pode ajustar filtros (período, agrupamento, linked accounts, anomalias) e acionar "Filtrar".</li>
          <li>Usuário rola a página para analisar o relatório por recurso, identificando os serviços mais custosos.</li>
          <li>(Opcional) Usuário projeta o custo do próximo mês informando o mês-alvo e acionando "Projetar custos".</li>
          <li>(Opcional) Usuário exporta os dados para relatório externo.</li>
        </ol>
      </section>

      {/* Casos de Borda */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Casos de Borda</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { label: "Sem anomalias", desc: 'Indicador verde: "Não existem anomalias de gastos"' },
            { label: "Recursos sem custo", desc: "Exibidos normalmente com valores zerados, não ocultados" },
            { label: "Valores negativos", desc: "Exibidos normalmente com valores zerados, não ocultados" },
            { label: "Mês corrente", desc: "Diferenciado com label azul no eixo X para indicar dados parciais" },
            { label: "Projeção ativa", desc: 'Barra amarela adicionada; "Limpar projeção" a remove' },
            { label: "Tag com período longo", desc: "Aviso de desempenho exibido ao usuário" },
          ].map(({ label, desc }) => (
            <div key={label} className="p-3 rounded-lg border border-border bg-muted/50">
              <p className="font-semibold text-foreground text-sm">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
