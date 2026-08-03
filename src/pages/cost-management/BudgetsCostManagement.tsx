import { ArrowLeft, PiggyBank, TrendingUp, AlertTriangle, Target, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function BudgetsCostManagement() {
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
          <h1 className="text-3xl font-bold text-foreground">Budgets</h1>
          <p className="mt-1 text-muted-foreground">
            Gestão de orçamentos e análise de risco financeiro
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Gestão de Budgets</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O painel de Budgets (Orçamentos) é uma ferramenta essencial para planejamento e controle financeiro, 
            permitindo definir metas de gastos e acompanhar o consumo em relação ao orçamento estabelecido.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Importante:</strong> Budgets permitem controle proativo dos custos, com alertas automáticos quando 
              o consumo se aproxima ou ultrapassa os limites definidos.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Budgets</h3>
              <p className="text-sm text-muted-foreground">
                Criação e gestão de orçamentos principais
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Sub-Budgets</h3>
              <p className="text-sm text-muted-foreground">
                Divisão de orçamentos em categorias menores
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Análise de Risco</h3>
              <p className="text-sm text-muted-foreground">
                Previsão e identificação de riscos financeiros
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Budgets */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Criando e Gerenciando Budgets
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Budgets permitem estabelecer limites de gastos para diferentes períodos, VDCs, serviços ou projetos, 
            proporcionando controle financeiro granular.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_budget/ucloud_menu_budget_gerenciamento_001.png" 
              alt="Budgets" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Criando um Budget</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Acesse Menu Financeiro → Budgets</li>
                <li>Clique em "+ Criar Budget"</li>
                <li>Preencha o nome e descrição do budget</li>
                <li>Defina o valor do orçamento</li>
                <li>Selecione o período (mensal, trimestral, anual)</li>
                <li>Escolha o escopo (Contrato inteiro, VDC específico, Tags, etc.)</li>
                <li>Configure alertas e notificações</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Tipos de Budget</h3>
              <div className="grid gap-3 md:grid-cols-2 mt-2">
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Budget Fixo</p>
                  <p className="text-xs text-muted-foreground">
                    Valor definido que se mantém constante ao longo do período (ex: R$ 10.000/mês).
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Budget Variável</p>
                  <p className="text-xs text-muted-foreground">
                    Valor que varia conforme a média histórica ou crescimento planejado.
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Budget por Projeto</p>
                  <p className="text-xs text-muted-foreground">
                    Orçamento específico para um projeto com início e fim definidos.
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Budget Recorrente</p>
                  <p className="text-xs text-muted-foreground">
                    Budget que se renova automaticamente a cada período (mensal, trimestral).
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Configuração de Alertas</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Configure notificações para diferentes níveis de consumo:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><span className="text-yellow-600 font-semibold">50%:</span> Alerta preventivo - gastos atingiram metade do budget</li>
                <li><span className="text-orange-600 font-semibold">75%:</span> Alerta de atenção - aproximando do limite</li>
                <li><span className="text-red-600 font-semibold">90%:</span> Alerta crítico - limite quase atingido</li>
                <li><span className="text-red-800 font-semibold">100%:</span> Alerta de estouro - budget ultrapassado</li>
                <li><span className="text-purple-600 font-semibold">Previsão:</span> Alerta quando projeção indica estouro futuro</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Visualização de Budget</h3>
              <p className="text-sm text-muted-foreground mb-2">O painel mostra:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Valor total do budget</li>
                <li>Valor consumido até o momento</li>
                <li>Percentual utilizado</li>
                <li>Saldo restante</li>
                <li>Projeção de consumo até o fim do período</li>
                <li>Gráfico de evolução do consumo</li>
                <li>Comparativo com períodos anteriores</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_budget/ucloud_menu_budget_gerenciamento_002.png" 
              alt="Visualização Budget" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>
        </div>
      </div>

      {/* Sub-Budgets */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Sub-Budgets</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Sub-Budgets permitem dividir um budget principal em categorias menores, facilitando o controle 
            granular e a alocação de recursos por departamento, projeto ou tipo de serviço.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_budget/ucloud_menu_budget_gerenciamento_003.png" 
              alt="Sub-Budgets" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Estrutura Hierárquica</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Exemplo de divisão de budget de R$ 100.000/mês:
              </p>
              <div className="ml-4 text-sm font-mono bg-background p-3 rounded border border-border">
                <div className="text-primary font-semibold">Budget Principal: R$ 100.000</div>
                <div className="ml-4 mt-2">├─ Sub-Budget TI: R$ 50.000</div>
                <div className="ml-8">├─ Infraestrutura: R$ 30.000</div>
                <div className="ml-8">└─ Desenvolvimento: R$ 20.000</div>
                <div className="ml-4 mt-2">├─ Sub-Budget Marketing: R$ 30.000</div>
                <div className="ml-8">├─ Campanhas: R$ 20.000</div>
                <div className="ml-8">└─ Analytics: R$ 10.000</div>
                <div className="ml-4 mt-2">└─ Sub-Budget Vendas: R$ 20.000</div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Criando Sub-Budgets</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Selecione um budget principal existente</li>
                <li>Clique em "+ Adicionar Sub-Budget"</li>
                <li>Defina nome e valor (não pode exceder o budget pai)</li>
                <li>Configure escopo específico (VDC, tags, serviços)</li>
                <li>Defina alertas independentes</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Vantagens dos Sub-Budgets</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Responsabilização por área/departamento</li>
                <li>Controle distribuído do orçamento</li>
                <li>Visibilidade de consumo por categoria</li>
                <li>Facilita identificação de áreas com estouro</li>
                <li>Permite realocação entre sub-budgets</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Regras de Soma</h3>
              <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded border border-amber-200 dark:border-amber-800">
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  <strong>Importante:</strong> A soma dos sub-budgets não pode exceder o budget principal. 
                  Se necessário ajustar, primeiro aumente o budget pai ou reduza outros sub-budgets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Análise de Risco */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Análise de Risco
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            A Análise de Risco utiliza dados históricos e tendências de consumo para prever possíveis estouros 
            de budget e identificar riscos financeiros antes que se tornem problemas reais.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_budget/ucloud_menu_budget_analise_risco_001.png" 
              alt="Análise de Risco" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Indicadores de Risco</h3>
              <div className="grid gap-3 mt-2">
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                  <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">L</div>
                  <div>
                    <p className="font-semibold text-sm text-green-900 dark:text-green-100">Risco Baixo (Low)</p>
                    <p className="text-xs text-green-800 dark:text-green-200">
                      Consumo dentro do esperado. Projeção indica utilização de 60-80% do budget.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded border border-yellow-200 dark:border-yellow-800">
                  <div className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">M</div>
                  <div>
                    <p className="font-semibold text-sm text-yellow-900 dark:text-yellow-100">Risco Médio (Medium)</p>
                    <p className="text-xs text-yellow-800 dark:text-yellow-200">
                      Consumo acelerado. Projeção indica utilização de 85-100% do budget. Atenção recomendada.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                  <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">H</div>
                  <div>
                    <p className="font-semibold text-sm text-red-900 dark:text-red-100">Risco Alto (High)</p>
                    <p className="text-xs text-red-800 dark:text-red-200">
                      Consumo crítico. Projeção indica estouro do budget (&gt;100%). Ação imediata necessária.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Fatores de Análise</h3>
              <p className="text-sm text-muted-foreground mb-2">
                A análise de risco considera múltiplos fatores:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><strong>Tendência de Consumo:</strong> Crescimento nos últimos 7, 15 e 30 dias</li>
                <li><strong>Sazonalidade:</strong> Padrões históricos do mesmo período em anos anteriores</li>
                <li><strong>Recursos Recentes:</strong> Novos recursos criados que impactam custo</li>
                <li><strong>Velocidade de Consumo:</strong> Taxa de crescimento do gasto diário</li>
                <li><strong>Outliers:</strong> Picos anormais de consumo detectados</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Projeções</h3>
              <p className="text-sm text-muted-foreground mb-2">
                A plataforma oferece três tipos de projeção:
              </p>
              <div className="space-y-2 mt-2">
                <div className="p-2 bg-background rounded border border-border text-sm">
                  <span className="font-semibold">Conservadora:</span> Baseada na média dos últimos 30 dias
                </div>
                <div className="p-2 bg-background rounded border border-border text-sm">
                  <span className="font-semibold">Moderada:</span> Considera tendência linear de crescimento
                </div>
                <div className="p-2 bg-background rounded border border-border text-sm">
                  <span className="font-semibold">Agressiva:</span> Considera pior cenário com aceleração de consumo
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Recomendações Automáticas</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Quando risco é detectado, a plataforma sugere ações:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Revisar recursos subutilizados para desligamento</li>
                <li>Ajustar configurações de recursos superdimensionados</li>
                <li>Redistribuir carga entre diferentes regiões/zonas</li>
                <li>Reavaliar necessidade de recursos em ambientes não-produtivos</li>
                <li>Aumentar budget ou realocar de outras áreas</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_budget/ucloud_menu_budget_analise_risco_002.png" 
              alt="Gráfico análise de risco" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-purple-800 dark:text-purple-200">
              <strong>Machine Learning:</strong> A análise de risco utiliza algoritmos de machine learning que 
              aprendem com os padrões históricos da organização, tornando-se mais precisa ao longo do tempo.
            </p>
          </div>
        </div>
      </div>

      {/* Melhores Práticas */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Melhores Práticas para Budgets
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">✓ Faça</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Revise budgets mensalmente</li>
                <li>Configure múltiplos níveis de alertas</li>
                <li>Use sub-budgets para granularidade</li>
                <li>Baseie-se em dados históricos</li>
                <li>Inclua margem de segurança (10-15%)</li>
                <li>Acompanhe tendências semanalmente</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">✗ Evite</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Definir budgets muito conservadores</li>
                <li>Ignorar alertas de 50% e 75%</li>
                <li>Criar budgets sem escopo claro</li>
                <li>Não revisar após mudanças de arquitetura</li>
                <li>Deixar budgets desatualizados</li>
                <li>Não envolver responsáveis das áreas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
