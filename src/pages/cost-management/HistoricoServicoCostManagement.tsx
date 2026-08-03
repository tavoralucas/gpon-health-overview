import { ArrowLeft, History, DollarSign, AlertTriangle, Filter, BarChart3, Table } from "lucide-react";
import historicoServicoFiltros from "@/assets/historico-servico-filtros.png";
import historicoServicoIndicadores from "@/assets/historico-servico-indicadores.png";
import historicoServicoGrafico from "@/assets/historico-servico-grafico.png";
import historicoServicoTabela from "@/assets/historico-servico-tabela.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";


export default function HistoricoServicoCostManagement() {
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
          <History className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('costManagement.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Histórico de Serviço</h1>
          <p className="mt-1 text-muted-foreground">
            Hub central de visibilidade de custos em nuvem — filtre, analise e exporte o consumo por serviço
          </p>
        </div>
      </div>

      {/* Visão Geral */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t("common.overview")}</h2>
        <p className="text-muted-foreground mb-3">
          O Histórico de Serviço é o hub central de visibilidade de custos em nuvem do PMC. Ele permite que gestores
          de conta e administradores acompanhem, filtrem e analisem o consumo de serviços cloud
          em diferentes granularidades temporais e dimensões de custo, dentro de um ou mais contratos sob sua responsabilidade.
        </p>
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Acesse e gerencie suas faturas de forma eficiente, seja individualmente ou
            dentro dos grupos e contratos sob sua responsabilidade.
          </p>
        </div>
      </section>

      {/* Objetivo */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Objetivo</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
          <li>Dar visibilidade consolidada do gasto cloud por produto, tag e linked account</li>
          <li>Facilitar a identificação de anomalias de custo e tendências de crescimento</li>
          <li>Suportar gestores FinOps e administradores na tomada de decisão sobre otimização de gastos</li>
          <li>Alertar sobre recursos sem tagging, impactando diretamente a alocação de custos</li>
          <li>Servir como ponto de entrada para exportação de dados de faturamento</li>
          <li>Integrar com o módulo de Budget para validar se o consumo está dentro do planejado</li>
        </ul>
      </section>

      {/* Personas */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Ideal para profissionais com os seguintes perfis</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Account Manager</h3>
            <p className="text-sm text-muted-foreground">
              Responsável por contratos de clientes. Precisa visualizar o custo consolidado por contrato e
              comparar meses para apresentar relatórios.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">FinOps Analyst</h3>
            <p className="text-sm text-muted-foreground">
              Analisa o consumo detalhado por serviço, linked account e tag para otimização de custos.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Executivo / C-Level</h3>
            <p className="text-sm text-muted-foreground">
              Visualiza indicadores de alto nível (valor total, variação percentual) sem necessidade de drill-down profundo.
            </p>
          </div>
        </div>
      </section>

      {/* Inicie usando o Seletor de Contrato */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Inicie usando o Seletor de Contrato</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p>O seletor de contrato é obrigatório. Toda a visualização é escopada a um único contrato por vez. Escolhendo-se o contrato a ser visualizado, por exemplo: <code className="bg-muted px-1 rounded text-xs">[A]XXXXXXX-NOMECLIENTE-PROVEDOR</code></p>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Observação:</strong> Ao trocar o contrato selecionado, os filtros de "Linked Accounts" e "Filtrar por serviços"
              são resetados para "Todas selecionadas", pois essas dimensões são dependentes do contrato.
            </p>
          </div>
          <img
            src={historicoServicoFiltros}
            alt="Exemplo do Seletor de Contrato e Filtros do Histórico de Serviço"
            className="w-full border border-border"
            style={{ borderRadius: "8px" }}
          />
        </div>
      </section>

      {/* Painel de Filtros */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Painel de Filtros</h2>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-2">Agrupar por</h3>
              <p className="text-sm text-muted-foreground">Opções: <strong>Nome de produto</strong> (padrão) ou <strong>Tag</strong>.</p>
              <p className="text-sm text-muted-foreground mt-1">Ao agrupar por Tag, exibe aviso de performance para períodos maiores que 3 meses.</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-2">Intervalo</h3>
              <p className="text-sm text-muted-foreground">Opções: <strong>Mensal</strong> (padrão), <strong>Semanal</strong>, <strong>Diário</strong>. Define a granularidade das colunas da tabela.</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-2">Período</h3>
              <p className="text-sm text-muted-foreground">Date range picker mensal. Formato: <code className="bg-muted px-1 rounded text-xs">Mês YYYY até Mês YYYY</code>. Padrão: últimos 3–4 meses.</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-2">Filtrar por serviços / Linked Accounts</h3>
              <p className="text-sm text-muted-foreground">Multi-select com busca. Default: "Todas selecionadas". A lista de Linked Accounts é dinâmica por contrato.</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Botão Filtrar:</strong> Dispara nova consulta com todos os parâmetros combinados e atualiza todos os
              componentes visuais da página (KPI cards, gráfico e tabela) simultaneamente.
              <br /><strong>Botão Exportar:</strong> Gera arquivo com os dados atualmente filtrados. A exportação respeita todos os filtros ativos.
            </p>
          </div>
        </div>
      </section>

      {/* Indicadores */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Indicadores</h2>
        </div>
        <p className="text-muted-foreground mb-4">Quatro cards são exibidos no topo do conteúdo, atualizados conforme os filtros:</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-1">Valor Total</h3>
            <p className="text-sm text-muted-foreground">Soma de todos os custos no período. Indica tendência percentual comparada ao primeiro mês do range.</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">Valor Total = Cobranças Diretas + Cobranças Indiretas</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-1">Cobranças Diretas</h3>
            <p className="text-sm text-muted-foreground">Cobranças que estão mapeadas em alguma Tag.</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-1">Cobranças Indiretas</h3>
            <p className="text-sm text-muted-foreground">Cobranças que não estão mapeadas em nenhuma Tag.</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-1">Recursos Não Tagueados</h3>
            <p className="text-sm text-muted-foreground">Percentual do custo total gerado por recursos sem tags. 100% indica ausência de política de tagging.</p>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-lg border border-border bg-muted/50">
          <h3 className="font-semibold text-foreground mb-1">Card Budget</h3>
          <p className="text-sm text-muted-foreground">
            Contextual: sem budget definido exibe CTA <em>"Clique e favorite um budget para a sua conta"</em> com link para
            <code className="bg-muted px-1 rounded text-xs">/billing/budget</code>. Com budget definido, exibe valor e % de consumo vs. planejado.
          </p>
        </div>
        <img
          src={historicoServicoIndicadores}
          alt="Exemplo dos cards de Indicadores do Histórico de Serviço"
          className="w-full border border-border mt-4"
          style={{ borderRadius: "8px" }}
        />
      </section>

      {/* Gráfico */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Gráfico: Histórico de Consumo por Categoria</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p>Gráfico de barras empilhadas. Eixo X: períodos conforme filtro de intervalo. Eixo Y: custo em R$.</p>
          <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
            <li>Cada barra representa o total de custo empilhado por categoria de serviço</li>
            <li>Sufixo "(Indireto)" nas categorias indica cobranças não mapeadas em nenhuma Tag</li>
            <li>O eixo Y pode apresentar valores negativos (descontos/créditos)</li>
            <li>Número de barras = número de períodos no range selecionado</li>
          </ul>
          <img
            src={historicoServicoGrafico}
            alt="Exemplo do gráfico Histórico de Consumo por Categoria"
            className="w-full border border-border"
            style={{ borderRadius: "8px" }}
          />
        </div>
      </section>

      {/* Tabela */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Table className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Tabela: Visualização de Dados por Consumo</h2>
        </div>
        <div className="space-y-4 text-muted-foreground">
          <p>A tabela é dividida em duas seções independentes com cabeçalhos próprios:</p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-1">Cobranças Diretas</h3>
              <p className="text-sm">Cobranças que estão mapeadas em alguma Tag. Colunas: Nome | [Período 1] | [Período 2] ... Linha de total como cabeçalho de seção.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-1">Cobranças Indiretas</h3>
              <p className="text-sm">Cobranças que não estão mapeadas em nenhuma Tag. Mesma estrutura. Linhas de detalhe são expansíveis por ícone.</p>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800 text-sm">
            <p className="text-amber-800 dark:text-amber-200">
              <strong>Note:</strong> Valores monetários exibidos no formato <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">R$ X.XXX,XXXX</code> (4 casas decimais).
              A precisão de 4 casas é intencional para evitar arredondamentos em billing cloud.
            </p>
            <p className="text-amber-800 dark:text-amber-200 mt-2">
              <strong>Note:</strong> Descontos são exibidos com sinal negativo e prefixo <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">(Desconto)</code> no nome da linha.
            </p>
          </div>
          <img
            src={historicoServicoTabela}
            alt="Exemplo da Tabela de Visualização de Dados por Consumo"
            className="w-full border border-border"
            style={{ borderRadius: "8px" }}
          />
        </div>
      </section>

      {/* Regras de Cálculo */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Regras de Cálculo</h2>
        <div className="space-y-3 font-mono text-sm bg-muted/50 rounded-lg p-4">
          <p><strong>Valor Total:</strong></p>
          <p className="text-xs text-muted-foreground ml-4">Soma(Cobranças Diretas) + Soma(Cobranças Indiretas) + Soma(Descontos negativos)</p>
          <p className="mt-3"><strong>Variação %:</strong></p>
          <p className="text-xs text-muted-foreground ml-4">((Valor atual - Valor referência) / Valor referência) × 100</p>
          <p className="mt-3"><strong>Recursos Não Tagueados:</strong></p>
          <p className="text-xs text-muted-foreground ml-4">(Custo de recursos sem tags / Custo total) × 100</p>
        </div>
      </section>

      {/* Estados da Interface */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Estados da Interface</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-semibold text-foreground">Estado</th>
                <th className="text-left py-2 font-semibold text-foreground">Comportamento</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-medium">Budget não definido</td><td className="py-2">Card "Budget" exibe CTA de configuração</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-medium">Budget definido</td><td className="py-2">Card "Budget" exibe valor e % consumido vs. planejado</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-medium">Cobranças Diretas = R$ 0</td><td className="py-2">Seção visível na tabela com todas as linhas zeradas</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-medium">100% sem tag</td><td className="py-2">Card "Recursos não tagueados" exibe 100% e trend flat</td></tr>
              <tr><td className="py-2 pr-4 font-medium">Linha expandida</td><td className="py-2">Serviços individuais aparecem abaixo do grupo</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
