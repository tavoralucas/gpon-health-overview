import {
  PieChart,
  LayoutDashboard,
  Sliders,
  GitCompare,
  Cloud,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function Finops360() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const docTopics = [
    { title: t("finops360.overview"), icon: PieChart, description: t("finops360.overviewDescription"), route: "/finops-360/visao-geral" },
    { title: t("finops360.dashboard"), icon: LayoutDashboard, description: t("finops360.dashboardDescription"), route: "/finops-360/dashboard" },
    { title: t("finops360.rightsizing"), icon: Sliders, description: t("finops360.rightsizingDescription"), route: "/finops-360/rightsizing" },
    { title: t("finops360.compareCloud"), icon: GitCompare, description: t("finops360.compareCloudDescription"), route: "/finops-360/compare-cloud" },
    { title: t("finops360.imaginaryCloud"), icon: Cloud, description: t("finops360.imaginaryCloudDescription"), route: "/finops-360/imaginary-cloud" },
    { title: t("finops360.providerHint"), icon: Lightbulb, description: t("finops360.providerHintDescription"), route: "/finops-360/provider-hint" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <PieChart className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("finops360.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("finops360.subtitle")}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {docTopics.map(({ title, icon: Icon, description, route }) => (
          <div
            key={title}
            onClick={() => route && navigate(route)}
            className={`rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow ${
              route
                ? "cursor-pointer hover:shadow-md hover:border-primary/40"
                : "cursor-default hover:shadow-sm opacity-80"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
            {route && (
              <p className="mt-3 text-xs font-medium text-primary">Ver documentação →</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}