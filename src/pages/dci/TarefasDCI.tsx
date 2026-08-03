import { ArrowLeft, CheckSquare, CheckCircle2, Info, Search, RefreshCw, AlertCircle, Clock, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const taskColumns = [
  { name: "Operação", description: "Tipo de operação realizada" },
  { name: "ID do pedido", description: "Identificador único do pedido" },
  { name: "Designação", description: "Nome/identificador do recurso" },
  { name: "Razão social", description: "Nome da empresa" },
  { name: "Autor", description: "Usuário que executou a ação" },
  { name: "Erro", description: "Descrição do erro (se houver)" },
  { name: "Progresso", description: "Percentual de conclusão" },
  { name: "Data de início", description: "Quando a tarefa iniciou" },
  { name: "Duração", description: "Tempo de execução" },
  { name: "Status", description: "Estado atual da tarefa" },
  { name: "Ação", description: "Opções disponíveis" }
];

const taskStatus = [
  { 
    status: "Sucesso", 
    color: "bg-green-500", 
    textColor: "text-green-700 dark:text-green-300",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    description: "A operação foi concluída com sucesso" 
  },
  { 
    status: "Falha", 
    color: "bg-red-500", 
    textColor: "text-red-700 dark:text-red-300",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    description: "Ocorreu algum problema durante a operação - verifique a coluna 'Erro'" 
  },
  { 
    status: "Aprovada", 
    color: "bg-green-500", 
    textColor: "text-green-700 dark:text-green-300",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    description: "Operação ocorreu com sucesso, mas depende de ação do usuário" 
  }
];

const taskTabs = [
  { name: "Tarefas", icon: CheckSquare, description: "Lista de todas as tarefas executadas" },
  { name: "Aprovações pendentes", icon: Clock, description: "Tarefas aguardando aprovação" },
  { name: "Tarefas agendadas", icon: Clock, description: "Tarefas programadas para execução futura" }
];

export default function TarefasDCI() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/dci")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('dci.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <CheckSquare className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('dci.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t('dci.tasks')}</h1>
          <p className="mt-1 text-muted-foreground">
            Acompanhamento de operações e tarefas realizadas na plataforma.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Painel de Tarefas</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Na aba de tarefas é possível acompanhar <strong>todas as operações</strong> realizadas 
          dentro da plataforma. Esta tela é importante para acompanhar o andamento dos pedidos 
          realizados na plataforma.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/dci/010_menu_tarefas.png" 
            alt="Menu Tarefas" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Painel de Tarefas do DCI</p>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Funcionalidades</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Este menu possibilita visualizar quaisquer casos de erro, acompanhar o status dos 
          pedidos e cancelar algumas operações.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-6">
          <img 
            src="/images/dci/011_recorte_menu_tarefas.png" 
            alt="Cabeçalho Tarefas" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Barra de ferramentas das Tarefas</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <Search className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground text-sm">Pesquisa</span>
              <p className="text-xs text-muted-foreground">Campo que facilita encontrar as informações com agilidade</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <RefreshCw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground text-sm">Refresh</span>
              <p className="text-xs text-muted-foreground">Permite atualizar a página com apenas um clique</p>
            </div>
          </div>
        </div>
      </section>

      {/* Abas */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Abas de Categorização</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          As tarefas são apresentadas em formato de lista, categorizadas em abas.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-6">
          <img 
            src="/images/dci/012_menu_tarefas_abas_listas.png" 
            alt="Abas de Tarefas" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Abas e lista de tarefas</p>
        </div>
        <div className="grid gap-3">
          {taskTabs.map(({ name, icon: Icon, description }) => (
            <div key={name} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-foreground text-sm">{name}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Colunas */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Colunas de Informação</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A aba "Tarefas" exibe onze tipos de informações divididas em colunas:
        </p>
        <div className="grid gap-2 md:grid-cols-2">
          {taskColumns.map(({ name, description }) => (
            <div key={name} className="flex items-start gap-2 p-2 bg-muted/20 rounded">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-medium text-foreground">{name}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Status */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Status das Tarefas</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A coluna status mostra três estados distintos, cada um com um objetivo de direcionar 
          a ação de acompanhamento:
        </p>
        <div className="space-y-4">
          {taskStatus.map(({ status, color, textColor, bgColor, description }) => (
            <div key={status} className={`flex items-start gap-3 p-4 ${bgColor} rounded-lg`}>
              <span className={`h-3 w-3 rounded-full ${color} shrink-0 mt-1.5`}></span>
              <div>
                <span className={`font-semibold text-sm ${textColor}`}>Status de {status}</span>
                <p className={`text-sm ${textColor}`}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Casos de Status Aprovada */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Casos de Status "Aprovada"</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O status "Aprovada" significa que a operação ocorreu com sucesso, porém depende de 
          alguma ação do usuário, seja ele o "admin" ou "user":
        </p>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0 mt-1" />
            <span>
              <strong>Primeira Venda:</strong> Fica pendente ao usuário a confirmação do 
              Golden Jumper de ambas as portas.
            </span>
          </li>
          <li className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0 mt-1" />
            <span>
              <strong>Venda subsequente de portas:</strong> Fica pendente o Golden Jumper 
              da porta em questão.
            </span>
          </li>
        </ul>
      </section>

      {/* Nota sobre erros */}
      <section className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 p-6">
        <div className="flex items-start gap-3">
          <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-1">Status de Falha</h3>
            <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
              Quando uma tarefa apresenta status de Falha (vermelho), significa que ocorreu 
              algum problema durante a operação. Na própria tarefa falhada é possível constatar 
              qual é o motivo da irregularidade através da coluna "Erro".
            </p>
          </div>
        </div>
      </section>

      {/* Nota geral */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Importante</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              O ícone de notificação (sino) no topo da tela é um ponto relevante para a 
              visualização de todas as atividades realizadas no portal. Através dele é possível 
              observar as ações mais recentes refletidas em forma de notificação.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
