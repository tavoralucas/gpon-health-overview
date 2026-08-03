import {
  Network,
  Globe,
  PlugZap,
  GitBranch,
  ArrowLeftRight,
  CheckSquare,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function DCI() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const docTopics = [
    { title: t("dci.overview"), icon: Globe, description: t("dci.overviewDescription"), route: "/dci/visao-geral" },
    { title: t("dci.administration"), icon: Users, description: t("dci.administrationDescription"), route: "/dci/administracao" },
    { title: t("dci.ports"), icon: PlugZap, description: t("dci.portsDescription"), route: "/dci/portas" },
    { title: t("dci.circuits"), icon: GitBranch, description: t("dci.circuitsDescription"), route: "/dci/circuitos" },
    { title: t("dci.excursions"), icon: ArrowLeftRight, description: t("dci.excursionsDescription"), route: "/dci/excursionamentos" },
    { title: t("dci.tasks"), icon: CheckSquare, description: t("dci.tasksDescription"), route: "/dci/tarefas" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Network className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("dci.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("dci.subtitle")}</p>
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