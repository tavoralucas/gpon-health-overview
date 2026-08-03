import { ArrowLeft, Settings, Tag, FolderTree, FileSearch, Coins, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function UtilitariosCostManagement() {
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
          <h1 className="text-3xl font-bold text-foreground">Utilitários Financeiros</h1>
          <p className="mt-1 text-muted-foreground">
            Ferramentas para gestão e organização financeira
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Utilitários</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Os Utilitários Financeiros são ferramentas complementares que auxiliam na organização, categorização e gestão 
            dos recursos e custos na plataforma uCloud.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Dimensão</h3>
              <p className="text-sm text-muted-foreground">
                Configuração de dimensões personalizadas para análise
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Tags Virtuais</h3>
              <p className="text-sm text-muted-foreground">
                Criação de tags customizadas para organização
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Centro de Custo</h3>
              <p className="text-sm text-muted-foreground">
                Gestão de centros de custo e alocação
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Levantamento de Contas</h3>
              <p className="text-sm text-muted-foreground">
                Análise detalhada de contas e consumo
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Gestão de Créditos</h3>
              <p className="text-sm text-muted-foreground">
                Controle de créditos e saldo disponível
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dimensão */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <FolderTree className="h-5 w-5 text-primary" />
          Dimensão
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            A funcionalidade de Dimensão permite criar categorias personalizadas para agrupar e analisar custos 
            de acordo com as necessidades específicas da organização.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_ucloud_findimensao/ucloud_menu_dimensao_001.png" 
              alt="Dimensão" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">O que são Dimensões?</h3>
              <p className="text-sm text-muted-foreground">
                Dimensões são atributos customizáveis que permitem categorizar e filtrar recursos para análise financeira. 
                Por exemplo: departamento, projeto, ambiente, cliente, região, etc.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Criando Dimensões</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Acesse o menu Financeiro → Utilitários → Dimensão</li>
                <li>Clique em "+ Adicionar Dimensão"</li>
                <li>Defina o nome e descrição da dimensão</li>
                <li>Configure os valores possíveis</li>
                <li>Associe aos recursos desejados</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Casos de Uso</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><strong>Por Departamento:</strong> RH, TI, Financeiro, Vendas</li>
                <li><strong>Por Projeto:</strong> Projeto A, Projeto B, Projeto C</li>
                <li><strong>Por Ambiente:</strong> Produção, Homologação, Desenvolvimento</li>
                <li><strong>Por Cliente:</strong> Cliente X, Cliente Y, Cliente Z</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Dica:</strong> Use dimensões em conjunto com relatórios financeiros para obter análises 
              multi-dimensionais dos custos.
            </p>
          </div>
        </div>
      </div>

      {/* Tags Virtuais */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          Tags Virtuais
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Tags Virtuais permitem criar e gerenciar etiquetas personalizadas que facilitam a organização, 
            busca e análise de recursos na plataforma.
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Diferença entre Tags Nativas e Virtuais</h3>
              <div className="grid gap-3 md:grid-cols-2 mt-2">
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Tags Nativas</p>
                  <p className="text-xs text-muted-foreground">
                    Criadas diretamente no provider (AWS, Azure, Google). 
                    São propagadas para a plataforma automaticamente.
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Tags Virtuais</p>
                  <p className="text-xs text-muted-foreground">
                    Criadas apenas na plataforma uCloud. 
                    Não afetam o provider e servem para organização interna.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Criando Tags Virtuais</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Acesse Financeiro → Utilitários → Tags Virtuais</li>
                <li>Clique em "+ Nova Tag Virtual"</li>
                <li>Defina a chave (key) e valor (value)</li>
                <li>Selecione os recursos para aplicar a tag</li>
                <li>Opcionalmente, crie regras automáticas de tagueamento</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Regras de Tagueamento Automático</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Configure regras para aplicar tags automaticamente baseadas em critérios:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Nome do recurso contém "prod" → Tag: Ambiente=Produção</li>
                <li>Recurso criado no VDC "Marketing" → Tag: Departamento=Marketing</li>
                <li>Recursos com custo &gt; $100/mês → Tag: CustoAlto=True</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">{t('common.benefits')}</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Organização flexível sem alterar providers</li>
                <li>Facilita rateio de custos entre departamentos</li>
                <li>Melhora filtros em relatórios financeiros</li>
                <li>Permite automação baseada em tags</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Centro de Custo */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Centro de Custo</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Centro de Custo é uma ferramenta essencial para alocação e rastreamento de despesas por áreas, 
            departamentos ou projetos específicos dentro da organização.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_centro_custo/ucloud_menu_centro_custo_001.png" 
              alt="Centro de Custo" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Estrutura de Centros de Custo</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Os centros de custo podem ser organizados hierarquicamente:
              </p>
              <div className="ml-4 text-sm font-mono">
                <div>Empresa</div>
                <div className="ml-4">├─ TI</div>
                <div className="ml-8">├─ Infraestrutura</div>
                <div className="ml-8">└─ Desenvolvimento</div>
                <div className="ml-4">├─ Marketing</div>
                <div className="ml-8">├─ Digital</div>
                <div className="ml-8">└─ Eventos</div>
                <div className="ml-4">└─ Vendas</div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Criando Centro de Custo</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Acesse Financeiro → Utilitários → Centro de Custo</li>
                <li>Clique em "+ Adicionar Centro de Custo"</li>
                <li>Preencha: Nome, Código, Responsável</li>
                <li>Defina centro de custo pai (se hierárquico)</li>
                <li>Associe recursos ou VDCs ao centro de custo</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Relatórios por Centro de Custo</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Todos os relatórios financeiros podem ser filtrados por centro de custo, mostrando:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Custo total acumulado</li>
                <li>Custo por período</li>
                <li>Comparativo entre centros de custo</li>
                <li>Percentual do custo total</li>
                <li>Tendência de crescimento</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Alocação de Recursos</h3>
              <p className="text-sm text-muted-foreground">
                Recursos podem ser alocados a centros de custo de três formas:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><strong>Direta:</strong> Recurso pertence 100% ao centro de custo</li>
                <li><strong>Proporcional:</strong> Custo dividido entre múltiplos centros (ex: 60/40)</li>
                <li><strong>Automática:</strong> Baseada em tags ou VDC do recurso</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200">
              <strong>Importante:</strong> A alocação por centro de custo é fundamental para chargeback (cobrança de departamentos) 
              e showback (demonstração de custos) na organização.
            </p>
          </div>
        </div>
      </div>

      {/* Levantamento de Contas */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <FileSearch className="h-5 w-5 text-primary" />
          Levantamento de Contas
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O Levantamento de Contas oferece uma análise detalhada das contas (accounts) dos provedores de nuvem 
            vinculadas ao contrato, com foco nos custos e consumo.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_levantamento_contas/ucloud_menu_levantamento_contas_001.png" 
              alt="Levantamento de Contas" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Informações Apresentadas</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><strong>Nome da Conta:</strong> Identificação no provider</li>
                <li><strong>Provedor:</strong> AWS, Azure, Google Cloud, etc.</li>
                <li><strong>ID da Conta:</strong> Identificador único</li>
                <li><strong>VDC Associado:</strong> Virtual Datacenter</li>
                <li><strong>Status:</strong> Ativa, Inativa, Pendente</li>
                <li><strong>Custo Acumulado:</strong> Total gasto no período</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Análise por Conta</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Clicando em uma conta específica, é possível visualizar:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Detalhamento de custos por serviço</li>
                <li>Recursos ativos na conta</li>
                <li>Histórico de consumo</li>
                <li>Comparativo com outras contas</li>
                <li>Alertas e anomalias de custo</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Consolidação Multi-Cloud</h3>
              <p className="text-sm text-muted-foreground">
                Quando a organização possui contas em múltiplos providers, o Levantamento de Contas consolida 
                todas em uma única visão, facilitando análises comparativas e identificação de oportunidades de otimização.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Exportação</h3>
              <p className="text-sm text-muted-foreground">
                Export detalhado de todas as contas com seus respectivos custos para análise externa ou auditoria.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gestão de Créditos */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Coins className="h-5 w-5 text-primary" />
          Gestão de Créditos
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            A Gestão de Créditos permite administrar créditos promocionais, descontos e saldos disponíveis 
            que serão aplicados nas faturas para redução de custos.
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Tipos de Créditos</h3>
              <div className="grid gap-3 md:grid-cols-2 mt-2">
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Créditos Promocionais</p>
                  <p className="text-xs text-muted-foreground">
                    Fornecidos pelo provider ou reseller como incentivo. Geralmente têm data de validade.
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Créditos de Contrato</p>
                  <p className="text-xs text-muted-foreground">
                    Definidos em acordos comerciais. Podem ser mensais ou para uso específico.
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Descontos</p>
                  <p className="text-xs text-muted-foreground">
                    Percentuais ou valores fixos aplicados em serviços específicos.
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Ajustes Manuais</p>
                  <p className="text-xs text-muted-foreground">
                    Correções ou compensações aplicadas pelo administrador.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Adicionando Créditos</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Acesse Financeiro → Utilitários → Gestão de Créditos</li>
                <li>Clique em "+ Adicionar Crédito"</li>
                <li>Preencha: Valor, Tipo, Validade</li>
                <li>Defina regras de aplicação (automática/manual)</li>
                <li>Associe ao contrato ou VDC específico</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Visualização de Saldo</h3>
              <p className="text-sm text-muted-foreground mb-2">
                O painel mostra:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Saldo total disponível</li>
                <li>Créditos já utilizados no mês</li>
                <li>Créditos a vencer (próximos 30 dias)</li>
                <li>Histórico de aplicação de créditos</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Aplicação Automática</h3>
              <p className="text-sm text-muted-foreground">
                Configure a ordem de aplicação dos créditos na fatura. Por exemplo:
              </p>
              <ol className="list-decimal list-inside text-sm space-y-1 ml-4 mt-2">
                <li>Aplicar créditos com vencimento mais próximo primeiro</li>
                <li>Aplicar créditos específicos de serviço antes dos genéricos</li>
                <li>Reservar créditos para serviços prioritários</li>
              </ol>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200">
              <strong>Dica:</strong> Configure alertas para créditos prestes a vencer, garantindo máxima utilização 
              dos benefícios antes da expiração.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
