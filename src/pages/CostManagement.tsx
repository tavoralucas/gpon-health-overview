import { Link } from "react-router-dom";
import {
  TrendingDown,
  Globe,
  History,
  TrendingUp,
  Download,
  BarChart2,
  Wallet,
  Building2,
  DollarSign,
  Network,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function CostManagement() {
  const { t } = useTranslation();

  const docTopics = [
    // { title: t("costManagement.overview"), icon: Globe, route: "/cost-management/visao-geral", description: t("costManagement.overviewDescription") },
    { title: t("costManagement.serviceHistory"), icon: History, route: "/cost-management/historico-servico", description: t("costManagement.serviceHistoryDescription") },
    { title: t("costManagement.billingTrend"), icon: TrendingUp, route: "/cost-management/tendencia-faturamento", description: t("costManagement.billingTrendDescription") },
    { title: t("costManagement.exportReports"), icon: Download, route: "/cost-management/exportar-relatorios", description: t("costManagement.exportReportsDescription") },
    { title: t("costManagement.consolidatedBilling"), icon: BarChart2, route: "/cost-management/consolidado-faturamento", description: t("costManagement.consolidatedBillingDescription") },
    { title: t("costManagement.costBudget"), icon: Wallet, route: "/cost-management/custo-budget", description: t("costManagement.costBudgetDescription") },
    { title: t("costManagement.masterAccount"), icon: Building2, route: "/cost-management/conta-master", description: t("costManagement.masterAccountDescription") },
    { title: t("costManagement.productRelationalCost"), icon: Network, route: "/cost-management/custo-relacional-produto", description: t("costManagement.productRelationalCostDescription") },
    { title: t("costManagement.finance"), icon: DollarSign, route: "/cost-management/financeiro", description: t("costManagement.financeDescription") },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <TrendingDown className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("costManagement.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("costManagement.subtitle")}</p>
        </div>
      </div>

      <Link
        to="/novidades"
        className="group flex items-center gap-4 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-5 transition-colors hover:bg-primary/10"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{t("common.novidades")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("common.novidadesBanner")}
          </p>
        </div>
        <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
      </Link>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {docTopics.map(({ title, icon: Icon, route, description }) => (
          <Link
            key={title}
            to={route}
            className="rounded-lg border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}