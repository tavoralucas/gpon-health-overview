import { ArrowLeft, BarChart3, TrendingUp, Eye, AlertCircle, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function RelatoriosConsumoCostManagement() {
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
          <h1 className="text-3xl font-bold text-foreground">Relatórios de Consumo</h1>
          <p className="mt-1 text-muted-foreground">
            Painéis baseados em consumo de recursos
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Painéis Baseados em Consumo</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Os Painéis Baseados em Consumo apresentam dados e custos dos recursos consumidos no ambiente do usuário 
            (<strong>somente recursos ativos</strong>). Esses painéis não consideram recursos que foram excluídos ou desativados.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Importante:</strong> Os valores apresentados nos relatórios de consumo refletem o estado atual dos recursos ativos, 
              sem considerar o histórico de recursos que já foram deletados.
            </p>
          </div>

          <p>
            Esta seção apresenta os seguintes relatórios de consumo:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Histórico de Serviço</h3>
              <p className="text-sm text-muted-foreground">
                Visualização do consumo de serviços ao longo do tempo
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Custo Cadenciado</h3>
              <p className="text-sm text-muted-foreground">
                Análise de custos com cadência mensal, semanal ou diária
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">CRP - Custo por Recurso</h3>
              <p className="text-sm text-muted-foreground">
                Detalhamento de custos individualizados por recurso
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Visualização de Recursos</h3>
              <p className="text-sm text-muted-foreground">
                Visualização detalhada dos recursos e seus custos
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Limite de Custo</h3>
              <p className="text-sm text-muted-foreground">
                Gestão de limites e alertas de custos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Histórico de Serviço */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Histórico de Serviço
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O painel Histórico de Serviço apresenta uma gama de informações relevantes sobre o consumo e a situação dos recursos 
            de faturamento presentes no contrato da empresa.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/ucloud_menu_financeiro_002.png" 
              alt="Histórico de serviço" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <p>
            O relatório possui três áreas principais:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Área de Filtros</h3>
              <p className="text-sm text-muted-foreground mb-2">Permite refinar a busca por período e recursos específicos:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Filtro por data (período customizado)</li>
                <li>Seleção de nuvens (Azure, AWS, Google, etc.)</li>
                <li>Filtro por Virtual Datacenter (VDC)</li>
                <li>Agrupamento por serviço, recurso ou tag</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Área de Visualização Gráfica</h3>
              <p className="text-sm text-muted-foreground mb-2">Gráficos interativos mostrando:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Evolução temporal dos custos</li>
                <li>Comparativo entre serviços</li>
                <li>Distribuição de gastos por categoria</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Área de Tabela Detalhada</h3>
              <p className="text-sm text-muted-foreground mb-2">Lista completa com:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Nome do recurso</li>
                <li>Tipo de serviço</li>
                <li>Custo total e por período</li>
                <li>Opções de exportação (CSV, Excel)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Custo Cadenciado */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Custo Cadenciado</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O relatório de Custo Cadenciado permite visualizar os gastos com uma perspectiva temporal específica, 
            facilitando a análise de tendências e padrões de consumo.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/ucloud_menu_financeiro_003.png" 
              alt="Custo cadenciado" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <p>
            Funcionalidades principais:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Seleção de Cadência</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><strong>Mensal:</strong> Visão consolidada dos custos por mês</li>
                <li><strong>Semanal:</strong> Análise semanal do consumo</li>
                <li><strong>Diária:</strong> Detalhamento diário dos gastos</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Agrupamentos Disponíveis</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Por Virtual Datacenter (VDC)</li>
                <li>Por tipo de serviço</li>
                <li>Por nuvem (Provider)</li>
                <li>Por tags personalizadas</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Exportação de Dados</h3>
              <p className="text-sm text-muted-foreground">
                Permite exportar os dados em diversos formatos para análise externa (CSV, Excel, PDF)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CRP - Custo por Recurso */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">CRP - Custo por Recurso</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O painel CRP (Custo por Recurso) fornece uma visão detalhada e individualizada do custo de cada recurso ativo 
            no ambiente cloud, permitindo identificar os recursos mais custosos e otimizar gastos.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_crp/ucloud_menu_financeiro_crp_001.png" 
              alt="CRP" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <p>
            Características do CRP:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Visão por Recurso Individual</h3>
              <p className="text-sm text-muted-foreground mb-2">Lista cada recurso com:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Nome identificador do recurso</li>
                <li>Tipo/categoria do serviço</li>
                <li>Custo atual e histórico</li>
                <li>Provider (AWS, Azure, Google, etc.)</li>
                <li>Status (ativo/inativo)</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Filtros Avançados</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Filtro por range de valores</li>
                <li>Busca por nome ou ID do recurso</li>
                <li>Seleção de múltiplos VDCs</li>
                <li>Ordenação por custo (crescente/decrescente)</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Drill-down de Detalhes</h3>
              <p className="text-sm text-muted-foreground">
                Clicando em um recurso específico, é possível visualizar informações técnicas detalhadas, 
                histórico de custos e métricas de utilização.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200">
              <strong>Dica:</strong> Use o CRP para identificar recursos subutilizados ou superdimensionados que podem 
              ser otimizados para reduzir custos operacionais.
            </p>
          </div>
        </div>
      </div>

      {/* Visualização de Recursos */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          Visualização de Recursos
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O painel de Visualização de Recursos oferece uma interface visual intuitiva para explorar todos os recursos 
            ativos no ambiente, com foco na relação entre custo e utilização.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/ucloud_menu_financeiro_004.png" 
              alt="Visualização recursos" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <p>
            Funcionalidades principais:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Mapa de Recursos</h3>
              <p className="text-sm text-muted-foreground">
                Visualização hierárquica mostrando a organização dos recursos por VDC, projeto ou tag
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Comparativos</h3>
              <p className="text-sm text-muted-foreground">
                Comparação lado a lado de recursos similares para análise de custos
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Indicadores Visuais</h3>
              <p className="text-sm text-muted-foreground">
                Códigos de cores indicando níveis de custo (baixo, médio, alto, crítico)
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Busca Inteligente</h3>
              <p className="text-sm text-muted-foreground">
                Localiza rapidamente recursos por nome, tipo, VDC ou tags
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Limite de Custo */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          Limite de Custo
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O painel de Limite de Custo permite configurar alertas e limites de gastos para controlar o consumo de recursos 
            e evitar surpresas na fatura.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_lc_ar/ucloud_menu_limite_custo_001.png" 
              alt="Limite de custo" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <p>
            Configurações disponíveis:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Definição de Limites</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Limite global por contrato</li>
                <li>Limite por VDC</li>
                <li>Limite por grupo de usuários</li>
                <li>Limite por tipo de recurso</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Configuração de Alertas</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Alerta ao atingir 50% do limite</li>
                <li>Alerta ao atingir 75% do limite</li>
                <li>Alerta ao atingir 90% do limite</li>
                <li>Alerta crítico ao ultrapassar 100%</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Notificações</h3>
              <p className="text-sm text-muted-foreground mb-2">Envio automático de notificações via:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>E-mail corporativo</li>
                <li>Notificações in-app</li>
                <li>Webhooks personalizados</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Ações Automáticas</h3>
              <p className="text-sm text-muted-foreground">
                Opção de configurar ações automáticas ao atingir limites (ex: desabilitar criação de novos recursos)
              </p>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200">
              <strong>Importante:</strong> Os limites de custo são baseados em valores estimados de consumo atual. 
              Para maior precisão, revise periodicamente os limites configurados e ajuste conforme necessário.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
