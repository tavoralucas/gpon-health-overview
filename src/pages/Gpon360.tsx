import { Link } from "react-router-dom";
import {
  Radar,
  Users,
  LayoutDashboard,
  SignalHigh,
  Siren,
  Activity,
  Gauge,
  FileBarChart,
  SlidersHorizontal,
  ScrollText,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function Gpon360() {
  const { t } = useTranslation();

  const docTopics = [
    { title: t('gpon360.clients'), icon: Users, route: "/gpon-360/clientes", description: t('gpon360.clientsDescription') },
    { title: t('gpon360.dashboards'), icon: LayoutDashboard, route: "/gpon-360/dashboards", description: t('gpon360.dashboardsDescription') },
    { title: t('gpon360.signalMonitoring'), icon: SignalHigh, route: "/gpon-360/monitoramento-sinal", description: t('gpon360.signalMonitoringDescription') },
    { title: t('gpon360.massiveTrap'), icon: Siren, route: "/gpon-360/trap-massivo", description: t('gpon360.massiveTrapDescription') },
    { title: t('gpon360.fallMonitoring'), icon: Activity, route: "/gpon-360/monitoramento-quedas", description: t('gpon360.fallMonitoringDescription') },
    { title: t('gpon360.performance'), icon: Gauge, route: "/gpon-360/performance", description: t('gpon360.performanceDescription') },
    { title: t('gpon360.reports'), icon: FileBarChart, route: "/gpon-360/relatorios", description: t('gpon360.reportsDescription') },
    { title: t('gpon360.parameterManagement'), icon: SlidersHorizontal, route: "/gpon-360/gestao-parametros", description: t('gpon360.parameterManagementDescription') },
    { title: t('gpon360.audit'), icon: ScrollText, route: "/gpon-360/auditoria", description: t('gpon360.auditDescription') },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Radar className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('gpon360.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('gpon360.subtitle')}</p>
        </div>
      </div>

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
