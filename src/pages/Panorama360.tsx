import {
  Globe,
  LogIn,
  Cloud,
  LayoutDashboard,
  Database,
  RefreshCw,
  PlusSquare,
  UserPlus,
  MessageCircle,
  Bell,
  Settings,
  BellOff,
  EyeOff,
  Tag,
  SlidersHorizontal,
  ScrollText,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function Panorama360() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const docTopics = [
    { title: t("panorama360.overview"), icon: Globe, description: t("panorama360.overviewSubtitle"), route: "/panorama-360/visao-geral" },
    { title: t("panorama360.access"), icon: LogIn, description: t("panorama360.accessDescription"), route: "/panorama-360/acesso" },
    { title: t("panorama360.googleAuth"), icon: Cloud, description: t("panorama360.googleAuthDescription"), route: "/panorama-360/autenticacao-google" },
    { title: t("panorama360.dashboardsPanels"), icon: LayoutDashboard, description: t("panorama360.dashboardsPanelsDescription"), route: "/panorama-360/dashboards-paineis" },
    { title: t("panorama360.datasource"), icon: Database, description: t("panorama360.datasourceDescription"), route: "/panorama-360/datasource" },
    { title: t("panorama360.autoRefresh"), icon: RefreshCw, description: t("panorama360.autoRefreshDescription"), route: "/panorama-360/refresh-automatico" },
    { title: t("panorama360.creatingDashboards"), icon: PlusSquare, description: t("panorama360.creatingDashboardsDescription"), route: "/panorama-360/criando-dashboards" },
    { title: t("panorama360.addClient"), icon: UserPlus, description: t("panorama360.addClientDescription"), route: "/panorama-360/adicionar-cliente" },
    { title: t("panorama360.telegramIntegration"), icon: MessageCircle, description: t("panorama360.telegramIntegrationDescription"), route: "/panorama-360/integracao-telegram" },
    { title: t("panorama360.configureAlerts"), icon: Bell, description: t("panorama360.configureAlertsDescription"), route: "/panorama-360/configurar-alertas" },
    { title: t("panorama360.alertProcedures"), icon: Settings, description: t("panorama360.alertProceduresDescription"), route: "/panorama-360/procedimentos-alertas" },
    { title: t("panorama360.silenceNotification"), icon: BellOff, description: t("panorama360.silenceNotificationDescription"), route: "/panorama-360/silenciar-notificacao" },
    { title: t("panorama360.removeSilences"), icon: EyeOff, description: t("panorama360.removeSilencesDescription"), route: "/panorama-360/remover-silenciamentos" },
    { title: t("panorama360.tagsLabels"), icon: Tag, description: t("panorama360.tagsLabelsDescription"), route: "/panorama-360/tags-labels" },
    { title: t("panorama360.queriesConditions"), icon: SlidersHorizontal, description: t("panorama360.queriesConditionsDescription"), route: "/panorama-360/consultas-condicoes" },
    { title: t("panorama360.exploringLogs"), icon: ScrollText, description: t("panorama360.exploringLogsDescription"), route: "/panorama-360/explorando-logs" },
    { title: t("panorama360.installingAgent"), icon: Download, description: t("panorama360.installingAgentDescription"), route: "/panorama-360/instalando-agente" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Globe className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("panorama360.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("panorama360.subtitle")}</p>
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