import { ArrowLeft, ShieldCheck, CheckCircle2, Users, Key, Link2, Settings, Info, Lock, UserCheck, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const permissionTypes = [
  {
    title: "Contrato",
    icon: Users,
    description: "Informações do contrato associado ao usuário e seus níveis de permissão."
  },
  {
    title: "Roles",
    icon: Key,
    description: "Definição de papéis e permissões dentro do namespace."
  },
  {
    title: "Bindings",
    icon: UserCheck,
    description: "Associação de usuários a roles específicas."
  },
  {
    title: "Service Accounts",
    icon: Lock,
    description: "Contas de serviço para autenticação de aplicações no cluster."
  }
];

const clusterPermissions = [
  {
    title: "Cluster Roles",
    description: "Papéis com escopo em todo o cluster"
  },
  {
    title: "Cluster Role Bindings",
    description: "Associação de usuários a cluster roles"
  },
  {
    title: "Pod Security Policies",
    description: "Políticas de segurança para pods"
  }
];

const integrations = [
  {
    title: "Clusters Kubernetes",
    icon: Database,
    description: "Integração e gerenciamento de múltiplos clusters Kubernetes."
  },
  {
    title: "Monitoramento",
    icon: Settings,
    description: "Configuração de bilhetagem e monitoramento de recursos."
  },
  {
    title: "Helm",
    icon: Link2,
    description: "Gerenciamento de repositórios Helm para deploy de aplicações."
  }
];

export default function PermissoesIntegracoes() {
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
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('mangue.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t('mangue.permissionsIntegrations')}</h1>
          <p className="mt-1 text-muted-foreground">
            {t('mangue.permissionsIntegrations')}
          </p>
        </div>
      </div>

      {/* Permissões */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Permissões</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O menu <strong>Permissões</strong> permite gerenciar o controle de acesso ao cluster Kubernetes, 
          definindo quem pode executar quais ações em quais recursos.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/113_mangue_informacoes_contrato_user.png" 
            alt="Informações de Contrato" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Informações do contrato e usuário</p>
        </div>
      </section>

      {/* Tipos de Permissões */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Tipos de Permissões</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {permissionTypes.map(({ title, icon: Icon, description }) => (
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

      {/* Roles */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Roles</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Roles definem um conjunto de permissões dentro de um namespace específico.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/117_mangue_roles.png" 
            alt="Roles" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Roles</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/120_mangue_editar_role.png" 
              alt="Editar Role" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Editar Role</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/119_mangue_deletar_role.png" 
              alt="Deletar Role" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Deletar Role</p>
          </div>
        </div>
      </section>

      {/* Bindings */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <UserCheck className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Bindings</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Bindings associam usuários ou grupos a roles específicas, concedendo as permissões definidas.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/121_mangue_bindings.png" 
            alt="Bindings" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Bindings</p>
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/124_mangue_editar_binding.png" 
            alt="Editar Binding" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Editar Binding</p>
        </div>
      </section>

      {/* Service Accounts */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Service Accounts</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Contas de serviço para autenticação de pods e aplicações no cluster Kubernetes.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/125_mangue_service_account.png" 
            alt="Service Accounts" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Service Accounts</p>
        </div>
      </section>

      {/* Cluster Roles */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Permissões em Nível de Cluster</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Além das permissões por namespace, é possível definir permissões que se aplicam a todo o cluster.
        </p>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/127_mangue_cluster_role.png" 
              alt="Cluster Roles" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Cluster Roles</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/130_mangue_cluster_role_binding.png" 
              alt="Cluster Role Bindings" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Cluster Role Bindings</p>
          </div>
        </div>
        <div className="space-y-2">
          {clusterPermissions.map(({ title, description }) => (
            <div key={title} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
              <div>
                <span className="font-medium text-foreground text-sm">{title}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integrações */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Integrações</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O menu <strong>Integrações</strong> permite conectar o Mangue.io a sistemas externos e configurar 
          funcionalidades adicionais.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {integrations.map(({ title, icon: Icon, description }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Helm */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Link2 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Helm</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Gerenciamento de repositórios Helm para facilitar o deploy de aplicações no cluster.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/157_mangue_helm.png" 
            alt="Helm" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de repositórios Helm</p>
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/159_mangue_add_helm.png" 
            alt="Adicionar Helm" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Adicionar repositório Helm</p>
        </div>
      </section>

      {/* Monitoramento */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Monitoramento e Bilhetagem</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Configuração de integração de monitoramento para coleta de métricas e bilhetagem do cluster.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/153_mangue_add_monitoramento.png" 
              alt="Adicionar Monitoramento" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Adicionar Monitoramento</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/155_mangue_editar_monitoramento.png" 
              alt="Editar Monitoramento" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Editar Monitoramento</p>
          </div>
        </div>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Níveis de Permissão</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              As permissões do Mangue.io correspondem ao nível de permissão que o usuário tem no contrato 
              do uCloud. Ao selecionar um contrato, as opções de clusters são atualizadas conforme a 
              permissão do usuário logado.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
