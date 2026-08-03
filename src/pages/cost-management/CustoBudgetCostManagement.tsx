import { ArrowLeft, Wallet, PlusCircle, Edit, Trash2, Star, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import custoBudgetTela from "@/assets/custo-budget-tela.png";
import criarNovoBudgetTela from "@/assets/criar-novo-budget-tela.png";
import editarBudgetTela from "@/assets/editar-budget-tela.png";
import excluirBudgetModal from "@/assets/excluir-budget-modal.png";
import painelResumoBudget from "@/assets/painel-resumo-budget.png";
import recorrenciaAlertasBudget from "@/assets/recorrencia-alertas-budget.png";

export default function CustoBudgetCostManagement() {
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
          <Wallet className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('costManagement.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Custo de Budget</h1>
          <p className="mt-1 text-muted-foreground">
            Defina e acompanhe o orçamento em tempo real, comparando com o consumo
          </p>
        </div>
      </div>

      {/* Visão Geral */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t("common.overview")}</h2>
        <p className="text-muted-foreground mb-3">
          O Custo de Budget permite que gestores financeiros e de tecnologia definam orçamentos para contratos
          de cloud e acompanhem o consumo em tempo real comparado com o valor planejado. O sistema emite sinais
          visuais de alerta quando o consumo se aproxima ou ultrapassa os limites estabelecidos.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { label: "Gestor Financeiro", desc: "Define orçamentos mensais/trimestrais e monitora aderência." },
            { label: "Cloud Manager / Gestor de TI", desc: "Acompanha consumo por Account Provider e budget aprovado." },
            { label: "Operador de Faturamento", desc: "Configura os budgets e recebe alertas por e-mail." },
          ].map(({ label, desc }) => (
            <div key={label} className="p-3 rounded-lg border border-border bg-muted/50">
              <p className="font-semibold text-foreground text-sm">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <figure className="rounded-xl border border-border bg-card p-3 shadow-sm">
        <img
          src={custoBudgetTela}
          alt="Tela de Custo de Budget"
          className="w-full rounded-lg border border-border"
        />
        <figcaption className="text-xs text-muted-foreground mt-2 text-center">
          Tela de Custo de Budget — seleção de contrato e listagem de budgets
        </figcaption>
      </figure>

      {/* Sistema de Semáforo */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Sistema de Semáforo: Níveis de Consumo</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="p-4 rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800">
            <p className="font-semibold text-green-800 dark:text-green-200">Nível Seguro 🟢</p>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">% Consumido ≤ 49%</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Consumo dentro do esperado</p>
          </div>
          <div className="p-4 rounded-lg border border-orange-200 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-800">
            <p className="font-semibold text-orange-800 dark:text-orange-200">Nível de Atenção 🟠</p>
            <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">% Consumido entre 50% e 89%</p>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Consumo se aproximando do limite</p>
          </div>
          <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800">
            <p className="font-semibold text-red-800 dark:text-red-200">Nível Crítico 🔴</p>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">% Consumido ≥ 90% (pode ultrapassar 100%)</p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">Risco de estouro do orçamento</p>
          </div>
        </div>
        <div className="mt-3 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800 text-sm">
          <p className="text-amber-800 dark:text-amber-200">
            O sistema <strong>não impede</strong> que o consumo ultrapasse o valor total — apenas sinaliza visualmente.
            O % pode ultrapassar 100% (ex: 3.843.887,22% observado em produção).
          </p>
        </div>
      </section>

      {/* Tabela de Budgets */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Tabela de Budgets</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-3 font-semibold text-foreground">Coluna</th>
                <th className="text-left py-2 font-semibold text-foreground">Descrição</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["Fav.", "Ícone de estrela — vazia = não favoritado; dourada preenchida = favoritado"],
                ["Nome", "Nome do budget definido pelo usuário"],
                ["Alertas", "Ícones notifications (inativo) e repeat (não recorrente)"],
                ["Intervalo", "Mensal, Trimestral, Semestral, Anual ou --- (sem recorrência)"],
                ["Início", "Mês/Ano de início no formato MM/AAAA"],
                ["Valor Total", "Valor orçado total em R$"],
                ["Consumido", "Valor efetivamente consumido em R$"],
                ["% Consumido", "Percentual do valor total já consumido (com cor do semáforo)"],
                ["Ações", "Ícones de editar (lápis) e excluir (lixeira)"],
              ].map(([col, desc]) => (
                <tr key={col} className="border-b border-border/50">
                  <td className="py-2 pr-3 font-medium whitespace-nowrap">{col}</td>
                  <td className="py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Fórmula: <code className="bg-muted px-1 rounded">% Consumido = (Valor Consumido / Valor Total) × 100</code>. Paginação: 5, 10 (padrão), 20, 50, 100 itens.
        </p>
      </section>

      {/* CRUD */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Como definir novos Budgets?</h2>

        <div className="space-y-4">
          {/* CREATE */}
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <PlusCircle className="h-4 w-4 text-green-600" />
              <h3 className="font-semibold text-foreground">Criando um novo Budget</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Formulário dividido em 3 seções + painel lateral de Resumo.</p>
            <div className="grid gap-3 md:grid-cols-3 text-sm">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-semibold text-foreground mb-1">Informações Gerais</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Nome do Budget (obrigatório)</li>
                  <li>• Período (Mensal/Trimestral/Semestral/Anual)</li>
                  <li>• Data de Início</li>
                  <li>• Forma de cobrança (Por custo / Por quantidade)</li>
                  <li>• Valor Total (obrigatório)</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-semibold text-foreground mb-1">Alocação de Budget</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Especificação: Account Provider, Conta Master, Nuvem, Dimension, Tag</li>
                  <li>• Valor de Alocação por provider</li>
                  <li>• Botão "Alocar Budget" — habilita com valor {'>'} R$ 0</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-semibold text-foreground mb-1">Recorrência e Alertas</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Ativar sistema de alerta de rotina (e-mail)</li>
                  <li>• Budget recorrente (criação automática ao final de cada período)</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-200 dark:border-red-800 text-sm">
              <p className="text-red-800 dark:text-red-200">
                <strong>Regra Obrigatória:</strong> O botão "Salvar Budget" só fica habilitado quando o
                <strong> Saldo = R$ 0,00</strong> (Valor Total = Valor Alocado). O usuário deve distribuir todo o
                valor antes de salvar. A <strong>Forma de cobrança é bloqueada</strong> após a primeira alocação.
              </p>
            </div>
            <figure className="mt-4">
              <img
                src={criarNovoBudgetTela}
                alt="Tela de criação de novo Budget"
                className="w-full rounded-lg border border-border"
              />
              <figcaption className="text-xs text-muted-foreground mt-2 text-center">
                Tela "Criar novo Budget" — informações gerais, alocação e painel de resumo
              </figcaption>
            </figure>
          </div>

          {/* UPDATE */}
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Edit className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-foreground">Editando um Budget</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Mesmo formulário de criação com dados pré-carregados. Botão "Editar Budget" em vez de "Salvar Budget".
              A mesma regra Saldo = R$ 0,00 se aplica. Toast de sucesso: <em>"Budget editado com sucesso!"</em>
            </p>
            <figure className="mt-4">
              <img
                src={editarBudgetTela}
                alt="Tela de edição de Budget"
                className="w-full rounded-lg border border-border"
              />
              <figcaption className="text-xs text-muted-foreground mt-2 text-center">
                Tela "Editar Budget" — dados pré-carregados com alocações existentes
              </figcaption>
            </figure>
          </div>

          {/* DELETE */}
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trash2 className="h-4 w-4 text-red-600" />
              <h3 className="font-semibold text-foreground">Excluindo um Budget</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Modal de confirmação com mensagem: <em>"Esta ação não poderá ser desfeita. Tem certeza que deseja excluir este budget?"</em>
              A exclusão é <strong>permanente e imediata</strong> — não há arquivamento.
            </p>
            <figure className="mt-4 max-w-2xl mx-auto">
              <img
                src={excluirBudgetModal}
                alt="Modal de exclusão de Budget"
                className="w-full rounded-lg border border-border"
              />
              <figcaption className="text-xs text-muted-foreground mt-2 text-center">
                Modal de confirmação ao excluir um Budget
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Painel Resumo */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Painel de Resumo (em tempo real)</h2>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <div className="space-y-3 text-sm">
            {[
              { label: "Contrato", desc: "Campo Lista de contratos" },
              { label: "Nome", desc: "Exibe --- quando vazio" },
              { label: "Valor Total", desc: "Atualizado ao digitar" },
              { label: "Valor Alocado", desc: "Soma das alocações adicionadas" },
              { label: "Saldo", desc: "Verde quando positivo. Deve ser R$ 0,00 para salvar." },
            ].map(({ label, desc }) => (
              <div key={label} className="p-3 rounded-lg border border-border bg-muted/50">
                <p className="font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
              </div>
            ))}
          </div>
          <figure>
            <img
              src={painelResumoBudget}
              alt="Painel de Resumo do Budget"
              className="w-full rounded-lg border border-border"
            />
            <figcaption className="text-xs text-muted-foreground mt-2 text-center">
              Painel de Resumo exibido durante a criação/edição do Budget
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Alertas e Favoritos */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Alertas e Favoritos</h2>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Sistema de Alertas</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ao ativar <strong>"Alerta de rotina"</strong>, uma rotina automática monitora o budget e envia alertas
                por e-mail. O ícone <code className="bg-muted px-1 rounded text-xs">notifications</code> na tabela
                indica que o alerta está inativo para aquele budget.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Favoritos</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Cada budget possui estrela clicável: <strong>vazia</strong> = não favoritado;
                <strong> dourada preenchida</strong> = favoritado. A ação é instantânea, sem confirmação.
              </p>
            </div>
          </div>
          <figure>
            <img
              src={recorrenciaAlertasBudget}
              alt="Painel de Recorrência e Alertas"
              className="w-full rounded-lg border border-border"
            />
            <figcaption className="text-xs text-muted-foreground mt-2 text-center">
              Configuração de alertas por e-mail e recorrência do Budget
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Fluxo Completo */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Fluxo Completo: Criação de Budget</h2>
        <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside ml-2">
          <li>Selecionar contrato e período → clicar "Buscar"</li>
          <li>Clicar em "Novo Budget" → navegação para o formulário de criação</li>
          <li>Preencher Nome do Budget → Resumo atualiza em tempo real</li>
          <li>Selecionar Período (Mensal/Trimestral/Semestral/Anual) e Data de Início</li>
          <li>Selecionar Forma de cobrança e preencher Valor Total</li>
          <li>Na seção Alocação: selecionar Especificação → selecionar provider → preencher valor → clicar "Alocar Budget"</li>
          <li>Repetir alocações até Saldo = R$ 0,00</li>
          <li>Configurar Recorrência e Alertas se desejado</li>
          <li>Botão "Salvar Budget" fica ativo quando Saldo = R$ 0,00 → toast de sucesso</li>
        </ol>
      </section>
    </div>
  );
}