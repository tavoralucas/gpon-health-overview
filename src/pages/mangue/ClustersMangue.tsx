import { ArrowLeft, Boxes, CheckCircle2, Info, Plus, Server, Settings, Link, Cloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const cloudProviders = [
  { name: "AWS EKS", description: "Amazon Elastic Kubernetes Service" },
  { name: "Azure AKS", description: "Azure Kubernetes Service" },
  { name: "Google GKE", description: "Google Kubernetes Engine" },
  { name: "On-Premise", description: "Clusters Kubernetes locais" },
  { name: "Rancher", description: "Clusters gerenciados via Rancher" }
];

export default function ClustersMangue() {
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
          <h1 className="text-3xl font-bold text-foreground">{t('mangue.clusters')}</h1>
          <p className="mt-1 text-muted-foreground">
            {t('mangue.clusters')}
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('common.overview')}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O Mangue.io permite o gerenciamento centralizado de <strong>múltiplos clusters Kubernetes</strong>, 
          independente de onde estejam hospedados. Integre clusters de diferentes provedores cloud ou 
          on-premise em uma única interface.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/139_mangue_clusters_visao_geral.png" 
            alt="Lista de Clusters" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Clusters Integrados</p>
        </div>
      </section>

      {/* Provedores Suportados */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Cloud className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Provedores Suportados</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A plataforma suporta integração com os principais provedores de Kubernetes:
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {cloudProviders.map(({ name, description }) => (
            <div key={name} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Server className="h-5 w-5 text-primary shrink-0" />
              <div>
                <span className="font-medium text-foreground text-sm">{name}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integrar Cluster */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Link className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Integrar Cluster Existente</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Para integrar um cluster existente ao Mangue.io, forneça o arquivo kubeconfig ou 
          as credenciais de acesso ao cluster.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/140_mangue_integrar_cluster.png" 
            alt="Integrar Cluster" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Formulário de Integração</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Nome:</strong> Identificador único do cluster na plataforma</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Kubeconfig:</strong> Arquivo de configuração do cluster</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>API Server:</strong> Endpoint da API do Kubernetes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Certificados:</strong> Certificados de autenticação (se necessário)</span>
          </li>
        </ul>
      </section>

      {/* Criar Cluster */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Criar Novo Cluster</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A plataforma permite criar novos clusters Kubernetes diretamente através da interface, 
          provisionando a infraestrutura automaticamente.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/141_mangue_criar_cluster.png" 
            alt="Criar Cluster" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Criação de Novo Cluster</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Provider:</strong> Selecione o provedor cloud</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Região:</strong> Datacenter onde o cluster será criado</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Versão:</strong> Versão do Kubernetes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Nodes:</strong> Configuração dos worker nodes</span>
          </li>
        </ul>
      </section>

      {/* Configuração de Nodes */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Configuração de Node Pools</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Configure os pools de nodes do cluster, definindo tipo de máquina, quantidade e auto-scaling.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/142_mangue_cluster_nodes.png" 
              alt="Node Pools" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Configuração de Nodes</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/143_mangue_cluster_autoscaling.png" 
              alt="Auto-scaling" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Auto-scaling</p>
          </div>
        </div>
      </section>

      {/* Detalhes do Cluster */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Detalhes do Cluster</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Visualize informações detalhadas sobre cada cluster integrado, incluindo recursos, 
          status e métricas de utilização.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/144_mangue_cluster_detalhes.png" 
            alt="Detalhes do Cluster" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela de Detalhes do Cluster</p>
        </div>

        <h3 className="font-semibold text-foreground mb-3">Informações Exibidas</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Versão:</strong> Versão do Kubernetes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Status:</strong> Estado de saúde do cluster</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Nodes:</strong> Quantidade e status dos nodes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Recursos:</strong> CPU, memória e storage disponíveis</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Namespaces:</strong> Namespaces existentes no cluster</span>
          </li>
        </ul>
      </section>

      {/* Status do Cluster */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Status do Cluster</h2>
        <div className="grid gap-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="text-sm"><strong>Healthy:</strong> Cluster funcionando normalmente</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="text-sm"><strong>Warning:</strong> Alguns componentes com alertas</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="text-sm"><strong>Critical:</strong> Problemas que requerem atenção</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-950/20 rounded-lg">
            <span className="h-3 w-3 rounded-full bg-gray-500"></span>
            <span className="text-sm"><strong>Offline:</strong> Cluster indisponível</span>
          </div>
        </div>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Multi-Cloud</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Com o Mangue.io, você pode gerenciar clusters de diferentes provedores cloud em uma única 
              interface. Isso permite estratégias multi-cloud, disaster recovery entre provedores e 
              flexibilidade na escolha da infraestrutura para cada workload.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
