import {
  Leaf,
  Globe,
  Boxes,
  BookOpen,
  Receipt,
  Lightbulb,
  ShieldCheck,
  Server,
  GitBranch,
  HardDrive,
  CheckSquare,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function Mangue() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const docTopics = [
    { title: t("mangue.overview"), icon: Globe, description: t("mangue.overviewDescription"), route: "/mangue/visao-geral" },
    { title: t("mangue.workloads"), icon: Boxes, description: t("mangue.workloadsDescription"), route: "/mangue/workloads" },
    { title: t("mangue.catalog"), icon: BookOpen, description: t("mangue.catalogDescription"), route: "/mangue/catalogo" },
    { title: t("mangue.billing"), icon: Receipt, description: t("mangue.billingDescription"), route: "/mangue/faturamento" },
    { title: t("mangue.recommendations"), icon: Lightbulb, description: t("mangue.recommendationsDescription"), route: "/mangue/recomendacoes" },
    { title: t("mangue.permissionsIntegrations"), icon: ShieldCheck, description: t("mangue.permissionsIntegrationsDescription"), route: "/mangue/permissoes-integracoes" },
    { title: t("mangue.nodesNamespaces"), icon: Server, description: t("mangue.nodesNamespacesDescription"), route: "/mangue/nodes-namespaces" },
    { title: t("mangue.clusterMigration"), icon: GitBranch, description: t("mangue.clusterMigrationDescription"), route: "/mangue/migracao-cluster" },
    { title: t("mangue.storage"), icon: HardDrive, description: t("mangue.storageDescription"), route: "/mangue/storage" },
    { title: t("mangue.tasks"), icon: CheckSquare, description: t("mangue.tasksDescription"), route: "/mangue/tarefas" },
    { title: t("mangue.clusters"), icon: Layers, description: t("mangue.clustersDescription"), route: "/mangue/clusters" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Leaf className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("mangue.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("mangue.subtitle")}</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {docTopics.map(({ title, icon: Icon, description, route }) => (
          <div
            key={title}
            onClick={() => navigate(route)}
            className="rounded-lg border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}