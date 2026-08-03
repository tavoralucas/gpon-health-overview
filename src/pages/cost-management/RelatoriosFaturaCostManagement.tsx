import { ArrowLeft, FileText, Receipt, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function RelatoriosFaturaCostManagement() {
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
          <h1 className="text-3xl font-bold text-foreground">Relatórios de Fatura</h1>
          <p className="mt-1 text-muted-foreground">
            Painéis baseados em faturamento
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Painéis Baseados em Fatura</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Os Painéis Baseados em Fatura apresentam dados e custos considerando <strong>todo o histórico de consumo</strong>, 
            incluindo recursos que foram criados, utilizados e posteriormente excluídos ou desativados.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Diferença fundamental:</strong> Enquanto os painéis de consumo mostram apenas recursos ativos, 
              os painéis de fatura mostram o valor real que será cobrado, incluindo recursos deletados durante o período faturado.
            </p>
          </div>

          <p>
            Esta seção apresenta os seguintes relatórios de fatura:
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Minha Fatura</h3>
              <p className="text-sm text-muted-foreground">
                Visualização consolidada da fatura mensal
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Financeiro</h3>
              <p className="text-sm text-muted-foreground">
                Análise detalhada de custos faturados
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">RCF</h3>
              <p className="text-sm text-muted-foreground">
                Relatório Customizado de Faturamento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Minha Fatura */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Minha Fatura
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O painel Minha Fatura oferece uma visão consolidada e detalhada dos custos faturados mensalmente, 
            permitindo ao usuário acompanhar seus gastos de forma clara e transparente.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/painel_fatura/ucloud_menu_financeiro_minha_fatura_001.png" 
              alt="Minha Fatura" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <p>
            Funcionalidades principais:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Informações da Fatura</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><strong>Período de faturamento:</strong> Mês/ano referente à cobrança</li>
                <li><strong>Data de vencimento:</strong> Prazo para pagamento</li>
                <li><strong>Valor total:</strong> Soma de todos os custos do período</li>
                <li><strong>Status:</strong> Aberta, Fechada, Paga, Vencida</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Detalhamento por Categoria</h3>
              <p className="text-sm text-muted-foreground mb-2">A fatura é dividida em categorias para facilitar o entendimento:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Compute (VMs, servidores)</li>
                <li>Storage (armazenamento)</li>
                <li>Network (tráfego de rede)</li>
                <li>Database (bancos de dados)</li>
                <li>Outros serviços</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Comparativo Mensal</h3>
              <p className="text-sm text-muted-foreground">
                Gráfico mostrando a evolução dos custos nos últimos 6 ou 12 meses, permitindo identificar tendências 
                e sazonalidades no consumo.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Exportação</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Download em PDF para impressão</li>
                <li>Export CSV para análise em planilhas</li>
                <li>Integração com sistemas financeiros via API</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200">
              <strong>Atenção:</strong> A fatura só é fechada após o dia definido no contrato. Até lá, os valores podem sofrer 
              pequenas atualizações conforme novos dados são processados.
            </p>
          </div>
        </div>
      </div>

      {/* Financeiro */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Painel Financeiro</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O Painel Financeiro oferece uma análise aprofundada dos dados de faturamento, com múltiplas dimensões de visualização 
            e ferramentas de drill-down para investigar custos específicos.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/painel_fatura/ucloud_menu_financeiro_financeiro_002.png" 
              alt="Painel Financeiro" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <p>
            Recursos avançados:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Filtros Multidimensionais</h3>
              <p className="text-sm text-muted-foreground mb-2">Combine múltiplos filtros para análises específicas:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Por período (mês, trimestre, ano)</li>
                <li>Por Virtual Datacenter (VDC)</li>
                <li>Por nuvem (AWS, Azure, Google, etc.)</li>
                <li>Por tipo de serviço</li>
                <li>Por tag de projeto ou departamento</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Análise de Tendências</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Previsão de custos futuros baseada em histórico</li>
                <li>Identificação de picos anormais de consumo</li>
                <li>Comparação year-over-year (YoY)</li>
                <li>Análise de sazonalidade</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Drill-down Hierárquico</h3>
              <p className="text-sm text-muted-foreground">
                Navegue desde visão macro (contrato total) até o nível mais granular (recurso individual), 
                clicando nas diferentes camadas do gráfico.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Dashboards Personalizáveis</h3>
              <p className="text-sm text-muted-foreground">
                Crie e salve visualizações customizadas com os KPIs mais relevantes para seu negócio.
              </p>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/painel_fatura/ucloud_menu_financeiro_financeiro_003.png" 
              alt="Análise detalhada" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>
        </div>
      </div>

      {/* RCF - Relatório Customizado de Faturamento */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-primary" />
          RCF - Relatório Customizado de Faturamento
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O RCF (Relatório Customizado de Faturamento) permite criar relatórios personalizados de acordo com 
            as necessidades específicas de análise do usuário, oferecendo máxima flexibilidade na visualização de dados financeiros.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_rcf/ucloud_menu_rcf_001.png" 
              alt="RCF" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <p>
            Configuração do RCF:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Seleção de Métricas</h3>
              <p className="text-sm text-muted-foreground mb-2">Escolha quais dados incluir no relatório:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Custo total e por categoria</li>
                <li>Quantidade de recursos</li>
                <li>Tempo de utilização</li>
                <li>Custo médio por hora/dia/mês</li>
                <li>Comparativos com períodos anteriores</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Agrupamentos Customizados</h3>
              <p className="text-sm text-muted-foreground mb-2">Organize os dados da forma mais adequada:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Por departamento/centro de custo</li>
                <li>Por projeto</li>
                <li>Por ambiente (produção, homologação, dev)</li>
                <li>Por região geográfica</li>
                <li>Por tags personalizadas</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Formatação do Relatório</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Escolha de colunas e ordem de apresentação</li>
                <li>Definição de totalizadores e subtotais</li>
                <li>Inclusão de gráficos e visualizações</li>
                <li>Aplicação de filtros e condições</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Automatização</h3>
              <p className="text-sm text-muted-foreground mb-2">Configure envios automáticos:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Agendamento diário, semanal ou mensal</li>
                <li>Lista de destinatários</li>
                <li>Formato de exportação (PDF, Excel, CSV)</li>
                <li>Condições de envio (ex: apenas se custo &gt; limite)</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_rcf/ucloud_menu_rcf_002.png" 
              alt="Configuração RCF" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200">
              <strong>Dica:</strong> Salve templates de relatórios recorrentes para economizar tempo na geração de 
              análises mensais ou para diferentes stakeholders.
            </p>
          </div>
        </div>
      </div>

      {/* Diferenças entre Consumo e Fatura */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Consumo vs Fatura: Entendendo as Diferenças</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            É fundamental entender a diferença entre os painéis baseados em consumo e os baseados em fatura para 
            uma gestão financeira eficaz:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/30">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Painéis de Consumo</h3>
              <ul className="list-disc list-inside text-sm space-y-2 text-blue-800 dark:text-blue-200">
                <li><strong>Recursos considerados:</strong> Apenas ativos</li>
                <li><strong>Atualização:</strong> Em tempo real</li>
                <li><strong>Uso ideal:</strong> Monitoramento atual</li>
                <li><strong>Exemplo:</strong> "Quanto estou gastando agora?"</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border-2 border-purple-500 bg-purple-50 dark:bg-purple-950/30">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">Painéis de Fatura</h3>
              <ul className="list-disc list-inside text-sm space-y-2 text-purple-800 dark:text-purple-200">
                <li><strong>Recursos considerados:</strong> Todos (inclusive deletados)</li>
                <li><strong>Atualização:</strong> Diária/consolidação mensal</li>
                <li><strong>Uso ideal:</strong> Faturamento/contabilidade</li>
                <li><strong>Exemplo:</strong> "Quanto vou/devo pagar?"</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800 mt-4">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Por que os valores podem diferir?</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-red-800 dark:text-red-200 ml-4">
              <li>Recursos criados e deletados durante o mês aparecem na fatura, mas não no consumo atual</li>
              <li>Aplicação de taxas e regras de faturamento configuradas no contrato</li>
              <li>Conversão cambial (para contratos em moeda diferente do provider)</li>
              <li>Descontos, créditos e ajustes aplicados apenas na fatura</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
