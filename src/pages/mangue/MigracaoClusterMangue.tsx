import { ArrowLeft, ArrowRightLeft, CheckCircle2, Info, Package, Server, Boxes } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const migrationSteps = [
  {
    step: 1,
    title: "Selecionar Cluster de Origem",
    description: "Escolha o cluster onde os workloads estão atualmente."
  },
  {
    step: 2,
    title: "Selecionar Workloads",
    description: "Selecione os deployments e aplicações a serem migrados."
  },
  {
    step: 3,
    title: "Selecionar Cluster de Destino",
    description: "Escolha o cluster de destino para a migração."
  },
  {
    step: 4,
    title: "Configurar Namespace",
    description: "Defina o namespace de destino para os workloads."
  },
  {
    step: 5,
    title: "Revisar e Confirmar",
    description: "Revise as configurações e inicie a migração."
  }
];

export default function MigracaoClusterMangue() {
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
          <ArrowRightLeft className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('mangue.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t('mangue.clusterMigration')}</h1>
          <p className="mt-1 text-muted-foreground">
            {t('mangue.clusterMigration')}
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('common.overview')}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A plataforma Mangue.io permite a <strong>migração de workloads entre clusters Kubernetes</strong>, 
          facilitando a movimentação de aplicações entre ambientes de desenvolvimento, homologação e produção, 
          ou entre diferentes provedores de cloud.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/184_mangue_migracao_visao_geral.png" 
            alt="Visão geral da migração" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Menu de Migração de Cluster</p>
        </div>
      </section>

      {/* Etapas da Migração */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Processo de Migração</h2>
        <div className="space-y-4">
          {migrationSteps.map(({ step, title, description }) => (
            <div key={step} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                {step}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selecionar Workloads */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Seleção de Workloads</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Na etapa de seleção, escolha os deployments, statefulsets e outros recursos que deseja migrar. 
          A plataforma exibe uma lista de todos os workloads disponíveis no cluster de origem.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/185_mangue_migracao_workloads.png" 
            alt="Seleção de Workloads" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Seleção de Workloads para Migração</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Selecione múltiplos workloads de uma vez</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Filtre por namespace para encontrar recursos específicos</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Visualize detalhes de cada workload antes de selecionar</span>
          </li>
        </ul>
      </section>

      {/* Cluster de Destino */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Cluster de Destino</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Selecione o cluster Kubernetes de destino onde os workloads serão implantados. 
          A plataforma lista todos os clusters integrados ao Mangue.io.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/186_mangue_migracao_cluster_destino.png" 
            alt="Cluster de Destino" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Seleção do Cluster de Destino</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Clusters multi-cloud (AWS, Azure, GCP, on-premise)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Verificação de compatibilidade de recursos</span>
          </li>
        </ul>
      </section>

      {/* Namespace de Destino */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Boxes className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Namespace de Destino</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Configure o namespace de destino para os workloads migrados. Você pode manter o mesmo namespace 
          ou escolher um diferente no cluster de destino.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/187_mangue_migracao_namespace.png" 
            alt="Namespace de Destino" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Configuração do Namespace</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Criar novo namespace ou usar existente</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Mapeamento de namespaces entre clusters</span>
          </li>
        </ul>
      </section>

      {/* Confirmação */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Revisão e Confirmação</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Antes de iniciar a migração, revise todas as configurações e confirme a operação. 
          A plataforma exibe um resumo completo dos workloads e destinos.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/188_mangue_migracao_confirmacao.png" 
            alt="Confirmação da Migração" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela de Confirmação</p>
        </div>
      </section>

      {/* Status da Migração */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Acompanhamento da Migração</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Após iniciar, acompanhe o progresso da migração em tempo real. A plataforma exibe o status 
          de cada workload durante o processo.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/189_mangue_migracao_status.png" 
            alt="Status da Migração" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Progresso da Migração</p>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="text-sm"><strong>Concluído:</strong> Workload migrado com sucesso</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
            <span className="text-sm"><strong>Em Progresso:</strong> Migração em andamento</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="text-sm"><strong>Pendente:</strong> Aguardando processamento</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="text-sm"><strong>Falha:</strong> Erro na migração</span>
          </div>
        </div>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Importante</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Certifique-se de que o cluster de destino possui recursos suficientes (CPU, memória, storage) 
              para receber os workloads migrados. Verifique também a compatibilidade de versões e 
              configurações de rede entre os clusters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
