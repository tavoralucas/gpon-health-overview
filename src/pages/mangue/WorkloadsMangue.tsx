import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Boxes, CheckCircle2, Server, Layers, RefreshCw, PlayCircle, AlertTriangle, Settings, BarChart3, Info, Trash2, Edit, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";

const workloadTypes = [
  {
    title: "Deployments",
    icon: Layers,
    description: "Gerencia a implantação e atualização de aplicações."
  },
  {
    title: "DaemonSets",
    icon: Server,
    description: "Garante que uma cópia do pod rode em cada node."
  },
  {
    title: "PODs",
    icon: Boxes,
    description: "Menor unidade deployável no Kubernetes."
  },
  {
    title: "Horizontal Autoscaler",
    icon: Scale,
    description: "Escalonamento automático baseado em métricas."
  },
  {
    title: "StatefulSets",
    icon: Settings,
    description: "Para aplicações que requerem identidade persistente."
  },
  {
    title: "Updates",
    icon: RefreshCw,
    description: "Gerenciamento de atualizações de workloads."
  }
];

export default function WorkloadsMangue() {
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
          <Boxes className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('mangue.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Workloads</h1>
          <p className="mt-1 text-muted-foreground">
            Gerenciamento de cargas de trabalho no cluster Kubernetes.
          </p>
        </div>
      </div>

      {/* Tipos de Workloads */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Tipos de Workloads</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {workloadTypes.map(({ title, icon: Icon, description }) => (
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

      {/* Deployments */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Deployments</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Um <strong>Deployment</strong> fornece atualizações declarativas para Pods e ReplicaSets. 
          Esta tela apresenta uma lista de todos os Deployments existentes no cluster/namespace selecionado, 
          permitindo gerenciar o ciclo de vida das aplicações.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/009_mangue_workload_deployment.png" 
            alt="Lista de Deployments" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Deployments</p>
        </div>

        <h3 className="font-semibold text-foreground mb-3">Ações disponíveis</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <Edit className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Editar:</strong> Modifica a quantidade de réplicas do Deployment</span>
          </li>
          <li className="flex items-start gap-2">
            <RefreshCw className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Restart:</strong> Reinicia todos os pods do Deployment</span>
          </li>
          <li className="flex items-start gap-2">
            <Trash2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Deletar:</strong> Remove o Deployment do cluster</span>
          </li>
        </ul>
      </section>

      {/* Detalhes do Deployment */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Detalhes do Deployment</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Clicando no nome de um Deployment, você acessa informações detalhadas como pods, 
          eventos, configurações e métricas de recursos.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/014_mangue_workload_detalhe.png" 
              alt="Detalhes do Deployment" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">{t('common.overview')}</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/015_mangue_workload_pods.png" 
              alt="Lista de Pods" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Pods do Deployment</p>
          </div>
        </div>
      </section>

      {/* DaemonSets */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">DaemonSets</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Um <strong>DaemonSet</strong> garante que todos os Nodes executem uma cópia de um Pod. 
          Conforme novos Nodes são adicionados ao cluster, Pods são automaticamente adicionados.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/020_mangue_workload_daemonset.png" 
            alt="Lista de DaemonSets" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de DaemonSets</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Ideal para agents de coleta de logs (Fluentd, Logstash)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Monitoramento de nodes (Prometheus Node Exporter)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Network plugins e storage drivers</span>
          </li>
        </ul>
      </section>

      {/* PODs */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Boxes className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">PODs</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Pods</strong> são a menor unidade computacional que pode ser criada e gerenciada no Kubernetes. 
          Um Pod encapsula um ou mais containers, recursos de armazenamento, um IP de rede único e opções 
          que governam como os containers devem rodar.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/030_mangue_workload_pods.png" 
            alt="Lista de PODs" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de PODs</p>
        </div>

        <h3 className="font-semibold text-foreground mb-3">Status dos PODs</h3>
        <div className="grid gap-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="text-sm"><strong>Running:</strong> Pod está executando normalmente</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="text-sm"><strong>Pending:</strong> Aguardando recursos ou scheduling</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="text-sm"><strong>Failed:</strong> Algum container falhou</span>
          </div>
        </div>
      </section>

      {/* Detalhes do POD */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Detalhes do POD</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Ao clicar em um POD na listagem, é apresentada a tela de detalhes com informações 
          completas sobre containers, logs, recursos e eventos.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/031_mangue_workload_pod_detalhe.png" 
              alt="Detalhes do POD" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Informações do POD</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/033_mangue_workload_pod_logs.png" 
              alt="Logs do POD" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Logs do Container</p>
          </div>
        </div>
      </section>

      {/* Horizontal Autoscaler */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Scale className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Horizontal Pod Autoscaler</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O <strong>Horizontal Pod Autoscaler</strong> ajusta automaticamente o número de réplicas 
          de um deployment baseado em métricas como utilização de CPU ou memória.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/040_mangue_workload_hpa.png" 
            alt="Horizontal Autoscaler" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de HPAs</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <BarChart3 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Mínimo:</strong> Número mínimo de réplicas</span>
          </li>
          <li className="flex items-start gap-2">
            <BarChart3 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Máximo:</strong> Número máximo de réplicas</span>
          </li>
          <li className="flex items-start gap-2">
            <BarChart3 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Target:</strong> Percentual de utilização alvo</span>
          </li>
        </ul>
      </section>

      {/* StatefulSets */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">StatefulSets</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>StatefulSets</strong> são usados para aplicações que requerem uma ou mais das seguintes 
          características: identidade de rede estável, storage persistente ordenado, 
          deployment e scaling ordenados.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/045_mangue_workload_statefulset.png" 
            alt="StatefulSets" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de StatefulSets</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Ideal para bancos de dados (MongoDB, PostgreSQL, MySQL)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Sistemas de mensageria (Kafka, RabbitMQ)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Aplicações que necessitam de storage persistente</span>
          </li>
        </ul>
      </section>

      {/* Updates */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <RefreshCw className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Updates (Atualizações)</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A plataforma permite gerenciar atualizações de Deployments, com suporte a 
          rolling updates e rollbacks de forma visual e intuitiva.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/050_mangue_workload_updates.png" 
            alt="Updates" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Histórico de Atualizações</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <PlayCircle className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Rolling Update:</strong> Atualização gradual sem downtime</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-1" />
            <span><strong>Rollback:</strong> Reverter para versão anterior</span>
          </li>
        </ul>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Importante</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              A plataforma exibe apenas os workloads do cluster e namespace atualmente selecionados. 
              Para visualizar workloads de outros ambientes, altere a seleção nos filtros de cluster 
              e namespace no topo da página.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

