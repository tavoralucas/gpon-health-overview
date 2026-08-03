import { ArrowLeft, Clock, Play, CheckCircle2, Info, Calendar, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const taskTypes = [
  {
    title: "Jobs",
    icon: Play,
    description: "Execução de tarefas únicas até a conclusão."
  },
  {
    title: "CronJobs",
    icon: Calendar,
    description: "Tarefas agendadas para execução periódica."
  }
];

export default function TarefasMangue() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/mangue")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('mangue.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <Clock className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('mangue.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t('mangue.tasks')}</h1>
          <p className="mt-1 text-muted-foreground">
            {t('mangue.tasks')}
          </p>
        </div>
      </div>

      {/* Tipos de Tarefas */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Tipos de Tarefas</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {taskTypes.map(({ title, icon: Icon, description }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Play className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Jobs</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Um <strong>Job</strong> cria um ou mais pods e garante que um número específico deles termine 
          com sucesso. Quando o número especificado de conclusões com sucesso é atingido, a tarefa é considerada completa.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/082_mangue_catalog_job.png" 
            alt="Lista de Jobs" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Jobs</p>
        </div>

        <h3 className="font-semibold text-foreground mb-3">Características dos Jobs</h3>
        <ul className="space-y-2 text-sm text-muted-foreground mb-6">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Completions:</strong> Número de vezes que o Job deve completar com sucesso</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Parallelism:</strong> Número de pods executados em paralelo</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Backoff Limit:</strong> Número de tentativas antes de considerar o Job falho</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Active Deadline:</strong> Tempo limite para conclusão do Job</span>
          </li>
        </ul>
      </section>

      {/* CronJobs */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">CronJobs</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>CronJobs</strong> permitem o agendamento de Jobs para execução em horários específicos, 
          similar ao cron do Unix. São ideais para backups, relatórios e outras tarefas recorrentes.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/083_mangue_catalog_cronjob.png" 
            alt="Lista de CronJobs" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de CronJobs</p>
        </div>

        <h3 className="font-semibold text-foreground mb-3">Formato do Schedule</h3>
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <code className="text-sm font-mono text-foreground">
            ┌───────────── minuto (0 - 59)<br/>
            │ ┌───────────── hora (0 - 23)<br/>
            │ │ ┌───────────── dia do mês (1 - 31)<br/>
            │ │ │ ┌───────────── mês (1 - 12)<br/>
            │ │ │ │ ┌───────────── dia da semana (0 - 6)<br/>
            │ │ │ │ │<br/>
            * * * * *
          </code>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
            <code className="text-primary font-mono text-xs">*/5 * * * *</code>
            <span>A cada 5 minutos</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
            <code className="text-primary font-mono text-xs">0 * * * *</code>
            <span>A cada hora</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
            <code className="text-primary font-mono text-xs">0 0 * * *</code>
            <span>Diariamente à meia-noite</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
            <code className="text-primary font-mono text-xs">0 0 * * 0</code>
            <span>Semanalmente (domingo)</span>
          </div>
        </div>
      </section>

      {/* Criar Job */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Criar Job</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Ao criar um novo Job, configure os parâmetros da tarefa e selecione a imagem do container a ser executado.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/084_mangue_catalog_create_job.png" 
            alt="Criar Job" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Formulário de criação de Job</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Nome:</strong> Identificador único do Job</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Imagem:</strong> Container image a ser executada</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Comando:</strong> Comando a ser executado (opcional)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Recursos:</strong> Limites de CPU e memória</span>
          </li>
        </ul>
      </section>

      {/* Criar CronJob */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Criar CronJob</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Configure o agendamento e os parâmetros do CronJob para execução periódica.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/085_mangue_criar_cronjob.png" 
            alt="Criar CronJob" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Formulário de criação de CronJob</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Schedule:</strong> Expressão cron para agendamento</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Concurrency Policy:</strong> Allow, Forbid ou Replace</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Suspend:</strong> Suspender execuções futuras</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>History Limits:</strong> Número de jobs concluídos/falhos a manter</span>
          </li>
        </ul>
      </section>

      {/* Status */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Timer className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Monitoramento de Status</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Acompanhe o status de execução dos Jobs e CronJobs, com informações detalhadas sobre cada execução.
        </p>
        <div className="grid gap-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="text-sm"><strong>Succeeded:</strong> Job executado com sucesso</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
            <span className="text-sm"><strong>Running:</strong> Job em execução</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="text-sm"><strong>Failed:</strong> Job falhou após tentativas</span>
          </div>
        </div>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Casos de Uso</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Utilize Jobs para tarefas pontuais como migrações de banco de dados, processamento de lotes ou 
              execução de scripts. CronJobs são ideais para backups automáticos, limpeza de logs, envio de 
              relatórios periódicos e outras tarefas recorrentes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
