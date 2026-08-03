import { ArrowLeft, Server, CheckCircle2, Layers, Globe, Network, Tag, Info, Plus, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const nodeInfo = [
  { name: "Nome", description: "Nome do node no cluster" },
  { name: "Status", description: "Estado atual do node (Ready, NotReady)" },
  { name: "CPU", description: "Capacidade e uso de CPU" },
  { name: "Memória", description: "Capacidade e uso de memória" },
  { name: "Pods", description: "Quantidade de pods em execução" },
  { name: "Labels", description: "Rótulos associados ao node" }
];

const namespaceFeatures = [
  {
    title: "Isolamento de Recursos",
    description: "Separe aplicações e times em namespaces diferentes"
  },
  {
    title: "Quotas de Recursos",
    description: "Limite o consumo de CPU e memória por namespace"
  },
  {
    title: "Labels e Anotações",
    description: "Organize namespaces com rótulos personalizados"
  },
  {
    title: "Network Policies",
    description: "Controle a comunicação entre namespaces"
  }
];

export default function NodesNamespaces() {
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
          <Server className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('mangue.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t('mangue.nodesNamespaces')}</h1>
          <p className="mt-1 text-muted-foreground">
            {t('mangue.nodesNamespaces')}
          </p>
        </div>
      </div>

      {/* Nodes Overview */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Nodes</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Os <strong>Nodes</strong> são as máquinas (físicas ou virtuais) que executam os pods no cluster 
          Kubernetes. Cada node contém os serviços necessários para executar pods.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/179_mangue_overview_nodes.png" 
            alt="Overview Nodes" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Visão geral de Nodes</p>
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/180_mangue_nodes.png" 
            alt="Lista de Nodes" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Nodes do cluster</p>
        </div>
      </section>

      {/* Informações do Node */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Informações do Node</h2>
        <div className="space-y-2 mb-4">
          {nodeInfo.map(({ name, description }) => (
            <div key={name} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
              <div>
                <span className="font-medium text-foreground text-sm">{name}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/181_mangue_pods.png" 
              alt="Pods do Node" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Pods executando no Node</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/183_mangue_label_nods.png" 
              alt="Labels do Node" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Labels do Node</p>
          </div>
        </div>
      </section>

      {/* Namespaces */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Namespaces</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Namespaces</strong> são uma forma de dividir os recursos do cluster entre múltiplos usuários 
          ou projetos. Funcionam como "clusters virtuais" dentro de um cluster físico.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/171_mangue_namespaces.png" 
            alt="Namespaces" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Namespaces</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {namespaceFeatures.map(({ title, description }) => (
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

      {/* Criar Namespace */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Criar Namespace</h2>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/172_mangue_add_namespace.png" 
            alt="Adicionar Namespace" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Criar novo Namespace</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/175_mangue_label_namespace.png" 
              alt="Labels Namespace" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Adicionar Labels</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/177_mangue_add_cota.png" 
              alt="Quotas Namespace" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Adicionar Quotas</p>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Serviços</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Serviços</strong> expõem aplicações em execução em pods para acesso interno ou externo 
          ao cluster. Definem políticas de acesso a um conjunto lógico de pods.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/163_mangue_servicos.png" 
            alt="Serviços" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Serviços</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>ClusterIP:</strong> Serviço interno acessível apenas dentro do cluster</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>NodePort:</strong> Expõe o serviço em uma porta em cada Node</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>LoadBalancer:</strong> Expõe o serviço usando balanceador de carga externo</span>
          </li>
        </ul>
      </section>

      {/* Ingress */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Network className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Ingress</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Ingress</strong> gerencia o acesso externo aos serviços em um cluster, tipicamente HTTP. 
          Pode fornecer balanceamento de carga, terminação SSL e hospedagem virtual baseada em nome.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/169_mangue_ingress.png" 
            alt="Ingress" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Ingress</p>
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/165_mangue_add_ingress.png" 
            alt="Adicionar Ingress" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Adicionar novo Ingress</p>
        </div>
      </section>

      {/* Cluster Events */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Cluster Events</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Visualize e monitore todos os eventos do cluster em tempo real, incluindo criação, atualização 
          e exclusão de recursos.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/080_mangue_cluster_events.png" 
            alt="Cluster Events" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de eventos do cluster</p>
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/081_mangue_pesquisar_evento.png" 
            alt="Pesquisar Evento" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Pesquisa de eventos</p>
        </div>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Organização por Namespaces</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Use namespaces para organizar recursos por projeto, time ou ambiente (dev, staging, production). 
              Isso facilita o gerenciamento de permissões e o controle de custos por área.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
