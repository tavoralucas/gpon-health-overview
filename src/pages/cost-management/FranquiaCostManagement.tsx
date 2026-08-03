import { ArrowLeft, Package, Users, Settings, AlertCircle, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function FranquiaCostManagement() {
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
          <h1 className="text-3xl font-bold text-foreground">Franquia</h1>
          <p className="mt-1 text-muted-foreground">
            Gestão de franquias para clientes GOV e ETICE
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('common.whatIs')}</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            A funcionalidade de Franquia (Franquicia) é um painel especializado destinado <strong>exclusivamente 
            para clientes GOV (governamentais) e ETICE</strong>, que trabalham com o modelo de precificação USN 
            (Unidade de Serviço de Nuvem).
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Acesso Restrito</p>
                <p className="text-amber-800 dark:text-amber-200">
                  Este painel só estará visível para usuários de contratos GOV e ETICE que utilizam o modelo USN. 
                  Outros tipos de contrato não terão acesso a esta funcionalidade.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_franquia/ucloud_menu_franquia_001.png" 
              alt="Menu Franquia" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>
        </div>
      </section>

      {/* Modelo USN */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Modelo USN (Unidade de Serviço de Nuvem)
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O modelo USN é uma metodologia de precificação onde os recursos de cloud são convertidos em 
            unidades padronizadas, facilitando o controle orçamentário e a comparação de custos.
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Conversão para USN</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Cada tipo de recurso possui uma taxa de conversão para USN. Por exemplo:
              </p>
              <div className="bg-background p-3 rounded border border-border">
                <div className="grid gap-2 text-sm font-mono">
                  <div className="flex justify-between">
                    <span>1 vCPU por mês</span>
                    <span className="text-primary font-semibold">= 10 USN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 GB RAM por mês</span>
                    <span className="text-primary font-semibold">= 2 USN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>10 GB Storage por mês</span>
                    <span className="text-primary font-semibold">= 1 USN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>100 GB Tráfego</span>
                    <span className="text-primary font-semibold">= 0.5 USN</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">
                * Valores exemplificativos. As taxas reais são definidas no contrato.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Valor Monetário do USN</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Cada USN possui um valor monetário definido no contrato. Por exemplo:
              </p>
              <div className="bg-background p-3 rounded border border-border text-center">
                <p className="text-2xl font-bold text-primary">1 USN = R$ 15,00</p>
                <p className="text-xs text-muted-foreground mt-1">
                  (valor exemplificativo, definido contratualmente)
                </p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Exemplo de Cálculo</h3>
              <div className="bg-background p-3 rounded border border-border">
                <p className="text-sm mb-2">Servidor com configuração:</p>
                <ul className="text-sm space-y-1 ml-4 mb-3">
                  <li>• 4 vCPUs → 4 × 10 = 40 USN/mês</li>
                  <li>• 16 GB RAM → 16 × 2 = 32 USN/mês</li>
                  <li>• 500 GB Storage → 50 × 1 = 50 USN/mês</li>
                </ul>
                <div className="border-t border-border pt-2">
                  <p className="text-sm"><strong>Total:</strong> 122 USN/mês</p>
                  <p className="text-sm"><strong>Custo:</strong> 122 × R$ 15,00 = R$ 1.830,00/mês</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gestão de Franquia */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Gestão de Franquia
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O painel de Franquia permite gerenciar pacotes de USN contratados, acompanhar o consumo e 
            controlar franquias disponíveis para diferentes órgãos ou departamentos.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_franquia/ucloud_menu_franquia_002.png" 
              alt="Painel Franquia" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Informações do Painel</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><strong>Franquia Total Contratada:</strong> Quantidade total de USN disponível por mês</li>
                <li><strong>USN Consumido:</strong> Quantidade de USN já utilizada no período</li>
                <li><strong>USN Disponível:</strong> Saldo restante de USN</li>
                <li><strong>Percentual de Utilização:</strong> (Consumido / Total) × 100</li>
                <li><strong>Previsão de Consumo:</strong> Estimativa de consumo até final do mês</li>
                <li><strong>Status da Franquia:</strong> Normal, Atenção, Crítico, Excedente</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Franquias por Órgão</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Em ambientes GOV, a franquia pode ser distribuída entre diferentes órgãos:
              </p>
              <div className="bg-background p-3 rounded border border-border">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Secretaria de Educação</span>
                    <span className="font-semibold">5.000 USN</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Secretaria de Saúde</span>
                    <span className="font-semibold">8.000 USN</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Secretaria de Finanças</span>
                    <span className="font-semibold">3.000 USN</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Outros Órgãos</span>
                    <span className="font-semibold">4.000 USN</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-primary/10 rounded border border-primary">
                    <span className="font-bold">Total Alocado</span>
                    <span className="font-bold text-primary">20.000 USN</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Controle de Excedente</h3>
              <p className="text-sm text-muted-foreground mb-2">
                O sistema permite configurar o comportamento quando a franquia é excedida:
              </p>
              <div className="grid gap-2 mt-2">
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Modo Bloqueio</p>
                  <p className="text-xs text-muted-foreground">
                    Ao atingir 100% da franquia, impede criação de novos recursos até o próximo período.
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Modo Alerta</p>
                  <p className="text-xs text-muted-foreground">
                    Permite ultrapassar a franquia, mas envia alertas aos responsáveis.
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-sm mb-1">Modo Cobrança Excedente</p>
                  <p className="text-xs text-muted-foreground">
                    Permite ultrapassar, com cobrança adicional (geralmente com tarifa majorada).
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Alertas e Notificações</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Configure alertas automáticos em diferentes níveis:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><span className="text-yellow-600 font-semibold">70%:</span> Alerta preventivo para planejamento</li>
                <li><span className="text-orange-600 font-semibold">85%:</span> Alerta de atenção - considerar aumento de franquia</li>
                <li><span className="text-red-600 font-semibold">95%:</span> Alerta crítico - ação urgente necessária</li>
                <li><span className="text-red-800 font-semibold">100%:</span> Franquia esgotada</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_franquia/ucloud_menu_franquia_003.png" 
              alt="Detalhes consumo franquia" 
              className="rounded-lg border border-border max-w-3xl"
            />
          </div>
        </div>
      </div>

      {/* Relatórios de Franquia */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Relatórios de Franquia</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O painel oferece relatórios específicos para análise do consumo de franquia:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Relatório de Consumo por Órgão</h3>
              <p className="text-sm text-muted-foreground">
                Mostra detalhadamente quanto cada órgão/departamento consumiu da sua franquia alocada, 
                permitindo identificar quem está próximo do limite ou ultrapassando.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Histórico de Consumo Mensal</h3>
              <p className="text-sm text-muted-foreground">
                Gráfico mostrando a evolução do consumo de USN nos últimos 6 ou 12 meses, 
                permitindo identificar tendências e sazonalidades.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Projeção de Esgotamento</h3>
              <p className="text-sm text-muted-foreground">
                Baseado no consumo atual, estima em que data a franquia será totalmente consumida, 
                permitindo ações proativas de ajuste.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Detalhamento por Tipo de Recurso</h3>
              <p className="text-sm text-muted-foreground">
                Quebra o consumo de USN por categoria (Compute, Storage, Network), 
                identificando onde está o maior consumo da franquia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ajuste de Franquia */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Ajuste e Redistribuição de Franquia
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Administradores podem ajustar a distribuição de franquia entre órgãos conforme necessidade:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Aumento de Franquia</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Solicitar aumento da franquia total contratada</li>
                <li>Processo geralmente envolve aprovação e aditivo contratual</li>
                <li>Novos valores entram em vigor no próximo período</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Redistribuição Entre Órgãos</h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Transferir USN não utilizados de um órgão para outro</li>
                <li>Requer permissões de administrador</li>
                <li>Pode ser feito durante o mês corrente</li>
                <li>Histórico de transferências é registrado</li>
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Reserva de Emergência</h3>
              <p className="text-sm text-muted-foreground">
                Recomenda-se manter uma reserva de 10-15% da franquia não alocada, 
                para atender demandas urgentes ou imprevistas.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Dica:</strong> Revise a alocação de franquia mensalmente após o fechamento, 
              ajustando para o próximo mês baseado no consumo real observado.
            </p>
          </div>
        </div>
      </div>

      {/* Diferenças entre Franquia e Budget */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Franquia vs Budget: Qual a Diferença?</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border-2 border-purple-500 bg-purple-50 dark:bg-purple-950/30">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">Franquia (USN)</h3>
              <ul className="list-disc list-inside text-sm space-y-2 text-purple-800 dark:text-purple-200">
                <li><strong>Medida:</strong> Unidades de Serviço (USN)</li>
                <li><strong>Conversão:</strong> Recursos → USN → R$</li>
                <li><strong>Controle:</strong> Quantidade de recursos consumíveis</li>
                <li><strong>Uso:</strong> Específico para GOV/ETICE</li>
                <li><strong>Bloqueio:</strong> Pode impedir criação de recursos</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-950/30">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">Budget (Orçamento)</h3>
              <ul className="list-disc list-inside text-sm space-y-2 text-green-800 dark:text-green-200">
                <li><strong>Medida:</strong> Valores monetários (R$, US$)</li>
                <li><strong>Conversão:</strong> Recursos → R$ diretamente</li>
                <li><strong>Controle:</strong> Limite de gastos financeiros</li>
                <li><strong>Uso:</strong> Todos os tipos de contrato</li>
                <li><strong>Bloqueio:</strong> Apenas alertas, não bloqueia</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200">
              <strong>Nota:</strong> Em contratos GOV/ETICE, é possível usar simultaneamente Franquia (para controle de USN) 
              e Budget (para controle financeiro), oferecendo dupla camada de governança.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
