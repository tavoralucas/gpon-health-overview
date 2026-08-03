import { ArrowLeft, BarChart2, RefreshCw, X, Info, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";


export default function ConsolidadoFaturamentoCostManagement() {
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
          <BarChart2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('costManagement.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Consolidado de Faturamento</h1>
          <p className="mt-1 text-muted-foreground">
            Histórico centralizado de faturas com controle de ciclo de vida, detalhes inline e navegação para o módulo Financeiro
          </p>
        </div>
      </div>

      {/* Visão Geral */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t("common.overview")}</h2>
        <p className="text-muted-foreground mb-3">
          O Consolidado de Faturamento centraliza o histórico de faturas de todos os contratos de um usuário,
          permitindo consulta, visualização detalhada, controle de ciclo de vida (abertura e fechamento) e acesso
          rápido aos detalhes financeiros por fatura.
        </p>
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Clientes com múltiplos contratos e provedores podem, a partir de um ponto único, consultar e monitorar todas as faturas consolidadas por período.
          </p>
        </div>
      </section>

      <img
        src={consolidadoFaturamentoTela}
        alt="Tela do Consolidado de Faturamento mostrando seleção de contrato, período e tabela de faturas"
        className="w-full h-auto"
        style={{ borderRadius: "8px" }}
      />

      {/* Filtros */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Filtros</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Lista de Contratos</h3>
            <p className="text-sm text-muted-foreground">
              Dropdown multiselect com checkbox e campo de busca.
              Inclui opção <strong>"Selecionar todos"</strong> como primeiro item, para cenários em que tem mais de um disponível.
              O contrato global da sessão é pré-selecionado por padrão.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Período</h3>
            <p className="text-sm text-muted-foreground">
              Seletor de intervalo de meses. Formato exibido: <code className="bg-muted px-1 rounded text-xs">MM/YYYY até MM/YYYY</code>.
              O botão "Buscar" fica <strong>desabilitado</strong> enquanto o período não estiver selecionado.
            </p>
          </div>
        </div>
      </section>

      {/* Tabela */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Tabela de Faturas</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-3 font-semibold text-foreground">Coluna</th>
                <th className="text-left py-2 font-semibold text-foreground">Descrição</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["Contrato", "Valor total em R$ (Moeda do Provedor) com 2 casas decimais"],
                ["Período", "Intervalo de datas de consumo — DD/MM/YYYY HH:MM:SS - DD/MM/YYYY HH:MM:SS"],
                ["Faturamento", "Competência/mês de faturamento — MM/YYYY"],
                ["Fechamento", "Data e hora do fechamento. Vazio + tooltip se fatura em aberto"],
                ["Status", "Badge colorido: Fechada (verde) ou Aberta"],
                ["Preço", "Valor total em R$ com 2 casas decimais"],
                ["Preço em Dólar ($)", "Valor equivalente em USD"],
                ["Ações", "2 ou 3 ícones conforme status da fatura"],
              ].map(([col, desc]) => (
                <tr key={col} className="border-b border-border/50">
                  <td className="py-2 pr-3 font-medium whitespace-nowrap">{col}</td>
                  <td className="py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800 text-sm">
          <p className="text-amber-800 dark:text-amber-200">
            <strong>Competência vs. Período:</strong> A fatura de competência <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">01/2026</code> cobre o período
            <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">01/12/2025 - 31/12/2025</code> — a competência é deslocada 1 mês em relação ao período de consumo.
          </p>
        </div>
      </section>

      {/* Ações por Linha */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Ações por Linha</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-foreground">Reabrir Fatura</h3>
            </div>
            <p className="text-sm text-muted-foreground">Disponível para faturas <strong>Fechadas</strong>. Reabre a fatura e altera o status para Aberta.</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <X className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-foreground">Fechar Fatura</h3>
            </div>
            <p className="text-sm text-muted-foreground">Disponível para faturas <strong>Abertas</strong>. Fecha a fatura e registra a data/hora de fechamento.</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-foreground">Ver Detalhes</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Abre módulo de 'Financeiro' com parâmetros da fatura pré-carregados (mês, ano). Disponível para todas as faturas.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-foreground">Em Tela</h3>
            </div>
            <p className="text-sm text-muted-foreground">Abre modal <strong>"Detalhes Financeiros"</strong> em linha sem sair da tela atual. Disponível para todas as faturas.</p>
          </div>
        </div>
      </section>

      {/* Modal Detalhes Financeiros */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Modal "Detalhes Financeiros"</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>Exibido ao clicar em "Em Tela". Suporta minimização e fechamento por botão ×.</p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-1">Tipo de visualização</h3>
              <p className="text-sm"><strong>Recurso</strong>: agrupa por serviço/produto (ex: Amazon EC2, AWS Lambda)</p>
              <p className="text-sm mt-1"><strong>Grupo</strong>: agrupa por grupos de contas da plataforma</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-1">Tabela do Modal</h3>
              <p className="text-sm">Colunas: Recurso | Total (USD) | Total (R$)</p>
              <p className="text-sm mt-1">Hierarquia expansível por conta com botão ▼/▶.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fluxos Principais */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Fluxos Principais</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Fluxo 1 — Consulta de Faturas</h3>
            <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside ml-2">
              <li>Selecionar um ou mais contratos no dropdown multiselect</li>
              <li>Definir período de consulta (mês início → mês fim)</li>
              <li>Clicar em "Buscar" → sistema retorna tabela de faturas com totalizador</li>
            </ol>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Fluxo 2 — Ver Detalhes Completos</h3>
            <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside ml-2">
              <li>Clicar no ícone ℹ️ de uma linha → navega para <code className="bg-muted px-1 rounded text-xs">/billing/financial</code></li>
              <li>Tela Financeiro exibe consumo total, grupos, gráficos e produtos</li>
              <li>Botão {"<"} no header retorna ao Consolidado com os filtros preservados</li>
            </ol>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Fluxo 3 — Fechamento / Reabertura</h3>
            <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside ml-2">
              <li>Localizar fatura com status desejado na tabela</li>
              <li>Clicar no ícone correspondente (✕ Fechar ou 🔄 Reabrir)</li>
              <li>Status é atualizado na tabela; data de fechamento é registrada/removida</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Paginação */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Paginação e Formatos</h2>
        <div className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground mb-1">Itens por página</p>
            <p>Opções: 5, 10 (padrão), 20, 50, 100. Contador: <em>Mostrando X - Y de Z resultados</em></p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">Formatos de Moeda</p>
            <p>BRL: <code className="bg-muted px-1 rounded">R$ X.XXX,XX</code> · USD: <code className="bg-muted px-1 rounded">$X,XXX.XX</code></p>
          </div>
        </div>
      </section>
    </div>
  );
}
