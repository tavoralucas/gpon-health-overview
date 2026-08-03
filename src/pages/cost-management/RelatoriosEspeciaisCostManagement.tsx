import { ArrowLeft, BarChart2, TrendingUp, Percent, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function RelatoriosEspeciaisCostManagement() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/cost-management")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('costManagement.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <TrendingDown className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('costManagement.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Relatórios Especiais</h1>
          <p className="mt-1 text-muted-foreground">
            Análises avançadas e relatórios customizados
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Relatórios Especializados</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Os Relatórios Especiais oferecem análises aprofundadas e visualizações customizadas para casos de uso 
            específicos que vão além dos relatórios padrão de consumo e fatura.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">RMC v1</h3>
              <p className="text-sm text-muted-foreground">
                Relatório de Margem de Contribuição (versão 1)
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Tendência de Faturamento</h3>
              <p className="text-sm text-muted-foreground">
                Análise preditiva de custos futuros
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Relatório de Margem</h3>
              <p className="text-sm text-muted-foreground">
                Análise de margens de lucro por serviço
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RMC v1 */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Percent className="h-5 w-5 text-primary" />
          RMC v1 - Relatório de Margem de Contribuição
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O RMC (Relatório de Margem de Contribuição) versão 1 foi desenvolvido para fornecer insights sobre 
            a lucratividade e margem de cada recurso ou conjunto de recursos, considerando custos de aquisição 
            do provider e valores de revenda.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_ucloud_fin_rmcv1/ucloud_menu_financeiro_rmcv1_001.png" 
              alt="RMC v1" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Nota:</strong> Este relatório é especialmente útil para empresas que revendem serviços de cloud, 
              permitindo análise de margem por cliente, projeto ou VDC.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Informações do Relatório</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><strong>Custo Provider:</strong> Valor cobrado pelo provider (AWS, Azure, etc.)</li>
                <li><strong>Preço Revenda:</strong> Valor cobrado ao cliente final</li>
                <li><strong>Margem Bruta:</strong> Diferença entre preço de revenda e custo provider</li>
                <li><strong>Margem %:</strong> Percentual de margem sobre o preço de revenda</li>
                <li><strong>Receita Total:</strong> Soma de todos os valores de revenda</li>
                <li><strong>Custo Total:</strong> Soma de todos os custos de provider</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Cálculo de Margem</h3>
              <div className="bg-background p-4 rounded border border-border mt-2">
                <p className="text-sm mb-2">Fórmulas utilizadas:</p>
                <div className="font-mono text-xs space-y-2">
                  <div className="p-2 bg-muted rounded">
                    <strong>Margem Bruta (R$)</strong> = Preço Revenda - Custo Provider
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <strong>Margem (%)</strong> = (Margem Bruta / Preço Revenda) × 100
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <strong>Markup</strong> = (Preço Revenda / Custo Provider) - 1
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Agrupamentos Disponíveis</h3>
              <p className="text-sm text-muted-foreground mb-2">
                O relatório pode ser agrupado por diferentes dimensões:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Por Cliente/Contrato</li>
                <li>Por Virtual Datacenter (VDC)</li>
                <li>Por tipo de serviço</li>
                <li>Por região geográfica</li>
                <li>Por tag de projeto</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Análises Possíveis</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Identificar clientes/projetos mais lucrativos</li>
                <li>Detectar serviços com margem negativa</li>
                <li>Comparar margens entre diferentes providers</li>
                <li>Avaliar impacto de descontos nas margens</li>
                <li>Planejar ajustes de preços de revenda</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_ucloud_fin_rmcv1/ucloud_menu_financeiro_rmcv1_002.png" 
              alt="Detalhes RMC v1" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200">
              <strong>Atenção:</strong> Para utilizar este relatório, é necessário configurar previamente os 
              preços de revenda no cadastro de contratos ou nas regras de faturamento.
            </p>
          </div>
        </div>
      </div>

      {/* Tendência de Faturamento */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Tendência de Faturamento
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O relatório de Tendência de Faturamento utiliza dados históricos e algoritmos de análise preditiva 
            para estimar custos futuros, auxiliando no planejamento financeiro e identificação antecipada de anomalias.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/tendencia_faturamento/ucloud_menu_tendencia_faturamento_001.png" 
              alt="Tendência de Faturamento" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Funcionalidades Principais</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><strong>Previsão de Custos:</strong> Estimativa de gastos para os próximos 30, 60 ou 90 dias</li>
                <li><strong>Análise de Tendências:</strong> Identificação de padrões de crescimento ou redução</li>
                <li><strong>Detecção de Anomalias:</strong> Alerta sobre picos ou quedas inesperadas</li>
                <li><strong>Comparação Histórica:</strong> Confronto com períodos anteriores (YoY, MoM)</li>
                <li><strong>Simulações:</strong> Projeções baseadas em diferentes cenários</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Modelos de Previsão</h3>
              <div className="grid gap-3 md:grid-cols-2 mt-2">
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Linear</p>
                  <p className="text-xs text-muted-foreground">
                    Assume crescimento/decrescimento constante. Ideal para ambientes estáveis.
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Exponencial</p>
                  <p className="text-xs text-muted-foreground">
                    Considera aceleração no crescimento. Útil para ambientes em rápida expansão.
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Sazonal</p>
                  <p className="text-xs text-muted-foreground">
                    Identifica padrões que se repetem periodicamente (mensal, trimestral).
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Machine Learning</p>
                  <p className="text-xs text-muted-foreground">
                    Algoritmo avançado que aprende com múltiplos fatores históricos.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Visualizações</h3>
              <p className="text-sm text-muted-foreground mb-2">
                O relatório apresenta múltiplas visualizações:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Gráfico de linha com histórico + projeção</li>
                <li>Intervalo de confiança (melhor caso / pior caso)</li>
                <li>Comparativo com budget planejado</li>
                <li>Breakdown por serviço ou categoria</li>
                <li>Mapa de calor identificando períodos de maior gasto</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Fatores Considerados</h3>
              <div className="bg-background p-3 rounded border border-border mt-2 text-sm">
                <p className="mb-2">A previsão leva em conta:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-xs">
                  <li>Histórico de consumo dos últimos 3-12 meses</li>
                  <li>Sazonalidade (ex: maior uso em fim de ano)</li>
                  <li>Recursos recentemente provisionados</li>
                  <li>Contratos e compromissos de longo prazo</li>
                  <li>Planejamento de novos projetos (se informado)</li>
                  <li>Taxa de crescimento da base de usuários</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/tendencia_faturamento/ucloud_menu_tendencia_faturamento_002.png" 
              alt="Gráfico tendência" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200">
              <strong>Dica:</strong> Use as previsões para ajustar budgets proativamente e negociar melhores 
              condições com providers antecipadamente.
            </p>
          </div>
        </div>
      </div>

      {/* Relatório de Margem */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Relatório de Margem</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O Relatório de Margem oferece uma análise consolidada das margens de lucro por diferentes dimensões, 
            permitindo identificar rapidamente quais áreas, projetos ou serviços são mais rentáveis.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_relatorio_margem/ucloud_menu_relatorio_margem_001.png" 
              alt="Relatório de Margem" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Estrutura do Relatório</h3>
              <p className="text-sm text-muted-foreground mb-2">
                O relatório organiza as informações em camadas de análise:
              </p>
              <div className="space-y-2 mt-2">
                <div className="p-2 bg-background rounded border border-border text-sm">
                  <strong>{t('common.overview')}:</strong> Margem total consolidada do contrato
                </div>
                <div className="p-2 bg-background rounded border border-border text-sm">
                  <strong>Nível 2 - Por Provider:</strong> Margem discriminada por cloud provider
                </div>
                <div className="p-2 bg-background rounded border border-border text-sm">
                  <strong>Nível 3 - Por VDC:</strong> Margem de cada Virtual Datacenter
                </div>
                <div className="p-2 bg-background rounded border border-border text-sm">
                  <strong>Nível 4 - Por Serviço:</strong> Margem detalhada por tipo de serviço
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Métricas Apresentadas</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><strong>Custo Total:</strong> Soma de todos os custos de provider</li>
                <li><strong>Receita Total:</strong> Valor total cobrado dos clientes</li>
                <li><strong>Margem Absoluta (R$):</strong> Receita - Custo</li>
                <li><strong>Margem Relativa (%):</strong> (Margem / Receita) × 100</li>
                <li><strong>ROI:</strong> Retorno sobre investimento</li>
                <li><strong>Contribution Margin:</strong> Margem de contribuição por unidade</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Indicadores Visuais</h3>
              <div className="grid gap-2 mt-2">
                <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                  <div className="h-4 w-4 rounded bg-green-500"></div>
                  <span className="text-sm text-green-800 dark:text-green-200">
                    <strong>Verde:</strong> Margem saudável (&gt; 30%)
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded border border-yellow-200 dark:border-yellow-800">
                  <div className="h-4 w-4 rounded bg-yellow-500"></div>
                  <span className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Amarelo:</strong> Margem moderada (15-30%)
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                  <div className="h-4 w-4 rounded bg-red-500"></div>
                  <span className="text-sm text-red-800 dark:text-red-200">
                    <strong>Vermelho:</strong> Margem baixa ou negativa (&lt; 15%)
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Filtros e Segmentações</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Por período (mensal, trimestral, anual)</li>
                <li>Por cliente ou grupo de clientes</li>
                <li>Por categoria de serviço (Compute, Storage, Network, etc.)</li>
                <li>Por tag ou centro de custo</li>
                <li>Excluir/incluir serviços específicos</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Casos de Uso</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Identificar produtos/serviços com margem negativa</li>
                <li>Avaliar viabilidade de descontos comerciais</li>
                <li>Comparar rentabilidade entre diferentes clientes</li>
                <li>Tomar decisões sobre descontinuação de serviços</li>
                <li>Negociar melhores taxas com providers</li>
                <li>Planejar reajustes de preços</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_relatorio_margem/ucloud_menu_relatorio_margem_002.png" 
              alt="Análise detalhada margem" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-purple-800 dark:text-purple-200">
              <strong>Insight:</strong> Acompanhe o relatório de margem mensalmente para identificar tendências 
              e tomar ações corretivas antes que margens negativas impactem significativamente o resultado.
            </p>
          </div>
        </div>
      </div>

      {/* Exportação e Automação */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Exportação e Automação</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Todos os relatórios especiais podem ser exportados e automatizados para distribuição recorrente:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Formatos de Exportação</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li>PDF (formatado para impressão)</li>
                <li>Excel (XLSX com múltiplas abas)</li>
                <li>CSV (dados tabulares simples)</li>
                <li>JSON (para integração com APIs)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Agendamento</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li>Envio diário, semanal ou mensal</li>
                <li>Lista de destinatários customizável</li>
                <li>Horário de envio definível</li>
                <li>Condições de disparo (ex: apenas se margem &lt; 20%)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
